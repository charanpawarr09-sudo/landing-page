'use client';

import { useRef, useState } from 'react';
import * as m from 'framer-motion/m';
import { ArrowRight, Check, ChevronRight, CreditCard, Package, Smartphone, Wrench } from 'lucide-react';
import { BrandMark } from './brand-mark';
import { useMotionPreference } from './motion-primitives';

const views = ['Repairs', 'Inventory', 'Checkout'] as const;

/** A small, user-controlled product illustration; never connects to shop data. */
export function ProductOverview() {
  const [view, setView] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduced = useMotionPreference();

  function selectView(index: number, focus = false) {
    setView(index);
    if (focus) tabs.current[index]?.focus();
  }

  return <div className="product-stage">
    <div className="stage-grid" aria-hidden="true" />
    <div className="stage-coordinate" aria-hidden="true">One workspace / Every handoff</div>
    <div className="stage-window">
      <div className="stage-chrome"><span className="stage-brand"><BrandMark />Repairnox</span><span className="stage-sample">Sample workspace</span><span className="stage-avatar" aria-hidden="true">A</span></div>
      <div className="stage-toolbar"><span>Your shop, at a glance</span><span className="stage-date">A little more clarity.</span></div>
      <div className="stage-tabs" role="tablist" aria-label="Product preview">
        {views.map((label, index) => {
          const Icon = [Wrench, Package, CreditCard][index];
          return <button key={label} ref={element => { tabs.current[index] = element; }} type="button" role="tab" id={`product-tab-${index}`} aria-controls={`product-panel-${index}`} aria-selected={view === index} tabIndex={view === index ? 0 : -1} onClick={() => selectView(index)} onKeyDown={event => {
            let next = index;
            if (event.key === 'ArrowRight') next = (index + 1) % views.length;
            else if (event.key === 'ArrowLeft') next = (index + views.length - 1) % views.length;
            else if (event.key === 'Home') next = 0;
            else if (event.key === 'End') next = views.length - 1;
            else return;
            event.preventDefault(); selectView(next, true);
          }}><Icon size={15} aria-hidden="true" />{label}</button>;
        })}
      </div>
      <div className="stage-panel-host">
        {views.map((_, index) => <m.div key={index} className="stage-panel" id={`product-panel-${index}`} role="tabpanel" aria-labelledby={`product-tab-${index}`} tabIndex={view === index ? 0 : -1} aria-hidden={view !== index} inert={view !== index} data-active={view === index} initial={false} animate={{ opacity: view === index ? 1 : 0, y: reduced || view === index ? 0 : 6 }} transition={{ duration: reduced ? 0 : 0.18, ease: 'easeOut' }}>
            {index === 0 ? <>
              <div className="stage-panel-heading"><h2>Every repair. In view.</h2><span className="stage-count">03 active jobs</span></div>
              <div className="stage-ticket">
                <div className="stage-ticket-heading"><span className="stage-device"><Smartphone size={28} strokeWidth={1.3} aria-hidden="true" /></span><div><span className="stage-ticket-id">Repair #1048</span><h3>iPhone 15</h3><p>Screen replacement</p></div><span className="stage-status">In progress</span></div>
                <div className="stage-ticket-details"><span>Assigned to<strong><i>AL</i>Alex</strong></span><span>Repair estimate<strong>$149.00</strong></span><span>Next step<strong>Ready for pickup<ChevronRight size={13} aria-hidden="true" /></strong></span></div>
                <div className="stage-ticket-progress" aria-label="Repair stage: in progress"><span /><span /><span /></div>
              </div>
              <div className="stage-queue-row"><span className="stage-queue-icon"><Wrench size={15} aria-hidden="true" /></span><span>MacBook Air<small>Battery replacement</small></span><span className="stage-queue-status"><Check size={12} aria-hidden="true" />Ready for pickup</span></div>
              <div className="stage-queue-row"><span className="stage-queue-icon"><Smartphone size={15} aria-hidden="true" /></span><span>Galaxy S24<small>Charging port</small></span><span className="stage-queue-status">Awaiting parts</span></div>
            </> : index === 1 ? <>
              <div className="stage-panel-heading"><h2>The right part. Right here.</h2><Package size={18} aria-hidden="true" /></div>
              <p className="stage-panel-description">A clear view of what’s on the shelf.</p>
              <div className="stage-stock-item"><span className="stage-stock-icon"><Smartphone size={27} strokeWidth={1.3} aria-hidden="true" /></span><div><h3>iPhone 15 display</h3><p>OLED assembly · DSP–015</p></div><strong>06<small>in stock</small></strong></div>
              <div className="stage-stock-item"><span className="stage-stock-icon"><Package size={27} strokeWidth={1.3} aria-hidden="true" /></span><div><h3>Battery pack</h3><p>Replacement part · BAT–042</p></div><strong>02<small>Low stock</small></strong></div>
              <div className="stage-stock-note"><span className="stage-note-dot" /><span>Stock levels help you plan the next repair.</span></div>
            </> : <>
              <div className="stage-panel-heading"><h2>A tidy finish.</h2><span className="stage-count">Repair #1048</span></div>
              <dl className="stage-receipt"><div><dt>Replacement screen</dt><dd>$69.00</dd></div><div><dt>Repair labor</dt><dd>$80.00</dd></div><div className="stage-receipt-total"><dt>Repair total</dt><dd>$149.00</dd></div><div><dt>Deposit recorded</dt><dd>−$30.00</dd></div><div className="stage-receipt-balance"><dt>Balance at pickup</dt><dd>$119.00</dd></div></dl>
              <p className="stage-receipt-note"><CreditCard size={16} aria-hidden="true" />One repair. One clear checkout.</p>
            </>}
          </m.div>)}
      </div>
      <div className="stage-window-footer"><span>Illustrative product preview</span><a href="#workflow">Try the full workflow<ArrowRight size={14} aria-hidden="true" /></a></div>
    </div>
    <div className="stage-bottom-note"><span className="stage-note-symbol"><Check size={16} aria-hidden="true" /></span><p>Less chasing.<strong>More getting things done.</strong></p><span className="stage-note-number" aria-hidden="true">01—03</span></div>
  </div>;
}
