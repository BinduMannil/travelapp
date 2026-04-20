import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCity, getPriceItems } from "@/lib/data/seed";
import { CostTable } from "@/components/money/CostTable";

export function generateMetadata(): Metadata {
  return {
    title: "Daily costs",
    description:
      "Typical prices for coffee, meals, transit, taxis, SIM cards and more, converted to your chosen currency.",
  };
}

export default async function CostsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const items = getPriceItems(slug);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        ·{" "}
        <Link href={`/city/${slug}`} className="hover:underline">
          {city.name}
        </Link>{" "}
        · Daily costs
      </nav>
      <h1 className="mt-2 text-3xl font-semibold">Daily costs — {city.name}</h1>
      <p className="mt-3 text-slate-600">
        Typical prices for common travel purchases, converted to the display
        currency you picked on the home page.
      </p>

      <section className="mt-6">
        <CostTable items={items} />
      </section>

      <p className="mt-10 text-xs text-slate-500">
        Prices are typical ranges for central Tokyo. Individual businesses vary
        — treat as a planning guide, not a guarantee.
      </p>
    </main>
  );
}
