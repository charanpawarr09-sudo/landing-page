import type { Metadata } from "next";
import { RepairNoxLanding } from "@/components/landing-page/RepairNoxLanding";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "RepairNox | Software for Independent Repair Shops",
  description:
    "Keep repair tickets, parts inventory, customer records, and checkout together. RepairNox is practical shop management software for phone and computer repair teams.",
  openGraph: {
    title: "RepairNox | A Better Day at Your Repair Shop",
    description:
      "A practical workspace for repair tickets, parts, customers, checkout, and owner reporting.",
    type: "website",
  },
};

export default function MarketingPage() {
  return <RepairNoxLanding />;
}
