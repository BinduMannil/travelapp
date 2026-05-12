"use client";

import { useEffect, useMemo, useState } from "react";

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

export type BubbleItem = {
  slug: string;
  title: string;
  subtitle: string;
  kanji: string;
  palette: string;
  images?: string[];
};

/**
 * Vertical-bubble hero — mirrors the "Mount Batur / Uluwatu / Tanah Lot"
 * reference. One active bubble is large and centred; two bubbles above
 * and two below render smaller and dimmer. Labels sit to the left of
 * each. A vertical dot rail on the right shows position.
 *
 * Behaviour:
 *  - Tap any satellite bubble → promotes it to the centre.
 *  - Arrow up / down (when the hero is focused) cycles through.
 *  - Tap the active bubble → calls `onSelect` with its slug so the
 *    host page can scroll the category into view.
 *  - Background mirrors the active item's gradient; all bubbles use
 *    image carousels when URLs are provided, kanji fallback otherwise.
 */
export function ShoppingBubbleHero({
  items,
  onSelect,
}: {
  items: BubbleItem[];
  /** Called when the centre bubble is tapped. Defaults to smooth-scrolling
   *  to `#cat-<slug>` on the same page. */
  onSelect?: (slug: string) => void;
}) {
  const handleSelect = (slug: string) => {
    if (onSelect) {
      onSelect(slug);
      return;
    }
    if (typeof document !== "undefined") {
      const el = document.getElementById(`cat-${slug}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const list = useMemo(() => items.slice(0, Math.max(items.length, 1)), [items]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowDown") setActive((i) => (i + 1) % list.length);
      if (e.key === "ArrowUp")
        setActive((i) => (i - 1 + list.length) % list.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [list.length]);

  if (list.length === 0) return null;

  const activeItem = list[active];
  const activeGradient =
    PALETTE_GRADIENT[activeItem.palette] ?? PALETTE_GRADIENT.sumi;

  // Five slots: -2, -1, 0 (centre), +1, +2 — compute which item fills each.
  const slots = [-2, -1, 0, 1, 2].map((offset) => {
    const i = (active + offset + list.length) % list.length;
    return { offset, item: list[i], index: i };
  });

  return (
    <section className="relative isolate overflow-hidden bg-sumi-900 text-washi-50">
      {/* Background — active item's gradient + a soft blur so satellites
          feel like they're floating on the colour. */}
      <div className="absolute inset-0 -z-10">
        {list.map((item, i) => {
          const g = PALETTE_GRADIENT[item.palette] ?? PALETTE_GRADIENT.sumi;
          return (
            <div
              key={item.slug}
              className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-700 ${g} ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden
            />
          );
        })}
        <div
          className="absolute inset-0 bg-sumi-900/55 backdrop-blur-sm"
          aria-hidden
        />
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-20 sm:grid-cols-[auto_1fr_auto] sm:items-center">
        {/* LEFT — thin intro block */}
        <div className="sm:w-56">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-washi-50/60">
            Discover
          </p>
          <h2 className="mt-3 font-sans text-3xl font-semibold leading-tight text-washi-50 sm:text-4xl">
            Things to buy
          </h2>
          <p className="mt-3 font-sans text-2xl italic text-kintsugi-300">
            Tokyo edit
          </p>
          <p className="mt-5 text-xs leading-relaxed text-washi-50/70">
            Ten category collections — knives, stationery, depachika
            food halls, malls, boutiques, vintage. Tap any bubble to
            bring it to the centre.
          </p>
        </div>

        {/* CENTRE — the bubble stack */}
        <div className="relative mx-auto flex h-[460px] flex-col items-center justify-center sm:h-[520px]">
          {slots.map(({ offset, item, index }) => {
            // Pre-compute visual treatment per slot position.
            const size =
              offset === 0
                ? "h-40 w-40 sm:h-52 sm:w-52"
                : Math.abs(offset) === 1
                  ? "h-20 w-20 sm:h-24 sm:w-24"
                  : "h-12 w-12 sm:h-16 sm:w-16";
            const translate =
              offset === 0
                ? "translate-y-0"
                : offset === -1
                  ? "-translate-y-[130px] sm:-translate-y-[170px]"
                  : offset === 1
                    ? "translate-y-[130px] sm:translate-y-[170px]"
                    : offset === -2
                      ? "-translate-y-[220px] sm:-translate-y-[280px]"
                      : "translate-y-[220px] sm:translate-y-[280px]";
            const opacity =
              offset === 0
                ? "opacity-100"
                : Math.abs(offset) === 1
                  ? "opacity-80"
                  : "opacity-45";
            const g =
              PALETTE_GRADIENT[item.palette] ?? PALETTE_GRADIENT.sumi;

            return (
              <button
                key={`${index}-${offset}`}
                type="button"
                onClick={() =>
                  offset === 0 ? handleSelect(item.slug) : setActive(index)
                }
                aria-label={
                  offset === 0
                    ? `Open ${item.title}`
                    : `Focus ${item.title}`
                }
                className={`absolute ${translate} ${opacity} ${size} overflow-hidden rounded-full ring-2 ring-white/70 shadow-2xl transition-all duration-500 ease-out hover:scale-[1.04]`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${g}`}
                  aria-hidden
                />
                {item.images && item.images.length > 0 && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.images[0]}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 flex items-center justify-center font-sans font-bold text-white/85 drop-shadow ${
                    offset === 0
                      ? "text-5xl sm:text-6xl"
                      : Math.abs(offset) === 1
                        ? "text-xl sm:text-2xl"
                        : "text-xs sm:text-base"
                  }`}
                >
                  {item.kanji}
                </span>

                {/* Label to the LEFT of the bubble (on desktop only) */}
                <span className="pointer-events-none absolute right-full top-1/2 mr-5 hidden -translate-y-1/2 whitespace-nowrap text-right sm:block">
                  <span
                    className={`block font-sans font-semibold ${
                      offset === 0
                        ? "text-xl text-washi-50"
                        : "text-sm text-washi-50/85"
                    }`}
                  >
                    {item.title}
                  </span>
                  <span
                    className={`block text-[10px] uppercase tracking-[0.12em] ${
                      offset === 0
                        ? "text-kintsugi-300"
                        : "text-washi-50/55"
                    }`}
                  >
                    {item.subtitle}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* RIGHT — dot rail */}
        <div className="hidden flex-col items-center gap-2 sm:flex">
          {list.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show item ${i + 1}`}
              onClick={() => setActive(i)}
              className={`block rounded-full transition-all ${
                i === active
                  ? "h-2 w-2 bg-kintsugi-300"
                  : "h-1 w-1 bg-washi-50/45 hover:bg-washi-50/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile label — shown under the stack on small screens */}
      <div className="px-6 pb-10 text-center sm:hidden">
        <div className="text-[10px] uppercase tracking-[0.12em] text-kintsugi-300">
          {activeItem.subtitle}
        </div>
        <div className="mt-1 font-sans text-2xl font-semibold text-washi-50">
          {activeItem.title}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-sumi-900/80"
        aria-hidden
      />
      <div className="sr-only">
        Active: {activeItem.title}. Use arrow keys to navigate.
      </div>
      {/* placed at end so the gradient reference doesn't get tree-shaken */}
      <span className="hidden" data-active-gradient={activeGradient} />
    </section>
  );
}
