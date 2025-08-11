import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function SharesResearch() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('recommendations');

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const recommendations = [
    {
      symbol: "RELIANCE",
      company: "Reliance Industries",
      price: "₹2,456",
      target: "₹2,800",
      recommendation: "BUY",
      upside: "14%",
      rating: 4.5,
      sector: "Energy",
      color: "text-green-600 bg-green-50"
    },
    {
      symbol: "TCS",
      company: "Tata Consultancy Services",
      price: "₹3,789",
      target: "₹4,100",
      recommendation: "BUY",
      upside: "8%",
      rating: 4.3,
      sector: "IT",
      color: "text-green-600 bg-green-50"
    },
    {
      symbol: "HDFCBANK",
      company: "HDFC Bank Limited",
      price: "₹1,645",
      target: "₹1,850",
      recommendation: "HOLD",
      upside: "12%",
      rating: 4.0,
      sector: "Banking",
      color: "text-yellow-600 bg-yellow-50"
    },
    {
      symbol: "INFY",
      company: "Infosys Limited",
      price: "₹1,523",
      target: "₹1,650",
      recommendation: "BUY",
      upside: "8%",
      rating: 4.2,
      sector: "IT",
      color: "text-green-600 bg-green-50"
    }
  ];

  const sectors = [
    { name: "Banking & Finance", stocks: 45, performance: "+12.5%", color: "from-blue-400 to-blue-600" },
    { name: "Information Technology", stocks: 38, performance: "+8.3%", color: "from-green-400 to-green-600" },
    { name: "Healthcare", stocks: 22, performance: "+15.2%", color: "from-purple-400 to-purple-600" },
    { name: "Energy & Power", stocks: 28, performance: "+6.7%", color: "from-orange-400 to-orange-600" },
    { name: "Consumer Goods", stocks: 35, performance: "+9.8%", color: "from-pink-400 to-pink-600" },
    { name: "Real Estate", stocks: 18, performance: "+11.4%", color: "from-indigo-400 to-indigo-600" }
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
        <title>Shares Research - Umbrella Financial</title>
        <meta name="description" content="Get expert stock analysis, research reports, and investment recommendations from our team of financial analysts." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-green-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-full border border-green-200 mb-8">
                <span className="text-sm font-semibold text-green-600">📈 Expert Stock Research</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Data-Driven
                </span>
                <br />
                <span className="text-gray-800">Stock Research</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Make informed investment decisions with our comprehensive stock analysis, 
                sector reports, and expert recommendations backed by thorough research.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button 
                  onClick={handleGetStarted}
                  className="group bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Access Research
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                
                <button className="group bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 border-2 border-gray-200 rounded-xl text-lg font-semibold cursor-pointer hover:bg-white hover:shadow-lg hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-2">
                  Sample Report
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">500+</div>
                  <div className="text-gray-600">Stocks Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">85%</div>
                  <div className="text-gray-600">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">15+</div>
                  <div className="text-gray-600">Research Analysts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">Daily</div>
                  <div className="text-gray-600">Market Updates</div>
                </div>
              </div>
            </div>
          </section>

          {/* Research Tabs */}
          <section className="py-16 bg-white">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="flex justify-center mb-12">
                <div className="flex bg-gray-100 rounded-2xl p-2">
                  {[
                    { id: 'recommendations', label: 'Stock Picks' },
                    { id: 'sectors', label: 'Sector Analysis' },
                    { id: 'reports', label: 'Research Reports' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-[#FF6B2C] text-white shadow-lg'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stock Recommendations */}
              {activeTab === 'recommendations' && (
                <div className="space-y-8">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Latest Stock Recommendations</h2>
                    <p className="text-gray-600">Expert-picked stocks with detailed analysis and price targets</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recommendations.map((stock, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{stock.symbol}</h3>
                            <p className="text-gray-600 text-sm">{stock.company}</p>
                            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full mt-1 inline-block">{stock.sector}</span>
                          </div>
                          <div className={`px-3 py-1 rounded-full font-semibold text-sm ${stock.color}`}>
                            {stock.recommendation}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-gray-500">Current Price</div>
                            <div className="font-bold text-gray-800">{stock.price}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Target Price</div>
                            <div className="font-bold text-green-600">{stock.target}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Upside</div>
                            <div className="font-bold text-[#FF6B2C]">{stock.upside}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-sm font-semibold">{stock.rating}/5</span>
                          </div>
                          <button className="text-[#FF6B2C] font-semibold hover:underline">
                            View Analysis
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sector Analysis */}
              {activeTab === 'sectors' && (
                <div className="space-y-8">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Sector Analysis</h2>
                    <p className="text-gray-600">Comprehensive analysis of different market sectors</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sectors.map((sector, index) => (
                      <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <div className={`w-12 h-12 bg-gradient-to-r ${sector.color} rounded-xl flex items-center justify-center mb-4`}>
                          <span className="text-white text-xl font-bold">📊</span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{sector.name}</h3>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Stocks Covered</span>
                            <span className="font-semibold">{sector.stocks}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Performance</span>
                            <span className="font-semibold text-green-600">{sector.performance}</span>
                          </div>
                        </div>
                        
                        <button className="w-full mt-4 bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                          View Sector Report
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Research Reports */}
              {activeTab === 'reports' && (
                <div className="space-y-8">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Research Reports</h2>
                    <p className="text-gray-600">In-depth analysis and detailed research reports</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { title: "Market Outlook 2024", type: "Market Analysis", date: "Dec 2024", pages: "45 pages" },
                      { title: "Banking Sector Deep Dive", type: "Sector Report", date: "Nov 2024", pages: "32 pages" },
                      { title: "Tech Stocks: Future Leaders", type: "Thematic Report", date: "Nov 2024", pages: "28 pages" },
                      { title: "ESG Investment Guide", type: "Investment Strategy", date: "Oct 2024", pages: "38 pages" },
                      { title: "Small Cap Opportunities", type: "Stock Research", date: "Oct 2024", pages: "25 pages" },
                      { title: "Dividend Yield Analysis", type: "Income Investing", date: "Sep 2024", pages: "30 pages" }
                    ].map((report, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                        <div className="mb-4">
                          <h3 className="text-lg font-bold text-gray-800 mb-2">{report.title}</h3>
                          <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">{report.type}</span>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <div>Published: {report.date}</div>
                          <div>Length: {report.pages}</div>
                        </div>
                        
                        <button className="w-full bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                          Download Report
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Get Premium Research Access
              </h2>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Join our research platform and get access to exclusive stock picks and detailed analysis
              </p>
              
              <button 
                onClick={handleGetStarted}
                className="group bg-white text-[#FF6B2C] px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
              >
                {isLoggedIn ? 'Access Research' : 'Start Free Trial'}
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