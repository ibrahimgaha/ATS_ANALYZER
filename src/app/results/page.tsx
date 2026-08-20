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

function MetricRow({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-xs font-semibold">
        <span className="text-slate-600 dark:text-slate-400">{label}</span>
        <span className="tabular-nums font-bold text-slate-900 dark:text-slate-100">{score}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-500 ease-out"
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
  const [copiedBulletIdx, setCopiedBulletIdx] = useState<number | null>(null);

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

  const handleCopyBullet = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletIdx(idx);
    setTimeout(() => setCopiedBulletIdx(null), 2000);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Audit Report Ready
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            ATS Compatibility Evaluation
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
            title="Print or save as PDF"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            Print Report
          </button>
          <Link href="/analyze" className="btn-primary text-xs py-2 px-4">
            Analyze Another CV
          </Link>
        </div>
      </div>

      {/* ── 🌟 ASYMMETRIC DASHBOARD GRID ── */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (4 cols): Sticky Score Overview & Key Metrics */}
        <div className="lg:col-span-4 lg:sticky lg:top-20 space-y-5">
          {/* Main Score Hero Card */}
          <div className="card p-6 bg-white dark:bg-[#131722] border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Primary ATS Score
            </span>
            <div className="flex justify-center my-3">
              <ScoreRing score={result.atsScore} size={150} strokeWidth={11} label="" />
            </div>

            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mt-2 ${atsStatus.badgeStyle}`}>
              {atsStatus.badge}
            </span>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              {atsStatus.desc}
            </p>
          </div>

          {/* Metric Breakdown Card */}
          <div className="card p-5 bg-white dark:bg-[#131722] border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Performance Breakdown
            </h3>
            <MetricRow label="Overall Quality" score={result.overallScore} />
            <MetricRow label="Keyword Relevance" score={result.keywordScore} />
            <MetricRow label="Formatting & Layout" score={result.formattingScore} />
          </div>

          {/* Privacy & Legal Disclaimer */}
          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 leading-relaxed">
            AI evaluation for guidance only — does not guarantee employment outcomes or ATS approval.
          </div>
        </div>

        {/* Right Main Workspace (8 cols): Actionable Findings & Content Rewrites */}
        <div className="lg:col-span-8 space-y-6">
          {/* Strengths & Weaknesses Split Grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Strengths */}
            <div className="card p-5 bg-white dark:bg-[#131722] border-slate-200 dark:border-slate-800">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                CV Strengths
              </h2>
              <ul className="space-y-2.5">
                {result.strengths.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses / Formatting Warnings */}
            <div className="card p-5 bg-white dark:bg-[#131722] border-slate-200 dark:border-slate-800">
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-3 flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Formatting Warnings & Gaps
              </h2>
              <ul className="space-y-2.5">
                {result.weaknesses.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="text-rose-600 dark:text-rose-400 font-bold mt-0.5">!</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Missing Keywords Cloud */}
          {result.missingKeywords.length > 0 && (
            <div className="card p-5 bg-white dark:bg-[#131722] border-slate-200 dark:border-slate-800">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-1">
                Missing Keywords & Role Terminology
              </h2>
              <p className="text-xs text-slate-500 mb-3">
                Incorporate these terms into your job descriptions or skills section to improve ATS relevance rankings:
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

          {/* Actionable Recommendations */}
          {result.recommendations.length > 0 && (
            <div className="card p-5 bg-white dark:bg-[#131722] border-slate-200 dark:border-slate-800">
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

          {/* Suggested Professional Summary Rewrite */}
          {result.summarySuggestion && (
            <div className="card p-5 bg-white dark:bg-[#131722] border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                  Suggested Professional Summary Rewrite
                </h2>
                <button
                  onClick={() => handleCopySummary(result.summarySuggestion)}
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1.5 transition-colors"
                >
                  {copiedSummary ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                      </svg>
                      Copy Summary
                    </>
                  )}
                </button>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                &ldquo;{result.summarySuggestion}&rdquo;
              </div>
            </div>
          )}

          {/* Suggested Bullet Point Rewrites */}
          {result.bulletPointSuggestions.length > 0 && (
            <div className="card p-5 bg-white dark:bg-[#131722] border-slate-200 dark:border-slate-800">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-3">
                Suggested Bullet Point Rewrites
              </h2>
              <div className="space-y-2.5">
                {result.bulletPointSuggestions.map((bp, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start justify-between gap-3 group"
                  >
                    <span>{bp}</span>
                    <button
                      onClick={() => handleCopyBullet(bp, i)}
                      className="flex-shrink-0 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-1"
                      title="Copy bullet point"
                    >
                      {copiedBulletIdx === i ? (
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Copied!</span>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                        </svg>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
