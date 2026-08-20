import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CVScore — Check if your CV is ready for ATS",
  description:
    "Instantly analyze your CV for ATS compatibility. Get a score, keyword match analysis, formatting tips, and actionable recommendations — for free.",
};

// Static example result for the demo card
const EXAMPLE = {
  overallScore: 74,
  atsScore: 81,
  keywordScore: 63,
  formattingScore: 88,
};

function ExampleScoreBar({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  const color =
    score >= 75
      ? "from-emerald-500 to-teal-500"
      : score >= 50
      ? "from-amber-500 to-orange-500"
      : "from-red-500 to-rose-500";
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5 font-medium">
        <span className="text-slate-600 dark:text-slate-300">{label}</span>
        <span className="font-bold tabular-nums text-slate-900 dark:text-white">{score}</span>
      </div>
      <div className="h-2 bg-slate-100 dark:bg-white/[0.07] rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} rounded-full`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Upload your CV",
    desc: "Upload any PDF CV. We extract the text securely on our server.",
    icon: (
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
    ),
  },
  {
    step: "2",
    title: "Add a job description",
    desc: "Paste the job posting to get a keyword match analysis tailored to that role.",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </>
    ),
  },
  {
    step: "3",
    title: "Get your full report",
    desc: "Receive scores, missing keywords, strengths, weaknesses, and actionable improvements.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </>
    ),
  },
];

const PRICING = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    highlight: false,
    features: [
      "Overall ATS score",
      "ATS compatibility score",
      "Formatting score",
      "3 strengths & 3 weaknesses",
      "5 analyses per hour",
    ],
    cta: "Get started free",
    ctaHref: "/analyze",
  },
  {
    name: "Pro",
    price: "$9",
    period: "/ month",
    highlight: true,
    badge: "Coming soon",
    features: [
      "Everything in Free",
      "Full keyword match analysis",
      "Unlimited analyses",
      "Summary rewrite suggestions",
      "Bullet point rewrites",
      "PDF export of your report",
      "Priority support",
    ],
    cta: "Join waitlist",
    ctaHref: "#",
  },
];

const FAQS = [
  {
    q: "Is my CV stored on your servers?",
    a: "No. Your CV is processed in memory to generate the analysis and is not saved. We do not retain uploaded files after the response is sent.",
  },
  {
    q: "What type of CVs does this support?",
    a: "We support text-based PDF files. Scanned image PDFs (where text cannot be extracted) are not supported. Most modern CVs created in Word, Google Docs, or design tools export as text-based PDFs.",
  },
  {
    q: "Does a high score guarantee I'll pass an ATS?",
    a: "No. The score is an AI-generated estimate based on common ATS best practices. Different companies use different ATS platforms with varying rules. Use the score as guidance, not a guarantee.",
  },
  {
    q: "Do I need to paste a job description?",
    a: "No, it's optional. Without a job description, the analysis evaluates your CV against general professional standards. With a job description, you also get a keyword match score specific to that role.",
  },
  {
    q: "What AI model powers the analysis?",
    a: "We use Google Gemini 3.6 Flash. Your CV text is sent to Google's API to generate the analysis. Please review Google's data usage policies if you have concerns.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 pb-24 px-4 sm:px-6">
        {/* Background glow */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-25 blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, #6366f1 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-xs font-semibold text-indigo-600 dark:text-indigo-300 mb-6 border border-indigo-500/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block animate-pulse" />
            AI-Powered ATS CV Analyzer
          </div>

          <h1 className="section-heading text-slate-900 dark:text-white mb-5 font-black tracking-tight">
            Check if your CV is ready for{" "}
            <span className="gradient-hero-text">ATS Scanners</span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Upload your CV and get an instant ATS compatibility score — no sign-up
            required. Uncover formatting warnings, missing keywords, and actionable AI improvements.
          </p>

          <Link href="/analyze" id="hero-cta" className="btn-primary text-base px-8 py-3.5 shadow-xl">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg>
            Analyze my CV — Free
          </Link>

          <p className="mt-3.5 text-xs text-slate-500 dark:text-slate-400">
            PDF only · Max 5 MB · No registration required · No files stored
          </p>
        </div>

        {/* Example score card */}
        <div className="relative max-w-md mx-auto mt-16">
          <div className="card p-6 shadow-2xl bg-white dark:bg-slate-900/80 border-slate-200 dark:border-white/10">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
                  Example Report
                </p>
                <h2 className="font-bold text-slate-900 dark:text-white">Software_Engineer_CV.pdf</h2>
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold gradient-text">
                  {EXAMPLE.overallScore}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Overall Score</p>
              </div>
            </div>

            <div className="space-y-3.5">
              <ExampleScoreBar label="ATS Compatibility" score={EXAMPLE.atsScore} />
              <ExampleScoreBar label="Keyword Match" score={EXAMPLE.keywordScore} />
              <ExampleScoreBar label="Formatting" score={EXAMPLE.formattingScore} />
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/10 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-2">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">Strengths</p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold">
                  Clear work history
                </p>
              </div>
              <div className="rounded-lg bg-rose-500/10 border border-rose-500/20 px-3 py-2">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">Missing</p>
                <p className="text-sm text-rose-600 dark:text-rose-400 font-bold">
                  Quantified results
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-4 italic">
              Example preview card — not a real CV result
            </p>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 border-t border-slate-200 dark:border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading text-slate-900 dark:text-white mb-3">How It Works</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Three simple steps to optimize your CV for hiring managers and ATS filters.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map(({ step, title, desc, icon }) => (
              <div key={step} className="card glass-hover p-6 flex flex-col gap-4 bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center flex-shrink-0 text-indigo-600 dark:text-indigo-400">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {icon}
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                    Step {step}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1.5">{title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-20 px-4 sm:px-6 border-t border-slate-200 dark:border-white/[0.05]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading text-slate-900 dark:text-white mb-3">Simple Pricing</h2>
            <p className="text-slate-600 dark:text-slate-400">Start free. Upgrade when you need more power.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {PRICING.map((plan) => (
              <div
                key={plan.name}
                className={`card p-7 flex flex-col gap-5 relative overflow-hidden ${
                  plan.highlight
                    ? "border-indigo-500/50 bg-indigo-500/[0.05] dark:bg-indigo-500/[0.08]"
                    : "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/10"
                }`}
              >
                {plan.badge && (
                  <span className="absolute top-4 right-4 text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-500/30">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">
                    {plan.name}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-slate-500 text-sm font-medium">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        className="flex-shrink-0 mt-0.5 text-indigo-500"
                        fill="none"
                      >
                        <circle cx="8" cy="8" r="7" fill="currentColor" fillOpacity="0.15" />
                        <path
                          d="M5 8l2 2 4-4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.ctaHref}
                  id={`pricing-cta-${plan.name.toLowerCase()}`}
                  className={
                    plan.highlight ? "btn-primary text-sm" : "btn-secondary text-sm"
                  }
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 px-4 sm:px-6 border-t border-slate-200 dark:border-white/[0.05]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading text-slate-900 dark:text-white mb-3">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map(({ q, a }, i) => (
              <details
                key={i}
                id={`faq-${i}`}
                className="card glass-hover group cursor-pointer overflow-hidden bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/10"
              >
                <summary className="flex items-center justify-between gap-4 px-5 py-4 list-none font-semibold text-slate-900 dark:text-slate-200 select-none">
                  {q}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    className="flex-shrink-0 text-slate-400 group-open:rotate-180 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4.5 6.75L9 11.25l4.5-4.5" />
                  </svg>
                </summary>
                <div className="px-5 pb-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/[0.05] pt-3">
                  {a}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/analyze" id="faq-cta" className="btn-primary">
              Analyze my CV now →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
