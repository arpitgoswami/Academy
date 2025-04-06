"use client";

// pages/index.js
import Head from "next/head";
import { useState } from "react";
import {
  FaRocket,
  FaCheck,
  FaStar,
  FaUsers,
  FaShieldAlt,
  FaCommentDots,
  FaArrowRight,
  FaBars,
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Head>
        <title>SaaSify - Modern SaaS Solution</title>
        <meta
          name="description"
          content="Transform your business with our modern SaaS platform"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header/Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <FaRocket className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">
                SaaSify
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-10">
              <a
                href="#features"
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Pricing
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Contact
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <a
                href="#"
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Log in
              </a>
              <a
                href="#"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Sign up
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-gray-700 hover:text-indigo-600 focus:outline-none"
                onClick={toggleMenu}
              >
                {isMenuOpen ? (
                  <FaTimes className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col space-y-4">
                <a
                  href="#features"
                  className="text-gray-700 hover:text-indigo-600 transition"
                  onClick={toggleMenu}
                >
                  Features
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-700 hover:text-indigo-600 transition"
                  onClick={toggleMenu}
                >
                  Testimonials
                </a>
                <a
                  href="#pricing"
                  className="text-gray-700 hover:text-indigo-600 transition"
                  onClick={toggleMenu}
                >
                  Pricing
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-indigo-600 transition"
                  onClick={toggleMenu}
                >
                  Contact
                </a>
                <div className="pt-4 border-t border-gray-200">
                  <a
                    href="#"
                    className="block text-gray-700 hover:text-indigo-600 transition"
                  >
                    Log in
                  </a>
                  <a
                    href="#"
                    className="mt-4 block bg-indigo-600 text-white px-4 py-2 rounded-md text-center hover:bg-indigo-700 transition"
                  >
                    Sign up
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-16 pb-24 sm:pt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                <span className="block">Transform Your Business</span>
                <span className="block text-indigo-600">
                  With Our SaaS Solution
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
                Everything you need to scale your business, automate workflows,
                and delight your customers in one powerful platform.
              </p>
              <div className="mt-10 flex justify-center">
                <a
                  href="#"
                  className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 transition flex items-center"
                >
                  Get Started <FaArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="ml-4 text-indigo-600 border border-indigo-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-50 transition"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="mt-16 max-w-4xl mx-auto">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 rounded-xl bg-gray-200 shadow-xl overflow-hidden">
                  <img
                    src="/api/placeholder/1200/675"
                    alt="Dashboard preview"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-indigo-500 rounded-full opacity-30 -z-10"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-indigo-500 rounded-full opacity-20 -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 font-medium mb-8">
              Trusted by innovative companies worldwide
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex justify-center">
                  <div className="h-8 w-32 bg-gray-300 rounded-md"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                All-in-One Solution for Your Business
              </h2>
              <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                Our platform offers everything you need to streamline operations
                and accelerate growth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {[
                {
                  icon: <FaUsers className="h-10 w-10 text-indigo-600" />,
                  title: "Team Collaboration",
                  description:
                    "Work seamlessly with your team through intuitive collaboration tools.",
                },
                {
                  icon: <FaShieldAlt className="h-10 w-10 text-indigo-600" />,
                  title: "Enterprise Security",
                  description:
                    "Bank-level security to keep your data safe and compliant with regulations.",
                },
                {
                  icon: <FaCommentDots className="h-10 w-10 text-indigo-600" />,
                  title: "Customer Engagement",
                  description:
                    "Engage with your customers through multiple channels in one place.",
                },
                {
                  icon: <FaStar className="h-10 w-10 text-indigo-600" />,
                  title: "Analytics & Insights",
                  description:
                    "Make data-driven decisions with our powerful analytics dashboard.",
                },
                {
                  icon: <FaCheck className="h-10 w-10 text-indigo-600" />,
                  title: "Task Automation",
                  description:
                    "Automate repetitive tasks and focus on what matters most.",
                },
                {
                  icon: <FaRocket className="h-10 w-10 text-indigo-600" />,
                  title: "Scalable Infrastructure",
                  description:
                    "Our platform grows with your business, from startup to enterprise.",
                },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-start">
                  <div className="rounded-md bg-indigo-100 p-3 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500">{feature.description}</p>
                  <a
                    href="#"
                    className="mt-4 flex items-center text-indigo-600 font-medium hover:text-indigo-700"
                  >
                    Learn more <FaArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-indigo-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                What Our Customers Say
              </h2>
              <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                Don't just take our word for it. Hear from some of our satisfied
                customers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  position: "CEO, TechStart Inc.",
                  content:
                    "SaaSify has completely transformed how we operate. The productivity gains are incredible, and the customer support is top-notch.",
                },
                {
                  name: "Michael Chen",
                  position: "Marketing Director, GrowthLabs",
                  content:
                    "The analytics capabilities alone are worth the investment. We've gained insights that have directly contributed to our 40% YoY growth.",
                },
                {
                  name: "Jessica Williams",
                  position: "Operations Manager, EcoSolutions",
                  content:
                    "I was skeptical at first, but the ease of implementation and the intuitive interface won our entire team over within days.",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-8 relative"
                >
                  <div className="absolute -top-4 left-8">
                    <div className="bg-indigo-600 rounded-full p-2">
                      <FaStar className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 mb-6 mt-4">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-bold text-xl">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700">{testimonial.content}</p>
                  <div className="mt-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Simple, Transparent Pricing
              </h2>
              <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                Choose the plan that's right for your business. All plans
                include a 14-day free trial.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Starter",
                  price: "$49",
                  features: [
                    "Up to 5 users",
                    "20GB storage",
                    "Basic analytics",
                    "Email support",
                    "2 projects",
                  ],
                  cta: "Get Started",
                  highlighted: false,
                },
                {
                  name: "Professional",
                  price: "$99",
                  features: [
                    "Up to 20 users",
                    "100GB storage",
                    "Advanced analytics",
                    "Priority support",
                    "Unlimited projects",
                    "API access",
                  ],
                  cta: "Get Started",
                  highlighted: true,
                },
                {
                  name: "Enterprise",
                  price: "$249",
                  features: [
                    "Unlimited users",
                    "1TB storage",
                    "Custom analytics",
                    "24/7 support",
                    "Unlimited projects",
                    "API access",
                    "Custom integrations",
                  ],
                  cta: "Contact Sales",
                  highlighted: false,
                },
              ].map((plan, index) => (
                <div
                  key={index}
                  className={`rounded-lg shadow-lg overflow-hidden ${
                    plan.highlighted ? "ring-2 ring-indigo-600 scale-105" : ""
                  }`}
                >
                  <div className="p-6 bg-white">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {plan.name}
                    </h3>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-4xl font-extrabold text-gray-900">
                        {plan.price}
                      </span>
                      <span className="ml-1 text-xl text-gray-500">/month</span>
                    </div>
                    <ul className="mt-6 space-y-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <FaCheck className="h-5 w-5 text-indigo-600 flex-shrink-0 mr-2 mt-0.5" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 bg-gray-50 border-t border-gray-100">
                    <a
                      href="#"
                      className={`w-full flex items-center justify-center px-5 py-3 border border-transparent rounded-md shadow ${
                        plan.highlighted
                          ? "bg-indigo-600 text-white hover:bg-indigo-700"
                          : "bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-50"
                      } transition`}
                    >
                      {plan.cta}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-indigo-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Ready to transform your business?
              </h2>
              <p className="mt-4 text-xl text-indigo-100">
                Join thousands of businesses that are already growing with
                SaaSify.
              </p>
              <div className="mt-10">
                <a
                  href="#"
                  className="px-8 py-3 bg-white text-indigo-700 font-medium rounded-md hover:bg-indigo-50 transition inline-flex items-center"
                >
                  Start Your Free Trial{" "}
                  <FaArrowRight className="ml-2 h-5 w-5" />
                </a>
                <p className="mt-3 text-indigo-100">No credit card required</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900">
                    Get in touch
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    Have questions? We're here to help. Fill out the form or
                    contact us directly.
                  </p>

                  <div className="mt-8 space-y-6">
                    <div className="flex items-start">
                      <FaEnvelope className="h-6 w-6 text-indigo-600 mt-1 mr-4" />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Email
                        </h3>
                        <p className="mt-1 text-gray-500">info@saasify.com</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FaPhone className="h-6 w-6 text-indigo-600 mt-1 mr-4" />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Phone
                        </h3>
                        <p className="mt-1 text-gray-500">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FaMapMarkerAlt className="h-6 w-6 text-indigo-600 mt-1 mr-4" />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Office
                        </h3>
                        <p className="mt-1 text-gray-500">
                          123 Innovation Way
                          <br />
                          San Francisco, CA 94103
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-lg font-medium text-gray-900">
                      Follow us
                    </h3>
                    <div className="mt-4 flex space-x-6">
                      <a
                        href="#"
                        className="text-gray-400 hover:text-indigo-600"
                      >
                        <FaFacebook className="h-6 w-6" />
                      </a>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-indigo-600"
                      >
                        <FaTwitter className="h-6 w-6" />
                      </a>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-indigo-600"
                      >
                        <FaInstagram className="h-6 w-6" />
                      </a>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-indigo-600"
                      >
                        <FaLinkedin className="h-6 w-6" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8">
                  <form>
                    <div className="mb-6">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="John Smith"
                      />
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Your message..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-indigo-600 text-white px-4 py-3 rounded-md font-medium hover:bg-indigo-700 transition"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <FaRocket className="h-8 w-8 text-indigo-400" />
                <span className="ml-2 text-2xl font-bold">SaaSify</span>
              </div>
              <p className="mt-4 text-gray-400">
                Empowering businesses worldwide with innovative SaaS solutions
                since 2023.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Release Notes
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    GDPR
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2025 SaaSify, Inc. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
