# RepairNox SEO launch — November 19, 2026

## Source and target

The blank recovery folder is not the production frontend. Implementation lives in `website-seo`, an isolated worktree of the current `charanpawarr09-sudo/landing-page` repository, branch `codex/seo-global`, based on `5b5ea2c`. Its source tree matches production commit `5624d2e` before the SEO changes. Target is the existing `repairnox-landing` Vercel project (`prj_zbPeVkOChNpvqba76CtMNCdJS4AS`) in `rams-projects-3a2c121b`. Preserve existing production secrets and help-domain routing.

## Target and research

User chose all supported repair businesses, global English. Homepage target: repair shop management software. Distinct industry routes cover phone, computer, automotive and jewelry repair; specialist industry integrations are not promised. Two useful guides support intake and software evaluation. No fabricated customer testimonials or business statistics.

OpenSEO project: https://app.openseo.so/p/e4617fba-71ef-49fc-9a0b-fdbf3e686073

Keyword metrics sampled November 19, 2026, US English (country-level estimates, NOT global totals):

| Query | Estimated monthly searches | Difficulty /100 |
| --- | ---: | ---: |
| repair shop management software | 880 | 54 |
| repair shop software | 260 | 49 |
| auto repair shop software | 2400 | 29 |
| computer repair shop software | 50 | 0 |
| jewelry repair software | 10 | 14 |
| repair ticket software | 10 | 49 |

No volume was available for cell phone repair shop software or repair shop inventory software. Absence of a reported volume is not proof of no demand. Difficulty is a vendor estimate, not a guarantee. Avoid prioritizing automotive merely because the sample volume is larger; product fit comes first.

## Baseline

Audit: https://app.openseo.so/p/e4617fba-71ef-49fc-9a0b-fdbf3e686073/audit?auditId=cdf0b3bb-046a-4141-9d1f-143ba5fb0cd4

Nine URLs crawled; no critical crawl issues. Three contact query variants correctly canonicalize to `/contact`. Homepage description was 163 characters. Baseline mobile Lighthouse: performance 99, accessibility 100, best practices 100, SEO 100; lab LCP 2110ms, CLS 0. These are lab measurements of the previous production build, not field Core Web Vitals or ranking guarantees.

## Measurement

The existing same-origin contact API logs `repairnox_inquiry_accepted` ONLY after accepted email-provider delivery. Event fields are `event`, `eventId`, `topic`, `industry`; no names, email addresses, phone numbers or messages. Count DISTINCT eventId values to deduplicate retries; filter topic `Free trial` for trial/demo inquiries. The native and JavaScript forms use the same endpoint. Measurement failure never changes a successful submission to an error. Existing Vercel log-retention limits apply: this is an immediate conversion baseline, not a durable analytics warehouse or organic-channel attribution system.

Organic attribution and long-term reporting still require a connected Search Console/analytics account. Do not claim inquiry counts are actual activated accounts or paying customers.

## Google account setup still required

No Google account is connected in OpenSEO. Connect at:
https://app.openseo.so/p/e4617fba-71ef-49fc-9a0b-fdbf3e686073/search-performance

1. In Search Console, use an existing verified repairnox.com property if available. Otherwise add a Domain property and place Google's exact TXT verification record in Porkbun, preserving all existing DNS/email records. This needs the authorized Google/domain account.
2. A URL-prefix property is an alternative. The code supports a server-only `GOOGLE_SITE_VERIFICATION` environment variable for the HTML verification token; rebuild after configuring it. Do not invent the token or expose credentials.
3. Submit https://repairnox.com/sitemap.xml and inspect the homepage, `/industries`, and new industry pages. The connector can inspect index status after connection; Google URL Inspection in the UI handles a recrawl request. A sitemap submission is not a guarantee of indexing.
4. Connect the verified property in OpenSEO. Record a 28-day baseline by query/page/country/device. Review non-brand impressions, clicks, CTR, and qualified inquiries monthly. Recent Search Console days may be incomplete. Compare like periods.
5. If GA4 exists, connect its existing property, confirm consent/privacy configuration and validate an actual successful inquiry as a key event before reporting organic conversion rates. No GA tag, advertising tracker, or paid monitoring subscription was enabled by this change.

## Ongoing content and discovery

Use the first two guides as the initial useful content, not a mass publishing template. Next topics should follow real customer questions (parts availability, technician handoffs, repair-to-checkout reconciliation). Request real customer consent and evidence before publishing case studies. Identify relevant repair-industry partners and software directories; prepare accurate listing copy only after checking each service's requirements. No outreach messages, account creations, paid listings, or review claims were submitted.

## Validation and release

Run `npm run test:contact`, `npm run build`, start the production server, then `python3 scripts/check-seo.py http://localhost:3102`. The rendered-site check covers all 15 canonical pages, unique titles/descriptions, readable headings, schema JSON, internal discovery, trial links, robots, unknown-slug 404s and the PNG share image. Contact tests use fake delivery and never send email. Stage a production deployment without assigning domains, validate the staged site, then promote that exact deployment. Check public-domain metadata and sitemap after promotion.
