"use client";

import { useEffect } from "react";

export function PanelReveals() {
  useEffect(() => {
    const root = document.querySelector("[data-landing-page]");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!root || preference.matches || !("IntersectionObserver" in window)) return;
    const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal-panel]"));
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.panelState = "revealed";
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08 });
    const showAll = () => {
      observer.disconnect();
      panels.forEach(panel => { delete panel.dataset.panelState; });
    };
    const onPreferenceChange = () => {
      if (preference.matches) showAll();
    };
    panels.forEach(panel => {
      panel.dataset.panelState = "pending";
      observer.observe(panel);
    });
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      showAll();
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, []);

  return null;
}
