# Journee Lock Status

Last updated: 16 May 2026

This file records the current lock state for the repo. The design authority
remains `docs/JOURNEE_MASTER_LOCK_SPEC.md`; this file tracks what is currently
enforced by code, tests, and CI.

## Locked Now

- The homepage remains a cinematic travel entry, not a SaaS or dashboard
  landing page.
- Homepage image rotation is automatic and hidden.
- Homepage hero scene rotation is locked to `60000` ms.
- Cinematic image opacity transitions are locked to `3200ms`.
- The homepage must not expose slideshow dots, arrows, thumbnails, counters,
  progress indicators, pause controls, or carousel chrome.
- Homepage atmosphere layers, scene color layers, rich cinematic background,
  film grain, haze, and reduced-motion support must remain in place.
- `CinematicBackground` must preserve object-cover imagery, slow cross-fade,
  opacity swapping, reduced-motion transition handling, and slow drift motion.
- Vietnam country detail pages are active through canonical routes:
  `/country/vietnam/beverages`, `/country/vietnam/cuisine`,
  `/country/vietnam/famous-for`, `/country/vietnam/itinerary`,
  `/country/vietnam/language`, and `/country/vietnam/languages`.
- Singular detail routes are canonical: `/country/:slug` and `/city/:slug`.
  Plural detail paths redirect to those canonical routes.
- CI now runs typecheck, lint, unit tests, production build, and E2E smoke
  tests.

## Validation Commands

Run these before treating a change as lock-safe:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Current local validation after the lock work:

- `npm run lint` passed.
- `npm test` passed with 27 tests.
- `npm run typecheck` passed.
- `npm run build` passed from a clean local `.next` state.
- `npm run e2e` covers canonical route smoke checks.

## Enforced Tests

`tests/unit/ui-guardrails.test.ts` now checks:

- App frame overflow and width protection.
- Destination frame spacing and safe grid behavior.
- Map overlay spacing and non-cramped controls.
- Search suggestion display formatting.
- Homepage `60000` ms rotation timing.
- Homepage `3200ms` cinematic opacity transitions.
- Homepage atmosphere and scene color layers.
- Reduced-motion support for homepage cinematic motion.
- Visible slideshow UI ban patterns.
- `CinematicBackground` cross-fade and image-treatment primitives.
- Canonical route helpers for singular country and city detail routes.

## Current Known Local Artifacts

- `.next` is generated and ignored.
- Local stale `.next` cache state previously caused `next build` to hang at
  the banner. A clean `.next` state builds successfully.
- Duplicate `* 2.tsx` draft files under `app` and `components` were removed
  after their useful Vietnam route behavior was promoted.

## Open Decisions

- CI uses Node 22 while Netlify config uses Node 20. This is acceptable under
  the current `>=20` engine policy, but a single deployment/runtime version
  should be chosen before launch.
- Database migrations and seed imports are not yet covered by automated
  migration validation.

## Agent Rules

- Before changing UI, read `docs/JOURNEE_MASTER_LOCK_SPEC.md`.
- If a requested UI change conflicts with the master lock, ask whether the
  user wants to modify the master specification.
- Do not weaken lock tests to make a change pass. Update the master lock first
  if the product decision has genuinely changed.
