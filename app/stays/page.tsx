/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import {
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Crown,
  Heart,
  Hotel,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Tag,
  UserRound,
  UsersRound,
  Wifi,
} from "lucide-react";
import { JourneeLogoMark } from "@/components/brand/JourneeLogo";

export const metadata: Metadata = {
  title: "Stays / Hotels",
  description:
    "A premium Journee stay discovery dashboard for hotels, ryokans, hostels, apartments, and solo traveler friendly accommodation.",
};

type Stay = {
  name: string;
  location: string;
  image: string;
  rating: string;
  tags: string[];
  guestRating: string;
  amenities: string[];
  price: string;
  total?: string;
};

const avatar =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80";

const recommendedStays: Stay[] = [
  {
    name: "MIMARU Kyoto Shinmachi Sanjo",
    location: "Kyoto, Japan",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1100&q=86",
    rating: "4.7",
    tags: ["Apartment", "Solo Friendly"],
    guestRating: "9.2 Superb",
    amenities: ["Free Wi-Fi"],
    price: "$112",
    total: "$448",
  },
  {
    name: "Sora Niwa Terrace Kyoto",
    location: "Kyoto, Japan",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1100&q=86",
    rating: "4.8",
    tags: ["Ryokan", "Onsen"],
    guestRating: "9.4 Superb",
    amenities: ["Breakfast incl."],
    price: "$196",
    total: "$784",
  },
  {
    name: "The Selena Hotel",
    location: "Bangkok, Thailand",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1100&q=86",
    rating: "4.6",
    tags: ["Boutique", "Solo Friendly"],
    guestRating: "9.1 Superb",
    amenities: ["Pool"],
    price: "$68",
    total: "$272",
  },
  {
    name: "Somerset Riverview Chengdu",
    location: "Chengdu, China",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1100&q=86",
    rating: "4.5",
    tags: ["Apartment", "Great Views"],
    guestRating: "9.0 Superb",
    amenities: ["Free Wi-Fi"],
    price: "$75",
    total: "$300",
  },
];

const soloFavorites: Stay[] = [
  {
    name: "Lub d Bangkok Siam",
    location: "Bangkok, Thailand",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=84",
    rating: "4.7",
    tags: ["Hostel"],
    guestRating: "9.3 Superb",
    amenities: [],
    price: "$28",
  },
  {
    name: "The Lane Hotel",
    location: "Yerevan, Armenia",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=84",
    rating: "4.6",
    tags: ["Boutique"],
    guestRating: "9.1 Superb",
    amenities: [],
    price: "$55",
  },
  {
    name: "9h nine hours Kyoto",
    location: "Kyoto, Japan",
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=900&q=84",
    rating: "4.6",
    tags: ["Capsule Hotel"],
    guestRating: "9.0 Superb",
    amenities: [],
    price: "$34",
  },
  {
    name: "Zoku Copenhagen",
    location: "Copenhagen, Denmark",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=84",
    rating: "4.7",
    tags: ["Apartment"],
    guestRating: "9.2 Superb",
    amenities: [],
    price: "$128",
  },
  {
    name: "Selina Tulum",
    location: "Tulum, Mexico",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=84",
    rating: "4.5",
    tags: ["Hostel"],
    guestRating: "8.9 Great",
    amenities: [],
    price: "$42",
  },
];

const stayStyles = [
  { label: "Boutique", icon: Hotel },
  { label: "Luxury", icon: Crown },
  { label: "Budget", icon: Tag },
  { label: "Ryokan", icon: Sparkles },
  { label: "Hostel", icon: UsersRound },
  { label: "Apartment", icon: Hotel },
];

const amenities = [
  "Free cancellation",
  "Breakfast included",
  "Free Wi-Fi",
  "Airport transfer",
  "Pool",
];

const recommendationLinks = [
  {
    title: "Best for Solo Travelers",
    copy: "Safe, social & comfortable stays",
    icon: UserRound,
  },
  {
    title: "Best Value",
    copy: "Top-rated stays under $100",
    icon: Tag,
  },
  {
    title: "Luxury Escapes",
    copy: "Indulge in something special",
    icon: Crown,
  },
];

const guides = [
  {
    title: "Best Areas to Stay in Kyoto",
    copy: "A guide to neighborhoods",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=360&q=80",
  },
  {
    title: "Solo Female Travel: Hotel Safety Tips",
    copy: "Stay safe & travel with peace of mind",
    image:
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=360&q=80",
  },
  {
    title: "Ryokan vs Hotel: Which is Right for You?",
    copy: "Find the perfect stay style",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=360&q=80",
  },
];

const navItems = ["Home", "Explore", "Map", "Trips", "Guides", "Journal", "Profile", "Stays"];

export default function StaysPage() {
  return (
    <main className="min-h-screen bg-[#030708] text-white">
      <TopNavigation />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_26%_0%,rgba(216,170,79,.16),transparent_30%),radial-gradient(circle_at_76%_12%,rgba(76,121,129,.14),transparent_28%),linear-gradient(180deg,#030708_0%,#071010_46%,#030708_100%)]" />
      <div className="relative mx-auto grid w-full max-w-[1920px] gap-6 px-4 pb-8 pt-20 sm:px-5 lg:px-6 2xl:grid-cols-[300px_minmax(0,1fr)_380px]">
        <aside className="hidden 2xl:block">
          <FiltersPanel />
        </aside>

        <section className="min-w-0 space-y-6">
          <MobileFilters />
          <HeroBanner />
          <StaySection
            title="Recommended Stays for You"
            stays={recommendedStays}
            variant="featured"
          />
          <StaySection
            title="Solo Traveler Favorites"
            stays={soloFavorites}
            variant="compact"
          />
          <AssuranceStrip />
        </section>

        <aside className="space-y-5 2xl:sticky 2xl:top-24 2xl:self-start">
          <RightSidebar />
        </aside>
      </div>
    </main>
  );
}

function TopNavigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/8 bg-[#020506]/82 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-[1920px] items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <JourneeLogoMark className="h-9 w-9 text-[#e0aa3e]" />
          <span className="font-sans text-2xl uppercase text-white">JOURNEE</span>
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={`relative px-4 py-5 text-sm font-medium transition ${
                item === "Stays" ? "text-[#f3b544]" : "text-white/88 hover:text-white"
              }`}
            >
              {item}
              {item === "Stays" && (
                <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-[#f3b544]" />
              )}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden min-w-[260px] max-w-[520px] flex-1 items-center rounded-full border border-white/12 bg-white/[0.045] px-4 py-2.5 text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,.08)] lg:flex">
          <Search className="mr-3 h-4 w-4 shrink-0 text-white/48" />
          <span className="truncate text-xs">Search stays, hotels, cities...</span>
        </div>
        <button className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/88" type="button" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </button>
        <img
          src={avatar}
          alt=""
          className="h-10 w-10 shrink-0 rounded-full border border-[#d8aa4f]/55 object-cover"
        />
        <button className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-white/86 lg:hidden" type="button" aria-label="Open menu">
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
    <div className={`rounded-lg border border-white/12 bg-[#071011]/78 shadow-[0_22px_70px_rgba(0,0,0,.34),inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-2xl ${className}`}>
      {children}
    </div>
  );
}

function FiltersPanel() {
  return (
    <Panel className="sticky top-24 p-5">
      <h2 className="font-sans text-xs font-bold uppercase text-[#f3b544]">Find Your Perfect Stay</h2>
      <div className="mt-5 space-y-3">
        <Field icon={MapPin} label="Where to?" />
        <Field icon={CalendarDays} label="May 20 - May 24" value="4 nights" />
        <Field icon={UserRound} label="1 Guest, 1 Room" chevron />
      </div>

      <FilterBlock title="Budget Per Night">
        <div className="flex justify-between text-[11px] text-white/62">
          <span>$0</span>
          <span>$500+</span>
        </div>
        <div className="mt-4 h-1.5 rounded-full bg-white/12">
          <div className="relative h-full w-full rounded-full bg-gradient-to-r from-[#d99932] to-[#f5b44a]">
            <span className="absolute -left-1.5 -top-1.5 h-4 w-4 rounded-full bg-[#f5b44a]" />
            <span className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full bg-[#f5b44a]" />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {["$50 - $150", "$150 - $300", "$300+"].map((chip, index) => (
            <button
              type="button"
              key={chip}
              className={`rounded-md border px-2 py-3 text-[11px] ${
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

      <FilterBlock title="Area / Neighborhood">
        <button type="button" className="flex w-full items-center justify-between rounded-md border border-white/10 bg-white/[0.035] px-3 py-3 text-sm text-white/88">
          All Areas
          <ChevronDown className="h-4 w-4 text-white/54" />
        </button>
      </FilterBlock>

      <FilterBlock title="Stay Style">
        <div className="grid grid-cols-3 gap-2">
          {stayStyles.map(({ label, icon: Icon }) => (
            <button key={label} type="button" className="min-h-14 rounded-md border border-white/8 bg-white/[0.04] px-2 py-3 text-center text-[11px] text-white/88 transition hover:border-[#d8aa4f]/55 hover:text-[#f3b544]">
              <Icon className="mx-auto mb-1.5 h-4 w-4 text-[#d8aa4f]" />
              {label}
            </button>
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Safety & Solo Travel">
        <label className="flex items-center gap-3 text-sm text-white/86">
          <span className="grid h-4 w-4 place-items-center rounded border border-[#d8aa4f]/70 bg-[#d8aa4f] text-[#160f05]">
            <Check className="h-3 w-3" />
          </span>
          Show solo traveler friendly only
        </label>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-xs text-white/58">Female traveler rating</span>
          <button type="button" className="flex min-w-20 items-center justify-between gap-3 rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-white/78">
            Any
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </FilterBlock>

      <FilterBlock title="Amenities">
        <div className="space-y-3">
          {amenities.map((amenity) => (
            <label key={amenity} className="flex items-center gap-3 text-sm text-white/86">
              <span className="h-4 w-4 rounded border border-white/55 bg-transparent" />
              {amenity}
            </label>
          ))}
        </div>
      </FilterBlock>

      <button type="button" className="mt-5 w-full rounded-md bg-gradient-to-r from-[#d39533] to-[#e6a944] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_42px_rgba(216,170,79,.24)]">
        Show 324 Stays
      </button>
    </Panel>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h3 className="mb-3 font-sans text-xs font-bold uppercase text-[#f3b544]">{title}</h3>
      {children}
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  chevron = false,
}: {
  icon: typeof MapPin;
  label: string;
  value?: string;
  chevron?: boolean;
}) {
  return (
    <div className="flex min-h-11 items-center rounded-md border border-white/10 bg-white/[0.035] px-3 text-sm text-white/82">
      <Icon className="mr-2.5 h-4 w-4 text-white/64" />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {value && <span className="ml-3 shrink-0 text-xs text-white/70">{value}</span>}
      {chevron && <ChevronDown className="ml-2 h-4 w-4 text-white/54" />}
    </div>
  );
}

function MobileFilters() {
  return (
    <details className="group 2xl:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg border border-white/12 bg-[#071011]/86 px-4 py-3 text-sm font-semibold text-white backdrop-blur-2xl">
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[#f3b544]" />
          Filters & stay preferences
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
        src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2200&q=88"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,8,.96)_0%,rgba(3,7,8,.76)_36%,rgba(3,7,8,.18)_76%),linear-gradient(180deg,rgba(3,7,8,.2),rgba(3,7,8,.5))]" />
      <div className="relative max-w-[680px] px-6 py-8 sm:px-9 lg:py-10">
        <p className="text-xs font-bold uppercase text-[#f3b544]">Stays, Curated for You</p>
        <h1 className="mt-4 max-w-[560px] font-sans text-[clamp(2.1rem,3.6vw,3.5rem)] leading-[1.04] text-white">
          Comfort that completes your journey.
        </h1>
        <p className="mt-5 max-w-[460px] text-base leading-7 text-white/88">
          Handpicked stays for every style, budget, and kind of traveler.
        </p>
        <div className="mt-7 flex flex-wrap gap-4">
          {[
            { label: "Solo Friendly", icon: UserRound },
            { label: "Safe & Verified", icon: ShieldCheck },
            { label: "Best Price Guarantee", icon: Tag },
          ].map(({ label, icon: Icon }) => (
            <span key={label} className="inline-flex items-center gap-2 text-sm text-white/88">
              <Icon className="h-5 w-5 text-[#f3b544]" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function StaySection({
  title,
  stays,
  variant,
}: {
  title: string;
  stays: Stay[];
  variant: "featured" | "compact";
}) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="font-sans text-sm font-bold uppercase text-[#f3b544]">{title}</h2>
        <button type="button" className="text-sm text-[#f3b544]">View all</button>
      </div>
      <div className={variant === "featured" ? "grid gap-4 sm:grid-cols-2 min-[1700px]:grid-cols-4" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 min-[1700px]:grid-cols-5"}>
        {stays.map((stay) => (
          <StayCard key={stay.name} stay={stay} variant={variant} />
        ))}
      </div>
    </section>
  );
}

function StayCard({ stay, variant }: { stay: Stay; variant: "featured" | "compact" }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-white/12 bg-[#071011]/86 shadow-[0_20px_60px_rgba(0,0,0,.28)] transition hover:-translate-y-1 hover:border-[#d8aa4f]/48">
      <div className={`relative ${variant === "featured" ? "h-44" : "h-36"}`}>
        <img src={stay.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071011] via-transparent to-black/18" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded bg-[#10100b]/86 px-2 py-1 text-xs font-bold text-[#f3b544]">
          <Star className="h-3.5 w-3.5 fill-[#f3b544]" />
          {stay.rating}
        </span>
        <button type="button" aria-label={`Save ${stay.name}`} className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/38 text-white backdrop-blur">
          <Heart className="h-4 w-4" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-sans text-base font-semibold leading-snug text-white">{stay.name}</h3>
        <p className="mt-2 flex items-center gap-1 text-xs text-white/72">
          <MapPin className="h-3.5 w-3.5" />
          {stay.location}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {stay.tags.map((tag) => (
            <span key={tag} className="rounded border border-white/12 bg-white/[0.035] px-2 py-1 text-[11px] text-white/80">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/72">
          <span className="inline-flex items-center gap-1 text-[#f3b544]">
            <Star className="h-3.5 w-3.5" />
            {stay.guestRating}
          </span>
          {stay.amenities.map((amenity) => (
            <span key={amenity} className="inline-flex items-center gap-1">
              <Wifi className="h-3.5 w-3.5 text-[#f3b544]" />
              {amenity}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-end justify-between gap-3">
          <p className="text-lg font-semibold text-white">
            {stay.price} <span className="text-xs font-normal text-white/64">/ night</span>
          </p>
          {stay.total && <p className="text-xs text-white/62">Total {stay.total}</p>}
        </div>
      </div>
    </article>
  );
}

function AssuranceStrip() {
  const items = [
    { title: "Solo Traveler Support", copy: "Stays selected with solo travelers in mind.", icon: UserRound },
    { title: "Safety First", copy: "High safety ratings & verified reviews from real guests.", icon: ShieldCheck },
    { title: "Flexible Booking", copy: "Free cancellation on most stays.", icon: Hotel },
    { title: "24/7 Support", copy: "We're here whenever you need us.", icon: Bell },
  ];

  return (
    <Panel className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(({ title, copy, icon: Icon }) => (
        <div key={title} className="flex gap-4 border-white/8 2xl:border-r 2xl:pr-4 last:border-r-0">
          <Icon className="mt-1 h-7 w-7 shrink-0 text-[#f3b544]" />
          <div>
            <h3 className="font-sans text-sm font-semibold text-[#f3b544]">{title}</h3>
            <p className="mt-1 text-xs leading-5 text-white/68">{copy}</p>
          </div>
        </div>
      ))}
    </Panel>
  );
}

function RightSidebar() {
  return (
    <>
      <Panel className="p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-sans text-xs font-bold uppercase text-[#f3b544]">Where You&apos;re Going</h2>
          <button type="button" className="text-xs text-white/84">Edit</button>
        </div>
        <div className="mt-5 flex gap-4">
          <img
            src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=420&q=82"
            alt=""
            className="h-24 w-28 rounded-md object-cover"
          />
          <div className="min-w-0 py-1">
            <h3 className="font-sans text-base font-semibold text-white">Kyoto, Japan</h3>
            <p className="mt-2 text-sm text-white/74">May 20 - May 24, 2025</p>
            <p className="mt-2 text-sm text-white/74">1 Guest - 1 Room</p>
          </div>
        </div>
      </Panel>

      <Panel className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-sans text-xs font-bold uppercase text-[#f3b544]">Stay Recommendations</h2>
          <button type="button" className="text-xs text-white/84">View all</button>
        </div>
        <div className="divide-y divide-white/8">
          {recommendationLinks.map(({ title, copy, icon: Icon }) => (
            <button key={title} type="button" className="flex w-full items-center gap-4 py-4 text-left">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-[#d8aa4f]/14 text-[#f3b544]">
                <Icon className="h-6 w-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-white">{title}</span>
                <span className="mt-1 block text-xs text-white/62">{copy}</span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-white/82" />
            </button>
          ))}
        </div>
      </Panel>

      <Panel className="p-5">
        <h2 className="font-sans text-xs font-bold uppercase text-[#f3b544]">Stay Guides</h2>
        <div className="mt-5 space-y-4">
          {guides.map((guide) => (
            <article key={guide.title} className="flex gap-4">
              <img src={guide.image} alt="" className="h-20 w-24 shrink-0 rounded-md object-cover" />
              <div className="min-w-0">
                <h3 className="font-sans text-sm font-semibold leading-snug text-white">{guide.title}</h3>
                <p className="mt-1 text-xs leading-5 text-white/64">{guide.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </Panel>

      <Panel className="p-5">
        <h2 className="font-sans text-xs font-bold uppercase text-[#f3b544]">Why Book With Journee?</h2>
        <div className="mt-5 space-y-3">
          {[
            "Best price guarantee",
            "Handpicked quality stays",
            "Trusted by solo travelers",
            "Secure booking",
          ].map((item) => (
            <p key={item} className="flex items-center gap-3 text-sm text-white/84">
              <Check className="h-4 w-4 text-[#f3b544]" />
              {item}
            </p>
          ))}
        </div>
        <button type="button" className="mt-5 w-full rounded-md border border-[#d8aa4f] px-4 py-3 text-sm font-semibold text-[#f3b544]">
          Learn More
        </button>
      </Panel>
    </>
  );
}
