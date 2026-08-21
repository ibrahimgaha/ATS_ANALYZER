import Link from "next/link";

const LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/analyze", label: "Analyze CV" },
];

export default function Footer() {
  return (
    <footer className="border-t mt-auto" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div className="sm:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-[5px] flex items-center justify-center text-white text-[10px] font-bold"
                style={{ background: "var(--accent)" }}
              >
                CV
              </div>
              <span className="font-bold text-sm tracking-tight" style={{ color: "var(--text)" }}>
                CV<span style={{ color: "var(--accent)" }}>Score</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-[220px]" style={{ color: "var(--text-3)" }}>
              ATS resume checker for job seekers. Evaluate formatting, structure, and keyword alignment instantly.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: "#10b981" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Zero data storage
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: "var(--text-3)" }}>
              Product
            </h3>
            <ul className="space-y-2">
              {LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs transition-colors hover:underline"
                    style={{ color: "var(--text-2)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Privacy */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: "var(--text-3)" }}>
              Privacy
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-3)" }}>
              Your CV is processed in memory during your session only. It is never stored, indexed, or shared with third parties.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]"
          style={{ borderColor: "var(--border)", color: "var(--text-3)" }}
        >
          <p>© {new Date().getFullYear()} CVScore. All rights reserved.</p>
          <p>Algorithmic analysis — not a guarantee of employment outcomes.</p>
          <p>Designed & developed by Ibrahim Gaha</p>
        </div>
      </div>
    </footer>
  );
}
