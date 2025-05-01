"use client";

import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BiLoaderAlt, BiCopy, BiCheck, BiLink } from "react-icons/bi";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { storePrompt } from "../services/promptStorage";
import Tooltip from "./Tooltip";

export default function ResponseDisplay({
  aiResponse,
  sources,
  userPrompt,
  onNewThread,
  user,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [copiedBlockId, setCopiedBlockId] = useState(null);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length > 1) {
      try {
        const response = await fetch(
          `/api/search/suggestions?q=${encodeURIComponent(value)}`
        );
        const data = await response.json();
        setSuggestions(data.suggestions || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    handleSearch(null, suggestion);
  };
  let codeBlockCounter = 0;

  const handleSearch = async (e, suggestionQuery = null) => {
    if (e) e.preventDefault();
    const query = suggestionQuery || searchQuery;
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCopy = (text, blockId) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedBlockId(blockId);
      setTimeout(() => setCopiedBlockId(null), 2000);
    });
  };

  useEffect(() => {
    if (
      aiResponse &&
      aiResponse !== "Thinking..." &&
      aiResponse !== "Performing web search..." &&
      !aiResponse.startsWith("Error generating response") &&
      !aiResponse.startsWith("Error performing web search")
    ) {
      storePrompt(user, userPrompt, "generation", aiResponse);
    }
  }, [aiResponse, userPrompt, user]);

  if (
    !aiResponse ||
    aiResponse === "Thinking..." ||
    aiResponse.startsWith("Error generating response") ||
    aiResponse.startsWith("Error performing web search")
  ) {
    if (aiResponse) {
      return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/80 dark:to-slate-900 border border-slate-200/80 dark:border-slate-700/50 rounded-3xl p-10 mt-6 text-center shadow-sm backdrop-blur-sm">
          {aiResponse === "Thinking..." ? (
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 relative">
                <div className="absolute inset-0 rounded-full border-t-2 border-teal-500 animate-spin"></div>
                <div className="absolute inset-3 rounded-full bg-teal-500/10 flex items-center justify-center">
                  <BiLoaderAlt className="h-6 w-6 text-teal-500" />
                </div>
              </div>
              <span className="text-lg font-medium text-slate-600 dark:text-slate-300">
                Thinking...
              </span>
            </div>
          ) : (
            <span className="text-lg font-medium text-slate-600 dark:text-slate-300">
              {aiResponse}
            </span>
          )}
        </div>
      );
    }
    return null;
  }

  const markdownComponents = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : undefined;
      const codeString = String(children).replace(/\n$/, "");

      if (!inline && language) {
        const blockId = `code-block-${codeBlockCounter++}`;
        const isCopied = copiedBlockId === blockId;

        return (
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/70 my-6 shadow-sm group transition-all duration-300 hover:shadow-md">
            <div className="flex justify-between items-center px-5 py-3 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/80 dark:to-slate-800/50 text-xs font-medium">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                <span className="font-mono text-slate-600 dark:text-slate-400 ml-1">
                  {language}
                </span>
              </div>
              <button
                onClick={() => handleCopy(codeString, blockId)}
                className={`flex items-center gap-1.5 p-1.5 rounded-full ${
                  isCopied
                    ? "text-green-500 bg-green-50 dark:bg-green-900/20"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                } transition-all duration-200`}
                aria-label={isCopied ? "Copied" : "Copy code"}
              >
                {isCopied ? (
                  <>
                    <BiCheck className="h-3.5 w-3.5" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <BiCopy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <SyntaxHighlighter
              style={atomDark}
              language={language}
              PreTag="div"
              customStyle={{
                margin: 0,
                padding: "1.5rem",
                flexWrap: "wrap",
                fontSize: "0.9rem",
                backgroundColor: "#1e293b",
                borderRadius: "0",
              }}
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
        );
      }
      if (!inline) {
        return (
          <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md font-mono text-sm">
            {codeString}
          </code>
        );
      }
      return (
        <code
          className={`bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm text-teal-600 dark:text-teal-400 font-mono ${
            className || ""
          }`}
          {...props}
        >
          {codeString}
        </code>
      );
    },
    p: ({ node, ...props }) => (
      <p
        className="mb-5 last:mb-0 text-slate-700 dark:text-slate-300 text-base leading-relaxed"
        {...props}
      />
    ),
    ul: ({ node, ...props }) => (
      <ul
        className="list-disc list-outside mb-5 pl-6 space-y-2 text-slate-700 dark:text-slate-300"
        {...props}
      />
    ),
    ol: ({ node, ...props }) => (
      <ol
        className="list-decimal list-outside mb-5 pl-6 space-y-2 text-slate-700 dark:text-slate-300"
        {...props}
      />
    ),
    li: ({ node, ...props }) => <li className="mb-2 text-base" {...props} />,
    h1: ({ node, ...props }) => (
      <h1
        className="text-3xl font-bold mt-8 mb-4 border-b border-slate-200 dark:border-slate-700/50 pb-2 text-slate-900 dark:text-white"
        {...props}
      />
    ),
    h2: ({ node, ...props }) => (
      <h2
        className="text-2xl font-semibold mt-6 mb-3 text-slate-900 dark:text-white"
        {...props}
      />
    ),
    h3: ({ node, ...props }) => (
      <h3
        className="text-xl font-semibold mt-5 mb-2.5 text-slate-900 dark:text-white"
        {...props}
      />
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote
        className="border-l-4 border-teal-500 bg-gradient-to-r from-teal-50 to-white dark:from-teal-900/20 dark:to-slate-900/50 text-slate-700 dark:text-slate-300 pl-5 py-4 italic my-6 rounded-r-lg"
        {...props}
      />
    ),
    a: ({ node, ...props }) => (
      <a
        className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
  };

  return (
    <div className="w-full md:max-w-3xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/70 rounded-3xl overflow-hidden mb-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
      <form
        onSubmit={handleSearch}
        className="p-7 border-b border-slate-200 dark:border-slate-700/50"
      >
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() =>
              searchQuery.trim().length > 1 && setShowSuggestions(true)
            }
            placeholder="Search for more information..."
            className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200 text-sm transition-colors border-b border-slate-100 dark:border-slate-700/50 last:border-0"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          <button
            type="submit"
            disabled={isSearching}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-teal-500 dark:text-slate-500 dark:hover:text-teal-400 transition-colors"
          >
            {isSearching ? (
              <BiLoaderAlt className="h-5 w-5 animate-spin" />
            ) : (
              <IoSearchOutline className="h-5 w-5" />
            )}
          </button>
        </div>
      </form>

      <div className="flex items-center justify-between px-7 pt-7 pb-4">
        <div className="flex items-center max-w-[70%]">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent truncate">
            {userPrompt.length > 40
              ? `${userPrompt.slice(0, 40)}...`
              : userPrompt}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Tooltip text="Copy Full Response" position="left">
            <button
              onClick={() => handleCopy(aiResponse, "full-response")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                copiedBlockId === "full-response"
                  ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
              aria-label={
                copiedBlockId === "full-response" ? "Copied" : "Copy response"
              }
            >
              {copiedBlockId === "full-response" ? (
                <>
                  <BiCheck className="h-4 w-4" />
                  <span className="hidden md:block">Copied</span>
                </>
              ) : (
                <>
                  <BiCopy className="h-4 w-4" />
                  <span className="hidden md:block">Copy</span>
                </>
              )}
            </button>
          </Tooltip>
          <Tooltip text="New Chat" position="left">
            <button
              onClick={onNewThread}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-teal-50 text-teal-600 hover:bg-teal-100 dark:bg-teal-900/20 dark:text-teal-400 dark:hover:bg-teal-900/30 transition-all duration-200"
            >
              <span>New Thread</span>
            </button>
          </Tooltip>
        </div>
      </div>

      <div className="px-7">
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700/50">
          <div className="flex items-center">
            <p className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 pb-3 border-b-2 border-teal-500">
              <MdOutlineQuestionAnswer className="mr-2 h-4 w-4 text-teal-500" />
              {searchResults ? "Search Results" : "Response"}
            </p>
          </div>
        </div>
      </div>

      <div className="text-slate-700 text-base mt-6 px-7 pb-7 dark:text-slate-200 leading-relaxed prose dark:prose-invert max-w-none prose-slate">
        {searchResults ? (
          <ReactMarkdown components={markdownComponents}>
            {searchResults.answer}
          </ReactMarkdown>
        ) : (
          <ReactMarkdown components={markdownComponents}>
            {aiResponse}
          </ReactMarkdown>
        )}
      </div>

      {(sources?.length > 0 || searchResults?.sources?.length > 0) && (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100/70 dark:from-slate-800/50 dark:to-slate-800/30 mt-4 border-t border-slate-200/70 dark:border-slate-700/50 px-7 py-6">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-5 flex items-center">
            <BiLink className="mr-2 h-4 w-4 text-teal-500" />
            Sources{" "}
            {searchResults
              ? `(${searchResults.sources.length})`
              : `(${sources.length})`}
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {(searchResults ? searchResults.sources : sources).map(
              (source, index) => {
                const url = typeof source === "string" ? source : source?.link;
                if (!url) return null;

                let domain = "";
                let faviconUrl = "";

                try {
                  const parsedUrl = new URL(url);
                  domain = parsedUrl.hostname.replace(/^www\./, "");
                  faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=16`;
                } catch (err) {
                  return null;
                }

                return (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-white dark:bg-slate-800/80 hover:bg-teal-50 dark:hover:bg-slate-700/80 rounded-xl border border-slate-200/70 dark:border-slate-700/50 shadow-sm transition-all duration-200 group hover:border-teal-200 dark:hover:border-teal-800/70 hover:shadow-md"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-5 h-5 mt-1 rounded-full bg-slate-100 dark:bg-slate-700 p-0.5 flex items-center justify-center overflow-hidden">
                        <img
                          src={faviconUrl}
                          alt={`${domain} favicon`}
                          className="w-full h-full object-contain rounded-sm"
                          onError={(e) => {
                            if (e.target instanceof HTMLImageElement)
                              e.target.style.display = "none";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-medium text-slate-900 dark:text-slate-100 mb-1 leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400">
                          {typeof source === "object"
                            ? source.title || domain
                            : domain}
                        </p>
                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                          <span className="truncate">{domain}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
}
