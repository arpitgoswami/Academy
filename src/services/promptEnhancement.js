import { baseAIService } from "./baseAIService";
import { UNIVERSAL_ENHANCEMENT_TEMPLATE } from "../constants/promptTemplates";

/**
 * Error class for prompt enhancement failures
 */
class PromptEnhancementError extends Error {
  constructor(message, originalError) {
    super(message);
    this.name = "PromptEnhancementError";
    this.originalError = originalError;
  }
}

/**
 * Enhances a user prompt using AI to make it more effective and detailed
 * @param {string} originalPrompt - The original user prompt
 * @returns {Promise<string>} The enhanced prompt
 * @throws {PromptEnhancementError} If enhancement fails
 */
export const enhancePrompt = async (originalPrompt) => {
  try {
    // Input validation
    if (!originalPrompt?.trim()) {
      throw new Error("Original prompt is required");
    }

    // Create the full prompt with the template
    const fullPrompt = UNIVERSAL_ENHANCEMENT_TEMPLATE.replace(
      "${originalPrompt}",
      originalPrompt
    );

    // Generate enhanced content
    const enhancedPrompt = await baseAIService.generateContent(fullPrompt);

    return enhancedPrompt;
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    throw new PromptEnhancementError(
      "Failed to enhance prompt. Please try again later.",
      error
    );
  }
};
