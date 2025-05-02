import React from "react";
import { MessageSquarePlus, ArrowUpRight, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const DashboardFooter = () => {
  const footerLinks = [
    { name: "Github", href: "https://github.com/arpitgoswami/academy" },
    { name: "Help & Support", href: "/support" },
    { name: "Privacy Policy", href: "/legal/privacy" },
    { name: "Terms of Service", href: "/legal/terms" },
  ];

  return (
    <footer className="py-8 text-center">
      <div className="flex justify-center items-center space-x-4 md:space-x-4 px-8">
        {footerLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-gray-400 text-xs hover:text-white transition-colors duration-300"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex flex-col relative overflow-hidden"
      style={{
        backgroundImage: "url('/background.png')",
      }}
    >
      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-0"></div>

      {/* Animated stars for more dynamic background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 animate-pulse opacity-40">
          <Star className="text-white w-2" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-pulse opacity-30 animation-delay-300">
          <Star className="text-white w-1" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 animate-pulse opacity-50 animation-delay-700">
          <Star className="text-white w-2" />
        </div>
      </div>

      {/* Header */}
      <header className="border-white/10 border-b container mx-auto px-6 py-6 lg:px-20 z-10 relative">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tight cursor-pointer group">
            <span className="flex items-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-white group-hover:to-blue-300 transition-all duration-500">
              <Image
                alt="logo_white"
                height={200}
                width={200}
                src="/logo_white_no_text.svg"
                className="w-8 h-8 mr-2"
              />
              Academy.
            </span>
          </div>

          <nav className="flex items-center space-x-8">
            <Link
              href="/pricing"
              className="hidden md:block text-gray-300 hover:text-white transition text-xs hover:underline"
            >
              Pricing
            </Link>

            <Link
              href="/contact"
              className="flex items-center bg-white text-gray-900 px-5 py-2.5 rounded-md text-xs font-medium hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-white/20 hover:-translate-y-0.5 focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:outline-none"
            >
              Contact Sales
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="h-full  flex-grow py-16 flex flex-col justify-center items-center container mx-auto px-6 text-center lg:px-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Feature pill */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-xs mb-8 hover:bg-white/20 transition-colors duration-300 cursor-pointer transform hover:scale-105">
            <MessageSquarePlus className="w-3 h-3 mr-2" />
            <span>Now with AI Meeting Chat</span>
          </div>

          {/* Main heading with animated gradient */}
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-gradient">
              Meet your AI assistant for research
            </span>
          </h1>

          {/* Description with improved spacing */}
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Joins your meetings, takes notes, summarizes outcomes, and turns
            talk into tasks — automatically
          </p>

          {/* CTA buttons with hover effects */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-10">
            <Link
              href="/login"
              className="w-full sm:w-auto text-sm bg-white text-gray-900 px-10 py-4 rounded-md font-semibold hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-white/20 hover:-translate-y-1 focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:outline-none"
            >
              Login
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto bg-black/30 backdrop-blur-sm border border-white/20 text-sm text-white px-10 py-4 rounded-md font-medium hover:bg-black/50 transition-all duration-300 flex items-center justify-center hover:-translate-y-1 focus:ring-2 focus:ring-white focus:ring-opacity-20 focus:outline-none"
            >
              <ArrowUpRight className="mr-2 w-4 h-4" />
              Get Started
            </Link>
          </div>

          {/* Security note with subtle styling */}
          <p className="text-xs text-gray-400 font-mono mt-2 opacity-80">
            *No credit card needed. All data is secure.
          </p>
        </div>
      </main>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/10 ">
        <DashboardFooter />
      </div>
    </div>
  );
}
