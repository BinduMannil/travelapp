# Legal & Social Risk Intelligence

Journee's legal and social risk layer is traveler-facing risk awareness. It is
not formal legal advice and must stay calm, factual, and practical.

## Scope

The layer covers destination-specific behaviors that can create practical
trouble with police, immigration, hotels, venues, private people, or local
authorities.

Current supported categories:

- `social_media_online_speech`
- `alcohol_public_behavior`
- `public_conduct`
- `lgbtq_relationships`
- `drugs_medication_controlled_substances`
- `police_official_interaction`
- `immigration_entry`
- `photography_filming`
- `local_sensitivities`

## Database

`db/migrations/0004_legal_social_risks.sql` adds
`public.legal_social_risks`.

Rows are country-scoped with optional city-specific additions or overrides:

- `country_id`
- `city_id`
- `risk_category`
- `risk_level`
- `traveler_summary`
- `what_not_to_do`
- `practical_safe_behavior`
- `examples`
- `source_label`
- `source_url`
- `reviewed_at`
- `last_updated`
- `confidence_level`
- `legal_disclaimer`
- `display_order`

RLS exposes published rows for public read. Writes remain service-role-only.

## Seed Import

`db/seed/japan/legal_social_risks.json` provides the first seed payload. The
seed importer loads it after the destination/place entity import.

The importer replaces rows by `(country, optional city, risk_category)` before
inserting, so repeated `npm run seed` calls are deterministic.

## Accessors

`lib/data/legal-social-risks.ts` provides:

- `getLegalSocialRisksSeed`
- `getLegalSocialRisksLive`

The live accessor reads Supabase first and falls back to JSON if Supabase is not
configured, not seeded, or unavailable. City rows override country rows for the
same `risk_category`.

## Product Tone

Use clear language:

- "avoid"
- "check official sources"
- "can create practical trouble"
- "may be sensitive"

Avoid:

- sensational claims
- definitive legal conclusions
- punishment speculation
- advice that sounds like a lawyer-client recommendation

Every row should include a source and the standard disclaimer:

> This is practical traveler risk awareness, not legal advice. Laws and
> enforcement can change; check official sources before travel.
