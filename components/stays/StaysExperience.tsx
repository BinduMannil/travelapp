"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Crown,
  Heart,
  Hotel,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  UserRound,
  UsersRound,
} from "lucide-react";
import { CinematicTopNav } from "@/components/layout/CinematicTopNav";
import { TopNavSearch } from "@/components/search/TopNavSearch";
import { JourneeGlassPanel } from "@/components/ui/JourneeGlassPanel";
import { SegmentedTabs } from "@/components/ui/SegmentedTabs";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { mainNavigation } from "@/lib/routes";
import { cn } from "@/lib/utils";

type StayMood = "Editorial" | "Solo Calm" | "Rooftop Glow" | "Ryokan Ritual";
type StayMoodFilter = "All moods" | StayMood;
type SortMode = "Curated" | "Value" | "Rating";
type BudgetRange = "$50 - $150" | "$150 - $300" | "$300+";

type Stay = {
  name: string;
  location: string;
  image: string;
  rating: number;
  mood: StayMood;
  tags: string[];
  guestRating: string;
  amenities: string[];
  price: number;
  total?: string;
  neighborhood: string;
  safety: string;
  type: string;
  highlight: string;
};

const avatar =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80";

const heroFrames = [
  {
    place: "Kyoto at blue hour",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2400&q=88",
  },
  {
    place: "Bangkok above the rain",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2400&q=88",
  },
  {
    place: "Copenhagen in soft morning light",
    image:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=2400&q=88",
  },
] as const;

const stays: Stay[] = [
  {
    name: "Sora Niwa Terrace Kyoto",
    location: "Kyoto, Japan",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=86",
    rating: 4.8,
    mood: "Ryokan Ritual",
    tags: ["Ryokan", "Onsen", "Quiet luxury"],
    guestRating: "9.4 Superb",
    amenities: ["Breakfast", "Onsen"],
    price: 196,
    total: "$784",
    neighborhood: "Gion edge",
    safety: "Excellent",
    type: "Ryokan",
    highlight: "Lantern-lit terraces, cedar baths, and a soft walk home after dinner.",
  },
  {
    name: "MIMARU Kyoto Shinmachi Sanjo",
    location: "Kyoto, Japan",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=86",
    rating: 4.7,
    mood: "Solo Calm",
    tags: ["Apartment", "Solo friendly", "Long stay"],
    guestRating: "9.2 Superb",
    amenities: ["Free Wi-Fi", "Kitchenette"],
    price: 112,
    total: "$448",
    neighborhood: "Shinmachi",
    safety: "Excellent",
    type: "Apartment",
    highlight: "An elegant base for slow mornings, craft lanes, and unrushed temple days.",
  },
  {
    name: "The Siam Riverside Atelier",
    location: "Bangkok, Thailand",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=86",
    rating: 4.6,
    mood: "Rooftop Glow",
    tags: ["Boutique", "Pool", "Riverside"],
    guestRating: "9.1 Superb",
    amenities: ["Pool", "Transfer"],
    price: 88,
    total: "$352",
    neighborhood: "Charoen Krung",
    safety: "Very good",
    type: "Boutique",
    highlight: "Polished city energy with golden water views and late-night street food nearby.",
  },
  {
    name: "Zoku Copenhagen",
    location: "Copenhagen, Denmark",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=86",
    rating: 4.7,
    mood: "Editorial",
    tags: ["Apartment", "Design-led", "Work friendly"],
    guestRating: "9.2 Superb",
    amenities: ["Free Wi-Fi", "Kitchen"],
    price: 128,
    total: "$512",
    neighborhood: "Amager",
    safety: "Excellent",
    type: "Apartment",
    highlight: "A warm, design-forward loft that makes a longer stay feel composed.",
  },
  {
    name: "Lub d Bangkok Siam",
    location: "Bangkok, Thailand",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1100&q=84",
    rating: 4.5,
    mood: "Solo Calm",
    tags: ["Hostel", "Solo friendly", "Central"],
    guestRating: "9.0 Great",
    amenities: ["Free Wi-Fi"],
    price: 42,
    neighborhood: "Siam",
    safety: "Very good",
    type: "Hostel",
    highlight: "Easy arrivals, friendly common rooms, and transit at your doorstep.",
  },
  {
    name: "Aman Kyoto Garden Pavilion",
    location: "Kyoto, Japan",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1100&q=84",
    rating: 4.9,
    mood: "Ryokan Ritual",
    tags: ["Luxury", "Garden", "Wellness"],
    guestRating: "9.7 Exceptional",
    amenities: ["Breakfast", "Spa"],
    price: 410,
    total: "$1,640",
    neighborhood: "Takagamine",
    safety: "Excellent",
    type: "Luxury",
    highlight: "A hushed garden retreat for the version of the trip you still talk about years later.",
  },
];

const stayStyles = [
  { label: "All styles", icon: Sparkles },
  { label: "Boutique", icon: Hotel },
  { label: "Luxury", icon: Crown },
  { label: "Ryokan", icon: Sparkles },
  { label: "Hostel", icon: UsersRound },
  { label: "Apartment", icon: Hotel },
];

const amenities = ["Free cancellation", "Breakfast", "Free Wi-Fi", "Transfer", "Pool"];
const moods: StayMoodFilter[] = ["All moods", "Editorial", "Solo Calm", "Rooftop Glow", "Ryokan Ritual"];
const budgetRanges: BudgetRange[] = ["$50 - $150", "$150 - $300", "$300+"];
const sortModes: SortMode[] = ["Curated", "Value", "Rating"];

const recommendationLinks = [
  {
    title: "Best for solo arrivals",
    copy: "Calm lobbies, trusted neighborhoods, easy late check-in.",
    icon: UserRound,
  },
  {
    title: "Romantic quiet luxury",
    copy: "Small hotels with texture, intimacy, and memorable light.",
    icon: Crown,
  },
  {
    title: "Long-stay sanctuaries",
    copy: "Apartments and suites made for slower travel rhythms.",
    icon: Hotel,
  },
];

const guides = [
  {
    title: "Kyoto: where to stay when atmosphere matters",
    copy: "Gion, Shinmachi, Higashiyama, and the quieter temple edges.",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=520&q=82",
  },
  {
    title: "Hotel safety without losing the romance",
    copy: "The details that make a stay feel protected, not sterile.",
    image:
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=520&q=82",
  },
  {
    title: "Ryokan, boutique hotel, or apartment?",
    copy: "Match the stay to the emotional texture of the trip.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=520&q=82",
  },
];

export function StaysExperience() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [destination, setDestination] = useState("Kyoto, Japan");
  const [budget, setBudget] = useState<BudgetRange>("$150 - $300");
  const [mood, setMood] = useState<StayMoodFilter>("All moods");
  const [sortMode, setSortMode] = useState<SortMode>("Curated");
  const [selectedStyle, setSelectedStyle] = useState("All styles");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(["Free cancellation"]);
  const [soloFriendly, setSoloFriendly] = useState(true);
  const [savedStays, setSavedStays] = useState<string[]>(["Sora Niwa Terrace Kyoto"]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroFrames.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, []);

  const filteredStays = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const [min, max] =
      budget === "$50 - $150" ? [0, 150] : budget === "$150 - $300" ? [100, 300] : [250, Infinity];

    return stays
      .filter((stay) => {
        const matchesQuery =
          !normalizedQuery ||
          [stay.name, stay.location, stay.neighborhood, stay.type, stay.mood]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);
        const matchesDestination =
          destination === "Everywhere" || stay.location.toLowerCase().includes(destination.split(",")[0].toLowerCase());
        const matchesBudget = stay.price >= min && stay.price <= max;
        const matchesMood = mood === "All moods" || stay.mood === mood;
        const matchesStyle = selectedStyle === "All styles" || stay.type === selectedStyle;
        const matchesSolo = !soloFriendly || stay.tags.some((tag) => tag.toLowerCase().includes("solo")) || stay.safety === "Excellent";
        const matchesAmenities =
          selectedAmenities.length === 0 ||
          selectedAmenities.some((amenity) => stay.amenities.join(" ").toLowerCase().includes(amenity.toLowerCase().replace("free cancellation", "")));

        return matchesQuery && matchesDestination && matchesBudget && matchesMood && matchesStyle && matchesSolo && matchesAmenities;
      })
      .sort((first, second) => {
        if (sortMode === "Value") return first.price - second.price;
        if (sortMode === "Rating") return second.rating - first.rating;
        return second.rating - first.rating;
      });
  }, [budget, destination, mood, query, selectedAmenities, selectedStyle, soloFriendly, sortMode]);

  const featuredStays = filteredStays.slice(0, 3);
  const featuredStayNames = new Set(featuredStays.map((stay) => stay.name));
  const quietStays = filteredStays.filter(
    (stay) => !featuredStayNames.has(stay.name) && (stay.mood === "Solo Calm" || stay.safety === "Excellent"),
  );
  const activeFrame = heroFrames[heroIndex];

  function toggleAmenity(amenity: string) {
    setSelectedAmenities((current) =>
      current.includes(amenity) ? current.filter((item) => item !== amenity) : [...current, amenity],
    );
  }

  function toggleSaved(stayName: string) {
    setSavedStays((current) =>
      current.includes(stayName) ? current.filter((item) => item !== stayName) : [...current, stayName],
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#030605] text-white">
      <CinematicTopNav
        navItems={mainNavigation.slice(0, 9)}
        navBreakpointClassName="xl:flex"
        search={
          <TopNavSearch
            value={query}
            onValueChange={setQuery}
            onSearchSubmit={(value) => setQuery(value)}
            placeholder="Search stays, cities, moods..."
            label="Search stays"
            className="ml-auto"
          />
        }
        notificationCount={2}
        avatarSrc={avatar}
      />

      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(232,199,123,.18),transparent_28rem),radial-gradient(circle_at_80%_12%,rgba(76,121,112,.16),transparent_30rem),linear-gradient(180deg,#030605_0%,#07110f_48%,#030605_100%)]" />

      <section className="relative isolate px-4 pt-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <HeroBanner
            activeFrame={activeFrame}
            heroIndex={heroIndex}
            setHeroIndex={setHeroIndex}
            destination={destination}
            setDestination={setDestination}
            query={query}
            setQuery={setQuery}
          />
        </div>
      </section>

      <section className="relative mx-auto grid max-w-[1500px] gap-7 px-4 pb-16 pt-7 sm:px-6 lg:px-10 xl:grid-cols-[290px_minmax(0,1fr)_330px]">
        <aside className="hidden xl:block">
          <FiltersPanel
            budget={budget}
            setBudget={setBudget}
            mood={mood}
            setMood={setMood}
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
            selectedAmenities={selectedAmenities}
            toggleAmenity={toggleAmenity}
            soloFriendly={soloFriendly}
            setSoloFriendly={setSoloFriendly}
            resultCount={filteredStays.length}
          />
        </aside>

        <section className="min-w-0 space-y-8">
          <MobileFilters
            budget={budget}
            setBudget={setBudget}
            mood={mood}
            setMood={setMood}
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
            selectedAmenities={selectedAmenities}
            toggleAmenity={toggleAmenity}
            soloFriendly={soloFriendly}
            setSoloFriendly={setSoloFriendly}
            resultCount={filteredStays.length}
          />

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#e8c77b]">
                Accommodation moodboard
              </p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-white sm:text-5xl">
                Stays with a sense of place.
              </h2>
            </div>
            <SegmentedTabs
              aria-label="Sort stays"
              items={sortModes.map((item) => ({ value: item, label: item }))}
              value={sortMode}
              onValueChange={setSortMode}
              className="w-full max-w-full lg:w-auto"
            />
          </div>

          <StaySection
            title="Curated for tonight's mood"
            stays={featuredStays}
            variant="featured"
            savedStays={savedStays}
            onToggleSaved={toggleSaved}
          />
          <StaySection
            title="Calm bases for solo arrivals"
            stays={quietStays}
            variant="compact"
            savedStays={savedStays}
            onToggleSaved={toggleSaved}
          />
          <AssuranceStrip />
        </section>

        <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
          <RightSidebar
            destination={destination}
            activeFrame={activeFrame}
            savedCount={savedStays.length}
            setDestination={setDestination}
          />
        </aside>
      </section>
    </main>
  );
}

function HeroBanner({
  activeFrame,
  heroIndex,
  setHeroIndex,
  destination,
  setDestination,
  query,
  setQuery,
}: {
  activeFrame: (typeof heroFrames)[number];
  heroIndex: number;
  setHeroIndex: (index: number) => void;
  destination: string;
  setDestination: (value: string) => void;
  query: string;
  setQuery: (value: string) => void;
}) {
  return (
    <section className="relative min-h-[34rem] overflow-hidden rounded-[1.75rem] border border-white/12 shadow-[0_38px_120px_rgba(0,0,0,.5)] lg:min-h-[40rem]">
      {heroFrames.map((frame, index) => (
        <div
          key={frame.place}
          className={cn(
            "absolute inset-0 bg-cover bg-center transition duration-1000 motion-safe:scale-105",
            index === heroIndex ? "opacity-100" : "opacity-0",
          )}
          style={{ backgroundImage: `url(${frame.image})` }}
          aria-hidden="true"
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,6,5,.96)_0%,rgba(3,6,5,.72)_47%,rgba(3,6,5,.24)_100%),linear-gradient(180deg,rgba(3,6,5,.1),rgba(3,6,5,.72))]" />
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#030605] to-transparent" />
      <div className="absolute left-[12%] top-[18%] h-56 w-56 rounded-full bg-[#e8c77b]/18 blur-3xl motion-safe:animate-pulse" />

      <div className="relative z-10 grid min-h-[34rem] items-end gap-8 p-5 sm:p-8 lg:min-h-[40rem] lg:grid-cols-[1fr_24rem] lg:p-10">
        <div className="pb-5 lg:pb-10">
          <StatusBadge variant="premium" className="mb-6 border-white/14 bg-black/26 text-[#f8df9c]">
            {activeFrame.place}
          </StatusBadge>
          <h1 className="max-w-4xl font-display text-5xl leading-none text-white sm:text-7xl lg:text-8xl">
            Sleep somewhere the journey can breathe.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
            Cinematic hotels, ryokans, apartments, and intimate hideaways selected for mood,
            safety, location, and the quiet pleasure of arriving well.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Calm arrivals", "Warm interiors", "Verified atmosphere"].map((label) => (
              <span key={label} className="rounded-full border border-white/14 bg-black/24 px-4 py-2 text-xs font-semibold uppercase tracking-[.18em] text-white/72 backdrop-blur">
                {label}
              </span>
            ))}
          </div>
        </div>

        <JourneeGlassPanel className="rounded-[1.5rem] border-white/14 bg-black/42 p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#e8c77b]">Find the feeling</p>
          <div className="mt-4 space-y-3">
            <SearchField value={query} onChange={setQuery} />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {["Kyoto, Japan", "Bangkok, Thailand", "Everywhere"].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setDestination(city)}
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-left text-sm transition duration-300",
                    destination === city
                      ? "border-[#e8c77b] bg-[#e8c77b]/16 text-[#f8df9c]"
                      : "border-white/12 bg-white/[.055] text-white/72 hover:border-[#e8c77b]/50 hover:text-white",
                  )}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-5 flex gap-2" aria-label="Hero images">
            {heroFrames.map((frame, index) => (
              <button
                key={frame.place}
                type="button"
                onClick={() => setHeroIndex(index)}
                aria-label={`Show ${frame.place}`}
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

function SearchField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="flex min-h-14 items-center rounded-2xl border border-white/14 bg-white/[.075] px-4 transition focus-within:border-[#e8c77b] focus-within:bg-white/[.11]">
      <Search className="mr-3 h-4 w-4 shrink-0 text-[#e8c77b]" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search ryokan, pool, quiet, Gion..."
        className="min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/42"
      />
    </label>
  );
}

function FiltersPanel(props: {
  budget: BudgetRange;
  setBudget: (value: BudgetRange) => void;
  mood: StayMoodFilter;
  setMood: (value: StayMoodFilter) => void;
  selectedStyle: string;
  setSelectedStyle: (value: string) => void;
  selectedAmenities: string[];
  toggleAmenity: (value: string) => void;
  soloFriendly: boolean;
  setSoloFriendly: (value: boolean) => void;
  resultCount: number;
}) {
  return (
    <JourneeGlassPanel as="div" tone="dark" className="sticky top-24 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#e8c77b]">Stay preferences</p>
          <h2 className="mt-2 font-display text-2xl text-white">Refine the atmosphere.</h2>
        </div>
        <SlidersHorizontal className="mt-1 h-5 w-5 text-[#e8c77b]" />
      </div>

      <div className="mt-6 space-y-3">
        <Field icon={MapPin} label="Kyoto, Bangkok, or everywhere" />
        <Field icon={CalendarDays} label="May 20 - May 24" value="4 nights" />
        <Field icon={UserRound} label="1 guest, 1 room" chevron />
      </div>

      <FilterBlock title="Budget per night">
        <div className="grid gap-2">
          {budgetRanges.map((range) => (
            <button
              type="button"
              key={range}
              onClick={() => props.setBudget(range)}
              className={cn(
                "rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition duration-300",
                props.budget === range
                  ? "border-[#e8c77b] bg-[#e8c77b]/16 text-[#f8df9c] shadow-[0_16px_42px_rgba(232,199,123,.12)]"
                  : "border-white/10 bg-white/[0.045] text-white/70 hover:border-[#e8c77b]/45 hover:text-white",
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Mood">
        <SegmentedTabs
          aria-label="Stay mood"
          items={moods.map((item) => ({ value: item, label: item }))}
          value={props.mood}
          onValueChange={props.setMood}
          className="rounded-2xl"
          itemClassName="text-xs"
        />
      </FilterBlock>

      <FilterBlock title="Stay style">
        <div className="grid grid-cols-2 gap-2">
          {stayStyles.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => props.setSelectedStyle(label)}
              className={cn(
                "min-h-20 rounded-2xl border px-3 py-3 text-left text-xs font-semibold transition duration-300",
                props.selectedStyle === label
                  ? "border-[#e8c77b] bg-[#e8c77b]/16 text-[#f8df9c]"
                  : "border-white/10 bg-white/[0.045] text-white/72 hover:border-[#e8c77b]/45 hover:text-white",
              )}
            >
              <Icon className="mb-3 h-4 w-4 text-[#e8c77b]" />
              {label}
            </button>
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Assurance">
        <button
          type="button"
          onClick={() => props.setSoloFriendly(!props.soloFriendly)}
          className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[.045] px-4 py-3 text-left text-sm text-white/82 transition hover:border-[#e8c77b]/45"
          aria-pressed={props.soloFriendly}
        >
          <span>Solo traveler friendly</span>
          <span className={cn("relative h-6 w-11 rounded-full transition", props.soloFriendly ? "bg-[#e8c77b]" : "bg-white/16")}>
            <span className={cn("absolute top-1 h-4 w-4 rounded-full bg-white transition", props.soloFriendly ? "left-6" : "left-1")} />
          </span>
        </button>
      </FilterBlock>

      <FilterBlock title="Amenities">
        <div className="space-y-2">
          {amenities.map((amenity) => {
            const checked = props.selectedAmenities.includes(amenity);
            return (
              <button
                key={amenity}
                type="button"
                onClick={() => props.toggleAmenity(amenity)}
                className="flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left text-sm text-white/78 transition hover:bg-white/[.06] hover:text-white"
                aria-pressed={checked}
              >
                <span className={cn("grid h-5 w-5 place-items-center rounded-md border", checked ? "border-[#e8c77b] bg-[#e8c77b] text-[#120d04]" : "border-white/30")}>
                  {checked ? <Check className="h-3.5 w-3.5" /> : null}
                </span>
                {amenity}
              </button>
            );
          })}
        </div>
      </FilterBlock>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 640, behavior: "smooth" })}
        className="mt-6 w-full rounded-2xl bg-[#e8c77b] px-5 py-4 text-sm font-extrabold uppercase tracking-[.18em] text-[#120d04] shadow-[0_18px_48px_rgba(232,199,123,.24)] transition hover:-translate-y-0.5 hover:bg-white"
      >
        Show {props.resultCount} stays
      </button>
    </JourneeGlassPanel>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-7">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[.22em] text-[#e8c77b]">{title}</h3>
      {children}
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  chevron = false,
}: {
  icon: typeof MapPin;
  label: string;
  value?: string;
  chevron?: boolean;
}) {
  return (
    <button
      type="button"
      className="flex min-h-12 w-full items-center rounded-2xl border border-white/10 bg-white/[0.045] px-3 text-left text-sm text-white/78 transition hover:border-[#e8c77b]/45 hover:text-white"
    >
      <Icon className="mr-2.5 h-4 w-4 text-[#e8c77b]" />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {value ? <span className="ml-3 shrink-0 text-xs text-white/58">{value}</span> : null}
      {chevron ? <ChevronDown className="ml-2 h-4 w-4 text-white/54" /> : null}
    </button>
  );
}

function MobileFilters(props: React.ComponentProps<typeof FiltersPanel>) {
  return (
    <details className="group xl:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between rounded-[1.25rem] border border-white/12 bg-white/[.06] px-4 py-4 text-sm font-semibold text-white backdrop-blur-2xl">
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[#e8c77b]" />
          Filters & stay preferences
        </span>
        <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
      </summary>
      <div className="mt-3">
        <FiltersPanel {...props} />
      </div>
    </details>
  );
}

function StaySection({
  title,
  stays,
  variant,
  savedStays,
  onToggleSaved,
}: {
  title: string;
  stays: Stay[];
  variant: "featured" | "compact";
  savedStays: string[];
  onToggleSaved: (stayName: string) => void;
}) {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#e8c77b]">{title}</p>
          <p className="mt-2 text-sm text-white/58">{stays.length} atmospheric matches</p>
        </div>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="rounded-full border border-white/12 px-4 py-2 text-sm font-semibold text-white/72 transition hover:border-[#e8c77b]/50 hover:text-white"
        >
          Refine
        </button>
      </div>
      {stays.length > 0 ? (
        <div className={variant === "featured" ? "grid gap-5 lg:grid-cols-3" : "grid gap-5 sm:grid-cols-2 2xl:grid-cols-3"}>
          {stays.map((stay) => (
            <StayCard
              key={stay.name}
              stay={stay}
              variant={variant}
              saved={savedStays.includes(stay.name)}
              onToggleSaved={onToggleSaved}
            />
          ))}
        </div>
      ) : (
        <JourneeGlassPanel className="p-7 text-center">
          <p className="font-display text-3xl text-white">No stays match that exact mood.</p>
          <p className="mt-3 text-sm leading-6 text-white/62">Try widening the budget or clearing an amenity.</p>
        </JourneeGlassPanel>
      )}
    </section>
  );
}

function StayCard({
  stay,
  variant,
  saved,
  onToggleSaved,
}: {
  stay: Stay;
  variant: "featured" | "compact";
  saved: boolean;
  onToggleSaved: (stayName: string) => void;
}) {
  return (
    <article className="group overflow-hidden rounded-[1.35rem] border border-white/12 bg-white/[.055] shadow-[0_24px_80px_rgba(0,0,0,.28)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#e8c77b]/48 hover:bg-white/[.075]">
      <div className={cn("relative overflow-hidden", variant === "featured" ? "h-72" : "h-56")}>
        <img
          src={stay.image}
          alt=""
          className="h-full w-full object-cover brightness-[.82] saturate-[.94] transition duration-700 group-hover:scale-105 group-hover:brightness-95"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,6,5,.08),rgba(3,6,5,.18)_42%,rgba(3,6,5,.9))]" />
        <div className="absolute left-4 top-4 flex gap-2">
          <StatusBadge variant="premium" className="border-black/20 bg-black/42 text-[#f8df9c] backdrop-blur">
            <Star className="mr-1 h-3.5 w-3.5 fill-[#e8c77b]" />
            {stay.rating}
          </StatusBadge>
        </div>
        <button
          type="button"
          aria-label={saved ? `Unsave ${stay.name}` : `Save ${stay.name}`}
          aria-pressed={saved}
          onClick={() => onToggleSaved(stay.name)}
          className={cn(
            "absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border backdrop-blur transition",
            saved
              ? "border-[#e8c77b] bg-[#e8c77b] text-[#130f0a]"
              : "border-white/16 bg-black/34 text-white hover:border-[#e8c77b]/60",
          )}
        >
          <Heart className={cn("h-4 w-4", saved && "fill-current")} />
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#e8c77b]">{stay.neighborhood}</p>
          <h3 className="mt-2 font-display text-3xl leading-tight text-white">{stay.name}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="flex items-center gap-2 text-sm text-white/66">
          <MapPin className="h-4 w-4 text-[#e8c77b]" />
          {stay.location}
        </p>
        <p className="mt-4 min-h-12 text-sm leading-6 text-white/68">{stay.highlight}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {stay.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/12 bg-white/[0.045] px-3 py-1 text-xs text-white/72">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2">
          <Meta label="Guest mood" value={stay.guestRating} />
          <Meta label="Safety" value={stay.safety} />
        </div>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
          <p className="font-display text-3xl text-white">
            ${stay.price} <span className="font-sans text-xs font-medium text-white/58">/ night</span>
          </p>
          {stay.total ? <p className="text-xs font-semibold uppercase tracking-[.16em] text-white/48">Total {stay.total}</p> : null}
        </div>
      </div>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-white/42">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white/82">{value}</p>
    </div>
  );
}

function AssuranceStrip() {
  const items = [
    { title: "Solo traveler support", copy: "Arrival details and neighborhood confidence built into the shortlist.", icon: UserRound },
    { title: "Safety first", copy: "High guest confidence without flattening the romance of the stay.", icon: ShieldCheck },
    { title: "Flexible booking", copy: "Cancellation and timing signals are visible before you commit.", icon: Hotel },
    { title: "Human backup", copy: "Journee stays useful if the itinerary changes mid-journey.", icon: Bell },
  ];

  return (
    <JourneeGlassPanel className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(({ title, copy, icon: Icon }) => (
        <div key={title} className="rounded-[1rem] bg-white/[.035] p-4">
          <Icon className="h-6 w-6 text-[#e8c77b]" />
          <h3 className="mt-4 font-display text-xl text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/62">{copy}</p>
        </div>
      ))}
    </JourneeGlassPanel>
  );
}

function RightSidebar({
  destination,
  activeFrame,
  savedCount,
  setDestination,
}: {
  destination: string;
  activeFrame: (typeof heroFrames)[number];
  savedCount: number;
  setDestination: (value: string) => void;
}) {
  return (
    <>
      <JourneeGlassPanel tone="gold" className="overflow-hidden p-5">
        <div className="relative -mx-5 -mt-5 h-44">
          <img src={activeFrame.image} alt="" className="h-full w-full object-cover brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090806] to-transparent" />
        </div>
        <div className="mt-5 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#e8c77b]">Where you are going</p>
            <h2 className="mt-2 font-display text-3xl text-white">{destination}</h2>
          </div>
          <button
            type="button"
            onClick={() => setDestination(destination === "Kyoto, Japan" ? "Bangkok, Thailand" : "Kyoto, Japan")}
            className="rounded-full border border-white/14 px-3 py-1.5 text-xs font-semibold text-white/72 transition hover:border-[#e8c77b]/55 hover:text-white"
          >
            Edit
          </button>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-white/68">
          <Meta label="Dates" value="May 20 - 24" />
          <Meta label="Saved" value={`${savedCount} stays`} />
        </div>
      </JourneeGlassPanel>

      <JourneeGlassPanel className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[.24em] text-[#e8c77b]">Recommendation paths</h2>
          <ChevronRight className="h-4 w-4 text-white/42" />
        </div>
        <div className="space-y-3">
          {recommendationLinks.map(({ title, copy, icon: Icon }) => (
            <button
              key={title}
              type="button"
              className="flex w-full items-center gap-4 rounded-[1rem] p-3 text-left transition hover:bg-white/[.06]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#e8c77b]/14 text-[#e8c77b]">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-white">{title}</span>
                <span className="mt-1 block text-xs leading-5 text-white/58">{copy}</span>
              </span>
            </button>
          ))}
        </div>
      </JourneeGlassPanel>

      <JourneeGlassPanel className="p-5">
        <h2 className="text-xs font-semibold uppercase tracking-[.24em] text-[#e8c77b]">Stay guides</h2>
        <div className="mt-5 space-y-4">
          {guides.map((guide) => (
            <button key={guide.title} type="button" className="group flex w-full gap-4 rounded-[1rem] text-left transition hover:bg-white/[.05]">
              <img src={guide.image} alt="" className="h-24 w-24 shrink-0 rounded-[1rem] object-cover brightness-90 transition group-hover:brightness-105" />
              <span className="min-w-0 py-1">
                <span className="block font-display text-lg leading-snug text-white">{guide.title}</span>
                <span className="mt-2 block text-xs leading-5 text-white/58">{guide.copy}</span>
              </span>
            </button>
          ))}
        </div>
      </JourneeGlassPanel>

      <JourneeGlassPanel className="p-5">
        <h2 className="text-xs font-semibold uppercase tracking-[.24em] text-[#e8c77b]">Why Journee</h2>
        <div className="mt-5 space-y-3">
          {["Handpicked atmosphere", "Transparent stay signals", "Trusted solo context", "Secure booking flow"].map((item) => (
            <p key={item} className="flex items-center gap-3 text-sm text-white/78">
              <Check className="h-4 w-4 text-[#e8c77b]" />
              {item}
            </p>
          ))}
        </div>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-5 w-full rounded-2xl border border-[#e8c77b]/70 px-4 py-3 text-sm font-semibold text-[#f8df9c] transition hover:bg-[#e8c77b] hover:text-[#120d04]"
        >
          Start over
        </button>
      </JourneeGlassPanel>
    </>
  );
}
