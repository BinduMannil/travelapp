/**
 * Legal pages follow the same JOURNEE rule as the rest of the app:
 * Montserrat only, with no alternate display families.
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
