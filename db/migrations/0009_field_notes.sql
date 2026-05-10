-- Internal field notes.
--
-- Private capture layer for real-world travel observations collected by
-- Journee team members while traveling. This table is intentionally not public:
-- it is for internal capture, review, and later promotion into canonical data.

create table if not exists public.field_notes (
  id uuid primary key default gen_random_uuid(),
  country_id uuid references public.countries(id) on delete set null,
  city_id uuid references public.cities(id) on delete set null,
  neighborhood_id uuid references public.neighborhoods(id) on delete set null,
  place_id uuid references public.places(id) on delete set null,
  note_category text not null check (
    note_category in (
      'price_observation',
      'payment_observation',
      'safety_observation',
      'scam_warning',
      'local_app_note',
      'transport_note',
      'legal_social_risk_note',
      'food_restaurant_note',
      'neighborhood_reality',
      'cultural_observation',
      'general_observation',
      'other'
    )
  ),
  short_note text not null,
  long_note text,
  price_observation jsonb not null default '{}'::jsonb,
  payment_observation text,
  safety_observation text,
  scam_warning text,
  local_app_note text,
  transport_note text,
  legal_social_risk_note text,
  food_restaurant_note text,
  photo_references jsonb not null default '[]'::jsonb,
  source_type text not null check (
    source_type in (
      'personal_observation',
      'official_source',
      'local_advice',
      'receipt',
      'screenshot'
    )
  ),
  confidence_level text not null default 'medium' check (
    confidence_level in ('low', 'medium', 'high')
  ),
  review_status text not null default 'unreviewed' check (
    review_status in ('unreviewed', 'needs_followup', 'approved', 'rejected', 'promoted')
  ),
  created_by uuid references auth.users(id) on delete set null,
  reviewed_by uuid references auth.users(id) on delete set null,
  observed_at timestamptz,
  reviewed_at timestamptz,
  source_label text,
  source_url text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (jsonb_typeof(price_observation) = 'object'),
  check (jsonb_typeof(photo_references) = 'array'),
  check (jsonb_typeof(metadata) = 'object'),
  check (
    country_id is not null or
    city_id is not null or
    neighborhood_id is not null or
    place_id is not null
  )
);

create index if not exists idx_field_notes_country_created
  on public.field_notes(country_id, created_at desc);

create index if not exists idx_field_notes_city_created
  on public.field_notes(city_id, created_at desc);

create index if not exists idx_field_notes_neighborhood_created
  on public.field_notes(neighborhood_id, created_at desc);

create index if not exists idx_field_notes_place_created
  on public.field_notes(place_id, created_at desc);

create index if not exists idx_field_notes_category
  on public.field_notes(note_category);

create index if not exists idx_field_notes_review_status
  on public.field_notes(review_status);

create index if not exists idx_field_notes_created_by
  on public.field_notes(created_by, created_at desc);

create index if not exists idx_field_notes_price_observation
  on public.field_notes using gin(price_observation);

create index if not exists idx_field_notes_photo_references
  on public.field_notes using gin(photo_references);

drop trigger if exists trg_field_notes_updated_at on public.field_notes;
create trigger trg_field_notes_updated_at
before update on public.field_notes
for each row execute function public.set_updated_at();

alter table public.field_notes enable row level security;

drop policy if exists field_notes_insert_own on public.field_notes;
create policy field_notes_insert_own
  on public.field_notes for insert
  with check (auth.uid() = created_by);

drop policy if exists field_notes_select_internal on public.field_notes;
create policy field_notes_select_internal
  on public.field_notes for select
  using (created_by = auth.uid() or public.is_moderator());

drop policy if exists field_notes_update_own_unreviewed on public.field_notes;
create policy field_notes_update_own_unreviewed
  on public.field_notes for update
  using (created_by = auth.uid() and review_status in ('unreviewed', 'needs_followup'))
  with check (
    created_by = auth.uid() and
    review_status in ('unreviewed', 'needs_followup') and
    reviewed_by is null and
    reviewed_at is null
  );

drop policy if exists field_notes_review_moderator on public.field_notes;
create policy field_notes_review_moderator
  on public.field_notes for update
  using (public.is_moderator())
  with check (public.is_moderator());

drop policy if exists field_notes_delete_admin on public.field_notes;
create policy field_notes_delete_admin
  on public.field_notes for delete
  using (public.is_admin());
