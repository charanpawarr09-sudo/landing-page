import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDownToLine, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { TrialAction } from "@/components/trial-action";
import { guides } from "@/content/guides";
import { siteOrigin } from "@/lib/site-config";
import "../guide.css";

type GuidePageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((entry) => entry.slug === slug);
  if (!guide) notFound();

  const title = `${guide.title.replace(/\.$/, "")} | Repairnox Guides`;
  const canonical = siteOrigin ? new URL(`/guides/${guide.slug}/`, siteOrigin).href : undefined;

  return {
    title: { absolute: title },
    description: guide.description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      title,
      description: guide.description,
      type: "article",
      ...(canonical ? { url: canonical, images:[{url:`${siteOrigin}/social-preview.png`,width:1200,height:630,alt:'Repairnox — practical repair shop guides'}] } : {}),
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = guides.find((entry) => entry.slug === slug);
  if (!guide) notFound();

  const relatedGuides = guides.filter((entry) => entry.slug !== guide.slug);

  return (
    <SiteFrame>
      <main id="main-content" className="guide-page">
        <header className="container guide-header">
          <Link className="guide-back" href="/#resources"><ArrowLeft size={16} aria-hidden="true" />All shop guides</Link>
          <div className="guide-meta"><span className="eyebrow">{guide.category}</span><span>{guide.readTime}</span></div>
          <h1>{guide.title}</h1>
          <p className="guide-description">{guide.description}</p>
          <div className="guide-actions">
            <a className="button button-dark" href={`/resources/${guide.slug}.md`} download><ArrowDownToLine size={17} aria-hidden="true" />Download checklist <span className="guide-file-type">.md</span></a>
            <p>Read it here, or use your browser to print.</p>
          </div>
        </header>

        <div className="container guide-layout">
          <aside className="guide-sidebar" aria-label="Guide navigation">
            <p className="eyebrow">In this guide</p>
            <nav aria-label="On this page">
              <ol>
                {guide.sections.map((section, index) => <li key={section.heading}><a href={`#step-${index + 1}`}><span aria-hidden="true">0{index + 1}</span>{section.heading}</a></li>)}
              </ol>
            </nav>
            <p className="guide-sidebar-note">A practical routine to adapt to your own shop.</p>
          </aside>

          <article className="guide-article" aria-label={guide.title}>
            {guide.sections.map((section, index) => (
              <section id={`step-${index + 1}`} className="guide-section" aria-labelledby={`step-heading-${index + 1}`} key={section.heading}>
                <div className="guide-section-number" aria-hidden="true">0{index + 1}</div>
                <h2 id={`step-heading-${index + 1}`}>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.checklist ? (
                  <ul className="guide-checklist" aria-label={`${section.heading} checklist`}>
                    {section.checklist.map((item) => <li key={item}><Check size={16} strokeWidth={1.8} aria-hidden="true" /><span>{item}</span></li>)}
                  </ul>
                ) : null}
              </section>
            ))}
            <p className="guide-practice-note">Original practical guidance from Repairnox. Adapt it to your devices, team and shop policies; this is not a certification or compliance standard.</p>
          </article>
        </div>

        <section className="guide-related container" aria-labelledby="guide-related-heading">
          <div className="guide-related-heading"><p className="eyebrow">Keep your shop moving</p><h2 id="guide-related-heading">More practical guides.</h2></div>
          <div className="guide-related-grid">
            {relatedGuides.map((related) => (
              <Link className="guide-related-card" href={`/guides/${related.slug}/`} key={related.slug}>
                <span className="eyebrow">{related.category}</span><h3>{related.title}</h3><p>{related.description}</p><span className="guide-related-link">Read the guide<ArrowRight size={17} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="guide-bottom-cta container" aria-labelledby="guide-cta-heading">
          <div><p className="eyebrow">One connected workspace</p><h2 id="guide-cta-heading">See the repair journey in action.</h2><p>Explore a sample ticket from the front desk to pickup.</p></div>
          <div className="guide-bottom-actions"><Link className="button button-dark" href="/#workflow">Explore the demo<ArrowRight size={17} aria-hidden="true" /></Link><TrialAction label="Start Free Trial" className="button guide-trial-button" /><p className="guide-trial-note">Trial registration coming soon.</p></div>
        </section>
      </main>
    </SiteFrame>
  );
}
