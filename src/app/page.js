import React from "react";
import { MessageSquarePlus, ArrowUpRight } from "lucide-react";
import DashboardFooter from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  const headerItems = ["Privacy Policy"];

  return (
    <div
      className="min-h-screen bg-center bg-cover text-white flex flex-col relative overflow-hidden"
      style={{
        backgroundImage: "url('/background.png')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 z-0"></div>
      <header className="container mx-auto px-6 py-6 sm:px-10 lg:px-20 z-10 relative">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tight hover:scale-105 transition-transform cursor-pointer">
            Academy.
          </div>

          <nav className="flex items-center space-x-8">
            {headerItems.map((item, index) => (
              <Link
                key={index}
                href="/privacy-policy"
                className="hidden md:block text-gray-300 hover:text-white transition text-xs hover:underline"
              >
                {item}
              </Link>
            ))}

            <Link
              href="/pricing"
              className="flex items-center bg-white text-gray-900 px-5 py-2.5 rounded-md text-xs font-medium hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-white/20 hover:-translate-y-0.5"
            >
              Contact Sales
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col justify-center items-center container mx-auto px-6 text-center sm:px-10 lg:px-20 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-xs mb-6 hover:bg-white/20 transition-colors duration-300 cursor-pointer">
            <MessageSquarePlus className="w-3 mr-1" />
            Now with AI Meeting Chat
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent animate-gradient">
            Meet your AI assistant for research
          </h1>

          <p className="text-base text-gray-300 mb-10 max-w-xl mx-auto leading-relaxed">
            Joins your meetings, takes notes, summarizes outcomes, and turns
            talk into tasks — automatically
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <Link
              href="/login"
              className="text-xs bg-white text-gray-900 px-8 py-3.5 rounded-md font-semibold hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-white/20 hover:-translate-y-0.5 sm:w-auto"
            >
              Login
            </Link>
            <Link
              href="/dashboard"
              className="bg-black/30 backdrop-blur-sm border border-white/20 text-xs text-white px-8 py-3.5 rounded-md font-medium hover:bg-black/50 transition-all duration-300 flex items-center justify-center sm:w-auto hover:-translate-y-0.5"
            >
              <ArrowUpRight className="mr-1 w-4" />
              Get Started
            </Link>
          </div>

          <p className="text-xs text-gray-400 font-mono mt-2">
            *No credit card needed. All data is secure.
          </p>
        </div>
      </main>

      <div className="relative z-10">
        <DashboardFooter />
      </div>
    </div>
  );
}
