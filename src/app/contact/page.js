"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        {!submitted ? (
          <>
            <div className="md:text-center mb-10">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                Contact Our Sales Team
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Let's discuss how Academy can help transform your research
                workflow
              </p>
            </div>

            <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-10 border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-800 mb-2"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full px-4 py-3.5 bg-gray-50 border-0 text-gray-900 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white shadow-sm transition-all duration-200 text-base"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-800 mb-2"
                    >
                      Work Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full px-4 py-3.5 bg-gray-50 border-0 text-gray-900 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white shadow-sm transition-all duration-200 text-base"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Company Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="company"
                      id="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className="block w-full px-4 py-3.5 bg-gray-50 border-0 text-gray-900 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white shadow-sm transition-all duration-200 text-base"
                      placeholder="Your Company Ltd."
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    How can we help?
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="block w-full px-4 py-3.5 bg-gray-50 border-0 text-gray-900 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white shadow-sm transition-all duration-200 text-base resize-none"
                      placeholder="Tell us about your needs and how we can assist you..."
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
                  <Link
                    href="/"
                    className="flex items-center justify-center py-3.5 px-6 border border-gray-300 rounded-xl shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
                  >
                    <ArrowLeft className="h-5 w-5 mr-2" /> Go Back
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-grow flex justify-center py-3.5 px-6 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="text-center bg-white shadow-2xl rounded-3xl p-12 border border-gray-100">
            <div className="mb-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Thanks for reaching out!
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              We'll get back to you within 24 hours.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" /> Return Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
