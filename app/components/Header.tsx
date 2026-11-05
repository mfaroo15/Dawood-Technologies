"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore, type MouseEvent } from "react";
import { MobileNavigation } from "@/app/components/MobileNavigation";
import { navLinks } from "@/app/data/navigation";
import { logoImageSize, logoLoader } from "@/app/lib/logo-image";

// The homepage header is transparent over the hero until the page scrolls past this point.
const SOLID_AFTER = 40;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
const getScrolled = () => window.scrollY > SOLID_AFTER;
const getServerScrolled = () => false;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrolled, getServerScrolled);
  const isHome = pathname === "/";
  // Transparent only on the homepage, at the top, with the mobile menu closed.
  const overlay = isHome && !scrolled && !open;
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Next.js ignores links to the current route, so scroll back to the top ourselves on the homepage.
  function onBrandClick(event: MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setOpen(false);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <header className={isHome ? "site-header is-home" : "site-header"} data-overlay={overlay ? "true" : undefined}>
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Dawood Technologies home" onClick={onBrandClick}>
          <Image
            className="brand-logo brand-logo-color"
            src="/dawood-technologies-logo.png"
            alt=""
            {...logoImageSize}
            loader={logoLoader}
            preload={!isHome}
          />
          {/* Same size and position as the color logo; the header swaps them by opacity. */}
          {isHome ? <Image
            className="brand-logo brand-logo-white"
            src="/dawood-technologies-logo-white.png"
            alt=""
            {...logoImageSize}
            loader={logoLoader}
            preload
          /> : null}
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map((item) => (
            <Link aria-current={pathname === item.href ? "page" : undefined} href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="header-cta" href="/contact">
          Contact Us
        </Link>

        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </div>

      {open ? <MobileNavigation pathname={pathname} onNavigate={() => setOpen(false)} /> : null}
    </header>
  );
}
