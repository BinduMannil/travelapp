import type { ReactNode } from "react";
import { affiliateUrl } from "@/lib/affiliates/links";
import type { PartnerKey } from "@/lib/affiliates/partners";

type Props = {
  href: string;
  /** Partner key, or "auto" to detect from the URL's domain. */
  partner?: PartnerKey | "auto";
  /** Optional source tag passed to partners that accept a sub-id. */
  source?: string;
  children: ReactNode;
  className?: string;
  /** If true, omit the "sponsored" rel flag. Use for non-commercial links. */
  nonSponsored?: boolean;
};

/**
 * Standardised outbound link for anything we might earn commission on.
 * Wraps `affiliateUrl()` and applies rel="sponsored noopener noreferrer"
 * plus target=_blank consistently, so we never forget FTC disclosure hygiene.
 */
export function AffiliateLink({
  href,
  partner = "auto",
  source,
  children,
  className,
  nonSponsored,
}: Props) {
  const tagged = affiliateUrl(partner, href, { source });
  return (
    <a
      href={tagged}
      target="_blank"
      rel={nonSponsored ? "noopener noreferrer" : "sponsored noopener noreferrer"}
      className={className}
    >
      {children}
    </a>
  );
}
