import Link from "next/link";
import { industries } from "@/content/industries";
import { pageMetadata } from "@/lib/seo";
import { ContentPage, ContentCta } from "@/components/landing-page/ContentPage";
import styles from "@/components/landing-page/content-page.module.css";

export const metadata = pageMetadata("Repair Shop Software by Industry | RepairNox", "Explore RepairNox for phone, computer, automotive, and jewelry repair businesses. Compare shop workflows and discuss your specialist requirements.", "/industries");

export default function IndustriesPage() {
  return <ContentPage title="Repair shop software for your kind of work" description="Start with the everyday work your team shares: repair tickets, parts, customer records, and checkout. Then discuss the details specific to your industry." breadcrumb={[{ name: "Industries", path: "/industries" }]}>
    <div className={styles.grid}>{industries.map(industry => <article className={styles.card} key={industry.slug}><h2>{industry.name}</h2><p>{industry.description}</p><Link href={`/industries/${industry.slug}`}>Explore {industry.name.toLowerCase()} software</Link></article>)}</div>
    <ContentCta />
  </ContentPage>;
}
