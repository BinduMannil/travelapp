/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Bookmark,
  Bus,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Compass,
  HeartPulse,
  Leaf,
  Luggage,
  Map,
  Menu,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Utensils,
  WalletCards,
} from "lucide-react";
import { JourneeBrand } from "@/components/brand/JourneeLogo";
import { formatDisplayTitle } from "@/lib/copy/formatting";
import { MainNavLink } from "@/components/navigation/MainNavLink";

type GuideCategory = {
  title: string;
  copy: string;
  image: string;
};

type FeaturedGuide = {
  category: string;
  title: string;
  description: string;
  readTime: string;
  score: string;
  image: string;
};

const images = {
  avatar:
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=200&q=80",
  hero:
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2400&q=88",
  safety:
    "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=84",
  etiquette:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=84",
  visa:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=84",
  transport:
    "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=900&q=84",
  packing:
    "https://images.unsplash.com/photo-1553531889-e6cf4d692b1b?auto=format&fit=crop&w=900&q=84",
  solo:
    "https://images.unsplash.com/photo-1512692723619-8b3e68365c9c?auto=format&fit=crop&w=1100&q=86",
  matcha:
    "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1100&q=86",
  fujiTrain:
    "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=1100&q=86",
  kyotoStreet:
    "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=1100&q=86",
  kyoto:
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=700&q=84",
  tokyo:
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=700&q=84",
  osaka:
    "https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=700&q=84",
  hokkaido:
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=84",
  okinawa:
    "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=700&q=84",
  nara:
    "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=700&q=84",
  bamboo:
    "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=900&q=84",
  blossom:
    "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=500&q=84",
};

const navItems = ["Home", "Explore", "Trips", "Guides", "Journal"];

const guideMenu = [
  { label: "All Guides", icon: Map },
  { label: "Safety & Solo Travel", icon: ShieldCheck },
  { label: "Travel Etiquette", icon: Sparkles },
  { label: "Visa & Entry", icon: WalletCards },
  { label: "Transport Guides", icon: Bus },
  { label: "Packing Guides", icon: Luggage },
  { label: "Budget & Money", icon: CircleDollarSign },
  { label: "Health & Wellness", icon: HeartPulse },
  { label: "Sustainable Travel", icon: Leaf },
  { label: "Seasonal Guides", icon: Compass },
  { label: "Digital Nomad", icon: Plane },
  { label: "Food & Culture", icon: Utensils },
];

const popularSearches = [
  "Kyoto Safety",
  "Japan Etiquette",
  "Solo Female Travel",
  "JR Pass Guide",
  "What to Pack Japan",
  "Visa Japan",
];

const categories: GuideCategory[] = [
  {
    title: "Safety & Solo Travel",
    copy: "Stay safe and confident anywhere in the world.",
    image: images.safety,
  },
  {
    title: "Travel Etiquette",
    copy: "Respect local cultures and travel mindfully.",
    image: images.etiquette,
  },
  {
    title: "Visa & Entry Requirements",
    copy: "Up-to-date visa info for stress-free travel.",
    image: images.visa,
  },
  {
    title: "Transport Guides",
    copy: "Navigate cities and regions like a local.",
    image: images.transport,
  },
  {
    title: "Packing Guides",
    copy: "Smart packing tips for every journey.",
    image: images.packing,
  },
];

const featuredGuides: FeaturedGuide[] = [
  {
    category: "Solo Travel",
    title: "Solo Female Travel in Japan: Safety, Tips & Confidence",
    description:
      "Everything you need to know for a safe, empowering and unforgettable trip.",
    readTime: "12 min read",
    score: "4.8",
    image: images.solo,
  },
  {
    category: "Etiquette",
    title: "Japan Etiquette Guide: Do's & Don'ts",
    description:
      "Essential manners and cultural tips to show respect and travel mindfully.",
    readTime: "10 min read",
    score: "4.9",
    image: images.matcha,
  },
  {
    category: "Transport",
    title: "Japan Transport Guide: Trains, Buses & More",
    description:
      "Your complete guide to getting around Japan easily and efficiently.",
    readTime: "15 min read",
    score: "4.7",
    image: images.fujiTrain,
  },
  {
    category: "Budget",
    title: "How Much Does Japan Really Cost?",
    description:
      "A detailed breakdown of daily costs, money-saving tips, and budgets.",
    readTime: "11 min read",
    score: "4.6",
    image: images.kyotoStreet,
  },
];

const destinations = [
  { title: "Kyoto", count: "28 Guides", image: images.kyoto },
  { title: "Tokyo", count: "32 Guides", image: images.tokyo },
  { title: "Osaka", count: "26 Guides", image: images.osaka },
  { title: "Hokkaido", count: "18 Guides", image: images.hokkaido },
  { title: "Okinawa", count: "15 Guides", image: images.okinawa },
  { title: "Nara", count: "12 Guides", image: images.nara },
];

const quickTools = [
  {
    title: "Safety Index by Country",
    copy: "Compare safety around the world",
    icon: ShieldCheck,
  },
  {
    title: "Visa Checker",
    copy: "Check visa requirements",
    icon: WalletCards,
  },
  {
    title: "Travel Insurance Guide",
    copy: "Stay protected on your journey",
    icon: ShieldCheck,
  },
  {
    title: "Currency Converter",
    copy: "Live exchange rates",
    icon: CircleDollarSign,
  },
];

const trendingTopics = [
  ["First Time in Japan", "Essential tips for your first trip"],
  ["What to Eat in Japan", "A food lover's guide"],
  ["Japan in Winter", "Best places & what to pack"],
  ["Onsen Guide", "How to enjoy Japanese hot springs"],
  ["JR Pass vs Individual Tickets", "Which is better?"],
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#e1a93d]">
      {children}
    </h2>
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
      className={`rounded-lg border border-white/10 bg-[#091211]/82 shadow-[0_22px_70px_rgba(0,0,0,.28)] backdrop-blur-xl ${className}`}
    >
      {children}
    </section>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#040908]/88 backdrop-blur-2xl">
      <div className="mx-auto flex h-[74px] max-w-[1840px] items-center gap-5 px-4 sm:px-6 2xl:px-8">
        <Link href="/" aria-label="JOURNEE home" className="shrink-0">
          <JourneeBrand
            direction="atlas-aperture"
            className="[&>span:first-child]:h-9 [&>span:first-child]:w-9 [&>span:first-child]:rounded-none [&>span:first-child]:border-0 [&>span:first-child]:bg-transparent [&>span:first-child]:shadow-none [&>span:first-child_svg]:h-8 [&>span:first-child_svg]:w-8 [&>span:last-child]:text-[1.4rem] [&>span:last-child]:tracking-[0.12em]"
          />
        </Link>

        <nav className="hidden items-center gap-8 overflow-visible text-sm font-medium text-white/82 lg:flex">
          {navItems.map((item) => (
            <MainNavLink
              key={item}
              label={item}
              className="relative inline-flex min-w-max items-center whitespace-nowrap px-1 py-3 transition hover:text-white"
              activeClassName="text-[#f0b84b]"
              underlineClassName="absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[#d99d35]"
            />
          ))}
        </nav>

        <div className="ml-auto flex min-w-0 items-center gap-3">
          <label className="hidden h-11 w-full max-w-[560px] min-w-[280px] items-center gap-3 rounded-full border border-white/14 bg-white/[0.045] px-5 text-white/66 xl:flex">
            <span className="sr-only">Search guides</span>
            <input
              type="search"
              placeholder="Search guides, topics, or destinations..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/48"
            />
            <Search className="h-5 w-5 text-white/82" strokeWidth={1.7} />
          </label>
          <button
            type="button"
            aria-label="Open guide filters"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.045] text-white lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="hidden h-10 w-10 place-items-center rounded-full text-white/90 sm:grid"
          >
            <Bell className="h-5 w-5" strokeWidth={1.7} />
          </button>
          <img
            src={images.avatar}
            alt=""
            className="h-10 w-10 rounded-full border border-[#d8aa4f]/35 object-cover"
          />
        </div>
      </div>
    </header>
  );
}

function LeftSidebar() {
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-24 space-y-6">
        <div>
          <SectionTitle>Browse Guides</SectionTitle>
          <nav className="mt-4 space-y-1">
            {guideMenu.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href="#featured-guides"
                  className={`flex h-11 items-center gap-3 rounded-md px-4 text-sm transition ${
                    index === 0
                      ? "border-l-2 border-[#e1a93d] bg-white/8 text-[#f8d68a]"
                      : "text-white/82 hover:bg-white/[0.055] hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>

        <GlassPanel className="p-5">
          <div className="flex items-start gap-4">
            <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#e1a93d]" />
            <div>
              <h3 className="font-sans text-sm font-semibold text-[#f2c86b]">
                Travel Confidently
              </h3>
              <p className="mt-3 text-xs leading-5 text-white/66">
                Expert guidance and real local insights to help you travel
                smarter and safer.
              </p>
              <a
                href="#tools"
                className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#e6ad45]"
              >
                Learn More <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-5">
          <h3 className="font-sans text-sm font-semibold text-white/88">
            Popular Searches
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {popularSearches.map((search) => (
              <a
                key={search}
                href="#featured-guides"
                className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-white/70 transition hover:border-[#d8aa4f]/40 hover:text-white"
              >
                {formatDisplayTitle(search)}
              </a>
            ))}
          </div>
        </GlassPanel>
      </div>
    </aside>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[315px] overflow-hidden rounded-lg border border-white/12 bg-black">
      <img
        src={images.hero}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,6,.94),rgba(3,7,6,.66)_42%,rgba(3,7,6,.22)),linear-gradient(180deg,rgba(3,7,6,.06),rgba(3,7,6,.86))]" />
      <div className="relative flex min-h-[315px] max-w-xl flex-col justify-center p-6 sm:p-10">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[#e3aa42]">
          Travel Intelligence
        </p>
        <h1 className="mt-4 font-sans text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl">
          Travel deeper.
          <br />
          Travel smarter.
        </h1>
        <p className="mt-5 max-w-md text-base leading-7 text-white/86">
          Curated guides, expert tips, and local knowledge to help you travel
          with confidence.
        </p>
        <a
          href="#featured-guides"
          className="mt-6 inline-flex h-11 w-fit items-center gap-4 rounded-md bg-gradient-to-r from-[#d8a044] to-[#f0bf66] px-6 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(216,160,68,.24)]"
        >
          Explore All Guides <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function CategoryCard({ category }: { category: GuideCategory }) {
  return (
    <article className="group relative min-h-[228px] overflow-hidden rounded-lg border border-white/12 bg-[#0a1110]">
      <img
        src={category.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-72 transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.08),rgba(3,8,7,.88)),linear-gradient(90deg,rgba(0,0,0,.58),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_bottom_left,rgba(216,170,79,.14),transparent_60%)]" />
      <div className="relative flex h-full min-h-[228px] flex-col justify-end p-5">
        <h3 className="max-w-[15rem] font-sans text-2xl font-bold leading-8 text-white drop-shadow-[0_3px_14px_rgba(0,0,0,.86)]">
          {category.title}
        </h3>
        <p className="mt-3 max-w-[17rem] text-sm font-medium leading-6 text-white/78 drop-shadow-[0_2px_10px_rgba(0,0,0,.78)]">
          {category.copy}
        </p>
        <a
          href="#featured-guides"
          className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#d8aa4f]/28 bg-black/24 px-3 py-1.5 text-xs font-semibold text-[#e3aa42] backdrop-blur transition group-hover:border-[#d8aa4f]/54"
        >
          Explore <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}

function FeaturedGuideCard({ guide }: { guide: FeaturedGuide }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-[#d8aa4f]/22 bg-[#091211]/92">
      <div className="relative h-44 overflow-hidden">
        <img
          src={guide.image}
          alt=""
          className="h-full w-full object-cover opacity-88 transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050908] via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-md border border-[#d8aa4f]/36 bg-black/52 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#e3aa42] backdrop-blur">
          {guide.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-sans text-[1.35rem] font-bold leading-8 text-white">
          {guide.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-white/68">
          {guide.description}
        </p>
        <div className="mt-5 flex items-center justify-between text-xs text-white/66">
          <span className="inline-flex items-center gap-2">
            <Clock3 className="h-4 w-4" strokeWidth={1.7} />
            {guide.readTime}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-[#f0b84b]">
            <Star className="h-4 w-4 fill-current" strokeWidth={1.7} />
            {guide.score}
          </span>
        </div>
      </div>
    </article>
  );
}

function DestinationCard({
  destination,
}: {
  destination: (typeof destinations)[number];
}) {
  return (
    <article className="group relative h-36 overflow-hidden rounded-lg border border-white/12 bg-[#081110]">
      <img
        src={destination.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-82 transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/28 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="font-sans text-base font-semibold text-white">
          {destination.title}
        </h3>
        <p className="mt-1 text-xs text-white/70">{destination.count}</p>
      </div>
    </article>
  );
}

function RightSidebar() {
  return (
    <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start" id="tools">
      <GlassPanel className="p-5">
        <SectionTitle>Quick Tools</SectionTitle>
        <div className="mt-4 divide-y divide-white/8">
          {quickTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <a
                key={tool.title}
                href="#tools"
                className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#d8aa4f]/38 text-[#e3aa42]">
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-white">
                    {tool.title}
                  </span>
                  <span className="mt-1 block text-xs text-white/58">
                    {tool.copy}
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 text-white/70" />
              </a>
            );
          })}
        </div>
      </GlassPanel>

      <GlassPanel className="p-5">
        <SectionTitle>Featured Guide</SectionTitle>
        <div className="mt-4 overflow-hidden rounded-md border border-white/10">
          <img
            src={images.bamboo}
            alt=""
            className="h-40 w-full object-cover opacity-90"
          />
        </div>
        <h3 className="mt-4 font-sans text-[1.35rem] font-bold leading-7 text-white">
          Kyoto Hidden Gems Guide
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/70">
          Go beyond the tourist spots and discover the real Kyoto with local
          secrets.
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-white/64">
          <span className="inline-flex items-center gap-2">
            <Clock3 className="h-4 w-4" /> 14 min read
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-[#f0b84b]">
            <Star className="h-4 w-4 fill-current" /> 4.9
          </span>
          <Bookmark className="h-4 w-4 text-[#f0b84b]" />
        </div>
      </GlassPanel>

      <GlassPanel className="p-5">
        <SectionTitle>Seasonal Spotlight</SectionTitle>
        <div className="mt-4 flex gap-4">
          <img
            src={images.blossom}
            alt=""
            className="h-28 w-28 shrink-0 rounded-md object-cover"
          />
          <div>
            <h3 className="font-sans text-sm font-semibold leading-5 text-white">
              Cherry Blossom Season in Japan 2026
            </h3>
            <p className="mt-2 text-xs leading-5 text-white/64">
              Best places, dates & tips for sakura season.
            </p>
            <a
              href="#featured-guides"
              className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#e3aa42]"
            >
              View Guide <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="p-5">
        <SectionTitle>Trending Topics</SectionTitle>
        <div className="mt-4 space-y-4">
          {trendingTopics.map(([title, copy], index) => (
            <a key={title} href="#featured-guides" className="flex gap-4">
              <span className="w-6 shrink-0 text-xs font-semibold text-[#e3aa42]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-white">
                  {title}
                </span>
                <span className="mt-1 block text-xs text-white/58">{copy}</span>
              </span>
              <ArrowRight className="mt-1 h-3.5 w-3.5 text-[#e3aa42]" />
            </a>
          ))}
        </div>
      </GlassPanel>
    </aside>
  );
}

function MobileFilterChips() {
  return (
    <div className="xl:hidden">
      <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {guideMenu.slice(0, 8).map((item, index) => (
          <a
            key={item.label}
            href="#featured-guides"
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold ${
              index === 0
                ? "border-[#d8aa4f]/50 bg-[#d8aa4f]/16 text-[#f2c86b]"
                : "border-white/12 bg-white/[0.04] text-white/72"
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function TravelIntelligencePage() {
  return (
    <main className="min-h-screen bg-[#030807] text-white">
      <Header />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(216,170,79,.16),transparent_36%),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:auto,96px_96px]" />
      <div className="relative mx-auto grid max-w-[1840px] gap-6 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[250px_minmax(0,1fr)_390px] 2xl:px-8">
        <LeftSidebar />

        <div className="min-w-0 space-y-6">
          <MobileFilterChips />
          <Hero />

          <section className="space-y-4">
            <SectionTitle>Top Guide Categories</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
              {categories.map((category) => (
                <CategoryCard key={category.title} category={category} />
              ))}
            </div>
          </section>

          <section id="featured-guides" className="space-y-4">
            <SectionTitle>Featured Guides</SectionTitle>
            <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
              {featuredGuides.map((guide) => (
                <FeaturedGuideCard key={guide.title} guide={guide} />
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <SectionTitle>Guides by Destination</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
              {destinations.map((destination) => (
                <DestinationCard
                  key={destination.title}
                  destination={destination}
                />
              ))}
            </div>
          </section>
        </div>

        <RightSidebar />
      </div>
    </main>
  );
}
