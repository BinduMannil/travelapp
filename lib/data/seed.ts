// Thin loader for seed JSON used at render time. The Supabase-backed
// counterpart lives in db/seed/import.ts; pages can render directly from
// these files during M1 so the app works without a live database.
//
// Keep in mind: these imports are evaluated at build time on the server,
// so the JSON is bundled and refreshed on every deploy.

import tokyoClimateJson from "@/db/seed/tokyo/seasonal_climate.json";
import tokyoPriceItemsJson from "@/db/seed/tokyo/price_items.json";
import tokyoCityJson from "@/db/seed/tokyo/city.json";
import tokyoAppsJson from "@/db/seed/tokyo/must_have_apps.json";
import tokyoTransitJson from "@/db/seed/tokyo/transit_options.json";
import tokyoInterCityJson from "@/db/seed/tokyo/inter_city_routes.json";
import tokyoAttractionsJson from "@/db/seed/tokyo/attractions.json";
import tokyoRestaurantsJson from "@/db/seed/tokyo/restaurants.json";
import tokyoArrivalJson from "@/db/seed/tokyo/arrival.json";
import japanPaymentsJson from "@/db/seed/japan/payments.json";
import japanConnectivityJson from "@/db/seed/japan/connectivity.json";
import japanHealthSafetyJson from "@/db/seed/japan/health_safety.json";
import japanCultureJson from "@/db/seed/japan/culture.json";
import japanCalendarJson from "@/db/seed/japan/calendar.json";
import japanGoodToKnowJson from "@/db/seed/japan/good_to_know.json";
import japanCountryJson from "@/db/seed/japan/country.json";
import japanLanguagesJson from "@/db/seed/japan/languages.json";
import japanTippingJson from "@/db/seed/japan/tipping.json";
import japanVisaRulesJson from "@/db/seed/japan/visa_rules.json";

export type ClimateRow = {
  month: number;
  avg_high_c: number;
  avg_low_c: number;
  precip_mm: number;
  humidity_pct: number;
  season_label: "peak" | "shoulder" | "off";
  cost_index: number;
  notes: string;
};

export type PriceItem = {
  key: string;
  label: string;
  amount_minor: number;
  currency: string;
  display_order: number;
  notes?: string;
};

export type LanguageRow = {
  name: string;
  iso_639_3: string;
  role:
    | "official"
    | "national"
    | "widely_spoken"
    | "regional"
    | "minority"
    | "immigrant"
    | "sign";
  speakers_pct: number;
  script?: string;
  endangered?: boolean;
  notes?: string;
};

export type EnglishProficiency = {
  band: string;
  score: number;
  source: string;
  notes?: string;
};

export type TippingRule = {
  context: string;
  expected: boolean;
  amount_guidance: string;
  notes?: string;
};

export type VisaRequirement =
  | "visa_free"
  | "visa_required"
  | "evisa_or_visa"
  | "visa_waiver_registration";

export type VisaRule = {
  citizenship: string;
  name: string;
  requirement: VisaRequirement;
  max_stay_days?: number;
  evisa_url?: string;
  notes?: string;
};

export type VisaRuleset = {
  reviewed_at: string;
  disclaimer: string;
  official_source: string;
  rules: VisaRule[];
};

export type CitySeed = typeof tokyoCityJson;
export type CountrySeed = typeof japanCountryJson;

const CITIES: Record<string, CitySeed> = { tokyo: tokyoCityJson };
const COUNTRIES: Record<string, CountrySeed> = { japan: japanCountryJson };

const CLIMATE: Record<string, ClimateRow[]> = {
  tokyo: tokyoClimateJson as ClimateRow[],
};

const PRICE_ITEMS: Record<string, PriceItem[]> = {
  tokyo: tokyoPriceItemsJson as PriceItem[],
};

type CountryLanguagesPayload = {
  languages: LanguageRow[];
  english_proficiency: EnglishProficiency;
};

const COUNTRY_LANGUAGES: Record<string, CountryLanguagesPayload> = {
  japan: japanLanguagesJson as CountryLanguagesPayload,
};

type CountryTippingPayload = {
  summary: string;
  rules: TippingRule[];
};

const COUNTRY_TIPPING: Record<string, CountryTippingPayload> = {
  japan: japanTippingJson as CountryTippingPayload,
};

const COUNTRY_VISA_RULES: Record<string, VisaRuleset> = {
  japan: japanVisaRulesJson as VisaRuleset,
};

export type MustHaveApp = {
  name: string;
  purpose: string;
  free: boolean;
  ios_url: string | null;
  android_url: string | null;
  display_order: number;
  notes?: string;
};

export type TransitOption = {
  mode: string;
  name: string;
  recommended: boolean;
  payment_methods: string[];
  price_note: string;
  pros: string[];
  cons: string[];
  url: string | null;
  display_order: number;
};

export type InterCityMode = {
  mode: string;
  name: string;
  duration_minutes: number;
  price_min_minor: number;
  price_max_minor: number;
  currency: string;
  notes?: string;
  booking_url: string | null;
};

export type InterCityRoute = {
  dest_name: string;
  dest_slug: string;
  in_same_country: boolean;
  options: InterCityMode[];
};

const MUST_HAVE_APPS: Record<string, MustHaveApp[]> = {
  tokyo: tokyoAppsJson as MustHaveApp[],
};

const TRANSIT_OPTIONS: Record<string, TransitOption[]> = {
  tokyo: tokyoTransitJson as TransitOption[],
};

const INTER_CITY_ROUTES: Record<string, InterCityRoute[]> = {
  tokyo: tokyoInterCityJson as InterCityRoute[],
};

export type AttractionAccessibility = {
  wheelchair_accessible: boolean;
  stroller_accessible: boolean;
  hearing_loop: boolean;
  notes?: string | null;
};

export type Attraction = {
  slug: string;
  name: string;
  neighborhood: string;
  category: string;
  significance: string[];
  importance: number;
  tags: string[];
  trip_type_slugs: string[];
  cost_adult_minor: number;
  cost_child_minor: number;
  currency: string;
  duration_minutes: number;
  indoor: boolean;
  accessibility: AttractionAccessibility;
  kid_friendly: boolean;
  lgbtq_friendly: boolean;
  photography_allowed: boolean;
  dress_code: string | null;
  dress_notes: string | null;
  best_time_notes?: string | null;
  summary: string;
  description: string;
  official_url: string | null;
  reseller_urls: Record<string, string>;
  source: string;
};

const ATTRACTIONS: Record<string, Attraction[]> = {
  tokyo: tokyoAttractionsJson as Attraction[],
};

export type PriceBand = "$" | "$$" | "$$$" | "$$$$" | "$$$$$";

export type Restaurant = {
  slug: string;
  name: string;
  neighborhood: string;
  cuisine: string[];
  price_band: PriceBand;
  avg_price_per_person_minor: number;
  currency: string;
  signature_dishes: string[];
  reservation_required: boolean;
  reservations_lead_time_days: number;
  reservation_url: string | null;
  opening_hours: string;
  closed_days: string[];
  google_rating: number;
  google_review_count: number;
  tabelog_score: number | null;
  michelin_stars: number;
  bib_gourmand: boolean;
  dietary: string[];
  lgbtq_friendly: boolean;
  kid_friendly: boolean;
  wheelchair_accessible: boolean;
  notes?: string | null;
  source: string;
};

const RESTAURANTS: Record<string, Restaurant[]> = {
  tokyo: tokyoRestaurantsJson as Restaurant[],
};

// Composite popularity score used as the default sort. Blends normalised
// Google rating with log-scaled review count, Tabelog score (when present),
// and a small boost for Michelin / Bib Gourmand. Aims for a stable 0-10 scale.
export function popularityScore(r: Restaurant): number {
  const googleComponent = ((r.google_rating - 3.0) / 2.0) * 4; // 0-4 for ratings 3.0-5.0
  const reviewsComponent = Math.min(
    3,
    Math.log10(Math.max(1, r.google_review_count)) * 0.7,
  );
  const tabelogComponent = r.tabelog_score
    ? ((r.tabelog_score - 3.0) / 1.5) * 2
    : 0;
  const accoladeComponent = r.michelin_stars * 0.6 + (r.bib_gourmand ? 0.4 : 0);
  return Math.max(
    0,
    Math.min(10, googleComponent + reviewsComponent + tabelogComponent + accoladeComponent),
  );
}

// Map from city slug → country slug so city pages can look up country-level
// content (languages, tipping, visa) without a DB round-trip.
const CITY_TO_COUNTRY: Record<string, string> = { tokyo: "japan" };

export function getCity(slug: string): CitySeed | null {
  return CITIES[slug] ?? null;
}

export function getCountry(slug: string): CountrySeed | null {
  return COUNTRIES[slug] ?? null;
}

export function getCountryForCity(citySlug: string): string | null {
  return CITY_TO_COUNTRY[citySlug] ?? null;
}

export function getClimate(citySlug: string): ClimateRow[] {
  return CLIMATE[citySlug] ?? [];
}

export function getPriceItems(citySlug: string): PriceItem[] {
  return [...(PRICE_ITEMS[citySlug] ?? [])].sort(
    (a, b) => a.display_order - b.display_order,
  );
}

export function getCountryLanguages(
  countrySlug: string,
): CountryLanguagesPayload | null {
  return COUNTRY_LANGUAGES[countrySlug] ?? null;
}

export function getCountryTipping(
  countrySlug: string,
): CountryTippingPayload | null {
  return COUNTRY_TIPPING[countrySlug] ?? null;
}

export function getVisaRuleset(countrySlug: string): VisaRuleset | null {
  return COUNTRY_VISA_RULES[countrySlug] ?? null;
}

export function getMustHaveApps(citySlug: string): MustHaveApp[] {
  return [...(MUST_HAVE_APPS[citySlug] ?? [])].sort(
    (a, b) => a.display_order - b.display_order,
  );
}

export function getTransitOptions(citySlug: string): TransitOption[] {
  return [...(TRANSIT_OPTIONS[citySlug] ?? [])].sort(
    (a, b) => a.display_order - b.display_order,
  );
}

export function getInterCityRoutes(citySlug: string): InterCityRoute[] {
  return INTER_CITY_ROUTES[citySlug] ?? [];
}

export function getAttractions(citySlug: string): Attraction[] {
  return [...(ATTRACTIONS[citySlug] ?? [])].sort(
    (a, b) => b.importance - a.importance || a.name.localeCompare(b.name),
  );
}

export function getAttraction(
  citySlug: string,
  attractionSlug: string,
): Attraction | null {
  return (
    ATTRACTIONS[citySlug]?.find((a) => a.slug === attractionSlug) ?? null
  );
}

export const ATTRACTION_CATEGORIES: ReadonlyArray<{
  slug: string;
  label: string;
}> = [
  { slug: "religious", label: "Shrines & temples" },
  { slug: "landmark", label: "Landmarks" },
  { slug: "art", label: "Art & immersive" },
  { slug: "food", label: "Food & markets" },
  { slug: "park", label: "Parks & gardens" },
  { slug: "museum", label: "Museums" },
  { slug: "nature", label: "Nature & hikes" },
  { slug: "district", label: "Districts" },
];

export function getRestaurants(citySlug: string): Restaurant[] {
  return [...(RESTAURANTS[citySlug] ?? [])].sort(
    (a, b) => popularityScore(b) - popularityScore(a),
  );
}

export function getRestaurant(
  citySlug: string,
  restaurantSlug: string,
): Restaurant | null {
  return (
    RESTAURANTS[citySlug]?.find((r) => r.slug === restaurantSlug) ?? null
  );
}

export const CUISINE_LABELS: Record<string, string> = {
  sushi: "Sushi",
  ramen: "Ramen",
  tonkotsu: "Tonkotsu ramen",
  shio: "Shio ramen",
  shoyu: "Shoyu ramen",
  tantanmen: "Tantanmen",
  tempura: "Tempura",
  tonkatsu: "Tonkatsu",
  kaiseki: "Kaiseki",
  izakaya: "Izakaya",
  curry: "Curry",
  seafood: "Seafood",
  vegan: "Vegan",
  cafe: "Café",
  brunch: "Brunch",
  edomae: "Edomae sushi",
  japanese: "Japanese",
  innovative: "Innovative",
  michelin: "Michelin",
};

export const DIETARY_LABELS: Record<string, string> = {
  vegan: "Vegan",
  vegetarian: "Vegetarian",
  vegetarian_options: "Vegetarian options",
  vegetarian_on_request: "Vegetarian on request",
  halal: "Halal",
  kosher: "Kosher",
  gluten_free: "Gluten-free",
};

// ---------------------------------------------------------------------------
// Payments, arrival, connectivity
// ---------------------------------------------------------------------------

export type PaymentMethod = {
  key: string;
  label: string;
  accepted_level: "ubiquitous" | "common" | "limited" | "rare";
  notes?: string;
};

export type AcceptanceLevel = "yes" | "often" | "sometimes" | "rare";

export type PaymentVenue = {
  key: string;
  label: string;
  accepts: Record<string, AcceptanceLevel>;
};

export type PaymentsPayload = {
  summary: string;
  pricing_currency: string;
  methods: PaymentMethod[];
  venues: PaymentVenue[];
  atm_notes: string;
  tax_refund_note: string;
};

export type AirportTransfer = {
  mode: string;
  name: string;
  duration_minutes: number;
  price_min_minor: number;
  price_max_minor: number;
  currency: string;
  first_last_service: string;
  notes?: string;
  url?: string | null;
};

export type AirportGroup = {
  from_airport: string;
  airport_name: string;
  options: AirportTransfer[];
};

export type LuggageService = {
  kind: string;
  provider: string;
  coverage: string;
  price_from_minor: number;
  currency: string;
  notes?: string;
  url?: string | null;
};

export type AtmExchangeRow = {
  type: "atm" | "exchange";
  name: string;
  foreign_card_ok: boolean | null;
  hours: string;
  notes?: string;
  url?: string | null;
};

export type ArrivalPayload = {
  airport_transfers: AirportGroup[];
  luggage_services: LuggageService[];
  atm_exchange: AtmExchangeRow[];
};

export type PowerInfo = {
  plug_types: string[];
  voltage: number;
  frequency: string;
  converter_needed_from: string[];
  notes?: string;
};

export type ConnectivityOption = {
  option: "esim" | "physical_sim" | "pocket_wifi" | "public_wifi";
  kind: string;
  provider: string;
  plan_label: string;
  price_minor: number;
  currency: string;
  pros: string[];
  cons: string[];
  url?: string | null;
};

export type ConnectivityPayload = {
  power: PowerInfo;
  connectivity: ConnectivityOption[];
  vpn_note: string;
};

const COUNTRY_PAYMENTS: Record<string, PaymentsPayload> = {
  japan: japanPaymentsJson as PaymentsPayload,
};

const CITY_ARRIVAL: Record<string, ArrivalPayload> = {
  tokyo: tokyoArrivalJson as ArrivalPayload,
};

const COUNTRY_CONNECTIVITY: Record<string, ConnectivityPayload> = {
  japan: japanConnectivityJson as ConnectivityPayload,
};

export function getCountryPayments(countrySlug: string): PaymentsPayload | null {
  return COUNTRY_PAYMENTS[countrySlug] ?? null;
}

export function getCityArrival(citySlug: string): ArrivalPayload | null {
  return CITY_ARRIVAL[citySlug] ?? null;
}

export function getCountryConnectivity(
  countrySlug: string,
): ConnectivityPayload | null {
  return COUNTRY_CONNECTIVITY[countrySlug] ?? null;
}

// ---------------------------------------------------------------------------
// Health & safety and culture (country-level)
// ---------------------------------------------------------------------------

export type EmergencyNumber = {
  label: string;
  number: string;
  notes?: string;
};

export type Hazard = {
  type: string;
  title: string;
  body: string;
  what_to_do: string;
};

export type ProhibitedMeds = {
  summary: string;
  watchlist: string[];
  allowed_without_cert: string;
  yakkan_shoumei_note: string;
  source_url: string;
};

export type Pharmacy = {
  name: string;
  hours: string;
  notes?: string;
  url?: string | null;
};

export type Embassy = {
  country: string;
  address: string;
  phone: string;
  after_hours_phone?: string;
  url?: string;
};

export type LgbtqInfo = {
  country_legal_status: string;
  city_tolerance: string;
  tolerance_score: number;
  safe_neighborhoods: string[];
  resources: Array<{ label: string; url: string }>;
};

export type DietaryCard = {
  diet: string;
  label: string;
  jp_text: string;
  en_gloss: string;
};

export type HealthSafetyPayload = {
  reviewed_at: string;
  overview: string;
  emergency_numbers: EmergencyNumber[];
  hazards: Hazard[];
  prohibited_meds: ProhibitedMeds;
  pharmacies: Pharmacy[];
  tap_water: string;
  embassies: Embassy[];
  lgbtq: LgbtqInfo;
  dietary_cards: DietaryCard[];
  solo_notes: string;
};

export type CultureTrait = { title: string; body: string };

export type DressCode = {
  context: string;
  label: string;
  requirement: "casual" | "smart_casual" | "modest" | "formal" | "nude";
  notes: string;
};

export type Phrase = {
  category: string;
  ja: string;
  romaji: string;
  en: string;
};

export type CulturePayload = {
  people: { summary: string; traits: CultureTrait[] };
  dress_codes: DressCode[];
  phrasebook: Phrase[];
};

const COUNTRY_HEALTH_SAFETY: Record<string, HealthSafetyPayload> = {
  japan: japanHealthSafetyJson as HealthSafetyPayload,
};

const COUNTRY_CULTURE: Record<string, CulturePayload> = {
  japan: japanCultureJson as CulturePayload,
};

export function getCountryHealthSafety(
  countrySlug: string,
): HealthSafetyPayload | null {
  return COUNTRY_HEALTH_SAFETY[countrySlug] ?? null;
}

export function getCountryCulture(
  countrySlug: string,
): CulturePayload | null {
  return COUNTRY_CULTURE[countrySlug] ?? null;
}

// ---------------------------------------------------------------------------
// Calendar (holidays + festivals) and good-to-know
// ---------------------------------------------------------------------------

export type Holiday = {
  date: string;
  name: string;
  impact: "major" | "moderate" | "low";
  notes?: string;
};

export type Festival = {
  name: string;
  start_date: string;
  end_date: string;
  category: string;
  body: string;
  price_impact: "major" | "moderate" | "low";
  url?: string | null;
};

export type CalendarPayload = {
  holidays: Holiday[];
  festivals: Festival[];
};

export type GoodToKnowEntry = {
  category: string;
  title: string;
  body: string;
};

const COUNTRY_CALENDAR: Record<string, CalendarPayload> = {
  japan: japanCalendarJson as CalendarPayload,
};

const COUNTRY_GOOD_TO_KNOW: Record<string, GoodToKnowEntry[]> = {
  japan: japanGoodToKnowJson as GoodToKnowEntry[],
};

export function getCountryCalendar(
  countrySlug: string,
): CalendarPayload | null {
  return COUNTRY_CALENDAR[countrySlug] ?? null;
}

export function getCountryGoodToKnow(
  countrySlug: string,
): GoodToKnowEntry[] {
  return COUNTRY_GOOD_TO_KNOW[countrySlug] ?? [];
}

export const GOOD_TO_KNOW_CATEGORY_LABEL: Record<string, string> = {
  etiquette: "Etiquette",
  onsen: "Onsen",
  toilets: "Toilets",
  trash: "Trash & recycling",
  smoking: "Smoking",
  shopping: "Shopping & tax-free",
  addresses: "Addresses",
  transit: "Transit quirks",
  legal: "Legal & visa",
  kids: "With kids",
  accessibility: "Accessibility",
};
