# Repairnox problem and solution section

## Scope and plan

Add one section immediately below the existing hero. Keep the hero, SVG logo, existing CTA and application behavior. No new navigation, CTA, form, feature section, pricing, footer, backend or deployment.

Use one joined comparison surface: a light problem panel and black solution panel. Keep the content focused on repair shop owners and store managers. Two short headings, two concise paragraphs and two workflow illustrations provide the full story without another introductory slogan or badge.

Problem: lost tickets, untracked parts, messy technician handoffs, hours wasted on calls/messages/manual coordination.

Solution: Repairnox brings front-desk intake, parts inventory, tech benches and POS checkout into one place, keeping handoffs clear from drop-off to payment. No invented time-savings figures, testimonials or automation claims.

## Design reference

Stitch project: 4619699733370541135
Screen: projects/4619699733370541135/screens/d06e831b056a4fbc93591cab6d1892e5
Title: Repairnox — Problem & Solution Section

Applied the split light/dark comparison surface and restrained workflow diagrams. Omitted the generated extra introductory slogan, live-status tags and proposed interactive tooltips to preserve scope and previous user feedback.

UI/UX Pro Max: verified Minimalism & Swiss Style match; monochromatic palette, clear sans-serif hierarchy, generous whitespace and no unnecessary gradients/shadows. Verified heading-hierarchy guidance. Retained existing Next.js, Geist and Lucide stack.

## Implementation

`src/components/problem-solution.tsx` is placed after the existing hero inside the same main landmark. Problem and solution have H2 headings; diagrams use real text lists, with decorative icons/connectors hidden from assistive technology. A single short viewport entrance uses the existing Framer Motion reduced-motion context. Content is visible in initial HTML without JavaScript.

Desktop panels sit side by side; mobile panels stack in problem-first order and the connected workflow becomes vertical. Static diagram stages have no button appearance or click behavior.

## Verification

- Production static build and included strict TypeScript check pass.
- Actual browser checks at 1440, 1024, 768 and 375px: no horizontal page overflow or clipped headings. Panel content stays within its container; phone workflow is one vertical column.
- The page has one main landmark, two page sections (existing hero plus this addition), and one interactive CTA total. The new section adds no control.
- Browser accessibility tree reads problem first, then solution, followed by the four readable workflow labels. Decorative diagrams do not add unnamed controls.
- Browser logs contain no warnings or errors. Source review confirms the existing reduced-motion context covers the section and content is readable in initial HTML.
- Desktop evidence: `preview/problem-solution-desktop.jpg`.

## Suggested activeContext.md update

The standalone Repairnox landing page at `/home/ram/Downloads/repair-shop-workspace` now includes one problem-and-solution section directly below the hero, covering disconnected repair-shop tools and the connected intake/parts/bench/POS workflow. Existing SVG identity and single trial CTA remain. Local-only; original application and production are unchanged.
