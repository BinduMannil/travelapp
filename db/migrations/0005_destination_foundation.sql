-- Destination foundation layer: identity, activities, price benchmarks,
-- local apps, and phrasebook support.
--
-- Additive only. Existing JSON-backed pages remain unchanged; these tables
-- provide Supabase-backed content for future route-by-route migration.

-- ---------------------------------------------------------------------------
-- Destination identity profiles
-- ---------------------------------------------------------------------------

create table if not exists public.destination_identity_profiles (
  id uuid primary key default gen_random_uuid(),
  owner_kind text not null check (owner_kind in ('country', 'city')),
  country_id uuid references public.countries(id) on delete cascade,
  city_id uuid references public.cities(id) on delete cascade,
  palette_key text not null,
  color_palette jsonb not null default '{}'::jsonb,
  script_style_key text,
  texture_key text,
  background_style_key text,
  ambient_motion_key text,
  icon_system_key text,
  photography_mood text,
  accent_symbols text[] not null default '{}',
  typography_notes text,
  source text not null default 'seed',
  reviewed_at date,
  status text not null default 'published' check (
    status in ('draft', 'published', 'archived')
  ),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    (owner_kind = 'country' and country_id is not null and city_id is null) or
    (owner_kind = 'city' and city_id is not null and country_id is null)
  )
);

create unique index if not exists uq_destination_identity_country
  on public.destination_identity_profiles(country_id)
  where owner_kind = 'country';

create unique index if not exists uq_destination_identity_city
  on public.destination_identity_profiles(city_id)
  where owner_kind = 'city';

drop trigger if exists trg_destination_identity_profiles_updated_at
  on public.destination_identity_profiles;
create trigger trg_destination_identity_profiles_updated_at
before update on public.destination_identity_profiles
for each row execute function public.set_updated_at();

alter table public.destination_identity_profiles enable row level security;
drop policy if exists destination_identity_profiles_read
  on public.destination_identity_profiles;
create policy destination_identity_profiles_read
  on public.destination_identity_profiles for select using (status = 'published');

-- ---------------------------------------------------------------------------
-- Travel activities taxonomy
-- ---------------------------------------------------------------------------

create table if not exists public.travel_activities (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null,
  activity_group text not null,
  description text,
  traveler_types text[] not null default '{}',
  intensity text check (intensity in ('low', 'moderate', 'high')),
  indoor boolean,
  family_friendly boolean,
  display_order int not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_travel_activities_group
  on public.travel_activities(activity_group, display_order);

drop trigger if exists trg_travel_activities_updated_at
  on public.travel_activities;
create trigger trg_travel_activities_updated_at
before update on public.travel_activities
for each row execute function public.set_updated_at();

alter table public.travel_activities enable row level security;
drop policy if exists travel_activities_read on public.travel_activities;
create policy travel_activities_read
  on public.travel_activities for select using (true);

create table if not exists public.destination_activity_map (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid not null references public.travel_activities(id) on delete cascade,
  owner_kind text not null check (owner_kind in ('country', 'city')),
  country_id uuid references public.countries(id) on delete cascade,
  city_id uuid references public.cities(id) on delete cascade,
  relevance_level text not null default 'recommended' check (
    relevance_level in ('signature', 'recommended', 'available', 'niche')
  ),
  seasonality text[] not null default '{}',
  notes text,
  display_order int not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  check (
    (owner_kind = 'country' and country_id is not null and city_id is null) or
    (owner_kind = 'city' and city_id is not null and country_id is null)
  )
);

create unique index if not exists uq_destination_activity_country
  on public.destination_activity_map(country_id, activity_id)
  where owner_kind = 'country';

create unique index if not exists uq_destination_activity_city
  on public.destination_activity_map(city_id, activity_id)
  where owner_kind = 'city';

create index if not exists idx_destination_activity_country_order
  on public.destination_activity_map(country_id, display_order)
  where owner_kind = 'country';

create index if not exists idx_destination_activity_city_order
  on public.destination_activity_map(city_id, display_order)
  where owner_kind = 'city';

alter table public.destination_activity_map enable row level security;
drop policy if exists destination_activity_map_read
  on public.destination_activity_map;
create policy destination_activity_map_read
  on public.destination_activity_map for select using (true);

-- ---------------------------------------------------------------------------
-- Price benchmarks
-- ---------------------------------------------------------------------------

create table if not exists public.price_benchmarks (
  id uuid primary key default gen_random_uuid(),
  owner_kind text not null check (owner_kind in ('country', 'city')),
  country_id uuid references public.countries(id) on delete cascade,
  city_id uuid references public.cities(id) on delete cascade,
  benchmark_key text not null,
  category text not null,
  label text not null,
  amount_low_minor int,
  amount_typical_minor int not null,
  amount_high_minor int,
  currency char(3) not null,
  unit text not null default 'item',
  traveler_context text,
  notes text,
  source_label text,
  source_url text,
  reviewed_at date,
  confidence_level text not null default 'medium' check (
    confidence_level in ('low', 'medium', 'high')
  ),
  display_order int not null default 0,
  status text not null default 'published' check (
    status in ('draft', 'published', 'archived')
  ),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    amount_low_minor is null or amount_low_minor <= amount_typical_minor
  ),
  check (
    amount_high_minor is null or amount_typical_minor <= amount_high_minor
  ),
  check (
    (owner_kind = 'country' and country_id is not null and city_id is null) or
    (owner_kind = 'city' and city_id is not null and country_id is null)
  )
);

create unique index if not exists uq_price_benchmarks_country
  on public.price_benchmarks(country_id, benchmark_key)
  where owner_kind = 'country';

create unique index if not exists uq_price_benchmarks_city
  on public.price_benchmarks(city_id, benchmark_key)
  where owner_kind = 'city';

create index if not exists idx_price_benchmarks_country_category
  on public.price_benchmarks(country_id, category, display_order)
  where owner_kind = 'country';

create index if not exists idx_price_benchmarks_city_category
  on public.price_benchmarks(city_id, category, display_order)
  where owner_kind = 'city';

drop trigger if exists trg_price_benchmarks_updated_at
  on public.price_benchmarks;
create trigger trg_price_benchmarks_updated_at
before update on public.price_benchmarks
for each row execute function public.set_updated_at();

alter table public.price_benchmarks enable row level security;
drop policy if exists price_benchmarks_read on public.price_benchmarks;
create policy price_benchmarks_read
  on public.price_benchmarks for select using (status = 'published');

-- ---------------------------------------------------------------------------
-- Local apps directory
-- ---------------------------------------------------------------------------

create table if not exists public.local_apps (
  id uuid primary key default gen_random_uuid(),
  owner_kind text not null check (owner_kind in ('country', 'city')),
  country_id uuid references public.countries(id) on delete cascade,
  city_id uuid references public.cities(id) on delete cascade,
  slug text not null,
  name text not null,
  category text not null,
  purpose text not null,
  free boolean not null default true,
  ios_url text,
  android_url text,
  web_url text,
  offline_useful boolean not null default false,
  setup_before_arrival boolean not null default false,
  traveler_notes text,
  display_order int not null default 0,
  status text not null default 'published' check (
    status in ('draft', 'published', 'archived')
  ),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    (owner_kind = 'country' and country_id is not null and city_id is null) or
    (owner_kind = 'city' and city_id is not null and country_id is null)
  )
);

create unique index if not exists uq_local_apps_country
  on public.local_apps(country_id, slug)
  where owner_kind = 'country';

create unique index if not exists uq_local_apps_city
  on public.local_apps(city_id, slug)
  where owner_kind = 'city';

create index if not exists idx_local_apps_country_category
  on public.local_apps(country_id, category, display_order)
  where owner_kind = 'country';

create index if not exists idx_local_apps_city_category
  on public.local_apps(city_id, category, display_order)
  where owner_kind = 'city';

drop trigger if exists trg_local_apps_updated_at on public.local_apps;
create trigger trg_local_apps_updated_at
before update on public.local_apps
for each row execute function public.set_updated_at();

alter table public.local_apps enable row level security;
drop policy if exists local_apps_read on public.local_apps;
create policy local_apps_read
  on public.local_apps for select using (status = 'published');

-- ---------------------------------------------------------------------------
-- Translation / phrasebook support
-- ---------------------------------------------------------------------------

create table if not exists public.phrasebook_entries (
  id uuid primary key default gen_random_uuid(),
  owner_kind text not null check (owner_kind in ('country', 'city')),
  country_id uuid references public.countries(id) on delete cascade,
  city_id uuid references public.cities(id) on delete cascade,
  phrase_key text not null,
  category text not null,
  source_language text not null default 'en',
  target_language text not null,
  source_text text not null,
  translated_text text not null,
  transliteration text,
  literal_translation text,
  usage_notes text,
  formality text check (
    formality in ('casual', 'polite', 'formal', 'emergency')
  ),
  audio_url text,
  display_order int not null default 0,
  status text not null default 'published' check (
    status in ('draft', 'published', 'archived')
  ),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    (owner_kind = 'country' and country_id is not null and city_id is null) or
    (owner_kind = 'city' and city_id is not null and country_id is null)
  )
);

create unique index if not exists uq_phrasebook_country
  on public.phrasebook_entries(country_id, phrase_key)
  where owner_kind = 'country';

create unique index if not exists uq_phrasebook_city
  on public.phrasebook_entries(city_id, phrase_key)
  where owner_kind = 'city';

create index if not exists idx_phrasebook_country_category
  on public.phrasebook_entries(country_id, category, display_order)
  where owner_kind = 'country';

create index if not exists idx_phrasebook_city_category
  on public.phrasebook_entries(city_id, category, display_order)
  where owner_kind = 'city';

drop trigger if exists trg_phrasebook_entries_updated_at
  on public.phrasebook_entries;
create trigger trg_phrasebook_entries_updated_at
before update on public.phrasebook_entries
for each row execute function public.set_updated_at();

alter table public.phrasebook_entries enable row level security;
drop policy if exists phrasebook_entries_read on public.phrasebook_entries;
create policy phrasebook_entries_read
  on public.phrasebook_entries for select using (status = 'published');
