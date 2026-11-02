# Repairnox final CTA and footer

## Plan and scope

Add only the closing CTA after Pricing and the page footer after the main landmark. Keep previous sections and SVG branding intact. The CTA reinforces an organized repair shop, has one supporting sentence and a Start Free Trial button. The footer has the supplied SVG logo/name, Features/Pricing/About/Contact navigation, social icons, and a separate copyright/Privacy Policy row at the bottom.

## Destinations and user choice

The user explicitly chose **Use clearly marked coming-soon links for now** for the unconfirmed About, Contact, Privacy Policy and social-profile destinations.

- Features and Pricing are real anchors to existing sections.
- Brand links to the existing home page.
- About, Contact, Privacy Policy and Instagram/Facebook/LinkedIn are visibly marked Coming soon. They use honest status controls rather than guessed URLs, fake profiles, nonexistent pages or `#` placeholder links.
- The final CTA reuses the hero's already validated optional trial destination. Without one, its button announces **Free trial sign-up is coming soon.** No signup flow, trial duration, card requirement or cancellation policy is invented.
- No legacy FixPro support email, invented Repairnox email address or unreviewed privacy text is reused.

## Design and implementation

Stitch project: 4619699733370541135
Screen: projects/4619699733370541135/screens/291e748a48d040f1b0c8047385a5b488
Title: Repairnox — Final CTA and Footer Section

Inset black CTA with white/slate type and one white action button; white footer with restrained slate rules and spacing. The existing SVG BrandMark is reused. Social vector assets come from the official Phosphor Icons core repository under MIT; license retained in `design/brand/social-icons-LICENSE.txt`.

Footer is the page's content-info landmark outside `main`, with a named navigation and clearly named 44px social controls. Coming-soon and trial messages use polite status regions. Existing MotionConfig covers the short CTA entrance; footer has no motion. Layout groups stack on phones.

## Verification

- Production static export and strict TypeScript checks pass with Next.js 16.4.3.
- Actual browser checks at 1440, 1024, 768 and 375px show no horizontal overflow. Phone CTA is 54px high; social controls are 44 × 44px. Footer groups stack cleanly.
- Keyboard Enter activates the final CTA, keeps its 3px focus outline, and announces the pending trial message. All six coming-soon controls show the appropriate local feedback.
- Features and Pricing navigate to their existing section anchors. The page has one main landmark, seven main sections and one footer outside main. Earlier sections are preserved.
- No browser warnings or errors. Independent component review passed the scope, React state, accessibility and layout checks. Reduced motion is covered by the existing MotionConfig; browser media emulation was not used.
- Saved production previews: `preview/final-cta-footer-desktop.jpg` and `preview/final-cta-footer-mobile.jpg`.

## Suggested activeContext.md update

The standalone Repairnox landing page at `/home/ram/Downloads/repair-shop-workspace` now ends with a final trial CTA and a footer. Features/Pricing links work; the user approved clearly marked coming-soon controls for About/Contact/Privacy/socials. Trial uses the shared configured destination or honest pending feedback. Current copyright is 2026. No new app/signup/legal pages or external profiles were created; original application and production unchanged.
