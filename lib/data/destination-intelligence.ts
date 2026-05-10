// Supabase-first accessors for destination travel intelligence and affiliate
// opportunity scaffolding. Vietnam is the first pilot country; JSON fallback is
// preserved so frontend routes can adopt this layer gradually.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import vietnamIntelligenceJson from "@/db/seed/vietnam/intelligence_notes.json";
import vietnamAffiliateJson from "@/db/seed/vietnam/affiliate_opportunities.json";

export type DestinationOwnerKind = "country" | "city";

export type DestinationIntelligenceCategory =
  | "visa_entry"
  | "money_payments"
  | "scams"
  | "police_official_interaction"
  | "street_crossing"
  | "scooter_motorbike"
  | "connectivity_sim_esim"
  | "weather_region"
  | "nightlife"
  | "local_etiquette"
  | "transport"
  | "health_safety"
  | "digital_nomad"
  | "other";

export type DestinationIntelligenceNote = {
  owner_kind: DestinationOwnerKind;
  country_slug: string;
  city_slug?: string | null;
  intelligence_category: DestinationIntelligenceCategory;
  risk_level?: "low" | "moderate" | "high" | "critical" | null;
  title: string;
  traveler_summary: string;
  practical_guidance: string[];
  watchouts: string[];
  examples: string[];
  source_label?: string | null;
  source_url?: string | null;
  reviewed_at?: string | null;
  confidence_level: "low" | "medium" | "high";
  display_order: number;
  metadata?: Record<string, unknown>;
};

export type DestinationAffiliateOpportunity = {
  owner_kind: DestinationOwnerKind;
  country_slug: string;
  city_slug?: string | null;
  opportunity_key: string;
  category:
    | "hotels"
    | "tours"
    | "esim"
    | "transfers"
    | "activities"
    | "buses_trains"
    | "insurance"
    | "cars"
    | "other";
  traveler_need: string;
  recommended_partner_keys: string[];
  placement_context: string[];
  priority: "low" | "medium" | "high";
  notes?: string | null;
  display_order: number;
  metadata?: Record<string, unknown>;
};

type IntelligencePayload = {
  notes: DestinationIntelligenceNote[];
};

type AffiliatePayload = {
  opportunities: DestinationAffiliateOpportunity[];
};

type CountryRow = { id: string; slug: string };
type CityRow = { id: string; slug: string };

type IntelligenceRow = Omit<
  DestinationIntelligenceNote,
  "country_slug" | "city_slug"
> & {
  country_id: string | null;
  city_id: string | null;
};

type AffiliateRow = Omit<
  DestinationAffiliateOpportunity,
  "country_slug" | "city_slug"
> & {
  country_id: string | null;
  city_id: string | null;
};

const INTELLIGENCE_SEEDS: Record<string, IntelligencePayload> = {
  vietnam: vietnamIntelligenceJson as IntelligencePayload,
};

const AFFILIATE_SEEDS: Record<string, AffiliatePayload> = {
  vietnam: vietnamAffiliateJson as AffiliatePayload,
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

export function getDestinationIntelligenceSeed({
  countrySlug,
  citySlug,
}: {
  countrySlug: string;
  citySlug?: string | null;
}): DestinationIntelligenceNote[] {
  return sortByDisplayOrder(
    (INTELLIGENCE_SEEDS[countrySlug]?.notes ?? []).filter(
      (note) =>
        note.country_slug === countrySlug &&
        (!note.city_slug || note.city_slug === citySlug),
    ),
  );
}

export async function getDestinationIntelligenceLive({
  countrySlug,
  citySlug,
}: {
  countrySlug: string;
  citySlug?: string | null;
}): Promise<DestinationIntelligenceNote[]> {
  const supabase = getSupabase();
  if (!supabase) return getDestinationIntelligenceSeed({ countrySlug, citySlug });

  try {
    const resolved = await resolveDestination(supabase, countrySlug, citySlug);
    if (!resolved) return getDestinationIntelligenceSeed({ countrySlug, citySlug });

    let query = supabase
      .from("destination_intelligence_notes")
      .select(
        "owner_kind, country_id, city_id, intelligence_category, risk_level, title, traveler_summary, practical_guidance, watchouts, examples, source_label, source_url, reviewed_at, confidence_level, display_order, metadata",
      )
      .eq("status", "published");
    query = resolved.city
      ? query.or(`country_id.eq.${resolved.country.id},city_id.eq.${resolved.city.id}`)
      : query.eq("country_id", resolved.country.id);

    const { data, error } = await query;
    if (error || !data?.length) {
      return getDestinationIntelligenceSeed({ countrySlug, citySlug });
    }

    return sortByDisplayOrder(
      (data as IntelligenceRow[]).map((row) => ({
        ...row,
        country_slug: countrySlug,
        city_slug: row.city_id ? resolved.city?.slug ?? citySlug ?? null : null,
      })),
    );
  } catch {
    return getDestinationIntelligenceSeed({ countrySlug, citySlug });
  }
}

export function getDestinationAffiliateOpportunitiesSeed({
  countrySlug,
  citySlug,
}: {
  countrySlug: string;
  citySlug?: string | null;
}): DestinationAffiliateOpportunity[] {
  return sortByDisplayOrder(
    (AFFILIATE_SEEDS[countrySlug]?.opportunities ?? []).filter(
      (opportunity) =>
        opportunity.country_slug === countrySlug &&
        (!opportunity.city_slug || opportunity.city_slug === citySlug),
    ),
  );
}

export async function getDestinationAffiliateOpportunitiesLive({
  countrySlug,
  citySlug,
}: {
  countrySlug: string;
  citySlug?: string | null;
}): Promise<DestinationAffiliateOpportunity[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return getDestinationAffiliateOpportunitiesSeed({ countrySlug, citySlug });
  }

  try {
    const resolved = await resolveDestination(supabase, countrySlug, citySlug);
    if (!resolved) {
      return getDestinationAffiliateOpportunitiesSeed({ countrySlug, citySlug });
    }

    let query = supabase
      .from("destination_affiliate_opportunities")
      .select(
        "owner_kind, country_id, city_id, opportunity_key, category, traveler_need, recommended_partner_keys, placement_context, priority, notes, display_order, metadata",
      )
      .in("status", ["planned", "active"]);
    query = resolved.city
      ? query.or(`country_id.eq.${resolved.country.id},city_id.eq.${resolved.city.id}`)
      : query.eq("country_id", resolved.country.id);

    const { data, error } = await query;
    if (error || !data?.length) {
      return getDestinationAffiliateOpportunitiesSeed({ countrySlug, citySlug });
    }

    return sortByDisplayOrder(
      (data as AffiliateRow[]).map((row) => ({
        ...row,
        country_slug: countrySlug,
        city_slug: row.city_id ? resolved.city?.slug ?? citySlug ?? null : null,
      })),
    );
  } catch {
    return getDestinationAffiliateOpportunitiesSeed({ countrySlug, citySlug });
  }
}
