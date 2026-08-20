import { NextRequest, NextResponse } from "next/server";
import { analyzeCV } from "@/lib/analyzeCV";
import { checkRateLimit } from "@/lib/rateLimiter";

// Force Node.js runtime and set Vercel max function duration to 60s
export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// Helper for safe and multi-page resilient PDF parsing in serverless environment
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any
  const pdfParseModule = require("pdf-parse") as any;

  let text = "";

  // Strategy 1: PDFParse class API (v2)
  if (pdfParseModule?.PDFParse) {
    try {
      const parser = new pdfParseModule.PDFParse({ data: buffer });
      try {
        const textResult = await parser.getText();
        if (textResult?.text) {
          text = textResult.text.trim();
        } else if (Array.isArray(textResult?.pages)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          text = textResult.pages.map((p: any) => p.text || "").join("\n\n").trim();
        }
      } finally {
        if (typeof parser.destroy === "function") {
          await parser.destroy();
        }
      }
    } catch (parseClassErr) {
      console.warn("[PDFParse class failed, trying fallback]:", parseClassErr);
    }
  }

  // Strategy 2: Direct function call (v1 / CJS wrapper)
  if (!text && typeof pdfParseModule === "function") {
    try {
      const pdfData = await pdfParseModule(buffer);
      if (pdfData?.text) {
        text = pdfData.text.trim();
      }
    } catch (funcErr) {
      console.warn("[PDFParse function fallback failed]:", funcErr);
    }
  }

  // Strategy 3: Default export function
  if (!text && typeof pdfParseModule?.default === "function") {
    try {
      const pdfData = await pdfParseModule.default(buffer);
      if (pdfData?.text) {
        text = pdfData.text.trim();
      }
    } catch (defErr) {
      console.warn("[PDFParse default export failed]:", defErr);
    }
  }

  return text;
}

export async function POST(req: NextRequest) {
  // Top-level crash protection: Ensure route ALWAYS returns valid JSON
  try {
    // --- Rate limiting ---
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "anonymous";

    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please wait a few minutes before analyzing another CV.",
          resetAt: rateCheck.resetAt,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(rateCheck.resetAt),
          },
        }
      );
    }

    // --- Parse multipart form data ---
    let formData: FormData;
    try {
      formData = await req.formData();
    } catch (err) {
      console.error("[Vercel Log] FormData parse error:", err);
      return NextResponse.json(
        { error: "Invalid form data. Please re-upload your PDF CV file." },
        { status: 400 }
      );
    }

    const file = formData.get("cv") as File | null;
    const jobDescription = (formData.get("jobDescription") as string) ?? "";

    // --- Validate file ---
    if (!file) {
      return NextResponse.json(
        { error: "No CV file uploaded. Please select a PDF file." },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Invalid file format. Only PDF files (.pdf) are supported." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size (${(file.size / 1024 / 1024).toFixed(1)} MB) exceeds maximum allowed size of 5 MB.` },
        { status: 400 }
      );
    }

    // --- Extract PDF text ---
    let cvText = "";
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      cvText = await extractTextFromPDF(buffer);
    } catch (err) {
      const extractErr = err instanceof Error ? err.message : String(err);
      console.error("[Vercel Log] PDF Extraction Failed:", extractErr, err);
      return NextResponse.json(
        {
          error:
            "Unable to parse this PDF file. Please ensure the document is not corrupted, password-protected, or restricted.",
        },
        { status: 422 }
      );
    }

    if (!cvText || cvText.length < 50) {
      return NextResponse.json(
        {
          error:
            "No readable text was found in your PDF. This typically happens with scanned documents or image-based PDFs. Please upload a text-based PDF exported directly from Word, Google Docs, or a CV builder.",
        },
        { status: 422 }
      );
    }

    // --- Run AI Analysis ---
    try {
      const analysis = await analyzeCV(cvText, jobDescription);
      return NextResponse.json(analysis, { status: 200 });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("[Vercel Log] AI Analysis Error:", message, err);

      if (message.includes("GEMINI_API_KEY")) {
        return NextResponse.json(
          {
            error:
              "GEMINI_API_KEY environment variable is missing on Vercel. Please set GEMINI_API_KEY in Vercel Settings -> Environment Variables.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: `CV Analysis failed: ${message}` },
        { status: 500 }
      );
    }
  } catch (fatalErr) {
    // Ultimate fallback catch to guarantee API ALWAYS returns valid JSON
    const fatalMsg = fatalErr instanceof Error ? fatalErr.message : String(fatalErr);
    console.error("[Vercel Fatal Route Error]:", fatalMsg, fatalErr);
    return NextResponse.json(
      { error: `An unexpected server error occurred: ${fatalMsg}` },
      { status: 500 }
    );
  }
}
