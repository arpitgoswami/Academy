"use client";

import { HiMenu } from "react-icons/hi";

export default function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 md:hidden">
      {/* Mobile Logo/Title */}
      <div className="flex items-center">
        <div className="w-6 h-6 mr-1">
          {" "}
          {/* Smaller logo for mobile */}
          <img src="/logo.svg" alt="Logo" className="w-full h-full" />
        </div>
        <span className="text-md font-semibold">Academy</span>
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
