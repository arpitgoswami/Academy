"use client";

import { useAuth } from "../firebase";
import { useState, useEffect } from "react";

import Sidebar from "../../components/Sidebar";
import InputForm from "../../components/InputForm";
import ResponseDisplay from "../../components/ResponseDisplay";
import DashboardFooter from "../../components/Footer";
import Header from "../../components/Header";

export default function Dashboard() {
  const user = useAuth();
  const [aiResponse, setAiResponse] = useState("");
  const [sources, setSources] = useState([]);
  const [userPrompt, setUserPrompt] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState(null); // State for selected prompt
  const [isLoading, setIsLoading] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isSearchingWeb, setIsSearchingWeb] = useState(false); // Add state for web search
  const [showContent, setShowContent] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAiResponse("Thinking...");
    if (!userPrompt.trim() || isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-generation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userPrompt,
          user,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      setAiResponse(data.response);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse("Error generating response.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWebSearchClick = async () => {
    if (!userPrompt || isSearchingWeb || isLoading) return;
    setIsSearchingWeb(true);
    setAiResponse("Thinking...");

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
      setSources(searchResult.sources || "No sources found.");
    } catch (error) {
      console.error("Error performing web search:", error);
      // Display error string to the user
      setAiResponse(`Error performing web search: ${error.message}`);
    } finally {
      setIsSearchingWeb(false);
    }
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to reset the response and sources for a new thread
  const handleNewThread = () => {
    setAiResponse("");
    setSources([]);
    setUserPrompt(""); // Also clear the user prompt for a fresh start
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 flex flex-col md:flex-row">
      {""}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        onNewThread={handleNewThread} // Pass handleNewThread
        onPromptClick={(prompt) => {
          console.log("setSelectedPrompt called with:", prompt); // Debug log
          setSelectedPrompt(prompt);
        }} // Ensure only one attribute for prompt click
      />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black min-h-screen bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <Header onMenuClick={toggleSidebar} />
      <div className="flex-1 flex flex-col md:ml-64">
        <main className="md:h-full container mx-auto py-8 md:py-10 max-w-full">
          {/* Conditionally render InputForm based on aiResponse state */}
          {/* Conditionally render InputForm: Show only when no response, thinking, or error */}
          {(!aiResponse ||
            aiResponse.startsWith("Error generating response") ||
            aiResponse.startsWith("Error performing web search")) && (
            <div
              className={`flex justify-center items-center transition-opacity h-full duration-500 ease-out ${
                showContent ? "opacity-100" : "opacity-0"
              }`}
            >
              <InputForm
                userPrompt={userPrompt}
                setUserPrompt={setUserPrompt}
                handleSubmit={handleSubmit}
                handleWebSearchClick={handleWebSearchClick} // Pass the handler down
                isLoading={isLoading}
                isEnhancing={isEnhancing}
                setIsEnhancing={setIsEnhancing}
                user={user}
                setAiResponse={setAiResponse}
                setSources={setSources}
              />
            </div>
          )}
          <div className="flex items-center justify-center">
            <ResponseDisplay
              aiResponse={aiResponse}
              sources={sources}
              userPrompt={selectedPrompt || userPrompt} // Use selected prompt if available
              onNewThread={handleNewThread}
              user={user} // Pass user object for storing prompts
            />
          </div>
        </main>
        <DashboardFooter />
      </div>
    </div>
  );
}
