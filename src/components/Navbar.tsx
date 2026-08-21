"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import LangSwitcher from "./LangSwitcher";
import { useLang } from "./LanguageProvider";
import { t, tr } from "@/lib/translations";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();

  const NAV_LINKS = [
    { href: "/#how-it-works", label: tr(t.nav.howItWorks, lang) },
    { href: "/#features",     label: tr(t.nav.features,   lang) },
    { href: "/#pricing",      label: tr(t.nav.pricing,    lang) },
    { href: "/#faq",          label: tr(t.nav.faq,        lang) },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[56px] flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
          <div
            className="w-7 h-7 rounded-[6px] flex items-center justify-center text-white font-bold text-[11px] tracking-tight"
            style={{ background: "var(--accent)" }}
          >
            CV
          </div>
          <span className="font-bold text-[15px] tracking-tight" style={{ color: "var(--text)" }}>
            CV<span style={{ color: "var(--accent)" }}>Score</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors duration-150"
              style={{ color: "var(--text-2)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <LangSwitcher />
          <ThemeToggle />
          <Link href="/analyze" id="nav-cta" className="btn-primary text-[13px] py-[7px] px-4">
            {tr(t.nav.analyzeCV, lang)}
          </Link>
        </div>

        {/* Mobile: controls + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <LangSwitcher />
          <ThemeToggle />
          <button
            id="mobile-menu-toggle"
            className="p-1.5 rounded-md transition-colors"
            style={{ color: "var(--text-2)" }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t py-3 px-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div className="flex flex-col gap-0.5">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
                style={{ color: "var(--text-2)" }}
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 mt-1 border-t" style={{ borderColor: "var(--border)" }}>
              <Link href="/analyze" onClick={() => setOpen(false)} className="btn-primary w-full justify-center text-sm py-2.5">
                {tr(t.nav.analyzeCV, lang)}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
