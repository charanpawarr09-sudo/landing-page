"use client";

import { freeTrialHref } from "@/lib/marketing-contact";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, ChartNoAxesCombined, ClipboardList, Package, Users } from "lucide-react";
import { CustomerPanel, InventoryPanel, RepairPanel, ReportPanel } from "./ProductPanels";
import styles from "./landing-page.module.css";

const areas = [
  { name: "Repairs", icon: ClipboardList, title: "Know where every repair stands", text: "Keep device details, diagnosis, technician assignments, and status together. Give the next person a clear picture of the job.", points: ["Tickets and estimates", "Status tracking and technician assignments"], panel: RepairPanel },
  { name: "Inventory", icon: Package, title: "Find the part. Plan the repair", text: "See your stock, shelf locations, and low-stock items in one place. Keep replacement parts and retail accessories organized.", points: ["Parts, categories, and shelf locations", "Stock levels and low-stock thresholds"], panel: InventoryPanel },
  { name: "Customers", icon: Users, title: "Make every return visit familiar", text: "Look up contact details and past work without starting the conversation from scratch. Keep customer records close to the repairs they belong to.", points: ["Searchable customer profiles", "Repair history and appointment records"], panel: CustomerPanel },
  { name: "Reports", icon: ChartNoAxesCombined, title: "Close the day with a clearer picture", text: "Review cash, card, refunds, and taxes in monthly reports. Move from the big picture to a daily breakdown when you need the detail.", points: ["Monthly payment summaries", "Daily totals for owners and admins"], panel: ReportPanel },
] as const;

export function ProductTour() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const area = areas[selected];
  const Panel = area.panel;
  const keyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % areas.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + areas.length) % areas.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = areas.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className={styles.tour}>
      <div className={styles.tourTabs} role="tablist" aria-label="Explore product areas">
        {areas.map(({ name, icon: Icon }, index) => <button key={name} ref={node => { tabs.current[index] = node; }} type="button" role="tab" id={`${id}-tab-${index}`} aria-selected={selected === index} aria-controls={`${id}-panel-${index}`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => keyboard(event, index)}><Icon size={18} strokeWidth={1.5} aria-hidden="true" />{name}</button>)}
      </div>
      {areas.map((item, index) => <div key={item.name} id={`${id}-panel-${index}`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`} tabIndex={0} hidden={selected !== index}>
        {selected === index ? <div className={styles.tourPanel}>
          <div className={styles.tourCopy}><span className={styles.eyebrow}>Inside the workspace</span><h3>{area.title}</h3><p>{area.text}</p><ul>{area.points.map(point => <li key={point}><span aria-hidden="true">↳</span>{point}</li>)}</ul><a href={freeTrialHref} className={styles.textLink}>Start free trial <ArrowRight size={17} aria-hidden="true" /></a></div>
          <div className={styles.tourVisual}><Panel /><span className={styles.visualCaption}>Illustrative product view · Fictional sample data</span></div>
        </div> : null}
      </div>)}
    </div>
  );
}
