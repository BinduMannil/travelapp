// Supabase-first accessors for the destination foundation layer.
//
// These helpers intentionally sit beside the existing JSON seed accessors.
// They fall back to pilot JSON when Supabase is not configured or not seeded,
// so current routes can migrate one at a time without losing static behavior.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import destinationIdentityJson from "@/db/seed/japan/destination_identity.json";
import travelActivitiesJson from "@/db/seed/japan/travel_activities.json";
import tokyoPriceBenchmarksJson from "@/db/seed/tokyo/price_benchmarks.json";
import tokyoLocalAppsJson from "@/db/seed/tokyo/local_apps.json";
import phrasebookJson from "@/db/seed/japan/phrasebook.json";

export type DestinationOwnerKind = "country" | "city";

export type DestinationIdentityProfile = {
  owner_kind: DestinationOwnerKind;
  country_slug: string;
  city_slug?: string | null;
  palette_key: string;
  color_palette: Record<string, string>;
  script_style_key?: string | null;
  texture_key?: string | null;
  background_style_key?: string | null;
  ambient_motion_key?: string | null;
  icon_system_key?: string | null;
  photography_mood?: string | null;
  accent_symbols: string[];
  typography_notes?: string | null;
  source?: string;
  reviewed_at?: string | null;
  metadata?: Record<string, unknown>;
};

export type TravelActivity = {
  slug: string;
  label: string;
  activity_group: string;
  description?: string | null;
  traveler_types: string[];
  intensity?: "low" | "moderate" | "high" | null;
  indoor?: boolean | null;
  family_friendly?: boolean | null;
  display_order: number;
  metadata?: Record<string, unknown>;
};

export type DestinationActivity = {
  owner_kind: DestinationOwnerKind;
  country_slug: string;
  city_slug?: string | null;
  activity_slug: string;
  label: string;
  activity_group: string;
  relevance_level: "signature" | "recommended" | "available" | "niche";
  seasonality: string[];
  notes?: string | null;
  display_order: number;
  metadata?: Record<string, unknown>;
};

export type PriceBenchmark = {
  owner_kind: DestinationOwnerKind;
  country_slug: string;
  city_slug?: string | null;
  benchmark_key: string;
  category: string;
  label: string;
  amount_low_minor?: number | null;
  amount_typical_minor: number;
  amount_high_minor?: number | null;
  currency: string;
  unit: string;
  traveler_context?: string | null;
  notes?: string | null;
  source_label?: string | null;
  source_url?: string | null;
  reviewed_at?: string | null;
  confidence_level: "low" | "medium" | "high";
  display_order: number;
  metadata?: Record<string, unknown>;
};

export type LocalApp = {
  owner_kind: DestinationOwnerKind;
  country_slug: string;
  city_slug?: string | null;
  slug: string;
  name: string;
  category: string;
  purpose: string;
  free: boolean;
  ios_url?: string | null;
  android_url?: string | null;
  web_url?: string | null;
  offline_useful: boolean;
  setup_before_arrival: boolean;
  traveler_notes?: string | null;
  display_order: number;
  metadata?: Record<string, unknown>;
};

export type PhrasebookEntry = {
  owner_kind: DestinationOwnerKind;
  country_slug: string;
  city_slug?: string | null;
  phrase_key: string;
  category: string;
  source_language: string;
  target_language: string;
  source_text: string;
  translated_text: string;
  transliteration?: string | null;
  literal_translation?: string | null;
  usage_notes?: string | null;
  formality?: "casual" | "polite" | "formal" | "emergency" | null;
  audio_url?: string | null;
  display_order: number;
  metadata?: Record<string, unknown>;
};

type DestinationIdentityPayload = {
  profiles: DestinationIdentityProfile[];
};

type TravelActivitiesPayload = {
  activities: TravelActivity[];
  destination_map: Array<
    Omit<DestinationActivity, "label" | "activity_group"> & {
      activity_slug: string;
    }
  >;
};

type PriceBenchmarksPayload = {
  benchmarks: PriceBenchmark[];
};

type LocalAppsPayload = {
  apps: LocalApp[];
};

type PhrasebookPayload = {
  phrases: PhrasebookEntry[];
};

type CountryRow = { id: string; slug: string };
type CityRow = { id: string; slug: string };
type TravelActivityRow = TravelActivity & { id: string };
type DestinationActivityRow = {
  owner_kind: DestinationOwnerKind;
  country_id: string | null;
  city_id: string | null;
  relevance_level: DestinationActivity["relevance_level"];
  seasonality: string[];
  notes: string | null;
  display_order: number;
  metadata: Record<string, unknown>;
  travel_activities:
    | TravelActivityRow
    | TravelActivityRow[]
    | null;
};

const IDENTITY_SEED = destinationIdentityJson as unknown as DestinationIdentityPayload;
const ACTIVITIES_SEED = travelActivitiesJson as TravelActivitiesPayload;
const PRICE_BENCHMARK_SEEDS: Record<string, PriceBenchmarksPayload> = {
  tokyo: tokyoPriceBenchmarksJson as PriceBenchmarksPayload,
};
const LOCAL_APP_SEEDS: Record<string, LocalAppsPayload> = {
  tokyo: tokyoLocalAppsJson as LocalAppsPayload,
};
const PHRASEBOOK_SEED = phrasebookJson as PhrasebookPayload;

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

function mergeCountryAndCity<T extends { city_slug?: string | null; display_order: number }>(
  rows: T[],
  key: (row: T) => string,
): T[] {
  const merged = new Map<string, T>();
  for (const row of rows) merged.set(key(row), row);
  return Array.from(merged.values()).sort(
    (a, b) => a.display_order - b.display_order,
  );
}

export function getDestinationIdentitySeed({
  countrySlug,
  citySlug,
}: {
  countrySlug: string;
  citySlug?: string | null;
}): DestinationIdentityProfile[] {
  return IDENTITY_SEED.profiles.filter(
    (profile) =>
      profile.country_slug === countrySlug &&
      (!profile.city_slug || profile.city_slug === citySlug),
  );
}

export async function getDestinationIdentityLive({
  countrySlug,
  citySlug,
}: {
  countrySlug: string;
  citySlug?: string | null;
}): Promise<DestinationIdentityProfile[]> {
  const supabase = getSupabase();
  if (!supabase) return getDestinationIdentitySeed({ countrySlug, citySlug });

  try {
    const resolved = await resolveDestination(supabase, countrySlug, citySlug);
    if (!resolved) return getDestinationIdentitySeed({ countrySlug, citySlug });

    let query = supabase
      .from("destination_identity_profiles")
      .select(
        "owner_kind, country_id, city_id, palette_key, color_palette, script_style_key, texture_key, background_style_key, ambient_motion_key, icon_system_key, photography_mood, accent_symbols, typography_notes, source, reviewed_at, metadata",
      )
      .eq("status", "published");
    query = resolved.city
      ? query.or(`country_id.eq.${resolved.country.id},city_id.eq.${resolved.city.id}`)
      : query.eq("country_id", resolved.country.id);

    const { data, error } = await query;
    if (error || !data) return getDestinationIdentitySeed({ countrySlug, citySlug });

    return (data as Array<Omit<DestinationIdentityProfile, "country_slug" | "city_slug"> & { country_id: string | null; city_id: string | null }>).map((row) => ({
      owner_kind: row.owner_kind,
      country_slug: countrySlug,
      city_slug: row.city_id ? resolved.city?.slug ?? citySlug ?? null : null,
      palette_key: row.palette_key,
      color_palette: row.color_palette,
      script_style_key: row.script_style_key,
      texture_key: row.texture_key,
      background_style_key: row.background_style_key,
      ambient_motion_key: row.ambient_motion_key,
      icon_system_key: row.icon_system_key,
      photography_mood: row.photography_mood,
      accent_symbols: row.accent_symbols,
      typography_notes: row.typography_notes,
      source: row.source,
      reviewed_at: row.reviewed_at,
      metadata: row.metadata,
    }));
  } catch {
    return getDestinationIdentitySeed({ countrySlug, citySlug });
  }
}

export function getTravelActivitiesSeed({
  countrySlug,
  citySlug,
}: {
  countrySlug: string;
  citySlug?: string | null;
}): DestinationActivity[] {
  const activitiesBySlug = new Map(
    ACTIVITIES_SEED.activities.map((activity) => [activity.slug, activity]),
  );
  const rows = ACTIVITIES_SEED.destination_map
    .filter(
      (row) =>
        row.country_slug === countrySlug &&
        (!row.city_slug || row.city_slug === citySlug),
    )
    .map((row) => {
      const activity = activitiesBySlug.get(row.activity_slug);
      if (!activity) return null;
      return {
        ...row,
        label: activity.label,
        activity_group: activity.activity_group,
      };
    })
    .filter((row): row is DestinationActivity => row !== null);
  return mergeCountryAndCity(rows, (row) => row.activity_slug);
}

export async function getTravelActivitiesLive({
  countrySlug,
  citySlug,
}: {
  countrySlug: string;
  citySlug?: string | null;
}): Promise<DestinationActivity[]> {
  const supabase = getSupabase();
  if (!supabase) return getTravelActivitiesSeed({ countrySlug, citySlug });

  try {
    const resolved = await resolveDestination(supabase, countrySlug, citySlug);
    if (!resolved) return getTravelActivitiesSeed({ countrySlug, citySlug });

    let query = supabase
      .from("destination_activity_map")
      .select(
        "owner_kind, country_id, city_id, relevance_level, seasonality, notes, display_order, metadata, travel_activities(id, slug, label, activity_group, description, traveler_types, intensity, indoor, family_friendly, display_order, metadata)",
      );
    query = resolved.city
      ? query.or(`country_id.eq.${resolved.country.id},city_id.eq.${resolved.city.id}`)
      : query.eq("country_id", resolved.country.id);

    const { data, error } = await query;
    if (error || !data) return getTravelActivitiesSeed({ countrySlug, citySlug });

    const rows: DestinationActivity[] = [];
    for (const row of data as unknown as DestinationActivityRow[]) {
      const activity = Array.isArray(row.travel_activities)
        ? row.travel_activities[0]
        : row.travel_activities;
      if (!activity) continue;
      rows.push({
        owner_kind: row.owner_kind,
        country_slug: countrySlug,
        city_slug: row.city_id ? resolved.city?.slug ?? citySlug ?? null : null,
        activity_slug: activity.slug,
        label: activity.label,
        activity_group: activity.activity_group,
        relevance_level: row.relevance_level,
        seasonality: row.seasonality,
        notes: row.notes,
        display_order: row.display_order,
        metadata: row.metadata,
      });
    }
    return rows.length
      ? mergeCountryAndCity(rows, (row) => row.activity_slug)
      : getTravelActivitiesSeed({ countrySlug, citySlug });
  } catch {
    return getTravelActivitiesSeed({ countrySlug, citySlug });
  }
}

export function getPriceBenchmarksSeed(citySlug: string): PriceBenchmark[] {
  return [...(PRICE_BENCHMARK_SEEDS[citySlug]?.benchmarks ?? [])].sort(
    (a, b) => a.display_order - b.display_order,
  );
}

export async function getPriceBenchmarksLive({
  countrySlug,
  citySlug,
}: {
  countrySlug: string;
  citySlug: string;
}): Promise<PriceBenchmark[]> {
  const supabase = getSupabase();
  if (!supabase) return getPriceBenchmarksSeed(citySlug);

  try {
    const resolved = await resolveDestination(supabase, countrySlug, citySlug);
    if (!resolved?.city) return getPriceBenchmarksSeed(citySlug);
    const { data, error } = await supabase
      .from("price_benchmarks")
      .select("*")
      .eq("city_id", resolved.city.id)
      .eq("status", "published")
      .order("display_order", { ascending: true });
    if (error || !data?.length) return getPriceBenchmarksSeed(citySlug);
    return (data as Array<Omit<PriceBenchmark, "country_slug" | "city_slug">>).map(
      (row) => ({ ...row, country_slug: countrySlug, city_slug: citySlug }),
    );
  } catch {
    return getPriceBenchmarksSeed(citySlug);
  }
}

export function getLocalAppsSeed(citySlug: string): LocalApp[] {
  return [...(LOCAL_APP_SEEDS[citySlug]?.apps ?? [])].sort(
    (a, b) => a.display_order - b.display_order,
  );
}

export async function getLocalAppsLive({
  countrySlug,
  citySlug,
}: {
  countrySlug: string;
  citySlug: string;
}): Promise<LocalApp[]> {
  const supabase = getSupabase();
  if (!supabase) return getLocalAppsSeed(citySlug);

  try {
    const resolved = await resolveDestination(supabase, countrySlug, citySlug);
    if (!resolved?.city) return getLocalAppsSeed(citySlug);
    const { data, error } = await supabase
      .from("local_apps")
      .select("*")
      .eq("city_id", resolved.city.id)
      .eq("status", "published")
      .order("display_order", { ascending: true });
    if (error || !data?.length) return getLocalAppsSeed(citySlug);
    return (data as Array<Omit<LocalApp, "country_slug" | "city_slug">>).map(
      (row) => ({ ...row, country_slug: countrySlug, city_slug: citySlug }),
    );
  } catch {
    return getLocalAppsSeed(citySlug);
  }
}

export function getPhrasebookSeed(countrySlug: string): PhrasebookEntry[] {
  return PHRASEBOOK_SEED.phrases
    .filter((phrase) => phrase.country_slug === countrySlug)
    .sort((a, b) => a.display_order - b.display_order);
}

export async function getPhrasebookLive({
  countrySlug,
}: {
  countrySlug: string;
}): Promise<PhrasebookEntry[]> {
  const supabase = getSupabase();
  if (!supabase) return getPhrasebookSeed(countrySlug);

  try {
    const resolved = await resolveDestination(supabase, countrySlug);
    if (!resolved) return getPhrasebookSeed(countrySlug);
    const { data, error } = await supabase
      .from("phrasebook_entries")
      .select("*")
      .eq("country_id", resolved.country.id)
      .eq("status", "published")
      .order("display_order", { ascending: true });
    if (error || !data?.length) return getPhrasebookSeed(countrySlug);
    return (data as Array<Omit<PhrasebookEntry, "country_slug" | "city_slug">>).map(
      (row) => ({ ...row, country_slug: countrySlug, city_slug: null }),
    );
  } catch {
    return getPhrasebookSeed(countrySlug);
  }
}
