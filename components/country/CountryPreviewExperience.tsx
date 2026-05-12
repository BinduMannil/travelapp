"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useMemo, useState } from "react";
import { Compass, Globe2, MapPinned, Sparkles } from "lucide-react";
import {
  COUNTRY_OPTIONS,
  getPlacesForCountry,
  type CountryOption,
} from "@/lib/destinations/countries";

const statusLabel = {
  live: "Live",
  queued: "Queued",
};

export function CountryPreviewExperience({ country }: { country: CountryOption }) {
  const places = getPlacesForCountry(country.slug);
  const nextCountries = COUNTRY_OPTIONS.filter((item) => item.slug !== country.slug);
  const [placeKind, setPlaceKind] = useState("all");
  const [placeStatus, setPlaceStatus] = useState("all");
  const [placeQuery, setPlaceQuery] = useState("");
  const [countryRegion, setCountryRegion] = useState("all");
  const [countryStatus, setCountryStatus] = useState("all");
  const [countryQuery, setCountryQuery] = useState("");

  const placeKinds = useMemo(
    () => ["all", ...Array.from(new Set(places.map((place) => place.kind))).sort()],
    [places],
  );
  const placeStatuses = useMemo(
    () => ["all", ...Array.from(new Set(places.map((place) => place.status))).sort()],
    [places],
  );
  const countryRegions = useMemo(
    () => ["all", ...Array.from(new Set(nextCountries.map((item) => item.region))).sort()],
    [nextCountries],
  );
  const countryStatuses = useMemo(
    () => ["all", ...Array.from(new Set(nextCountries.map((item) => item.status))).sort()],
    [nextCountries],
  );

  const filteredPlaces = useMemo(() => {
    const query = placeQuery.trim().toLowerCase();

    return places.filter((place) => {
      const matchesKind = placeKind === "all" || place.kind === placeKind;
      const matchesStatus = placeStatus === "all" || place.status === placeStatus;
      const matchesQuery =
        !query ||
        place.name.toLowerCase().includes(query) ||
        place.summary.toLowerCase().includes(query);

      return matchesKind && matchesStatus && matchesQuery;
    });
  }, [placeKind, placeQuery, placeStatus, places]);

  const filteredCountries = useMemo(() => {
    const query = countryQuery.trim().toLowerCase();

    return nextCountries.filter((item) => {
      const matchesRegion = countryRegion === "all" || item.region === countryRegion;
      const matchesStatus = countryStatus === "all" || item.status === countryStatus;
      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.region.toLowerCase().includes(query);

      return matchesRegion && matchesStatus && matchesQuery;
    });
  }, [countryQuery, countryRegion, countryStatus, nextCountries]);

  const previewCards = [
    {
      title: "Country UI",
      copy: "Country-level guide, route logic, regions, language, food, money, safety, and seasonal planning.",
      icon: Compass,
    },
    {
      title: "City UI",
      copy: "City landing pages and detail routes will attach here as each country data pack comes online.",
      icon: MapPinned,
    },
    {
      title: "Build queue",
      copy: "Use the dropdown to review the list and decide which country should receive the next full rollout.",
      icon: Sparkles,
    },
  ];

  return (
    <main className="min-h-screen bg-[#07120f] text-orange-50">
      <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden">
        <img
          src={country.image}
          alt=""
          className="absolute inset-0 -z-30 h-full w-full object-cover saturate-125"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(5,16,13,.96),rgba(10,38,34,.78)_48%,rgba(0,0,0,.42)),linear-gradient(0deg,#07120f,transparent_58%)]" />
        <div className="absolute inset-0 -z-10 opacity-30 [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.15)_0_1px,transparent_1px_38px),repeating-linear-gradient(0deg,rgba(255,255,255,.08)_0_1px,transparent_1px_54px)]" />

        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl content-end gap-10 px-6 pb-16 pt-24 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <div>
            <nav className="text-xs font-bold uppercase tracking-[0.12em] text-orange-100/62">
              <Link href="/" className="hover:text-orange-100">Home</Link> · Countries · {country.name}
            </nav>
            <p className="mt-12 text-xs font-black uppercase tracking-[0.12em]" style={{ color: country.accent }}>
              {country.region} · {country.status === "live" ? "Live" : "Build queue"}
            </p>
            <h1 className="mt-5 max-w-5xl font-sans text-[clamp(4rem,14vw,11rem)] font-black leading-[0.84] text-orange-50">
              {country.name}
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-orange-50/82">
              {country.summary}
            </p>
          </div>
          <aside className="border border-orange-100/20 bg-black/35 p-6 shadow-2xl backdrop-blur-xl">
            <Globe2 style={{ color: country.accent }} size={34} />
            <h2 className="mt-5 font-sans text-4xl font-black leading-none text-orange-50">
              Preview shell
            </h2>
            <p className="mt-4 text-sm leading-7 text-orange-50/68">
              This country is now selectable while its full data pack is built.
              Vietnam remains the fully live reference experience.
            </p>
            <Link
              href="/country/vietnam"
              className="mt-6 inline-flex border border-orange-100/16 bg-white/[0.06] px-4 py-2 text-sm font-bold text-orange-50/82 hover:border-amber-300 hover:text-amber-200"
            >
              View live Vietnam UI
            </Link>
          </aside>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {previewCards.map(({ title, copy, icon: Icon }) => {
            return (
              <article key={title} className="border border-orange-100/16 bg-black/24 p-6 backdrop-blur">
                <Icon style={{ color: country.accent }} size={28} />
                <h2 className="mt-5 font-sans text-3xl font-black text-orange-50">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-orange-50/68">{copy}</p>
              </article>
            );
          })}
        </div>
      </section>

      {places.length ? (
        <section className="px-6 pb-20 sm:pb-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.12em]" style={{ color: country.accent }}>
                  Rollout checklist
                </p>
                <h2 className="mt-3 font-sans text-[clamp(2.4rem,6vw,5.5rem)] font-black leading-none text-orange-50">
                  Cities, towns, villages, islands.
                </h2>
              </div>
              <div className="text-sm font-bold text-orange-50/58">
                {filteredPlaces.length} of {places.length} places
              </div>
            </div>
            <div className="mb-8 grid gap-3 border border-orange-100/14 bg-black/24 p-4 md:grid-cols-[1fr_12rem_12rem_auto] md:items-end">
              <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-orange-50/52">
                Search places
                <input
                  value={placeQuery}
                  onChange={(event) => setPlaceQuery(event.currentTarget.value)}
                  placeholder="Name or planning note"
                  className="h-11 border border-orange-100/14 bg-[#07120f] px-3 text-sm font-semibold normal-case tracking-normal text-orange-50 outline-none transition placeholder:text-orange-50/30 focus:border-amber-300"
                />
              </label>
              <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-orange-50/52">
                Type
                <select
                  value={placeKind}
                  onChange={(event) => setPlaceKind(event.currentTarget.value)}
                  className="h-11 border border-orange-100/14 bg-[#07120f] px-3 text-sm font-semibold normal-case tracking-normal text-orange-50 outline-none transition focus:border-amber-300"
                >
                  {placeKinds.map((kind) => (
                    <option key={kind} value={kind}>
                      {kind === "all" ? "All types" : kind}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-orange-50/52">
                Status
                <select
                  value={placeStatus}
                  onChange={(event) => setPlaceStatus(event.currentTarget.value)}
                  className="h-11 border border-orange-100/14 bg-[#07120f] px-3 text-sm font-semibold normal-case tracking-normal text-orange-50 outline-none transition focus:border-amber-300"
                >
                  {placeStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status === "all" ? "All statuses" : statusLabel[status as "live" | "queued"]}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={() => {
                  setPlaceKind("all");
                  setPlaceStatus("all");
                  setPlaceQuery("");
                }}
                className="h-11 border border-orange-100/16 px-4 text-sm font-bold text-orange-50/72 transition hover:border-amber-300 hover:text-amber-200"
              >
                Reset
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredPlaces.map((place) => (
                <Link
                  key={place.slug}
                  href={`/city/${place.slug}`}
                  className="group border border-orange-100/14 bg-orange-50/[0.055] p-5 transition hover:-translate-y-1 hover:border-amber-300/70 hover:bg-orange-50/[0.095]"
                >
                  <div className="text-[10px] font-black uppercase tracking-[0.12em] text-orange-50/46">
                    {place.kind} · {place.status}
                  </div>
                  <div className="mt-2 font-sans text-2xl font-black leading-none text-orange-50 group-hover:text-amber-200">
                    {place.name}
                  </div>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-orange-50/62">
                    {place.summary}
                  </p>
                </Link>
              ))}
            </div>
            {!filteredPlaces.length ? (
              <div className="mt-5 border border-orange-100/14 bg-orange-50/[0.045] p-5 text-sm font-semibold text-orange-50/64">
                No places match those filters yet.
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="px-6 pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl border-t border-orange-100/14 pt-10">
          <p className="text-xs font-black uppercase tracking-[0.12em]" style={{ color: country.accent }}>
            Other countries
          </p>
          <div className="mt-5 grid gap-3 border border-orange-100/14 bg-black/20 p-4 md:grid-cols-[1fr_12rem_12rem_auto] md:items-end">
            <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-orange-50/52">
              Search countries
              <input
                value={countryQuery}
                onChange={(event) => setCountryQuery(event.currentTarget.value)}
                placeholder="Country, region, or focus"
                className="h-11 border border-orange-100/14 bg-[#07120f] px-3 text-sm font-semibold normal-case tracking-normal text-orange-50 outline-none transition placeholder:text-orange-50/30 focus:border-amber-300"
              />
            </label>
            <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-orange-50/52">
              Region
              <select
                value={countryRegion}
                onChange={(event) => setCountryRegion(event.currentTarget.value)}
                className="h-11 border border-orange-100/14 bg-[#07120f] px-3 text-sm font-semibold normal-case tracking-normal text-orange-50 outline-none transition focus:border-amber-300"
              >
                {countryRegions.map((region) => (
                  <option key={region} value={region}>
                    {region === "all" ? "All regions" : region}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-orange-50/52">
              Status
              <select
                value={countryStatus}
                onChange={(event) => setCountryStatus(event.currentTarget.value)}
                className="h-11 border border-orange-100/14 bg-[#07120f] px-3 text-sm font-semibold normal-case tracking-normal text-orange-50 outline-none transition focus:border-amber-300"
              >
                {countryStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status === "all" ? "All statuses" : statusLabel[status as "live" | "queued"]}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={() => {
                setCountryRegion("all");
                setCountryStatus("all");
                setCountryQuery("");
              }}
              className="h-11 border border-orange-100/16 px-4 text-sm font-bold text-orange-50/72 transition hover:border-amber-300 hover:text-amber-200"
            >
              Reset
            </button>
          </div>
          <div className="mt-4 text-sm font-bold text-orange-50/50">
            {filteredCountries.length} of {nextCountries.length} countries
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCountries.map((item) => (
              <Link
                key={item.slug}
                href={`/country/${item.slug}`}
                className="border border-orange-100/14 bg-orange-50/[0.055] p-5 transition hover:-translate-y-1 hover:border-amber-300/70 hover:bg-orange-50/[0.095]"
              >
                <div className="text-[10px] font-black uppercase tracking-[0.12em] text-orange-50/46">
                  {item.region} · {item.status}
                </div>
                <div className="mt-2 font-sans text-3xl font-black text-orange-50">
                  {item.name}
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-orange-50/62">
                  {item.summary}
                </p>
              </Link>
            ))}
          </div>
          {!filteredCountries.length ? (
            <div className="mt-5 border border-orange-100/14 bg-orange-50/[0.045] p-5 text-sm font-semibold text-orange-50/64">
              No countries match those filters yet.
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
