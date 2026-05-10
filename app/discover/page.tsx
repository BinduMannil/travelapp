/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  formatDestinationType,
  formatLabel,
  formatMetadata,
  formatTag,
  formatTitleCase,
} from "@/lib/copy/formatting";
import { getGlobalCities, getGlobalCountries } from "@/lib/discovery";

type DiscoveryPlace = {
  slug: string;
  name: string;
  countryIso2: string;
  countryName: string;
  stateCode: string;
  kind: string;
  coordinates?: { lat: number; lon: number };
};

type ActivityPlaceSeed = {
  name: string;
  countryIso2: string;
  kind: string;
  region?: string;
};

type ActivityGroup =
  | "Water worlds"
  | "Snow & mountains"
  | "Culture & city"
  | "Food & nightlife"
  | "Nature & wild"
  | "Luxury & romance"
  | "Ways to travel";

const FEELING_IMAGES = {
  world:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=86",
  islands:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=84",
  culture:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1400&q=84",
  food:
    "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1400&q=84",
  village:
    "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1400&q=84",
  city:
    "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1400&q=84",
  mountain:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=84",
  oldTown:
    "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1400&q=84",
  market:
    "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=1400&q=84",
  snow:
    "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1400&q=84",
  safari:
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=84",
  luxury:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=84",
  train:
    "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1400&q=84",
  art:
    "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=1400&q=84",
};

const FEELINGS: Record<
  string,
  {
    title: string;
    label: string;
    countryIso2?: string;
    image: string;
    searchQuery?: string;
    strapline: string;
    note: string;
  }
> = {
  "warm-islands": {
    title: "Warm island starting points",
    label: "Warm islands",
    countryIso2: "PH",
    image: FEELING_IMAGES.islands,
    strapline: "Warm water, soft mornings, easy days",
    note: "Coastal places chosen for warmth, softness, and the feeling of waking up close to the water.",
  },
  "visa-easy-culture": {
    title: "Culture capital starting points",
    label: "Culture capitals",
    image: FEELING_IMAGES.culture,
    searchQuery: "capital",
    strapline: "Museums, old quarters, fewer paperwork walls",
    note: "Cultural capitals and historic centers where the trip can begin with streets, galleries, rituals, and public life.",
  },
  "cool-food-cities": {
    title: "Cool-weather food city starting points",
    label: "Cool food cities",
    countryIso2: "JP",
    image: FEELING_IMAGES.food,
    strapline: "Markets, steam, rain jackets, long dinners",
    note: "Food-led cities for travelers who follow aroma, markets, late trains, and the promise of dinner.",
  },
  "quiet-rail-villages": {
    title: "Quiet rail-access starting points",
    label: "Rail villages",
    countryIso2: "CH",
    image: FEELING_IMAGES.village,
    strapline: "Small stations, slow stays, mountain edges",
    note: "Quieter places where the journey feels slower, more local, and closer to the texture of everyday life.",
  },
};

const ACTIVITY_GROUPS: ActivityGroup[] = [
  "Water worlds",
  "Snow & mountains",
  "Culture & city",
  "Food & nightlife",
  "Nature & wild",
  "Luxury & romance",
  "Ways to travel",
];

const GROUP_STORIES: Record<ActivityGroup, { title: string; body: string }> = {
  "Water worlds": {
    title: "Ocean, reef, coast",
    body: "For travelers led by salt air, warm water, boats, islands, surf breaks, and horizon light.",
  },
  "Snow & mountains": {
    title: "Altitude and winter",
    body: "For high air, snow weeks, alpine towns, trail starts, lake edges, and landscape-first journeys.",
  },
  "Culture & city": {
    title: "Streets, rituals, design",
    body: "For cities that reveal themselves through architecture, temples, art, history, shops, and public life.",
  },
  "Food & nightlife": {
    title: "Tables after dark",
    body: "For travelers who follow markets, counters, reservations, music rooms, late trains, and glowing streets.",
  },
  "Nature & wild": {
    title: "Wildness and distance",
    body: "For forests, deserts, lakes, safari landscapes, camping, and places that make the world feel larger.",
  },
  "Luxury & romance": {
    title: "Softness, privacy, ceremony",
    body: "For polished hotels, restorative stays, romantic views, beautiful dining, and trips with a slower glow.",
  },
  "Ways to travel": {
    title: "The shape of the journey",
    body: "For rail windows, road days, solo confidence, family ease, long-stay rhythm, and unexpected beginnings.",
  },
};

const WATER_PLACES: ActivityPlaceSeed[] = [
  { name: "El Nido", countryIso2: "PH", kind: "island town" },
  { name: "Coron", countryIso2: "PH", kind: "island town" },
  { name: "Siargao", countryIso2: "PH", kind: "surf island" },
  { name: "Phuket", countryIso2: "TH", kind: "island" },
  { name: "Koh Samui", countryIso2: "TH", kind: "island" },
  { name: "Gili Trawangan", countryIso2: "ID", kind: "island" },
  { name: "Malé", countryIso2: "MV", kind: "island city" },
  { name: "Maafushi", countryIso2: "MV", kind: "island" },
  { name: "Santorini", countryIso2: "GR", kind: "island" },
  { name: "Hvar", countryIso2: "HR", kind: "island" },
  { name: "Ibiza", countryIso2: "ES", kind: "island" },
  { name: "Zanzibar", countryIso2: "TZ", kind: "island" },
];

const SNOW_MOUNTAIN_PLACES: ActivityPlaceSeed[] = [
  { name: "Chamonix", countryIso2: "FR", kind: "alpine town" },
  { name: "Zermatt", countryIso2: "CH", kind: "mountain village" },
  { name: "Interlaken", countryIso2: "CH", kind: "mountain town" },
  { name: "Innsbruck", countryIso2: "AT", kind: "alpine city" },
  { name: "Banff", countryIso2: "CA", kind: "mountain town" },
  { name: "Queenstown", countryIso2: "NZ", kind: "adventure town" },
  { name: "Pokhara", countryIso2: "NP", kind: "trekking city" },
  { name: "Cusco", countryIso2: "PE", kind: "highland city" },
  { name: "Leh", countryIso2: "IN", kind: "mountain town" },
  { name: "Bariloche", countryIso2: "AR", kind: "lake mountain city" },
];

const CULTURE_PLACES: ActivityPlaceSeed[] = [
  { name: "Kyoto", countryIso2: "JP", kind: "temple city" },
  { name: "Tokyo", countryIso2: "JP", kind: "design capital" },
  { name: "Paris", countryIso2: "FR", kind: "art capital" },
  { name: "Rome", countryIso2: "IT", kind: "historic city" },
  { name: "Istanbul", countryIso2: "TR", kind: "crossroads city" },
  { name: "Marrakech", countryIso2: "MA", kind: "medina city" },
  { name: "Cairo", countryIso2: "EG", kind: "ancient capital" },
  { name: "Seoul", countryIso2: "KR", kind: "culture city" },
  { name: "Bangkok", countryIso2: "TH", kind: "temple city" },
  { name: "Mexico City", countryIso2: "MX", kind: "art city" },
];

const FOOD_NIGHT_PLACES: ActivityPlaceSeed[] = [
  { name: "Tokyo", countryIso2: "JP", kind: "food city" },
  { name: "Osaka", countryIso2: "JP", kind: "street food city" },
  { name: "Bangkok", countryIso2: "TH", kind: "market city" },
  { name: "Singapore", countryIso2: "SG", kind: "hawker city" },
  { name: "Seoul", countryIso2: "KR", kind: "night food city" },
  { name: "Hanoi", countryIso2: "VN", kind: "street food city" },
  { name: "Paris", countryIso2: "FR", kind: "fine dining city" },
  { name: "Lima", countryIso2: "PE", kind: "culinary capital" },
  { name: "New Orleans", countryIso2: "US", kind: "music food city" },
  { name: "Barcelona", countryIso2: "ES", kind: "late-night city" },
];

const NATURE_PLACES: ActivityPlaceSeed[] = [
  { name: "Serengeti", countryIso2: "TZ", kind: "safari landscape" },
  { name: "Moshi", countryIso2: "TZ", kind: "wildlife gateway" },
  { name: "Nairobi", countryIso2: "KE", kind: "safari city" },
  { name: "Cape Town", countryIso2: "ZA", kind: "coastal nature city" },
  { name: "Banff", countryIso2: "CA", kind: "lake mountain town" },
  { name: "Reykjavik", countryIso2: "IS", kind: "wild landscape base" },
  { name: "Queenstown", countryIso2: "NZ", kind: "lake adventure town" },
  { name: "Ubud", countryIso2: "ID", kind: "jungle town" },
  { name: "Tulum", countryIso2: "MX", kind: "coastal ruins town" },
  { name: "Wadi Rum", countryIso2: "JO", kind: "desert landscape" },
];

const LUXURY_PLACES: ActivityPlaceSeed[] = [
  { name: "Paris", countryIso2: "FR", kind: "luxury capital" },
  { name: "Dubai", countryIso2: "AE", kind: "luxury city" },
  { name: "Santorini", countryIso2: "GR", kind: "romantic island" },
  { name: "Positano", countryIso2: "IT", kind: "romantic village" },
  { name: "Kyoto", countryIso2: "JP", kind: "wellness city" },
  { name: "Hakone", countryIso2: "JP", kind: "hot spring town" },
  { name: "Bali", countryIso2: "ID", kind: "wellness island" },
  { name: "Malé", countryIso2: "MV", kind: "resort gateway" },
  { name: "Monaco", countryIso2: "MC", kind: "yacht city" },
  { name: "Zermatt", countryIso2: "CH", kind: "alpine luxury village" },
];

const JOURNEY_PLACES: ActivityPlaceSeed[] = [
  { name: "Tokyo", countryIso2: "JP", kind: "solo city" },
  { name: "Lisbon", countryIso2: "PT", kind: "digital nomad city" },
  { name: "Chiang Mai", countryIso2: "TH", kind: "nomad city" },
  { name: "Porto", countryIso2: "PT", kind: "rail city" },
  { name: "Granada", countryIso2: "ES", kind: "backpacking city" },
  { name: "Queenstown", countryIso2: "NZ", kind: "road trip base" },
  { name: "Interlaken", countryIso2: "CH", kind: "train travel town" },
  { name: "Hoi An", countryIso2: "VN", kind: "family-friendly town" },
  { name: "Kotor", countryIso2: "ME", kind: "hidden gem town" },
  { name: "Reykjavik", countryIso2: "IS", kind: "road trip capital" },
];

const ACTIVITIES: Record<
  string,
  {
    group: ActivityGroup;
    label: string;
    title: string;
    mood: string;
    image: string;
    note: string;
    places: ActivityPlaceSeed[];
  }
> = {
  beach: {
    group: "Water worlds",
    label: "Beach",
    title: "Beach places",
    mood: "salt air, soft mornings, wide horizon",
    image: FEELING_IMAGES.islands,
    note: "Coastal cities, towns, island bases, and beach regions where the trip begins with water and light.",
    places: [
      { name: "Phuket", countryIso2: "TH", kind: "island" },
      { name: "Koh Samui", countryIso2: "TH", kind: "island" },
      { name: "Koh Phi Phi", countryIso2: "TH", kind: "island" },
      { name: "Krabi", countryIso2: "TH", kind: "town" },
      { name: "Canggu", countryIso2: "ID", kind: "village" },
      { name: "Uluwatu", countryIso2: "ID", kind: "village" },
      { name: "Nusa Dua", countryIso2: "ID", kind: "resort area" },
      { name: "Gili Trawangan", countryIso2: "ID", kind: "island" },
      { name: "Boracay", countryIso2: "PH", kind: "island" },
      { name: "El Nido", countryIso2: "PH", kind: "town" },
      { name: "Coron", countryIso2: "PH", kind: "town" },
      { name: "Siargao", countryIso2: "PH", kind: "island" },
      { name: "Honolulu", countryIso2: "US", kind: "city" },
      { name: "Maui", countryIso2: "US", kind: "island" },
      { name: "Kauai", countryIso2: "US", kind: "island" },
      { name: "Santa Monica", countryIso2: "US", kind: "city" },
      { name: "San Diego", countryIso2: "US", kind: "city" },
      { name: "Miami Beach", countryIso2: "US", kind: "city" },
      { name: "Cancun", countryIso2: "MX", kind: "city" },
      { name: "Tulum", countryIso2: "MX", kind: "town" },
      { name: "Playa del Carmen", countryIso2: "MX", kind: "city" },
      { name: "Isla Mujeres", countryIso2: "MX", kind: "island" },
      { name: "Los Cabos", countryIso2: "MX", kind: "region" },
      { name: "Cartagena", countryIso2: "CO", kind: "city" },
      { name: "San Andrés", countryIso2: "CO", kind: "island" },
      { name: "Rio de Janeiro", countryIso2: "BR", kind: "city" },
      { name: "Florianopolis", countryIso2: "BR", kind: "city" },
      { name: "Jericoacoara", countryIso2: "BR", kind: "village" },
      { name: "Cape Town", countryIso2: "ZA", kind: "city" },
      { name: "Zanzibar", countryIso2: "TZ", kind: "island" },
      { name: "Mombasa", countryIso2: "KE", kind: "city" },
      { name: "Diani Beach", countryIso2: "KE", kind: "beach town" },
      { name: "Malé", countryIso2: "MV", kind: "island city" },
      { name: "Maafushi", countryIso2: "MV", kind: "island" },
      { name: "Goa", countryIso2: "IN", kind: "region" },
      { name: "Varkala", countryIso2: "IN", kind: "town" },
      { name: "Da Nang", countryIso2: "VN", kind: "city" },
      { name: "Nha Trang", countryIso2: "VN", kind: "city" },
      { name: "Phu Quoc", countryIso2: "VN", kind: "island" },
      { name: "Hoi An", countryIso2: "VN", kind: "town" },
      { name: "Nice", countryIso2: "FR", kind: "city" },
      { name: "Biarritz", countryIso2: "FR", kind: "town" },
      { name: "Dubrovnik", countryIso2: "HR", kind: "city" },
      { name: "Split", countryIso2: "HR", kind: "city" },
      { name: "Hvar", countryIso2: "HR", kind: "island" },
      { name: "Santorini", countryIso2: "GR", kind: "island" },
      { name: "Mykonos", countryIso2: "GR", kind: "island" },
      { name: "Crete", countryIso2: "GR", kind: "island" },
      { name: "Ibiza", countryIso2: "ES", kind: "island" },
      { name: "Mallorca", countryIso2: "ES", kind: "island" },
      { name: "Algarve", countryIso2: "PT", kind: "region" },
      { name: "Lagos", countryIso2: "PT", kind: "town" },
      { name: "Byron Bay", countryIso2: "AU", kind: "town" },
      { name: "Gold Coast", countryIso2: "AU", kind: "city" },
      { name: "Noosa Heads", countryIso2: "AU", kind: "town" },
      { name: "Bondi Beach", countryIso2: "AU", kind: "beach suburb" },
    ],
  },
  "scuba-diving": {
    group: "Water worlds",
    label: "Scuba diving",
    title: "Dive-world escapes",
    mood: "reef walls, clear water, slow boat mornings",
    image: FEELING_IMAGES.islands,
    note: "Island bases and reef gateways for travelers who want the world to continue below the surface.",
    places: WATER_PLACES,
  },
  snorkeling: {
    group: "Water worlds",
    label: "Snorkeling",
    title: "Shallow reef journeys",
    mood: "warm shallows, coral color, easy water days",
    image: FEELING_IMAGES.islands,
    note: "Gentler island places where marine life, beach rhythm, and easy days sit close together.",
    places: WATER_PLACES,
  },
  surfing: {
    group: "Water worlds",
    label: "Surfing",
    title: "Surf coast energy",
    mood: "reef breaks, beach cafes, boards at sunrise",
    image: FEELING_IMAGES.islands,
    note: "Coastal places where the day is shaped by swell, wind, and the ritual of returning to shore.",
    places: [
      { name: "Siargao", countryIso2: "PH", kind: "surf island" },
      { name: "Canggu", countryIso2: "ID", kind: "surf village" },
      { name: "Uluwatu", countryIso2: "ID", kind: "cliff surf village" },
      { name: "Byron Bay", countryIso2: "AU", kind: "surf town" },
      { name: "Gold Coast", countryIso2: "AU", kind: "surf city" },
      { name: "Biarritz", countryIso2: "FR", kind: "surf town" },
      { name: "Santa Monica", countryIso2: "US", kind: "beach city" },
      { name: "Tulum", countryIso2: "MX", kind: "coastal town" },
    ],
  },
  sailing: {
    group: "Water worlds",
    label: "Sailing",
    title: "Sailing routes and harbor towns",
    mood: "harbor light, island hopping, dinner by the marina",
    image: FEELING_IMAGES.islands,
    note: "Places where coastlines, islands, and port towns create a journey that moves by water.",
    places: WATER_PLACES,
  },
  diving: {
    group: "Water worlds",
    label: "Diving",
    title: "Diving escapes",
    mood: "reef walls, wrecks, boats, blue quiet",
    image: FEELING_IMAGES.islands,
    note: "Marine places for travelers who want depth, reef life, and a trip that continues underwater.",
    places: WATER_PLACES,
  },
  islands: {
    group: "Water worlds",
    label: "Islands",
    title: "Island-led trips",
    mood: "ferries, coves, barefoot mornings, sunset water",
    image: FEELING_IMAGES.islands,
    note: "Destinations where being surrounded by water changes the pace of the entire journey.",
    places: WATER_PLACES,
  },
  tropical: {
    group: "Water worlds",
    label: "Tropical",
    title: "Tropical escapes",
    mood: "humid nights, palms, warm rain, fruit markets",
    image: FEELING_IMAGES.islands,
    note: "Warm-weather places with lush color, easy water, and trips shaped by heat, shade, and daylight.",
    places: WATER_PLACES,
  },
  "yacht-life": {
    group: "Water worlds",
    label: "Yacht life",
    title: "Polished coastlines",
    mood: "marinas, white decks, late lunches by the water",
    image: FEELING_IMAGES.luxury,
    note: "Glamorous harbor cities and islands where the coastline becomes the social scene.",
    places: LUXURY_PLACES,
  },
  chilling: {
    group: "Ways to travel",
    label: "Chilling",
    title: "Easy chilling places",
    mood: "slow cafes, soft days, no hard agenda",
    image: FEELING_IMAGES.village,
    note: "Lower-tempo places people choose for slow days, cafes, beaches, guesthouses and easy wandering.",
    places: [
      { name: "Chiang Mai", countryIso2: "TH", kind: "city" },
      { name: "Pai", countryIso2: "TH", kind: "town" },
      { name: "Koh Samui", countryIso2: "TH", kind: "island" },
      { name: "Ubud", countryIso2: "ID", kind: "town" },
      { name: "Hoi An", countryIso2: "VN", kind: "town" },
      { name: "Luang Prabang", countryIso2: "LA", kind: "town" },
      { name: "Lisbon", countryIso2: "PT", kind: "city" },
      { name: "Porto", countryIso2: "PT", kind: "city" },
      { name: "Essaouira", countryIso2: "MA", kind: "city" },
      { name: "San Cristobal de las Casas", countryIso2: "MX", kind: "town" },
      { name: "Granada", countryIso2: "ES", kind: "city" },
      { name: "Kotor", countryIso2: "ME", kind: "town" },
    ],
  },
  trekking: {
    group: "Snow & mountains",
    label: "Trekking",
    title: "Trekking places",
    mood: "trail towns, early starts, high air",
    image: FEELING_IMAGES.mountain,
    note: "Mountain gateways and trail towns known for serious walks, day hikes, alpine routes or expedition access.",
    places: [
      { name: "Kathmandu", countryIso2: "NP", kind: "city" },
      { name: "Pokhara", countryIso2: "NP", kind: "city" },
      { name: "Namche Bazaar", countryIso2: "NP", kind: "village" },
      { name: "Cusco", countryIso2: "PE", kind: "city" },
      { name: "Huaraz", countryIso2: "PE", kind: "city" },
      { name: "Chamonix", countryIso2: "FR", kind: "town" },
      { name: "Zermatt", countryIso2: "CH", kind: "village" },
      { name: "Interlaken", countryIso2: "CH", kind: "town" },
      { name: "Queenstown", countryIso2: "NZ", kind: "town" },
      { name: "Wanaka", countryIso2: "NZ", kind: "town" },
      { name: "Banff", countryIso2: "CA", kind: "town" },
      { name: "El Chalten", countryIso2: "AR", kind: "village" },
      { name: "Bariloche", countryIso2: "AR", kind: "city" },
      { name: "Innsbruck", countryIso2: "AT", kind: "city" },
      { name: "Leh", countryIso2: "IN", kind: "town" },
      { name: "Manali", countryIso2: "IN", kind: "town" },
      { name: "Moshi", countryIso2: "TZ", kind: "town" },
    ],
  },
  hiking: {
    group: "Snow & mountains",
    label: "Hiking",
    title: "Hiking bases",
    mood: "day trails, lake paths, views without expedition logistics",
    image: FEELING_IMAGES.mountain,
    note: "Scenic bases for travelers who want mountain air and strong walks without building the whole trip around endurance.",
    places: SNOW_MOUNTAIN_PLACES,
  },
  skiing: {
    group: "Snow & mountains",
    label: "Skiing",
    title: "Ski towns and snow cities",
    mood: "powder mornings, alpine villages, firelit evenings",
    image: FEELING_IMAGES.snow,
    note: "Cold-weather places where snow, scenery, and resort infrastructure shape the trip.",
    places: SNOW_MOUNTAIN_PLACES,
  },
  "cold-weather": {
    group: "Snow & mountains",
    label: "Cold weather",
    title: "Cold-weather journeys",
    mood: "clear air, wool layers, snow light, quiet streets",
    image: FEELING_IMAGES.snow,
    note: "Places where winter or cooler seasons make the atmosphere sharper, calmer, and more cinematic.",
    places: SNOW_MOUNTAIN_PLACES,
  },
  snowboarding: {
    group: "Snow & mountains",
    label: "Snowboarding",
    title: "Snowboard-ready mountain bases",
    mood: "steeper lines, younger alpine energy, big winter days",
    image: FEELING_IMAGES.snow,
    note: "Mountain towns and snow cities for travelers who want winter to be the main event.",
    places: SNOW_MOUNTAIN_PLACES,
  },
  mountains: {
    group: "Snow & mountains",
    label: "Mountains",
    title: "Mountain atmosphere",
    mood: "thin air, valleys, trains, and long views",
    image: FEELING_IMAGES.mountain,
    note: "Highland places where altitude changes the pace and the landscape becomes the itinerary.",
    places: SNOW_MOUNTAIN_PLACES,
  },
  relaxing: {
    group: "Luxury & romance",
    label: "Relaxing",
    title: "Relaxing places",
    mood: "spas, hot springs, soft scenery",
    image: FEELING_IMAGES.luxury,
    note: "Places associated with spas, hot springs, soft scenery, island pace or restful stays.",
    places: [
      { name: "Kyoto", countryIso2: "JP", kind: "city" },
      { name: "Hakone", countryIso2: "JP", kind: "town" },
      { name: "Bath", countryIso2: "GB", kind: "city" },
      { name: "Baden-Baden", countryIso2: "DE", kind: "town" },
      { name: "Karlovy Vary", countryIso2: "CZ", kind: "spa town" },
      { name: "Reykjavik", countryIso2: "IS", kind: "city" },
      { name: "Santorini", countryIso2: "GR", kind: "island" },
      { name: "Positano", countryIso2: "IT", kind: "village" },
      { name: "Sorrento", countryIso2: "IT", kind: "town" },
      { name: "Nusa Dua", countryIso2: "ID", kind: "resort area" },
      { name: "Koh Samui", countryIso2: "TH", kind: "island" },
      { name: "Queenstown", countryIso2: "NZ", kind: "town" },
    ],
  },
  luxury: {
    group: "Luxury & romance",
    label: "Luxury",
    title: "High-touch escapes",
    mood: "beautiful hotels, polished service, rare settings",
    image: FEELING_IMAGES.luxury,
    note: "Places where the experience is shaped by design, privacy, dining, hotels, and ease.",
    places: LUXURY_PLACES,
  },
  wellness: {
    group: "Luxury & romance",
    label: "Wellness",
    title: "Restorative journeys",
    mood: "hot springs, retreats, slow mornings",
    image: FEELING_IMAGES.luxury,
    note: "Destinations for travelers looking for quiet, recovery, ritual, and beautiful stillness.",
    places: LUXURY_PLACES,
  },
  honeymoon: {
    group: "Luxury & romance",
    label: "Honeymoon",
    title: "Romantic beginnings",
    mood: "privacy, views, soft evenings, memorable hotels",
    image: FEELING_IMAGES.luxury,
    note: "Places with enough atmosphere to make the trip feel like a chapter, not just a vacation.",
    places: LUXURY_PLACES,
  },
  romantic: {
    group: "Luxury & romance",
    label: "Romantic",
    title: "Romantic places",
    mood: "old streets, water views, intimate dinners",
    image: FEELING_IMAGES.oldTown,
    note: "Destinations with the kind of setting that changes the mood of the whole trip.",
    places: LUXURY_PLACES,
  },
  wildlife: {
    group: "Nature & wild",
    label: "Wildlife",
    title: "Wildlife-led journeys",
    mood: "wild landscapes, animal encounters, open horizons",
    image: FEELING_IMAGES.safari,
    note: "Places where nature is not scenery in the background, but the reason to go.",
    places: NATURE_PLACES,
  },
  safaris: {
    group: "Nature & wild",
    label: "Safaris",
    title: "Safari gateways",
    mood: "gold light, open plains, early drives",
    image: FEELING_IMAGES.safari,
    note: "Wildlife gateways and landscapes that put animals, distance, and dawn at the center of the journey.",
    places: NATURE_PLACES,
  },
  forests: {
    group: "Nature & wild",
    label: "Forests",
    title: "Forest and jungle moods",
    mood: "mist, canopy, rain, green quiet",
    image: FEELING_IMAGES.village,
    note: "Places where shade, rain, and vegetation make the trip feel slower and more sensory.",
    places: NATURE_PLACES,
  },
  deserts: {
    group: "Nature & wild",
    label: "Deserts",
    title: "Desert landscapes",
    mood: "dusk heat, sand, stars, silence",
    image: FEELING_IMAGES.luxury,
    note: "Places where the drama is in light, distance, road hours, and the cool of evening.",
    places: NATURE_PLACES,
  },
  lakes: {
    group: "Nature & wild",
    label: "Lakes",
    title: "Lake country escapes",
    mood: "clear water, mountain edges, quiet docks",
    image: FEELING_IMAGES.mountain,
    note: "Freshwater places where the trip softens around views, walks, boats, and still mornings.",
    places: NATURE_PLACES,
  },
  "off-grid": {
    group: "Nature & wild",
    label: "Off-grid",
    title: "Remote-feeling escapes",
    mood: "fewer signals, bigger skies, slower decisions",
    image: FEELING_IMAGES.safari,
    note: "Destinations for travelers who want distance from the usual travel noise.",
    places: NATURE_PLACES,
  },
  food: {
    group: "Food & nightlife",
    label: "Food",
    title: "Food-first cities",
    mood: "markets, steam, counter seats, late dinners",
    image: FEELING_IMAGES.market,
    note: "Places where eating is not a side quest, but the structure of the trip.",
    places: FOOD_NIGHT_PLACES,
  },
  "fine-dining": {
    group: "Food & nightlife",
    label: "Fine dining",
    title: "Fine-dining capitals",
    mood: "reservations, tasting menus, polished rooms",
    image: FEELING_IMAGES.market,
    note: "Destinations where the table can be the main event.",
    places: FOOD_NIGHT_PLACES,
  },
  "michelin-food": {
    group: "Food & nightlife",
    label: "Michelin food",
    title: "Michelin-minded journeys",
    mood: "precision, ceremony, restaurants worth planning around",
    image: FEELING_IMAGES.market,
    note: "Cities where food travelers build the trip around reservations and culinary range.",
    places: FOOD_NIGHT_PLACES,
  },
  nightlife: {
    group: "Food & nightlife",
    label: "Nightlife",
    title: "After-dark cities",
    mood: "music, late trains, glowing streets",
    image: FEELING_IMAGES.city,
    note: "Places where the destination becomes more alive after sunset.",
    places: FOOD_NIGHT_PLACES,
  },
  music: {
    group: "Food & nightlife",
    label: "Music",
    title: "Music-led trips",
    mood: "small venues, street sound, late nights",
    image: FEELING_IMAGES.city,
    note: "Cities where sound, performance, and night culture give the trip its pulse.",
    places: FOOD_NIGHT_PLACES,
  },
  shopping: {
    group: "Culture & city",
    label: "Shopping",
    title: "Shopping and design districts",
    mood: "concept stores, markets, fashion streets",
    image: FEELING_IMAGES.city,
    note: "Destinations for travelers who read a city through objects, fashion, markets, and craft.",
    places: CULTURE_PLACES,
  },
  architecture: {
    group: "Culture & city",
    label: "Architecture",
    title: "Architectural cities",
    mood: "facades, courtyards, skyline drama",
    image: FEELING_IMAGES.oldTown,
    note: "Places where buildings, streets, and spatial drama become the reason to wander.",
    places: CULTURE_PLACES,
  },
  history: {
    group: "Culture & city",
    label: "History",
    title: "Historic cities",
    mood: "old walls, layered streets, living memory",
    image: FEELING_IMAGES.oldTown,
    note: "Destinations where the past is still visible in the daily texture of the place.",
    places: CULTURE_PLACES,
  },
  temples: {
    group: "Culture & city",
    label: "Temples",
    title: "Temple and ritual journeys",
    mood: "incense, courtyards, sacred quiet",
    image: FEELING_IMAGES.culture,
    note: "Places where spiritual architecture and daily ritual shape the atmosphere.",
    places: CULTURE_PLACES,
  },
  spirituality: {
    group: "Culture & city",
    label: "Spirituality",
    title: "Spiritual routes",
    mood: "ritual, pilgrimage, silence, reflection",
    image: FEELING_IMAGES.culture,
    note: "Destinations where travel can feel slower, more reflective, and more inward.",
    places: CULTURE_PLACES,
  },
  art: {
    group: "Culture & city",
    label: "Art",
    title: "Art-led cities",
    mood: "galleries, studios, collections, creative streets",
    image: FEELING_IMAGES.art,
    note: "Cities where museums, galleries, and creative neighborhoods define the day.",
    places: CULTURE_PLACES,
  },
  design: {
    group: "Culture & city",
    label: "Design",
    title: "Design-conscious escapes",
    mood: "interiors, craft, hotels, visual culture",
    image: FEELING_IMAGES.art,
    note: "Destinations where taste, objects, architecture, and presentation matter.",
    places: CULTURE_PLACES,
  },
  photography: {
    group: "Culture & city",
    label: "Photography",
    title: "Photographic cities",
    mood: "golden hours, street layers, dramatic frames",
    image: FEELING_IMAGES.art,
    note: "Destinations with enough light, texture, architecture, and human rhythm to keep the camera awake.",
    places: CULTURE_PLACES,
  },
  anime: {
    group: "Culture & city",
    label: "Anime",
    title: "Anime and pop-culture routes",
    mood: "neon, shops, studios, fan pilgrimages",
    image: FEELING_IMAGES.city,
    note: "Cities where pop culture, character worlds, and urban energy overlap.",
    places: CULTURE_PLACES,
  },
  festivals: {
    group: "Culture & city",
    label: "Festivals",
    title: "Festival cities",
    mood: "crowds, ceremony, music, seasonal spectacle",
    image: FEELING_IMAGES.culture,
    note: "Destinations where timing the trip changes everything.",
    places: CULTURE_PLACES,
  },
  "road-trips": {
    group: "Ways to travel",
    label: "Road trips",
    title: "Road trip bases",
    mood: "open roads, weather windows, stops worth detouring for",
    image: FEELING_IMAGES.train,
    note: "Places that become more interesting when the journey between them matters.",
    places: JOURNEY_PLACES,
  },
  "train-travel": {
    group: "Ways to travel",
    label: "Train travel",
    title: "Rail-friendly journeys",
    mood: "stations, windows, arrivals without airports",
    image: FEELING_IMAGES.train,
    note: "Destinations that pair well with rail movement and slow arrival.",
    places: JOURNEY_PLACES,
  },
  "luxury-trains": {
    group: "Ways to travel",
    label: "Luxury trains",
    title: "Luxury rail imagination",
    mood: "dining cars, slow landscapes, polished transit",
    image: FEELING_IMAGES.train,
    note: "Places where the journey itself can feel as curated as the destination.",
    places: JOURNEY_PLACES,
  },
  "digital-nomad": {
    group: "Ways to travel",
    label: "Digital nomad",
    title: "Longer-stay city bases",
    mood: "cafes, apartments, community, manageable days",
    image: FEELING_IMAGES.city,
    note: "Places that support a slower rhythm where life and travel overlap.",
    places: JOURNEY_PLACES,
  },
  family: {
    group: "Ways to travel",
    label: "Family",
    title: "Family-friendly journeys",
    mood: "easy logistics, gentle pacing, memorable firsts",
    image: FEELING_IMAGES.village,
    note: "Destinations where wonder matters, but friction has to stay low.",
    places: JOURNEY_PLACES,
  },
  "solo-female-travel": {
    group: "Ways to travel",
    label: "Solo female travel",
    title: "Solo-conscious city bases",
    mood: "confidence, walkability, ease, clear logistics",
    image: FEELING_IMAGES.city,
    note: "Destinations that reward independent movement and practical confidence.",
    places: JOURNEY_PLACES,
  },
  backpacking: {
    group: "Ways to travel",
    label: "Backpacking",
    title: "Backpacking routes",
    mood: "guesthouses, transit days, budget freedom",
    image: FEELING_IMAGES.village,
    note: "Places that work when the trip is flexible, social, and cost-aware.",
    places: JOURNEY_PLACES,
  },
  "hidden-gems": {
    group: "Ways to travel",
    label: "Hidden gems",
    title: "Less-obvious beginnings",
    mood: "quiet streets, smaller names, deeper reward",
    image: FEELING_IMAGES.oldTown,
    note: "Places that ask for a closer look rather than instant recognition.",
    places: JOURNEY_PLACES,
  },
  "motorsports": {
    group: "Ways to travel",
    label: "Motorsports",
    title: "Race-weekend cities",
    mood: "circuits, engines, hotels, event energy",
    image: FEELING_IMAGES.city,
    note: "Destinations where timing, spectacle, and speed shape the trip.",
    places: [
      { name: "Monaco", countryIso2: "MC", kind: "race city" },
      { name: "Singapore", countryIso2: "SG", kind: "night race city" },
      { name: "Abu Dhabi", countryIso2: "AE", kind: "race city" },
      { name: "Barcelona", countryIso2: "ES", kind: "race city" },
      { name: "Austin", countryIso2: "US", kind: "race city" },
      { name: "Melbourne", countryIso2: "AU", kind: "race city" },
    ],
  },
  "adventure-sports": {
    group: "Snow & mountains",
    label: "Adventure sports",
    title: "Adventure-sport bases",
    mood: "height, speed, water, weather",
    image: FEELING_IMAGES.mountain,
    note: "Places where the trip has a pulse: rafting, climbing, paragliding, biking, and big landscape energy.",
    places: SNOW_MOUNTAIN_PLACES,
  },
  camping: {
    group: "Nature & wild",
    label: "Camping",
    title: "Open-air escapes",
    mood: "stars, fires, morning cold, wide silence",
    image: FEELING_IMAGES.safari,
    note: "Destinations where sleeping closer to the landscape changes the feeling of travel.",
    places: NATURE_PLACES,
  },
};

type DiscoverPageProps = {
  searchParams: Promise<{
    activity?: string;
    country?: string;
    feel?: string;
    q?: string;
  }>;
};

function toPlaceSlug(name: string, countryIso2: string) {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${countryIso2.toLowerCase()}`;
}

function getPlaceImage(place: Pick<DiscoveryPlace, "kind" | "countryIso2" | "name">) {
  const name = place.name.toLowerCase();
  const kind = place.kind.toLowerCase();

  if (/(beach|island|coast|resort|bay|maldives|boracay|maui|kauai|phuket|samui|zanzibar|santorini|mykonos|ibiza|mallorca)/i.test(`${name} ${kind}`)) {
    return FEELING_IMAGES.islands;
  }

  if (/(trek|mountain|alpine|hike|chamonix|zermatt|interlaken|banff|queenstown|wanaka|cusco|himalaya|pokhara|leh|manali)/i.test(`${name} ${kind}`)) {
    return FEELING_IMAGES.mountain;
  }

  if (/(village|old|medina|kotor|hoi an|luang prabang|kyoto|venice|granada|porto|lisbon|dubrovnik|sorrento|positano)/i.test(`${name} ${kind}`)) {
    return FEELING_IMAGES.oldTown;
  }

  if (/(food|market|cafe|tokyo|osaka|bangkok|singapore|hanoi|istanbul|seoul|taipei)/i.test(`${name} ${kind}`)) {
    return FEELING_IMAGES.market;
  }

  if (/(town|village|spa|relax|slow)/i.test(kind)) {
    return FEELING_IMAGES.village;
  }

  return FEELING_IMAGES.city;
}

function getPlaceMood(place: Pick<DiscoveryPlace, "kind" | "name">) {
  const name = place.name.toLowerCase();
  const kind = place.kind.toLowerCase();

  if (/(beach|island|coast|bay|resort)/i.test(`${name} ${kind}`)) return "salt air and slow mornings";
  if (/(trek|mountain|alpine|hike|chamonix|zermatt|banff|pokhara|cusco)/i.test(`${name} ${kind}`)) return "high air and long views";
  if (/(food|market|tokyo|osaka|bangkok|singapore|hanoi|seoul)/i.test(`${name} ${kind}`)) return "markets, steam, and after-dark appetite";
  if (/(village|old|medina|kyoto|hoi an|luang prabang|dubrovnik|kotor|porto)/i.test(`${name} ${kind}`)) return "old streets and local rhythm";
  if (/(spa|relax|bath|baden|hakone|reykjavik)/i.test(`${name} ${kind}`)) return "soft scenery and restorative days";
  return "urban texture, food, and cultural momentum";
}

function getPlaceReason(place: Pick<DiscoveryPlace, "kind" | "name" | "countryName">) {
  const kind = formatDestinationType(place.kind);
  const mood = getPlaceMood(place);
  return `${kind} energy with ${mood}; a place to begin shaping a trip around atmosphere, pace, and the feeling of arrival.`;
}

function getContextTitle({
  activePath,
  selectedCountryName,
}: {
  activePath?: { title: string };
  selectedCountryName?: string;
}) {
  if (activePath) return activePath.title;
  if (selectedCountryName) {
    return `${formatTitleCase(selectedCountryName)}, Through a Traveler’s Lens`;
  }
  return "Where the World Starts to Open";
}

function getContextCopy({
  activePath,
  selectedCountryName,
}: {
  activePath?: { strapline?: string; mood?: string; note?: string };
  selectedCountryName?: string;
}) {
  if (activePath?.strapline || activePath?.mood) return activePath.strapline ?? activePath.mood;
  if (selectedCountryName) {
    return "Move past the map label and start with the feeling: cities, coastlines, old quarters, food streets, rail towns, and the first reasons a traveler might care.";
  }
  return "Browse destinations by atmosphere: coast, culture, food, mountains, villages, cities, and the emotional logic of a journey.";
}

function findActivityPlaces(activity: (typeof ACTIVITIES)[string] | undefined) {
  if (!activity) return undefined;
  const countries = getGlobalCountries();
  return activity.places.flatMap((target): DiscoveryPlace[] => {
    const matches = getGlobalCities({
      countryIso2: target.countryIso2,
      searchQuery: target.name,
      limit: 20,
    }).filter(
      (city) =>
        city.name.toLowerCase() === target.name.toLowerCase() &&
        city.countryIso2 === target.countryIso2,
    );

    if (matches.length) {
      return matches.slice(0, 1).map((place) => ({
        ...place,
        kind: target.kind,
      }));
    }

    return [
      {
        slug: toPlaceSlug(target.name, target.countryIso2),
        name: target.name,
        countryIso2: target.countryIso2,
        countryName: countries.find((country) => country.iso2 === target.countryIso2)?.name ?? target.countryIso2,
        stateCode: target.region ?? "",
        kind: target.kind,
        coordinates: undefined,
      },
    ];
  });
}

export default async function DiscoverPage({ searchParams }: DiscoverPageProps) {
  const params = await searchParams;
  const feeling = params.feel ? FEELINGS[params.feel] : undefined;
  const activity = params.activity ? ACTIVITIES[params.activity] : undefined;
  const selectedActivitySlug = activity ? params.activity : undefined;
  const activePath = activity ?? feeling;
  const countryIso2 = (params.country ?? feeling?.countryIso2)?.toUpperCase();
  const searchQuery = params.q ?? feeling?.searchQuery;

  const allCountries = getGlobalCountries();
  const places: DiscoveryPlace[] =
    findActivityPlaces(activity) ??
    getGlobalCities({
      countryIso2,
      searchQuery,
      limit: 96,
    }).map((place) => ({ ...place, kind: "city" }));
  const activityCountryCodes = new Set(places.map((place) => place.countryIso2));
  const matchingCountries = activity
    ? allCountries.filter((country) => activityCountryCodes.has(country.iso2))
    : getGlobalCountries({ searchQuery }).slice(0, 48);
  const selectedCountry = countryIso2
    ? allCountries.find((country) => country.iso2 === countryIso2)
    : undefined;
  const featuredPlace = places[0];
  const supportingPlaces = places.slice(1, 13);
  const sceneImage = feeling?.image ?? activity?.image ?? FEELING_IMAGES.world;

  return (
    <main className="min-h-screen bg-[#090b0b] text-washi-50">
      <section className="relative isolate min-h-[78svh] overflow-hidden px-6 py-16 sm:py-20">
        <img
          src={sceneImage}
          alt=""
          className="image-drift absolute inset-0 -z-30 h-full w-full object-cover saturate-[1.16]"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(5,7,7,.94),rgba(5,7,7,.58)_46%,rgba(5,7,7,.28)),linear-gradient(0deg,rgba(5,7,7,.95),rgba(5,7,7,.2)_58%,rgba(5,7,7,.45))]" />
        <div className="mx-auto grid min-h-[62svh] max-w-7xl content-end gap-12 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <Link
            href="/"
            className="absolute left-6 top-7 text-sm font-semibold text-kintsugi-300 transition hover:text-white sm:left-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
          >
            Home
          </Link>
          <div>
            <p className="luxury-kicker text-kintsugi-300">GLOBAL TRAVEL DISCOVERY</p>
            <h1 className="luxury-display mt-4 max-w-5xl text-[clamp(3.3rem,8.4vw,8rem)] font-semibold leading-[0.92] text-white">
              {getContextTitle({ activePath, selectedCountryName: selectedCountry?.name })}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-9 text-white/78">
              {getContextCopy({ activePath, selectedCountryName: selectedCountry?.name })}
            </p>
          </div>
          <div className="border-l border-kintsugi-300/50 bg-black/26 py-4 pl-6 backdrop-blur-md">
            <p className="luxury-kicker text-kintsugi-300/82">WHY THIS VIEW</p>
            <p className="mt-4 text-base leading-8 text-white/76">
              Every destination below is framed as a possible beginning: a mood, a landscape, a cultural texture, and a reason to look closer.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_0%,rgba(209,170,99,.14),transparent_34%)]" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.68fr_1.32fr]">
          <div>
            <p className="luxury-kicker text-kintsugi-300">CHOOSE A TRAVEL CURRENT</p>
            <h2 className="mt-4 font-display text-[clamp(2.6rem,5vw,5.4rem)] font-semibold leading-[0.95] text-white">
              Start with the feeling, then let the map respond.
            </h2>
            <p className="mt-6 max-w-md text-base leading-8 text-white/66">
              These are not tags. They are travel identities: each one changes the atmosphere, the shortlist, and the reason a destination appears.
            </p>
          </div>
          <div>
            <div className="space-y-7">
              {activity ? (
                <div className="relative mb-9 overflow-hidden rounded-[1.6rem] border border-kintsugi-300/55 bg-sumi-950 shadow-editorial-deep ring-1 ring-kintsugi-300/25">
                  <img
                    src={activity.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-42 saturate-[1.18]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,7,.88),rgba(5,7,7,.58)_52%,rgba(5,7,7,.38)),linear-gradient(0deg,rgba(5,7,7,.88),rgba(5,7,7,.28))]" />
                  <div className="relative grid gap-7 p-6 sm:p-8 lg:grid-cols-[1fr_.72fr] lg:items-end">
                    <div>
                      <p className="luxury-kicker text-kintsugi-300">SELECTED TRAVEL IDENTITY</p>
                      <h3 className="mt-3 font-display text-[clamp(2.5rem,5vw,5.5rem)] font-semibold leading-[0.92] text-white">
                        {activity.title}
                      </h3>
                      <p className="mt-4 max-w-2xl text-base leading-8 text-white/78">{activity.note}</p>
                    </div>
                    <div className="rounded-[1.2rem] border border-white/18 bg-black/34 p-5 backdrop-blur-md">
                      <p className="luxury-kicker text-white/52">ATMOSPHERE</p>
                      <p className="mt-3 text-xl font-semibold leading-8 text-white">{activity.mood}</p>
                      <Link
                        href="/discover"
                        className="mt-5 inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-kintsugi-300 hover:bg-kintsugi-300 hover:text-sumi-950"
                      >
                        Clear this current
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null}

              {ACTIVITY_GROUPS.map((group) => {
                const entries = Object.entries(ACTIVITIES).filter(([, item]) => item.group === group);
                const story = GROUP_STORIES[group];

                return (
                  <section key={group} className="border-t border-white/14 pt-6">
                    <div className="mb-5 grid gap-4 sm:grid-cols-[.55fr_1fr] sm:items-end">
                      <div>
                        <p className="luxury-kicker text-kintsugi-300/82">{group}</p>
                        <h3 className="mt-2 font-display text-[clamp(1.7rem,3vw,2.8rem)] font-semibold leading-none text-white">
                          {story.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-end justify-between gap-4">
                        <p className="max-w-xl text-sm leading-6 text-white/58">{story.body}</p>
                        <span className="rounded-full border border-white/14 bg-white/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/56">
                          {entries.length} currents
                        </span>
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {entries.map(([slug, item]) => {
                        const selected = selectedActivitySlug === slug;

                        return (
                          <Link
                            key={slug}
                            href={`/discover?activity=${slug}`}
                            aria-current={selected ? "page" : undefined}
                            className={`group relative min-h-[10.5rem] overflow-hidden rounded-[1.18rem] border p-4 shadow-editorial-deep transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kintsugi-300 ${
                              selected
                                ? "border-kintsugi-300 bg-kintsugi-300/18 ring-2 ring-kintsugi-300/70"
                                : "border-white/14 bg-white/[0.055] hover:border-kintsugi-300/70 hover:bg-white/[0.09]"
                            }`}
                          >
                            <img
                              src={item.image}
                              alt=""
                              className={`absolute inset-0 h-full w-full object-cover saturate-[1.15] transition duration-700 group-hover:scale-105 ${
                                selected ? "opacity-58" : "opacity-34"
                              }`}
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.12),rgba(0,0,0,.78))]" />
                            <div className="relative flex min-h-[8.35rem] flex-col justify-between">
                              <div className="flex items-start justify-between gap-3">
                                <p className="font-display text-[clamp(1.35rem,2.2vw,2rem)] font-semibold leading-none text-white">
                                  {formatTag(item.label)}
                                </p>
                                {selected ? (
                                  <span className="grid h-8 min-w-8 place-items-center rounded-full bg-kintsugi-300 px-2 text-xs font-black uppercase tracking-[0.08em] text-sumi-950 shadow-[0_0_28px_rgba(218,181,92,.45)]">
                                    On
                                  </span>
                                ) : null}
                              </div>
                              <p className="mt-4 text-xs leading-5 text-white/74">{item.mood}</p>
                              <span
                                className={`mt-3 h-1 w-16 rounded-full transition ${
                                  selected ? "bg-kintsugi-300" : "bg-white/20 group-hover:bg-kintsugi-300/70"
                                }`}
                                aria-hidden
                              />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
            <div className="mt-12">
              <p className="luxury-kicker text-kintsugi-300">MOOD ROUTES</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {Object.entries(FEELINGS).map(([slug, item]) => (
                <Link
                  key={slug}
                  href={`/discover?feel=${slug}`}
                  aria-current={params.feel === slug ? "page" : undefined}
                  className={`group relative min-h-[18rem] overflow-hidden rounded-[1.45rem] border bg-sumi-900 shadow-editorial-deep transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kintsugi-300 ${
                    params.feel === slug
                      ? "border-kintsugi-300 ring-2 ring-kintsugi-300/55"
                      : "border-white/16 hover:border-kintsugi-300/70"
                  }`}
                >
                  <img
                    src={item.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.34)_40%,rgba(0,0,0,.88))]" />
                  <div className="relative flex min-h-[18rem] flex-col justify-end p-6">
                    <p className="luxury-kicker text-kintsugi-300/86">MOOD ROUTE</p>
                    <h3 className="mt-3 font-display text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-none text-white">
                      {formatLabel(item.label)}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/72">{item.strapline}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/discover"
              className="mt-6 inline-flex w-fit rounded-full border border-white/16 bg-white/[0.07] px-5 py-3 text-sm font-semibold text-white/76 transition hover:border-kintsugi-300/60 hover:text-white"
            >
              Return to the world atlas
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="luxury-kicker text-kintsugi-300/78">COUNTRY LENSES</p>
            <div className="mt-6 grid gap-3">
              {matchingCountries.map((country) => (
                <Link
                  key={country.iso2}
                  href={`/discover?country=${country.iso2}`}
                  className="group border-b border-white/12 pb-3 text-sm text-white/70 transition hover:border-kintsugi-300/50 hover:text-white"
                >
                  <span className="block font-display text-xl font-semibold leading-tight text-white group-hover:text-kintsugi-300">
                    {formatTitleCase(country.name)}
                  </span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-white/42">
                    Open the Atmosphere
                  </span>
                </Link>
              ))}
            </div>
          </aside>

          <div>
            <div className="mb-10 max-w-3xl">
              <p className="luxury-kicker text-kintsugi-300/78">DESTINATION STORIES</p>
              <h2 className="mt-3 font-display text-[clamp(2.7rem,5.8vw,6rem)] font-semibold leading-[0.94] text-white">
                {selectedCountry ? formatTitleCase(selectedCountry.name) : "Global Atlas"}
              </h2>
            </div>

            {featuredPlace ? (
              <Link
                href={`/discover?q=${encodeURIComponent(featuredPlace.name)}`}
                className="group relative mb-8 block min-h-[34rem] overflow-hidden rounded-[1.8rem] border border-white/16 bg-sumi-900 shadow-editorial-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kintsugi-300"
              >
                <img
                  src={getPlaceImage(featuredPlace)}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover saturate-[1.2] transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.28)_40%,rgba(0,0,0,.86)),linear-gradient(90deg,rgba(0,0,0,.66),transparent)]" />
                <div className="relative flex min-h-[34rem] flex-col justify-end p-7 sm:p-10">
                  <p className="luxury-kicker text-kintsugi-300/86">Begin here</p>
                  <h3 className="mt-4 max-w-3xl font-display text-[clamp(3.4rem,8vw,7.5rem)] font-semibold leading-[0.88] text-white">
                    {featuredPlace.name}
                  </h3>
                  <p className="mt-4 text-lg leading-8 text-white/82">
                    {formatMetadata([featuredPlace.countryName, getPlaceMood(featuredPlace)])}
                  </p>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-white/76">
                    {getPlaceReason(featuredPlace)}
                  </p>
                </div>
              </Link>
            ) : null}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {supportingPlaces.map((place, index) => (
                <Link
                  key={`${place.slug}-${place.kind}-${place.countryIso2}-${index}`}
                  href={`/discover?q=${encodeURIComponent(place.name)}`}
                  className={`group relative min-h-[23rem] overflow-hidden rounded-[1.35rem] border border-white/14 bg-sumi-900 shadow-editorial-deep transition hover:-translate-y-1 hover:border-kintsugi-300/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kintsugi-300 ${
                    index % 5 === 0 ? "md:row-span-2 md:min-h-[31rem]" : ""
                  }`}
                >
                  <img
                    src={getPlaceImage(place)}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover saturate-[1.16] transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.34)_42%,rgba(0,0,0,.9))]" />
                  <div className="relative flex min-h-[23rem] flex-col justify-end p-6">
                    <p className="luxury-kicker text-kintsugi-300/84">{formatDestinationType(place.kind)}</p>
                    <h3 className="mt-3 font-display text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-none text-white">
                      {place.name}
                    </h3>
                    <p className="mt-3 text-sm font-semibold text-white/78">{formatTitleCase(place.countryName)}</p>
                    <p className="mt-4 text-sm leading-7 text-white/72">{getPlaceReason(place)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
