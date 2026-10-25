import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import "./globals.css";
import { contactEmail, contactPhone, foundingYear, linkedInUrl, siteUrl } from "@/app/data/site";
import { shareImage } from "@/app/lib/metadata";

const siteTitle = "Dawood Technologies | Digital Engineering & IT Services";
const siteDescription = "Business applications, enterprise integrations, cloud infrastructure, data, AI automation and ongoing technology operations.";

// Favicons come from the file conventions in this folder: favicon.ico, icon.png, icon.svg and apple-icon.png.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Dawood Technologies",
  },
  description: siteDescription,
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
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    images: [shareImage],
  },
  twitter: { card: "summary_large_image", title: siteTitle, description: siteDescription, images: [shareImage] },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Dawood Technologies",
      alternateName: "Dawood Tech",
      url: `${siteUrl}/`,
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo-square.png`, width: 512, height: 512 },
      description: "Dawood Technologies designs, builds and runs business systems: websites, CRM, ERP, cloud and AI, with remote teams in Chicago, Karachi and Dubai.",
      areaServed: "Worldwide",
      telephone: contactPhone.schema,
      email: contactEmail,
      foundingDate: String(foundingYear),
      sameAs: [linkedInUrl],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Dawood Technologies",
      alternateName: ["Dawood Tech", "dawoodtech.com"],
      url: `${siteUrl}/`,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
