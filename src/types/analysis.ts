// Types for the CV analysis result returned by the AI
export interface AnalysisResult {
  overallScore: number;
  atsScore: number;
  keywordScore: number;
  formattingScore: number;
  strengths: string[];
  weaknesses: string[];
  missingKeywords: string[];
  recommendations: string[];
  summarySuggestion: string;
  bulletPointSuggestions: string[];
}

export interface AnalysisError {
  error: string;
  details?: string;
}

export type AnalysisResponse = AnalysisResult | AnalysisError;

export function isAnalysisError(res: AnalysisResponse): res is AnalysisError {
  return "error" in res;
}
