import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Theme Provider for managing light/dark mode
import { ThemeProvider } from "@/components/theme/theme-provider";

// Custom Site Header
import SiteHeader from "@/components/custom/site-header";
import Footer from "@/components/about/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LouienFranco | Front-end Developer Portfolio",
  description: "Front-end Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Site Header */}
          <SiteHeader />
          {children}
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
