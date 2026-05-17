-- Neighborhood and social reality intelligence.
--
-- Practical, respectful, observational data that helps travelers understand
-- what a place feels like in real life: neighborhood atmosphere, behavior
-- patterns, social expectations, and useful contrasts between areas.

create table if not exists public.neighborhood_intelligence (
  id uuid primary key default gen_random_uuid(),
  city_id uuid not null references public.cities(id) on delete cascade,
  neighborhood_id uuid not null references public.neighborhoods(id) on delete cascade,
  vibe_tags text[] not null default '{}',
  luxury_level text not null default 'mixed' check (
    luxury_level in ('budget', 'mid_range', 'upscale', 'luxury', 'mixed')
  ),
  wealth_profile text not null default 'mixed' check (
    wealth_profile in (
      'working_class',
      'mixed',
      'middle_income',
      'upper_middle_affluent',
      'high_net_worth',
      'tourist_economy'
    )
  ),
  local_expat_mix text not null default 'mixed' check (
    local_expat_mix in (
      'mostly_local',
      'local_leaning',
      'mixed',
      'expat_leaning',
      'mostly_expat'
    )
  ),
  tourism_level text not null default 'moderate' check (
    tourism_level in ('local', 'low', 'moderate', 'high', 'tourist_core')
  ),
  nightlife_intensity text not null default 'moderate' check (
    nightlife_intensity in ('low', 'moderate', 'high', 'extreme')
  ),
  digital_nomad_friendliness text not null default 'moderate' check (
    digital_nomad_friendliness in ('low', 'moderate', 'high', 'excellent')
  ),
  family_friendliness text not null default 'moderate' check (
    family_friendliness in ('low', 'moderate', 'high', 'excellent')
  ),
  cafe_culture text not null default 'moderate' check (
    cafe_culture in ('low', 'moderate', 'high', 'excellent')
  ),
  shopping_level text not null default 'moderate' check (
    shopping_level in ('low', 'moderate', 'high', 'luxury')
  ),
  transport_quality text not null default 'good' check (
    transport_quality in ('limited', 'basic', 'good', 'excellent')
  ),
  walkability text not null default 'good' check (
    walkability in ('limited', 'basic', 'good', 'excellent')
  ),
  safety_at_night text not null default 'varies' check (
    safety_at_night in ('low', 'moderate', 'good', 'high', 'varies')
  ),
  dress_expectations text[] not null default '{}',
  language_accessibility text not null default 'moderate' check (
    language_accessibility in ('low', 'moderate', 'good', 'high')
  ),
  setting_tags text[] not null default '{}',
  atmosphere_scores jsonb not null default '{}'::jsonb,
  social_expectations text[] not null default '{}',
  safety_notes text[] not null default '{}',
  recommended_for text[] not null default '{}',
  avoid_if text[] not null default '{}',
  traveler_type_fit jsonb not null default '{}'::jsonb,
  what_it_feels_like text not null,
  practical_notes text[] not null default '{}',
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
  unique (neighborhood_id),
  check (jsonb_typeof(atmosphere_scores) = 'object'),
  check (jsonb_typeof(traveler_type_fit) = 'object')
);

create index if not exists idx_neighborhood_intelligence_city_order
  on public.neighborhood_intelligence(city_id, display_order);

create index if not exists idx_neighborhood_intelligence_neighborhood
  on public.neighborhood_intelligence(neighborhood_id);

create index if not exists idx_neighborhood_intelligence_vibe_tags
  on public.neighborhood_intelligence using gin(vibe_tags);

create index if not exists idx_neighborhood_intelligence_setting_tags
  on public.neighborhood_intelligence using gin(setting_tags);

create index if not exists idx_neighborhood_intelligence_atmosphere
  on public.neighborhood_intelligence using gin(atmosphere_scores);

drop trigger if exists trg_neighborhood_intelligence_updated_at
  on public.neighborhood_intelligence;
create trigger trg_neighborhood_intelligence_updated_at
before update on public.neighborhood_intelligence
for each row execute function public.set_updated_at();

alter table public.neighborhood_intelligence enable row level security;
drop policy if exists neighborhood_intelligence_read
  on public.neighborhood_intelligence;
create policy neighborhood_intelligence_read
  on public.neighborhood_intelligence for select using (status = 'published');

create table if not exists public.social_reality_notes (
  id uuid primary key default gen_random_uuid(),
  owner_kind text not null check (owner_kind in ('city', 'neighborhood')),
  city_id uuid not null references public.cities(id) on delete cascade,
  neighborhood_id uuid references public.neighborhoods(id) on delete cascade,
  note_key text not null,
  reality_category text not null check (
    reality_category in (
      'local_behavior',
      'social_norms',
      'work_culture',
      'networking_culture',
      'public_behavior',
      'rude_behavior',
      'normal_behavior',
      'class_signals',
      'appearance_expectations',
      'reservation_culture',
      'nightlife_behavior',
      'queue_culture',
      'bargaining_culture',
      'noise_expectations',
      'transport_behavior',
      'cafe_culture',
      'other'
    )
  ),
  title text not null,
  traveler_summary text not null,
  what_is_normal text[] not null default '{}',
  what_is_rude text[] not null default '{}',
  practical_guidance text[] not null default '{}',
  examples text[] not null default '{}',
  social_context text,
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
    (owner_kind = 'city' and neighborhood_id is null) or
    (owner_kind = 'neighborhood' and neighborhood_id is not null)
  )
);

create unique index if not exists uq_social_reality_notes_city
  on public.social_reality_notes(city_id, note_key)
  where owner_kind = 'city';

create unique index if not exists uq_social_reality_notes_neighborhood
  on public.social_reality_notes(neighborhood_id, note_key)
  where owner_kind = 'neighborhood';

create index if not exists idx_social_reality_notes_city_order
  on public.social_reality_notes(city_id, display_order);

create index if not exists idx_social_reality_notes_neighborhood_order
  on public.social_reality_notes(neighborhood_id, display_order)
  where owner_kind = 'neighborhood';

create index if not exists idx_social_reality_notes_category
  on public.social_reality_notes(reality_category);

drop trigger if exists trg_social_reality_notes_updated_at
  on public.social_reality_notes;
create trigger trg_social_reality_notes_updated_at
before update on public.social_reality_notes
for each row execute function public.set_updated_at();

alter table public.social_reality_notes enable row level security;
drop policy if exists social_reality_notes_read
  on public.social_reality_notes;
create policy social_reality_notes_read
  on public.social_reality_notes for select using (status = 'published');

create table if not exists public.neighborhood_relationships (
  id uuid primary key default gen_random_uuid(),
  city_id uuid not null references public.cities(id) on delete cascade,
  from_neighborhood_id uuid not null references public.neighborhoods(id) on delete cascade,
  to_neighborhood_id uuid not null references public.neighborhoods(id) on delete cascade,
  relationship_kind text not null check (
    relationship_kind in (
      'nearby',
      'upscale_contrast',
      'budget_contrast',
      'tourist_stay',
      'local_hangout',
      'digital_nomad_base',
      'hidden_local_area',
      'nightlife_alternative',
      'shopping_alternative',
      'transit_link',
      'atmosphere_contrast',
      'other'
    )
  ),
  traveler_summary text not null,
  distance_note text,
  practical_use text[] not null default '{}',
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
  unique (from_neighborhood_id, to_neighborhood_id, relationship_kind),
  check (from_neighborhood_id <> to_neighborhood_id)
);

create index if not exists idx_neighborhood_relationships_city_order
  on public.neighborhood_relationships(city_id, display_order);

create index if not exists idx_neighborhood_relationships_from
  on public.neighborhood_relationships(from_neighborhood_id, display_order);

create index if not exists idx_neighborhood_relationships_to
  on public.neighborhood_relationships(to_neighborhood_id);

create index if not exists idx_neighborhood_relationships_kind
  on public.neighborhood_relationships(relationship_kind);

drop trigger if exists trg_neighborhood_relationships_updated_at
  on public.neighborhood_relationships;
create trigger trg_neighborhood_relationships_updated_at
before update on public.neighborhood_relationships
for each row execute function public.set_updated_at();

alter table public.neighborhood_relationships enable row level security;
drop policy if exists neighborhood_relationships_read
  on public.neighborhood_relationships;
create policy neighborhood_relationships_read
  on public.neighborhood_relationships for select using (status = 'published');
