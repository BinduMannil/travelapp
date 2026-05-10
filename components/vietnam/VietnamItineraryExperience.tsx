/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalendarDays, Coffee, Mountain, Plane, Route, Train, Waves } from "lucide-react";
import { VIETNAM_COUNTRY_IMAGES } from "@/lib/vietnam/frontend";

type Interest = "street-food" | "coffee" | "beaches" | "mountains" | "culture" | "nomad";

const INTERESTS: Array<{ slug: Interest; label: string }> = [
  { slug: "street-food", label: "Street food" },
  { slug: "coffee", label: "Coffee" },
  { slug: "beaches", label: "Beaches" },
  { slug: "mountains", label: "Mountains" },
  { slug: "culture", label: "Culture" },
  { slug: "nomad", label: "Nomad life" },
];

const ROUTES = [
  {
    title: "North to South Classic",
    days: [12, 18],
    interests: ["street-food", "coffee", "culture", "mountains"] as Interest[],
    cities: ["Hanoi", "Sapa", "Ninh Binh", "Hue", "Da Nang", "Hoi An", "Ho Chi Minh City"],
    mood: "The first real Vietnam spine: misty north, limestone, imperial center, central coast, and southern street heat.",
    transport: "Sleeper train or flight legs plus central coast rail.",
    image: VIETNAM_COUNTRY_IMAGES.mountain,
  },
  {
    title: "Central Coast & Lanterns",
    days: [6, 9],
    interests: ["beaches", "culture", "street-food", "coffee"] as Interest[],
    cities: ["Da Nang", "Hoi An", "Hue"],
    mood: "Beach mornings, lantern evenings, imperial history, seafood, tailoring, and the Hai Van Pass.",
    transport: "Fly into Da Nang; use drivers, rail, or guided motorbike over the pass.",
    image: VIETNAM_COUNTRY_IMAGES.beach,
  },
  {
    title: "Southern Coffee & Islands",
    days: [7, 11],
    interests: ["coffee", "street-food", "beaches", "nomad"] as Interest[],
    cities: ["Ho Chi Minh City", "Can Tho", "Phu Quoc"],
    mood: "Rooftop heat, café work days, Mekong dawn, floating markets, seafood, and an island decompression finish.",
    transport: "Use car/bus to Can Tho and fly or ferry onward depending on routing.",
    image: VIETNAM_COUNTRY_IMAGES.street,
  },
  {
    title: "Highlands & Coast Reset",
    days: [8, 12],
    interests: ["mountains", "coffee", "beaches", "culture"] as Interest[],
    cities: ["Da Lat", "Nha Trang", "Da Nang", "Hoi An"],
    mood: "Cool pine air, coffee farms, waterfalls, seafood, beach breaks, and lantern nights.",
    transport: "Mix flights and private transfers; avoid overloading mountain road days.",
    image: VIETNAM_COUNTRY_IMAGES.coffee,
  },
];

function dayCount(startDate: string, endDate: string, fallbackDays: number) {
  if (!startDate || !endDate) return fallbackDays;
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  if (Number.isNaN(start.valueOf()) || Number.isNaN(end.valueOf())) return fallbackDays;
  return Math.max(1, Math.min(24, Math.round((end.getTime() - start.getTime()) / 86400000) + 1));
}

function scoreRoute(route: (typeof ROUTES)[number], days: number, interests: Interest[]) {
  const [min, max] = route.days;
  const lengthScore = days >= min && days <= max ? 44 : Math.max(0, 34 - Math.min(Math.abs(days - min), Math.abs(days - max)) * 7);
  const interestScore = interests.reduce((score, interest) => score + (route.interests.includes(interest) ? 13 : 0), 0);
  return lengthScore + interestScore;
}

export function VietnamItineraryExperience() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fallbackDays, setFallbackDays] = useState(12);
  const [interests, setInterests] = useState<Interest[]>(["street-food", "coffee", "culture"]);
  const days = dayCount(startDate, endDate, fallbackDays);

  const ranked = useMemo(
    () =>
      ROUTES.map((route) => ({
        route,
        score: scoreRoute(route, days, interests),
      })).sort((a, b) => b.score - a.score),
    [days, interests],
  );

  const best = ranked[0].route;

  function toggleInterest(interest: Interest) {
    setInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest],
    );
  }

  return (
    <main className="min-h-screen bg-[#07120f] text-orange-50">
      <section className="relative isolate overflow-hidden">
        <img src={VIETNAM_COUNTRY_IMAGES.hero} alt="" className="absolute inset-0 -z-30 h-full w-full object-cover saturate-150" />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(5,16,13,.96),rgba(15,118,110,.7)_48%,rgba(127,29,29,.48)),linear-gradient(0deg,rgba(5,16,13,.98),transparent_62%)]" />
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <nav className="text-xs font-bold uppercase tracking-[0.32em] text-orange-100/62">
            <Link href="/" className="hover:text-orange-100">Home</Link> ·{" "}
            <Link href="/country/vietnam" className="hover:text-orange-100">Vietnam</Link> · Itinerary
          </nav>
          <p className="mt-12 text-xs font-black uppercase tracking-[0.34em] text-amber-300">
            Route builder
          </p>
          <h1 className="mt-5 max-w-5xl font-display text-[clamp(3.7rem,12vw,10rem)] font-black leading-[0.84] text-orange-50">
            Build Vietnam by region.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-9 text-orange-50/80">
            Choose dates and travel energy first. Vietnam rewards routes that
            understand heat, rain, transfers, coffee pauses, street food, beach
            weather, and mountain visibility.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <div className="border border-orange-100/16 bg-black/28 p-6 shadow-2xl backdrop-blur sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-5xl font-black text-orange-50">Trip inputs</h2>
              <CalendarDays className="text-amber-300" size={30} />
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              <Input label="Arrival" type="date" value={startDate} onChange={setStartDate} />
              <Input label="Departure" type="date" value={endDate} onChange={setEndDate} />
              <Input label="Days if unknown" type="number" value={String(fallbackDays)} onChange={(value) => setFallbackDays(Math.max(1, Math.min(24, Number(value) || 1)))} />
            </div>
            <div className="mt-8">
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-50/48">Interests</div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {INTERESTS.map((interest) => {
                  const active = interests.includes(interest.slug);
                  return (
                    <button
                      key={interest.slug}
                      type="button"
                      onClick={() => toggleInterest(interest.slug)}
                      className={`border px-4 py-3 text-left font-display text-xl font-black transition ${
                        active
                          ? "border-amber-300 bg-amber-300/16 text-orange-50"
                          : "border-orange-100/14 bg-white/[0.04] text-orange-50/62 hover:border-orange-100/35 hover:text-orange-50"
                      }`}
                    >
                      {interest.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="border border-orange-100/16 bg-black/28 p-6 shadow-2xl backdrop-blur sm:p-8">
            <div className="flex items-center gap-3 text-amber-300">
              <Route size={28} />
              <p className="text-xs font-black uppercase tracking-[0.32em]">Best fit</p>
            </div>
            <h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5rem)] font-black leading-none text-orange-50">
              {best.title}
            </h2>
            <p className="mt-5 text-sm leading-7 text-orange-50/70">{best.mood}</p>
            <div className="mt-7 grid grid-cols-3 gap-3 border-t border-orange-100/14 pt-6 text-center">
              <Metric value={String(days)} label="Days" />
              <Metric value={String(interests.length)} label="Interests" />
              <Metric value={String(best.cities.length)} label="Stops" />
            </div>
          </aside>
        </div>
      </section>

      <section className="px-6 pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.34em] text-amber-300">Ranked routes</p>
              <h2 className="mt-4 font-display text-[clamp(2.7rem,6vw,6rem)] font-black leading-none text-orange-50">
                Whole-country options.
              </h2>
            </div>
            <div className="flex gap-3 text-orange-50/52">
              <Train />
              <Plane />
              <Waves />
              <Mountain />
              <Coffee />
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {ranked.map(({ route }) => (
              <article key={route.title} className="overflow-hidden border border-orange-100/16 bg-black/26 shadow-2xl">
                <div className="relative h-64">
                  <img src={route.image} alt="" className="h-full w-full object-cover saturate-150" />
                  <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,16,13,.92),transparent_66%)]" />
                  <div className="absolute bottom-0 p-5">
                    <div className="text-xs font-black uppercase tracking-[0.24em] text-amber-300">
                      {route.days[0]}-{route.days[1]} days
                    </div>
                    <h3 className="mt-2 font-display text-4xl font-black text-orange-50">{route.title}</h3>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-sm leading-7 text-orange-50/68">{route.mood}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {route.cities.map((city) => (
                      <span key={city} className="border border-orange-100/14 bg-white/[0.055] px-3 py-1 text-xs font-bold text-orange-50/78">
                        {city}
                      </span>
                    ))}
                  </div>
                  <p className="mt-5 border-t border-orange-100/12 pt-4 text-xs leading-6 text-orange-50/52">
                    {route.transport}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Input({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-50/48">{label}</span>
      <input
        type={type}
        value={value}
        min={type === "number" ? 1 : undefined}
        max={type === "number" ? 24 : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full border border-orange-100/14 bg-black/24 px-3 py-3 text-sm text-orange-50"
      />
    </label>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-4xl font-black text-orange-50">{value}</div>
      <div className="mt-1 text-[0.65rem] font-black uppercase tracking-[0.24em] text-orange-50/52">
        {label}
      </div>
    </div>
  );
}
