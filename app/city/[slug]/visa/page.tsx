import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCity,
  getCountryForCity,
  getVisaRuleset,
} from "@/lib/data/seed";
import { VisaPicker } from "@/components/city/VisaPicker";

export function generateMetadata(): Metadata {
  return {
    title: "Visa requirements",
    description:
      "Find the visa rule for your passport: visa-free, eVisa, or embassy application, with stay limits and official links.",
  };
}

export default async function VisaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  const countrySlug = getCountryForCity(slug);
  if (!city || !countrySlug) notFound();

  const ruleset = getVisaRuleset(countrySlug);
  if (!ruleset) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        ·{" "}
        <Link href={`/city/${slug}`} className="hover:underline">
          {city.name}
        </Link>{" "}
        · Visa for you
      </nav>
      <h1 className="mt-2 text-3xl font-semibold">
        Visa requirements for {city.name}
      </h1>
      <p className="mt-3 text-slate-600">
        Pick your passport below to see the current rule. Your selection is
        saved in this browser so we can personalise other pages (for example,
        which nearby cities need no extra visa).
      </p>

      <section className="mt-8">
        <VisaPicker
          rules={ruleset.rules}
          reviewedAt={ruleset.reviewed_at}
          officialSource={ruleset.official_source}
          disclaimer={ruleset.disclaimer}
        />
      </section>
    </main>
  );
}
