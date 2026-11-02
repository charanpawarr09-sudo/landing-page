# Repairnox testimonial section

## Plan and scope

Add one section directly below How It Works, containing exactly three realistic sample testimonials with a person's name, role and independent shop name. Match the existing monochrome/Geist design with static equal-width cards, restrained quote icons and initials avatars. Stack the cards on smaller screens. No carousel, additional CTA, ratings, customer counts, photos or application features.

## Content integrity

No verified customer quotes were supplied. The names, shops and feedback are fictional design placeholders, not actual customer endorsements. The section prominently says **Sample testimonials. All names, shops, and quotes are fictional.** Every card also says **Sample testimonial**, and the disclosure is connected to the section and figures for assistive technology.

The three stories illustrate easier intake, clearer ticket handoffs and simpler parts visibility. They avoid guaranteed savings, actual zero-loss claims, verified-review badges, ratings and aggregate-review structured data. Replace samples with permissioned first-party feedback before representing the section as genuine social proof.

## Design reference

Stitch project: 4619699733370541135
Screen: projects/4619699733370541135/screens/b1a488600bab42aa9ecff70265e0c78f
Title: Repairnox — Testimonial Section

UI/UX Pro Max's verified Minimalism & Swiss Style guidance informs spacing, monochrome contrast and typography. Its social-proof pattern recommends verified feedback; no such feedback is claimed here. Only the requested section is added, without the pattern's suggested carousel or CTA.

## Verification

- Production static build and included strict TypeScript check pass.
- Browser confirms exactly three figures and complete name, role and shop attribution on each; all three sample labels and the full fictional-content disclosure are present.
- Checked at 1440, 1024, 768 and 375px. Cards use three columns on desktop and one on smaller screens; no page overflow or clipped quote/attribution/disclosure text.
- Section appears directly after How It Works. It adds zero controls, and the existing page still has one CTA. Browser logs contain no warnings or errors.
- The accessibility tree includes the visible fictional disclosure and every quote/attribution. Independent source review confirms scope and transparent sample treatment.
- Screenshot: `preview/social-proof-desktop.jpg`. Reduced-motion handling inherits the existing MotionConfig and is source-reviewed.

## Suggested activeContext.md update

The standalone Repairnox page at `/home/ram/Downloads/repair-shop-workspace` now has a three-card sample testimonial section below How It Works. All identities, shops and quotes are clearly marked fictional placeholders. Actual customer approval/quotes remain pending before these can serve as genuine social proof. Local-only; original application and production unchanged.
