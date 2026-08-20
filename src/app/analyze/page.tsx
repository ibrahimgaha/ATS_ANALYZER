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

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? `Request failed (${res.status})`);
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

      <div className="min-h-[calc(100vh-4rem)] flex items-start justify-center px-4 sm:px-6 py-16">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="section-heading text-slate-900 dark:text-white mb-3">
              Analyze your CV
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Upload your PDF CV and optionally paste a job description for a
              targeted ATS analysis.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
            {/* Upload */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                CV / Resume{" "}
                <span className="text-rose-500" aria-hidden="true">*</span>
              </label>
              <UploadDropzone
                onFileSelect={handleFileSelect}
                selectedFile={file}
                error={fileError}
              />
            </div>

            {/* Job Description */}
            <div>
              <label
                htmlFor="job-description"
                className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2"
              >
                Job description{" "}
                <span className="text-slate-500 font-normal">(optional)</span>
              </label>
              <textarea
                id="job-description"
                rows={6}
                disabled={loading}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job description here to get a keyword match score tailored to this specific role…"
                maxLength={5000}
                className="w-full rounded-xl bg-white dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 px-4 py-3 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm disabled:opacity-50"
              />
              <p className="text-xs text-slate-500 dark:text-slate-500 text-right mt-1 font-mono">
                {jobDescription.length}/5000
              </p>
            </div>

            {/* API error */}
            {apiError && (
              <div
                role="alert"
                className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="currentColor"
                  className="flex-shrink-0 mt-0.5"
                >
                  <path d="M9 1.5a7.5 7.5 0 100 15A7.5 7.5 0 009 1.5zm0 11.25a.75.75 0 110-1.5.75.75 0 010 1.5zm.75-3.75a.75.75 0 11-1.5 0V5.25a.75.75 0 011.5 0v3.75z" />
                </svg>
                <span>{apiError}</span>
              </div>
            )}

            {/* Privacy notice */}
            <div className="flex items-start gap-2.5 text-xs text-gray-600 leading-relaxed">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="flex-shrink-0 mt-0.5"
              >
                <path d="M7 1L1.5 3.5v3.75C1.5 10.375 4 12.625 7 13.5c3-0.875 5.5-3.125 5.5-6.25V3.5L7 1z" />
              </svg>
              <span>
                Your CV is processed in real-time to generate the analysis. We
                do not store uploaded files. This tool does not guarantee ATS
                approval or employment outcomes.
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="analyze-submit"
              disabled={loading || !file}
              className="btn-primary py-3.5 text-base"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <circle
                      cx="9"
                      cy="9"
                      r="7"
                      stroke="currentColor"
                      strokeOpacity="0.3"
                      strokeWidth="2"
                    />
                    <path
                      d="M9 2a7 7 0 017 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Analyzing…
                </>
              ) : (
                <>
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
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  Analyze my CV
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
