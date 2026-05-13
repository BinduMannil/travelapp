// Central registry for every affiliate partner the app uses.
//
// Each partner has:
//  - a human-readable name (for the disclosure + the `rel` source attribution)
//  - the env-var that holds our affiliate ID (set in whichever host's env
//    config you end up using; the defaults below are empty strings so the
//    URLs stay functional pre-signup)
//  - a `buildUrl(target)` function that takes a raw partner URL and appends
//    the right tracking parameters — names differ by partner, so each gets
//    its own builder.
//
// Adding a new partner: append to PARTNERS + PARTNER_IDS.

export type PartnerKey =
  | "booking"
  | "agoda"
  | "klook"
  | "getyourguide"
  | "viator"
  | "jtb"
  | "safetywing"
  | "heymondo"
  | "airalo"
  | "holafly"
  | "welcomepickups"
  | "bounce"
  | "wise"
  | "skyscanner"
  | "kiwi"
  | "discovercars"
  | "rentalcars";

export type Partner = {
  key: PartnerKey;
  name: string;
  category: "lodging" | "tours" | "insurance" | "connectivity" | "transfers" | "luggage" | "fx" | "flights" | "cars";
  siteLabel?: string; // the "label" tag we attach for our own click source attribution
};

export const PARTNERS: Record<PartnerKey, Partner> = {
  booking:        { key: "booking",        name: "Booking.com",    category: "lodging",      siteLabel: "travelapp-web" },
  agoda:          { key: "agoda",          name: "Agoda",          category: "lodging",      siteLabel: "travelapp" },
  klook:          { key: "klook",          name: "Klook",          category: "tours",        siteLabel: "travelapp" },
  getyourguide:   { key: "getyourguide",   name: "GetYourGuide",   category: "tours",        siteLabel: "travelapp" },
  viator:         { key: "viator",         name: "Viator",         category: "tours" },
  jtb:            { key: "jtb",            name: "JTB",            category: "tours" },
  safetywing:     { key: "safetywing",     name: "SafetyWing",     category: "insurance" },
  heymondo:       { key: "heymondo",       name: "Heymondo",       category: "insurance" },
  airalo:         { key: "airalo",         name: "Airalo",         category: "connectivity" },
  holafly:        { key: "holafly",        name: "Holafly",        category: "connectivity" },
  welcomepickups: { key: "welcomepickups", name: "Welcome Pickups", category: "transfers" },
  bounce:         { key: "bounce",         name: "Bounce",         category: "luggage" },
  wise:           { key: "wise",           name: "Wise",           category: "fx" },
  skyscanner:     { key: "skyscanner",     name: "Skyscanner",     category: "flights" },
  kiwi:           { key: "kiwi",           name: "Kiwi.com",       category: "flights" },
  discovercars:   { key: "discovercars",   name: "Discover Cars",  category: "cars" },
  rentalcars:     { key: "rentalcars",     name: "Rentalcars.com", category: "cars" },
};

// Public env vars — all NEXT_PUBLIC_ prefixed so the tags are visible client-side.
// Empty fallback keeps links functional before sign-up; once you register for a
// program, set the variable in your .env.local (locally) or in whichever
// hosting provider's env config you eventually deploy with.
export const PARTNER_IDS: Record<PartnerKey, string> = {
  booking:        process.env.NEXT_PUBLIC_AFF_BOOKING_AID ?? "",
  agoda:          process.env.NEXT_PUBLIC_AFF_AGODA_CID ?? "",
  klook:          process.env.NEXT_PUBLIC_AFF_KLOOK_AID ?? "",
  getyourguide:   process.env.NEXT_PUBLIC_AFF_GYG_PARTNER_ID ?? "",
  viator:         process.env.NEXT_PUBLIC_AFF_VIATOR_MCID ?? "",
  jtb:            process.env.NEXT_PUBLIC_AFF_JTB_ID ?? "",
  safetywing:     process.env.NEXT_PUBLIC_AFF_SAFETYWING_ID ?? "",
  heymondo:       process.env.NEXT_PUBLIC_AFF_HEYMONDO_ID ?? "",
  airalo:         process.env.NEXT_PUBLIC_AFF_AIRALO_REF ?? "",
  holafly:        process.env.NEXT_PUBLIC_AFF_HOLAFLY_REF ?? "",
  welcomepickups: process.env.NEXT_PUBLIC_AFF_WELCOMEPICKUPS_ID ?? "",
  bounce:         process.env.NEXT_PUBLIC_AFF_BOUNCE_REF ?? "",
  wise:           process.env.NEXT_PUBLIC_AFF_WISE_REF ?? "",
  skyscanner:     process.env.NEXT_PUBLIC_AFF_SKYSCANNER_ASSOCID ?? "",
  kiwi:           process.env.NEXT_PUBLIC_AFF_KIWI_AFF_ID ?? "",
  discovercars:   process.env.NEXT_PUBLIC_AFF_DISCOVERCARS_AID ?? "",
  rentalcars:     process.env.NEXT_PUBLIC_AFF_RENTALCARS_AFFCODE ?? "",
};

// Known domains → partner, so a raw booking.com URL can be auto-tagged without
// the caller specifying partner: detectPartner(url) resolves it.
const DOMAIN_TO_PARTNER: Array<[RegExp, PartnerKey]> = [
  [/(^|\.)booking\.com$/i, "booking"],
  [/(^|\.)agoda\.com$/i, "agoda"],
  [/(^|\.)klook\.com$/i, "klook"],
  [/(^|\.)getyourguide\.com$/i, "getyourguide"],
  [/(^|\.)viator\.com$/i, "viator"],
  [/(^|\.)jtbgmt\.com$/i, "jtb"],
  [/(^|\.)safetywing\.com$/i, "safetywing"],
  [/(^|\.)heymondo\.com$/i, "heymondo"],
  [/(^|\.)airalo\.com$/i, "airalo"],
  [/(^|\.)holafly\.com$/i, "holafly"],
  [/(^|\.)welcomepickups\.com$/i, "welcomepickups"],
  [/(^|\.)usebounce\.com$/i, "bounce"],
  [/(^|\.)wise\.com$/i, "wise"],
  [/(^|\.)skyscanner\.(net|com)$/i, "skyscanner"],
  [/(^|\.)kiwi\.com$/i, "kiwi"],
  [/(^|\.)discovercars\.com$/i, "discovercars"],
  [/(^|\.)rentalcars\.com$/i, "rentalcars"],
];

export function detectPartner(url: string): PartnerKey | null {
  try {
    const host = new URL(url).hostname;
    for (const [re, key] of DOMAIN_TO_PARTNER) {
      if (re.test(host)) return key;
    }
  } catch {
    // not a parseable URL
  }
  return null;
}
