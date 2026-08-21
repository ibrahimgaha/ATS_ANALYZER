"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AnalysisResult } from "@/types/analysis";
import UploadDropzone from "@/components/UploadDropzone";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useLang } from "@/components/LanguageProvider";
import { t, tr } from "@/lib/translations";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function AnalyzePage() {
  const router = useRouter();
  const { lang } = useLang();
  const a = t.analyze;

  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");

  const handleFileSelect = (selected: File) => {
    setFileError("");
    setApiError("");
    if (selected.type !== "application/pdf" && !selected.name.toLowerCase().endsWith(".pdf")) {
      setFileError(tr(a.errPdf, lang));
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setFileError(`${tr(a.errSize, lang)} (${(selected.size / 1024 / 1024).toFixed(1)} MB).`);
      return;
    }
    setFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    if (!file) { setFileError(tr(a.errFile, lang)); return; }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("cv", file);
      if (jobDescription.trim()) fd.append("jobDescription", jobDescription.trim());

      const res = await fetch("/api/analyze", { method: "POST", body: fd });
      const text = await res.text();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let data: any = null;
      if (text?.trim()) {
        try { data = JSON.parse(text); } catch (e) {
          console.error("Non-JSON response:", text.slice(0, 300), e);
        }
      }
      if (!res.ok) throw new Error(data?.error || `Server error ${res.status}.`);
      if (!data || typeof data !== "object") throw new Error("Empty response. Please try again.");

      sessionStorage.setItem("cvscore_result", JSON.stringify(data as AnalysisResult));
      router.push("/results");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingOverlay />}

      <div className="min-h-[calc(100vh-56px)] py-12 lg:py-18 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-10 items-start">

          {/* ── Sidebar ── */}
          <aside className="lg:col-span-2 space-y-5">
            <div>
              <p className="section-label mb-3">{tr(a.sectionLabel, lang)}</p>
              <h1
                className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 leading-tight"
                style={{ color: "var(--text)" }}
              >
                {tr(a.h1, lang)}
              </h1>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                {tr(a.body, lang)}
              </p>
            </div>

            {/* Tips card */}
            <div className="card p-4 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-3)" }}>
                {tr(a.tipsTitle, lang)}
              </p>
              <ul className="space-y-2.5">
                {a.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-2)" }}>
                    <span className="font-semibold mt-0.5 flex-shrink-0" style={{ color: "#10b981" }}>✓</span>
                    <span>{tr(tip, lang)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Privacy note */}
            <div
              className="flex items-start gap-3 p-4 rounded-lg border text-xs"
              style={{ background: "var(--surface-2)", borderColor: "var(--border)", color: "var(--text-3)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 flex-shrink-0">
                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>{tr(a.privacyNote, lang)}</span>
            </div>
          </aside>

          {/* ── Form ── */}
          <main className="lg:col-span-3">
            <div className="card p-6 sm:p-7" style={{ background: "var(--surface)" }}>
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

                {/* Upload */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: "var(--text-2)" }}>
                    {tr(a.cvLabel, lang)} <span style={{ color: "#f43f5e" }}>*</span>
                  </label>
                  <UploadDropzone onFileSelect={handleFileSelect} selectedFile={file} error={fileError} />
                </div>

                {/* Job description */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label
                      htmlFor="job-description"
                      className="block text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--text-2)" }}
                    >
                      {tr(a.jdLabel, lang)}
                    </label>
                    <span
                      className="text-[11px] font-medium px-2 py-0.5 rounded"
                      style={{ background: "var(--bg-subtle)", color: "var(--text-3)", border: "1px solid var(--border)" }}
                    >
                      {tr(a.optional, lang)}
                    </span>
                  </div>
                  <textarea
                    id="job-description"
                    rows={6}
                    disabled={loading}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder={tr(a.jdPlaceholder, lang)}
                    maxLength={5000}
                    className="input resize-none leading-relaxed"
                    style={{ minHeight: 130 }}
                  />
                  <p className="text-[11px] text-right mt-1.5 font-mono" style={{ color: "var(--text-3)" }}>
                    {jobDescription.length}/5000
                  </p>
                </div>

                {/* API error */}
                {apiError && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 p-3.5 rounded-lg border text-sm"
                    style={{ background: "rgba(244,63,94,0.05)", borderColor: "rgba(244,63,94,0.25)", color: "#f43f5e" }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span className="leading-relaxed">{apiError}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  id="analyze-submit"
                  disabled={loading || !file}
                  className="btn-primary py-3 text-sm font-semibold w-full"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      {tr(a.submitting, lang)}
                    </>
                  ) : (
                    <>
                      {tr(a.submit, lang)}
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
