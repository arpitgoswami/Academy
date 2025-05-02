"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import {
  ArrowLeft,
  Check,
  Copy,
  Mail,
  Info,
  CreditCard,
  AlertCircle,
  RefreshCw,
  Shield,
} from "lucide-react";

export default function PaymentPage() {
  const [email, setEmail] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [copied, setCopied] = useState(false);

  const upiId = "syiedelta@oksbi";
  const amount = "249";

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    "Unlimited Pro Search",
    "Upgraded AI models",
    "Unlimited file upload",
    "Dedicated support",
    "Priority response time",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Payment | Your SaaS Pro</title>
        <meta name="description" content="Complete your payment" />
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-gradient-to-br from-teal-700 to-teal-900 p-8 text-white">
              <div className="max-w-md mx-auto flex flex-col items-center">
                <div className="text-2xl mb-4 font-bold tracking-tight cursor-pointer group">
                  <span className="flex items-center ">
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

                <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#52525b] via-[#a1a1aa] to-[#e4e4e7] p-4 rounded-lg shadow-lg mb-6 w-64 h-64 flex items-center justify-center">
                  <div className="relative w-56 h-56 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                    <Image
                      height={200}
                      width={200}
                      alt="qr_code"
                      src="/download.png"
                      className="text-teal-900"
                    />
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 w-full mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white/80">Amount:</span>
                    <span className="text-xl font-bold">₹{amount}</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/80">UPI ID:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{upiId}</span>
                      <button
                        onClick={() => handleCopy(upiId)}
                        className="text-teal-200 hover:text-white"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(upiId)}
                    className="w-full mt-2 bg-white text-teal-800 py-3 rounded-lg font-medium hover:bg-teal-50 transition flex items-center justify-center"
                  >
                    <Copy size={16} className="mr-2" />
                    Copy UPI ID
                  </button>
                </div>

                <div className="space-y-3 w-full">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check
                        size={16}
                        className="mr-2 text-teal-300 mt-1 flex-shrink-0"
                      />
                      <p className="text-teal-100 text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-8">
              <div className="max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">
                  Complete your payment
                </h2>

                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex">
                    <Info
                      size={20}
                      className="text-blue-500 mr-3 flex-shrink-0 mt-1"
                    />
                    <div>
                      <h3 className="font-medium text-blue-800">How to pay</h3>
                      <ol className="mt-2 text-sm text-blue-700 space-y-2">
                        <li>1. Scan the QR code with any UPI app.</li>
                        <li>2. Pay ₹{amount} to complete your purchase</li>
                        <li>3. Enter the payment reference ID below</li>
                        <li>
                          4. Click 'Verify Payment' to activate your
                          subscription
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full border border-gray-300 rounded-lg pl-10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    UPI Reference ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CreditCard size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={referenceId}
                      onChange={(e) => setReferenceId(e.target.value)}
                      placeholder="e.g. 123456789012"
                      className="w-full border border-gray-300 rounded-lg pl-10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    You'll receive this after completing your payment
                  </p>
                </div>

                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition shadow-md flex items-center justify-center">
                  <RefreshCw size={16} className="mr-2" />
                  Verify Payment
                </button>

                <Link
                  href="/"
                  className="w-full mt-4 flex items-center justify-center py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  <ArrowLeft className="mr-2" size={16} />
                  <span>Back to Home</span>
                </Link>

                <div className="mt-8 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start">
                    <AlertCircle
                      size={20}
                      className="text-gray-400 mr-3 flex-shrink-0 mt-1"
                    />
                    <div className="text-sm text-gray-600">
                      <p className="font-medium text-gray-700 mb-1">
                        Having trouble with payment?
                      </p>
                      <p>
                        If you're facing any issues, please contact our support
                        team at{" "}
                        <a
                          href="mailto:skillyatra@zohomail.in"
                          className="text-teal-600 hover:text-teal-800"
                        >
                          skillyatra@zohomail.in
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center text-center justify-center text-sm text-gray-500">
                  <Shield size={16} className="mr-2 text-gray-400" />
                  Powered by UPI | Secure Payment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
