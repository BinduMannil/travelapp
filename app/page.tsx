import Link from "next/link";
import { PreferencesPanel } from "@/components/home/PreferencesPanel";
import { CoverTile } from "@/components/common/CoverTile";
import { NearbyStack, type NearbyCard } from "@/components/home/NearbyStack";
import {
  FlightCta,
  HotelCta,
  InsuranceCta,
} from "@/components/affiliate/AffiliateCtas";
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure";

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

// Fan of key Japan destinations — cities, towns, and UNESCO villages
// reachable from Tokyo without changing visa. Ordered loosely by distance
// from Tokyo so the stack flows from close-in day trips out to far-flung
// heritage sites. Each card deep-links to the matching row on the Nearby
// page; a few of the lesser-known ones will get their own city pages in
// a later content pass.
const NEARBY_STACK: NearbyCard[] = [
  { label: "Kamakura",     sublabel: "1h · JR Yokosuka · coastal temples",      palette: "ume",      kanji: "鎌", href: "/city/tokyo/nearby#kamakura" },
  { label: "Yokohama",     sublabel: "30m · JR Tokaido · Chinatown + bay",       palette: "ocean",    kanji: "横", href: "/city/tokyo/nearby#yokohama" },
  { label: "Hakone",       sublabel: "1h 25m · Romancecar · onsen + Fuji views", palette: "matcha",   kanji: "箱", href: "/city/tokyo/nearby#hakone" },
  { label: "Nikko",        sublabel: "1h 55m · Tobu SPACIA · shrines + waterfall", palette: "forest", kanji: "光", href: "/city/tokyo/nearby#nikko" },
  { label: "Mt Fuji",      sublabel: "2h · Chuo + bus · five lakes",             palette: "aizome",   kanji: "富", href: "/city/tokyo/nearby#mt-fuji" },
  { label: "Kyoto",        sublabel: "2h 20m · Shinkansen · imperial heritage",  palette: "enji",     kanji: "京", href: "/city/tokyo/nearby#kyoto" },
  { label: "Nara",         sublabel: "2h 40m · Shinkansen + JR · deer + Daibutsu", palette: "kintsugi", kanji: "奈", href: "/city/tokyo/nearby#nara" },
  { label: "Osaka",        sublabel: "2h 45m · Shinkansen · food capital",       palette: "kintsugi", kanji: "阪", href: "/city/tokyo/nearby#osaka" },
  { label: "Kobe",         sublabel: "3h · Shinkansen · wagyu + harbour",        palette: "ume",      kanji: "神", href: "/city/tokyo/nearby#kobe" },
  { label: "Kanazawa",     sublabel: "2h 30m · Hokuriku Shinkansen · samurai",   palette: "sumi",     kanji: "金", href: "/city/tokyo/nearby#kanazawa" },
  { label: "Takayama",     sublabel: "4h · Shinkansen + Wide-View Hida · Edo old town", palette: "forest", kanji: "高", href: "/city/tokyo/nearby#takayama" },
  { label: "Shirakawa-go", sublabel: "4h 45m · via Takayama · gassho villages",  palette: "washi",    kanji: "白", href: "/city/tokyo/nearby#shirakawa-go" },
  { label: "Matsumoto",    sublabel: "2h 45m · Azusa Limited Express · castle",  palette: "aizome",   kanji: "松", href: "/city/tokyo/nearby#matsumoto" },
  { label: "Hiroshima",    sublabel: "4h · Shinkansen · peace memorial",         palette: "enji",     kanji: "広", href: "/city/tokyo/nearby#hiroshima" },
  { label: "Miyajima",     sublabel: "4h 30m · via Hiroshima · floating torii",  palette: "enji",     kanji: "宮", href: "/city/tokyo/nearby#miyajima" },
  { label: "Sapporo",      sublabel: "1h 40m flight · Hokkaido winter capital",  palette: "aizome",   kanji: "札", href: "/city/tokyo/nearby#sapporo" },
  { label: "Sendai",       sublabel: "1h 30m · Tohoku Shinkansen · Date-era",    palette: "matcha",   kanji: "仙", href: "/city/tokyo/nearby#sendai" },
  { label: "Fukuoka",      sublabel: "1h 50m flight · Kyushu ramen + yatai",     palette: "enji",     kanji: "福", href: "/city/tokyo/nearby#fukuoka" },
  { label: "Beppu",        sublabel: "2h flight + local · 8 hells, onsen town",  palette: "kintsugi", kanji: "別", href: "/city/tokyo/nearby#beppu" },
  { label: "Naha (Okinawa)", sublabel: "2h 40m flight · subtropical islands",    palette: "sakura",   kanji: "沖", href: "/city/tokyo/nearby#naha" },
  { label: "Ise",          sublabel: "3h 20m · Kintetsu · grand shrine",         palette: "matcha",   kanji: "伊", href: "/city/tokyo/nearby#ise" },
];

const STATS: Array<{ value: string; label: string; sublabel: string; href: string }> = [
  { value: "12", label: "Attractions", sublabel: "Ranked by importance", href: "/city/tokyo/attractions" },
  { value: "12", label: "Restaurants", sublabel: "Google + Tabelog + Michelin", href: "/city/tokyo/restaurants" },
  { value: "10", label: "Onsen venues", sublabel: "With tattoo policies", href: "/city/tokyo/wellness" },
  { value: "35", label: "Visa passports", sublabel: "Official + stay limits", href: "/city/tokyo/visa" },
];

const PILOT_FEATURES: Array<{
  label: string;
  href: string;
  kanji: string;
  palette: Palette;
}> = [
  { label: "Attractions", href: "/city/tokyo/attractions", kanji: "寺", palette: "enji" },
  { label: "Restaurants", href: "/city/tokyo/restaurants", kanji: "食", palette: "kintsugi" },
  { label: "Neighborhoods", href: "/city/tokyo/neighborhoods", kanji: "街", palette: "aizome" },
  { label: "Hotels", href: "/city/tokyo/hotels", kanji: "宿", palette: "sumi" },
  { label: "Onsen & wellness", href: "/city/tokyo/wellness", kanji: "湯", palette: "enji" },
  { label: "Itineraries", href: "/city/tokyo/itinerary", kanji: "旅", palette: "matcha" },
  { label: "Packing list", href: "/city/tokyo/packing", kanji: "装", palette: "ume" },
  { label: "Daily costs", href: "/city/tokyo/costs", kanji: "円", palette: "ocean" },
];

const TIMELINE: Array<{
  days: string;
  title: string;
  body: string;
  href: string;
  palette: "enji" | "aizome" | "matcha" | "kintsugi" | "sumi";
  kanji: string;
}> = [
  {
    days: "Day 01",
    title: "Old Tokyo",
    body: "Sensō-ji at dawn, Nakamise snacks, river walk to Skytree. Closed out with Gonpachi.",
    href: "/city/tokyo/itinerary/first-timer-3-days",
    palette: "enji",
    kanji: "古",
  },
  {
    days: "Day 02",
    title: "Harajuku → Shibuya",
    body: "Meiji Jingū forest, Ura-Harajuku indie shops, AFURI ramen, Shibuya Sky at sunset.",
    href: "/city/tokyo/itinerary/first-timer-3-days",
    palette: "kintsugi",
    kanji: "渋",
  },
  {
    days: "Day 03",
    title: "Art + Ginza",
    body: "teamLab Planets, Tsukiji late morning, Ginza Chūō-dōri stroll, Michelin dinner.",
    href: "/city/tokyo/itinerary/first-timer-3-days",
    palette: "aizome",
    kanji: "銀",
  },
];

const INCLUDED: Array<{ title: string; body: string; kanji: string; href: string }> = [
  {
    title: "Visa for your passport",
    body: "35 citizenships indexed, with stay limits and official sources.",
    kanji: "旅",
    href: "/city/tokyo/visa",
  },
  {
    title: "Packing that fits your dates",
    body: "Tuned to Tokyo's climate + your planned activities + kids if any.",
    kanji: "装",
    href: "/city/tokyo/packing",
  },
  {
    title: "Airport → city",
    body: "N'EX, Skyliner, Keikyu, bus, taxi — all timed and priced.",
    kanji: "着",
    href: "/city/tokyo/arrival",
  },
  {
    title: "Tipping + payments",
    body: "No tipping here. And the method × venue acceptance matrix.",
    kanji: "円",
    href: "/city/tokyo/payments",
  },
];

const COUNTRY_FEATURES: Array<{
  label: string;
  kanji: string;
  href: string;
  hint: string;
}> = [
  { label: "Must-try cuisine", kanji: "食", href: "/country/japan/cuisine", hint: "12 dishes · origin · vegan notes" },
  { label: "Famous for", kanji: "和", href: "/country/japan/famous-for", hint: "Knives, whisky, anime, denim" },
  { label: "Tea, coffee & alcohol", kanji: "酒", href: "/country/japan/beverages", hint: "Sake, whisky, matcha, kissaten" },
  { label: "Languages", kanji: "語", href: "/country/japan/languages", hint: "All spoken, by share" },
];

export default function HomePage() {
  return (
    <main className="bg-washi-50">
      {/* HERO — sumi ground with crimson accent; editorial serif display */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-sumi-900" />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-enji-700/50 via-sumi-900 to-aizome-900/80"
          aria-hidden
        />
        <div
          className="absolute inset-0 -z-10 opacity-50 mix-blend-screen"
          style={{
            backgroundImage:
              "radial-gradient(circle at 22% 18%, rgba(234,186,89,.35), transparent 45%), radial-gradient(circle at 82% 8%, rgba(185,12,35,.55), transparent 55%), radial-gradient(circle at 58% 92%, rgba(46,79,115,.45), transparent 55%)",
          }}
          aria-hidden
        />
        {/* faint seigaiha wave texture */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 100%, rgba(255,255,255,.85) 0 26%, transparent 27%), radial-gradient(circle at 0% 100%, rgba(255,255,255,.85) 0 26%, transparent 27%), radial-gradient(circle at 100% 100%, rgba(255,255,255,.85) 0 26%, transparent 27%)",
            backgroundSize: "64px 32px",
          }}
          aria-hidden
        />

        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-20 text-washi-50 sm:pt-24 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          {/* Left — editorial type + CTA */}
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-washi-200/80">
              Travel companion · <span className="text-enji-100">東京</span> Tokyo pilot
            </p>
            <h1 className="mt-6 font-display text-[clamp(3rem,11vw,8.5rem)] font-bold leading-[0.9] tracking-tight">
              <span className="block text-washi-50">Tokyo.</span>
              <span className="mt-1 block font-display text-[0.42em] font-normal tracking-[0.3em] text-sakura-200">
                東 京
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-washi-50/85 sm:text-xl">
              Seasons, visas for your passport, transit passes, tipping,
              must-try dishes, onsen etiquette, packing tuned to your dates —
              ranked by people who&rsquo;ve actually been.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/city/tokyo"
                className="rounded-full bg-enji-600 px-7 py-3 font-semibold text-white shadow-xl shadow-enji-900/40 transition hover:bg-enji-700"
              >
                Explore Tokyo →
              </Link>
              <Link
                href="/country/japan"
                className="rounded-full border border-washi-50/40 px-7 py-3 font-medium text-washi-50 backdrop-blur transition hover:bg-washi-50/10"
              >
                About Japan
              </Link>
            </div>
          </div>

          {/* Right — nearby destinations fan (interactive) */}
          <div className="relative">
            <NearbyStack cards={NEARBY_STACK} />
          </div>
        </div>
      </section>

      {/* STATS — washi/gold glass pill bridging hero and body */}
      <section className="relative z-10 mx-auto -mt-12 max-w-6xl px-6">
        <div className="grid gap-3 rounded-3xl border border-washi-200 bg-washi-50/90 p-4 shadow-xl backdrop-blur sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
          {STATS.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="group flex items-center gap-4 rounded-2xl px-3 py-2 transition hover:bg-white"
            >
              <span className="font-display text-4xl font-bold tabular-nums bg-gradient-to-br from-enji-600 to-sumi-900 bg-clip-text text-transparent">
                {s.value}
              </span>
              <div>
                <div className="text-sm font-semibold text-sumi-900">
                  {s.label}
                </div>
                <div className="text-xs text-sumi-700">{s.sublabel}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PREFERENCES — washi card */}
      <section className="mx-auto mt-8 max-w-6xl px-6">
        <PreferencesPanel />
      </section>

      {/* MONETISATION STRIP — booking / flights / insurance one-liners */}
      <section className="mx-auto mt-6 max-w-6xl px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <HotelCta city="Tokyo" source="home-strip" />
          <FlightCta source="home-strip" />
          <InsuranceCta source="home-strip" />
        </div>
        <div className="mt-3">
          <AffiliateDisclosure />
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mt-20 bg-sumi-900 py-20 text-washi-50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between gap-6 border-b border-washi-50/10 pb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-washi-50/60">
                A first-timer&rsquo;s three days
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
                One city. Deep.
              </h2>
            </div>
            <Link
              href="/city/tokyo/itinerary"
              className="hidden rounded-full border border-washi-50/30 px-4 py-2 text-sm hover:bg-washi-50/10 sm:inline-block"
            >
              All itineraries →
            </Link>
          </div>

          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {TIMELINE.map((t) => (
              <li key={t.days} className="group">
                <div className="relative overflow-hidden rounded-2xl">
                  <CoverTile palette={t.palette} kanji={t.kanji} aspect="4/3" />
                  <span className="absolute right-4 top-4 rounded-full bg-sumi-900/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-washi-50 backdrop-blur-md">
                    {t.days}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm text-washi-50/80">{t.body}</p>
                <Link
                  href={t.href}
                  className="mt-3 inline-block text-sm font-semibold text-kintsugi-300 underline-offset-4 hover:underline"
                >
                  See day plan →
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FEATURE TILES — cover-style cards */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <header className="flex items-baseline justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sumi-700">
              Inside Tokyo
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              Jump straight in
            </h2>
          </div>
          <Link
            href="/city/tokyo"
            className="hidden text-sm font-semibold text-enji-600 hover:underline sm:inline"
          >
            All 25 sections →
          </Link>
        </header>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {PILOT_FEATURES.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group block overflow-hidden rounded-2xl border border-washi-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-enji-400 hover:shadow-lg"
            >
              <CoverTile palette={f.palette} kanji={f.kanji} aspect="3/2" />
              <div className="p-4">
                <div className="font-display text-base font-semibold text-sumi-900">
                  {f.label}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sumi-700">
            What&rsquo;s included
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            The tedious bits, done for you
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INCLUDED.map((i) => (
              <Link
                key={i.title}
                href={i.href}
                className="group flex flex-col rounded-2xl border border-washi-200 bg-washi-50 p-6 transition hover:-translate-y-0.5 hover:border-enji-400 hover:shadow-lg"
              >
                <span className="font-display text-4xl font-bold text-enji-600 transition group-hover:text-enji-700">
                  {i.kanji}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-sumi-900">
                  {i.title}
                </h3>
                <p className="mt-2 text-sm text-sumi-700">{i.body}</p>
                <div className="mt-4 text-sm font-semibold text-enji-600 group-hover:underline">
                  Open →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT JAPAN */}
      <section className="bg-washi-100 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sumi-700">
            About Japan · 日本について
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            Culture that shapes every trip
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {COUNTRY_FEATURES.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="group flex items-center gap-4 rounded-2xl border border-washi-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-enji-400 hover:shadow-lg"
              >
                <span className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-enji-600 to-sumi-900 font-display text-2xl font-bold text-white">
                  {f.kanji}
                </span>
                <div>
                  <div className="font-display font-semibold text-sumi-900">
                    {f.label}
                  </div>
                  <div className="text-xs text-sumi-700">{f.hint}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
