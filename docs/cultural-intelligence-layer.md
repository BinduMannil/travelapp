# Cultural, Historical, and Sensitivity Intelligence Layer

## Purpose

Journee's cultural intelligence layer stores practical traveler guidance for holidays, festivals, public closures, crowd spikes, etiquette, historical sensitivities, political sensitivities, religious-site behavior, national-pride topics, and social taboos.

The layer is traveler-facing and operational. It is not political commentary and it is not legal advice. Entries should stay calm, factual, respectful, and source-backed.

## Current Scope

The first additive implementation includes:

- `cultural_events` for holidays, festivals, national celebrations, regional celebrations, religious observances, mourning periods, and commemorations.
- `cultural_sensitivity_notes` for etiquette and sensitivity guidance.
- Japan and Vietnam pilot JSON seeds.
- Supabase-first accessors in `lib/data/cultural-intelligence.ts`.
- JSON fallback behavior for frontend-safe incremental adoption.

## Supabase Tables

### `cultural_events`

Use this table for time-bound or recurring cultural moments that affect traveler behavior or logistics.

Key fields:

- `owner_kind`: `country` or `city`.
- `country_id` / `city_id`: exactly one owner target is populated.
- `event_key`: stable slug scoped to the owner.
- `event_kind`: holiday, festival, national celebration, regional celebration, religious observance, mourning period, commemoration, or other.
- `starts_on` / `ends_on`: optional dated operating window.
- `recurrence_note` / `date_note`: human-readable recurrence and verification guidance.
- `traveler_summary`: short traveler-facing summary.
- `cultural_context`: respectful context for why the event matters.
- `practical_guidance`: actions travelers should take.
- `etiquette_notes`: behavior guidance.
- `public_closure_level`, `tourism_surge_level`, `transport_impact_level`, `crowd_level`: logistics metadata for itinerary planning.
- `risk_level`, `confidence_level`, `source_label`, `source_url`, `reviewed_at`: trust and safety metadata.
- `display_order`: stable editorial ordering.
- `metadata`: extensible JSONB for UI grouping, date provider IDs, or future CMS tags.

Indexes support country/city ordering, event kind filtering, date filtering, and owner-scoped uniqueness.

### `cultural_sensitivity_notes`

Use this table for non-date-specific cultural and historical guidance.

Key fields:

- `owner_kind`: `country` or `city`.
- `country_id` / `city_id`: exactly one owner target is populated.
- `note_key`: stable slug scoped to the owner.
- `sensitivity_category`: cultural etiquette, historical sensitivity, political sensitivity, social taboo, national pride, restricted discussion, protest sensitivity, conflict or war history, religious site behavior, local behavioral expectations, alcohol during religious observance, or other.
- `title`: concise module label.
- `traveler_summary`: calm traveler-facing summary.
- `why_it_matters`: context without editorializing.
- `avoid`: behaviors that can cause offense, disruption, or official attention.
- `practical_safe_behavior`: safer practical alternatives.
- `examples`: plain-language examples for product surfaces.
- `risk_level`, `confidence_level`, `source_label`, `source_url`, `reviewed_at`: trust and safety metadata.
- `display_order`: stable editorial ordering.
- `metadata`: extensible JSONB for UI grouping and future CMS tags.

Indexes support country/city ordering, category filtering, and owner-scoped uniqueness.

## JSON Fallback

Seeds live in:

- `db/seed/japan/cultural_intelligence.json`
- `db/seed/vietnam/cultural_intelligence.json`

The accessor exports seed and live functions:

- `getCulturalEventsSeed`
- `getCulturalSensitivityNotesSeed`
- `getCulturalIntelligenceSeed`
- `getCulturalEventsLive`
- `getCulturalSensitivityNotesLive`
- `getCulturalIntelligenceLive`

Live functions try Supabase first and fall back to JSON when environment variables are missing, a destination cannot be resolved, or no live rows are available.

## Frontend Mapping

Future frontend components should consume this layer through stable backend entities rather than hardcoding cultural copy.

Recommended mappings:

- "Holidays & Festivals": `cultural_events` filtered by event kind.
- "Public Closures": `cultural_events` with `public_closure_level` above `none`.
- "Crowd & Transport Alerts": `cultural_events` with high crowd, tourism surge, or transport impact levels.
- "Cultural Etiquette": `cultural_sensitivity_notes` with `cultural_etiquette`, `local_behavioral_expectations`, or `religious_site_behavior`.
- "Historical Sensitivities": `cultural_sensitivity_notes` with `historical_sensitivity` or `conflict_war_history`.
- "Restricted Discussion Areas": `cultural_sensitivity_notes` with political, protest, national-pride, or restricted-discussion categories.

The UI should always present this as practical awareness and should recommend checking official sources before travel for current rules, dates, and closures.

## Editorial Standards

Each row should:

- Use neutral, respectful language.
- Avoid speculation and political argument.
- Explain practical traveler behavior, not ideology.
- Include source metadata and a reviewed date.
- Separate `avoid` from `practical_safe_behavior`.
- Keep high-risk topics calm and specific.
- Prefer official tourism, government, museum, transport, or destination authority sources.

## Migration Strategy

This layer is additive:

1. Keep existing JSON and frontend surfaces unchanged.
2. Seed Japan and Vietnam as pilots.
3. Import to Supabase through `db/seed/import.ts`.
4. Adopt `lib/data/cultural-intelligence.ts` in backend-facing route loaders or server components when ready.
5. Add CMS/admin editing later around the same tables, preserving `status`, `reviewed_at`, `confidence_level`, and source fields.

No current frontend route needs to change to support this backend foundation.
