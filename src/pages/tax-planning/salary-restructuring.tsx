import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function SalaryRestructuring() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <>
      <Head>
        <title>Salary Restructuring for Tax Savings Guide 2025 - HRA LTA Allowances | Umbrella Financial</title>
        <meta name="description" content="Complete salary restructuring guide 2025. Maximize tax savings with HRA, LTA, food allowance, conveyance. Expert tips to reduce tax liability legally." />
        <meta name="keywords" content="salary restructuring, HRA, LTA, tax savings, allowances, conveyance, food allowance, tax planning, 2025" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://umbrella.com/tax-planning/salary-restructuring" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-16 bg-gradient-to-br from-violet-50 via-white to-purple-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-48 h-48 bg-gradient-to-r from-violet-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-violet-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-violet-50 to-purple-50 rounded-full border border-violet-200 mb-6">
                <span className="text-sm font-semibold text-violet-600">💼 Salary Planning Guide</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Salary Restructuring
                </span>
                <br />
                <span className="text-gray-800">Tax Optimization Guide 2025</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Restructure your salary to maximize tax savings with HRA, LTA, allowances, and perks. Save thousands with strategic salary planning.
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
                <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-8 border border-violet-200">
                  <h2 className="text-3xl font-bold text-violet-800 mb-4 flex items-center gap-3">
                    💼 Salary Restructuring for Tax Savings
                  </h2>
                  <p className="text-lg text-violet-700 mb-6">
                    Optimize your salary structure to reduce taxable income through strategic allocation of allowances and perks.
                  </p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">🏠 House Rent Allowance (HRA)</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <h4 className="font-semibold text-gray-800 mb-2">HRA Exemption Limit</h4>
                          <p className="text-sm text-gray-600 mb-2">Minimum of:</p>
                          <div className="text-xs text-blue-600 space-y-1">
                            <div>• Actual HRA received</div>
                            <div>• 50% of salary (metro) / 40% (non-metro)</div>
                            <div>• Actual rent paid - 10% of salary</div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <h4 className="font-semibold text-gray-800 mb-2">Optimization Strategy</h4>
                          <p className="text-sm text-gray-600">Increase HRA component in salary package to maximize exemption</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">✈️ Leave Travel Allowance (LTA)</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                          <h4 className="font-semibold text-gray-800 mb-2">LTA Benefits</h4>
                          <p className="text-sm text-gray-600 mb-2">Exemption for domestic travel expenses</p>
                          <div className="text-xs text-purple-600">💡 2 journeys in a block of 4 years</div>
                        </div>
                        
                        <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                          <h4 className="font-semibold text-gray-800 mb-2">Recent Update</h4>
                          <p className="text-sm text-gray-600">Can be encashed for tax benefit if not used during COVID period</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">🎯 Tax-Free Allowances & Perks</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-gray-800 mb-2">🍽️ Food Allowance</h4>
                        <p className="text-sm text-gray-600 mb-2">Up to ₹50 per meal</p>
                        <div className="text-xs text-green-700">• Breakfast, lunch, snacks</div>
                        <div className="text-xs text-green-700">• Must be through vouchers/cards</div>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-gray-800 mb-2">🚗 Conveyance Allowance</h4>
                        <p className="text-sm text-gray-600 mb-2">Up to ₹1,600 per month</p>
                        <div className="text-xs text-blue-700">• Travel between office & home</div>
                        <div className="text-xs text-blue-700">• ₹19,200 annually tax-free</div>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                        <h4 className="font-semibold text-gray-800 mb-2">📱 Communication Allowance</h4>
                        <p className="text-sm text-gray-600 mb-2">Mobile & internet bills</p>
                        <div className="text-xs text-purple-700">• Actual bills or fixed amount</div>
                        <div className="text-xs text-purple-700">• Company reimbursement</div>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                        <h4 className="font-semibold text-gray-800 mb-2">🏥 Medical Reimbursement</h4>
                        <p className="text-sm text-gray-600 mb-2">Up to ₹15,000 annually</p>
                        <div className="text-xs text-yellow-700">• Actual medical bills</div>
                        <div className="text-xs text-yellow-700">• Self & family members</div>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-lg border border-red-200">
                        <h4 className="font-semibold text-gray-800 mb-2">📚 Books & Periodicals</h4>
                        <p className="text-sm text-gray-600 mb-2">Up to ₹1,600 per month</p>
                        <div className="text-xs text-red-700">• Professional literature</div>
                        <div className="text-xs text-red-700">• Newspapers, magazines</div>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                        <h4 className="font-semibold text-gray-800 mb-2">🎓 Children Education</h4>
                        <p className="text-sm text-gray-600 mb-2">Up to ₹100 per child/month</p>
                        <div className="text-xs text-indigo-700">• Maximum 2 children</div>
                        <div className="text-xs text-indigo-700">• ₹2,400 per child annually</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                    <h3 className="text-lg font-bold text-yellow-800 mb-3">💡 Salary Restructuring Strategy</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Before Restructuring</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Basic Salary:</span>
                            <span className="font-medium">₹8,00,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax Liability:</span>
                            <span className="font-medium text-red-600">₹93,600</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">After Restructuring</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Basic + HRA + Allowances:</span>
                            <span className="font-medium">₹8,00,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax Liability:</span>
                            <span className="font-medium text-green-600">₹60,000</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="font-semibold">Savings:</span>
                            <span className="font-bold text-green-600">₹33,600</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-lg font-bold text-blue-800 mb-3">📋 Implementation Steps</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                      <div>1. Discuss with HR for salary restructuring options</div>
                      <div>2. Negotiate HRA component based on actual rent</div>
                      <div>3. Opt for maximum allowed tax-free allowances</div>
                      <div>4. Submit rent receipts and necessary documents</div>
                      <div>5. Maintain bills for reimbursement claims</div>
                      <div>6. Review and adjust annually based on tax changes</div>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] rounded-2xl p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-4">Optimize Your Salary Structure Today</h2>
                  <p className="text-lg mb-6 opacity-90">
                    Use our tax calculator to see how much you can save with smart salary restructuring.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => router.push('/calculation/tax')}
                      className="bg-white text-[#FF6B2C] px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Calculate Restructuring Benefits
                    </button>
                    <button
                      onClick={() => router.push('/tax-planning')}
                      className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#FF6B2C] transition-all duration-300"
                    >
                      Explore More Tax Tips
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