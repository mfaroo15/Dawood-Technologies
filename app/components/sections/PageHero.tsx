import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import styles from "./PageHero.module.css";
import typography from "./typography.module.css";

type Crumb = { label: string; href?: string };
type HeroButton = { label: string; href: string; variant?: "primary" | "secondary" };

type PageHeroProps = {
  kicker?: string;
  /** Blue label shown above the title, e.g. an industry. */
  tag?: string;
  title: string;
  /** Allow a longer title per line, for sentence-length titles. */
  wideTitle?: boolean;
  lead?: string;
  /** The last item is the current page. */
  breadcrumb?: Crumb[];
  buttons?: HeroButton[];
  /** Extra content rendered on the dark background below the title block. */
  children?: ReactNode;
};

// Dark hero for every page except the homepage.
export function PageHero({ kicker, tag, title, wideTitle, lead, breadcrumb, buttons, children }: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className="container">
        {breadcrumb?.length ? (
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <ol>
              {breadcrumb.map((crumb, index) => {
                const current = index === breadcrumb.length - 1;
                return (
                  <li key={crumb.label}>
                    {current ? <span aria-current="page">{crumb.label}</span> : crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : crumb.label}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}
        {kicker ? <p className={typography.kickerOnDark}>{kicker}</p> : null}
        {tag ? <p className={styles.tag}><span className={typography.tag}>{tag}</span></p> : null}
        <h1 className={`${styles.title} ${wideTitle ? styles.wide : ""}`}>{title}</h1>
        {lead ? <p className={styles.lead}>{lead}</p> : null}
        {buttons?.length ? (
          <div className={styles.actions}>
            {buttons.map((button) => (
              <Link key={button.href} href={button.href} className={button.variant === "secondary" ? styles.secondary : styles.primary}>
                {button.label} <ArrowUpRight aria-hidden="true" size={17} />
              </Link>
            ))}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
