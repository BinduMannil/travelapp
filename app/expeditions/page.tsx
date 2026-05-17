/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  CalendarDays,
  ChevronRight,
  Compass,
  Crosshair,
  Eye,
  Flame,
  Globe2,
  Headphones,
  Home,
  Map,
  Menu,
  Mountain,
  Navigation,
  Satellite,
  Search,
  Settings,
  ShipWheel,
  Snowflake,
  Sparkles,
  Star,
  Sun,
  TrainFront,
  UserRound,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { JourneeLogoMark } from "@/components/brand/JourneeLogo";
import { MainNavLink } from "@/components/navigation/MainNavLink";
import { navigationHref } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Expeditions / Extreme Earth",
  description:
    "Elite expedition intelligence, cinematic Earth exploration, remote wilderness discovery, luxury survival journeys, and immersive extreme travel from JOURNEE.",
};

const gold = "#d8aa4f";

const navItems = [
  { label: "Home", icon: Home },
  { label: "Explore", icon: Navigation },
  { label: "Destinations", icon: Map },
  { label: "Journeys", icon: CalendarDays },
  { label: "Yachts", icon: ShipWheel },
  { label: "Rail Journeys", icon: TrainFront },
  { label: "Aurora", icon: Sparkles },
  { label: "Expeditions", icon: Compass, active: true },
  { label: "Experiences", icon: Crosshair },
  { label: "Concierge", icon: Globe2 },
];

const accountItems: Array<{ label: string; icon: LucideIcon; badge?: string }> = [
  { label: "Alerts", icon: Bell, badge: "3" },
  { label: "Saved", icon: Star },
  { label: "Profile", icon: UserRound },
  { label: "Settings", icon: Settings },
];

const accountHref: Record<string, string> = {
  Alerts: "/alerts",
  Saved: "/profile",
  Profile: "/profile",
  Settings: "/settings",
};

const destinations = [
  {
    name: "Antarctica",
    region: "The Last Continent",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=90",
    season: "Nov - Feb",
    level: "Extreme",
    access: "Remote",
    climate: "Severe",
    score: "9.6",
  },
  {
    name: "Everest Region",
    region: "Himalayas, Nepal",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=90",
    season: "Mar - May",
    level: "Extreme",
    access: "Remote",
    climate: "Extreme",
    score: "9.8",
  },
  {
    name: "Patagonia",
    region: "South America",
    image:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=900&q=90",
    season: "Oct - Apr",
    level: "Challenging",
    access: "Remote",
    climate: "High",
    score: "9.2",
  },
  {
    name: "Iceland Highlands",
    region: "Iceland",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=90",
    season: "Jun - Sep",
    level: "Challenging",
    access: "Remote",
    climate: "High",
    score: "8.9",
  },
  {
    name: "Sahara",
    region: "North Africa",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=900&q=90",
    season: "Oct - Mar",
    level: "Challenging",
    access: "Remote",
    climate: "Extreme",
    score: "8.8",
  },
  {
    name: "Greenland",
    region: "Arctic Territory",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=90",
    season: "Jun - Sep",
    level: "Extreme",
    access: "Very Remote",
    climate: "Severe",
    score: "9.5",
  },
  {
    name: "Arctic Circle",
    region: "High North",
    image:
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=900&q=90",
    season: "Nov - Mar",
    level: "Extreme",
    access: "Remote",
    climate: "Severe",
    score: "9.3",
  },
];

const experiences = [
  {
    title: "Polar Camps",
    body: "Extreme comfort in extreme places",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=90",
  },
  {
    title: "Luxury Survival Lodges",
    body: "Refined wilderness retreats",
    image:
      "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=700&q=90",
  },
  {
    title: "Glacier Crossings",
    body: "Navigate ancient ice landscapes",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=90",
  },
  {
    title: "Volcano Expeditions",
    body: "Stand at the edge of raw power",
    image:
      "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=700&q=90",
  },
  {
    title: "Icebreaker Voyages",
    body: "Pioneer the frozen frontiers",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=90",
  },
  {
    title: "High-Altitude Rail Routes",
    body: "Scenic routes to the roof of the world",
    image:
      "https://images.unsplash.com/photo-1545153996-02e831f03d56?auto=format&fit=crop&w=700&q=90",
  },
];

const atmospheres = [
  {
    title: "Whiteout Storms",
    body: "Embrace the raw power of nature",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=90",
  },
  {
    title: "Frozen Silence",
    body: "Find stillness in the coldest places",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=90",
  },
  {
    title: "Volcanic Skies",
    body: "Fire, ash, and untamed beauty",
    image:
      "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=700&q=90",
  },
  {
    title: "Desert Twilight",
    body: "Endless dunes, timeless moments",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=700&q=90",
  },
  {
    title: "Glacial Sunrise",
    body: "Witness the ice glow at dawn",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=90",
  },
  {
    title: "Endless Midnight",
    body: "Days without sun, stars without end",
    image:
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=700&q=90",
  },
];

const feed = [
  {
    tag: "Extreme",
    time: "15m ago",
    text: "Severe winds approaching Everest Base Camp",
    body: "High altitude gusts expected over the next 48 hours.",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=360&q=84",
    icon: Wind,
  },
  {
    tag: "Weather",
    time: "1h ago",
    text: "Exceptional Patagonia visibility today",
    body: "Crystal clear conditions across Torres del Paine.",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=360&q=84",
    icon: Eye,
  },
  {
    tag: "Alert",
    time: "2h ago",
    text: "Volcanic activity rising in Iceland",
    body: "Increased seismic activity detected in the Highlands.",
    image:
      "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?auto=format&fit=crop&w=360&q=84",
    icon: Flame,
  },
  {
    tag: "Rare",
    time: "3h ago",
    text: "Antarctic skies unusually clear tonight",
    body: "Perfect conditions for stargazing and aurora.",
    image:
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=360&q=84",
    icon: Sparkles,
  },
];

export default function ExpeditionsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020403] text-[#fff8ea]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_52%_-10%,rgba(216,170,79,.18),transparent_32%),radial-gradient(circle_at_95%_16%,rgba(144,169,184,.18),transparent_29%),linear-gradient(180deg,#020403_0%,#07100f_45%,#020403_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.11] [background-image:linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:80px_80px]" />
      <div className="relative mx-auto flex w-full max-w-[1800px]">
        <Sidebar />
        <section className="min-w-0 flex-1 px-3 pb-6 pt-3 sm:px-5 lg:ml-[236px] lg:px-8">
          <Hero />
          <div className="space-y-4">
            <DestinationDiscovery />
            <div className="grid gap-4 xl:grid-cols-[1.05fr_.95fr]">
              <ExpeditionMap />
              <ExperienceLayer />
            </div>
            <AtmosphereEngine />
            <div className="grid gap-4 xl:grid-cols-[1fr_.72fr]">
              <LiveFeed />
              <ExpeditionCta />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[236px] border-r border-white/10 bg-[#020403]/88 px-5 py-7 backdrop-blur-2xl lg:flex lg:flex-col">
      <Link href="/" className="mb-8 flex items-start gap-3">
        <JourneeLogoMark className="mt-0.5 h-7 w-7 text-[#d8aa4f]" />
        <span>
          <span className="block text-[1.42rem] font-bold uppercase leading-none tracking-[0.24em] text-[#f3c56b]">
            Journee
          </span>
          <span className="mt-2 block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/82">
            Expeditions
          </span>
        </span>
      </Link>
      <nav className="space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <MainNavLink
              key={item.label}
              label={item.label}
              href={navigationHref(item.label)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.78rem] font-medium transition ${
                item.active
                  ? "border border-[#d8aa4f]/25 bg-[#d8aa4f]/18 text-white shadow-[0_16px_40px_rgba(216,170,79,.12)]"
                  : "text-white/76 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </MainNavLink>
          );
        })}
      </nav>
      <div className="my-6 h-px bg-white/12" />
      <div className="space-y-1.5">
        {accountItems.map(({ label, icon: Icon, badge }) => (
          <a
            key={label}
            href={accountHref[label] ?? "/profile"}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.78rem] font-medium text-white/76 transition hover:bg-white/[0.05] hover:text-white"
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
            {badge ? (
              <span className="ml-auto grid h-5 w-5 place-items-center rounded-full bg-[#d8aa4f] text-[0.62rem] font-bold text-black">
                {badge}
              </span>
            ) : null}
          </a>
        ))}
      </div>
      <div className="mt-auto space-y-5">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
            alt=""
            className="h-12 w-12 rounded-full border border-[#d8aa4f]/35 object-cover"
          />
          <div>
            <div className="text-[0.76rem] font-bold uppercase text-white">Alexander</div>
            <div className="text-[0.66rem] font-normal text-white/60">Platinum Member</div>
          </div>
        </div>
        <div className="rounded-md bg-[#d8aa4f]/10 px-4 py-3 text-center text-[0.72rem] font-bold uppercase text-[#d8aa4f]">
          128,450 Points
        </div>
        <div className="rounded-lg border border-[#d8aa4f]/24 bg-black/28 p-4">
          <div className="text-[0.76rem] font-bold uppercase leading-5 text-[#d8aa4f]">
            Your Expedition Concierge
          </div>
          <p className="mt-3 text-[0.72rem] font-normal leading-5 text-white/66">
            Available 24/7 for routing, risk, and private access.
          </p>
          <Headphones className="mx-auto mt-6 h-9 w-9 text-[#d8aa4f]" />
          <button className="mt-6 w-full rounded-md border border-[#d8aa4f]/35 px-3 py-2.5 text-[0.62rem] font-bold uppercase text-[#d8aa4f]">
            Contact Concierge
          </button>
        </div>
      </div>
    </aside>
  );
}

function Hero() {
  return (
    <section className="relative mb-4 min-h-[640px] overflow-hidden border-b border-white/10 bg-black lg:rounded-b-2xl">
      <img
        src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2400&q=92"
        alt="Mount Everest expedition team beneath a storm-lit Himalayan summit"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,4,3,.97)_0%,rgba(2,4,3,.68)_30%,rgba(2,4,3,.22)_64%,rgba(2,4,3,.78)_100%),linear-gradient(180deg,rgba(2,4,3,.18)_0%,rgba(2,4,3,.04)_50%,rgba(2,4,3,.96)_100%)]" />
      <div className="relative z-10 flex min-h-[640px] flex-col px-5 py-6 sm:px-8 lg:px-10">
        <TopBar />
        <div className="mt-auto grid gap-8 pb-12 pt-16 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-end">
          <div className="max-w-[850px]">
            <p className="mb-5 text-[0.78rem] font-bold uppercase tracking-[0.1em] text-[#d8aa4f]">
              Explore without boundaries
            </p>
            <h1 className="text-[clamp(3rem,8.8vw,6.9rem)] font-extrabold uppercase leading-[0.95] tracking-[0] text-white">
              Beyond
              <span className="block">The Edge</span>
              <span className="block">
                Of <span className="text-[#d8aa4f]">Earth</span>
              </span>
            </h1>
            <p className="mt-6 max-w-[660px] text-[clamp(1rem,1.65vw,1.22rem)] font-normal leading-8 text-white/88">
              Explore the planet&apos;s most remote, atmospheric, and extraordinary frontiers.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="inline-flex min-h-12 items-center gap-4 rounded-lg bg-[#d8aa4f] px-6 py-4 text-[0.78rem] font-bold uppercase text-black shadow-[0_18px_40px_rgba(216,170,79,.3)]">
                Explore Expeditions <ArrowRight className="h-4 w-4" />
              </button>
              <button className="inline-flex min-h-12 items-center gap-4 rounded-lg border border-[#d8aa4f]/48 bg-black/40 px-6 py-4 text-[0.78rem] font-bold uppercase text-white backdrop-blur-xl">
                Build Expedition Route <Compass className="h-4 w-4 text-[#d8aa4f]" />
              </button>
            </div>
          </div>
          <MetricPanel />
        </div>
      </div>
    </section>
  );
}

function TopBar() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-xl border border-white/14 bg-black/46 px-4 backdrop-blur-2xl sm:max-w-[620px]">
        <Search className="h-5 w-5 shrink-0 text-white/82" />
        <span className="truncate text-[0.82rem] font-medium text-white/52">
          Search expeditions, regions, routes...
        </span>
      </div>
      <div className="ml-auto hidden items-center gap-5 md:flex">
        {[Globe2, Star, Bell, Menu].map((Icon, index) => (
          <button
            key={index}
            aria-label={`Expedition action ${index + 1}`}
            className="relative grid h-10 w-10 place-items-center rounded-full text-white transition hover:bg-white/10"
          >
            <Icon className={`h-5 w-5 ${index === 1 ? "fill-[#d8aa4f] text-[#d8aa4f]" : ""}`} />
            {index === 2 ? (
              <span className="absolute right-1 top-0 grid h-5 w-5 place-items-center rounded-full bg-[#d8aa4f] text-[0.63rem] font-bold text-black">
                3
              </span>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}

function MetricPanel() {
  const metrics: Array<{ label: string; value: string; note?: string }> = [
    { label: "Expedition risk", value: "Moderate - High" },
    { label: "Weather severity", value: "Severe" },
    { label: "Isolation index", value: "9.2 /10", note: "Extreme" },
    { label: "Visibility score", value: "8.7 /10", note: "Excellent" },
  ];

  return (
    <div className="rounded-xl border border-white/13 bg-[#070b0a]/76 p-1 shadow-[0_26px_80px_rgba(0,0,0,.55)] backdrop-blur-2xl">
      {metrics.map(({ label, value, note }, index) => (
        <div
          key={label}
          className={`px-5 py-4 ${index ? "border-t border-white/9" : ""}`}
        >
          <div className="text-[0.62rem] font-medium uppercase text-white/54">{label}</div>
          <div className="mt-1 flex items-end gap-3 text-[1.02rem] font-normal text-white">
            <span>{value}</span>
            {note ? <span className="pb-0.5 text-[0.58rem] text-white/46">{note}</span> : null}
          </div>
        </div>
      ))}
    </div>
  );
}

function DestinationDiscovery() {
  return (
    <Panel title="Extreme Destination Discovery" action="View all destinations" className="-mt-[26px] relative z-20">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-7">
        {destinations.map((destination) => (
          <article
            key={destination.name}
            className="overflow-hidden rounded-lg border border-white/11 bg-[#080d0c]/78 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]"
          >
            <div className="relative h-44 overflow-hidden">
              <img src={destination.image} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.02)_10%,rgba(2,4,3,.88)_100%)]" />
            </div>
            <div className="space-y-4 p-4">
              <div>
                <h3 className="text-[0.82rem] font-semibold uppercase leading-5 text-white">
                  {destination.name}
                </h3>
                <p className="mt-1 text-[0.66rem] font-normal text-white/62">{destination.region}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-[0.65rem]">
                <MiniMetric value={destination.season} label="Best Season" />
                <MiniMetric value={destination.level} label="Level" />
                <MiniMetric value={destination.access} label="Accessibility" />
                <MiniMetric value={destination.climate} label="Climate Severity" />
              </div>
              <div className="border-t border-white/9 pt-3">
                <div className="flex items-baseline gap-2 text-[#d8aa4f]">
                  <Compass className="h-4 w-4" />
                  <span className="text-[1.25rem] font-semibold">{destination.score}</span>
                  <span className="text-[0.66rem] font-normal text-white/58">/10</span>
                </div>
                <p className="text-[0.58rem] font-normal text-white/46">Atmospheric Score</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function ExpeditionMap() {
  const markers = [
    ["Greenland", "17%", "30%", Snowflake],
    ["Iceland Highlands", "31%", "41%", Flame],
    ["Arctic Circle", "48%", "14%", AlertTriangle],
    ["Everest Region", "88%", "43%", Mountain],
    ["Sahara", "50%", "66%", Sun],
    ["Antarctica", "51%", "86%", Snowflake],
    ["Patagonia", "20%", "74%", Mountain],
  ] satisfies Array<[string, string, string, LucideIcon]>;

  return (
    <Panel title="Live Expedition Map" className="min-h-[500px]">
      <div className="relative h-[430px] overflow-hidden rounded-lg border border-white/11 bg-[#030605]">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1400&q=90"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-36 saturate-0"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_58%,rgba(74,158,205,.2),transparent_18%),radial-gradient(circle_at_78%_50%,rgba(216,170,79,.18),transparent_22%),radial-gradient(circle_at_62%_78%,rgba(255,255,255,.14),transparent_15%),linear-gradient(180deg,rgba(3,6,5,.24),rgba(3,6,5,.95))]" />
        <svg viewBox="0 0 1000 600" className="absolute inset-0 h-full w-full">
          <path d="M90 220 C180 170 224 270 315 238 C405 204 424 96 520 110" fill="none" stroke="rgba(105,173,213,.26)" strokeWidth="15" strokeLinecap="round" />
          <path d="M90 220 C180 170 224 270 315 238 C405 204 424 96 520 110" fill="none" stroke="#7fc8ff" strokeWidth="3" strokeDasharray="10 12" strokeLinecap="round" />
          <path d="M520 110 C544 210 626 228 710 250 C790 272 825 192 902 256" fill="none" stroke="rgba(216,170,79,.24)" strokeWidth="15" strokeLinecap="round" />
          <path d="M520 110 C544 210 626 228 710 250 C790 272 825 192 902 256" fill="none" stroke={gold} strokeWidth="4" strokeDasharray="12 14" strokeLinecap="round" />
          <path d="M500 112 C530 260 508 344 502 512" fill="none" stroke="rgba(255,117,64,.24)" strokeWidth="15" strokeLinecap="round" />
          <path d="M500 112 C530 260 508 344 502 512" fill="none" stroke="#ff7a3d" strokeWidth="4" strokeLinecap="round" />
          <path d="M118 420 C190 360 246 382 318 426 C392 472 432 496 502 512" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="3" strokeDasharray="8 14" strokeLinecap="round" />
          <circle cx="210" cy="290" r="48" fill="none" stroke="rgba(216,170,79,.18)" strokeWidth="2" />
          <circle cx="830" cy="415" r="70" fill="none" stroke="rgba(127,200,255,.18)" strokeWidth="2" />
          <path d="M740 418 C790 380 856 390 900 432" fill="none" stroke="rgba(127,200,255,.34)" strokeWidth="4" strokeLinecap="round" />
        </svg>
        {markers.map(([label, left, top, Icon]) => (
          <div key={label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left, top }}>
            <div className="grid h-8 w-8 place-items-center rounded-full border border-[#d8aa4f] bg-black shadow-[0_0_26px_rgba(216,170,79,.58)]">
              <Icon className="h-4 w-4 text-[#d8aa4f]" />
            </div>
            <div className="mt-2 max-w-[7rem] text-[0.6rem] font-semibold uppercase leading-4 text-white">
              {label}
            </div>
          </div>
        ))}
        <div className="absolute bottom-5 left-5 space-y-2 text-[0.68rem] text-white/70">
          <MapLegend color="#d8aa4f" label="Mountain Route" />
          <MapLegend color="#7fc8ff" label="Ice Crossing" />
          <MapLegend color="#ff7a3d" label="Desert Route" />
          <MapLegend color="#ffffff" label="Weather System" />
          <MapLegend icon={AlertTriangle} label="Expedition Camp" />
        </div>
        <button className="absolute bottom-4 right-4 inline-flex items-center gap-3 rounded-md border border-[#d8aa4f]/50 bg-black/62 px-4 py-3 text-[0.72rem] font-bold uppercase text-[#d8aa4f] backdrop-blur-xl">
          View Full Map <Satellite className="h-4 w-4" />
        </button>
      </div>
    </Panel>
  );
}

function ExperienceLayer() {
  return (
    <Panel title="Expedition Experience Layer" action="View all experiences">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {experiences.map((item) => (
          <article key={item.title} className="overflow-hidden rounded-lg border border-white/11 bg-[#080d0c]/78">
            <div className="relative h-40 overflow-hidden">
              <img src={item.image} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(3,6,5,.9))]" />
            </div>
            <div className="p-4">
              <h3 className="text-[0.82rem] font-semibold uppercase leading-5 text-white">{item.title}</h3>
              <p className="mt-2 text-[0.68rem] font-normal leading-5 text-white/62">{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function AtmosphereEngine() {
  return (
    <Panel title="Atmosphere Engine" action="Explore all moods">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
        {atmospheres.map((item) => (
          <article key={item.title} className="group relative min-h-[245px] overflow-hidden rounded-lg border border-white/11 bg-black">
            <img src={item.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.05)_10%,rgba(3,6,5,.94)_100%)]" />
            <button aria-label={`Play ${item.title}`} className="absolute left-1/2 top-[42%] grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/52 text-white backdrop-blur-xl">
              <ChevronRight className="ml-0.5 h-5 w-5 fill-white" />
            </button>
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="text-[0.78rem] font-semibold uppercase leading-5 text-white">{item.title}</h3>
              <p className="mt-2 text-[0.68rem] font-normal leading-5 text-white/66">{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function LiveFeed() {
  return (
    <Panel title="Real-Time Expedition Feed" action="View all updates">
      <div className="space-y-3">
        {feed.map((item, index) => {
          const Icon = item.icon;
          return (
            <article key={item.text} className="grid grid-cols-[44px_minmax(0,1fr)] gap-3 rounded-lg border border-white/11 bg-[#080d0c]/76 p-3 sm:grid-cols-[44px_minmax(0,1fr)_132px]">
              <div
                className={`grid h-9 w-9 place-items-center rounded-lg ${
                  index === 0
                    ? "bg-[#ff5b37]/20 text-[#ff7456]"
                    : index === 1
                      ? "bg-[#6aa5d8]/22 text-[#9ed0ff]"
                      : index === 2
                        ? "bg-[#d8aa4f]/22 text-[#d8aa4f]"
                        : "bg-[#a47be8]/22 text-[#c9a8ff]"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="rounded bg-[#d8aa4f]/18 px-1.5 py-0.5 text-[0.58rem] font-bold uppercase text-[#d8aa4f]">
                    {item.tag}
                  </span>
                  <span className="text-[0.64rem] font-medium text-white/42">{item.time}</span>
                </div>
                <p className="text-[0.78rem] font-normal leading-5 text-white/88">{item.text}</p>
                <p className="mt-1 text-[0.68rem] font-normal leading-5 text-white/54">{item.body}</p>
              </div>
              <img src={item.image} alt="" className="hidden h-20 w-full rounded-md object-cover sm:block" />
            </article>
          );
        })}
      </div>
      <button className="mt-4 w-full rounded-lg border border-[#d8aa4f]/25 px-4 py-3 text-[0.72rem] font-bold uppercase text-[#d8aa4f]">
        View All Expedition Updates
      </button>
    </Panel>
  );
}

function ExpeditionCta() {
  return (
    <section className="relative min-h-[390px] overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_22px_70px_rgba(0,0,0,.34)]">
      <img
        src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1100&q=90"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,4,3,.9),rgba(2,4,3,.48),rgba(2,4,3,.18)),linear-gradient(180deg,rgba(2,4,3,.05),rgba(2,4,3,.82))]" />
      <div className="relative z-10 flex min-h-[390px] max-w-[500px] flex-col justify-center p-8">
        <h2 className="text-[clamp(1.45rem,3vw,2rem)] font-bold uppercase leading-tight text-[#d8aa4f]">
          Only a few go where many dream
        </h2>
        <p className="mt-5 text-[0.92rem] font-normal leading-7 text-white/84">
          Curated. Intelligent. Extreme. Your journey begins with insight.
        </p>
        <button className="mt-8 inline-flex w-fit items-center gap-3 rounded-lg bg-[#d8aa4f] px-6 py-4 text-[0.74rem] font-bold uppercase text-black">
          Plan Your Expedition <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

function Panel({
  title,
  action,
  className = "",
  children,
}: {
  title: string;
  action?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`rounded-xl border border-white/10 bg-[#050908]/82 p-4 shadow-[0_22px_70px_rgba(0,0,0,.34)] backdrop-blur-xl ${className}`}>
      <div className="mb-4 flex items-center gap-4">
        <h2 className="text-[0.96rem] font-bold uppercase tracking-[0] text-white">{title}</h2>
        {action ? (
          <a href="/expeditions" className="ml-auto inline-flex items-center gap-2 text-[0.74rem] font-medium text-[#d8aa4f]">
            {action} <ArrowRight className="h-4 w-4" />
          </a>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function MiniMetric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-medium text-[#d8aa4f]">{value}</div>
      <div className="mt-0.5 text-[0.56rem] font-normal uppercase text-white/45">{label}</div>
    </div>
  );
}

function MapLegend({
  icon: Icon,
  color,
  label,
}: {
  icon?: LucideIcon;
  color?: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {Icon ? (
        <Icon className="h-3.5 w-3.5 text-[#d8aa4f]" />
      ) : (
        <span className="h-0.5 w-7 rounded-full" style={{ backgroundColor: color }} />
      )}
      <span>{label}</span>
    </div>
  );
}
