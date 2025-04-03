"use client";

import { useAuth } from "../firebase";
import { useState, useEffect } from "react";
import { generateAIResponse } from "../../services/aiGeneration"; // Corrected path

// Import the components
import Sidebar from "../../components/Sidebar";
import InputForm from "../../components/InputForm";
import ResponseDisplay from "../../components/ResponseDisplay";
import DashboardFooter from "../../components/DashboardFooter";
import Header from "../../components/Header"; // Import the new Header

export default function Dashboard() {
  const user = useAuth();
  const [aiResponse, setAiResponse] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar

  useEffect(() => {
    setShowContent(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userPrompt.trim() || isLoading) return;

    setIsLoading(true);
    setAiResponse(""); // Clear previous response before streaming

    try {
      // Define the callback function for streaming updates
      const handleChunk = (chunk) => {
        setAiResponse((prev) => prev + chunk); // Append the new chunk to the existing response
      };

      // Call generateAIResponse with the callback
      // Note: We don't need the return value here anymore as state is updated via callback
      await generateAIResponse(userPrompt, user, handleChunk);

      // The full response is aggregated and stored within generateAIResponse itself
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse("Error generating response.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 flex flex-col md:flex-row">
      {" "}
      {/* Adjust flex direction */}
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar} // Close sidebar on overlay click
        ></div>
      )}
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64">
        {" "}
        {/* Add margin-left on desktop */}
        {/* Mobile Header */}
        <Header onMenuClick={toggleSidebar} />
        {/* Main scrollable content */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {" "}
          {/* Make this part scrollable */}
          <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 md:py-10 max-w-3xl">
            {" "}
            {/* Adjusted padding */}
            <div
              className={`transition-opacity duration-500 ease-out ${
                // Simpler transition
                showContent ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Title hidden on smaller screens for cleaner look, shown on md+ */}
              <h1 className="text-3xl md:text-4xl mb-8 md:mb-12 text-center hidden md:block">
                What do you want to know?
              </h1>

              <InputForm
                userPrompt={userPrompt}
                setUserPrompt={setUserPrompt}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                isEnhancing={isEnhancing}
                setIsEnhancing={setIsEnhancing}
                user={user}
              />

              <ResponseDisplay aiResponse={aiResponse} />
            </div>
          </main>
          {/* Footer sticks to bottom of this scrollable div */}
          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}
