"use client";

import { signInWithGoogle, useAuth } from "../firebase";
import { useState, useEffect } from "react";

export default function LoginPage() {
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
    <div className="bg-gray-50 h-screen flex items-center justify-center">
      <div className="w-96 bg-white rounded-lg shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center">
            <svg
              className="w-10 h-10 mr-3"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#1dd1a1" />
              <path
                d="M2 17L12 22L22 17"
                stroke="#1dd1a1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="#1dd1a1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <div className="font-semibold text-xl text-gray-800">Academy</div>
              <div className="text-sm text-gray-500">Research Platform</div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign in to continue
        </h2>

        {/* Google Sign-in Button */}
        {/* Google Sign-in Button */}
        <button
          onClick={handleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-md py-3 px-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150"
        >
          <svg
            className="h-5 w-5 mr-3"
            viewBox="0 0 24 24"
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
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5"
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
            "Sign in with Google"
          )}
        </button>
      </div>
    </div>
  );
}
