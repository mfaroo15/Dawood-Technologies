import type { ReactNode } from "react";

type InnerHeroProps = { kicker: string; title: string; intro: string; aside?: ReactNode; compact?: boolean };

export function InnerHero({ kicker, title, intro, aside, compact = false }: InnerHeroProps) {
  return (
    <section className="inner-hero">
      <div className={`container inner-hero-grid${compact ? " editorial-pair" : ""}`}>
        <div><p className="kicker">{kicker}</p><h1>{title}</h1></div>
        <div className="inner-hero-copy"><p>{intro}</p>{aside}</div>
      </div>
    </section>
  );
}
