import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm uppercase tracking-widest text-brand-600">
        Pilot · Tokyo, Japan
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
        Everything a traveler needs, in one place.
      </h1>
      <p className="mt-6 text-lg text-slate-600">
        Seasons and costs by month, visa rules for your citizenship, in-city
        transit, attractions with ticket links, restaurants ranked by real
        reviews, packing lists computed from your dates and activities, and
        more.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/country/japan"
          className="rounded-md bg-brand-600 px-5 py-3 text-white hover:bg-brand-700"
        >
          Explore Japan
        </Link>
        <Link
          href="/city/tokyo"
          className="rounded-md border border-slate-300 px-5 py-3 text-slate-900 hover:bg-slate-50"
        >
          Explore Tokyo
        </Link>
      </div>
      <p className="mt-16 text-xs text-slate-500">
        MVP scaffold · see{" "}
        <code className="rounded bg-slate-100 px-1 py-0.5">
          /root/.claude/plans/let-s-plan-a-travel-witty-cake.md
        </code>{" "}
        for the full plan.
      </p>
    </main>
  );
}
