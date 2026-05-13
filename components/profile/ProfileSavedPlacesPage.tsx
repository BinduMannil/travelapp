"use client";

import Image from "next/image";
import {
  Bell,
  MoreVertical,
  Search,
} from "lucide-react";
import { JourneeBrand } from "@/components/brand/JourneeLogo";
import { useI18n } from "@/lib/i18n/context";
import { MainNavLink } from "@/components/navigation/MainNavLink";
import { LanguagePicker } from "@/components/layout/LanguagePicker";
import { PreferencesMenu } from "@/components/layout/PreferencesMenu";

type Stat = {
  label: string;
  value: string;
  note: string;
};

type SavedPlace = {
  title: string;
  location: string;
  image: string;
};

type SavedTrip = {
  title: string;
  status: string;
  dates: string;
  locations: string;
  length: string;
  image: string;
};

type JournalEntry = {
  title: string;
  date: string;
  place: string;
  image: string;
};

const navItems = ["Home", "Explore", "Map", "Trips", "Guides", "Journal", "Profile"];

const menuItems = [
  { label: "Overview", active: true },
  { label: "Saved Places" },
  { label: "Saved Trips" },
  { label: "Wishlist" },
  { label: "Travel History" },
  { label: "Preferences" },
  { label: "Travel Stats" },
  { label: "Journal Entries" },
  { label: "Account Settings" },
  { label: "Notifications" },
  { label: "Privacy & Security" },
];

const stats: Stat[] = [
  { label: "Trips", value: "12", note: "3 Upcoming" },
  { label: "Saved Places", value: "48", note: "12 New" },
  { label: "Wishlist Items", value: "28", note: "4 New" },
  { label: "Countries Visited", value: "9", note: "2 This Year" },
  { label: "Journal Entries", value: "156", note: "22 This Year" },
];

const savedPlaces: SavedPlace[] = [
  {
    title: "Kiyomizu-dera Temple",
    location: "Kyoto, Japan",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=700&q=86",
  },
  {
    title: "Arashiyama Bamboo Grove",
    location: "Kyoto, Japan",
    image:
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=700&q=86",
  },
  {
    title: "Pontocho Alley",
    location: "Kyoto, Japan",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=700&q=86",
  },
  {
    title: "Positano",
    location: "Amalfi Coast, Italy",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=700&q=86",
  },
  {
    title: "Lago di Braies",
    location: "Dolomites, Italy",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=700&q=86",
  },
];

const savedTrips: SavedTrip[] = [
  {
    title: "Japan Spring Adventure",
    status: "Upcoming",
    dates: "May 10 - May 16, 2025",
    locations: "Kyoto, Tokyo, Fuji",
    length: "7 Days",
    image: savedPlaces[0].image,
  },
  {
    title: "Amalfi Coast Escape",
    status: "Upcoming",
    dates: "Jun 22 - Jun 29, 2025",
    locations: "Positano, Ravello, Capri",
    length: "8 Days",
    image: savedPlaces[3].image,
  },
  {
    title: "Swiss Alps & Lakes",
    status: "Planning",
    dates: "Aug 15 - Aug 24, 2025",
    locations: "Interlaken, Zermatt, Lucerne",
    length: "10 Days",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=86",
  },
  {
    title: "Bali Wellness Retreat",
    status: "Wishlist",
    dates: "Oct 5 - Oct 12, 2025",
    locations: "Ubud, Canggu, Uluwatu",
    length: "8 Days",
    image:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=900&q=86",
  },
];

const journalEntries: JournalEntry[] = [
  {
    title: "A Rainy Morning in Higashiyama",
    date: "May 12",
    place: "Kyoto, Japan",
    image: savedPlaces[2].image,
  },
  {
    title: "Walking Through the Bamboo Forest",
    date: "May 11",
    place: "Arashiyama, Kyoto",
    image: savedPlaces[1].image,
  },
  {
    title: "My First Tea Ceremony",
    date: "May 10",
    place: "Gion, Kyoto",
    image:
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=700&q=86",
  },
  {
    title: "Thousands of Torii Gates",
    date: "May 10",
    place: "Fushimi Inari, Kyoto",
    image:
      "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=700&q=86",
  },
  {
    title: "Sunset Views from Kiyomizu-dera",
    date: "May 9",
    place: "Kyoto, Japan",
    image: savedPlaces[0].image,
  },
];

const travelStyle = [
  { label: "Culture", value: 90 },
  { label: "Nature", value: 80 },
  { label: "Food", value: 75 },
  { label: "Relaxation", value: 60 },
  { label: "Adventure", value: 40 },
];

function routeFor(item: string) {
  if (item === "Home") return "/";
  if (item === "Explore") return "/explore";
  if (item === "Map") return "/atlas";
  return `/${item.toLowerCase().replaceAll(" ", "-")}`;
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
      className={`rounded-[8px] border border-white/12 bg-[#071011]/82 shadow-[0_22px_80px_rgba(0,0,0,.34),inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-xl ${className}`}
    >
      {children}
    </section>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="font-sans text-[0.98rem] font-semibold tracking-[-0.01em] text-white">
        {title}
      </h2>
      <a href="#" className="text-xs font-medium text-[#d9a646] transition hover:text-[#f3cd7d]">
        View all
      </a>
    </div>
  );
}

function ProfileMenu({ compact = false }: { compact?: boolean }) {
  return (
    <nav className={compact ? "grid grid-cols-2 gap-2 sm:grid-cols-3" : "space-y-1"}>
      {menuItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex min-h-10 items-center rounded-[6px] px-3 py-2 text-sm transition ${
              item.active
                ? "border-l-2 border-[#d9a646] bg-[#d9a646]/14 text-[#e6b85f]"
                : "text-white/82 hover:bg-white/[0.055] hover:text-white"
            }`}
          >
            <span className="truncate">{item.label}</span>
          </a>
        ))}
    </nav>
  );
}

function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#030707]/84 backdrop-blur-2xl">
      <div className="flex h-[74px] items-center gap-5 px-4 sm:px-6 xl:px-8">
        <a href="/" aria-label="JOURNEE home" className="shrink-0">
          <JourneeBrand
            direction="atlas-aperture"
            className="[&>span:first-child]:h-9 [&>span:first-child]:w-9 [&>span:first-child]:rounded-none [&>span:first-child]:border-0 [&>span:first-child]:bg-transparent [&>span:first-child]:shadow-none [&>span:first-child_svg]:h-8 [&>span:first-child_svg]:w-8 [&>span:last-child]:text-2xl [&>span:last-child]:font-medium [&>span:last-child]:tracking-[0.12em]"
          />
        </a>

        <nav className="hidden items-center gap-6 text-[0.82rem] font-medium text-white/84 lg:flex">
          {navItems.map((item) => (
            <MainNavLink
              key={item}
              label={item}
              href={routeFor(item)}
              className="relative py-7 transition hover:text-[#e2ad50]"
              activeClassName="text-[#e2ad50]"
              underlineClassName="absolute inset-x-0 bottom-0 h-0.5 bg-[#e2ad50]"
            />
          ))}
        </nav>

        <div className="ml-auto hidden min-w-[240px] max-w-[520px] flex-1 items-center gap-3 rounded-full border border-white/15 bg-white/[0.035] px-4 py-2.5 text-white/58 shadow-inner shadow-white/5 md:flex">
          <Search className="h-4 w-4 text-white/72" />
          <span className="truncate text-[0.78rem]">Search destinations, places, guides...</span>
        </div>
        <button
          aria-label="Notifications"
          className="grid h-10 w-10 place-items-center rounded-full text-white/84 transition hover:bg-white/8 hover:text-[#e2ad50]"
        >
          <Bell className="h-5 w-5" />
        </button>
        <Image
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
          alt="Emma Walker"
          width={42}
          height={42}
          className="h-10 w-10 rounded-full border-2 border-[#d9a756]/55 object-cover"
        />
      </div>
    </header>
  );
}

function LeftSidebar() {
  return (
    <aside className="xl:sticky xl:top-[90px] xl:self-start">
      <GlassPanel className="overflow-hidden">
        <div className="px-5 py-7 text-center">
          <Image
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=220&q=82"
            alt="Emma Walker profile"
            width={96}
            height={96}
            className="mx-auto h-24 w-24 rounded-full border-2 border-[#d9a646] object-cover shadow-[0_0_44px_rgba(217,166,70,.22)]"
          />
          <div className="mt-4 flex items-center justify-center gap-2">
            <h1 className="font-sans text-lg font-semibold tracking-[-0.02em] text-white">
              Emma Walker
            </h1>
            <span className="rounded-[5px] border border-[#d9a646]/45 bg-[#d9a646]/12 px-1.5 py-0.5 text-[0.62rem] font-semibold text-[#e5b65b]">
              Explorer
            </span>
          </div>
          <p className="mt-2 text-xs text-white/55">emmawalker@gmail.com</p>
          <p className="mt-3 text-xs text-white/72">
            San Francisco, CA
          </p>
          <p className="mx-auto mt-5 max-w-[13rem] text-sm italic leading-6 text-white/70">
            “Collect moments, not things.”
          </p>
          <button className="mt-5 inline-flex h-9 items-center justify-center gap-2 rounded-[6px] border border-white/14 bg-white/[0.035] px-4 text-xs font-medium text-white/86 transition hover:border-[#d9a646]/50 hover:text-[#edc674]">
            Edit Profile
          </button>
        </div>

        <div className="border-t border-white/10 p-4 lg:block">
          <div className="hidden xl:block">
            <ProfileMenu />
          </div>
          <details className="group xl:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-[6px] border border-white/12 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-white">
              Profile Menu
              <span className="text-[#d9a646]">Open</span>
            </summary>
            <div className="mt-3">
              <ProfileMenu compact />
            </div>
          </details>
        </div>

        <div className="border-t border-white/10 p-4">
          <div className="rounded-[8px] border border-[#d9a646]/18 bg-[linear-gradient(135deg,rgba(217,166,70,.16),rgba(255,255,255,.035))] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
              Journee Pro
            </p>
            <p className="mt-4 text-xs leading-5 text-white/72">
              Unlock exclusive guides, offline maps, advanced trip planning.
            </p>
            <button className="mt-5 h-10 w-full rounded-[6px] bg-gradient-to-r from-[#d7a04a] to-[#f0c571] text-sm font-bold text-[#211407] shadow-[0_14px_34px_rgba(217,166,70,.2)]">
              Upgrade Now
            </button>
          </div>
        </div>
      </GlassPanel>
    </aside>
  );
}

function StatsGrid() {
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[8px] border border-white/10 bg-black/16 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.04)]"
          >
            <p className="text-2xl font-bold leading-none text-white">{stat.value}</p>
            <p className="mt-2 text-xs text-white/78">{stat.label}</p>
            <p className="mt-1 text-[0.7rem] text-white/48">{stat.note}</p>
          </div>
        ))}
    </div>
  );
}

function SavedPlaceCard({ place }: { place: SavedPlace }) {
  return (
    <article className="group relative min-h-[178px] overflow-hidden rounded-[8px] border border-white/12 bg-[#0c1414]">
      <Image
        src={place.image}
        alt={place.title}
        fill
        sizes="(min-width: 1280px) 180px, (min-width: 768px) 28vw, 92vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.72))]" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        <h3 className="truncate font-sans text-sm font-semibold text-white">{place.title}</h3>
        <p className="mt-1 text-[0.7rem] text-white/76">
          {place.location}
        </p>
      </div>
    </article>
  );
}

function TripCard({ trip }: { trip: SavedTrip }) {
  return (
    <article className="group relative min-h-[214px] overflow-hidden rounded-[8px] border border-white/12 bg-[#0c1414]">
      <Image
        src={trip.image}
        alt={trip.title}
        fill
        sizes="(min-width: 1280px) 230px, (min-width: 768px) 36vw, 92vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.78))]" />
      <div className="absolute left-3 top-3 rounded-full border border-[#d9a646]/30 bg-black/54 px-2.5 py-1 text-[0.68rem] font-semibold text-[#d9a646] backdrop-blur">
        {trip.status}
      </div>
      <button
        aria-label={`More options for ${trip.title}`}
        className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/32 text-white/78 backdrop-blur"
      >
        <MoreVertical className="h-4 w-4" />
      </button>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="font-sans text-sm font-semibold text-white">{trip.title}</h3>
        <p className="mt-1 text-[0.72rem] text-white/78">{trip.dates}</p>
        <p className="mt-2 text-[0.72rem] text-white/72">
          {trip.locations}
        </p>
        <p className="mt-1 text-[0.72rem] text-white/72">
          {trip.length}
        </p>
      </div>
    </article>
  );
}

function JournalCard({ entry }: { entry: JournalEntry }) {
  const [month, day] = entry.date.split(" ");

  return (
    <article className="group relative min-h-[168px] overflow-hidden rounded-[8px] border border-white/12 bg-[#0c1414]">
      <Image
        src={entry.image}
        alt={entry.title}
        fill
        sizes="(min-width: 1280px) 180px, (min-width: 768px) 28vw, 92vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.12),rgba(0,0,0,.82))]" />
      <div className="absolute left-3 top-3 grid h-10 w-9 place-items-center rounded-[6px] border border-[#d9a646]/35 bg-black/50 text-center text-[#e4b45b] backdrop-blur">
        <span className="block text-[0.58rem] font-bold uppercase leading-none">{month}</span>
        <span className="block text-sm font-semibold leading-none">{day}</span>
      </div>
      <button
        aria-label={`More options for ${entry.title}`}
        className="absolute right-3 top-3 text-white/74"
      >
        <MoreVertical className="h-4 w-4" />
      </button>
      <div className="absolute inset-x-0 bottom-0 p-3">
        <h3 className="line-clamp-2 font-sans text-sm font-semibold leading-5 text-white">
          {entry.title}
        </h3>
        <p className="mt-1 text-[0.7rem] text-white/72">
          {entry.place}
        </p>
      </div>
    </article>
  );
}

function UpcomingTrips() {
  return (
    <GlassPanel className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-sans text-base font-semibold text-white">Upcoming Trips</h2>
        <a href="#" className="text-xs text-white/68 transition hover:text-[#d9a646]">
          View all
        </a>
      </div>
      <div className="space-y-4">
        {savedTrips.slice(0, 2).map((trip, index) => (
          <article key={trip.title} className="flex gap-3">
            <div className="relative h-[86px] w-[116px] shrink-0 overflow-hidden rounded-[7px] border border-white/10">
              <Image src={trip.image} alt="" fill sizes="116px" className="object-cover" />
            </div>
            <div className="min-w-0 py-1">
              <h3 className="truncate font-sans text-sm font-semibold text-white">{trip.title}</h3>
              <p className="mt-2 text-xs text-white/62">{trip.dates}</p>
              <p className="mt-2 inline-flex rounded-[5px] border border-[#d9a646]/30 bg-[#d9a646]/9 px-2 py-0.5 text-[0.68rem] text-[#d9a646]">
                In {index === 0 ? 18 : 61} days
              </p>
            </div>
          </article>
        ))}
      </div>
      <button className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-[6px] border border-[#d9a646]/55 bg-[#d9a646]/5 text-sm font-medium text-[#e3ad52] transition hover:bg-[#d9a646]/12">
        New Trip
      </button>
    </GlassPanel>
  );
}

function TravelStyle() {
  return (
    <GlassPanel className="p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-sans text-base font-semibold text-white">Travel Style</h2>
        <a href="#" className="text-xs text-white/58 transition hover:text-[#d9a646]">
          Edit
        </a>
      </div>
      <div className="space-y-4">
        {travelStyle.map((style) => (
            <div key={style.label} className="grid grid-cols-[88px_1fr_38px] items-center gap-3">
              <p className="text-sm text-white/84">
                {style.label}
              </p>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#c88d39] to-[#e7b965]"
                  style={{ width: `${style.value}%` }}
                />
              </div>
              <p className="text-right text-xs text-white/78">{style.value}%</p>
            </div>
          ))}
      </div>
      <div className="mt-6 flex items-center gap-3 rounded-[7px] border border-white/8 bg-white/[0.025] px-3 py-3 text-[#d9a646]">
        <span className="text-sm font-medium">Balanced Explorer</span>
        <span className="ml-auto text-white/40">›</span>
      </div>
    </GlassPanel>
  );
}

function TravelMap() {
  return (
    <GlassPanel className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-sans text-base font-semibold text-white">Travel Map</h2>
        <a href="#" className="text-xs text-[#d9a646] transition hover:text-[#f3cd7d]">
          View map
        </a>
      </div>
      <div className="relative h-36 overflow-hidden rounded-[8px] border border-white/8 bg-[#091314]">
        <div
          className="absolute inset-0 opacity-[0.34] grayscale"
          style={{
            backgroundImage:
              "url(https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "105% auto",
          }}
        />
        <div className="absolute left-[18%] top-[48%] h-5 w-12 rotate-12 rounded-full bg-[#d9a646]/55 blur-[1px]" />
        <div className="absolute left-[47%] top-[37%] h-4 w-8 -rotate-12 rounded-full bg-[#d9a646]/60 blur-[1px]" />
        <div className="absolute left-[66%] top-[50%] h-5 w-12 rotate-12 rounded-full bg-[#d9a646]/60 blur-[1px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent,rgba(0,0,0,.38))]" />
      </div>
      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="text-white/82">Countries Visited</span>
        <span className="text-white/72">9 / 50</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/12">
        <div className="h-full w-[18%] rounded-full bg-gradient-to-r from-[#c88d39] to-[#f0c571]" />
      </div>
      <div className="mt-5 border-t border-white/10 pt-4 text-sm text-white/74">
        Next Milestone: Visit 10 countries
      </div>
    </GlassPanel>
  );
}

function PreferenceSettingsCard() {
  const { t } = useI18n();

  return (
    <GlassPanel className="p-5 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="max-w-2xl">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#d9a646]">
            {t("settings.travelPreferences")}
          </p>
          <h2 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">
            {t("settings.currencyAndUnits")}
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/66">
            {t("settings.preferenceDescription")}
          </p>
        </div>
        <div className="grid gap-4 rounded-[14px] border border-white/10 bg-white/[0.035] p-4 shadow-inner shadow-white/5">
          <LanguagePicker />
          <PreferencesMenu stacked />
          <p className="text-xs leading-5 text-white/48">{t("settings.savedLocally")}</p>
        </div>
      </div>
    </GlassPanel>
  );
}

export function ProfileSavedPlacesPage() {
  return (
    <main className="min-h-screen bg-[#030707] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_48%_0%,rgba(209,158,67,.14),transparent_30%),linear-gradient(120deg,#020505,#071213_46%,#030606)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,.026)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)] bg-[size:56px_56px] opacity-45" />

      <TopNav />

      <div className="mx-auto grid w-full max-w-[1700px] gap-5 px-4 py-5 sm:px-6 xl:grid-cols-[250px_minmax(0,1fr)_320px] xl:px-8">
        <LeftSidebar />

        <div className="space-y-3">
          <GlassPanel className="px-5 py-6 sm:px-7">
            <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Welcome back, Emma ✨
            </h1>
            <p className="mt-2 text-sm text-white/66">Here&apos;s your travel world at a glance.</p>
            <StatsGrid />
          </GlassPanel>

          <PreferenceSettingsCard />

          <GlassPanel className="p-4 sm:p-5">
            <SectionHeader title="Saved Places" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
              {savedPlaces.map((place) => (
                <SavedPlaceCard key={place.title} place={place} />
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="p-4 sm:p-5">
            <SectionHeader title="Saved Trips" />
            <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-4">
              {savedTrips.map((trip) => (
                <TripCard key={trip.title} trip={trip} />
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="p-4 sm:p-5">
            <SectionHeader title="Recent Journal Entries" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
              {journalEntries.map((entry) => (
                <JournalCard key={entry.title} entry={entry} />
              ))}
            </div>
          </GlassPanel>
        </div>

        <aside className="grid gap-3 lg:grid-cols-2 xl:sticky xl:top-[90px] xl:grid-cols-1 xl:self-start">
          <UpcomingTrips />
          <TravelStyle />
          <TravelMap />
        </aside>
      </div>
    </main>
  );
}
