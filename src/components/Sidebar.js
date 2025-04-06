"use client";

import { useAuth, signOutUser } from "../app/firebase";
import { BiHome, BiSearch, BiLibrary } from "react-icons/bi";
import { BsGlobe } from "react-icons/bs";
import { RiLightbulbLine } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";

// NavButton component for consistent button styling
const NavButton = ({ icon, text }) => (
  <button
    className="flex items-center py-2 px-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 w-full text-slate-700 dark:text-slate-200 transition-colors"
    aria-label={text}
  >
    <div className="w-6 mr-3 flex-shrink-0">{icon}</div>
    <span>{text}</span>
  </button>
);

export default function Sidebar({ isOpen, onClose }) {
  const user = useAuth();

  const baseClasses =
    "fixed top-0 bottom-0 z-30 w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 flex flex-col shadow-lg transition-all duration-300 ease-in-out";

  const responsiveClasses = isOpen
    ? "translate-x-0 shadow-2xl md:shadow-none"
    : "-translate-x-full md:translate-x-0";

  return (
    <div className={`${baseClasses} ${responsiveClasses}`}>
      {/* Close button for mobile */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 md:hidden" // Only show on mobile
        aria-label="Close menu"
      >
        <IoCloseOutline className="w-6 h-6" />
      </button>
      {/* Logo */}
      <div className="flex items-center mb-8">
        <div className="w-9 h-9 mr-3">
          <svg
            viewBox="0 0 24 24"
            className="w-full h-full text-teal-600 drop-shadow-sm"
          >
            <path
              fill="currentColor"
              d="M12,0L1.38,6v12L12,24l10.62-6V6L12,0z M12,4.29l6.38,3.61L12,11.51L5.62,7.9L12,4.29z M4.38,9.75L10,12.89v7.12L4.38,16.75V9.75z M14,20.01v-7.12l5.62-3.14v7L14,20.01z"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">
            Academy
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Research Platform
          </p>
        </div>
      </div>

      {/* Sidebar Menu */}
      <div className="space-y-6 flex-1 overflow-y-auto">
        <button className="flex items-center py-2 px-3 rounded-md bg-teal-50 dark:bg-teal-900/20 w-full group transition-colors hover:bg-teal-100 dark:hover:bg-teal-900/30">
          <div className="w-6 mr-3 flex-shrink-0 text-teal-600 dark:text-teal-400">
            <BiSearch className="w-5 h-5" />
          </div>
          <span className="font-medium text-teal-700 dark:text-teal-300">
            New Thread
          </span>
          <div className="ml-auto text-xs text-teal-600 dark:text-teal-400 font-mono bg-teal-100 dark:bg-teal-900/40 px-1.5 py-0.5 rounded">
            ⌘ P
          </div>
        </button>

        <nav className="space-y-2" aria-label="Sidebar navigation">
          <NavButton icon={<BiHome className="w-5 h-5" />} text="Home" />
          <NavButton icon={<BsGlobe className="w-5 h-5" />} text="Discover" />
          <NavButton
            icon={<RiLightbulbLine className="w-5 h-5" />}
            text="Spaces"
          />
          <NavButton icon={<BiLibrary className="w-5 h-5" />} text="Library" />
        </nav>
      </div>

      {/* User Section with improved styling */}
      <div className="mt-auto border-t dark:border-slate-800 pt-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-950 ring-teal-600">
              <Image
                src="https://lh3.googleusercontent.com/a/ACg8ocJpA8Svo0a7n73bbHyAKUmXPhM6gJclx0UDzVfHdafVXuU=s96-c"
                width={100}
                height={100}
                alt="User Profile"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium truncate max-w-[120px]">
                {user?.displayName || user?.email?.split("@")[0] || "User"}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[120px]">
                {user?.email || "user@example.com"}
              </span>
            </div>
          </div>
          <button
            onClick={signOutUser}
            className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            aria-label="Sign out"
          >
            <FiLogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
