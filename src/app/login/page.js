"use client";

import { signInWithGoogle, useAuth } from "../firebase";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const user = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Add a small delay for the fade-in effect to be noticeable
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 200); // Increased delay for smoother entrance
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      // Redirect logic would typically go here after successful sign-in
      // For example: window.location.href = '/dashboard';
    } catch (error) {
      console.error("Sign in error:", error);
      // Optionally show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-0">
      {/* Main container with split layout */}
      <div className="w-full max-w-6xl h-full md:h-5/6 flex overflow-hidden rounded-2xl shadow-2xl">
        {/* Left side: Login form */}
        <div
          className={`w-full md:w-1/2 bg-white p-8 md:p-12 transition-all duration-700 ease-out ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          } relative`}
        >
          {/* Decorative accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />

          {/* Logo with improved styling */}
          <div className="flex justify-center mb-10">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl shadow-md mr-4">
                <svg
                  className="w-8 h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <div className="font-bold text-2xl text-gray-800">Academy</div>
                <div className="text-sm font-medium text-emerald-500">
                  Research Platform
                </div>
              </div>
            </div>
          </div>

          {/* Welcome message with enhanced typography */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-500">Sign in to continue to your account</p>
          </div>

          {/* Google Sign-in Button with improved styling */}
          <button
            onClick={handleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-xl py-4 px-4 text-gray-700 font-medium hover:border-emerald-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 transition-all duration-200 ease-in-out disabled:opacity-60 group"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 text-emerald-500 mr-3"
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
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <svg
                  className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform duration-200"
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
                <span className="font-medium">Sign in with Google</span>
              </div>
            )}
          </button>

          {/* Footer text */}
          <div className="mt-8 text-center text-sm text-gray-500">
            By continuing, you agree to Academy's
            <a
              href="#"
              className="text-emerald-500 hover:text-emerald-600 ml-1"
            >
              Terms of Service
            </a>
            <span className="mx-1">and</span>
            <a href="#" className="text-emerald-500 hover:text-emerald-600">
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="hidden md:block w-1/2 bg-indigo-600 relative overflow-hidden">
          <img src="banner.png"></img>
        </div>
      </div>

      {/* Copyright at the bottom */}
      <div className="absolute bottom-4 left-4 text-xs text-gray-400">
        © 2025 Academy Research
      </div>
    </div>
  );
}
