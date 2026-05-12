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
      "Explore islands, old towns, food markets, rail cities, deserts, forests and mountain regions with practical filters that help narrow the choice.",
    atmosphere: "Weather, culture, transport and trip style",
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
      "Warm water, ferry routes, reef seasons, monsoon timing and beach towns where the pace stays easy.",
    atmosphere: "Beach weather, ferry access and island pace",
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
      "Food streets, late trains, skyline views, hotel neighborhoods and walkable districts with strong local energy.",
    atmosphere: "Urban food, nightlife, transit and hotel areas",
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
      "Dune roads, shaded courtyards, sunset drives, clear night skies and travel months when the heat is manageable.",
    atmosphere: "Desert weather, road trips and shoulder seasons",
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
      "Rainforest lodges, trail towns, canopy walks, cooler mornings and places where rain planning matters.",
    atmosphere: "Forest stays, trails, rain and cool mornings",
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
      "Market mornings, craft streets, family-run stays, local kitchens and smaller places where slow travel works.",
    atmosphere: "Local stays, markets, craft towns and rail access",
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
      "Rail passes, alpine towns, hiking bases, ski weeks, spa weekends and seasons with the right mountain weather.",
    atmosphere: "Mountain weather, rail access, hiking and snow",
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
  const heroMood = DISCOVERY_MOODS[0];
  const heroIdentity = getDestinationIdentity("global", "global");
  const activeIdentity = getDestinationIdentity(active.identity, "global");

  return (
    <>
      <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-sumi-900 text-white">
        <KaleidoscopeBackdrop active={heroMood} reduceMotion={reduceMotion} />
        <motion.div
          className="absolute inset-0 -z-20"
          style={{
            background:
              "linear-gradient(90deg, rgba(4,7,8,.86), rgba(12,21,22,.48) 48%, rgba(189,118,52,.16)), linear-gradient(0deg, rgba(5,7,7,.78), transparent 62%)",
          }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55 }}
        />
        <motion.div
          key="global-hero-texture"
          className="absolute inset-0 -z-10 opacity-70"
          style={{ backgroundImage: heroIdentity.texture }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.7 }}
        />
        <AmbientDestinationMotion identity={heroIdentity} />

        <div className="absolute inset-0 -z-[1] bg-[radial-gradient(circle_at_72%_24%,rgba(255,255,255,.12),transparent_26%),linear-gradient(90deg,rgba(3,5,5,.82),rgba(3,5,5,.52)_44%,rgba(3,5,5,.22)),linear-gradient(0deg,rgba(4,5,5,.9),rgba(4,5,5,.2)_42%,rgba(4,5,5,.42))]" />

        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl content-end px-6 pb-16 pt-24 sm:pb-20 lg:items-end">
          <motion.div
            className="max-w-4xl"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="luxury-kicker text-kintsugi-300">JOURNEE GLOBAL TRAVEL DISCOVERY</p>
            <h1 className="luxury-display mt-5 max-w-[12ch] text-[clamp(3.4rem,8.6vw,8.4rem)] font-semibold leading-[0.9] text-white">
              Where should the world take you next?
            </h1>
            <p className="luxury-lede mt-7 max-w-2xl text-washi-50/88">
              Discover destinations by budget, visa rules, weather, mood and travel style, then open each place with the details you need to plan confidently.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/discover"
                className="rounded-full bg-white px-7 py-3 text-sm font-bold text-sumi-900 shadow-editorial-deep transition hover:bg-kintsugi-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kintsugi-300"
              >
                Start Discovering
              </Link>
              <Link
                href="/city/tokyo"
                className="rounded-full border border-white/45 px-7 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kintsugi-300"
              >
                View Pilot City
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#070909] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-10">
        <div
          className="absolute inset-0 -z-30 opacity-30"
          style={{
            backgroundImage: `url(${active.image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          aria-hidden
        />
        <motion.div
          key={`${active.id}-feeling-gradient`}
          className="absolute inset-0 -z-20"
          style={{ background: active.gradient }}
          initial={{ opacity: 0.72 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55 }}
        />
        <motion.div
          key={`${active.id}-feeling-texture`}
          className="absolute inset-0 -z-10 opacity-45"
          style={{ backgroundImage: activeIdentity.texture }}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 0.45 }}
          transition={{ duration: 0.55 }}
        />
        <AmbientDestinationMotion key={`${active.id}-feeling-motion`} identity={activeIdentity} variant="section" />

        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="luxury-kicker text-kintsugi-300">SEARCH BY FEELING</p>
            <h2 className="mt-4 max-w-[13ch] font-sans text-[clamp(2.55rem,4.25vw,4.65rem)] font-semibold leading-[1] text-white">
              Choose the mood, then let the map change.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/72">
              Each mood changes the image, suggestions and planning clues, so you can start with the kind of trip you want before choosing the destination.
            </p>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1.16fr)_minmax(21rem,.84fr)] lg:items-start xl:gap-16">
            <motion.div
              key={`${active.id}-main-image`}
              className="relative min-h-[29rem] w-full overflow-hidden rounded-[1.8rem] border border-white/16 bg-black shadow-editorial-deep sm:min-h-[33rem] lg:min-h-[36rem]"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <img
                src={active.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover saturate-[1.18]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.02),rgba(0,0,0,.28)_42%,rgba(0,0,0,.84)),linear-gradient(90deg,rgba(0,0,0,.54),transparent)]" />
              <div className="absolute bottom-0 max-w-2xl p-7 sm:p-10 lg:p-12">
                <p className="luxury-kicker text-kintsugi-300/90">{active.eyebrow}</p>
                <h3 className="mt-3 max-w-xl font-sans text-[clamp(2.35rem,4.2vw,4.7rem)] font-semibold leading-[0.94] text-white">
                  {active.headline}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-8 text-white/78">{active.body}</p>
              </div>
            </motion.div>

            <div className="grid gap-6">
              <div className="rounded-[1.35rem] border border-white/18 bg-black/32 p-6 shadow-editorial-deep backdrop-blur-xl sm:p-8">
                <div className="flex items-end justify-between gap-5">
                  <div>
                    <p className="luxury-kicker text-kintsugi-300/82">MOOD LENS</p>
                    <h3 className="mt-3 font-sans text-3xl font-semibold leading-tight text-white">
                      {active.label}
                    </h3>
                  </div>
                  <span className="rounded-full border border-white/16 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.12em] text-white/68">
                    Live
                  </span>
                </div>

                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {DISCOVERY_MOODS.map((mood) => {
                    const selected = mood.id === active.id;

                    return (
                      <button
                        key={mood.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setActiveId(mood.id)}
                        className={`group relative min-h-[6.1rem] overflow-hidden rounded-[1.05rem] border p-0 text-left shadow-editorial-deep transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kintsugi-300 ${
                          selected
                            ? "border-kintsugi-300/90 ring-2 ring-kintsugi-300/55"
                            : "border-white/16 hover:border-white/42"
                        }`}
                      >
                        <img
                          src={mood.cardImage}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.72))]" />
                        <span className="relative flex min-h-[6.1rem] flex-col justify-end p-4">
                          <span className="luxury-kicker text-kintsugi-300/82">{mood.eyebrow}</span>
                          <span className="mt-2 font-sans text-xl font-semibold leading-none text-white">
                            {mood.label}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[1.35rem] border border-white/14 bg-white/[0.065] p-6 backdrop-blur-xl sm:p-7" aria-live="polite">
                <p className="luxury-kicker text-kintsugi-300/82">WHAT THIS HELPS DISCOVER</p>
                <p className="mt-4 text-sm leading-7 text-white/74">{active.atmosphere}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-[1.35rem] border border-white/12 bg-black/24 p-4 backdrop-blur-xl sm:p-5">
            <div className="grid gap-4 sm:grid-cols-3">
              {active.suggestions.map((suggestion) => (
                <Link
                  key={suggestion.href}
                  href={suggestion.href}
                  className="rounded-2xl border border-white/18 bg-white/[0.08] px-5 py-4 text-sm font-semibold text-white/86 transition hover:border-kintsugi-300/70 hover:bg-white/[0.14] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kintsugi-300"
                >
                  {suggestion.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="discover" className="relative z-10 mx-auto -mt-5 max-w-5xl px-6">
        <PreferencesPanel />
      </section>
    </>
  );
}
