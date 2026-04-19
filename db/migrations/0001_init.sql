-- Travel app MVP — initial schema (M0)
-- Core taxonomy, auth-owned tables, and RLS. Content tables will be added
-- incrementally in later migrations as we build M1/M2/M3 features.
--
-- Conventions:
--   * All user-owned tables enable row-level security and restrict writes
--     to the owning auth user. Read access for public trips goes through
--     a SECURITY DEFINER RPC that checks the share token.
--   * Seeded content tables are publicly readable; writes are denied to
--     anon and authenticated roles and must go through the service-role
--     key (server-only).
--   * owner_kind lets the same content table hold country-level and
--     city-level rows (exactly one of country_id / city_id is set).
--
-- This migration is designed to be idempotent enough to run on a fresh
-- Supabase project. Later migrations will add additional content tables
-- (restaurants, attractions, etc.) and richer RLS.

create extension if not exists "pgcrypto";
create extension if not exists "citext";

-- ---------------------------------------------------------------------------
-- Reusable helpers
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Taxonomy: countries, cities, neighborhoods, trip_types
-- ---------------------------------------------------------------------------

create table if not exists public.countries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  iso2 char(2) not null unique,
  iso3 char(3) not null unique,
  default_currency char(3) not null,
  default_timezone text not null,
  primary_languages text[] not null default '{}',
  summary text,
  hero_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_countries_updated_at
before update on public.countries
for each row execute function public.set_updated_at();

create table if not exists public.cities (
  id uuid primary key default gen_random_uuid(),
  country_id uuid not null references public.countries(id) on delete restrict,
  slug text not null,
  name text not null,
  timezone text,
  lat numeric(8,5),
  lon numeric(8,5),
  default_currency char(3),
  hero_image_url text,
  summary text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (country_id, slug)
);

create index if not exists idx_cities_slug on public.cities(slug);
create trigger trg_cities_updated_at
before update on public.cities
for each row execute function public.set_updated_at();

create table if not exists public.neighborhoods (
  id uuid primary key default gen_random_uuid(),
  city_id uuid not null references public.cities(id) on delete cascade,
  slug text not null,
  name text not null,
  summary text,
  vibe text[] not null default '{}',
  lat numeric(8,5),
  lon numeric(8,5),
  image_url text,
  display_order int not null default 0,
  unique (city_id, slug)
);

create index if not exists idx_neighborhoods_city on public.neighborhoods(city_id);

create table if not exists public.trip_types (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  icon text,
  description text,
  display_order int not null default 0
);

-- ---------------------------------------------------------------------------
-- User profiles + roles
-- ---------------------------------------------------------------------------

create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  home_currency char(3) not null default 'USD',
  locale text not null default 'en',
  citizenship char(2),
  residence char(2),
  role text not null default 'user' check (role in ('user', 'moderator', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_user_profiles_updated_at
before update on public.user_profiles
for each row execute function public.set_updated_at();

create or replace function public.current_role_name()
returns text
language sql
stable
as $$
  select coalesce(
    (select role from public.user_profiles where id = auth.uid()),
    'anon'
  );
$$;

create or replace function public.is_moderator()
returns boolean
language sql
stable
as $$
  select public.current_role_name() in ('moderator', 'admin');
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select public.current_role_name() = 'admin';
$$;

-- Create a profile row whenever a new auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Trips and children
-- ---------------------------------------------------------------------------

create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  city_id uuid not null references public.cities(id) on delete restrict,
  title text not null,
  start_date date not null,
  end_date date not null,
  trip_type_slugs text[] not null default '{}',
  activities text[] not null default '{}',
  travelers_adults int not null default 1 check (travelers_adults >= 1),
  travelers_children int not null default 0 check (travelers_children >= 0),
  share_token text unique,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date >= start_date)
);

create index if not exists idx_trips_user on public.trips(user_id);
create trigger trg_trips_updated_at
before update on public.trips
for each row execute function public.set_updated_at();

create table if not exists public.trip_legs (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  city_id uuid not null references public.cities(id) on delete restrict,
  start_date date not null,
  end_date date not null,
  sort_order int not null default 0,
  check (end_date >= start_date)
);

create index if not exists idx_trip_legs_trip on public.trip_legs(trip_id);

create table if not exists public.trip_days (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  day_index int not null,
  title text,
  notes text,
  unique (trip_id, day_index)
);

create table if not exists public.trip_day_items (
  id uuid primary key default gen_random_uuid(),
  trip_day_id uuid not null references public.trip_days(id) on delete cascade,
  custom_title text,
  start_time time,
  duration_minutes int,
  sort_order int not null default 0,
  notes text
);

create table if not exists public.saved_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entity_type text not null,
  entity_id uuid not null,
  created_at timestamptz not null default now(),
  unique (user_id, entity_type, entity_id)
);

create table if not exists public.packing_lists (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  items jsonb not null default '[]'::jsonb,
  generated_at timestamptz not null default now(),
  unique (trip_id)
);

create table if not exists public.trip_expenses (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  day_index int,
  category text not null,
  amount_minor int not null,
  currency char(3) not null,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.trip_journal_entries (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  trip_day_id uuid references public.trip_days(id) on delete set null,
  body_md text,
  photo_urls text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.user_filter_presets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  scope text not null,
  name text not null,
  params jsonb not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- UGC: contributions + votes
-- ---------------------------------------------------------------------------

create table if not exists public.user_contributions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entity_type text not null,
  target_table text not null,
  target_id uuid not null,
  body_md text not null,
  metadata jsonb not null default '{}'::jsonb,
  state text not null default 'pending' check (state in ('pending','approved','rejected','flagged')),
  moderation_notes text,
  moderated_by uuid references auth.users(id),
  moderated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_user_contributions_state on public.user_contributions(state);
create index if not exists idx_user_contributions_target on public.user_contributions(target_table, target_id);

create trigger trg_user_contributions_updated_at
before update on public.user_contributions
for each row execute function public.set_updated_at();

create table if not exists public.contribution_votes (
  id uuid primary key default gen_random_uuid(),
  contribution_id uuid not null references public.user_contributions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  value smallint not null check (value in (-1, 1)),
  created_at timestamptz not null default now(),
  unique (contribution_id, user_id)
);

-- ---------------------------------------------------------------------------
-- Ops: audit log, api cache, fx rates, consent log
-- ---------------------------------------------------------------------------

create table if not exists public.audit_log (
  id bigserial primary key,
  actor_id uuid,
  action text not null,
  target_table text,
  target_id uuid,
  before jsonb,
  after jsonb,
  ip inet,
  ua text,
  created_at timestamptz not null default now()
);

create table if not exists public.api_cache (
  key text primary key,
  payload jsonb not null,
  fetched_at timestamptz not null default now(),
  ttl_seconds int not null
);

create table if not exists public.fx_rates (
  base char(3) not null,
  quote char(3) not null,
  rate numeric(18, 8) not null,
  fetched_at timestamptz not null default now(),
  primary key (base, quote)
);

create table if not exists public.consent_log (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete set null,
  anon_id text,
  purpose text not null,
  granted boolean not null,
  ts timestamptz not null default now(),
  ip_hash text
);

-- ---------------------------------------------------------------------------
-- Share link RPC (public trip view, bypasses RLS via SECURITY DEFINER)
-- ---------------------------------------------------------------------------

create or replace function public.get_public_trip(p_trip_id uuid, p_token text)
returns table (
  id uuid,
  title text,
  city_id uuid,
  start_date date,
  end_date date,
  trip_type_slugs text[],
  activities text[]
)
language sql
security definer
set search_path = public
as $$
  select t.id, t.title, t.city_id, t.start_date, t.end_date,
         t.trip_type_slugs, t.activities
    from public.trips t
   where t.id = p_trip_id
     and t.is_public = true
     and t.share_token = p_token;
$$;

revoke all on function public.get_public_trip(uuid, text) from public;
grant execute on function public.get_public_trip(uuid, text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

-- Seeded taxonomy: public read, writes denied (service role bypasses RLS).
alter table public.countries enable row level security;
alter table public.cities enable row level security;
alter table public.neighborhoods enable row level security;
alter table public.trip_types enable row level security;

create policy countries_read on public.countries for select using (true);
create policy cities_read on public.cities for select using (true);
create policy neighborhoods_read on public.neighborhoods for select using (true);
create policy trip_types_read on public.trip_types for select using (true);

-- User profiles: read own + any (display_name is public-safe); update own only.
alter table public.user_profiles enable row level security;
create policy user_profiles_select on public.user_profiles for select using (true);
create policy user_profiles_update_self on public.user_profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Trips: owner-only CRUD. Public read handled via get_public_trip RPC only.
alter table public.trips enable row level security;
create policy trips_owner_all on public.trips
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Trip children: check the owning trip.
alter table public.trip_legs enable row level security;
create policy trip_legs_owner on public.trip_legs for all
  using (exists (select 1 from public.trips t where t.id = trip_id and t.user_id = auth.uid()))
  with check (exists (select 1 from public.trips t where t.id = trip_id and t.user_id = auth.uid()));

alter table public.trip_days enable row level security;
create policy trip_days_owner on public.trip_days for all
  using (exists (select 1 from public.trips t where t.id = trip_id and t.user_id = auth.uid()))
  with check (exists (select 1 from public.trips t where t.id = trip_id and t.user_id = auth.uid()));

alter table public.trip_day_items enable row level security;
create policy trip_day_items_owner on public.trip_day_items for all
  using (exists (
    select 1 from public.trip_days d
      join public.trips t on t.id = d.trip_id
     where d.id = trip_day_id and t.user_id = auth.uid()))
  with check (exists (
    select 1 from public.trip_days d
      join public.trips t on t.id = d.trip_id
     where d.id = trip_day_id and t.user_id = auth.uid()));

alter table public.saved_items enable row level security;
create policy saved_items_owner on public.saved_items for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table public.packing_lists enable row level security;
create policy packing_lists_owner on public.packing_lists for all
  using (exists (select 1 from public.trips t where t.id = trip_id and t.user_id = auth.uid()))
  with check (exists (select 1 from public.trips t where t.id = trip_id and t.user_id = auth.uid()));

alter table public.trip_expenses enable row level security;
create policy trip_expenses_owner on public.trip_expenses for all
  using (exists (select 1 from public.trips t where t.id = trip_id and t.user_id = auth.uid()))
  with check (exists (select 1 from public.trips t where t.id = trip_id and t.user_id = auth.uid()));

alter table public.trip_journal_entries enable row level security;
create policy trip_journal_owner on public.trip_journal_entries for all
  using (exists (select 1 from public.trips t where t.id = trip_id and t.user_id = auth.uid()))
  with check (exists (select 1 from public.trips t where t.id = trip_id and t.user_id = auth.uid()));

alter table public.user_filter_presets enable row level security;
create policy filter_presets_owner on public.user_filter_presets for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- UGC: insert-as-self, read approved + own + moderator, update own while pending.
alter table public.user_contributions enable row level security;

create policy contrib_insert on public.user_contributions
  for insert with check (auth.uid() = user_id);

create policy contrib_select on public.user_contributions
  for select using (
    state = 'approved'
    or user_id = auth.uid()
    or public.is_moderator()
  );

create policy contrib_update_own_pending on public.user_contributions
  for update using (user_id = auth.uid() and state = 'pending')
  with check (user_id = auth.uid() and state = 'pending');

create policy contrib_update_moderator on public.user_contributions
  for update using (public.is_moderator());

alter table public.contribution_votes enable row level security;
create policy votes_owner on public.contribution_votes for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Ops tables: service-role only. RLS enabled with no policies denies anon/auth access.
alter table public.audit_log enable row level security;
alter table public.api_cache enable row level security;
alter table public.fx_rates enable row level security;
alter table public.consent_log enable row level security;

-- fx_rates is read-heavy and non-sensitive; expose public read.
create policy fx_rates_read on public.fx_rates for select using (true);

-- ---------------------------------------------------------------------------
-- Seed: trip types
-- ---------------------------------------------------------------------------

insert into public.trip_types (slug, name, description, display_order) values
  ('cultural',  'Cultural',  'Museums, temples, history, architecture', 1),
  ('food',      'Food',      'Restaurants, street food, markets, cooking', 2),
  ('adventure', 'Adventure', 'Hiking, water sports, active outdoor', 3),
  ('family',    'Family',    'Kid-friendly attractions and pacing', 4),
  ('luxury',    'Luxury',    'High-end stays, fine dining, private tours', 5),
  ('budget',    'Budget',    'Low-cost itineraries, free attractions', 6),
  ('solo',      'Solo',      'Safe, social, solo-friendly places', 7),
  ('couple',    'Couple',    'Romantic, scenic, quiet-time spots', 8)
on conflict (slug) do nothing;
