import { ImageResponse } from "next/og";

export const alt = "Serwis Komputerowy i GSM Kórnik";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080A0D",
          color: "#F5F7FA",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, color: "#38BDF8" }}>
          SERWIS KÓRNIK
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 68, fontWeight: 650, lineHeight: 1.05, letterSpacing: -1.5 }}>
            Serwis komputerowy i GSM w Kórniku
          </div>
          <div style={{ fontSize: 28, color: "#9CA3AF" }}>Komputery · Laptopy · Telefony</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
