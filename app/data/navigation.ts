// Kept apart from site.ts because the header is a client component: importing from there would send all the service copy to the browser.
export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/services/ai-automation", label: "Artificial Intelligence" },
  { href: "/work", label: "Solutions" },
  { href: "/company", label: "About Us" },
  { href: "/careers", label: "Careers" },
];
