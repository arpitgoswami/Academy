import React from "react";
import { MessageSquarePlus, ArrowUpRight } from "lucide-react";

export default function Home() {
  const headerItems = ["Privacy Policy"];

  return (
    <div
      className="min-h-screen bg-center text-white flex flex-col" // Removed bg-cover
      style={{
        backgroundImage: "url('/background.png')",
      }}
    >
      <header className="container mx-auto px-6 py-6 sm:px-10 lg:px-20 z-10">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">Academy.</div>

          <nav className="flex items-center space-x-8">
            {headerItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="hidden md:block text-gray-300 hover:text-white transition text-xs hover:underline"
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
        </div>
      </header>

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

          <div className="flex justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
            <a
              href="#"
              className="text-xs bg-white text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-gray-200 transition sm:w-auto"
            >
              Login
            </a>
            <a
              href="#"
              className="bg-gray-800 text-xs bg-opacity-50 text-white px-8 py-2 rounded-md font-medium hover:bg-opacity-70 transition flex items-center justify-center sm:w-auto"
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
            className="h-4 md:h-6 grayscale"
          />
          <img
            src="./footer-icons/logoipsum-360.svg"
            alt="Infinity Logo"
            className="h-4 md:h-6 grayscale"
          />
          <img
            src="./footer-icons/logoipsum-364.svg"
            alt="Logo Ipsum 2"
            className="h-4 md:h-6 grayscale"
          />
          <img
            src="./footer-icons/logoipsum-369.svg"
            alt="Logo Ipsum 3"
            className="h-4 md:h-6 grayscale"
          />
        </div>
      </footer>
    </div>
  );
}
