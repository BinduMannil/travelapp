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

  if (images.length === 0 || allFailed) {
    return <CoverTile palette={palette} kanji={kanji} aspect="1/1" />;
  }

  return (
    <div className="relative aspect-square overflow-hidden rounded-xl">
      <ImageCarousel
        images={images}
        alt={alt}
        className="absolute inset-0 h-full w-full"
        onAllFailed={() => setAllFailed(true)}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <div className="pointer-events-none absolute right-2 top-2 rounded-full bg-black/55 px-2 py-0.5 font-display text-xs text-white backdrop-blur-sm">
        {kanji}
      </div>
    </div>
  );
}
