-- Airport operations and arrival intelligence.
--
-- Operational traveler intelligence for airports, immigration, baggage,
-- arrivals, transport, airport services, and airport-specific risks.

create table if not exists public.airports (
  id uuid primary key default gen_random_uuid(),
  country_id uuid not null references public.countries(id) on delete cascade,
  city_id uuid references public.cities(id) on delete set null,
  iata_code char(3) not null unique,
  icao_code char(4),
  name text not null,
  city_served text,
  timezone text,
  lat numeric(9,6),
  lon numeric(9,6),
  official_url text,
  profile_summary text,
  arrivals_summary text,
  departures_summary text,
  terminal_map_url text,
  source_label text,
  source_url text,
  reviewed_at date,
  confidence_level text not null default 'medium' check (
    confidence_level in ('low', 'medium', 'high')
  ),
  status text not null default 'published' check (
    status in ('draft', 'published', 'archived')
  ),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (jsonb_typeof(metadata) = 'object')
);

create index if not exists idx_airports_country
  on public.airports(country_id, iata_code);

create index if not exists idx_airports_city
  on public.airports(city_id, iata_code);

drop trigger if exists trg_airports_updated_at on public.airports;
create trigger trg_airports_updated_at
before update on public.airports
for each row execute function public.set_updated_at();

alter table public.airports enable row level security;
drop policy if exists airports_read on public.airports;
create policy airports_read on public.airports
  for select using (status = 'published');

create table if not exists public.airport_terminals (
  id uuid primary key default gen_random_uuid(),
  airport_id uuid not null references public.airports(id) on delete cascade,
  terminal_key text not null,
  name text not null,
  terminal_type text not null default 'mixed' check (
    terminal_type in ('domestic', 'international', 'mixed', 'cargo', 'other')
  ),
  arrivals_available boolean not null default true,
  departures_available boolean not null default true,
  terminal_map_url text,
  sim_esim_locations text[] not null default '{}',
  atm_locations text[] not null default '{}',
  exchange_counters text[] not null default '{}',
  lounges text[] not null default '{}',
  sleep_rest_areas text[] not null default '{}',
  prayer_rooms text[] not null default '{}',
  family_facilities text[] not null default '{}',
  accessibility_support text[] not null default '{}',
  traveler_notes text[] not null default '{}',
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
  unique (airport_id, terminal_key),
  check (jsonb_typeof(metadata) = 'object')
);

create index if not exists idx_airport_terminals_airport_order
  on public.airport_terminals(airport_id, display_order);

drop trigger if exists trg_airport_terminals_updated_at
  on public.airport_terminals;
create trigger trg_airport_terminals_updated_at
before update on public.airport_terminals
for each row execute function public.set_updated_at();

alter table public.airport_terminals enable row level security;
drop policy if exists airport_terminals_read on public.airport_terminals;
create policy airport_terminals_read on public.airport_terminals
  for select using (status = 'published');

create table if not exists public.airport_operations_intelligence (
  id uuid primary key default gen_random_uuid(),
  airport_id uuid not null references public.airports(id) on delete cascade,
  terminal_id uuid references public.airport_terminals(id) on delete cascade,
  intelligence_key text not null,
  immigration_strictness text not null default 'moderate' check (
    immigration_strictness in ('low', 'moderate', 'high', 'very_high', 'varies')
  ),
  immigration_wait_min_minutes int check (
    immigration_wait_min_minutes is null or immigration_wait_min_minutes >= 0
  ),
  immigration_wait_max_minutes int check (
    immigration_wait_max_minutes is null or immigration_wait_max_minutes >= 0
  ),
  egate_available boolean,
  fast_track_available boolean,
  hotel_booking_checks text not null default 'unknown' check (
    hotel_booking_checks in ('rare', 'sometimes', 'common', 'strict', 'unknown')
  ),
  onward_ticket_checks text not null default 'unknown' check (
    onward_ticket_checks in ('rare', 'sometimes', 'common', 'strict', 'unknown')
  ),
  proof_of_funds_checks text not null default 'unknown' check (
    proof_of_funds_checks in ('rare', 'sometimes', 'common', 'strict', 'unknown')
  ),
  english_support_level text not null default 'moderate' check (
    english_support_level in ('low', 'moderate', 'good', 'high', 'varies')
  ),
  common_traveler_issues text[] not null default '{}',
  customs_strictness text not null default 'moderate' check (
    customs_strictness in ('low', 'moderate', 'high', 'very_high', 'varies')
  ),
  baggage_wait_min_minutes int check (
    baggage_wait_min_minutes is null or baggage_wait_min_minutes >= 0
  ),
  baggage_wait_max_minutes int check (
    baggage_wait_max_minutes is null or baggage_wait_max_minutes >= 0
  ),
  luggage_belts_count int check (
    luggage_belts_count is null or luggage_belts_count >= 0
  ),
  congestion_notes text[] not null default '{}',
  customs_routing text,
  late_night_operations text,
  airport_closure_patterns text,
  peak_crowd_times text[] not null default '{}',
  operational_metrics jsonb not null default '{}'::jsonb,
  queue_estimates jsonb not null default '{}'::jsonb,
  traveler_notes text[] not null default '{}',
  traveler_type_support jsonb not null default '{}'::jsonb,
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
  unique (airport_id, intelligence_key),
  check (
    immigration_wait_max_minutes is null or
    immigration_wait_min_minutes is null or
    immigration_wait_max_minutes >= immigration_wait_min_minutes
  ),
  check (
    baggage_wait_max_minutes is null or
    baggage_wait_min_minutes is null or
    baggage_wait_max_minutes >= baggage_wait_min_minutes
  ),
  check (jsonb_typeof(operational_metrics) = 'object'),
  check (jsonb_typeof(queue_estimates) = 'object'),
  check (jsonb_typeof(traveler_type_support) = 'object'),
  check (jsonb_typeof(metadata) = 'object')
);

create index if not exists idx_airport_operations_airport_order
  on public.airport_operations_intelligence(airport_id, display_order);

create index if not exists idx_airport_operations_terminal
  on public.airport_operations_intelligence(terminal_id, display_order);

create index if not exists idx_airport_operations_metrics
  on public.airport_operations_intelligence using gin(operational_metrics);

drop trigger if exists trg_airport_operations_updated_at
  on public.airport_operations_intelligence;
create trigger trg_airport_operations_updated_at
before update on public.airport_operations_intelligence
for each row execute function public.set_updated_at();

alter table public.airport_operations_intelligence enable row level security;
drop policy if exists airport_operations_read
  on public.airport_operations_intelligence;
create policy airport_operations_read
  on public.airport_operations_intelligence for select
  using (status = 'published');

create table if not exists public.airport_transport_nodes (
  id uuid primary key default gen_random_uuid(),
  airport_id uuid not null references public.airports(id) on delete cascade,
  terminal_id uuid references public.airport_terminals(id) on delete cascade,
  node_key text not null,
  node_type text not null check (
    node_type in (
      'official_taxi',
      'ride_hailing',
      'metro_train',
      'shuttle_bus',
      'public_bus',
      'ferry',
      'scooter_rental',
      'walking_route',
      'car_rental',
      'other'
    )
  ),
  name text not null,
  pickup_location text,
  walking_instructions text,
  operating_hours text,
  late_night_reliability text not null default 'unknown' check (
    late_night_reliability in ('low', 'moderate', 'good', 'high', 'unknown')
  ),
  payment_notes text,
  official boolean not null default false,
  traveler_notes text[] not null default '{}',
  risk_notes text[] not null default '{}',
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
  unique (airport_id, node_key),
  check (jsonb_typeof(metadata) = 'object')
);

create index if not exists idx_airport_transport_airport_order
  on public.airport_transport_nodes(airport_id, display_order);

create index if not exists idx_airport_transport_terminal
  on public.airport_transport_nodes(terminal_id, display_order);

create index if not exists idx_airport_transport_type
  on public.airport_transport_nodes(node_type);

drop trigger if exists trg_airport_transport_nodes_updated_at
  on public.airport_transport_nodes;
create trigger trg_airport_transport_nodes_updated_at
before update on public.airport_transport_nodes
for each row execute function public.set_updated_at();

alter table public.airport_transport_nodes enable row level security;
drop policy if exists airport_transport_nodes_read
  on public.airport_transport_nodes;
create policy airport_transport_nodes_read
  on public.airport_transport_nodes for select
  using (status = 'published');

create table if not exists public.airport_risk_notes (
  id uuid primary key default gen_random_uuid(),
  airport_id uuid not null references public.airports(id) on delete cascade,
  terminal_id uuid references public.airport_terminals(id) on delete cascade,
  risk_key text not null,
  risk_category text not null check (
    risk_category in (
      'fake_taxi',
      'sim_kiosk_overpricing',
      'baggage_scam',
      'unofficial_transport',
      'currency_exchange_trap',
      'late_night_arrival',
      'crowding',
      'other'
    )
  ),
  risk_level text not null default 'moderate' check (
    risk_level in ('low', 'moderate', 'high', 'critical')
  ),
  traveler_summary text not null,
  what_to_do text[] not null default '{}',
  avoid text[] not null default '{}',
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
  unique (airport_id, risk_key),
  check (jsonb_typeof(metadata) = 'object')
);

create index if not exists idx_airport_risk_airport_order
  on public.airport_risk_notes(airport_id, display_order);

create index if not exists idx_airport_risk_terminal
  on public.airport_risk_notes(terminal_id, display_order);

create index if not exists idx_airport_risk_category
  on public.airport_risk_notes(risk_category);

drop trigger if exists trg_airport_risk_notes_updated_at
  on public.airport_risk_notes;
create trigger trg_airport_risk_notes_updated_at
before update on public.airport_risk_notes
for each row execute function public.set_updated_at();

alter table public.airport_risk_notes enable row level security;
drop policy if exists airport_risk_notes_read
  on public.airport_risk_notes;
create policy airport_risk_notes_read
  on public.airport_risk_notes for select
  using (status = 'published');
