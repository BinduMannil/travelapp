"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CloudRain,
  CloudSun,
  Droplets,
  Eye,
  Flower2,
  Heart,
  HelpCircle,
  Info,
  MapPin,
  Menu,
  MountainSnow,
  Search,
  ShieldAlert,
  Shirt,
  Snowflake,
  Sparkles,
  Sun,
  ThermometerSun,
  Umbrella,
  Wind,
} from "lucide-react";
import { JourneeLogoMark } from "@/components/brand/JourneeLogo";

type Unit = "C" | "F";
type Quality = "Excellent" | "Good" | "Fair" | "Poor";
type WeatherIcon = "sun" | "cloudSun" | "rain" | "sakura" | "snow";

type MonthClimate = {
  month: string;
  icon: WeatherIcon;
  highC: number;
  lowC: number;
  rainfallMm: number;
  quality: Quality;
};

type ForecastDay = {
  day: string;
  date: number;
  icon: WeatherIcon;
  highC: number;
  lowC: number;
  rainChance: number;
};

const avatar =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80";

const navItems = [
  "Home",
  "Explore",
  "Map",
  "Trips",
  "Guides",
  "Journal",
  "Profile",
  "Stays",
  "Flights",
  "Visa",
  "Budget",
  "Weather",
];

const weatherData = {
  destination: "Tokyo, Japan",
  country: "Japan",
  city: "Tokyo",
  dates: "May 20 - May 27, 2025",
  focus: "Sightseeing & Culture",
  current: {
    tempC: 22,
    condition: "Sunny",
    feelsLikeC: 23,
    humidity: "54%",
    wind: "12 km/h NE",
    precipitation: "10%",
    uvIndex: "Moderate (4)",
    visibility: "10 km",
  },
  source: {
    providers: "OpenWeather, AccuWeather",
    freshness: "Last updated: May 3, 2025",
  },
};

const monthClimate: MonthClimate[] = [
  { month: "Jan", icon: "sun", highC: 10, lowC: 2, rainfallMm: 48, quality: "Good" },
  { month: "Feb", icon: "cloudSun", highC: 11, lowC: 3, rainfallMm: 56, quality: "Good" },
  { month: "Mar", icon: "rain", highC: 15, lowC: 6, rainfallMm: 94, quality: "Excellent" },
  { month: "Apr", icon: "sakura", highC: 19, lowC: 10, rainfallMm: 122, quality: "Excellent" },
  { month: "May", icon: "sun", highC: 23, lowC: 15, rainfallMm: 137, quality: "Excellent" },
  { month: "Jun", icon: "rain", highC: 25, lowC: 18, rainfallMm: 167, quality: "Good" },
  { month: "Jul", icon: "rain", highC: 29, lowC: 22, rainfallMm: 156, quality: "Fair" },
  { month: "Aug", icon: "cloudSun", highC: 30, lowC: 23, rainfallMm: 146, quality: "Fair" },
  { month: "Sep", icon: "sun", highC: 26, lowC: 20, rainfallMm: 174, quality: "Good" },
  { month: "Oct", icon: "sun", highC: 21, lowC: 14, rainfallMm: 88, quality: "Excellent" },
  { month: "Nov", icon: "cloudSun", highC: 16, lowC: 8, rainfallMm: 59, quality: "Excellent" },
  { month: "Dec", icon: "sun", highC: 11, lowC: 3, rainfallMm: 45, quality: "Good" },
];

const forecast: ForecastDay[] = [
  { day: "Tue", date: 20, icon: "sun", highC: 23, lowC: 15, rainChance: 10 },
  { day: "Wed", date: 21, icon: "sun", highC: 24, lowC: 16, rainChance: 10 },
  { day: "Thu", date: 22, icon: "cloudSun", highC: 24, lowC: 17, rainChance: 20 },
  { day: "Fri", date: 23, icon: "rain", highC: 22, lowC: 16, rainChance: 30 },
  { day: "Sat", date: 24, icon: "rain", highC: 21, lowC: 15, rainChance: 40 },
  { day: "Sun", date: 25, icon: "sun", highC: 23, lowC: 15, rainChance: 10 },
  { day: "Mon", date: 26, icon: "sun", highC: 24, lowC: 16, rainChance: 10 },
  { day: "Tue", date: 27, icon: "cloudSun", highC: 23, lowC: 16, rainChance: 20 },
];

const bestTimes = [
  { label: "Best Overall", range: "Mar - May", season: "Spring", quality: "Excellent", icon: Flower2 },
  { label: "Great Weather", range: "Sep - Nov", season: "Autumn", quality: "Excellent", icon: Sparkles },
  { label: "Good Time", range: "Dec - Feb", season: "Winter", quality: "Good", icon: Snowflake },
  { label: "Hot & Humid", range: "Jun - Aug", season: "Summer", quality: "Fair", icon: Sun },
];

const seasonalInsights = [
  ["Spring (Mar - May)", "Pleasant temperatures and cherry blossoms in bloom.", Flower2],
  ["Summer (Jun - Aug)", "Hot and humid with occasional typhoons.", Sun],
  ["Autumn (Sep - Nov)", "Cool, dry, and perfect for sightseeing with fall foliage.", Sparkles],
  ["Winter (Dec - Feb)", "Cool and crisp with occasional snow in nearby mountains.", Snowflake],
] as const;

const packingGuide = [
  ["Light layers and breathable clothing", Shirt],
  ["Comfortable walking shoes", MountainSnow],
  ["Umbrella or light rain jacket", Umbrella],
  ["Sunglasses and sunscreen", Sun],
] as const;

const destinationRecommendations = [
  {
    city: "Sapporo, Japan",
    copy: "Cooler weather in May",
    temp: "18°C average",
    image:
      "https://images.unsplash.com/photo-1575489272413-cb506258027e?auto=format&fit=crop&w=220&q=80",
  },
  {
    city: "Okinawa, Japan",
    copy: "Beach weather in May",
    temp: "25°C average",
    image:
      "https://images.unsplash.com/photo-1567776902242-37ff4f5d8f80?auto=format&fit=crop&w=220&q=80",
  },
  {
    city: "Kyoto, Japan",
    copy: "Mild and pleasant in May",
    temp: "22°C average",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=220&q=80",
  },
];

function toFahrenheit(celsius: number) {
  return Math.round((celsius * 9) / 5 + 32);
}

function temp(value: number, unit: Unit) {
  return unit === "C" ? value : toFahrenheit(value);
}

function qualityColor(quality: Quality) {
  if (quality === "Excellent") return "bg-emerald-500/22 text-emerald-300";
  if (quality === "Good") return "bg-green-500/18 text-green-300";
  if (quality === "Fair") return "bg-amber-500/20 text-amber-200";
  return "bg-red-500/18 text-red-300";
}

function WeatherGlyph({ icon, className = "h-8 w-8" }: { icon: WeatherIcon; className?: string }) {
  if (icon === "cloudSun") return <CloudSun className={`${className} text-[#f4b234]`} />;
  if (icon === "rain") return <CloudRain className={`${className} text-sky-300`} />;
  if (icon === "sakura") return <Flower2 className={`${className} text-pink-300`} />;
  if (icon === "snow") return <Snowflake className={`${className} text-sky-200`} />;
  return <Sun className={`${className} text-[#ffb42f]`} />;
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-lg border border-white/12 bg-[#071011]/82 shadow-[0_22px_70px_rgba(0,0,0,.34),inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-2xl ${className}`}
    >
      {children}
    </div>
  );
}

function SectionTitle({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#f3b544]">
        {children}
      </h2>
      {action && (
        <button type="button" className="inline-flex items-center gap-1 text-xs font-semibold text-[#f3b544]">
          {action}
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

export function WeatherSeasonsPage() {
  const [unit, setUnit] = useState<Unit>("C");
  const feelTemp = useMemo(() => temp(weatherData.current.feelsLikeC, unit), [unit]);

  return (
    <main className="min-h-screen bg-[#030708] text-white">
      <TopNavigation />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(216,170,79,.13),transparent_31%),radial-gradient(circle_at_76%_9%,rgba(56,109,123,.16),transparent_30%),linear-gradient(180deg,#030708_0%,#071011_48%,#030708_100%)]" />
      <div className="relative mx-auto grid w-full max-w-[1920px] gap-5 px-4 pb-7 pt-20 sm:px-5 lg:px-6 xl:grid-cols-[315px_minmax(0,1fr)] 2xl:grid-cols-[315px_minmax(0,1fr)_380px]">
        <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <WeatherPlannerPanel />
          <WeatherTools />
          <CompareCard />
          <HelpCard />
        </aside>

        <section className="min-w-0 space-y-4">
          <HeroWeather unit={unit} feelTemp={feelTemp} />
          <BestTimeToVisit />
          <MonthlyClimate unit={unit} setUnit={setUnit} />
          <SevenDayForecast unit={unit} />
          <SummaryStrip />
        </section>

        <aside className="space-y-4 2xl:sticky 2xl:top-24 2xl:self-start">
          <SeasonalInsights />
          <PackingGuide />
          <WeatherDestinations />
          <WeatherDisclaimer />
        </aside>
      </div>
    </main>
  );
}

function TopNavigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/8 bg-[#020506]/88 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-[1920px] items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <JourneeLogoMark className="h-9 w-9 text-[#e0aa3e]" />
          <span className="font-sans text-2xl uppercase tracking-[0.12em] text-white">
            JOURNEE
          </span>
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-1 2xl:flex">
          {navItems.map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={`relative px-3.5 py-5 text-sm font-medium transition ${
                item === "Weather" ? "text-[#f3b544]" : "text-white/88 hover:text-white"
              }`}
            >
              {item}
              {item === "Weather" && (
                <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 rounded-full bg-[#f3b544]" />
              )}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden min-w-[260px] max-w-[520px] flex-1 items-center rounded-full border border-white/12 bg-white/[0.045] px-4 py-2.5 text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,.08)] lg:flex">
          <Search className="mr-3 h-4 w-4 shrink-0 text-white/48" />
          <span className="truncate text-sm">Search destinations or cities...</span>
          <Search className="ml-auto h-4 w-4 shrink-0 text-white/48" />
        </div>
        <button className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/88" type="button" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </button>
        <img src={avatar} alt="" className="h-10 w-10 shrink-0 rounded-full border border-[#d8aa4f]/55 object-cover" />
        <button className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-white/86 2xl:hidden" type="button" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

function WeatherPlannerPanel() {
  return (
    <Panel className="p-5">
      <SectionTitle>Check Weather & Seasons</SectionTitle>
      <div className="space-y-3">
        <PlannerField label="Destination" value="🇯🇵  Japan" chevron />
        <PlannerField label="City / Region" value={weatherData.city} chevron />
        <PlannerField label="Travel Dates (Optional)" value="May 20 - May 27, 2025" icon={CalendarDays} />
        <PlannerField label="Travel Focus" value={weatherData.focus} chevron info />
      </div>
      <button type="button" className="mt-5 w-full rounded-md bg-gradient-to-r from-[#d39533] to-[#e8ad46] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_42px_rgba(216,170,79,.24)]">
        View Weather
      </button>
    </Panel>
  );
}

function PlannerField({
  label,
  value,
  chevron = false,
  info = false,
  icon: Icon,
}: {
  label: string;
  value: string;
  chevron?: boolean;
  info?: boolean;
  icon?: typeof CalendarDays;
}) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center gap-1 text-xs text-white/58">
        {label}
        {info && <Info className="h-3 w-3 text-white/42" />}
      </span>
      <span className="flex min-h-10 items-center rounded-md border border-white/10 bg-white/[0.035] px-3 text-sm text-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,.035)]">
        {Icon && <Icon className="mr-2.5 h-4 w-4 text-white/62" />}
        <span className="min-w-0 flex-1 truncate">{value}</span>
        {chevron && <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-white/52" />}
      </span>
    </label>
  );
}

function WeatherTools() {
  const tools = [
    ["Best Time to Visit", CalendarDays],
    ["Monthly Climate Guide", ThermometerSun],
    ["Weather by City", MapPin],
    ["Seasonal Highlights", MountainSnow],
    ["Extreme Weather Alerts", ShieldAlert],
  ] as const;

  return (
    <Panel className="p-5">
      <SectionTitle>Weather Tools</SectionTitle>
      <div className="space-y-3.5">
        {tools.map(([label, Icon]) => (
          <button key={label} type="button" className="flex w-full items-center gap-3 text-left text-sm font-medium text-white/88">
            <span className="grid h-7 w-7 place-items-center rounded-md border border-[#f3b544]/35 bg-[#f3b544]/8 text-[#f3b544]">
              <Icon className="h-4 w-4" />
            </span>
            <span className="flex-1">{label}</span>
            <ChevronRight className="h-4 w-4 text-white/64" />
          </button>
        ))}
      </div>
    </Panel>
  );
}

function CompareCard() {
  return (
    <Panel className="p-5">
      <div className="flex gap-3">
        <Sparkles className="mt-1 h-5 w-5 shrink-0 text-[#f3b544]" />
        <div>
          <h3 className="font-sans text-sm font-bold uppercase tracking-[0.12em] text-[#f3b544]">Compare Destinations</h3>
          <p className="mt-2 text-sm leading-6 text-white/72">Compare weather between multiple destinations.</p>
          <button type="button" className="mt-4 w-full rounded-md border border-[#d99a32]/80 px-4 py-2.5 text-sm font-semibold text-[#f3b544]">
            Compare Now
          </button>
        </div>
      </div>
    </Panel>
  );
}

function HelpCard() {
  return (
    <Panel className="p-5">
      <div className="flex gap-3">
        <HelpCircle className="mt-1 h-8 w-8 shrink-0 text-[#f3b544]" />
        <div>
          <h3 className="font-sans text-base font-semibold text-white">Need weather help?</h3>
          <p className="mt-2 text-sm leading-6 text-white/72">Our travel experts can help you plan the perfect trip.</p>
          <button type="button" className="mt-4 w-full rounded-md border border-[#d99a32]/80 px-4 py-2.5 text-sm font-semibold text-[#f3b544]">
            Contact an Expert
          </button>
        </div>
      </div>
    </Panel>
  );
}

function HeroWeather({ unit, feelTemp }: { unit: Unit; feelTemp: number }) {
  return (
    <section className="relative min-h-[300px] overflow-hidden rounded-lg border border-white/12 bg-[#091112] shadow-[0_28px_90px_rgba(0,0,0,.42)]">
      <img
        src="https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=2400&q=90"
        alt="Mount Fuji and cherry blossoms near Tokyo"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,8,.95)_0%,rgba(5,11,16,.74)_43%,rgba(5,11,16,.24)_100%),linear-gradient(180deg,rgba(4,8,10,.1),rgba(4,8,10,.72))]" />
      <div className="relative grid gap-6 p-6 sm:p-8 xl:grid-cols-[minmax(0,1fr)_220px]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-start gap-3">
            <div>
              <h1 className="font-sans text-[clamp(2rem,3.7vw,3.1rem)] leading-[1.03] text-white">
                {weatherData.destination}
              </h1>
              <p className="mt-2 text-base font-medium text-white/90">{weatherData.dates}</p>
            </div>
            <Heart className="mt-2 h-5 w-5 text-white/86" />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Sun className="h-16 w-16 text-[#f7ad26]" strokeWidth={1.7} />
            <div className="flex items-end gap-4">
              <p className="font-sans text-[clamp(4rem,7vw,5.2rem)] font-light leading-none tracking-tight">
                {temp(weatherData.current.tempC, unit)}°{unit}
              </p>
              <div className="pb-2">
                <p className="text-xl text-white">{weatherData.current.condition}</p>
                <p className="mt-1 text-sm text-white/82">Feels like {feelTemp}°{unit}</p>
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-3 border-t border-white/13 pt-4 sm:grid-cols-2 lg:grid-cols-5">
            <WeatherMetric icon={Droplets} label="Humidity" value={weatherData.current.humidity} />
            <WeatherMetric icon={Wind} label="Wind" value={weatherData.current.wind} />
            <WeatherMetric icon={CloudRain} label="Precipitation" value={weatherData.current.precipitation} />
            <WeatherMetric icon={Sun} label="UV Index" value={weatherData.current.uvIndex} />
            <WeatherMetric icon={Eye} label="Visibility" value={weatherData.current.visibility} />
          </div>
        </div>
        <Panel className="self-start bg-[#0b1116]/88 p-5">
          <div className="flex items-start gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-emerald-400 text-emerald-400">
              <ChevronDown className="h-4 w-4 rotate-180" />
            </span>
            <h2 className="font-sans text-base font-semibold leading-5 text-white">
              Great Weather<br />for Your Trip!
            </h2>
          </div>
          <p className="mt-4 text-sm leading-6 text-white/82">Pleasant temperatures and low rainfall expected.</p>
          <button type="button" className="mt-4 w-full rounded-md border border-[#d99a32]/80 px-4 py-2 text-sm font-semibold text-[#f3b544]">
            Details
          </button>
        </Panel>
      </div>
    </section>
  );
}

function WeatherMetric({ icon: Icon, label, value }: { icon: typeof Droplets; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 border-white/13 lg:border-r lg:pr-3 last:border-r-0">
      <Icon className="h-5 w-5 shrink-0 text-white/78" />
      <div>
        <p className="text-xs text-white/68">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  );
}

function BestTimeToVisit() {
  return (
    <Panel className="p-5">
      <SectionTitle action="How we calculate this">Best Time to Visit Tokyo</SectionTitle>
      <p className="-mt-2 mb-4 text-sm text-white/68">Based on weather, crowds, and experiences.</p>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {bestTimes.map(({ label, range, season, quality, icon: Icon }) => (
          <div key={label} className="rounded-md border border-white/10 bg-white/[0.035] p-4">
            <div className="flex items-start justify-between gap-3">
              <p className={`text-xs font-semibold ${label === "Great Weather" || label === "Hot & Humid" ? "text-[#f3b544]" : "text-white/72"}`}>
                {label}
              </p>
              <span className={`rounded px-2 py-0.5 text-[11px] font-bold ${qualityColor(quality as Quality)}`}>{quality}</span>
            </div>
            <p className="mt-1 text-base font-semibold uppercase tracking-[0.08em] text-white">{range}</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-white/82">
              <Icon className="h-4 w-4 text-[#f3b544]" />
              {season}
            </p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function MonthlyClimate({ unit, setUnit }: { unit: Unit; setUnit: (unit: Unit) => void }) {
  return (
    <Panel className="p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#f3b544]">
          Monthly Climate Overview
        </h2>
        <div className="flex rounded-md border border-white/10 bg-white/[0.045] p-1">
          {(["C", "F"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setUnit(item)}
              className={`rounded px-3 py-1.5 text-xs font-bold transition ${
                unit === item ? "bg-white/12 text-white" : "text-white/60 hover:text-white"
              }`}
            >
              °{item}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 min-[1660px]:grid-cols-12">
        {monthClimate.map((month, index) => (
          <div
            key={`${month.month}-${index}`}
            className={`relative rounded-md border bg-white/[0.035] p-3 text-center ${
              month.month === "May" ? "border-[#f3b544] shadow-[0_0_0_1px_rgba(243,181,68,.35)]" : "border-white/10"
            }`}
          >
            <p className="text-xs font-semibold uppercase text-white/76">{month.month}</p>
            <WeatherGlyph icon={month.icon} className="mx-auto mt-4 h-8 w-8" />
            <p className="mt-3 text-sm font-semibold text-white">
              {temp(month.highC, unit)}° / {temp(month.lowC, unit)}°
            </p>
            <p className="mt-1 text-xs text-white/68">☔ {month.rainfallMm} mm</p>
            <p className={`mt-2 text-xs font-semibold ${month.quality === "Fair" ? "text-[#f3b544]" : month.quality === "Excellent" ? "text-green-300" : "text-lime-300"}`}>
              {month.quality}
            </p>
            {month.month === "May" && <span className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-[#f3b544]" />}
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-xs text-white/62">
        <Legend dot="bg-green-400" label="Excellent (Great weather)" />
        <Legend dot="bg-[#f3b544]" label="Good (Generally pleasant)" />
        <Legend dot="bg-orange-400" label="Fair (Some challenges)" />
        <Legend dot="bg-red-500" label="Poor (Not ideal)" />
      </div>
    </Panel>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

function SevenDayForecast({ unit }: { unit: Unit }) {
  return (
    <Panel className="p-5">
      <SectionTitle action="View hourly forecast">7-Day Forecast (May 20 - May 27)</SectionTitle>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 min-[1660px]:grid-cols-8">
        {forecast.map((day) => (
          <div key={`${day.day}-${day.date}`} className="rounded-md border border-white/10 bg-white/[0.035] p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/72">
              {day.day} {day.date}
            </p>
            <WeatherGlyph icon={day.icon} className="mx-auto mt-4 h-9 w-9" />
            <p className="mt-4 text-lg font-medium text-white">
              {temp(day.highC, unit)}° / {temp(day.lowC, unit)}°
            </p>
            <p className="mt-1 text-sm text-white/76">☔ {day.rainChance}%</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function SummaryStrip() {
  const items = [
    ["Low Rainfall Expected", "Only 10% chance of rain during your trip.", Umbrella],
    ["Comfortable Temperatures", "Daily highs around 22-24°C, perfect for exploring.", ThermometerSun],
    ["Moderate Humidity", "Humidity levels around 50-60% for a comfortable trip.", Droplets],
    ["Good Visibility", "Clear skies with excellent visibility (10+ km).", Eye],
  ] as const;

  return (
    <Panel className="grid gap-3 p-5 md:grid-cols-2 xl:grid-cols-4">
      {items.map(([title, copy, Icon]) => (
        <div key={title} className="flex gap-4 border-white/8 xl:border-r xl:pr-4 last:border-r-0">
          <Icon className="mt-1 h-8 w-8 shrink-0 text-[#f3b544]" />
          <div>
            <h3 className="font-sans text-sm font-semibold text-white">{title}</h3>
            <p className="mt-1 text-xs leading-5 text-white/62">{copy}</p>
          </div>
        </div>
      ))}
    </Panel>
  );
}

function SeasonalInsights() {
  return (
    <Panel className="p-5">
      <SectionTitle>Seasonal Insights</SectionTitle>
      <div className="space-y-4">
        {seasonalInsights.map(([title, copy, Icon]) => (
          <div key={title} className="flex items-start gap-4">
            <Icon className="mt-1 h-6 w-6 shrink-0 text-[#f3b544]" />
            <div>
              <h3 className="font-sans text-base font-semibold text-white">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-white/72">{copy}</p>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#f3b544]">
        View full seasonal guide
        <ChevronRight className="h-4 w-4" />
      </button>
    </Panel>
  );
}

function PackingGuide() {
  return (
    <Panel className="p-5">
      <SectionTitle>Packing Guide</SectionTitle>
      <div className="space-y-3.5">
        {packingGuide.map(([label, Icon]) => (
          <div key={label} className="flex items-center gap-4 text-sm text-white/86">
            <Icon className="h-5 w-5 shrink-0 text-[#f3b544]" />
            <span>{label}</span>
          </div>
        ))}
      </div>
      <button type="button" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#f3b544]">
        View full packing checklist
        <ChevronRight className="h-4 w-4" />
      </button>
    </Panel>
  );
}

function WeatherDestinations() {
  return (
    <Panel className="p-5">
      <SectionTitle>Weather-Based Destinations</SectionTitle>
      <div className="space-y-3">
        {destinationRecommendations.map((destination) => (
          <div key={destination.city} className="flex gap-3">
            <img src={destination.image} alt="" className="h-14 w-16 shrink-0 rounded-md object-cover" />
            <div className="min-w-0">
              <h3 className="truncate font-sans text-sm font-semibold text-white">{destination.city}</h3>
              <p className="text-sm leading-5 text-white/72">{destination.copy}</p>
              <p className="text-xs text-white/62">{destination.temp}</p>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#f3b544]">
        Explore more destinations
        <ChevronRight className="h-4 w-4" />
      </button>
    </Panel>
  );
}

function WeatherDisclaimer() {
  return (
    <Panel className="p-5">
      <h2 className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#f3b544]">Disclaimer</h2>
      <p className="mt-3 text-sm leading-6 text-white/72">
        Weather information is provided by trusted sources and updated regularly. Conditions can change. Please check local forecasts before your trip.
      </p>
      <p className="mt-3 text-sm text-white/66">Source: {weatherData.source.providers}</p>
      <p className="mt-1 flex items-center gap-2 text-sm text-white/66">
        {weatherData.source.freshness}
        <span className="h-2 w-2 rounded-full bg-green-400" />
      </p>
    </Panel>
  );
}
