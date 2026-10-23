"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { MobileNavigation } from "@/app/components/MobileNavigation";
import { navLinks } from "@/app/data/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
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
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Dawood Technologies home" onClick={onBrandClick}>
          <Image
            className="brand-logo"
            src="/dawood-technologies-logo.png"
            alt=""
            width={2125}
            height={281}
            preload
          />
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
