import Link from "next/link";
import { notFound } from "next/navigation";
import { industries } from "@/content/industries";
import { pageMetadata } from "@/lib/seo";
import { ContentPage, ContentCta } from "@/components/landing-page/ContentPage";
import styles from "@/components/landing-page/content-page.module.css";

export const dynamicParams = false;
export function generateStaticParams() { return industries.map(({ slug }) => ({ slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const industry = industries.find(item => item.slug === slug);
  if (!industry) notFound();
  return pageMetadata(`${industry.title} | RepairNox`, industry.description, `/industries/${slug}`);
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = industries.find(item => item.slug === slug);
  if (!industry) notFound();
  return <ContentPage title={industry.title} description={industry.introduction} breadcrumb={[{ name: "Industries", path: "/industries" }, { name: industry.name, path: `/industries/${slug}` }]}>
    <div className={styles.body}>{industry.workflow.map(step => <section key={step.title} className={styles.section}><h2>{step.title}</h2><p>{step.text}</p></section>)}
      <section className={styles.section}><h2>Check the fit for your shop</h2><p>{industry.fit}</p></section>
      <section className={styles.section} aria-labelledby="questions-heading"><h2 id="questions-heading">Questions before you choose</h2><div className={styles.faq}>{industry.questions.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>
    </div>
    <ContentCta />
    <section className={styles.related}><h2>Prepare for your evaluation</h2><nav aria-label="Related repair shop resources"><Link href="/guides/repair-shop-intake-checklist" className={styles.inlineLink}>Repair intake checklist</Link><Link href="/guides/choose-repair-shop-software" className={styles.inlineLink}>How to choose repair shop software</Link><Link href="/industries" className={styles.inlineLink}>All industries</Link></nav></section>
  </ContentPage>;
}
