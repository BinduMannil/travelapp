// Internal reviews and shared feedback data helpers.
//
// These helpers intentionally require an explicit Supabase client for live data.
// Reviews are private/internal intelligence inputs, not public user-generated
// review surfaces.

import type { SupabaseClient } from "@supabase/supabase-js";
import reviewsFeedbackJson from "@/db/seed/internal/reviews_feedback.json";

export type InternalReviewEntityType =
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

export type InternalVisibilityStatus = "private" | "internal" | "approved" | "rejected";

export type InternalReviewLifecycle =
  | "draft"
  | "submitted"
  | "internal_visible"
  | "approved_for_public"
  | "rejected"
  | "archived";

export type InternalConfidenceLevel = "low" | "medium" | "high";
export type InternalThumbsDirection = "up" | "down";

export type InternalPhotoReference = {
  url?: string;
  storage_path?: string;
  caption?: string;
  captured_at?: string;
  metadata?: Record<string, unknown>;
};

export type InternalReviewSeed = {
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
  photo_references?: InternalPhotoReference[];
  tags: string[];
  confidence_level: InternalConfidenceLevel;
  visibility_status: InternalVisibilityStatus;
  moderation_status: InternalReviewLifecycle;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  metadata?: Record<string, unknown>;
};

export type InternalReviewRow = Omit<
  InternalReviewSeed,
  "country_slug" | "city_slug" | "neighborhood_slug" | "place_slug" | "local_app_slug"
> & {
  id: string;
  entity_id?: string | null;
  country_id?: string | null;
  city_id?: string | null;
  neighborhood_id?: string | null;
  place_id?: string | null;
  local_app_id?: string | null;
  photo_references: InternalPhotoReference[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type InternalQuickFeedbackSeed = {
  reviewer_user_id?: string | null;
  reviewer_display_name?: string | null;
  entity_type: InternalReviewEntityType;
  entity_reference?: string | null;
  country_slug: string;
  city_slug?: string | null;
  neighborhood_slug?: string | null;
  place_slug?: string | null;
  local_app_slug?: string | null;
  thumbs_direction?: InternalThumbsDirection | null;
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

export type InternalQuickFeedbackRow = Omit<
  InternalQuickFeedbackSeed,
  "country_slug" | "city_slug" | "neighborhood_slug" | "place_slug" | "local_app_slug"
> & {
  id: string;
  entity_id?: string | null;
  country_id?: string | null;
  city_id?: string | null;
  neighborhood_id?: string | null;
  place_id?: string | null;
  local_app_id?: string | null;
  tags: string[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type CreateInternalReviewInput = Omit<
  InternalReviewRow,
  "id" | "created_at" | "updated_at" | "photo_references" | "metadata"
> & {
  photo_references?: InternalPhotoReference[];
  metadata?: Record<string, unknown>;
};

export type CreateInternalQuickFeedbackInput = Omit<
  InternalQuickFeedbackRow,
  "id" | "created_at" | "updated_at" | "tags" | "metadata"
> & {
  tags?: string[];
  metadata?: Record<string, unknown>;
};

type InternalReviewsFeedbackPayload = {
  reviews: InternalReviewSeed[];
  quick_feedback: InternalQuickFeedbackSeed[];
};

const REVIEWS_FEEDBACK_SEED =
  reviewsFeedbackJson as InternalReviewsFeedbackPayload;

export function getInternalReviewsSeed(filters: {
  countrySlug?: string;
  citySlug?: string | null;
  entityType?: InternalReviewEntityType;
  moderationStatus?: InternalReviewLifecycle;
} = {}): InternalReviewSeed[] {
  return REVIEWS_FEEDBACK_SEED.reviews.filter((review) => {
    if (filters.countrySlug && review.country_slug !== filters.countrySlug) {
      return false;
    }
    if (filters.citySlug && review.city_slug !== filters.citySlug) return false;
    if (filters.entityType && review.entity_type !== filters.entityType) return false;
    if (
      filters.moderationStatus &&
      review.moderation_status !== filters.moderationStatus
    ) {
      return false;
    }
    return true;
  });
}

export function getInternalQuickFeedbackSeed(filters: {
  countrySlug?: string;
  citySlug?: string | null;
  entityType?: InternalReviewEntityType;
  moderationStatus?: InternalReviewLifecycle;
} = {}): InternalQuickFeedbackSeed[] {
  return REVIEWS_FEEDBACK_SEED.quick_feedback.filter((feedback) => {
    if (filters.countrySlug && feedback.country_slug !== filters.countrySlug) {
      return false;
    }
    if (filters.citySlug && feedback.city_slug !== filters.citySlug) return false;
    if (filters.entityType && feedback.entity_type !== filters.entityType) {
      return false;
    }
    if (
      filters.moderationStatus &&
      feedback.moderation_status !== filters.moderationStatus
    ) {
      return false;
    }
    return true;
  });
}

export async function getInternalReviewsLive({
  supabase,
  countryId,
  cityId,
  entityType,
  moderationStatus,
  limit = 100,
}: {
  supabase?: SupabaseClient | null;
  countryId?: string | null;
  cityId?: string | null;
  entityType?: InternalReviewEntityType;
  moderationStatus?: InternalReviewLifecycle;
  limit?: number;
}): Promise<InternalReviewRow[]> {
  if (!supabase) return [];

  let query = supabase
    .from("internal_reviews")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (countryId) query = query.eq("country_id", countryId);
  if (cityId) query = query.eq("city_id", cityId);
  if (entityType) query = query.eq("entity_type", entityType);
  if (moderationStatus) query = query.eq("moderation_status", moderationStatus);

  const { data, error } = await query;
  if (error || !data) return [];
  return data as InternalReviewRow[];
}

export async function getInternalQuickFeedbackLive({
  supabase,
  countryId,
  cityId,
  entityType,
  moderationStatus,
  limit = 100,
}: {
  supabase?: SupabaseClient | null;
  countryId?: string | null;
  cityId?: string | null;
  entityType?: InternalReviewEntityType;
  moderationStatus?: InternalReviewLifecycle;
  limit?: number;
}): Promise<InternalQuickFeedbackRow[]> {
  if (!supabase) return [];

  let query = supabase
    .from("internal_quick_feedback")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (countryId) query = query.eq("country_id", countryId);
  if (cityId) query = query.eq("city_id", cityId);
  if (entityType) query = query.eq("entity_type", entityType);
  if (moderationStatus) query = query.eq("moderation_status", moderationStatus);

  const { data, error } = await query;
  if (error || !data) return [];
  return data as InternalQuickFeedbackRow[];
}

export async function createInternalReviewLive({
  supabase,
  review,
}: {
  supabase: SupabaseClient;
  review: CreateInternalReviewInput;
}): Promise<InternalReviewRow | null> {
  const { data, error } = await supabase
    .from("internal_reviews")
    .insert({
      ...review,
      photo_references: review.photo_references ?? [],
      metadata: review.metadata ?? {},
    })
    .select("*")
    .single<InternalReviewRow>();

  if (error || !data) return null;
  return data;
}

export async function createInternalQuickFeedbackLive({
  supabase,
  feedback,
}: {
  supabase: SupabaseClient;
  feedback: CreateInternalQuickFeedbackInput;
}): Promise<InternalQuickFeedbackRow | null> {
  const { data, error } = await supabase
    .from("internal_quick_feedback")
    .insert({
      ...feedback,
      tags: feedback.tags ?? [],
      metadata: feedback.metadata ?? {},
    })
    .select("*")
    .single<InternalQuickFeedbackRow>();

  if (error || !data) return null;
  return data;
}
