# FIELD NOTES Backend Layer

## Purpose

FIELD NOTES is Journee's internal capture layer for real-world travel observations from team members while traveling. It is designed for raw, practical observations that can later inform canonical destination data after review.

This is not a public content layer. Notes should not appear in traveler-facing UI until an editor has reviewed and promoted the information into the appropriate canonical table.

## Current Scope

The additive implementation includes:

- `field_notes` migration for private internal observations.
- Empty JSON fallback at `db/seed/internal/field_notes.json`.
- Seed importer support for internal JSON field notes.
- TypeScript data helpers in `lib/data/field-notes.ts`.
- RLS policies for authenticated capture, own-note access, moderator review, and admin deletion.

No frontend UI or public route was added.

## Table: `field_notes`

Supported destination links:

- `country_id`
- `city_id`
- `neighborhood_id`
- `place_id`

At least one destination or place reference must be present.

Supported observation fields:

- `note_category`
- `short_note`
- `long_note`
- `price_observation`
- `payment_observation`
- `safety_observation`
- `scam_warning`
- `local_app_note`
- `transport_note`
- `legal_social_risk_note`
- `food_restaurant_note`
- `photo_references`
- `source_type`
- `confidence_level`
- `review_status`
- `created_by`
- `reviewed_by`
- `observed_at`
- `created_at`
- `reviewed_at`

`price_observation`, `photo_references`, and `metadata` are JSONB so internal tools can store structured details without requiring schema changes for every capture format.

## Categories

`note_category` supports:

- `price_observation`
- `payment_observation`
- `safety_observation`
- `scam_warning`
- `local_app_note`
- `transport_note`
- `legal_social_risk_note`
- `food_restaurant_note`
- `neighborhood_reality`
- `cultural_observation`
- `general_observation`
- `other`

`source_type` supports:

- `personal_observation`
- `official_source`
- `local_advice`
- `receipt`
- `screenshot`

`review_status` supports:

- `unreviewed`
- `needs_followup`
- `approved`
- `rejected`
- `promoted`

## Security Model

FIELD NOTES is internal-only.

RLS behavior:

- Authenticated users can insert notes where `created_by = auth.uid()`.
- Users can read their own notes.
- Moderators and admins can read all notes.
- Users can update their own `unreviewed` or `needs_followup` notes while review fields remain empty.
- Moderators and admins can review/update notes.
- Admins can delete notes.
- There is no anonymous or public read policy.

Service-role imports bypass RLS as usual.

## Promotion Flow

Recommended lifecycle:

1. Traveler captures a raw field note.
2. Note remains `unreviewed`.
3. Editor reviews source, photos, receipts, and context.
4. Editor marks it `approved`, `needs_followup`, or `rejected`.
5. If the information becomes canonical, editor migrates it into the correct destination table.
6. Field note is marked `promoted` with promotion metadata.

Suggested promotion targets:

- Price observations -> `price_benchmarks`
- Payment observations -> destination intelligence or payment data
- Safety/scam notes -> legal/social risk or destination intelligence
- Local app notes -> `local_apps`
- Transport notes -> destination intelligence or transport entities
- Food/restaurant notes -> restaurants or price benchmarks
- Neighborhood reality notes -> `neighborhood_intelligence` or `social_reality_notes`
- Cultural observations -> cultural intelligence

## JSON Fallback

`db/seed/internal/field_notes.json` starts empty by design:

```json
{
  "notes": []
}
```

Internal tooling can use this as a local fallback or fixture source. It should not be used for public display.

## Accessors

`lib/data/field-notes.ts` exports:

- `getFieldNotesSeed`
- `getFieldNotesLive`
- `createFieldNoteLive`

Live functions require an explicit Supabase client. The module does not create an anonymous client automatically, because field notes are private internal data.

## Implementation Notes

- Keep notes raw and timestamped.
- Preserve receipts/screenshots/photo references rather than converting them too early.
- Do not promote low-confidence notes without corroboration.
- Do not publish personally identifying details about locals, staff, travelers, or private individuals.
- Keep legal/social observations factual and route them through the dedicated review layer before public use.
