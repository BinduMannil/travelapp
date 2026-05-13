import { notFound, redirect } from "next/navigation";
import { getPlaceOption } from "@/lib/destinations/countries";
import { routes } from "@/lib/routes";

export default async function CityAliasPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getPlaceOption(slug)) notFound();
  redirect(routes.city(slug));
}

export function generateStaticParams() {
  return [{ slug: "ho-chi-minh-city" }, { slug: "hanoi" }, { slug: "tokyo" }];
}
