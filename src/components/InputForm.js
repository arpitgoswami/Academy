"use client";

import { useState, useEffect, useRef } from "react";
import ToastContainer from "./ToastContainer";
import { BiLoaderAlt } from "react-icons/bi";
import { BsLink45Deg, BsGlobe, BsChevronRight } from "react-icons/bs";
import { FaMicrophone, FaStopCircle } from "react-icons/fa";
import { RiMagicLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { getCurrentLocationWeather } from "../services/weatherService";
import { fetchNewsArticles } from "../services/newsService";
import { LuMoonStar } from "react-icons/lu";
import Image from "next/image";

import Tooltip from "./Tooltip";

export default function InputForm({
  userPrompt,
  setUserPrompt,
  handleSubmit,
  handleWebSearchClick,
  isLoading,
  setAiResponse,
  setSources,
  user,
}) {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [weather, setWeather] = useState({});
  const [newsArticles, setNewsArticles] = useState([]);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "error", duration = 5000) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await getCurrentLocationWeather();
        setWeather({
          temp: `${Math.round(data.temp)}°C`,
          location: data.city,
          h: `${Math.round(data.temp_max)}°`,
          l: `${Math.round(data.temp_min)}°`,
          description: data.description,
        });
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        addToast(
          `Failed to fetch weather: ${error.message || "Unknown error"}`
        );
      }
    };

    loadWeather();
    const loadNews = async () => {
      try {
        const articles = await fetchNewsArticles();
        setNewsArticles(articles);
      } catch (error) {
        console.error("Error loading news articles:", error);
        addToast(
          `Failed to fetch news articles: ${error.message || "Unknown error"}`
        );
        setNewsArticles([]);
      }
    };
    loadNews();
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
      const url = `http://localhost:3000/api/enhance?originalPrompt=${encodeURIComponent(
        userPrompt
      )}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to enhance prompt");
      }

      const data = await response.json();

      if (!data.enhancedPrompt) {
        throw new Error("Invalid response from enhancement service");
      }

      setUserPrompt(data.enhancedPrompt);
      textareaRef.current.style.height = "180px";
      addToast("Prompt enhanced successfully!", "success", 3000);
    } catch (error) {
      console.error("Error enhancing prompt:", error);
      addToast(error.message || "Failed to enhance prompt. Please try again.");
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleClear = () => {
    setUserPrompt("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "44px";
      textareaRef.current.focus();
    }
  };

  return (
    <div className="w-full md:max-w-2xl px-6 relative space-y-8">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <h1 className="text-4xl md:text-center mb-8 font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
        What do you want to know?
      </h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="p-3">
            <textarea
              ref={textareaRef}
              value={userPrompt}
              onChange={(e) => {
                setUserPrompt(e.target.value);
                e.target.style.height = "44px";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              placeholder="Ask anything..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.shiftKey) {
                  handleSubmit(e);
                }
              }}
              className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-base resize-none px-3 py-2 min-h-[44px] placeholder-slate-400 transition-all duration-200"
              style={{ lineHeight: "1.5" }}
            />
          </div>

          <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
            <div className="flex items-center md:space-x-2">
              <div className="custom-model-name hidden md:block">
                Gemini 2.0 Flash
              </div>
              <Tooltip text="Enhance your prompt" position="top">
                <button
                  type="button"
                  disabled={isEnhancing || !userPrompt}
                  onClick={handleEnhanceClick}
                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="ml-2 md:ml-0 inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
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
                  className="p-2 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Perform Web Search"
                  disabled={!userPrompt}
                >
                  <BsGlobe className="w-3.5 h-3.5" />
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
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-2xl flex justify-between items-center border border-blue-100 shadow-sm">
          <div>
            <h3 className="text-slate-800 font-medium">
              Introducing our Windows App
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Experience AI on your desktop - Coming Soon
            </p>
          </div>
          <div className="text-blue-600">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-base font-medium flex items-center text-slate-700">
                  <LuMoonStar className="mr-2 h-4 w-4 text-slate-500" />
                  {weather.temp}
                </p>
                <p className="text-sm text-slate-600">{weather.location}</p>
              </div>
              <div className="flex justify-between items-center border-t pt-3 border-slate-100">
                <div className="text-sm text-slate-600">
                  {weather.description}
                </div>
                <div className="text-sm text-slate-600">
                  H: <span className="font-medium">{weather.h}</span> L:{" "}
                  <span className="font-medium">{weather.l}</span>
                </div>
              </div>
            </div>
          </div>

          {newsArticles.slice(0, 2).map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex hover:bg-slate-50 transition-colors duration-150"
            >
              <div className="flex items-center space-x-2 w-full">
                <img
                  src={article.urlToImage || ""}
                  width="50"
                  height="50"
                  alt={article.title || "News article image"}
                  className={`rounded-xl object-cover flex-shrink-0 w-[50px] h-[50px] ${
                    article.urlToImage ? "" : "hidden"
                  }`}
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
                <p className="text-sm text-slate-700 line-clamp-2 leading-snug font-medium">
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
