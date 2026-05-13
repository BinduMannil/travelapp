import { notFound, redirect } from "next/navigation";
import { getCountryOption } from "@/lib/destinations/countries";
import { routes } from "@/lib/routes";

export default async function CountryAliasPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getCountryOption(slug)) notFound();
  redirect(routes.country(slug));
}

export function generateStaticParams() {
  return [{ slug: "vietnam" }, { slug: "japan" }];
}
