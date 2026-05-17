import {
  CalendarDays,
  Cloud,
  CloudRain,
  CloudSun,
  Compass,
  Heart,
  Landmark,
  Leaf,
  Mountain,
  Palmtree,
  Snowflake,
  Sparkles,
  Sun,
  UserRound,
  Utensils,
  Wifi,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type MoodFilter = {
  label: string;
  icon: LucideIcon;
};

export type WeatherFilter = {
  label: string;
  icon: LucideIcon;
};

export type DestinationCard = {
  name: string;
  country?: string;
  image: string;
  temperature: string;
  dailyBudget: string;
  safety: "Very Safe" | "Safe";
  theme: string;
  badge?: string;
};

export type SoloDestination = {
  name: string;
  image: string;
  safety: "Very Safe" | "Safe";
  dailyBudget: string;
  temperature: string;
  description: string;
};

export type CategoryCard = {
  title: string;
  subtitle: string;
  image: string;
  icon: LucideIcon;
};

export type ShortlistPlace = {
  name: string;
  image: string;
};

export const moodFilters: MoodFilter[] = [
  { label: "Relaxed", icon: Palmtree },
  { label: "Adventurous", icon: Mountain },
  { label: "Cultural", icon: Landmark },
  { label: "Nature", icon: Leaf },
  { label: "Romantic", icon: Heart },
  { label: "Solo Escape", icon: UserRound },
];

export const weatherFilters: WeatherFilter[] = [
  { label: "Sunny", icon: Sun },
  { label: "Partly Cloudy", icon: CloudSun },
  { label: "Cloudy", icon: Cloud },
  { label: "Rainy", icon: CloudRain },
  { label: "Snowy", icon: Snowflake },
];

export const popularSearches = [
  "Best Places in Japan",
  "Solo Travel in Europe",
  "Warm Places in December",
  "Budget Beaches",
  "Safe Cities for Women",
];

export const recommendedDestinations: DestinationCard[] = [
  {
    name: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=1200&q=88",
    temperature: "28°C",
    dailyBudget: "$35/day",
    safety: "Very Safe",
    theme: "Wellness, beaches & culture",
    badge: "Trending",
  },
  {
    name: "Kyoto",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=88",
    temperature: "18°C",
    dailyBudget: "$70/day",
    safety: "Very Safe",
    theme: "Temples, traditions & beauty",
    badge: "Popular",
  },
  {
    name: "Lisbon",
    country: "Portugal",
    image:
      "https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?auto=format&fit=crop&w=1200&q=88",
    temperature: "20°C",
    dailyBudget: "$55/day",
    safety: "Safe",
    theme: "Colorful streets & ocean views",
  },
  {
    name: "Queenstown",
    country: "New Zealand",
    image:
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=88",
    temperature: "12°C",
    dailyBudget: "$65/day",
    safety: "Very Safe",
    theme: "Adventure, nature & views",
  },
];

export const soloDestinations: SoloDestination[] = [
  {
    name: "Singapore",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=88",
    safety: "Very Safe",
    dailyBudget: "$60/day",
    temperature: "27°C",
    description: "Clean, modern & friendly",
  },
  {
    name: "Copenhagen, Denmark",
    image:
      "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=88",
    safety: "Very Safe",
    dailyBudget: "$80/day",
    temperature: "18°C",
    description: "Design, bikes & hygge",
  },
  {
    name: "Vancouver, Canada",
    image:
      "https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=1200&q=88",
    safety: "Very Safe",
    dailyBudget: "$70/day",
    temperature: "16°C",
    description: "Nature, culture & outdoor life",
  },
  {
    name: "Melbourne, Australia",
    image:
      "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=1200&q=88",
    safety: "Very Safe",
    dailyBudget: "$65/day",
    temperature: "20°C",
    description: "Cafes, art & local vibes",
  },
];

export const categoryCards: CategoryCard[] = [
  {
    title: "Beach Escapes",
    subtitle: "Sun, sand & sea",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=86",
    icon: Palmtree,
  },
  {
    title: "Mountain Adventures",
    subtitle: "Hikes, treks & peaks",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=86",
    icon: Mountain,
  },
  {
    title: "Cultural Cities",
    subtitle: "History, art & heritage",
    image:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=900&q=86",
    icon: Landmark,
  },
  {
    title: "Hidden Gems",
    subtitle: "Off the beaten path",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=86",
    icon: Compass,
  },
  {
    title: "Foodie Destinations",
    subtitle: "Local flavors & eats",
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=86",
    icon: Utensils,
  },
  {
    title: "Digital Nomad Hubs",
    subtitle: "Work, relax, explore",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=86",
    icon: Wifi,
  },
];

export const shortlistPlaces: ShortlistPlace[] = [
  {
    name: "Santorini, Greece",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=420&q=84",
  },
  {
    name: "Banff, Canada",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=420&q=84",
  },
  {
    name: "Chefchaouen, Morocco",
    image:
      "https://images.unsplash.com/photo-1553603227-2358aabe821e?auto=format&fit=crop&w=420&q=84",
  },
];

export const travelInsights = [
  "Cheapest destinations in Asia under $30/day",
  "Best countries for solo female travelers in 2025",
  "No visa countries for US passport holders",
];

export const travelTerms = [
  "Safe Cities for Solo Female Travelers",
  "Best Places to Visit in Japan",
  "Warm Places in December",
  "Budget Travel Destinations",
  "Visa-Free Travel",
  "Solo Travel Destinations",
  "Destination Discovery",
  "Travel Inspiration",
];

export const heroImage =
  "https://images.unsplash.com/photo-1530616858450-99ba4525057d?auto=format&fit=crop&w=2200&q=90";

export const springJapanImage =
  "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=900&q=88";

export const inspirationImage =
  "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=600&q=84";

export const CalendarIcon = CalendarDays;
export const SparklesIcon = Sparkles;
