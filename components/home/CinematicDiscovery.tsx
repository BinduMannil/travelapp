"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { AmbientDestinationMotion } from "@/components/destination/AmbientDestinationMotion";
import { PreferencesPanel } from "@/components/home/PreferencesPanel";
import { getDestinationIdentity } from "@/lib/destination/identity";

type DiscoveryMood = {
  id: string;
  label: string;
  identity: string;
  image: string;
  cardImage: string;
  eyebrow: string;
  headline: string;
  body: string;
  atmosphere: string;
  gradient: string;
  primaryHref?: string;
  suggestions: Array<{
    label: string;
    href: string;
  }>;
};

const GLOBAL_COLLAGE_IMAGES = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=86",
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1300&q=84",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=84",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=84",
  "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1400&q=84",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=84",
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1400&q=84",
  "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1400&q=84",
  "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1400&q=84",
  "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1400&q=84",
];

const DISCOVERY_MOODS: DiscoveryMood[] = [
  {
    id: "world",
    label: "World",
    identity: "global",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=86",
    cardImage:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=82",
    eyebrow: "Global discovery",
    headline: "Where should the world take you next?",
    body:
      "Move through islands, old towns, food markets, rail cities, deserts, forests and mountain light without flattening any place into a brochure.",
    atmosphere: "Layered climates, cultural texture, shifting horizons",
    gradient:
      "linear-gradient(90deg, rgba(4,7,8,.9), rgba(19,31,32,.58) 48%, rgba(189,118,52,.2)), linear-gradient(0deg, rgba(5,7,7,.84), transparent 62%)",
    primaryHref: "/discover",
    suggestions: [
      { label: "Find the right place by budget", href: "/discover?feel=budget-fit" },
      { label: "Compare visa-easy escapes", href: "/discover?feel=visa-easy-culture" },
      { label: "Match weather to your mood", href: "/discover?feel=weather-mood" },
    ],
  },
  {
    id: "islands",
    label: "Islands",
    identity: "islands",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=86",
    cardImage:
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=900&q=82",
    eyebrow: "Oceanic warmth",
    headline: "Let the coast set the pace.",
    body:
      "Warm water, slow mornings, ferry light, reef days, monsoon timing and the quiet luxury of not rushing the horizon.",
    atmosphere: "Tide glow, water reflections, soft tropical motion",
    gradient:
      "linear-gradient(90deg, rgba(4,12,15,.94), rgba(11,50,54,.68) 48%, rgba(178,111,48,.24)), linear-gradient(0deg, rgba(5,8,8,.88), transparent 58%)",
    suggestions: [
      { label: "Warm islands under $150/day", href: "/discover?feel=warm-islands" },
      { label: "Easy ferries and beach towns", href: "/discover?feel=island-ferries" },
      { label: "Dry-season reef escapes", href: "/discover?feel=reef-season" },
    ],
  },
  {
    id: "cities",
    label: "Cities",
    identity: "cities",
    image:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=2400&q=86",
    cardImage:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=82",
    eyebrow: "Urban afterglow",
    headline: "Follow the city after dark.",
    body:
      "Food streets, late trains, skyline weather, hotel neighborhoods and the electricity of a place that keeps changing block by block.",
    atmosphere: "Neon reflection, transit rhythm, rain-lit glass",
    gradient:
      "linear-gradient(90deg, rgba(7,8,11,.95), rgba(16,28,42,.72) 46%, rgba(183,51,88,.28)), linear-gradient(0deg, rgba(4,5,7,.9), transparent 58%)",
    suggestions: [
      { label: "Cool-weather food cities", href: "/discover?feel=cool-food-cities" },
      { label: "Visa-easy culture capitals", href: "/discover?feel=visa-easy-culture" },
      { label: "Transit-rich long weekends", href: "/discover?feel=transit-weekends" },
    ],
  },
  {
    id: "deserts",
    label: "Deserts",
    identity: "deserts",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=2400&q=86",
    cardImage:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=82",
    eyebrow: "Dusk and heat",
    headline: "Wait for the desert to cool.",
    body:
      "Dune roads, courtyard shade, sunset rituals, stargazing nights and travel windows where heat becomes atmosphere, not friction.",
    atmosphere: "Heat haze, brass light, long shadows",
    gradient:
      "linear-gradient(90deg, rgba(16,9,6,.95), rgba(74,35,20,.7) 50%, rgba(198,117,50,.28)), linear-gradient(0deg, rgba(8,5,4,.9), transparent 60%)",
    suggestions: [
      { label: "Desert cities in shoulder season", href: "/discover?feel=desert-shoulder-season" },
      { label: "Dunes, craft and courtyard stays", href: "/discover?feel=desert-craft" },
      { label: "Road trips with sunset stops", href: "/discover?feel=desert-road" },
    ],
  },
  {
    id: "forests",
    label: "Forests",
    identity: "forests",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2400&q=86",
    cardImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=82",
    eyebrow: "Rain and green",
    headline: "Enter through the mist.",
    body:
      "Green corridors, rain strategy, lodge mornings, trail towns, canopy shade and the kind of quiet that changes the trip's volume.",
    atmosphere: "Mist layers, low rain, deep green movement",
    gradient:
      "linear-gradient(90deg, rgba(5,12,9,.95), rgba(18,52,38,.72) 50%, rgba(105,130,76,.22)), linear-gradient(0deg, rgba(5,8,6,.9), transparent 58%)",
    suggestions: [
      { label: "Forest lodges with rail access", href: "/discover?feel=forest-rail-lodges" },
      { label: "Rainy-season places that work", href: "/discover?feel=rainy-season" },
      { label: "Cool trails and quiet towns", href: "/discover?feel=cool-trail-towns" },
    ],
  },
  {
    id: "villages",
    label: "Villages",
    identity: "villages",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2400&q=86",
    cardImage:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=82",
    eyebrow: "Local rhythm",
    headline: "Choose the slower road.",
    body:
      "Market mornings, craft streets, family-run stays, local kitchens and small places where the day has texture before it has an itinerary.",
    atmosphere: "Warm lamps, craft texture, soft local-life glow",
    gradient:
      "linear-gradient(90deg, rgba(14,10,7,.95), rgba(58,39,24,.72) 48%, rgba(196,136,66,.24)), linear-gradient(0deg, rgba(7,5,4,.9), transparent 58%)",
    suggestions: [
      { label: "Quiet villages with rail access", href: "/discover?feel=quiet-rail-villages" },
      { label: "Craft towns and family stays", href: "/discover?feel=craft-towns" },
      { label: "Slow food without a car", href: "/discover?feel=slow-food-rail" },
    ],
  },
  {
    id: "mountains",
    label: "Mountains",
    identity: "mountains",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=86",
    cardImage:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=82",
    eyebrow: "High country",
    headline: "Go where the air changes.",
    body:
      "Rail passes, alpine food towns, shoulder-season light, snow windows and landscapes that make distance feel ceremonial.",
    atmosphere: "Thin air, cloud drift, glacier light",
    gradient:
      "linear-gradient(90deg, rgba(5,10,12,.95), rgba(20,47,55,.72) 48%, rgba(151,196,205,.18)), linear-gradient(0deg, rgba(5,7,8,.9), transparent 58%)",
    suggestions: [
      { label: "Cool mountain towns by train", href: "/discover?feel=mountain-rail" },
      { label: "Alpine food and spa weekends", href: "/discover?feel=alpine-food-spa" },
      { label: "Snow without complex logistics", href: "/discover?feel=easy-snow" },
    ],
  },
];

function KaleidoscopeBackdrop({
  active,
  reduceMotion,
}: {
  active: DiscoveryMood;
  reduceMotion: boolean | null;
}) {
  const images = [active.image, ...GLOBAL_COLLAGE_IMAGES.filter((image) => image !== active.image)].slice(0, 9);
  const panels = [
    "left-[4%] top-[10%] h-[28%] w-[23%] rotate-[-6deg] rounded-[2rem]",
    "left-[30%] top-[4%] h-[22%] w-[18%] rotate-[4deg] rounded-[1.4rem]",
    "right-[10%] top-[8%] h-[30%] w-[26%] rotate-[7deg] rounded-[2.2rem]",
    "left-[18%] top-[35%] h-[34%] w-[29%] rotate-[3deg] rounded-[2.4rem]",
    "right-[30%] top-[32%] h-[24%] w-[19%] rotate-[-7deg] rounded-[1.4rem]",
    "right-[5%] bottom-[18%] h-[28%] w-[25%] rotate-[-3deg] rounded-[2rem]",
    "left-[2%] bottom-[8%] h-[26%] w-[28%] rotate-[5deg] rounded-[2rem]",
    "left-[47%] bottom-[5%] h-[27%] w-[21%] rotate-[-4deg] rounded-[1.5rem]",
  ];

  return (
    <div className="absolute inset-0 -z-30 overflow-hidden bg-[#050707]" aria-hidden>
      <AnimatePresence mode="wait">
        <motion.img
          key={`${active.id}-base`}
          src={active.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover saturate-[1.18]"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
          animate={reduceMotion ? { opacity: 0.72 } : { opacity: 0.72, scale: 1.01 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </AnimatePresence>

      <motion.div
        className="absolute inset-[-8%] opacity-90"
        animate={reduceMotion ? undefined : { x: ["-1.5%", "1.5%", "-1%"], y: ["1%", "-1.5%", "1%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      >
        {panels.map((panel, index) => (
          <motion.div
            key={`${active.id}-${panel}`}
            className={`absolute overflow-hidden border border-white/14 bg-white/10 shadow-[0_30px_90px_rgba(0,0,0,.45)] backdrop-blur-sm ${panel}`}
            initial={reduceMotion ? { opacity: 0.62 } : { opacity: 0, y: 18, scale: 0.98 }}
            animate={reduceMotion ? { opacity: 0.62 } : { opacity: 0.76, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: index * 0.045, ease: "easeOut" }}
          >
            <motion.img
              src={images[index + 1] ?? images[0]}
              alt=""
              className="h-full w-full object-cover saturate-[1.2] contrast-[1.04]"
              animate={reduceMotion ? undefined : { scale: [1.03, 1.1, 1.04] }}
              transition={{ duration: 18 + index * 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.08),rgba(0,0,0,.18)_42%,rgba(0,0,0,.46))]" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="absolute inset-x-[-10%] top-[18%] h-[24rem] rotate-[-8deg] bg-[linear-gradient(90deg,transparent,rgba(216,173,79,.2),rgba(42,199,201,.14),rgba(229,54,102,.12),transparent)] blur-3xl"
        animate={reduceMotion ? undefined : { x: ["-6%", "8%", "-4%"], opacity: [0.4, 0.72, 0.46] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function CinematicDiscovery() {
  const [activeId, setActiveId] = useState(DISCOVERY_MOODS[0].id);
  const reduceMotion = useReducedMotion();
  const active = DISCOVERY_MOODS.find((mood) => mood.id === activeId) ?? DISCOVERY_MOODS[0];
  const identity = getDestinationIdentity(active.identity, "global");

  return (
    <>
      <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-sumi-900 text-white">
        <KaleidoscopeBackdrop active={active} reduceMotion={reduceMotion} />
        <motion.div
          className="absolute inset-0 -z-20"
          style={{ background: active.gradient }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55 }}
        />
        <motion.div
          key={`${active.id}-texture`}
          className="absolute inset-0 -z-10 opacity-70"
          style={{ backgroundImage: identity.texture }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.7 }}
        />
        <AmbientDestinationMotion key={active.id} identity={identity} />

        <div className="absolute inset-0 -z-[1] bg-[radial-gradient(circle_at_72%_24%,rgba(255,255,255,.12),transparent_26%),linear-gradient(90deg,rgba(3,5,5,.82),rgba(3,5,5,.52)_44%,rgba(3,5,5,.22)),linear-gradient(0deg,rgba(4,5,5,.9),rgba(4,5,5,.2)_42%,rgba(4,5,5,.42))]" />

        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl content-end gap-10 px-6 pb-12 pt-24 sm:pb-16 lg:grid-cols-[1.02fr_.98fr] lg:items-end lg:gap-14">
          <motion.div
            key={`${active.id}-copy`}
            className="max-w-3xl"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="luxury-kicker text-kintsugi-300">Journee global travel discovery</p>
            <h1 className="luxury-display mt-5 max-w-[11ch] text-[clamp(3rem,7.2vw,6.8rem)] font-semibold text-white">
              {active.headline}
            </h1>
            <p className="luxury-lede mt-7 max-w-2xl text-washi-50/88">{active.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={active.primaryHref ?? `/discover?mood=${active.id}`}
                className="rounded-full bg-white px-7 py-3 text-sm font-bold text-sumi-900 shadow-editorial-deep transition hover:bg-kintsugi-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kintsugi-300"
              >
                Start discovering
              </Link>
              <Link
                href="/city/tokyo"
                className="rounded-full border border-white/45 px-7 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kintsugi-300"
              >
                View pilot city
              </Link>
            </div>
          </motion.div>

          <aside className="rounded-[1.35rem] border border-white/24 bg-black/42 p-5 shadow-editorial-deep backdrop-blur-xl sm:p-7">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="luxury-kicker text-kintsugi-300/86">Search by feeling</p>
                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-white">
                  {active.eyebrow}
                </h2>
              </div>
              <p className="max-w-xs text-xs leading-5 text-white/62 sm:text-right">{active.atmosphere}</p>
            </div>

            <div className="mt-7 grid gap-3" aria-live="polite">
              {active.suggestions.map((suggestion) => (
                <Link
                  key={suggestion.href}
                  href={suggestion.href}
                  className="rounded-2xl border border-white/18 bg-white/[0.09] px-4 py-3 text-sm font-medium text-white/88 transition hover:border-kintsugi-300/70 hover:bg-white/[0.15] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kintsugi-300"
                >
                  {suggestion.label}
                </Link>
              ))}
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {DISCOVERY_MOODS.map((mood) => {
                const selected = mood.id === active.id;

                return (
                  <button
                    key={mood.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActiveId(mood.id)}
                    className={`group relative min-h-[8rem] overflow-hidden rounded-[1.05rem] border p-0 text-left shadow-editorial-deep transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kintsugi-300 ${
                      selected
                        ? "border-kintsugi-300/85 ring-1 ring-kintsugi-300/60"
                        : "border-white/16 hover:border-white/42"
                    }`}
                  >
                    <img
                      src={mood.cardImage}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.68))]" />
                    <span className="relative flex min-h-[8rem] flex-col justify-end p-4">
                      <span className="luxury-kicker text-kintsugi-300/86">{mood.eyebrow}</span>
                      <span className="mt-2 font-display text-2xl font-semibold leading-none text-white">
                        {mood.label}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      <section id="discover" className="relative z-10 mx-auto -mt-5 max-w-5xl px-6">
        <PreferencesPanel />
      </section>
    </>
  );
}
