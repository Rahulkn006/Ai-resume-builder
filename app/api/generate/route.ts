import { NextResponse } from "next/server";
import { optimizeResumeAndScore } from "@/lib/ai";
import { ResumeDetails } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const resumeData: ResumeDetails = body.resumeData;

    if (!resumeData || !resumeData.targetJobRole) {
      return NextResponse.json(
        { error: "Resume data and Target Job Role are required for optimization." },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    const result = await optimizeResumeAndScore(resumeData);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Generate API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to optimize resume." },
      { status: 500 }
    );
  }
}
