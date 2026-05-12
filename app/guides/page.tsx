import type { Metadata } from "next";
import { TravelIntelligencePage } from "@/components/guides/TravelIntelligencePage";

export const metadata: Metadata = {
  title: "Guides / Travel Intelligence",
  description:
    "Browse JOURNEE travel intelligence guides for Japan safety tips, etiquette, visa requirements, transport, packing lists, Kyoto hidden gems, and practical travel cost advice.",
};

export default function GuidesPage() {
  return <TravelIntelligencePage />;
}
