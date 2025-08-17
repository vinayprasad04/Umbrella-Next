import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function CapitalGainsPlanning() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <>
      <Head>
        <title>Capital Gains Tax Planning Guide 2025 - STCG LTCG Tax Optimization | Umbrella Financial</title>
        <meta name="description" content="Complete capital gains tax planning guide 2025. Learn STCG, LTCG rates, tax-saving strategies, indexation benefits. Expert tips for equity, property, mutual funds." />
        <meta name="keywords" content="capital gains, STCG, LTCG, tax planning, equity, mutual funds, property, indexation, 2025, India" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://umbrella.com/tax-planning/capital-gains-planning" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-16 bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-48 h-48 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full border border-emerald-200 mb-6">
                <span className="text-sm font-semibold text-emerald-600">📈 Capital Gains Guide</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Capital Gains Tax Planning
                </span>
                <br />
                <span className="text-gray-800">Complete Guide 2025</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Master capital gains tax optimization strategies for equity, property, and mutual funds. Learn STCG, LTCG rates and tax-saving techniques.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={() => router.push('/calculation/tax')}
                  className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Calculate Tax Savings
                </button>
                <button
                  onClick={() => router.push('/tax-planning')}
                  className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
                >
                  View All Tax Tips
                </button>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-white">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200">
                  <h2 className="text-3xl font-bold text-emerald-800 mb-4 flex items-center gap-3">
                    📈 Capital Gains Tax Planning
                  </h2>
                  <p className="text-lg text-emerald-700 mb-6">
                    Optimize your capital gains tax liability with strategic planning for different asset classes and holding periods.
                  </p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">🏠 Real Estate Capital Gains</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                          <h4 className="font-semibold text-gray-800 mb-2">Short Term (&lt; 2 years)</h4>
                          <p className="text-sm text-gray-600 mb-2">Taxed as per income tax slab rates</p>
                          <div className="text-xs text-red-600">💡 Can be 30% for high earners</div>
                        </div>
                        
                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <h4 className="font-semibold text-gray-800 mb-2">Long Term (&gt; 2 years)</h4>
                          <p className="text-sm text-gray-600 mb-2">20% with indexation benefit</p>
                          <div className="text-xs text-green-600">💡 Indexation reduces taxable gains significantly</div>
                        </div>
                        
                        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <h4 className="font-semibold text-gray-800 mb-2">Section 54 Exemption</h4>
                          <p className="text-sm text-gray-600 mb-2">Reinvest in another property within 2 years</p>
                          <div className="text-xs text-blue-600">💡 Complete exemption if reinvested</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Equity & Mutual Funds</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                          <h4 className="font-semibold text-gray-800 mb-2">STCG Equity (&lt; 1 year)</h4>
                          <p className="text-sm text-gray-600 mb-2">15% flat rate</p>
                          <div className="text-xs text-orange-600">💡 No indexation benefit</div>
                        </div>
                        
                        <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                          <h4 className="font-semibold text-gray-800 mb-2">LTCG Equity (&gt; 1 year)</h4>
                          <p className="text-sm text-gray-600 mb-2">10% above ₹1 lakh gains</p>
                          <div className="text-xs text-purple-600">💡 First ₹1 lakh is tax-free annually</div>
                        </div>
                        
                        <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
                          <h4 className="font-semibold text-gray-800 mb-2">Debt Funds</h4>
                          <p className="text-sm text-gray-600 mb-2">20% LTCG with indexation (&gt; 3 years)</p>
                          <div className="text-xs text-teal-600">💡 STCG taxed as per slab rates</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">💡 Tax Optimization Strategies</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-gray-800 mb-2">🗓️ Timing Strategy</h4>
                        <p className="text-sm text-gray-600">Hold assets for favorable LTCG rates</p>
                        <div className="mt-3 text-xs text-blue-700">
                          • Property: &gt; 2 years
                          <br />• Equity: &gt; 1 year  
                          <br />• Debt funds: &gt; 3 years
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-gray-800 mb-2">📊 Tax Loss Harvesting</h4>
                        <p className="text-sm text-gray-600">Offset gains with losses</p>
                        <div className="mt-3 text-xs text-green-700">
                          • Sell loss-making investments
                          <br />• Offset against capital gains
                          <br />• Carry forward losses for 8 years
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                        <h4 className="font-semibold text-gray-800 mb-2">🏡 Reinvestment Benefits</h4>
                        <p className="text-sm text-gray-600">Use exemption sections</p>
                        <div className="mt-3 text-xs text-purple-700">
                          • Section 54: Property to property
                          <br />• Section 54F: Any asset to property
                          <br />• Section 54EC: Bonds investment
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                    <h3 className="text-lg font-bold text-yellow-800 mb-3">📋 Capital Gains Planning Checklist</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
                      <div>✅ Track purchase dates for all investments</div>
                      <div>✅ Maintain detailed cost of acquisition records</div>
                      <div>✅ Consider indexation benefits for LTCG</div>
                      <div>✅ Plan asset sales to utilize ₹1L LTCG exemption</div>
                      <div>✅ Review portfolio for tax loss harvesting opportunities</div>
                      <div>✅ Consider reinvestment options for property gains</div>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-lg font-bold text-blue-800 mb-3">💰 Tax Savings Examples</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Equity LTCG Planning</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Gains ₹2,00,000:</span>
                            <span className="font-medium">Tax ₹10,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>If sold in 2 tranches:</span>
                            <span className="font-medium text-green-600">Tax ₹0</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-2">Split across financial years to use ₹1L exemption twice</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Property Indexation Benefit</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Sale Price:</span>
                            <span className="font-medium">₹1,00,00,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Indexed Cost:</span>
                            <span className="font-medium">₹90,00,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Taxable Gain:</span>
                            <span className="font-medium text-green-600">₹10,00,000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Investment Platforms Section */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    🏦 Best Investment Platforms for Tax Planning
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Featured Partners */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-lg text-gray-800">Groww</h4>
                        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full font-semibold">PARTNER</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">₹0 brokerage | Advanced tax tools | Capital gains tracking</p>
                      <a href="https://groww.in/" 
                         target="_blank" rel="noopener noreferrer"
                         className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                        Start Investing →
                      </a>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-lg text-gray-800">Zerodha</h4>
                        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-semibold">PARTNER</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Console for tax reports | P&L statements | Advanced analytics</p>
                      <a href="https://zerodha.com/" 
                         target="_blank" rel="noopener noreferrer"
                         className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                        Open Account →
                      </a>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] rounded-2xl p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-4">Optimize Your Capital Gains Tax</h2>
                  <p className="text-lg mb-6 opacity-90">
                    Use our advanced tax calculator to plan your capital gains strategy and minimize tax liability.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => router.push('/calculation/tax')}
                      className="bg-white text-[#FF6B2C] px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Calculate Capital Gains Tax
                    </button>
                    <a
                      href="https://groww.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#FF6B2C] transition-all duration-300"
                    >
                      Start Smart Investing
                    </a>
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