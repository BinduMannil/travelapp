import { DEFAULT_MATCH_WEIGHTS, SCORE_FIELDS, STYLE_TO_SCORE_FIELDS } from "./taxonomy";
import type {
  DestinationCandidate,
  DestinationMatch,
  DestinationScores,
  NearbyDestinationCandidate,
  NearbyPreferences,
  ScoreBreakdown,
  TravelerPreferences,
  VisaFriendliness,
  WeatherPreference,
} from "./types";

const REQUIREMENT_SCORE: Record<string, number> = {
  visa_free: 1,
  visa_waiver_registration: 0.82,
  evisa_or_visa: 0.58,
  visa_required: 0.18,
};

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function average(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/[_\s]+/g, "-");
}

function scoreTargetRange(value: number, min: number, max: number) {
  if (value >= min && value <= max) return 1;
  const distance = value < min ? min - value : value - max;
  return clamp01(1 - distance / 12);
}

function weatherBandScore(
  preference: WeatherPreference,
  avgHighC: number,
  humidityPct: number,
  precipMm: number,
) {
  switch (preference) {
    case "cool":
      return scoreTargetRange(avgHighC, 8, 18);
    case "mild":
      return scoreTargetRange(avgHighC, 16, 24);
    case "warm":
      return scoreTargetRange(avgHighC, 22, 30);
    case "hot":
      return scoreTargetRange(avgHighC, 29, 38);
    case "dry":
      return clamp01(1 - precipMm / 220);
    case "low_humidity":
      return clamp01(1 - Math.max(0, humidityPct - 55) / 35);
    case "snow":
      return avgHighC <= 5 ? 0.8 : 0.15;
    case "beach_weather":
      return scoreTargetRange(avgHighC, 25, 33) * clamp01(1 - precipMm / 260);
  }
}

export function scoreBudget(
  destination: DestinationCandidate,
  preferences: TravelerPreferences,
) {
  if (!preferences.dailyBudgetMinor) return 0.72;
  const expected = destination.budget.estimatedDailySpendMinor;
  const budget = preferences.dailyBudgetMinor;
  if (budget >= expected) return clamp01(1 - Math.max(0, budget - expected) / (budget * 4));
  return clamp01(budget / expected);
}

export function scoreWeather(
  destination: DestinationCandidate,
  preferences: TravelerPreferences,
) {
  const climate = preferences.tripMonths?.length
    ? destination.climate.filter((row) => preferences.tripMonths?.includes(row.month))
    : destination.climate;

  if (!climate.length) return 0.6;

  const temperatureScores =
    preferences.temperatureMinC !== undefined ||
    preferences.temperatureMaxC !== undefined
      ? climate.map((row) =>
          scoreTargetRange(
            row.avgHighC,
            preferences.temperatureMinC ?? -20,
            preferences.temperatureMaxC ?? 45,
          ),
        )
      : [];

  const preferenceScores =
    preferences.weather?.flatMap((weather) =>
      climate.map((row) =>
        weatherBandScore(weather, row.avgHighC, row.humidityPct, row.precipMm),
      ),
    ) ?? [];

  const all = [...temperatureScores, ...preferenceScores];
  return all.length ? average(all) : 0.72;
}

export function scoreVisa(
  destination: DestinationCandidate,
  preferences: TravelerPreferences,
) {
  const rule = preferences.citizenship
    ? destination.visaRules.find(
        (item) =>
          item.citizenship.toUpperCase() === preferences.citizenship?.toUpperCase(),
      )
    : undefined;

  if (!rule) return preferences.visaFriendliness === "any" ? 0.72 : 0.5;
  const base = REQUIREMENT_SCORE[rule.requirement] ?? 0.4;
  return visaMeetsPreference(rule.requirement, preferences.visaFriendliness ?? "any")
    ? base
    : Math.min(base, 0.35);
}

function visaMeetsPreference(
  requirement: string,
  friendliness: VisaFriendliness,
) {
  if (friendliness === "any") return true;
  if (friendliness === "visa_free") return requirement === "visa_free";
  return requirement === "visa_free" || requirement === "evisa_or_visa";
}

function scoreFlight(destination: DestinationCandidate, preferences: TravelerPreferences) {
  if (!preferences.maxFlightDurationMinutes || !destination.flightDurationMinutes) {
    return 0.68;
  }
  return clamp01(
    1 -
      Math.max(
        0,
        destination.flightDurationMinutes - preferences.maxFlightDurationMinutes,
      ) /
        preferences.maxFlightDurationMinutes,
  );
}

function scoreTypes(destination: DestinationCandidate, preferences: TravelerPreferences) {
  if (!preferences.destinationTypes?.length) return 0.68;
  const wanted = new Set(preferences.destinationTypes.map(normalize));
  const actual = new Set(destination.types.map(normalize));
  return average([...wanted].map((tag) => (actual.has(tag) ? 1 : 0)));
}

function scoreTags(destination: DestinationCandidate, preferences: TravelerPreferences) {
  const wanted = [...(preferences.tags ?? []), ...(preferences.mustHaveTags ?? [])].map(normalize);
  if (!wanted.length) return 0.68;
  const actual = new Set(
    [...destination.tags, ...destination.atmosphere, ...destination.types].map(normalize),
  );
  return average(wanted.map((tag) => (actual.has(tag) ? 1 : 0)));
}

function scoreLifestyle(destination: DestinationCandidate, preferences: TravelerPreferences) {
  const styleFields =
    preferences.travelStyles?.flatMap((style) => STYLE_TO_SCORE_FIELDS[style]) ?? [];
  const explicitFields = Object.keys(preferences.minScores ?? {}) as Array<
    keyof DestinationScores
  >;
  const fields = Array.from(new Set([...styleFields, ...explicitFields]));
  if (!fields.length) return 0.7;

  return average(
    fields.map((field) => {
      const minimum = preferences.minScores?.[field];
      const value = destination.scores[field] / 5;
      if (minimum === undefined) return value;
      return destination.scores[field] >= minimum ? value : Math.min(value, 0.3);
    }),
  );
}

function scoreLuxury(destination: DestinationCandidate, preferences: TravelerPreferences) {
  if (preferences.luxuryLevel === undefined) return 0.68;
  return 1 - Math.abs(destination.budget.luxuryLevel - preferences.luxuryLevel) / 5;
}

function scoreSearch(destination: DestinationCandidate, preferences: TravelerPreferences) {
  if (!preferences.searchQuery) return 0.66;
  const terms = preferences.searchQuery.split(/\s+/).map(normalize).filter(Boolean);
  if (!terms.length) return 0.66;
  const haystack = new Set([
    ...destination.search.tokens.map(normalize),
    ...destination.tags.map(normalize),
    ...destination.atmosphere.map(normalize),
    ...destination.types.map(normalize),
    normalize(destination.name),
  ]);
  return average(terms.map((term) => (haystack.has(term) ? 1 : 0)));
}

export function destinationPassesHardFilters(
  destination: DestinationCandidate,
  preferences: TravelerPreferences,
) {
  if (preferences.mustHaveTags?.length) {
    const actual = new Set(
      [...destination.tags, ...destination.atmosphere, ...destination.types].map(normalize),
    );
    if (!preferences.mustHaveTags.every((tag) => actual.has(normalize(tag)))) {
      return false;
    }
  }

  if (preferences.maxFlightDurationMinutes && destination.flightDurationMinutes) {
    if (destination.flightDurationMinutes > preferences.maxFlightDurationMinutes * 1.5) {
      return false;
    }
  }

  for (const field of SCORE_FIELDS) {
    const minimum = preferences.minScores?.[field];
    if (minimum !== undefined && destination.scores[field] < minimum) return false;
  }

  return true;
}

export function scoreDestination(
  destination: DestinationCandidate,
  preferences: TravelerPreferences = {},
): DestinationMatch {
  const breakdown: ScoreBreakdown = {
    budget: scoreBudget(destination, preferences),
    luxury: scoreLuxury(destination, preferences),
    weather: scoreWeather(destination, preferences),
    visa: scoreVisa(destination, preferences),
    flight: scoreFlight(destination, preferences),
    types: scoreTypes(destination, preferences),
    tags: scoreTags(destination, preferences),
    lifestyle: scoreLifestyle(destination, preferences),
    search: scoreSearch(destination, preferences),
  };

  const score = Object.entries(DEFAULT_MATCH_WEIGHTS).reduce(
    (sum, [key, weight]) => sum + breakdown[key as keyof ScoreBreakdown] * weight,
    0,
  );

  return {
    destination,
    score: Math.round(score * 1000) / 10,
    breakdown,
    reasons: buildReasons(destination, breakdown),
    penalties: buildPenalties(destination, breakdown),
  };
}

function buildReasons(destination: DestinationCandidate, breakdown: ScoreBreakdown) {
  const reasons = Object.entries(breakdown)
    .filter(([, value]) => value >= 0.82)
    .map(([key]) => `${key} fit`);
  if (destination.scores.safety >= 4) reasons.push("strong safety profile");
  if (destination.scores.transport >= 4) reasons.push("easy local transport");
  return reasons.slice(0, 4);
}

function buildPenalties(_destination: DestinationCandidate, breakdown: ScoreBreakdown) {
  return Object.entries(breakdown)
    .filter(([, value]) => value <= 0.4)
    .map(([key]) => `${key} mismatch`)
    .slice(0, 3);
}

export function rankDestinations(
  destinations: DestinationCandidate[],
  preferences: TravelerPreferences = {},
) {
  return destinations
    .filter((destination) => destinationPassesHardFilters(destination, preferences))
    .map((destination) => scoreDestination(destination, preferences))
    .sort((a, b) => b.score - a.score || a.destination.name.localeCompare(b.destination.name));
}

export function buildSearchTokens(value: string) {
  return Array.from(
    new Set(
      value
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .map((token) => token.trim())
        .filter((token) => token.length > 1),
    ),
  );
}

export function rankNearbyDestinations(
  destinations: NearbyDestinationCandidate[],
  preferences: NearbyPreferences = {},
) {
  return destinations
    .filter((destination) => {
      if (preferences.sameCountryOnly && !destination.inSameCountry) return false;
      if (
        preferences.maxDurationMinutes &&
        destination.bestDurationMinutes > preferences.maxDurationMinutes
      ) {
        return false;
      }
      if (preferences.maxPriceMinor && destination.minPriceMinor > preferences.maxPriceMinor) {
        return false;
      }
      return true;
    })
    .map((destination) => {
      const durationScore = preferences.maxDurationMinutes
        ? clamp01(1 - destination.bestDurationMinutes / preferences.maxDurationMinutes)
        : clamp01(1 - destination.bestDurationMinutes / 720);
      const modeScore = preferences.preferredModes?.length
        ? average(
            preferences.preferredModes.map((mode) =>
              destination.modes.includes(mode) ? 1 : 0,
            ),
          )
        : 0.7;
      const tagScore = preferences.tags?.length
        ? average(
            preferences.tags.map((tag) =>
              destination.tags.map(normalize).includes(normalize(tag)) ? 1 : 0,
            ),
          )
        : 0.7;

      return {
        destination,
        score: Math.round((durationScore * 0.45 + modeScore * 0.3 + tagScore * 0.25) * 1000) / 10,
      };
    })
    .sort((a, b) => b.score - a.score || a.destination.name.localeCompare(b.destination.name));
}
