/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { MainNavLink } from "@/components/navigation/MainNavLink";
import { navigationHref } from "@/lib/routes";
import {
  Bell,
  ChevronRight,
  Compass,
  Crosshair,
  Diamond,
  Globe2,
  Home,
  Hotel,
  Map,
  Menu,
  MoonStar,
  Radio,
  Search,
  Ship,
  Sparkles,
  Star,
  Telescope,
  Train,
  Waves,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Aurora / Celestial Experiences",
  description:
    "Chase auroras, celestial phenomena, polar nights, and the world's most atmospheric JOURNEE experiences.",
};

const images = {
  hero:
    "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=2400&q=90",
  iceland:
    "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=900&q=86",
  norway:
    "https://images.unsplash.com/photo-1512273222628-4daea6e55abb?auto=format&fit=crop&w=900&q=86",
  lapland:
    "https://images.unsplash.com/photo-1488415032361-b7e238421f1b?auto=format&fit=crop&w=900&q=86",
  alaska:
    "https://images.unsplash.com/photo-1455156218388-5e61b526818b?auto=format&fit=crop&w=900&q=86",
  greenland:
    "https://images.unsplash.com/photo-1518084823714-2f59a7315a39?auto=format&fit=crop&w=900&q=86",
  yukon:
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=86",
  igloo:
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=86",
  lounge:
    "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=86",
  rail:
    "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=900&q=86",
  cruise:
    "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=900&q=86",
  photo:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=86",
  thermal:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=86",
  midnight:
    "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=700&q=84",
  silence:
    "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=700&q=84",
  reflection:
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=84",
  snowfall:
    "https://images.unsplash.com/photo-1478265409131-1f65c88f965c?auto=format&fit=crop&w=700&q=84",
  wilderness:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=84",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=180&q=80",
};

const navItems = [
  { label: "Home", icon: Home },
  { label: "Explore", icon: Compass },
  { label: "Destinations", icon: Map },
  { label: "Stays", icon: Hotel },
  { label: "Journeys", icon: Crosshair },
  { label: "Yachts", icon: Ship },
  { label: "Rail Journeys", icon: Train },
  { label: "Aurora", icon: Sparkles, active: true },
  { label: "Experiences", icon: Diamond },
];

const metrics = [
  { label: "Aurora visibility", value: "8.7", detail: "/10", note: "Rising" },
  { label: "Sky clarity", value: "9.2", detail: "/10", note: "Clear" },
  { label: "Solar activity", value: "Moderate", detail: "Kp 4", note: "Active" },
  { label: "Atmospheric score", value: "9.1", detail: "/10", note: "Exceptional" },
];

const destinations = [
  {
    name: "Iceland",
    region: "Reykjavik & South Coast",
    image: images.iceland,
    forecast: "High",
    months: "Sep - Apr",
    lodge: "9.0",
    crowd: "Low",
    clarity: "9.1",
  },
  {
    name: "Norway",
    region: "Tromso",
    image: images.norway,
    forecast: "High",
    months: "Sep - Mar",
    lodge: "8.8",
    crowd: "Low",
    clarity: "9.2",
  },
  {
    name: "Finnish Lapland",
    region: "Saariselka",
    image: images.lapland,
    forecast: "Very high",
    months: "Aug - Apr",
    lodge: "8.8",
    crowd: "Very low",
    clarity: "9.4",
  },
  {
    name: "Alaska",
    region: "Fairbanks",
    image: images.alaska,
    forecast: "High",
    months: "Aug - Apr",
    lodge: "9.1",
    crowd: "Low",
    clarity: "8.8",
  },
  {
    name: "Greenland",
    region: "Kangerlussuaq",
    image: images.greenland,
    forecast: "Very high",
    months: "Sep - Apr",
    lodge: "9.4",
    crowd: "Very low",
    clarity: "9.3",
  },
  {
    name: "Yukon",
    region: "Whitehorse",
    image: images.yukon,
    forecast: "High",
    months: "Aug - Apr",
    lodge: "8.9",
    crowd: "Low",
    clarity: "8.7",
  },
];

const experiences = [
  { title: "Glass igloos", copy: "Sleep beneath the northern lights", image: images.igloo, icon: MoonStar },
  { title: "Observatory lounges", copy: "Private sky viewing with astronomers", image: images.lounge, icon: Telescope },
  { title: "Arctic rail journeys", copy: "Scenic winter train expeditions", image: images.rail, icon: Train },
  { title: "Luxury expedition cruises", copy: "Sail into remote polar wilderness", image: images.cruise, icon: Ship },
  { title: "Wilderness photography camps", copy: "Capture the night like never before", image: images.photo, icon: Sparkles },
  { title: "Thermal retreats", copy: "Relax in geothermal luxury", image: images.thermal, icon: Waves },
];

const moods = [
  { title: "Midnight blue hours", copy: "The world in deep stillness", image: images.midnight },
  { title: "Frozen silence", copy: "Where nature holds its breath", image: images.silence },
  { title: "Star reflection lakes", copy: "Mirror the cosmos above", image: images.reflection },
  { title: "Polar snowfall", copy: "Pure, quiet, and timeless", image: images.snowfall },
  { title: "Cosmic wilderness", copy: "Feel the infinite around you", image: images.wilderness },
];

const feed = [
  {
    tag: "Aurora",
    time: "10m ago",
    text: "Aurora intensity rising across Iceland tonight. Peak expected between 10PM - 2AM.",
    image: images.iceland,
  },
  {
    tag: "Weather",
    time: "23m ago",
    text: "Clear visibility conditions in Finnish Lapland for the next 48 hours.",
    image: images.lapland,
  },
  {
    tag: "Solar",
    time: "35m ago",
    text: "Rare solar storm active this evening. Enhanced aurora activity possible at high latitudes.",
    image: images.thermal,
  },
  {
    tag: "Atmosphere",
    time: "1h ago",
    text: "Greenland sky clarity reaching exceptional levels tonight.",
    image: images.greenland,
  },
  {
    tag: "Rare",
    time: "2h ago",
    text: "Unusual red aurora reported in parts of Canada. Rare geomagnetic event.",
    image: images.yukon,
  },
];

function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="text-[0.86rem] font-bold uppercase text-white sm:text-[0.95rem]">
        {title}
      </h2>
      {action ? (
        <button className="group hidden items-center gap-2 text-[0.7rem] font-medium text-[#d9aa55] transition hover:text-white sm:flex">
          {action}
          <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
        </button>
      ) : null}
    </div>
  );
}

function GlassPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[8px] border border-white/10 bg-[#03080b]/72 p-4 shadow-[0_22px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl ${className}`}
    >
      {children}
    </section>
  );
}

export default function AuroraPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020406] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(43,143,126,0.28),transparent_34%),radial-gradient(circle_at_28%_18%,rgba(191,143,63,0.12),transparent_22%),linear-gradient(180deg,#020406_0%,#061014_48%,#020406_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-45 [background-image:radial-gradient(rgba(255,255,255,0.42)_1px,transparent_1px)] [background-size:42px_42px]" />

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[11.5rem] border-r border-white/10 bg-black/60 px-4 py-6 backdrop-blur-2xl xl:block">
        <div className="mb-9">
          <div className="text-[1.35rem] font-semibold tracking-[0.22em] text-[#e0b05a]">
            JOURNEE
          </div>
          <div className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-white/70">
            Celestial Experiences
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <MainNavLink
                key={item.label}
                className={`flex h-10 items-center gap-3 rounded-[8px] px-3 text-[0.78rem] font-medium transition ${
                  item.active
                    ? "border border-[#d7a84f]/20 bg-[#d7a84f]/12 text-[#f0c66e]"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
                label={item.label}
                href={navigationHref(item.label)}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </MainNavLink>
            );
          })}
        </nav>

        <div className="mt-8 border-t border-white/10 pt-5">
          {["Alerts", "Profile", "Settings"].map((item, index) => (
            <div
              key={item}
              className="flex h-10 items-center justify-between rounded-[8px] px-3 text-[0.78rem] font-medium text-white/76"
            >
              <span>{item}</span>
              {index === 0 ? (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#e2b35d] px-1.5 text-[0.62rem] font-bold text-black">
                  3
                </span>
              ) : null}
            </div>
          ))}
        </div>

        <div className="absolute bottom-5 left-4 right-4 [@media(max-height:850px)]:hidden">
          <div className="mb-5 flex items-center gap-3">
            <img
              src={images.avatar}
              alt=""
              className="h-11 w-11 rounded-full border border-white/18 object-cover"
            />
            <div>
              <div className="text-[0.78rem] font-bold uppercase text-white">
                Alexander
              </div>
              <div className="text-[0.68rem] font-normal text-white/58">
                Platinum Member
              </div>
            </div>
          </div>
          <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-4 text-center">
            <MoonStar className="mx-auto mb-3 h-6 w-6 text-[#e2b35d]" />
            <div className="text-[0.68rem] font-bold uppercase text-white">
              Celestial Concierge
            </div>
            <div className="mt-2 text-[0.68rem] text-white/62">Available 24/7</div>
            <button className="mt-4 w-full rounded-[6px] border border-[#d9aa55]/50 px-3 py-2 text-[0.62rem] font-bold uppercase text-[#d9aa55]">
              Contact Concierge
            </button>
          </div>
        </div>
      </aside>

      <div className="relative z-10 xl:pl-[11.5rem]">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-black/40 px-4 py-3 backdrop-blur-2xl sm:px-6 xl:border-b-0 xl:bg-transparent xl:px-8 xl:py-5">
          <div className="flex items-center gap-3">
            <div className="mr-2 xl:hidden">
              <div className="text-[1rem] font-semibold tracking-[0.22em] text-[#e0b05a]">
                JOURNEE
              </div>
            </div>
            <div className="relative max-w-[27rem] flex-1 xl:w-[27rem] xl:flex-none">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/68" />
              <input
                aria-label="Search celestial experiences"
                placeholder="Search auroras, celestial events, destinations..."
                className="h-11 w-full rounded-[8px] border border-white/15 bg-black/40 pl-11 pr-4 text-[0.78rem] font-normal text-white outline-none placeholder:text-white/45 focus:border-[#d9aa55]/60 [color-scheme:dark]"
              />
            </div>
            <div className="ml-auto flex items-center gap-2 text-white">
              <button aria-label="Global routes" className="hidden h-10 w-10 place-items-center rounded-full text-white/86 sm:grid">
                <Globe2 className="h-5 w-5" />
              </button>
              <button aria-label="Saved" className="grid h-10 w-10 place-items-center rounded-full text-[#e2b35d]">
                <Star className="h-5 w-5 fill-current" />
              </button>
              <button aria-label="Alerts" className="relative grid h-10 w-10 place-items-center rounded-full text-white/86">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-[#e2b35d] px-1 text-[0.56rem] font-bold text-black">
                  3
                </span>
              </button>
              <button aria-label="Menu" className="grid h-10 w-10 place-items-center rounded-full text-white">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="px-4 pb-10 sm:px-6 xl:px-8">
          <section className="relative min-h-[33rem] overflow-hidden rounded-b-[8px] border border-t-0 border-white/10 bg-black xl:-mt-[4.7rem] xl:min-h-[41rem]">
            <img
              src={images.hero}
              alt="Luxury glass cabin beneath northern lights in Iceland"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_10%,rgba(88,255,187,0.23),transparent_28%),linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.58)_38%,rgba(0,0,0,0.24)_68%,rgba(0,0,0,0.78)_100%),linear-gradient(0deg,rgba(2,4,6,0.96)_0%,transparent_34%)]" />
            <div className="relative z-10 grid min-h-[33rem] gap-8 px-5 pb-8 pt-16 sm:px-8 xl:min-h-[41rem] xl:grid-cols-[1fr_21rem] xl:items-center xl:px-14 xl:pt-24">
              <div className="max-w-[44rem]">
                <h1 className="text-[clamp(3.4rem,9vw,6.8rem)] font-extrabold uppercase leading-[0.92] text-white">
                  Chase the
                  <span className="block bg-gradient-to-r from-[#f2c979] via-[#d9a852] to-white bg-clip-text text-transparent">
                    Sky
                  </span>
                </h1>
                <p className="mt-5 max-w-[32rem] text-[clamp(1rem,1.7vw,1.3rem)] font-normal leading-8 text-white/86">
                  Discover auroras, celestial phenomena, polar nights, and the
                  world&apos;s most atmospheric journeys.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button className="group inline-flex h-12 items-center justify-center gap-4 rounded-[7px] bg-[#d9aa55] px-6 text-[0.74rem] font-bold uppercase text-black shadow-[0_14px_44px_rgba(217,170,85,0.23)] transition hover:bg-[#f0c66e]">
                    Explore Celestial Routes
                    <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </button>
                  <button className="inline-flex h-12 items-center justify-center gap-3 rounded-[7px] border border-[#d9aa55]/45 bg-black/40 px-6 text-[0.74rem] font-bold uppercase text-white backdrop-blur-xl transition hover:border-[#d9aa55]">
                    Build Aurora Journey
                    <Sparkles className="h-4 w-4 text-[#d9aa55]" />
                  </button>
                </div>
              </div>

              <div className="grid gap-3 rounded-[8px] border border-white/10 bg-black/50 p-4 backdrop-blur-2xl">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="grid grid-cols-[2.8rem_1fr_auto] items-center gap-3 border-b border-white/8 pb-3 last:border-0 last:pb-0"
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-full border border-[#d9aa55]/38 text-[#d9aa55]">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[0.65rem] font-bold uppercase text-white/70">
                        {metric.label}
                      </div>
                      <div className="mt-1 text-[1.35rem] font-normal leading-none text-white">
                        {metric.value}
                        <span className="ml-1 text-[0.72rem] text-white/65">
                          {metric.detail}
                        </span>
                      </div>
                    </div>
                    <div className="text-[0.62rem] font-medium text-white/55">
                      {metric.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <GlassPanel className="mt-4">
            <SectionHeader title="Aurora Destination Discovery" action="View all destinations" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
              {destinations.map((destination) => (
                <article
                  key={destination.name}
                  className="overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.035]"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={`${destination.name} aurora night landscape`}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#03080b] via-transparent to-transparent" />
                  </div>
                  <div className="p-3">
                    <h3 className="text-[0.82rem] font-semibold uppercase text-white">
                      {destination.name}
                    </h3>
                    <p className="mt-0.5 text-[0.66rem] font-normal text-white/58">
                      {destination.region}
                    </p>
                    <div className="mt-4 space-y-2 text-[0.63rem]">
                      {[
                        ["Aurora forecast", destination.forecast],
                        ["Best months", destination.months],
                        ["Lodge index", `${destination.lodge} /10`],
                        ["Crowd level", destination.crowd],
                        ["Sky clarity", `${destination.clarity} /10`],
                      ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between gap-3">
                          <span className="font-medium uppercase text-white/46">{label}</span>
                          <span className="font-semibold text-[#e0b05a]">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </GlassPanel>

          <div className="mt-4 grid gap-4 2xl:grid-cols-[1.05fr_1fr]">
            <GlassPanel>
              <SectionHeader title="Live Aurora Map" action="Real-time data" />
              <div className="relative min-h-[22rem] overflow-hidden rounded-[8px] border border-white/10 bg-[#021014]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_46%,rgba(116,255,125,0.34),transparent_8%),radial-gradient(circle_at_62%_44%,rgba(204,221,90,0.28),transparent_12%),radial-gradient(circle_at_35%_58%,rgba(61,219,135,0.25),transparent_13%),linear-gradient(135deg,rgba(10,33,45,0.92),rgba(1,7,10,0.98))]" />
                <div className="absolute left-[-12%] top-[28%] h-24 w-[124%] rotate-[-7deg] rounded-full bg-[#78ff72]/28 blur-2xl" />
                <div className="absolute left-[4%] top-[48%] h-20 w-[94%] rotate-[7deg] rounded-full bg-[#d9f05b]/18 blur-2xl" />
                <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:52px_52px]" />
                {["Iceland", "Norway", "Lapland", "Greenland", "Yukon"].map((place, index) => (
                  <div
                    key={place}
                    className="absolute"
                    style={{
                      left: `${18 + index * 15}%`,
                      top: `${34 + (index % 2) * 24}%`,
                    }}
                  >
                    <span className="block h-3 w-3 rounded-full border border-black bg-[#e6c15e] shadow-[0_0_22px_rgba(230,193,94,0.95)]" />
                    <span className="mt-2 block text-[0.62rem] font-medium uppercase text-white/78">
                      {place}
                    </span>
                  </div>
                ))}
                <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div className="min-w-[12rem]">
                    <div className="mb-2 text-[0.68rem] font-medium text-white/75">
                      Aurora Intensity
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-[#5ce173] via-[#d9e65d] to-[#e2b35d]" />
                    </div>
                    <div className="mt-2 flex justify-between text-[0.58rem] font-medium text-white/58">
                      <span>Low</span>
                      <span>Extreme</span>
                    </div>
                  </div>
                  <div className="grid gap-1 text-[0.68rem] font-normal text-white/72">
                    <span>Good Visibility</span>
                    <span>Active Aurora</span>
                    <span>Cloud Cover</span>
                  </div>
                  <button className="h-10 rounded-[7px] border border-[#d9aa55]/45 px-5 text-[0.7rem] font-bold uppercase text-[#d9aa55]">
                    View Full Map
                  </button>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel>
              <SectionHeader title="Celestial Experience Layer" action="View all experiences" />
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {experiences.map((experience) => {
                  const Icon = experience.icon;
                  return (
                    <article
                      key={experience.title}
                      className="overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.035]"
                    >
                      <div className="relative h-28">
                        <img
                          src={experience.image}
                          alt={experience.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#03080b] to-transparent" />
                        <Icon className="absolute bottom-3 right-3 h-5 w-5 text-[#e0b05a]" />
                      </div>
                      <div className="p-3">
                        <h3 className="text-[0.72rem] font-semibold uppercase text-white">
                          {experience.title}
                        </h3>
                        <p className="mt-1 text-[0.68rem] font-normal leading-5 text-white/64">
                          {experience.copy}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </GlassPanel>
          </div>

          <div className="mt-4 grid gap-4 2xl:grid-cols-[1.1fr_0.9fr]">
            <GlassPanel>
              <SectionHeader title="Night Atmosphere Engine" action="Explore all moods" />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {moods.map((mood) => (
                  <article
                    key={mood.title}
                    className="group min-h-[16rem] overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.035]"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={mood.image}
                        alt={mood.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#03080b] to-transparent" />
                    </div>
                    <div className="p-3">
                      <h3 className="text-[0.76rem] font-semibold uppercase leading-5 text-white">
                        {mood.title}
                      </h3>
                      <p className="mt-3 text-[0.68rem] font-normal leading-5 text-white/58">
                        {mood.copy}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="mt-4 flex justify-center gap-2">
                {[0, 1, 2, 3, 4].map((dot) => (
                  <span
                    key={dot}
                    className={`h-1.5 w-1.5 rounded-full ${
                      dot === 0 ? "bg-[#e0b05a]" : "bg-white/24"
                    }`}
                  />
                ))}
              </div>
            </GlassPanel>

            <GlassPanel>
              <SectionHeader title="Real-Time Sky Feed" action="View all updates" />
              <div className="grid gap-3">
                {feed.map((item) => (
                  <article
                    key={`${item.tag}-${item.time}`}
                    className="grid grid-cols-[2.6rem_1fr_6.5rem] gap-3 rounded-[8px] border border-white/8 bg-white/[0.035] p-3 max-sm:grid-cols-[2.6rem_1fr]"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-[8px] bg-[#d9aa55]/14 text-[#e0b05a]">
                      <Radio className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="rounded-[4px] bg-[#d9aa55]/18 px-2 py-1 text-[0.55rem] font-bold uppercase text-[#e0b05a]">
                          {item.tag}
                        </span>
                        <span className="text-[0.6rem] font-medium text-white/42">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-[0.68rem] font-normal leading-5 text-white/74">
                        {item.text}
                      </p>
                    </div>
                    <img
                      src={item.image}
                      alt=""
                      className="h-16 w-full rounded-[6px] object-cover max-sm:col-span-2"
                    />
                  </article>
                ))}
              </div>
              <button className="mt-4 h-11 w-full rounded-[7px] border border-[#d9aa55]/35 text-[0.7rem] font-bold uppercase text-[#e0b05a]">
                View All Updates
              </button>
            </GlassPanel>
          </div>

          <GlassPanel className="mt-4">
            <SectionHeader title="Curated Celestial Journeys" action="View all journeys" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {destinations.slice(0, 5).map((destination, index) => (
                <article
                  key={`journey-${destination.name}`}
                  className="overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.035]"
                >
                  <img
                    src={destination.image}
                    alt=""
                    className="h-28 w-full object-cover"
                  />
                  <div className="p-3">
                    <h3 className="text-[0.68rem] font-semibold uppercase text-white">
                      {destination.name} Aurora {index === 0 ? "Escape" : "Chase"}
                    </h3>
                    <p className="mt-2 text-[0.62rem] font-normal leading-5 text-white/58">
                      {4 + index} Days / {3 + index} Nights
                    </p>
                    <p className="mt-3 text-[0.66rem] font-medium text-[#e0b05a]">
                      From EUR {2800 + index * 430}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>
    </main>
  );
}
