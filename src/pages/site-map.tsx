import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Sitemap() {
  const siteStructure = [
    {
      category: "Main Pages",
      icon: "🏠",
      color: "from-blue-400 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      pages: [
        { name: "Home", href: "/", description: "Welcome to IncomeGrow Financial Platform" },
        { name: "About Us", href: "/about", description: "Learn about our mission and team" },
        { name: "Products", href: "/products", description: "Explore our financial tools and services" },
        { name: "Testimonials", href: "/testimonials", description: "Read what our users say about us" },
        { name: "Become a Partner", href: "/become-partner", description: "Join our partnership program" }
      ]
    },
    {
      category: "Products & Services",
      icon: "💼",
      color: "from-green-400 to-green-600",
      bgColor: "from-green-50 to-green-100",
      pages: [
        { name: "Goal Planning", href: "/products/goal", description: "Set and track your financial goals" },
        { name: "Educational Courses", href: "/products/course", description: "Learn from financial experts" },
        { name: "Shares Research", href: "https://www.stock.incomegrow.in/", description: "In-depth stock analysis and research", external: true },
        { name: "Expert Blogs", href: "/products/blogs", description: "Latest financial insights and news" },
        { name: "Broker Knowledge", href: "/products/brokers-knowledge", description: "Compare and choose brokers" }
      ]
    },
    {
      category: "Calculators",
      icon: "🧮",
      color: "from-purple-400 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      pages: [
        { name: "Lumpsum Calculator", href: "/calculation/lumpsum", description: "Calculate lumpsum investment returns" },
        { name: "SIP Calculator", href: "/calculation/sip", description: "Plan your systematic investment" },
        { name: "Goal Planner", href: "/calculation/goal-planner", description: "Plan investments for your goals" },
        { name: "Retirement Plan Calculator", href: "/calculation/eim", description: "Plan your retirement and early retirement" },
        { name: "Fixed Deposit (FD) Calculator", href: "/calculation/fd", description: "Calculate FD maturity amount and returns" },
        { name: "Recurring Deposit (RD) Calculator", href: "/calculation/rd", description: "Calculate RD returns with monthly deposits" },
        { name: "Provident Fund (PF) Calculator", href: "/calculation/pf", description: "Calculate EPF maturity and tax benefits" },
        { name: "National Pension (NPS) Calculator", href: "/calculation/nps", description: "Calculate NPS returns and monthly pension" },
        { name: "Sukanya Samriddhi (SSY) Calculator", href: "/calculation/ssy", description: "Calculate SSY maturity for girl child" },
        { name: "Income Tax Calculator", href: "/calculation/tax", description: "Calculate income tax for different regimes" },
        { name: "Gratuity Calculator", href: "/calculation/gratuity", description: "Calculate gratuity amount on retirement" },
        { name: "Other Calculators", href: "/calculation/other", description: "Additional financial calculators" }
      ]
    },
    {
      category: "User Account",
      icon: "👤",
      color: "from-orange-400 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      pages: [
        { name: "Login", href: "/login", description: "Sign in to your account" },
        { name: "Sign Up", href: "/signup", description: "Create a new account" },
        { name: "Dashboard", href: "/dashboard", description: "Your personal financial dashboard" },
        { name: "Profile", href: "/profile", description: "Manage your profile settings" },
        { name: "Settings", href: "/settings", description: "Account and application settings" },
        { name: "Forgot Password", href: "/forgot-password", description: "Reset your password" }
      ]
    },
    {
      category: "Knowledge Base",
      icon: "📚",
      color: "from-indigo-400 to-indigo-600",
      bgColor: "from-indigo-50 to-indigo-100",
      pages: [
        { name: "Tax Knowledge", href: "/tax-knowledge/tax-haven", description: "Tax planning and knowledge" },
        { name: "My Goals", href: "/dashboard/my-goal", description: "Plan and track your financial goals" },
        { name: "All Icons", href: "/all-icons", description: "Icon library and resources" }
      ]
    },
    {
      category: "Support & Help",
      icon: "🛟",
      color: "from-teal-400 to-teal-600",
      bgColor: "from-teal-50 to-teal-100",
      pages: [
        { name: "Contact Us", href: "/support/contact-us", description: "Get in touch with our team" },
        { name: "FAQ", href: "/support/faq", description: "Frequently asked questions" },
        { name: "Sample Page", href: "/sample-page", description: "Sample content page" }
      ]
    },
    {
      category: "Legal & Policies",
      icon: "⚖️",
      color: "from-red-400 to-red-600",
      bgColor: "from-red-50 to-red-100",
      pages: [
        { name: "Privacy Policy", href: "/privacy-policy", description: "How we protect your privacy" },
        { name: "Terms of Service", href: "/terms-of-service", description: "Terms and conditions of use" },
        { name: "Cookie Policy", href: "/cookie-policy", description: "Information about our cookie usage" },
        { name: "Sitemap", href: "/sitemap", description: "Complete site navigation map" }
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Sitemap - IncomeGrow Financial Platform Navigation</title>
        <meta name="description" content="Complete sitemap of IncomeGrow Financial Platform. Find all our pages including products, calculators, support, and legal information." />
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
                <span className="text-xs md:text-sm font-semibold text-[#FF6B2C]">🗺️ Site Navigation</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-3 md:mb-4 lg:mb-6">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Site Map
                </span>
              </h1>

              <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-4 md:mb-6 lg:mb-8">
                Explore all the pages and features available on IncomeGrow Financial Platform.
                Find exactly what you're looking for with our comprehensive site navigation.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-gray-800">{siteStructure.length}</div>
                  <div className="text-xs md:text-sm text-gray-500">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-gray-800">
                    {siteStructure.reduce((total, category) => total + category.pages.length, 0)}+
                  </div>
                  <div className="text-xs md:text-sm text-gray-500">Total Pages</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-gray-800">100%</div>
                  <div className="text-xs md:text-sm text-gray-500">Coverage</div>
                </div>
              </div>
            </div>
          </section>

          {/* Sitemap Content */}
          <section className="py-8 md:py-12 lg:py-16 xl:py-20 bg-white">
            <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
              <div className="space-y-6 md:space-y-8">
                {siteStructure.map((section, sectionIndex) => (
                  <div key={sectionIndex} className={`bg-gradient-to-br ${section.bgColor} rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8 border border-white/50`}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 mb-4 md:mb-6 lg:mb-8">
                      <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${section.color} rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-lg flex-shrink-0`}>
                        <span className="drop-shadow-sm">{section.icon}</span>
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">{section.category}</h2>
                        <p className="text-xs md:text-sm text-gray-600">{section.pages.length} pages available</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
                      {section.pages.map((page, pageIndex) => (
                        page.external ? (
                          <a
                            key={pageIndex}
                            href={page.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white/80 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 lg:p-6 border border-white/50 hover:shadow-lg hover:scale-105 transition-all duration-300 no-underline"
                          >
                            <div className="flex items-start justify-between mb-2 md:mb-3">
                              <h3 className="text-base md:text-lg font-bold text-gray-800 group-hover:text-[#FF6B2C] transition-colors duration-200">
                                {page.name}
                              </h3>
                              <svg
                                className="w-4 h-4 text-gray-400 group-hover:text-[#FF6B2C] transition-all duration-200 flex-shrink-0 ml-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </div>
                            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                              {page.description}
                            </p>
                            <div className="mt-2 md:mt-3 lg:mt-4 text-xs text-gray-500 truncate">
                              {page.href}
                            </div>
                          </a>
                        ) : (
                          <Link
                            key={pageIndex}
                            href={page.href}
                            className="group bg-white/80 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 lg:p-6 border border-white/50 hover:shadow-lg hover:scale-105 transition-all duration-300 no-underline"
                          >
                            <div className="flex items-start justify-between mb-2 md:mb-3">
                              <h3 className="text-base md:text-lg font-bold text-gray-800 group-hover:text-[#FF6B2C] transition-colors duration-200">
                                {page.name}
                              </h3>
                              <svg
                                className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-[#FF6B2C] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 ml-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                              {page.description}
                            </p>
                            <div className="mt-2 md:mt-3 lg:mt-4 text-xs text-gray-500 truncate">
                              {page.href}
                            </div>
                          </Link>
                        )
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Quick Navigation */}
          <section className="py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 right-20 w-64 h-64 bg-gradient-to-r from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-20 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-6 text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4 lg:mb-6">Quick Navigation</h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-4 md:mb-6 lg:mb-8 max-w-2xl mx-auto">
                Jump directly to the most popular sections of our platform
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
                {[
                  { name: "Get Started", href: "/login", icon: "🚀", color: "from-green-400 to-green-600" },
                  { name: "Calculators", href: "/calculation/sip", icon: "🧮", color: "from-blue-400 to-blue-600" },
                  { name: "Learn", href: "/products/course", icon: "🎓", color: "from-purple-400 to-purple-600" },
                  { name: "Support", href: "/support/contact-us", icon: "💬", color: "from-orange-400 to-orange-600" }
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="group bg-white/80 backdrop-blur-sm rounded-lg md:rounded-xl lg:rounded-2xl p-3 md:p-4 lg:p-6 text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 no-underline border border-white/50"
                  >
                    <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${item.color} rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-3 lg:mb-4 text-lg md:text-xl lg:text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="drop-shadow-sm">{item.icon}</span>
                    </div>
                    <h3 className="text-sm md:text-base lg:text-lg font-bold text-gray-800 group-hover:text-[#FF6B2C] transition-colors duration-200">
                      {item.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/5"></div>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-6 text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4 lg:mb-6">
                Can't Find What You're Looking For?
              </h2>

              <p className="text-sm md:text-base lg:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto mb-4 md:mb-6 lg:mb-8">
                Our support team is here to help you navigate our platform and find the information you need.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link
                  href="/support/contact-us"
                  className="group bg-white text-[#FF6B2C] px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 border-none rounded-lg md:rounded-xl text-sm md:text-base lg:text-lg font-semibold cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 no-underline"
                >
                  Contact Support
                  <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                <Link
                  href="/support/faq"
                  className="group bg-white/20 backdrop-blur-sm text-white px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 border-2 border-white/30 rounded-lg md:rounded-xl text-sm md:text-base lg:text-lg font-semibold cursor-pointer hover:bg-white/30 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 no-underline"
                >
                  View FAQ
                  <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}