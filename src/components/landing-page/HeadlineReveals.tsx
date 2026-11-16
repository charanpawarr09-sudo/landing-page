"use client";

import { useEffect } from "react";

interface HeadingState {
  element: HTMLElement;
  words: HTMLElement[];
}

export function HeadlineReveals() {
  useEffect(() => {
    const root = document.querySelector("[data-landing-page]");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Progressive enhancement: no JS, reduced motion, or no observer means visible text.
    if (!root || preference.matches || !("IntersectionObserver" in window)) return;

    const headings: HeadingState[] = Array.from(
      root.querySelectorAll<HTMLElement>("[data-scroll-heading]"),
      (element) => ({
        element,
        words: Array.from(element.querySelectorAll<HTMLElement>("[data-reveal-word]")),
      }),
    );
    const lookup = new Map(headings.map((heading) => [heading.element, heading]));
    const queued = new Set<HTMLElement>();
    let frame = 0;

    headings.forEach(({ element, words }) => {
      words.forEach((word, index) => {
        word.style.setProperty("--word-delay", `${Math.min(index * 70, 630)}ms`);
      });
      element.dataset.revealState = "pending";
    });

    // Two frames commit the starting pose before the staggered CSS transitions run.
    const schedule = () => {
      if (frame || !queued.size) return;
      frame = window.requestAnimationFrame(() => {
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          queued.forEach((element) => { element.dataset.revealState = "revealed"; });
          queued.clear();
        });
      });
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const heading = lookup.get(entry.target as HTMLElement);
        if (!heading) continue;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
          queued.add(heading.element);
        } else if (!entry.isIntersecting) {
          queued.delete(heading.element);
          // Reset only after the entire heading leaves, so visible text never vanishes.
          heading.element.dataset.revealState = "pending";
        }
      }
      schedule();
    }, { threshold: [0, 0.15] });

    const showAll = () => {
      observer.disconnect();
      queued.clear();
      window.cancelAnimationFrame(frame);
      frame = 0;
      headings.forEach(({ element, words }) => {
        element.dataset.revealState = "static";
        words.forEach((word) => word.style.removeProperty("--word-delay"));
      });
    };
    const onPreferenceChange = () => {
      if (preference.matches) showAll();
    };

    headings.forEach(({ element }) => observer.observe(element));
    preference.addEventListener("change", onPreferenceChange);

    return () => {
      showAll();
      preference.removeEventListener("change", onPreferenceChange);
      headings.forEach(({ element }) => { delete element.dataset.revealState; });
    };
  }, []);

  return null;
}
