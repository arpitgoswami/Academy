import { GoogleGenerativeAI } from "@google/generative-ai";
import { storePrompt } from "./promptStorage";

const API_KEY = "AIzaSyDyO3RcVB1iXrGt16uIoZ0hDWiSbHbsXp4";

export const generateAIResponse = async (prompt, user) => {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Store the prompt and response
    await storePrompt(user, prompt, "generation", responseText);

    return responseText;
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw new Error("Error generating response.");
  }
};
