import { notFound, redirect } from "next/navigation";
import { routes } from "@/lib/routes";

const EXPERIENCE_ACTIVITY_ALIASES: Record<string, string> = {
  "shibuya-food-culture-walk": "shibuya-food-culture-walk",
};

export default async function ExperienceAliasPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const activitySlug = EXPERIENCE_ACTIVITY_ALIASES[slug];
  if (!activitySlug) notFound();
  redirect(routes.activity(activitySlug));
}

export function generateStaticParams() {
  return [{ slug: "shibuya-food-culture-walk" }];
}
