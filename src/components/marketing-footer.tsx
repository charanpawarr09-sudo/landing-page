import { BrandMark } from './brand-mark';
import { SocialIcon } from './social-icons';
import { PendingLink } from './trial-action';
import { SocialAction } from './social-action';

export function MarketingFooter() {
  return <footer className="marketing-footer">
    <div className="container">
      <div className="footer-top">
        <div className="footer-identity"><a className="brand-lockup" href="/" aria-label="Repairnox home"><BrandMark/><span>Repairnox<span className="brand-dot">.</span></span></a><p>One workspace.<br/>Your whole repair shop.</p><span className="prelaunch-label"><span/>Pre-launch preview</span></div>
        <nav aria-label="Product links"><span className="footer-column-label">Explore</span><a href="/#features">Features</a><a href="/#workflow">How it works</a><a href="/#pricing">Pricing</a><a href="/#faq">Questions</a></nav>
        <nav aria-label="Company links"><span className="footer-column-label">Repairnox</span><a href="/#about">About</a><a href="/#resources">Shop resources</a><PendingLink kind="contact" label="Contact"/></nav>
        <div className="footer-social-column"><span className="footer-column-label">Stay connected</span><p>Social profiles coming soon.</p><div className="social-row">{(['instagram','facebook','linkedin'] as const).map(platform=><SocialAction key={platform} platform={platform}><SocialIcon platform={platform}/></SocialAction>)}</div></div>
      </div>
      <div className="footer-legal"><p>© 2026 Repairnox. All rights reserved.</p><PendingLink kind="privacy" label="Privacy Policy"/></div>
    </div>
  </footer>;
}
