"use client";

import { useAuth, signOutUser } from "../firebase";
import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

import { HiOutlineLogout, HiOutlineLightningBolt } from "react-icons/hi";
import { BiLoaderAlt } from "react-icons/bi";
import { BsCircleFill } from "react-icons/bs";

export default function Dashboard() {
  const user = useAuth();
  const [aiResponse, setAiResponse] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [copiedBlockId, setCopiedBlockId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAiResponse("Thinking...");
    try {
      const genAI = new GoogleGenerativeAI(
        "AIzaSyDyO3RcVB1iXrGt16uIoZ0hDWiSbHbsXp4"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const result = await model.generateContent(userPrompt);
      const responseText = result.response.text();

      setAiResponse(responseText);
      setCopiedBlockId(null);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse("Error generating response.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text, blockId) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedBlockId(blockId);
      setTimeout(() => setCopiedBlockId(null), 2000);
    });
  };

  let codeBlockCounter = 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white">
      <header className="bg-slate-800/40 backdrop-blur-xl border-b border-slate-700/40 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-3 sm:mb-0">
            <div className="w-10 h-10 relative mr-3 group">
              <div className="absolute inset-0 bg-purple-500 rounded-full opacity-30 blur-md group-hover:opacity-50 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center w-full h-full shadow-md transform group-hover:scale-105 transition-all duration-300">
                <span className="text-white text-sm font-extrabold">CG</span>
              </div>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              CodeGenius
            </h1>
          </div>

          <div className="flex items-center">
            <div className="mr-4 text-sm text-gray-300 flex items-center">
              <BsCircleFill className="h-2 w-2 text-green-400 mr-2 animate-pulse" />
              <span>Welcome, {user?.displayName || user?.email}</span>
            </div>
            <button
              onClick={signOutUser}
              className="bg-slate-800/70 hover:bg-slate-700/70 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200 flex items-center shadow-md border border-slate-700/50 hover:border-slate-600"
            >
              <HiOutlineLogout className="h-4 w-4 mr-1.5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
        <div
          className={`transition-all duration-700 ease-out transform ${
            showContent
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl shadow-2xl p-6 mb-8 border border-slate-700/40 hover:border-slate-600/40 transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              <HiOutlineLightningBolt className="h-5 w-5 mr-2 text-purple-400" />
              Ask CodeGenius
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <textarea
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder="Ask a coding question or request code..."
                  required
                  rows={4}
                  className="w-full px-5 py-4 bg-slate-900/60 border border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/70 transition-all text-white placeholder-gray-400 shadow-inner relative z-10 text-base resize-none"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-7 py-3 rounded-xl font-medium transition-all flex items-center shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <BiLoaderAlt className="animate-spin h-5 w-5 mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <HiOutlineLightningBolt className="h-5 w-5 mr-2" />
                      Generate Code
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {aiResponse && (
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-slate-700/40">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const codeString = String(children).replace(/\n$/, "");
                    if (!inline) {
                      // Assign a unique ID to each code block
                      const blockId = `code-block-${codeBlockCounter++}`;
                      const isCopied = copiedBlockId === blockId;

                      return (
                        <div className="relative mt-4 mb-4">
                          <button
                            onClick={() => handleCopy(codeString, blockId)}
                            className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md text-sm flex items-center transition-colors"
                          >
                            {isCopied ? "Copied!" : "Copy"}
                          </button>
                          <pre className="overflow-x-auto p-4 bg-gray-900 rounded-md text-gray-100">
                            <code {...props} className={className}>
                              {codeString}
                            </code>
                          </pre>
                        </div>
                      );
                    }
                    return (
                      <code
                        className={`bg-gray-800 px-1 py-0.5 rounded text-gray-200 ${className}`}
                        {...props}
                      >
                        {codeString}
                      </code>
                    );
                  },
                }}
              >
                {aiResponse}
              </ReactMarkdown>

              {aiResponse !== "Thinking..." &&
                aiResponse !== "Error generating response." && (
                  <button
                    onClick={() => handleCopy(aiResponse, "full-response")}
                    className={`mt-4 px-4 py-2 rounded-lg text-sm ${
                      copiedBlockId === "full-response"
                        ? "bg-green-600 text-white"
                        : "bg-slate-700 hover:bg-slate-600 text-white"
                    } transition-colors`}
                  >
                    {copiedBlockId === "full-response"
                      ? "Full Response Copied!"
                      : "Copy Full Response"}
                  </button>
                )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
