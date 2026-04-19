// Packing engine: evaluates a list of rules against a trip context and
// returns the items the traveler should pack, grouped by category.
//
// The rules themselves are stored as structured JSON (see ./rules.ts) so
// they can later move into Postgres without changing the engine.

import type { ClimateRow } from "@/lib/data/seed";

export type Predicate =
  | { temp_c_max_gte: number }
  | { temp_c_max_lt: number }
  | { temp_c_min_lt: number }
  | { precip_mm_gte: number }
  | { humidity_pct_gte: number }
  | { month_in: number[] }
  | { activity: string }
  | { trip_type: string }
  | { has_children: true }
  | { nights_min: number }
  | { any: Predicate[] }
  | { all: Predicate[] }
  | { not: Predicate };

export type Quantity =
  | { const: number }
  | { nights_plus: number }
  | { nights_div_ceil: number }
  | { per_person: number }
  | { per_adult: number }
  | { per_child: number };

export type Category =
  | "docs"
  | "clothing"
  | "tech"
  | "toiletries"
  | "health"
  | "kids"
  | "activity"
  | "japan";

export type Rule = {
  key: string;
  label: string;
  category: Category;
  essential: boolean;
  conditions: Predicate | null;
  quantity?: Quantity;
  notes?: string;
};

export type PackingInput = {
  startDate: string; // YYYY-MM-DD
  endDate: string;
  activities: string[];
  tripTypes: string[];
  adults: number;
  children: number;
};

export type TripContext = {
  nights: number;
  months: number[];
  tempCMax: number;
  tempCMin: number;
  precipMm: number;
  humidityPct: number;
  activities: Set<string>;
  tripTypes: Set<string>;
  adults: number;
  children: number;
  hasChildren: boolean;
};

export type PackingItem = {
  key: string;
  label: string;
  category: Category;
  essential: boolean;
  quantity: number;
  notes?: string;
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Walks every date in the range and collects the distinct months touched
// plus average highs/lows and summed precipitation from the climate rows.
export function buildContext(
  input: PackingInput,
  climate: ClimateRow[],
): TripContext {
  const start = new Date(input.startDate + "T00:00:00Z");
  const end = new Date(input.endDate + "T00:00:00Z");
  const nights = Math.max(
    1,
    Math.round((end.getTime() - start.getTime()) / MS_PER_DAY),
  );
  const byMonth = new Map<number, ClimateRow>(
    climate.map((r) => [r.month, r]),
  );
  const monthSet = new Set<number>();
  let highSum = 0;
  let lowSum = 0;
  let precipTotal = 0;
  let humiditySum = 0;
  let days = 0;

  for (
    let d = new Date(start);
    d <= end;
    d = new Date(d.getTime() + MS_PER_DAY)
  ) {
    const m = d.getUTCMonth() + 1;
    monthSet.add(m);
    const row = byMonth.get(m);
    if (row) {
      highSum += row.avg_high_c;
      lowSum += row.avg_low_c;
      // precip_mm in climate rows is the whole-month total; approximate
      // the fraction of the month we're staying by days-in-month.
      const daysInMonth = new Date(
        Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0),
      ).getUTCDate();
      precipTotal += row.precip_mm / daysInMonth;
      humiditySum += row.humidity_pct;
      days += 1;
    }
  }

  return {
    nights,
    months: Array.from(monthSet).sort((a, b) => a - b),
    tempCMax: days ? highSum / days : 20,
    tempCMin: days ? lowSum / days : 15,
    precipMm: precipTotal,
    humidityPct: days ? humiditySum / days : 60,
    activities: new Set(input.activities),
    tripTypes: new Set(input.tripTypes),
    adults: input.adults,
    children: input.children,
    hasChildren: input.children > 0,
  };
}

export function evaluate(pred: Predicate, ctx: TripContext): boolean {
  if ("any" in pred) return pred.any.some((p) => evaluate(p, ctx));
  if ("all" in pred) return pred.all.every((p) => evaluate(p, ctx));
  if ("not" in pred) return !evaluate(pred.not, ctx);
  if ("temp_c_max_gte" in pred) return ctx.tempCMax >= pred.temp_c_max_gte;
  if ("temp_c_max_lt" in pred) return ctx.tempCMax < pred.temp_c_max_lt;
  if ("temp_c_min_lt" in pred) return ctx.tempCMin < pred.temp_c_min_lt;
  if ("precip_mm_gte" in pred) return ctx.precipMm >= pred.precip_mm_gte;
  if ("humidity_pct_gte" in pred)
    return ctx.humidityPct >= pred.humidity_pct_gte;
  if ("month_in" in pred) return pred.month_in.some((m) => ctx.months.includes(m));
  if ("activity" in pred) return ctx.activities.has(pred.activity);
  if ("trip_type" in pred) return ctx.tripTypes.has(pred.trip_type);
  if ("has_children" in pred) return ctx.hasChildren;
  if ("nights_min" in pred) return ctx.nights >= pred.nights_min;
  return false;
}

export function computeQuantity(
  q: Quantity | undefined,
  ctx: TripContext,
): number {
  if (!q) return 1;
  if ("const" in q) return q.const;
  if ("nights_plus" in q) return ctx.nights + q.nights_plus;
  if ("nights_div_ceil" in q)
    return Math.max(1, Math.ceil(ctx.nights / q.nights_div_ceil));
  if ("per_person" in q) return (ctx.adults + ctx.children) * q.per_person;
  if ("per_adult" in q) return ctx.adults * q.per_adult;
  if ("per_child" in q) return ctx.children * q.per_child;
  return 1;
}

export function applyRules(
  rules: Rule[],
  ctx: TripContext,
): Map<Category, PackingItem[]> {
  const out = new Map<Category, PackingItem[]>();
  for (const r of rules) {
    if (r.conditions !== null && !evaluate(r.conditions, ctx)) continue;
    const quantity = computeQuantity(r.quantity, ctx);
    const item: PackingItem = {
      key: r.key,
      label: r.label,
      category: r.category,
      essential: r.essential,
      quantity,
      notes: r.notes,
    };
    const list = out.get(r.category) ?? [];
    list.push(item);
    out.set(r.category, list);
  }
  for (const items of out.values()) {
    items.sort((a, b) => {
      if (a.essential !== b.essential) return a.essential ? -1 : 1;
      return a.label.localeCompare(b.label);
    });
  }
  return out;
}

export const CATEGORY_LABEL: Record<Category, string> = {
  docs: "Documents",
  clothing: "Clothing",
  tech: "Tech",
  toiletries: "Toiletries",
  health: "Health",
  kids: "For the kids",
  activity: "Activity gear",
  japan: "Japan-specific",
};

export const CATEGORY_ORDER: Category[] = [
  "docs",
  "clothing",
  "tech",
  "toiletries",
  "health",
  "kids",
  "activity",
  "japan",
];
