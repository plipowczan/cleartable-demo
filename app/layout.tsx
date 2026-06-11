import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  variable: "--font-jakarta",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "ClearTable PL — jedno źródło prawdy o strukturze udziałowej",
  description:
    "Wprowadź strukturę udziałową swojej sp. z o.o. i udostępnij ją inwestorowi bezpiecznym read-only linkiem.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${jakarta.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>{children}<Analytics /></body>
    </html>
  );
}
