-- Smart packing and clothing intelligence.
--
-- Destination-aware packing logic that can consider weather, seasonality,
-- activities, traveler type, itinerary style, transportation style, and local
-- cultural expectations without relying on generic checklist copy.

create table if not exists public.packing_items (
  id uuid primary key default gen_random_uuid(),
  item_key text not null unique,
  label text not null,
  packing_category text not null check (
    packing_category in (
      'clothing',
      'footwear',
      'weather_layers',
      'rain_cold_heat',
      'activity_gear',
      'religious_cultural',
      'nightlife_dining',
      'beach_swimming',
      'trekking_hiking',
      'scooter_motorbike',
      'digital_nomad_tech',
      'family_baby',
      'safety_emergency',
      'medical_health',
      'country_practical',
      'documents',
      'toiletries',
      'other'
    )
  ),
  default_importance text not null default 'recommended' check (
    default_importance in ('essential', 'recommended', 'situational', 'nice_to_have')
  ),
  default_required boolean not null default false,
  weight_grams integer check (weight_grams is null or weight_grams >= 0),
  pack_weight_priority integer not null default 50 check (
    pack_weight_priority between 1 and 100
  ),
  reusable boolean not null default true,
  source_label text,
  source_url text,
  reviewed_at date,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (jsonb_typeof(metadata) = 'object')
);

create index if not exists idx_packing_items_category
  on public.packing_items(packing_category);

create index if not exists idx_packing_items_importance
  on public.packing_items(default_importance);

drop trigger if exists trg_packing_items_updated_at on public.packing_items;
create trigger trg_packing_items_updated_at
before update on public.packing_items
for each row execute function public.set_updated_at();

alter table public.packing_items enable row level security;
drop policy if exists packing_items_read on public.packing_items;
create policy packing_items_read on public.packing_items
  for select using (true);

create table if not exists public.destination_packing_rules (
  id uuid primary key default gen_random_uuid(),
  owner_kind text not null check (owner_kind in ('country', 'city', 'region')),
  country_id uuid references public.countries(id) on delete cascade,
  city_id uuid references public.cities(id) on delete cascade,
  region_key text,
  rule_key text not null,
  item_id uuid not null references public.packing_items(id) on delete cascade,
  activity_tags text[] not null default '{}',
  weather_conditions text[] not null default '{}',
  seasonality text[] not null default '{}',
  traveler_profiles text[] not null default '{}',
  itinerary_styles text[] not null default '{}',
  transportation_styles text[] not null default '{}',
  cultural_context_tags text[] not null default '{}',
  clothing_context text[] not null default '{}',
  importance text not null default 'recommended' check (
    importance in ('essential', 'recommended', 'situational', 'nice_to_have')
  ),
  required boolean not null default false,
  priority integer not null default 50 check (priority between 1 and 100),
  pack_weight_priority integer not null default 50 check (
    pack_weight_priority between 1 and 100
  ),
  recommendation_note text not null,
  cultural_notes text,
  weather_notes text,
  activity_notes text,
  region_override_note text,
  quantity_hint text,
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
    (owner_kind = 'country' and country_id is not null and city_id is null and region_key is null) or
    (owner_kind = 'city' and city_id is not null and country_id is null and region_key is null) or
    (owner_kind = 'region' and country_id is not null and city_id is null and region_key is not null)
  ),
  check (jsonb_typeof(metadata) = 'object')
);

create unique index if not exists uq_destination_packing_country_rule
  on public.destination_packing_rules(country_id, rule_key)
  where owner_kind = 'country';

create unique index if not exists uq_destination_packing_city_rule
  on public.destination_packing_rules(city_id, rule_key)
  where owner_kind = 'city';

create unique index if not exists uq_destination_packing_region_rule
  on public.destination_packing_rules(country_id, region_key, rule_key)
  where owner_kind = 'region';

create index if not exists idx_destination_packing_country_order
  on public.destination_packing_rules(country_id, display_order)
  where owner_kind in ('country', 'region');

create index if not exists idx_destination_packing_city_order
  on public.destination_packing_rules(city_id, display_order)
  where owner_kind = 'city';

create index if not exists idx_destination_packing_activity_tags
  on public.destination_packing_rules using gin(activity_tags);

create index if not exists idx_destination_packing_weather_conditions
  on public.destination_packing_rules using gin(weather_conditions);

create index if not exists idx_destination_packing_seasonality
  on public.destination_packing_rules using gin(seasonality);

create index if not exists idx_destination_packing_traveler_profiles
  on public.destination_packing_rules using gin(traveler_profiles);

create index if not exists idx_destination_packing_transportation
  on public.destination_packing_rules using gin(transportation_styles);

drop trigger if exists trg_destination_packing_rules_updated_at
  on public.destination_packing_rules;
create trigger trg_destination_packing_rules_updated_at
before update on public.destination_packing_rules
for each row execute function public.set_updated_at();

alter table public.destination_packing_rules enable row level security;
drop policy if exists destination_packing_rules_read
  on public.destination_packing_rules;
create policy destination_packing_rules_read
  on public.destination_packing_rules for select
  using (status = 'published');
