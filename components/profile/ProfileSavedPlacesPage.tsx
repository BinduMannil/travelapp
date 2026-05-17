"use client";

import Image from "next/image";
import { useId, useState } from "react";
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

type ProfileSummary = {
  name: string;
  email: string;
  location: string;
  tier: string;
  status: string;
  memberSince: string;
  avatar: string;
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

const profileSummary: ProfileSummary = {
  name: "Emma Walker",
  email: "emmawalker@gmail.com",
  location: "San Francisco, CA",
  tier: "Explorer",
  status: "Active",
  memberSince: "May 12, 2024",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=220&q=82",
};

const profileTabs = [
  "Preferences",
  "Account",
  "Travel Preferences",
  "Notifications",
  "Privacy & Security",
  "Payment & Billing",
  "Accessibility",
  "Connected Accounts",
  "Data & Storage",
] as const;

type ProfileTab = (typeof profileTabs)[number];

const membershipStats: Stat[] = [
  { label: "Member Since", value: profileSummary.memberSince, note: "Curated traveler profile" },
  { label: "Loyalty Level", value: profileSummary.tier, note: "Journee membership" },
  { label: "Account Status", value: profileSummary.status, note: "Concierge ready" },
  { label: "Countries Visited", value: "9", note: "2 This Year" },
  { label: "Saved Journeys", value: "48", note: "12 New" },
  { label: "Upcoming Trips", value: "3", note: "Next: Kyoto" },
];

const accountHeroStats: Stat[] = [
  { label: "Countries", value: "9", note: "Visited" },
  { label: "Saved journeys", value: "48", note: "Curated" },
  { label: "Upcoming", value: "3", note: "Trips" },
];

const preferenceDetails = [
  { label: "Travel Style", value: "Balanced Explorer" },
  { label: "Preferred Destinations", value: "Japan, Italy, Alpine escapes" },
  { label: "Budget Preference", value: "Premium boutique stays" },
  { label: "Language", value: "English" },
  { label: "Units & Currency", value: "Miles, USD" },
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
      <a href="/profile" className="text-xs font-medium text-[#d9a646] transition hover:text-[#f3cd7d]">
        View all
      </a>
    </div>
  );
}

function ProfileMenu({
  activeTab,
  compact = false,
  onTabChange,
}: {
  activeTab: ProfileTab;
  compact?: boolean;
  onTabChange: (tab: ProfileTab) => void;
}) {
  const tablistId = useId();

  function focusTab(index: number) {
    const nextTab = document.getElementById(`${tablistId}-${index}`);
    nextTab?.focus();
    onTabChange(profileTabs[index]);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      focusTab((index + 1) % profileTabs.length);
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      focusTab((index - 1 + profileTabs.length) % profileTabs.length);
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusTab(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      focusTab(profileTabs.length - 1);
    }
  }

  return (
    <div
      role="tablist"
      aria-label="Profile settings"
      aria-orientation={compact ? "horizontal" : "vertical"}
      className={compact ? "grid grid-cols-2 gap-2 sm:grid-cols-3" : "space-y-1"}
    >
      {profileTabs.map((tab, index) => {
        const selected = activeTab === tab;

        return (
          <button
            key={tab}
            id={`${tablistId}-${index}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`profile-tab-panel-${tab.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onTabChange(tab)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`flex min-h-10 w-full items-center rounded-[6px] px-3 py-2 text-left text-sm transition focus:outline-none focus:ring-2 focus:ring-[#d9a646]/55 ${
              selected
                ? "border-l-2 border-[#d9a646] bg-[#d9a646]/14 text-[#e6b85f]"
                : "text-white/82 hover:bg-white/[0.055] hover:text-white"
            }`}
          >
            <span className="truncate">{tab}</span>
          </button>
        );
      })}
    </div>
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
          src={profileSummary.avatar}
          alt={profileSummary.name}
          width={42}
          height={42}
          className="h-10 w-10 rounded-full border-2 border-[#d9a756]/55 object-cover"
        />
      </div>
    </header>
  );
}

function LeftSidebar({
  activeTab,
  onTabChange,
}: {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}) {
  return (
    <aside className="order-2 xl:sticky xl:top-[90px] xl:order-1 xl:self-start">
      <GlassPanel className="overflow-hidden">
        <div className="px-5 py-5">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#d9a646]">
            Profile
          </p>
          <p className="mt-2 text-sm leading-6 text-white/66">
            Navigate your saved journeys, preferences and account controls.
          </p>
        </div>

        <div className="border-t border-white/10 p-4 lg:block">
          <div className="hidden xl:block">
            <ProfileMenu activeTab={activeTab} onTabChange={onTabChange} />
          </div>
          <details className="group xl:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-[6px] border border-white/12 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-white">
              {activeTab}
              <span className="text-[#d9a646]">Open</span>
            </summary>
            <div className="mt-3">
              <ProfileMenu activeTab={activeTab} compact onTabChange={onTabChange} />
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

function AccountSummaryHero() {
  return (
    <GlassPanel className="relative overflow-hidden px-5 py-9 sm:px-8 sm:py-12 lg:px-12">
      <div className="absolute inset-0 opacity-70">
        <Image
          src={savedPlaces[0].image}
          alt=""
          fill
          priority
          sizes="(min-width: 1280px) 1000px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,7,.97),rgba(3,7,7,.86)_48%,rgba(3,7,7,.62)),linear-gradient(180deg,rgba(3,7,7,.22),rgba(3,7,7,.94))]" />
      </div>

      <div className="relative grid gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)] lg:items-end">
        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#e1ad52]">
            Account Summary
          </p>
          <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-center">
            <Image
              src={profileSummary.avatar}
              alt={`${profileSummary.name} profile`}
              width={132}
              height={132}
              className="h-28 w-28 rounded-full border-2 border-[#d9a646]/80 object-cover shadow-[0_0_56px_rgba(217,166,70,.28)] sm:h-32 sm:w-32"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-sans text-3xl font-semibold leading-none tracking-[-0.03em] text-white sm:text-5xl">
                  {profileSummary.name}
                </h1>
                <span className="rounded-full border border-[#d9a646]/45 bg-[#d9a646]/14 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#edc674]">
                  {profileSummary.tier}
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70">
                <span>{profileSummary.email}</span>
                <span>{profileSummary.location}</span>
              </div>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/78">
                A cinematic travel profile shaped around culture-first journeys, boutique stays and quiet concierge planning.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[8px] border border-white/10 bg-black/26 p-5 backdrop-blur-md">
          <p className="text-sm font-semibold text-white">Travel snapshot</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {accountHeroStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-semibold leading-none text-white">{stat.value}</p>
                <p className="mt-2 text-[0.68rem] leading-4 text-white/58">{stat.label}</p>
                <p className="mt-1 text-[0.64rem] leading-4 text-white/42">{stat.note}</p>
              </div>
            ))}
          </div>
          <a
            href="/settings"
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-[6px] bg-gradient-to-r from-[#d7a04a] to-[#f0c571] px-5 text-sm font-bold text-[#211407] shadow-[0_16px_38px_rgba(217,166,70,.22)] transition hover:brightness-110"
          >
            Edit Profile
          </a>
        </div>
      </div>
    </GlassPanel>
  );
}

function MembershipStats() {
  return (
    <GlassPanel className="p-4 sm:p-5">
      <SectionHeader title="Quick Stats / Membership" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
        {membershipStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[8px] border border-white/9 bg-white/[0.028] p-4"
          >
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white/46">
              {stat.label}
            </p>
            <p className="mt-3 text-lg font-semibold text-white">{stat.value}</p>
            <p className="mt-1 text-xs leading-5 text-white/54">{stat.note}</p>
          </div>
        ))}
      </div>
    </GlassPanel>
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
        className="object-cover brightness-[0.82] saturate-[0.94] contrast-[1.04] transition duration-500 group-hover:scale-105 group-hover:brightness-[0.88]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(0,0,0,.12),rgba(0,0,0,.42)_58%,rgba(0,0,0,.72)_100%),linear-gradient(180deg,rgba(0,0,0,.18),rgba(0,0,0,.28)_38%,rgba(0,0,0,.9))]" />
      <div className="absolute inset-x-0 bottom-0 h-[68%] bg-[linear-gradient(180deg,transparent,rgba(0,0,0,.64)_48%,rgba(0,0,0,.94))]" />
      <div className="absolute inset-x-0 bottom-0 p-4 pt-12">
        <h3 className="truncate font-sans text-sm font-semibold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,.95)]">{place.title}</h3>
        <p className="mt-1.5 text-[0.72rem] font-medium text-white/86 drop-shadow-[0_1px_8px_rgba(0,0,0,.9)]">
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
        className="object-cover brightness-[0.8] saturate-[0.95] contrast-[1.05] transition duration-500 group-hover:scale-105 group-hover:brightness-[0.87]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_18%,rgba(0,0,0,.08),rgba(0,0,0,.36)_48%,rgba(0,0,0,.74)_100%),linear-gradient(180deg,rgba(0,0,0,.18),rgba(0,0,0,.32)_38%,rgba(0,0,0,.92))]" />
      <div className="absolute inset-x-0 bottom-0 h-[72%] bg-[linear-gradient(180deg,transparent,rgba(0,0,0,.68)_45%,rgba(0,0,0,.96))]" />
      <div className="absolute left-3 top-3 rounded-full border border-[#d9a646]/40 bg-black/68 px-2.5 py-1 text-[0.68rem] font-semibold text-[#f0c66e] shadow-[0_8px_24px_rgba(0,0,0,.34)] backdrop-blur-md">
        {trip.status}
      </div>
      <button
        aria-label={`More options for ${trip.title}`}
        className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-black/48 text-white/86 shadow-[0_8px_24px_rgba(0,0,0,.28)] backdrop-blur-md"
      >
        <MoreVertical className="h-4 w-4" />
      </button>
      <div className="absolute inset-x-0 bottom-0 p-4 pt-14">
        <h3 className="font-sans text-sm font-semibold text-white drop-shadow-[0_2px_14px_rgba(0,0,0,.96)]">{trip.title}</h3>
        <p className="mt-1.5 text-[0.74rem] font-medium text-white/88 drop-shadow-[0_1px_10px_rgba(0,0,0,.9)]">{trip.dates}</p>
        <p className="mt-2 text-[0.74rem] font-medium text-white/82 drop-shadow-[0_1px_10px_rgba(0,0,0,.86)]">
          {trip.locations}
        </p>
        <p className="mt-1 text-[0.74rem] font-medium text-white/82 drop-shadow-[0_1px_10px_rgba(0,0,0,.86)]">
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
        className="object-cover brightness-[0.78] saturate-[0.92] contrast-[1.05] transition duration-500 group-hover:scale-105 group-hover:brightness-[0.86]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(0,0,0,.12),rgba(0,0,0,.44)_54%,rgba(0,0,0,.76)_100%),linear-gradient(180deg,rgba(0,0,0,.24),rgba(0,0,0,.38)_40%,rgba(0,0,0,.94))]" />
      <div className="absolute inset-x-0 bottom-0 h-[72%] bg-[linear-gradient(180deg,transparent,rgba(0,0,0,.7)_48%,rgba(0,0,0,.96))]" />
      <div className="absolute left-3 top-3 grid h-10 w-9 place-items-center rounded-[6px] border border-[#d9a646]/45 bg-black/68 text-center text-[#f0c66e] shadow-[0_8px_24px_rgba(0,0,0,.34)] backdrop-blur-md">
        <span className="block text-[0.58rem] font-bold uppercase leading-none">{month}</span>
        <span className="block text-sm font-semibold leading-none">{day}</span>
      </div>
      <button
        aria-label={`More options for ${entry.title}`}
        className="absolute right-3 top-3 rounded-full bg-black/24 p-1 text-white/86 drop-shadow-[0_2px_10px_rgba(0,0,0,.9)]"
      >
        <MoreVertical className="h-4 w-4" />
      </button>
      <div className="absolute inset-x-0 bottom-0 p-4 pt-12">
        <h3 className="line-clamp-2 font-sans text-sm font-semibold leading-5 text-white drop-shadow-[0_2px_14px_rgba(0,0,0,.96)]">
          {entry.title}
        </h3>
        <p className="mt-1.5 text-[0.72rem] font-medium text-white/84 drop-shadow-[0_1px_10px_rgba(0,0,0,.9)]">
          {entry.place}
        </p>
      </div>
    </article>
  );
}

function PersonalizationPreferences() {
  const { t } = useI18n();

  return (
    <GlassPanel className="p-5 sm:p-6">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#d9a646]">
            Personalization / Preferences
          </p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight text-white">
            Travel profile signals
          </h2>
        </div>
        <a href="/settings" className="text-xs font-medium text-[#d9a646] transition hover:text-[#f3cd7d]">
          Edit preferences
        </a>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
        <div className="rounded-[8px] border border-white/9 bg-white/[0.026] p-5">
          <p className="text-sm font-semibold text-white">Travel style</p>
          <div className="mt-5 space-y-4">
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
        </div>

        <div className="rounded-[8px] border border-white/9 bg-white/[0.026] p-5">
          <p className="text-sm font-semibold text-white">Travel preferences</p>
          <div className="mt-5 divide-y divide-white/[0.07]">
            {preferenceDetails.map((preference) => (
              <div key={preference.label} className="py-4 first:pt-0 last:pb-0">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white/42">
                  {preference.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/82">{preference.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid items-start gap-4 rounded-[7px] border border-white/8 bg-white/[0.025] p-4 sm:grid-cols-[minmax(0,max-content)_minmax(0,1fr)] sm:gap-5">
        <div className="self-start">
          <LanguagePicker />
        </div>
        <div className="min-w-0">
          <PreferencesMenu stacked />
        </div>
        <p className="text-xs leading-5 text-white/48 sm:col-span-2">{t("settings.savedLocally")}</p>
      </div>
    </GlassPanel>
  );
}

function SavedItemsItineraries() {
  return (
    <GlassPanel className="p-4 sm:p-5">
      <SectionHeader title="Saved Items / Itineraries" />
      <div className="space-y-7">
        <div>
          <div className="mb-3 flex items-center justify-between gap-4">
            <h3 className="text-sm font-semibold text-white/88">Saved trips</h3>
            <a href="/trips" className="text-xs font-medium text-[#d9a646] transition hover:text-[#f3cd7d]">
              View trips
            </a>
          </div>
          <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-4">
            {savedTrips.map((trip) => (
              <TripCard key={trip.title} trip={trip} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between gap-4">
            <h3 className="text-sm font-semibold text-white/88">Wishlists</h3>
            <a href="/profile" className="text-xs font-medium text-[#d9a646] transition hover:text-[#f3cd7d]">
              View all
            </a>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
            {savedPlaces.slice(0, 5).map((place) => (
              <SavedPlaceCard key={place.title} place={place} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between gap-4">
            <h3 className="text-sm font-semibold text-white/88">Recently viewed destinations</h3>
            <a href="/explore" className="text-xs font-medium text-[#d9a646] transition hover:text-[#f3cd7d]">
              Explore
            </a>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
            {journalEntries.slice(0, 5).map((entry) => (
              <JournalCard key={entry.title} entry={entry} />
            ))}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

function SettingsSecurity() {
  return (
    <GlassPanel className="p-7 sm:p-8">
      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white/44">
            Settings / Security
          </p>
          <h2 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-white">
            Account controls
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62">
            Manage privacy, notifications, subscription details and saved account preferences after the main travel profile context.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="/settings"
            className="inline-flex min-h-12 items-center justify-center rounded-[6px] border border-white/14 px-6 py-3 text-sm font-medium leading-5 text-white/82 transition hover:border-[#d9a646]/50 hover:text-[#edc674]"
          >
            Account Settings
          </a>
          <a
            href="/legal/privacy"
            className="inline-flex min-h-12 items-center justify-center rounded-[6px] border border-white/14 px-6 py-3 text-sm font-medium leading-5 text-white/82 transition hover:border-[#d9a646]/50 hover:text-[#edc674]"
          >
            Privacy & Security
          </a>
        </div>
      </div>
    </GlassPanel>
  );
}

function SettingRow({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: React.ReactNode;
}) {
  return (
    <div className="grid gap-5 border-b border-white/[0.07] px-6 py-6 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-8 sm:py-7">
      <div className="min-w-0">
        <h3 className="text-base font-semibold leading-6 text-white">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-white/58">{description}</p>
      </div>
      <div className="min-w-0">{action}</div>
    </div>
  );
}

function SelectField({ label, value, options }: { label: string; value: string; options: string[] }) {
  return (
    <label className="block w-full sm:w-[240px]">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        defaultValue={value}
        className="h-11 w-full rounded-[6px] border border-white/12 bg-[#050b0d] px-3 text-sm font-semibold text-white outline-none transition hover:border-[#d9a646]/55 focus:border-[#d9a646] focus:ring-2 focus:ring-[#d9a646]/30"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function ToggleSetting({ label, checked = false }: { label: string; checked?: boolean }) {
  const [enabled, setEnabled] = useState(checked);

  return (
    <button
      type="button"
      role="switch"
      aria-label={label}
      aria-checked={enabled}
      onClick={() => setEnabled((current) => !current)}
      className={`flex h-8 w-14 items-center rounded-full border p-1 transition focus:outline-none focus:ring-2 focus:ring-[#d9a646]/40 ${
        enabled ? "justify-end border-[#d9a646] bg-[#c89131]" : "justify-start border-white/16 bg-white/10"
      }`}
    >
      <span className="h-6 w-6 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,.35)]" />
    </button>
  );
}

function InlineAction({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex min-h-12 w-full items-center justify-center rounded-[6px] border border-[#d9a646]/65 px-6 py-3 text-sm font-semibold leading-5 text-[#e6b85f] transition hover:bg-[#d9a646]/12 focus:outline-none focus:ring-2 focus:ring-[#d9a646]/40 sm:w-auto"
    >
      {children}
    </button>
  );
}

function EmptyState({ title, description, action }: { title: string; description: string; action: string }) {
  return (
    <div className="rounded-[8px] border border-dashed border-white/16 bg-white/[0.025] p-8 text-center sm:p-10">
      <h3 className="text-lg font-semibold leading-7 text-white">{title}</h3>
      <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/62">{description}</p>
      <div className="mt-8">
        <InlineAction>{action}</InlineAction>
      </div>
    </div>
  );
}

function AccountTabContent() {
  return (
    <>
      <GlassPanel className="overflow-hidden">
        <div className="px-5 pt-5 sm:px-6">
          <SectionHeader title="Account" />
        </div>
        <SettingRow title="Name" description="Shown on your JOURNEE profile and trip collaborations." action={<InlineAction>Edit name</InlineAction>} />
        <SettingRow title="Email" description={profileSummary.email} action={<InlineAction>Update email</InlineAction>} />
        <SettingRow title="Location" description={profileSummary.location} action={<InlineAction>Edit location</InlineAction>} />
        <SettingRow title="Membership" description={`${profileSummary.tier} member since ${profileSummary.memberSince}.`} action={<InlineAction>View benefits</InlineAction>} />
      </GlassPanel>
      <MembershipStats />
    </>
  );
}

function NotificationsTabContent() {
  return (
    <GlassPanel className="overflow-hidden">
      <div className="px-5 pt-5 sm:px-6">
        <SectionHeader title="Notifications" />
      </div>
      <SettingRow title="Trip alerts" description="Flight shifts, hotel check-in reminders and itinerary timing changes." action={<ToggleSetting label="Trip alerts" checked />} />
      <SettingRow title="Destination intelligence" description="Safety, weather and seasonal updates for saved destinations." action={<ToggleSetting label="Destination intelligence" checked />} />
      <SettingRow title="Editorial updates" description="New guides and culture notes based on your interests." action={<ToggleSetting label="Editorial updates" />} />
      <SettingRow title="Notification pace" description="Choose how much JOURNEE can send outside essential alerts." action={<SelectField label="Notification pace" value="Balanced" options={["Essential", "Balanced", "All updates"]} />} />
    </GlassPanel>
  );
}

function PrivacySecurityTabContent() {
  return (
    <GlassPanel className="overflow-hidden">
      <div className="px-5 pt-5 sm:px-6">
        <SectionHeader title="Privacy & Security" />
      </div>
      <SettingRow title="Two-step verification" description="Add an extra confirmation step when signing in." action={<ToggleSetting label="Two-step verification" checked />} />
      <SettingRow title="Profile visibility" description="Control whether collaborators can see your travel style and saved notes." action={<SelectField label="Profile visibility" value="Trip collaborators only" options={["Private", "Trip collaborators only", "Public profile"]} />} />
      <SettingRow title="Personalization consent" description="Use saved places and trip history to improve recommendations." action={<ToggleSetting label="Personalization consent" checked />} />
      <SettingRow title="Privacy details" description="Review JOURNEE privacy controls and account protections." action={<InlineAction>Open privacy details</InlineAction>} />
    </GlassPanel>
  );
}

function PaymentBillingTabContent() {
  return (
    <GlassPanel className="overflow-hidden">
      <div className="px-5 pt-5 sm:px-6">
        <SectionHeader title="Payment & Billing" />
      </div>
      <SettingRow title="Plan" description="JOURNEE Pro, renewing May 20, 2025." action={<InlineAction>Manage plan</InlineAction>} />
      <SettingRow title="Payment method" description="Visa ending in 4242." action={<InlineAction>Update card</InlineAction>} />
      <SettingRow title="Billing email" description={profileSummary.email} action={<InlineAction>Edit billing</InlineAction>} />
      <SettingRow title="Invoices" description="Download receipts for recent JOURNEE purchases." action={<InlineAction>View invoices</InlineAction>} />
    </GlassPanel>
  );
}

function AccessibilityTabContent() {
  return (
    <GlassPanel className="overflow-hidden">
      <div className="px-5 pt-5 sm:px-6">
        <SectionHeader title="Accessibility" />
      </div>
      <SettingRow title="Text size" description="Adjust reading comfort across guides, itineraries and profile pages." action={<SelectField label="Text size" value="Standard" options={["Compact", "Standard", "Large"]} />} />
      <SettingRow title="Reduce motion" description="Limit cinematic movement and animated transitions." action={<ToggleSetting label="Reduce motion" />} />
      <SettingRow title="High contrast" description="Increase contrast on controls and travel cards." action={<ToggleSetting label="High contrast" />} />
      <SettingRow title="Keyboard focus" description="Show clearer focus rings while navigating with the keyboard." action={<ToggleSetting label="Keyboard focus" checked />} />
    </GlassPanel>
  );
}

function ConnectedAccountsTabContent() {
  return (
    <GlassPanel className="p-7 sm:p-8">
      <SectionHeader title="Connected Accounts" />
      <EmptyState
        title="No accounts connected yet"
        description="Connect calendar, email or loyalty accounts to make trip planning and reminders more automatic."
        action="Connect an account"
      />
    </GlassPanel>
  );
}

function DataStorageTabContent() {
  return (
    <GlassPanel className="overflow-hidden">
      <div className="px-5 pt-5 sm:px-6">
        <SectionHeader title="Data & Storage" />
      </div>
      <SettingRow title="Offline maps" description="Kyoto and Tokyo are available offline for your upcoming journey." action={<InlineAction>Manage offline data</InlineAction>} />
      <SettingRow title="Saved media" description="Keep journal photos available on this device." action={<ToggleSetting label="Saved media" checked />} />
      <SettingRow title="Export profile data" description="Download saved places, preferences, trips and journal metadata." action={<InlineAction>Download data</InlineAction>} />
      <SettingRow title="Storage cleanup" description="Remove cached guides and expired travel alerts." action={<InlineAction>Clean up storage</InlineAction>} />
    </GlassPanel>
  );
}

function ActiveProfileTabContent({ activeTab }: { activeTab: ProfileTab }) {
  const panelId = `profile-tab-panel-${activeTab.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`;

  return (
    <section id={panelId} role="tabpanel" aria-label={activeTab} tabIndex={0} className="space-y-4 focus:outline-none">
      {activeTab === "Preferences" && (
        <>
          <MembershipStats />
          <PersonalizationPreferences />
          <SavedItemsItineraries />
          <SettingsSecurity />
        </>
      )}
      {activeTab === "Account" && <AccountTabContent />}
      {activeTab === "Travel Preferences" && <PersonalizationPreferences />}
      {activeTab === "Notifications" && <NotificationsTabContent />}
      {activeTab === "Privacy & Security" && (
        <>
          <PrivacySecurityTabContent />
          <SettingsSecurity />
        </>
      )}
      {activeTab === "Payment & Billing" && <PaymentBillingTabContent />}
      {activeTab === "Accessibility" && <AccessibilityTabContent />}
      {activeTab === "Connected Accounts" && <ConnectedAccountsTabContent />}
      {activeTab === "Data & Storage" && <DataStorageTabContent />}
    </section>
  );
}

export function ProfileSavedPlacesPage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("Preferences");

  return (
    <main className="min-h-screen bg-[#030707] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_48%_0%,rgba(209,158,67,.14),transparent_30%),linear-gradient(120deg,#020505,#071213_46%,#030606)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,.026)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)] bg-[size:56px_56px] opacity-45" />

      <TopNav />

      <div className="mx-auto w-full max-w-[1700px] px-4 py-5 sm:px-6 xl:px-8">
        <AccountSummaryHero />

        <div className="mt-5 grid gap-5 xl:grid-cols-[250px_minmax(0,1fr)]">
          <LeftSidebar activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="order-1 xl:order-2">
            <ActiveProfileTabContent activeTab={activeTab} />
          </div>
        </div>
      </div>
    </main>
  );
}
