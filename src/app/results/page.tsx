"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AnalysisResult } from "@/types/analysis";
import ScoreRing from "@/components/ScoreRing";

function getAtsStatus(score: number) {
  if (score >= 85) {
    return {
      badge: "High ATS Match",
      desc: "Your CV is well-structured for Applicant Tracking Systems and has strong keyword density.",
      badgeClass: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    };
  }
  if (score >= 70) {
    return {
      badge: "ATS Compatible",
      desc: "Your CV will pass most ATS scanners, but adding missing keywords will boost rank.",
      badgeClass: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
    };
  }
  if (score >= 55) {
    return {
      badge: "Needs Optimization",
      desc: "Your CV may encounter issues with certain ATS parsers due to formatting or missing keywords.",
      badgeClass: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    };
  }
  return {
    badge: "Low ATS Score",
    desc: "Significant improvements needed in formatting, section headings, or keyword matching.",
    badgeClass: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
  };
}

function Section({
  title,
  subtitle,
  children,
  icon,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <section className="card p-6 sm:p-7 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
          {icon}
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}

function ProgressBar({
  label,
  score,
  icon,
}: {
  label: string;
  score: number;
  icon: React.ReactNode;
}) {
  const color =
    score >= 75
      ? "bg-gradient-to-r from-emerald-500 to-teal-400"
      : score >= 50
      ? "bg-gradient-to-r from-amber-500 to-orange-400"
      : "bg-gradient-to-r from-rose-500 to-red-400";

  return (
    <div className="card p-4 bg-slate-50/50 dark:bg-slate-900/40 border-slate-200/80 dark:border-white/10">
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
          {icon}
          {label}
        </span>
        <span className="font-bold tabular-nums text-slate-900 dark:text-white">
          {score}/100
        </span>
      </div>
      <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function FeedbackCard({
  text,
  variant,
}: {
  text: string;
  variant: "strength" | "weakness" | "recommendation" | "bullet";
}) {
  const configs = {
    strength: {
      bg: "bg-emerald-500/10 dark:bg-emerald-500/10 border-emerald-500/20 text-slate-800 dark:text-slate-200",
      iconColor: "#10b981",
      path: "M5 13l4 4L19 7",
    },
    weakness: {
      bg: "bg-rose-500/10 dark:bg-rose-500/10 border-rose-500/20 text-slate-800 dark:text-slate-200",
      iconColor: "#f43f5e",
      path: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    },
    recommendation: {
      bg: "bg-indigo-500/10 dark:bg-indigo-500/10 border-indigo-500/20 text-slate-800 dark:text-slate-200",
      iconColor: "#6366f1",
      path: "M13 10V3L4 14h7v7l9-11h-7z",
    },
    bullet: {
      bg: "bg-cyan-500/10 dark:bg-cyan-500/10 border-cyan-500/20 text-slate-800 dark:text-slate-200",
      iconColor: "#06b6d4",
      path: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
    },
  };

  const c = configs[variant];

  return (
    <div className={`flex items-start gap-3 p-3.5 rounded-xl border ${c.bg} transition-all`}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c.iconColor}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="flex-shrink-0 mt-0.5"
      >
        <path d={c.path} />
      </svg>
      <span className="text-sm leading-relaxed">{text}</span>
    </div>
  );
}

export default function ResultsPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>("");
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("cvscore_result");
      if (!raw) {
        setError("No analysis found. Please analyze a CV first.");
        return;
      }
      const parsed = JSON.parse(raw) as AnalysisResult;
      setResult(parsed);
    } catch {
      setError("Could not load results. Please try again.");
    }
  }, []);

  const handleCopySummary = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">No Analysis Found</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm">{error}</p>
        </div>
        <Link href="/analyze" className="btn-primary">
          Analyze a CV Now
        </Link>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-3 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  const atsStatus = getAtsStatus(result.atsScore);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-600 dark:text-indigo-300 mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            AI Report Ready
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            CV Analysis Results
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/analyze" id="analyze-another-top" className="btn-primary py-2.5 px-4 text-xs font-semibold">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
            </svg>
            Analyze Another CV
          </Link>
        </div>
      </div>

      {/* 🌟 HERO CARD: ATS SCORE FOCUS */}
      <div className="card p-6 sm:p-10 relative overflow-hidden bg-gradient-to-br from-indigo-50/80 via-white to-teal-50/80 dark:from-indigo-950/40 dark:via-slate-900/60 dark:to-teal-950/20 border-indigo-500/30 shadow-xl">
        <div
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="grid md:grid-cols-12 gap-8 items-center">
          {/* Main Visual Center: Big ATS Score Gauge */}
          <div className="md:col-span-5 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/10 pb-6 md:pb-0 md:pr-6">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3">
              PRIMARY ATS METRIC
            </span>
            <div className="relative">
              <ScoreRing
                score={result.atsScore}
                size={160}
                strokeWidth={13}
                label=""
                gradientId="hero-ats-ring"
              />
            </div>
            <div className={`mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold ${atsStatus.badgeClass}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              {atsStatus.badge}
            </div>
          </div>

          {/* Details & Overview */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                ATS Compatibility Score: <span className="gradient-text font-black">{result.atsScore}/100</span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {atsStatus.desc}
              </p>
            </div>

            {/* Breakdown Mini Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <ProgressBar
                label="Overall Quality"
                score={result.overallScore}
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                }
              />
              <ProgressBar
                label="Keyword Match"
                score={result.keywordScore}
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                }
              />
              <ProgressBar
                label="Formatting"
                score={result.formattingScore}
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2">
                    <path d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* 📊 STRENGTHS & WEAKNESSES GRID */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Strengths */}
        <Section
          title="CV Strengths"
          subtitle="Elements in your CV that rank highly"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          }
        >
          <div className="space-y-2.5">
            {result.strengths.length > 0 ? (
              result.strengths.map((item, i) => (
                <FeedbackCard key={i} text={item} variant="strength" />
              ))
            ) : (
              <p className="text-sm text-slate-500">No specific strengths identified.</p>
            )}
          </div>
        </Section>

        {/* Weaknesses / Warnings */}
        <Section
          title="Formatting & Warnings"
          subtitle="Potential issues flagged by parser engines"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          }
        >
          <div className="space-y-2.5">
            {result.weaknesses.length > 0 ? (
              result.weaknesses.map((item, i) => (
                <FeedbackCard key={i} text={item} variant="weakness" />
              ))
            ) : (
              <p className="text-sm text-slate-500">No major formatting warnings found.</p>
            )}
          </div>
        </Section>
      </div>

      {/* 🏷️ MISSING KEYWORDS */}
      {result.missingKeywords.length > 0 && (
        <Section
          title="Missing Skills & Keywords"
          subtitle="Add these relevant terms to boost your ATS match rank"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
          }
        >
          <div className="flex flex-wrap gap-2.5 pt-1">
            {result.missingKeywords.map((kw, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-300"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                {kw}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* 💡 ACTIONABLE RECOMMENDATIONS */}
      {result.recommendations.length > 0 && (
        <Section
          title="Actionable Improvement Steps"
          subtitle="Step-by-step roadmap to maximize your interview callbacks"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        >
          <div className="space-y-3">
            {result.recommendations.map((rec, i) => (
              <div
                key={i}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10"
              >
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 shadow">
                  {i + 1}
                </span>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                  {rec}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ✍️ SUGGESTED PROFESSIONAL SUMMARY REWRITE */}
      {result.summarySuggestion && (
        <Section
          title="Suggested Professional Summary"
          subtitle="Optimized executive summary tailored for ATS crawlers"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          }
        >
          <div className="relative p-5 rounded-2xl bg-gradient-to-r from-teal-500/10 to-indigo-500/10 border border-teal-500/20">
            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed italic pr-12">
              &ldquo;{result.summarySuggestion}&rdquo;
            </p>

            <button
              onClick={() => handleCopySummary(result.summarySuggestion)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-all text-xs font-medium flex items-center gap-1.5 shadow"
              title="Copy suggested summary"
            >
              {copiedSummary ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
        </Section>
      )}

      {/* ⚡ BULLET POINT IMPROVEMENTS */}
      {result.bulletPointSuggestions.length > 0 && (
        <Section
          title="Improved Experience Bullet Points"
          subtitle="Stronger, impact-focused action bullet rewrites"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          }
        >
          <div className="space-y-2.5">
            {result.bulletPointSuggestions.map((bp, i) => (
              <FeedbackCard key={i} text={bp} variant="bullet" />
            ))}
          </div>
        </Section>
      )}

      {/* FOOTER ACTIONS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-white/10">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Report generated using AI analysis — intended for guidance only.
        </p>

        <div className="flex items-center gap-3">
          <Link href="/analyze" id="analyze-another-bottom" className="btn-primary">
            Analyze Another CV
          </Link>
          <Link href="/" className="btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
