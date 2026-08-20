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
          flex flex-col items-center justify-center gap-2.5 
          border-2 border-dashed rounded-xl p-7 cursor-pointer
          transition-all duration-150
          ${
            dragging
              ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30"
              : selectedFile
              ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30"
              : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-slate-900/50"
          }
          ${error ? "border-rose-500 bg-rose-50/50 dark:bg-rose-950/30" : ""}
        `}
      >
        {selectedFile ? (
          <>
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                {selectedFile.name}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
                {formatBytes(selectedFile.size)} · PDF Document
              </p>
            </div>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline mt-1">
              Change file
            </span>
          </>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                {dragging ? "Drop your CV file here" : "Click or drag your CV to upload"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Supported format: PDF · Maximum size: 5 MB
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-sm mt-1">
              Select PDF File
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
