import { BatteryMedium, Check, ClipboardList, Smartphone, Wrench } from 'lucide-react';

function IntakeGuideArt() {
  return <div className="resource-art resource-art-intake" aria-hidden="true">
    <div className="resource-art-paper-back" />
    <div className="resource-art-sheet">
      <div className="resource-art-sheet-head"><ClipboardList size={15} /><span>Repair / #1048</span></div>
      <p className="resource-art-sheet-title">A good place to start.</p>
      <div className="resource-art-checklist">
        <span><Check size={12} /><span>Customer details</span></span>
        <span><Check size={12} /><span>Device &amp; condition</span></span>
        <span><Check size={12} /><span>Agreed next step</span></span>
      </div>
      <div className="resource-art-sheet-footer"><span>Intake, in order.</span><span>01—03</span></div>
    </div>
  </div>;
}

function StockGuideArt() {
  return <div className="resource-art resource-art-stock" aria-hidden="true">
    <div className="resource-art-stock-pair">
      <div className="resource-art-stock-item resource-art-stock-screen">
        <div className="resource-art-stock-top"><Smartphone size={29} /><span>Bin / A-04</span></div>
        <h4>Screen assembly</h4>
        <div className="resource-art-stock-count"><strong>12</strong><span>units on shelf</span></div>
      </div>
      <div className="resource-art-stock-item resource-art-stock-battery">
        <div className="resource-art-stock-top"><BatteryMedium size={29} /><span>Bin / A-05</span></div>
        <h4>Battery pack</h4>
        <div className="resource-art-stock-count"><strong>08</strong><span>units on shelf</span></div>
      </div>
    </div>
    <div className="resource-art-stock-note"><Check size={12} /><span>Everything in its place.</span></div>
  </div>;
}

function HandoffGuideArt() {
  return <div className="resource-art resource-art-handoff" aria-hidden="true">
    <div className="resource-art-connection" />
    <div className="resource-art-person resource-art-person-counter"><span>ST</span><small>Front desk</small></div>
    <div className="resource-art-person resource-art-person-bench"><span>AL</span><small>The bench</small></div>
    <div className="resource-art-handoff-ticket">
      <div><Wrench size={13} /><span>Repair / #1048</span></div>
      <strong>Screen repair</strong>
      <p>One ticket. Shared notes.</p>
    </div>
    <span className="resource-art-handoff-check"><Check size={14} /></span>
  </div>;
}

export function ResourceGuideArt({ index }: { index: number }) {
  if (index === 0) return <IntakeGuideArt />;
  if (index === 1) return <StockGuideArt />;
  return <HandoffGuideArt />;
}
