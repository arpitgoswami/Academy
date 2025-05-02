import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8 md:p-12 border border-gray-100">
        <Link
          href="/"
          className="mb-8 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
        </Link>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Terms of Service
          </h1>
        </div>

        <div className="h-1 w-32 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mb-10"></div>

        <div className="space-y-8">
          <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using this website, you accept and agree to be
              bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">
              2. Use License
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Permission is granted to temporarily download one copy of the
              materials (information or software) on Academy's website for
              personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">
              3. Disclaimer
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The materials on Academy's website are provided on an 'as is'
              basis. Academy makes no warranties, expressed or implied, and
              hereby disclaims and negates all other warranties including,
              without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">
              4. Limitations
            </h2>
            <p className="text-gray-700 leading-relaxed">
              In no event shall Academy or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on Academy's website.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">
              5. Revisions and Errata
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The materials appearing on Academy's website could include
              technical, typographical, or photographic errors. Academy does not
              warrant that any of the materials on its website are accurate,
              complete, or current.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">
              6. Links
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Academy has not reviewed all of the sites linked to its website
              and is not responsible for the contents of any such linked site.
              The inclusion of any link does not imply endorsement by Academy of
              the site.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">
              7. Site Terms of Use Modifications
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Academy may revise these terms of use for its website at any time
              without notice. By using this website, you are agreeing to be
              bound by the then current version of these Terms and Conditions of
              Use.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">
              8. Governing Law
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These terms and conditions are governed by and construed in
              accordance with the laws and you irrevocably submit to the
              exclusive jurisdiction of the courts in that location.
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
