import Link from "next/link";
import { notFound } from "next/navigation";

const CITIES: Record<string, { name: string; country: string; countrySlug: string }> = {
  tokyo: { name: "Tokyo", country: "Japan", countrySlug: "japan" },
};

type Section = { slug: string; label: string; ready?: boolean };

const SECTIONS: Section[] = [
  { slug: "weather", label: "Weather & seasons", ready: true },
  { slug: "costs", label: "Daily costs", ready: true },
  { slug: "tipping", label: "Tipping", ready: true },
  { slug: "visa", label: "Visa for you", ready: true },
  { slug: "attractions", label: "Attractions" },
  { slug: "restaurants", label: "Restaurants" },
  { slug: "neighborhoods", label: "Neighborhoods" },
  { slug: "transit", label: "Getting around" },
  { slug: "nearby", label: "Nearby cities" },
  { slug: "hotels", label: "Where to stay" },
  { slug: "apps", label: "Must-have apps" },
  { slug: "payments", label: "Payments & cards" },
  { slug: "health-safety", label: "Health & safety" },
  { slug: "arrival", label: "Arrival & logistics" },
  { slug: "connectivity", label: "Connectivity" },
  { slug: "culture", label: "People & language" },
  { slug: "good-to-know", label: "Good to know" },
  { slug: "calendar", label: "Holidays & festivals" },
  { slug: "packing", label: "Packing list" },
  { slug: "itinerary", label: "Itineraries" },
];

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = CITIES[slug];
  if (!city) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        ·{" "}
        <Link
          href={`/country/${city.countrySlug}`}
          className="hover:underline"
        >
          {city.country}
        </Link>{" "}
        · {city.name}
      </nav>
      <h1 className="mt-2 text-4xl font-semibold">{city.name}</h1>
      <p className="mt-3 text-slate-600">
        Everything you need for a great trip to {city.name}, from visa rules to
        what to pack.
      </p>

      <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((s) => (
          <Link
            key={s.slug}
            href={`/city/${slug}/${s.slug}`}
            className="rounded-lg border border-slate-200 p-4 hover:border-brand-500 hover:bg-brand-50"
          >
            <div className="font-medium">{s.label}</div>
            <div className="text-xs text-slate-500">
              {s.ready ? "Available" : "Coming soon"}
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return Object.keys(CITIES).map((slug) => ({ slug }));
}
