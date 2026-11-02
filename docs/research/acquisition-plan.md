# Repairnox: a practical first 30 days

Prepared 29 October 2026. This is a launch and learning plan, not a forecast of rankings, traffic or sales. No ads, outreach, publication, Search Console connection or analytics installation were performed for this plan.

## Already implemented locally

- A category-specific homepage title and description explain repair tickets, technicians, inventory and POS for independent phone and computer repair shops. The homepage provides a working sample repair journey and links to useful content.
- Three original, server-rendered guides exist: [repair intake](/guides/repair-ticket-intake-checklist/), [parts inventory](/guides/repair-parts-inventory-routine/) and [technician handoffs](/guides/repair-technician-handoff-checklist/). Each has page-specific metadata, related-guide links and a real downloadable Markdown checklist. They are practical guidance, not certifications or proof of product outcomes.
- The static export contains all three guide routes. Canonicals, share-image URLs, sitemap and indexability depend on the validated `NEXT_PUBLIC_SITE_URL` origin. Until it is configured, the site remains a non-indexable preview rather than claiming an unverified public host.
- Trial and contact actions disclose the current pre-launch state. There is no enquiry collection, real payment or completed trial registration in the sample experience. No analytics package or tracking integration is installed now.

## Launch dependencies

Before promoting a public URL, confirm the owned HTTPS host and set `NEXT_PUBLIC_SITE_URL`; rebuild and check canonical URLs, robots, sitemap and the social image on that host. Connect a verified `NEXT_PUBLIC_TRIAL_URL` only when real onboarding and trial terms are ready. Add a verified `NEXT_PUBLIC_CONTACT_EMAIL` or a properly implemented enquiry service when the business can receive and answer messages. Publish the accurate Privacy Policy before collecting visitor details. These are still dependencies, not completed launch work.

## Days 1–7: establish the baseline

Owner: product owner and developer.

1. Complete the launch checks above; test homepage → tour, all guide routes/downloads and eventual real onboarding on phone and desktop. Keep planned pricing/capabilities visibly distinct from available features.
2. Verify host ownership in Search Console, submit the actual sitemap and inspect the four public content URLs. Record indexing status rather than assuming publication means indexing.
3. Choose a minimal measurement approach and document its data handling before installing it. Proposed events: `tour_start` on the first deliberate sample-ticket creation, `tour_complete` once sample checkout completes, `guide_open`, `checklist_download`, `trial_interest` for a pre-launch panel and `trial_outbound` for a real onboarding link. Avoid customer data, names or free-text fields in event properties.
4. Establish a baseline for relevant search queries, guide visits and tour completion. Use a small number of owner/manager usability sessions to check whether visitors understand the offer and next step; report observations, not a statistically proven lift.

## Days 8–14: distribute one useful resource

Owner: product owner.

Start with the intake checklist because it introduces the same connected-ticket workflow as the product tour. Share it in an appropriate repair-owner community, with a repair educator or through an existing supplier relationship, respecting their rules and obtaining permission where needed. Explain the useful routine before inviting readers to explore the product. These are suggested channels; no messages have been sent.

Use distinct campaign tags for each approved channel so referral quality can be compared. Track visits → guide use → tour starts/completions, and note the questions owners ask. A real annotated example or captioned short demonstration can make the routine concrete. Do not imply that sample customers are paying users.

## Days 15–21: improve the content from real questions

Owner: product owner and content editor.

Review the parts and handoff guides with an actual repair-shop operator. Refine confusing terminology and add firsthand examples only with permission and anonymization. Use repeated buying questions to improve the FAQ. If there is enough original material, outline a deeper ticket-tracking or inventory page; do not create thin duplicates or city-keyword pages.

Review Search Console queries and landing pages alongside tour behaviour. Distinguish irrelevant visitors from a confusing page: low-intent traffic calls for distribution changes; relevant visitors who cannot finish the tour call for usability work. Small samples support hypotheses, not confident conversion claims.

## Days 22–30: repeat what earns relevant attention

Owner: product owner and developer.

Compare channels by qualified engagement, not total impressions. Continue the guide or demo format that attracts owners and managers who use the workflow. Seek real, permissioned feedback before adding testimonials or measurable customer outcomes. Paid search is an optional later experiment requiring a working conversion path and an independently approved budget; no spending is proposed as already authorized.

Once real onboarding is connected, measure **confirmed trial signups** from the application or receiving service. A click on a trial link, a pricing choice, or opening a pre-launch dialog is not a signup. Where the landing page and application are separate, agree on attribution and privacy handling before adding cross-site tracking. Use completed real registrations as the conversion outcome and tour completions as a useful earlier signal.

## Weekly scorecard

| Question | Evidence | Interpretation |
| --- | --- | --- |
| Are the right people discovering the site? | Search queries, referring sources and operator feedback | Query/topic relevance matters before volume. |
| Is the product understandable? | Tour starts and unique completions; observed usability issues | Completion rate = completed tours / started tours for the same reporting period; exclude repeats and resets. |
| Is content useful? | Guide reads, checklist downloads and onward demo engagement | A download is a resource action, not a lead or customer. |
| Does interest become a real account? | Eventually, confirmed application trial registrations | Keep pre-launch interest and outbound clicks separate. No signup target can be validated before the endpoint exists. |
| Does the page stay fast? | Lab checks before launch; real-user Core Web Vitals afterward | Aim for p75 LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 on mobile and desktop. Local results alone do not prove field performance. |

At day 30, record what was actually launched, which sources brought relevant visitors, where they stopped and the next single experiment. Set numeric business targets from a real baseline rather than inventing an expected conversion rate.

## Evidence behind the plan

Google recommends helpful, original, people-first content and sensible promotion, and does not guarantee ranking or indexing. Search Console supplies query/page and indexing evidence. Core Web Vitals thresholds describe real-user experience, with lab tests serving as diagnostics. [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start), [Web Vitals](https://web.dev/articles/vitals), [lab versus field](https://web.dev/articles/lab-and-field-data-differences).

The channel choices, 30-day sequence and proposed event names are Repairnox-specific recommendations based on the audience and current implementation; they are not claims made by Google or a guarantee of acquisition performance.
