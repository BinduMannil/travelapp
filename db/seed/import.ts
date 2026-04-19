// Seed importer — reads db/seed/<country>/*.json and db/seed/<city>/*.json
// and upserts into Supabase using the service-role key.
//
// Usage: npm run seed
// Requires: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in env.

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

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

async function main() {
  const supabase = createClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { autoRefreshToken: false, persistSession: false } },
  );

  const root = resolve(process.cwd(), "db/seed");

  // --- Countries ---------------------------------------------------------
  const japan = await readJson<CountrySeed>(resolve(root, "japan/country.json"));
  const { data: countryRow, error: countryErr } = await supabase
    .from("countries")
    .upsert(japan, { onConflict: "slug" })
    .select("id, slug")
    .single();

  if (countryErr) throw countryErr;
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
  console.log(`Upserted city: ${cityRow.slug}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
