import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Donations80G() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <>
      <Head>
        <title>Donation Tax Benefits Section 80G Guide 2025 - Charity Deductions | IncomeGrow Financial</title>
        <meta name="description" content="Complete Section 80G donation tax benefits guide 2025. Get 50-100% deduction on charity donations. Best NGOs, PM CARES Fund & donation platforms." />
        <meta name="keywords" content="Section 80G, donation, charity, tax benefits, NGO, PM CARES Fund, tax deduction, 2025, India" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="canonical" href="https://www.incomegrow.in/tax-planning/donations-80g" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-16 bg-gradient-to-br from-pink-50 via-white to-red-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-48 h-48 bg-gradient-to-r from-pink-400/10 to-red-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-r from-orange-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-50 to-red-50 rounded-full border border-pink-200 mb-6">
                <span className="text-sm font-semibold text-pink-600">❤️ Section 80G Guide</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Donation Tax Benefits
                </span>
                <br />
                <span className="text-gray-800">Section 80G Guide 2025</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Get tax deductions on charitable donations under Section 80G. Support worthy causes while saving taxes with 50-100% deduction benefits.
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
                <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-2xl p-8 border border-pink-200">
                  <h2 className="text-3xl font-bold text-pink-800 mb-4 flex items-center gap-3">
                    ❤️ Donation Tax Benefits (Section 80G)
                  </h2>
                  <p className="text-lg text-pink-700 mb-6">
                    Support charitable causes and save taxes with donations eligible for 50% to 100% deduction under Section 80G.
                  </p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">🏛️ Government Funds (100% Deduction)</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <h4 className="font-semibold text-gray-800 mb-2">PM CARES Fund</h4>
                          <p className="text-sm text-gray-600 mb-3">100% deduction | Disaster relief & emergency response</p>
                          <a href="https://www.pmcares.gov.in/en/" 
                             target="_blank" rel="noopener noreferrer"
                             className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors">
                            Donate Now →
                          </a>
                        </div>
                        
                        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <h4 className="font-semibold text-gray-800 mb-2">Prime Minister&apos;s National Relief Fund</h4>
                          <p className="text-sm text-gray-600 mb-3">100% deduction | Natural calamity relief</p>
                          <a href="https://pmnrf.gov.in/" 
                             target="_blank" rel="noopener noreferrer"
                             className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
                            Donate Now →
                          </a>
                        </div>
                        
                        <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                          <h4 className="font-semibold text-gray-800 mb-2">Swachh Bharat Kosh</h4>
                          <p className="text-sm text-gray-600 mb-3">100% deduction | Clean India mission</p>
                          <a href="https://swachhbharatkosh.gov.in/" 
                             target="_blank" rel="noopener noreferrer"
                             className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
                            Donate Now →
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-xl font-bold text-gray-800 mb-6">🏥 Healthcare & Medical NGOs (50% Deduction)</h3>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div className="border-l-4 border-red-500 pl-4">
                          <h4 className="font-semibold text-gray-800">Tata Memorial Hospital</h4>
                          <p className="text-sm text-gray-600 mb-2">Cancer research & treatment</p>
                          <a href="https://tmc.gov.in/tmh/donations" 
                             target="_blank" rel="noopener noreferrer"
                             className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full hover:bg-red-200 transition-colors">
                            Donate
                          </a>
                        </div>
                        
                        <div className="border-l-4 border-pink-500 pl-4">
                          <h4 className="font-semibold text-gray-800">St. Jude India ChildCare</h4>
                          <p className="text-sm text-gray-600 mb-2">Childhood cancer support</p>
                          <a href="https://www.stjudeindia.org/donate/" 
                             target="_blank" rel="noopener noreferrer"
                             className="text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full hover:bg-pink-200 transition-colors">
                            Donate
                          </a>
                        </div>
                        
                        <div className="border-l-4 border-purple-500 pl-4">
                          <h4 className="font-semibold text-gray-800">CRY - Child Rights and You</h4>
                          <p className="text-sm text-gray-600 mb-2">Child welfare & education</p>
                          <a href="https://www.cry.org/donate" 
                             target="_blank" rel="noopener noreferrer"
                             className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors">
                            Donate
                          </a>
                        </div>
                        
                        <div className="border-l-4 border-green-500 pl-4">
                          <h4 className="font-semibold text-gray-800">Akshaya Patra Foundation</h4>
                          <p className="text-sm text-gray-600 mb-2">Mid-day meal program</p>
                          <a href="https://www.akshayapatra.org/donate" 
                             target="_blank" rel="noopener noreferrer"
                             className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                            Donate
                          </a>
                        </div>
                        
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-semibold text-gray-800">Smile Foundation</h4>
                          <p className="text-sm text-gray-600 mb-2">Healthcare & education</p>
                          <a href="https://www.smilefoundationindia.org/donate_now.html" 
                             target="_blank" rel="noopener noreferrer"
                             className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                            Donate
                          </a>
                        </div>
                        
                        <div className="border-l-4 border-indigo-500 pl-4">
                          <h4 className="font-semibold text-gray-800">Goonj</h4>
                          <p className="text-sm text-gray-600 mb-2">Disaster relief & rural development</p>
                          <a href="https://goonj.org/support-us/" 
                             target="_blank" rel="noopener noreferrer"
                             className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-200 transition-colors">
                            Donate
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                    <h3 className="text-lg font-bold text-yellow-800 mb-3">⚠️ Important Guidelines</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
                      <div>• Religious donations (temples, churches) get 0% deduction</div>
                      <div>• Political party donations by individuals get 0% deduction</div>
                      <div>• Always collect donation receipts for tax filing</div>
                      <div>• Verify NGO&apos;s 80G registration before donating</div>
                      <div>• Cash donations above ₹2,000 not eligible</div>
                      <div>• Some organizations have 10% of income limit</div>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-lg font-bold text-blue-800 mb-3">💰 Tax Savings Calculator</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-white p-4 rounded-lg">
                        <div className="font-semibold text-gray-800">₹10,000 Donation</div>
                        <div className="text-blue-600">30% bracket: Save ₹3,000-₹5,000</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <div className="font-semibold text-gray-800">₹25,000 Donation</div>
                        <div className="text-blue-600">30% bracket: Save ₹7,500-₹12,500</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <div className="font-semibold text-gray-800">₹50,000 Donation</div>
                        <div className="text-blue-600">30% bracket: Save ₹15,000-₹25,000</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] rounded-2xl p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-4">Give Back to Society & Save Taxes</h2>
                  <p className="text-lg mb-6 opacity-90">
                    Support meaningful causes while maximizing your Section 80G tax benefits.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://www.pmcares.gov.in/en/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-[#FF6B2C] px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Donate to PM CARES
                    </a>
                    <button
                      onClick={() => router.push('/calculation/tax')}
                      className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#FF6B2C] transition-all duration-300"
                    >
                      Calculate Tax Savings
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