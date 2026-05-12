import Link from "next/link";
import { notFound } from "next/navigation";
import { CoverTile } from "@/components/common/CoverTile";
import { CountryMap } from "@/components/country/CountryMap";
import { AmbientDestinationMotion } from "@/components/destination/AmbientDestinationMotion";
import { EditorialIntelligence } from "@/components/destination/EditorialIntelligence";
import { SocialRiskBriefing } from "@/components/legal/SocialRiskBriefing";
import { VietnamCountryExperience } from "@/components/vietnam/VietnamCountryExperience";
import { JAPAN_CITY_PINS, JAPAN_OFFSHORE } from "@/lib/country-maps/japan";
import { formatNavigationLabel, formatTitleCase } from "@/lib/copy/formatting";
import { getLegalSocialRisksLive } from "@/lib/data/legal-social-risks";
import { getDestinationIdentity } from "@/lib/destination/identity";
import { COUNTRY_INTELLIGENCE } from "@/lib/destination/intelligence";

const COUNTRIES: Record<
  string,
  { name: string; tagline: string; primaryCity: string; intro: string }
> = {
  japan: {
    name: "Japan",
    tagline: "日 本",
    primaryCity: "tokyo",
    intro:
      "A Japan travel guide for first-time planning and deeper returns: cities, rail routes, seasons, food culture, mountain regions, islands and everyday etiquette.",
  },
  vietnam: {
    name: "Vietnam",
    tagline: "VIỆT NAM",
    primaryCity: "ho-chi-minh-city",
    intro:
      "A country-level travel companion for Vietnam's street energy, regional weather, motorbike culture, coffee, beaches, mountains, and long-route planning.",
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
  { slug: "itinerary", label: "Japan Itinerary Builder", kanji: "道", palette: "matcha", blurb: "Dates · Seasons · Pace · Activities · Cities", ready: true },
  { slug: "cuisine", label: "Must-Try Cuisine", kanji: "食", palette: "enji", blurb: "12 Dishes · Origin · Vegan Notes", ready: true },
  { slug: "famous-for", label: "Famous For", kanji: "和", palette: "kintsugi", blurb: "Knives · Whisky · Anime · Denim · Wagashi", ready: true },
  { slug: "languages", label: "Languages Spoken", kanji: "語", palette: "aizome", blurb: "Language Share · English Comfort Band", ready: true },
  { slug: "visa", label: "Visa Requirements", kanji: "旅", palette: "sumi", blurb: "", ready: false },
  { slug: "health-safety", label: "Health & Safety", kanji: "守", palette: "enji", blurb: "", ready: false },
  { slug: "customs", label: "Customs & Duty-Free", kanji: "関", palette: "matcha", blurb: "", ready: false },
  { slug: "holidays", label: "Public Holidays", kanji: "祝", palette: "sakura", blurb: "", ready: false },
  { slug: "calendar", label: "Festivals & Events", kanji: "祭", palette: "enji", blurb: "", ready: false },
  { slug: "tipping", label: "Tipping Culture", kanji: "心", palette: "kintsugi", blurb: "", ready: false },
  { slug: "costs", label: "Cost of Living", kanji: "円", palette: "ocean", blurb: "", ready: false },
  { slug: "good-to-know", label: "Good to Know", kanji: "知", palette: "washi", blurb: "", ready: false },
  { slug: "connectivity", label: "Connectivity & SIM", kanji: "信", palette: "matcha", blurb: "", ready: false },
  { slug: "power", label: "Plugs & Power", kanji: "電", palette: "sumi", blurb: "", ready: false },
  { slug: "transit-passes", label: "Transit Passes", kanji: "券", palette: "aizome", blurb: "", ready: false },
  { slug: "payments", label: "Payments & Cards", kanji: "現", palette: "kintsugi", blurb: "", ready: false },
  { slug: "lgbtq", label: "LGBTQ+ Info", kanji: "彩", palette: "ume", blurb: "", ready: false },
  { slug: "hazards", label: "Natural Hazards", kanji: "震", palette: "enji", blurb: "", ready: false },
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
        <div className="font-sans text-base font-semibold text-sumi-900">
          {formatNavigationLabel(section.label)}
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

function CityDirectory() {
  const cities = [...JAPAN_CITY_PINS, ...JAPAN_OFFSHORE].map((city) => ({
    slug: city.slug,
    name: city.name,
    href: city.href,
    meta: "region" in city ? city.region : city.note,
    ready: Boolean(city.published),
  }));

  return (
    <section className="bg-washi-50 px-6 pb-16">
      <div className="mx-auto max-w-7xl border-t border-washi-300 pt-12">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-enji-700">
              CITY DIRECTORY
            </p>
            <h2 className="mt-4 font-sans text-4xl font-semibold leading-tight text-sumi-950 sm:text-5xl">
              Every Japan city starts from here.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-sumi-700">
              Tokyo is live now. The remaining city pages are linked as planned
              guides so the country page becomes the permanent launch point for
              the full Japan rollout.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={city.href}
                className="group border border-washi-300 bg-white p-4 transition hover:-translate-y-0.5 hover:border-enji-400 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sumi-600">
                      {city.meta}
                    </div>
                    <div className="mt-2 font-sans text-2xl font-semibold text-sumi-950 group-hover:text-enji-700">
                      {formatTitleCase(city.name)}
                    </div>
                  </div>
                  <span className="text-sm text-enji-700 transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
                <div className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-sumi-500">
                  {city.ready ? "Full Guide Live" : "Guide Planned"}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
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
  if (slug === "vietnam") return <VietnamCountryExperience />;
  const identity = getDestinationIdentity(slug);
  const intelligence = COUNTRY_INTELLIGENCE[slug];
  const legalSocialRisks = await getLegalSocialRisksLive({ countrySlug: slug });

  return (
    <main className="editorial-page">
      <section className="relative isolate overflow-hidden bg-sumi-900 text-washi-50">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(135deg, ${identity.colors.secondary}88, ${identity.colors.ink} 46%, ${identity.colors.tertiary}cc)`,
          }}
          aria-hidden
        />
        <div className="absolute inset-0 -z-10 opacity-70" style={{ backgroundImage: identity.texture }} aria-hidden />
        <AmbientDestinationMotion identity={identity} />
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
          <nav className="text-xs uppercase tracking-[0.12em] text-washi-50/65">
            <Link href="/" className="hover:text-washi-50">
              Home
            </Link>{" "}
            · {country.name}
          </nav>
          <h1 className="mt-6 font-sans text-[clamp(2.75rem,10vw,7.5rem)] font-bold leading-[0.95] tracking-tight">
            {country.name}.
          </h1>
          <p
            className="mt-2 font-sans text-2xl tracking-[0.12em]"
            style={{ color: identity.colors.accentSoft }}
          >
            {country.tagline}
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-washi-50/85">
            {country.intro}
          </p>
          <div className="mt-7 max-w-xl border-l pl-5 text-sm leading-7 text-washi-50/64" style={{ borderColor: identity.colors.accent }}>
            <span className="font-semibold text-washi-50">{identity.label}</span>
            <br />
            {identity.mood}
          </div>
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

      <CityDirectory />

      {intelligence ? (
        <EditorialIntelligence identity={identity} intelligence={intelligence} />
      ) : null}

      <SocialRiskBriefing
        risks={legalSocialRisks}
        destinationName={country.name}
      />

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
