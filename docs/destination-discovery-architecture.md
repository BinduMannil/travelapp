# Destination Discovery Architecture

Journee discovery is built as a source-agnostic matching layer. The frontend can
continue rendering existing routes, while seed JSON today and Supabase/search
records later both adapt into the same `DestinationCandidate` shape.

## Layers

- `TravelerPreferences`: normalized filters from onboarding, search, or a saved
  trip profile.
- `DestinationCandidate`: canonical match profile for a city or destination,
  separate from display-specific page data.
- Scorers: pure functions for budget, luxury, weather, visa, flight duration,
  destination type, tags, lifestyle quality, and text search.
- Ranking: weighted scoring plus hard filters for must-have tags, minimum
  quality scores, and extreme flight-duration mismatches.
- Nearby exploration: separate route-aware scoring for side trips using
  duration, cost, mode, and destination tags.

## Candidate Profile

The foundational candidate captures:

- Budget: estimated daily spend, currency, budget level, luxury level.
- Weather: monthly highs/lows, precipitation, humidity, seasonal cost index.
- Visa: citizenship-specific requirement and stay length.
- Destination type and atmosphere tags.
- Quality scores: beaches, mountains, food, nightlife, relaxation, adventure,
  safety, family, LGBTQ friendliness, cash/card friendliness, digital nomad
  readiness, transport, internet, and luxury.
- Search document: title, summary, and stable tokens for lightweight indexing.

This preserves the current backend entity structure. No existing content table
is changed; future migrations can add a materialized discovery profile table or
view that emits the same shape.

## Search Indexing Strategy

Phase 1 uses in-process token matching over `DestinationCandidate.search.tokens`.
It is deterministic and works with static seed data.

Phase 2 should materialize a `destination_search_documents` view/table from
countries, cities, places, tags, climate, visa, safety, payments, connectivity,
and transport. Add trigram or full-text indexes in Supabase for title, summary,
tags, and aliases, while keeping scoring in application code so filter weights
remain easy to tune.

## Scoring Rules

Scores are 0-100 after applying component weights:

- Budget: compares traveler daily budget with destination estimated daily spend.
- Luxury: matches requested luxury level to destination luxury level.
- Weather: averages preferred months, temperature bands, humidity, and rain.
- Visa: scores visa-free highest, then waiver registration, e-visa, and visa
  required. A visa friendliness filter can cap incompatible results.
- Flight: rewards destinations within the requested duration.
- Type/tag/search: compares normalized taxonomy tags.
- Lifestyle: maps travel styles to quality scores, with optional minimums.

The current weights live in `lib/discovery/taxonomy.ts` so product tuning stays
centralized.

## Nearby Exploration

Nearby matching intentionally does not use the full destination ranker. A side
trip is usually constrained by route quality first, so it ranks by:

- Best travel duration.
- Price floor.
- Preferred transport modes.
- Same-country requirement.
- Tags such as temples, food, beach, mountains, relaxation, or nightlife.

Tokyo seed routes are already adapted through `getSeedNearbyDestinationCandidates`.

## Incremental Path

1. Use the pure matching layer against seed data.
2. Add discovery profile rows or a Supabase view without altering frontend
   routes.
3. Feed onboarding/search UI into `TravelerPreferences`.
4. Add analytics around accepted/rejected matches to tune weights.
5. Only after discovery is stable, connect ranked destinations to itinerary
   generation.
