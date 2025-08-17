import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Section87ARebates() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <>
      <Head>
        <title>Section 87A Tax Rebate Guide FY 2025-26 - Up to ₹12L Tax Free | Umbrella Financial</title>
        <meta name="description" content="Latest Section 87A tax rebate guide FY 2025-26. Get ₹60,000 rebate and complete tax exemption up to ₹12 lakh. Revolutionary benefits for middle class." />
        <meta name="keywords" content="Section 87A, tax rebate, ₹12500 rebate, income tax relief, low income, tax savings, 2025, India" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://umbrella.com/tax-planning/section-87a-rebates" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-16 bg-gradient-to-br from-amber-50 via-white to-yellow-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-48 h-48 bg-gradient-to-r from-amber-400/10 to-yellow-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-r from-orange-400/10 to-amber-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-full border border-amber-200 mb-6">
                <span className="text-sm font-semibold text-amber-600">💰 Section 87A Guide</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Section 87A Tax Rebate
                </span>
                <br />
                <span className="text-gray-800">FY 2025-26 Revolution</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Revolutionary update for FY 2025-26! Section 87A now provides ₹60,000 rebate and complete tax exemption up to ₹12 lakh. Middle-class taxpayers save thousands!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={() => router.push('/calculation/tax')}
                  className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Calculate Tax Rebate
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
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-8 border border-amber-200">
                  <h2 className="text-3xl font-bold text-amber-800 mb-4 flex items-center gap-3">
                    💰 Section 87A Tax Rebate
                  </h2>
                  <p className="text-lg text-amber-700 mb-6">
                    Section 87A has been revolutionized for FY 2025-26! The rebate has increased from ₹25,000 to ₹60,000, and the income limit has jumped from ₹7 lakh to ₹12 lakh, making it a game-changer for middle-class taxpayers.
                  </p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 Eligibility & Rebate Amount</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <h4 className="font-semibold text-gray-800 mb-2">Old Regime: Income up to ₹5,00,000</h4>
                          <p className="text-sm text-gray-600 mb-2">Rebate: 100% of tax or ₹12,500 (whichever is lower)</p>
                          <div className="text-xs text-green-600">💡 Effective zero tax for income ≤ ₹5L (old regime)</div>
                        </div>
                        
                        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <h4 className="font-semibold text-gray-800 mb-2">FY 2024-25: Income up to ₹7,00,000</h4>
                          <p className="text-sm text-gray-600 mb-2">Rebate: ₹25,000 (complete tax exemption up to ₹7L)</p>
                          <div className="text-xs text-blue-600">💡 Zero tax liability for income ≤ ₹7L</div>
                        </div>
                        
                        <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                          <h4 className="font-semibold text-gray-800 mb-2">🎉 FY 2025-26: Income up to ₹12,00,000</h4>
                          <p className="text-sm text-gray-600 mb-2">Rebate: ₹60,000 (complete tax exemption up to ₹12L)</p>
                          <div className="text-xs text-purple-600">🚀 Revolutionary enhancement for middle class!</div>
                        </div>
                        
                        <div className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                          <h4 className="font-semibold text-gray-800 mb-2">Marginal Relief Benefits</h4>
                          <p className="text-sm text-gray-600 mb-2">For income slightly above ₹12L, tax limited to excess amount</p>
                          <div className="text-xs text-emerald-600">💡 Prevents sudden tax jumps beyond threshold</div>
                        </div>
                        
                        <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                          <h4 className="font-semibold text-gray-800 mb-2">Important Note</h4>
                          <p className="text-sm text-gray-600">Only individual taxpayers eligible (not HUF, companies, etc.)</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Calculation Examples</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">Example 1: Income ₹4,50,000</h4>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Gross Income:</span>
                              <span>₹4,50,000</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Less: Standard Deduction:</span>
                              <span>₹75,000</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Taxable Income:</span>
                              <span>₹3,75,000</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Tax (Old Regime):</span>
                              <span>₹6,250</span>
                            </div>
                            <div className="flex justify-between">
                              <span>87A Rebate:</span>
                              <span className="text-green-600">-₹6,250</span>
                            </div>
                            <div className="flex justify-between border-t pt-1 font-semibold">
                              <span>Final Tax:</span>
                              <span className="text-green-600">₹0</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">Example 2: Income ₹10,00,000 (FY 2025-26)</h4>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Gross Income:</span>
                              <span>₹10,00,000</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Less: Standard Deduction:</span>
                              <span>₹75,000</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Taxable Income:</span>
                              <span>₹9,25,000</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Tax Calculation:</span>
                              <span>₹52,500</span>
                            </div>
                            <div className="flex justify-between">
                              <span>87A Rebate (FY 2025-26):</span>
                              <span className="text-green-600">-₹52,500</span>
                            </div>
                            <div className="flex justify-between border-t pt-1 font-semibold">
                              <span>Final Tax:</span>
                              <span className="text-green-600">₹0</span>
                            </div>
                            <p className="text-xs text-green-600 mt-2">Complete rebate as income ≤ ₹12L (FY 2025-26)</p>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">Example 3: Income ₹12,25,000 (Marginal Relief)</h4>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Taxable Income:</span>
                              <span>₹11,50,000</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Excess above ₹12L:</span>
                              <span>₹25,000</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Tax on total income:</span>
                              <span>₹67,500</span>
                            </div>
                            <div className="flex justify-between">
                              <span>87A Rebate:</span>
                              <span className="text-green-600">-₹42,500</span>
                            </div>
                            <div className="flex justify-between border-t pt-1 font-semibold">
                              <span>Final Tax (= Excess):</span>
                              <span className="text-orange-600">₹25,000</span>
                            </div>
                            <p className="text-xs text-orange-600 mt-2">Marginal relief: Tax = excess above ₹12L</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">⚖️ Old vs New Tax Regime - Section 87A Comparison</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-gray-800 mb-3">🏛️ Old Tax Regime</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Income Limit:</span>
                            <span className="font-medium">₹5,00,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Maximum Rebate:</span>
                            <span className="font-medium">₹12,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Zero Tax Income:</span>
                            <span className="font-medium text-green-600">Up to ₹5L</span>
                          </div>
                          <p className="text-xs text-blue-600 mt-2">
                            • Available with all deductions under 80C, 80D, etc.
                            <br />• Better for those with high deduction investments
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-gray-800 mb-3">🆕 New Tax Regime</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>FY 2024-25 Limit:</span>
                            <span className="font-medium">₹7,00,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>FY 2025-26 Limit:</span>
                            <span className="font-medium text-green-600">₹12,00,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Enhanced Rebate:</span>
                            <span className="font-medium text-purple-600">₹60,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Zero Tax Income:</span>
                            <span className="font-medium text-green-600">Up to ₹12L</span>
                          </div>
                          <p className="text-xs text-green-600 mt-2">
                            • Revolutionary 71% increase in rebate limit (₹7L → ₹12L)
                            <br />• Marginal relief available beyond ₹12L
                            <br />• Massive benefit for middle-class taxpayers
                            <br />• Standard deduction ₹75,000
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                    <h3 className="text-lg font-bold text-yellow-800 mb-3">💡 Key Points to Remember</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
                      <div>• Rebate applies only to individuals, not HUF or companies</div>
                      <div>• Total income includes salary, house property, business income</div>
                      <div>• Rebate calculated on total income after all deductions</div>
                      <div>• Cannot claim if opting for presumptive taxation</div>
                      <div>• Senior citizens (60+) not eligible for enhanced rebate</div>
                      <div>• Rebate automatically calculated in ITR filing</div>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-lg font-bold text-blue-800 mb-3">📋 How to Claim Section 87A Rebate</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Salaried Employees</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div>1. Employer automatically calculates during salary processing</div>
                          <div>2. Reflects in Form 16 issued by employer</div>
                          <div>3. No separate application required</div>
                          <div>4. Verify in salary slips and Form 16</div>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Self-Employed/Business</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div>1. Calculate total income for the year</div>
                          <div>2. Apply rebate if income ≤ ₹5L (old) or ₹7L (new)</div>
                          <div>3. Claim while filing ITR</div>
                          <div>4. Rebate auto-calculated by ITR software</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] rounded-2xl p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-4">Maximize Your Section 87A Benefits</h2>
                  <p className="text-lg mb-6 opacity-90">
                    Use our tax calculator to determine your exact rebate amount and choose the best tax regime.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => router.push('/calculation/tax')}
                      className="bg-white text-[#FF6B2C] px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Calculate Your Rebate
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