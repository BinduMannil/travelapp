# JOURNEE UI Route Inventory

Audit date: 2026-05-14

Scope: `app/**/page.tsx`, `lib/routes.ts`, `primaryNavigation`, `mainNavigation`, `NAVIGATION_HREFS`, and `siteDirectory`.

## Executive Summary

- The app currently exposes 101 page routes, including aliases, dynamic city/country routes, legal pages, internal tools, and product surfaces.
- `mainNavigation`, `primaryNavigation`, `NAVIGATION_HREFS`, and `siteDirectory` mostly point at existing routes, but several labels route to aliases or reused pages instead of distinct product surfaces.
- `/journey-builder` is the clearest wrong-page issue: it re-exports `/trips`, so Journey Builder currently renders `MyTripsPage` instead of `JourneyBuilderPage`.
- `NAVIGATION_HREFS.Discover` points to `/explore` even though `/discover` exists.
- Several routes are two-line aliases: `/activity-feed`, `/collaboration`, `/community-ideas`, `/confirmation`, `/offline-maps`, `/rail`, `/affiliate-disclosure`, and `/privacy-policy`.
- Top navigation, sidebars, filter panels, cards, search bars, and product shell structure are repeated across many product pages instead of being centralized.
- Most product surfaces are static-only mock UIs with local arrays and non-persistent controls; they need future cinematic, route-native implementations before new page expansion.

## Navigation Registry Comparison

| Registry | Listed route | Actual route exists | Current status | Problem | Required future UI | Priority | Recommended agent |
|---|---:|---:|---|---|---|---|---|
| `primaryNavigation` | `/`, `/explore`, `/atlas`, `/trips`, `/guides`, `/journal`, `/profile` | Yes | Implemented | All exist; surfaces are inconsistent and largely static | Keep registry, normalize shared app shell/top nav | P1 | Cloud Agent |
| `mainNavigation` | `/`, `/explore`, `/atlas`, `/trips`, `/guides`, `/journal`, `/stays`, `/flights`, `/visa`, `/budget`, `/weather`, `/currency`, `/support` | Yes | Implemented | All exist; many product pages duplicate nav and filters | Shared shell plus route-specific cinematic pages | P1 | Desktop Agent |
| `NAVIGATION_HREFS` | `/journey-builder` | Yes | Wrong page | Re-exports `/trips`; builder component exists but is unused | Dedicated journey-building workspace | P0 | Desktop Agent |
| `NAVIGATION_HREFS` | `Discover -> /explore` | Yes | Wrong target | `/discover` exists but nav sends Discover to Explore | Choose canonical Discover or remove duplicate | P1 | Cloud Agent |
| `NAVIGATION_HREFS` | `/activity-feed`, `/collaboration`, `/community-ideas`, `/offline-maps`, `/rail`, `/confirmation` | Yes | Alias pages | Labels exist but render other route surfaces | Decide whether aliases stay or become distinct pages | P2 | Cloud Agent |
| `NAVIGATION_HREFS` | `/admin`, `/documents`, `/concierge`, `/suggestions`, `/search`, `/reviews`, `/aurora`, `/expeditions`, `/yachts` | Yes | Implemented | Present in route map, not consistently surfaced in main/site nav | Product IA pass after core routes stabilize | P2 | Cloud Agent |
| `siteDirectory` | Core, Travel Tools, Booking, Community, Modes, Destinations | Yes | Implemented | All links resolve, but several are aliases or static-only | Rebuild directory after canonical route decisions | P2 | Cloud Agent |

## Complete Route Inventory

| Route | Current status | Current component used | Problem | Required future UI | Priority | Recommended agent |
|---|---|---|---|---|---|---|
| `/` | Exists | `JourneeWebExperience` | Static home/discovery entry with hardcoded shortcuts | Cinematic home/dashboard entry with live product modules | P1 | Desktop Agent |
| `/:locale` | Exists | `LocalizedHomePage` | Locale route only wraps localized home | Real localized product shell and translated route metadata | P3 | Cloud Agent |
| `/explore` | Exists | `ExploreDiscoveryPage` | Same component as `/discover` | Canonical Explore discovery surface | P1 | Desktop Agent |
| `/discover` | Exists | `ExploreDiscoveryPage` | Duplicate of `/explore`; nav `Discover` points to `/explore` | Decide canonical route; if kept, give Discover a distinct cinematic role | P1 | Cloud Agent |
| `/atlas` | Exists | `AtlasMapPage` | Large static map/data experience | Interactive map mode with reusable app shell | P1 | Desktop Agent |
| `/search` | Exists | `SearchResultsPage` | Static search surface | Global search with real query state/results | P2 | Desktop Agent |
| `/journey-builder` | Exists, wrong page | Re-export of `/trips/page`; renders `MyTripsPage` | Journey Builder currently reuses Trips instead of its own page; `JourneyBuilderPage` exists unused | Full builder workspace: timeline, dates, saved places, budget, collaboration, booking handoff | P0 | Desktop Agent |
| `/trips` | Exists | `MyTripsPage` | Static trips list; sidebar links use `#` for inactive sections | Own trips dashboard with real trip states and working subsections | P0 | Desktop Agent |
| `/journal` | Exists | `JourneyJournalPage` | Static journal/editor UI | Journal with real entries, media, trip linkage, filters | P1 | Desktop Agent |
| `/journal/all-entries` | Exists, duplicate | `JourneyJournalPage` | Same as `/journal`; no distinct all-entries mode | Either route state for all entries or redirect/canonicalize | P2 | Cloud Agent |
| `/guides` | Exists | `TravelIntelligencePage` | Static guide cards and anchor-only CTAs | Guide library with guide detail routes and tool handoffs | P1 | Desktop Agent |
| `/profile` | Exists | `ProfileSavedPlacesPage` | Static saved places/profile shell | Account profile, saved places, saved trips, privacy/account modules | P1 | Desktop Agent |
| `/settings` | Exists | Inline `SettingsPage` | Static settings controls plus preference dropdown | Real settings surface tied to preferences/account | P2 | Desktop Agent |
| `/onboarding` | Exists | `JourneeOnboardingPage` | Client-only static preference flow | Persisted onboarding feeding recommendations | P2 | Desktop Agent |
| `/stays` | Exists | Inline `StaysPage` | Static filters/cards, duplicated nav/filter shell | Cinematic stay search and comparison surface | P0 | Desktop Agent |
| `/flights` | Exists | Inline `FlightsPage` | Static flight cards, duplicated product shell | Flight search, fare intelligence, booking handoff | P1 | Desktop Agent |
| `/booking` | Exists | Inline `BookingCheckoutPage` | Static checkout UI | Route-aware checkout flow connected to selected product | P1 | Desktop Agent |
| `/booking/confirmation` | Exists | `BookingConfirmationPage` | Static confirmation | Confirmation with itinerary linkage and next actions | P2 | Desktop Agent |
| `/confirmation` | Exists, alias | Re-export of `/booking/confirmation` | Top-level alias can confuse canonical booking route | Keep as compatibility redirect/alias or remove from nav | P3 | Cloud Agent |
| `/experiences` | Exists | Inline `ExperiencesPage` | Basic static directory; no full product shell | Experience marketplace/listing surface | P1 | Desktop Agent |
| `/experiences/:slug` | Exists, alias/redirect | Redirects known slug to `/activities/:slug` | Only one experience alias; unknown slugs 404 | Canonical detail route strategy for activities vs experiences | P2 | Cloud Agent |
| `/activities/shibuya-food-culture-walk` | Exists | `ExperienceDetailBookingPage` | Single hardcoded activity detail | Experience detail template with data-backed slugs | P2 | Desktop Agent |
| `/activity` | Exists | `ActivityFeedPage` | Static activity feed | Live activity/notification feed | P2 | Desktop Agent |
| `/activity-feed` | Exists, alias | Re-export of `/activity` | Duplicate URL surface | Canonicalize or give feed-specific state | P3 | Cloud Agent |
| `/collaboration` | Exists, alias | Re-export of `/trip-collaboration` | Generic route renders trip collaboration page | Decide if collaboration is global or trip-scoped | P2 | Cloud Agent |
| `/trip-collaboration` | Exists | `TripCollaborationPage` | Static collaboration workspace | Shared trip workspace with members, permissions, comments, polls | P1 | Desktop Agent |
| `/community-ideas` | Exists, alias | Re-export of `/suggestions` | Alias to suggestions | Decide canonical community ideas/suggestions route | P3 | Cloud Agent |
| `/suggestions` | Exists | `SuggestionBoard` | Mostly local/static roadmap board with API hooks | Product feedback board with authenticated voting/moderation | P2 | Cloud Agent |
| `/reviews` | Exists | `ReviewsRatingsPage` | Static filters/review data, duplicated shell | Reviews and ratings surface with real filtering | P2 | Desktop Agent |
| `/support` | Exists | `JourneeSupportPage` | Static support entry | Support center with cases, help articles, emergency flows | P2 | Desktop Agent |
| `/concierge` | Exists | `ConciergeOSPage` | Static concierge OS | AI/trip concierge command center | P1 | Desktop Agent |
| `/documents` | Exists | `TravelRecordsPage` | Static records vault | Document vault for visas, bookings, insurance, IDs | P2 | Desktop Agent |
| `/admin` | Exists | `AdminControlCenter` | Static admin mock | Internal admin with protected access and real moderation ops | P3 | Cloud Agent |
| `/visa` | Exists | `VisaEntryRequirementsPage` | Static visa product page | Country-aware visa eligibility and document checklist | P1 | Desktop Agent |
| `/weather` | Exists | `WeatherSeasonsPage` | Static weather/season cards | Destination/date-aware weather planning surface | P2 | Desktop Agent |
| `/currency` | Exists | Inline `CurrencyPage` | Static rates/cards; duplicated sidebars | Live FX converter and spending guidance | P2 | Desktop Agent |
| `/budget` | Exists | Inline `BudgetPage` | Static budget planner/cards | Trip budget planner with categories, currency, bookings | P1 | Desktop Agent |
| `/alerts` | Exists | `NotificationsAlertsPage` | Static alert center | Live trip, weather, price, safety, and booking alerts | P2 | Desktop Agent |
| `/offline` | Exists | `OfflineAccessPage` | Static offline/downloads UI | Offline maps/download manager tied to saved trips | P2 | Desktop Agent |
| `/offline-maps` | Exists, alias | Re-export of `/offline` | Alias label in navigation | Canonical offline route or map-specific subview | P3 | Cloud Agent |
| `/culture` | Exists | `CultureEnginePage` | Static culture engine; custom sidebar shell | Culture intelligence surface by destination/context | P2 | Desktop Agent |
| `/yachts` | Exists | Inline `YachtsPage` | Static niche mode, duplicated sidebar/nav | Yacht planning/charter cinematic mode | P3 | Desktop Agent |
| `/rail-journeys` | Exists | Inline `RailJourneysPage` | Static rail mode, duplicated sidebar/nav | Rail itinerary planner and route cards | P2 | Desktop Agent |
| `/rail` | Exists, alias | Re-export of `/rail-journeys` | Short alias to rail journeys | Canonicalize or route to rail search overview | P3 | Cloud Agent |
| `/aurora` | Exists | Inline `AuroraPage` | Static cinematic mode | Aurora trip planner with date/weather probability | P3 | Desktop Agent |
| `/expeditions` | Exists | Inline `ExpeditionsPage` | Static expedition mode, duplicated shell | Expedition planner with risk/gear/team modules | P3 | Desktop Agent |
| `/airspace` | Exists | `AirspacePage` | Exists but not listed in route registries | Decide whether public, internal, or hidden product route | P3 | Cloud Agent |
| `/create` | Exists | `TravelerCreatorsPage` | Exists but not listed in route registries | Creator program/product surface decision | P3 | Desktop Agent |
| `/countries` | Exists | Inline `CountriesPage` | Basic static country index | Cinematic country discovery/index | P2 | Desktop Agent |
| `/countries/:slug` | Exists, alias | Redirects to `/country/:slug` | Alias only | Keep redirect/canonical route handling | P3 | Cloud Agent |
| `/countries/:slug/:city` | Exists, alias | Redirects to `/city/:city` when valid | Alias only | Keep redirect/canonical route handling | P3 | Cloud Agent |
| `/country/:slug` | Exists | `CountryPreviewExperience` | Cinematic country page, but repeated nav and cards | Country overview with data-backed planning modules | P1 | Desktop Agent |
| `/country/:slug/cuisine` | Exists | `CountrySubpageExperience(kind="cuisine")` | Shared generic subpage template | Distinct cuisine UI with dishes, neighborhoods, filters | P2 | Desktop Agent |
| `/country/:slug/beverages` | Exists | `CountrySubpageExperience(kind="beverages")` | Shared generic subpage template | Distinct beverage/nightlife/local etiquette UI | P3 | Desktop Agent |
| `/country/:slug/famous-for` | Exists | `CountrySubpageExperience(kind="famous-for")` | Shared generic subpage template | Distinct highlights/identity page | P3 | Desktop Agent |
| `/country/:slug/itinerary` | Exists | `CountrySubpageExperience(kind="itinerary")` | Shared generic subpage template | Country itinerary planner/collection | P2 | Desktop Agent |
| `/country/:slug/language` | Exists, alias-like | `CountrySubpageExperience(kind="languages")` | Singular duplicates plural route | Canonicalize singular/plural language route | P3 | Cloud Agent |
| `/country/:slug/languages` | Exists | `CountrySubpageExperience(kind="languages")` | Generic shared language page | Phrasebook and language intelligence page | P2 | Desktop Agent |
| `/cities` | Exists | Inline `CitiesPage` | Basic static city index | Cinematic city discovery/index | P2 | Desktop Agent |
| `/cities/:slug` | Exists, alias | Redirects to `/city/:slug` | Alias only | Keep redirect/canonical route handling | P3 | Cloud Agent |
| `/city/:slug` | Exists | `CityDestinationPage` for rich data, `PlacePreviewExperience`/Vietnam variants elsewhere | Mixed city page implementations by data source | One canonical city shell with modules and route-aware CTAs | P1 | Desktop Agent |
| `/city/:slug/apps` | Exists | `VietnamCityDetailPage(kind="apps")` or `PageHero` fallback | Vietnam routes use special template; non-Vietnam fallback is static | City app guide with real app/payment/local mode data | P2 | Desktop Agent |
| `/city/:slug/arrival` | Exists | `VietnamCityDetailPage(kind="arrival")` or fallback arrival UI | Mixed implementation | Arrival intelligence page | P2 | Desktop Agent |
| `/city/:slug/attractions` | Exists | `VietnamCityDetailPage(kind="attractions")` or attraction list | Mixed implementation; static filters | Attraction discovery with filters/map/detail links | P1 | Desktop Agent |
| `/city/:slug/attractions/:attraction` | Exists | Inline attraction detail | Static detail with affiliate CTAs | Data-backed attraction detail | P2 | Desktop Agent |
| `/city/:slug/calendar` | Exists | `VietnamCityDetailPage(kind="calendar")` or fallback calendar | Mixed implementation | Events/seasonality calendar | P2 | Desktop Agent |
| `/city/:slug/connectivity` | Exists | `VietnamCityDetailPage(kind="connectivity")` or fallback connectivity | Mixed implementation | Connectivity/eSIM/local comms page | P2 | Desktop Agent |
| `/city/:slug/costs` | Exists | `VietnamCityDetailPage(kind="costs")` or `CostTable` fallback | Mixed implementation | Live cost planner tied to budget/currency | P2 | Desktop Agent |
| `/city/:slug/culture` | Exists | `VietnamCityDetailPage(kind="culture")` or fallback culture UI | Mixed implementation | City culture/etiquette intelligence | P2 | Desktop Agent |
| `/city/:slug/emergency` | Exists | `VietnamCityDetailPage(kind="emergency")` or emergency fallback | Mixed implementation | Emergency and safety command page | P2 | Desktop Agent |
| `/city/:slug/good-to-know` | Exists | `VietnamCityDetailPage(kind="good-to-know")` or fallback page | Mixed implementation; anchor-only category nav | Essentials page with structured sections | P2 | Desktop Agent |
| `/city/:slug/health-safety` | Exists | `VietnamCityDetailPage(kind="health-safety")` or safety fallback | Mixed implementation | Health/safety intelligence page | P1 | Desktop Agent |
| `/city/:slug/hidden-gems` | Exists | `VietnamCityDetailPage(kind="hidden-gems")` or hidden gems list | Mixed implementation | Hidden-gem discovery with map/detail pages | P2 | Desktop Agent |
| `/city/:slug/hidden-gems/:gem` | Exists | `ExperienceDetailBookingPage` | Hidden gem detail uses booking/experience page | Own hidden-gem detail or canonical experience detail | P2 | Desktop Agent |
| `/city/:slug/hotels` | Exists | `VietnamCityDetailPage(kind="hotels")` or hotel list | Mixed implementation; affiliate-heavy static UI | Stay neighborhood/hotel intelligence | P1 | Desktop Agent |
| `/city/:slug/itinerary` | Exists | `VietnamCityDetailPage(kind="itinerary")`, `JapanTripPlanner`, or fallback | Mixed implementation | City itinerary builder/list | P1 | Desktop Agent |
| `/city/:slug/itinerary/:template` | Exists | `CityItineraryDayDetail` or fallback template | Template/day route mixed together | Day/template detail route with canonical model | P2 | Cloud Agent |
| `/city/:slug/kids` | Exists | `VietnamCityDetailPage(kind="kids")` or family fallback | Mixed implementation | Family/kids planning page | P3 | Desktop Agent |
| `/city/:slug/nearby` | Exists | `VietnamCityDetailPage(kind="nearby")` or `NearbyRouteCard` list | Mixed implementation | Nearby trips and transport planner | P2 | Desktop Agent |
| `/city/:slug/neighborhoods` | Exists | `VietnamCityDetailPage(kind="neighborhoods")` or neighborhood grid | Mixed implementation | Neighborhood chooser with map/comparison | P1 | Desktop Agent |
| `/city/:slug/neighborhoods/:neighborhood` | Exists | Inline neighborhood detail | Static local detail | Neighborhood detail page with stays/restaurants/safety | P2 | Desktop Agent |
| `/city/:slug/nightlife` | Exists | `VietnamCityDetailPage(kind="nightlife")` or nightlife fallback | Mixed implementation | Nightlife planner with safety/transport context | P3 | Desktop Agent |
| `/city/:slug/packing` | Exists | `VietnamCityDetailPage(kind="packing")` or `PackingPlanner` | Mixed implementation | Weather/trip-aware packing tool | P2 | Desktop Agent |
| `/city/:slug/payments` | Exists | Payment fallback UI | Not in `routes.citySection` examples but linked indirectly | Payments/cash/cards local intelligence | P2 | Desktop Agent |
| `/city/:slug/restaurants` | Exists | `VietnamCityDetailPage(kind="restaurants")` or restaurant list | Mixed implementation; static filters | Restaurant discovery with booking/details | P1 | Desktop Agent |
| `/city/:slug/restaurants/:restaurant` | Exists | Inline restaurant detail | Static local detail | Restaurant detail with booking/menu/neighborhood links | P2 | Desktop Agent |
| `/city/:slug/shopping` | Exists | `VietnamCityDetailPage(kind="shopping")` or shopping UI | Mixed implementation; anchor categories | Shopping/market guide | P3 | Desktop Agent |
| `/city/:slug/tipping` | Exists | `VietnamCityDetailPage(kind="tipping")` or tipping fallback | Mixed implementation | Tipping etiquette calculator/guide | P3 | Desktop Agent |
| `/city/:slug/transit` | Exists | `VietnamCityDetailPage(kind="transit")` or transit cards | Mixed implementation | Transit planner with routes/fares/local rules | P1 | Desktop Agent |
| `/city/:slug/visa` | Exists | `VietnamCityDetailPage(kind="visa")` or visa picker | Mixed implementation | Visa requirements scoped to destination | P2 | Desktop Agent |
| `/city/:slug/weather` | Exists | `VietnamCityDetailPage(kind="weather")` or `MonthGrid` | Mixed implementation | Month/date weather intelligence | P2 | Desktop Agent |
| `/city/:slug/wellness` | Exists | `VietnamCityDetailPage(kind="wellness")` or wellness fallback | Mixed implementation | Wellness/spa/health planning page | P3 | Desktop Agent |
| `/destination/kyoto` | Exists, alias-like | `CityDestinationPage(KYOTO_CITY_DESTINATION)` | Legacy singular destination route | Redirect/canonicalize to `/city/kyoto` if appropriate | P3 | Cloud Agent |
| `/destinations/japan/kyoto` | Exists, alias-like | `CityDestinationPage(KYOTO_CITY_DESTINATION)` | Legacy nested destination route | Redirect/canonicalize to `/city/kyoto` if appropriate | P3 | Cloud Agent |
| `/legal/privacy` | Exists | Inline legal page | Static legal content | Keep legal canonical page | P3 | Cloud Agent |
| `/privacy-policy` | Exists, alias | Re-export of `/legal/privacy` | Top-level alias used by consent banner | Keep alias or change banner to canonical legal route | P3 | Cloud Agent |
| `/legal/terms` | Exists | Inline legal page | Static legal content | Keep legal canonical page | P3 | Cloud Agent |
| `/legal/affiliate-disclosure` | Exists | Inline legal page | Static legal content | Keep legal canonical page | P3 | Cloud Agent |
| `/affiliate-disclosure` | Exists, alias | Re-export of `/legal/affiliate-disclosure` | Top-level alias used by consent banner | Keep alias or change banner to canonical legal route | P3 | Cloud Agent |
| `/internal/field-notes` | Exists | `FieldNotesCapture` | Internal capture UI exposed under app route | Decide protection/internal access | P3 | Cloud Agent |
| `/internal/mobile-travel` | Exists | `MobileTravelMode` | Internal mobile field tool; some shortcut links point to generic city page instead of specific sections | Protect and repair shortcuts if retained | P3 | Cloud Agent |

## Missing Navigation-Listed Routes

No hard missing routes were found for `primaryNavigation`, `mainNavigation`, `NAVIGATION_HREFS`, or `siteDirectory`. The problem is not 404s from those registries; it is aliasing, duplicate canonical routes, wrong-page rendering, and static-only product surfaces.

## Aliases And Placeholders

| Route | Alias target/current behavior | Risk | Priority | Recommended agent |
|---|---|---|---|---|
| `/journey-builder` | Re-exports `/trips` | Wrong product surface | P0 | Desktop Agent |
| `/activity-feed` | Re-exports `/activity` | Duplicate surface | P3 | Cloud Agent |
| `/collaboration` | Re-exports `/trip-collaboration` | Global vs trip-scoped ambiguity | P2 | Cloud Agent |
| `/community-ideas` | Re-exports `/suggestions` | Duplicate surface | P3 | Cloud Agent |
| `/confirmation` | Re-exports `/booking/confirmation` | Duplicate checkout confirmation | P3 | Cloud Agent |
| `/offline-maps` | Re-exports `/offline` | Duplicate/offline map ambiguity | P3 | Cloud Agent |
| `/rail` | Re-exports `/rail-journeys` | Duplicate rail mode | P3 | Cloud Agent |
| `/privacy-policy` | Re-exports `/legal/privacy` | Consent banner uses alias | P3 | Cloud Agent |
| `/affiliate-disclosure` | Re-exports `/legal/affiliate-disclosure` | Consent banner uses alias | P3 | Cloud Agent |
| `/countries/:slug` | Redirects to `/country/:slug` | Canonical country duplication | P3 | Cloud Agent |
| `/countries/:slug/:city` | Redirects to `/city/:city` | Canonical city duplication | P3 | Cloud Agent |
| `/cities/:slug` | Redirects to `/city/:slug` | Canonical city duplication | P3 | Cloud Agent |
| `/experiences/:slug` | Redirects one known slug to `/activities/:slug` | Experience/activity taxonomy unclear | P2 | Cloud Agent |
| `/country/:slug/language` | Renders same as `/country/:slug/languages` | Singular/plural duplicate | P3 | Cloud Agent |

## Wrong Page Or Wrong Target Findings

| Finding | Evidence | Required future UI | Priority | Recommended agent |
|---|---|---|---|---|
| Journey Builder renders Trips | `app/journey-builder/page.tsx` re-exports `app/trips/page.tsx`; `components/trips/JourneyBuilderPage.tsx` is unused | Build route-native Journey Builder page | P0 | Desktop Agent |
| Discover navigation target is inconsistent | `NAVIGATION_HREFS.Discover` points to `/explore`, but `/discover` exists and renders the same component | Canonicalize Explore/Discover IA | P1 | Cloud Agent |
| Hidden gem detail uses booking component | `/city/:slug/hidden-gems/:gem` renders `ExperienceDetailBookingPage` | Decide if hidden gems are experience details or editorial place details | P2 | Desktop Agent |
| Global Collaboration route renders trip-scoped collaboration | `/collaboration` re-exports `/trip-collaboration` | Separate global collaboration from trip collaboration or canonicalize | P2 | Cloud Agent |
| Offline Maps route renders general Offline page | `/offline-maps` re-exports `/offline` | Map-specific offline view or canonical route | P3 | Cloud Agent |
| Rail route renders Rail Journeys | `/rail` re-exports `/rail-journeys` | Rail overview vs journey planner decision | P3 | Cloud Agent |

## Static-Only UI Findings

Static-only pages are suitable as visual prototypes but should not be considered complete product surfaces. The main static-only product pages are:

- `/journey-builder`, `/trips`, `/stays`, `/flights`, `/booking`, `/booking/confirmation`, `/budget`, `/currency`, `/weather`, `/visa`, `/alerts`, `/offline`, `/guides`, `/journal`, `/profile`, `/settings`, `/reviews`, `/support`, `/concierge`, `/documents`, `/culture`, `/rail-journeys`, `/aurora`, `/expeditions`, `/yachts`, `/activity`, `/trip-collaboration`, `/suggestions`, `/experiences`.
- Most city/country subpages use static seeded data, shared templates, or mixed Vietnam/non-Vietnam fallbacks. These are real routes but not complete product surfaces.

## Broken Or Dead Link Findings

| Location/pattern | Current behavior | Problem | Priority | Recommended agent |
|---|---|---|---|---|
| `components/trips/MyTripsPage.tsx` side nav | Inactive sidebar items use `href="#"` | Dead local links for Daily Notes, Photos, Maps, Archive | P1 | Desktop Agent |
| Many product pages | Anchor CTAs like `#featured-guides`, `#tools`, `#stories`, `#creators`, `#moods` | Valid in-page anchors when sections exist, but not true route/product actions | P3 | Desktop Agent |
| `components/internal/MobileTravelMode.tsx` shortcuts | Apps/Payments/Transport buttons point to `/city/${city.slug}` instead of section routes | Shortcut labels do not open matching sections | P2 | Cloud Agent |
| Consent banner | Uses `/privacy-policy` and `/affiliate-disclosure` aliases | Works, but bypasses canonical `/legal/*` routes | P3 | Cloud Agent |
| `components/home/CinematicDiscovery.tsx` | Links `/city/tokyo` | Route exists dynamically if Tokyo is valid data, but it is not listed in city static params alias list | Verify canonical city inventory and generated params | P3 | Cloud Agent |

## Repeated UI Code Findings

| Repeated surface | Current locations | Problem | Required future UI | Priority | Recommended agent |
|---|---|---|---|---|---|
| Top navigation | `app/budget`, `app/currency`, `app/flights`, `app/stays`, `app/settings`, `app/booking`, `app/expeditions`, `app/rail-journeys`, `app/yachts`, plus many component pages | Nav arrays and shell markup are duplicated and vary by page | Shared responsive product shell using route registries | P1 | Cloud Agent |
| Sidebars | Trips, Journal, Reviews, Booking, Budget, Currency, Weather, Offline, Collaboration, Culture, Yachts, Expeditions, Rail | Layout logic and visual shell repeated | Shared sidebar primitives with route-specific content slots | P1 | Cloud Agent |
| Filters | Stays, Flights, Reviews, Journal, Restaurants, Attractions, Guides, Trips | Filter controls are mostly static and reimplemented | Shared filter primitives and route state conventions | P1 | Cloud Agent |
| Cards | Stay, trip, review, guide, city, country, restaurant, attraction, booking, alert cards | Repeated card styling and behavior | Product card system with variants | P2 | Cloud Agent |
| Search bars | Explore, Guides, Reviews, Trips, Stays, Flights, Currency, Weather and shell pages | Mostly visual only, inconsistent placeholders and behavior | Shared search input tied to route/query state | P2 | Cloud Agent |
| App shell/backgrounds | Product pages define their own full-screen background/nav/grid shell | Hard to maintain; inconsistent breakpoints | Shared cinematic shell tokens and layout primitives | P1 | Cloud Agent |

## Pages Needing Their Own Cinematic UI

P0/P1 pages that should be built before adding any new pages:

1. `/journey-builder` - must stop rendering Trips and become the central planning workspace.
2. `/trips` - trip dashboard, saved/active trips, itinerary entry points.
3. `/stays` - stay discovery/search with filters and city handoff.
4. `/explore` or `/discover` - canonical discovery surface decision and implementation.
5. `/atlas` - map mode as a core planning surface.
6. `/city/:slug` - canonical city shell and module hub.
7. `/city/:slug/itinerary` - city itinerary planner/list that feeds Journey Builder.
8. `/city/:slug/neighborhoods` - neighborhood chooser, comparison, and stay handoff.
9. `/city/:slug/restaurants` - restaurant discovery and detail handoff.
10. `/budget` - trip budget planning tied to currency, stays, flights, and itinerary.

## Priority Legend

- P0: Blocks core product identity or currently renders the wrong page.
- P1: Core navigation/product surface needed before expanding UI.
- P2: Important supporting surface or canonicalization.
- P3: Alias, internal, legal, or niche mode cleanup.

