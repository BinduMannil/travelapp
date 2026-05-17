-- Internal reviews and shared feedback.
--
-- Private first-party review layer for Journee team intelligence. This is not
-- a public review product; rows are internal capture and moderation inputs that
-- can later inform canonical recommendations.

create table if not exists public.internal_reviews (
  id uuid primary key default gen_random_uuid(),
  reviewer_user_id uuid references auth.users(id) on delete set null,
  reviewer_display_name text,
  entity_type text not null check (
    entity_type in (
      'country',
      'city',
      'neighborhood',
      'place',
      'hotel_stay',
      'restaurant',
      'attraction_site',
      'activity_tour',
      'transport_provider_route',
      'airport_arrival_experience',
      'local_app_service'
    )
  ),
  entity_id uuid,
  entity_reference text,
  country_id uuid references public.countries(id) on delete set null,
  city_id uuid references public.cities(id) on delete set null,
  neighborhood_id uuid references public.neighborhoods(id) on delete set null,
  place_id uuid references public.places(id) on delete set null,
  local_app_id uuid references public.local_apps(id) on delete set null,
  visit_date date,
  trip_context text,
  rating_overall numeric(2,1) check (rating_overall between 1 and 5),
  rating_value_for_money numeric(2,1) check (rating_value_for_money between 1 and 5),
  rating_safety numeric(2,1) check (rating_safety between 1 and 5),
  rating_cleanliness numeric(2,1) check (rating_cleanliness between 1 and 5),
  rating_service numeric(2,1) check (rating_service between 1 and 5),
  rating_location_convenience numeric(2,1) check (
    rating_location_convenience between 1 and 5
  ),
  rating_family_friendliness numeric(2,1) check (
    rating_family_friendliness between 1 and 5
  ),
  rating_solo_friendliness numeric(2,1) check (
    rating_solo_friendliness between 1 and 5
  ),
  rating_digital_nomad_friendliness numeric(2,1) check (
    rating_digital_nomad_friendliness between 1 and 5
  ),
  review_title text not null,
  short_summary text not null,
  detailed_review text,
  pros text[] not null default '{}',
  cons text[] not null default '{}',
  recommended_for text[] not null default '{}',
  avoid_if text[] not null default '{}',
  price_paid_minor integer check (price_paid_minor is null or price_paid_minor >= 0),
  currency char(3),
  booking_platform_used text,
  affiliate_provider_link_reference text,
  photo_references jsonb not null default '[]'::jsonb,
  tags text[] not null default '{}',
  confidence_level text not null default 'medium' check (
    confidence_level in ('low', 'medium', 'high')
  ),
  visibility_status text not null default 'private' check (
    visibility_status in ('private', 'internal', 'approved', 'rejected')
  ),
  moderation_status text not null default 'draft' check (
    moderation_status in (
      'draft',
      'submitted',
      'internal_visible',
      'approved_for_public',
      'rejected',
      'archived'
    )
  ),
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (jsonb_typeof(photo_references) = 'array'),
  check (jsonb_typeof(metadata) = 'object'),
  check (
    country_id is not null or
    city_id is not null or
    neighborhood_id is not null or
    place_id is not null or
    local_app_id is not null or
    entity_reference is not null
  )
);

create index if not exists idx_internal_reviews_reviewer_created
  on public.internal_reviews(reviewer_user_id, created_at desc);

create index if not exists idx_internal_reviews_country_created
  on public.internal_reviews(country_id, created_at desc);

create index if not exists idx_internal_reviews_city_created
  on public.internal_reviews(city_id, created_at desc);

create index if not exists idx_internal_reviews_neighborhood_created
  on public.internal_reviews(neighborhood_id, created_at desc);

create index if not exists idx_internal_reviews_place_created
  on public.internal_reviews(place_id, created_at desc);

create index if not exists idx_internal_reviews_local_app_created
  on public.internal_reviews(local_app_id, created_at desc);

create index if not exists idx_internal_reviews_entity
  on public.internal_reviews(entity_type, entity_id);

create index if not exists idx_internal_reviews_moderation
  on public.internal_reviews(moderation_status, created_at desc);

create index if not exists idx_internal_reviews_visibility
  on public.internal_reviews(visibility_status, created_at desc);

create index if not exists idx_internal_reviews_tags
  on public.internal_reviews using gin(tags);

create index if not exists idx_internal_reviews_photo_references
  on public.internal_reviews using gin(photo_references);

drop trigger if exists trg_internal_reviews_updated_at
  on public.internal_reviews;
create trigger trg_internal_reviews_updated_at
before update on public.internal_reviews
for each row execute function public.set_updated_at();

alter table public.internal_reviews enable row level security;

drop policy if exists internal_reviews_insert_own on public.internal_reviews;
create policy internal_reviews_insert_own
  on public.internal_reviews for insert
  with check (auth.uid() = reviewer_user_id);

drop policy if exists internal_reviews_select_internal on public.internal_reviews;
create policy internal_reviews_select_internal
  on public.internal_reviews for select
  using (
    reviewer_user_id = auth.uid()
    or (
      public.is_moderator()
      and visibility_status in ('internal', 'approved')
    )
    or public.is_admin()
  );

drop policy if exists internal_reviews_update_own on public.internal_reviews;
create policy internal_reviews_update_own
  on public.internal_reviews for update
  using (
    reviewer_user_id = auth.uid()
    and moderation_status in ('draft', 'submitted')
    and visibility_status in ('private', 'internal')
  )
  with check (
    reviewer_user_id = auth.uid()
    and moderation_status in ('draft', 'submitted')
    and visibility_status in ('private', 'internal')
    and reviewed_by is null
    and reviewed_at is null
  );

drop policy if exists internal_reviews_moderate on public.internal_reviews;
create policy internal_reviews_moderate
  on public.internal_reviews for update
  using (public.is_moderator())
  with check (public.is_moderator());

drop policy if exists internal_reviews_delete_admin on public.internal_reviews;
create policy internal_reviews_delete_admin
  on public.internal_reviews for delete
  using (public.is_admin());

create table if not exists public.internal_quick_feedback (
  id uuid primary key default gen_random_uuid(),
  reviewer_user_id uuid references auth.users(id) on delete set null,
  reviewer_display_name text,
  entity_type text not null check (
    entity_type in (
      'country',
      'city',
      'neighborhood',
      'place',
      'hotel_stay',
      'restaurant',
      'attraction_site',
      'activity_tour',
      'transport_provider_route',
      'airport_arrival_experience',
      'local_app_service'
    )
  ),
  entity_id uuid,
  entity_reference text,
  country_id uuid references public.countries(id) on delete set null,
  city_id uuid references public.cities(id) on delete set null,
  neighborhood_id uuid references public.neighborhoods(id) on delete set null,
  place_id uuid references public.places(id) on delete set null,
  local_app_id uuid references public.local_apps(id) on delete set null,
  thumbs_direction text check (thumbs_direction in ('up', 'down')),
  saved boolean not null default false,
  would_return boolean,
  overrated boolean not null default false,
  tourist_trap boolean not null default false,
  worth_it boolean not null default false,
  avoid boolean not null default false,
  cash_needed boolean not null default false,
  card_worked boolean not null default false,
  felt_safe boolean,
  felt_unsafe boolean,
  english_friendly boolean,
  good_for_work boolean not null default false,
  good_for_families boolean not null default false,
  good_for_solo_travelers boolean not null default false,
  tags text[] not null default '{}',
  note text,
  visibility_status text not null default 'private' check (
    visibility_status in ('private', 'internal', 'approved', 'rejected')
  ),
  moderation_status text not null default 'draft' check (
    moderation_status in (
      'draft',
      'submitted',
      'internal_visible',
      'approved_for_public',
      'rejected',
      'archived'
    )
  ),
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (not (felt_safe is true and felt_unsafe is true)),
  check (jsonb_typeof(metadata) = 'object'),
  check (
    country_id is not null or
    city_id is not null or
    neighborhood_id is not null or
    place_id is not null or
    local_app_id is not null or
    entity_reference is not null
  )
);

create index if not exists idx_internal_quick_feedback_reviewer_created
  on public.internal_quick_feedback(reviewer_user_id, created_at desc);

create index if not exists idx_internal_quick_feedback_country_created
  on public.internal_quick_feedback(country_id, created_at desc);

create index if not exists idx_internal_quick_feedback_city_created
  on public.internal_quick_feedback(city_id, created_at desc);

create index if not exists idx_internal_quick_feedback_neighborhood_created
  on public.internal_quick_feedback(neighborhood_id, created_at desc);

create index if not exists idx_internal_quick_feedback_place_created
  on public.internal_quick_feedback(place_id, created_at desc);

create index if not exists idx_internal_quick_feedback_entity
  on public.internal_quick_feedback(entity_type, entity_id);

create index if not exists idx_internal_quick_feedback_moderation
  on public.internal_quick_feedback(moderation_status, created_at desc);

create index if not exists idx_internal_quick_feedback_tags
  on public.internal_quick_feedback using gin(tags);

drop trigger if exists trg_internal_quick_feedback_updated_at
  on public.internal_quick_feedback;
create trigger trg_internal_quick_feedback_updated_at
before update on public.internal_quick_feedback
for each row execute function public.set_updated_at();

alter table public.internal_quick_feedback enable row level security;

drop policy if exists internal_quick_feedback_insert_own
  on public.internal_quick_feedback;
create policy internal_quick_feedback_insert_own
  on public.internal_quick_feedback for insert
  with check (auth.uid() = reviewer_user_id);

drop policy if exists internal_quick_feedback_select_internal
  on public.internal_quick_feedback;
create policy internal_quick_feedback_select_internal
  on public.internal_quick_feedback for select
  using (
    reviewer_user_id = auth.uid()
    or (
      public.is_moderator()
      and visibility_status in ('internal', 'approved')
    )
    or public.is_admin()
  );

drop policy if exists internal_quick_feedback_update_own
  on public.internal_quick_feedback;
create policy internal_quick_feedback_update_own
  on public.internal_quick_feedback for update
  using (
    reviewer_user_id = auth.uid()
    and moderation_status in ('draft', 'submitted')
    and visibility_status in ('private', 'internal')
  )
  with check (
    reviewer_user_id = auth.uid()
    and moderation_status in ('draft', 'submitted')
    and visibility_status in ('private', 'internal')
    and reviewed_by is null
    and reviewed_at is null
  );

drop policy if exists internal_quick_feedback_moderate
  on public.internal_quick_feedback;
create policy internal_quick_feedback_moderate
  on public.internal_quick_feedback for update
  using (public.is_moderator())
  with check (public.is_moderator());

drop policy if exists internal_quick_feedback_delete_admin
  on public.internal_quick_feedback;
create policy internal_quick_feedback_delete_admin
  on public.internal_quick_feedback for delete
  using (public.is_admin());
