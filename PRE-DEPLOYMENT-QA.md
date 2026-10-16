# Final pre-deployment QA — Dawood Technologies

Review date: October 16, 2026. Scope: current local production build, not a deployment.

## Readiness

Automated production and technical SEO checks pass. No confirmed application defect was found requiring a fix. Desktop/mobile visual approval remains outstanding because this session exposes no connected browsers or native apps. This is a conditional readiness result, not a claim that visual/browser QA passed.

Nothing was committed, pushed or deployed. Existing unrelated audit files were left alone. This review added only this report and `scripts/verify-http-seo.mjs`; application code from the SEO implementation remains unchanged.

## Completed checks

| Check | Result |
| --- | --- |
| Fresh `npm.cmd run build` | Pass, including Next.js TypeScript validation and static generation. |
| `npm.cmd run lint` | Pass. |
| `npx.cmd tsc --noEmit` | Pass. |
| `node scripts/verify-seo.mjs` | Pass for all 20 canonical pages. |
| `node scripts/verify-http-seo.mjs` | Pass against its own fresh production server on loopback port 3197; server stopped after checks. |
| Internal links and fragments | 781 occurrences checked; all resolve to canonical pages or existing fragment IDs. |
| Local resources | 18 unique image, icon, CSS and JavaScript URLs referenced by server-rendered pages checked; all return 200, including optimized images. This does not cover resources requested only after client interaction. |
| Server errors | None observed in the isolated production server log during HTTP QA. Browser console remains untested. |

## All canonical routes: HTTP 200

- `/`
- `/services`
- `/solutions`
- `/work`
- `/industries`
- `/company`
- `/careers`
- `/contact`
- `/privacy`
- `/terms`
- `/services/technology-consulting`
- `/services/ai-automation`
- `/services/cloud-devops`
- `/services/application-development`
- `/services/enterprise-erp`
- `/services/data-services`
- `/services/cybersecurity`
- `/services/managed-technology`
- `/work/dawood-rcc-pipe`
- `/work/dawood-traders`

## SEO and navigation

- Each canonical page has one unique nonempty title and description, one correct HTTPS www canonical, one H1, Open Graph/Twitter metadata and image alt attributes. No public metadata or HTTP X-Robots-Tag blocks indexing in the local build.
- All six requested primary titles are checked exactly, accounting for HTML entity encoding. The requested six descriptions are present in page metadata and carried into the served production HTML.
- HTTP title/meta/canonical/JSON-LD output matches the freshly generated build files for every canonical page. The homepage contains one Organization and one WebSite entity. All ten service/work detail pages have parseable BreadcrumbList JSON-LD with sequential positions and canonical targets. This is local structural verification, not Google rich-result certification.
- Sitemap contains exactly 20 unique preferred-origin canonical URLs and excludes redirects and unavailable pages. HTTP sitemap and robots responses match the generated files and return 200. Robots permits public crawling and references the preferred sitemap.
- Every page's rendered header and footer contains working anchors to Services, Solutions, Company (`/company`, displayed as About Us), Our Work and Contact. Homepage contextual links are present. All destinations were requested successfully over HTTP.
- `/about` -> `/company`, `/capabilities` -> `/services`, `/process` -> `/services`, and `/services/` -> `/services` return 308 with the expected Location header.
- `/insights`, unknown service/work details and `/oil-crisis-brewing-global-market` return 404.

## Layout and interactions: source review only

Reviewed header, mobile navigation, footer, homepage and responsive CSS. The existing 800px mobile-navigation breakpoint, smaller-screen typography/grid rules, menu state, Escape-to-close behavior, focus restoration, accessible button naming and expanded state are preserved. Shared labels remain consistent between desktop, mobile and footer.

There are no CSS, image, animation or layout-system changes in the SEO diff. Longer navigation labels and the added homepage work-index link still need a rendered visual check; source review cannot establish that they fit or look correct at all widths. No speculative layout changes were made.

## Unavailable / outstanding checks

Browser inventory returned no browsers/apps. Therefore the following could not be completed:

- Desktop/mobile screenshots and visual regression comparison for header, homepage and footer.
- Actual header fit, wrapping, clipping and horizontal overflow at 320/375/390/768/800/801/1024/1280/1440px widths.
- Interactive menu, keyboard/focus behavior, client navigation, hydration errors, browser console and browser network failures.
- reCAPTCHA rendering and interactive contact-form validation/submission. No real submission was sent.
- Lighthouse, browser-based LCP/CLS measurements and interaction responsiveness. No Core Web Vitals score or pass is claimed; real-user INP and other field metrics require production data.
- External destination availability was not rechecked; the broken-link sweep covers internal links and local rendered resources.

Search Console indexing, Google's selected canonicals and external schema validators were not accessed. Prior live redirect findings remain documented in `SEO-AUDIT.md`: HTTP non-www takes two permanent hops to HTTPS www. Consolidating those hops is an optional hosting improvement, not a newly found local blocker.

## Before approval to deploy

Complete a browser smoke test at desktop/mobile widths, especially around the 800px header breakpoint. Confirm menu opening/closing, keyboard navigation, longer labels, footer stacking, homepage work link placement and a clean browser console. Run Lighthouse if available; review production field metrics separately. Then approve deployment through the existing workflow. Repeat live sitemap/robots/canonical checks after deployment and follow the Search Console steps in `SEO-AUDIT.md`.

Repeatable local QA: `npm.cmd run build`, `npm.cmd run lint`, `npx.cmd tsc --noEmit`, `node scripts/verify-seo.mjs`, `node scripts/verify-http-seo.mjs`.
