# Repairnox: traffic, accessibility and visual storytelling research

Research date: 29 October 2026. Primary official sources only. These are recommendations, not traffic forecasts or measured conversion improvements. No site has been deployed and no Search Console, advertising or analytics account has been connected by this research.

## Evidence from the current local site

`src/app/layout.tsx` currently sets the title to **Repairnox — Less admin. More repairs.**, one generic product description and the SVG favicon. It does not declare an Open Graph image, canonical URL or sitemap. The title communicates a benefit but omits the category someone unfamiliar with the brand is searching for. `src/app/page.tsx` passes an optional `NEXT_PUBLIC_TRIAL_URL`; without a real configured destination, trial buttons currently return coming-soon feedback. The content is rendered as real HTML, with headings and meaningful section IDs. Local Geist fonts and reusable vector marks already avoid remote font/image dependencies.

`repairnox-hero.tsx` has `MotionConfig reducedMotion="user"` and uses `useReducedMotion`; global CSS has a reduced-motion media query. These are useful foundations, but source presence alone does not verify every new interaction or prove runtime accessibility. This research has not performed browser QA.

## Audience and search intent

Recommended primary audience: independent phone, tablet and computer repair shop owners and store managers who need a clear view of jobs, parts and payments. Their likely buying questions are concrete: Can staff find the ticket? Who has the job? Is the part in stock? Can I collect the balance at pickup? How much will one shop pay? These are an audience hypothesis informed by the product brief, not interview or keyword-volume findings.

Use **repair shop software** as the homepage category. Natural secondary language can include repair ticket tracking, phone repair shop POS, parts inventory and technician assignment. These are proposed query families, not researched search-volume rankings. Google recommends useful people-first content, anticipating the vocabulary readers use and avoiding keyword stuffing; it does not promise first-place rankings. [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

## Recommended work now

| Priority | Change | What proves it works |
| --- | --- | --- |
| P0 | Make the hero explicitly name repair shops and show the actual intake-to-pickup journey. Keep benefit-led language. | A new visitor can identify audience, category, main benefit and next action without reading the full page. |
| P0 | Give every primary button a useful honest result. Offer a working product walkthrough while real signup is unavailable; do not imply a coming-soon message is completed signup. | Pointer and keyboard journeys reach the promised destination or clearly disclosed demo. |
| P0 | Replace fictional endorsements with product evidence: a labelled interactive example, real workflow details and transparent pricing availability. Obtain permission and real feedback before publishing customer names or outcome metrics as endorsements. | Every visible claim has a source or clear illustrative label. |
| P1 | Use a descriptive title such as **Repair Shop Software for Tickets, Inventory & POS | Repairnox**. Add a concise category/audience description and branded share image. | Inspect emitted production HTML, not only source configuration. |
| P1 | Add a concise FAQ answering actual purchase questions: intended shops, core workflow, pricing, current trial availability and what is illustrative. Keep unsupported migration/security/service promises out. | Answers agree with real product readiness and actual configured links. |
| P1 | Prepare canonical/sitemap/social URLs through one validated public site-origin setting. Set them only to the verified final host at launch. | Production canonical, sitemap and share URLs point to one real HTTPS host; local preview does not claim an unowned host. |
| P1 | Retain readable HTML and section anchors; add a skip link and clear mobile navigation as the page grows. | Keyboard navigation bypasses chrome and reaches all controls; headings remain readable before hydration. |

Google recommends descriptive, concise, distinctive page titles and a clear main heading. Descriptions should summarize the specific page; Google can choose a different snippet from its visible content. There is no guaranteed character cutoff or guarantee that supplied text will appear unchanged. [Title-link guidance](https://developers.google.com/search/docs/appearance/title-link), [snippet guidance](https://developers.google.com/search/docs/appearance/snippet)

Structured data should describe visible, accurate content. Do not mark sample testimonials as real reviews or invent an aggregate rating, organization address, account count or software availability. Valid markup does not guarantee a rich result. [Structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)

## Traffic acquisition after launch

These are proposed experiments, not actions already taken:

1. **Publish one useful operational guide at a time.** Start with an intake checklist for a busy phone repair counter, a parts reorder checklist and a guide to clear counter-to-technician handoffs. Include original annotated product examples and a usable checklist. A narrow, firsthand resource helps the same owner who may need the product. Do not generate a large generic blog library.
2. **Create deeper feature pages when there is substantial original material.** Ticket tracking, parts inventory and repair checkout can each explain the actual workflow, common mistakes and a product example. Do not duplicate the homepage with swapped keywords or publish city doorway pages for a SaaS product.
3. **Show the product in repair communities.** Share useful workflow resources where owners already participate, follow community rules, and invite specific feedback. Supplier relationships, repair educators and trade events are potential referral channels. No outreach or posting is authorized or performed by this note.
4. **Use short demonstrations as distribution assets.** A clear intake-to-pickup clip and a link to the interactive example can make the product easier to evaluate. Add captions and an equivalent text explanation; do not require video viewing to understand the offer.
5. **Validate paid search only after the conversion destination works.** Test a narrow set of repair-software intent queries with a separately approved budget. Judge qualified enquiries or completed trials, not impressions alone. This is an experiment recommendation, not a spending instruction or acquisition-cost prediction.

These channels are a product-specific interpretation of Google's recommendations to promote helpful content through social media, community engagement, advertising and word of mouth. Google cautions against excessive promotion. [SEO Starter Guide: promote your site](https://developers.google.com/search/docs/fundamentals/seo-starter-guide#promoting)

Once the real host exists, verify ownership in Search Console, check indexing, submit the sitemap and monitor query/page performance. Review impressions, relevant queries and clicks together with completed conversion events. Search Console provides crawl/indexing and search-performance evidence; submission can help discovery but does not guarantee indexing. [Search Console getting started](https://developers.google.com/search/docs/monitor-debug/search-console-start)

## Performance and accessibility requirements

| Area | Acceptance target | Evidence needed |
| --- | --- | --- |
| Loading | LCP at most 2.5 seconds | Real-user 75th percentile once enough traffic exists; lab measurements are prelaunch diagnostics. |
| Responsiveness | INP at most 200 milliseconds | Real-user 75th percentile; test demo/menu/dialog responses locally as a separate runtime check. |
| Stability | CLS at most 0.1 | Reserve media and interactive-stage dimensions; measure layout shifts. |
| Keyboard | Every pointer-operated task has a keyboard equivalent; no trap; visible focus | Complete header navigation, walkthrough, plan selection, FAQ and conversion controls using only keyboard. |
| Focus visibility | A sticky header or dialog must not entirely obscure the focused control | Tab through the entire page at desktop and phone sizes; set scroll padding/margins for sticky chrome. |
| Motion | Disable nonessential translations, parallax and scroll transformations when reduced motion is requested | Runtime preference check where supported plus source review. Keep the same information visible in the static alternative. |
| Touch | Prefer at least 44 × 44px important controls | Measure actual target boxes and spacing. WCAG 2.2 AA's minimum target rule is 24 × 24px with exceptions; 44px is the stronger project design target. |

The three Core Web Vitals should be evaluated at the 75th percentile, separately for mobile and desktop. A controlled local test cannot prove real-user passing or ranking improvement. [Web Vitals](https://web.dev/articles/vitals), [lab versus field data](https://web.dev/articles/lab-and-field-data-differences), [Search and Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)

W3C requires keyboard-operable functionality and visible, unobscured focus under the cited criteria. Its reduced-motion technique describes suppressing nonessential interaction motion. Automatic moving content lasting over five seconds alongside other content needs pause/stop/hide under SC 2.2.2; avoid auto-advancing promotional/demo carousels altogether. [Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard), [focus not obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum), [reduced-motion technique](https://www.w3.org/WAI/WCAG22/Techniques/css/C39), [pause, stop, hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide), [target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)

Practical design choices: local fonts; reserve the walkthrough stage height; animate transforms and opacity rather than geometry; no decorative background video; lazy-load noncritical assets; keep the initial benefit and CTA visible without JavaScript. Prefer small useful state changes over motion applied to every paragraph. These are implementation recommendations, not measured results yet.

## What to borrow from Apple

The current Apple iPhone product page exposes compact chapter navigation, a short product headline, a highlights sequence, large feature imagery, detailed benefit chapters, a selectable comparison and a clear purchase action. The research observed page structure and content; it did not independently measure its animation implementation or conversion performance. [Apple iPhone product page](https://www.apple.com/iphone-18-pro/)

Recommended interpretation for Repairnox: one repair is the narrative object. First show a clear shop overview, then carry one labelled sample ticket through intake, assignment/parts and checkout. Let a visitor select each chapter while the product stage changes. Use restrained scroll-linked depth on larger screens, preserve ordinary document scrolling, and switch to a simple static/step layout on phones and reduced motion. Pair each visual change with one owner-facing benefit. Keep real section links and pricing easy to reach rather than forcing a cinematic sequence.

This adapts Apple's sequencing and emphasis to the user's product. It is a design inference, not a claim that Apple endorses these choices or that the approach guarantees better conversion.
