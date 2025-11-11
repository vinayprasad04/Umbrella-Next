import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

export default function CookiePolicy() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Cookie Policy - IncomeGrow Financial Platform</title>
        <meta name="description" content="Learn about how IncomeGrow uses cookies to improve your experience on our financial platform. Understand your choices regarding cookie usage." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-gray-50 via-white to-orange-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#FF6B2C]/10 to-[#FF8A50]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-6 text-center">
              <div className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-[#FF6B2C]/10 to-[#FF8A50]/10 rounded-full border border-[#FF6B2C]/20 mb-3 md:mb-4 lg:mb-6">
                <span className="text-xs md:text-sm font-semibold text-[#FF6B2C]">🍪 Cookie Information</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-3 md:mb-4 lg:mb-6">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Cookie Policy
                </span>
              </h1>

              <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                This Cookie Policy explains how IncomeGrow Financial Platform uses cookies and similar tracking technologies
                to recognize you when you visit our website and use our services.
              </p>

              <div className="mt-4 md:mt-5 lg:mt-6 text-xs md:text-sm text-gray-500">
                Last updated: December 2024
              </div>
            </div>
          </section>

          {/* Cookie Policy Content */}
          <section className="py-8 md:py-12 lg:py-16 xl:py-20 bg-white">
            <div className="w-full max-w-[1000px] mx-auto px-4 md:px-6">
              <div className="prose prose-lg max-w-none">

                {/* What are Cookies */}
                <div className="mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4 lg:mb-6">What are Cookies?</h2>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 border border-blue-100">
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                      Cookies are small text files that are placed on your computer or mobile device when you visit a website.
                      They are widely used to make websites work more efficiently and to provide information to website owners.
                    </p>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      Cookies allow us to recognize your device and store some information about your preferences or past actions
                      to improve your experience on our platform.
                    </p>
                  </div>
                </div>

                {/* Types of Cookies */}
                <div className="mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4 lg:mb-6">Types of Cookies We Use</h2>

                  <div className="space-y-4 md:space-y-5 lg:space-y-6">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 border border-green-100">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3 flex items-center gap-2">
                        <span className="text-2xl">🔧</span>
                        Essential Cookies
                      </h3>
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-2 md:mb-3">
                        These cookies are strictly necessary for the operation of our website. They enable core functionality
                        such as security, network management, and accessibility.
                      </p>
                      <div className="text-xs md:text-sm text-gray-600">
                        <strong>Examples:</strong> Authentication tokens, session management, security features
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 border border-blue-100">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3 flex items-center gap-2">
                        <span className="text-2xl">📊</span>
                        Analytics Cookies
                      </h3>
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-2 md:mb-3">
                        These cookies help us understand how visitors interact with our website by collecting and
                        reporting information anonymously. This helps us improve our services.
                      </p>
                      <div className="text-xs md:text-sm text-gray-600">
                        <strong>Examples:</strong> Google Analytics, page views, user behavior tracking
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 border border-purple-100">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3 flex items-center gap-2">
                        <span className="text-2xl">🎯</span>
                        Functional Cookies
                      </h3>
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-2 md:mb-3">
                        These cookies enable the website to provide enhanced functionality and personalization.
                        They may be set by us or by third-party providers whose services we have added to our pages.
                      </p>
                      <div className="text-xs md:text-sm text-gray-600">
                        <strong>Examples:</strong> Language preferences, user settings, personalized content
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 border border-orange-100">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3 flex items-center gap-2">
                        <span className="text-2xl">📢</span>
                        Marketing Cookies
                      </h3>
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-2 md:mb-3">
                        These cookies are used to track visitors across websites. The intention is to display ads
                        that are relevant and engaging for the individual user.
                      </p>
                      <div className="text-xs md:text-sm text-gray-600">
                        <strong>Examples:</strong> Advertising networks, social media integrations, remarketing
                      </div>
                    </div>
                  </div>
                </div>

                {/* How We Use Cookies */}
                <div className="mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4 lg:mb-6">How We Use Cookies</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                    {[
                      {
                        icon: '🔐',
                        title: 'Security & Authentication',
                        description: 'To keep your account secure and verify your identity when you log in'
                      },
                      {
                        icon: '⚙️',
                        title: 'Website Functionality',
                        description: 'To remember your preferences and settings for a better user experience'
                      },
                      {
                        icon: '📈',
                        title: 'Performance Analysis',
                        description: 'To understand how our website performs and identify areas for improvement'
                      },
                      {
                        icon: '🎨',
                        title: 'Personalization',
                        description: 'To customize content and features based on your interests and usage patterns'
                      }
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg md:rounded-xl p-4 md:p-5 lg:p-6 border border-gray-100">
                        <div className="text-3xl mb-2 md:mb-3">{item.icon}</div>
                        <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1 md:mb-2">{item.title}</h3>
                        <p className="text-xs md:text-sm text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Managing Cookies */}
                <div className="mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4 lg:mb-6">Managing Your Cookie Preferences</h2>

                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 border border-yellow-100 mb-4 md:mb-5 lg:mb-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">Browser Settings</h3>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                      You can control and manage cookies in various ways. Most web browsers automatically accept cookies,
                      but you can usually modify your browser settings to decline cookies if you prefer.
                    </p>
                    <div className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-600">
                      <div><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</div>
                      <div><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</div>
                      <div><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</div>
                      <div><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 border border-red-100">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3 flex items-center gap-2">
                      <span className="text-lg md:text-xl">⚠️</span>
                      Important Notice
                    </h3>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      Please note that disabling certain cookies may limit the functionality of our website.
                      Essential cookies cannot be disabled as they are necessary for the basic operation of our services.
                    </p>
                  </div>
                </div>

                {/* Third-Party Cookies */}
                <div className="mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4 lg:mb-6">Third-Party Cookies</h2>
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 border border-indigo-100">
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                      Some cookies on our website are set by third-party services that appear on our pages.
                      These include:
                    </p>
                    <ul className="space-y-1 md:space-y-2 text-sm md:text-base text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span><strong>Google Analytics:</strong> For website performance and user behavior analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span><strong>Social Media Platforms:</strong> For social sharing and embedded content</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span><strong>Payment Processors:</strong> For secure payment processing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span><strong>Customer Support Tools:</strong> For chat and support functionality</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Updates to Policy */}
                <div className="mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4 lg:mb-6">Updates to This Policy</h2>
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 border border-gray-100">
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                      We may update this Cookie Policy from time to time to reflect changes in our practices
                      or for other operational, legal, or regulatory reasons.
                    </p>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      When we make changes, we will update the "Last updated" date at the top of this policy.
                      We encourage you to review this policy periodically to stay informed about our use of cookies.
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4 lg:mb-6">Contact Us</h2>
                  <div className="bg-gradient-to-r from-[#FF6B2C]/10 to-[#FF8A50]/10 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 border border-[#FF6B2C]/20">
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                      If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                    </p>
                    <div className="space-y-1 md:space-y-2 text-sm md:text-base text-gray-700">
                      <div className="flex items-center gap-2">
                        <span className="text-[#FF6B2C]">📧</span>
                        <span>Email: vinay.qss@gmail.com</span>
                      </div>
                      {/* <div className="flex items-center gap-2">
                        <span className="text-[#FF6B2C]">📞</span>
                        <span>Phone: +91-800-123-4567</span>
                      </div> */}
                      <div className="flex items-center gap-2">
                        <span className="text-[#FF6B2C]">📍</span>
                        <span>Address: IncomeGrow Financial Services krishan vihar, Delhi, India</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="text-center pt-6 md:pt-8">
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                    <button
                      onClick={() => router.push('/privacy-policy')}
                      className="group bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-4 md:px-6 py-2 md:py-3 border-none rounded-lg md:rounded-xl text-sm md:text-base font-semibold cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Privacy Policy
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>

                    <button
                      onClick={() => router.push('/terms-of-service')}
                      className="bg-white/80 backdrop-blur-sm text-gray-700 px-4 md:px-6 py-2 md:py-3 border-2 border-gray-200 rounded-lg md:rounded-xl text-sm md:text-base font-semibold cursor-pointer hover:bg-white hover:shadow-lg hover:border-gray-300 transition-all duration-300"
                    >
                      Terms of Service
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}