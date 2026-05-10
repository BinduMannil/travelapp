// Internal FIELD NOTES data layer.
//
// Field notes are private working observations for Journee team members. This
// module keeps JSON fallback available for internal tooling while live reads and
// writes require an explicit Supabase client with the right authenticated user
// or service role context.

import type { SupabaseClient } from "@supabase/supabase-js";
import fieldNotesJson from "@/db/seed/internal/field_notes.json";

export type FieldNoteCategory =
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

export type FieldNoteSourceType =
  | "personal_observation"
  | "official_source"
  | "local_advice"
  | "receipt"
  | "screenshot";

export type FieldNoteConfidenceLevel = "low" | "medium" | "high";
export type FieldNoteReviewStatus =
  | "unreviewed"
  | "needs_followup"
  | "approved"
  | "rejected"
  | "promoted";

export type FieldNotePhotoReference = {
  url?: string;
  storage_path?: string;
  caption?: string;
  captured_at?: string;
  metadata?: Record<string, unknown>;
};

export type FieldNoteSeed = {
  country_slug: string;
  city_slug?: string | null;
  neighborhood_slug?: string | null;
  place_slug?: string | null;
  note_category: FieldNoteCategory;
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
  photo_references?: FieldNotePhotoReference[];
  source_type: FieldNoteSourceType;
  confidence_level: FieldNoteConfidenceLevel;
  review_status: FieldNoteReviewStatus;
  created_by?: string | null;
  reviewed_by?: string | null;
  observed_at?: string | null;
  reviewed_at?: string | null;
  source_label?: string | null;
  source_url?: string | null;
  metadata?: Record<string, unknown>;
};

export type FieldNoteRow = {
  id: string;
  country_id?: string | null;
  city_id?: string | null;
  neighborhood_id?: string | null;
  place_id?: string | null;
  note_category: FieldNoteCategory;
  short_note: string;
  long_note?: string | null;
  price_observation: Record<string, unknown>;
  payment_observation?: string | null;
  safety_observation?: string | null;
  scam_warning?: string | null;
  local_app_note?: string | null;
  transport_note?: string | null;
  legal_social_risk_note?: string | null;
  food_restaurant_note?: string | null;
  photo_references: FieldNotePhotoReference[];
  source_type: FieldNoteSourceType;
  confidence_level: FieldNoteConfidenceLevel;
  review_status: FieldNoteReviewStatus;
  created_by?: string | null;
  reviewed_by?: string | null;
  observed_at?: string | null;
  reviewed_at?: string | null;
  source_label?: string | null;
  source_url?: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type CreateFieldNoteInput = Omit<
  FieldNoteRow,
  | "id"
  | "created_at"
  | "updated_at"
  | "price_observation"
  | "photo_references"
  | "metadata"
> & {
  price_observation?: Record<string, unknown>;
  photo_references?: FieldNotePhotoReference[];
  metadata?: Record<string, unknown>;
};

type FieldNotesPayload = {
  notes: FieldNoteSeed[];
};

const FIELD_NOTES_SEED = fieldNotesJson as FieldNotesPayload;

export function getFieldNotesSeed(filters: {
  countrySlug?: string;
  citySlug?: string | null;
  neighborhoodSlug?: string | null;
  placeSlug?: string | null;
  reviewStatus?: FieldNoteReviewStatus;
  category?: FieldNoteCategory;
} = {}): FieldNoteSeed[] {
  return FIELD_NOTES_SEED.notes.filter((note) => {
    if (filters.countrySlug && note.country_slug !== filters.countrySlug) return false;
    if (filters.citySlug && note.city_slug !== filters.citySlug) return false;
    if (
      filters.neighborhoodSlug &&
      note.neighborhood_slug !== filters.neighborhoodSlug
    ) {
      return false;
    }
    if (filters.placeSlug && note.place_slug !== filters.placeSlug) return false;
    if (filters.reviewStatus && note.review_status !== filters.reviewStatus) {
      return false;
    }
    if (filters.category && note.note_category !== filters.category) return false;
    return true;
  });
}

export async function getFieldNotesLive({
  supabase,
  countryId,
  cityId,
  neighborhoodId,
  placeId,
  reviewStatus,
  category,
  limit = 100,
}: {
  supabase?: SupabaseClient | null;
  countryId?: string | null;
  cityId?: string | null;
  neighborhoodId?: string | null;
  placeId?: string | null;
  reviewStatus?: FieldNoteReviewStatus;
  category?: FieldNoteCategory;
  limit?: number;
}): Promise<FieldNoteRow[]> {
  if (!supabase) return [];

  let query = supabase
    .from("field_notes")
    .select(
      "id, country_id, city_id, neighborhood_id, place_id, note_category, short_note, long_note, price_observation, payment_observation, safety_observation, scam_warning, local_app_note, transport_note, legal_social_risk_note, food_restaurant_note, photo_references, source_type, confidence_level, review_status, created_by, reviewed_by, observed_at, reviewed_at, source_label, source_url, metadata, created_at, updated_at",
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (countryId) query = query.eq("country_id", countryId);
  if (cityId) query = query.eq("city_id", cityId);
  if (neighborhoodId) query = query.eq("neighborhood_id", neighborhoodId);
  if (placeId) query = query.eq("place_id", placeId);
  if (reviewStatus) query = query.eq("review_status", reviewStatus);
  if (category) query = query.eq("note_category", category);

  const { data, error } = await query;
  if (error || !data) return [];
  return data as FieldNoteRow[];
}

export async function createFieldNoteLive({
  supabase,
  note,
}: {
  supabase: SupabaseClient;
  note: CreateFieldNoteInput;
}): Promise<FieldNoteRow | null> {
  const { data, error } = await supabase
    .from("field_notes")
    .insert({
      ...note,
      price_observation: note.price_observation ?? {},
      photo_references: note.photo_references ?? [],
      metadata: note.metadata ?? {},
    })
    .select(
      "id, country_id, city_id, neighborhood_id, place_id, note_category, short_note, long_note, price_observation, payment_observation, safety_observation, scam_warning, local_app_note, transport_note, legal_social_risk_note, food_restaurant_note, photo_references, source_type, confidence_level, review_status, created_by, reviewed_by, observed_at, reviewed_at, source_label, source_url, metadata, created_at, updated_at",
    )
    .single<FieldNoteRow>();

  if (error || !data) return null;
  return data;
}
