import type { Metadata } from "next";
import { NotificationsAlertsPage } from "@/components/alerts/NotificationsAlertsPage";

export const metadata: Metadata = {
  title: "Notifications & Alerts",
  description:
    "Manage JOURNEE travel alerts, price alerts, visa updates, weather alerts, safety alerts, trip reminders, and notification preferences.",
};

export default function AlertsPage() {
  return <NotificationsAlertsPage />;
}
