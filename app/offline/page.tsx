import type { Metadata } from "next";
import { OfflineAccessPage } from "@/components/offline/OfflineAccessPage";

export const metadata: Metadata = {
  title: "Offline Maps / Downloads",
  description:
    "Manage JOURNEE offline maps, downloads, sync settings, storage, trips, guides, and saved routes.",
};

export default function OfflinePage() {
  return <OfflineAccessPage />;
}
