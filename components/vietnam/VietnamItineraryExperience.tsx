/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { CalendarDays, MapPinned, Route, Train } from "lucide-react";
import {
  VIETNAM_CITIES,
  VIETNAM_CITY_REGIONS,
  VIETNAM_COUNTRY_IMAGES,
  VIETNAM_PRICE_BENCHMARKS,
  formatVnd,
} from "@/lib/vietnam/frontend";

const routeIdeas = [
  {
    duration: "12-18 days",
    title: "North to south classic",
    stops: ["Hanoi", "Ninh Binh", "Hue", "Da Nang", "Hoi An", "Ho Chi Minh City"],
    note: "The broad Vietnam arc: northern food and old-quarter rhythm, central heritage and coast, then southern heat, coffee, and Mekong access.",
  },
  {
    duration: "6-9 days",
    title: "Central coast and lanterns",
    stops: ["Da Nang", "Hoi An", "Hue"],
    note: "A compact route for beaches, seafood, tailoring, lantern evenings, imperial history, and the Hai Van Pass without forcing long transfers.",
  },
  {
    duration: "7-11 days",
    title: "Southern coffee and islands",
    stops: ["Ho Chi Minh City", "Can Tho", "Phu Quoc"],
    note: "Use this when the trip should feel warm, urban, cafe-led, river-aware, and finished with island decompression.",
  },
];

const planningRules = [
  "Do not treat Vietnam as one weather zone. North, central coast, south, highlands, and islands need separate timing checks.",
  "Keep at least one slower transfer day after sleeper trains, long buses, or late domestic flights.",
  "Use Da Nang, Hanoi, and Ho Chi Minh City as practical route anchors rather than trying to force every famous stop.",
  "Add beach and mountain legs only when the season and transfer cost support the trip.",
];

export function VietnamItineraryExperience() {
  const transportBenchmarks = VIETNAM_PRICE_BENCHMARKS.filter(
    (item) => item.category === "transport",
  ).slice(0, 4);

  return (
    <main className="vietnam-editorial min-h-screen bg-[#07110d] text-orange-50">
      <section className="relative isolate min-h-[74svh] overflow-hidden">
        <img
          src={VIETNAM_COUNTRY_IMAGES.hero}
          alt=""
          className="absolute inset-0 -z-30 h-full w-full object-cover saturate-150"
        />
        <div className="vietnam-hero-overlay absolute inset-0 -z-20" />
        <div className="vietnam-fog absolute inset-x-0 bottom-0 -z-10 h-44" />
        <div className="mx-auto grid min-h-[74svh] max-w-7xl content-end px-5 pb-14 pt-24 sm:px-6 sm:pb-16">
          <nav className="text-xs font-black uppercase tracking-[0.12em] text-orange-100/60">
            <Link href="/" className="hover:text-orange-100">
              Home
            </Link>{" "}
            ·{" "}
            <Link href="/country/vietnam" className="hover:text-orange-100">
              Vietnam
            </Link>{" "}
            · Itinerary
          </nav>
          <p className="mt-10 text-xs font-black uppercase tracking-[0.14em] text-amber-300">
            Route builder
          </p>
          <h1 className="mt-5 max-w-5xl font-sans text-[clamp(3rem,11vw,8.4rem)] font-black leading-[0.9] drop-shadow-[0_6px_28px_rgba(0,0,0,0.55)]">
            Build Vietnam by region.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-orange-50/78">
            Shape the trip around weather, transfer days, route anchors, food
            cities, beach pauses, and the difference between a full-country arc
            and a focused regional journey.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-300">
              Suggested routes
            </p>
            <h2 className="mt-3 font-sans text-[clamp(2rem,6vw,4.25rem)] font-black leading-[1.02]">
              Start with the route shape, then add details.
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {routeIdeas.map((route) => (
              <article key={route.title} className="border border-orange-100/14 bg-black/24 p-6 sm:p-8">
                <Route className="text-amber-300" />
                <p className="mt-6 text-xs font-black uppercase tracking-[0.12em] text-orange-50/48">
                  {route.duration}
                </p>
                <h3 className="mt-2 font-sans text-3xl font-black">{route.title}</h3>
                <p className="mt-5 text-sm leading-7 text-orange-50/68">{route.note}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {route.stops.map((stop) => (
                    <span key={stop} className="border border-orange-100/14 bg-white/[0.055] px-3 py-1.5 text-xs font-black text-orange-50/78">
                      {stop}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="block h-px w-20 bg-amber-300/70" />
            <p className="mt-8 text-xs font-black uppercase tracking-[0.14em] text-amber-300">
              Planning rules
            </p>
            <h2 className="mt-3 font-sans text-[clamp(2rem,5vw,3.8rem)] font-black leading-[1.02]">
              Keep the route honest.
            </h2>
            <div className="mt-8 grid gap-3">
              {planningRules.map((rule) => (
                <p key={rule} className="border-l border-amber-300/70 pl-4 text-sm leading-7 text-orange-50/68">
                  {rule}
                </p>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <article className="border border-orange-100/14 bg-black/24 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <MapPinned className="text-amber-300" />
                <h3 className="font-sans text-2xl font-black">Route anchors</h3>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {VIETNAM_CITIES.slice(0, 8).map((city) => (
                  <Link
                    key={city.slug}
                    href={`/city/${city.slug}`}
                    className="border border-orange-100/12 bg-white/[0.045] p-4 transition hover:border-amber-300/70"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-amber-300">
                      {VIETNAM_CITY_REGIONS[city.slug] ?? "Vietnam"}
                    </p>
                    <h4 className="mt-2 font-sans text-xl font-black">{city.name}</h4>
                  </Link>
                ))}
              </div>
            </article>

            <article className="border border-orange-100/14 bg-black/24 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <Train className="text-amber-300" />
                <h3 className="font-sans text-2xl font-black">Transfer cues</h3>
              </div>
              <div className="mt-5 grid gap-3">
                {transportBenchmarks.map((item) => (
                  <div key={item.benchmark_key} className="flex justify-between gap-5 border-b border-orange-100/12 pb-3 text-sm">
                    <span className="text-orange-50/72">{item.label}</span>
                    <span className="font-black text-amber-300">
                      {formatVnd(item.amount_typical_minor)}
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <Link href="/country/vietnam/calendar" className="group border border-orange-100/14 bg-white/[0.045] p-5 transition hover:border-amber-300/70">
              <CalendarDays className="text-amber-300" />
              <h3 className="mt-4 font-sans text-2xl font-black">Check holiday timing</h3>
              <p className="mt-3 text-sm leading-7 text-orange-50/64">
                Tet and national holidays can reshape transport, hotel prices,
                restaurants, and route comfort.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
