import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { ContentPage, ContentCta } from "@/components/landing-page/ContentPage";
import styles from "@/components/landing-page/content-page.module.css";

export const metadata = pageMetadata("About RepairNox | Repair Shop Management Software", "RepairNox, operated by Zonoha Group, connects repair tickets, parts, customers, and checkout in a shared workspace for independent repair shops.", "/about");

export default function AboutPage() {
  return <ContentPage title="A shared workspace for the everyday work of repair" description="RepairNox brings repair tickets, parts inventory, customer records, and checkout together for independent repair businesses." breadcrumb={[{ name: "About", path: "/about" }]}>
    <div className={styles.body}>
      <section className={styles.section}><h2>Who operates RepairNox?</h2><p>RepairNox is operated by Zonoha Group. The product focuses on the details that connect the counter, the repair bench, and the final sale: what came in, who is handling it, what part is needed, and what remains to be paid.</p></section>
      <section className={styles.section}><h2>Evaluate the workflow with your own shop in mind</h2><p>The product views on our homepage are illustrations with fictional sample data. For a useful evaluation, bring a typical repair and your essential requirements to the trial discussion. Ask about your existing records, hardware, payment setup, and any specialist industry tools.</p></section>
      <section className={styles.section}><h2>Talk to the team</h2><p>Use our <Link href="/contact" className={styles.inlineLink}>contact page</Link> for product questions, pricing discussions, or a trial inquiry. Existing customers can find support details on the <Link href="/support" className={styles.inlineLink}>support page</Link> and instructions in the <a href="https://help.repairnox.com" className={styles.inlineLink}>Help Center</a>.</p><p>Our <Link href="/privacy" className={styles.inlineLink}>Privacy Policy</Link> and <Link href="/terms" className={styles.inlineLink}>Terms of Service</Link> explain the relevant policies. Sending a trial inquiry does not start a paid subscription.</p></section>
    </div><ContentCta />
  </ContentPage>;
}
