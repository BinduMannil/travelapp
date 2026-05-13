import {
  VIETNAM_CITIES,
  VIETNAM_CITY_IMAGES,
  VIETNAM_CITY_REGIONS,
  type VietnamCity,
} from "@/lib/vietnam/frontend";

type IconKey =
  | "budget"
  | "calendar"
  | "camera"
  | "cash"
  | "culture"
  | "etiquette"
  | "food"
  | "safety"
  | "transport"
  | "bus"
  | "tipping"
  | "trash";

export type CityDestinationPageData = {
  slug: string;
  city: string;
  country: string;
  description: string;
  tags: string[];
  heroImages?: Array<{
    src: string;
    alt: string;
    mood: string;
  }>;
  images: {
    hero: string;
    why: string;
    avatar: string;
  };
  score: {
    overall: string;
    globalRating: {
      label: string;
      description: string;
    };
    journeeRating: {
      label: string;
      description: string;
    };
    rows: Array<{ label: string; value: string; icon: IconKey }>;
  };
  intelligence: Array<{
    title: string;
    value: string;
    detail: string;
    icon: IconKey;
  }>;
  why: {
    headline: string;
    copy: string;
    image: string;
  };
  moods: Array<{
    title: string;
    count: string;
    image: string;
  }>;
  itinerary: Array<{
    day: string;
    title: string;
    image: string;
    stops: string[];
  }>;
  atlas: {
    copy: string;
    points: Array<{ name: string; x: string; y: string }>;
  };
  hiddenGems: Array<{
    title: string;
    copy: string;
    place: string;
    image: string;
  }>;
  safety: {
    headline: string;
    image: string;
    tips: string[];
    phrase: string;
    phraseNote: string;
  };
  culture: Array<{
    title: string;
    copy: string;
    icon: IconKey;
  }>;
};

const sharedImages = {
  avatar:
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=200&q=80",
  coffee:
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=86",
  food:
    "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=900&q=86",
  market:
    "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=900&q=86",
  alley:
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=900&q=86",
  lantern:
    "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=86",
  beach:
    "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=900&q=86",
  mountain:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=86",
  cityNight:
    "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=88",
  hotel:
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=86",
};

function unsplash(src: string, width = 2600) {
  return `${src}?auto=format&fit=crop&w=${width}&q=88`;
}

const cityHeroImages: Record<
  string,
  Array<{ src: string; alt: string; mood: string }>
> = {
  kyoto: [
    {
      src: unsplash("https://images.unsplash.com/photo-1742223626680-a33627c0bccc"),
      alt: "Kyoto pagoda overlooking the city at sunset",
      mood: "Sunset",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1528164344705-47542687000d"),
      alt: "Bamboo forest path in Kyoto",
      mood: "Bamboo",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1478436127897-769e1b3f0f36"),
      alt: "Torii gates and shrine atmosphere in Kyoto",
      mood: "Temples",
    },
  ],
  tokyo: [
    {
      src: unsplash("https://images.unsplash.com/photo-1540959733332-eab4deabeeaf"),
      alt: "Tokyo skyline and dense city streets at night",
      mood: "Skyline",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1503899036084-c55cdd92da26"),
      alt: "Tokyo neighborhood street with signs and urban texture",
      mood: "Street Life",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1536098561742-ca998e48cbcc"),
      alt: "Tokyo night street with lanterns and cinematic lighting",
      mood: "Nightlife",
    },
  ],
  "ho-chi-minh-city": [
    {
      src: unsplash("https://images.unsplash.com/photo-1758533116847-3776b266cbdc"),
      alt: "Bitexco Financial Tower and Ho Chi Minh City skyline",
      mood: "Skyline",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1773414001281-7e1cadd04a79"),
      alt: "Motorbikes moving through a Ho Chi Minh City street",
      mood: "Motorbikes",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1777287514065-8f974084a78c"),
      alt: "Coffee shop interior in Ho Chi Minh City",
      mood: "Coffee",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1702963588830-8ddb8e65ef67"),
      alt: "District 1 traffic and buildings near central Ho Chi Minh City",
      mood: "District 1",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1704635329439-165fa6b8eaec"),
      alt: "Street food cart at night in Ho Chi Minh City",
      mood: "Street Food",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1768118421950-cf8b6e63fe4f"),
      alt: "Narrow Ho Chi Minh City street with Vietnamese flags and scooters",
      mood: "Neighborhoods",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1744950220926-5dc75e67c823"),
      alt: "Ho Chi Minh City rooftops and skyline at sunset",
      mood: "Rooftops",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1583417319070-4a69db38a482"),
      alt: "Ho Chi Minh City urban skyline and river access",
      mood: "Saigon River",
    },
  ],
  hanoi: [
    {
      src: unsplash("https://images.unsplash.com/photo-1509030450996-dd1a26dda07a"),
      alt: "Hanoi lake and city atmosphere",
      mood: "Lakes",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1680962201936-e59a519c5bd1"),
      alt: "Hanoi Old Quarter building with layered street texture",
      mood: "Old Quarter",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1772166876624-90ed0465fa87"),
      alt: "Railway tracks running through Hanoi Train Street",
      mood: "Train Street",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1588776874042-0fbf808e29c8"),
      alt: "Train moving through Hanoi street life",
      mood: "Local Rail",
    },
  ],
  "da-nang": [
    {
      src: unsplash("https://images.unsplash.com/photo-1559592413-7cec4d0cae2b"),
      alt: "Da Nang coastal skyline and beach",
      mood: "Coast",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1701396173275-835886dd72ce"),
      alt: "Dragon Bridge lit at night in Da Nang",
      mood: "Dragon Bridge",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1540202404-a2f29016b523"),
      alt: "Vietnam coastal beach atmosphere near Da Nang",
      mood: "Beach",
    },
  ],
  "hoi-an": [
    {
      src: unsplash("https://images.unsplash.com/photo-1528127269322-539801943592"),
      alt: "Hoi An riverside heritage town atmosphere",
      mood: "Old Town",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1761150285834-7ab9ce6dbfd4"),
      alt: "Lanterns glowing above a Hoi An street",
      mood: "Lanterns",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1560113855-2ea616c915ee"),
      alt: "Hoi An lanterns at sunset",
      mood: "Sunset",
    },
  ],
  hue: [
    {
      src: unsplash("https://images.unsplash.com/photo-1765034841805-8330b54bfdb7"),
      alt: "Imperial Citadel in Hue Vietnam",
      mood: "Citadel",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1765034841805-8330b54bfdb7", 1800),
      alt: "Hue heritage architecture and imperial atmosphere",
      mood: "Imperial",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1528127269322-539801943592"),
      alt: "Central Vietnam river and heritage atmosphere",
      mood: "River",
    },
  ],
  "nha-trang": [
    {
      src: unsplash("https://images.unsplash.com/photo-1756182027180-9928390b4466"),
      alt: "Boats floating on the water with Nha Trang skyline in the distance",
      mood: "Waterfront",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1687025846297-5b19ae9b1363"),
      alt: "Nha Trang beach with coastal buildings in the background",
      mood: "Beach",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1584551246679-0daf3d275d0f"),
      alt: "Nha Trang coastal city and sea atmosphere",
      mood: "Coast",
    },
  ],
  "da-lat": [
    {
      src: unsplash("https://images.unsplash.com/photo-1770181280811-f76c9cb5a1c9"),
      alt: "Misty valley and pine-covered hills in Da Lat",
      mood: "Highlands",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1770181305921-1f27b914141b"),
      alt: "Sunlight filtering through a Da Lat pine forest",
      mood: "Pine Forest",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"),
      alt: "Cool green landscape near Da Lat Vietnam",
      mood: "Nature",
    },
  ],
  sapa: [
    {
      src: unsplash("https://images.unsplash.com/photo-1758002766412-82897c5e5429"),
      alt: "Golden rice terraces in Sapa northern Vietnam",
      mood: "Terraces",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1500534314209-a25ddb2bd429"),
      alt: "Mountain landscape and mist near Sapa",
      mood: "Mountains",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1758002766412-82897c5e5429", 1800),
      alt: "Layered rice fields in the Sapa mountains",
      mood: "Villages",
    },
  ],
  "phu-quoc": [
    {
      src: unsplash("https://images.unsplash.com/photo-1709820331725-d0344fdc6bab"),
      alt: "Palm-lined beach on Phu Quoc island",
      mood: "Beach",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1551031742-f3099d6c687e"),
      alt: "Aerial beach view in Phu Quoc Vietnam",
      mood: "Aerial Coast",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1540202404-a2f29016b523"),
      alt: "Tropical Vietnam island beach and sea",
      mood: "Island",
    },
  ],
  "ha-long": [
    {
      src: unsplash("https://images.unsplash.com/photo-1668000018482-a02acf02b22a"),
      alt: "Boats at sunset in Ha Long Bay Vietnam",
      mood: "Bay Sunset",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1771992797585-2fdcf801ca62"),
      alt: "Ha Long coastal skyline with limestone karsts and boats",
      mood: "Harbor",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1528127269322-539801943592"),
      alt: "Northern Vietnam waterway and limestone landscape atmosphere",
      mood: "Karsts",
    },
  ],
  "ninh-binh": [
    {
      src: unsplash("https://images.unsplash.com/photo-1775119856738-73551272909a"),
      alt: "Limestone karsts and rice paddies in Ninh Binh Vietnam",
      mood: "Karsts",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1776138807307-e769c1f439bd"),
      alt: "Rowboats moving through limestone cliffs in Ninh Binh",
      mood: "River Boats",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1706462223549-13ef1e0689d5"),
      alt: "Boats along Tam Coc in Ninh Binh Vietnam",
      mood: "Tam Coc",
    },
  ],
  "can-tho": [
    {
      src: unsplash("https://images.unsplash.com/photo-1744760654110-c0befa6f57b3"),
      alt: "Boat vendor at the floating market in Can Tho",
      mood: "Floating Market",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1528127269322-539801943592"),
      alt: "Mekong Delta river life and water routes",
      mood: "River Life",
    },
    {
      src: unsplash("https://images.unsplash.com/photo-1744760654110-c0befa6f57b3", 1800),
      alt: "Can Tho floating market boat scene",
      mood: "Dawn Market",
    },
  ],
};

export const KYOTO_CITY_DESTINATION: CityDestinationPageData = {
  slug: "kyoto",
  city: "Kyoto",
  country: "Japan",
  description:
    "Timeless temples, serene gardens, and rich traditions woven into every street and season. A Kyoto travel guide for cinematic days, lantern-lit evenings, Kyoto temples, Kyoto food markets, and quieter local rituals.",
  tags: ["Culture", "Temples", "Food", "Hidden Gems", "Solo Female Travel"],
  heroImages: cityHeroImages.kyoto,
  images: {
    hero:
      "https://images.unsplash.com/photo-1742223626680-a33627c0bccc?auto=format&fit=crop&w=2600&q=90",
    why:
      "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1800&q=88",
    avatar: sharedImages.avatar,
  },
  score: {
    overall: "4.8",
    globalRating: {
      label: "Global Travel Rating",
      description: "Based on worldwide traveler reviews",
    },
    journeeRating: {
      label: "JOURNEE Traveler Rating",
      description: "Based on verified JOURNEE journeys",
    },
    rows: [
      { label: "Safety", value: "4.7", icon: "safety" },
      { label: "Culture", value: "4.9", icon: "culture" },
      { label: "Food", value: "4.8", icon: "food" },
      { label: "Transport", value: "4.6", icon: "transport" },
      { label: "Budget", value: "4.4", icon: "budget" },
    ],
  },
  intelligence: [
    { title: "Best Months", value: "Mar - May", detail: "Sep - Nov", icon: "calendar" },
    { title: "Typical Daily Budget", value: "$90 - $220", detail: "Per person", icon: "budget" },
    { title: "Visa Reminder", value: "90 days visa-free", detail: "For Indian passport", icon: "cash" },
    { title: "Local Transport", value: "Trains, Buses,", detail: "Walking, Taxis", icon: "bus" },
    { title: "Safety Level", value: "Very High", detail: "Tourist friendly", icon: "safety" },
    { title: "Solo Female Fit", value: "Excellent", detail: "Widely solo-friendly", icon: "etiquette" },
  ],
  why: {
    headline: "A city that lives in quiet beauty.",
    copy:
      "Kyoto is Japan's cultural heart. From ancient temples and sacred shrines to world-class cuisine and beautifully preserved streets, every moment feels like stepping into a story.",
    image:
      "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1800&q=88",
  },
  moods: [
    {
      title: "Temples & Shrines",
      count: "28 places",
      image:
        "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=900&q=86",
    },
    {
      title: "Tea Houses",
      count: "14 places",
      image:
        "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=900&q=86",
    },
    {
      title: "Bamboo Forests",
      count: "9 places",
      image:
        "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=900&q=86",
    },
    {
      title: "Night Walks",
      count: "17 routes",
      image:
        "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=900&q=86",
    },
    {
      title: "Food Markets",
      count: "18 stops",
      image:
        "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=900&q=86",
    },
    {
      title: "Hidden Alleys",
      count: "22 finds",
      image:
        "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=900&q=86",
    },
  ],
  itinerary: [
    {
      day: "DAY 1",
      title: "Historic Kyoto",
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=88",
      stops: ["Fushimi Inari Taisha", "Kiyomizu-dera Temple", "Gion District Walk", "Pontocho Evening"],
    },
    {
      day: "DAY 2",
      title: "Arashiyama & Tea Culture",
      image:
        "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1200&q=88",
      stops: ["Bamboo Grove", "Tenryu-ji Temple", "Okochi Sanso Garden", "Traditional Tea Experience"],
    },
    {
      day: "DAY 3",
      title: "Nishiki Market & Hidden Streets",
      image:
        "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=88",
      stops: ["Nishiki Market", "Philosopher's Path", "Local Shops", "Sunset at Kamogawa River"],
    },
  ],
  atlas: {
    copy:
      "Explore key neighborhoods, iconic landmarks, Kyoto hidden gems, temple districts, and food-market routes through a dark atlas interface.",
    points: [
      { name: "Arashiyama", x: "25%", y: "48%" },
      { name: "Kinkaku-ji", x: "43%", y: "35%" },
      { name: "Gion District", x: "60%", y: "43%" },
      { name: "Kiyomizu-dera", x: "71%", y: "56%" },
      { name: "Nishiki Market", x: "53%", y: "59%" },
      { name: "Fushimi Inari", x: "58%", y: "75%" },
    ],
  },
  hiddenGems: [
    {
      title: "Sake Bar Kazu",
      copy: "Cozy jazz bar with incredible local sake.",
      place: "Gion",
      image:
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=86",
    },
    {
      title: "Otagi Nenbutsu-ji",
      copy: "Soulful old temple statues tucked into the hills.",
      place: "Arashiyama",
      image:
        "https://images.unsplash.com/photo-1578469645742-46cae010e5d4?auto=format&fit=crop&w=900&q=86",
    },
    {
      title: "Camellia Tea House",
      copy: "Peaceful tea house in a quiet neighborhood.",
      place: "Higashiyama",
      image:
        "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=900&q=86",
    },
    {
      title: "Sannenzaka Street",
      copy: "Traditional Kyoto street with old-world charm.",
      place: "Higashiyama",
      image:
        "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=900&q=86",
    },
    {
      title: "Kifune Shrine",
      copy: "Beautiful shrine in a forest setting.",
      place: "Kurama",
      image:
        "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=900&q=86",
    },
  ],
  safety: {
    headline: "Kyoto is one of the safest cities for solo female travelers.",
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=88",
    tips: [
      "Public transport is safe, clean and reliable.",
      "Women-only train cars are available during rush hours.",
      "Most areas are safe even at night.",
      "Locals are respectful and helpful.",
      "Use official transport at night where possible.",
    ],
    phrase: "Chikan desu!",
    phraseNote:
      "Use this phrase loudly to call attention to groping or harassment on crowded trains. Move toward the nearest station staff, police box, or visible place where you can get help.",
  },
  culture: [
    { title: "Temple Etiquette", copy: "Be quiet, dress modestly and follow posted rules.", icon: "culture" },
    { title: "Tipping", copy: "Tipping is not expected in Japan.", icon: "tipping" },
    { title: "Public Transport", copy: "Keep noise low and give seats to those in need.", icon: "transport" },
    { title: "Cash & Cards", copy: "Cash is widely used. Carry enough yen.", icon: "cash" },
    { title: "Trash & Recycling", copy: "Use bins correctly. Keep the city clean.", icon: "trash" },
    { title: "Photography", copy: "Ask before photographing people or inside temples.", icon: "camera" },
  ],
};

const VIETNAM_COPY: Record<
  string,
  {
    headline: string;
    tags: string[];
    moods: string[];
    gems: Array<[string, string, string]>;
    points: string[];
  }
> = {
  "ho-chi-minh-city": {
    headline: "A city that moves in neon, coffee and momentum.",
    tags: ["Street Food", "Rooftops", "Coffee", "Markets", "Solo Female Travel"],
    moods: ["Rooftop Evenings", "Cafe Days", "Street Food", "Museum Routes", "Market Walks", "Mekong Access"],
    gems: [
      ["Secret Cocktail Rooms", "Low-lit bars tucked above central lanes.", "District 1"],
      ["Morning Coffee Alleys", "Small cafes where the city starts quietly.", "District 3"],
      ["Local Wet Markets", "Early produce, herbs and breakfast stalls.", "Tan Dinh"],
      ["Canal Walks", "A slower edge beyond the central rush.", "Binh Thanh"],
      ["Design Stores", "Independent shops with Vietnamese craft.", "Thao Dien"],
    ],
    points: ["District 1", "District 3", "Ben Thanh", "Thao Dien", "Cholon", "Saigon River"],
  },
  hanoi: {
    headline: "A city of lakes, craft streets and old-quarter rhythm.",
    tags: ["Old Quarter", "Coffee", "Lakes", "Northern Food", "Culture"],
    moods: ["Old Quarter Lanes", "Lake Walks", "Coffee Houses", "Craft Streets", "Food Alleys", "Day Trips"],
    gems: [
      ["Hidden Egg Coffee", "Quiet upper-floor cafes above the lanes.", "Old Quarter"],
      ["Train Street Edges", "Atmospheric corners with careful timing.", "Hoan Kiem"],
      ["Book Street", "A calmer pause near central museums.", "Ba Dinh"],
      ["West Lake Cafes", "Breezy tables for slow mornings.", "Tay Ho"],
      ["Craft Lanes", "Specialist streets with old trade energy.", "Old Quarter"],
    ],
    points: ["Hoan Kiem", "Old Quarter", "Tay Ho", "Ba Dinh", "French Quarter", "Temple of Literature"],
  },
  "da-nang": {
    headline: "A coastal city with bridges, beaches and mountain air.",
    tags: ["Beach", "Seafood", "Bridges", "Day Trips", "Solo Female Travel"],
    moods: ["Beach Mornings", "Seafood Nights", "Bridge Views", "Mountain Roads", "Cafe Workdays", "Hoi An Access"],
    gems: [
      ["Son Tra Lookouts", "Forest roads and sea-facing viewpoints.", "Son Tra"],
      ["Seafood Lanes", "Local grills away from the resort strip.", "My Khe"],
      ["Bridge Walks", "Evening light across the Han River.", "Han River"],
      ["Quiet Cafes", "Polished work-friendly spaces near the coast.", "An Thuong"],
      ["Marble Mountain Corners", "Caves and temples with early starts.", "Ngu Hanh Son"],
    ],
    points: ["My Khe", "Son Tra", "Han River", "Dragon Bridge", "Marble Mountains", "An Thuong"],
  },
  "hoi-an": {
    headline: "A lantern-lit town made for slow evenings.",
    tags: ["Lanterns", "Tailoring", "Food Markets", "Cycling", "Hidden Gems"],
    moods: ["Lantern Nights", "Tailor Visits", "Market Breakfasts", "River Walks", "Cycling Routes", "Cooking Classes"],
    gems: [
      ["Quiet Bridges", "Side crossings away from peak old-town crowds.", "Old Town"],
      ["Market Breakfasts", "Early bowls before the day-trips arrive.", "Central Market"],
      ["Tailor Studios", "Small workshops with patient fittings.", "Tran Phu"],
      ["Riverside Tea", "Soft light and slower tables near the water.", "Thu Bon River"],
      ["Village Cycling", "Flat paths through herbs, rice and palms.", "Cam Thanh"],
    ],
    points: ["Old Town", "Japanese Bridge", "Central Market", "An Bang", "Cam Thanh", "Thu Bon River"],
  },
  hue: {
    headline: "An imperial city shaped by river light and memory.",
    tags: ["Imperial History", "Royal Tombs", "River", "Central Food", "Culture"],
    moods: ["Citadel Days", "Royal Tombs", "River Walks", "Pagodas", "Central Cuisine", "Rainy Atmosphere"],
    gems: [
      ["Garden Houses", "Old family compounds with quiet courtyards.", "Kim Long"],
      ["Royal Snacks", "Small plates and central-region flavors.", "Vy Da"],
      ["Perfume River Dusk", "Soft evening light along the banks.", "Perfume River"],
      ["Pagoda Corners", "Peaceful temple grounds beyond the center.", "Thien Mu"],
      ["Tomb Circuits", "Driver-led routes through imperial sites.", "Southwest Hue"],
    ],
    points: ["Citadel", "Thien Mu", "Dong Ba", "Perfume River", "Royal Tombs", "Vy Da"],
  },
  sapa: {
    headline: "A mountain base wrapped in terraces and mist.",
    tags: ["Trekking", "Rice Terraces", "Homestays", "Mountains", "Safety Tips"],
    moods: ["Terrace Walks", "Village Guides", "Misty Viewpoints", "Homestays", "Market Days", "Mountain Cafes"],
    gems: [
      ["Guided Village Trails", "Local-led routes with weather-aware pacing.", "Muong Hoa"],
      ["Morning Viewpoints", "Terraces before clouds move in.", "Fansipan Road"],
      ["Homestay Kitchens", "Warm meals after long walking days.", "Ta Van"],
      ["Textile Stalls", "Handmade pieces with better context.", "Sapa Market"],
      ["Quiet Valley Cafes", "Small stops with mountain views.", "Lao Chai"],
    ],
    points: ["Sapa Town", "Muong Hoa", "Ta Van", "Cat Cat", "Fansipan", "Lao Chai"],
  },
  "phu-quoc": {
    headline: "An island escape built around sunset and sea air.",
    tags: ["Beaches", "Snorkeling", "Seafood", "Night Market", "Resorts"],
    moods: ["Sunset Beaches", "Snorkeling Days", "Seafood Grills", "Night Market", "Resort Quiet", "National Park"],
    gems: [
      ["Pepper Farm Stops", "A fragrant inland pause between beaches.", "Central Island"],
      ["Local Seafood Grills", "Casual tables beyond resort dining.", "Duong Dong"],
      ["Quiet Beach Pockets", "Softer sand and slower afternoons.", "Ong Lang"],
      ["Southern Islands", "Boat days with clearer water windows.", "An Thoi"],
      ["Night Market Corners", "Snacks, seafood and island bustle.", "Duong Dong"],
    ],
    points: ["Duong Dong", "Ong Lang", "Long Beach", "An Thoi", "National Park", "Night Market"],
  },
  "can-tho": {
    headline: "A delta city where the best moments start at dawn.",
    tags: ["Floating Markets", "Canals", "Fruit Gardens", "Food", "River Life"],
    moods: ["Floating Markets", "Canal Rides", "Fruit Gardens", "Delta Food", "Bridge Views", "Local Markets"],
    gems: [
      ["Dawn Boat Routes", "Floating market mornings before the heat.", "Cai Rang"],
      ["Fruit Gardens", "Slow visits through orchards and canals.", "Phong Dien"],
      ["Riverfront Evenings", "Breezy walks after humid afternoons.", "Ninh Kieu"],
      ["Local Noodle Stalls", "Southern breakfasts with river pacing.", "Central Can Tho"],
      ["Small Canal Turns", "Less staged routes with local guides.", "Mekong Delta"],
    ],
    points: ["Ninh Kieu", "Cai Rang", "Phong Dien", "Can Tho Bridge", "Riverfront", "Central Market"],
  },
};

const defaultVietnamCopy = {
  headline: "A city that reveals Vietnam through local rhythm.",
  tags: ["Food", "Culture", "Local Life", "Hidden Gems", "Travel Intelligence"],
  moods: ["Local Markets", "Food Streets", "Cafe Breaks", "Landmarks", "Hidden Corners", "Day Trips"],
  gems: [
    ["Local Cafe", "A quiet pause with strong Vietnamese coffee.", "Central district"],
    ["Market Morning", "Early stalls, breakfast bowls and local pace.", "Main market"],
    ["Hidden Lane", "A small street with neighborhood character.", "Old quarter"],
    ["Riverside Walk", "A softer route after the day cools.", "Waterfront"],
    ["Family Kitchen", "Regional dishes served without fuss.", "Local neighborhood"],
  ] as Array<[string, string, string]>,
  points: ["Central district", "Main market", "Old quarter", "Waterfront", "Local neighborhood", "Transit hub"],
};

function bestMonths(region: string) {
  if (region.includes("North") || region.includes("mountains")) return ["Oct - Apr", "Cooler, clearer days"];
  if (region.includes("Central")) return ["Feb - Aug", "Beach and heritage season"];
  if (region.includes("Island")) return ["Nov - Apr", "Drier beach months"];
  if (region.includes("Mekong")) return ["Dec - Apr", "Drier delta mornings"];
  return ["Dec - Apr", "Drier southern season"];
}

function vietnamImages(city: VietnamCity, copy: typeof defaultVietnamCopy) {
  const hero = cityHeroImages[city.slug]?.[0]?.src ?? VIETNAM_CITY_IMAGES[city.slug] ?? sharedImages.lantern;
  const scenic =
    city.slug === "sapa"
      ? sharedImages.mountain
      : city.slug === "phu-quoc" || city.slug === "da-nang" || city.slug === "nha-trang"
        ? sharedImages.beach
        : hero;

  return {
    hero,
    why: scenic,
    moods: [
      hero,
      sharedImages.coffee,
      sharedImages.food,
      sharedImages.alley,
      scenic,
      sharedImages.lantern,
    ],
    itinerary: [hero, scenic, sharedImages.food],
    gems: [sharedImages.cityNight, scenic, sharedImages.coffee, sharedImages.alley, sharedImages.lantern],
    safety: hero,
    copy,
  };
}

function buildVietnamDestination(city: VietnamCity): CityDestinationPageData {
  const region = VIETNAM_CITY_REGIONS[city.slug] ?? "Vietnam";
  const copy = VIETNAM_COPY[city.slug] ?? defaultVietnamCopy;
  const months = bestMonths(region);
  const images = vietnamImages(city, copy);
  const heroImages =
    cityHeroImages[city.slug] ??
    [
      {
        src: images.hero,
        alt: `${city.name} city skyline and local atmosphere`,
        mood: "City",
      },
      {
        src: images.why,
        alt: `${city.name} scenic travel atmosphere`,
        mood: "Scenery",
      },
      {
        src: images.moods[2],
        alt: `${city.name} food culture and local streets`,
        mood: "Food",
      },
    ];

  return {
    slug: city.slug,
    city: city.name,
    country: "Vietnam",
    description: `${city.summary} This ${city.name} travel guide highlights a practical itinerary, hidden gems, food markets, safety tips, and solo female travel context in one cinematic planning view.`,
    tags: copy.tags,
    heroImages,
    images: {
      hero: images.hero,
      why: images.why,
      avatar: sharedImages.avatar,
    },
    score: {
      overall: "4.7",
      globalRating: {
        label: "Global Travel Rating",
        description: "Based on worldwide traveler reviews",
      },
      journeeRating: {
        label: "JOURNEE Traveler Rating",
        description: "Based on verified JOURNEE journeys",
      },
      rows: [
        { label: "Safety", value: "4.5", icon: "safety" },
        { label: "Culture", value: "4.7", icon: "culture" },
        { label: "Food", value: "4.8", icon: "food" },
        { label: "Transport", value: "4.4", icon: "transport" },
        { label: "Budget", value: "4.6", icon: "budget" },
      ],
    },
    intelligence: [
      { title: "Best Months", value: months[0], detail: months[1], icon: "calendar" },
      { title: "Typical Daily Budget", value: "$45 - $130", detail: "Per person", icon: "budget" },
      { title: "Visa Reminder", value: "Check e-visa", detail: "Before departure", icon: "cash" },
      { title: "Local Transport", value: "Grab, Taxis,", detail: "Walking pockets", icon: "bus" },
      { title: "Safety Level", value: "High", detail: "Traffic-aware", icon: "safety" },
      { title: "Solo Female Fit", value: "Good", detail: "Plan night routes", icon: "etiquette" },
    ],
    why: {
      headline: copy.headline,
      copy: `${city.name} rewards travelers who plan around light, weather, food timing and local movement. Use this page as a polished ${city.name} itinerary base with room for quiet discoveries and practical travel intelligence.`,
      image: images.why,
    },
    moods: copy.moods.map((title, index) => ({
      title,
      count: `${8 + index * 3} places`,
      image: images.moods[index % images.moods.length],
    })),
    itinerary: [
      {
        day: "DAY 1",
        title: "Arrival & Iconic Core",
        image: images.itinerary[0],
        stops: [copy.points[0], copy.points[1], "Local lunch stop", "Golden-hour city walk"],
      },
      {
        day: "DAY 2",
        title: "Food, Culture & Neighborhoods",
        image: images.itinerary[1],
        stops: [copy.moods[1], copy.moods[2], copy.points[2], "Evening market route"],
      },
      {
        day: "DAY 3",
        title: "Hidden Streets & Easy Side Trip",
        image: images.itinerary[2],
        stops: [copy.gems[0][0], copy.points[4], copy.moods[5], "Slow final dinner"],
      },
    ],
    atlas: {
      copy: `Explore ${city.name} neighborhoods, food routes, landmarks, hidden corners, stays, and transfer logic through an atlas-inspired map made for discovery rather than default map browsing.`,
      points: copy.points.map((name, index) => ({
        name,
        x: ["24%", "42%", "61%", "72%", "52%", "58%"][index] ?? "50%",
        y: ["49%", "35%", "43%", "57%", "61%", "75%"][index] ?? "50%",
      })),
    },
    hiddenGems: copy.gems.map(([title, gemCopy, place], index) => ({
      title,
      copy: gemCopy,
      place,
      image: images.gems[index % images.gems.length],
    })),
    safety: {
      headline: `${city.name} is rewarding for prepared, route-aware solo female travelers.`,
      image: images.safety,
      tips: [
        "Use Grab or trusted taxis for late-night transfers and unfamiliar routes.",
        "Traffic is the main daily safety factor; cross steadily and avoid sudden stops.",
        "Keep valuables close in busy markets and nightlife areas.",
        "Choose well-reviewed stays near the neighborhoods you plan to use most.",
        "Stay heat-aware and build breaks into long walking days.",
      ],
      phrase: "Giup toi voi!",
      phraseNote:
        "This means 'Help me!' in Vietnamese. Use it loudly if you need attention, then move toward staff, a hotel lobby, a shop counter, or another visible public place.",
    },
    culture: [
      { title: "Temple Etiquette", copy: "Dress modestly, keep voices low and follow local signs.", icon: "culture" },
      { title: "Tipping", copy: "Tipping is appreciated in tourist services but not required everywhere.", icon: "tipping" },
      { title: "Public Transport", copy: "Use apps and confirmed pickup points for smoother movement.", icon: "transport" },
      { title: "Cash & Cards", copy: "Carry small VND notes for markets, cafes and short rides.", icon: "cash" },
      { title: "Trash & Recycling", copy: "Hold small waste until you find a proper bin.", icon: "trash" },
      { title: "Photography", copy: "Ask before photographing people, homes or religious spaces.", icon: "camera" },
    ],
  };
}

export const VIETNAM_CITY_DESTINATIONS = VIETNAM_CITIES.map(buildVietnamDestination);

export const TOKYO_CITY_DESTINATION: CityDestinationPageData = {
  ...KYOTO_CITY_DESTINATION,
  slug: "tokyo",
  city: "Tokyo",
  country: "Japan",
  description:
    "A Tokyo travel guide for neon districts, quiet temples, design stores, food markets, hidden bars, refined stays, and a cinematic first-time Japan itinerary.",
  tags: ["Neighborhoods", "Food", "Temples", "Design", "Night Walks"],
  heroImages: cityHeroImages.tokyo,
  images: {
    hero:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2600&q=90",
    why:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1800&q=88",
    avatar: sharedImages.avatar,
  },
  why: {
    headline: "A city that moves with quiet precision.",
    copy:
      "Tokyo rewards travelers who notice contrast: shrine mornings, immaculate transit, tiny counters, polished hotels, design lanes and late-night streets that feel cinematic without losing calm.",
    image:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1800&q=88",
  },
  moods: [
    { title: "Neon Nights", count: "24 places", image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=900&q=86" },
    { title: "Food Counters", count: "31 stops", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=900&q=86" },
    { title: "Shrines & Gardens", count: "18 places", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=86" },
    { title: "Design Stores", count: "15 finds", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=86" },
    { title: "Hidden Bars", count: "16 rooms", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=86" },
    { title: "Local Alleys", count: "22 walks", image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=900&q=86" },
  ],
  atlas: {
    copy:
      "Trace Tokyo neighborhoods, station logic, food districts, hotel bases, gardens and night routes through a dark exploration atlas.",
    points: [
      { name: "Shibuya", x: "25%", y: "48%" },
      { name: "Shinjuku", x: "43%", y: "35%" },
      { name: "Ginza", x: "60%", y: "43%" },
      { name: "Asakusa", x: "71%", y: "56%" },
      { name: "Ueno", x: "53%", y: "59%" },
      { name: "Roppongi", x: "58%", y: "75%" },
    ],
  },
};

const destinationBySlug = new Map(
  [KYOTO_CITY_DESTINATION, TOKYO_CITY_DESTINATION, ...VIETNAM_CITY_DESTINATIONS].map(
    (destination) => [destination.slug, destination],
  ),
);

export function getCityDestinationPageData(slug: string) {
  return destinationBySlug.get(slug) ?? null;
}

export function getAllCityDestinationSlugs() {
  return Array.from(destinationBySlug.keys());
}
