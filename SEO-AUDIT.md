# Technical SEO audit and implementation

Canonical origin: https://www.dawoodtech.com

## Phase 1: findings before changes

Already correct:

- All public pages use Next.js Metadata exports through `createPageMetadata`, with unique titles/descriptions and page-specific canonical, Open Graph and Twitter text. The homepage uses an absolute title to avoid duplicating the brand suffix.
- `metadataBase` uses HTTPS www. No hand-written canonical tags or accidental noindex/nofollow were found on public pages.
- Homepage JSON-LD already contains one Organization and one WebSite, connected by publisher/@id. Name, URL, official logo, telephone and founding year are grounded in existing project content. No new entity schema was needed.
- Main navigation links Services, Industries, Solutions, Work, Company and Careers; the logo links Home. Contact is linked in header/CTAs and explicitly named in the footer. Server-rendered page content and links are crawlable without running client JavaScript. The mobile menu supplements the desktop/footer navigation.
- Each public page has one primary H1, descriptive subordinate headings, a main landmark and semantic sections. Shared header, labeled navigation and footer are present.
- Meaningful technology marks have accessible labels. Logo links have a descriptive accessible name and intentionally empty image alt text; the contact map is decorative. No missing alt attributes were found.
- Next.js sitemap and robots routes already exist. Robots allows public crawling and references the canonical sitemap. `/insights` calls notFound; unknown service/work slugs also call notFound. Legacy capabilities/process routes redirect and are excluded from the sitemap. No private or development page routes were found in app.
- Next.js Image handles displayed raster logos. Assets are local; no remote font/CDN dependency was found. The homepage heading animation retains a stable accessible text alternative.
- Live homepage checks via the web reader followed HTTP/non-www variants to HTTPS www. Existing hosting redirects therefore appear to cover origin normalization. Exact redirect status chains still need checking at the hosting edge after deployment.

Partial or missing:

- Careers was missing from the sitemap, despite being public and linked.
- Metadata had no explicit social preview image.
- Manual SVG/Apple icon metadata duplicated Next.js file-based declarations. Manual URLs used version query strings. Existing favicon PNG is 192x192; SVG has a square 512x512 viewBox; Apple PNG is 180x180. The existing assets meet square-icon needs and do not require replacement.
- Contact metadata title was the less descriptive “Let's Talk”.
- Genuine service and case-study index/detail hierarchies had no BreadcrumbList JSON-LD. Solutions has no nested page routes.
- Organization email was publicly available in project content but absent from its schema.

Recommendation: fix these small gaps, reuse existing metadata/schema/assets, and preserve the website's design and content.

## Phase 2: exact file changes

| File | Change |
| --- | --- |
| `app/lib/metadata.ts` | Add the existing official logo as the OG image with its actual 2125x281 dimensions and descriptive alt; add the existing square brand mark as the Twitter summary-card image. All 21 public pages use this helper. |
| `app/layout.tsx` | Use the stable `/favicon.png` URL; remove duplicate manual SVG and Apple icon declarations. Next.js continues generating declarations from `app/icon.svg` and `app/apple-icon.png`. |
| `app/sitemap.ts` | Include Careers; retain all distinct public pages and dynamic service/work pages; use the standard root slash; remove unsupported guessed change frequencies/priorities. No artificial last-modified dates were added. |
| `app/contact/page.tsx` | Change metadata title to Contact, yielding “Contact | Dawood Technologies”. Visible heading remains unchanged. |
| `app/page.tsx` | Add the existing public contact email to the existing Organization entity. Preserve the existing WebSite/Organization graph and homepage title. |
| `app/components/BreadcrumbStructuredData.tsx` | Add a server-rendered, safely serialized BreadcrumbList component using canonical absolute URLs and sequential positions. |
| `app/services/[slug]/page.tsx` | Emit Home → Services → service JSON-LD for all eight real service pages. |
| `app/work/[slug]/page.tsx` | Emit Home → Work → project JSON-LD for both existing case studies. |
| `app/components/Header.tsx` | Replace deprecated Image `priority` with Next.js 16 `preload`, retaining loading behavior. |
| `scripts/verify-seo.mjs` | Add a repeatable production-output quality check, run with `node scripts/verify-seo.mjs` after `npm run build`. |
| `SEO-AUDIT.md` | Save findings, changes, validation, limitations and deployment/indexing steps. |

## Phase 3: verification and limits

- Production build, ESLint and TypeScript passed.
- Local production HTTP checks passed: Home, Careers, robots, sitemap and all three icons returned 200; Insights and unknown service/work pages returned 404; `/services/` and `/capabilities` returned 308 to `/services`.
- Production HTML audit passed for all 21 sitemap pages: unique nonempty titles/descriptions, one correct canonical, one H1, all required social tags/images, no public noindex/nofollow, parseable JSON-LD, one homepage Organization/WebSite, valid breadcrumb positions/targets, internal link targets and image alt attributes.
- No CSS, layout, typography, spacing, animations, branding, visible headings, visible anchor text or existing content changed. Existing form functionality and security configuration were preserved.
- No real-user Core Web Vitals or visual regression comparison was performed. The header's existing Image preload was preserved. Some source assets are large (company logo ~416 KB, unused RCC logo ~1.99 MB), but displayed raster images already use Next.js optimization. The large project logo is not rendered by current page templates, so recompressing it would not improve current page loads. Major performance changes are unwarranted without measurements.
- The web reader could not fetch live robots.txt/sitemap.xml. Local production output is verified; verify live responses after deployment. This work has not been deployed and Search Console has not been accessed.

## Intentionally unchanged

- `app/robots.ts`: correct allow rule and sitemap reference; no invented route exclusions. Robots is not an access-control mechanism.
- Domain/legacy/trailing-slash redirects: existing Next.js defaults strip non-root trailing slashes; origin redirects appear to exist at hosting. No risky domain redirect changes were needed.
- `/about`: distinct existing content with its own metadata, rather than an exact duplicate of Company. Preserved to respect the instruction not to remove content.
- Main navigation and internal link text: important pages already receive contextual, crawlable links. No extra SEO links or visual navigation changes were needed.
- No nested solution pages or solution breadcrumbs were invented. Service/work breadcrumbs represent the actual index/detail paths without introducing a visible UI.
- No sameAs profiles, reviews, ratings, awards, clients, street addresses or company facts were invented. No artificial sitelinks schema, search action or search box was added.
- No favicon.ico was added: the existing PNG plus Next.js SVG/Apple files provide the required icons without another duplicate asset.

## Manual steps after deploying

1. Deploy these changes using the existing hosting workflow.
2. Confirm HTTPS www public URLs return 200; HTTP/non-www variants redirect to the same canonical; non-root trailing slashes redirect consistently. Confirm no CDN X-Robots-Tag, password gate or bot rule blocks public pages or assets.
3. Verify `/robots.txt`, `/sitemap.xml`, `/favicon.png`, `/icon.svg`, `/apple-icon.png` and `/dawood-technologies-logo.png` are publicly accessible. Confirm unavailable insights/unknown detail routes return 404.
4. In the verified Search Console domain property, submit https://www.dawoodtech.com/sitemap.xml.
5. Inspect/request indexing for the seven primary URLs below, prioritizing Home and Careers. Check Google's selected canonical and live rendered page.
6. Run Google's Rich Results Test on Home and a service/work detail page; use Schema Markup Validator for the WebSite entity. Monitor indexing, breadcrumbs, branded-query impressions and Core Web Vitals after recrawling.

Primary URLs:

- https://www.dawoodtech.com/
- https://www.dawoodtech.com/services
- https://www.dawoodtech.com/solutions
- https://www.dawoodtech.com/work
- https://www.dawoodtech.com/company
- https://www.dawoodtech.com/careers
- https://www.dawoodtech.com/contact

The sitemap also includes Industries, About, Privacy, Terms, eight service details and both work details. Inspect those if Search Console reports indexing problems; the sitemap provides discovery without manually requesting every URL.

Google generates sitelinks algorithmically. These changes improve technical signals and eligibility, but cannot guarantee sitelinks, a particular favicon, site name or ranking.

References: [Google sitelinks](https://developers.google.com/search/docs/appearance/sitelinks), [site names](https://developers.google.com/search/docs/appearance/site-names), [favicon guidance](https://developers.google.com/search/docs/appearance/favicon-in-search), [breadcrumbs](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb). Next.js implementation was checked against the installed 16.3.8 documentation under `node_modules/next/dist/docs/`.
