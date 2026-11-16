import Link from "next/link";
import { advancedPlanContactHref, freeTrialHref } from "@/lib/marketing-contact";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { LandingHeader } from "./LandingHeader";
import { LandingFooter } from "./LandingFooter";
import { RevealHeading } from "./RevealHeading";
import { HeadlineReveals } from "./HeadlineReveals";
import { PanelReveals } from "./PanelReveals";
import { pricingPlans } from "./pricing-data";
import shared from "./landing-page.module.css";
import styles from "./pricing-page.module.css";

const trialUrl = freeTrialHref;

export function RepairNoxPricing() {
  return (
    <div className={shared.site} id="page-top" data-landing-page>
      <a href="#main-content" className={shared.skipLink}>Skip to content</a>
      <LandingHeader />
      <main id="main-content" className={styles.main}>
        <section className={`${shared.container} ${styles.hero}`} aria-labelledby="pricing-heading">
          <span className={shared.eyebrow}>Plans for independent repair shops</span>
          <RevealHeading as="h1" id="pricing-heading" lines={["Good work starts", "with the right tools"]} />
          <p>A practical platform for the counter, the bench, and the business.<br className={styles.desktopBreak} /> Choose the plan that fits your shop’s work.</p>
          <div className={styles.billing}>Monthly billing <span aria-hidden="true">·</span> Prices in USD</div>
        </section>

        <section id="plans" className={`${shared.container} ${styles.plansSection}`} aria-labelledby="plans-heading">
          <h2 id="plans-heading" className={styles.srOnly}>Choose your RepairNox plan</h2>
          <div className={styles.plans} data-reveal-panel>
            {pricingPlans.map(plan => (
              <article key={plan.id} className={`${styles.plan} ${plan.id === "growth" ? styles.growth : ""}`} aria-labelledby={`${plan.id}-heading`}>
                <div className={styles.planTop}><span>{plan.id === "growth" ? "For a fuller view" : plan.id === "essential" ? "For the everyday" : "For your next step"}</span></div>
                <h3 id={`${plan.id}-heading`}>{plan.name}</h3>
                <p className={styles.planDescription}>{plan.description}</p>
                <div className={styles.price}>{plan.price ? <><span className={styles.currency}>$</span><strong>{plan.price}</strong><span className={styles.perMonth}>/ month</span></> : <strong className={styles.customPrice}>Let’s talk</strong>}</div>
                <p className={styles.priceNote}>{plan.price ? "USD · billed monthly" : "A quote for your agreed scope"}</p>
                {plan.id === "advanced"
                  ? <a href={advancedPlanContactHref} className={`${shared.button} ${styles.planButton}`} aria-label="Contact us about Customized pricing">Contact us <ArrowUpRight size={17} aria-hidden="true" /></a>
                  : <Link href={trialUrl} className={`${shared.button} ${styles.planButton}`} aria-label={`Start free trial — ${plan.name}`}>Start free trial <ArrowUpRight size={17} aria-hidden="true" /></Link>}
                <div className={styles.planFeatures}><p>{plan.summary}</p><ul>{plan.features.map(feature => <li key={feature}><Check size={16} aria-hidden="true" /><span>{feature}</span></li>)}</ul></div>
              </article>
            ))}
          </div>
          <div className={styles.planFootnote}><p>Request a live demo first. Trial credentials and sandbox access are arranged with our team after the demo. Payments for paid plans are arranged manually with our team. Contact us to discuss custom pricing.</p></div>
        </section>

        <section className={styles.finalSection} aria-labelledby="pricing-final-heading"><div className={`${shared.container} ${styles.finalInner}`}><div><span className={shared.eyebrow}>Your next workday</span><RevealHeading id="pricing-final-heading" lines={["Give good work", "a better workspace"]} /><p>Your repairs, parts, customers, and checkout. Together in RepairNox.</p></div><div className={styles.finalActions}><Link href={trialUrl} className={`${shared.button} ${shared.largeButton}`}>Start free trial <ArrowUpRight size={18} aria-hidden="true" /></Link><a href="#plans">Take another look at the plans <ArrowRight size={16} aria-hidden="true" /></a></div></div></section>
      </main>
      <LandingFooter />
      <HeadlineReveals />
      <PanelReveals />
    </div>
  );
}
