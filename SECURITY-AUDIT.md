# Dawood Technologies security audit

Audit date: September 27, 2026 (America/Chicago). Baseline commit: `7678e1a`.

Scope: application source and configuration, production/development dependency lockfile, 48 tracked files, added text in 167 reachable Git commits, production browser bundles, live read-only HTTP probes, and local production-build browser/form checks. The existing untracked report from September 25 was reviewed and refreshed; its earlier POST-fallback fix is already present in this baseline and is not counted as a new fix.

No commits, pushes, deployments, account changes, live form submissions, load tests, or credential rotations were performed. All changes are local and awaiting review. No branding, approved copy, CSS, or visible UI was changed.

## Summary

- No CRITICAL or HIGH vulnerability was confirmed in this bounded review.
- Two LOW defense-in-depth findings were fixed locally: unnecessary CSP permissions and the absent Formspree honeypot.
- One MEDIUM assurance gap remains: server-side form validation and account-specific abuse controls could not be verified. This is not a demonstrated backend bypass.
- One LOW CSP limitation remains: inline scripts are allowed for the current static Next.js implementation.
- Two INFORMATIONAL observations require operational follow-up: the announced Next.js security release and local optional dependency inventory drift.
- `npm audit --json`: zero reported vulnerabilities before and after changes, across the production and development lockfile tree.
- Next.js remains **16.3.6**. **No dependency or lockfile versions changed.**
- Lint, production build, 100 browser route/width checks, and 16 isolated form/CSP assertions passed. Provider enforcement and end-to-end delivery remain unverified.

A clean advisory scan and these tests do not establish that the application or its service providers are vulnerability-free.

## Findings and disposition

| ID / severity | Finding, risk, and affected component | Change / current status | Remaining risk and manual action |
| --- | --- | --- | --- |
| SEC-01 / MEDIUM | **Backend enforcement not independently verified.** `ContactForm.tsx` submits directly to Formspree. Required fields, lengths and dropdown membership are enforced in browser code, which a direct HTTP client can bypass. Formspree account validation, request limits, notification escaping, CAPTCHA verification and spam rules are unavailable in this repository. | Open assurance gap, not a confirmed exploit. Documented backend acceptance criteria below; added the provider-recognized honeypot. No misleading client-only rate limiter or forwarding API was added. | Account owner must verify enforcement at the actual receiving service and test an isolated form. A proxy would not secure the still-public Formspree endpoint. If the provider cannot enforce the schema, migrate ingestion and retire the old endpoint as a separate controlled change. |
| SEC-02 / LOW | **CSP permitted unused capabilities.** `next.config.ts` allowed base elements, data/blob images, local media, and connections to every Formspree form rather than the configured form. Broader permission could increase impact if another injection flaw appeared; none was demonstrated. | Fixed locally: `base-uri 'none'`, `img-src 'self'`, `media-src 'none'`, and a specific Formspree endpoint in `connect-src`. | Deploy after review. CSP is browser defense-in-depth, not backend authentication or protection from direct HTTP clients. Future integrations require deliberate allowlist review. |
| SEC-03 / LOW | **Expected honeypot absent.** The current contact form had CAPTCHA but no `_gotcha` field. This omitted Formspree's optional server-side signal for unsophisticated form-filling bots. | Fixed locally: added a hidden text field named `_gotcha`, excluded from keyboard navigation and autofill, preserved in submitted `FormData`. No new success shortcut or client-only bot decision. | Bots can omit this field. CAPTCHA, validation and service-side spam/rate controls remain necessary. Provider behavior is documented, but account-specific rejection was not tested live. Deploy after review. |
| SEC-04 / LOW | **Inline script permission remains.** `script-src 'unsafe-inline'` reduces CSP protection against a future script injection. No user-controlled HTML-to-script path was found. | Intentionally retained. The current Next.js static pages use inline hydration scripts. Simply removing permission would break legitimate functionality. | Evaluate request nonces with dynamic rendering, or a separately validated build-time hash policy. Do not use a static/reused nonce. This requires cache/rendering design and regression work, not merely deleting a directive. |
| SEC-05 / INFORMATIONAL | **Upcoming framework security release.** The vendor has announced September 30 patches and has not yet published detailed affected ranges for that release. | No speculative version change. Installed 16.3.6 contains the already-published September 22 fix. | Review and apply 16.3.7 or the vendor's recommended patched release when available; assess the published advisories and rerun validation. The announcement does not prove this site's exposure to all announced issues. |
| SEC-06 / INFORMATIONAL | **Local optional dependency inventory drift.** `npm ls --all` labels `@emnapi/runtime@1.11.3` and `@img/sharp-wasm32@0.35.4` extraneous in this Windows installation. Both versions also occur in the lockfile audited by npm. | Recorded; no vulnerable version found and no dependency mutation justified. Build and lint pass. | Use a clean `npm ci` installation in CI/deployment to ensure the deployed tree follows the lockfile. This observation is not evidence of compromise. |

The previous report's missing-method disclosure finding is already fixed: the form explicitly uses POST. This audit reconfirmed no contact details enter the URL during native fallback. Without JavaScript, that local fallback returns 405 and does not deliver an inquiry; the intended delivery flow is JavaScript POST to Formspree.

## Dependency review

Both fresh `npm.cmd audit --json` runs reported: critical 0, high 0, moderate 0, low 0, informational 0. npm reported 398 dependencies, including 19 production, 341 development and 62 optional entries; categories overlap and should not be summed. The initial sandboxed registry request failed; the permitted registry request succeeded. This report uses the successful results.

Installed direct versions:

| Package | Version | Changed |
| --- | --- | --- |
| next | 16.3.6 | No |
| react / react-dom | 19.2.4 / 19.2.4 | No |
| @iconify-icons/logos | 2.0.1 | No |
| lucide-react | 1.14.0 | No |
| eslint / eslint-config-next | 9.39.4 / 16.3.5 | No |
| typescript | 5.9.3 | No |
| @types/node | 20.19.39 | No |
| @types/react / @types/react-dom | 19.2.14 / 19.2.3 | No |

All resolved lockfile artifacts use the npm registry and have integrity metadata. The lockfile marks `unrs-resolver@1.11.1` as having an install script; this is a supply-chain review item, not evidence of malicious code. No clearly obsolete direct integration was found. This review does not certify the provenance or internal correctness of every dependency.

The [September 22 Next.js advisory](https://nextjs.org/blog/nextjs-security-update-september-22-2026) identifies 16.3.6 as patched for the Node.js `next/og` ImageResponse issue. This application does not implement ImageResponse. The [September 30 announcement](https://nextjs.org/blog/upcoming-nextjs-security-release-september-2026) plans 16.3.7/15.5.27 and nine fixes, including one critical; follow up when advisories and patches are published.

## HTTP headers and directive-by-directive CSP review

Live HTTPS `/` and `/contact` returned 200 with the baseline CSP, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, and the configured restrictive Permissions-Policy. `X-Powered-By` was absent. Vercel supplied `Strict-Transport-Security: max-age=63072000`; HTTP redirected to HTTPS with 308.

HSTS was not duplicated in Next.js configuration. Local HTTP `next start` does not send HSTS; maintain it at the TLS/hosting layer if deployment changes. `includeSubDomains` and preload were not enabled without verifying every subdomain's HTTPS readiness. No broadening of existing policies was introduced.

| Directive | Decision and justification |
| --- | --- |
| `default-src` | Retain `'self'` as restrictive fallback. |
| `script-src` | Retain self, inline permission needed by the current build, and the two documented Google reCAPTCHA script paths. No `unsafe-eval`, wildcard host or generic HTTPS scheme. See SEC-04. |
| `script-src-attr` | Retain `'none'`; deliberate inline-event probe was blocked. |
| `style-src` | Retain `'self'` for generated local stylesheets; no remote CSS allowance. |
| `style-src-attr` | Retain `'unsafe-inline'` for existing React style attributes, SVG/logo sizing, framework images and widget behavior. This is narrower than allowing arbitrary inline style elements. |
| `img-src` | Remove unused `data:` and `blob:`; all first-party images use local files or Next image URLs. Browser checks passed. |
| `font-src` | Retain `'self'`; site uses system fonts and no remote font integration. |
| `connect-src` | Retain self for Next navigation; restrict Formspree to the configured submission path; retain Google's documented reCAPTCHA connection path. Other Formspree endpoint probe was blocked before networking. |
| `frame-src` | Retain Google's two documented reCAPTCHA frame paths. |
| `frame-ancestors` | Retain `'none'`, aligned with X-Frame-Options DENY. |
| `object-src` | Retain `'none'`; no plugins or embedded objects needed. |
| `base-uri` | Tighten from self to `'none'`; no base element is required. Injected base URL was blocked. |
| `form-action` | Retain `'self'` for native fallback. This directive does not govern the JavaScript fetch to Formspree. |
| `media-src` | Tighten to `'none'`; no audio/video feature exists. |
| `worker-src` | Retain `'none'`; no worker/service-worker integration. |
| `manifest-src` | Retain `'self'`; no third-party manifest permission. |
| `upgrade-insecure-requests` | Retain. No insecure active content URL found in application code. |

Google's script/frame/connect allowlists match its [CSP guidance](https://developers.google.com/recaptcha/docs/faq). They remain consistent across routes because client-side navigation to Contact inherits the original document's CSP. Tightening them only on non-contact responses could break navigation into Contact.

The installed Next.js CSP guide was read before edits. It explains that per-request nonces require dynamic rendering and affect static/CDN caching; no framework-wide rendering migration was made.

## Contact form and trust boundaries

There are no application-owned API route handlers, Server Actions, middleware/proxy, database operations, mail transports, file-upload handlers, shell execution, or server-side outgoing fetches. The submission recipient is Formspree, not this Next.js server. Framework/RSC and image optimization surfaces still require timely dependency patches.

The browser currently checks required fields, email format, dropdown membership, name 100 characters, email 254, phone 30, company 150, and description 20-3000. It checks CAPTCHA presence, resets tokens on attempts, prevents simultaneous submissions, and aborts after 15 seconds. These are usability controls, not proof of server enforcement. `_subject` is fixed in the rendered form but can still be altered by a direct client. No unsafe user-derived URL, redirect, file path, query, command, or local email header is constructed.

The added `_gotcha` field uses [Formspree's documented server-side honeypot](https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering). Formspree also documents a [20-posts-per-minute form limit](https://help.formspree.io/articles/form-and-project-settings/system-limits). No load test was performed, and published limits do not establish this account's protection against distributed spam or quota exhaustion. A process-local limiter on Next.js would not protect this browser-to-provider flow.

No authenticated session or privileged cookie-based action exists, so there is no application CSRF-token requirement identified. CORS is not a spam control. Live public HTML permits `Access-Control-Allow-Origin: *` without credential permission; no private response content was found, so this was not classified as a data exposure.

Production-mode local POST, PUT, DELETE and OPTIONS to `/contact` returned 405. TRACE was rejected by the test client's Fetch API and is **not** counted as a server test. A non-allowlisted remote URL to `/_next/image` returned 400. Fixed redirects remained local even with an attacker-style `next` query parameter. A script-like contact query did not render executable script markup.

Backend acceptance criteria requiring the account owner or an isolated staging receiver:

1. Confirm CAPTCHA is enabled and the custom server secret matches the public site key. Verify production hostname restrictions. Keep the secret only in the provider/server configuration. Follow [Formspree's custom CAPTCHA setup](https://help.formspree.io/articles/form-and-project-settings/adding-a-custom-recaptcha-v2-key/).
2. Verify missing, invalid, expired and replayed tokens are rejected before notifications/storage. [Google verification](https://developers.google.com/recaptcha/docs/verify) requires server validation; browser presence checks are insufficient.
3. Enforce required fields, field lengths, valid email and dropdown values, reasonable total request size, and permitted methods/content types at ingestion. Reject duplicate/unexpected fields and unneeded attachments. Verify that client overrides cannot change notification recipients or other privileged configuration.
4. Reject CR/LF in values used as mail headers, and escape untrusted values in HTML notifications and dashboards. Do not assume stripping HTML in this browser prevents direct submission attacks.
5. Confirm honeypot, spam filtering, quotas and rate limits, and monitor rejected traffic. Test rate behavior only using an approved isolated environment/provider procedure.

No real contact inquiry, malformed production submission, or notification was sent. Consequently server-side schema enforcement, body limits, email/header injection resistance, stored-XSS handling, CAPTCHA rejection and actual email delivery remain unverified. Browser mocks explicitly do not close SEC-01.

## Secrets, bundles and Git hygiene

A redacted-output pattern scan of current tracked text and added text across 167 reachable commits found no private keys, recognized provider tokens, credential-bearing URLs, JWT credentials or suspicious secret assignments. The same checks found no credential candidates in 12 generated browser JavaScript files. This is bounded pattern matching, not proof against obfuscated secrets, unreachable history, external repositories or hosting variables.

The reCAPTCHA site key and Formspree form identifier are intentionally public, not server secrets. Application environment access is limited to the development-only `NODE_ENV` logging guard. No `NEXT_PUBLIC_*` variables, server credential imports into client components, or build-time environment injection via `next.config.ts` were found. Production form errors remain generic; upstream payloads and submitted field values are not displayed or logged to visitors.

`.env*`, `.vercel`, `.next`, `node_modules` and `*.pem` are ignored. Ignore behavior was verified, and no tracked credential paths were found. Root `.env`, `.env.local`, `.env.production` and `.npmrc` were absent. The ignore file is not an exhaustive secret manager: arbitrary `.key`, `.p12` or credential-bearing `.npmrc` files need explicit exclusion before anyone adds them. No such tracked files were found; no credential rotation was indicated by this review.

No browser source maps were present in `.next/static`. Server build files must remain outside public assets. The npm registry integrity check and a clean advisory audit do not establish supply-chain trust by themselves.

## XSS, authorization, route and error review

- Two raw HTML sites were reviewed: homepage JSON-LD serializes fixed data and escapes `<`; TechnologyLogo renders fixed imported Iconify SVG bodies. Neither receives user-supplied HTML. Imported SVG remains a dependency trust boundary. Public SVGs contain local shapes/references, with no script/event/foreignObject content found.
- Ordinary content uses React escaping. No application `innerHTML`, `eval`, dynamic Function constructor, `javascript:` URL, query-derived redirect or unsafe user-controlled URL sink was found.
- The only runtime slugs are looked up against static service/work data; unknown entries return not-found. No admin dashboard, login, authenticated endpoint, preview API or debug route exists in the source. Authentication was not added to public marketing pages.
- Every source occurrence of `target="_blank"` uses `rel="noopener noreferrer"`; destinations come from fixed HTTPS project data. Links to project websites are navigation, not automatically loaded third-party integrations.
- Robots and sitemap expose only intended public routes. Robots is not used as access control. No rewrites or user-controlled redirect destinations are configured. Public static caching is appropriate because no personalized server response was found.
- Live and local production probes returned 404 for `.env`, `.env.local`, `.env.production`, `.git/config`, `next.config.ts`, `package.json`, `SECURITY-AUDIT.md`, `AGENTS.md`, `desktop.ini`, `backup.zip`, `database.sqlite`, `debug.log`, `/admin`, `/debug`, `/api/contact`, a nonexistent chunk map, and unknown service/work slugs.
- Sampled successful/error responses exposed no stack traces, internal user-directory paths or credential patterns. This covers the observed 400/404/405 responses, not every possible production failure. No artificial crashing route was added.
- No first-party cookies, authentication sessions, analytics SDK, marketing pixel or browser storage tracking was identified. Third-party reCAPTCHA behavior is separate; absence of Set-Cookie in sampled HTML does not establish that third parties set no cookies.

## Third-party inventory

| Service/domain | Why it is present | Scope and decision |
| --- | --- | --- |
| `formspree.io` | Receives contact inquiries and handles downstream delivery. | Connection permission narrowed to the existing form path. Account enforcement remains SEC-01. |
| `www.google.com/recaptcha/` | CAPTCHA loader, frames and verification-related browser traffic. | Required; retained documented path permissions. Real loader/anchor requests returned 200 locally. |
| `www.gstatic.com/recaptcha/` | CAPTCHA JavaScript release assets. | Required script path; real release asset returned 200. |
| `recaptcha.google.com/recaptcha/` | Google-documented CAPTCHA frame origin. | Retained for supported challenge behavior even though not seen in every smoke-test run. |
| Vercel | Serves the first-party deployment and supplies TLS/HSTS. | Hosting/account configuration was not available. No Vercel browser analytics integration found. |
| Dawood RCC Pipe / Dawood Traders websites | Explicit external project links. | Not automatically loaded resources; safe new-tab attributes retained. |

System fonts and bundled icon assets do not fetch remote font/icon services. `schema.org` and SVG namespace identifiers are not fetched integrations. Nested Google frames can load Google-controlled resources under their own policies; the first-party resource inventory is not a complete audit of Google's internals. No clearly unused third-party integration was removed.

## Validation and before/after evidence

| Check | Result |
| --- | --- |
| `npm.cmd audit --json`, baseline and final | Passed; zero reported vulnerabilities in both runs. |
| `npm.cmd run lint` | Passed. |
| `npm.cmd run build` | Passed; TypeScript completed; 27 generated build entries including all published routes. |
| Existing test suite | No test script or existing automated test suite is configured. Audit-specific checks below were run instead; no claim that a nonexistent suite passed. |
| Production-build browser pass | Headless Edge: 20 published pages at 320, 390, 768, 1024 and 1440px, before and after changes (100 samples each). No horizontal overflow. |
| Content/layout comparison | Visible text and footer industry lists unchanged in all 100 comparisons. Main-section and form geometry unchanged. Two first-load mobile footer measurements differed by 1px; no CSS/layout code changed and no clipping or material regression was observed. |
| Browser console and CSP | No console errors or normal-use CSP violations in either route pass. |
| Actual reCAPTCHA resources | Google loader, gstatic release script and Google anchor frames returned 200 before/after; full human challenge and provider acceptance not completed. |
| Isolated form/CSP checks | 16 assertions passed, using intercepted provider responses and a mocked CAPTCHA API; zero live submissions. |
| Form checks | Missing/expired CAPTCHA, oversized field, unknown service, successful POST/reset, hidden honeypot, preservation of a filled honeypot, generic 400/429/500 errors, duplicate suppression, 15-second timeout, and native POST fallback. |
| Deliberate CSP checks | Unauthorized Formspree endpoint, injected base URL and inline event handler were blocked. Their three intentional security violations are separate from the clean normal-use run. |
| Live HTTP | HTTPS/header checks, HTTP 308, and 18 negative resource/route probes passed. Live site still serves baseline policy until the local changes are deployed. |
| Secrets/bundles | No credential candidates in bounded scans; no generated browser source maps. |

Temporary audit harnesses and synthetic results were kept outside the repository after use. No new dependencies were installed for browser testing. Local tests do not establish production provider/account behavior, future patch safety, resistance to volumetric attacks, or exhaustive TLS/deployment security.

## Files changed and remaining actions

Files changed in this audit:

- `app/contact/ContactForm.tsx`: added the hidden provider-recognized honeypot.
- `next.config.ts`: narrowed four CSP directives.
- `SECURITY-AUDIT.md`: updated this report and replaced stale prior-run conclusions with current evidence.

No dependency changes. No source content, styling, authentication, route structure, branding or service recipient changes.

Before closing the remaining risk, the account owner should verify the Formspree/Google acceptance criteria above, review the September 30 Next.js release, and review the nonce/hash CSP tradeoff if stronger injection containment is required. Use locked clean installs and ongoing advisory monitoring. After review and deployment, recheck the live CSP and run an explicitly authorized staging/production delivery test. This audit did not commit, push or deploy anything.
