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
    labelAt: [120, 520],
  },
  kyushu: {
    path:
      "M 48 478 C 76 472 102 490 92 528 C 80 560 46 562 24 544 C 10 528 14 498 48 478 Z",
    label: "Kyūshū",
    labelAt: [45, 565],
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
