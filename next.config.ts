import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return [
      {
        source: "/explore",
        destination: "/discover",
        permanent: true,
      },
      {
        source: "/map",
        destination: "/atlas",
        permanent: true,
      },
      {
        source: "/country/japan/:path*",
        destination: "/country/vietnam",
        permanent: false,
      },
      {
        source: "/destination/kyoto",
        destination: "/country/vietnam",
        permanent: false,
      },
      {
        source: "/city/tokyo/:path*",
        destination: "/city/ho-chi-minh-city",
        permanent: false,
      },
      {
        source: "/city/kyoto/:path*",
        destination: "/city/hoi-an",
        permanent: false,
      },
      {
        source: "/city/osaka/:path*",
        destination: "/city/da-nang",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
