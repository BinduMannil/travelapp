# Airport Operations & Arrival Intelligence Layer

Journee's airport layer is for operational traveler intelligence: what a traveler should expect when landing, clearing immigration, collecting baggage, finding essentials, and leaving the airport. It is not a flight-status feed and it is not generic airport metadata.

The layer is additive and preserves the existing JSON fallback pattern. Initial seed fallback is intentionally empty until airport information is verified with source metadata.

## Goals

- Explain what actually happens on arrival.
- Support airport, terminal, immigration, baggage, service, transport, and risk intelligence.
- Keep the tone calm, practical, traveler-friendly, and non-alarmist.
- Separate verified operational content from future live airport APIs.
- Allow future frontend surfaces such as arrival cards, airport banners, route-aware alerts, and trip-start checklists without redesigning existing pages.

## Supabase Tables

### `airports`

Canonical airport profile records linked to `countries` and optionally `cities`.

Important fields:

- `iata_code`, `icao_code`, `name`, `city_served`, `timezone`
- `lat`, `lon`, `official_url`
- `profile_summary`, `arrivals_summary`, `departures_summary`
- `terminal_map_url`
- `source_label`, `source_url`, `reviewed_at`, `confidence_level`
- `status`, `metadata`

Indexes:

- `idx_airports_country` on `(country_id, iata_code)`
- `idx_airports_city` on `(city_id, iata_code)`

### `airport_terminals`

Terminal-specific facilities and traveler notes.

Important fields:

- `airport_id`, `terminal_key`, `name`, `terminal_type`
- `arrivals_available`, `departures_available`
- `terminal_map_url`
- `sim_esim_locations`, `atm_locations`, `exchange_counters`
- `lounges`, `sleep_rest_areas`, `prayer_rooms`
- `family_facilities`, `accessibility_support`
- `traveler_notes`, source/review fields, `display_order`

Indexes:

- `idx_airport_terminals_airport_order` on `(airport_id, display_order)`

### `airport_operations_intelligence`

Immigration, baggage, customs, congestion, queue, and arrival operations intelligence. Records can apply to the whole airport or a specific terminal.

Important fields:

- `immigration_strictness`
- `immigration_wait_min_minutes`, `immigration_wait_max_minutes`
- `egate_available`, `fast_track_available`
- `hotel_booking_checks`, `onward_ticket_checks`, `proof_of_funds_checks`
- `english_support_level`, `common_traveler_issues`
- `customs_strictness`, `customs_routing`
- `baggage_wait_min_minutes`, `baggage_wait_max_minutes`, `luggage_belts_count`
- `congestion_notes`, `late_night_operations`, `airport_closure_patterns`
- `peak_crowd_times`, `operational_metrics`, `queue_estimates`
- `traveler_type_support`

Indexes:

- `idx_airport_operations_airport_order` on `(airport_id, display_order)`
- `idx_airport_operations_terminal` on `(terminal_id, display_order)`
- `idx_airport_operations_metrics` as a GIN index on `operational_metrics`

### `airport_transport_nodes`

Structured airport-to-city navigation for official taxis, ride-hailing, trains, buses, ferries, shuttles, car rental, walking routes, and other practical transport nodes.

Important fields:

- `node_type`, `name`, `pickup_location`
- `walking_instructions`, `operating_hours`
- `late_night_reliability`, `payment_notes`
- `official`, `traveler_notes`, `risk_notes`

Indexes:

- `idx_airport_transport_airport_order` on `(airport_id, display_order)`
- `idx_airport_transport_terminal` on `(terminal_id, display_order)`
- `idx_airport_transport_type` on `node_type`

### `airport_risk_notes`

Airport-specific scam, overpricing, unofficial transport, crowding, late-night, baggage, and currency exchange warnings.

Important fields:

- `risk_category`, `risk_level`
- `traveler_summary`
- `what_to_do`, `avoid`
- source/review metadata and `display_order`

Indexes:

- `idx_airport_risk_airport_order` on `(airport_id, display_order)`
- `idx_airport_risk_terminal` on `(terminal_id, display_order)`
- `idx_airport_risk_category` on `risk_category`

## JSON Fallback

The fallback file is:

- `db/seed/internal/airport_operations.json`

It currently contains empty arrays:

- `airports`
- `terminals`
- `operations`
- `transport_nodes`
- `risk_notes`

This keeps the app migration-safe while avoiding premature or unsourced airport guidance. Future pilot records can be added airport by airport without changing the schema.

## Accessors

`lib/data/airport-operations.ts` provides:

- TypeScript types for the airport layer.
- `getAirportOperationsSeed()` for JSON fallback reads.
- `getAirportOperationsLive()` for Supabase-first reads with fallback when Supabase env vars are missing.

The live accessor reads published rows only and returns grouped airport, terminal, operations, transport, and risk-note payloads that can map cleanly to future frontend modules.

## RLS And Visibility

All five tables enable RLS and allow public reads only for `status = 'published'`.

Writes are expected to happen through service-role seed imports, future admin tooling, or trusted internal workflows. Draft and archived records are not exposed to anonymous read paths.

## Frontend Mapping Later

Future frontend surfaces can map as follows:

- Airport profile: `airports`
- Terminal facility cards: `airport_terminals`
- Immigration and baggage arrival cards: `airport_operations_intelligence`
- "How to leave the airport" modules: `airport_transport_nodes`
- "Watch out for" modules: `airport_risk_notes`
- Trip or city arrival banners: airport data joined with city, itinerary, or live travel alerts

No current frontend route needs to change to support this foundation.

## Data Quality Rules

- Prefer official airport, immigration, transport authority, embassy, or operator sources.
- Use field notes only when clearly labeled and reviewed.
- Always include `source_label`, `source_url`, `reviewed_at`, and `confidence_level` for traveler-facing records.
- Avoid sensational wording. Describe practical behavior and operational impact.
- Review airport operations regularly because pickup zones, e-gates, SIM desks, lounges, and late-night transport can change quickly.

## Future Integration Readiness

This layer can later integrate with:

- Airport official APIs or static feeds.
- Flight disruption and airport closure alert providers.
- Embassy and government travel advisories.
- Ride-hailing pickup-zone content.
- Field notes from internal travelers.
- Live travel alerts for airport-specific disruption banners.

The schema keeps operational guidance separate from live API data, so external data can be cached, reviewed, and promoted without rewriting the canonical airport model.
