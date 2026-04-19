import type { Rule } from "./engine";

// Global + Japan-specific packing rules. Ordering within a category is
// determined by essential-first then alphabetic at evaluation time.
export const DEFAULT_RULES: Rule[] = [
  // -- Documents ----------------------------------------------------------
  {
    key: "passport",
    label: "Passport + photocopy",
    category: "docs",
    essential: true,
    conditions: null,
    notes: "Keep the photocopy separate from the original.",
  },
  {
    key: "travel_insurance",
    label: "Travel insurance certificate",
    category: "docs",
    essential: true,
    conditions: null,
    notes: "Include the 24/7 emergency number saved offline on your phone.",
  },
  {
    key: "bookings",
    label: "Flight and hotel confirmations (offline)",
    category: "docs",
    essential: true,
    conditions: null,
  },
  {
    key: "cards_cash",
    label: "Payment cards + ¥20,000 starter cash",
    category: "docs",
    essential: true,
    conditions: null,
    notes:
      "Carry at least one Visa or Mastercard (Amex/Discover less accepted). Japan is cash-friendlier than many expect.",
  },

  // -- Tech ---------------------------------------------------------------
  {
    key: "phone_charger",
    label: "Phone + charger cable",
    category: "tech",
    essential: true,
    conditions: null,
  },
  {
    key: "plug_adapter",
    label: "Type-A plug adapter (if you use non-flat pins)",
    category: "tech",
    essential: true,
    conditions: null,
    notes: "Japan uses two flat parallel pins, 100 V. Most phone chargers are multi-voltage; check labels before plugging in.",
  },
  {
    key: "power_bank",
    label: "Power bank",
    category: "tech",
    essential: false,
    conditions: null,
    notes: "Long sightseeing days with navigation + translation kill phone batteries.",
  },
  {
    key: "camera",
    label: "Camera + spare battery",
    category: "tech",
    essential: false,
    conditions: { nights_min: 3 },
  },

  // -- Clothing: climate driven ------------------------------------------
  {
    key: "walking_shoes",
    label: "Comfortable walking shoes",
    category: "clothing",
    essential: true,
    conditions: null,
    notes: "Expect 15,000-25,000 steps a day. Pack in, pack out — no breaking in new shoes here.",
  },
  {
    key: "thermal_base",
    label: "Thermal base layer",
    category: "clothing",
    essential: true,
    conditions: {
      any: [{ temp_c_min_lt: 3 }, { month_in: [12, 1, 2] }],
    },
    notes: "Shinkansen stations and older buildings can be chilly.",
  },
  {
    key: "heavy_coat",
    label: "Warm coat",
    category: "clothing",
    essential: true,
    conditions: {
      any: [{ temp_c_max_lt: 13 }, { temp_c_min_lt: 2 }],
    },
  },
  {
    key: "light_jacket",
    label: "Light jacket or sweater",
    category: "clothing",
    essential: true,
    conditions: {
      any: [{ temp_c_max_lt: 20 }, { temp_c_min_lt: 15 }],
    },
  },
  {
    key: "short_sleeves",
    label: "Short-sleeve tops",
    category: "clothing",
    essential: true,
    conditions: { temp_c_max_gte: 18 },
    quantity: { nights_div_ceil: 2 },
  },
  {
    key: "shorts",
    label: "Shorts / lightweight trousers",
    category: "clothing",
    essential: false,
    conditions: { temp_c_max_gte: 26 },
  },
  {
    key: "rain_jacket",
    label: "Light rain jacket",
    category: "clothing",
    essential: true,
    conditions: { month_in: [3, 4, 5, 9, 10] },
    notes: "Packable shell beats an umbrella on breezy days.",
  },
  {
    key: "compact_umbrella",
    label: "Compact umbrella",
    category: "clothing",
    essential: false,
    conditions: { month_in: [6, 7, 8] },
    notes: "Tsuyu rainy season and summer thunderstorms. Konbini sell clear plastic umbrellas for ¥500.",
  },
  {
    key: "underwear",
    label: "Underwear",
    category: "clothing",
    essential: true,
    conditions: null,
    quantity: { nights_plus: 1 },
  },
  {
    key: "socks",
    label: "Socks",
    category: "clothing",
    essential: true,
    conditions: null,
    quantity: { nights_plus: 1 },
    notes: "Pack clean, hole-free socks — you will remove shoes at shrines, restaurants, some museums, and ryokan.",
  },
  {
    key: "modest_layer",
    label: "Light scarf or shawl",
    category: "clothing",
    essential: false,
    conditions: { trip_type: "cultural" },
    notes: "Useful for covering shoulders at temples and for chilly trains.",
  },
  {
    key: "dress_shoes",
    label: "Dress shoes",
    category: "clothing",
    essential: false,
    conditions: { trip_type: "luxury" },
    notes: "Fine-dining and upper-tier bars expect smart-casual.",
  },
  {
    key: "swimwear",
    label: "Swimwear",
    category: "clothing",
    essential: false,
    conditions: {
      any: [{ activity: "pool" }, { activity: "beach" }],
    },
  },

  // -- Toiletries --------------------------------------------------------
  {
    key: "toothbrush_paste",
    label: "Toothbrush and toothpaste",
    category: "toiletries",
    essential: true,
    conditions: null,
    notes: "Hotels supply these but amenities are tiny; bring a proper tube for longer trips.",
  },
  {
    key: "deodorant",
    label: "Deodorant",
    category: "toiletries",
    essential: true,
    conditions: null,
    notes: "Western-style antiperspirants are hard to find. Bring your preferred brand.",
  },
  {
    key: "sunscreen",
    label: "Sunscreen SPF 30+",
    category: "toiletries",
    essential: true,
    conditions: {
      any: [{ month_in: [5, 6, 7, 8, 9] }, { temp_c_max_gte: 22 }],
    },
  },

  // -- Health -----------------------------------------------------------
  {
    key: "allergy_meds",
    label: "Allergy / cold medication",
    category: "health",
    essential: false,
    conditions: null,
    notes: "Japan bans pseudoephedrine (Sudafed, Vicks inhalers) and Adderall. Check your meds against the Ministry of Health list before flying.",
  },
  {
    key: "prescription_doc",
    label: "Prescription medications + doctor's note",
    category: "health",
    essential: true,
    conditions: null,
    notes: "Certain medicines require a Yakkan Shoumei import certificate. Apply 2+ weeks ahead if unsure.",
  },
  {
    key: "insect_repellent",
    label: "Insect repellent",
    category: "health",
    essential: false,
    conditions: { month_in: [5, 6, 7, 8, 9] },
  },
  {
    key: "first_aid_kit",
    label: "Small first aid kit",
    category: "health",
    essential: false,
    conditions: { nights_min: 5 },
  },
  {
    key: "dietary_card",
    label: "Printed allergy / dietary card (JP)",
    category: "health",
    essential: false,
    conditions: {
      any: [
        { activity: "vegan" },
        { activity: "vegetarian" },
        { activity: "halal" },
        { activity: "gluten_free" },
        { activity: "allergy" },
      ],
    },
    notes: "Hand to staff when ordering — English is not universal. We provide print-ready cards on the Health & Safety page.",
  },

  // -- For the kids -----------------------------------------------------
  {
    key: "kids_snacks",
    label: "Familiar kids' snacks",
    category: "kids",
    essential: false,
    conditions: { has_children: true },
  },
  {
    key: "kids_comfort",
    label: "Comfort item (stuffed animal, blanket)",
    category: "kids",
    essential: false,
    conditions: { has_children: true },
  },
  {
    key: "stroller_or_carrier",
    label: "Stroller or baby carrier",
    category: "kids",
    essential: true,
    conditions: { has_children: true },
    notes: "Carriers beat strollers on crowded trains and station stairs.",
  },
  {
    key: "wet_wipes",
    label: "Wet wipes + hand sanitiser",
    category: "kids",
    essential: true,
    conditions: { has_children: true },
  },

  // -- Activity gear ----------------------------------------------------
  {
    key: "hiking_shoes",
    label: "Trail-grade shoes",
    category: "activity",
    essential: true,
    conditions: { activity: "hiking" },
  },
  {
    key: "daypack",
    label: "Daypack",
    category: "activity",
    essential: false,
    conditions: {
      any: [{ activity: "hiking" }, { trip_type: "adventure" }],
    },
  },
  {
    key: "tattoo_cover",
    label: "Waterproof tattoo cover patches",
    category: "activity",
    essential: false,
    conditions: { activity: "onsen" },
    notes: "Many onsen still refuse tattoos; cover-up patches are usually tolerated for small ink.",
  },

  // -- Japan-specific ---------------------------------------------------
  {
    key: "ic_card_ready",
    label: "A way to top up an IC card (phone or cash)",
    category: "japan",
    essential: true,
    conditions: null,
    notes: "Add Suica to Apple Wallet before you land, or grab PASMO at any ticket machine.",
  },
  {
    key: "pocket_tissues",
    label: "Pocket tissues",
    category: "japan",
    essential: false,
    conditions: null,
    notes: "Public restrooms usually have paper, but small shops often don't. Often given out free at stations.",
  },
  {
    key: "hand_towel",
    label: "Small hand towel",
    category: "japan",
    essential: false,
    conditions: null,
    notes: "Restroom hand dryers and paper towels are rare. Every Japanese bag has a handkerchief.",
  },
  {
    key: "trash_bag",
    label: "A spare plastic bag for trash",
    category: "japan",
    essential: false,
    conditions: null,
    notes: "Street bins are scarce — you will carry wrappers for hours.",
  },
  {
    key: "slipon_shoes",
    label: "Shoes you can slip off easily",
    category: "japan",
    essential: false,
    conditions: { trip_type: "cultural" },
    notes: "You will take shoes off at temples, ryokan, and some restaurants.",
  },
  {
    key: "face_mask",
    label: "Face masks (a few)",
    category: "japan",
    essential: false,
    conditions: null,
    notes: "Culturally appreciated if you are sick. Konbini sell boxes if you run out.",
  },
];
