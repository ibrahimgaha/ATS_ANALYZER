"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass bg-white/90 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Minimal Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white shadow-sm font-bold text-xs">
            CV
          </div>
          <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-slate-100">
            CV<span className="text-indigo-600 dark:text-indigo-400">Score</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <Link href="/#how-it-works" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            How It Works
          </Link>
          <Link href="/#pricing" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            Pricing
          </Link>
          <Link href="/#faq" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            FAQ
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/analyze" id="nav-cta" className="btn-primary text-xs py-2 px-4">
            Analyze My CV
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            id="mobile-menu-toggle"
            className="p-1.5 rounded text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 5A.75.75 0 012.75 9h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 9zm0 5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 14.75z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 px-4 py-3 flex flex-col gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-950">
          <Link href="/#how-it-works" onClick={() => setMenuOpen(false)} className="py-1">
            How It Works
          </Link>
          <Link href="/#pricing" onClick={() => setMenuOpen(false)} className="py-1">
            Pricing
          </Link>
          <Link href="/#faq" onClick={() => setMenuOpen(false)} className="py-1">
            FAQ
          </Link>
          <Link href="/analyze" onClick={() => setMenuOpen(false)} className="btn-primary text-xs text-center py-2.5 mt-1">
            Analyze My CV
          </Link>
        </div>
      )}
    </header>
  );
}
