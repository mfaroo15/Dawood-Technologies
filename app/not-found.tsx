import type { Metadata } from "next";
import { PageHero } from "@/app/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for could not be found.",
  robots: { index: false, follow: true },
};

const breadcrumb = [{ name: "Home", path: "/" }, { name: "Page not found", path: "/404" }] as const;

export default function NotFound() {
  return (
    <main id="main-content">
      <PageHero
        breadcrumb={breadcrumb}
        eyebrow="404"
        title="Page not found."
        lead="The page you were looking for doesn't exist or has moved."
        buttons={[{ label: "Back to home", href: "/" }, { label: "Contact us", href: "/contact", variant: "secondary" }]}
      />
    </main>
  );
}
