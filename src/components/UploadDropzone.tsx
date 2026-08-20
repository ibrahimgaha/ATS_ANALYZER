"use client";

import { useCallback, useState } from "react";

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  error?: string;
}

export default function UploadDropzone({
  onFileSelect,
  selectedFile,
  error,
}: UploadDropzoneProps) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div>
      <label
        id="cv-upload-label"
        htmlFor="cv-upload"
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`
          flex flex-col items-center justify-center gap-3 
          border-2 border-dashed rounded-2xl p-8 cursor-pointer
          transition-all duration-200 shadow-sm
          ${
            dragging
              ? "border-indigo-500 bg-indigo-500/10"
              : selectedFile
              ? "border-teal-500 bg-teal-500/10"
              : "border-slate-300 dark:border-white/15 hover:border-indigo-500 dark:hover:border-indigo-400 bg-white dark:bg-white/[0.02] hover:bg-slate-50 dark:hover:bg-white/[0.05]"
          }
          ${error ? "border-rose-500 bg-rose-500/10" : ""}
        `}
      >
        {selectedFile ? (
          <>
            <div className="w-12 h-12 rounded-full bg-teal-500/15 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#14b8a6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-semibold text-teal-600 dark:text-teal-400 text-sm">
                {selectedFile.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {formatBytes(selectedFile.size)} · PDF
              </p>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors underline">
              Click to change file
            </span>
          </>
        ) : (
          <>
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                dragging ? "bg-indigo-500/20" : "bg-slate-100 dark:bg-white/[0.06]"
              }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={dragging ? "#6366f1" : "#64748b"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17,8 12,3 7,8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                {dragging ? "Drop your CV here" : "Upload your CV"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                PDF only · Max 5 MB
              </p>
            </div>
            <span className="text-xs px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.06] border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 font-medium">
              Browse files
            </span>
          </>
        )}

        <input
          id="cv-upload"
          type="file"
          accept="application/pdf"
          className="sr-only"
          onChange={handleChange}
          aria-describedby={error ? "cv-upload-error" : "cv-upload-label"}
        />
      </label>

      {error && (
        <p id="cv-upload-error" className="mt-2 text-sm text-red-400 flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M7 0a7 7 0 100 14A7 7 0 007 0zm0 10.5a.875.875 0 110-1.75.875.875 0 010 1.75zm.875-4.375a.875.875 0 11-1.75 0V3.5a.875.875 0 111.75 0v2.625z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
