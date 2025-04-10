"use client";

import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BiLoaderAlt, BiCopy, BiCheck, BiLink } from "react-icons/bi";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { storePrompt } from "../services/promptStorage";

import Tooltip from "./Tooltip";

export default function ResponseDisplay({
  aiResponse,
  sources,
  userPrompt,
  onNewThread,
  user,
}) {
  useEffect(() => {
    // Store prompt when we have a valid response (not loading/error state)
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

  const [copiedBlockId, setCopiedBlockId] = useState(null);
  let codeBlockCounter = 0;

  const handleCopy = (text, blockId) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedBlockId(blockId);
      setTimeout(() => setCopiedBlockId(null), 2000);
    });
  };

  if (
    !aiResponse ||
    aiResponse === "Thinking..." ||
    aiResponse.startsWith("Error generating response") ||
    aiResponse.startsWith("Error performing web search")
  ) {
    if (aiResponse) {
      return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 mt-6 text-center text-slate-600 dark:text-slate-400 italic flex items-center justify-center min-h-32">
          {/* Show loader for both Thinking and Web Search states */}
          {aiResponse === "Thinking..." ? (
            <span className="flex items-center justify-center">
              <BiLoaderAlt className="animate-spin mr-2 h-5 w-5 text-teal-500" />
              {/* Keep text as Thinking... or adjust if needed */}
              <span className="text-lg">Thinking...</span>
            </span>
          ) : (
            <span className="text-lg">{aiResponse}</span>
          )}
        </div>
      );
    }
    return null;
  }

  return (
    <div className="w-full md:max-w-3xl dark:bg-slate-900 dark:border-slate-800 overflow-hidden mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-3xl font-medium text-slate-700 dark:text-slate-300">
            {userPrompt.length > 15
              ? `${userPrompt.slice(0, 15)}...`
              : userPrompt}
          </span>
        </div>
        <Tooltip text="Copy Full Response" position="left">
          <button
            onClick={() => handleCopy(aiResponse, "full-response")}
            className="custom-button"
            aria-label={
              copiedBlockId === "full-response" ? "Copied" : "Copy response"
            }
          >
            {copiedBlockId === "full-response" ? (
              <>
                <BiCheck className="h-3 w-3 mr-1" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <BiCopy className="h-3 w-3 mr-1" />
                <span>Copy Response</span>
              </>
            )}
          </button>
        </Tooltip>
      </div>

      <div className="mt-4">
        <div className="flex justify-between space-x-2 text-sm border-b">
          <p className="custom-tab">
            <MdOutlineQuestionAnswer className="mr-1" />
            Answer
          </p>
          <Tooltip text="New Chat" position="left">
            <button onClick={onNewThread} className="text-xs hover:underline">
              New Thread
            </button>
          </Tooltip>
        </div>
      </div>

      <div className="text-slate-800 text-sm mt-4 dark:text-slate-200 leading-relaxed">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : undefined;
              const codeString = String(children).replace(/\n$/, "");

              if (!inline) {
                if (language) {
                  const blockId = `code-block-${codeBlockCounter++}`;
                  const isCopied = copiedBlockId === blockId;

                  return (
                    <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 my-4">
                      <div className="flex justify-between items-center px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 text-xs text-slate-600 dark:text-slate-400">
                        <span className="font-mono font-medium">
                          {language}
                        </span>
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
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <BiCopy className="h-3.5 w-3.5" />
                              <span>Copy code</span>
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
                          padding: "1.25rem",
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
                } else {
                  return (
                    <code className="bg-slate-100 dark:bg-slate-800 p-1 rounded-md">
                      {codeString}
                    </code>
                  );
                }
              }
              return (
                <code
                  className={`bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs text-red-600 dark:text-red-400 font-medium ${
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
                className="mb-5 last:mb-0 text-slate-700 dark:text-slate-300"
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
            li: ({ node, ...props }) => <li className="mb-2" {...props} />,
            h1: ({ node, ...props }) => (
              <h1
                className="text-3xl font-bold mt-8 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2 text-slate-900 dark:text-white"
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
                className="border-l-4 border-teal-500 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 text-slate-700 dark:text-slate-300 pl-4 py-3 italic my-5 rounded-r-md"
                {...props}
              />
            ),
            a: ({ node, ...props }) => (
              <a
                className="text-teal-600 dark:text-teal-400 hover:underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),
          }}
        >
          {aiResponse}
        </ReactMarkdown>
      </div>

      {sources && sources.length > 0 && (
        <div className="dark:bg-slate-800/50 mt-4 border-t border-slate-200 dark:border-slate-700 py-6">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 flex items-center">
            <BiLink className="mr-2 h-4 w-4 text-teal-500" />
            Sources
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {sources.map((source, index) => {
              const url = typeof source === "string" ? source : source?.link;

              if (!url) return null;

              let domain = "";
              let faviconUrl = "";

              try {
                const parsedUrl = new URL(url);
                domain = parsedUrl.hostname.replace(/^www\./, "");
                faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=16`;
              } catch (err) {
                console.error("Invalid URL in source:", source);
                return null;
              }

              return (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors duration-150 group"
                >
                  <div className="flex items-center mb-1.5">
                    <img
                      src={faviconUrl}
                      alt={`${domain} favicon`}
                      className="w-4 h-4 mr-2 rounded-sm"
                      onError={(e) => {
                        if (e.target instanceof HTMLImageElement)
                          e.target.style.display = "none";
                      }}
                    />
                    <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {domain}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-150">
                    {typeof source === "object"
                      ? source.title || domain
                      : domain}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
