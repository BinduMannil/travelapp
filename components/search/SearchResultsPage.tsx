"use client";

/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Bell,
  Bookmark,
  Briefcase,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  ExternalLink,
  Globe2,
  MapPin,
  Menu,
  Search,
  Share2,
  SlidersHorizontal,
  Star,
  Wallet,
  X,
} from "lucide-react";
import { JourneeLogoMark } from "@/components/brand/JourneeLogo";
import { AppContentFrame } from "@/components/layout/AppContentFrame";
import { MainNavLink } from "@/components/navigation/MainNavLink";
import { SearchSuggestions } from "@/components/search/SearchSuggestions";
import { CinematicBackground } from "@/components/visual/CinematicBackground";
import { formatDisplayTitle } from "@/lib/ui/formatDisplayTitle";

type SearchCollection =
  | "destinations"
  | "guides"
  | "trips"
  | "stays"
  | "flights"
  | "articles"
  | "visa_information";

type ResultCard = {
  title: string;
  description: string;
  image: string;
  rating: string;
  meta: string;
  label: string;
};

type SearchData = {
  destinations: Array<{
    title: string;
    description: string;
    image: string;
    tags: string[];
    rating: string;
    location: string;
    bestTime: string;
  }>;
  guides: ResultCard[];
  trips: ResultCard[];
  stays: ResultCard[];
  flights: ResultCard[];
  articles: ResultCard[];
  visa_information: ResultCard[];
};

const avatar =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80";

const navItems = [
  "Home",
  "Explore",
  "Trips",
  "Guides",
  "Journal",
  "Stays",
  "Flights",
  "Visa",
  "Budget",
  "Weather",
  "Currency",
  "Settings",
  "Support",
  "Search",
];

const searchData: SearchData = {
  destinations: [
    {
      title: "Tokyo, Japan",
      description:
        "Capital of Japan and a dynamic metropolis blending tradition and innovation.",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=88",
      tags: ["Top Destination", "Cities", "Culture", "Food", "Shopping"],
      rating: "4.8",
      location: "Japan",
      bestTime: "Mar to May, Sep to Nov",
    },
  ],
  guides: [
    {
      title: "Tokyo Travel Guide 2025",
      description: "The ultimate guide to explore Tokyo like a local.",
      image:
        "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=900&q=86",
      rating: "4.8",
      meta: "12 min read",
      label: "Guide",
    },
    {
      title: "Top 25 Things to Do in Tokyo",
      description: "Must-visit attractions and hidden gems.",
      image:
        "https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=900&q=86",
      rating: "4.7",
      meta: "10 min read",
      label: "Popular",
    },
    {
      title: "Tokyo Food Guide",
      description: "Where to eat in Tokyo: local favorites and street food.",
      image:
        "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&w=900&q=86",
      rating: "4.9",
      meta: "8 min read",
      label: "Food",
    },
    {
      title: "3-Day Tokyo Itinerary",
      description: "A perfect itinerary for first-time visitors.",
      image:
        "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=900&q=86",
      rating: "4.8",
      meta: "9 min read",
      label: "Itinerary",
    },
  ],
  trips: [
    {
      title: "5-Day Tokyo Explorer",
      description: "Temples, markets, neighborhoods, and night views.",
      image:
        "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=900&q=86",
      rating: "4.8",
      meta: "5 days",
      label: "Mid-range",
    },
    {
      title: "7-Day Family Trip to Tokyo",
      description: "Kid-friendly districts, parks, museums, and easy transit.",
      image:
        "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=900&q=86",
      rating: "4.9",
      meta: "7 days",
      label: "Family",
    },
    {
      title: "Tokyo & Kyoto Adventure",
      description: "A two-city route with shrines, food alleys, and rail days.",
      image:
        "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=900&q=86",
      rating: "4.8",
      meta: "8 days",
      label: "Adventure",
    },
    {
      title: "Luxury Tokyo Experience",
      description: "Design hotels, omakase counters, galleries, and skyline bars.",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=86",
      rating: "5.0",
      meta: "4 days",
      label: "Luxury",
    },
  ],
  stays: [
    {
      title: "Aman Tokyo",
      description: "Minimalist luxury above Otemachi with skyline views.",
      image:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=86",
      rating: "4.9",
      meta: "Luxury stay",
      label: "Hotel",
    },
  ],
  flights: [
    {
      title: "Flights to Tokyo",
      description: "Compare fares into HND and NRT with flexible dates.",
      image:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=86",
      rating: "4.6",
      meta: "From $782",
      label: "Flight",
    },
  ],
  articles: [
    {
      title: "Tokyo in Cherry Blossom Season",
      description: "Where to walk, book, and slow down during peak sakura.",
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=86",
      rating: "4.7",
      meta: "6 min read",
      label: "Journal",
    },
  ],
  visa_information: [
    {
      title: "Japan Visa Requirements",
      description: "Entry rules, eligible passports, and practical arrival notes.",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=86",
      rating: "4.8",
      meta: "Updated 2026",
      label: "Visa",
    },
  ],
};

const filters = {
  contentType: [
    ["All Results", "1.2K"],
    ["Destinations", "234"],
    ["Guides", "421"],
    ["Trips", "156"],
    ["Stays", "198"],
    ["Flights", "87"],
    ["Articles", "104"],
  ],
  category: [
    ["Top Attractions", "128"],
    ["Travel Guides", "312"],
    ["Itineraries", "156"],
    ["Food & Dining", "96"],
    ["Culture & History", "87"],
  ],
  budget: [
    ["All Budgets", ""],
    ["Budget under $100", "234"],
    ["Mid-range $100 to $250", "542"],
    ["Luxury $250+", "198"],
  ],
  travelStyle: [
    ["All Styles", ""],
    ["Solo Travel", "312"],
    ["Couple", "248"],
    ["Family", "196"],
    ["Adventure", "142"],
  ],
};

const tabs = [
  ["All", "1.2K"],
  ["Destinations", "234"],
  ["Guides", "421"],
  ["Trips", "156"],
  ["Stays", "198"],
  ["Flights", "87"],
  ["Articles", "104"],
];

const recentSearches = [
  ["Tokyo, Japan", "Just now"],
  ["Bali, Indonesia", "2 hours ago"],
  ["Budget Hotels in Paris", "Yesterday"],
  ["Things to Do in Rome", "2 days ago"],
  ["Japan Visa Requirements", "3 days ago"],
];

const suggestedSearches = [
  "Tokyo Travel Guide",
  "Top Attractions in Tokyo",
  "Tokyo Hotels",
  "Tokyo Itinerary 5 Days",
  "Best Time to Visit Tokyo",
];

const tabToCollection: Record<string, SearchCollection | "all"> = {
  All: "all",
  Destinations: "destinations",
  Guides: "guides",
  Trips: "trips",
  Stays: "stays",
  Flights: "flights",
  Articles: "articles",
};

export function SearchResultsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [query, setQuery] = useState("Tokyo, Japan");
  const [appliedQuery, setAppliedQuery] = useState("Tokyo, Japan");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>({
    "All Results": true,
    "All Budgets": true,
    "All Styles": true,
  });
  const [appliedCount, setAppliedCount] = useState(3);

  const visibleSections = useMemo(() => {
    const collection = tabToCollection[activeTab];
    if (collection === "all") {
      return {
        showDestinations: true,
        cards: [
          { title: "Guides", key: "guides" as SearchCollection, icon: Compass, count: "421" },
          { title: "Trips", key: "trips" as SearchCollection, icon: Briefcase, count: "156" },
        ],
      };
    }

    return {
      showDestinations: collection === "destinations",
      cards:
        collection === "destinations"
          ? []
          : [
              {
                title: activeTab,
                key: collection,
                icon: collection === "trips" ? Briefcase : Compass,
                count: tabs.find(([label]) => label === activeTab)?.[1] ?? "",
              },
            ],
    };
  }, [activeTab]);

  function toggleFilter(label: string) {
    setSelectedFilters((current) => ({
      ...current,
      [label]: !current[label],
    }));
  }

  function applyFilters() {
    setAppliedCount(Object.values(selectedFilters).filter(Boolean).length);
  }

  function submitSearch() {
    setAppliedQuery(query.trim() || "All travel");
  }

  return (
    <main className="min-h-screen bg-[#020607] font-sans text-white">
      <TopNavigation query={query} onQueryChange={setQuery} onSearchSubmit={submitSearch} />
      <CinematicBackground image={searchData.destinations[0].image} className="fixed opacity-45" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:64px_64px]" />

      <AppContentFrame as="div" variant="flush" className="relative mx-auto grid w-full max-w-[1920px] gap-4 px-3 pb-8 pt-[76px] sm:px-5 xl:grid-cols-[300px_minmax(0,1fr)] 2xl:grid-cols-[300px_minmax(0,1fr)_380px]">
        <aside className="hidden xl:block">
          <FiltersPanel
            selectedFilters={selectedFilters}
            appliedCount={appliedCount}
            onToggle={toggleFilter}
            onApply={applyFilters}
          />
        </aside>

        <section className="min-w-0 space-y-4">
          <MobileFilterDrawer
            selectedFilters={selectedFilters}
            appliedCount={appliedCount}
            onToggle={toggleFilter}
            onApply={applyFilters}
          />
          <SearchToolbar query={query} onQueryChange={setQuery} onSearchSubmit={submitSearch} />
          <ResultsPanel activeTab={activeTab} setActiveTab={setActiveTab} query={appliedQuery}>
            {visibleSections.showDestinations && <DestinationFeature />}
            {visibleSections.cards.map((section) => (
              <ResultSection
                key={section.key}
                title={section.title}
                count={section.count}
                icon={section.icon}
                cards={searchData[section.key] as ResultCard[]}
              />
            ))}
            <button
              type="button"
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.025] px-5 text-sm font-semibold text-white transition hover:border-[#d5a400]/60 hover:text-[#f3b544]"
            >
              View more results
              <ChevronDown className="h-4 w-4" />
            </button>
          </ResultsPanel>
        </section>

        <aside className="space-y-4 2xl:sticky 2xl:top-24 2xl:self-start">
          <RightSidebar />
        </aside>
      </AppContentFrame>
    </main>
  );
}

function TopNavigation({
  query,
  onQueryChange,
  onSearchSubmit,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  onSearchSubmit: () => void;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/8 bg-[#020506]/90 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-[1920px] items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <JourneeLogoMark className="h-9 w-9 text-[#f3b544]" />
          <span className="text-2xl font-medium uppercase tracking-[0.12em] text-white">
            JOURNEE
          </span>
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-8 overflow-visible 2xl:flex">
          {navItems.map((item) => (
            <MainNavLink
              key={item}
              label={item}
              className="relative inline-flex min-w-max items-center whitespace-nowrap rounded-full px-1 py-3 text-sm font-semibold transition"
              activeClassName="bg-white/[0.035] text-[#f3b544]"
              inactiveClassName="text-white/84 hover:text-white"
              underlineClassName="absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[#f3b544]"
            />
          ))}
        </nav>
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            onSearchSubmit();
          }}
          className="ml-auto hidden min-w-[240px] max-w-[440px] flex-1 items-center rounded-full border border-white/12 bg-white/[0.035] px-4 py-2.5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.08)] focus-within:border-[#f3b544]/70 lg:flex 2xl:max-w-[300px]"
        >
          <Search className="pointer-events-none mr-3 h-4 w-4 shrink-0 text-[#f3b544]" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                onSearchSubmit();
              }
            }}
            aria-label="Search JOURNEE"
            placeholder="Search"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/48"
          />
        </form>
        <button
          className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/88"
          type="button"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1 h-4 min-w-4 rounded-full bg-[#f3b544] px-1 text-[10px] font-bold leading-4 text-[#120d04]">
            13
          </span>
        </button>
        <img
          src={avatar}
          alt=""
          className="h-10 w-10 shrink-0 rounded-full border border-[#d8aa4f]/55 object-cover"
        />
        <button
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-white/86 2xl:hidden"
          type="button"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-white/12 bg-[#071011]/78 shadow-[0_22px_70px_rgba(0,0,0,.34),inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-2xl ${className}`}
    >
      {children}
    </div>
  );
}

function FiltersPanel({
  selectedFilters,
  appliedCount,
  onToggle,
  onApply,
}: {
  selectedFilters: Record<string, boolean>;
  appliedCount: number;
  onToggle: (label: string) => void;
  onApply: () => void;
}) {
  return (
    <Panel className="sticky top-24 flex max-h-[calc(100vh-104px)] flex-col overflow-hidden p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-[0.08em] text-[#f3b544]">
          Refine Results
        </h2>
        <button type="button" className="text-xs font-medium text-sky-300/90">
          Clear all
        </button>
      </div>
      <div className="mt-6 min-h-0 flex-1 space-y-6 overflow-y-auto pr-1">
        <FilterGroup
          title="Content Type"
          icon={Globe2}
          items={filters.contentType}
          selectedFilters={selectedFilters}
          onToggle={onToggle}
          primary
        />
        <FilterGroup
          title="Category"
          icon={ChevronDown}
          items={filters.category}
          selectedFilters={selectedFilters}
          onToggle={onToggle}
        />
        <FilterGroup
          title="Budget Range"
          icon={Wallet}
          items={filters.budget}
          selectedFilters={selectedFilters}
          onToggle={onToggle}
        />
        <FilterGroup
          title="Travel Style"
          icon={Compass}
          items={filters.travelStyle}
          selectedFilters={selectedFilters}
          onToggle={onToggle}
        />
      </div>
      <button
        type="button"
        onClick={onApply}
        className="mt-5 min-h-11 w-full rounded-md border border-[#d5a400] bg-[#d5a400]/10 px-5 text-sm font-bold text-[#f3b544] shadow-[0_12px_34px_rgba(213,164,0,.12)] transition hover:bg-[#d5a400] hover:text-[#120d04]"
      >
        Apply Filters
        <span className="ml-2 text-xs font-semibold text-current/80">({appliedCount})</span>
      </button>
    </Panel>
  );
}

function FilterGroup({
  title,
  items,
  selectedFilters,
  onToggle,
  primary = false,
}: {
  title: string;
  icon: typeof Globe2;
  items: string[][];
  selectedFilters: Record<string, boolean>;
  onToggle: (label: string) => void;
  primary?: boolean;
}) {
  return (
    <section className="border-b border-white/8 pb-6 last:border-0">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-[#f3b544]">
          {title}
        </h3>
        {!primary && <ChevronDown className="h-4 w-4 text-white/64" />}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-3">
        {items.map(([label, count]) => {
          const selected = !!selectedFilters[label];
          return (
            <button
              key={label}
              type="button"
              onClick={() => onToggle(label)}
              className={`flex min-h-12 min-w-0 flex-[1_1_10.75rem] items-center gap-3 rounded-full border px-4 py-3 text-left font-sans text-sm font-semibold leading-5 transition ${
                selected && primary
                  ? "border-[#d5a400]/65 bg-[linear-gradient(180deg,rgba(213,164,0,.24),rgba(213,164,0,.1))] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.08)]"
                  : selected
                    ? "border-[#d5a400]/55 bg-[#d5a400]/10 text-white"
                    : "border-white/10 bg-white/[0.035] text-white/82 hover:border-[#d5a400]/35 hover:bg-white/[0.055] hover:text-white"
              }`}
            >
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                  selected
                    ? "border-[#f3b544]/80 bg-[#d5a400] text-[#120d04]"
                    : "border-white/36 text-transparent"
                }`}
              >
                {selected && <Check className="h-3 w-3" />}
              </span>
              <span className="min-w-0 flex-1 whitespace-normal">{formatDisplayTitle(label)}</span>
              {count && <span className="ml-2 shrink-0 text-xs font-semibold text-white/72">{count}</span>}
            </button>
          );
        })}
      </div>
      {!primary && (
        <button type="button" className="mt-4 text-xs font-medium text-white/62">
          Show more
        </button>
      )}
    </section>
  );
}

function MobileFilterDrawer(props: {
  selectedFilters: Record<string, boolean>;
  appliedCount: number;
  onToggle: (label: string) => void;
  onApply: () => void;
}) {
  return (
    <details className="group xl:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg border border-white/12 bg-[#071011]/86 px-4 py-3 text-sm font-bold text-white backdrop-blur-2xl">
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[#f3b544]" />
          Filters
          <span className="rounded-full bg-[#d5a400]/18 px-2 py-0.5 text-xs text-[#f3b544]">
            {props.appliedCount} active
          </span>
        </span>
        <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
      </summary>
      <div className="mt-3">
        <FiltersPanel {...props} />
      </div>
    </details>
  );
}

function SearchToolbar({
  query,
  onQueryChange,
  onSearchSubmit,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  onSearchSubmit: () => void;
}) {
  return (
    <Panel className="sticky top-16 z-20 p-3 lg:static">
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          onSearchSubmit();
        }}
        className="flex flex-col gap-3 md:flex-row md:items-center"
      >
        <button
          type="button"
          className="hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white md:grid"
          aria-label="Back"
        >
          <ChevronDown className="h-5 w-5 rotate-90" />
        </button>
        <label className="flex min-h-12 min-w-0 flex-1 items-center rounded-full border border-white/12 bg-[#04090a]/82 px-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.08)]">
          <Search className="pointer-events-none mr-3 h-5 w-5 shrink-0 text-white/72" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                onSearchSubmit();
              }
            }}
            placeholder="Search destinations, guides, trips..."
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent text-base font-medium text-white outline-none placeholder:text-white/40"
            aria-label="Search query"
          />
          {query ? (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              className="ml-3 grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/72 transition hover:bg-white/[0.06] hover:text-white"
              aria-label="Clear search query"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          ) : null}
        </label>
        <div className="grid grid-cols-2 gap-3 md:flex">
          <ToolbarButton icon={Bookmark} label="Save Search" />
          <ToolbarButton icon={Share2} label="Share" />
        </div>
      </form>
    </Panel>
  );
}

function ToolbarButton({ icon: Icon, label }: { icon: typeof Bookmark; label: string }) {
  return (
    <button
      type="button"
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/12 bg-white/[0.025] px-4 text-sm font-semibold text-white transition hover:border-[#d5a400]/55 hover:text-[#f3b544]"
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function ResultsPanel({
  activeTab,
  setActiveTab,
  query,
  children,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  query: string;
  children: React.ReactNode;
}) {
  return (
    <Panel className="p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-xl font-bold leading-tight text-white">
            Search results for “{query}”
          </h1>
          <p className="mt-1 text-sm font-medium text-white/66">1,200+ results found</p>
        </div>
        <button
          type="button"
          className="inline-flex min-h-10 items-center justify-between gap-3 rounded-md border border-white/10 bg-black/16 px-4 text-sm font-semibold text-white"
        >
          Sort by: Relevance
          <ChevronDown className="h-4 w-4 text-white/64" />
        </button>
      </div>
      <div className="mt-4 flex gap-1 overflow-x-auto rounded-md border border-white/10 bg-white/[0.025] p-1">
        {tabs.map(([label, count]) => (
          <button
            key={label}
            type="button"
            onClick={() => setActiveTab(label)}
            className={`min-h-10 shrink-0 rounded px-5 text-sm font-semibold transition ${
              activeTab === label
                ? "bg-[#d5a400]/28 text-[#f3b544] shadow-[inset_0_0_0_1px_rgba(213,164,0,.36)]"
                : "text-white/84 hover:bg-white/[0.035] hover:text-white"
            }`}
          >
            {formatDisplayTitle(label)} <span className="text-current/75">({count})</span>
          </button>
        ))}
      </div>
      <div className="mt-6 space-y-6">{children}</div>
    </Panel>
  );
}

function SectionHeader({
  title,
  count,
  icon: Icon,
}: {
  title: string;
  count: string;
  icon: typeof Compass;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.08em] text-[#f3b544]">
        <Icon className="h-5 w-5" />
        {title}
      </h2>
      <button type="button" className="text-sm font-bold text-[#f3b544]">
        View all ({count})
      </button>
    </div>
  );
}

function DestinationFeature() {
  const destination = searchData.destinations[0];

  return (
    <section>
      <SectionHeader title="Destinations" count="234" icon={MapPin} />
      <article className="grid overflow-hidden rounded-lg border border-white/12 bg-[#071011]/74 shadow-[inset_0_1px_0_rgba(255,255,255,.05)] md:grid-cols-[minmax(240px,330px)_minmax(0,1fr)]">
        <img
          src={destination.image}
          alt="Tokyo tower and Mount Fuji skyline"
          className="h-56 w-full object-cover md:h-full"
        />
        <div className="relative min-w-0 p-5">
          <button
            type="button"
            aria-label="Save Tokyo"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-white/80"
          >
            <Bookmark className="h-5 w-5" />
          </button>
          <div className="pr-12">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-bold text-white">{destination.title}</h3>
              <span className="rounded-md bg-sky-500/18 px-2.5 py-1 text-xs font-bold text-sky-200">
                {formatDisplayTitle("Popular")}
              </span>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/72">
              {destination.description}
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {destination.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/12 bg-black/12 px-3 py-1.5 text-xs font-semibold text-white/82"
              >
                {formatDisplayTitle(tag)}
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-white/74">
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-[#f3b544] text-[#f3b544]" />
              {destination.rating}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-white/58" />
              {destination.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-4 w-4 text-white/58" />
              Best time: {destination.bestTime}
            </span>
          </div>
        </div>
      </article>
    </section>
  );
}

function ResultSection({
  title,
  count,
  icon,
  cards,
}: {
  title: string;
  count: string;
  icon: typeof Compass;
  cards: ResultCard[];
}) {
  return (
    <section>
      <SectionHeader title={title} count={count} icon={icon} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <ResultCardItem key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
}

function ResultCardItem({ card }: { card: ResultCard }) {
  return (
    <article className="overflow-hidden rounded-lg border border-white/12 bg-[#071011]/74 shadow-[inset_0_1px_0_rgba(255,255,255,.05)] transition hover:-translate-y-0.5 hover:border-[#d5a400]/45">
      <div className="relative aspect-[16/9]">
        <img src={card.image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.02),rgba(0,0,0,.38))]" />
        <button
          type="button"
          aria-label={`Save ${card.title}`}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-md border border-white/16 bg-black/36 text-white backdrop-blur"
        >
          <Bookmark className="h-5 w-5" />
        </button>
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-h-10 text-base font-bold leading-5 text-white">{card.title}</h3>
          <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.035] px-2 py-1 text-[11px] font-semibold text-white/64">
            {formatDisplayTitle(card.label)}
          </span>
        </div>
        <p className="mt-2 min-h-12 text-sm leading-6 text-white/68">{card.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm font-semibold text-white/72">
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-[#f3b544] text-[#f3b544]" />
            {card.rating}
          </span>
          <span>{card.meta}</span>
        </div>
      </div>
    </article>
  );
}

function RightSidebar() {
  return (
    <>
      <Panel className="p-4">
        <SidebarTitle title="Recent Searches" action="Clear all" />
        <div className="mt-4 space-y-3">
          {recentSearches.map(([label, time]) => (
            <div key={label} className="flex items-start gap-3">
              <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-white/76" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{formatDisplayTitle(label)}</p>
                <p className="text-xs font-medium text-white/56">{time}</p>
              </div>
              <X className="h-4 w-4 shrink-0 text-white/74" />
            </div>
          ))}
        </div>
      </Panel>
      <Panel className="p-4">
        <SidebarTitle title="Suggested Searches" />
        <div className="mt-4 space-y-3">
          <SearchSuggestions suggestions={suggestedSearches} />
        </div>
      </Panel>
      <Panel className="p-4">
        <SidebarTitle title="Search Insights" />
        <div className="mt-4 space-y-4">
          <Insight icon={CalendarDays} tone="rose" title="Best Time to Visit Tokyo" text="Mar-May (Spring) & Sep-Nov (Autumn)" />
          <Insight icon={Wallet} tone="green" title="Average Budget" text="$120 - $250 per day" />
          <Insight icon={Compass} tone="blue" title="Top Reason to Visit" text="Culture, Food, Shopping" />
        </div>
        <button
          type="button"
          className="mt-5 min-h-11 w-full rounded-md border border-[#d5a400] bg-[#d5a400]/10 px-5 text-sm font-bold text-[#f3b544] transition hover:bg-[#d5a400] hover:text-[#120d04]"
        >
          View Tokyo Guide
        </button>
      </Panel>
      <Panel className="p-4">
        <h2 className="text-sm font-bold uppercase tracking-[0.08em] text-[#f3b544]">
          Didn’t Find What You Need?
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/68">
          Try a different search or explore popular destinations.
        </p>
        <button
          type="button"
          className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-[#d5a400] bg-[#d5a400]/10 px-5 text-sm font-bold text-[#f3b544] transition hover:bg-[#d5a400] hover:text-[#120d04]"
        >
          <ExternalLink className="h-4 w-4" />
          Explore Destinations
        </button>
      </Panel>
    </>
  );
}

function SidebarTitle({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-sm font-bold uppercase tracking-[0.08em] text-[#f3b544]">
        {title}
      </h2>
      {action && <button className="text-xs font-medium text-sky-300/90">{action}</button>}
    </div>
  );
}

function Insight({
  icon: Icon,
  tone,
  title,
  text,
}: {
  icon: typeof CalendarDays;
  tone: "rose" | "green" | "blue";
  title: string;
  text: string;
}) {
  const tones = {
    rose: "bg-rose-500/24 text-rose-200",
    green: "bg-emerald-500/22 text-emerald-200",
    blue: "bg-sky-500/22 text-sky-200",
  };

  return (
    <div className="flex gap-3">
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${tones[tone]}`}>
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-sm font-semibold text-white">{formatDisplayTitle(title)}</p>
        <p className="mt-0.5 text-sm leading-5 text-white/68">{text}</p>
      </div>
    </div>
  );
}
