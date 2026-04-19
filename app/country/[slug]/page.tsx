import Link from "next/link";
import { notFound } from "next/navigation";

const COUNTRIES: Record<string, { name: string; primaryCity: string }> = {
  japan: { name: "Japan", primaryCity: "tokyo" },
};

type Section = { slug: string; label: string; ready?: boolean };

const SECTIONS: Section[] = [
  { slug: "languages", label: "Languages spoken", ready: true },
  { slug: "cuisine", label: "Must-try cuisine", ready: true },
  { slug: "famous-for", label: "Famous for", ready: true },
  { slug: "visa", label: "Visa requirements" },
  { slug: "health-safety", label: "Health & safety" },
  { slug: "customs", label: "Customs & duty-free" },
  { slug: "holidays", label: "Public holidays" },
  { slug: "calendar", label: "Festivals & events" },
  { slug: "tipping", label: "Tipping culture" },
  { slug: "costs", label: "Cost of living" },
  { slug: "good-to-know", label: "Good to know" },
  { slug: "connectivity", label: "Connectivity & SIM" },
  { slug: "power", label: "Plugs & power" },
  { slug: "transit-passes", label: "Transit passes" },
  { slug: "payments", label: "Payments & cards" },
  { slug: "lgbtq", label: "LGBTQ+ info" },
  { slug: "hazards", label: "Natural hazards" },
];

export default async function CountryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = COUNTRIES[slug];
  if (!country) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        · {country.name}
      </nav>
      <h1 className="mt-2 text-4xl font-semibold">{country.name}</h1>
      <p className="mt-3 text-slate-600">
        Country-level guidance. City pages (e.g.{" "}
        <Link
          href={`/city/${country.primaryCity}`}
          className="text-brand-600 hover:underline"
        >
          Tokyo
        </Link>
        ) inherit this content and override where local details differ.
      </p>

      <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((s) => (
          <Link
            key={s.slug}
            href={`/country/${slug}/${s.slug}`}
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
  return Object.keys(COUNTRIES).map((slug) => ({ slug }));
}
