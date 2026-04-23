"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type Palette =
  | "enji"
  | "aizome"
  | "sakura"
  | "matcha"
  | "kintsugi"
  | "sumi"
  | "washi"
  | "ume"
  | "ocean"
  | "forest";

const PALETTE_GRADIENT: Record<Palette, string> = {
  enji: "from-enji-500 via-enji-700 to-sumi-900",
  aizome: "from-aizome-500 via-aizome-700 to-sumi-900",
  sakura: "from-sakura-300 via-sakura-400 to-enji-700",
  matcha: "from-matcha-500 via-matcha-700 to-sumi-900",
  kintsugi: "from-kintsugi-300 via-kintsugi-500 to-enji-700",
  sumi: "from-sumi-700 via-sumi-900 to-black",
  washi: "from-washi-100 via-washi-200 to-washi-300",
  ume: "from-sakura-400 via-enji-600 to-enji-900",
  ocean: "from-aizome-400 via-aizome-700 to-sumi-900",
  forest: "from-matcha-500 via-matcha-700 to-aizome-900",
};

export type NearbyCard = {
  label: string;
  sublabel: string;
  palette: Palette;
  kanji: string;
  href: string;
  imageUrl?: string;
};

/**
 * Horizontal snap-scroll rail of destination cards — replaces the old
 * fanned stack, which only worked for ~4-5 items. Every destination is
 * reachable without hunting behind layers:
 *  - swipe / shift-scroll / arrow buttons slide the rail
 *  - dot counter at the bottom shows position
 *  - card-under-cursor gets a photo + gradient; photo fails silently
 *    back to the kanji tile so the layout doesn't break
 *  - clicking a card navigates to its destination page
 */
export function NearbyStack({ cards }: { cards: NearbyCard[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function scrollToIndex(i: number) {
    const rail = railRef.current;
    if (!rail) return;
    const child = rail.children[i] as HTMLElement | undefined;
    if (!child) return;
    rail.scrollTo({ left: child.offsetLeft - 16, behavior: "smooth" });
    setActive(i);
  }

  // Cycle continuously: pressing next on the last card jumps back to the
  // first; pressing prev on the first jumps to the last.
  function nudge(dir: 1 | -1) {
    const next = (active + dir + cards.length) % cards.length;
    scrollToIndex(next);
  }

  // Track which card is closest to the rail's left edge as the user
  // scrolls, so the dot indicator + counter stay in sync.
  function onRailScroll() {
    const rail = railRef.current;
    if (!rail) return;
    const children = Array.from(rail.children) as HTMLElement[];
    let nearest = 0;
    let best = Infinity;
    const left = rail.scrollLeft;
    children.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - 16 - left);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setActive(nearest);
  }

  return (
    <div>
      <div className="flex items-center justify-between border-b border-washi-50/15 pb-3 text-[11px] uppercase tracking-[0.3em] text-washi-50/70">
        <span>Nearby · same visa</span>
        <span className="tabular-nums text-washi-50/90">
          {String(active + 1).padStart(2, "0")}
          <span className="text-washi-50/30">
            {" / "}
            {String(cards.length).padStart(2, "0")}
          </span>
        </span>
      </div>

      {/* Rail */}
      <div className="relative mt-5">
        <div
          ref={railRef}
          onScroll={onRailScroll}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {cards.map((c, i) => (
            <DestinationCard
              key={c.label}
              card={c}
              index={i}
              isActive={i === active}
              onHover={() => setActive(i)}
            />
          ))}
        </div>

        {/* Left / right nudge buttons — hidden on touch. */}
        <button
          type="button"
          aria-label="Previous"
          onClick={() => nudge(-1)}
          className="absolute left-[-14px] top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-washi-50/15 text-washi-50 backdrop-blur transition hover:bg-washi-50/30 md:grid"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => nudge(1)}
          className="absolute right-[-14px] top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-washi-50/15 text-washi-50 backdrop-blur transition hover:bg-washi-50/30 md:grid"
        >
          →
        </button>
      </div>

      {/* Dot indicator */}
      <div className="mt-2 flex flex-wrap justify-center gap-1">
        {cards.map((c, i) => (
          <button
            key={c.label}
            type="button"
            aria-label={`Go to ${c.label}`}
            onClick={() => scrollToIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active
                ? "w-6 bg-kintsugi-300"
                : "w-1.5 bg-washi-50/35 hover:bg-washi-50/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function DestinationCard({
  card,
  isActive,
  onHover,
}: {
  card: NearbyCard;
  index: number;
  isActive: boolean;
  onHover: () => void;
}) {
  const gradient = PALETTE_GRADIENT[card.palette] ?? PALETTE_GRADIENT.sumi;

  return (
    <Link
      href={card.href}
      onMouseEnter={onHover}
      onFocus={onHover}
      className={`group relative aspect-[3/4] w-[64%] shrink-0 overflow-hidden rounded-2xl ring-1 shadow-2xl shadow-black/40 transition sm:w-[44%] md:w-[38%] lg:w-[30%] ${
        isActive
          ? "ring-kintsugi-300/80"
          : "ring-washi-50/20 hover:ring-washi-50/50"
      }`}
      style={{ scrollSnapAlign: "start" }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      {card.imageUrl && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={card.imageUrl}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:opacity-95"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      )}

      {/* Kanji ghost behind everything; dim further when a photo loads */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[7rem] font-bold text-white/70 drop-shadow-xl transition-transform duration-500 group-hover:scale-105 ${
          card.imageUrl ? "mix-blend-screen opacity-25" : ""
        }`}
      >
        {card.kanji}
      </span>

      {/* Stronger bottom-up gradient — deep black at the foot, ~half the
          card height shaded, so the title row stays legible over busy photos. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent" />
      <div className="absolute inset-x-4 bottom-4 text-washi-50 [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
        <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-kintsugi-300">
          Day trip
        </div>
        <div className="mt-1 text-2xl font-bold leading-tight">
          {card.label}
        </div>
        <div className="mt-1 text-sm font-medium text-washi-50">
          {card.sublabel}
        </div>
      </div>
    </Link>
  );
}
