import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Travel companion",
    template: "%s — Travel companion",
  },
  description:
    "Everything about a country and city for travelers: seasons, costs, visas, attractions, restaurants, transit, packing, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
