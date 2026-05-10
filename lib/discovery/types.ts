import type { VisaRequirement } from "@/lib/data/seed";

export type DiscoveryRating = 0 | 1 | 2 | 3 | 4 | 5;

export type DestinationType =
  | "city"
  | "beach"
  | "mountain"
  | "food"
  | "nightlife"
  | "culture"
  | "nature"
  | "wellness"
  | "family"
  | "shopping"
  | "digital_nomad";

export type TravelStyle =
  | "budget"
  | "mid_range"
  | "luxury"
  | "relaxed"
  | "adventure"
  | "food"
  | "nightlife"
  | "family"
  | "culture"
  | "digital_nomad";

export type WeatherPreference =
  | "cool"
  | "mild"
  | "warm"
  | "hot"
  | "dry"
  | "low_humidity"
  | "snow"
  | "beach_weather";

export type VisaFriendliness = "any" | "visa_free" | "evisa_ok";

export type DestinationScores = {
  beaches: DiscoveryRating;
  mountains: DiscoveryRating;
  food: DiscoveryRating;
  nightlife: DiscoveryRating;
  relaxation: DiscoveryRating;
  adventure: DiscoveryRating;
  safety: DiscoveryRating;
  family: DiscoveryRating;
  lgbtq: DiscoveryRating;
  cash: DiscoveryRating;
  card: DiscoveryRating;
  digitalNomad: DiscoveryRating;
  transport: DiscoveryRating;
  internet: DiscoveryRating;
  luxury: DiscoveryRating;
};

export type DestinationClimateMonth = {
  month: number;
  avgHighC: number;
  avgLowC: number;
  precipMm: number;
  humidityPct: number;
  costIndex: number;
};

export type DestinationVisaRule = {
  citizenship: string;
  requirement: VisaRequirement;
  maxStayDays?: number;
};

export type DestinationBudget = {
  currency: string;
  estimatedDailySpendMinor: number;
  budgetLevel: DiscoveryRating;
  luxuryLevel: DiscoveryRating;
};

export type SearchIndexDocument = {
  title: string;
  summary: string;
  tokens: string[];
};

export type DestinationCandidate = {
  slug: string;
  name: string;
  countrySlug: string;
  countryIso2: string;
  citySlug?: string;
  coordinates?: { lat: number; lon: number };
  types: DestinationType[];
  tags: string[];
  atmosphere: string[];
  budget: DestinationBudget;
  scores: DestinationScores;
  climate: DestinationClimateMonth[];
  visaRules: DestinationVisaRule[];
  flightDurationMinutes?: number;
  search: SearchIndexDocument;
};

export type TravelerPreferences = {
  citizenship?: string;
  tripMonths?: number[];
  dailyBudgetMinor?: number;
  budgetCurrency?: string;
  luxuryLevel?: DiscoveryRating;
  weather?: WeatherPreference[];
  temperatureMinC?: number;
  temperatureMaxC?: number;
  visaFriendliness?: VisaFriendliness;
  maxFlightDurationMinutes?: number;
  destinationTypes?: DestinationType[];
  travelStyles?: TravelStyle[];
  tags?: string[];
  mustHaveTags?: string[];
  searchQuery?: string;
  minScores?: Partial<DestinationScores>;
};

export type ScoreBreakdown = {
  budget: number;
  luxury: number;
  weather: number;
  visa: number;
  flight: number;
  types: number;
  tags: number;
  lifestyle: number;
  search: number;
};

export type DestinationMatch = {
  destination: DestinationCandidate;
  score: number;
  breakdown: ScoreBreakdown;
  reasons: string[];
  penalties: string[];
};

export type NearbyDestinationCandidate = {
  slug: string;
  name: string;
  inSameCountry: boolean;
  tags: string[];
  bestDurationMinutes: number;
  minPriceMinor: number;
  currency: string;
  modes: string[];
};

export type NearbyPreferences = {
  maxDurationMinutes?: number;
  maxPriceMinor?: number;
  preferredModes?: string[];
  sameCountryOnly?: boolean;
  tags?: string[];
};
