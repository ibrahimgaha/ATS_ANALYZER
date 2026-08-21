"use client";

import { useLang, type Lang } from "./LanguageProvider";

function FlagUK() {
  return (
    <svg width="20" height="15" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#012169"/>
      {/* White diagonals */}
      <line x1="0" y1="0" x2="60" y2="40" stroke="white" strokeWidth="8"/>
      <line x1="60" y1="0" x2="0" y2="40" stroke="white" strokeWidth="8"/>
      {/* Red diagonals */}
      <line x1="0" y1="0" x2="60" y2="40" stroke="#C8102E" strokeWidth="4.5"/>
      <line x1="60" y1="0" x2="0" y2="40" stroke="#C8102E" strokeWidth="4.5"/>
      {/* White cross */}
      <rect x="24" y="0" width="12" height="40" fill="white"/>
      <rect x="0" y="14" width="60" height="12" fill="white"/>
      {/* Red cross */}
      <rect x="26" y="0" width="8" height="40" fill="#C8102E"/>
      <rect x="0" y="16" width="60" height="8" fill="#C8102E"/>
    </svg>
  );
}

function FlagFR() {
  return (
    <svg width="20" height="15" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#ED2939"/>
      <rect width="40" height="40" fill="white"/>
      <rect width="20" height="40" fill="#002395"/>
    </svg>
  );
}

const LANGS: { code: Lang; Flag: () => JSX.Element; label: string }[] = [
  { code: "en", Flag: FlagUK, label: "English" },
  { code: "fr", Flag: FlagFR, label: "Français" },
];

export default function LangSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div
      className="flex items-center rounded-md border overflow-hidden"
      style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
    >
      {LANGS.map(({ code, Flag, label }, i) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className="flex items-center justify-center w-9 h-8 transition-all duration-150"
          style={{
            background: lang === code ? "var(--accent)" : "transparent",
            borderRight: i < LANGS.length - 1 ? "1px solid var(--border)" : "none",
            cursor: "pointer",
            opacity: lang === code ? 1 : 0.6,
          }}
          aria-label={`Switch to ${label}`}
          aria-pressed={lang === code}
          title={label}
        >
          <Flag />
        </button>
      ))}
    </div>
  );
}
