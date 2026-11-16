import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, ChevronDown, ClipboardList, Laptop, LifeBuoy, LockKeyhole, Monitor, Package, ReceiptText, Users, Wrench } from "lucide-react";
import { LandingHeader } from "@/components/landing-page/LandingHeader";
import { LandingFooter } from "@/components/landing-page/LandingFooter";
import { supportEmail } from "@/lib/marketing-contact";
import shared from "@/components/landing-page/landing-page.module.css";
import styles from "@/components/landing-page/help-center.module.css";

export const metadata: Metadata = {
  title: "Help Center | RepairNox",
  description: "A practical guide to repair tickets, team roles, getting set up, and support in RepairNox.",
  alternates: { canonical: "https://help.repairnox.com/" },
  openGraph: { title: "RepairNox Help Center", description: "A clearer way through your shop’s workday.", url: "https://help.repairnox.com/", type: "website" },
};

const topics = [
  { href: "#repair-and-team", icon: Wrench, title: "Repairs & your team", detail: "From check-in to collection" },
  { href: "#getting-started", icon: ClipboardList, title: "Getting started", detail: "Prepare your shop’s workspace" },
  { href: "#essentials", icon: Package, title: "Everyday essentials", detail: "Customers, stock & checkout" },
  { href: "#questions", icon: LifeBuoy, title: "Questions & support", detail: "Find an answer or reach us" },
] as const;
const steps = [
  { number: "01", title: "Check the device in", text: "Find or create the customer record. Record the device, the reported issue, and the repair details so the next person has the context.", role: "Counter team", handover: "A repair ticket with the customer and device details." },
  { number: "02", title: "Keep the repair moving", text: "Assign the technician, add diagnosis notes, and update the repair status as work progresses. Keep the job’s information with its ticket.", role: "Technician & counter team", handover: "A shared repair status and a clear record of the work." },
  { number: "03", title: "Finish the handover", text: "Review the completed repair and remaining balance. Bring the job to checkout, collect payment using your shop’s configured methods, and keep the transaction record.", role: "Counter team", handover: "The completed repair, checkout, and transaction together." },
] as const;
const essentials = [
  { icon: Users, title: "Customers & appointments", text: "Keep customer details, repair history, and appointment records close to the work. Check that you have the right customer before opening a new repair." },
  { icon: Package, title: "Parts & accessories", text: "Organize inventory, review stock quantities, and keep adjustments up to date. Use low-stock thresholds to spot what needs attention." },
  { icon: ReceiptText, title: "Checkout & records", text: "Review the repair balance and line items before completing checkout. Use invoices and transaction history when you need to look back at a sale." },
  { icon: LockKeyhole, title: "Access & permissions", text: "Use your own account and the access assigned to your role. Ask your shop’s owner or admin if you need a permission changed." },
] as const;
const questions = [
  { title: "How do I get access to RepairNox?", answer: "If you already work at a shop using RepairNox, ask your owner or admin for access. For a new shop, request a live demo first. Our team arranges sandbox trial credentials after the demo and agrees onboarding with you." },
  { title: "Which devices can our team use?", answer: "The shop workspace is designed for tablets, laptops, and desktops in a modern browser. Use a workstation at the counter or a tablet alongside the repair bench." },
  { title: "What if a feature or action is missing from my account?", answer: "Availability can depend on your role, permissions, and your shop’s plan. Ask your owner or admin to check your access. Employee timeclock and monthly payment reporting are included in Growth and Customized plans." },
  { title: "Can you help us bring in existing customer and stock data?", answer: "Our team can review CSV or Excel files during assisted onboarding. Agree the fields, mapping, and scope before an import is arranged. This page does not accept data uploads." },
  { title: "What should we check before using a printer or card terminal?", answer: "Confirm your printer model, connection, browser, and driver setup with our team. Card-terminal hardware, payment processing, and provider setup are separate from the software plan; a Poynt connection must be configured for your shop." },
  { title: "What should I include when reporting an issue?", answer: "Include your shop name, the screen or action affected, what you expected, and what happened instead. Add a ticket reference if relevant. Remove customer information from screenshots and never send passwords, PINs, or payment-card details." },
] as const;

export default function HelpCenterPage() {
  return (
    <div className={shared.site} id="page-top" data-landing-page>
      <a href="#main-content" className={shared.skipLink}>Skip to content</a>
      <LandingHeader helpCenter />
      <main id="main-content">
        <section className={`${shared.container} ${styles.hero}`} aria-labelledby="help-heading">
          <div><span className={shared.eyebrow}>RepairNox Help Center</span><h1 id="help-heading">A clearer way through<br />the workday</h1><p>Understand the repair flow, keep your team in step, and find the help you need to run your shop.</p><a href="#repair-and-team" className={shared.textLink}>Start with the repair flow <ArrowDown size={17} aria-hidden="true" /></a></div>
          <aside className={styles.quickStart} aria-label="New to RepairNox"><span className={styles.asideLabel}>New here?</span><h2>Start with your shop</h2><p>Get access from your owner or admin. Setting up a new shop? Begin with a live walkthrough.</p><Link href="https://repairnox.com/contact?topic=demo">Request a demo <ArrowUpRight size={17} aria-hidden="true" /></Link><a href="https://app.repairnox.com/login">Already have access? Sign in <ArrowUpRight size={17} aria-hidden="true" /></a></aside>
        </section>
        <nav className={`${shared.container} ${styles.topics}`} aria-label="Help topics">{topics.map(({ href, icon: Icon, title, detail }) => <a href={href} key={href}><Icon size={23} aria-hidden="true" /><strong>{title}</strong><span>{detail}</span><ArrowDown size={16} aria-hidden="true" /></a>)}</nav>

        <section id="repair-and-team" className={`${shared.container} ${styles.section}`} aria-labelledby="flow-heading">
          <div className={shared.sectionIntro}><div><span className={shared.eyebrow}>How it works · For your team</span><h2 id="flow-heading">One repair.<br />A team in step</h2></div><p>A clear handover at every stage. The counter, the bench, and the owner work from the same shop workspace.</p></div>
          <div className={styles.flow}>{steps.map(step => <article key={step.number} className={styles.step}><span className={styles.number}>{step.number}</span><div><span className={styles.role}>{step.role}</span><h3>{step.title}</h3><p>{step.text}</p></div><div className={styles.handover}><Check size={18} aria-hidden="true" /><span>{step.handover}</span></div></article>)}</div>
          <div className={styles.team}><article><Wrench size={23} aria-hidden="true" /><h3>At the bench & counter</h3><p>Find customer details, appointments, and repairs. Keep diagnosis notes and status current, and use the employee timeclock where your plan and access allow it.</p></article><article><Monitor size={23} aria-hidden="true" /><h3>For the owner & admin</h3><p>Manage employee access and stock, review transactions, and keep oversight of the shop. Growth and Customized plans add monthly payment reporting.</p></article></div>
          <p className={styles.accessNote}><LockKeyhole size={17} aria-hidden="true" />Separate shop accounts and role-based permissions keep access tied to your team.</p>
        </section>

        <section id="getting-started" className={styles.setupSection} aria-labelledby="setup-heading"><div className={`${shared.container} ${styles.setupGrid}`}><div><span className={shared.eyebrow}>A solid starting point</span><h2 id="setup-heading">Set up for a<br />smoother first day</h2><p>A little preparation helps your team start with the right access, records, and equipment.</p><Link href="https://repairnox.com/contact?topic=demo" className={shared.textLink}>Talk through your setup <ArrowUpRight size={17} aria-hidden="true" /></Link></div><ol className={styles.setupList}><li><strong>Arrange access for your team</strong><p>Confirm who needs an account and which areas each person should use. Owners manage employee access.</p></li><li><strong>Review your records and inventory</strong><p>Gather customer and stock data. If you need assisted imports, agree the files and scope with our team during onboarding.</p></li><li><strong>Confirm your devices and equipment</strong><p>Check your tablet or computer, printer setup, and payment methods before your first live workday.</p></li><li><strong>Walk through a sample repair</strong><p>During your demo or sandbox trial, follow a ticket from check-in to checkout so the team understands each handover.</p></li></ol></div></section>

        <section id="essentials" className={`${shared.container} ${styles.section}`} aria-labelledby="essentials-heading"><div className={shared.sectionIntro}><div><span className={shared.eyebrow}>Everyday essentials</span><h2 id="essentials-heading">Keep the details<br />in good order</h2></div><p>The supporting records that keep a repair shop connected throughout the day.</p></div><div className={styles.essentials}>{essentials.map(({ icon: Icon, title, text }) => <article key={title}><Icon size={24} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div><p className={styles.deviceNote}><Laptop size={18} aria-hidden="true" />Built for tablets, laptops, and desktops. <a href="https://repairnox.com/pricing">View plans and features <ArrowUpRight size={15} aria-hidden="true" /></a></p></section>

        <section id="questions" className={`${shared.container} ${shared.faqSection} ${styles.questions}`} aria-labelledby="questions-heading"><div><span className={shared.eyebrow}>A few useful answers</span><h2 id="questions-heading">Before you<br />get back to work</h2><p>Access, setup, equipment, and the practical details of using RepairNox.</p></div><div className={shared.faqList}>{questions.map(({ title, answer }) => <details key={title}><summary>{title}<ChevronDown size={18} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></section>

        <section id="contact-support" className={styles.support} aria-labelledby="support-heading"><div className={`${shared.container} ${styles.supportInner}`}><div><span className={shared.eyebrow}>Still need a hand?</span><h2 id="support-heading">Talk to a person<br />who can help</h2><p>Tell us your shop name and what you’re trying to do. For an existing issue, include a ticket reference if you have one.</p></div><div className={styles.supportContact}><a href={`mailto:${supportEmail}`} className={styles.email}>{supportEmail}<ArrowUpRight size={21} aria-hidden="true" /></a><p>Monday–Friday · US Eastern Time (EST/EDT)<br />We typically respond within 24 business hours.</p><span>Never include passwords, PINs, or payment-card details.</span><Link href="https://repairnox.com/contact" className={styles.supportLink}>Open the contact form <ArrowUpRight size={16} aria-hidden="true" /></Link></div></div></section>
      </main>
      <LandingFooter helpCenter />
    </div>
  );
}
