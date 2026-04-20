import Link from "next/link";
import { PreferencesPanel } from "@/components/home/PreferencesPanel";
import { CoverTile } from "@/components/common/CoverTile";

type Palette =
  | "rose"
  | "amber"
  | "emerald"
  | "sky"
  | "indigo"
  | "violet"
  | "fuchsia"
  | "teal"
  | "slate"
  | "orange";

const NEARBY_STACK: Array<{
  label: string;
  sublabel: string;
  palette: Palette;
  icon: string;
}> = [
  { label: "Kyoto", sublabel: "2h 20m · Shinkansen", palette: "amber", icon: "⛩️" },
  { label: "Osaka", sublabel: "2h 45m · Shinkansen", palette: "orange", icon: "🐙" },
  { label: "Hakone", sublabel: "1h 25m · Romancecar", palette: "teal", icon: "🗻" },
  { label: "Nikko", sublabel: "1h 55m · Tobu SPACIA", palette: "emerald", icon: "🏯" },
];

const STATS: Array<{ value: string; label: string; sublabel: string; href: string }> = [
  { value: "12", label: "Attractions", sublabel: "Ranked by importance", href: "/city/tokyo/attractions" },
  { value: "12", label: "Restaurants", sublabel: "Google + Tabelog + Michelin", href: "/city/tokyo/restaurants" },
  { value: "10", label: "Onsen venues", sublabel: "With tattoo policies", href: "/city/tokyo/wellness" },
  { value: "35", label: "Visa passports", sublabel: "Official + stay limits", href: "/city/tokyo/visa" },
];

const PILOT_FEATURES: Array<{ label: string; icon: string; href: string }> = [
  { label: "Attractions", icon: "⛩️", href: "/city/tokyo/attractions" },
  { label: "Restaurants", icon: "🍣", href: "/city/tokyo/restaurants" },
  { label: "Neighborhoods", icon: "🏙️", href: "/city/tokyo/neighborhoods" },
  { label: "Hotels", icon: "🏨", href: "/city/tokyo/hotels" },
  { label: "Onsen & wellness", icon: "♨️", href: "/city/tokyo/wellness" },
  { label: "Itineraries", icon: "🗺️", href: "/city/tokyo/itinerary" },
  { label: "Packing list", icon: "🎒", href: "/city/tokyo/packing" },
  { label: "Daily costs", icon: "💴", href: "/city/tokyo/costs" },
];

const TIMELINE: Array<{
  days: string;
  title: string;
  body: string;
  href: string;
  palette: "indigo" | "amber" | "emerald" | "fuchsia";
  icon: string;
}> = [
  {
    days: "Day 01",
    title: "Old Tokyo",
    body: "Sensō-ji at dawn, Nakamise snacks, river walk to Skytree. Closed out with Gonpachi.",
    href: "/city/tokyo/itinerary/first-timer-3-days",
    palette: "amber",
    icon: "⛩️",
  },
  {
    days: "Day 02",
    title: "Harajuku → Shibuya",
    body: "Meiji Jingū forest, Ura-Harajuku indie shops, AFURI ramen, Shibuya Sky at sunset.",
    href: "/city/tokyo/itinerary/first-timer-3-days",
    palette: "fuchsia",
    icon: "🏙️",
  },
  {
    days: "Day 03",
    title: "Art + Ginza",
    body: "teamLab Planets, Tsukiji late morning, Ginza Chūō-dōri stroll, Michelin dinner.",
    href: "/city/tokyo/itinerary/first-timer-3-days",
    palette: "indigo",
    icon: "🎨",
  },
];

const INCLUDED: Array<{ title: string; body: string; icon: string; href: string }> = [
  {
    title: "Visa for your passport",
    body: "35 citizenships indexed, with stay limits and official sources.",
    icon: "🛂",
    href: "/city/tokyo/visa",
  },
  {
    title: "Packing that fits your dates",
    body: "Tuned to Tokyo's climate + your planned activities + kids if any.",
    icon: "🎒",
    href: "/city/tokyo/packing",
  },
  {
    title: "Airport → city",
    body: "N'EX, Skyliner, Keikyu, bus, taxi — all timed and priced.",
    icon: "🚄",
    href: "/city/tokyo/arrival",
  },
  {
    title: "Tipping + payments",
    body: "No tipping here. And the method × venue acceptance matrix.",
    icon: "💴",
    href: "/city/tokyo/payments",
  },
];

const COUNTRY_FEATURES: Array<{ label: string; icon: string; href: string; hint: string }> = [
  { label: "Must-try cuisine", icon: "🍜", href: "/country/japan/cuisine", hint: "12 dishes · origin · vegan notes" },
  { label: "Famous for", icon: "🎎", href: "/country/japan/famous-for", hint: "Knives, whisky, anime, denim" },
  { label: "Languages", icon: "🈴", href: "/country/japan/languages", hint: "All spoken, by share" },
];

export default function HomePage() {
  return (
    <main className="bg-slate-50">
      {/* HERO — split layout: type + CTA on left, nearby photo stack on right */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-slate-950" />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600/75 via-fuchsia-600/60 to-rose-500/70"
          aria-hidden
        />
        <div
          className="absolute inset-0 -z-10 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 22%, rgba(255,255,255,.55), transparent 45%), radial-gradient(circle at 82% 10%, rgba(255,200,100,.45), transparent 50%), radial-gradient(circle at 60% 90%, rgba(255,100,180,.35), transparent 50%)",
          }}
          aria-hidden
        />

        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-20 text-white sm:pt-24 lg:grid-cols-[1.2fr_1fr] lg:gap-8 lg:pb-20">
          {/* Left: type + CTA */}
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">
              Travel companion · Tokyo pilot
            </p>
            <h1 className="mt-4 text-[clamp(3rem,11vw,8rem)] font-bold leading-[0.95] tracking-tight">
              <span className="bg-gradient-to-r from-white via-amber-100 to-pink-100 bg-clip-text text-transparent">
                TOKYO.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
              Seasons, visas for your passport, transit passes, tipping,
              must-try dishes, onsen etiquette, packing tuned to your dates —
              ranked by people who&rsquo;ve actually been.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/city/tokyo"
                className="rounded-full bg-white px-6 py-3 font-medium text-slate-900 shadow-xl shadow-black/20 transition hover:bg-slate-100"
              >
                Explore Tokyo →
              </Link>
              <Link
                href="/country/japan"
                className="rounded-full border border-white/40 px-6 py-3 font-medium text-white backdrop-blur transition hover:bg-white/10"
              >
                About Japan
              </Link>
            </div>
          </div>

          {/* Right: nearby destinations photo stack */}
          <div className="relative">
            <div className="flex items-center justify-between border-b border-white/15 pb-3 text-xs uppercase tracking-[0.25em] text-white/60">
              <span>Nearby · on the same visa</span>
              <span className="tabular-nums">
                01<span className="text-white/30">/04</span>
              </span>
            </div>
            <div className="relative mt-5">
              {NEARBY_STACK.map((d, i) => (
                <Link
                  key={d.label}
                  href="/city/tokyo/nearby"
                  className="group absolute left-0 top-0 block aspect-[3/4] w-[62%] overflow-hidden rounded-2xl ring-1 ring-white/20 shadow-2xl shadow-black/30 transition hover:-translate-y-1"
                  style={{
                    transform: `translateX(${i * 28}%) translateY(${i * 10}px) rotate(${(i - 1.5) * 2}deg)`,
                    zIndex: NEARBY_STACK.length - i,
                  }}
                >
                  <CoverTile
                    palette={d.palette}
                    icon={d.icon}
                    aspect="3/2"
                    className="!aspect-[3/4]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4">
                    <div className="text-xs uppercase tracking-widest text-white/70">
                      Same-visa day trip
                    </div>
                    <div className="mt-1 text-xl font-semibold text-white">
                      {d.label}
                    </div>
                    <div className="text-xs text-white/75">{d.sublabel}</div>
                  </div>
                </Link>
              ))}
              {/* Spacer to size the stacked cards' container */}
              <div className="invisible aspect-[3/4] w-[62%]" />
            </div>
          </div>
        </div>
      </section>

      {/* STATS CHIPS — glassmorphism pills that bridge the hero and body */}
      <section className="relative z-10 mx-auto -mt-12 max-w-6xl px-6">
        <div className="grid gap-3 rounded-3xl border border-white/40 bg-white/70 p-4 shadow-xl backdrop-blur sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
          {STATS.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="group flex items-center gap-4 rounded-2xl px-3 py-2 transition hover:bg-white/90"
            >
              <span className="tabular-nums text-3xl font-semibold bg-gradient-to-br from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">
                {s.value}
              </span>
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  {s.label}
                </div>
                <div className="text-xs text-slate-600">{s.sublabel}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PREFERENCES — glassy panel */}
      <section className="mx-auto mt-8 max-w-6xl px-6">
        <PreferencesPanel />
      </section>

      {/* TIMELINE — numbered dark storytelling section */}
      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                A first-timer&rsquo;s three days
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                One city. Deep.
              </h2>
            </div>
            <Link
              href="/city/tokyo/itinerary"
              className="hidden rounded-full border border-white/30 px-4 py-2 text-sm hover:bg-white/10 sm:inline-block"
            >
              All itineraries →
            </Link>
          </div>

          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {TIMELINE.map((t) => (
              <li key={t.days} className="group">
                <div className="relative overflow-hidden rounded-2xl">
                  <CoverTile palette={t.palette} icon={t.icon} aspect="4/3" />
                  <span className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                    {t.days}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm text-white/75">{t.body}</p>
                <Link
                  href={t.href}
                  className="mt-3 inline-block text-sm text-amber-200 underline underline-offset-4 hover:text-amber-100"
                >
                  See day plan →
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FEATURE TILES — "Jump straight in" */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <header className="flex items-baseline justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Inside Tokyo
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Jump straight in
            </h2>
          </div>
          <Link
            href="/city/tokyo"
            className="hidden text-sm text-brand-600 hover:underline sm:inline"
          >
            All 25 sections →
          </Link>
        </header>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {PILOT_FEATURES.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-lg"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-2xl transition group-hover:from-brand-100 group-hover:to-fuchsia-100">
                {f.icon}
              </span>
              <div className="font-medium text-slate-900">{f.label}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            What&rsquo;s included
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            The tedious bits, done for you
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INCLUDED.map((i) => (
              <Link
                key={i.title}
                href={i.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-lg"
              >
                <div className="text-3xl">{i.icon}</div>
                <h3 className="mt-3 font-semibold">{i.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{i.body}</p>
                <div className="mt-3 text-sm text-brand-600 group-hover:underline">
                  Open →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT JAPAN */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            About Japan
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Culture that shapes every trip
          </h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {COUNTRY_FEATURES.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 hover:border-brand-400 hover:shadow-lg"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-100 to-fuchsia-100 text-2xl">
                  {f.icon}
                </span>
                <div>
                  <div className="font-medium text-slate-900">{f.label}</div>
                  <div className="text-xs text-slate-500">{f.hint}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
