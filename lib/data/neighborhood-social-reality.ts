// Supabase-first accessors for neighborhood and social reality intelligence.
// These helpers preserve JSON fallback while backend consumers gradually adopt
// live neighborhood profiles, social notes, and relationship data.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import japanNeighborhoodRealityJson from "@/db/seed/japan/neighborhood_social_reality.json";
import vietnamNeighborhoodRealityJson from "@/db/seed/vietnam/neighborhood_social_reality.json";

export type SocialRealityOwnerKind = "city" | "neighborhood";

export type NeighborhoodLevel =
  | "budget"
  | "mid_range"
  | "upscale"
  | "luxury"
  | "mixed";
export type WealthProfile =
  | "working_class"
  | "mixed"
  | "middle_income"
  | "upper_middle_affluent"
  | "high_net_worth"
  | "tourist_economy";
export type LocalExpatMix =
  | "mostly_local"
  | "local_leaning"
  | "mixed"
  | "expat_leaning"
  | "mostly_expat";
export type TourismLevel = "local" | "low" | "moderate" | "high" | "tourist_core";
export type IntensityLevel = "low" | "moderate" | "high" | "extreme";
export type QualityLevel = "limited" | "basic" | "good" | "excellent";
export type SafetyAtNight = "low" | "moderate" | "good" | "high" | "varies";
export type ShoppingLevel = "low" | "moderate" | "high" | "luxury";
export type ConfidenceLevel = "low" | "medium" | "high";
export type RiskLevel = "low" | "moderate" | "high" | "critical";

export type SocialRealityCategory =
  | "local_behavior"
  | "social_norms"
  | "work_culture"
  | "networking_culture"
  | "public_behavior"
  | "rude_behavior"
  | "normal_behavior"
  | "class_signals"
  | "appearance_expectations"
  | "reservation_culture"
  | "nightlife_behavior"
  | "queue_culture"
  | "bargaining_culture"
  | "noise_expectations"
  | "transport_behavior"
  | "cafe_culture"
  | "other";

export type NeighborhoodRelationshipKind =
  | "nearby"
  | "upscale_contrast"
  | "budget_contrast"
  | "tourist_stay"
  | "local_hangout"
  | "digital_nomad_base"
  | "hidden_local_area"
  | "nightlife_alternative"
  | "shopping_alternative"
  | "transit_link"
  | "atmosphere_contrast"
  | "other";

export type NeighborhoodIntelligenceProfile = {
  country_slug: string;
  city_slug: string;
  neighborhood_slug: string;
  vibe_tags: string[];
  luxury_level: NeighborhoodLevel;
  wealth_profile: WealthProfile;
  local_expat_mix: LocalExpatMix;
  tourism_level: TourismLevel;
  nightlife_intensity: IntensityLevel;
  digital_nomad_friendliness: Exclude<QualityLevel, "basic" | "limited"> | "moderate" | "low";
  family_friendliness: Exclude<QualityLevel, "basic" | "limited"> | "moderate" | "low";
  cafe_culture: Exclude<QualityLevel, "basic" | "limited"> | "moderate" | "low";
  shopping_level: ShoppingLevel;
  transport_quality: QualityLevel;
  walkability: QualityLevel;
  safety_at_night: SafetyAtNight;
  dress_expectations: string[];
  language_accessibility: Exclude<QualityLevel, "basic" | "excellent"> | "high" | "low";
  setting_tags: string[];
  atmosphere_scores: Record<string, number>;
  social_expectations: string[];
  safety_notes: string[];
  recommended_for: string[];
  avoid_if: string[];
  traveler_type_fit: Record<string, number>;
  what_it_feels_like: string;
  practical_notes: string[];
  source_label?: string | null;
  source_url?: string | null;
  reviewed_at?: string | null;
  confidence_level: ConfidenceLevel;
  display_order: number;
  metadata?: Record<string, unknown>;
};

export type SocialRealityNote = {
  owner_kind: SocialRealityOwnerKind;
  country_slug: string;
  city_slug: string;
  neighborhood_slug?: string | null;
  note_key: string;
  reality_category: SocialRealityCategory;
  title: string;
  traveler_summary: string;
  what_is_normal: string[];
  what_is_rude: string[];
  practical_guidance: string[];
  examples: string[];
  social_context?: string | null;
  risk_level: RiskLevel;
  source_label?: string | null;
  source_url?: string | null;
  reviewed_at?: string | null;
  confidence_level: ConfidenceLevel;
  display_order: number;
  metadata?: Record<string, unknown>;
};

export type NeighborhoodRelationship = {
  country_slug: string;
  city_slug: string;
  from_neighborhood_slug: string;
  to_neighborhood_slug: string;
  relationship_kind: NeighborhoodRelationshipKind;
  traveler_summary: string;
  distance_note?: string | null;
  practical_use: string[];
  source_label?: string | null;
  source_url?: string | null;
  reviewed_at?: string | null;
  confidence_level: ConfidenceLevel;
  display_order: number;
  metadata?: Record<string, unknown>;
};

export type NeighborhoodSocialReality = {
  neighborhood_intelligence: NeighborhoodIntelligenceProfile[];
  social_reality_notes: SocialRealityNote[];
  neighborhood_relationships: NeighborhoodRelationship[];
};

type CountryRow = { id: string; slug: string };
type CityRow = { id: string; slug: string };
type NeighborhoodRow = { id: string; slug: string };

type NeighborhoodIntelligenceRow = Omit<
  NeighborhoodIntelligenceProfile,
  "country_slug" | "city_slug" | "neighborhood_slug"
> & {
  city_id: string;
  neighborhood_id: string;
  neighborhoods: NeighborhoodRow | NeighborhoodRow[] | null;
};

type SocialRealityNoteRow = Omit<
  SocialRealityNote,
  "country_slug" | "city_slug" | "neighborhood_slug"
> & {
  city_id: string;
  neighborhood_id: string | null;
  neighborhoods: NeighborhoodRow | NeighborhoodRow[] | null;
};

type NeighborhoodRelationshipRow = Omit<
  NeighborhoodRelationship,
  "country_slug" | "city_slug" | "from_neighborhood_slug" | "to_neighborhood_slug"
> & {
  city_id: string;
  from_neighborhood_id: string;
  to_neighborhood_id: string;
  from_neighborhood: NeighborhoodRow | NeighborhoodRow[] | null;
  to_neighborhood: NeighborhoodRow | NeighborhoodRow[] | null;
};

const NEIGHBORHOOD_REALITY_SEEDS: Record<string, NeighborhoodSocialReality> = {
  japan: japanNeighborhoodRealityJson as NeighborhoodSocialReality,
  vietnam: vietnamNeighborhoodRealityJson as NeighborhoodSocialReality,
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
  citySlug: string,
  neighborhoodSlug?: string | null,
): Promise<{
  country: CountryRow;
  city: CityRow;
  neighborhood: NeighborhoodRow | null;
} | null> {
  const { data: country, error: countryErr } = await supabase
    .from("countries")
    .select("id, slug")
    .eq("slug", countrySlug)
    .single<CountryRow>();
  if (countryErr || !country) return null;

  const { data: city, error: cityErr } = await supabase
    .from("cities")
    .select("id, slug")
    .eq("country_id", country.id)
    .eq("slug", citySlug)
    .single<CityRow>();
  if (cityErr || !city) return null;
  if (!neighborhoodSlug) return { country, city, neighborhood: null };

  const { data: neighborhood, error: neighborhoodErr } = await supabase
    .from("neighborhoods")
    .select("id, slug")
    .eq("city_id", city.id)
    .eq("slug", neighborhoodSlug)
    .single<NeighborhoodRow>();
  return {
    country,
    city,
    neighborhood: neighborhoodErr ? null : neighborhood ?? null,
  };
}

function firstRow<T>(value: T | T[] | null): T | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value;
}

function sortByDisplayOrder<T extends { display_order: number }>(rows: T[]): T[] {
  return [...rows].sort((a, b) => a.display_order - b.display_order);
}

function seedPayload(countrySlug: string): NeighborhoodSocialReality {
  return (
    NEIGHBORHOOD_REALITY_SEEDS[countrySlug] ?? {
      neighborhood_intelligence: [],
      social_reality_notes: [],
      neighborhood_relationships: [],
    }
  );
}

export function getNeighborhoodSocialRealitySeed({
  countrySlug,
  citySlug,
  neighborhoodSlug,
}: {
  countrySlug: string;
  citySlug: string;
  neighborhoodSlug?: string | null;
}): NeighborhoodSocialReality {
  const payload = seedPayload(countrySlug);
  const neighborhood_intelligence = sortByDisplayOrder(
    payload.neighborhood_intelligence.filter(
      (profile) =>
        profile.country_slug === countrySlug &&
        profile.city_slug === citySlug &&
        (!neighborhoodSlug || profile.neighborhood_slug === neighborhoodSlug),
    ),
  );
  const social_reality_notes = sortByDisplayOrder(
    payload.social_reality_notes.filter(
      (note) =>
        note.country_slug === countrySlug &&
        note.city_slug === citySlug &&
        (note.owner_kind === "city" ||
          !neighborhoodSlug ||
          note.neighborhood_slug === neighborhoodSlug),
    ),
  );
  const neighborhood_relationships = sortByDisplayOrder(
    payload.neighborhood_relationships.filter(
      (relationship) =>
        relationship.country_slug === countrySlug &&
        relationship.city_slug === citySlug &&
        (!neighborhoodSlug ||
          relationship.from_neighborhood_slug === neighborhoodSlug ||
          relationship.to_neighborhood_slug === neighborhoodSlug),
    ),
  );

  return {
    neighborhood_intelligence,
    social_reality_notes,
    neighborhood_relationships,
  };
}

export async function getNeighborhoodSocialRealityLive({
  countrySlug,
  citySlug,
  neighborhoodSlug,
}: {
  countrySlug: string;
  citySlug: string;
  neighborhoodSlug?: string | null;
}): Promise<NeighborhoodSocialReality> {
  const fallback = getNeighborhoodSocialRealitySeed({
    countrySlug,
    citySlug,
    neighborhoodSlug,
  });
  const supabase = getSupabase();
  if (!supabase) return fallback;

  try {
    const resolved = await resolveDestination(
      supabase,
      countrySlug,
      citySlug,
      neighborhoodSlug,
    );
    if (!resolved) return fallback;

    let intelligenceQuery = supabase
      .from("neighborhood_intelligence")
      .select(
        "city_id, neighborhood_id, vibe_tags, luxury_level, wealth_profile, local_expat_mix, tourism_level, nightlife_intensity, digital_nomad_friendliness, family_friendliness, cafe_culture, shopping_level, transport_quality, walkability, safety_at_night, dress_expectations, language_accessibility, setting_tags, atmosphere_scores, social_expectations, safety_notes, recommended_for, avoid_if, traveler_type_fit, what_it_feels_like, practical_notes, source_label, source_url, reviewed_at, confidence_level, display_order, metadata, neighborhoods:neighborhood_id(id, slug)",
      )
      .eq("city_id", resolved.city.id)
      .eq("status", "published");
    if (resolved.neighborhood) {
      intelligenceQuery = intelligenceQuery.eq(
        "neighborhood_id",
        resolved.neighborhood.id,
      );
    }

    let notesQuery = supabase
      .from("social_reality_notes")
      .select(
        "owner_kind, city_id, neighborhood_id, note_key, reality_category, title, traveler_summary, what_is_normal, what_is_rude, practical_guidance, examples, social_context, risk_level, source_label, source_url, reviewed_at, confidence_level, display_order, metadata, neighborhoods:neighborhood_id(id, slug)",
      )
      .eq("city_id", resolved.city.id)
      .eq("status", "published");
    if (resolved.neighborhood) {
      notesQuery = notesQuery.or(
        `owner_kind.eq.city,neighborhood_id.eq.${resolved.neighborhood.id}`,
      );
    }

    let relationshipsQuery = supabase
      .from("neighborhood_relationships")
      .select(
        "city_id, from_neighborhood_id, to_neighborhood_id, relationship_kind, traveler_summary, distance_note, practical_use, source_label, source_url, reviewed_at, confidence_level, display_order, metadata, from_neighborhood:from_neighborhood_id(id, slug), to_neighborhood:to_neighborhood_id(id, slug)",
      )
      .eq("city_id", resolved.city.id)
      .eq("status", "published");
    if (resolved.neighborhood) {
      relationshipsQuery = relationshipsQuery.or(
        `from_neighborhood_id.eq.${resolved.neighborhood.id},to_neighborhood_id.eq.${resolved.neighborhood.id}`,
      );
    }

    const [intelligenceResult, notesResult, relationshipsResult] =
      await Promise.all([intelligenceQuery, notesQuery, relationshipsQuery]);

    if (
      intelligenceResult.error ||
      notesResult.error ||
      relationshipsResult.error ||
      (!intelligenceResult.data?.length &&
        !notesResult.data?.length &&
        !relationshipsResult.data?.length)
    ) {
      return fallback;
    }

    return {
      neighborhood_intelligence: sortByDisplayOrder(
        ((intelligenceResult.data ?? []) as NeighborhoodIntelligenceRow[]).map(
          (row) => ({
            ...row,
            country_slug: countrySlug,
            city_slug: citySlug,
            neighborhood_slug:
              firstRow(row.neighborhoods)?.slug ?? neighborhoodSlug ?? "",
          }),
        ),
      ),
      social_reality_notes: sortByDisplayOrder(
        ((notesResult.data ?? []) as SocialRealityNoteRow[]).map((row) => ({
          ...row,
          country_slug: countrySlug,
          city_slug: citySlug,
          neighborhood_slug: row.neighborhood_id
            ? firstRow(row.neighborhoods)?.slug ?? neighborhoodSlug ?? null
            : null,
        })),
      ),
      neighborhood_relationships: sortByDisplayOrder(
        ((relationshipsResult.data ?? []) as NeighborhoodRelationshipRow[]).map(
          (row) => ({
            ...row,
            country_slug: countrySlug,
            city_slug: citySlug,
            from_neighborhood_slug: firstRow(row.from_neighborhood)?.slug ?? "",
            to_neighborhood_slug: firstRow(row.to_neighborhood)?.slug ?? "",
          }),
        ),
      ),
    };
  } catch {
    return fallback;
  }
}
