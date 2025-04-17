import React from "react";
import Head from "next/head";
import { BsChatDots, BsArrowUpRight } from "react-icons/bs"; // Using react-icons for icons

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex flex-col"
      style={{ backgroundImage: "url('/background.png')" }} // Set background image
    >
      <Head>
        <title>AI-Assistant for Calls</title>
        <meta
          name="description"
          content="AI Assistant for joining meetings, taking notes, summarizing outcomes, and turning talk into tasks."
        />
        <link rel="icon" href="/favicon.ico" /> {/* Assuming favicon exists */}
      </Head>

      {/* Header */}
      <header className="container mx-auto px-6 py-6 sm:px-10 lg:px-20">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-3xl font-bold">
            S {/* Placeholder for the S logo */}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition text-sm"
            >
              Solutions
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition text-sm"
            >
              Features
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition text-sm"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition text-sm"
            >
              Log in
            </a>
            <a
              href="#"
              className="bg-white text-gray-900 px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition"
            >
              Book a Demo
            </a>
          </nav>

          {/* Mobile menu button (optional, not shown in image but good practice) */}
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              {/* Add burger icon here if needed */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center items-center container mx-auto px-6 text-center sm:px-10 lg:px-20">
        <div className="max-w-3xl">
          {/* AI Meeting Chat Badge */}
          <div className="inline-flex items-center bg-gray-800 bg-opacity-50 rounded-full px-4 py-1.5 text-sm mb-4">
            <BsChatDots className="mr-2" />
            Now with AI Meeting Chat
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-4">
            AI-Assistant <br /> for Calls
          </h1>

          {/* Sub-headline */}
          <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
            Joins your meetings, takes notes, summarizes outcomes, and turns
            talk into tasks — automatically
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
            <a
              href="#"
              className="bg-white text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-gray-200 transition w-full sm:w-auto"
            >
              To try
            </a>
            <a
              href="#"
              className="bg-gray-800 bg-opacity-50 text-white px-8 py-3 rounded-md font-medium hover:bg-opacity-70 transition flex items-center justify-center w-full sm:w-auto"
            >
              <BsArrowUpRight className="mr-2" />
              Leave a request
            </a>
          </div>

          {/* Small Text */}
          <p className="text-xs text-gray-400">
            No credit card needed. All data is secure.
          </p>
        </div>
      </main>

      {/* Logos Section */}
      <footer className="container mx-auto px-6 py-10 sm:px-10 lg:px-20">
        <div className="flex justify-center items-center space-x-8 sm:space-x-12 md:space-x-16 opacity-70 flex-wrap gap-y-4">
          {/* Placeholder Logos */}
          <span className="font-semibold">logo-ipsum</span>
          <span className="text-2xl font-bold">∞</span>
          <span className="font-semibold tracking-widest">LOGOIPSUM</span>
          <span className="font-bold flex items-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-1"
            >
              <path d="M12 0L0 12v12h12l12-12V0H12zm6 18h-6v-6h6v6z"></path>
            </svg>
            Logoipsum
          </span>
        </div>
      </footer>
    </div>
  );
}
