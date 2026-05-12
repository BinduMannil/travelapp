/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Bell,
  BellRing,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  CloudRain,
  CreditCard,
  Filter,
  Gift,
  Heart,
  Hotel,
  MapPin,
  Menu,
  Plane,
  Search,
  Settings,
  UsersRound,
} from "lucide-react";
import { JourneeLogoMark } from "@/components/brand/JourneeLogo";

type ActivityCategory =
  | "trip_updates"
  | "bookings"
  | "price_alerts"
  | "saved_places"
  | "friends_groups"
  | "system_alerts";

type ActivitySource =
  | "activities"
  | "notifications"
  | "bookings"
  | "alerts"
  | "saved_places"
  | "friend_activity";

type ActivityItem = {
  id: string;
  source: ActivitySource;
  category: ActivityCategory;
  section: "Today" | "Yesterday";
  icon: LucideIcon;
  tone: "green" | "blue" | "purple" | "orange" | "teal" | "gold" | "red";
  image: string;
  title: string;
  description: string;
  metadata: string[];
  timestamp: string;
  unread?: boolean;
};

type Reminder = {
  id: string;
  title: string;
  time: string;
  date: string;
  status: string;
};

const navItems = [
  "Home",
  "Explore",
  "Map",
  "Trips",
  "Guides",
  "Journal",
  "Stays",
  "Flights",
  "Visa",
  "Budget",
  "Weather",
  "Currency",
  "Support",
];

const menuItems: Array<{ label: string; count: number; icon: LucideIcon; active?: boolean }> = [
  { label: "All Activity", count: 24, icon: Gift, active: true },
  { label: "Trip Updates", count: 8, icon: BellRing },
  { label: "Bookings", count: 5, icon: CalendarDays },
  { label: "Price Alerts", count: 4, icon: Bell },
  { label: "Saved Places", count: 3, icon: Heart },
  { label: "Friends & Groups", count: 2, icon: UsersRound },
  { label: "System Alerts", count: 2, icon: Settings },
];

const quickFilters = [
  { label: "All" },
  { label: "Unread", count: 12 },
  { label: "Today" },
  { label: "This Week" },
  { label: "This Month" },
];

const activities: ActivityItem[] = [
  {
    id: "booking-confirmed-park-hyatt-tokyo",
    source: "bookings",
    category: "bookings",
    section: "Today",
    icon: Hotel,
    tone: "green",
    image:
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=520&q=88",
    title: "Booking Confirmed",
    description: "Your reservation at Park Hyatt Tokyo is confirmed.",
    metadata: ["May 20 to May 23, 2025", "3 Nights", "2 Guests"],
    timestamp: "10:24 AM",
    unread: true,
  },
  {
    id: "flight-update-jl-712",
    source: "activities",
    category: "trip_updates",
    section: "Today",
    icon: Plane,
    tone: "blue",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=520&q=88",
    title: "Flight Update",
    description: "Your flight to Tokyo (JL 712) departs in 18 hours.",
    metadata: ["JFK to HND", "May 20, 2025", "11:30 PM"],
    timestamp: "9:15 AM",
    unread: true,
  },
  {
    id: "price-alert-tokyo-drop",
    source: "alerts",
    category: "price_alerts",
    section: "Today",
    icon: CircleDollarSign,
    tone: "purple",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=520&q=88",
    title: "Price Alert",
    description: "The price for Tokyo has dropped by 12%.",
    metadata: ["Tokyo, Japan", "May 18 to May 23", "1 Traveler"],
    timestamp: "8:02 AM",
    unread: true,
  },
  {
    id: "saved-place-shibuya-reviews",
    source: "saved_places",
    category: "saved_places",
    section: "Today",
    icon: Heart,
    tone: "orange",
    image:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=520&q=88",
    title: "Saved Place Update",
    description: "New reviews for Shibuya Crossing.",
    metadata: ["Shibuya, Tokyo, Japan"],
    timestamp: "7:45 AM",
  },
  {
    id: "friend-activity-sarah-food-walk",
    source: "friend_activity",
    category: "friends_groups",
    section: "Yesterday",
    icon: UsersRound,
    tone: "teal",
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=520&q=88",
    title: "Friend Activity",
    description: "Sarah added Shibuya Food & Culture Walk to their trip.",
    metadata: ["Tokyo Trip", "May 18, 2025"],
    timestamp: "Yesterday, 6:30 PM",
  },
  {
    id: "payment-received-bk-8239741",
    source: "notifications",
    category: "system_alerts",
    section: "Yesterday",
    icon: CreditCard,
    tone: "gold",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=520&q=88",
    title: "Payment Received",
    description: "Your payment of USD $356.40 was successful.",
    metadata: ["Booking ID: BK-8239741"],
    timestamp: "Yesterday, 3:12 PM",
  },
  {
    id: "weather-alert-kyoto-rain",
    source: "alerts",
    category: "system_alerts",
    section: "Yesterday",
    icon: CloudRain,
    tone: "red",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=520&q=88",
    title: "Weather Alert",
    description: "Heavy rain expected in Kyoto tomorrow.",
    metadata: ["Kyoto, Japan", "May 21, 2025"],
    timestamp: "Yesterday, 12:05 PM",
  },
];

const summaryStats = [
  { label: "Total Updates", value: 24, tone: "text-[#ffd84a]" },
  { label: "Trip Updates", value: 8, tone: "text-white" },
  { label: "Bookings", value: 5, tone: "text-[#6aff6d]" },
  { label: "Price Alerts", value: 4, tone: "text-[#ff5868]" },
  { label: "Saved Places", value: 3, tone: "text-[#ffac21]" },
  { label: "Friend Activities", value: 2, tone: "text-[#49e7d5]" },
];

const reminders: Reminder[] = [
  {
    id: "flight-to-tokyo",
    title: "Flight to Tokyo",
    time: "JL 712 - 11:30 PM",
    date: "MAY 20",
    status: "Departs in 18h 45m",
  },
  {
    id: "park-hyatt-check-in",
    title: "Check-in: Park Hyatt Tokyo",
    time: "3:00 PM",
    date: "MAY 20",
    status: "Today",
  },
  {
    id: "shibuya-walk",
    title: "Shibuya Food & Culture Walk",
    time: "9:00 AM",
    date: "MAY 21",
    status: "Tomorrow",
  },
];

const friendAvatars = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&q=80",
];

const toneClasses: Record<ActivityItem["tone"], { icon: string; title: string; dot: string }> = {
  green: {
    icon: "bg-[#143d1b] text-[#64ff69] shadow-[0_0_28px_rgba(65,255,82,.18)]",
    title: "text-[#64ff69]",
    dot: "bg-[#64ff69]",
  },
  blue: {
    icon: "bg-[#0b3c67] text-[#56b9ff] shadow-[0_0_28px_rgba(73,178,255,.18)]",
    title: "text-[#56b9ff]",
    dot: "bg-[#56b9ff]",
  },
  purple: {
    icon: "bg-[#3d1f66] text-[#c784ff] shadow-[0_0_28px_rgba(193,126,255,.18)]",
    title: "text-[#c784ff]",
    dot: "bg-[#c784ff]",
  },
  orange: {
    icon: "bg-[#63360b] text-[#ff9b18] shadow-[0_0_28px_rgba(255,151,24,.18)]",
    title: "text-[#ff9b18]",
    dot: "bg-[#ff9b18]",
  },
  teal: {
    icon: "bg-[#0a4b48] text-[#48e7d3] shadow-[0_0_28px_rgba(72,231,211,.18)]",
    title: "text-[#48e7d3]",
    dot: "bg-[#48e7d3]",
  },
  gold: {
    icon: "bg-[#5b470b] text-[#ffd84a] shadow-[0_0_28px_rgba(255,216,74,.18)]",
    title: "text-[#ffd84a]",
    dot: "bg-[#ffd84a]",
  },
  red: {
    icon: "bg-[#5b1d26] text-[#ff6170] shadow-[0_0_28px_rgba(255,97,112,.18)]",
    title: "text-[#ff6170]",
    dot: "bg-[#ff6170]",
  },
};

const groupedActivities = activities.reduce<Record<ActivityItem["section"], ActivityItem[]>>(
  (groups, activity) => {
    groups[activity.section].push(activity);
    return groups;
  },
  { Today: [], Yesterday: [] },
);

export function ActivityFeedPage() {
  return (
    <main className="min-h-screen bg-[#020608] text-white">
      <TopNavigation />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(244,178,31,.13),transparent_25%),radial-gradient(circle_at_74%_8%,rgba(44,111,123,.16),transparent_30%),linear-gradient(180deg,#020608_0%,#071117_48%,#020608_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:76px_76px]" />

      <div className="relative mx-auto grid w-full max-w-[1920px] gap-4 px-4 pb-8 pt-20 sm:px-5 xl:grid-cols-[280px_minmax(0,1fr)_380px] 2xl:grid-cols-[300px_minmax(0,1fr)_430px]">
        <aside className="order-3 xl:order-1 xl:sticky xl:top-20 xl:self-start">
          <LeftSidebar />
        </aside>

        <section className="order-1 min-w-0 xl:order-2">
          <FeedPanel />
        </section>

        <aside className="order-2 space-y-4 xl:order-3 xl:sticky xl:top-20 xl:self-start">
          <RightSidebar />
        </aside>
      </div>
    </main>
  );
}

function TopNavigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/8 bg-[#020506]/90 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-[1920px] items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <JourneeLogoMark className="h-9 w-9 text-[#f2b21f]" />
          <span className="text-2xl font-semibold uppercase tracking-[0.12em] text-white">
            JOURNEE
          </span>
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : item === "Explore" ? "/discover" : `/${item.toLowerCase()}`}
              className="px-3 py-5 text-sm font-medium text-white/88 transition hover:text-[#f2b21f] 2xl:px-4"
            >
              {item}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            className="hidden h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-white/82 transition hover:border-[#f2b21f]/55 hover:text-[#f2b21f] sm:grid"
            aria-label="Open rewards"
          >
            <Gift className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="relative grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-white/82 transition hover:border-[#f2b21f]/55 hover:text-[#f2b21f]"
            aria-label="Open notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#f2b21f] text-[10px] font-bold text-black">
              3
            </span>
          </button>
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
            alt="Profile avatar"
            className="h-9 w-9 rounded-full border border-[#f2b21f]/45 object-cover"
          />
          <ChevronDown className="hidden h-4 w-4 text-white/70 sm:block" />
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-white/82 xl:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

function LeftSidebar() {
  return (
    <div className="rounded-lg border border-white/10 bg-[#071018]/78 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_24px_80px_rgba(0,0,0,.34)] backdrop-blur-2xl">
      <h1 className="text-lg font-semibold text-white">Activity</h1>
      <div className="mt-3 space-y-1">
        {menuItems.map(({ label, count, icon: Icon, active }) => (
          <button
            key={label}
            type="button"
            className={`flex h-10 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-medium transition ${
              active
                ? "border-l-2 border-[#f2b21f] bg-[#f2b21f]/18 text-[#f2b21f]"
                : "text-white/84 hover:bg-white/[0.045] hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="min-w-0 flex-1 truncate">{label}</span>
            <span className="rounded-full bg-[#14202a] px-2 py-0.5 text-[11px] font-bold text-[#f2b21f]">
              {count}
            </span>
          </button>
        ))}
      </div>

      <div className="my-4 h-px bg-white/10" />

      <p className="px-1 text-sm font-semibold text-white">Quick Filters</p>
      <div className="mt-2 grid gap-2">
        {quickFilters.map((filter, index) => (
          <button
            key={filter.label}
            type="button"
            className={`flex h-9 items-center justify-between rounded-md border px-3 text-sm transition ${
              index === 0
                ? "border-[#f2b21f] text-[#f2b21f]"
                : "border-white/10 text-white/80 hover:border-white/20 hover:text-white"
            }`}
          >
            {filter.label}
            {filter.count ? (
              <span className="rounded-full bg-[#19222a] px-2 py-0.5 text-[11px] font-bold text-[#f2b21f]">
                {filter.count}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border border-white/10 bg-[#0c1724]">
        <div className="relative min-h-[188px] p-4">
          <img
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=720&q=88"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-42"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#102034]/20 via-[#071018]/54 to-[#04080b]" />
          <div className="relative flex min-h-[156px] flex-col justify-end">
            <h2 className="text-base font-semibold text-white">Never miss an update</h2>
            <p className="mt-2 text-xs leading-5 text-white/76">
              Enable push notifications to get real-time travel updates.
            </p>
            <button
              type="button"
              className="mt-4 inline-flex h-10 w-fit items-center gap-2 rounded-md bg-[#f2b21f] px-4 text-xs font-bold text-black transition hover:bg-[#ffd05c]"
            >
              <Bell className="h-4 w-4" />
              Enable Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedPanel() {
  return (
    <div className="rounded-lg border border-white/10 bg-[#071018]/72 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_24px_80px_rgba(0,0,0,.34)] backdrop-blur-2xl sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold leading-tight text-white">Activity Feed</h1>
          <p className="mt-1 text-sm text-white/72">
            Live updates from your travels, bookings and favorite places.
          </p>
        </div>
        <div className="sticky top-16 z-20 -mx-4 flex gap-2 border-y border-white/10 bg-[#071018]/92 px-4 py-3 backdrop-blur-2xl sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0">
          <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-md border border-white/12 bg-[#050b10]/78 px-3 text-sm text-white/60 lg:w-64 lg:flex-none">
            <span className="sr-only">Search activity</span>
            <input
              type="search"
              placeholder="Search activity..."
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/45"
            />
            <Search className="h-4 w-4 shrink-0" />
          </label>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-md border border-white/12 bg-[#050b10]/78 px-4 text-sm font-medium text-white/86 transition hover:border-[#f2b21f]/50 hover:text-[#f2b21f]"
          >
            <Filter className="h-4 w-4" />
            Filter
            <ChevronDown className="hidden h-4 w-4 sm:block" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 xl:hidden">
        {quickFilters.map((filter, index) => (
          <button
            key={filter.label}
            type="button"
            className={`h-9 shrink-0 rounded-full border px-4 text-sm font-medium ${
              index === 0
                ? "border-[#f2b21f] bg-[#f2b21f]/16 text-[#f2b21f]"
                : "border-white/12 bg-white/[0.035] text-white/78"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {(["Today", "Yesterday"] as const).map((section) => (
          <TimelineSection
            key={section}
            label={section}
            activities={groupedActivities[section]}
          />
        ))}
      </div>

      <div className="mt-3 flex justify-center">
        <button
          type="button"
          className="inline-flex h-9 min-w-44 items-center justify-center gap-2 rounded-md border border-white/12 bg-[#061018] px-5 text-sm font-medium text-white transition hover:border-[#f2b21f]/55 hover:text-[#f2b21f]"
        >
          Load More
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function TimelineSection({
  label,
  activities: sectionActivities,
}: {
  label: ActivityItem["section"];
  activities: ActivityItem[];
}) {
  return (
    <section className="relative">
      <div className="ml-1 py-2 pl-0 text-sm font-medium text-white/70 sm:ml-10 sm:pl-8">
        {label}
      </div>
      <div className="relative space-y-3 sm:pl-[78px]">
        <span className="absolute bottom-0 left-[25px] top-0 hidden w-px bg-white/12 sm:block" />
        {sectionActivities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </section>
  );
}

function ActivityCard({ activity }: { activity: ActivityItem }) {
  const tone = toneClasses[activity.tone];
  const Icon = activity.icon;

  return (
    <article className="group relative rounded-lg border border-white/10 bg-[#09141c]/78 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,.04)] transition hover:border-white/20">
      <div className="absolute -left-[72px] top-3 hidden sm:block">
        <div className={`grid h-12 w-12 place-items-center rounded-full ${tone.icon}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {activity.unread ? (
        <span
          className={`absolute -left-[8px] top-6 hidden h-3 w-3 rounded-full ring-4 ring-[#071018] ${tone.dot} sm:block`}
        />
      ) : null}
      <div className="grid gap-3 sm:grid-cols-[168px_minmax(0,1fr)_140px_24px] sm:items-center">
        <div className="relative overflow-hidden rounded-md border border-white/10 bg-white/[0.04]">
          <img
            src={activity.image}
            alt=""
            className="h-28 w-full object-cover sm:h-[76px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/34 to-transparent" />
          <div className={`absolute left-2 top-2 grid h-8 w-8 place-items-center rounded-full sm:hidden ${tone.icon}`}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className={`truncate text-base font-semibold ${tone.title}`}>{activity.title}</h2>
            {activity.unread ? <span className={`h-2 w-2 rounded-full ${tone.dot}`} /> : null}
          </div>
          <p className="mt-1 text-sm leading-5 text-white/86">{activity.description}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/55">
            <MapPin className="h-3.5 w-3.5 text-white/42" />
            {activity.metadata.map((item, index) => (
              <span key={item} className="inline-flex items-center gap-2">
                {item}
                {index < activity.metadata.length - 1 ? (
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                ) : null}
              </span>
            ))}
          </div>
        </div>
        <time className="text-left text-sm text-white/58 sm:text-right">{activity.timestamp}</time>
        <button
          type="button"
          aria-label={`Open ${activity.title}`}
          className="hidden h-8 w-8 place-items-center rounded-md text-white/64 transition group-hover:bg-white/[0.05] group-hover:text-white sm:grid"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

function RightSidebar() {
  return (
    <>
      <section className="rounded-lg border border-white/10 bg-[#071018]/78 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_24px_80px_rgba(0,0,0,.3)] backdrop-blur-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white">Activity Summary</h2>
            <p className="text-xs text-white/52">Last 7 days</p>
          </div>
          <button type="button" className="text-xs font-semibold text-[#f2b21f]">
            View all
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-1.5 sm:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
          {summaryStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-md border border-white/10 bg-[#071119]/74 px-3 py-4 text-center"
            >
              <p className={`text-2xl font-bold leading-none ${stat.tone}`}>{stat.value}</p>
              <p className="mt-2 text-xs text-white/72">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-[#071018]/78 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_24px_80px_rgba(0,0,0,.3)] backdrop-blur-2xl">
        <h2 className="text-lg font-semibold text-white">Upcoming Reminders</h2>
        <div className="mt-4 space-y-2">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="grid grid-cols-[58px_minmax(0,1fr)_28px] items-center gap-3 rounded-md border border-white/10 bg-[#071119]/74 p-2.5"
            >
              <div className="rounded-md border border-white/10 bg-[#0a1720] py-2 text-center">
                <p className="text-[10px] text-white/46">{reminder.date.split(" ")[0]}</p>
                <p className="text-xl leading-none text-white">{reminder.date.split(" ")[1]}</p>
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-white">{reminder.title}</h3>
                <p className="text-xs text-white/68">{reminder.time}</p>
                <p
                  className={`text-xs ${
                    reminder.status.startsWith("Departs") ? "text-[#7ef17b]" : "text-white/58"
                  }`}
                >
                  {reminder.status}
                </p>
              </div>
              <Bell className="h-4 w-4 text-white/70" />
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-3 w-full rounded-md py-2 text-sm font-semibold text-[#f2b21f] transition hover:bg-[#f2b21f]/10"
        >
          View all reminders
        </button>
      </section>

      <section className="rounded-lg border border-white/10 bg-[#071018]/78 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_24px_80px_rgba(0,0,0,.3)] backdrop-blur-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Following</h2>
          <button type="button" className="text-xs font-semibold text-[#f2b21f]">
            Manage
          </button>
        </div>
        <div className="mt-5 flex items-center justify-center -space-x-2">
          {friendAvatars.map((avatar, index) => (
            <img
              key={avatar}
              src={avatar}
              alt={`Friend ${index + 1}`}
              className="h-11 w-11 rounded-full border-2 border-[#071018] object-cover"
            />
          ))}
          <div className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-[#0a141c] text-sm text-white">
            +12
          </div>
        </div>
        <p className="mx-auto mt-4 max-w-xs text-center text-sm leading-5 text-white/72">
          See what your friends are planning and experiencing.
        </p>
      </section>
    </>
  );
}
