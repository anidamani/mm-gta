import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Muslims in GTA - Prayer Times & Mosque Directory",
  description: "Find Taraweeh, Jumuah, and Eid prayer times at mosques across the Greater Toronto Area. Comprehensive directory of Islamic centers and masjids in the GTA.",
  keywords: "mosque, masjid, GTA, Toronto, prayer times, taraweeh, jumuah, islamic center",
  openGraph: {
    title: "Muslims in GTA - Prayer Times & Mosque Directory",
    description: "Find prayer times at mosques across the Greater Toronto Area",
    type: "website",
    locale: "en_CA",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
