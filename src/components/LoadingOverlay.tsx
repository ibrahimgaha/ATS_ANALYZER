"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { t, tr } from "@/lib/translations";

export default function LoadingOverlay() {
  const [step, setStep] = useState(0);
  const { lang } = useLang();
  const steps = t.loading.steps;

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 2600);
    return () => clearInterval(timer);
  }, [steps.length]);

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="loading-heading"
    >
      <div
        className="card w-full max-w-sm p-8 flex flex-col items-center gap-6 text-center shadow-2xl"
        style={{ background: "var(--surface)" }}
      >
        {/* Circular progress ring */}
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="none" strokeWidth="3" style={{ stroke: "var(--border-2)" }} />
            <circle
              cx="24" cy="24" r="20"
              fill="none" strokeWidth="3" strokeLinecap="round"
              style={{
                stroke: "var(--accent)",
                strokeDasharray: `${2 * Math.PI * 20}`,
                strokeDashoffset: `${2 * Math.PI * 20 * (1 - progress / 100)}`,
                transition: "stroke-dashoffset 0.6s ease",
              }}
            />
          </svg>
          <span
            className="absolute inset-0 flex items-center justify-center text-xs font-bold tabular-nums"
            style={{ color: "var(--accent)" }}
          >
            {Math.round(progress)}%
          </span>
        </div>

        {/* Step text */}
        <div>
          <h2 id="loading-heading" className="text-base font-semibold mb-1" style={{ color: "var(--text)" }}>
            {tr(steps[step].label, lang)}
          </h2>
          <p className="text-sm" style={{ color: "var(--text-3)" }}>
            {tr(steps[step].sub, lang)}
          </p>
        </div>

        {/* Step dots */}
        <div className="flex items-center gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === step ? 18 : 6,
                height: 6,
                background: i === step ? "var(--accent)" : "var(--border-2)",
              }}
            />
          ))}
        </div>

        <p className="text-xs" style={{ color: "var(--text-3)" }}>
          {tr(t.loading.wait, lang)}
        </p>
      </div>
    </div>
  );
}
