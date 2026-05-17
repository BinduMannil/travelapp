import type { Metadata } from "next";
import Link from "next/link";
import { COUNTRY_OPTIONS, PLACE_OPTIONS } from "@/lib/destinations/countries";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Cities",
  description: "Browse JOURNEE city guides connected to their country pages.",
};

export default function CitiesPage() {
  const countryNames = new Map(COUNTRY_OPTIONS.map((country) => [country.slug, country.name]));

  return (
    <main className="min-h-screen bg-[#020a0b] px-5 py-14 text-white">
      <div className="mx-auto max-w-6xl">
        <nav className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
          <Link href={routes.home} className="hover:text-white">
            Home
          </Link>{" "}
          / Cities
        </nav>
        <h1 className="mt-6 font-sans text-[clamp(2.6rem,9vw,5.4rem)] font-semibold leading-none">
          Cities
        </h1>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PLACE_OPTIONS.map((city) => (
            <Link
              key={city.slug}
              href={routes.city(city.slug)}
              className="group overflow-hidden rounded-2xl border border-white/12 bg-white/[0.045] p-5 transition hover:-translate-y-0.5 hover:border-white/24"
              prefetch
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#d8aa4f]">
                {countryNames.get(city.countrySlug) ?? city.countrySlug} / {city.kind}
              </p>
              <h2 className="mt-3 font-sans text-2xl font-semibold text-white group-hover:text-[#f0c96e]">
                {city.name}
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/64">{city.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
