"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  CircleDollarSign,
  Hotel,
  Landmark,
  Minus,
  Plane,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrainFront,
  Utensils,
} from "lucide-react";
import { CinematicTopNav } from "@/components/layout/CinematicTopNav";
import { TopNavSearch } from "@/components/search/TopNavSearch";
import { JourneeGlassPanel } from "@/components/ui/JourneeGlassPanel";
import { SegmentedTabs } from "@/components/ui/SegmentedTabs";
import { StatusBadge, type StatusBadgeVariant } from "@/components/ui/StatusBadge";
import { mainNavigation } from "@/lib/routes";
import { cn } from "@/lib/utils";

type BudgetStyle = "Budget" | "Balanced" | "Premium" | "Ultra luxury";
type ComparisonMode = "Solo vs couple" | "Hotel vs hostel" | "Luxury vs balanced";
type DestinationName = "Kyoto" | "Tokyo" | "Bangkok" | "Paris";

type Destination = {
  name: DestinationName;
  country: string;
  baseDaily: number;
  seasonNote: string;
  image: string;
};

type ExpenseCategory = {
  key: string;
  label: string;
  icon: LucideIcon;
  ratio: number;
  color: string;
  note: string;
};

const avatar =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80";

const heroFrames = [
  {
    place: "Kyoto in autumn light",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=2400&q=88",
  },
  {
    place: "Tokyo before departure",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2400&q=88",
  },
  {
    place: "Bangkok after rain",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=2400&q=88",
  },
] as const;

const destinations: Destination[] = [
  {
    name: "Kyoto",
    country: "Japan",
    baseDaily: 188,
    seasonNote: "Autumn leaf season raises stay rates",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=84",
  },
  {
    name: "Tokyo",
    country: "Japan",
    baseDaily: 214,
    seasonNote: "Transit is efficient, hotels drive the range",
    image:
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=900&q=84",
  },
  {
    name: "Bangkok",
    country: "Thailand",
    baseDaily: 118,
    seasonNote: "Excellent value if you avoid riverside peaks",
    image:
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=900&q=84",
  },
  {
    name: "Paris",
    country: "France",
    baseDaily: 248,
    seasonNote: "Weekday arrivals soften hotel costs",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=84",
  },
];

const styleMultipliers: Record<BudgetStyle, number> = {
  Budget: 0.68,
  Balanced: 1,
  Premium: 1.48,
  "Ultra luxury": 2.35,
};

const styleCopy: Record<BudgetStyle, string> = {
  Budget: "Simple stays, local meals, public transit, and selective splurges.",
  Balanced: "Comfortable hotels, memorable meals, sensible transit, and room for delight.",
  Premium: "Design-led stays, private moments, better tables, and generous activity planning.",
  "Ultra luxury": "Exceptional hotels, private transfers, fine dining, and high-touch experiences.",
};

const categoryRatios: Record<BudgetStyle, ExpenseCategory[]> = {
  Budget: [
    { key: "accommodation", label: "Accommodation", ratio: 0.33, icon: Hotel, color: "#e8c77b", note: "Compact rooms and thoughtful locations" },
    { key: "food", label: "Food", ratio: 0.23, icon: Utensils, color: "#dca35e", note: "Local counters and one elevated meal" },
    { key: "transport", label: "Transport", ratio: 0.17, icon: TrainFront, color: "#7fb7aa", note: "Transit-first routing" },
    { key: "activities", label: "Activities", ratio: 0.14, icon: Landmark, color: "#9ebc7a", note: "Selective paid experiences" },
    { key: "shopping", label: "Shopping", ratio: 0.06, icon: ShoppingBag, color: "#c88fac", note: "Small keepsakes" },
    { key: "buffer", label: "Buffer", ratio: 0.07, icon: ShieldCheck, color: "#9aa2ad", note: "Emergency cushion" },
  ],
  Balanced: [
    { key: "accommodation", label: "Accommodation", ratio: 0.39, icon: Hotel, color: "#e8c77b", note: "Comfortable stays in useful neighborhoods" },
    { key: "food", label: "Food", ratio: 0.2, icon: Utensils, color: "#dca35e", note: "Daily local favorites and a few reservations" },
    { key: "transport", label: "Transport", ratio: 0.12, icon: TrainFront, color: "#7fb7aa", note: "Transit plus occasional taxi" },
    { key: "activities", label: "Activities", ratio: 0.15, icon: Landmark, color: "#9ebc7a", note: "Museums, rituals, guided moments" },
    { key: "shopping", label: "Shopping", ratio: 0.07, icon: ShoppingBag, color: "#c88fac", note: "Craft and gifts" },
    { key: "buffer", label: "Buffer", ratio: 0.07, icon: ShieldCheck, color: "#9aa2ad", note: "A calm margin" },
  ],
  Premium: [
    { key: "accommodation", label: "Accommodation", ratio: 0.45, icon: Hotel, color: "#e8c77b", note: "Boutique hotels and better views" },
    { key: "food", label: "Food", ratio: 0.19, icon: Utensils, color: "#dca35e", note: "Reservations and special meals" },
    { key: "transport", label: "Transport", ratio: 0.11, icon: TrainFront, color: "#7fb7aa", note: "Fewer friction points" },
    { key: "activities", label: "Activities", ratio: 0.13, icon: Landmark, color: "#9ebc7a", note: "Curated experiences" },
    { key: "shopping", label: "Shopping", ratio: 0.06, icon: ShoppingBag, color: "#c88fac", note: "Design and artisan purchases" },
    { key: "buffer", label: "Buffer", ratio: 0.06, icon: ShieldCheck, color: "#9aa2ad", note: "Premium flexibility" },
  ],
  "Ultra luxury": [
    { key: "accommodation", label: "Accommodation", ratio: 0.52, icon: Hotel, color: "#e8c77b", note: "Signature suites and destination hotels" },
    { key: "food", label: "Food", ratio: 0.18, icon: Utensils, color: "#dca35e", note: "Fine dining and private tastings" },
    { key: "transport", label: "Transport", ratio: 0.1, icon: TrainFront, color: "#7fb7aa", note: "Private transfers where useful" },
    { key: "activities", label: "Activities", ratio: 0.1, icon: Landmark, color: "#9ebc7a", note: "Access-led experiences" },
    { key: "shopping", label: "Shopping", ratio: 0.05, icon: ShoppingBag, color: "#c88fac", note: "Selective luxury retail" },
    { key: "buffer", label: "Buffer", ratio: 0.05, icon: ShieldCheck, color: "#9aa2ad", note: "White-glove contingency" },
  ],
};

const savedPlans = [
  {
    name: "Kyoto autumn reset",
    style: "Balanced",
    total: "$2,632",
    meta: "7 days · 2 travelers",
    image:
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=900&q=84",
  },
  {
    name: "Bangkok golden weekender",
    style: "Premium",
    total: "$1,398",
    meta: "4 days · 2 travelers",
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=900&q=84",
  },
  {
    name: "Paris slow spring",
    style: "Budget",
    total: "$1,520",
    meta: "6 days · 1 traveler",
    image:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=84",
  },
];

const comparisonModes: ComparisonMode[] = ["Solo vs couple", "Hotel vs hostel", "Luxury vs balanced"];
const budgetStyles: BudgetStyle[] = ["Budget", "Balanced", "Premium", "Ultra luxury"];

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function BudgetExperience() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [budgetStyle, setBudgetStyle] = useState<BudgetStyle>("Balanced");
  const [destination, setDestination] = useState<DestinationName>("Kyoto");
  const [days, setDays] = useState(8);
  const [travelers, setTravelers] = useState(2);
  const [comparisonMode, setComparisonMode] = useState<ComparisonMode>("Solo vs couple");
  const [includeFlights, setIncludeFlights] = useState(true);
  const [savedPlan, setSavedPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(savedPlans[0].name);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroFrames.length);
    }, 5400);

    return () => window.clearInterval(interval);
  }, []);

  const activeDestination =
    destinations.find((item) => item.name === destination) ?? destinations[0];
  const categories = categoryRatios[budgetStyle];
  const dailyBase = activeDestination.baseDaily * styleMultipliers[budgetStyle];
  const travelerMultiplier = travelers === 1 ? 1 : 1 + (travelers - 1) * 0.82;
  const tripSubtotal = dailyBase * days * travelerMultiplier;
  const flightEstimate = includeFlights ? travelers * (destination === "Bangkok" ? 620 : destination === "Paris" ? 860 : 780) : 0;
  const estimatedTotal = Math.round(tripSubtotal + flightEstimate);
  const dailyAverage = Math.round(estimatedTotal / days);
  const categoryValues = categories.map((category) => ({
    ...category,
    amount: Math.round(tripSubtotal * category.ratio),
  }));
  const largestCategory = categoryValues.reduce((largest, category) =>
    category.amount > largest.amount ? category : largest,
  );
  const confidence = Math.max(72, Math.min(96, 91 - (budgetStyle === "Ultra luxury" ? 4 : 0) + (days >= 7 ? 3 : 0)));
  const heroFrame = heroFrames[heroIndex];

  const searchedDestinations = destinations.filter((item) =>
    `${item.name} ${item.country}`.toLowerCase().includes(query.toLowerCase()),
  );

  function changeDays(delta: number) {
    setDays((current) => Math.min(30, Math.max(2, current + delta)));
  }

  function changeTravelers(delta: number) {
    setTravelers((current) => Math.min(8, Math.max(1, current + delta)));
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#030605] text-white">
      <CinematicTopNav
        navItems={mainNavigation.slice(0, 11)}
        navBreakpointClassName="2xl:flex"
        notificationCount={1}
        avatarSrc={avatar}
        search={
          <TopNavSearch
            value={query}
            onValueChange={setQuery}
            onSearchSubmit={(value) => {
              const match = destinations.find((item) =>
                item.name.toLowerCase().includes(value.trim().toLowerCase()),
              );
              if (match) setDestination(match.name);
            }}
            placeholder="Search budget destinations..."
            label="Search budget destinations"
            className="ml-auto"
          />
        }
      />

      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(232,199,123,.18),transparent_28rem),radial-gradient(circle_at_82%_16%,rgba(95,139,126,.16),transparent_32rem),linear-gradient(180deg,#030605_0%,#07110f_48%,#030605_100%)]" />

      <section className="relative isolate px-4 pt-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <HeroSection
            frame={heroFrame}
            heroIndex={heroIndex}
            setHeroIndex={setHeroIndex}
            destination={activeDestination}
            total={estimatedTotal}
            dailyAverage={dailyAverage}
            confidence={confidence}
            savedPlan={savedPlan}
            setSavedPlan={setSavedPlan}
          />
        </div>
      </section>

      <section className="relative mx-auto grid max-w-[1500px] gap-7 px-4 pb-16 pt-7 sm:px-6 lg:px-10 xl:grid-cols-[310px_minmax(0,1fr)] 2xl:grid-cols-[310px_minmax(0,1fr)_330px]">
        <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
          <TripControls
            destination={destination}
            setDestination={setDestination}
            searchedDestinations={searchedDestinations.length ? searchedDestinations : destinations}
            days={days}
            changeDays={changeDays}
            travelers={travelers}
            changeTravelers={changeTravelers}
            includeFlights={includeFlights}
            setIncludeFlights={setIncludeFlights}
          />
        </aside>

        <section className="min-w-0 space-y-8">
          <BudgetStyleSelector value={budgetStyle} onChange={setBudgetStyle} />
          <TripBudgetOverview
            total={estimatedTotal}
            dailyAverage={dailyAverage}
            categories={categoryValues}
            days={days}
            travelers={travelers}
            destination={activeDestination}
            includeFlights={includeFlights}
            flightEstimate={flightEstimate}
          />
          <ExpenseBreakdown categories={categoryValues} total={tripSubtotal} />
          <SmartInsights
            destination={activeDestination}
            budgetStyle={budgetStyle}
            travelers={travelers}
            days={days}
            largestCategory={largestCategory.label}
          />
          <BudgetComparison
            mode={comparisonMode}
            setMode={setComparisonMode}
            dailyBase={dailyBase}
            travelers={travelers}
          />
          <SavedBudgetPlans
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />
          <BudgetCta savedPlan={savedPlan} setSavedPlan={setSavedPlan} />
        </section>

        <aside className="space-y-5 2xl:sticky 2xl:top-24 2xl:self-start">
          <BudgetSideRail
            destination={activeDestination}
            budgetStyle={budgetStyle}
            confidence={confidence}
            total={estimatedTotal}
            dailyAverage={dailyAverage}
            largestCategory={largestCategory.label}
          />
        </aside>
      </section>
    </main>
  );
}

function HeroSection({
  frame,
  heroIndex,
  setHeroIndex,
  destination,
  total,
  dailyAverage,
  confidence,
  savedPlan,
  setSavedPlan,
}: {
  frame: (typeof heroFrames)[number];
  heroIndex: number;
  setHeroIndex: (index: number) => void;
  destination: Destination;
  total: number;
  dailyAverage: number;
  confidence: number;
  savedPlan: boolean;
  setSavedPlan: (value: boolean) => void;
}) {
  return (
    <section className="relative min-h-[34rem] overflow-hidden rounded-[1.75rem] border border-white/12 shadow-[0_38px_120px_rgba(0,0,0,.5)] lg:min-h-[40rem]">
      {heroFrames.map((item, index) => (
        <div
          key={item.place}
          className={cn(
            "absolute inset-0 bg-cover bg-center transition duration-1000 motion-safe:scale-105",
            index === heroIndex ? "opacity-100" : "opacity-0",
          )}
          style={{ backgroundImage: `url(${item.image})` }}
          aria-hidden="true"
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,6,5,.96)_0%,rgba(3,6,5,.72)_46%,rgba(3,6,5,.24)_100%),linear-gradient(180deg,rgba(3,6,5,.08),rgba(3,6,5,.74))]" />
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#030605] to-transparent" />
      <div className="absolute left-[10%] top-[20%] h-56 w-56 rounded-full bg-[#e8c77b]/16 blur-3xl motion-safe:animate-pulse" />

      <div className="relative z-10 grid min-h-[34rem] items-end gap-8 p-5 sm:p-8 lg:min-h-[40rem] lg:grid-cols-[1fr_24rem] lg:p-10">
        <div className="pb-5 lg:pb-10">
          <StatusBadge variant="premium" className="mb-6 border-white/14 bg-black/26 text-[#f8df9c]">
            {frame.place}
          </StatusBadge>
          <h1 className="max-w-5xl font-display text-5xl leading-none text-white sm:text-7xl lg:text-8xl">
            Know what the journey wants from you.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
            A calm financial plan for the trip you can feel already: stays, food, transit,
            experiences, shopping, and the hidden margin that keeps travel graceful.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Realistic totals", "Elegant tradeoffs", "Room for surprise"].map((label) => (
              <span key={label} className="rounded-full border border-white/14 bg-black/24 px-4 py-2 text-xs font-semibold uppercase tracking-[.18em] text-white/72 backdrop-blur">
                {label}
              </span>
            ))}
          </div>
        </div>

        <JourneeGlassPanel className="rounded-[1.5rem] border-white/14 bg-black/42 p-5">
          <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#e8c77b]">
            Estimated plan
          </p>
          <h2 className="mt-3 font-display text-4xl text-white">{money(total)}</h2>
          <p className="mt-2 text-sm leading-6 text-white/62">
            {money(dailyAverage)} per day for {destination.name}, before real booking prices are connected.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <HeroMetric label="Confidence" value={`${confidence}%`} />
            <HeroMetric label="Destination" value={destination.name} />
          </div>
          <button
            type="button"
            onClick={() => setSavedPlan(!savedPlan)}
            className={cn(
              "mt-5 w-full rounded-2xl px-5 py-3 text-sm font-extrabold uppercase tracking-[.18em] transition",
              savedPlan
                ? "border border-[#e8c77b] bg-[#e8c77b]/16 text-[#f8df9c]"
                : "bg-[#e8c77b] text-[#120d04] hover:bg-white",
            )}
          >
            {savedPlan ? "Plan saved" : "Save plan"}
          </button>
          <div className="mt-5 flex gap-2" aria-label="Hero images">
            {heroFrames.map((item, index) => (
              <button
                key={item.place}
                type="button"
                onClick={() => setHeroIndex(index)}
                aria-label={`Show ${item.place}`}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition",
                  index === heroIndex ? "bg-[#e8c77b]" : "bg-white/22 hover:bg-white/44",
                )}
              />
            ))}
          </div>
        </JourneeGlassPanel>
      </div>
    </section>
  );
}

function HeroMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/[.055] p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-white/42">{label}</p>
      <p className="mt-2 font-display text-2xl text-white">{value}</p>
    </div>
  );
}

function TripControls({
  destination,
  setDestination,
  searchedDestinations,
  days,
  changeDays,
  travelers,
  changeTravelers,
  includeFlights,
  setIncludeFlights,
}: {
  destination: DestinationName;
  setDestination: (value: DestinationName) => void;
  searchedDestinations: Destination[];
  days: number;
  changeDays: (delta: number) => void;
  travelers: number;
  changeTravelers: (delta: number) => void;
  includeFlights: boolean;
  setIncludeFlights: (value: boolean) => void;
}) {
  return (
    <JourneeGlassPanel as="div" tone="dark" className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#e8c77b]">Trip controls</p>
          <h2 className="mt-2 font-display text-2xl text-white">Shape the plan.</h2>
        </div>
        <CircleDollarSign className="mt-1 h-5 w-5 text-[#e8c77b]" />
      </div>

      <ControlBlock title="Destination">
        <div className="space-y-2">
          {searchedDestinations.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setDestination(item.name)}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition duration-300",
                destination === item.name
                  ? "border-[#e8c77b] bg-[#e8c77b]/16 text-[#f8df9c]"
                  : "border-white/10 bg-white/[.045] text-white/72 hover:border-[#e8c77b]/45 hover:text-white",
              )}
            >
              <img src={item.image} alt="" className="h-11 w-12 rounded-xl object-cover brightness-90" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">{item.name}</span>
                <span className="block text-xs text-white/48">{item.country}</span>
              </span>
            </button>
          ))}
        </div>
      </ControlBlock>

      <ControlBlock title="Duration">
        <Stepper
          label="Trip days"
          value={days}
          suffix={days === 1 ? "day" : "days"}
          onMinus={() => changeDays(-1)}
          onPlus={() => changeDays(1)}
        />
      </ControlBlock>

      <ControlBlock title="Travelers">
        <Stepper
          label="Travelers"
          value={travelers}
          suffix={travelers === 1 ? "traveler" : "travelers"}
          onMinus={() => changeTravelers(-1)}
          onPlus={() => changeTravelers(1)}
        />
      </ControlBlock>

      <ControlBlock title="Flights">
        <button
          type="button"
          onClick={() => setIncludeFlights(!includeFlights)}
          aria-pressed={includeFlights}
          className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[.045] px-4 py-3 text-left text-sm text-white/82 transition hover:border-[#e8c77b]/45"
        >
          <span className="inline-flex items-center gap-2">
            <Plane className="h-4 w-4 text-[#e8c77b]" />
            Include airfare estimate
          </span>
          <span className={cn("relative h-6 w-11 rounded-full transition", includeFlights ? "bg-[#e8c77b]" : "bg-white/16")}>
            <span className={cn("absolute top-1 h-4 w-4 rounded-full bg-white transition", includeFlights ? "left-6" : "left-1")} />
          </span>
        </button>
      </ControlBlock>
    </JourneeGlassPanel>
  );
}

function ControlBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-7">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[.22em] text-[#e8c77b]">{title}</h3>
      {children}
    </div>
  );
}

function Stepper({
  label,
  value,
  suffix,
  onMinus,
  onPlus,
}: {
  label: string;
  value: number;
  suffix: string;
  onMinus: () => void;
  onPlus: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[.045] p-3">
      <div className="flex items-center justify-between gap-3">
        <span>
          <span className="block text-sm font-semibold text-white">{label}</span>
          <span className="text-xs text-white/48">{value} {suffix}</span>
        </span>
        <span className="flex items-center gap-2">
          <button
            type="button"
            onClick={onMinus}
            aria-label={`Decrease ${label.toLowerCase()}`}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-white/72 transition hover:border-[#e8c77b]/55 hover:text-white"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-9 text-center font-display text-2xl text-white">{value}</span>
          <button
            type="button"
            onClick={onPlus}
            aria-label={`Increase ${label.toLowerCase()}`}
            className="grid h-9 w-9 place-items-center rounded-full bg-[#e8c77b] text-[#120d04] transition hover:bg-white"
          >
            <Plus className="h-4 w-4" />
          </button>
        </span>
      </div>
    </div>
  );
}

function BudgetStyleSelector({
  value,
  onChange,
}: {
  value: BudgetStyle;
  onChange: (value: BudgetStyle) => void;
}) {
  return (
    <JourneeGlassPanel className="p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#e8c77b]">Budget style</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-white sm:text-5xl">
            Choose the financial texture.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/62">{styleCopy[value]}</p>
        </div>
        <SegmentedTabs
          aria-label="Budget style selector"
          items={budgetStyles.map((style) => ({ value: style, label: style }))}
          value={value}
          onValueChange={onChange}
          className="w-full max-w-full lg:w-auto"
          itemClassName="text-xs sm:text-sm"
        />
      </div>
    </JourneeGlassPanel>
  );
}

function TripBudgetOverview({
  total,
  dailyAverage,
  categories,
  days,
  travelers,
  destination,
  includeFlights,
  flightEstimate,
}: {
  total: number;
  dailyAverage: number;
  categories: Array<ExpenseCategory & { amount: number }>;
  days: number;
  travelers: number;
  destination: Destination;
  includeFlights: boolean;
  flightEstimate: number;
}) {
  const metrics = [
    { label: "Estimated total", value: money(total), icon: CircleDollarSign },
    { label: "Daily average", value: money(dailyAverage), icon: CalendarDays },
    { label: "Accommodation", value: money(categories.find((item) => item.key === "accommodation")?.amount ?? 0), icon: Hotel },
    { label: "Food", value: money(categories.find((item) => item.key === "food")?.amount ?? 0), icon: Utensils },
    { label: "Transport", value: money(categories.find((item) => item.key === "transport")?.amount ?? 0), icon: TrainFront },
    { label: "Activities", value: money(categories.find((item) => item.key === "activities")?.amount ?? 0), icon: Landmark },
    { label: "Shopping", value: money(categories.find((item) => item.key === "shopping")?.amount ?? 0), icon: ShoppingBag },
    { label: "Buffer", value: money(categories.find((item) => item.key === "buffer")?.amount ?? 0), icon: ShieldCheck },
  ];

  return (
    <section>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#e8c77b]">Trip budget overview</p>
          <h2 className="mt-2 font-display text-3xl text-white">A realistic cost envelope.</h2>
        </div>
        <StatusBadge variant="premium">{destination.name} · {days} days · {travelers} travelers</StatusBadge>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, icon: Icon }) => (
          <JourneeGlassPanel key={label} className="p-5">
            <Icon className="h-5 w-5 text-[#e8c77b]" />
            <p className="mt-4 text-xs font-semibold uppercase tracking-[.18em] text-white/42">{label}</p>
            <p className="mt-2 font-display text-3xl text-white">{value}</p>
          </JourneeGlassPanel>
        ))}
      </div>
      <JourneeGlassPanel className="mt-4 flex flex-col gap-3 p-5 text-sm leading-6 text-white/64 sm:flex-row sm:items-center sm:justify-between">
        <span>
          Airfare is {includeFlights ? `included at ${money(flightEstimate)}` : "currently excluded"}.
          Destination note: {destination.seasonNote}.
        </span>
        <span className="inline-flex items-center gap-2 text-[#f8df9c]">
          <Sparkles className="h-4 w-4" />
          Built as a planning estimate
        </span>
      </JourneeGlassPanel>
    </section>
  );
}

function ExpenseBreakdown({
  categories,
  total,
}: {
  categories: Array<ExpenseCategory & { amount: number }>;
  total: number;
}) {
  return (
    <JourneeGlassPanel className="p-5 sm:p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#e8c77b]">Expense breakdown</p>
          <h2 className="mt-2 font-display text-3xl text-white">Where the money breathes.</h2>
        </div>
        <p className="text-sm text-white/54">Proportional plan, without spreadsheet energy.</p>
      </div>

      <div className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/22 p-3">
        <div className="flex h-6 overflow-hidden rounded-full bg-white/8">
          {categories.map((category) => (
            <div
              key={category.key}
              className="h-full transition-all duration-500"
              style={{
                width: `${category.ratio * 100}%`,
                background: `linear-gradient(90deg, ${category.color}, rgba(255,255,255,.34))`,
              }}
              title={category.label}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {categories.map((category) => {
          const percent = Math.round(category.ratio * 100);
          const width = Math.max(8, Math.round((category.amount / total) * 100));
          const Icon = category.icon;

          return (
            <article key={category.key} className="rounded-[1.25rem] border border-white/10 bg-white/[.045] p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full" style={{ backgroundColor: `${category.color}28`, color: category.color }}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl text-white">{category.label}</h3>
                    <p className="mt-1 text-xs leading-5 text-white/54">{category.note}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl text-white">{money(category.amount)}</p>
                  <p className="text-xs text-white/44">{percent}%</p>
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-white/8">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${width}%`, backgroundColor: category.color }}
                />
              </div>
            </article>
          );
        })}
      </div>
    </JourneeGlassPanel>
  );
}

function SmartInsights({
  destination,
  budgetStyle,
  travelers,
  days,
  largestCategory,
}: {
  destination: Destination;
  budgetStyle: BudgetStyle;
  travelers: number;
  days: number;
  largestCategory: string;
}) {
  const insights: Array<{ label: string; text: string; variant: StatusBadgeVariant }> = [
    {
      label: "Seasonality",
      text: `${destination.name} in autumn increases hotel costs by roughly 28% during peak color weeks.`,
      variant: "warning",
    },
    {
      label: "Traveler mix",
      text: travelers === 1
        ? "Solo travel lowers transport costs significantly, but accommodation is less shareable."
        : "Shared rooms and transfers make the per-person total calmer for this plan.",
      variant: "success",
    },
    {
      label: "Timing",
      text: "Weekday departures reduce average airfare and soften first-night hotel pressure.",
      variant: "premium",
    },
    {
      label: "Focus",
      text: `${largestCategory} is the main cost driver in a ${budgetStyle.toLowerCase()} plan across ${days} days.`,
      variant: "neutral",
    },
  ];

  return (
    <section>
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#e8c77b]">Smart insights</p>
        <h2 className="mt-2 font-display text-3xl text-white">The small truths that change the plan.</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {insights.map((insight) => (
          <JourneeGlassPanel key={insight.label} className="p-5">
            <StatusBadge variant={insight.variant}>{insight.label}</StatusBadge>
            <p className="mt-4 text-sm leading-7 text-white/72">{insight.text}</p>
          </JourneeGlassPanel>
        ))}
      </div>
    </section>
  );
}

function BudgetComparison({
  mode,
  setMode,
  dailyBase,
  travelers,
}: {
  mode: ComparisonMode;
  setMode: (value: ComparisonMode) => void;
  dailyBase: number;
  travelers: number;
}) {
  const rows =
    mode === "Solo vs couple"
      ? [
          ["Solo", dailyBase, "Maximum independence, higher stay share"],
          ["Couple", dailyBase * 1.82, "Shared rooms lower per-person pressure"],
        ]
      : mode === "Hotel vs hostel"
        ? [
            ["Hotel", dailyBase, "Calmer privacy and stronger location control"],
            ["Hostel", dailyBase * 0.72, "Lower nightly cost, more social texture"],
          ]
        : [
            ["Luxury", dailyBase * 1.48, "Better stays and high-touch experiences"],
            ["Balanced", dailyBase, "Comfortable, grounded, still generous"],
          ];

  const max = Math.max(...rows.map((row) => Number(row[1])));

  return (
    <JourneeGlassPanel className="p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#e8c77b]">Budget comparison modes</p>
          <h2 className="mt-2 font-display text-3xl text-white">Compare the tradeoffs.</h2>
          <p className="mt-2 text-sm text-white/54">Current traveler count: {travelers}</p>
        </div>
        <SegmentedTabs
          aria-label="Budget comparison modes"
          items={comparisonModes.map((item) => ({ value: item, label: item }))}
          value={mode}
          onValueChange={setMode}
          className="w-full max-w-full lg:w-auto"
          itemClassName="text-xs"
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {rows.map(([label, value, copy]) => (
          <article key={String(label)} className="rounded-[1.25rem] border border-white/10 bg-white/[.045] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-3xl text-white">{label}</h3>
                <p className="mt-2 text-sm leading-6 text-white/58">{copy}</p>
              </div>
              <p className="font-display text-3xl text-[#f8df9c]">{money(Number(value))}</p>
            </div>
            <div className="mt-5 h-2 rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-[#e8c77b]"
                style={{ width: `${Math.round((Number(value) / max) * 100)}%` }}
              />
            </div>
          </article>
        ))}
      </div>
    </JourneeGlassPanel>
  );
}

function SavedBudgetPlans({
  selectedPlan,
  setSelectedPlan,
}: {
  selectedPlan: string;
  setSelectedPlan: (value: string) => void;
}) {
  return (
    <section>
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#e8c77b]">Saved budget plans</p>
        <h2 className="mt-2 font-display text-3xl text-white">Plans worth returning to.</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {savedPlans.map((plan) => (
          <button
            key={plan.name}
            type="button"
            onClick={() => setSelectedPlan(plan.name)}
            className={cn(
              "group overflow-hidden rounded-[1.35rem] border bg-white/[.045] text-left shadow-[0_24px_80px_rgba(0,0,0,.24)] backdrop-blur-xl transition duration-500 hover:-translate-y-1",
              selectedPlan === plan.name ? "border-[#e8c77b]/70" : "border-white/12 hover:border-[#e8c77b]/45",
            )}
          >
            <div className="relative h-48">
              <img src={plan.image} alt="" className="h-full w-full object-cover brightness-75 transition duration-700 group-hover:scale-105 group-hover:brightness-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030605] to-transparent" />
              <StatusBadge variant="premium" className="absolute left-4 top-4 border-black/20 bg-black/38">
                {plan.style}
              </StatusBadge>
            </div>
            <div className="p-5">
              <h3 className="font-display text-2xl text-white">{plan.name}</h3>
              <p className="mt-2 text-sm text-white/58">{plan.meta}</p>
              <p className="mt-4 font-display text-3xl text-[#f8df9c]">{plan.total}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function BudgetCta({
  savedPlan,
  setSavedPlan,
}: {
  savedPlan: boolean;
  setSavedPlan: (value: boolean) => void;
}) {
  return (
    <JourneeGlassPanel tone="gold" className="overflow-hidden p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#e8c77b]">Next move</p>
          <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">Turn the numbers into the journey.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/66">
            Save this plan, continue shaping the route, or move straight into atmospheric stays that fit the budget.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <button
            type="button"
            onClick={() => setSavedPlan(!savedPlan)}
            className="rounded-2xl bg-[#e8c77b] px-6 py-4 text-sm font-extrabold uppercase tracking-[.18em] text-[#120d04] transition hover:bg-white"
          >
            {savedPlan ? "Saved" : "Save plan"}
          </button>
          <Link
            href="/journey-builder"
            className="rounded-2xl border border-white/14 px-6 py-4 text-center text-sm font-extrabold uppercase tracking-[.18em] text-white transition hover:border-[#e8c77b]/70 hover:text-[#f8df9c]"
          >
            Journey builder
          </Link>
          <Link
            href="/stays"
            className="rounded-2xl border border-white/14 px-6 py-4 text-center text-sm font-extrabold uppercase tracking-[.18em] text-white transition hover:border-[#e8c77b]/70 hover:text-[#f8df9c]"
          >
            Explore stays
          </Link>
        </div>
      </div>
    </JourneeGlassPanel>
  );
}

function BudgetSideRail({
  destination,
  budgetStyle,
  confidence,
  total,
  dailyAverage,
  largestCategory,
}: {
  destination: Destination;
  budgetStyle: BudgetStyle;
  confidence: number;
  total: number;
  dailyAverage: number;
  largestCategory: string;
}) {
  return (
    <>
      <JourneeGlassPanel tone="gold" className="overflow-hidden p-5">
        <div className="relative -mx-5 -mt-5 h-44">
          <img src={destination.image} alt="" className="h-full w-full object-cover brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090806] to-transparent" />
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[.24em] text-[#e8c77b]">Current plan</p>
        <h2 className="mt-2 font-display text-3xl text-white">{destination.name}, {destination.country}</h2>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <MiniMetric label="Total" value={money(total)} />
          <MiniMetric label="Per day" value={money(dailyAverage)} />
        </div>
      </JourneeGlassPanel>

      <JourneeGlassPanel className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#e8c77b]">Budget confidence</p>
        <div className="mt-5 grid grid-cols-[6rem_minmax(0,1fr)] items-center gap-5">
          <div className="grid h-24 w-24 place-items-center rounded-full p-2" style={{ background: `conic-gradient(#e8c77b 0 ${confidence}%, rgba(255,255,255,.12) ${confidence}% 100%)` }}>
            <div className="grid h-full w-full place-items-center rounded-full bg-[#07100f]">
              <span className="font-display text-2xl text-white">{confidence}%</span>
            </div>
          </div>
          <p className="text-sm leading-6 text-white/66">
            A {budgetStyle.toLowerCase()} plan with {largestCategory.toLowerCase()} as the main lever.
          </p>
        </div>
      </JourneeGlassPanel>

      <JourneeGlassPanel className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#e8c77b]">Quiet reminders</p>
        <div className="mt-5 space-y-3">
          {[
            "Keep a daily cash cushion for temples, taxis, and small vendors.",
            "Book stays before locking fine dining reservations.",
            "Use weekdays for arrivals when the route allows it.",
          ].map((item) => (
            <p key={item} className="flex gap-3 text-sm leading-6 text-white/72">
              <Sparkles className="mt-1 h-4 w-4 shrink-0 text-[#e8c77b]" />
              {item}
            </p>
          ))}
        </div>
      </JourneeGlassPanel>
    </>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[.045] p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-white/42">{label}</p>
      <p className="mt-2 font-display text-2xl text-white">{value}</p>
    </div>
  );
}
