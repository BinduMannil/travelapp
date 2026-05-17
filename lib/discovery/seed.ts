import {
  getCity,
  getClimate,
  getCountry,
  getCountryConnectivity,
  getCountryForCity,
  getCountryHealthSafety,
  getCountryPayments,
  getHotels,
  getInterCityRoutes,
  getPriceItems,
  getRestaurants,
  getTransitOptions,
  getVisaRuleset,
} from "@/lib/data/seed";
import { buildSearchTokens } from "./scoring";
import type {
  DestinationCandidate,
  DestinationScores,
  NearbyDestinationCandidate,
} from "./types";

function rating(value: number) {
  return Math.max(0, Math.min(5, Math.round(value))) as 0 | 1 | 2 | 3 | 4 | 5;
}

function scoreAcceptedLevel(level: string) {
  if (level === "ubiquitous") return 5;
  if (level === "common") return 4;
  if (level === "limited") return 2;
  return 1;
}

function estimateDailySpendMinor(citySlug: string) {
  const priceItems = getPriceItems(citySlug);
  const hotels = getHotels(citySlug);
  const casualMeal = priceItems.find((item) => item.key === "meal_casual")?.amount_minor ?? 0;
  const metro = priceItems.find((item) => item.key === "metro_ticket")?.amount_minor ?? 0;
  const museum = priceItems.find((item) => item.key === "museum_entry")?.amount_minor ?? 0;
  const midHotel = hotels.find((hotel) => hotel.tier === "mid_range") ?? hotels[0];
  const hotelNight = midHotel
    ? Math.round((midHotel.price_night_min_minor + midHotel.price_night_max_minor) / 2)
    : 0;
  return hotelNight + casualMeal * 2 + metro * 4 + museum;
}

function buildScores(citySlug: string, countrySlug: string): DestinationScores {
  const restaurants = getRestaurants(citySlug);
  const healthSafety = getCountryHealthSafety(countrySlug);
  const payments = getCountryPayments(countrySlug);
  const connectivity = getCountryConnectivity(countrySlug);
  const transit = getTransitOptions(citySlug);
  const hotels = getHotels(citySlug);

  const foodRating = rating(
    3 + Math.min(2, restaurants.filter((restaurant) => restaurant.google_rating >= 4.3).length / 8),
  );
  const lgbtq = rating(healthSafety?.lgbtq.tolerance_score ?? 3);
  const card = rating(
    averagePaymentLevel(payments?.methods.filter((method) => method.key !== "cash_jpy") ?? []),
  );
  const cash = rating(
    scoreAcceptedLevel(
      payments?.methods.find((method) => method.key === "cash_jpy")?.accepted_level ?? "common",
    ),
  );
  const internet = rating(
    3 +
      Math.min(
        2,
        (connectivity?.connectivity.filter((option) =>
          ["esim", "pocket_wifi", "public_wifi"].includes(option.option),
        ).length ?? 0) / 2,
      ),
  );

  return {
    beaches: 1,
    mountains: 2,
    food: foodRating,
    nightlife: 4,
    relaxation: 4,
    adventure: 3,
    safety: 5,
    family: 4,
    lgbtq,
    cash,
    card,
    digitalNomad: rating((internet + card) / 2),
    transport: rating(3 + transit.filter((option) => option.recommended).length / 2),
    internet,
    luxury: rating(hotels.filter((hotel) => hotel.tier.includes("luxury")).length + 3),
  };
}

function averagePaymentLevel(methods: Array<{ accepted_level: string }>) {
  if (!methods.length) return 3;
  return (
    methods.reduce((sum, method) => sum + scoreAcceptedLevel(method.accepted_level), 0) /
    methods.length
  );
}

export function getSeedDestinationCandidates(
  citySlugs: string[] = ["tokyo"],
): DestinationCandidate[] {
  return citySlugs.flatMap((citySlug) => {
    const city = getCity(citySlug);
    const countrySlug = getCountryForCity(citySlug);
    const country = countrySlug ? getCountry(countrySlug) : null;
    if (!city || !countrySlug || !country) return [];

    const climate = getClimate(citySlug).map((row) => ({
      month: row.month,
      avgHighC: row.avg_high_c,
      avgLowC: row.avg_low_c,
      precipMm: row.precip_mm,
      humidityPct: row.humidity_pct,
      costIndex: row.cost_index,
    }));
    const tags = [
      "food",
      "nightlife",
      "culture",
      "shopping",
      "transit",
      "family",
      "digital-nomad",
      "safe",
      "card-friendly",
      "cash-friendly",
    ];
    const atmosphere = ["energetic", "polished", "creative", "easy_first_trip"];
    const summary = city.summary ?? "";

    return [
      {
        slug: city.slug,
        name: city.name,
        countrySlug,
        countryIso2: country.iso2,
        citySlug: city.slug,
        coordinates:
          city.lat && city.lon ? { lat: Number(city.lat), lon: Number(city.lon) } : undefined,
        types: ["city", "food", "nightlife", "culture", "shopping", "digital_nomad"],
        tags,
        atmosphere,
        budget: {
          currency: city.default_currency ?? country.default_currency,
          estimatedDailySpendMinor: estimateDailySpendMinor(citySlug),
          budgetLevel: 3,
          luxuryLevel: 4,
        },
        scores: buildScores(citySlug, countrySlug),
        climate,
        visaRules:
          getVisaRuleset(countrySlug)?.rules.map((rule) => ({
            citizenship: rule.citizenship,
            requirement: rule.requirement,
            maxStayDays: rule.max_stay_days,
          })) ?? [],
        search: {
          title: city.name,
          summary,
          tokens: buildSearchTokens(
            [city.name, country.name, summary, ...tags, ...atmosphere].join(" "),
          ),
        },
      },
    ];
  });
}

export function getSeedNearbyDestinationCandidates(
  citySlug = "tokyo",
): NearbyDestinationCandidate[] {
  return getInterCityRoutes(citySlug).map((route) => {
    const sorted = [...route.options].sort(
      (a, b) => a.duration_minutes - b.duration_minutes || a.price_min_minor - b.price_min_minor,
    );
    const fastest = sorted[0];
    const cheapest = [...route.options].sort(
      (a, b) => a.price_min_minor - b.price_min_minor,
    )[0];

    return {
      slug: route.dest_slug,
      name: route.dest_name,
      inSameCountry: route.in_same_country,
      tags: nearbyTags(route.dest_slug),
      bestDurationMinutes: fastest?.duration_minutes ?? 0,
      minPriceMinor: cheapest?.price_min_minor ?? 0,
      currency: cheapest?.currency ?? fastest?.currency ?? "JPY",
      modes: route.options.map((option) => option.mode),
    };
  });
}

function nearbyTags(slug: string) {
  const tagsBySlug: Record<string, string[]> = {
    kyoto: ["culture", "temples", "historic", "food"],
    osaka: ["food", "nightlife", "city"],
    hakone: ["relaxation", "onsen", "mountains", "fuji"],
    nikko: ["nature", "temples", "mountains"],
    kamakura: ["beach", "temples", "day-trip"],
  };
  return tagsBySlug[slug] ?? ["nearby"];
}
