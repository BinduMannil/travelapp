"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Attraction } from "@/lib/data/seed";
import { attractionCover } from "@/components/common/CoverTile";

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

/**
 * Magazine-style hero:
 *  - Full-bleed featured attraction in the background (gradient + kanji
 *    ghost if no photo; a subtle zoom + pan loop creates motion).
 *  - Cinematic left column: "Discover" kicker, large Montserrat title,
 *    short lede, and Explore button.
 *  - Right column: horizontal card carousel for the next ~6 attractions.
 *    Arrow-key support + prev/next buttons + dot strip.
 */
export function AttractionHeroCarousel({
  citySlug,
  cityName,
  attractions,
  lede,
}: {
  citySlug: string;
  cityName: string;
  attractions: Attraction[];
  lede: string;
}) {
  const picks = useMemo(() => attractions.slice(0, 7), [attractions]);
  const [index, setIndex] = useState(0);
  const active = picks[index] ?? picks[0];

  // Keyboard left/right to navigate.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % picks.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + picks.length) % picks.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [picks.length]);

  if (!active) return null;

  const activeCover = attractionCover(active.category);

  return (
    <section className="relative isolate overflow-hidden bg-sumi-900 text-washi-50">
      {/* Background — changes with active card. Crossfades via opacity. */}
      <div className="absolute inset-0 -z-10">
        {picks.map((a, i) => {
          const cover = attractionCover(a.category);
          const g = PALETTE_GRADIENT[cover.palette] ?? PALETTE_GRADIENT.sumi;
          return (
            <div
              key={a.slug}
              className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-1000 ${g} ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden
            />
          );
        })}
        {/* seigaiha wave texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 100%, rgba(255,255,255,.85) 0 26%, transparent 27%), radial-gradient(circle at 0% 100%, rgba(255,255,255,.85) 0 26%, transparent 27%), radial-gradient(circle at 100% 100%, rgba(255,255,255,.85) 0 26%, transparent 27%)",
            backgroundSize: "64px 32px",
          }}
          aria-hidden
        />
        {/* radial glow */}
        <div
          className="absolute inset-0 opacity-70 mix-blend-screen"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(234,186,89,.3), transparent 45%), radial-gradient(circle at 80% 80%, rgba(46,79,115,.35), transparent 55%)",
          }}
          aria-hidden
        />
        {/* giant ghost kanji behind */}
        <div
          key={`ghost-${active.slug}`}
          className="pointer-events-none absolute -right-24 -bottom-32 select-none font-sans text-[min(60vw,520px)] font-bold leading-none text-washi-50/[0.06] drop-shadow-xl transition-transform duration-[4000ms] sm:-right-16"
          aria-hidden
          style={{
            animation: "heroDrift 14s ease-in-out infinite alternate",
          }}
        >
          {activeCover.kanji}
        </div>
      </div>

      {/* Local keyframes */}
      <style jsx>{`
        @keyframes heroDrift {
          0% {
            transform: translate3d(0, 0, 0) rotate(-4deg);
          }
          100% {
            transform: translate3d(-24px, -18px, 0) rotate(2deg);
          }
        }
      `}</style>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 pb-20 pt-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-8">
        {/* LEFT — editorial block */}
        <div className="relative">
          {/* Vertical scroll rule + progress */}
          <div className="absolute left-[-20px] top-0 hidden h-full w-[2px] bg-washi-50/15 sm:block">
            <div
              className="w-[2px] bg-kintsugi-300 transition-all duration-500"
              style={{
                height: `${((index + 1) / picks.length) * 100}%`,
              }}
            />
          </div>

          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-washi-50/70">
            Discover
          </p>
          <h1 className="mt-3 font-sans text-[clamp(2.75rem,8vw,6rem)] font-bold uppercase leading-[0.88] tracking-tight text-washi-50">
            {active.name}
          </h1>
          <div className="mt-2 font-sans text-3xl italic text-kintsugi-300 sm:text-4xl">
            {cityName.toLowerCase()}
          </div>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-washi-50/80 sm:text-base">
            {active.summary || lede}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Link
              href={`/city/${citySlug}/attractions/${active.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-washi-50 px-6 py-2.5 text-sm font-semibold text-sumi-900 transition hover:bg-kintsugi-300"
            >
              Explore
              <span aria-hidden className="text-base">→</span>
            </Link>
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-washi-50/60">
              {String(index + 1).padStart(2, "0")}{" "}
              <span className="text-washi-50/30">
                / {String(picks.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT — horizontal card fan */}
        <div>
          <div className="relative overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(calc(50% - ${index * 192 + 96}px))`,
              }}
            >
              {picks.map((a, i) => {
                const cover = attractionCover(a.category);
                const g = PALETTE_GRADIENT[cover.palette] ?? PALETTE_GRADIENT.sumi;
                const isActive = i === index;
                return (
                  <button
                    key={a.slug}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show ${a.name}`}
                    className={`group relative block h-64 w-44 shrink-0 overflow-hidden rounded-2xl ring-1 transition duration-500 sm:h-72 sm:w-48 ${
                      isActive
                        ? "scale-105 ring-kintsugi-300 shadow-2xl"
                        : "scale-95 opacity-80 ring-washi-50/20 hover:opacity-100"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${g}`}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 flex items-center justify-center font-sans text-[6rem] font-bold text-white/25"
                      aria-hidden
                    >
                      {cover.kanji}
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <div className="absolute inset-x-3 bottom-3 text-left">
                      <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-washi-50/75">
                        {a.neighborhood}
                      </div>
                      <div className="mt-1 font-sans text-sm font-semibold leading-tight text-washi-50">
                        {a.name}
                      </div>
                    </div>
                    {a.importance >= 4 && (
                      <span className="absolute right-3 top-3 rounded-full bg-kintsugi-300/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-sumi-900">
                        Top pick
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls — prev / dots / next */}
          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous"
              onClick={() =>
                setIndex((i) => (i - 1 + picks.length) % picks.length)
              }
              className="grid h-9 w-9 place-items-center rounded-full border border-washi-50/30 text-washi-50 transition hover:border-kintsugi-300 hover:text-kintsugi-300"
            >
              ←
            </button>
            <div className="flex items-center gap-1.5">
              {picks.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index
                      ? "w-6 bg-kintsugi-300"
                      : "w-1.5 bg-washi-50/30 hover:bg-washi-50/60"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next"
              onClick={() => setIndex((i) => (i + 1) % picks.length)}
              className="grid h-9 w-9 place-items-center rounded-full border border-washi-50/30 text-washi-50 transition hover:border-kintsugi-300 hover:text-kintsugi-300"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom corner watermark */}
      <div className="absolute bottom-4 left-6 text-[10px] font-semibold uppercase tracking-[0.12em] text-washi-50/40">
        Journee · {cityName}
      </div>
    </section>
  );
}
