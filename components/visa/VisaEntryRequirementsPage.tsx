/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import {
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  ExternalLink,
  FileText,
  Headphones,
  Info,
  Plane,
  Search,
  ShieldCheck,
  UserRound,
  WalletCards,
} from "lucide-react";
import { JourneeBrand } from "@/components/brand/JourneeLogo";
import { MainNavLink } from "@/components/navigation/MainNavLink";
import { navigationHref } from "@/lib/routes";

type RequirementField = {
  label: string;
  value: string;
  icon: string;
};

type DetailItem = {
  label: string;
  value: string;
};

type DestinationCard = {
  country: string;
  status: "Visa-free" | "eVisa";
  stay: string;
  image: string;
};

const visaData = {
  reviewedAt: "May 3, 2025",
  verifiedCadence: "Information verified daily.",
  officialSourceLabel: "Ministry of Foreign Affairs of Japan",
  officialSourceUrl: "https://www.mofa.go.jp/j_info/visit/visa/short/novisa.html",
  disclaimer:
    "This information is for guidance only and should not be considered legal advice. Always confirm with the official government website or your nearest embassy before traveling.",
  heroImage:
    "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=2200&q=88",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=180&q=80",
  tripImage:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=420&q=84",
  fields: [
    { label: "Passport", value: "United States of America", icon: "🇺🇸" },
    { label: "Destination", value: "Japan", icon: "🇯🇵" },
    { label: "Travel Purpose", value: "Tourism", icon: "" },
    { label: "Date of Arrival", value: "May 20, 2025", icon: "" },
  ] satisfies RequirementField[],
  summaryDetails: [
    { label: "Maximum Stay", value: "90 days" },
    { label: "Entry Type", value: "Visa-free" },
    { label: "Stay Purpose", value: "Tourism" },
    { label: "Validity", value: "Up to 90 days" },
  ] satisfies DetailItem[],
  keyDetails: [
    { label: "Maximum Stay", value: "90 days" },
    { label: "Visa Type", value: "Visa-free" },
    { label: "Entries Allowed", value: "Single entry" },
    { label: "Purpose", value: "Tourism, Transit" },
    { label: "Applicable Passports", value: "United States of America" },
    { label: "Official Source", value: "Ministry of Foreign Affairs of Japan" },
  ] satisfies DetailItem[],
  timeline: [
    { title: "Arrive in Japan", copy: "Present passport at immigration" },
    { title: "Immigration Check", copy: "Answer standard questions" },
    { title: "Entry Stamp", copy: "Receive 90-day permission to stay" },
    { title: "Enjoy Your Trip", copy: "Explore Japan" },
  ],
  popularDestinations: [
    {
      country: "Japan",
      status: "Visa-free",
      stay: "Up to 90 days",
      image:
        "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=520&q=84",
    },
    {
      country: "South Korea",
      status: "Visa-free",
      stay: "Up to 90 days",
      image:
        "https://images.unsplash.com/photo-1538485399081-7c8ed49f41ea?auto=format&fit=crop&w=520&q=84",
    },
    {
      country: "Singapore",
      status: "Visa-free",
      stay: "Up to 90 days",
      image:
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=520&q=84",
    },
    {
      country: "United Kingdom",
      status: "eVisa",
      stay: "Up to 6 months",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=520&q=84",
    },
    {
      country: "India",
      status: "eVisa",
      stay: "Up to 60 days",
      image:
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=520&q=84",
    },
  ] satisfies DestinationCard[],
};

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
];

const tabs = ["Overview", "Entry Requirements", "Documents", "Health", "Important Notes"];
const quickTools = [
  ["Visa-Free Destinations", "For U.S. passport holders"],
  ["eVisa Destinations", "Apply online"],
  ["Visa on Arrival", "Pay on arrival at destination"],
  ["Visa Required", "Apply before you travel"],
];
const guideLinks = [
  "How to read visa requirements",
  "Visa types explained",
  "Common visa questions",
  "Passport validity rules",
];
const questions = [
  "Do I need a visa for a layover in Japan?",
  "Can I extend my stay in Japan?",
  "Is a return ticket required?",
  "Do children need a visa?",
];

function GlassPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-lg border border-white/10 bg-[#081217]/78 shadow-[0_24px_70px_rgba(0,0,0,.28)] backdrop-blur-xl ${className}`}
    >
      {children}
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[#f0ae36]">
      {children}
    </h2>
  );
}

function SelectField({ field }: { field: RequirementField }) {
  const fieldIcon =
    field.label === "Travel Purpose" ? (
      <BriefcaseBusiness className="h-4 w-4" />
    ) : field.label === "Date of Arrival" ? (
      <CalendarDays className="h-4 w-4" />
    ) : null;

  return (
    <label className="block">
      <span className="text-sm text-white/68">{field.label}</span>
      <span className="mt-2 flex h-11 items-center justify-between rounded-md border border-white/12 bg-black/18 px-3 text-sm text-white/94">
        <span className="flex min-w-0 items-center gap-2">
          {field.icon ? <span className="text-base leading-none">{field.icon}</span> : fieldIcon}
          <span className="truncate">{field.value}</span>
        </span>
        {field.label !== "Date of Arrival" && <ChevronDown className="h-4 w-4 text-white/58" />}
      </span>
    </label>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#02090d]/82 backdrop-blur-2xl">
      <div className="mx-auto flex min-h-20 max-w-[1800px] items-center gap-5 px-4 sm:px-6 2xl:px-8">
        <Link href="/" className="shrink-0">
          <JourneeBrand direction="meridian-pin" className="[&>span:first-child]:h-9 [&>span:first-child]:w-9 [&>span:first-child]:rounded-none [&>span:first-child]:border-0 [&>span:first-child]:bg-transparent [&>span:first-child]:shadow-none [&>span:first-child>svg]:h-8 [&>span:first-child>svg]:w-8 [&>span:last-child]:text-[1.45rem] [&>span:last-child]:tracking-[0.12em]" />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 overflow-visible text-sm font-medium text-white/88 xl:flex">
          {navItems.map((item) => (
            <MainNavLink
              key={item}
              label={item}
              href={navigationHref(item)}
              className="relative inline-flex min-w-max items-center whitespace-nowrap px-1 py-3 transition hover:text-white"
              activeClassName="text-[#f0ae36]"
              underlineClassName="absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[#f0ae36]"
            />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <label className="hidden h-10 min-w-[310px] items-center gap-3 rounded-full border border-white/12 bg-white/[0.035] px-4 text-sm text-white/62 lg:flex">
            <Search className="h-4 w-4" />
            <span className="truncate">Search countries or passports...</span>
          </label>
          <button
            type="button"
            aria-label="Notifications"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/82"
          >
            <Bell className="h-5 w-5" />
          </button>
          <img
            src={visaData.avatar}
            alt="Profile avatar"
            className="h-11 w-11 rounded-full border border-[#f0ae36]/35 object-cover"
          />
          <ChevronDown className="hidden h-4 w-4 text-white/60 sm:block" />
        </div>
      </div>
    </header>
  );
}

function CheckerSidebar() {
  return (
    <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
      <GlassPanel className="p-5">
        <SectionTitle>Check Entry Requirements</SectionTitle>
        <div className="mt-6 space-y-5">
          {visaData.fields.map((field) => (
            <SelectField key={field.label} field={field} />
          ))}
        </div>
        <button
          type="button"
          className="mt-5 h-11 w-full rounded-md bg-gradient-to-r from-[#dda13e] to-[#efbd65] text-sm font-semibold text-[#160e05] shadow-[0_12px_34px_rgba(221,161,62,.22)]"
        >
          Check Requirements
        </button>
      </GlassPanel>

      <div className="hidden space-y-4 lg:block">
        <QuickToolsPanel />
        <HelpPanel />
      </div>
    </aside>
  );
}

function QuickToolsPanel() {
  return (
    <GlassPanel className="p-5">
      <SectionTitle>Quick Tools</SectionTitle>
      <div className="mt-5 divide-y divide-white/[0.07]">
        {quickTools.map(([title, copy]) => (
          <button
            key={title}
            type="button"
            className="flex w-full items-center gap-4 py-4 text-left"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-[#f0ae36]/50 text-[#f0ae36]">
              <WalletCards className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm text-white/92">{title}</span>
              <span className="block text-xs text-white/56">{copy}</span>
            </span>
            <ChevronRight className="h-4 w-4 text-white/62" />
          </button>
        ))}
      </div>
    </GlassPanel>
  );
}

function HelpPanel() {
  return (
    <GlassPanel className="p-5">
      <div className="border-t border-white/[0.06] pt-6">
        <div className="flex items-center gap-4">
          <Headphones className="h-7 w-7 text-[#f0ae36]" />
          <div>
            <h3 className="font-sans text-base font-semibold text-white">Need help?</h3>
            <p className="mt-1 text-sm text-white/62">Our visa experts are here for you.</p>
          </div>
        </div>
        <button
          type="button"
          className="mt-5 h-11 w-full rounded-md border border-[#f0ae36] text-sm font-semibold text-[#f0ae36]"
        >
          Contact Support
        </button>
      </div>
    </GlassPanel>
  );
}

function HeroResultCard() {
  return (
    <GlassPanel className="relative overflow-hidden p-0">
      <img
        src={visaData.heroImage}
        alt="Mount Fuji and a Kyoto pagoda at sunset"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,12,16,.96)_0%,rgba(5,12,16,.84)_42%,rgba(5,12,16,.28)_100%)]" />
      <div className="relative min-h-[330px] p-6 sm:p-8 lg:min-h-[310px]">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-sans text-4xl font-semibold uppercase tracking-[0.08em] text-white sm:text-5xl">
            Japan
          </h1>
          <span className="rounded-md bg-white px-2 py-1 text-lg leading-none">🇯🇵</span>
        </div>
        <p className="mt-3 max-w-2xl text-base text-white/86">
          Entry requirements for United States of America passport holders
        </p>

        <div className="mt-7 max-w-[680px] rounded-lg border border-white/10 bg-[#081015]/72 p-5 shadow-2xl shadow-black/30 backdrop-blur-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#67c765] text-[#071207]">
              <Check className="h-9 w-9" strokeWidth={2} />
            </span>
            <div>
              <p className="text-xl font-bold uppercase tracking-[0.06em] text-[#76dc74]">
                Visa-Free Entry
              </p>
              <p className="mt-2 text-sm text-white/88">
                You can travel to Japan without a visa for tourism.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 rounded-md border border-white/[0.07] bg-white/[0.025] p-4 sm:grid-cols-2 xl:grid-cols-4">
            {visaData.summaryDetails.map((item, index) => {
              const Icon = [CalendarDays, FileText, BriefcaseBusiness, Clock3][index];
              return (
                <div
                  key={item.label}
                  className="flex min-w-0 items-center gap-3 xl:border-r xl:border-white/[0.07] xl:last:border-r-0"
                >
                  <Icon className="h-5 w-5 shrink-0 text-[#f0ae36]" />
                  <div>
                    <p className="text-xs text-white/56">{item.label}</p>
                    <p className="text-sm font-medium text-white">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

function OverviewPanel() {
  return (
    <GlassPanel className="overflow-hidden">
      <div className="flex gap-4 overflow-x-auto border-b border-white/[0.07] px-5 sm:px-7">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`shrink-0 border-b-2 px-1 py-5 text-sm ${
              tab === "Overview"
                ? "border-[#f0ae36] text-[#f0ae36]"
                : "border-transparent text-white/66"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[1fr_.76fr]">
        <div className="rounded-lg border border-white/[0.08] bg-black/12 p-5">
          <SectionTitle>Overview</SectionTitle>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/82">
            U.S. passport holders can enter Japan for tourism for up to 90 days
            without a visa. Your passport must be valid for the duration of your
            stay. This Japan visa checker summarizes Japan entry requirements,
            Japan visa-free entry, Japan tourist visa rules, Japan passport
            validity, and common Japan travel documents for trip planning.
          </p>

          <SectionTitle>
            <span className="mt-7 block">Key Details</span>
          </SectionTitle>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-[minmax(160px,.55fr)_1fr]">
            {visaData.keyDetails.map((item) => (
              <div key={item.label} className="contents">
                <dt className="border-b border-white/[0.05] pb-2 text-white/72">{item.label}</dt>
                <dd className="border-b border-white/[0.05] pb-2 text-white">
                  {item.label === "Official Source" ? (
                    <a
                      href={visaData.officialSourceUrl}
                      className="inline-flex items-center gap-2 text-white"
                    >
                      {item.value}
                      <ExternalLink className="h-3.5 w-3.5 text-[#f0ae36]" />
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-lg border border-white/[0.08] bg-black/12 p-5">
          <SectionTitle>Entry Timeline Example</SectionTitle>
          <div className="mt-5 space-y-6">
            {visaData.timeline.map((item, index) => (
              <div key={item.title} className="relative flex gap-4">
                {index < visaData.timeline.length - 1 && (
                  <span className="absolute left-3 top-7 h-[calc(100%+8px)] w-px bg-[#65c864]/42" />
                )}
                <span className="relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#65c864] text-xs font-bold text-[#061109]">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-sans text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-white/64">{item.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-4 mb-4 flex flex-col gap-4 rounded-lg border border-[#f0ae36]/34 bg-[#2d2415]/42 p-4 sm:mx-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#f0ae36] text-[#f0ae36]">
            <Info className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold text-white">Information is subject to change</p>
            <p className="mt-1 text-sm text-white/70">
              Visa policies can change. Please verify with official sources before traveling.
            </p>
          </div>
        </div>
        <div className="text-sm text-white/72 sm:text-right">
          <p className="flex items-center gap-2 sm:justify-end">
            <span className="h-2 w-2 rounded-full bg-[#65c864]" />
            Last reviewed: {visaData.reviewedAt}
          </p>
          <p className="mt-1">{visaData.verifiedCadence}</p>
        </div>
      </div>
    </GlassPanel>
  );
}

function PopularDestinations() {
  return (
    <GlassPanel className="p-5">
      <div className="flex items-center justify-between gap-4">
        <SectionTitle>Popular Destinations for U.S. Passport Holders</SectionTitle>
        <button type="button" className="hidden items-center gap-2 text-sm text-[#f0ae36] sm:flex">
          View all countries <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {visaData.popularDestinations.map((destination) => (
          <article
            key={destination.country}
            className="group overflow-hidden rounded-lg border border-white/[0.08] bg-black/18"
          >
            <div className="relative h-28 overflow-hidden">
              <img
                src={destination.image}
                alt={`${destination.country} travel destination`}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/78 to-transparent" />
              <span
                className={`absolute bottom-2 left-3 rounded-full px-3 py-1 text-xs font-bold ${
                  destination.status === "Visa-free"
                    ? "bg-[#2f863d] text-white"
                    : "bg-[#8a641c] text-[#ffe0a0]"
                }`}
              >
                {destination.status}
              </span>
            </div>
            <div className="p-3">
              <h3 className="font-sans text-sm font-semibold text-white">{destination.country}</h3>
              <p className="mt-1 text-xs text-white/66">{destination.stay}</p>
            </div>
          </article>
        ))}
      </div>
    </GlassPanel>
  );
}

function RightSidebar() {
  return (
    <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
      <GlassPanel className="p-5">
        <div className="flex items-center justify-between">
          <SectionTitle>Your Trip</SectionTitle>
          <button type="button" className="text-sm text-white/64">
            Edit
          </button>
        </div>
        <div className="mt-5 flex gap-4">
          <img
            src={visaData.tripImage}
            alt="Osaka and Kyoto trip preview"
            className="h-24 w-24 shrink-0 rounded-md object-cover"
          />
          <div className="min-w-0 py-1">
            <h3 className="font-sans text-base font-semibold text-white">
              San Francisco → Osaka
            </h3>
            <p className="mt-2 text-sm text-white/68">May 20 - May 27, 2025</p>
            <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-white/62">
              <span className="inline-flex items-center gap-1">
                <UserRound className="h-4 w-4" /> 1 Traveler
              </span>
              <span className="inline-flex items-center gap-1">
                <Plane className="h-4 w-4" /> Economy
              </span>
            </p>
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="p-5">
        <SectionTitle>Visa Guide</SectionTitle>
        <div className="mt-5 divide-y divide-white/[0.07]">
          {guideLinks.map((item, index) => {
            const Icon = [Clock3, BriefcaseBusiness, CircleHelp, CalendarDays][index];
            return (
              <button key={item} type="button" className="flex w-full items-center gap-3 py-4 text-left">
                <Icon className="h-4 w-4 text-[#f0ae36]" />
                <span className="flex-1 text-sm text-white/84">{item}</span>
                <ChevronRight className="h-4 w-4 text-white/62" />
              </button>
            );
          })}
        </div>
      </GlassPanel>

      <GlassPanel className="p-5">
        <SectionTitle>Common Questions</SectionTitle>
        <div className="mt-5 divide-y divide-white/[0.07]">
          {questions.map((question) => (
            <button key={question} type="button" className="flex w-full items-center gap-3 py-4 text-left">
              <CircleHelp className="h-4 w-4 shrink-0 text-white/62" />
              <span className="flex-1 text-sm text-white/84">{question}</span>
              <ChevronRight className="h-4 w-4 text-white/62" />
            </button>
          ))}
        </div>
        <button
          type="button"
          className="mt-4 h-11 w-full rounded-md border border-[#f0ae36] text-sm font-semibold text-[#f0ae36]"
        >
          View all FAQs
        </button>
      </GlassPanel>

      <GlassPanel className="p-5">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-7 w-7 text-[#f0ae36]" />
          <SectionTitle>Important</SectionTitle>
        </div>
        <p className="mt-5 text-base leading-7 text-white/90">{visaData.disclaimer}</p>
        <a
          href={visaData.officialSourceUrl}
          className="mt-5 flex h-11 items-center justify-center gap-2 rounded-md border border-[#f0ae36] text-sm font-semibold text-[#f0ae36]"
        >
          Official Government Sources
          <ExternalLink className="h-4 w-4" />
        </a>
      </GlassPanel>
    </aside>
  );
}

export function VisaEntryRequirementsPage() {
  return (
    <main className="min-h-screen bg-[#02090d] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(216,170,79,.12),transparent_27%),radial-gradient(circle_at_85%_10%,rgba(80,146,164,.10),transparent_30%),linear-gradient(180deg,#041018_0%,#02090d_42%,#010507_100%)]" />
      <Header />

      <div className="relative mx-auto grid max-w-[1800px] gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_330px] 2xl:grid-cols-[300px_minmax(0,1fr)_395px] 2xl:px-8">
        <CheckerSidebar />

        <div className="space-y-5 lg:min-w-0">
          <HeroResultCard />
          <OverviewPanel />
          <PopularDestinations />
        </div>

        <div className="space-y-4 lg:hidden">
          <QuickToolsPanel />
          <HelpPanel />
        </div>

        <RightSidebar />
      </div>

      <div className="relative mx-auto max-w-[1800px] px-4 pb-8 sm:px-6 2xl:px-8">
        <p className="rounded-lg border border-white/[0.08] bg-black/18 p-4 text-sm leading-6 text-white/62">
          JOURNEE provides official-source-aware travel planning summaries for
          U.S. passport Japan visa research, Japan entry requirements, Japan
          tourist visa planning, and eVisa travel discovery. It does not replace
          advice from an embassy, consulate, airline, or immigration authority.
        </p>
      </div>
    </main>
  );
}
