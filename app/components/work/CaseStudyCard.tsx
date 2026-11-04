import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudyStatus, type CaseStudy } from "@/app/data/case-studies";
import { DashboardMock } from "./DashboardMock";
import { Chips, StatusLine } from "./WorkBits";
import styles from "./CaseStudyCard.module.css";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className={styles.card}>
      <DashboardMock visual={study.visual} />
      <div className={styles.body}>
        <p className={styles.label}>{study.label}</p>
        <h3 className={styles.title}>{study.title}</h3>
        <p className={styles.text}>{study.text}</p>
        <Chips items={study.chips} />
        <div className={styles.footer}>
          <StatusLine>{caseStudyStatus}</StatusLine>
          <Link className={styles.link} href={`/work/${study.slug}`}>Read case study<span className="visually-hidden">: {study.title}</span> <ArrowRight aria-hidden="true" size={16} /></Link>
        </div>
      </div>
    </article>
  );
}
