import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { getNavigation, getSiteConfig } from "@/lib/api";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GSM Patna — Free Tool Downloads, One-Time-Use Licenses",
    template: "%s | GSM Patna",
  },
  description:
    "Download GSM repair tools, flash files and schematics for free. Buy a one-time-use license only when you run them.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetched once on the server and handed to the client shell as props, so the
  // header never hardcodes catalog data. See lib/api.js.
  const [nav, site] = await Promise.all([getNavigation(), getSiteConfig()]);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-50 font-sans text-slate-800">
        <CartProvider>
          <Header nav={nav} site={site} />
          <main className="flex-1">{children}</main>
          <Footer nav={nav} site={site} />
          <FloatingWhatsApp phone={site.whatsapp} />
        </CartProvider>
      </body>
    </html>
  );
}
