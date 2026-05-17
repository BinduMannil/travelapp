import type { Metadata } from "next";
import { AtlasMapPage } from "@/components/atlas/AtlasMapPage";

export const metadata: Metadata = {
  title: "Atlas",
  description:
    "A cinematic exploration map for Japan's Kansai region with routes, local insights, and premium atlas tools.",
};

export default async function AtlasPage({
  searchParams,
}: {
  searchParams?: Promise<{ city?: string; experience?: string }>;
}) {
  const params = searchParams ? await searchParams : undefined;

  return <AtlasMapPage citySlug={params?.city} experienceSlug={params?.experience} />;
}
