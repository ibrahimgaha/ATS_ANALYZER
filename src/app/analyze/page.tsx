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

    if (selected.type !== "application/pdf") {
      setFileError("Only PDF files are accepted. Please upload a .pdf file.");
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setFileError(`File is too large (${(selected.size / 1024 / 1024).toFixed(1)} MB). Maximum size is 5 MB.`);
      return;
    }
    setFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!file) {
      setFileError("Please upload your CV as a PDF.");
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
          `Server Error (${res.status} ${res.statusText || ""}). Please verify GEMINI_API_KEY is configured in your Vercel Project Settings.`;
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

      <div className="min-h-[calc(100vh-4rem)] flex items-start justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50 mb-2 tracking-tight">
              Analyze Your CV
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Upload your resume in PDF format. Optionally paste a job posting to measure role alignment.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {/* Upload Area */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                CV / Resume <span className="text-rose-500">*</span>
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
                rows={5}
                disabled={loading}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description here to receive a role-specific keyword match score..."
                maxLength={5000}
                className="w-full rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm disabled:opacity-50"
              />
              <p className="text-[11px] text-slate-400 text-right mt-1 font-mono">
                {jobDescription.length}/5000
              </p>
            </div>

            {/* User-friendly Error Banner */}
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

            {/* Privacy Guarantee Notice */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <span>Files are processed in real time and are never stored or saved on our servers.</span>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              id="analyze-submit"
              disabled={loading || !file}
              className="btn-primary py-3 text-sm font-bold w-full"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Analyzing CV...
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
    </>
  );
}
