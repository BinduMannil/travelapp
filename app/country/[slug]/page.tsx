import Link from "next/link";
import { notFound } from "next/navigation";
import { CoverTile } from "@/components/common/CoverTile";
import { CountryMap } from "@/components/country/CountryMap";

const COUNTRIES: Record<
  string,
  { name: string; tagline: string; primaryCity: string; intro: string }
> = {
  japan: {
    name: "Japan",
    tagline: "日 本",
    primaryCity: "tokyo",
    intro:
      "Country-level guidance that every city page inherits. City pages override only where local details differ.",
  },
};

type Palette =
  | "enji"
  | "aizome"
  | "sakura"
  | "matcha"
  | "kintsugi"
  | "sumi"
  | "washi"
  | "ume"
  | "ocean"
  | "forest";

type Section = {
  slug: string;
  label: string;
  kanji: string;
  palette: Palette;
  blurb: string;
  ready: boolean;
};

const SECTIONS: Section[] = [
  { slug: "cuisine", label: "Must-try cuisine", kanji: "食", palette: "enji", blurb: "12 dishes · origin · vegan notes", ready: true },
  { slug: "famous-for", label: "Famous for", kanji: "和", palette: "kintsugi", blurb: "Knives, whisky, anime, denim, wagashi", ready: true },
  { slug: "languages", label: "Languages spoken", kanji: "語", palette: "aizome", blurb: "All spoken by share · English band", ready: true },
  { slug: "visa", label: "Visa requirements", kanji: "旅", palette: "sumi", blurb: "", ready: false },
  { slug: "health-safety", label: "Health & safety", kanji: "守", palette: "enji", blurb: "", ready: false },
  { slug: "customs", label: "Customs & duty-free", kanji: "関", palette: "matcha", blurb: "", ready: false },
  { slug: "holidays", label: "Public holidays", kanji: "祝", palette: "sakura", blurb: "", ready: false },
  { slug: "calendar", label: "Festivals & events", kanji: "祭", palette: "enji", blurb: "", ready: false },
  { slug: "tipping", label: "Tipping culture", kanji: "心", palette: "kintsugi", blurb: "", ready: false },
  { slug: "costs", label: "Cost of living", kanji: "円", palette: "ocean", blurb: "", ready: false },
  { slug: "good-to-know", label: "Good to know", kanji: "知", palette: "washi", blurb: "", ready: false },
  { slug: "connectivity", label: "Connectivity & SIM", kanji: "信", palette: "matcha", blurb: "", ready: false },
  { slug: "power", label: "Plugs & power", kanji: "電", palette: "sumi", blurb: "", ready: false },
  { slug: "transit-passes", label: "Transit passes", kanji: "券", palette: "aizome", blurb: "", ready: false },
  { slug: "payments", label: "Payments & cards", kanji: "現", palette: "kintsugi", blurb: "", ready: false },
  { slug: "lgbtq", label: "LGBTQ+ info", kanji: "彩", palette: "ume", blurb: "", ready: false },
  { slug: "hazards", label: "Natural hazards", kanji: "震", palette: "enji", blurb: "", ready: false },
];

function SectionCard({
  slug,
  section,
}: {
  slug: string;
  section: Section;
}) {
  const card = (
    <div className="group block overflow-hidden rounded-2xl border border-washi-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-enji-400 hover:shadow-lg">
      <CoverTile
        palette={section.palette}
        kanji={section.kanji}
        aspect="3/2"
        badge={section.ready ? undefined : "Coming soon"}
      />
      <div className="p-4">
        <div className="font-display text-base font-semibold text-sumi-900">
          {section.label}
        </div>
        {section.ready ? (
          <p className="mt-1 text-xs text-sumi-700">{section.blurb}</p>
        ) : (
          <p className="mt-1 text-xs italic text-sumi-700/70">
            Will appear in the next content pass.
          </p>
        )}
      </div>
    </div>
  );

  if (!section.ready) {
    return (
      <div aria-disabled className="cursor-not-allowed opacity-70">
        {card}
      </div>
    );
  }
  return (
    <Link href={`/country/${slug}/${section.slug}`}>{card}</Link>
  );
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = COUNTRIES[slug];
  if (!country) notFound();

  return (
    <main className="bg-washi-50">
      <section className="relative isolate overflow-hidden bg-sumi-900 text-washi-50">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-enji-700/50 via-sumi-900 to-aizome-900/85"
          aria-hidden
        />
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
          <nav className="text-xs uppercase tracking-[0.3em] text-washi-50/65">
            <Link href="/" className="hover:text-washi-50">
              Home
            </Link>{" "}
            · {country.name}
          </nav>
          <h1 className="mt-6 font-display text-[clamp(2.75rem,10vw,7.5rem)] font-bold leading-[0.95] tracking-tight">
            {country.name}.
          </h1>
          <p className="mt-2 font-display text-2xl tracking-[0.3em] text-sakura-200">
            {country.tagline}
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-washi-50/85">
            {country.intro}
          </p>
          <p className="mt-4 text-sm text-washi-50/75">
            Go deep on a specific city:{" "}
            <Link
              href={`/city/${country.primaryCity}`}
              className="font-semibold text-kintsugi-300 underline-offset-4 hover:underline"
            >
              Tokyo →
            </Link>
          </p>
        </div>
      </section>

      {/* Interactive country map — cities are clickable pins. */}
      <CountryMap countryName={country.name} />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SECTIONS.map((s) => (
            <SectionCard key={s.slug} slug={slug} section={s} />
          ))}
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return Object.keys(COUNTRIES).map((slug) => ({ slug }));
}
