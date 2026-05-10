# Internal Reviews and Shared Feedback Layer

## Purpose

Journee's internal reviews and shared feedback layer captures practical first-party experience from trusted internal users. It is designed for destination intelligence, quality control, and recommendation judgment, not as a public TripAdvisor-style review product.

This layer is private first. No public review UI or anonymous write path exists in this implementation.

## Current Scope

The additive implementation includes:

- `internal_reviews` for detailed internal reviews.
- `internal_quick_feedback` for lightweight signals.
- Empty JSON fallback at `db/seed/internal/reviews_feedback.json`.
- Seed importer support.
- TypeScript helpers in `lib/data/internal-reviews-feedback.ts`.
- RLS policies for authenticated authors, moderator review, and admin deletion.

## Supported Entities

Reviews and quick feedback can target:

- country
- city
- neighborhood
- place
- hotel/stay
- restaurant
- attraction/site
- activity/tour
- transport provider or route
- airport/arrival experience
- local app/service

Canonical references use `country_id`, `city_id`, `neighborhood_id`, `place_id`, and `local_app_id` where available. `entity_reference` supports early-stage entities such as transport routes, airport arrival flows, activities, tours, or providers that do not yet have canonical tables.

## Detailed Reviews

`internal_reviews` supports:

- reviewer user ID
- reviewer display name or internal alias
- entity type and entity reference
- country, city, neighborhood, place, and local app links
- visit date
- trip context
- rating overall
- rating value for money
- rating safety
- rating cleanliness
- rating service
- rating location/convenience
- rating family friendliness
- rating solo friendliness
- rating digital nomad friendliness
- review title
- short summary
- detailed review
- pros and cons
- recommended for
- avoid if
- price paid and currency
- booking platform used
- affiliate/provider link reference
- photo/screenshot references
- tags
- confidence level
- visibility status
- moderation status
- reviewed by / reviewed at

Ratings are constrained to a 1-5 scale.

## Quick Feedback

`internal_quick_feedback` supports:

- thumbs up/down
- saved/favorite
- would return
- overrated
- tourist trap
- worth it
- avoid
- cash needed
- card worked
- felt safe
- felt unsafe
- English friendly
- good for work
- good for families
- good for solo travelers
- tags and a short note

This table is intended for quick capture during travel or after lightweight experiences where a full review would be too much.

## Lifecycle

`moderation_status` supports:

- `draft`
- `submitted`
- `internal_visible`
- `approved_for_public`
- `rejected`
- `archived`

`visibility_status` supports:

- `private`
- `internal`
- `approved`
- `rejected`

Recommended flow:

1. Reviewer creates a `draft` private review.
2. Reviewer edits while the review is still private or submitted.
3. Reviewer submits for internal review.
4. Moderator marks it internal visible, rejected, archived, or approved for public use.
5. Approved intelligence can later be promoted into canonical tables or public editorial surfaces.

Public display should only ever use promoted/canonical data, not raw internal review rows.

## RLS Model

Anonymous users:

- Cannot read.
- Cannot write.

Authenticated reviewers:

- Can create rows where `reviewer_user_id = auth.uid()`.
- Can read their own rows.
- Can edit their own draft/submitted private/internal rows before review fields are set.

Moderators/admins:

- Can read internal/approved rows.
- Can moderate/update rows.

Admins:

- Can delete rows.

Service role:

- Can import or backfill data through the seed importer.

## JSON Fallback

`db/seed/internal/reviews_feedback.json` starts empty:

```json
{
  "reviews": [],
  "quick_feedback": []
}
```

The fallback exists for internal tooling, local tests, and future fixtures. It should not be used as public display data.

## Accessors

`lib/data/internal-reviews-feedback.ts` exports:

- `getInternalReviewsSeed`
- `getInternalQuickFeedbackSeed`
- `getInternalReviewsLive`
- `getInternalQuickFeedbackLive`
- `createInternalReviewLive`
- `createInternalQuickFeedbackLive`

Live helpers require an explicit Supabase client so callers control authenticated user or service-role context.

## Promotion Targets

Internal reviews can inform:

- `places`
- `restaurants`
- `attractions`
- `price_benchmarks`
- `local_apps`
- `destination_intelligence_notes`
- `legal_social_risks`
- `neighborhood_intelligence`
- `social_reality_notes`
- affiliate placement and provider strategy

This keeps Journee's public product curated and intelligence-led rather than raw-review driven.
