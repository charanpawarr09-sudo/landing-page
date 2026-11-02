import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteOrigin, assetPath } from '@/lib/site-config';

const geist = localFont({
  src: "../../public/fonts/geist-latin.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Repair Shop Software for Tickets, Inventory & POS | Repairnox",
  description:
    "One workspace for independent phone and computer repair shops. Explore how Repairnox connects repair tickets, technicians, parts inventory and POS checkout.",
  applicationName: 'Repairnox',
  ...(siteOrigin ? { metadataBase: new URL(siteOrigin), alternates: { canonical: siteOrigin + '/' } } : {}),
  robots: { index: Boolean(siteOrigin), follow: Boolean(siteOrigin) },
  openGraph: {
    title: 'Your repair shop. Working as one. | Repairnox',
    description: 'Repair tickets, technicians, parts and checkout. Explore one connected repair workflow.',
    siteName: 'Repairnox',
    type: 'website',
    locale: 'en_US',
    ...(siteOrigin ? { url: siteOrigin, images: [{url: `${siteOrigin}/social-preview.png`, width:1200, height:630, alt:'Repairnox — Your repair shop. Working as one.'}] } : {}),
  },
  twitter: { card: 'summary_large_image', title: 'Your repair shop. Working as one. | Repairnox', description: 'One workspace for independent repair shops. Explore the sample workflow.', ...(siteOrigin ? {images:[`${siteOrigin}/social-preview.png`]} : {}) },
  icons: { icon: { url: assetPath("/brand/repairnox-icon.svg"), type: "image/svg+xml" } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
