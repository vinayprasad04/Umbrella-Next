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
        <link rel="canonical" href="http://incomegrow.in//tax-planning/education-loan-80e" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-16 bg-gradient-to-br from-cyan-50 via-white to-blue-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-48 h-48 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-full border border-cyan-200 mb-6">
                <span className="text-sm font-semibold text-cyan-600">🎓 Section 80E Guide</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Education Loan Tax Benefits
                </span>
                <br />
                <span className="text-gray-800">Section 80E Guide 2025</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
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
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 border border-cyan-200">
                  <h2 className="text-3xl font-bold text-cyan-800 mb-4 flex items-center gap-3">
                    🎓 Education Loan Tax Benefits (Section 80E)
                  </h2>
                  <p className="text-lg text-cyan-700 mb-6">
                    Claim unlimited tax deduction on interest paid for education loans with no upper limit under Section 80E.
                  </p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">🔑 Key Features</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <h4 className="font-semibold text-gray-800 mb-2">No Upper Limit</h4>
                          <p className="text-sm text-gray-600">Unlike other sections, 80E has no maximum deduction limit</p>
                        </div>
                        
                        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <h4 className="font-semibold text-gray-800 mb-2">8 Year Benefit</h4>
                          <p className="text-sm text-gray-600">Available for maximum 8 years or until interest is fully paid</p>
                        </div>
                        
                        <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                          <h4 className="font-semibold text-gray-800 mb-2">Interest Only</h4>
                          <p className="text-sm text-gray-600">Only interest component is eligible, not principal repayment</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Eligibility Criteria</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <p className="text-sm text-gray-600">Loan for higher education in India or abroad</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <p className="text-sm text-gray-600">Loan for self, spouse, children, or student you maintain</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <p className="text-sm text-gray-600">Loan from approved financial institution or charity</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <p className="text-sm text-gray-600">Course should be for graduation or post-graduation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">🏦 Best Education Loan Providers</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="border-l-4 border-blue-600 pl-4">
                        <h4 className="font-semibold text-gray-800">SBI Student Loans</h4>
                        <p className="text-sm text-gray-600 mb-2">Interest: 9.05% onwards | Up to ₹1.5 crore</p>
                        <a href="https://sbi.co.in/web/personal-banking/loans/education-loans" 
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                          Apply Now
                        </a>
                      </div>
                      
                      <div className="border-l-4 border-red-600 pl-4">
                        <h4 className="font-semibold text-gray-800">HDFC Credila</h4>
                        <p className="text-sm text-gray-600 mb-2">Interest: 9.25% onwards | Quick approval</p>
                        <a href="https://www.hdfccredila.com/" 
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full hover:bg-red-200 transition-colors">
                          Apply Now
                        </a>
                      </div>
                      
                      <div className="border-l-4 border-green-600 pl-4">
                        <h4 className="font-semibold text-gray-800">Axis Bank Education Loan</h4>
                        <p className="text-sm text-gray-600 mb-2">Interest: 9.15% onwards | Online processing</p>
                        <a href="https://www.axisbank.com/personal/loans/education-loan" 
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                          Apply Now
                        </a>
                      </div>
                      
                      <div className="border-l-4 border-purple-600 pl-4">
                        <h4 className="font-semibold text-gray-800">ICICI Bank Education Loan</h4>
                        <p className="text-sm text-gray-600 mb-2">Interest: 9.50% onwards | Digital platform</p>
                        <a href="https://www.icicibank.com/personal-banking/loans/education-loan" 
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors">
                          Apply Now
                        </a>
                      </div>
                      
                      <div className="border-l-4 border-orange-600 pl-4">
                        <h4 className="font-semibold text-gray-800">Avanse Financial</h4>
                        <p className="text-sm text-gray-600 mb-2">Specialist in education loans | Flexible terms</p>
                        <a href="https://www.avanse.com/" 
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors">
                          Apply Now
                        </a>
                      </div>
                      
                      <div className="border-l-4 border-teal-600 pl-4">
                        <h4 className="font-semibold text-gray-800">Incred Education Loans</h4>
                        <p className="text-sm text-gray-600 mb-2">AI-powered approvals | Competitive rates</p>
                        <a href="https://www.incred.com/education-loan" 
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full hover:bg-teal-200 transition-colors">
                          Apply Now
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                    <h3 className="text-lg font-bold text-yellow-800 mb-3">💰 Tax Savings Example</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Annual Interest Paid: ₹2,00,000</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>30% Tax Bracket:</span>
                            <span className="font-medium text-green-600">₹60,000 saved</span>
                          </div>
                          <div className="flex justify-between">
                            <span>20% Tax Bracket:</span>
                            <span className="font-medium text-green-600">₹40,000 saved</span>
                          </div>
                          <div className="flex justify-between">
                            <span>5% Tax Bracket:</span>
                            <span className="font-medium text-green-600">₹10,000 saved</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Important Notes</h4>
                        <div className="space-y-2 text-sm text-gray-600">
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