"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AnalysisResult } from "@/types/analysis";
import ScoreRing from "@/components/ScoreRing";

function getAtsStatus(score: number) {
  if (score >= 85) {
    return {
      badge: "High ATS Match",
      desc: "Your CV matches standard ATS parsing rules and has optimal formatting.",
      badgeStyle: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    };
  }
  if (score >= 70) {
    return {
      badge: "ATS Compatible",
      desc: "Your CV will parse smoothly through most ATS engines. Adding missing skills will boost your rank.",
      badgeStyle: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
    };
  }
  if (score >= 55) {
    return {
      badge: "Needs Formatting Fixes",
      desc: "Some layout sections or missing keywords may cause issues with certain applicant tracking software.",
      badgeStyle: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    };
  }
  return {
    badge: "Low ATS Match",
    desc: "Significant structural or keyword improvements required to pass automated parsing software.",
    badgeStyle: "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800",
  };
}

function MetricCard({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  return (
    <div className="card p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <div className="flex justify-between items-center text-xs font-semibold mb-2">
        <span className="text-slate-600 dark:text-slate-400">{label}</span>
        <span className="tabular-nums font-bold text-slate-900 dark:text-slate-100">{score}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full"
          style={{ width: `${score}%` }}
        />
      </div>
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
        setError("No analysis found. Please upload a CV first.");
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950 flex items-center justify-center text-rose-600 dark:text-rose-400">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">{error}</h1>
        <Link href="/analyze" className="btn-primary text-xs py-2 px-4">
          Analyze a CV
        </Link>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  const atsStatus = getAtsStatus(result.atsScore);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      {/* Top Navigation / Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Analysis Report
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            ATS Compatibility Evaluation
          </h1>
        </div>

        <Link href="/analyze" className="btn-primary text-xs py-2 px-4">
          Analyze Another CV
        </Link>
      </div>

      {/* 🌟 MAIN VISUAL HERO: ATS SCORE FOCUS */}
      <div className="card p-6 sm:p-8 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <div className="grid md:grid-cols-12 gap-6 items-center">
          {/* Left Column: Primary ATS Score Gauge */}
          <div className="md:col-span-5 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 pb-6 md:pb-0 md:pr-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Primary ATS Score
            </span>
            <ScoreRing
              score={result.atsScore}
              size={140}
              strokeWidth={11}
              label=""
              gradientId="hero-ats-gauge"
            />
            <span className={`mt-3 inline-block px-3 py-1 rounded-md text-xs font-bold border ${atsStatus.badgeStyle}`}>
              {atsStatus.badge}
            </span>
          </div>

          {/* Right Column: Key Breakdown Metrics */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                Executive Overview
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {atsStatus.desc}
              </p>
            </div>

            {/* Score Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <MetricCard label="Overall Quality" score={result.overallScore} />
              <MetricCard label="Keyword Match" score={result.keywordScore} />
              <MetricCard label="Formatting Score" score={result.formattingScore} />
            </div>
          </div>
        </div>
      </div>

      {/* 📊 STRENGTHS & WEAKNESSES GRID */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="card p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            CV Strengths
          </h2>
          <ul className="space-y-2">
            {result.strengths.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses / Formatting Warnings */}
        <div className="card p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <h2 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-3 flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Formatting Warnings & Limitations
          </h2>
          <ul className="space-y-2">
            {result.weaknesses.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="text-rose-600 dark:text-rose-400 font-bold mt-0.5">!</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 🏷️ MISSING KEYWORDS */}
      {result.missingKeywords.length > 0 && (
        <div className="card p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-1">
            Missing Keywords & Role Terminology
          </h2>
          <p className="text-xs text-slate-500 mb-3">
            Adding these keywords truthfully into your work history or skills section will improve your ATS ranking.
          </p>
          <div className="flex flex-wrap gap-2">
            {result.missingKeywords.map((kw, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-medium text-slate-700 dark:text-slate-300"
              >
                + {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 💡 RECOMMENDATIONS */}
      {result.recommendations.length > 0 && (
        <div className="card p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-3">
            Actionable Recommendations
          </h2>
          <div className="space-y-2.5">
            {result.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="w-5 h-5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold text-[11px] flex items-center justify-center flex-shrink-0 border border-indigo-200 dark:border-indigo-800 mt-0.5">
                  {i + 1}
                </span>
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✍️ SUGGESTED PROFESSIONAL SUMMARY REWRITE */}
      {result.summarySuggestion && (
        <div className="card p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Suggested Professional Summary Rewrite
            </h2>
            <button
              onClick={() => handleCopySummary(result.summarySuggestion)}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
            >
              {copiedSummary ? "Copied!" : "Copy Summary"}
            </button>
          </div>
          <div className="p-3.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
            &ldquo;{result.summarySuggestion}&rdquo;
          </div>
        </div>
      )}

      {/* ⚡ BULLET POINT SUGGESTIONS */}
      {result.bulletPointSuggestions.length > 0 && (
        <div className="card p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-3">
            Suggested Bullet Point Rewrites
          </h2>
          <div className="space-y-2">
            {result.bulletPointSuggestions.map((bp, i) => (
              <div key={i} className="p-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {bp}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-500">
          AI evaluation for guidance only — does not guarantee job placement or ATS pass.
        </p>
        <div className="flex items-center gap-3">
          <Link href="/analyze" className="btn-primary text-xs py-2 px-4">
            Analyze Another CV
          </Link>
          <Link href="/" className="btn-secondary text-xs py-2 px-4">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
