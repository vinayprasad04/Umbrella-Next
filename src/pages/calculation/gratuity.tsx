import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function GratuityCalculator() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastSalary, setLastSalary] = useState('');
  const [yearsOfService, setYearsOfService] = useState('');
  const [result, setResult] = useState<{
    lastSalary: number;
    yearsOfService: number;
    gratuity: number;
    eligibility: string;
    basicSalary: number;
    da: number;
    commission: number;
    monthlyAverage: number;
  } | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const calculateGratuity = () => {
    if (!lastSalary || !yearsOfService) return;

    const salary = parseFloat(lastSalary);
    const years = parseFloat(yearsOfService);
    
    if (salary <= 0 || years <= 0) return;

    // Gratuity calculation formula: (Last salary × 15 × Number of years) / 26
    // Last salary includes: Basic Salary + DA + Commission (if any)
    const gratuity = (salary * 15 * years) / 26;
    
    // Maximum gratuity limit as per Payment of Gratuity Act (₹20 lakhs)
    const maxGratuity = 2000000;
    const finalGratuity = Math.min(gratuity, maxGratuity);
    
    // Calculate components (assuming typical salary structure)
    const basicSalary = salary * 0.5; // 50% basic
    const da = salary * 0.3; // 30% DA
    const commission = salary * 0.2; // 20% other allowances
    
    setResult({
      lastSalary: salary,
      yearsOfService: years,
      gratuity: Math.round(finalGratuity),
      eligibility: years >= 5 ? 'Eligible for Gratuity' : 'Not Eligible (Minimum 5 years service required)',
      basicSalary: Math.round(basicSalary),
      da: Math.round(da),
      commission: Math.round(commission),
      monthlyAverage: Math.round(salary)
    });
  };

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
        <title>Gratuity Calculator - IncomeGrow Financial</title>
        <meta name="description" content="Calculate your gratuity amount based on last drawn salary and years of service. Understand gratuity eligibility and payment rules." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200 mb-8">
                <span className="text-sm font-semibold text-purple-600">💼 Gratuity Calculator</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Gratuity
                </span>
                <br />
                <span className="text-gray-800">Calculator</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Calculate your gratuity amount based on your last drawn salary and years of service. 
                Understand your eligibility and gratuity payment rules.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">Legal</div>
                  <div className="text-gray-600">Compliance</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">Accurate</div>
                  <div className="text-gray-600">Calculation</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">Easy</div>
                  <div className="text-gray-600">To Use</div>
                </div>
              </div>
            </div>
          </section>

          {/* Calculator Section */}
          <section className="py-24 bg-white relative overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Input Form */}
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                      Calculate Your Gratuity
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Basic salary+DA (₹)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g., 50000"
                          className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg"
                          value={lastSalary}
                          onChange={(e) => setLastSalary(e.target.value)}
                        />
                        <div className="flex gap-2 mt-3">
                          {['25000', '50000', '75000', '100000', '150000'].map(amount => (
                            <button
                              key={amount}
                              onClick={() => setLastSalary(amount)}
                              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                                lastSalary === amount
                                  ? 'bg-[#FF6B2C] text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              ₹{(parseInt(amount) / 1000).toFixed(0)}K
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          💡 Basic Salary + Dearness Allowance (monthly amount)
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Years of Service
                        </label>
                        <input
                          type="number"
                          placeholder="e.g., 10"
                          step="0.1"
                          className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg"
                          value={yearsOfService}
                          onChange={(e) => setYearsOfService(e.target.value)}
                        />
                        <div className="flex gap-2 mt-3">
                          {['5', '10', '15', '20', '25'].map(years => (
                            <button
                              key={years}
                              onClick={() => setYearsOfService(years)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                yearsOfService === years
                                  ? 'bg-[#FF6B2C] text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {years}Y
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          ⚠️ Minimum 5 years of service required for gratuity eligibility
                        </p>
                      </div>
                      
                      <button 
                        className="w-full bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        onClick={calculateGratuity}
                      >
                        Calculate Gratuity
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Results */}
                  <div className="bg-gradient-to-br from-[#FF6B2C]/10 to-[#FF8A50]/10 rounded-3xl p-8 border border-[#FF6B2C]/20">
                    <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                      Gratuity Calculation Results
                    </h3>
                    
                    {result ? (
                      <div className="space-y-6">
                        <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                          <div className="text-center">
                            <div className="text-sm text-gray-600 mb-2">Gratuity Amount</div>
                            <div className="text-4xl font-bold text-[#FF6B2C] mb-4">
                              ₹{result.gratuity.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                          <div className="bg-white/60 rounded-xl p-4">
                            <div className="text-sm text-gray-600">Basic Salary + DA</div>
                            <div className="text-xl font-bold text-gray-800">
                              ₹{result.lastSalary.toLocaleString()}/month
                            </div>
                          </div>
                          
                          <div className="bg-white/60 rounded-xl p-4">
                            <div className="text-sm text-gray-600">Years of Service</div>
                            <div className="text-xl font-bold text-blue-600">
                              {result.yearsOfService} years
                            </div>
                          </div>
                          
                          <div className="bg-white/60 rounded-xl p-4">
                            <div className="text-sm text-gray-600">Eligibility Status</div>
                            <div className={`text-xl font-bold ${result.eligibility.includes('Eligible') && !result.eligibility.includes('Not') ? 'text-green-600' : 'text-red-600'}`}>
                              {result.eligibility}
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                          <h4 className="font-semibold text-blue-800 mb-3">📊 Calculation Breakdown:</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-blue-700">Formula:</span>
                              <span className="text-blue-800 font-medium">(Basic salary+DA × 15 × Years) ÷ 26</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-blue-700">Calculation:</span>
                              <span className="text-blue-800 font-medium">
                                (₹{result.lastSalary.toLocaleString()} × 15 × {result.yearsOfService}) ÷ 26
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-blue-700">Maximum Limit:</span>
                              <span className="text-blue-800 font-medium">₹20,00,000</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                          <h4 className="font-semibold text-green-800 mb-2">💡 Important Notes:</h4>
                          <ul className="text-xs text-green-700 space-y-1">
                            <li>• Gratuity is payable after 5 years of continuous service</li>
                            <li>• Maximum gratuity limit is ₹20 lakhs as per current law</li>
                            <li>• Basic salary + DA is used for gratuity calculation</li>
                            <li>• Gratuity is tax-free up to ₹20 lakhs</li>
                            <li>• Payable on retirement, resignation, death, or disability</li>
                            <li>• Calculation formula: (Basic salary+DA) × 15 × Years of Service ÷ 26</li>
                          </ul>
                        </div>
                        
                        <div className="text-center pt-4">
                          <button 
                            onClick={handleGetStarted}
                            className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                          >
                            {isLoggedIn ? 'Get Retirement Planning' : 'Create Account'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-gray-500 text-lg">
                          Enter your salary and service years to calculate gratuity
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Gratuity Information */}
          <section className="py-24 bg-gray-50 relative overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800">Gratuity </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Rules & Benefits
                  </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Understanding gratuity eligibility, calculation method, and payment rules
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: '⏰',
                    title: 'Eligibility Period',
                    description: 'Minimum 5 years of continuous service required. Payable on retirement, resignation, death, or disablement.',
                    color: 'from-blue-400 to-blue-600'
                  },
                  {
                    icon: '💰',
                    title: 'Calculation Formula',
                    description: '(Basic Salary + DA) × 15 × Years of Service ÷ 26. Maximum limit is ₹20 lakhs.',
                    color: 'from-green-400 to-green-600'
                  },
                  {
                    icon: '📋',
                    title: 'Tax Treatment',
                    description: 'Gratuity up to ₹20 lakhs is completely tax-free in the hands of the employee.',
                    color: 'from-purple-400 to-purple-600'
                  },
                  {
                    icon: '🏢',
                    title: 'Employer Coverage',
                    description: 'Applicable to establishments with 10+ employees. Covered under Payment of Gratuity Act 1972.',
                    color: 'from-orange-400 to-orange-600'
                  },
                  {
                    icon: '📅',
                    title: 'Payment Timeline',
                    description: 'Must be paid within 30 days of becoming due. Delay attracts interest @simple rate.',
                    color: 'from-red-400 to-red-600'
                  },
                  {
                    icon: '🔒',
                    title: 'Nomination',
                    description: 'Employee can nominate family members. Essential for claims in case of death during service.',
                    color: 'from-teal-400 to-teal-600'
                  }
                ].map((item, index) => (
                  <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="drop-shadow-sm">{item.icon}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed text-center">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Plan Your Retirement Benefits
              </h2>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Get comprehensive retirement planning advice and understand all your benefits
              </p>
              
              <button 
                onClick={handleGetStarted}
                className="group bg-white text-[#FF6B2C] px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
              >
                {isLoggedIn ? 'Get Retirement Planning' : 'Get Started Free'}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}