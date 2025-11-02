import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - IncomeGrow</title>
        <meta name="description" content="IncomeGrow Privacy Policy - How we collect, use, and protect your information" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
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
                <span className="text-[#FF6B2C] font-medium">Privacy Policy</span>
              </div>
            </nav>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#7e685e] to-[#724530] px-8 py-12">
                <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
                <p className="text-orange-100 mt-2">Last updated: August 10, 2025</p>
              </div>

              {/* Content */}
              <div className="p-8 prose max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                  <p className="text-gray-700 mb-4">
                    Welcome to IncomeGrow (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our financial planning platform.
                  </p>
                  <p className="text-gray-700">
                    By accessing or using our service, you agree to the collection and use of information in accordance with this policy.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
                  <p className="text-gray-700 mb-4">We may collect the following personal information:</p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4">
                    <li>Name and contact information (email address, phone number)</li>
                    <li>Financial information (income, expenses, investment goals)</li>
                    <li>Demographic information (age, location)</li>
                    <li>Authentication data (login credentials, OAuth tokens)</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Usage Information</h3>
                  <p className="text-gray-700 mb-4">We automatically collect certain information when you use our service:</p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Device information (IP address, browser type, operating system)</li>
                    <li>Usage patterns (pages visited, features used, time spent)</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                  <p className="text-gray-700 mb-4">We use your information to:</p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Provide and maintain our financial planning services</li>
                    <li>Process your transactions and manage your account</li>
                    <li>Personalize your experience and provide tailored recommendations</li>
                    <li>Communicate with you about your account and our services</li>
                    <li>Improve our platform and develop new features</li>
                    <li>Comply with legal obligations and prevent fraud</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
                  <p className="text-gray-700 mb-4">
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>With your explicit consent</li>
                    <li>To comply with legal obligations or court orders</li>
                    <li>To protect our rights, property, or safety, or that of our users</li>
                    <li>With trusted service providers who assist in operating our platform</li>
                    <li>In connection with a merger, acquisition, or sale of assets</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
                  <p className="text-gray-700 mb-4">
                    We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication requirements</li>
                    <li>Employee training on data protection practices</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
                  <p className="text-gray-700 mb-4">You have the right to:</p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Access and review your personal information</li>
                    <li>Request corrections to inaccurate information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Data portability (receive a copy of your data)</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
                  <p className="text-gray-700 mb-4">
                    We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser preferences.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Children&apos;s Privacy</h2>
                  <p className="text-gray-700">
                    Our service is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If you become aware that a child has provided us with personal information, please contact us immediately.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
                  <p className="text-gray-700">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. Your continued use of our service after changes constitutes acceptance of the updated policy.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                  <p className="text-gray-700 mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 mb-2"><strong>Email:</strong> vinay.qss@gmail.com</p>
                    <p className="text-gray-700 mb-2"><strong>Address:</strong> IncomeGrow Financial Services, krishan Vihar Delhi, India</p>
                    {/* <p className="text-gray-700"><strong>Phone:</strong> +91 XXXXX XXXXX</p> */}
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

export default PrivacyPolicy;