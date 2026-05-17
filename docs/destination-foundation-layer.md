# Destination Foundation Layer

This layer gives Journee backend-owned structures for destination identity,
activity taxonomy, price benchmarks, local apps, and phrasebook content.

It is additive. Existing JSON-backed pages and existing seed accessors remain
unchanged.

## Migration

`db/migrations/0005_destination_foundation.sql` adds:

- `destination_identity_profiles`
- `travel_activities`
- `destination_activity_map`
- `price_benchmarks`
- `local_apps`
- `phrasebook_entries`

Each destination-scoped table uses `owner_kind = country | city` with one of
`country_id` or `city_id`. Public reads are enabled through RLS for published
content. Writes remain service-role-only.

## Pilot Seeds

Japan/Tokyo pilot seed files:

- `db/seed/japan/destination_identity.json`
- `db/seed/japan/travel_activities.json`
- `db/seed/tokyo/price_benchmarks.json`
- `db/seed/tokyo/local_apps.json`
- `db/seed/japan/phrasebook.json`

The seed importer now loads these after the existing place/entity and
legal/social risk layers. Rows are replaced by destination + key before insert
so repeated seeding is deterministic.

## Accessors

`lib/data/destination-foundation.ts` provides Supabase-first accessors with JSON
fallback:

- `getDestinationIdentityLive`
- `getTravelActivitiesLive`
- `getPriceBenchmarksLive`
- `getLocalAppsLive`
- `getPhrasebookLive`

Fallback helpers are also exported:

- `getDestinationIdentitySeed`
- `getTravelActivitiesSeed`
- `getPriceBenchmarksSeed`
- `getLocalAppsSeed`
- `getPhrasebookSeed`

## Mapping Notes

Destination identity profiles intentionally keep visual metadata outside the
core `countries` and `cities` tables. This lets UI direction evolve without
schema churn on core taxonomy.

Travel activities are global taxonomy rows mapped to destinations with
relevance and seasonality. This allows trip builders, discovery filters, and
packing rules to converge on the same activity vocabulary over time.

Price benchmarks are separate from `price_items`: benchmarks are broader
traveler cost expectations with low/typical/high ranges, source metadata, and
confidence. `price_items` can continue powering existing cost tables.

Local apps are modeled as a destination directory rather than as page-specific
JSON so app usefulness, setup timing, and category can be reused by arrival,
safety, transit, and planning surfaces.

Phrasebook entries preserve the existing phrasebook content shape while adding
translation metadata such as source language, target language, transliteration,
literal translation, usage notes, and optional audio URLs.

## Safe Migration Path

1. Keep existing pages on `lib/data/seed.ts`.
2. Seed the new tables into Supabase.
3. Add tests comparing JSON fallback to live rows for Tokyo.
4. Migrate one read-only page or component at a time.
5. Keep JSON fallback until multi-destination coverage exists.
