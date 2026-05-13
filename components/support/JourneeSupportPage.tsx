/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  CalendarCheck,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  CloudSun,
  Headphones,
  HelpCircle,
  LifeBuoy,
  Mail,
  Menu,
  MessageCircle,
  Plane,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Star,
  TicketCheck,
  UserRound,
  WalletCards,
} from "lucide-react";
import { JourneeLogoMark } from "@/components/brand/JourneeLogo";

const avatar =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80";

type NavItem = {
  label: string;
  href: string;
};

type SupportMenuItem = {
  title: string;
  detail: string;
  icon: typeof HelpCircle;
  active?: boolean;
};

type HelpTopic = {
  title: string;
  detail: string;
  icon: typeof BriefcaseBusiness;
};

type TicketStatus = "In Progress" | "Resolved" | "Closed" | "Open";

type SupportTicket = {
  title: string;
  id: string;
  date: string;
  status: TicketStatus;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/discover" },
  { label: "Map", href: "/atlas" },
  { label: "Trips", href: "/trips" },
  { label: "Guides", href: "/guides" },
  { label: "Journal", href: "/journal" },
  { label: "Profile", href: "/profile" },
  { label: "Stays", href: "/stays" },
  { label: "Flights", href: "/flights" },
  { label: "Visa", href: "/visa" },
  { label: "Budget", href: "/budget" },
  { label: "Weather", href: "/weather" },
  { label: "Currency", href: "/currency" },
  { label: "Settings", href: "/settings" },
  { label: "Support", href: "/support" },
];

const supportMenu: SupportMenuItem[] = [
  { title: "Help Center", detail: "Articles, guides and FAQs", icon: Settings, active: true },
  { title: "Contact Support", detail: "Get help from our team", icon: MessageCircle },
  { title: "Trip Support", detail: "Support for your trip", icon: BriefcaseBusiness },
  { title: "Safety Support", detail: "Safety and emergency help", icon: ShieldCheck },
  { title: "Bookings & Stays", detail: "Hotels, stays and bookings", icon: CalendarCheck },
  { title: "Flights Support", detail: "Flights and airline help", icon: Plane },
  { title: "Visa Support", detail: "Visa and entry requirements", icon: TicketCheck },
  { title: "Weather Support", detail: "Weather and travel alerts", icon: CloudSun },
  { title: "Currency Support", detail: "Exchange rates and payments", icon: CircleDollarSign },
  { title: "My Tickets", detail: "View your support tickets", icon: BriefcaseBusiness },
];

const popularSearches = [
  "Booking change",
  "Refund status",
  "Visa requirements",
  "Trip cancellation",
  "Travel insurance",
];

const helpTopics: HelpTopic[] = [
  {
    title: "Trips & Itinerary",
    detail: "Itinerary planning, changes and trip management",
    icon: BriefcaseBusiness,
  },
  {
    title: "Bookings & Stays",
    detail: "Hotels, reservations and property support",
    icon: CalendarCheck,
  },
  {
    title: "Flights",
    detail: "Flight bookings, changes, delays and refunds",
    icon: Plane,
  },
  {
    title: "Payments & Refunds",
    detail: "Payments, refunds, billing and transactions",
    icon: WalletCards,
  },
  {
    title: "Visa & Entry",
    detail: "Visa requirements, documents and immigration",
    icon: TicketCheck,
  },
  {
    title: "Weather & Alerts",
    detail: "Weather updates, alerts and travel advisories",
    icon: CloudSun,
  },
  {
    title: "Currency & Payments",
    detail: "Exchange rates, cards, ATMs and fees",
    icon: CircleDollarSign,
  },
  {
    title: "Account & Settings",
    detail: "Account, preferences and subscription help",
    icon: Settings,
  },
];

const faqs = [
  "How do I change or cancel my trip?",
  "How do I get a refund?",
  "What documents do I need for international travel?",
  "How can I contact support for an ongoing trip?",
  "How do I update my payment method?",
];

const supportTickets: SupportTicket[] = [
  {
    title: "Refund request for Tokyo trip",
    id: "#JT-7821",
    date: "May 3, 2025",
    status: "In Progress",
  },
  {
    title: "Hotel booking change",
    id: "#JT-7712",
    date: "Apr 28, 2025",
    status: "Resolved",
  },
  {
    title: "Visa document question",
    id: "#JT-7590",
    date: "Apr 20, 2025",
    status: "Closed",
  },
  {
    title: "Flight reschedule support",
    id: "#JT-7541",
    date: "Apr 18, 2025",
    status: "Resolved",
  },
  {
    title: "Payment not going through",
    id: "#JT-7489",
    date: "Apr 15, 2025",
    status: "Open",
  },
];

const safetyLinks = [
  {
    title: "Travel Safety Tips",
    detail: "Stay safe while exploring",
    icon: ShieldCheck,
  },
  {
    title: "Emergency Contacts",
    detail: "Important numbers worldwide",
    icon: Headphones,
  },
  {
    title: "Safety Alerts",
    detail: "Current travel advisories",
    icon: Bell,
  },
];

const supportHours = [
  ["Live Chat", "24/7"],
  ["Email Support", "24/7"],
  ["Phone Support", "24/7"],
  ["Emergency Support", "24/7"],
];

const trustItems = [
  {
    title: "Trusted & Secure",
    detail: "Your data and privacy are always protected.",
    icon: ShieldCheck,
  },
  {
    title: "24/7 Support",
    detail: "We're here whenever you need us.",
    icon: Star,
  },
  {
    title: "Human Support",
    detail: "Real people, real support.",
    icon: UserRound,
  },
];

export function JourneeSupportPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#030708] text-white">
      <TopNavigation />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(222,163,52,.14),transparent_31%),radial-gradient(circle_at_82%_8%,rgba(54,113,128,.16),transparent_30%),linear-gradient(180deg,#030708_0%,#071111_48%,#030708_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto grid w-full max-w-[1920px] gap-5 px-4 pb-8 pt-20 sm:px-5 lg:px-6 2xl:grid-cols-[330px_minmax(0,1fr)_390px]">
        <aside className="hidden min-w-0 space-y-5 2xl:block">
          <SupportSidebar />
        </aside>

        <section className="min-w-0 space-y-5">
          <MobileSupportMenu />
          <HeroHelpCenter />
          <BrowseTopics />
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_410px]">
            <FaqPanel />
            <MoreHelpPanel />
          </div>
        </section>

        <aside className="min-w-0 space-y-5 2xl:sticky 2xl:top-24 2xl:self-start">
          <RightSidebar />
        </aside>

        <div className="2xl:col-span-3">
          <TrustStrip />
        </div>
      </div>
    </main>
  );
}

function TopNavigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/[0.08] bg-[#020506]/88 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-[1920px] items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <JourneeLogoMark className="h-9 w-9 text-[#eda722]" />
          <span className="text-2xl font-semibold uppercase tracking-[0.14em] text-white">
            JOURNEE
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 overflow-visible 2xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={item.label === "Support" ? "page" : undefined}
              className={`relative inline-flex min-w-max items-center whitespace-nowrap px-1 py-3 text-sm font-semibold transition ${
                item.label === "Support" ? "text-[#f3b544]" : "text-white/88 hover:text-white"
              }`}
            >
              {item.label}
              {item.label === "Support" ? (
                <span className="absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[#f3b544]" />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden min-w-[240px] max-w-[360px] flex-1 items-center rounded-full border border-white/12 bg-white/[0.045] px-4 py-2.5 text-white/64 shadow-[inset_0_1px_0_rgba(255,255,255,.08)] lg:flex">
          <span className="min-w-0 flex-1 truncate text-xs">Search for help articles...</span>
          <Search className="ml-3 h-4 w-4 shrink-0 text-white/72" />
        </div>

        <button
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/88 transition hover:bg-white/[0.07]"
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

function SupportSidebar() {
  return (
    <>
      <Panel className="sticky top-24 p-5">
        <Kicker>Help & Support</Kicker>
        <div className="mt-5 space-y-2">
          {supportMenu.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.title}
                type="button"
                className={`flex w-full items-center gap-4 rounded-[8px] px-3 py-3 text-left transition ${
                  item.active
                    ? "bg-[linear-gradient(135deg,rgba(218,157,54,.72),rgba(142,98,31,.72))] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.18)]"
                    : "text-white/88 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0 text-current" strokeWidth={1.7} />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{item.title}</span>
                  <span className="mt-0.5 block text-xs leading-5 text-white/64">{item.detail}</span>
                </span>
              </button>
            );
          })}
        </div>
      </Panel>

      <Panel className="p-5">
        <div className="flex items-start gap-4">
          <Headphones className="mt-1 h-8 w-8 shrink-0 text-[#f3b544]" />
          <div>
            <h2 className="text-lg font-semibold text-white">Need urgent help?</h2>
            <p className="mt-1 text-sm leading-6 text-white/70">
              Our travel experts are available 24/7 for urgent issues.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="mt-5 h-11 w-full rounded-[6px] border border-[#dca33c]/80 bg-transparent text-sm font-bold text-[#f3b544] transition hover:bg-[#dca33c] hover:text-[#130d04]"
        >
          Start Live Chat
        </button>
        <p className="mt-4 text-center text-xs text-white/60">Average response: 2 min</p>
      </Panel>
    </>
  );
}

function MobileSupportMenu() {
  return (
    <Panel className="p-4 2xl:hidden">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Kicker>Help & Support</Kicker>
          <p className="mt-1 text-sm text-white/66">Help Center active</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-[#dca33c]/50 px-4 py-2 text-sm font-semibold text-[#f3b544]"
        >
          Sections <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {supportMenu.map((item) => (
          <button
            key={item.title}
            type="button"
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${
              item.active
                ? "border-[#e2aa42] bg-[#e2aa42]/18 text-[#f3b544]"
                : "border-white/10 bg-white/[0.04] text-white/70"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
    </Panel>
  );
}

function HeroHelpCenter() {
  return (
    <section className="relative overflow-hidden rounded-[8px] border border-white/12 bg-[#071011] p-5 shadow-[0_22px_70px_rgba(0,0,0,.38),inset_0_1px_0_rgba(255,255,255,.08)] sm:p-8">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,9,11,.96)_0%,rgba(4,9,11,.82)_42%,rgba(4,9,11,.45)_100%),url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1800&q=84')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_14%,rgba(237,151,49,.28),transparent_28%)]" />
      <div className="relative max-w-3xl">
        <Kicker>Help Center</Kicker>
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl">
          How can we help you today?
        </h1>
        <p className="mt-3 text-base font-medium text-white/88">
          Find answers, contact support, or get help with your trip.
        </p>

        <label className="mt-6 flex min-h-[58px] max-w-2xl items-center rounded-full border border-white/24 bg-[#071011]/78 px-5 shadow-[inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-xl">
          <span className="sr-only">Search help articles</span>
          <input
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/66"
            placeholder="Search help articles, topics or questions..."
          />
          <Search className="ml-4 h-5 w-5 shrink-0 text-white/88" strokeWidth={1.7} />
        </label>

        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <span className="mr-1 text-xs font-medium text-white/70">Popular searches:</span>
          {popularSearches.map((search) => (
            <button
              key={search}
              type="button"
              className="rounded-full border border-white/12 bg-white/[0.055] px-4 py-2 text-xs font-medium text-white/78 transition hover:border-[#e2aa42]/60 hover:text-white"
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrowseTopics() {
  return (
    <Panel className="p-5">
      <Kicker>Browse Help Topics</Kicker>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {helpTopics.map((topic) => {
          const Icon = topic.icon;
          return (
            <button
              key={topic.title}
              type="button"
              className="group flex min-h-[136px] items-center gap-4 rounded-[8px] border border-white/10 bg-white/[0.035] p-4 text-left transition hover:border-[#dca33c]/50 hover:bg-[#dca33c]/10"
            >
              <Icon className="h-8 w-8 shrink-0 text-[#f2a91f]" strokeWidth={1.7} />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-white">{topic.title}</span>
                <span className="mt-3 block text-xs leading-5 text-white/64">{topic.detail}</span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-white/74 transition group-hover:translate-x-0.5 group-hover:text-[#f3b544]" />
            </button>
          );
        })}
      </div>
    </Panel>
  );
}

function FaqPanel() {
  return (
    <Panel className="p-5">
      <Kicker>Frequently Asked Questions</Kicker>
      <div className="mt-4 divide-y divide-white/[0.08]">
        {faqs.map((faq) => (
          <details key={faq} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-medium text-white/88 marker:hidden">
              {faq}
              <ChevronDown className="h-4 w-4 shrink-0 text-white/70 transition group-open:rotate-180" />
            </summary>
            <p className="pb-4 pr-8 text-sm leading-6 text-white/64">
              Our support team can help you review available options, timing, fees, and next steps
              based on your booking and destination.
            </p>
          </details>
        ))}
      </div>
    </Panel>
  );
}

function MoreHelpPanel() {
  const contactCards = [
    {
      title: "Live Chat",
      detail: "Chat with our team 24/7",
      meta: "Online now",
      icon: MessageCircle,
      online: true,
    },
    {
      title: "Email Us",
      detail: "We typically reply in 2-4 hours",
      meta: "support@journee.com",
      icon: Mail,
    },
    {
      title: "Request a Call",
      detail: "We'll call you back",
      meta: "Schedule a call",
      icon: Headphones,
    },
  ];

  return (
    <Panel className="p-5">
      <Kicker>Need More Help?</Kicker>
      <p className="mt-2 text-sm text-white/68">Our support team is here for you.</p>
      <div className="mt-5 space-y-2">
        {contactCards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.title}
              type="button"
              className="flex w-full items-center gap-4 rounded-[8px] border border-white/10 bg-white/[0.035] p-4 text-left transition hover:border-[#dca33c]/50 hover:bg-white/[0.06]"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] bg-white/[0.07] text-white">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-white">{card.title}</span>
                <span className="block text-xs leading-5 text-white/64">{card.detail}</span>
                <span
                  className={`mt-0.5 block text-xs font-semibold ${
                    card.online ? "text-[#69d675]" : "text-[#f3b544]"
                  }`}
                >
                  {card.meta}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </Panel>
  );
}

function RightSidebar() {
  return (
    <>
      <Panel className="p-5">
        <div className="flex items-center justify-between gap-4">
          <Kicker>My Support Tickets</Kicker>
          <Link
            href="/support"
            className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#f3b544]"
          >
            View all tickets <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-4 divide-y divide-white/[0.08]">
          {supportTickets.map((ticket) => (
            <div key={ticket.id} className="flex items-center gap-3 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{ticket.title}</p>
                <p className="mt-1 text-xs text-white/55">
                  {ticket.id} <span className="px-1.5 text-white/36">•</span> {ticket.date}
                </p>
              </div>
              <StatusBadge status={ticket.status} />
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="p-5">
        <div className="flex items-start gap-4">
          <ShieldAlert className="mt-1 h-8 w-8 shrink-0 text-[#f3b544]" strokeWidth={1.7} />
          <div>
            <Kicker>Travel Safety Center</Kicker>
            <p className="mt-1 text-sm text-white/66">Your safety is our priority.</p>
          </div>
        </div>
        <div className="mt-5 space-y-4">
          {safetyLinks.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] border border-white/10 bg-white/[0.04] text-white/74">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="text-xs leading-5 text-white/58">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          className="mt-5 h-11 w-full rounded-[6px] border border-[#dca33c]/80 bg-transparent text-sm font-bold text-[#f3b544] transition hover:bg-[#dca33c] hover:text-[#130d04]"
        >
          Visit Safety Center
        </button>
      </Panel>

      <Panel className="p-5">
        <div className="flex items-start gap-4">
          <LifeBuoy className="mt-1 h-7 w-7 shrink-0 text-[#f3b544]" strokeWidth={1.7} />
          <div>
            <Kicker>Support Hours</Kicker>
            <p className="mt-1 text-sm text-white/66">We&apos;re here to help, 24/7</p>
          </div>
        </div>
        <div className="mt-5 space-y-3 border-t border-white/[0.08] pt-4">
          {supportHours.map(([label, value]) => (
            <div key={label} className="flex items-center gap-3 text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#67c66f]" />
              <span className="min-w-0 flex-1 text-white/72">{label}</span>
              <span className="font-semibold text-[#67d776]">{value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-start gap-3 border-t border-white/[0.08] pt-4 text-sm">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#67c66f]" />
          <span className="min-w-0 flex-1 text-white/72">Response Time</span>
          <span className="text-right font-semibold leading-6 text-[#67d776]">
            2 min Live Chat
            <br />
            2-4 hrs Email
          </span>
        </div>
      </Panel>
    </>
  );
}

function TrustStrip() {
  return (
    <Panel className="grid gap-4 p-5 sm:grid-cols-3">
      {trustItems.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.title} className="flex items-center gap-4 sm:justify-center">
            <Icon className="h-8 w-8 shrink-0 text-[#f3b544]" strokeWidth={1.7} />
            <div>
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="mt-0.5 text-xs text-white/62">{item.detail}</p>
            </div>
          </div>
        );
      })}
    </Panel>
  );
}

function StatusBadge({ status }: { status: TicketStatus }) {
  const styles: Record<TicketStatus, string> = {
    "In Progress": "bg-[#16436d] text-[#7dbdff]",
    Resolved: "bg-[#123f24] text-[#67d776]",
    Closed: "bg-white/[0.09] text-white/62",
    Open: "bg-[#581717] text-[#ff756d]",
  };

  return (
    <span className={`shrink-0 rounded-[6px] px-2.5 py-1.5 text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
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
    <section
      className={`rounded-[8px] border border-white/12 bg-[#071011]/80 shadow-[0_22px_70px_rgba(0,0,0,.34),inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-2xl ${className}`}
    >
      {children}
    </section>
  );
}

function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-xs font-extrabold uppercase tracking-[0.13em] text-[#f3b544] ${className}`}>
      {children}
    </p>
  );
}
