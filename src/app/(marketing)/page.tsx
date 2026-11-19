import { RepairNoxLanding } from "@/components/landing-page/RepairNoxLanding";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Repair Shop Management Software | RepairNox", "Manage repair tickets, parts inventory, customers, and checkout in one workspace. Explore RepairNox for independent repair shops and discuss your free trial.", "/");

export default function MarketingPage() {
  return <RepairNoxLanding />;
}
