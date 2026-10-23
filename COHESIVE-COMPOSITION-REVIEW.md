# Cohesive editorial composition review

Review baseline: da34fb4e53bb5924fc700a308a4d16064067e0d6. Website changes remain uncommitted and unstaged. No commit or push performed. Preview: http://localhost:3103.

## 1–2. Root causes and responsible components

Short explanatory introductions inherited two-column grids from .editorial-intro, .split-heading, .inner-hero-grid, .page-hero-inner, .industry-detail-heading and .case-hero-text. The first column remained allocated even where its heading wrapped well before the track edge. Consequently the distance between actual heading text and copy was larger than the CSS gap alone suggested. The existing .editorial-pair bounded the tracks but did not change this semantic relationship.

The page container remains controlled by --container: 1440px and existing responsive page gutters. Default editorial columns are minmax(0, min(40%, 480px)) minmax(0, 1fr); the bounded pair uses minmax(0, min(40%, 400px)) minmax(0, 600px). --editorial-gap remains clamp(32px, 3vw, 48px), with the existing tablet/mobile overrides. None of these shared baseline rules or tokens was rewritten.

Company had an additional page module that centered both hero and story frames at 1120px and assigned every row .9fr / 1.1fr columns. It created a second, narrower content anchor inside the desktop page canvas. There were no spacer elements, absolute positions, transforms, negative margins, or empty wrappers causing this horizontal issue.

## 3–5, 10–15, 18. Every corrected introduction and route

31 short explanatory introductions now use Pattern A, with left-aligned supporting copy below the heading, a 24px block gap and the existing 60ch copy measure. These decisions followed content and rendered-page review. Heading blocks are bounded at 780px, an existing heading measure in this stylesheet; actual heading text and existing heading-specific maximum widths can be smaller.

- /: Engineering across the technology lifecycle.
- /: Technology in operating businesses.
- /: Experience across operating environments.
- /: Systems built around business needs.
- /: How we think about technology systems.
- /about: Technology capability built around operating businesses.
- /about: Requirements before implementation.
- /about: Support across key business markets.
- /careers: Build technology that stays useful.
- /careers: Technology work connected to the operation.
- /careers: No open positions right now.
- /company: Technology capability built from operating experience.
- /company: Technology decision-making grounded in real operations.
- /industries: Experience across operating environments.
- /industries: Experience shaped inside Dawood businesses.
- /industries: Broader technology perspective.
- /privacy: Privacy Policy
- /services: Technology services organized around business needs.
- /services/ai-automation: AI & Automation
- /services/application-development: Application Development
- /services/cloud-devops: Cloud & DevOps
- /services/cybersecurity: Cybersecurity
- /services/data-services: Data Services
- /services/enterprise-erp: Enterprise & ERP
- /services/managed-technology: Managed Technology
- /services/technology-consulting: Technology Consulting
- /solutions: Systems built for specific business requirements.
- /terms: Terms & Conditions
- /work: Technology in operating businesses.
- /work/dawood-rcc-pipe: Digital foundations for an operating infrastructure manufacturer
- /work/dawood-traders: Technology supporting modern trade operations

Home Services, Selected Work and Engineering Model introductions changed only their layout class. The service list, simplified project overview, grouped project actions, Engineering Model rows and Technology Ecosystem remain unchanged. Home Industry and Solutions introductions were genuine additional instances of the same short-copy pattern and were also corrected without altering their rows.

Services, Industries, Solutions and Work overview heroes are cohesive intro blocks. All eight service-detail introductions are one explanatory paragraph, so they use the same hero pattern after reviewing their different heading lengths. Scope, technology and industry sections below them are unchanged. Both case-study heroes retain their original summaries and website links, now under their titles; all case-study body content is unchanged. About's short hero, Requirements and Markets introductions and both legal heroes showed the same structural issue and were corrected.

InnerHero now always renders intro-block because every current caller is this short explanatory hero shape. Its obsolete compact switch and service-slug selection were removed. PageHero also uses intro-block for all three current callers: About, Privacy and Terms. Actions remain with their supporting copy. Existing substantive body layouts remain independent of these hero components.

## 5, 8, 16. Controlled two-column layouts retained

Company Operating History, Our Team and Remote Engagement retain Pattern B: each contains substantive, multi-paragraph body copy that benefits from a heading/body relationship. Their rows use a bounded 1120px frame anchored to the established page gutter, a heading track capped at 400px, existing controlled gap and readable copy capped by the existing 60ch rule. They collapse at the existing 800px breakpoint. Company Our Approach is shorter explanatory copy and uses Pattern A.

Similar compositions deliberately unchanged:

- Home operating-origin story: two substantive paragraphs and a story link; the existing two-column body composition still has a reason to exist.
- About What We Do: three substantive body paragraphs, rather than a brief introductory sentence.
- Home/Work project rows: metadata and project narrative are distinct roles; their approved bounded two-column editorial layout and grouped actions remain intact. No specification rows restored.
- Services overview and service-detail lists: service descriptions, scope and platform groups form content structures rather than detached supporting introductions.
- Home industry rows and Industries/Solutions detail rows: identity, narrative and requirements are purposeful row columns; sizes, descriptions, alignments and dividers are preserved.
- Careers How We Work rows: principle names and their descriptions belong to the existing numbered list; no cards or fake job UI added.
- Home Engineering Model / Technology Ecosystem: these are two substantive systems, not a title/supporting-paragraph pair.
- Contact: its intro already stacks; form and contact information are independent substantial columns. No changes required.
- CTA bands and footer: heading/action and navigation groups serve different roles; no detached supporting intro needing conversion was found.
- Insights redirects to Home; there are no separate solution-detail or industry-detail routes in the current route manifest. Their existing overview rows were inspected.

The unified Home Industry 01–06 list remains continuous, without the two removed category headings. The separate /industries page already contained operating/team category headings in the review baseline; these were neither introduced nor restored in this change. Their factual copy remains unchanged.

## 6. Exact shared CSS before → after

Before, the affected wrappers used the existing rules below (still preserved for substantive layouts):

```css
.editorial-intro, .split-heading, .section-top { display: grid; grid-template-columns: var(--editorial-columns); gap: var(--space-intro-flow) var(--editorial-gap); align-items: start; margin-bottom: var(--space-intro); }
.inner-hero-grid { display: grid; grid-template-columns: var(--editorial-columns); gap: var(--editorial-gap); align-items: start; }
.page-hero-inner { display: grid; grid-template-columns: var(--editorial-columns); gap: var(--editorial-gap); align-items: start; }
.case-hero-text { grid-template-columns: var(--editorial-columns); gap: var(--editorial-gap); align-items: start; }
.editorial-pair { grid-template-columns: minmax(0, min(40%, 400px)) minmax(0, 600px); }
```

After, the following opt-in rules override the column structure only for reviewed short introductions. Heading bottom margins are cleared so they do not accumulate with the intentional 24px row gap:

```css
/* Short explanatory copy belongs below its heading; body sections can retain editorial columns. */
.editorial-intro.intro-block,
.industry-detail-heading.intro-block,
.inner-hero-grid.intro-block,
.page-hero-inner.intro-block,
.case-hero-text.intro-block {
  grid-template-columns: minmax(0, 1fr);
  row-gap: var(--space-intro-flow);
}
.intro-block > :first-child { max-width: 780px; }
.intro-block > :first-child > :last-child { margin-bottom: 0; }
.intro-block > :last-child { max-width: var(--editorial-copy); }
```

No existing shared rule was broadly rewritten. The new selectors affect only the 31 introductions listed above, including Company Our Approach through its module-specific grid override. Font styles, container tokens, section padding and section-bottom spacing remain unchanged.

## 7–9. Company and Careers specifics

Company module before:

```css
.company :global(.inner-hero-grid),
.company :global(.company-story-grid) {
  max-width: 1120px;
}

.company :global(.inner-hero-grid),
.company :global(.company-story-row) {
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
}

@media (max-width: 1024px) {
  .company :global(.inner-hero-grid) {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 800px) {
  .company :global(.company-story-row) {
    grid-template-columns: minmax(0, 1fr);
  }
}
```

Company module after:

```css
.company :global(.company-story-grid) {
  border-top: 0;
}

.company :global(.company-story-row:first-child) {
  border-top: 1px solid var(--line);
}

.company :global(.company-story-row) {
  max-width: 1120px;
  grid-template-columns: minmax(0, min(40%, 400px)) minmax(0, 1fr);
}

.company :global(.company-story-row.intro-block) {
  grid-template-columns: minmax(0, 1fr);
  row-gap: var(--space-intro-flow);
}

@media (max-width: 800px) {
  .company :global(.company-story-row) {
    grid-template-columns: minmax(0, 1fr);
  }
}
```

This removes the nested centered frame, restores the original page-container anchor, bounds substantive rows instead, and moves the one opening divider from the wide wrapper to the first bounded row. The opening and subsequent row dividers therefore have the same width. There is one transition line, not an additional decorative divider. Row block padding remains the approved 48px desktop / 40px mobile. The shorter approach section differs in structure; Company is not forced into one repeated layout.

At 1440px, Company hero frame grows 1120 → 1329px and its left anchor moves 152.5 → 48px. Story's outer container likewise grows 1120 → 1329px; individual editorial rows remain at 1120px and align to the 48px page gutter. Hero supporting copy stacks with 24px separation. Operating History retains two columns, heading block 484.6 → 400px, copy 517.5px unchanged, controlled gap 43.2px unchanged. See all eight desktop measurements below.

Careers hero, Working and Open Positions all use Pattern A. The body sits beneath the heading with the same controlled measure and 24px gap. Existing careers.module.css, section borders, section padding and no-open-roles wording are unchanged. No job cards or filler were added.

## Required measured geometry

Measurements are actual browser DOM rectangles in CSS pixels, rounded to 0.1px, collected before and after at the same viewport widths. Frame means the grid wrapper/Company row; Company outer story-container widths are described above. Copy block is the copy wrapper; paragraph is the first actual paragraph box. Before a hero wrapper could occupy far more width than its readable paragraph. Horizontal gap is edge-to-edge between heading and copy blocks for two columns, and 0 when they stack. All corrected stacked introductions use 24px vertical separation; pre-existing stacked heroes at 1024px are identified as stacked → stacked rather than falsely claiming a two-column change. Classic browser scrollbars can reduce usable desktop width by 15px.

### 1024px viewport

| Section | Frame px before → after | Heading block px before → after | Copy block px before → after | Paragraph px before → after | Horizontal gap px before → after | Layout before → after |
| --- | --- | --- | --- | --- | --- | --- |
| Home Services | 945 → 945 | 378 → 780 | 519 → 527.8 | 519 → 527.8 | 48 → 0 | two-column → stacked |
| Home Selected Work | 945 → 945 | 378 → 780 | 519 → 543 | 519 → 543 | 48 → 0 | two-column → stacked |
| Home Engineering Model | 945 → 945 | 378 → 780 | 519 → 543 | 519 → 543 | 48 → 0 | two-column → stacked |
| Services hero | 945 → 945 | 945 → 780 | 945 → 517.5 | 558.9 → 517.5 | 0 → 0 | stacked → stacked |
| Industries hero | 945 → 945 | 945 → 780 | 945 → 517.5 | 558.9 → 517.5 | 0 → 0 | stacked → stacked |
| Solutions hero | 945 → 945 | 945 → 780 | 945 → 517.5 | 558.9 → 517.5 | 0 → 0 | stacked → stacked |
| Work hero | 945 → 945 | 945 → 780 | 945 → 517.5 | 558.9 → 517.5 | 0 → 0 | stacked → stacked |
| Company hero | 945 → 945 | 945 → 780 | 945 → 517.5 | 558.9 → 517.5 | 0 → 0 | stacked → stacked |
| Company operating history | 945 → 945 | 403.6 → 378 | 493.4 → 517.5 | 493.4 → 517.5 | 48 → 48 | two-column → two-column |
| Company approach | 945 → 945 | 403.6 → 780 | 493.4 → 517.5 | 493.4 → 517.5 | 48 → 0 | two-column → stacked |
| Careers hero | 945 → 945 | 945 → 780 | 945 → 517.5 | 558.9 → 517.5 | 0 → 0 | stacked → stacked |
| Careers Working | 945 → 945 | 378 → 780 | 517.5 → 517.5 | 517.5 → 517.5 | 48 → 0 | two-column → stacked |
| Careers Open Positions | 945 → 945 | 378 → 780 | 517.5 → 517.5 | 517.5 → 517.5 | 48 → 0 | two-column → stacked |

### 1280px viewport

| Section | Frame px before → after | Heading block px before → after | Copy block px before → after | Paragraph px before → after | Horizontal gap px before → after | Layout before → after |
| --- | --- | --- | --- | --- | --- | --- |
| Home Services | 1185 → 1185 | 400 → 780 | 527.8 → 527.8 | 527.8 → 527.8 | 38.4 → 0 | two-column → stacked |
| Home Selected Work | 1185 → 1185 | 400 → 780 | 543 → 543 | 543 → 543 | 38.4 → 0 | two-column → stacked |
| Home Engineering Model | 1185 → 1185 | 400 → 780 | 543 → 543 | 543 → 543 | 38.4 → 0 | two-column → stacked |
| Services hero | 1185 → 1185 | 474 → 780 | 672.6 → 517.5 | 558.9 → 517.5 | 38.4 → 0 | two-column → stacked |
| Industries hero | 1185 → 1185 | 474 → 780 | 672.6 → 517.5 | 558.9 → 517.5 | 38.4 → 0 | two-column → stacked |
| Solutions hero | 1185 → 1185 | 474 → 780 | 672.6 → 517.5 | 558.9 → 517.5 | 38.4 → 0 | two-column → stacked |
| Work hero | 1185 → 1185 | 400 → 780 | 600 → 517.5 | 558.9 → 517.5 | 38.4 → 0 | two-column → stacked |
| Company hero | 1120 → 1185 | 486.7 → 780 | 594.9 → 517.5 | 558.9 → 517.5 | 38.4 → 0 | two-column → stacked |
| Company operating history | 1120 → 1120 | 486.7 → 400 | 517.5 → 517.5 | 517.5 → 517.5 | 38.4 → 38.4 | two-column → two-column |
| Company approach | 1120 → 1120 | 486.7 → 780 | 517.5 → 517.5 | 517.5 → 517.5 | 38.4 → 0 | two-column → stacked |
| Careers hero | 1185 → 1185 | 474 → 780 | 672.6 → 517.5 | 558.9 → 517.5 | 38.4 → 0 | two-column → stacked |
| Careers Working | 1185 → 1185 | 400 → 780 | 517.5 → 517.5 | 517.5 → 517.5 | 38.4 → 0 | two-column → stacked |
| Careers Open Positions | 1185 → 1185 | 400 → 780 | 517.5 → 517.5 | 517.5 → 517.5 | 38.4 → 0 | two-column → stacked |

### 1366px viewport

| Section | Frame px before → after | Heading block px before → after | Copy block px before → after | Paragraph px before → after | Horizontal gap px before → after | Layout before → after |
| --- | --- | --- | --- | --- | --- | --- |
| Home Services | 1271 → 1271 | 400 → 780 | 527.8 → 527.8 | 527.8 → 527.8 | 41 → 0 | two-column → stacked |
| Home Selected Work | 1271 → 1271 | 400 → 780 | 543 → 543 | 543 → 543 | 41 → 0 | two-column → stacked |
| Home Engineering Model | 1271 → 1271 | 400 → 780 | 543 → 543 | 543 → 543 | 41 → 0 | two-column → stacked |
| Services hero | 1271 → 1271 | 480 → 780 | 750 → 517.5 | 558.9 → 517.5 | 41 → 0 | two-column → stacked |
| Industries hero | 1271 → 1271 | 480 → 780 | 750 → 517.5 | 558.9 → 517.5 | 41 → 0 | two-column → stacked |
| Solutions hero | 1271 → 1271 | 480 → 780 | 750 → 517.5 | 558.9 → 517.5 | 41 → 0 | two-column → stacked |
| Work hero | 1271 → 1271 | 400 → 780 | 600 → 517.5 | 558.9 → 517.5 | 41 → 0 | two-column → stacked |
| Company hero | 1120 → 1271 | 485.6 → 780 | 593.5 → 517.5 | 558.9 → 517.5 | 41 → 0 | two-column → stacked |
| Company operating history | 1120 → 1120 | 485.6 → 400 | 517.5 → 517.5 | 517.5 → 517.5 | 41 → 41 | two-column → two-column |
| Company approach | 1120 → 1120 | 485.6 → 780 | 517.5 → 517.5 | 517.5 → 517.5 | 41 → 0 | two-column → stacked |
| Careers hero | 1271 → 1271 | 480 → 780 | 750 → 517.5 | 558.9 → 517.5 | 41 → 0 | two-column → stacked |
| Careers Working | 1271 → 1271 | 400 → 780 | 517.5 → 517.5 | 517.5 → 517.5 | 41 → 0 | two-column → stacked |
| Careers Open Positions | 1271 → 1271 | 400 → 780 | 517.5 → 517.5 | 517.5 → 517.5 | 41 → 0 | two-column → stacked |

### 1440px viewport

| Section | Frame px before → after | Heading block px before → after | Copy block px before → after | Paragraph px before → after | Horizontal gap px before → after | Layout before → after |
| --- | --- | --- | --- | --- | --- | --- |
| Home Services | 1329 → 1329 | 400 → 780 | 527.8 → 527.8 | 527.8 → 527.8 | 43.2 → 0 | two-column → stacked |
| Home Selected Work | 1329 → 1329 | 400 → 780 | 543 → 543 | 543 → 543 | 43.2 → 0 | two-column → stacked |
| Home Engineering Model | 1329 → 1329 | 400 → 780 | 543 → 543 | 543 → 543 | 43.2 → 0 | two-column → stacked |
| Services hero | 1329 → 1329 | 480 → 780 | 805.8 → 517.5 | 558.9 → 517.5 | 43.2 → 0 | two-column → stacked |
| Industries hero | 1329 → 1329 | 480 → 780 | 805.8 → 517.5 | 558.9 → 517.5 | 43.2 → 0 | two-column → stacked |
| Solutions hero | 1329 → 1329 | 480 → 780 | 805.8 → 517.5 | 558.9 → 517.5 | 43.2 → 0 | two-column → stacked |
| Work hero | 1329 → 1329 | 400 → 780 | 600 → 517.5 | 558.9 → 517.5 | 43.2 → 0 | two-column → stacked |
| Company hero | 1120 → 1329 | 484.6 → 780 | 592.3 → 517.5 | 558.9 → 517.5 | 43.2 → 0 | two-column → stacked |
| Company operating history | 1120 → 1120 | 484.6 → 400 | 517.5 → 517.5 | 517.5 → 517.5 | 43.2 → 43.2 | two-column → two-column |
| Company approach | 1120 → 1120 | 484.6 → 780 | 517.5 → 517.5 | 517.5 → 517.5 | 43.2 → 0 | two-column → stacked |
| Careers hero | 1329 → 1329 | 480 → 780 | 805.8 → 517.5 | 558.9 → 517.5 | 43.2 → 0 | two-column → stacked |
| Careers Working | 1329 → 1329 | 400 → 780 | 517.5 → 517.5 | 517.5 → 517.5 | 43.2 → 0 | two-column → stacked |
| Careers Open Positions | 1329 → 1329 | 400 → 780 | 517.5 → 517.5 | 517.5 → 517.5 | 43.2 → 0 | two-column → stacked |

### 1536px viewport

| Section | Frame px before → after | Heading block px before → after | Copy block px before → after | Paragraph px before → after | Horizontal gap px before → after | Layout before → after |
| --- | --- | --- | --- | --- | --- | --- |
| Home Services | 1425 → 1425 | 400 → 780 | 527.8 → 527.8 | 527.8 → 527.8 | 46.1 → 0 | two-column → stacked |
| Home Selected Work | 1425 → 1425 | 400 → 780 | 543 → 543 | 543 → 543 | 46.1 → 0 | two-column → stacked |
| Home Engineering Model | 1425 → 1425 | 400 → 780 | 543 → 543 | 543 → 543 | 46.1 → 0 | two-column → stacked |
| Services hero | 1425 → 1425 | 480 → 780 | 898.9 → 517.5 | 558.9 → 517.5 | 46.1 → 0 | two-column → stacked |
| Industries hero | 1425 → 1425 | 480 → 780 | 898.9 → 517.5 | 558.9 → 517.5 | 46.1 → 0 | two-column → stacked |
| Solutions hero | 1425 → 1425 | 480 → 780 | 898.9 → 517.5 | 558.9 → 517.5 | 46.1 → 0 | two-column → stacked |
| Work hero | 1425 → 1425 | 400 → 780 | 600 → 517.5 | 558.9 → 517.5 | 46.1 → 0 | two-column → stacked |
| Company hero | 1120 → 1425 | 483.3 → 780 | 590.7 → 517.5 | 558.9 → 517.5 | 46.1 → 0 | two-column → stacked |
| Company operating history | 1120 → 1120 | 483.3 → 400 | 517.5 → 517.5 | 517.5 → 517.5 | 46.1 → 46.1 | two-column → two-column |
| Company approach | 1120 → 1120 | 483.3 → 780 | 517.5 → 517.5 | 517.5 → 517.5 | 46.1 → 0 | two-column → stacked |
| Careers hero | 1425 → 1425 | 480 → 780 | 898.9 → 517.5 | 558.9 → 517.5 | 46.1 → 0 | two-column → stacked |
| Careers Working | 1425 → 1425 | 400 → 780 | 517.5 → 517.5 | 517.5 → 517.5 | 46.1 → 0 | two-column → stacked |
| Careers Open Positions | 1425 → 1425 | 400 → 780 | 517.5 → 517.5 | 517.5 → 517.5 | 46.1 → 0 | two-column → stacked |

### 1728px viewport

| Section | Frame px before → after | Heading block px before → after | Copy block px before → after | Paragraph px before → after | Horizontal gap px before → after | Layout before → after |
| --- | --- | --- | --- | --- | --- | --- |
| Home Services | 1440 → 1440 | 400 → 780 | 527.8 → 527.8 | 527.8 → 527.8 | 48 → 0 | two-column → stacked |
| Home Selected Work | 1440 → 1440 | 400 → 780 | 543 → 543 | 543 → 543 | 48 → 0 | two-column → stacked |
| Home Engineering Model | 1440 → 1440 | 400 → 780 | 543 → 543 | 543 → 543 | 48 → 0 | two-column → stacked |
| Services hero | 1440 → 1440 | 480 → 780 | 912 → 517.5 | 558.9 → 517.5 | 48 → 0 | two-column → stacked |
| Industries hero | 1440 → 1440 | 480 → 780 | 912 → 517.5 | 558.9 → 517.5 | 48 → 0 | two-column → stacked |
| Solutions hero | 1440 → 1440 | 480 → 780 | 912 → 517.5 | 558.9 → 517.5 | 48 → 0 | two-column → stacked |
| Work hero | 1440 → 1440 | 400 → 780 | 600 → 517.5 | 558.9 → 517.5 | 48 → 0 | two-column → stacked |
| Company hero | 1120 → 1440 | 482.4 → 780 | 589.6 → 517.5 | 558.9 → 517.5 | 48 → 0 | two-column → stacked |
| Company operating history | 1120 → 1120 | 482.4 → 400 | 517.5 → 517.5 | 517.5 → 517.5 | 48 → 48 | two-column → two-column |
| Company approach | 1120 → 1120 | 482.4 → 780 | 517.5 → 517.5 | 517.5 → 517.5 | 48 → 0 | two-column → stacked |
| Careers hero | 1440 → 1440 | 480 → 780 | 912 → 517.5 | 558.9 → 517.5 | 48 → 0 | two-column → stacked |
| Careers Working | 1440 → 1440 | 400 → 780 | 517.5 → 517.5 | 517.5 → 517.5 | 48 → 0 | two-column → stacked |
| Careers Open Positions | 1440 → 1440 | 400 → 780 | 517.5 → 517.5 | 517.5 → 517.5 | 48 → 0 | two-column → stacked |

### 1920px viewport

| Section | Frame px before → after | Heading block px before → after | Copy block px before → after | Paragraph px before → after | Horizontal gap px before → after | Layout before → after |
| --- | --- | --- | --- | --- | --- | --- |
| Home Services | 1440 → 1440 | 400 → 780 | 527.8 → 527.8 | 527.8 → 527.8 | 48 → 0 | two-column → stacked |
| Home Selected Work | 1440 → 1440 | 400 → 780 | 543 → 543 | 543 → 543 | 48 → 0 | two-column → stacked |
| Home Engineering Model | 1440 → 1440 | 400 → 780 | 543 → 543 | 543 → 543 | 48 → 0 | two-column → stacked |
| Services hero | 1440 → 1440 | 480 → 780 | 912 → 517.5 | 558.9 → 517.5 | 48 → 0 | two-column → stacked |
| Industries hero | 1440 → 1440 | 480 → 780 | 912 → 517.5 | 558.9 → 517.5 | 48 → 0 | two-column → stacked |
| Solutions hero | 1440 → 1440 | 480 → 780 | 912 → 517.5 | 558.9 → 517.5 | 48 → 0 | two-column → stacked |
| Work hero | 1440 → 1440 | 400 → 780 | 600 → 517.5 | 558.9 → 517.5 | 48 → 0 | two-column → stacked |
| Company hero | 1120 → 1440 | 482.4 → 780 | 589.6 → 517.5 | 558.9 → 517.5 | 48 → 0 | two-column → stacked |
| Company operating history | 1120 → 1120 | 482.4 → 400 | 517.5 → 517.5 | 517.5 → 517.5 | 48 → 48 | two-column → two-column |
| Company approach | 1120 → 1120 | 482.4 → 780 | 517.5 → 517.5 | 517.5 → 517.5 | 48 → 0 | two-column → stacked |
| Careers hero | 1440 → 1440 | 480 → 780 | 912 → 517.5 | 558.9 → 517.5 | 48 → 0 | two-column → stacked |
| Careers Working | 1440 → 1440 | 400 → 780 | 517.5 → 517.5 | 517.5 → 517.5 | 48 → 0 | two-column → stacked |
| Careers Open Positions | 1440 → 1440 | 400 → 780 | 517.5 → 517.5 | 517.5 → 517.5 | 48 → 0 | two-column → stacked |

### 2560px viewport

| Section | Frame px before → after | Heading block px before → after | Copy block px before → after | Paragraph px before → after | Horizontal gap px before → after | Layout before → after |
| --- | --- | --- | --- | --- | --- | --- |
| Home Services | 1440 → 1440 | 400 → 780 | 527.8 → 527.8 | 527.8 → 527.8 | 48 → 0 | two-column → stacked |
| Home Selected Work | 1440 → 1440 | 400 → 780 | 543 → 543 | 543 → 543 | 48 → 0 | two-column → stacked |
| Home Engineering Model | 1440 → 1440 | 400 → 780 | 543 → 543 | 543 → 543 | 48 → 0 | two-column → stacked |
| Services hero | 1440 → 1440 | 480 → 780 | 912 → 517.5 | 558.9 → 517.5 | 48 → 0 | two-column → stacked |
| Industries hero | 1440 → 1440 | 480 → 780 | 912 → 517.5 | 558.9 → 517.5 | 48 → 0 | two-column → stacked |
| Solutions hero | 1440 → 1440 | 480 → 780 | 912 → 517.5 | 558.9 → 517.5 | 48 → 0 | two-column → stacked |
| Work hero | 1440 → 1440 | 400 → 780 | 600 → 517.5 | 558.9 → 517.5 | 48 → 0 | two-column → stacked |
| Company hero | 1120 → 1440 | 482.4 → 780 | 589.6 → 517.5 | 558.9 → 517.5 | 48 → 0 | two-column → stacked |
| Company operating history | 1120 → 1120 | 482.4 → 400 | 517.5 → 517.5 | 517.5 → 517.5 | 48 → 48 | two-column → two-column |
| Company approach | 1120 → 1120 | 482.4 → 780 | 517.5 → 517.5 | 517.5 → 517.5 | 48 → 0 | two-column → stacked |
| Careers hero | 1440 → 1440 | 480 → 780 | 912 → 517.5 | 558.9 → 517.5 | 48 → 0 | two-column → stacked |
| Careers Working | 1440 → 1440 | 400 → 780 | 517.5 → 517.5 | 517.5 → 517.5 | 48 → 0 | two-column → stacked |
| Careers Open Positions | 1440 → 1440 | 400 → 780 | 517.5 → 517.5 | 517.5 → 517.5 | 48 → 0 | two-column → stacked |

## 17. Exact website files modified

- app/about/page.tsx
- app/careers/page.tsx
- app/company/company.module.css
- app/company/page.tsx
- app/components/InnerHero.tsx
- app/components/PageHero.tsx
- app/globals.css
- app/industries/page.tsx
- app/page.tsx
- app/privacy/page.tsx
- app/services/[slug]/page.tsx
- app/work/[slug]/page.tsx
- app/work/page.tsx

No package manifest, lockfile, assets, data files, contact form, navigation implementation, typography module or unrelated page body was changed. This review document is untracked and excluded from website changes.

## 19–25, 31–33. Preservation checks

Font-size changes: NONE
Line-height changes: NONE
Letter-spacing changes: NONE
Font-family changes: NONE
Font-weight changes: NONE

230,315 computed typography-property comparisons against the previous approved site snapshot passed. This includes --type-interior-hero's resulting heading sizes, responsive headings, body, labels, service/industry names, navigation, technology labels and footer/legal text. Width-driven wrapping changes are intentional composition changes, not changes to type values.

235 protected-layout checks passed for Home/Work project groups, Home industry rows, solution lineup, About locations/value groups and operating-process layout across 47 widths. The approved 58px-offset correction and mobile title/description alignment remain intact; mobile industry text remains centered by existing rules. Solution descriptions retain their widths. Process and Why Dawood Technologies article cell dividers remain absent. No removed project capability/specification list was restored. Unified Home industry rows 01–06 remain intact with their factual descriptions and existing divider rhythm. The prior section-padding, duplicate-divider and responsive-menu fixes remain intact.

No dependencies added. No copy, claims, names, colors, branding or unrelated content changed. No negative margins, positioning transforms, arbitrary offsets, !important rules, absolute positioning, spacer elements or breakpoint-per-screenshot rules introduced.

All existing six audit/review Markdown files remain untracked, unstaged and excluded: SECURITY-AUDIT.md, TYPOGRAPHY-AUDIT.md, RESPONSIVE-ALIGNMENT-AUDIT.md, COMPOSITION-AUDIT.md, TARGETED-VISUAL-REFINEMENT.md, EDITORIAL-COMPOSITION-REVIEW.md. This new COHESIVE-COMPOSITION-REVIEW.md also remains untracked/unstaged.

## 26–30. Visual verification, build and limitations

- Production build: PASS (npm.cmd run build).
- TypeScript: PASS (npx.cmd tsc --noEmit; production build's own TypeScript phase also passed).
- Lint: PASS (npm.cmd run lint).
- Git diff whitespace check: PASS.
- 23 routes × 47 viewport widths = 1081 geometry samples: zero recorded overflow/clipping/container issues and zero navigation-wrap issues.
- 672 normal/enlarged-text/custom-text-spacing samples: zero recorded issues. Enlarged text uses a 200% root-font test, not a claim of native browser zoom on every device.
- 69 alternate-font mobile samples on 23 routes: zero issues. All 23 mobile-menu resize checks passed, with Escape/focus and short landscape menu-scroll checks also passing.
- Requested desktop widths 1024, 1280, 1366, 1440, 1536, 1728, 1920, 2560; tablet widths 834, 820, 768, 600; phone widths 440, 430, 414, 402, 393, 390, 375, 360, 320 were captured/measured, with additional breakpoint neighbors.
- Actual screenshots of all 31 changed introductions and all four Company body sections were reviewed at 1728/1920/2560, 820/834/1024 and 320/360/375. Native 1440px Home Services/Work/Engineering Model, Company and Careers screenshots were inspected in surrounding page context. Home/Company/Careers were additionally inspected at 1280/1366 and 600/768. Protected Home origin/process/Why/industry, and Contact page screenshots were inspected. No duplicate dividers, unexplained empty wrappers, overlapping text, broken actions or giant blank section areas were observed in the reviewed layouts.
- Limits: Chrome on Windows, with emulated viewport sizes; physical devices and Safari/Firefox were not tested. Automated rectangles cannot establish design quality, so screenshot review was used separately. Not every screenshot at every intermediate width received an individual manual review; all requested widths received the geometry/text regression checks. Contact submission was not performed; reCAPTCHA was unavailable in the automated localhost browser. No server-side contact behavior changed.

Preview remains running at http://localhost:3103 for user visual review. No commit. No push.
