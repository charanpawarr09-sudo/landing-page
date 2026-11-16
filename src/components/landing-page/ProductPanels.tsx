import { ArrowDownLeft, ArrowUpRight, Check, ChevronDown, CircleCheck, ClipboardList, CreditCard, Laptop, LayoutGrid, Package, Search, Smartphone, Users } from "lucide-react";
import styles from "./landing-page.module.css";

// Fictional product examples. This module never fetches or writes shop data.
const sampleRepairs = [
  { id: "RN-2081", device: "iPhone 14", issue: "Screen replacement", initials: "ME", status: "In progress", tone: "statusProgress", icon: Smartphone },
  { id: "RN-2082", device: "MacBook Pro", issue: "Battery replacement", initials: "DP", status: "Ready for pickup", tone: "statusReady", icon: Laptop },
  { id: "RN-2083", device: "Samsung Galaxy S23", issue: "Charging port", initials: "RB", status: "Waiting for parts", tone: "statusWaiting", icon: Smartphone },
] as const;

export function RepairPanel({ hero = false }: { hero?: boolean }) {
  const repairs = hero ? sampleRepairs.slice(0, 2) : sampleRepairs;
  return (
    <div className={`${styles.repairPanel} ${hero ? styles.heroPanel : ""}`}>
      <div className={styles.appBar}>
        <span className={styles.appBrand}>RepairNox</span>
        <span className={styles.appShop}>Oak Street Repairs <ChevronDown size={12} aria-hidden="true" /></span>
        <span className={styles.appAvatar}>OS</span>
      </div>
      <div className={styles.appBody}>
        <div className={styles.appRail} aria-hidden="true">
          {[LayoutGrid, ClipboardList, Package, Users, CreditCard].map((Icon, index) => <span key={index} className={index === 1 ? styles.railActive : ""}><Icon size={18} strokeWidth={1.5} /></span>)}
        </div>
        <div className={styles.appContent}>
          <div className={styles.appTitle}><p className={styles.appHeading}>Repair tickets</p><span className={styles.sampleLabel}>Sample workspace</span></div>
          <div className={styles.appFilters}><span className={styles.filterActive}>Open tickets</span><span>Completed</span><span><Search size={14} aria-hidden="true" />Search</span></div>
          <div className={styles.tableHeading}><span>Device / repair</span><span>Status</span></div>
          {repairs.map(({ id, device, issue, initials, status, tone, icon: Icon }) => (
            <div className={styles.repairRow} key={id}>
              <span className={styles.deviceTile}><Icon size={24} strokeWidth={1.5} aria-hidden="true" /></span>
              <div className={styles.repairDevice}><small>{id}</small><strong>{device}</strong><span>{issue}</span></div>
              <div className={styles.repairState}><span className={`${styles.status} ${styles[tone]}`}>{tone === "statusReady" ? <Check size={12} aria-hidden="true" /> : <i aria-hidden="true" />}{status}</span><span className={styles.assignee}>{initials}<span>Assigned</span></span></div>
            </div>
          ))}
          <div className={styles.appFoot}><CircleCheck size={14} aria-hidden="true" /><span>From intake to collection</span><span>{repairs.length} sample tickets</span></div>
        </div>
      </div>
    </div>
  );
}

export function InventoryPanel() {
  return (
    <div className={styles.detailPanel}>
      <div className={styles.detailHeading}><div><span>Parts & accessories</span><h3>Know what’s on the shelf</h3></div><Package size={20} strokeWidth={1.5} aria-hidden="true" /></div>
      <div className={styles.inventoryHeader}><span>Item</span><span>Bin</span><span>Stock</span></div>
      {[
        { name: "iPhone 14 display", detail: "Replacement part", location: "A–04", stock: "8", low: false },
        { name: "MacBook Pro battery", detail: "Replacement part", location: "B–02", stock: "2", low: true },
        { name: "USB-C charging cable", detail: "Accessory", location: "C–01", stock: "16", low: false },
      ].map((item) => <div className={styles.inventoryRow} key={item.name}><span><strong>{item.name}</strong><small>{item.detail}</small></span><span>{item.location}</span><b className={item.low ? styles.lowStock : ""}>{item.stock}</b></div>)}
      <div className={styles.stockNotice}><span aria-hidden="true">↳</span><div><strong>Low stock: MacBook Pro battery</strong><span>Set thresholds to see what needs attention</span></div></div>
    </div>
  );
}

export function CustomerPanel() {
  return (
    <div className={styles.detailPanel}>
      <div className={styles.detailHeading}><div><span>Customer records</span><h3>Pick up where you left off</h3></div><Users size={20} strokeWidth={1.5} aria-hidden="true" /></div>
      <div className={styles.customerProfile}><span>ME</span><div><strong>Morgan Ellis</strong><span>Sample customer · Personal account</span></div></div>
      <div className={styles.customerInfo}><span>Contact<b>morgan@example.com</b></span><span>History<b>Repairs & purchases</b></span></div>
      <h4 className={styles.miniHeading}>Repair history</h4>
      <div className={styles.historyItem}><span className={styles.historyDot} aria-hidden="true" /><div><strong>iPhone 14 · Screen replacement</strong><span>RN-2081 · In progress</span></div></div>
      <div className={styles.historyItem}><span className={styles.historyDotComplete}><Check size={10} aria-hidden="true" /></span><div><strong>iPad Air · Battery replacement</strong><span>RN-1964 · Collected</span></div></div>
    </div>
  );
}

export function ReportPanel() {
  return (
    <div className={styles.detailPanel}>
      <div className={styles.detailHeading}><div><span>Owner reporting</span><h3>The business behind the bench</h3></div><span className={styles.reportMonth}>Sample month</span></div>
      <div className={styles.reportTotals}><div><span>Cash</span><strong>$640.00</strong></div><div><span>Card</span><strong>$1,280.00</strong></div><div><span>Refunds</span><strong>$75.00</strong></div></div>
      <div className={styles.paymentBreakdown}><span className={styles.reportRing} aria-hidden="true" /><div><h4>Payments at a glance</h4><span><i />Cash</span><span><i />Card</span></div></div>
      <div className={styles.reportLine}><span><ArrowDownLeft size={16} aria-hidden="true" />Payments received</span><strong>$1,920.00</strong></div>
      <div className={styles.reportLine}><span><ArrowUpRight size={16} aria-hidden="true" />Refunds recorded</span><strong>$75.00</strong></div>
      <div className={`${styles.reportLine} ${styles.reportNet}`}><span>Net total</span><strong>$1,845.00</strong></div>
    </div>
  );
}
