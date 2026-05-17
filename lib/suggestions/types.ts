export const SUGGESTION_CATEGORIES = [
  "Trip Planning",
  "Maps & Navigation",
  "Budget & Payments",
  "Stays & Hotels",
  "Community & Sharing",
  "Alerts & Notifications",
  "Other",
] as const;

export const SUGGESTION_STATUSES = [
  "Under Review",
  "Planned",
  "In Progress",
  "Completed",
  "Declined",
  "Duplicate",
] as const;

export type SuggestionCategory = (typeof SUGGESTION_CATEGORIES)[number];
export type SuggestionStatus = (typeof SUGGESTION_STATUSES)[number];

export type UserSuggestion = {
  id: string;
  title: string;
  description: string;
  category: SuggestionCategory;
  status: SuggestionStatus;
  voteCount: number;
  commentCount: number;
  submittedBy: string;
  submittedByAvatar: string;
  submittedDateLabel: string;
  roadmapLabel?: string;
  statusDetail: string;
  isPopular?: boolean;
  duplicateOfId?: string;
  createdAt: string;
  normalizedKey: string;
};

export type SuggestionInput = {
  title: string;
  description: string;
  category: SuggestionCategory;
};

export const SEED_SUGGESTIONS: UserSuggestion[] = [
  makeSuggestionSeed({
    id: "offline-maps-entire-trips",
    title: "Offline Maps for Entire Trips",
    description:
      "Allow users to download entire regions and access maps, routes and place details offline during their trip.",
    category: "Maps & Navigation",
    status: "Planned",
    voteCount: 1200,
    commentCount: 64,
    submittedBy: "TravelLover_93",
    submittedByAvatar: "TL",
    submittedDateLabel: "2 days ago",
    roadmapLabel: "Roadmap Q3 2025",
    statusDetail: "Roadmap Q3 2025",
    isPopular: true,
  }),
  makeSuggestionSeed({
    id: "price-alerts-hotels",
    title: "Price Alerts for Hotels",
    description:
      "Get notified when hotel prices drop for saved stays or destinations.",
    category: "Stays & Hotels",
    status: "In Progress",
    voteCount: 856,
    commentCount: 32,
    submittedBy: "Wanderer",
    submittedByAvatar: "WA",
    submittedDateLabel: "1 week ago",
    statusDetail: "In Development",
  }),
  makeSuggestionSeed({
    id: "ai-trip-planner-assistant",
    title: "AI Trip Planner Assistant",
    description:
      "AI-powered assistant that helps build personalized itineraries based on preferences, budget and travel style.",
    category: "Trip Planning",
    status: "Under Review",
    voteCount: 642,
    commentCount: 78,
    submittedBy: "RoamMore",
    submittedByAvatar: "RM",
    submittedDateLabel: "3 days ago",
    statusDetail: "Reviewing now",
  }),
  makeSuggestionSeed({
    id: "multi-currency-budget-tracking",
    title: "Multi-Currency Budget Tracking",
    description:
      "Track expenses in multiple currencies automatically with real-time exchange rates.",
    category: "Budget & Payments",
    status: "Planned",
    voteCount: 421,
    commentCount: 19,
    submittedBy: "BudgetTraveller",
    submittedByAvatar: "BT",
    submittedDateLabel: "2 weeks ago",
    roadmapLabel: "Roadmap Q4 2025",
    statusDetail: "Roadmap Q4 2025",
  }),
  makeSuggestionSeed({
    id: "group-trips-shared-itineraries",
    title: "Group Trips & Shared Itineraries",
    description:
      "Plan trips together with friends, share itineraries, budgets and bookings.",
    category: "Community & Sharing",
    status: "In Progress",
    voteCount: 389,
    commentCount: 27,
    submittedBy: "ExploreTogether",
    submittedByAvatar: "ET",
    submittedDateLabel: "1 week ago",
    statusDetail: "Beta Testing",
  }),
  makeSuggestionSeed({
    id: "dark-mode-maps",
    title: "Dark Mode for Maps",
    description:
      "Add a dark mode option for maps to reduce eye strain during night travel.",
    category: "Maps & Navigation",
    status: "Declined",
    voteCount: 215,
    commentCount: 14,
    submittedBy: "NightOwl",
    submittedByAvatar: "NO",
    submittedDateLabel: "3 weeks ago",
    statusDetail: "Not planned",
  }),
];

function makeSuggestionSeed(
  input: Omit<UserSuggestion, "createdAt" | "normalizedKey">,
): UserSuggestion {
  return {
    ...input,
    createdAt: "2026-05-10T00:00:00.000Z",
    normalizedKey: normalizeSuggestionKey(input.title, input.category),
  };
}

export function normalizeSuggestionKey(title: string, category: SuggestionCategory) {
  return `${category}:${title
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\b(the|a|an|please|add|new|more)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim()}`;
}
