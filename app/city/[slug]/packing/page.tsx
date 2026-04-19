import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCity, getClimate } from "@/lib/data/seed";
import { DEFAULT_RULES } from "@/lib/packing/rules";
import { PackingPlanner } from "@/components/packing/PackingPlanner";

export function generateMetadata(): Metadata {
  return {
    title: "Packing list",
    description:
      "A packing list computed from your travel dates, trip style, and planned activities — tuned to Tokyo's climate and culture.",
  };
}

export default async function PackingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const climate = getClimate(slug);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        ·{" "}
        <Link href={`/city/${slug}`} className="hover:underline">
          {city.name}
        </Link>{" "}
        · Packing list
      </nav>
      <h1 className="mt-2 text-3xl font-semibold">
        Packing for {city.name}
      </h1>
      <p className="mt-3 text-slate-600">
        Enter your dates, party size, and what you plan to do. The list updates
        live — essentials are highlighted, quantities scale with your trip
        length, and we only surface weather layers your forecast actually
        needs.
      </p>

      <section className="mt-8">
        <PackingPlanner climate={climate} rules={DEFAULT_RULES} />
      </section>

      <p className="mt-10 text-xs text-slate-500">
        Weather layers are driven by historical monthly averages — the day you
        arrive may vary. Check the live forecast the week before you travel.
      </p>
    </main>
  );
}
