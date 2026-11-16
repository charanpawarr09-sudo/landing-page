import type { ReactNode } from "react";
import { LandingHeader } from "./LandingHeader";
import { LandingFooter } from "./LandingFooter";
import { companyIdentifier, supportEmail } from "@/lib/marketing-contact";
import shared from "./landing-page.module.css";
import styles from "./information-pages.module.css";

export interface PolicySection { id: string; title: string; content: ReactNode }

export function PolicyPage({ title, introduction, sections }: { title: string; introduction: string; sections: PolicySection[] }) {
  return (
    <div className={shared.site} id="page-top" data-landing-page>
      <a href="#main-content" className={shared.skipLink}>Skip to content</a><LandingHeader />
      <main id="main-content" className={shared.container}>
        <header className={styles.pageIntro}><span className={shared.eyebrow}>repairnox.com</span><h1>{title}</h1><p>{introduction}</p><div className={styles.policyMeta}><span>{companyIdentifier}</span><span>Last updated: November 14, 2026</span></div></header>
        <div className={styles.policyGrid}>
          <aside className={styles.contents}><nav aria-label={`${title} contents`}><p>On this page</p><ol>{sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol></nav><p>Questions about this notice?<br /><a href={`mailto:${supportEmail}`}>{supportEmail}</a></p></aside>
          <article className={styles.policyBody} aria-label={title}>{sections.map(section => <section id={section.id} className={styles.policySection} key={section.id}><h2>{section.title}</h2>{section.content}</section>)}</article>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
