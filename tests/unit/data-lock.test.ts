import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const repoRoot = process.cwd();

type CountrySeed = {
  slug: string;
  name: string;
  iso2: string;
  iso3: string;
  default_currency: string;
  default_timezone: string;
  primary_languages: string[];
  summary: string;
};

type CitySeed = {
  country_slug: string;
  slug: string;
  name: string;
  timezone: string;
  lat: number;
  lon: number;
  default_currency: string;
  summary: string;
};

function readJson<T>(relativePath: string): T {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8")) as T;
}

function expectNonEmptyString(value: unknown) {
  expect(typeof value).toBe("string");
  expect((value as string).trim().length).toBeGreaterThan(0);
}

function expectCountrySeed(country: CountrySeed, slug: string) {
  expect(country.slug).toBe(slug);
  expectNonEmptyString(country.name);
  expect(country.iso2).toMatch(/^[A-Z]{2}$/);
  expect(country.iso3).toMatch(/^[A-Z]{3}$/);
  expect(country.default_currency).toMatch(/^[A-Z]{3}$/);
  expectNonEmptyString(country.default_timezone);
  expect(country.primary_languages.length).toBeGreaterThan(0);
  expectNonEmptyString(country.summary);
}

function expectCitySeed(city: CitySeed, countrySlug: string) {
  expect(city.country_slug).toBe(countrySlug);
  expectNonEmptyString(city.slug);
  expectNonEmptyString(city.name);
  expectNonEmptyString(city.timezone);
  expect(Number.isFinite(city.lat)).toBe(true);
  expect(Number.isFinite(city.lon)).toBe(true);
  expect(city.default_currency).toMatch(/^[A-Z]{3}$/);
  expectNonEmptyString(city.summary);
}

describe("data layer lock", () => {
  it("keeps migration filenames sequential and non-empty", () => {
    const migrationDir = path.join(repoRoot, "db/migrations");
    const migrations = readdirSync(migrationDir)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    expect(migrations).toHaveLength(14);

    migrations.forEach((file, index) => {
      const expectedPrefix = String(index + 1).padStart(4, "0");
      expect(file.startsWith(`${expectedPrefix}_`)).toBe(true);
      expect(file).toMatch(/^\d{4}_[a-z0-9_]+\.sql$/);

      const sql = readFileSync(path.join(migrationDir, file), "utf8");
      expect(sql.trim().length).toBeGreaterThan(0);
    });
  });

  it("keeps the disposable database migration application script wired", () => {
    const packageJson = readJson<{ scripts: Record<string, string> }>("package.json");
    const scriptPath = path.join(repoRoot, "db/scripts/test-migrations.sh");
    const script = readFileSync(scriptPath, "utf8");

    expect(packageJson.scripts["db:migrations:test"]).toBe("bash db/scripts/test-migrations.sh");
    expect(script).toContain("JOURNEE_MIGRATION_TEST_DATABASE_URL");
    expect(script).toContain("auth.users");
    expect(script).toContain("auth.uid()");
    expect(script).toContain("db/migrations");
  });

  it("parses every seed JSON file", () => {
    const seedRoot = path.join(repoRoot, "db/seed");
    const folders = readdirSync(seedRoot, { withFileTypes: true }).filter((entry) =>
      entry.isDirectory(),
    );

    for (const folder of folders) {
      const folderPath = path.join(seedRoot, folder.name);
      const jsonFiles = readdirSync(folderPath).filter((file) => file.endsWith(".json"));

      expect(jsonFiles.length, folder.name).toBeGreaterThan(0);

      for (const file of jsonFiles) {
        const fullPath = path.join(folderPath, file);
        const raw = readFileSync(fullPath, "utf8");
        expect(raw.trim().length, fullPath).toBeGreaterThan(0);
        expect(() => JSON.parse(raw), fullPath).not.toThrow();
      }
    }
  });

  it("locks core country seed shape for Japan and Vietnam", () => {
    expectCountrySeed(readJson<CountrySeed>("db/seed/japan/country.json"), "japan");
    expectCountrySeed(readJson<CountrySeed>("db/seed/vietnam/country.json"), "vietnam");
  });

  it("locks core city seed shape for Tokyo and Vietnam cities", () => {
    expectCitySeed(readJson<CitySeed>("db/seed/tokyo/city.json"), "japan");

    const vietnamCities = readJson<CitySeed[]>("db/seed/vietnam/cities.json");
    expect(vietnamCities.length).toBeGreaterThanOrEqual(10);

    for (const city of vietnamCities) {
      expectCitySeed(city, "vietnam");
    }

    expect(vietnamCities.map((city) => city.slug)).toEqual(
      expect.arrayContaining(["ho-chi-minh-city", "hanoi", "da-nang"]),
    );
  });

  it("keeps expected pilot seed files present", () => {
    for (const relativePath of [
      "db/seed/japan/packing_intelligence.json",
      "db/seed/japan/legal_social_risks.json",
      "db/seed/tokyo/itineraries.json",
      "db/seed/tokyo/restaurants.json",
      "db/seed/vietnam/price_benchmarks.json",
      "db/seed/vietnam/travel_activities.json",
      "db/seed/vietnam/phrasebook.json",
      "db/seed/internal/travel_alerts.json",
    ]) {
      expect(existsSync(path.join(repoRoot, relativePath)), relativePath).toBe(true);
    }
  });
});
