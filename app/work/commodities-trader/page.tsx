import { CaseStudyPage, caseStudyMetadata } from "@/app/components/work/CaseStudyPage";
import { caseStudies } from "@/app/data/case-studies";

const study = caseStudies[1];

export const metadata = caseStudyMetadata(study);

export default function CommoditiesTraderPage() {
  return <CaseStudyPage study={study} />;
}
