import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Section80C() {
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
        <title>Section 80C Tax Savings Guide 2025 - Save ₹46,800 Annually | IncomeGrow Financial</title>
        <meta name="description" content="Complete Section 80C tax savings guide for 2025. Learn about PPF, ELSS, EPF, NSC investments. Save up to ₹46,800 with ₹1.5L deductions. Expert tips & best platforms." />
        <meta name="keywords" content="Section 80C, tax savings, PPF, ELSS, EPF, NSC, tax deduction, investment, 2025, India" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="canonical" href="https://www.incomegrow.in/tax-planning/section-80c" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-900/20 dark:via-gray-900 dark:to-indigo-900/20 overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-48 h-48 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full border border-blue-200 dark:border-blue-700 mb-6 transition-colors duration-300">
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 transition-colors duration-300">💰 Section 80C Guide</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight transition-colors duration-300">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Section 80C Tax Savings
                </span>
                <br />
                <span className="text-gray-800 dark:text-gray-100 transition-colors duration-300">Complete Guide 2025</span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8 transition-colors duration-300">
                Save up to ₹46,800 annually with Section 80C investments. Complete guide to PPF, ELSS, EPF, NSC and best investment platforms for maximum tax benefits.
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
                  className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  View All Tax Tips
                </button>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-700 transition-colors duration-300">
                  <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-3 transition-colors duration-300">
                    💰 Section 80C Investments
                  </h2>
                  <p className="text-lg text-blue-700 dark:text-blue-400 mb-6 transition-colors duration-300">
                    Save up to ₹46,800 annually by investing ₹1.5 lakhs in tax-saving instruments under Section 80C.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-colors duration-300">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">🏦 Bank/Government Options</h3>
                      <div className="space-y-4">
                        <div className="border-l-4 border-green-500 dark:border-green-600 pl-4 transition-colors duration-300">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">Public Provident Fund (PPF)</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">Lock-in: 15 years | Returns: 7.1% (tax-free)</p>
                          <div className="flex gap-2">
                            <a href="https://www.sbi.co.in/web/personal-banking/investments/government-schemes/public-provident-fund"
                               target="_blank" rel="noopener noreferrer"
                               className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                              SBI PPF
                            </a>
                            <a href="https://www.hdfcbank.com/personal/save/accounts/public-provident-fund"
                               target="_blank" rel="noopener noreferrer"
                               className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                              HDFC PPF
                            </a>
                          </div>
                        </div>

                        <div className="border-l-4 border-orange-500 dark:border-orange-600 pl-4 transition-colors duration-300">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">Employee Provident Fund (EPF)</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">Auto-deducted | Returns: 8.25% (tax-free)</p>
                          <a href="https://www.epfindia.gov.in/"
                             target="_blank" rel="noopener noreferrer"
                             className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-3 py-1 rounded-full hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors">
                            EPF Portal
                          </a>
                        </div>

                        <div className="border-l-4 border-purple-500 dark:border-purple-600 pl-4 transition-colors duration-300">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">National Savings Certificate (NSC)</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">Lock-in: 5 years | Returns: 6.8%</p>
                          <a href="https://www.indiapost.gov.in/VAS/Pages/NSC.aspx"
                             target="_blank" rel="noopener noreferrer"
                             className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-3 py-1 rounded-full hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                            India Post NSC
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-colors duration-300">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 transition-colors duration-300">📈 Market-Linked Options</h3>
                      
                      {/* Featured Investment Platforms */}
                      <div className="mb-6 space-y-4">
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl border-2 border-blue-200 dark:border-blue-700 transition-colors duration-300">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 transition-colors duration-300">Groww</h4>
                            <span className="text-xs bg-blue-500 dark:bg-blue-600 text-white px-2 py-1 rounded-full font-semibold transition-colors duration-300">PARTNER</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 transition-colors duration-300">₹0 commission on ELSS | 500+ mutual funds | Easy SIP</p>
                          <a href="https://groww.in/mutual-funds/category/elss" 
                             target="_blank" rel="noopener noreferrer"
                             className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                            Invest in ELSS →
                          </a>
                        </div>


                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl border-2 border-green-200 dark:border-green-700 transition-colors duration-300">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 transition-colors duration-300">Zerodha Coin</h4>
                            <span className="text-xs bg-green-500 dark:bg-green-600 text-white px-2 py-1 rounded-full font-semibold transition-colors duration-300">PARTNER</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 transition-colors duration-300">₹0 commission on direct plans | Research tools | Portfolio tracker</p>
                          <a href="https://coin.zerodha.com/funds/elss" 
                             target="_blank" rel="noopener noreferrer"
                             className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                            Start ELSS Investment →
                          </a>
                        </div>
                      </div>


                      <div className="space-y-4">
                        <div className="border-l-4 border-green-600 dark:border-green-500 pl-4 transition-colors duration-300">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">Equity Linked Savings Scheme (ELSS)</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">Lock-in: 3 years | Returns: 10-15% potential</p>
                          <div className="flex gap-2 flex-wrap">
                            <a href="https://www.axismf.com/schemes/equity-schemes/axis-long-term-equity-fund"
                               target="_blank" rel="noopener noreferrer"
                               className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                              Axis ELSS
                            </a>
                            <a href="https://www.icicipruamc.com/mutual-fund/equity-funds/icici-prudential-long-term-equity-fund"
                               target="_blank" rel="noopener noreferrer"
                               className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                              ICICI ELSS
                            </a>
                            <a href="https://www.sbimf.com/schemes/equity-schemes/sbi-long-term-equity-fund"
                               target="_blank" rel="noopener noreferrer"
                               className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                              SBI ELSS
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-700 transition-colors duration-300">
                    <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-300 mb-3 transition-colors duration-300">💡 Pro Tips for 80C Planning</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700 dark:text-yellow-400 transition-colors duration-300">
                      <div>• Start early in the financial year for better planning</div>
                      <div>• Mix high-return (ELSS) with safe options (PPF)</div>
                      <div>• Consider lock-in periods before investing</div>
                      <div>• ELSS has the shortest lock-in of just 3 years</div>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] rounded-2xl p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-4">Ready to Start Your Tax Savings Journey?</h2>
                  <p className="text-lg mb-6 opacity-90">
                    Use our tax calculator to see exactly how much you can save with Section 80C investments.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => router.push('/calculation/tax')}
                      className="bg-white text-[#FF6B2C] px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Calculate My Tax Savings
                    </button>
                    <button
                      onClick={handleGetStarted}
                      className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#FF6B2C] transition-all duration-300"
                    >
                      {isLoggedIn ? 'Get Expert Advice' : 'Get Started Free'}
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