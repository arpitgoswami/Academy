"use client";

import { useState, useEffect, useRef } from "react";
import ToastContainer from "./ToastContainer"; // Import ToastContainer
import { BiLoaderAlt } from "react-icons/bi";
import { BsLink45Deg, BsGlobe, BsChevronRight } from "react-icons/bs";
import { FaMicrophone, FaStopCircle } from "react-icons/fa";
import { RiMagicLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import { HiTranslate } from "react-icons/hi";
import { GrAttachment } from "react-icons/gr";
import { enhancePrompt } from "../services/promptEnhancement";
import { LuMoonStar } from "react-icons/lu";
import Image from "next/image";

import axios from "axios";

import Tooltip from "./Tooltip";

export default function InputForm({
  userPrompt,
  setUserPrompt,
  handleSubmit, // Use parent's handleSubmit
  handleWebSearchClick, // Use parent's handleWebSearchClick
  isLoading, // Use parent's isLoading state
  setAiResponse, // Use parent's setter
  setSources, // Use parent's setter
}) {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [weather, setWeather] = useState({});
  const [newsArticles, setNewsArticles] = useState([]); // State for news articles
  const [toasts, setToasts] = useState([]); // State for toasts

  // Function to add a toast
  const addToast = (message, type = "error", duration = 5000) => {
    const id = Date.now(); // Simple unique ID
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);
  };

  // Function to remove a toast
  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    axios.get("/api/weather").then((response) => {
      if (response.status === 200) {
        const data = response.data;
        setWeather({
          temp: `${Math.round(data.temp)}°C`,
          location: data.city,
          h: `${Math.round(data.temp_max)}°`,
          l: `${Math.round(data.temp_min)}°`,
          description: data.description,
        });
      } else {
        console.error("Failed to fetch weather data:", response.data.message);
        addToast(
          `Failed to fetch weather: ${response.data.message || "Unknown error"}`
        );
      }
    });
    // Fetch news articles
    axios
      .get("/api/response")
      .then((response) => {
        if (response.status === 200 && Array.isArray(response.data)) {
          setNewsArticles(response.data);
        } else {
          console.error("Failed to fetch news articles:", response.data);
          addToast(
            `Failed to fetch news articles: ${
              response.data?.message || "Invalid data format"
            }`
          );
          setNewsArticles([]); // Set empty array on failure
        }
      })
      .catch((error) => {
        console.error("Error fetching news articles:", error);
        addToast(
          `Error fetching news articles: ${error.message || "Network error"}`
        );
        setNewsArticles([]); // Set empty array on error
      });
  }, []);

  const recognitionRef = useRef(null);
  const textareaRef = useRef(null);

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
  }, [userPrompt]);

  // handleSubmit is now passed as a prop
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
      // Simulate enhancing prompt
      setTimeout(() => {
        setUserPrompt(
          userPrompt + " (enhanced with more context and specificity)"
        );
        setIsEnhancing(false);
      }, 1000);
    } catch (error) {
      console.error("Error enhancing prompt:", error);
      setIsEnhancing(false);
    }
  };

  // handleWebSearchClick is now passed as a prop
  const handleClear = () => {
    setUserPrompt("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "44px";
      textareaRef.current.focus();
    }
  };

  // Removed static newsItems array

  return (
    <div className="w-full md:max-w-2xl px-4 relative">
      {" "}
      {/* Added relative positioning */}
      {/* Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <h1 className="text-3xl md:text-center mb-6 font-normal text-slate-800">
        What do you want to know?
      </h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
          <div className="p-3">
            <textarea
              ref={textareaRef}
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Ask anything..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.shiftKey) {
                  handleSubmit(e);
                }
              }}
              className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-sm resize-none px-2 py-1"
              style={{ height: "28px", lineHeight: "1.2" }}
              onInput={(e) => {
                e.target.style.height = "inherit";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center md:space-x-2">
              <div className="custom-model-name hidden md:block">
                Gemini 2.0 Flash
              </div>
              <Tooltip text="Enhance your prompt" position="top">
                <button
                  type="button"
                  disabled={isEnhancing || !userPrompt}
                  onClick={handleEnhanceClick}
                  className="custom-button"
                >
                  {isEnhancing ? (
                    <>
                      <BiLoaderAlt className="animate-spin h-3 w-3 mr-1" />
                      <span>Enhancing...</span>
                    </>
                  ) : (
                    <>
                      <RiMagicLine className="h-3 w-3 mr-1" />
                      <span>Enhance Prompt</span>
                    </>
                  )}
                </button>
              </Tooltip>

              <button
                type="button"
                onClick={handleClear}
                className="custom-button"
                style={{ display: userPrompt ? "flex" : "none" }}
              >
                <MdClear className="h-3 w-3 mr-0.5" />
                <span>Clear</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <Tooltip text="Dictation" position="top">
                <button
                  type="button"
                  onClick={handleListenClick}
                  className={`p-2 rounded-full ${
                    isListening
                      ? "text-red-500 bg-red-100"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                  } transition-colors`}
                  title={isListening ? "Stop Listening" : "Start Listening"}
                >
                  {isListening ? (
                    <FaStopCircle className="w-3.5 h-3.5" />
                  ) : (
                    <FaMicrophone className="w-3.5 h-3.5" />
                  )}
                </button>
              </Tooltip>

              <Tooltip text="Web Search" position="top">
                <button
                  type="button"
                  onClick={handleWebSearchClick}
                  // Use parent's isLoading state for disabling and styling
                  className={`p-2 rounded-full ${"text-slate-500 hover:text-slate-700 hover:bg-slate-100"} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                  title={
                    isLoading ? "Processing..." : "Perform Web Search" // Reflect general loading state
                  }
                  disabled={isLoading || !userPrompt} // Disable during any loading
                >
                  {/* Show loader based on parent's isLoading state if desired, or keep simple icon */}
                  {isLoading && false ? ( // Example: Conditionally show loader if needed, currently false
                    <BiLoaderAlt className="animate-spin h-3.5 w-3.5" />
                  ) : (
                    <BsGlobe className="w-3.5 h-3.5" />
                  )}
                </button>
              </Tooltip>

              <Tooltip text="Submit" position="top">
                <button
                  type="submit"
                  disabled={isLoading || !userPrompt}
                  className="p-2 bg-teal-600 text-white hover:bg-teal-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <BiLoaderAlt className="animate-spin h-3 w-3" />
                  ) : (
                    <BsChevronRight className="w-3.5 h-3.5" />
                  )}
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </form>
      <div className="space-y-2 text-sm">
        <div className="bg-gray-100 p-4 rounded-2xl flex justify-between items-center">
          <div>
            <h3 className="text-slate-800">Introducing our Windows App</h3>
            <p className="text-xs text-slate-600">Coming Soon ..</p>
          </div>
          <div className="text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M0 3.449L9.75 2.1v9.45H0m10.949-9.602L24 1.1v10.45H10.949M0 12.6h9.75v9.45L0 20.699M10.949 12.6H24v10.45L10.949 21.9" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="custom-card-header">
            <div className="flex items-center justify-between space-x-14">
              <p className="font-light text-sm flex items-center">
                <LuMoonStar className="mr-1" />
                {weather.temp}
              </p>
              <p className="text-xs text-slate-600">{weather.location}</p>
            </div>
            <div className="text-xs flex justify-between items-center">
              <div>{weather.description}</div>
              <div className="text-slate-500 font-light">
                H: {weather.h} L: {weather.l}
              </div>
            </div>
          </div>

          {/* Dynamically render news articles */}
          {newsArticles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="custom-card-header flex hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150"
            >
              <div className="flex items-center space-x-2 w-full">
                {/* Image or Placeholder */}
                <img
                  src={article.urlToImage || ""} // Provide empty string as default src
                  width="50"
                  height="50"
                  alt={article.title || "News article image"}
                  className={`rounded-xl object-cover flex-shrink-0 w-[50px] h-[50px] ${
                    article.urlToImage ? "" : "hidden"
                  }`} // Hide if no image
                  onError={(e) => {
                    if (e.target instanceof HTMLImageElement) {
                      e.target.style.display = "none";
                    }
                  }}
                />
                {!article.urlToImage && (
                  <div className="w-[50px] h-[50px] bg-slate-200 dark:bg-slate-700 rounded-xl flex items-center justify-center text-slate-400 flex-shrink-0">
                    <BsLink45Deg size={20} />
                  </div>
                )}
                {/* Text content */}
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3">
                  {article.title || "Untitled Article"}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
