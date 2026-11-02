import { MarketingProvider } from './marketing-provider';
import { SiteHeader } from './site-header';
import { MarketingFooter } from './marketing-footer';
import { contactEmail, trialHref } from '@/lib/site-config';

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return <MarketingProvider trialHref={trialHref} contactEmail={contactEmail}><SiteHeader/>{children}<MarketingFooter/></MarketingProvider>;
}
