import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function HomeLoanBenefits() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <>
      <Head>
        <title>Home Loan Tax Benefits Guide 2025 - Save ₹3.5 Lakh Annually | IncomeGrow Financial</title>
        <meta name="description" content="Complete home loan tax benefits guide 2025. Section 80C & 24B deductions. Save up to ₹3.5 lakh on principal & interest. Best home loan providers & rates." />
        <meta name="keywords" content="home loan, tax benefits, Section 80C, Section 24B, principal repayment, interest deduction, 2025, India" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="canonical" href="https://www.incomegrow.in/tax-planning/home-loan-benefits" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-16 bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-48 h-48 bg-gradient-to-r from-orange-400/10 to-red-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-r from-red-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 rounded-full border border-orange-200 dark:border-orange-700 mb-6 transition-colors duration-300">
                <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">🏠 Home Loan Tax Guide</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Home Loan Tax Benefits
                </span>
                <br />
                <span className="text-gray-800 dark:text-gray-100 transition-colors duration-300">Complete Guide 2025</span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8 transition-colors duration-300">
                Maximize your home loan tax benefits with principal and interest deductions up to ₹3.5 lakhs annually. Complete guide to Section 80C & 24B benefits.
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
                <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-8 border border-orange-200 dark:border-orange-700 transition-colors duration-300">
                  <h2 className="text-3xl font-bold text-orange-800 dark:text-orange-400 mb-4 flex items-center gap-3 transition-colors duration-300">
                    🏠 Home Loan Tax Benefits
                  </h2>
                  <p className="text-lg text-orange-700 dark:text-orange-300 mb-6 transition-colors duration-300">
                    Maximize your home loan tax benefits with principal and interest deductions up to ₹3.5 lakhs annually.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md transition-colors duration-300">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">📋 Tax Deduction Breakdown</h3>
                      <div className="space-y-4">
                        <div className="border-l-4 border-blue-500 dark:border-blue-600 pl-4 transition-colors duration-300">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">Principal Repayment (Section 80C)</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">Up to ₹1.5 lakh (part of overall 80C limit)</p>
                          <div className="text-xs text-blue-600 dark:text-blue-400 transition-colors duration-300">💡 Shares the ₹1.5L limit with other 80C investments</div>
                        </div>

                        <div className="border-l-4 border-green-500 dark:border-green-600 pl-4 transition-colors duration-300">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">Interest Payment (Section 24B)</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">Up to ₹2 lakh for self-occupied property</p>
                          <div className="text-xs text-green-600 dark:text-green-400 transition-colors duration-300">💡 Separate limit, not part of 80C</div>
                        </div>

                        <div className="border-l-4 border-purple-500 dark:border-purple-600 pl-4 transition-colors duration-300">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">Let-out Property Interest</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">No limit on interest deduction</p>
                          <div className="text-xs text-purple-600 dark:text-purple-400 transition-colors duration-300">💡 Full interest deductible from rental income</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md transition-colors duration-300">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">🏦 Best Home Loan Providers</h3>
                      <div className="space-y-4">
                        <div className="border-l-4 border-blue-600 pl-4">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">SBI Home Loans</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">Starting from 8.50% | Tenure up to 30 years</p>
                          <a href="https://sbi.co.in/web/personal-banking/loans/home-loans"
                             target="_blank" rel="noopener noreferrer"
                             className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                            Apply Now
                          </a>
                        </div>

                        <div className="border-l-4 border-red-600 pl-4">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">HDFC Home Loans</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">Starting from 8.60% | Quick processing</p>
                          <a href="https://www.hdfc.com/home-loans"
                             target="_blank" rel="noopener noreferrer"
                             className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-1 rounded-full hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
                            Apply Now
                          </a>
                        </div>

                        <div className="border-l-4 border-green-600 pl-4">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">ICICI Bank Home Loans</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">Starting from 8.75% | Digital processing</p>
                          <a href="https://www.icicibank.com/personal-banking/loans/home-loan"
                             target="_blank" rel="noopener noreferrer"
                             className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                            Apply Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-700 transition-colors duration-300">
                    <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-300 mb-3 transition-colors duration-300">📊 Tax Savings Example</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300">Scenario: ₹50L Home Loan</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Principal Repayment:</span>
                            <span className="font-medium text-gray-800 dark:text-gray-100 transition-colors duration-300">₹1,50,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Interest Payment:</span>
                            <span className="font-medium text-gray-800 dark:text-gray-100 transition-colors duration-300">₹2,00,000</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">Total Deduction:</span>
                            <span className="font-bold text-orange-600 dark:text-orange-400 transition-colors duration-300">₹3,50,000</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300">Tax Savings (30% bracket)</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">On Principal:</span>
                            <span className="font-medium text-gray-800 dark:text-gray-100 transition-colors duration-300">₹45,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">On Interest:</span>
                            <span className="font-medium text-gray-800 dark:text-gray-100 transition-colors duration-300">₹60,000</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">Total Savings:</span>
                            <span className="font-bold text-green-600 dark:text-green-400 transition-colors duration-300">₹1,05,000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] rounded-2xl p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-4">Ready to Buy Your Dream Home?</h2>
                  <p className="text-lg mb-6 opacity-90">
                    Get the best home loan rates and maximize your tax benefits with our expert guidance.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://sbi.co.in/web/personal-banking/loans/home-loans"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-[#FF6B2C] px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Apply for Home Loan
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