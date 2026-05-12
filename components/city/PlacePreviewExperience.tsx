"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useMemo, useState } from "react";
import { Compass, MapPinned, Route, Sparkles } from "lucide-react";
import {
  getCountryOption,
  getPlacesForCountry,
  type PlaceOption,
} from "@/lib/destinations/countries";

const fallbackImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=86";

const statusLabel = {
  live: "Live",
  queued: "Queued",
};

export function PlacePreviewExperience({ place }: { place: PlaceOption }) {
  const country = getCountryOption(place.countrySlug);
  const siblings = getPlacesForCountry(place.countrySlug).filter((item) => item.slug !== place.slug);
  const [kind, setKind] = useState("all");
  const [status, setStatus] = useState("all");
  const [query, setQuery] = useState("");
  const accent = country?.accent ?? "#F59E0B";
  const siblingKinds = useMemo(
    () => ["all", ...Array.from(new Set(siblings.map((item) => item.kind))).sort()],
    [siblings],
  );
  const siblingStatuses = useMemo(
    () => ["all", ...Array.from(new Set(siblings.map((item) => item.status))).sort()],
    [siblings],
  );
  const filteredSiblings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return siblings.filter((item) => {
      const matchesKind = kind === "all" || item.kind === kind;
      const matchesStatus = status === "all" || item.status === status;
      const matchesQuery =
        !normalizedQuery ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.summary.toLowerCase().includes(normalizedQuery);

      return matchesKind && matchesStatus && matchesQuery;
    });
  }, [kind, query, siblings, status]);

  return (
    <main className="min-h-screen bg-[#07120f] text-orange-50">
      <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden">
        <img
          src={place.image ?? country?.image ?? fallbackImage}
          alt=""
          className="absolute inset-0 -z-30 h-full w-full object-cover saturate-125"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(5,16,13,.97),rgba(10,38,34,.78)_50%,rgba(0,0,0,.42)),linear-gradient(0deg,#07120f,transparent_58%)]" />
        <div className="absolute inset-0 -z-10 opacity-30 [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.15)_0_1px,transparent_1px_38px),repeating-linear-gradient(0deg,rgba(255,255,255,.08)_0_1px,transparent_1px_54px)]" />

        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl content-end gap-10 px-6 pb-16 pt-24 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <div>
            <nav className="text-xs font-bold uppercase tracking-[0.12em] text-orange-100/62">
              <Link href="/" className="hover:text-orange-100">Home</Link> ·{" "}
              {country ? (
                <Link href={`/country/${country.slug}`} className="hover:text-orange-100">
                  {country.name}
                </Link>
              ) : (
                "Countries"
              )}{" "}
              · {place.name}
            </nav>
            <p className="mt-12 text-xs font-black uppercase tracking-[0.12em]" style={{ color: accent }}>
              {place.kind} · {place.status === "live" ? "Live" : "Build queue"}
            </p>
            <h1 className="mt-5 max-w-5xl font-sans text-[clamp(3.6rem,13vw,10rem)] font-black leading-[0.84] text-orange-50">
              {place.name}
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-orange-50/82">
              {place.summary}
            </p>
          </div>
          <aside className="border border-orange-100/20 bg-black/35 p-6 shadow-2xl backdrop-blur-xl">
            <MapPinned style={{ color: accent }} size={34} />
            <h2 className="mt-5 font-sans text-4xl font-black leading-none text-orange-50">
              Place preview
            </h2>
            <p className="mt-4 text-sm leading-7 text-orange-50/68">
              This {place.kind} is now in the rollout list. The full city UI
              will attach here as its data pack is built.
            </p>
            {country ? (
              <Link
                href={`/country/${country.slug}`}
                className="mt-6 inline-flex border border-orange-100/16 bg-white/[0.06] px-4 py-2 text-sm font-bold text-orange-50/82 hover:border-amber-300 hover:text-amber-200"
              >
                Back to {country.name}
              </Link>
            ) : null}
          </aside>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            { title: "City UI", copy: "Landing page, detail routes, neighborhoods, food, stays, transit, safety, weather, and costs.", icon: Compass },
            { title: "Route role", copy: "Each place will be tagged as arrival base, island pause, mountain reset, food stop, or day-trip hub.", icon: Route },
            { title: "Data pack", copy: "The settlement list gives us a checklist so every place moves from queued to live deliberately.", icon: Sparkles },
          ].map(({ title, copy, icon: Icon }) => (
            <article key={title} className="border border-orange-100/16 bg-black/24 p-6 backdrop-blur">
              <Icon style={{ color: accent }} size={28} />
              <h2 className="mt-5 font-sans text-3xl font-black text-orange-50">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-orange-50/68">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      {siblings.length ? (
        <section className="px-6 pb-24 sm:pb-32">
          <div className="mx-auto max-w-7xl border-t border-orange-100/14 pt-10">
            <p className="text-xs font-black uppercase tracking-[0.12em]" style={{ color: accent }}>
              More in {country?.name ?? "this country"}
            </p>
            <div className="mt-5 grid gap-3 border border-orange-100/14 bg-black/20 p-4 md:grid-cols-[1fr_12rem_12rem_auto] md:items-end">
              <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-orange-50/52">
                Search places
                <input
                  value={query}
                  onChange={(event) => setQuery(event.currentTarget.value)}
                  placeholder="Name or planning note"
                  className="h-11 border border-orange-100/14 bg-[#07120f] px-3 text-sm font-semibold normal-case tracking-normal text-orange-50 outline-none transition placeholder:text-orange-50/30 focus:border-amber-300"
                />
              </label>
              <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-orange-50/52">
                Type
                <select
                  value={kind}
                  onChange={(event) => setKind(event.currentTarget.value)}
                  className="h-11 border border-orange-100/14 bg-[#07120f] px-3 text-sm font-semibold normal-case tracking-normal text-orange-50 outline-none transition focus:border-amber-300"
                >
                  {siblingKinds.map((item) => (
                    <option key={item} value={item}>
                      {item === "all" ? "All types" : item}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-orange-50/52">
                Status
                <select
                  value={status}
                  onChange={(event) => setStatus(event.currentTarget.value)}
                  className="h-11 border border-orange-100/14 bg-[#07120f] px-3 text-sm font-semibold normal-case tracking-normal text-orange-50 outline-none transition focus:border-amber-300"
                >
                  {siblingStatuses.map((item) => (
                    <option key={item} value={item}>
                      {item === "all" ? "All statuses" : statusLabel[item as "live" | "queued"]}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={() => {
                  setKind("all");
                  setStatus("all");
                  setQuery("");
                }}
                className="h-11 border border-orange-100/16 px-4 text-sm font-bold text-orange-50/72 transition hover:border-amber-300 hover:text-amber-200"
              >
                Reset
              </button>
            </div>
            <div className="mt-4 text-sm font-bold text-orange-50/50">
              {filteredSiblings.length} of {siblings.length} places
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {filteredSiblings.map((item) => (
                <Link
                  key={item.slug}
                  href={`/city/${item.slug}`}
                  className="border border-orange-100/14 bg-orange-50/[0.055] p-5 transition hover:-translate-y-1 hover:border-amber-300/70 hover:bg-orange-50/[0.095]"
                >
                  <div className="text-[10px] font-black uppercase tracking-[0.12em] text-orange-50/46">
                    {item.kind} · {item.status}
                  </div>
                  <div className="mt-2 font-sans text-2xl font-black text-orange-50">
                    {item.name}
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-orange-50/62">
                    {item.summary}
                  </p>
                </Link>
              ))}
            </div>
            {!filteredSiblings.length ? (
              <div className="mt-5 border border-orange-100/14 bg-orange-50/[0.045] p-5 text-sm font-semibold text-orange-50/64">
                No places match those filters yet.
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
    </main>
  );
}
