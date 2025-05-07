"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Character from "./components/Character";
import PromptBar from "./components/PromptBar";
import DebugOutput from "./components/DebugOutput";

const DEFAULT_VOICE = { name: "Sarah", label: "Sarah (US)", lang: "en-US" };

// Remove emojis from text
const removeEmojis = (text) =>
  text.replace(
    /[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F1E0}-\u{1F1FF}]/gu,
    ""
  );

export default function SpacesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="pb-40 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="relative max-w-3xl mx-auto px-4 py-16">
          <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

          <Character isSpeaking={isSpeaking} />

          <DebugOutput response={currentResponse} />
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
