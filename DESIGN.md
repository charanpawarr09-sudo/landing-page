# Repairnox — research-led website design

## Current direction: product motion — 29 October 2026

The user rejected the previous restrained refinement and requested substantially stronger Apple-inspired product motion. The full-width header reading-progress line has been removed. The current opening uses large masked typography and a detailed software workspace that settles from perspective as the visitor scrolls. A single 320svh native sticky composition keeps ticket #1048 visible as technician and part layers arrive, followed by its pickup receipt. Status changes follow the same sequence. Two alternating feature chapters replace the equal four-card grid; their UI illustrations assemble once when entering view.

Mobile, very short windows, reduced-motion settings and no-JavaScript rendering have a normal-flow story composition. Motion uses the installed Framer Motion and native scrolling; there are no repeating decorative loops or external product assets. The established logo and monochrome system remain. Apple research and actual verification are recorded in `docs/research/apple-motion-direction-2026-10-29.md`.

Production build/static export audits pass. Actual browser testing covered all three scroll scenes, the stateful repair flow and keyboard navigation, launch dialog/reset/FAQ, phone/tablet/laptop geometry and short-window fallback. The header line is absent and no console errors were captured. Browser download-event reporting timed out; the receipt's HTTP response and exact bytes were verified separately. OS reduced-motion live toggling and no-script runtime were source-reviewed, not browser-emulated. Prior milestone descriptions below are historical.

## Premium presentation refinement — 29 October 2026

The current homepage uses a split editorial hero with a selectable Repairs / Inventory / Checkout product preview, a compact dark connected-workflow composition, an asymmetric feature grid, and quieter pricing/resource layouts. The existing monochrome brand and local Geist fonts remain. The sample repair retains its original data and guarded actions; its stages now share stable grid geometry and short transitions. The header marks the current section and shows reading progress.

Motion uses lean `framer-motion/m` components under the existing LazyMotion provider. Reveal wrappers keep essential content visible in server HTML, then apply a once-only 16px entrance after hydration. A `useSyncExternalStore` media-query subscription and CSS fallback handle reduced-motion preferences, including preference changes while open. There are no repeating decorative loops or scroll hijacking.

The hero leads with the working demo and View plans. Pending registration/plan actions use View launch status / View Standard plan / View Pro plan until a real trial URL is configured. Domain readiness is user-reported; public configuration has not been verified.

Stitch generated **Repairnox — Refined Desktop Marketing Homepage**, project `4619699733370541135`, returned screen `5918003033a74398951325be38225c47`. Its text direction informed the split composition and product stage. Follow-up asset retrieval could not resolve that returned screen, so no visual fidelity to its screenshot is claimed. Generated claims about zero latency, imports, fees and compatibility were not adopted. Generation response is retained in `scratch/premium-refinement/stitch-generation.txt`.

Production build, strict TypeScript, CSS parsing, generated export/link/resource audit, mounted-tab semantics and representative local HTTP responses pass. Final browser interaction, animation, visual and responsive checks remain unverified: browser access became disabled, and the user requested finishing with the available checks. See `docs/research/premium-refinement-2026-10-29.md` for current scope, research and launch requirements. Earlier browser observations and test results below do not verify this refinement.

Current implementation: an honest pre-launch marketing and product-tour website at `/home/ram/Downloads/repair-shop-workspace`. The original repair-shop application is read-only and unchanged. Research findings and the implementation plan were presented before the redesign. The user confirmed that neither a signup destination nor an enquiry email is ready.

## Audience and message

Independent phone, computer and electronics repair shop owners and store managers. Their needs are concrete: find the ticket, know who owns the job, see the part, and finish pickup/payment without losing the thread.

Headline: **Your repair shop. Working as one.**

The previous tagline matched BenchDesk's public wording. The new headline is distinct, while the category label and supporting copy explain tickets, technicians, parts and POS immediately. This is a positioning decision, not a claim of legal clearance or measured conversion lift.

## Visual system

- White, ink `#111214`, mist `#f5f6f8`, slate `#667085`, hairline `#e4e7ec`.
- Locally hosted Geist Sans and Mono, large tightly spaced headings and readable body copy.
- Supplied angular SVG symbol, transparent negative space, inherited color, consistent lockups and favicon. No raw PNG is embedded.
- Spacious editorial grid, a large product overview, a contrasting problem/solution composition, a selectable workflow and compact supporting cards. Black pricing/final blocks establish hierarchy.
- UI/UX Pro Max's explicit Minimalism & Swiss result guided the direction. The generic glass/blue/orange system suggestion conflicted with the existing brand and was rejected. No new UI library was needed.

## Story and interaction

1. State the audience, offer and useful next action immediately.
2. Contrast disconnected tickets, parts and handoffs with one connected repair.
3. Carry fictional ticket **#1048** through intake → technician/part → pickup checkout. One screen costs $69 plus $80 labor; $30 deposit leaves $119 to collect. The same job persists through revisits, stock use is idempotent, and Reset clears all progress.
4. Explain four source-verified tools in exactly two sentences each, with illustrative product details.
5. Explain who the product serves; show planned USD pricing and qualified Pro capabilities.
6. Answer actual buying questions, offer three useful guides/downloads, and finish with a clear demo/trial choice.

The trial and plan controls open named native dialogs. They explain launch availability and provide a working path to the sample shop. Contact, privacy and social destinations are honestly pending. No fake success, enquiry collection, customer endorsements or production mutations. The interactive demo requires JavaScript; its plain-language fallback and the rest of the page remain server-rendered.

## Motion

Apple-inspired principles: short benefit chapters, visual continuity and a useful product narrative. There is no scroll hijacking or autoplay carousel. Framer Motion `LazyMotion`/`m` limits the animation surface; short user-controlled product transitions, once-only entrances and stage-progress feedback have meaning. `MotionConfig` uses the subscribed system preference, and CSS suppresses nonessential transforms/transitions. Content is not hidden pending scroll animation.

Source references: [Motion scroll](https://motion.dev/docs/react-scroll-animations), [Motion accessibility](https://motion.dev/docs/react-accessibility), [LazyMotion](https://motion.dev/docs/react-lazy-motion), [Apple product presentation](https://www.apple.com/macbook-pro/).

## Stitch

Project `4619699733370541135`, screen `72f19305f97e44dab8feff5dfefdd892`, **Repairnox — Complete Desktop Marketing Homepage**. Generated after the research brief. Adopted the editorial hierarchy and connected workflow concept; rejected generated SMS, automatic reordering, guaranteed intake timing and hardware/fee claims because they were not source-verified. Stitch is a design aid, not product evidence.

## Content and search

Three original operational guides cover intake, parts routines and technician handoffs. Each has a unique title/description, meaningful HTML, related links and a real Markdown download. No fake reviews or aggregate-rating markup. Metadata and canonical/sitemap/share origins depend on a validated public-origin setting; the default preview is noindex. The 1200×630 social image is generated locally from code and bundled fonts.

Research, acquisition recommendations and completed/remaining checks are in `docs/research/`. Real traffic, field Web Vitals, legal approval, public deployment and actual trial/enquiry conversion remain launch work. A passing local build does not prove those outcomes.

## Suggested activeContext.md update

Repairnox's standalone landing page has been rebuilt as a research-led pre-launch marketing website with a functional sample repair tour, clear owner-focused copy, transparent planned pricing, FAQ, three practical guides/downloads, responsive navigation, launch-status dialogs and conditional SEO/share metadata. Fictional testimonials and the previous matching competitor tagline were removed. The user confirmed signup/contact are not ready. Record verification results and any remaining browser limitations from `docs/research/verification-results.md`; do not describe the original app as rebranded, deployed or commercially launched. Pre-redesign sources are archived locally.
