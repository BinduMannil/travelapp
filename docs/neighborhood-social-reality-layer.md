# Neighborhood and Social Reality Intelligence Layer

## Purpose

Journee's neighborhood and social reality layer describes what a place actually feels like in daily use. It helps travelers understand atmosphere, behavior patterns, social expectations, class and vibe differences, local routines, and practical neighborhood contrasts.

This layer is observational and traveler-focused. It should not rank people or places morally. It should explain practical patterns respectfully, such as where visitors usually stay, where locals go, which areas feel polished or casual, and what behavior helps travelers move through the place comfortably.

## Current Scope

The additive implementation includes:

- `neighborhood_intelligence` for structured neighborhood feel, scores, fit, and practical notes.
- `social_reality_notes` for city or neighborhood-level behavior patterns.
- `neighborhood_relationships` for nearby areas, contrasts, local alternatives, tourist bases, digital nomad bases, and hidden local areas.
- Vietnam neighborhood seed anchors for Ho Chi Minh City, Hanoi, Da Nang, and Hoi An.
- Tokyo and Vietnam pilot intelligence seeds.
- Supabase-first accessors in `lib/data/neighborhood-social-reality.ts`.
- JSON fallback behavior for safe frontend adoption.

## Supabase Tables

### `neighborhood_intelligence`

One row per canonical neighborhood.

Important fields:

- `city_id` and `neighborhood_id`: canonical ownership.
- `vibe_tags`: compact filtering tags such as `creative`, `party`, `expat`, `heritage`, `family`, or `cafes`.
- `luxury_level`, `wealth_profile`, `local_expat_mix`, `tourism_level`: practical social/economic context, written neutrally.
- `nightlife_intensity`, `digital_nomad_friendliness`, `family_friendliness`, `cafe_culture`, `shopping_level`, `transport_quality`, `walkability`, `safety_at_night`, `language_accessibility`: structured travel planning dimensions.
- `dress_expectations`, `social_expectations`, `safety_notes`, `recommended_for`, `avoid_if`, `practical_notes`: traveler-facing editorial arrays.
- `setting_tags`: broad feel such as `urban`, `beach`, `nature`, `business`, `party`, `family`, or `creative`.
- `atmosphere_scores`: chart-ready JSONB for dimensions like creative, business, party, family, local, tourist.
- `traveler_type_fit`: chart-ready JSONB for solo, couples, families, digital nomads, luxury, and budget fit.
- `what_it_feels_like`: concise editorial summary.
- `source_label`, `source_url`, `reviewed_at`, `confidence_level`: review metadata.

Indexes support city ordering, neighborhood lookup, GIN tag filtering, and JSONB score filtering.

### `social_reality_notes`

Use this table for behavior and norm modules that can apply to a city or a specific neighborhood.

Supported categories include:

- local behavior
- social norms
- work culture
- networking culture
- public behavior
- rude behavior
- normal behavior
- class signals
- appearance expectations
- reservation culture
- nightlife behavior
- queue culture
- bargaining culture
- noise expectations
- transport behavior
- cafe culture

Each note separates:

- `what_is_normal`
- `what_is_rude`
- `practical_guidance`
- `examples`
- `social_context`

This keeps tone practical and prevents the product from sounding judgmental.

### `neighborhood_relationships`

Use this table to explain relationships between neighborhoods in the same city.

Supported relationship kinds include:

- nearby
- upscale contrast
- budget contrast
- tourist stay
- local hangout
- digital nomad base
- hidden local area
- nightlife alternative
- shopping alternative
- transit link
- atmosphere contrast

This lets Journee answer questions such as:

- Where do tourists usually stay?
- Where do locals actually go?
- What is the calmer alternative?
- What is the more upscale contrast?
- Where do digital nomads base themselves?
- Which nearby area has a different feel?

## JSON Fallback

Seed files:

- `db/seed/japan/neighborhood_social_reality.json`
- `db/seed/vietnam/neighborhoods.json`
- `db/seed/vietnam/neighborhood_social_reality.json`

Accessor:

- `getNeighborhoodSocialRealitySeed`
- `getNeighborhoodSocialRealityLive`

The live accessor tries Supabase first and falls back to JSON if Supabase is not configured, rows are missing, or resolution fails.

## Frontend Mapping

Future frontend components should map to backend entities like this:

- Neighborhood cards: `neighborhood_intelligence`
- "What It Feels Like": `what_it_feels_like`
- Vibe badges: `vibe_tags` and `setting_tags`
- Radar/charts: `atmosphere_scores` and `traveler_type_fit`
- "Good For" and "Avoid If": `recommended_for` and `avoid_if`
- "How People Behave Here": `social_reality_notes`
- "Nearby Alternatives": `neighborhood_relationships`
- "Tourist vs Local vs Nomad": `local_expat_mix`, `tourism_level`, and relationship kinds

This can be adopted without changing existing routes because JSON fallback remains available.

## Editorial Standards

Entries should:

- Describe behavior patterns, not stereotypes.
- Explain practical traveler implications.
- Use neutral words such as `polished`, `casual`, `local-leaning`, `visitor-heavy`, `quiet`, or `sales-forward`.
- Avoid moral judgments about class, wealth, or nightlife.
- Include review metadata and a source URL where possible.
- Separate normal behavior from rude behavior.
- Avoid implying that "authentic" means better than tourist-friendly.

## Migration Strategy

1. Keep existing frontend pages and JSON compatibility unchanged.
2. Seed Tokyo and Vietnam pilot neighborhoods.
3. Import with `db/seed/import.ts`.
4. Let future route loaders consume `lib/data/neighborhood-social-reality.ts`.
5. Add admin/CMS review flows later around `status`, `reviewed_at`, `confidence_level`, and source fields.

No frontend route or design change is required for this foundation layer.
