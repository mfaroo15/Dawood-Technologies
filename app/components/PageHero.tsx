import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  text: string;
  children?: ReactNode;
  compact?: boolean;
};

export function PageHero({ eyebrow, title, text, children, compact = false }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className={`container page-hero-inner${compact ? " editorial-pair" : ""}`}>
        <div>
          <div className="eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
        </div>
        <div className="page-hero-copy">
          <p>{text}</p>
          {children ? <div className="actions">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
