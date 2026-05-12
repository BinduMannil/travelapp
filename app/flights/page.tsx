/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import {
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Filter,
  Luggage,
  Menu,
  Plane,
  Route,
  Search,
  ShieldCheck,
  Ship,
  SlidersHorizontal,
  Sparkles,
  TrainFront,
  TramFront,
  UserRound,
  Utensils,
  Wifi,
} from "lucide-react";
import { JourneeLogoMark } from "@/components/brand/JourneeLogo";

export const metadata: Metadata = {
  title: "Flights / Routes",
  description:
    "Compare flights, trains, routes, airport transfers, fare insights, and destination transport options with JOURNEE.",
};

type Flight = {
  airline: string;
  brand: string;
  departTime: string;
  departCode: string;
  departCity: string;
  arriveTime: string;
  arriveCode: string;
  arriveCity: string;
  duration: string;
  stops: string;
  layover?: string;
  price: string;
  rating: string;
  amenities: string[];
};

type TransportOption = {
  label: string;
  price: string;
  icon: typeof Plane;
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
];

const flightResults: Flight[] = [
  {
    airline: "JAL",
    brand: "Japan Airlines",
    departTime: "12:30",
    departCode: "SFO",
    departCity: "San Francisco",
    arriveTime: "16:45 +1",
    arriveCode: "KIX",
    arriveCity: "Osaka Kansai",
    duration: "12h 15m",
    stops: "Non-stop",
    price: "$1,048",
    rating: "4.8 Great",
    amenities: ["Free Wi-Fi", "In-flight Meal", "30kg Baggage", "Seat Choice"],
  },
  {
    airline: "ANA",
    brand: "All Nippon Airways",
    departTime: "08:55",
    departCode: "SFO",
    departCity: "San Francisco",
    arriveTime: "17:15 +1",
    arriveCode: "KIX",
    arriveCity: "Osaka Kansai",
    duration: "15h 20m",
    stops: "1 Stop",
    layover: "NRT 2h 05m",
    price: "$842",
    rating: "4.7 Great",
    amenities: ["Free Wi-Fi", "In-flight Meal", "2 x 23kg Baggage", "Seat Choice"],
  },
  {
    airline: "Korean Air",
    brand: "Korean Air",
    departTime: "10:40",
    departCode: "SFO",
    departCity: "San Francisco",
    arriveTime: "20:15 +1",
    arriveCode: "KIX",
    arriveCity: "Osaka Kansai",
    duration: "17h 35m",
    stops: "1 Stop",
    layover: "ICN 3h 10m",
    price: "$776",
    rating: "4.6 Great",
    amenities: ["Free Wi-Fi", "In-flight Meal", "2 x 23kg Baggage", "Seat Choice"],
  },
];

const pricePoints = [24, 40, 55, 48, 68, 50, 60];

const transportOptions: TransportOption[] = [
  { label: "Flights", price: "from $612", icon: Plane },
  { label: "Trains", price: "from $320", icon: TrainFront },
  { label: "Mix & Match", price: "from $540", icon: Route },
  { label: "Ferry + Train", price: "from $410", icon: Ship },
];

const destinationTransport = [
  {
    title: "Kansai Airport (KIX) to Osaka",
    meta: "45 min - from $18",
    best: "Best: Haruka Express",
    icon: TrainFront,
  },
  {
    title: "Osaka to Kyoto",
    meta: "30 min - from $5",
    best: "Best: JR Special Rapid",
    icon: TramFront,
  },
  {
    title: "Osaka Metro Pass",
    meta: "From $8 / day",
    best: "Unlimited rides on trains & buses",
    icon: BusIcon,
  },
];

const travelTips = [
  "Fly into KIX for faster access to Osaka.",
  "Book 2 to 3 months in advance for best fares.",
  "Mid-week flights are usually cheaper.",
  "Travel light. Baggage fees vary by airline.",
];

const guarantees = [
  "Best price guarantee",
  "24/7 customer support",
  "Secure booking",
  "Trusted by solo travelers",
];

export default function FlightsPage() {
  return (
    <main className="min-h-screen bg-[#030708] text-white">
      <TopNavigation />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(216,170,79,.14),transparent_30%),radial-gradient(circle_at_76%_8%,rgba(74,112,125,.16),transparent_31%),linear-gradient(180deg,#030708_0%,#071010_48%,#030708_100%)]" />
      <div className="relative mx-auto grid w-full max-w-[1920px] gap-5 px-4 pb-8 pt-20 sm:px-5 lg:px-6 2xl:grid-cols-[320px_minmax(0,1fr)_380px]">
        <aside className="hidden 2xl:block">
          <FiltersPanel />
        </aside>

        <section className="min-w-0 space-y-4">
          <MobileFilters />
          <HeroBanner />
          <FlightsToolbar />
          <div className="space-y-3">
            {flightResults.map((flight, index) => (
              <FlightCard key={flight.airline} flight={flight} featured={index === 0} />
            ))}
          </div>
          <FlexibleDatesBanner />
          <OtherWaysToTravel />
        </section>

        <aside className="space-y-4 2xl:sticky 2xl:top-24 2xl:self-start">
          <RightSidebar />
        </aside>
      </div>
    </main>
  );
}

function TopNavigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/8 bg-[#020506]/86 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-[1920px] items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <JourneeLogoMark className="h-9 w-9 text-[#e0aa3e]" />
          <span className="font-sans text-2xl uppercase tracking-[0.12em] text-white">
            JOURNEE
          </span>
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={`relative px-4 py-5 text-sm font-medium transition ${
                item === "Flights" ? "text-[#f3b544]" : "text-white/88 hover:text-white"
              }`}
            >
              {item}
              {item === "Flights" && (
                <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-[#f3b544]" />
              )}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden min-w-[260px] max-w-[520px] flex-1 items-center rounded-full border border-white/12 bg-white/[0.045] px-4 py-2.5 text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,.08)] lg:flex">
          <Search className="mr-3 h-4 w-4 shrink-0 text-white/48" />
          <span className="truncate text-sm">Search flights, cities, airports...</span>
        </div>
        <button
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/88"
          type="button"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <img
          src={avatar}
          alt=""
          className="h-10 w-10 shrink-0 rounded-full border border-[#d8aa4f]/55 object-cover"
        />
        <button
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-white/86 xl:hidden"
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

function FiltersPanel() {
  return (
    <Panel className="sticky top-24 p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-sm font-bold uppercase tracking-[0.12em] text-[#f3b544]">
          Find Your Route
        </h2>
        <button type="button" className="text-sm text-white/62">
          Edit
        </button>
      </div>
      <div className="mt-5 space-y-3">
        <RouteField label="From" value="SFO" detail="San Francisco, USA" />
        <RouteField label="To" value="KIX" detail="Osaka Kansai, Japan" />
        <InputField icon={CalendarDays} label="Dates" value="May 20 to May 27" action="Edit" />
        <InputField icon={UserRound} label="Travelers & Class" value="1 Traveler, Economy" chevron />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h3 className="font-sans text-sm font-bold uppercase tracking-[0.12em] text-[#f3b544]">
          Filters
        </h3>
        <button type="button" className="text-sm text-white/62">
          Clear all
        </button>
      </div>

      <FilterBlock title="Stops">
        <div className="space-y-3">
          {[
            ["Non-stop", "$1,048", false],
            ["1 Stop", "$842", true],
            ["2+ Stops", "$612", false],
          ].map(([label, price, checked]) => (
            <label key={label as string} className="flex items-center gap-3 text-sm text-white/86">
              <span
                className={`grid h-4 w-4 place-items-center rounded border ${
                  checked
                    ? "border-[#d8aa4f] bg-[#d8aa4f] text-[#170f05]"
                    : "border-white/62 bg-transparent"
                }`}
              >
                {checked && <Check className="h-3 w-3" />}
              </span>
              <span className="min-w-0 flex-1">{label}</span>
              <span className="text-white/66">{price}</span>
            </label>
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Max Price">
        <div className="flex justify-between text-sm text-white/72">
          <span>$500</span>
          <span>$1,500+</span>
        </div>
        <div className="mt-4 h-1.5 rounded-full bg-white/12">
          <div className="relative h-full w-full rounded-full bg-gradient-to-r from-[#d99932] to-[#f5b44a]">
            <span className="absolute -left-1.5 -top-1.5 h-4 w-4 rounded-full bg-[#f5b44a]" />
            <span className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full bg-[#f5b44a]" />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {["$500 - $800", "$800 - $1,200", "$1,200+"].map((chip, index) => (
            <button
              type="button"
              key={chip}
              className={`rounded-md border px-2 py-3 text-sm ${
                index === 1
                  ? "border-[#d8aa4f]/65 bg-[#d8aa4f]/18 text-[#f4bd54]"
                  : "border-white/10 bg-white/[0.035] text-white/78"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Airlines">
        <SelectButton label="Select airlines" />
      </FilterBlock>
      <FilterBlock title="Departure Time">
        <SelectButton label="Any time" />
      </FilterBlock>
      <FilterBlock title="Journey Duration">
        <SelectButton label="Any duration" />
      </FilterBlock>

      <button
        type="button"
        className="mt-6 flex w-full items-center justify-between rounded-md border border-white/10 bg-transparent px-1 text-sm text-white/86"
      >
        More Filters
        <ChevronDown className="h-4 w-4" />
      </button>

      <button
        type="button"
        className="mt-12 w-full rounded-md bg-gradient-to-r from-[#d39533] to-[#e6a944] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_42px_rgba(216,170,79,.24)]"
      >
        Show 128 Flights
      </button>
    </Panel>
  );
}

function RouteField({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-3">
      <p className="text-sm text-white/58">{label}</p>
      <div className="mt-1 flex items-baseline gap-3">
        <span className="text-lg text-white">{value}</span>
        <span className="truncate text-sm text-white/74">{detail}</span>
      </div>
    </div>
  );
}

function InputField({
  icon: Icon,
  label,
  value,
  action,
  chevron = false,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
  action?: string;
  chevron?: boolean;
}) {
  return (
    <div className="flex min-h-14 items-center rounded-md border border-white/10 bg-white/[0.035] px-3 text-sm text-white/82">
      <Icon className="mr-2.5 h-4 w-4 text-white/66" />
      <span className="min-w-0 flex-1">
        <span className="block text-sm text-white/58">{label}</span>
        <span className="block truncate text-white/88">{value}</span>
      </span>
      {action && <span className="ml-3 shrink-0 text-sm text-white/70">{action}</span>}
      {chevron && <ChevronDown className="ml-2 h-4 w-4 text-white/54" />}
    </div>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h3 className="mb-3 font-sans text-sm font-semibold text-white/88">{title}</h3>
      {children}
    </div>
  );
}

function SelectButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-md border border-white/10 bg-white/[0.035] px-3 py-3 text-sm text-white/78"
    >
      {label}
      <ChevronDown className="h-4 w-4 text-white/54" />
    </button>
  );
}

function MobileFilters() {
  return (
    <details className="group 2xl:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg border border-white/12 bg-[#071011]/86 px-4 py-3 text-sm font-semibold text-white backdrop-blur-2xl">
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[#f3b544]" />
          Filters & route preferences
        </span>
        <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
      </summary>
      <div className="mt-3">
        <FiltersPanel />
      </div>
    </details>
  );
}

function HeroBanner() {
  return (
    <section className="relative min-h-[300px] overflow-hidden rounded-lg border border-white/12 bg-[#091112] shadow-[0_28px_90px_rgba(0,0,0,.42)]">
      <img
        src="https://images.unsplash.com/photo-1517999349371-c43520457b23?auto=format&fit=crop&w=2400&q=88"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,8,.97)_0%,rgba(3,7,8,.78)_37%,rgba(3,7,8,.28)_68%,rgba(3,7,8,.72)_100%),linear-gradient(180deg,rgba(3,7,8,.12),rgba(3,7,8,.55))]" />
      <div className="relative grid min-h-[300px] gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="flex flex-col justify-center">
          <h1 className="max-w-[560px] font-sans text-[clamp(2.35rem,4.2vw,4.25rem)] leading-[1.02] text-white">
            Find the best way to get there.
          </h1>
          <p className="mt-5 max-w-[470px] text-base leading-7 text-white/88">
            Compare flights, trains, and routes to travel smarter.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            {[
              { label: "Best Fare Finder", icon: CalendarDays },
              { label: "Flexible Dates", icon: CalendarDays },
              { label: "Secure Booking", icon: ShieldCheck },
            ].map(({ label, icon: Icon }) => (
              <span key={label} className="inline-flex items-center gap-2 text-sm text-white/88">
                <Icon className="h-5 w-5 text-[#f3b544]" />
                {label}
              </span>
            ))}
          </div>
        </div>
        <FareInsights />
      </div>
    </section>
  );
}

function FareInsights() {
  return (
    <Panel className="self-center p-5">
      <h2 className="font-sans text-base font-semibold text-white">Fare Insights</h2>
      <p className="mt-4 text-sm text-white/88">
        Prices are currently{" "}
        <span className="rounded bg-emerald-500/16 px-2 py-0.5 text-sm font-semibold text-emerald-300">
          Low
        </span>
      </p>
      <p className="mt-3 text-sm text-white/76">Book now for the best fares.</p>
      <div className="mt-5 h-20">
        <svg viewBox="0 0 240 80" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="fareFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#f3b544" stopOpacity="0.36" />
              <stop offset="100%" stopColor="#1d5f45" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          <path
            d="M0 62 L30 45 L60 28 L90 36 L120 20 L150 42 L190 30 L230 18 L230 80 L0 80 Z"
            fill="url(#fareFill)"
          />
          <path
            d="M0 62 L30 45 L60 28 L90 36 L120 20 L150 42 L190 30 L230 18"
            fill="none"
            stroke="#f3b544"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {pricePoints.map((point, index) => (
            <circle
              key={`${point}-${index}`}
              cx={index * 32 + 4}
              cy={72 - point}
              r="4"
              fill="#f3b544"
            />
          ))}
        </svg>
      </div>
      <div className="mt-1 flex justify-around text-sm text-white/58">
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
      </div>
      <button type="button" className="mt-4 text-sm font-semibold text-[#f3b544]">
        View Price Calendar →
      </button>
    </Panel>
  );
}

function FlightsToolbar() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex overflow-x-auto rounded-full border border-white/10 bg-[#071011]/72 p-1 backdrop-blur-2xl">
        {["Best Flights", "Cheapest", "Fastest", "Best Value"].map((tab, index) => (
          <button
            type="button"
            key={tab}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium ${
              index === 0
                ? "bg-[#d8aa4f]/12 text-[#f3b544] shadow-[inset_0_-2px_0_#f3b544]"
                : "text-white/72 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="inline-flex items-center justify-between gap-2 rounded-md border border-white/10 bg-[#071011]/78 px-4 py-2.5 text-sm text-white/86 backdrop-blur-2xl sm:min-w-56"
      >
        <span className="text-white/58">Sort by:</span>
        Recommended
        <ChevronDown className="h-4 w-4 text-[#f3b544]" />
      </button>
    </div>
  );
}

function FlightCard({ flight, featured }: { flight: Flight; featured: boolean }) {
  return (
    <article className="rounded-lg border border-white/12 bg-[#071011]/82 p-4 shadow-[0_20px_60px_rgba(0,0,0,.28),inset_0_1px_0_rgba(255,255,255,.05)] backdrop-blur-2xl transition hover:border-[#d8aa4f]/48">
      <div className="grid gap-5 lg:grid-cols-[190px_minmax(360px,1fr)_190px] lg:items-center">
        <div className="flex gap-3 lg:border-r lg:border-white/8 lg:pr-5">
          <AirlineMark airline={flight.airline} />
          <div>
            <h3 className="font-sans text-base font-semibold text-white">{flight.airline}</h3>
            <p className="mt-1 text-sm text-white/74">{flight.brand}</p>
            <span className="mt-4 inline-flex items-center gap-1 rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-sm font-semibold text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" />
              {flight.rating}
            </span>
          </div>
        </div>

        <div className="min-w-0">
          <div className="grid grid-cols-[88px_minmax(120px,1fr)_92px] items-start gap-4">
            <AirportTime time={flight.departTime} code={flight.departCode} city={flight.departCity} />
            <div className="pt-3 text-center">
              <p className="text-sm text-white/78">{flight.duration}</p>
              <div className="relative mt-3 h-4">
                <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/58" />
                <span className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white/78" />
                <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/72" />
                <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white/78" />
              </div>
              <p className={`mt-2 text-sm ${featured ? "text-emerald-300" : "text-white/80"}`}>
                {flight.stops}
              </p>
              {flight.layover && <p className="text-sm text-white/62">{flight.layover}</p>}
            </div>
            <AirportTime
              time={flight.arriveTime}
              code={flight.arriveCode}
              city={flight.arriveCity}
              align="right"
            />
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/66">
            {flight.amenities.map((amenity) => (
              <Amenity key={amenity} label={amenity} />
            ))}
          </div>
        </div>

        <div className="border-white/8 lg:border-l lg:pl-5">
          <p className="text-2xl font-medium leading-none tracking-[0.04em] text-white">
            {flight.price}
          </p>
          <p className="mt-1 text-sm text-white/58">per person</p>
          <button
            type="button"
            className="mt-4 w-full rounded-md border border-[#d8aa4f] px-4 py-2.5 text-sm font-semibold text-[#f3b544] transition hover:bg-[#d8aa4f]/12"
          >
            View Deal
          </button>
          <button
            type="button"
            className="mt-3 flex items-center gap-1 text-sm font-semibold text-[#f3b544]"
          >
            Details & Fares
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

function AirlineMark({ airline }: { airline: string }) {
  const mark = airline === "Korean Air" ? "KE" : airline;

  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/18 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,.9),transparent_20%),linear-gradient(135deg,#b71c2b,#123d78)] text-[0.65rem] font-bold tracking-[0.06em] text-white shadow-[0_8px_22px_rgba(0,0,0,.28)]">
      {mark}
    </span>
  );
}

function AirportTime({
  time,
  code,
  city,
  align = "left",
}: {
  time: string;
  code: string;
  city: string;
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <p className="text-2xl font-light leading-tight tracking-[0.03em] text-white">{time}</p>
      <p className="mt-1 text-base text-white/88">{code}</p>
      <p className="text-sm text-white/58">{city}</p>
    </div>
  );
}

function Amenity({ label }: { label: string }) {
  const Icon =
    label.includes("Wi-Fi")
      ? Wifi
      : label.includes("Meal")
        ? Utensils
        : label.includes("Baggage")
          ? BriefcaseBusiness
          : Luggage;

  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className="h-4 w-4 text-white/58" />
      {label}
    </span>
  );
}

function FlexibleDatesBanner() {
  return (
    <Panel className="border-[#d8aa4f]/42 p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#d8aa4f]/55 text-[#f3b544]">
            <Clock3 className="h-5 w-5" />
          </span>
          <p className="text-base font-semibold text-white">Flexible with dates?</p>
          <p className="hidden text-sm text-white/74 sm:block">
            Save up to $210 by traveling 2 days earlier.
          </p>
        </div>
        <button
          type="button"
          className="rounded-md border border-[#d8aa4f] px-8 py-2.5 text-sm font-semibold text-[#f3b544] transition hover:bg-[#d8aa4f]/12"
        >
          View Price Calendar
        </button>
      </div>
      <p className="mt-3 text-sm text-white/74 sm:hidden">
        Save up to $210 by traveling 2 days earlier.
      </p>
    </Panel>
  );
}

function OtherWaysToTravel() {
  return (
    <Panel className="p-5">
      <h2 className="font-sans text-sm font-bold uppercase tracking-[0.12em] text-[#f3b544]">
        Other Ways to Travel
      </h2>
      <div className="mt-4 grid gap-2 md:grid-cols-4">
        {transportOptions.map(({ label, price, icon: Icon }, index) => (
          <button
            type="button"
            key={label}
            className={`flex min-h-16 items-center gap-3 rounded-md border px-4 py-3 text-left transition ${
              index === 1
                ? "border-[#d8aa4f]/44 bg-[#d8aa4f]/10"
                : "border-white/8 bg-white/[0.025] hover:border-[#d8aa4f]/38"
            }`}
          >
            <Icon className="h-6 w-6 shrink-0 text-[#f3b544]" />
            <span>
              <span className="block text-base font-semibold text-white">{label}</span>
              <span className="block text-sm text-white/64">{price}</span>
            </span>
          </button>
        ))}
      </div>
      <article className="mt-4 grid gap-4 rounded-lg border border-white/10 bg-[#061012]/72 p-4 md:grid-cols-[170px_minmax(0,1fr)_170px] md:items-center">
        <img
          src="https://images.unsplash.com/photo-1558017487-06bf9f82613a?auto=format&fit=crop&w=520&q=84"
          alt=""
          className="h-28 w-full rounded-md object-cover md:h-24"
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <h3 className="font-sans text-base font-semibold text-white">
              San Francisco → Osaka via Tokyo
            </h3>
          </div>
          <InfoMetric icon={Clock3} title="1 day 2h" detail="Total travel time" />
          <InfoMetric icon={Route} title="2 Transfers" detail="SFO → TYO → OSA" />
        </div>
        <div className="border-white/8 md:border-l md:pl-5">
          <p className="text-right text-sm text-white/62">
            from <span className="text-xl font-semibold text-emerald-300">$320</span> per person
          </p>
          <button
            type="button"
            className="mt-3 w-full rounded-md border border-[#d8aa4f] px-4 py-2.5 text-sm font-semibold text-[#f3b544]"
          >
            View Route
          </button>
          <button type="button" className="mt-3 w-full text-sm text-white/80">
            Details & Schedule <ChevronRight className="inline h-4 w-4" />
          </button>
        </div>
      </article>
    </Panel>
  );
}

function InfoMetric({
  icon: Icon,
  title,
  detail,
}: {
  icon: typeof Clock3;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex gap-2">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-white/76" />
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-sm text-white/62">{detail}</p>
      </div>
    </div>
  );
}

function RightSidebar() {
  return (
    <>
      <Panel className="p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-sans text-sm font-bold uppercase tracking-[0.12em] text-[#f3b544]">
            Your Trip
          </h2>
          <button type="button" className="text-sm text-white/64">
            Edit
          </button>
        </div>
        <div className="mt-5 flex gap-4">
          <img
            src="https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?auto=format&fit=crop&w=420&q=82"
            alt=""
            className="h-24 w-28 rounded-md object-cover"
          />
          <div className="min-w-0 py-1">
            <h3 className="font-sans text-base font-semibold text-white">San Francisco → Osaka</h3>
            <p className="mt-2 text-sm text-white/74">May 20 to May 27, 2025</p>
            <p className="mt-2 text-sm text-white/74">1 Traveler - Economy</p>
          </div>
        </div>
      </Panel>

      <Panel className="p-5">
        <div className="flex items-center gap-4">
          <Bell className="h-6 w-6 shrink-0 text-[#f3b544]" />
          <div className="min-w-0 flex-1">
            <h2 className="font-sans text-sm font-bold uppercase tracking-[0.12em] text-[#f3b544]">
              Price Watch
            </h2>
            <p className="mt-3 text-base text-white">Track this route</p>
            <p className="mt-1 text-sm text-white/64">Get alerts when prices drop.</p>
          </div>
          <button
            type="button"
            aria-label="Track this route"
            className="flex h-7 w-12 items-center justify-end rounded-full bg-[#d8aa4f] p-1"
          >
            <span className="h-5 w-5 rounded-full bg-white" />
          </button>
        </div>
      </Panel>

      <Panel className="p-5">
        <h2 className="font-sans text-sm font-bold uppercase tracking-[0.12em] text-[#f3b544]">
          Transport at Destination
        </h2>
        <div className="mt-4 space-y-4">
          {destinationTransport.map(({ title, meta, best, icon: Icon }) => (
            <article key={title} className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-[#d8aa4f]/14 text-[#f3b544]">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-sans text-base font-medium leading-snug text-white">{title}</h3>
                <p className="mt-1 text-sm text-white/66">{meta}</p>
                <p className="mt-1 text-sm text-white/66">{best}</p>
              </div>
            </article>
          ))}
        </div>
        <button type="button" className="mt-5 text-sm font-semibold text-[#f3b544]">
          View all transport options →
        </button>
      </Panel>

      <Panel className="p-5">
        <h2 className="font-sans text-sm font-bold uppercase tracking-[0.12em] text-[#f3b544]">
          Travel Tips
        </h2>
        <div className="mt-4 space-y-3">
          {travelTips.map((tip, index) => (
            <p key={tip} className="flex gap-3 text-sm leading-6 text-white/78">
              <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#d8aa4f]/60 text-[0.7rem] font-bold text-[#f3b544]">
                {index + 1}
              </span>
              {tip}
            </p>
          ))}
        </div>
      </Panel>

      <Panel className="p-5">
        <h2 className="font-sans text-sm font-bold uppercase tracking-[0.12em] text-[#f3b544]">
          Why Book With Journee
        </h2>
        <div className="mt-4 space-y-3">
          {guarantees.map((item) => (
            <p key={item} className="flex items-center gap-3 text-sm text-white/84">
              <Check className="h-4 w-4 text-[#f3b544]" />
              {item}
            </p>
          ))}
        </div>
        <button
          type="button"
          className="mt-5 w-full rounded-md border border-[#d8aa4f] px-4 py-3 text-sm font-semibold text-[#f3b544]"
        >
          Learn More
        </button>
      </Panel>
    </>
  );
}

function BusIcon({ className }: { className?: string }) {
  return <Filter className={className} />;
}
