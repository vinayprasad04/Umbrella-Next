import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const TermsOfService = () => {
  return (
    <>
      <Head>
        <title>Terms of Service - Umbrella</title>
        <meta name="description" content="Umbrella Terms of Service - Agreement for using our financial planning platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />
        
        <div className="min-h-screen bg-gray-50 py-20">
          <div className="w-full max-w-[1600px] mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <div className="flex items-center space-x-2 text-sm">
                <Link href="/" className="text-gray-500 hover:text-[#FF6B2C]">
                  Home
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-[#FF6B2C] font-medium">Terms of Service</span>
              </div>
            </nav>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#7e685e] to-[#724530] px-8 py-12">
                <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
                <p className="text-orange-100 mt-2">Last updated: August 10, 2025</p>
              </div>

              {/* Content */}
              <div className="p-8 prose max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
                  <p className="text-gray-700 mb-4">
                    By accessing and using Umbrella ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Use License</h2>
                  <p className="text-gray-700 mb-4">
                    Permission is granted to temporarily access Umbrella for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to reverse engineer any software contained on the website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Financial Disclaimer</h2>
                  <p className="text-gray-700 mb-4">
                    Umbrella provides financial planning tools and educational content. However:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4">
                    <li>We are not a registered investment advisor or financial planner</li>
                    <li>Our tools and content are for informational purposes only</li>
                    <li>You should consult with qualified financial professionals before making investment decisions</li>
                    <li>Past performance does not guarantee future results</li>
                    <li>All investments carry risk, including potential loss of principal</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">User Accounts</h2>
                  <p className="text-gray-700 mb-4">
                    When you create an account with us, you must provide accurate, complete, and up-to-date information. You are responsible for:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Safeguarding your password and account credentials</li>
                    <li>All activities that occur under your account</li>
                    <li>Notifying us immediately of any unauthorized use of your account</li>
                    <li>Providing accurate financial information for planning purposes</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Prohibited Uses</h2>
                  <p className="text-gray-700 mb-4">You may not use our service:</p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>For any unlawful purpose or to solicit others to unlawful acts</li>
                    <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                    <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                    <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                    <li>To submit false or misleading information</li>
                    <li>To interfere with or circumvent the security features of the service</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
                  <p className="text-gray-700 mb-4">
                    In no event shall Umbrella, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, punitive, consequential, or special damages, including lost profits, arising from your use of the service.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Accuracy of Materials</h2>
                  <p className="text-gray-700">
                    The materials appearing on Umbrella could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials contained on its website at any time without notice.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifications</h2>
                  <p className="text-gray-700">
                    Umbrella may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
                  <p className="text-gray-700">
                    These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                  <p className="text-gray-700 mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 mb-2"><strong>Email:</strong> legal@umbrella.com</p>
                    <p className="text-gray-700 mb-2"><strong>Address:</strong> Umbrella Financial Services, Mumbai, India</p>
                    <p className="text-gray-700"><strong>Phone:</strong> +91 XXXXX XXXXX</p>
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