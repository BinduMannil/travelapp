// Seed importer — reads db/seed/<country>/*.json and db/seed/<city>/*.json
// and upserts into Supabase using the service-role key.
//
// Usage: npm run seed
// Requires: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in env.

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

async function readJson<T>(path: string): Promise<T> {
  const raw = await readFile(path, "utf8");
  return JSON.parse(raw) as T;
}

type CountrySeed = {
  slug: string;
  name: string;
  iso2: string;
  iso3: string;
  default_currency: string;
  default_timezone: string;
  primary_languages: string[];
  summary?: string | null;
  hero_image_url?: string | null;
};

type CitySeed = {
  country_slug: string;
  slug: string;
  name: string;
  timezone?: string | null;
  lat?: number | null;
  lon?: number | null;
  default_currency?: string | null;
  summary?: string | null;
  hero_image_url?: string | null;
};

type NeighborhoodSeed = {
  slug: string;
  name: string;
  vibe: string[];
  best_for: string[];
  summary: string;
  description: string;
  transit_hubs: string[];
  display_order: number;
};

type AttractionSeed = {
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
  accessibility: Record<string, unknown>;
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

type RestaurantSeed = {
  slug: string;
  name: string;
  neighborhood: string;
  cuisine: string[];
  price_band: "$" | "$$" | "$$$" | "$$$$" | "$$$$$";
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

type LegalSocialRiskSeed = {
  country_slug: string;
  city_slug?: string | null;
  risk_category:
    | "social_media_online_speech"
    | "alcohol_public_behavior"
    | "public_conduct"
    | "lgbtq_relationships"
    | "drugs_medication_controlled_substances"
    | "police_official_interaction"
    | "immigration_entry"
    | "photography_filming"
    | "local_sensitivities";
  risk_level: "low" | "moderate" | "high" | "critical";
  traveler_summary: string;
  what_not_to_do: string[];
  practical_safe_behavior: string[];
  examples: string[];
  source_label: string;
  source_url: string;
  reviewed_at: string;
  confidence_level: "low" | "medium" | "high";
  legal_disclaimer: string;
  display_order: number;
  metadata?: Record<string, unknown>;
};

type LegalSocialRiskPayload = {
  risks: LegalSocialRiskSeed[];
};

type OwnerKind = "country" | "city";

type DestinationIdentitySeed = {
  owner_kind: OwnerKind;
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

type DestinationIdentityPayload = {
  profiles: DestinationIdentitySeed[];
};

type TravelActivitySeed = {
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

type DestinationActivitySeed = {
  owner_kind: OwnerKind;
  country_slug: string;
  city_slug?: string | null;
  activity_slug: string;
  relevance_level: "signature" | "recommended" | "available" | "niche";
  seasonality: string[];
  notes?: string | null;
  display_order: number;
  metadata?: Record<string, unknown>;
};

type TravelActivitiesPayload = {
  activities: TravelActivitySeed[];
  destination_map: DestinationActivitySeed[];
};

type PriceBenchmarkSeed = {
  owner_kind: OwnerKind;
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

type PriceBenchmarksPayload = {
  benchmarks: PriceBenchmarkSeed[];
};

type LocalAppSeed = {
  owner_kind: OwnerKind;
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

type LocalAppsPayload = {
  apps: LocalAppSeed[];
};

type PhrasebookSeed = {
  owner_kind: OwnerKind;
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

type PhrasebookPayload = {
  phrases: PhrasebookSeed[];
};

type DestinationIntelligenceSeed = {
  owner_kind: OwnerKind;
  country_slug: string;
  city_slug?: string | null;
  intelligence_category:
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

type DestinationIntelligencePayload = {
  notes: DestinationIntelligenceSeed[];
};

type AffiliateOpportunitySeed = {
  owner_kind: OwnerKind;
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

type AffiliateOpportunitiesPayload = {
  opportunities: AffiliateOpportunitySeed[];
};

type RowId = { id: string };

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function labelFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function upsertPlaceTag(
  supabase: SupabaseClient,
  slug: string,
  tagKind: string,
) {
  const { data, error } = await supabase
    .from("place_tags")
    .upsert(
      { slug, label: labelFromSlug(slug), tag_kind: tagKind },
      { onConflict: "slug" },
    )
    .select("id")
    .single<RowId>();

  if (error) throw error;
  return data.id;
}

async function replacePlaceTags(
  supabase: SupabaseClient,
  placeId: string,
  tags: Array<{ slug: string; tagKind: string }>,
) {
  const unique = Array.from(
    new Map(tags.map((tag) => [`${tag.tagKind}:${tag.slug}`, tag])).values(),
  );

  const { error: deleteErr } = await supabase
    .from("place_tag_map")
    .delete()
    .eq("place_id", placeId);
  if (deleteErr) throw deleteErr;

  if (!unique.length) return;

  const tagIds = await Promise.all(
    unique.map((tag) => upsertPlaceTag(supabase, tag.slug, tag.tagKind)),
  );
  const { error } = await supabase.from("place_tag_map").insert(
    tagIds.map((tagId) => ({ place_id: placeId, tag_id: tagId })),
  );
  if (error) throw error;
}

async function upsertPlaceExternalUrls(
  supabase: SupabaseClient,
  placeId: string,
  urls: Record<string, string | null | undefined>,
) {
  const rows = Object.entries(urls)
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([provider, url]) => ({
      place_id: placeId,
      provider,
      url,
    }));

  if (!rows.length) return;

  const { error } = await supabase
    .from("place_external_ids")
    .upsert(rows, { onConflict: "place_id,provider,url" });
  if (error) throw error;
}

function neighborhoodLookupKey(value: string): string {
  return slugify(value);
}

async function main() {
  const supabase = createClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { autoRefreshToken: false, persistSession: false } },
  );

  const root = resolve(process.cwd(), "db/seed");

  // --- Countries ---------------------------------------------------------
  const japan = await readJson<CountrySeed>(resolve(root, "japan/country.json"));
  const { data: countryRow, error: countryErr } = await supabase
    .from("countries")
    .upsert(japan, { onConflict: "slug" })
    .select("id, slug")
    .single();

  if (countryErr) throw countryErr;
  if (!countryRow) throw new Error("Country upsert returned no row");
  console.log(`Upserted country: ${countryRow.slug}`);

  // --- Cities ------------------------------------------------------------
  const tokyo = await readJson<CitySeed>(resolve(root, "tokyo/city.json"));
  const { country_slug, ...cityFields } = tokyo;
  const { data: country } = await supabase
    .from("countries")
    .select("id")
    .eq("slug", country_slug)
    .single();

  if (!country) throw new Error(`Country not found for slug: ${country_slug}`);

  const { data: cityRow, error: cityErr } = await supabase
    .from("cities")
    .upsert(
      { ...cityFields, country_id: country.id },
      { onConflict: "country_id,slug" },
    )
    .select("id, slug")
    .single();

  if (cityErr) throw cityErr;
  if (!cityRow) throw new Error("City upsert returned no row");
  const cityId = cityRow.id;
  console.log(`Upserted city: ${cityRow.slug}`);

  // --- Vietnam country + city pilot stack -------------------------------
  const vietnam = await readJson<CountrySeed>(
    resolve(root, "vietnam/country.json"),
  );
  const { data: vietnamCountryRow, error: vietnamCountryErr } = await supabase
    .from("countries")
    .upsert(vietnam, { onConflict: "slug" })
    .select("id, slug")
    .single();

  if (vietnamCountryErr) throw vietnamCountryErr;
  if (!vietnamCountryRow) {
    throw new Error("Vietnam country upsert returned no row");
  }
  console.log(`Upserted country: ${vietnamCountryRow.slug}`);

  const vietnamCities = await readJson<CitySeed[]>(
    resolve(root, "vietnam/cities.json"),
  );
  for (const vietnamCity of vietnamCities) {
    const { country_slug: vietnamCountrySlug, ...vietnamCityFields } = vietnamCity;
    if (vietnamCountrySlug !== vietnamCountryRow.slug) {
      throw new Error(`Unexpected Vietnam city country: ${vietnamCountrySlug}`);
    }
    const { error } = await supabase.from("cities").upsert(
      { ...vietnamCityFields, country_id: vietnamCountryRow.id },
      { onConflict: "country_id,slug" },
    );
    if (error) throw error;
  }
  console.log(`Upserted Vietnam cities: ${vietnamCities.length}`);

  async function resolveOwner(input: {
    owner_kind: OwnerKind;
    country_slug: string;
    city_slug?: string | null;
  }): Promise<{ countryId: string | null; cityId: string | null }> {
    const { data: ownerCountry, error: ownerCountryErr } = await supabase
      .from("countries")
      .select("id")
      .eq("slug", input.country_slug)
      .single<RowId>();
    if (ownerCountryErr) throw ownerCountryErr;
    if (!ownerCountry) {
      throw new Error(`Country not found for owner: ${input.country_slug}`);
    }

    if (input.owner_kind === "country") {
      return { countryId: ownerCountry.id, cityId: null };
    }

    if (!input.city_slug) {
      throw new Error(`Missing city_slug for city-owned seed row`);
    }

    const { data: ownerCity, error: ownerCityErr } = await supabase
      .from("cities")
      .select("id")
      .eq("country_id", ownerCountry.id)
      .eq("slug", input.city_slug)
      .single<RowId>();
    if (ownerCityErr) throw ownerCityErr;
    if (!ownerCity) {
      throw new Error(`City not found for owner: ${input.city_slug}`);
    }
    return { countryId: null, cityId: ownerCity.id };
  }

  async function deleteOwnerRows(
    table: string,
    owner: { owner_kind: OwnerKind; country_slug: string; city_slug?: string | null },
    extra: Record<string, string>,
  ) {
    const resolved = await resolveOwner(owner);
    let query = supabase.from(table).delete().eq("owner_kind", owner.owner_kind);
    query = resolved.countryId
      ? query.eq("country_id", resolved.countryId)
      : query.is("country_id", null);
    query = resolved.cityId
      ? query.eq("city_id", resolved.cityId)
      : query.is("city_id", null);
    for (const [key, value] of Object.entries(extra)) {
      query = query.eq(key, value);
    }
    const { error } = await query;
    if (error) throw error;
    return resolved;
  }

  // --- Neighborhoods -----------------------------------------------------
  const neighborhoods = await readJson<NeighborhoodSeed[]>(
    resolve(root, "tokyo/neighborhoods.json"),
  );
  const neighborhoodIds = new Map<string, string>();

  for (const neighborhood of neighborhoods) {
    const { data, error } = await supabase
      .from("neighborhoods")
      .upsert(
        {
          city_id: cityId,
          slug: neighborhood.slug,
          name: neighborhood.name,
          summary: neighborhood.summary,
          vibe: neighborhood.vibe,
          best_for: neighborhood.best_for,
          description: neighborhood.description,
          transit_hubs: neighborhood.transit_hubs,
          display_order: neighborhood.display_order,
        },
        { onConflict: "city_id,slug" },
      )
      .select("id, slug, name")
      .single<{ id: string; slug: string; name: string }>();

    if (error) throw error;
    neighborhoodIds.set(data.slug, data.id);
    neighborhoodIds.set(neighborhoodLookupKey(data.name), data.id);
  }

  console.log(`Upserted neighborhoods: ${neighborhoods.length}`);

  async function upsertPlace(input: {
    slug: string;
    name: string;
    entity_kind: string;
    category: string;
    neighborhood: string;
    summary?: string | null;
    description?: string | null;
    source?: string | null;
  }) {
    const neighborhoodId = neighborhoodIds.get(
      neighborhoodLookupKey(input.neighborhood),
    );
    const { data, error } = await supabase
      .from("places")
      .upsert(
        {
          city_id: cityId,
          neighborhood_id: neighborhoodId ?? null,
          slug: input.slug,
          name: input.name,
          entity_kind: input.entity_kind,
          category: input.category,
          summary: input.summary ?? null,
          description: input.description ?? null,
          status: "published",
          source: input.source ?? "seed",
        },
        { onConflict: "city_id,slug" },
      )
      .select("id")
      .single<RowId>();

    if (error) throw error;
    return data.id;
  }

  // --- Attractions -------------------------------------------------------
  const attractions = await readJson<AttractionSeed[]>(
    resolve(root, "tokyo/attractions.json"),
  );

  for (const attraction of attractions) {
    const placeId = await upsertPlace({
      slug: attraction.slug,
      name: attraction.name,
      entity_kind: "attraction",
      category: attraction.category,
      neighborhood: attraction.neighborhood,
      summary: attraction.summary,
      description: attraction.description,
      source: attraction.source,
    });

    const { error } = await supabase.from("attractions").upsert(
      {
        place_id: placeId,
        category: attraction.category,
        significance: attraction.significance,
        importance: attraction.importance,
        trip_type_slugs: attraction.trip_type_slugs,
        cost_adult_minor: attraction.cost_adult_minor,
        cost_child_minor: attraction.cost_child_minor,
        currency: attraction.currency,
        duration_minutes: attraction.duration_minutes,
        indoor: attraction.indoor,
        accessibility: attraction.accessibility,
        kid_friendly: attraction.kid_friendly,
        lgbtq_friendly: attraction.lgbtq_friendly,
        photography_allowed: attraction.photography_allowed,
        dress_code: attraction.dress_code,
        dress_notes: attraction.dress_notes,
        best_time_notes: attraction.best_time_notes ?? null,
        official_url: attraction.official_url,
        reseller_urls: attraction.reseller_urls,
        source: attraction.source,
      },
      { onConflict: "place_id" },
    );
    if (error) throw error;

    await replacePlaceTags(supabase, placeId, [
      { slug: attraction.category, tagKind: "category" },
      ...attraction.significance.map((slug) => ({
        slug,
        tagKind: "significance",
      })),
      ...attraction.tags.map((slug) => ({ slug, tagKind: "general" })),
      ...attraction.trip_type_slugs.map((slug) => ({
        slug,
        tagKind: "trip_type",
      })),
      ...(attraction.kid_friendly
        ? [{ slug: "kid-friendly", tagKind: "audience" }]
        : []),
      ...(attraction.lgbtq_friendly
        ? [{ slug: "lgbtq-friendly", tagKind: "audience" }]
        : []),
    ]);
    await upsertPlaceExternalUrls(supabase, placeId, {
      official: attraction.official_url,
      ...attraction.reseller_urls,
    });
  }

  console.log(`Upserted attractions: ${attractions.length}`);

  // --- Restaurants -------------------------------------------------------
  const restaurants = await readJson<RestaurantSeed[]>(
    resolve(root, "tokyo/restaurants.json"),
  );

  for (const restaurant of restaurants) {
    const placeId = await upsertPlace({
      slug: restaurant.slug,
      name: restaurant.name,
      entity_kind: "restaurant",
      category: restaurant.cuisine[0] ?? "restaurant",
      neighborhood: restaurant.neighborhood,
      summary: restaurant.notes ?? null,
      description: restaurant.notes ?? null,
      source: restaurant.source,
    });

    const { error } = await supabase.from("restaurants").upsert(
      {
        place_id: placeId,
        cuisine: restaurant.cuisine,
        price_band: restaurant.price_band,
        avg_price_per_person_minor: restaurant.avg_price_per_person_minor,
        currency: restaurant.currency,
        signature_dishes: restaurant.signature_dishes,
        reservation_required: restaurant.reservation_required,
        reservations_lead_time_days: restaurant.reservations_lead_time_days,
        reservation_url: restaurant.reservation_url,
        opening_hours: restaurant.opening_hours,
        closed_days: restaurant.closed_days,
        google_rating: restaurant.google_rating,
        google_review_count: restaurant.google_review_count,
        tabelog_score: restaurant.tabelog_score,
        michelin_stars: restaurant.michelin_stars,
        bib_gourmand: restaurant.bib_gourmand,
        dietary: restaurant.dietary,
        lgbtq_friendly: restaurant.lgbtq_friendly,
        kid_friendly: restaurant.kid_friendly,
        wheelchair_accessible: restaurant.wheelchair_accessible,
        notes: restaurant.notes ?? null,
        source: restaurant.source,
      },
      { onConflict: "place_id" },
    );
    if (error) throw error;

    await replacePlaceTags(supabase, placeId, [
      ...restaurant.cuisine.map((slug) => ({ slug, tagKind: "cuisine" })),
      ...restaurant.dietary.map((slug) => ({ slug, tagKind: "dietary" })),
      ...(restaurant.kid_friendly
        ? [{ slug: "kid-friendly", tagKind: "audience" }]
        : []),
      ...(restaurant.lgbtq_friendly
        ? [{ slug: "lgbtq-friendly", tagKind: "audience" }]
        : []),
      ...(restaurant.wheelchair_accessible
        ? [{ slug: "wheelchair-accessible", tagKind: "accessibility" }]
        : []),
    ]);
    await upsertPlaceExternalUrls(supabase, placeId, {
      reservation: restaurant.reservation_url,
    });
  }

  console.log(`Upserted restaurants: ${restaurants.length}`);

  // --- Legal & social risk intelligence --------------------------------
  const legalSocialRisks = await readJson<LegalSocialRiskPayload>(
    resolve(root, "japan/legal_social_risks.json"),
  );

  for (const risk of legalSocialRisks.risks) {
    const { data: riskCountry, error: riskCountryErr } = await supabase
      .from("countries")
      .select("id")
      .eq("slug", risk.country_slug)
      .single<RowId>();
    if (riskCountryErr) throw riskCountryErr;
    if (!riskCountry) {
      throw new Error(`Country not found for risk: ${risk.country_slug}`);
    }

    let riskCityId: string | null = null;
    if (risk.city_slug) {
      const { data: riskCity, error: riskCityErr } = await supabase
        .from("cities")
        .select("id")
        .eq("country_id", riskCountry.id)
        .eq("slug", risk.city_slug)
        .single<RowId>();
      if (riskCityErr) throw riskCityErr;
      if (!riskCity) {
        throw new Error(`City not found for risk: ${risk.city_slug}`);
      }
      riskCityId = riskCity.id;
    }

    let deleteQuery = supabase
      .from("legal_social_risks")
      .delete()
      .eq("country_id", riskCountry.id)
      .eq("risk_category", risk.risk_category);
    deleteQuery = riskCityId
      ? deleteQuery.eq("city_id", riskCityId)
      : deleteQuery.is("city_id", null);
    const { error: deleteErr } = await deleteQuery;
    if (deleteErr) throw deleteErr;

    const { error: insertErr } = await supabase
      .from("legal_social_risks")
      .insert({
        country_id: riskCountry.id,
        city_id: riskCityId,
        risk_category: risk.risk_category,
        risk_level: risk.risk_level,
        traveler_summary: risk.traveler_summary,
        what_not_to_do: risk.what_not_to_do,
        practical_safe_behavior: risk.practical_safe_behavior,
        examples: risk.examples,
        source_label: risk.source_label,
        source_url: risk.source_url,
        reviewed_at: risk.reviewed_at,
        confidence_level: risk.confidence_level,
        legal_disclaimer: risk.legal_disclaimer,
        display_order: risk.display_order,
        metadata: risk.metadata ?? {},
      });
    if (insertErr) throw insertErr;
  }

  console.log(`Upserted legal/social risks: ${legalSocialRisks.risks.length}`);

  // --- Destination identity profiles -----------------------------------
  const destinationIdentityPayloads = await Promise.all([
    readJson<DestinationIdentityPayload>(
      resolve(root, "japan/destination_identity.json"),
    ),
    readJson<DestinationIdentityPayload>(
      resolve(root, "vietnam/destination_identity.json"),
    ),
  ]);
  const destinationIdentity = {
    profiles: destinationIdentityPayloads.flatMap((payload) => payload.profiles),
  };

  for (const profile of destinationIdentity.profiles) {
    const owner = await deleteOwnerRows(
      "destination_identity_profiles",
      profile,
      {},
    );
    const { error } = await supabase
      .from("destination_identity_profiles")
      .insert({
        owner_kind: profile.owner_kind,
        country_id: owner.countryId,
        city_id: owner.cityId,
        palette_key: profile.palette_key,
        color_palette: profile.color_palette,
        script_style_key: profile.script_style_key ?? null,
        texture_key: profile.texture_key ?? null,
        background_style_key: profile.background_style_key ?? null,
        ambient_motion_key: profile.ambient_motion_key ?? null,
        icon_system_key: profile.icon_system_key ?? null,
        photography_mood: profile.photography_mood ?? null,
        accent_symbols: profile.accent_symbols,
        typography_notes: profile.typography_notes ?? null,
        source: profile.source ?? "seed",
        reviewed_at: profile.reviewed_at ?? null,
        metadata: profile.metadata ?? {},
      });
    if (error) throw error;
  }

  console.log(`Upserted identity profiles: ${destinationIdentity.profiles.length}`);

  // --- Travel activities taxonomy --------------------------------------
  const travelActivityPayloads = await Promise.all([
    readJson<TravelActivitiesPayload>(
      resolve(root, "japan/travel_activities.json"),
    ),
    readJson<TravelActivitiesPayload>(
      resolve(root, "vietnam/travel_activities.json"),
    ),
  ]);
  const travelActivities = {
    activities: travelActivityPayloads.flatMap((payload) => payload.activities),
    destination_map: travelActivityPayloads.flatMap(
      (payload) => payload.destination_map,
    ),
  };

  for (const activity of travelActivities.activities) {
    const { error } = await supabase.from("travel_activities").upsert(
      {
        slug: activity.slug,
        label: activity.label,
        activity_group: activity.activity_group,
        description: activity.description ?? null,
        traveler_types: activity.traveler_types,
        intensity: activity.intensity ?? null,
        indoor: activity.indoor ?? null,
        family_friendly: activity.family_friendly ?? null,
        display_order: activity.display_order,
        metadata: activity.metadata ?? {},
      },
      { onConflict: "slug" },
    );
    if (error) throw error;
  }

  for (const mapRow of travelActivities.destination_map) {
    const { data: activityRow, error: activityErr } = await supabase
      .from("travel_activities")
      .select("id")
      .eq("slug", mapRow.activity_slug)
      .single<RowId>();
    if (activityErr) throw activityErr;
    if (!activityRow) {
      throw new Error(`Activity not found for map: ${mapRow.activity_slug}`);
    }

    const owner = await deleteOwnerRows("destination_activity_map", mapRow, {
      activity_id: activityRow.id,
    });
    const { error } = await supabase.from("destination_activity_map").insert({
      activity_id: activityRow.id,
      owner_kind: mapRow.owner_kind,
      country_id: owner.countryId,
      city_id: owner.cityId,
      relevance_level: mapRow.relevance_level,
      seasonality: mapRow.seasonality,
      notes: mapRow.notes ?? null,
      display_order: mapRow.display_order,
      metadata: mapRow.metadata ?? {},
    });
    if (error) throw error;
  }

  console.log(
    `Upserted travel activities: ${travelActivities.activities.length}; mapped: ${travelActivities.destination_map.length}`,
  );

  // --- Price benchmarks -------------------------------------------------
  const priceBenchmarkPayloads = await Promise.all([
    readJson<PriceBenchmarksPayload>(
      resolve(root, "tokyo/price_benchmarks.json"),
    ),
    readJson<PriceBenchmarksPayload>(
      resolve(root, "vietnam/price_benchmarks.json"),
    ),
  ]);
  const priceBenchmarks = {
    benchmarks: priceBenchmarkPayloads.flatMap((payload) => payload.benchmarks),
  };

  for (const benchmark of priceBenchmarks.benchmarks) {
    const owner = await deleteOwnerRows("price_benchmarks", benchmark, {
      benchmark_key: benchmark.benchmark_key,
    });
    const { error } = await supabase.from("price_benchmarks").insert({
      owner_kind: benchmark.owner_kind,
      country_id: owner.countryId,
      city_id: owner.cityId,
      benchmark_key: benchmark.benchmark_key,
      category: benchmark.category,
      label: benchmark.label,
      amount_low_minor: benchmark.amount_low_minor ?? null,
      amount_typical_minor: benchmark.amount_typical_minor,
      amount_high_minor: benchmark.amount_high_minor ?? null,
      currency: benchmark.currency,
      unit: benchmark.unit,
      traveler_context: benchmark.traveler_context ?? null,
      notes: benchmark.notes ?? null,
      source_label: benchmark.source_label ?? null,
      source_url: benchmark.source_url ?? null,
      reviewed_at: benchmark.reviewed_at ?? null,
      confidence_level: benchmark.confidence_level,
      display_order: benchmark.display_order,
      metadata: benchmark.metadata ?? {},
    });
    if (error) throw error;
  }

  console.log(`Upserted price benchmarks: ${priceBenchmarks.benchmarks.length}`);

  // --- Local apps directory --------------------------------------------
  const localAppPayloads = await Promise.all([
    readJson<LocalAppsPayload>(resolve(root, "tokyo/local_apps.json")),
    readJson<LocalAppsPayload>(resolve(root, "vietnam/local_apps.json")),
  ]);
  const localApps = {
    apps: localAppPayloads.flatMap((payload) => payload.apps),
  };

  for (const app of localApps.apps) {
    const owner = await deleteOwnerRows("local_apps", app, { slug: app.slug });
    const { error } = await supabase.from("local_apps").insert({
      owner_kind: app.owner_kind,
      country_id: owner.countryId,
      city_id: owner.cityId,
      slug: app.slug,
      name: app.name,
      category: app.category,
      purpose: app.purpose,
      free: app.free,
      ios_url: app.ios_url ?? null,
      android_url: app.android_url ?? null,
      web_url: app.web_url ?? null,
      offline_useful: app.offline_useful,
      setup_before_arrival: app.setup_before_arrival,
      traveler_notes: app.traveler_notes ?? null,
      display_order: app.display_order,
      metadata: app.metadata ?? {},
    });
    if (error) throw error;
  }

  console.log(`Upserted local apps: ${localApps.apps.length}`);

  // --- Phrasebook -------------------------------------------------------
  const phrasebookPayloads = await Promise.all([
    readJson<PhrasebookPayload>(resolve(root, "japan/phrasebook.json")),
    readJson<PhrasebookPayload>(resolve(root, "vietnam/phrasebook.json")),
  ]);
  const phrasebook = {
    phrases: phrasebookPayloads.flatMap((payload) => payload.phrases),
  };

  for (const phrase of phrasebook.phrases) {
    const owner = await deleteOwnerRows("phrasebook_entries", phrase, {
      phrase_key: phrase.phrase_key,
    });
    const { error } = await supabase.from("phrasebook_entries").insert({
      owner_kind: phrase.owner_kind,
      country_id: owner.countryId,
      city_id: owner.cityId,
      phrase_key: phrase.phrase_key,
      category: phrase.category,
      source_language: phrase.source_language,
      target_language: phrase.target_language,
      source_text: phrase.source_text,
      translated_text: phrase.translated_text,
      transliteration: phrase.transliteration ?? null,
      literal_translation: phrase.literal_translation ?? null,
      usage_notes: phrase.usage_notes ?? null,
      formality: phrase.formality ?? null,
      audio_url: phrase.audio_url ?? null,
      display_order: phrase.display_order,
      metadata: phrase.metadata ?? {},
    });
    if (error) throw error;
  }

  console.log(`Upserted phrasebook entries: ${phrasebook.phrases.length}`);

  // --- Destination intelligence notes ----------------------------------
  const intelligenceNotes = await readJson<DestinationIntelligencePayload>(
    resolve(root, "vietnam/intelligence_notes.json"),
  );

  for (const note of intelligenceNotes.notes) {
    const owner = await deleteOwnerRows(
      "destination_intelligence_notes",
      note,
      {
        intelligence_category: note.intelligence_category,
        title: note.title,
      },
    );
    const { error } = await supabase
      .from("destination_intelligence_notes")
      .insert({
        owner_kind: note.owner_kind,
        country_id: owner.countryId,
        city_id: owner.cityId,
        intelligence_category: note.intelligence_category,
        risk_level: note.risk_level ?? null,
        title: note.title,
        traveler_summary: note.traveler_summary,
        practical_guidance: note.practical_guidance,
        watchouts: note.watchouts,
        examples: note.examples,
        source_label: note.source_label ?? null,
        source_url: note.source_url ?? null,
        reviewed_at: note.reviewed_at ?? null,
        confidence_level: note.confidence_level,
        display_order: note.display_order,
        metadata: note.metadata ?? {},
      });
    if (error) throw error;
  }

  console.log(`Upserted intelligence notes: ${intelligenceNotes.notes.length}`);

  // --- Affiliate opportunities -----------------------------------------
  const affiliateOpportunities = await readJson<AffiliateOpportunitiesPayload>(
    resolve(root, "vietnam/affiliate_opportunities.json"),
  );

  for (const opportunity of affiliateOpportunities.opportunities) {
    const owner = await deleteOwnerRows(
      "destination_affiliate_opportunities",
      opportunity,
      { opportunity_key: opportunity.opportunity_key },
    );
    const { error } = await supabase
      .from("destination_affiliate_opportunities")
      .insert({
        owner_kind: opportunity.owner_kind,
        country_id: owner.countryId,
        city_id: owner.cityId,
        opportunity_key: opportunity.opportunity_key,
        category: opportunity.category,
        traveler_need: opportunity.traveler_need,
        recommended_partner_keys: opportunity.recommended_partner_keys,
        placement_context: opportunity.placement_context,
        priority: opportunity.priority,
        notes: opportunity.notes ?? null,
        display_order: opportunity.display_order,
        metadata: opportunity.metadata ?? {},
      });
    if (error) throw error;
  }

  console.log(
    `Upserted affiliate opportunities: ${affiliateOpportunities.opportunities.length}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
