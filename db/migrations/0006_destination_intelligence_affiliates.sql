-- Destination travel intelligence notes and affiliate opportunity scaffolding.
--
-- Additive only. These tables are reusable across countries/cities and support
-- Vietnam's first real-world daily-use companion stack without changing
-- existing JSON-backed pages.

create table if not exists public.destination_intelligence_notes (
  id uuid primary key default gen_random_uuid(),
  owner_kind text not null check (owner_kind in ('country', 'city')),
  country_id uuid references public.countries(id) on delete cascade,
  city_id uuid references public.cities(id) on delete cascade,
  intelligence_category text not null check (
    intelligence_category in (
      'visa_entry',
      'money_payments',
      'scams',
      'police_official_interaction',
      'street_crossing',
      'scooter_motorbike',
      'connectivity_sim_esim',
      'weather_region',
      'nightlife',
      'local_etiquette',
      'transport',
      'health_safety',
      'digital_nomad',
      'other'
    )
  ),
  risk_level text check (risk_level in ('low', 'moderate', 'high', 'critical')),
  title text not null,
  traveler_summary text not null,
  practical_guidance text[] not null default '{}',
  watchouts text[] not null default '{}',
  examples text[] not null default '{}',
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
    (owner_kind = 'country' and country_id is not null and city_id is null) or
    (owner_kind = 'city' and city_id is not null and country_id is null)
  )
);

create unique index if not exists uq_destination_intelligence_country
  on public.destination_intelligence_notes(country_id, intelligence_category, title)
  where owner_kind = 'country';

create unique index if not exists uq_destination_intelligence_city
  on public.destination_intelligence_notes(city_id, intelligence_category, title)
  where owner_kind = 'city';

create index if not exists idx_destination_intelligence_country_order
  on public.destination_intelligence_notes(country_id, display_order)
  where owner_kind = 'country';

create index if not exists idx_destination_intelligence_city_order
  on public.destination_intelligence_notes(city_id, display_order)
  where owner_kind = 'city';

create index if not exists idx_destination_intelligence_category
  on public.destination_intelligence_notes(intelligence_category);

drop trigger if exists trg_destination_intelligence_notes_updated_at
  on public.destination_intelligence_notes;
create trigger trg_destination_intelligence_notes_updated_at
before update on public.destination_intelligence_notes
for each row execute function public.set_updated_at();

alter table public.destination_intelligence_notes enable row level security;
drop policy if exists destination_intelligence_notes_read
  on public.destination_intelligence_notes;
create policy destination_intelligence_notes_read
  on public.destination_intelligence_notes for select using (status = 'published');

create table if not exists public.destination_affiliate_opportunities (
  id uuid primary key default gen_random_uuid(),
  owner_kind text not null check (owner_kind in ('country', 'city')),
  country_id uuid references public.countries(id) on delete cascade,
  city_id uuid references public.cities(id) on delete cascade,
  opportunity_key text not null,
  category text not null check (
    category in (
      'hotels',
      'tours',
      'esim',
      'transfers',
      'activities',
      'buses_trains',
      'insurance',
      'cars',
      'other'
    )
  ),
  traveler_need text not null,
  recommended_partner_keys text[] not null default '{}',
  placement_context text[] not null default '{}',
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  notes text,
  status text not null default 'planned' check (
    status in ('planned', 'active', 'paused', 'archived')
  ),
  display_order int not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    (owner_kind = 'country' and country_id is not null and city_id is null) or
    (owner_kind = 'city' and city_id is not null and country_id is null)
  )
);

create unique index if not exists uq_destination_affiliate_country
  on public.destination_affiliate_opportunities(country_id, opportunity_key)
  where owner_kind = 'country';

create unique index if not exists uq_destination_affiliate_city
  on public.destination_affiliate_opportunities(city_id, opportunity_key)
  where owner_kind = 'city';

create index if not exists idx_destination_affiliate_country_order
  on public.destination_affiliate_opportunities(country_id, display_order)
  where owner_kind = 'country';

create index if not exists idx_destination_affiliate_city_order
  on public.destination_affiliate_opportunities(city_id, display_order)
  where owner_kind = 'city';

create index if not exists idx_destination_affiliate_category
  on public.destination_affiliate_opportunities(category);

drop trigger if exists trg_destination_affiliate_opportunities_updated_at
  on public.destination_affiliate_opportunities;
create trigger trg_destination_affiliate_opportunities_updated_at
before update on public.destination_affiliate_opportunities
for each row execute function public.set_updated_at();

alter table public.destination_affiliate_opportunities enable row level security;
drop policy if exists destination_affiliate_opportunities_read
  on public.destination_affiliate_opportunities;
create policy destination_affiliate_opportunities_read
  on public.destination_affiliate_opportunities
  for select using (status in ('planned', 'active'));
