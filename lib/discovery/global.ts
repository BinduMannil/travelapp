import citiesJson from "./data/world-cities.json";
import countriesJson from "./data/world-countries.json";
import { buildSearchTokens } from "./scoring";
import type {
  DestinationCandidate,
  DestinationClimateMonth,
  DestinationScores,
  DestinationType,
} from "./types";

type GlobalCityRow = {
  name: string;
  lat: string;
  lng: string;
  country: string;
  admin1: string;
  admin2: string;
};

type GlobalCountryRow = {
  capital: string;
  continent: string;
  currency: string[];
  languages: string[];
  name: string;
  native: string;
  phone: number[];
  partOf?: string;
  userAssigned?: boolean;
};

export type GlobalCountrySummary = {
  slug: string;
  name: string;
  iso2: string;
  currency: string;
  coordinates?: { lat: number; lon: number };
  timezones: string[];
  cityCount: number;
};

export type GlobalCitySummary = {
  slug: string;
  name: string;
  countryIso2: string;
  countryName: string;
  stateCode: string;
  coordinates?: { lat: number; lon: number };
};

export type GlobalDestinationOptions = {
  countryIso2?: string;
  includeCountries?: boolean;
  includeCities?: boolean;
  limit?: number;
  searchQuery?: string;
};

export const GLOBAL_CITY_DATA_ATTRIBUTION =
  "Place data derived from GeoNames Gazetteer via cities.json, licensed under a Creative Commons attribution license.";

const MONTHS = Array.from({ length: 12 }, (_, index) => index + 1);
const GLOBAL_CITIES = citiesJson as GlobalCityRow[];
const COUNTRIES = countriesJson as Record<string, GlobalCountryRow>;
const COUNTRY_ENTRIES = Object.entries(COUNTRIES);
const COUNTRY_CITY_COUNTS = GLOBAL_CITIES.reduce<Record<string, number>>((counts, city) => {
  counts[city.country] = (counts[city.country] ?? 0) + 1;
  return counts;
}, {});
const CAPITAL_COORDINATES = new Map(
  COUNTRY_ENTRIES.flatMap(([iso2, country]) => {
    const capital = GLOBAL_CITIES.find(
      (city) => city.country === iso2 && city.name.toLowerCase() === country.capital.toLowerCase(),
    );
    const coords = coordinate(capital?.lat, capital?.lng);
    return coords ? ([[iso2, coords]] as const) : [];
  }),
);

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function coordinate(lat?: string | null, lon?: string | null) {
  const parsedLat = Number.parseFloat(lat ?? "");
  const parsedLon = Number.parseFloat(lon ?? "");
  if (!Number.isFinite(parsedLat) || !Number.isFinite(parsedLon)) return undefined;
  return { lat: parsedLat, lon: parsedLon };
}

function countrySlug(iso2: string, country: Pick<GlobalCountryRow, "name">) {
  return slugify(country.name) || iso2.toLowerCase();
}

function citySlug(city: GlobalCityRow) {
  return [city.name, city.admin1, city.country]
    .filter(Boolean)
    .map(slugify)
    .join("-");
}

function getCountryName(iso2: string) {
  return COUNTRIES[iso2]?.name ?? iso2;
}

function matchesSearch(values: string[], query?: string) {
  if (!query?.trim()) return true;
  const terms = buildSearchTokens(query);
  if (!terms.length) return true;
  const haystack = new Set(buildSearchTokens(values.join(" ")));
  return terms.every((term) => haystack.has(term));
}

function climateBand(lat = 0) {
  const absLat = Math.abs(lat);
  if (absLat < 23.5) return "tropical";
  if (absLat < 40) return "warm";
  if (absLat < 56) return "temperate";
  if (absLat < 67) return "cool";
  return "polar";
}

function buildClimate(coordinates?: { lat: number; lon: number }): DestinationClimateMonth[] {
  const lat = coordinates?.lat ?? 0;
  const absLat = Math.abs(lat);
  const seasonalSwing = Math.min(18, Math.max(2, absLat / 3));
  const baseHigh = absLat < 23.5 ? 30 : absLat < 40 ? 25 : absLat < 56 ? 18 : 9;
  const southernHemisphere = lat < 0;

  return MONTHS.map((month) => {
    const shiftedMonth = southernHemisphere ? ((month + 5) % 12) + 1 : month;
    const seasonalCurve = Math.cos(((shiftedMonth - 7) / 12) * Math.PI * 2);
    const avgHighC = Math.round(baseHigh + seasonalCurve * seasonalSwing);
    const humidityPct = absLat < 23.5 ? 74 : absLat < 40 ? 60 : 66;

    return {
      month,
      avgHighC,
      avgLowC: Math.round(avgHighC - (absLat < 23.5 ? 7 : 9)),
      precipMm: Math.round(absLat < 23.5 ? 150 : absLat < 40 ? 55 : 80),
      humidityPct,
      costIndex: 100,
    };
  });
}

function defaultScores(coordinates?: { lat: number; lon: number }): DestinationScores {
  const band = climateBand(coordinates?.lat);
  const warm = band === "tropical" || band === "warm";
  const cool = band === "cool" || band === "polar";

  return {
    beaches: warm ? 3 : 1,
    mountains: cool ? 3 : 2,
    food: 3,
    nightlife: 3,
    relaxation: 3,
    adventure: 3,
    safety: 3,
    family: 3,
    lgbtq: 3,
    cash: 3,
    card: 3,
    digitalNomad: 3,
    transport: 3,
    internet: 3,
    luxury: 3,
  };
}

function geoTags(coordinates?: { lat: number; lon: number }) {
  if (!coordinates) return ["global"];
  const tags = [climateBand(coordinates.lat)];
  tags.push(coordinates.lat >= 0 ? "northern-hemisphere" : "southern-hemisphere");
  if (Math.abs(coordinates.lat) < 23.5) tags.push("near-equator", "warm");
  return tags;
}

function countryToSummary(iso2: string, country: GlobalCountryRow): GlobalCountrySummary {
  return {
    slug: countrySlug(iso2, country),
    name: country.name,
    iso2,
    currency: country.currency[0] ?? "USD",
    coordinates: CAPITAL_COORDINATES.get(iso2),
    timezones: [],
    cityCount: COUNTRY_CITY_COUNTS[iso2] ?? 0,
  };
}

function cityToSummary(city: GlobalCityRow): GlobalCitySummary {
  return {
    slug: citySlug(city),
    name: city.name,
    countryIso2: city.country,
    countryName: getCountryName(city.country),
    stateCode: city.admin1,
    coordinates: coordinate(city.lat, city.lng),
  };
}

function countryToCandidate(iso2: string, country: GlobalCountryRow): DestinationCandidate {
  const coordinates = CAPITAL_COORDINATES.get(iso2);
  const slug = countrySlug(iso2, country);
  const currency = country.currency[0] ?? "USD";
  const tags = [
    "country",
    country.continent.toLowerCase(),
    currency.toLowerCase(),
    ...geoTags(coordinates),
  ];
  const types: DestinationType[] = ["culture", "nature"];
  const summary = `${country.name} country profile with ${currency} currency and ${COUNTRY_CITY_COUNTS[iso2] ?? 0} indexed cities.`;

  return {
    slug,
    name: country.name,
    countrySlug: slug,
    countryIso2: iso2,
    coordinates,
    types,
    tags,
    atmosphere: ["global"],
    budget: {
      currency,
      estimatedDailySpendMinor: 0,
      budgetLevel: 3,
      luxuryLevel: 3,
    },
    scores: defaultScores(coordinates),
    climate: buildClimate(coordinates),
    visaRules: [],
    search: {
      title: country.name,
      summary,
      tokens: buildSearchTokens([country.name, iso2, currency, country.capital, ...tags].join(" ")),
    },
  };
}

function cityToCandidate(city: GlobalCityRow): DestinationCandidate {
  const country = COUNTRIES[city.country];
  const countryName = country?.name ?? city.country;
  const coordinates = coordinate(city.lat, city.lng);
  const slug = citySlug(city);
  const tags = ["city", city.admin1.toLowerCase(), ...geoTags(coordinates)];
  const summary = `${city.name}, ${countryName} city profile from the global destination index.`;

  return {
    slug,
    name: city.name,
    countrySlug: country ? countrySlug(city.country, country) : slugify(countryName),
    countryIso2: city.country,
    citySlug: slug,
    coordinates,
    types: ["city", "culture"],
    tags,
    atmosphere: ["global"],
    budget: {
      currency: country?.currency[0] ?? "USD",
      estimatedDailySpendMinor: 0,
      budgetLevel: 3,
      luxuryLevel: 3,
    },
    scores: defaultScores(coordinates),
    climate: buildClimate(coordinates),
    visaRules: [],
    search: {
      title: `${city.name}, ${countryName}`,
      summary,
      tokens: buildSearchTokens(
        [city.name, city.admin1, countryName, city.country, ...tags].join(" "),
      ),
    },
  };
}

export function getGlobalCountries(options: Pick<GlobalDestinationOptions, "searchQuery"> = {}) {
  return COUNTRY_ENTRIES.filter(([iso2, country]) =>
    matchesSearch(
      [country.name, iso2, country.currency.join(" "), country.capital],
      options.searchQuery,
    ),
  )
    .map(([iso2, country]) => countryToSummary(iso2, country))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function getGlobalCityRows(
  options: Pick<GlobalDestinationOptions, "countryIso2" | "limit" | "searchQuery"> = {},
) {
  const cities = options.countryIso2
    ? GLOBAL_CITIES.filter((city) => city.country === options.countryIso2?.toUpperCase())
    : GLOBAL_CITIES;

  const filtered = cities
    .filter((city) =>
      matchesSearch(
        [city.name, city.admin1, city.country, getCountryName(city.country)],
        options.searchQuery,
      ),
    )
    .sort(
      (a, b) =>
        getCountryName(a.country).localeCompare(getCountryName(b.country)) ||
        a.name.localeCompare(b.name) ||
        a.admin1.localeCompare(b.admin1),
    );

  return options.limit ? filtered.slice(0, options.limit) : filtered;
}

export function getGlobalCities(
  options: Pick<GlobalDestinationOptions, "countryIso2" | "limit" | "searchQuery"> = {},
) {
  return getGlobalCityRows(options).map(cityToSummary);
}

export function getGlobalDestinationCandidates(
  options: GlobalDestinationOptions = {},
): DestinationCandidate[] {
  const includeCountries = options.includeCountries ?? true;
  const includeCities = options.includeCities ?? true;
  const countryCandidates = includeCountries
    ? COUNTRY_ENTRIES.filter(
        ([iso2, country]) =>
          (!options.countryIso2 ||
            iso2.toUpperCase() === options.countryIso2.toUpperCase()) &&
          matchesSearch(
            [country.name, iso2, country.currency.join(" "), country.capital],
            options.searchQuery,
          ),
        )
        .map(([iso2, country]) => countryToCandidate(iso2, country))
    : [];
  const cityCandidates = includeCities
    ? getGlobalCityRows(options).map(cityToCandidate)
    : [];

  const candidates = [...countryCandidates, ...cityCandidates].sort(
    (a, b) => a.countryIso2.localeCompare(b.countryIso2) || a.name.localeCompare(b.name),
  );

  return options.limit ? candidates.slice(0, options.limit) : candidates;
}
