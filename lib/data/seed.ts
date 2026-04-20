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
import tokyoNeighborhoodsJson from "@/db/seed/tokyo/neighborhoods.json";
import tokyoHotelsJson from "@/db/seed/tokyo/hotels.json";
import tokyoItinerariesJson from "@/db/seed/tokyo/itineraries.json";
import tokyoWellnessJson from "@/db/seed/tokyo/wellness.json";
import tokyoHiddenGemsJson from "@/db/seed/tokyo/hidden_gems.json";
import tokyoShoppingJson from "@/db/seed/tokyo/shopping.json";
import tokyoNightlifeJson from "@/db/seed/tokyo/nightlife.json";
import tokyoKidsJson from "@/db/seed/tokyo/kids.json";
import tokyoEmergencyJson from "@/db/seed/tokyo/emergency.json";
import japanCuisineJson from "@/db/seed/japan/cuisine.json";
import japanFamousForJson from "@/db/seed/japan/famous_for.json";
import japanBeveragesJson from "@/db/seed/japan/beverages.json";
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

// ---------------------------------------------------------------------------
// Neighborhoods and hotels
// ---------------------------------------------------------------------------

export type Neighborhood = {
  slug: string;
  name: string;
  vibe: string[];
  best_for: string[];
  summary: string;
  description: string;
  transit_hubs: string[];
  display_order: number;
};

export type HotelTier =
  | "capsule"
  | "hostel"
  | "business"
  | "mid_range"
  | "ryokan_style"
  | "luxury"
  | "luxury_ryokan";

export type Hotel = {
  slug: string;
  name: string;
  tier: HotelTier;
  neighborhood: string;
  price_night_min_minor: number;
  price_night_max_minor: number;
  currency: string;
  booking_url: string;
  kid_friendly: boolean;
  wheelchair_accessible: boolean;
  lgbtq_friendly: boolean;
  notes?: string;
  display_order: number;
};

const NEIGHBORHOODS: Record<string, Neighborhood[]> = {
  tokyo: tokyoNeighborhoodsJson as Neighborhood[],
};

const HOTELS: Record<string, Hotel[]> = {
  tokyo: tokyoHotelsJson as Hotel[],
};

export function getNeighborhoods(citySlug: string): Neighborhood[] {
  return [...(NEIGHBORHOODS[citySlug] ?? [])].sort(
    (a, b) => a.display_order - b.display_order,
  );
}

export function getNeighborhood(
  citySlug: string,
  neighborhoodSlug: string,
): Neighborhood | null {
  return (
    NEIGHBORHOODS[citySlug]?.find((n) => n.slug === neighborhoodSlug) ?? null
  );
}

export function getHotels(citySlug: string): Hotel[] {
  return [...(HOTELS[citySlug] ?? [])].sort(
    (a, b) => a.price_night_min_minor - b.price_night_min_minor,
  );
}

export const HOTEL_TIER_LABEL: Record<HotelTier, string> = {
  capsule: "Capsule",
  hostel: "Hostel",
  business: "Business hotel",
  mid_range: "Mid-range",
  ryokan_style: "Ryokan-style business",
  luxury: "Luxury",
  luxury_ryokan: "Luxury ryokan",
};

export const HOTEL_TIER_ORDER: HotelTier[] = [
  "hostel",
  "capsule",
  "business",
  "ryokan_style",
  "mid_range",
  "luxury",
  "luxury_ryokan",
];

// ---------------------------------------------------------------------------
// Itinerary templates
// ---------------------------------------------------------------------------

export type ItineraryBlock = {
  time: string;
  title: string;
  note?: string;
  attraction_slug?: string;
  restaurant_slug?: string;
  neighborhood_slug?: string;
};

export type ItinerarySection = {
  day: number;
  title: string;
  blocks: ItineraryBlock[];
};

export type ItineraryTemplate = {
  slug: string;
  name: string;
  days: number;
  trip_type_slugs: string[];
  best_for: string[];
  pace: string;
  summary: string;
  sections: ItinerarySection[];
};

const ITINERARIES: Record<string, ItineraryTemplate[]> = {
  tokyo: tokyoItinerariesJson as ItineraryTemplate[],
};

export function getItineraries(citySlug: string): ItineraryTemplate[] {
  return [...(ITINERARIES[citySlug] ?? [])].sort((a, b) => a.days - b.days);
}

export function getItinerary(
  citySlug: string,
  templateSlug: string,
): ItineraryTemplate | null {
  return (
    ITINERARIES[citySlug]?.find((t) => t.slug === templateSlug) ?? null
  );
}

// ---------------------------------------------------------------------------
// Cuisine / Famous-for (country-level) + Wellness (city-level)
// ---------------------------------------------------------------------------

export type Dish = {
  slug: string;
  name: string;
  romaji: string;
  native_script: string;
  origin: string;
  originated_here: boolean;
  made_of: string;
  similar_to: string[];
  vegan_version: boolean;
  vegan_notes: string | null;
  must_try_form: string;
  where_in_tokyo?: string[];
  hero_image_url?: string;
  hero_image_urls?: string[];
  palette?:
    | "enji"
    | "aizome"
    | "sakura"
    | "matcha"
    | "kintsugi"
    | "sumi"
    | "ume"
    | "ocean"
    | "forest";
};

export type CuisinePayload = {
  summary: string;
  dishes: Dish[];
};

export type FamousItem = {
  name: string;
  why: string;
  where_to_buy?: string;
  hero_image_url?: string;
  hero_image_urls?: string[];
  kanji?: string;
  palette?:
    | "enji"
    | "aizome"
    | "sakura"
    | "matcha"
    | "kintsugi"
    | "sumi"
    | "ume"
    | "ocean"
    | "forest";
};

export type FamousCategory = {
  slug: string;
  label: string;
  items: FamousItem[];
};

export type FamousForPayload = {
  summary: string;
  categories: FamousCategory[];
};

export type WellnessVenueType =
  | "urban_onsen"
  | "mountain_onsen"
  | "sento"
  | "head_spa"
  | "massage";

export type WellnessVenue = {
  slug: string;
  name: string;
  type: WellnessVenueType;
  neighborhood: string;
  price_min_minor: number;
  price_max_minor: number;
  currency: string;
  hours: string;
  tattoo_policy: string;
  features: string[];
  url: string | null;
  display_order: number;
};

export type WellnessPayload = {
  summary: string;
  etiquette_points: string[];
  venues: WellnessVenue[];
};

const COUNTRY_CUISINE: Record<string, CuisinePayload> = {
  japan: japanCuisineJson as CuisinePayload,
};

const COUNTRY_FAMOUS_FOR: Record<string, FamousForPayload> = {
  japan: japanFamousForJson as FamousForPayload,
};

export type BeverageCategory = "tea" | "coffee" | "alcohol";
export type Beverage = {
  slug: string;
  name: string;
  kanji: string;
  native_script: string;
  romaji: string;
  category: BeverageCategory;
  abv: string | null;
  made_of: string;
  popularity: string;
  how_to_try: string;
  where_to_try: string;
  palette?: string;
  hero_image_url?: string;
  hero_image_urls?: string[];
};
export type BeveragesPayload = {
  summary: string;
  tea_or_coffee: {
    verdict: "tea" | "coffee" | "both";
    headline: string;
    body: string;
    tea_culture_notes: string;
    coffee_culture_notes: string;
  };
  drinks: Beverage[];
};

const COUNTRY_BEVERAGES: Record<string, BeveragesPayload> = {
  japan: japanBeveragesJson as BeveragesPayload,
};

export function getCountryBeverages(
  countrySlug: string,
): BeveragesPayload | null {
  return COUNTRY_BEVERAGES[countrySlug] ?? null;
}

const CITY_WELLNESS: Record<string, WellnessPayload> = {
  tokyo: tokyoWellnessJson as WellnessPayload,
};

export function getCountryCuisine(
  countrySlug: string,
): CuisinePayload | null {
  return COUNTRY_CUISINE[countrySlug] ?? null;
}

export function getCountryFamousFor(
  countrySlug: string,
): FamousForPayload | null {
  return COUNTRY_FAMOUS_FOR[countrySlug] ?? null;
}

export function getCityWellness(
  citySlug: string,
): WellnessPayload | null {
  return CITY_WELLNESS[citySlug] ?? null;
}

export const WELLNESS_TYPE_LABEL: Record<WellnessVenueType, string> = {
  urban_onsen: "Urban onsen",
  mountain_onsen: "Mountain onsen",
  sento: "Sentō (local bathhouse)",
  head_spa: "Head spa",
  massage: "Massage",
};

// ---------------------------------------------------------------------------
// Tokyo add-on content pages (hidden gems, shopping, nightlife, kids, emergency)
// ---------------------------------------------------------------------------

export type HiddenGem = {
  slug: string;
  name: string;
  neighborhood: string;
  category: string;
  why: string;
  tip?: string;
  when?: string;
};
export type HiddenGemsPayload = { summary: string; picks: HiddenGem[] };

export type ShoppingPick = {
  name: string;
  neighborhood: string;
  body: string;
  url?: string | null;
};
export type ShoppingCategory = {
  slug: string;
  title: string;
  kanji: string;
  body: string;
  picks: ShoppingPick[];
  hero_image_urls?: string[];
};
export type ShoppingPayload = {
  summary: string;
  categories: ShoppingCategory[];
  tax_free_note: string;
};

export type NightlifeScene = {
  slug: string;
  title: string;
  kanji: string;
  neighborhood: string;
  vibe: string;
  body: string;
  tip?: string;
};
export type NightlifePayload = { summary: string; scenes: NightlifeScene[] };

export type KidPick = {
  slug: string;
  name: string;
  neighborhood: string;
  age_range: string;
  price_band: string;
  body: string;
  tip?: string;
  url?: string | null;
};
export type KidsPayload = {
  summary: string;
  tips: string[];
  picks: KidPick[];
};

export type EmergencyNumberEntry = {
  label: string;
  number: string;
  notes?: string;
};
export type EmergencyScenario = {
  slug: string;
  title: string;
  steps: string[];
};
export type EmergencyPayload = {
  headline: string;
  numbers: EmergencyNumberEntry[];
  scenarios: EmergencyScenario[];
  useful_apps: Array<{ name: string; purpose: string }>;
  final_note: string;
};

const CITY_HIDDEN_GEMS: Record<string, HiddenGemsPayload> = {
  tokyo: tokyoHiddenGemsJson as HiddenGemsPayload,
};
const CITY_SHOPPING: Record<string, ShoppingPayload> = {
  tokyo: tokyoShoppingJson as ShoppingPayload,
};
const CITY_NIGHTLIFE: Record<string, NightlifePayload> = {
  tokyo: tokyoNightlifeJson as NightlifePayload,
};
const CITY_KIDS: Record<string, KidsPayload> = {
  tokyo: tokyoKidsJson as KidsPayload,
};
const CITY_EMERGENCY: Record<string, EmergencyPayload> = {
  tokyo: tokyoEmergencyJson as EmergencyPayload,
};

export function getCityHiddenGems(citySlug: string): HiddenGemsPayload | null {
  return CITY_HIDDEN_GEMS[citySlug] ?? null;
}
export function getCityShopping(citySlug: string): ShoppingPayload | null {
  return CITY_SHOPPING[citySlug] ?? null;
}
export function getCityNightlife(citySlug: string): NightlifePayload | null {
  return CITY_NIGHTLIFE[citySlug] ?? null;
}
export function getCityKids(citySlug: string): KidsPayload | null {
  return CITY_KIDS[citySlug] ?? null;
}
export function getCityEmergency(citySlug: string): EmergencyPayload | null {
  return CITY_EMERGENCY[citySlug] ?? null;
}
