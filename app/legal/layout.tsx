/**
 * Legal pages share a single typographic rule: Montserrat only — no Noto
 * Serif JP display headings. The global stylesheet routes h1/h2 through
 * the display family for editorial pages, so we explicitly opt out here
 * with arbitrary variants on every heading level.
 */
export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-sans [&_h1]:!font-sans [&_h2]:!font-sans [&_h3]:!font-sans [&_h4]:!font-sans [&_h5]:!font-sans [&_h6]:!font-sans">
      {children}
    </div>
  );
}
