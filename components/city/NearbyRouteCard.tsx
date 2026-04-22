"use client";

import { useState } from "react";
import type { InterCityRoute } from "@/lib/data/seed";
import { PriceDisplay } from "@/lib/preferences/context";
import { ImageCarousel } from "@/components/common/ImageCarousel";

const MODE_LABEL: Record<string, string> = {
  shinkansen: "Shinkansen",
  limited_express: "Limited express",
  jr: "JR train",
  highway_bus: "Highway bus",
  domestic_flight: "Flight",
  rental_car: "Drive",
};

const PALETTE_GRADIENT: Record<string, string> = {
  enji: "from-enji-500 via-enji-700 to-sumi-900",
  aizome: "from-aizome-500 via-aizome-700 to-sumi-900",
  sakura: "from-sakura-300 via-sakura-400 to-enji-700",
  matcha: "from-matcha-500 via-matcha-700 to-sumi-900",
  kintsugi: "from-kintsugi-300 via-kintsugi-500 to-enji-700",
  sumi: "from-sumi-700 via-sumi-900 to-black",
  ume: "from-sakura-400 via-enji-600 to-enji-900",
  ocean: "from-aizome-400 via-aizome-700 to-sumi-900",
  forest: "from-matcha-500 via-matcha-700 to-aizome-900",
};

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

/**
 * Nearby-route card: a coloured destination tile with an optional photo
 * carousel, kanji ghost, and a mode tab strip. Switching modes fades the
 * time + fare values through an opacity/translate transition so the
 * numbers animate in instead of jumping.
 */
export function NearbyRouteCard({ route }: { route: InterCityRoute }) {
  const [activeMode, setActiveMode] = useState(route.options[0]?.mode);
  const [imgFailed, setImgFailed] = useState(false);
  const active = route.options.find((o) => o.mode === activeMode);

  const gradient =
    PALETTE_GRADIENT[route.palette ?? "sumi"] ?? PALETTE_GRADIENT.sumi;
  const images = route.hero_image_urls ?? [];
  const kanji = route.kanji ?? "市";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl text-washi-50 shadow-xl transition-transform duration-500 hover:-translate-y-1">
      {/* Background layers — gradient wash, optional photo carousel,
          dark overlay for legibility, and a drifting kanji ghost. */}
      <div className="absolute inset-0 -z-10">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
          aria-hidden
        />
        {images.length > 0 && !imgFailed && (
          <ImageCarousel
            images={images}
            alt={route.dest_name}
            className="absolute inset-0 h-full w-full opacity-50 mix-blend-luminosity"
            onAllFailed={() => setImgFailed(true)}
          />
        )}
        <div className="absolute inset-0 bg-sumi-900/55" aria-hidden />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-4 -top-8 select-none font-display text-[10rem] font-bold leading-none text-washi-50/[0.08] drop-shadow transition-transform duration-700 group-hover:-translate-x-3 group-hover:translate-y-1 group-hover:rotate-[-4deg]"
        >
          {kanji}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <header className="flex items-baseline justify-between gap-3">
          <h2 className="text-3xl font-semibold tracking-tight text-washi-50">
            {route.dest_name}
          </h2>
          {route.in_same_country && (
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-matcha-400">
              No extra visa
            </span>
          )}
        </header>

        {route.options.length > 1 && (
          <div className="mt-4 flex flex-wrap gap-1.5 text-[11px]">
            {route.options.map((o) => {
              const on = o.mode === activeMode;
              return (
                <button
                  key={o.mode + o.name}
                  type="button"
                  onClick={() => setActiveMode(o.mode)}
                  className={`rounded-full border px-3 py-0.5 transition ${
                    on
                      ? "border-kintsugi-300 bg-kintsugi-300/20 text-kintsugi-200"
                      : "border-washi-50/30 text-washi-50/75 hover:border-kintsugi-300 hover:text-kintsugi-200"
                  }`}
                >
                  {MODE_LABEL[o.mode] ?? o.mode}
                </button>
              );
            })}
          </div>
        )}

        {active && (
          <div
            key={active.mode}
            className="mt-6 flex flex-1 flex-col animate-[fadeUp_350ms_ease-out_both]"
          >
            <style>{`
              @keyframes fadeUp {
                from { opacity: 0; transform: translateY(6px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-washi-50/65">
                  Time
                </div>
                <div className="mt-0.5 text-2xl font-semibold tabular-nums text-washi-50">
                  {formatDuration(active.duration_minutes)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-washi-50/65">
                  Typical fare
                </div>
                <div className="mt-0.5 text-2xl font-semibold tabular-nums text-washi-50">
                  <PriceDisplay
                    amountMinor={active.price_min_minor}
                    currency={active.currency}
                  />
                  {active.price_max_minor > active.price_min_minor && (
                    <span className="text-sm font-normal text-washi-50/70">
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

            <div className="mt-3 flex-1 text-xs leading-snug text-washi-50/75">
              {active.name}
              {active.notes && <span> · {active.notes}</span>}
            </div>

            {active.booking_url && (
              <a
                href={active.booking_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 self-start text-xs font-semibold uppercase tracking-[0.22em] text-kintsugi-300 transition hover:text-kintsugi-200"
              >
                Book
                <span aria-hidden>→</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
