import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { GOOGLE_AI_CONFIG } from "@/config/api";
import { UNIVERSAL_ENHANCEMENT_TEMPLATE } from "@/constants/promptTemplates";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const originalPrompt = searchParams.get("originalPrompt");

    if (!originalPrompt) {
      return NextResponse.json(
        { error: "Missing originalPrompt parameter" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(GOOGLE_AI_CONFIG.apiKey);
    const model = genAI.getGenerativeModel({ model: GOOGLE_AI_CONFIG.model });

    // Create the full prompt with the template
    const fullPrompt = UNIVERSAL_ENHANCEMENT_TEMPLATE.replace(
      "${originalPrompt}",
      originalPrompt
    );

    const result = await model.generateContent(fullPrompt);
    const enhancedPrompt = result.response.text();

    return NextResponse.json({ enhancedPrompt });
  } catch (error) {
    console.error("Error in enhance route:", error);
    return NextResponse.json(
      { error: "Failed to enhance prompt. Please try again later." },
      { status: 500 }
    );
  }
}
