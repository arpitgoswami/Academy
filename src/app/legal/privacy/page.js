import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8 md:p-12 border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Privacy Policy
          </h1>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
          </Link>
        </div>

        <div className="h-1 w-32 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mb-10"></div>

        <div className="space-y-8">
          <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed">
              When you visit our website, we may collect certain information
              about your device, your interaction with the website, and
              information necessary to process your purchases. We may also
              collect additional information if you contact us for support.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1.5 text-gray-700 leading-relaxed">
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>
                Develop new products, services, features, and functionality
              </li>
              <li>
                Communicate with you for customer service, updates, and
                marketing purposes
              </li>
            </ul>
          </section>

          <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">
              3. Data Retention
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We retain collected information for as long as necessary to
              provide the services you requested, maintain our legitimate
              business interests, and/or comply with legal requirements.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">
              4. Data Protection
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We implement security measures to maintain the safety of your
              personal information when you enter, submit, or access it.
              However, no method of transmission over the Internet is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">
              5. Cookies
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar tracking technologies to track activity
              on our website and store certain information. You can instruct
              your browser to refuse all cookies or to indicate when a cookie is
              being sent.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">
              6. Third-Party Services
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may employ third-party companies and individuals to facilitate
              our website, provide services on our behalf, perform
              service-related services, or assist us in analyzing how our
              website is used.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">
              7. Children's Privacy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our website is not intended for use by children under the age of
              13, and we do not knowingly collect personal information from
              children under 13.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">
              8. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "last updated" date.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">
              9. Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a
                href="mailto:privacy@academy.com"
                className="text-emerald-600 hover:text-emerald-800 font-medium"
              >
                privacy@academy.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
