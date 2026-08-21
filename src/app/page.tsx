"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { t, tr } from "@/lib/translations";

const PREVIEWS = [
  {
    role: { en: "Software Engineer", fr: "Ingénieur Logiciel" },
    score: 88, kw: 84, fmt: 92,
    matched: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    missing: ["Docker", "CI/CD", "AWS"],
    tip: { en: "Add cloud deployment tools to your experience section.", fr: "Ajoutez des outils de déploiement cloud à votre section expérience." },
  },
  {
    role: { en: "Product Manager", fr: "Chef de Produit" },
    score: 71, kw: 67, fmt: 80,
    matched: ["Roadmapping", "Agile", "User Research"],
    missing: ["A/B Testing", "SQL", "GTM"],
    tip: { en: "Quantify your achievements with specific metrics.", fr: "Quantifiez vos réalisations avec des métriques précises." },
  },
];

function ScoreMeter({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-[5px] rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
      <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-4">
      <button className="w-full flex items-center justify-between gap-4 text-left" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>{q}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          style={{ color: "var(--text-3)", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease", flexShrink: 0 }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <p className="text-sm mt-3 leading-relaxed" style={{ color: "var(--text-3)" }}>{a}</p>}
    </div>
  );
}

export default function HomePage() {
  const [tab, setTab] = useState(0);
  const { lang } = useLang();
  const p = PREVIEWS[tab];

  const h = t.hero;
  const feat = t.features;
  const how = t.how;
  const pr = t.pricing;
  const faq = t.faq;

  const FEATURE_ICONS = [
    <svg key="f1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    <svg key="f2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    <svg key="f3" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>,
    <svg key="f4" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
  ];

  return (
    <div>

      {/* ── HERO ── */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

          <div>
            <div className="tag-accent mb-6 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              {tr(h.badge, lang)}
            </div>
            <h1 className="font-extrabold tracking-tight leading-[1.08] mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text)" }}>
              {tr(h.h1a, lang)}<br />{tr(h.h1b, lang)}
            </h1>
            <p className="body-text mb-8 max-w-md">{tr(h.body, lang)}</p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link href="/analyze" id="hero-cta" className="btn-primary py-3 px-6 text-[15px]">
                {tr(h.cta, lang)}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <a href="#how-it-works" className="btn-ghost py-3 px-5 text-[15px]">{tr(h.ctaSub, lang)}</a>
            </div>
            <p className="text-xs" style={{ color: "var(--text-3)" }}>{tr(h.foot, lang)}</p>
          </div>

          {/* Interactive preview */}
          <div className="card p-5" style={{ background: "var(--surface)" }}>
            <div className="flex items-center justify-between pb-4 mb-4 border-b" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md flex items-center justify-center text-white font-bold text-[11px]" style={{ background: "var(--accent)" }}>PDF</div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-3)" }}>{tr(h.sampleLabel, lang)}</p>
                  <p className="text-xs font-semibold" style={{ color: "var(--text)" }}>{tr(p.role, lang)}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 rounded-md p-1" style={{ background: "var(--bg-subtle)" }}>
                {PREVIEWS.map((pr, i) => (
                  <button key={i} onClick={() => setTab(i)}
                    className="text-[11px] font-medium px-2.5 py-1 rounded transition-all"
                    style={{ background: tab === i ? "var(--surface)" : "transparent", color: tab === i ? "var(--text)" : "var(--text-3)", boxShadow: tab === i ? "0 1px 3px rgba(0,0,0,0.12)" : "none" }}>
                    {tr(pr.role, lang).split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg px-4 py-3 mb-4" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: "var(--text-3)" }}>{tr(h.atsScore, lang)}</p>
                <p className="text-xs font-medium" style={{ color: "var(--text-2)" }}>
                  {p.score >= 80 ? tr(h.passes, lang) : tr(h.minor, lang)}
                </p>
              </div>
              <span className="text-2xl font-extrabold tabular-nums" style={{ color: p.score >= 75 ? "#10b981" : "#f59e0b" }}>
                {p.score}<span className="text-sm font-normal ml-0.5" style={{ color: "var(--text-3)" }}>/100</span>
              </span>
            </div>

            <div className="space-y-3 mb-4">
              {[
                { label: tr(h.kwLabel, lang), val: p.kw,  color: "var(--accent)" },
                { label: tr(h.fmtLabel, lang), val: p.fmt, color: "#10b981" },
              ].map(({ label, val, color }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1.5" style={{ color: "var(--text-2)" }}>
                    <span>{label}</span>
                    <span className="font-mono font-semibold" style={{ color: "var(--text)" }}>{val}%</span>
                  </div>
                  <ScoreMeter value={val} color={color} />
                </div>
              ))}
            </div>

            <div className="pt-3 border-t" style={{ borderColor: "var(--border)" }}>
              <p className="text-[11px] font-semibold mb-2" style={{ color: "var(--text-3)" }}>{tr(h.kwDetected, lang)}</p>
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {p.matched.map((kw) => <span key={kw} className="chip-green">✓ {kw}</span>)}
                {p.missing.map((kw) => <span key={kw} className="chip-muted">+ {kw}</span>)}
              </div>
              <p className="text-[11px]" style={{ color: "var(--text-3)" }}>
                <span className="font-semibold" style={{ color: "#f59e0b" }}>{tr(h.tip, lang)}</span>{" "}{tr(p.tip, lang)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROOF STRIP ── */}
      <div className="py-5 px-4 sm:px-6 border-b" style={{ background: "var(--bg-subtle)", borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-6 text-xs" style={{ color: "var(--text-3)" }}>
          {t.proof.map((item, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              {tr(item, lang)}
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="section-label mb-2">{tr(feat.sectionLabel, lang)}</p>
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text)" }}>{tr(feat.h2, lang)}</h2>
            <p className="body-text mt-2 max-w-lg">{tr(feat.body, lang)}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {feat.items.map((item, i) => (
              <div key={i} className="card card-lift p-5 flex flex-col gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "var(--accent-bg)", color: "var(--accent)", border: "1px solid var(--accent-border)" }}>
                  {FEATURE_ICONS[i]}
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>{tr(item.title, lang)}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-3)" }}>{tr(item.desc, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="section-label mb-2">{tr(how.sectionLabel, lang)}</p>
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text)" }}>{tr(how.h2, lang)}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {how.steps.map((step, i) => (
              <div key={i} className="card p-6 relative">
                <span className="absolute -top-3 -left-1 text-5xl font-extrabold select-none pointer-events-none" style={{ color: "var(--border-2)", lineHeight: 1 }}>{i + 1}</span>
                <div className="mt-5">
                  <p className="text-sm font-semibold mb-1.5" style={{ color: "var(--text)" }}>{tr(step.title, lang)}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-3)" }}>{tr(step.desc, lang)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/analyze" className="btn-primary py-3 px-6 text-sm">
              {tr(how.cta, lang)}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="section-label mb-2">{tr(pr.sectionLabel, lang)}</p>
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text)" }}>{tr(pr.h2, lang)}</h2>
            <p className="body-text mt-2">{tr(pr.body, lang)}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 items-start">
            {/* FREE */}
            <div className="card p-6 flex flex-col gap-5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-2)" }}>{tr(pr.free.name, lang)}</span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border" style={{ background: "rgba(16,185,129,0.07)", color: "#10b981", borderColor: "rgba(16,185,129,0.2)" }}>{tr(pr.active, lang)}</span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-extrabold" style={{ color: "var(--text)" }}>$0</span>
                  <span className="text-sm" style={{ color: "var(--text-3)" }}>{tr(pr.forever, lang)}</span>
                </div>
                <p className="text-xs" style={{ color: "var(--text-3)" }}>{tr(pr.free.sub, lang)}</p>
              </div>
              <ul className="space-y-2.5 text-sm flex-1" style={{ color: "var(--text-2)" }}>
                {pr.free.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    {tr(item, lang)}
                  </li>
                ))}
              </ul>
              <Link href="/analyze" id="pricing-free-cta" className="btn-primary text-center text-sm py-2.5 w-full">{tr(pr.free.cta, lang)}</Link>
            </div>

            {/* PRO */}
            <div className="card p-6 flex flex-col gap-5 relative" style={{ borderColor: "var(--accent)", boxShadow: "0 0 0 1px var(--accent-border)" }}>
              <div className="absolute -top-3 left-6 text-[11px] font-bold px-3 py-0.5 rounded-full text-white" style={{ background: "var(--accent)" }}>
                {lang === "fr" ? "Le plus populaire" : "Most Popular"}
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-2)" }}>{tr(pr.pro.name, lang)}</span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border" style={{ background: "var(--accent-bg)", color: "var(--accent)", borderColor: "var(--accent-border)" }}>{tr(pr.comingSoon, lang)}</span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-extrabold" style={{ color: "var(--text)" }}>$4.99</span>
                  <span className="text-sm" style={{ color: "var(--text-3)" }}>{tr(pr.month, lang)}</span>
                </div>
                <p className="text-xs" style={{ color: "var(--text-3)" }}>{tr(pr.pro.sub, lang)}</p>
              </div>
              <ul className="space-y-2.5 text-sm flex-1" style={{ color: "var(--text-2)" }}>
                {pr.pro.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    {tr(item, lang)}
                  </li>
                ))}
              </ul>
              <button disabled className="btn-primary text-sm py-2.5 w-full opacity-50 cursor-not-allowed">{tr(pr.pro.cta, lang)}</button>
            </div>

            {/* BUILDER */}
            <div className="card p-6 flex flex-col gap-5" style={{ background: "var(--bg-subtle)" }}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-2)" }}>{tr(pr.builder.name, lang)}</span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border" style={{ background: "rgba(168,85,247,0.07)", color: "#a855f7", borderColor: "rgba(168,85,247,0.2)" }}>{tr(pr.comingSoon, lang)}</span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-extrabold" style={{ color: "var(--text)" }}>$8.99</span>
                  <span className="text-sm" style={{ color: "var(--text-3)" }}>{tr(pr.month, lang)}</span>
                </div>
                <p className="text-xs" style={{ color: "var(--text-3)" }}>{tr(pr.builder.sub, lang)}</p>
              </div>
              <ul className="space-y-2.5 text-sm flex-1" style={{ color: "var(--text-2)" }}>
                {pr.builder.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    {tr(item, lang)}
                  </li>
                ))}
              </ul>
              <button disabled className="btn-secondary text-sm py-2.5 w-full opacity-50 cursor-not-allowed">{tr(pr.builder.cta, lang)}</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <p className="section-label mb-2">{tr(faq.sectionLabel, lang)}</p>
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text)" }}>{tr(faq.h2, lang)}</h2>
          </div>
          <div className="divide-y" style={{ borderColor: "var(--border)" }}>
            {faq.items.map((item, i) => (
              <FaqItem key={i} q={tr(item.q, lang)} a={tr(item.a, lang)} />
            ))}
          </div>
          <div className="mt-12">
            <Link href="/analyze" id="faq-cta" className="btn-primary text-sm py-3 px-6">{tr(faq.cta, lang)}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
