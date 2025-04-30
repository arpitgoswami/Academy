"use client";

import { signInWithGoogle, useAuth } from "../firebase";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function LoginPage() {
  const user = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Add a small delay for the fade-in effect to be noticeable
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300); // Slightly longer delay for smoother entrance
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100 p-4 relative overflow-hidden">
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 z-50"></div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-50/30 via-transparent to-transparent pointer-events-none"></div>

      <div
        className={`w-full max-w-5xl transition-all duration-700 ease-out transform ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100/50">
          <div className="hidden md:block md:w-1/2 relative overflow-hidden bg-gradient-to-br from-emerald-600 to-green-800">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/90 to-green-800/90 z-10"></div>
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-400 rounded-full opacity-20"></div>
            <div className="absolute -left-20 -top-20 w-96 h-96 bg-green-400 rounded-full opacity-20"></div>

            <div className="relative z-20 flex flex-col justify-center items-center h-full p-12 text-white">
              <div className="mb-8"></div>
              <h2 className="text-3xl font-bold mb-2">Academy Research</h2>
              <p className="text-lg text-green-100 mb-8 text-center">
                Access cutting-edge research tools and collaborate with leading
                experts worldwide.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 w-full">
                <blockquote className="italic text-indigo-100">
                  "Academy has transformed how our team analyzes research data,
                  cutting our workflow time by 50%."
                </blockquote>
                <div className="mt-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-300/30 flex items-center justify-center text-white font-medium">
                    JS
                  </div>
                  <div className="ml-3">
                    <div className="text-white font-medium">Jane Smith</div>
                    <div className="text-xs text-green-200">
                      Research Director, Quantum Labs
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center backdrop-blur-md">
            <div className="flex items-center justify-center md:hidden mb-10">
              <Image
                src="/logo.svg"
                alt="Academy Logo"
                width={180}
                height={40}
                className="transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="mb-12 transform hover:translate-x-1 transition-transform duration-300">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to Academy
              </h1>
              <p className="text-gray-500">
                Sign in to continue to your research workspace
              </p>
            </div>

            <div className="space-y-6">
              <button
                onClick={handleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center bg-white border border-gray-200 rounded-xl py-4 px-4 text-gray-700 font-medium 
                         hover:border-emerald-300 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 
                         transition-all duration-200 ease-in-out disabled:opacity-60 group"
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
                      className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-200"
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
                    <span className="font-medium">Continue with Google</span>
                  </div>
                )}
              </button>
            </div>

            <div className="mt-8 text-center transform hover:scale-105 transition-transform duration-300">
              <p className="text-gray-500">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="text-emerald-600 hover:text-emerald-800 font-medium"
                >
                  Request access
                </a>
              </p>
            </div>

            <div className="mt-8 text-center text-sm text-gray-400 hover:text-gray-600 transition-colors duration-300">
              By continuing, you agree to Academy's{" "}
              <a href="#" className="text-emerald-500 hover:text-emerald-600">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-indigo-500 hover:text-emerald-600">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-white/90 backdrop-blur-sm text-emerald-600 rounded-full p-3.5 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-200 group">
          <svg
            className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </button>
      </div>

      <div className="mt-8 text-center text-xs text-gray-400 hover:text-gray-600 transition-colors duration-300">
        © {new Date().getFullYear()} Academy Research. All rights reserved.
      </div>
    </div>
  );
}
