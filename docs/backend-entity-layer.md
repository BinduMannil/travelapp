# Backend Entity Layer

This note documents the first canonical destination/place backend slice.

## Scope

Implemented as an additive foundation only:

- `places`
- `attractions`
- `restaurants`
- `place_tags`
- `place_tag_map`
- `place_external_ids`
- enriched `neighborhoods`

Existing JSON compatibility remains in place. No frontend routes were moved to
live Supabase reads in this step.

## Migration

`db/migrations/0003_places_entities.sql` adds the canonical place layer.

Key relationships:

- `places.city_id -> cities.id`
- `places.neighborhood_id -> neighborhoods.id`
- `attractions.place_id -> places.id`
- `restaurants.place_id -> places.id`
- `place_tag_map.place_id -> places.id`
- `place_tag_map.tag_id -> place_tags.id`
- `place_external_ids.place_id -> places.id`

The migration is safe to apply after the existing `0001` and `0002` migrations.
All new content tables enable RLS with public read policies for published
content. Writes remain service-role-only by omission of anon/auth write
policies.

## Seed Import

`db/seed/import.ts` still starts by upserting Japan and Tokyo, then now imports:

- Tokyo neighborhoods into `neighborhoods`
- Tokyo attractions into `places` + `attractions`
- Tokyo restaurants into `places` + `restaurants`
- normalized tags into `place_tags` + `place_tag_map`
- official, reseller, and reservation URLs into `place_external_ids`

The JSON files remain the seed source for now.

## Compatibility Accessors

`lib/data/entities.ts` introduces async Supabase-first accessors:

- `getNeighborhoodsLive`
- `getNeighborhoodLive`
- `getAttractionsLive`
- `getAttractionLive`
- `getRestaurantsLive`
- `getRestaurantLive`

These return the same frontend-facing shapes as `lib/data/seed.ts`. If Supabase
is not configured, not seeded, or a query fails, they fall back to the existing
JSON accessors.

Current pages are intentionally still using `lib/data/seed.ts`; migration can
happen route-by-route later.

## Next Backend Step

The safest next step is to add tests that compare JSON output to live accessor
output against a seeded Supabase test database, then migrate one read-only route
behind a feature flag.
