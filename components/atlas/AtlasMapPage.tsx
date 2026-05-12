/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  Bell,
  Bookmark,
  Box,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Clock3,
  Compass,
  Info,
  Landmark,
  Layers3,
  LocateFixed,
  MapPin,
  Navigation,
  Play,
  Route,
  Search,
  Sparkles,
  Star,
  SunMedium,
  Trees,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { JourneeBrand } from "@/components/brand/JourneeLogo";

const navItems = ["Home", "Explore", "Map", "Trips", "Guides", "Journal"];

const menuItems = [
  { label: "Explore Kyoto", icon: Landmark, active: true },
  { label: "Destinations", icon: MapPin },
  { label: "Points of Interest", icon: Sparkles },
  { label: "Routes", icon: Route },
  { label: "Collections", icon: Box },
  { label: "Saved Places", icon: Bookmark },
];

const mapLayers = [
  { label: "Terrain", enabled: true },
  { label: "Roads", enabled: false },
  { label: "Topography", enabled: true },
  { label: "Points of Interest", enabled: true },
  { label: "Local Favorites", enabled: true },
  { label: "Crowd Levels", enabled: false },
  { label: "Seasonal Beauty", enabled: false },
];

const areaLabels = [
  { label: "KYOTO", x: "80%", y: "18%", size: "text-lg font-semibold tracking-[0.12em] sm:text-xl" },
  { label: "SHIGA", x: "84%", y: "33%", size: "text-lg font-semibold tracking-[0.12em]" },
  { label: "HYOGO", x: "29%", y: "46%", size: "text-lg font-semibold tracking-[0.12em]" },
  { label: "NARA", x: "78%", y: "65%", size: "text-lg font-semibold tracking-[0.12em]" },
  { label: "WAKAYAMA", x: "48%", y: "84%", size: "text-lg font-semibold tracking-[0.12em]" },
  { label: "Lake Biwa", x: "76%", y: "30%", size: "text-sm font-medium" },
  { label: "OSAKA", x: "58%", y: "62%", size: "text-xs font-semibold tracking-[0.1em]" },
];

const cityLabels = [
  { label: "Kyoto", x: "73%", y: "40%", glow: true },
  { label: "Osaka", x: "51%", y: "63%", glow: true },
  { label: "Kobe", x: "38%", y: "59%" },
  { label: "Nara", x: "64%", y: "64%" },
];

const landmarkMarkers = [
  { label: "Kinkaku-ji", detail: "Golden Pavilion", x: "77%", y: "32%", icon: Landmark },
  { label: "Arashiyama", detail: "Bamboo Grove", x: "46%", y: "36%", icon: Trees },
  { label: "Fushimi Inari", detail: "Taisha Shrine", x: "75%", y: "50%", icon: Landmark },
  { label: "Himeji Castle", detail: "", x: "18%", y: "55%", icon: Star },
];

const modeButtons = [
  { label: "Heatmap", icon: CircleDot, active: true },
  { label: "Best Time", icon: Clock3 },
  { label: "Travel Time", icon: Compass },
  { label: "Season", icon: SunMedium },
  { label: "Traffic", icon: Route },
];

const popularRoutes = [
  {
    title: "Kyoto Heritage Trail",
    meta: "Temples & Shrines",
    detail: "1 Day • 12 Places",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=420&q=82",
  },
  {
    title: "Arashiyama Escape",
    meta: "Nature & Serenity",
    detail: "1 Day • 8 Places",
    image:
      "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=420&q=82",
  },
  {
    title: "Hidden Kyoto",
    meta: "Local Secrets",
    detail: "Half Day • 9 Places",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=420&q=82",
  },
];

const categories = [
  {
    title: "Temples & Shrines",
    count: "120+ places",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=640&q=84",
  },
  {
    title: "Nature & Landscapes",
    count: "85+ places",
    image:
      "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=640&q=84",
  },
  {
    title: "Hidden Gems",
    count: "200+ places",
    image:
      "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=640&q=84",
  },
  {
    title: "Local Experiences",
    count: "150+ places",
    image:
      "https://images.unsplash.com/photo-1522336572468-97b06e8ef143?auto=format&fit=crop&w=640&q=84",
  },
  {
    title: "Food & Markets",
    count: "110+ places",
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=640&q=84",
  },
  {
    title: "Night Views",
    count: "70+ places",
    image:
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=640&q=84",
  },
];

const glowNodes = [
  { x: "61%", y: "41%", size: "h-20 w-20" },
  { x: "52%", y: "64%", size: "h-24 w-24" },
  { x: "39%", y: "60%", size: "h-16 w-16" },
  { x: "65%", y: "64%", size: "h-14 w-14" },
  { x: "20%", y: "56%", size: "h-14 w-14" },
  { x: "72%", y: "72%", size: "h-16 w-16" },
];

function GlassPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`border border-white/12 bg-[#07100f]/72 shadow-[0_24px_90px_rgba(0,0,0,.42)] backdrop-blur-xl ${className}`}
    >
      {children}
    </section>
  );
}

function Toggle({ enabled }: { enabled: boolean }) {
  return (
    <span
      className={`relative inline-flex h-4 w-8 items-center rounded-full border transition ${
        enabled
          ? "border-[#e1b760]/60 bg-[#c89b3c]/65"
          : "border-white/10 bg-white/8"
      }`}
      aria-hidden="true"
    >
      <span
        className={`h-3 w-3 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,.42)] transition ${
          enabled ? "translate-x-4" : "translate-x-0.5 opacity-55"
        }`}
      />
    </span>
  );
}

function AtlasNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#030707]/86 backdrop-blur-2xl">
      <div className="mx-auto flex min-h-16 w-full max-w-[1720px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="JOURNEE home">
          <JourneeBrand
            direction="atlas-aperture"
            className="[&>span:first-child]:h-9 [&>span:first-child]:w-9 [&>span:first-child]:rounded-none [&>span:first-child]:border-0 [&>span:first-child]:bg-transparent [&>span:first-child]:shadow-none [&>span:first-child>svg]:h-8 [&>span:first-child>svg]:w-8 [&>span:last-child]:text-xl"
          />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item}
              href={item === "Map" ? "/atlas" : item === "Home" ? "/" : "/discover"}
              className={`relative text-sm text-white/76 transition hover:text-white ${
                item === "Map" ? "text-[#e2b965]" : ""
              }`}
            >
              {item}
              {item === "Map" ? (
                <span className="absolute -bottom-[23px] left-0 h-px w-full bg-[#d8aa4f]" />
              ) : null}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden h-10 w-full max-w-[320px] items-center gap-3 rounded-full border border-white/18 bg-white/[0.035] px-4 text-white/48 shadow-[0_0_28px_rgba(216,170,79,.08)] md:flex">
          <span className="truncate text-sm">Search places, regions...</span>
          <Search className="ml-auto h-5 w-5 text-white/82" strokeWidth={1.7} />
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-white/82"
        >
          <Bell className="h-5 w-5" strokeWidth={1.6} />
        </button>
        <div className="h-10 w-10 overflow-hidden rounded-full border border-[#d8aa4f]/30 bg-[#231914]">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80"
            alt="Profile avatar"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}

function LeftSidebar() {
  return (
    <GlassPanel className="rounded-lg p-5 lg:min-h-[calc(100vh-8rem)]">
      <div>
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#d8aa4f]">
          Atlas
        </p>
        <div className="mt-3 flex items-end gap-2">
          <h1 className="font-sans text-3xl leading-none text-white">Japan</h1>
          <ChevronDown className="mb-1 h-4 w-4 text-[#d8aa4f]" />
        </div>
        <p className="mt-2 text-sm text-white/58">Kansai Region</p>
        <p className="mt-5 max-w-[24rem] text-sm leading-6 text-white/66">
          Explore with depth. Discover hidden places, plan meaningful journeys,
          and see the world like a local.
        </p>
      </div>

      <div className="mt-6 space-y-1 border-b border-white/10 pb-5">
        {menuItems.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            type="button"
            className={`flex h-11 w-full items-center gap-3 rounded-md border px-3 text-left text-sm transition ${
              active
                ? "border-[#d8aa4f]/24 bg-[#d8aa4f]/10 text-[#f1ce7f]"
                : "border-transparent text-white/74 hover:border-white/10 hover:bg-white/[0.035] hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4" strokeWidth={1.6} />
            <span>{label}</span>
            <ChevronRight className="ml-auto h-4 w-4 text-white/28" />
          </button>
        ))}
      </div>

      <div className="mt-5">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#d8aa4f]/82">
          Map Layers
        </p>
        <div className="mt-3 space-y-3">
          {mapLayers.map((layer) => (
            <div key={layer.label} className="flex items-center justify-between gap-3">
              <span className="text-sm text-white/72">{layer.label}</span>
              <Toggle enabled={layer.enabled} />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="mt-7 flex h-11 w-full items-center justify-center gap-3 rounded-md border border-[#d8aa4f]/52 bg-black/24 px-4 text-sm font-medium text-[#f1ce7f] transition hover:bg-[#d8aa4f]/10"
      >
        View Map Guide
        <Info className="h-4 w-4" strokeWidth={1.6} />
      </button>
    </GlassPanel>
  );
}

function RouteSystem() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1000 720"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="routeGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="goldRoute" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#fff3c0" stopOpacity=".18" />
          <stop offset="42%" stopColor="#d8aa4f" stopOpacity=".86" />
          <stop offset="100%" stopColor="#f6d88c" stopOpacity=".24" />
        </linearGradient>
      </defs>
      <path
        d="M200 445 C305 402 367 410 455 376 C536 344 574 312 612 260"
        fill="none"
        stroke="url(#goldRoute)"
        strokeDasharray="5 8"
        strokeWidth="2.8"
        filter="url(#routeGlow)"
      />
      <path
        d="M520 488 C554 444 579 398 607 292 C638 354 650 398 637 475 C629 523 648 552 697 574"
        fill="none"
        stroke="#f2c66d"
        strokeLinecap="round"
        strokeWidth="3.2"
        opacity=".74"
        filter="url(#routeGlow)"
      />
      <path
        d="M365 475 C448 486 528 505 624 490 C689 478 739 440 806 394"
        fill="none"
        stroke="#c89b3c"
        strokeDasharray="2 7"
        strokeLinecap="round"
        strokeWidth="2"
        opacity=".52"
        filter="url(#routeGlow)"
      />
      <path
        d="M612 260 C690 238 742 264 805 302"
        fill="none"
        stroke="#f1ce7f"
        strokeWidth="1.7"
        opacity=".5"
        filter="url(#routeGlow)"
      />
      {[
        [200, 445],
        [365, 475],
        [520, 488],
        [607, 292],
        [637, 475],
        [697, 574],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="9" fill="#f1ce7f" opacity=".18" />
          <circle cx={cx} cy={cy} r="3.5" fill="#fff7d0" />
        </g>
      ))}
    </svg>
  );
}

function CinematicMap() {
  return (
    <div className="relative min-h-[680px] overflow-hidden border border-white/10 bg-[#06100f] shadow-[0_32px_120px_rgba(0,0,0,.5)] lg:min-h-[calc(100vh-8rem)]">
      <div
        className="absolute inset-0 scale-105"
        style={{
          backgroundImage:
            "radial-gradient(circle at 58% 47%, rgba(251,206,124,.3) 0 1px, transparent 2px), radial-gradient(circle at 42% 62%, rgba(241,206,127,.26) 0 1px, transparent 2px), radial-gradient(circle at 68% 30%, rgba(231,195,113,.2) 0 1px, transparent 2px), linear-gradient(120deg, transparent 0 24%, rgba(34,47,38,.78) 25% 29%, transparent 30% 44%, rgba(13,31,33,.84) 45% 48%, transparent 49%), radial-gradient(ellipse at 55% 56%, rgba(11,18,13,.05), rgba(2,6,7,.72) 68%), url('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=2200&q=86')",
          backgroundSize: "42px 42px, 66px 66px, 94px 94px, cover, cover, cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_56%_48%,rgba(216,170,79,.18),transparent_22%),linear-gradient(180deg,rgba(2,5,6,.18),rgba(2,5,6,.78)),linear-gradient(90deg,rgba(2,5,6,.82),transparent_22%,transparent_76%,rgba(2,5,6,.8))]" />
      <div className="absolute inset-0 opacity-[0.22] mix-blend-screen [background-image:linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:84px_84px]" />
      <div className="absolute inset-0 opacity-50 [background-image:repeating-linear-gradient(140deg,transparent_0_18px,rgba(255,255,255,.035)_19px,transparent_21px)]" />

      {glowNodes.map((node) => (
        <span
          key={`${node.x}-${node.y}`}
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d8aa4f]/24 blur-xl ${node.size}`}
          style={{ left: node.x, top: node.y }}
        />
      ))}

      <RouteSystem />

      <div className="absolute left-8 top-8 z-10 max-w-[36rem] sm:left-12 sm:top-10">
        <p className="text-sm font-semibold tracking-[0.08em] text-[#e3b861]">
          Kansai Region
        </p>
        <h2 className="mt-3 max-w-[38rem] text-3xl font-extrabold leading-[1.08] text-white sm:text-5xl xl:text-6xl 2xl:text-7xl">
          Explore deeper.
          <span className="block">
            <span className="font-extrabold text-[#e9b85e]">Journee</span> further.
          </span>
        </h2>
        <p className="mt-4 max-w-[15rem] text-sm leading-6 text-white/82 sm:max-w-sm sm:text-base sm:leading-7">
          Cinematic maps. Local secrets. Journeys that stay with you.
        </p>
        <button
          type="button"
          className="mt-5 inline-flex items-center gap-3 text-sm font-semibold text-[#f1ce7f]"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full border border-[#d8aa4f]/70">
            <Play className="h-3 w-3 fill-[#f1ce7f]" />
          </span>
          How it works
        </button>
      </div>

      {areaLabels.map((area) => (
        <span
          key={area.label}
          className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 text-white/55 ${area.size}`}
          style={{ left: area.x, top: area.y }}
        >
          {area.label}
        </span>
      ))}

      {cityLabels.map((city) => (
        <div
          key={city.label}
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ left: city.x, top: city.y }}
        >
          <span
            className={`mx-auto block h-3 w-3 rounded-full border border-white bg-black ${
              city.glow ? "shadow-[0_0_22px_8px_rgba(216,170,79,.55)]" : ""
            }`}
          />
          <p className="mt-2 text-xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,.9)]">
            {city.label}
          </p>
        </div>
      ))}

      {landmarkMarkers.map(({ label, detail, x, y, icon: Icon }) => (
        <div
          key={label}
          className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
          style={{ left: x, top: y }}
        >
          <span className="grid h-8 w-8 place-items-center rounded-full border border-[#f1ce7f]/55 bg-[#3a260e]/72 text-[#f1ce7f] shadow-[0_0_24px_rgba(216,170,79,.38)] backdrop-blur">
            <Icon className="h-4 w-4" strokeWidth={1.7} />
          </span>
          <span className="min-w-max rounded-md bg-black/20 px-2 py-1 text-xs font-semibold leading-4 text-white shadow-[0_8px_24px_rgba(0,0,0,.36)] backdrop-blur">
            {label}
            {detail ? <span className="block font-normal text-white/78">{detail}</span> : null}
          </span>
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 z-30 grid w-[min(92%,560px)] -translate-x-1/2 grid-cols-5 overflow-hidden rounded-lg border border-white/14 bg-[#050807]/76 shadow-[0_18px_58px_rgba(0,0,0,.42)] backdrop-blur-xl">
        {modeButtons.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            type="button"
            className={`flex min-h-16 flex-col items-center justify-center gap-1 border-r border-white/8 px-1 text-[0.66rem] last:border-r-0 sm:px-2 sm:text-xs ${
              active ? "text-[#f1ce7f]" : "text-white/74"
            }`}
          >
            <Icon className="h-5 w-5" strokeWidth={1.55} />
            <span className="truncate">{label}</span>
          </button>
        ))}
      </div>

      <div className="absolute right-8 top-[38%] z-30 hidden flex-col overflow-hidden rounded-lg border border-white/14 bg-black/46 text-white/84 backdrop-blur-xl sm:flex">
        <button type="button" aria-label="Zoom in" className="grid h-14 w-14 place-items-center border-b border-white/10">
          <ZoomIn className="h-5 w-5" />
        </button>
        <button type="button" aria-label="Zoom out" className="grid h-14 w-14 place-items-center border-b border-white/10">
          <ZoomOut className="h-5 w-5" />
        </button>
        <button type="button" aria-label="Current location" className="grid h-14 w-14 place-items-center">
          <Navigation className="h-5 w-5" />
        </button>
      </div>

      <div className="absolute right-9 top-[25%] z-30 hidden h-20 w-20 place-items-center rounded-full border border-white/18 bg-black/38 text-white backdrop-blur-xl sm:grid">
        <Compass className="h-12 w-12 text-white/86" strokeWidth={1.3} />
        <span className="absolute top-2 text-[0.65rem] font-semibold text-[#f1ce7f]">N</span>
      </div>

      <button
        type="button"
        aria-label="Locate me"
        className="absolute bottom-28 right-6 z-30 grid h-11 w-11 place-items-center rounded-full border border-[#d8aa4f]/35 bg-black/46 text-[#f1ce7f] backdrop-blur-xl sm:hidden"
      >
        <LocateFixed className="h-5 w-5" />
      </button>
    </div>
  );
}

function RightSidebar() {
  return (
    <aside className="space-y-3 lg:min-h-[calc(100vh-8rem)]">
      <GlassPanel className="rounded-lg p-5">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#d8aa4f]">
          Discover Kyoto
        </p>
        <div className="mt-4 overflow-hidden rounded-md border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=720&q=86"
            alt="Kyoto pagoda at sunset"
            className="h-32 w-full object-cover"
          />
        </div>
        <h3 className="mt-4 font-sans text-lg font-medium text-white">Kyoto, Japan</h3>
        <p className="mt-2 text-sm leading-6 text-white/66">
          Cultural heart of Japan. Timeless temples, serene gardens, and hidden streets.
        </p>
        <button
          type="button"
          className="mt-4 flex h-11 w-full items-center justify-between rounded-md border border-[#d8aa4f]/45 bg-[#d8aa4f]/5 px-4 text-sm font-medium text-[#f1ce7f]"
        >
          Open Destination
          <ChevronRight className="h-4 w-4" />
        </button>
      </GlassPanel>

      <GlassPanel className="rounded-lg p-5">
        <div className="flex items-center justify-between">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#d8aa4f]">
            Popular Routes
          </p>
          <button type="button" className="text-xs text-white/48">
            View all
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {popularRoutes.map((route) => (
            <div key={route.title} className="flex gap-3 border-b border-white/8 pb-3 last:border-b-0 last:pb-0">
              <img
                src={route.image}
                alt=""
                className="h-16 w-16 rounded-md object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-white">{route.title}</p>
                <p className="mt-1 text-xs text-white/62">{route.meta}</p>
                <p className="mt-2 text-xs text-white/52">{route.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>

      <GlassPanel className="rounded-lg p-5">
        <div className="flex items-center justify-between">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#d8aa4f]">
            Local Insights
          </p>
          <span className="rounded-full border border-[#d8aa4f]/40 px-2 py-0.5 text-[0.62rem] font-semibold text-[#f1ce7f]">
            New
          </span>
        </div>
        <div className="relative mt-4 overflow-hidden rounded-md border border-white/10 bg-black/30 p-4">
          <img
            src="https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=620&q=84"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-36"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/56 to-transparent" />
          <div className="relative z-10 max-w-[11rem]">
            <h3 className="font-sans text-sm font-semibold leading-5 text-white">
              Best sunrise spots in Kyoto
            </h3>
            <p className="mt-3 text-xs leading-5 text-white/72">
              5 hidden gems loved by locals.
            </p>
          </div>
          <button
            type="button"
            aria-label="Play insight"
            className="absolute bottom-4 right-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-[#d8aa4f]/45 bg-[#d8aa4f]/12 text-[#f1ce7f]"
          >
            <Play className="h-4 w-4 fill-[#f1ce7f]" />
          </button>
        </div>
      </GlassPanel>
    </aside>
  );
}

function CategoryRail() {
  return (
    <GlassPanel className="relative rounded-lg px-4 py-4 sm:px-5">
      <div className="flex items-center justify-between">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#d8aa4f]">
          Explore by Category
        </p>
        <div className="hidden items-center gap-2 sm:flex">
          <button type="button" aria-label="Previous categories" className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-[#f1ce7f]">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Next categories" className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-[#f1ce7f]">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
        {categories.map(({ title, count, image }) => (
          <button
            key={title}
            type="button"
            className="group relative min-h-[132px] overflow-hidden rounded-lg border border-white/12 bg-black text-left transition hover:border-[#d8aa4f]/45"
          >
            <img
              src={image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-72 transition duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/38 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,rgba(216,170,79,.16),transparent_58%)]" />
            <span className="absolute bottom-4 left-4 right-4">
              <span className="block max-w-[11rem] text-lg font-semibold leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,.8)]">
                {title}
              </span>
              <span className="mt-2 block text-sm font-medium text-white/74 drop-shadow-[0_2px_8px_rgba(0,0,0,.75)]">
                {count}
              </span>
            </span>
          </button>
        ))}
      </div>
    </GlassPanel>
  );
}

export function AtlasMapPage() {
  return (
    <main className="min-h-screen bg-[#030706] text-white">
      <AtlasNav />
      <div className="mx-auto grid w-full max-w-[1720px] gap-3 px-4 py-3 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)_292px] lg:px-4 xl:grid-cols-[270px_minmax(0,1fr)_304px]">
        <div className="order-2 lg:order-1">
          <details className="group lg:hidden">
            <summary className="mb-3 flex cursor-pointer list-none items-center justify-between rounded-lg border border-white/12 bg-[#07100f]/78 p-4 text-sm font-semibold text-[#f1ce7f] backdrop-blur">
              Atlas filters
              <Layers3 className="h-4 w-4" />
            </summary>
            <LeftSidebar />
          </details>
          <div className="hidden lg:block">
            <LeftSidebar />
          </div>
        </div>

        <div className="order-1 min-w-0 lg:order-2">
          <CinematicMap />
        </div>

        <div className="order-3">
          <RightSidebar />
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1720px] px-4 pb-6 sm:px-6 lg:px-4">
        <CategoryRail />
      </div>
    </main>
  );
}
