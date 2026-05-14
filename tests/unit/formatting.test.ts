import { describe, expect, it } from "vitest";
import { formatDisplayTitle } from "@/lib/ui/formatDisplayTitle";

describe("formatDisplayTitle", () => {
  it("normalizes lowercase travel suggestion labels", () => {
    expect(formatDisplayTitle(" safe cities for solo female travelers ")).toBe(
      "Safe Cities for Solo Female Travelers",
    );
    expect(formatDisplayTitle("best places to visit in Japan")).toBe(
      "Best Places to Visit in Japan",
    );
    expect(formatDisplayTitle("warm places in December")).toBe("Warm Places in December");
    expect(formatDisplayTitle("ai travel planner")).toBe("AI Travel Planner");
  });

  it("preserves acronyms and Journee brand casing", () => {
    expect(formatDisplayTitle("journee esim guide for us travelers")).toBe(
      "Journee eSIM Guide for US Travelers",
    );
  });
});
