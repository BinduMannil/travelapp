export function AffiliateDisclosure({
  variant = "line",
}: {
  variant?: "line" | "inline";
}) {
  if (variant === "inline") {
    return (
      <span className="text-[11px] italic text-sumi-700">
        Affiliate link — we may earn a commission at no cost to you.
      </span>
    );
  }
  return (
    <p className="mt-4 rounded-md bg-washi-100 p-3 text-xs text-sumi-700">
      <strong className="font-semibold text-sumi-900">Transparency:</strong>{" "}
      Some of the links on Journee earn us a small commission when you book —
      at no extra cost to you. It never shapes our rankings or the price you
      pay, and we only feature providers we&rsquo;d use ourselves.
    </p>
  );
}
