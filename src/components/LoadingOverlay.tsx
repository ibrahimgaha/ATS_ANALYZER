"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  {
    title: "Extracting CV text...",
    desc: "Reading document layout, structure, and experience bullet points",
    icon: (
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8" />
    ),
  },
  {
    title: "Checking ATS compatibility...",
    desc: "Simulating Applicant Tracking System parsing & scanner algorithms",
    icon: (
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    title: "Comparing keywords...",
    desc: "Matching core skills and domain terminology against role standards",
    icon: (
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    ),
  },
  {
    title: "Evaluating formatting & layout...",
    desc: "Checking readability, typography hierarchy, and visual structure",
    icon: (
      <path d="M4 6h16M4 12h16M4 18h7" />
    ),
  },
  {
    title: "Generating actionable recommendations...",
    desc: "Formulating summary rewrites and bullet point impact improvements",
    icon: (
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
  },
];

export default function LoadingOverlay() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % MESSAGES.length);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 light:bg-slate-900/40 backdrop-blur-md px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="loading-heading"
    >
      <div className="card p-8 sm:p-10 flex flex-col items-center gap-6 max-w-md w-full mx-auto text-center shadow-2xl border border-indigo-500/20 bg-slate-900/90 light:bg-white relative overflow-hidden">
        {/* Glowing background aura */}
        <div
          className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full bg-teal-500/20 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Multi-layered Animated Orb & Rings */}
        <div className="relative w-24 h-24 flex items-center justify-center my-2">
          {/* Outer glowing pulse ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-teal-500 opacity-25 animate-ping" />
          
          {/* Spinning gradient ring 1 */}
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 border-r-teal-400"
            style={{ animation: "spin 1.2s linear infinite" }}
          />

          {/* Spinning counter ring 2 */}
          <div
            className="absolute inset-2 rounded-full border-4 border-transparent border-b-cyan-400 border-l-indigo-400"
            style={{ animation: "spin 0.8s linear infinite reverse" }}
          />

          {/* Center icon badge */}
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-teal-500 flex items-center justify-center shadow-lg text-white">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300 transform scale-100"
            >
              {MESSAGES[currentStep].icon}
            </svg>
          </div>
        </div>

        {/* Dynamic Rotating Message */}
        <div className="min-h-[72px] flex flex-col justify-center transition-all duration-300">
          <h2
            id="loading-heading"
            className="text-xl font-bold text-slate-100 light:text-slate-900 mb-1.5 transition-all duration-300"
          >
            {MESSAGES[currentStep].title}
          </h2>
          <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed max-w-xs mx-auto">
            {MESSAGES[currentStep].desc}
          </p>
        </div>

        {/* Animated Progress Timeline Steps */}
        <div className="w-full space-y-2 mt-2">
          <div className="h-1.5 w-full bg-slate-800 light:bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / MESSAGES.length) * 100}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 light:text-slate-500 uppercase tracking-wider px-1">
            <span>Step {currentStep + 1} of {MESSAGES.length}</span>
            <span>{Math.round(((currentStep + 1) / MESSAGES.length) * 100)}%</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 light:text-slate-600 flex items-center gap-1.5">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="6" cy="6" r="5" />
            <path d="M6 3v3l2 1" />
          </svg>
          This usually takes 10–15 seconds
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
