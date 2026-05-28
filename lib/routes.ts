import { COUNTRY_OPTIONS, PLACE_OPTIONS, getPlaceOption } from "@/lib/destinations/countries";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export const routes = {
  home: "/",
  explore: "/explore",
  discover: "/discover",
  countries: "/countries",
  atlas: (citySlug?: string, experienceSlug?: string) => {
    const params = new URLSearchParams();
    if (citySlug) params.set("city", citySlug);
    if (experienceSlug) params.set("experience", experienceSlug);
    const query = params.toString();
    return query ? `/atlas?${query}` : "/atlas";
  },
  country: (countrySlug: string) => `/country/${countrySlug}`,
  countryAlias: (countrySlug: string) => `/countries/${countrySlug}`,
  countryCity: (countrySlug: string, citySlug: string) => `/countries/${countrySlug}/${citySlug}`,
  cities: "/cities",
  city: (citySlug: string) => `/city/${citySlug}`,
  cityAlias: (citySlug: string) => `/cities/${citySlug}`,
  citySection: (citySlug: string, sectionSlug: string) => `/city/${citySlug}/${sectionSlug}`,
  cityHiddenGem: (citySlug: string, gemSlug: string) =>
    `/city/${citySlug}/hidden-gems/${gemSlug}`,
  cityItineraryDay: (citySlug: string, daySlug: string) =>
    `/city/${citySlug}/itinerary/${daySlug}`,
  countrySection: (countrySlug: string, sectionSlug: string) => `/country/${countrySlug}/${sectionSlug}`,
  experience: (experienceSlug: string) => `/experiences/${experienceSlug}`,
  activity: (activitySlug: string) => `/activities/${activitySlug}`,
  booking: "/booking",
  confirmation: "/booking/confirmation",
} as const;

export const primaryNavigation = [
  { label: "Home", href: routes.home },
  { label: "Explore", href: routes.explore },
  { label: "Map", href: routes.atlas() },
  { label: "Trips", href: "/trips" },
  { label: "Guides", href: "/guides" },
  { label: "Journal", href: "/journal" },
  { label: "Profile", href: "/profile" },
] as const;

export const mainNavigation = [
  { label: "Home", href: routes.home },
  { label: "Explore", href: routes.explore },
  { label: "Map", href: routes.atlas() },
  { label: "Trips", href: "/trips" },
  { label: "Guides", href: "/guides" },
  { label: "Journal", href: "/journal" },
  { label: "Stays", href: "/stays" },
  { label: "Flights", href: "/flights" },
  { label: "Visa", href: "/visa" },
  { label: "Budget", href: "/budget" },
  { label: "Weather", href: "/weather" },
  { label: "Currency", href: "/currency" },
  { label: "Support", href: "/support" },
] as const;

const NAVIGATION_HREFS: Record<string, string> = {
  Home: routes.home,
  Explore: routes.explore,
  Discover: routes.explore,
  Destinations: routes.countries,
  Map: routes.atlas(),
  Atlas: routes.atlas(),
  "Journey Builder": "/journey-builder",
  Journeys: "/trips",
  Trips: "/trips",
  Guides: "/guides",
  Visa: "/visa",
  Weather: "/weather",
  Currency: "/currency",
  Budget: "/budget",
  Support: "/support",
  Alerts: "/alerts",
  Reviews: "/reviews",
  Stays: "/stays",
  Flights: "/flights",
  Experiences: "/experiences",
  Booking: routes.booking,
  Confirmation: routes.confirmation,
  Profile: "/profile",
  Journal: "/journal",
  Settings: "/settings",
  Onboarding: "/onboarding",
  Offline: "/offline",
  "Offline Maps": "/offline-maps",
  Collaboration: "/collaboration",
  "Community Ideas": "/community-ideas",
  Activity: "/activity",
  "Activity Feed": "/activity-feed",
  Admin: "/admin",
  Culture: "/culture",
  Yachts: "/yachts",
  Rail: "/rail",
  "Rail Journeys": "/rail-journeys",
  Aurora: "/aurora",
  Expeditions: "/expeditions",
  Search: "/search",
  Documents: "/documents",
  Concierge: "/concierge",
  Suggestions: "/suggestions",
  Saved: "/profile",
  Ideas: "/community-ideas",
  Airspace: "/airspace",
};

export function slugifyRouteSegment(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function navigationHref(label: string) {
  return NAVIGATION_HREFS[label] ?? `/${slugifyRouteSegment(label)}`;
}

export function isNavigationHrefActive(pathname: string, href: string) {
  if (href === routes.home) return pathname === routes.home;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getCountryCities(countrySlug: string) {
  return PLACE_OPTIONS.filter((place) => place.countrySlug === countrySlug);
}

export function getCityCountry(citySlug: string) {
  return getPlaceOption(citySlug)?.countrySlug ?? null;
}

export function isCityInCountry(countrySlug: string, citySlug: string) {
  return getPlaceOption(citySlug)?.countrySlug === countrySlug;
}

export function countryBreadcrumbs(countrySlug: string): BreadcrumbItem[] {
  const country = COUNTRY_OPTIONS.find((item) => item.slug === countrySlug);
  return [
    { label: "Home", href: routes.home },
    { label: "Countries", href: routes.countries },
    { label: country?.name ?? countrySlug },
  ];
}

export function cityBreadcrumbs(citySlug: string): BreadcrumbItem[] {
  const city = getPlaceOption(citySlug);
  const country = city ? COUNTRY_OPTIONS.find((item) => item.slug === city.countrySlug) : null;
  return [
    { label: "Home", href: routes.home },
    { label: "Countries", href: routes.countries },
    ...(country ? [{ label: country.name, href: routes.country(country.slug) }] : []),
    { label: city?.name ?? citySlug },
  ];
}

export const siteDirectory = [
  {
    title: "Core",
    links: [
      { label: "Explore", href: routes.explore },
      { label: "Atlas", href: routes.atlas() },
      { label: "Journey Builder", href: "/journey-builder" },
      { label: "Trips", href: "/trips" },
      { label: "Guides", href: "/guides" },
      { label: "Journal", href: "/journal" },
    ],
  },
  {
    title: "Travel Tools",
    links: [
      { label: "Visa", href: "/visa" },
      { label: "Weather", href: "/weather" },
      { label: "Currency", href: "/currency" },
      { label: "Budget", href: "/budget" },
      { label: "Alerts", href: "/alerts" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "Booking",
    links: [
      { label: "Stays", href: "/stays" },
      { label: "Flights", href: "/flights" },
      { label: "Experiences", href: "/experiences" },
      { label: "Booking", href: routes.booking },
      { label: "Confirmation", href: routes.confirmation },
      { label: "Reviews", href: "/reviews" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Profile", href: "/profile" },
      { label: "Settings", href: "/settings" },
      { label: "Onboarding", href: "/onboarding" },
      { label: "Collaboration", href: "/collaboration" },
      { label: "Community Ideas", href: "/community-ideas" },
      { label: "Activity Feed", href: "/activity-feed" },
    ],
  },
  {
    title: "Modes",
    links: [
      { label: "Offline Maps", href: "/offline-maps" },
      { label: "Culture", href: "/culture" },
      { label: "Yachts", href: "/yachts" },
      { label: "Rail", href: "/rail" },
      { label: "Aurora", href: "/aurora" },
      { label: "Expeditions", href: "/expeditions" },
    ],
  },
  {
    title: "Destinations",
    links: [
      { label: "Countries", href: routes.countries },
      { label: "Vietnam", href: routes.country("vietnam") },
      { label: "Japan", href: routes.country("japan") },
      { label: "Cities", href: routes.cities },
      { label: "Ho Chi Minh City", href: routes.city("ho-chi-minh-city") },
      { label: "Hanoi", href: routes.city("hanoi") },
    ],
  },
];
