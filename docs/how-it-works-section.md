# Repairnox How It Works section

## Plan and scope

Add one section directly below Features & Benefits. Show exactly three simple repair-shop stages as an open numbered timeline: check in the device, manage the repair, finish the pickup. Use plain language, one short sentence per step, the existing monochrome/Geist design and no extra CTA or interactive controls. Desktop runs left to right; phones run top to bottom. Keep all previous sections and application behavior.

## Actual application flow

Read-only evidence from `/home/ram/Downloads/repair-shop-software-main`:

- Intake: `src/lib/firebase/repair-firestore.ts:36` validates customer/device/issues/technician/parts; `:301` saves the intake ticket. `src/components/pos/repair-touch-wizard.tsx:462` assembles the device, issues, parts, assignment and notes.
- Repair: `src/components/repairs/ticket-status-control.tsx:7` lists intake through in-progress, ready and collected states. `src/lib/firebase/repair-firestore.ts:761` processes planned parts and pickup-checkout eligibility.
- Pickup: `src/components/repairs/ticket-detail-modal.tsx:126` allows balance collection on eligible ready/completed tickets. `src/components/pos/pos-terminal-view.tsx:1099` links the ticket to POS; `:3767` prints receipts. `src/components/repairs/ticket-status-control.tsx:16` exposes the collected state.
- Payment nuance: `src/components/pos/pos-terminal-view.tsx:3072` supports full payment, advance deposit and pay-at-pickup. Copy says **any balance due**, rather than claiming every repair is paid only at pickup.

These are three business stages, not a claim of three actual app screens or clicks. No automatic payment, automatic completion, setup-time, notification or speed promise.

## Design reference

Stitch project: 4619699733370541135
Screen: projects/4619699733370541135/screens/91968feb7b844b05ab1a8254fd3c97c6
Title: Repairnox — How It Works Section

Applied an open three-stage timeline to distinguish the workflow from the preceding feature cards. UI/UX Pro Max returned verified Minimalism & Swiss Style and heading-hierarchy guidance. The semantic ordered list has an H2 section heading and H3 step headings; decorative numbers/connectors are hidden from assistive technology. Shared MotionConfig handles reduced-motion preferences for one short entrance.

## Verification

- Production static build and included strict TypeScript check pass.
- Actual browser confirms exactly three ordered steps, correct wording, H2/H3 hierarchy and placement immediately after Features & Benefits.
- Checked 1440, 1024, 768 and 375px layouts. No horizontal page overflow or clipped headings/descriptions; the timeline becomes one vertical column on the phone. Desktop connector rules intentionally extend between step columns.
- New section has zero controls; the page retains its existing single CTA. Browser logs contain no warnings or errors.
- Independent source review confirms payment nuance, scope and reduced-motion inheritance. Media preferences were source-reviewed, not browser-emulated.
- Screenshot: `preview/how-it-works-desktop.jpg`.

## Suggested activeContext.md update

The standalone Repairnox landing page in `/home/ram/Downloads/repair-shop-workspace` now includes a How It Works section after Features & Benefits. It presents source-verified intake, repair and pickup/checkout stages in simple language, with an accurate any-balance-due payment qualifier. Local-only; original application and production remain unchanged.
