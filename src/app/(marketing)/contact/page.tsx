import { pageMetadata } from "@/lib/seo";
import { randomUUID } from "node:crypto";
import Link from "next/link";
import { ArrowUpRight, MessageSquare, Monitor, ReceiptText } from "lucide-react";
import { LandingHeader } from "@/components/landing-page/LandingHeader";
import { LandingFooter } from "@/components/landing-page/LandingFooter";
import { ContactForm } from "@/components/landing-page/ContactForm";
import { RevealHeading } from "@/components/landing-page/RevealHeading";
import { HeadlineReveals } from "@/components/landing-page/HeadlineReveals";
import shared from "@/components/landing-page/landing-page.module.css";
import styles from "@/components/landing-page/contact-page.module.css";

export const metadata = pageMetadata("Contact us | RepairNox", "Talk to RepairNox about your repair shop, a free trial, plan pricing, or your setup requirements.", "/contact");

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ topic?: string | string[] }> }) {
  const { topic } = await searchParams;
  const initialTopic = topic === "advanced" ? "Advanced plan" : topic === "trial" || topic === "demo" ? "Free trial" : "Product question";
  return (
    <div className={shared.site} id="page-top" data-landing-page>
      <a href="#main-content" className={shared.skipLink}>Skip to content</a><LandingHeader />
      <main id="main-content" className={`${shared.container} ${styles.contactGrid}`}>
        <section className={styles.copy} aria-labelledby="contact-heading">
          <span className={shared.eyebrow}>Contact RepairNox</span>
          <RevealHeading as="h1" id="contact-heading" lines={["Let’s talk about", "your repair shop"]} />
          <p>Choosing software for your repair shop? Tell us what you need, ask about a plan, or discuss a particular setup.</p>
          <div className={styles.contactReasons}>
            <div><MessageSquare size={20} aria-hidden="true" /><div><h2>Questions about the platform</h2><p>Talk through repair tickets, inventory, checkout, and your team’s workflow.</p></div></div>
            <div><ReceiptText size={20} aria-hidden="true" /><div><h2>Plans & manual payments</h2><p>Discuss the right plan for your shop. Paid-plan payments are arranged directly with our team.</p></div></div>
            <div><Monitor size={20} aria-hidden="true" /><div><h2>A demo, then a trial</h2><p>Request a 15–20 minute demo tailored to your workflow. Our team arranges trial credentials and sandbox access afterwards.</p></div></div>
          </div>
          <Link href="#contact-form" className={shared.textLink}>Request a demo <ArrowUpRight size={18} aria-hidden="true" /></Link>
          <p className={styles.contactNote}>Already have a question in mind? Use the form and we’ll reply to the details you provide.</p>
        </section>
        <section id="contact-form" className={styles.formPanel} aria-label="Contact RepairNox"><ContactForm key={initialTopic} initialTopic={initialTopic} initialRequestId={randomUUID()} /></section>
      </main>
      <LandingFooter /><HeadlineReveals />
    </div>
  );
}
