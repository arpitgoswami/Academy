import { GoogleGenerativeAI } from "@google/generative-ai";
import { GOOGLE_AI_CONFIG } from "../config/api";

/**
 * Base service for Google AI operations
 */
class BaseAIService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(GOOGLE_AI_CONFIG.apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: GOOGLE_AI_CONFIG.model,
    });
  }

  /**
   * Generate content using the AI model
   * @param {string} prompt - The prompt to generate content from
   * @returns {Promise<string>} The generated content
   * @throws {Error} If content generation fails
   */
  async generateContent(prompt) {
    try {
      const result = await this.model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error("Error generating content:", error);
      throw new Error("Failed to generate content. Please try again later.");
    }
  }
}

export const baseAIService = new BaseAIService();
