// schema.org structured data for FleetFalcon. Rendered as JSON-LD in the root layout.
// Ported from lp-fleetfalcon/app/structured-data.ts and extended with FAQPage, Product/Offer
// (real pricing tiers), and BreadcrumbList.

import { faqItems, pricingTiers } from "./content";

const BASE_URL = "https://www.fleetfalcon.io";
const LOGO = `${BASE_URL}/web-app-manifest-512x512.png`;

const DESCRIPTION =
  "FleetFalcon is a fleet safety and DOT compliance platform for trucking carriers. It automates " +
  "the repetitive work of FMCSA compliance — driver qualification files, document tracking, roadside " +
  "inspections, citations, incidents, driver onboarding, and CSA safety monitoring — so fleets stay " +
  "audit-ready and avoid violations and fines.";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "FleetFalcon",
  url: BASE_URL,
  logo: LOGO,
  image: LOGO,
  description: DESCRIPTION,
  sameAs: ["https://www.youtube.com/@FleetFalconTrucking", "https://app.fleetfalcon.io"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "val@fleetfalcon.io",
    areaServed: ["US", "CA"],
    availableLanguage: ["English"],
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: "FleetFalcon",
  description: DESCRIPTION,
  publisher: { "@id": `${BASE_URL}/#organization` },
  inLanguage: "en-US",
};

// Product + Offer schema built from the real pricing tiers. Enterprise (no fixed price) is
// represented without a price value.
export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${BASE_URL}/#software`,
  name: "FleetFalcon",
  url: BASE_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: DESCRIPTION,
  publisher: { "@id": `${BASE_URL}/#organization` },
  audience: {
    "@type": "Audience",
    audienceType:
      "US and Canadian trucking carriers, fleets, owner-operators, and DOT-regulated motor carriers",
  },
  offers: pricingTiers
    .filter((t) => typeof t.priceNum === "number")
    .map((t) => ({
      "@type": "Offer",
      name: `${t.name} plan`,
      category: "SaaS subscription",
      price: String(t.priceNum),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/pricing`,
      description: `${t.trucks} · flat monthly · 1 month free trial`,
    })),
  featureList: [
    "Driver Qualification (DQ) file management for CDL and non-CDL drivers",
    "Automated document tracking, renewal, and verification (DocPulse)",
    "Roadside inspection workflow and CVSA parsing (Violation Radar)",
    "Driver citation and ticket case management (Citation Watch)",
    "Audit-proof incident response (Incident Control)",
    "Rapid driver onboarding with AI document extraction",
    "FMCSA English Language Proficiency (ELP) testing",
    "CSA / FMCSA safety score monitoring and peer benchmarking",
    "Carrier profile PDF-to-Excel extraction",
  ],
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${BASE_URL}/#faq`,
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${BASE_URL}/#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Pricing", item: `${BASE_URL}/pricing` },
  ],
};

export const allSchemas = [
  organizationSchema,
  websiteSchema,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
];
