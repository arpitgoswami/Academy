"use client";

import { BiLoaderAlt } from "react-icons/bi";
import { BsLink45Deg, BsGlobe, BsChevronRight } from "react-icons/bs";
import { RiLightbulbLine } from "react-icons/ri";
import { enhancePrompt } from "../services/promptEnhancement"; // Adjusted path

export default function InputForm({
  userPrompt,
  setUserPrompt,
  handleSubmit,
  isLoading,
  isEnhancing,
  setIsEnhancing, // Need this setter
  user,
}) {
  const handleEnhanceClick = async () => {
    if (!userPrompt || isEnhancing) return;
    setIsEnhancing(true);
    try {
      const enhancedPrompt = await enhancePrompt(userPrompt, user);
      setUserPrompt(enhancedPrompt);
    } catch (error) {
      console.error("Error enhancing prompt:", error);
      // Optionally, show an error message to the user
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-10">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4">
          <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Ask anything..."
            required
            rows={1}
            className="w-full px-0 py-1 bg-transparent border-0 focus:outline-none focus:ring-0 text-lg resize-none"
            style={{ minHeight: "44px" }} // Ensure minimum height
            onInput={(e) => {
              // Auto-resize textarea
              e.target.style.height = "inherit";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
        </div>

        {/* Control bar */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center space-x-2">
            <div className="px-2 py-1 rounded-md bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs font-medium">
              Gemini 2.0 Flash
            </div>
            <button
              type="button"
              disabled={isEnhancing || !userPrompt}
              onClick={handleEnhanceClick}
              className="flex items-center space-x-2 px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800 text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEnhancing ? (
                <>
                  <BiLoaderAlt className="animate-spin h-4 w-4" />
                  <span>Enhancing...</span>
                </>
              ) : (
                <>
                  <RiLightbulbLine className="h-4 w-4" />
                  <span>Enhance Prompt</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center">
            <button
              type="button"
              className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              title="Web Search (Not implemented)" // Added title for clarity
            >
              <BsGlobe className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              title="Attach Link (Not implemented)" // Added title for clarity
            >
              <BsLink45Deg className="w-5 h-5" />
            </button>
            <button
              type="submit"
              disabled={isLoading || !userPrompt} // Disable if no prompt
              className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <BiLoaderAlt className="animate-spin h-5 w-5" />
              ) : (
                <BsChevronRight className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
