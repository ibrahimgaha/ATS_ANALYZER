"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-200/50 dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center shadow-lg">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 2h10a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M5 6h6M5 8.5h4M5 11h5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
            CV<span className="gradient-text">Score</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-gray-400">
          <Link href="/#how-it-works" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            How it works
          </Link>
          <Link href="/#pricing" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/#faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            FAQ
          </Link>
        </nav>

        {/* Controls */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/analyze" className="btn-primary text-sm py-2 px-4">
            Analyze my CV
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            id="mobile-menu-toggle"
            className="p-2 rounded-lg text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/[0.06] px-4 py-4 flex flex-col gap-3 text-sm font-medium text-gray-300">
          <Link
            href="/#how-it-works"
            onClick={() => setMenuOpen(false)}
            className="hover:text-white"
          >
            How it works
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setMenuOpen(false)}
            className="hover:text-white"
          >
            Pricing
          </Link>
          <Link
            href="/#faq"
            onClick={() => setMenuOpen(false)}
            className="hover:text-white"
          >
            FAQ
          </Link>
          <Link
            href="/analyze"
            className="btn-primary text-sm py-2 px-4 mt-1"
            onClick={() => setMenuOpen(false)}
          >
            Analyze my CV
          </Link>
        </div>
      )}
    </header>
  );
}
