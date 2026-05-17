// Supabase-first compatibility accessors for the canonical place/entity layer.
//
// These functions intentionally return the same frontend-facing shapes as the
// JSON seed helpers. Existing pages can keep using lib/data/seed.ts until each
// route is migrated; new backend-aware routes can call these and still get JSON
// fallback behavior when Supabase is not configured or not yet seeded.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  getAttraction as getSeedAttraction,
  getAttractions as getSeedAttractions,
  getNeighborhood as getSeedNeighborhood,
  getNeighborhoods as getSeedNeighborhoods,
  getRestaurant as getSeedRestaurant,
  getRestaurants as getSeedRestaurants,
  popularityScore,
  type Attraction,
  type Neighborhood,
  type Restaurant,
} from "@/lib/data/seed";

type CityRow = {
  id: string;
};

type NeighborhoodRow = {
  id: string;
  slug: string;
  name: string;
  summary: string | null;
  vibe: string[];
  best_for: string[];
  description: string | null;
  transit_hubs: string[];
  display_order: number;
};

type PlaceRow = {
  id: string;
  slug: string;
  name: string;
  neighborhood_id: string | null;
  category: string | null;
  summary: string | null;
  description: string | null;
  source: string;
};

type AttractionRow = {
  place_id: string;
  category: string;
  significance: string[];
  importance: number;
  trip_type_slugs: string[];
  cost_adult_minor: number;
  cost_child_minor: number;
  currency: string;
  duration_minutes: number | null;
  indoor: boolean;
  accessibility: Attraction["accessibility"];
  kid_friendly: boolean;
  lgbtq_friendly: boolean;
  photography_allowed: boolean;
  dress_code: string | null;
  dress_notes: string | null;
  best_time_notes: string | null;
  official_url: string | null;
  reseller_urls: Record<string, string>;
  source: string;
};

type RestaurantRow = {
  place_id: string;
  cuisine: string[];
  price_band: Restaurant["price_band"];
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
  notes: string | null;
  source: string;
};

type TagMapRow = {
  place_id: string;
  place_tags: { slug: string; tag_kind: string } | Array<{ slug: string; tag_kind: string }> | null;
};

function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function getCityId(
  supabase: SupabaseClient,
  citySlug: string,
): Promise<string | null> {
  const { data, error } = await supabase
    .from("cities")
    .select("id")
    .eq("slug", citySlug)
    .single<CityRow>();

  if (error || !data) return null;
  return data.id;
}

async function getNeighborhoodRows(
  supabase: SupabaseClient,
  cityId: string,
): Promise<NeighborhoodRow[]> {
  const { data, error } = await supabase
    .from("neighborhoods")
    .select(
      "id, slug, name, summary, vibe, best_for, description, transit_hubs, display_order",
    )
    .eq("city_id", cityId)
    .order("display_order", { ascending: true });

  if (error || !data) return [];
  return data as NeighborhoodRow[];
}

async function getPlaceRows(
  supabase: SupabaseClient,
  cityId: string,
  entityKind: "attraction" | "restaurant",
): Promise<PlaceRow[]> {
  const { data, error } = await supabase
    .from("places")
    .select("id, slug, name, neighborhood_id, category, summary, description, source")
    .eq("city_id", cityId)
    .eq("entity_kind", entityKind)
    .eq("status", "published");

  if (error || !data) return [];
  return data as PlaceRow[];
}

async function getTagsByPlace(
  supabase: SupabaseClient,
  placeIds: string[],
  tagKind?: string,
): Promise<Map<string, string[]>> {
  if (!placeIds.length) return new Map();

  const { data, error } = await supabase
    .from("place_tag_map")
    .select("place_id, place_tags(slug, tag_kind)")
    .in("place_id", placeIds);

  if (error || !data) return new Map();

  const out = new Map<string, string[]>();
  for (const row of data as unknown as TagMapRow[]) {
    const tag = Array.isArray(row.place_tags)
      ? row.place_tags[0]
      : row.place_tags;
    if (!tag || (tagKind && tag.tag_kind !== tagKind)) continue;
    const values = out.get(row.place_id) ?? [];
    values.push(tag.slug);
    out.set(row.place_id, values);
  }
  return out;
}

function toNeighborhood(row: NeighborhoodRow): Neighborhood {
  return {
    slug: row.slug,
    name: row.name,
    vibe: row.vibe,
    best_for: row.best_for,
    summary: row.summary ?? "",
    description: row.description ?? row.summary ?? "",
    transit_hubs: row.transit_hubs,
    display_order: row.display_order,
  };
}

function buildNeighborhoodNameMap(rows: NeighborhoodRow[]) {
  return new Map(rows.map((row) => [row.id, row.name]));
}

export async function getNeighborhoodsLive(
  citySlug: string,
): Promise<Neighborhood[]> {
  const supabase = getSupabase();
  if (!supabase) return getSeedNeighborhoods(citySlug);

  try {
    const cityId = await getCityId(supabase, citySlug);
    if (!cityId) return getSeedNeighborhoods(citySlug);
    const rows = await getNeighborhoodRows(supabase, cityId);
    if (!rows.length) return getSeedNeighborhoods(citySlug);
    return rows.map(toNeighborhood);
  } catch {
    return getSeedNeighborhoods(citySlug);
  }
}

export async function getNeighborhoodLive(
  citySlug: string,
  neighborhoodSlug: string,
): Promise<Neighborhood | null> {
  const neighborhoods = await getNeighborhoodsLive(citySlug);
  return (
    neighborhoods.find((neighborhood) => neighborhood.slug === neighborhoodSlug) ??
    getSeedNeighborhood(citySlug, neighborhoodSlug)
  );
}

export async function getAttractionsLive(citySlug: string): Promise<Attraction[]> {
  const supabase = getSupabase();
  if (!supabase) return getSeedAttractions(citySlug);

  try {
    const cityId = await getCityId(supabase, citySlug);
    if (!cityId) return getSeedAttractions(citySlug);

    const [neighborhoodRows, placeRows] = await Promise.all([
      getNeighborhoodRows(supabase, cityId),
      getPlaceRows(supabase, cityId, "attraction"),
    ]);
    if (!placeRows.length) return getSeedAttractions(citySlug);

    const placeIds = placeRows.map((place) => place.id);
    const [{ data, error }, tagsByPlace] = await Promise.all([
      supabase.from("attractions").select("*").in("place_id", placeIds),
      getTagsByPlace(supabase, placeIds, "general"),
    ]);
    if (error || !data) return getSeedAttractions(citySlug);

    const neighborhoodsById = buildNeighborhoodNameMap(neighborhoodRows);
    const placesById = new Map(placeRows.map((place) => [place.id, place]));

    const attractions: Attraction[] = [];
    for (const row of data as AttractionRow[]) {
        const place = placesById.get(row.place_id);
        if (!place) continue;
        attractions.push({
          slug: place.slug,
          name: place.name,
          neighborhood: place.neighborhood_id
            ? neighborhoodsById.get(place.neighborhood_id) ?? ""
            : "",
          category: row.category,
          significance: row.significance,
          importance: row.importance,
          tags: tagsByPlace.get(row.place_id) ?? [],
          trip_type_slugs: row.trip_type_slugs,
          cost_adult_minor: row.cost_adult_minor,
          cost_child_minor: row.cost_child_minor,
          currency: row.currency,
          duration_minutes: row.duration_minutes ?? 0,
          indoor: row.indoor,
          accessibility: row.accessibility,
          kid_friendly: row.kid_friendly,
          lgbtq_friendly: row.lgbtq_friendly,
          photography_allowed: row.photography_allowed,
          dress_code: row.dress_code,
          dress_notes: row.dress_notes,
          best_time_notes: row.best_time_notes,
          summary: place.summary ?? "",
          description: place.description ?? place.summary ?? "",
          official_url: row.official_url,
          reseller_urls: row.reseller_urls,
          source: row.source,
        });
    }

    return attractions.sort(
      (a, b) => b.importance - a.importance || a.name.localeCompare(b.name),
    );
  } catch {
    return getSeedAttractions(citySlug);
  }
}

export async function getAttractionLive(
  citySlug: string,
  attractionSlug: string,
): Promise<Attraction | null> {
  const attractions = await getAttractionsLive(citySlug);
  return (
    attractions.find((attraction) => attraction.slug === attractionSlug) ??
    getSeedAttraction(citySlug, attractionSlug)
  );
}

export async function getRestaurantsLive(citySlug: string): Promise<Restaurant[]> {
  const supabase = getSupabase();
  if (!supabase) return getSeedRestaurants(citySlug);

  try {
    const cityId = await getCityId(supabase, citySlug);
    if (!cityId) return getSeedRestaurants(citySlug);

    const [neighborhoodRows, placeRows] = await Promise.all([
      getNeighborhoodRows(supabase, cityId),
      getPlaceRows(supabase, cityId, "restaurant"),
    ]);
    if (!placeRows.length) return getSeedRestaurants(citySlug);

    const placeIds = placeRows.map((place) => place.id);
    const { data, error } = await supabase
      .from("restaurants")
      .select("*")
      .in("place_id", placeIds);
    if (error || !data) return getSeedRestaurants(citySlug);

    const neighborhoodsById = buildNeighborhoodNameMap(neighborhoodRows);
    const placesById = new Map(placeRows.map((place) => [place.id, place]));

    const restaurants: Restaurant[] = [];
    for (const row of data as RestaurantRow[]) {
        const place = placesById.get(row.place_id);
        if (!place) continue;
        restaurants.push({
          slug: place.slug,
          name: place.name,
          neighborhood: place.neighborhood_id
            ? neighborhoodsById.get(place.neighborhood_id) ?? ""
            : "",
          cuisine: row.cuisine,
          price_band: row.price_band,
          avg_price_per_person_minor: row.avg_price_per_person_minor,
          currency: row.currency,
          signature_dishes: row.signature_dishes,
          reservation_required: row.reservation_required,
          reservations_lead_time_days: row.reservations_lead_time_days,
          reservation_url: row.reservation_url,
          opening_hours: row.opening_hours,
          closed_days: row.closed_days,
          google_rating: row.google_rating,
          google_review_count: row.google_review_count,
          tabelog_score: row.tabelog_score,
          michelin_stars: row.michelin_stars,
          bib_gourmand: row.bib_gourmand,
          dietary: row.dietary,
          lgbtq_friendly: row.lgbtq_friendly,
          kid_friendly: row.kid_friendly,
          wheelchair_accessible: row.wheelchair_accessible,
          notes: row.notes,
          source: row.source,
        });
    }

    return restaurants.sort((a, b) => popularityScore(b) - popularityScore(a));
  } catch {
    return getSeedRestaurants(citySlug);
  }
}

export async function getRestaurantLive(
  citySlug: string,
  restaurantSlug: string,
): Promise<Restaurant | null> {
  const restaurants = await getRestaurantsLive(citySlug);
  return (
    restaurants.find((restaurant) => restaurant.slug === restaurantSlug) ??
    getSeedRestaurant(citySlug, restaurantSlug)
  );
}
