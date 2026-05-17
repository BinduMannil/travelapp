"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BedDouble,
  Compass,
  Footprints,
  MapPinned,
  Martini,
  Moon,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Train,
  Utensils,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { CinematicTopNav } from "@/components/layout/CinematicTopNav";
import { TopNavSearch } from "@/components/search/TopNavSearch";
import { JourneeGlassPanel } from "@/components/ui/JourneeGlassPanel";
import { SegmentedTabs, type SegmentedTabItem } from "@/components/ui/SegmentedTabs";
import { StatusBadge, type StatusBadgeVariant } from "@/components/ui/StatusBadge";
import type { CitySeed, HiddenGem, Hotel, Neighborhood } from "@/lib/data/seed";
import { HOTEL_TIER_LABEL } from "@/lib/data/seed";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type Lens = "overview" | "atmosphere" | "stays" | "safety";
type TravelStyle = "first-timers" | "food" | "nightlife" | "culture" | "families" | "design";

type NeighborhoodsDiscoveryPageProps = {
  city: CitySeed;
  neighborhoods: Neighborhood[];
  hotels: Hotel[];
  hiddenGems: HiddenGem[];
};

const NEIGHBORHOOD_IMAGES: Record<string, string> = {
  shibuya:
    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1800&q=84",
  shinjuku:
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1800&q=84",
  ginza:
    "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=1800&q=84",
  asakusa:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1800&q=84",
  harajuku:
    "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=1800&q=84",
  akihabara:
    "https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=1800&q=84",
  roppongi:
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1800&q=84",
  daikanyama:
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=84",
  shimokitazawa:
    "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1800&q=84",
  yanaka:
    "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=1800&q=84",
  "tsukiji-toyosu":
    "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1800&q=84",
  odaiba:
    "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1800&q=84",
};

const fallbackNeighborhoodImage =
  "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1800&q=84";

const lensTabs: SegmentedTabItem<Lens>[] = [
  { value: "overview", label: "Overview" },
  { value: "atmosphere", label: "Day vs night" },
  { value: "stays", label: "Where to stay" },
  { value: "safety", label: "Safety fit" },
];

const styleTabs: SegmentedTabItem<TravelStyle>[] = [
  { value: "first-timers", label: "First-timers" },
  { value: "food", label: "Food" },
  { value: "nightlife", label: "Nightlife" },
  { value: "culture", label: "Culture" },
  { value: "families", label: "Families" },
  { value: "design", label: "Design" },
];

function scoreFromSignals(neighborhood: Neighborhood, target: string[]) {
  const haystack = [
    neighborhood.name,
    neighborhood.summary,
    neighborhood.description,
    ...neighborhood.vibe,
    ...neighborhood.best_for,
  ]
    .join(" ")
    .toLowerCase();

  return target.reduce((score, term) => score + (haystack.includes(term) ? 1 : 0), 0);
}

function getMood(neighborhood: Neighborhood) {
  const vibe = neighborhood.vibe.join(" ").toLowerCase();
  if (vibe.includes("luxury") || vibe.includes("refined")) return "Polished";
  if (vibe.includes("historic") || vibe.includes("old-town")) return "Old soul";
  if (vibe.includes("nightlife") || vibe.includes("youthful")) return "Electric";
  if (vibe.includes("family") || vibe.includes("waterfront")) return "Open-air";
  if (vibe.includes("indie") || vibe.includes("bohemian")) return "Creative";
  if (vibe.includes("food") || vibe.includes("market")) return "Appetizing";
  return "Layered";
}

function clampScore(value: number) {
  return Math.max(42, Math.min(98, value));
}

function buildProfile(neighborhood: Neighborhood) {
  const nightlifeSignals = scoreFromSignals(neighborhood, ["nightlife", "club", "bar", "late", "pub"]);
  const foodSignals = scoreFromSignals(neighborhood, ["food", "dining", "sushi", "market", "izakaya", "cafe"]);
  const cultureSignals = scoreFromSignals(neighborhood, ["temple", "historic", "museum", "traditional", "art"]);
  const shoppingSignals = scoreFromSignals(neighborhood, ["shopping", "fashion", "store", "boutique", "electronics"]);
  const calmSignals = scoreFromSignals(neighborhood, ["quiet", "calmer", "low-rise", "temples", "waterfront"]);
  const cautionSignals = scoreFromSignals(neighborhood, ["touts", "red-light", "overcharged", "promoters"]);
  const familySignals = scoreFromSignals(neighborhood, ["family", "families", "kids", "waterfront", "beaches"]);
  const stationSignals = neighborhood.transit_hubs.length + scoreFromSignals(neighborhood, ["station", "line", "jr"]);

  const nightlife = clampScore(46 + nightlifeSignals * 14);
  const food = clampScore(58 + foodSignals * 9 + (nightlifeSignals ? 4 : 0));
  const culture = clampScore(52 + cultureSignals * 12);
  const walkability = clampScore(66 + shoppingSignals * 5 + calmSignals * 4);
  const transit = clampScore(60 + stationSignals * 9);
  const safety = clampScore(86 - cautionSignals * 14 + familySignals * 3 + calmSignals * 2);
  const pace = clampScore(58 + nightlifeSignals * 10 + shoppingSignals * 6 - calmSignals * 5);

  return {
    mood: getMood(neighborhood),
    nightlife,
    food,
    culture,
    walkability,
    transit,
    safety,
    pace,
    safetyTone: cautionSignals > 0 ? "warning" : safety > 84 ? "success" : "neutral",
    safetyLabel:
      cautionSignals > 0
        ? "Use normal city caution at night"
        : safety > 84
          ? "Easy traveler fit"
          : "Best with a little orientation",
    day:
      cultureSignals > shoppingSignals
        ? "Mornings are best for temples, museums, markets, and slow wandering before tour groups thicken."
        : "Daylight is built for shopping streets, station-side wandering, cafes, and easy hop-on transit.",
    night:
      nightlifeSignals > 0
        ? "After dark the district becomes louder and more cinematic. Plan late trains or a short ride home."
        : calmSignals > 0
          ? "Nightfall softens the area into dinner walks, river light, and quieter returns to the hotel."
          : "Evenings are comfortable for dinner and a measured second act, without needing to chase the loudest scene.",
    foodSummary:
      foodSignals > 1
        ? "Food is a reason to base here, from casual counter meals to destination dining."
        : "Food works best as part of the rhythm: reliable meals nearby, stronger dining moves one or two stops away.",
    nightlifeSummary:
      nightlifeSignals > 0
        ? "Nightlife has real gravity here. Pick venues intentionally and ignore street invitations."
        : "Nightlife is gentle: better for cocktails, dessert, or an early return than a full late-night plan.",
    stayStrategy:
      calmSignals > 0
        ? "Stay here when you want the hotel to feel like a retreat between bigger city days."
        : nightlifeSignals > 0
          ? "Stay here if you want evenings to stay walkable and do not mind extra street energy."
          : "Stay here for convenience, quick meals, and simple transfers across the city.",
  };
}

function getStyleScore(neighborhood: Neighborhood, style: TravelStyle) {
  const text = [
    neighborhood.name,
    neighborhood.summary,
    neighborhood.description,
    ...neighborhood.vibe,
    ...neighborhood.best_for,
  ]
    .join(" ")
    .toLowerCase();
  const profile = buildProfile(neighborhood);

  const terms: Record<TravelStyle, string[]> = {
    "first-timers": ["first", "iconic", "classic", "station", "sight"],
    food: ["food", "dining", "sushi", "market", "izakaya", "cafe"],
    nightlife: ["nightlife", "bar", "club", "late", "pub"],
    culture: ["historic", "traditional", "temple", "museum", "art"],
    families: ["families", "family", "waterfront", "beaches", "quiet"],
    design: ["design", "indie", "fashion", "boutique", "refined", "art"],
  };

  const termScore = terms[style].filter((term) => text.includes(term)).length * 15;
  const metricScore =
    style === "nightlife"
      ? profile.nightlife / 3
      : style === "food"
        ? profile.food / 3
        : style === "culture"
          ? profile.culture / 3
          : style === "families"
            ? profile.safety / 4 + (profile.pace < 65 ? 18 : 0)
            : style === "design"
              ? profile.culture / 5 + profile.walkability / 5
              : profile.transit / 4 + profile.walkability / 5;

  return clampScore(42 + termScore + metricScore);
}

function getFitLabel(score: number) {
  if (score >= 86) return "Exceptional match";
  if (score >= 74) return "Strong fit";
  if (score >= 62) return "Good with tradeoffs";
  return "Special-interest fit";
}

function formatMoney(amountMinor: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amountMinor);
}

function normalized(value: string) {
  return value.toLowerCase().replace(/&/g, "and");
}

function gemsForNeighborhood(hiddenGems: HiddenGem[], neighborhood: Neighborhood) {
  const neighborhoodName = normalized(neighborhood.name);
  return hiddenGems
    .filter((gem) => neighborhoodName.includes(normalized(gem.neighborhood)) || normalized(gem.neighborhood).includes(normalized(neighborhood.name.split(" ")[0])))
    .slice(0, 3);
}

function hotelsForNeighborhood(hotels: Hotel[], neighborhood: Neighborhood) {
  const neighborhoodName = normalized(neighborhood.name);
  return hotels
    .filter((hotel) => neighborhoodName.includes(normalized(hotel.neighborhood)) || normalized(hotel.neighborhood).includes(normalized(neighborhood.name.split(" ")[0])))
    .slice(0, 3);
}

function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-xs font-semibold text-white/70">
        <span>{label}</span>
        <span className="text-[#f4c96c]">{Math.round(value)}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <span
          className="block h-full rounded-full bg-[linear-gradient(90deg,#55d6be,#f4c96c,#f38a7d)] transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function NeighborhoodsDiscoveryPage({
  city,
  neighborhoods,
  hotels,
  hiddenGems,
}: NeighborhoodsDiscoveryPageProps) {
  const [activeSlug, setActiveSlug] = useState(neighborhoods[0]?.slug ?? "");
  const [lens, setLens] = useState<Lens>("overview");
  const [travelStyle, setTravelStyle] = useState<TravelStyle>("first-timers");
  const [query, setQuery] = useState("");
  const [comparisonSlugs, setComparisonSlugs] = useState<string[]>(
    neighborhoods.slice(0, 3).map((neighborhood) => neighborhood.slug),
  );

  const activeNeighborhood =
    neighborhoods.find((neighborhood) => neighborhood.slug === activeSlug) ?? neighborhoods[0];
  const activeProfile = activeNeighborhood ? buildProfile(activeNeighborhood) : null;
  const activeGems = activeNeighborhood ? gemsForNeighborhood(hiddenGems, activeNeighborhood) : [];
  const activeHotels = activeNeighborhood ? hotelsForNeighborhood(hotels, activeNeighborhood) : [];

  const filteredNeighborhoods = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return neighborhoods;
    return neighborhoods.filter((neighborhood) =>
      [
        neighborhood.name,
        neighborhood.summary,
        neighborhood.description,
        ...neighborhood.vibe,
        ...neighborhood.best_for,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search),
    );
  }, [neighborhoods, query]);

  const styleMatches = useMemo(
    () =>
      [...neighborhoods]
        .map((neighborhood) => ({
          neighborhood,
          score: getStyleScore(neighborhood, travelStyle),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 4),
    [neighborhoods, travelStyle],
  );

  function toggleComparison(slug: string) {
    setComparisonSlugs((current) => {
      if (current.includes(slug)) return current.filter((item) => item !== slug);
      return [slug, ...current].slice(0, 3);
    });
  }

  function submitSearch(value: string) {
    const next = neighborhoods.find((neighborhood) =>
      [
        neighborhood.name,
        neighborhood.summary,
        neighborhood.description,
        ...neighborhood.vibe,
        ...neighborhood.best_for,
      ]
        .join(" ")
        .toLowerCase()
        .includes(value.trim().toLowerCase()),
    );
    if (next) setActiveSlug(next.slug);
  }

  if (!activeNeighborhood || !activeProfile) {
    return null;
  }

  const comparisonNeighborhoods = comparisonSlugs
    .map((slug) => neighborhoods.find((neighborhood) => neighborhood.slug === slug))
    .filter((neighborhood): neighborhood is Neighborhood => Boolean(neighborhood));

  return (
    <main className="min-h-screen bg-[#050706] text-white">
      <CinematicTopNav
        navItems={[
          { label: city.name, href: routes.city(city.slug) },
          { label: "Hotels", href: routes.citySection(city.slug, "hotels") },
          { label: "Restaurants", href: routes.citySection(city.slug, "restaurants") },
          { label: "Transit", href: routes.citySection(city.slug, "transit") },
          { label: "Hidden Gems", href: routes.citySection(city.slug, "hidden-gems") },
        ]}
        navBreakpointClassName="xl:flex"
        search={
          <TopNavSearch
            value={query}
            onValueChange={setQuery}
            onSearchSubmit={submitSearch}
            placeholder="Search districts, moods, food, nightlife..."
            label="Search neighborhoods"
            className="ml-auto"
          />
        }
        notificationCount={2}
        avatar={false}
      />

      <section className="relative isolate min-h-[720px] overflow-hidden pt-16">
        <Image
          src={NEIGHBORHOOD_IMAGES[activeNeighborhood.slug] ?? fallbackNeighborhoodImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_22%,rgba(244,201,108,.30),transparent_26%),linear-gradient(90deg,rgba(4,7,6,.94),rgba(4,7,6,.58)_48%,rgba(4,7,6,.92)),linear-gradient(180deg,rgba(4,7,6,.18),#050706_94%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-8 px-5 pb-16 pt-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pt-28">
          <div className="flex min-h-[560px] flex-col justify-end">
            <div className="flex flex-wrap gap-2">
              <StatusBadge variant="premium">District intelligence</StatusBadge>
              <StatusBadge variant={activeProfile.safetyTone as StatusBadgeVariant}>
                {activeProfile.safetyLabel}
              </StatusBadge>
            </div>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-[#f4c96c]">
              {city.name} neighborhoods
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(3.5rem,10vw,8.6rem)] font-semibold leading-[0.88] tracking-normal">
              {activeNeighborhood.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/86">
              {activeNeighborhood.summary}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {activeNeighborhood.vibe.map((vibe) => (
                <span
                  key={vibe}
                  className="rounded-full border border-white/18 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/82 backdrop-blur-xl"
                >
                  {vibe}
                </span>
              ))}
            </div>
          </div>

          <div className="grid content-end gap-4">
            <JourneeGlassPanel tone="gold" className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f4c96c]">
                    Current read
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{activeProfile.mood}</h2>
                </div>
                <Link
                  href={routes.citySection(city.slug, `neighborhoods/${activeNeighborhood.slug}`)}
                  className="rounded-full border border-white/16 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4c96c]"
                >
                  Open guide
                </Link>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <MetricBar label="Walkability" value={activeProfile.walkability} />
                <MetricBar label="Transit" value={activeProfile.transit} />
                <MetricBar label="Food scene" value={activeProfile.food} />
                <MetricBar label="Nightlife" value={activeProfile.nightlife} />
              </div>
            </JourneeGlassPanel>

            <JourneeGlassPanel className="p-4 sm:p-5">
              <SegmentedTabs
                items={lensTabs}
                value={lens}
                onValueChange={setLens}
                aria-label="Neighborhood lens"
                className="w-full"
              />
              <div className="mt-5 min-h-[120px] text-sm leading-7 text-white/76">
                {lens === "overview" ? activeNeighborhood.description : null}
                {lens === "atmosphere" ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="flex items-center gap-2 font-semibold text-white">
                        <SunMedium className="h-4 w-4 text-[#f4c96c]" /> Day
                      </p>
                      <p className="mt-2">{activeProfile.day}</p>
                    </div>
                    <div>
                      <p className="flex items-center gap-2 font-semibold text-white">
                        <Moon className="h-4 w-4 text-[#8fd7ff]" /> Night
                      </p>
                      <p className="mt-2">{activeProfile.night}</p>
                    </div>
                  </div>
                ) : null}
                {lens === "stays" ? activeProfile.stayStrategy : null}
                {lens === "safety" ? (
                  <div>
                    <p>{activeProfile.safetyLabel}. Match your base to your tolerance for late crowds, transfers, and quiet returns.</p>
                    <MetricBar label="Safety comfort" value={activeProfile.safety} />
                  </div>
                ) : null}
              </div>
            </JourneeGlassPanel>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-6">
        <section className="grid gap-8 lg:grid-cols-[360px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white/72">
              <MapPinned className="h-4 w-4 text-[#55d6be]" />
              District selector
            </div>
            <div className="grid max-h-[680px] gap-3 overflow-y-auto pr-1">
              {filteredNeighborhoods.map((neighborhood) => {
                const profile = buildProfile(neighborhood);
                const active = neighborhood.slug === activeNeighborhood.slug;
                return (
                  <button
                    key={neighborhood.slug}
                    type="button"
                    onClick={() => setActiveSlug(neighborhood.slug)}
                    className={cn(
                      "group rounded-[1.25rem] border p-4 text-left transition duration-300 hover:-translate-y-0.5",
                      active
                        ? "border-[#f4c96c]/48 bg-[#f4c96c]/14 shadow-[0_18px_60px_rgba(0,0,0,.28)]"
                        : "border-white/10 bg-white/[.045] hover:border-white/22 hover:bg-white/[.07]",
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base font-semibold text-white">{neighborhood.name}</h3>
                      <span className="text-xs font-semibold text-[#f4c96c]">{profile.mood}</span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/62">
                      {neighborhood.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {neighborhood.best_for.slice(0, 2).map((item) => (
                        <span key={item} className="rounded-full bg-white/8 px-2.5 py-1 text-[11px] text-white/68">
                          {item}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="space-y-10">
            <section>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#55d6be]">
                    Compare the base
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold text-white">Neighborhood comparison cards</h2>
                </div>
                <p className="max-w-xl text-sm leading-6 text-white/58">
                  Add or remove districts from the comparison. The selected district stays visually anchored.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {comparisonNeighborhoods.map((neighborhood) => {
                  const profile = buildProfile(neighborhood);
                  const active = neighborhood.slug === activeNeighborhood.slug;
                  return (
                    <JourneeGlassPanel
                      key={neighborhood.slug}
                      as="article"
                      tone={active ? "gold" : "default"}
                      className={cn("p-5 transition duration-300 hover:-translate-y-1", active && "ring-1 ring-[#f4c96c]/35")}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveSlug(neighborhood.slug)}
                        className="block w-full text-left"
                      >
                        <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-[1rem] bg-black">
                          <Image
                            src={NEIGHBORHOOD_IMAGES[neighborhood.slug] ?? fallbackNeighborhoodImage}
                            alt=""
                            fill
                            sizes="(min-width: 768px) 30vw, 100vw"
                            className="object-cover opacity-80 transition duration-700 hover:scale-[1.04]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/72 to-transparent" />
                          <StatusBadge className="absolute left-3 top-3" variant={active ? "premium" : "neutral"}>
                            {profile.mood}
                          </StatusBadge>
                        </div>
                        <h3 className="text-xl font-semibold text-white">{neighborhood.name}</h3>
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/66">{neighborhood.summary}</p>
                      </button>
                      <div className="mt-5 grid gap-3">
                        <MetricBar label="Pace" value={profile.pace} />
                        <MetricBar label="Safety" value={profile.safety} />
                        <MetricBar label="Food" value={profile.food} />
                      </div>
                    </JourneeGlassPanel>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {neighborhoods.map((neighborhood) => {
                  const selected = comparisonSlugs.includes(neighborhood.slug);
                  return (
                    <button
                      key={neighborhood.slug}
                      type="button"
                      onClick={() => toggleComparison(neighborhood.slug)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                        selected
                          ? "border-[#f4c96c]/40 bg-[#f4c96c]/16 text-[#f7d889]"
                          : "border-white/10 bg-white/[.045] text-white/58 hover:text-white",
                      )}
                    >
                      {selected ? "Comparing " : "Add "}
                      {neighborhood.name}
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
              <JourneeGlassPanel className="p-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-[#f38a7d]" />
                  <h2 className="text-2xl font-semibold text-white">Mood and personality</h2>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <MetricBar label="Atmospheric intensity" value={activeProfile.pace} />
                  <MetricBar label="Cultural texture" value={activeProfile.culture} />
                  <MetricBar label="Walkable wandering" value={activeProfile.walkability} />
                  <MetricBar label="After-dark pull" value={activeProfile.nightlife} />
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {activeNeighborhood.best_for.map((item) => (
                    <StatusBadge key={item} variant="premium">
                      Best for {item}
                    </StatusBadge>
                  ))}
                </div>
              </JourneeGlassPanel>

              <JourneeGlassPanel className="p-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Footprints className="h-4 w-4 text-[#55d6be]" />
                      Walkability and transit
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/66">
                      {activeNeighborhood.transit_hubs.join(". ")}
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Train className="h-4 w-4 text-[#8fd7ff]" />
                      Movement style
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/66">
                      {activeProfile.transit > 82
                        ? "Excellent for cross-city days and quick returns."
                        : "Better for slower local wandering with planned transfers."}
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <MetricBar label="Walkability" value={activeProfile.walkability} />
                  <MetricBar label="Transit ease" value={activeProfile.transit} />
                </div>
              </JourneeGlassPanel>
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
              <JourneeGlassPanel className="p-6">
                <div className="flex items-center gap-3">
                  <Utensils className="h-5 w-5 text-[#f4c96c]" />
                  <h2 className="text-2xl font-semibold text-white">Food scene</h2>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/68">{activeProfile.foodSummary}</p>
                <MetricBar label="Food depth" value={activeProfile.food} />
              </JourneeGlassPanel>

              <JourneeGlassPanel className="p-6">
                <div className="flex items-center gap-3">
                  <Martini className="h-5 w-5 text-[#f38a7d]" />
                  <h2 className="text-2xl font-semibold text-white">Nightlife summary</h2>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/68">{activeProfile.nightlifeSummary}</p>
                <MetricBar label="Night energy" value={activeProfile.nightlife} />
              </JourneeGlassPanel>
            </section>

            <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
              <JourneeGlassPanel className="p-6">
                <div className="flex items-center gap-3">
                  <BedDouble className="h-5 w-5 text-[#55d6be]" />
                  <h2 className="text-2xl font-semibold text-white">Stay recommendations</h2>
                </div>
                <p className="mt-3 text-sm leading-7 text-white/68">{activeProfile.stayStrategy}</p>
                <div className="mt-5 grid gap-3">
                  {activeHotels.length > 0 ? (
                    activeHotels.map((hotel) => (
                      <Link
                        key={hotel.slug}
                        href={hotel.booking_url}
                        className="rounded-[1rem] border border-white/10 bg-white/[.045] p-4 transition hover:border-white/24 hover:bg-white/[.07]"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <p className="font-semibold text-white">{hotel.name}</p>
                          <StatusBadge variant="neutral">{HOTEL_TIER_LABEL[hotel.tier]}</StatusBadge>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-white/62">
                          {formatMoney(hotel.price_night_min_minor, hotel.currency)} to{" "}
                          {formatMoney(hotel.price_night_max_minor, hotel.currency)} per night
                        </p>
                      </Link>
                    ))
                  ) : (
                    <p className="rounded-[1rem] border border-white/10 bg-white/[.045] p-4 text-sm text-white/62">
                      No specific stay picks are seeded here yet. Use this district as a style guide and check nearby stations.
                    </p>
                  )}
                </div>
              </JourneeGlassPanel>

              <JourneeGlassPanel className="p-6">
                <div className="flex items-center gap-3">
                  <Compass className="h-5 w-5 text-[#f4c96c]" />
                  <h2 className="text-2xl font-semibold text-white">Local hidden gems</h2>
                </div>
                <div className="mt-5 grid gap-3">
                  {activeGems.length > 0 ? (
                    activeGems.map((gem) => (
                      <Link
                        key={gem.slug}
                        href={routes.cityHiddenGem(city.slug, gem.slug)}
                        className="rounded-[1rem] border border-white/10 bg-white/[.045] p-4 transition hover:border-[#f4c96c]/38 hover:bg-[#f4c96c]/10"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f4c96c]">
                          {gem.category}
                        </p>
                        <h3 className="mt-2 font-semibold text-white">{gem.name}</h3>
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/62">{gem.why}</p>
                      </Link>
                    ))
                  ) : (
                    <p className="rounded-[1rem] border border-white/10 bg-white/[.045] p-4 text-sm leading-6 text-white/62">
                      This district is still waiting for seeded hidden gems. Start with side streets near the main transit hub.
                    </p>
                  )}
                </div>
              </JourneeGlassPanel>
            </section>

            <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <JourneeGlassPanel className="p-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-[#55d6be]" />
                  <h2 className="text-2xl font-semibold text-white">Safety and traveler fit</h2>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/68">
                  {activeProfile.safetyLabel}. The main tradeoff is pace: a more electric base rewards confident travelers,
                  while a calmer base gives families, photographers, and early risers more breathing room.
                </p>
                <div className="mt-5 grid gap-4">
                  <MetricBar label="Safety comfort" value={activeProfile.safety} />
                  <MetricBar label="Pacing" value={activeProfile.pace} />
                </div>
              </JourneeGlassPanel>

              <JourneeGlassPanel tone="dark" className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f38a7d]">
                      Suggested by travel style
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">Find your district match</h2>
                  </div>
                  <Users className="h-6 w-6 text-white/50" />
                </div>
                <SegmentedTabs
                  items={styleTabs}
                  value={travelStyle}
                  onValueChange={setTravelStyle}
                  aria-label="Travel style"
                  variant="underline"
                  className="mt-5"
                />
                <div className="mt-5 grid gap-3">
                  {styleMatches.map(({ neighborhood, score }, index) => (
                    <button
                      key={neighborhood.slug}
                      type="button"
                      onClick={() => setActiveSlug(neighborhood.slug)}
                      className={cn(
                        "flex items-center gap-4 rounded-[1rem] border p-4 text-left transition hover:-translate-y-0.5",
                        neighborhood.slug === activeNeighborhood.slug
                          ? "border-[#f4c96c]/40 bg-[#f4c96c]/13"
                          : "border-white/10 bg-white/[.045] hover:bg-white/[.07]",
                      )}
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-bold text-[#f4c96c]">
                        {index + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-white">{neighborhood.name}</span>
                        <span className="mt-1 block text-sm text-white/58">{getFitLabel(score)}</span>
                      </span>
                      <span className="text-sm font-semibold text-[#55d6be]">{Math.round(score)}</span>
                    </button>
                  ))}
                </div>
              </JourneeGlassPanel>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
