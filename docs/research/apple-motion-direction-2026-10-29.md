# Repairnox: Apple-referenced motion direction

29 October 2026. Scope: a correction to the standalone landing page in `/home/ram/Downloads/repair-shop-workspace`. This document records research and the proposed implementation. It does not certify that the new sequence has shipped, passed browser checks or matched Apple's production quality.

## User correction

The user rejected the previous refinement because its small entrances and tab transitions did not deliver the substantial product motion they requested. They want the premium presentation, visual pacing and motion graphics associated with Apple's product pages. The thin black reading-progress line below the navigation was explicitly rejected; the lead agent reports removing it. It must not return as part of the new direction.

The existing monochrome identity, repair-shop audience and verified sample workflow remain the content foundation. The goal is a visibly stronger product presentation, with one coherent motion story rather than additional generic marketing sections.

## Research method and limits

The research agent opened Apple's homepage, the iPhone/AirPods/Watch/Mac/iPad family pages, and a detailed product page from each family. It also inspected published HTML/CSS for AirPods Pro, MacBook Air and iPad Pro, and retrieved Apple's motion guidance as Markdown. These observations establish source structure and available mechanisms; they do not establish animation timing or visual quality through playback.

The lead agent separately reports browser inspection of:

- Apple's homepage.
- The [MacBook Pro PROLED XDR Display page](https://www.apple.com/macbook-pro/proled-xdr-display/), including a scroll scene.
- The [iPhone Pro page](https://www.apple.com/iphone-18-pro/), from its opening film into the large PRO composition.
- The AirPods category page, which was still loading at the time of the report. Its completed visual experience was not yet confirmed.

These are representative major product families, not a claim that every page on apple.com was explored. Final Repairnox verification must record its own browser results.

## What the primary sources show

| Source | Observed structure or source evidence | Useful principle for Repairnox |
| --- | --- | --- |
| [Apple homepage](https://www.apple.com/) | Short product statements paired with large product imagery and direct exploration/purchase actions. | Give the opening one dominant visual subject and a clear next step. |
| [AirPods Pro](https://www.apple.com/airpods-pro/) | Published HTML includes welcome media, scroll-group/keyframe hooks, staggered entrances, a product viewer and a paused media-card gallery. Its preload strategy references keyframes and the preceding section. | Coordinate product movement and media loading around specific chapters. Use motion to reveal a useful detail. |
| [MacBook Air](https://www.apple.com/macbook-air/) | Hero media has a static fallback. Heading components carry viewport-related fade/slide hooks; one source example specifies a 10px slide and 0.5-second duration. | Small entrances serve a larger product story. They are supporting effects, not the main experience. |
| [iPad Pro](https://www.apple.com/ipad-pro/) | Welcome media/fallback handling, a highlights gallery, product exploration and demonstrations with visible play/pause/replay controls. | Preserve an understandable static state and give control over time-driven motion. |
| [iPhone Pro](https://www.apple.com/iphone-18-pro/) | The product story separates design, camera, video, battery and performance into visually substantial chapters. | Change the scale and subject of each chapter while keeping a recognizable product. |
| [Apple Watch](https://www.apple.com/apple-watch-series-12/) | Benefit-led sections connect product details with the capabilities being described. | Show the repair-shop benefit through a concrete interface detail. |

Apple's public pages combine purpose-built imagery/media, typography, interaction, sequencing and performance work. A library choice alone does not create that result. The proposed Repairnox sequence below is our design judgment; it is not a claim to reproduce Apple's internal implementation or exact timing. Apple assets, branding and unsupported product claims are not implementation material.

## Motion principles

[Apple's Human Interface Guidelines for motion](https://developer.apple.com/design/human-interface-guidelines/motion) emphasize purposeful motion, realistic continuity, concise feedback, optional experiences and the ability to interrupt motion. The [published Markdown source](https://developer.apple.com/design/human-interface-guidelines/motion.md) was retrieved directly when the documentation HTML required JavaScript.

For Repairnox, a ticket should remain the same recognizable object throughout the story. Layers can move and the camera framing can change, but the customer, job identity and money must remain coherent. Important information must also be available without animation. Native scrolling, keyboard navigation and an immediate way to skip to the hands-on demo remain available.

## Proposed presentation

Make the opening a larger product showcase. Follow it with one bounded, approximately `320svh` desktop scene using a native sticky stage. Do not turn every subsequent section into another pinned sequence. Normal scrolling should continue through pricing, FAQs and guides.

The stage carries fictional ticket **#1048** through the existing repair narrative. The same iPhone 15 screen repair remains visible as technician/part layers arrive and checkout resolves. Preserve $69 screen + $80 labor = $149 total, the $30 deposit and $119 pickup balance. This presentation is illustrative and must not imply live shop data, payments or newly implemented app capabilities.

| Approximate scene progress | Proposed composition and movement | Meaning |
| --- | --- | --- |
| 0–18% | A substantial workspace settles from slight perspective into a clear front view. The heading yields space to the interface. | Introduce the shared workspace. |
| 18–40% | The framing approaches ticket #1048; the surrounding interface recedes. | Keep the customer, device and issue together. |
| 40–65% | Technician and replacement-part layers arrive beside the persistent ticket. | Show ownership and the part associated with the job. |
| 65–85% | The ticket view resolves into pickup and receipt details. | Complete the same repair with the correct balance. |
| 85–100% | The composition settles and releases into the existing interactive demo. | Invite visitors to try the workflow themselves. |

The progress ranges are a starting point for browser tuning, not a specification copied from Apple. Exact distances, scale, duration and spacing must be adjusted against real desktop and short-height viewports.

## Implementation constraints

- Use the installed Framer Motion package, lean `m` elements and MotionValues for scroll-linked transforms/opacity. Avoid React state updates on every scroll frame.
- Reserve stage geometry before animation. Move layers rather than animating layout width/height. Keep the product details readable when the stage is at rest.
- Keep a direct link to the interactive demo and preserve the demo's guarded actions, technician selection, one-time stock use, completion/revisit behavior, receipt and reset.
- The ordinary mobile, reduced-motion and no-JavaScript presentation is a plain, readable sequence. Essential content cannot depend on a pinned or animated scene.
- Use the existing live motion-preference subscription and CSS fallbacks. Avoid repeated decorative loops, forced waiting and scroll interception.
- Do not reinstate the rejected navigation progress line. Section awareness may remain subtle, without a page-wide black meter.
- Keep claims and planned commercial terms honest. This visual correction does not authorize domain changes, onboarding changes, payments, analytics or deployment.

## Verification required before completion

Record the actual result of build/types, generated content/assets, desktop and phone layouts, short viewports, scrolling forward/backward, interruption/rapid navigation, no-JavaScript content, reduced-motion load/live changes, keyboard reachability, demo completion/reset/receipt and browser errors. Inspect the choreography itself in the browser; static checks cannot prove the requested feel or smoothness. Measure performance only if the required tools are available, and distinguish local lab measurements from real-user performance.

## Suggested activeContext.md update after final verification

The user rejected the previous Repairnox landing refinement as too subtle and explicitly removed the black navigation reading-progress line. The standalone landing page is being revised around a larger product showcase and one bounded native scroll scene, informed by primary Apple product-page source research and the lead agent's browser observations. The scene is intended to keep sample ticket #1048 continuous through technician/part details and checkout, with plain mobile/reduced-motion/no-JavaScript fallbacks and the existing hands-on demo preserved. Replace this pending wording with the final implementation, actual browser/build results and remaining limits. Do not describe the original CRM, live hosting, domain or signup destination as changed by this work.

## Implemented and verified

- Removed the header reading-progress markup, hook and styles; browser DOM confirms the line is absent.
- Added `CinematicHero`: masked headline entrance, a detailed illustrative product workspace, perspective-to-flat scroll motion and restrained companion-layer depth.
- Added `ScrollProductStory`: one native sticky section at 320svh on suitable desktop viewports, with shared MotionValues for continuous ticket, technician, part and receipt transformations. The ticket status crossfades through Checked in, In progress and Ready for pickup. No React state updates run on every scroll frame.
- Replaced the four equal benefit cards with two alternating feature chapters and once-only product-art assembly. Browser geometry caught caption collisions; fluid panel sizing resolved them.
- The existing sample repair remains user controlled. Actual browser checks exercised out-of-order guards, ticket creation, Jordan assignment, one-time stock use (6→5), ready/pickup, $149 total/$30 deposit/$119 collection, completion retention on revisits, keyboard Home, reset, plan dialog and FAQ expansion.
- Desktop screenshots show the opening and the middle scroll scene under `scratch/apple-motion/`. All three scroll scenes were visually checked at the ordinary laptop viewport (1366×599 reported by the browser); none clipped the receipt or required a separate scrolling area.
- DOM geometry checks at 320×740, 390×844, 768×1024 and 1024×768 found no horizontal overflow and no remaining feature-caption overlaps. At 1366×500, the story correctly becomes normal flow and every card is visible. Phone menu open/close and Escape behavior passed. The browser screenshot service scales viewport-override captures poorly, so phone verification relies on live semantics and geometry rather than a claimed full-resolution phone screenshot.
- Final Next.js production build passed, including TypeScript and nine generated route outputs. The static export audit passed: seven HTML documents, four public pages, three guides, 293 internal references, 167 fragment targets and four matching resources. CSS parsing passed. No browser console errors were captured.
- Receipt browser download-event calls timed out twice. The same-origin receipt endpoint returns 200 and all 496 bytes match the source; a matching local receipt artifact exists. This does not certify that this session's download click produced a new file. OS reduced-motion live toggling and a no-script browser run remain unverified; their CSS/server-rendered fallbacks were reviewed.
- Stitch generation returned screen `5004c2f27a7c49ecb22b5421724f60df` in project `4619699733370541135`. Its composition notes were useful; screenshot/HTML asset downloads failed. No generated claims about auto-assignment, thermal printing, waived fees, speed or inspection outcomes were adopted.
- Local website work only. The original CRM's existing changes, domain settings, live records and deployment remain outside this update. The pre-update site source archive is `scratch/apple-motion/before-apple-direction.tar.gz`.

## Final suggested activeContext.md update

Repairnox's standalone landing page now has a larger product opening, a continuous scroll-driven repair sequence and alternating product-detail chapters. The user rejected the previous subtle motion and explicitly requested removing the header black progress line; that line is removed. Framer Motion drives ticket1048→technician/part→pickup receipt with native scrolling; phone, short-window, reduced-motion and no-script fallbacks are included. Build/static checks and actual browser scenes, sample repair workflow, keyboard/reset/dialog/FAQ and responsive geometry pass. Receipt download-event capture remains unavailable although HTTP/content checks pass; live OS reduced-motion and no-script runtime were not emulated. Record the user's visual acceptance and any final launch configuration in the next milestone. No CRM or production deployment change.
