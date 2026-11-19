import Link from "next/link";
import { guides } from "@/content/guides";
import { pageMetadata } from "@/lib/seo";
import { ContentPage, ContentCta } from "@/components/landing-page/ContentPage";
import styles from "@/components/landing-page/content-page.module.css";

export const metadata = pageMetadata("Repair Shop Management Guides | RepairNox", "Practical guides for repair shop intake, technician handoffs, and evaluating management software. Use clear checklists to plan your shop workflow.", "/guides");

export default function GuidesPage() {
  return <ContentPage title="Practical guides for the work behind the repair" description="Checklists and evaluation questions for the counter, the bench, and the person choosing your shop’s software." breadcrumb={[{ name: "Guides", path: "/guides" }]}>
    <div className={styles.grid}>{guides.map(guide => <article key={guide.slug} className={styles.card}><h2>{guide.title}</h2><p>{guide.description}</p><Link href={`/guides/${guide.slug}`}>Read the guide</Link></article>)}</div><ContentCta />
  </ContentPage>;
}
