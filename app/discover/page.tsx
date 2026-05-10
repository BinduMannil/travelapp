/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  GLOBAL_CITY_DATA_ATTRIBUTION,
  getGlobalCities,
  getGlobalCountries,
} from "@/lib/discovery";

type DiscoveryPlace = {
  slug: string;
  name: string;
  countryIso2: string;
  countryName: string;
  stateCode: string;
  kind: string;
  coordinates?: { lat: number; lon: number };
};

type ActivityPlaceSeed = {
  name: string;
  countryIso2: string;
  kind: string;
  region?: string;
};

const FEELING_IMAGES = {
  islands:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=84",
  culture:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1400&q=84",
  food:
    "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1400&q=84",
  village:
    "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1400&q=84",
};

const FEELINGS: Record<
  string,
  {
    title: string;
    label: string;
    countryIso2?: string;
    image: string;
    searchQuery?: string;
    strapline: string;
    note: string;
  }
> = {
  "warm-islands": {
    title: "Warm island starting points",
    label: "Warm islands",
    countryIso2: "PH",
    image: FEELING_IMAGES.islands,
    strapline: "Warm water, soft mornings, easy days",
    note: "A first pass through the global place index. Budget and island scoring will get richer as destination intelligence is added.",
  },
  "visa-easy-culture": {
    title: "Culture capital starting points",
    label: "Culture capitals",
    image: FEELING_IMAGES.culture,
    searchQuery: "capital",
    strapline: "Museums, old quarters, fewer paperwork walls",
    note: "The global index can browse countries and populated places now; passport-specific rules still come from detailed country pages.",
  },
  "cool-food-cities": {
    title: "Cool-weather food city starting points",
    label: "Cool food cities",
    countryIso2: "JP",
    image: FEELING_IMAGES.food,
    strapline: "Markets, steam, rain jackets, long dinners",
    note: "Tokyo is the detailed pilot. The rest of the global catalog is indexed and ready for progressive enrichment.",
  },
  "quiet-rail-villages": {
    title: "Quiet rail-access starting points",
    label: "Rail villages",
    countryIso2: "CH",
    image: FEELING_IMAGES.village,
    strapline: "Small stations, slow stays, mountain edges",
    note: "Rail access is not globally scored yet, so this opens a practical country slice instead of a fake ranking.",
  },
};

const ACTIVITIES: Record<
  string,
  {
    label: string;
    title: string;
    note: string;
    places: ActivityPlaceSeed[];
  }
> = {
  beach: {
    label: "Beach",
    title: "Beach places",
    note: "A place-based beach shortlist: coastal cities, towns, villages, island bases and beach regions. This is structured so a larger tagged world dataset can replace the starter list without changing the UI.",
    places: [
      { name: "Phuket", countryIso2: "TH", kind: "island" },
      { name: "Koh Samui", countryIso2: "TH", kind: "island" },
      { name: "Koh Phi Phi", countryIso2: "TH", kind: "island" },
      { name: "Krabi", countryIso2: "TH", kind: "town" },
      { name: "Canggu", countryIso2: "ID", kind: "village" },
      { name: "Uluwatu", countryIso2: "ID", kind: "village" },
      { name: "Nusa Dua", countryIso2: "ID", kind: "resort area" },
      { name: "Gili Trawangan", countryIso2: "ID", kind: "island" },
      { name: "Boracay", countryIso2: "PH", kind: "island" },
      { name: "El Nido", countryIso2: "PH", kind: "town" },
      { name: "Coron", countryIso2: "PH", kind: "town" },
      { name: "Siargao", countryIso2: "PH", kind: "island" },
      { name: "Honolulu", countryIso2: "US", kind: "city" },
      { name: "Maui", countryIso2: "US", kind: "island" },
      { name: "Kauai", countryIso2: "US", kind: "island" },
      { name: "Santa Monica", countryIso2: "US", kind: "city" },
      { name: "San Diego", countryIso2: "US", kind: "city" },
      { name: "Miami Beach", countryIso2: "US", kind: "city" },
      { name: "Cancun", countryIso2: "MX", kind: "city" },
      { name: "Tulum", countryIso2: "MX", kind: "town" },
      { name: "Playa del Carmen", countryIso2: "MX", kind: "city" },
      { name: "Isla Mujeres", countryIso2: "MX", kind: "island" },
      { name: "Los Cabos", countryIso2: "MX", kind: "region" },
      { name: "Cartagena", countryIso2: "CO", kind: "city" },
      { name: "San Andrés", countryIso2: "CO", kind: "island" },
      { name: "Rio de Janeiro", countryIso2: "BR", kind: "city" },
      { name: "Florianopolis", countryIso2: "BR", kind: "city" },
      { name: "Jericoacoara", countryIso2: "BR", kind: "village" },
      { name: "Cape Town", countryIso2: "ZA", kind: "city" },
      { name: "Zanzibar", countryIso2: "TZ", kind: "island" },
      { name: "Mombasa", countryIso2: "KE", kind: "city" },
      { name: "Diani Beach", countryIso2: "KE", kind: "beach town" },
      { name: "Malé", countryIso2: "MV", kind: "island city" },
      { name: "Maafushi", countryIso2: "MV", kind: "island" },
      { name: "Goa", countryIso2: "IN", kind: "region" },
      { name: "Varkala", countryIso2: "IN", kind: "town" },
      { name: "Da Nang", countryIso2: "VN", kind: "city" },
      { name: "Nha Trang", countryIso2: "VN", kind: "city" },
      { name: "Phu Quoc", countryIso2: "VN", kind: "island" },
      { name: "Hoi An", countryIso2: "VN", kind: "town" },
      { name: "Nice", countryIso2: "FR", kind: "city" },
      { name: "Biarritz", countryIso2: "FR", kind: "town" },
      { name: "Dubrovnik", countryIso2: "HR", kind: "city" },
      { name: "Split", countryIso2: "HR", kind: "city" },
      { name: "Hvar", countryIso2: "HR", kind: "island" },
      { name: "Santorini", countryIso2: "GR", kind: "island" },
      { name: "Mykonos", countryIso2: "GR", kind: "island" },
      { name: "Crete", countryIso2: "GR", kind: "island" },
      { name: "Ibiza", countryIso2: "ES", kind: "island" },
      { name: "Mallorca", countryIso2: "ES", kind: "island" },
      { name: "Algarve", countryIso2: "PT", kind: "region" },
      { name: "Lagos", countryIso2: "PT", kind: "town" },
      { name: "Byron Bay", countryIso2: "AU", kind: "town" },
      { name: "Gold Coast", countryIso2: "AU", kind: "city" },
      { name: "Noosa Heads", countryIso2: "AU", kind: "town" },
      { name: "Bondi Beach", countryIso2: "AU", kind: "beach suburb" },
    ],
  },
  chilling: {
    label: "Chilling",
    title: "Easy chilling places",
    note: "Lower-tempo places people choose for slow days, cafes, beaches, guesthouses and easy wandering.",
    places: [
      { name: "Chiang Mai", countryIso2: "TH", kind: "city" },
      { name: "Pai", countryIso2: "TH", kind: "town" },
      { name: "Koh Samui", countryIso2: "TH", kind: "island" },
      { name: "Ubud", countryIso2: "ID", kind: "town" },
      { name: "Hoi An", countryIso2: "VN", kind: "town" },
      { name: "Luang Prabang", countryIso2: "LA", kind: "town" },
      { name: "Lisbon", countryIso2: "PT", kind: "city" },
      { name: "Porto", countryIso2: "PT", kind: "city" },
      { name: "Essaouira", countryIso2: "MA", kind: "city" },
      { name: "San Cristobal de las Casas", countryIso2: "MX", kind: "town" },
      { name: "Granada", countryIso2: "ES", kind: "city" },
      { name: "Kotor", countryIso2: "ME", kind: "town" },
    ],
  },
  trekking: {
    label: "Trekking",
    title: "Trekking places",
    note: "Mountain gateways and trail towns known for serious walks, day hikes, alpine routes or expedition access.",
    places: [
      { name: "Kathmandu", countryIso2: "NP", kind: "city" },
      { name: "Pokhara", countryIso2: "NP", kind: "city" },
      { name: "Namche Bazaar", countryIso2: "NP", kind: "village" },
      { name: "Cusco", countryIso2: "PE", kind: "city" },
      { name: "Huaraz", countryIso2: "PE", kind: "city" },
      { name: "Chamonix", countryIso2: "FR", kind: "town" },
      { name: "Zermatt", countryIso2: "CH", kind: "village" },
      { name: "Interlaken", countryIso2: "CH", kind: "town" },
      { name: "Queenstown", countryIso2: "NZ", kind: "town" },
      { name: "Wanaka", countryIso2: "NZ", kind: "town" },
      { name: "Banff", countryIso2: "CA", kind: "town" },
      { name: "El Chalten", countryIso2: "AR", kind: "village" },
      { name: "Bariloche", countryIso2: "AR", kind: "city" },
      { name: "Innsbruck", countryIso2: "AT", kind: "city" },
      { name: "Leh", countryIso2: "IN", kind: "town" },
      { name: "Manali", countryIso2: "IN", kind: "town" },
      { name: "Moshi", countryIso2: "TZ", kind: "town" },
    ],
  },
  relaxing: {
    label: "Relaxing",
    title: "Relaxing places",
    note: "Places associated with spas, hot springs, soft scenery, island pace or restful stays.",
    places: [
      { name: "Kyoto", countryIso2: "JP", kind: "city" },
      { name: "Hakone", countryIso2: "JP", kind: "town" },
      { name: "Bath", countryIso2: "GB", kind: "city" },
      { name: "Baden-Baden", countryIso2: "DE", kind: "town" },
      { name: "Karlovy Vary", countryIso2: "CZ", kind: "spa town" },
      { name: "Reykjavik", countryIso2: "IS", kind: "city" },
      { name: "Santorini", countryIso2: "GR", kind: "island" },
      { name: "Positano", countryIso2: "IT", kind: "village" },
      { name: "Sorrento", countryIso2: "IT", kind: "town" },
      { name: "Nusa Dua", countryIso2: "ID", kind: "resort area" },
      { name: "Koh Samui", countryIso2: "TH", kind: "island" },
      { name: "Queenstown", countryIso2: "NZ", kind: "town" },
    ],
  },
};

type DiscoverPageProps = {
  searchParams: Promise<{
    activity?: string;
    country?: string;
    feel?: string;
    q?: string;
  }>;
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("en").format(value);
}

function toPlaceSlug(name: string, countryIso2: string) {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${countryIso2.toLowerCase()}`;
}

function findActivityPlaces(activity: (typeof ACTIVITIES)[string] | undefined) {
  if (!activity) return undefined;
  const countries = getGlobalCountries();
  return activity.places.flatMap((target): DiscoveryPlace[] => {
    const matches = getGlobalCities({
      countryIso2: target.countryIso2,
      searchQuery: target.name,
      limit: 20,
    }).filter(
      (city) =>
        city.name.toLowerCase() === target.name.toLowerCase() &&
        city.countryIso2 === target.countryIso2,
    );

    if (matches.length) {
      return matches.slice(0, 1).map((place) => ({
        ...place,
        kind: target.kind,
      }));
    }

    return [
      {
        slug: toPlaceSlug(target.name, target.countryIso2),
        name: target.name,
        countryIso2: target.countryIso2,
        countryName: countries.find((country) => country.iso2 === target.countryIso2)?.name ?? target.countryIso2,
        stateCode: target.region ?? "",
        kind: target.kind,
        coordinates: undefined,
      },
    ];
  });
}

export default async function DiscoverPage({ searchParams }: DiscoverPageProps) {
  const params = await searchParams;
  const feeling = params.feel ? FEELINGS[params.feel] : undefined;
  const activity = params.activity ? ACTIVITIES[params.activity] : undefined;
  const activePath = activity ?? feeling;
  const countryIso2 = (params.country ?? feeling?.countryIso2)?.toUpperCase();
  const searchQuery = params.q ?? feeling?.searchQuery;

  const allCountries = getGlobalCountries();
  const places: DiscoveryPlace[] =
    findActivityPlaces(activity) ??
    getGlobalCities({
      countryIso2,
      searchQuery,
      limit: 96,
    }).map((place) => ({ ...place, kind: "city" }));
  const activityCountryCodes = new Set(places.map((place) => place.countryIso2));
  const matchingCountries = activity
    ? allCountries.filter((country) => activityCountryCodes.has(country.iso2))
    : getGlobalCountries({ searchQuery }).slice(0, 48);
  const placeCountByCountry = places.reduce<Record<string, number>>((counts, place) => {
    counts[place.countryIso2] = (counts[place.countryIso2] ?? 0) + 1;
    return counts;
  }, {});
  const countryCount = activity
    ? matchingCountries.length
    : countryIso2
      ? 1
      : allCountries.length;
  const selectedCountry = countryIso2
    ? allCountries.find((country) => country.iso2 === countryIso2)
    : undefined;

  return (
    <main className="min-h-screen bg-[#090b0b] text-washi-50">
      <section className="border-b border-white/10 bg-[#101313] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="text-sm font-semibold text-kintsugi-300 transition hover:text-white"
          >
            Home
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div>
              <p className="luxury-kicker text-kintsugi-300">
                Global destination index
              </p>
              <h1 className="luxury-display mt-4 text-[clamp(3.2rem,8vw,7rem)] font-semibold leading-[0.95] text-white">
                {activePath?.title ?? "Browse countries and places"}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/68">
                {activePath?.note ??
                  "The global catalog is now wired into the app: every country and a broad place index are available for discovery while detailed pages are added destination by destination."}
              </p>
            </div>
            <div className="grid gap-3 rounded-[1.15rem] border border-white/12 bg-white/[0.06] p-5">
              <div>
                <p className="luxury-kicker text-white/44">Countries</p>
                <p className="mt-1 font-display text-4xl font-semibold text-white">
                  {formatNumber(countryCount)}
                </p>
              </div>
              <div>
                <p className="luxury-kicker text-white/44">Visible places</p>
                <p className="mt-1 font-display text-4xl font-semibold text-white">
                  {formatNumber(places.length)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-6">
          <div>
            <p className="luxury-kicker text-white/38">Activity</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {Object.entries(ACTIVITIES).map(([slug, item]) => (
                <Link
                  key={slug}
                  href={`/discover?activity=${slug}`}
                  className="rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm text-white/72 transition hover:border-kintsugi-300/60 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="luxury-kicker text-white/38">Feeling</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {Object.entries(FEELINGS).map(([slug, item]) => (
                <Link
                  key={slug}
                  href={`/discover?feel=${slug}`}
                  className="group relative min-h-[13rem] overflow-hidden rounded-[1.15rem] border border-white/16 bg-sumi-900 shadow-editorial-deep transition hover:-translate-y-1 hover:border-kintsugi-300/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kintsugi-300"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.34)_40%,rgba(0,0,0,.88))]" />
                  <div className="relative flex min-h-[13rem] flex-col justify-end p-5">
                    <p className="luxury-kicker text-kintsugi-300/86">Search by feeling</p>
                    <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-white">
                      {item.label}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/72">{item.strapline}</p>
                  </div>
                </Link>
              ))}
              <Link
                href="/discover"
                className="flex min-h-[13rem] flex-col justify-end rounded-[1.15rem] border border-white/16 bg-white/[0.055] p-5 text-white/72 transition hover:-translate-y-1 hover:border-kintsugi-300/70 hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kintsugi-300 xl:hidden"
              >
                <p className="luxury-kicker text-kintsugi-300/86">Reset</p>
                <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-white">
                  All places
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/62">Return to the full index.</p>
              </Link>
            </div>
            <Link
              href="/discover"
              className="mt-4 hidden w-fit rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm text-white/72 transition hover:border-kintsugi-300/60 hover:text-white xl:inline-flex"
            >
              All places
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[22rem_minmax(0,1fr)]">
          <aside className="rounded-[1.15rem] border border-white/12 bg-white/[0.045] p-5">
            <p className="luxury-kicker text-kintsugi-300/78">Countries</p>
            <div className="mt-5 grid gap-2">
              {matchingCountries.map((country) => (
                <Link
                  key={country.iso2}
                  href={`/discover?country=${country.iso2}`}
                  className="rounded-lg border border-white/8 bg-black/14 px-3 py-3 text-sm text-white/70 transition hover:border-kintsugi-300/50 hover:bg-white/[0.08] hover:text-white"
                >
                  <span className="block font-semibold text-white">{country.name}</span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-white/42">
                    {country.iso2} · {country.currency} ·{" "}
                    {activity
                      ? `${formatNumber(placeCountByCountry[country.iso2] ?? 0)} places`
                      : `${formatNumber(country.cityCount)} indexed places`}
                  </span>
                </Link>
              ))}
            </div>
          </aside>

          <div>
            <div className="mb-5">
              <div>
                <p className="luxury-kicker text-kintsugi-300/78">Places</p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-white">
                  {selectedCountry ? selectedCountry.name : "Global atlas"}
                </h2>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {places.map((place) => (
                <article
                  key={`${place.slug}-${place.kind}-${place.coordinates?.lat ?? ""}-${place.coordinates?.lon ?? ""}`}
                  className="rounded-[1rem] border border-white/10 bg-white/[0.045] p-4"
                >
                  <p className="font-display text-xl font-semibold text-white">{place.name}</p>
                  <p className="mt-1 text-sm text-white/56">
                    {place.countryName} · {place.kind}
                  </p>
                  {place.stateCode ? (
                    <p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/34">
                      {place.stateCode}
                    </p>
                  ) : null}
                  {place.coordinates ? (
                    <p className="mt-3 text-xs uppercase tracking-[0.14em] text-white/34">
                      {place.coordinates.lat.toFixed(2)}, {place.coordinates.lon.toFixed(2)}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>

            <p className="mt-8 max-w-3xl text-xs leading-6 text-white/38">
              {GLOBAL_CITY_DATA_ATTRIBUTION}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
