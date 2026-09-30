import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import "./globals.css";
import { siteUrl } from "@/app/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dawood Technologies | IT Infrastructure & Business Systems",
    template: "%s | Dawood Technologies",
  },
  description: "Business applications, enterprise integrations, cloud infrastructure, data, AI automation and ongoing technology operations.",
  applicationName: "Dawood Technologies",
  creator: "Dawood Technologies",
  publisher: "Dawood Technologies",
  robots: {
    index: true,
    follow: true,
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Dawood Technologies",
    title: "Dawood Technologies | IT Infrastructure & Business Systems",
    description: "Business applications, enterprise integrations, cloud infrastructure, data, AI automation and ongoing technology operations.",
    url: siteUrl,
  },
  twitter: { card: "summary", title: "Dawood Technologies | IT Infrastructure & Business Systems", description: "Business applications, enterprise integrations, cloud infrastructure, data, AI automation and ongoing technology operations." },
  icons: {
    icon: [
      { url: "/favicon.png?v=4", type: "image/png", sizes: "192x192" },
      { url: "/icon.svg?v=4", type: "image/svg+xml", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.png?v=4", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
