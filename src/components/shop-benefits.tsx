'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './shop-benefits.css';

const benefits = [
  {
    question: 'Where does this repair stand?',
    answer: 'Customer details, the reported issue and current status together.',
  },
  {
    question: 'Who is handling it?',
    answer: 'A named technician and the part associated with the job.',
  },
  {
    question: 'What is still due?',
    answer: 'The repair estimate, deposit and pickup balance in one record.',
  },
] as const;

export function ShopBenefits() {
  const section = useRef<HTMLElement>(null);
  const inView = useInView(section, { once: true, amount: 0.15 });

  return <section className="shop-benefits" id="product-story" ref={section} aria-labelledby="shop-benefits-heading">
    <div className="container shop-benefits-layout" data-enter={inView}>
      <div className="shop-benefits-intro">
        <h2 id="shop-benefits-heading">Less chasing.<br /><span>More clarity.</span></h2>
        <p>Keep repair details within reach, so your team can answer the questions that matter.</p>
      </div>
      <div className="shop-benefits-content">
        <dl className="shop-benefits-list">
          {benefits.map(({ question, answer }) => <div className="shop-benefits-row" key={question}>
            <dt>{question}</dt>
            <dd>{answer}</dd>
          </div>)}
        </dl>
        <a className="shop-benefits-link" href="#workflow">Try a sample repair<ArrowRight size={17} aria-hidden="true" /></a>
      </div>
    </div>
  </section>;
}
