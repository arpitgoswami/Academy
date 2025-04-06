"use client";

import { signInWithGoogle, useAuth } from "../firebase";
import { useState, useEffect } from "react";

export default function Home() {
  const user = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div
        className={`max-w-md w-full bg-slate-800 bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden transition-all duration-700 ease-out transform ${
          showContent ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="p-6 sm:p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-purple-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center w-full h-full">
              <span className="text-white text-2xl font-bold">G</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">CodeGenius</h1>
          <p className="text-gray-300 mb-8">AI-Powered Code Generation</p>

          <div
            className={`space-y-4 transition-all duration-500 delay-300 transform ${
              showContent
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="bg-slate-700 bg-opacity-50 rounded-xl p-5 text-left">
              <h2 className="text-white text-lg font-medium mb-2">
                Welcome, Developer
              </h2>
              <p className="text-gray-300 text-sm">
                Generate, optimize, and explain code effortlessly with our
                Gemini-powered AI assistant.
              </p>
            </div>

            <button
              onClick={handleSignIn}
              disabled={isLoading}
              className={`w-full relative group flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-slate-800 font-medium py-3 px-4 rounded-xl transition-all duration-300 overflow-hidden ${
                isLoading ? "opacity-75 cursor-not-allowed" : "hover:shadow-lg"
              }`}
            >
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-50 to-blue-100 transition-all duration-500 ease-out group-hover:w-full"></span>
              <span className="relative flex items-center gap-2">
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                )}
                Sign in with Google
              </span>
            </button>
          </div>
        </div>

        <div className="px-6 sm:px-8 pb-8">
          <div className="rounded-xl overflow-hidden bg-slate-900 bg-opacity-70 p-4 border border-slate-700/30">
            <pre className="text-xs sm:text-sm text-gray-400 overflow-hidden">
              <code>
                {`// AI-powered code generation
function Button({ onClick, children }) {
  return (
    <button 
      onClick={onClick}
      className="bg-gradient-to-r from-blue-500 
      to-purple-600 text-white px-4 py-2 
      rounded-md hover:opacity-90 
      transition-opacity"
    >
      {children}
    </button>
  );
}`}
              </code>
            </pre>
          </div>
        </div>

        <div className="bg-slate-900 bg-opacity-50 p-4 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} CodeGenius • Welcome, Developer
          </p>
        </div>
      </div>

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-indigo-600 rounded-full opacity-10 blur-3xl"></div>
      </div>
    </div>
  );
}
