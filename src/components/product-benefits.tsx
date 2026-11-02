import { ArrowUpRight, Check, CreditCard, Package, Smartphone, Ticket, Users } from 'lucide-react';
import { Reveal } from './motion-primitives';
import { FeatureArtMotion } from './feature-art-motion';
import './product-benefits.css';

function RepairArt() {
  return <FeatureArtMotion kind="repair">
    <div className="feature-art-label"><span>Illustrative workspace</span><span>Repair / 1048</span></div>
    <div className="feature-repair-sheet">
      <div className="feature-sheet-header"><span><Ticket size={17} />Repair details</span><span className="feature-status">In progress</span></div>
      <div className="feature-device"><span className="feature-device-icon"><Smartphone size={35} strokeWidth={1.2} /></span><div><span>Screen replacement</span><strong>iPhone 15</strong><p>Sam Taylor · Ticket #1048</p></div></div>
      <dl className="feature-repair-fields"><div><dt>Reported issue</dt><dd>Cracked screen. Intermittent touch.</dd></div><div><dt>Repair estimate</dt><dd>$149.00</dd></div></dl>
      <div className="feature-repair-complete"><Check size={16} /><span>Customer, device and issue captured.</span></div>
    </div>
    <div className="feature-owner-sheet"><div className="feature-owner-avatar">AL</div><div><span>Assigned technician</span><strong>Alex</strong></div><span className="feature-owner-check"><Check size={17} /></span></div>
    <p className="feature-art-caption">A clear record. A clear owner.</p>
  </FeatureArtMotion>;
}

function CheckoutArt() {
  return <FeatureArtMotion kind="checkout">
    <div className="feature-art-label"><span>Illustrative workspace</span><span>Parts → Pickup</span></div>
    <div className="feature-stock-sheet"><div className="feature-stock-header"><Package size={17} /><span>Parts inventory</span></div><div className="feature-stock-item"><span className="feature-stock-icon"><Smartphone size={24} strokeWidth={1.3} /></span><div><strong>Replacement screen</strong><span>IP15–OLED</span></div><strong>06<small>in stock</small></strong></div><div className="feature-stock-item"><span className="feature-stock-icon"><Package size={24} strokeWidth={1.3} /></span><div><strong>Battery pack</strong><span>BAT–042</span></div><strong>02<small>Low stock</small></strong></div></div>
    <div className="feature-receipt-sheet"><div className="feature-receipt-heading"><CreditCard size={19} /><span>Sample checkout</span><span>#1048</span></div><dl><div><dt>Replacement screen</dt><dd>$69.00</dd></div><div><dt>Repair labor</dt><dd>$80.00</dd></div><div className="feature-receipt-total"><dt>Repair total</dt><dd>$149.00</dd></div><div><dt>Deposit recorded</dt><dd>−$30.00</dd></div></dl><div className="feature-receipt-balance"><span>Balance at pickup</span><strong>$119.00</strong></div><p><Check size={15} />Every amount, accounted for.</p></div>
    <p className="feature-art-caption">The shelf and the counter. Connected.</p>
  </FeatureArtMotion>;
}

export function ProductBenefits() {
  return <section className="product-benefits" id="features" aria-labelledby="product-benefits-heading">
    <div className="container">
      <Reveal className="pb-heading"><p className="eyebrow">The details make the difference.</p><h2 className="section-heading" id="product-benefits-heading">Built around the work.<br /><span>Right down to the details.</span></h2></Reveal>
      <div className="pb-chapters">
        <article className="pb-chapter pb-chapter-repair">
          <div className="pb-chapter-copy">
            <Reveal className="pb-feature"><span className="pb-category"><Ticket size={17} aria-hidden="true" />Repair ticketing</span><h3>The whole story.<br />On one ticket.</h3><p>Keep the customer, device, reported issue and repair status together. Give your counter and bench the same details to work from.</p><a className="pb-link" href="#workflow">Follow a sample ticket<ArrowUpRight size={17} aria-hidden="true" /></a></Reveal>
            <Reveal className="pb-feature pb-supporting-feature"><span className="pb-category"><Users size={17} aria-hidden="true" />Technician assignment</span><h3>A clear owner for every job.</h3><p>Assign each repair to a technician and follow its status. Make handoffs easier without chasing your team for the basics.</p><a className="pb-link" href="#workflow">Try assigning a repair<ArrowUpRight size={17} aria-hidden="true" /></a></Reveal>
          </div>
          <RepairArt />
        </article>
        <article className="pb-chapter pb-chapter-checkout">
          <CheckoutArt />
          <div className="pb-chapter-copy">
            <Reveal className="pb-feature"><span className="pb-category"><Package size={17} aria-hidden="true" />Parts inventory</span><h3>Know what’s<br />on the shelf.</h3><p>Find parts by name or SKU and check stock levels in one place. Spot low stock before you plan the next job.</p><a className="pb-link" href="#workflow">See parts in the workflow<ArrowUpRight size={17} aria-hidden="true" /></a></Reveal>
            <Reveal className="pb-feature pb-supporting-feature"><span className="pb-category"><CreditCard size={17} aria-hidden="true" />POS checkout</span><h3>A tidy finish at the counter.</h3><p>Bring repair and product sales into checkout, record payments and print a receipt. Keep the final pickup as organized as the work behind it.</p><a className="pb-link" href="#workflow">Explore a sample checkout<ArrowUpRight size={17} aria-hidden="true" /></a></Reveal>
          </div>
        </article>
      </div>
    </div>
  </section>;
}
