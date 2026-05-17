-- M2 foundation: canonical place/entity layer.
--
-- This migration is additive. Existing JSON-backed pages can continue to run,
-- while Supabase gains normalized destination entities for neighborhoods,
-- attractions, restaurants, tags, and external provider identifiers.

-- ---------------------------------------------------------------------------
-- Neighborhood editorial fields
-- ---------------------------------------------------------------------------

alter table public.neighborhoods
  add column if not exists best_for text[] not null default '{}',
  add column if not exists description text,
  add column if not exists transit_hubs text[] not null default '{}',
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

drop trigger if exists trg_neighborhoods_updated_at on public.neighborhoods;
create trigger trg_neighborhoods_updated_at
before update on public.neighborhoods
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Canonical places
-- ---------------------------------------------------------------------------

create table if not exists public.places (
  id uuid primary key default gen_random_uuid(),
  city_id uuid not null references public.cities(id) on delete cascade,
  neighborhood_id uuid references public.neighborhoods(id) on delete set null,
  slug text not null,
  name text not null,
  entity_kind text not null check (
    entity_kind in (
      'attraction',
      'restaurant',
      'hotel',
      'wellness',
      'shopping',
      'nightlife',
      'kids',
      'transit',
      'other'
    )
  ),
  category text,
  summary text,
  description text,
  lat numeric(9,6),
  lon numeric(9,6),
  hero_image_url text,
  status text not null default 'published' check (
    status in ('draft', 'published', 'archived')
  ),
  source text not null default 'seed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (city_id, slug)
);

create index if not exists idx_places_city_status
  on public.places(city_id, status);

create index if not exists idx_places_city_kind
  on public.places(city_id, entity_kind);

create index if not exists idx_places_neighborhood
  on public.places(neighborhood_id);

create index if not exists idx_places_category
  on public.places(category);

create trigger trg_places_updated_at
before update on public.places
for each row execute function public.set_updated_at();

alter table public.places enable row level security;
drop policy if exists places_read on public.places;
create policy places_read on public.places for select using (status = 'published');

-- ---------------------------------------------------------------------------
-- Tags and external IDs
-- ---------------------------------------------------------------------------

create table if not exists public.place_tags (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null,
  tag_kind text not null default 'general' check (
    tag_kind in (
      'general',
      'category',
      'significance',
      'trip_type',
      'cuisine',
      'dietary',
      'accessibility',
      'audience'
    )
  ),
  created_at timestamptz not null default now()
);

create index if not exists idx_place_tags_kind
  on public.place_tags(tag_kind);

alter table public.place_tags enable row level security;
drop policy if exists place_tags_read on public.place_tags;
create policy place_tags_read on public.place_tags for select using (true);

create table if not exists public.place_tag_map (
  place_id uuid not null references public.places(id) on delete cascade,
  tag_id uuid not null references public.place_tags(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (place_id, tag_id)
);

create index if not exists idx_place_tag_map_tag
  on public.place_tag_map(tag_id, place_id);

alter table public.place_tag_map enable row level security;
drop policy if exists place_tag_map_read on public.place_tag_map;
create policy place_tag_map_read on public.place_tag_map for select using (true);

create table if not exists public.place_external_ids (
  id uuid primary key default gen_random_uuid(),
  place_id uuid not null references public.places(id) on delete cascade,
  provider text not null,
  external_id text,
  url text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (external_id is not null or url is not null)
);

create unique index if not exists uq_place_external_ids_provider_id
  on public.place_external_ids(place_id, provider, external_id)
  where external_id is not null;

create unique index if not exists uq_place_external_ids_provider_url
  on public.place_external_ids(place_id, provider, url);

create index if not exists idx_place_external_ids_provider
  on public.place_external_ids(provider);

create trigger trg_place_external_ids_updated_at
before update on public.place_external_ids
for each row execute function public.set_updated_at();

alter table public.place_external_ids enable row level security;
drop policy if exists place_external_ids_read on public.place_external_ids;
create policy place_external_ids_read on public.place_external_ids for select using (true);

-- ---------------------------------------------------------------------------
-- Typed place detail tables
-- ---------------------------------------------------------------------------

create table if not exists public.attractions (
  id uuid primary key default gen_random_uuid(),
  place_id uuid not null unique references public.places(id) on delete cascade,
  category text not null,
  significance text[] not null default '{}',
  importance smallint not null default 0 check (importance between 0 and 10),
  trip_type_slugs text[] not null default '{}',
  cost_adult_minor int not null default 0,
  cost_child_minor int not null default 0,
  currency char(3) not null,
  duration_minutes int,
  indoor boolean not null default false,
  accessibility jsonb not null default '{}'::jsonb,
  kid_friendly boolean not null default false,
  lgbtq_friendly boolean not null default false,
  photography_allowed boolean not null default false,
  dress_code text,
  dress_notes text,
  best_time_notes text,
  official_url text,
  reseller_urls jsonb not null default '{}'::jsonb,
  source text not null default 'seed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_attractions_category
  on public.attractions(category);

create index if not exists idx_attractions_importance
  on public.attractions(importance desc);

create index if not exists idx_attractions_trip_types
  on public.attractions using gin(trip_type_slugs);

create trigger trg_attractions_updated_at
before update on public.attractions
for each row execute function public.set_updated_at();

alter table public.attractions enable row level security;
drop policy if exists attractions_read on public.attractions;
create policy attractions_read on public.attractions
  for select using (
    exists (
      select 1 from public.places p
       where p.id = place_id and p.status = 'published'
    )
  );

create table if not exists public.restaurants (
  id uuid primary key default gen_random_uuid(),
  place_id uuid not null unique references public.places(id) on delete cascade,
  cuisine text[] not null default '{}',
  price_band text not null check (price_band in ('$', '$$', '$$$', '$$$$', '$$$$$')),
  avg_price_per_person_minor int,
  currency char(3) not null,
  signature_dishes text[] not null default '{}',
  reservation_required boolean not null default false,
  reservations_lead_time_days int not null default 0,
  reservation_url text,
  opening_hours text,
  closed_days text[] not null default '{}',
  google_rating numeric(2,1),
  google_review_count int,
  tabelog_score numeric(3,2),
  michelin_stars smallint not null default 0,
  bib_gourmand boolean not null default false,
  dietary text[] not null default '{}',
  lgbtq_friendly boolean not null default false,
  kid_friendly boolean not null default false,
  wheelchair_accessible boolean not null default false,
  notes text,
  source text not null default 'seed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_restaurants_cuisine
  on public.restaurants using gin(cuisine);

create index if not exists idx_restaurants_dietary
  on public.restaurants using gin(dietary);

create index if not exists idx_restaurants_price_band
  on public.restaurants(price_band);

create index if not exists idx_restaurants_google_rating
  on public.restaurants(google_rating desc);

create trigger trg_restaurants_updated_at
before update on public.restaurants
for each row execute function public.set_updated_at();

alter table public.restaurants enable row level security;
drop policy if exists restaurants_read on public.restaurants;
create policy restaurants_read on public.restaurants
  for select using (
    exists (
      select 1 from public.places p
       where p.id = place_id and p.status = 'published'
    )
  );
