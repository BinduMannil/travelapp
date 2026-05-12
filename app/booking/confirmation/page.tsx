import type { Metadata } from "next";
import { BookingConfirmationPage } from "@/components/booking/BookingConfirmationPage";

export const metadata: Metadata = {
  title: "Booking Confirmation Receipt",
  description:
    "View your confirmed JOURNEE booking receipt, payment details, hotel contact information, and next steps.",
};

export default function BookingConfirmationRoute() {
  return <BookingConfirmationPage />;
}
