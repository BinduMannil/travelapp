import {
  Bell,
  BriefcaseBusiness,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  Edit3,
  FileText,
  Filter,
  HelpCircle,
  Hotel,
  Luggage,
  MapPin,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  UserRound,
  WalletCards,
  XCircle,
} from "lucide-react";
import { MainNavLink } from "@/components/navigation/MainNavLink";
import { navigationHref } from "@/lib/routes";

type TripStatus = "Upcoming" | "In Progress" | "Completed" | "Cancelled";

type Trip = {
  id: string;
  name: string;
  status: TripStatus;
  dates: string;
  destination: string;
  progress: string;
  image: string;
  guests: number;
  companions: string[];
};

type ItineraryItem = {
  date: string;
  weekday: string;
  time: string;
  title: string;
  location: string;
  detail: string;
  secondaryDetail?: string;
  confirmation?: string;
  image: string;
  status: "Confirmed";
};

type TripData = {
  trips: Trip[];
  itinerary: ItineraryItem[];
  bookings: {
    confirmed: number;
    pending: number;
  };
  expenses: {
    totalSpent: string;
    totalSaved: string;
  };
  notes: string[];
  documents: string[];
  checklists: {
    complete: number;
    total: number;
  };
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

const tripData: TripData = {
  trips: [
    {
      id: "tokyo-adventure",
      name: "Tokyo Adventure",
      status: "Upcoming",
      dates: "May 20 - May 23, 2025",
      destination: "Tokyo, Japan",
      progress: "3 days to go",
      image:
        "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=900&q=84",
      guests: 2,
      companions: ["AB", "LM", "SK", "+2"],
    },
    {
      id: "bali-escape",
      name: "Bali Escape",
      status: "In Progress",
      dates: "May 10 - May 17, 2025",
      destination: "Bali, Indonesia",
      progress: "2 of 7 days",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=84",
      guests: 3,
      companions: ["MR", "TA", "JP", "+1"],
    },
    {
      id: "paris-getaway",
      name: "Paris Getaway",
      status: "Upcoming",
      dates: "Jun 5 - Jun 9, 2025",
      destination: "Paris, France",
      progress: "19 days to go",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=84",
      guests: 4,
      companions: ["AN", "CE", "DB", "+3"],
    },
    {
      id: "swiss-alps",
      name: "Swiss Alps",
      status: "Completed",
      dates: "Apr 2 - Apr 8, 2025",
      destination: "Switzerland",
      progress: "Completed",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=84",
      guests: 2,
      companions: ["RH", "KL"],
    },
  ],
  itinerary: [
    {
      date: "20",
      weekday: "Tue",
      time: "10:30 AM",
      title: "Flight to Tokyo (JL 712)",
      location: "John F. Kennedy Intl. (JFK) -> Haneda (HND)",
      detail: "11:30 PM",
      secondaryDetail: "Terminal 1",
      image:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=220&q=80",
      status: "Confirmed",
    },
    {
      date: "21",
      weekday: "Wed",
      time: "3:00 PM",
      title: "Check-in: Park Hyatt Tokyo",
      location: "Shinjuku-ku, Tokyo, Japan",
      detail: "3 Nights",
      secondaryDetail: "Deluxe Room",
      confirmation: "Confirmation: 87654321",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=220&q=80",
      status: "Confirmed",
    },
    {
      date: "22",
      weekday: "Thu",
      time: "9:00 AM",
      title: "Shibuya Food & Culture Walk",
      location: "Shibuya, Tokyo, Japan",
      detail: "3 Hours",
      secondaryDetail: "2 Guests",
      confirmation: "Confirmation: ACT-9876",
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=220&q=80",
      status: "Confirmed",
    },
    {
      date: "23",
      weekday: "Fri",
      time: "10:00 AM",
      title: "TeamLab Planets Tokyo",
      location: "Toyosu, Tokyo, Japan",
      detail: "2 Hours",
      secondaryDetail: "2 Guests",
      confirmation: "Confirmation: ACT-6677",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=220&q=80",
      status: "Confirmed",
    },
  ],
  bookings: {
    confirmed: 8,
    pending: 1,
  },
  expenses: {
    totalSpent: "$4,285.50",
    totalSaved: "$620.00",
  },
  notes: ["Restaurant short list", "Rain plan for May 22", "Airport pickup details"],
  documents: ["Passports", "Hotel voucher", "Travel insurance", "TeamLab tickets"],
  checklists: {
    complete: 18,
    total: 24,
  },
};

const menuItems = [
  { label: "All Trips", count: 6, icon: CalendarCheck, active: true },
  { label: "Upcoming", count: 3, icon: Clock3 },
  { label: "In Progress", count: 1, icon: BriefcaseBusiness },
  { label: "Completed", count: 2, icon: CheckCircle2 },
  { label: "Cancelled", count: 0, icon: XCircle },
];

const toolItems = [
  { label: "Itinerary Planner", icon: CalendarDays },
  { label: "Bookings", icon: Hotel },
  { label: "Documents", icon: FileText },
  { label: "Expenses", icon: WalletCards },
  { label: "Packing Lists", icon: Luggage },
  { label: "Checklists", icon: ClipboardCheck },
];

const tabs = ["Itinerary", "Bookings", "Expenses", "Documents", "Notes", "Checklists"];

const summaryStats = [
  { label: "Total Trips", value: "6", icon: CalendarDays },
  { label: "Upcoming", value: "3", icon: Clock3 },
  { label: "In Progress", value: "1", icon: BriefcaseBusiness },
  { label: "Completed", value: "2", icon: CheckCircle2 },
  { label: "Total Spent", value: "$4,285.50", icon: CircleDollarSign },
  { label: "Total Saved", value: "$620.00", icon: WalletCards, success: true },
];

const upcomingNext = [
  tripData.trips[0],
  tripData.trips[2],
  {
    id: "maldives-retreat",
    name: "Maldives Retreat",
    status: "Upcoming" as const,
    dates: "Jun 25 - Jul 2, 2025",
    destination: "Maldives",
    progress: "39 days to go",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=500&q=84",
    guests: 2,
    companions: ["MA", "NO"],
  },
];

function statusClasses(status: TripStatus) {
  if (status === "In Progress") {
    return "bg-[#2f8cff]/90 text-white";
  }

  if (status === "Completed") {
    return "bg-white/18 text-white/90";
  }

  if (status === "Cancelled") {
    return "bg-[#e16060]/90 text-white";
  }

  return "bg-[#45a83e]/90 text-white";
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
      className={`rounded-[8px] border border-white/10 bg-[#07111a]/82 shadow-[0_22px_70px_rgba(0,0,0,.36),inset_0_1px_0_rgba(255,255,255,.05)] backdrop-blur-2xl ${className}`}
    >
      {children}
    </section>
  );
}

function AppNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#020911]/92 px-4 backdrop-blur-2xl md:px-6">
      <div className="mx-auto flex h-16 max-w-[1780px] items-center gap-6">
        <a href="/" className="flex shrink-0 items-center gap-3 text-white">
          <svg
            viewBox="0 0 48 48"
            aria-hidden="true"
            className="h-11 w-11 text-[#f4ad18]"
          >
            <path
              d="M6 37 19.3 10.5c1.2-2.4 4.5-2.4 5.7 0L42 37c1 2-.5 4.4-2.8 4.4H8.8C6.5 41.4 5 39 6 37Z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
            <path
              d="M20 12.5 28.8 33h10.7"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
          </svg>
          <span className="text-2xl font-semibold uppercase tracking-[0.14em]">Journee</span>
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-8 overflow-visible xl:flex">
          {navItems.map((item) => (
            <MainNavLink
              key={item}
              label={item}
              href={navigationHref(item)}
              className="relative inline-flex min-w-max items-center whitespace-nowrap rounded-[6px] px-1 py-3 text-sm font-medium transition"
              activeClassName="text-[#f6b313]"
              inactiveClassName="text-white/88 hover:text-white"
              underlineClassName="absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[#f6b313]"
            />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-[#f6b313] px-1 text-[10px] font-bold text-[#1b1202]">
              3
            </span>
          </button>
          <button
            type="button"
            className="hidden items-center gap-2 rounded-full text-white md:flex"
            aria-label="Profile menu"
          >
            <span
              className="h-10 w-10 rounded-full border border-[#f6b313]/35 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80)",
              }}
            />
            <ChevronDown className="h-4 w-4 text-white/80" />
          </button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white xl:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

function LeftSidebar() {
  return (
    <aside className="space-y-4 2xl:sticky 2xl:top-20 2xl:self-start">
      <GlassPanel className="p-5">
        <h2 className="text-lg font-semibold text-white">My Trips</h2>
        <div className="mt-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                className={`flex h-11 w-full items-center gap-3 rounded-[7px] px-3 text-left text-sm transition ${
                  item.active
                    ? "border-l-2 border-[#f6b313] bg-[#f6b313]/18 text-[#f6b313]"
                    : "text-white/86 hover:bg-white/[0.045] hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1">{item.label}</span>
                <span
                  className={`grid h-6 min-w-6 place-items-center rounded-[6px] px-2 text-xs font-semibold ${
                    item.active ? "bg-[#f6b313]/16 text-[#f6b313]" : "bg-white/[0.07] text-white/75"
                  }`}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="my-5 h-px bg-white/10" />

        <h3 className="text-sm font-semibold text-white">Trip Tools</h3>
        <div className="mt-4 space-y-1">
          {toolItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                className="flex h-11 w-full items-center gap-3 rounded-[7px] px-3 text-left text-sm text-white/86 transition hover:bg-white/[0.045] hover:text-white"
              >
                <Icon className="h-4 w-4 text-white/78" />
                {item.label}
              </button>
            );
          })}
        </div>
      </GlassPanel>

      <section
        className="overflow-hidden rounded-[8px] border border-[#f6b313]/18 bg-cover bg-center p-5 shadow-[0_22px_70px_rgba(0,0,0,.4)]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(20,25,46,.42), rgba(3,10,13,.92)), url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=84)",
        }}
      >
        <div className="min-h-[220px] pt-3">
          <h3 className="text-lg font-semibold text-white">Plan smarter, travel better</h3>
          <p className="mt-3 max-w-[16rem] text-sm leading-6 text-white/82">
            Organize everything in one place and get real-time updates.
          </p>
        </div>
        <button
          type="button"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-[7px] bg-[#f6b313] px-4 text-sm font-bold text-[#1c1202] shadow-[0_14px_34px_rgba(246,179,19,.24)]"
        >
          <Plus className="h-4 w-4" />
          Create New Trip
        </button>
      </section>
    </aside>
  );
}

function TripCard({ trip, featured = false }: { trip: Trip; featured?: boolean }) {
  const completed = trip.status === "Completed";

  return (
    <article
      className={`group min-w-[250px] overflow-hidden rounded-[8px] border bg-[#08131d]/92 transition hover:-translate-y-0.5 hover:border-[#f6b313]/45 ${
        featured ? "border-[#f6b313]/48 shadow-[0_0_0_1px_rgba(246,179,19,.18),0_18px_54px_rgba(246,179,19,.1)]" : "border-white/10"
      }`}
    >
      <div
        className="relative h-36 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(2,9,17,.05), rgba(2,9,17,.24) 46%, rgba(2,9,17,.78)), url(${trip.image})`,
        }}
      >
        <span
          className={`absolute left-3 top-3 rounded-[5px] px-2 py-1 text-[11px] font-bold uppercase ${statusClasses(
            trip.status,
          )}`}
        >
          {trip.status}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-white">{trip.name}</h3>
        <p className="mt-1 text-sm text-white/66">{trip.dates}</p>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-white/58">
          <MapPin className="h-3.5 w-3.5" />
          {trip.destination}
        </p>
        <div className="mt-4 flex items-center">
          {trip.companions.map((companion, index) => (
            <span
              key={`${trip.id}-${companion}`}
              className="-ml-1 first:ml-0 grid h-7 w-7 place-items-center rounded-full border border-[#08131d] bg-[#d1a36a] text-[10px] font-bold text-[#180f05]"
              style={{ zIndex: 8 - index }}
            >
              {companion}
            </span>
          ))}
        </div>
        <div className="mt-4 h-px bg-white/10" />
        <p className={`mt-3 flex items-center gap-1.5 text-sm font-medium ${completed ? "text-[#62d66b]" : trip.status === "In Progress" ? "text-[#74b7ff]" : "text-[#62d66b]"}`}>
          {trip.progress}
          {completed ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
        </p>
      </div>
    </article>
  );
}

function MainContent() {
  const selectedTrip = tripData.trips[0];

  return (
    <main className="min-w-0 space-y-4">
      <GlassPanel className="p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-[1.75rem] font-semibold leading-tight text-white">My Trips</h1>
            <p className="mt-2 text-sm text-white/72">
              Manage your adventures, itineraries and bookings all in one place.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-[minmax(220px,330px)_120px]">
            <label className="flex h-11 items-center gap-3 rounded-[7px] border border-white/10 bg-[#05101a] px-3 text-sm text-white/70 focus-within:border-[#f6b313]/50">
              <Search className="h-4 w-4 text-white/80" />
              <input
                className="min-w-0 flex-1 bg-transparent text-white placeholder:text-white/54 focus:outline-none"
                placeholder="Search trips..."
                aria-label="Search trips"
              />
            </label>
            <button
              type="button"
              className="flex h-11 items-center justify-center gap-2 rounded-[7px] border border-white/10 bg-[#05101a] px-3 text-sm font-medium text-white"
            >
              <Filter className="h-4 w-4" />
              Filter
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative mt-6">
          <div className="flex gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tripData.trips.map((trip, index) => (
              <TripCard key={trip.id} trip={trip} featured={index === 0} />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next trips"
            className="absolute right-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-[#09131d]/90 text-white shadow-[0_10px_30px_rgba(0,0,0,.42)] lg:grid"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </GlassPanel>

      <GlassPanel className="overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-white/10 p-5 md:flex-row md:items-center md:justify-between md:p-6">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-semibold text-white">{selectedTrip.name}</h2>
              <span className="rounded-[5px] bg-[#45a83e]/80 px-2 py-1 text-[11px] font-bold uppercase text-white">
                {selectedTrip.status}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/68">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {selectedTrip.dates}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {selectedTrip.destination}
              </span>
              <span className="flex items-center gap-1.5">
                <UserRound className="h-4 w-4" />
                {selectedTrip.guests} Guests
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="h-10 rounded-[7px] border border-white/12 bg-white/[0.03] px-4 text-sm font-medium text-white"
            >
              View Itinerary
            </button>
            <button
              type="button"
              className="flex h-10 items-center gap-2 rounded-[7px] bg-[#f6b313] px-5 text-sm font-bold text-[#1c1202]"
            >
              <Edit3 className="h-4 w-4" />
              Edit Trip
            </button>
            <button
              type="button"
              aria-label="More trip actions"
              className="grid h-10 w-11 place-items-center rounded-[7px] border border-white/12 bg-white/[0.03] text-white"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto border-b border-white/10 px-5 [scrollbar-width:none] md:px-6 [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max gap-6">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                type="button"
                className={`relative h-12 text-sm font-medium ${
                  index === 0 ? "text-[#f6b313]" : "text-white/72"
                }`}
              >
                {tab}
                {index === 0 ? (
                  <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-[#f6b313]" />
                ) : null}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 md:p-5">
          <div className="overflow-hidden rounded-[8px] border border-white/10 bg-[#06101a]/72">
            {tripData.itinerary.map((item, index) => (
              <article
                key={`${item.date}-${item.title}`}
                className="grid gap-4 border-b border-white/8 p-4 last:border-b-0 md:grid-cols-[72px_82px_92px_minmax(220px,1fr)_170px_70px] md:items-center"
              >
                <div className="flex items-center gap-3 md:block">
                  <div className="text-[11px] font-semibold uppercase leading-none text-white/80">May</div>
                  <div className="text-2xl font-semibold leading-tight text-white">{item.date}</div>
                  <div className="text-[11px] font-semibold uppercase text-white/58">{item.weekday}</div>
                </div>

                <div className="relative hidden h-full items-center md:flex">
                  <span className="absolute left-4 top-0 h-[calc(100%+2rem)] w-px bg-white/18" />
                  <span className="relative z-10 grid h-4 w-4 place-items-center rounded-full bg-[#62d66b] shadow-[0_0_0_5px_rgba(98,214,107,.12)]" />
                  {index === tripData.itinerary.length - 1 ? (
                    <span className="absolute bottom-0 left-4 h-1/2 w-px bg-[#06101a]" />
                  ) : null}
                </div>

                <p className="text-sm font-medium text-white">{item.time}</p>

                <div className="grid min-w-0 gap-3 sm:grid-cols-[86px_1fr] sm:items-center">
                  <div
                    className="h-16 rounded-[6px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-white/62">{item.location}</p>
                    {item.confirmation ? (
                      <p className="mt-1 text-xs text-white/54">{item.confirmation}</p>
                    ) : null}
                    <span className="mt-2 inline-flex rounded-[5px] border border-[#62d66b]/35 bg-[#62d66b]/10 px-2 py-1 text-[11px] font-medium text-[#62d66b] md:hidden">
                      {item.status}
                    </span>
                  </div>
                </div>

                <div className="text-sm text-white/70">
                  <p>{item.detail}</p>
                  {item.secondaryDetail ? <p className="mt-1 text-white/58">{item.secondaryDetail}</p> : null}
                  <span className="mt-2 hidden w-fit rounded-[5px] border border-[#62d66b]/35 bg-[#62d66b]/10 px-2 py-1 text-[11px] font-medium text-[#62d66b] md:inline-flex">
                    {item.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-white md:justify-end">
                  <button type="button" aria-label={`Edit ${item.title}`}>
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button type="button" aria-label={`Expand ${item.title}`}>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              className="flex h-10 items-center gap-2 rounded-[7px] px-5 text-sm font-bold text-[#f6b313]"
            >
              View Full Itinerary
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </GlassPanel>
    </main>
  );
}

function RightSidebar() {
  return (
    <aside className="space-y-4 2xl:sticky 2xl:top-20 2xl:self-start">
      <GlassPanel className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Trip Summary</h2>
          <button type="button" className="text-sm font-medium text-[#f6b313]">
            View all
          </button>
        </div>
        <div className="space-y-4">
          {summaryStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-3 text-sm">
                <Icon className="h-4 w-4 text-white/86" />
                <span className="flex-1 text-white/84">{stat.label}</span>
                <span className={`text-base font-medium ${stat.success ? "text-[#62d66b]" : "text-white"}`}>
                  {stat.value}
                </span>
              </div>
            );
          })}
        </div>
      </GlassPanel>

      <GlassPanel className="p-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Upcoming Next</h2>
          <button type="button" className="text-sm font-medium text-[#f6b313]">
            View all
          </button>
        </div>
        <div className="space-y-4">
          {upcomingNext.map((trip) => (
            <article key={trip.id} className="grid grid-cols-[104px_1fr] gap-4 border-b border-white/8 pb-4 last:border-b-0 last:pb-0">
              <div
                className="h-[82px] rounded-[8px] bg-cover bg-center"
                style={{ backgroundImage: `url(${trip.image})` }}
              />
              <div>
                <h3 className="text-base font-semibold text-white">{trip.name}</h3>
                <p className="mt-2 text-sm text-white/68">{trip.dates}</p>
                <p className="mt-1 text-sm font-medium text-[#62d66b]">{trip.progress}</p>
              </div>
            </article>
          ))}
        </div>
      </GlassPanel>

      <GlassPanel className="p-5">
        <h2 className="text-lg font-semibold text-white">Need Help?</h2>
        <p className="mt-2 text-sm text-white/72">Get 24/7 support for your trips.</p>
        <div className="mt-5 space-y-2">
          {[
            { label: "Visit Help Center", icon: HelpCircle },
            { label: "Chat with Support", icon: MessageCircle },
            { label: "Call Us", icon: Phone, value: "+1 (800) 123-4567" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                className="flex h-11 w-full items-center gap-3 rounded-[7px] border border-white/10 bg-white/[0.025] px-3 text-left text-sm text-white transition hover:border-[#f6b313]/35"
              >
                <Icon className="h-4 w-4" />
                <span className="flex-1">{item.label}</span>
                {item.value ? (
                  <span className="text-[#f6b313]">{item.value}</span>
                ) : (
                  <ChevronRight className="h-4 w-4 text-white/68" />
                )}
              </button>
            );
          })}
        </div>
      </GlassPanel>
    </aside>
  );
}

export function JourneyBuilderPage() {
  return (
    <div className="journey-builder-ui min-h-screen bg-[#020911] text-white">
      <AppNav />
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(circle_at_20%_0%,rgba(246,179,19,.12),transparent_30%),radial-gradient(circle_at_78%_12%,rgba(59,130,246,.10),transparent_28%),linear-gradient(180deg,#020911_0%,#06131d_48%,#02070c_100%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[.08] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:80px_80px]" />

      <div className="relative z-10 mx-auto grid max-w-[1680px] gap-4 px-4 py-4 md:px-6 2xl:grid-cols-[250px_minmax(0,1fr)_340px]">
        <div className="order-2 2xl:order-none">
          <LeftSidebar />
        </div>
        <div className="order-1 2xl:order-none">
          <MainContent />
        </div>
        <div className="order-3 2xl:order-none">
          <RightSidebar />
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#07111a]/94 p-3 backdrop-blur-2xl md:hidden">
        <div className="grid grid-cols-2 gap-2">
          <button type="button" className="h-11 rounded-[7px] border border-white/12 text-sm font-semibold text-white">
            View Itinerary
          </button>
          <button type="button" className="h-11 rounded-[7px] bg-[#f6b313] text-sm font-bold text-[#1c1202]">
            Edit Trip
          </button>
        </div>
      </div>
    </div>
  );
}
