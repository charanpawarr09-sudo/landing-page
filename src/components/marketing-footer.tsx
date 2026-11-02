import Link from 'next/link';
import { BrandMark } from './brand-mark';
import { SocialIcon } from './social-icons';
import { PendingLink } from './trial-action';
import { SocialAction } from './social-action';

export function MarketingFooter() {
  return <footer className="marketing-footer">
    <div className="container">
      <div className="footer-top">
        <div className="footer-identity"><Link className="brand-lockup" href="/" aria-label="Repairnox home"><BrandMark/><span>Repairnox<span className="brand-dot">.</span></span></Link><p>One workspace.<br/>Your whole repair shop.</p><span className="prelaunch-label"><span/>Pre-launch preview</span></div>
        <nav aria-label="Product links"><span className="footer-column-label">Explore</span><Link href="/#features">Features</Link><Link href="/#workflow">How it works</Link><Link href="/#pricing">Pricing</Link><Link href="/#faq">Questions</Link></nav>
        <nav aria-label="Company links"><span className="footer-column-label">Repairnox</span><Link href="/#about">About</Link><Link href="/#resources">Shop resources</Link><PendingLink kind="contact" label="Contact"/></nav>
        <div className="footer-social-column"><span className="footer-column-label">Stay connected</span><p>Social profiles coming soon.</p><div className="social-row">{(['instagram','facebook','linkedin'] as const).map(platform=><SocialAction key={platform} platform={platform}><SocialIcon platform={platform}/></SocialAction>)}</div></div>
      </div>
      <div className="footer-legal"><p>© 2026 Repairnox. All rights reserved.</p><PendingLink kind="privacy" label="Privacy Policy"/></div>
    </div>
  </footer>;
}
