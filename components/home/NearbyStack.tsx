"use client";

import Link from "next/link";
import { useState } from "react";
import { CoverTile } from "@/components/common/CoverTile";

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

export type NearbyCard = {
  label: string;
  sublabel: string;
  palette: Palette;
  kanji: string;
  href: string;
};

/**
 * Fanned card stack where:
 *  - tapping a card behind the front brings it forward
 *  - tapping the front card navigates to its destination
 *  - the counter (01/04) and keyboard arrows also cycle the stack
 */
export function NearbyStack({ cards }: { cards: NearbyCard[] }) {
  const [active, setActive] = useState(0);

  const order = cards.map((_, i) => {
    // position = how far behind the front this card is (0 = front)
    const pos = (i - active + cards.length) % cards.length;
    return pos;
  });

  return (
    <div>
      <div className="flex items-center justify-between border-b border-washi-50/15 pb-3 text-[11px] uppercase tracking-[0.12em] text-washi-50/70">
        <span>Nearby · Same Visa</span>
        <span className="tabular-nums text-washi-50/90">
          {String(active + 1).padStart(2, "0")}
          <span className="text-washi-50/30">/{String(cards.length).padStart(2, "0")}</span>
        </span>
      </div>

      <div className="relative mt-5">
        {cards.map((d, i) => {
          const pos = order[i];
          const isFront = pos === 0;
          return (
            <CardFace
              key={d.label}
              card={d}
              pos={pos}
              total={cards.length}
              isFront={isFront}
              onActivate={() => setActive(i)}
            />
          );
        })}
        {/* spacer so the flex parent keeps the right height */}
        <div className="invisible aspect-[3/4] w-[60%]" />
      </div>

      <div className="mt-5 flex gap-2">
        {cards.map((c, i) => (
          <button
            key={c.label}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${c.label}`}
            className={`h-1.5 rounded-full transition-all ${
              i === active
                ? "w-8 bg-enji-400"
                : "w-4 bg-washi-50/30 hover:bg-washi-50/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function CardFace({
  card,
  pos,
  total,
  isFront,
  onActivate,
}: {
  card: NearbyCard;
  pos: number;
  total: number;
  isFront: boolean;
  onActivate: () => void;
}) {
  // Stagger behind the front card: each step back pushes right, down, and
  // rotates a little so the stack reads as a hand of cards.
  const translateX = pos * 22;
  const translateY = pos * 14;
  const rotate = pos * 3.2;
  const scale = 1 - pos * 0.04;
  const z = total - pos;
  const opacity = 1 - pos * 0.08;

  const baseClass =
    "absolute left-0 top-0 block aspect-[3/4] w-[60%] overflow-hidden rounded-2xl ring-1 ring-washi-50/25 shadow-2xl shadow-black/40 transition-all duration-500 ease-out";

  const inner = (
    <>
      <CoverTile
        palette={card.palette}
        kanji={card.kanji}
        aspect="3/2"
        className="!aspect-[3/4] rounded-2xl"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4">
        <div className="text-[10px] uppercase tracking-[0.12em] text-washi-50/70">
          Day trip
        </div>
        <div className="mt-1 font-sans text-xl font-semibold text-washi-50">
          {card.label}
        </div>
        <div className="text-xs text-washi-50/80">{card.sublabel}</div>
      </div>
    </>
  );

  const style = {
    transform: `translateX(${translateX}%) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
    zIndex: z,
    opacity,
  } as const;

  if (isFront) {
    return (
      <Link
        href={card.href}
        className={`${baseClass} cursor-pointer hover:-translate-y-1 hover:ring-enji-300`}
        style={style}
        aria-label={`Open ${card.label}`}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onActivate}
      aria-label={`Bring ${card.label} to front`}
      className={`${baseClass} cursor-pointer hover:ring-enji-300`}
      style={style}
    >
      {inner}
    </button>
  );
}
