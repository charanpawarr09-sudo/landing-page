'use client';

import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import * as m from 'framer-motion/m';
import { ArrowDown, ArrowUpRight, Check, ChevronRight, CircleHelp, CreditCard, LayoutGrid, Package, Search, Smartphone, Users, Wrench } from 'lucide-react';
import { BrandMark } from './brand-mark';
import { useMotionPreference } from './motion-primitives';
import './cinematic-hero.css';

export function CinematicHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.94, 1, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [7, 0]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -52]);
  const leftY = useTransform(scrollYProgress, [0, 0.6], [28, -44]);
  const rightY = useTransform(scrollYProgress, [0, 0.6], [60, -16]);

  return <section ref={ref} className="cinema-hero" aria-labelledby="hero-heading">
    <div className="cinema-intro container">
      <p className="cinema-eyebrow">Repairnox / Repair shop software</p>
      <h1 id="hero-heading"><span className="cinema-title-mask"><span>Your repair shop.</span></span><span className="cinema-title-mask"><span>Working as one.</span></span></h1>
      <p className="cinema-description">Tickets, team, parts and checkout. Beautifully connected.</p>
      <div className="cinema-actions"><a href="#product-story" className="button button-dark">Meet your workspace<ArrowDown size={17} aria-hidden="true" /></a><a href="#workflow" className="cinema-demo-link">Try the demo<ArrowUpRight size={17} aria-hidden="true" /></a></div>
    </div>
    <div className="cinema-product-wrap">
      <div className="cinema-product-perspective">
        <m.div className="cinema-workspace" style={reduced ? undefined : { scale, rotateX, y }} role="img" aria-label="Illustrative Repairnox workspace. Sample repair 1048 connects an iPhone 15 screen repair, technician Alex, replacement screen and a 149 dollar estimate. No live shop data.">
          <div className="cinema-window-top" aria-hidden="true"><span className="cinema-window-dots"><i /><i /><i /></span><span><BrandMark />Repairnox workspace</span><span className="cinema-preview-tag">Product preview</span></div>
          <div className="cinema-app" aria-hidden="true">
            <aside className="cinema-sidebar"><span className="cinema-shop-logo"><BrandMark /></span><span className="cinema-shop-name">The sample shop<small>Your daily workspace</small></span><div className="cinema-app-nav"><span><LayoutGrid size={15} />Overview</span><span className="selected"><Wrench size={15} />Repairs</span><span><Users size={15} />Customers</span><span><Package size={15} />Inventory</span><span><CreditCard size={15} />Checkout</span></div><span className="cinema-sidebar-bottom"><CircleHelp size={15} />A little more clarity.</span></aside>
            <div className="cinema-app-main">
              <div className="cinema-app-breadcrumb"><span>Workspace<ChevronRight size={12} />Repairs</span><Search size={16} /></div>
              <div className="cinema-app-heading"><div><p>Everything in its place.</p><h2>Your repair day, connected.</h2></div><span className="cinema-view-label">Today’s workspace</span></div>
              <div className="cinema-app-columns">
                <div className="cinema-repair-detail">
                  <div className="cinema-ticket-top"><span>Repair #1048</span><span className="cinema-job-status"><i />In progress</span></div>
                  <div className="cinema-device-row"><div className="cinema-phone"><div className="cinema-phone-island" /><span>9:41</span><i /><small>Repairnox</small></div><div><span className="cinema-device-caption">Device / Screen replacement</span><h3>iPhone 15</h3><p>Sam Taylor · Black · Screen repair</p><div className="cinema-device-meta"><span><Check size={12} />Intake complete</span><span><Check size={12} />Deposit recorded</span></div></div></div>
                  <div className="cinema-repair-notes"><span>Reported issue</span><p>Cracked screen. Touch response is intermittent.</p></div>
                  <div className="cinema-repair-progress"><span><i><Check size={10} /></i>Checked in</span><span className="current"><i />At the bench</span><span><i />Ready for pickup</span></div>
                  <div className="cinema-ticket-bottom"><span>Repair estimate<strong>$149.00</strong></span><span>Deposit recorded<strong>$30.00</strong></span><span>Balance at pickup<strong>$119.00</strong></span></div>
                </div>
                <div className="cinema-details-column"><div className="cinema-technician"><span className="cinema-card-label">The right hands</span><span className="cinema-tech-person"><i>AL</i><span>Alex<strong>Assigned technician</strong></span><Check size={15} /></span><p>A clear owner. A clear next step.</p></div><div className="cinema-linked-part"><span className="cinema-card-label">The right part</span><Package size={25} strokeWidth={1.3} /><strong>Replacement screen</strong><span>IP15-OLED</span><p>One part, linked to this repair.</p></div></div>
              </div>
              <div className="cinema-app-footnote"><span>Customer. Device. Parts. Team.</span><span>All in one repair record.<Check size={12} /></span></div>
            </div>
          </div>
        </m.div>
      </div>
      <m.div className="cinema-floating cinema-float-left" style={reduced ? undefined : { y: leftY }} aria-hidden="true"><span className="cinema-float-icon"><Wrench size={19} strokeWidth={1.5} /></span><span>From check-in<strong>to a clear next step.</strong></span></m.div>
      <m.div className="cinema-floating cinema-float-right" style={reduced ? undefined : { y: rightY }} aria-hidden="true"><span className="cinema-float-check"><Check size={18} /></span><span>A connected repair.<strong>A calmer shop day.</strong></span></m.div>
    </div>
    <div className="cinema-audience container"><p>Made for independent repair shops.</p><span>Phones<span />Computers<span />Electronics</span></div>
    <noscript><style>{'.cinema-workspace,.cinema-floating{transform:none!important}'}</style></noscript>
  </section>;
}
