"use client";

/* eslint-disable @next/next/no-img-element */
import {
  Bell,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  CloudSun,
  Copy,
  Edit3,
  FileText,
  Gauge,
  Globe2,
  Home,
  Hotel,
  Link2,
  Map,
  MapPin,
  MessageCircle,
  MoreVertical,
  NotebookPen,
  Plane,
  Plus,
  Send,
  Settings,
  ShieldQuestion,
  Sparkles,
  Users,
  Vote,
} from "lucide-react";
import { useMemo, useState } from "react";
import { JourneeLogoMark } from "@/components/brand/JourneeLogo";

type Role = "Owner" | "Editor" | "Viewer" | "Pending";

type SharedTrip = {
  id: string;
  name: string;
  destination: string;
  dates: string;
  members: number;
  image: string;
  active?: boolean;
};

type TripMember = {
  id: string;
  name: string;
  email?: string;
  role: Role;
  avatar: string;
  online?: boolean;
};

type ItineraryItem = {
  id: string;
  day: string;
  date: string;
  title: string;
  time: string;
  description: string;
  tag: "Stay" | "Activity" | "Transport";
  comments: number;
  memberIds: string[];
  image: string;
};

type BudgetSummary = {
  total: number;
  spent: number;
  remaining: number;
};

type ActivityEntry = {
  id: string;
  actor: string;
  action: string;
  time: string;
  avatar: string;
};

type PollOption = {
  id: string;
  label: string;
  votes: number;
};

type Comment = {
  id: string;
  author: string;
  text: string;
  time: string;
  avatar: string;
};

type CollaborationData = {
  shared_trips: SharedTrip[];
  trip_members: TripMember[];
  invitations: { id: string; email: string; role: Role; status: "pending" }[];
  itinerary_items: ItineraryItem[];
  comments: Comment[];
  polls: { id: string; question: string; options: PollOption[] };
  votes: { id: string; pollOptionId: string; memberId: string }[];
  shared_budget: BudgetSummary;
  share_links: { id: string; url: string; privacy: "private" | "public" }[];
};

const tokyoTower =
  "https://images.unsplash.com/photo-1532236204992-f5e85c024202?auto=format&fit=crop&w=720&q=80";
const sensoJi =
  "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=720&q=80";
const shibuya =
  "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=720&q=80";
const fuji =
  "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=720&q=80";
const shinjuku =
  "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=720&q=80";
const departure =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=720&q=80";
const bali =
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=720&q=80";
const europe =
  "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=720&q=80";
const thailand =
  "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=720&q=80";

export const collaborationData: CollaborationData = {
  shared_trips: [
    {
      id: "trip_tokyo_adventure",
      name: "Tokyo Adventure",
      destination: "Tokyo, Japan",
      dates: "May 20 - May 25, 2025",
      members: 4,
      image: tokyoTower,
      active: true,
    },
    {
      id: "trip_bali_getaway",
      name: "Bali Getaway",
      destination: "Bali, Indonesia",
      dates: "Jun 10 - Jun 16, 2025",
      members: 3,
      image: bali,
    },
    {
      id: "trip_europe_summer",
      name: "Europe Summer",
      destination: "Paris, Rome, Prague",
      dates: "Jul 5 - Jul 20, 2025",
      members: 5,
      image: europe,
    },
    {
      id: "trip_thailand_explorer",
      name: "Thailand Explorer",
      destination: "Bangkok, Thailand",
      dates: "Aug 12 - Aug 19, 2025",
      members: 2,
      image: thailand,
    },
  ],
  trip_members: [
    {
      id: "member_you",
      name: "You (Emma Johnson)",
      role: "Owner",
      avatar: "https://i.pravatar.cc/96?img=47",
      online: true,
    },
    {
      id: "member_michael",
      name: "Michael Chen",
      role: "Editor",
      avatar: "https://i.pravatar.cc/96?img=12",
      online: true,
    },
    {
      id: "member_sophia",
      name: "Sophia Martinez",
      role: "Viewer",
      avatar: "https://i.pravatar.cc/96?img=32",
      online: true,
    },
    {
      id: "member_daniel",
      name: "Daniel Kim",
      role: "Viewer",
      avatar: "https://i.pravatar.cc/96?img=11",
    },
    {
      id: "member_olivia",
      name: "Olivia Wilson",
      email: "olivia.wilson@email.com",
      role: "Pending",
      avatar: "https://i.pravatar.cc/96?img=5",
    },
  ],
  invitations: [
    {
      id: "invite_olivia",
      email: "olivia.wilson@email.com",
      role: "Viewer",
      status: "pending",
    },
  ],
  itinerary_items: [
    {
      id: "item_arrive",
      day: "Day 1",
      date: "May 20",
      title: "Arrive in Tokyo",
      time: "3:00 PM",
      description: "Check-in at Park Hyatt Tokyo and relax.",
      tag: "Stay",
      comments: 2,
      memberIds: ["member_you", "member_michael"],
      image: tokyoTower,
    },
    {
      id: "item_asakusa",
      day: "Day 2",
      date: "May 21",
      title: "Asakusa & Senso-ji Temple",
      time: "9:00 AM",
      description: "Explore Asakusa, visit Senso-ji Temple and Nakamise Street.",
      tag: "Activity",
      comments: 5,
      memberIds: ["member_you", "member_michael", "member_sophia", "member_daniel"],
      image: sensoJi,
    },
    {
      id: "item_shibuya",
      day: "Day 3",
      date: "May 22",
      title: "Shibuya & Harajuku",
      time: "10:00 AM",
      description: "Visit Shibuya Crossing, Takeshita Street and Meiji Shrine.",
      tag: "Activity",
      comments: 3,
      memberIds: ["member_you", "member_michael", "member_sophia"],
      image: shibuya,
    },
    {
      id: "item_fuji",
      day: "Day 3",
      date: "May 22",
      title: "Mount Fuji Day Trip",
      time: "8:00 AM",
      description: "Full-day tour to Mount Fuji and Lake Kawaguchi.",
      tag: "Activity",
      comments: 4,
      memberIds: ["member_you", "member_michael", "member_sophia"],
      image: fuji,
    },
    {
      id: "item_shinjuku",
      day: "Day 5",
      date: "May 24",
      title: "Shinjuku Night Experience",
      time: "6:00 PM",
      description: "Explore Shinjuku, Omoide Yokocho and local cuisine.",
      tag: "Activity",
      comments: 2,
      memberIds: ["member_you", "member_michael", "member_sophia"],
      image: shinjuku,
    },
    {
      id: "item_departure",
      day: "Day 6",
      date: "May 25",
      title: "Departure",
      time: "11:00 AM",
      description: "Check-out and transfer to the airport.",
      tag: "Transport",
      comments: 1,
      memberIds: ["member_you", "member_michael", "member_sophia"],
      image: departure,
    },
  ],
  comments: [
    {
      id: "comment_michael",
      author: "Michael Chen",
      text: "This itinerary looks amazing! Can't wait for Mount Fuji.",
      time: "1h ago",
      avatar: "https://i.pravatar.cc/96?img=12",
    },
    {
      id: "comment_sophia",
      author: "Sophia Martinez",
      text: "Should we add a food tour on Day 2 night?",
      time: "3h ago",
      avatar: "https://i.pravatar.cc/96?img=32",
    },
  ],
  polls: {
    id: "poll_next_activity",
    question: "Where should we go next?",
    options: [
      { id: "option_teamlab", label: "teamLab Planets", votes: 3 },
      { id: "option_skytree", label: "Tokyo Skytree", votes: 2 },
      { id: "option_disneysea", label: "DisneySea", votes: 1 },
    ],
  },
  votes: [
    { id: "vote_1", pollOptionId: "option_teamlab", memberId: "member_you" },
    { id: "vote_2", pollOptionId: "option_teamlab", memberId: "member_michael" },
    { id: "vote_3", pollOptionId: "option_teamlab", memberId: "member_sophia" },
    { id: "vote_4", pollOptionId: "option_skytree", memberId: "member_daniel" },
    { id: "vote_5", pollOptionId: "option_skytree", memberId: "member_olivia" },
    { id: "vote_6", pollOptionId: "option_disneysea", memberId: "member_you" },
  ],
  shared_budget: {
    total: 3200,
    spent: 1450,
    remaining: 1750,
  },
  share_links: [
    {
      id: "share_private_tokyo",
      url: "https://journee.com/trip/JRNE-8X7Q",
      privacy: "private",
    },
  ],
};

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Explore", href: "/discover", icon: Sparkles },
  { label: "Map", href: "/atlas", icon: Map },
  { label: "Trips", href: "/trips", icon: CalendarDays },
  { label: "Guides", href: "/guides", icon: NotebookPen },
  { label: "Journal", href: "/journal", icon: FileText },
  { label: "Stays", href: "/stays", icon: Hotel },
  { label: "Flights", href: "/flights", icon: Plane },
  { label: "Visa", href: "/visa", icon: Globe2 },
  { label: "Budget", href: "/budget", icon: CircleDollarSign },
  { label: "Weather", href: "/weather", icon: CloudSun },
  { label: "Currency", href: "/currency", icon: Gauge },
  { label: "Support", href: "/support", icon: ShieldQuestion },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);

const glassPanel =
  "rounded-lg border border-white/10 bg-[#07141d]/82 shadow-[0_22px_80px_rgba(0,0,0,.28)] backdrop-blur-xl";
const goldText = "text-[#ffb400]";

function Avatar({
  src,
  alt,
  size = "h-8 w-8",
  online,
}: {
  src: string;
  alt: string;
  size?: string;
  online?: boolean;
}) {
  return (
    <span className={`relative inline-flex ${size} shrink-0 overflow-visible rounded-full`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full rounded-full border border-[#d9aa37]/45 object-cover"
      />
      {online ? (
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border border-[#07141d] bg-[#35d85b]" />
      ) : null}
    </span>
  );
}

function MemberStack({ ids }: { ids: string[] }) {
  const members = collaborationData.trip_members.filter((member) => ids.includes(member.id));
  const visible = members.slice(0, 3);
  const extra = Math.max(0, members.length - visible.length);

  return (
    <div className="flex items-center justify-end -space-x-2">
      {visible.map((member) => (
        <Avatar key={member.id} src={member.avatar} alt={member.name} size="h-7 w-7" />
      ))}
      {extra ? (
        <span className="grid h-7 w-7 place-items-center rounded-full border border-white/20 bg-white/12 text-[0.65rem] font-semibold text-white">
          +{extra}
        </span>
      ) : null}
    </div>
  );
}

function SectionTitle({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className={`text-[0.82rem] font-bold uppercase ${goldText}`}>{children}</h2>
      {action}
    </div>
  );
}

function ActionButton({
  children,
  variant = "outline",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "gold" | "outline" | "ghost";
  className?: string;
}) {
  const styles = {
    gold:
      "border-[#e2a300] bg-gradient-to-b from-[#ffc63b] to-[#d99000] text-black shadow-[0_0_22px_rgba(255,180,0,.24)]",
    outline: "border-[#d99a00]/75 bg-[#d99a00]/8 text-[#ffb400] hover:bg-[#d99a00]/16",
    ghost: "border-white/10 bg-white/[.04] text-white/78 hover:text-white",
  };

  return (
    <button
      type="button"
      className={`inline-flex h-9 items-center justify-center gap-2 rounded border px-4 text-[0.78rem] font-semibold transition ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

function TopNavigation() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#02090f]/94 backdrop-blur-xl">
      <div className="flex min-h-[68px] items-center gap-4 px-4 lg:px-6">
        <a href="/" className="flex shrink-0 items-center gap-3 text-white">
          <span className="grid h-10 w-10 place-items-center text-[#ffb400]">
            <JourneeLogoMark className="h-9 w-9" />
          </span>
          <span className="text-2xl font-semibold uppercase text-white">JOURNEE</span>
        </a>
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 2xl:flex">
          {navItems.map((item) => (
            <a
              href={item.href}
              key={item.label}
              className="rounded px-3 py-2 text-[0.82rem] font-semibold text-white/88 transition hover:bg-white/8 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden items-center gap-2 text-[0.82rem] font-semibold text-[#ffb400] md:flex">
            <Users className="h-4 w-4" />
            <span>Trip Collaboration</span>
          </div>
          <button
            type="button"
            aria-label="Notifications"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[.04] text-white"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-[#ffb400] text-[0.68rem] font-bold text-black">
              3
            </span>
          </button>
          <button type="button" className="flex items-center gap-2">
            <Avatar src="https://i.pravatar.cc/96?img=47" alt="Profile avatar" size="h-10 w-10" />
            <ChevronDown className="hidden h-4 w-4 text-white/70 sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
}

function LeftSidebar() {
  const budget = collaborationData.shared_budget;

  return (
    <aside className="space-y-3">
      <section className={`${glassPanel} p-5`}>
        <SectionTitle>Shared Trips</SectionTitle>
        <ActionButton className="mb-5 w-full" variant="ghost">
          <Plus className="h-4 w-4 text-[#ffb400]" />
          New Trip
        </ActionButton>
        <div className="space-y-2">
          {collaborationData.shared_trips.map((trip) => (
            <button
              type="button"
              key={trip.id}
              className={`relative flex w-full items-center gap-3 rounded-md p-3 text-left transition ${
                trip.active
                  ? "bg-[#2b2a16]/86 text-white shadow-[inset_-5px_0_0_#ffb400]"
                  : "text-white/84 hover:bg-white/[.05]"
              }`}
            >
              <img src={trip.image} alt="" className="h-14 w-14 rounded object-cover" />
              <span className="min-w-0">
                <span className="block truncate text-[0.86rem] font-bold">{trip.name}</span>
                <span className="mt-1 block text-[0.74rem] text-white/72">{trip.dates}</span>
                <span className="block text-[0.74rem] text-white/72">{trip.members} Members</span>
              </span>
            </button>
          ))}
        </div>
        <button type="button" className="mt-4 flex w-full items-center justify-between text-[0.82rem] font-semibold text-[#ffb400]">
          View All Trips
          <span aria-hidden>→</span>
        </button>
      </section>

      <section className={`${glassPanel} p-5`}>
        <SectionTitle>Group Overview</SectionTitle>
        <dl className="space-y-3 text-[0.82rem]">
          {[
            ["Total Members", "4"],
            ["Pending Invites", "1"],
            ["Group Budget", formatCurrency(budget.total)],
            ["Spent So Far", formatCurrency(budget.spent)],
            ["Remaining", formatCurrency(budget.remaining), "text-[#38dd5d]"],
          ].map(([label, value, valueClass]) => (
            <div key={label} className="flex items-center justify-between gap-3">
              <dt className="flex items-center gap-3 text-white/78">
                <Users className="h-4 w-4 text-white/74" />
                {label}
              </dt>
              <dd className={`font-semibold text-white ${valueClass ?? ""}`}>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={`${glassPanel} p-5`}>
        <div className="flex gap-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/18 text-white">
            <ShieldQuestion className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-[0.9rem] font-bold text-white">Need Help?</h3>
            <p className="mt-2 text-[0.78rem] leading-5 text-white/74">
              Our support team is here to help your group plan the perfect trip.
            </p>
          </div>
        </div>
        <ActionButton className="mt-4 w-full">Contact Support</ActionButton>
      </section>
    </aside>
  );
}

function TripHeader() {
  return (
    <section className={`${glassPanel} p-5`}>
      <div className="grid gap-5 lg:grid-cols-[180px_1fr_auto]">
        <img
          src={tokyoTower}
          alt="Tokyo skyline with Tokyo Tower"
          className="h-36 w-full rounded-md object-cover lg:h-full"
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-[1.55rem] font-bold leading-tight text-white">Tokyo Adventure</h1>
            <button type="button" aria-label="Edit trip name" className="text-[#ffb400]">
              <Edit3 className="h-4 w-4" />
            </button>
            <span className="ml-auto rounded border border-[#22c65f]/55 bg-[#0a371c]/80 px-3 py-1 text-[0.74rem] font-semibold text-[#4cff79] lg:hidden">
              Planning
            </span>
          </div>
          <div className="mt-4 space-y-2 text-[0.86rem] text-white/86">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Tokyo, Japan
            </p>
            <p className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              May 20 - May 25, 2025 (5 nights)
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-start justify-start gap-3 lg:justify-end">
          <span className="hidden rounded border border-[#22c65f]/55 bg-[#0a371c]/80 px-3 py-1 text-[0.74rem] font-semibold text-[#4cff79] lg:inline-flex">
            Planning
          </span>
          <div className="flex w-full items-center gap-2 lg:mt-14 lg:w-auto">
            <ActionButton>
              <Users className="h-4 w-4" />
              Invite
            </ActionButton>
            <ActionButton>
              <Link2 className="h-4 w-4" />
              Share Link
            </ActionButton>
            <button
              type="button"
              aria-label="More options"
              className="grid h-9 w-9 place-items-center rounded border border-white/12 bg-white/[.04] text-white/80"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5 flex gap-2 overflow-x-auto border-t border-white/8 pt-4">
        {["Itinerary", "Members", "Budget", "Files & Links", "Activity", "Settings"].map((tab, index) => {
          const Icon = [CalendarDays, Users, ClipboardList, FileText, Globe2, Settings][index];
          return (
            <button
              type="button"
              key={tab}
              className={`inline-flex h-10 shrink-0 items-center gap-2 border-b-2 px-3 text-[0.82rem] font-medium ${
                index === 0
                  ? "border-[#ffb400] text-[#ffb400]"
                  : "border-transparent text-white/82 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function ItinerarySection() {
  const [view, setView] = useState<"day" | "list">("day");

  return (
    <section className={`${glassPanel} overflow-hidden`}>
      <div className="flex flex-col gap-4 border-b border-white/8 p-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[1.05rem] font-bold text-white">Itinerary</h2>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded border border-white/10 bg-[#050d14] p-0.5">
            {(["day", "list"] as const).map((mode) => (
              <button
                type="button"
                key={mode}
                onClick={() => setView(mode)}
                className={`h-8 rounded px-4 text-[0.78rem] font-semibold ${
                  view === mode ? "bg-[#2c2411] text-[#ffb400]" : "text-white/72"
                }`}
              >
                {mode === "day" ? "Day View" : "List View"}
              </button>
            ))}
          </div>
          <ActionButton>
            <Plus className="h-4 w-4" />
            Add Item
          </ActionButton>
        </div>
      </div>
      <div className="p-5">
        <div className="relative space-y-2 lg:pl-[105px]">
          <div className="absolute bottom-4 left-[77px] top-0 hidden w-px bg-white/12 lg:block" />
          {collaborationData.itinerary_items.map((item) => (
            <article
              key={item.id}
              className="relative grid gap-3 border-b border-white/10 py-2 last:border-b-0 sm:grid-cols-[112px_1fr_auto] lg:grid-cols-[120px_1fr_68px_110px_32px]"
            >
              <div className="flex items-center gap-4 lg:absolute lg:-left-[100px] lg:top-5 lg:w-[86px] lg:justify-between">
                <div>
                  <div className="text-[0.82rem] font-bold uppercase text-[#ffb400]">{item.day}</div>
                  <div className="text-[0.74rem] text-white/70">{item.date}</div>
                </div>
                <span className="hidden h-3 w-3 rounded-full border-2 border-[#ffb400] bg-[#07141d] shadow-[0_0_0_3px_rgba(255,180,0,.18)] lg:block" />
              </div>
              <img
                src={item.image}
                alt=""
                className="h-20 w-full rounded object-cover sm:h-[76px] sm:w-[112px]"
              />
              <div className="min-w-0">
                <h3 className="truncate text-[0.96rem] font-bold text-white">{item.title}</h3>
                <p className="text-[0.78rem] font-medium text-white/82">{item.time}</p>
                <p className="mt-1 text-[0.76rem] leading-5 text-white/66">{item.description}</p>
                <span
                  className={`mt-1 inline-flex rounded px-2 py-0.5 text-[0.68rem] font-semibold ${
                    item.tag === "Stay"
                      ? "bg-[#6a3a9a]/50 text-[#d5a6ff]"
                      : item.tag === "Transport"
                        ? "bg-[#205e21]/55 text-[#61e66d]"
                        : "bg-[#0f4573]/60 text-[#74caff]"
                  }`}
                >
                  {item.tag}
                </span>
              </div>
              <div className="flex items-center gap-1 self-center text-[0.76rem] text-white/78">
                <span>{item.comments}</span>
                <MessageCircle className="h-4 w-4" />
              </div>
              <MemberStack ids={item.memberIds} />
              <button
                type="button"
                aria-label={`More options for ${item.title}`}
                className="grid h-8 w-8 place-items-center self-center justify-self-end rounded text-white/72 hover:bg-white/8"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>
        <ActionButton className="mt-4 h-11 w-full border-dashed">
          <Plus className="h-4 w-4" />
          Add Day or Activity
        </ActionButton>
      </div>
    </section>
  );
}

function InviteMembers() {
  return (
    <section className={`${glassPanel} p-5`}>
      <SectionTitle
        action={
          <button type="button" className="text-[0.78rem] font-semibold text-[#49b8ff]">
            View All
          </button>
        }
      >
        Invite & Members
      </SectionTitle>
      <div className="grid grid-cols-[1fr_92px_auto] gap-2">
        <input
          aria-label="Invite email"
          placeholder="Enter email to invite"
          className="h-10 min-w-0 rounded border border-white/10 bg-[#06101a] px-3 text-[0.78rem] text-white outline-none placeholder:text-white/48 focus:border-[#ffb400]"
        />
        <select
          aria-label="Invite role"
          className="h-10 rounded border border-white/10 bg-[#06101a] px-3 text-[0.78rem] text-white outline-none"
          defaultValue="Editor"
        >
          <option>Editor</option>
          <option>Viewer</option>
        </select>
        <ActionButton variant="gold">Invite</ActionButton>
      </div>
      <div className="mt-5 space-y-3">
        {collaborationData.trip_members.map((member) => (
          <div key={member.id} className="grid grid-cols-[36px_1fr_auto] items-center gap-3">
            <Avatar src={member.avatar} alt={member.name} online={member.online} />
            <div className="min-w-0">
              <div className="truncate text-[0.86rem] font-medium text-white">{member.name}</div>
              {member.email ? (
                <div className="truncate text-[0.72rem] text-white/54">{member.email}</div>
              ) : null}
            </div>
            {member.role === "Owner" || member.role === "Pending" ? (
              <span className="rounded border border-[#ffb400]/18 bg-[#ffb400]/12 px-3 py-1.5 text-[0.72rem] font-semibold text-[#ffb400]">
                {member.role}
              </span>
            ) : (
              <select
                aria-label={`${member.name} role`}
                className="h-9 w-[104px] rounded border border-white/12 bg-[#06101a] px-3 text-[0.78rem] text-white outline-none"
                defaultValue={member.role}
              >
                <option>Editor</option>
                <option>Viewer</option>
              </select>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function BudgetCard() {
  const budget = collaborationData.shared_budget;
  const progress = Math.round((budget.spent / budget.total) * 100);

  return (
    <section className={`${glassPanel} p-5`}>
      <SectionTitle
        action={<button className="text-[0.78rem] font-semibold text-[#49b8ff]">Manage</button>}
      >
        Group Budget
      </SectionTitle>
      <dl className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <dt className="text-[0.86rem] font-medium text-white/88">Total Budget</dt>
          <dd className="text-[1.35rem] font-semibold text-white">{formatCurrency(budget.total)}</dd>
        </div>
        <div>
          <div className="h-2 rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#72d940] to-[#35b845]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-1 text-right text-[0.72rem] font-semibold text-[#46df5f]">{progress}%</div>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-[0.86rem] text-white/78">Spent So Far</dt>
          <dd className="font-bold text-[#ff634f]">{formatCurrency(budget.spent)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-[0.86rem] text-white/78">Remaining</dt>
          <dd className="font-bold text-[#38dd5d]">{formatCurrency(budget.remaining)}</dd>
        </div>
      </dl>
      <button type="button" className="mt-4 flex items-center gap-2 text-[0.82rem] font-bold text-[#ffb400]">
        View Budget Breakdown
        <span aria-hidden>→</span>
      </button>
    </section>
  );
}

function ActivityFeed() {
  const activities: ActivityEntry[] = [
    {
      id: "activity_1",
      actor: "Michael",
      action: "added Asakusa & Senso-ji Temple",
      time: "2 hours ago",
      avatar: "https://i.pravatar.cc/96?img=12",
    },
    {
      id: "activity_2",
      actor: "Sophia",
      action: "commented on Mount Fuji Day Trip",
      time: "5 hours ago",
      avatar: "https://i.pravatar.cc/96?img=32",
    },
    {
      id: "activity_3",
      actor: "Daniel",
      action: "voted for Shinjuku Night Experience",
      time: "Yesterday",
      avatar: "https://i.pravatar.cc/96?img=11",
    },
    {
      id: "activity_4",
      actor: "You",
      action: "changed trip dates",
      time: "2 days ago",
      avatar: "https://i.pravatar.cc/96?img=47",
    },
  ];

  return (
    <section className={`${glassPanel} p-5`}>
      <SectionTitle
        action={<button className="text-[0.78rem] font-semibold text-[#49b8ff]">View All</button>}
      >
        Activity Feed
      </SectionTitle>
      <div className="space-y-4">
        {activities.map((item) => (
          <div key={item.id} className="flex gap-3">
            <Avatar src={item.avatar} alt={item.actor} online={item.actor !== "Daniel"} />
            <div className="min-w-0">
              <p className="text-[0.82rem] leading-5 text-white/86">
                <span className="font-bold text-white">{item.actor}</span> {item.action}
              </p>
              <p className="text-[0.72rem] text-white/52">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RightSidebar() {
  return (
    <aside className="space-y-3">
      <InviteMembers />
      <BudgetCard />
      <ActivityFeed />
    </aside>
  );
}

function QuickCollaboration() {
  const actions = [
    { label: "Comment", icon: MessageCircle },
    { label: "Vote", icon: Vote },
    { label: "Poll", icon: ClipboardList },
    { label: "Note", icon: FileText },
  ];

  return (
    <section className="border-white/10 p-5 lg:border-r">
      <SectionTitle>Quick Collaboration</SectionTitle>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
        {actions.map((action) => (
          <button
            type="button"
            key={action.label}
            className="group flex h-[86px] flex-col items-center justify-center gap-2 rounded border border-white/10 bg-white/[.035] text-white/72 transition hover:border-[#ffb400]/55 hover:text-white"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/18 text-white group-hover:text-[#ffb400]">
              <action.icon className="h-6 w-6" />
            </span>
            <span className="text-[0.78rem] font-medium">{action.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function PollCard() {
  const [selected, setSelected] = useState<string | null>(null);
  const options = useMemo(
    () =>
      collaborationData.polls.options.map((option) => ({
        ...option,
        votes: option.votes + (selected === option.id ? 1 : 0),
      })),
    [selected],
  );
  const maxVotes = Math.max(...options.map((option) => option.votes));

  return (
    <section className="border-white/10 p-5 lg:border-r">
      <SectionTitle>Vote on Next Activity</SectionTitle>
      <p className="mb-2 text-[0.78rem] text-white/84">{collaborationData.polls.question}</p>
      <div className="space-y-2">
        {options.map((option) => (
          <button
            type="button"
            key={option.id}
            onClick={() => setSelected(option.id)}
            className="grid w-full grid-cols-[120px_1fr_62px] items-center gap-3 text-left text-[0.78rem] text-white"
          >
            <span className={selected === option.id ? "font-bold text-[#ffb400]" : ""}>{option.label}</span>
            <span className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <span
                className="block h-full rounded-full bg-gradient-to-r from-[#ffc63b] to-[#e28900]"
                style={{ width: `${Math.max(18, (option.votes / maxVotes) * 100)}%` }}
              />
            </span>
            <span className="text-right text-white/78">{option.votes} votes</span>
          </button>
        ))}
      </div>
      <ActionButton className="mx-auto mt-4 flex w-fit">View All Polls</ActionButton>
    </section>
  );
}

function ShareTripCard() {
  const link = collaborationData.share_links[0];
  const [copied, setCopied] = useState(false);

  return (
    <section className="border-white/10 p-5 lg:border-r">
      <SectionTitle>Share This Trip</SectionTitle>
      <p className="text-[0.84rem] font-medium text-white">Trip is Private</p>
      <p className="text-[0.74rem] text-white/62">Only invited members can access</p>
      <div className="mt-4 grid grid-cols-[1fr_auto] overflow-hidden rounded border border-white/12 bg-[#06101a]">
        <input
          aria-label="Trip share link"
          readOnly
          value={link.url}
          className="min-w-0 bg-transparent px-3 py-2.5 text-[0.78rem] text-white/80 outline-none"
        />
        <button
          type="button"
          onClick={() => setCopied(true)}
          className="border-l border-white/12 px-4 text-[0.78rem] font-bold text-[#ffb400]"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <button type="button" className="mt-4 flex items-center gap-2 text-[0.82rem] font-semibold text-[#ffb400]">
        <Globe2 className="h-4 w-4" />
        Change to Public Link
      </button>
    </section>
  );
}

function RecentComments() {
  return (
    <section className="p-5">
      <SectionTitle
        action={<button className="text-[0.78rem] font-semibold text-[#49b8ff]">View All</button>}
      >
        Recent Comments
      </SectionTitle>
      <div className="space-y-3">
        {collaborationData.comments.map((comment) => (
          <div key={comment.id} className="grid grid-cols-[32px_1fr_auto] gap-3">
            <Avatar src={comment.avatar} alt={comment.author} size="h-8 w-8" online />
            <div className="min-w-0">
              <p className="text-[0.78rem] font-bold leading-4 text-white">{comment.author}</p>
              <p className="text-[0.76rem] leading-5 text-white/78">{comment.text}</p>
            </div>
            <span className="text-[0.7rem] text-white/60">{comment.time}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-[1fr_38px] gap-2">
        <input
          aria-label="Add comment"
          placeholder="Add a comment..."
          className="h-9 min-w-0 rounded border border-white/10 bg-[#06101a] px-3 text-[0.78rem] text-white outline-none placeholder:text-white/44 focus:border-[#ffb400]"
        />
        <button
          type="button"
          aria-label="Send comment"
          className="grid h-9 w-9 place-items-center rounded border border-white/10 bg-[#06101a] text-[#ffb400]"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

function BottomCollaborationStrip() {
  return (
    <section className={`${glassPanel} grid overflow-hidden lg:grid-cols-[1fr_1fr_1fr_1.12fr]`}>
      <QuickCollaboration />
      <PollCard />
      <ShareTripCard />
      <RecentComments />
    </section>
  );
}

export function TripCollaborationPage() {
  return (
    <main className="min-h-screen bg-[#02080e] font-sans text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_22%_0%,rgba(30,116,158,.22),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(255,180,0,.09),transparent_30%),linear-gradient(135deg,#02070c_0%,#06131d_48%,#031018_100%)]" />
      <TopNavigation />
      <div className="mx-auto max-w-[1840px] space-y-3 px-4 py-4 lg:px-6">
        <div className="grid gap-5 2xl:grid-cols-[320px_minmax(0,1fr)_480px]">
          <div className="space-y-3 2xl:col-start-2 2xl:row-start-1">
            <TripHeader />
            <ItinerarySection />
          </div>
          <div className="2xl:col-start-1 2xl:row-start-1">
            <LeftSidebar />
          </div>
          <div className="2xl:col-start-3 2xl:row-start-1">
            <RightSidebar />
          </div>
        </div>
        <BottomCollaborationStrip />
      </div>
      <div className="sticky bottom-0 z-30 border-t border-white/10 bg-[#02090f]/94 px-4 py-3 backdrop-blur-xl md:hidden">
        <div className="grid grid-cols-4 gap-2">
          {[
            ["Comment", MessageCircle],
            ["Vote", Vote],
            ["Invite", Users],
            ["Share", Copy],
          ].map(([label, Icon]) => (
            <button
              type="button"
              key={label as string}
              className="flex flex-col items-center gap-1 rounded border border-white/10 bg-white/[.04] py-2 text-[0.68rem] font-semibold text-white/82"
            >
              <Icon className="h-4 w-4 text-[#ffb400]" />
              {label as string}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
