# Desktop editorial composition review

Review preview: http://localhost:3103. No commit or push was made. Baseline is approved commit `99a4f2b157bceb60b567624c6e191a758abb60a4`.

## Root cause and exact element

Home Engineering Model uses `.technology-section > .container.split-heading.editorial-intro`, with a heading wrapper and `p.editorial-copy` as grid children. It inherits `--editorial-columns: minmax(0, min(40%, 480px)) minmax(0, 1fr)` and `--editorial-gap: clamp(32px, 3vw, 48px)`.

At 1440px the parent is 1329px wide (Chrome's 15px scrollbar accounts for the viewport/content-width difference). The heading track is 480px and the supporting track is 805.81px. The paragraph is only 543.05px wide because its existing `60ch` maximum limits it. The heading text occupies about 331.59px horizontally; approximately 148.41px of unused heading track, followed by a 43.20px grid gap, creates a 191.59px text-to-paragraph separation.

Thus the excessive apparent gap comes primarily from reserved heading-track width, not paragraph margins. `margin-left` is 0; `justify-content` is `normal`; copy is left aligned. There is no `space-between` or right alignment involved. The wide parent remains appropriate for the section's other content, so shrinking/recentering the whole `.container` would damage established gutter and row alignment. Instead, the selected heading/copy track group is bounded inside it.

## Before and after rendered geometry

All measurements are CSS pixels from native viewport geometry. The paragraph retains the same font, 60ch limit and 543.05px width at these desktop widths.

| Viewport | Parent width, unchanged | Heading track before → after | Supporting track before → after | Grid gap, unchanged | Text-to-copy gap before → after |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1280 | 1185 | 474 → 400 | 672.61 → 600 | 38.40 | 199.66 → 125.66 |
| 1366 | 1271 | 480 → 400 | 750.03 → 600 | 40.98 | 189.38 → 109.38 |
| 1440 | 1329 | 480 → 400 | 805.81 → 600 | 43.20 | 191.59 → 111.59 |
| 1536 | 1425 | 480 → 400 | 898.92 → 600 | 46.08 | 194.48 → 114.48 |
| 1728 | 1440 | 480 → 400 | 912 → 600 | 48 | 196.41 → 116.41 |
| 1920 | 1440 | 480 → 400 | 912 → 600 | 48 | 196.41 → 116.41 |
| 2560 | 1440 | 480 → 400 | 912 → 600 | 48 | 196.41 → 116.41 |

At 1440px the paragraph's left edge moves from 571.19px to 491.19px. At 1920px it moves from 760.50px to 680.50px; at 2560px, 1080.50px to 1000.50px. The section left edge does not move. The maximum heading/copy track group is 400 + 48 + 600 = 1048px, rather than consuming the whole 1440px content container. Comfortable actual text separation remains; desktop is not stacked.

## Exact CSS change

Existing base rules and global tokens remain unchanged. Selected instances opt into one shared modifier, placed after the base grid definitions and before the existing responsive rules:

```css
/* Before: selected elements inherited this existing token. */
--editorial-columns: minmax(0, min(40%, 480px)) minmax(0, 1fr);

/* After: this new modifier overrides only the selected grid's tracks. */
.editorial-pair {
  grid-template-columns: minmax(0, min(40%, 400px)) minmax(0, 600px);
}
```

The existing 800px stacking selector gains `.editorial-pair`, retaining `grid-template-columns: 1fr; gap: 24px`. Existing hero stacking at 1024px remains unchanged. No breakpoint, margin, padding, font declaration, color, border or positioning rule was added or altered. Track minima remain zero so the layout can shrink naturally at tablet widths.

## Every changed instance and shared-rule scope

Nineteen visually detached instances use `.editorial-pair`:

| Page | Changed heading/copy pairs |
| --- | --- |
| Home | Services; Selected Work introduction; Solutions introduction; Engineering Model introduction |
| About | Requirements before implementation; Support across key business markets |
| Careers | Working at Dawood Technologies; Open positions |
| Company | Built from operating experience; Our approach; Remote engagement |
| Industries | Demonstrated operating experience introduction |
| Work | Page hero only |
| Privacy | Page hero only |
| Service details | Application Development; Cybersecurity; Data Services; Managed Technology; Technology Consulting page heroes |

The reusable InnerHero and PageHero components gain an optional `compact` prop, defaulting to false. The five reviewed service heroes explicitly opt in by slug; Company rows have explicit layout metadata. This selection does not depend on runtime text-length guesses, nth-child CSS or page-specific positioning fixes. All selected pages use the same two CSS track rules, while existing shared typography and gap rules remain intact.

## Similar layouts intentionally unchanged

- Home origin introduction and Home Industry introduction already have longer, well-associated headings/copy. The narrower all-intro experiment unnecessarily added a heading line to Home origin, so those pairs retain their approved composition. Industry 01–06 and its main introduction remain untouched.
- About page hero and What We Do introduction are balanced; What We Do's original rendered text gap is approximately 57px at 1440px. Narrowing it unnecessarily adds a heading line.
- Company Our Team and Industries Broader Technology Perspective already fill their heading columns appropriately (approximately 64px and 59px text gaps at 1440px). They retain their existing proportions.
- Careers, Company, Industries, Services index and Solutions index heroes retain the broader heading track needed by their established longer H1 compositions. Their screenshots were reviewed separately.
- AI & Automation, Cloud & DevOps and Enterprise & ERP heroes are already balanced and retain their original proportions. Terms also remains unchanged; its heading occupies the track well.
- Both case-study heroes and case-study content remain unchanged; their long titles already fill the heading column, with approximately 69px/62px text gaps at 1440px.
- Project metadata/headline rows, industry rows, Solutions rows, numbered service-detail content and legal body/sidebar grids serve different content relationships. Their approved layouts were not made into editorial intros.
- Contact's introduction is already stacked above its form/information grid. That grid and map composition are intentionally different; no related supporting paragraph sits in a distant second intro column. No Contact change was made.
- ContactBand, CTASection and footer actions relate to CTAs/navigation rather than the detached heading/support paragraph pattern. Their content, grid proportions and responsive behavior remain unchanged. The existing `space-between` uses do not spread the audited heading/copy pairs.

## Typography and earlier approvals

Font-size changes: NONE.

Line-height changes: NONE.

Letter-spacing changes: NONE.

Font family, weights, body typography, responsive heading scale, form-label/footer/legal/technology-label sizing and `--type-interior-hero: clamp(2rem, 1.5rem + 2vw, 3.25rem)` remain unchanged. Existing CSS typography declarations were not edited. Rendered comparison against the approved baseline passed 230,315 typography-property comparisons.

The 58px offset fix, existing mobile alignment rules, About locations alignment, solution-description widths, divider alignment, menu behavior and enlarged-text safeguards remain intact. The previously removed Home intermediate industry headings remain absent, so their former centering is no longer applicable; retained industry rows stay aligned.

All previous section spacing, vertical-rhythm/divider corrections, unified Home Industry list, simplified Work overview/actions and border-free operating process remain intact. No original typography/spacing tokens or home.module.css rules changed. There are no dependencies, negative margins, transforms, `!important` rules, new decorations or content rewrites.

## Exact website files modified

1. `app/globals.css`
2. `app/page.tsx`
3. `app/about/page.tsx`
4. `app/careers/page.tsx`
5. `app/company/page.tsx`
6. `app/industries/page.tsx`
7. `app/work/page.tsx`
8. `app/privacy/page.tsx`
9. `app/services/[slug]/page.tsx`
10. `app/components/InnerHero.tsx`
11. `app/components/PageHero.tsx`

This review document is separately untracked. All existing audit/review documents remain untracked and unchanged. Nothing is staged, committed or pushed.

## Verification and limits

Every one of the 19 changed instances was rendered and visually reviewed at 1280, 1366, 1440, 1536, 1728, 1920 and 2560px. Native viewport screenshots and measurements were used for the editorial comparisons. Balanced pairs were also visually reviewed after implementation.

Automated geometry coverage includes every requested tablet width (600, 768, 820, 834, 1024) and phone width (320, 360, 375, 390, 393, 402, 414, 430, 440), plus existing breakpoint neighbors. Narrow-screen visual reviews covered all changed instances at representative phone/tablet widths, and Home at all requested phone widths. Existing single-column stacking remains natural.

The site-wide regression pass covered 23 routes at 47 widths, totaling 1081 samples, with zero detected text overflow, clipping or normal-size navigation wrapping. Baseline comparisons passed 21,084 mobile element/intro geometry checks, 235 protected layout checks and 119 unchanged desktop intro checks. An additional stable live comparison with the modifier enabled/disabled passed 420 protected geometry/rule comparisons across 36 Home/Work/About route-width samples, confirming project/process/industry/Solutions/card/location layouts remain unchanged. Menu/fallback checks passed 69 Arial phone samples and menu resize checks on all 23 routes, including Escape/focus and short-height menu scrolling to Contact.

- Production build: PASS (`npm.cmd run build`).
- Enlarged-text/spacing and resize pass: 672 samples, zero recorded overflow issues.
- TypeScript: PASS (`npx.cmd tsc --noEmit`).
- Lint: PASS (`npm.cmd run lint`).
- Final diff whitespace check: PASS (`git diff --check`).

Testing used Windows Chrome with emulated viewport widths, not physical devices or Safari/Firefox. Native screenshots avoid the full-page capture scrollbar/reflow caveat. Legacy snapshot heights can differ with asset-loading and resize timing; protected layouts were therefore also checked in a stable live comparison. External reCAPTCHA verification is unavailable in this automated environment; no inquiry was submitted. Enlarged-text checks do not certify every desktop CTA icon stays on one line under every browser zoom mode.

Localhost remains available for visual approval. No commit. No push.

## Follow-up: Why Dawood Technologies

At the user's additional request, removed the grid/cell appearance from Home's Why Dawood Technologies section. This intentionally supersedes the earlier preservation check for that section's internal borders; the editorial measurements and other preservation checks above still describe the earlier editorial-only change.

Only `app/globals.css` was additionally changed. Removed each principle's right border, tablet first-row bottom borders, phone bottom borders and redundant last-child/second-child border exceptions. The one existing rule above the group remains. Horizontal cell padding changes from `24px` to `0` while vertical padding stays `24px`; whitespace now uses `column-gap: var(--grid-gap)`. Four desktop tracks and two tablet tracks use `minmax(0, 1fr)`; existing phone stacking remains. No row gap, content, typography, number-to-heading spacing, section padding or color changed.

Build, TypeScript, lint and diff checks passed again. Chrome captures and border/overflow assertions passed at 320, 390, 440, 600, 820, 1024, 1280, 1440, 1920 and 2560px; rendered phone, tablet and desktop screenshots were visually reviewed. All four principles remain present and every article has zero cell borders. No commit or push. The updated production preview remains at http://localhost:3103.
