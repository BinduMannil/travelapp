# Contributing to Journee

This is a reviewer-first guide: if you've just walked in on the codebase,
reading this should give you enough context to make a change without
breaking a convention.

## The shape of the app

```
app/                         # Next 15 App Router tree — server components by default
  (marketing)/page.tsx       # home
  country/[slug]/            # country-level pages (Japan today)
    page.tsx                   # the country hub (map + section tiles)
    (beverages|cuisine|famous-for|languages)/page.tsx
  city/[slug]/               # city-level pages (Tokyo today)
    page.tsx                   # the city hub
    (attractions|restaurants|neighborhoods|hotels|shopping|...)/page.tsx
    <section>/[child]/page.tsx # detail pages for individual entities
  legal/                     # terms / privacy / affiliate disclosure
    layout.tsx                 # forces Montserrat across every legal page
  api/                       # route handlers (FX, contribute, trips/ics, …)
components/
  layout/                    # PageHero, LanguagePicker, PreferencesMenu
  common/                    # CoverTile, ImageCarousel, PieChart
  city/, country/, attraction/, restaurant/, hotel/, wellness/, …
  affiliate/                 # AffiliateLink, AffiliateCtas, AffiliateDisclosure
  consent/                   # ConsentBanner, PreferencesTrigger
  filters/                   # shared facet-filter bar (future)
lib/
  data/seed.ts               # typed accessors over the JSON seed
  api/fx.ts                  # FX snapshot fetcher + ISR cache
  currency/convert.ts        # minor-unit aware conversion + triangulation
  preferences/context.tsx    # currency + units context (localStorage-backed)
  consent/                   # CMP state machine
  affiliates/                # partner registry + URL taggers
  legal/constants.ts         # single source of truth for entity metadata
  country-maps/              # stylised SVG map data per country
db/
  seed/{japan,tokyo}/*.json  # country + city seeds (the JSON source of truth)
  migrations/0001_init.sql   # Postgres schema (for the eventual DB move)
tests/
  unit/                      # Vitest — currency, packing engine, schemas
  e2e/                       # Playwright (golden paths)
```

## Typography

Three fonts are loaded via `next/font`:

| Variable             | Font            | Used for                                   |
|:---------------------|:----------------|:-------------------------------------------|
| `--font-sans`        | Montserrat      | Body, cards, numbers, UI (the default)     |
| `--font-display`     | Fraunces        | Editorial hero titles (`font-display`)     |
| `--font-script`      | Italianno       | Signature accents (`font-script`)          |
| `--font-jp-serif`    | Noto Serif JP   | Kanji fallback only; never opt-in directly |

**Default every new heading / paragraph to Montserrat.** Reach for
`font-display` only on hero titles. Reach for `font-script` only as a
handwritten accent flourish.

## Palette

Use the Japan palette tokens in `tailwind.config.ts` — never `slate-*` or
ad-hoc greys:

| Token     | Role                              |
|:----------|:----------------------------------|
| sumi      | Ink / charcoal — dark chrome      |
| washi     | Handmade paper — off-white / card bg |
| enji      | Crimson — primary accent          |
| aizome    | Indigo — secondary accent         |
| matcha    | Muted green — info / success      |
| kintsugi  | Gold leaf — premium / highlights  |
| sakura    | Pink — soft accent                |
| ume       | Plum — alt crimson                |
| ocean     | Deep indigo — marine / maps       |
| forest    | Forest green — nature / parks     |

## Currency handling

- Seed prices are stored as **minor units** in their source currency
  (`avg_price_per_person_minor: 18000, currency: "JPY"`).
- JPY is a **zero-decimal** currency — 18000 means ¥18,000, not ¥180.
- Always render user-facing money through `<PriceDisplay amountMinor=...
  currency=... />`. It converts to the user's home currency via the
  FX snapshot and falls back to the source currency if no rate can be
  resolved.
- `convertMinor` **triangulates** via a common base when there's no
  direct rate (our snapshot is JPY-based, so USD→AED resolves via JPY).

## Dates

Every user-facing date goes through `formatLongDate(iso)` from
`lib/legal/constants.ts`, which renders `"2026-04-20"` as
`"20 April 2026"`. Never render raw ISO dates.

## Bullets

`ul.list-disc` is styled globally in `globals.css` to hang the marker
flush with the paragraph left edge, with wrapped lines indenting under
the text column. For Pros / Cons and feature lists inside cards, use
the flex-row pattern:

```tsx
<li className="flex gap-2">
  <span aria-hidden className="mt-0.5 shrink-0 text-sumi-400">·</span>
  <span className="flex-1 leading-snug">{text}</span>
</li>
```

This guarantees wrapped lines stay aligned under the item text.

## Affiliate links

- Register every partner in `lib/affiliates/partners.ts`.
- Wrap outbound links in `<AffiliateLink partner="...">` so the URL
  tagger runs and the click is logged through the consent layer.
- Commercial links always carry `rel="sponsored noopener"` — the
  wrapper sets this for you.
- Every page with an affiliate link must surface the
  `<AffiliateDisclosure />` block near the footer of that page.

## Accessibility

- All interactive elements are keyboard-reachable (`tab` / arrow keys
  on carousels).
- `aria-label` or visible label on every icon-only button.
- Colour is never the only signal — pair with a label or icon.
- WCAG 2.1 AA contrast on all text over gradients (`text-washi-50`
  on sumi, `text-sumi-900` on washi).

## Testing

- `npm run typecheck` — must be clean before commit.
- `npm run lint` — must be clean before commit.
- `npm test` — Vitest unit suite (currency + packing).
- `npm run build` — must succeed before pushing.

## Commits

- One concern per commit. Subject line <= 72 chars, imperative.
- Body explains *why*, not what (the diff already shows what).
- Every commit closes with the Claude Code session URL so a reviewer
  can trace the reasoning.

## Environment

All runtime secrets live in `.env.local` (never committed). `.env.example`
is the canonical list — add to it when you introduce a new variable.

## Making a change

1. Read the nearest page/component to understand the conventions in
   use.
2. Follow the palette / font / bullet / currency rules above.
3. Type-check + lint + test before you commit.
4. If you touch legal, currency, FX, affiliate, or consent code, update
   the relevant tests in `tests/unit/`.
