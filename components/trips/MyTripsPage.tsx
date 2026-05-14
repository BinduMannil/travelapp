"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type TripStatus = "Active" | "Upcoming" | "Draft" | "Completed";
type View = "Overview" | TripStatus | "Memories";
type Filter = "All" | "Solo" | "Couple" | "Family" | "Friends";

type Trip = {
  id: string;
  title: string;
  status: TripStatus;
  dates: string;
  route: string;
  travelers: Filter;
  mood: string;
  progress: number;
  image: string;
};

const trips: Trip[] = [
  {
    id: "amalfi-active",
    title: "Amalfi Afterlight",
    status: "Active",
    dates: "May 12 - May 19, 2026",
    route: "Naples, Ravello, Positano",
    travelers: "Couple",
    mood: "Lemon groves, cliff dinners, sea-level mornings",
    progress: 68,
    image:
      "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1500&q=88",
  },
  {
    id: "iceland-upcoming",
    title: "Northern Roads",
    status: "Upcoming",
    dates: "Jun 4 - Jun 13, 2026",
    route: "Reykjavik, Vik, Hofn",
    travelers: "Friends",
    mood: "Black sand, glacier light, long-table cabins",
    progress: 42,
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1500&q=88",
  },
  {
    id: "kyoto-draft",
    title: "Kyoto in Quiet Rain",
    status: "Draft",
    dates: "Flexible autumn window",
    route: "Gion, Arashiyama, Kurama",
    travelers: "Solo",
    mood: "Tea houses, cedar paths, lantern-lit alleys",
    progress: 24,
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1500&q=88",
  },
  {
    id: "morocco-completed",
    title: "Morocco After Dark",
    status: "Completed",
    dates: "Nov 2 - Nov 11, 2025",
    route: "Marrakech, Fes, Sahara",
    travelers: "Family",
    mood: "Riad courtyards, desert silence, brass and spice",
    progress: 100,
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1500&q=88",
  },
  {
    id: "bali-upcoming",
    title: "Bali Slow Water",
    status: "Upcoming",
    dates: "Aug 18 - Aug 28, 2026",
    route: "Ubud, Sidemen, Uluwatu",
    travelers: "Couple",
    mood: "Wellness rituals, private villas, firelit coast",
    progress: 55,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1500&q=88",
  },
  {
    id: "paris-completed",
    title: "Paris Blue Hour",
    status: "Completed",
    dates: "Mar 6 - Mar 12, 2026",
    route: "Saint-Germain, Marais, Montmartre",
    travelers: "Solo",
    mood: "Bookshops, velvet bars, museum mornings",
    progress: 100,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1500&q=88",
  },
];

const memories = [
  {
    title: "Dinner above Positano",
    trip: "Amalfi Afterlight",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=86",
  },
  {
    title: "Dawn in the Sahara",
    trip: "Morocco After Dark",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=900&q=86",
  },
  {
    title: "Rain on temple stone",
    trip: "Kyoto in Quiet Rain",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=86",
  },
];

const collaborators = [
  ["Mina", "Itinerary notes", "Active now"],
  ["Theo", "Restaurant shortlist", "Reviewed today"],
  ["Leila", "Hotel options", "2 comments"],
  ["Arun", "Shared expenses", "Pending review"],
];

const journalEntries = [
  ["A first night by the water", "Amalfi Afterlight", "Draft"],
  ["What the desert sounded like", "Morocco After Dark", "Published"],
  ["A list of quiet Kyoto doors", "Kyoto in Quiet Rain", "Draft"],
];

const savedPlaces = [
  ["Le Sirenuse terrace", "Positano", "Dinner"],
  ["Camellia tea house", "Kyoto", "Culture"],
  ["Dar Yacout", "Marrakech", "Food"],
  ["Blue Lagoon Retreat", "Iceland", "Wellness"],
];

const views: View[] = ["Overview", "Active", "Upcoming", "Draft", "Completed", "Memories"];
const filters: Filter[] = ["All", "Solo", "Couple", "Family", "Friends"];

const statusCopy: Record<TripStatus, string> = {
  Active: "Trips unfolding now, with live plans and open tasks.",
  Upcoming: "Confirmed journeys that need final polish.",
  Draft: "Saved journey concepts waiting to be refined.",
  Completed: "Finished trips, ready for memories and journals.",
};

const statusTone: Record<TripStatus, string> = {
  Active: "border-emerald-200/18 bg-emerald-200/10 text-emerald-100",
  Upcoming: "border-[#e8c77b]/22 bg-[#e8c77b]/13 text-[#f8df9c]",
  Draft: "border-sky-200/18 bg-sky-200/10 text-sky-100",
  Completed: "border-rose-200/18 bg-rose-200/10 text-rose-100",
};

export function MyTripsPage() {
  const [activeView, setActiveView] = useState<View>("Overview");
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [selectedTripId, setSelectedTripId] = useState(trips[0].id);

  const visibleTrips = useMemo(() => {
    return trips.filter((trip) => {
      const viewMatches = activeView === "Overview" || activeView === "Memories" || trip.status === activeView;
      const filterMatches = activeFilter === "All" || trip.travelers === activeFilter;
      return viewMatches && filterMatches;
    });
  }, [activeFilter, activeView]);

  const selectedTrip = trips.find((trip) => trip.id === selectedTripId) ?? trips[0];

  return (
    <main className="journee-page-frame min-h-screen bg-[#030504] text-white">
      <section className="relative isolate overflow-hidden px-4 pb-16 pt-10 sm:px-6 lg:px-10">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_10%,rgba(232,199,123,.17),transparent_28rem),radial-gradient(circle_at_12%_36%,rgba(91,124,105,.17),transparent_30rem),linear-gradient(145deg,#020303,#07100f_52%,#030504)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] overflow-hidden opacity-60">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=88"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,5,4,.94),rgba(3,5,4,.64)_48%,rgba(3,5,4,.88)),linear-gradient(180deg,rgba(3,5,4,.18),#030504_92%)]" />
        </div>

        <div className="mx-auto max-w-7xl">
          <header className="grid min-h-[32rem] items-end gap-8 pb-8 pt-20 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[.32em] text-[#e8c77b]">
                Journee / Trips Dashboard
              </p>
              <h1 className="max-w-4xl text-[clamp(3.5rem,8vw,8.5rem)] leading-[.86] text-white">
                Manage the journeys already in motion.
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-white/74 sm:text-lg">
                Active plans, saved drafts, completed trips, collaborators, memories, journal links, and places worth returning to.
              </p>
            </div>
            <Link
              href="/journey-builder"
              className="group inline-flex w-max items-center justify-center overflow-hidden rounded-2xl bg-[#e8c77b] px-6 py-4 text-sm font-extrabold uppercase tracking-[.22em] text-[#130f0a] shadow-[0_24px_70px_rgba(232,199,123,.3)] transition duration-300 hover:-translate-y-1 hover:bg-white"
            >
              <span className="relative">Plan a new journey</span>
            </Link>
          </header>

          <section className="grid gap-4 md:grid-cols-4">
            {(["Active", "Upcoming", "Draft", "Completed"] as TripStatus[]).map((status) => {
              const count = trips.filter((trip) => trip.status === status).length;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setActiveView(status)}
                  className={[
                    "min-h-40 rounded-[1.4rem] border p-5 text-left transition duration-300 hover:-translate-y-1",
                    activeView === status
                      ? "border-[#e8c77b] bg-[#e8c77b]/16 shadow-[0_24px_70px_rgba(232,199,123,.16)]"
                      : "border-white/12 bg-white/[.055] hover:border-[#e8c77b]/55 hover:bg-white/[.085]",
                  ].join(" ")}
                >
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusTone[status]}`}>
                    {count} {count === 1 ? "trip" : "trips"}
                  </span>
                  <h2 className="mt-5 text-3xl text-white">{status}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/58">{statusCopy[status]}</p>
                </button>
              );
            })}
          </section>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#e8c77b]">Trip command room</p>
              <h2 className="mt-3 text-5xl text-white">Your saved travel world.</h2>
            </div>
            <div className="flex max-w-full gap-2 overflow-x-auto rounded-full border border-white/10 bg-white/[.045] p-2">
              {views.map((view) => (
                <button
                  key={view}
                  type="button"
                  onClick={() => setActiveView(view)}
                  className={[
                    "whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition duration-300",
                    activeView === view ? "bg-[#e8c77b] text-[#130f0a]" : "text-white/68 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                >
                  {view === "Draft" ? "Saved Draft Journeys" : view}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-7 flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={[
                  "rounded-full border px-4 py-2 text-sm font-semibold transition duration-300",
                  activeFilter === filter
                    ? "border-[#e8c77b] bg-[#e8c77b] text-[#130f0a]"
                    : "border-white/12 bg-white/[.045] text-white/68 hover:border-[#e8c77b]/60 hover:text-white",
                ].join(" ")}
              >
                {filter}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeView}-${activeFilter}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35 }}
              className="grid gap-6 xl:grid-cols-[1.18fr_.82fr]"
            >
              <div className="space-y-5">
                {(activeView === "Memories" ? trips.filter((trip) => trip.status === "Completed") : visibleTrips).map((trip, index) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    index={index}
                    active={selectedTrip.id === trip.id}
                    onSelect={() => setSelectedTripId(trip.id)}
                  />
                ))}
              </div>

              <aside className="space-y-5 xl:sticky xl:top-6 xl:self-start">
                <SelectedTripPanel trip={selectedTrip} />
                <CollaboratorsPanel />
              </aside>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[.95fr_1.05fr]">
          <MemoriesPanel />
          <div className="grid gap-6">
            <JournalPanel />
            <SavedPlacesPanel />
          </div>
        </div>
      </section>
    </main>
  );
}

function TripCard({
  trip,
  index,
  active,
  onSelect,
}: {
  trip: Trip;
  index: number;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className={[
        "group overflow-hidden rounded-[1.75rem] border bg-white/[.05] shadow-[0_28px_90px_rgba(0,0,0,.32)] transition duration-300",
        active ? "border-[#e8c77b]/70" : "border-white/12 hover:border-[#e8c77b]/45",
      ].join(" ")}
    >
      <button type="button" onClick={onSelect} className="grid w-full text-left md:grid-cols-[minmax(250px,.58fr)_1fr]">
        <div className="relative min-h-72 overflow-hidden">
          <Image
            src={trip.image}
            alt=""
            fill
            sizes="(min-width: 1280px) 430px, (min-width: 768px) 44vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-transparent" />
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusTone[trip.status]}`}>
              {trip.status}
            </span>
            <span className="text-sm font-semibold text-[#e8c77b]">{trip.progress}% complete</span>
          </div>
          <h3 className="mt-5 text-4xl text-white">{trip.title}</h3>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[.18em] text-white/45">{trip.dates}</p>
          <p className="mt-3 text-base text-white/72">{trip.route}</p>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/58">{trip.mood}</p>
          <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-[#e8c77b]" style={{ width: `${trip.progress}%` }} />
          </div>
        </div>
      </button>
    </motion.article>
  );
}

function SelectedTripPanel({ trip }: { trip: Trip }) {
  const [openPanel, setOpenPanel] = useState<"Status" | "Places" | "Journal">("Status");

  return (
    <section className="rounded-[1.5rem] border border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,.08),rgba(255,255,255,.035))] p-6 backdrop-blur-xl">
      <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#e8c77b]">Selected trip</p>
      <h2 className="mt-3 text-4xl text-white">{trip.title}</h2>
      <div className="mt-5 flex gap-2 rounded-full border border-white/10 bg-black/18 p-1">
        {(["Status", "Places", "Journal"] as const).map((panel) => (
          <button
            key={panel}
            type="button"
            onClick={() => setOpenPanel(panel)}
            className={[
              "flex-1 rounded-full px-3 py-2 text-xs font-semibold transition",
              openPanel === panel ? "bg-[#e8c77b] text-[#130f0a]" : "text-white/58 hover:bg-white/10 hover:text-white",
            ].join(" ")}
          >
            {panel}
          </button>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-white/10 bg-black/22 p-5">
        {openPanel === "Status" ? (
          <>
            <p className="text-sm text-white/62">Trip status</p>
            <p className="mt-2 text-2xl text-white">{trip.status}</p>
            <p className="mt-4 text-sm leading-7 text-white/55">{statusCopy[trip.status]}</p>
          </>
        ) : null}
        {openPanel === "Places" ? (
          <>
            <p className="text-sm text-white/62">Saved places</p>
            <p className="mt-2 text-2xl text-white">4 linked places</p>
            <p className="mt-4 text-sm leading-7 text-white/55">Restaurants, stays, viewpoints, and experiences attached to this trip.</p>
          </>
        ) : null}
        {openPanel === "Journal" ? (
          <>
            <p className="text-sm text-white/62">Linked journal</p>
            <p className="mt-2 text-2xl text-white">2 entries</p>
            <p className="mt-4 text-sm leading-7 text-white/55">Notes and reflections connected to this journey.</p>
          </>
        ) : null}
      </div>
    </section>
  );
}

function CollaboratorsPanel() {
  const [selected, setSelected] = useState(collaborators[0][0]);

  return (
    <section className="rounded-[1.5rem] border border-white/12 bg-white/[.045] p-6">
      <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#e8c77b]">Collaborators</p>
      <div className="mt-5 space-y-3">
        {collaborators.map(([name, role, state]) => (
          <button
            key={name}
            type="button"
            onClick={() => setSelected(name)}
            className={[
              "flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition",
              selected === name ? "border-[#e8c77b] bg-[#e8c77b]/12" : "border-white/10 bg-black/12 hover:border-white/25",
            ].join(" ")}
          >
            <span>
              <span className="block font-semibold text-white">{name}</span>
              <span className="block text-sm text-white/54">{role}</span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-[.14em] text-[#e8c77b]">{state}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function MemoriesPanel() {
  const [selected, setSelected] = useState(memories[0].title);

  return (
    <section className="rounded-[1.75rem] border border-white/12 bg-white/[.045] p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#e8c77b]">Trip memories</p>
      <h2 className="mt-3 text-4xl text-white">Moments worth keeping.</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
        {memories.map((memory) => (
          <button
            key={memory.title}
            type="button"
            onClick={() => setSelected(memory.title)}
            className={[
              "group overflow-hidden rounded-[1.25rem] border text-left transition duration-300 hover:-translate-y-1",
              selected === memory.title ? "border-[#e8c77b]" : "border-white/10 hover:border-[#e8c77b]/45",
            ].join(" ")}
          >
            <div className="relative h-44">
              <Image src={memory.image} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/78 to-transparent" />
            </div>
            <div className="p-4">
              <h3 className="text-2xl text-white">{memory.title}</h3>
              <p className="mt-2 text-sm text-white/55">{memory.trip}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function JournalPanel() {
  const [selected, setSelected] = useState(journalEntries[0][0]);

  return (
    <section className="rounded-[1.5rem] border border-white/12 bg-white/[.045] p-6">
      <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#e8c77b]">Linked journal entries</p>
      <div className="mt-5 grid gap-3">
        {journalEntries.map(([title, trip, state]) => (
          <button
            key={title}
            type="button"
            onClick={() => setSelected(title)}
            className={[
              "rounded-2xl border p-4 text-left transition",
              selected === title ? "border-[#e8c77b] bg-[#e8c77b]/12" : "border-white/10 bg-black/12 hover:border-white/25",
            ].join(" ")}
          >
            <span className="block font-semibold text-white">{title}</span>
            <span className="mt-1 block text-sm text-white/55">
              {trip} / {state}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function SavedPlacesPanel() {
  const [selected, setSelected] = useState(savedPlaces[0][0]);

  return (
    <section className="rounded-[1.5rem] border border-white/12 bg-white/[.045] p-6">
      <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#e8c77b]">Saved places</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {savedPlaces.map(([place, city, type]) => (
          <button
            key={place}
            type="button"
            onClick={() => setSelected(place)}
            className={[
              "rounded-2xl border p-4 text-left transition",
              selected === place ? "border-[#e8c77b] bg-[#e8c77b]/12" : "border-white/10 bg-black/12 hover:border-white/25",
            ].join(" ")}
          >
            <span className="block font-semibold text-white">{place}</span>
            <span className="mt-1 block text-sm text-white/55">
              {city} / {type}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
