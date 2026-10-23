"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./CapabilityShowcase.module.css";

export type Capability = {
  title: string;
  description: string;
  href: string;
  image: string;
};

export default function CapabilityShowcase({ items }: { items: Capability[] }) {
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % items.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [items.length]);

  return (
    <div
      className={styles.showcase}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className={styles.media} aria-hidden="true">
        {items.map((item, i) => (
          <Image
            key={item.href}
            src={item.image}
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            priority={i === 0}
            className={`${styles.image} ${i === active ? styles.imageActive : ""}`}
          />
        ))}
      </div>

      <ul className={styles.list}>
        {items.map((item, i) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`${styles.item} ${i === active ? styles.itemActive : ""}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => {
                paused.current = true;
                setActive(i);
              }}
              onBlur={() => (paused.current = false)}
            >
              <span className={styles.title}>
                {item.title}
                <span className={styles.arrow} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </span>
              </span>
              <span className={styles.description}>{item.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
