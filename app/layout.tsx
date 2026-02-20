import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: "#dc2626",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export const metadata: Metadata = {
  title: "iUnlock Hub | Remote iCloud Unlock Services",
  description: "Fast, secure, and reliable remote iCloud unlocking for all iPhone models.",
  manifest: "/manifest.json",
  keywords: ["iCloud Unlock", "iPhone Unlocking", "Remove iCloud Lock", "Remote Unlock", "MDM Bypass"],
  authors: [{ name: "iUnlock Hub Team" }],
  openGraph: {
    title: "iUnlock Hub | Remote iCloud Unlock Services",
    description: "The world's most trusted remote unlocking service for iPhone, iPad, and iPod.",
    url: "https://iunlockhub.com",
    siteName: "iUnlock Hub",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "iUnlock Hub - Remote Unlocking Service",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iUnlock Hub | Remote iCloud Unlock Services",
    description: "Secure and permanent remote iCloud unlocking for all iPhone models.",
    images: ["/og-image.jpg"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "iUnlock Hub",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="iUnlock Hub" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <WhatsAppButton />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
