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
