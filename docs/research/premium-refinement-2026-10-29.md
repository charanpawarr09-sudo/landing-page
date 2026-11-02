# Repairnox landing-page refinement

29 October 2026. Scope: the standalone website in `/home/ram/Downloads/repair-shop-workspace`. The CRM in `repair-shop-software-main`, production data, domain settings and deployment are outside this refinement. This document records research, implementation and available verification; it does not certify completed browser verification or launch readiness.

## What feels incomplete

The existing page already contains a hero, product overview, working sample repair, benefits, audience explanation, planned pricing, FAQ, three guides and a footer. Adding more generic sections would increase length without resolving the problem.

The main weaknesses are presentation and expectation: a large centered headline pushes product evidence below the first screen; repeated two-line headings and equal cards flatten the hierarchy; motion is largely limited to a small dashboard translation and a progress bar. “Start Free Trial” opens a coming-soon dialog, so its wording promises more than the available action delivers.

## Research translated into design

| Evidence | Repairnox decision |
| --- | --- |
| RepairDesk organizes its computer-repair page around tickets, workflow, inventory and payment tasks. Its direct page fetch returned 403; the vendor's indexed text was available. [RepairDesk](https://www.repairdesk.co/computer-repair-shop-software/) | Explain a repair owner's concrete work and show recognizable product details. Do not borrow competitors' integrations, automation or outcome claims. |
| RepairShopr offers screenshot exploration alongside repair-specific benefits and a real signup path. [RepairShopr](https://www.repairshopr.com/) | Let visitors inspect the product early and clearly label what each action does. A demo is useful proof while real signup is not connected. |
| Apple's product presentation emphasizes product imagery, short benefit statements and distinct comparison sections. This research reviewed page content, not its animation implementation. [Apple](https://www.apple.com/macbook-pro/) | Borrow the editorial discipline: a strong opening composition, visual continuity and varied section scale. The proposed motion is our design judgment, not an Apple specification. |

Preserve the existing monochrome palette, local Geist fonts and supplied symbol. UI/UX Pro Max's Minimalism & Swiss guidance fits that identity; a generic glass/blue/orange recommendation would weaken continuity. A split hero and a selectable repair/inventory/checkout preview put the product beside the promise. A compact dark connected-workflow section and asymmetric benefit layouts give the page distinct chapters. Keep the existing sample repair as the deeper, deliberate interaction.

## How to use the requested tools

- **Stitch:** provide audience, task, palette, typography, content boundaries and one coherent screen brief. Refine specific sections with one or two explicit changes. Inspect generated output and adopt useful composition; generated copy is not evidence of a shipped feature. [Google's prompting guide](https://discuss.ai.google.dev/t/stitch-prompt-guide/83844)
- **Framer Motion:** retain the installed package and small client components around server-rendered content. `LazyMotion`, `domAnimation` and `m` cover restrained reveals and interaction feedback without requiring layout projection. [LazyMotion](https://motion.dev/docs/react-lazy-motion)
- **Motion restraint:** use short, once-only entrances and user-controlled panel transitions. Keep the hero, calls to action and essential text visible in server HTML. Preserve normal scrolling, stable panel dimensions and keyboard access. These are implementation recommendations, not measured conversion improvements.
- **Reduced motion:** respect the operating-system preference, suppress large transforms/parallax and provide CSS fallbacks. `MotionConfig` leaves opacity and color transitions enabled, so custom effects also need explicit consideration. [Motion accessibility](https://motion.dev/docs/react-accessibility)

## Preserve and verify

Keep sample ticket #1048, technician selection, one-time stock use, $149 total, $30 deposit, $119 pickup balance, receipt, guarded out-of-order steps and reset. Test hero selectors, demo completion/revisits, keyboard controls, FAQ, launch dialogs, guide links/downloads, narrow and short viewports, reduced-motion behavior, readable static content, overflow and browser errors. Record actual results separately; previous checks do not automatically cover this refinement.

## What remains before promotion

The user reports the domain is ready. That supersedes earlier notes saying it was not purchased, but DNS, HTTPS and the public host have not been verified here.

1. Connect the verified public origin and check canonical URLs, sitemap, indexing directives and share image on that host.
2. Supply and test the actual onboarding destination and business contact email. Use honest demo/launch-status wording until those destinations are available.
3. Finalize plan entitlements, trial/billing terms, early-bird conditions and support expectations. Publish the approved privacy and commercial documents that match the real service.
4. Complete a real owner-registration journey and production acceptance checks before advertising account availability.
5. Decide whether to add measurement, then document its data handling. Track completed registrations separately from demo completions or outbound clicks. Continue the existing useful-guide acquisition plan; no analytics, outreach or advertising has been activated by this work.

## Implemented result and available verification

- Implemented the split hero and three selectable product views, compact dark workflow map, asymmetric benefits, refined pricing/guide rhythm, useful header progress/current-section indication, reduced-motion subscription and stable mounted demo panels.
- Kept the essential copy server-rendered and visible without a reveal dependency. Product panels and demo panels each retain three mounted, labelled tab/panel pairs; inactive panels are inert and hidden from assistive technology. Generated HTML checks passed for all 26 ARIA ID references.
- `npm run build` passed on Next.js 16.4.3 with TypeScript and all nine generated route outputs. `npm run typecheck` also passed.
- The existing static-export audit passed: seven HTML documents, four public pages, three complete guides, 295 internal destinations, 169 fragment targets, four matching resources and a valid 1200×630 social image. The default preview correctly remains noindex with no guessed public sitemap origin.
- All three new stylesheets parse successfully. Representative homepage, guide, receipt, checklist and robots HTTP requests returned 200 from the existing local preview.
- Stitch generation returned screen `5918003033a74398951325be38225c47` in project `4619699733370541135`. Its textual composition direction was used. Asset retrieval could not resolve the returned screen; the generated screenshot was not visually inspected. Its invented claims (including zero latency, fee/import/hardware claims) were rejected. The generation response is archived under `scratch/premium-refinement/`.
- Before this refinement, the existing page was visually inspected in the browser. Browser access subsequently became disabled. The user explicitly chose **Finish with the available checks**. The final design therefore has no verified desktop/mobile screenshot, click-through regression, keyboard run, animation/reduced-motion runtime test or measured Web Vitals. Static checks do not establish those results.
- The pre-refinement source archive is `scratch/premium-refinement/before-refinement.tar.gz`. The original CRM's files and its existing uncommitted changes were left as found. No domain, hosting, live data or external outreach change was made.

## Suggested activeContext.md update

Repairnox's standalone landing page in repair-shop-workspace has received a presentation and motion refinement using UI/UX Pro Max, Stitch's returned text direction and Framer Motion. It now has a split hero with selectable product preview, a connected workflow map, asymmetric benefits, clearer demo/launch actions, once-only reveals, stable demo panels and active navigation. Production build, strict types, CSS, static export/ARIA/resource audits and representative HTTP responses pass. Final browser/mobile/animation checks remain unverified because browser access became disabled and the user chose available checks only. The user reports the domain is ready; DNS, HTTPS, live onboarding/contact configuration and commercial launch remain unverified. The original CRM and deployment are unchanged by this refinement.
