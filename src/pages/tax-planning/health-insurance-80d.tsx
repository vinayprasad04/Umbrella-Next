import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function HealthInsurance80D() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

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
        <title>Health Insurance Tax Benefits Section 80D Guide 2025 - Save ₹1 Lakh | IncomeGrow Financial</title>
        <meta name="description" content="Complete Section 80D health insurance tax benefits guide 2025. Save up to ₹1 lakh on health insurance premiums. Best insurance providers & tax calculator." />
        <meta name="keywords" content="Section 80D, health insurance, tax benefits, medical insurance, tax deduction, 2025, India, premium" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="canonical" href="https://www.incomegrow.in/tax-planning/health-insurance-80d" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-16 bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-48 h-48 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-green-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200 mb-6">
                <span className="text-sm font-semibold text-green-600">🏥 Section 80D Guide</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Health Insurance Tax Benefits
                </span>
                <br />
                <span className="text-gray-800">Section 80D Guide 2025</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Save up to ₹1 lakh annually on health insurance premiums under Section 80D. Complete guide to medical insurance tax benefits, limits, and best providers.
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
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
                  <h2 className="text-3xl font-bold text-green-800 mb-4 flex items-center gap-3">
                    🏥 Health Insurance Tax Benefits (Section 80D)
                  </h2>
                  <p className="text-lg text-green-700 mb-6">
                    Get tax deductions up to ₹1 lakh on health insurance premiums for self, family, and parents.
                  </p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-white rounded-xl p-6 shadow-md">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">👨‍👩‍👧‍👦 Self & Family Coverage</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                            <span className="font-medium">Below 60 years</span>
                            <span className="font-bold text-blue-600">₹25,000</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                            <span className="font-medium">60+ years (Senior Citizen)</span>
                            <span className="font-bold text-orange-600">₹50,000</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-xl p-6 shadow-md">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">👴👵 Parents Coverage</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                            <span className="font-medium">Additional for Parents</span>
                            <span className="font-bold text-purple-600">₹50,000</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            💡 This is over and above the self/family limit, making total possible deduction ₹1,00,000
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-xl font-bold text-gray-800 mb-6">🏥 Best Health Insurance Options</h3>
                      
                      {/* Featured Partner - PolicyBazaar */}
                      <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-lg text-gray-800">PolicyBazaar</h4>
                          <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full font-semibold">PARTNER</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Compare 45+ insurers | Get best quotes | Expert guidance</p>
                        <a href="https://www.policybazaar.com/health-insurance/" 
                           target="_blank" rel="noopener noreferrer"
                           className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                          Compare & Buy Now →
                        </a>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="border-l-4 border-red-500 pl-4">
                          <h4 className="font-semibold text-gray-800">Star Health Insurance</h4>
                          <p className="text-sm text-gray-600 mb-2">Comprehensive health coverage specialist</p>
                          <a href="https://www.starhealth.in/" 
                             target="_blank" rel="noopener noreferrer"
                             className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full hover:bg-red-200 transition-colors">
                            Get Quote
                          </a>
                        </div>
                        
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-semibold text-gray-800">HDFC ERGO Health</h4>
                          <p className="text-sm text-gray-600 mb-2">Wide network and cashless facilities</p>
                          <a href="https://www.hdfcergo.com/health-insurance" 
                             target="_blank" rel="noopener noreferrer"
                             className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                            Get Quote
                          </a>
                        </div>
                        
                        <div className="border-l-4 border-green-500 pl-4">
                          <h4 className="font-semibold text-gray-800">ICICI Lombard Health</h4>
                          <p className="text-sm text-gray-600 mb-2">Digital-first health insurance</p>
                          <a href="https://www.icicilombard.com/health-insurance" 
                             target="_blank" rel="noopener noreferrer"
                             className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                            Get Quote
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-lg font-bold text-blue-800 mb-3">💰 Tax Savings Calculator</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-white p-4 rounded-lg">
                        <div className="font-semibold text-gray-800">30% Tax Bracket</div>
                        <div className="text-blue-600">Save up to ₹30,000</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <div className="font-semibold text-gray-800">20% Tax Bracket</div>
                        <div className="text-blue-600">Save up to ₹20,000</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <div className="font-semibold text-gray-800">5% Tax Bracket</div>
                        <div className="text-blue-600">Save up to ₹5,000</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] rounded-2xl p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-4">Protect Your Family & Save Taxes</h2>
                  <p className="text-lg mb-6 opacity-90">
                    Get the best health insurance quotes and maximize your Section 80D tax benefits.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://www.policybazaar.com/health-insurance/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-[#FF6B2C] px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Compare Health Insurance
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