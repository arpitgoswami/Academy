import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const faqs = [
  {
    question: "How do I get started with Academy?",
    answer:
      "To get started, simply sign up using your Google account. Once logged in, you'll have access to our AI research assistant and can begin exploring our features.",
  },
  {
    question: "What kind of support does Academy offer?",
    answer:
      "We offer 24/7 email support, detailed documentation, video tutorials, and live chat support for Enterprise customers. Our team is here to help you make the most of Academy.",
  },
  {
    question: "Is my research data secure?",
    answer:
      "Yes, we take data security seriously. All data is encrypted in transit and at rest. We follow industry best practices and comply with data protection regulations.",
  },
  {
    question: "Can I collaborate with my team?",
    answer:
      "Yes, Academy offers powerful collaboration features. You can share research spaces, invite team members, and work together in real-time.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "Academy supports a wide range of file formats including PDF, DOCX, TXT, and various scientific data formats. We're constantly adding support for new formats.",
  },
  {
    question: "How does the AI assistant work?",
    answer:
      "Our AI assistant uses advanced natural language processing to understand your research context, take meeting notes, and help organize your findings. It learns from your interactions to provide more relevant assistance over time.",
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-5xl mx-auto">
        {/* Back button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
          </Link>
        </div>

        {/* Hero section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How can we help?
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions or reach out to our support team
          </p>
        </div>

        {/* Support channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Email Support */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mb-6 shadow-md">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Email Support
            </h3>
            <p className="text-gray-600 mb-5">
              Get help from our dedicated support team within 24 hours
            </p>
            <a
              href="mailto:skillyatra@zohomail.in"
              className="text-emerald-600 hover:text-emerald-800 font-medium inline-flex items-center transition-colors duration-200"
            >
              skillyatra@zohomail.in
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1"
              >
                <path
                  d="M5 10H15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 5L15 10L10 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Documentation */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mb-6 shadow-md">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Documentation
            </h3>
            <p className="text-gray-600 mb-5">
              Browse our comprehensive documentation and guides
            </p>
            <Link
              href="/support"
              className="text-emerald-600 hover:text-emerald-800 font-medium inline-flex items-center transition-colors duration-200"
            >
              View Documentation
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1"
              >
                <path
                  d="M5 10H15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 5L15 10L10 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          {/* Video Tutorials */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mb-6 shadow-md">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Video Tutorials
            </h3>
            <p className="text-gray-600 mb-5">
              Learn through our step-by-step video tutorials
            </p>
            <Link
              href="#"
              className="text-emerald-600 hover:text-emerald-800 font-medium inline-flex items-center transition-colors duration-200"
            >
              Watch Tutorials
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1"
              >
                <path
                  d="M5 10H15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 5L15 10L10 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100 mb-12">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center mr-4 shadow-md">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6 md:space-y-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Sales CTA */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 md:p-10 shadow-2xl text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need specialized support for your organization?
          </h3>
          <p className="text-emerald-50 mb-8 text-lg max-w-2xl mx-auto">
            Our sales team can help you find the perfect solution for your
            research needs and provide personalized onboarding.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white text-base font-medium rounded-xl text-white bg-transparent hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-emerald-500 transition-all duration-200"
            >
              Contact Sales
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-xl text-emerald-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-emerald-500 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" /> Return Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
