"use client";

import { useEffect, useRef, useState } from 'react';
import * as m from 'framer-motion/m';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandMark } from './brand-mark';
import { useMotionPreference } from './motion-primitives';
import './site-header.css';

const nav = [{label:'Product',href:'/#product-story'},{label:'Workflow',href:'/#workflow'},{label:'Pricing',href:'/#pricing'},{label:'Resources',href:'/#resources'},{label:'FAQ',href:'/#faq'}];
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduced = useMotionPreference();

  useEffect(() => {
    const sections = nav.flatMap(item => {
      const section = document.getElementById(item.href.split('#')[1]);
      return section ? [{ section, href: item.href }] : [];
    });
    const visible = new Set<Element>();
    const onIntersection: IntersectionObserverCallback = entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      const next = sections.find(item => visible.has(item.section))?.href ?? null;
      setActive(current => current === next ? current : next);
    };
    let observer: IntersectionObserver;
    function observeSections() {
      observer?.disconnect();
      visible.clear();
      // Pixel margins use viewport height; percentage margins are based on width.
      observer = new IntersectionObserver(onIntersection, {
        rootMargin: `-${Math.round(window.innerHeight * 0.18)}px 0px -${Math.round(window.innerHeight * 0.62)}px 0px`,
        threshold: 0,
      });
      for (const { section } of sections) observer.observe(section);
    }
    observeSections();
    window.addEventListener('resize', observeSections);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', observeSections);
    };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 901px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  return <header className="site-header site-header-clean" onKeyDown={event=>{if(event.key==='Escape' && open){setOpen(false);toggleRef.current?.focus();}}}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="header-inner container">
      <a className="brand-lockup" href="/" aria-label="Repairnox home"><BrandMark /><span>Repairnox<span className="brand-dot">.</span></span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map(item=><a href={item.href} key={item.label} aria-current={active===item.href?'location':undefined}>{item.label}</a>)}</nav>
      <a className="header-demo" href="/#workflow"><span>Explore demo</span><ArrowUpRight size={15} aria-hidden="true" /></a>
      <button ref={toggleRef} className="icon-button menu-toggle" type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}><span>{open ? 'Close' : 'Menu'}</span>{open ? <X aria-hidden="true"/> : <Menu aria-hidden="true"/>}</button>
    </div>
    <m.nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open} initial={false} animate={{opacity:open?1:0,y:reduced||open?0:-6}} transition={{duration:reduced?0:.18}}>
      <div className="mobile-nav-links">{nav.map(item=><a href={item.href} key={item.label} aria-current={active===item.href?'location':undefined} onClick={()=>setOpen(false)}>{item.label}<ArrowUpRight size={16} aria-hidden="true"/></a>)}</div>
      <a className="mobile-nav-demo" href="/#workflow" onClick={()=>setOpen(false)}>Explore demo<ArrowUpRight size={17} aria-hidden="true" /></a>
    </m.nav>
  </header>;
}
