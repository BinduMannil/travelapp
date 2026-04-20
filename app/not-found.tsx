import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-sumi-700">
        The page you&rsquo;re looking for doesn&rsquo;t exist yet.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
      >
        Back home
      </Link>
    </main>
  );
}
