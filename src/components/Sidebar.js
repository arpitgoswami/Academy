"use client";

import { useEffect } from "react"; // Import useEffect

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
    <div className="w-6 mr-1 flex-shrink-0">{icon}</div>
    <span>{text}</span>
  </button>
);

export default function Sidebar({ isOpen, onClose, onNewThread }) {
  // Add onNewThread prop
  const user = useAuth();

  const baseClasses =
    "fixed top-0 min-h-screen bottom-0 z-30 w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col transition-all duration-300 ease-in-out";

  const responsiveClasses = isOpen
    ? "translate-x-0"
    : "-translate-x-full md:translate-x-0";

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === "n" && event.shiftKey) {
        event.preventDefault(); // Prevent default browser action (new window)
        if (onNewThread) {
          onNewThread();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onNewThread]); // Re-run effect if onNewThread changes

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
      <div className="px-4 pt-4 flex items-center mb-8 hover:opacity-80 cursor-pointer">
        <div className="w-9 h-9 mr-2">
          <img src="/logo.svg" alt="Logo" className="w-full h-full" />
        </div>
        <div>
          <h1 className="font-semibold text-slate-900 dark:text-white">
            Academy
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Research Platform
          </p>
        </div>
      </div>

      {/* Sidebar Menu */}
      <div className="px-4 space-y-6 text-sm flex-1 overflow-y-auto">
        <button
          onClick={onNewThread} // Add onClick handler
          className="flex space-x-2 justify-between items-center py-2 px-4 rounded-full bg-teal-50 dark:bg-teal-900/20 w-full group transition-colors border border-teal-100 hover:bg-teal-100 dark:hover:bg-teal-900/30"
        >
          <span className="font-medium text-teal-700 dark:text-teal-300">
            New Thread
          </span>
          <div>
            <span className="custom-keyboard">Shift</span>{" "}
            {/* Changed Ctrl to Shift */}
            <span className="custom-keyboard">N</span>
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
        <div className="px-4 pb-4 flex items-center justify-between px-2">
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
