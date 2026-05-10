import { describe, expect, it } from "vitest";
import {
  getGlobalCities,
  getGlobalCountries,
  getGlobalDestinationCandidates,
  getSeedDestinationCandidates,
  getSeedNearbyDestinationCandidates,
  rankDestinations,
  rankNearbyDestinations,
  scoreDestination,
} from "@/lib/discovery";

describe("destination discovery matching", () => {
  it("builds a Tokyo seed candidate without changing page entities", () => {
    const candidates = getSeedDestinationCandidates();
    const tokyo = candidates.find((candidate) => candidate.slug === "tokyo");

    expect(tokyo?.countrySlug).toBe("japan");
    expect(tokyo?.scores.food).toBeGreaterThanOrEqual(4);
    expect(tokyo?.visaRules.some((rule) => rule.citizenship === "US")).toBe(true);
    expect(tokyo?.search.tokens).toContain("tokyo");
  });

  it("scores visa-free, mild-weather, food-forward Tokyo preferences highly", () => {
    const [tokyo] = getSeedDestinationCandidates();
    const match = scoreDestination(tokyo, {
      citizenship: "US",
      tripMonths: [4, 5],
      weather: ["mild"],
      destinationTypes: ["city", "food"],
      travelStyles: ["food", "culture"],
      visaFriendliness: "visa_free",
      searchQuery: "tokyo food transit",
    });

    expect(match.score).toBeGreaterThan(75);
    expect(match.breakdown.visa).toBe(1);
    expect(match.breakdown.weather).toBeGreaterThan(0.8);
  });

  it("applies hard filters for minimum quality scores", () => {
    const ranked = rankDestinations(getSeedDestinationCandidates(), {
      minScores: { beaches: 4 },
    });

    expect(ranked).toHaveLength(0);
  });

  it("ranks nearby routes by duration, preferred mode, and tags", () => {
    const nearby = rankNearbyDestinations(getSeedNearbyDestinationCandidates(), {
      maxDurationMinutes: 150,
      preferredModes: ["limited_express", "shinkansen"],
      tags: ["mountains", "relaxation"],
    });

    expect(nearby[0]?.destination.slug).toBe("hakone");
    expect(nearby[0]?.score).toBeGreaterThan(60);
  });

  it("exposes a global country catalog without changing the Tokyo seed default", () => {
    const countries = getGlobalCountries();
    const seedCandidates = getSeedDestinationCandidates();

    expect(countries.length).toBeGreaterThan(200);
    expect(countries.some((country) => country.iso2 === "JP")).toBe(true);
    expect(seedCandidates).toHaveLength(1);
    expect(seedCandidates[0]?.slug).toBe("tokyo");
  });

  it("exposes global city summaries and discovery candidates", () => {
    const japanCities = getGlobalCities({ countryIso2: "JP", searchQuery: "Tokyo" });
    const matches = rankDestinations(
      getGlobalDestinationCandidates({
        countryIso2: "JP",
        searchQuery: "Tokyo",
        includeCountries: false,
        limit: 10,
      }),
      { searchQuery: "Tokyo Japan city" },
    );

    expect(japanCities.some((city) => city.name === "Tokyo")).toBe(true);
    expect(matches.some((match) => match.destination.name === "Tokyo")).toBe(true);
    expect(matches.every((match) => match.destination.countryIso2 === "JP")).toBe(true);
  });
});
