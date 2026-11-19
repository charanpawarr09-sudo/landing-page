import { ImageResponse } from "next/og";

export const alt = "RepairNox repair shop management software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#f3f8fc", color: "#102f49", fontFamily: "sans-serif" }}><div style={{ display: "flex", fontSize: 44, fontWeight: 700 }}>RepairNox</div><div style={{ display: "flex", maxWidth: 940, fontSize: 76, lineHeight: 1.08, letterSpacing: -3 }}>Your repair shop, in working order.</div><div style={{ display: "flex", fontSize: 27 }}>Repair tickets · Parts · Customers · Checkout</div></div>, size);
}
