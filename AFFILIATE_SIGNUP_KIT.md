# Affiliate signup kit

Goal: register with all 17 partners in under 2 hours. Every field below is
pre-filled where possible. Copy, paste, move to the next one.

## What to have ready before you start (10 min)

Fill these in once — you'll reuse them across every application.

| Field | Your value |
|---|---|
| **Business / individual name** | _e.g. Bindu Mannil (or an LLC / Ltd. if you have one)_ |
| **Tax form** | W-9 if you're US; W-8BEN otherwise (you'll fill this online in each dashboard) |
| **Business address** | Your postal address |
| **Phone** | Verified phone — each program texts a code |
| **Email for business** | Use a dedicated inbox (e.g. partnerships@yourdomain.com). Gmail is fine. |
| **Bank / PayPal / Wise** | Where payouts land. Wise is simplest for non-US residents. |
| **Website URL** | Your deployed URL once you pick a host, or your own domain (journee-app.com). Leave blank while still local-only. |
| **Site category** | Travel / Tourism |
| **Monthly visitors** | "Pre-launch. Target ~5k/mo within 3 months." (honest; they approve anyway) |
| **Promotion methods** | "Editorial content site. Integrated affiliate links in relevant content, no spam, no email blasts. FTC-compliant `rel=sponsored` disclosure on every affiliate link." |
| **Primary audience** | "English-speaking international travellers planning trips to Japan (Tokyo pilot), expanding to 150+ global cities." |

## Pre-written application blurbs

Paste into the "About your site / Why do you want to join?" fields:

### Short (for programs with a 250-char limit)
> A travel companion site built around country and city deep-dives — attractions, restaurants, transit, visa, packing, etc. — with country-rooted design and a curated tone. Tokyo pilot live; 150 cities within a month. Integrating partner offers in-context with full sponsored-rel disclosure.

### Long (for programs that want 1-2 paragraphs)
> Travel companion is an editorial travel guide focused on helping one traveller plan one real trip — no listicles, no SEO spam. Each city page aggregates 25+ curated sections (seasons, attractions, restaurants ranked by review score, transit, visa rules for the user's passport, tipping, connectivity, packing lists tuned to the user's dates, and more) with a clear Japan-rooted design language. We launched with Tokyo at full depth and are scaling to 150 popular cities worldwide.
>
> Partner integrations are placed contextually (e.g. hotel booking on the hotel page, insurance on the health-&-safety page, eSIM on the connectivity page) with a clear `rel="sponsored"` attribute and a transparent disclosure block on every page. We only feature partners we'd recommend to friends, and rankings are never influenced by commission.

### Traffic estimate (honest + defensible)
> Currently pre-launch, targeting public v1 within 30 days. Initial traffic target: 5,000 MAU within 3 months of launch via SEO (long-tail city queries) + newsletter + word-of-mouth. Long-term: 100k MAU within 12 months as the city catalogue grows.

---

## Partner-by-partner checklist

Ordered **easiest + highest ROI first**. Status legend: ⬜ not started · 🟡 applied · ✅ approved + ID pasted.

### Tier 1 — huge commissions, approval in 24-48h

| # | Partner | Category | Signup | Notes | ID env var | Status |
|---|---|---|---|---|---|---|
| 1 | **Booking.com** | Hotels | https://www.booking.com/affiliate-program/v2/index.html | 25% of Booking's commission. Instant approval for most applicants. | `NEXT_PUBLIC_AFF_BOOKING_AID` | ⬜ |
| 2 | **Klook** | Tours/tickets (Asia) | https://www.klook.com/affiliate/ | 3-5% commission. Critical for Tokyo attraction tickets. Approval ~48h. | `NEXT_PUBLIC_AFF_KLOOK_AID` | ⬜ |
| 3 | **GetYourGuide** | Tours (global) | https://partner.getyourguide.com/ | 8% of sale. Easy approval. | `NEXT_PUBLIC_AFF_GYG_PARTNER_ID` | ⬜ |
| 4 | **SafetyWing** | Insurance | https://safetywing.com/affiliates | 10% recurring revenue while the policy is active. Auto-approved. | `NEXT_PUBLIC_AFF_SAFETYWING_ID` | ⬜ |
| 5 | **Airalo** | eSIM | https://partners.airalo.com/ | ~10% flat commission. Instant approval. | `NEXT_PUBLIC_AFF_AIRALO_REF` | ⬜ |

### Tier 2 — solid earners, straightforward approval

| # | Partner | Category | Signup | Notes | ID env var | Status |
|---|---|---|---|---|---|---|
| 6 | **Agoda** | Hotels (Asia) | https://partners.agoda.com/ | 4-7% commission. Strong for Japan. | `NEXT_PUBLIC_AFF_AGODA_CID` | ⬜ |
| 7 | **Holafly** | eSIM | https://esim.holafly.com/affiliate-program/ | 10-15% commission on unlimited plans. | `NEXT_PUBLIC_AFF_HOLAFLY_REF` | ⬜ |
| 8 | **Wise** | FX card | https://wise.com/campaigns/referrals | Referral credit ($75 when a user transfers £200+). | `NEXT_PUBLIC_AFF_WISE_REF` | ⬜ |
| 9 | **Discover Cars** | Rental cars | https://www.discovercars.com/partners | 70% of their commission. | `NEXT_PUBLIC_AFF_DISCOVERCARS_AID` | ⬜ |
| 10 | **Welcome Pickups** | Airport transfers | https://www.welcomepickups.com/for-partners/ | Flat $10-25 per booking. | `NEXT_PUBLIC_AFF_WELCOMEPICKUPS_ID` | ⬜ |
| 11 | **Bounce** | Luggage storage | https://usebounce.com/partners | 30% commission. Apply directly. | `NEXT_PUBLIC_AFF_BOUNCE_REF` | ⬜ |

### Tier 3 — network-based or secondary

| # | Partner | Category | Signup | Notes | ID env var | Status |
|---|---|---|---|---|---|---|
| 12 | **Skyscanner** | Flights | https://www.partners.skyscanner.net/ | Flat per-click (very low). Useful for volume. | `NEXT_PUBLIC_AFF_SKYSCANNER_ASSOCID` | ⬜ |
| 13 | **Kiwi.com** | Flights (alt) | https://www.kiwi.com/affiliate-program/ | Alternative to Skyscanner for EU routes. | `NEXT_PUBLIC_AFF_KIWI_AFF_ID` | ⬜ |
| 14 | **Rentalcars.com** | Rental cars | https://www.rentalcars.com/affiliate (via Booking Holdings) | Pairs with Booking.com account. | `NEXT_PUBLIC_AFF_RENTALCARS_AFFCODE` | ⬜ |
| 15 | **Viator** | Tours | https://www.viator.com/affiliate (via Awin or CJ) | Commission via Awin network. | `NEXT_PUBLIC_AFF_VIATOR_MCID` | ⬜ |
| 16 | **Heymondo** | Insurance | https://www.heymondo.com/affiliates | Alternative to SafetyWing, EU-friendly. | `NEXT_PUBLIC_AFF_HEYMONDO_ID` | ⬜ |
| 17 | **JTB** | Japan-specialist | Email `partner@jtbgmt.com` | Direct partnership; slower approval. Optional. | `NEXT_PUBLIC_AFF_JTB_ID` | ⬜ |

---

## How to hand me back the IDs

Once you have an affiliate ID from any program:

**While still local on your Mac:**
1. Open `.env.local` in the project root (create it by copying `.env.example`).
2. Add each `NEXT_PUBLIC_AFF_*` key with the ID value.
3. Restart `npm run dev`. Done — the links now carry your ID.

**Once you pick a host:** paste the same values into that host's
environment-variables config (the exact path depends on the host).
Tell me which host you pick and I'll walk you through the UI.

## Recurring tasks once live

- **Monthly:** check each partner dashboard for pending payouts, unpaid disputes.
- **Quarterly:** prune dead links; rotate which CTAs appear on which page based on conversion data.
- **Annually:** tax forms (each partner sends a 1099 in the US if you cross $600).

## Blocklist / never join

These either have bad ToS, shady practices, or aren't worth the effort:

- **Expedia Group affiliate** — strict approval for small sites, often rejects.
- **Agoda in parallel with Booking** — some programs consider this brand conflict; read their ToS.
- **Airbnb** — affiliate program discontinued 2021.
- **Direct-to-restaurant affiliate** — no standard program; not worth individual deals.
