"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from 'react';
import { useAnimationControls, useInView } from 'framer-motion';
import * as m from 'framer-motion/m';
import './motion-primitives.css';

const motionQuery = '(prefers-reduced-motion: reduce)';

function subscribeToMotionPreference(onChange: () => void) {
  const preference = window.matchMedia(motionQuery);
  preference.addEventListener('change', onChange);
  return () => preference.removeEventListener('change', onChange);
}

function getMotionPreference() {
  return window.matchMedia(motionQuery).matches;
}

// The server and hydration pass always render the complete, static content.
function getServerMotionPreference() {
  return true;
}

export function useMotionPreference() {
  return useSyncExternalStore(subscribeToMotionPreference, getMotionPreference, getServerMotionPreference);
}

export function Reveal({ children, className = '', id, delay = 0 }: {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const played = useRef(false);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reduced = useMotionPreference();
  const controls = useAnimationControls();

  useEffect(() => {
    if (reduced) {
      controls.stop();
      controls.set({ opacity: 1, y: 0 });
      return;
    }
    if (!inView || played.current) return;
    played.current = true;
    void controls.start({
      opacity: [0.65, 1],
      y: [16, 0],
      transition: { duration: 0.48, delay: Math.min(Math.max(delay, 0), 0.24), ease: [0.22, 1, 0.36, 1] },
    });
  }, [controls, delay, inView, reduced]);

  return <m.div ref={ref} id={id} className={`motion-reveal ${className}`} initial={false} animate={controls}>{children}</m.div>;
}
