import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import { JsonLd } from "./components/json-ld";
import { HashScroll } from "./components/hash-scroll";
import { GoogleAnalytics } from "@next/third-parties/google";
import { allSchemas } from "./structured-data";

// Display + body — Plus Jakarta Sans (bold geometric sans; heavy weights for punchy
// headlines). IBM Plex Mono is reserved for tabular figures (prices, stats).
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const SITE_TITLE = "FleetFalcon — Fleet Safety & DOT Compliance Platform";
const SITE_DESCRIPTION =
  "FleetFalcon automates DOT & FMCSA compliance for trucking fleets — driver qualification files, document tracking, roadside inspections, citations, incidents, onboarding, and CSA safety monitoring. Start audit-ready with a free month.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fleetfalcon.io"),
  title: {
    default: SITE_TITLE,
    template: "%s · FleetFalcon",
  },
  description: SITE_DESCRIPTION,
  applicationName: "FleetFalcon",
  keywords: [
    "DOT compliance software",
    "FMCSA compliance",
    "fleet compliance platform",
    "driver qualification files",
    "DQ file management",
    "CSA score monitoring",
    "trucking compliance software",
    "roadside inspection software",
    "FMCSA Clearinghouse",
    "driver onboarding software",
    "carrier safety management",
  ],
  authors: [{ name: "FleetFalcon" }],
  creator: "FleetFalcon",
  publisher: "FleetFalcon",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "FleetFalcon",
    locale: "en_US",
    url: "https://www.fleetfalcon.io/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: "/web-app-manifest-512x512.png", width: 512, height: 512, alt: "FleetFalcon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/web-app-manifest-512x512.png"],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <JsonLd data={allSchemas} />
        <HashScroll />
        {/* Google Analytics 4 — only renders when NEXT_PUBLIC_GA_ID is set (env var / Vercel),
            so dev and any env without an ID don't fire tracking. */}
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        ) : null}
        <ThemeProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
