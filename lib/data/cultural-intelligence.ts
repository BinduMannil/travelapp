// Supabase-first accessors for cultural, historical, and sensitivity
// intelligence. JSON seed fallback stays available while frontend surfaces adopt
// the live backend incrementally.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import japanCulturalJson from "@/db/seed/japan/cultural_intelligence.json";
import vietnamCulturalJson from "@/db/seed/vietnam/cultural_intelligence.json";

export type CulturalOwnerKind = "country" | "city";

export type CulturalEventKind =
  | "holiday"
  | "festival"
  | "national_celebration"
  | "regional_celebration"
  | "religious_observance"
  | "mourning_period"
  | "commemoration"
  | "other";

export type CulturalSensitivityCategory =
  | "cultural_etiquette"
  | "historical_sensitivity"
  | "political_sensitivity"
  | "social_taboo"
  | "national_pride"
  | "restricted_discussion"
  | "protest_sensitivity"
  | "conflict_war_history"
  | "religious_site_behavior"
  | "local_behavioral_expectations"
  | "alcohol_religious_observance"
  | "other";

export type CulturalImpactLevel = "none" | "limited" | "moderate" | "major";
export type CulturalCrowdLevel = "low" | "moderate" | "high" | "extreme";
export type CulturalRiskLevel = "low" | "moderate" | "high" | "critical";
export type CulturalConfidenceLevel = "low" | "medium" | "high";

export type CulturalEvent = {
  owner_kind: CulturalOwnerKind;
  country_slug: string;
  city_slug?: string | null;
  event_key: string;
  name: string;
  event_kind: CulturalEventKind;
  starts_on?: string | null;
  ends_on?: string | null;
  recurrence_note?: string | null;
  date_note?: string | null;
  traveler_summary: string;
  cultural_context?: string | null;
  practical_guidance: string[];
  etiquette_notes: string[];
  public_closure_level: CulturalImpactLevel;
  tourism_surge_level: CulturalImpactLevel;
  transport_impact_level: CulturalImpactLevel;
  crowd_level: CulturalCrowdLevel;
  risk_level: CulturalRiskLevel;
  source_label?: string | null;
  source_url?: string | null;
  reviewed_at?: string | null;
  confidence_level: CulturalConfidenceLevel;
  display_order: number;
  metadata?: Record<string, unknown>;
};

export type CulturalSensitivityNote = {
  owner_kind: CulturalOwnerKind;
  country_slug: string;
  city_slug?: string | null;
  note_key: string;
  sensitivity_category: CulturalSensitivityCategory;
  title: string;
  traveler_summary: string;
  why_it_matters?: string | null;
  avoid: string[];
  practical_safe_behavior: string[];
  examples: string[];
  risk_level: CulturalRiskLevel;
  source_label?: string | null;
  source_url?: string | null;
  reviewed_at?: string | null;
  confidence_level: CulturalConfidenceLevel;
  display_order: number;
  metadata?: Record<string, unknown>;
};

export type CulturalIntelligence = {
  events: CulturalEvent[];
  sensitivity_notes: CulturalSensitivityNote[];
};

type CulturalPayload = CulturalIntelligence;
type CountryRow = { id: string; slug: string };
type CityRow = { id: string; slug: string };

type CulturalEventRow = Omit<CulturalEvent, "country_slug" | "city_slug"> & {
  country_id: string | null;
  city_id: string | null;
};

type CulturalSensitivityNoteRow = Omit<
  CulturalSensitivityNote,
  "country_slug" | "city_slug"
> & {
  country_id: string | null;
  city_id: string | null;
};

const CULTURAL_SEEDS: Record<string, CulturalPayload> = {
  japan: japanCulturalJson as CulturalPayload,
  vietnam: vietnamCulturalJson as CulturalPayload,
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

function sortByDisplayOrder<T extends { display_order: number }>(rows: T[]): T[] {
  return [...rows].sort((a, b) => a.display_order - b.display_order);
}

function matchesOwner(
  row: { country_slug: string; city_slug?: string | null },
  countrySlug: string,
  citySlug?: string | null,
) {
  return (
    row.country_slug === countrySlug &&
    (!row.city_slug || row.city_slug === citySlug)
  );
}

export function getCulturalEventsSeed({
  countrySlug,
  citySlug,
}: {
  countrySlug: string;
  citySlug?: string | null;
}): CulturalEvent[] {
  return sortByDisplayOrder(
    (CULTURAL_SEEDS[countrySlug]?.events ?? []).filter((event) =>
      matchesOwner(event, countrySlug, citySlug),
    ),
  );
}

export function getCulturalSensitivityNotesSeed({
  countrySlug,
  citySlug,
}: {
  countrySlug: string;
  citySlug?: string | null;
}): CulturalSensitivityNote[] {
  return sortByDisplayOrder(
    (CULTURAL_SEEDS[countrySlug]?.sensitivity_notes ?? []).filter((note) =>
      matchesOwner(note, countrySlug, citySlug),
    ),
  );
}

export function getCulturalIntelligenceSeed({
  countrySlug,
  citySlug,
}: {
  countrySlug: string;
  citySlug?: string | null;
}): CulturalIntelligence {
  return {
    events: getCulturalEventsSeed({ countrySlug, citySlug }),
    sensitivity_notes: getCulturalSensitivityNotesSeed({ countrySlug, citySlug }),
  };
}

export async function getCulturalEventsLive({
  countrySlug,
  citySlug,
}: {
  countrySlug: string;
  citySlug?: string | null;
}): Promise<CulturalEvent[]> {
  const supabase = getSupabase();
  if (!supabase) return getCulturalEventsSeed({ countrySlug, citySlug });

  try {
    const resolved = await resolveDestination(supabase, countrySlug, citySlug);
    if (!resolved) return getCulturalEventsSeed({ countrySlug, citySlug });

    let query = supabase
      .from("cultural_events")
      .select(
        "owner_kind, country_id, city_id, event_key, name, event_kind, starts_on, ends_on, recurrence_note, date_note, traveler_summary, cultural_context, practical_guidance, etiquette_notes, public_closure_level, tourism_surge_level, transport_impact_level, crowd_level, risk_level, source_label, source_url, reviewed_at, confidence_level, display_order, metadata",
      )
      .eq("status", "published");
    query = resolved.city
      ? query.or(`country_id.eq.${resolved.country.id},city_id.eq.${resolved.city.id}`)
      : query.eq("country_id", resolved.country.id);

    const { data, error } = await query;
    if (error || !data?.length) {
      return getCulturalEventsSeed({ countrySlug, citySlug });
    }

    return sortByDisplayOrder(
      (data as CulturalEventRow[]).map((row) => ({
        ...row,
        country_slug: countrySlug,
        city_slug: row.city_id ? resolved.city?.slug ?? citySlug ?? null : null,
      })),
    );
  } catch {
    return getCulturalEventsSeed({ countrySlug, citySlug });
  }
}

export async function getCulturalSensitivityNotesLive({
  countrySlug,
  citySlug,
}: {
  countrySlug: string;
  citySlug?: string | null;
}): Promise<CulturalSensitivityNote[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return getCulturalSensitivityNotesSeed({ countrySlug, citySlug });
  }

  try {
    const resolved = await resolveDestination(supabase, countrySlug, citySlug);
    if (!resolved) {
      return getCulturalSensitivityNotesSeed({ countrySlug, citySlug });
    }

    let query = supabase
      .from("cultural_sensitivity_notes")
      .select(
        "owner_kind, country_id, city_id, note_key, sensitivity_category, title, traveler_summary, why_it_matters, avoid, practical_safe_behavior, examples, risk_level, source_label, source_url, reviewed_at, confidence_level, display_order, metadata",
      )
      .eq("status", "published");
    query = resolved.city
      ? query.or(`country_id.eq.${resolved.country.id},city_id.eq.${resolved.city.id}`)
      : query.eq("country_id", resolved.country.id);

    const { data, error } = await query;
    if (error || !data?.length) {
      return getCulturalSensitivityNotesSeed({ countrySlug, citySlug });
    }

    return sortByDisplayOrder(
      (data as CulturalSensitivityNoteRow[]).map((row) => ({
        ...row,
        country_slug: countrySlug,
        city_slug: row.city_id ? resolved.city?.slug ?? citySlug ?? null : null,
      })),
    );
  } catch {
    return getCulturalSensitivityNotesSeed({ countrySlug, citySlug });
  }
}

export async function getCulturalIntelligenceLive({
  countrySlug,
  citySlug,
}: {
  countrySlug: string;
  citySlug?: string | null;
}): Promise<CulturalIntelligence> {
  const [events, sensitivity_notes] = await Promise.all([
    getCulturalEventsLive({ countrySlug, citySlug }),
    getCulturalSensitivityNotesLive({ countrySlug, citySlug }),
  ]);

  return { events, sensitivity_notes };
}
