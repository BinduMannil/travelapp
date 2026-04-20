import Link from "next/link";
import { notFound } from "next/navigation";
import { CoverTile } from "@/components/common/CoverTile";

const CITIES: Record<
  string,
  { name: string; country: string; countrySlug: string; intro: string; tagline: string }
> = {
  tokyo: {
    name: "Tokyo",
    country: "Japan",
    countrySlug: "japan",
    tagline: "東 京",
    intro:
      "Quietly ceremonious and relentlessly modern — the register of the city reveals itself across 25 sections below.",
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
  ready?: boolean;
};

const SECTIONS: Section[] = [
  { slug: "weather", label: "Weather & seasons", kanji: "季", palette: "sakura", blurb: "Month-by-month climate · peak vs off", ready: true },
  { slug: "costs", label: "Daily costs", kanji: "円", palette: "kintsugi", blurb: "Coffee, metro, taxi, SIM · your currency", ready: true },
  { slug: "tipping", label: "Tipping", kanji: "心", palette: "enji", blurb: "Nearly never — here's every exception", ready: true },
  { slug: "visa", label: "Visa for you", kanji: "旅", palette: "aizome", blurb: "35 passports · stay limits · eVisa links", ready: true },
  { slug: "apps", label: "Must-have apps", kanji: "携", palette: "ocean", blurb: "Install before you fly · 11 picks", ready: true },
  { slug: "transit", label: "Getting around", kanji: "交", palette: "sumi", blurb: "Metro, JR, taxi, bus · IC card first", ready: true },
  { slug: "nearby", label: "Nearby cities", kanji: "遠", palette: "forest", blurb: "Kyoto, Osaka, Hakone, Nikko · mode tabs", ready: true },
  { slug: "attractions", label: "Attractions", kanji: "観", palette: "enji", blurb: "12 hand-picked · dress + photo rules", ready: true },
  { slug: "restaurants", label: "Restaurants", kanji: "食", palette: "kintsugi", blurb: "Ranked by Google + Tabelog + Michelin", ready: true },
  { slug: "neighborhoods", label: "Neighborhoods", kanji: "街", palette: "aizome", blurb: "12 districts by vibe + transit", ready: true },
  { slug: "hotels", label: "Where to stay", kanji: "宿", palette: "sumi", blurb: "Capsule → Aman · tiered", ready: true },
  { slug: "payments", label: "Payments & cards", kanji: "現", palette: "ocean", blurb: "11 methods × 9 venues · acceptance grid", ready: true },
  { slug: "health-safety", label: "Health & safety", kanji: "守", palette: "enji", blurb: "Earthquake, meds, embassies, LGBTQ+", ready: true },
  { slug: "arrival", label: "Arrival & logistics", kanji: "着", palette: "aizome", blurb: "NRT/HND transfers · luggage · ATMs", ready: true },
  { slug: "connectivity", label: "Connectivity", kanji: "信", palette: "matcha", blurb: "eSIM / pocket Wi-Fi / plugs 100V", ready: true },
  { slug: "culture", label: "People & language", kanji: "和", palette: "sakura", blurb: "Register, dress code, phrasebook", ready: true },
  { slug: "good-to-know", label: "Good to know", kanji: "知", palette: "washi", blurb: "Etiquette, toilets, trash, escalators", ready: true },
  { slug: "calendar", label: "Holidays & festivals", kanji: "祭", palette: "enji", blurb: "Public holidays + sakura + Obon", ready: true },
  { slug: "packing", label: "Packing list", kanji: "装", palette: "ume", blurb: "Live — tuned to your dates + activities", ready: true },
  { slug: "itinerary", label: "Itineraries", kanji: "道", palette: "kintsugi", blurb: "4 templates · 3 / 5 / 4 / 5 days", ready: true },
  { slug: "wellness", label: "Wellness & onsen", kanji: "湯", palette: "enji", blurb: "10 venues · tattoo policies · etiquette", ready: true },
  { slug: "hidden-gems", label: "Hidden gems", kanji: "秘", palette: "ume", blurb: "Deep cuts · jazz kissa · local picks", ready: true },
  { slug: "shopping", label: "Shopping", kanji: "買", palette: "kintsugi", blurb: "Knives, stationery, vintage, depachika", ready: true },
  { slug: "nightlife", label: "Nightlife", kanji: "宵", palette: "sumi", blurb: "Golden Gai, jazz kissa, craft beer", ready: true },
  { slug: "kids", label: "With kids", kanji: "幼", palette: "sakura", blurb: "Disney, Ghibli, zoo, rainy-day picks", ready: true },
  { slug: "emergency", label: "Emergency quick-card", kanji: "急", palette: "enji", blurb: "Numbers, lost passport, scenarios", ready: true },
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
    <main className="bg-washi-50">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-sumi-900 text-washi-50">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-enji-700/40 via-sumi-900 to-aizome-900/80"
          aria-hidden
        />
        <div
          className="absolute inset-0 -z-10 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 100%, rgba(255,255,255,.85) 0 26%, transparent 27%), radial-gradient(circle at 0% 100%, rgba(255,255,255,.85) 0 26%, transparent 27%), radial-gradient(circle at 100% 100%, rgba(255,255,255,.85) 0 26%, transparent 27%)",
            backgroundSize: "56px 28px",
          }}
          aria-hidden
        />

        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
          <nav className="text-xs uppercase tracking-[0.3em] text-washi-50/65">
            <Link href="/" className="hover:text-washi-50">
              Home
            </Link>{" "}
            ·{" "}
            <Link
              href={`/country/${city.countrySlug}`}
              className="hover:text-washi-50"
            >
              {city.country}
            </Link>{" "}
            · {city.name}
          </nav>
          <h1 className="mt-6 font-display text-[clamp(2.75rem,10vw,7.5rem)] font-bold leading-[0.95] tracking-tight">
            {city.name}.
          </h1>
          <p className="mt-2 font-display text-2xl tracking-[0.3em] text-sakura-200">
            {city.tagline}
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-washi-50/85">
            {city.intro}
          </p>
        </div>
      </section>

      {/* Cover-style sections grid */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SECTIONS.map((s) => (
            <Link
              key={s.slug}
              href={`/city/${slug}/${s.slug}`}
              className="group block overflow-hidden rounded-2xl border border-washi-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-enji-400 hover:shadow-lg"
            >
              <CoverTile palette={s.palette} kanji={s.kanji} aspect="3/2" />
              <div className="p-4">
                <div className="font-display text-base font-semibold text-sumi-900">
                  {s.label}
                </div>
                <p className="mt-1 text-xs text-sumi-700">{s.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return Object.keys(CITIES).map((slug) => ({ slug }));
}
