"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dish } from "@/lib/data/seed";
import { ImageCarousel } from "@/components/common/ImageCarousel";

const KANJI_BY_SLUG: Record<string, string> = {
  sushi: "鮨",
  ramen: "麺",
  tempura: "天",
  tonkatsu: "豚",
  yakitori: "串",
  okonomiyaki: "好",
  takoyaki: "蛸",
  soba: "蕎",
  udon: "饂",
  kaiseki: "懐",
  wagyu: "牛",
  matcha: "抹",
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

export function DishCard({
  dish,
  countryName,
}: {
  dish: Dish;
  countryName: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [allFailed, setAllFailed] = useState(false);
  const kanji = KANJI_BY_SLUG[dish.slug] ?? "食";
  const gradient = PALETTE_GRADIENT[dish.palette ?? "enji"] ?? PALETTE_GRADIENT.enji;
  const images = (dish.hero_image_urls ?? []).length > 0
    ? dish.hero_image_urls!
    : dish.hero_image_url
      ? [dish.hero_image_url]
      : [];

  return (
    <article
      id={dish.slug}
      className="group overflow-hidden rounded-2xl border border-washi-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-enji-300 hover:shadow-lg"
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={`dish-body-${dish.slug}`}
        className="flex w-full items-stretch gap-0 text-left"
      >
        {/* Hero image (or kanji fallback) */}
        <div
          className={`relative w-28 shrink-0 overflow-hidden bg-gradient-to-br sm:w-40 ${gradient}`}
        >
          {images.length > 0 && !allFailed ? (
            <ImageCarousel
              images={images}
              alt={dish.name}
              className="absolute inset-0 h-full w-full"
              onAllFailed={() => setAllFailed(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-display text-5xl font-bold text-white/90 drop-shadow sm:text-6xl">
              {kanji}
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute left-2 top-2 rounded-full bg-black/55 px-2 py-0.5 font-display text-sm text-white backdrop-blur-sm">
            {kanji}
          </div>
        </div>

        {/* Header / always-visible summary */}
        <div className="flex-1 p-4 sm:p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h2 className="font-display text-lg font-semibold text-sumi-900">
                {dish.name}{" "}
                <span className="font-display text-sumi-700">
                  {dish.native_script}
                </span>
              </h2>
              <div className="text-[11px] uppercase tracking-[0.2em] text-sumi-700">
                <em>{dish.romaji}</em>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
              {dish.originated_here && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 font-medium text-amber-900">
                  Originated in {countryName}
                </span>
              )}
              {dish.vegan_version && (
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-medium text-emerald-900">
                  Vegan possible
                </span>
              )}
            </div>
          </div>

          <p className="mt-2 line-clamp-2 text-sumi-800 sm:text-[0.9rem]">
            {dish.made_of}
          </p>

          <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-enji-600">
            <span>{expanded ? "Tap to collapse" : "Tap to see more"}</span>
            <span
              aria-hidden
              className={`inline-block transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </div>
        </div>
      </button>

      {/* Expandable body */}
      <div
        id={`dish-body-${dish.slug}`}
        className={`grid transition-all duration-300 ease-out ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-washi-200 px-4 py-4 sm:px-5 sm:py-5">
            <Row label="Origin">{dish.origin}</Row>
            {dish.similar_to.length > 0 && (
              <Row label="Similar to">{dish.similar_to.join(" · ")}</Row>
            )}
            <Row label="How to try it">{dish.must_try_form}</Row>
            {dish.vegan_version && dish.vegan_notes && (
              <Row label="Vegan/vegetarian" accent="emerald">
                {dish.vegan_notes}
              </Row>
            )}

            {dish.where_in_tokyo && dish.where_in_tokyo.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[11px] uppercase tracking-[0.2em] text-sumi-700">
                  Try in Tokyo
                </span>
                {dish.where_in_tokyo.map((r) => (
                  <Link
                    key={r}
                    href={`/city/tokyo/restaurants/${r}`}
                    className="rounded-full bg-brand-100 px-2.5 py-1 font-medium text-brand-800 transition hover:bg-brand-200"
                  >
                    {r.replace(/-/g, " ")} →
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function Row({
  label,
  children,
  accent,
}: {
  label: string;
  children: React.ReactNode;
  accent?: "emerald";
}) {
  const labelClass =
    accent === "emerald" ? "text-emerald-700" : "text-sumi-700";
  const bodyClass =
    accent === "emerald" ? "text-emerald-900" : "text-sumi-900";
  return (
    <div className="mt-2 first:mt-0">
      <span
        className={`mr-2 text-[11px] font-semibold uppercase tracking-[0.2em] ${labelClass}`}
      >
        {label}
      </span>
      <span className={bodyClass}>{children}</span>
    </div>
  );
}
