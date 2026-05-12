"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  Cherry,
  ChevronRight,
  Mountain,
  Route,
  Train,
  Utensils,
} from "lucide-react";

type Interest = "culture" | "food" | "nature" | "family" | "shopping" | "nightlife";
type Pace = "gentle" | "balanced" | "intense";

type JapanRoute = {
  slug: string;
  title: string;
  days: [number, number];
  pace: Pace;
  interests: Interest[];
  cities: Array<{ name: string; slug: string; nights: string; role: string }>;
  summary: string;
  bestSeason: string[];
  dayShape: string[];
  transit: string;
  image: string;
};

const INTERESTS: Array<{ slug: Interest; label: string; detail: string }> = [
  { slug: "culture", label: "Culture", detail: "Shrines, craft, museums" },
  { slug: "food", label: "Food", detail: "Markets, counters, regional meals" },
  { slug: "nature", label: "Nature", detail: "Fuji views, islands, parks" },
  { slug: "family", label: "Kids", detail: "Gentler pacing, fewer transfers" },
  { slug: "shopping", label: "Shopping", detail: "Ginza, Osaka, design goods" },
  { slug: "nightlife", label: "Nightlife", detail: "Neon, bars, late food" },
];

const ROUTES: JapanRoute[] = [
  {
    slug: "golden-route",
    title: "Golden Route",
    days: [7, 10],
    pace: "balanced",
    interests: ["culture", "food", "shopping", "nightlife"],
    cities: [
      { name: "Tokyo", slug: "tokyo", nights: "3-4 nights", role: "arrival, skyline, food, shopping" },
      { name: "Kyoto", slug: "kyoto", nights: "3 nights", role: "temples, lanes, gardens" },
      { name: "Osaka", slug: "osaka", nights: "1-2 nights", role: "street food, nightlife, easy departure" },
    ],
    summary: "The classic first Japan route: Tokyo energy, Kyoto ritual, Osaka appetite. Best when the traveler wants Japan to feel broad without too many transfers.",
    bestSeason: ["spring", "autumn", "winter"],
    dayShape: [
      "Keep Tokyo front-loaded for arrival recovery and reservations.",
      "Move to Kyoto by Shinkansen when jet lag has settled.",
      "Use Osaka as either a food finale or a Kansai airport exit.",
    ],
    transit: "Tokyo to Kyoto by Tokaido Shinkansen, then Kyoto to Osaka by local rail.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=84",
  },
  {
    slug: "tokyo-fuji-kansai",
    title: "Tokyo, Fuji & Kansai",
    days: [10, 14],
    pace: "balanced",
    interests: ["culture", "food", "nature"],
    cities: [
      { name: "Tokyo", slug: "tokyo", nights: "4 nights", role: "arrival base and urban depth" },
      { name: "Hakone", slug: "hakone", nights: "1 night", role: "onsen, Fuji views, mountain reset" },
      { name: "Kyoto", slug: "kyoto", nights: "3-4 nights", role: "temples and slow mornings" },
      { name: "Osaka", slug: "osaka", nights: "2 nights", role: "food, nightlife, day-trip base" },
      { name: "Hiroshima", slug: "hiroshima", nights: "1-2 nights", role: "history and Miyajima" },
    ],
    summary: "A fuller Japan arc with a mountain pause between Tokyo and Kyoto, then a western extension to Hiroshima or Miyajima.",
    bestSeason: ["spring", "autumn"],
    dayShape: [
      "Add Hakone only when the trip has at least 10 full days.",
      "Avoid one-night city hops except Hakone, where the ryokan is the point.",
      "Use Osaka as the practical base for Nara, Kobe, or late food nights.",
    ],
    transit: "Shinkansen plus one mountain transfer; luggage forwarding is worth it.",
    image: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=1800&q=84",
  },
  {
    slug: "food-cities",
    title: "Food Cities",
    days: [6, 9],
    pace: "intense",
    interests: ["food", "nightlife", "shopping"],
    cities: [
      { name: "Tokyo", slug: "tokyo", nights: "3 nights", role: "sushi, ramen, fine dining" },
      { name: "Osaka", slug: "osaka", nights: "2-3 nights", role: "Dotonbori, izakaya, street food" },
      { name: "Fukuoka", slug: "fukuoka", nights: "1-2 nights", role: "yatai, tonkotsu ramen, Kyushu gateway" },
    ],
    summary: "Built around meals rather than monuments: Tokyo precision, Osaka appetite, and Fukuoka late-night food stalls.",
    bestSeason: ["winter", "autumn", "summer"],
    dayShape: [
      "Protect lunch and dinner slots; do lighter sightseeing around them.",
      "Use department-store food halls on rainy or hot afternoons.",
      "Leave one no-reservation night for yokocho, yatai, or standing bars.",
    ],
    transit: "Shinkansen from Tokyo to Osaka, then rail or flight to Fukuoka depending on budget.",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1800&q=84",
  },
  {
    slug: "family-first-japan",
    title: "Family First Japan",
    days: [7, 12],
    pace: "gentle",
    interests: ["family", "culture", "nature", "food"],
    cities: [
      { name: "Tokyo", slug: "tokyo", nights: "4-5 nights", role: "easy base, museums, Disney option" },
      { name: "Hakone", slug: "hakone", nights: "1 night", role: "short mountain reset" },
      { name: "Kyoto", slug: "kyoto", nights: "2-3 nights", role: "temples with slower mornings" },
      { name: "Osaka", slug: "osaka", nights: "1-2 nights", role: "aquarium, food, easier departure" },
    ],
    summary: "A lower-friction Japan route with fewer hotel changes, shorter walking days, and kid-friendly anchors.",
    bestSeason: ["spring", "autumn", "winter"],
    dayShape: [
      "Keep one major activity per day plus a soft afternoon.",
      "Avoid same-day long transfers and evening reservations with kids.",
      "Choose hotels near major rail nodes over charming-but-remote areas.",
    ],
    transit: "Use Shinkansen for the long moves; forward luggage before Kyoto.",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1800&q=84",
  },
  {
    slug: "north-to-south",
    title: "North to South Sampler",
    days: [12, 18],
    pace: "intense",
    interests: ["nature", "culture", "food"],
    cities: [
      { name: "Sapporo", slug: "sapporo", nights: "2-3 nights", role: "Hokkaido food and seasons" },
      { name: "Tokyo", slug: "tokyo", nights: "3 nights", role: "national rail hub" },
      { name: "Kyoto", slug: "kyoto", nights: "3 nights", role: "historic core" },
      { name: "Hiroshima", slug: "hiroshima", nights: "2 nights", role: "history, Miyajima, westward arc" },
      { name: "Fukuoka", slug: "fukuoka", nights: "2 nights", role: "Kyushu food and exit point" },
    ],
    summary: "For longer trips that want Japan to feel like a country, not one corridor: Hokkaido, Kanto, Kansai, Chugoku, and Kyushu.",
    bestSeason: ["summer", "autumn", "winter"],
    dayShape: [
      "Use flights for Hokkaido or Kyushu if rail time starts eating the trip.",
      "Keep regional clusters together instead of bouncing back to Tokyo.",
      "Use one luggage-forwarding leg before the longest rail stretch.",
    ],
    transit: "Mix domestic flights with Shinkansen; not every leg needs to be rail.",
    image: "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1800&q=84",
  },
  {
    slug: "islands-and-heat",
    title: "Summer Islands & Cities",
    days: [8, 14],
    pace: "gentle",
    interests: ["nature", "family", "food"],
    cities: [
      { name: "Tokyo", slug: "tokyo", nights: "3 nights", role: "arrival and indoor anchors" },
      { name: "Kyoto", slug: "kyoto", nights: "2 nights", role: "early temples, shaded lanes" },
      { name: "Okinawa", slug: "okinawa", nights: "3-5 nights", role: "beaches, islands, slower finish" },
    ],
    summary: "For hot-season travel: keep cities efficient and move the end of the trip toward water, slower days, and lighter schedules.",
    bestSeason: ["summer"],
    dayShape: [
      "Do city sightseeing early, then hide indoors after lunch.",
      "Avoid overloading Kyoto in July or August.",
      "End with Okinawa when beach time matters more than another temple day.",
    ],
    transit: "Fly to Okinawa; rail does not solve this leg.",
    image: "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=1800&q=84",
  },
];

const SEASON_RULES = {
  spring: {
    label: "Spring",
    cue: "Cherry blossom pressure",
    note: "Book earlier, keep garden days flexible, and avoid changing cities on the exact peak weekends if prices spike.",
    icon: Cherry,
  },
  summer: {
    label: "Summer",
    cue: "Heat and festivals",
    note: "Build indoor afternoons, reduce exposed walking, and consider Hokkaido or Okinawa depending on the trip mood.",
    icon: Mountain,
  },
  autumn: {
    label: "Autumn",
    cue: "Comfortable walking",
    note: "This is the best season for multi-city rail travel, temple mornings, gardens, and food-heavy evenings.",
    icon: Train,
  },
  winter: {
    label: "Winter",
    cue: "Clear views and food",
    note: "Lean into ramen, illuminations, clear skyline days, onsens, and Hokkaido if snow is part of the dream.",
    icon: Utensils,
  },
};

function seasonForMonth(month: number) {
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

function dayCount(startDate: string, endDate: string, fallbackDays: number) {
  if (!startDate || !endDate) return fallbackDays;
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  if (Number.isNaN(start.valueOf()) || Number.isNaN(end.valueOf())) {
    return fallbackDays;
  }
  return Math.max(1, Math.min(21, Math.round((end.getTime() - start.getTime()) / 86400000) + 1));
}

function routeScore(route: JapanRoute, days: number, interests: Interest[], pace: Pace, season: string) {
  const [minDays, maxDays] = route.days;
  const lengthFit =
    days >= minDays && days <= maxDays
      ? 42
      : Math.max(0, 34 - Math.min(Math.abs(days - minDays), Math.abs(days - maxDays)) * 7);
  const interestFit = interests.reduce(
    (score, interest) => score + (route.interests.includes(interest) ? 12 : 0),
    0,
  );
  const paceFit = route.pace === pace ? 16 : route.pace === "balanced" ? 8 : 0;
  const seasonFit = route.bestSeason.includes(season) ? 12 : 0;
  return lengthFit + interestFit + paceFit + seasonFit;
}

function lengthLabel(route: JapanRoute, days: number) {
  const [minDays, maxDays] = route.days;
  if (days >= minDays && days <= maxDays) return "Fits your dates";
  if (days < minDays) return `Needs ${minDays - days} more day${minDays - days > 1 ? "s" : ""}`;
  return `${days - maxDays} flex day${days - maxDays > 1 ? "s" : ""} to add`;
}

export function JapanTripPlanner() {
  const today = new Date();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fallbackDays, setFallbackDays] = useState(10);
  const [pace, setPace] = useState<Pace>("balanced");
  const [interests, setInterests] = useState<Interest[]>(["culture", "food"]);

  const month = startDate ? new Date(`${startDate}T00:00:00`).getMonth() + 1 : today.getMonth() + 1;
  const seasonKey = seasonForMonth(month) as keyof typeof SEASON_RULES;
  const season = SEASON_RULES[seasonKey];
  const SeasonIcon = season.icon;
  const days = dayCount(startDate, endDate, fallbackDays);

  const ranked = useMemo(
    () =>
      ROUTES.map((route) => ({
        route,
        score: routeScore(route, days, interests, pace, seasonKey),
      })).sort((a, b) => b.score - a.score),
    [days, interests, pace, seasonKey],
  );

  const best = ranked[0];

  function toggleInterest(interest: Interest) {
    setInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest],
    );
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(200,155,60,.16),transparent_35%),radial-gradient(circle_at_80%_18%,rgba(42,78,62,.28),transparent_36%)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="grid gap-5 lg:grid-cols-[1.08fr_.92fr]">
          <div className="scene-glass p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="luxury-kicker text-kintsugi-300">Japan route builder</p>
                <h2 className="mt-3 max-w-3xl font-sans text-[clamp(2.4rem,5vw,5.2rem)] font-semibold leading-none text-white">
                  Build the country route first.
                </h2>
              </div>
              <Route className="text-kintsugi-300" size={34} />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <label>
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/48">Arrival</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  className="mt-2 w-full border border-white/14 bg-black/24 px-3 py-3 text-sm text-white"
                />
              </label>
              <label>
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/48">Departure</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                  className="mt-2 w-full border border-white/14 bg-black/24 px-3 py-3 text-sm text-white"
                />
              </label>
              <label>
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/48">Days if unknown</span>
                <input
                  type="number"
                  min={1}
                  max={21}
                  value={fallbackDays}
                  onChange={(event) =>
                    setFallbackDays(Math.max(1, Math.min(21, Number(event.target.value) || 1)))
                  }
                  className="mt-2 w-full border border-white/14 bg-black/24 px-3 py-3 text-sm text-white"
                />
              </label>
            </div>

            <div className="mt-8">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/48">Trip pace</div>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {(["gentle", "balanced", "intense"] as Pace[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setPace(option)}
                    className={`border px-4 py-3 text-left font-sans text-xl font-semibold capitalize transition ${
                      pace === option
                        ? "border-kintsugi-300 bg-kintsugi-300/14 text-white"
                        : "border-white/14 bg-white/[0.04] text-white/62 hover:border-white/35 hover:text-white"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/48">Activities</div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {INTERESTS.map((interest) => {
                  const active = interests.includes(interest.slug);
                  return (
                    <button
                      key={interest.slug}
                      type="button"
                      onClick={() => toggleInterest(interest.slug)}
                      className={`border p-4 text-left transition ${
                        active
                          ? "border-kintsugi-300 bg-kintsugi-300/14 text-white"
                          : "border-white/14 bg-white/[0.04] text-white/68 hover:border-white/35 hover:text-white"
                      }`}
                    >
                      <span className="block font-sans text-xl font-semibold">{interest.label}</span>
                      <span className="mt-1 block text-xs leading-5">{interest.detail}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="scene-glass flex flex-col justify-between p-6 sm:p-8">
            <div>
              <div className="flex items-center gap-3 text-kintsugi-300">
                <SeasonIcon size={26} />
                <p className="luxury-kicker">{season.label}</p>
              </div>
              <h2 className="mt-5 font-sans text-[clamp(2.5rem,5vw,5.2rem)] font-semibold leading-none text-white">
                {season.cue}
              </h2>
              <p className="mt-6 text-sm leading-7 text-white/72">{season.note}</p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/15 pt-6 text-center">
              <div>
                <div className="font-sans text-3xl text-white">{days}</div>
                <div className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/62">Days</div>
              </div>
              <div>
                <div className="font-sans text-3xl text-white">{interests.length || "Any"}</div>
                <div className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/62">Interests</div>
              </div>
              <div>
                <div className="font-sans text-3xl text-white">{ROUTES.length}</div>
                <div className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/62">Routes</div>
              </div>
            </div>
          </aside>
        </div>

        {best ? (
          <section className="mt-14 grid gap-8 xl:grid-cols-[1.05fr_.95fr]">
            <RouteFeature route={best.route} days={days} season={season.label} />
            <div className="space-y-4">
              <p className="luxury-kicker text-kintsugi-300">Best country fit</p>
              <h2 className="font-sans text-[clamp(2.35rem,5vw,4.8rem)] font-semibold leading-none text-white">
                {best.route.title}
              </h2>
              <p className="max-w-xl text-sm leading-7 text-white/68">
                Ranked from your trip length, travel season, pace, and interests.
                Use this to decide the cities first, then open each city guide
                for restaurants, hotels, transit, and day-level detail.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {best.route.dayShape.map((shape) => (
                  <div key={shape} className="border border-white/12 bg-white/[0.055] p-4 text-sm leading-7 text-white/72">
                    {shape}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="mt-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="luxury-kicker text-kintsugi-300">Japan routes</p>
              <h2 className="font-sans text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-none text-white">
                Compare the whole-country options.
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/58">
              <CalendarDays size={16} />
              Ranked live as you change dates and interests
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {ranked.slice(1).map(({ route }, index) => (
              <RouteCard key={route.slug} route={route} days={days} stagger={index === 1} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function RouteFeature({
  route,
  days,
  season,
}: {
  route: JapanRoute;
  days: number;
  season: string;
}) {
  return (
    <article className="relative min-h-[34rem] overflow-hidden border border-white/18 bg-sumi-900 shadow-2xl">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${route.image}")` }} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,5,4,.9),rgba(6,5,4,.34)_52%,rgba(6,5,4,.76)),linear-gradient(0deg,rgba(6,5,4,.86),transparent_58%)]" />
      <div className="relative flex min-h-[34rem] flex-col justify-between p-7 sm:p-10">
        <div className="flex items-center justify-between gap-4">
          <span className="border border-kintsugi-300/55 bg-black/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-kintsugi-200 backdrop-blur">
            {season} recommendation
          </span>
          <span className="bg-washi-50 px-3 py-1 text-sm font-bold text-sumi-900">
            {lengthLabel(route, days)}
          </span>
        </div>
        <div className="max-w-2xl">
          <p className="luxury-kicker text-kintsugi-300">{route.days[0]}-{route.days[1]} days</p>
          <h2 className="luxury-display mt-4 max-w-[10ch] text-[clamp(3rem,6.2vw,6rem)] font-semibold text-white">
            {route.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/82">{route.summary}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {route.interests.map((interest) => (
              <span key={interest} className="border border-white/22 bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/84 backdrop-blur">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function RouteCard({
  route,
  days,
  stagger,
}: {
  route: JapanRoute;
  days: number;
  stagger: boolean;
}) {
  return (
    <article className={`overflow-hidden border border-white/16 bg-sumi-900 shadow-2xl ${stagger ? "lg:mt-12" : ""}`}>
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${route.image}")` }} />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,5,4,.9),transparent_62%)]" />
        <span className="absolute left-5 top-5 bg-washi-50 px-3 py-1 text-sm font-bold text-sumi-900">
          {lengthLabel(route, days)}
        </span>
      </div>
      <div className="p-6">
        <p className="luxury-kicker text-kintsugi-300">{route.days[0]}-{route.days[1]} days · {route.pace}</p>
        <h3 className="mt-3 font-sans text-3xl font-semibold leading-none text-white">{route.title}</h3>
        <p className="mt-4 text-sm leading-7 text-white/68">{route.summary}</p>
        <div className="mt-6 border-t border-white/12 pt-5">
          <div className="space-y-3">
            {route.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/city/${city.slug}`}
                className="group flex items-start justify-between gap-4 text-sm"
              >
                <span>
                  <span className="block font-semibold text-white group-hover:text-kintsugi-300">{city.name}</span>
                  <span className="mt-0.5 block text-white/54">{city.nights} · {city.role}</span>
                </span>
                <ChevronRight className="mt-1 shrink-0 text-kintsugi-300 transition group-hover:translate-x-1" size={16} />
              </Link>
            ))}
          </div>
          <div className="mt-6 flex gap-3 border-t border-white/12 pt-5 text-xs leading-6 text-white/58">
            <Train className="mt-1 shrink-0 text-kintsugi-300" size={16} />
            <span>{route.transit}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
