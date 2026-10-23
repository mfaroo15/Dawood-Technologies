# Dawood Technologies multilingual implementation plan

Planning date: October 17, 2026. Status: proposed; implementation requires approval.

Only this document was created for this task. No application changes, dependency installation, commit, push, deployment, or indexing submission was performed.

## 1. Findings and scope

The repository uses Next.js 16.3.8 App Router, React 19.2.4 and TypeScript. The prior audit verified 20 production canonical pages. This planning review inspected the current source and installed Next.js guides; it did not repeat that production audit.

- Routes are explicit `app/**/page.tsx` files. Eight services and two work details use `[slug]`, `generateStaticParams`, asynchronous params and `generateMetadata`. All 20 public pages are prerendered by the current build.
- English content lives in `app/data/site.ts`, inline page copy, shared components, and `app/contact/ContactForm.tsx`. There is no CMS or translation system. Stable route slugs and business identifiers currently coexist with English display strings.
- `app/layout.tsx` owns `<html lang="en">`, shared header/footer, metadata defaults and global CSS. `app/lib/metadata.ts` builds per-page canonical/social metadata from the preferred www origin.
- Header is a Client Component using pathname for active state; mobile navigation is separately rendered when opened. Header/footer currently use unprefixed links. No visitor language persistence was found.
- `app/sitemap.ts` derives the 20 English URLs from a base route list plus service/work records. `app/robots.ts` permits crawling. Next configuration provides intentional legacy redirects, security headers and CSP; www canonicalization is already working on hosting.
- Homepage contains Organization/WebSite JSON-LD; service/work details contain BreadcrumbList. `/about` redirects to `/company`; `/insights` intentionally returns 404. Neither should become a new translated content family.
- Careers currently publishes an explicit “no open positions” state. There are no active job-detail routes to translate and no basis for inventing jobs or JobPosting schema.
- Contact uses Formspree and explicit Google reCAPTCHA with client validation, timeout, honeypot and request-state messages. Select values are English strings used by validation; changing labels alone without decoupling values would break submissions.
- CSS uses a system font stack, existing responsive breakpoints, some logical properties and many physical left/right declarations. The rotating homepage wording also requires grammatical localization, not individual word substitution.
- Hosting is Vercel according to the supplied context; the checkout has no inspected deployment-event integration to rely on. No hosting change is needed for the recommended route design.

NETSOL's public page exposes an English (US) language image/control in the fetched representation. The reference informs the flag/name selector concept, not a requirement to copy its implementation or branding. No reference screenshot was attached to this request; exact menu geometry, animation and its complete interactive behavior were not visually verified. The proposed behavior below follows this project's requirements and existing header.

## 2. Recommended architecture

Use explicit locale-prefixed App Router routes, build-time server-loaded dictionaries and shared page templates. Keep English unprefixed. Avoid runtime translation services, DOM replacement, language-dependent cookie rendering at the same URL, and automatic language negotiation redirects.

Do not add an i18n library initially: the fixed catalog, static pages and limited formatting needs can use typed dictionaries and native Intl. Reassess if ICU plural rules, translator tooling or CMS integration becomes substantial. Any later dependency should be approved separately.

Recommended layout organization:

```text
app/
  (english)/
    layout.tsx                 # root html lang=en-US, dir=ltr
    page.tsx                   # existing /
    services/page.tsx
    services/[slug]/page.tsx
    ...existing English page routes...
  (localized)/[locale]/
    layout.tsx                 # root html lang/dir from validated locale
    page.tsx
    services/page.tsx
    services/[slug]/page.tsx
    ...matching approved public routes...
  components/                  # shared templates and UI
  i18n/                        # configuration, route registry, dictionary loader
  messages/                    # UTF-8 locale dictionaries
  sitemap.ts
  robots.ts
```

Move the existing root layout into the English group and extract shared shell/metadata helpers. Do not leave a parent `app/layout.tsx` above both roots: it cannot read a descendant locale parameter to set the initial document language correctly. Each root imports the same global styles and shared shell. Pass validated locale explicitly to server helpers and narrow client props; there is no need to depend on the newer generated root-parameter APIs.

Route groups do not alter public URLs. Cross-root language changes intentionally perform a full document navigation, which correctly updates document language, direction and font resources; same-language navigation retains normal Next navigation. This is a documented tradeoff, not an accidental regression. The implementation prototype must verify metadata routes, favicon/apple icon discovery, global/locale 404 handling, CSS-module imports after moves and route conflicts before committing to migration. Use the installed version's global-not-found guidance if required for multiple roots; do not introduce an experimental configuration without assessing and approving it.

Use explicit localized page wrappers rather than a broad catch-all that could turn typos or unsupported paths into soft 404s. Generate only approved locales and valid route IDs; reject unknown locale/slug pairs. A deployment publication manifest controls which translations may be built, linked and advertised.

## 3. Locale and URL policy

| Selector option | Content locale / HTML lang | URL prefix | Direction | Initial policy |
| --- | --- | --- | --- | --- |
| 🇺🇸 English (US) | en-US | none | ltr | Default; preserve all 20 URLs |
| 🇬🇧 English (UK) | en-US shared content initially | none | ltr | Preference alias; no duplicate pages |
| 🇩🇪 Deutsch | de | /de | ltr | Reviewed German |
| 🇪🇸 Español | es | /es | ltr | Broad Spanish; regional terms reviewed |
| 🇫🇷 Français | fr | /fr | ltr | Reviewed French |
| 🇮🇩 Bahasa Indonesia | id | /id | ltr | Reviewed Indonesian |
| 🇹🇭 ไทย | th | /th | ltr | Reviewed Thai |
| 🇯🇵 日本語 | ja | /ja | ltr | Reviewed Japanese |
| 🇸🇦 العربية | ar | /ar | rtl | Modern Standard Arabic proposed |
| 🇨🇳 中文 | zh-Hans proposed | /zh | ltr | Simplified Chinese requires approval |
| 🇵🇰 اردو | ur | /ur | rtl | Reviewed Urdu |

Flags are secondary visual cues, not claims that a language belongs exclusively to that country. Hide flag artwork from assistive technology and give each native language name its own `lang`; isolate bidirectional text. Prefer small locally stored, licensed SVG flag assets with reserved dimensions over OS-dependent emoji rendering. Emoji above documents intent only.

Keep existing service/work slugs in all languages for launch: `/services/cloud-devops` becomes `/de/services/cloud-devops`. Stable route IDs map the same content across languages; URLs are never built from translated titles. Existing non-root trailing-slash behavior remains unchanged: use `/de`, not a new sitewide trailing-slash policy.

UK English initially shares existing content and canonical URLs. Explain in the selector that it currently uses shared English content; remember the requested UK preference separately from effective content locale. The document remains `en-US` while the copy is US English. Do not create `/en-GB` or add a fictional en-GB alternate. Genuine UK pages should be reconsidered only if there are approved spelling, terminology, service, market or legal differences; regional hreflang and canonical policy must then be reviewed together.

Do not create `/en` or `/en-US` aliases at launch. Unsupported locale URLs should return genuine 404s. If prefixed legacy aliases are introduced later, redirect them directly to valid equivalents; do not translate the old About page or expose it as a separate canonical.

## 4. Selector placement and behavior

Desktop: a compact flag, short locale label and chevron adjacent to the existing header CTA, before the mobile toggle in DOM order. Keep logo, navigation, branding and CTA intact. Use the existing colors, border radius, focus styles and type scale. Measure available header width; switch to the current mobile-navigation mode earlier if necessary instead of shrinking text or hiding links.

Mobile: retain a compact language trigger next to the hamburger; display a bounded, scrollable panel anchored within the header viewport. Opening language selection closes the navigation panel and vice versa. Eleven options must remain reachable without covering the close control or escaping the viewport. Label the trigger in the current language and preserve adequate touch targets.

Use a disclosure button with `aria-expanded` and `aria-controls`, opening a labeled list of ordinary links. Do not attach menu/listbox roles without implementing their full keyboard patterns. Tab/Shift+Tab navigate links; Enter activates; Escape closes and restores trigger focus; outside activation closes; no hover-only operation. Mark current content language visually and with an appropriate current-state attribute; distinguish a remembered UK preference from document content language. The root-switch links should perform full document navigation. Render real href destinations in HTML; offer a no-JavaScript disclosure/link fallback, tested explicitly.

On selection, resolve the current route ID and navigate to its approved equivalent. Preserve only valid destination fragment IDs and safe, relevant query parameters; never append arbitrary search strings or fragments blindly. Use stable section IDs wherever practical. Do not translate mailto, tel, external links or asset paths.

If an equivalent is unavailable, display a clearly labeled link to that language's published homepage rather than pretending it is an equivalent. Before a locale's homepage is approved, show an unavailable, nonlinked option with a localized status label. All eleven options are represented in the design; only published translations become navigable. Prefer full 20-page releases per language so this fallback is exceptional.

Remember explicit preference in versioned localStorage with guarded access and an allowlist. The URL always determines rendered content; stored preference never silently redirects a visit, overrides a shared URL or changes canonical metadata. On a later visit, it may support a dismissible suggestion link. Storage failure must not affect navigation. Render the URL-derived current language consistently on server and client to avoid hydration shifts. No IP lookup or blocking browser-language redirect.

## 5. Translation model and workflow

Create a typed English source dictionary and stable identifiers for pages, services, projects, navigation, buttons, errors and form choices. Keep invariant company names, trademark spelling, URLs, emails, phone values, schema IDs and asset paths outside translated copy. Separate data IDs and form submission values from localized display labels. Existing backend-compatible option values can remain English constants while labels become translated; use the same constants for validation and submission.

Coverage includes every page body and heading; homepage rotating wording; service/solution/industry summaries; company and case studies; careers empty state and future job content; contact labels, hints, validation, timeout, loading, error and success states; captcha messages; footer; skip link; mobile menu controls; accessible link descriptions; page titles/descriptions; social image alternatives; breadcrumb names; privacy and terms. Preserve meaningful decorative empty image alternatives rather than translating them into keywords.

Inventory and extract strings before drafting translations. AI produces drafts offline during authoring, never at request time. Use a terminology glossary covering managed technology, ERP, infrastructure, DevOps, automation and operating-business claims. Qualified native-language reviewers approve business terminology, naturalness, calls to action and accuracy. Legal translations require designated legal/business-owner approval; do not publish AI-only legal text or imply that translated terms create new regional legal commitments.

Track source revision, translation revision, reviewer, approval date and per-route completeness in a manifest. Fail validation for missing keys, invalid placeholders, unsafe markup, untranslated required content or unapproved route publication. Unchanged proper names are allowed explicitly; simple equality with English is not a sufficient untranslated-content test. Keep English fallback for private previews/debugging only, never silently publish an English body under a foreign locale. Changes to shared copy invalidate affected translation approvals and require review before release.

Use structured content rather than executable translated HTML. Preserve React escaping; approved rich text should use a constrained component mapping. Load only the requested dictionary on the server. Pass the form and selector only their required translated strings, not all ten dictionaries. Avoid converting page templates to Client Components.

Contact: translate application validation consistently while respecting browser-native validation behavior, which may follow browser language. Review whether accessible custom validation is needed for deterministic localized messages. Add locale to submission context without changing endpoint, anti-abuse checks or user-entered content. Configure reCAPTCHA language with supported vendor codes, including the approved Chinese variant, after checking current vendor documentation during implementation. Root language navigation reloads the widget; avoid loading multiple competing locale scripts.

## 6. Arabic, Urdu and multilingual typography

Set `dir="rtl"` and `lang="ar"`/`lang="ur"` on initial root HTML, never only after hydration. Use explicit document-direction metadata in locale configuration. Convert directional spacing, borders, inset positions and text alignment to logical properties where equivalent; preserve English computed layout. Specific audit targets include `.brand` auto margin, skip-link placement, ecosystem and service-column borders/padding, ownership-flow arrows, location separators, mobile breakpoints, work alignment and homepage arrow transforms.

Do not globally reverse flex rows or mirror the entire page: RTL document flow already changes ordering. Mirror only directional arrows and intentional step indicators. Keep logos, maps, brand marks, technology SVGs and meaningful imagery unchanged. Isolate phone numbers, emails, URLs, acronyms and codes with `bdi` or explicit LTR spans; email/tel inputs use LTR, free-text fields can use `dir="auto"`. Preserve accessible label/input relationships and keyboard reading order.

Evaluate locally hosted, licensed WOFF2 Arabic and Urdu fonts with native reviewers; a Naskh-style candidate generally fits compact UI better than tall Nastaliq, but the choice requires approval. Keep the current English system stack. Scope font families to locale, use swap/fallback metrics and load only necessary resources; no external font domains are required by the current CSP. Verify joining, diacritics and baseline/line-box clipping. Disable Latin letter spacing and inappropriate uppercase treatment for scripts where they impair readability.

Japanese, Chinese and Thai also require appropriate fallback fonts, line breaking, punctuation and wrapping. Preserve the English animation and visual design; create grammatically complete localized rotating phrases if word-for-word replacements fail. Allow localized text to wrap naturally and respect reduced-motion preferences. Any font-driven size/line-height adjustments should be locale-scoped and reviewed, not a global redesign.

## 7. International SEO

Preserve all 20 English canonical paths, preferred HTTPS www origin and existing redirects. Every genuinely translated published page gets a self-referencing localized canonical; do not canonicalize translated German, Arabic or other content to English.

Generate page-specific absolute reciprocal hreflang sets from the publication manifest. Include each published equivalent and itself, `en-US` and optionally generic `en` pointing to the original English page, plus `x-default` pointing to that page's English equivalent. Example for a fully released services page: English `/services`, German `/de/services`, Arabic `/ar/services`; all members emit the same supported set. Never point every page's x-default to the homepage. No en-GB alternate exists until a distinct approved UK experience exists. Use `zh-Hans` if Simplified Chinese is approved; path `/zh` need not equal hreflang. Correct HTML language and direction support accessibility; actual translated content remains essential to language detection.

Extend `createPageMetadata` with locale and route ID, translated titles/descriptions, localized OG URL and appropriate OG locale codes (separate from BCP 47 language tags). Preserve brand names and image identity. Avoid double title-template suffixes. Generate breadcrumbs with translated names and localized canonical item URLs. Keep a consistent Organization identity and accurate contact/legal facts; localize descriptive/name fields only where appropriate. Add page language information where useful, without inventing local offices or ratings.

Retain one `/sitemap.xml` listing all published canonical pages; 200 URLs do not require sitemap sharding. HTML hreflang is the recommended authoritative implementation. A sitemap containing the same reciprocal language links is optional; if added through Next's `alternates.languages`, generate both representations from the same manifest and test exact parity. Do not independently maintain two alternate maps. Include truthful last-modified values only when a reliable content revision is available, not every build timestamp. Robots remains crawlable; unavailable translations are absent from sitemap, alternates and links, and return 404 rather than indexable placeholders. Protect draft previews using hosting preview access controls; a robots exclusion alone is not access control.

Verify both bot user agents and rendered HTML after an approved deployment. No automatic indexing requests or IndexNow integration belongs in this localization change.

## 8. Files likely to change

| Existing file or group | Planned work |
| --- | --- |
| `app/layout.tsx` | Split into English and localized roots; extract shared shell/defaults |
| `app/page.tsx`, `app/home.module.css` | Shared locale-aware homepage template; preserve English markup/styles and animation |
| `app/services/page.tsx`, `app/services/[slug]/page.tsx` | Move English wrappers into group; shared translated templates and valid slug generation |
| `app/work/page.tsx`, `app/work/[slug]/page.tsx` | Same for work; localized breadcrumbs and case copy |
| `app/solutions/page.tsx`, `app/industries/page.tsx`, `app/company/page.tsx` | Extract copy and share templates; move English wrappers |
| `app/careers/page.tsx`, `app/contact/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx` | Translate all content/states with review gates; move wrappers |
| `app/about/page.tsx`, `app/insights/page.tsx` | Preserve legacy redirect/intentional 404 behavior while resolving grouped route ownership |
| `app/contact/ContactForm.tsx` | Narrow message props, stable values, localized captcha/errors and bidi behavior |
| `app/data/site.ts` | Separate stable business/route facts from translated labels and copy |
| `app/components/Header.tsx`, `MobileNavigation.tsx`, `Footer.tsx` | Locale links/messages, active-route identity, selector coordination |
| `app/components/ButtonLink.tsx`, `CTASection.tsx`, `ContactBand.tsx`, `InnerHero.tsx`, `PageHero.tsx` | Localized defaults and link targets where used |
| `app/components/EngineeringModel.tsx`, `TechnologyEcosystem.tsx`, `TechnologyLogo.tsx` | Localized categories/copy/accessibility while preserving trademarks |
| `app/components/BreadcrumbStructuredData.tsx`, `app/lib/metadata.ts` | Locale-aware schema/SEO helpers |
| `app/globals.css`, `app/company/company.module.css`, `app/careers/careers.module.css` | Directional/font audit; minimum scoped corrections only |
| `app/sitemap.ts` | Published locale URL registry |
| `scripts/verify-seo.mjs`, `verify-http-seo.mjs`, `verify-visual.mjs`, `audit-production-seo.mjs` | Parameterize English-only and fixed-count expectations; add locale checks |

Proposed additions: `app/i18n/{config,routes,types,get-dictionary,publication}.ts`, `app/messages/{en-US,de,es,fr,id,th,ja,ar,zh-Hans,ur}.json`, translation review manifest/glossary, shared page templates under `app/components/pages/`, `app/components/LanguageSelector.tsx` and associated module CSS, grouped root layouts and localized route wrappers, local flag/font assets, and `scripts/verify-i18n.mjs`. Final file granularity may split page dictionaries for maintainability.

`app/robots.ts`, `next.config.ts`, package manifests and existing brand/icon assets should remain unchanged unless prototype evidence demonstrates a specific need. Verify icon discovery after layout moves. No proposed `proxy.ts`, middleware or external translation integration is necessary.

## 9. Page count and performance

The base inventory is 10 index pages (home, services, solutions, work, industries, company, careers, contact, privacy, terms), eight service details and two work details: 20.

Nine translated languages × 20 = 180 new pages. With the original English pages, full rollout yields **200 indexable canonical pages**, serving 11 selector options because US/UK initially share one content version. Distinct UK localization later would add up to 20 pages, reaching 220. Counts exclude redirects, 404s, metadata/assets and any future job-detail pages. Staged count is `20 + sum(approved translated route counts)`.

Static rendering avoids per-request translation latency. Build work increases with route count, so measure build duration and memory in the pilot. Track route-level client JS, transferred fonts, LCP, CLS and INP against the English baseline; do not promise unchanged metrics without measurements. Avoid prefetching all ten language destinations at once, loading all dictionaries into the header, or preloading every font. Reserve selector/flag dimensions and prevent preference storage from causing layout shifts.

## 10. Risks, tests and release gates

Primary risks are route-group migration/404 behavior, English regressions, partially approved translations, missing locale links, header crowding, RTL double-reversal, script font clipping, changed form values, and stale SEO expectations. The current verifier asserts exactly 20 URLs and treats root-relative links as English-only; it must retain a 20-page English invariant while validating the published multilingual set.

Required implementation QA:

1. Baseline current build, screenshots and representative performance before refactoring. Run lint, explicit TypeScript check and production build after each architectural phase.
2. Verify every published route returns 200 with server-rendered content, correct lang/dir, one title/description/canonical and no unintended noindex. Assert original 20 canonicals remain unchanged. Unknown locales, unpublished pairs and invalid slugs must be genuine 404s; legacy redirects stay permanent and avoid loops.
3. Validate complete reciprocal hreflang clusters, x-default equivalents, no unapproved/redirected alternates, correct sitemap count, canonical origin and URL normalization. Parse JSON-LD and check localized breadcrumb destinations. Preserve image alt semantics.
4. Crawl all internal links and fragments in every published locale. Confirm About/Services/Careers/Contact remain reachable, external links stay external, and language switches resolve equivalent page IDs without losing safe fragments or adding invalid ones.
5. Exercise disclosure keyboard operation, Escape/focus restoration, outside close, active language, screen-reader native names, no-JavaScript navigation, storage-disabled behavior and return to English. Verify URL takes precedence over saved preference and no automatic redirects occur.
6. Test at 1440, 1024, 768, 390 and 320 CSS pixels, landscape and zoom/reflow. Review all routes in Arabic/Urdu and high-expansion locales, plus Thai/CJK wrapping, font joining, mixed-direction contact details, arrows, animation and reduced motion. Automated overflow checks require human screenshot review.
7. Mock contact API/captcha success, timeout, invalid input, blocked script, network/server failures, expiry and duplicate-click protection. Confirm invariant payload values, honeypot and no personal data in URLs/logs. Real production inquiries require separate authorization; do not submit test leads automatically.
8. After approved release, compare raw production HTML, headers, redirects, robots/sitemap and selected mobile/browser interactions with local output; probe Googlebot/Bingbot user agents without claiming verified crawler-IP coverage. Inspect webmaster reports manually; indexing and sitelinks remain outside any guarantee.

## 11. Phases and approval decisions

| Phase | Scope and completion gate |
| --- | --- |
| 0 — Approve this plan | Resolve decisions below; no application work yet |
| 1 — Inventory and prototype | Extract English content, test multiple roots and a nonpublic LTR/RTL route in an isolated development branch; production URLs remain untouched |
| 2 — English refactor | Shared templates/dictionaries with English visual, metadata, navigation and form parity; approve reviewable diff before any release |
| 3 — Localization pilot | One approved LTR language plus Arabic or Urdu; selector, fonts, complete 20-page translations and legal review; preview only |
| 4 — Remaining languages | Review remaining dictionaries and test all routes; enable locales through manifest only after sign-off |
| 5 — Approved production release | Present exact diff, screenshots, test results, publication list and rollback target; obtain explicit permission before commit/push/deploy |
| 6 — Monitor | Check production output and crawl reports; fix regressions; no automatic indexing submission |

If staged deployment is preferred, release full 20-page locale batches and keep unavailable options clearly nonlinked until approved. Roll back using the previous known-good Vercel deployment if route, form, or SEO regressions appear; remove withdrawn translations from reciprocal alternates and sitemap together. A release that previously published localized URLs needs an explicit URL retirement/redirect plan rather than silently returning unrelated English content.

Decisions requiring approval before implementation:

- Accept unprefixed English, stable English slugs, multiple root layouts and full-page language switches.
- Accept shared US/UK content and no separate UK URLs initially.
- Confirm Simplified Chinese (`zh-Hans`) under `/zh`, Modern Standard Arabic, and broad Spanish/French terminology rather than country-specific editions.
- Approve pilot languages and staged versus all-at-once launch; assign native-language business reviewers and legal approver.
- Approve header selector placement, flag representation/licenses, Arabic/Urdu font choices and remembered-preference behavior.
- Confirm that all 20 pages, including legal documents, must be reviewed before each locale is enabled.

These are planning decisions, not permission to implement, install, commit, push or deploy. A later implementation request should explicitly define authorized scope; production deployment still requires approval.

## Sources and compatibility references

- Installed Next.js 16.3.8 guides inspected: `node_modules/next/dist/docs/01-app/02-guides/internationalization.md`, `01-app/03-api-reference/03-file-conventions/route-groups.md`, `01-app/03-api-reference/03-file-conventions/layout.md`; prior metadata/sitemap guidance also informs preserved behavior. Read relevant current installed guides again when implementing changed APIs.
- [NETSOL reference](https://netsoltech.com/): fetched page exposes the English (US) language control; detailed visual behavior was not verified.
- [Google localized-version guidance](https://developers.google.com/search/docs/specialty/international/localized-versions): reciprocal, fully qualified page equivalents and x-default; HTML and sitemap approaches are equivalent, so avoid independent duplicate implementations.
- [Google multilingual site guidance](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites): dedicated language URLs and explicit user language access inform this architecture.
