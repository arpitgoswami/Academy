"use client";

import React, { useState } from "react";
import { MessageSquarePlus, ArrowUpRight, X, Menu } from "lucide-react";

export default function Home() {
  const headerItems = ["Privacy Policy"];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-center text-white flex flex-col" // Removed bg-cover
      style={{
        backgroundImage: "url('/background.png')",
      }}
    >
      <header className="container mx-auto px-6 py-6 sm:px-10 lg:px-20 z-10">
        <div className="flex justify-between items-center">
          <div className="text-3xl font-bold">S</div>

          <nav className="hidden md:flex items-center space-x-8">
            {headerItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-300 hover:text-white transition text-xs hover:underline"
              >
                {item}
              </a>
            ))}

            <a
              href="#"
              className="flex items-center bg-white text-gray-900 px-5 py-2 rounded-md text-xs font-medium hover:bg-gray-200 transition"
            >
              Contact Sales
            </a>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-95 z-50 pt-20 px-6">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-white focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
          <nav className="flex flex-col items-center space-y-6 mt-8">
            {headerItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-300 hover:text-white transition text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="#"
              className="flex items-center bg-white text-gray-900 px-6 py-3 rounded-md text-base font-medium hover:bg-gray-200 transition mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Sales
            </a>
          </nav>
        </div>
      )}

      <main className="flex-grow flex flex-col justify-center items-center container mx-auto px-6 text-center sm:px-10 lg:px-20 z-0">
        <div className="max-w-4xl">
          <div className="inline-flex items-center bg-gray-800 bg-opacity-50 rounded-full px-4 py-1.5 text-xs mb-4">
            <MessageSquarePlus className="w-3 mr-1" />
            Now with AI Meeting Chat
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Meet your AI assistant for research
          </h1>

          <p className="text-sm text-gray-300 mb-8 max-w-xl mx-auto">
            Joins your meetings, takes notes, summarizes outcomes, and turns
            talk into tasks — automatically
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
            <a
              href="#"
              className="text-xs bg-white text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-gray-200 transition w-full sm:w-auto"
            >
              Login
            </a>
            <a
              href="#"
              className="bg-gray-800 text-xs bg-opacity-50 text-white px-8 py-2 rounded-md font-medium hover:bg-opacity-70 transition flex items-center justify-center w-full sm:w-auto"
            >
              <ArrowUpRight className="mr-1 w-4" />
              Get Started
            </a>
          </div>

          <p className="text-xs text-gray-400 font-mono">
            *No credit card needed. All data is secure.
          </p>
        </div>
      </main>

      <footer className="container mx-auto px-6 py-10 sm:px-10 lg:px-20">
        <div className="flex justify-center items-center space-x-8 sm:space-x-12 md:space-x-16 opacity-70 flex-wrap gap-y-4">
          <img
            src="./footer-icons/logoipsum-356.svg"
            alt="Logo Ipsum 1"
            className="h-4 md:h-8 grayscale"
          />
          <img
            src="./footer-icons/logoipsum-360.svg"
            alt="Infinity Logo"
            className="h-4 md:h-8 grayscale"
          />
          <img
            src="./footer-icons/logoipsum-364.svg"
            alt="Logo Ipsum 2"
            className="h-4 md:h-8 grayscale"
          />
          <img
            src="./footer-icons/logoipsum-369.svg"
            alt="Logo Ipsum 3"
            className="h-4 md:h-8 grayscale"
          />
        </div>
      </footer>
    </div>
  );
}
