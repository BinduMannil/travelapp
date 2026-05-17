export type CountryBuildStatus = "live" | "queued";

export type CountryOption = {
  slug: string;
  name: string;
  region: string;
  status: CountryBuildStatus;
  summary: string;
  image: string;
  accent: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroBody?: string;
  overviewCards?: CountryContentCard[];
  essentialLinks?: CountryLink[];
  featuredExperiences?: CountryContentCard[];
  routeCta?: {
    eyebrow: string;
    title: string;
    href: string;
    label: string;
  };
};

export type PlaceBuildStatus = "live" | "queued";

export type CountryLink = {
  label: string;
  href: string;
  description: string;
};

export type CountryContentCard = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  image: string;
};

export type PlaceOption = {
  slug: string;
  countrySlug: string;
  name: string;
  kind: "city" | "town" | "village" | "island" | "region";
  status: PlaceBuildStatus;
  summary: string;
  image?: string;
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
    heroEyebrow: "Vietnam",
    heroTitle: "Timeless heritage. Endless discovery.",
    heroBody:
      "From ancient traditions to modern vibrance, explore the soul of Vietnam through its landscapes, culture, cuisine, and people.",
    overviewCards: [
      {
        eyebrow: "Vietnam",
        title: "Country Guide",
        description:
          "Discover Vietnam's history, culture, regions, and essential travel insights.",
        href: "/country/vietnam",
        image:
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=84",
      },
      {
        eyebrow: "Cities",
        title: "Explore Cities",
        description:
          "From vibrant metropolises to charming ancient towns, explore the best of Vietnam's cities.",
        href: "#cities",
        image:
          "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=84",
      },
      {
        eyebrow: "Planning",
        title: "Plan Your Journey",
        description:
          "Everything you need to plan the perfect trip, from routes to food, phrases, and local tips.",
        href: "/country/vietnam/itinerary",
        image:
          "https://images.unsplash.com/photo-1690336501870-eab322a6ee2d?auto=format&fit=crop&w=1400&q=84",
      },
    ],
    essentialLinks: [
      {
        label: "Itineraries",
        href: "/country/vietnam/itinerary",
        description: "Curated travel ideas",
      },
      {
        label: "Cuisine",
        href: "/country/vietnam/cuisine",
        description: "Flavors of Vietnam",
      },
      {
        label: "Beverages",
        href: "/country/vietnam/beverages",
        description: "Local drinks to try",
      },
      {
        label: "Famous For",
        href: "/country/vietnam/famous-for",
        description: "What Vietnam is known for",
      },
      {
        label: "Language",
        href: "/country/vietnam/languages",
        description: "Vietnamese phrases guide",
      },
    ],
    featuredExperiences: [
      {
        eyebrow: "Cruise",
        title: "Ha Long Bay Cruise",
        description: "Sail through iconic limestone karsts and emerald waters.",
        href: "/city/ha-long",
        image:
          "https://images.unsplash.com/photo-1669819894338-53ab7afc6958?auto=format&fit=crop&w=1200&q=84",
      },
      {
        eyebrow: "Culture",
        title: "Hoi An Ancient Town",
        description: "Wander lantern-lit streets steeped in history.",
        href: "/city/hoi-an",
        image:
          "https://images.unsplash.com/photo-1560113855-2ea616c915ee?auto=format&fit=crop&w=1200&q=84",
      },
      {
        eyebrow: "Nature",
        title: "Sapa Mountain Retreat",
        description:
          "Discover breathtaking terraced valleys and local traditions.",
        href: "/city/sapa",
        image:
          "https://images.unsplash.com/photo-1690336501870-eab322a6ee2d?auto=format&fit=crop&w=1200&q=84",
      },
      {
        eyebrow: "Wellness",
        title: "Da Nang Beach Escape",
        description: "Relax on pristine beaches and coastal gateways.",
        href: "/city/da-nang",
        image:
          "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1200&q=84",
      },
    ],
    routeCta: {
      eyebrow: "Bespoke travel planning",
      title: "Craft your perfect Vietnam journey with our experts.",
      href: "/concierge",
      label: "Contact concierge",
    },
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
    slug: "france",
    name: "France",
    region: "Europe",
    status: "queued",
    summary:
      "Paris, wine regions, Riviera days, alpine towns, markets, museums, rail routes, and slow food-led planning.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2400&q=86",
    accent: "#D8AA4F",
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

export const PLACE_OPTIONS: PlaceOption[] = [
  { slug: "ho-chi-minh-city", countrySlug: "vietnam", name: "Ho Chi Minh City", kind: "city", status: "live", summary: "Southern street energy, coffee culture, markets, museums, rooftops, and Mekong access.", image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=84" },
  { slug: "hanoi", countrySlug: "vietnam", name: "Hanoi", kind: "city", status: "live", summary: "Old Quarter lanes, lakes, egg coffee, northern food, French-era streets, and capital rhythm.", image: "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=1200&q=84" },
  { slug: "da-nang", countrySlug: "vietnam", name: "Da Nang", kind: "city", status: "live", summary: "Beach mornings, seafood nights, bridges, mountain roads, and easy Hoi An or Hue access.", image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=84" },
  { slug: "hoi-an", countrySlug: "vietnam", name: "Hoi An", kind: "town", status: "live", summary: "Lantern streets, tailoring, riverside evenings, food, cafes, and central Vietnam softness.", image: "https://images.unsplash.com/photo-1560113855-2ea616c915ee?auto=format&fit=crop&w=1200&q=84" },
  { slug: "hue", countrySlug: "vietnam", name: "Hue", kind: "city", status: "live", summary: "Imperial citadel walls, royal tombs, pagodas, Perfume River, and central-region cuisine.", image: "https://images.unsplash.com/photo-1584441761015-c7447e8ef9cc?auto=format&fit=crop&w=1200&q=84" },
  { slug: "sapa", countrySlug: "vietnam", name: "Sapa", kind: "town", status: "live", summary: "Terraced valleys, mountain weather, trekking, ethnic villages, and misty northern views.", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=84" },
  { slug: "phu-quoc", countrySlug: "vietnam", name: "Phu Quoc", kind: "island", status: "live", summary: "Beaches, snorkeling, seafood, night markets, resorts, and sunset island pacing.", image: "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1200&q=84" },
  { slug: "can-tho", countrySlug: "vietnam", name: "Can Tho", kind: "city", status: "live", summary: "Mekong Delta mornings, floating markets, fruit gardens, riverside food, and canals.", image: "https://images.unsplash.com/photo-1744760654110-c0befa6f57b3?auto=format&fit=crop&w=1200&q=84" },
  { slug: "bangkok", countrySlug: "thailand", name: "Bangkok", kind: "city", status: "queued", summary: "Food streets, river ferries, temples, malls, nightlife, and first-arrival logistics." },
  { slug: "chiang-mai", countrySlug: "thailand", name: "Chiang Mai", kind: "city", status: "queued", summary: "Northern temples, cafes, mountains, markets, elephants, and slower stays." },
  { slug: "phuket", countrySlug: "thailand", name: "Phuket", kind: "island", status: "queued", summary: "Beaches, resorts, boat trips, nightlife, rain timing, and island transfers." },
  { slug: "koh-samui", countrySlug: "thailand", name: "Koh Samui", kind: "island", status: "queued", summary: "Island resorts, beaches, wellness stays, scooters, ferries, and Gulf weather." },
  { slug: "krabi", countrySlug: "thailand", name: "Krabi", kind: "town", status: "queued", summary: "Limestone cliffs, Railay, boat days, beaches, and island hopping." },
  { slug: "jakarta", countrySlug: "indonesia", name: "Jakarta", kind: "city", status: "queued", summary: "Arrival logistics, food, malls, traffic, neighborhoods, and Java connections." },
  { slug: "bali", countrySlug: "indonesia", name: "Bali", kind: "island", status: "queued", summary: "Ubud, Canggu, surf, temples, traffic, wellness, and island pacing." },
  { slug: "yogyakarta", countrySlug: "indonesia", name: "Yogyakarta", kind: "city", status: "queued", summary: "Borobudur, Prambanan, arts, food, trains, and Java culture." },
  { slug: "lombok", countrySlug: "indonesia", name: "Lombok", kind: "island", status: "queued", summary: "Beaches, Rinjani, surf towns, ferries, and quieter island days." },
  { slug: "komodo", countrySlug: "indonesia", name: "Komodo", kind: "island", status: "queued", summary: "Boat trips, dragons, diving, Labuan Bajo, and weather-sensitive logistics." },
  { slug: "tokyo", countrySlug: "japan", name: "Tokyo", kind: "city", status: "queued", summary: "Neighborhoods, restaurants, transit, shopping, hotels, and dense first-trip planning." },
  { slug: "kyoto", countrySlug: "japan", name: "Kyoto", kind: "city", status: "queued", summary: "Temples, lanes, food, craft, crowds, buses, gardens, and early mornings." },
  { slug: "osaka", countrySlug: "japan", name: "Osaka", kind: "city", status: "queued", summary: "Food, nightlife, shopping, day trips, hotels, and Kansai rail logic." },
  { slug: "sapporo", countrySlug: "japan", name: "Sapporo", kind: "city", status: "queued", summary: "Hokkaido food, snow, beer, parks, winter logistics, and regional access." },
  { slug: "okinawa", countrySlug: "japan", name: "Okinawa", kind: "region", status: "queued", summary: "Islands, beaches, driving, diving, culture, and subtropical weather." },
  { slug: "seoul", countrySlug: "south-korea", name: "Seoul", kind: "city", status: "queued", summary: "Neighborhoods, food, skincare, palaces, transit, cafes, and late nights." },
  { slug: "busan", countrySlug: "south-korea", name: "Busan", kind: "city", status: "queued", summary: "Beaches, seafood, markets, hillside villages, trains, and coastal rhythm." },
  { slug: "jeju", countrySlug: "south-korea", name: "Jeju", kind: "island", status: "queued", summary: "Driving routes, beaches, waterfalls, food, hiking, and weather windows." },
  { slug: "dubai", countrySlug: "united-arab-emirates", name: "Dubai", kind: "city", status: "queued", summary: "Architecture, beaches, shopping, restaurants, desert trips, and high-comfort logistics." },
  { slug: "abu-dhabi", countrySlug: "united-arab-emirates", name: "Abu Dhabi", kind: "city", status: "queued", summary: "Museums, islands, mosques, beaches, luxury stays, and cultural planning." },
  { slug: "ras-al-khaimah", countrySlug: "united-arab-emirates", name: "Ras Al Khaimah", kind: "city", status: "queued", summary: "Mountains, resorts, road trips, beaches, and desert edges." },
  { slug: "rome", countrySlug: "italy", name: "Rome", kind: "city", status: "queued", summary: "Ancient sites, food, neighborhoods, museums, churches, and heat-aware pacing." },
  { slug: "florence", countrySlug: "italy", name: "Florence", kind: "city", status: "queued", summary: "Art, food, hotels, day trips, Tuscan routes, and museum timing." },
  { slug: "venice", countrySlug: "italy", name: "Venice", kind: "city", status: "queued", summary: "Canals, islands, crowds, hotels, boats, and early/late walking routes." },
  { slug: "amalfi-coast", countrySlug: "italy", name: "Amalfi Coast", kind: "region", status: "queued", summary: "Villages, ferries, roads, hotels, beaches, and shoulder-season strategy." },
  { slug: "sicily", countrySlug: "italy", name: "Sicily", kind: "island", status: "queued", summary: "Palermo, beaches, food, ruins, road trips, islands, and summer heat." },
  { slug: "paris", countrySlug: "france", name: "Paris", kind: "city", status: "queued", summary: "Museums, neighborhoods, markets, cafes, hotels, metro logic, and first-visit pacing." },
  { slug: "nice", countrySlug: "france", name: "Nice", kind: "city", status: "queued", summary: "Riviera beaches, old town lanes, rail day trips, markets, and Mediterranean timing." },
  { slug: "lyon", countrySlug: "france", name: "Lyon", kind: "city", status: "queued", summary: "Food culture, traboules, rivers, museums, wine access, and quieter city rhythm." },
  { slug: "bordeaux", countrySlug: "france", name: "Bordeaux", kind: "city", status: "queued", summary: "Wine routes, riverfront walks, markets, architecture, and Atlantic-side planning." },
  { slug: "provence", countrySlug: "france", name: "Provence", kind: "region", status: "queued", summary: "Villages, markets, lavender windows, Roman sites, food, and car-aware routing." },
  { slug: "athens", countrySlug: "greece", name: "Athens", kind: "city", status: "queued", summary: "Ruins, neighborhoods, food, ferries, hotels, and city-to-island planning." },
  { slug: "santorini", countrySlug: "greece", name: "Santorini", kind: "island", status: "queued", summary: "Views, crowds, hotels, beaches, ferries, and sunset logistics." },
  { slug: "crete", countrySlug: "greece", name: "Crete", kind: "island", status: "queued", summary: "Road trips, beaches, villages, food, hikes, ruins, and multi-base planning." },
  { slug: "mykonos", countrySlug: "greece", name: "Mykonos", kind: "island", status: "queued", summary: "Beaches, nightlife, hotels, ferries, prices, and summer crowd control." },
  { slug: "zurich", countrySlug: "switzerland", name: "Zurich", kind: "city", status: "queued", summary: "Lake days, rail hub logic, museums, food, hotels, and Swiss arrival planning." },
  { slug: "lucerne", countrySlug: "switzerland", name: "Lucerne", kind: "town", status: "queued", summary: "Lake, mountains, old town, rail, boats, and first Alpine day trips." },
  { slug: "interlaken", countrySlug: "switzerland", name: "Interlaken", kind: "town", status: "queued", summary: "Jungfrau region access, adventure days, rail passes, and weather timing." },
  { slug: "zermatt", countrySlug: "switzerland", name: "Zermatt", kind: "village", status: "queued", summary: "Matterhorn views, hiking, skiing, car-free logistics, and premium stays." },
  { slug: "oslo", countrySlug: "norway", name: "Oslo", kind: "city", status: "queued", summary: "Museums, fjord saunas, food, transit, hotels, and Norway arrival logic." },
  { slug: "bergen", countrySlug: "norway", name: "Bergen", kind: "city", status: "queued", summary: "Fjords, rain, rail, seafood, old wharf, and western Norway routes." },
  { slug: "lofoten", countrySlug: "norway", name: "Lofoten", kind: "region", status: "queued", summary: "Islands, hikes, roads, weather, cabins, beaches, and northern light timing." },
  { slug: "marrakech", countrySlug: "morocco", name: "Marrakech", kind: "city", status: "queued", summary: "Medina routes, riads, souks, food, gardens, rooftops, and arrival confidence." },
  { slug: "fes", countrySlug: "morocco", name: "Fes", kind: "city", status: "queued", summary: "Old medina, craft, food, guides, riads, and careful navigation." },
  { slug: "chefchaouen", countrySlug: "morocco", name: "Chefchaouen", kind: "town", status: "queued", summary: "Blue lanes, mountain setting, day trips, photos, and slower northern routes." },
  { slug: "new-york-city", countrySlug: "united-states", name: "New York City", kind: "city", status: "queued", summary: "Neighborhoods, hotels, transit, food, museums, shows, and first-visit pacing." },
  { slug: "los-angeles", countrySlug: "united-states", name: "Los Angeles", kind: "city", status: "queued", summary: "Neighborhood bases, driving, beaches, food, studios, museums, and sprawl logic." },
  { slug: "san-francisco", countrySlug: "united-states", name: "San Francisco", kind: "city", status: "queued", summary: "Hills, food, transit, hotels, bay trips, weather layers, and safety planning." },
  { slug: "las-vegas", countrySlug: "united-states", name: "Las Vegas", kind: "city", status: "queued", summary: "Hotels, shows, food, desert day trips, nightlife, and resort logistics." },
  { slug: "toronto", countrySlug: "canada", name: "Toronto", kind: "city", status: "queued", summary: "Neighborhoods, food, hotels, transit, lakefront, and Niagara side trips." },
  { slug: "vancouver", countrySlug: "canada", name: "Vancouver", kind: "city", status: "queued", summary: "Mountains, ocean, food, neighborhoods, rain, ferries, and outdoor days." },
  { slug: "banff", countrySlug: "canada", name: "Banff", kind: "town", status: "queued", summary: "Lakes, hiking, winter, shuttles, wildlife, and park logistics." },
  { slug: "montreal", countrySlug: "canada", name: "Montreal", kind: "city", status: "queued", summary: "Food, festivals, neighborhoods, winter, transit, and bilingual city texture." },
  { slug: "lima", countrySlug: "peru", name: "Lima", kind: "city", status: "queued", summary: "Food, cliffs, neighborhoods, museums, arrival nights, and Peru route setup." },
  { slug: "cusco", countrySlug: "peru", name: "Cusco", kind: "city", status: "queued", summary: "Altitude, ruins, food, hotels, trains, and Sacred Valley planning." },
  { slug: "machu-picchu", countrySlug: "peru", name: "Machu Picchu", kind: "region", status: "queued", summary: "Tickets, trains, buses, hikes, weather, and Sacred Valley logistics." },
  { slug: "cape-town", countrySlug: "south-africa", name: "Cape Town", kind: "city", status: "queued", summary: "Table Mountain, beaches, food, hotels, safety, wine trips, and coastal drives." },
  { slug: "johannesburg", countrySlug: "south-africa", name: "Johannesburg", kind: "city", status: "queued", summary: "Arrival logistics, history, food, neighborhoods, safety, and safari connections." },
  { slug: "kruger", countrySlug: "south-africa", name: "Kruger", kind: "region", status: "queued", summary: "Safari lodges, self-drive, seasons, wildlife, malaria checks, and flight logistics." },
];

export function getCountryOption(slug: string) {
  return COUNTRY_OPTIONS.find((country) => country.slug === slug) ?? null;
}

export function getPlacesForCountry(countrySlug: string) {
  return PLACE_OPTIONS.filter((place) => place.countrySlug === countrySlug);
}

export function getPlaceOption(slug: string) {
  return PLACE_OPTIONS.find((place) => place.slug === slug) ?? null;
}
