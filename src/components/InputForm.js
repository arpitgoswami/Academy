"use client";

import { useState, useEffect, useRef } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { BsLink45Deg, BsGlobe, BsChevronRight } from "react-icons/bs";
import { RiLightbulbLine } from "react-icons/ri";
import { FaMicrophone, FaStopCircle } from "react-icons/fa";
import { enhancePrompt } from "../services/promptEnhancement";
// Removed import for webSearch service

export default function InputForm({
  userPrompt,
  setUserPrompt,
  handleSubmit,
  isLoading,
  isEnhancing,
  setIsEnhancing,
  user,
  disabled,
  // Add setAiResponse to update the display after search
  setAiResponse,
}) {
  const [isListening, setIsListening] = useState(false);
  const [isSearchingWeb, setIsSearchingWeb] = useState(false); // State for web search loading
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setUserPrompt(userPrompt + finalTranscript + interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [setUserPrompt, userPrompt]);

  const handleListenClick = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleEnhanceClick = async () => {
    if (!userPrompt || isEnhancing) return;
    setIsEnhancing(true);
    try {
      const enhancedPrompt = await enhancePrompt(userPrompt, user);
      setUserPrompt(enhancedPrompt);
    } catch (error) {
      console.error("Error enhancing prompt:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleWebSearchClick = async () => {
    if (!userPrompt || isSearchingWeb || isLoading) return; // Prevent search if busy or no prompt
    setIsSearchingWeb(true);
    setAiResponse("Performing web search..."); // Update loading state with a string
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(userPrompt)}`
      );
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(
          `API request failed: ${response.statusText} - ${errorData}`
        );
      }
      const searchResult = await response.json();
      console.log("Web Search API Result:", searchResult);

      // Update the main response display with just the answer string
      setAiResponse(searchResult.answer || "No answer found.");
    } catch (error) {
      console.error("Error performing web search:", error);
      // Display error string to the user
      setAiResponse(`Error performing web search: ${error.message}`);
    } finally {
      setIsSearchingWeb(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-10">
      {/* Title hidden on smaller screens for cleaner look, shown on md+ */}
      <h1 className="text-3xl md:text-3xl mb-8 text-center hidden md:block font-normal">
        What do you want to know?
      </h1>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4">
          <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Ask anything..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            required
            rows={1}
            className="w-full px-0 py-1 bg-transparent border-0 focus:outline-none focus:ring-0 text-sm resize-none"
            style={{ minHeight: "44px" }}
            onInput={(e) => {
              e.target.style.height = "inherit";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center space-x-2">
            <div className="px-2 py-1 rounded-md bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs font-medium">
              Gemini 2.0 Flash
            </div>
            <button
              type="button"
              disabled={isEnhancing || !userPrompt}
              onClick={handleEnhanceClick}
              className="flex items-center sp px-2 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEnhancing ? (
                <>
                  <span>Enhancing...</span>
                </>
              ) : (
                <>
                  <span>Enhance Prompt</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={handleListenClick}
              className={`p-2 rounded-md ${
                isListening
                  ? "text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-300"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              } transition-colors`}
              title={isListening ? "Stop Listening" : "Start Listening"}
              // disabled={
              //   !window.SpeechRecognition && !window.webkitSpeechRecognition
              // }
            >
              {isListening ? (
                <FaStopCircle className="w-3 h-3" />
              ) : (
                <FaMicrophone className="w-3 h-3" />
              )}
            </button>
            <button
              type="button"
              onClick={handleWebSearchClick} // Add onClick handler
              className={`p-2 rounded-md ${
                isSearchingWeb
                  ? "text-blue-500 bg-blue-100 dark:bg-blue-900 dark:text-blue-300 cursor-wait"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              } transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              title={isSearchingWeb ? "Searching Web..." : "Perform Web Search"}
              disabled={isSearchingWeb || isLoading || !userPrompt} // Disable if searching, loading main response, or no prompt
            >
              {isSearchingWeb ? (
                <BiLoaderAlt className="animate-spin h-3 w-3" /> // Show loader when searching
              ) : (
                <BsGlobe className="w-3 h-3" />
              )}
            </button>
            <button
              type="button"
              className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              title="Attach Link (Not implemented)"
            >
              <BsLink45Deg className="w-3 h-3" />
            </button>
            <button
              type="submit"
              disabled={isLoading || !userPrompt}
              className="p-2 bg-teal-100 text-teal-800 hover:bg-teal-200 rounded-full text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <BiLoaderAlt className="animate-spin h-3 w-3" />
              ) : (
                <BsChevronRight className="w-3 h-3" />
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
