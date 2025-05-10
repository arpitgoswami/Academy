"use client";

import { useState, useEffect } from "react";
import Character from "./components/Character";
import PromptBar from "./components/PromptBar";
import DebugOutput from "./components/DebugOutput";

import LottieRecording from "./components/LottieRecording";
import LottieAnimation from "./components/LottieAnimation";
import LottieTalk from "./components/LottieTalk";
import LottieLoad from "./components/LottieLoad";

const DEFAULT_VOICE = { name: "Sarah", label: "Sarah (US)", lang: "en-US" };

// Remove emojis from text
const removeEmojis = (text) =>
  text.replace(
    /[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F1E0}-\u{1F1FF}]/gu,
    ""
  );

export default function SpacesPage() {
  const [promptInput, setPromptInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState(DEFAULT_VOICE);

  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = selectedVoice.lang;

      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      recognition.onresult = (event) => {
        const transcript = removeEmojis(event.results[0][0].transcript);
        setPromptInput(transcript);
      };
      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      setRecognition(recognition);
    }
  }, [selectedVoice.lang]);

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      const cleanText = removeEmojis(text);
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = selectedVoice.lang;
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handlePromptChange = (e) => {
    const cleanText = removeEmojis(e.target.value);
    setPromptInput(cleanText);
  };

  const handleSendPrompt = async () => {
    if (!promptInput.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptInput,
          voiceLang: selectedVoice.lang,
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const cleanResponse = removeEmojis(data.text);
      setCurrentResponse(cleanResponse);
      speak(cleanResponse);
    } catch (error) {
      console.error("Failed to get response:", error);
      speak("Sorry, something went wrong.");
    }
    setIsLoading(false);
    setPromptInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendPrompt();
    }
  };

  const handleVoiceChange = (voice) => {
    setSelectedVoice(voice);
    if (recognition) {
      recognition.lang = voice.lang;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070714] bg-[url('/stars-bg.png')] bg-cover">
      {/* Animated cosmic gradient background */}
      <div className="fixed inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-gradient-x pointer-events-none"></div>

      {/* Cosmic overlay gradients */}
      <div className="fixed inset-0 bg-gradient-to-b from-indigo-900/10 via-purple-900/5 to-[#070714]/90 pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-800/20 via-transparent to-transparent pointer-events-none"></div>

      {/* Animated stars */}
      <div className="fixed inset-0 overflow-hidden opacity-70 pointer-events-none">
        <div className="absolute h-1 w-1 bg-white rounded-full top-[10%] left-[25%] animate-pulse"></div>
        <div
          className="absolute h-1 w-1 bg-white rounded-full top-[45%] left-[75%] animate-pulse"
          style={{ animationDelay: "0.3s" }}
        ></div>
        <div
          className="absolute h-2 w-2 bg-white rounded-full top-[25%] left-[50%] animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute h-1 w-1 bg-white rounded-full top-[65%] left-[15%] animate-pulse"
          style={{ animationDelay: "0.7s" }}
        ></div>
        <div
          className="absolute h-1 w-1 bg-white rounded-full top-[85%] left-[82%] animate-pulse"
          style={{ animationDelay: "0.9s" }}
        ></div>
        <div
          className="absolute h-1 w-1 bg-white rounded-full top-[35%] left-[30%] animate-pulse"
          style={{ animationDelay: "1.1s" }}
        ></div>
      </div>

      <div className="pb-40 relative">
        {/* Main content area */}
        <div className="relative max-w-3xl mx-auto px-4 pt-16 pb-8">
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="mb-4 flex flex-col md:flex-row items-center justify-center">
              <h1 className="text-center items-center text-3xl font-bold text-white mb-2 tracking-wide">
                AI Virtual Guide
              </h1>
              <span className="text-sm text-center bg-blue-500 p-2 rounded-lg ml-2 text-black">
                BETA RELEASE
              </span>
            </div>
            <p className="text-indigo-200/80 text-center max-w-md">
              Describe your queries and let AI generate the perfect answer for
              your queries.
            </p>
          </div>

          {/* Character component */}
          <div className="w-auto h-auto flex items-center justify-center">
            <div className="bg-white rounded-full p-4">
              {isSpeaking ? (
                <LottieTalk />
              ) : isLoading ? (
                <LottieLoad />
              ) : isRecording ? (
                <LottieRecording />
              ) : (
                <LottieAnimation />
              )}
            </div>
          </div>

          {/* Debug output with updated styling */}
          {/* <div className="relative z-10 mt-8">
            <DebugOutput
              response={currentResponse}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#151530]/60 to-[#1a1a40]/60 border border-indigo-500/20 backdrop-blur-sm shadow-lg"
            />
          </div> */}
        </div>
      </div>

      <PromptBar
        selectedVoice={selectedVoice}
        onVoiceChange={handleVoiceChange}
        promptInput={promptInput}
        onPromptChange={handlePromptChange}
        onKeyPress={handleKeyPress}
        onRecord={() => {
          if (isRecording) recognition?.stop();
          else recognition?.start();
        }}
        isRecording={isRecording}
        isLoading={isLoading}
        isSpeaking={isSpeaking}
        recognition={recognition}
        onAskClick={isSpeaking ? stopSpeaking : handleSendPrompt}
      />
    </div>
  );
}
