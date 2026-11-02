'use client';

import { useRef, type ReactNode } from 'react';
import { useInView } from 'framer-motion';
import { useMotionPreference } from './motion-primitives';

/** Only the illustrative UI moves; the feature copy stays in ordinary HTML. */
export function FeatureArtMotion({ children, kind }: { children: ReactNode; kind: 'repair' | 'checkout' }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduced = useMotionPreference();
  return <div ref={ref} className={`feature-art feature-art-${kind}`} data-play={inView && !reduced} aria-hidden="true">{children}</div>;
}
