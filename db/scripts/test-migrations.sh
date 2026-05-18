#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
MIGRATION_DIR="$ROOT_DIR/db/migrations"

if ! command -v psql >/dev/null 2>&1; then
  echo "psql is required to test database migrations." >&2
  echo "Install PostgreSQL client tools, then rerun this script." >&2
  exit 127
fi

if [[ -z "${JOURNEE_MIGRATION_TEST_DATABASE_URL:-}" ]]; then
  echo "Missing JOURNEE_MIGRATION_TEST_DATABASE_URL." >&2
  echo "Set it to a disposable Supabase/Postgres database connection string." >&2
  exit 1
fi

migrations=()
while IFS= read -r migration; do
  migrations+=("$migration")
done < <(find "$MIGRATION_DIR" -maxdepth 1 -type f -name '*.sql' | sort)

if [[ "${#migrations[@]}" -eq 0 ]]; then
  echo "No migration files found in $MIGRATION_DIR." >&2
  exit 1
fi

echo "Preparing migration test database compatibility stubs..."
psql "$JOURNEE_MIGRATION_TEST_DATABASE_URL" -v ON_ERROR_STOP=1 -q <<'SQL'
create extension if not exists "pgcrypto";
create extension if not exists "citext";

do $$
begin
  if not exists (select 1 from pg_roles where rolname = 'anon') then
    create role anon nologin;
  end if;

  if not exists (select 1 from pg_roles where rolname = 'authenticated') then
    create role authenticated nologin;
  end if;
end
$$;

create schema if not exists auth;

create table if not exists auth.users (
  id uuid primary key default gen_random_uuid(),
  email text,
  created_at timestamptz not null default now()
);

create or replace function auth.uid()
returns uuid
language sql
stable
as $$
  select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid;
$$;
SQL

for migration in "${migrations[@]}"; do
  echo "Applying $(basename "$migration")..."
  psql "$JOURNEE_MIGRATION_TEST_DATABASE_URL" -v ON_ERROR_STOP=1 -q -f "$migration"
done

echo "Running post-apply schema smoke checks..."
psql "$JOURNEE_MIGRATION_TEST_DATABASE_URL" -v ON_ERROR_STOP=1 -q <<'SQL'
do $$
declare
  missing_table text;
  missing_rls_table text;
  missing_policy text;
  missing_function text;
begin
  foreach missing_table in array array[
    'public.countries',
    'public.cities',
    'public.places',
    'public.destination_identity_profiles',
    'public.legal_social_risks',
    'public.cultural_events',
    'public.neighborhood_intelligence',
    'public.field_notes',
    'public.internal_reviews',
    'public.packing_items',
    'public.travel_alerts',
    'public.airports',
    'public.user_suggestions'
  ]
  loop
    if to_regclass(missing_table) is null then
      raise exception 'Expected table % to exist after migrations', missing_table;
    end if;
  end loop;

  foreach missing_rls_table in array array[
    'public.countries',
    'public.cities',
    'public.trips',
    'public.places',
    'public.destination_identity_profiles',
    'public.legal_social_risks',
    'public.field_notes',
    'public.internal_reviews',
    'public.travel_alerts',
    'public.airports',
    'public.user_suggestions'
  ]
  loop
    if not exists (
      select 1
        from pg_class c
        join pg_namespace n on n.oid = c.relnamespace
       where format('%I.%I', n.nspname, c.relname) = missing_rls_table
         and c.relrowsecurity
    ) then
      raise exception 'Expected row level security to be enabled on %', missing_rls_table;
    end if;
  end loop;

  foreach missing_policy in array array[
    'public.countries:countries_read',
    'public.trips:trips_owner_all',
    'public.places:places_read',
    'public.destination_identity_profiles:destination_identity_profiles_read',
    'public.legal_social_risks:legal_social_risks_read',
    'public.field_notes:field_notes_select_internal',
    'public.internal_reviews:internal_reviews_select_internal',
    'public.travel_alerts:travel_alerts_read_published',
    'public.airports:airports_read',
    'public.user_suggestions:user_suggestions_select_public'
  ]
  loop
    if not exists (
      select 1
        from pg_policies
       where schemaname = split_part(split_part(missing_policy, ':', 1), '.', 1)
         and tablename = split_part(split_part(missing_policy, ':', 1), '.', 2)
         and policyname = split_part(missing_policy, ':', 2)
    ) then
      raise exception 'Expected policy % to exist after migrations', missing_policy;
    end if;
  end loop;

  foreach missing_function in array array[
    'public.set_updated_at()',
    'public.current_role_name()',
    'public.is_moderator()',
    'public.is_admin()',
    'public.get_public_trip(uuid,text)',
    'public.effective_seasonal_climate(uuid)',
    'public.effective_price_items(uuid)',
    'public.increment_user_suggestion_vote(uuid)'
  ]
  loop
    if to_regprocedure(missing_function) is null then
      raise exception 'Expected function % to exist after migrations', missing_function;
    end if;
  end loop;
end
$$;
SQL

echo "Migration application test passed for ${#migrations[@]} migrations."
