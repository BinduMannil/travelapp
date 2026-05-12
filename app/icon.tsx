import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "radial-gradient(circle at 65% 20%, rgba(216,170,79,.3), transparent 30%), linear-gradient(135deg, #071010 0%, #020607 100%)",
          color: "#d8aa4f",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <svg width="330" height="330" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.7" opacity=".72" />
          <path d="M15 30c5.4-10.5 12.2-14.6 21-15" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 15v14.5c0 5.4 3.5 8.8 8.7 8.8 4.2 0 7.4-2.3 8.6-6" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 24h26M24 11v26" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity=".36" />
          <circle cx="36" cy="15" r="2.7" fill="currentColor" />
        </svg>
      </div>
    ),
    {
      ...size,
    },
  );
}
