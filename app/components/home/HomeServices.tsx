import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/app/components/ButtonLink";
import { Reveal } from "@/app/components/sections/Reveal";
import typography from "@/app/components/sections/typography.module.css";
import { serviceCards } from "@/app/data/service-cards";
import { ServiceExplorer } from "./ServiceExplorer";
import styles from "./ServiceExplorer.module.css";

const newSlug = "ai-automation";
const defaultSlug = "application-development";

// Rendered here so the service data and icons stay out of the browser bundle: the interactive part receives finished output.
export function HomeServices() {
  const services = serviceCards.filter((card) => card.onHome).map(({ slug, title, text, href, icon: Icon }) => ({
    slug,
    title,
    text,
    href,
    icon: <Icon aria-hidden="true" size={22} strokeWidth={1.75} />,
    isNew: slug === newSlug,
  }));

  return (
    <section className={styles.section} aria-labelledby="home-services-title">
      <Reveal className="container">
        <ServiceExplorer services={services} defaultSlug={defaultSlug}>
          <p className={typography.kicker}>What we do</p>
          <h2 className={typography.heading} id="home-services-title">Everything your business runs on, from one team.</h2>
          <p className={`${typography.intro} ${styles.intro}`}>From the first website to the systems behind daily operations, one team designs, builds and supports it.</p>
          <ButtonLink href="/contact" variant="primary">Talk to an expert <ArrowUpRight size={17} aria-hidden="true" /></ButtonLink>
        </ServiceExplorer>
      </Reveal>
    </section>
  );
}
