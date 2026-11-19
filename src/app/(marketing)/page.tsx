import { RepairNoxLanding } from "@/components/landing-page/RepairNoxLanding";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { StructuredData } from "@/components/landing-page/StructuredData";

export const metadata = pageMetadata("RepairNox | Repair Shop Management Software", "Manage repair tickets, parts inventory, customers, and checkout in one workspace. Explore RepairNox for independent repair shops and discuss your free trial.", "/");

export default function MarketingPage() {
  return <>
    <RepairNoxLanding />
    <StructuredData data={{ "@context": "https://schema.org", "@type": "WebSite", "@id": `${siteUrl}/#website`, name: "RepairNox", alternateName: "repairnox.com", url: `${siteUrl}/`, inLanguage: "en", publisher: { "@id": `${siteUrl}/#organization` } }} />
  </>;
}
