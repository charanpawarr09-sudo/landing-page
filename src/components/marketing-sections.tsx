import { ArrowRight, Check, ChevronDown, CreditCard, Package, Ticket, Users } from "lucide-react";
import { TrialAction } from "./trial-action";
import { Reveal } from "./motion-primitives";
import { BrandMark } from "./brand-mark";

const faqItems = [
  {
    question: "Who is Repairnox built for?",
    answer: "Independent phone, computer and electronics repair shops. It brings the everyday work of owners, store managers, front-desk staff and technicians into one repair-focused workspace.",
  },
  {
    question: "What does one connected workflow cover?",
    answer: "Start with the customer, device and issue on a repair ticket. Assign the job, check the parts you need, update the repair status and finish with payment and a receipt at pickup.",
  },
  {
    question: "Is the workflow preview a real shop?",
    answer: "The preview uses a fictional repair and sample data to show how the steps fit together. It does not create a real repair ticket, collect a payment or use customer information.",
  },
  {
    question: "Can I start a free trial today?",
    answer: "Repairnox is currently pre-launch, and trial registration is coming soon. You can view the current launch status from this page; trial duration and billing terms will be confirmed before registration opens.",
  },
  {
    question: "What if I run a growing team or more than one shop?",
    answer: "Pro is the proposed plan for growing or high-volume shops. Multi-store support, unlimited staff and priority support are planned capabilities; launch availability and plan entitlements will be confirmed before subscriptions open.",
  },
] as const;

export function ProblemSolutionSection() {
  return <section className="connected-story" id="problem-solution" aria-labelledby="mkt-problem-heading">
    <div className="container connected-story-grid">
      <Reveal className="connected-story-copy">
        <p className="eyebrow">Less scattered. More connected.</p>
        <h2 id="mkt-problem-heading">A repair is one job.<br /><span>Keep it that way.</span></h2>
        <p>A notebook at the counter. A spreadsheet for parts. Messages to the bench. Bring the details together, so everyone knows what happens next.</p>
        <a href="#workflow">Follow one repair<ArrowRight size={16} aria-hidden="true" /></a>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="connection-map" aria-label="A sample repair connects intake, parts, technician and checkout">
          <div className="connection-node"><span><Ticket size={15} aria-hidden="true" />01 / Intake</span><strong>Every detail, captured.</strong><p>Customer. Device. Issue.</p></div>
          <div className="connection-node"><span><Package size={15} aria-hidden="true" />02 / Parts</span><strong>Know what’s needed.</strong><p>The part behind the repair.</p></div>
          <div className="connection-node"><span><Users size={15} aria-hidden="true" />03 / Bench</span><strong>Someone owns it.</strong><p>A clear next handoff.</p></div>
          <div className="connection-node"><span><CreditCard size={15} aria-hidden="true" />04 / Pickup</span><strong>Close the loop.</strong><p>Payment. Receipt. Done.</p></div>
          <span className="connection-center" aria-hidden="true"><BrandMark /></span>
        </div>
        <p className="connection-caption">One repair record. A shared picture of the work.</p>
      </Reveal>
    </div>
  </section>;
}

export function AboutSection() {
  return (
    <section className="mkt-about" id="about" aria-labelledby="mkt-about-heading">
      <Reveal className="container mkt-about-inner">
        <div className="mkt-about-heading"><p className="eyebrow">Built around your day</p><h2 className="section-heading" id="mkt-about-heading">For the people<br /><span>who keep repairs moving.</span></h2></div>
        <div className="mkt-about-copy"><p>Repairnox is being built for independent phone, computer and electronics repair shops. Owners, managers, counter staff and technicians need a shared picture of the work, without another complicated system to manage.</p><p>Our focus is simple: keep the customer, the repair and the next step connected.</p><a className="mkt-text-link" href="#workflow">Explore the workflow<ArrowRight size={18} aria-hidden="true" /></a></div>
        <dl className="mkt-about-facts"><div><dt>For your shop</dt><dd>Phone, computer & electronics repair</dd></div><div><dt>For your team</dt><dd>Front desk, managers & technicians</dd></div><div><dt>Our focus</dt><dd>A clear path from intake to pickup</dd></div></dl>
      </Reveal>
    </section>
  );
}

export function PricingSection() {
  return (
    <section className="mkt-pricing" id="pricing" aria-labelledby="mkt-pricing-heading">
      <div className="container">
        <Reveal className="mkt-pricing-heading"><p className="eyebrow">Planned launch pricing</p><h2 className="section-heading" id="mkt-pricing-heading">Two plans.<br /><span>One organized shop.</span></h2><p className="mkt-section-intro">Choose the fit for your team. Prices below are in USD per month.</p></Reveal>
        <div className="mkt-pricing-grid">
          <article className="mkt-plan" aria-labelledby="mkt-standard-heading">
            <div className="mkt-plan-top"><h3 id="mkt-standard-heading">Standard</h3><span className="mkt-early-bird">Early Bird</span></div>
            <p className="mkt-plan-summary">The daily essentials for a single repair shop.</p>
            <div className="mkt-plan-price"><p className="mkt-regular-price">Regularly <s>$39.99</s> / month</p><p><strong>$29.99</strong><span>/ month</span></p></div>
            <ul className="mkt-plan-features" aria-label="Proposed Standard Plan features">
              <li><Check size={17} aria-hidden="true" /><span>One repair shop</span></li>
              <li><Check size={17} aria-hidden="true" /><span>Repair tickets & technician assignment</span></li>
              <li><Check size={17} aria-hidden="true" /><span>Parts inventory & low-stock view</span></li>
              <li><Check size={17} aria-hidden="true" /><span>POS checkout & receipts</span></li>
              <li><Check size={17} aria-hidden="true" /><span>Customer CRM</span></li>
            </ul>
            <div className="mkt-plan-action"><TrialAction label="Choose Standard" pendingLabel="View Standard plan" plan="standard" className="button button-dark mkt-plan-button" /></div>
          </article>
          <article className="mkt-plan mkt-plan-pro" aria-labelledby="mkt-pro-heading">
            <div className="mkt-plan-top"><h3 id="mkt-pro-heading">Pro</h3><span className="mkt-pro-label">More room to grow</span></div>
            <p className="mkt-plan-summary">For growing teams and high-volume repair shops.</p>
            <div className="mkt-plan-price"><p className="mkt-pro-price-note">Proposed monthly price</p><p><strong>$49.99</strong><span>/ month</span></p></div>
            <ul className="mkt-plan-features" aria-label="Proposed Pro Plan features">
              <li><Check size={17} aria-hidden="true" /><span>Everything in Standard</span></li>
              <li><Check size={17} aria-hidden="true" /><span>Multi-store support <small>Planned</small></span></li>
              <li><Check size={17} aria-hidden="true" /><span>Advanced analytics & KPI reports</span></li>
              <li><Check size={17} aria-hidden="true" /><span>Unlimited staff <small>Planned</small></span></li>
              <li><Check size={17} aria-hidden="true" /><span>Priority support <small>Planned</small></span></li>
            </ul>
            <div className="mkt-plan-action"><TrialAction label="Choose Pro" pendingLabel="View Pro plan" plan="pro" className="button button-light mkt-plan-button" /></div>
          </article>
        </div>
        <p className="mkt-pricing-disclosure">Pre-launch. Trial registration and subscriptions are coming soon. Plan features are proposed commercial offerings; availability and billing terms will be confirmed before registration opens.</p>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="mkt-faq" id="faq" aria-labelledby="mkt-faq-heading">
      <div className="container mkt-faq-inner">
        <div className="mkt-faq-heading"><p className="eyebrow">A few helpful answers</p><h2 className="section-heading" id="mkt-faq-heading">Before you<br /><span>make the switch.</span></h2><p className="mkt-section-intro">A clear look at who it’s for, how it works and what’s coming.</p></div>
        <div className="mkt-faq-list">{faqItems.map(({ question, answer }) => <details className="mkt-faq-item" key={question}><summary><span>{question}</span><ChevronDown size={20} aria-hidden="true" /></summary><div className="mkt-faq-answer"><p>{answer}</p></div></details>)}</div>
      </div>
    </section>
  );
}

export function FinalSection() {
  return (
    <section className="mkt-final" aria-labelledby="mkt-final-heading">
      <Reveal className="container mkt-final-inner">
        <p className="eyebrow">Bring the whole repair together</p>
        <h2 id="mkt-final-heading">A clearer day.<br /><span>A shop that runs together.</span></h2>
        <p className="mkt-final-description">Keep your tickets, team, parts and checkout connected.<br className="mkt-final-break" /> See what an organized repair day could look like.</p>
        <div className="mkt-final-actions"><a className="button button-light" href="#workflow">Explore the workflow<ArrowRight size={18} aria-hidden="true" /></a><TrialAction label="Start Free Trial" pendingLabel="View launch status" className="button button-outline mkt-final-trial" /></div>
        <p className="mkt-final-note">Explore now. Trial registration opens soon.</p>
      </Reveal>
    </section>
  );
}
