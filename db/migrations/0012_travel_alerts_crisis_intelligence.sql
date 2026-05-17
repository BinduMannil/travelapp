-- Live travel alerts and crisis intelligence.
--
-- Traveler operational intelligence for severe weather, disruption, safety,
-- health, airport, transport, embassy, and legal/social alerts. This is not a
-- news feed; rows are concise, sourced, reviewed, and action-oriented.

create table if not exists public.travel_alerts (
  id uuid primary key default gen_random_uuid(),
  alert_key text not null unique,
  alert_type text not null check (
    alert_type in (
      'weather',
      'disaster',
      'political',
      'transport',
      'health',
      'internet_connectivity',
      'airport',
      'embassy',
      'legal_social',
      'public_safety'
    )
  ),
  scope_kind text not null check (
    scope_kind in (
      'global',
      'country',
      'city',
      'neighborhood',
      'airport',
      'transport',
      'route'
    )
  ),
  country_id uuid references public.countries(id) on delete set null,
  city_id uuid references public.cities(id) on delete set null,
  neighborhood_id uuid references public.neighborhoods(id) on delete set null,
  place_id uuid references public.places(id) on delete set null,
  entity_reference text,
  title text not null,
  short_summary text not null,
  traveler_impact text not null,
  severity_level text not null default 'moderate' check (
    severity_level in ('low', 'moderate', 'high', 'critical')
  ),
  urgency_level text not null default 'watch' check (
    urgency_level in ('info', 'watch', 'plan_around', 'avoid_area', 'urgent')
  ),
  starts_at timestamptz,
  ends_at timestamptz,
  affected_regions text[] not null default '{}',
  affected_transport text[] not null default '{}',
  impact_categories text[] not null default '{}',
  airport_disruption boolean not null default false,
  train_disruption boolean not null default false,
  road_closures boolean not null default false,
  ferry_impact boolean not null default false,
  nightlife_restrictions boolean not null default false,
  beach_closures boolean not null default false,
  atm_payment_disruption boolean not null default false,
  internet_disruption boolean not null default false,
  embassy_recommendations text[] not null default '{}',
  evacuation_guidance text,
  curfew_rules text,
  source_label text not null,
  source_url text not null,
  reviewed_at timestamptz,
  confidence_level text not null default 'medium' check (
    confidence_level in ('low', 'medium', 'high')
  ),
  update_frequency text not null default 'as_needed' check (
    update_frequency in ('real_time', 'hourly', 'daily', 'as_needed', 'manual')
  ),
  active_status text not null default 'inactive' check (
    active_status in ('active', 'monitoring', 'inactive', 'resolved', 'archived')
  ),
  status text not null default 'draft' check (
    status in ('draft', 'published', 'archived')
  ),
  created_by uuid references auth.users(id) on delete set null,
  reviewed_by uuid references auth.users(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or starts_at is null or ends_at >= starts_at),
  check (jsonb_typeof(metadata) = 'object'),
  check (
    scope_kind = 'global' or
    country_id is not null or
    city_id is not null or
    neighborhood_id is not null or
    place_id is not null or
    entity_reference is not null
  )
);

create index if not exists idx_travel_alerts_active
  on public.travel_alerts(active_status, severity_level, urgency_level);

create index if not exists idx_travel_alerts_country_active
  on public.travel_alerts(country_id, active_status, starts_at desc);

create index if not exists idx_travel_alerts_city_active
  on public.travel_alerts(city_id, active_status, starts_at desc);

create index if not exists idx_travel_alerts_neighborhood_active
  on public.travel_alerts(neighborhood_id, active_status, starts_at desc);

create index if not exists idx_travel_alerts_place_active
  on public.travel_alerts(place_id, active_status, starts_at desc);

create index if not exists idx_travel_alerts_type
  on public.travel_alerts(alert_type);

create index if not exists idx_travel_alerts_affected_regions
  on public.travel_alerts using gin(affected_regions);

create index if not exists idx_travel_alerts_affected_transport
  on public.travel_alerts using gin(affected_transport);

create index if not exists idx_travel_alerts_impact_categories
  on public.travel_alerts using gin(impact_categories);

drop trigger if exists trg_travel_alerts_updated_at on public.travel_alerts;
create trigger trg_travel_alerts_updated_at
before update on public.travel_alerts
for each row execute function public.set_updated_at();

alter table public.travel_alerts enable row level security;

drop policy if exists travel_alerts_read_published on public.travel_alerts;
create policy travel_alerts_read_published
  on public.travel_alerts for select
  using (status = 'published' and active_status in ('active', 'monitoring'));

drop policy if exists travel_alerts_moderator_all on public.travel_alerts;
create policy travel_alerts_moderator_all
  on public.travel_alerts for all
  using (public.is_moderator())
  with check (public.is_moderator());

create table if not exists public.travel_alert_banners (
  id uuid primary key default gen_random_uuid(),
  alert_id uuid not null references public.travel_alerts(id) on delete cascade,
  banner_key text not null unique,
  placement text not null check (
    placement in ('homepage', 'country', 'city', 'itinerary', 'contextual_route')
  ),
  country_id uuid references public.countries(id) on delete set null,
  city_id uuid references public.cities(id) on delete set null,
  neighborhood_id uuid references public.neighborhoods(id) on delete set null,
  route_context jsonb not null default '{}'::jsonb,
  title text not null,
  short_summary text not null,
  display_style text not null default 'warning' check (
    display_style in ('info', 'warning', 'urgent', 'critical')
  ),
  priority integer not null default 50 check (priority between 1 and 100),
  starts_at timestamptz,
  ends_at timestamptz,
  cta_label text,
  cta_url text,
  active boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or starts_at is null or ends_at >= starts_at),
  check (jsonb_typeof(route_context) = 'object'),
  check (jsonb_typeof(metadata) = 'object')
);

create index if not exists idx_travel_alert_banners_placement
  on public.travel_alert_banners(placement, active, priority desc);

create index if not exists idx_travel_alert_banners_country
  on public.travel_alert_banners(country_id, active, priority desc);

create index if not exists idx_travel_alert_banners_city
  on public.travel_alert_banners(city_id, active, priority desc);

create index if not exists idx_travel_alert_banners_neighborhood
  on public.travel_alert_banners(neighborhood_id, active, priority desc);

create index if not exists idx_travel_alert_banners_route_context
  on public.travel_alert_banners using gin(route_context);

drop trigger if exists trg_travel_alert_banners_updated_at
  on public.travel_alert_banners;
create trigger trg_travel_alert_banners_updated_at
before update on public.travel_alert_banners
for each row execute function public.set_updated_at();

alter table public.travel_alert_banners enable row level security;

drop policy if exists travel_alert_banners_read_active
  on public.travel_alert_banners;
create policy travel_alert_banners_read_active
  on public.travel_alert_banners for select
  using (active = true);

drop policy if exists travel_alert_banners_moderator_all
  on public.travel_alert_banners;
create policy travel_alert_banners_moderator_all
  on public.travel_alert_banners for all
  using (public.is_moderator())
  with check (public.is_moderator());
