import { NextRequest, NextResponse } from "next/server";
import { analyzeCV } from "@/lib/analyzeCV";
import { checkRateLimit } from "@/lib/rateLimiter";
import { extractText } from "unpdf";

// Force Node.js runtime and set Vercel max function duration to 60s
export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// Clean extracted text and ensure it is human-readable (not binary/metadata junk)
function cleanAndValidateCVText(rawText: string): {
  isValid: boolean;
  cleanText: string;
  reason?: string;
} {
  if (!rawText || typeof rawText !== "string") {
    return { isValid: false, cleanText: "", reason: "No text found in PDF." };
  }

  // Normalize line breaks & tabs
  const text = rawText
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[\t ]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // Guard against raw PDF binary streams, objects, or syntax leakage
  if (
    text.includes("%PDF-") ||
    text.includes("/FlateDecode") ||
    text.includes("/Type /Catalog") ||
    text.includes("endstream") ||
    text.includes("xref\n0")
  ) {
    return {
      isValid: false,
      cleanText: "",
      reason: "Extracted content contains raw PDF syntax instead of readable CV text.",
    };
  }

  // Count alphanumeric characters & recognizable words
  const alphanumericCount = (text.match(/[a-zA-Z0-9]/g) || []).length;
  const wordMatches = text.match(/[a-zA-Z]{2,}/g) || [];

  if (alphanumericCount < 50 || wordMatches.length < 10) {
    return {
      isValid: false,
      cleanText: "",
      reason: "The document contains insufficient readable text (likely a scanned image or photo).",
    };
  }

  return { isValid: true, cleanText: text };
}

// Multi-engine PDF text extractor (Mozilla PDF.js / unpdf with pdf-parse fallback)
async function extractCVText(arrayBuffer: ArrayBuffer): Promise<string> {
  const uint8Array = new Uint8Array(arrayBuffer);

  // Strategy 1: unpdf (Mozilla PDF.js standards-compliant engine)
  try {
    const result = await extractText(uint8Array, { mergePages: true });
    let text = "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawResult: any = result;
    if (typeof rawResult.text === "string") {
      text = rawResult.text.trim();
    } else if (Array.isArray(rawResult.text)) {
      text = rawResult.text.join("\n\n").trim();
    }

    if (text) {
      const validation = cleanAndValidateCVText(text);
      if (validation.isValid) {
        return validation.cleanText;
      }
    }
  } catch (unpdfErr) {
    console.warn("[unpdf extraction error, trying fallback]:", unpdfErr);
  }

  // Strategy 2: pdf-parse fallback
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any
    const pdfParseModule = require("pdf-parse") as any;
    const buffer = Buffer.from(arrayBuffer);

    if (pdfParseModule?.PDFParse) {
      const parser = new pdfParseModule.PDFParse({ data: buffer });
      try {
        const textResult = await parser.getText();
        let text = textResult?.text ? textResult.text.trim() : "";
        if (!text && Array.isArray(textResult?.pages)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          text = textResult.pages.map((p: any) => p.text || "").join("\n\n").trim();
        }
        if (text) {
          const validation = cleanAndValidateCVText(text);
          if (validation.isValid) {
            return validation.cleanText;
          }
        }
      } finally {
        try {
          if (typeof parser.destroy === "function") {
            await parser.destroy();
          }
        } catch {
          // Ignore parser destruction errors
        }
      }
    } else if (typeof pdfParseModule === "function") {
      const pdfData = await pdfParseModule(buffer);
      if (pdfData?.text) {
        const validation = cleanAndValidateCVText(pdfData.text.trim());
        if (validation.isValid) {
          return validation.cleanText;
        }
      }
    }
  } catch (pdfParseErr) {
    console.warn("[pdf-parse fallback error]:", pdfParseErr);
  }

  return "";
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

    // --- Extract & Validate PDF Text ---
    let cvText = "";
    try {
      const arrayBuffer = await file.arrayBuffer();
      cvText = await extractCVText(arrayBuffer);
    } catch (err) {
      const extractErr = err instanceof Error ? err.message : String(err);
      console.error("[Vercel Log] PDF Extraction Failed:", extractErr, err);
      return NextResponse.json(
        {
          error:
            "Could not extract text from this PDF. Please ensure the document is not corrupted, password-protected, or restricted.",
        },
        { status: 422 }
      );
    }

    if (!cvText || cvText.length < 50) {
      return NextResponse.json(
        {
          error:
            "Could not extract readable text from your CV. Please ensure the PDF is a text-based document (exported directly from Word, Google Docs, Canva, or a resume builder) rather than a scanned image or photo.",
        },
        { status: 422 }
      );
    }

    // --- Run AI Analysis on Clean Text Only ---
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
