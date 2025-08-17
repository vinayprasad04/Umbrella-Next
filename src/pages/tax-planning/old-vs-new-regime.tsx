import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function OldVsNewRegime() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <>
      <Head>
        <title>Old vs New Tax Regime Comparison 2025 - Which is Better? | Umbrella Financial</title>
        <meta name="description" content="Complete old vs new tax regime comparison 2025. Compare tax rates, deductions, rebates. Calculate which regime saves more tax with examples & calculator." />
        <meta name="keywords" content="old tax regime, new tax regime, tax comparison, tax calculator, Section 80C, rebate, tax planning, 2025, India" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://umbrella.com/tax-planning/old-vs-new-regime" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-16 bg-gradient-to-br from-slate-50 via-white to-gray-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-48 h-48 bg-gradient-to-r from-slate-400/10 to-gray-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-slate-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-50 to-gray-50 rounded-full border border-slate-200 mb-6">
                <span className="text-sm font-semibold text-slate-600">⚖️ Tax Regime Comparison</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Old vs New Tax Regime
                </span>
                <br />
                <span className="text-gray-800">Complete Comparison 2025</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Comprehensive comparison between old and new tax regimes. Find out which regime saves you more money with detailed analysis and examples.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={() => router.push('/calculation/tax')}
                  className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Compare Tax Regimes
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
                {/* Tax Rates Comparison */}
                <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-8 border border-slate-200">
                  <h2 className="text-3xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                    ⚖️ Tax Rates Comparison
                  </h2>
                  <p className="text-lg text-slate-700 mb-6">
                    Compare income tax slabs and rates between old and new tax regimes for FY 2024-25.
                  </p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">🏛️ Old Tax Regime</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <span className="font-medium">Up to ₹2.5 lakh</span>
                          <span className="font-bold text-green-600">0%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                          <span className="font-medium">₹2.5L - ₹5L</span>
                          <span className="font-bold text-yellow-600">5%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                          <span className="font-medium">₹5L - ₹10L</span>
                          <span className="font-bold text-orange-600">20%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                          <span className="font-medium">Above ₹10L</span>
                          <span className="font-bold text-red-600">30%</span>
                        </div>
                        <div className="mt-4 p-3 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">Available Deductions</h4>
                          <div className="text-sm text-green-700 space-y-1">
                            <div>• Section 80C: ₹1.5 lakh</div>
                            <div>• Section 80D: ₹25,000-₹50,000</div>
                            <div>• HRA, LTA, and other allowances</div>
                            <div>• Standard deduction: ₹50,000</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">🆕 New Tax Regime</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">Up to ₹3 lakh</span>
                          <span className="font-bold text-green-600">0%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <span className="font-medium">₹3L - ₹6L</span>
                          <span className="font-bold text-blue-600">5%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                          <span className="font-medium">₹6L - ₹9L</span>
                          <span className="font-bold text-purple-600">10%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                          <span className="font-medium">₹9L - ₹12L</span>
                          <span className="font-bold text-yellow-600">15%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                          <span className="font-medium">₹12L - ₹15L</span>
                          <span className="font-bold text-orange-600">20%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                          <span className="font-medium">Above ₹15L</span>
                          <span className="font-bold text-red-600">30%</span>
                        </div>
                        <div className="mt-4 p-3 bg-red-50 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">Limited Deductions</h4>
                          <div className="text-sm text-red-700 space-y-1">
                            <div>• Standard deduction: ₹75,000</div>
                            <div>• NPS employer contribution: ₹50,000</div>
                            <div>• No other deductions allowed</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Comparison */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Side-by-Side Feature Comparison</h2>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-4 text-left font-semibold">Feature</th>
                          <th className="border border-gray-300 p-4 text-center font-semibold text-blue-700">Old Regime</th>
                          <th className="border border-gray-300 p-4 text-center font-semibold text-green-700">New Regime</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-4 font-medium">Tax-free income limit</td>
                          <td className="border border-gray-300 p-4 text-center">₹2.5 lakh</td>
                          <td className="border border-gray-300 p-4 text-center text-green-600">₹3 lakh</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-4 font-medium">Standard deduction</td>
                          <td className="border border-gray-300 p-4 text-center">₹50,000</td>
                          <td className="border border-gray-300 p-4 text-center text-green-600">₹75,000</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-4 font-medium">Section 80C deductions</td>
                          <td className="border border-gray-300 p-4 text-center text-blue-600">₹1.5 lakh</td>
                          <td className="border border-gray-300 p-4 text-center text-red-600">Not allowed</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-4 font-medium">Health insurance (80D)</td>
                          <td className="border border-gray-300 p-4 text-center text-blue-600">₹25K-₹50K</td>
                          <td className="border border-gray-300 p-4 text-center text-red-600">Not allowed</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-4 font-medium">HRA exemption</td>
                          <td className="border border-gray-300 p-4 text-center text-blue-600">Available</td>
                          <td className="border border-gray-300 p-4 text-center text-red-600">Not allowed</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-4 font-medium">87A rebate limit</td>
                          <td className="border border-gray-300 p-4 text-center">₹12,500 (₹5L income)</td>
                          <td className="border border-gray-300 p-4 text-center text-green-600">₹25,000 (₹7L income)</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-4 font-medium">Education loan interest</td>
                          <td className="border border-gray-300 p-4 text-center text-blue-600">Unlimited (80E)</td>
                          <td className="border border-gray-300 p-4 text-center text-red-600">Not allowed</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Calculation Examples */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200">
                  <h2 className="text-2xl font-bold text-indigo-800 mb-6">💰 Tax Calculation Examples</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Example 1 - Low Income */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">💼 Income: ₹6 Lakh</h3>
                      <div className="space-y-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">Old Regime</h4>
                          <div className="text-sm space-y-1">
                            <div>Gross Income: ₹6,00,000</div>
                            <div>80C Investment: ₹1,50,000</div>
                            <div>Standard Deduction: ₹50,000</div>
                            <div>Taxable Income: ₹4,00,000</div>
                            <div className="font-bold text-blue-600">Tax: ₹5,000</div>
                            <div className="font-bold text-green-600">After 87A: ₹0</div>
                          </div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">New Regime</h4>
                          <div className="text-sm space-y-1">
                            <div>Gross Income: ₹6,00,000</div>
                            <div>Standard Deduction: ₹75,000</div>
                            <div>Taxable Income: ₹5,25,000</div>
                            <div className="font-bold text-green-600">Tax: ₹11,250</div>
                            <div className="font-bold text-green-600">After 87A: ₹0</div>
                          </div>
                        </div>
                        <div className="text-center font-bold text-lg text-green-600">
                          Winner: Both Equal (₹0 tax)
                        </div>
                      </div>
                    </div>

                    {/* Example 2 - Medium Income */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">💼 Income: ₹10 Lakh</h3>
                      <div className="space-y-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">Old Regime</h4>
                          <div className="text-sm space-y-1">
                            <div>Gross Income: ₹10,00,000</div>
                            <div>80C + 80D: ₹1,75,000</div>
                            <div>Standard Deduction: ₹50,000</div>
                            <div>Taxable Income: ₹7,75,000</div>
                            <div className="font-bold text-blue-600">Tax: ₹67,500</div>
                          </div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">New Regime</h4>
                          <div className="text-sm space-y-1">
                            <div>Gross Income: ₹10,00,000</div>
                            <div>Standard Deduction: ₹75,000</div>
                            <div>Taxable Income: ₹9,25,000</div>
                            <div className="font-bold text-green-600">Tax: ₹55,000</div>
                          </div>
                        </div>
                        <div className="text-center font-bold text-lg text-green-600">
                          Winner: New Regime (₹12,500 saved)
                        </div>
                      </div>
                    </div>

                    {/* Example 3 - High Income */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">💼 Income: ₹20 Lakh</h3>
                      <div className="space-y-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">Old Regime</h4>
                          <div className="text-sm space-y-1">
                            <div>Gross Income: ₹20,00,000</div>
                            <div>All Deductions: ₹3,00,000</div>
                            <div>Taxable Income: ₹17,00,000</div>
                            <div className="font-bold text-blue-600">Tax: ₹3,12,500</div>
                          </div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">New Regime</h4>
                          <div className="text-sm space-y-1">
                            <div>Gross Income: ₹20,00,000</div>
                            <div>Standard Deduction: ₹75,000</div>
                            <div>Taxable Income: ₹19,25,000</div>
                            <div className="font-bold text-green-600">Tax: ₹3,37,500</div>
                          </div>
                        </div>
                        <div className="text-center font-bold text-lg text-blue-600">
                          Winner: Old Regime (₹25,000 saved)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decision Guide */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">🎯 Which Regime Should You Choose?</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                      <h3 className="text-xl font-bold text-blue-800 mb-4">Choose Old Regime If:</h3>
                      <div className="space-y-3 text-blue-700">
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✅</span>
                          <span>You have significant investments in 80C instruments (PPF, ELSS, etc.)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✅</span>
                          <span>You pay substantial health insurance premiums</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✅</span>
                          <span>You claim HRA exemption</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✅</span>
                          <span>You have education loan interest payments</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✅</span>
                          <span>Your total deductions exceed ₹2.5 lakh</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                      <h3 className="text-xl font-bold text-green-800 mb-4">Choose New Regime If:</h3>
                      <div className="space-y-3 text-green-700">
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✅</span>
                          <span>You don&apos;t have many tax-saving investments</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✅</span>
                          <span>You want simplicity in tax calculation</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✅</span>
                          <span>Your income is between ₹7-15 lakhs</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✅</span>
                          <span>You don&apos;t want to be tied to investment commitments</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✅</span>
                          <span>You prefer lower tax rates over deductions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] rounded-2xl p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-4">Find Your Optimal Tax Regime</h2>
                  <p className="text-lg mb-6 opacity-90">
                    Use our advanced tax calculator to compare both regimes with your exact income and investments.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => router.push('/calculation/tax')}
                      className="bg-white text-[#FF6B2C] px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Compare Tax Regimes Now
                    </button>
                    <button
                      onClick={() => router.push('/tax-planning')}
                      className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#FF6B2C] transition-all duration-300"
                    >
                      Explore Tax Planning
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