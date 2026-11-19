import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/landing-page/StructuredData";
import { pageMetadata, siteUrl } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...pageMetadata("RepairNox | Repair Shop Management Software", "Repair tickets, parts inventory, customer records, and checkout for independent repair businesses.", "/"),
  applicationName: "RepairNox",
  metadataBase: new URL(siteUrl),
  robots: { index: process.env.VERCEL_ENV !== "preview", follow: true },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body className="bg-[#f8fafc] text-slate-900 antialiased min-h-screen font-sans selection:bg-teal-100 selection:text-teal-900">
        {children}
        <StructuredData data={{ "@context": "https://schema.org", "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "RepairNox", url: siteUrl, logo: `${siteUrl}/marketing/repairnox-wordmark-display-2x.png`, parentOrganization: { "@type": "Organization", name: "Zonoha Group" } }} />
      </body>
    </html>
  );
}
