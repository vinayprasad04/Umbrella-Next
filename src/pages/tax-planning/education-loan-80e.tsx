import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function EducationLoan80E() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <>
      <Head>
        <title>Education Loan Tax Benefits Section 80E Guide 2025 - Interest Deduction | IncomeGrow Financial</title>
        <meta name="description" content="Complete Section 80E education loan tax benefits guide 2025. Get unlimited interest deduction on education loans. Best education loan providers & rates." />
        <meta name="keywords" content="Section 80E, education loan, tax benefits, interest deduction, student loan, higher education, 2025, India" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="canonical" href="https://www.incomegrow.in/tax-planning/education-loan-80e" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-16 bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-48 h-48 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-full border border-cyan-200 dark:border-cyan-700 mb-6 transition-colors duration-300">
                <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">🎓 Section 80E Guide</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Education Loan Tax Benefits
                </span>
                <br />
                <span className="text-gray-800 dark:text-gray-100">Section 80E Guide 2025</span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8 transition-colors duration-300">
                Get unlimited tax deduction on education loan interest under Section 80E. Complete guide to student loan benefits, eligibility, and best providers.
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
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
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
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-cyan-200 dark:border-cyan-700 transition-colors duration-300">
                  <h2 className="text-3xl font-bold text-cyan-800 dark:text-cyan-400 mb-4 flex items-center gap-3 transition-colors duration-300">
                    🎓 Education Loan Tax Benefits (Section 80E)
                  </h2>
                  <p className="text-lg text-cyan-700 dark:text-cyan-300 mb-6 transition-colors duration-300">
                    Claim unlimited tax deduction on interest paid for education loans with no upper limit under Section 80E.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md transition-colors duration-300">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">🔑 Key Features</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500 dark:border-green-600 transition-colors duration-300">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300">No Upper Limit</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Unlike other sections, 80E has no maximum deduction limit</p>
                        </div>

                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500 dark:border-blue-600 transition-colors duration-300">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300">8 Year Benefit</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Available for maximum 8 years or until interest is fully paid</p>
                        </div>

                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500 dark:border-purple-600 transition-colors duration-300">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300">Interest Only</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Only interest component is eligible, not principal repayment</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md transition-colors duration-300">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">📋 Eligibility Criteria</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Loan for higher education in India or abroad</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Loan for self, spouse, children, or student you maintain</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Loan from approved financial institution or charity</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Course should be for graduation or post-graduation</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md transition-colors duration-300">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 transition-colors duration-300">🏦 Best Education Loan Providers</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="border-l-4 border-blue-600 pl-4">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">SBI Student Loans</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">Interest: 9.05% onwards | Up to ₹1.5 crore</p>
                        <a href="https://sbi.co.in/web/personal-banking/loans/education-loans"
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                          Apply Now
                        </a>
                      </div>

                      <div className="border-l-4 border-red-600 pl-4">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">HDFC Credila</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">Interest: 9.25% onwards | Quick approval</p>
                        <a href="https://www.hdfccredila.com/"
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-1 rounded-full hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
                          Apply Now
                        </a>
                      </div>

                      <div className="border-l-4 border-green-600 pl-4">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">Axis Bank Education Loan</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">Interest: 9.15% onwards | Online processing</p>
                        <a href="https://www.axisbank.com/personal/loans/education-loan"
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                          Apply Now
                        </a>
                      </div>

                      <div className="border-l-4 border-purple-600 pl-4">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">ICICI Bank Education Loan</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">Interest: 9.50% onwards | Digital platform</p>
                        <a href="https://www.icicibank.com/personal-banking/loans/education-loan"
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-3 py-1 rounded-full hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                          Apply Now
                        </a>
                      </div>

                      <div className="border-l-4 border-orange-600 pl-4">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">Avanse Financial</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">Specialist in education loans | Flexible terms</p>
                        <a href="https://www.avanse.com/"
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-3 py-1 rounded-full hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors">
                          Apply Now
                        </a>
                      </div>

                      <div className="border-l-4 border-teal-600 pl-4">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">Incred Education Loans</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">AI-powered approvals | Competitive rates</p>
                        <a href="https://www.incred.com/education-loan"
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 px-3 py-1 rounded-full hover:bg-teal-200 dark:hover:bg-teal-900/50 transition-colors">
                          Apply Now
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-700 transition-colors duration-300">
                    <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-300 mb-3 transition-colors duration-300">💰 Tax Savings Example</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300">Annual Interest Paid: ₹2,00,000</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">30% Tax Bracket:</span>
                            <span className="font-medium text-green-600 dark:text-green-400 transition-colors duration-300">₹60,000 saved</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">20% Tax Bracket:</span>
                            <span className="font-medium text-green-600 dark:text-green-400 transition-colors duration-300">₹40,000 saved</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">5% Tax Bracket:</span>
                            <span className="font-medium text-green-600 dark:text-green-400 transition-colors duration-300">₹10,000 saved</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300">Important Notes</h4>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                          <div>• No limit on deduction amount</div>
                          <div>• Available for first 8 years only</div>
                          <div>• Interest certificate from bank required</div>
                          <div>• Cannot claim if loan is repaid early</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] rounded-2xl p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-4">Fund Your Education & Save Taxes</h2>
                  <p className="text-lg mb-6 opacity-90">
                    Get the best education loan rates and maximize your Section 80E tax benefits.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://sbi.co.in/web/personal-banking/loans/education-loans"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-[#FF6B2C] px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Apply for Education Loan
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