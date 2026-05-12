import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { VietnamCuisinePage } from "@/components/vietnam/VietnamCountryDetailPages";

export const metadata: Metadata = {
  title: "Vietnam food guide",
  description:
    "A Vietnam food guide covering pho, banh mi, bun cha, cao lau, regional food rhythms, and practical price cues.",
};

export default async function CuisinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug !== "vietnam") notFound();
  return <VietnamCuisinePage />;
}
