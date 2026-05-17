/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { COUNTRY_OPTIONS } from "@/lib/destinations/countries";
import { getCountryCities, routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Countries",
  description: "Browse JOURNEE country guides and their connected city pages.",
};

export default function CountriesPage() {
  return (
    <main className="min-h-screen bg-[#020a0b] px-5 py-14 text-white">
      <div className="mx-auto max-w-6xl">
        <nav className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
          <Link href={routes.home} className="hover:text-white">
            Home
          </Link>{" "}
          / Countries
        </nav>
        <h1 className="mt-6 font-sans text-[clamp(2.6rem,9vw,5.4rem)] font-semibold leading-none">
          Countries
        </h1>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {COUNTRY_OPTIONS.map((country) => {
            const cities = getCountryCities(country.slug);
            return (
              <Link
                key={country.slug}
                href={routes.country(country.slug)}
                className="group overflow-hidden rounded-2xl border border-white/12 bg-white/[0.045] shadow-2xl shadow-black/20 transition hover:-translate-y-0.5 hover:border-white/24"
                prefetch
              >
                <div className="relative h-56">
                  <img src={country.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/24 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">{country.region}</p>
                    <h2 className="mt-2 font-sans text-3xl font-semibold">{country.name}</h2>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-6 text-white/68">{country.summary}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#d8aa4f]">
                    {cities.length} connected {cities.length === 1 ? "city" : "cities"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
