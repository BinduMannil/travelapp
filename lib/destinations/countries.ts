export type CountryBuildStatus = "live" | "queued";

export type CountryOption = {
  slug: string;
  name: string;
  region: string;
  status: CountryBuildStatus;
  summary: string;
  image: string;
  accent: string;
};

export const COUNTRY_OPTIONS: CountryOption[] = [
  {
    slug: "vietnam",
    name: "Vietnam",
    region: "Southeast Asia",
    status: "live",
    summary:
      "Street energy, regional weather, motorbike culture, coffee, beaches, mountains, and long-route planning.",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2400&q=86",
    accent: "#F59E0B",
  },
  {
    slug: "thailand",
    name: "Thailand",
    region: "Southeast Asia",
    status: "queued",
    summary:
      "Bangkok food days, island pacing, temples, night markets, trains, beaches, and northern mountains.",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=2400&q=86",
    accent: "#38BDF8",
  },
  {
    slug: "indonesia",
    name: "Indonesia",
    region: "Southeast Asia",
    status: "queued",
    summary:
      "Bali, Java, islands, volcanoes, surf, food, temples, ferries, and multi-island logistics.",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2400&q=86",
    accent: "#22C55E",
  },
  {
    slug: "japan",
    name: "Japan",
    region: "East Asia",
    status: "queued",
    summary:
      "Cities, rail routes, seasons, food culture, mountain regions, islands, and everyday etiquette.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2400&q=86",
    accent: "#F472B6",
  },
  {
    slug: "south-korea",
    name: "South Korea",
    region: "East Asia",
    status: "queued",
    summary:
      "Seoul neighborhoods, food streets, skincare, transit, culture, coast, mountains, and late-night cities.",
    image:
      "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=2400&q=86",
    accent: "#60A5FA",
  },
  {
    slug: "united-arab-emirates",
    name: "United Arab Emirates",
    region: "Middle East",
    status: "queued",
    summary:
      "Dubai, Abu Dhabi, desert routes, architecture, beaches, food, shopping, and high-comfort logistics.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=86",
    accent: "#F97316",
  },
  {
    slug: "italy",
    name: "Italy",
    region: "Europe",
    status: "queued",
    summary:
      "Rome, Florence, Venice, coasts, rail days, food regions, islands, museums, and slow-city planning.",
    image:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=2400&q=86",
    accent: "#34D399",
  },
  {
    slug: "greece",
    name: "Greece",
    region: "Europe",
    status: "queued",
    summary:
      "Athens, islands, ferries, beaches, ruins, food, summer timing, and quieter shoulder-season routes.",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=2400&q=86",
    accent: "#38BDF8",
  },
  {
    slug: "switzerland",
    name: "Switzerland",
    region: "Europe",
    status: "queued",
    summary:
      "Alpine villages, rail passes, lakes, mountain weather, hiking windows, and premium route planning.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=86",
    accent: "#A7F3D0",
  },
  {
    slug: "norway",
    name: "Norway",
    region: "Europe",
    status: "queued",
    summary:
      "Fjords, rail, ferries, northern lights, road trips, coastal towns, and weather-aware pacing.",
    image:
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=2400&q=86",
    accent: "#67E8F9",
  },
  {
    slug: "morocco",
    name: "Morocco",
    region: "Africa",
    status: "queued",
    summary:
      "Marrakech, Fes, desert routes, riads, souks, mountains, food, and medina navigation.",
    image:
      "https://images.unsplash.com/photo-1548018560-c7196548e84d?auto=format&fit=crop&w=2400&q=86",
    accent: "#FB923C",
  },
  {
    slug: "united-states",
    name: "United States",
    region: "North America",
    status: "queued",
    summary:
      "Big cities, national parks, road trips, food regions, flights, seasons, and state-by-state planning.",
    image:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=2400&q=86",
    accent: "#93C5FD",
  },
  {
    slug: "canada",
    name: "Canada",
    region: "North America",
    status: "queued",
    summary:
      "Mountain parks, cities, lakes, road trips, winter travel, wildlife, and long-distance logistics.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=86",
    accent: "#F87171",
  },
  {
    slug: "peru",
    name: "Peru",
    region: "South America",
    status: "queued",
    summary:
      "Lima, Cusco, Machu Picchu, altitude planning, food, trains, trekking, and sacred valley routes.",
    image:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2400&q=86",
    accent: "#FBBF24",
  },
  {
    slug: "south-africa",
    name: "South Africa",
    region: "Africa",
    status: "queued",
    summary:
      "Cape Town, wine regions, safaris, coast, food, road trips, safety planning, and seasonal timing.",
    image:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=2400&q=86",
    accent: "#4ADE80",
  },
];

export function getCountryOption(slug: string) {
  return COUNTRY_OPTIONS.find((country) => country.slug === slug) ?? null;
}

