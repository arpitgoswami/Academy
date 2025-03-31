import { GoogleGenerativeAI } from "@google/generative-ai";
import { storePrompt } from "./promptStorage";

const API_KEY = "AIzaSyDyO3RcVB1iXrGt16uIoZ0hDWiSbHbsXp4";

export const enhancePrompt = async (originalPrompt, user) => {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const enhancementPrompt = `Please enhance this prompt to be more specific and detailed for better code generation. Original prompt: "${originalPrompt}"`;
    const result = await model.generateContent(enhancementPrompt);
    const enhancedPrompt = result.response.text();

    // Store both the original and enhanced prompts
    await storePrompt(user, originalPrompt, "enhancement", enhancedPrompt);

    return enhancedPrompt;
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    throw new Error("Error enhancing prompt.");
  }
};
