"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useRef, useState } from "react";
import styles from "./BookingCalendar.module.css";

const NAMESPACE = "intro-call";
const NEAR_VIEWPORT = "600px";
// If Cal.com never reports ready, stop reserving space anyway.
const READY_FALLBACK_MS = 10_000;

export default function BookingCalendar() {
  const frame = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);

  // Load Cal.com only once the booking section is close to the screen.
  useEffect(() => {
    const element = frame.current;
    if (!element || !("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      setNear(true);
    }, { rootMargin: NEAR_VIEWPORT });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!near) return;
    let active = true;
    const fallback = window.setTimeout(() => setReady(true), READY_FALLBACK_MS);
    (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      if (!active) return;
      cal("on", { action: "linkReady", callback: () => setReady(true) });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#1268e8" },
          dark: { "cal-brand": "#4aa6ff" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
    return () => {
      active = false;
      window.clearTimeout(fallback);
    };
  }, [near]);

  return (
    <div ref={frame} className={ready ? styles.frame : `${styles.frame} ${styles.reserved}`}>
      {near ? (
        <Cal
          namespace={NAMESPACE}
          calLink="dawood-technologies/intro-call"
          style={{ width: "100%", height: "100%", overflow: "auto" }}
          config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
        />
      ) : (
        <p className={styles.loading} role="status">Loading the booking calendar…</p>
      )}
    </div>
  );
}
