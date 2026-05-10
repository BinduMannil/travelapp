// Supabase-first accessors for smart packing and clothing intelligence.
// This layer complements the existing packing engine with destination-specific,
// weather-aware, culture-aware packing rules and JSON fallback.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import japanPackingJson from "@/db/seed/japan/packing_intelligence.json";
import vietnamPackingJson from "@/db/seed/vietnam/packing_intelligence.json";

export type PackingOwnerKind = "country" | "city" | "region";
export type PackingImportance =
  | "essential"
  | "recommended"
  | "situational"
  | "nice_to_have";
export type PackingConfidenceLevel = "low" | "medium" | "high";

export type PackingCategory =
  | "clothing"
  | "footwear"
  | "weather_layers"
  | "rain_cold_heat"
  | "activity_gear"
  | "religious_cultural"
  | "nightlife_dining"
  | "beach_swimming"
  | "trekking_hiking"
  | "scooter_motorbike"
  | "digital_nomad_tech"
  | "family_baby"
  | "safety_emergency"
  | "medical_health"
  | "country_practical"
  | "documents"
  | "toiletries"
  | "other";

export type PackingItem = {
  item_key: string;
  label: string;
  packing_category: PackingCategory;
  default_importance: PackingImportance;
  default_required: boolean;
  weight_grams?: number | null;
  pack_weight_priority: number;
  reusable: boolean;
  source_label?: string | null;
  source_url?: string | null;
  reviewed_at?: string | null;
  metadata?: Record<string, unknown>;
};

export type DestinationPackingRule = {
  owner_kind: PackingOwnerKind;
  country_slug: string;
  city_slug?: string | null;
  region_key?: string | null;
  rule_key: string;
  item_key: string;
  item?: PackingItem;
  activity_tags: string[];
  weather_conditions: string[];
  seasonality: string[];
  traveler_profiles: string[];
  itinerary_styles: string[];
  transportation_styles: string[];
  cultural_context_tags: string[];
  clothing_context: string[];
  importance: PackingImportance;
  required: boolean;
  priority: number;
  pack_weight_priority: number;
  recommendation_note: string;
  cultural_notes?: string | null;
  weather_notes?: string | null;
  activity_notes?: string | null;
  region_override_note?: string | null;
  quantity_hint?: string | null;
  source_label?: string | null;
  source_url?: string | null;
  reviewed_at?: string | null;
  confidence_level: PackingConfidenceLevel;
  display_order: number;
  metadata?: Record<string, unknown>;
};

export type PackingIntelligence = {
  items: PackingItem[];
  rules: DestinationPackingRule[];
};

type PackingPayload = PackingIntelligence;
type CountryRow = { id: string; slug: string };
type CityRow = { id: string; slug: string };
type PackingItemRow = PackingItem & { id: string };
type DestinationPackingRuleRow = Omit<
  DestinationPackingRule,
  "country_slug" | "city_slug" | "item_key" | "item"
> & {
  country_id: string | null;
  city_id: string | null;
  item_id: string;
  packing_items: PackingItemRow | PackingItemRow[] | null;
};

const PACKING_SEEDS: Record<string, PackingPayload> = {
  japan: japanPackingJson as PackingPayload,
  vietnam: vietnamPackingJson as PackingPayload,
};

function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function resolveDestination(
  supabase: SupabaseClient,
  countrySlug: string,
  citySlug?: string | null,
): Promise<{ country: CountryRow; city: CityRow | null } | null> {
  const { data: country, error: countryErr } = await supabase
    .from("countries")
    .select("id, slug")
    .eq("slug", countrySlug)
    .single<CountryRow>();
  if (countryErr || !country) return null;
  if (!citySlug) return { country, city: null };

  const { data: city, error: cityErr } = await supabase
    .from("cities")
    .select("id, slug")
    .eq("country_id", country.id)
    .eq("slug", citySlug)
    .single<CityRow>();
  return { country, city: cityErr ? null : city ?? null };
}

function firstRow<T>(value: T | T[] | null): T | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value;
}

function sortRules(rows: DestinationPackingRule[]): DestinationPackingRule[] {
  return [...rows].sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    return a.display_order - b.display_order;
  });
}

export function getPackingIntelligenceSeed({
  countrySlug,
  citySlug,
  regionKey,
}: {
  countrySlug: string;
  citySlug?: string | null;
  regionKey?: string | null;
}): PackingIntelligence {
  const payload = PACKING_SEEDS[countrySlug] ?? { items: [], rules: [] };
  const rules = payload.rules.filter(
    (rule) =>
      rule.country_slug === countrySlug &&
      (rule.owner_kind === "country" ||
        (citySlug && rule.city_slug === citySlug) ||
        (regionKey && rule.region_key === regionKey)),
  );
  const itemKeys = new Set(rules.map((rule) => rule.item_key));
  const items = payload.items.filter((item) => itemKeys.has(item.item_key));
  const itemByKey = new Map(items.map((item) => [item.item_key, item]));

  return {
    items,
    rules: sortRules(
      rules.map((rule) => ({
        ...rule,
        item: itemByKey.get(rule.item_key),
      })),
    ),
  };
}

export async function getPackingIntelligenceLive({
  countrySlug,
  citySlug,
  regionKey,
}: {
  countrySlug: string;
  citySlug?: string | null;
  regionKey?: string | null;
}): Promise<PackingIntelligence> {
  const fallback = getPackingIntelligenceSeed({ countrySlug, citySlug, regionKey });
  const supabase = getSupabase();
  if (!supabase) return fallback;

  try {
    const resolved = await resolveDestination(supabase, countrySlug, citySlug);
    if (!resolved) return fallback;

    let query = supabase
      .from("destination_packing_rules")
      .select(
        "owner_kind, country_id, city_id, region_key, rule_key, item_id, activity_tags, weather_conditions, seasonality, traveler_profiles, itinerary_styles, transportation_styles, cultural_context_tags, clothing_context, importance, required, priority, pack_weight_priority, recommendation_note, cultural_notes, weather_notes, activity_notes, region_override_note, quantity_hint, source_label, source_url, reviewed_at, confidence_level, display_order, metadata, packing_items:item_id(id, item_key, label, packing_category, default_importance, default_required, weight_grams, pack_weight_priority, reusable, source_label, source_url, reviewed_at, metadata)",
      )
      .eq("status", "published");

    const ownerFilters = [`country_id.eq.${resolved.country.id}`];
    if (resolved.city) ownerFilters.push(`city_id.eq.${resolved.city.id}`);
    query = query.or(ownerFilters.join(","));

    const { data, error } = await query;
    if (error || !data?.length) return fallback;

    const rules = ((data ?? []) as DestinationPackingRuleRow[])
      .filter((row) => !regionKey || !row.region_key || row.region_key === regionKey)
      .map((row) => {
        const item = firstRow(row.packing_items);
        return {
          ...row,
          country_slug: countrySlug,
          city_slug: row.city_id ? resolved.city?.slug ?? citySlug ?? null : null,
          item_key: item?.item_key ?? row.item_id,
          item: item ?? undefined,
        };
      });
    const itemsByKey = new Map<string, PackingItem>();
    for (const rule of rules) {
      if (rule.item) itemsByKey.set(rule.item.item_key, rule.item);
    }

    return {
      items: Array.from(itemsByKey.values()),
      rules: sortRules(rules),
    };
  } catch {
    return fallback;
  }
}
