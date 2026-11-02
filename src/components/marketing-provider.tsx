"use client";

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import { ArrowRight, ArrowUpRight, X } from 'lucide-react';

type Panel = { kind: 'trial' | 'contact' | 'privacy' | 'social'; plan?: 'standard' | 'pro'; network?: string };
type MarketingContextValue = { trialHref?: string; contactEmail?: string; openPanel: (panel: Panel) => void };
const MarketingContext = createContext<MarketingContextValue | null>(null);
export function useMarketing() {
  const context = useContext(MarketingContext);
  if (!context) throw new Error('Marketing controls must be inside MarketingProvider.');
  return context;
}

export function MarketingProvider({ children, trialHref, contactEmail }: { children: React.ReactNode; trialHref?: string; contactEmail?: string }) {
  const [panel, setPanel] = useState<Panel | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (panel && !dialog.open) { dialog.showModal(); headingRef.current?.focus(); }
    if (!panel && dialog.open) dialog.close();
  }, [panel]);

  const title = panel?.kind === 'contact' ? 'Let’s connect. Soon.' : panel?.kind === 'privacy' ? 'Privacy information.' : panel?.kind === 'social' ? `${panel.network} is coming soon.` : panel?.plan ? `${panel.plan === 'standard' ? 'Standard' : 'Pro'} plan preview.` : 'Your next repair starts here.';

  return (
    <MarketingContext.Provider value={{ trialHref, contactEmail, openPanel: setPanel }}>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          {children}
          <dialog ref={dialogRef} className="launch-dialog" aria-labelledby="launch-dialog-heading" aria-describedby="launch-dialog-copy" onClose={() => setPanel(null)} onCancel={() => setPanel(null)} onClick={(event) => { if (event.target === event.currentTarget) setPanel(null); }}>
            <div className="dialog-content">
              <button className="icon-button dialog-close" type="button" aria-label="Close launch information" onClick={() => setPanel(null)}><X size={21} aria-hidden="true" /></button>
              <span className="eyebrow">Repairnox · Pre-launch</span>
              <h2 id="launch-dialog-heading" ref={headingRef} tabIndex={-1}>{title}</h2>
              <div id="launch-dialog-copy" className="dialog-copy">
                {panel?.kind === 'contact' ? <p>A Repairnox contact channel is being prepared. This preview doesn’t collect or send your details. In the meantime, take a look around the sample shop.</p> : panel?.kind === 'privacy' ? <><p>The full Privacy Policy will be available before live registration. This preview has no enquiry form, account registration or analytics tracking.</p><p>The sample repair runs in this tab and resets when you reload. No sample actions reach a live shop. Hosting services may process standard access logs when the website is deployed.</p></> : panel?.kind === 'social' ? <p>Our official {panel.network} profile isn’t ready yet. Explore the product here while we get ready to launch.</p> : <><p>Free trial registration is coming soon. You can explore a complete sample repair now, without creating an account or entering customer information.</p>{panel?.plan ? <p className="dialog-plan-note">{panel.plan === 'standard' ? 'Standard: planned Early Bird pricing of $29.99/month USD, regularly $39.99, for one shop.' : 'Pro: planned pricing of $49.99/month USD. Multi-store tools, unlimited staff and priority support are planned.'} No subscription or payment is created here.</p> : null}</>}
              </div>
              <Link className="button button-dark" href="/#workflow" onClick={() => setPanel(null)}>Explore the sample shop<ArrowRight size={17} aria-hidden="true" /></Link>
              {contactEmail && panel?.kind === 'contact' ? <a className="dialog-email" href={`mailto:${contactEmail}`}>Email Repairnox<ArrowUpRight size={16} aria-hidden="true" /></a> : null}
            </div>
          </dialog>
        </MotionConfig>
      </LazyMotion>
    </MarketingContext.Provider>
  );
}
