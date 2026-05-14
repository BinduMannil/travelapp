import type { Metadata } from "next";
import { StaysExperience } from "@/components/stays/StaysExperience";

export const metadata: Metadata = {
  title: "Stays / Hotels",
  description:
    "A premium Journee accommodation discovery experience for cinematic hotels, ryokans, villas, apartments, and solo traveler friendly stays.",
};

export default function StaysPage() {
  return <StaysExperience />;
}
