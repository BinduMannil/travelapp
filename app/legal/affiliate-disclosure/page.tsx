import Link from "next/link";
import type { Metadata } from "next";
import { LEGAL, formatReviewedAt } from "@/lib/legal/constants";
import { PARTNERS } from "@/lib/affiliates/partners";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: `How ${LEGAL.brand} earns commission from partner links.`,
};

export default function AffiliateDisclosurePage() {
  const partnersByCategory = Object.values(PARTNERS).reduce<
    Record<string, typeof PARTNERS[keyof typeof PARTNERS][]>
  >((acc, p) => {
    (acc[p.category] ??= []).push(p);
    return acc;
  }, {});

  const CATEGORY_LABEL: Record<string, string> = {
    lodging: "Hotels & stays",
    tours: "Tours, tickets & experiences",
    insurance: "Travel insurance",
    connectivity: "eSIM & mobile data",
    transfers: "Airport transfers",
    luggage: "Luggage storage",
    fx: "Money & FX cards",
    flights: "Flights",
    cars: "Rental cars",
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-xs uppercase tracking-[0.12em] text-sumi-700">
        <Link href="/" className="hover:text-enji-600">
          Home
        </Link>{" "}
        · Legal · Affiliate Disclosure
      </nav>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-sumi-900">
        Affiliate Disclosure
      </h1>
      <p className="mt-3 text-sm text-sumi-700">
        Last reviewed: {formatReviewedAt()}
      </p>

      <div className="prose mt-8 max-w-none text-sumi-900 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:leading-relaxed [&_p]:text-sm [&_li]:text-sm [&_ul]:list-none [&_ul]:pl-0 [&_ul]:space-y-1.5 [&_ul>li]:relative [&_ul>li]:pl-4 [&_ul>li]:before:content-['•'] [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-0 [&_ul>li]:before:text-sumi-500">
        <h2>How we make money</h2>
        <p>
          {LEGAL.brand} is free to read. To cover the cost of building it,
          we earn commission on some outbound links — when you click through
          to a partner (for example a hotel booking site) and complete a
          booking or purchase, the partner pays us a small commission.
          <strong> You never pay more than if you had gone directly.</strong>{" "}
          The price you see on the partner is the price you pay.
        </p>

        <h2>How we tag the links</h2>
        <p>
          Every affiliate link on this site:
        </p>
        <ul>
          <li>
            Carries <code>rel=&quot;sponsored noopener noreferrer&quot;</code>{" "}
            in the HTML so your browser, search engines, and screen readers
            all know it&rsquo;s commercial.
          </li>
          <li>
            Appends a standard partner-ID query parameter that identifies us
            as the referrer. We do not send personal data to the partner.
          </li>
          <li>
            Is visually styled so you can see which partner you are going to
            (button label names the partner).
          </li>
        </ul>

        <h2>Our editorial policy</h2>
        <ul>
          <li>
            Rankings and recommendations are editorial. They are never
            influenced by which partner pays a higher commission.
          </li>
          <li>
            We only feature partners we would use ourselves. If a partner we
            list goes downhill, we remove them, commission or no commission.
          </li>
          <li>
            Reviews and tips come from our own experience or from named
            community contributors (when user-generated content is enabled);
            they are never purchased or incentivised.
          </li>
          <li>
            Hotel listings are not ranked by commission. Attraction and
            restaurant rankings reflect editorial judgement, transparent
            quality signals, and traveler usefulness.
          </li>
        </ul>

        <h2>Partners we currently work with</h2>
        <p>
          We have (or are applying for) affiliate relationships with the
          following companies. Each partner operates under its own terms and
          privacy policy; clicking through takes you to the partner&rsquo;s
          website.
        </p>
        {Object.entries(partnersByCategory).map(([cat, partners]) => (
          <div key={cat}>
            <h3 className="font-semibold mt-4 mb-1">
              {CATEGORY_LABEL[cat] ?? cat}
            </h3>
            <ul>
              {partners.map((p) => (
                <li key={p.key}>{p.name}</li>
              ))}
            </ul>
          </div>
        ))}

        <h2>How to opt out</h2>
        <p>
          If you do not want outbound links to carry a partner-ID tag, choose
          &ldquo;Reject&rdquo; or un-tick &ldquo;Marketing / affiliate&rdquo;
          in the cookie preferences. Links will still work; they just won&rsquo;t
          identify us as the referrer, and we won&rsquo;t earn a commission
          on your bookings.
        </p>

        <h2>Regulatory context</h2>
        <p>
          This disclosure is made in line with the US FTC Endorsement Guides
          (16 CFR Part 255), the UK CMA guidance on online reviews and
          endorsements, the EU Unfair Commercial Practices Directive
          (2005/29/EC), and the UAE Advertising Standards. It is displayed on
          every page that contains affiliate links and in a short form next
          to each link group.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about the programme:{" "}
          <a
            href={`mailto:${LEGAL.legalEmail}`}
            className="underline underline-offset-2"
          >
            {LEGAL.legalEmail}
          </a>
        </p>
      </div>
    </main>
  );
}
