import { GoogleGenerativeAI } from "@google/generative-ai";
import { storePrompt } from "./promptStorage";

const API_KEY = "AIzaSyDyO3RcVB1iXrGt16uIoZ0hDWiSbHbsXp4";

export const generateAIResponse = async (prompt, user, onChunk) => {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContentStream(prompt);

    let aggregatedResponseText;

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (typeof onChunk === "function") {
        onChunk(chunkText);
      }
      aggregatedResponseText += chunkText;
    }

    await storePrompt(user, prompt, "generation", aggregatedResponseText);

    return aggregatedResponseText;
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw new Error("Error generating response.");
  }
};
