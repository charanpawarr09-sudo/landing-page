# Repairnox research-led redesign — 29 October 2026

## Decision presented before implementation

Rebuild the existing standalone marketing page around independent phone, tablet and computer repair shop owners and managers. The distinct promise is **Your repair shop. Working as one.** Explain tickets, technician ownership, parts and checkout immediately; prove the connection with an inspectable sample repair. Preserve the supplied vector identity, monochrome/slate colors, local Geist fonts and simple language.

The user confirmed that neither a live Repairnox signup URL nor an enquiry email is ready. This release is therefore an honest **pre-launch marketing and product-tour website**. Do not collect details, fake submission success, invent legal/contact destinations or connect the original app's unfinished commercial onboarding. A configured real destination can replace the trial status later.

## Research and decisions

- [Competitor audit](competitors.md): RepairDesk, RepairShopr, Orderry and BenchDesk use concrete workflow messaging, product demonstrations and defined next steps. Existing headline matches BenchDesk and is replaced. Do not copy competitor text, metrics or entitlements.
- [Product audit](product-audit.md): real ticketing, assignment, inventory, customer records and POS; multibranch operation and subscription entitlements are not verified. Preserve user pricing amounts but mark Pro roadmap features planned. Replace fictional testimonials with product evidence.
- [Traffic/accessibility research](traffic-accessibility.md): descriptive category/audience title, useful operational guides, accurate metadata, real navigation, keyboard equivalence, unobscured focus and reduced motion. No ranking or conversion-uplift promises.
- UI/UX Pro Max: system-wide search suggested a generic SaaS glass/blue/orange treatment; rejected because it conflicts with the established brand. Explicit `minimal swiss editorial --domain style` matched Minimalism & Swiss. Apply spacious grids, clear typography, restrained 200–250ms interaction feedback and strong contrast. Next.js stack search supports client islands. No extra animation/UI dependency is necessary.
- [Apple](https://www.apple.com/macbook-pro/): borrow short benefit chapters, large product views and compact navigation; this is a design interpretation, not measured Apple conversion evidence. Keep ordinary scrolling, no forced cinematic sequence.
- [Motion scroll guidance](https://motion.dev/docs/react-scroll-animations), [accessibility](https://motion.dev/docs/react-accessibility), [LazyMotion](https://motion.dev/docs/react-lazy-motion): small transform/opacity transitions, scroll-linked motion only when it helps the product story, user-controlled walkthrough, no auto-carousel, and a reduced-motion/static equivalent. Use LazyMotion/m rather than importing the full motion component in every section.
- [Google Stitch DESIGN.md guidance](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/): give design generation explicit product, palette, typography, scope and accessibility rules. Treat output as a design reference and independently verify copy and behavior.

## Stitch reference

Project `4619699733370541135`, screen `72f19305f97e44dab8feff5dfefdd892`, **Repairnox — Complete Desktop Marketing Homepage**. Useful direction: editorial scale, slim navigation, connected three-stage story, varied product-led benefits and black closing CTA. Generated suggestions for SMS automation, guaranteed 60-second intake, automatic reorder triggers, printer/scanner support and fee promises were **rejected** because the audited product does not establish them. Generation is not product evidence.

## Implementation

1. Shared server-rendered frame; accessible responsive header, footer, skip link, trial/plan launch-status dialog and optional validated real destinations.
2. Clear hero and product overview with depth; one sample ticket carried through intake → bench/parts → checkout. Selectable chapters, actionable local demo, receipt and reset; sample data clearly labelled and no production mutation.
3. Editorial problem/solution, four precise benefits, owner-focused about, two transparent planned-launch plans, factual FAQ, resources and closing CTA. Remove invented endorsements.
4. Three original practical guides and downloadable checklists: intake, parts routine and technician handoffs. No mass-generated doorway content.
5. Category-specific metadata and social preview; origin-dependent canonical/sitemap and noindex preview until a verified public origin exists. No fake review schema or guessed domain.
6. Build/type checking, real browser journeys and responsive/accessibility verification. Document evidence and limitations. Preserve original application, production and existing data.

## Completion evidence required

See `verification-plan.md`. Capture final desktop/mobile production previews. Verify every working link/control, demo arithmetic/reset, dialog focus/Escape, mobile menu, guide pages/downloads, FAQ, rendered metadata, content without JavaScript, reduced-motion source/runtime where supported and browser errors. Separate local lab evidence from field Web Vitals, traffic and production launch readiness.

## Rollback and memory

Pre-change source snapshot: `scratch/pre-redesign-2026-10-29.tar.gz`. Original application is read-only. Suggested activeContext update on completion: record the new pre-launch marketing/demo website, source-verified claims, planned commercial terms, verified UI/SEO checks and remaining real signup/contact/domain dependencies.
