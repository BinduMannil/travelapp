import { notFound, redirect } from "next/navigation";
import { isCityInCountry, routes } from "@/lib/routes";

export default async function CountryCityAliasPage({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}) {
  const { slug, city } = await params;
  if (!isCityInCountry(slug, city)) notFound();
  redirect(routes.city(city));
}

export function generateStaticParams() {
  return [
    { slug: "vietnam", city: "ho-chi-minh-city" },
    { slug: "vietnam", city: "hanoi" },
    { slug: "japan", city: "tokyo" },
  ];
}
