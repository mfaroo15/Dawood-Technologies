import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { JumpPills, type JumpPill } from "./JumpPills";
import styles from "./PageHero.module.css";
import typography from "./typography.module.css";

/** Same shape as BreadcrumbStructuredData items, so a page can pass one list to both. */
type Crumb = { name: string; path: string };
type HeroButton = { label: string; href: string; variant?: "primary" | "secondary" };

type PageHeroProps = {
  /** Home first; the last item is the current page. */
  breadcrumb: readonly Crumb[];
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Jump links to sections on this page (each id must exist on the page), or links to other pages. */
  pills?: readonly JumpPill[];
  /** Accessible name for the pill row; defaults to "On this page". */
  pillsLabel?: string;
  buttons?: readonly HeroButton[];
};

// Centered dark header shared by every page except the homepage.
export function PageHero({ breadcrumb, eyebrow, title, lead, pills, pillsLabel, buttons }: PageHeroProps) {
  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.inner}`}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <ol>
              {breadcrumb.map((crumb, index) => (
                <li key={crumb.path}>
                  {index === breadcrumb.length - 1 ? <span aria-current="page">{crumb.name}</span> : <Link href={crumb.path}>{crumb.name}</Link>}
                </li>
              ))}
            </ol>
          </nav>
          {eyebrow ? <p className={typography.kickerOnDark}>{eyebrow}</p> : null}
          <h1 className={styles.title}>{title}</h1>
          {lead ? <p className={styles.lead}>{lead}</p> : null}
          {buttons?.length ? (
            <div className={styles.actions}>
              {buttons.map((button) => (
                <Link key={button.href} href={button.href} className={button.variant === "secondary" ? styles.secondary : styles.primary}>
                  {button.label} {button.href.startsWith("#") ? <ArrowDown aria-hidden="true" size={17} /> : <ArrowUpRight aria-hidden="true" size={17} />}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>
      {pills?.length ? <JumpPills items={pills} label={pillsLabel} /> : null}
    </>
  );
}
