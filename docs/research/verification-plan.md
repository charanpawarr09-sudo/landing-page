# Repairnox prelaunch redesign — verification plan

Date: 2026-10-29. This is an acceptance plan, **not a test result**. Implementation is in progress. No tests or application code were added by this artifact.

## Accepted delivery boundary

The user has confirmed that neither a real trial URL nor a contact email is ready. A complete **prelaunch website** is therefore the current accepted outcome: polished product communication, a working local sample repair journey, useful guide pages/downloads, accessible navigation/dialogs, honest pricing availability and explicit pending contact/trial destinations. No production account, payment, customer record, enquiry delivery, legal-policy approval or public deployment should be inferred from local interactions.

The earlier requirement for research before major changes is proved by the research artifacts and the parent agent's presented findings/implementation plan, rather than by a passing build. Keep that evidence with the final handoff.

## Requirement-to-evidence matrix

| Requirement | Concrete acceptance criteria | Evidence to collect after implementation |
| --- | --- | --- |
| Clear audience and offer | Hero identifies independent phone/computer/device repair shops and describes one workspace covering tickets, team, parts and checkout. A visitor can tell the next action without scrolling. | Rendered desktop/phone hero; final copy/source inspection; heading hierarchy. |
| Source-backed problem and benefits | Lost information, disconnected tools, unclear handoffs and stock visibility are addressed in owner/manager language. Feature claims correspond to audited intake, assignment, stock and POS workflows. | Final copy compared with `product-audit.md` and actual original-app sources. No invented savings, guaranteed outcomes or certifications. |
| Complete, coherent visual experience | Existing SVG Repairnox brand and monochrome/slate direction are consistent across home and guide pages. Story progresses from need → connected workflow → capabilities → availability/pricing → next action. | Actual full-page/viewport review, desktop and phone screenshots, Stitch reference plus implemented differences. Do not use a Stitch mockup as proof of the built page. |
| Interactive repair demo | Intake, bench and checkout are real UI states the visitor can reach and revisit. Same job/customer/device/part persists across the journey; sample boundary is visible. Reset returns the entire demo to its initial condition. | Browser walkthrough and state/result record as detailed below; meaningful pure-state/money tests only if reusable logic warrants them after code exists. |
| Working conversion path in prelaunch mode | Main action opens a useful launch-status/demo panel, or a correctly labelled working local demo. No action announces account creation, message delivery, waitlist registration or payment when none occurred. | Activate hero/header/pricing/final CTAs; inspect visible outcomes, URL, selected-plan continuity and network behavior where supported. |
| Honest two-plan pricing | User amounts remain Standard $29.99/month Early Bird, regularly $39.99, and Pro $49.99/month. Planned multi-store and unverified service entitlements are unmistakably qualified. Plan selection reaches a concrete next step with correct plan context. | Both cards in actual rendered page; selection of each CTA; dialog state/feedback; no subscription checkout implied. |
| Authentic trust content | Fictional customer quotes, invented names, review stars and fabricated business logos are absent from real social proof. Sample product records remain clearly disclosed as samples. | Rendered text/source audit; browser screenshot. Structured data contains no invented `Review` or `AggregateRating`. |
| Useful factual FAQ | Questions answer real buyer concerns using current capabilities and launch status, with no invented trial duration, card/cancellation/migration/support policy. Accordion or disclosure works by keyboard if interactive. | Review every answer; browser expand/collapse and focus checks; semantic `details`/button state. |
| Functional desktop/mobile navigation | All home/section links reach real targets. Mobile menu opens, closes, reports its state and does not trap or hide focus. Sticky elements do not cover focused controls or anchor headings. | Desktop and phone navigation walkthrough; URL/target position checks; keyboard sequence. |
| Accessible dialogs | Launch, pricing and other dialogs have names, correct modal behavior, visible focus, keyboard dismissal and sensible focus restoration. Background is not keyboard-operable while modal is open. | Actual keyboard open → Tab/Shift+Tab → Escape → return-focus test for each distinct dialog; dialog semantics/source review. |
| Three working guide routes | Each route has a useful unique title, visible content, shared brand/navigation and a functioning home return path. Direct load and reload work in the actual static preview. | HTTP success for all exported routes/assets; actual browser direct deep-link/reload/navigation for every guide. Test unknown route separately. |
| Real downloads | Each download returns a readable actual artifact with the advertised name/content. It is useful independently of the page and uses no misleading success simulation. | Trigger all downloads; inspect saved filenames and file contents/format; verify assets exist in exported output. |
| SEO and sharing | Descriptive unique title/description, one page H1, useful internal links, local font assets and appropriate social metadata. Origin-specific canonical/OG/sitemap URLs appear only with a validated public origin. | Inspect generated HTML/metadata and exported files for home plus all guides; configured/unconfigured environment checks as below. |
| Safe local indexing state | Without a confirmed production origin, local/prelaunch output is explicitly noindex and contains no guessed canonical domain. With the appropriate public-origin/launch configuration, indexing intent is deliberate and all absolute URLs use that origin. | Inspect source and generated robots metadata; test each relevant build configuration. State exactly which configurations were actually built. |
| Reduced motion | Every new scroll/transition/illustration effect respects user preferences. Essential information and controls never depend on animated progression. | Source review of MotionConfig/hooks/CSS; actual emulation only if the available browser tool supports it. Label source-only verification honestly. |
| No-JavaScript readability | Headings, positioning, features, pricing/availability, guide text, navigation links and initial sample context are present in exported HTML. Disabled scripting does not make the page blank or leave primary content opacity-hidden. | Exported HTML inspection; actual JavaScript-disabled browser check if supported. Do not claim full no-JS interactive demo operation unless tested. |
| Responsive and accessible layout | At least 375, 768, 1024 and 1440px widths have no page overflow, clipped content, unreadable headings or overlapping controls. Meaningful touch targets, contrast and focus are retained. | Geometry + visual checks at each width, phone menu/dialog/demo/screenshots; 200% zoom/reflow where the tool supports it. |
| Fast implementation | No unnecessary network-heavy imagery, animation loops or large new dependency system. Fonts are local; dimensions reserve layout space; motion uses transforms/opacity sensibly. | Dependency/asset/build-output review; console errors; loading behavior. Report measured lab figures only when an actual tool measures them; do not invent field Core Web Vitals. |
| Traffic/content recommendations | SEO/content/partner/community recommendations target repair-shop decision makers and distinguish current page work from future campaigns. | Research/traffic artifact with primary-source links, keyword/topic intent, concrete channels and practical next steps. No traffic or conversion guarantee. |
| Verified handoff | Production build passes, relevant runtime interactions pass, screenshots show actual final code, limitations are explicit, and suggested memory update records real state. | Final verification log, build output, browser results, final screenshots and updated documentation. |

## Sample repair integrity walkthrough

Use the implemented record values rather than inventing a second acceptance fixture. Before testing, record the demo's initial ticket number, customer, device, fault, selected technician, part/SKU/quantity, repair price, deposit and balance.

1. **Intake:** open the demo through the real public action. Confirm the sample label is visible and the initial stage is clear. If fields are editable, enter only artificial test data; use labels and keyboard. Advance through the actual control.
2. **Bench:** confirm the same job/customer/device/fault. Assignment changes appear where the UI promises; selected part/SKU/quantity stays consistent. Waiting/in-progress/ready choices should not silently change the customer, quoted price or payment state.
3. **Checkout:** confirm the same ticket and customer. If the demo accepts a deposit, **balance due = total − already-paid amount**; after collecting the displayed balance, remaining balance is zero. A deposit must not be counted twice, and completion must not duplicate a receipt/payment on repeated activation. Round money in integer cents where there is arithmetic.
4. **Back/revisit:** going back and forward preserves the displayed repair and state as intended. A purely illustrative phase switch must not imply data was saved to the actual application. Provide a visible way to start over.
5. **Reset:** after meaningful changes/completion, Reset restores all stage, assignment, part, payment, receipt and feedback state. Reset twice yields the same initial state. Reload behavior matches the explained local/session scope.
6. **Scope:** no Firebase/app credentials, original app mutations, real payment operation or enquiry submission is triggered. A demo receipt, if present, is unmistakably a sample.

If the implementation is a guided three-state explanation rather than editable intake, test the real choices it exposes; do not add an unrequested operational app solely to satisfy this plan.

## Navigation, modal and FAQ interaction checks

- Start with keyboard at page top. Verify Skip to content, brand/home navigation and visible focus. Navigate the header and primary action without pointer input.
- On phone, open menu, inspect `aria-expanded`/controlled region, follow one section link and ensure menu closes if that is its intended behavior. Reopen and test dismissal. A disclosure menu need not trap focus; a modal navigation drawer must obey modal rules.
- For each distinct dialog, test opening with the keyboard, initial focus, forward and reverse Tab cycle, Escape, close button and focus restoration to its actual opener. If pricing opens the same dialog, check both plans carry the right context.
- Verify display at the shortest tested phone height: title, body and close/action controls remain reachable through allowed scrolling.
- Check empty/invalid form states only if forms actually exist. A contact form without a receiving endpoint must not be styled or worded as a successful send. Do not add email capture merely for appearance.
- Visit every FAQ item with keyboard; confirm all text is available and state is announced. Verify all internal targets exist and anchor offsets account for the header.

## Metadata and static-export checks

1. Build using the actual repository script (`npm run build`). Included TypeScript must pass. If a separate typecheck is run, record its outcome; do not list a nonexistent lint/test script as passing.
2. Inspect exported home and three guide HTML files: unique title, concise description, valid H1/H2 structure, correct favicon/fonts, descriptive links, no fictional reviews or sample data in claims/schema.
3. **No public origin:** assert no canonical, sitemap or Open Graph URL points to localhost, a placeholder domain, an unowned Repairnox domain or a legacy FixPro origin. Check explicit noindex behavior. Local robot directives do not prove a future hosted site is indexed safely.
4. **Configured public origin:** if tested, use a clearly artificial reserved-domain fixture in an isolated verification build. Inspect generated absolute URL construction and trailing slashes. Restore the intended local/prelaunch build afterward; do not deploy the fixture. Reject malformed origins and avoid string concatenation that duplicates slashes.
5. Check direct deep URLs in the preview, not only client navigation. A plain static server may not resolve extensionless Next export routes unless `trailingSlash`/server routing matches the exported files. The three guides must remain reachable on reload.
6. Verify each download and asset has a successful response and valid bytes. Check a nonexistent route returns an honest not-found page/status rather than displaying unrelated content.

## Responsive, motion and performance checks

- Review 375×812, 768×1024, 1024×900 and 1440×1000 or equivalent purposeful QA sizes. Restore temporary viewport overrides after testing.
- Include hero, workflow/demo, pricing, FAQ, footer and all distinct dialog/menu layouts. The same font/spacing rules must work on guide pages.
- Check `document.documentElement.scrollWidth <= innerWidth`, important element bounds, touch-target sizes and visible focus. Geometry does not replace visual inspection of actual readable content.
- Look for sticky/pinned story content that exceeds a short viewport or depends on horizontal scrolling. Mobile should retain a direct, understandable reading order.
- Under reduced motion, remove nonessential travel/scale/parallax/continuous effects. Preserve meaningful selected states and instant access to the same information. If media emulation is unavailable, record the source-review limitation explicitly.
- Check that content is in generated HTML and is not hidden pending hydration. Hover and animation are enhancements; buttons/links must work by keyboard and touch.
- Use the existing supported browser controls for runtime QA. Browser automation infrastructure availability is not a reason to invent test results. Performance code review is not a measured Lighthouse or field-performance score.

## Evidence record and completion gate

For every matrix row, final verification should record **pass**, **incomplete**, **blocked by external launch input**, or **not independently tested**, with exact artifact/source/browser evidence. A successful build proves compilation and export, not conversion, legal readiness, public domain ownership or actual trial signup.

Complete the accepted prelaunch redesign only after the real code and actual browser behavior satisfy the local requirements. Clearly hand off the remaining launch dependencies: confirmed public origin/domain, real trial onboarding destination, genuine contact delivery destination and approved legal/privacy content. These do not justify fake controls or false success states while waiting.

## Suggested activeContext update

The Repairnox redesign is being delivered as an explicitly authorized prelaunch website because the trial URL and contact email are not ready. Verification must cover the real sample intake/bench/checkout journey, reset/payment consistency, navigation/dialog keyboard behavior, guide routes/downloads, pricing availability, metadata/indexing configuration, reduced motion and responsive layout. Actual signup, delivered enquiries and a public launch remain separate business/configuration milestones until verified.
