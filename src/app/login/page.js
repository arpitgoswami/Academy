"use client";

import { signInWithGoogle, useAuth } from "../firebase";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 p-4 relative overflow-hidden">
      {/* Top gradient bar */}
      <div className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 z-50"></div>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-emerald-100/30 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-teal-100/30 to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

      <div
        className={`w-full my-8 max-w-5xl transition-all duration-700 ease-out transform ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
          {/* Left side (decorative & informational) */}
          <div className="hidden md:block md:w-1/2 relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700">
            {/* Decorative elements */}
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-400/30 rounded-full"></div>
            <div className="absolute left-1/4 top-1/4 w-32 h-32 bg-white/10 rounded-full blur-md"></div>
            <div className="absolute right-1/4 top-2/3 w-24 h-24 bg-white/10 rounded-full blur-md"></div>

            {/* Animated gradient background - subtle pulse */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/90 to-teal-700/90 z-0 animate-subtle-pulse"></div>

            <div className="relative z-20 flex flex-col justify-center items-center h-full px-12 py-16 text-white">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-8">
                <svg
                  className="w-12 h-12 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>

              <h2 className="text-3xl font-bold mb-3 tracking-tight">
                Academy Research
              </h2>
              <p className="text-lg text-emerald-100 mb-10 text-center max-w-md">
                Access cutting-edge research tools and collaborate with leading
                experts worldwide.
              </p>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full border border-white/20 transform transition-transform hover:scale-105 duration-300">
                <blockquote className="italic text-emerald-50 text-lg">
                  "Academy has transformed how our team analyzes research data,
                  cutting our workflow time by 50%."
                </blockquote>
                <div className="mt-6 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/30 flex items-center justify-center text-white font-medium border-2 border-emerald-200/30">
                    JS
                  </div>
                  <div className="ml-4">
                    <div className="text-white font-medium">Jane Smith</div>
                    <div className="text-sm text-emerald-200">
                      Research Director, Quantum Labs
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side (login form) */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center backdrop-blur-md">
            <div className="flex items-center justify-center md:justify-start mb-12">
              <div className="relative h-10 w-44">
                <Image
                  src="/logo.svg"
                  alt="Academy Logo"
                  layout="fill"
                  objectFit="contain"
                  className="transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
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
                         hover:border-emerald-300 hover:bg-gray-50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 
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

            <div className="mt-8 text-center">
              <p className="text-gray-500">
                Don't have an account?{" "}
                <a
                  href="/contact"
                  className="text-emerald-600 hover:text-emerald-800 font-medium transition-colors duration-200"
                >
                  Contact Sales
                </a>
              </p>
            </div>

            <div className="mt-8 text-center text-sm text-gray-400 hover:text-gray-600 transition-colors duration-300">
              By continuing, you agree to Academy's{" "}
              <Link
                href="/legal/terms"
                className="text-emerald-500 hover:text-emerald-600 transition-colors duration-200"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/legal/privacy"
                className="text-emerald-500 hover:text-emerald-600 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Help button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="/support"
          className="inline-block bg-white/90 backdrop-blur-sm text-emerald-600 rounded-full p-3.5 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-200 group"
        >
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
        </Link>
      </div>

      {/* Footer */}
      <div className="fixed bottom-4 left-0 right-0 text-center text-xs text-gray-400 hover:text-gray-600 transition-colors duration-300">
        &copy; {new Date().getFullYear()} Academy Research. All rights reserved.
      </div>

      {/* CSS for animation and grid pattern */}
      <style jsx>{`
        @keyframes subtle-pulse {
          0%,
          100% {
            opacity: 0.9;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-subtle-pulse {
          animation: subtle-pulse 8s infinite;
        }
        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(0, 128, 128, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(0, 128, 128, 0.05) 1px,
              transparent 1px
            );
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}
