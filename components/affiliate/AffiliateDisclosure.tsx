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
    <p className="mt-5 border-t border-white/12 pt-4 text-[11px] leading-5 text-white/58">
      <strong className="font-semibold text-white/76">Transparency:</strong>{" "}
      Some of the links on Journee earn us a small commission when you book —
      at no extra cost to you. It never shapes our rankings or the price you
      pay, and we only feature providers we&rsquo;d use ourselves.
    </p>
  );
}
