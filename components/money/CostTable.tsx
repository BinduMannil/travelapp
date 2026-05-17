"use client";

import type { PriceItem } from "@/lib/data/seed";
import { PriceDisplay, usePreferences } from "@/lib/preferences/context";

const SIGNAL_KEYS = ["meal_casual", "metro_ticket", "sim_7d"];

const GROUPS: Array<{ title: string; keys: string[] }> = [
  {
    title: "Daily Basics",
    keys: ["coffee", "water_bottle", "meal_casual", "meal_mid", "beer"],
  },
  {
    title: "Moving Around",
    keys: ["metro_ticket", "taxi_base", "taxi_per_km"],
  },
  {
    title: "Trip Utilities",
    keys: ["sim_7d", "sim_30d", "coin_locker_day", "museum_entry"],
  },
];

export function CostTable({ items }: { items: PriceItem[] }) {
  const { currency } = usePreferences();
  const byKey = new Map(items.map((item) => [item.key, item]));
  const signals = SIGNAL_KEYS.map((key) => byKey.get(key)).filter(
    Boolean,
  ) as PriceItem[];

  return (
    <div className="space-y-10">
      {signals.length > 0 && (
        <section className="grid gap-4 md:grid-cols-3">
          {signals.map((item) => (
            <article
              key={item.key}
              className="rounded-[1.25rem] border border-white/14 bg-black/28 p-5 text-white shadow-editorial-deep backdrop-blur-sm"
            >
              <p className="luxury-kicker text-kintsugi-300">
                Cost Signal
              </p>
              <h2 className="mt-4 font-sans text-4xl font-semibold leading-none">
                <PriceDisplay
                  amountMinor={item.amount_minor}
                  currency={item.currency}
                />
              </h2>
              <p className="mt-3 text-sm font-semibold text-white/88">
                {item.label}
              </p>
              {item.notes && (
                <p className="mt-2 text-xs leading-6 text-white/62">
                  {item.notes}
                </p>
              )}
            </article>
          ))}
        </section>
      )}

      <section className="overflow-hidden rounded-[1.35rem] border border-white/14 bg-[linear-gradient(180deg,rgba(255,253,246,.99),rgba(247,240,225,.97))] shadow-editorial-deep">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sumi-900/10 px-5 py-4 sm:px-6">
          <p className="luxury-kicker text-enji-600">Price Index</p>
          <span className="rounded-full bg-sumi-900 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-washi-50">
            Displayed in {currency.toUpperCase()}
          </span>
        </div>
        <div className="divide-y divide-sumi-900/10">
          {GROUPS.map((group) => {
            const groupItems = group.keys
              .map((key) => byKey.get(key))
              .filter(Boolean) as PriceItem[];
            if (groupItems.length === 0) return null;

            return (
              <div key={group.title} className="grid lg:grid-cols-[14rem_1fr]">
                <div className="border-b border-sumi-900/10 bg-sumi-900/[0.035] px-5 py-5 lg:border-b-0 lg:border-r sm:px-6">
                  <h3 className="font-sans text-2xl font-semibold text-sumi-900">
                    {group.title}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-sumi-700">
                    Typical central Tokyo traveler prices.
                  </p>
                </div>
                <div className="divide-y divide-sumi-900/10">
                  {groupItems.map((it) => (
                    <div
                      key={it.key}
                      className="grid gap-3 px-5 py-4 sm:grid-cols-[minmax(12rem,1fr)_8rem_minmax(16rem,1.35fr)] sm:items-start sm:px-6"
                    >
                      <div className="font-semibold text-sumi-900">
                        {it.label}
                      </div>
                      <div className="tabular-nums text-sumi-900 sm:text-right">
                        <PriceDisplay
                          amountMinor={it.amount_minor}
                          currency={it.currency}
                        />
                      </div>
                      <div className="text-sm leading-6 text-sumi-700">
                        {it.notes ?? ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
