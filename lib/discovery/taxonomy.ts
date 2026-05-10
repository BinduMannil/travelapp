import type { DestinationScores, TravelStyle } from "@/lib/discovery/types";

export const DISCOVERY_TAGS = {
  destinationTypes: [
    "city",
    "beach",
    "mountain",
    "food",
    "nightlife",
    "culture",
    "nature",
    "wellness",
    "family",
    "shopping",
    "digital_nomad",
  ],
  atmosphere: [
    "energetic",
    "romantic",
    "quiet",
    "polished",
    "creative",
    "historic",
    "outdoorsy",
    "easy_first_trip",
  ],
  tripGoals: [
    "food",
    "nightlife",
    "relaxation",
    "adventure",
    "family",
    "culture",
    "shopping",
    "digital_nomad",
  ],
} as const;

export const SCORE_FIELDS: Array<keyof DestinationScores> = [
  "beaches",
  "mountains",
  "food",
  "nightlife",
  "relaxation",
  "adventure",
  "safety",
  "family",
  "lgbtq",
  "cash",
  "card",
  "digitalNomad",
  "transport",
  "internet",
  "luxury",
];

export const STYLE_TO_SCORE_FIELDS: Record<
  TravelStyle,
  Array<keyof DestinationScores>
> = {
  budget: [],
  mid_range: [],
  luxury: ["luxury"],
  relaxed: ["relaxation", "safety"],
  adventure: ["adventure", "mountains", "beaches"],
  food: ["food"],
  nightlife: ["nightlife"],
  family: ["family", "safety", "transport"],
  culture: [],
  digital_nomad: ["digitalNomad", "internet", "card"],
};

export const DEFAULT_MATCH_WEIGHTS = {
  budget: 0.16,
  luxury: 0.08,
  weather: 0.15,
  visa: 0.14,
  flight: 0.08,
  types: 0.11,
  tags: 0.1,
  lifestyle: 0.12,
  search: 0.06,
} as const;
