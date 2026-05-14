"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Archive,
  Camera,
  ChevronRight,
  Compass,
  Feather,
  Heart,
  Map,
  Menu,
  Moon,
  PenLine,
  Plus,
  Route,
  Sparkle,
  X,
} from "lucide-react";

type TripStatus = "In 10 days" | "Confirmed" | "Planning" | "Saved" | "Remembered";
type TripTab = "Upcoming" | "Past Trips";

type Trip = {
  title: string;
  dates: string;
  cities: string;
  description: string;
  status: TripStatus;
  tab: TripTab;
  image: string;
  imagePosition?: string;
};

const navItems = [
  { label: "My Trips", icon: Route, active: true },
  { label: "Daily Notes", icon: PenLine },
  { label: "Photos & Albums", icon: Camera },
  { label: "Maps & Places", icon: Map },
  { label: "Saved Moments", icon: Heart },
  { label: "Reflections", icon: Sparkle },
  { label: "Mood Tracker", icon: Moon },
  { label: "Drafts", icon: Archive },
];

const trips: Trip[] = [
  {
    title: "Italy Escape",
    dates: "May 17 - May 26, 2026",
    cities: "Positano, Rome, Florence",
    description: "A coastal escape filled with culture, cuisine, and timeless beauty.",
    status: "In 10 days",
    tab: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1500&q=88",
  },
  {
    title: "Bali Retreat",
    dates: "Jun 3 - Jun 14, 2026",
    cities: "Ubud, Canggu, Uluwatu",
    description: "Wellness, adventure, and serenity in paradise.",
    status: "Confirmed",
    tab: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1500&q=88",
  },
  {
    title: "Swiss Getaway",
    dates: "Sep 10 - Sep 18, 2026",
    cities: "Lucerne, Interlaken, Zermatt",
    description: "Crisp air, stunning peaks, and unforgettable views.",
    status: "Planning",
    tab: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1500&q=88",
  },
  {
    title: "Japan Journey",
    dates: "Apr 5 - Apr 17, 2025",
    cities: "Tokyo, Kyoto, Osaka",
    description: "Tradition, innovation, and endless discovery.",
    status: "Saved",
    tab: "Past Trips",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1500&q=88",
    imagePosition: "object-[50%_42%]",
  },
  {
    title: "Morocco Afterlight",
    dates: "Nov 2 - Nov 11, 2025",
    cities: "Marrakesh, Fes, Sahara",
    description: "Lantern-lit riads, desert silence, and color remembered like film.",
    status: "Remembered",
    tab: "Past Trips",
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1500&q=88",
  },
];

const tabs: TripTab[] = ["Upcoming", "Past Trips"];

const statusStyles: Record<TripStatus, string> = {
  "In 10 days": "border-emerald-300/15 bg-emerald-300/12 text-emerald-100",
  Confirmed: "border-[#d7b16b]/18 bg-[#d7b16b]/14 text-[#f5dca5]",
  Planning: "border-amber-300/15 bg-amber-300/12 text-amber-100",
  Saved: "border-sky-200/15 bg-sky-200/12 text-sky-100",
  Remembered: "border-rose-200/15 bg-rose-200/12 text-rose-100",
};

function JourneeMark() {
  return (
    <div className="flex items-center gap-3">
      <span className="relative grid h-9 w-9 place-items-center rounded-full border border-[#d7b16b]/45 bg-[#d7b16b]/8 shadow-[0_0_34px_rgba(215,177,107,.2)]">
        <span className="h-5 w-[11px] rounded-full border border-[#e6c37c] [clip-path:polygon(50%_0,100%_38%,82%_100%,18%_100%,0_38%)]" />
      </span>
      <span className="font-sans text-[0.88rem] font-medium uppercase tracking-[0.32em] text-[#f7ead0]">
        Journee
      </span>
    </div>
  );
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex h-full flex-col px-5 py-7 md:px-4 lg:px-6">
      <div className="flex items-center justify-between gap-4">
        <JourneeMark />
        {onClose ? (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#d7b16b]/15 bg-white/[0.04] text-[#f8edd7] transition hover:border-[#d7b16b]/45 hover:bg-[#d7b16b]/10"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <nav className="mt-14 space-y-2 md:mt-16">
        {navItems.map(({ label, icon: Icon, active }) => (
          <a
            key={label}
            href={active ? "/trips" : "#"}
            className={`group flex h-[52px] items-center gap-4 rounded-[18px] border px-4 py-3 font-sans text-[0.9rem] transition duration-300 md:justify-center md:px-3 lg:justify-start lg:px-4 ${
              active
                ? "border-[#d7b16b]/24 bg-[rgba(215,177,107,.17)] text-[#fff4dc] shadow-[0_18px_50px_rgba(215,177,107,.12),inset_0_1px_0_rgba(255,255,255,.08)]"
                : "border-transparent text-[#d6cbbb]/75 hover:border-[#d7b16b]/14 hover:bg-white/[0.045] hover:text-[#fff7e7]"
            }`}
          >
            <Icon
              className={`h-[18px] w-[18px] shrink-0 transition duration-300 ${
                active ? "text-[#f3ca7a]" : "text-[#d6cbbb]/78 group-hover:text-[#f1d18d]"
              }`}
              strokeWidth={1.55}
            />
            <span className="md:hidden lg:inline">{label}</span>
          </a>
        ))}
      </nav>

      <div className="mt-auto hidden md:block">
        <div className="h-px bg-gradient-to-r from-transparent via-[#d7b16b]/28 to-transparent" />
        <div className="mt-6 flex items-center gap-3 md:justify-center lg:justify-start">
          <div className="relative h-11 w-11 overflow-hidden rounded-full border border-[#d7b16b]/35">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=180&q=80"
              alt="Olivia Bennett"
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 md:hidden lg:block">
            <p className="truncate font-sans text-[0.83rem] text-[#fff8ea]">Olivia Bennett</p>
            <p className="font-sans text-[0.68rem] uppercase tracking-[0.12em] text-[#c6b58f]/62">
              Curator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TripCard({ trip, index }: { trip: Trip; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative grid overflow-hidden rounded-[28px] border border-[#ead7a7]/10 bg-[#08100f]/72 shadow-[0_32px_120px_rgba(0,0,0,.42)] backdrop-blur-xl md:grid-cols-[minmax(250px,.68fr)_minmax(0,1fr)]"
    >
      <div className="relative min-h-[270px] overflow-hidden md:min-h-[292px]">
        <Image
          src={trip.image}
          alt={`${trip.title} cinematic travel scene`}
          fill
          sizes="(min-width: 1280px) 410px, (min-width: 768px) 42vw, 100vw"
          className={`object-cover transition duration-[1400ms] ease-out group-hover:scale-110 ${trip.imagePosition ?? ""}`}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.04),rgba(0,0,0,.56)),linear-gradient(180deg,transparent_44%,rgba(0,0,0,.52))]" />
      </div>
      <div className="relative flex min-h-[292px] flex-col justify-center px-6 py-8 sm:px-9 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(215,177,107,.11),transparent_19rem),linear-gradient(120deg,rgba(255,255,255,.045),transparent_42%)]" />
        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <h2 className="text-[clamp(1.85rem,4vw,3.15rem)] leading-[1.02] text-[#fff7e7]">
              {trip.title}
            </h2>
            <span
              className={`rounded-full border px-4 py-2 font-sans text-[0.74rem] font-medium ${statusStyles[trip.status]}`}
            >
              {trip.status}
            </span>
          </div>

          <div className="mt-7 grid gap-3 font-sans text-[0.92rem] leading-6 text-[#e7d9c2]/78">
            <p>{trip.dates}</p>
            <p>{trip.cities}</p>
          </div>
          <p className="mt-7 max-w-2xl font-sans text-[1rem] leading-8 text-[#f1e6d3]/78">
            {trip.description}
          </p>
        </div>
        <ChevronRight className="absolute bottom-7 right-7 h-5 w-5 text-[#efd28f]/72 transition duration-300 group-hover:translate-x-1 group-hover:text-[#ffe3a3]" />
      </div>
    </motion.article>
  );
}

export function MyTripsPage() {
  const [activeTab, setActiveTab] = useState<TripTab>("Upcoming");
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleTrips = trips.filter((trip) => trip.tab === activeTab);

  return (
    <main className="relative min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#030504] font-sans text-[#f8edd7]">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_82%_8%,rgba(215,177,107,.18),transparent_31rem),radial-gradient(circle_at_14%_42%,rgba(71,99,83,.16),transparent_31rem),linear-gradient(145deg,#020303,#07100f_45%,#030504)]" />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.22, 0.36, 0.22], scale: [1, 1.06, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="fixed right-[-12rem] top-[-12rem] -z-10 h-[32rem] w-[32rem] rounded-full bg-[#d7b16b]/10 blur-3xl"
      />

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[86px] border-r border-[#d7b16b]/12 bg-[#020504]/86 shadow-[24px_0_80px_rgba(0,0,0,.42)] backdrop-blur-2xl md:block lg:w-[252px]">
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#d7b16b]/36 to-transparent" />
        <SidebarContent />
      </aside>

      <button
        type="button"
        aria-label="Open navigation"
        onClick={() => setMenuOpen(true)}
        className="fixed left-4 top-4 z-40 grid h-12 w-12 place-items-center rounded-full border border-[#d7b16b]/18 bg-black/42 text-[#fff1d6] shadow-[0_18px_50px_rgba(0,0,0,.36)] backdrop-blur-xl transition hover:border-[#d7b16b]/45 md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/68 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-[min(86vw,330px)] border-r border-[#d7b16b]/16 bg-[#020504]/96 shadow-[30px_0_90px_rgba(0,0,0,.58)] backdrop-blur-2xl md:hidden"
            >
              <SidebarContent onClose={() => setMenuOpen(false)} />
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      <section className="relative min-h-screen max-w-full overflow-hidden md:ml-[86px] md:max-w-[calc(100vw-86px)] lg:ml-[252px] lg:max-w-[calc(100vw-252px)]">
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="relative min-h-[78vh] overflow-hidden"
        >
          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.045, 1], x: [0, -12, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1633321088355-d0f81134ca3b?auto=format&fit=crop&w=2400&q=88"
              alt="Amalfi Coast sunset over the sea"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,5,4,.94)_0%,rgba(3,5,4,.66)_34%,rgba(3,5,4,.2)_66%,rgba(3,5,4,.72)_100%),linear-gradient(180deg,rgba(3,5,4,.18)_0%,rgba(3,5,4,.15)_55%,#030504_100%)]" />
          <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,.78)]" />

          <div className="relative z-10 flex min-h-[78vh] items-center px-6 pb-24 pt-28 sm:px-10 md:px-12 lg:px-16 xl:px-20">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl rounded-[28px] border border-[#f1d9a2]/10 bg-black/18 p-6 shadow-[0_30px_120px_rgba(0,0,0,.36)] backdrop-blur-md sm:p-8 lg:p-10"
            >
              <p className="mb-5 font-sans text-[0.72rem] font-medium uppercase tracking-[0.28em] text-[#e5bf74]/86">
                Cinematic Travel Journal
              </p>
              <h1 className="text-[clamp(4rem,10vw,9.8rem)] leading-[0.86] text-[#fff8ed] drop-shadow-[0_18px_54px_rgba(0,0,0,.62)]">
                My Trips
              </h1>
              <p className="mt-7 max-w-2xl font-sans text-[clamp(1rem,2.2vw,1.45rem)] leading-8 text-[#f2e4cd]/84">
                Your journeys, beautifully remembered.
              </p>
              <motion.button
                type="button"
                whileHover={{ y: -3, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                className="mt-10 inline-flex h-14 items-center gap-3 rounded-[16px] border border-[#f0d391]/28 bg-[rgba(198,154,82,.92)] px-7 font-sans text-[0.94rem] font-medium text-[#150f08] shadow-[0_20px_70px_rgba(198,154,82,.3)] transition hover:bg-[#e3bd76]"
              >
                <Plus className="h-5 w-5" strokeWidth={1.7} />
                New Trip
              </motion.button>
            </motion.div>
          </div>
        </motion.header>

        <div className="relative px-5 pb-16 sm:px-8 md:px-10 lg:px-14 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto -mt-16 max-w-[1180px]"
          >
            <div className="flex gap-10 border-b border-[#d7b16b]/13">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-5 font-sans text-[0.95rem] transition duration-300 ${
                    activeTab === tab ? "text-[#fff4df]" : "text-[#cfc2ac]/62 hover:text-[#f4dfb8]"
                  }`}
                >
                  {tab}
                  {activeTab === tab ? (
                    <motion.span
                      layoutId="trip-tab-underline"
                      className="absolute inset-x-0 bottom-[-1px] h-px bg-[#e6bd73] shadow-[0_0_18px_rgba(230,189,115,.78)]"
                    />
                  ) : null}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35 }}
                className="mt-8 space-y-7 lg:mt-10 lg:space-y-8"
              >
                {visibleTrips.map((trip, index) => (
                  <TripCard key={trip.title} trip={trip} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>

            <motion.section
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-14 overflow-hidden rounded-[30px] border border-[#d7b16b]/14 bg-[#0a0d0b] shadow-[0_36px_130px_rgba(0,0,0,.46)]"
            >
              <Image
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1800&q=88"
                alt="Cinematic camera in warm travel light"
                fill
                sizes="(min-width: 1024px) 1180px, 100vw"
                className="object-cover opacity-52"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,5,.94),rgba(5,6,5,.64)_48%,rgba(5,6,5,.32)),radial-gradient(circle_at_82%_26%,rgba(232,190,109,.28),transparent_22rem)]" />
              <div className="relative grid min-h-[330px] items-center gap-8 px-7 py-10 sm:px-10 lg:grid-cols-[1fr_auto] lg:px-14">
                <div>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#d7b16b]/20 bg-[#d7b16b]/10">
                    <Compass className="h-5 w-5 text-[#f1cf88]" strokeWidth={1.45} />
                  </div>
                  <h2 className="max-w-2xl text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] text-[#fff8ed]">
                    Ready for your next adventure?
                  </h2>
                  <p className="mt-6 max-w-xl font-sans text-[1rem] leading-8 text-[#eaddc6]/78">
                    Start planning your next journey and create memories that last a lifetime.
                  </p>
                </div>
                <motion.button
                  type="button"
                  whileHover={{ y: -3, scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex h-14 w-max items-center gap-3 rounded-[16px] border border-[#f0d391]/25 bg-[rgba(214,167,96,.92)] px-7 font-sans text-[0.94rem] font-medium text-[#140f08] shadow-[0_22px_70px_rgba(214,167,96,.28)] transition hover:bg-[#e7c27e]"
                >
                  <Plus className="h-5 w-5" strokeWidth={1.7} />
                  New Trip
                </motion.button>
              </div>
            </motion.section>

            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="mx-auto mt-16 max-w-3xl text-center font-display text-[clamp(1.8rem,4vw,3.8rem)] italic leading-tight text-[#ead6ad]/72"
            >
              <Feather className="mx-auto mb-7 h-6 w-6 text-[#d7b16b]/70" strokeWidth={1.35} />
              Every journey returns first as light, then as memory.
            </motion.blockquote>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
