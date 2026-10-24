"use client";

import { useEffect } from "react";

// Content renders visible. Only elements that start below the viewport are hidden,
// and only when IntersectionObserver is available and motion is allowed.
export function ScrollReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const seen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (!seen.has(el)) {
          seen.add(el);
          if (entry.isIntersecting) { observer.unobserve(el); continue; }
          el.dataset.reveal = "pending";
          continue;
        }
        if (entry.isIntersecting) { el.dataset.reveal = "shown"; observer.unobserve(el); }
      }
    });
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return null;
}
