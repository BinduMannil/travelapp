import { createClient } from "@supabase/supabase-js";

// Server-only. Uses the service-role key. Never import from client components.
export function createAdminClient() {
  if (typeof window !== "undefined") {
    throw new Error("createAdminClient must not be used in the browser");
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    },
  );
}
