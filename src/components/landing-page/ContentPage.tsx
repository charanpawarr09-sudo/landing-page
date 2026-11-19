import Link from "next/link";
import type { ReactNode } from "react";
import { LandingHeader } from "./LandingHeader";
import { LandingFooter } from "./LandingFooter";
import { StructuredData } from "./StructuredData";
import { breadcrumbData } from "@/lib/seo";
import shared from "./landing-page.module.css";
import styles from "./content-page.module.css";

export function ContentPage({ title, description, breadcrumb, children }: {
  title: string; description: string; breadcrumb: { name: string; path: string }[]; children: ReactNode;
}) {
  const trail = [{ name: "Home", path: "/" }, ...breadcrumb];
  return <div className={shared.site} id="page-top">
    <a href="#main-content" className={shared.skipLink}>Skip to content</a>
    <LandingHeader />
    <main id="main-content" className={`${shared.container} ${styles.main}`}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}><ol>{trail.map((item, index) => <li key={item.path}>{index === trail.length - 1 ? <span aria-current="page">{item.name}</span> : <Link href={item.path}>{item.name}</Link>}</li>)}</ol></nav>
      <header className={styles.intro}><h1>{title}</h1><p>{description}</p></header>
      {children}
    </main>
    <LandingFooter />
    <StructuredData data={breadcrumbData(trail)} />
  </div>;
}

export function ContentCta() {
  return <section className={styles.cta} aria-labelledby="try-heading"><div><h2 id="try-heading">See how your shop would work in RepairNox</h2><p>Bring a typical repair and your essential requirements. We’ll help you assess the fit.</p></div><Link href="/contact?topic=trial" className={shared.button}>Discuss your free trial</Link><Link href="/pricing" className={styles.inlineLink}>View pricing and plans</Link></section>;
}
