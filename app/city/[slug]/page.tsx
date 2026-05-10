/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import { AmbientDestinationMotion } from "@/components/destination/AmbientDestinationMotion";
import { EditorialIntelligence } from "@/components/destination/EditorialIntelligence";
import { VietnamCityExperience } from "@/components/vietnam/VietnamCityExperience";
import { JAPAN_CITY_PINS, JAPAN_OFFSHORE } from "@/lib/country-maps/japan";
import { getDestinationIdentity } from "@/lib/destination/identity";
import { CITY_INTELLIGENCE } from "@/lib/destination/intelligence";
import { getVietnamCity, VIETNAM_CITIES } from "@/lib/vietnam/frontend";

const CITY_IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2400&q=85",
  alley:
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=84",
  temple:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1600&q=84",
  sushi:
    "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1600&q=84",
  hotel:
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=84",
  train:
    "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1600&q=84",
  night:
    "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1600&q=84",
  kyoto:
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=84",
};

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
      "Quietly ceremonious and relentlessly modern, Tokyo rewards travelers who move slowly enough to notice the register changes.",
  },
};

const PLANNED_CITIES = Object.fromEntries(
  [...JAPAN_CITY_PINS, ...JAPAN_OFFSHORE]
    .filter((city) => !city.published)
    .map((city) => [
      city.slug,
      {
        name: city.name,
        country: "Japan",
        countrySlug: "japan",
        meta: "region" in city ? city.region : city.note,
      },
    ]),
) as Record<
  string,
  { name: string; country: string; countrySlug: string; meta: string }
>;

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

const sectionBySlug = Object.fromEntries(SECTIONS.map((section) => [section.slug, section]));

const EDITORIAL_FEATURES = [
  {
    slug: "attractions",
    eyebrow: "Sacred mornings",
    title: "Temples, towers and the soft hour before crowds.",
    image: CITY_IMAGES.temple,
    placement: "lg:col-span-7",
  },
  {
    slug: "restaurants",
    eyebrow: "The table",
    title: "Sushi counters, ramen steam and Michelin rooms.",
    image: CITY_IMAGES.sushi,
    placement: "lg:col-span-5",
  },
  {
    slug: "neighborhoods",
    eyebrow: "Street register",
    title: "Each district changes the tempo.",
    image: CITY_IMAGES.alley,
    placement: "lg:col-span-5",
  },
  {
    slug: "hotels",
    eyebrow: "Stay well",
    title: "Capsules to Aman, chosen by how the trip should feel.",
    image: CITY_IMAGES.hotel,
    placement: "lg:col-span-7",
  },
];

const PRACTICAL_STACK = ["visa", "arrival", "transit", "weather", "costs", "packing"];
const CULTURE_STACK = ["culture", "good-to-know", "tipping", "payments", "connectivity", "health-safety"];
const NIGHT_STACK = ["itinerary", "nightlife", "hidden-gems", "shopping", "wellness", "kids", "calendar", "apps", "nearby", "emergency"];

function cityHref(citySlug: string, sectionSlug: string) {
  return `/city/${citySlug}/${sectionSlug}`;
}

function SectionLink({
  citySlug,
  section,
  index,
}: {
  citySlug: string;
  section: Section;
  index: number;
}) {
  return (
    <Link
      href={cityHref(citySlug, section.slug)}
      className="group flex items-center justify-between gap-5 border-b border-white/12 py-4 transition hover:border-kintsugi-300/50"
    >
      <span className="flex items-center gap-4">
        <span className="font-display text-2xl font-semibold text-kintsugi-300/56 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span>
          <span className="block font-display text-xl font-semibold leading-tight text-white group-hover:text-kintsugi-300">
            {section.label}
          </span>
          <span className="mt-1 block text-xs leading-relaxed text-white/56">
            {section.blurb}
          </span>
        </span>
      </span>
      <span className="text-kintsugi-300 transition group-hover:translate-x-1">→</span>
    </Link>
  );
}

function GlassChapter({
  citySlug,
  section,
  eyebrow,
  title,
  image,
  className = "",
}: {
  citySlug: string;
  section: Section;
  eyebrow: string;
  title: string;
  image: string;
  className?: string;
}) {
  return (
    <Link
      href={cityHref(citySlug, section.slug)}
      className={`group relative min-h-[31rem] overflow-hidden rounded-[1.45rem] border border-white/12 bg-sumi-900 shadow-editorial-deep transition hover:-translate-y-1 hover:border-kintsugi-300/55 ${className}`}
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-95 brightness-110 saturate-125 transition duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.02),rgba(0,0,0,.18)_34%,rgba(0,0,0,.82)),linear-gradient(90deg,rgba(0,0,0,.38),transparent)]" />
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-kintsugi-300/18 blur-3xl transition group-hover:bg-kintsugi-300/28" />
      <div className="relative flex min-h-[31rem] flex-col justify-end p-5 sm:p-8">
        <div className="editorial-type-container max-w-xl border-l border-kintsugi-300/62 bg-black/18 py-1 pl-5 backdrop-blur-[2px]">
          <div className="luxury-kicker text-kintsugi-300">{eyebrow}</div>
          <h2 className="editorial-feature-title mt-3 font-display font-semibold text-white">
            {title}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/78">{section.blurb}</p>
          <div className="mt-6 text-sm font-bold text-kintsugi-300">Open {section.label} →</div>
        </div>
      </div>
    </Link>
  );
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vietnamCity = getVietnamCity(slug);
  if (vietnamCity) return <VietnamCityExperience city={vietnamCity} />;

  const city = CITIES[slug];
  if (!city) {
    const planned = PLANNED_CITIES[slug];
    if (!planned) notFound();
    return <PlannedCityPage city={planned} slug={slug} />;
  }
  const identity = getDestinationIdentity(slug);
  const intelligence = CITY_INTELLIGENCE[slug];

  return (
    <main
      className="bg-[#0b0a09] text-washi-50"
      style={{ backgroundColor: identity.colors.ink }}
    >
      <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-sumi-900">
        <img
          src={CITY_IMAGES.hero}
          alt="Tokyo at night with neon signs, dense streets, and layered city architecture"
          className="image-drift absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,7,6,.92),rgba(8,7,6,.48)_48%,rgba(8,7,6,.12)),linear-gradient(0deg,rgba(8,7,6,.82),transparent_48%)]" />
        <div className="absolute inset-0 -z-10 opacity-60" style={{ backgroundImage: identity.texture }} />
        <AmbientDestinationMotion identity={identity} />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-[#0b0a09] to-transparent" />

        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl content-end gap-10 px-6 pb-14 pt-24 sm:pb-20 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <nav className="luxury-kicker text-white/58">
              <Link href="/" className="hover:text-kintsugi-300">
                Home
              </Link>{" "}
              ·{" "}
              <Link href={`/country/${city.countrySlug}`} className="hover:text-kintsugi-300">
                {city.country}
              </Link>{" "}
              · {city.name}
            </nav>
            <h1 className="luxury-display mt-5 text-[clamp(4.8rem,16vw,13rem)] font-semibold text-white">
              {city.name}
            </h1>
            <p
              className="mt-2 font-display text-xl tracking-[0.42em] sm:text-2xl"
              style={{ color: identity.colors.accent }}
            >
              {city.tagline}
            </p>
            <p className="luxury-lede mt-7 max-w-2xl text-white/84">{city.intro}</p>
            <div className="mt-8 max-w-xl border-l pl-5 text-sm leading-7 text-white/58" style={{ borderColor: identity.colors.accent }}>
              <span className="font-semibold text-white">{identity.label}</span>
              <br />
              {identity.typographyMood}
            </div>
          </div>

          <aside className="scene-glass rounded-[1.35rem] p-5 sm:p-7">
            <div className="luxury-kicker" style={{ color: identity.colors.accent }}>
              First decisions
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {["itinerary", "hotels", "restaurants", "visa"].map((sectionSlug) => {
                const section = sectionBySlug[sectionSlug];
                return (
                  <Link
                    key={section.slug}
                    href={cityHref(slug, section.slug)}
                    className="editorial-type-container rounded-2xl border border-white/16 bg-white/[0.11] p-4 transition hover:-translate-y-0.5 hover:border-kintsugi-300/70 hover:bg-white/[0.18] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kintsugi-300"
                    style={{ borderColor: "rgba(255,255,255,.12)" }}
                  >
                    <div className="font-display text-4xl font-semibold text-white">{section.kanji}</div>
                    <div className="mt-2 text-sm font-bold leading-tight text-white">{section.label}</div>
                    <div className="mt-1 text-xs leading-relaxed text-white/58">{section.blurb}</div>
                  </Link>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      <section className="journee-scene relative overflow-hidden py-32 sm:py-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(200,155,60,.18),transparent_32%),radial-gradient(circle_at_82%_35%,rgba(141,20,36,.26),transparent_36%)]" />
        <img
          src={CITY_IMAGES.alley}
          alt=""
          className="absolute right-0 top-16 h-[28rem] w-[52vw] object-cover opacity-18 blur-[1px]"
          loading="lazy"
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-20 lg:grid-cols-[.7fr_1.3fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <p className="luxury-kicker text-kintsugi-300">Enter by mood</p>
              <h2 className="luxury-display mt-4 text-[clamp(2.7rem,5.5vw,5.8rem)] font-semibold text-white">
                The city opens in scenes.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-white/68">
                Tokyo should not introduce itself as a grid. Start with the places, textures, rooms and tables that make the city feel alive.
              </p>
            </div>
            <div className="space-y-8">
              <div className="grid gap-8 lg:grid-cols-[1.18fr_.82fr]">
              {EDITORIAL_FEATURES.slice(0, 2).map((feature) => {
                const section = sectionBySlug[feature.slug];
                return (
                  <GlassChapter
                    key={feature.slug}
                    citySlug={slug}
                    section={section}
                    eyebrow={feature.eyebrow}
                    title={feature.title}
                    image={feature.image}
                    className={feature.slug === "restaurants" ? "lg:mt-24 lg:min-h-[30rem]" : "lg:min-h-[40rem]"}
                  />
                );
              })}
              </div>
              <div className="ml-auto grid max-w-3xl gap-4 border-t border-white/14 pt-8 sm:grid-cols-2">
                {EDITORIAL_FEATURES.slice(2).map((feature) => {
                  const section = sectionBySlug[feature.slug];
                  return (
                    <Link
                      key={feature.slug}
                      href={cityHref(slug, section.slug)}
                      className="group scene-glass flex items-center justify-between gap-5 rounded-[1.1rem] p-5 text-white transition hover:border-kintsugi-300/60 hover:bg-white/[0.12]"
                    >
                      <span>
                        <span className="luxury-kicker text-kintsugi-300/78">{feature.eyebrow}</span>
                        <span className="mt-2 block font-display text-xl font-semibold leading-tight group-hover:text-kintsugi-300">
                          {section.label}
                        </span>
                      </span>
                      <span className="text-kintsugi-300 transition group-hover:translate-x-1">→</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {intelligence ? (
        <EditorialIntelligence identity={identity} intelligence={intelligence} />
      ) : null}

      <section className="relative min-h-[48rem] overflow-hidden py-32 sm:py-44">
        <img
          src={CITY_IMAGES.train}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-72"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,8,7,.94),rgba(9,8,7,.72)_44%,rgba(9,8,7,.2)),linear-gradient(0deg,rgba(9,8,7,.85),transparent_62%)]" />
        <AmbientDestinationMotion identity={identity} variant="section" />
        <div className="relative mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
          <div className="max-w-xl">
            <p className="luxury-kicker text-kintsugi-300">Practical layer</p>
            <h2 className="luxury-display mt-4 text-[clamp(2.7rem,5.5vw,5.8rem)] font-semibold text-white">
              Logistics, folded into the journey.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-white/72">
              Visas, arrival, weather, packing and transit stay close at hand, but they sit inside the atmosphere of the trip rather than outside it.
            </p>
          </div>
          <div className="scene-glass ml-auto w-full max-w-3xl rounded-[1.35rem] p-6 sm:p-8">
            {PRACTICAL_STACK.map((sectionSlug, index) => (
              <SectionLink
                key={sectionSlug}
                citySlug={slug}
                section={sectionBySlug[sectionSlug]}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="journee-scene relative overflow-hidden bg-[#11100e] py-32 sm:py-44">
        <AmbientDestinationMotion identity={identity} variant="section" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.15fr_.85fr] lg:items-stretch">
          <div className="grid min-h-[48rem] grid-rows-[1fr_.62fr] gap-8">
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <img src={CITY_IMAGES.night} alt="" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="editorial-type-container absolute bottom-0 p-6 sm:p-8">
                <p className="luxury-kicker text-kintsugi-300">After dark</p>
                <h2 className="mt-3 font-display text-[clamp(2.25rem,7cqw,3.6rem)] font-semibold leading-[1.02] text-white">
                  Neon, jazz rooms, late trains.
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <img src={CITY_IMAGES.sushi} alt="" className="h-full min-h-48 rounded-[1.3rem] object-cover" loading="lazy" />
              <img src={CITY_IMAGES.alley} alt="" className="h-full min-h-48 rounded-[1.3rem] object-cover" loading="lazy" />
            </div>
          </div>

          <div className="scene-glass flex flex-col justify-between rounded-[1.5rem] p-7 sm:p-10 lg:mt-24">
            <div>
              <p className="luxury-kicker text-kintsugi-300">Culture in motion</p>
              <h2 className="luxury-display mt-4 text-[clamp(2.5rem,5vw,4.9rem)] font-semibold text-white">
                Etiquette is part of the landscape.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/68">
                Language, payments, tipping, safety and small social cues should feel like travel intelligence gathered on the street, not static dashboard blocks.
              </p>
            </div>
            <div className="mt-12">
              {CULTURE_STACK.map((sectionSlug, index) => (
                <SectionLink
                  key={sectionSlug}
                  citySlug={slug}
                  section={sectionBySlug[sectionSlug]}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-32 sm:py-44">
        <img
          src={CITY_IMAGES.kyoto}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-34"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,10,9,.94),rgba(11,10,9,.78),rgba(11,10,9,.96))]" />
        <AmbientDestinationMotion identity={identity} variant="section" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
            <div>
              <p className="luxury-kicker text-kintsugi-300">Keep exploring</p>
              <h2 className="luxury-display mt-4 text-[clamp(2.7rem,5.5vw,5.8rem)] font-semibold text-white">
                A living guide, not a dashboard.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-white/68">
                Every remaining chapter stays one click away, gathered as an editorial index over the city rather than a wall of matching cards.
              </p>
            </div>
            <div className="scene-glass grid gap-x-10 rounded-[1.5rem] p-6 sm:p-8 md:grid-cols-2">
              {NIGHT_STACK.map((sectionSlug, index) => (
                <SectionLink
                  key={sectionSlug}
                  citySlug={slug}
                  section={sectionBySlug[sectionSlug]}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return [
    ...Object.keys(CITIES),
    ...Object.keys(PLANNED_CITIES),
    ...VIETNAM_CITIES.map((city) => city.slug),
  ].map((slug) => ({ slug }));
}

function PlannedCityPage({
  city,
  slug,
}: {
  city: { name: string; country: string; countrySlug: string; meta: string };
  slug: string;
}) {
  const identity = getDestinationIdentity(city.countrySlug);

  return (
    <main
      className="min-h-[calc(100svh-4rem)] bg-sumi-950 text-washi-50"
      style={{ backgroundColor: identity.colors.ink }}
    >
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(135deg, ${identity.colors.secondary}88, ${identity.colors.ink} 52%, ${identity.colors.tertiary}cc)`,
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 -z-10 opacity-70"
          style={{ backgroundImage: identity.texture }}
          aria-hidden
        />
        <AmbientDestinationMotion identity={identity} />
        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl content-center gap-10 px-6 py-24 lg:grid-cols-[1fr_.75fr] lg:items-center">
          <div>
            <nav className="luxury-kicker text-white/58">
              <Link href="/" className="hover:text-kintsugi-300">
                Home
              </Link>{" "}
              ·{" "}
              <Link
                href={`/country/${city.countrySlug}`}
                className="hover:text-kintsugi-300"
              >
                {city.country}
              </Link>{" "}
              · {city.name}
            </nav>
            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.32em] text-kintsugi-300">
              {city.meta}
            </p>
            <h1 className="luxury-display mt-5 text-[clamp(4rem,14vw,11rem)] font-semibold text-white">
              {city.name}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72">
              This city guide is mapped into the Japan rollout and linked from
              the country page. The full local guide will follow the same city
              structure as Tokyo once its content pass is ready.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={`/country/${city.countrySlug}`}
                className="border border-kintsugi-300/60 px-5 py-3 text-sm font-semibold text-kintsugi-300 transition hover:bg-kintsugi-300 hover:text-sumi-950"
              >
                Back to Japan
              </Link>
              <Link
                href="/city/tokyo"
                className="border border-white/18 px-5 py-3 text-sm font-semibold text-white/76 transition hover:border-white/48 hover:text-white"
              >
                View Tokyo guide
              </Link>
            </div>
          </div>
          <aside className="border border-white/12 bg-white/[0.07] p-6 shadow-editorial backdrop-blur-xl sm:p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/48">
              Planned route
            </div>
            <div className="mt-5 font-display text-4xl font-semibold text-white">
              /city/{slug}
            </div>
            <p className="mt-5 text-sm leading-7 text-white/58">
              Keeping this route live now means the Japan country page can act
              as the source of truth for every city link while the guide content
              is filled in progressively.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
