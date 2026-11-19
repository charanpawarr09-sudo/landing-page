import { pageMetadata } from "@/lib/seo";
import { RepairNoxPricing } from "@/components/landing-page/RepairNoxPricing";

export const metadata = pageMetadata("Pricing | RepairNox", "Compare RepairNox plans for independent repair shops. Essential is $29.99/month, Growth is $49.99/month, and Customized has pricing by quote.", "/pricing");

export default function PricingPage() {
  return <RepairNoxPricing />;
}
