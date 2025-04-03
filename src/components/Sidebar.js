"use client";

import { useAuth, signOutUser } from "../app/firebase";
import { BiSearch } from "react-icons/bi";
import { BsGlobe } from "react-icons/bs";
import { RiLightbulbLine } from "react-icons/ri";
import { IoSettingsOutline, IoCloseOutline } from "react-icons/io5"; // Added IoCloseOutline
import { FiDownload } from "react-icons/fi";

export default function Sidebar({ isOpen, onClose }) {
  // Added props
  const user = useAuth();

  // Base classes for positioning, background, padding, flex layout, and transition
  const baseClasses =
    "fixed top-0 bottom-0 z-30 w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 flex flex-col transition-transform duration-300 ease-in-out";

  // Classes for different states:
  // - Mobile (hidden by default, slides in when isOpen): `transform -translate-x-full md:translate-x-0`
  // - Mobile (visible when isOpen): `transform translate-x-0`
  // - Desktop (always visible): `md:translate-x-0` (already handled by removing translate-x-full)
  const responsiveClasses = isOpen
    ? "translate-x-0" // Slide in on mobile when open
    : "-translate-x-full md:translate-x-0"; // Hidden off-screen left on mobile, visible on desktop

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
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 mr-2">
          <svg viewBox="0 0 24 24" className="w-full h-full text-teal-600">
            <path
              fill="currentColor"
              d="M12,0L1.38,6v12L12,24l10.62-6V6L12,0z M12,4.29l6.38,3.61L12,11.51L5.62,7.9L12,4.29z M4.38,9.75L10,12.89v7.12L4.38,16.75V9.75z M14,20.01v-7.12l5.62-3.14v7L14,20.01z"
            />
          </svg>
        </div>
        <span className="text-lg font-semibold">perplexity</span>
      </div>

      {/* Sidebar Menu */}
      <div className="space-y-6">
        <div className="space-y-1">
          <button className="flex items-center py-2 px-3 rounded-md bg-slate-100 dark:bg-slate-800 w-full">
            <div className="w-6 mr-3 flex-shrink-0">
              <BiSearch className="w-5 h-5" />
            </div>
            <span className="font-medium">New Thread</span>
            <div className="ml-auto text-xs text-slate-500 font-mono">
              Ctrl P
            </div>
          </button>
        </div>

        <div className="space-y-1">
          <button className="flex items-center py-2 px-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 w-full">
            <div className="w-6 mr-3 flex-shrink-0">
              <BiSearch className="w-5 h-5" />
            </div>
            <span>Home</span>
          </button>

          <button className="flex items-center py-2 px-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 w-full">
            <div className="w-6 mr-3 flex-shrink-0">
              <BsGlobe className="w-5 h-5" />
            </div>
            <span>Discover</span>
          </button>

          <button className="flex items-center py-2 px-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 w-full">
            <div className="w-6 mr-3 flex-shrink-0">
              <RiLightbulbLine className="w-5 h-5" />
            </div>
            <span>Spaces</span>
          </button>

          <button className="flex items-center py-2 px-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 w-full">
            <div className="w-6 mr-3 flex-shrink-0">
              <BiSearch className="w-5 h-5" />
            </div>
            <span>Library</span>
          </button>
        </div>
      </div>

      {/* User Section */}
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center text-white font-medium">
              {user?.displayName?.[0] || user?.email?.[0] || "A"}
            </div>
            <span className="ml-2 text-sm font-medium">
              {user?.displayName || user?.email?.split("@")[0] || "User"}
            </span>
          </div>
          <IoSettingsOutline className="w-5 h-5 text-slate-500" />
        </div>

        <button
          onClick={signOutUser}
          className="flex items-center py-2 px-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 w-full"
        >
          <div className="w-6 mr-3 flex-shrink-0">
            <FiDownload className="w-5 h-5" />
          </div>
          {/* Changed text from Download to Sign Out for clarity */}
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
