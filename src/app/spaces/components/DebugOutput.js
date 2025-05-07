"use client";

export default function DebugOutput({ response }) {
  return (
    <div className="mt-8 p-4 bg-gray-100 dark:bg-slate-800/50 rounded-lg">
      <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
        Debug Output:
      </div>
      <div className="font-mono text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
        {response || "No response yet"}
      </div>
    </div>
  );
}
