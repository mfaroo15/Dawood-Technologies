"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./JumpPills.module.css";

/** `id` jumps to a section on this page; `href` links to another page instead. */
export type JumpPill = { label: string } & ({ id: string; href?: never } | { href: string; id?: never });

// Width of the edge fades in JumpPills.module.css; a pill under a fade counts as out of view.
const FADE = 40;

const scrollBehavior = (): ScrollBehavior => (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");

// Sticky row of pills below the page header. Each pill jumps to a section by id and
// the pill for the section currently in view is highlighted. Pills with an href are plain page links.
export function JumpPills({ items, label = "On this page" }: { items: readonly JumpPill[]; label?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [more, setMore] = useState({ start: false, end: false });
  const barRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  // Targets that sit side by side (grid columns) share a top edge, so clicking one may not scroll
  // the page at all; the clicked pill is activated directly and preferred among tied targets.
  const clicked = useRef<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      // A section is active once its top passes just below the sticky bar.
      const line = (barRef.current?.getBoundingClientRect().bottom ?? 0) + 24;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current: string | null = null;
      let currentTop = -Infinity;
      for (const { id } of items) {
        if (!id) continue;
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top === undefined) continue;
        // At the bottom of the page the last targets can't reach the line, so anything on screen counts.
        if ((top <= line || (atBottom && top < window.innerHeight)) && top > currentTop + 1) { current = id; currentTop = top; }
      }
      const preferred = clicked.current ? document.getElementById(clicked.current)?.getBoundingClientRect().top : undefined;
      if (current && preferred !== undefined && Math.abs(preferred - currentTop) <= 1) current = clicked.current;
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  // Track whether the row has hidden pills on either side, for the edge fades and arrows.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const update = () => {
      const start = scroller.scrollLeft > 1;
      const end = scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 1;
      setMore((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
    };
    update();
    scroller.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(scroller);
    if (scroller.firstElementChild) observer.observe(scroller.firstElementChild);
    return () => {
      scroller.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  // When the row overflows, bring the active pill clear of the fades without moving the page.
  useEffect(() => {
    const scroller = scrollerRef.current;
    const pill = active ? scroller?.querySelector<HTMLElement>(`a[href="#${active}"]`) : null;
    if (!scroller || !pill) return;
    const left = pill.getBoundingClientRect().left - scroller.getBoundingClientRect().left + scroller.scrollLeft;
    const right = left + pill.offsetWidth;
    if (left < scroller.scrollLeft + FADE || right > scroller.scrollLeft + scroller.clientWidth - FADE) {
      scroller.scrollTo({ left: left - (scroller.clientWidth - pill.offsetWidth) / 2, behavior: scrollBehavior() });
    }
  }, [active]);

  const page = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (scroller) scroller.scrollBy({ left: direction * scroller.clientWidth * 0.7, behavior: scrollBehavior() });
  };

  return (
    <nav ref={barRef} className={styles.bar} aria-label={label}>
      <div className={styles.track} data-more-start={more.start || undefined} data-more-end={more.end || undefined}>
        <div ref={scrollerRef} className={styles.scroller}>
          <ul className={styles.pills}>
            {items.map((item) => (
              <li key={item.id ?? item.href}>
                {item.id === undefined ? <Link className={styles.pill} href={item.href}>{item.label}</Link> : (
                  <a className={styles.pill} href={`#${item.id}`} aria-current={active === item.id ? "true" : undefined} onClick={() => { clicked.current = item.id; setActive(item.id); }}>{item.label}</a>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* Pointer shortcuts only; keyboard users reach every pill with Tab, which scrolls the row itself. */}
        <button type="button" className={`${styles.arrow} ${styles.prev}`} aria-hidden="true" tabIndex={-1} onClick={() => page(-1)}><ChevronLeft size={18} /></button>
        <button type="button" className={`${styles.arrow} ${styles.next}`} aria-hidden="true" tabIndex={-1} onClick={() => page(1)}><ChevronRight size={18} /></button>
      </div>
    </nav>
  );
}
