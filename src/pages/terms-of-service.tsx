import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const TermsOfService = () => {
  return (
    <>
      <Head>
        <title>Terms of Service - IncomeGrow</title>
        <meta name="description" content="IncomeGrow Terms of Service - Agreement for using our financial planning platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header />
        
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 md:py-12 lg:py-16 xl:py-20">
          <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 py-8">
            {/* Breadcrumb */}
            <nav className="mb-4 md:mb-6">
              <div className="flex items-center space-x-2 text-xs md:text-sm">
                <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-[#FF6B2C]">
                  Home
                </Link>
                <span className="text-gray-400 dark:text-gray-500">/</span>
                <span className="text-[#FF6B2C] font-medium">Terms of Service</span>
              </div>
            </nav>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#7e685e] to-[#724530] px-4 md:px-6 py-8 md:py-12">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">Terms of Service</h1>
                <p className="text-orange-100 mt-2 text-xs md:text-sm">Last updated: August 10, 2025</p>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6 lg:p-8 prose max-w-none">
                <section className="mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-4">Agreement to Terms</h2>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3 md:mb-4">
                    By accessing and using IncomeGrow (&quot;Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </section>

                <section className="mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-4">Use License</h2>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3 md:mb-4">
                    Permission is granted to temporarily access IncomeGrow for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc pl-6 text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3 md:mb-4 space-y-1 md:space-y-2">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to reverse engineer any software contained on the website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </section>

                <section className="mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-4">Financial Disclaimer</h2>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3 md:mb-4">
                    IncomeGrow provides financial planning tools and educational content. However:
                  </p>
                  <ul className="list-disc pl-6 text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3 md:mb-4 space-y-1 md:space-y-2">
                    <li>We are not a registered investment advisor or financial planner</li>
                    <li>Our tools and content are for informational purposes only</li>
                    <li>You should consult with qualified financial professionals before making investment decisions</li>
                    <li>Past performance does not guarantee future results</li>
                    <li>All investments carry risk, including potential loss of principal</li>
                  </ul>
                </section>

                <section className="mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-4">User Accounts</h2>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3 md:mb-4">
                    When you create an account with us, you must provide accurate, complete, and up-to-date information. You are responsible for:
                  </p>
                  <ul className="list-disc pl-6 text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-1 md:space-y-2">
                    <li>Safeguarding your password and account credentials</li>
                    <li>All activities that occur under your account</li>
                    <li>Notifying us immediately of any unauthorized use of your account</li>
                    <li>Providing accurate financial information for planning purposes</li>
                  </ul>
                </section>

                <section className="mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-4">Prohibited Uses</h2>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3 md:mb-4">You may not use our service:</p>
                  <ul className="list-disc pl-6 text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-1 md:space-y-2">
                    <li>For any unlawful purpose or to solicit others to unlawful acts</li>
                    <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                    <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                    <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                    <li>To submit false or misleading information</li>
                    <li>To interfere with or circumvent the security features of the service</li>
                  </ul>
                </section>

                <section className="mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-4">Limitation of Liability</h2>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3 md:mb-4">
                    In no event shall IncomeGrow, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, punitive, consequential, or special damages, including lost profits, arising from your use of the service.
                  </p>
                </section>

                <section className="mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-4">Accuracy of Materials</h2>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    The materials appearing on IncomeGrow could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials contained on its website at any time without notice.
                  </p>
                </section>

                <section className="mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-4">Modifications</h2>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    IncomeGrow may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                  </p>
                </section>

                <section className="mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-4">Commercial Use and Profit Sharing</h2>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 transition-colors duration-300 rounded-lg p-4 md:p-5 lg:p-6 mb-4 md:mb-5 lg:mb-6">
                    <h3 className="text-base md:text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2 md:mb-3">⚠️ Important Commercial Use Terms</h3>
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3 md:mb-4">
                      If you use our platform, tools, methodologies, or any part of our intellectual property for commercial purposes or to generate profits:
                    </p>
                    <ul className="list-disc pl-6 text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3 md:mb-4 space-y-1 md:space-y-2">
                      <li><strong>Profit Sharing Requirement:</strong> You must provide IncomeGrow with 50% of all profits generated from the use of our platform or intellectual property</li>
                      <li><strong>Non-Profit Commercial Use:</strong> If you use our platform commercially but do not generate profits, you must provide IncomeGrow with 5% equity value annually</li>
                      <li><strong>Reporting Obligation:</strong> You must provide quarterly financial reports documenting all revenue and profits generated</li>
                      <li><strong>Prior Written Consent:</strong> Commercial use requires explicit written permission from IncomeGrow</li>
                    </ul>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      <strong>Note:</strong> Personal, non-commercial use of our platform is not subject to these profit-sharing requirements.
                    </p>
                  </div>

                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 md:mb-3">Commercial Use Definition</h3>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3 md:mb-4">Commercial use includes but is not limited to:</p>
                  <ul className="list-disc pl-6 text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3 md:mb-4 space-y-1 md:space-y-2">
                    <li>Using our tools or methodologies to provide financial services to clients</li>
                    <li>Incorporating our platform into a business or commercial venture</li>
                    <li>Monetizing content, tools, or strategies derived from our platform</li>
                    <li>White-labeling or reselling our services</li>
                    <li>Using our platform to generate revenue in any form</li>
                  </ul>

                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 md:mb-3">Enforcement</h3>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3 md:mb-4">
                    Violation of these commercial use terms may result in immediate termination of your account and legal action to recover damages and enforce profit-sharing obligations.
                  </p>
                </section>

                <section className="mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-4">Governing Law</h2>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                  </p>
                </section>

                <section className="mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-4">Contact Information</h2>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3 md:mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-5 lg:p-6 rounded-lg">
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-2"><strong>Email:</strong> vinay.qss@gmail.com</p>
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-2"><strong>Address:</strong> IncomeGrow Financial Services, Krishan Vihar Delhi, India</p>
                    {/* <p className="text-gray-700 dark:text-gray-300"><strong>Phone:</strong> +91 XXXXX XXXXX</p> */}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default TermsOfService;