import Image from "next/image";
import {
  Bell,
  BookOpen,
  Bookmark,
  Briefcase,
  CalendarDays,
  Camera,
  ChevronDown,
  FileText,
  Grid2X2,
  Heart,
  Image as ImageIcon,
  Leaf,
  List,
  Map,
  MapPin,
  MoreVertical,
  Plus,
  Quote,
  Search,
  Smile,
  Sparkles,
  Timer,
} from "lucide-react";
import { JourneeBrand } from "@/components/brand/JourneeLogo";
import { MainNavLink } from "@/components/navigation/MainNavLink";

type JournalEntry = {
  title: string;
  date: string;
  place: string;
  summary: string;
  tags: string[];
  photos: number;
  readTime: string;
  image: string;
};

const navItems = ["Home", "Explore", "Map", "Trips", "Guides", "Journal"];

const menuItems = [
  { label: "All Entries", icon: BookOpen, active: true },
  { label: "My Trips", icon: Briefcase },
  { label: "Daily Notes", icon: CalendarDays },
  { label: "Photos & Albums", icon: ImageIcon },
  { label: "Maps & Places", icon: Map },
  { label: "Saved Moments", icon: Heart },
  { label: "Reflections", icon: Sparkles },
  { label: "Mood Tracker", icon: Smile },
  { label: "Drafts", icon: FileText },
];

const tabs = ["All", "Trips", "Days", "Places", "Tags"];

const featuredEntry: JournalEntry = {
  title: "A Rainy Morning in Higashiyama",
  date: "May 12, 2025",
  place: "Kyoto, Japan",
  summary:
    "Woke up to the sound of rain on rooftops. The streets of Higashiyama were quiet, the air fresh with the scent of cedar and wet earth. Moments like these stay with you forever.",
  tags: ["Reflection", "Higashiyama"],
  photos: 12,
  readTime: "8 min read",
  image:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1800&q=88",
};

const journalEntries: JournalEntry[] = [
  {
    title: "Walking Through the Bamboo Forest",
    date: "May 11, 2025",
    place: "Arashiyama, Kyoto",
    summary: "The bamboo swayed gently in the wind. It felt like walking in another world.",
    tags: ["Nature", "Peaceful"],
    photos: 18,
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=900&q=86",
  },
  {
    title: "My First Tea Ceremony",
    date: "May 10, 2025",
    place: "Gion, Kyoto",
    summary: "A beautiful introduction to Japanese culture. So much meaning in every movement.",
    tags: ["Culture"],
    photos: 14,
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=900&q=86",
  },
  {
    title: "Thousands of Torii Gates",
    date: "May 10, 2025",
    place: "Fushimi Inari, Kyoto",
    summary: "The walk up was peaceful and powerful. Grateful for this experience.",
    tags: ["Spiritual", "Grateful"],
    photos: 22,
    readTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=900&q=86",
  },
];

const overview = [
  { label: "Trips", value: "7", icon: Briefcase },
  { label: "Entries", value: "28", icon: BookOpen },
  { label: "Photos", value: "156", icon: Camera },
  { label: "Places", value: "23", icon: MapPin },
];

const moods = [
  { date: "5/10", value: 42, icon: "☹" },
  { date: "5/11", value: 52, icon: "☹" },
  { date: "5/12", value: 70, icon: "☺", best: true },
  { date: "5/14", value: 52, icon: "◔" },
  { date: "5/15", value: 42, icon: "☻" },
  { date: "5/16", value: 58, icon: "◡" },
];

const recentEntries = [
  {
    title: "A Rainy Morning in Higashiyama",
    meta: "May 12, 2025 · Kyoto",
    time: "8 min read",
    image: featuredEntry.image,
  },
  {
    title: "Walking Through the Bamboo Forest",
    meta: "May 11, 2025 · Arashiyama",
    time: "6 min read",
    image: journalEntries[0].image,
  },
  {
    title: "My First Tea Ceremony",
    meta: "May 10, 2025 · Gion",
    time: "7 min read",
    image: journalEntries[1].image,
  },
  {
    title: "Sunset Views from Kiyomizu-dera",
    meta: "May 10, 2025 · Kyoto",
    time: "5 min read",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=84",
  },
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
      className={`border border-white/10 bg-[#071011]/80 shadow-[0_22px_70px_rgba(0,0,0,.28)] backdrop-blur-xl ${className}`}
    >
      {children}
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/15 bg-black/18 px-3 py-1 text-[0.7rem] font-medium text-white/76">
      {children}
    </span>
  );
}

export function JourneyJournalPage() {
  return (
    <main className="min-h-screen bg-[#030707] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_48%_0%,rgba(209,158,67,.15),transparent_30%),linear-gradient(120deg,#020505,#071213_46%,#030606)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.022)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#030707]/82 backdrop-blur-2xl">
        <div className="flex h-[72px] items-center gap-6 px-4 sm:px-6 xl:px-8">
          <a href="/" aria-label="JOURNEE home">
            <JourneeBrand
              direction="atlas-aperture"
              className="[&>span:first-child]:h-9 [&>span:first-child]:w-9 [&>span:first-child]:rounded-none [&>span:first-child]:border-0 [&>span:first-child]:bg-transparent [&>span:first-child]:shadow-none [&>span:first-child_svg]:h-8 [&>span:first-child_svg]:w-8 [&>span:last-child]:text-2xl [&>span:last-child]:font-medium [&>span:last-child]:tracking-[0.12em]"
            />
          </a>

          <nav className="hidden items-center gap-7 text-[0.82rem] font-medium text-white/84 lg:flex">
            {navItems.map((item) => (
              <MainNavLink
                key={item}
                label={item}
                className="relative py-7 transition hover:text-[#e2ad50]"
                activeClassName="text-[#e2ad50]"
                underlineClassName="absolute inset-x-0 bottom-0 h-0.5 bg-[#e2ad50]"
              />
            ))}
          </nav>

          <div className="ml-auto hidden min-w-[260px] max-w-[520px] flex-1 items-center rounded-full border border-white/16 bg-white/[0.045] px-4 py-2 text-white/62 shadow-inner shadow-white/5 md:flex">
            <span className="truncate text-[0.78rem]">Search your journals, places, moments...</span>
            <Search className="ml-auto h-4 w-4 text-white/82" />
          </div>
          <button aria-label="Notifications" className="grid h-10 w-10 place-items-center rounded-full text-white/82 transition hover:bg-white/8 hover:text-[#e2ad50]">
            <Bell className="h-5 w-5" />
          </button>
          <Image
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
            alt="Profile avatar"
            width={42}
            height={42}
            className="h-10 w-10 rounded-full border-2 border-[#d9a756]/50 object-cover"
          />
        </div>
      </header>

      <div className="grid gap-5 px-4 py-5 sm:px-6 xl:grid-cols-[260px_minmax(0,1fr)_330px] xl:px-8">
        <aside className="hidden xl:block">
          <div className="sticky top-24 space-y-5">
            <GlassPanel className="rounded-lg p-4">
              <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#e2ad50]">My Journal</p>
              <div className="space-y-1.5">
                {menuItems.map(({ label, icon: Icon, active }) => (
                  <button
                    key={label}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[0.82rem] transition ${
                      active
                        ? "border border-[#d9a756]/26 bg-[#d9a756]/14 text-[#f3c46e]"
                        : "text-white/82 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel className="rounded-lg p-4">
              <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#e2ad50]">Current Trip</p>
              <div className="relative h-24 overflow-hidden rounded-md">
                <Image
                  src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=700&q=84"
                  alt="Kyoto sunset pagoda"
                  fill
                  sizes="230px"
                  className="object-cover"
                />
              </div>
              <h2 className="mt-3 font-sans text-xl text-white">Kyoto, Japan</h2>
              <p className="mt-1 text-[0.75rem] text-white/68">May 10 - May 16, 2025</p>
              <p className="mt-2 flex items-center gap-2 text-[0.75rem] text-white/74">
                <CalendarDays className="h-3.5 w-3.5 text-[#e2ad50]" /> 7 Days
              </p>
              <button className="mt-4 flex w-full items-center justify-between rounded-md border border-[#d9a756]/28 bg-[#d9a756]/13 px-4 py-2.5 text-[0.78rem] font-semibold text-[#f2bf65] transition hover:bg-[#d9a756]/20">
                View Trip <span aria-hidden>›</span>
              </button>
            </GlassPanel>

            <GlassPanel className="rounded-lg p-5">
              <Quote className="h-6 w-6 fill-[#d9a756]/22 text-[#d9a756]/42" />
              <blockquote className="mt-3 font-sans text-[1.02rem] italic leading-7 text-white/84">
                The world is a book and those who do not travel read only one page.
              </blockquote>
              <p className="mt-4 text-[0.76rem] font-medium text-[#e2ad50]">- Saint Augustine</p>
            </GlassPanel>
          </div>
        </aside>

        <section className="min-w-0">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-sans text-[2.35rem] font-semibold leading-none text-white sm:text-[2.75rem]">
                My Travel Journal
              </h1>
              <p className="mt-2 text-[0.92rem] text-white/72">Your memories. Your story. Your journey.</p>
            </div>
            <button className="inline-flex w-max items-center gap-2 rounded-md border border-[#d9a756]/32 bg-[#d9a756]/15 px-4 py-2.5 text-[0.82rem] font-semibold text-[#f3c46e] shadow-[0_14px_38px_rgba(217,167,86,.12)] transition hover:bg-[#d9a756]/22">
              <Plus className="h-4 w-4" /> New Entry <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex overflow-hidden rounded-full border border-white/12 bg-black/24 p-0.5">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`min-w-16 px-4 py-2 text-[0.8rem] transition ${
                    tab === "All" ? "rounded-full bg-[#dca94f] text-black" : "text-white/70 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="hidden overflow-hidden rounded-md border border-white/12 bg-black/24 sm:flex">
              <button aria-label="Grid view" className="grid h-10 w-12 place-items-center border-r border-white/10 text-white/72">
                <Grid2X2 className="h-4 w-4" />
              </button>
              <button aria-label="List view" className="grid h-10 w-12 place-items-center text-white/86">
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          <GlassPanel className="relative overflow-hidden rounded-lg border-[#d9a756]/28">
            <Image
              src={featuredEntry.image}
              alt={featuredEntry.title}
              fill
              priority
              sizes="(min-width: 1280px) 760px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,7,.96)_0%,rgba(3,7,7,.76)_34%,rgba(3,7,7,.18)_68%),linear-gradient(0deg,rgba(3,7,7,.82),transparent_50%)]" />
            <div className="relative min-h-[360px] p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-5 text-[0.75rem] text-white/78">
                <span className="text-[#f3c46e]">{featuredEntry.date}</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-white/72" /> {featuredEntry.place}
                </span>
                <button aria-label="Entry options" className="ml-auto grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
              <h2 className="mt-5 max-w-md font-sans text-[2rem] font-medium leading-tight text-white sm:text-[2.25rem]">
                {featuredEntry.title}
              </h2>
              <p className="mt-4 max-w-sm text-[0.9rem] leading-7 text-white/80">{featuredEntry.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {featuredEntry.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-6 text-[0.78rem] text-white/78">
                <span className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" /> {featuredEntry.photos} Photos
                </span>
                <span className="flex items-center gap-2">
                  <Timer className="h-4 w-4" /> {featuredEntry.readTime}
                </span>
                <button className="ml-auto flex items-center gap-2 text-[0.82rem] font-semibold text-[#f2bf65]">
                  Read Entry <span aria-hidden>→</span>
                </button>
              </div>
            </div>
          </GlassPanel>

          <div className="mt-4 space-y-3.5">
            {journalEntries.map((entry) => (
              <GlassPanel key={entry.title} className="overflow-hidden rounded-lg">
                <article className="grid gap-4 p-3 sm:grid-cols-[240px_minmax(0,1fr)] sm:items-center">
                  <div className="relative h-40 overflow-hidden rounded-md sm:h-[142px]">
                    <Image src={entry.image} alt={entry.title} fill sizes="260px" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                  </div>
                  <div className="min-w-0 px-1 py-1 sm:px-0">
                    <div className="flex items-start gap-3">
                      <div className="min-w-0">
                        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.68rem] text-white/62">
                          <span>{entry.date}</span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3 w-3 text-white/50" /> {entry.place}
                          </span>
                        </p>
                        <h3 className="mt-2 truncate font-sans text-[1.35rem] font-medium text-white">{entry.title}</h3>
                        <p className="mt-1 line-clamp-2 text-[0.78rem] leading-5 text-white/68">{entry.summary}</p>
                      </div>
                      <button aria-label={`Save ${entry.title}`} className="ml-auto mt-5 text-[#e2ad50]">
                        <Bookmark className="h-4 w-4" />
                      </button>
                      <button aria-label={`Options for ${entry.title}`} className="mt-5 text-white/64">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-[0.72rem] text-white/68">
                      {entry.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                      <span className="ml-auto flex items-center gap-1.5">
                        <ImageIcon className="h-3.5 w-3.5" /> {entry.photos} Photos
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Timer className="h-3.5 w-3.5" /> {entry.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              </GlassPanel>
            ))}
          </div>
        </section>

        <aside className="space-y-4 xl:col-span-1">
          <GlassPanel className="rounded-lg p-5">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#e2ad50]">Journey Overview</p>
            <div className="mt-4 grid grid-cols-2 border-t border-white/10">
              {overview.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-4 border-b border-white/10 p-4 odd:border-r odd:border-white/10">
                  <Icon className="h-6 w-6 text-[#e2ad50]" />
                  <div>
                    <p className="font-sans text-2xl leading-none text-white">{value}</p>
                    <p className="mt-1 text-[0.74rem] text-white/64">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="rounded-lg p-5">
            <div className="flex items-center justify-between">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#e2ad50]">Mood Tracker</p>
              <span className="text-[0.72rem] text-white/62">This Trip</span>
            </div>
            <div className="mt-4 grid grid-cols-6 items-end gap-3">
              {moods.map((mood) => (
                <div key={mood.date} className="flex flex-col items-center gap-2">
                  <span
                    className={`grid h-7 w-7 place-items-center rounded-full border text-sm ${
                      mood.best ? "border-[#e2ad50] text-[#e2ad50]" : "border-white/14 text-white/34"
                    }`}
                  >
                    {mood.icon}
                  </span>
                  <div className="flex h-24 items-end">
                    <div
                      className={`w-6 rounded-t-md ${mood.best ? "bg-[#dda84f]" : "bg-white/13"}`}
                      style={{ height: `${mood.value}%` }}
                    />
                  </div>
                  <span className={`text-[0.7rem] ${mood.best ? "text-white" : "text-white/54"}`}>{mood.date}</span>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="rounded-lg p-5">
            <div className="flex items-center justify-between">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#e2ad50]">Recent Entries</p>
              <button className="text-[0.72rem] text-white/62">View all</button>
            </div>
            <div className="mt-4 space-y-3">
              {recentEntries.map((entry) => (
                <article key={entry.title} className="grid grid-cols-[72px_minmax(0,1fr)] gap-3">
                  <div className="relative h-16 overflow-hidden rounded-md">
                    <Image src={entry.image} alt="" fill sizes="72px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate font-sans text-[0.78rem] font-semibold text-white">{entry.title}</h3>
                    <p className="mt-1 truncate text-[0.68rem] text-white/56">{entry.meta}</p>
                    <p className="mt-1 text-[0.68rem] text-white/76">{entry.time}</p>
                  </div>
                </article>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="rounded-lg p-5">
            <p className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#e2ad50]">
              <Leaf className="h-4 w-4" /> Journal Prompt
            </p>
            <p className="mt-4 text-[0.88rem] leading-6 text-white/76">
              What is a moment from today that you never want to forget?
            </p>
            <button className="mt-5 w-full rounded-md bg-[#dda84f] px-4 py-2.5 text-[0.82rem] font-semibold text-black transition hover:bg-[#efbf65] sm:w-auto sm:min-w-28">
              Write Now
            </button>
          </GlassPanel>
        </aside>
      </div>
    </main>
  );
}
