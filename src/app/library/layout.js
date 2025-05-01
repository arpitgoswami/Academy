"use client";

import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { useAuth } from "../firebase";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  // Don't render anything if not authenticated
  if (!user) {
    return null;
  }

  const handleNewThread = () => {
    router.push("/dashboard");
  };

  return (
    <div className="relative h-screen flex">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNewThread={handleNewThread}
      />
      <main className="flex-1 md:ml-64">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-lg bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700"
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6 text-slate-600 dark:text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {children}
      </main>
    </div>
  );
}
