// Supabase-first accessors for airport operations and arrival intelligence.
// JSON fallback is intentionally empty until airport operations are verified and
// source-backed.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import airportOperationsJson from "@/db/seed/internal/airport_operations.json";

export type AirportConfidenceLevel = "low" | "medium" | "high";
export type AirportStatus = "draft" | "published" | "archived";
export type AirportTerminalType =
  | "domestic"
  | "international"
  | "mixed"
  | "cargo"
  | "other";
export type AirportStrictness =
  | "low"
  | "moderate"
  | "high"
  | "very_high"
  | "varies";
export type AirportCheckFrequency =
  | "rare"
  | "sometimes"
  | "common"
  | "strict"
  | "unknown";
export type AirportSupportLevel =
  | "low"
  | "moderate"
  | "good"
  | "high"
  | "varies";
export type LateNightReliability =
  | "low"
  | "moderate"
  | "good"
  | "high"
  | "unknown";

export type AirportTransportNodeType =
  | "official_taxi"
  | "ride_hailing"
  | "metro_train"
  | "shuttle_bus"
  | "public_bus"
  | "ferry"
  | "scooter_rental"
  | "walking_route"
  | "car_rental"
  | "other";

export type AirportRiskCategory =
  | "fake_taxi"
  | "sim_kiosk_overpricing"
  | "baggage_scam"
  | "unofficial_transport"
  | "currency_exchange_trap"
  | "late_night_arrival"
  | "crowding"
  | "other";

export type AirportRiskLevel = "low" | "moderate" | "high" | "critical";

export type AirportProfile = {
  country_slug: string;
  city_slug?: string | null;
  iata_code: string;
  icao_code?: string | null;
  name: string;
  city_served?: string | null;
  timezone?: string | null;
  lat?: number | null;
  lon?: number | null;
  official_url?: string | null;
  profile_summary?: string | null;
  arrivals_summary?: string | null;
  departures_summary?: string | null;
  terminal_map_url?: string | null;
  source_label?: string | null;
  source_url?: string | null;
  reviewed_at?: string | null;
  confidence_level: AirportConfidenceLevel;
  metadata?: Record<string, unknown>;
};

export type AirportTerminal = {
  airport_iata_code: string;
  terminal_key: string;
  name: string;
  terminal_type: AirportTerminalType;
  arrivals_available: boolean;
  departures_available: boolean;
  terminal_map_url?: string | null;
  sim_esim_locations: string[];
  atm_locations: string[];
  exchange_counters: string[];
  lounges: string[];
  sleep_rest_areas: string[];
  prayer_rooms: string[];
  family_facilities: string[];
  accessibility_support: string[];
  traveler_notes: string[];
  source_label?: string | null;
  source_url?: string | null;
  reviewed_at?: string | null;
  confidence_level: AirportConfidenceLevel;
  display_order: number;
  metadata?: Record<string, unknown>;
};

export type AirportOperationsIntelligence = {
  airport_iata_code: string;
  terminal_key?: string | null;
  intelligence_key: string;
  immigration_strictness: AirportStrictness;
  immigration_wait_min_minutes?: number | null;
  immigration_wait_max_minutes?: number | null;
  egate_available?: boolean | null;
  fast_track_available?: boolean | null;
  hotel_booking_checks: AirportCheckFrequency;
  onward_ticket_checks: AirportCheckFrequency;
  proof_of_funds_checks: AirportCheckFrequency;
  english_support_level: AirportSupportLevel;
  common_traveler_issues: string[];
  customs_strictness: AirportStrictness;
  baggage_wait_min_minutes?: number | null;
  baggage_wait_max_minutes?: number | null;
  luggage_belts_count?: number | null;
  congestion_notes: string[];
  customs_routing?: string | null;
  late_night_operations?: string | null;
  airport_closure_patterns?: string | null;
  peak_crowd_times: string[];
  operational_metrics?: Record<string, unknown>;
  queue_estimates?: Record<string, unknown>;
  traveler_notes: string[];
  traveler_type_support?: Record<string, unknown>;
  source_label?: string | null;
  source_url?: string | null;
  reviewed_at?: string | null;
  confidence_level: AirportConfidenceLevel;
  display_order: number;
  metadata?: Record<string, unknown>;
};

export type AirportTransportNode = {
  airport_iata_code: string;
  terminal_key?: string | null;
  node_key: string;
  node_type: AirportTransportNodeType;
  name: string;
  pickup_location?: string | null;
  walking_instructions?: string | null;
  operating_hours?: string | null;
  late_night_reliability: LateNightReliability;
  payment_notes?: string | null;
  official: boolean;
  traveler_notes: string[];
  risk_notes: string[];
  source_label?: string | null;
  source_url?: string | null;
  reviewed_at?: string | null;
  confidence_level: AirportConfidenceLevel;
  display_order: number;
  metadata?: Record<string, unknown>;
};

export type AirportRiskNote = {
  airport_iata_code: string;
  terminal_key?: string | null;
  risk_key: string;
  risk_category: AirportRiskCategory;
  risk_level: AirportRiskLevel;
  traveler_summary: string;
  what_to_do: string[];
  avoid: string[];
  source_label?: string | null;
  source_url?: string | null;
  reviewed_at?: string | null;
  confidence_level: AirportConfidenceLevel;
  display_order: number;
  metadata?: Record<string, unknown>;
};

export type AirportOperationsPayload = {
  airports: AirportProfile[];
  terminals: AirportTerminal[];
  operations: AirportOperationsIntelligence[];
  transport_nodes: AirportTransportNode[];
  risk_notes: AirportRiskNote[];
};

type AirportRow = Omit<AirportProfile, "country_slug" | "city_slug"> & {
  id: string;
  country_id: string;
  city_id?: string | null;
};

const AIRPORT_OPERATIONS_SEED =
  airportOperationsJson as AirportOperationsPayload;

function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function sortByDisplayOrder<T extends { display_order: number }>(
  rows: T[],
): T[] {
  return [...rows].sort((a, b) => a.display_order - b.display_order);
}

export function getAirportOperationsSeed(
  filters: {
    countrySlug?: string;
    citySlug?: string | null;
    iataCode?: string;
  } = {},
): AirportOperationsPayload {
  const airports = AIRPORT_OPERATIONS_SEED.airports.filter((airport) => {
    if (filters.countrySlug && airport.country_slug !== filters.countrySlug) {
      return false;
    }
    if (filters.citySlug && airport.city_slug !== filters.citySlug)
      return false;
    if (filters.iataCode && airport.iata_code !== filters.iataCode)
      return false;
    return true;
  });
  const iataCodes = new Set(airports.map((airport) => airport.iata_code));

  return {
    airports,
    terminals: sortByDisplayOrder(
      AIRPORT_OPERATIONS_SEED.terminals.filter((row) =>
        iataCodes.has(row.airport_iata_code),
      ),
    ),
    operations: sortByDisplayOrder(
      AIRPORT_OPERATIONS_SEED.operations.filter((row) =>
        iataCodes.has(row.airport_iata_code),
      ),
    ),
    transport_nodes: sortByDisplayOrder(
      AIRPORT_OPERATIONS_SEED.transport_nodes.filter((row) =>
        iataCodes.has(row.airport_iata_code),
      ),
    ),
    risk_notes: sortByDisplayOrder(
      AIRPORT_OPERATIONS_SEED.risk_notes.filter((row) =>
        iataCodes.has(row.airport_iata_code),
      ),
    ),
  };
}

export async function getAirportOperationsLive({
  countryId,
  cityId,
  iataCode,
}: {
  countryId?: string | null;
  cityId?: string | null;
  iataCode?: string;
} = {}): Promise<{
  airports: AirportRow[];
  terminals: unknown[];
  operations: unknown[];
  transport_nodes: unknown[];
  risk_notes: unknown[];
}> {
  const supabase = getSupabase();
  if (!supabase) {
    const seed = getAirportOperationsSeed({ iataCode });
    return {
      airports: seed.airports as unknown as AirportRow[],
      terminals: seed.terminals,
      operations: seed.operations,
      transport_nodes: seed.transport_nodes,
      risk_notes: seed.risk_notes,
    };
  }

  let airportQuery = supabase
    .from("airports")
    .select("*")
    .eq("status", "published")
    .order("iata_code", { ascending: true });
  if (countryId) airportQuery = airportQuery.eq("country_id", countryId);
  if (cityId) airportQuery = airportQuery.eq("city_id", cityId);
  if (iataCode) airportQuery = airportQuery.eq("iata_code", iataCode);

  const { data: airports, error } = await airportQuery;
  if (error || !airports?.length) {
    return {
      airports: [],
      terminals: [],
      operations: [],
      transport_nodes: [],
      risk_notes: [],
    };
  }

  const airportIds = airports.map((airport) => airport.id as string);
  const [terminals, operations, transportNodes, riskNotes] = await Promise.all([
    supabase
      .from("airport_terminals")
      .select("*")
      .in("airport_id", airportIds)
      .eq("status", "published")
      .order("display_order", { ascending: true }),
    supabase
      .from("airport_operations_intelligence")
      .select("*")
      .in("airport_id", airportIds)
      .eq("status", "published")
      .order("display_order", { ascending: true }),
    supabase
      .from("airport_transport_nodes")
      .select("*")
      .in("airport_id", airportIds)
      .eq("status", "published")
      .order("display_order", { ascending: true }),
    supabase
      .from("airport_risk_notes")
      .select("*")
      .in("airport_id", airportIds)
      .eq("status", "published")
      .order("display_order", { ascending: true }),
  ]);

  return {
    airports: airports as AirportRow[],
    terminals: terminals.data ?? [],
    operations: operations.data ?? [],
    transport_nodes: transportNodes.data ?? [],
    risk_notes: riskNotes.data ?? [],
  };
}
