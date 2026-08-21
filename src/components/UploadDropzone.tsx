"use client";

import { useCallback, useState } from "react";
import { useLang } from "./LanguageProvider";
import { t, tr } from "@/lib/translations";

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  error?: string;
}

export default function UploadDropzone({ onFileSelect, selectedFile, error }: UploadDropzoneProps) {
  const [dragging, setDragging] = useState(false);
  const { lang } = useLang();
  const dz = t.dropzone;

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

  const borderColor = error ? "#f43f5e" : dragging ? "var(--accent)" : selectedFile ? "#10b981" : "var(--border-2)";
  const bgColor    = error ? "rgba(244,63,94,0.04)" : dragging ? "var(--accent-bg)" : selectedFile ? "rgba(16,185,129,0.04)" : "var(--surface-2)";

  return (
    <div>
      <label
        id="cv-upload-label"
        htmlFor="cv-upload"
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{ borderColor, background: bgColor }}
        className="flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all duration-150 select-none"
      >
        {selectedFile ? (
          <>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <polyline points="9 15 12 18 15 15" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm" style={{ color: "var(--text)" }}>{selectedFile.name}</p>
              <p className="text-xs font-mono mt-0.5" style={{ color: "var(--text-3)" }}>{formatBytes(selectedFile.size)} · PDF</p>
            </div>
            <span className="text-xs font-semibold" style={{ color: "var(--accent)" }}>{tr(dz.change, lang)}</span>
          </>
        ) : (
          <>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "var(--bg-subtle)", color: "var(--text-3)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm" style={{ color: "var(--text)" }}>
                {dragging ? tr(dz.drop, lang) : tr(dz.upload, lang)}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--text-3)" }}>{tr(dz.hint, lang)}</p>
            </div>
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-md border transition-colors"
              style={{ background: "var(--surface)", borderColor: "var(--border-2)", color: "var(--text-2)" }}
            >
              {tr(dz.choose, lang)}
            </span>
          </>
        )}
        <input id="cv-upload" type="file" accept="application/pdf" className="sr-only" onChange={handleChange} aria-describedby={error ? "cv-upload-error" : "cv-upload-label"} />
      </label>

      {error && (
        <p id="cv-upload-error" className="mt-2 text-sm flex items-center gap-1.5" style={{ color: "#f43f5e" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
