// Legal & social risk intelligence accessors.
//
// This layer is traveler-facing risk awareness, not formal legal advice. It is
// intentionally separate from visa and health/safety content so pages can show
// "Know Before You Go" sections without changing existing JSON-backed routes.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import japanLegalSocialRisksJson from "@/db/seed/japan/legal_social_risks.json";

export type LegalSocialRiskCategory =
  | "social_media_online_speech"
  | "alcohol_public_behavior"
  | "public_conduct"
  | "lgbtq_relationships"
  | "drugs_medication_controlled_substances"
  | "police_official_interaction"
  | "immigration_entry"
  | "photography_filming"
  | "local_sensitivities";

export type LegalSocialRiskLevel = "low" | "moderate" | "high" | "critical";
export type LegalSocialRiskConfidence = "low" | "medium" | "high";

export type LegalSocialRisk = {
  country_slug: string;
  city_slug?: string | null;
  risk_category: LegalSocialRiskCategory;
  risk_level: LegalSocialRiskLevel;
  traveler_summary: string;
  what_not_to_do: string[];
  practical_safe_behavior: string[];
  examples: string[];
  source_label: string;
  source_url: string;
  reviewed_at: string;
  last_updated?: string;
  confidence_level: LegalSocialRiskConfidence;
  legal_disclaimer: string;
  display_order: number;
  metadata?: Record<string, unknown>;
};

type LegalSocialRiskPayload = {
  risks: LegalSocialRisk[];
};

type CountryRow = {
  id: string;
  slug: string;
};

type CityRow = {
  id: string;
  slug: string;
};

type LegalSocialRiskRow = Omit<LegalSocialRisk, "country_slug" | "city_slug"> & {
  country_id: string;
  city_id: string | null;
  last_updated: string;
};

const COUNTRY_RISK_SEEDS: Record<string, LegalSocialRiskPayload> = {
  japan: japanLegalSocialRisksJson as LegalSocialRiskPayload,
};

export const LEGAL_SOCIAL_RISK_CATEGORY_LABELS: Record<
  LegalSocialRiskCategory,
  string
> = {
  social_media_online_speech: "Social Media Risk",
  alcohol_public_behavior: "Alcohol & Public Conduct",
  public_conduct: "Public Conduct",
  lgbtq_relationships: "LGBTQ+ & Relationship Risks",
  drugs_medication_controlled_substances: "Medication & Restricted Items",
  police_official_interaction: "Police & Immigration",
  immigration_entry: "Immigration & Entry Risk",
  photography_filming: "Photography Rules",
  local_sensitivities: "Local Sensitivity Warnings",
};

export const LEGAL_SOCIAL_RISK_PAGE_SECTIONS = [
  "Know Before You Go",
  "Things That Can Get You In Trouble",
  "Social Media Risk",
  "Alcohol & Public Conduct",
  "Photography Rules",
  "Police & Immigration",
  "Medication & Restricted Items",
] as const;

function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function mergeCountryAndCityRisks(rows: LegalSocialRisk[]): LegalSocialRisk[] {
  const byCategory = new Map<LegalSocialRiskCategory, LegalSocialRisk>();
  for (const row of rows) {
    byCategory.set(row.risk_category, row);
  }
  return Array.from(byCategory.values()).sort(
    (a, b) => a.display_order - b.display_order,
  );
}

export function getLegalSocialRisksSeed({
  countrySlug,
  citySlug,
}: {
  countrySlug: string;
  citySlug?: string | null;
}): LegalSocialRisk[] {
  const payload = COUNTRY_RISK_SEEDS[countrySlug];
  if (!payload) return [];

  const countryRows = payload.risks.filter(
    (risk) => risk.country_slug === countrySlug && !risk.city_slug,
  );
  const cityRows = citySlug
    ? payload.risks.filter(
        (risk) =>
          risk.country_slug === countrySlug && risk.city_slug === citySlug,
      )
    : [];

  return mergeCountryAndCityRisks([...countryRows, ...cityRows]);
}

export async function getLegalSocialRisksLive({
  countrySlug,
  citySlug,
}: {
  countrySlug: string;
  citySlug?: string | null;
}): Promise<LegalSocialRisk[]> {
  const supabase = getSupabase();
  if (!supabase) return getLegalSocialRisksSeed({ countrySlug, citySlug });

  try {
    const { data: country, error: countryErr } = await supabase
      .from("countries")
      .select("id, slug")
      .eq("slug", countrySlug)
      .single<CountryRow>();
    if (countryErr || !country) {
      return getLegalSocialRisksSeed({ countrySlug, citySlug });
    }

    let city: CityRow | null = null;
    if (citySlug) {
      const { data: cityData, error: cityErr } = await supabase
        .from("cities")
        .select("id, slug")
        .eq("country_id", country.id)
        .eq("slug", citySlug)
        .single<CityRow>();
      if (!cityErr && cityData) city = cityData;
    }

    const cityIds = city ? [city.id] : [];
    const { data, error } = await supabase
      .from("legal_social_risks")
      .select(
        "country_id, city_id, risk_category, risk_level, traveler_summary, what_not_to_do, practical_safe_behavior, examples, source_label, source_url, reviewed_at, last_updated, confidence_level, legal_disclaimer, display_order, metadata",
      )
      .eq("country_id", country.id)
      .or(
        cityIds.length
          ? `city_id.is.null,city_id.in.(${cityIds.join(",")})`
          : "city_id.is.null",
      )
      .eq("status", "published");

    if (error || !data) {
      return getLegalSocialRisksSeed({ countrySlug, citySlug });
    }

    const risks = (data as LegalSocialRiskRow[]).map((row) => ({
      country_slug: country.slug,
      city_slug: row.city_id && city?.id === row.city_id ? city.slug : null,
      risk_category: row.risk_category,
      risk_level: row.risk_level,
      traveler_summary: row.traveler_summary,
      what_not_to_do: row.what_not_to_do,
      practical_safe_behavior: row.practical_safe_behavior,
      examples: row.examples,
      source_label: row.source_label,
      source_url: row.source_url,
      reviewed_at: row.reviewed_at,
      last_updated: row.last_updated,
      confidence_level: row.confidence_level,
      legal_disclaimer: row.legal_disclaimer,
      display_order: row.display_order,
      metadata: row.metadata,
    }));

    return risks.length
      ? mergeCountryAndCityRisks(risks)
      : getLegalSocialRisksSeed({ countrySlug, citySlug });
  } catch {
    return getLegalSocialRisksSeed({ countrySlug, citySlug });
  }
}
