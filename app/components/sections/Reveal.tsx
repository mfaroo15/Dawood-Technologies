"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import styles from "./Reveal.module.css";

type RevealProps = {
  as?: "div" | "section" | "ul" | "ol";
  className?: string;
  /** "rise" moves the whole block; "stagger" fades its direct children in one after another. */
  variant?: "rise" | "stagger";
  children: ReactNode;
};

// Content renders visible. Only a block that starts below the viewport is hidden,
// and only when IntersectionObserver is available and motion is allowed.
export function Reveal({ as = "div", className, variant = "rise", children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let first = true;
    const observer = new IntersectionObserver(([entry]) => {
      if (first) {
        first = false;
        if (entry.isIntersecting) { observer.disconnect(); return; }
        el.dataset.reveal = "pending";
        return;
      }
      if (entry.isIntersecting) { el.dataset.reveal = "shown"; observer.disconnect(); }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as ElementType;
  return <Tag ref={ref} className={[styles[variant], className].filter(Boolean).join(" ")}>{children}</Tag>;
}
