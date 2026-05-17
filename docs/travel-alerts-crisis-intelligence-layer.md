# Live Travel Alerts and Crisis Intelligence Layer

## Purpose

Journee's live travel alerts layer stores traveler operational intelligence for events that can materially affect a trip. It is not a news feed. Alerts should be calm, factual, sourced, reviewed, and action-oriented.

Examples include severe weather, floods, earthquakes, typhoons, fires, volcanic eruptions, public safety events, health outbreaks, airport shutdowns, transport disruptions, internet outages, curfews, civil unrest, embassy warnings, and legal/social operational changes.

## Current Scope

The additive implementation includes:

- `travel_alerts` for reviewed operational alerts.
- `travel_alert_banners` for homepage, country, city, itinerary, and contextual route banners.
- Empty JSON fallback at `db/seed/internal/travel_alerts.json`.
- Importer support.
- Supabase-first accessors in `lib/data/travel-alerts.ts`.

No frontend UI was added.

## Alert Types

Supported `alert_type` values:

- `weather`
- `disaster`
- `political`
- `transport`
- `health`
- `internet_connectivity`
- `airport`
- `embassy`
- `legal_social`
- `public_safety`

## Geographic Scope

Supported `scope_kind` values:

- `global`
- `country`
- `city`
- `neighborhood`
- `airport`
- `transport`
- `route`

Canonical references use `country_id`, `city_id`, `neighborhood_id`, and `place_id` where available. `entity_reference` supports airport codes, transport providers, route names, or other operational references before canonical tables exist.

## Alert Metadata

`travel_alerts` supports:

- `title`
- `short_summary`
- `traveler_impact`
- `severity_level`
- `urgency_level`
- `starts_at`
- `ends_at`
- `affected_regions`
- `affected_transport`
- `source_label`
- `source_url`
- `reviewed_at`
- `confidence_level`
- `update_frequency`
- `active_status`

Alert status separates editorial publication from operational status:

- `status`: draft, published, archived
- `active_status`: active, monitoring, inactive, resolved, archived

## Traveler Impact Layer

Structured fields support:

- airport disruption
- train disruption
- road closures
- ferry impact
- nightlife restrictions
- beach closures
- ATM/payment disruption
- internet disruption
- embassy recommendations
- evacuation guidance
- curfew rules

Use these fields to power route-aware filtering and clear product language without turning alerts into long news articles.

## Banner System

`travel_alert_banners` supports:

- homepage banners
- country banners
- city banners
- itinerary banners
- contextual route banners

Important fields:

- `placement`
- `country_id`
- `city_id`
- `neighborhood_id`
- `route_context`
- `display_style`
- `priority`
- `starts_at`
- `ends_at`
- `active`
- `cta_label`
- `cta_url`

Banners are presentation wrappers around alerts. The alert remains the source of operational truth.

## JSON Fallback

`db/seed/internal/travel_alerts.json` starts empty:

```json
{
  "alerts": [],
  "banners": []
}
```

This avoids shipping stale crisis data. Real alerts should be created from live integrations or reviewed internal operations workflows.

## Accessors

`lib/data/travel-alerts.ts` exports:

- `getTravelAlertsSeed`
- `getTravelAlertBannersSeed`
- `getTravelAlertsLive`
- `getTravelAlertBannersLive`

Live helpers use the public Supabase anon client and only return rows allowed by RLS: published active or monitoring alerts, and active banners.

## Editorial Standards

Alerts should be:

- calm
- factual
- traveler-focused
- operational
- actionable
- source-backed
- reviewed and timestamped
- non-sensational

Recommended format:

- What is happening?
- Where is it affecting travelers?
- What should travelers do now?
- What transport/payment/connectivity/curfew/airport impact exists?
- What official source should travelers check?

Avoid:

- political commentary
- speculation
- graphic detail
- unverified social media claims
- headline-style sensationalism

## Future Integrations

This layer is ready for aggregation from:

- official weather and disaster agencies
- airport status feeds
- transport operators
- embassy/travel advisory feeds
- health authority updates
- curated internal operations review

Integrations should write draft or monitoring alerts first unless source reliability and update cadence are strong enough for direct publication.
