import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BrandMark } from "@/components/marketing/MarketingVisuals";
import "@/components/marketing/marketing.css";

export const metadata = {
  title: "Getting started — RepairNox",
  description: "A quick introduction to the RepairNox repair shop workflow.",
};
export default function GuidePage() {
  return (
    <main className="rn-marketing rn-guide rn-container">
      <Link href="/" className="rn-brand">
        <BrandMark />
        RepairNox
      </Link>
      <Link href="/" className="rn-text-link">
        <ArrowLeft size={15} />
        Back to home
      </Link>
      <span className="rn-eyebrow">Getting started</span>
      <h1>
        A clear path.
        <br />
        From drop-off to pickup.
      </h1>
      <p>
        Explore the sample workspace on the home page. Every record in the demo
        is fictional, and every action stays in your browser.
      </p>
      <ol>
        {[
          {
            title: "Check in the device",
            text: "Look up the customer by phone, choose the device and issue, and create a work order. Print a claim tag for collection.",
          },
          {
            title: "Keep the repair moving",
            text: "Assign a technician, reserve the right part, and complete the repair checks. Open the ticket to see its diagnosis and notes.",
          },
          {
            title: "Keep device codes private",
            text: "Passcodes are masked by default and isolated to the shop. They are excluded from claim tags and cleared when the repair is completed. The demo uses a sample PIN.",
          },
          {
            title: "Complete the handover",
            text: "Use cash or a terminal register, issue an invoice, and follow up with a Google review invitation. Demo checkout never charges money or sends messages.",
          },
        ].map((s) => (
          <li key={s.title}>
            <h2>{s.title}</h2>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
      <Link href="/" className="rn-button">
        Explore the demo <ArrowRight size={16} />
      </Link>
      <Link href="/login" className="rn-text-link">
        Already have a shop? Log in <ArrowRight size={14} />
      </Link>
    </main>
  );
}
