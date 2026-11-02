import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SiteFrame } from '@/components/site-frame';
import { CinematicHero } from '@/components/cinematic-hero';
import { ShopBenefits } from '@/components/shop-benefits';
import { ProductBenefits } from '@/components/product-benefits';
import { WorkflowDemo } from '@/components/workflow-demo';
import { Reveal } from '@/components/motion-primitives';
import { ResourceGuideArt } from '@/components/resource-guide-art';
import { AboutSection, PricingSection, FaqSection, FinalSection } from '@/components/marketing-sections';
import { guides } from '@/content/guides';
import '@/components/marketing-sections.css';
import '@/components/premium-landing.css';
import '@/components/resource-guides.css';

export default function Home() {
  return <SiteFrame>
    <main id="main-content" className="premium-home">
      <CinematicHero />
      <ShopBenefits />
      <WorkflowDemo />
      <ProductBenefits />
      <AboutSection />
      <PricingSection />
      <FaqSection />
      <section className="resources-section" id="resources" aria-labelledby="resources-heading"><div className="container">
        <Reveal className="resources-heading"><div><p className="eyebrow">The repair shop field notes</p><h2 className="section-heading" id="resources-heading">Small habits.<br /><span>Better shop days.</span></h2></div><p>Practical guides for the work behind every repair. Read, download, and make them your own.</p></Reveal>
        <div className="resource-grid">
          {guides.map((guide, index) => <Reveal key={guide.slug} delay={index * 0.06}>
            <Link className="resource-card" href={`/guides/${guide.slug}/`}>
              <ResourceGuideArt index={index} />
              <div className="resource-copy">
                <div className="resource-card-top"><span className="resource-category">{guide.category}</span><span className="resource-number">Field note / 0{index + 1}</span></div>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
                <div className="resource-card-footer"><span className="resource-link">Read the guide<ArrowUpRight size={16} aria-hidden="true" /></span><span className="resource-read-time">{guide.readTime}</span></div>
              </div>
            </Link>
          </Reveal>)}
        </div>
      </div></section>
      <FinalSection />
    </main>
  </SiteFrame>;
}
