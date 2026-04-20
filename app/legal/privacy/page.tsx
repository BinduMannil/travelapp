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

      <div className="prose mt-8 max-w-none text-sumi-900 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2 [&_p]:leading-relaxed [&_p]:text-sm [&_li]:text-sm [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
        <p>
          {LEGAL.entityName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is the
          controller of personal data processed through {LEGAL.brand}. This
          policy explains what we collect, why, and your rights. We comply
          with the UAE Personal Data Protection Law (Federal Decree-Law No.
          45 of 2021) and apply equivalent rights for visitors from the EU
          (GDPR) and the UK (UK GDPR).
        </p>

        <h2>1. Data we collect</h2>
        <h3>Automatically when you browse</h3>
        <ul>
          <li>
            <strong>Technical logs</strong> — IP address, user agent, referrer,
            requested URL, timestamp. Kept for up to 30 days for security and
            debugging.
          </li>
          <li>
            <strong>Preferences (localStorage)</strong> — your chosen display
            currency, temperature unit, distance unit, citizenship selection
            for the visa page, and your cookie-consent decisions. Stored in
            your browser only.
          </li>
          <li>
            <strong>Analytics (only with your consent)</strong> — aggregated,
            anonymised stats about page views and clicks. No cross-site
            tracking.
          </li>
          <li>
            <strong>Affiliate click tracking (only with your consent)</strong>{" "}
            — when you click a partner link, we may append a tag identifying
            the click source (e.g. which page). The tag does not identify you.
          </li>
        </ul>
        <h3>When you submit something</h3>
        <ul>
          <li>
            <strong>Account data</strong> (if / when accounts are enabled) —
            email, display name, optional profile details.
          </li>
          <li>
            <strong>Content you post</strong> — reviews, tips, trip notes,
            photos. Processed for publication and moderation.
          </li>
          <li>
            <strong>Contact requests</strong> — if you email us, we process the
            email body and your address to reply.
          </li>
        </ul>

        <h2>2. How we use your data</h2>
        <ul>
          <li>To operate the service (serving pages, saving preferences).</li>
          <li>
            To improve the service (understanding which content is useful).
          </li>
          <li>To communicate with you about your account or requests.</li>
          <li>
            To comply with legal obligations, respond to lawful requests, and
            defend our rights.
          </li>
        </ul>
        <p>We do not sell personal data to anyone, ever.</p>

        <h2>3. Legal basis (GDPR / PDPL)</h2>
        <ul>
          <li>
            <strong>Consent</strong> — analytics and affiliate tagging (you
            opt in via the cookie banner).
          </li>
          <li>
            <strong>Contract</strong> — account features, processing a support
            request.
          </li>
          <li>
            <strong>Legitimate interest</strong> — security logging, fraud
            prevention, running the site.
          </li>
          <li>
            <strong>Legal obligation</strong> — tax records, lawful requests.
          </li>
        </ul>

        <h2>4. Cookies and similar technologies</h2>
        <p>
          We use four categories of cookies. You control three of them via the
          cookie banner; the fourth is strictly necessary.
        </p>
        <ul>
          <li>
            <strong>Essential</strong> — authentication, security, consent
            storage. Always on.
          </li>
          <li>
            <strong>Preferences</strong> — remembers currency, °C/°F, km/mi,
            citizenship.
          </li>
          <li>
            <strong>Analytics</strong> — anonymous usage stats. Off by default.
          </li>
          <li>
            <strong>Marketing / affiliate</strong> — partner-link tagging.
            Off by default.
          </li>
        </ul>
        <p>
          You can change your choices any time via the &ldquo;Cookie
          preferences&rdquo; link at the bottom of any page.
        </p>

        <h2>5. Who we share data with</h2>
        <p>We share data only with processors who help us run the service:</p>
        <ul>
          <li>
            <strong>Hosting</strong> — Vercel Inc. (USA), serves the website.
          </li>
          <li>
            <strong>Database &amp; auth</strong> (when enabled) — Supabase Inc.
            (USA/EU regions), stores account data.
          </li>
          <li>
            <strong>Exchange rates</strong> — Frankfurter (ECB data) for
            currency conversion. No personal data sent.
          </li>
          <li>
            <strong>Analytics</strong> — PostHog (EU-hosted) or equivalent, only
            after your consent.
          </li>
          <li>
            <strong>Error logging</strong> — Sentry (EU region), for diagnosing
            crashes.
          </li>
          <li>
            <strong>Affiliate partners</strong> — only when you click an
            outbound partner link. The partner will set its own cookies on its
            own domain under its own privacy policy.
          </li>
        </ul>

        <h2>6. International transfers</h2>
        <p>
          {LEGAL.entityName} is based in the UAE. Some processors are based in
          the United States or the EU. Where required by PDPL or GDPR, we rely
          on Standard Contractual Clauses or equivalent safeguards.
        </p>

        <h2>7. Retention</h2>
        <ul>
          <li>Technical logs: up to 30 days.</li>
          <li>Preferences: until you clear your browser or change them.</li>
          <li>
            Analytics: up to 14 months in anonymised form.
          </li>
          <li>Account data: while your account exists + 90 days after deletion (backup rotation).</li>
          <li>
            Support emails: up to 24 months, then deleted unless needed for a
            legal claim.
          </li>
        </ul>

        <h2>8. Your rights</h2>
        <p>You can at any time ask us to:</p>
        <ul>
          <li>Confirm what personal data we hold about you.</li>
          <li>Provide you a copy (data export).</li>
          <li>Correct inaccuracies.</li>
          <li>Delete your account and associated data.</li>
          <li>Restrict or object to specific processing.</li>
          <li>
            Withdraw consent at any time (doesn&rsquo;t affect lawfulness of
            prior processing).
          </li>
          <li>
            Lodge a complaint with the UAE Data Office or your local data
            protection authority.
          </li>
        </ul>
        <p>
          Send requests to{" "}
          <a
            href={`mailto:${LEGAL.privacyEmail}`}
            className="underline underline-offset-2"
          >
            {LEGAL.privacyEmail}
          </a>
          . We&rsquo;ll respond within 30 days.
        </p>

        <h2>9. Children</h2>
        <p>
          {LEGAL.brand} is not intended for children under 16. We do not
          knowingly collect personal data from children. If you believe a
          child has submitted data, contact us and we will delete it.
        </p>

        <h2>10. Security</h2>
        <p>
          We use HTTPS everywhere, encrypted databases, row-level security,
          least-privilege access, and routine log reviews. No system is perfectly
          secure; we will notify affected users and regulators of any breach
          as required by law.
        </p>

        <h2>11. Changes</h2>
        <p>
          We may update this policy. Material changes will be announced on this
          page with an updated &ldquo;Last reviewed&rdquo; date. Material
          changes that affect your rights will be communicated via the banner
          or email (if you have an account).
        </p>

        <h2>12. Contact</h2>
        <p>
          Data protection queries:{" "}
          <a
            href={`mailto:${LEGAL.privacyEmail}`}
            className="underline underline-offset-2"
          >
            {LEGAL.privacyEmail}
          </a>
          <br />
          Postal address: {LEGAL.registeredAddress}
        </p>
      </div>
    </main>
  );
}
