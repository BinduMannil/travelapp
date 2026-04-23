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
      Some links on Journee may earn us a small commission if you choose to
      book, at no additional cost to you. This never influences our rankings
      or pricing, and we only recommend providers we genuinely trust and
      would use ourselves.
    </p>
  );
}
