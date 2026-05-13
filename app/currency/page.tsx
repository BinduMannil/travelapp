/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDownUp,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Clock3,
  CreditCard,
  Landmark,
  LineChart,
  LockKeyhole,
  Menu,
  Search,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import { JourneeLogoMark } from "@/components/brand/JourneeLogo";

export const metadata: Metadata = {
  title: "Currency / Travel Money",
  description:
    "Use JOURNEE's currency converter, USD to JPY exchange rate chart, Japan travel money planner, cash vs card guidance, ATM fee tips, and exchange rate alerts.",
};

type FavoriteRate = {
  code: string;
  name: string;
  flag: string;
  rate: string;
  movement: string;
  direction: "up" | "down";
};

type CurrencyCard = FavoriteRate & {
  country: string;
};

type QuickTool = {
  title: string;
  icon: typeof WalletCards;
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
  "Weather",
  "Currency",
];

const commonConversions = [
  ["USD to JPY", "156.80"],
  ["EUR to JPY", "168.92"],
  ["GBP to JPY", "197.34"],
  ["AUD to JPY", "101.54"],
];

const quickTools: QuickTool[] = [
  { title: "Currency Exchange Guide", icon: WalletCards },
  { title: "Travel Money Calculator", icon: CalendarDays },
  { title: "Live Exchange Rates", icon: LineChart },
  { title: "Historical Rate Charts", icon: Landmark },
];

const favorites: FavoriteRate[] = [
  { code: "USD", name: "United States Dollar", flag: "🇺🇸", rate: "156.80", movement: "0.42%", direction: "up" },
  { code: "EUR", name: "Euro", flag: "🇪🇺", rate: "168.92", movement: "0.35%", direction: "up" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧", rate: "197.34", movement: "0.12%", direction: "down" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺", rate: "101.54", movement: "0.28%", direction: "up" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦", rate: "114.32", movement: "0.31%", direction: "up" },
];

const popularCurrencies: CurrencyCard[] = [
  { code: "JPY", name: "Japanese Yen", country: "Japan", flag: "🇯🇵", rate: "156.80", movement: "0.42%", direction: "up" },
  { code: "EUR", name: "Euro", country: "Eurozone", flag: "🇪🇺", rate: "168.92", movement: "0.35%", direction: "up" },
  { code: "GBP", name: "British Pound", country: "United Kingdom", flag: "🇬🇧", rate: "197.34", movement: "0.12%", direction: "down" },
  { code: "AUD", name: "Australian Dollar", country: "Australia", flag: "🇦🇺", rate: "101.54", movement: "0.22%", direction: "up" },
  { code: "CAD", name: "Canadian Dollar", country: "Canada", flag: "🇨🇦", rate: "114.32", movement: "0.31%", direction: "up" },
  { code: "CHF", name: "Swiss Franc", country: "Switzerland", flag: "🇨🇭", rate: "176.41", movement: "0.18%", direction: "up" },
];

const chartPoints = [
  "8,136 36,126 64,144 92,118 122,132 152,116 180,104 210,122 238,96 266,88 296,70 324,76 352,62 382,78 410,58 438,64 466,82 494,56 522,42 550,50 578,36 606,52 634,48 662,72 690,66 718,54 746,72 774,56 802,78 830,62",
];

export default function CurrencyPage() {
  return (
    <main className="min-h-screen bg-[#020607] text-white [&_*]:font-sans">
      <TopNavigation />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_16%_3%,rgba(214,164,54,.12),transparent_30%),radial-gradient(circle_at_78%_4%,rgba(56,96,109,.14),transparent_32%),linear-gradient(180deg,#020607_0%,#071111_52%,#020607_100%)]" />
      <div className="relative mx-auto grid w-full max-w-[1920px] gap-4 px-4 pb-7 pt-20 sm:px-5 lg:px-6 xl:grid-cols-[320px_minmax(0,1fr)] 2xl:grid-cols-[320px_minmax(0,1fr)_440px]">
        <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <CurrencyConverterPanel />
          <CommonConversions />
          <RateAlerts />
          <QuickTools />
        </aside>

        <section className="min-w-0 space-y-4">
          <HeroBanner />
          <div className="grid gap-4 min-[1500px]:grid-cols-[minmax(0,1fr)_310px]">
            <ExchangeRateChart />
            <RateInsight />
          </div>
          <div className="grid gap-4 min-[1500px]:grid-cols-[minmax(0,1fr)_350px]">
            <TravelMoneyPlanner />
            <AtmFeesGuide />
          </div>
          <PopularCurrencies />
          <Disclaimer />
        </section>

        <aside className="space-y-4 2xl:sticky 2xl:top-24 2xl:self-start">
          <MyFavorites />
          <CashVsCard />
          <PaymentTips />
          <RateAlertExample />
        </aside>
      </div>
    </main>
  );
}

function TopNavigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/8 bg-[#020506]/88 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-[1920px] items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <JourneeLogoMark className="h-9 w-9 text-[#e4aa2d]" />
          <span className="text-2xl font-medium uppercase tracking-[0.18em] text-white">
            JOURNEE
          </span>
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-8 overflow-visible 2xl:flex">
          {navItems.map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={`relative inline-flex min-w-max items-center whitespace-nowrap px-1 py-3 text-sm font-medium leading-none transition ${
                item === "Currency" ? "text-[#f4b330]" : "text-white/86 hover:text-white"
              }`}
            >
              {item}
              {item === "Currency" && (
                <span className="absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[#f4b330]" />
              )}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden min-w-[260px] max-w-[520px] flex-1 items-center rounded-full border border-white/12 bg-white/[0.045] px-4 py-2.5 text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,.08)] lg:flex">
          <Search className="mr-3 h-4 w-4 shrink-0 text-white/48" />
          <span className="truncate text-sm font-normal">Search currencies or countries...</span>
          <Search className="ml-auto h-4 w-4 shrink-0 text-white/48" />
        </div>
        <button className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/88" type="button" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </button>
        <img src={avatar} alt="" className="h-10 w-10 shrink-0 rounded-full border border-[#d8aa4f]/55 object-cover" />
        <button className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-white/86 2xl:hidden" type="button" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-white/12 bg-[#071011]/82 shadow-[0_22px_70px_rgba(0,0,0,.34),inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-2xl ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ children, action }: { children: React.ReactNode; action?: string }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="text-xs font-bold uppercase leading-5 tracking-[0.18em] text-[#f4b330]">{children}</h2>
      {action && <button type="button" className="text-xs font-medium text-white/58">{action}</button>}
    </div>
  );
}

function CurrencyConverterPanel() {
  return (
    <Panel className="p-5">
      <SectionTitle>Currency Converter</SectionTitle>
      <div className="space-y-3">
        <CurrencySelect label="You Send" flag="🇺🇸" code="USD" name="United States Dollar" />
        <div className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-3">
          <p className="text-[1.55rem] font-light leading-none text-white/76 tabular-nums">1,000.00</p>
        </div>
        <div className="flex justify-end">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/12 bg-[#071011] text-[#f4b330]">
            <ArrowDownUp className="h-4 w-4" />
          </span>
        </div>
        <CurrencySelect label="You Receive" flag="🇯🇵" code="JPY" name="Japanese Yen" />
        <div className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-3">
          <p className="text-[1.55rem] font-light leading-none text-white tabular-nums">156,800</p>
        </div>
      </div>
      <div className="mt-3 space-y-1 text-sm leading-5 text-white/66">
        <p>
          1 USD = 156.80 JPY <span className="ml-2 text-xs font-medium text-[#71d66b]">▲ 0.42%</span>
        </p>
        <p className="text-xs">Mid-market rate · May 3, 2025 10:30 AM GMT</p>
      </div>
      <button type="button" className="mt-5 w-full rounded-md bg-gradient-to-r from-[#d39730] to-[#e7ad43] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_42px_rgba(216,170,79,.24)]">
        Convert Currency
      </button>
    </Panel>
  );
}

function CurrencySelect({ label, flag, code, name }: { label: string; flag: string; code: string; name: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-normal leading-5 text-white/56">{label}</span>
      <span className="flex min-h-10 items-center gap-2 rounded-md border border-white/10 bg-white/[0.035] px-3 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,.035)]">
        <span className="text-lg leading-none">{flag}</span>
        <span className="font-medium">{code}</span>
        <span className="min-w-0 flex-1 truncate text-xs font-normal text-white/78">{name}</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-white/52" />
      </span>
    </label>
  );
}

function CommonConversions() {
  return (
    <Panel className="p-5">
      <SectionTitle>Common Conversions</SectionTitle>
      <div className="space-y-1.5">
        {commonConversions.map(([pair, rate]) => (
          <div key={pair} className="flex items-center justify-between rounded-md bg-white/[0.035] px-3 py-2.5 text-sm">
            <span className="font-medium text-white/88">{pair}</span>
            <span className="font-medium text-white tabular-nums">{rate}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function RateAlerts() {
  return (
    <Panel className="p-5">
      <div className="flex gap-4">
        <Bell className="mt-1 h-6 w-6 shrink-0 text-white/70" />
        <div>
          <SectionTitle>Rate Alerts</SectionTitle>
          <p className="text-sm leading-6 text-white/68">Create an alert and notify me when the rate is met.</p>
        </div>
      </div>
      <button type="button" className="mt-5 w-full rounded-md border border-[#d99a32]/80 px-4 py-2.5 text-sm font-semibold text-[#f4b330]">
        Create Rate Alert
      </button>
    </Panel>
  );
}

function QuickTools() {
  return (
    <Panel className="p-5">
      <SectionTitle>Quick Tools</SectionTitle>
      <div className="space-y-4">
        {quickTools.map(({ title, icon: Icon }) => (
          <button key={title} type="button" className="flex w-full items-center gap-3 text-left">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-[#f4b330]/36 bg-[#f4b330]/10 text-[#f4b330]">
              <Icon className="h-4 w-4" />
            </span>
            <span className="text-sm font-medium leading-5 text-white/88">{title}</span>
          </button>
        ))}
      </div>
    </Panel>
  );
}

function HeroBanner() {
  const badges = [
    { title: "Live Rates", copy: "Updated in real-time", icon: Clock3 },
    { title: "No Hidden Fees", copy: "Transparent pricing", icon: WalletCards },
    { title: "Secure & Trusted", copy: "Bank-level security", icon: LockKeyhole },
    { title: "Smart Travel Tips", copy: "Save more abroad", icon: ShieldCheck },
  ];

  return (
    <section className="relative overflow-hidden rounded-lg border border-white/12 bg-[#091112] shadow-[0_28px_90px_rgba(0,0,0,.42)]">
      <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2400&q=88" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,8,.98)_0%,rgba(3,7,8,.72)_43%,rgba(3,7,8,.2)_100%),linear-gradient(180deg,rgba(3,7,8,.1),rgba(3,7,8,.68))]" />
      <div className="relative p-6 sm:p-8">
        <h1 className="max-w-[560px] text-[clamp(2rem,4.2vw,3.45rem)] font-extrabold leading-[1.12] text-white">
          Travel money made simple.
        </h1>
        <p className="mt-4 max-w-[560px] text-base font-normal leading-7 text-white">
          Live exchange rates, smart tools and tips to make your money go further.
        </p>
        <div className="mt-7 grid gap-4 border-t border-white/12 pt-5 sm:grid-cols-2 xl:grid-cols-4">
          {badges.map(({ title, copy, icon: Icon }) => (
            <div key={title} className="flex items-start gap-3 border-white/10 xl:border-r xl:pr-4 last:border-r-0">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-[#f4b330]/44 bg-[#f4b330]/10 text-[#f4b330]">
                <Icon className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-semibold leading-5 text-white">{title}</span>
                <span className="mt-0.5 block text-xs font-light leading-5 text-white/62">{copy}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExchangeRateChart() {
  return (
    <Panel className="p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <SectionTitle>Exchange Rate Chart</SectionTitle>
        <button type="button" className="flex min-h-10 items-center gap-8 rounded-md border border-white/10 bg-white/[0.035] px-3 text-sm font-medium text-white/90">
          USD / JPY
          <ChevronDown className="h-4 w-4 text-white/52" />
        </button>
      </div>
      <div className="mb-3 flex gap-6 text-sm">
        {["7D", "30D", "3M", "6M", "1Y", "5Y"].map((filter, index) => (
          <button key={filter} type="button" className={`${index === 0 ? "text-[#f4b330]" : "text-white/70"} font-medium`}>
            {filter}
          </button>
        ))}
      </div>
      <div className="relative h-[245px] overflow-hidden">
        <svg viewBox="0 0 880 245" className="h-full w-full" role="img" aria-label="USD to JPY exchange rate chart with current rate marker at 156.80">
          {[30, 72, 114, 156, 198].map((y) => (
            <line key={y} x1="70" x2="842" y1={y} y2={y} stroke="rgba(255,255,255,.09)" />
          ))}
          {[70, 198, 326, 454, 582, 710, 838].map((x) => (
            <line key={x} x1={x} x2={x} y1="30" y2="204" stroke="rgba(255,255,255,.035)" />
          ))}
          {["160.00", "158.00", "156.00", "154.00", "152.00"].map((label, index) => (
            <text key={label} x="0" y={36 + index * 42} fill="rgba(255,255,255,.68)" fontSize="13" fontWeight="400">
              {label}
            </text>
          ))}
          <defs>
            <linearGradient id="currencyChartFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#f4b330" stopOpacity=".24" />
              <stop offset="100%" stopColor="#f4b330" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polyline points={`70,204 ${chartPoints[0]} 842,80 842,204`} fill="url(#currencyChartFill)" stroke="none" />
          <polyline points={chartPoints[0]} fill="none" stroke="#f4a51f" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.2" />
          <circle cx="802" cy="78" r="5.5" fill="#f4b330" stroke="#071011" strokeWidth="3" />
          <rect x="814" y="66" width="58" height="26" rx="6" fill="#f4a51f" />
          <text x="824" y="84" fill="#061010" fontSize="13" fontWeight="800">
            156.80
          </text>
          {["Apr 27", "Apr 28", "Apr 29", "Apr 30", "May 1", "May 2", "May 3"].map((label, index) => (
            <text key={label} x={70 + index * 128} y="232" fill="rgba(255,255,255,.72)" fontSize="13" fontWeight="400">
              {label}
            </text>
          ))}
        </svg>
      </div>
    </Panel>
  );
}

function RateInsight() {
  return (
    <Panel className="p-5">
      <SectionTitle>Rate Insight</SectionTitle>
      <div className="flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#254c21] text-[#7ce072]">
          <TrendingUp className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-base font-semibold leading-6 text-[#8ded86]">Rates are currently favorable</h3>
          <p className="mt-3 text-sm font-normal leading-6 text-white/72">
            The USD to JPY exchange rate is 2.1% higher than the 30-day average.
          </p>
        </div>
      </div>
      <div className="mt-5 h-px w-9 bg-[#7ce072]/55" />
      <div className="mt-4 space-y-4 text-sm">
        <div className="flex justify-between gap-4">
          <span className="font-normal text-white/70">30-Day Average</span>
          <span className="font-medium text-white tabular-nums">153.62</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="font-normal text-white/70">Today&apos;s Rate</span>
          <span className="font-medium text-white tabular-nums">156.80</span>
        </div>
      </div>
      <button type="button" className="mt-6 w-full rounded-md border border-[#d99a32]/80 px-4 py-2.5 text-sm font-semibold text-[#f4b330]">
        View Forecast
      </button>
    </Panel>
  );
}

function TravelMoneyPlanner() {
  return (
    <Panel className="grid gap-5 p-5 lg:grid-cols-[240px_minmax(0,1fr)]">
      <div>
        <SectionTitle>Travel Money Planner</SectionTitle>
        <div className="space-y-3">
          <PlannerField label="Destination" value="🇯🇵  Japan" />
          <PlannerField label="Trip Duration" value="8 Days" />
          <PlannerField label="Travelers" value="1 Traveler" />
        </div>
      </div>
      <div className="rounded-lg border border-[#7cc657]/50 bg-[#0b1512] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
        <p className="text-sm font-normal leading-5 text-white/72">Estimated Total Budget</p>
        <p className="mt-1 text-3xl font-semibold leading-none text-white tabular-nums">
          $1,420 <span className="text-sm font-normal text-white/74">USD</span>
        </p>
        <p className="mt-4 text-xs font-normal leading-5 text-white/62">
          We recommend bringing a mix of cash and cards for Japan travel money.
        </p>
        <div className="mt-4 grid gap-3 rounded-md border border-white/10 bg-white/[0.025] p-4 sm:grid-cols-2">
          <div className="border-white/10 sm:border-r">
            <p className="text-sm font-normal text-white/70">Cash to Bring</p>
            <p className="mt-1 text-xl font-medium text-white tabular-nums">¥40,000</p>
            <p className="text-xs font-light text-white/50">≈ $255 USD</p>
          </div>
          <div>
            <p className="text-sm font-normal text-white/70">Card Spending</p>
            <p className="mt-1 text-xl font-medium text-white tabular-nums">≈ $1,165 USD</p>
            <p className="text-xs font-light text-white/50">equivalent</p>
          </div>
        </div>
        <p className="mt-3 text-xs font-normal leading-5 text-white/58">
          Recommendation: use cash for small shops, temples and local markets, and a card with low foreign transaction fees for hotels, restaurants and larger purchases.
        </p>
      </div>
    </Panel>
  );
}

function PlannerField({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-normal leading-5 text-white/56">{label}</span>
      <span className="flex min-h-10 items-center rounded-md border border-white/10 bg-white/[0.035] px-3 text-sm font-medium text-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,.035)]">
        <span className="min-w-0 flex-1 truncate">{value}</span>
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-white/52" />
      </span>
    </label>
  );
}

function AtmFeesGuide() {
  const items = [
    ["ATMs in Japan", "Japan ATM fees are usually clearest at 7-Eleven ATMs in cities and airports."],
    ["Typical ATM Fees", "¥220 - ¥330 per withdrawal."],
    ["Foreign Transaction Fees", "0% - 3% varies by card."],
  ];

  return (
    <Panel className="p-5">
      <SectionTitle>ATM & Fees Guide</SectionTitle>
      <div className="space-y-4">
        {items.map(([title, copy], index) => (
          <div key={title} className="flex gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-white/80">
              {index === 0 ? <Landmark className="h-4 w-4" /> : index === 1 ? <WalletCards className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
            </span>
            <span>
              <span className="block text-sm font-semibold leading-5 text-white">{title}</span>
              <span className="mt-0.5 block text-sm font-normal leading-5 text-white/62">{copy}</span>
            </span>
          </div>
        ))}
      </div>
      <button type="button" className="mt-5 w-full rounded-md border border-[#d99a32]/80 px-4 py-2.5 text-sm font-semibold text-[#f4b330]">
        See Top Travel Cards
      </button>
    </Panel>
  );
}

function PopularCurrencies() {
  return (
    <Panel className="p-5">
      <SectionTitle action="View all currencies">Popular Currencies for Travelers</SectionTitle>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 min-[1740px]:grid-cols-6">
        {popularCurrencies.map((currency, index) => (
          <div key={currency.code} className={`rounded-lg border ${index === 0 ? "border-[#71c75f]/60" : "border-white/10"} bg-white/[0.035] p-3`}>
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-white/10 text-lg">{currency.flag}</span>
              <span className="min-w-0">
                <span className="block text-base font-semibold leading-5 text-white">{currency.code}</span>
                <span className="block truncate text-[0.72rem] font-light leading-4 text-white/56">{currency.name}</span>
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-sm font-medium tabular-nums text-white">{currency.rate}</span>
              <Movement direction={currency.direction} value={currency.movement} />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function Disclaimer() {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-white/12 bg-[#071011]/82 px-5 py-4 text-xs font-normal leading-5 text-white/58 shadow-[inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-2xl lg:flex-row lg:items-center lg:justify-between">
      <p className="max-w-[740px]">
        Exchange rates are mid-market rates and for reference only. Actual rates may vary based on your provider. Always check fees and charges before making a transaction.
      </p>
      <p className="shrink-0 text-right">
        Source: Wise (Mid-Market Rates)<br />
        Last updated: May 3, 2025 10:30 AM GMT <span className="ml-2 inline-block h-2 w-2 rounded-full bg-[#71d66b]" />
      </p>
    </div>
  );
}

function MyFavorites() {
  return (
    <Panel className="p-5">
      <SectionTitle action="Edit">My Favorites</SectionTitle>
      <div className="space-y-4">
        {favorites.map((favorite) => (
          <div key={favorite.code} className="grid grid-cols-[minmax(0,1fr)_72px_68px] items-center gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="text-xl leading-none">{favorite.flag}</span>
              <span className="min-w-0">
                <span className="mr-2 text-sm font-semibold text-white">{favorite.code}</span>
                <span className="text-xs font-normal text-white/70">{favorite.name}</span>
              </span>
            </div>
            <span className="text-right text-sm font-medium text-white tabular-nums">{favorite.rate}</span>
            <Movement direction={favorite.direction} value={favorite.movement} />
          </div>
        ))}
      </div>
    </Panel>
  );
}

function Movement({ direction, value }: { direction: "up" | "down"; value: string }) {
  const Icon = direction === "up" ? TrendingUp : TrendingDown;
  return (
    <span className={`inline-flex justify-end gap-1 text-xs font-medium tabular-nums ${direction === "up" ? "text-[#71d66b]" : "text-[#ed5f5f]"}`}>
      <Icon className="h-3.5 w-3.5" />
      {value}
    </span>
  );
}

function CashVsCard() {
  return (
    <Panel className="p-5">
      <SectionTitle>Cash vs Card in Japan</SectionTitle>
      <div className="grid grid-cols-2 border-b border-white/10 text-sm">
        <button type="button" className="border-b border-[#f4b330] pb-3 font-semibold text-[#f4b330]">Overview</button>
        <button type="button" className="pb-3 font-medium text-white/58">Recommended</button>
      </div>
      <div className="mt-4 space-y-5">
        <MoneyMode title="Cash" icon={Landmark}>
          Widely accepted in rural areas, markets, small shops and temples.
        </MoneyMode>
        <MoneyMode title="Card" icon={CreditCard}>
          Credit cards accepted in most hotels, restaurants and stores.
        </MoneyMode>
      </div>
      <button type="button" className="mt-5 w-full rounded-md border border-[#d99a32]/80 px-4 py-2.5 text-sm font-semibold text-[#f4b330]">
        View Full Guide
      </button>
    </Panel>
  );
}

function MoneyMode({ title, icon: Icon, children }: { title: string; icon: typeof Landmark; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-[#21451f] text-[#80d675]">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <h3 className="text-sm font-semibold leading-5 text-white/88">{title}</h3>
        <p className="mt-1 text-sm font-normal leading-6 text-white/68">{children}</p>
      </div>
    </div>
  );
}

function PaymentTips() {
  const tips = [
    "Notify your bank before traveling.",
    "Use IC cards like Suica or Pasmo for trains and buses.",
    "Keep small bills and coins for vending machines and taxis.",
    "Dynamic Currency Conversion may cost more. Choose local currency when paying.",
  ];

  return (
    <Panel className="p-5">
      <SectionTitle>Payment Tips for Japan</SectionTitle>
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div key={tip} className="flex gap-4">
            <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md border border-[#f4b330]/36 bg-[#f4b330]/10 text-[#f4b330]">
              {index === 0 ? <Bell className="h-3.5 w-3.5" /> : index === 1 ? <WalletCards className="h-3.5 w-3.5" /> : index === 2 ? <Landmark className="h-3.5 w-3.5" /> : <CreditCard className="h-3.5 w-3.5" />}
            </span>
            <p className="text-sm font-normal leading-6 text-white/76">{tip}</p>
          </div>
        ))}
      </div>
      <button type="button" className="ml-auto mt-5 flex items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm font-medium text-[#f4b330]">
        View All Tips
        <ChevronRight className="h-4 w-4" />
      </button>
    </Panel>
  );
}

function RateAlertExample() {
  return (
    <Panel className="p-5">
      <SectionTitle>Rate Alerts (Example)</SectionTitle>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold leading-5 text-white">USD / JPY</p>
          <p className="text-sm font-normal leading-5 text-white/80">Alert me when rate is below 150.00</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[#71d66b]">Active</span>
          <span className="relative h-6 w-11 rounded-full bg-[#79cf6f] shadow-inner">
            <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />
          </span>
        </div>
      </div>
      <button type="button" className="mt-4 w-full rounded-md border border-[#d99a32]/80 px-4 py-2.5 text-sm font-semibold text-[#f4b330]">
        Manage Alerts
      </button>
    </Panel>
  );
}
