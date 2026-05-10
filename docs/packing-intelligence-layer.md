# Smart Packing and Clothing Intelligence Layer

## Purpose

Journee's packing intelligence layer stores destination-specific packing rules that consider weather, season, activities, traveler profile, itinerary style, transportation style, and cultural expectations.

This layer is not a generic packing checklist. It is designed to sound like an experienced traveler saying, "This is what actually matters for this trip."

## Current Scope

The additive implementation includes:

- `packing_items` for reusable canonical packing items.
- `destination_packing_rules` for destination, city, and region-specific recommendations.
- Japan and Vietnam pilot JSON seeds.
- Importer support.
- Supabase-first accessors with JSON fallback in `lib/data/packing-intelligence.ts`.

No frontend UI was added.

## Tables

### `packing_items`

Canonical reusable packing items.

Key fields:

- `item_key`
- `label`
- `packing_category`
- `default_importance`
- `default_required`
- `weight_grams`
- `pack_weight_priority`
- `reusable`
- `source_label`
- `source_url`
- `reviewed_at`
- `metadata`

Supported categories include clothing, footwear, weather layers, rain/cold/heat preparation, activity gear, temple/religious clothing, nightlife/dining, beach/swimming, trekking/hiking, scooter/motorbike, digital nomad tech, family/baby, safety/emergency, medical/health, and country-specific practical items.

### `destination_packing_rules`

Destination-specific logic for when and why an item matters.

Key fields:

- `owner_kind`: `country`, `city`, or `region`.
- `country_id`, `city_id`, `region_key`.
- `rule_key`.
- `item_id`.
- `activity_tags`.
- `weather_conditions`.
- `seasonality`.
- `traveler_profiles`.
- `itinerary_styles`.
- `transportation_styles`.
- `cultural_context_tags`.
- `clothing_context`.
- `importance`.
- `required`.
- `priority`.
- `pack_weight_priority`.
- `recommendation_note`.
- `cultural_notes`.
- `weather_notes`.
- `activity_notes`.
- `region_override_note`.
- `quantity_hint`.
- source and review metadata.

Rules support country-level defaults, city-level specificity, and region overrides such as Sapa cold-weather trekking.

## Pilot Coverage

Japan pilot rules cover:

- winter layering
- rainy season shells
- shoe-removal-aware footwear
- modest light layers
- practical hand towel behavior

Vietnam pilot rules cover:

- humidity and quick-dry clothing
- sudden rain and scooter ponchos
- temple cover layers
- scooter/phone security
- Sapa cold and wet trekking footwear
- digital nomad work kits

## JSON Fallback

Seed files:

- `db/seed/japan/packing_intelligence.json`
- `db/seed/vietnam/packing_intelligence.json`

Accessor:

- `getPackingIntelligenceSeed`
- `getPackingIntelligenceLive`

Live access tries Supabase first and falls back to JSON when Supabase is not configured or seeded.

## Frontend Mapping

Future UI should map this layer as:

- "Why Pack This": `recommendation_note`
- "Weather Logic": `weather_conditions` and `weather_notes`
- "Activity Fit": `activity_tags` and `activity_notes`
- "Cultural Fit": `cultural_context_tags` and `cultural_notes`
- "Required vs Optional": `required` and `importance`
- "Pack Light Priority": `pack_weight_priority`
- "Regional Exception": `region_override_note`
- "Quantity": `quantity_hint`

This can later augment the existing packing engine without replacing it.

## Editorial Standards

Packing recommendations should:

- Explain the local reason for the item.
- Avoid generic "bring comfortable shoes" copy unless the destination changes why it matters.
- Connect to weather, activity, culture, or transportation.
- Prefer compact, multipurpose items.
- Avoid overpacking by using `pack_weight_priority`.
- Use regional overrides when a place breaks the country default.

## Migration Strategy

1. Keep the existing packing engine and frontend untouched.
2. Seed destination-specific intelligence for Japan and Vietnam.
3. Import to Supabase through `db/seed/import.ts`.
4. Let future backend loaders merge existing engine output with `destination_packing_rules`.
5. Add admin/CMS editing later around status, source, reviewed date, and confidence metadata.
