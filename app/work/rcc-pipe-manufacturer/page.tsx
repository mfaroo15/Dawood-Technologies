import { CaseStudyPage, caseStudyMetadata } from "@/app/components/work/CaseStudyPage";
import { caseStudies } from "@/app/data/case-studies";

const study = caseStudies[0];

export const metadata = caseStudyMetadata(study);

export default function RccPipeManufacturerPage() {
  return <CaseStudyPage study={study} />;
}
