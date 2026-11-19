import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronDown, Mail, Monitor } from "lucide-react";
import { LandingHeader } from "@/components/landing-page/LandingHeader";
import { LandingFooter } from "@/components/landing-page/LandingFooter";
import { companyIdentifier, supportEmail } from "@/lib/marketing-contact";
import shared from "@/components/landing-page/landing-page.module.css";
import styles from "@/components/landing-page/information-pages.module.css";

export const metadata = pageMetadata("Support & Help | Repairnox", "Contact Repairnox support, request a demo or callback, and find answers about onboarding, data imports, hardware, and trials.", "/support");

const questions = [
  { question: "How long does a Repairnox live demo take?", answer: "Around 15–20 minutes, tailored to your shop’s specific workflow. We can focus on repair tickets, checkout, inventory, or the parts of the platform you want to understand." },
  { question: "Can I import my existing customer and inventory data?", answer: "Yes. Our team supports CSV/Excel imports during assisted onboarding. We’ll review your files and agree the fields, mapping, and scope before arranging the import. This is an onboarding service rather than an automatic website upload." },
  { question: "What hardware and printers does Repairnox support?", answer: "Repairnox runs on modern web browsers on tablets, laptops, and desktops, with standard thermal receipt and label-printer workflows. We’ll confirm your printer model, connection, and browser/driver setup during the demo or onboarding." },
  { question: "Is there a free trial after the demo?", answer: "Yes. Access credentials and sandbox trial environments are provisioned by our team following the demo. Trial access and any later paid subscription arrangements are discussed during onboarding." },
  { question: "How do I get emergency technical assistance?", answer: "Email dedicated support at support@repairnox.com with your ticket number, if available, your shop name, and a description of the issue and its impact. Support coverage is Monday–Friday, US Eastern Time. We typically respond within 24 business hours; this is not a 24/7 emergency service." },
] as const;

export default function SupportPage() {
  return (
    <div className={shared.site} id="page-top" data-landing-page>
      <a href="#main-content" className={shared.skipLink}>Skip to content</a><LandingHeader />
      <main id="main-content" className={shared.container}>
        <header className={styles.pageIntro}><span className={shared.eyebrow}>Support & Help</span><h1>Help for your repair shop</h1><p>Ask a question, plan your demo, or get help from the Repairnox team.</p></header>
        <section className={styles.supportTop} aria-label="Support and demo options">
          <article className={`${styles.supportCard} ${styles.supportCardDark}`}><Mail size={24} aria-hidden="true" /><h2>Talk to our support team</h2><a href={`mailto:${supportEmail}`} className={styles.supportEmail}>{supportEmail}<ArrowUpRight size={18} aria-hidden="true" /></a><p className={styles.responseTime}>We typically respond within 24 business hours.</p><p className={styles.coverage}>Monday–Friday · US Eastern Time (EST/EDT)</p><p>For an existing issue, include your ticket number and shop name so we can find the context.</p></article>
          <article className={styles.supportCard}><Monitor size={24} aria-hidden="true" /><h2>See Repairnox in your workflow</h2><p>Request a live demo or leave your preferred callback time. We’ll confirm availability with you.</p><ul><li><Check size={17} aria-hidden="true" />A 15–20 minute, shop-focused demo</li><li><Check size={17} aria-hidden="true" />Setup, import, and printer questions</li><li><Check size={17} aria-hidden="true" />Trial access arranged after your demo</li></ul><Link href="/contact?topic=demo" className={shared.button}>Request a demo or callback <ArrowUpRight size={17} aria-hidden="true" /></Link></article>
        </section>
        <section className={styles.supportFaq} aria-labelledby="support-questions"><h2 id="support-questions">Before you get started</h2><div className={shared.faqList}>{questions.map(({ question, answer }) => <details key={question}><summary>{question}<ChevronDown size={18} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></section>
        <p className={styles.supportIdentity}>{companyIdentifier} · <a href="https://repairnox.com">repairnox.com</a></p>
      </main>
      <LandingFooter />
    </div>
  );
}
