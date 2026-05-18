"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleX,
  Clock3,
  FileSearch,
  Globe2,
  Lightbulb,
  Map,
  MessageSquare,
  Mountain,
  Search,
  ThumbsUp,
  TrendingUp,
  Users,
  WalletCards,
  X,
  type LucideIcon,
} from "lucide-react";
import { MainNavLink } from "@/components/navigation/MainNavLink";
import { navigationHref } from "@/lib/routes";
import {
  SEED_SUGGESTIONS,
  SUGGESTION_CATEGORIES,
  SUGGESTION_STATUSES,
  type SuggestionCategory,
  type SuggestionStatus,
  type UserSuggestion,
} from "@/lib/suggestions/types";

const VOTED_KEY = "journee:user-suggestion-votes:v2";

const navItems = [
  "Home",
  "Explore",
  "Trips",
  "Guides",
  "Journal",
  "Stays",
  "Flights",
  "Visa",
  "Budget",
  "Weather",
  "Currency",
  "Settings",
  "Support",
  "Ideas",
];

const menuItems: Array<{ label: string; count: string; icon: LucideIcon }> = [
  { label: "All Ideas", count: "248", icon: Lightbulb },
  { label: "My Suggestions", count: "8", icon: Users },
  { label: "I've Voted", count: "56", icon: CheckCircle2 },
  { label: "Planned", count: "23", icon: CalendarDays },
  { label: "In Progress", count: "14", icon: Clock3 },
  { label: "Completed", count: "31", icon: CheckCircle2 },
  { label: "Declined", count: "9", icon: CircleX },
  { label: "Duplicate Ideas", count: "17", icon: FileSearch },
];

const categoryCounts: Array<{ label: SuggestionCategory; count: number; icon: LucideIcon; color: string }> = [
  { label: "Trip Planning", count: 64, icon: Globe2, color: "text-amber-300" },
  { label: "Maps & Navigation", count: 48, icon: Map, color: "text-emerald-300" },
  { label: "Budget & Payments", count: 36, icon: WalletCards, color: "text-lime-300" },
  { label: "Stays & Hotels", count: 34, icon: CalendarDays, color: "text-yellow-300" },
  { label: "Community & Sharing", count: 28, icon: Users, color: "text-pink-300" },
  { label: "Alerts & Notifications", count: 20, icon: Bell, color: "text-amber-300" },
  { label: "Other", count: 18, icon: MessageSquare, color: "text-white/70" },
];

const completedItems = [
  "Live Activity for Flights",
  "Weather Forecast Improvements",
  "Visa Requirements Database",
  "Packing List & Checklist",
  "Trip Export to PDF",
];

const statusStyles: Record<SuggestionStatus, string> = {
  "Under Review": "border-violet-300/25 bg-violet-400/16 text-violet-100",
  Planned: "border-emerald-300/20 bg-emerald-400/14 text-emerald-100",
  "In Progress": "border-amber-300/24 bg-amber-400/15 text-amber-100",
  Completed: "border-green-300/25 bg-green-400/14 text-green-100",
  Declined: "border-white/16 bg-white/10 text-white/72",
  Duplicate: "border-orange-300/24 bg-orange-400/14 text-orange-100",
};

type SuggestionResponse = {
  message?: string;
  suggestions?: UserSuggestion[];
  suggestion?: UserSuggestion;
};

function loadVotes() {
  if (typeof window === "undefined") return new Set<string>();
  try {
    const raw = window.localStorage.getItem(VOTED_KEY);
    return new Set<string>(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set<string>();
  }
}

function saveVotes(votedIds: Set<string>) {
  window.localStorage.setItem(VOTED_KEY, JSON.stringify([...votedIds]));
}

function formatVotes(count: number) {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}

function avatarPalette(index: number) {
  return [
    "from-[#f1c879] to-[#81531a]",
    "from-[#7dd3fc] to-[#214c64]",
    "from-[#fda4af] to-[#6b2432]",
  ][index % 3];
}

export function SuggestionBoard() {
  const [suggestions, setSuggestions] = useState<UserSuggestion[]>(SEED_SUGGESTIONS);
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<SuggestionCategory>("Trip Planning");
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingVoteId, setPendingVoteId] = useState<string | null>(null);
  const [showComposer, setShowComposer] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | SuggestionStatus>("All");
  const [categoryFilter, setCategoryFilter] = useState<"All" | SuggestionCategory>("All");

  useEffect(() => {
    setVotedIds(loadVotes());

    let mounted = true;
    fetch("/api/suggestions", { cache: "no-store" })
      .then((response) => response.json() as Promise<SuggestionResponse>)
      .then((data) => {
        if (mounted && data.suggestions?.length) setSuggestions(data.suggestions);
      })
      .catch(() => {
        if (mounted) setMessage("Ideas are showing from the local fallback until the shared list responds.");
      });

    return () => {
      mounted = false;
    };
  }, []);

  const visibleSuggestions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return suggestions.filter((suggestion) => {
      const matchesQuery =
        !normalizedQuery ||
        suggestion.title.toLowerCase().includes(normalizedQuery) ||
        suggestion.description.toLowerCase().includes(normalizedQuery);
      const matchesStatus = statusFilter === "All" || suggestion.status === statusFilter;
      const matchesCategory = categoryFilter === "All" || suggestion.category === categoryFilter;
      return matchesQuery && matchesStatus && matchesCategory;
    });
  }, [categoryFilter, query, statusFilter, suggestions]);

  async function submitSuggestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();

    if (cleanTitle.length < 4 || cleanDescription.length < 12) {
      setMessage("Add a clear title and a short description so other travelers understand the idea.");
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: cleanTitle, description: cleanDescription, category }),
      });
      const data = (await response.json()) as SuggestionResponse;

      if (!response.ok) {
        if (data.suggestions?.length) setSuggestions(data.suggestions);
        setMessage(data.message ?? "That suggestion could not be saved.");
        return;
      }

      if (data.suggestions?.length) setSuggestions(data.suggestions);
      if (data.suggestion) {
        const nextVotes = new Set(votedIds).add(data.suggestion.id);
        setVotedIds(nextVotes);
        saveVotes(nextVotes);
      }

      setTitle("");
      setDescription("");
      setCategory("Trip Planning");
      setShowComposer(false);
      setMessage(data.message ?? "Suggestion saved. Your vote has been counted.");
    } catch {
      setMessage("Suggestion could not be saved right now. Try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function voteFor(id: string) {
    if (votedIds.has(id) || pendingVoteId) return;

    setPendingVoteId(id);
    try {
      const response = await fetch(`/api/suggestions/${id}/vote`, { method: "POST" });
      const data = (await response.json()) as SuggestionResponse;

      if (!response.ok) {
        setMessage(data.message ?? "That vote could not be counted.");
        return;
      }

      if (data.suggestions?.length) setSuggestions(data.suggestions);
      const nextVotes = new Set(votedIds).add(id);
      setVotedIds(nextVotes);
      saveVotes(nextVotes);
      setMessage("Vote counted.");
    } catch {
      setMessage("Vote could not be saved right now. Try again in a moment.");
    } finally {
      setPendingVoteId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#031017] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_24%_0%,rgba(214,161,28,.14),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(30,96,113,.18),transparent_34%),linear-gradient(180deg,#071016_0%,#02090d_100%)]" />
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#030b10]/86 px-4 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex min-h-16 max-w-[1880px] items-center gap-5">
          <Link className="flex shrink-0 items-center gap-3" href="/">
            <Mountain className="h-9 w-9 text-[#f6b900]" strokeWidth={1.7} aria-hidden />
            <span className="text-2xl font-semibold uppercase text-white">JOURNEE</span>
          </Link>
          <nav className="hidden flex-1 items-center gap-8 overflow-visible xl:flex">
            {navItems.map((item) => (
              <MainNavLink
                key={item}
                label={item}
                href={item === "Ideas" ? "/community-ideas" : navigationHref(item)}
                className="relative inline-flex min-w-max items-center whitespace-nowrap px-1 py-3 text-sm font-semibold transition"
                activeClassName="text-[#ffc400]"
                inactiveClassName="text-white/88 hover:text-[#ffc400]"
                underlineClassName="absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[#ffc400]"
              />
            ))}
          </nav>
          <div className="ml-auto hidden h-10 w-60 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 lg:flex">
            <input
              aria-label="Search ideas, features"
              placeholder="Search ideas, features..."
              className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/48"
            />
            <Search className="h-4 w-4 text-white/70" aria-hidden />
          </div>
          <button className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04]" type="button" aria-label="Notifications">
            <Bell className="h-5 w-5 text-white/82" aria-hidden />
            <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#ffc400] px-1 text-[9px] font-black text-[#171003]">
              13
            </span>
          </button>
          <button className="flex items-center gap-2" type="button" aria-label="Profile">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[#ffc400]/35 bg-gradient-to-br from-[#ffe0a3] to-[#6e3a1d] text-xs font-bold">
              JD
            </span>
            <ChevronDown className="hidden h-4 w-4 text-white/70 sm:block" aria-hidden />
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1880px] gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] 2xl:grid-cols-[320px_minmax(0,1fr)_420px]">
        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <section className="rounded-lg border border-white/10 bg-white/[0.045] p-4 shadow-[0_24px_70px_rgba(0,0,0,.25)] backdrop-blur-xl">
            <h2 className="mb-3 text-sm font-extrabold uppercase text-[#ffc400]">Community Ideas</h2>
            <div className="grid gap-1">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={`flex items-center gap-3 rounded-md px-3 py-3 text-left text-sm transition ${
                      index === 0
                        ? "border border-[#ffc400]/45 bg-[#ffc400]/24 text-white shadow-[inset_0_0_36px_rgba(255,196,0,.16)]"
                        : "text-white/88 hover:bg-white/[0.06]"
                    }`}
                    type="button"
                  >
                    <Icon className={index === 0 ? "h-5 w-5 text-[#ffc400]" : "h-5 w-5 text-white/82"} aria-hidden />
                    <span className="flex-1">{item.label}</span>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-bold text-white">{item.count}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5 text-center backdrop-blur-xl">
            <h2 className="text-left text-sm font-extrabold uppercase text-[#ffc400]">Have an Idea?</h2>
            <Lightbulb className="mx-auto mt-5 h-12 w-12 text-[#ffc400]" strokeWidth={1.5} aria-hidden />
            <p className="mx-auto mt-4 max-w-56 text-sm leading-6 text-white/70">
              Help shape the future of Journee. Share your idea with the community.
            </p>
            <button
              type="button"
              onClick={() => setShowComposer(true)}
              className="mt-4 w-full rounded-md bg-[#d99a00] px-4 py-3 text-sm font-bold text-[#100b02] transition hover:bg-[#ffc400]"
            >
              Submit a Suggestion
            </button>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl">
            <h2 className="text-sm font-extrabold uppercase text-[#ffc400]">How It Works</h2>
            {["Submit an idea", "Get votes", "We review", "We build"].map((item, index) => (
              <div key={item} className="mt-5 flex gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/18 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{item}</p>
                  <p className="text-xs text-white/58">
                    {index === 0 && "Share your suggestion"}
                    {index === 1 && "The community shows support"}
                    {index === 2 && "Our team evaluates every idea"}
                    {index === 3 && "Top ideas become new features"}
                  </p>
                </div>
              </div>
            ))}
          </section>
        </aside>

        <section className="rounded-lg border border-white/10 bg-white/[0.035] p-4 shadow-[0_24px_80px_rgba(0,0,0,.3)] backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-white sm:text-3xl">Community Ideas & Feature Requests</h1>
              <p className="mt-2 text-sm text-white/72">
                Vote, discuss and help us build the best travel experience together.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowComposer(true)}
              className="inline-flex h-11 items-center justify-center rounded-md border border-[#d99a00]/70 px-5 text-sm font-bold text-[#ffc400] transition hover:bg-[#ffc400] hover:text-[#120d03]"
            >
              Submit a Suggestion
            </button>
          </div>

          {(showComposer || message) && (
            <div className="mt-5 rounded-lg border border-[#ffc400]/24 bg-[#ffc400]/[0.06] p-4">
              {showComposer && (
                <form onSubmit={submitSuggestion} className="grid gap-3 lg:grid-cols-[1fr_220px]">
                  <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Idea title"
                    className="rounded-md border border-white/12 bg-black/28 px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#ffc400]/70"
                  />
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value as SuggestionCategory)}
                    className="rounded-md border border-white/12 bg-[#071117] px-4 py-3 text-sm text-white outline-none focus:border-[#ffc400]/70"
                  >
                    {SUGGESTION_CATEGORIES.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="What should Journee add, and why would travelers use it?"
                    rows={3}
                    className="resize-none rounded-md border border-white/12 bg-black/28 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/45 focus:border-[#ffc400]/70 lg:col-span-2"
                  />
                  <div className="flex flex-wrap items-center gap-3 lg:col-span-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-md bg-[#d99a00] px-5 py-3 text-sm font-bold text-[#100b02] transition hover:bg-[#ffc400] disabled:cursor-wait disabled:opacity-60"
                    >
                      {isSubmitting ? "Saving..." : "Submit Suggestion"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowComposer(false)}
                      className="inline-flex items-center gap-2 rounded-md border border-white/12 px-4 py-3 text-sm text-white/76"
                    >
                      <X className="h-4 w-4" aria-hidden />
                      Close
                    </button>
                  </div>
                </form>
              )}
              {message && <p className="mt-3 text-sm text-[#ffe4a6]">{message}</p>}
            </div>
          )}

          <div className="mt-6 flex h-14 items-center gap-3 rounded-full border border-white/12 bg-black/24 px-5">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search ideas..."
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/55"
            />
            <Search className="h-5 w-5 text-white/84" aria-hidden />
          </div>

          <div className="mt-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="grid gap-3 sm:grid-cols-3">
              <FilterSelect label="Sort by" value="Most Voted" options={["Most Voted"]} />
              <FilterSelect
                label="Category"
                value={categoryFilter}
                options={["All", ...SUGGESTION_CATEGORIES]}
                onChange={(value) => setCategoryFilter(value as "All" | SuggestionCategory)}
              />
              <FilterSelect
                label="Status"
                value={statusFilter}
                options={["All", ...SUGGESTION_STATUSES]}
                onChange={(value) => setStatusFilter(value as "All" | SuggestionStatus)}
              />
            </div>
            <p className="text-right text-sm text-white/82">248 ideas</p>
          </div>

          <div className="mt-4 grid gap-2">
            {visibleSuggestions.map((suggestion) => {
              const hasVoted = votedIds.has(suggestion.id);
              const votePending = pendingVoteId === suggestion.id;
              return (
                <article
                  key={suggestion.id}
                  className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.045] p-4 transition hover:border-[#ffc400]/35 hover:bg-white/[0.065] md:grid-cols-[82px_minmax(0,1fr)_150px_28px]"
                >
                  <button
                    type="button"
                    onClick={() => voteFor(suggestion.id)}
                    disabled={hasVoted || votePending}
                    className="grid min-h-20 place-items-center rounded-md border border-white/12 bg-[#061018] p-3 text-center transition hover:border-[#ffc400]/55 disabled:cursor-not-allowed disabled:opacity-75"
                    aria-label={`Vote for ${suggestion.title}`}
                  >
                    <ArrowRight className="-rotate-90 text-[#ffc400]" size={18} aria-hidden />
                    <span className="text-lg font-extrabold text-[#ffc400]">{formatVotes(suggestion.voteCount)}</span>
                    <span className="text-xs text-white/80">votes</span>
                  </button>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold leading-snug text-white">{suggestion.title}</h2>
                      {suggestion.isPopular && (
                        <span className="rounded-md bg-indigo-400/20 px-2 py-0.5 text-xs font-semibold text-indigo-100">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="mt-1 max-w-3xl text-sm leading-6 text-white/70">{suggestion.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/56">
                      <div className="flex -space-x-2">
                        {[0, 1, 2].map((item) => (
                          <span
                            key={item}
                            className={`grid h-6 w-6 place-items-center rounded-full border border-[#071117] bg-gradient-to-br ${avatarPalette(item)} text-[9px] font-black text-white`}
                          >
                            {suggestion.submittedByAvatar.slice(0, 1)}
                          </span>
                        ))}
                      </div>
                      <span>Asked by {suggestion.submittedBy}</span>
                      <span>•</span>
                      <span>{suggestion.submittedDateLabel}</span>
                      <span>•</span>
                      <MessageSquare className="h-4 w-4" aria-hidden />
                      <span>{suggestion.commentCount}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-white/8 pt-3 md:hidden">
                      <p className="text-sm font-semibold text-white">Would you like to see this option?</p>
                      <VotePill hasVoted={hasVoted} votePending={votePending} onClick={() => voteFor(suggestion.id)} />
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-3 md:block md:text-left">
                    <div>
                      <span className={`inline-flex rounded-md border px-3 py-1 text-sm font-semibold ${statusStyles[suggestion.status]}`}>
                        {suggestion.status}
                      </span>
                      <p className="mt-2 text-xs text-white/64">{suggestion.statusDetail}</p>
                    </div>
                    <div className="hidden md:mt-5 md:block">
                      <p className="text-xs font-semibold text-white/82">Would you like to see this option?</p>
                      <VotePill hasVoted={hasVoted} votePending={votePending} onClick={() => voteFor(suggestion.id)} />
                    </div>
                  </div>

                  <button type="button" className="grid h-8 w-8 place-items-center self-center justify-self-end rounded-full text-white/84 hover:bg-white/8" aria-label={`Open ${suggestion.title}`}>
                    <ChevronRight className="h-5 w-5" aria-hidden />
                  </button>
                </article>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {["Previous", "1", "2", "3", "4", "5", "25", "Next"].map((item, index) => (
              <button
                key={item}
                type="button"
                className={`h-9 rounded-md border px-3 text-sm ${
                  item === "1"
                    ? "border-[#ffc400] text-[#ffc400]"
                    : index === 0
                      ? "border-white/10 text-white/38"
                      : "border-white/10 text-white/74 hover:border-[#ffc400]/60"
                }`}
              >
                {item === "Previous" && <ChevronLeft className="mr-1 inline h-4 w-4" aria-hidden />}
                {item}
                {item === "Next" && <ChevronRight className="ml-1 inline h-4 w-4" aria-hidden />}
              </button>
            ))}
          </div>
        </section>

        <aside className="space-y-4 lg:col-span-2 2xl:sticky 2xl:top-20 2xl:col-span-1 2xl:self-start">
          <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl">
            <h2 className="text-sm font-extrabold uppercase text-[#ffc400]">Ideas at a Glance</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <StatCard icon={Lightbulb} value="248" label="Total Ideas" />
              <StatCard icon={TrendingUp} value="15.6K" label="Total Votes" />
              <StatCard icon={Users} value="3,842" label="Community Contributors" />
              <StatCard icon={MessageSquare} value="1.2K" label="Comments" />
            </div>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl">
            <h2 className="text-sm font-extrabold uppercase text-[#ffc400]">Top Categories</h2>
            <div className="mt-4 grid gap-3">
              {categoryCounts.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3 text-sm">
                    <Icon className={`h-5 w-5 ${item.color}`} aria-hidden />
                    <span className="flex-1 text-white/90">{item.label}</span>
                    <span className="text-white/76">{item.count}</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl">
            <h2 className="text-sm font-extrabold uppercase text-[#ffc400]">Recently Completed</h2>
            <div className="mt-4 grid gap-3">
              {completedItems.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" aria-hidden />
                  <span className="flex-1 text-white/90">{item}</span>
                  <button type="button" className="text-white/66 hover:text-[#ffc400]">View</button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl">
            <h2 className="text-sm font-extrabold uppercase text-[#ffc400]">Duplicate Check</h2>
            <p className="mt-4 text-sm leading-6 text-white/70">
              We check for similar ideas before publishing. Found a similar idea? Vote there instead.
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#d99a00]/70 px-4 py-3 text-sm font-bold text-[#ffc400] transition hover:bg-[#ffc400] hover:text-[#120d03]"
            >
              <Search className="h-4 w-4" aria-hidden />
              Search Duplicates
            </button>
          </section>
        </aside>
      </div>
    </main>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange?: (value: string) => void;
}) {
  return (
    <label className="flex h-10 items-center rounded-md border border-white/12 bg-black/18 px-3 text-sm text-white">
      <span className="mr-1 text-white/74">{label}:</span>
      <select
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className="min-w-0 bg-transparent pr-6 text-white outline-none"
        disabled={!onChange}
      >
        {options.map((item) => (
          <option key={item} value={item} className="bg-[#071117] text-white">
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}

function VotePill({
  hasVoted,
  votePending,
  onClick,
}: {
  hasVoted: boolean;
  votePending: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={hasVoted || votePending}
      className="mt-2 inline-flex items-center gap-2 rounded-md border border-[#ffc400]/55 px-3 py-2 text-xs font-bold text-[#ffc400] transition hover:bg-[#ffc400] hover:text-[#120d03] disabled:cursor-not-allowed disabled:border-white/12 disabled:bg-white/8 disabled:text-white/48"
    >
      <ThumbsUp className="h-4 w-4" aria-hidden />
      {hasVoted ? "Voted" : votePending ? "Voting..." : "Vote Yes"}
    </button>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-md bg-[#ffc400]/12 text-[#ffc400]">
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        <div>
          <p className="text-2xl font-extrabold text-white">{value}</p>
          <p className="text-xs text-white/70">{label}</p>
        </div>
      </div>
    </div>
  );
}
