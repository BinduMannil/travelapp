import type { Metadata } from "next";
import { TravelRecordsPage } from "@/components/documents/TravelRecordsPage";

export const metadata: Metadata = {
  title: "Documents Vault / Travel Records | JOURNEE",
  description:
    "Securely organize passports, visas, tickets, insurance, receipts, vaccination records, and uploaded travel documents with JOURNEE.",
};

export default function DocumentsPage() {
  return <TravelRecordsPage />;
}
