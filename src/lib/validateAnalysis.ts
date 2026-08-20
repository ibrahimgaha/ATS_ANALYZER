import type { AnalysisResult } from "@/types/analysis";

/**
 * Validates that the AI response is a well-formed AnalysisResult.
 * Clamps scores to [0, 100] and ensures all array fields exist.
 */
export function validateAnalysis(raw: unknown): AnalysisResult {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("AI response is not a valid object");
  }

  const obj = raw as Record<string, unknown>;

  const clampScore = (val: unknown, field: string): number => {
    const n = Number(val);
    if (isNaN(n)) throw new Error(`Invalid score for field: ${field}`);
    return Math.min(100, Math.max(0, Math.round(n)));
  };

  const ensureStringArray = (val: unknown, field: string): string[] => {
    if (!Array.isArray(val)) return [];
    return val.filter((item) => typeof item === "string").slice(0, 20);
  };

  const ensureString = (val: unknown): string => {
    if (typeof val === "string") return val.slice(0, 2000);
    return "";
  };

  return {
    overallScore: clampScore(obj.overallScore, "overallScore"),
    atsScore: clampScore(obj.atsScore, "atsScore"),
    keywordScore: clampScore(obj.keywordScore, "keywordScore"),
    formattingScore: clampScore(obj.formattingScore, "formattingScore"),
    strengths: ensureStringArray(obj.strengths, "strengths"),
    weaknesses: ensureStringArray(obj.weaknesses, "weaknesses"),
    missingKeywords: ensureStringArray(obj.missingKeywords, "missingKeywords"),
    recommendations: ensureStringArray(obj.recommendations, "recommendations"),
    summarySuggestion: ensureString(obj.summarySuggestion),
    bulletPointSuggestions: ensureStringArray(
      obj.bulletPointSuggestions,
      "bulletPointSuggestions"
    ),
  };
}
