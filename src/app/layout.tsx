import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { PagePreloader } from "@/components/PagePreloader";
import { FloatingChatWrapper } from "@/components/FloatingChatWrapper";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fabriclicious.com"),
  title: {
    default: "Fabriclicious | Haute Couture & Bespoke Natural Textiles",
    template: "%s | Fabriclicious Atelier",
  },
  description:
    "Ultra-luxury fabric atelier offering continuous fractional cuts from 0.5 meters. Direct mill provenance across French Normandy Linens, Como Silk Satins, and Yorkshire Worsted Wools.",
  keywords: [
    "luxury fabrics",
    "couture textiles",
    "fractional cuts",
    "French Normandy Linen",
    "Como Silk",
    "Yorkshire Wool",
    "bespoke tailoring fabrics",
    "natural fiber cloth",
    "fabric swatches",
  ],
  authors: [{ name: "Fabriclicious Atelier" }],
  creator: "Fabriclicious",
  publisher: "Mithila Enterprises",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.fabriclicious.com",
    siteName: "Fabriclicious",
    title: "Fabriclicious | Haute Couture & Bespoke Natural Textiles",
    description:
      "Ultra-luxury fabric house specializing in fractional continuous cuts from 0.5 meters. Direct mill provenance and single-dye lot integrity.",
    images: [
      {
        url: "/images/logo-horizontal.svg",
        width: 1200,
        height: 630,
        alt: "Fabriclicious - Haute Couture Textiles Atelier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fabriclicious | Haute Couture & Bespoke Natural Textiles",
    description:
      "Ultra-luxury fabric house specializing in fractional continuous cuts from 0.5 meters.",
    images: ["/images/logo-horizontal.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/logo-rosette.svg",
    shortcut: "/images/logo-rosette.svg",
    apple: "/images/logo-rosette.svg",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.fabriclicious.com/#organization",
      name: "Fabriclicious",
      url: "https://www.fabriclicious.com",
      logo: "https://www.fabriclicious.com/images/logo-horizontal.svg",
      description:
        "Exclusive digital atelier specializing in bespoke continuous textile cuts from Europe's heritage family looms.",
      parentOrganization: {
        "@type": "Organization",
        name: "Mithila Enterprises",
      },
      sameAs: [
        "https://instagram.com/fabriclicious",
        "https://www.linkedin.com/company/fabriclicious",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.fabriclicious.com/#website",
      url: "https://www.fabriclicious.com",
      name: "Fabriclicious",
      publisher: {
        "@id": "https://www.fabriclicious.com/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.fabriclicious.com/fabrics?category={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-[100dvh] flex flex-col">
        <PagePreloader />
        <SmoothScrollProvider>
          {children}
          <FloatingChatWrapper />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
