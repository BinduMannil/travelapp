/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Anchor,
  Bell,
  CalendarDays,
  ChevronRight,
  Compass,
  Crown,
  Diamond,
  Globe2,
  Headphones,
  Home,
  Hotel,
  Map,
  Menu,
  Palmtree,
  Plane,
  PlusCircle,
  Route,
  Search,
  Settings,
  ShipWheel,
  Sparkles,
  Star,
  Sun,
  UserRound,
  Waves,
  Wind,
} from "lucide-react";
import { JourneeLogoMark } from "@/components/brand/JourneeLogo";
import { MainNavLink } from "@/components/navigation/MainNavLink";

export const metadata: Metadata = {
  title: "Yachts & Private Escapes",
  description:
    "A cinematic JOURNEE marine platform for private yachts, coastal retreats, hidden islands, and premium ocean intelligence.",
};

const gold = "#d6a94b";

const heroImage =
  "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=2400&q=92";

const coastalDestinations = [
  {
    name: "Amalfi Coast",
    region: "Italy",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=88",
    marina: "High",
    season: "Apr - Oct",
    index: "9.8",
    crowd: "Low",
    weather: "24C",
    wind: "Calm sea",
  },
  {
    name: "Saint-Tropez",
    region: "France",
    image:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=900&q=88",
    marina: "Limited",
    season: "May - Sep",
    index: "9.6",
    crowd: "Medium",
    weather: "26C",
    wind: "Light breeze",
  },
  {
    name: "Maldives",
    region: "Indian Ocean",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=88",
    marina: "Private",
    season: "Nov - Apr",
    index: "9.9",
    crowd: "Low",
    weather: "29C",
    wind: "Clear lagoon",
  },
  {
    name: "Greek Islands",
    region: "Greece",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=88",
    marina: "Open",
    season: "May - Oct",
    index: "9.7",
    crowd: "Medium",
    weather: "29C",
    wind: "Moderate",
  },
  {
    name: "Seychelles",
    region: "Africa",
    image:
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=900&q=88",
    marina: "Rare",
    season: "Apr - Nov",
    index: "9.7",
    crowd: "Low",
    weather: "28C",
    wind: "Calm sea",
  },
  {
    name: "Dubrovnik",
    region: "Croatia",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=88",
    marina: "Good",
    season: "May - Oct",
    index: "9.5",
    crowd: "Medium",
    weather: "25C",
    wind: "Light breeze",
  },
  {
    name: "Bali Coastline",
    region: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=88",
    marina: "Select",
    season: "Apr - Oct",
    index: "9.4",
    crowd: "Low",
    weather: "28C",
    wind: "Calm sea",
  },
];

const yachtExperiences = [
  {
    name: "Explorer Yachts",
    image:
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=800&q=88",
  },
  {
    name: "Performance Yachts",
    image:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=88",
  },
  {
    name: "Sailing Catamarans",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=88",
  },
  {
    name: "Wellness Escapes",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=88",
  },
  {
    name: "Family Voyages",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=88",
  },
  {
    name: "Ultra Luxury Retreats",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=88",
  },
];

const weatherMetrics = [
  { label: "Wave Conditions", value: "0.6 m", note: "Calm", icon: Waves },
  { label: "Sunset Quality", value: "9.6", note: "Exceptional", icon: Sun },
  { label: "Sea Temperature", value: "25C", note: "Perfect", icon: Waves },
  { label: "Wind Movement", value: "12 kts", note: "Light", icon: Wind },
  { label: "Sailing Comfort", value: "Excellent", note: "Ideal", icon: ShipWheel },
  { label: "Visibility", value: "20 km", note: "Clear", icon: Compass },
] satisfies Array<{
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
}>;

const collections = [
  {
    title: "Hidden Mediterranean Beaches",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=88",
  },
  {
    title: "Secret Island Resorts",
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1000&q=88",
  },
  {
    title: "Private Dining at Sea",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=88",
  },
  {
    title: "Remote Wellness Retreats",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=88",
  },
  {
    title: "Underwater Experiences",
    image:
      "https://images.unsplash.com/photo-1544551763-92ab472cad5d?auto=format&fit=crop&w=1000&q=88",
  },
];

const lifestyle = [
  {
    title: "Beach Clubs",
    copy: "Exclusive access",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=700&q=86",
    icon: Palmtree,
  },
  {
    title: "Marina Dining",
    copy: "World-class cuisine",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=700&q=86",
    icon: Crown,
  },
  {
    title: "Yacht Parties",
    copy: "Private events",
    image:
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=700&q=86",
    icon: Sparkles,
  },
  {
    title: "Sunset Lounges",
    copy: "Iconic views",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=86",
    icon: Sun,
  },
  {
    title: "Elite Wellness",
    copy: "Ocean therapies",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=700&q=86",
    icon: Star,
  },
  {
    title: "Luxury Shopping",
    copy: "Designer boutiques",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=700&q=86",
    icon: Diamond,
  },
] satisfies Array<{
  title: string;
  copy: string;
  image: string;
  icon: LucideIcon;
}>;

const routes = [
  ["Monaco -> Sardinia", "2h 45m", "Excellent", "9.4", "97%"],
  ["Amalfi -> Capri", "1h 20m", "Excellent", "9.6", "93%"],
  ["Athens -> Mykonos", "2h 10m", "Good", "9.2", "88%"],
];

const feed = [
  ["Ocean", "10m ago", "Calm seas across Amalfi today", "Perfect conditions for sailing and coastal exploration.", "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=800&q=86"],
  ["Event", "25m ago", "Exclusive yacht event beginning in Monaco", "Annual Monaco Yacht Rendezvous starts this evening.", "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=86"],
  ["Weather", "45m ago", "Northern lights visible in Icelandic waters", "Rare opportunity for a cinematic night at sea.", "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=800&q=86"],
  ["Trending", "1h ago", "Maldives visibility exceptionally clear today", "Ideal for snorkeling and underwater experiences.", "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=86"],
  ["Luxury", "1h ago", "New private marina opens in Saint-Tropez", "Ultra-exclusive berths now available for reservations.", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=86"],
];

const navItems = [
  ["Home", Home, "/"],
  ["Explore", Compass, "/explore"],
  ["Atlas", Map, "/atlas"],
  ["Trips", CalendarDays, "/trips"],
  ["Stays", Hotel, "/stays"],
  ["Flights", Plane, "/flights"],
  ["Yachts", Anchor, "/yachts"],
  ["Experiences", Globe2, "/activity"],
  ["Concierge", PlusCircle, "/concierge"],
] as const;

const accountItems = [
  { label: "Alerts", icon: Bell, badge: "3" },
  { label: "Profile", icon: UserRound, badge: "" },
  { label: "Settings", icon: Settings, badge: "" },
] satisfies Array<{ label: string; icon: LucideIcon; badge: string }>;

const heroStats = [
  { label: "Private Marinas", value: "217", note: "Nearby", icon: Anchor },
  { label: "Sea Conditions", value: "Calm", note: "Optimal", icon: Waves },
  { label: "Elite Destinations", value: "48", note: "Curated", icon: Diamond },
  { label: "Sunset Quality", value: "9.6 /10", note: "Exceptional", icon: Sun },
] satisfies Array<{
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
}>;

export default function YachtsPage() {
  return (
    <main className="min-h-screen bg-[#020403] text-white">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_58%_8%,rgba(214,169,75,.14),transparent_28%),radial-gradient(circle_at_78%_30%,rgba(18,80,96,.24),transparent_32%),linear-gradient(180deg,#020403_0%,#06100f_48%,#020403_100%)]" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1920px]">
        <LeftRail />
        <section className="min-w-0 flex-1 lg:pl-[270px]">
          <HeroSection />
          <div className="space-y-4 px-4 pb-8 sm:px-6 lg:px-8">
            <DestinationDiscovery />
            <div className="grid gap-4 xl:grid-cols-[1fr_.9fr]">
              <YachtExperienceLayer />
              <MarineWeatherIntelligence />
            </div>
            <PrivateEscapeCollections />
            <div className="grid gap-4 xl:grid-cols-[.8fr_1fr]">
              <CoastalLifestyleEngine />
              <PrivateRoutePlanner />
            </div>
            <RealTimeOceanFeed />
          </div>
        </section>
      </div>
    </main>
  );
}

function LeftRail() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[270px] border-r border-white/10 bg-black/72 px-5 py-7 backdrop-blur-2xl lg:flex lg:flex-col">
      <Link href="/" className="mb-10 flex items-center gap-3">
        <JourneeLogoMark className="h-8 w-8 text-[#d6a94b]" />
        <span className="text-2xl font-semibold uppercase tracking-[.28em] text-[#f5c15a]">
          Journee
        </span>
      </Link>
      <nav className="space-y-2">
        {navItems.map(([label, Icon, href]) => {
          const active = label === "Yachts";
          return (
            <MainNavLink
              key={label}
              label={label}
              href={href}
              className="group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition"
              activeClassName="border border-[#d6a94b]/25 bg-[#d6a94b]/14 text-white shadow-[0_18px_50px_rgba(214,169,75,.12)]"
              inactiveClassName="text-white/72 hover:bg-white/7 hover:text-white"
            >
              <Icon className="h-4 w-4" color={active ? gold : "currentColor"} />
              {label}
            </MainNavLink>
          );
        })}
      </nav>
      <div className="mt-8 border-t border-white/10 pt-5">
        {accountItems.map(({ label, icon: Icon, badge }) => (
          <button
            key={label}
            className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/7 hover:text-white"
          >
            <span className="flex items-center gap-3">
              <Icon className="h-4 w-4" />
              {label}
            </span>
            {badge ? (
              <span className="rounded-full bg-[#d6a94b] px-2 py-0.5 text-[10px] font-bold text-black">
                {badge}
              </span>
            ) : null}
          </button>
        ))}
      </div>
      <div className="mt-auto space-y-4">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
            alt="Alexander profile"
            className="h-11 w-11 rounded-full border border-[#d6a94b]/35 object-cover"
          />
          <div>
            <p className="text-xs font-bold uppercase">Alexander</p>
            <p className="text-[11px] text-white/50">Platinum Member</p>
          </div>
        </div>
        <div className="rounded-lg border border-[#d6a94b]/20 bg-[#d6a94b]/10 px-4 py-3 text-center text-xs font-bold uppercase text-[#f3c66c]">
          128,450 points
        </div>
        <div className="rounded-lg border border-white/12 bg-white/[.035] p-4">
          <p className="text-sm font-bold uppercase text-[#f3c66c]">Your Yacht Concierge</p>
          <p className="mt-2 text-xs text-white/50">Available 24/7</p>
          <Headphones className="mx-auto my-6 h-10 w-10 text-[#d6a94b]" />
          <button className="w-full rounded-md border border-[#d6a94b]/45 px-3 py-2 text-[11px] font-bold uppercase text-[#f3c66c] transition hover:bg-[#d6a94b] hover:text-black">
            Contact Concierge
          </button>
        </div>
      </div>
    </aside>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[760px] overflow-hidden lg:min-h-[720px]">
      <img
        src={heroImage}
        alt="Luxury yacht near the Amalfi Coast at sunset"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,4,3,.95)_0%,rgba(2,4,3,.62)_36%,rgba(2,4,3,.2)_72%),linear-gradient(180deg,rgba(2,4,3,.28)_0%,rgba(2,4,3,.25)_55%,#020403_100%)]" />
      <header className="relative z-20 flex items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <div className="hidden h-11 w-full max-w-[540px] items-center gap-3 rounded-lg border border-white/18 bg-black/36 px-4 text-sm text-white/45 backdrop-blur-xl md:flex">
          <Search className="h-4 w-4 text-white/80" />
          Search coastal destinations, marinas, yachts...
        </div>
        <Link href="/" className="flex items-center gap-3 lg:hidden">
          <JourneeLogoMark className="h-8 w-8 text-[#d6a94b]" />
          <span className="font-semibold uppercase tracking-[.24em] text-[#f5c15a]">
            Journee
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-5 text-white">
          <Globe2 className="h-5 w-5" />
          <Star className="h-5 w-5 fill-[#d6a94b] text-[#d6a94b]" />
          <Bell className="h-5 w-5" />
          <Menu className="h-6 w-6" />
        </div>
      </header>
      <div className="relative z-10 flex min-h-[600px] items-end px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        <div className="grid w-full items-end gap-8 2xl:grid-cols-[minmax(0,720px)_1fr]">
          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[.16em] text-[#f3c66c]">
              Yachts & Private Escapes
            </p>
            <h1 className="max-w-[780px] text-[clamp(3.15rem,9vw,8.8rem)] font-extrabold uppercase leading-[.88] text-white">
              Escape
              <br />
              Beyond
              <br />
              The Shore
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/82">
              Discover private yachts, hidden islands, coastal retreats, and
              cinematic marine journeys.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="group inline-flex h-12 items-center gap-4 rounded-lg bg-[#d6a94b] px-7 text-sm font-bold uppercase text-black shadow-[0_16px_45px_rgba(214,169,75,.28)] transition hover:bg-[#f1c86d]">
                Explore Escapes
                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
              <button className="inline-flex h-12 items-center gap-4 rounded-lg border border-[#d6a94b]/45 bg-black/28 px-7 text-sm font-bold uppercase text-white backdrop-blur-xl transition hover:bg-[#d6a94b]/14">
                Charter Journey
                <Anchor className="h-4 w-4 text-[#d6a94b]" />
              </button>
            </div>
          </div>
          <div className="grid gap-0 overflow-hidden rounded-xl border border-white/13 bg-black/38 shadow-[0_30px_110px_rgba(0,0,0,.42)] backdrop-blur-2xl sm:grid-cols-2 xl:grid-cols-4">
            {heroStats.map(({ label, value, note, icon: Icon }) => (
              <div
                key={label}
                className="border-b border-r border-white/10 p-5 last:border-r-0 sm:border-b-0"
              >
                <Icon className="mb-4 h-7 w-7 text-[#d6a94b]" />
                <p className="text-[10px] font-bold uppercase text-white/70">{label}</p>
                <p className="mt-2 text-2xl font-medium text-white">{value}</p>
                <p className="mt-1 text-xs text-white/45">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionFrame({
  title,
  action,
  children,
}: {
  title: string;
  action?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-white/10 bg-black/32 p-4 shadow-[0_20px_80px_rgba(0,0,0,.25)] backdrop-blur-2xl">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-base font-bold uppercase text-white">{title}</h2>
        {action ? (
          <button className="inline-flex items-center gap-2 text-xs font-semibold text-[#d6a94b]">
            {action}
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function DestinationDiscovery() {
  return (
    <SectionFrame title="Cinematic Coastal Discovery" action="View all destinations">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
        {coastalDestinations.map((destination) => (
          <article
            key={destination.name}
            className="group relative min-h-[300px] overflow-hidden rounded-lg border border-white/10 bg-white/[.03]"
          >
            <img
              src={destination.image}
              alt={`${destination.name} aerial coastline`}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.12),rgba(0,0,0,.72)_54%,rgba(0,0,0,.94))]" />
            <div className="relative flex h-full min-h-[300px] flex-col justify-between p-4">
              <div>
                <h3 className="text-base font-bold uppercase text-white">{destination.name}</h3>
                <p className="mt-1 text-xs font-medium uppercase text-white/62">{destination.region}</p>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-white/64">
                  <span>Best Season</span>
                  <span className="text-right text-white">{destination.season}</span>
                  <span>Marina</span>
                  <span className="text-right text-[#d6a94b]">{destination.marina}</span>
                  <span>Luxury Index</span>
                  <span className="text-right text-white">{destination.index}</span>
                  <span>Crowd Score</span>
                  <span className="text-right text-white">{destination.crowd}</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-white/12 pt-3 text-xs">
                  <span className="inline-flex items-center gap-2 text-[#f3c66c]">
                    <Sun className="h-4 w-4" />
                    {destination.weather}
                  </span>
                  <span className="text-white/70">{destination.wind}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}

function YachtExperienceLayer() {
  return (
    <SectionFrame title="Yacht Experience Layer">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 2xl:grid-cols-6">
        {yachtExperiences.map((experience) => (
          <article
            key={experience.name}
            className="group relative min-h-[240px] overflow-hidden rounded-lg border border-white/10 bg-white/[.035]"
          >
            <img
              src={experience.image}
              alt={experience.name}
              className="absolute inset-0 h-full w-full object-cover opacity-78 transition duration-700 group-hover:scale-110 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.9))]" />
            <div className="relative flex h-full min-h-[240px] flex-col justify-end p-4">
              <h3 className="max-w-[9rem] text-sm font-extrabold uppercase leading-5 text-white">
                {experience.name}
              </h3>
              <button className="mt-5 grid h-8 w-8 place-items-center rounded-full border border-[#d6a94b] text-[#d6a94b] transition group-hover:bg-[#d6a94b] group-hover:text-black">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}

function MarineWeatherIntelligence() {
  return (
    <SectionFrame title="Marine Weather Intelligence" action="Live Conditions">
      <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-white/10 bg-black/30 md:grid-cols-3 xl:grid-cols-6">
        {weatherMetrics.map(({ label, value, note, icon: Icon }) => (
          <div key={label} className="border-b border-r border-white/10 p-4 last:border-r-0 xl:border-b-0">
            <Icon className="mb-3 h-4 w-4 text-[#d6a94b]" />
            <p className="text-[10px] font-bold uppercase text-white/58">{label}</p>
            <p className="mt-2 text-xl font-semibold text-[#f3c66c]">{value}</p>
            <p className="mt-1 text-xs text-white/58">{note}</p>
          </div>
        ))}
      </div>
      <div className="relative mt-4 min-h-[210px] overflow-hidden rounded-lg border border-white/10 bg-[#031112]">
        <img
          src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1300&q=88"
          alt="Mediterranean ocean condition map"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_44%,rgba(214,169,75,.38),transparent_2%),radial-gradient(circle_at_58%_62%,rgba(214,169,75,.28),transparent_2%),linear-gradient(180deg,rgba(0,0,0,.18),rgba(0,0,0,.7))]" />
        <svg viewBox="0 0 800 220" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d="M70 148 C185 56 310 176 420 88 S625 72 738 142" fill="none" stroke="rgba(214,169,75,.76)" strokeWidth="2" strokeDasharray="8 9" />
          <path d="M90 96 C220 130 284 42 415 84 S604 162 720 82" fill="none" stroke="rgba(111,190,201,.38)" strokeWidth="1.5" />
        </svg>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/66">
          <span>Optimal sailing conditions across Mediterranean</span>
          <span>Updated 10 min ago</span>
        </div>
      </div>
    </SectionFrame>
  );
}

function PrivateEscapeCollections() {
  return (
    <SectionFrame title="Private Escape Collections" action="View all collections">
      <div className="flex snap-x gap-4 overflow-x-auto pb-1 [scrollbar-width:none]">
        {collections.map((collection) => (
          <article
            key={collection.title}
            className="group relative h-[210px] min-w-[310px] snap-start overflow-hidden rounded-lg border border-white/10 bg-white/[.035] lg:min-w-[360px]"
          >
            <img
              src={collection.image}
              alt={collection.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.84))]" />
            <div className="relative flex h-full flex-col items-center justify-end p-5 text-center">
              <button className="mb-5 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-xl">
                <ChevronRight className="h-5 w-5" />
              </button>
              <h3 className="max-w-[220px] text-sm font-extrabold uppercase leading-5">
                {collection.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}

function CoastalLifestyleEngine() {
  return (
    <SectionFrame title="Coastal Lifestyle Engine">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
        {lifestyle.map(({ title, copy, image, icon: Icon }) => (
          <article key={title} className="group relative min-h-[150px] overflow-hidden rounded-lg border border-white/10">
            <img
              src={image}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.88))]" />
            <div className="relative flex h-full min-h-[150px] flex-col justify-end p-4 text-center">
              <Icon className="mx-auto mb-3 h-5 w-5 text-[#d6a94b]" />
              <h3 className="text-xs font-extrabold uppercase text-white">{title}</h3>
              <p className="mt-1 text-[11px] text-white/56">{copy}</p>
            </div>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}

function PrivateRoutePlanner() {
  return (
    <SectionFrame title="Private Route Planner" action="Plan your journey">
      <div className="grid gap-4 lg:grid-cols-[290px_1fr]">
        <div className="space-y-3">
          {routes.map(([name, duration, weather, scenic]) => (
            <button
              key={name}
              className="group w-full rounded-lg border border-white/10 bg-white/[.035] p-4 text-left transition hover:border-[#d6a94b]/40 hover:bg-[#d6a94b]/10"
            >
              <p className="flex items-center gap-3 text-sm font-bold uppercase text-white">
                <Route className="h-4 w-4 text-[#d6a94b]" />
                {name}
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs text-white/58">
                <span>{duration}</span>
                <span className="text-emerald-300">{weather}</span>
                <span className="ml-auto text-[#f3c66c]">{scenic}</span>
              </div>
            </button>
          ))}
          <button className="h-11 w-full rounded-lg border border-[#d6a94b]/45 text-xs font-bold uppercase text-[#f3c66c] transition hover:bg-[#d6a94b] hover:text-black">
            Explore all routes
          </button>
        </div>
        <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-white/10 bg-[#031112]">
          <img
            src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1300&q=88"
            alt="Private sailing route visualization"
            className="absolute inset-0 h-full w-full object-cover opacity-52"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.15),rgba(0,0,0,.78))]" />
          <svg viewBox="0 0 900 520" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path d="M138 140 C220 230 333 210 414 284 S572 425 715 356" fill="none" stroke="rgba(214,169,75,.9)" strokeWidth="3" strokeDasharray="8 12" />
            <circle cx="138" cy="140" r="8" fill="#d6a94b" />
            <circle cx="414" cy="284" r="12" fill="#d6a94b" opacity=".9" />
            <circle cx="715" cy="356" r="8" fill="#d6a94b" />
            <text x="110" y="118" fill="white" fontSize="28" fontWeight="700">Amalfi</text>
            <text x="154" y="186" fill="white" fontSize="20" fontWeight="600">Capri</text>
          </svg>
          <div className="absolute bottom-5 right-5 w-[260px] rounded-lg border border-white/12 bg-black/55 p-5 backdrop-blur-2xl">
            <p className="text-[10px] font-bold uppercase text-[#f3c66c]">Route Overview</p>
            {[
              ["Duration", "1h 20m"],
              ["Scenic Value", "9.6 /10"],
              ["Privacy Score", "9.3 /10"],
              ["Weather", "Excellent"],
              ["Marina Availability", "93%"],
            ].map(([label, value]) => (
              <div key={label} className="mt-3 flex items-center justify-between text-xs">
                <span className="text-white/56">{label}</span>
                <span className="font-semibold text-[#f3c66c]">{value}</span>
              </div>
            ))}
            <button className="mt-5 h-11 w-full rounded-lg border border-[#d6a94b]/50 text-xs font-bold uppercase text-[#f3c66c] transition hover:bg-[#d6a94b] hover:text-black">
              View full route
            </button>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

function RealTimeOceanFeed() {
  return (
    <SectionFrame title="Real-Time Ocean Feed" action="View all updates">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {feed.map(([tag, time, title, copy, image]) => (
          <article key={title} className="group overflow-hidden rounded-lg border border-white/10 bg-white/[.035]">
            <div className="relative h-36 overflow-hidden">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.1),rgba(0,0,0,.72))]" />
              <div className="absolute left-3 top-3 rounded bg-black/62 px-2 py-1 text-[10px] font-bold uppercase text-white">
                {tag}
              </div>
              <div className="absolute right-3 top-3 text-[11px] text-white/62">{time}</div>
            </div>
            <div className="p-4">
              <h3 className="text-base font-semibold leading-6 text-white">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-white/58">{copy}</p>
            </div>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}
