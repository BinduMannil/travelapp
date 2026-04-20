import { cn } from "@/lib/utils";

/**
 * CoverTile — a country-rooted visual placeholder for entity cards.
 *
 * Uses:
 *  - an `imageUrl` (preferred) wrapped in a soft overlay, OR
 *  - a named palette gradient tuned to Japan's traditional colours
 *    (enji crimson, aizome indigo, sakura pink, matcha, sumi black,
 *    washi cream, kintsugi gold),
 *  - an optional kanji character as a typographic focal point — no
 *    emoji. Characters are pulled from the mapping helpers below.
 */

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

const GRADIENTS: Record<Palette, string> = {
  enji: "from-enji-500 via-enji-600 to-enji-900",
  aizome: "from-aizome-500 via-aizome-600 to-aizome-900",
  sakura: "from-sakura-300 via-sakura-400 to-enji-500",
  matcha: "from-matcha-400 via-matcha-600 to-matcha-700",
  kintsugi: "from-kintsugi-300 via-kintsugi-500 to-enji-700",
  sumi: "from-sumi-700 via-sumi-900 to-black",
  washi: "from-washi-100 via-washi-200 to-washi-300",
  ume: "from-sakura-400 via-enji-500 to-enji-700", // plum
  ocean: "from-aizome-400 via-aizome-600 to-sumi-900",
  forest: "from-matcha-500 via-matcha-700 to-aizome-700",
};

const DEFAULT_TEXT_CLASS: Record<Palette, string> = {
  enji: "text-white/85",
  aizome: "text-white/85",
  sakura: "text-white",
  matcha: "text-white/90",
  kintsugi: "text-white/90",
  sumi: "text-white/80",
  washi: "text-sumi-900/70",
  ume: "text-white",
  ocean: "text-white/85",
  forest: "text-white/90",
};

export function CoverTile({
  palette,
  kanji,
  imageUrl,
  badge,
  className,
  aspect = "16/9",
}: {
  palette: Palette;
  kanji?: string;
  imageUrl?: string;
  badge?: string;
  className?: string;
  aspect?: "16/9" | "4/3" | "1/1" | "3/2";
}) {
  const aspectClass =
    aspect === "4/3"
      ? "aspect-[4/3]"
      : aspect === "1/1"
        ? "aspect-square"
        : aspect === "3/2"
          ? "aspect-[3/2]"
          : "aspect-video";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-gradient-to-br",
        GRADIENTS[palette],
        aspectClass,
        className,
      )}
      aria-hidden
    >
      {imageUrl && (
        // Real photograph layer (shown when available). Uses a regular <img>
        // so CoverTile stays a server-renderable plain component; swap to
        // next/image in a later pass once the image pipeline is wired.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      )}
      {/* traditional seigaiha-style dot wash for texture */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay",
          imageUrl && "opacity-25",
        )}
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.45), transparent 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 0% 100%, rgba(255,255,255,.5) 0 22%, transparent 23%), radial-gradient(circle at 50% 100%, rgba(255,255,255,.5) 0 22%, transparent 23%), radial-gradient(circle at 100% 100%, rgba(255,255,255,.5) 0 22%, transparent 23%)",
          backgroundSize: "64px 32px",
        }}
      />
      {kanji && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center font-display font-bold leading-none tracking-tighter",
            DEFAULT_TEXT_CLASS[palette],
            imageUrl ? "text-[12vw] sm:text-[8vw] lg:text-7xl" : "text-[22vw] sm:text-[14vw] lg:text-[10rem]",
            "drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]",
          )}
        >
          {kanji}
        </div>
      )}
      {imageUrl && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      )}
      {badge && (
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-sumi-900 shadow-sm">
          {badge}
        </span>
      )}
    </div>
  );
}

// ---- Mapping helpers --------------------------------------------------

export function attractionCover(category: string): {
  palette: Palette;
  kanji: string;
} {
  switch (category) {
    case "religious":
      return { palette: "enji", kanji: "寺" }; // temple
    case "landmark":
      return { palette: "aizome", kanji: "塔" }; // tower
    case "art":
      return { palette: "ume", kanji: "美" }; // beauty / art
    case "food":
      return { palette: "enji", kanji: "食" }; // food
    case "park":
      return { palette: "matcha", kanji: "庭" }; // garden
    case "museum":
      return { palette: "sumi", kanji: "館" }; // hall
    case "nature":
      return { palette: "forest", kanji: "山" }; // mountain
    case "district":
      return { palette: "kintsugi", kanji: "街" }; // district
    default:
      return { palette: "aizome", kanji: "観" }; // sight
  }
}

export function restaurantCover(cuisine: string[]): {
  palette: Palette;
  kanji: string;
} {
  const primary = cuisine[0] ?? "";
  switch (primary) {
    case "sushi":
      return { palette: "enji", kanji: "鮨" };
    case "ramen":
    case "shio":
    case "shoyu":
    case "tonkotsu":
    case "tantanmen":
      return { palette: "kintsugi", kanji: "麺" };
    case "tempura":
      return { palette: "ume", kanji: "天" };
    case "tonkatsu":
      return { palette: "enji", kanji: "豚" };
    case "kaiseki":
    case "innovative":
      return { palette: "sumi", kanji: "懐" };
    case "izakaya":
      return { palette: "aizome", kanji: "酒" };
    case "curry":
      return { palette: "kintsugi", kanji: "辛" };
    case "vegan":
    case "cafe":
      return { palette: "matcha", kanji: "野" };
    default:
      return { palette: "enji", kanji: "味" };
  }
}

export function neighborhoodCover(vibe: string[]): {
  palette: Palette;
  kanji: string;
} {
  const v = new Set(vibe.map((x) => x.toLowerCase()));
  if (v.has("luxury") || v.has("refined")) return { palette: "kintsugi", kanji: "雅" };
  if (v.has("historic") || v.has("traditional") || v.has("old-town"))
    return { palette: "enji", kanji: "古" };
  if (v.has("anime") || v.has("otaku") || v.has("retro-gaming"))
    return { palette: "ume", kanji: "粋" };
  if (v.has("nightlife") || v.has("youthful")) return { palette: "aizome", kanji: "夜" };
  if (v.has("food") || v.has("market")) return { palette: "enji", kanji: "味" };
  if (v.has("waterfront")) return { palette: "ocean", kanji: "海" };
  if (v.has("indie") || v.has("bohemian") || v.has("vintage"))
    return { palette: "matcha", kanji: "粋" };
  if (v.has("sakura") || v.has("design")) return { palette: "sakura", kanji: "桜" };
  if (v.has("business") || v.has("eclectic")) return { palette: "sumi", kanji: "街" };
  return { palette: "aizome", kanji: "区" };
}

export function hotelCover(tier: string): {
  palette: Palette;
  kanji: string;
} {
  switch (tier) {
    case "hostel":
      return { palette: "matcha", kanji: "宿" };
    case "capsule":
      return { palette: "aizome", kanji: "眠" };
    case "business":
      return { palette: "sumi", kanji: "館" };
    case "ryokan_style":
      return { palette: "enji", kanji: "湯" };
    case "mid_range":
      return { palette: "kintsugi", kanji: "宿" };
    case "luxury":
      return { palette: "sumi", kanji: "雅" };
    case "luxury_ryokan":
      return { palette: "enji", kanji: "祥" };
    default:
      return { palette: "sumi", kanji: "宿" };
  }
}

export function wellnessCover(type: string): {
  palette: Palette;
  kanji: string;
} {
  switch (type) {
    case "urban_onsen":
    case "mountain_onsen":
      return { palette: "enji", kanji: "湯" };
    case "sento":
      return { palette: "aizome", kanji: "銭" };
    case "head_spa":
      return { palette: "ume", kanji: "髪" };
    case "massage":
      return { palette: "matcha", kanji: "按" };
    default:
      return { palette: "enji", kanji: "湯" };
  }
}
