/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import {
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Hotel,
  Info,
  Landmark,
  LineChart,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  TrainFront,
  Utensils,
  WalletCards,
} from "lucide-react";
import { JourneeLogoMark } from "@/components/brand/JourneeLogo";

export const metadata: Metadata = {
  title: "Budget / Cost Planner",
  description:
    "Plan a Japan travel budget, compare destination costs, convert USD to JPY, and estimate your daily travel budget for Tokyo, Kyoto, and Osaka.",
};

type BudgetCategory = {
  name: string;
  value: number;
  percent: number;
  color: string;
  icon: typeof Hotel;
};

type DestinationBudget = {
  city: string;
  country: string;
  image: string;
  cost: string;
  note: string;
  selected?: boolean;
};

type SavingTip = {
  title: string;
  copy: string;
  saving: string;
  icon: typeof CreditCard;
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
  "Visa",
  "Budget",
];

const budgetCategories: BudgetCategory[] = [
  { name: "Accommodation", value: 560, percent: 39, color: "#7d5ab7", icon: Hotel },
  { name: "Food & Drinks", value: 280, percent: 20, color: "#d99a32", icon: Utensils },
  { name: "Transport", value: 200, percent: 14, color: "#5c8fc1", icon: TrainFront },
  { name: "Activities & Experiences", value: 220, percent: 15, color: "#6db15e", icon: Landmark },
  { name: "Shopping", value: 100, percent: 7, color: "#d56e91", icon: ShoppingBag },
  { name: "Other Expenses", value: 60, percent: 4, color: "#858b91", icon: WalletCards },
];

const dailyBars = [54, 60, 76, 58, 52, 61, 72, 62];

const destinationBudgets: DestinationBudget[] = [
  {
    city: "Tokyo",
    country: "Japan",
    cost: "$182",
    note: "You selected",
    selected: true,
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=700&q=82",
  },
  {
    city: "Seoul",
    country: "South Korea",
    cost: "$134",
    note: "18% cheaper",
    image:
      "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=700&q=82",
  },
  {
    city: "Singapore",
    country: "Singapore",
    cost: "$150",
    note: "10% cheaper",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=700&q=82",
  },
  {
    city: "Bangkok",
    country: "Thailand",
    cost: "$98",
    note: "46% cheaper",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=700&q=82",
  },
  {
    city: "Kuala Lumpur",
    country: "Malaysia",
    cost: "$88",
    note: "52% cheaper",
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=700&q=82",
  },
];

const savingTips: SavingTip[] = [
  {
    title: "Use IC cards (Suica/Pasmo)",
    copy: "Save on transport fares",
    saving: "Save up to $25",
    icon: CreditCard,
  },
  {
    title: "Eat like a local",
    copy: "Try convenience stores and local eateries",
    saving: "Save up to $30/day",
    icon: Utensils,
  },
  {
    title: "Stay in business hotels",
    copy: "Great value and comfy",
    saving: "Save up to $40/night",
    icon: BriefcaseBusiness,
  },
  {
    title: "Visit free attractions",
    copy: "Temples, parks and shrines",
    saving: "Save up to $15/day",
    icon: Landmark,
  },
];

const quickTools = [
  ["Daily Budget Calculator", "Estimate per day costs"],
  ["Budget by Destination", "Compare city costs"],
  ["Money-Saving Tips", "Practical travel hacks"],
  ["Exchange Rate Alerts", "Get notified for better rates"],
];

export default function BudgetPage() {
  return (
    <main className="min-h-screen bg-[#030708] text-white">
      <TopNavigation />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_17%_0%,rgba(216,170,79,.14),transparent_30%),radial-gradient(circle_at_78%_10%,rgba(74,112,125,.15),transparent_30%),linear-gradient(180deg,#030708_0%,#071010_48%,#030708_100%)]" />
      <div className="relative mx-auto grid w-full max-w-[1920px] gap-5 px-4 pb-7 pt-20 sm:px-5 lg:px-6 xl:grid-cols-[315px_minmax(0,1fr)] 2xl:grid-cols-[315px_minmax(0,1fr)_380px]">
        <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <BudgetPlannerPanel />
          <CurrencyConverter />
          <QuickTools />
        </aside>

        <section className="min-w-0 space-y-4">
          <HeroOverview />
          <div className="grid gap-4 min-[1800px]:grid-cols-[minmax(0,1.55fr)_minmax(320px,.85fr)]">
            <BudgetBreakdown />
            <DailyEstimate />
          </div>
          <DestinationComparison />
          <SavingRecommendations />
          <Disclaimer />
        </section>

        <aside className="space-y-4 2xl:sticky 2xl:top-24 2xl:self-start">
          <TripSidebar />
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
        <nav className="hidden flex-1 items-center justify-center gap-8 overflow-visible 2xl:flex">
          {navItems.map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={`relative inline-flex min-w-max items-center whitespace-nowrap px-1 py-3 text-sm font-medium transition ${
                item === "Budget" ? "text-[#f3b544]" : "text-white/88 hover:text-white"
              }`}
            >
              {item}
              {item === "Budget" && (
                <span className="absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[#f3b544]" />
              )}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden min-w-[260px] max-w-[520px] flex-1 items-center rounded-full border border-white/12 bg-white/[0.045] px-4 py-2.5 text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,.08)] lg:flex">
          <Search className="mr-3 h-4 w-4 shrink-0 text-white/48" />
          <span className="truncate text-sm">Search destinations or anything...</span>
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
      className={`rounded-lg border border-white/12 bg-[#071011]/80 shadow-[0_22px_70px_rgba(0,0,0,.34),inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-2xl ${className}`}
    >
      {children}
    </div>
  );
}

function SectionTitle({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#f3b544]">
        {children}
      </h2>
      {action && (
        <button type="button" className="inline-flex items-center gap-1 text-xs font-medium text-[#f3b544]">
          {action}
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

function BudgetPlannerPanel() {
  return (
    <Panel className="p-5">
      <SectionTitle>Plan Your Budget</SectionTitle>
      <div className="space-y-3">
        <PlannerField label="Destination" value="🇯🇵  Japan" chevron />
        <PlannerField label="Cities" value="Tokyo, Kyoto, Osaka (3 cities)" chevron />
        <PlannerField label="Travel Dates" value="May 20 - May 27, 2025" subvalue="8 days" icon={CalendarDays} />
        <PlannerField label="Travel Style" value="Mid-range" chevron />
        <PlannerField label="Travelers" value="1 Traveler" />
      </div>
      <button
        type="button"
        className="mt-5 w-full rounded-md bg-gradient-to-r from-[#d39533] to-[#e8ad46] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_42px_rgba(216,170,79,.24)]"
      >
        Calculate Budget
      </button>
    </Panel>
  );
}

function PlannerField({
  label,
  value,
  subvalue,
  chevron = false,
  icon: Icon,
}: {
  label: string;
  value: string;
  subvalue?: string;
  chevron?: boolean;
  icon?: typeof CalendarDays;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-white/56">{label}</span>
      <span className="flex min-h-10 items-center rounded-md border border-white/10 bg-white/[0.035] px-3 text-sm text-white/86 shadow-[inset_0_1px_0_rgba(255,255,255,.035)]">
        {Icon && <Icon className="mr-2.5 h-4 w-4 text-white/62" />}
        <span className="min-w-0 flex-1 truncate">{value}</span>
        {subvalue && <span className="ml-3 shrink-0 text-xs text-white/52">{subvalue}</span>}
        {chevron && <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-white/52" />}
      </span>
    </label>
  );
}

function CurrencyConverter() {
  return (
    <Panel className="p-5">
      <SectionTitle>Currency Converter</SectionTitle>
      <div className="space-y-3">
        <PlannerField label="" value="USD - United States Dollar" chevron />
        <div className="flex min-h-10 items-center rounded-md border border-white/10 bg-white/[0.035] px-3 text-sm">
          <span className="flex-1 text-white">1,000</span>
          <span className="text-white/62">USD</span>
        </div>
        <div className="flex justify-center text-[#f3b544]">
          <LineChart className="h-4 w-4" />
        </div>
        <PlannerField label="" value="JPY - Japanese Yen" chevron />
        <div className="flex min-h-10 items-center rounded-md border border-white/10 bg-white/[0.035] px-3 text-sm">
          <span className="flex-1 text-white">156,800</span>
          <span className="text-white/62">JPY</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-white/58">
        <span>1 USD = 156.80 JPY</span>
        <span className="inline-flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6dd06d]" />
          Live rate
        </span>
      </div>
    </Panel>
  );
}

function QuickTools() {
  return (
    <Panel className="p-5">
      <SectionTitle>Quick Tools</SectionTitle>
      <div className="space-y-4">
        {quickTools.map(([title, copy]) => (
          <button key={title} type="button" className="flex w-full items-start gap-3 text-left">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-[#f3b544]/34 bg-[#f3b544]/10 text-[#f3b544]">
              <CircleDollarSign className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-sm font-medium text-white/90">{title}</span>
              <span className="mt-0.5 block text-xs text-white/52">{copy}</span>
            </span>
          </button>
        ))}
      </div>
    </Panel>
  );
}

function HeroOverview() {
  return (
    <section className="relative overflow-hidden rounded-lg border border-white/12 bg-[#091112] shadow-[0_28px_90px_rgba(0,0,0,.42)]">
      <img
        src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2200&q=88"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,8,.96)_0%,rgba(3,7,8,.78)_42%,rgba(3,7,8,.24)_100%),linear-gradient(180deg,rgba(3,7,8,.14),rgba(3,7,8,.6))]" />
      <div className="relative grid gap-6 p-6 sm:p-8 xl:grid-cols-[minmax(0,1fr)_190px]">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#f3b544]">
            Your Trip Budget Overview
          </p>
          <h1 className="mt-3 max-w-[540px] font-sans text-[clamp(2.1rem,4vw,3.35rem)] leading-[1.02] text-white">
            Smart planning, better journeys.
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <p className="text-lg text-white">Estimated budget for Japan</p>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#6dcc66]/50 bg-[#21451f]/56 px-4 py-1.5 text-sm font-medium text-[#8be282]">
              On Track
              <ChevronDown className="h-3.5 w-3.5" />
            </span>
          </div>
          <div className="mt-6 grid gap-4 border-t border-white/12 pt-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Total Trip Budget" value="$1,420" suffix="USD" />
            <Metric label="Daily Average" value="$178" suffix="USD" />
            <Metric label="Trip Duration" value="8" suffix="days" />
            <Metric label="Total Cities" value="3" suffix="cities" />
          </div>
        </div>
        <BudgetConfidence />
      </div>
    </section>
  );
}

function Metric({ label, value, suffix }: { label: string; value: string; suffix: string }) {
  return (
    <div className="border-white/16 sm:border-r sm:pr-4 last:border-r-0">
      <p className="text-xs text-white/68">{label}</p>
      <p className="mt-2 font-sans text-2xl font-semibold tracking-tight text-white">
        {value} <span className="text-xs font-normal tracking-normal text-white/66">{suffix}</span>
      </p>
    </div>
  );
}

function BudgetConfidence() {
  return (
    <Panel className="self-start bg-[#0b1116]/88 p-5 text-center">
      <h2 className="font-sans text-sm font-semibold text-white">Budget Confidence</h2>
      <div className="mx-auto mt-4 grid h-24 w-24 place-items-center rounded-full bg-[conic-gradient(#72ca6e_0_92%,rgba(255,255,255,.14)_92%_100%)] p-2">
        <div className="grid h-full w-full place-items-center rounded-full bg-[#0b1116]">
          <span>
            <span className="block text-2xl font-semibold leading-none">92%</span>
            <span className="text-xs text-[#79db74]">Good</span>
          </span>
        </div>
      </div>
      <p className="mt-4 text-sm leading-5 text-white/82">
        Your budget is well balanced for your travel style.
      </p>
      <button type="button" className="mt-4 w-full rounded-md border border-[#d99a32]/80 px-4 py-2 text-sm font-medium text-[#f3b544]">
        View Details
      </button>
    </Panel>
  );
}

function BudgetBreakdown() {
  return (
    <Panel className="p-5">
      <SectionTitle>Budget Breakdown</SectionTitle>
      <div className="grid items-center gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <DonutChart />
        <div className="space-y-2">
          {budgetCategories.map(({ name, value, percent, color, icon: Icon }) => (
            <div key={name} className="grid grid-cols-[minmax(0,1fr)_72px_44px] items-center gap-3 border-b border-white/8 pb-2 last:border-b-0">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: color }}>
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span className="truncate text-sm text-white/90">{name}</span>
              </div>
              <span className="text-right text-sm tabular-nums text-white">${value}</span>
              <span className="text-right text-sm tabular-nums text-white/58">{percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function DonutChart() {
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="relative mx-auto h-56 w-56">
      <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
        <circle cx="90" cy="90" r={radius} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="34" />
        {budgetCategories.map((category) => {
          const dash = (category.percent / 100) * circumference;
          const segment = (
            <circle
              key={category.name}
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke={category.color}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
              strokeWidth="34"
            />
          );
          offset += dash;
          return segment;
        })}
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="font-sans text-2xl font-semibold leading-none">$1,420</p>
          <p className="mt-1 text-xs text-white/62">Total Budget</p>
        </div>
      </div>
    </div>
  );
}

function DailyEstimate() {
  return (
    <Panel className="p-5">
      <SectionTitle>Daily Budget Estimate</SectionTitle>
      <p className="font-sans text-3xl font-semibold tracking-tight">
        $178 <span className="text-sm font-normal text-white/62">USD / day</span>
      </p>
      <p className="mt-2 text-sm text-[#76dc76]">▼ 8% vs similar travelers</p>
      <div className="mt-5 flex h-28 items-end gap-3 border-b border-white/14">
        {dailyBars.map((height, index) => (
          <div key={index} className="flex flex-1 flex-col items-center">
            <div
              className={`w-full max-w-8 rounded-t-sm ${index === 2 ? "bg-gradient-to-t from-[#d99a32] to-[#f4b64b]" : "bg-gradient-to-t from-white/16 to-white/30"}`}
              style={{ height: `${height}px` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-8 text-center text-[10px] text-white/62">
        {dailyBars.map((_, index) => (
          <span key={index}>Day {index + 1}</span>
        ))}
      </div>
      <button type="button" className="mt-4 w-full rounded-md border border-[#d99a32]/80 px-4 py-2.5 text-sm font-medium text-[#f3b544]">
        View Daily Breakdown
      </button>
    </Panel>
  );
}

function DestinationComparison() {
  return (
    <Panel className="p-5">
      <SectionTitle action="View all destinations">Budget Comparison by Destination (USD / Day)</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 min-[1800px]:grid-cols-5">
        {destinationBudgets.map((destination) => (
          <article
            key={destination.city}
            className={`group relative min-h-48 overflow-hidden rounded-lg border bg-[#091112] p-4 ${
              destination.selected ? "border-[#74cc68]/60" : "border-white/12"
            }`}
          >
            <img src={destination.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,8,.12),rgba(3,7,8,.84)_72%,rgba(3,7,8,.95))]" />
            <div className="relative flex h-full min-h-40 flex-col justify-between">
              <div>
                <h3 className="font-sans text-lg font-semibold text-white">{destination.city}</h3>
                <p className="text-sm text-white/82">{destination.country}</p>
                <span className="mt-3 inline-flex rounded bg-[#2d7643]/78 px-2 py-1 text-[11px] font-semibold text-white">
                  Mid-range
                </span>
              </div>
              <div>
                <p className="font-sans text-2xl font-semibold">
                  {destination.cost} <span className="text-sm font-normal">/ day</span>
                </p>
                <p className={destination.selected ? "mt-2 text-sm text-white" : "mt-2 text-sm text-[#78df72]"}>
                  {destination.note}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function SavingRecommendations() {
  return (
    <Panel className="p-5">
      <SectionTitle action="View all tips">Money-Saving Recommendations for Japan</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2 min-[1800px]:grid-cols-4">
        {savingTips.map(({ title, copy, saving, icon: Icon }) => (
          <article key={title} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[#f3b544]/24 bg-[#f3b544]/10 text-[#f3b544]">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-sans text-sm font-semibold text-white">{title}</h3>
                <p className="mt-1 text-xs leading-5 text-white/58">{copy}</p>
              </div>
            </div>
            <p className="mt-5 text-center text-sm font-medium text-[#78df72]">{saving}</p>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function Disclaimer() {
  return (
    <Panel className="flex flex-col gap-3 px-5 py-3 text-xs text-white/58 sm:flex-row sm:items-center sm:justify-between">
      <span className="inline-flex items-center gap-3">
        <Info className="h-4 w-4 text-white/72" />
        Estimates are based on traveler data and may vary. Always confirm prices before booking.
      </span>
      <span className="inline-flex items-center gap-3">
        Last updated: May 3, 2025
        <span className="h-1.5 w-1.5 rounded-full bg-[#6dd06d]" />
      </span>
    </Panel>
  );
}

function TripSidebar() {
  return (
    <>
      <Panel className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#f3b544]">Your Trip</h2>
          <button type="button" className="text-sm text-white/58">Edit</button>
        </div>
        <div className="flex gap-4">
          <img
            src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=260&q=84"
            alt=""
            className="h-24 w-28 shrink-0 rounded-md object-cover"
          />
          <div className="min-w-0">
            <h3 className="font-sans text-lg font-semibold text-white">Japan</h3>
            <p className="mt-1 text-sm text-white/72">Tokyo, Kyoto, Osaka</p>
            <p className="mt-1 text-sm text-white/72">May 20 - May 27, 2025</p>
            <p className="mt-2 text-xs text-white/62">1 Traveler · Mid-range</p>
          </div>
        </div>
      </Panel>
      <SpendTracker />
      <TopExpenses />
      <BudgetInsights />
    </>
  );
}

function SpendTracker() {
  return (
    <Panel className="p-5">
      <h2 className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#f3b544]">
        Spend Tracker <span className="font-normal normal-case tracking-normal text-white/58">(Example)</span>
      </h2>
      <div className="mt-5 grid grid-cols-[80px_minmax(0,1fr)] items-center gap-5">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-[conic-gradient(#d99a32_0_62%,rgba(255,255,255,.12)_62%_100%)] p-2">
          <div className="grid h-full w-full place-items-center rounded-full bg-[#071011] text-lg font-semibold">62%</div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-white/10">
          <div>
            <p className="font-sans text-2xl font-semibold">$880</p>
            <p className="text-xs text-white/62">Spent so far</p>
          </div>
          <div className="pl-5">
            <p className="font-sans text-2xl font-semibold">$1,420</p>
            <p className="text-xs text-white/62">Total Budget</p>
          </div>
        </div>
      </div>
      <div className="mt-5 h-1.5 rounded-full bg-white/12">
        <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-[#d19031] to-[#f0b44d]" />
      </div>
      <div className="mt-3 flex justify-between text-sm">
        <span><strong className="font-semibold text-white">$540</strong> <span className="text-white/58">Remaining</span></span>
        <span className="text-white/58">38% left</span>
      </div>
    </Panel>
  );
}

function TopExpenses() {
  return (
    <Panel className="p-5">
      <SectionTitle>Top Expenses</SectionTitle>
      <p className="-mt-3 mb-4 text-sm text-white/58">Of your total budget</p>
      <div className="space-y-3">
        {budgetCategories.map((category) => (
          <div key={category.name}>
            <div className="mb-1 flex justify-between gap-3 text-sm">
              <span className="text-white/86">{category.name.replace("Activities & Experiences", "Activities")}</span>
              <span className="ml-auto tabular-nums text-white/58">{category.percent}%</span>
              <span className="w-14 text-right tabular-nums text-white/58">${category.value}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10">
              <div className="h-full rounded-full" style={{ width: `${category.percent}%`, backgroundColor: category.color }} />
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="mt-5 w-full rounded-md border border-[#d99a32]/80 px-4 py-2.5 text-sm font-medium text-[#f3b544]">
        Track Expenses
      </button>
    </Panel>
  );
}

function BudgetInsights() {
  const insights = [
    "Prices in Japan are 21% higher than in Bangkok",
    "Your biggest expense will be accommodation",
    "Booking stays early can save you up to 20%",
  ];

  return (
    <Panel className="p-5">
      <SectionTitle>Budget Insights</SectionTitle>
      <div className="space-y-4">
        {insights.map((insight) => (
          <div key={insight} className="flex gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#f3b544]" />
            <p className="text-sm leading-5 text-white/78">{insight}</p>
          </div>
        ))}
      </div>
      <button type="button" className="mt-5 w-full rounded-md border border-[#d99a32]/80 px-4 py-2.5 text-sm font-medium text-[#f3b544]">
        View Full Insights
      </button>
    </Panel>
  );
}
