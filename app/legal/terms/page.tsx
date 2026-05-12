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
      <nav className="text-xs uppercase tracking-[0.12em] text-sumi-700">
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

      <div className="prose mt-8 max-w-none text-sumi-900 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2 [&_p]:leading-relaxed [&_p]:text-sm [&_li]:text-sm [&_ul]:list-none [&_ul]:pl-0 [&_ul]:space-y-1.5 [&_ul>li]:relative [&_ul>li]:pl-4 [&_ul>li]:before:content-['•'] [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-0 [&_ul>li]:before:text-sumi-500">
        <p>
          {LEGAL.brand} is an independent editorial travel guide accessible
          worldwide. These Terms of Service (&ldquo;Terms&rdquo;) are a legal
          agreement between you and {LEGAL.entityName} (&ldquo;we&rdquo;,
          &ldquo;us&rdquo;, &ldquo;our&rdquo;). Because the service is used
          from many countries, these Terms are written to be{" "}
          <strong>globally valid</strong>: they give us a single baseline of
          rights and obligations, while reserving every mandatory consumer
          protection that your local law gives you.
        </p>
        <p>
          <strong>Mandatory consumer-rights carve-out:</strong> if you are a
          consumer resident in the European Economic Area, the United Kingdom,
          Switzerland, Australia, New Zealand, Japan, Brazil, Canada (including
          Quebec), the United Arab Emirates, or a US state with comprehensive
          consumer-protection law, nothing in these Terms limits a right or
          remedy that cannot be limited under that law. Where a clause below
          conflicts with a non-waivable consumer right you have, that clause
          is read down to the extent necessary to preserve that right.
        </p>

        <h2>1. Who we are</h2>
        <p>
          {LEGAL.brand} at {LEGAL.productUrl} is operated by{" "}
          <strong>{LEGAL.entityName}</strong>, a free-zone limited liability
          company registered with {LEGAL.tradeLicenseAuthority} in the United
          Arab Emirates. Contact: {" "}
          <a
            href={`mailto:${LEGAL.legalEmail}`}
            className="underline underline-offset-2"
          >
            {LEGAL.legalEmail}
          </a>
          .
        </p>

        <h2>2. Acceptance of these Terms</h2>
        <p>
          By accessing or using {LEGAL.brand} you agree to these Terms and to
          our{" "}
          <Link href="/legal/privacy" className="underline">
            Privacy Policy
          </Link>
          . If you do not agree, do not use the service. We may update these
          Terms; material changes are announced on this page with an updated
          &ldquo;Last reviewed&rdquo; date and, for account holders, by email.
          For consumers in jurisdictions requiring explicit re-acceptance of
          material changes (EEA, UK, Switzerland, Japan, Brazil), we will ask
          for it before the change takes effect for you.
        </p>

        <h2>3. Nature of the service</h2>
        <p>
          {LEGAL.brand} is an <strong>independent editorial travel guide</strong>.
          We publish curated information about destinations, attractions,
          accommodation, food, transit, visa, health, and related travel
          topics. The service is informational. We are not a travel agent,
          tour operator, hotelier, air carrier, insurance intermediary, or
          payment institution. We do not sell travel products directly and we
          do not act as your agent when you book with any third party. All
          reservations and purchases happen on third-party websites under
          those parties&rsquo; own terms.
        </p>

        <h2>4. No warranty on accuracy — verify before you travel</h2>
        <p>
          We put genuine effort into accuracy, but prices, opening hours,
          visa rules, medication restrictions, safety conditions, transit
          schedules, and accessibility details change frequently and often
          without notice. Travel information may be wrong, out of date, or
          incomplete.{" "}
          <strong>
            You must verify any critical detail — especially visa
            requirements, health and medication rules, legal restrictions,
            and safety guidance — with the relevant official authority
            before you travel.
          </strong>
        </p>
        <ul>
          <li>
            Visa and immigration information is illustrative. Consult the
            embassy or consulate of the country you are travelling to.
          </li>
          <li>
            Medication and health information is not medical advice. Consult
            a licensed physician and the destination country&rsquo;s health
            authority.
          </li>
          <li>
            Legal, tax, and customs information is not legal advice. Consult
            a qualified local professional.
          </li>
          <li>
            Financial information (currency, tipping, costs) is indicative
            only; exchange rates move and local prices vary.
          </li>
        </ul>

        <h2>5. Eligibility and age</h2>
        <p>
          You must be at least 16 years old, or the minimum age of digital
          consent in your jurisdiction if higher, to use {LEGAL.brand}. If
          you are under that age, do not use the service and do not create
          an account. Parents and guardians who believe a minor has used the
          service should contact{" "}
          <a
            href={`mailto:${LEGAL.privacyEmail}`}
            className="underline underline-offset-2"
          >
            {LEGAL.privacyEmail}
          </a>
          .
        </p>

        <h2>6. Accounts</h2>
        <p>
          Some features require an account. You must provide accurate
          information, keep your credentials confidential, and are
          responsible for activity under your account. Notify us promptly of
          any suspected unauthorised use. We may suspend or close accounts
          that violate these Terms, with notice where law requires it.
        </p>

        <h2>7. Paid subscriptions &amp; consumer withdrawal rights</h2>
        <p>
          If and when we offer paid subscriptions, these additional terms
          apply:
        </p>
        <ul>
          <li>
            Prices are displayed inclusive of applicable VAT / GST where
            required. The total payable is shown before purchase.
          </li>
          <li>
            For consumers resident in the EEA, UK, or Switzerland: you have a{" "}
            <strong>14-day right of withdrawal</strong> from the date of
            purchase. Note: if you choose to start accessing digital content
            immediately, you expressly consent and acknowledge that your
            right of withdrawal is lost under Article 16(m) of the EU
            Consumer Rights Directive (and equivalent UK and Swiss
            provisions) once content has been delivered. A model withdrawal
            form is available on request at{" "}
            <a
              href={`mailto:${LEGAL.legalEmail}`}
              className="underline underline-offset-2"
            >
              {LEGAL.legalEmail}
            </a>
            .
          </li>
          <li>
            For consumers in Australia, these Terms do not exclude or limit
            any consumer guarantee under the Australian Consumer Law.
          </li>
          <li>
            Japan: specific obligations under the Act on Specified Commercial
            Transactions are complied with; disclosures are available on
            request.
          </li>
          <li>
            You may cancel a subscription at any time; cancellation takes
            effect at the end of the then-current billing period.
          </li>
        </ul>

        <h2>8. Affiliate links and commercial relationships</h2>
        <p>
          Some outbound links on {LEGAL.brand} are affiliate links: we may
          earn a commission if you book, subscribe, or purchase via that
          link, at no extra cost to you. Affiliate relationships never
          change our rankings or editorial opinion. Full detail in our{" "}
          <Link
            href="/legal/affiliate-disclosure"
            className="underline underline-offset-2"
          >
            Affiliate Disclosure
          </Link>
          .
        </p>

        <h2>9. User-generated content</h2>
        <p>
          If we enable submissions (reviews, photos, tips, trip notes), you
          retain ownership of what you post. By submitting, you grant us a
          worldwide, non-exclusive, royalty-free, sublicensable, transferable
          licence to host, store, reproduce, translate, format, create
          derivative works of (only for display purposes, e.g. thumbnails,
          translations, excerpts), publish, perform, and distribute that
          content in connection with operating and promoting the service.
          The licence lasts while the content is publicly displayed and for
          a reasonable period afterwards to permit backup rotation and legal
          record-keeping.
        </p>
        <p>You warrant that each submission:</p>
        <ul>
          <li>Is your own original work or is properly licensed.</li>
          <li>
            Does not infringe any third party&rsquo;s intellectual property,
            privacy, publicity, moral, or other rights.
          </li>
          <li>
            Is not unlawful, defamatory, hateful, harassing, threatening,
            obscene, sexually explicit, or otherwise objectionable.
          </li>
          <li>
            Does not contain personal data about identifiable individuals
            without their informed consent.
          </li>
          <li>
            Does not promote illegal activity, terrorism, or pose a risk to
            public health or safety.
          </li>
          <li>
            Is not spam, a disguised advertisement, or intended to manipulate
            rankings or reviews.
          </li>
        </ul>
        <p>
          We may remove, edit, or refuse to publish any content at our
          discretion, and may cooperate with law-enforcement requests. We
          do not pre-review user content and publication is not an
          endorsement.
        </p>

        <h2>10. Intellectual property</h2>
        <p>
          All site software, text, curated data, design, typography, and
          graphics (excluding user-submitted content and third-party
          material) are owned by {LEGAL.entityName} or its licensors and
          protected by copyright, trademark, and other intellectual-property
          laws. Personal, non-commercial use is permitted. Scraping, bulk
          copying, automated harvesting, republication, framing, or
          redistribution is not, unless you have our prior written consent.
        </p>

        <h2>11. Copyright notices — DMCA &amp; global equivalents</h2>
        <p>
          We respect intellectual-property rights and respond to valid
          notices of infringement under the US Digital Millennium Copyright
          Act, the EU Digital Services Act (DSA), and equivalent laws
          elsewhere. To submit a notice, email{" "}
          <a
            href={`mailto:${LEGAL.legalEmail}`}
            className="underline underline-offset-2"
          >
            {LEGAL.legalEmail}
          </a>{" "}
          with &ldquo;Copyright notice&rdquo; in the subject and include:
        </p>
        <ul>
          <li>Your full name, address, and contact details.</li>
          <li>Identification of the copyrighted work you claim is infringed.</li>
          <li>The URL(s) of the allegedly infringing content on our site.</li>
          <li>
            A statement made in good faith that the use is not authorised by
            the rightsholder, its agent, or the law.
          </li>
          <li>
            A statement, under penalty of perjury (or equivalent), that your
            notice is accurate and that you are authorised to act for the
            rightsholder.
          </li>
          <li>Your physical or electronic signature.</li>
        </ul>
        <p>
          Counter-notices follow the same procedure. We may terminate the
          accounts of repeat infringers.
        </p>

        <h2>12. Third-party services and outbound links</h2>
        <p>
          When you click an outbound link (to a booking partner, insurance
          provider, official site, app store, etc.), you leave {LEGAL.brand}{" "}
          and become subject to that third party&rsquo;s terms and privacy
          practices. We have no control over third-party services and
          disclaim liability for anything that happens on them, to the
          extent permitted by law.
        </p>

        <h2>13. Prohibited uses</h2>
        <p>You must not:</p>
        <ul>
          <li>
            Attempt unauthorised access or interfere with the service&rsquo;s
            security or integrity.
          </li>
          <li>
            Automate access (scraping, crawling, cloning, AI ingestion at
            scale) beyond what a normal human visitor would do.
          </li>
          <li>Misrepresent your identity or affiliation in any submission.</li>
          <li>Use the service in violation of any applicable law or regulation.</li>
          <li>Frame, mirror, or republish the service on another site.</li>
          <li>
            Sell, resell, or commercially exploit access to the service
            without our written consent.
          </li>
          <li>
            Use the service in a jurisdiction subject to comprehensive
            sanctions by the United Nations, the European Union, the United
            Kingdom, the United States, or the United Arab Emirates.
          </li>
        </ul>

        <h2>14. Service availability</h2>
        <p>
          We aim for high availability but do not guarantee uninterrupted or
          error-free operation. We may suspend, modify, or discontinue any
          part of the service at any time, with reasonable notice where
          practicable. We are not liable for unavailability caused by
          maintenance, force majeure, or factors outside our reasonable
          control.
        </p>

        <h2>15. Disclaimer of warranties</h2>
        <p>
          The service is provided &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo;. To the maximum extent permitted by law, we
          disclaim all warranties — express, implied, statutory — including
          merchantability, fitness for a particular purpose, non-infringement,
          and any warranty that the service will be uninterrupted, error-free,
          secure, or free of harmful components.{" "}
          <strong>
            This clause does not exclude any warranty or guarantee that
            cannot lawfully be excluded in your jurisdiction (including the
            Australian Consumer Law, the EU Sale of Goods / Digital Content
            Directives, the UK Consumer Rights Act 2015, and similar laws).
          </strong>
        </p>

        <h2>16. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, neither {LEGAL.entityName}{" "}
          nor its directors, employees, contractors, or affiliates are liable
          for any indirect, incidental, special, consequential, exemplary, or
          punitive damages, or for any loss of profits, revenue, data,
          goodwill, or business opportunities, arising out of or in
          connection with your use of {LEGAL.brand}, including losses from
          reliance on travel information, booking errors made by third
          parties, travel disruption, personal injury, or loss of data.
        </p>
        <p>
          Subject to the mandatory consumer-law carve-out above, our total
          aggregate liability to you for any and all claims in any 12-month
          period is limited to the greater of (a) USD 100 or (b) the total
          amount you have paid us directly in that period.
        </p>
        <p>
          <strong>Nothing in these Terms limits or excludes</strong> our
          liability for death or personal injury caused by our negligence,
          for fraud or fraudulent misrepresentation, or for any liability
          that cannot lawfully be limited or excluded.
        </p>

        <h2>17. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless{" "}
          {LEGAL.entityName} and its personnel from and against any claim,
          liability, damage, loss, or expense (including reasonable legal
          fees) arising out of your breach of these Terms, your
          user-generated content, or your violation of any law or third-party
          right. This section does not apply to consumers to the extent
          prohibited by applicable consumer-protection law.
        </p>

        <h2>18. Force majeure</h2>
        <p>
          We are not liable for any delay or failure to perform resulting
          from causes outside our reasonable control, including acts of God,
          war, terrorism, pandemic, strikes, telecommunications failures,
          internet outages, or government action.
        </p>

        <h2>19. Accessibility</h2>
        <p>
          We aim to meet Web Content Accessibility Guidelines (WCAG) 2.1 AA.
          If you encounter a barrier or need an alternative format, contact{" "}
          <a
            href={`mailto:${LEGAL.supportEmail}`}
            className="underline underline-offset-2"
          >
            {LEGAL.supportEmail}
          </a>
          .
        </p>

        <h2>20. Governing law and dispute resolution</h2>
        <p>
          These Terms are governed by the laws of the United Arab Emirates,
          without regard to its conflict-of-laws rules. Subject to the
          consumer-rights carve-out above:
        </p>
        <ul>
          <li>
            <strong>Informal resolution first.</strong> Before filing any
            claim, please email{" "}
            <a
              href={`mailto:${LEGAL.legalEmail}`}
              className="underline underline-offset-2"
            >
              {LEGAL.legalEmail}
            </a>{" "}
            with a description of the issue. We will try to resolve it in
            good faith within 30 days.
          </li>
          <li>
            <strong>Mediation.</strong> If informal resolution fails, the
            parties will attempt mediation through a recognised
            international mediator before commencing formal proceedings.
          </li>
          <li>
            <strong>Consumer forum choice.</strong> If you are a consumer,
            you may bring a claim in the courts of your country of residence;
            the mandatory consumer-protection laws of your country apply.
          </li>
          <li>
            <strong>Other disputes.</strong> Commercial disputes are referred
            to the exclusive jurisdiction of the courts of the Dubai
            International Financial Centre (DIFC).
          </li>
        </ul>

        <h2>21. Class-action and jury-trial waiver (US users)</h2>
        <p>
          If you are a resident of the United States and you have a dispute
          with us that is not resolved informally, you agree that claims
          will be brought only in an individual capacity and not as part of
          any class, consolidated, or representative action, and you waive
          any right to a jury trial. You may opt out of this clause by
          emailing{" "}
          <a
            href={`mailto:${LEGAL.legalEmail}`}
            className="underline underline-offset-2"
          >
            {LEGAL.legalEmail}
          </a>{" "}
          within 30 days of first accepting these Terms, with &ldquo;Class
          action opt-out&rdquo; in the subject. Nothing in this section
          affects non-waivable rights.
        </p>

        <h2>22. Export control and sanctions</h2>
        <p>
          You represent that you are not located in, under the control of, or
          a national of any country subject to comprehensive sanctions by
          the UN, EU, UK, US, or UAE, and that you are not on any prohibited-party
          list maintained by those authorities.
        </p>

        <h2>23. Assignment, severability, entire agreement</h2>
        <p>
          You may not assign these Terms without our written consent. We may
          assign these Terms to an affiliate or successor in a merger,
          acquisition, or reorganisation. If any provision is held
          unenforceable, the remaining provisions remain in full force, and
          the unenforceable provision is replaced by an enforceable
          provision that reflects the original intent as closely as
          possible. These Terms, together with the Privacy Policy and
          Affiliate Disclosure, constitute the entire agreement between you
          and us.
        </p>

        <h2>24. Contact</h2>
        <p>
          Legal notices and questions:{" "}
          <a
            href={`mailto:${LEGAL.legalEmail}`}
            className="underline underline-offset-2"
          >
            {LEGAL.legalEmail}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
