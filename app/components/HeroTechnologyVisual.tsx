"use client";

import Image from "next/image";
import { ChartNoAxesCombined, Cpu, Database, Link2, Settings } from "lucide-react";
import { useRef, useState, useSyncExternalStore } from "react";
import styles from "./HeroTechnologyVisual.module.css";

const motionQuery = "(min-width: 64.001em) and (prefers-reduced-motion: no-preference)";
function subscribe(onChange: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
function canAnimate() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return window.matchMedia(motionQuery).matches && !connection?.saveData;
}

export function HeroTechnologyVisual() {
  const animated = useSyncExternalStore(subscribe, canAnimate, () => false);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [ready, setReady] = useState(false);

  async function togglePlayback() {
    if (!video.current) return;
    if (video.current.paused) {
      try { await video.current.play(); } catch { setPlaying(false); }
    } else video.current.pause();
  }

  return <div className={styles.visual} data-playing={animated && playing}>
    <div className={styles.scene} aria-hidden="true">
      <Image className={styles.poster} src="/hero/technology-globe-poster.webp" alt="" width={1000} height={900} sizes="(max-width: 64em) 100vw, (max-width: 2020px) 52vw, 1050px" />
      {animated && <video className={styles.video} data-ready={ready} ref={video} autoPlay muted loop playsInline preload="metadata" poster="/hero/technology-globe-poster.webp" onPlaying={() => { setReady(true); setPlaying(true); }} onPause={() => setPlaying(false)} onError={() => { setReady(false); setPlaying(false); }}>
        <source src="/hero/technology-globe.webm" type="video/webm" />
        <source src="/hero/technology-globe.mp4" type="video/mp4" />
      </video>}
    </div>
    <ul className={styles.panels} aria-label="Connected technology capabilities">
      <li className={styles.data}><span>Data</span><span className={styles.icon} aria-hidden="true"><Database size={22} strokeWidth={1.5} /></span></li>
      <li className={styles.ai}><span>AI</span><span className={styles.icon} aria-hidden="true"><Cpu size={22} strokeWidth={1.5} /></span></li>
      <li className={styles.automation}><span>Automation</span><span className={styles.icon} aria-hidden="true"><Settings size={22} strokeWidth={1.5} /></span></li>
      <li className={styles.integration}><span>Integration</span><span className={styles.icon} aria-hidden="true"><Link2 size={22} strokeWidth={1.5} /></span></li>
      <li className={styles.outcomes}><span>Business Outcomes</span><span className={styles.icon} aria-hidden="true"><ChartNoAxesCombined size={22} strokeWidth={1.5} /></span></li>
    </ul>
    {animated && <button className={styles.control} type="button" onClick={togglePlayback} aria-label={playing ? "Pause hero animation" : "Play hero animation"}>{playing ? "Pause animation" : "Play animation"}</button>}
  </div>;
}
