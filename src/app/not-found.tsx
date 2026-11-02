import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SiteFrame } from '@/components/site-frame';
export default function NotFound(){
  return <SiteFrame><main id="main-content" className="not-found-page container"><p className="eyebrow">404 · Page not found</p><h1>Let’s get you<br/><span>back on track.</span></h1><p>This page may have moved, or the link may be incomplete. Your next step is right here.</p><div><Link className="button button-dark" href="/"><ArrowLeft size={17} aria-hidden="true"/>Back to Repairnox</Link><Link className="button button-outline" href="/#workflow">Explore the demo<ArrowRight size={17} aria-hidden="true"/></Link></div></main></SiteFrame>;
}
