"use client";

import ReactMarkdown from "react-markdown";
import { useState } from "react"; // Need useState for internal copied state

export default function ResponseDisplay({ aiResponse }) {
  const [copiedBlockId, setCopiedBlockId] = useState(null);
  let codeBlockCounter = 0; // Keep counter local to this component instance

  const handleCopy = (text, blockId) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedBlockId(blockId);
      setTimeout(() => setCopiedBlockId(null), 2000); // Reset after 2 seconds
    });
  };

  // Avoid rendering if no response or just the placeholder/error messages
  if (
    !aiResponse ||
    aiResponse === "Thinking..." ||
    aiResponse === "Error generating response."
  ) {
    if (
      aiResponse === "Thinking..." ||
      aiResponse === "Error generating response."
    ) {
      // Optionally render the placeholder/error message with specific styling
      return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden p-6 mt-6 text-center text-slate-500">
          {aiResponse}
        </div>
      );
    }
    return null; // Don't render anything if aiResponse is empty/null
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden p-6 mt-6">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const codeString = String(children).replace(/\n$/, "");
            if (!inline) {
              const blockId = `code-block-${codeBlockCounter++}`;
              const isCopied = copiedBlockId === blockId;

              return (
                <div className="relative my-4">
                  {" "}
                  {/* Adjusted margin */}
                  <button
                    onClick={() => handleCopy(codeString, blockId)}
                    className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 text-white p-1.5 rounded text-xs flex items-center transition-colors z-10" // Adjusted padding and z-index
                  >
                    {isCopied ? "Copied!" : "Copy"}
                  </button>
                  <pre className="overflow-x-auto p-4 bg-slate-100 dark:bg-slate-800 rounded-md text-slate-900 dark:text-slate-100 text-sm">
                    {" "}
                    {/* Adjusted font size */}
                    <code {...props} className={className}>
                      {codeString}
                    </code>
                  </pre>
                </div>
              );
            }
            // Inline code style
            return (
              <code
                className={`bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-sm text-red-600 dark:text-red-400 ${className}`} // Adjusted inline style
                {...props}
              >
                {codeString}
              </code>
            );
          },
          // Add other markdown element styling if needed
          p(props) {
            return <p className="mb-4 last:mb-0" {...props} />;
          },
          ul(props) {
            return (
              <ul className="list-disc list-inside mb-4 pl-4" {...props} />
            );
          },
          ol(props) {
            return (
              <ol className="list-decimal list-inside mb-4 pl-4" {...props} />
            );
          },
          li(props) {
            return <li className="mb-1" {...props} />;
          },
          h1(props) {
            return (
              <h1
                className="text-2xl font-semibold mb-4 border-b pb-2"
                {...props}
              />
            );
          },
          h2(props) {
            return <h2 className="text-xl font-semibold mb-3" {...props} />;
          },
          h3(props) {
            return <h3 className="text-lg font-semibold mb-2" {...props} />;
          },
          blockquote(props) {
            return (
              <blockquote
                className="border-l-4 border-slate-300 dark:border-slate-700 pl-4 italic my-4"
                {...props}
              />
            );
          },
          a(props) {
            return (
              <a
                className="text-teal-600 dark:text-teal-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            );
          },
        }}
      >
        {aiResponse}
      </ReactMarkdown>

      {/* Copy Full Response Button */}
      <button
        onClick={() => handleCopy(aiResponse, "full-response")}
        className={`mt-4 px-4 py-2 rounded-lg text-sm ${
          copiedBlockId === "full-response"
            ? "bg-green-600 text-white"
            : "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white"
        } transition-colors`}
      >
        {copiedBlockId === "full-response"
          ? "Full Response Copied!"
          : "Copy Full Response"}
      </button>
    </div>
  );
}
