import type { Metadata } from "next";
import { AdminControlCenter } from "@/components/admin/AdminControlCenter";

export const metadata: Metadata = {
  title: "Admin Control Center",
  description:
    "Premium Journee admin dashboard for content review, platform activity, stale data, reported issues, and publishing queues.",
};

export default function AdminPage() {
  return <AdminControlCenter />;
}
