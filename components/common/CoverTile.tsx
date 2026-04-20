import { cn } from "@/lib/utils";

type Palette =
  | "rose"
  | "amber"
  | "emerald"
  | "sky"
  | "indigo"
  | "violet"
  | "fuchsia"
  | "teal"
  | "slate"
  | "orange";

const GRADIENTS: Record<Palette, string> = {
  rose: "from-rose-400 via-pink-500 to-fuchsia-600",
  amber: "from-amber-400 via-orange-500 to-rose-500",
  emerald: "from-emerald-400 via-teal-500 to-cyan-600",
  sky: "from-sky-400 via-blue-500 to-indigo-600",
  indigo: "from-indigo-500 via-violet-500 to-purple-600",
  violet: "from-violet-400 via-fuchsia-500 to-pink-500",
  fuchsia: "from-fuchsia-500 via-pink-500 to-rose-500",
  teal: "from-teal-400 via-cyan-500 to-sky-600",
  slate: "from-slate-500 via-slate-700 to-slate-900",
  orange: "from-orange-400 via-red-500 to-rose-600",
};

export function CoverTile({
  palette,
  icon,
  badge,
  className,
  aspect = "16/9",
}: {
  palette: Palette;
  icon: string;
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
      {/* soft radial highlight */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
      {/* subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* icon */}
      <div className="absolute inset-0 flex items-center justify-center text-7xl drop-shadow-sm sm:text-8xl">
        <span>{icon}</span>
      </div>
      {badge && (
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-slate-900 shadow-sm">
          {badge}
        </span>
      )}
    </div>
  );
}

// --- Mapping helpers: pick a palette + icon from an entity's metadata ----

export function attractionCover(category: string): {
  palette: Palette;
  icon: string;
} {
  switch (category) {
    case "religious":
      return { palette: "amber", icon: "⛩️" };
    case "landmark":
      return { palette: "indigo", icon: "🗼" };
    case "art":
      return { palette: "violet", icon: "🎨" };
    case "food":
      return { palette: "rose", icon: "🍣" };
    case "park":
      return { palette: "emerald", icon: "🌳" };
    case "museum":
      return { palette: "slate", icon: "🏛️" };
    case "nature":
      return { palette: "teal", icon: "🗻" };
    case "district":
      return { palette: "fuchsia", icon: "🏙️" };
    default:
      return { palette: "sky", icon: "📍" };
  }
}

export function restaurantCover(cuisine: string[]): {
  palette: Palette;
  icon: string;
} {
  const primary = cuisine[0] ?? "";
  switch (primary) {
    case "sushi":
      return { palette: "rose", icon: "🍣" };
    case "ramen":
    case "shio":
    case "shoyu":
    case "tonkotsu":
    case "tantanmen":
      return { palette: "amber", icon: "🍜" };
    case "tempura":
      return { palette: "orange", icon: "🍤" };
    case "tonkatsu":
      return { palette: "orange", icon: "🍱" };
    case "kaiseki":
    case "innovative":
      return { palette: "violet", icon: "🍱" };
    case "izakaya":
      return { palette: "fuchsia", icon: "🏮" };
    case "curry":
      return { palette: "amber", icon: "🍛" };
    case "vegan":
    case "cafe":
      return { palette: "emerald", icon: "🥬" };
    default:
      return { palette: "rose", icon: "🍽️" };
  }
}

export function neighborhoodCover(vibe: string[]): {
  palette: Palette;
  icon: string;
} {
  const v = new Set(vibe.map((x) => x.toLowerCase()));
  if (v.has("luxury") || v.has("refined")) return { palette: "violet", icon: "💎" };
  if (v.has("historic") || v.has("traditional") || v.has("old-town"))
    return { palette: "amber", icon: "⛩️" };
  if (v.has("anime") || v.has("otaku") || v.has("retro-gaming"))
    return { palette: "fuchsia", icon: "🕹️" };
  if (v.has("nightlife") || v.has("youthful")) return { palette: "fuchsia", icon: "🌃" };
  if (v.has("food") || v.has("market")) return { palette: "rose", icon: "🐟" };
  if (v.has("waterfront")) return { palette: "teal", icon: "🌊" };
  if (v.has("indie") || v.has("bohemian") || v.has("vintage"))
    return { palette: "orange", icon: "🎨" };
  if (v.has("sakura") || v.has("design")) return { palette: "rose", icon: "🌸" };
  if (v.has("business") || v.has("eclectic")) return { palette: "slate", icon: "🏙️" };
  return { palette: "indigo", icon: "🏙️" };
}

export function hotelCover(tier: string): {
  palette: Palette;
  icon: string;
} {
  switch (tier) {
    case "hostel":
      return { palette: "orange", icon: "🎒" };
    case "capsule":
      return { palette: "sky", icon: "🛏️" };
    case "business":
      return { palette: "slate", icon: "🏨" };
    case "ryokan_style":
      return { palette: "emerald", icon: "🍵" };
    case "mid_range":
      return { palette: "indigo", icon: "✨" };
    case "luxury":
      return { palette: "violet", icon: "💎" };
    case "luxury_ryokan":
      return { palette: "amber", icon: "🏯" };
    default:
      return { palette: "slate", icon: "🏨" };
  }
}

export function wellnessCover(type: string): {
  palette: Palette;
  icon: string;
} {
  switch (type) {
    case "urban_onsen":
    case "mountain_onsen":
      return { palette: "teal", icon: "♨️" };
    case "sento":
      return { palette: "sky", icon: "🛁" };
    case "head_spa":
      return { palette: "violet", icon: "💆" };
    case "massage":
      return { palette: "emerald", icon: "💆‍♂️" };
    default:
      return { palette: "teal", icon: "♨️" };
  }
}
