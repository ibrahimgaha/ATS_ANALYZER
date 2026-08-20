"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Reading your CV...",
  "Checking ATS compatibility...",
  "Analyzing formatting...",
  "Comparing your CV with the job description...",
  "Preparing your results...",
];

export default function LoadingOverlay() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % MESSAGES.length);
    }, 2400);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="loading-heading"
    >
      <div className="card p-8 flex flex-col items-center gap-5 max-w-sm w-full text-center shadow-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        {/* Minimalist Spinner */}
        <div className="w-10 h-10 rounded-full border-3 border-slate-200 dark:border-slate-800 border-t-indigo-600 dark:border-t-indigo-500 animate-spin" />

        <div>
          <h2
            id="loading-heading"
            className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1 transition-all duration-300"
          >
            {MESSAGES[currentStep]}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Please wait while we generate your report. This usually takes 10–15 seconds.
          </p>
        </div>

        {/* Minimal Progress Indicator */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden mt-1">
          <div
            className="bg-indigo-600 dark:bg-indigo-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / MESSAGES.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
