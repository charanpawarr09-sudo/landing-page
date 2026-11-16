"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { freeTrialHref } from "@/lib/marketing-contact";
import { ArrowUpRight, Menu, X } from "lucide-react";
import styles from "./landing-page.module.css";

const links = [
  ["Platform", "#platform"],
  ["Pricing", "/pricing"],
  ["Help", "https://help.repairnox.com"],
] as const;

export function LandingHeader({ helpCenter = false }: { helpCenter?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <header ref={header} className={styles.header}>
      <div className={styles.headerInner}>
        <Link href={helpCenter ? "https://repairnox.com" : "/"} className={styles.wordmark} aria-label="RepairNox home">
          <picture><source srcSet="/marketing/repairnox-wordmark-display-1x.png 1x, /marketing/repairnox-wordmark-display-2x.png 2x, /marketing/repairnox-wordmark-display-3x.png 3x" /><Image src="/marketing/repairnox-wordmark-display-1x.png" alt="RepairNox" width={183} height={48} className={styles.brandLogo} unoptimized /></picture>
        </Link>
        <nav id="landing-navigation" aria-label="Main navigation" className={`${styles.navigation} ${open ? styles.navigationOpen : ""}`}>
          {links.map(([label, href]) => {
            const localDestination = href.startsWith("#") && pathname !== "/" ? `/${href}` : href;
            const destination = helpCenter && !href.startsWith("https:") ? `https://repairnox.com${href.startsWith("#") ? "/" : ""}${href}` : localDestination;
            return <Link key={href} href={destination} aria-current={(helpCenter ? label === "Help" : pathname === href) ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>;
          })}
        </nav>
        <div className={styles.headerActions}>
          <Link href="https://app.repairnox.com/login" className={styles.signIn}>Sign in</Link>
          <Link href={helpCenter ? `https://repairnox.com${freeTrialHref}` : freeTrialHref} className={styles.button}>Free trial <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" /></Link>
          <button ref={toggle} type="button" className={styles.menuButton} aria-controls="landing-navigation" aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(value => !value)}>
            {open ? <X size={20} strokeWidth={1.5} aria-hidden="true" /> : <Menu size={20} strokeWidth={1.5} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
