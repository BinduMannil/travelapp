import { promises as fs } from "fs";
import path from "path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  SEED_SUGGESTIONS,
  SUGGESTION_CATEGORIES,
  type SuggestionInput,
  type SuggestionStatus,
  type UserSuggestion,
  normalizeSuggestionKey,
} from "./types";

const STORE_PATH = path.join(process.cwd(), "data", "user-suggestions.json");

type SuggestionRow = {
  id: string;
  title: string;
  description: string;
  category: UserSuggestion["category"];
  status: SuggestionStatus;
  vote_count: number;
  comment_count: number;
  submitted_by: string;
  submitted_by_avatar: string;
  submitted_date_label: string;
  roadmap_label: string | null;
  status_detail: string;
  is_popular: boolean;
  duplicate_of_id: string | null;
  normalized_key: string;
  created_at: string;
};

let supabaseClient: SupabaseClient | null | undefined;

function getSupabase() {
  if (supabaseClient !== undefined) return supabaseClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    supabaseClient = null;
    return supabaseClient;
  }

  supabaseClient = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return supabaseClient;
}

function databaseUnavailableResult() {
  return {
    ok: false as const,
    status: 503,
    message: "The shared ideas board is temporarily unavailable. Try again in a moment.",
  };
}

function sortSuggestions(suggestions: UserSuggestion[]) {
  return [...suggestions].sort((a, b) => {
    if (b.voteCount !== a.voteCount) return b.voteCount - a.voteCount;
    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
  });
}

function toSuggestion(row: SuggestionRow): UserSuggestion {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    status: row.status,
    voteCount: row.vote_count,
    commentCount: row.comment_count,
    submittedBy: row.submitted_by,
    submittedByAvatar: row.submitted_by_avatar,
    submittedDateLabel: row.submitted_date_label,
    roadmapLabel: row.roadmap_label ?? undefined,
    statusDetail: row.status_detail,
    isPopular: row.is_popular,
    duplicateOfId: row.duplicate_of_id ?? undefined,
    createdAt: row.created_at,
    normalizedKey: row.normalized_key,
  };
}

function toInsert(suggestion: UserSuggestion) {
  return {
    id: suggestion.id,
    title: suggestion.title,
    description: suggestion.description,
    category: suggestion.category,
    status: suggestion.status,
    vote_count: suggestion.voteCount,
    comment_count: suggestion.commentCount,
    submitted_by: suggestion.submittedBy,
    submitted_by_avatar: suggestion.submittedByAvatar,
    submitted_date_label: suggestion.submittedDateLabel,
    roadmap_label: suggestion.roadmapLabel ?? null,
    status_detail: suggestion.statusDetail,
    is_popular: suggestion.isPopular ?? false,
    duplicate_of_id: suggestion.duplicateOfId ?? null,
    normalized_key: suggestion.normalizedKey,
    created_at: suggestion.createdAt,
  };
}

function isValidSuggestion(input: SuggestionInput) {
  return (
    typeof input?.title === "string" &&
    typeof input?.description === "string" &&
    SUGGESTION_CATEGORIES.includes(input.category)
  );
}

async function seedSupabaseIfEmpty(supabase: SupabaseClient) {
  const { count, error } = await supabase
    .from("user_suggestions")
    .select("id", { count: "exact", head: true });

  if (error || count) return;

  await supabase
    .from("user_suggestions")
    .upsert(SEED_SUGGESTIONS.map(toInsert), { onConflict: "normalized_key" });
}

async function readSuggestionsFromSupabase(supabase: SupabaseClient) {
  await seedSupabaseIfEmpty(supabase);
  const { data, error } = await supabase
    .from("user_suggestions")
    .select("*")
    .order("vote_count", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return sortSuggestions(((data ?? []) as SuggestionRow[]).map(toSuggestion));
}

async function ensureStore() {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  try {
    await fs.access(STORE_PATH);
  } catch {
    await fs.writeFile(STORE_PATH, `${JSON.stringify(SEED_SUGGESTIONS, null, 2)}\n`, "utf8");
  }
}

export async function readSuggestions() {
  const supabase = getSupabase();
  if (supabase) {
    try {
      return await readSuggestionsFromSupabase(supabase);
    } catch {
      // Fall back to bundled/local storage when the database is unavailable.
    }
  }

  await ensureStore();
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as UserSuggestion[];
    return sortSuggestions(parsed.length ? parsed : SEED_SUGGESTIONS);
  } catch {
    await writeSuggestions(SEED_SUGGESTIONS);
    return sortSuggestions(SEED_SUGGESTIONS);
  }
}

async function writeSuggestions(suggestions: UserSuggestion[]) {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, `${JSON.stringify(sortSuggestions(suggestions), null, 2)}\n`, "utf8");
}

export async function createSuggestion(input: SuggestionInput) {
  if (!isValidSuggestion(input)) {
    return {
      ok: false as const,
      status: 400,
      message: "Choose a valid suggestion category.",
    };
  }

  const cleanTitle = input.title.trim();
  const cleanDescription = input.description.trim();

  if (cleanTitle.length < 4 || cleanDescription.length < 12) {
    return {
      ok: false as const,
      status: 400,
      message: "Add a clear title and a short description so other travelers understand the idea.",
    };
  }

  if (!SUGGESTION_CATEGORIES.includes(input.category)) {
    return {
      ok: false as const,
      status: 400,
      message: "Choose a valid suggestion category.",
    };
  }

  const supabase = getSupabase();
  if (supabase) {
    try {
      const suggestions = await readSuggestionsFromSupabase(supabase);
      const normalizedKey = normalizeSuggestionKey(cleanTitle, input.category);
      const duplicate = suggestions.find((suggestion) => suggestion.normalizedKey === normalizedKey);

      if (duplicate) {
        return {
          ok: false as const,
          status: 409,
          message: `That suggestion already exists. You can vote for "${duplicate.title}" below.`,
          duplicate,
          suggestions,
        };
      }

      const suggestion: UserSuggestion = {
        id: crypto.randomUUID(),
        title: cleanTitle,
        description: cleanDescription,
        category: input.category,
        status: "Under Review",
        voteCount: 1,
        commentCount: 0,
        submittedBy: "You",
        submittedByAvatar: "YO",
        submittedDateLabel: "just now",
        statusDetail: "Reviewing now",
        createdAt: new Date().toISOString(),
        normalizedKey,
      };

      const { error } = await supabase.from("user_suggestions").insert(toInsert(suggestion));
      if (error) throw error;

      const nextSuggestions = await readSuggestionsFromSupabase(supabase);
      return {
        ok: true as const,
        message: "Suggestion saved. Your vote has been counted.",
        suggestion,
        suggestions: nextSuggestions,
      };
    } catch {
      return databaseUnavailableResult();
    }
  }

  const suggestions = await readSuggestions();
  const normalizedKey = normalizeSuggestionKey(cleanTitle, input.category);
  const duplicate = suggestions.find((suggestion) => suggestion.normalizedKey === normalizedKey);

  if (duplicate) {
    return {
      ok: false as const,
      status: 409,
      message: `That suggestion already exists. You can vote for "${duplicate.title}" below.`,
      duplicate,
      suggestions,
    };
  }

  const suggestion: UserSuggestion = {
    id: crypto.randomUUID(),
    title: cleanTitle,
    description: cleanDescription,
    category: input.category,
    status: "Under Review",
    voteCount: 1,
    commentCount: 0,
    submittedBy: "You",
    submittedByAvatar: "YO",
    submittedDateLabel: "just now",
    statusDetail: "Reviewing now",
    createdAt: new Date().toISOString(),
    normalizedKey,
  };

  const nextSuggestions = sortSuggestions([suggestion, ...suggestions]);
  await writeSuggestions(nextSuggestions);

  return {
    ok: true as const,
    message: "Suggestion saved. Your vote has been counted.",
    suggestion,
    suggestions: nextSuggestions,
  };
}

export async function voteForSuggestion(id: string) {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const suggestions = await readSuggestionsFromSupabase(supabase);
      const exists = suggestions.some((suggestion) => suggestion.id === id);

      if (!exists) {
        return {
          ok: false as const,
          status: 404,
          message: "Suggestion not found.",
        };
      }

      const { error } = await supabase.rpc("increment_user_suggestion_vote", {
        suggestion_id: id,
      });

      if (error) {
        const current = suggestions.find((suggestion) => suggestion.id === id);
        const { error: updateError } = await supabase
          .from("user_suggestions")
          .update({ vote_count: (current?.voteCount ?? 0) + 1 })
          .eq("id", id);

        if (updateError) throw updateError;
      }

      return {
        ok: true as const,
        message: "Vote counted.",
        suggestions: await readSuggestionsFromSupabase(supabase),
      };
    } catch {
      return databaseUnavailableResult();
    }
  }

  const suggestions = await readSuggestions();
  const exists = suggestions.some((suggestion) => suggestion.id === id);

  if (!exists) {
    return {
      ok: false as const,
      status: 404,
      message: "Suggestion not found.",
    };
  }

  const nextSuggestions = sortSuggestions(
    suggestions.map((suggestion) =>
      suggestion.id === id ? { ...suggestion, voteCount: suggestion.voteCount + 1 } : suggestion,
    ),
  );

  await writeSuggestions(nextSuggestions);

  return {
    ok: true as const,
    message: "Vote counted.",
    suggestions: nextSuggestions,
  };
}
