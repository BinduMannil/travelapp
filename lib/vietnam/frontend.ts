import affiliateJson from "@/db/seed/vietnam/affiliate_opportunities.json";
import citiesJson from "@/db/seed/vietnam/cities.json";
import countryJson from "@/db/seed/vietnam/country.json";
import identityJson from "@/db/seed/vietnam/destination_identity.json";
import intelligenceJson from "@/db/seed/vietnam/intelligence_notes.json";
import localAppsJson from "@/db/seed/vietnam/local_apps.json";
import phrasebookJson from "@/db/seed/vietnam/phrasebook.json";
import priceJson from "@/db/seed/vietnam/price_benchmarks.json";
import activitiesJson from "@/db/seed/vietnam/travel_activities.json";

export type VietnamCity = (typeof citiesJson)[number];
export type VietnamIdentityProfile = (typeof identityJson.profiles)[number];

export const VIETNAM_COUNTRY = countryJson;
export const VIETNAM_CITIES = citiesJson as VietnamCity[];
export const VIETNAM_IDENTITY_PROFILES =
  identityJson.profiles as VietnamIdentityProfile[];
export const VIETNAM_LOCAL_APPS = localAppsJson.apps;
export const VIETNAM_PHRASES = phrasebookJson.phrases;
export const VIETNAM_PRICE_BENCHMARKS = priceJson.benchmarks;
export const VIETNAM_ACTIVITIES = activitiesJson.activities;
export const VIETNAM_ACTIVITY_DESTINATIONS = activitiesJson.destination_map;
export const VIETNAM_AFFILIATE_OPPORTUNITIES = affiliateJson.opportunities;
export const VIETNAM_INTELLIGENCE_NOTES = intelligenceJson.notes;

export const VIETNAM_CITY_IMAGES: Record<string, string> = {
  "ho-chi-minh-city":
    "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=2200&q=84",
  hanoi:
    "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=2200&q=84",
  "da-nang":
    "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=2200&q=84",
  "hoi-an":
    "https://images.unsplash.com/photo-1560113855-2ea616c915ee?auto=format&fit=crop&w=2200&q=84",
  hue:
    "https://images.unsplash.com/photo-1584441761015-c7447e8ef9cc?auto=format&fit=crop&w=2200&q=84",
  "nha-trang":
    "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=2200&q=84",
  "da-lat":
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=84",
  sapa:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=2200&q=84",
  "phu-quoc":
    "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=2200&q=84",
  "ha-long":
    "https://images.unsplash.com/photo-1669819894338-53ab7afc6958?auto=format&fit=crop&w=2200&q=84",
  "ninh-binh":
    "https://images.unsplash.com/photo-1690336501870-eab322a6ee2d?auto=format&fit=crop&w=2200&q=84",
  "can-tho":
    "https://images.unsplash.com/photo-1744760654110-c0befa6f57b3?auto=format&fit=crop&w=2200&q=84",
};

export const VIETNAM_COUNTRY_IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2600&q=86",
  street:
    "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1800&q=84",
  coffee:
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1800&q=84",
  beach:
    "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1800&q=84",
  mountain:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=84",
  food:
    "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=1800&q=84",
};

export function getVietnamCity(slug: string) {
  return VIETNAM_CITIES.find((city) => city.slug === slug) ?? null;
}

export function getVietnamIdentity(slug?: string) {
  return (
    VIETNAM_IDENTITY_PROFILES.find((profile) => profile.city_slug === slug) ??
    VIETNAM_IDENTITY_PROFILES.find((profile) => profile.owner_kind === "country")
  );
}

export function formatVnd(amount: number) {
  if (amount >= 1000000) return `${(amount / 1000000).toFixed(amount % 1000000 ? 1 : 0)}M VND`;
  return `${Math.round(amount / 1000)}k VND`;
}

export const VIETNAM_CITY_REGIONS: Record<string, string> = {
  "ho-chi-minh-city": "South",
  hanoi: "North",
  "da-nang": "Central coast",
  "hoi-an": "Central coast",
  hue: "Central heritage",
  "nha-trang": "South-central coast",
  "da-lat": "Central Highlands",
  sapa: "Northern mountains",
  "phu-quoc": "Island",
  "ha-long": "Northern coast",
  "ninh-binh": "Northern countryside",
  "can-tho": "Mekong Delta",
};
