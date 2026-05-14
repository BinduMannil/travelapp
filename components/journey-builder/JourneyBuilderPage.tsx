"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { CinematicTopNav } from "@/components/layout/CinematicTopNav";
import { JourneeGlassPanel } from "@/components/ui/JourneeGlassPanel";
import { SegmentedTabs } from "@/components/ui/SegmentedTabs";
import { StatusBadge } from "@/components/ui/StatusBadge";

type Travelers = "Solo" | "Couple" | "Friends" | "Family";
type Budget = "Budget" | "Balanced" | "Premium" | "Ultra luxury";
type Pace = "Slow" | "Balanced" | "Fast-paced";

const heroFrames = [
  {
    place: "Aman Venice",
    image:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=2400&q=90",
  },
  {
    place: "Kyoto after rain",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2400&q=90",
  },
  {
    place: "Maldivian light",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2400&q=90",
  },
];

const destinationSuggestions = [
  "Kyoto, Japan",
  "Marrakech, Morocco",
  "Amalfi Coast, Italy",
  "Bali, Indonesia",
  "Iceland Highlands",
  "Paris, France",
  "Santorini, Greece",
  "Patagonia, Chile",
];

const travelStyles = ["Luxury", "Adventure", "Culture", "Wellness", "Foodie", "Hidden gems"];
const navItems = ["Home", "Explore", "Map", "Trips", "Guides", "Journal"];
const interests = [
  "Boutique hotels",
  "Private guides",
  "Old towns",
  "Rooftop dinners",
  "Markets",
  "Museums",
  "Thermal baths",
  "Coastal drives",
  "Sunrise viewpoints",
  "Local craft",
  "Jazz bars",
  "Slow mornings",
];

const previewCards = [
  {
    title: "Arrival Mood",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=88",
    copy: "A soft landing with golden-hour orientation, a restrained first dinner, and room to breathe.",
  },
  {
    title: "Signature Day",
    image:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1000&q=88",
    copy: "A cinematic route through texture, taste, architecture, and one quietly memorable hidden address.",
  },
  {
    title: "Final Frame",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=88",
    copy: "A slower closing day designed around souvenirs, reflection, and a beautiful last table.",
  },
];

const savedDrafts = [
  {
    title: "Alpine Silence",
    meta: "Switzerland / Wellness / Premium",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=88",
  },
  {
    title: "Oaxaca in Color",
    meta: "Mexico / Culture / Balanced",
    image:
      "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=900&q=88",
  },
  {
    title: "Desert After Dark",
    meta: "Morocco / Hidden gems / Ultra luxury",
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=900&q=88",
  },
];

export function JourneyBuilderPage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [destination, setDestination] = useState("Kyoto, Japan");
  const [destinationFocused, setDestinationFocused] = useState(false);
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [flexibleDates, setFlexibleDates] = useState(true);
  const [travelers, setTravelers] = useState<Travelers>("Couple");
  const [style, setStyle] = useState("Luxury");
  const [budget, setBudget] = useState<Budget>("Premium");
  const [pace, setPace] = useState<Pace>("Balanced");
  const [selectedInterests, setSelectedInterests] = useState(["Boutique hotels", "Old towns", "Rooftop dinners"]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroFrames.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const filteredDestinations = useMemo(() => {
    const query = destination.trim().toLowerCase();
    if (!query) {
      return destinationSuggestions;
    }

    return destinationSuggestions.filter((item) => item.toLowerCase().includes(query)).slice(0, 5);
  }, [destination]);

  const selectedDestination = destination.trim() || "your next destination";
  const travelLength = departure && returnDate ? "6 crafted days" : flexibleDates ? "Flexible dates" : "Dates to be set";

  function toggleInterest(interest: string) {
    setSelectedInterests((current) =>
      current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest],
    );
  }

  function generateJourney() {
    setIsGenerating(true);
    window.setTimeout(() => {
      setHasGenerated(true);
      setIsGenerating(false);
    }, 850);
  }

  return (
    <main className="journee-page-frame min-h-screen bg-[#040605] text-white">
      <CinematicTopNav
        navItems={navItems.map((label) => ({ label }))}
        searchPlaceholder="Search destinations, trips, guides..."
        avatar={false}
      />
      <section className="relative isolate min-h-[88vh] overflow-hidden px-4 py-6 sm:px-6 lg:px-10">
        {heroFrames.map((frame, index) => (
          <div
            key={frame.place}
            className={[
              "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
              index === heroIndex ? "opacity-100" : "opacity-0",
            ].join(" ")}
            style={{ backgroundImage: `url(${frame.image})` }}
            aria-hidden="true"
          />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(232,199,123,.2),transparent_28%),linear-gradient(90deg,rgba(3,5,5,.94)_0%,rgba(3,5,5,.76)_42%,rgba(3,5,5,.42)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#040605] to-transparent" />
        <div className="absolute left-[8%] top-[18%] h-52 w-52 rounded-full bg-[#c89b3c]/20 blur-3xl motion-safe:animate-pulse" />

        <div className="relative z-10 mx-auto grid min-h-[78vh] w-full max-w-7xl items-end gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div className="pb-6 lg:pb-16">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[.34em] text-[#e8c77b]">
              Journee / Master Planning Workspace
            </p>
            <h1 className="max-w-4xl text-[clamp(3rem,8vw,7.4rem)] leading-[.9] text-white">
              Craft the journey before it becomes a memory.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/76 sm:text-lg">
              Shape a destination into mood, rhythm, texture, and days that unfold like a film.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[.2em] text-white/64">
              <span className="border-l border-[#e8c77b] pl-4">{heroFrames[heroIndex].place}</span>
              <span>{travelLength}</span>
              <span>{style}</span>
            </div>
          </div>

          <JourneeGlassPanel className="rounded-[1.75rem] border-white/14 bg-black/40 p-4 shadow-[0_32px_100px_rgba(0,0,0,.46)] sm:p-6 lg:p-7">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#e8c77b]">Begin here</p>
                <h2 className="mt-2 text-3xl text-white">Journey brief</h2>
              </div>
              <StatusBadge variant="premium" className="border-white/12 bg-white/8 text-white/70">
                Live draft
              </StatusBadge>
            </div>

            <div className="space-y-5">
              <div className="relative">
                <label htmlFor="destination" className="mb-2 block text-sm font-semibold text-white/82">
                  Destination
                </label>
                <input
                  id="destination"
                  value={destination}
                  onChange={(event) => setDestination(event.target.value)}
                  onFocus={() => setDestinationFocused(true)}
                  onBlur={() => window.setTimeout(() => setDestinationFocused(false), 120)}
                  placeholder="Search a city, country, coast, or mood"
                  className="w-full rounded-2xl border border-white/14 bg-white/[.08] px-4 py-4 text-base text-white outline-none transition duration-300 placeholder:text-white/38 focus:border-[#e8c77b] focus:bg-white/[.12] focus:shadow-[0_0_0_4px_rgba(232,199,123,.12)]"
                />
                {destinationFocused && filteredDestinations.length > 0 ? (
                  <div className="absolute left-0 right-0 top-[calc(100%+.5rem)] z-30 overflow-hidden rounded-2xl border border-white/14 bg-[#090b0a]/95 shadow-2xl backdrop-blur-xl">
                    {filteredDestinations.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onMouseDown={() => setDestination(item)}
                        className="block w-full px-4 py-3 text-left text-sm text-white/78 transition hover:bg-[#e8c77b] hover:text-[#130f0a]"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-white/82">Departure</span>
                  <input
                    type="date"
                    value={departure}
                    onChange={(event) => setDeparture(event.target.value)}
                    className="w-full rounded-2xl border border-white/14 bg-white/[.08] px-4 py-4 text-white outline-none transition duration-300 focus:border-[#e8c77b] focus:shadow-[0_0_0_4px_rgba(232,199,123,.12)]"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-white/82">Return</span>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(event) => setReturnDate(event.target.value)}
                    className="w-full rounded-2xl border border-white/14 bg-white/[.08] px-4 py-4 text-white outline-none transition duration-300 focus:border-[#e8c77b] focus:shadow-[0_0_0_4px_rgba(232,199,123,.12)]"
                  />
                </label>
              </div>

              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-white/12 bg-white/[.055] px-4 py-3 transition hover:border-[#e8c77b]/60">
                <span>
                  <span className="block text-sm font-semibold text-white">Flexible dates</span>
                  <span className="block text-xs text-white/55">Let the itinerary breathe around better light and value.</span>
                </span>
                <input
                  type="checkbox"
                  checked={flexibleDates}
                  onChange={(event) => setFlexibleDates(event.target.checked)}
                  className="h-5 w-5 accent-[#e8c77b]"
                />
              </label>
            </div>
          </JourneeGlassPanel>
        </div>
      </section>

      <section className="px-4 pb-20 pt-8 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[.78fr_1.22fr]">
          <JourneeGlassPanel tone="gold" as="aside" className="p-6 lg:sticky lg:top-6 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#e8c77b]">Current composition</p>
            <h2 className="mt-3 text-4xl text-white">{selectedDestination}</h2>
            <div className="mt-6 space-y-4 text-sm text-white/70">
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <span>Travelers</span>
                <strong className="text-white">{travelers}</strong>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <span>Style</span>
                <strong className="text-white">{style}</strong>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <span>Comfort</span>
                <strong className="text-white">{budget}</strong>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <span>Pace</span>
                <strong className="text-white">{pace}</strong>
              </div>
              <div>
                <span className="block pb-2">Interests</span>
                <div className="flex flex-wrap gap-2">
                  {selectedInterests.slice(0, 5).map((interest) => (
                    <span key={interest} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/74">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </JourneeGlassPanel>

          <div className="space-y-6">
            <BuilderPanel title="Travelers" kicker="Who is this journey for?">
              <SegmentedTabs
                aria-label="Travelers"
                items={(["Solo", "Couple", "Friends", "Family"] as Travelers[]).map((item) => ({
                  value: item,
                  label: item,
                }))}
                value={travelers}
                onValueChange={setTravelers}
                className="flex-wrap border-0 bg-transparent p-0"
                itemClassName="border"
              />
            </BuilderPanel>

            <BuilderPanel title="Travel Style" kicker="Choose the soul of the trip.">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {travelStyles.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setStyle(item)}
                    className={[
                      "min-h-24 rounded-2xl border p-4 text-left transition duration-300",
                      style === item
                        ? "border-[#e8c77b] bg-[#e8c77b]/18 shadow-[0_0_35px_rgba(232,199,123,.18)]"
                        : "border-white/12 bg-white/[.055] hover:border-[#e8c77b]/70 hover:bg-white/[.09]",
                    ].join(" ")}
                  >
                    <span className="block text-lg font-semibold text-white">{item}</span>
                    <span className="mt-2 block text-sm leading-6 text-white/58">
                      {item === "Luxury"
                        ? "Elegant hotels, private moments, and impeccable pacing."
                        : item === "Adventure"
                          ? "Terrain, motion, and days with a little altitude."
                          : item === "Culture"
                            ? "Museums, makers, rituals, and layered neighborhoods."
                            : item === "Wellness"
                              ? "Restorative stays, rituals, water, and quiet mornings."
                              : item === "Foodie"
                                ? "Markets, counters, cellars, and unforgettable tables."
                                : "Addresses that feel found rather than recommended."}
                    </span>
                  </button>
                ))}
              </div>
            </BuilderPanel>

            <div className="grid gap-6 xl:grid-cols-2">
              <BuilderPanel title="Budget Comfort" kicker="Set the level of ease.">
                <SegmentedTabs
                  aria-label="Budget comfort"
                  items={(["Budget", "Balanced", "Premium", "Ultra luxury"] as Budget[]).map((item) => ({
                    value: item,
                    label: item,
                  }))}
                  value={budget}
                  onValueChange={setBudget}
                  className="flex-wrap border-0 bg-transparent p-0"
                  itemClassName="border"
                />
              </BuilderPanel>

              <BuilderPanel title="Pace" kicker="How should the days move?">
                <SegmentedTabs
                  aria-label="Pace"
                  items={(["Slow", "Balanced", "Fast-paced"] as Pace[]).map((item) => ({
                    value: item,
                    label: item,
                  }))}
                  value={pace}
                  onValueChange={setPace}
                  className="flex-wrap border-0 bg-transparent p-0"
                  itemClassName="border"
                />
              </BuilderPanel>
            </div>

            <BuilderPanel title="Interests" kicker="Tune the itinerary texture.">
              <div className="flex flex-wrap gap-3">
                {interests.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleInterest(item)}
                    className={[
                      "rounded-full border px-4 py-2 text-sm font-semibold transition duration-300",
                      selectedInterests.includes(item)
                        ? "scale-[1.02] border-[#e8c77b] bg-[#e8c77b] text-[#130f0a]"
                        : "border-white/12 bg-white/[.055] text-white/72 hover:border-white/35 hover:bg-white/[.1]",
                    ].join(" ")}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </BuilderPanel>

            <div className="rounded-[1.5rem] border border-[#e8c77b]/24 bg-[#e8c77b]/10 p-4 sm:p-6">
              <button
                type="button"
                onClick={generateJourney}
                className="group relative flex w-full items-center justify-center overflow-hidden rounded-[1.25rem] bg-[#e8c77b] px-6 py-5 text-center text-sm font-extrabold uppercase tracking-[.24em] text-[#130f0a] shadow-[0_24px_70px_rgba(232,199,123,.28)] transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_30px_90px_rgba(232,199,123,.42)] active:translate-y-0"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition duration-700 group-hover:translate-x-full" />
                <span className="relative">{isGenerating ? "Composing your journey..." : hasGenerated ? "Regenerate Journey" : "Generate Journey"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {hasGenerated ? (
        <section className="px-4 pb-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.3em] text-[#e8c77b]">Generated preview</p>
                <h2 className="mt-3 max-w-3xl text-5xl text-white">A first cinematic pass for {selectedDestination}</h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-white/60">
                Built from {travelers.toLowerCase()} travel, {style.toLowerCase()} intent, {budget.toLowerCase()} comfort, and a {pace.toLowerCase()} rhythm.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {previewCards.map((card, index) => (
                <article
                  key={card.title}
                  className="group overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/[.055] shadow-[0_26px_80px_rgba(0,0,0,.28)]"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/84 via-black/12 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-black/48 px-3 py-1 text-xs font-semibold uppercase tracking-[.18em] text-[#e8c77b] backdrop-blur">
                      Day {index + 1}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-2xl text-white">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/62">{card.copy}</p>
                  </div>
                </article>
              ))}
            </div>

            <JourneeGlassPanel tone="dark" className="mt-6 p-5 sm:p-7">
              <div className="grid gap-4 md:grid-cols-3">
                {["Arrival and orientation", "Immersion and texture", "Slow close and departure"].map((day, index) => (
                  <div key={day} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#e8c77b]">
                      Placeholder / Day {index + 1}
                    </p>
                    <h3 className="mt-3 text-2xl text-white">{day}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/58">
                      Mood: {index === 0 ? "soft arrival" : index === 1 ? "cinematic discovery" : "unhurried afterglow"}.
                    </p>
                  </div>
                ))}
              </div>
            </JourneeGlassPanel>
          </div>
        </section>
      ) : null}

      <section className="px-4 pb-24 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-[.3em] text-[#e8c77b]">Saved draft journeys</p>
            <h2 className="mt-3 text-5xl text-white">Return to unfinished stories.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {savedDrafts.map((draft, index) => (
              <article
                key={draft.title}
                className={[
                  "overflow-hidden border border-white/12 bg-white/[.055] transition duration-300 hover:-translate-y-1 hover:border-[#e8c77b]/55",
                  index === 1 ? "rounded-[2rem] md:mt-8" : "rounded-[1.25rem]",
                ].join(" ")}
              >
                <div className={index === 1 ? "relative h-80" : "relative h-56"}>
                  <Image
                    src={draft.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#e8c77b]">{draft.meta}</p>
                  <h3 className="mt-3 text-3xl text-white">{draft.title}</h3>
                  <button
                    type="button"
                    className="mt-5 rounded-full border border-white/16 px-4 py-2 text-sm font-semibold text-white/78 transition hover:border-[#e8c77b] hover:bg-[#e8c77b] hover:text-[#130f0a]"
                  >
                    Open draft
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function BuilderPanel({
  title,
  kicker,
  children,
}: {
  title: string;
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <JourneeGlassPanel className="p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[.26em] text-[#e8c77b]">{kicker}</p>
      <h2 className="mt-2 mb-5 text-3xl text-white">{title}</h2>
      {children}
    </JourneeGlassPanel>
  );
}
