# 30-day launch plan — 150 cities, public v1

The goal: ship a publicly accessible v1 at a real domain within **30 days**,
with hand-quality **Tokyo** + 9 other flagship cities, plus AI-generated +
human-reviewed content for another ~140 cities at a lighter depth. Social /
auth features (profiles, follow, blog, photo votes, reviews) go live in the
final week so everything else is locked down first.

## What's already done

- Tokyo at full depth (~30 sections, 12 attractions, 12 restaurants,
  12 neighborhoods, 12 hotels, 10 wellness venues, 4 itinerary templates,
  packing engine, cuisine, famous-for, nightlife, hidden gems, shopping,
  kids, emergency, arrival, payments, connectivity, calendar, culture,
  good-to-know, health-safety).
- Japan-rooted palette + Noto Serif JP / Montserrat typography.
- Preferences (currency · °C/°F · km/mi) persisted globally.
- 67 routes, 46 pre-rendered, full production build green.

## What's still to ship

### Week 1 — Infrastructure for scale

| Day | Build | Unlocks |
|---|---|---|
| 1-2 | **Real photos pipeline** — optional `image_url` on every entity, `<img>` wired in `CoverTile`, Wikimedia + Unsplash CDN allowed in `next.config.ts` | Visual credibility across the app |
| 2-3 | **Map view** — Leaflet + OpenStreetMap tiles; coords added to attractions / restaurants / hotels / wellness seed; /city/\[slug\]/map page with shared filter state | "Is this near my hotel?" |
| 3-4 | **Global search** — Cmd-K modal, prebuilt index from seed (all entities + dishes + phrases), typeahead | Ability to find anything in the app |
| 4-6 | **Content-generation pipeline** — `scripts/generate-city.ts` that takes a city slug + ~3 sources (Wikivoyage, Wikipedia, Google Places seed), calls Claude with a system prompt containing our schema, writes `db/seed/{city}/*.json` with full metadata, saves a draft-for-review queue | 150-city content feasibility |
| 6-7 | **AI concierge shell** — `/city/\[slug\]/ask` page, server action hits Anthropic SDK with city seed injected as system context, returns a rendered itinerary | Signature feature |

### Week 2 — Flagship cities + Tier 2 generation

| Day | Build |
|---|---|
| 8-11 | Hand-edit **Kyoto** and **Osaka** at Tokyo depth (both get attractions, restaurants, neighborhoods, hotels, wellness, itineraries). Proves the multi-city model + exercises the `inter_city_routes` we already wired. |
| 12-13 | Generate 60 Tier 2 cities via the pipeline. Spot-check each for obvious issues (wrong country, dead URLs, absurd prices). Publish as "Lite guide" pages — country inheritance fills most of the content. |
| 14 | Performance + QA pass on all cities; prune broken URLs. |

### Week 3 — Tier 2 finish + stateless features

| Day | Build |
|---|---|
| 15-17 | Generate remaining 80 Tier 2 cities; second QA pass. |
| 17-18 | **Weather-aware itinerary swap** — live forecast strip (OpenWeather One Call), Day N rainy → suggest indoor alternatives |
| 18-19 | **Seasonal landing pages** — sakura, autumn foliage, fireworks, winter illuminations — aggregator pages pulling relevant attractions + restaurants + viewing spots |
| 19-20 | **Budget samples** — "Tokyo on ¥5k / ¥15k / ¥40k / day" day-in-the-life breakdowns |
| 20-21 | **Self-guided walking routes** — neighborhoods get 60-90-min waypoint tours |

### Week 4 — Auth, social, legal, launch

| Day | Build |
|---|---|
| 22-23 | **Supabase auth** — sign in with email magic-link + Google OAuth; `user_profiles` table; saved trips + bookmarks |
| 24-25 | **Reviews + votes + follow** — user-generated content on attractions / restaurants / hotels; follow user graph; vote-on-photo |
| 25-26 | **Blog posts + photo upload** — users can post trip journals; Cloudflare R2 or Supabase Storage for images; moderation queue |
| 26-27 | **Legal copy** — Terms of Service, Privacy Policy, affiliate disclosure, cookie / CMP banner (required for EU users) |
| 27-28 | **SEO + performance** — sitemap.ts, JSON-LD (`TouristDestination`, `TouristAttraction`, `Restaurant`), dynamic OG images per city, PWA manifest, Lighthouse pass |
| 28-29 | **Production deploy** — pick a host (decide at launch time), custom domain + SSL, Cloudflare DNS, Sentry, PostHog (EU-hosted), a11y scan |
| 29-30 | **Beta + bug bash** — 30-50 test users, tighten top 10 complaints, ship. |

## External decisions I need from you

In priority order — blocks forward motion if not resolved:

1. **Cities list** — I'll draft a 150-city list ranked by international tourism volume. You approve / swap in what matters to your audience. Without this we can't start Tier 2 generation.
2. **API accounts + billing** — create these on your side and drop the
   keys into `.env.local` while developing (and into the host's env
   config once we pick one):
   - **Supabase** Pro ($25/mo)
   - **Anthropic API** (~$200 one-time for content gen + ongoing for concierge)
   - **Google Places** (~$200-500 one-time for photos + coords)
   - **OpenWeather** (free tier works)
   - Hosting (picked at launch — budget ~$0-25/mo depending on choice)
   - **Cloudflare R2** or **Supabase Storage** for user-uploaded photos (pennies)
3. **AI-generated content is okay?** Tier 2 cities cannot be hand-written — they will be AI-generated from sources, with a human spot-check before publish. Explicit sign-off here is critical.
4. **Photography strategy** — fastest ship: **Wikimedia Commons** (CC-BY/public-domain, stable) for hero/attraction images; **Unsplash** as fallback. Longer term: commissioned photos via a photographer network (ignore for v1). Confirm you want to use Wikimedia + Unsplash.
5. **Legal review** — I'll draft Terms of Service, Privacy Policy, and a CMP cookie banner template. Do you have a lawyer review before launch, or do we ship with generic templates + strong "verify before travel" disclaimers on visa / health / legal pages?
6. **Analytics / consent** — **PostHog EU** is privacy-first and behind the CMP; OK to use?
7. **Domain + brand name** — what's the launch domain? I'll wire HSTS preload and set the OG defaults.

## Risks I'm flagging up front

| Risk | Mitigation |
|---|---|
| Hand-writing 150 cities is impossible — even for a team | Pipeline + human review, not hand-writing. Tier-based depth. |
| AI-generated content for visa / health / legal is dangerous | Those sections are **country-level** (Japan done, visa rules hand-curated), not generated per city. City-level generation covers only attractions, restaurants, neighborhoods, transit, seasonal tips. Red-flag validation inside the generator catches bad outputs. |
| Image licensing | Wikimedia (free) + Unsplash (free-for-commercial) + explicit attribution. No scraped photos. |
| API cost overruns | Field-masked Google Places requests, prompt caching on Anthropic, daily caps in Upstash rate limit. |
| Moderation for user content at launch with a small team | Launch week: only trusted / invited users can post blog / review. Open to all in week 5+ with moderation queue workflow. |
| SOC 2 / GDPR posture | Supabase is SOC 2 Type 2; pick a SOC 2-compliant host at launch time. GDPR export/delete endpoints baked in. Documented in `/security.md`. |

## Open work list by priority

1. Map view (Leaflet)
2. Global search
3. Real photos — Wikimedia first
4. AI concierge
5. Weather-aware swap
6. Kyoto + Osaka at depth
7. Content generation script
8. 150 Tier 2 cities
9. Seasonal landing pages
10. Budget samples
11. Walking routes
12. Auth + profiles
13. Blog + reviews + follow + vote + photo upload
14. Legal copy + CMP + GDPR endpoints
15. SEO + PWA
16. i18n (EN + JP minimum)
17. Production deploy + beta

I'll keep this doc in sync with every commit. If a day slips, it'll say so
here before I tell you verbally.
