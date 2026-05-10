"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  Leaf,
  MapPinned,
  Utensils,
  Users,
} from "lucide-react";
import type { ItineraryTemplate } from "@/lib/data/seed";

type Scene = {
  image: string;
  mood: string;
  accent: string;
};

type Activity = {
  slug: string;
  label: string;
  detail: string;
};

const ACTIVITIES: Activity[] = [
  { slug: "cultural", label: "Culture", detail: "Shrines, museums, old city" },
  { slug: "food", label: "Food", detail: "Markets, ramen, fine dining" },
  { slug: "family", label: "Kids", detail: "Gentler days, downtime" },
  { slug: "shopping", label: "Shopping", detail: "Ginza, depachika, design" },
  { slug: "nightlife", label: "Nightlife", detail: "Neon, bars, late ramen" },
  { slug: "nature", label: "Parks", detail: "Gardens, day trips, walks" },
];

const SEASON_COPY: Record<
  string,
  {
    label: string;
    tone: string;
    note: string;
    adjustments: string[];
    activityBoosts: string[];
  }
> = {
  spring: {
    label: "Spring",
    tone: "High-demand, blossom-sensitive",
    note: "Book gardens, viewing decks, and restaurants earlier. Add Ueno, Shinjuku Gyoen, or riverside walks when blossoms line up.",
    adjustments: [
      "Put outdoor parks in the morning before crowd pressure builds.",
      "Keep one flexible blossom slot instead of overplanning every afternoon.",
      "Reserve better dinners earlier than usual.",
    ],
    activityBoosts: ["cultural", "nature", "family"],
  },
  summer: {
    label: "Summer",
    tone: "Hot, humid, festival-heavy",
    note: "Plan indoor anchors between lunch and late afternoon. Save shrines, markets, and walks for early morning or after sunset.",
    adjustments: [
      "Shift exposed walks to 08:00-10:30 or after 18:00.",
      "Add museums, teamLab, shopping arcades, and long lunches mid-day.",
      "Carry a lighter day plan if traveling with kids.",
    ],
    activityBoosts: ["food", "shopping", "nightlife"],
  },
  autumn: {
    label: "Autumn",
    tone: "Comfortable, garden-led",
    note: "This is the easiest season for walking days, side streets, and day trips. Build in parks and viewpoints.",
    adjustments: [
      "Lean into longer neighborhood walks.",
      "Add a garden or temple slot most days.",
      "Use sunset viewpoints; light is usually generous.",
    ],
    activityBoosts: ["cultural", "nature", "food"],
  },
  winter: {
    label: "Winter",
    tone: "Clear, crisp, indoor-friendly",
    note: "Skylines are often clearer, evenings get atmospheric fast, and food-led plans work beautifully.",
    adjustments: [
      "Use clear mornings for towers and skyline views.",
      "Add illuminations, ramen, coffee breaks, and onsen-style downtime.",
      "Keep outdoor blocks shorter if traveling with kids.",
    ],
    activityBoosts: ["food", "nightlife", "shopping"],
  },
};

function seasonForMonth(month: number) {
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

function dayCount(startDate: string, endDate: string, fallback: number) {
  if (!startDate || !endDate) return fallback;
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  if (Number.isNaN(start.valueOf()) || Number.isNaN(end.valueOf())) {
    return fallback;
  }
  const diff = Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
  return Math.min(14, Math.max(1, diff));
}

function activityTerms(template: ItineraryTemplate) {
  return [
    ...template.trip_type_slugs,
    ...template.best_for,
    template.pace,
    template.summary,
    ...template.sections.flatMap((section) => [
      section.title,
      ...section.blocks.flatMap((block) => [block.title, block.note ?? ""]),
    ]),
  ]
    .join(" ")
    .toLowerCase();
}

function templateMatchesActivity(template: ItineraryTemplate, activity: string) {
  const terms = activityTerms(template);
  if (template.trip_type_slugs.includes(activity)) return true;
  if (activity === "shopping") return /ginza|shopping|depachika|mitsukoshi|stationery/.test(terms);
  if (activity === "nightlife") return /night|bar|late|shibuya|neon|izakaya/.test(terms);
  if (activity === "nature") return /park|garden|hakone|kamakura|forest|river|odaiba|ueno|gyoen/.test(terms);
  return terms.includes(activity);
}

function recommendationScore(
  template: ItineraryTemplate,
  days: number,
  selectedActivities: string[],
  season: string,
) {
  const dayFit = Math.max(0, 34 - Math.abs(template.days - days) * 11);
  const activityFit = selectedActivities.reduce(
    (score, activity) => score + (templateMatchesActivity(template, activity) ? 14 : 0),
    0,
  );
  const seasonalFit = SEASON_COPY[season].activityBoosts.reduce(
    (score, activity) => score + (templateMatchesActivity(template, activity) ? 5 : 0),
    0,
  );
  const usefulBias = template.days <= days ? 8 : 0;
  return dayFit + activityFit + seasonalFit + usefulBias;
}

function fitLabel(templateDays: number, tripDays: number) {
  if (templateDays === tripDays) return "Exact length";
  if (templateDays < tripDays) return `${tripDays - templateDays} flex day${tripDays - templateDays > 1 ? "s" : ""}`;
  return `Trim ${templateDays - tripDays} day${templateDays - tripDays > 1 ? "s" : ""}`;
}

export function ItineraryPlanner({
  citySlug,
  templates,
  scenes,
}: {
  citySlug: string;
  templates: ItineraryTemplate[];
  scenes: Scene[];
}) {
  const today = new Date();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fallbackDays, setFallbackDays] = useState(5);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([
    "cultural",
    "food",
  ]);

  const selectedMonth = startDate
    ? new Date(`${startDate}T00:00:00`).getMonth() + 1
    : today.getMonth() + 1;
  const seasonKey = seasonForMonth(selectedMonth);
  const season = SEASON_COPY[seasonKey];
  const days = dayCount(startDate, endDate, fallbackDays);

  const ranked = useMemo(
    () =>
      templates
        .map((template, index) => ({
          template,
          scene: scenes[index % scenes.length],
          score: recommendationScore(template, days, selectedActivities, seasonKey),
          matchedActivities: selectedActivities.filter((activity) =>
            templateMatchesActivity(template, activity),
          ),
        }))
        .sort((a, b) => b.score - a.score || Math.abs(a.template.days - days) - Math.abs(b.template.days - days)),
    [days, scenes, seasonKey, selectedActivities, templates],
  );

  const featured = ranked[0];
  const supporting = ranked.slice(1);

  function toggleActivity(activity: string) {
    setSelectedActivities((current) =>
      current.includes(activity)
        ? current.filter((item) => item !== activity)
        : [...current, activity],
    );
  }

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_8%,rgba(200,155,60,.16),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(67,88,57,.28),transparent_36%)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <section className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
          <div className="scene-glass p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="luxury-kicker text-kintsugi-300">Build by dates</p>
                <h2 className="mt-3 font-display text-[clamp(2.3rem,4.5vw,4.6rem)] font-semibold leading-none text-white">
                  Start with when you are going.
                </h2>
              </div>
              <CalendarDays className="text-kintsugi-300" size={30} />
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              <label className="block">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/48">
                  Arrival
                </span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  className="mt-2 w-full border border-white/14 bg-black/24 px-3 py-3 text-sm text-white"
                />
              </label>
              <label className="block">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/48">
                  Departure
                </span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                  className="mt-2 w-full border border-white/14 bg-black/24 px-3 py-3 text-sm text-white"
                />
              </label>
              <label className="block">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/48">
                  Days if dates unknown
                </span>
                <input
                  type="number"
                  min={1}
                  max={14}
                  value={fallbackDays}
                  onChange={(event) =>
                    setFallbackDays(
                      Math.min(14, Math.max(1, Number(event.target.value) || 1)),
                    )
                  }
                  className="mt-2 w-full border border-white/14 bg-black/24 px-3 py-3 text-sm text-white"
                />
              </label>
            </div>

            <div className="mt-7">
              <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/48">
                Activities
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {ACTIVITIES.map((activity) => {
                  const active = selectedActivities.includes(activity.slug);
                  return (
                    <button
                      key={activity.slug}
                      type="button"
                      onClick={() => toggleActivity(activity.slug)}
                      className={`border p-4 text-left transition ${
                        active
                          ? "border-kintsugi-300 bg-kintsugi-300/14 text-white"
                          : "border-white/14 bg-white/[0.04] text-white/68 hover:border-white/35 hover:text-white"
                      }`}
                    >
                      <span className="block font-display text-xl font-semibold">
                        {activity.label}
                      </span>
                      <span className="mt-1 block text-xs leading-5">
                        {activity.detail}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="scene-glass flex flex-col justify-between p-6 sm:p-8">
            <div>
              <p className="luxury-kicker text-kintsugi-300">Season read</p>
              <h2 className="mt-4 font-display text-[clamp(2.5rem,4.8vw,5rem)] font-semibold leading-none text-white">
                {season.label}
              </h2>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/48">
                {season.tone}
              </p>
              <p className="mt-6 text-sm leading-7 text-white/72">{season.note}</p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/15 pt-6 text-center">
              <div>
                <div className="font-display text-3xl text-white">{days}</div>
                <div className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-white/62">
                  Trip days
                </div>
              </div>
              <div>
                <div className="font-display text-3xl text-white">
                  {selectedActivities.length || "Any"}
                </div>
                <div className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-white/62">
                  Interests
                </div>
              </div>
              <div>
                <div className="font-display text-3xl text-white">
                  {templates.length}
                </div>
                <div className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-white/62">
                  Plans
                </div>
              </div>
            </div>
          </aside>
        </section>

        {featured ? (
          <section className="mt-14 grid gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(21rem,.62fr)] xl:items-stretch">
            <RecommendationFeature
              citySlug={citySlug}
              template={featured.template}
              scene={featured.scene}
              days={days}
              matches={featured.matchedActivities}
            />
            <aside className="scene-glass p-6 sm:p-8">
              <p className="luxury-kicker text-kintsugi-300">Recommended edits</p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white">
                Adjust the route to the time of year.
              </h2>
              <div className="mt-7 space-y-4">
                {season.adjustments.map((adjustment) => (
                  <div key={adjustment} className="flex gap-3 border-t border-white/12 pt-4">
                    <Leaf className="mt-1 shrink-0 text-kintsugi-300" size={18} />
                    <p className="text-sm leading-7 text-white/72">{adjustment}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 border-t border-white/12 pt-6">
                <p className="text-xs uppercase tracking-[0.24em] text-white/42">
                  Best current fit
                </p>
                <p className="mt-2 font-display text-3xl font-semibold text-white">
                  {featured.template.name}
                </p>
              </div>
            </aside>
          </section>
        ) : null}

        <section className="mt-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="luxury-kicker text-kintsugi-300">Ranked plans</p>
              <h2 className="mt-3 font-display text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-none text-white">
                Pick the plan that fits your trip.
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/58">
              <Clock3 size={16} />
              Ranked by length, season, and activity match
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {supporting.map((item, index) => (
              <RecommendationCard
                key={item.template.slug}
                citySlug={citySlug}
                template={item.template}
                scene={item.scene}
                days={days}
                matches={item.matchedActivities}
                stagger={index === 1}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function RecommendationFeature({
  citySlug,
  template,
  scene,
  days,
  matches,
}: {
  citySlug: string;
  template: ItineraryTemplate;
  scene: Scene;
  days: number;
  matches: string[];
}) {
  return (
    <Link
      href={`/city/${citySlug}/itinerary/${template.slug}`}
      className="group relative min-h-[34rem] overflow-hidden border border-white/18 bg-sumi-900 shadow-2xl"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url("${scene.image}")` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,5,4,.9),rgba(6,5,4,.34)_52%,rgba(6,5,4,.72)),linear-gradient(0deg,rgba(6,5,4,.86),transparent_58%)]" />
      <div className="relative flex min-h-[34rem] flex-col justify-between p-7 sm:p-10">
        <div className="flex items-center justify-between gap-4">
          <span className="border border-kintsugi-300/55 bg-black/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-kintsugi-200 backdrop-blur">
            Best match
          </span>
          <span className="bg-washi-50 px-3 py-1 text-sm font-bold text-sumi-900">
            {fitLabel(template.days, days)}
          </span>
        </div>
        <div className="max-w-2xl">
          <p className="luxury-kicker text-kintsugi-300">{scene.accent}</p>
          <h2 className="luxury-display mt-4 max-w-[10ch] text-[clamp(3rem,6.2vw,6rem)] font-semibold text-white">
            {template.name}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/82">
            {template.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {[...new Set([...matches, ...template.trip_type_slugs])].map((tag) => (
              <span
                key={tag}
                className="border border-white/22 bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/84 backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

function RecommendationCard({
  citySlug,
  template,
  scene,
  days,
  matches,
  stagger,
}: {
  citySlug: string;
  template: ItineraryTemplate;
  scene: Scene;
  days: number;
  matches: string[];
  stagger: boolean;
}) {
  return (
    <Link
      href={`/city/${citySlug}/itinerary/${template.slug}`}
      className={`group relative overflow-hidden border border-white/16 bg-sumi-900 shadow-2xl ${
        stagger ? "lg:mt-12" : ""
      }`}
    >
      <div className="relative h-60 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url("${scene.image}")` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,5,4,.9),transparent_62%)]" />
        <span className="absolute left-5 top-5 bg-washi-50 px-3 py-1 text-sm font-bold text-sumi-900">
          {fitLabel(template.days, days)}
        </span>
      </div>
      <div className="relative p-6">
        <p className="luxury-kicker text-kintsugi-300">{scene.accent}</p>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-none text-white">
          {template.name}
        </h2>
        <p className="mt-4 text-sm leading-7 text-white/76">{scene.mood}</p>
        <p className="mt-3 text-sm leading-7 text-white/68">
          {template.summary}
        </p>
        <div className="mt-6 grid gap-3 border-t border-white/12 pt-5 text-xs leading-6 text-white/64">
          <div className="flex items-center gap-2">
            <Users size={15} className="text-kintsugi-300" />
            <span>Best for: {template.best_for.join(", ")}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinned size={15} className="text-kintsugi-300" />
            <span>Pace: {template.pace}</span>
          </div>
          {matches.length ? (
            <div className="flex items-center gap-2">
              <Utensils size={15} className="text-kintsugi-300" />
              <span>Matches: {matches.join(", ")}</span>
            </div>
          ) : null}
        </div>
        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-kintsugi-300">
          Open itinerary <ChevronRight size={16} />
        </div>
      </div>
    </Link>
  );
}
