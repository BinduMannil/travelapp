import Link from "next/link";
import type { Metadata } from "next";
import { LEGAL, formatReviewedAt } from "@/lib/legal/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${LEGAL.brand} handles your data.`,
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-xs uppercase tracking-[0.25em] text-sumi-700">
        <Link href="/" className="hover:text-enji-600">
          Home
        </Link>{" "}
        · Legal · Privacy Policy
      </nav>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-sumi-900">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-sumi-700">
        Last reviewed: {formatReviewedAt()}
      </p>

      <div className="prose mt-8 max-w-none text-sumi-900 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2 [&_p]:leading-relaxed [&_p]:text-sm [&_li]:text-sm [&_ul]:list-none [&_ul]:pl-0 [&_ul]:space-y-1.5 [&_ul>li]:relative [&_ul>li]:pl-4 [&_ul>li]:before:content-['•'] [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-0 [&_ul>li]:before:text-sumi-500 [&_table]:text-sm [&_th]:text-left [&_th]:font-semibold [&_th]:py-2 [&_th]:pr-4 [&_td]:py-2 [&_td]:pr-4 [&_td]:align-top">
        <p>
          This Privacy Policy explains how {LEGAL.entityName}{" "}
          (&ldquo;<strong>we</strong>&rdquo;, &ldquo;<strong>us</strong>&rdquo;,
          &ldquo;<strong>our</strong>&rdquo;) — the operator of{" "}
          {LEGAL.brand} at {LEGAL.productUrl} — collects, uses, shares, stores,
          and protects personal data about visitors and users from anywhere in
          the world. Because {LEGAL.brand} is an online service accessible
          globally, we apply the protections of multiple data-protection
          regimes concurrently: the laws of the country where we are
          established (UAE) and the laws of the country where you are located
          when you use the service.
        </p>
        <p>
          We have written this policy to be <strong>extensive and globally
          valid</strong>. If a specific jurisdiction grants you rights that go
          beyond what is described below, those rights apply to you in
          addition to the baseline rights described here.
        </p>

        <h2>Quick summary</h2>
        <ul>
          <li>We do not sell, rent, or trade personal data. Ever.</li>
          <li>
            We only set non-essential cookies (analytics, affiliate tagging)
            if you have given consent via our cookie banner.
          </li>
          <li>
            Everything you can change is in{" "}
            <a href="/legal/privacy#rights" className="underline">your rights</a>;
            you can withdraw consent or delete your account at any time by
            emailing{" "}
            <a
              href={`mailto:${LEGAL.privacyEmail}`}
              className="underline underline-offset-2"
            >
              {LEGAL.privacyEmail}
            </a>
            .
          </li>
          <li>
            We respond to every rights request within 30 days (shorter if
            local law requires it).
          </li>
          <li>
            We are accountable to multiple regulators: the UAE Data Office,
            EU data protection authorities via our EU representative, and the
            UK ICO via our UK representative.
          </li>
        </ul>

        <h2>1. Who we are (controller)</h2>
        <p>
          {LEGAL.entityName} is a free-zone limited liability company
          registered in the United Arab Emirates under{" "}
          {LEGAL.tradeLicenseAuthority}. For the purposes of the EU and UK
          General Data Protection Regulations, Brazil&rsquo;s Lei Geral de
          Proteção de Dados (&ldquo;LGPD&rdquo;), California&rsquo;s CCPA /
          CPRA, and equivalent laws elsewhere, we are the{" "}
          <strong>controller</strong> of the personal data described below —
          except where we act as a <strong>processor</strong> on behalf of a
          third party, in which case that third party&rsquo;s privacy policy
          applies.
        </p>
        <p>
          Contact for any privacy matter:{" "}
          <a
            href={`mailto:${LEGAL.privacyEmail}`}
            className="underline underline-offset-2"
          >
            {LEGAL.privacyEmail}
          </a>
          .
        </p>

        <h2>2. Scope of this policy</h2>
        <p>This policy applies to personal data we process:</p>
        <ul>
          <li>When you visit any page of {LEGAL.brand}.</li>
          <li>
            When you use interactive features (currency preferences, citizenship
            selector, language picker, packing planner, trip builder, saved
            filter presets).
          </li>
          <li>When you create an account, sign in, or publish content.</li>
          <li>When you contact us by email or any other channel we operate.</li>
          <li>
            When you click on a partner / affiliate link we host. Note: once
            you land on the partner&rsquo;s own site, the partner&rsquo;s
            privacy policy — not ours — governs.
          </li>
        </ul>

        <h2>3. Categories of personal data we process</h2>
        <h3>3.1 Collected automatically</h3>
        <ul>
          <li>
            <strong>Technical &amp; server logs</strong> — IP address, user
            agent, referrer, requested URL, HTTP response code, timestamp,
            approximate country derived from IP. Retained up to 30 days for
            security, debugging, abuse prevention, and to defend the service
            against attacks.
          </li>
          <li>
            <strong>Device &amp; preference data (localStorage)</strong> —
            your chosen display currency, temperature and distance units,
            citizenship + residence selection for the visa page, language
            choice, cookie-consent state. Stored only in your browser; we do
            not read it server-side.
          </li>
          <li>
            <strong>Analytics (consent only)</strong> — aggregated,
            pseudonymised page-view and click counts. We use an analytics
            provider that does not cross-site track and does not share data
            with advertising networks.
          </li>
          <li>
            <strong>Affiliate attribution (consent only)</strong> — when you
            click an outbound partner link, we may append a query tag that
            identifies the source page (e.g. which article). This tag does
            not identify you personally, but may be associated with you by
            the partner under its own privacy policy.
          </li>
          <li>
            <strong>Crash / error data</strong> — if the site throws an
            error, we record a technical stack trace and the URL. We truncate
            or hash user input before it is sent to our error collector.
          </li>
        </ul>
        <h3>3.2 Provided by you</h3>
        <ul>
          <li>
            <strong>Account data</strong> (once accounts are enabled) — email
            address, a display name, password hash, optional profile data
            (home city, home currency, citizenship, residence).
          </li>
          <li>
            <strong>Authentication data</strong> — sign-in timestamps,
            IP/user-agent of sign-in for security, verification tokens.
          </li>
          <li>
            <strong>User-generated content</strong> — tips, reviews, trip
            notes, photos, votes. You are the author; we are the host.
          </li>
          <li>
            <strong>Support correspondence</strong> — the email you write to
            us and our reply. Kept while the matter is open plus 24 months.
          </li>
          <li>
            <strong>Payment data</strong> (if/when paid subscriptions
            launch) — processed by our payment provider (e.g. Stripe). We
            never see or store full card numbers; we retain only a last-4
            summary and the subscription state for tax and refund records.
          </li>
        </ul>
        <h3>3.3 Received from third parties</h3>
        <ul>
          <li>
            <strong>Affiliate networks</strong> report aggregated conversion
            counts (no personal data about you).
          </li>
          <li>
            <strong>Identity providers</strong> (if you sign in via Google,
            Apple, etc.) share your email and display name with us.
          </li>
        </ul>
        <h3>3.4 Data we never collect</h3>
        <p>
          We do not collect or process special-category data under Article 9
          GDPR (health, genetics, biometrics, religion, political opinion,
          trade-union membership, sexual orientation, racial or ethnic
          origin), and we do not collect precise geolocation, contact lists,
          SMS, or call logs.
        </p>

        <h2>4. Purposes of processing and legal bases</h2>
        <p>
          Under the GDPR, UK GDPR, UAE PDPL, and LGPD, every processing
          operation needs a lawful basis. The table below maps each purpose to
          its basis under GDPR / UK GDPR; equivalent bases apply under other
          regimes (see &sect; 5).
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Purpose</th>
                <th>Legal basis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Serving the website; maintaining security</td>
                <td>Legitimate interests (Art. 6(1)(f))</td>
              </tr>
              <tr>
                <td>Account creation, authentication, trip storage</td>
                <td>Performance of a contract (Art. 6(1)(b))</td>
              </tr>
              <tr>
                <td>Responding to your support email</td>
                <td>Legitimate interests / contract</td>
              </tr>
              <tr>
                <td>Analytics; affiliate click attribution</td>
                <td>Consent (Art. 6(1)(a))</td>
              </tr>
              <tr>
                <td>Abuse prevention, fraud detection, rate limiting</td>
                <td>Legitimate interests</td>
              </tr>
              <tr>
                <td>Tax records, accounting, responding to lawful requests</td>
                <td>Legal obligation (Art. 6(1)(c))</td>
              </tr>
              <tr>
                <td>Defending or bringing legal claims</td>
                <td>Legitimate interests</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Where we rely on legitimate interests we have conducted a three-part
          balancing test (purpose / necessity / balancing) and concluded our
          interests do not override your rights. You can request the balancing
          test by emailing{" "}
          <a href={`mailto:${LEGAL.privacyEmail}`} className="underline">
            {LEGAL.privacyEmail}
          </a>
          .
        </p>

        <h2 id="jurisdictions">5. Jurisdiction-specific notices</h2>

        <h3>5.1 European Economic Area &amp; United Kingdom (GDPR / UK GDPR)</h3>
        <ul>
          <li>
            <strong>Controller:</strong> {LEGAL.entityName}.
          </li>
          <li>
            <strong>EU Representative (Article 27 GDPR):</strong> appointed
            before any targeted processing of EU residents. Contact details
            will appear here and in the footer once in place. Until then,
            reach our privacy team at{" "}
            <a href={`mailto:${LEGAL.privacyEmail}`} className="underline">
              {LEGAL.privacyEmail}
            </a>
            .
          </li>
          <li>
            <strong>UK Representative (Article 27 UK GDPR):</strong> same.
          </li>
          <li>
            <strong>DPO:</strong> we are not required to appoint a statutory
            Data Protection Officer. Our privacy lead is reachable at the
            email above.
          </li>
          <li>
            <strong>Supervisory authority:</strong> you have the right to
            lodge a complaint with the data-protection authority of your
            country of residence. In the UK, this is the Information
            Commissioner&rsquo;s Office (ico.org.uk).
          </li>
        </ul>

        <h3>5.2 United States (California — CCPA / CPRA)</h3>
        <p>
          California residents have specific rights under the California
          Consumer Privacy Act (as amended by the CPRA):
        </p>
        <ul>
          <li>Right to know what personal information we collect and why.</li>
          <li>
            Right to access a copy of the personal information we hold about
            you.
          </li>
          <li>Right to delete personal information we have collected.</li>
          <li>Right to correct inaccurate personal information.</li>
          <li>
            Right to opt out of the &ldquo;sale&rdquo; or
            &ldquo;sharing&rdquo; of personal information. <strong>We do not
            sell or share personal information</strong> as those terms are
            defined under the CCPA / CPRA. We honour the Global Privacy
            Control (GPC) browser signal as an opt-out.
          </li>
          <li>Right to limit use of sensitive personal information.</li>
          <li>
            Right to non-discrimination — you will receive the same service
            and price whether or not you exercise a right.
          </li>
        </ul>
        <p>
          To exercise any CCPA / CPRA right, email{" "}
          <a href={`mailto:${LEGAL.privacyEmail}`} className="underline">
            {LEGAL.privacyEmail}
          </a>{" "}
          with &ldquo;California request&rdquo; in the subject. An authorised
          agent may submit a request on your behalf with a signed
          authorisation.
        </p>
        <p>
          Other US states with comprehensive privacy laws — Virginia, Colorado,
          Connecticut, Utah, Texas, Oregon, Delaware, Indiana, Iowa, Montana,
          New Jersey, New Hampshire, Kentucky, Tennessee, Minnesota, Rhode
          Island — grant substantially similar rights. We apply those rights
          to residents of those states.
        </p>

        <h3>5.3 Brazil (LGPD)</h3>
        <p>
          Under Lei nº 13.709/2018 you have rights to access, correct,
          anonymise, port, and delete personal data, to revoke consent, and
          to be informed about public and private entities with whom we share
          data. Our data-protection encarregado is reachable at{" "}
          <a href={`mailto:${LEGAL.privacyEmail}`} className="underline">
            {LEGAL.privacyEmail}
          </a>
          . You may also complain to the Autoridade Nacional de Proteção de
          Dados (ANPD).
        </p>

        <h3>5.4 Canada (PIPEDA and provincial laws)</h3>
        <p>
          We comply with the Personal Information Protection and Electronic
          Documents Act and equivalent provincial laws in Quebec (Law 25),
          Alberta (PIPA) and British Columbia (PIPA). You may complain to the
          Office of the Privacy Commissioner of Canada or your provincial
          commissioner.
        </p>

        <h3>5.5 United Arab Emirates (PDPL)</h3>
        <p>
          As a UAE-established entity we comply with Federal Decree-Law No.
          45 of 2021 concerning the Protection of Personal Data, and — where
          applicable — the DIFC Data Protection Law No. 5 of 2020 and the
          ADGM Data Protection Regulations 2021. Complaints may be lodged
          with the UAE Data Office.
        </p>

        <h3>5.6 Japan (APPI)</h3>
        <p>
          Japan&rsquo;s Act on the Protection of Personal Information applies
          to personal data about Japanese residents. You have rights of
          disclosure, correction, addition, deletion, suspension of use, and
          suspension of third-party provision under Articles 28–30 APPI.
        </p>

        <h3>5.7 Singapore (PDPA)</h3>
        <p>
          We comply with the Personal Data Protection Act 2012. You may
          withdraw consent, request access, and request correction. The
          Personal Data Protection Commission (PDPC) is the regulator.
        </p>

        <h3>5.8 Australia (Privacy Act 1988)</h3>
        <p>
          We comply with the 13 Australian Privacy Principles. You may
          complain to the Office of the Australian Information Commissioner
          (OAIC).
        </p>

        <h3>5.9 South Africa (POPIA)</h3>
        <p>
          We comply with the Protection of Personal Information Act 4 of
          2013. The Information Regulator supervises.
        </p>

        <h3>5.10 China (PIPL)</h3>
        <p>
          Where China&rsquo;s Personal Information Protection Law applies to
          you, we obtain separate consent for cross-border transfers as
          required, and we limit processing to purposes that are necessary
          and proportionate.
        </p>

        <h3>5.11 India (DPDP Act 2023)</h3>
        <p>
          We comply with the Digital Personal Data Protection Act, 2023.
          Rights are exercisable at{" "}
          <a href={`mailto:${LEGAL.privacyEmail}`} className="underline">
            {LEGAL.privacyEmail}
          </a>
          .
        </p>

        <h3>5.12 Türkiye (KVKK), South Korea (PIPA), Switzerland (revFADP)</h3>
        <p>
          Equivalent rights and procedures apply under Turkey&rsquo;s Kişisel
          Verilerin Korunması Kanunu, Korea&rsquo;s Personal Information
          Protection Act, and Switzerland&rsquo;s revised Federal Act on Data
          Protection. Complaints may be made to the relevant national
          authority.
        </p>

        <h2>6. Who we share personal data with (processors and partners)</h2>
        <p>
          We share only what is necessary, under written data-processing
          agreements that bind the recipient to confidentiality and to using
          the data solely for our instructions.
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Processor</th>
                <th>Function</th>
                <th>Region</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hosting provider (to be announced)</td>
                <td>Web hosting, CDN, edge functions</td>
                <td>Disclosed here once selected</td>
              </tr>
              <tr>
                <td>Supabase Inc.</td>
                <td>Database, authentication, storage (when enabled)</td>
                <td>EU / USA (region of our choice)</td>
              </tr>
              <tr>
                <td>Upstash</td>
                <td>Rate-limit counters, ephemeral caching</td>
                <td>EU</td>
              </tr>
              <tr>
                <td>PostHog (or equivalent)</td>
                <td>Consent-gated product analytics</td>
                <td>EU-hosted</td>
              </tr>
              <tr>
                <td>Sentry</td>
                <td>Error + crash monitoring</td>
                <td>EU</td>
              </tr>
              <tr>
                <td>Resend</td>
                <td>Transactional email (password reset, receipts)</td>
                <td>EU / USA</td>
              </tr>
              <tr>
                <td>Stripe</td>
                <td>Payment processing (subscriptions only)</td>
                <td>USA / EU</td>
              </tr>
              <tr>
                <td>Cloudflare</td>
                <td>DDoS protection, bot detection</td>
                <td>Global PoPs</td>
              </tr>
              <tr>
                <td>Google Places API</td>
                <td>Venue metadata enrichment (server-to-server)</td>
                <td>USA</td>
              </tr>
              <tr>
                <td>Exchange-rate APIs</td>
                <td>Currency conversion (no personal data sent)</td>
                <td>EU</td>
              </tr>
              <tr>
                <td>Affiliate partners</td>
                <td>Only if you click their link; see &sect; 7</td>
                <td>Various</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>We do not share personal data with advertising networks or data brokers.</p>

        <h2>7. Affiliate links and attribution</h2>
        <p>
          Some outbound links on {LEGAL.brand} include an attribution tag
          that lets the partner pay us a commission if you buy. Once you
          click through, you are on the partner&rsquo;s domain and the
          partner&rsquo;s privacy policy and cookies apply. We do not share
          your identity with the partner; the partner may still place its
          own cookies and receive the usual information your browser sends
          on any request.
        </p>

        <h2>8. Cookies &amp; similar technologies</h2>
        <p>
          Full detail is in our{" "}
          <a href="/legal/affiliate-disclosure" className="underline">
            affiliate disclosure
          </a>{" "}
          and the Cookie preferences dialog. Summary:
        </p>
        <ul>
          <li>
            <strong>Strictly necessary</strong> — load balancing, CSRF,
            session, consent state. Always on; no consent required.
          </li>
          <li>
            <strong>Preferences</strong> — currency, units, citizenship,
            language. Off by default; on once you change a preference.
          </li>
          <li>
            <strong>Analytics</strong> — consent-gated; can be withdrawn at
            any time via Cookie preferences.
          </li>
          <li>
            <strong>Marketing / affiliate</strong> — consent-gated; can be
            withdrawn at any time.
          </li>
        </ul>

        <h2>9. International transfers</h2>
        <p>
          Your personal data may be transferred to, and processed in,
          jurisdictions outside your country of residence, including the
          United States, European Union, United Kingdom, and United Arab
          Emirates. When we transfer personal data across borders we rely on:
        </p>
        <ul>
          <li>
            An adequacy decision of the European Commission or the UK
            government, where one exists (e.g. EU–UK, EU–Japan, UK–Japan,
            EU–Switzerland);
          </li>
          <li>
            Standard Contractual Clauses (SCCs) approved by the European
            Commission or the UK International Data Transfer Addendum, coupled
            with a transfer impact assessment;
          </li>
          <li>
            Binding Corporate Rules or other approved mechanisms where
            applicable;
          </li>
          <li>
            Explicit consent, for occasional transfers that do not fit the
            above.
          </li>
        </ul>

        <h2>10. Data retention</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Retention</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Server logs</td>
                <td>Up to 30 days, then purged</td>
              </tr>
              <tr>
                <td>Pseudonymised analytics</td>
                <td>Up to 14 months</td>
              </tr>
              <tr>
                <td>Preference data (localStorage)</td>
                <td>Until you clear it from your browser</td>
              </tr>
              <tr>
                <td>Account data</td>
                <td>
                  Life of the account + 90 days after deletion (backup
                  rotation)
                </td>
              </tr>
              <tr>
                <td>User-generated content</td>
                <td>Until you delete it or your account</td>
              </tr>
              <tr>
                <td>Support correspondence</td>
                <td>24 months</td>
              </tr>
              <tr>
                <td>Invoices &amp; financial records</td>
                <td>
                  Up to 10 years, as required by UAE tax law and applicable
                  local accounting rules
                </td>
              </tr>
              <tr>
                <td>Moderation &amp; audit logs</td>
                <td>5 years</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="rights">11. Your rights</h2>
        <p>Wherever you are, you have the right to:</p>
        <ul>
          <li>
            Be informed about what we collect and why (this document).
          </li>
          <li>Access a copy of the personal data we hold about you.</li>
          <li>Rectify inaccurate or incomplete data.</li>
          <li>Erase your data (&ldquo;right to be forgotten&rdquo;).</li>
          <li>Restrict or object to processing.</li>
          <li>Withdraw consent at any time.</li>
          <li>Port your data in a machine-readable format.</li>
          <li>
            Not be subject to a decision based solely on automated processing
            (we do not make such decisions).
          </li>
          <li>Lodge a complaint with your data-protection authority.</li>
        </ul>
        <p>
          To exercise any right, email{" "}
          <a href={`mailto:${LEGAL.privacyEmail}`} className="underline">
            {LEGAL.privacyEmail}
          </a>
          . We will verify your identity in a proportionate way and respond
          within 30 days (or sooner, where your local law requires). There is
          no charge, unless the request is manifestly unfounded or excessive.
        </p>

        <h2>12. Security</h2>
        <p>
          We implement technical and organisational measures appropriate to
          the risk, including: TLS 1.2+ on every connection, at-rest
          encryption for databases and backups, row-level security on tenant
          data, least-privilege access controls, short-lived credentials,
          dependency monitoring, vulnerability scanning, structured logging,
          and human review of security events. Vendors are selected in part on
          their security posture (SOC 2 / ISO 27001 where available) and
          access agreements (DPAs). No online service is perfectly secure;
          where a breach likely results in risk to you, we will notify you
          and the relevant authority without undue delay, in line with Article
          33 / 34 GDPR and equivalent provisions.
        </p>

        <h2>13. Children</h2>
        <p>
          {LEGAL.brand} is not directed to children under 16 (or the minimum
          age in your jurisdiction, whichever is higher). We do not knowingly
          collect data from children. If you believe a child has provided
          personal data to us, email{" "}
          <a href={`mailto:${LEGAL.privacyEmail}`} className="underline">
            {LEGAL.privacyEmail}
          </a>{" "}
          and we will delete it.
        </p>

        <h2>14. Automated decisions &amp; AI</h2>
        <p>
          We do not use personal data for automated decision-making that
          produces legal or similarly significant effects. Our AI features
          (e.g. the itinerary concierge) generate suggestions for you to
          accept, edit, or discard — they do not decide anything about you.
        </p>

        <h2>15. Changes to this policy</h2>
        <p>
          We will update this policy to reflect changes in the service or in
          the law. Material changes that affect your rights will be announced
          via an on-site banner and, for account holders, by email. The
          &ldquo;Last reviewed&rdquo; date at the top of this page will be
          updated on every change.
        </p>

        <h2>16. Contact</h2>
        <p>
          All privacy enquiries and rights requests:{" "}
          <a
            href={`mailto:${LEGAL.privacyEmail}`}
            className="underline underline-offset-2"
          >
            {LEGAL.privacyEmail}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
