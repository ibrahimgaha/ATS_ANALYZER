"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AnalysisResult } from "@/types/analysis";
import ScoreRing from "@/components/ScoreRing";
import { useLang } from "@/components/LanguageProvider";
import { t, tr } from "@/lib/translations";

// Feature flag — flip to true when Pro modal is ready
const ENABLE_PRO_MODAL = false;

function getAtsStatus(score: number, lang: "en" | "fr") {
  const sl = t.results.statusLabels;
  const sd = t.results.statusDescs;
  if (score >= 85) return { label: tr(sl.strong, lang), desc: tr(sd.strong, lang), color: "#10b981", bg: "rgba(16,185,129,0.07)", border: "rgba(16,185,129,0.2)" };
  if (score >= 70) return { label: tr(sl.good,   lang), desc: tr(sd.good,   lang), color: "#3b82f6", bg: "rgba(59,130,246,0.07)",  border: "rgba(59,130,246,0.2)"  };
  if (score >= 55) return { label: tr(sl.needs,  lang), desc: tr(sd.needs,  lang), color: "#f59e0b", bg: "rgba(245,158,11,0.07)",  border: "rgba(245,158,11,0.2)"  };
  return               { label: tr(sl.low,    lang), desc: tr(sd.low,    lang), color: "#f43f5e", bg: "rgba(244,63,94,0.07)",   border: "rgba(244,63,94,0.2)"   };
}

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span style={{ color: "var(--text-2)" }}>{label}</span>
        <span className="font-semibold tabular-nums" style={{ color: "var(--text)" }}>{value}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError]   = useState<string>("");
  const { lang } = useLang();
  const r = t.results;

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("cvscore_result");
      if (!raw) { setError(tr(r.errNotFound, lang)); return; }
      setResult(JSON.parse(raw) as AnalysisResult);
    } catch {
      setError(tr(r.errLoad, lang));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Error state ── */
  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-5 px-4 text-center">
        <div className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: "rgba(244,63,94,0.08)", color: "#f43f5e", border: "1px solid rgba(244,63,94,0.2)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>{error}</p>
          <p className="text-xs" style={{ color: "var(--text-3)" }}>{lang === "fr" ? "Importez un CV pour obtenir votre rapport." : "Upload a CV to get your report."}</p>
        </div>
        <Link href="/analyze" className="btn-primary text-sm py-2.5 px-5">{tr(r.errAnalyze, lang)}</Link>
      </div>
    );
  }

  /* ── Loading state ── */
  if (!result) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-7 h-7 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "var(--border-2)", borderTopColor: "var(--accent)" }} />
      </div>
    );
  }

  const status     = getAtsStatus(result.atsScore, lang);
  const strengths  = result.strengths.slice(0, 3);
  const weaknesses = result.weaknesses.slice(0, 3);
  const recs       = result.recommendations.slice(0, 3);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-4" style={{ color: "var(--text)" }}>

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b" style={{ borderColor: "var(--border)" }}>
        <div>
          <p className="section-label mb-1">{tr(r.sectionLabel, lang)}</p>
          <h1 className="text-xl font-bold tracking-tight" style={{ color: "var(--text)" }}>{tr(r.h1, lang)}</h1>
        </div>
        <Link href="/analyze" className="btn-ghost text-xs py-2 px-4 self-start sm:self-auto">
          {tr(r.analyzeAnother, lang)}
        </Link>
      </div>

      {/* ── Score card ── */}
      <div className="card p-6" style={{ background: "var(--surface)" }}>
        <div className="grid sm:grid-cols-12 gap-6 items-center">
          <div className="sm:col-span-4 flex flex-col items-center justify-center text-center sm:border-r sm:pr-6" style={{ borderColor: "var(--border)" }}>
            <ScoreRing score={result.atsScore} size={128} strokeWidth={9} />
            <div className="mt-3 px-3 py-1 rounded-full text-xs font-semibold border"
              style={{ background: status.bg, color: status.color, borderColor: status.border }}>
              {status.label}
            </div>
          </div>
          <div className="sm:col-span-8 space-y-4">
            <div>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--text-2)" }}>{tr(r.summary, lang)}</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>{status.desc}</p>
            </div>
            <div className="space-y-3">
              <ScoreBar label={tr(r.atsCompat,  lang)} value={result.atsScore}        color="var(--accent)" />
              <ScoreBar label={tr(r.formatting, lang)} value={result.formattingScore} color="#10b981" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Strengths + Improvements ── */}
      <div className="grid sm:grid-cols-2 gap-4">

        <div className="card p-5" style={{ background: "var(--surface)" }}>
          <p className="text-[11px] font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: "#10b981" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            {tr(r.strengths, lang)}
          </p>
          <ul className="space-y-3">
            {strengths.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
                <span className="w-4 h-4 rounded flex-shrink-0 mt-0.5 flex items-center justify-center text-[10px] font-bold"
                  style={{ background: "rgba(16,185,129,0.08)", color: "#10b981" }}>{i + 1}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5" style={{ background: "var(--surface)" }}>
          <p className="text-[11px] font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: "#f59e0b" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            {tr(r.improvements, lang)}
          </p>
          <ul className="space-y-3">
            {weaknesses.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>
                <span className="w-4 h-4 rounded flex-shrink-0 mt-0.5 flex items-center justify-center text-[10px] font-bold"
                  style={{ background: "rgba(245,158,11,0.08)", color: "#f59e0b" }}>{i + 1}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Recommendations ── */}
      <div className="card p-5" style={{ background: "var(--surface)" }}>
        <p className="text-[11px] font-bold uppercase tracking-wider mb-4" style={{ color: "var(--text-3)" }}>
          {tr(r.recs, lang)}
        </p>
        <div className="space-y-2.5">
          {recs.map((rec, i) => (
            <div key={i} className="flex items-start gap-3 text-xs leading-relaxed p-3 rounded-lg"
              style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
              <span className="w-5 h-5 rounded font-bold flex-shrink-0 flex items-center justify-center text-[11px]"
                style={{ background: "var(--accent-bg)", color: "var(--accent)", border: "1px solid var(--accent-border)" }}>
                {i + 1}
              </span>
              <span style={{ color: "var(--text-2)" }}>{rec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Pro teaser ── */}
      <div className="card p-6 relative overflow-hidden" style={{ background: "var(--surface)" }}>
        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[10px]" style={{ background: "var(--accent)" }} />

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="section-label">{tr(r.proLabel, lang)}</p>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                style={{ background: "var(--accent-bg)", color: "var(--accent)", borderColor: "var(--accent-border)" }}>
                {tr(r.proSoon, lang)}
              </span>
            </div>
            <h3 className="text-sm font-semibold" style={{ color: "var(--text)" }}>{tr(r.proH3, lang)}</h3>
            <p className="text-xs mt-1" style={{ color: "var(--text-3)" }}>{tr(r.proBody, lang)}</p>
          </div>
          <Link href="/#pricing" className="btn-ghost text-xs py-2 px-4 self-start flex-shrink-0">
            {tr(r.viewPlans, lang)}
          </Link>
        </div>

        {/* Blurred preview grid */}
        <div className="grid sm:grid-cols-2 gap-2.5 select-none">
          {r.proItems.map(({ icon, title, desc }) => (
            <div key={icon} className="relative flex items-start gap-3 p-3.5 rounded-lg border"
              style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}>
              <div style={{ opacity: 0.35 }} className="flex items-start gap-3">
                <span className="text-base flex-shrink-0">{icon}</span>
                <div>
                  <p className="text-xs font-semibold" style={{ color: "var(--text)" }}>{tr(title, lang)}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: "var(--text-3)" }}>{tr(desc, lang)}</p>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center rounded-lg" style={{ backdropFilter: "blur(3px)" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--text-3)" }}>
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer nav ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs" style={{ color: "var(--text-3)" }}>
        <p>{tr(r.disclaimer, lang)}</p>
        <div className="flex items-center gap-2">
          <Link href="/analyze" className="btn-primary text-xs py-2 px-4">{tr(r.analyzeMore, lang)}</Link>
          <Link href="/"        className="btn-ghost  text-xs py-2 px-4">{tr(r.home,        lang)}</Link>
        </div>
      </div>

      {/* Suppress unused var warning */}
      {ENABLE_PRO_MODAL && null}
    </div>
  );
}
