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
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
