"use client";

import Image from "next/image";
import { useState } from "react";
import {
  BarChart3,
  BookOpen,
  Bookmark,
  CalendarDays,
  ChevronDown,
  FileText,
  GalleryHorizontal,
  Image as ImageIcon,
  Map,
  MapPin,
  Menu,
  MoreVertical,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  SquarePen,
} from "lucide-react";

type JournalEntry = {
  title: string;
  dateMonth: string;
  dateDay: string;
  dateYear: string;
  location: string;
  excerpt: string;
  mood: string;
  photos: number;
  image: string;
};

const journalMenu = [
  { label: "All Entries", href: "/journal/all-entries", icon: BookOpen, active: true },
  { label: "My Trips", href: "/trips", icon: SquarePen },
  { label: "Daily Notes", href: "/journal/daily-notes", icon: CalendarDays },
  { label: "Photos & Albums", href: "/journal/photos", icon: GalleryHorizontal },
  { label: "Saved Moments", href: "/profile", icon: Bookmark },
  { label: "Reflections", href: "/journal/reflections", icon: Sparkles },
  { label: "Mood Tracker", href: "/journal/mood", icon: BarChart3 },
  { label: "Drafts", href: "/journal/drafts", icon: FileText },
];

const categoryTabs = ["All", "Trips", "Notes", "Places", "Photos", "Reflections"];

const entries: JournalEntry[] = [
  {
    title: "Sunrise in the Dolomites",
    dateMonth: "May",
    dateDay: "18",
    dateYear: "2024",
    location: "Dolomites, Italy",
    excerpt: "Woke up before dawn to the incredible view. The mountains never fail to leave me speechless.",
    mood: "Travel",
    photos: 5,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1500&q=88",
  },
  {
    title: "Exploring Amalfi Coast",
    dateMonth: "May",
    dateDay: "16",
    dateYear: "2024",
    location: "Amalfi, Italy",
    excerpt: "Lost in the beauty of colorful villages and endless blue waters.",
    mood: "Trip",
    photos: 12,
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1500&q=88",
  },
  {
    title: "Lost in the streets of Kyoto",
    dateMonth: "May",
    dateDay: "12",
    dateYear: "2024",
    location: "Kyoto, Japan",
    excerpt: "Lanterns, antiques and timeless traditions.",
    mood: "Thoughtful",
    photos: 10,
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1500&q=88",
  },
  {
    title: "Safari dreams come true",
    dateMonth: "May",
    dateDay: "09",
    dateYear: "2024",
    location: "Maasai Mara, Kenya",
    excerpt: "The wild has a way of making you feel alive.",
    mood: "Amazed",
    photos: 8,
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1500&q=88",
  },
  {
    title: "Northern lights over Lofoten",
    dateMonth: "May",
    dateDay: "05",
    dateYear: "2024",
    location: "Lofoten Islands, Norway",
    excerpt: "Nature's greatest show on earth. I'll never forget this moment.",
    mood: "Inspired",
    photos: 14,
    image:
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=1500&q=88",
  },
];

const filterGroups = [
  { label: "Date", value: "All Time" },
  { label: "Type", value: "All Types" },
  { label: "Mood", value: "All Moods" },
  { label: "Location", value: "All Locations" },
];

const journeyStats = [
  { label: "Entries", value: "128", icon: BookOpen },
  { label: "Places", value: "34", icon: MapPin },
  { label: "Countries", value: "18", icon: Map },
  { label: "Photos", value: "342", icon: ImageIcon },
  { label: "Days Traveled", value: "76", icon: CalendarDays },
];

async function rewriteJournalEntry(rawJournalText: string) {
  const cleanedText = rawJournalText
    .trim()
    .replace(/\s+/g, " ")
    .replace(/^[\s*•-]+/gm, "");

  if (!cleanedText) {
    return "";
  }

  await new Promise((resolve) => setTimeout(resolve, 420));

  const ending = /[.!?]$/.test(cleanedText) ? "" : ".";
  const closingLine =
    cleanedText.length > 140
      ? "I want to keep it exactly as it felt: unhurried, vivid, and quietly mine."
      : "It was a small moment, but it stayed with me in a way I do not want to lose.";

  return `Today, I want to remember this with more care: ${cleanedText}${ending} ${closingLine}`;
}

function ActionButton({
  children,
  className = "",
  ariaLabel,
  type = "button",
  ...buttonProps
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      aria-label={ariaLabel}
      type={type}
      className={`transition duration-200 hover:border-[#e8b45a]/60 hover:bg-[#e8b45a]/14 hover:text-[#ffd987] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b45a] active:scale-[0.98] ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

function JournalPromptCard() {
  const [isWriting, setIsWriting] = useState(false);
  const [rawJournalText, setRawJournalText] = useState("");
  const [rewrittenJournalText, setRewrittenJournalText] = useState("");
  const [isRewriting, setIsRewriting] = useState(false);
  const [selectedFinalEntry, setSelectedFinalEntry] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  const hasRawText = rawJournalText.trim().length > 0;
  const hasFinalEntry = selectedFinalEntry.trim().length > 0;
  const canSave = hasRawText || hasFinalEntry;

  async function handleRewrite() {
    if (!hasRawText || isRewriting) {
      return;
    }

    setSaveMessage("");
    setIsRewriting(true);
    const polishedEntry = await rewriteJournalEntry(rawJournalText);
    setRewrittenJournalText(polishedEntry);
    setSelectedFinalEntry("");
    setIsRewriting(false);
  }

  function handleUseVersion() {
    setSelectedFinalEntry(rewrittenJournalText);
    setSaveMessage("Polished version selected.");
  }

  function handleSaveEntry() {
    const entryToSave = selectedFinalEntry || rawJournalText.trim();

    if (!entryToSave) {
      return;
    }

    setSelectedFinalEntry(entryToSave);
    setSaveMessage("Entry saved to your journal draft.");
  }

  return (
    <section className="rounded-lg border border-white/10 bg-[#071012]/78 p-5 shadow-[0_22px_70px_rgba(0,0,0,.28)]">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#f1c36f]">Journal Prompt</p>
      <p className="mt-4 text-[0.96rem] leading-7 text-white/86">
        What is a moment from today that you never want to forget?
      </p>

      {!isWriting ? (
        <ActionButton
          className="mt-5 rounded-md border border-[#d9a756] bg-[#d9a756] px-5 py-3 text-[0.84rem] font-semibold text-[#111] hover:bg-[#efbf65] hover:text-[#111]"
          ariaLabel="Open journal writing area"
          onClick={() => setIsWriting(true)}
        >
          Write Now
        </ActionButton>
      ) : (
        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="sr-only">Journal notes</span>
            <textarea
              value={rawJournalText}
              onChange={(event) => {
                setRawJournalText(event.target.value);
                setRewrittenJournalText("");
                setSelectedFinalEntry("");
                setSaveMessage("");
              }}
              placeholder="Write your thoughts in any style. Messy notes are welcome."
              className="min-h-44 w-full resize-y rounded-md border border-white/12 bg-[rgba(0,0,0,0.24)] px-4 py-4 text-[0.92rem] leading-7 text-white/90 outline-none shadow-inner shadow-white/5 transition placeholder:text-white/48 focus:border-[#d9a756]/68 focus:bg-[rgba(0,0,0,0.32)]"
            />
          </label>

          <p className="text-[0.76rem] leading-5 text-white/62">
            Your words stay yours. AI only helps polish the wording.
          </p>

          <div className="grid gap-3">
            <ActionButton
              ariaLabel="Rewrite journal notes with AI"
              className="min-h-11 w-full rounded-md border border-[#d9a756]/36 bg-[#d9a756]/12 px-4 py-3 text-[0.8rem] font-semibold text-[#f4c66f] disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.035] disabled:text-white/36"
              disabled={!hasRawText || isRewriting}
              onClick={handleRewrite}
            >
              {isRewriting ? "Rewriting..." : "Rewrite with AI"}
            </ActionButton>
            <ActionButton
              ariaLabel="Save journal entry"
              className="min-h-11 w-full rounded-md border border-white/12 bg-white/[0.045] px-4 py-3 text-[0.8rem] font-semibold text-white/86 disabled:cursor-not-allowed disabled:text-white/36"
              disabled={!canSave}
              onClick={handleSaveEntry}
            >
              Save Entry
            </ActionButton>
          </div>

          {rewrittenJournalText ? (
            <div className="rounded-md border border-[#d9a756]/24 bg-[#120f08]/72 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.05)]">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#f1c36f]">Polished Preview</p>
              <p className="mt-3 text-[0.92rem] leading-7 text-white/84">{rewrittenJournalText}</p>
              <ActionButton
                ariaLabel="Use rewritten journal version"
                className="mt-4 rounded-md border border-[#d9a756]/32 bg-transparent px-4 py-2.5 text-[0.78rem] font-semibold text-[#f4c66f]"
                onClick={handleUseVersion}
              >
                Use This Version
              </ActionButton>
            </div>
          ) : null}

          {saveMessage ? (
            <p className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-[0.76rem] text-white/72">
              {saveMessage}
            </p>
          ) : null}
        </div>
      )}
    </section>
  );
}

function SelectShell({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-white/82">{label}</span>
      <span className="mt-2 flex h-11 items-center justify-between rounded-md border border-white/10 bg-black/18 px-3 text-[0.86rem] text-white/88 transition hover:border-[#d9a756]/45 hover:bg-white/[0.045]">
        {value}
        <ChevronDown className="h-4 w-4 text-white/70" />
      </span>
    </label>
  );
}

export function JourneyJournalPage() {
  return (
    <main className="min-h-screen bg-[#030709] font-sans text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_60%_0%,rgba(218,166,78,.12),transparent_32rem),linear-gradient(120deg,#030709,#071012_44%,#020405)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />

      <div className="mx-auto grid min-h-screen w-full max-w-[1720px] overflow-x-hidden lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[230px_minmax(0,1fr)_370px]">
        <aside className="min-w-0 border-b border-white/10 bg-[#050a0d]/90 lg:border-b-0 lg:border-r lg:border-white/10">
          <div className="sticky top-0 flex h-full min-w-0 flex-col p-5 max-lg:min-h-0 max-lg:gap-4 lg:min-h-screen">
            <div className="flex items-center gap-4">
              <ActionButton ariaLabel="Open navigation" className="grid h-9 w-9 place-items-center rounded-md text-[#e8b45a]">
                <Menu className="h-5 w-5" />
              </ActionButton>
              <a href="/" className="text-[1.02rem] font-semibold uppercase tracking-[0.28em] text-[#f3bc62]">
                Journee
              </a>
            </div>

            <nav className="mt-12 max-lg:mt-2">
              <p className="mb-3 text-[0.68rem] font-medium uppercase tracking-[0.08em] text-white/78">My Journal</p>
              <div className="flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0">
                {journalMenu.map(({ label, href, icon: Icon, active }) => (
                  <a
                    key={label}
                    href={href}
                    className={`flex min-w-max items-center gap-3 rounded-md border px-3 py-3 text-[0.86rem] transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b45a] active:scale-[0.99] lg:w-full ${
                      active
                        ? "border-[#d9a756]/80 bg-[#d9a756]/10 text-[#f4c66f]"
                        : "border-transparent text-white/76 hover:border-white/12 hover:bg-white/[0.045] hover:text-white"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </nav>

            <div className="mt-auto hidden border-t border-white/10 pt-5 lg:block">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-[#d9a756]/55">
                  <Image
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80"
                    alt="Alex Mercer"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[0.82rem] text-white">Alex Mercer</p>
                  <p className="text-[0.74rem] text-white/55">Explorer</p>
                </div>
                <ChevronDown className="ml-auto h-4 w-4 text-white/70" />
              </div>
            </div>
          </div>
        </aside>

        <section className="min-w-0 px-5 py-8 sm:px-8 lg:px-9 xl:py-12">
          <div className="flex flex-col gap-5 2xl:flex-row 2xl:items-start 2xl:justify-between">
            <div>
              <div role="heading" aria-level={1} className="text-[2.65rem] font-semibold leading-none text-white sm:text-[3.2rem]">
                All Entries
              </div>
              <p className="mt-2 max-w-2xl text-[0.98rem] text-white/70">
                A timeline of your thoughts, adventures and memories.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-[minmax(260px,1fr)_auto] 2xl:min-w-[540px]">
              <label className="flex h-11 items-center gap-3 rounded-md border border-white/12 bg-black/22 px-4 text-white/66 shadow-inner shadow-white/5 transition-colors focus-within:border-[#d9a756]/65">
                <Search className="h-5 w-5 text-white/88" />
                <input
                  aria-label="Search entries"
                  placeholder="Search entries, places, notes..."
                  className="min-w-0 flex-1 bg-transparent text-[0.86rem] text-white outline-none placeholder:text-white/58"
                />
              </label>
              <ActionButton className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-white/12 bg-black/22 px-5 text-[0.86rem] text-white/88">
                <SlidersHorizontal className="h-4 w-4" />
                Filter
              </ActionButton>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-3 overflow-x-auto pb-1">
              {categoryTabs.map((tab) => (
                <ActionButton
                  key={tab}
                  className={`min-w-max rounded-full px-5 py-2 text-[0.84rem] ${
                    tab === "All"
                      ? "border border-[#e6ad52] bg-[#e6ad52] text-[#111]"
                      : "border border-white/8 bg-white/[0.045] text-white/82"
                  }`}
                >
                  {tab}
                </ActionButton>
              ))}
            </div>
            <ActionButton className="inline-flex h-10 w-max items-center gap-2 rounded-md border border-white/10 bg-black/20 px-4 text-[0.82rem] text-white/86">
              Sort: Newest
              <ChevronDown className="h-4 w-4" />
            </ActionButton>
          </div>

          <div className="mt-4 grid grid-cols-[76px_minmax(0,1fr)] gap-5 max-lg:pointer-events-none sm:grid-cols-[96px_minmax(0,1fr)]">
            <div className="pointer-events-none relative">
              <div className="absolute right-0 top-0 h-full w-px bg-[#d9a756]/40" />
            </div>
            <div className="space-y-4 max-lg:pointer-events-auto">
              {entries.map((entry) => (
                <article key={entry.title} className="relative grid gap-0 md:grid-cols-[minmax(280px,0.96fr)_minmax(250px,0.94fr)]">
                  <div className="absolute -left-[101px] top-7 hidden w-24 text-right sm:block">
                    <p className="text-[0.82rem] uppercase tracking-[0.08em] text-white/78">{entry.dateMonth}</p>
                    <p className="text-[2.2rem] font-medium leading-none text-white">{entry.dateDay}</p>
                    <p className="text-[0.86rem] text-white/82">{entry.dateYear}</p>
                  </div>
                  <span className="absolute -left-[26px] top-8 h-2.5 w-2.5 rounded-full bg-[#d9a756] shadow-[0_0_0_5px_rgba(217,167,86,.13)]" />
                  <div className="relative h-[230px] overflow-hidden rounded-t-lg border border-white/10 md:h-[190px] md:rounded-l-lg md:rounded-r-none">
                    <Image src={entry.image} alt={entry.title} fill sizes="(min-width: 1280px) 520px, 100vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-md bg-black/55 px-3 py-2 text-left backdrop-blur sm:hidden">
                      <p className="text-[0.7rem] uppercase text-white/78">{entry.dateMonth}</p>
                      <p className="text-xl font-medium leading-none text-white">{entry.dateDay}</p>
                      <p className="text-[0.72rem] text-white/78">{entry.dateYear}</p>
                    </div>
                  </div>
                  <div className="flex min-h-[190px] flex-col rounded-b-lg border border-t-0 border-white/10 bg-[#071012]/82 p-5 shadow-[0_20px_80px_rgba(0,0,0,.25)] md:rounded-l-none md:rounded-r-lg md:border-l-0 md:border-t">
                    <div className="flex items-start gap-3">
                      <div className="min-w-0">
                        <div role="heading" aria-level={2} className="text-[1.34rem] font-semibold leading-tight text-white">
                          {entry.title}
                        </div>
                        <p className="mt-2 flex items-center gap-1.5 text-[0.8rem] text-white/68">
                          <MapPin className="h-3.5 w-3.5 text-white/72" />
                          {entry.location}
                        </p>
                      </div>
                      <ActionButton ariaLabel={`Save ${entry.title}`} className="ml-auto grid h-9 w-9 place-items-center rounded-md border border-transparent text-[#e8b45a]">
                        <Bookmark className="h-5 w-5" />
                      </ActionButton>
                      <ActionButton ariaLabel={`More actions for ${entry.title}`} className="grid h-9 w-9 place-items-center rounded-md border border-transparent text-white/64">
                        <MoreVertical className="h-5 w-5" />
                      </ActionButton>
                    </div>
                    <p className="mt-3 max-w-[34rem] text-[0.88rem] leading-6 text-white/70">{entry.excerpt}</p>
                    <div className="mt-auto flex items-center gap-4 pt-4">
                      <span className="rounded-md border border-[#d9a756]/34 bg-[#d9a756]/8 px-2.5 py-1 text-[0.76rem] text-[#f2c469]">
                        {entry.mood}
                      </span>
                      <span className="ml-auto flex items-center gap-1.5 text-[0.82rem] text-white/76">
                        <ImageIcon className="h-4 w-4" />
                        {entry.photos}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <aside className="relative z-10 min-w-0 space-y-5 border-t border-white/10 px-5 py-8 sm:px-8 xl:border-l xl:border-t-0 xl:border-white/10 xl:px-6 xl:py-12">
          <JournalPromptCard />

          <section className="rounded-lg border border-white/10 bg-[#071012]/78 p-5 shadow-[0_22px_70px_rgba(0,0,0,.28)]">
            <div role="heading" aria-level={2} className="text-[1.25rem] font-semibold text-white">
              Filter Entries
            </div>
            <div className="mt-5 space-y-4">
              {filterGroups.map((filter) => (
                <SelectShell key={filter.label} label={filter.label} value={filter.value} />
              ))}
              <ActionButton className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-[#d9a756]/18 bg-[#d9a756]/5 text-[0.8rem] font-medium text-[#f1bd63]">
                <RotateCcw className="h-4 w-4" />
                Reset Filters
              </ActionButton>
            </div>
          </section>

          <section className="rounded-lg border border-white/10 bg-[#071012]/78 p-5 shadow-[0_22px_70px_rgba(0,0,0,.28)]">
            <div role="heading" aria-level={2} className="text-[1.25rem] font-semibold text-white">
              Your Journey
            </div>
            <div className="mt-5 space-y-3">
              {journeyStats.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3 text-[0.88rem] text-white/76">
                  <Icon className="h-[18px] w-[18px] text-[#e8b45a]" />
                  <span>{label}</span>
                  <span className="ml-auto text-white">{value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="relative min-h-[360px] overflow-hidden rounded-lg border border-[#d9a756]/16 shadow-[0_22px_70px_rgba(0,0,0,.28)]">
            <Image
              src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=88"
              alt="Traveler overlooking a cinematic mountain valley"
              fill
              sizes="360px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,11,5,.28),rgba(22,11,5,.52)),linear-gradient(90deg,rgba(0,0,0,.58),transparent)]" />
            <div className="relative flex min-h-[360px] flex-col justify-center p-7">
              <blockquote className="max-w-[15rem] text-[1.32rem] font-medium italic leading-8 text-white">
                The world is a book and those who do not travel read only one page.
              </blockquote>
              <p className="mt-5 text-[0.82rem] font-medium text-white/82">- St. Augustine</p>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
