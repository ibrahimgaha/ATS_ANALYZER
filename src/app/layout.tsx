import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CVScore — ATS CV Analyzer",
  description:
    "Check if your CV is ready for Applicant Tracking Systems. Get an instant ATS compatibility score, keyword analysis, and actionable improvements.",
  keywords: [
    "ATS",
    "CV analyzer",
    "resume checker",
    "ATS score",
    "job application",
    "CV optimization",
  ],
  openGraph: {
    title: "CVScore — ATS CV Analyzer",
    description: "Check if your CV is ready for ATS in seconds.",
    type: "website",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="antialiased min-h-screen flex flex-col transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
