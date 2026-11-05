"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState, type ReactNode } from "react";
import styles from "./ServiceExplorer.module.css";

type Service = { slug: string; title: string; text: string; href: string; icon: ReactNode; isNew: boolean };

const Badge = () => <span className={styles.badge}>New</span>;

// Interactive list. With a mouse from 1024px, hovering or focusing a row updates the sticky detail card.
// Touch screens and narrower layouts never see that card: each row shows its own tagline instead (see the CSS).
export function ServiceExplorer({ services, defaultSlug, children }: { services: Service[]; defaultSlug: string; children: ReactNode }) {
  const [activeSlug, setActiveSlug] = useState(defaultSlug);
  const active = services.find((service) => service.slug === activeSlug) ?? services[0];

  return (
    <div className={styles.layout}>
      <div className={styles.side}>
        {children}
        <div className={styles.detail} aria-live="polite">
          {/* The longest entry sets the card's height, so changing service never moves the layout. */}
          {services.map((service) => (
            <div className={styles.sizer} key={service.slug} aria-hidden="true">
              <div className={styles.detailHead}><span className={styles.tile}>{service.icon}</span><p className={styles.detailTitle}>{service.title}{service.isNew ? <Badge /> : null}</p></div>
              <p className={styles.detailText}>{service.text}</p>
              <span className={styles.detailLink}>Explore service</span>
            </div>
          ))}
          <div className={styles.panel} key={active.slug}>
            <div className={styles.detailHead}><span className={styles.tile}>{active.icon}</span><p className={styles.detailTitle}>{active.title}{active.isNew ? <Badge /> : null}</p></div>
            <p className={styles.detailText}>{active.text}</p>
            <Link className={styles.detailLink} href={active.href}>Explore service<span className="visually-hidden">: {active.title}</span> <ArrowRight aria-hidden="true" size={16} /></Link>
          </div>
        </div>
      </div>

      <ul className={styles.list}>
        {services.map((service, index) => (
          <li key={service.slug}>
            <Link
              className={styles.row}
              data-active={service.slug === active.slug}
              href={service.href}
              onMouseEnter={() => setActiveSlug(service.slug)}
              onFocus={() => setActiveSlug(service.slug)}
            >
              <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div className={styles.rowBody}>
                <div className={styles.rowTitle}><h3 className={styles.title}>{service.title}</h3>{service.isNew ? <Badge /> : null}</div>
                <p className={styles.tagline}>{service.text}</p>
              </div>
              <ArrowUpRight className={styles.arrow} aria-hidden="true" size={22} strokeWidth={1.75} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
