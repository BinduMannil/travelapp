-- Legal & social risk intelligence.
--
-- Traveler-facing risk awareness, not formal legal advice. Rows are scoped to
-- a country with optional city override/addition. Content is public-readable
-- when published; writes remain service-role-only through RLS.

create table if not exists public.legal_social_risks (
  id uuid primary key default gen_random_uuid(),
  country_id uuid not null references public.countries(id) on delete cascade,
  city_id uuid references public.cities(id) on delete cascade,
  risk_category text not null check (
    risk_category in (
      'social_media_online_speech',
      'alcohol_public_behavior',
      'public_conduct',
      'lgbtq_relationships',
      'drugs_medication_controlled_substances',
      'police_official_interaction',
      'immigration_entry',
      'photography_filming',
      'local_sensitivities'
    )
  ),
  risk_level text not null check (
    risk_level in ('low', 'moderate', 'high', 'critical')
  ),
  traveler_summary text not null,
  what_not_to_do text[] not null default '{}',
  practical_safe_behavior text[] not null default '{}',
  examples text[] not null default '{}',
  source_label text not null,
  source_url text not null,
  reviewed_at date not null,
  last_updated timestamptz not null default now(),
  confidence_level text not null check (
    confidence_level in ('low', 'medium', 'high')
  ),
  legal_disclaimer text not null,
  display_order int not null default 0,
  status text not null default 'published' check (
    status in ('draft', 'published', 'archived')
  ),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists uq_legal_social_risks_country
  on public.legal_social_risks(country_id, risk_category)
  where city_id is null;

create unique index if not exists uq_legal_social_risks_city
  on public.legal_social_risks(country_id, city_id, risk_category)
  where city_id is not null;

create index if not exists idx_legal_social_risks_country_order
  on public.legal_social_risks(country_id, display_order);

create index if not exists idx_legal_social_risks_city_order
  on public.legal_social_risks(city_id, display_order)
  where city_id is not null;

create index if not exists idx_legal_social_risks_category
  on public.legal_social_risks(risk_category);

create index if not exists idx_legal_social_risks_level
  on public.legal_social_risks(risk_level);

drop trigger if exists trg_legal_social_risks_updated_at
  on public.legal_social_risks;
create trigger trg_legal_social_risks_updated_at
before update on public.legal_social_risks
for each row execute function public.set_updated_at();

alter table public.legal_social_risks enable row level security;
drop policy if exists legal_social_risks_read on public.legal_social_risks;
create policy legal_social_risks_read on public.legal_social_risks
  for select using (status = 'published');
