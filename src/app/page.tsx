"use client";

import { useState } from "react";
import Link from "next/link";

interface SamplePreview {
  name: string;
  role: string;
  score: number;
  keywordScore: number;
  formatScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  warning: string;
}

const PREVIEWS: SamplePreview[] = [
  {
    name: "Alex_Chen_Resume.pdf",
    role: "Full-Stack Engineer",
    score: 88,
    keywordScore: 84,
    formatScore: 92,
    matchedKeywords: ["React", "TypeScript", "Node.js", "PostgreSQL", "Next.js"],
    missingKeywords: ["AWS Lambda", "CI/CD Pipeline", "Docker"],
    warning: "Include specific cloud deployment tools in work history.",
  },
  {
    name: "Elena_Rostova_Product.pdf",
    role: "Product Manager",
    score: 72,
    keywordScore: 68,
    formatScore: 82,
    matchedKeywords: ["Roadmapping", "User Research", "Agile", "KPI Tracking"],
    missingKeywords: ["A/B Testing", "SQL Queries", "GTM Strategy"],
    warning: "Replace vague summary with quantifiable metric statements.",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);
  const sample = PREVIEWS[activeTab];

  return (
    <div className="flex flex-col">
      {/* ── 🌟 SPLIT 2-COLUMN HERO SECTION ── */}
      <section className="border-b border-slate-200 dark:border-slate-800/80 py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Left-aligned Value Proposition */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Applicant Tracking System Checker</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-[1.15] mb-5">
              Check if your CV is ready for <span className="brand-text">ATS</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed font-normal">
              Most companies use automated Applicant Tracking Systems to screen resumes before a recruiter ever reads them. Upload your CV in PDF format to detect formatting blockers, score keyword alignment, and get targeted improvements.
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8 w-full">
              {[
                "Instant ATS compatibility score",
                "Job description keyword matching",
                "Formatting & layout error warnings",
                "Actionable bullet point rewrites",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-indigo-50 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/analyze" id="hero-primary-cta" className="btn-primary text-sm font-semibold px-5 py-2.5">
                Analyze My CV
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a href="#how-it-works" className="btn-secondary text-sm font-semibold px-4 py-2.5">
                How It Works
              </a>
            </div>

            <p className="mt-4 text-[11px] text-slate-500 dark:text-slate-400">
              Free · PDF text format · Max 5 MB · Files are processed in memory and never stored
            </p>
          </div>

          {/* Right Column: Live Interactive Audit Widget */}
          <div className="lg:col-span-6">
            <div className="card p-5 sm:p-6 bg-white dark:bg-[#131722] border-slate-200 dark:border-slate-800 shadow-lg">
              {/* Widget Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                    PDF
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Interactive Audit</span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">{sample.name}</h3>
                  </div>
                </div>

                {/* Role Switcher Pills */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-md">
                  {PREVIEWS.map((p, idx) => (
                    <button
                      key={p.role}
                      onClick={() => setActiveTab(idx)}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-all ${
                        activeTab === idx
                          ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                          : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                    >
                      {p.role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Score Bar Highlight */}
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 mb-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Overall ATS Compatibility
                  </span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {sample.score >= 80 ? "Passes Automated Recruiting Filters" : "Requires Minor Formatting Fixes"}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">
                    {sample.score}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold block">/ 100</span>
                </div>
              </div>

              {/* Metric Breakdown Progress Rows */}
              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-600 dark:text-slate-400">Keyword Relevance</span>
                    <span className="text-slate-900 dark:text-slate-100 font-mono">{sample.keywordScore}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${sample.keywordScore}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-600 dark:text-slate-400">Structure & Section Parsability</span>
                    <span className="text-slate-900 dark:text-slate-100 font-mono">{sample.formatScore}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${sample.formatScore}%` }} />
                  </div>
                </div>
              </div>

              {/* Keyword Cloud */}
              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Detected Keywords:</span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">✓ Standard PDF text</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {sample.matchedKeywords.map((kw) => (
                    <span key={kw} className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                      ✓ {kw}
                    </span>
                  ))}
                  {sample.missingKeywords.map((kw) => (
                    <span key={kw} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                      + {kw}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <span className="font-bold">Recommendation:</span> {sample.warning}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 🍱 ASYMMETRIC BENTO GRID: FEATURES ── */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Engine Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
              Built for modern recruiting workflows
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mt-1">
              Automated applicant screening evaluates formatting, heading hierarchy, and role relevance. Here is what CVScore checks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Bento Card 1: Wide ATS Parsing */}
            <div className="md:col-span-7 card card-hover p-6 bg-white dark:bg-[#131722] border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Structural & Section Parsability Audit
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Applicant Tracking Systems fail when resumes contain complex multi-column layouts, embedded graphics, or non-standard headings. CVScore parses your document structure to verify machine readability.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-emerald-500 font-bold">✓</span> Heading Hierarchy
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-emerald-500 font-bold">✓</span> Contact Data Extraction
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-emerald-500 font-bold">✓</span> Date & Experience Parsing
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-emerald-500 font-bold">✓</span> Clean Text Extraction
                </div>
              </div>
            </div>

            {/* Bento Card 2: Keyword Matching */}
            <div className="md:col-span-5 card card-hover p-6 bg-white dark:bg-[#131722] border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Role Keyword Density
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Paste the job posting description to compare hard skills, industry keywords, and terminology density against job requirements.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">Missing Keyword Detection</span>
                Identifies critical qualification terms absent from your resume work history.
              </div>
            </div>

            {/* Bento Card 3: Actionable Rewrites */}
            <div className="md:col-span-6 card card-hover p-6 bg-white dark:bg-[#131722] border-slate-200 dark:border-slate-800">
              <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/80 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
                Action-Oriented Bullet Rewrites
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Transforms passive job duties into high-impact bullet points with quantifiable performance metrics and strong action verbs.
              </p>
            </div>

            {/* Bento Card 4: Strict Privacy Standard */}
            <div className="md:col-span-6 card card-hover p-6 bg-white dark:bg-[#131722] border-slate-200 dark:border-slate-800">
              <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
                Memory-Only Real-Time Processing
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Your uploaded resume is evaluated in memory solely during your request session. We do not maintain a permanent resume database.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 🛠️ HOW IT WORKS ── */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
              How to evaluate your CV
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Upload your PDF CV",
                desc: "Select your resume file. We extract readable text, layout structure, and headings.",
              },
              {
                num: "02",
                title: "Paste Job Posting (Optional)",
                desc: "Provide the target job description to match exact qualification requirements and keywords.",
              },
              {
                num: "03",
                title: "Review Your ATS Report",
                desc: "Get an executive score, formatting warnings, missing skill tags, and targeted rewrite suggestions.",
              },
            ].map(({ num, title, desc }) => (
              <div key={num} className="card p-6 bg-white dark:bg-[#131722] border-slate-200 dark:border-slate-800">
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 block mb-3">
                  STEP {num}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">{title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 💳 PRICING ── */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800/80">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Plans & Access
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
              Straightforward pricing
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* FREE PLAN */}
            <div className="card p-6 bg-white dark:bg-[#131722] border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">FREE</h3>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    Active
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">$0</span>
                  <span className="text-xs text-slate-500 font-medium">/ Forever</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 mb-6">
                  {[
                    "Overall ATS compatibility score",
                    "Keyword match estimation",
                    "Formatting & structure score",
                    "Key strengths & weakness warnings",
                    "Basic actionable recommendations",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/analyze" id="pricing-free-cta" className="btn-primary w-full text-center text-xs py-2.5">
                Analyze My CV Now
              </Link>
            </div>

            {/* PRO PLAN — COMING SOON */}
            <div className="card p-6 bg-slate-50/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 flex flex-col justify-between relative opacity-85">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">PRO</h3>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    Coming Soon
                  </span>
                </div>

                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-xl font-bold text-slate-400">TBA</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400 mb-6">
                  {[
                    "Everything in Free",
                    "Full detailed keyword density breakdown",
                    "Section-by-section line item critique",
                    "AI professional summary rewrite options",
                    "Individual experience bullet optimizations",
                    "Job-specific tailored recommendations",
                    "Exportable PDF report download",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <button disabled className="btn-secondary w-full text-center text-xs py-2.5 opacity-60 cursor-not-allowed">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ❓ 2-COLUMN FAQ ── */}
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Support & Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
              Frequently asked questions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                q: "Is my CV stored on your servers?",
                a: "No. Your CV is processed in memory solely to generate your analysis. We do not permanently store or retain uploaded CV files.",
              },
              {
                q: "What CV file formats are supported?",
                a: "CVScore supports text-based PDF files. Scanned image PDFs (where text cannot be selected or extracted) are not supported.",
              },
              {
                q: "Does a high score guarantee an interview?",
                a: "No. The score is an algorithmic estimate based on standard ATS parsing rules and job keyword density. Use it as a tool to improve your resume quality.",
              },
              {
                q: "Do I need to paste a job description?",
                a: "No, it is completely optional. Without a job posting, your CV is scored against general industry resume standards.",
              },
            ].map(({ q, a }, i) => (
              <div key={i} className="card p-5 bg-white dark:bg-[#131722] border-slate-200 dark:border-slate-800 text-left">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">{q}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-left">
            <Link href="/analyze" id="faq-cta" className="btn-primary text-xs py-2.5 px-5">
              Analyze My CV
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
