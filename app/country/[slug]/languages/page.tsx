import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { VietnamLanguagesPage } from "@/components/vietnam/VietnamCountryDetailPages";

export const metadata: Metadata = {
  title: "Vietnamese language & phrasebook",
  description:
    "Vietnamese language and phrasebook guide for taxis, restaurants, bargaining, transport, cafes, and emergency phrases.",
};

export default async function LanguagesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug !== "vietnam") notFound();
  return <VietnamLanguagesPage />;
}
