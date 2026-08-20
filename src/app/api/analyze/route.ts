import { NextRequest, NextResponse } from "next/server";
import { analyzeCV } from "@/lib/analyzeCV";
import { checkRateLimit } from "@/lib/rateLimiter";
// Import pdf-parse module (supports v1 function API and v2 PDFParse class API)
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any
const pdfParseModule = require("pdf-parse") as any;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  // --- Rate limiting ---
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "anonymous";

  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      {
        error: "Too many requests. Please wait before analyzing again.",
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
  } catch {
    return NextResponse.json(
      { error: "Invalid request format. Expected multipart/form-data." },
      { status: 400 }
    );
  }

  const file = formData.get("cv") as File | null;
  const jobDescription = (formData.get("jobDescription") as string) ?? "";

  // --- Validate file ---
  if (!file) {
    return NextResponse.json(
      { error: "No CV file provided." },
      { status: 400 }
    );
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json(
      { error: "Only PDF files are accepted." },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "File size exceeds the 5 MB limit." },
      { status: 400 }
    );
  }

  // --- Extract PDF text ---
  let cvText = "";
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (pdfParseModule?.PDFParse) {
      const parser = new pdfParseModule.PDFParse({ data: buffer });
      const textResult = await parser.getText();
      cvText = textResult.text ? textResult.text.trim() : "";
      if (typeof parser.destroy === "function") {
        await parser.destroy();
      }
    } else if (typeof pdfParseModule === "function") {
      const pdfData = await pdfParseModule(buffer);
      cvText = pdfData.text ? pdfData.text.trim() : "";
    } else if (typeof pdfParseModule?.default === "function") {
      const pdfData = await pdfParseModule.default(buffer);
      cvText = pdfData.text ? pdfData.text.trim() : "";
    } else {
      throw new Error("Could not initialize pdf-parse");
    }
  } catch (err) {
    console.error("PDF extraction error:", err);
    return NextResponse.json(
      {
        error:
          "Could not extract text from the PDF. Please ensure the file is a text-based PDF (not a scanned image). Try re-saving your CV from Word or Google Docs as a PDF.",
      },
      { status: 422 }
    );
  }

  if (cvText.length < 100) {
    return NextResponse.json(
      {
        error:
          "The PDF appears to contain very little text. Please upload a text-based PDF CV.",
      },
      { status: 422 }
    );
  }

  // --- Analyze ---
  try {
    const analysis = await analyzeCV(cvText, jobDescription);
    return NextResponse.json(analysis, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Analysis error:", message);

    if (message.includes("GEMINI_API_KEY")) {
      return NextResponse.json(
        {
          error:
            "The AI service is not configured. Please contact the administrator.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: `Analysis failed: ${message}` },
      { status: 500 }
    );
  }
}
