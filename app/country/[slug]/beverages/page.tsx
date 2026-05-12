import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { VietnamBeveragesPage } from "@/components/vietnam/VietnamCountryDetailPages";

export const metadata: Metadata = {
  title: "Vietnam coffee, beer & street drinks",
  description:
    "Vietnam drink culture guide for phin coffee, iced milk coffee, egg coffee, bia hoi, sugarcane juice, and cafe routines.",
};

export default async function BeveragesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug !== "vietnam") notFound();
  return <VietnamBeveragesPage />;
}
