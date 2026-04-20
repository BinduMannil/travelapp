// affiliateUrl(partner, rawUrl, ctx?) → returns the URL with the right
// affiliate tracking parameters for that partner appended. If the partner
// hasn't had its ID populated yet (env var empty), the URL is returned
// unchanged so outbound links stay working before we sign up.

import {
  detectPartner,
  PARTNER_IDS,
  PARTNERS,
  type PartnerKey,
} from "./partners";

type Context = {
  // Used by some partners as a source/subid tag so we can see which page
  // drove the click once we're live.
  source?: string;
};

function setParam(url: URL, key: string, value: string) {
  if (value) url.searchParams.set(key, value);
}

function tagBooking(target: URL, id: string, ctx?: Context) {
  setParam(target, "aid", id);
  setParam(target, "label", ctx?.source ?? PARTNERS.booking.siteLabel ?? "travelapp");
}

function tagAgoda(target: URL, id: string, ctx?: Context) {
  setParam(target, "cid", id);
  setParam(target, "site_id", ctx?.source ?? "travelapp");
}

function tagKlook(target: URL, id: string, ctx?: Context) {
  setParam(target, "aid", id);
  if (ctx?.source) setParam(target, "aff_adid", ctx.source);
}

function tagGetYourGuide(target: URL, id: string, ctx?: Context) {
  setParam(target, "partner_id", id);
  if (ctx?.source) setParam(target, "cmp", ctx.source);
}

function tagViator(target: URL, id: string) {
  setParam(target, "mcid", id);
}

function tagSafetyWing(target: URL, id: string) {
  setParam(target, "referenceID", id);
}

function tagHeymondo(target: URL, id: string) {
  setParam(target, "agencyID", id);
}

function tagAiralo(target: URL, id: string) {
  setParam(target, "ref", id);
}

function tagHolafly(target: URL, id: string) {
  setParam(target, "ref", id);
}

function tagWelcomePickups(target: URL, id: string) {
  setParam(target, "utm_source", "travelapp");
  setParam(target, "affiliate", id);
}

function tagBounce(target: URL, id: string) {
  setParam(target, "ref", id);
}

function tagWise(target: URL, id: string) {
  setParam(target, "referrerAccountId", id);
}

function tagSkyscanner(target: URL, id: string) {
  setParam(target, "associateid", id);
}

function tagKiwi(target: URL, id: string) {
  setParam(target, "affilid", id);
}

function tagDiscoverCars(target: URL, id: string) {
  setParam(target, "a_aid", id);
}

function tagRentalcars(target: URL, id: string) {
  setParam(target, "affiliateCode", id);
}

const TAGGERS: Record<PartnerKey, (u: URL, id: string, ctx?: Context) => void> = {
  booking: tagBooking,
  agoda: tagAgoda,
  klook: tagKlook,
  getyourguide: tagGetYourGuide,
  viator: (u, id) => tagViator(u, id),
  jtb: (u) => u, // JTB ticket pages don't have a standardised affiliate param
  safetywing: (u, id) => tagSafetyWing(u, id),
  heymondo: (u, id) => tagHeymondo(u, id),
  airalo: (u, id) => tagAiralo(u, id),
  holafly: (u, id) => tagHolafly(u, id),
  welcomepickups: (u, id) => tagWelcomePickups(u, id),
  bounce: (u, id) => tagBounce(u, id),
  wise: (u, id) => tagWise(u, id),
  skyscanner: (u, id) => tagSkyscanner(u, id),
  kiwi: (u, id) => tagKiwi(u, id),
  discovercars: (u, id) => tagDiscoverCars(u, id),
  rentalcars: (u, id) => tagRentalcars(u, id),
};

export function affiliateUrl(
  partner: PartnerKey | "auto",
  rawUrl: string,
  ctx?: Context,
): string {
  const key = partner === "auto" ? detectPartner(rawUrl) : partner;
  if (!key) return rawUrl;

  const id = PARTNER_IDS[key];
  if (!id) return rawUrl; // pre-signup: leave URL unchanged

  try {
    const u = new URL(rawUrl);
    TAGGERS[key](u, id, ctx);
    return u.toString();
  } catch {
    return rawUrl;
  }
}

export function isAffiliateUrl(url: string): boolean {
  return detectPartner(url) !== null;
}

export function partnerForUrl(url: string) {
  const key = detectPartner(url);
  return key ? PARTNERS[key] : null;
}
