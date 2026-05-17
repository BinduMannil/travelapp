# Vietnam Backend Stack

Vietnam is the first real-world daily-use country stack after the Japan pilot.
This layer is backend/data-only: no frontend routes or UI were changed.

## Seed Coverage

Country:

- `db/seed/vietnam/country.json`

Cities:

- Ho Chi Minh City
- Hanoi
- Da Nang
- Hoi An
- Hue
- Nha Trang
- Da Lat
- Sapa
- Phu Quoc
- Ha Long
- Ninh Binh
- Can Tho

City seed file:

- `db/seed/vietnam/cities.json`

## Destination Identity

`db/seed/vietnam/destination_identity.json` defines one country profile and one
profile for each pilot city. Each profile includes:

- palette key and color palette
- typography/script mood
- ambient motion idea
- texture/background style
- photography mood
- accent symbols

These import into `destination_identity_profiles`.

## Daily-Use Travel Foundation

Vietnam local apps:

- Grab
- be
- Xanh SM
- Zalo
- MoMo
- ShopeeFood
- VeXeRe
- Booking.com

Seed file:

- `db/seed/vietnam/local_apps.json`

These import into `local_apps`.

## Travel Intelligence

`db/migrations/0006_destination_intelligence_affiliates.sql` adds
`destination_intelligence_notes` for practical travel behavior and planning
notes.

Vietnam pilot categories:

- visa/eVisa
- money, ATMs, cash, and card behavior
- scams and traveler friction
- police and official interaction
- crossing roads
- scooter and motorbike culture
- SIM/eSIM setup
- weather by region
- nightlife
- local etiquette

Seed file:

- `db/seed/vietnam/intelligence_notes.json`

Rows include source labels, URLs, reviewed dates, confidence levels, practical
guidance, watchouts, and examples.

## Activities

Vietnam-specific travel activities are added to the shared activity taxonomy:

- motorbike travel
- trekking
- island hopping
- cave exploration
- diving and snorkeling
- coffee culture
- tailoring
- digital nomad
- train journeys

Seed file:

- `db/seed/vietnam/travel_activities.json`

These import into `travel_activities` and `destination_activity_map`.

## Price Benchmarks

Vietnam country-level benchmark examples:

- street coffee
- bánh mì
- phở/noodle soup
- local beer
- GrabBike
- taxi
- hostel bed
- boutique hotel
- tourist SIM/eSIM

Seed file:

- `db/seed/vietnam/price_benchmarks.json`

These import into `price_benchmarks`.

## Phrasebook

Vietnamese phrasebook categories:

- taxis
- restaurants
- emergency
- bargaining
- transport
- cafés

Seed file:

- `db/seed/vietnam/phrasebook.json`

These import into `phrasebook_entries`.

## Affiliate Readiness

`destination_affiliate_opportunities` prepares commercial placement strategy
without activating links or changing UI.

Vietnam opportunity categories:

- hotels
- tours
- eSIM
- transfers
- activities
- buses/trains
- insurance

Seed file:

- `db/seed/vietnam/affiliate_opportunities.json`

## Accessors

Supabase-first accessors with JSON fallback:

- `lib/data/destination-catalog.ts`
- `lib/data/destination-foundation.ts`
- `lib/data/destination-intelligence.ts`

Existing Japan pilot data and existing frontend JSON fallbacks remain intact.

## Source Posture

Where possible, pilot rows use official or durable traveler-facing sources,
including:

- Vietnam Immigration Department eVisa portal
- Vietnam National Authority of Tourism
- U.S. Department of State country information
- U.K. Foreign Travel Advice
- provider websites for local apps

Every source-backed row has a reviewed date. Price rows are marked with
confidence levels because real prices vary heavily by season, city, weather,
and tourist zone.
