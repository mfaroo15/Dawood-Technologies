"use client";

import { Children, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./SolutionsCarousel.module.css";

export function SolutionsCarousel({ children }: { children: ReactNode }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const total = Children.count(children);
  const [position, setPosition] = useState({ index: 0, visible: 4 });
  const lastIndex = Math.max(0, total - position.visible);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const measure = () => {
      const visible = Number(getComputedStyle(viewport).getPropertyValue("--carousel-visible")) || 1;
      const card = viewport.firstElementChild as HTMLElement | null;
      const step = (card?.getBoundingClientRect().width ?? 0) + parseFloat(getComputedStyle(viewport).columnGap || "0");
      const index = step ? Math.min(Math.max(0, Math.round(viewport.scrollLeft / step)), Math.max(0, total - visible)) : 0;
      setPosition((current) => current.index === index && current.visible === visible ? current : { index, visible });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    viewport.addEventListener("scroll", measure, { passive: true });
    measure();
    return () => {
      observer.disconnect();
      viewport.removeEventListener("scroll", measure);
    };
  }, [total]);

  const navigate = (index: number) => {
    const viewport = viewportRef.current;
    const card = viewport?.firstElementChild;
    if (!viewport || !card) return;
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(viewport).columnGap || "0");
    viewport.scrollTo({
      left: Math.max(0, Math.min(lastIndex, index)) * step,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const destinations: Record<string, number> = {
      ArrowLeft: position.index - 1,
      ArrowRight: position.index + 1,
      Home: 0,
      End: lastIndex,
    };
    if (event.key in destinations) {
      event.preventDefault();
      navigate(destinations[event.key]);
    }
  };

  return <div className={styles.carousel} role="region" aria-roledescription="carousel" aria-label="Business technology solutions">
    <div className={styles.viewport} id="home-solutions-carousel" ref={viewportRef} tabIndex={0} onKeyDown={onKeyDown} aria-label="Solution cards. Use left and right arrow keys to navigate.">
      {children}
    </div>
    <div className={styles.controls}>
      <div className={styles.pagination} role="group" aria-label="Choose carousel position">
        {Array.from({ length: lastIndex + 1 }, (_, index) => <button key={index} type="button" className={styles.dot} aria-label={`Show solutions ${index + 1} through ${Math.min(index + position.visible, total)}`} aria-current={position.index === index ? "true" : undefined} aria-controls="home-solutions-carousel" onClick={() => navigate(index)} />)}
      </div>
      <div className={styles.arrows}>
        <button className={styles.arrow} type="button" aria-label="Previous solutions" aria-controls="home-solutions-carousel" disabled={position.index === 0} onClick={() => navigate(position.index - 1)}><ArrowLeft size={20} aria-hidden="true" /></button>
        <button className={styles.arrow} type="button" aria-label="Next solutions" aria-controls="home-solutions-carousel" disabled={position.index === lastIndex} onClick={() => navigate(position.index + 1)}><ArrowRight size={20} aria-hidden="true" /></button>
      </div>
    </div>
    <p className="visually-hidden" aria-live="polite" aria-atomic="true">Showing solutions {position.index + 1} through {Math.min(position.index + position.visible, total)} of {total}.</p>
  </div>;
}
