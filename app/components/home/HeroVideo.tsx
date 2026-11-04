"use client";

import { getImageProps } from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./HeroVideo.module.css";

// Phones get a portrait crop; tablets, iPads, laptops and desktops get the 16:9 cut.
const MOBILE = "(max-width: 767px)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

type Variant = "mobile" | "desktop" | "off";
type NetworkInformationLike = EventTarget & { saveData?: boolean };
const connection = () => (navigator as Navigator & { connection?: NetworkInformationLike }).connection;

const SOURCES = {
  mobile: { webm: "/hero/hero-mobile.webm", mp4: "/hero/hero-mobile.mp4" },
  desktop: { webm: "/hero/hero.webm", mp4: "/hero/hero.mp4" },
} as const;

// WebKit (Safari, and every browser on iPhone and iPad) can report that it plays WebM, then never load
// it and never fall back, so it gets the MP4 first. Other browsers get the smaller WebM first.
const prefersMp4 = () => /Apple/.test(navigator.vendor);

function subscribe(onChange: () => void) {
  const queries = [window.matchMedia(MOBILE), window.matchMedia(REDUCED_MOTION)];
  queries.forEach((mql) => mql.addEventListener("change", onChange));
  connection()?.addEventListener("change", onChange);
  return () => {
    queries.forEach((mql) => mql.removeEventListener("change", onChange));
    connection()?.removeEventListener("change", onChange);
  };
}

// Only reduced motion and Data Saver skip the video; the poster then stays on its own.
function getSnapshot(): Variant {
  if (window.matchMedia(REDUCED_MOTION).matches || connection()?.saveData) return "off";
  return window.matchMedia(MOBILE).matches ? "mobile" : "desktop";
}
const getServerSnapshot = (): Variant => "off";

// HTMLMediaElement.HAVE_CURRENT_DATA: a frame is available to show.
const HAVE_CURRENT_DATA = 2;

// The poster renders on the server so it paints immediately and is the LCP image.
// Art direction: <picture> downloads only the source matching the viewport, so eager
// loading is safe here (getImageProps would otherwise default to lazy).
function HeroPoster() {
  const common = { alt: "", sizes: "100vw", fetchPriority: "high" as const, loading: "eager" as const };
  const { props: { srcSet: desktop } } = getImageProps({ ...common, src: "/hero/hero-poster.webp", width: 1920, height: 1080 });
  const { props: { srcSet: mobile, ...rest } } = getImageProps({ ...common, src: "/hero/hero-mobile.webp", width: 720, height: 1280 });
  return <picture className={styles.layer}>
    <source media={MOBILE} srcSet={mobile} />
    <source media="(min-width: 768px)" srcSet={desktop} />
    {/* eslint-disable-next-line jsx-a11y/alt-text -- alt="" (decorative) comes from getImageProps */}
    <img {...rest} className={styles.media} />
  </picture>;
}

export function HeroVideo() {
  const variant = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [playing, setPlaying] = useState<Variant | null>(null);
  const ref = useRef<HTMLVideoElement>(null);
  const playAccepted = useRef(false);

  const reveal = () => {
    if (variant !== "off") setPlaying(variant);
  };

  // Pause while the hero is off screen and resume when it scrolls back into view.
  // If autoplay is refused (e.g. iPhone Low Power Mode) the poster simply stays.
  useEffect(() => {
    const video = ref.current;
    if (variant === "off" || !video) return;
    playAccepted.current = false;

    // iOS Safari only allows autoplay for videos that are muted and inline when play() is called.
    // React sets `muted` as a property only, so the attributes are set here as well.
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("autoplay", "");

    const start = () => {
      video.play().then(() => {
        playAccepted.current = true;
        if (video.readyState >= HAVE_CURRENT_DATA) setPlaying(variant);
      }).catch(() => {
        // Refused or interrupted: keep showing the poster.
      });
    };

    if (!("IntersectionObserver" in window)) {
      start();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [variant]);

  return <>
    <HeroPoster />
    {variant !== "off" && <video
      // A new key reloads the element when the viewport crosses 768px, so the matching file loads.
      key={variant}
      ref={ref}
      className={`${styles.layer} ${styles.media} ${styles.video} ${playing === variant ? styles.visible : ""}`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
      // Browsers differ in which of these fire first, so any sign of real playback reveals the video.
      onPlaying={reveal}
      onTimeUpdate={(event) => { if (event.currentTarget.currentTime > 0) reveal(); }}
      onLoadedData={() => { if (playAccepted.current) reveal(); }}
      onCanPlay={() => { if (playAccepted.current) reveal(); }}
    >
      {prefersMp4() ? <source src={SOURCES[variant].mp4} type="video/mp4" /> : null}
      <source src={SOURCES[variant].webm} type="video/webm" />
      {prefersMp4() ? null : <source src={SOURCES[variant].mp4} type="video/mp4" />}
    </video>}
  </>;
}
