# Dawood Technologies responsive visual alignment audit

Completed October 1, 2026 against the local production build. Baseline: `a388555f81154696b2bbe8af6aae739b39c1e339`.

Six CSS corrections address seven issue occurrences, including the known Home label. Website code changes are confined to `app/globals.css`. No font sizes, font families, weights, line heights, tracking, colors, content, dependencies, or assets changed. Nothing has been committed or pushed.

## 1. Known issue: demonstrated operating experience

The reproduced issue is the **Home** group heading, not the separate eyebrow with the same wording on Industries.

The Home rule was:

```css
.industry-group-heading { margin: 0 0 18px 58px; }
.industry-group-heading h3 { margin: 0; font-size: 1rem; text-transform: uppercase; letter-spacing: .06em; }
```

On desktop, 58px intentionally equals the row's 36px number column plus its 22px gap. The group heading therefore starts with the industry titles. At widths up to 800px, rows change to a 34px number column, while the heading keeps its desktop left margin and start alignment. This leaves an asymmetric text region above a full-width divider. The long uppercase phrase almost fills that offset region at 440px, making it look like incorrectly centered text.

Actual rendered geometry at **440 CSS pixels**:

| Measurement | Before | After |
| --- | --- | --- |
| Viewport/content center | 220px | 220px |
| Outer content and divider edges | 20–420px | 20–420px |
| Group heading box edges | 78–420px | 20–420px |
| Group heading box width | 342px | 400px |
| Group heading box center | 249px | 220px |
| Rendered phrase edges, existing Windows font stack | 78–418.72px | 49.64–390.36px |
| Rendered phrase center | 248.36px | 220px |
| Heading left margin | 58px | 0px |
| Text alignment | start | center |

**Classification:** retained desktop margin/container alignment at a responsive breakpoint. The cause is not font size. The 58px inset also differs by 2px from the mobile row title's 56px inset, but replacing it with 56px would still leave the heading region asymmetric and would not meet the requested mobile centering.

Checked the heading, its parent, the outer container, and the associated divider: no nested container, asymmetric outer padding, positioning, transform, pseudo-element, max-width, or flex justification causes this shift. The outer container is already centered. The heading has no added horizontal padding. Its inherited start alignment and retained left margin explain the result. Letter spacing remains `.06em`; it does not explain a 28px shift.

The fix resets the shared group heading's left margin and centers text at the existing 800px breakpoint. It fixes both Home group labels together, while preserving their intended title-column alignment above 800px. At 320px, every wrapped line centers at approximately 160px; at 390px, at 195px; at 440px, at 220px. The separate Industries eyebrow remains intentionally left-aligned with its section heading.

Evidence: [before at 440px](node_modules/.cache/typography/alignment-before/_-440-5-section_industry-section.png), [final at 440px](node_modules/.cache/typography/alignment-final/_-440-5-section_industry-section.png), [mobile Arial fallback at 440px](node_modules/.cache/typography/interaction-final/home-label-arial-440.png).

## 2. Complete issue register

| ID | Page/component and element | Affected conditions | Root cause | Severity | Final correction |
| --- | --- | --- | --- | --- | --- |
| A1 | Home: “Demonstrated operating experience” | Mobile/stacked layout, 320–800px | Desktop-only 58px left inset persists above the full-width divider; start-aligned text | Medium | Reset left margin and center within the complete content container at ≤800px |
| A2 | Home: “Team experience & technology applications” | Same 320–800px range | Same shared rule; wrapped lines begin in the offset text region | Medium | Same shared correction as A1; no separate patch |
| A3 | Home: all seven solution rows | 521–800px; most pronounced near 521px | Three-column layout reserves at least 250px for the title and leaves the description a narrow third column | Medium | Move the existing two-column, description-under-title arrangement from ≤520px to ≤800px; use a zero intrinsic minimum for the text column |
| A4 | About: locations row, particularly “Remote engagements” | Intermediate widths where the old flex row wraps; reproduced at 521px and 600px | 220px intrinsic item minimums force wrapping; the new first item on a wrapped row keeps an interior-column inset and vertical border | Low | Use three equal shrinkable grid columns; retain the existing single-column arrangement at ≤520px |
| A5 | About: value-card divider below the second row | 521–800px, two columns | Three-column breakpoint adds bottom borders only to cards 1–3; card 4 lacks the matching second-row divider | Low | At ≤800px give every non-final card a bottom border; existing single-column and right-border rules stay in place |
| A6 | Home: principles grid, bottom border under “Ongoing ownership” | 521–1024px, two columns | Tablet rule adds a bottom border to all cards, but the final card's existing border reset leaves a half-width border under the final row | Low | Apply the tablet row divider to cards 1–2 only; retain interior dividers in the existing phone layout |
| A7 | Shared header: expanded mobile navigation | Open at 800px, then resize above 800px; reproduced at 801px on all 23 rendered URLs | React retains the open menu state during resize; the panel has no desktop visibility rule, so desktop and mobile navigation appear together | Medium | Hide the panel by default and display it only within the existing ≤800px media query |

A3 measured example: at 521px the first description had a 109.98px box and seven lines; after correction it has a 408px box and two lines, with the same font. Its left edge now matches its title. At 600px the old description was 188.98px wide; the final text uses its existing editorial maximum where available.

A4 measured example: at 600px, “Remote engagements” previously started a new row at the container's left edge but kept `padding-left: 28px` and a vertical left border. The final grid keeps all three entries on one row with equal column widths; naturally wrapped words stay within their own cell. At 521px, column widths are approximately 152.67px in the desktop-scrollbar test environment. At ≤520px all three entries stack and use the same left edge.

Focused evidence: [solution rows before at 521px](node_modules/.cache/typography/focused-before/_-521-6-section_home-solutions.png), [after](node_modules/.cache/typography/focused-after/_-521-6-section_home-solutions.png); [locations before at 600px](node_modules/.cache/typography/focused-before/_about-600-4-section_locations-section.png), [after](node_modules/.cache/typography/focused-after/_about-600-4-section_locations-section.png); [About dividers before](node_modules/.cache/typography/focused-before/_about-600-3-section_process-section.png), [after](node_modules/.cache/typography/focused-after/_about-600-3-section_process-section.png); [Home dividers before](node_modules/.cache/typography/focused-before/_-600-8-section_principles.png), [after](node_modules/.cache/typography/focused-after/_-600-8-section_principles.png); [duplicate navigation before](node_modules/.cache/typography/interaction-before/menu-resized-801.png), [final](node_modules/.cache/typography/interaction-final/menu-resized-801.png).

No other unexplained visual alignment defect was reproduced in the reviewed production screenshots and measured states. This statement is limited to the browser, routes, widths, and states documented below.

## 3. Exact CSS before → after

These are all changed rules. Unchanged declarations are included to make each replacement reviewable.

### Shared mobile panel visibility

Before:

```css
.mobile-panel { max-height: calc(100dvh - var(--header-height)); overflow-y: auto; color: var(--ink); background: var(--white); border-top: 1px solid var(--line); }
/* No visibility override at either layout. */
```

After:

```css
.mobile-panel { display: none; max-height: calc(100dvh - var(--header-height)); overflow-y: auto; color: var(--ink); background: var(--white); border-top: 1px solid var(--line); }
@media (max-width: 800px) {
  .mobile-panel { display: block; }
}
```

### Home group heading alignment

Before, at every width:

```css
.industry-group-heading { margin: 0 0 18px 58px; }
```

After, retaining that desktop rule and adding:

```css
@media (max-width: 800px) {
  .industry-group-heading { margin-left: 0; text-align: center; }
}
```

### Home solution rows

Before:

```css
/* The existing desktop rule remains unchanged. */
.solution-lineup article { display: grid; grid-template-columns: 42px minmax(250px, .82fr) minmax(0, 1.18fr); gap: 28px; align-items: start; padding: 30px 0; border-bottom: 1px solid var(--line); }
@media (max-width: 520px) {
  .solution-lineup article { grid-template-columns: 34px 1fr; gap: 12px 16px; }
  .solution-lineup article p { grid-column: 2; }
}
```

After, keeping the same desktop rule and relocating the responsive rules:

```css
@media (max-width: 800px) {
  .solution-lineup article { grid-template-columns: 34px minmax(0, 1fr); gap: 12px 16px; }
  .solution-lineup article p { grid-column: 2; }
}
/* The duplicate rules were removed from the 520px block. */
```

### About locations

Before:

```css
.locations { display: flex; flex-wrap: wrap; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.location { min-width: 220px; flex: 1; padding: 24px 0; font-weight: 600; }
@media (max-width: 520px) {
  .location { min-width: 100%; }
}
```

After:

```css
.locations { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.location { min-width: 0; padding: 24px 0; font-weight: 600; }
@media (max-width: 520px) {
  .locations { grid-template-columns: minmax(0, 1fr); }
}
```

The existing interior-column padding/left borders and phone padding/border resets remain unchanged. Equal grid widths also replace the old unequal flex widths caused by interior-item padding; this is part of the same container correction.

### About value-card row dividers

Before: only the inherited ≤1024px rule applied bottom borders to cards 1–3 in the two-column layout.

```css
@media (max-width: 1024px) {
  .value-card:nth-child(-n+3) { border-bottom: 1px solid var(--line); }
}
```

After: keep that three-column rule and add the correct two-column/phone divider rule:

```css
@media (max-width: 800px) {
  .value-card:not(:last-child) { border-bottom: 1px solid var(--line); }
}
```

### Home principle-card row dividers

Before:

```css
@media (max-width: 1024px) {
  .principle-grid article { border-bottom: 1px solid var(--line); }
}
@media (max-width: 520px) {
  .principle-grid article { min-height: 220px; border-right: 0; }
}
```

After:

```css
@media (max-width: 1024px) {
  .principle-grid article:nth-child(-n+2) { border-bottom: 1px solid var(--line); }
}
@media (max-width: 520px) {
  .principle-grid article { min-height: 220px; border-right: 0; border-bottom: 1px solid var(--line); }
}
```

The existing `.principle-grid article:last-child { border: 0; }` still removes the final phone card's border. No new breakpoint, `!important`, transform, negative margin, or arbitrary offset was introduced.

## 4. Container system and shared impact

The intended system is `.container`: width `min(100% - two page gutters, 1440px)`, with automatic inline margins. Gutters are 64px by default, 48px at ≤1600px, 40px at ≤1366px, 32px at ≤1024px, 24px at ≤800px, and 20px at ≤520px. Containers are width-constrained rather than horizontally padded wrappers, so double nesting would narrow content twice.

The audit measured actual container edges and centers, nested-container presence, text ranges, parent geometry, and every rendered grid/flex layout's children. No nested `.container` or unexplained asymmetric outer container was found. Desktop centering is measured against `document.documentElement.clientWidth`, the usable page width: the test browser's classic 15px scrollbar is excluded. Phone emulation has no classic scrollbar. A 7.5px difference between the usable desktop page center and the window's scrollbar-inclusive center is not a layout defect.

The editorial grid uses `minmax(0, 5fr) minmax(0, 6fr)` with an existing fluid gap and approximately 60ch text measures. Tablet/mobile stacking, indexed-row gutters, card padding, and technology icon/text columns have different semantic purposes; they were inspected rather than forced into one universal alignment.

Impact map:

| Changed shared rule | Actual current instances |
| --- | --- |
| `.mobile-panel` | Header on every content route, Insights 404, and missing-route response |
| `.industry-group-heading` | Both industry group headings on Home |
| `.solution-lineup article` and its paragraphs | Seven Home solution rows |
| `.locations`, `.location` | About's three location entries |
| `.value-card` responsive bottom borders | About's five value cards |
| `.principle-grid` responsive bottom borders | Home's four principle cards |

No root container, global text alignment, heading token, font declaration, or site-wide spacing token changed. The header correction is the only change with instances on every page.

## 5. Route and component coverage

All 23 rendered URLs below were measured in the final production build at all 47 widths. Each route also received mobile font-fallback and expanded-menu checks. Full-page screenshots were captured at 390, 440, 820, 1440, and 2560px; section screenshots at 440 and 1440px supported visual inspection. Additional focused screenshots covered the corrected Home/About regions at 521, 600, 768, 800, 801, and 1024px.

| Routes | Visual areas reviewed | Result |
| --- | --- | --- |
| `/` | Hero and rotating-word layout, operating steps, capabilities/arrows, selected work, industry groups, solution rows, engineering model, ecosystem/logos, principles, closing CTA | A1, A2, A3, A6 corrected; final measured layout passes |
| `/about` | Hero/action, editorial copy, values/cards, locations, multi-action CTA | A4, A5 corrected; final measured layout passes |
| `/services` | Eight overview rows, indices, service lists, technology contexts, links, CTA | No additional alignment correction needed |
| `/services/technology-consulting`, `/services/ai-automation`, `/services/cloud-devops`, `/services/application-development`, `/services/enterprise-erp`, `/services/data-services`, `/services/cybersecurity`, `/services/managed-technology` | Every individual hero, section marker, scope grid, technology grid or fallback paragraph, platform label/logo, engineering text, relevant-industry link/arrow, CTA | Every instance measured; no additional correction needed |
| `/industries` | Both section eyebrows, heroes, indexed rows, headings/descriptions, bullet lists, dividers, CTA | Separate demonstrated-experience eyebrow is correctly left-aligned |
| `/solutions` | Hero, all seven solution rows and associated service lists, CTA | No additional correction needed |
| `/work` | Both indexed projects, headings, descriptions, capability lists, inline actions/arrows, CTA | No additional correction needed |
| `/work/dawood-rcc-pipe`, `/work/dawood-traders` | Both long heroes, visit links, metadata/sidebar, all narrative sections, scope/system grids, notes, dividers, CTA | Both instances measured; no additional correction needed |
| `/company` | Hero and all four editorial story rows, supporting copy, CTA | No additional correction needed |
| `/careers` | Hero, working-at section, four numbered principles, no-open-positions state | No additional correction needed |
| `/contact` | Intro, every form label/field/control, field grids, textarea, submission button/note, CAPTCHA error area, phone, locations, decorative map, dividers | No first-party field/container alignment defect found |
| `/privacy`, `/terms` | Heroes, summary panels, legal copy/headings/lists, links | No additional correction needed |
| `/insights`, `/audit-not-found` | Existing 404 response, surrounding header/footer | Existing response retained; alignment checked |

Shared Header, desktop navigation, expanded MobileNavigation, Footer, InnerHero, PageHero, ContactBand, CTASection, ButtonLink, EngineeringModel, TechnologyEcosystem, and TechnologyLogo were reviewed in their rendered instances. This includes horizontal and vertical alignment of text, indices, borders, dividers, grid rows, buttons, inline arrows, form controls, legal text, and logos. Section numbers and work metadata were checked; the site has no separate statistical-counter component to invent or redesign.

Redirect checks: `/capabilities`, `/capabilities/example`, and `/process` each return HTTP 308 to `/services`; that destination was fully audited. XML, robots, and image/icon assets are not typography pages.

## 6. Viewports and breakpoint results

The final matrix contains **1,081 route/viewport geometry samples**: 23 URLs × 47 widths. All requested widths are included.

| Range | Requested widths | Final result |
| --- | --- | --- |
| Phones | 320, 360, 375, 390, 393, 402, 414, 430, 440 | Home labels center within the complete container; phone grids, footer, form and navigation stay within their intended bounds |
| Tablets | 600, 768, 820, 834, 1024 | Solution descriptions use a usable text column; corrected card dividers match active rows; locations remain a stable grid; existing desktop/mobile navigation threshold is respected |
| Laptops | 1280, 1366, 1440, 1536 | Existing hero/editorial hierarchy retained; navigation has no detected text wrapping or overlap; outer containers remain centered |
| Desktop/ultrawide | 1728, 1920, 2560 | Existing heading caps, editorial measures, and 1440px content cap retained; no unexpected horizontal drift |

Complete measured width list: **320, 359, 360, 361, 375, 390, 393, 402, 414, 430, 440, 519, 520, 521, 573, 574, 575, 599, 600, 601, 768, 799, 800, 801, 820, 834, 1023, 1024, 1025, 1179, 1180, 1181, 1280, 1299, 1300, 1301, 1365, 1366, 1367, 1440, 1536, 1599, 1600, 1601, 1728, 1920, 2560px**.

| Breakpoint triplet | Behavior inspected | Result |
| --- | --- | --- |
| 359 / 360 / 361 | Narrow heading overrides and wrapping | No unexplained alignment offset |
| 519 / 520 / 521 | Phone gutters/header, cards, form, locations, solution rows | Existing layout transitions preserved; solution description no longer collapses at 521px |
| 573 / 574 / 575 | Service scope grid transition | Headings and dividers align in both arrangements |
| 599 / 600 / 601 | Engineering-layer and Contact map composition | Labels/tags and geographic content align on both sides |
| 799 / 800 / 801 | Editorial layouts, Home group labels and solution rows, values, header/menu | Mobile labels centered through 800px; desktop title-column alignment resumes at 801px; open mobile panel hides on desktop |
| 1023 / 1024 / 1025 | Heroes, services overview, card columns, Contact layout, footer | Active row borders and grid geometry remain consistent |
| 1179 / 1180 / 1181 | Engineering model/ecosystem stacking | Associated top dividers align with their own content |
| 1299 / 1300 / 1301 | Contact decorative map width override | No content-column drift or text obstruction found |
| 1365 / 1366 / 1367 | Page gutter transition | Every outer container follows the same change |
| 1599 / 1600 / 1601 | Page gutter transition and content cap | Containers stay centered; typography caps retained |

## 7. Mobile conditions and interactive checks

The approximately large-iPhone-sized pass used a **440×956 CSS-pixel viewport**, touch emulation, and device pixel ratio 3. Narrow and common phone widths were also measured. Because Windows supplies Segoe fonts that an iPhone will not supply, an additional pass forced the site's existing **Arial fallback** in the browser only, at 320, 390, and 440px on all 23 URLs: **69 mobile fallback samples**, with no detected clipping, viewport text spill, or container centering errors. This override was not written into website CSS.

The final fallback pass measured the Home label's text centers within 0.01px of the correct 160, 195, and 220px viewport centers. Wrapped lines were measured independently; centering was not inferred from `text-align` alone.

Expanded menu order and text bounds passed at 320, 440, and 768px on every rendered URL. Escape closes the menu and restores focus to its toggle. At 800→801px, all 23 route checks now show desktop navigation visible and the mobile panel hidden. The 640×450 short-viewport menu remains scrollable, its Contact action is reachable, and activation opens Contact and closes the panel.

Inline action arrows preserve their expected square dimensions (15, 16, 17, or 24px according to their component) and align with their text/content area. Border and padding offsets are intentional: a footer link with 8px bottom padding places its icon above the center of the whole border box while keeping the icon centered with its text. This is not an unexplained icon offset. The Contact focus screenshot shows the field outline contained within the form's padding.

This was a **Chromium production-browser audit on Windows**, including mobile geometry and fallback-font emulation. It is not a physical iPhone/Safari run. A Safari/device-specific rendering difference cannot be ruled out by claiming Chromium emulation is a native-device test. Third-party CAPTCHA internals and real form submission were not exercised; first-party form geometry and the locally visible error state were inspected. CAPTCHA loading can change the error area's height during a capture and is not evidence of a CSS alignment change.

## 8. Intentional differences retained

- Above 800px, Home group labels align with industry titles, not with the viewport center. The Industries page's eyebrows remain left-aligned at every width.
- Indexed content is inset from section-wide dividers to reserve space for its number. Text inside padded cards is inset from the outer section edge. Bulleted lists retain their marker indentation.
- Editorial copy may stop at its reading measure before reaching the outer container's right edge. Headings, notes, legal copy, and technology grids have role-specific maximum widths.
- About's five value cards leave an incomplete final row in its two- and three-column arrangements. Correct dividers now follow the occupied rows; an extra card was not added.
- Home display tracking, the rotating word, uppercase tracking, and multi-line long case-study headings remain part of the approved typography. No font was shrunk to conceal a layout problem.
- Logo artwork has different intrinsic silhouettes and existing visual scale values. The logo/text layout boxes and grid columns were checked without redrawing or independently shifting artwork.
- Existing footer column visibility choices, section spacing, sticky desktop case metadata, and responsive case metadata columns remain unchanged.

## 9. Verification, files, and delivery

| Check | Result |
| --- | --- |
| Final production build: `npm.cmd run build` | Passed; 28 static outputs generated |
| Standalone TypeScript: `node node_modules/typescript/bin/tsc --noEmit` | Passed |
| ESLint: `npm.cmd run lint` | Passed |
| Final route/width geometry matrix | 1,081 samples; no reported text viewport spill, clipping, outer-container defects, header overlap, or normal navigation text wrapping |
| Final Arial mobile fallback matrix | 69 samples; no reported text/container defects |
| Menu resize checks | Passed on all 23 rendered URLs |
| Short menu, Escape/focus return, Contact navigation | Passed |
| `git diff --check` | Passed |

Files changed/created for this task:

- `app/globals.css`: the six justified CSS corrections above; the only modified tracked website code file.
- `RESPONSIVE-ALIGNMENT-AUDIT.md`: this requested review report, new and untracked.
- Ignored `node_modules/.cache/typography/` artifacts: audit scripts, measurements, and screenshots. These are local QA evidence, not website changes or commit contents.

`app/home.module.css` and all page/component source files remain unchanged. Existing untracked `SECURITY-AUDIT.md` and `TYPOGRAPHY-AUDIT.md` were left untouched. No unrelated content/design changes, dependencies, new fonts, asset edits, or extra breakpoints were introduced. No commit or push was performed; HEAD remains the baseline commit.

Final raw evidence: [geometry summary](node_modules/.cache/typography/alignment-final/summary.json), [mobile/interaction results](node_modules/.cache/typography/interaction-final/results.json). Screenshots and per-route geometry are retained alongside those summaries for review.
