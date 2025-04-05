import { GoogleGenerativeAI } from "@google/generative-ai";
import { storePrompt } from "../../../services/promptStorage";
import { NextResponse } from "next/server";

const API_KEY = "AIzaSyDyO3RcVB1iXrGt16uIoZ0hDWiSbHbsXp4";

export async function POST(request) {
  try {
    const { prompt, user } = await request.json();

    if (!prompt || !user) {
      return NextResponse.json(
        { error: "Prompt and user are required" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContentStream(prompt);
    const response = new TransformStream();
    const writer = response.writable.getWriter();
    const encoder = new TextEncoder();

    let aggregatedResponseText = "";

    // Stream the response
    (async () => {
      try {
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          aggregatedResponseText += chunkText;
          await writer.write(encoder.encode(chunkText));
        }

        // Store the complete response after streaming
        await storePrompt(user, prompt, "generation", aggregatedResponseText);

        writer.close();
      } catch (error) {
        console.error("Error in stream processing:", error);
        writer.abort(error);
      }
    })();

    return new Response(response.readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Error generating AI response:", error);
    return NextResponse.json(
      { error: "Error generating response" },
      { status: 500 }
    );
  }
}
