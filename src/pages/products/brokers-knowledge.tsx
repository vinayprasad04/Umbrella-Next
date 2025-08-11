import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function BrokersKnowledge() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const brokers = [
    {
      name: "Zerodha",
      logo: "🚀",
      rating: 4.5,
      reviews: 25000,
      equityBrokerage: "₹20 per order",
      accountOpening: "Free",
      features: ["Kite Trading Platform", "Coin for MF", "Educational Content"],
      pros: ["Low brokerage", "User-friendly platform", "Good educational resources"],
      cons: ["No relationship manager", "Limited research"],
      color: "from-blue-400 to-blue-600",
      category: "Discount Broker"
    },
    {
      name: "HDFC Securities",
      logo: "🏦",
      rating: 4.2,
      reviews: 18000,
      equityBrokerage: "0.5% of trade value",
      accountOpening: "₹999",
      features: ["3-in-1 Account", "Research Reports", "Relationship Manager"],
      pros: ["Strong research", "Trusted brand", "Wide product range"],
      cons: ["Higher brokerage", "Complex fee structure"],
      color: "from-red-400 to-red-600",
      category: "Full Service Broker"
    },
    {
      name: "Angel One",
      logo: "😇",
      rating: 4.1,
      reviews: 22000,
      equityBrokerage: "₹20 per order",
      accountOpening: "Free",
      features: ["Angel Speed Pro", "Smart API", "Advisory Services"],
      pros: ["Good trading tools", "API access", "Mobile app"],
      cons: ["Customer service issues", "Platform glitches"],
      color: "from-purple-400 to-purple-600",
      category: "Discount Broker"
    },
    {
      name: "ICICI Direct",
      logo: "🏛️",
      rating: 4.0,
      reviews: 15000,
      equityBrokerage: "0.5% of trade value",
      accountOpening: "₹975",
      features: ["Trade Racer", "Market Insights", "Portfolio Tracker"],
      pros: ["Comprehensive platform", "Good research", "Banking integration"],
      cons: ["High brokerage", "Complex interface"],
      color: "from-orange-400 to-orange-600",
      category: "Full Service Broker"
    },
    {
      name: "Upstox",
      logo: "📈",
      rating: 4.0,
      reviews: 20000,
      equityBrokerage: "₹20 per order",
      accountOpening: "Free",
      features: ["Pro Web Platform", "Mobile Trading", "Options Analytics"],
      pros: ["Low cost", "Good mobile app", "Options features"],
      cons: ["Limited research", "Basic customer support"],
      color: "from-green-400 to-green-600",
      category: "Discount Broker"
    },
    {
      name: "Groww",
      logo: "🌱",
      rating: 4.3,
      reviews: 12000,
      equityBrokerage: "₹20 per order",
      accountOpening: "Free",
      features: ["Simple Interface", "Mutual Fund Focus", "Educational Content"],
      pros: ["User-friendly", "Good for beginners", "MF platform"],
      cons: ["Limited advanced features", "Newer platform"],
      color: "from-teal-400 to-teal-600",
      category: "Discount Broker"
    }
  ];


  const handleGetStarted = () => {
    if (isLoggedIn) {
      router.push('/dashboard');
    } else {
      router.push('/signup');
    }
  };

  return (
    <>
      <Head>
        <title>Brokers Knowledge - Umbrella Financial</title>
        <meta name="description" content="Compare and choose the best stock brokers in India. Get detailed reviews, features comparison, and expert recommendations." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-green-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-green-50 rounded-full border border-blue-200 mb-8">
                <span className="text-sm font-semibold text-blue-600">🏢 Broker Comparison</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Choose the Right
                </span>
                <br />
                <span className="text-gray-800">Stock Broker</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Compare features, charges, and services of top stock brokers in India. 
                Make an informed decision with our detailed broker analysis and reviews.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button 
                  onClick={handleGetStarted}
                  className="group bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Find Best Broker
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                
                <button className="group bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 border-2 border-gray-200 rounded-xl text-lg font-semibold cursor-pointer hover:bg-white hover:shadow-lg hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-2">
                  Compare All
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">50+</div>
                  <div className="text-gray-600">Brokers Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">100K+</div>
                  <div className="text-gray-600">Reviews Collected</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">24/7</div>
                  <div className="text-gray-600">Updated Data</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">Free</div>
                  <div className="text-gray-600">Comparison Tool</div>
                </div>
              </div>
            </div>
          </section>

          {/* Broker Categories */}
          <section className="py-16 bg-white border-b border-gray-100">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: "Discount Brokers", count: 15, icon: "💰", description: "Low cost trading" },
                  { name: "Full Service", count: 12, icon: "🏦", description: "Complete advisory" },
                  { name: "Bank Brokers", count: 8, icon: "🏛️", description: "Banking integration" },
                  { name: "New Age", count: 10, icon: "📱", description: "Tech-focused" }
                ].map((category, index) => (
                  <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="text-3xl mb-3">{category.icon}</div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                    <span className="text-[#FF6B2C] font-semibold">{category.count} brokers</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Broker Comparison */}
          <section className="py-24 bg-gray-50 relative overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-full border border-purple-200 mb-6">
                  <span className="text-sm font-semibold text-purple-600">🏆 Top Brokers</span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800">Popular </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Stock Brokers
                  </span>
                </h2>
                
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Detailed comparison of leading stock brokers with features, charges, and user reviews
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {brokers.map((broker, index) => (
                  <div key={index} className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100">
                    {/* Broker Header */}
                    <div className="text-center mb-8">
                      <div className={`w-20 h-20 bg-gradient-to-r ${broker.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="drop-shadow-sm">{broker.logo}</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{broker.name}</h3>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        {broker.category}
                      </span>
                      
                      <div className="flex items-center justify-center gap-2 mt-4">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="font-semibold">{broker.rating}</span>
                        </div>
                        <span className="text-gray-500">({broker.reviews.toLocaleString()} reviews)</span>
                      </div>
                    </div>
                    
                    {/* Key Features */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <div className="text-sm text-gray-500 mb-1">Equity Brokerage</div>
                          <div className="font-bold text-[#FF6B2C]">{broker.equityBrokerage}</div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <div className="text-sm text-gray-500 mb-1">Account Opening</div>
                          <div className="font-bold text-gray-800">{broker.accountOpening}</div>
                        </div>
                      </div>
                      
                      {/* Features List */}
                      <div>
                        <div className="text-sm font-semibold text-gray-700 mb-3">Key Features</div>
                        <div className="space-y-2">
                          {broker.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-2 h-2 bg-[#FF6B2C] rounded-full"></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Pros & Cons */}
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <div className="text-sm font-semibold text-green-700 mb-2">Pros</div>
                          <div className="space-y-1">
                            {broker.pros.slice(0, 2).map((pro, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-green-600">
                                <span className="text-green-400">+</span>
                                {pro}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm font-semibold text-red-700 mb-2">Cons</div>
                          <div className="space-y-1">
                            {broker.cons.slice(0, 2).map((con, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-red-600">
                                <span className="text-red-400">-</span>
                                {con}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4">
                        <button className="flex-1 bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                          Open Account
                        </button>
                        <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300">
                          Compare
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* View All Button */}
              <div className="text-center mt-16">
                <button className="bg-white text-gray-700 px-8 py-4 border-2 border-gray-200 rounded-xl text-lg font-semibold cursor-pointer hover:bg-gray-50 hover:shadow-lg hover:border-gray-300 transition-all duration-300">
                  View All Brokers
                </button>
              </div>
            </div>
          </section>

          {/* Broker Selection Guide */}
          <section className="py-24 bg-white relative overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800">How to Choose </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    the Right Broker
                  </span>
                </h2>
                
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Key factors to consider when selecting a stock broker for your investment needs
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: "💰",
                    title: "Brokerage Charges",
                    description: "Compare trading fees, account maintenance, and hidden charges",
                    color: "from-green-400 to-green-600"
                  },
                  {
                    icon: "📱",
                    title: "Trading Platform",
                    description: "Evaluate ease of use, features, mobile app, and reliability",
                    color: "from-blue-400 to-blue-600"
                  },
                  {
                    icon: "🛡️",
                    title: "Security & Trust",
                    description: "Check regulatory compliance, safety of funds, and reputation",
                    color: "from-purple-400 to-purple-600"
                  },
                  {
                    icon: "🎯",
                    title: "Investment Options",
                    description: "Available products: stocks, MF, bonds, derivatives, IPOs",
                    color: "from-orange-400 to-orange-600"
                  }
                ].map((factor, index) => (
                  <div key={index} className="text-center group">
                    <div className={`w-16 h-16 bg-gradient-to-r ${factor.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="drop-shadow-sm">{factor.icon}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {factor.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {factor.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Find Your Perfect Broker Match
              </h2>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Use our smart broker recommendation tool to find the best broker based on your trading needs
              </p>
              
              <button 
                onClick={handleGetStarted}
                className="group bg-white text-[#FF6B2C] px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
              >
                {isLoggedIn ? 'Find My Broker' : 'Get Recommendations'}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}