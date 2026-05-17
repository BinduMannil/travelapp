# Journee Shared UI Extraction Plan

Planning audit and initial extraction pass. The first shared primitives have been introduced and applied to the Journey Builder and Trips surfaces only.

## Summary

Journee has several repeated UI systems that are good candidates for future shared extraction. The highest duplication is in cinematic product pages that each define their own top navigation, search capsule, glass panels, filters, sidebars, hero sections, and image cards. City subpages already use `PageHero`, and some discovery/search pages already use `CinematicBackground`, so the safest future work is to standardize around these existing primitives before introducing larger app shells.

## Extraction Priorities

| Priority | Candidate | Recommended Shared Name | Dependency Risk | Why |
| --- | --- | --- | --- | --- |
| P0 | Fixed cinematic top nav with logo, nav links, search, notification, avatar, mobile menu | `CinematicTopNav` | Medium | Widely duplicated with small breakpoint/search differences. High visual consistency payoff. |
| P0 | Glass panel/card wrapper | `JourneeGlassPanel` | Low | Same border, blur, dark background, shadow pattern appears across many pages. Easy incremental adoption. |
| P0 | Filter groups, chips, mobile filter drawer | `FilterPanel`, `FilterGroup`, `FilterChip`, `MobileFilterDrawer` | Medium | Repeated in search, explore, stays, flights, reviews, guides. Behavior differs enough to require flexible props. |
| P1 | App/page shell grid with left rail, main content, right sidebar | `CinematicDashboardShell` | High | Repeated structure, but each page has unique density, breakpoints, and sidebars. Extract after nav/panel/filter primitives. |
| P1 | Cinematic page background with fixed radial gradients and image overlay | `CinematicPageBackground` | Medium | Existing `CinematicBackground` covers some cases, but many pages hand-roll gradient-only backgrounds. |
| P1 | Hero with background image, overlay, eyebrow, Playfair heading, CTA area | `CinematicHeroSection` | Medium | Repeated on marketplace pages; city subpages already use `PageHero`, so this should complement not replace it. |
| P1 | Destination/trip/stay/flight image cards | `ImageStoryCard`, `TripSummaryCard`, `ResultCard` | Medium | Similar visual treatment, but data models vary. Extract presentational shells first. |
| P2 | Status badges and stat cards | `StatusBadge`, `MetricCard` | Low | Small repeated atoms; useful but less urgent than shell/filter/nav. |
| P2 | Sidebar section patterns | `SidebarPanel`, `SidebarList`, `InsightRail` | Medium | Many right rails share structure but not content. Extract after `JourneeGlassPanel`. |

## Component Candidates

### 1. Top Navigation

**Repeated pattern**

Fixed top header with:
- Journee logo/wordmark
- `MainNavLink` mapped over local `navItems`
- rounded search capsule or search form
- notification button
- avatar image
- mobile menu button

**Current duplicate locations**

- `app/flights/page.tsx` (`TopNavigation`)
- `app/stays/page.tsx` (`TopNavigation`)
- `app/budget/page.tsx` (`TopNavigation`)
- `app/booking/page.tsx` (`TopNavigation`)
- `app/currency/page.tsx` (`TopNavigation`)
- `app/settings/page.tsx` (`TopNavigation`)
- `components/search/SearchResultsPage.tsx` (`TopNavigation`)
- `components/explore/ExploreDiscoveryPage.tsx` (`TopNavigation`)
- `components/activity/ActivityFeedPage.tsx` (`TopNavigation`)
- `components/alerts/NotificationsAlertsPage.tsx` (`TopNavigation`)
- `components/admin/AdminControlCenter.tsx` (`TopNavigation`)
- `components/collaboration/TripCollaborationPage.tsx` (`TopNavigation`)
- `components/documents/TravelRecordsPage.tsx` (`TopNavigation`)
- `components/onboarding/JourneeOnboardingPage.tsx` (`TopNavigation`)
- `components/support/JourneeSupportPage.tsx` (`TopNavigation`)
- `components/weather/WeatherSeasonsPage.tsx` (`TopNavigation`)
- `components/experience/ExperienceDetailBookingPage.tsx` (`TopNavigation`)

**Recommended shared component**

`components/layout/CinematicTopNav.tsx`

Suggested props:
- `items`
- `activeHref` or current route derived internally
- `searchPlaceholder`
- `searchValue`
- `onSearchChange`
- `onSearchSubmit`
- `notificationCount`
- `avatarSrc`
- `mobileMenuMode`
- `breakpoint`

**Extraction priority**

P0. Extract first as a wrapper around existing `MainNavLink`.

**Dependency risk**

Medium. Pages differ in breakpoint (`lg`, `xl`, `2xl`), search behavior, and icon/avatar details. Start with read-only search capsule and optional controlled search form.

**Pages affected**

Flights, stays, budget, booking, currency, settings, search, explore, activity feed, alerts, admin, collaboration, documents, onboarding, support, weather, experience detail.

### 2. Page Shell Layouts

**Repeated pattern**

Many pages use:
- fixed cinematic background
- top nav
- `pt-24`
- centered max-width content
- optional left sidebar
- main content column
- optional right sidebar
- sticky sidebars at `top-24`

**Current duplicate locations**

- `app/flights/page.tsx`
- `app/stays/page.tsx`
- `app/budget/page.tsx`
- `components/explore/ExploreDiscoveryPage.tsx`
- `components/search/SearchResultsPage.tsx`
- `components/alerts/NotificationsAlertsPage.tsx`
- `components/activity/ActivityFeedPage.tsx`
- `components/admin/AdminControlCenter.tsx`
- `components/collaboration/TripCollaborationPage.tsx`
- `components/onboarding/JourneeOnboardingPage.tsx`
- `components/documents/TravelRecordsPage.tsx`
- `components/guides/TravelIntelligencePage.tsx`
- `components/support/JourneeSupportPage.tsx`
- `app/settings/page.tsx`

Existing related primitives:
- `components/layout/AppContentFrame.tsx`
- `components/destinations/DestinationPageFrame.tsx`

**Recommended shared component**

`components/layout/CinematicDashboardShell.tsx`

Suggested slots:
- `topNav`
- `leftRail`
- `main`
- `rightRail`
- `mobileOverlay`
- `background`

**Extraction priority**

P1. Build after `CinematicTopNav`, `JourneeGlassPanel`, and filter primitives are stable.

**Dependency risk**

High. Page grids differ by product type, and premature shell extraction could fight custom layouts. Use slot-based composition rather than hard-coded dashboards.

**Pages affected**

Flights, stays, budget, explore, search, alerts, activity, admin, collaboration, onboarding, documents, guides, support, settings.

### 3. Search Bars

**Repeated pattern**

Rounded pill search UI with a search icon, placeholder, white/gold border, glass background, and optional real input behavior.

**Current duplicate locations**

- `app/flights/page.tsx`
- `app/stays/page.tsx`
- `app/budget/page.tsx`
- `components/search/SearchResultsPage.tsx`
- `components/explore/ExploreDiscoveryPage.tsx`
- `components/admin/AdminControlCenter.tsx`
- `components/alerts/NotificationsAlertsPage.tsx`
- `components/home/JourneeWebExperience.tsx` (`HeroSearchBar`)
- `components/search/SearchSuggestions.tsx`

**Recommended shared components**

- `TopNavSearch`
- `HeroSearchBar`
- `SearchSuggestionList`

**Extraction priority**

P0 for top nav search, P1 for hero search/suggestions.

**Dependency risk**

Medium. Some current instances are static placeholders, while search results has a controlled form. Define controlled and read-only modes explicitly.

**Pages affected**

Flights, stays, budget, search, explore, admin, alerts, home.

### 4. Filter Systems

**Repeated pattern**

Filter panels include:
- sticky desktop filter rail
- filter blocks/groups
- checkbox rows
- chip toggles
- slider-like visual ranges
- mobile filter button/drawer
- apply/clear actions

**Current duplicate locations**

- `app/flights/page.tsx` (`FiltersPanel`, `FilterBlock`, `MobileFilters`)
- `app/stays/page.tsx` (`FiltersPanel`, `FilterBlock`, `MobileFilters`)
- `components/explore/ExploreDiscoveryPage.tsx` (`FiltersPanel`, `MobileFilterChips`)
- `components/search/SearchResultsPage.tsx` (`FiltersPanel`, `FilterGroup`, `SearchToolbar`)
- `components/reviews/ReviewsRatingsPage.tsx` (`FiltersPanel`, `MobileFilterChips`)
- `components/guides/TravelIntelligencePage.tsx` (`MobileFilterChips`)
- `app/city/[slug]/restaurants/page.tsx` (`RestaurantFilters`)
- `components/attraction/CategoryTabs.tsx`

**Recommended shared components**

- `FilterPanel`
- `FilterGroup`
- `FilterOptionRow`
- `FilterChip`
- `FilterRangePreview`
- `MobileFilterDrawer`
- `SegmentedTabs`

**Extraction priority**

P0. This is one of the clearest duplication clusters.

**Dependency risk**

Medium. Filter state is page-specific and some pages use URL search params. Shared components should be controlled/presentational and not own routing initially.

**Pages affected**

Flights, stays, explore, search, reviews, guides, restaurants, attractions.

### 5. Sidebars and Rails

**Repeated pattern**

Left and right sidebars use glass panels, sticky positioning, section headers, compact lists, summary cards, and CTA panels.

**Current duplicate locations**

- `components/activity/ActivityFeedPage.tsx` (`LeftSidebar`, `RightSidebar`)
- `components/alerts/NotificationsAlertsPage.tsx` (`LeftSidebar`, `RightSidebar`)
- `components/admin/AdminControlCenter.tsx` (`LeftSidebar`, `RightSidebar`)
- `components/collaboration/TripCollaborationPage.tsx` (`LeftSidebar`, `RightSidebar`)
- `components/onboarding/JourneeOnboardingPage.tsx` (`LeftSidebar`, `RightSidebar`)
- `components/guides/TravelIntelligencePage.tsx` (`LeftSidebar`, `RightSidebar`)
- `components/search/SearchResultsPage.tsx` (`RightSidebar`)
- `components/explore/ExploreDiscoveryPage.tsx` (`RightSidebar`)
- `components/visa/VisaEntryRequirementsPage.tsx` (`RightSidebar`)
- `components/support/JourneeSupportPage.tsx` (`RightSidebar`)
- `app/flights/page.tsx` (`RightSidebar`)
- `app/stays/page.tsx` (`RightSidebar`)
- `app/budget/page.tsx` (`TripSidebar`)
- `app/settings/page.tsx` (`LeftSidebar`, `RightSidebar`)

**Recommended shared components**

- `SidebarRail`
- `SidebarPanel`
- `SidebarSectionHeader`
- `SidebarListItem`
- `CompactInsightCard`

**Extraction priority**

P1. Extract panel/list primitives first, then consider whole sidebar rails.

**Dependency risk**

Medium. Content is highly page-specific, but structure and styling are reusable.

**Pages affected**

Activity, alerts, admin, collaboration, onboarding, guides, search, explore, visa, support, flights, stays, budget, settings.

### 6. Card Systems

**Repeated pattern**

Image-forward cards with:
- rounded borders
- `Image`/background image
- dark gradient overlay
- gold label/eyebrow
- Playfair heading
- hover lift/scale
- status badge or CTA

**Current duplicate locations**

- `components/trips/MyTripsPage.tsx` (`TripCard`)
- `components/journey-builder/JourneyBuilderPage.tsx` preview/draft cards
- `components/profile/ProfileSavedPlacesPage.tsx` (`TripCard`)
- `components/guides/TravelIntelligencePage.tsx` (`DestinationCard`)
- `components/explore/ExploreDiscoveryPage.tsx` destination/category cards
- `components/home/NearbyStack.tsx` (`DestinationCard`)
- `components/beverages/BeverageCard.tsx`
- `components/cuisine/DishCard.tsx`
- `components/attraction/AttractionCard.tsx`
- `components/restaurant/RestaurantCard.tsx`
- `app/city/[slug]/hotels/page.tsx` hotel cards
- `app/city/[slug]/hidden-gems/page.tsx` gem cards
- `app/city/[slug]/neighborhoods/page.tsx` neighborhood cards
- `app/flights/page.tsx` flight result cards
- `app/stays/page.tsx` stay result cards

Existing related primitives:
- `components/common/ImageCarousel.tsx`
- `components/common/CoverTile.tsx`

**Recommended shared components**

- `ImageStoryCard`
- `ResultCardShell`
- `TripSummaryCard`
- `PlaceCard`
- `StatusBadge`

**Extraction priority**

P1. Start with presentational shells and badge atoms. Avoid forcing flights/stays/trips into one rigid data model.

**Dependency risk**

Medium. Cards are visually similar but semantically different. Good extraction should separate layout shell from content slots.

**Pages affected**

Trips, journey builder, profile, guides, explore, home, city hotels, hidden gems, neighborhoods, flights, stays, restaurants, attractions, cuisine, beverages.

### 7. Cinematic Background Structures

**Repeated pattern**

Pages hand-roll fixed radial gradients, dark linear gradients, image overlays, drift effects, and bottom fades.

**Current duplicate locations**

- `components/visual/CinematicBackground.tsx` already exists
- `components/home/JourneeWebExperience.tsx`
- `components/home/CinematicDiscovery.tsx`
- `components/explore/ExploreDiscoveryPage.tsx`
- `components/search/SearchResultsPage.tsx`
- `components/atlas/AtlasMapPage.tsx`
- `components/city/CityDestinationPage.tsx`
- `components/journey-builder/JourneyBuilderPage.tsx`
- `components/trips/MyTripsPage.tsx`
- `app/flights/page.tsx`
- `app/stays/page.tsx`
- `app/budget/page.tsx`
- `app/currency/page.tsx`
- `app/booking/page.tsx`
- `app/settings/page.tsx`
- `components/activity/ActivityFeedPage.tsx`
- `components/admin/AdminControlCenter.tsx`
- `components/alerts/NotificationsAlertsPage.tsx`
- `components/collaboration/TripCollaborationPage.tsx`
- `components/onboarding/JourneeOnboardingPage.tsx`
- `components/documents/TravelRecordsPage.tsx`
- `components/support/JourneeSupportPage.tsx`

**Recommended shared component**

`CinematicPageBackground`

Suggested variants:
- `image`
- `gradientOnly`
- `map`
- `dashboard`
- `editorial`
- `heroFade`

**Extraction priority**

P1.

**Dependency risk**

Medium. `CinematicBackground` currently uses `<img>` and absolute positioning. Future wrapper should support fixed/absolute modes, custom overlay classes, and optional `next/image`.

**Pages affected**

Home, explore, search, atlas, city destination, journey builder, trips, flights, stays, budget, currency, booking, settings, activity, admin, alerts, collaboration, onboarding, documents, support.

### 8. Hero Sections

**Repeated pattern**

Large cinematic hero sections with:
- background image
- dark overlay
- eyebrow
- Playfair heading
- lede
- CTA or stat chips

**Current duplicate locations**

- `components/layout/PageHero.tsx` already handles city/country subpages
- `app/flights/page.tsx` (`HeroBanner`)
- `app/stays/page.tsx` (`HeroBanner`)
- `app/currency/page.tsx` (`HeroBanner`)
- `components/explore/ExploreDiscoveryPage.tsx` (`HeroBanner`)
- `components/weather/WeatherSeasonsPage.tsx` (`HeroWeather`)
- `components/support/JourneeSupportPage.tsx` (`HeroHelpCenter`)
- `components/experience/ExperienceDetailBookingPage.tsx` (`HeroSummary`)
- `components/culture/CultureEnginePage.tsx` (`Hero`)
- `app/rail-journeys/page.tsx` (`Hero`)
- `app/expeditions/page.tsx` (`Hero`)
- `app/yachts/page.tsx` (`HeroSection`)
- `components/journey-builder/JourneyBuilderPage.tsx` cinematic hero
- `components/trips/MyTripsPage.tsx` dashboard hero

**Recommended shared components**

- Keep `PageHero` for city/country internal guide pages.
- Add `CinematicHeroSection` for product/workspace pages.
- Add `HeroStatStrip` for repeated chip/stat rows.

**Extraction priority**

P1.

**Dependency risk**

Medium. City guide hero logic includes destination atmosphere/image rotation. Product heroes should not inherit that complexity.

**Pages affected**

Flights, stays, currency, explore, weather, support, experience detail, culture, rail journeys, expeditions, yachts, journey builder, trips.

### 9. Tabs and Segmented Controls

**Repeated pattern**

Horizontal tab rows and segmented pills with active underline/background.

**Current duplicate locations**

- `components/trips/MyTripsPage.tsx`
- `components/journey-builder/JourneyBuilderPage.tsx`
- `components/search/SearchResultsPage.tsx`
- `components/admin/AdminControlCenter.tsx`
- `components/visa/VisaEntryRequirementsPage.tsx`
- `components/offline/OfflineAccessPage.tsx`
- `components/culture/CultureEnginePage.tsx`
- `components/experience/ExperienceDetailBookingPage.tsx`
- `components/attraction/CategoryTabs.tsx`
- `app/city/[slug]/attractions/page.tsx`

**Recommended shared component**

`SegmentedTabs`

Suggested props:
- `items`
- `value`
- `onChange`
- `variant`: `underline | pill | glass`
- `overflow`: `wrap | scroll`
- `count`

**Extraction priority**

P0/P1. Small and high leverage, especially for filters.

**Dependency risk**

Low to medium. Need support for both button state and link/URL-param tabs.

**Pages affected**

Trips, journey builder, search, admin, visa, offline, culture, experience detail, attractions.

### 10. Status and Metric Cards

**Repeated pattern**

Small cards with label, value, status tint, progress bar, and optional badge.

**Current duplicate locations**

- `components/trips/MyTripsPage.tsx` trip status cards
- `components/admin/AdminControlCenter.tsx`
- `components/suggestions/SuggestionBoard.tsx` (`StatCard`)
- `components/documents/TravelRecordsPage.tsx` status cards/badges
- `components/support/JourneeSupportPage.tsx` status badges
- `components/visa/VisaEntryRequirementsPage.tsx` result/status panels
- `components/activity/ActivityFeedPage.tsx`
- `components/alerts/NotificationsAlertsPage.tsx`
- `app/budget/page.tsx`
- `app/flights/page.tsx`
- `app/stays/page.tsx`

**Recommended shared components**

- `MetricCard`
- `StatusBadge`
- `ProgressSummary`

**Extraction priority**

P2.

**Dependency risk**

Low. Keep these as small atoms with strict variants.

**Pages affected**

Trips, admin, suggestions, documents, support, visa, activity, alerts, budget, flights, stays.

## Recommended Extraction Order

1. `JourneeGlassPanel`, `StatusBadge`, and `SegmentedTabs`.
2. `CinematicTopNav` plus `TopNavSearch`.
3. `FilterPanel`, `FilterGroup`, `FilterChip`, and `MobileFilterDrawer`.
4. `CinematicPageBackground`, reusing or evolving `CinematicBackground`.
5. `SidebarPanel` and `SidebarRail`.
6. `CinematicHeroSection`.
7. `ImageStoryCard` / `ResultCardShell` / `TripSummaryCard`.
8. `CinematicDashboardShell` once enough primitives are stable.

## Notes and Risks

- Avoid one mega-shell initially. The app has multiple layout families: product dashboards, marketplace/search pages, city guide pages, and immersive home/destination pages.
- Preserve `PageHero` for city/country guide pages; it has destination-specific image rotation and atmosphere logic.
- Preserve `MainNavLink` and build `CinematicTopNav` on top of it.
- Shared filter components should be controlled and presentational. URL sync, search params, and backend queries should remain page-level until patterns converge.
- Prefer slot-based card shells over hard-coded card data models.
- There is an older `components/trips/JourneyBuilderPage.tsx` that appears separate from the new dedicated `components/journey-builder/JourneyBuilderPage.tsx`. Before extraction, confirm whether the older trips component is still referenced or can be removed in a separate cleanup.

## Pages Most Affected by Future Shared Shell Work

- `app/flights/page.tsx`
- `app/stays/page.tsx`
- `app/budget/page.tsx`
- `components/search/SearchResultsPage.tsx`
- `components/explore/ExploreDiscoveryPage.tsx`
- `components/activity/ActivityFeedPage.tsx`
- `components/alerts/NotificationsAlertsPage.tsx`
- `components/admin/AdminControlCenter.tsx`
- `components/collaboration/TripCollaborationPage.tsx`
- `components/onboarding/JourneeOnboardingPage.tsx`
- `components/documents/TravelRecordsPage.tsx`
- `components/guides/TravelIntelligencePage.tsx`
- `components/support/JourneeSupportPage.tsx`
- `app/settings/page.tsx`
- `components/trips/MyTripsPage.tsx`
- `components/journey-builder/JourneyBuilderPage.tsx`
