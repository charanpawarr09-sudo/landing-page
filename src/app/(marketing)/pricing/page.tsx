import type { Metadata } from "next";
import { RepairNoxPricing } from "@/components/landing-page/RepairNoxPricing";

export const metadata: Metadata = {
  alternates: { canonical: "/pricing" },
  title: "Pricing | RepairNox",
  description: "Compare RepairNox plans for independent repair shops. Essential is $29.99/month, Growth is $49.99/month, and Customized has pricing by quote.",
  openGraph: {
    title: "Find your shop’s plan | RepairNox",
    description: "Compare plans for repair tickets, checkout, inventory, customers, and your team.",
    type: "website",
  },
};

export default function PricingPage() {
  return <RepairNoxPricing />;
}
