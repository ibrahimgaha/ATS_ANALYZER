import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CVScore — Check if your CV is ready for ATS",
  description:
    "Instantly check if your CV is ready for Applicant Tracking Systems. Get a score, keyword match analysis, formatting feedback, and actionable recommendations.",
};

// Static example result for the demo preview card
const EXAMPLE = {
  overallScore: 78,
  atsScore: 84,
  keywordScore: 72,
  formattingScore: 90,
};

function ExampleScoreBar({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs font-semibold mb-1">
        <span className="text-slate-600 dark:text-slate-400">{label}</span>
        <span className="tabular-nums text-slate-900 dark:text-slate-100">{score}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Upload your CV",
    desc: "Upload your resume in PDF format. We extract and parse your text securely in real time.",
  },
  {
    step: "02",
    title: "Optionally add a job posting",
    desc: "Paste the job description to evaluate keyword density and role alignment.",
  },
  {
    step: "03",
    title: "Review your ATS report",
    desc: "Get an instant score, formatting warnings, missing skills, and targeted rewrite suggestions.",
  },
];

const FAQS = [
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
  {
    q: "Which AI model powers the analysis?",
    a: "CVScore uses Google Gemini 3.6 Flash for high-accuracy structured feedback and resume rewrites.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero Section ── */}
      <section className="pt-16 pb-20 px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800/80">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            Applicant Tracking System Checker
          </div>

          <h1 className="section-heading text-slate-900 dark:text-slate-50 mb-5">
            Check if your CV is ready for <span className="brand-text">ATS</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            Upload your CV as a PDF and optionally paste a job description. Receive instant feedback on ATS compatibility, formatting issues, missing keywords, and actionable recommendations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/analyze" id="hero-cta" className="btn-primary text-sm font-semibold px-6 py-3">
              Analyze My CV
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            Free · PDF only · Max 5 MB · No account required · Files are never stored
          </p>
        </div>

        {/* Minimal Preview Card */}
        <div className="max-w-md mx-auto mt-12">
          <div className="card p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Sample Analysis
                </p>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Resume_Senior_Developer.pdf
                </h2>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {EXAMPLE.atsScore}
                </span>
                <span className="text-[10px] text-slate-400 block font-medium">/ 100 ATS</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <ExampleScoreBar label="ATS Compatibility" score={EXAMPLE.atsScore} />
              <ExampleScoreBar label="Keyword Match" score={EXAMPLE.keywordScore} />
              <ExampleScoreBar label="Formatting & Layout" score={EXAMPLE.formattingScore} />
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs text-slate-500">
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">✓ Standard PDF layout</span>
              <span className="text-amber-600 dark:text-amber-400 font-medium">! 4 Missing keywords</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800/80">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
              How It Works
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              A simple process to evaluate your resume before applying.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step} className="card p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 block mb-2">
                  {step}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-16 px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800/80">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
              Transparent Pricing
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Free to use during our initial release.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* FREE PLAN */}
            <div className="card p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">FREE</h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    Active
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">$0</span>
                  <span className="text-xs text-slate-500 font-medium">/ Forever</span>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 mb-6">
                  {[
                    "Overall ATS score",
                    "ATS compatibility score",
                    "Formatting score",
                    "Key strengths & weaknesses",
                    "Basic recommendations",
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
                Analyze My CV
              </Link>
            </div>

            {/* PRO PLAN — COMING SOON */}
            <div className="card p-6 bg-slate-50/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 flex flex-col justify-between relative opacity-90">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">PRO</h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    Coming Soon
                  </span>
                </div>

                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-xl font-bold text-slate-400">TBA</span>
                </div>

                <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
                  {[
                    "Everything in Free",
                    "Full detailed analysis & keyword matching",
                    "Missing keywords list",
                    "Section-by-section analysis",
                    "Improved professional summary rewrite",
                    "Improved experience bullet points",
                    "Job-specific recommendations",
                    "Downloadable detailed report",
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

              <button
                disabled
                className="btn-secondary w-full text-center text-xs py-2.5 opacity-60 cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <details
                key={i}
                id={`faq-${i}`}
                className="card bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 group cursor-pointer overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-4 py-3.5 list-none font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-200 select-none">
                  {q}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    className="flex-shrink-0 text-slate-400 group-open:rotate-180 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                  {a}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/analyze" id="faq-cta" className="btn-primary text-xs py-2.5 px-5">
              Analyze My CV
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
