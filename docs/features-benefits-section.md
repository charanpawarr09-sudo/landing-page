# Repairnox features and benefits section

## Plan and scope

Add one section directly after the existing problem-and-solution section. Build exactly four feature cards, each with one icon, a feature heading and exactly two description sentences. Preserve the existing hero, SVG logo, comparison section, single trial CTA and behavior. No new application workflows, controls, navigation, pricing, footer or deployment.

Use the existing monochrome Geist design, a spacious two-by-two card grid, subtle borders and consistent Lucide outline icons. Collapse to one column on phones. The shared MotionConfig supplies reduced-motion handling for a single short entrance; no perpetual animation or interactive-looking card controls.

## Verified application features

Evidence comes from actual UI, action and service code in `/home/ram/Downloads/repair-shop-software-main`, read-only.

| Card | Source evidence | Owner benefit |
| --- | --- | --- |
| Repair ticketing | `src/lib/firebase/repair-firestore.ts:36` validates customer/device/issues/notes; `src/actions/repair-actions.ts:109` creates tickets; `src/components/repairs/ticket-status-control.tsx:7` defines statuses. | Keep job information together and find repair status. |
| Technician assignment | `src/components/repairs/ticket-assignee-control.tsx:38` exposes assignment; `src/components/repairs/repair-tickets-view.tsx:317` displays assigned technicians; `src/lib/firebase/repair-assignment-firestore.ts:65` persists assignment notices. | Make job ownership and handoffs clear. |
| Parts inventory | `src/components/inventory/inventory-view.tsx:378` supports SKU search, `:402` filters low stock, `:544` checks thresholds, `:629` restocks; `src/lib/firebase/inventory-firestore.ts:592` persists stock adjustments. | Identify low stock and plan replenishment. |
| POS checkout | `src/components/pos/pos-terminal-view.tsx:1139` supports catalog items and linked tickets; `src/actions/pos-actions.ts:34` processes checkout; `src/lib/firebase/pos-firestore-service.ts:1930` returns receipts; `src/components/pos/pos-terminal-view.tsx:3764` prints receipts. | Keep repair/product checkout and sales records organized. |

No claims about automatic reordering, technician timers, workload optimization, pushed low-stock messages, guaranteed savings or a specific payment provider.

## Design references

Stitch project: 4619699733370541135
Screen: projects/4619699733370541135/screens/57ad2ff125cc42b0803f911554bfc72c
Title: Repairnox — Features and Benefits (Pure Grid)

Applied its four-card monochrome grid, outline icons, restrained numbering and clean hierarchy. Final wording was refined against application evidence. UI/UX Pro Max returned a verified Minimalism & Swiss Style match and heading-hierarchy guidance. Existing Next.js client boundary and reduced-motion context are reused.

## Verification

- Production static export and included strict TypeScript check pass.
- Actual browser verifies exactly four cards, one icon per card, and exactly two rendered sentences in every description.
- Verified at 1440, 1024, 768 and 375px. No page overflow or clipped card/heading/description text; the phone grid has one column and larger layouts retain two columns.
- Page order is hero, problem/solution, then features/benefits. One main landmark and the existing single trial CTA remain; the new section has zero controls.
- H2 section heading and four named H3 articles appear correctly in the accessibility tree. Browser logs have no warnings or errors. Read-only source review confirms wording and scope.
- Evidence saved at `preview/features-benefits-desktop.jpg`. Reduced-motion handling is source-reviewed through the existing MotionConfig; no media-emulation claim.

## Suggested activeContext.md update

The standalone landing page in `/home/ram/Downloads/repair-shop-workspace` now has one features-and-benefits section below the comparison section. Its four cards are grounded in source-verified ticketing, technician assignment/status, inventory/low-stock and POS/receipt workflows, with exactly two description sentences each. Existing SVG brand and single CTA remain. Local-only; original application source and production are unchanged.
