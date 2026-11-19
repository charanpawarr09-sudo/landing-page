# RepairNox website and Help Center

The current public marketing website, pricing/contact/support pages, and Help Center. Hosted on Vercel in the existing `repairnox-landing` project. The POS application is a separate project and is not included here.

- Website: https://repairnox.com
- Help Center: https://help.repairnox.com (requires the help DNS CNAME)
- Product sign-in: https://app.repairnox.com/login

## Local development

Use Node.js 24 and run `npm ci`, then `npm run dev`. Production checks are `npm run test:contact` and `npm run build`. The Help Center can be previewed at `/help`; in production, a host-specific rewrite serves it at the root of help.repairnox.com. Its header/footer return visitors to the main website for pricing, demos, policies and contact.

## Deployment

Deploy this repository root to the existing **repairnox-landing** project in **rams-projects-3a2c121b**. Run `vercel project inspect --non-interactive` to confirm the target. Stage with `vercel deploy --prod --skip-domain`, check the resulting build, then promote the tested production deployment. GitHub Actions checks the build and fake-transport contact tests; Vercel hosts the site. The former GitHub Pages static-export workflow is replaced because the current contact form has a server endpoint.

Configure `RESEND_API_KEY`, `DEMO_RECIPIENT_EMAIL` and `DEMO_CC_EMAIL` as server-only production settings in Vercel. Existing production values are retained/configured there; none are committed. Contact submission remains same-origin at `/api/demo`, with the existing Vercel WAF limits, validation, honeypot, consent, provider idempotency and fixed server-side recipients. Tests never send real email.

## Help Center

The Help Center combines the repair flow with the responsibilities of counter staff, technicians and owners. It also covers setup, customers, inventory, checkout, permissions, common questions and support. Its navy/blue/white theme and header/footer match the marketing website.

Porkbun DNS: add CNAME host `help`, answer `43847e58ed622a29.vercel-dns-016.com`, using the default TTL. Preserve all root, www, app and email records. Vercel owns the TLS certificate lifecycle once DNS resolves correctly.

The previous website remains in Git history. Earlier design/research documents and preview helpers in this repository are historical; the root package and source describe the current application.

## SEO and measurement

The homepage targets repair shop management software, with industry pages under `/industries`, practical articles under `/guides`, and an About page. All are linked and included in `/sitemap.xml`. New content is rendered statically, with canonical URLs, social previews, organization/breadcrumb/article data as appropriate. Unknown industry/guide slugs return 404. `/guide` redirects permanently to the Help Center.

Run `python3 scripts/check-seo.py http://localhost:3102` against a running production build, or pass the public site URL after deployment. See [SEO launch and account setup](docs/seo-launch-2026-11-19.md) for keyword research, measurement limits, Search Console connection, and monthly review. Optional server-only `GOOGLE_SITE_VERIFICATION` emits Google's supplied verification token after a rebuild. Preview builds are noindex.

Accepted inquiries log a privacy-limited conversion event in Vercel; deduplicate by eventId. Search Console and analytics account connections remain separate setup steps; no paid tracker or recurring job was enabled.
