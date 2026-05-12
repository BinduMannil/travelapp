import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { VietnamFamousForPage } from "@/components/vietnam/VietnamCountryDetailPages";

export const metadata: Metadata = {
  title: "What Vietnam is famous for",
  description:
    "Vietnam travel identity guide covering coffee culture, tailoring, motorbike rhythm, coastline, karst landscapes, and activity choices.",
};

export default async function FamousForPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug !== "vietnam") notFound();
  return <VietnamFamousForPage />;
}
