# Dawood Technologies technical SEO audit

Audit date: October 16, 2026. Preferred origin: https://www.dawoodtech.com.
All changes are local. Nothing committed, pushed, or deployed.

## Verified findings

- Next.js 16.3.8 App Router with server-rendered/static public pages. Installed generateMetadata documentation was read before editing.
- Existing shared Metadata API already supplies unique titles/descriptions, canonicals, OG/Twitter metadata and real image assets. No duplicate tags or public noindex directives found in generated output.
- Primary titles were less descriptive than requested (Technology Services, Company, Work, Contact); homepage description differed from the requested business summary. Proposed descriptions match consulting, software, cloud, networking, enterprise systems and automation content in the existing service catalog.
- Navigation used Work, Company and Let's Talk. These destinations existed, but labels were less consistent with the desired sitelinks. Homepage linked work details without a contextual work-index link.
- Existing Organization and WebSite graph is valid JSON, connected by publisher/@id, and uses the real logo and existing public contact information. Existing service/work detail BreadcrumbList markup describes real hierarchies. No new schema is needed; none was added. No invented social profiles, ratings, addresses or search actions were added.
- Sitemap contains 20 unique canonical public URLs, including Careers, eight service details and two work details. Redirected /about, /capabilities and /process, unavailable /insights and unknown details are excluded. Existing robots.txt allows crawling and references the preferred sitemap. Both live files return 200 and agree with the local configuration.
- Existing favicon PNG, file-based SVG and Apple icon configuration is retained. Images have alt attributes; decorative brand images have accessible link labels. Homepage has one H1, identifies the company and visibly explains its services. All audited pages have one H1.
- Important links render as real anchors in initial HTML. Footer links cover the important pages. Public pages have no orphan links in the generated HTML audit. Mobile panel remains an interactive supplement; desktop/footer links are already server rendered.
- Existing /about permanently redirects to /company. Existing capabilities/process aliases redirect to Services. Unknown routes return 404. These working rules were preserved.

## Changes and files modified

| File | Change |
| --- | --- |
| app/page.tsx | Requested homepage description; contextual Explore our work link using existing link styling. |
| app/services/page.tsx | Requested Services title and description. |
| app/solutions/page.tsx | Requested Solutions title and description. |
| app/company/page.tsx | Requested Company title and description. |
| app/work/page.tsx | Requested Our Work title and description. |
| app/contact/page.tsx | Requested Contact title and description. |
| app/lib/metadata.ts | Fully branded titles use an absolute title to avoid duplicating the layout brand suffix; existing short titles still use the layout template. Social metadata uses the same page text. |
| app/data/site.ts | Shared Work/Company labels become Our Work/About Us for desktop, mobile and footer consistency. |
| app/components/Header.tsx | Contact CTA label becomes Contact Us. |
| app/components/MobileNavigation.tsx | Matching Contact Us label. |
| app/components/Footer.tsx | Matching Contact Us label. |
| scripts/verify-seo.mjs | Assert exact six primary titles and primary homepage links in addition to existing output checks. |
| SEO-AUDIT.md | Replace stale prior audit (which incorrectly said /about remained indexable and counted 21 pages) with current evidence and limitations. |

No CSS, assets, animation, layout structure, form behavior or routing configuration changed.

## Metadata now implemented

| Route | Exact title |
| --- | --- |
| / | Dawood Technologies &#124; IT Infrastructure & Business Systems |
| /services | IT Services & Consulting &#124; Dawood Technologies |
| /solutions | Business Technology Solutions &#124; Dawood Technologies |
| /company | About Dawood Technologies &#124; Company & Expertise |
| /work | Our Work & Technology Projects &#124; Dawood Technologies |
| /contact | Contact Dawood Technologies &#124; IT Consulting & Support |

All six descriptions match the supplied request and the site's existing capabilities. The other 14 canonical pages retain their existing distinct metadata.

## Live canonical and legacy URL checks

Public HTTP requests verified:

- http://dawoodtech.com/services -> 308 https://dawoodtech.com/services -> 308 https://www.dawoodtech.com/services.
- http://www.dawoodtech.com/services -> 308 https://www.dawoodtech.com/services.
- HTTPS non-www -> HTTPS www uses a permanent redirect. Domain normalization already exists at hosting; no application host redirect or loop was introduced.
- Recommendation: configure Vercel's origin redirects to consolidate HTTP non-www into one hop if supported by the existing hosting configuration. This requires hosting review and was not changed locally.
- Public search surfaced https://dawoodtech.com/oil-crisis-brewing-global-market/ (Global Oil Crisis Brewing), an unrelated legacy article. Search results may be stale and are not proof of current Google indexing. The www trailing-slash URL redirects 308 to its slashless path, which returns 404 on production. Local route also returns 404. Preserve this status; there is no relevant replacement for a 301. No blanket homepage redirect added.
- Public web reader successfully retrieved the current branded homepage. Search Console indexing, selected canonicals and exhaustive legacy URL discovery remain unverified.

## Validation

- npm.cmd run lint: passed. PowerShell blocks npm.ps1, so the standard npm.cmd launcher was used.
- npx.cmd tsc --noEmit: passed; Next.js production build TypeScript check also passed.
- npm.cmd run build: passed after final page changes; all public content is prerendered.
- node scripts/verify-seo.mjs: passed for all 20 canonical pages. Checks unique/nonempty titles/descriptions, exact primary titles, one matching canonical/H1, social metadata/images, parseable JSON-LD, homepage Organization/WebSite counts, sequential detail breadcrumbs with canonical targets, primary links, internal anchor destinations, alt attributes, sitemap exclusions, /about redirect manifest and robots.
- Local production HTTP: six primary pages, robots and sitemap return 200; /about -> /company and /services/ -> /services return 308; /insights, unknown service/work and the discovered legacy article return 404.
- No dedicated test framework or test script is configured. Existing SEO verification was extended rather than adding dependencies.
- Navigation source review confirms unchanged menu state, Escape handling, focus restoration, aria-expanded/controls and breakpoints. Desktop/mobile labels share the same data. Interactive visual checks could not run: browser inventory is empty and in-app browser is unavailable. Recheck header fit and mobile menu after deployment, especially longer labels.
- Real-user Core Web Vitals and Lighthouse performance were not measured. No performance regression claim is made. Existing Next Image optimization, local assets and static rendering are preserved. Image alt checks verify presence; editorial quality still warrants human review.
- JSON-LD is locally parsed and structurally checked; Google Rich Results Test and Schema Markup Validator were not run. Live production does not include these local changes yet.

## Google Search Console and remaining steps

After reviewing and approving the local changes:

1. Commit/deploy through the existing workflow only after user approval.
2. Verify header/menu at desktop and mobile widths and repeat local SEO/HTTP checks on the deployed version. Check for hosting X-Robots-Tag or access restrictions.
3. In the verified domain property, submit https://www.dawoodtech.com/sitemap.xml.
4. Use URL Inspection on /, /services, /solutions, /company, /work and /contact. Check live rendered HTML, indexability and Google's selected canonical; request indexing where appropriate.
5. Inspect the legacy oil-crisis URL, review Pages indexing reports, historical sitemaps and backlinks for other unrelated legacy paths. Leave removed content at 404/410 unless a relevant replacement exists. Search Console temporary removals can hide urgent obsolete results but do not replace permanent removal behavior.
6. Run Rich Results Test for homepage Organization and service/work detail breadcrumbs; validate the WebSite graph with Schema Markup Validator. Review Core Web Vitals and mobile usability using real data when available.
7. Monitor branded queries, indexing and sitelink presentation after recrawling. Do not repeatedly request indexing without new evidence of a problem.

Google selects sitelinks automatically. Clear hierarchy, relevant link labels and descriptive metadata improve eligibility but cannot guarantee rankings, sitelinks or immediate indexing.

Sources: [Google sitelinks guidance](https://developers.google.com/search/docs/appearance/sitelinks), [legacy result discovered during audit](https://dawoodtech.com/oil-crisis-brewing-global-market/), [live sitemap](https://www.dawoodtech.com/sitemap.xml), [live robots](https://www.dawoodtech.com/robots.txt). Live status checks used direct HTTP requests; web-reader fetches for sitemap/robots failed, so they were independently verified over HTTP.
