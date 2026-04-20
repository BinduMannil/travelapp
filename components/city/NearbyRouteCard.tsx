"use client";

import { useState } from "react";
import type { InterCityRoute } from "@/lib/data/seed";
import { PriceDisplay } from "@/lib/preferences/context";

const MODE_LABEL: Record<string, string> = {
  shinkansen: "Shinkansen",
  limited_express: "Limited express",
  jr: "JR train",
  highway_bus: "Highway bus",
  domestic_flight: "Flight",
  rental_car: "Drive",
};

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function NearbyRouteCard({ route }: { route: InterCityRoute }) {
  const [activeMode, setActiveMode] = useState(route.options[0]?.mode);
  const active = route.options.find((o) => o.mode === activeMode);

  return (
    <article className="rounded-2xl border border-washi-200 bg-white p-6 shadow-sm">
      {/* Title row — destination + single subtle visa note */}
      <header className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-sumi-900">
          {route.dest_name}
        </h2>
        {route.in_same_country && (
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-matcha-700">
            No extra visa
          </span>
        )}
      </header>

      {/* Mode tabs — only when there's more than one option */}
      {route.options.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-1 text-xs">
          {route.options.map((o) => (
            <button
              key={o.mode + o.name}
              type="button"
              onClick={() => setActiveMode(o.mode)}
              className={`rounded-full border px-2.5 py-0.5 transition ${
                activeMode === o.mode
                  ? "border-enji-400 bg-enji-50 text-enji-700"
                  : "border-washi-300 bg-white text-sumi-700 hover:border-enji-300"
              }`}
            >
              {MODE_LABEL[o.mode] ?? o.mode}
            </button>
          ))}
        </div>
      )}

      {active && (
        <>
          {/* Primary: time + price, big and scannable */}
          <div className="mt-5 flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sumi-700">
                Time
              </div>
              <div className="mt-0.5 text-xl font-semibold tabular-nums text-sumi-900">
                {formatDuration(active.duration_minutes)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sumi-700">
                Typical fare
              </div>
              <div className="mt-0.5 text-xl font-semibold tabular-nums text-sumi-900">
                <PriceDisplay
                  amountMinor={active.price_min_minor}
                  currency={active.currency}
                />
                {active.price_max_minor > active.price_min_minor && (
                  <span className="text-sm font-normal text-sumi-700">
                    {" – "}
                    <PriceDisplay
                      amountMinor={active.price_max_minor}
                      currency={active.currency}
                    />
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Secondary: operator + optional note as one quiet line */}
          <div className="mt-4 text-xs text-sumi-700">
            {active.name}
            {active.notes && <span> · {active.notes}</span>}
          </div>

          {active.booking_url && (
            <a
              href={active.booking_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-xs font-semibold text-enji-600 hover:underline"
            >
              Book →
            </a>
          )}
        </>
      )}
    </article>
  );
}
