"use client";

import { useMemo, useState } from "react";
import {
  applyRules,
  buildContext,
  CATEGORY_LABEL,
  CATEGORY_ORDER,
  type Rule,
  type PackingItem,
} from "@/lib/packing/engine";
import type { ClimateRow } from "@/lib/data/seed";

const TRIP_TYPES: Array<{ slug: string; label: string }> = [
  { slug: "cultural", label: "Cultural" },
  { slug: "food", label: "Food" },
  { slug: "adventure", label: "Adventure" },
  { slug: "family", label: "Family" },
  { slug: "luxury", label: "Luxury" },
  { slug: "budget", label: "Budget" },
  { slug: "solo", label: "Solo" },
  { slug: "couple", label: "Couple" },
];

const ACTIVITIES: Array<{ slug: string; label: string }> = [
  { slug: "hiking", label: "Hiking / Mt. Takao" },
  { slug: "onsen", label: "Onsen / hot springs" },
  { slug: "pool", label: "Pool / beach" },
  { slug: "vegan", label: "Vegan / vegetarian diet" },
  { slug: "halal", label: "Halal diet" },
  { slug: "gluten_free", label: "Gluten-free diet" },
  { slug: "allergy", label: "Other food allergy" },
];

function todayPlus(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function PackingPlanner({
  climate,
  rules,
}: {
  climate: ClimateRow[];
  rules: Rule[];
}) {
  const [startDate, setStartDate] = useState(todayPlus(30));
  const [endDate, setEndDate] = useState(todayPlus(37));
  const [tripTypes, setTripTypes] = useState<string[]>(["cultural"]);
  const [activities, setActivities] = useState<string[]>([]);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const result = useMemo(() => {
    try {
      const ctx = buildContext(
        { startDate, endDate, activities, tripTypes, adults, children },
        climate,
      );
      const items = applyRules(rules, ctx);
      return { ctx, items };
    } catch {
      return null;
    }
  }, [startDate, endDate, activities, tripTypes, adults, children, climate, rules]);

  function toggle(list: string[], setter: (v: string[]) => void, value: string) {
    if (list.includes(value)) setter(list.filter((v) => v !== value));
    else setter([...list, value]);
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[360px_1fr]">
      <form className="space-y-5 rounded-lg border border-washi-200 bg-washi-100 p-5">
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-sumi-700">
              Arrive
            </span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-sumi-700">
              Depart
            </span>
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-sumi-700">
              Adults
            </span>
            <input
              type="number"
              min={1}
              max={10}
              value={adults}
              onChange={(e) => setAdults(Math.max(1, Number(e.target.value)))}
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-sumi-700">
              Children
            </span>
            <input
              type="number"
              min={0}
              max={10}
              value={children}
              onChange={(e) => setChildren(Math.max(0, Number(e.target.value)))}
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm"
            />
          </label>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-sumi-700">
            Trip style
          </span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {TRIP_TYPES.map((t) => (
              <button
                key={t.slug}
                type="button"
                onClick={() => toggle(tripTypes, setTripTypes, t.slug)}
                className={`rounded-full border px-2.5 py-1 text-xs ${
                  tripTypes.includes(t.slug)
                    ? "border-brand-500 bg-brand-50 text-brand-800"
                    : "border-washi-200 bg-white text-sumi-800"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-sumi-700">
            Planned activities
          </span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {ACTIVITIES.map((a) => (
              <button
                key={a.slug}
                type="button"
                onClick={() => toggle(activities, setActivities, a.slug)}
                className={`rounded-full border px-2.5 py-1 text-xs ${
                  activities.includes(a.slug)
                    ? "border-brand-500 bg-brand-50 text-brand-800"
                    : "border-washi-200 bg-white text-sumi-800"
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </form>

      <section>
        {result ? (
          <PackingOutput items={result.items} ctx={result.ctx} />
        ) : (
          <p className="rounded-lg border border-dashed border-slate-300 p-6 text-sm text-sumi-700">
            Check your dates and try again.
          </p>
        )}
      </section>
    </div>
  );
}

function PackingOutput({
  items,
  ctx,
}: {
  items: Map<string, PackingItem[]>;
  ctx: ReturnType<typeof buildContext>;
}) {
  const totalCount = Array.from(items.values()).reduce(
    (acc, list) => acc + list.length,
    0,
  );
  const essentialCount = Array.from(items.values()).reduce(
    (acc, list) => acc + list.filter((i) => i.essential).length,
    0,
  );

  return (
    <div>
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div className="text-sm text-sumi-700">
          <strong className="text-sumi-900">{ctx.nights}</strong> nights ·
          averages{" "}
          <strong className="text-sumi-900">
            {ctx.tempCMax.toFixed(0)}° / {ctx.tempCMin.toFixed(0)}°C
          </strong>{" "}
          · expected precipitation{" "}
          <strong className="text-sumi-900">
            {ctx.precipMm.toFixed(0)} mm
          </strong>
        </div>
        <div className="text-xs text-sumi-700">
          {totalCount} items ({essentialCount} essential)
        </div>
      </header>

      <div className="mt-4 space-y-6">
        {CATEGORY_ORDER.map((cat) => {
          const list = items.get(cat);
          if (!list || list.length === 0) return null;
          return (
            <section key={cat}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-sumi-700">
                {CATEGORY_LABEL[cat]}
              </h3>
              <ul className="mt-2 space-y-2">
                {list.map((item) => (
                  <li
                    key={item.key}
                    className="rounded-md border border-washi-200 bg-white p-3"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="text-sm font-medium">
                        {item.quantity > 1 && (
                          <span className="mr-1 tabular-nums text-sumi-700">
                            {item.quantity}×
                          </span>
                        )}
                        {item.label}
                      </div>
                      {item.essential && (
                        <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-rose-800">
                          Essential
                        </span>
                      )}
                    </div>
                    {item.notes && (
                      <p className="mt-1 text-xs text-sumi-700">
                        {item.notes}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
