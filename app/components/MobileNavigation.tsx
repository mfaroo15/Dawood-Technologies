import Link from "next/link";
import { navLinks } from "@/app/data/site";

type MobileNavigationProps = {
  pathname: string;
  onNavigate: () => void;
};

export function MobileNavigation({ pathname, onNavigate }: MobileNavigationProps) {
  return (
    <div className="mobile-panel is-open" id="mobile-navigation">
      <nav className="container mobile-nav" aria-label="Mobile navigation">
        {navLinks.map((item) => (
          <Link aria-current={pathname === item.href ? "page" : undefined} href={item.href} key={item.href} onClick={onNavigate}>
            {item.label}
          </Link>
        ))}
        <Link className="mobile-contact" href="/contact" onClick={onNavigate}>Contact Us</Link>
      </nav>
    </div>
  );
}
