import { NextRequest, NextResponse } from "next/server";
import { analyzeCV } from "@/lib/analyzeCV";
import { checkRateLimit } from "@/lib/rateLimiter";
import zlib from "zlib";

// Force Node.js runtime and set Vercel max function duration to 60s
export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// Helper: direct PDF stream decompressor for PDFs containing images/custom font streams
function extractTextFromStreams(buffer: Buffer): string {
  try {
    const raw = buffer.toString("latin1");
    const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
    let match: RegExpExecArray | null;
    const extractedWords: string[] = [];

    while ((match = streamRegex.exec(raw)) !== null) {
      let streamData = Buffer.from(match[1], "latin1");

      try {
        streamData = zlib.inflateSync(streamData);
      } catch {
        // Not compressed with standard flate, use raw data
      }

      const text = streamData.toString("latin1");
      const stringMatches = text.match(/\(([^()]*)\)/g);
      if (stringMatches) {
        for (const str of stringMatches) {
          const clean = str.slice(1, -1).trim();
          if (clean.length > 1 && !/^[0-9\s.,;:\-_/\\]+$/.test(clean)) {
            extractedWords.push(clean);
          }
        }
      }
    }

    return extractedWords.join(" ").trim();
  } catch (err) {
    console.warn("[PDF stream fallback parse error]:", err);
    return "";
  }
}

// Multi-engine PDF text extractor (supports multi-page, embedded images, Canva, Word, LaTeX)
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  let text = "";

  // Strategy 1: PDFParse class API (v2)
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any
    const pdfParseModule = require("pdf-parse") as any;

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
        } catch (innerErr) {
          console.warn("[PDFParse getText failed, trying fallbacks]:", innerErr);
        } finally {
          try {
            if (typeof parser.destroy === "function") {
              await parser.destroy();
            }
          } catch {
            // Ignore parser destruction errors
          }
        }
      } catch (classInitErr) {
        console.warn("[PDFParse instance init failed]:", classInitErr);
      }
    }

    // Strategy 2: Direct function call fallback (v1 / CJS wrapper)
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
  } catch (moduleLoadErr) {
    console.warn("[PDFParse module load warning]:", moduleLoadErr);
  }

  // Strategy 3: Stream Decompression Fallback (handles PDFs with images, charts, custom layouts)
  if (!text || text.length < 50) {
    try {
      const streamText = extractTextFromStreams(buffer);
      if (streamText && streamText.length > text.length) {
        text = streamText;
      }
    } catch (streamErr) {
      console.warn("[Stream extraction fallback failed]:", streamErr);
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
            "No readable text was found in your PDF. If your CV contains images, please make sure the text is selectable and not a flat photograph/scanned image.",
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
