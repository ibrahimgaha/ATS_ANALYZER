import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CVScore — ATS CV Analyzer",
  description:
    "Check if your CV is ready for Applicant Tracking Systems. Get an instant ATS compatibility score, keyword analysis, and actionable improvements.",
  keywords: ["ATS", "CV analyzer", "resume checker", "ATS score", "job application", "CV optimization"],
  openGraph: {
    title: "CVScore — ATS CV Analyzer",
    description: "Check if your CV is ready for ATS in seconds.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
