import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { company } from "@/config/company";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCTA } from "@/components/MobileCTA";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: "Serwis Komputerowy i GSM Kórnik | Naprawa Laptopów i Telefonów",
    template: "%s | Serwis Kórnik",
  },
  description: company.description,
  applicationName: company.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: company.siteUrl,
    siteName: company.name,
    title: "Serwis Komputerowy i GSM Kórnik | Naprawa Laptopów i Telefonów",
    description: company.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Serwis Komputerowy i GSM Kórnik | Naprawa Laptopów i Telefonów",
    description: company.description,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#080A0D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${inter.variable} ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full bg-bg font-sans text-text">
        <a
          href="#tresc"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
        >
          Przejdź do treści
        </a>
        <Header />
        <div id="tresc">{children}</div>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  );
}
