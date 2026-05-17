import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExperienceDetailBookingPage } from "@/components/experience/ExperienceDetailBookingPage";
import {
  getAllHiddenGemExperienceParams,
  getHiddenGemExperience,
} from "@/lib/city/hidden-gem-experiences";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; gem: string }>;
}): Promise<Metadata> {
  const { slug, gem } = await params;
  const experience = getHiddenGemExperience(slug, gem);

  if (!experience) {
    return {
      title: "Hidden gem",
    };
  }

  return {
    title: `${experience.gem.title} | ${experience.city.city}`,
    description: experience.data.experience.description,
  };
}

export default async function HiddenGemExperiencePage({
  params,
}: {
  params: Promise<{ slug: string; gem: string }>;
}) {
  const { slug, gem } = await params;
  const experience = getHiddenGemExperience(slug, gem);
  if (!experience) notFound();

  return <ExperienceDetailBookingPage data={experience.data} />;
}

export function generateStaticParams() {
  return getAllHiddenGemExperienceParams();
}
