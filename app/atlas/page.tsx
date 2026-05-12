import type { Metadata } from "next";
import { AtlasMapPage } from "@/components/atlas/AtlasMapPage";

export const metadata: Metadata = {
  title: "Atlas",
  description:
    "A cinematic exploration map for Japan's Kansai region with routes, local insights, and premium atlas tools.",
};

export default function AtlasPage() {
  return <AtlasMapPage />;
}
