"use client";

import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BiLoaderAlt } from "react-icons/bi";
import { FiCopy, FiCheck } from "react-icons/fi";

export default function ResponseDisplay({ aiResponse }) {
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
        <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm p-6 mt-6 text-center text-slate-600 dark:text-slate-400 italic">
          {aiResponse === "Thinking..." ? (
            <span className="flex items-center justify-center">
              <BiLoaderAlt className="animate-spin mr-2 h-4 w-4" /> Thinking...
            </span>
          ) : (
            aiResponse
          )}
        </div>
      );
    }
    return null;
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden p-8 mt-6 text-slate-800 dark:text-slate-200 leading-relaxed">
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
                  <div className="rounded-md overflow-hidden border border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-center px-2 py-2 bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400">
                      <span className="font-mono">{language}</span>
                      <button
                        onClick={() => handleCopy(codeString, blockId)}
                        className={`flex items-center gap-1.5 p-1 rounded ${
                          isCopied
                            ? "text-green-500"
                            : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                        } transition-colors duration-200`}
                        aria-label={isCopied ? "Copied" : "Copy code"}
                      >
                        {isCopied ? (
                          <>
                            <FiCheck className="h-4 w-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <FiCopy className="h-4 w-4" />
                            <span>Copy code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <SyntaxHighlighter
                      style={a11yLight}
                      language={language}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        padding: "1rem",
                        flexWrap: "wrap",
                        fontSize: "0.9rem",
                        backgroundColor: "transparent",
                      }}
                    >
                      {codeString}
                    </SyntaxHighlighter>
                  </div>
                );
              } else {
                return (
                  <code className="bg-slate-100 p-1 rounded-md">
                    {codeString}
                  </code>
                );
              }
            }
            return (
              <code
                className={`bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-xs text-red-600 dark:text-red-400 ${
                  className || ""
                }`}
                {...props}
              >
                {codeString}
              </code>
            );
          },
          p: ({ node, ...props }) => (
            <p className="mb-5 last:mb-0" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul
              className="list-disc list-outside mb-5 pl-6 space-y-1"
              {...props}
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              className="list-decimal list-outside mb-5 pl-6 space-y-1"
              {...props}
            />
          ),
          li: ({ node, ...props }) => <li className="mb-1.5" {...props} />,
          h1: ({ node, ...props }) => (
            <h1
              className="text-3xl font-bold mt-6 mb-4 border-b border-slate-300 dark:border-slate-700 pb-2"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-semibold mt-5 mb-3" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-teal-500 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 pl-4 py-2 italic my-5"
              {...props}
            />
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-teal-600 dark:text-teal-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
        }}
      >
        {aiResponse}
      </ReactMarkdown>

      <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end">
        <button
          onClick={() => handleCopy(aiResponse, "full-response")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            copiedBlockId === "full-response"
              ? "bg-green-600 text-white cursor-default"
              : "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200"
          } transition-all duration-200`}
          disabled={copiedBlockId === "full-response"}
        >
          {copiedBlockId === "full-response"
            ? "✓ Copied"
            : "Copy Full Response"}
        </button>
      </div>
    </div>
  );
}
