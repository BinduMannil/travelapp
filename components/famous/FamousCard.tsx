"use client";

import { useState } from "react";
import type { FamousItem } from "@/lib/data/seed";

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

export function FamousCard({ item }: { item: FamousItem }) {
  const [expanded, setExpanded] = useState(false);
  const [imgOk, setImgOk] = useState(Boolean(item.hero_image_url));
  const kanji = item.kanji ?? "和";
  const gradient =
    PALETTE_GRADIENT[item.palette ?? "kintsugi"] ?? PALETTE_GRADIENT.kintsugi;

  return (
    <article className="group overflow-hidden rounded-2xl border border-washi-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-enji-300 hover:shadow-lg">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full items-stretch gap-0 text-left"
      >
        <div
          className={`relative w-24 shrink-0 overflow-hidden bg-gradient-to-br sm:w-32 ${gradient}`}
        >
          {imgOk && item.hero_image_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={item.hero_image_url}
              alt={item.name}
              loading="lazy"
              onError={() => setImgOk(false)}
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-display text-4xl font-bold text-white/90 drop-shadow sm:text-5xl">
              {kanji}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute left-2 top-2 rounded-full bg-black/55 px-2 py-0.5 font-display text-xs text-white backdrop-blur-sm">
            {kanji}
          </div>
        </div>

        <div className="flex-1 p-4">
          <h3 className="font-display text-base font-semibold text-sumi-900">
            {item.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sumi-800">{item.why}</p>
          <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-enji-600">
            {expanded ? "Tap to collapse ▴" : "Tap for where to find it ▾"}
          </div>
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-washi-200 px-4 py-3">
            <p className="text-sumi-900">{item.why}</p>
            {item.where_to_buy && (
              <p className="mt-3 text-sumi-800">
                <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-700">
                  Where
                </span>
                {item.where_to_buy}
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
