"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./AiSpotlight.module.css";

const messages = [
  { from: "user", text: "Can you build an inventory system for our warehouse?" },
  { from: "bot", text: "Yes. We build ERP and inventory systems for manufacturers and traders. Would you like to book a free 30-minute call?", chips: ["Book a call", "Talk to the team"] },
  { from: "user", text: "Book a call" },
  { from: "system", text: "✓ Call booked for Tue 10:00 AM · Team notified" },
] as const;

// Each frame shows a number of messages, optionally with the typing indicator.
const frames = messages.flatMap((message, index) => (message.from === "bot" ? [{ count: index, typing: true }, { count: index + 1, typing: false }] : [{ count: index + 1, typing: false }]));
const stepMs = 700;

// Decorative chat mockup. Every message renders on the server; the sequence only
// plays when IntersectionObserver is available and motion is allowed.
export function ChatDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState<{ count: number; typing: boolean } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers: number[] = [];
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) { setFrame((current) => current ?? { count: 0, typing: false }); return; }
      observer.disconnect();
      setFrame({ count: 0, typing: false });
      frames.forEach((next, i) => timers.push(window.setTimeout(() => setFrame(next), (i + 1) * stepMs)));
      timers.push(window.setTimeout(() => setFrame(null), (frames.length + 1) * stepMs));
    }, { threshold: 0.35 });
    observer.observe(el);
    return () => { observer.disconnect(); timers.forEach(window.clearTimeout); };
  }, []);

  const shown = frame ? messages.slice(0, frame.count) : messages;

  return (
    <div ref={ref} className={styles.chat} aria-hidden="true">
      <div className={styles.chatHeader}>
        <span className={styles.avatar}><Sparkles size={18} /></span>
        <span>
          <span className={styles.chatName}>Dawood Assistant</span>
          <span className={styles.online}>● Online</span>
        </span>
      </div>
      <div className={styles.thread}>
        {shown.map((message) => (
          <div key={message.text} className={`${styles.message} ${styles[message.from]}`}>
            <p>{message.text}</p>
            {"chips" in message ? <div className={styles.chips}>{message.chips.map((chip) => <span key={chip}>{chip}</span>)}</div> : null}
          </div>
        ))}
        {frame?.typing ? <div className={`${styles.message} ${styles.bot} ${styles.typing}`}><span /><span /><span /></div> : null}
      </div>
      <div className={styles.input}>Type a message…</div>
    </div>
  );
}
