"use client";

import InputForm from "@/components/InputForm";
import ResponseDisplay from "@/components/ResponseDisplay";
import { useState } from "react";
import { useAuth } from "../firebase";

export default function HomePage() {
  const [aiResponse, setAiResponse] = useState("");
  const [sources, setSources] = useState([]);
  const [userPrompt, setUserPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleNewThread = () => {
    setAiResponse("");
    setSources([]);
    setUserPrompt("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/ai-generation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      const data = await response.json();
      setAiResponse(data.response);
      setSources(data.sources || []);
    } catch (error) {
      console.error("Error:", error);
      setAiResponse("Error generating response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWebSearchClick = async () => {
    if (!userPrompt.trim()) return;

    setIsLoading(true);
    setAiResponse("Performing web search...");
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: userPrompt }),
      });

      const data = await response.json();
      setAiResponse(data.response);
      setSources(data.sources || []);
    } catch (error) {
      console.error("Error:", error);
      setAiResponse("Error performing web search. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <InputForm
          userPrompt={userPrompt}
          setUserPrompt={setUserPrompt}
          handleSubmit={handleSubmit}
          handleWebSearchClick={handleWebSearchClick}
          isLoading={isLoading}
          setAiResponse={setAiResponse}
          setSources={setSources}
          user={user}
        />
        {(aiResponse || sources.length > 0) && (
          <ResponseDisplay
            aiResponse={aiResponse}
            sources={sources}
            userPrompt={userPrompt}
            onNewThread={handleNewThread}
            user={user}
          />
        )}
      </div>
    </div>
  );
}
