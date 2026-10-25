# Homepage content preservation and destination review

The minimal homepage replaces the detailed homepage presentation only. No dedicated page, shared content registry, or reusable component was deleted.

The exact pre-redesign homepage source and scoped styles are preserved in:

- `homepage-before-minimal.tsx.txt`
- `homepage-before-minimal.module.css.txt`

These are archival review files, not additional public routes or build inputs. They retain the previous uncommitted homepage work, including its industry grid and solutions carousel composition.

| Previous homepage content | Existing destination / source | Review status |
| --- | --- | --- |
| Operating-business origin and ownership approach | `/company` | Dedicated company page retains the history and operating context. |
| Five service families and their summaries | `/services` and the existing service detail routes | Detailed service records remain in `app/data/site.ts`; AI Solutions remains at `/services/ai-automation`. |
| Six industries and descriptions | `/industries` | All shared industry records remain unchanged, including Aviation. |
| Seven solution families | `/solutions` | All descriptions and contextual service links remain unchanged. `SolutionsCarousel` is retained in the codebase. |
| Dawood RCC Pipe and Dawood Traders summaries | `/work` and `/work/[slug]` | Existing project data and case studies remain unchanged. |
| Technology platform references | Existing service detail pages | Their platform references remain. The homepage-only `TechnologyEcosystem` composition and shared category data are retained in their original files. |
| Four-step operating approach: Understand, Design, Implement, Operate | Exact wording preserved in the archived homepage source | Candidate destination: `/company`. The new AI Solutions page has its own distinct five-stage approach; it is not an exact replacement. Owner review required before moving the four-step presentation. |
| Five-layer engineering model and tags | `app/components/EngineeringModel.tsx` and `engineeringLayers` in `app/data/site.ts` | Unique diagram content remains in the codebase. Candidate destination: `/services`, subject to owner review; no dedicated page was modified. |
| Operating context, Connected capability, Ongoing ownership, Documented decisions | Exact headings and descriptions preserved in the archived homepage source | Candidate destination: `/company`. Related principles appear in company copy, but the four-item presentation has not been migrated or silently discarded. |
| Previous section introductions and framing copy | Exact text preserved in the archived homepage source | Candidate destinations: the corresponding Services, Industries, Solutions, Work, or Company pages if further editorial review finds value. |

The new public homepage uses the five sections and wording supplied in the minimal corporate homepage brief. Existing homepage metadata, canonical routing, Organization structured data, and WebSite structured data are retained.

No approved reference image was present in the provided attachment directory. Implementation follows the written section, copy, layout, and branding requirements; exact screenshot matching remains unverified.
