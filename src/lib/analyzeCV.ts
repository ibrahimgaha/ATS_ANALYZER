import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AnalysisResult } from "@/types/analysis";
import { validateAnalysis } from "./validateAnalysis";

const SYSTEM_PROMPT = `You are an expert ATS (Applicant Tracking System) CV analyst and professional resume coach.

Analyze the provided CV text and optional job description. Return ONLY a valid JSON object with no markdown, no code fences, and no extra text.

The JSON must follow this exact schema:
{
  "overallScore": <number 0-100>,
  "atsScore": <number 0-100>,
  "keywordScore": <number 0-100>,
  "formattingScore": <number 0-100>,
  "strengths": [<string>, ...],
  "weaknesses": [<string>, ...],
  "missingKeywords": [<string>, ...],
  "recommendations": [<string>, ...],
  "summarySuggestion": <string>,
  "bulletPointSuggestions": [<string>, ...]
}

Scoring guidance:
- overallScore: holistic quality of the CV (format, content, impact, clarity)
- atsScore: how well the CV will parse through ATS systems (no tables, no images, standard headings, keyword density)
- keywordScore: how well the CV matches the job description keywords (if no job description provided, score based on industry keyword density)
- formattingScore: readability, structure, consistent formatting, appropriate length

Be honest and constructive. Do not exaggerate scores. Provide 3-6 items per array field.
Keep each string concise (1-2 sentences max).
For bulletPointSuggestions, provide improved versions of weak bullet points found in the CV.
Do not claim the score guarantees ATS approval.`;

export async function analyzeCV(
  cvText: string,
  jobDescription: string
): Promise<AnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not configured. Please add it to your .env.local file."
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Try candidate active models in order of capability and availability
  const candidateModels = [
    "gemini-3.6-flash",
    "gemini-2.5-flash",
  ];

  const userContent = `
CV TEXT:
${cvText.slice(0, 8000)}

${jobDescription ? `JOB DESCRIPTION:\n${jobDescription.slice(0, 3000)}` : "No job description provided. Score based on general professional standards."}
`;

  let responseText = "";
  let lastError: Error | null = null;

  for (const modelName of candidateModels) {
    // Retry up to 2 times for transient errors (e.g. 503 high demand spikes)
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent([
          { text: SYSTEM_PROMPT },
          { text: userContent },
        ]);
        responseText = result.response.text().trim();
        if (responseText) break;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        console.warn(
          `Model ${modelName} (attempt ${attempt}) failed:`,
          lastError.message
        );
        if (attempt < 2 && lastError.message.includes("503")) {
          // Wait 1 second before retrying
          await new Promise((res) => setTimeout(res, 1000));
        }
      }
    }
    if (responseText) break;
  }

  if (!responseText) {
    throw new Error(
      `AI analysis failed. Details: ${lastError?.message ?? "Unknown error"}`
    );
  }

  // Strip potential markdown code fences if the model adds them anyway
  const jsonText = responseText
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error(
      `AI returned invalid JSON. Raw response: ${responseText.slice(0, 200)}`
    );
  }

  return validateAnalysis(parsed);
}
