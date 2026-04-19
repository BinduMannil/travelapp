# Travel companion

A web app that tells travelers everything they need about a country or city:
seasons, costs, weather, visa rules, tipping, must-have apps, transit, attractions,
restaurants ranked by real reviews, packing lists based on dates and activities,
and more. The MVP pilots **Tokyo** end-to-end; the data model is multi-country
from day one.

Full product plan: `/root/.claude/plans/let-s-plan-a-travel-witty-cake.md`.

## Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **UI**: Tailwind CSS + shadcn/ui (to be added)
- **Database + auth**: Supabase (Postgres + RLS + Storage)
- **Hosting**: Vercel
- **Testing**: Vitest (unit) + Playwright (e2e, added in M4)
- **Compliance posture**: SOC 2 Type 2 via Supabase + Vercel; RLS on every user table

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables and fill in Supabase project details
cp .env.example .env.local
# Edit .env.local with your NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
# and SUPABASE_SERVICE_ROLE_KEY from https://supabase.com/dashboard

# 3. Apply the initial database migration
# In the Supabase SQL editor, paste the contents of db/migrations/0001_init.sql
# and run. (Later we will wire up the Supabase CLI for automated migrations.)

# 4. Seed the pilot country + city
npm run seed

# 5. Start the dev server
npm run dev
# http://localhost:3000
```

## Routes (so far)

- `/` — landing page
- `/country/japan` — country hub (section tiles)
- `/city/tokyo` — city hub (section tiles)

Section pages (weather, costs, attractions, visa, etc.) are stubbed and will
fill in through milestones **M1** and **M2**.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm start` | Run the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript type-check |
| `npm test` | Vitest unit tests |
| `npm run e2e` | Playwright end-to-end tests |
| `npm run seed` | Seed countries + cities from `db/seed/` |

## Directory layout

```
app/                  Next.js routes (marketing, country, city, trips, etc.)
components/           UI components
lib/
  supabase/           Server, client, and admin Supabase clients
  currency/           Currency conversion utilities
  validation/         zod schemas for server actions and route handlers
db/
  migrations/         SQL migrations (Supabase)
  seed/               Curated seed data per country and city
tests/
  unit/               Vitest tests
```

## Milestones

- **M0** Scaffolding, Supabase clients, migration #1, CI *(current)*
- **M1** Country + city hubs + weather + costs + currency
- **M2** Attractions, restaurants, transit, hotels, visa, payments, health & safety, logistics, connectivity, holidays
- **M3** Filters, packing engine, itinerary templates, domestic-same-visa explorer
- **M4** Auth, trips CRUD, itinerary builder, weather-adaptive swaps, exports, journal
- **M5** UGC + moderation + AI concierge + notifications
- **M6** Passport Pro (Stripe), CMP, GDPR, PWA offline, a11y, SOC 2 hardening

## Security notes

- `SUPABASE_SERVICE_ROLE_KEY`, `OPENWEATHER_API_KEY`, `GOOGLE_PLACES_API_KEY`,
  `STRIPE_SECRET_KEY` are **server-only** — never imported from client components.
- Every user-owned table has Row Level Security enabled; anon/auth users can
  only see their own rows (see `db/migrations/0001_init.sql`).
- Public sharing of trips goes through the `get_public_trip` `SECURITY DEFINER`
  RPC so we never need to expose the `trips` table directly.
- Security headers (HSTS, CSP-ready, Referrer-Policy, Permissions-Policy,
  X-Frame-Options) are set in `next.config.ts`.
