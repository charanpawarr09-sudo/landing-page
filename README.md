# Repairnox website

A standalone pre-launch marketing website for independent phone, computer and electronics repair shops. It lives outside the original application, which remains unchanged.

## Current experience

The latest 29 October update replaces the subtle presentation with a larger product opening, one scroll-driven repair story and alternating feature chapters with staged UI motion. The full-width black header progress line is removed. The site keeps native scrolling and offers normal-flow story layouts on phones, short windows and reduced motion.

Production build, types and export audits pass. Actual browser checks cover the three product scenes, sample repair workflow/keyboard behavior, launch dialog/reset/FAQ and responsive geometry at 320, 390, 768, 1024 and the normal laptop width. Receipt download-event reporting timed out; its served bytes match the source. See [Apple research and final verification](docs/research/apple-motion-direction-2026-10-29.md).

- A distinctive benefit-led homepage, responsive navigation and the supplied transparent SVG brand.
- A working sample repair: create a ticket, choose a technician, record one part, mark it ready, complete the sample checkout and download the receipt. Reset restores the sample shop. No live shop data or payments are involved.
- Source-backed feature benefits, owner-focused positioning, two transparent planned-launch plans and keyboard-operable FAQs.
- Three original practical shop guides with real Markdown checklist downloads.
- Accessible launch-status dialogs for trial, plan, contact, privacy and social controls. Trial/contact destinations are not ready, as confirmed by the user. This website collects no enquiry details and installs no analytics.
- Static HTML, local Geist fonts, inline vectors, selective Framer Motion, reduced-motion handling and a branded 404 page.

The old fictional testimonials have been removed. Pro multi-store, unlimited staff and priority support are labelled planned; pricing is the user's proposed launch offer, not an implemented subscription.

## Run

Requires Node.js 22+ and Python 3.

```sh
npm install
npm run build
python3 scripts/verify-export.py
npm run preview
```

Open [the local website](http://127.0.0.1:3100/). The preview serves `out/`, including direct guide routes and the branded 404. Reload after rebuilding. Development is available with `npm run dev`; stop the preview first because both use port 3100.

## Launch configuration

Copy `.env.example` to `.env.local` only when actual destinations exist, then rebuild.

| Setting | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Verified public HTTPS origin, without path/query/credentials. Enables index/follow, canonical URLs, sitemap and absolute share-image URLs. Local/IP/HTTP origins are rejected. Blank keeps the preview noindex and avoids a guessed hostname. |
| `NEXT_PUBLIC_TRIAL_URL` | Actual HTTP(S) onboarding destination. Blank opens the honest pre-launch panel. No trial duration or billing policy is invented. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Confirmed business email. Blank retains the coming-soon contact panel. No form or mailing list is implemented. |

The site origin setting is a configuration contract, not proof of domain ownership. Confirm ownership, production HTTPS and final commercial/legal terms before public promotion. Guide FAQs and pricing availability copy must be reviewed when registration opens; connecting a link alone does not implement subscriptions or Pro features.

For a configured-origin build, verify with:

```sh
python3 scripts/verify-export.py --origin https://your-confirmed-domain.example
```

This audits the existing export; it does not configure or deploy a domain. No deployment, advertising, outreach, data collection or production application changes were performed.

## Research and handoff

- [Design decisions and implementation](DESIGN.md)
- [Competitor research](docs/research/competitors.md)
- [Source-backed product audit](docs/research/product-audit.md)
- [SEO, accessibility and visual storytelling research](docs/research/traffic-accessibility.md)
- [Thirty-day acquisition plan](docs/research/acquisition-plan.md)
- [Verification evidence and remaining limits](docs/research/verification-results.md)

Historical section notes remain in `docs/`. The pre-redesign source is archived in `scratch/pre-redesign-2026-10-29.tar.gz`. Social SVGs are Phosphor Icons under MIT, retained in `public/licenses/phosphor.txt`. The original raster logo is an archived design reference, not a runtime image.
