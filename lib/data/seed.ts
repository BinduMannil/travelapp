// Thin loader for seed JSON used at render time. The Supabase-backed
// counterpart lives in db/seed/import.ts; pages can render directly from
// these files during M1 so the app works without a live database.
//
// Keep in mind: these imports are evaluated at build time on the server,
// so the JSON is bundled and refreshed on every deploy.

import tokyoClimateJson from "@/db/seed/tokyo/seasonal_climate.json";
import tokyoPriceItemsJson from "@/db/seed/tokyo/price_items.json";
import tokyoCityJson from "@/db/seed/tokyo/city.json";
import japanCountryJson from "@/db/seed/japan/country.json";

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

export function getCity(slug: string): CitySeed | null {
  return CITIES[slug] ?? null;
}

export function getCountry(slug: string): CountrySeed | null {
  return COUNTRIES[slug] ?? null;
}

export function getClimate(citySlug: string): ClimateRow[] {
  return CLIMATE[citySlug] ?? [];
}

export function getPriceItems(citySlug: string): PriceItem[] {
  return [...(PRICE_ITEMS[citySlug] ?? [])].sort(
    (a, b) => a.display_order - b.display_order,
  );
}
