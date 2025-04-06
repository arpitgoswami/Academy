"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCreditCard,
  FaUniversity,
  FaLock,
} from "react-icons/fa";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState("annual");
  const [saveInfo, setSaveInfo] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Head>
        <title>Pricing | Your SaaS</title>
        <meta name="description" content="Choose your plan" />
      </Head>

      {/* Left Panel */}
      <div className="w-full md:w-1/2 bg-teal-900 p-10 text-white">
        <div className="max-w-md mx-auto">
          <Link
            href="/"
            className="inline-flex items-center mb-8 text-white hover:text-teal-200"
          >
            <FaArrowLeft className="mr-2" />
            <span className="font-medium">Your SaaS</span>
          </Link>

          <h2 className="text-2xl font-medium mb-6">
            Subscribe to Your SaaS Pro
          </h2>

          <div className="mb-10">
            <div className="text-4xl font-bold">
              ${billingCycle === "annual" ? "16.67" : "20.00"}
              <span className="text-sm font-normal ml-1">
                per {billingCycle === "annual" ? "month" : "month"}
              </span>
            </div>
          </div>

          <div className="bg-teal-800/50 rounded-lg p-6 mb-8">
            <div className="flex justify-between mb-2">
              <h3 className="font-bold text-xl">Your SaaS Pro</h3>
              <span className="font-bold">
                ${billingCycle === "annual" ? "16.67" : "20.00"}
              </span>
            </div>
            <p className="text-teal-100 mb-4 text-sm">
              Your SaaS Pro offers unlimited Pro Search, upgraded AI models,
              unlimited file upload, and dedicated support.
            </p>
            <p className="text-teal-200 text-sm">
              Billed {billingCycle === "annual" ? "annually" : "monthly"}
            </p>
          </div>

          <div className="p-4 border border-teal-700 rounded-lg mb-8">
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <div
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer ${
                    billingCycle === "annual" ? "bg-teal-500" : "bg-gray-700"
                  }`}
                  onClick={() =>
                    setBillingCycle(
                      billingCycle === "annual" ? "monthly" : "annual"
                    )
                  }
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full transform transition-transform ${
                      billingCycle === "annual" ? "translate-x-6" : ""
                    }`}
                  />
                </div>
              </label>
              <div className="flex-1 ml-4">
                <span className="px-2 py-1 bg-teal-700 text-xs rounded-md">
                  Save $40
                </span>
                <span className="ml-2 text-sm">with annual billing</span>
              </div>
              <div className="text-right">
                <span>
                  ${billingCycle === "annual" ? "16.67" : "20.00"}/month
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-teal-700 py-4 flex justify-between">
            <span>Subtotal</span>
            <span>${billingCycle === "annual" ? "200.00" : "20.00"}</span>
          </div>

          <button className="w-full text-left py-2 px-4 bg-teal-800 hover:bg-teal-700 rounded-md transition my-4">
            Add promotion code
          </button>

          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <span>Tax</span>
              <span className="ml-1 text-teal-300 text-sm">ⓘ</span>
            </div>
            <span>$0.00</span>
          </div>

          <div className="border-t border-teal-700 py-4 flex justify-between font-medium">
            <span>Total due today</span>
            <span>${billingCycle === "annual" ? "200.00" : "20.00"}</span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden md:block md:w-1/2 p-10">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-medium mb-6">Contact information</h2>

          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          <h2 className="text-xl font-medium mb-6">Payment method</h2>

          <div className="mb-6 space-y-4">
            <label className="flex items-center p-4 border border-gray-300 rounded-md cursor-pointer">
              <input
                type="radio"
                name="payment"
                className="mr-3"
                defaultChecked
              />
              <FaCreditCard className="mr-3 text-gray-700" />
              <span className="flex-grow">Card</span>
              <div className="flex space-x-1">
                <span className="w-8 h-5 bg-blue-600 rounded"></span>
                <span className="w-8 h-5 bg-red-500 rounded"></span>
                <span className="w-8 h-5 bg-blue-400 rounded"></span>
                <span className="w-8 h-5 bg-yellow-400 rounded"></span>
              </div>
            </label>

            <label className="flex items-center p-4 border border-gray-300 rounded-md cursor-pointer">
              <input type="radio" name="payment" className="mr-3" />
              <FaUniversity className="mr-3 text-gray-700" />
              <span>US bank account</span>
            </label>
          </div>

          <div className="mb-8">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={saveInfo}
                onChange={() => setSaveInfo(!saveInfo)}
                className="mt-1 mr-3"
              />
              <div>
                <div className="flex items-center">
                  <FaLock className="text-gray-500 mr-2" size={12} />
                  <span className="font-medium">
                    Securely save my information for 1-click checkout
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Pay faster on Your SaaS AI, Inc and everywhere Link is
                  accepted.
                </p>
              </div>
            </label>
          </div>

          <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-md font-medium transition">
            Subscribe
          </button>

          <p className="text-sm text-gray-500 mt-6">
            By confirming your subscription, you allow Your SaaS AI, Inc to
            charge you for future payments in accordance with their terms. You
            can always cancel your subscription.
          </p>

          <p className="text-sm text-gray-500 mt-4">
            By placing your order, you agree to our
            <Link
              href="/terms"
              className="text-teal-600 hover:text-teal-700 ml-1"
            >
              Terms of Service
            </Link>{" "}
            and
            <Link
              href="/privacy"
              className="text-teal-600 hover:text-teal-700 ml-1"
            >
              Privacy Policy
            </Link>
            .
          </p>

          <div className="mt-8 flex justify-between items-center border-t border-gray-200 pt-6 text-sm text-gray-500">
            <div>Powered by Stripe</div>
            <div className="flex space-x-4">
              <Link href="/legal" className="hover:text-gray-700">
                Legal
              </Link>
              <Link href="/returns" className="hover:text-gray-700">
                Returns
              </Link>
              <Link href="/contact" className="hover:text-gray-700">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
