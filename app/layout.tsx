import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site.config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.meta.siteName,
    template: `%s | ${siteConfig.meta.siteName}`,
  },
  description: siteConfig.meta.description,
  metadataBase: new URL(siteConfig.meta.url),
  openGraph: {
    title: siteConfig.meta.siteName,
    description: siteConfig.meta.description,
    url: siteConfig.meta.url,
    siteName: siteConfig.meta.siteName,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --brand-primary: ${siteConfig.brand.colors.primary};
                --brand-secondary: ${siteConfig.brand.colors.secondary || siteConfig.brand.colors.primary};
                --brand-accent: ${siteConfig.brand.colors.accent || siteConfig.brand.colors.primary};
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
