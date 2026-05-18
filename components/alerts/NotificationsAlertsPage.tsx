/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CloudRain,
  Headphones,
  History,
  Mail,
  Menu,
  MessageSquare,
  Moon,
  Plane,
  Search,
  Settings,
  ShieldCheck,
  Smartphone,
  Tag,
  UserRound,
  WalletCards,
} from "lucide-react";
import { JourneeLogoMark } from "@/components/brand/JourneeLogo";
import { MainNavLink } from "@/components/navigation/MainNavLink";

type Icon = typeof Bell;

type AlertCategory =
  | "travel"
  | "price"
  | "visa"
  | "weather"
  | "safety"
  | "reminder";

type AlertItem = {
  id: number;
  title: string;
  description: string;
  time: string;
  category: AlertCategory;
  icon: Icon;
  tone: string;
  dot: string;
};

type MenuItem = {
  label: string;
  count?: number;
  icon: Icon;
  active?: boolean;
};

const avatar =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80";

const navItems = [
  "Home",
  "Explore",
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
  "Settings",
  "Support",
  "Alerts",
];

const menuItems: MenuItem[] = [
  { label: "All Notifications", count: 24, icon: Bell, active: true },
  { label: "Travel Alerts", count: 6, icon: Plane },
  { label: "Price Alerts", count: 5, icon: Tag },
  { label: "Visa Alerts", count: 3, icon: WalletCards },
  { label: "Weather Alerts", count: 4, icon: CloudRain },
  { label: "Safety Alerts", count: 2, icon: ShieldCheck },
  { label: "Trip Reminders", count: 4, icon: CalendarDays },
  { label: "Alert History", icon: History },
];

const summaryCards = [
  { label: "Total Unread", value: "24", icon: Bell },
  { label: "Travel Alerts", value: "6", icon: Plane },
  { label: "Price Alerts", value: "5", icon: Tag },
  { label: "Safety Alerts", value: "2", icon: ShieldCheck },
  { label: "Reminders", value: "4", icon: CalendarDays },
];

const alerts: AlertItem[] = [
  {
    id: 1,
    title: "Flight price dropped",
    description: "Los Angeles (LAX) to Tokyo (NRT) dropped by $120",
    time: "10:24 AM",
    category: "travel",
    icon: Plane,
    tone: "bg-[#4b3510] text-[#ffc247]",
    dot: "bg-[#ffc247]",
  },
  {
    id: 2,
    title: "Safety alert: Demonstrations in Paris",
    description: "Avoid affected areas in central Paris on May 10 to 11",
    time: "Yesterday",
    category: "safety",
    icon: ShieldCheck,
    tone: "bg-[#5a1f1d] text-[#ff7d73]",
    dot: "bg-[#ff6961]",
  },
  {
    id: 3,
    title: "Weather alert: Heavy rain in Bangkok",
    description: "Expect heavy rainfall and possible flooding May 7 to 8",
    time: "May 6, 2025",
    category: "weather",
    icon: CloudRain,
    tone: "bg-[#12345b] text-[#74b9ff]",
    dot: "bg-[#63a8ff]",
  },
  {
    id: 4,
    title: "Visa update for Japan",
    description: "Processing times for tourist visas may take longer",
    time: "May 5, 2025",
    category: "visa",
    icon: WalletCards,
    tone: "bg-[#35235f] text-[#b59cff]",
    dot: "bg-[#9d83ff]",
  },
  {
    id: 5,
    title: "Trip reminder: 7 days to Japan",
    description: "Your trip to Tokyo starts on May 13, 2025",
    time: "May 5, 2025",
    category: "reminder",
    icon: CalendarDays,
    tone: "bg-[#0e4c58] text-[#61d8e4]",
    dot: "bg-[#61d8e4]",
  },
  {
    id: 6,
    title: "Hotel price alert",
    description: "Marriott Tokyo price increased by $35",
    time: "May 4, 2025",
    category: "price",
    icon: Tag,
    tone: "bg-[#274b1f] text-[#a9df6f]",
    dot: "bg-[#a9df6f]",
  },
  {
    id: 7,
    title: "Gate change: JAL JL18",
    description: "Your flight to Tokyo (NRT) gate changed to 24",
    time: "May 4, 2025",
    category: "travel",
    icon: Plane,
    tone: "bg-[#4b3510] text-[#ffc247]",
    dot: "bg-[#ffc247]",
  },
];

const preferences = [
  { label: "Push Notifications", subtext: "Instant alerts on your device", icon: Bell, enabled: true },
  { label: "Email Notifications", subtext: "Receive alerts via email", icon: Mail, enabled: true },
  { label: "SMS Notifications", subtext: "Important alerts via SMS", icon: MessageSquare, enabled: true },
  { label: "In-App Notifications", subtext: "Alerts within Journee app", icon: Smartphone, enabled: true },
  { label: "Marketing & Tips", subtext: "Travel tips and special offers", icon: Settings, enabled: false },
];

const trips = [
  {
    city: "Tokyo, Japan",
    dates: "May 13 to May 20, 2025",
    countdown: "7 days to go",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=240&q=80",
  },
  {
    city: "Bali, Indonesia",
    dates: "Jun 5 to Jun 15, 2025",
    countdown: "30 days to go",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=240&q=80",
  },
];

const alertSummary = [
  { label: "Travel", value: 14, pct: "39%", color: "#f2b633" },
  { label: "Price", value: 9, pct: "25%", color: "#8fcf67" },
  { label: "Weather", value: 6, pct: "17%", color: "#4a8ddf" },
  { label: "Visa", value: 3, pct: "8%", color: "#8a6ee8" },
  { label: "Safety", value: 4, pct: "11%", color: "#f05c55" },
];

const assurances = [
  { label: "Real-time Alerts", text: "Get updates as they happen", icon: Bell },
  { label: "Personalized for You", text: "Smart alerts based on your trips", icon: UserRound },
  { label: "Trusted Sources", text: "Verified information you can rely on", icon: ShieldCheck },
  { label: "Your Safety, Our Priority", text: "We keep you informed and protected", icon: CheckCircle2 },
];

export function NotificationsAlertsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#020607] font-sans text-white">
      <TopNavigation />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(215,166,60,.13),transparent_30%),radial-gradient(circle_at_82%_9%,rgba(83,137,151,.14),transparent_34%),linear-gradient(180deg,#020607_0%,#071011_48%,#020607_100%)]" />

      <div className="relative mx-auto grid w-full max-w-[1920px] gap-5 px-4 pb-8 pt-20 sm:px-6 2xl:grid-cols-[335px_minmax(0,1fr)_485px]">
        <aside className="hidden 2xl:block">
          <LeftSidebar />
        </aside>

        <section className="min-w-0 space-y-4">
          <MobileCategoryChips />
          <MainHeader />
          <SummaryGrid />
          <RecentAlerts />
        </section>

        <aside className="space-y-4 2xl:sticky 2xl:top-24 2xl:self-start">
          <RightSidebar />
        </aside>

        <AssuranceStrip />
      </div>
    </main>
  );
}

function TopNavigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/8 bg-[#020506]/88 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-[1920px] items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <JourneeLogoMark className="h-9 w-9 text-[#f3b432]" />
          <span className="text-2xl font-medium uppercase tracking-[0.16em] text-white">
            JOURNEE
          </span>
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-8 overflow-visible 2xl:flex">
          {navItems.map((item) => (
            <MainNavLink
              key={item}
              label={item}
              className="relative inline-flex min-w-max items-center whitespace-nowrap px-1 py-3 text-sm font-medium transition"
              activeClassName="text-[#f3b432]"
              inactiveClassName="text-white/88 hover:text-white"
              underlineClassName="absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[#f3b432]"
            />
          ))}
        </nav>
        <div className="ml-auto hidden min-w-[230px] max-w-[310px] items-center rounded-full border border-white/12 bg-white/[0.045] px-4 py-2.5 text-white/54 shadow-[inset_0_1px_0_rgba(255,255,255,.08)] lg:flex">
          <Search className="mr-3 h-4 w-4 shrink-0 text-white/46" />
          <span className="truncate text-xs">Search destinations or anything...</span>
        </div>
        <button
          className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/88"
          type="button"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-[#f3b432]" />
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
      className={`rounded-lg border border-white/10 bg-[#071011]/78 shadow-[0_22px_70px_rgba(0,0,0,.34),inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-2xl ${className}`}
    >
      {children}
    </div>
  );
}

function SectionTitle({
  title,
  action,
}: {
  title: string;
  action?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-[#f3b432]">
        {title}
      </h2>
      {action && (
        <button type="button" className="text-xs font-semibold text-[#f3b432]">
          {action}
        </button>
      )}
    </div>
  );
}

function LeftSidebar() {
  return (
    <div className="sticky top-24 space-y-4">
      <Panel className="p-5">
        <SectionTitle title="Alerts Center" />
        <div className="mt-5 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm transition ${
                item.active
                  ? "bg-[#a67923]/62 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.12)]"
                  : "text-white/88 hover:bg-white/[0.055]"
              }`}
            >
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                  item.active ? "bg-[#7f5a18]/55 text-[#ffc247]" : "bg-white/[0.07] text-white/86"
                }`}
              >
                <item.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1 font-medium">{item.label}</span>
              {item.count && (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    item.active
                      ? "border border-[#ffd270]/65 bg-[#7f5a18]/45 text-white"
                      : "bg-white/12 text-white/80"
                  }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </Panel>

      <Panel className="p-5 text-center">
        <div className="mx-auto grid h-12 w-16 place-items-center rounded-xl bg-white/[0.06] text-[#f3b432]">
          <Bell className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-sm font-bold uppercase tracking-[0.1em] text-[#f3b432]">
          Never Miss Important Updates
        </h3>
        <p className="mx-auto mt-3 max-w-[230px] text-sm leading-6 text-white/66">
          Enable push notifications to get real-time alerts on your phone and email.
        </p>
        <button className="mt-4 w-full rounded-md border border-[#c88e25]/80 px-4 py-2.5 text-sm font-semibold text-[#f3b432] transition hover:bg-[#c88e25]/12">
          Enable Notifications
        </button>
      </Panel>

      <Panel className="p-5">
        <SectionTitle title="Quiet Hours" />
        <div className="mt-5 flex gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/[0.07] text-white/88">
            <Moon className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold text-white">10:00 PM to 7:00 AM</p>
            <p className="mt-1 text-sm leading-6 text-white/62">
              You will not receive non-urgent alerts during this time.
            </p>
          </div>
        </div>
        <button className="mt-4 w-full rounded-md border border-[#c88e25]/80 px-4 py-2.5 text-sm font-semibold text-[#f3b432] transition hover:bg-[#c88e25]/12">
          Edit Quiet Hours
        </button>
      </Panel>
    </div>
  );
}

function MobileCategoryChips() {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 2xl:hidden">
      {menuItems.slice(0, 7).map((item) => (
        <button
          key={item.label}
          type="button"
          className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold ${
            item.active
              ? "border-[#f3b432]/70 bg-[#f3b432]/18 text-[#f3b432]"
              : "border-white/10 bg-white/[0.045] text-white/76"
          }`}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
          {item.count && <span className="text-white/64">{item.count}</span>}
        </button>
      ))}
    </div>
  );
}

function MainHeader() {
  return (
    <Panel className="px-4 py-5 sm:px-7 sm:py-7">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Notifications & Alerts
          </h1>
          <p className="mt-2 text-base text-white/76">
            Stay informed and travel with confidence.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 rounded-md border border-white/14 bg-white/[0.035] px-4 py-3 text-sm font-medium text-white/88 transition hover:border-[#f3b432]/45 hover:text-[#f3b432]"
        >
          <CheckCircle2 className="h-4 w-4" />
          Mark all as read
        </button>
      </div>
    </Panel>
  );
}

function SummaryGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {summaryCards.map((card, index) => (
        <Panel key={card.label} className="p-4">
          <div className="flex min-h-[72px] items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/[0.045] text-[#f3b432]">
              <card.icon className={index === 1 || index === 2 ? "h-7 w-7 text-[#9fd3ff]" : "h-7 w-7"} />
            </span>
            <div>
              <p className="text-3xl font-extrabold leading-none text-white">{card.value}</p>
              <p className={`mt-2 text-sm ${index === 0 ? "text-[#f3b432]" : "text-white/82"}`}>
                {card.label}
              </p>
            </div>
          </div>
        </Panel>
      ))}
    </div>
  );
}

function RecentAlerts() {
  return (
    <Panel className="overflow-hidden p-3 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 py-2">
        <SectionTitle title="Recent Alerts" />
        <button type="button" className="flex items-center gap-2 text-sm text-white/82">
          <span className="text-white/55">Filter:</span> All Alerts
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 divide-y divide-white/[0.055] overflow-hidden rounded-lg border border-white/[0.07]">
        {alerts.map((alert) => (
          <button
            key={alert.id}
            type="button"
            className="group grid w-full grid-cols-[auto_1fr] items-center gap-3 bg-white/[0.018] px-4 py-4 text-left transition hover:bg-white/[0.045] sm:grid-cols-[auto_1fr_auto_auto] sm:gap-4 sm:px-5"
          >
            <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${alert.tone}`}>
              <alert.icon className="h-6 w-6" />
            </span>
            <span className="min-w-0">
              <span className="block text-base font-semibold text-white">{alert.title}</span>
              <span className="mt-1 block text-sm leading-6 text-white/62">
                {alert.description}
              </span>
            </span>
            <span className="col-start-2 flex items-center justify-start gap-3 text-sm text-white/82 sm:col-start-auto">
              {alert.time}
              <span className={`h-2 w-2 rounded-full ${alert.dot}`} />
            </span>
            <ChevronRight className="hidden h-5 w-5 text-white/80 transition group-hover:translate-x-0.5 sm:block" />
          </button>
        ))}
      </div>

      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold text-[#f3b432] transition hover:bg-[#f3b432]/10"
      >
        View All Alerts
        <ChevronDown className="h-4 w-4" />
      </button>
    </Panel>
  );
}

function RightSidebar() {
  return (
    <>
      <Panel className="p-5">
        <SectionTitle title="Notification Preferences" action="Manage All" />
        <div className="mt-5 space-y-4">
          {preferences.map((pref) => (
            <div key={pref.label} className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.07] text-white/86">
                <pref.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white">{pref.label}</p>
                <p className="text-xs leading-5 text-white/54">{pref.subtext}</p>
              </div>
              <span
                className={`flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 ${
                  pref.enabled ? "justify-end bg-[#d99c2f]" : "justify-start bg-white/18"
                }`}
              >
                <span className="h-5 w-5 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,.32)]" />
              </span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="p-5">
        <SectionTitle title="Your Upcoming Trips" action="View All" />
        <div className="mt-5 divide-y divide-white/[0.08]">
          {trips.map((trip) => (
            <div key={trip.city} className="grid grid-cols-[88px_1fr_auto] gap-4 py-3 first:pt-0 last:pb-0">
              <img src={trip.image} alt="" className="h-[82px] w-[88px] rounded-md object-cover" />
              <div className="min-w-0">
                <p className="text-base font-semibold text-white">{trip.city}</p>
                <p className="mt-1 text-sm text-white/66">{trip.dates}</p>
                <p className="mt-1 text-sm font-semibold text-[#f3b432]">{trip.countdown}</p>
              </div>
              <button className="mt-3 grid h-11 w-11 place-items-center rounded-md border border-white/10 text-[#f3b432]">
                <Bell className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="p-5">
        <SectionTitle title="Alert Summary (30 Days)" />
        <div className="mt-5 grid gap-5 sm:grid-cols-[160px_1fr] 2xl:grid-cols-[170px_1fr]">
          <div className="grid place-items-center">
            <div
              className="grid h-36 w-36 place-items-center rounded-full"
              style={{
                background:
                  "conic-gradient(#f2b633 0 39%, #8fcf67 39% 64%, #4a8ddf 64% 81%, #8a6ee8 81% 89%, #f05c55 89% 100%)",
              }}
            >
              <div className="grid h-[92px] w-[92px] place-items-center rounded-full bg-[#071011] text-center shadow-[inset_0_1px_0_rgba(255,255,255,.08)]">
                <span>
                  <span className="block text-3xl font-extrabold leading-none text-white">36</span>
                  <span className="mt-1 block text-xs text-white/64">Total Alerts</span>
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {alertSummary.map((item) => (
              <div key={item.label} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 text-sm">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-white/78">{item.label}</span>
                <span className="font-medium text-white">
                  {item.value} <span className="text-white/60">({item.pct})</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <Panel className="p-5">
        <div className="flex gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-white/[0.045] text-[#f3b432]">
            <Headphones className="h-8 w-8" />
          </span>
          <div className="min-w-0">
            <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#f3b432]">
              Need Help?
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/62">
              Learn how alerts work and how to customize them.
            </p>
            <button className="mt-3 rounded-md border border-[#c88e25]/80 px-12 py-2 text-sm font-semibold text-[#f3b432] transition hover:bg-[#c88e25]/12">
              Visit Help Center
            </button>
          </div>
        </div>
      </Panel>
    </>
  );
}

function AssuranceStrip() {
  return (
    <Panel className="2xl:col-span-3">
      <div className="grid gap-4 px-5 py-4 sm:grid-cols-2 xl:grid-cols-4">
        {assurances.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/[0.045] text-[#f3b432]">
              <item.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-white">{item.label}</p>
              <p className="text-sm text-white/56">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
