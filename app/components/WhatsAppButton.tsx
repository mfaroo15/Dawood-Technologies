"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { WhatsAppLink } from "@/app/components/WhatsAppLink";
import styles from "./WhatsAppButton.module.css";

// Everything here is decided by IntersectionObservers: nothing runs while scrolling, and a change in the
// browser's toolbar height can't flip a decision, because each one has two boundaries further apart than that change.
// Wider than a 200px swing, about twice what Safari's toolbars add or remove.
const HYSTERESIS = 220;
// The floating button starts to leave this far before the footer's last row comes on screen. Also more than the
// toolbars' change, so they can't reveal the row while it is still showing.
const HANDOVER_BUFFER = 120;

type Box = { top: number; right: number; bottom: number; left: number };

const percent = (value: number, of: number) => `${(value / of) * 100}%`;

// The viewport cut down to one box. Percentages keep it in about the same place if the toolbars change the height.
function rootMargin(box: Box, grow: number) {
  return [
    percent(grow - box.top, window.innerHeight),
    percent(box.right - window.innerWidth, window.innerWidth),
    percent(grow - (window.innerHeight - box.bottom), window.innerHeight),
    percent(-box.left, window.innerWidth),
  ].join(" ");
}

// Reports whether any of the elements is over the box: true once one touches it,
// false only once they are all HYSTERESIS clear of it.
function watchOverlap(elements: Element[], box: Box, onChange: (over: boolean) => void) {
  const over = new Set<Element>();
  const enter = new IntersectionObserver((entries) => {
    for (const entry of entries) if (entry.isIntersecting) over.add(entry.target);
    onChange(over.size > 0);
  }, { rootMargin: rootMargin(box, 0) });
  const leave = new IntersectionObserver((entries) => {
    for (const entry of entries) if (!entry.isIntersecting) over.delete(entry.target);
    onChange(over.size > 0);
  }, { rootMargin: rootMargin(box, HYSTERESIS) });
  for (const element of elements) {
    enter.observe(element);
    leave.observe(element);
  }
  return () => {
    enter.disconnect();
    leave.disconnect();
  };
}

// The floating button. Near the end of the page it hands over to the static copy in the footer's last row.
//
// Elements marked data-wa-avoid must stay usable, so the button hides while over them.
// Over the children of data-wa-avoid="children" (the hero's buttons) only the label steps aside.
export function WhatsAppButton() {
  const pathname = usePathname();
  const [nearFooter, setNearFooter] = useState(false);
  const [overContent, setOverContent] = useState(false);
  const [overButtons, setOverButtons] = useState(false);
  const label = useRef<HTMLDivElement>(null);

  // The marker is the 220px of empty space directly above the footer's last row. Taking over when all of it is on
  // screen and handing back when none of it is keeps the two boundaries HYSTERESIS apart, with one observer.
  useEffect(() => {
    const marker = document.querySelector("[data-wa-footer-marker]");
    if (!marker) return;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[entries.length - 1];
      if (entry.intersectionRatio >= 0.99) setNearFooter(true);
      else if (!entry.isIntersecting && entry.rootBounds) setNearFooter(entry.boundingClientRect.top < entry.rootBounds.bottom);
    }, { rootMargin: `0px 0px ${HANDOVER_BUFFER}px 0px`, threshold: [0, 0.99] });
    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-wa-footer", nearFooter);
    return () => document.documentElement.removeAttribute("data-wa-footer");
  }, [nearFooter]);

  // Each page has its own elements to avoid. The boxes are measured once, and again only if the width changes.
  useEffect(() => {
    const link = label.current?.firstElementChild;
    if (!link) return;
    let stop = () => {};
    const start = () => {
      stop();
      const button = link.getBoundingClientRect();
      const pill = link.firstElementChild!.getBoundingClientRect();
      const stopContent = watchOverlap([...document.querySelectorAll("[data-wa-avoid]:not([data-wa-avoid='children'])")], button, setOverContent);
      const stopButtons = watchOverlap([...document.querySelectorAll("[data-wa-avoid='children'] > *")], pill, setOverButtons);
      stop = () => {
        stopContent();
        stopButtons();
      };
    };
    let width = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      start();
    };
    start();
    window.addEventListener("resize", onResize);
    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      setOverContent(false);
      setOverButtons(false);
    };
  }, [pathname]);

  const hidden = nearFooter || overContent;
  return (
    <aside aria-label="Contact shortcut">
      <div ref={label} className={styles.floatingWrap}>
        <WhatsAppLink
          className={styles.floating}
          data-display={hidden ? "hidden" : overButtons ? "circle" : "full"}
          aria-hidden={hidden ? true : undefined}
          tabIndex={hidden ? -1 : undefined}
        />
      </div>
    </aside>
  );
}
