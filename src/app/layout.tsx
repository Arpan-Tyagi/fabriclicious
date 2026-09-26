import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Fabriclicious | Haute Couture Textiles",
  description: "Ultra-luxury fabric house specializing in fractional cuts.",
};

import { FloatingChat } from "@/components/FloatingChat";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { PagePreloader } from "@/components/PagePreloader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-[100dvh] flex flex-col">
        <PagePreloader />
        <SmoothScrollProvider>
          {children}
          <FloatingChat />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
