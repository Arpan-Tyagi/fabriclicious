import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 32, height: 32 };
export const generateImageMetadata = () => {
  return [
    { id: "16", size: { width: 16, height: 16 }, contentType: "image/png" },
    { id: "32", size: { width: 32, height: 32 }, contentType: "image/png" },
    { id: "512", size: { width: 512, height: 512 }, contentType: "image/png" }
  ];
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#8C7355", // Brass
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          {Array.from({ length: 10 }).map((_, i) => (
            <path
              key={i}
              d="M 12 12 Q 18 2 12 2 Q 6 2 12 12"
              fill="currentColor"
              fillOpacity={0.2}
              stroke="currentColor"
              strokeWidth={0.5}
              style={{ transform: `rotate(${i * 36}deg)`, transformOrigin: "12px 12px" }}
            />
          ))}
          <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth={0.5} />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
