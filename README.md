# Journee

An editorial travel companion that tells travellers everything they need
about a country or city: seasons, costs, weather, visa rules, tipping,
must-have apps, transit, attractions, restaurants ranked by real reviews,
packing lists based on dates and activities, and more. The MVP pilots
**Tokyo** end-to-end; the data model is multi-country from day one.

Operated by The Launch Hub FZ-LLC (RAKEZ, UAE).

Full product plan: `/root/.claude/plans/let-s-plan-a-travel-witty-cake.md`.

## Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **UI**: Tailwind CSS, custom Japan palette (sumi / washi / enji /
  aizome / matcha / kintsugi / sakura / ume / ocean / forest)
- **Fonts**: Montserrat (body), Fraunces (editorial display), Italianno
  (script accent), Noto Serif JP (CJK fallback) — all via `next/font`.
- **Database + auth**: Supabase (Postgres + RLS + Storage) — plugged in
  for M4 onwards.
- **Hosting**: local-first during development (`npm run dev`). A host
  will be picked closer to launch; the code is framework-standard
  Next.js and not tied to any specific provider.
- **Testing**: Vitest (unit) + Playwright (e2e, added in M4)
- **Compliance posture**: globally valid Privacy Policy + Terms
  covering GDPR, UK GDPR, CCPA/CPRA, LGPD, PIPEDA, APPI, PDPL, PDPA,
  Australia Privacy Act, POPIA, PIPL, DPDP Act.

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables and fill in secrets
cp .env.example .env.local

# 3. (Once Supabase is wired) apply the database migrations
# Apply db/migrations/*.sql in filename order to the Supabase project.

# 4. (Once Supabase is wired) seed the pilot country + city
npm run seed

# 5. Start the dev server
npm run dev
# http://localhost:3000
```

For writing conventions (fonts, palette, bullets, currency handling,
commits) see [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Key routes

- `/` — landing page
- `/country/japan` — country hub with an interactive SVG map
- `/country/japan/{cuisine|famous-for|beverages|languages}`
- `/city/tokyo` — city hub
- `/city/tokyo/{attractions|restaurants|neighborhoods|hotels|shopping|…}`
- `/legal/{terms|privacy|affiliate-disclosure}`

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm start` | Run the production build |
| `npm run lint` | ESLint flat-config lint |
| `npm run typecheck` | TypeScript type-check |
| `npm test` | Vitest unit tests |
| `npm run e2e` | Playwright end-to-end tests |
| `npm run db:migrations:test` | Apply all migrations to a disposable Postgres/Supabase database |
| `npm run seed` | Seed countries + cities from `db/seed/` |

## Database Migration Test

Use a disposable database. Do not point this at production.

```bash
JOURNEE_MIGRATION_TEST_DATABASE_URL="postgresql://..." npm run db:migrations:test
```

The migration test applies every `db/migrations/*.sql` file in filename order,
then checks for representative tables from the major data layers. When run
against plain Postgres instead of Supabase, the script creates minimal `auth`
schema, `auth.users`, `auth.uid()`, `anon`, and `authenticated` compatibility
stubs before applying the migrations.

## Directory layout

```
app/                       Next.js App Router tree (server components by default)
  country/[slug]/          Country hub + deep-dive pages
  city/[slug]/             City hub + section pages + detail pages
  legal/                   Terms / Privacy / Affiliate disclosure
components/
  layout/                  PageHero, LanguagePicker, PreferencesMenu
  common/                  CoverTile, ImageCarousel, PieChart
  country/                 CountryMap (SVG + clickable pins)
  attraction/              AttractionCard, AttractionHeroCarousel, CategoryTabs
  restaurant/ hotel/ wellness/ cuisine/ famous/ beverages/ shopping/ …
  affiliate/               AffiliateLink, AffiliateCtas, AffiliateDisclosure
  consent/                 ConsentBanner + preferences dialog
lib/
  data/seed.ts             Typed accessors over the JSON seed
  api/fx.ts                FX snapshot (JPY base) with ISR cache
  currency/convert.ts      Minor-unit aware conversion + cross-rate triangulation
  preferences/context.tsx  Currency + units + language (localStorage-backed)
  consent/                 CMP state machine
  affiliates/              Partner registry + URL taggers (17 partners today)
  legal/constants.ts       Entity metadata + formatLongDate helper
  country-maps/            Stylised SVG map data per country
db/
  seed/{japan,tokyo}/*.json   Country + city seeds (JSON source of truth today)
  migrations/0001_init.sql    Postgres schema for when we plug Supabase in
tests/
  unit/                    Vitest (currency conversion + packing engine)
  e2e/                     Playwright golden paths
```

## Milestones

- **M0** ✅ Scaffolding, fonts, palette, CMP, legal copy
- **M1** ✅ Country + city hubs, weather, costs, currency conversion
- **M2** ⏳ Attractions (hero carousel + grid), restaurants, transit,
  hotels (with Airbnb CTA), visa picker (citizenship + residence),
  payments with tier signal, health & safety, arrival, connectivity
  (pre-arrival vs airport-pickup), holidays, cuisine (menu-style
  cards), famous-for, beverages (tea-or-coffee + 10 drinks), shopping
  (vertical-bubble hero + 10 categories incl. malls and boutiques),
  nightlife, wellness, emergency, visa, privacy, terms
- **M3** Filters, packing engine, itinerary templates, domestic-same-
  visa explorer
- **M4** Auth, trips CRUD, itinerary builder, weather-adaptive swaps,
  exports, journal
- **M5** UGC + moderation + AI concierge + notifications
- **M6** Passport Pro (Stripe), full CMP, GDPR export/delete, PWA
  offline, a11y audit, SOC 2 hardening

## Security notes

- Service-role + API-key secrets live server-side only; everything in
  `.env.example` starting without `NEXT_PUBLIC_` must not be imported
  from client components.
- Security headers (HSTS, CSP-ready, Referrer-Policy, Permissions-Policy,
  X-Frame-Options) are set in `next.config.ts`.
- Legal pages (`/legal/*`) are the single source of truth for privacy
  and terms — do not duplicate copy elsewhere.
- Affiliate links always pass through `AffiliateLink` so tagging and
  consent are applied uniformly.
