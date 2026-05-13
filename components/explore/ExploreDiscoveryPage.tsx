"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import {
  Bell,
  Bookmark,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Heart,
  MapPin,
  Menu,
  Search,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Sun,
  WalletCards,
  X,
} from "lucide-react";
import { JourneeLogoMark } from "@/components/brand/JourneeLogo";
import {
  categoryCards,
  heroImage,
  inspirationImage,
  moodFilters,
  popularSearches,
  recommendedDestinations,
  shortlistPlaces,
  soloDestinations,
  springJapanImage,
  travelInsights,
  travelTerms,
  weatherFilters,
  type DestinationCard,
  type SoloDestination,
} from "@/lib/explore/discovery-data";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/discover" },
  { label: "Map", href: "/atlas" },
  { label: "Trips", href: "/trips" },
  { label: "Guides", href: "/guides" },
  { label: "Journal", href: "/journal" },
  { label: "Profile", href: "/profile" },
];

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[18px] border border-white/[0.11] bg-[#071111]/82 shadow-[0_24px_80px_rgba(0,0,0,.38)] backdrop-blur-xl ${className}`}
    >
      {children}
    </section>
  );
}

function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-xs font-bold uppercase tracking-[0.12em] text-[#e4a63f] ${className}`}>
      {children}
    </p>
  );
}

function TopNavigation({ onOpenFilters }: { onOpenFilters: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#030808]/82 backdrop-blur-2xl">
      <div className="mx-auto flex min-h-[72px] max-w-[1920px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-fit items-center gap-3 text-white">
          <JourneeLogoMark className="h-9 w-9 text-[#f0a928]" />
          <span className="text-2xl font-bold uppercase tracking-[0.12em]">Journee</span>
        </Link>

        <nav className="ml-6 hidden items-center gap-8 overflow-visible xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={item.label === "Explore" ? "page" : undefined}
              className={`relative inline-flex min-w-max items-center whitespace-nowrap rounded-full px-1 py-3 text-sm font-semibold transition ${
                item.label === "Explore" ? "text-[#f4ae3f]" : "text-white/78 hover:text-white"
              }`}
            >
              {item.label}
              {item.label === "Explore" ? (
                <span className="absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[#f4ae3f]" />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden min-w-[320px] max-w-xl flex-1 items-center rounded-full border border-white/[0.13] bg-white/[0.055] px-4 py-2.5 text-white/58 shadow-inner shadow-black/30 lg:flex">
          <Search className="h-4 w-4 text-white/70" />
          <span className="ml-3 truncate text-sm">Search destinations, countries, experiences...</span>
        </div>

        <button
          type="button"
          onClick={onOpenFilters}
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white lg:hidden"
          aria-label="Open filters"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="hidden h-10 w-10 items-center justify-center rounded-full text-white/82 transition hover:bg-white/[0.08] hover:text-white sm:inline-flex"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="hidden items-center gap-2 rounded-full text-white sm:flex"
          aria-label="Open profile"
        >
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
            alt=""
            className="h-11 w-11 rounded-full border-2 border-[#d9a048] object-cover"
          />
          <ChevronDown className="h-4 w-4 text-white/64" />
        </button>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/82 xl:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

function FiltersPanel({ compact = false }: { compact?: boolean }) {
  return (
    <Panel className={compact ? "p-5" : "p-5 xl:sticky xl:top-24"}>
      <Kicker>Discover Your Next Journey</Kicker>

      <div className="mt-5 rounded-[10px] border border-[#d99d3f]/80 bg-[linear-gradient(135deg,rgba(242,170,64,.16),rgba(255,255,255,.04))] p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-1 h-5 w-5 text-[#f1ac3f]" />
          <div>
            <p className="font-semibold text-[#f6b045]">Where should I go?</p>
            <p className="mt-0.5 text-xs text-white/64">Smart recommendations</p>
          </div>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between">
        <Kicker>Filters</Kicker>
        <button type="button" className="text-xs font-medium text-white/62 hover:text-white">
          Clear all
        </button>
      </div>

      <label className="mt-6 block">
        <span className="text-sm font-medium text-white/90">Search destinations</span>
        <span className="mt-3 flex items-center rounded-[9px] border border-white/[0.1] bg-white/[0.045] px-3 py-2.5 text-white/46">
          <input
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/38"
            placeholder="Search countries, cities..."
          />
          <Search className="h-4 w-4" />
        </span>
      </label>

      <div className="mt-7">
        <div className="flex items-center justify-between">
          <Kicker>Mood</Kicker>
          <ChevronDown className="h-4 w-4 text-white/44" />
        </div>
        <p className="mt-2 text-xs text-white/62">How do you feel?</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {moodFilters.map((mood) => {
            const Icon = mood.icon;
            return (
              <button
                key={mood.label}
                type="button"
                className="min-h-[72px] rounded-[8px] border border-white/[0.08] bg-white/[0.055] px-2 py-3 text-center text-xs text-white/78 transition hover:border-[#d99d3f]/70 hover:bg-[#d99d3f]/12 hover:text-white"
              >
                <Icon className="mx-auto mb-2 h-5 w-5 text-[#e4a63f]" />
                {mood.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-7">
        <div className="flex items-center justify-between">
          <Kicker>Budget <span className="tracking-normal text-white/50">(Per Day)</span></Kicker>
          <span className="text-sm text-white/80">Any Budget</span>
        </div>
        <input
          type="range"
          min="25"
          max="500"
          defaultValue="500"
          className="mt-5 h-1.5 w-full accent-[#e0a147]"
          aria-label="Budget per day"
        />
        <div className="mt-2 flex justify-between text-xs text-white/60">
          <span>$25</span>
          <span>$500+</span>
        </div>
      </div>

      <label className="mt-7 block">
        <Kicker>Best Time to Travel</Kicker>
        <span className="mt-3 flex items-center rounded-[9px] border border-white/[0.1] bg-white/[0.055] px-3 py-2.5 text-sm text-white/86">
          Anytime
          <CalendarDays className="ml-auto h-4 w-4 text-white/64" />
        </span>
      </label>

      <div className="mt-7">
        <div className="flex items-center justify-between">
          <Kicker>Weather</Kicker>
          <ChevronDown className="h-4 w-4 text-white/44" />
        </div>
        <p className="mt-2 text-xs text-white/62">Any Weather</p>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {weatherFilters.map((weather) => {
            const Icon = weather.icon;
            return (
              <button
                key={weather.label}
                type="button"
                className="grid h-9 place-items-center rounded-[7px] border border-white/[0.08] bg-white/[0.055] text-white/76 transition hover:border-[#d99d3f]/70 hover:text-[#f4ae3f]"
                aria-label={weather.label}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
        </div>
      </div>

      <SelectLike label="Visa Requirements" value="Any" />
      <SelectLike label="Safety for Solo Female Travelers" value="Any" />

      <button
        type="button"
        className="mt-8 w-full rounded-[9px] bg-[linear-gradient(135deg,#e8a94b,#c7802f)] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(216,151,61,.25)] transition hover:brightness-110"
      >
        Show 234 Results
      </button>
    </Panel>
  );
}

function SelectLike({ label, value }: { label: string; value: string }) {
  return (
    <label className="mt-7 block">
      <Kicker>{label}</Kicker>
      <span className="mt-3 flex items-center rounded-[9px] border border-white/[0.1] bg-white/[0.055] px-3 py-2.5 text-sm text-white/86">
        {value}
        <ChevronDown className="ml-auto h-4 w-4 text-white/64" />
      </span>
    </label>
  );
}

function HeroBanner() {
  return (
    <section className="relative min-h-[270px] overflow-hidden rounded-[18px] border border-white/[0.12] bg-[#101412] shadow-[0_28px_90px_rgba(0,0,0,.46)]">
      <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover object-center saturate-[1.08]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,7,.9),rgba(2,6,7,.47)_45%,rgba(2,6,7,.24)),linear-gradient(0deg,rgba(2,6,7,.82),rgba(2,6,7,.08)_58%)]" />
      <div className="relative grid min-h-[270px] gap-6 p-6 sm:p-8 2xl:grid-cols-[1fr_250px] 2xl:items-center">
        <div>
          <h1 className="max-w-[520px] text-[clamp(2rem,3vw,3.3rem)] font-extrabold leading-[1.08] text-white">
            Where will your next story begin?
          </h1>
          <p className="mt-4 max-w-md text-base leading-7 text-white/86">
            Discover places that match your mood, style, and travel dreams.
          </p>
          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-[8px] bg-[linear-gradient(135deg,#edae55,#c98534)] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_36px_rgba(216,151,61,.28)]"
          >
            Get Inspired
            <Sparkles className="h-4 w-4" />
          </button>
        </div>
        <div className="max-w-[290px] rounded-[12px] border border-white/[0.1] bg-[#080b0b]/88 p-5 shadow-[0_18px_50px_rgba(0,0,0,.42)] backdrop-blur-xl 2xl:ml-auto">
          <p className="mb-4 text-sm font-semibold text-white">Popular Searches</p>
          <div className="space-y-3">
            {popularSearches.map((search, index) => (
              <button key={search} type="button" className="flex items-center gap-3 text-left text-xs text-white/78 hover:text-[#f4ae3f]">
                {index === 0 ? <MapPin className="h-4 w-4" /> : null}
                {index === 1 ? <UserIcon /> : null}
                {index === 2 ? <Heart className="h-4 w-4" /> : null}
                {index === 3 ? <WalletCards className="h-4 w-4" /> : null}
                {index === 4 ? <Shield className="h-4 w-4" /> : null}
                {search}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function UserIcon() {
  return (
    <span className="grid h-4 w-4 place-items-center rounded-full border border-current text-[9px]">
      S
    </span>
  );
}

function DestinationGrid() {
  return (
    <section className="mt-6">
      <Kicker className="mb-4">Recommended For You</Kicker>
      <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {recommendedDestinations.map((destination) => (
          <DestinationTile key={`${destination.name}-${destination.country}`} destination={destination} />
        ))}
      </div>
    </section>
  );
}

function DestinationTile({ destination }: { destination: DestinationCard }) {
  return (
    <article className="group relative min-h-[255px] overflow-hidden rounded-[14px] border border-white/[0.11] bg-[#101412] shadow-[0_22px_65px_rgba(0,0,0,.34)]">
      <img src={destination.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.06),rgba(0,0,0,.24)_38%,rgba(0,0,0,.88))]" />
      {destination.badge ? (
        <span className="absolute left-4 top-4 rounded-full bg-[#d9953e] px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-white">
          {destination.badge}
        </span>
      ) : null}
      <button
        type="button"
        className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-black/34 text-white/78 backdrop-blur transition hover:text-[#f4ae3f]"
        aria-label={`Save ${destination.name}`}
      >
        <Heart className="h-4 w-4" />
      </button>
      <div className="relative flex min-h-[255px] flex-col justify-end p-4">
        <h3 className="text-xl font-semibold text-white">
          {destination.name}, {destination.country}
        </h3>
        <MetricRow destination={destination} />
        <p className="mt-3 text-xs text-white/64">{destination.theme}</p>
      </div>
    </article>
  );
}

function MetricRow({ destination }: { destination: DestinationCard }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.72rem] text-white/78">
      <span className="inline-flex items-center gap-1">
        <Sun className="h-3.5 w-3.5 text-[#f2ac3f]" />
        {destination.temperature}
      </span>
      <span className="inline-flex items-center gap-1">
        <WalletCards className="h-3.5 w-3.5 text-white/58" />
        {destination.dailyBudget}
      </span>
      <span className="inline-flex items-center gap-1">
        <Shield className="h-3.5 w-3.5 text-white/58" />
        {destination.safety}
      </span>
    </div>
  );
}

function SoloTravelSection() {
  return (
    <section className="mt-7">
      <div className="mb-4 flex items-center justify-between gap-4">
        <Kicker>Safe & Inspiring For Solo Female Travelers</Kicker>
        <button type="button" className="text-xs font-semibold text-[#e4a63f] hover:text-[#ffc66d]">
          View all
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {soloDestinations.map((destination) => (
          <SoloTile key={destination.name} destination={destination} />
        ))}
      </div>
    </section>
  );
}

function SoloTile({ destination }: { destination: SoloDestination }) {
  return (
    <article className="overflow-hidden rounded-[12px] border border-white/[0.11] bg-white/[0.04] shadow-[0_18px_58px_rgba(0,0,0,.32)]">
      <div className="relative h-36 overflow-hidden">
        <img src={destination.image} alt="" className="h-full w-full object-cover saturate-[1.08]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,.45),transparent)]" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{destination.name}</h3>
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.72rem] text-white/76">
          <span className="inline-flex items-center gap-1"><Shield className="h-3.5 w-3.5" />{destination.safety}</span>
          <span className="inline-flex items-center gap-1"><WalletCards className="h-3.5 w-3.5" />{destination.dailyBudget}</span>
          <span className="inline-flex items-center gap-1"><Sun className="h-3.5 w-3.5 text-[#f2ac3f]" />{destination.temperature}</span>
        </div>
        <p className="mt-3 text-xs text-white/66">{destination.description}</p>
      </div>
    </article>
  );
}

function CategorySection() {
  return (
    <section className="mt-7">
      <Kicker className="mb-4">Explore By Category</Kicker>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {categoryCards.map((category) => {
          const Icon = category.icon;
          return (
            <article key={category.title} className="group relative min-h-[136px] overflow-hidden rounded-[12px] border border-white/[0.1] bg-[#111]">
              <img src={category.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.1),rgba(0,0,0,.75))]" />
              <div className="relative flex min-h-[136px] flex-col justify-end p-4">
                <Icon className="mb-3 h-5 w-5 text-[#f3ad42]" />
                <h3 className="text-sm font-semibold text-white">{category.title}</h3>
                <p className="mt-1 text-xs text-white/62">{category.subtitle}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function RightSidebar() {
  return (
    <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
      <Panel className="p-5">
        <div className="flex items-center justify-between">
          <Kicker>Your Discovery Shortlist</Kicker>
          <button type="button" className="text-xs text-white/62 hover:text-white">View all</button>
        </div>
        <div className="mt-5 space-y-4">
          {shortlistPlaces.map((place) => (
            <div key={place.name} className="flex items-center gap-3">
              <img src={place.image} alt="" className="h-14 w-20 rounded-[7px] object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{place.name}</p>
                <p className="mt-1 text-xs text-white/58">Added to wishlist</p>
              </div>
              <Heart className="h-4 w-4 text-white/78" />
            </div>
          ))}
        </div>
        <button type="button" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[8px] border border-[#d99d3f]/80 px-4 py-3 text-sm font-semibold text-[#f3ad42] transition hover:bg-[#d99d3f]/12">
          <Bookmark className="h-4 w-4" />
          See Your Wishlist
        </button>
      </Panel>

      <Panel className="p-5">
        <Kicker>Seasonal Picks</Kicker>
        <p className="mt-2 text-xs text-white/64">Best places to visit this month</p>
        <div className="relative mt-4 overflow-hidden rounded-[12px]">
          <img src={springJapanImage} alt="" className="h-44 w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.72))]" />
          <span className="absolute right-3 top-3 rounded-full border border-[#e2a347]/70 bg-black/58 px-2 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#f2ac3f]">
            Best Time
          </span>
          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="flex items-end justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold text-white">Japan in Spring</h3>
                <p className="mt-2 text-xs leading-5 text-white/72">Cherry blossoms, mild weather & unforgettable views.</p>
              </div>
              <span className="text-xs text-white/68">Mar - May</span>
            </div>
            <button type="button" className="absolute bottom-4 right-4 grid h-9 w-12 place-items-center rounded-full border border-[#d99d3f]/60 bg-black/38 text-[#f3ad42]">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Panel>

      <Panel className="p-5">
        <Kicker>Travel Insights</Kicker>
        <div className="mt-5 space-y-4">
          {travelInsights.map((insight) => (
            <button key={insight} type="button" className="flex w-full items-center gap-3 text-left text-sm leading-5 text-white/82 hover:text-[#f4ae3f]">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[#e4a63f]">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="flex-1">{insight}</span>
              <ExternalLink className="h-3.5 w-3.5 text-[#e4a63f]" />
            </button>
          ))}
        </div>
        <button type="button" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[8px] border border-[#d99d3f]/80 px-4 py-3 text-sm font-semibold text-[#f3ad42] transition hover:bg-[#d99d3f]/12">
          Read All Insights
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </Panel>

      <Panel className="relative overflow-hidden p-5">
        <img src={inspirationImage} alt="" className="absolute bottom-0 right-0 h-28 w-36 object-cover opacity-28" />
        <div className="relative">
          <Kicker>Need Inspiration?</Kicker>
          <p className="mt-2 text-xs text-white/64">Let us pick for you</p>
          <button type="button" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[8px] bg-[linear-gradient(135deg,#e8a94b,#c7802f)] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(216,151,61,.25)]">
            Surprise Me!
            <Sparkles className="h-4 w-4" />
          </button>
          <p className="mt-5 max-w-[210px] text-xs leading-5 text-white/68">
            Get a random destination based on your preferences.
          </p>
        </div>
      </Panel>
    </aside>
  );
}

function MobileFilterChips({ onOpenFilters }: { onOpenFilters: () => void }) {
  return (
    <div className="mb-5 flex gap-2 overflow-x-auto pb-1 lg:hidden">
      <button
        type="button"
        onClick={onOpenFilters}
        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#d99d3f]/70 bg-[#d99d3f]/14 px-4 py-2 text-sm font-semibold text-[#f4ae3f]"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </button>
      {travelTerms.slice(0, 5).map((term) => (
        <button
          key={term}
          type="button"
          className="shrink-0 rounded-full border border-white/[0.1] bg-white/[0.055] px-4 py-2 text-sm text-white/76"
        >
          {term}
        </button>
      ))}
    </div>
  );
}

export function ExploreDiscoveryPage() {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#030808] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_17%_0%,rgba(219,151,56,.16),transparent_30%),radial-gradient(circle_at_86%_13%,rgba(87,141,151,.12),transparent_30%),linear-gradient(180deg,#030808,#071010_46%,#030808)]" />
      <TopNavigation onOpenFilters={() => setFiltersOpen(true)} />

      <div className="relative mx-auto grid max-w-[1920px] gap-5 px-4 py-5 sm:px-6 lg:px-8 xl:grid-cols-[280px_minmax(0,1fr)_320px] 2xl:grid-cols-[305px_minmax(0,1fr)_386px]">
        <aside className="hidden lg:block">
          <FiltersPanel />
        </aside>

        <section className="min-w-0">
          <MobileFilterChips onOpenFilters={() => setFiltersOpen(true)} />
          <HeroBanner />
          <DestinationGrid />
          <SoloTravelSection />
          <CategorySection />
        </section>

        <RightSidebar />
      </div>

      {filtersOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label="Close filters"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[min(88vw,360px)] overflow-y-auto border-r border-white/12 bg-[#061010] p-4 shadow-[24px_0_80px_rgba(0,0,0,.55)]">
            <div className="mb-4 flex items-center justify-between">
              <Kicker>Refine Search</Kicker>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.06] text-white"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <FiltersPanel compact />
          </div>
        </div>
      ) : null}
    </main>
  );
}
