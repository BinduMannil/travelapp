import type { Metadata } from "next";
import { JourneeSupportPage } from "@/components/support/JourneeSupportPage";

export const metadata: Metadata = {
  title: "Help & Support",
  description:
    "Find JOURNEE help articles, trip support, safety assistance, support tickets, and 24/7 travel support.",
};

export default function SupportPage() {
  return <JourneeSupportPage />;
}
