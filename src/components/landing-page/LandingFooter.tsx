import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { companyIdentifier, marketingContactHref } from "@/lib/marketing-contact";
import styles from "./landing-page.module.css";

export function LandingFooter({ helpCenter = false }: { helpCenter?: boolean }) {
  const website = (path: string) => helpCenter ? `https://repairnox.com${path}` : path;
  return (
    <footer className={`${styles.container} ${styles.footer}`}>
      <div><Link href={website("/")} className={styles.wordmark}><picture><source srcSet="/marketing/repairnox-wordmark-display-1x.png 1x, /marketing/repairnox-wordmark-display-2x.png 2x, /marketing/repairnox-wordmark-display-3x.png 3x" /><Image src="/marketing/repairnox-wordmark-display-1x.png" alt="RepairNox" width={183} height={48} className={styles.brandLogo} unoptimized /></picture></Link><p>Software for the everyday work of repair</p><Link href={website(marketingContactHref)} className={styles.footerContact}>Contact us <ArrowUpRight size={14} aria-hidden="true" /></Link></div>
      <nav aria-label="Footer navigation"><Link href={website("/#platform")}>The platform</Link><Link href={website("/industries")}>Industries</Link><Link href={website("/guides")}>Guides</Link><Link href={website("/about")}>About RepairNox</Link><Link href={website("/pricing")}>Pricing</Link><Link href="https://help.repairnox.com">Help</Link><Link href="https://app.repairnox.com/login">Sign in <ArrowUpRight size={16} aria-hidden="true" /></Link></nav>
      <nav className={styles.legalNavigation} aria-label="Policies and support"><Link href={website("/privacy")}>Privacy Policy</Link><Link href={website("/terms")}>Terms of Service</Link><Link href={website("/support")}>Support & Help</Link></nav>
      <div className={styles.footerBottom}><span>© {new Date().getFullYear()} {companyIdentifier}</span><span>repairnox.com</span><a href="#page-top">Back to top ↑</a></div>
    </footer>
  );
}
