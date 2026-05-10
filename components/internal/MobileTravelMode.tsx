"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  BadgeDollarSign,
  BookOpenText,
  Bus,
  Check,
  CircleDollarSign,
  ClipboardList,
  FilePenLine,
  Languages,
  Map,
  MapPin,
  Plane,
  Plus,
  Shield,
  ShieldAlert,
  Smartphone,
  Star,
  ThumbsDown,
  ThumbsUp,
  TramFront,
  WifiOff,
} from "lucide-react";

type City = {
  slug: string;
  name: string;
  summary: string;
};

type LocalApp = {
  slug: string;
  name: string;
  category: string;
  purpose: string;
  traveler_notes: string;
  setup_before_arrival: boolean;
  offline_useful: boolean;
  web_url?: string | null;
};

type Phrase = {
  phrase_key: string;
  category: string;
  source_text: string;
  translated_text: string;
  transliteration: string;
  usage_notes: string;
};

type PriceBenchmark = {
  benchmark_key: string;
  label: string;
  amount_typical_minor: number;
};

type RiskNote = {
  note_key?: string;
  title?: string;
  risk_key?: string;
  risk_label?: string;
  traveler_summary?: string;
  practical_guidance?: string[];
  severity?: string;
  risk_level?: string;
};

type Draft = {
  id: string;
  kind: "field-note" | "review" | "quick-feedback";
  citySlug: string;
  cityName: string;
  createdAt: string;
  title: string;
  body: string;
  tags: string[];
};

type MobileTravelModeProps = {
  cities: City[];
  localApps: LocalApp[];
  phrases: Phrase[];
  priceBenchmarks: PriceBenchmark[];
  riskNotes: RiskNote[];
};

const STORAGE_KEY = "journee.internal.mobileTravelDrafts.v1";

const NOTE_CATEGORIES = [
  "General observation",
  "Payment observation",
  "Safety observation",
  "Scam warning",
  "Transport note",
  "Food / restaurant note",
  "Neighborhood reality",
  "Legal / social risk",
];

const REVIEW_TYPES = [
  "Hotel",
  "Restaurant",
  "Attraction",
  "Neighborhood",
  "Transport",
  "Airport experience",
];

const QUICK_FLAGS = [
  { label: "Worth It", icon: ThumbsUp },
  { label: "Avoid", icon: ThumbsDown },
  { label: "Tourist Trap", icon: AlertTriangle },
  { label: "Felt Safe", icon: Shield },
  { label: "Felt Unsafe", icon: ShieldAlert },
  { label: "Cash Needed", icon: CircleDollarSign },
  { label: "Card Worked", icon: BadgeDollarSign },
];

function formatVnd(amount: number) {
  if (amount >= 1000000) {
    const value = amount / 1000000;
    return `${Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1)}M VND`;
  }
  return `${Math.round(amount / 1000)}k VND`;
}

function nowLabel() {
  return new Date().toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function makeDraftId() {
  return `draft-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function FieldButton({
  href,
  icon: Icon,
  label,
  tone = "neutral",
}: {
  href: string;
  icon: typeof MapPin;
  label: string;
  tone?: "neutral" | "urgent";
}) {
  return (
    <Link
      href={href}
      className={`flex min-h-[4.75rem] items-center gap-3 border p-4 text-left transition active:scale-[0.99] ${
        tone === "urgent"
          ? "border-red-300/45 bg-red-500/14 text-red-50"
          : "border-white/12 bg-white/[0.055] text-stone-50 hover:border-amber-300/45"
      }`}
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center border border-white/12 bg-black/35">
        <Icon size={21} />
      </span>
      <span className="text-sm font-black uppercase tracking-[0.14em]">
        {label}
      </span>
    </Link>
  );
}

export function MobileTravelMode({
  cities,
  localApps,
  phrases,
  priceBenchmarks,
  riskNotes,
}: MobileTravelModeProps) {
  const [citySlug, setCitySlug] = useState("ho-chi-minh-city");
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [noteCategory, setNoteCategory] = useState(NOTE_CATEGORIES[0]);
  const [noteText, setNoteText] = useState("");
  const [reviewType, setReviewType] = useState(REVIEW_TYPES[0]);
  const [reviewPlace, setReviewPlace] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [selectedFlags, setSelectedFlags] = useState<string[]>([]);
  const [quickTarget, setQuickTarget] = useState("");

  const city = useMemo(
    () => cities.find((item) => item.slug === citySlug) ?? cities[0],
    [cities, citySlug],
  );

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setDrafts(JSON.parse(raw) as Draft[]);
    } catch {
      setDrafts([]);
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  }, [drafts, storageReady]);

  function saveDraft(draft: Omit<Draft, "id" | "createdAt" | "citySlug" | "cityName">) {
    const nextDraft: Draft = {
      ...draft,
      id: makeDraftId(),
      citySlug: city.slug,
      cityName: city.name,
      createdAt: new Date().toISOString(),
    };
    setDrafts((current) => [nextDraft, ...current].slice(0, 30));
    setSavedMessage(`Saved locally at ${nowLabel()}`);
    window.setTimeout(() => setSavedMessage(""), 2800);
  }

  function saveFieldNote() {
    const body = noteText.trim();
    if (!body) return;
    saveDraft({
      kind: "field-note",
      title: noteCategory,
      body,
      tags: [noteCategory, "private", "draft"],
    });
    setNoteText("");
  }

  function saveReview() {
    const place = reviewPlace.trim();
    const body = reviewText.trim();
    if (!place && !body) return;
    saveDraft({
      kind: "review",
      title: `${reviewType}${place ? `: ${place}` : ""}`,
      body: body || "No written note yet.",
      tags: [reviewType, "internal-review", "private"],
    });
    setReviewPlace("");
    setReviewText("");
  }

  function toggleFlag(label: string) {
    setSelectedFlags((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label],
    );
  }

  function saveQuickFeedback() {
    if (!selectedFlags.length && !quickTarget.trim()) return;
    saveDraft({
      kind: "quick-feedback",
      title: quickTarget.trim() || "Quick field feedback",
      body: selectedFlags.join(" / ") || "No flags selected.",
      tags: ["quick-feedback", ...selectedFlags],
    });
    setSelectedFlags([]);
    setQuickTarget("");
  }

  const cityDrafts = drafts.filter((draft) => draft.citySlug === city.slug);
  const importantPrices = priceBenchmarks.slice(0, 6);
  const topApps = localApps.slice(0, 8);
  const fieldPhrases = phrases.slice(0, 8);
  const displayedRisks = riskNotes.slice(0, 4);

  return (
    <main className="min-h-screen bg-[#070706] text-stone-50">
      <section className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 pb-28 pt-5">
        <div className="sticky top-0 z-20 -mx-4 border-b border-white/10 bg-[#070706]/92 px-4 pb-3 pt-3 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.64rem] font-black uppercase tracking-[0.28em] text-amber-200/70">
                Journee internal
              </p>
              <h1 className="mt-1 font-display text-2xl font-black leading-tight text-white">
                Travel Field Mode
              </h1>
            </div>
            <div className="grid h-12 w-12 place-items-center border border-amber-200/30 bg-amber-200/10 text-amber-100">
              <Map size={22} />
            </div>
          </div>

          <label className="mt-4 block text-[0.65rem] font-black uppercase tracking-[0.22em] text-stone-400">
            Current city
          </label>
          <select
            value={city.slug}
            onChange={(event) => setCitySlug(event.target.value)}
            className="mt-2 min-h-12 w-full border border-white/12 bg-black px-4 text-base font-bold text-white outline-none focus:border-amber-200"
          >
            {cities.map((item) => (
              <option key={item.slug} value={item.slug}>
                Vietnam / {item.name}
              </option>
            ))}
          </select>
        </div>

        <section className="pt-7">
          <div className="border border-white/12 bg-[linear-gradient(145deg,rgba(245,197,107,.14),rgba(255,255,255,.045)),#11100e] p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[0.65rem] font-black uppercase tracking-[0.24em] text-amber-200/70">
                  Vietnam
                </p>
                <h2 className="mt-2 font-display text-4xl font-black leading-none text-white">
                  {city.name}
                </h2>
              </div>
              <div className="flex items-center gap-2 border border-emerald-300/30 bg-emerald-400/10 px-3 py-2 text-xs font-bold text-emerald-100">
                <WifiOff size={16} />
                Local drafts
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-stone-300">{city.summary}</p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="border border-white/10 bg-black/30 p-3">
                <div className="text-2xl font-black">{cityDrafts.length}</div>
                <div className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-stone-400">
                  City drafts
                </div>
              </div>
              <div className="border border-white/10 bg-black/30 p-3">
                <div className="text-2xl font-black">113</div>
                <div className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-stone-400">
                  Police
                </div>
              </div>
              <div className="border border-white/10 bg-black/30 p-3">
                <div className="text-2xl font-black">115</div>
                <div className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-stone-400">
                  Ambulance
                </div>
              </div>
            </div>
          </div>
        </section>

        <nav className="mt-5 grid grid-cols-2 gap-3" aria-label="Travel shortcuts">
          <FieldButton
            href={`/city/${city.slug}/emergency`}
            icon={ShieldAlert}
            label="Emergency"
            tone="urgent"
          />
          <FieldButton href={`/city/${city.slug}/apps`} icon={Smartphone} label="Apps" />
          <FieldButton href={`/city/${city.slug}/payments`} icon={BadgeDollarSign} label="Payments" />
          <FieldButton href={`/city/${city.slug}/transit`} icon={TramFront} label="Transport" />
          <FieldButton href="#phrasebook" icon={Languages} label="Phrasebook" />
          <FieldButton href="#risks" icon={Shield} label="Legal / risks" />
          <FieldButton href={`/city/${city.slug}/itinerary`} icon={ClipboardList} label="Itinerary" />
          <FieldButton href="#field-note" icon={FilePenLine} label="Field notes" />
          <FieldButton href="#review" icon={Star} label="Reviews" />
          <FieldButton href="#quick-feedback" icon={Check} label="Fast feedback" />
        </nav>

        {savedMessage ? (
          <div className="mt-5 border border-emerald-300/30 bg-emerald-400/10 px-4 py-3 text-sm font-bold text-emerald-100">
            {savedMessage}
          </div>
        ) : null}

        <section id="quick-feedback" className="mt-7 scroll-mt-32">
          <div className="flex items-center gap-3">
            <Plus className="text-amber-200" size={20} />
            <h2 className="font-display text-2xl font-black text-white">
              One-tap feedback
            </h2>
          </div>
          <input
            value={quickTarget}
            onChange={(event) => setQuickTarget(event.target.value)}
            placeholder="Place or moment, optional"
            className="mt-4 min-h-14 w-full border border-white/12 bg-white/[0.055] px-4 text-base text-white placeholder:text-stone-500 outline-none focus:border-amber-200"
          />
          <div className="mt-3 grid grid-cols-2 gap-3">
            {QUICK_FLAGS.map((flag) => {
              const Icon = flag.icon;
              const selected = selectedFlags.includes(flag.label);
              return (
                <button
                  key={flag.label}
                  type="button"
                  onClick={() => toggleFlag(flag.label)}
                  className={`min-h-14 border p-3 text-left text-sm font-black uppercase tracking-[0.1em] transition active:scale-[0.99] ${
                    selected
                      ? "border-amber-200 bg-amber-200 text-black"
                      : "border-white/12 bg-white/[0.055] text-stone-100"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon size={18} />
                    {flag.label}
                  </span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={saveQuickFeedback}
            className="mt-3 min-h-14 w-full bg-amber-200 px-5 text-sm font-black uppercase tracking-[0.18em] text-black active:scale-[0.99]"
          >
            Save private feedback
          </button>
        </section>

        <section id="field-note" className="mt-9 scroll-mt-32">
          <div className="flex items-center gap-3">
            <FilePenLine className="text-amber-200" size={20} />
            <h2 className="font-display text-2xl font-black text-white">
              Field note
            </h2>
          </div>
          <select
            value={noteCategory}
            onChange={(event) => setNoteCategory(event.target.value)}
            className="mt-4 min-h-14 w-full border border-white/12 bg-black px-4 text-base font-bold text-white outline-none focus:border-amber-200"
          >
            {NOTE_CATEGORIES.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <textarea
            value={noteText}
            onChange={(event) => setNoteText(event.target.value)}
            placeholder="What did you observe? Prices, cash friction, safety feel, app behavior, scams, closures..."
            className="mt-3 min-h-36 w-full resize-y border border-white/12 bg-white/[0.055] p-4 text-base leading-7 text-white placeholder:text-stone-500 outline-none focus:border-amber-200"
          />
          <button
            type="button"
            onClick={saveFieldNote}
            className="mt-3 min-h-14 w-full bg-white px-5 text-sm font-black uppercase tracking-[0.18em] text-black active:scale-[0.99]"
          >
            Save private field note
          </button>
        </section>

        <section id="review" className="mt-9 scroll-mt-32">
          <div className="flex items-center gap-3">
            <Star className="text-amber-200" size={20} />
            <h2 className="font-display text-2xl font-black text-white">
              Quick review
            </h2>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <select
              value={reviewType}
              onChange={(event) => setReviewType(event.target.value)}
              className="min-h-14 border border-white/12 bg-black px-4 text-base font-bold text-white outline-none focus:border-amber-200"
            >
              {REVIEW_TYPES.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <input
              value={reviewPlace}
              onChange={(event) => setReviewPlace(event.target.value)}
              placeholder="Name / route / airport"
              className="min-h-14 border border-white/12 bg-white/[0.055] px-4 text-base text-white placeholder:text-stone-500 outline-none focus:border-amber-200"
            />
          </div>
          <textarea
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
            placeholder="Stay here again? What mattered? Noise, location, service, value, safety, card/cash, arrival friction..."
            className="mt-3 min-h-36 w-full resize-y border border-white/12 bg-white/[0.055] p-4 text-base leading-7 text-white placeholder:text-stone-500 outline-none focus:border-amber-200"
          />
          <button
            type="button"
            onClick={saveReview}
            className="mt-3 min-h-14 w-full bg-white px-5 text-sm font-black uppercase tracking-[0.18em] text-black active:scale-[0.99]"
          >
            Save private review draft
          </button>
        </section>

        <section id="phrasebook" className="mt-10 scroll-mt-32">
          <div className="flex items-center gap-3">
            <BookOpenText className="text-amber-200" size={20} />
            <h2 className="font-display text-2xl font-black text-white">
              Phrasebook
            </h2>
          </div>
          <div className="mt-4 grid gap-3">
            {fieldPhrases.map((phrase) => (
              <div key={phrase.phrase_key} className="border border-white/12 bg-white/[0.045] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-400">
                  {phrase.category}
                </p>
                <p className="mt-2 text-base font-bold text-white">{phrase.source_text}</p>
                <p className="mt-1 font-display text-2xl font-black text-amber-100">
                  {phrase.translated_text}
                </p>
                <p className="mt-1 text-sm text-stone-300">{phrase.transliteration}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="risks" className="mt-10 scroll-mt-32">
          <div className="flex items-center gap-3">
            <Shield className="text-amber-200" size={20} />
            <h2 className="font-display text-2xl font-black text-white">
              Legal and social risks
            </h2>
          </div>
          <div className="mt-4 grid gap-3">
            {displayedRisks.length ? (
              displayedRisks.map((risk, index) => (
                <div
                  key={risk.note_key ?? risk.risk_key ?? index}
                  className="border border-white/12 bg-white/[0.045] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-black text-white">
                      {risk.title ?? risk.risk_label ?? "Traveler risk"}
                    </h3>
                    <span className="border border-amber-200/30 px-2 py-1 text-[0.62rem] font-black uppercase tracking-[0.14em] text-amber-100">
                      {risk.severity ?? risk.risk_level ?? "check"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-stone-300">
                    {risk.traveler_summary ?? "Review locally before acting."}
                  </p>
                  {risk.practical_guidance?.[0] ? (
                    <p className="mt-3 border-l border-amber-200/60 pl-3 text-sm leading-6 text-amber-50">
                      {risk.practical_guidance[0]}
                    </p>
                  ) : null}
                </div>
              ))
            ) : (
              <div className="border border-white/12 bg-white/[0.045] p-4 text-sm leading-6 text-stone-300">
                Keep political discussion, public filming, drone use, drugs,
                sensitive sites, and nightlife disputes conservative until a
                verified risk card is available.
              </div>
            )}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center gap-3">
            <CircleDollarSign className="text-amber-200" size={20} />
            <h2 className="font-display text-2xl font-black text-white">
              Cash checks
            </h2>
          </div>
          <div className="mt-4 grid gap-2">
            {importantPrices.map((price) => (
              <div
                key={price.benchmark_key}
                className="flex min-h-12 items-center justify-between gap-4 border-b border-white/10 text-sm"
              >
                <span className="text-stone-300">{price.label}</span>
                <span className="font-black text-amber-100">
                  {formatVnd(price.amount_typical_minor)}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center gap-3">
            <Smartphone className="text-amber-200" size={20} />
            <h2 className="font-display text-2xl font-black text-white">
              App stack
            </h2>
          </div>
          <div className="mt-4 grid gap-3">
            {topApps.map((app) => (
              <a
                key={app.slug}
                href={app.web_url ?? "#"}
                className="block min-h-20 border border-white/12 bg-white/[0.045] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-black text-white">
                    {app.name}
                  </h3>
                  <span className="text-[0.62rem] font-black uppercase tracking-[0.14em] text-amber-100">
                    {app.setup_before_arrival ? "set up" : app.category}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-stone-300">
                  {app.traveler_notes || app.purpose}
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center gap-3">
            <Plane className="text-amber-200" size={20} />
            <h2 className="font-display text-2xl font-black text-white">
              Draft queue
            </h2>
          </div>
          <div className="mt-4 grid gap-3">
            {drafts.length ? (
              drafts.slice(0, 8).map((draft) => (
                <div key={draft.id} className="border border-white/12 bg-white/[0.045] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-stone-500">
                        {draft.kind} / {draft.cityName}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-black text-white">
                        {draft.title}
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-stone-400">
                      {new Date(draft.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-stone-300">{draft.body}</p>
                </div>
              ))
            ) : (
              <div className="border border-white/12 bg-white/[0.045] p-4 text-sm leading-6 text-stone-300">
                No local drafts yet. Anything saved here stays private on this
                device until backend sync is intentionally wired.
              </div>
            )}
          </div>
        </section>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#070706]/94 px-4 py-3 backdrop-blur-xl">
          <div className="mx-auto grid max-w-3xl grid-cols-3 gap-2">
            <a
              href="#quick-feedback"
              className="flex min-h-12 items-center justify-center gap-2 bg-amber-200 px-3 text-xs font-black uppercase tracking-[0.12em] text-black"
            >
              <ThumbsUp size={16} />
              Flag
            </a>
            <a
              href="#field-note"
              className="flex min-h-12 items-center justify-center gap-2 border border-white/12 bg-white/[0.07] px-3 text-xs font-black uppercase tracking-[0.12em] text-white"
            >
              <FilePenLine size={16} />
              Note
            </a>
            <a
              href="#review"
              className="flex min-h-12 items-center justify-center gap-2 border border-white/12 bg-white/[0.07] px-3 text-xs font-black uppercase tracking-[0.12em] text-white"
            >
              <Bus size={16} />
              Review
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
