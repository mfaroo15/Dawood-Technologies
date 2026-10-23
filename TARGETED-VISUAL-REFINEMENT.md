# Targeted visual refinement — review copy

Website changes are uncommitted. Nothing was pushed. Local production preview remains available at http://localhost:3103.

## Files modified

- `app/page.tsx`
- `app/work/page.tsx`
- `app/globals.css`
- `app/home.module.css`

This report is a separate untracked review document. Existing SECURITY-AUDIT.md, TYPOGRAPHY-AUDIT.md, RESPONSIVE-ALIGNMENT-AUDIT.md and COMPOSITION-AUDIT.md remain untracked and unchanged.

## Work overview

Home Selected Work and `/work` retain each project number, company, sector, headline, original description and both actions. Removed only the overview `work-capability-list` elements: Home previously displayed `item.built`; Work displayed its first three entries. The data and individual case-study pages remain unchanged, including their published-scope details.

Before: overview specification rows with internal rules; Home actions distributed across the copy column; Work used a 210px metadata column and 70px gap, while Home used the broader shared editorial columns.

After: two bounded editorial columns, with `max-width: 1120px`, `grid-template-columns: minmax(0, min(32%, 360px)) minmax(0, 1fr)` and the existing `--editorial-gap`. Existing responsive rules stack projects at 800px and below. The project top border supplies one separator between projects; the existing outer closing border remains. No internal specification rules render.

Home actions now use `justify-content: flex-start`; their individual bottom borders were removed. Both overview action groups wrap naturally with `gap: 12px 24px`. Home retains its existing 40px action minimum height. Work’s internal case-study action uses the existing ArrowRight icon; the external website action retains ArrowUpRight, matching Home and the requested action notation. Neither becomes a button.

Unused capability-list typography declarations remain untouched; removed overview markup no longer renders those rules.

## Operating sequence

All four stages and descriptions remain verbatim. Desktop keeps four columns; the existing 1024px breakpoint uses two columns; the existing 520px breakpoint stacks them.

Removed `.approach-step + .approach-step { border-left: 1px solid var(--line); }`, tablet first-two-step bottom borders, and phone per-step bottom borders. Removed the associated first-child/odd-column padding exceptions. Removed the decorative `<i>` following each number. The existing single Home progression rule remains.

Added `column-gap: var(--grid-gap)` to `.approach-process`. Step horizontal padding becomes zero rather than reserving cell gutters. Home’s `min-height: 160px` becomes `0`, so content determines height; existing Home top/tablet-bottom/phone vertical padding remains. No row gap was added on top of that padding. No cards, boxes or replacement decorative elements were introduced.

## Continuous Home Industry index

Removed both intermediate headings: “Demonstrated operating experience” and “Team experience & technology applications”. Removed the two category wrappers. The main introduction and its factual qualification remain unchanged.

One `.industry-list.home-industry-list` now renders the existing first six industry entries, in order: 01 Construction & Infrastructure, 02 International Trade & Commerce, 03 FinTech, 04 EdTech, 05 Aviation, 06 Sports. Every description is unchanged; 03–06 still explicitly describe team experience and technology applications.

The list retains the 1120px bound and existing Home row layout: 36px number column, title column capped at 360px, flexible description column, and 24px vertical row padding. At 800px and below it retains the existing 34px number column, with descriptions aligned beneath the title. Identical row rules apply to all six entries. The normal list opening border and each row’s bottom border provide one line at each transition. Removed Home category-heading border/padding overrides and the old list-top-border suppression; no category divider or category gap remains.

## Typography and preservation

No font-size values changed.

No line-height values changed.

No letter-spacing values changed.

Font family, weights, body sizing, responsive heading scale, navigation, forms, buttons, footer/legal and technology typography remain unchanged. `--type-interior-hero: clamp(2rem, 1.5rem + 2vw, 3.25rem)` remains unchanged. Comparing matching rendered text against the approved composition baseline passed 230,315 typography-property comparisons.

Previous editorial intro columns/gaps, section spacing, solution-description widths, About locations, Home/About card/divider rules and menu behavior remain intact. The intentionally removed category headings no longer require their previous centering checks; their approved global alignment rules were not changed, and the 58px offset was not restored. The retained numbered industry rows pass their mobile title/description alignment checks. 349 active prior alignment checks passed, plus the targeted unified-row checks.

## Shared CSS scope

- `.approach-process`, `.approach-step` and their existing responsive exceptions affect the Home operating sequence only.
- `.home-work-panel, .work-case-feature` affect Home Selected Work and the Work overview only.
- `.work-index-actions` affects the Work overview only.
- All module changes are scoped beneath the Home page class: process, project panels/actions and industry list/category overrides.

No other route uses the changed process/project selectors. Individual case-study grids, shared intro grids, navigation, forms, service details, About locations and industry-detail layouts were not changed.

## Verification

Rendered section screenshots were visually reviewed at 320, 360, 375, 390, 393, 402, 414, 430, 440, 600, 768, 820, 834, 1024, 1280, 1366, 1440, 1536, 1728, 1920 and 2560px. Also reviewed 519/520/521, 799/800/801, 1023/1024/1025 and 1599/1600/1601px around the existing affected breakpoints. Desktop projects remain bounded, action pairs stay together, mobile stacking is natural, process boundaries are absent, and all six industry rows share the same styling without duplicate lines or category gaps.

Targeted geometry assertions passed for Home and Work at 32 widths (64 route/width samples). Site-wide alignment/overflow checks covered 23 routes at 47 widths (1,081 samples), with no detected overflow, clipping or normal-size navigation wrapping. Additional text/resize checks completed 672 samples with zero recorded overflow issues. Arial fallback/mobile checks, menu opening order, Escape/focus, resize from 800 to 801px, short-height menu scrolling and Contact navigation passed.

Quick rendered reviews covered Home, About, Services and service detail routes, Industries, Solutions, Work, both case studies, Company, Careers, Contact and legal routes. Unaffected-route baseline geometry comparisons differed only in Contact’s asynchronously rendered external reCAPTCHA error state; no CSS changes affect that widget or form. Case-study details remain visible.

- Production build: PASS (`npm.cmd run build`).
- TypeScript: PASS (`npx.cmd tsc --noEmit`).
- Lint: PASS (`npm.cmd run lint`).
- Final diff whitespace check: PASS (`git diff --check`).

Limitations: visual/geometry checks used local Windows Chrome with emulated viewport widths, not physical devices or Safari/Firefox. Enlarged root-text and spacing checks are not a substitute for every browser’s zoom behavior. External reCAPTCHA verification failed in the automated environment; no inquiry was submitted and remote verification was not validated. Enlarged-text geometry does not certify every desktop CTA icon remains on one line.

No dependencies added. No new breakpoints, negative margins, alignment transforms or `!important` rules introduced. No colors, branding, unrelated content or unrelated design changed. Only the requested overview lists, process decoration and intermediate Home industry headings were removed.

No commit. No push. Localhost remains running for visual approval.
