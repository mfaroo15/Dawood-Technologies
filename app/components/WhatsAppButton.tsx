"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./WhatsAppButton.module.css";

const whatsappUrl = "https://wa.me/923323132729?text=Hi%20Dawood%20Technologies%2C%20I%27d%20like%20to%20discuss%20a%20project.";

type Display = "full" | "circle" | "hidden";

const overlaps = (a: DOMRect, b: DOMRect) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

// Floating chat button on every page. The official glyph-only logo sits on a white circle,
// scaled only (a lossless 96px copy of the original in public/brand): no recoloring or cropping.
// It skips the image optimizer because lossy re-encoding shifts the brand green. The link's aria-label names it, so alt is empty.
//
// Elements marked data-wa-avoid must stay usable: over them the label steps aside, and if the circle
// would cover them too, the whole button does. data-wa-avoid="children" checks each child separately,
// for a row whose box is wider than what it holds.
export function WhatsAppButton() {
  const [display, setDisplay] = useState<Display>("full");
  const label = useRef<HTMLSpanElement>(null);
  const circle = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!label.current || !circle.current) return;
      const labelBox = label.current.getBoundingClientRect();
      const circleBox = circle.current.getBoundingClientRect();
      let next: Display = "full";
      const avoid = [...document.querySelectorAll("[data-wa-avoid]")].flatMap((element) => (element.getAttribute("data-wa-avoid") === "children" ? [...element.children] : [element]));
      for (const element of avoid) {
        // Measuring a section the browser is skipping would force it to render. It is off screen anyway.
        if (element.checkVisibility?.({ contentVisibilityAuto: true }) === false) continue;
        const box = element.getBoundingClientRect();
        if (overlaps(circleBox, box)) {
          next = "hidden";
          break;
        }
        if (overlaps(labelBox, box)) next = "circle";
      }
      setDisplay(next);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Page content can change height after load, such as when the booking calendar appears.
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <aside aria-label="Contact shortcut">
      <a className={styles.button} data-display={display} href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Message us on WhatsApp">
        <span ref={label} className={styles.label} aria-hidden="true">Message us</span>
        <span ref={circle} className={styles.circle}>
          <Image className={styles.logo} src="/brand/whatsapp-logo-96.png" alt="" width={34} height={34} unoptimized />
        </span>
      </a>
    </aside>
  );
}
