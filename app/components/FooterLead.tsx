"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

export function FooterLead() {
  const pathname = usePathname();
  const isContactPage = pathname === "/contact";

  // The homepage ends with its own call-to-action band.
  if (pathname === "/") return null;

  return (
    <div className={`container footer-lead${isContactPage ? " footer-lead-contact" : ""}`}>
      <div>
        <p className="kicker">Build with us</p>
        <h2>{isContactPage ? "Let's Build Something Together" : "Technology should keep working after launch."}</h2>
        {isContactPage && (
          <p className="footer-lead-description">Have a project in mind? Tell us about your goals using the inquiry form above, and our team will help you explore the next steps.</p>
        )}
      </div>
      {!isContactPage && (
        <Link className="footer-talk" href="/contact">Start a conversation <ArrowUpRight aria-hidden="true" /></Link>
      )}
    </div>
  );
}
