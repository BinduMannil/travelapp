"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  type PointerEvent as ReactPointerEvent,
  type TouchEvent as ReactTouchEvent,
  type WheelEvent as ReactWheelEvent,
  useMemo,
  useRef,
  useState,
} from "react";
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
  type LucideIcon,
} from "lucide-react";
import { JourneeBrand } from "@/components/brand/JourneeLogo";
import { AppContentFrame } from "@/components/layout/AppContentFrame";
import {
  MapOverlayFrame,
  MAP_CONTROL_ITEM_CLASS,
} from "@/components/maps/MapOverlayFrame";
import { MainNavLink } from "@/components/navigation/MainNavLink";
import { CinematicBackground } from "@/components/visual/CinematicBackground";
import {
  getCityDestinationPageData,
  type CityDestinationPageData,
} from "@/lib/city/city-destination-data";
import { mainNavigation, routes } from "@/lib/routes";

const navItems = mainNavigation.slice(0, 6);

const menuItems = [
  { key: "explore", label: "Explore Kyoto", icon: Landmark },
  { key: "destinations", label: "Destinations", icon: MapPin },
  { key: "pois", label: "Points of Interest", icon: Sparkles },
  { key: "routes", label: "Routes", icon: Route },
  { key: "collections", label: "Collections", icon: Box },
  { key: "saved", label: "Saved Places", icon: Bookmark },
] as const;

type AtlasPanel = (typeof menuItems)[number]["key"];
type CountrySlug = "japan" | "vietnam";

const mapLayers = [
  { key: "terrain", label: "Terrain", enabled: true },
  { key: "roads", label: "Roads", enabled: false },
  { key: "topography", label: "Topography", enabled: true },
  { key: "pointsOfInterest", label: "Points of Interest", enabled: true },
  { key: "localFavorites", label: "Local Favorites", enabled: true },
  { key: "crowdLevels", label: "Crowd Levels", enabled: false },
  { key: "seasonalBeauty", label: "Seasonal Beauty", enabled: false },
] as const;

type MapLayerKey = (typeof mapLayers)[number]["key"];
type MapLayerState = Record<MapLayerKey, boolean>;

const defaultLayerState = mapLayers.reduce((state, layer) => {
  state[layer.key] = layer.enabled;
  return state;
}, {} as MapLayerState);

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
  {
    label: "Kinkaku-ji",
    detail: "Golden Pavilion",
    x: "77%",
    y: "32%",
    icon: Landmark,
    href: routes.citySection("kyoto", "attractions"),
    routeNode: [607, 292] as [number, number],
  },
  {
    label: "Arashiyama",
    detail: "Bamboo Grove",
    x: "46%",
    y: "36%",
    icon: Trees,
    href: routes.citySection("kyoto", "nearby"),
    routeNode: [365, 475] as [number, number],
  },
  {
    label: "Fushimi Inari",
    detail: "Taisha Shrine",
    x: "75%",
    y: "50%",
    icon: Landmark,
    href: routes.citySection("kyoto", "attractions"),
    routeNode: [637, 475] as [number, number],
  },
  {
    label: "Himeji Castle",
    detail: "Castle day trip",
    x: "18%",
    y: "55%",
    icon: Star,
    href: routes.citySection("kyoto", "nearby"),
    routeNode: [200, 445] as [number, number],
  },
];

const localFavoriteMarkers = [
  { label: "Kissa morning", x: "69%", y: "44%" },
  { label: "River walk", x: "59%", y: "51%" },
  { label: "Craft lane", x: "42%", y: "58%" },
  { label: "Quiet garden", x: "72%", y: "71%" },
];

const routeModes = [
  {
    key: "scenic",
    label: "Scenic",
    detail: "River bends, forest edges, slower viewpoints.",
    path: "M200 445 C305 402 367 410 455 376 C536 344 574 312 612 260 C690 238 742 264 805 302",
    color: "#f1ce7f",
    dash: "7 10",
  },
  {
    key: "fastest",
    label: "Fastest",
    detail: "Direct city-to-city movement with fewer stops.",
    path: "M365 475 C448 486 528 505 624 490 C689 478 739 440 806 394",
    color: "#fff1b8",
    dash: "0",
  },
  {
    key: "cultural",
    label: "Cultural",
    detail: "Temple districts, markets, and heritage walks.",
    path: "M520 488 C554 444 579 398 607 292 C638 354 650 398 637 475 C629 523 648 552 697 574",
    color: "#d8aa4f",
    dash: "3 8",
  },
] as const;

type RouteMode = (typeof routeModes)[number]["key"];

type AtlasDestination = {
  name: string;
  region: string;
  description: string;
  href: string;
  image: string;
};

type AtlasPoi = {
  label: string;
  detail: string;
  description: string;
  x: string;
  y: string;
  icon: LucideIcon;
  href: string;
  routeNode: [number, number];
};

type AtlasRouteCard = {
  title: string;
  meta: string;
  detail: string;
  href: string;
  image: string;
  mode: RouteMode;
};

type AtlasCollection = {
  title: string;
  count: string;
  description: string;
  href: string;
  image: string;
};

type AtlasCountry = {
  slug: CountrySlug;
  name: string;
  regionLabel: string;
  heroLabel: string;
  copy: string;
  backgroundImage: string;
  areaLabels: typeof areaLabels;
  cityLabels: typeof cityLabels;
  destinations: AtlasDestination[];
  pois: AtlasPoi[];
  routes: AtlasRouteCard[];
  collections: AtlasCollection[];
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

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

const atlasCountries: Record<CountrySlug, AtlasCountry> = {
  japan: {
    slug: "japan",
    name: "Japan",
    regionLabel: "Kansai Region",
    heroLabel: "Kansai Region",
    copy:
      "Explore with depth. Discover hidden places, plan meaningful journeys, and see the world like a local.",
    backgroundImage:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=2200&q=86",
    areaLabels,
    cityLabels,
    destinations: [
      {
        name: "Kyoto",
        region: "Kansai",
        description: "Temples, food markets, bamboo paths and quiet heritage streets.",
        href: routes.city("kyoto"),
        image:
          "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=720&q=86",
      },
      {
        name: "Tokyo",
        region: "Kanto",
        description: "Neighborhood precision, food counters, gardens and night walks.",
        href: routes.city("tokyo"),
        image:
          "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=720&q=86",
      },
    ],
    pois: landmarkMarkers.map((marker) => ({
      ...marker,
      description:
        marker.label === "Fushimi Inari"
          ? "A shrine route known for vermilion torii gates climbing into the mountain."
          : marker.label === "Arashiyama"
            ? "A calmer western Kyoto base for bamboo paths, river views and temple gardens."
            : marker.label === "Himeji Castle"
              ? "A classic day-trip castle stop for travelers extending beyond Kyoto."
              : "A landmark stop for Kyoto temple architecture and garden views.",
    })),
    routes: popularRoutes.map((route, index) => ({
      ...route,
      href: routes.citySection("kyoto", index === 1 ? "nearby" : "itinerary"),
      mode: routeModes[index % routeModes.length].key,
    })),
    collections: [
      {
        title: "Temples and Heritage",
        count: "28 places",
        description: "Kyoto shrines, temple gardens and old streets with slower pacing.",
        href: routes.citySection("kyoto", "attractions"),
        image:
          "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=720&q=86",
      },
      {
        title: "Food Streets",
        count: "18 stops",
        description: "Markets, small counters and evening lanes for a food-first day.",
        href: routes.citySection("kyoto", "restaurants"),
        image:
          "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=720&q=86",
      },
      {
        title: "Mountain Escapes",
        count: "9 routes",
        description: "Bamboo groves, forest paths and day trips at the edge of the city.",
        href: routes.citySection("kyoto", "nearby"),
        image:
          "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=720&q=86",
      },
      {
        title: "Romantic Stays",
        count: "12 stays",
        description: "Ryokan-style evenings, river walks and gentle dinner districts.",
        href: "/stays",
        image:
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=720&q=86",
      },
      {
        title: "Hidden Local Favorites",
        count: "22 finds",
        description: "Small lanes, quiet cafes and second-day discoveries.",
        href: routes.citySection("kyoto", "hidden-gems"),
        image:
          "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=720&q=86",
      },
    ],
  },
  vietnam: {
    slug: "vietnam",
    name: "Vietnam",
    regionLabel: "North to South",
    heroLabel: "Vietnam Atlas",
    copy:
      "Move between old quarters, river cities, beaches, highlands and food streets with regional context.",
    backgroundImage:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2200&q=86",
    areaLabels: [
      { label: "HANOI", x: "62%", y: "20%", size: "text-lg font-semibold tracking-[0.12em] sm:text-xl" },
      { label: "HA LONG", x: "76%", y: "27%", size: "text-sm font-semibold tracking-[0.12em]" },
      { label: "DA NANG", x: "57%", y: "51%", size: "text-lg font-semibold tracking-[0.12em]" },
      { label: "HOI AN", x: "64%", y: "58%", size: "text-xs font-semibold tracking-[0.1em]" },
      { label: "SAIGON", x: "45%", y: "78%", size: "text-lg font-semibold tracking-[0.12em]" },
      { label: "MEKONG DELTA", x: "37%", y: "88%", size: "text-sm font-medium" },
    ],
    cityLabels: [
      { label: "Hanoi", x: "62%", y: "24%", glow: true },
      { label: "Da Nang", x: "57%", y: "52%", glow: true },
      { label: "Hoi An", x: "64%", y: "59%" },
      { label: "Ho Chi Minh City", x: "45%", y: "79%", glow: true },
    ],
    destinations: [
      {
        name: "Ho Chi Minh City",
        region: "South",
        description: "Coffee, rooftops, markets and fast-moving neighborhood life.",
        href: routes.city("ho-chi-minh-city"),
        image:
          "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=720&q=86",
      },
      {
        name: "Hanoi",
        region: "North",
        description: "Old Quarter streets, lakes, rail corners and layered food culture.",
        href: routes.city("hanoi"),
        image:
          "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=720&q=86",
      },
      {
        name: "Da Nang",
        region: "Central coast",
        description: "Beach base, Dragon Bridge evenings and easy Hoi An access.",
        href: routes.city("da-nang"),
        image:
          "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=720&q=86",
      },
      {
        name: "Hoi An",
        region: "Central coast",
        description: "Lantern streets, riverside walks, tailoring and slow food days.",
        href: routes.city("hoi-an"),
        image:
          "https://images.unsplash.com/photo-1560113855-2ea616c915ee?auto=format&fit=crop&w=720&q=86",
      },
    ],
    pois: [
      {
        label: "Hoan Kiem Lake",
        detail: "Hanoi walking anchor",
        description: "A useful first-day orientation point for the Old Quarter and evening loops.",
        x: "62%",
        y: "24%",
        icon: Landmark,
        href: routes.city("hanoi"),
        routeNode: [620, 170],
      },
      {
        label: "Dragon Bridge",
        detail: "Da Nang night icon",
        description: "A central Da Nang landmark that ties the riverfront, beach side and city core together.",
        x: "57%",
        y: "52%",
        icon: Sparkles,
        href: routes.city("da-nang"),
        routeNode: [570, 374],
      },
      {
        label: "Hoi An Old Town",
        detail: "Lantern heritage",
        description: "A compact heritage center for food streets, river walks and tailor visits.",
        x: "64%",
        y: "59%",
        icon: Landmark,
        href: routes.city("hoi-an"),
        routeNode: [640, 425],
      },
      {
        label: "Ben Thanh Market",
        detail: "Saigon market stop",
        description: "A central food and shopping marker for first-time Ho Chi Minh City routing.",
        x: "45%",
        y: "79%",
        icon: Star,
        href: routes.city("ho-chi-minh-city"),
        routeNode: [450, 569],
      },
    ],
    routes: [
      {
        title: "Hanoi to Ha Long",
        meta: "Bay gateway",
        detail: "2-3 days · City to coast",
        href: routes.city("hanoi"),
        image:
          "https://images.unsplash.com/photo-1669819894338-53ab7afc6958?auto=format&fit=crop&w=420&q=82",
        mode: "scenic",
      },
      {
        title: "Da Nang and Hoi An",
        meta: "Central coast",
        detail: "3 days · Beach and lanterns",
        href: routes.city("da-nang"),
        image:
          "https://images.unsplash.com/photo-1560113855-2ea616c915ee?auto=format&fit=crop&w=420&q=82",
        mode: "cultural",
      },
      {
        title: "Saigon Food Streets",
        meta: "Markets and cafes",
        detail: "1 day · Short transfers",
        href: routes.city("ho-chi-minh-city"),
        image:
          "https://images.unsplash.com/photo-1704635329439-165fa6b8eaec?auto=format&fit=crop&w=420&q=82",
        mode: "fastest",
      },
    ],
    collections: [
      {
        title: "Temples and Heritage",
        count: "16 places",
        description: "Old towns, pagodas, citadels and neighborhood history.",
        href: routes.country("vietnam"),
        image:
          "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=720&q=86",
      },
      {
        title: "Food Streets",
        count: "34 stops",
        description: "Coffee, noodles, markets, seafood and night eating streets.",
        href: routes.citySection("ho-chi-minh-city", "restaurants"),
        image:
          "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=720&q=86",
      },
      {
        title: "Mountain Escapes",
        count: "8 routes",
        description: "Sapa terraces, Da Lat pine air and cooler highland pacing.",
        href: routes.country("vietnam"),
        image:
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=720&q=86",
      },
      {
        title: "Romantic Stays",
        count: "10 stays",
        description: "Hoi An lantern nights, beach stays and slow river mornings.",
        href: "/stays",
        image:
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=720&q=86",
      },
      {
        title: "Hidden Local Favorites",
        count: "19 finds",
        description: "Small cafes, local markets and calmer second-day routes.",
        href: routes.citySection("hanoi", "hidden-gems"),
        image:
          "https://images.unsplash.com/photo-1680962201936-e59a519c5bd1?auto=format&fit=crop&w=720&q=86",
      },
    ],
  },
};

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

function Toggle({
  enabled,
  label,
  onToggle,
}: {
  enabled: boolean;
  label: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={`${label} layer`}
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f1ce7f]/75 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07100f] ${
        enabled
          ? "border-[#e1b760]/70 bg-[#c89b3c]/75 shadow-[0_0_18px_rgba(216,170,79,.22)]"
          : "border-white/14 bg-white/8"
      }`}
    >
      <span
        className={`h-4 w-4 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,.42)] transition ${
          enabled ? "translate-x-[1.35rem]" : "translate-x-0.5 opacity-60"
        }`}
      />
    </button>
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
            <MainNavLink
              key={item.label}
              label={item.label}
              href={item.href}
              className="relative text-sm text-white/76 transition hover:text-white"
              activeClassName="text-[#e2b965]"
              underlineClassName="absolute -bottom-[23px] left-0 h-px w-full bg-[#d8aa4f]"
            />
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

function LeftSidebar({
  country,
  activePanel,
  onChangePanel,
  onCountryChange,
  layerState,
  onToggleLayer,
}: {
  country: AtlasCountry;
  activePanel: AtlasPanel;
  onChangePanel: (panel: AtlasPanel) => void;
  onCountryChange: (country: CountrySlug) => void;
  layerState: MapLayerState;
  onToggleLayer: (key: MapLayerKey) => void;
}) {
  const [countryMenuOpen, setCountryMenuOpen] = useState(false);

  return (
    <GlassPanel className="rounded-lg p-5 lg:min-h-[calc(100vh-8rem)]">
      <div>
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#d8aa4f]">
          Atlas
        </p>
        <div className="relative mt-3">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={countryMenuOpen}
            className="flex w-full items-end gap-2 rounded-md border border-transparent py-1 text-left transition hover:border-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f1ce7f]"
            onClick={() => setCountryMenuOpen((open) => !open)}
          >
            <span className="font-sans text-3xl leading-none text-white">{country.name}</span>
            <ChevronDown
              className={`mb-1 h-4 w-4 text-[#d8aa4f] transition ${countryMenuOpen ? "rotate-180" : ""}`}
            />
          </button>
          {countryMenuOpen ? (
            <div
              role="listbox"
              aria-label="Select Atlas country"
              className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-md border border-white/14 bg-[#08100f] shadow-[0_18px_54px_rgba(0,0,0,.48)]"
            >
              {(["japan", "vietnam"] as CountrySlug[]).map((slug) => (
                <button
                  key={slug}
                  type="button"
                  role="option"
                  aria-selected={country.slug === slug}
                  className={`flex w-full items-center justify-between px-3 py-3 text-left text-sm transition hover:bg-white/[0.055] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f1ce7f] ${
                    country.slug === slug ? "text-[#f1ce7f]" : "text-white/76"
                  }`}
                  onClick={() => {
                    onCountryChange(slug);
                    setCountryMenuOpen(false);
                  }}
                >
                  {atlasCountries[slug].name}
                  {country.slug === slug ? <CircleDot className="h-4 w-4" /> : null}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <p className="mt-2 text-sm text-white/58">
          {country.regionLabel}
        </p>
        <p className="mt-5 max-w-[24rem] text-sm leading-6 text-white/66">
          {country.copy}
        </p>
      </div>

      <div className="mt-6 space-y-1 border-b border-white/10 pb-5">
        {menuItems.map(({ key, label, icon: Icon }) => {
          const active = activePanel === key;

          return key === "explore" ? (
            <Link
              key={key}
              href={routes.city("kyoto")}
              onClick={() => onChangePanel(key)}
              className={`flex h-11 w-full items-center gap-3 rounded-md border px-3 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f1ce7f] ${
                active
                  ? "border-[#d8aa4f]/24 bg-[#d8aa4f]/10 text-[#f1ce7f]"
                  : "border-transparent text-white/74 hover:border-white/10 hover:bg-white/[0.035] hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.6} />
              <span>{label}</span>
              <ChevronRight className="ml-auto h-4 w-4 text-white/28" />
            </Link>
          ) : (
          <button
            key={key}
            type="button"
            aria-pressed={active}
            onClick={() => onChangePanel(key)}
            className={`flex h-11 w-full items-center gap-3 rounded-md border px-3 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f1ce7f] ${
              active
                ? "border-[#d8aa4f]/24 bg-[#d8aa4f]/10 text-[#f1ce7f]"
                : "border-transparent text-white/74 hover:border-white/10 hover:bg-white/[0.035] hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4" strokeWidth={1.6} />
            <span>{label}</span>
            <ChevronRight className="ml-auto h-4 w-4 text-white/28" />
          </button>
          );
        })}
      </div>

      <div className="mt-5">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#d8aa4f]/82">
          Map Layers
        </p>
        <div className="mt-3 space-y-3">
          {mapLayers.map((layer) => (
            <div key={layer.key} className="flex items-center justify-between gap-3">
              <span
                className={`text-sm transition ${
                  layerState[layer.key] ? "text-white" : "text-white/56"
                }`}
              >
                {layer.label}
              </span>
              <Toggle
                enabled={layerState[layer.key]}
                label={layer.label}
                onToggle={() => onToggleLayer(layer.key)}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onChangePanel("destinations")}
        className="mt-7 flex h-11 w-full items-center justify-center gap-3 rounded-md border border-[#d8aa4f]/52 bg-black/24 px-4 text-sm font-medium text-[#f1ce7f] transition hover:bg-[#d8aa4f]/10"
      >
        View Map Guide
        <Info className="h-4 w-4" strokeWidth={1.6} />
      </button>
    </GlassPanel>
  );
}

function RouteSystem({
  routeMode,
  showRoutes,
}: {
  routeMode: RouteMode;
  showRoutes: boolean;
}) {
  const activeRoute = routeModes.find((route) => route.key === routeMode) ?? routeModes[0];

  return (
    <svg
      data-testid="atlas-layer-roads"
      className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
        showRoutes ? "opacity-100" : "opacity-0"
      }`}
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
      {routeModes.map((route) => {
        const active = route.key === activeRoute.key;

        return (
          <path
            key={route.key}
            d={route.path}
            fill="none"
            stroke={active ? route.color : "url(#goldRoute)"}
            strokeDasharray={route.dash}
            strokeLinecap="round"
            strokeWidth={active ? "4.2" : "2"}
            opacity={active ? ".96" : ".22"}
            filter="url(#routeGlow)"
            className={active ? "atlas-route-draw" : ""}
          />
        );
      })}
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

function buildMapMarkers(country: AtlasCountry, selectedCity?: CityDestinationPageData | null) {
  if (country.slug === "vietnam") return country.pois;
  if (!selectedCity) return country.pois;

  return selectedCity.atlas.points.slice(0, 6).map((point, index) => {
    const gem = selectedCity.hiddenGems[index % Math.max(selectedCity.hiddenGems.length, 1)];
    const fallback = landmarkMarkers[index % landmarkMarkers.length];

    return {
      label: point.name,
      detail: gem?.place ?? selectedCity.city,
      x: point.x,
      y: point.y,
      icon: fallback.icon,
      href:
        index % 2 === 0
          ? routes.citySection(selectedCity.slug, "hidden-gems")
          : routes.city(selectedCity.slug),
      routeNode: fallback.routeNode,
    };
  });
}

function CinematicMap({
  country,
  selectedCity,
  experienceSlug,
  layerState,
  activePanel,
}: {
  country: AtlasCountry;
  selectedCity?: CityDestinationPageData | null;
  experienceSlug?: string;
  layerState: MapLayerState;
  activePanel: AtlasPanel;
}) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(-6);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [routeMode, setRouteMode] = useState<RouteMode>("scenic");
  const [showRoutes, setShowRoutes] = useState(true);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const dragRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const pinchRef = useRef<{ distance: number; zoom: number } | null>(null);
  const markers = useMemo(() => buildMapMarkers(country, selectedCity), [country, selectedCity]);
  const activeRoute = routeModes.find((route) => route.key === routeMode) ?? routeModes[0];
  const selectedMarker = markers.find((marker) => marker.label === activeMarker) ?? markers[0];
  const effectiveShowRoutes = layerState.roads && showRoutes;

  const updateZoom = (direction: 1 | -1) => {
    setZoom((current) => clamp(Number((current + direction * 0.18).toFixed(2)), 0.82, 1.68));
  };

  const resetMap = () => {
    setRotation(0);
    setPan({ x: 0, y: 0 });
    setZoom(1);
  };

  const cycleRouteMode = () => {
    setShowRoutes(true);
    const index = routeModes.findIndex((route) => route.key === routeMode);
    const nextRoute = routeModes[(index + 1) % routeModes.length] ?? routeModes[0];
    setRouteMode(nextRoute.key);
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    setZoom((current) => clamp(Number((current - event.deltaY * 0.0012).toFixed(2)), 0.82, 1.68));
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    if (event.target instanceof Element && event.target.closest("button,a")) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const nextX = dragRef.current.panX + (event.clientX - dragRef.current.x);
    const nextY = dragRef.current.panY + (event.clientY - dragRef.current.y);
    setPan({ x: clamp(nextX, -140, 140), y: clamp(nextY, -95, 95) });
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const touchDistance = (touches: ReactTouchEvent<HTMLDivElement>["touches"]) => {
    if (touches.length < 2) return 0;
    const [first, second] = [touches[0], touches[1]];
    return Math.hypot(first.clientX - second.clientX, first.clientY - second.clientY);
  };

  const handleTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2) {
      pinchRef.current = { distance: touchDistance(event.touches), zoom };
    }
  };

  const handleTouchMove = (event: ReactTouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 2 || !pinchRef.current) return;
    event.preventDefault();
    const distance = touchDistance(event.touches);
    if (!distance) return;
    setZoom(clamp(Number((pinchRef.current.zoom * (distance / pinchRef.current.distance)).toFixed(2)), 0.82, 1.68));
  };

  const mapTransform = {
    transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom}) rotate(${rotation}deg)`,
  };

  return (
    <div
      className="relative min-h-[680px] touch-none overflow-hidden border border-white/10 bg-[#06100f] shadow-[0_32px_120px_rgba(0,0,0,.5)] lg:min-h-[calc(100vh-8rem)]"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div
        className="absolute inset-[-8%] cursor-grab transition-transform duration-500 ease-out active:cursor-grabbing"
        style={mapTransform}
      >
        {layerState.terrain ? (
          <div
            data-testid="atlas-layer-terrain"
            className="pointer-events-none absolute inset-0 scale-105"
            style={{
              backgroundImage:
                `radial-gradient(circle at 58% 47%, rgba(251,206,124,.3) 0 1px, transparent 2px), radial-gradient(circle at 42% 62%, rgba(241,206,127,.26) 0 1px, transparent 2px), radial-gradient(circle at 68% 30%, rgba(231,195,113,.2) 0 1px, transparent 2px), linear-gradient(120deg, transparent 0 24%, rgba(34,47,38,.78) 25% 29%, transparent 30% 44%, rgba(13,31,33,.84) 45% 48%, transparent 49%), radial-gradient(ellipse at 55% 56%, rgba(11,18,13,.05), rgba(2,6,7,.72) 68%), url('${country.backgroundImage}')`,
              backgroundSize: "42px 42px, 66px 66px, 94px 94px, cover, cover, cover",
              backgroundPosition: "center",
            }}
          />
        ) : (
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_58%_48%,rgba(39,53,45,.55),transparent_44%),linear-gradient(135deg,#07110f,#020506_70%)]" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_56%_48%,rgba(216,170,79,.18),transparent_22%),linear-gradient(180deg,rgba(2,5,6,.18),rgba(2,5,6,.78)),linear-gradient(90deg,rgba(2,5,6,.82),transparent_22%,transparent_76%,rgba(2,5,6,.8))]" />
        {layerState.topography ? (
          <div data-testid="atlas-layer-topography" className="pointer-events-none absolute inset-0">
            <div className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-screen [background-image:linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:84px_84px]" />
            <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:repeating-linear-gradient(140deg,transparent_0_18px,rgba(255,255,255,.035)_19px,transparent_21px)]" />
            <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:repeating-radial-gradient(ellipse_at_62%_44%,transparent_0_44px,rgba(241,206,127,.12)_46px,transparent_49px)]" />
          </div>
        ) : null}

        {layerState.crowdLevels ? (
          <div data-testid="atlas-layer-crowd-levels" className="pointer-events-none absolute inset-0">
            {glowNodes.map((node) => (
              <span
                key={`${node.x}-${node.y}`}
                className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d8aa4f]/24 blur-xl ${node.size}`}
                style={{ left: node.x, top: node.y }}
              />
            ))}
          </div>
        ) : null}

        {layerState.seasonalBeauty ? (
          <div data-testid="atlas-layer-seasonal-beauty" className="pointer-events-none absolute inset-0 opacity-70 mix-blend-screen [background-image:radial-gradient(circle_at_34%_28%,rgba(255,179,191,.28)_0_2px,transparent_3px),radial-gradient(circle_at_73%_35%,rgba(255,222,150,.24)_0_3px,transparent_4px),radial-gradient(circle_at_58%_66%,rgba(175,222,171,.22)_0_2px,transparent_3px),radial-gradient(circle_at_43%_78%,rgba(255,179,191,.2)_0_2px,transparent_3px)] [background-size:118px_96px,156px_130px,132px_110px,172px_140px]" />
        ) : null}

        <RouteSystem routeMode={routeMode} showRoutes={effectiveShowRoutes || activePanel === "routes"} />

        {country.areaLabels.map((area) => (
          <span
            key={area.label}
            className={`pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 text-white/55 ${area.size}`}
            style={{ left: area.x, top: area.y }}
          >
            {area.label}
          </span>
        ))}

        {country.cityLabels.map((city) => (
          <Link
            key={city.label}
            href={
              city.label.toLowerCase() === "kyoto"
                ? routes.atlas("kyoto")
                : country.destinations.find((destination) => destination.name === city.label)?.href ?? routes.atlas()
            }
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 text-center outline-none transition hover:scale-105 focus:ring-2 focus:ring-[#d8aa4f]/70"
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
          </Link>
        ))}

        {(layerState.pointsOfInterest || activePanel === "pois") ? markers.map(({ label, detail, x, y, icon: Icon }) => {
          const active = activeMarker === label;

          return (
            <button
              key={label}
              type="button"
              data-atlas-layer="points-of-interest"
              aria-pressed={active}
              onClick={(event) => {
                event.stopPropagation();
                setActiveMarker(label);
                setZoom((current) => Math.max(current, 1.12));
              }}
              className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 text-left outline-none transition hover:scale-105 focus:ring-2 focus:ring-[#d8aa4f]/70"
              style={{ left: x, top: y }}
            >
              <span
                className={`grid h-8 w-8 place-items-center rounded-full border text-[#f1ce7f] backdrop-blur transition ${
                  active
                    ? "border-[#fff0bd] bg-[#6a4512]/86 shadow-[0_0_34px_rgba(216,170,79,.72)]"
                    : "border-[#f1ce7f]/55 bg-[#3a260e]/72 shadow-[0_0_24px_rgba(216,170,79,.38)]"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.7} />
              </span>
              <span className="min-w-max rounded-md bg-black/24 px-2 py-1 text-xs font-semibold leading-4 text-white shadow-[0_8px_24px_rgba(0,0,0,.36)] backdrop-blur">
                {label}
                {detail ? <span className="block font-normal text-white/78">{detail}</span> : null}
              </span>
            </button>
          );
        }) : null}

        {layerState.localFavorites ? localFavoriteMarkers.map(({ label, x, y }) => (
          <button
            key={label}
            type="button"
            data-atlas-layer="local-favorites"
            onClick={(event) => {
              event.stopPropagation();
              setActiveMarker(label);
            }}
            className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 text-left outline-none transition hover:scale-105 focus:ring-2 focus:ring-[#d8aa4f]/70"
            style={{ left: x, top: y }}
          >
            <span className="grid h-6 w-6 place-items-center rounded-full border border-[#f1ce7f]/45 bg-[#111f16]/82 text-[#f1ce7f] shadow-[0_0_18px_rgba(216,170,79,.28)] backdrop-blur">
              <Star className="h-3 w-3 fill-[#f1ce7f]" strokeWidth={1.5} />
            </span>
            <span className="min-w-max rounded-md bg-[#07100f]/46 px-2 py-1 text-[0.68rem] font-medium leading-4 text-white/84 shadow-[0_8px_24px_rgba(0,0,0,.28)] backdrop-blur">
              {label}
            </span>
          </button>
        )) : null}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_56%_48%,transparent_18%,rgba(2,5,6,.22)_58%,rgba(2,5,6,.72)),linear-gradient(90deg,rgba(2,5,6,.65),transparent_28%,transparent_74%,rgba(2,5,6,.72))]" />

      <div className="pointer-events-none absolute left-8 top-[17.5rem] z-10 max-w-[27rem] sm:left-12 lg:top-[19rem]">
        <p className="text-sm font-semibold tracking-[0.08em] text-[#e3b861]">
          {selectedCity
            ? `${selectedCity.city} Atlas${experienceSlug ? " · Hidden Gem" : ""}`
            : country.heroLabel}
        </p>
        <h2 className="mt-3 max-w-[27rem] text-3xl font-extrabold leading-[1.08] text-white sm:text-4xl xl:text-5xl">
          Explore deeper.
          <span className="block">
            <span className="font-extrabold text-[#e9b85e]">Journee</span> further.
          </span>
        </h2>
        <p className="mt-4 max-w-[15rem] text-sm leading-6 text-white/82 sm:max-w-sm sm:text-base sm:leading-7">
          {selectedCity
            ? selectedCity.description
            : country.copy}
        </p>
        <button
          type="button"
          className="pointer-events-auto mt-5 inline-flex items-center gap-3 text-sm font-semibold text-[#f1ce7f]"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full border border-[#d8aa4f]/70">
            <Play className="h-3 w-3 fill-[#f1ce7f]" />
          </span>
          How it works
        </button>
      </div>

      <MapOverlayFrame
        preview={selectedMarker ? (
        <>
          <p className="text-[0.64rem] font-bold uppercase tracking-[0.12em] text-[#d8aa4f]">
            Destination Preview
          </p>
          <h3 className="mt-2 font-sans text-lg font-semibold text-white">{selectedMarker.label}</h3>
          <p className="mt-1 text-sm leading-5 text-white/68">
            {selectedMarker.detail}. Active route: {activeRoute.label.toLowerCase()}.
          </p>
          <Link
            href={selectedMarker.href}
            className="mt-4 inline-flex h-10 items-center gap-2 rounded-md border border-[#d8aa4f]/45 bg-[#d8aa4f]/8 px-3 text-sm font-semibold text-[#f1ce7f] transition hover:bg-[#d8aa4f]/14"
          >
            Explore destination
            <ChevronRight className="h-4 w-4" />
          </Link>
        </>
        ) : null}
        routeBadge={(
          <button
            type="button"
            onClick={() => setShowRoutes((current) => !current)}
            aria-pressed={effectiveShowRoutes}
            className="text-left"
          >
            {effectiveShowRoutes ? "Routes on" : "Routes off"}
            <span className="block text-[0.62rem] font-medium normal-case tracking-normal text-white/64">
              {layerState.roads ? activeRoute.label : "Roads layer"}
            </span>
          </button>
        )}
        controls={(
          <>
        {modeButtons.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            type="button"
            className={`${MAP_CONTROL_ITEM_CLASS} flex flex-col items-center justify-center gap-1 ${
              active ? "text-[#f1ce7f]" : "text-white/74"
            }`}
          >
            <Icon className="h-5 w-5" strokeWidth={1.55} />
            <span className="whitespace-nowrap">{label}</span>
          </button>
        ))}
          </>
        )}
      />

      <div className="absolute right-4 top-[36%] z-30 flex flex-col overflow-hidden rounded-lg border border-white/14 bg-black/46 text-white/84 backdrop-blur-xl sm:right-8">
        <button type="button" aria-label={`Zoom in. Current zoom ${Math.round(zoom * 100)}%`} onClick={() => updateZoom(1)} className="grid h-12 w-12 place-items-center border-b border-white/10 transition hover:bg-white/10 sm:h-14 sm:w-14">
          <ZoomIn className="h-5 w-5" />
        </button>
        <button type="button" aria-label={`Zoom out. Current zoom ${Math.round(zoom * 100)}%`} onClick={() => updateZoom(-1)} className="grid h-12 w-12 place-items-center border-b border-white/10 transition hover:bg-white/10 sm:h-14 sm:w-14">
          <ZoomOut className="h-5 w-5" />
        </button>
        <button type="button" aria-label={`Switch route mode. Current mode: ${activeRoute.label}`} onClick={cycleRouteMode} className="grid h-12 w-12 place-items-center transition hover:bg-white/10 sm:h-14 sm:w-14">
          <Navigation className="h-5 w-5" />
        </button>
      </div>

      <button
        type="button"
        onClick={resetMap}
        aria-label="Reset map orientation and zoom"
        className="absolute right-4 top-[20%] z-30 grid h-16 w-16 place-items-center rounded-full border border-white/18 bg-black/38 text-white backdrop-blur-xl transition hover:border-[#d8aa4f]/48 hover:bg-black/54 sm:right-9 sm:h-20 sm:w-20"
      >
        <Compass
          className="h-10 w-10 text-white/86 transition-transform duration-500 sm:h-12 sm:w-12"
          strokeWidth={1.3}
          style={{ transform: `rotate(${-rotation}deg)` }}
        />
        <span className="absolute top-2 text-[0.65rem] font-semibold text-[#f1ce7f]">N</span>
      </button>

      <div className="absolute bottom-40 left-5 z-30 hidden max-w-[15rem] rounded-lg border border-white/12 bg-black/42 px-4 py-3 text-xs leading-5 text-white/68 backdrop-blur-xl xl:block">
        <span className="block font-bold uppercase tracking-[0.1em] text-[#f1ce7f]">
          {activeRoute.label} route
        </span>
        {activeRoute.detail}
      </div>

      <button
        type="button"
        aria-label="Focus active destination"
        onClick={() => {
          setActiveMarker(selectedMarker?.label ?? markers[0]?.label ?? null);
          setZoom(1.24);
        }}
        className="absolute bottom-28 right-6 z-30 grid h-11 w-11 place-items-center rounded-full border border-[#d8aa4f]/35 bg-black/46 text-[#f1ce7f] backdrop-blur-xl sm:hidden"
      >
        <LocateFixed className="h-5 w-5" />
      </button>
    </div>
  );
}

function RightSidebar({
  country,
  activePanel,
  onChangePanel,
}: {
  country: AtlasCountry;
  activePanel: AtlasPanel;
  onChangePanel: (panel: AtlasPanel) => void;
}) {
  const primaryDestination = country.destinations[0];

  return (
    <aside className="space-y-3 lg:min-h-[calc(100vh-8rem)]">
      <GlassPanel className="rounded-lg p-5">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#d8aa4f]">
          {activePanel === "destinations"
            ? "Destinations"
            : activePanel === "pois"
              ? "Points of Interest"
              : activePanel === "routes"
                ? "Routes"
                : activePanel === "collections"
                  ? "Collections"
                  : activePanel === "saved"
                    ? "Saved Places"
                    : `Discover ${primaryDestination.name}`}
        </p>

        {activePanel === "saved" ? (
          <div className="mt-4 rounded-md border border-white/10 bg-black/24 p-5">
            <Bookmark className="h-7 w-7 text-[#f1ce7f]" strokeWidth={1.6} />
            <h3 className="mt-4 font-sans text-lg font-medium text-white">
              No saved places yet
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/66">
              Save destinations and points of interest as you explore {country.name}.
            </p>
            <button
              type="button"
              onClick={() => onChangePanel("destinations")}
              className="mt-4 flex h-11 w-full items-center justify-between rounded-md border border-[#d8aa4f]/45 bg-[#d8aa4f]/5 px-4 text-sm font-medium text-[#f1ce7f] transition hover:bg-[#d8aa4f]/12"
            >
              Explore destinations
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : activePanel === "destinations" ? (
          <div className="mt-4 space-y-3">
            {country.destinations.map((destination) => (
              <Link
                key={destination.name}
                href={destination.href}
                className="group flex gap-3 rounded-md border border-white/10 bg-black/18 p-2 transition hover:border-[#d8aa4f]/45 hover:bg-[#d8aa4f]/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f1ce7f]"
              >
                <img
                  src={destination.image}
                  alt=""
                  className="h-16 w-16 rounded-md object-cover"
                />
                <span>
                  <span className="block text-sm font-semibold text-white">{destination.name}</span>
                  <span className="mt-1 block text-xs text-[#f1ce7f]/80">{destination.region}</span>
                  <span className="mt-1 block text-xs leading-5 text-white/58">
                    {destination.description}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        ) : activePanel === "pois" ? (
          <div className="mt-4 space-y-3">
            {country.pois.map((poi) => {
              const Icon = poi.icon;

              return (
                <Link
                  key={poi.label}
                  href={poi.href}
                  className="block rounded-md border border-white/10 bg-black/18 p-3 transition hover:border-[#d8aa4f]/45 hover:bg-[#d8aa4f]/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f1ce7f]"
                >
                  <span className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#f1ce7f]/50 bg-[#3a260e]/72 text-[#f1ce7f]">
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-white">{poi.label}</span>
                      <span className="mt-1 block text-xs text-[#f1ce7f]/80">{poi.detail}</span>
                      <span className="mt-2 block text-xs leading-5 text-white/62">
                        {poi.description}
                      </span>
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        ) : activePanel === "routes" ? (
          <div className="mt-4 space-y-3">
            {country.routes.map((route) => (
              <Link
                key={route.title}
                href={route.href}
                className="flex gap-3 rounded-md border border-white/10 bg-black/18 p-2 transition hover:border-[#d8aa4f]/45 hover:bg-[#d8aa4f]/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f1ce7f]"
              >
                <img src={route.image} alt="" className="h-16 w-16 rounded-md object-cover" />
                <span>
                  <span className="block text-sm font-semibold text-white">{route.title}</span>
                  <span className="mt-1 block text-xs text-[#f1ce7f]/80">{route.meta}</span>
                  <span className="mt-2 block text-xs text-white/56">
                    {route.detail} · {routeModes.find((mode) => mode.key === route.mode)?.label}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        ) : activePanel === "collections" ? (
          <div className="mt-4 space-y-3">
            {country.collections.map((collection) => (
              <Link
                key={collection.title}
                href={collection.href}
                className="group relative block min-h-[118px] overflow-hidden rounded-md border border-white/10 bg-black transition hover:border-[#d8aa4f]/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f1ce7f]"
              >
                <img
                  src={collection.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-52 transition group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/62 to-black/10" />
                <span className="relative z-10 block max-w-[13rem] p-4">
                  <span className="block text-sm font-semibold text-white">{collection.title}</span>
                  <span className="mt-1 block text-xs text-[#f1ce7f]/80">{collection.count}</span>
                  <span className="mt-2 block text-xs leading-5 text-white/68">
                    {collection.description}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <>
            <div className="mt-4 overflow-hidden rounded-md border border-white/10">
              <img
                src={primaryDestination.image}
                alt=""
                className="h-32 w-full object-cover"
              />
            </div>
            <h3 className="mt-4 font-sans text-lg font-medium text-white">
              {primaryDestination.name}, {country.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/66">
              {primaryDestination.description}
            </p>
            <Link
              href={primaryDestination.href}
              className="mt-4 flex h-11 w-full items-center justify-between rounded-md border border-[#d8aa4f]/45 bg-[#d8aa4f]/5 px-4 text-sm font-medium text-[#f1ce7f] transition hover:bg-[#d8aa4f]/12"
            >
              Open Destination
              <ChevronRight className="h-4 w-4" />
            </Link>
          </>
        )}
      </GlassPanel>

      <GlassPanel className="rounded-lg p-5">
        <div className="flex items-center justify-between">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#d8aa4f]">
            Popular Routes
          </p>
          <button
            type="button"
            onClick={() => onChangePanel("routes")}
            className="text-xs text-white/48 transition hover:text-[#f1ce7f]"
          >
            View all
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {country.routes.slice(0, 3).map((route) => (
            <Link
              key={route.title}
              href={route.href}
              className="flex gap-3 border-b border-white/8 pb-3 transition hover:text-[#f1ce7f] last:border-b-0 last:pb-0"
            >
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
            </Link>
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
              {country.slug === "japan" ? "Best sunrise spots in Kyoto" : "Best street-food starts in Vietnam"}
            </h3>
            <p className="mt-3 text-xs leading-5 text-white/72">
              5 curated ideas loved by locals.
            </p>
          </div>
          <button
            type="button"
            aria-label="Play insight"
            onClick={() => onChangePanel("collections")}
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

export function AtlasMapPage({
  citySlug,
  experienceSlug,
}: {
  citySlug?: string;
  experienceSlug?: string;
} = {}) {
  const selectedCity = citySlug ? getCityDestinationPageData(citySlug) : null;
  const [activePanel, setActivePanel] = useState<AtlasPanel>("explore");
  const [countrySlug, setCountrySlug] = useState<CountrySlug>(
    selectedCity?.country === "Vietnam" ? "vietnam" : "japan",
  );
  const [layerState, setLayerState] = useState<MapLayerState>(defaultLayerState);
  const atlasCountry = atlasCountries[countrySlug];

  const handleToggleLayer = (key: MapLayerKey) => {
    setLayerState((current) => ({ ...current, [key]: !current[key] }));
  };

  const handleCountryChange = (slug: CountrySlug) => {
    setCountrySlug(slug);
    setActivePanel("destinations");
  };

  return (
    <main className="min-h-screen bg-[#030706] text-white" data-atlas-country={atlasCountry.slug}>
      <CinematicBackground image={atlasCountry.backgroundImage} className="fixed opacity-35" />
      <AtlasNav />
      <AppContentFrame as="div" variant="flush" className="relative mx-auto grid w-full max-w-[1720px] gap-3 px-4 py-3 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)_292px] lg:px-4 xl:grid-cols-[270px_minmax(0,1fr)_304px]">
        <div className="order-2 lg:order-1">
          <details className="group lg:hidden">
            <summary className="mb-3 flex cursor-pointer list-none items-center justify-between rounded-lg border border-white/12 bg-[#07100f]/78 p-4 text-sm font-semibold text-[#f1ce7f] backdrop-blur">
              Atlas filters
              <Layers3 className="h-4 w-4" />
            </summary>
            <LeftSidebar
              country={atlasCountry}
              activePanel={activePanel}
              onChangePanel={setActivePanel}
              onCountryChange={handleCountryChange}
              layerState={layerState}
              onToggleLayer={handleToggleLayer}
            />
          </details>
          <div className="hidden lg:block">
            <LeftSidebar
              country={atlasCountry}
              activePanel={activePanel}
              onChangePanel={setActivePanel}
              onCountryChange={handleCountryChange}
              layerState={layerState}
              onToggleLayer={handleToggleLayer}
            />
          </div>
        </div>

        <div className="order-1 min-w-0 lg:order-2">
          <CinematicMap
            country={atlasCountry}
            selectedCity={selectedCity}
            experienceSlug={experienceSlug}
            layerState={layerState}
            activePanel={activePanel}
          />
        </div>

        <div className="order-3">
          <RightSidebar
            country={atlasCountry}
            activePanel={activePanel}
            onChangePanel={setActivePanel}
          />
        </div>
      </AppContentFrame>
      <AppContentFrame as="div" variant="flush" className="relative mx-auto w-full max-w-[1720px] px-4 pb-6 sm:px-6 lg:px-4">
        <CategoryRail />
      </AppContentFrame>
    </main>
  );
}
