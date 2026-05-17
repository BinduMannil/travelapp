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
end
$$;
SQL

echo "Migration application test passed for ${#migrations[@]} migrations."
