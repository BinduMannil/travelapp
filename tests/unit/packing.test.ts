import { describe, expect, it } from "vitest";
import { applyRules, buildContext } from "@/lib/packing/engine";
import { DEFAULT_RULES } from "@/lib/packing/rules";
import { getClimate } from "@/lib/data/seed";

const TOKYO_CLIMATE = getClimate("tokyo");

function keys(items: Map<string, unknown>) {
  const out: string[] = [];
  for (const list of (items as Map<string, Array<{ key: string }>>).values()) {
    for (const item of list) out.push(item.key);
  }
  return out;
}

describe("packing engine — Tokyo scenarios", () => {
  it("March cultural 5-day solo: rain jacket, modest layer, slip-ons, no thermal base", () => {
    const ctx = buildContext(
      {
        startDate: "2026-03-20",
        endDate: "2026-03-25",
        activities: [],
        tripTypes: ["cultural", "solo"],
        adults: 1,
        children: 0,
      },
      TOKYO_CLIMATE,
    );
    expect(ctx.nights).toBe(5);
    expect(ctx.months).toEqual([3]);

    const out = applyRules(DEFAULT_RULES, ctx);
    const all = keys(out);
    expect(all).toContain("walking_shoes");
    expect(all).toContain("rain_jacket");
    expect(all).toContain("modest_layer");
    expect(all).toContain("slipon_shoes");
    expect(all).toContain("light_jacket");
    expect(all).not.toContain("thermal_base");
    expect(all).not.toContain("stroller_or_carrier");
  });

  it("August hiking 10-day: shorts, sunscreen, insect repellent, hiking shoes, daypack", () => {
    const ctx = buildContext(
      {
        startDate: "2026-08-05",
        endDate: "2026-08-15",
        activities: ["hiking"],
        tripTypes: ["adventure"],
        adults: 2,
        children: 0,
      },
      TOKYO_CLIMATE,
    );
    expect(ctx.nights).toBe(10);

    const out = applyRules(DEFAULT_RULES, ctx);
    const all = keys(out);
    expect(all).toContain("shorts");
    expect(all).toContain("sunscreen");
    expect(all).toContain("insect_repellent");
    expect(all).toContain("hiking_shoes");
    expect(all).toContain("daypack");
    expect(all).toContain("first_aid_kit"); // nights >= 5
    expect(all).not.toContain("heavy_coat");
    expect(all).not.toContain("rain_jacket"); // August isn't tsuyu
  });

  it("December family 7-day with children: warm coat, thermals, kids pack", () => {
    const ctx = buildContext(
      {
        startDate: "2026-12-23",
        endDate: "2026-12-30",
        activities: [],
        tripTypes: ["family", "cultural"],
        adults: 2,
        children: 2,
      },
      TOKYO_CLIMATE,
    );
    expect(ctx.hasChildren).toBe(true);

    const out = applyRules(DEFAULT_RULES, ctx);
    const all = keys(out);
    expect(all).toContain("heavy_coat");
    expect(all).toContain("thermal_base");
    expect(all).toContain("stroller_or_carrier");
    expect(all).toContain("kids_snacks");
    expect(all).toContain("wet_wipes");
    expect(all).not.toContain("sunscreen");
    expect(all).not.toContain("insect_repellent");
    expect(all).not.toContain("shorts");
  });

  it("quantity formulas scale with nights and party size", () => {
    const ctx = buildContext(
      {
        startDate: "2026-04-01",
        endDate: "2026-04-08",
        activities: [],
        tripTypes: ["cultural"],
        adults: 2,
        children: 1,
      },
      TOKYO_CLIMATE,
    );
    const out = applyRules(DEFAULT_RULES, ctx);
    const clothing = out.get("clothing") ?? [];
    const underwear = clothing.find((i) => i.key === "underwear");
    const socks = clothing.find((i) => i.key === "socks");
    expect(underwear?.quantity).toBe(ctx.nights + 1); // 8
    expect(socks?.quantity).toBe(ctx.nights + 1); // 8
    const shortSleeves = clothing.find((i) => i.key === "short_sleeves");
    expect(shortSleeves?.quantity).toBe(Math.ceil(ctx.nights / 2)); // 4
  });
});
