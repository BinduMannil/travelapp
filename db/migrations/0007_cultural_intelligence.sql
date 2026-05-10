-- Cultural, historical, and sensitivity intelligence.
--
-- Traveler-facing cultural intelligence, not political commentary. This layer
-- helps travelers avoid accidental disrespect, cultural mistakes, legal issues,
-- and travel disruptions around holidays, observances, etiquette, and sensitive
-- topics.

create table if not exists public.cultural_events (
  id uuid primary key default gen_random_uuid(),
  owner_kind text not null check (owner_kind in ('country', 'city')),
  country_id uuid references public.countries(id) on delete cascade,
  city_id uuid references public.cities(id) on delete cascade,
  event_key text not null,
  name text not null,
  event_kind text not null check (
    event_kind in (
      'holiday',
      'festival',
      'national_celebration',
      'regional_celebration',
      'religious_observance',
      'mourning_period',
      'commemoration',
      'other'
    )
  ),
  starts_on date,
  ends_on date,
  recurrence_note text,
  date_note text,
  traveler_summary text not null,
  cultural_context text,
  practical_guidance text[] not null default '{}',
  etiquette_notes text[] not null default '{}',
  public_closure_level text not null default 'none' check (
    public_closure_level in ('none', 'limited', 'moderate', 'major')
  ),
  tourism_surge_level text not null default 'none' check (
    tourism_surge_level in ('none', 'limited', 'moderate', 'major')
  ),
  transport_impact_level text not null default 'none' check (
    transport_impact_level in ('none', 'limited', 'moderate', 'major')
  ),
  crowd_level text not null default 'low' check (
    crowd_level in ('low', 'moderate', 'high', 'extreme')
  ),
  risk_level text not null default 'low' check (
    risk_level in ('low', 'moderate', 'high', 'critical')
  ),
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
  check (ends_on is null or starts_on is null or ends_on >= starts_on),
  check (
    (owner_kind = 'country' and country_id is not null and city_id is null) or
    (owner_kind = 'city' and city_id is not null and country_id is null)
  )
);

create unique index if not exists uq_cultural_events_country
  on public.cultural_events(country_id, event_key)
  where owner_kind = 'country';

create unique index if not exists uq_cultural_events_city
  on public.cultural_events(city_id, event_key)
  where owner_kind = 'city';

create index if not exists idx_cultural_events_country_order
  on public.cultural_events(country_id, display_order)
  where owner_kind = 'country';

create index if not exists idx_cultural_events_city_order
  on public.cultural_events(city_id, display_order)
  where owner_kind = 'city';

create index if not exists idx_cultural_events_kind
  on public.cultural_events(event_kind);

create index if not exists idx_cultural_events_starts_on
  on public.cultural_events(starts_on);

drop trigger if exists trg_cultural_events_updated_at
  on public.cultural_events;
create trigger trg_cultural_events_updated_at
before update on public.cultural_events
for each row execute function public.set_updated_at();

alter table public.cultural_events enable row level security;
drop policy if exists cultural_events_read on public.cultural_events;
create policy cultural_events_read
  on public.cultural_events for select using (status = 'published');

create table if not exists public.cultural_sensitivity_notes (
  id uuid primary key default gen_random_uuid(),
  owner_kind text not null check (owner_kind in ('country', 'city')),
  country_id uuid references public.countries(id) on delete cascade,
  city_id uuid references public.cities(id) on delete cascade,
  note_key text not null,
  sensitivity_category text not null check (
    sensitivity_category in (
      'cultural_etiquette',
      'historical_sensitivity',
      'political_sensitivity',
      'social_taboo',
      'national_pride',
      'restricted_discussion',
      'protest_sensitivity',
      'conflict_war_history',
      'religious_site_behavior',
      'local_behavioral_expectations',
      'alcohol_religious_observance',
      'other'
    )
  ),
  title text not null,
  traveler_summary text not null,
  why_it_matters text,
  avoid text[] not null default '{}',
  practical_safe_behavior text[] not null default '{}',
  examples text[] not null default '{}',
  risk_level text not null default 'low' check (
    risk_level in ('low', 'moderate', 'high', 'critical')
  ),
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

create unique index if not exists uq_cultural_sensitivity_country
  on public.cultural_sensitivity_notes(country_id, note_key)
  where owner_kind = 'country';

create unique index if not exists uq_cultural_sensitivity_city
  on public.cultural_sensitivity_notes(city_id, note_key)
  where owner_kind = 'city';

create index if not exists idx_cultural_sensitivity_country_order
  on public.cultural_sensitivity_notes(country_id, display_order)
  where owner_kind = 'country';

create index if not exists idx_cultural_sensitivity_city_order
  on public.cultural_sensitivity_notes(city_id, display_order)
  where owner_kind = 'city';

create index if not exists idx_cultural_sensitivity_category
  on public.cultural_sensitivity_notes(sensitivity_category);

drop trigger if exists trg_cultural_sensitivity_notes_updated_at
  on public.cultural_sensitivity_notes;
create trigger trg_cultural_sensitivity_notes_updated_at
before update on public.cultural_sensitivity_notes
for each row execute function public.set_updated_at();

alter table public.cultural_sensitivity_notes enable row level security;
drop policy if exists cultural_sensitivity_notes_read
  on public.cultural_sensitivity_notes;
create policy cultural_sensitivity_notes_read
  on public.cultural_sensitivity_notes for select using (status = 'published');
