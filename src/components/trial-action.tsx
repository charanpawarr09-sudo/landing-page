"use client";

import { ArrowRight } from 'lucide-react';
import { useMarketing } from './marketing-provider';

export function TrialAction({ label = 'Start Free Trial', pendingLabel = 'View launch status', plan, className = 'button button-dark' }: { label?: string; pendingLabel?: string; plan?: 'standard' | 'pro'; className?: string }) {
  const { trialHref, openPanel } = useMarketing();
  return trialHref ? <a className={className} href={trialHref}>{label}<ArrowRight size={17} aria-hidden="true" /></a> : <button className={className} type="button" onClick={() => openPanel({ kind: 'trial', plan })} aria-haspopup="dialog">{pendingLabel}<ArrowRight size={17} aria-hidden="true" /></button>;
}

export function PendingLink({ kind, label, network, className = '' }: { kind: 'contact' | 'privacy' | 'social'; label: string; network?: string; className?: string }) {
  const { contactEmail, openPanel } = useMarketing();
  if (kind === 'contact' && contactEmail) return <a className={className} href={`mailto:${contactEmail}`}>{label}</a>;
  return <button className={`pending-link ${className}`} type="button" onClick={() => openPanel({ kind, network })} aria-haspopup="dialog">{label}<span>Coming soon</span></button>;
}
