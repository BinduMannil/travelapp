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
  { slug: "onsen", label: "Onsen / Hot Springs" },
  { slug: "pool", label: "Pool / Beach" },
  { slug: "vegan", label: "Vegan / Vegetarian Diet" },
  { slug: "halal", label: "Halal Diet" },
  { slug: "gluten_free", label: "Gluten-Free Diet" },
  { slug: "allergy", label: "Other Food Allergy" },
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
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[24rem_minmax(0,1fr)] lg:items-start">
      <form className="rounded-[1.35rem] border border-white/14 bg-[linear-gradient(180deg,rgba(255,253,246,.99),rgba(247,240,225,.96))] p-6 shadow-editorial-deep">
        <div className="mb-6 border-b border-sumi-900/10 pb-5">
          <p className="luxury-kicker text-enji-600">PLANNER</p>
          <h2 className="mt-2 font-sans text-3xl font-semibold leading-tight text-sumi-900">
            Tell Journee the shape of the trip.
          </h2>
        </div>

        <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-sumi-700">
              Arrive
            </span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 w-full rounded-md border border-washi-300 bg-white px-2 py-1.5 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-sumi-700">
              Depart
            </span>
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 w-full rounded-md border border-washi-300 bg-white px-2 py-1.5 text-sm"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-sumi-700">
              Adults
            </span>
            <input
              type="number"
              min={1}
              max={10}
              value={adults}
              onChange={(e) => setAdults(Math.max(1, Number(e.target.value)))}
              className="mt-1 w-full rounded-md border border-washi-300 bg-white px-2 py-1.5 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-sumi-700">
              Children
            </span>
            <input
              type="number"
              min={0}
              max={10}
              value={children}
              onChange={(e) => setChildren(Math.max(0, Number(e.target.value)))}
              className="mt-1 w-full rounded-md border border-washi-300 bg-white px-2 py-1.5 text-sm"
            />
          </label>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-sumi-700">
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
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-sumi-700">
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
        </div>
      </form>

      <section className="min-w-0">
        {result ? (
          <PackingOutput items={result.items} ctx={result.ctx} />
        ) : (
          <p className="rounded-lg border border-dashed border-washi-300 p-6 text-sm text-sumi-700">
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
    <div className="rounded-[1.35rem] border border-white/14 bg-black/22 p-5 shadow-editorial-deep backdrop-blur-sm sm:p-6">
      <header className="grid gap-4 border-b border-white/12 pb-5 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="luxury-kicker text-kintsugi-300">Live list</p>
          <h2 className="mt-2 font-sans text-3xl font-semibold text-white">
            {ctx.nights} nights · {totalCount} items
          </h2>
          <p className="mt-2 text-sm leading-7 text-white/72">
            Averages {ctx.tempCMax.toFixed(0)}° / {ctx.tempCMin.toFixed(0)}°C ·
            expected precipitation {ctx.precipMm.toFixed(0)} mm
          </p>
        </div>
        <div className="rounded-full bg-kintsugi-300 px-4 py-2 text-sm font-bold text-sumi-900">
          {essentialCount} essential
        </div>
      </header>

      <div className="mt-6 space-y-8">
        {CATEGORY_ORDER.map((cat) => {
          const list = items.get(cat);
          if (!list || list.length === 0) return null;
          return (
            <section key={cat}>
              <div className="flex items-center justify-between gap-4">
                <h3 className="luxury-kicker text-kintsugi-300">
                  {CATEGORY_LABEL[cat]}
                </h3>
                <span className="text-xs font-semibold text-white/54">
                  {list.length} items
                </span>
              </div>
              <ul className="mt-3 divide-y divide-sumi-900/10 overflow-hidden rounded-[1.1rem] border border-sumi-900/10 bg-[linear-gradient(180deg,rgba(255,253,246,.99),rgba(246,239,224,.97))]">
                {list.map((item) => (
                  <li
                    key={item.key}
                    className="p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 text-sm font-semibold text-sumi-900">
                        {item.quantity > 1 && (
                          <span className="mr-1 tabular-nums text-sumi-700">
                            {item.quantity}×
                          </span>
                        )}
                        {item.label}
                      </div>
                      {item.essential && (
                        <span className="shrink-0 rounded-full bg-rose-50 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-rose-800">
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
