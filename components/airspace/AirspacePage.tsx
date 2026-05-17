"use client";

/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  CloudSun,
  Compass,
  Gauge,
  Globe2,
  Menu,
  Plane,
  Radar,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  Waves,
} from "lucide-react";
import { JourneeBrand } from "@/components/brand/JourneeLogo";

type Corridor = {
  route: string;
  image: string;
  duration: string;
  aircraft: string;
  airline: string;
  cabin: string;
  scenic: string;
};

type Destination = {
  name: string;
  image: string;
  connected: string[];
  access: string;
  shortest: string;
  visa: string;
  seasonal: string;
};

const navItems = ["Airspace", "Routes", "Corridors", "Conditions", "Index"];

const metrics = [
  ["Active global routes", "18,420"],
  ["Fastest route today", "DXB-ZRH"],
  ["Best luxury corridor", "HND-SIN"],
  ["Weather disruptions", "24 zones"],
];

const intelligenceCards = [
  ["Best first class routes", "Tokyo to Singapore", "Suite consistency, lounge depth, and night-sector calm are currently strongest."],
  ["Quietest airports", "Zurich, Doha, Kansai", "Premium terminals are showing the lowest crowd pressure across the next six hours."],
  ["Fastest layovers", "Dubai, Helsinki, Singapore", "Private transfer corridors and airside transit are operating ahead of average."],
  ["Premium airline rankings", "ANA, Emirates, Singapore", "Cabin privacy, dining rhythm, and sleep posture lead today's weighted index."],
  ["Most scenic landings", "Santorini, Como, Queenstown", "Sun angle and cloud breaks are creating exceptional approach visibility."],
];

const hubs = [
  { code: "LAX", x: "18%", y: "46%" },
  { code: "JFK", x: "29%", y: "39%" },
  { code: "DXB", x: "58%", y: "49%" },
  { code: "ZRH", x: "49%", y: "37%" },
  { code: "HND", x: "79%", y: "42%" },
  { code: "SIN", x: "72%", y: "61%" },
];

const corridors: Corridor[] = [
  {
    route: "Tokyo -> Singapore",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1400&q=86",
    duration: "7h 10m",
    aircraft: "A350-900",
    airline: "Singapore Airlines",
    cabin: "96",
    scenic: "91",
  },
  {
    route: "Dubai -> Zurich",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=86",
    duration: "6h 45m",
    aircraft: "B777-300ER",
    airline: "Emirates",
    cabin: "94",
    scenic: "88",
  },
  {
    route: "Milan -> Kyoto",
    image: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=1400&q=86",
    duration: "13h 20m",
    aircraft: "B787-9",
    airline: "ANA",
    cabin: "92",
    scenic: "95",
  },
  {
    route: "New York -> Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=86",
    duration: "18h 05m",
    aircraft: "A380 + Seaplane",
    airline: "Etihad",
    cabin: "93",
    scenic: "97",
  },
];

const conditions = [
  ["Weather systems", "North Atlantic jet stream is accelerating eastbound premium lanes.", "Favorable"],
  ["Turbulence forecast", "Light chop over the Alps, calm corridors through the Gulf.", "Low"],
  ["Delay probability", "Zurich arrivals remain sensitive to storm cells after 19:00.", "Moderate"],
  ["Air traffic congestion", "Tokyo and Dubai show elevated but controlled departure density.", "Elevated"],
  ["Seasonal advisories", "Cherry blossom and Mediterranean shoulder season demand rising.", "Watch"],
];

const experienceIndex = [
  ["Cabin comfort", "ANA The Suite", "97"],
  ["Lounge quality", "Qatar Al Safwa", "96"],
  ["Dining experience", "Singapore Suites", "95"],
  ["Punctuality", "Swiss First", "93"],
  ["Sleep score", "Emirates Game Changer", "94"],
  ["Privacy rating", "JAL First", "92"],
];

const destinations: Destination[] = [
  {
    name: "Kyoto",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=88",
    connected: ["Tokyo", "Seoul", "Singapore", "Doha"],
    access: "KIX arrival with private rail or chauffeur transfer.",
    shortest: "HND -> ITM premium domestic bridge.",
    visa: "Strong compatibility for US, UAE, EU, and UK passports.",
    seasonal: "March and April favor early morning arrivals for garden access.",
  },
  {
    name: "Zurich",
    image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=1800&q=88",
    connected: ["Dubai", "New York", "Milan", "Singapore"],
    access: "First class arrivals connect directly into Alpine chauffeur corridors.",
    shortest: "DXB -> ZRH non-stop evening arrival.",
    visa: "Schengen access recommended before Alpine transfers.",
    seasonal: "June brings lake routes; December favors ski-region continuity.",
  },
  {
    name: "Maldives",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1800&q=88",
    connected: ["Doha", "Dubai", "Singapore", "Istanbul"],
    access: "Best luxury access through Doha or Dubai with coordinated seaplane timing.",
    shortest: "DXB -> MLE with private resort transfer.",
    visa: "Arrival access is broad, with resort documentation pre-cleared.",
    seasonal: "January to April has strongest seaplane reliability.",
  },
];

const movementFeed = [
  "Storm affecting Zurich arrivals",
  "Cherry blossom season increasing Tokyo traffic",
  "Private aviation demand rising in Milan",
  "Best sunset arrival currently: Santorini",
  "Dubai premium transfer corridors operating ahead of schedule",
  "Maldives seaplane windows narrowing after 16:30",
  "Singapore lounge occupancy trending below average",
  "North Atlantic tailwinds improving eastbound first class sleep sectors",
];

export function AirspacePage() {
  const [selected, setSelected] = useState(destinations[0].name);
  const activeDestination = useMemo(
    () => destinations.find((destination) => destination.name === selected) ?? destinations[0],
    [selected],
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#030605] text-[#fff8ea]">
      <Header />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(180deg,#030605_0%,#08100f_42%,#030605_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.11] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:84px_84px]" />
      <HeroAirspace />
      <div className="relative mx-auto max-w-[1780px] space-y-6 px-4 pb-10 sm:px-6 lg:px-8">
        <LiveRouteIntelligence />
        <PremiumCorridors />
        <AirspaceConditions />
        <AirlineExperienceIndex />
        <DestinationConnections
          selected={selected}
          setSelected={setSelected}
          activeDestination={activeDestination}
        />
        <MovementFeed />
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#030605]/84 backdrop-blur-2xl">
      <div className="mx-auto flex h-[76px] max-w-[1780px] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="JOURNEE home" className="shrink-0">
          <JourneeBrand
            direction="atlas-aperture"
            className="[&>span:first-child]:h-9 [&>span:first-child]:w-9 [&>span:first-child]:rounded-none [&>span:first-child]:border-0 [&>span:first-child]:bg-transparent [&>span:first-child]:shadow-none [&>span:first-child_svg]:h-8 [&>span:first-child_svg]:w-8 [&>span:last-child]:text-[1.35rem] [&>span:last-child]:font-semibold [&>span:last-child]:tracking-[0.16em]"
          />
        </Link>
        <nav className="hidden items-center gap-7 text-[0.78rem] font-medium uppercase text-white/66 lg:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-[#efc15d]">
              {item}
            </a>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-3 md:flex">
          <span className="rounded-full border border-[#d8aa4f]/35 bg-[#d8aa4f]/10 px-4 py-2 text-[0.72rem] font-medium uppercase text-[#f1c76d]">
            Live global signal
          </span>
          <button className="grid h-10 w-10 place-items-center rounded-lg border border-white/12 bg-white/[0.04] text-white/80">
            <Radar className="h-4 w-4" />
          </button>
        </div>
        <button className="ml-auto grid h-10 w-10 place-items-center rounded-lg border border-white/12 bg-white/[0.04] text-white lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

function HeroAirspace() {
  return (
    <section id="airspace" className="relative min-h-screen overflow-hidden px-4 pt-[76px] sm:px-6 lg:px-8">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=2600&q=88"
          alt=""
          className="h-full w-full object-cover opacity-48"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(216,170,79,.16),transparent_27%),linear-gradient(90deg,rgba(3,6,5,.92),rgba(3,6,5,.34)_46%,rgba(3,6,5,.94)),linear-gradient(180deg,rgba(3,6,5,.26),#030605_96%)]" />
      </div>
      <div className="absolute inset-x-0 top-[12%] mx-auto h-[68vw] max-h-[900px] max-w-[1200px] opacity-80">
        <RouteGlobe hero />
      </div>
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-76px)] max-w-[1780px] flex-col justify-between py-10">
        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.7fr)]">
          <div className="max-w-5xl">
            <p className="mb-5 text-[0.76rem] font-medium uppercase text-[#efc15d]">
              Airspace / Global Routes Intelligence
            </p>
            <h1 className="max-w-4xl text-[clamp(3.4rem,8vw,8.8rem)] font-extrabold uppercase leading-[0.92] text-white">
              The world is in motion
            </h1>
            <p className="mt-7 max-w-2xl text-base font-normal leading-8 text-white/76 sm:text-lg">
              Explore global routes, premium connections, and intelligent travel corridors.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button className="inline-flex h-[52px] items-center justify-center gap-3 rounded-lg bg-[#d8aa4f] px-6 text-sm font-medium uppercase text-[#120f0a] shadow-[0_18px_44px_rgba(216,170,79,.22)]">
                Explore Airspace <ArrowRight className="h-4 w-4" />
              </button>
              <button className="inline-flex h-[52px] items-center justify-center gap-3 rounded-lg border border-[#d8aa4f]/45 bg-black/24 px-6 text-sm font-medium uppercase text-white backdrop-blur-xl">
                Build Flight Path <Plane className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {metrics.map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/12 bg-[#07100f]/66 p-5 shadow-[0_24px_70px_rgba(0,0,0,.35)] backdrop-blur-2xl">
                <p className="text-[0.68rem] font-medium uppercase text-[#efc15d]">{label}</p>
                <p className="mt-3 text-2xl font-bold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-3 border-t border-white/10 pt-5 text-[0.76rem] font-medium uppercase text-white/58 sm:grid-cols-3">
          <span>Global luxury corridors</span>
          <span>Weather and route pressure</span>
          <span>Cabin intelligence index</span>
        </div>
      </div>
    </section>
  );
}

function LiveRouteIntelligence() {
  return (
    <section id="routes" className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(380px,.58fr)]">
      <GlassPanel className="min-h-[620px] overflow-hidden p-4 sm:p-6">
        <SectionHeading eyebrow="Live route intelligence" title="Global movement, filtered for premium access." />
        <div className="relative mt-6 min-h-[480px] overflow-hidden rounded-lg border border-white/10 bg-[#030807]">
          <RouteGlobe />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_45%,transparent_0,transparent_30%,rgba(3,8,7,.58)_68%,rgba(3,8,7,.92)_100%)]" />
          {hubs.map((hub) => (
            <div key={hub.code} className="absolute" style={{ left: hub.x, top: hub.y }}>
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#efc15d] opacity-60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#efc15d]" />
              </span>
              <span className="mt-2 block text-[0.68rem] font-bold text-white/82">{hub.code}</span>
            </div>
          ))}
          <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-3">
            {["Route density", "Aircraft flow", "Hub pressure"].map((item, index) => (
              <div key={item} className="rounded-lg border border-white/10 bg-black/32 p-4 backdrop-blur-xl">
                <p className="text-[0.68rem] font-medium uppercase text-white/52">{item}</p>
                <div className="mt-3 h-1.5 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-[#d8aa4f]" style={{ width: `${78 - index * 13}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassPanel>
      <div className="space-y-3">
        {intelligenceCards.map(([title, value, copy]) => (
          <GlassPanel key={title} className="p-5">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-[#d8aa4f]/28 bg-[#d8aa4f]/10 text-[#efc15d]">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[0.7rem] font-medium uppercase text-[#efc15d]">{title}</p>
                <h3 className="mt-2 text-xl font-bold text-white">{value}</h3>
                <p className="mt-2 text-sm font-normal leading-6 text-white/62">{copy}</p>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}

function PremiumCorridors() {
  return (
    <section id="corridors" className="space-y-5">
      <SectionHeading eyebrow="Premium flight corridors" title="Cinematic sectors built around cabin quality, timing, and arrival drama." />
      <div className="grid gap-5 xl:grid-cols-4">
        {corridors.map((corridor) => (
          <article key={corridor.route} className="group min-h-[520px] overflow-hidden rounded-lg border border-white/12 bg-[#07100f] shadow-[0_24px_80px_rgba(0,0,0,.32)]">
            <div className="relative h-full min-h-[520px]">
              <img src={corridor.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.36)_40%,rgba(3,6,5,.96)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[0.72rem] font-medium uppercase text-[#efc15d]">{corridor.duration} / {corridor.aircraft}</p>
                <h3 className="mt-3 text-3xl font-extrabold uppercase leading-tight text-white">{corridor.route}</h3>
                <p className="mt-3 text-sm font-normal text-white/66">{corridor.airline}</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Metric label="Cabin quality" value={corridor.cabin} />
                  <Metric label="Scenic route" value={corridor.scenic} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AirspaceConditions() {
  return (
    <section id="conditions" className="grid gap-5 lg:grid-cols-[.64fr_1fr]">
      <GlassPanel className="overflow-hidden p-6">
        <SectionHeading eyebrow="Airspace conditions" title="Weather, pressure, and seasonal movement in one calm reading." />
        <div className="relative mt-8 aspect-square overflow-hidden rounded-lg border border-white/10 bg-[#030807]">
          <div className="absolute inset-8 rounded-full border border-[#d8aa4f]/22" />
          <div className="absolute inset-20 rounded-full border border-white/10" />
          <div className="absolute inset-32 rounded-full border border-[#d8aa4f]/18" />
          <div className="absolute left-[18%] top-[28%] h-28 w-44 rounded-full bg-[#d8aa4f]/16 blur-2xl" />
          <div className="absolute bottom-[22%] right-[18%] h-24 w-36 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute inset-0 grid place-items-center">
            <Radar className="h-24 w-24 text-[#efc15d]" />
          </div>
        </div>
      </GlassPanel>
      <GlassPanel className="p-5 sm:p-6">
        <div className="grid gap-3">
          {conditions.map(([title, copy, status], index) => (
            <div key={title} className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-5 sm:grid-cols-[210px_1fr_110px] sm:items-center">
              <div className="flex items-center gap-3">
                {[CloudSun, Waves, Timer, Gauge, Compass][index] && (() => {
                  const Icon = [CloudSun, Waves, Timer, Gauge, Compass][index];
                  return <Icon className="h-5 w-5 text-[#efc15d]" />;
                })()}
                <p className="text-sm font-semibold text-white">{title}</p>
              </div>
              <p className="text-sm font-normal leading-6 text-white/62">{copy}</p>
              <span className="rounded-full border border-[#d8aa4f]/28 bg-[#d8aa4f]/10 px-3 py-1 text-center text-[0.7rem] font-medium uppercase text-[#efc15d]">
                {status}
              </span>
            </div>
          ))}
        </div>
      </GlassPanel>
    </section>
  );
}

function AirlineExperienceIndex() {
  return (
    <section className="space-y-5">
      <SectionHeading eyebrow="Airline experience index" title="A luxury ranking system tuned for rest, privacy, and atmosphere." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {experienceIndex.map(([label, winner, score], index) => (
          <GlassPanel key={label} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-lg border border-[#d8aa4f]/25 bg-[#d8aa4f]/10 text-[#efc15d]">
                {[ShieldCheck, Star, Sparkles, Timer, Plane, Radar][index] && (() => {
                  const Icon = [ShieldCheck, Star, Sparkles, Timer, Plane, Radar][index];
                  return <Icon className="h-5 w-5" />;
                })()}
              </span>
              <p className="text-4xl font-bold text-white">{score}</p>
            </div>
            <p className="mt-6 text-[0.72rem] font-medium uppercase text-[#efc15d]">{label}</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{winner}</h3>
            <div className="mt-5 h-1.5 rounded-full bg-white/10">
              <div className="h-full rounded-full bg-[#d8aa4f]" style={{ width: `${Number(score)}%` }} />
            </div>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}

function DestinationConnections({
  selected,
  setSelected,
  activeDestination,
}: {
  selected: string;
  setSelected: (value: string) => void;
  activeDestination: Destination;
}) {
  return (
    <section className="grid gap-5 xl:grid-cols-[1.1fr_.8fr]">
      <div className="relative min-h-[680px] overflow-hidden rounded-lg border border-white/12 bg-[#07100f]">
        <img src={activeDestination.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,6,5,.92),rgba(3,6,5,.54)_48%,rgba(3,6,5,.18)),linear-gradient(180deg,transparent,rgba(3,6,5,.9))]" />
        <div className="relative z-10 flex min-h-[680px] flex-col justify-between p-6 sm:p-8">
          <SectionHeading eyebrow="Cinematic destination connections" title={activeDestination.name} />
          <div className="max-w-2xl space-y-4">
            <ConnectionRow label="Best connected cities" value={activeDestination.connected.join(" / ")} />
            <ConnectionRow label="Easiest luxury access" value={activeDestination.access} />
            <ConnectionRow label="Shortest premium route" value={activeDestination.shortest} />
            <ConnectionRow label="Visa compatibility" value={activeDestination.visa} />
            <ConnectionRow label="Seasonal route recommendations" value={activeDestination.seasonal} />
          </div>
        </div>
      </div>
      <GlassPanel className="p-5 sm:p-6">
        <p className="text-[0.72rem] font-medium uppercase text-[#efc15d]">Select destination</p>
        <div className="mt-5 space-y-3">
          {destinations.map((destination) => (
            <button
              key={destination.name}
              onClick={() => setSelected(destination.name)}
              className={`flex w-full items-center justify-between rounded-lg border p-4 text-left transition ${
                selected === destination.name
                  ? "border-[#d8aa4f]/55 bg-[#d8aa4f]/12"
                  : "border-white/10 bg-white/[0.035] hover:border-white/20"
              }`}
            >
              <span>
                <span className="block text-lg font-semibold text-white">{destination.name}</span>
                <span className="mt-1 block text-sm font-normal text-white/56">{destination.connected.length} premium access cities</span>
              </span>
              <ChevronRight className="h-5 w-5 text-[#efc15d]" />
            </button>
          ))}
        </div>
        <div className="mt-6 rounded-lg border border-white/10 bg-black/24 p-5">
          <p className="text-sm font-semibold text-white">Route recommendation</p>
          <p className="mt-3 text-sm font-normal leading-6 text-white/62">
            Prioritize overnight premium cabins into calm morning arrivals, then use private transfers for the last mile.
          </p>
        </div>
      </GlassPanel>
    </section>
  );
}

function MovementFeed() {
  return (
    <section className="overflow-hidden rounded-lg border border-white/12 bg-[#07100f]/84 py-6 shadow-[0_24px_80px_rgba(0,0,0,.32)] backdrop-blur-2xl">
      <div className="mb-5 flex items-center justify-between px-5 sm:px-6">
        <SectionHeading eyebrow="Real-time movement feed" title="Editorial signals from the routes that matter." />
        <Globe2 className="hidden h-7 w-7 text-[#efc15d] sm:block" />
      </div>
      <div className="relative flex overflow-hidden border-y border-white/10 py-5">
        <div className="flex min-w-full animate-[airspace-marquee_34s_linear_infinite] gap-4 px-4">
          {[...movementFeed, ...movementFeed].map((item, index) => (
            <span key={`${item}-${index}`} className="shrink-0 rounded-lg border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-medium text-white/76">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function RouteGlobe({ hero = false }: { hero?: boolean }) {
  return (
    <svg viewBox="0 0 1000 620" className={`absolute inset-0 h-full w-full ${hero ? "opacity-70" : "opacity-100"}`} aria-hidden="true">
      <defs>
        <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d8aa4f" stopOpacity=".16" />
          <stop offset="58%" stopColor="#07100f" stopOpacity=".52" />
          <stop offset="100%" stopColor="#030605" stopOpacity=".05" />
        </radialGradient>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse cx="500" cy="310" rx="430" ry="248" fill="url(#globeGlow)" stroke="rgba(216,170,79,.22)" />
      {Array.from({ length: 9 }).map((_, index) => (
        <ellipse key={`lat-${index}`} cx="500" cy="310" rx={430 - index * 34} ry={248 - index * 19} fill="none" stroke="rgba(255,255,255,.08)" />
      ))}
      {Array.from({ length: 11 }).map((_, index) => (
        <path key={`lon-${index}`} d={`M ${116 + index * 77} 80 C ${420 + index * 18} 220, ${420 - index * 18} 400, ${116 + index * 77} 540`} fill="none" stroke="rgba(255,255,255,.07)" />
      ))}
      <RouteArc d="M170 325 C330 130, 540 128, 785 260" delay="0s" />
      <RouteArc d="M292 245 C444 350, 566 376, 720 314" delay="-2.5s" />
      <RouteArc d="M480 286 C590 196, 706 190, 828 275" delay="-4.8s" />
      <RouteArc d="M330 390 C468 510, 612 492, 744 382" delay="-7s" />
      <RouteArc d="M570 352 C664 254, 735 246, 812 338" delay="-9.2s" />
    </svg>
  );
}

function RouteArc({ d, delay }: { d: string; delay: string }) {
  return (
    <>
      <path d={d} fill="none" stroke="rgba(216,170,79,.3)" strokeWidth="1.4" />
      <path
        d={d}
        fill="none"
        stroke="#efc15d"
        strokeDasharray="54 740"
        strokeLinecap="round"
        strokeWidth="2.4"
        filter="url(#softGlow)"
        style={{ animation: "airspace-route 8s linear infinite", animationDelay: delay }}
      />
    </>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-[0.72rem] font-medium uppercase text-[#efc15d]">{eyebrow}</p>
      <h2 className="mt-3 max-w-4xl text-[clamp(1.65rem,3.4vw,3.8rem)] font-semibold leading-tight text-white">
        {title}
      </h2>
    </div>
  );
}

function GlassPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-lg border border-white/12 bg-[#07100f]/78 shadow-[0_24px_80px_rgba(0,0,0,.32)] backdrop-blur-2xl ${className}`}>
      {children}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/28 p-4">
      <p className="text-[0.65rem] font-medium uppercase text-white/52">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function ConnectionRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/12 bg-black/32 p-5 backdrop-blur-xl">
      <p className="text-[0.68rem] font-medium uppercase text-[#efc15d]">{label}</p>
      <p className="mt-2 text-base font-normal leading-7 text-white/78">{value}</p>
    </div>
  );
}
