import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const API_KEY = "AIzaSyDyO3RcVB1iXrGt16uIoZ0hDWiSbHbsXp4";

export async function POST(request) {
  try {
    // Parse request body
    let originalPrompt, user;
    try {
      const body = await request.json();
      originalPrompt = body.originalPrompt;
      user = body.user;
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!originalPrompt || !user) {
      return NextResponse.json(
        { error: "Original prompt and user are required" },
        { status: 400 }
      );
    }

    // Validate API key
    if (!API_KEY) {
      console.error("Gemini API key is not configured");
      return NextResponse.json(
        { error: "API configuration error" },
        { status: 500 }
      );
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    });

    const prompt = `Please enhance the following prompt to make it more detailed, specific, and effective. Keep the core intent but add clarity and necessary context. Return only the enhanced prompt without any additional text or formatting.

Original: "${originalPrompt}"

Requirements:
- Make it 2-3x more detailed
- Add specific parameters and success criteria
- Clarify any ambiguous terms
- Keep natural, human-readable language
- Focus on the core request
- No explanations or metadata
- No markdown or formatting

Enhanced prompt:`;

    // Generate enhanced prompt
    try {
      const result = await model.generateContent({
        parts: [{ text: prompt }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
          topP: 0.8,
          stopSequences: ["---"],
        },
      });

      if (!result || !result.response) {
        console.error("Empty response from Gemini API");
        throw new Error("AI model returned empty response");
      }

      const enhancedPrompt = result.response.text().trim();
      console.log("Generated response:", enhancedPrompt);

      if (!enhancedPrompt || enhancedPrompt.length === 0) {
        throw new Error("AI model returned empty prompt");
      }

      if (enhancedPrompt.length < originalPrompt.length) {
        throw new Error("Enhanced prompt is shorter than original");
      }

      // Remove any markdown formatting or explanations
      const cleanedPrompt = enhancedPrompt
        .replace(/^(Enhanced prompt:|Original:|Requirements:).*$/gm, "")
        .replace(/^[-*•].*$/gm, "")
        .replace(/```.*?```/gs, "")
        .trim();

      if (!cleanedPrompt) {
        throw new Error("Invalid response format from AI model");
      }

      if (cleanedPrompt.length < 50) {
        throw new Error("Enhanced prompt is too short");
      }

      // Log success for debugging
      console.log("Successfully enhanced prompt:", {
        original: originalPrompt,
        enhanced: cleanedPrompt,
        originalLength: originalPrompt.length,
        enhancedLength: cleanedPrompt.length,
      });

      return NextResponse.json({
        enhancedPrompt: cleanedPrompt,
        success: true,
      });
    } catch (aiError) {
      console.error("AI generation error:", {
        error: aiError,
        prompt: originalPrompt,
        errorType: aiError.name,
        errorMessage: aiError.message,
      });
      return NextResponse.json(
        {
          error: aiError.message || "Failed to generate enhanced prompt",
          details: aiError.toString(),
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in prompt enhancement route:", {
      error,
      errorType: error.name,
      errorMessage: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
