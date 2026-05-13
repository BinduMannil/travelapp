"use client";

import { useState } from "react";
import { CoverTile } from "@/components/common/CoverTile";
import { ImageCarousel } from "@/components/common/ImageCarousel";

type Palette =
  | "enji"
  | "aizome"
  | "sakura"
  | "matcha"
  | "kintsugi"
  | "sumi"
  | "ume"
  | "ocean"
  | "forest";

export function ShoppingCategoryCover({
  palette,
  kanji,
  images,
  alt,
}: {
  palette: Palette;
  kanji: string;
  images: string[];
  alt: string;
}) {
  const [allFailed, setAllFailed] = useState(false);

  // Wide banner ratio — far less heavy than the old 1:1 cover and lets
  // a row of category sections feel like an editorial section divider.
  const BANNER = "h-32 sm:h-36 lg:h-40";

  if (images.length === 0 || allFailed) {
    return (
      <div className={`relative w-full overflow-hidden rounded-xl ${BANNER}`}>
        <CoverTile
          palette={palette}
          kanji={kanji}
          aspect="16/9"
          className="!aspect-auto h-full w-full"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden rounded-xl ${BANNER}`}>
      <ImageCarousel
        images={images}
        alt={alt}
        className="absolute inset-0 h-full w-full"
        onAllFailed={() => setAllFailed(true)}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/55 px-2 py-0.5 font-display text-xs text-white backdrop-blur-sm">
        {kanji}
      </div>
    </div>
  );
}
