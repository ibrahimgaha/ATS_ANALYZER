"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AnalysisResult } from "@/types/analysis";
import UploadDropzone from "@/components/UploadDropzone";
import LoadingOverlay from "@/components/LoadingOverlay";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function AnalyzePage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");

  const handleFileSelect = (selected: File) => {
    setFileError("");
    setApiError("");

    if (selected.type !== "application/pdf" && !selected.name.toLowerCase().endsWith(".pdf")) {
      setFileError("Only PDF documents are supported. Please upload a .pdf file.");
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setFileError(`File size exceeds the 5 MB limit (${(selected.size / 1024 / 1024).toFixed(1)} MB).`);
      return;
    }
    setFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!file) {
      setFileError("Please upload your CV as a PDF before submitting.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("cv", file);
      if (jobDescription.trim()) {
        formData.append("jobDescription", jobDescription.trim());
      }

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const responseText = await res.text();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let data: any = null;

      if (responseText && responseText.trim()) {
        try {
          data = JSON.parse(responseText);
        } catch (jsonErr) {
          console.error("Non-JSON API response received:", responseText.slice(0, 300), jsonErr);
        }
      }

      if (!res.ok) {
        const serverError =
          data?.error ||
          `Server Error (${res.status} ${res.statusText || ""}). Please verify your connection or GEMINI_API_KEY environment variable.`;
        throw new Error(serverError);
      }

      if (!data || typeof data !== "object") {
        throw new Error(
          "Received an empty response from the server. Please try analyzing your CV again."
        );
      }

      const result = data as AnalysisResult;
      // Store in sessionStorage — no persistent data, expires with session
      sessionStorage.setItem("cvscore_result", JSON.stringify(result));
      router.push("/results");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setApiError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingOverlay />}

      <div className="min-h-[calc(100vh-4rem)] py-10 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Guidelines, Requirements & Tips */}
          <div className="lg:col-span-5 flex flex-col text-left space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Evaluation Workspace
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mt-1 mb-3">
                Upload your CV for ATS screening
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Applicant tracking systems scan documents for standard heading hierarchies, clean text streams, and keyword density.
              </p>
            </div>

            {/* Preparation Checklist */}
            <div className="card p-5 bg-white dark:bg-[#131722] border-slate-200 dark:border-slate-800 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                Optimal PDF Preparation
              </h2>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                  <span><strong>Text-based PDF:</strong> Export directly from Word or Google Docs (not a flat image or scan).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                  <span><strong>Standard Headings:</strong> Use clear sections like <em>Experience</em>, <em>Education</em>, and <em>Skills</em>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                  <span><strong>File Limits:</strong> Standard PDF files up to 5 MB.</span>
                </li>
              </ul>
            </div>

            {/* Privacy Guarantee Box */}
            <div className="card p-4 bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-3">
              <div className="w-6 h-6 rounded-md bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 flex-shrink-0 mt-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">Client-Side Privacy</span>
                Your CV is analyzed in memory for this session only. We never sell, index, or permanently store uploaded resumes.
              </div>
            </div>
          </div>

          {/* Right Column: Upload & Job Description Form */}
          <div className="lg:col-span-7">
            <div className="card p-6 sm:p-7 bg-white dark:bg-[#131722] border-slate-200 dark:border-slate-800 shadow-sm">
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                {/* CV Upload */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    CV / Resume (PDF) <span className="text-rose-500">*</span>
                  </label>
                  <UploadDropzone
                    onFileSelect={handleFileSelect}
                    selectedFile={file}
                    error={fileError}
                  />
                </div>

                {/* Job Description Area */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label
                      htmlFor="job-description"
                      className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
                    >
                      Target Job Description
                    </label>
                    <span className="text-[11px] text-slate-400 font-medium">Optional</span>
                  </div>
                  <textarea
                    id="job-description"
                    rows={6}
                    disabled={loading}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here to evaluate exact keyword match density and role-specific qualification terminology..."
                    maxLength={5000}
                    className="w-full rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors disabled:opacity-50"
                  />
                  <p className="text-[11px] text-slate-400 text-right mt-1 font-mono">
                    {jobDescription.length}/5000
                  </p>
                </div>

                {/* API Error Alert */}
                {apiError && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 p-3.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="flex-shrink-0 mt-0.5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span className="leading-relaxed">{apiError}</span>
                  </div>
                )}

                {/* Submit Action Button */}
                <button
                  type="submit"
                  id="analyze-submit"
                  disabled={loading || !file}
                  className="btn-primary py-3 text-sm font-bold w-full"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Processing Evaluation...
                    </>
                  ) : (
                    <>
                      Analyze My CV
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
