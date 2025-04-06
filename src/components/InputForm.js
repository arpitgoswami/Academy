"use client";

import { useState, useEffect, useRef } from "react";
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
  const [weather, setWeather] = useState({
    temp: "27°C",
    location: "Chandigarh",
    h: "38°",
    l: "20°",
  });

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

  const newsItems = [
    {
      id: 1,
      title: "Musk's Social Security Fraud Disclosure",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      title: "Musk Calls For Zero-Tariff Trade Zone With...",
      image: "https://via.placeholder.com/50",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-3xl md:text-center mb-8 font-normal text-slate-800">
        What do you want to know?
      </h1>

      <form onSubmit={handleSubmit} className="mb-10">
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
          <div className="p-4">
            <textarea
              ref={textareaRef}
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Ask anything..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.shiftKey) {
                  // Allow Shift+Enter for new lines, handle submit on Enter alone if desired, or keep parent's logic
                  handleSubmit(e);
                }
              }}
              className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-sm resize-none"
              style={{ minHeight: "44px" }}
              onInput={(e) => {
                e.target.style.height = "inherit";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
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
              <div>Clear</div>
              <div className="text-slate-500 font-light">
                H: {weather.h} L: {weather.l}
              </div>
            </div>
          </div>

          <div className="custom-card-header flex">
            <div className="flex items-center space-x-2">
              <Image
                src="https://pplx-res.cloudinary.com/image/upload/t_thumbnail/v1743801176/url_uploads/elon-musk-doge-social-security-number_igzejk.jpg"
                width={50}
                height={50}
                alt="User Profile"
                className="rounded-xl"
              />
              <p className="text-xs text-slate-600">
                Musk's Social Secy Fraud Disclosure
              </p>
            </div>
          </div>

          <div className="custom-card-header flex">
            <div className="flex items-center space-x-2">
              <Image
                src="https://pplx-res.cloudinary.com/image/upload/t_thumbnail/v1743869873/getty_uploads/2207713833_fgy8u6.jpg"
                width={50}
                height={50}
                alt="User Profile"
                className="rounded-xl"
              />
              <p className="text-xs text-slate-600">
                Musk Calls For Zero Tariff Trade Zone With EU Union <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
