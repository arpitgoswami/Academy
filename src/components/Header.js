"use client";

import { HiMenu } from "react-icons/hi";

export default function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 md:hidden">
      {/* Mobile Logo/Title */}
      <div className="flex items-center">
        <div className="w-6 h-6 mr-2">
          {" "}
          {/* Smaller logo for mobile */}
          <svg viewBox="0 0 24 24" className="w-full h-full text-teal-600">
            <path
              fill="currentColor"
              d="M12,0L1.38,6v12L12,24l10.62-6V6L12,0z M12,4.29l6.38,3.61L12,11.51L5.62,7.9L12,4.29z M4.38,9.75L10,12.89v7.12L4.38,16.75V9.75z M14,20.01v-7.12l5.62-3.14v7L14,20.01z"
            />
          </svg>
        </div>
        <span className="text-md font-semibold">perplexity</span>
      </div>

      {/* Hamburger Menu Button */}
      <button
        onClick={onMenuClick}
        className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
        aria-label="Open menu"
      >
        <HiMenu className="w-6 h-6" />
      </button>
    </header>
  );
}
