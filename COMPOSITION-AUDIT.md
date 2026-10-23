# Layout and composition review

Status: implemented locally for visual review. No commit or push. Baseline: approved commit `58d663141a006474bc9518ddff3e32f0b601b310`.

The structural follow-up at the end of this report supersedes the original Industry spacing/divider treatment and the original Selected Work/Solutions outgoing spacing described below.

## 1. Home section spacing

Problem: adjacent sections contributed excessive blank space between their content, especially around Selected Work. Source inspection found no empty spacer, viewport-height section, or absolutely positioned empty container responsible for this space. The root cause was additive top/bottom section padding. The operating approach's 160px minimum height is a separate, deliberate four-column structure, and was retained.

Before: Home section padding `clamp(64px, 6vw, 96px)`; Selected Work separately used `clamp(72px, 7vw, 112px)`. At 1440px, their adjacent padding added up to 187.2px; from 1600px upward, it reached 208px.

After: Home section padding `clamp(56px, 5vw, 72px)`; Selected Work now uses the same `var(--home-section-space)`. Adjacent padding is 144px at the requested large desktop widths, and 112px on phones. Borders, copy, colors, hero padding, typography, internal operating-model spacing, and CTA padding were preserved. Home Solutions retains its existing zero top padding.

Why: removes the conflicting section rhythm at its source, while keeping visible breathing room. Applies across Home's regular sections and Selected Work at all widths. Home Principles and Closing CTA retain their explicit 64px padding.

## 2. Shared section spacing across interior pages

Problem/root cause: the same additive section-padding pattern existed throughout interior pages. Regular desktop sections used 80px per side, while the tablet rule independently used 78px. Adjacent regular sections could therefore contribute 160px or 156px before content margins.

Exact change: `--space-section: 80px -> 64px`; the <=800px `.section` rule changes from `padding: 78px 0` to `padding: var(--space-section) 0`. The existing <=520px 64px rule remains unchanged.

After: regular sections use 64px per side, so their combined padding is 128px. Interior phone section padding is unchanged. Home's module overrides this shared value as described above.

Affected instances: About's company description, process and locations; Company story section; Careers working principles, working description and positions; Services overview; all eight service-detail scope, technology and relevant-industry sections; Industries operating/team experience; Solutions listing; Work listing and the case-study content wrapper; Contact's outer section; Privacy and Terms outer content sections. Their content-specific row spacing remains independent.

Why: a coherent shared adjustment avoids dozens of page-specific overrides and removes unexplained differences between tablet and desktop spacing. Applies above 520px, except where existing explicit page rules take precedence.

## 3. Detached supporting copy: shared editorial architecture

Problem/root cause: `5fr 6fr` columns let the heading track grow with the outer container even after the heading text reached its own maximum width. A gap growing to 112px added further separation. Narrowing only the paragraph could not fix its starting position.

Exact changes:

```css
/* before */
--editorial-gap: clamp(64px, 7vw, 112px);
--editorial-columns: minmax(0, 5fr) minmax(0, 6fr);
/* after */
--editorial-gap: clamp(32px, 3vw, 48px);
--editorial-columns: minmax(0, min(40%, 480px)) minmax(0, 1fr);
```

The first track now has a proportional limit on tablets and a 480px cap on desktops. Supporting text retains its approved 60ch measure. The outer 1440px container and page gutters are unchanged. Existing <=1024px 48px gap and <=800px single-column/24px gap overrides remain.

Measured Home Services at 1440px: heading track 558.27px -> 480px; column gap 100.8px -> 43.2px; supporting-copy left edge 707.06px -> 571.19px. At 2560px: heading track 603.63px -> 480px; gap 112px -> 48px; copy left edge 1268.13px -> 1080.5px. These measurements use the desktop document's content viewport with its classic scrollbar.

Why: heading and copy form one bounded composition, instead of spreading apart as the screen grows. Desktop columns remain; the existing mobile stack remains. Narrower tracks can change heading line breaks without changing heading typography.

Every active instance found:

- Home: operating-story intro, Services intro, Selected Work intro, both work panels, Industry intro, Solutions intro and Engineering Model intro.
- About: page hero, What We Do, How the Company Works and Markets/Locations intros.
- Company: page hero and all four company-story rows.
- Careers: page hero, working-description intro and positions intro.
- Services: page hero; all eight service-detail heroes. Their numbered Scope/Technology/Relevant Industries sections consume the shared gap, while retaining their separate marker/body column proportions.
- Industries: page hero and both operating/team category introductions.
- Solutions and Work: page heroes.
- Both case studies: case hero title and supporting copy/link.
- Privacy and Terms: page heroes.

`.editorial-intro`, `.split-heading`, `.section-top`, `.inner-hero-grid`, `.case-hero-text`, `.industry-detail-heading`, `.story-grid`, `.company-story-row` and `.page-hero-inner` use these shared tokens. Legacy `.industry-editorial` and `.solutions-editorial` selectors also consume the gap, but no current page markup uses those layouts; they received no separate override.

## 4. Home industry hierarchy and row composition

Problem/root cause: Home industry groups filled the full outer container; the fractional industry-title track grew with it, pushing descriptions away. Rows had a fixed 112px minimum even when short. Category labels floated above a list border with an 18px bottom margin rather than having their own group-header treatment. This list selector is shared with Careers, so Home refinements are scoped in its existing CSS module.

Exact new Home rules:

```css
.home :global(.industry-group) { max-width: 1120px; }
.home :global(.industry-group-heading) {
  padding-block: 16px;
  margin-bottom: 0;
  border-top: 2px solid var(--line);
}
.home :global(.industry-list) { border-top: 0; }
.home :global(.industry-list article) {
  min-height: 0;
  grid-template-columns: 36px minmax(0, min(36%, 360px)) minmax(0, 1fr);
  padding-block: 24px;
}
/* within the existing <=800px query */
.home :global(.industry-list article) {
  grid-template-columns: 34px minmax(0, 1fr);
}
```

Before -> after at 1440px: row region 1329px -> 1120px; title left edge remains 106px; description left edge 642.28px -> 488px. Fixed 112px rows become content-driven: typical two-line-description rows measure 100.19px, International Trade 101.88px, and the longer Aviation description 125.78px. The latter is intentionally taller to preserve the readable description measure.

Why: category headers now visibly start their groups; numbered titles and descriptions stay close; dividers follow the bounded content region. No cards, new colors, or type changes. The desktop category indentation still matches industry-title alignment. Both mobile category labels retain zero left margin and centered text. Descriptions continue below titles in column two. Applies to Home only, all widths; the bounded width becomes active when available space exceeds 1120px, and the row-column change yields to the existing 800px stack boundary.

## 5. All eight service-detail scope lists

Problem/root cause: single short service labels were vertically centered in 100px minimum-height cells. This became particularly wasteful when the existing phone breakpoint stacked the list into one column.

Exact change: remove `min-height: 100px` from `.service-editorial-grid article`. Keep grid alignment, 22px vertical padding, typography, borders, and existing two-column/one-column behavior.

Before -> after: a single-line Cloud & DevOps scope cell at 1440px measures 100px -> 66.59px. Longer labels grow naturally. All eight detail routes benefit: technology-consulting, ai-automation, cloud-devops, application-development, enterprise-erp, data-services, cybersecurity and managed-technology.

Why: row spacing now follows actual content rather than a large arbitrary minimum. Applies at all widths, including the <=574px single-column layout.

## Other reviewed patterns deliberately retained

- Careers numbered principles share `.industry-list`, but remain unchanged: their title/explanation structure is distinct from Home's operating/team grouping, and their short rows establish a regular principles index. Home-specific overrides prevent spillover.
- Industries and Solutions detail rows keep their 42px numbering, title/description blocks and application lists. Their columns express different information roles and have explicit smaller-screen stacks. Their hero/category intros benefit from the shared grid; their row rules were not redesigned.
- Services overview keeps its service/technology-context columns and 48px row padding. Rows contain substantial lists and platform marks, rather than one-line labels. Existing typography/technology label sizing stays protected.
- Home capability rows retain their title/body arrangement and far-edge link arrows: the arrow is an interaction affordance, while the supporting text is already grouped beneath its title. No new hover transforms were added; existing approved hover behavior remains.
- Home operating approach retains equal-height desktop steps and its existing tablet/phone layout. Home principle cards retain their already compact module rules and approved dividers.
- Company story rows retain 48px row padding (existing 40px phone rule), because narrative paragraphs determine row height and dividers mark distinct topics. Their shared heading/copy grid is corrected.
- Work index rows retain business identification beside each project. Case-study bodies retain the sticky metadata rail, 800px reading measure, 52px section spacing and note treatment. These are navigable long-form structures, not empty section spacers. Case heroes benefit from the shared grid.
- Contact retains its form/contact-information grid, fields, control sizes, label sizes, map and reCAPTCHA space. Its outer section padding follows the shared correction; field spacing was not changed. Browser screenshots show the existing reCAPTCHA verification failure in this automated environment; form submission was not performed.
- Header navigation, mobile panel, footer link groups, footer/legal sizing and CTA bands remain unchanged. Their broader horizontal distribution serves navigation/action roles, rather than attaching paragraph copy to a heading.
- Privacy and Terms retain their legal-reading layout, metadata rail and paragraph spacing. Their hero relationship and outer section padding receive the shared corrections.
- `/insights` explicitly calls `notFound()` in its current source. Its existing centered 404 composition, and a separate unknown-route 404, were reviewed without changing content or framework behavior.

## Preservation and validation

Typography changes: **none**. No font family, font-size, font-weight, letter-spacing or line-height declaration changed, including Industry category/name/description values. `--type-interior-hero: clamp(2rem, 1.5rem + 2vw, 3.25rem)`, Home heading scales, form labels, footer/legal sizes and technology labels remain intact. A rendered baseline comparison passed **231,260 typography-property comparisons** across 23 routes and 47 widths.

Previous alignment fixes remain: mobile category zero offsets/centering; solution description columns; About location geometry; Home/About card dividers; desktop hiding of an expanded mobile menu after resize. **395 targeted alignment comparisons/assertions passed**. Touch/menu tests passed on all 23 routes, including expansion at 800px followed by resize to 801px, Escape/focus behavior and a short landscape menu.

Production build: PASS (`npm.cmd run build`, exit 0). TypeScript: PASS (`node node_modules/typescript/bin/tsc --noEmit`, exit 0). Lint: PASS (`npm.cmd run lint`, exit 0). Git whitespace check: PASS. Only two website files have tracked modifications: `app/globals.css` and `app/home.module.css`.

Responsive geometry and text-clipping review: **23 routes x 47 widths = 1,081 samples**, no reported text overflow, ancestor clipping, navigation overlap or text navigation wrapping. Includes all requested phones 320, 360, 375, 390, 393, 402, 414, 430, 440; tablets 600, 768, 820, 834, 1024; large desktops 1440, 1536, 1728, 1920, 2560; and additional breakpoint neighbors. **69 Arial fallback/touch samples** at 320/390/440 passed.

Additional text QA: **672 route/width/mode samples**, including 200% root text and accessibility text-spacing overrides at 390/1280; no text overflow/clipping findings. The legacy audit's whole-link rectangle heuristic flags the existing header CTA at enlarged-text/spacing 1280px because it includes icon rectangles; that flag is also present in the approved baseline. Normal-size text-only navigation checks pass. The enlarged-text test emulates root text enlargement, not browser zoom.

Actual screenshots reviewed: every major route and each service-detail/case-study route in desktop and phone review sheets, plus detailed Home industry screenshots. Full-page captures are available at 390, 440, 820, 1440 and 2560; additional captures at 1536, 1728 and 1920 support large-screen review, with Home reviewed at each of these widths. This additional 23-route sweep passed 69 geometry samples with zero issues or navigation wrapping findings. Review sheets show the first portion of longer pages; full/section screenshots and geometry provide additional coverage. The requested issue areas were compared with approved baseline captures/measurements.

Home overall height at 1440px: 8061px -> 7860px; at 2560px: 8125px -> 7863px; at 440px: 12604px -> 12483px. At 820px, height increases slightly (8780px -> 8789px) because more deliberate columns change wrapping; no fixed-height compression was introduced to force a shorter page.

Limitations: Windows headless Chrome only; no physical-device, Safari or Firefox verification. Geometry tests cannot establish subjective design approval. Screenshot review is representative rather than manual inspection of every route at every single width. No live inquiry was submitted, and automated reCAPTCHA verification was unavailable. Visual approval remains with the user.

No content, colors, branding, dependencies, markup, fonts, breakpoints, animations, negative margins, alignment transforms or `!important` rules were introduced or changed. Existing approved declarations using those mechanisms elsewhere were not removed. The code diff is 16 additions and 7 deletions across the two CSS files.

Audit files remain untracked: `SECURITY-AUDIT.md`, `TYPOGRAPHY-AUDIT.md`, `RESPONSIVE-ALIGNMENT-AUDIT.md`, and this `COMPOSITION-AUDIT.md`. Temporary QA scripts/captures live under ignored `node_modules/.cache/typography/`. Nothing is staged. No commit or push was performed.

## Structural follow-up after visual review

The previous composition pass did not fully resolve the Home transition and introduced a redundant Team category divider. This follow-up traces physical DOM ownership and corrects the duplicated structures without changing the typography or working column architecture.

### Exact blank-area ownership

At 1440px, the last `.home-work-panel` closing border ends at document y=3368.52. `.real-world` ends at y=3440.52, and the Industry intro starts at y=3512.52. The empty 144px interval is therefore two real box regions: 72px of `.real-world` bottom padding followed by 72px of `.industry-section` top padding. Neither section has an explicit fixed height, a minimum-height floor, a margin, an empty spacer, or a generated pseudo-element. Both are normal block boxes whose height follows their content.

Before -> after at 1440px:

| Element/measurement | Before | After |
| --- | ---: | ---: |
| `.real-world` rendered total height | 1106.28px | 1034.28px |
| `.real-world` bottom padding | 72px | 0px |
| `.real-world` top padding | 72px | 72px |
| `.industry-section` top/bottom padding | 72px / 72px | 72px / 72px |
| `.industry-section` rendered total height | 1113.66px | 1039.66px |
| Divider to Industry intro | 144px | 72px |
| `.industry-experience-groups` rendered height | 770.94px | 696.94px |
| Group grid gap | 40px | 0px |
| Previous row divider to Team label box | 58px | 16px |

Section margins are 0px and minimum heights are 0px before/after. Computed pixel heights above are rendered results of `height:auto`, not fixed CSS height declarations. The last work panel retains its 40px internal bottom padding; its own content layout was not changed.

At 440px and 820px, divider-to-intro space is 112px -> 56px. At 1920px, it is 144px -> 72px. This removes one duplicate spacing contribution instead of reducing both sections by arbitrary amounts. The Industry section remains the owner of the transition's breathing room.

### Divider provenance and category rhythm

Line one was the International Trade row's existing `border-bottom: 1px solid var(--line)`. Line two was the recently added Team `.industry-group-heading` `border-top: 2px solid var(--line)`. The parent grid's `gap:40px` separated them without any content. The heading then added 16px top padding, making the label start 58px below the first divider.

The row's closing divider is retained because it closes the numbered row and naturally separates it from the following category. The repeated category heading's top border is removed. The first category still keeps its own opening divider, since there is no preceding industry row there. The empty group grid gap is removed. Both category headings retain 16px top padding, and their unnecessary 16px bottom padding is removed; the first industry row already supplies 24px of top padding.

Category wrappers at 1440px: first 51.27px -> 35.27px; Team 51.27px -> 33.27px. The 2px difference is the first category's opening divider. At 440px, the two-line Team label wrapper changes 68.53px -> 50.53px. Both mobile labels remain centered with zero left margin. Every industry row retains its existing 24px vertical padding, content-driven height, column proportions and type values.

### Exact CSS changes in this follow-up

```css
/* Home: before -> after */
/* .real-world padding-block: var(--home-section-space); */
.home :global(.real-world) { padding-block: var(--home-section-space) 0; }
/* inherited group gap: 40px -> 0 */
.home :global(.industry-experience-groups) { gap: 0; }
/* category padding-block: 16px -> 16px 0 */
.home :global(.industry-group-heading) { padding-block: 16px 0; }
/* repeated heading border-top: 2px solid var(--line) -> 0 */
.home :global(.industry-group + .industry-group .industry-group-heading) { border-top: 0; }
/* .home-solutions padding-top: 0, inherited bottom spacing -> zero at both ends */
.home :global(.home-solutions) { padding-block: 0; }
/* technology-section border-top: 1px solid var(--line) -> 0 */
.home :global(.technology-section) { border-top: 0; }
/* Careers: border-block: 1px solid var(--line) -> border-top only */
.principles { border-top: 1px solid var(--line); }
```

### Same structural patterns elsewhere

The rendered scan covered 23 routes at 440, 820, 1440 and 1920px (92 samples), with source review and screenshot inspection of the candidates.

- Home Solutions -> Technology: the final Solution row's bottom border was followed by the Technology wrapper's top border across 72px of empty outgoing padding at desktop. Retained the row's structural closing divider, removed the repeated wrapper border, and removed Solutions' outgoing padding. Technology retains its own incoming section padding. Divider-to-next-intro space is now owned once, matching the corrected Work -> Industry transition.
- Careers principles: the final numbered row's bottom border was followed by a second full-width wrapper bottom border, 65px away at desktop (64px padding plus the outer border). Retained the list's closing divider and the wrapper's top border; removed only the redundant wrapper bottom border. Section padding, rows, type and column layouts are unchanged.
- Company, Services, Solutions and Work overview pages: hero bottom borders and opening list borders remain separated by 64px. They denote separate hero and content-list structures, rather than two closings of the same content group; left unchanged.
- About, Industries, all eight service detail routes, both case studies, legal pages, header/footer and forms: no additional genuine duplicate closing separators found in this targeted scan. Functional form-control wrappers, map graphics and reCAPTCHA space were not treated as empty layout spacers. No broad spacing redesign was applied.

The after-scan found no remaining content-free duplicate pairs in the corrected Home and Careers regions. No global section token, editorial-column token, width, font, content, color, animation or breakpoint was changed in this follow-up.

### Verification and local state

The complete Home Industry section was inspected as rendered screenshots, from the intro through both category labels and all six industry rows. Native viewport captures were also taken at 320, 440, 820, 1440 and 1920px for the incoming divider, category transitions and section end. The divider sequence now has one separator at each row boundary and a single transition into Team experience; category spacing is consistent and row spacing is unchanged.

Production build, independent TypeScript check and lint: PASS, exit 0. Responsive regression: 23 routes x 47 widths = 1081 samples, zero text-overflow/clipping/navigation findings. Against the approved baseline: 231260 typography-property comparisons and 395 targeted alignment checks passed. Fallback/touch checks: 69 samples passed. All 23 menu resize checks passed, including 800px expansion -> 801px desktop hiding. Browser limitation remains Windows Chrome; physical devices, Safari and Firefox were not tested.

Website files changed in this follow-up: `app/home.module.css` and `app/careers/careers.module.css`. `app/globals.css` retains only the earlier uncommitted composition changes; it was not edited during this follow-up. This report was updated. All audit files remain untracked and excluded from staging. No commit or push. Production localhost remains available at `http://localhost:3103` for visual review.

Final enlarged-text/text-spacing sweep: 672 samples completed, zero overflow/clipping findings. The pre-existing whole-link CTA/icon rectangle heuristic described earlier still applies; this test is root-text enlargement rather than browser zoom. Localhost returned HTTP 200 after the final checks.
