# Typography and responsive audit

Audit completed October 1, 2026. Changes are uncommitted for review.

## Existing system and what was preserved

Typography is centralized in `app/globals.css`, with intentional homepage overrides in `app/home.module.css`. The Careers module only controls spacing and borders. There are no other application stylesheets or inline font overrides.

The existing system is coherent by role, rather than a strict mathematical scale:

| Role | Existing treatment at the default 16px root size |
| --- | --- |
| Font family | Segoe UI Variable, Segoe UI, Arial, sans-serif |
| Homepage display | 28–72px across supported widths, weight 500, line-height 1.08, tracking −.035em |
| Interior H1 | Usually 42–52px; 32–36px override at widths up to 360px |
| Standard H2 | 30–38px; intentional homepage and case-study variations |
| Standard H3 | 20–26px; compact service row headings use 16px / 1.35 |
| Technology H4 | 10.4px uppercase category labels |
| Supporting copy | Generally 16.8–17.28px; homepage introduction uses line-height 1.75 |
| Body copy | 16px / 1.6, with smaller summaries in dense sections |
| Small body / metadata | Approximately 12.5–15.2px, depending on role |
| Navigation | 13.44px desktop; 12.16px compact desktop; 16px mobile |
| Buttons / text links | Approximately 13.1–14.4px, typically weight 700 |
| Eyebrows / section numbers | Generally 10.9–11.52px with restrained tracking |
| Form labels / fields | 12.16px labels; 16px fields inheriting the body font |
| Footer | 13.12px links; 14.08px description; 11.52px legal/copyright row |

Preserved: the font stack, all font weights, colors, logo, content, navigation order, button appearance, paragraph line-height, established heading hierarchy, negative homepage tracking, uppercase-label tracking, and capped desktop heading sizes. The 1440px content limit and approximately 60–68ch editorial measures already prevent uncontrolled ultrawide growth. No new font or dependency was needed.

## Problems found and addressed

1. **Homepage heading shrank as the screen grew:** 32px at 520px became 26.05px at 521px. Raised the existing non-mobile clamp minimum to 32px; retained the existing small-phone rule.
2. **Interior H1 breakpoint jump:** the previous 360px-specific rule produced 36px at 360px, followed by 42px at 361px. Replaced this stepped behavior with one shared fluid value. The Contact H1 now follows the same interior-heading role.
3. **Tablet hero columns were too narrow:** at 820px, Company used four heading lines; Services and the RCC case study used five, including short single-word lines. Reusing the existing stacked hero arrangement through 1024px brings each to two lines at 820px, without shrinking headings excessively.
4. **About values had cramped text just above 520px:** three columns left insufficient space for words such as “recommendations.” Use two columns from 521–800px, retaining the existing single-column phone and wider-screen arrangements. Divider placement follows the new column count.
5. **Body and field text did not follow a larger default text size:** the fixed 16px body declaration left body and form fields unchanged when the root text size doubled. `1rem` preserves the default appearance and allows both to scale.
6. **Long words could exceed their text columns when enlarged:** this affected headings, service rows, case-study content, and legal content. An inherited emergency-wrap rule allows long tokens to wrap when necessary. Normal word boundaries remain preferred. Form columns and controls can now shrink within the available width instead of imposing an intrinsic minimum.
7. **Some reading labels were unnecessarily small:** technology category text was 10.4px; the platform disclosure and footer legal links were 11.52px. Increased those roles selectively. Form labels are now 14px for clearer identification.
8. **Compact technology labels had tight leading:** technology descriptions used 1.2 and service technology headings inherited 1.08. Both now use 1.4 to accommodate wrapping.
9. **Expanded mobile navigation exceeded a zoom-equivalent viewport:** at 640×450 CSS pixels, the menu extended to about 494px. Its available height is now bounded by the viewport minus the unchanged header height, with internal vertical scrolling when necessary.

## Every font-size change

Pixel equivalents below assume the usual 16px root font size.

| Selector / role | Before → after |
| --- | --- |
| `body` | `16px` → `1rem` (16px at default settings) |
| `.home .approach-intro h1`, outside its existing ≤520px override | `clamp(1.625rem, 5vw, 4.5rem)` → `clamp(2rem, 5vw, 4.5rem)` |
| `.inner-hero h1`, `.case-hero h1`, `.page-hero h1` | `clamp(2.625rem, 4vw, 3.25rem)` plus the ≤360px override → `var(--type-interior-hero)` |
| `.contact-intro h1` | `clamp(2.625rem, 4vw, 3.25rem)` → `var(--type-interior-hero)` |
| `.technology-ecosystem-groups h4` | `.65rem` → `.75rem` (10.4 → 12px) |
| `.technology-logo small` | `.65rem` → `.75rem` (10.4 → 12px) |
| `.service-technology h3` | `.72rem` → `.75rem` (11.52 → 12px) |
| `.platform-disclosure` | `.72rem` → `.8125rem` (11.52 → 13px) |
| `.contact-form label span` | `.76rem` → `.875rem` (12.16 → 14px) |
| `.footer-bottom` | `.72rem` → `.8125rem` (11.52 → 13px) |

There are no other explicit font-size changes. Text that inherits the body font, including form fields, now follows the user's root text size; its default size remains unchanged.

The removed ≤360px interior-heading rule was `clamp(2rem, 10vw, 2.25rem)`.

## Line-height, tracking, and fluid values

| Property / selector | Before → after |
| --- | --- |
| Line-height: `.technology-logo small` | `1.2` → `1.4` |
| Line-height: `.service-technology h3` | inherited `1.08` → explicit `1.4` |
| Letter-spacing | No changes |
| Font weight, font family, text-transform | No changes |

New shared fluid rule: `--type-interior-hero: clamp(2rem, 1.5rem + 2vw, 3.25rem)`.

- Minimum: `2rem` (32px by default).
- Preferred: `1.5rem + 2vw` (24px plus 2% of viewport width by default).
- Maximum: `3.25rem` (52px by default).
- Examples: 32px at 320–390px, 40.4px at 820px, 49.6px at 1280px, 52px at 1440px and above.

The homepage clamp is an adjustment to an existing rule: minimum `2rem`, preferred `5vw`, maximum `4.5rem`. Its existing ≤520px clamp, `clamp(1.75rem, 7.7vw, 2rem)`, remains intact. No other new clamps were introduced.

## Responsive and layout effects

- **All widths:** selected compact-text improvements, relative body sizing, emergency wrapping, and form intrinsic-width safeguards.
- **≤360px:** obsolete interior H1 override removed; headings use the shared fluid rule.
- **521–639px:** homepage heading minimum prevents the previous downward jump. Above 640px, its existing 5vw behavior takes over.
- **521–800px:** About values use two columns instead of three.
- **801–1024px:** interior hero columns stack earlier to improve heading measure. Below this range they already stacked; wide desktop layouts remain unchanged.
- **Mobile menu:** uses the existing 76px header height, or 68px at ≤520px, through a shared height variable. Scrolling is only needed when the open menu exceeds the available viewport height.
- **1920–2560px:** heading maximums and container widths remain capped; no new growth or layout expansion.

## Intentionally different typography

The homepage display remains larger and more tightly tracked than interior H1s. Service-list headings stay smaller than editorial section headings. Eyebrows, numeric markers, short metadata labels, and footer navigation retain their quieter role. Legal body copy remains at the body scale. These differences communicate hierarchy and density; they were not mechanically standardized.

Long case-study headings and the homepage's existing three-part heading composition can still take several lines on narrow phones. They were not made artificially small, rewritten, or forced into two lines with added line breaks.

## Scope and verification

Reviewed Home, About, Company, Careers, Contact, Industries, Services, all eight service detail pages, Solutions, Work, both case studies, Privacy, Terms, and existing missing-page responses including Insights. Shared navigation, expanded mobile menus, footer, form controls, buttons, labels, technology components, and rows were included. Redirect aliases reuse the same destination pages; asset and XML routes do not have typography to audit.

The full browser pass covered 24 rendered URLs at 24 widths: **320, 359, 360, 361, 375, 390, 430, 520, 521, 640, 768, 799, 800, 801, 820, 1024, 1025, 1280, 1366, 1440, 1536, 1728, 1920, 2560px**.

- 576 normal route/viewport samples.
- 48 samples with root text enlarged to 200%, at 390px and 1280px.
- 48 samples with increased line, letter, word, and paragraph spacing at those widths.
- **672 samples total:** no detected text extending outside the viewport or its own text box after the changes; no unintended desktop navigation line wrapping in the measured scenarios.
- Representative before/after screenshots were reviewed at phone, tablet, desktop, and ultrawide widths. Company, Services, and RCC case-study tablet heroes now occupy two lines at 820px.
- Expanded mobile navigation checked at 320px, 390px, and 768px. The additional short-viewport check uses 640×450 CSS pixels, equivalent to the layout viewport of a 1280×900 window at 200% zoom.
- After the menu fix, its bottom is exactly 450px in that short viewport; scrolling reaches Let’s Talk, and activating it opens Contact and closes the menu.
- Final production build (`npm.cmd run build`), standalone TypeScript check (`tsc --noEmit`), ESLint (`npm.cmd run lint`), and `git diff --check` all passed.

This is a Chromium typography and reflow review, not a claim of complete WCAG certification or native-device testing in every browser. Root-size enlargement and zoom-equivalent viewport testing complement each other; they are not identical to operating every browser's zoom UI. Third-party CAPTCHA contents were not restyled or submitted.

The enlargement and spacing checks follow the intent of [W3C Resize Text guidance](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) and [W3C Text Spacing guidance](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html).

## Files and delivery

- `app/globals.css`: shared heading token, selective label improvements, relative body sizing, wrapping/form safeguards, tablet hero and About text-column adjustments, and scrollable mobile navigation for short viewports.
- `app/home.module.css`: raised the existing homepage display clamp minimum only.
- `TYPOGRAPHY-AUDIT.md`: this report.

No page/component content, SEO metadata, colors, logo, navigation items, or dependencies changed. The layout adjustments listed above are limited to typography/reflow issues. `SECURITY-AUDIT.md` remains unrelated and untouched. Temporary browser scripts, measurements, and screenshots are under ignored `node_modules/.cache/typography/`.

Nothing has been committed or pushed.
