"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import "lenis/dist/lenis.css";

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (!["/", "/pricing", "/guide", "/contact", "/support", "/privacy", "/terms"].includes(pathname)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let instance: Lenis | undefined;
    let frame = 0;
    let generation = 0;
    let disposed = false;

    const tick = (time: number) => {
      instance?.raf(time);
      frame = window.requestAnimationFrame(tick);
    };
    const destroy = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      instance?.destroy();
      instance = undefined;
    };
    const configure = async () => {
      const current = ++generation;
      destroy();
      if (preference.matches) return;
      try {
        const { default: Lenis } = await import("lenis");
        if (disposed || preference.matches || current !== generation) return;
        instance = new Lenis({
          autoRaf: false,
          lerp: 0.14,
          smoothWheel: true,
          syncTouch: false,
          respectReducedMotion: true,
          stopInertiaOnNavigate: true,
        });
        if (!document.hidden) frame = window.requestAnimationFrame(tick);
      } catch {
        // Native scrolling remains available if the optional enhancement fails.
      }
    };
    const visibility = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      if (instance && !document.hidden) {
        instance.resize();
        frame = window.requestAnimationFrame(tick);
      }
    };
    const anchorClick = (event: MouseEvent) => {
      if (!instance || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || destination.pathname !== window.location.pathname || destination.search !== window.location.search || !destination.hash) return;
      let target: HTMLElement | null;
      try { target = document.getElementById(decodeURIComponent(destination.hash.slice(1))); }
      catch { return; }
      if (!target) return;
      event.preventDefault();
      if (destination.hash !== window.location.hash) window.history.pushState(null, "", destination.hash);
      const section = target;
      instance.scrollTo(section, {
        duration: 0.8,
        lerp: 0,
        immediate: destination.hash === "#main-content",
        onComplete: () => {
          if (!section.isConnected) return;
          // Preserve native anchor focus without a second browser scroll.
          const hadTabIndex = section.hasAttribute("tabindex");
          if (!hadTabIndex) section.setAttribute("tabindex", "-1");
          section.focus({ preventScroll: true });
          if (!hadTabIndex) section.removeAttribute("tabindex");
        },
      });
    };

    void configure();
    preference.addEventListener("change", configure);
    document.addEventListener("visibilitychange", visibility);
    document.addEventListener("click", anchorClick, true);
    return () => {
      disposed = true;
      generation++;
      destroy();
      preference.removeEventListener("change", configure);
      document.removeEventListener("visibilitychange", visibility);
      document.removeEventListener("click", anchorClick, true);
    };
  }, [pathname]);

  return null;
}
