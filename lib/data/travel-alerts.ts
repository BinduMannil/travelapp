// Supabase-first accessors for travel alerts and crisis intelligence.
// This is operational traveler intelligence, not a news feed. JSON fallback is
// intentionally empty unless curated internal alert fixtures are added.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import travelAlertsJson from "@/db/seed/internal/travel_alerts.json";

export type TravelAlertType =
  | "weather"
  | "disaster"
  | "political"
  | "transport"
  | "health"
  | "internet_connectivity"
  | "airport"
  | "embassy"
  | "legal_social"
  | "public_safety";

export type TravelAlertScopeKind =
  | "global"
  | "country"
  | "city"
  | "neighborhood"
  | "airport"
  | "transport"
  | "route";

export type TravelAlertSeverity = "low" | "moderate" | "high" | "critical";
export type TravelAlertUrgency =
  | "info"
  | "watch"
  | "plan_around"
  | "avoid_area"
  | "urgent";
export type TravelAlertConfidence = "low" | "medium" | "high";
export type TravelAlertUpdateFrequency =
  | "real_time"
  | "hourly"
  | "daily"
  | "as_needed"
  | "manual";
export type TravelAlertActiveStatus =
  | "active"
  | "monitoring"
  | "inactive"
  | "resolved"
  | "archived";
export type TravelAlertStatus = "draft" | "published" | "archived";
export type TravelAlertBannerPlacement =
  | "homepage"
  | "country"
  | "city"
  | "itinerary"
  | "contextual_route";
export type TravelAlertBannerStyle = "info" | "warning" | "urgent" | "critical";

export type TravelAlertSeed = {
  alert_key: string;
  alert_type: TravelAlertType;
  scope_kind: TravelAlertScopeKind;
  country_slug?: string | null;
  city_slug?: string | null;
  neighborhood_slug?: string | null;
  place_slug?: string | null;
  entity_reference?: string | null;
  title: string;
  short_summary: string;
  traveler_impact: string;
  severity_level: TravelAlertSeverity;
  urgency_level: TravelAlertUrgency;
  starts_at?: string | null;
  ends_at?: string | null;
  affected_regions: string[];
  affected_transport: string[];
  impact_categories: string[];
  airport_disruption?: boolean;
  train_disruption?: boolean;
  road_closures?: boolean;
  ferry_impact?: boolean;
  nightlife_restrictions?: boolean;
  beach_closures?: boolean;
  atm_payment_disruption?: boolean;
  internet_disruption?: boolean;
  embassy_recommendations: string[];
  evacuation_guidance?: string | null;
  curfew_rules?: string | null;
  source_label: string;
  source_url: string;
  reviewed_at?: string | null;
  confidence_level: TravelAlertConfidence;
  update_frequency: TravelAlertUpdateFrequency;
  active_status: TravelAlertActiveStatus;
  status: TravelAlertStatus;
  metadata?: Record<string, unknown>;
};

export type TravelAlertRow = Omit<
  TravelAlertSeed,
  "country_slug" | "city_slug" | "neighborhood_slug" | "place_slug"
> & {
  id: string;
  country_id?: string | null;
  city_id?: string | null;
  neighborhood_id?: string | null;
  place_id?: string | null;
  created_by?: string | null;
  reviewed_by?: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type TravelAlertBannerSeed = {
  alert_key: string;
  banner_key: string;
  placement: TravelAlertBannerPlacement;
  country_slug?: string | null;
  city_slug?: string | null;
  neighborhood_slug?: string | null;
  route_context?: Record<string, unknown>;
  title: string;
  short_summary: string;
  display_style: TravelAlertBannerStyle;
  priority: number;
  starts_at?: string | null;
  ends_at?: string | null;
  cta_label?: string | null;
  cta_url?: string | null;
  active: boolean;
  metadata?: Record<string, unknown>;
};

export type TravelAlertBannerRow = Omit<
  TravelAlertBannerSeed,
  "alert_key" | "country_slug" | "city_slug" | "neighborhood_slug"
> & {
  id: string;
  alert_id: string;
  country_id?: string | null;
  city_id?: string | null;
  neighborhood_id?: string | null;
  route_context: Record<string, unknown>;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type TravelAlertsPayload = {
  alerts: TravelAlertSeed[];
  banners: TravelAlertBannerSeed[];
};

const TRAVEL_ALERTS_SEED = travelAlertsJson as TravelAlertsPayload;

function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function getTravelAlertsSeed(filters: {
  countrySlug?: string;
  citySlug?: string | null;
  alertType?: TravelAlertType;
  activeOnly?: boolean;
} = {}): TravelAlertSeed[] {
  return TRAVEL_ALERTS_SEED.alerts.filter((alert) => {
    if (filters.countrySlug && alert.country_slug !== filters.countrySlug) {
      return false;
    }
    if (filters.citySlug && alert.city_slug !== filters.citySlug) return false;
    if (filters.alertType && alert.alert_type !== filters.alertType) return false;
    if (
      filters.activeOnly &&
      !["active", "monitoring"].includes(alert.active_status)
    ) {
      return false;
    }
    return true;
  });
}

export function getTravelAlertBannersSeed(filters: {
  placement?: TravelAlertBannerPlacement;
  countrySlug?: string;
  citySlug?: string | null;
  activeOnly?: boolean;
} = {}): TravelAlertBannerSeed[] {
  return TRAVEL_ALERTS_SEED.banners
    .filter((banner) => {
      if (filters.placement && banner.placement !== filters.placement) return false;
      if (filters.countrySlug && banner.country_slug !== filters.countrySlug) {
        return false;
      }
      if (filters.citySlug && banner.city_slug !== filters.citySlug) return false;
      if (filters.activeOnly && !banner.active) return false;
      return true;
    })
    .sort((a, b) => b.priority - a.priority);
}

export async function getTravelAlertsLive({
  countryId,
  cityId,
  neighborhoodId,
  placeId,
  alertType,
  activeOnly = true,
  limit = 50,
}: {
  countryId?: string | null;
  cityId?: string | null;
  neighborhoodId?: string | null;
  placeId?: string | null;
  alertType?: TravelAlertType;
  activeOnly?: boolean;
  limit?: number;
} = {}): Promise<TravelAlertRow[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  let query = supabase
    .from("travel_alerts")
    .select("*")
    .order("urgency_level", { ascending: false })
    .order("starts_at", { ascending: false })
    .limit(limit);

  if (activeOnly) query = query.in("active_status", ["active", "monitoring"]);
  if (countryId) query = query.eq("country_id", countryId);
  if (cityId) query = query.eq("city_id", cityId);
  if (neighborhoodId) query = query.eq("neighborhood_id", neighborhoodId);
  if (placeId) query = query.eq("place_id", placeId);
  if (alertType) query = query.eq("alert_type", alertType);

  const { data, error } = await query;
  if (error || !data) return [];
  return data as TravelAlertRow[];
}

export async function getTravelAlertBannersLive({
  placement,
  countryId,
  cityId,
  neighborhoodId,
  activeOnly = true,
  limit = 20,
}: {
  placement?: TravelAlertBannerPlacement;
  countryId?: string | null;
  cityId?: string | null;
  neighborhoodId?: string | null;
  activeOnly?: boolean;
  limit?: number;
} = {}): Promise<TravelAlertBannerRow[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  let query = supabase
    .from("travel_alert_banners")
    .select("*")
    .order("priority", { ascending: false })
    .limit(limit);

  if (activeOnly) query = query.eq("active", true);
  if (placement) query = query.eq("placement", placement);
  if (countryId) query = query.eq("country_id", countryId);
  if (cityId) query = query.eq("city_id", cityId);
  if (neighborhoodId) query = query.eq("neighborhood_id", neighborhoodId);

  const { data, error } = await query;
  if (error || !data) return [];
  return data as TravelAlertBannerRow[];
}
