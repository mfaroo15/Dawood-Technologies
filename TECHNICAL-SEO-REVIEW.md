# Google and Bing technical SEO review

Reviewed October 17, 2026 (America/Chicago). No commit, push, deployment, indexing submission, or webmaster-account change was performed.

## Outcome and confirmed findings

No confirmed application SEO defect was found. No application files were modified. The audit intentionally preserves the working metadata, canonical URLs, navigation, design, robots, sitemap, structured data, and exclusions.

The reported Bing notice about two missing homepage alt attributes was not reproduced in current production HTML. The two images are the header and footer brand logos; both explicitly have `alt=""`. Their containing home links have `aria-label="Dawood Technologies home"`, so each link already has a meaningful accessible name. Empty image alternatives avoid duplicating that name. Location: `app/components/Header.tsx` and `app/components/Footer.tsx`. No corrective change is justified by current evidence. The contact page map also correctly has empty alternative text; nearby text supplies the location information. All image elements on all 20 pages have alt attributes. Technology SVGs are hidden from assistive technology inside labeled `role="img"` containers. Do not add HTML alt attributes to inline SVGs.

## Production verification

The full per-page record, including titles, descriptions, canonicals, image alternatives, links, parsed schemas, status codes, and crawler responses, is in `production-seo-evidence.json`. Run `node scripts/audit-production-seo.mjs` to repeat the read-only public checks; it overwrites this evidence file and never submits URLs.

- Live sitemap and robots both return 200. Sitemap contains exactly 20 distinct HTTPS www URLs and matches the freshly built local sitemap byte for byte.
- All 20 pages return 200, have one H1, unique nonempty titles and descriptions, and self-referencing preferred-domain canonicals. Production titles and canonical markup match the fresh local build. The homepage canonical omits a trailing slash; URL normalization makes this equivalent to the sitemap root URL. This is expected Next.js metadata behavior and does not warrant a change.
- All pages advertise `index, follow`; no restrictive X-Robots-Tag was returned. Robots allows `/` for all crawlers and references the preferred-domain sitemap.
- Separate Googlebot and bingbot user-agent requests return 200 for all 20 pages, robots and sitemap (44 probes). Each page contains server-rendered main content and its canonical. These requests establish accessibility from the audit environment; they do not prove how verified crawler IPs are treated by every edge location or establish actual indexing.
- Important navigation is rendered as HTML anchors, including About Us (`/company`), Services, Careers, Contact, and detail pages. Local HTTP QA verified 775 internal links/fragments and 18 resources.
- JSON-LD parses successfully: Organization and WebSite on the homepage, and BreadcrumbList on all eight service details and both work details. Organization identifiers, publisher reference, URLs, logo, contact fields and founding date agree with repository business data. Breadcrumb positions and canonical destinations pass local checks. No fabricated reviews, ratings or unsupported claims were found. This is a source/output validation, not a Google Rich Results Test or independent verification of business facts.
- HTTPS non-www redirects permanently (308) to HTTPS www and preserves `/services`. HTTP www redirects directly to HTTPS www. HTTP non-www uses two permanent hops through HTTPS non-www; this works correctly and does not justify a deployment configuration change.
- Live `/about` redirects 308 to `/company`; `/capabilities` and `/process` redirect 308 to `/services`. Intentional `/insights` and unknown detail routes remain 404 locally; they are absent from the sitemap and internal navigation.

## Tests

| Check | Result |
| --- | --- |
| `npm.cmd run lint` | Passed |
| `node node_modules/typescript/bin/tsc --noEmit` | Passed |
| `npm.cmd run build` | Passed; all public routes generated |
| `node scripts/verify-seo.mjs` | Passed for all 20 canonical pages |
| `node scripts/verify-http-seo.mjs` | Passed; 20 pages, 775 links/fragments, 18 resources, redirects, intentional 404s, metadata parity; no server errors |
| `node scripts/audit-production-seo.mjs` | Completed against live production; evidence saved |
| Git review | No tracked application changes; pre-existing untracked audit documents left untouched |

PowerShell initially blocked the npm.ps1 wrapper; using npm.cmd succeeded without changing execution policy. No visual or interactive form regression suite was run because application behavior and styling were not changed. HTTP checks validate routes and assets, not every interactive workflow. No contact forms were submitted.

## IndexNow recommendation and future implementation plan

No IndexNow code, key file, workflow, or integration was found in this checkout. External Vercel/GitHub account configuration was not accessible, so an account-level integration cannot be ruled out. IndexNow is optional for this small, mostly static site. Defer implementation until actual update frequency justifies it; its absence is not an indexing defect.

If later approved:

1. Confirm there is no existing external integration. Generate a dedicated valid verification key and publish its UTF-8 verification file at the preferred host root. The verification file is intentionally publicly retrievable; it is not a private application credential. Keep GitHub/Vercel API tokens private in CI secrets, out of client bundles and logs.
2. Use a separate job after a successful production deployment, with minimal permissions and no execution for previews or untrusted pull requests. Verify the production host and key file before submitting.
3. Compare stable fingerprints of indexable rendered content, titles, descriptions, canonicals and structured data against the last successfully notified production state. Exclude deployment IDs and volatile framework payloads. Handle added, changed and deleted canonical URLs; account for shared navigation changes. Do not resubmit unchanged pages on every build.
4. Submit a deduplicated preferred-host URL list to a participating IndexNow endpoint. Bound requests with timeouts and limited backoff, record failures for a later retry, and advance successful notification state only when accepted. Keep the job independent and nonblocking so submission failures never fail or delay deployment.
5. Test failure handling and changed-URL selection before enabling production notifications. A successful response acknowledges receipt; it does not guarantee crawling or indexing.

Protocol reference: https://www.indexnow.org/documentation

## Manual webmaster follow-up

No new indexing requests are required by this audit. In Bing, inspect the exact image URLs and fetch date associated with the two-image warning, then compare the latest fetched HTML with the evidence here. If the warning persists on a fresh crawl, determine whether Bing is flagging empty alternatives despite the correctly labeled home links before changing markup. Current evidence does not establish the warning's cause or age.

Monitor Google Search Console and Bing indexing reports over time. The previously reported “Discovered but not crawled” state alone does not establish a code defect. Review future crawl or exclusion reasons if they change. Neither indexing nor sitelinks is guaranteed. Webmaster account reports were supplied by the user and were not independently accessed during this audit.

## Exact files added

- `scripts/audit-production-seo.mjs`: repeatable read-only live HTTP evidence collector.
- `production-seo-evidence.json`: captured live results for all 20 URLs and probes.
- `TECHNICAL-SEO-REVIEW.md`: findings, validation limits and recommendations.

No existing file was modified. These additions are local review artifacts; no application or deployment change awaits release.
