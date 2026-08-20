import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-white/[0.06] mt-auto transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="font-extrabold text-lg text-slate-900 dark:text-white mb-2">
              CV<span className="gradient-text">Score</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              AI-powered ATS CV analysis. Get honest, actionable feedback on
              your resume in seconds.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 mb-3">
              Product
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/#how-it-works" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/analyze" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
                  Analyze my CV
                </Link>
              </li>
            </ul>
          </div>

          {/* Privacy */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 mb-3">
              Privacy & Legal
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
              Your CV is processed in real-time to generate analysis results. We
              do not permanently store uploaded CV files. CVScore does not
              guarantee ATS approval or employment outcomes. Scores are
              estimates based on AI analysis and should be used as guidance
              only.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} CVScore. All rights reserved.</p>
          <p>
            AI-generated analysis — not a guarantee of ATS compatibility or job
            success.
          </p>
        </div>
      </div>
    </footer>
  );
}
