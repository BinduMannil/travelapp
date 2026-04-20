/**
 * Travel advisories — short-lived banners that appear above the main
 * app chrome when a destination has an active war, revolution, natural
 * hazard, outbreak, major strike, or similar traveller-impacting event.
 *
 * Scope rules:
 *  - scope "global"  → shown on every page.
 *  - scope "country" → shown whenever the current route is
 *    /country/{country_slug}/* or /city/{city in that country}/*.
 *  - scope "city"    → shown only on /city/{city_slug}/* and the city's
 *    parent country hub.
 *
 * Lifecycle: an alert is active when `starts_at <= now <= ends_at`
 * (missing `ends_at` means "until further notice"). The banner is
 * dismissible per-session via localStorage (keyed by the alert slug);
 * dismiss survives reloads but not a new device or browser.
 */

export type AlertSeverity = "info" | "warning" | "critical";

export type AlertScope = "global" | "country" | "city";

export type AlertKind =
  | "war"
  | "revolution"
  | "civil_unrest"
  | "earthquake"
  | "typhoon"
  | "flood"
  | "volcano"
  | "heatwave"
  | "wildfire"
  | "health_outbreak"
  | "transport"
  | "political"
  | "advisory"
  | "other";

export type TravelAlert = {
  slug: string;
  scope: AlertScope;
  country_slug?: string;
  city_slug?: string;
  severity: AlertSeverity;
  kind: AlertKind;
  title: string;
  body: string;
  source_url?: string;
  source_label?: string;
  starts_at: string; // ISO
  ends_at?: string;
};

/**
 * Alerts are sourced manually for now. Swap to a feed (government travel
 * advisory, JMA hazard feed, Foreign Office, etc.) once we have server
 * cron + a moderation layer. Every alert must cite a source.
 */
const ALERTS: TravelAlert[] = [
  // -- Japan ---------------------------------------------------------------
  {
    slug: "jp-2026-tsuyu-advisory",
    scope: "country",
    country_slug: "japan",
    severity: "info",
    kind: "advisory",
    title: "Rainy season (tsuyu) across most of Japan",
    body: "Expect regular afternoon rain and high humidity through early July, especially in Honshū and Kyūshū. Trains run normal; pack a compact umbrella.",
    source_url: "https://www.jma.go.jp/bosai/map.html",
    source_label: "Japan Meteorological Agency",
    starts_at: "2026-06-05",
    ends_at: "2026-07-20",
  },
  // Example template — activate by un-commenting and setting the date
  // window. Left here as a reference for future editors.
  // {
  //   slug: "jp-YYYYMM-typhoon-alert",
  //   scope: "country",
  //   country_slug: "japan",
  //   severity: "warning",
  //   kind: "typhoon",
  //   title: "Typhoon approaching from the south",
  //   body: "Kyūshū and Shikoku likely to see heavy rain + wind. Expect Shinkansen delays between Hiroshima and Fukuoka.",
  //   source_url: "https://www.jma.go.jp/bosai/map.html",
  //   source_label: "Japan Meteorological Agency",
  //   starts_at: "YYYY-MM-DD",
  //   ends_at: "YYYY-MM-DD",
  // },
];

/**
 * Return every alert whose active window contains `now`, ignoring route
 * scope. The AlertBanner client component applies scope filtering once
 * it knows the current pathname. Called by the root layout.
 */
export function getActiveAlerts({
  now = new Date(),
}: {
  now?: Date;
} = {}): TravelAlert[] {
  const t = now.getTime();
  return ALERTS.filter((a) => {
    const start = Date.parse(a.starts_at);
    if (Number.isNaN(start) || start > t) return false;
    if (a.ends_at) {
      const end = Date.parse(a.ends_at);
      if (Number.isNaN(end) || end < t) return false;
    }
    return true;
  });
}

/**
 * Narrower helper — returns only those active alerts that match the
 * given route scope. Server components can use this when they know the
 * scope (e.g. a country page passing its slug directly).
 */
export function getActiveAlertsForScope({
  countrySlug,
  citySlug,
  now = new Date(),
}: {
  countrySlug?: string;
  citySlug?: string;
  now?: Date;
}): TravelAlert[] {
  return getActiveAlerts({ now }).filter((a) => {
    if (a.scope === "global") return true;
    if (a.scope === "country")
      return !!countrySlug && a.country_slug === countrySlug;
    if (a.scope === "city")
      return (
        (!!citySlug && a.city_slug === citySlug) ||
        (!!countrySlug && a.country_slug === countrySlug && !citySlug)
      );
    return false;
  });
}
