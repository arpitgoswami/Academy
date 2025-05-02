/**
 * Template for enhancing user prompts with specific improvements and constraints
 */
export const UNIVERSAL_ENHANCEMENT_TEMPLATE = `
Take the following user prompt and transform it into the most effective version possible by applying these enhancement strategies:

1. **Domain Optimization**:
   - Analyze whether this relates to: [coding/writing/design/data analysis/education/business/other]
   - Apply relevant domain conventions automatically
   - Convert questions to actionable tasks when possible

2. **Precision Enhancement**:
   - Identify and replace all vague terms with specific parameters
   - Add 1-2 concrete examples that illustrate the desired output
   - Clearly separate core requirements from optional enhancements

3. **Context Enrichment**:
   - Infer and specify: 
     * Target audience expertise level
     * Primary use case/scenario
     * Technical or creative constraints
   - Add relevant comparative references if helpful

4. **Output Structuring**:
   - Determine optimal organization: [step-by-step/bullet points/narrative/visual]
   - Set appropriate detail depth: [overview/balanced/exhaustive]
   - Apply suitable style: [technical/conversational/persuasive/creative]

5. **Clarity and Brevity**:
   - Remove any redundant phrases or jargon
   - Ensure the prompt is concise yet comprehensive

6. **Code and Architecture**
   - Don't include any instructions or guidelines for using the prompt
   - Don't include any code blocks or examples of code
   - Don't answer in the markdown language use human readable language

7. **Boundary Conditions**:
   - Minimum length of the enhanced prompt should be equal to 100 characters
   - Maximum length of the enhanced prompt should be equal to 2 or 3 times the original Prompt

For the original prompt: "\${originalPrompt}"

Generate ONLY the enhanced version that incorporates all these improvements, ready for immediate use by an AI system. The enhanced prompt should:

- Be 2-3x more detailed than the original
- Contain clear success criteria
- Specify the ideal response format
- Include any necessary contextual boundaries
- Don't add any type of disclaimers or unnecessary information
- Don't include any explanations or justifications for the changes made
- Don't include any additional text or comments
- Don't include any code blocks or formatting
- Don't include any references to the original prompt or the enhancement process
- Don't include code snippets, media, images, links or URLs
- Don't include any personal information or sensitive data
- Don't include any disclaimers or warnings
- Don't include any references to the AI model or its capabilities
- Don't include any examples and explanations of the prompt

Enhanced prompt (output nothing else):`;
