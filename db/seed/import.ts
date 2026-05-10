// Seed importer — reads db/seed/<country>/*.json and db/seed/<city>/*.json
// and upserts into Supabase using the service-role key.
//
// Usage: npm run seed
// Requires: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in env.

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

async function readJson<T>(path: string): Promise<T> {
  const raw = await readFile(path, "utf8");
  return JSON.parse(raw) as T;
}

type CountrySeed = {
  slug: string;
  name: string;
  iso2: string;
  iso3: string;
  default_currency: string;
  default_timezone: string;
  primary_languages: string[];
  summary?: string | null;
  hero_image_url?: string | null;
};

type CitySeed = {
  country_slug: string;
  slug: string;
  name: string;
  timezone?: string | null;
  lat?: number | null;
  lon?: number | null;
  default_currency?: string | null;
  summary?: string | null;
  hero_image_url?: string | null;
};

type NeighborhoodSeed = {
  country_slug?: string;
  city_slug?: string;
  slug: string;
  name: string;
  vibe: string[];
  best_for: string[];
  summary: string;
  description: string;
  transit_hubs: string[];
  display_order: number;
};

type AttractionSeed = {
  slug: string;
  name: string;
  neighborhood: string;
  category: string;
  significance: string[];
  importance: number;
  tags: string[];
  trip_type_slugs: string[];
  cost_adult_minor: number;
  cost_child_minor: number;
  currency: string;
  duration_minutes: number;
  indoor: boolean;
  accessibility: Record<string, unknown>;
  kid_friendly: boolean;
  lgbtq_friendly: boolean;
  photography_allowed: boolean;
  dress_code: string | null;
  dress_notes: string | null;
  best_time_notes?: string | null;
  summary: string;
  description: string;
  official_url: string | null;
  reseller_urls: Record<string, string>;
  source: string;
};

type RestaurantSeed = {
  slug: string;
  name: string;
  neighborhood: string;
  cuisine: string[];
  price_band: "$" | "$$" | "$$$" | "$$$$" | "$$$$$";
  avg_price_per_person_minor: number;
  currency: string;
  signature_dishes: string[];
  reservation_required: boolean;
  reservations_lead_time_days: number;
  reservation_url: string | null;
  opening_hours: string;
  closed_days: string[];
  google_rating: number;
  google_review_count: number;
  tabelog_score: number | null;
  michelin_stars: number;
  bib_gourmand: boolean;
  dietary: string[];
  lgbtq_friendly: boolean;
  kid_friendly: boolean;
  wheelchair_accessible: boolean;
  notes?: string | null;
  source: string;
};

type LegalSocialRiskSeed = {
  country_slug: string;
  city_slug?: string | null;
  risk_category:
    | "social_media_online_speech"
    | "alcohol_public_behavior"
    | "public_conduct"
    | "lgbtq_relationships"
    | "drugs_medication_controlled_substances"
    | "police_official_interaction"
    | "immigration_entry"
    | "photography_filming"
    | "local_sensitivities";
  risk_level: "low" | "moderate" | "high" | "critical";
  traveler_summary: string;
  what_not_to_do: string[];
  practical_safe_behavior: string[];
  examples: string[];
  source_label: string;
  source_url: string;
  reviewed_at: string;
  confidence_level: "low" | "medium" | "high";
  legal_disclaimer: string;
  display_order: number;
  metadata?: Record<string, unknown>;
};

type LegalSocialRiskPayload = {
  risks: LegalSocialRiskSeed[];
};

type OwnerKind = "country" | "city";

type DestinationIdentitySeed = {
  owner_kind: OwnerKind;
  country_slug: string;
  city_slug?: string | null;
  palette_key: string;
  color_palette: Record<string, string>;
  script_style_key?: string | null;
  texture_key?: string | null;
  background_style_key?: string | null;
  ambient_motion_key?: string | null;
  icon_system_key?: string | null;
  photography_mood?: string | null;
  accent_symbols: string[];
  typography_notes?: string | null;
  source?: string;
  reviewed_at?: string | null;
  metadata?: Record<string, unknown>;
};

type DestinationIdentityPayload = {
  profiles: DestinationIdentitySeed[];
};

type TravelActivitySeed = {
  slug: string;
  label: string;
  activity_group: string;
  description?: string | null;
  traveler_types: string[];
  intensity?: "low" | "moderate" | "high" | null;
  indoor?: boolean | null;
  family_friendly?: boolean | null;
  display_order: number;
  metadata?: Record<string, unknown>;
};

type DestinationActivitySeed = {
  owner_kind: OwnerKind;
  country_slug: string;
  city_slug?: string | null;
  activity_slug: string;
  relevance_level: "signature" | "recommended" | "available" | "niche";
  seasonality: string[];
  notes?: string | null;
  display_order: number;
  metadata?: Record<string, unknown>;
};

type TravelActivitiesPayload = {
  activities: TravelActivitySeed[];
  destination_map: DestinationActivitySeed[];
};

type PriceBenchmarkSeed = {
  owner_kind: OwnerKind;
  country_slug: string;
  city_slug?: string | null;
  benchmark_key: string;
  category: string;
  label: string;
  amount_low_minor?: number | null;
  amount_typical_minor: number;
  amount_high_minor?: number | null;
  currency: string;
  unit: string;
  traveler_context?: string | null;
  notes?: string | null;
  source_label?: string | null;
  source_url?: string | null;
  reviewed_at?: string | null;
  confidence_level: "low" | "medium" | "high";
  display_order: number;
  metadata?: Record<string, unknown>;
};

type PriceBenchmarksPayload = {
  benchmarks: PriceBenchmarkSeed[];
};

type LocalAppSeed = {
  owner_kind: OwnerKind;
  country_slug: string;
  city_slug?: string | null;
  slug: string;
  name: string;
  category: string;
  purpose: string;
  free: boolean;
  ios_url?: string | null;
  android_url?: string | null;
  web_url?: string | null;
  offline_useful: boolean;
  setup_before_arrival: boolean;
  traveler_notes?: string | null;
  display_order: number;
  metadata?: Record<string, unknown>;
};

type LocalAppsPayload = {
  apps: LocalAppSeed[];
};

type PhrasebookSeed = {
  owner_kind: OwnerKind;
  country_slug: string;
  city_slug?: string | null;
  phrase_key: string;
  category: string;
  source_language: string;
  target_language: string;
  source_text: string;
  translated_text: string;
  transliteration?: string | null;
  literal_translation?: string | null;
  usage_notes?: string | null;
  formality?: "casual" | "polite" | "formal" | "emergency" | null;
  audio_url?: string | null;
  display_order: number;
  metadata?: Record<string, unknown>;
};

type PhrasebookPayload = {
  phrases: PhrasebookSeed[];
};

type DestinationIntelligenceSeed = {
  owner_kind: OwnerKind;
  country_slug: string;
  city_slug?: string | null;
  intelligence_category:
    | "visa_entry"
    | "money_payments"
    | "scams"
    | "police_official_interaction"
    | "street_crossing"
    | "scooter_motorbike"
    | "connectivity_sim_esim"
    | "weather_region"
    | "nightlife"
    | "local_etiquette"
    | "transport"
    | "health_safety"
    | "digital_nomad"
    | "other";
  risk_level?: "low" | "moderate" | "high" | "critical" | null;
  title: string;
  traveler_summary: string;
  practical_guidance: string[];
  watchouts: string[];
  examples: string[];
  source_label?: string | null;
  source_url?: string | null;
  reviewed_at?: string | null;
  confidence_level: "low" | "medium" | "high";
  display_order: number;
  metadata?: Record<string, unknown>;
};

type DestinationIntelligencePayload = {
  notes: DestinationIntelligenceSeed[];
};

type AffiliateOpportunitySeed = {
  owner_kind: OwnerKind;
  country_slug: string;
  city_slug?: string | null;
  opportunity_key: string;
  category:
    | "hotels"
    | "tours"
    | "esim"
    | "transfers"
    | "activities"
    | "buses_trains"
    | "insurance"
    | "cars"
    | "other";
  traveler_need: string;
  recommended_partner_keys: string[];
  placement_context: string[];
  priority: "low" | "medium" | "high";
  notes?: string | null;
  display_order: number;
  metadata?: Record<string, unknown>;
};

type AffiliateOpportunitiesPayload = {
  opportunities: AffiliateOpportunitySeed[];
};

type CulturalEventSeed = {
  owner_kind: OwnerKind;
  country_slug: string;
  city_slug?: string | null;
  event_key: string;
  name: string;
  event_kind:
    | "holiday"
    | "festival"
    | "national_celebration"
    | "regional_celebration"
    | "religious_observance"
    | "mourning_period"
    | "commemoration"
    | "other";
  starts_on?: string | null;
  ends_on?: string | null;
  recurrence_note?: string | null;
  date_note?: string | null;
  traveler_summary: string;
  cultural_context?: string | null;
  practical_guidance: string[];
  etiquette_notes: string[];
  public_closure_level: "none" | "limited" | "moderate" | "major";
  tourism_surge_level: "none" | "limited" | "moderate" | "major";
  transport_impact_level: "none" | "limited" | "moderate" | "major";
  crowd_level: "low" | "moderate" | "high" | "extreme";
  risk_level: "low" | "moderate" | "high" | "critical";
  source_label?: string | null;
  source_url?: string | null;
  reviewed_at?: string | null;
  confidence_level: "low" | "medium" | "high";
  display_order: number;
  metadata?: Record<string, unknown>;
};

type CulturalSensitivityNoteSeed = {
  owner_kind: OwnerKind;
  country_slug: string;
  city_slug?: string | null;
  note_key: string;
  sensitivity_category:
    | "cultural_etiquette"
    | "historical_sensitivity"
    | "political_sensitivity"
    | "social_taboo"
    | "national_pride"
    | "restricted_discussion"
    | "protest_sensitivity"
    | "conflict_war_history"
    | "religious_site_behavior"
    | "local_behavioral_expectations"
    | "alcohol_religious_observance"
    | "other";
  title: string;
  traveler_summary: string;
  why_it_matters?: string | null;
  avoid: string[];
  practical_safe_behavior: string[];
  examples: string[];
  risk_level: "low" | "moderate" | "high" | "critical";
  source_label?: string | null;
  source_url?: string | null;
  reviewed_at?: string | null;
  confidence_level: "low" | "medium" | "high";
  display_order: number;
  metadata?: Record<string, unknown>;
};

type CulturalIntelligencePayload = {
  events: CulturalEventSeed[];
  sensitivity_notes: CulturalSensitivityNoteSeed[];
};

type NeighborhoodIntelligenceSeed = {
  country_slug: string;
  city_slug: string;
  neighborhood_slug: string;
  vibe_tags: string[];
  luxury_level: "budget" | "mid_range" | "upscale" | "luxury" | "mixed";
  wealth_profile:
    | "working_class"
    | "mixed"
    | "middle_income"
    | "upper_middle_affluent"
    | "high_net_worth"
    | "tourist_economy";
  local_expat_mix:
    | "mostly_local"
    | "local_leaning"
    | "mixed"
    | "expat_leaning"
    | "mostly_expat";
  tourism_level: "local" | "low" | "moderate" | "high" | "tourist_core";
  nightlife_intensity: "low" | "moderate" | "high" | "extreme";
  digital_nomad_friendliness: "low" | "moderate" | "high" | "excellent";
  family_friendliness: "low" | "moderate" | "high" | "excellent";
  cafe_culture: "low" | "moderate" | "high" | "excellent";
  shopping_level: "low" | "moderate" | "high" | "luxury";
  transport_quality: "limited" | "basic" | "good" | "excellent";
  walkability: "limited" | "basic" | "good" | "excellent";
  safety_at_night: "low" | "moderate" | "good" | "high" | "varies";
  dress_expectations: string[];
  language_accessibility: "low" | "moderate" | "good" | "high";
  setting_tags: string[];
  atmosphere_scores: Record<string, number>;
  social_expectations: string[];
  safety_notes: string[];
  recommended_for: string[];
  avoid_if: string[];
  traveler_type_fit: Record<string, number>;
  what_it_feels_like: string;
  practical_notes: string[];
  source_label?: string | null;
  source_url?: string | null;
  reviewed_at?: string | null;
  confidence_level: "low" | "medium" | "high";
  display_order: number;
  metadata?: Record<string, unknown>;
};

type SocialRealityNoteSeed = {
  owner_kind: "city" | "neighborhood";
  country_slug: string;
  city_slug: string;
  neighborhood_slug?: string | null;
  note_key: string;
  reality_category:
    | "local_behavior"
    | "social_norms"
    | "work_culture"
    | "networking_culture"
    | "public_behavior"
    | "rude_behavior"
    | "normal_behavior"
    | "class_signals"
    | "appearance_expectations"
    | "reservation_culture"
    | "nightlife_behavior"
    | "queue_culture"
    | "bargaining_culture"
    | "noise_expectations"
    | "transport_behavior"
    | "cafe_culture"
    | "other";
  title: string;
  traveler_summary: string;
  what_is_normal: string[];
  what_is_rude: string[];
  practical_guidance: string[];
  examples: string[];
  social_context?: string | null;
  risk_level: "low" | "moderate" | "high" | "critical";
  source_label?: string | null;
  source_url?: string | null;
  reviewed_at?: string | null;
  confidence_level: "low" | "medium" | "high";
  display_order: number;
  metadata?: Record<string, unknown>;
};

type NeighborhoodRelationshipSeed = {
  country_slug: string;
  city_slug: string;
  from_neighborhood_slug: string;
  to_neighborhood_slug: string;
  relationship_kind:
    | "nearby"
    | "upscale_contrast"
    | "budget_contrast"
    | "tourist_stay"
    | "local_hangout"
    | "digital_nomad_base"
    | "hidden_local_area"
    | "nightlife_alternative"
    | "shopping_alternative"
    | "transit_link"
    | "atmosphere_contrast"
    | "other";
  traveler_summary: string;
  distance_note?: string | null;
  practical_use: string[];
  source_label?: string | null;
  source_url?: string | null;
  reviewed_at?: string | null;
  confidence_level: "low" | "medium" | "high";
  display_order: number;
  metadata?: Record<string, unknown>;
};

type NeighborhoodSocialRealityPayload = {
  neighborhood_intelligence: NeighborhoodIntelligenceSeed[];
  social_reality_notes: SocialRealityNoteSeed[];
  neighborhood_relationships: NeighborhoodRelationshipSeed[];
};

type FieldNoteSeed = {
  country_slug: string;
  city_slug?: string | null;
  neighborhood_slug?: string | null;
  place_slug?: string | null;
  note_category:
    | "price_observation"
    | "payment_observation"
    | "safety_observation"
    | "scam_warning"
    | "local_app_note"
    | "transport_note"
    | "legal_social_risk_note"
    | "food_restaurant_note"
    | "neighborhood_reality"
    | "cultural_observation"
    | "general_observation"
    | "other";
  short_note: string;
  long_note?: string | null;
  price_observation?: Record<string, unknown>;
  payment_observation?: string | null;
  safety_observation?: string | null;
  scam_warning?: string | null;
  local_app_note?: string | null;
  transport_note?: string | null;
  legal_social_risk_note?: string | null;
  food_restaurant_note?: string | null;
  photo_references?: Array<Record<string, unknown>>;
  source_type:
    | "personal_observation"
    | "official_source"
    | "local_advice"
    | "receipt"
    | "screenshot";
  confidence_level: "low" | "medium" | "high";
  review_status:
    | "unreviewed"
    | "needs_followup"
    | "approved"
    | "rejected"
    | "promoted";
  created_by?: string | null;
  reviewed_by?: string | null;
  observed_at?: string | null;
  reviewed_at?: string | null;
  source_label?: string | null;
  source_url?: string | null;
  metadata?: Record<string, unknown>;
};

type FieldNotesPayload = {
  notes: FieldNoteSeed[];
};

type InternalReviewEntityType =
  | "country"
  | "city"
  | "neighborhood"
  | "place"
  | "hotel_stay"
  | "restaurant"
  | "attraction_site"
  | "activity_tour"
  | "transport_provider_route"
  | "airport_arrival_experience"
  | "local_app_service";

type InternalReviewLifecycle =
  | "draft"
  | "submitted"
  | "internal_visible"
  | "approved_for_public"
  | "rejected"
  | "archived";

type InternalVisibilityStatus = "private" | "internal" | "approved" | "rejected";

type InternalReviewSeed = {
  reviewer_user_id?: string | null;
  reviewer_display_name?: string | null;
  entity_type: InternalReviewEntityType;
  entity_reference?: string | null;
  country_slug: string;
  city_slug?: string | null;
  neighborhood_slug?: string | null;
  place_slug?: string | null;
  local_app_slug?: string | null;
  visit_date?: string | null;
  trip_context?: string | null;
  rating_overall?: number | null;
  rating_value_for_money?: number | null;
  rating_safety?: number | null;
  rating_cleanliness?: number | null;
  rating_service?: number | null;
  rating_location_convenience?: number | null;
  rating_family_friendliness?: number | null;
  rating_solo_friendliness?: number | null;
  rating_digital_nomad_friendliness?: number | null;
  review_title: string;
  short_summary: string;
  detailed_review?: string | null;
  pros: string[];
  cons: string[];
  recommended_for: string[];
  avoid_if: string[];
  price_paid_minor?: number | null;
  currency?: string | null;
  booking_platform_used?: string | null;
  affiliate_provider_link_reference?: string | null;
  photo_references?: Array<Record<string, unknown>>;
  tags: string[];
  confidence_level: "low" | "medium" | "high";
  visibility_status: InternalVisibilityStatus;
  moderation_status: InternalReviewLifecycle;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  metadata?: Record<string, unknown>;
};

type InternalQuickFeedbackSeed = {
  reviewer_user_id?: string | null;
  reviewer_display_name?: string | null;
  entity_type: InternalReviewEntityType;
  entity_reference?: string | null;
  country_slug: string;
  city_slug?: string | null;
  neighborhood_slug?: string | null;
  place_slug?: string | null;
  local_app_slug?: string | null;
  thumbs_direction?: "up" | "down" | null;
  saved?: boolean;
  would_return?: boolean | null;
  overrated?: boolean;
  tourist_trap?: boolean;
  worth_it?: boolean;
  avoid?: boolean;
  cash_needed?: boolean;
  card_worked?: boolean;
  felt_safe?: boolean | null;
  felt_unsafe?: boolean | null;
  english_friendly?: boolean | null;
  good_for_work?: boolean;
  good_for_families?: boolean;
  good_for_solo_travelers?: boolean;
  tags?: string[];
  note?: string | null;
  visibility_status: InternalVisibilityStatus;
  moderation_status: InternalReviewLifecycle;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  metadata?: Record<string, unknown>;
};

type InternalReviewsFeedbackPayload = {
  reviews: InternalReviewSeed[];
  quick_feedback: InternalQuickFeedbackSeed[];
};

type PackingItemSeed = {
  item_key: string;
  label: string;
  packing_category:
    | "clothing"
    | "footwear"
    | "weather_layers"
    | "rain_cold_heat"
    | "activity_gear"
    | "religious_cultural"
    | "nightlife_dining"
    | "beach_swimming"
    | "trekking_hiking"
    | "scooter_motorbike"
    | "digital_nomad_tech"
    | "family_baby"
    | "safety_emergency"
    | "medical_health"
    | "country_practical"
    | "documents"
    | "toiletries"
    | "other";
  default_importance: "essential" | "recommended" | "situational" | "nice_to_have";
  default_required: boolean;
  weight_grams?: number | null;
  pack_weight_priority: number;
  reusable: boolean;
  source_label?: string | null;
  source_url?: string | null;
  reviewed_at?: string | null;
  metadata?: Record<string, unknown>;
};

type DestinationPackingRuleSeed = {
  owner_kind: "country" | "city" | "region";
  country_slug: string;
  city_slug?: string | null;
  region_key?: string | null;
  rule_key: string;
  item_key: string;
  activity_tags: string[];
  weather_conditions: string[];
  seasonality: string[];
  traveler_profiles: string[];
  itinerary_styles: string[];
  transportation_styles: string[];
  cultural_context_tags: string[];
  clothing_context: string[];
  importance: "essential" | "recommended" | "situational" | "nice_to_have";
  required: boolean;
  priority: number;
  pack_weight_priority: number;
  recommendation_note: string;
  cultural_notes?: string | null;
  weather_notes?: string | null;
  activity_notes?: string | null;
  region_override_note?: string | null;
  quantity_hint?: string | null;
  source_label?: string | null;
  source_url?: string | null;
  reviewed_at?: string | null;
  confidence_level: "low" | "medium" | "high";
  display_order: number;
  metadata?: Record<string, unknown>;
};

type PackingIntelligencePayload = {
  items: PackingItemSeed[];
  rules: DestinationPackingRuleSeed[];
};

type TravelAlertSeed = {
  alert_key: string;
  alert_type:
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
  scope_kind:
    | "global"
    | "country"
    | "city"
    | "neighborhood"
    | "airport"
    | "transport"
    | "route";
  country_slug?: string | null;
  city_slug?: string | null;
  neighborhood_slug?: string | null;
  place_slug?: string | null;
  entity_reference?: string | null;
  title: string;
  short_summary: string;
  traveler_impact: string;
  severity_level: "low" | "moderate" | "high" | "critical";
  urgency_level: "info" | "watch" | "plan_around" | "avoid_area" | "urgent";
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
  confidence_level: "low" | "medium" | "high";
  update_frequency: "real_time" | "hourly" | "daily" | "as_needed" | "manual";
  active_status: "active" | "monitoring" | "inactive" | "resolved" | "archived";
  status: "draft" | "published" | "archived";
  created_by?: string | null;
  reviewed_by?: string | null;
  metadata?: Record<string, unknown>;
};

type TravelAlertBannerSeed = {
  alert_key: string;
  banner_key: string;
  placement: "homepage" | "country" | "city" | "itinerary" | "contextual_route";
  country_slug?: string | null;
  city_slug?: string | null;
  neighborhood_slug?: string | null;
  route_context?: Record<string, unknown>;
  title: string;
  short_summary: string;
  display_style: "info" | "warning" | "urgent" | "critical";
  priority: number;
  starts_at?: string | null;
  ends_at?: string | null;
  cta_label?: string | null;
  cta_url?: string | null;
  active: boolean;
  metadata?: Record<string, unknown>;
};

type TravelAlertsPayload = {
  alerts: TravelAlertSeed[];
  banners: TravelAlertBannerSeed[];
};

type RowId = { id: string };

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function labelFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function upsertPlaceTag(
  supabase: SupabaseClient,
  slug: string,
  tagKind: string,
) {
  const { data, error } = await supabase
    .from("place_tags")
    .upsert(
      { slug, label: labelFromSlug(slug), tag_kind: tagKind },
      { onConflict: "slug" },
    )
    .select("id")
    .single<RowId>();

  if (error) throw error;
  return data.id;
}

async function replacePlaceTags(
  supabase: SupabaseClient,
  placeId: string,
  tags: Array<{ slug: string; tagKind: string }>,
) {
  const unique = Array.from(
    new Map(tags.map((tag) => [`${tag.tagKind}:${tag.slug}`, tag])).values(),
  );

  const { error: deleteErr } = await supabase
    .from("place_tag_map")
    .delete()
    .eq("place_id", placeId);
  if (deleteErr) throw deleteErr;

  if (!unique.length) return;

  const tagIds = await Promise.all(
    unique.map((tag) => upsertPlaceTag(supabase, tag.slug, tag.tagKind)),
  );
  const { error } = await supabase.from("place_tag_map").insert(
    tagIds.map((tagId) => ({ place_id: placeId, tag_id: tagId })),
  );
  if (error) throw error;
}

async function upsertPlaceExternalUrls(
  supabase: SupabaseClient,
  placeId: string,
  urls: Record<string, string | null | undefined>,
) {
  const rows = Object.entries(urls)
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([provider, url]) => ({
      place_id: placeId,
      provider,
      url,
    }));

  if (!rows.length) return;

  const { error } = await supabase
    .from("place_external_ids")
    .upsert(rows, { onConflict: "place_id,provider,url" });
  if (error) throw error;
}

function neighborhoodLookupKey(value: string): string {
  return slugify(value);
}

async function main() {
  const supabase = createClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { autoRefreshToken: false, persistSession: false } },
  );

  const root = resolve(process.cwd(), "db/seed");
  const cityIds = new Map<string, string>();

  // --- Countries ---------------------------------------------------------
  const japan = await readJson<CountrySeed>(resolve(root, "japan/country.json"));
  const { data: countryRow, error: countryErr } = await supabase
    .from("countries")
    .upsert(japan, { onConflict: "slug" })
    .select("id, slug")
    .single();

  if (countryErr) throw countryErr;
  if (!countryRow) throw new Error("Country upsert returned no row");
  console.log(`Upserted country: ${countryRow.slug}`);

  // --- Cities ------------------------------------------------------------
  const tokyo = await readJson<CitySeed>(resolve(root, "tokyo/city.json"));
  const { country_slug, ...cityFields } = tokyo;
  const { data: country } = await supabase
    .from("countries")
    .select("id")
    .eq("slug", country_slug)
    .single();

  if (!country) throw new Error(`Country not found for slug: ${country_slug}`);

  const { data: cityRow, error: cityErr } = await supabase
    .from("cities")
    .upsert(
      { ...cityFields, country_id: country.id },
      { onConflict: "country_id,slug" },
    )
    .select("id, slug")
    .single();

  if (cityErr) throw cityErr;
  if (!cityRow) throw new Error("City upsert returned no row");
  const cityId = cityRow.id;
  cityIds.set(`${country_slug}:${cityRow.slug}`, cityId);
  console.log(`Upserted city: ${cityRow.slug}`);

  // --- Vietnam country + city pilot stack -------------------------------
  const vietnam = await readJson<CountrySeed>(
    resolve(root, "vietnam/country.json"),
  );
  const { data: vietnamCountryRow, error: vietnamCountryErr } = await supabase
    .from("countries")
    .upsert(vietnam, { onConflict: "slug" })
    .select("id, slug")
    .single();

  if (vietnamCountryErr) throw vietnamCountryErr;
  if (!vietnamCountryRow) {
    throw new Error("Vietnam country upsert returned no row");
  }
  console.log(`Upserted country: ${vietnamCountryRow.slug}`);

  const vietnamCities = await readJson<CitySeed[]>(
    resolve(root, "vietnam/cities.json"),
  );
  for (const vietnamCity of vietnamCities) {
    const { country_slug: vietnamCountrySlug, ...vietnamCityFields } = vietnamCity;
    if (vietnamCountrySlug !== vietnamCountryRow.slug) {
      throw new Error(`Unexpected Vietnam city country: ${vietnamCountrySlug}`);
    }
    const { data: upsertedVietnamCity, error } = await supabase
      .from("cities")
      .upsert(
      { ...vietnamCityFields, country_id: vietnamCountryRow.id },
      { onConflict: "country_id,slug" },
      )
      .select("id, slug")
      .single<RowId & { slug: string }>();
    if (error) throw error;
    if (!upsertedVietnamCity) {
      throw new Error(`Vietnam city upsert returned no row: ${vietnamCity.slug}`);
    }
    cityIds.set(
      `${vietnamCountrySlug}:${upsertedVietnamCity.slug}`,
      upsertedVietnamCity.id,
    );
  }
  console.log(`Upserted Vietnam cities: ${vietnamCities.length}`);

  async function resolveOwner(input: {
    owner_kind: OwnerKind;
    country_slug: string;
    city_slug?: string | null;
  }): Promise<{ countryId: string | null; cityId: string | null }> {
    const { data: ownerCountry, error: ownerCountryErr } = await supabase
      .from("countries")
      .select("id")
      .eq("slug", input.country_slug)
      .single<RowId>();
    if (ownerCountryErr) throw ownerCountryErr;
    if (!ownerCountry) {
      throw new Error(`Country not found for owner: ${input.country_slug}`);
    }

    if (input.owner_kind === "country") {
      return { countryId: ownerCountry.id, cityId: null };
    }

    if (!input.city_slug) {
      throw new Error(`Missing city_slug for city-owned seed row`);
    }

    const { data: ownerCity, error: ownerCityErr } = await supabase
      .from("cities")
      .select("id")
      .eq("country_id", ownerCountry.id)
      .eq("slug", input.city_slug)
      .single<RowId>();
    if (ownerCityErr) throw ownerCityErr;
    if (!ownerCity) {
      throw new Error(`City not found for owner: ${input.city_slug}`);
    }
    return { countryId: null, cityId: ownerCity.id };
  }

  async function deleteOwnerRows(
    table: string,
    owner: { owner_kind: OwnerKind; country_slug: string; city_slug?: string | null },
    extra: Record<string, string>,
  ) {
    const resolved = await resolveOwner(owner);
    let query = supabase.from(table).delete().eq("owner_kind", owner.owner_kind);
    query = resolved.countryId
      ? query.eq("country_id", resolved.countryId)
      : query.is("country_id", null);
    query = resolved.cityId
      ? query.eq("city_id", resolved.cityId)
      : query.is("city_id", null);
    for (const [key, value] of Object.entries(extra)) {
      query = query.eq(key, value);
    }
    const { error } = await query;
    if (error) throw error;
    return resolved;
  }

  async function resolveCountryId(countrySlug: string) {
    const { data: ownerCountry, error: countryLookupErr } = await supabase
      .from("countries")
      .select("id")
      .eq("slug", countrySlug)
      .single<RowId>();
    if (countryLookupErr) throw countryLookupErr;
    if (!ownerCountry) {
      throw new Error(`Country not found for lookup: ${countrySlug}`);
    }
    return ownerCountry.id;
  }

  async function resolveCityId(countrySlug: string, citySlug: string) {
    const cached = cityIds.get(`${countrySlug}:${citySlug}`);
    if (cached) return cached;

    const countryId = await resolveCountryId(countrySlug);

    const { data: ownerCity, error: cityLookupErr } = await supabase
      .from("cities")
      .select("id")
      .eq("country_id", countryId)
      .eq("slug", citySlug)
      .single<RowId>();
    if (cityLookupErr) throw cityLookupErr;
    if (!ownerCity) {
      throw new Error(`City not found for lookup: ${countrySlug}/${citySlug}`);
    }

    cityIds.set(`${countrySlug}:${citySlug}`, ownerCity.id);
    return ownerCity.id;
  }

  async function resolveNeighborhoodId(input: {
    country_slug: string;
    city_slug: string;
    neighborhood_slug: string;
  }) {
    const resolvedCityId = await resolveCityId(input.country_slug, input.city_slug);
    const { data, error } = await supabase
      .from("neighborhoods")
      .select("id")
      .eq("city_id", resolvedCityId)
      .eq("slug", input.neighborhood_slug)
      .single<RowId>();
    if (error) throw error;
    if (!data) {
      throw new Error(
        `Neighborhood not found: ${input.country_slug}/${input.city_slug}/${input.neighborhood_slug}`,
      );
    }
    return { cityId: resolvedCityId, neighborhoodId: data.id };
  }

  async function resolvePlaceId(input: {
    country_slug: string;
    city_slug: string;
    place_slug: string;
  }) {
    const resolvedCityId = await resolveCityId(input.country_slug, input.city_slug);
    const { data, error } = await supabase
      .from("places")
      .select("id")
      .eq("city_id", resolvedCityId)
      .eq("slug", input.place_slug)
      .single<RowId>();
    if (error) throw error;
    if (!data) {
      throw new Error(
        `Place not found: ${input.country_slug}/${input.city_slug}/${input.place_slug}`,
      );
    }
    return { cityId: resolvedCityId, placeId: data.id };
  }

  async function resolveLocalAppId(input: {
    country_slug: string;
    city_slug?: string | null;
    local_app_slug: string;
  }) {
    const countryId = await resolveCountryId(input.country_slug);
    let query = supabase
      .from("local_apps")
      .select("id")
      .eq("slug", input.local_app_slug);

    if (input.city_slug) {
      const appCityId = await resolveCityId(input.country_slug, input.city_slug);
      query = query.eq("owner_kind", "city").eq("city_id", appCityId);
    } else {
      query = query.eq("owner_kind", "country").eq("country_id", countryId);
    }

    const { data, error } = await query.single<RowId>();
    if (error) throw error;
    if (!data) {
      throw new Error(
        `Local app not found: ${input.country_slug}/${input.city_slug ?? "country"}/${input.local_app_slug}`,
      );
    }
    return data.id;
  }

  async function resolveReviewTargets(input: {
    country_slug: string;
    city_slug?: string | null;
    neighborhood_slug?: string | null;
    place_slug?: string | null;
    local_app_slug?: string | null;
  }) {
    const countryId = await resolveCountryId(input.country_slug);
    let reviewCityId: string | null = null;
    let reviewNeighborhoodId: string | null = null;
    let reviewPlaceId: string | null = null;
    let reviewLocalAppId: string | null = null;

    if (input.city_slug) {
      reviewCityId = await resolveCityId(input.country_slug, input.city_slug);
    }
    if (input.neighborhood_slug) {
      if (!input.city_slug) {
        throw new Error(
          `Missing city_slug for review neighborhood: ${input.neighborhood_slug}`,
        );
      }
      const resolvedNeighborhood = await resolveNeighborhoodId({
        country_slug: input.country_slug,
        city_slug: input.city_slug,
        neighborhood_slug: input.neighborhood_slug,
      });
      reviewCityId = resolvedNeighborhood.cityId;
      reviewNeighborhoodId = resolvedNeighborhood.neighborhoodId;
    }
    if (input.place_slug) {
      if (!input.city_slug) {
        throw new Error(`Missing city_slug for review place: ${input.place_slug}`);
      }
      const resolvedPlace = await resolvePlaceId({
        country_slug: input.country_slug,
        city_slug: input.city_slug,
        place_slug: input.place_slug,
      });
      reviewCityId = resolvedPlace.cityId;
      reviewPlaceId = resolvedPlace.placeId;
    }
    if (input.local_app_slug) {
      reviewLocalAppId = await resolveLocalAppId({
        country_slug: input.country_slug,
        city_slug: input.city_slug,
        local_app_slug: input.local_app_slug,
      });
    }

    return {
      countryId,
      cityId: reviewCityId,
      neighborhoodId: reviewNeighborhoodId,
      placeId: reviewPlaceId,
      localAppId: reviewLocalAppId,
    };
  }

  // --- Neighborhoods -----------------------------------------------------
  const neighborhoods = await readJson<NeighborhoodSeed[]>(
    resolve(root, "tokyo/neighborhoods.json"),
  );
  const neighborhoodIds = new Map<string, string>();

  for (const neighborhood of neighborhoods) {
    const { data, error } = await supabase
      .from("neighborhoods")
      .upsert(
        {
          city_id: cityId,
          slug: neighborhood.slug,
          name: neighborhood.name,
          summary: neighborhood.summary,
          vibe: neighborhood.vibe,
          best_for: neighborhood.best_for,
          description: neighborhood.description,
          transit_hubs: neighborhood.transit_hubs,
          display_order: neighborhood.display_order,
        },
        { onConflict: "city_id,slug" },
      )
      .select("id, slug, name")
      .single<{ id: string; slug: string; name: string }>();

    if (error) throw error;
    neighborhoodIds.set(data.slug, data.id);
    neighborhoodIds.set(neighborhoodLookupKey(data.name), data.id);
  }

  console.log(`Upserted neighborhoods: ${neighborhoods.length}`);

  const vietnamNeighborhoods = await readJson<NeighborhoodSeed[]>(
    resolve(root, "vietnam/neighborhoods.json"),
  );

  for (const neighborhood of vietnamNeighborhoods) {
    if (!neighborhood.country_slug || !neighborhood.city_slug) {
      throw new Error(`Missing Vietnam neighborhood owner: ${neighborhood.slug}`);
    }
    const vietnamNeighborhoodCityId = await resolveCityId(
      neighborhood.country_slug,
      neighborhood.city_slug,
    );
    const { error } = await supabase.from("neighborhoods").upsert(
      {
        city_id: vietnamNeighborhoodCityId,
        slug: neighborhood.slug,
        name: neighborhood.name,
        summary: neighborhood.summary,
        vibe: neighborhood.vibe,
        best_for: neighborhood.best_for,
        description: neighborhood.description,
        transit_hubs: neighborhood.transit_hubs,
        display_order: neighborhood.display_order,
      },
      { onConflict: "city_id,slug" },
    );
    if (error) throw error;
  }

  console.log(`Upserted Vietnam neighborhoods: ${vietnamNeighborhoods.length}`);

  async function upsertPlace(input: {
    slug: string;
    name: string;
    entity_kind: string;
    category: string;
    neighborhood: string;
    summary?: string | null;
    description?: string | null;
    source?: string | null;
  }) {
    const neighborhoodId = neighborhoodIds.get(
      neighborhoodLookupKey(input.neighborhood),
    );
    const { data, error } = await supabase
      .from("places")
      .upsert(
        {
          city_id: cityId,
          neighborhood_id: neighborhoodId ?? null,
          slug: input.slug,
          name: input.name,
          entity_kind: input.entity_kind,
          category: input.category,
          summary: input.summary ?? null,
          description: input.description ?? null,
          status: "published",
          source: input.source ?? "seed",
        },
        { onConflict: "city_id,slug" },
      )
      .select("id")
      .single<RowId>();

    if (error) throw error;
    return data.id;
  }

  // --- Attractions -------------------------------------------------------
  const attractions = await readJson<AttractionSeed[]>(
    resolve(root, "tokyo/attractions.json"),
  );

  for (const attraction of attractions) {
    const placeId = await upsertPlace({
      slug: attraction.slug,
      name: attraction.name,
      entity_kind: "attraction",
      category: attraction.category,
      neighborhood: attraction.neighborhood,
      summary: attraction.summary,
      description: attraction.description,
      source: attraction.source,
    });

    const { error } = await supabase.from("attractions").upsert(
      {
        place_id: placeId,
        category: attraction.category,
        significance: attraction.significance,
        importance: attraction.importance,
        trip_type_slugs: attraction.trip_type_slugs,
        cost_adult_minor: attraction.cost_adult_minor,
        cost_child_minor: attraction.cost_child_minor,
        currency: attraction.currency,
        duration_minutes: attraction.duration_minutes,
        indoor: attraction.indoor,
        accessibility: attraction.accessibility,
        kid_friendly: attraction.kid_friendly,
        lgbtq_friendly: attraction.lgbtq_friendly,
        photography_allowed: attraction.photography_allowed,
        dress_code: attraction.dress_code,
        dress_notes: attraction.dress_notes,
        best_time_notes: attraction.best_time_notes ?? null,
        official_url: attraction.official_url,
        reseller_urls: attraction.reseller_urls,
        source: attraction.source,
      },
      { onConflict: "place_id" },
    );
    if (error) throw error;

    await replacePlaceTags(supabase, placeId, [
      { slug: attraction.category, tagKind: "category" },
      ...attraction.significance.map((slug) => ({
        slug,
        tagKind: "significance",
      })),
      ...attraction.tags.map((slug) => ({ slug, tagKind: "general" })),
      ...attraction.trip_type_slugs.map((slug) => ({
        slug,
        tagKind: "trip_type",
      })),
      ...(attraction.kid_friendly
        ? [{ slug: "kid-friendly", tagKind: "audience" }]
        : []),
      ...(attraction.lgbtq_friendly
        ? [{ slug: "lgbtq-friendly", tagKind: "audience" }]
        : []),
    ]);
    await upsertPlaceExternalUrls(supabase, placeId, {
      official: attraction.official_url,
      ...attraction.reseller_urls,
    });
  }

  console.log(`Upserted attractions: ${attractions.length}`);

  // --- Restaurants -------------------------------------------------------
  const restaurants = await readJson<RestaurantSeed[]>(
    resolve(root, "tokyo/restaurants.json"),
  );

  for (const restaurant of restaurants) {
    const placeId = await upsertPlace({
      slug: restaurant.slug,
      name: restaurant.name,
      entity_kind: "restaurant",
      category: restaurant.cuisine[0] ?? "restaurant",
      neighborhood: restaurant.neighborhood,
      summary: restaurant.notes ?? null,
      description: restaurant.notes ?? null,
      source: restaurant.source,
    });

    const { error } = await supabase.from("restaurants").upsert(
      {
        place_id: placeId,
        cuisine: restaurant.cuisine,
        price_band: restaurant.price_band,
        avg_price_per_person_minor: restaurant.avg_price_per_person_minor,
        currency: restaurant.currency,
        signature_dishes: restaurant.signature_dishes,
        reservation_required: restaurant.reservation_required,
        reservations_lead_time_days: restaurant.reservations_lead_time_days,
        reservation_url: restaurant.reservation_url,
        opening_hours: restaurant.opening_hours,
        closed_days: restaurant.closed_days,
        google_rating: restaurant.google_rating,
        google_review_count: restaurant.google_review_count,
        tabelog_score: restaurant.tabelog_score,
        michelin_stars: restaurant.michelin_stars,
        bib_gourmand: restaurant.bib_gourmand,
        dietary: restaurant.dietary,
        lgbtq_friendly: restaurant.lgbtq_friendly,
        kid_friendly: restaurant.kid_friendly,
        wheelchair_accessible: restaurant.wheelchair_accessible,
        notes: restaurant.notes ?? null,
        source: restaurant.source,
      },
      { onConflict: "place_id" },
    );
    if (error) throw error;

    await replacePlaceTags(supabase, placeId, [
      ...restaurant.cuisine.map((slug) => ({ slug, tagKind: "cuisine" })),
      ...restaurant.dietary.map((slug) => ({ slug, tagKind: "dietary" })),
      ...(restaurant.kid_friendly
        ? [{ slug: "kid-friendly", tagKind: "audience" }]
        : []),
      ...(restaurant.lgbtq_friendly
        ? [{ slug: "lgbtq-friendly", tagKind: "audience" }]
        : []),
      ...(restaurant.wheelchair_accessible
        ? [{ slug: "wheelchair-accessible", tagKind: "accessibility" }]
        : []),
    ]);
    await upsertPlaceExternalUrls(supabase, placeId, {
      reservation: restaurant.reservation_url,
    });
  }

  console.log(`Upserted restaurants: ${restaurants.length}`);

  // --- Legal & social risk intelligence --------------------------------
  const legalSocialRisks = await readJson<LegalSocialRiskPayload>(
    resolve(root, "japan/legal_social_risks.json"),
  );

  for (const risk of legalSocialRisks.risks) {
    const { data: riskCountry, error: riskCountryErr } = await supabase
      .from("countries")
      .select("id")
      .eq("slug", risk.country_slug)
      .single<RowId>();
    if (riskCountryErr) throw riskCountryErr;
    if (!riskCountry) {
      throw new Error(`Country not found for risk: ${risk.country_slug}`);
    }

    let riskCityId: string | null = null;
    if (risk.city_slug) {
      const { data: riskCity, error: riskCityErr } = await supabase
        .from("cities")
        .select("id")
        .eq("country_id", riskCountry.id)
        .eq("slug", risk.city_slug)
        .single<RowId>();
      if (riskCityErr) throw riskCityErr;
      if (!riskCity) {
        throw new Error(`City not found for risk: ${risk.city_slug}`);
      }
      riskCityId = riskCity.id;
    }

    let deleteQuery = supabase
      .from("legal_social_risks")
      .delete()
      .eq("country_id", riskCountry.id)
      .eq("risk_category", risk.risk_category);
    deleteQuery = riskCityId
      ? deleteQuery.eq("city_id", riskCityId)
      : deleteQuery.is("city_id", null);
    const { error: deleteErr } = await deleteQuery;
    if (deleteErr) throw deleteErr;

    const { error: insertErr } = await supabase
      .from("legal_social_risks")
      .insert({
        country_id: riskCountry.id,
        city_id: riskCityId,
        risk_category: risk.risk_category,
        risk_level: risk.risk_level,
        traveler_summary: risk.traveler_summary,
        what_not_to_do: risk.what_not_to_do,
        practical_safe_behavior: risk.practical_safe_behavior,
        examples: risk.examples,
        source_label: risk.source_label,
        source_url: risk.source_url,
        reviewed_at: risk.reviewed_at,
        confidence_level: risk.confidence_level,
        legal_disclaimer: risk.legal_disclaimer,
        display_order: risk.display_order,
        metadata: risk.metadata ?? {},
      });
    if (insertErr) throw insertErr;
  }

  console.log(`Upserted legal/social risks: ${legalSocialRisks.risks.length}`);

  // --- Destination identity profiles -----------------------------------
  const destinationIdentityPayloads = await Promise.all([
    readJson<DestinationIdentityPayload>(
      resolve(root, "japan/destination_identity.json"),
    ),
    readJson<DestinationIdentityPayload>(
      resolve(root, "vietnam/destination_identity.json"),
    ),
  ]);
  const destinationIdentity = {
    profiles: destinationIdentityPayloads.flatMap((payload) => payload.profiles),
  };

  for (const profile of destinationIdentity.profiles) {
    const owner = await deleteOwnerRows(
      "destination_identity_profiles",
      profile,
      {},
    );
    const { error } = await supabase
      .from("destination_identity_profiles")
      .insert({
        owner_kind: profile.owner_kind,
        country_id: owner.countryId,
        city_id: owner.cityId,
        palette_key: profile.palette_key,
        color_palette: profile.color_palette,
        script_style_key: profile.script_style_key ?? null,
        texture_key: profile.texture_key ?? null,
        background_style_key: profile.background_style_key ?? null,
        ambient_motion_key: profile.ambient_motion_key ?? null,
        icon_system_key: profile.icon_system_key ?? null,
        photography_mood: profile.photography_mood ?? null,
        accent_symbols: profile.accent_symbols,
        typography_notes: profile.typography_notes ?? null,
        source: profile.source ?? "seed",
        reviewed_at: profile.reviewed_at ?? null,
        metadata: profile.metadata ?? {},
      });
    if (error) throw error;
  }

  console.log(`Upserted identity profiles: ${destinationIdentity.profiles.length}`);

  // --- Travel activities taxonomy --------------------------------------
  const travelActivityPayloads = await Promise.all([
    readJson<TravelActivitiesPayload>(
      resolve(root, "japan/travel_activities.json"),
    ),
    readJson<TravelActivitiesPayload>(
      resolve(root, "vietnam/travel_activities.json"),
    ),
  ]);
  const travelActivities = {
    activities: travelActivityPayloads.flatMap((payload) => payload.activities),
    destination_map: travelActivityPayloads.flatMap(
      (payload) => payload.destination_map,
    ),
  };

  for (const activity of travelActivities.activities) {
    const { error } = await supabase.from("travel_activities").upsert(
      {
        slug: activity.slug,
        label: activity.label,
        activity_group: activity.activity_group,
        description: activity.description ?? null,
        traveler_types: activity.traveler_types,
        intensity: activity.intensity ?? null,
        indoor: activity.indoor ?? null,
        family_friendly: activity.family_friendly ?? null,
        display_order: activity.display_order,
        metadata: activity.metadata ?? {},
      },
      { onConflict: "slug" },
    );
    if (error) throw error;
  }

  for (const mapRow of travelActivities.destination_map) {
    const { data: activityRow, error: activityErr } = await supabase
      .from("travel_activities")
      .select("id")
      .eq("slug", mapRow.activity_slug)
      .single<RowId>();
    if (activityErr) throw activityErr;
    if (!activityRow) {
      throw new Error(`Activity not found for map: ${mapRow.activity_slug}`);
    }

    const owner = await deleteOwnerRows("destination_activity_map", mapRow, {
      activity_id: activityRow.id,
    });
    const { error } = await supabase.from("destination_activity_map").insert({
      activity_id: activityRow.id,
      owner_kind: mapRow.owner_kind,
      country_id: owner.countryId,
      city_id: owner.cityId,
      relevance_level: mapRow.relevance_level,
      seasonality: mapRow.seasonality,
      notes: mapRow.notes ?? null,
      display_order: mapRow.display_order,
      metadata: mapRow.metadata ?? {},
    });
    if (error) throw error;
  }

  console.log(
    `Upserted travel activities: ${travelActivities.activities.length}; mapped: ${travelActivities.destination_map.length}`,
  );

  // --- Price benchmarks -------------------------------------------------
  const priceBenchmarkPayloads = await Promise.all([
    readJson<PriceBenchmarksPayload>(
      resolve(root, "tokyo/price_benchmarks.json"),
    ),
    readJson<PriceBenchmarksPayload>(
      resolve(root, "vietnam/price_benchmarks.json"),
    ),
  ]);
  const priceBenchmarks = {
    benchmarks: priceBenchmarkPayloads.flatMap((payload) => payload.benchmarks),
  };

  for (const benchmark of priceBenchmarks.benchmarks) {
    const owner = await deleteOwnerRows("price_benchmarks", benchmark, {
      benchmark_key: benchmark.benchmark_key,
    });
    const { error } = await supabase.from("price_benchmarks").insert({
      owner_kind: benchmark.owner_kind,
      country_id: owner.countryId,
      city_id: owner.cityId,
      benchmark_key: benchmark.benchmark_key,
      category: benchmark.category,
      label: benchmark.label,
      amount_low_minor: benchmark.amount_low_minor ?? null,
      amount_typical_minor: benchmark.amount_typical_minor,
      amount_high_minor: benchmark.amount_high_minor ?? null,
      currency: benchmark.currency,
      unit: benchmark.unit,
      traveler_context: benchmark.traveler_context ?? null,
      notes: benchmark.notes ?? null,
      source_label: benchmark.source_label ?? null,
      source_url: benchmark.source_url ?? null,
      reviewed_at: benchmark.reviewed_at ?? null,
      confidence_level: benchmark.confidence_level,
      display_order: benchmark.display_order,
      metadata: benchmark.metadata ?? {},
    });
    if (error) throw error;
  }

  console.log(`Upserted price benchmarks: ${priceBenchmarks.benchmarks.length}`);

  // --- Local apps directory --------------------------------------------
  const localAppPayloads = await Promise.all([
    readJson<LocalAppsPayload>(resolve(root, "tokyo/local_apps.json")),
    readJson<LocalAppsPayload>(resolve(root, "vietnam/local_apps.json")),
  ]);
  const localApps = {
    apps: localAppPayloads.flatMap((payload) => payload.apps),
  };

  for (const app of localApps.apps) {
    const owner = await deleteOwnerRows("local_apps", app, { slug: app.slug });
    const { error } = await supabase.from("local_apps").insert({
      owner_kind: app.owner_kind,
      country_id: owner.countryId,
      city_id: owner.cityId,
      slug: app.slug,
      name: app.name,
      category: app.category,
      purpose: app.purpose,
      free: app.free,
      ios_url: app.ios_url ?? null,
      android_url: app.android_url ?? null,
      web_url: app.web_url ?? null,
      offline_useful: app.offline_useful,
      setup_before_arrival: app.setup_before_arrival,
      traveler_notes: app.traveler_notes ?? null,
      display_order: app.display_order,
      metadata: app.metadata ?? {},
    });
    if (error) throw error;
  }

  console.log(`Upserted local apps: ${localApps.apps.length}`);

  // --- Phrasebook -------------------------------------------------------
  const phrasebookPayloads = await Promise.all([
    readJson<PhrasebookPayload>(resolve(root, "japan/phrasebook.json")),
    readJson<PhrasebookPayload>(resolve(root, "vietnam/phrasebook.json")),
  ]);
  const phrasebook = {
    phrases: phrasebookPayloads.flatMap((payload) => payload.phrases),
  };

  for (const phrase of phrasebook.phrases) {
    const owner = await deleteOwnerRows("phrasebook_entries", phrase, {
      phrase_key: phrase.phrase_key,
    });
    const { error } = await supabase.from("phrasebook_entries").insert({
      owner_kind: phrase.owner_kind,
      country_id: owner.countryId,
      city_id: owner.cityId,
      phrase_key: phrase.phrase_key,
      category: phrase.category,
      source_language: phrase.source_language,
      target_language: phrase.target_language,
      source_text: phrase.source_text,
      translated_text: phrase.translated_text,
      transliteration: phrase.transliteration ?? null,
      literal_translation: phrase.literal_translation ?? null,
      usage_notes: phrase.usage_notes ?? null,
      formality: phrase.formality ?? null,
      audio_url: phrase.audio_url ?? null,
      display_order: phrase.display_order,
      metadata: phrase.metadata ?? {},
    });
    if (error) throw error;
  }

  console.log(`Upserted phrasebook entries: ${phrasebook.phrases.length}`);

  // --- Destination intelligence notes ----------------------------------
  const intelligenceNotes = await readJson<DestinationIntelligencePayload>(
    resolve(root, "vietnam/intelligence_notes.json"),
  );

  for (const note of intelligenceNotes.notes) {
    const owner = await deleteOwnerRows(
      "destination_intelligence_notes",
      note,
      {
        intelligence_category: note.intelligence_category,
        title: note.title,
      },
    );
    const { error } = await supabase
      .from("destination_intelligence_notes")
      .insert({
        owner_kind: note.owner_kind,
        country_id: owner.countryId,
        city_id: owner.cityId,
        intelligence_category: note.intelligence_category,
        risk_level: note.risk_level ?? null,
        title: note.title,
        traveler_summary: note.traveler_summary,
        practical_guidance: note.practical_guidance,
        watchouts: note.watchouts,
        examples: note.examples,
        source_label: note.source_label ?? null,
        source_url: note.source_url ?? null,
        reviewed_at: note.reviewed_at ?? null,
        confidence_level: note.confidence_level,
        display_order: note.display_order,
        metadata: note.metadata ?? {},
      });
    if (error) throw error;
  }

  console.log(`Upserted intelligence notes: ${intelligenceNotes.notes.length}`);

  // --- Affiliate opportunities -----------------------------------------
  const affiliateOpportunities = await readJson<AffiliateOpportunitiesPayload>(
    resolve(root, "vietnam/affiliate_opportunities.json"),
  );

  for (const opportunity of affiliateOpportunities.opportunities) {
    const owner = await deleteOwnerRows(
      "destination_affiliate_opportunities",
      opportunity,
      { opportunity_key: opportunity.opportunity_key },
    );
    const { error } = await supabase
      .from("destination_affiliate_opportunities")
      .insert({
        owner_kind: opportunity.owner_kind,
        country_id: owner.countryId,
        city_id: owner.cityId,
        opportunity_key: opportunity.opportunity_key,
        category: opportunity.category,
        traveler_need: opportunity.traveler_need,
        recommended_partner_keys: opportunity.recommended_partner_keys,
        placement_context: opportunity.placement_context,
        priority: opportunity.priority,
        notes: opportunity.notes ?? null,
        display_order: opportunity.display_order,
        metadata: opportunity.metadata ?? {},
      });
    if (error) throw error;
  }

  console.log(
    `Upserted affiliate opportunities: ${affiliateOpportunities.opportunities.length}`,
  );

  // --- Cultural, historical, and sensitivity intelligence ---------------
  const culturalPayloads = await Promise.all([
    readJson<CulturalIntelligencePayload>(
      resolve(root, "japan/cultural_intelligence.json"),
    ),
    readJson<CulturalIntelligencePayload>(
      resolve(root, "vietnam/cultural_intelligence.json"),
    ),
  ]);
  const culturalEvents = culturalPayloads.flatMap((payload) => payload.events);
  const culturalSensitivityNotes = culturalPayloads.flatMap(
    (payload) => payload.sensitivity_notes,
  );

  for (const event of culturalEvents) {
    const owner = await deleteOwnerRows("cultural_events", event, {
      event_key: event.event_key,
    });
    const { error } = await supabase.from("cultural_events").insert({
      owner_kind: event.owner_kind,
      country_id: owner.countryId,
      city_id: owner.cityId,
      event_key: event.event_key,
      name: event.name,
      event_kind: event.event_kind,
      starts_on: event.starts_on ?? null,
      ends_on: event.ends_on ?? null,
      recurrence_note: event.recurrence_note ?? null,
      date_note: event.date_note ?? null,
      traveler_summary: event.traveler_summary,
      cultural_context: event.cultural_context ?? null,
      practical_guidance: event.practical_guidance,
      etiquette_notes: event.etiquette_notes,
      public_closure_level: event.public_closure_level,
      tourism_surge_level: event.tourism_surge_level,
      transport_impact_level: event.transport_impact_level,
      crowd_level: event.crowd_level,
      risk_level: event.risk_level,
      source_label: event.source_label ?? null,
      source_url: event.source_url ?? null,
      reviewed_at: event.reviewed_at ?? null,
      confidence_level: event.confidence_level,
      display_order: event.display_order,
      metadata: event.metadata ?? {},
    });
    if (error) throw error;
  }

  for (const note of culturalSensitivityNotes) {
    const owner = await deleteOwnerRows("cultural_sensitivity_notes", note, {
      note_key: note.note_key,
    });
    const { error } = await supabase.from("cultural_sensitivity_notes").insert({
      owner_kind: note.owner_kind,
      country_id: owner.countryId,
      city_id: owner.cityId,
      note_key: note.note_key,
      sensitivity_category: note.sensitivity_category,
      title: note.title,
      traveler_summary: note.traveler_summary,
      why_it_matters: note.why_it_matters ?? null,
      avoid: note.avoid,
      practical_safe_behavior: note.practical_safe_behavior,
      examples: note.examples,
      risk_level: note.risk_level,
      source_label: note.source_label ?? null,
      source_url: note.source_url ?? null,
      reviewed_at: note.reviewed_at ?? null,
      confidence_level: note.confidence_level,
      display_order: note.display_order,
      metadata: note.metadata ?? {},
    });
    if (error) throw error;
  }

  console.log(
    `Upserted cultural events: ${culturalEvents.length}; sensitivity notes: ${culturalSensitivityNotes.length}`,
  );

  // --- Neighborhood and social reality intelligence ---------------------
  const neighborhoodRealityPayloads = await Promise.all([
    readJson<NeighborhoodSocialRealityPayload>(
      resolve(root, "japan/neighborhood_social_reality.json"),
    ),
    readJson<NeighborhoodSocialRealityPayload>(
      resolve(root, "vietnam/neighborhood_social_reality.json"),
    ),
  ]);
  const neighborhoodIntelligence = neighborhoodRealityPayloads.flatMap(
    (payload) => payload.neighborhood_intelligence,
  );
  const socialRealityNotes = neighborhoodRealityPayloads.flatMap(
    (payload) => payload.social_reality_notes,
  );
  const neighborhoodRelationships = neighborhoodRealityPayloads.flatMap(
    (payload) => payload.neighborhood_relationships,
  );

  for (const profile of neighborhoodIntelligence) {
    const owner = await resolveNeighborhoodId(profile);
    const { error: deleteErr } = await supabase
      .from("neighborhood_intelligence")
      .delete()
      .eq("neighborhood_id", owner.neighborhoodId);
    if (deleteErr) throw deleteErr;

    const { error } = await supabase.from("neighborhood_intelligence").insert({
      city_id: owner.cityId,
      neighborhood_id: owner.neighborhoodId,
      vibe_tags: profile.vibe_tags,
      luxury_level: profile.luxury_level,
      wealth_profile: profile.wealth_profile,
      local_expat_mix: profile.local_expat_mix,
      tourism_level: profile.tourism_level,
      nightlife_intensity: profile.nightlife_intensity,
      digital_nomad_friendliness: profile.digital_nomad_friendliness,
      family_friendliness: profile.family_friendliness,
      cafe_culture: profile.cafe_culture,
      shopping_level: profile.shopping_level,
      transport_quality: profile.transport_quality,
      walkability: profile.walkability,
      safety_at_night: profile.safety_at_night,
      dress_expectations: profile.dress_expectations,
      language_accessibility: profile.language_accessibility,
      setting_tags: profile.setting_tags,
      atmosphere_scores: profile.atmosphere_scores,
      social_expectations: profile.social_expectations,
      safety_notes: profile.safety_notes,
      recommended_for: profile.recommended_for,
      avoid_if: profile.avoid_if,
      traveler_type_fit: profile.traveler_type_fit,
      what_it_feels_like: profile.what_it_feels_like,
      practical_notes: profile.practical_notes,
      source_label: profile.source_label ?? null,
      source_url: profile.source_url ?? null,
      reviewed_at: profile.reviewed_at ?? null,
      confidence_level: profile.confidence_level,
      display_order: profile.display_order,
      metadata: profile.metadata ?? {},
    });
    if (error) throw error;
  }

  for (const note of socialRealityNotes) {
    const cityOwnerId = await resolveCityId(note.country_slug, note.city_slug);
    let noteNeighborhoodId: string | null = null;
    if (note.owner_kind === "neighborhood") {
      if (!note.neighborhood_slug) {
        throw new Error(`Missing neighborhood_slug for social note: ${note.note_key}`);
      }
      noteNeighborhoodId = (
        await resolveNeighborhoodId({
          country_slug: note.country_slug,
          city_slug: note.city_slug,
          neighborhood_slug: note.neighborhood_slug,
        })
      ).neighborhoodId;
    }

    let deleteQuery = supabase
      .from("social_reality_notes")
      .delete()
      .eq("owner_kind", note.owner_kind)
      .eq("city_id", cityOwnerId)
      .eq("note_key", note.note_key);
    deleteQuery = noteNeighborhoodId
      ? deleteQuery.eq("neighborhood_id", noteNeighborhoodId)
      : deleteQuery.is("neighborhood_id", null);
    const { error: deleteErr } = await deleteQuery;
    if (deleteErr) throw deleteErr;

    const { error } = await supabase.from("social_reality_notes").insert({
      owner_kind: note.owner_kind,
      city_id: cityOwnerId,
      neighborhood_id: noteNeighborhoodId,
      note_key: note.note_key,
      reality_category: note.reality_category,
      title: note.title,
      traveler_summary: note.traveler_summary,
      what_is_normal: note.what_is_normal,
      what_is_rude: note.what_is_rude,
      practical_guidance: note.practical_guidance,
      examples: note.examples,
      social_context: note.social_context ?? null,
      risk_level: note.risk_level,
      source_label: note.source_label ?? null,
      source_url: note.source_url ?? null,
      reviewed_at: note.reviewed_at ?? null,
      confidence_level: note.confidence_level,
      display_order: note.display_order,
      metadata: note.metadata ?? {},
    });
    if (error) throw error;
  }

  for (const relationship of neighborhoodRelationships) {
    const fromOwner = await resolveNeighborhoodId({
      country_slug: relationship.country_slug,
      city_slug: relationship.city_slug,
      neighborhood_slug: relationship.from_neighborhood_slug,
    });
    const toOwner = await resolveNeighborhoodId({
      country_slug: relationship.country_slug,
      city_slug: relationship.city_slug,
      neighborhood_slug: relationship.to_neighborhood_slug,
    });

    const { error: deleteErr } = await supabase
      .from("neighborhood_relationships")
      .delete()
      .eq("from_neighborhood_id", fromOwner.neighborhoodId)
      .eq("to_neighborhood_id", toOwner.neighborhoodId)
      .eq("relationship_kind", relationship.relationship_kind);
    if (deleteErr) throw deleteErr;

    const { error } = await supabase.from("neighborhood_relationships").insert({
      city_id: fromOwner.cityId,
      from_neighborhood_id: fromOwner.neighborhoodId,
      to_neighborhood_id: toOwner.neighborhoodId,
      relationship_kind: relationship.relationship_kind,
      traveler_summary: relationship.traveler_summary,
      distance_note: relationship.distance_note ?? null,
      practical_use: relationship.practical_use,
      source_label: relationship.source_label ?? null,
      source_url: relationship.source_url ?? null,
      reviewed_at: relationship.reviewed_at ?? null,
      confidence_level: relationship.confidence_level,
      display_order: relationship.display_order,
      metadata: relationship.metadata ?? {},
    });
    if (error) throw error;
  }

  console.log(
    `Upserted neighborhood intelligence: ${neighborhoodIntelligence.length}; social notes: ${socialRealityNotes.length}; relationships: ${neighborhoodRelationships.length}`,
  );

  // --- Internal field notes ---------------------------------------------
  const fieldNotes = await readJson<FieldNotesPayload>(
    resolve(root, "internal/field_notes.json"),
  );

  for (const note of fieldNotes.notes) {
    const countryId = await resolveCountryId(note.country_slug);
    let noteCityId: string | null = null;
    let noteNeighborhoodId: string | null = null;
    let notePlaceId: string | null = null;

    if (note.city_slug) {
      noteCityId = await resolveCityId(note.country_slug, note.city_slug);
    }

    if (note.neighborhood_slug) {
      if (!note.city_slug) {
        throw new Error(
          `Missing city_slug for field note neighborhood: ${note.neighborhood_slug}`,
        );
      }
      const resolvedNeighborhood = await resolveNeighborhoodId({
        country_slug: note.country_slug,
        city_slug: note.city_slug,
        neighborhood_slug: note.neighborhood_slug,
      });
      noteCityId = resolvedNeighborhood.cityId;
      noteNeighborhoodId = resolvedNeighborhood.neighborhoodId;
    }

    if (note.place_slug) {
      if (!note.city_slug) {
        throw new Error(`Missing city_slug for field note place: ${note.place_slug}`);
      }
      const resolvedPlace = await resolvePlaceId({
        country_slug: note.country_slug,
        city_slug: note.city_slug,
        place_slug: note.place_slug,
      });
      noteCityId = resolvedPlace.cityId;
      notePlaceId = resolvedPlace.placeId;
    }

    const { error } = await supabase.from("field_notes").insert({
      country_id: countryId,
      city_id: noteCityId,
      neighborhood_id: noteNeighborhoodId,
      place_id: notePlaceId,
      note_category: note.note_category,
      short_note: note.short_note,
      long_note: note.long_note ?? null,
      price_observation: note.price_observation ?? {},
      payment_observation: note.payment_observation ?? null,
      safety_observation: note.safety_observation ?? null,
      scam_warning: note.scam_warning ?? null,
      local_app_note: note.local_app_note ?? null,
      transport_note: note.transport_note ?? null,
      legal_social_risk_note: note.legal_social_risk_note ?? null,
      food_restaurant_note: note.food_restaurant_note ?? null,
      photo_references: note.photo_references ?? [],
      source_type: note.source_type,
      confidence_level: note.confidence_level,
      review_status: note.review_status,
      created_by: note.created_by ?? null,
      reviewed_by: note.reviewed_by ?? null,
      observed_at: note.observed_at ?? null,
      reviewed_at: note.reviewed_at ?? null,
      source_label: note.source_label ?? null,
      source_url: note.source_url ?? null,
      metadata: note.metadata ?? {},
    });
    if (error) throw error;
  }

  console.log(`Imported internal field notes: ${fieldNotes.notes.length}`);

  // --- Internal reviews and shared feedback -----------------------------
  const internalReviewsFeedback = await readJson<InternalReviewsFeedbackPayload>(
    resolve(root, "internal/reviews_feedback.json"),
  );

  for (const review of internalReviewsFeedback.reviews) {
    const target = await resolveReviewTargets(review);
    const entityId =
      review.entity_type === "country"
        ? target.countryId
        : review.entity_type === "city"
          ? target.cityId
          : review.entity_type === "neighborhood"
            ? target.neighborhoodId
            : review.entity_type === "local_app_service"
              ? target.localAppId
              : target.placeId;

    const { error } = await supabase.from("internal_reviews").insert({
      reviewer_user_id: review.reviewer_user_id ?? null,
      reviewer_display_name: review.reviewer_display_name ?? null,
      entity_type: review.entity_type,
      entity_id: entityId,
      entity_reference: review.entity_reference ?? null,
      country_id: target.countryId,
      city_id: target.cityId,
      neighborhood_id: target.neighborhoodId,
      place_id: target.placeId,
      local_app_id: target.localAppId,
      visit_date: review.visit_date ?? null,
      trip_context: review.trip_context ?? null,
      rating_overall: review.rating_overall ?? null,
      rating_value_for_money: review.rating_value_for_money ?? null,
      rating_safety: review.rating_safety ?? null,
      rating_cleanliness: review.rating_cleanliness ?? null,
      rating_service: review.rating_service ?? null,
      rating_location_convenience: review.rating_location_convenience ?? null,
      rating_family_friendliness: review.rating_family_friendliness ?? null,
      rating_solo_friendliness: review.rating_solo_friendliness ?? null,
      rating_digital_nomad_friendliness:
        review.rating_digital_nomad_friendliness ?? null,
      review_title: review.review_title,
      short_summary: review.short_summary,
      detailed_review: review.detailed_review ?? null,
      pros: review.pros,
      cons: review.cons,
      recommended_for: review.recommended_for,
      avoid_if: review.avoid_if,
      price_paid_minor: review.price_paid_minor ?? null,
      currency: review.currency ?? null,
      booking_platform_used: review.booking_platform_used ?? null,
      affiliate_provider_link_reference:
        review.affiliate_provider_link_reference ?? null,
      photo_references: review.photo_references ?? [],
      tags: review.tags,
      confidence_level: review.confidence_level,
      visibility_status: review.visibility_status,
      moderation_status: review.moderation_status,
      reviewed_by: review.reviewed_by ?? null,
      reviewed_at: review.reviewed_at ?? null,
      metadata: review.metadata ?? {},
    });
    if (error) throw error;
  }

  for (const feedback of internalReviewsFeedback.quick_feedback) {
    const target = await resolveReviewTargets(feedback);
    const entityId =
      feedback.entity_type === "country"
        ? target.countryId
        : feedback.entity_type === "city"
          ? target.cityId
          : feedback.entity_type === "neighborhood"
            ? target.neighborhoodId
            : feedback.entity_type === "local_app_service"
              ? target.localAppId
              : target.placeId;

    const { error } = await supabase.from("internal_quick_feedback").insert({
      reviewer_user_id: feedback.reviewer_user_id ?? null,
      reviewer_display_name: feedback.reviewer_display_name ?? null,
      entity_type: feedback.entity_type,
      entity_id: entityId,
      entity_reference: feedback.entity_reference ?? null,
      country_id: target.countryId,
      city_id: target.cityId,
      neighborhood_id: target.neighborhoodId,
      place_id: target.placeId,
      local_app_id: target.localAppId,
      thumbs_direction: feedback.thumbs_direction ?? null,
      saved: feedback.saved ?? false,
      would_return: feedback.would_return ?? null,
      overrated: feedback.overrated ?? false,
      tourist_trap: feedback.tourist_trap ?? false,
      worth_it: feedback.worth_it ?? false,
      avoid: feedback.avoid ?? false,
      cash_needed: feedback.cash_needed ?? false,
      card_worked: feedback.card_worked ?? false,
      felt_safe: feedback.felt_safe ?? null,
      felt_unsafe: feedback.felt_unsafe ?? null,
      english_friendly: feedback.english_friendly ?? null,
      good_for_work: feedback.good_for_work ?? false,
      good_for_families: feedback.good_for_families ?? false,
      good_for_solo_travelers: feedback.good_for_solo_travelers ?? false,
      tags: feedback.tags ?? [],
      note: feedback.note ?? null,
      visibility_status: feedback.visibility_status,
      moderation_status: feedback.moderation_status,
      reviewed_by: feedback.reviewed_by ?? null,
      reviewed_at: feedback.reviewed_at ?? null,
      metadata: feedback.metadata ?? {},
    });
    if (error) throw error;
  }

  console.log(
    `Imported internal reviews: ${internalReviewsFeedback.reviews.length}; quick feedback: ${internalReviewsFeedback.quick_feedback.length}`,
  );

  // --- Smart packing and clothing intelligence --------------------------
  const packingPayloads = await Promise.all([
    readJson<PackingIntelligencePayload>(
      resolve(root, "japan/packing_intelligence.json"),
    ),
    readJson<PackingIntelligencePayload>(
      resolve(root, "vietnam/packing_intelligence.json"),
    ),
  ]);
  const packingItems = packingPayloads.flatMap((payload) => payload.items);
  const packingRules = packingPayloads.flatMap((payload) => payload.rules);

  for (const item of packingItems) {
    const { error } = await supabase.from("packing_items").upsert(
      {
        item_key: item.item_key,
        label: item.label,
        packing_category: item.packing_category,
        default_importance: item.default_importance,
        default_required: item.default_required,
        weight_grams: item.weight_grams ?? null,
        pack_weight_priority: item.pack_weight_priority,
        reusable: item.reusable,
        source_label: item.source_label ?? null,
        source_url: item.source_url ?? null,
        reviewed_at: item.reviewed_at ?? null,
        metadata: item.metadata ?? {},
      },
      { onConflict: "item_key" },
    );
    if (error) throw error;
  }

  for (const rule of packingRules) {
    const { data: itemRow, error: itemErr } = await supabase
      .from("packing_items")
      .select("id")
      .eq("item_key", rule.item_key)
      .single<RowId>();
    if (itemErr) throw itemErr;
    if (!itemRow) {
      throw new Error(`Packing item not found for rule: ${rule.item_key}`);
    }

    const countryId = await resolveCountryId(rule.country_slug);
    let cityRuleId: string | null = null;
    if (rule.owner_kind === "city") {
      if (!rule.city_slug) {
        throw new Error(`Missing city_slug for packing rule: ${rule.rule_key}`);
      }
      cityRuleId = await resolveCityId(rule.country_slug, rule.city_slug);
    }

    let deleteQuery = supabase
      .from("destination_packing_rules")
      .delete()
      .eq("owner_kind", rule.owner_kind)
      .eq("rule_key", rule.rule_key);
    if (rule.owner_kind === "city") {
      deleteQuery = deleteQuery.eq("city_id", cityRuleId);
    } else {
      deleteQuery = deleteQuery.eq("country_id", countryId);
    }
    if (rule.owner_kind === "region") {
      deleteQuery = deleteQuery.eq("region_key", rule.region_key ?? "");
    }
    const { error: deleteErr } = await deleteQuery;
    if (deleteErr) throw deleteErr;

    const { error } = await supabase.from("destination_packing_rules").insert({
      owner_kind: rule.owner_kind,
      country_id: rule.owner_kind === "city" ? null : countryId,
      city_id: rule.owner_kind === "city" ? cityRuleId : null,
      region_key: rule.owner_kind === "region" ? rule.region_key ?? null : null,
      rule_key: rule.rule_key,
      item_id: itemRow.id,
      activity_tags: rule.activity_tags,
      weather_conditions: rule.weather_conditions,
      seasonality: rule.seasonality,
      traveler_profiles: rule.traveler_profiles,
      itinerary_styles: rule.itinerary_styles,
      transportation_styles: rule.transportation_styles,
      cultural_context_tags: rule.cultural_context_tags,
      clothing_context: rule.clothing_context,
      importance: rule.importance,
      required: rule.required,
      priority: rule.priority,
      pack_weight_priority: rule.pack_weight_priority,
      recommendation_note: rule.recommendation_note,
      cultural_notes: rule.cultural_notes ?? null,
      weather_notes: rule.weather_notes ?? null,
      activity_notes: rule.activity_notes ?? null,
      region_override_note: rule.region_override_note ?? null,
      quantity_hint: rule.quantity_hint ?? null,
      source_label: rule.source_label ?? null,
      source_url: rule.source_url ?? null,
      reviewed_at: rule.reviewed_at ?? null,
      confidence_level: rule.confidence_level,
      display_order: rule.display_order,
      metadata: rule.metadata ?? {},
    });
    if (error) throw error;
  }

  console.log(
    `Upserted packing items: ${packingItems.length}; packing rules: ${packingRules.length}`,
  );

  // --- Live travel alerts and crisis intelligence -----------------------
  const travelAlerts = await readJson<TravelAlertsPayload>(
    resolve(root, "internal/travel_alerts.json"),
  );

  for (const alert of travelAlerts.alerts) {
    let alertCountryId: string | null = null;
    let alertCityId: string | null = null;
    let alertNeighborhoodId: string | null = null;
    let alertPlaceId: string | null = null;

    if (alert.country_slug) {
      alertCountryId = await resolveCountryId(alert.country_slug);
    }
    if (alert.city_slug) {
      if (!alert.country_slug) {
        throw new Error(`Missing country_slug for alert city: ${alert.alert_key}`);
      }
      alertCityId = await resolveCityId(alert.country_slug, alert.city_slug);
    }
    if (alert.neighborhood_slug) {
      if (!alert.country_slug || !alert.city_slug) {
        throw new Error(
          `Missing country/city slug for alert neighborhood: ${alert.alert_key}`,
        );
      }
      const resolvedNeighborhood = await resolveNeighborhoodId({
        country_slug: alert.country_slug,
        city_slug: alert.city_slug,
        neighborhood_slug: alert.neighborhood_slug,
      });
      alertCityId = resolvedNeighborhood.cityId;
      alertNeighborhoodId = resolvedNeighborhood.neighborhoodId;
    }
    if (alert.place_slug) {
      if (!alert.country_slug || !alert.city_slug) {
        throw new Error(`Missing country/city slug for alert place: ${alert.alert_key}`);
      }
      const resolvedPlace = await resolvePlaceId({
        country_slug: alert.country_slug,
        city_slug: alert.city_slug,
        place_slug: alert.place_slug,
      });
      alertCityId = resolvedPlace.cityId;
      alertPlaceId = resolvedPlace.placeId;
    }

    const { error } = await supabase.from("travel_alerts").upsert(
      {
        alert_key: alert.alert_key,
        alert_type: alert.alert_type,
        scope_kind: alert.scope_kind,
        country_id: alertCountryId,
        city_id: alertCityId,
        neighborhood_id: alertNeighborhoodId,
        place_id: alertPlaceId,
        entity_reference: alert.entity_reference ?? null,
        title: alert.title,
        short_summary: alert.short_summary,
        traveler_impact: alert.traveler_impact,
        severity_level: alert.severity_level,
        urgency_level: alert.urgency_level,
        starts_at: alert.starts_at ?? null,
        ends_at: alert.ends_at ?? null,
        affected_regions: alert.affected_regions,
        affected_transport: alert.affected_transport,
        impact_categories: alert.impact_categories,
        airport_disruption: alert.airport_disruption ?? false,
        train_disruption: alert.train_disruption ?? false,
        road_closures: alert.road_closures ?? false,
        ferry_impact: alert.ferry_impact ?? false,
        nightlife_restrictions: alert.nightlife_restrictions ?? false,
        beach_closures: alert.beach_closures ?? false,
        atm_payment_disruption: alert.atm_payment_disruption ?? false,
        internet_disruption: alert.internet_disruption ?? false,
        embassy_recommendations: alert.embassy_recommendations,
        evacuation_guidance: alert.evacuation_guidance ?? null,
        curfew_rules: alert.curfew_rules ?? null,
        source_label: alert.source_label,
        source_url: alert.source_url,
        reviewed_at: alert.reviewed_at ?? null,
        confidence_level: alert.confidence_level,
        update_frequency: alert.update_frequency,
        active_status: alert.active_status,
        status: alert.status,
        created_by: alert.created_by ?? null,
        reviewed_by: alert.reviewed_by ?? null,
        metadata: alert.metadata ?? {},
      },
      { onConflict: "alert_key" },
    );
    if (error) throw error;
  }

  for (const banner of travelAlerts.banners) {
    const { data: alertRow, error: alertErr } = await supabase
      .from("travel_alerts")
      .select("id")
      .eq("alert_key", banner.alert_key)
      .single<RowId>();
    if (alertErr) throw alertErr;
    if (!alertRow) {
      throw new Error(`Alert not found for banner: ${banner.alert_key}`);
    }

    let bannerCountryId: string | null = null;
    let bannerCityId: string | null = null;
    let bannerNeighborhoodId: string | null = null;

    if (banner.country_slug) {
      bannerCountryId = await resolveCountryId(banner.country_slug);
    }
    if (banner.city_slug) {
      if (!banner.country_slug) {
        throw new Error(`Missing country_slug for banner city: ${banner.banner_key}`);
      }
      bannerCityId = await resolveCityId(banner.country_slug, banner.city_slug);
    }
    if (banner.neighborhood_slug) {
      if (!banner.country_slug || !banner.city_slug) {
        throw new Error(
          `Missing country/city slug for banner neighborhood: ${banner.banner_key}`,
        );
      }
      const resolvedNeighborhood = await resolveNeighborhoodId({
        country_slug: banner.country_slug,
        city_slug: banner.city_slug,
        neighborhood_slug: banner.neighborhood_slug,
      });
      bannerCityId = resolvedNeighborhood.cityId;
      bannerNeighborhoodId = resolvedNeighborhood.neighborhoodId;
    }

    const { error } = await supabase.from("travel_alert_banners").upsert(
      {
        alert_id: alertRow.id,
        banner_key: banner.banner_key,
        placement: banner.placement,
        country_id: bannerCountryId,
        city_id: bannerCityId,
        neighborhood_id: bannerNeighborhoodId,
        route_context: banner.route_context ?? {},
        title: banner.title,
        short_summary: banner.short_summary,
        display_style: banner.display_style,
        priority: banner.priority,
        starts_at: banner.starts_at ?? null,
        ends_at: banner.ends_at ?? null,
        cta_label: banner.cta_label ?? null,
        cta_url: banner.cta_url ?? null,
        active: banner.active,
        metadata: banner.metadata ?? {},
      },
      { onConflict: "banner_key" },
    );
    if (error) throw error;
  }

  console.log(
    `Upserted travel alerts: ${travelAlerts.alerts.length}; banners: ${travelAlerts.banners.length}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
