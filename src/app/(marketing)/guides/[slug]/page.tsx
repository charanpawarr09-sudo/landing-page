import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "@/content/guides";
import { industries } from "@/content/industries";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { ContentPage, ContentCta } from "@/components/landing-page/ContentPage";
import { StructuredData } from "@/components/landing-page/StructuredData";
import styles from "@/components/landing-page/content-page.module.css";

export const dynamicParams = false;
export function generateStaticParams() { return guides.map(({ slug }) => ({ slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find(item => item.slug === slug);
  if (!guide) notFound();
  const title = slug === "repair-shop-intake-checklist" ? "Repair Intake Checklist for Repair Shops" : "How to Choose Repair Shop Software";
  return pageMetadata(`${title} | RepairNox`, guide.description, `/guides/${slug}`);
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find(item => item.slug === slug);
  if (!guide) notFound();
  const industry = industries.find(item => item.slug === guide.relatedIndustry)!;
  return <ContentPage title={guide.title} description={guide.introduction} breadcrumb={[{ name: "Guides", path: "/guides" }, { name: guide.title, path: `/guides/${slug}` }]}>
    <article className={styles.body}><p className={styles.byline}>By RepairNox · Published November 19, 2026</p>{guide.sections.map(section => <section className={styles.section} key={section.title}><h2>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.checklist ? <ul>{section.checklist.map(item => <li key={item}>{item}</li>)}</ul> : null}</section>)}</article>
    <ContentCta />
    <section className={styles.related}><h2>Continue exploring</h2><nav aria-label="Related resources"><Link href={`/industries/${industry.slug}`} className={styles.inlineLink}>{industry.title}</Link>{guides.filter(item => item.slug !== slug).map(item => <Link key={item.slug} href={`/guides/${item.slug}`} className={styles.inlineLink}>{item.title}</Link>)}</nav></section>
    <StructuredData data={{ "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, datePublished: "2026-11-19", dateModified: "2026-11-19", author: { "@type": "Organization", name: "RepairNox", url: `${siteUrl}/about` }, publisher: { "@id": `${siteUrl}/#organization` }, mainEntityOfPage: `${siteUrl}/guides/${slug}`, image: `${siteUrl}/opengraph-image` }} />
  </ContentPage>;
}
