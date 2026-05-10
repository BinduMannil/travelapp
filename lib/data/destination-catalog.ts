// Supabase-first destination catalog accessors with JSON fallback.
// This keeps Vietnam/Japan country and city bootstrap data available without
// changing existing JSON-backed frontend routes.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import japanCountryJson from "@/db/seed/japan/country.json";
import tokyoCityJson from "@/db/seed/tokyo/city.json";
import vietnamCountryJson from "@/db/seed/vietnam/country.json";
import vietnamCitiesJson from "@/db/seed/vietnam/cities.json";

export type DestinationCountry = {
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

export type DestinationCity = {
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

type CountryRow = DestinationCountry & { id: string };
type CityRow = Omit<DestinationCity, "country_slug"> & {
  countries: { slug: string } | Array<{ slug: string }> | null;
};

const COUNTRY_SEEDS: Record<string, DestinationCountry> = {
  japan: japanCountryJson as DestinationCountry,
  vietnam: vietnamCountryJson as DestinationCountry,
};

const CITY_SEEDS: Record<string, DestinationCity> = {
  tokyo: tokyoCityJson as DestinationCity,
  ...(vietnamCitiesJson as DestinationCity[]).reduce<Record<string, DestinationCity>>(
    (acc, city) => {
      acc[city.slug] = city;
      return acc;
    },
    {},
  ),
};

function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function countrySlugFromJoin(
  countries: CityRow["countries"],
): string | null {
  if (!countries) return null;
  return Array.isArray(countries) ? countries[0]?.slug ?? null : countries.slug;
}

export function getDestinationCountrySeed(
  countrySlug: string,
): DestinationCountry | null {
  return COUNTRY_SEEDS[countrySlug] ?? null;
}

export function getDestinationCitiesSeed(
  countrySlug: string,
): DestinationCity[] {
  return Object.values(CITY_SEEDS).filter(
    (city) => city.country_slug === countrySlug,
  );
}

export async function getDestinationCountryLive(
  countrySlug: string,
): Promise<DestinationCountry | null> {
  const supabase = getSupabase();
  if (!supabase) return getDestinationCountrySeed(countrySlug);

  const { data, error } = await supabase
    .from("countries")
    .select(
      "id, slug, name, iso2, iso3, default_currency, default_timezone, primary_languages, summary, hero_image_url",
    )
    .eq("slug", countrySlug)
    .single<CountryRow>();
  if (error || !data) return getDestinationCountrySeed(countrySlug);

  const { id: _id, ...country } = data;
  return country;
}

export async function getDestinationCitiesLive(
  countrySlug: string,
): Promise<DestinationCity[]> {
  const supabase = getSupabase();
  if (!supabase) return getDestinationCitiesSeed(countrySlug);

  const { data, error } = await supabase
    .from("cities")
    .select(
      "slug, name, timezone, lat, lon, default_currency, hero_image_url, summary, countries(slug)",
    )
    .eq("countries.slug", countrySlug)
    .order("name", { ascending: true });
  if (error || !data?.length) return getDestinationCitiesSeed(countrySlug);

  return (data as unknown as CityRow[])
    .map((city) => {
      const joinedCountrySlug = countrySlugFromJoin(city.countries);
      if (!joinedCountrySlug) return null;
      const { countries: _countries, ...fields } = city;
      return { ...fields, country_slug: joinedCountrySlug };
    })
    .filter((city): city is DestinationCity => city !== null);
}
