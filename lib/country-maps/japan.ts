/**
 * Stylised map data for Japan. Coordinates are in a portrait
 * 400 × 600 SVG viewBox. Paths and pin positions are hand-drafted
 * approximations — accurate enough to read as Japan at a glance,
 * not a cartographic deliverable. Swap for a real topojson pass
 * in M2 once the product has picked a mapping vendor.
 */

export const JAPAN_MAP_VIEWBOX = "0 0 400 600";

export const JAPAN_ISLANDS: Record<
  "hokkaido" | "honshu" | "shikoku" | "kyushu",
  { path: string; label: string; labelAt: [number, number] }
> = {
  hokkaido: {
    path:
      "M 258 38 C 303 28 363 58 362 102 C 361 140 311 162 268 156 C 228 150 208 118 219 82 C 225 60 239 44 258 38 Z",
    label: "Hokkaidō",
    labelAt: [300, 80],
  },
  honshu: {
    path:
      "M 240 168 C 275 175 288 212 260 248 C 232 282 192 296 164 326 C 126 362 88 398 72 452 C 64 482 98 494 124 480 C 152 462 182 440 212 410 C 244 378 274 348 290 308 C 308 262 308 216 286 188 C 268 172 254 166 240 168 Z",
    label: "Honshū",
    labelAt: [235, 270],
  },
  shikoku: {
    path:
      "M 92 466 C 118 462 146 470 150 486 C 152 502 122 506 102 500 C 86 494 82 480 92 466 Z",
    label: "Shikoku",
    labelAt: [165, 484],
  },
  kyushu: {
    path:
      "M 48 478 C 76 472 102 490 92 528 C 80 560 46 562 24 544 C 10 528 14 498 48 478 Z",
    label: "Kyūshū",
    labelAt: [12, 480],
  },
};

/**
 * Region overlays — colour bands pinned inside the islands. Used to
 * hint at "sub-regions" without drawing precise prefecture boundaries.
 */
export const JAPAN_REGIONS: Array<{
  slug: string;
  label: string;
  blob: string;
  /** Matches the Tailwind palette names used elsewhere. */
  accent: "matcha" | "aizome" | "kintsugi" | "enji" | "ume" | "sumi";
}> = [
  {
    slug: "kanto",
    label: "Kantō",
    blob:
      "M 252 250 C 268 252 278 265 272 280 C 266 294 248 295 238 285 C 230 275 238 250 252 250 Z",
    accent: "matcha",
  },
  {
    slug: "kansai",
    label: "Kansai",
    blob:
      "M 178 320 C 196 320 206 332 200 346 C 194 358 174 360 166 348 C 160 336 166 322 178 320 Z",
    accent: "kintsugi",
  },
  {
    slug: "tohoku",
    label: "Tōhoku",
    blob:
      "M 238 190 C 254 188 264 205 258 220 C 252 232 234 232 228 220 C 224 208 228 192 238 190 Z",
    accent: "aizome",
  },
  {
    slug: "chugoku",
    label: "Chūgoku",
    blob:
      "M 120 390 C 136 388 146 400 140 412 C 134 422 116 424 110 412 C 106 402 112 392 120 390 Z",
    accent: "ume",
  },
];

/** Pin positions for major clickable cities in the same viewBox. */
export type CityPin = {
  slug: string;
  name: string;
  region: string;
  /** x, y in the viewBox. */
  pos: [number, number];
  /** Root city route. Cities without full content render a planned guide page. */
  href: string;
  published?: boolean;
};

export const JAPAN_CITY_PINS: CityPin[] = [
  {
    slug: "sapporo",
    name: "Sapporo",
    region: "Hokkaidō",
    pos: [292, 96],
    href: "/city/sapporo",
  },
  {
    slug: "sendai",
    name: "Sendai",
    region: "Tōhoku",
    pos: [238, 212],
    href: "/city/sendai",
  },
  {
    slug: "tokyo",
    name: "Tokyo",
    region: "Kantō",
    pos: [256, 272],
    href: "/city/tokyo",
    published: true,
  },
  {
    slug: "yokohama",
    name: "Yokohama",
    region: "Kantō",
    pos: [250, 284],
    href: "/city/yokohama",
  },
  {
    slug: "nagoya",
    name: "Nagoya",
    region: "Chūbu",
    pos: [212, 308],
    href: "/city/nagoya",
  },
  {
    slug: "kyoto",
    name: "Kyoto",
    region: "Kansai",
    pos: [182, 326],
    href: "/city/kyoto",
  },
  {
    slug: "osaka",
    name: "Osaka",
    region: "Kansai",
    pos: [172, 338],
    href: "/city/osaka",
  },
  {
    slug: "hiroshima",
    name: "Hiroshima",
    region: "Chūgoku",
    pos: [112, 398],
    href: "/city/hiroshima",
  },
  {
    slug: "fukuoka",
    name: "Fukuoka",
    region: "Kyūshū",
    pos: [54, 505],
    href: "/city/fukuoka",
  },
];

/** Far-flung islands rendered as side annotations, not on the body map. */
export const JAPAN_OFFSHORE: Array<{
  slug: string;
  name: string;
  note: string;
  href: string;
  published?: boolean;
}> = [
  {
    slug: "okinawa",
    name: "Okinawa (Naha)",
    note: "1,550 km SW of Tokyo",
    href: "/city/okinawa",
  },
  {
    slug: "hakodate",
    name: "Hakodate",
    note: "Southern Hokkaidō",
    href: "/city/hakodate",
  },
];

/**
 * International + key domestic airports. Positioned in the same
 * 400 × 600 viewBox as the city pins. Rendered as small triangles so
 * they visually separate from city dots.
 */
export type AirportPin = {
  iata: string;
  name: string;
  city: string;
  /** x, y in the viewBox. */
  pos: [number, number];
  international: boolean;
  /**
   * Direct-flight routes that exist as of 2026. Keyed by origin IATA so
   * the click-through panel can answer "from Dubai, can I fly direct?".
   * Sourced manually; refresh when carriers add or drop routes.
   */
  direct_routes?: Record<
    string,
    {
      airlines: string[];
      duration_hours: number;
      frequency: string;
    }
  >;
};

export const JAPAN_AIRPORTS: AirportPin[] = [
  {
    iata: "CTS",
    name: "New Chitose",
    city: "Sapporo",
    pos: [294, 104],
    international: true,
    direct_routes: {
      ICN: { airlines: ["Korean Air", "Air Seoul"], duration_hours: 2.7, frequency: "Daily" },
      TPE: { airlines: ["EVA Air"], duration_hours: 4, frequency: "Daily" },
      HKG: { airlines: ["Hong Kong Express"], duration_hours: 4.7, frequency: "5×/week" },
    },
  },
  {
    iata: "SDJ",
    name: "Sendai",
    city: "Sendai",
    pos: [246, 218],
    international: true,
    direct_routes: {
      ICN: { airlines: ["Korean Air"], duration_hours: 2.5, frequency: "Daily" },
      TPE: { airlines: ["Tigerair Taiwan"], duration_hours: 3.7, frequency: "5×/week" },
    },
  },
  {
    iata: "HND",
    name: "Haneda",
    city: "Tokyo",
    pos: [262, 282],
    international: true,
    direct_routes: {
      DXB: { airlines: ["Emirates"], duration_hours: 9.3, frequency: "Daily" },
      DOH: { airlines: ["Qatar Airways"], duration_hours: 10, frequency: "Daily" },
      AUH: { airlines: ["Etihad"], duration_hours: 9.7, frequency: "Daily" },
      LHR: { airlines: ["British Airways", "ANA", "JAL"], duration_hours: 12, frequency: "Daily" },
      CDG: { airlines: ["Air France", "ANA", "JAL"], duration_hours: 12, frequency: "Daily" },
      FRA: { airlines: ["Lufthansa", "ANA"], duration_hours: 11.5, frequency: "Daily" },
      JFK: { airlines: ["JAL", "ANA", "American", "Delta"], duration_hours: 13.5, frequency: "Multiple daily" },
      LAX: { airlines: ["JAL", "ANA", "Delta", "American"], duration_hours: 11, frequency: "Multiple daily" },
      SFO: { airlines: ["United", "ANA", "JAL"], duration_hours: 10.5, frequency: "Daily" },
      ORD: { airlines: ["United", "ANA", "JAL"], duration_hours: 12.5, frequency: "Daily" },
      YYZ: { airlines: ["Air Canada"], duration_hours: 12.5, frequency: "Daily" },
      SYD: { airlines: ["Qantas", "JAL", "ANA"], duration_hours: 9.8, frequency: "Daily" },
      MEL: { airlines: ["Qantas", "JAL"], duration_hours: 10.5, frequency: "Daily" },
      SIN: { airlines: ["Singapore Airlines", "ANA", "JAL"], duration_hours: 7.5, frequency: "Multiple daily" },
      BKK: { airlines: ["Thai Airways", "ANA", "JAL"], duration_hours: 6.5, frequency: "Daily" },
      HKG: { airlines: ["Cathay Pacific", "ANA", "JAL"], duration_hours: 4.8, frequency: "Multiple daily" },
      ICN: { airlines: ["Korean Air", "Asiana", "ANA", "JAL"], duration_hours: 2.5, frequency: "Multiple daily" },
      DEL: { airlines: ["Air India"], duration_hours: 9, frequency: "5×/week" },
      BOM: { airlines: ["Air India"], duration_hours: 10, frequency: "Daily" },
    },
  },
  {
    iata: "NRT",
    name: "Narita",
    city: "Tokyo",
    pos: [278, 276],
    international: true,
    direct_routes: {
      DXB: { airlines: ["Emirates"], duration_hours: 9.5, frequency: "Daily" },
      LHR: { airlines: ["British Airways", "Virgin Atlantic"], duration_hours: 12, frequency: "Daily" },
      JFK: { airlines: ["JAL", "ANA", "United"], duration_hours: 13.5, frequency: "Daily" },
      LAX: { airlines: ["JAL", "ANA", "Delta", "Singapore Airlines"], duration_hours: 11, frequency: "Multiple daily" },
      SIN: { airlines: ["Singapore Airlines", "ZIPAIR"], duration_hours: 7.5, frequency: "Daily" },
      BKK: { airlines: ["Thai Airways", "ZIPAIR"], duration_hours: 6.5, frequency: "Daily" },
      ICN: { airlines: ["Korean Air", "Asiana"], duration_hours: 2.5, frequency: "Multiple daily" },
      MNL: { airlines: ["Philippine Airlines", "Cebu Pacific"], duration_hours: 4.5, frequency: "Daily" },
      KUL: { airlines: ["Malaysia Airlines", "AirAsia X"], duration_hours: 7, frequency: "Daily" },
      DEL: { airlines: ["Air India", "Vistara"], duration_hours: 9, frequency: "5×/week" },
      JNB: { airlines: ["No direct service — via SIN or DXB"], duration_hours: 0, frequency: "Connections only" },
    },
  },
  {
    iata: "NGO",
    name: "Chubu Centrair",
    city: "Nagoya",
    pos: [216, 316],
    international: true,
    direct_routes: {
      ICN: { airlines: ["Korean Air", "Asiana"], duration_hours: 2.7, frequency: "Daily" },
      HKG: { airlines: ["Cathay Pacific"], duration_hours: 4.7, frequency: "Daily" },
      BKK: { airlines: ["Thai Airways"], duration_hours: 6.7, frequency: "Daily" },
      MNL: { airlines: ["Philippine Airlines"], duration_hours: 4.5, frequency: "Daily" },
    },
  },
  {
    iata: "KIX",
    name: "Kansai International",
    city: "Osaka",
    pos: [168, 346],
    international: true,
    direct_routes: {
      DXB: { airlines: ["Emirates"], duration_hours: 9.5, frequency: "Daily" },
      LHR: { airlines: ["British Airways"], duration_hours: 12, frequency: "5×/week" },
      LAX: { airlines: ["JAL", "Singapore Airlines"], duration_hours: 11, frequency: "Daily" },
      SIN: { airlines: ["Singapore Airlines"], duration_hours: 7.5, frequency: "Daily" },
      BKK: { airlines: ["Thai Airways", "Peach"], duration_hours: 6.5, frequency: "Daily" },
      HKG: { airlines: ["Cathay Pacific", "HK Express"], duration_hours: 4.8, frequency: "Multiple daily" },
      ICN: { airlines: ["Korean Air", "Asiana", "Peach"], duration_hours: 2.7, frequency: "Multiple daily" },
      TPE: { airlines: ["EVA Air", "China Airlines"], duration_hours: 3.2, frequency: "Multiple daily" },
      DEL: { airlines: ["Indigo (seasonal)"], duration_hours: 9.5, frequency: "Seasonal" },
    },
  },
  {
    iata: "ITM",
    name: "Osaka Itami",
    city: "Osaka",
    pos: [178, 334],
    international: false,
  },
  {
    iata: "HIJ",
    name: "Hiroshima",
    city: "Hiroshima",
    pos: [118, 404],
    international: true,
    direct_routes: {
      ICN: { airlines: ["Asiana"], duration_hours: 2.5, frequency: "Daily" },
      TPE: { airlines: ["China Airlines"], duration_hours: 3.7, frequency: "4×/week" },
    },
  },
  {
    iata: "FUK",
    name: "Fukuoka",
    city: "Fukuoka",
    pos: [62, 492],
    international: true,
    direct_routes: {
      ICN: { airlines: ["Korean Air", "Asiana", "Jeju Air"], duration_hours: 1.3, frequency: "Multiple daily" },
      TPE: { airlines: ["EVA Air", "China Airlines"], duration_hours: 2.5, frequency: "Daily" },
      HKG: { airlines: ["Cathay Pacific", "HK Express"], duration_hours: 4, frequency: "Daily" },
      BKK: { airlines: ["Thai Airways"], duration_hours: 6, frequency: "5×/week" },
      SIN: { airlines: ["Singapore Airlines"], duration_hours: 6.7, frequency: "5×/week" },
    },
  },
  {
    iata: "KMJ",
    name: "Kumamoto",
    city: "Kumamoto",
    pos: [40, 522],
    international: false,
  },
  {
    iata: "KOJ",
    name: "Kagoshima",
    city: "Kagoshima",
    pos: [70, 552],
    international: true,
    direct_routes: {
      ICN: { airlines: ["Korean Air"], duration_hours: 1.7, frequency: "5×/week" },
      TPE: { airlines: ["China Airlines"], duration_hours: 2.7, frequency: "3×/week" },
    },
  },
];

/**
 * Curated origin cities the user can pick as their departure point.
 * Determines which routes the airport-detail panel highlights.
 */
export const ORIGIN_CITIES: Array<{
  iata: string;
  city: string;
  country: string;
}> = [
  { iata: "DXB", city: "Dubai", country: "UAE" },
  { iata: "DOH", city: "Doha", country: "Qatar" },
  { iata: "AUH", city: "Abu Dhabi", country: "UAE" },
  { iata: "LHR", city: "London", country: "UK" },
  { iata: "CDG", city: "Paris", country: "France" },
  { iata: "FRA", city: "Frankfurt", country: "Germany" },
  { iata: "JFK", city: "New York (JFK)", country: "USA" },
  { iata: "LAX", city: "Los Angeles", country: "USA" },
  { iata: "SFO", city: "San Francisco", country: "USA" },
  { iata: "ORD", city: "Chicago", country: "USA" },
  { iata: "YYZ", city: "Toronto", country: "Canada" },
  { iata: "SYD", city: "Sydney", country: "Australia" },
  { iata: "MEL", city: "Melbourne", country: "Australia" },
  { iata: "SIN", city: "Singapore", country: "Singapore" },
  { iata: "BKK", city: "Bangkok", country: "Thailand" },
  { iata: "HKG", city: "Hong Kong", country: "Hong Kong" },
  { iata: "ICN", city: "Seoul (Incheon)", country: "South Korea" },
  { iata: "TPE", city: "Taipei", country: "Taiwan" },
  { iata: "MNL", city: "Manila", country: "Philippines" },
  { iata: "KUL", city: "Kuala Lumpur", country: "Malaysia" },
  { iata: "DEL", city: "Delhi", country: "India" },
  { iata: "BOM", city: "Mumbai", country: "India" },
  { iata: "JNB", city: "Johannesburg", country: "South Africa" },
];
