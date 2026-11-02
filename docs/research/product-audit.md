# Repairnox product and conversion audit

Date: 2026-10-29. Read-only source review of the original application and current standalone landing page. No application data, authentication, checkout, production settings or source were changed. Line references refer to the source state reviewed on this date.

## Audience and defensible promise

The original product context identifies independent repair-shop owners, managers, front-desk staff and technicians. Owners want less coordination and clearer job ownership; counter staff need simple intake; technicians need the device, issue, parts and current status together. Keep positioning specific to phone, computer and device repair shops; do not expand into automotive/service-field businesses without evidence.

Recommended promise: **One workspace for every repair, from check-in to checkout.** Support it with ticketing, technician assignment, stock visibility and POS. Avoid guaranteed time savings, zero lost tickets, automatic reordering, performance statistics or security certifications.

## Verified capabilities

All original-app paths below are relative to `/home/ram/Downloads/repair-shop-software-main`.

| Capability | Authoritative source | Safe visitor-facing claim |
| --- | --- | --- |
| Repair intake and tracking | `src/lib/firebase/repair-firestore.ts:36` input schema; `:259` ticket transaction; `:314` intake status; `src/actions/repair-actions.ts:109` create action. | Keep customer, device, issue and repair status on one ticket. |
| Real repair states | `src/components/repairs/ticket-status-control.tsx:7–19`; `src/lib/firebase/repair-firestore.ts:727–799` validates and persists changes/history. | Follow jobs through intake, work, parts waits, ready for pickup and collected. |
| Technician assignment | `src/lib/firebase/repair-assignment-firestore.ts:23` validates targets; `:38` lists permitted assignees; `:85` reminder claims; actual UI in `src/components/repairs/ticket-assignee-control.tsx`. | Know who owns each job and make handoffs clearer. Assignment is not workload optimization or automatic scheduling. |
| Parts inventory | `src/components/inventory/inventory-view.tsx:72–101` low-stock state/count; `:164–176` restock; `src/lib/firebase/inventory-firestore.ts:306` create, `:435` update, `:592` stock adjustment. | Search parts by name/SKU, see quantities and low-stock items, record restocking. |
| Checkout and receipts | `src/actions/pos-actions.ts:34–41` processes POS checkout and returns receipt; `:73` pay-at-pickup intake; original POS supports repair tickets, products, deposits and pickup balances. | Record repair/product sales and payments, collect any balance due and print a receipt. Do not imply all payments happen only at pickup or an unconfigured physical terminal works. |
| Customer records | `src/lib/firebase/customer-firestore.ts:26–49` includes contact details, notes, repair count, lifetime spend and credit; customer UI in `src/components/customers/customer-list-view.tsx`. | Keep customer details and service history together. |
| Shop reporting | `src/lib/firebase/report-firestore.ts:707–744` sales analytics; `:822` business intelligence; `:945–955` repair and employee metrics. | Review sales and repair performance. Do not turn existence of reports into a verified commercial Pro entitlement. |

## Onboarding exists; a Repairnox trial destination is not established

- The actual application route is **`/login`**, with a **New store owner** view. There is no verified standalone `/signup` route. `src/app/login/page.tsx:23–39` passes Firebase configuration status to the form.
- `src/components/auth/login-form.tsx:67–85` creates a Firebase account and sends email verification. `:118–145` reloads the user, requires verified email and calls `provisionOwnerAccount`. `:153–164` establishes the authenticated application session and opens `/pos`.
- This is genuine account/shop provisioning, **not a subscription or a time-limited trial**. Source inspected contains no implemented Standard/Pro billing, trial expiry, commercial entitlements, priority-support service or accepted trial policy.
- Original onboarding is currently specific to **US/USD** (`login-form.tsx:137–139`; `src/lib/firebase/owner-provisioning.ts:12`), with a chosen shop time zone. Avoid worldwide/currency claims.
- `src/app/login/page.tsx:8` still brands the application FixPro. The landing page is an independent static export (`next.config.ts`), with `NEXT_PUBLIC_TRIAL_URL` empty in `.env.example`. Its root-relative `/login` would therefore be a broken local link.
- Memory identifies an existing canonical Vercel app URL, but does not establish the proposed Repairnox domain as owned/connected. A read-only web attempt to inspect the canonical login page was unavailable through the web tool; no current production signup readiness claim is made. Do not link guessed `app.repairnox.com` or silently enable account creation.

## Claims that need qualification before a public launch

1. **Multi-store support:** the header exposes only the current primary location (`src/components/layout/header.tsx:133–148`). Business intelligence contains three explicitly unavailable placeholder branches (`src/lib/firebase/report-firestore.ts:939–943`), despite having a Multi-Store UI tab. Shared multi-tenancy means separate independent shop accounts; it does not prove one owner can operate/switch multiple branches. Mark this Pro capability planned/coming soon until implemented and verified.
2. **Pricing:** $29.99 Early Bird (regular $39.99) and $49.99 are explicit user-provided commercial offers, so preserve the chosen amounts. Distinguish proposed plan contents from enabled subscription entitlements. Unlimited staff and priority support have not been verified as implemented service promises.
3. **Testimonials:** `src/components/social-proof.tsx` uses invented people, businesses and quotes, currently clearly disclosed. Disclosure avoids pretending they are real, but fictional testimonials are weak public proof. Replace that section with a concrete, inspectable workflow demo or product facts; reintroduce endorsements only with permission and real quotes. Do not add review stars, customer counts, logo walls or measured savings.
4. **Enterprise/trust language:** tenant-rooted authorization exists, but this audit does not certify compliance, uptime, encryption coverage or production launch acceptance. Show inspectable product behavior and honest launch status instead of invented badges.
5. **Trial terms:** no verified duration, card policy, cancellation, migration service or onboarding time. Do not invent “14 days,” “no credit card,” “cancel anytime,” “set up in minutes” or “free migration.”

## Current conversion weaknesses

| Current interaction | Effect | Recommended change |
| --- | --- | --- |
| Header contains only logo | Long page has no convenient way to understand or reach the product, workflow or pricing. | Add clear navigation and a compact mobile menu, working anchor targets, visible focus and a skip link. |
| Hero and final trial buttons announce only coming soon | An interested visitor reaches a dead end. | Offer a working **Explore the demo** path now. Retain optional actual trial destination when supplied; make pending launch status visible before promising a signup. |
| Pricing buttons only announce selected plan | Selection does not carry to a concrete next action. | Persist the plan in a local demo/enquiry panel and show accurate next steps. If a real onboarding URL is supplied, pass only a recognized plan value through a documented URL contract. Do not imply purchase or account creation succeeded. |
| Static dashboard plus repeated card sections | Visitor cannot experience how one repair stays connected. | Build a self-contained sample repair journey: intake → assigned bench/parts → pickup receipt. Label sample data once clearly; allow keyboard/click interaction and reset. It must not connect to production or request passwords/customer data. |
| Three fictional testimonial cards | Space is spent imitating proof instead of proving the product. | Use real, source-backed workflow details or a product assurance section; leave real testimonial collection as launch work. |
| Footer mostly coming-soon controls | Repeated feedback adds little useful destination content. | Preserve the user's explicit pending-link choice. About can anchor to truthful product/audience information; Contact/Privacy/socials stay explicitly pending unless an authorized destination or accurate policy is supplied. No invented email or handles. |
| No launch FAQ | Buyer questions remain unanswered. | Add concise factual answers: intended shop types, ticket/stock/POS connection, devices, illustrative demo boundary, available/planned plan status and signup availability. Avoid unsupported guarantees. |

## Recommended honest local journey

1. State the audience and all-in-one benefit immediately, show a source-aligned product scene, provide a clear primary action and useful secondary demo path.
2. Let the visitor explore one sample repair across intake, bench and pickup. Actions change real local UI state and show the same ticket/customer/part throughout. Provide direct steps and Reset; no fake production mutation.
3. Explain the four real tools with benefits, then show transparent pricing with planned Pro capabilities separated from currently demonstrated ones.
4. Until the real trial launch is configured, a trial action should open a clear launch-status panel with a working demo action. Do not collect email and show “sent” without a receiving endpoint. Do not build a browser-only waitlist and imply Repairnox receives it.
5. When a verified onboarding URL is supplied, route trial buttons there; keep the demo as a lower-friction option. When an enquiry endpoint/contact address and privacy handling are supplied, a short accessible contact form can submit for real, with server validation/error/retry/success behavior.

This can deliver a polished, complete **local marketing/demo experience** now. Actual trial activation, delivered enquiries and launch legal/contact destinations remain external product/business dependencies and must be stated as such in handoff, not disguised by a green build.

## Suggested activeContext update

Repairnox landing-page research verified the source-backed intake, assignment, stock, checkout, customer and reporting workflows. Original `/login` has owner registration/email verification/shop provisioning but remains FixPro-branded; no Repairnox trial or subscription plan backend is verified. Multi-store branches are unavailable placeholders, not proof of multi-branch operation. Keep user-supplied pricing but qualify planned entitlements; replace fictional proof with an honest sample workflow. Original application and production were not changed.
