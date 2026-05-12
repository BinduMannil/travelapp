/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  CloudSun,
  Crown,
  Gem,
  Globe2,
  Home,
  Leaf,
  Map,
  Menu,
  Mountain,
  Navigation,
  Search,
  Settings,
  Shield,
  ShipWheel,
  Snowflake,
  Sparkles,
  Star,
  TrainFront,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Rail Journeys",
  description:
    "Cinematic panoramic rail journeys, luxury cabins, atmospheric route intelligence, and editorial slow travel discovery from JOURNEE.",
};

type RouteCard = {
  name: string;
  country: string;
  image: string;
  duration: string;
  season: string;
  scenic: string;
  luxury: string;
};

type Experience = {
  title: string;
  body: string;
  image: string;
};

type Atmosphere = {
  title: string;
  body: string;
  image: string;
};

const gold = "#d8aa4f";

const navItems = [
  { label: "Home", icon: Home },
  { label: "Explore", icon: Navigation },
  { label: "Destinations", icon: Map },
  { label: "Stays", icon: CalendarDays },
  { label: "Yachts", icon: ShipWheel },
  { label: "Rail Journeys", icon: TrainFront, active: true },
  { label: "Experiences", icon: Sparkles },
  { label: "Concierge", icon: Globe2 },
];

const accountItems: Array<{ label: string; icon: LucideIcon; badge?: string }> = [
  { label: "Alerts", icon: Bell, badge: "3" },
  { label: "Profile", icon: UserRound },
  { label: "Settings", icon: Settings },
];

const routes: RouteCard[] = [
  {
    name: "Glacier Express",
    country: "Switzerland",
    image: "/rail-journeys/snow-mountain-train.jpeg",
    duration: "8h 15m",
    season: "All Year",
    scenic: "9.8",
    luxury: "9.7",
  },
  {
    name: "Venice Simplon Orient Express",
    country: "Europe",
    image:
      "https://images.unsplash.com/photo-1545153996-02e831f03d56?auto=format&fit=crop&w=900&q=88",
    duration: "1d 6h",
    season: "Mar - Nov",
    scenic: "9.9",
    luxury: "9.9",
  },
  {
    name: "Seven Stars Kyushu",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=88",
    duration: "2d 1h",
    season: "Mar - May",
    scenic: "9.6",
    luxury: "9.8",
  },
  {
    name: "Rocky Mountaineer",
    country: "Canada",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=88",
    duration: "2d 3h",
    season: "Apr - Oct",
    scenic: "9.7",
    luxury: "9.6",
  },
  {
    name: "Maharajas' Express",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=88",
    duration: "3d 2h",
    season: "Oct - Mar",
    scenic: "9.4",
    luxury: "9.5",
  },
];

const experiences: Experience[] = [
  {
    title: "Sleeper Cabins",
    body: "Rest in timeless luxury",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=88",
  },
  {
    title: "Panoramic Lounges",
    body: "Endless views, endless moments",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=88",
  },
  {
    title: "Observation Decks",
    body: "See the world from above",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=88",
  },
  {
    title: "Fine Dining Cars",
    body: "Gourmet journeys on rails",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=88",
  },
  {
    title: "Wellness Cabins",
    body: "Rejuvenate in motion",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=88",
  },
];

const atmospheres: Atmosphere[] = [
  {
    title: "Snowfall Journeys",
    body: "Winter magic across the alpine routes",
    image:
      "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=700&q=88",
  },
  {
    title: "Autumn Foliage",
    body: "Golden landscapes in motion",
    image:
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=700&q=88",
  },
  {
    title: "Sunrise Crossings",
    body: "Chase the sun across iconic horizons",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=88",
  },
  {
    title: "Coastal Rail Lines",
    body: "Ride along the world's most beautiful coasts",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=88",
  },
  {
    title: "Northern Lights Routes",
    body: "Witness the aurora from the best seats",
    image:
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=700&q=88",
  },
];

const feed = [
  {
    tag: "Scenic",
    time: "15m ago",
    text: "Heavy snowfall in the Swiss Alps creating exceptional views on Glacier Express today.",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=360&q=84",
  },
  {
    tag: "Seasonal",
    time: "32m ago",
    text: "Sakura rail season begins in Japan. Seven Stars Kyushu routes are live for spring.",
    image:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=360&q=84",
  },
  {
    tag: "Luxury",
    time: "1h ago",
    text: "Venice Simplon Orient Express departures are fully booked for May - August.",
    image:
      "https://images.unsplash.com/photo-1545153996-02e831f03d56?auto=format&fit=crop&w=360&q=84",
  },
  {
    tag: "Weather",
    time: "2h ago",
    text: "Northern Lights visibility high along Norway's rail routes tonight.",
    image:
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=360&q=84",
  },
];

const curated = [
  ["The Alpine Escape", "Switzerland", "4 Days / 3 Nights", "From €2,890", routes[0].image],
  ["Italian Dream Route", "Italy", "3 Days / 2 Nights", "From €1,890", "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=600&q=88"],
  ["Japan Scenic Rails", "Japan", "5 Days / 4 Nights", "From €1,890", "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=600&q=88"],
  ["Canadian Rockies Adventure", "Canada", "4 Days / 3 Nights", "From €3,790", routes[3].image],
  ["Indian Heritage Journey", "India", "6 Days / 5 Nights", "From €4,590", routes[1].image],
];

export default function RailJourneysPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020403] text-[#fff8ea]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_54%_-8%,rgba(216,170,79,.18),transparent_31%),radial-gradient(circle_at_93%_18%,rgba(124,146,151,.14),transparent_28%),linear-gradient(180deg,#030504_0%,#09100f_48%,#020403_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:76px_76px]" />
      <div className="relative mx-auto flex w-full max-w-[1800px]">
        <Sidebar />
        <section className="min-w-0 flex-1 px-3 pb-6 pt-3 sm:px-5 lg:ml-[236px] lg:px-8">
          <Hero />
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,.85fr)]">
            <div className="min-w-0 space-y-4">
              <FeaturedRoutes />
              <div className="grid gap-4 xl:grid-cols-[1.05fr_.95fr]">
                <RailMap />
                <ExperienceLayer />
              </div>
              <AtmosphereEngine />
              <CuratedJourneys />
            </div>
            <div className="space-y-4 xl:pt-[506px]">
              <LiveRailFeed />
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
      <Link href="/" className="mb-9 block">
        <div className="text-[1.48rem] font-bold uppercase tracking-[0.26em] text-[#f3c56b]">
          Journee
        </div>
        <div className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#d8aa4f]">
          Rail Journeys
        </div>
      </Link>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-[0.82rem] font-medium transition ${
                item.active
                  ? "border border-[#d8aa4f]/25 bg-[#d8aa4f]/18 text-white shadow-[0_16px_40px_rgba(216,170,79,.12)]"
                  : "text-white/76 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </a>
          );
        })}
      </nav>
      <div className="my-7 h-px bg-white/12" />
      <div className="space-y-2">
        {accountItems.map(({ label, icon: Icon, badge }) => (
          <a
            key={label}
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-[0.82rem] font-medium text-white/76 transition hover:bg-white/[0.05] hover:text-white"
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
            {badge ? (
              <span className="ml-auto grid h-5 w-5 place-items-center rounded-full bg-[#d8aa4f] text-[0.65rem] font-bold text-black">
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
            <div className="text-[0.68rem] font-regular text-white/60">Platinum Member</div>
          </div>
        </div>
        <div className="rounded-md bg-[#d8aa4f]/10 px-4 py-3 text-center text-[0.72rem] font-bold uppercase text-[#d8aa4f]">
          128,450 Points
        </div>
        <div className="rounded-lg border border-[#d8aa4f]/24 bg-black/28 p-4">
          <div className="mb-3 text-3xl font-bold leading-none text-[#d8aa4f]">“</div>
          <p className="text-[0.78rem] leading-6 text-white/82">
            Slow travel is not about time, it&apos;s about how deep you feel the journey.
          </p>
          <div className="mt-4 text-[0.62rem] font-semibold uppercase text-[#d8aa4f]">
            Journee Philosophy
          </div>
        </div>
        <button className="w-full rounded-lg border border-[#d8aa4f]/32 px-4 py-3 text-[0.72rem] font-bold uppercase text-[#d8aa4f]">
          Contact Concierge
        </button>
      </div>
    </aside>
  );
}

function Hero() {
  return (
    <section className="relative mb-4 min-h-[620px] overflow-hidden rounded-none border-b border-white/10 bg-black lg:rounded-b-2xl">
      <img
        src="/rail-journeys/snow-mountain-train.jpeg"
        alt="Luxury panoramic train moving through snowy mountains at sunset"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,4,3,.96)_0%,rgba(2,4,3,.66)_31%,rgba(2,4,3,.22)_66%,rgba(2,4,3,.76)_100%),linear-gradient(180deg,rgba(2,4,3,.25)_0%,rgba(2,4,3,.1)_52%,rgba(2,4,3,.92)_100%)]" />
      <div className="relative z-10 flex min-h-[620px] flex-col px-5 py-6 sm:px-8 lg:px-10">
        <TopBar />
        <div className="mt-auto grid gap-8 pb-12 pt-16 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
          <div className="max-w-[820px]">
            <h1 className="text-[clamp(3.1rem,8.6vw,6.65rem)] font-extrabold uppercase leading-[0.96] tracking-[0] text-white">
              The Art Of
              <span className="block text-[#e3b65f]">Slow Travel</span>
            </h1>
            <p className="mt-6 max-w-[640px] text-[clamp(1rem,1.7vw,1.28rem)] font-regular leading-8 text-white/88">
              Discover panoramic railway journeys and timeless movement across the world.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="inline-flex h-13 items-center gap-4 rounded-lg bg-[#d8aa4f] px-6 py-4 text-[0.78rem] font-bold uppercase text-black shadow-[0_18px_40px_rgba(216,170,79,.28)]">
                Explore Rail Routes <ArrowRight className="h-4 w-4" />
              </button>
              <button className="inline-flex h-13 items-center gap-4 rounded-lg border border-[#d8aa4f]/48 bg-black/38 px-6 py-4 text-[0.78rem] font-bold uppercase text-white backdrop-blur-xl">
                Build Journey <Sparkles className="h-4 w-4 text-[#d8aa4f]" />
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
          Search rail routes, destinations, journeys...
        </span>
      </div>
      <div className="ml-auto hidden items-center gap-5 md:flex">
        {[Globe2, Star, Bell, Menu].map((Icon, index) => (
          <button
            key={index}
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
  const metrics: Array<{ label: string; value: string; icon: LucideIcon }> = [
    { label: "Scenic Score", value: "9.7 /10", icon: Mountain },
    { label: "Quietness Index", value: "9.2 /10", icon: Leaf },
    { label: "Weather Quality", value: "Excellent", icon: CloudSun },
    { label: "Luxury Cabins", value: "Available", icon: Crown },
  ];

  return (
    <div className="rounded-xl border border-white/13 bg-[#070b0a]/72 p-1 shadow-[0_26px_80px_rgba(0,0,0,.55)] backdrop-blur-2xl">
      {metrics.map(({ label, value, icon: Icon }, index) => (
        <div
          key={label}
          className={`flex items-center gap-4 px-5 py-4 ${index ? "border-t border-white/9" : ""}`}
        >
          <Icon className="h-7 w-7 text-[#d8aa4f]" />
          <div>
            <div className="text-[0.62rem] font-medium uppercase text-white/54">{label}</div>
            <div className="mt-1 text-[1.08rem] font-regular text-white">{value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FeaturedRoutes() {
  return (
    <Panel
      title="Featured Global Rail Routes"
      action="View all routes"
      className="-mt-[26px] relative z-20"
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {routes.map((route) => (
          <article
            key={route.name}
            className="overflow-hidden rounded-lg border border-white/11 bg-[#080d0c]/78 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]"
          >
            <div className="relative h-44 overflow-hidden">
              <img src={route.image} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(2,4,3,.9)_100%)]" />
            </div>
            <div className="space-y-4 p-4">
              <div>
                <h3 className="text-[0.86rem] font-semibold uppercase leading-5 text-white">
                  {route.name}
                </h3>
                <p className="mt-1 text-[0.68rem] font-regular text-[#d8aa4f]">{route.country}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-[0.68rem]">
                <MiniMetric icon={CalendarDays} value={route.duration} label="Duration" />
                <MiniMetric icon={CloudSun} value={route.season} label="Best Season" />
                <MiniMetric icon={Sparkles} value={route.scenic} label="Scenic" />
                <MiniMetric icon={Shield} value={route.luxury} label="Luxury" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function RailMap() {
  const stations = [
    ["Glacier Express", "18%", "24%"],
    ["Venice", "30%", "31%"],
    ["Cairo", "24%", "57%"],
    ["Delhi", "55%", "51%"],
    ["Kyushu", "81%", "45%"],
    ["Vancouver", "18%", "76%"],
    ["Mumbai", "54%", "80%"],
  ];

  return (
    <Panel title="Immersive Rail Map" className="min-h-[475px]">
      <div className="relative h-[405px] overflow-hidden rounded-lg border border-white/11 bg-[#030605]">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1400&q=90"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30 saturate-0"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_44%_48%,rgba(216,170,79,.2),transparent_36%),linear-gradient(180deg,rgba(3,6,5,.35),rgba(3,6,5,.94))]" />
        <svg viewBox="0 0 1000 560" className="absolute inset-0 h-full w-full">
          <path
            d="M160 146 C230 210 242 232 320 226 C406 218 425 342 518 320 C590 304 616 246 710 264 C790 280 796 214 870 180"
            fill="none"
            stroke="rgba(216,170,79,.18)"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M160 146 C230 210 242 232 320 226 C406 218 425 342 518 320 C590 304 616 246 710 264 C790 280 796 214 870 180"
            className="rail-route-line"
            fill="none"
            stroke={gold}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M188 420 C292 344 392 398 512 448 C600 486 700 430 805 326"
            className="rail-route-line rail-route-line-delay"
            fill="none"
            stroke={gold}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M315 230 C345 286 376 333 520 320"
            fill="none"
            stroke="rgba(255,255,255,.28)"
            strokeDasharray="8 12"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        {stations.map(([label, left, top]) => (
          <div
            key={label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left, top }}
          >
            <div className="grid h-8 w-8 place-items-center rounded-full border border-[#d8aa4f] bg-black shadow-[0_0_26px_rgba(216,170,79,.58)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#d8aa4f]" />
            </div>
            <div className="mt-2 whitespace-nowrap text-[0.62rem] font-semibold uppercase leading-4 text-white">
              {label}
            </div>
          </div>
        ))}
        <div className="absolute bottom-5 left-5 space-y-2 text-[0.68rem] text-white/70">
          <MapLegend icon={Mountain} label="Scenic Route" />
          <MapLegend icon={TrainFront} label="Tunnel Section" />
          <MapLegend icon={Gem} label="Panoramic Stop" />
          <MapLegend icon={Crown} label="Luxury Station" />
        </div>
        <button className="absolute bottom-4 right-4 inline-flex items-center gap-3 rounded-md border border-[#d8aa4f]/50 bg-black/62 px-4 py-3 text-[0.72rem] font-bold uppercase text-[#d8aa4f] backdrop-blur-xl">
          Explore Map <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </Panel>
  );
}

function ExperienceLayer() {
  return (
    <Panel title="Train Experience Layer" action="View all experiences">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {experiences.map((item) => (
          <article
            key={item.title}
            className="flex min-h-[300px] flex-col overflow-hidden rounded-lg border border-white/11 bg-[#080d0c]/78"
          >
            <div className="relative h-36 overflow-hidden">
              <img src={item.image} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(3,6,5,.85))]" />
            </div>
            <div className="flex flex-1 flex-col p-3">
              <h3 className="text-[0.78rem] font-semibold uppercase leading-5 text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-[0.68rem] font-regular leading-5 text-white/60">{item.body}</p>
              <button className="mt-auto grid h-9 w-9 place-items-center rounded-full border border-[#d8aa4f]/70 text-[#d8aa4f]">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function AtmosphereEngine() {
  return (
    <Panel title="Railway Atmosphere Engine">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {atmospheres.map((item) => (
          <article
            key={item.title}
            className="relative min-h-[260px] overflow-hidden rounded-lg border border-white/11 bg-black"
          >
            <img src={item.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.04)_20%,rgba(3,6,5,.94)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="text-[0.78rem] font-semibold uppercase leading-5 text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-[0.68rem] font-regular leading-5 text-white/66">{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function LiveRailFeed() {
  return (
    <Panel title="Live Rail Feed" action="View all updates">
      <div className="space-y-3">
        {feed.map((item, index) => (
          <article
            key={item.text}
            className="grid grid-cols-[44px_minmax(0,1fr)_112px] gap-3 rounded-lg border border-white/11 bg-[#080d0c]/76 p-3"
          >
            <div
              className={`grid h-9 w-9 place-items-center rounded-lg ${
                index === 0
                  ? "bg-[#d8aa4f]/22 text-[#d8aa4f]"
                  : index === 1
                    ? "bg-[#e879a6]/22 text-[#f0a6c4]"
                    : index === 2
                      ? "bg-[#6aa5d8]/22 text-[#9ed0ff]"
                      : "bg-[#59b980]/22 text-[#93dfad]"
              }`}
            >
              {index === 0 ? <TrainFront className="h-4 w-4" /> : index === 1 ? <Snowflake className="h-4 w-4" /> : index === 2 ? <Crown className="h-4 w-4" /> : <CloudSun className="h-4 w-4" />}
            </div>
            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded bg-[#d8aa4f]/18 px-1.5 py-0.5 text-[0.58rem] font-bold uppercase text-[#d8aa4f]">
                  {item.tag}
                </span>
                <span className="text-[0.64rem] font-medium text-white/42">{item.time}</span>
              </div>
              <p className="text-[0.72rem] font-regular leading-5 text-white/78">{item.text}</p>
            </div>
            <img src={item.image} alt="" className="h-20 w-full rounded-md object-cover" />
          </article>
        ))}
      </div>
      <button className="mt-4 w-full rounded-lg border border-[#d8aa4f]/25 px-4 py-3 text-[0.72rem] font-bold uppercase text-[#d8aa4f]">
        View All Updates
      </button>
    </Panel>
  );
}

function CuratedJourneys() {
  return (
    <Panel title="Curated Rail Journeys For You" action="View all journeys">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {curated.map(([title, country, days, price, image]) => (
          <article
            key={title}
            className="overflow-hidden rounded-lg border border-white/11 bg-[#080d0c]/76"
          >
            <img src={image} alt="" className="h-36 w-full object-cover" />
            <div className="p-3">
              <h3 className="text-[0.76rem] font-semibold uppercase leading-5 text-white">{title}</h3>
              <p className="mt-1 text-[0.64rem] font-regular text-white/58">{country}</p>
              <div className="mt-4 flex items-center gap-2 text-[0.68rem] font-medium text-[#d8aa4f]">
                <CalendarDays className="h-3.5 w-3.5" />
                {days}
              </div>
              <div className="mt-2 text-[0.72rem] font-regular text-white/78">{price}</div>
            </div>
          </article>
        ))}
      </div>
    </Panel>
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
    <section
      className={`rounded-xl border border-white/10 bg-[#050908]/82 p-4 shadow-[0_22px_70px_rgba(0,0,0,.34)] backdrop-blur-xl ${className}`}
    >
      <div className="mb-4 flex items-center gap-4">
        <h2 className="text-[0.96rem] font-bold uppercase tracking-[0] text-white">{title}</h2>
        {action ? (
          <a
            href="#"
            className="ml-auto inline-flex items-center gap-2 text-[0.74rem] font-medium text-[#d8aa4f]"
          >
            {action} <ArrowRight className="h-4 w-4" />
          </a>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function MiniMetric({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 font-medium text-white">
        <Icon className="h-3.5 w-3.5 text-[#d8aa4f]" />
        {value}
      </div>
      <div className="mt-0.5 text-[0.58rem] font-regular text-white/45">{label}</div>
    </div>
  );
}

function MapLegend({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-[#d8aa4f]" />
      <span>{label}</span>
    </div>
  );
}
