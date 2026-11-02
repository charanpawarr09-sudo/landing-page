# Repairnox pricing section

## Plan and scope

Add exactly one pricing section below the existing social-proof section, with two plans and one CTA per card. Use the user's exact prices and requested plan positioning. Keep the existing page sections and SVG identity. No billing backend, subscriptions, payment collection, third plan, annual toggle, FAQ or other section.

## User-defined plan contents

- Standard Plan: regularly $39.99/month, discounted to $29.99/month, with an Early Bird badge. For one shop: ticket intake/tracking, POS/receipts, parts inventory, customer CRM and technician assignment.
- Pro Plan: $49.99/month. Everything in Standard, multi-store support, advanced analytics & KPI reports, unlimited staff and priority support. For growing/high-volume shops.

These are user-specified commercial plan contents, not a claim that subscription billing, multi-location management, support processes or plan entitlements were implemented or audited in this task. Do not invent an Early Bird expiry or discount duration, trial length, annual savings, per-store fee, unlimited locations, Standard staff cap, contract term or cancellation policy.

## Design and interaction

White Standard card with a clear Regularly label and struck-through old price; black Pro card. Equal-height desktop cards, readable monthly units, semantic checklists and full-width CTA buttons. Mobile stacks Standard before Pro. A shared polite status confirms the selected plan locally: **Standard Plan selected. Sign-up is coming soon.** or the Pro equivalent. The buttons do not imply a purchase, navigate to a guessed URL or start a subscription.

Stitch project: 4619699733370541135
Screen: projects/4619699733370541135/screens/fef13aeea8714c36bce44ad68cf48a4d
Title: Repairnox — Pricing Section

UI/UX Pro Max verified pricing comparison and Minimalism & Swiss Style guidance. Only card-level CTAs are applied; no suggested comparison table/FAQ/extra CTA or brand-incompatible colors. Existing reduced-motion context covers a short entrance, with readable initial HTML.

## Verification

- Production static export and included strict TypeScript check pass.
- Actual browser confirms exactly two cards and two pricing CTAs, one Early Bird badge, Standard's $39.99 regular/$29.99 current monthly prices and Pro's $49.99 monthly price. All requested checklist items are present.
- Both CTAs activate with Enter, preserve focus, show a 3px focus ring and update the polite status with the correct selected plan. URL stays unchanged; no subscription or payment is created.
- Checked at 1440, 1024, 768 and 375px. No horizontal page overflow or clipped prices/headings/features; mobile cards stack Standard before Pro. Both buttons remain 52px high.
- Browser logs contain no warnings or errors. Source review confirms scope, exact pricing and lack of invented terms. Reduced motion is inherited and source-reviewed.
- Screenshot: `preview/pricing-desktop.jpg`.

## Suggested activeContext.md update

The standalone Repairnox page in `/home/ram/Downloads/repair-shop-workspace` now has a two-plan pricing section below the sample testimonials: Standard $29.99/month Early Bird (regularly $39.99), Pro $49.99/month. Plan contents follow the user's commercial brief. Buttons currently select a plan locally and disclose sign-up is pending; no subscription/billing or new application capabilities were implemented. Local-only; original application and production unchanged.
