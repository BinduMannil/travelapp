import Link from "next/link";
import type { Metadata } from "next";
import { LEGAL, formatReviewedAt } from "@/lib/legal/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing use of ${LEGAL.brand}.`,
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-xs uppercase tracking-[0.25em] text-sumi-700">
        <Link href="/" className="hover:text-enji-600">
          Home
        </Link>{" "}
        · Legal · Terms of Service
      </nav>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-sumi-900">
        Terms of Service
      </h1>
      <p className="mt-3 text-sm text-sumi-700">
        Last reviewed: {formatReviewedAt()}
      </p>

      <div className="prose mt-8 max-w-none text-sumi-900 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2 [&_p]:leading-relaxed [&_p]:text-sm [&_li]:text-sm [&_ul]:list-none [&_ul]:pl-0 [&_ul]:space-y-1.5 [&_ul>li]:relative [&_ul>li]:pl-4 [&_ul>li]:before:content-['•'] [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-0 [&_ul>li]:before:text-sumi-500">
        <h2>1. Who we are</h2>
        <p>
          This website ({LEGAL.brand} at {LEGAL.productUrl}) is operated by{" "}
          <strong>{LEGAL.entityName}</strong>, a company registered with{" "}
          {LEGAL.tradeLicenseAuthority} under trade licence number{" "}
          {LEGAL.tradeLicenseNumber}, with registered office at{" "}
          {LEGAL.registeredAddress}. References below to &ldquo;we&rdquo;,
          &ldquo;us&rdquo; or &ldquo;our&rdquo; mean {LEGAL.entityName}.
        </p>

        <h2>2. Acceptance of these terms</h2>
        <p>
          By accessing or using {LEGAL.brand} you agree to these Terms. If you
          do not agree, do not use the site. We may update these Terms from
          time to time; material changes will be announced on this page with
          an updated &ldquo;Last reviewed&rdquo; date. Continued use after an
          update constitutes acceptance.
        </p>

        <h2>3. Nature of the service</h2>
        <p>
          {LEGAL.brand} is an independent editorial travel guide. We publish
          curated information about destinations, attractions, accommodation,
          food, transit, visa, health, and related travel topics. The site is
          informational only. We are not a travel agent, we do not sell
          tickets, hotel rooms, flights, or tours directly, and we do not act
          as your agent when you make any booking. All reservations and
          purchases happen on third-party websites under their own terms.
        </p>

        <h2>4. No warranty on accuracy — verify before you travel</h2>
        <p>
          We put genuine effort into accuracy, but prices, opening hours,
          visa rules, medication restrictions, safety conditions, transit
          schedules, and accessibility details change frequently and often
          without notice. Travel information may be wrong, out of date, or
          incomplete. <strong>You must verify any critical detail —
          especially visa requirements, health and medication rules, legal
          restrictions, and safety guidance — with the relevant official
          authority before you travel.</strong>
        </p>
        <p>
          Specifically, and without limiting the above:
        </p>
        <ul>
          <li>
            Visa and immigration information is illustrative. Consult the
            embassy or consulate of the country you are travelling to.
          </li>
          <li>
            Medication and health information is not medical advice. Consult a
            licensed physician and the destination country&rsquo;s health
            authority.
          </li>
          <li>
            Legal, tax, and customs information is not legal advice. Consult a
            qualified local professional.
          </li>
        </ul>

        <h2>5. Affiliate links and commercial relationships</h2>
        <p>
          Some outbound links on {LEGAL.brand} are affiliate links, meaning we
          may earn a commission if you book, subscribe, or purchase via that
          link. You pay no more than if you had visited the partner directly.
          Affiliate relationships never change our rankings or editorial
          opinion. Every affiliate link carries a{" "}
          <code>rel=&quot;sponsored&quot;</code> attribute and the partner is
          named. See our full{" "}
          <Link
            href="/legal/affiliate-disclosure"
            className="underline underline-offset-2"
          >
            Affiliate Disclosure
          </Link>
          .
        </p>

        <h2>6. User accounts (when enabled)</h2>
        <p>
          Some features will require a user account. You are responsible for
          keeping your credentials confidential, for all activity under your
          account, and for notifying us of any suspected unauthorised use.
          You must be at least 16 years old (or the minimum legal age in your
          jurisdiction, whichever is higher) to create an account.
        </p>

        <h2>7. User-generated content</h2>
        <p>
          If we enable submissions (reviews, photos, blog posts, tips), you
          remain the owner of what you post. By posting, you grant us a
          worldwide, royalty-free, non-exclusive licence to display, format,
          translate, and promote that content in connection with the service.
        </p>
        <p>You agree not to submit content that:</p>
        <ul>
          <li>Is unlawful, defamatory, hateful, harassing, or obscene.</li>
          <li>Infringes intellectual property, privacy, or publicity rights.</li>
          <li>
            Contains personal data about identifiable individuals without their
            consent.
          </li>
          <li>
            Promotes illegal activity or poses a risk to public health or
            safety.
          </li>
          <li>
            Is spam, a disguised advertisement, or intended to manipulate
            rankings.
          </li>
        </ul>
        <p>
          We may remove content at our discretion and may cooperate with law
          enforcement. We are not obligated to pre-review user content, and
          publication is not an endorsement.
        </p>

        <h2>8. Intellectual property</h2>
        <p>
          All site software, text, curated data, design, and graphics
          (excluding user-submitted content and third-party material) are the
          property of {LEGAL.entityName} and protected by applicable IP laws.
          Personal non-commercial use is permitted. Scraping, bulk copying, or
          redistributing the content is not.
        </p>

        <h2>9. Third-party services</h2>
        <p>
          When you click an outbound link (to a booking partner, insurance
          provider, official site, etc.), you leave {LEGAL.brand} and become
          subject to that third party&rsquo;s terms and privacy practices. We
          have no control over third-party services and disclaim liability for
          anything that happens on them.
        </p>

        <h2>10. Prohibited uses</h2>
        <p>
          You must not: (a) attempt unauthorised access or interfere with the
          service&rsquo;s security, (b) automate access (scraping, crawling,
          cloning) beyond what a normal human can do, (c) misrepresent your
          identity in any submission, (d) use the site in violation of any
          applicable law, or (e) frame or mirror the service on another site.
        </p>

        <h2>11. Disclaimer of warranties</h2>
        <p>
          The service is provided &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo;. To the maximum extent permitted by law, we
          disclaim all warranties, express or implied, including merchantability,
          fitness for a particular purpose, non-infringement, and any warranty
          that the service will be uninterrupted, error-free, or free of
          harmful components.
        </p>

        <h2>12. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, {LEGAL.entityName} and its
          directors, employees, and affiliates are not liable for any indirect,
          incidental, consequential, or special damages arising out of or in
          connection with your use of {LEGAL.brand}, including but not limited
          to losses arising from reliance on travel information, booking errors
          made by third parties, travel disruption, personal injury, loss of
          profits, or loss of data.
        </p>
        <p>
          Where liability cannot be excluded, our total aggregate liability to
          you for any and all claims in a 12-month period is limited to the
          greater of (a) USD 100 or (b) the total amount you have paid us
          directly in that period.
        </p>

        <h2>13. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless {LEGAL.entityName} from any
          claim, liability, or expense (including reasonable legal fees)
          arising out of your breach of these Terms, your user-generated
          content, or your violation of any law or third-party right.
        </p>

        <h2>14. Governing law and jurisdiction</h2>
        <p>{LEGAL.governingLaw}</p>

        <h2>15. Contact</h2>
        <p>
          Legal questions:{" "}
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
