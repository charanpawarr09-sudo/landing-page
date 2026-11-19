import Link from "next/link";
import { freeTrialHref } from "@/lib/marketing-contact";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, CheckCheck, Car, CreditCard, Gem, Package, Smartphone } from "lucide-react";
import { LandingHeader } from "./LandingHeader";
import { LandingFooter } from "./LandingFooter";
import { ProductTour } from "./ProductTour";
import { RepairPanel } from "./ProductPanels";
import { RevealHeading } from "./RevealHeading";
import { HeadlineReveals } from "./HeadlineReveals";
import { PanelReveals } from "./PanelReveals";
import styles from "./landing-page.module.css";
import content from "./content-page.module.css";

export function RepairNoxLanding() {
  return (
    <div className={styles.site} id="page-top" data-landing-page>
      <a href="#main-content" className={styles.skipLink}>Skip to content</a>
      <LandingHeader />
      <main id="main-content">
        <section className={styles.hero} aria-labelledby="hero-heading">
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>Repair shop management software</span>
              <RevealHeading as="h1" id="hero-heading" lines={["Repair shop software,", "in working order"]} />
              <p>From the first question at the counter to the final payment. Keep repair tickets, parts, customers, and checkout in one practical workspace.</p>
              <div className={styles.heroActions}>
                <Link href={freeTrialHref} className={`${styles.button} ${styles.largeButton}`}>Start free trial <ArrowUpRight size={18} aria-hidden="true" /></Link>
                <a href="#platform" className={styles.secondaryButton}>Explore the platform <ArrowDown size={16} aria-hidden="true" /></a>
              </div>
            </div>
            <div className={styles.heroVisual} data-reveal-panel>
              <div className={styles.visualTopline}><span>At the repair bench</span><span>RN / 2081—2082</span></div>
              <RepairPanel hero />
              <div className={styles.handoverCard}>
                <CheckCheck size={18} aria-hidden="true" />
                <div><strong>Every repair has a next step</strong><span>A shared view for the counter and the bench</span></div>
                <ArrowRight size={18} aria-hidden="true" />
              </div>
              <span className={styles.visualCaption}>Illustrative product view · Fictional sample data</span>
            </div>
          </div>
        </section>

        <section className={`${styles.container} ${styles.audienceStrip}`} aria-label="Designed for your kind of repair business">
          <p>Built around<br /><strong>your kind of work</strong></p>
          <Link href="/industries/phone-repair"><Smartphone size={18} aria-hidden="true" />Phone repair</Link>
          <Link href="/industries/computer-repair"><Package size={18} aria-hidden="true" />Computer repair</Link>
          <Link href="/industries/automotive-repair"><Car size={18} aria-hidden="true" />Automotive repair</Link>
          <Link href="/industries/jewelry-repair"><Gem size={18} aria-hidden="true" />Jewelry repair</Link>
        </section>

        <section id="platform" className={`${styles.container} ${styles.platform}`} aria-labelledby="platform-heading">
          <div className={styles.sectionIntro}>
            <div><span className={styles.eyebrow}>The platform</span><RevealHeading id="platform-heading" lines={["The job. The part.", "The person behind it"]} /></div>
            <p>See what needs doing, find what you need, and keep the customer’s history close. The everyday details of your shop, connected.</p>
          </div>
          <ProductTour />
        </section>

        <section className={styles.checkoutSection} aria-labelledby="checkout-heading">
          <div className={`${styles.container} ${styles.checkoutGrid}`}>
            <div className={styles.checkoutVisual} data-reveal-panel>
              <div className={styles.receipt}>
                <div className={styles.receiptTop}><span>RepairNox</span><span>Sample sale / RN-2081</span></div>
                <p className={styles.receiptHeading}>Repair complete</p>
                <div className={styles.receiptItem}>
                  <Smartphone size={24} aria-hidden="true" />
                  <div><strong>Screen replacement</strong><span>iPhone 14</span></div>
                  <strong>$120.00</strong>
                </div>
                <div className={styles.receiptLine}><span>Repair service</span><span>$120.00</span></div>
                <div className={styles.receiptLine}><span>Tax · example rate</span><span>$9.60</span></div>
                <div className={styles.receiptTotal}><span>Total</span><strong>$129.60</strong></div>
                <div className={styles.receiptMethods}><span><CreditCard size={16} aria-hidden="true" />Card</span><span>Cash</span></div>
                <span className={styles.receiptDisclaimer}>Illustrative checkout · No payment is processed</span>
              </div>
              <div className={styles.linkedRecord}><Check size={16} aria-hidden="true" /><span>Repair ticket → checkout → transaction</span></div>
            </div>
            <div className={styles.checkoutCopy}>
              <span className={styles.eyebrow}>At the counter</span>
              <RevealHeading id="checkout-heading" lines={["Repair finished.", "Details accounted for"]} />
              <p>Bring the repair to the register, collect the balance, and keep a record of the sale. Your counter team has the context when the customer comes back.</p>
              <ul className={styles.checkList}>
                <li><Check size={16} aria-hidden="true" />Repair-linked checkout and deposits</li>
                <li><Check size={16} aria-hidden="true" />Cash and configured card-terminal payments</li>
                <li><Check size={16} aria-hidden="true" />Invoices and transaction history</li>
              </ul>
              <Link href={freeTrialHref} className={styles.textLink}>Start free trial <ArrowUpRight size={18} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <section className={`${styles.container} ${content.homeResources}`} aria-labelledby="resources-heading">
          <h2 id="resources-heading">A clearer handoff starts with the details</h2>
          <p>Use these practical guides to review your intake process and evaluate the software behind your shop.</p>
          <nav aria-label="Repair shop guides"><Link href="/guides/repair-shop-intake-checklist" className={content.inlineLink}>Repair intake checklist</Link><Link href="/guides/choose-repair-shop-software" className={content.inlineLink}>How to choose repair shop software</Link><Link href="/industries" className={content.inlineLink}>Explore industries</Link></nav>
        </section>

        <section className={`${styles.container} ${styles.finalCta}`} aria-labelledby="final-heading">
          <div><span className={styles.eyebrow}>Your next workday</span><RevealHeading id="final-heading" lines={["More focus on repairs.", "Less chasing details"]} /><p>Give the everyday work of your shop a place of its own.</p><Link href={freeTrialHref} className={`${styles.button} ${styles.largeButton}`}>Start free trial <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
          <div className={styles.nextWorkOrder} aria-hidden="true"><span>Next work order</span><strong>Your shop,<br />from here</strong><div><span>Repairs</span><span>Parts</span><span>Customers</span><span>Checkout</span></div><ArrowUpRight size={32} strokeWidth={1.5} /></div>
        </section>
      </main>
      <LandingFooter />
      <HeadlineReveals />
      <PanelReveals />
    </div>
  );
}
