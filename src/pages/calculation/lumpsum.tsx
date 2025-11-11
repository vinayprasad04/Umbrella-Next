import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Lumpsum() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [investment, setInvestment] = useState('');
  const [returnRate, setReturnRate] = useState('12');
  const [timePeriod, setTimePeriod] = useState('');
  const [result, setResult] = useState<{
    investedAmount: number;
    maturityAmount: number;
    totalReturns: number;
    returnPercentage: string;
  } | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const calculateLumpsum = () => {
    if (!investment || !returnRate || !timePeriod) return;

    const principal = parseFloat(investment);
    const rate = parseFloat(returnRate) / 100;
    const time = parseFloat(timePeriod);
    
    // Compound Interest Formula: A = P(1 + r)^t
    const maturityAmount = principal * Math.pow(1 + rate, time);
    const totalReturns = maturityAmount - principal;
    
    setResult({
      investedAmount: principal,
      maturityAmount: Math.round(maturityAmount),
      totalReturns: Math.round(totalReturns),
      returnPercentage: ((totalReturns / principal) * 100).toFixed(1)
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
        <title>Lumpsum Calculator - IncomeGrow Financial</title>
        <meta name="description" content="Calculate your lumpsum investment returns with our free online calculator. Plan your investments and see potential growth over time." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-gray-50 via-white to-green-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-full border border-green-200 mb-3 md:mb-4 lg:mb-6">
                <span className="text-sm font-semibold text-green-600">💰 Lumpsum Calculator</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Lumpsum Investment
                </span>
                <br />
                <span className="text-gray-800">Calculator</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-4 md:mb-5 lg:mb-6">
                Calculate the future value of your one-time investment and see how compound interest 
                can help grow your wealth over time.
              </p>
              
              <div className="grid grid-cols-3 gap-3 md:gap-5 lg:gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-1">Free</div>
                  <div className="text-xs md:text-sm text-gray-600">Calculator</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-1">Instant</div>
                  <div className="text-xs md:text-sm text-gray-600">Results</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-1">Accurate</div>
                  <div className="text-xs md:text-sm text-gray-600">Calculations</div>
                </div>
              </div>
            </div>
          </section>

          {/* Calculator Section */}
          <section className="py-8 md:py-12 lg:py-16 xl:py-20 bg-white relative overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
                  {/* Input Form */}
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                      Calculate Your Returns
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Investment Amount (₹)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g., 100000"
                          className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg"
                          value={investment}
                          onChange={(e) => setInvestment(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Expected Annual Return (%)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          placeholder="12"
                          className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg"
                          value={returnRate}
                          onChange={(e) => setReturnRate(e.target.value)}
                        />
                        <div className="flex gap-2 mt-3">
                          {['8', '10', '12', '15'].map(rate => (
                            <button
                              key={rate}
                              onClick={() => setReturnRate(rate)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                returnRate === rate
                                  ? 'bg-[#FF6B2C] text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {rate}%
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Investment Period (Years)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g., 10"
                          className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg"
                          value={timePeriod}
                          onChange={(e) => setTimePeriod(e.target.value)}
                        />
                        <div className="flex gap-2 mt-3">
                          {['5', '10', '15', '20'].map(period => (
                            <button
                              key={period}
                              onClick={() => setTimePeriod(period)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                timePeriod === period
                                  ? 'bg-[#FF6B2C] text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {period}Y
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <button 
                        className="w-full bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        onClick={calculateLumpsum}
                      >
                        Calculate Returns
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Results */}
                  <div className="bg-gradient-to-br from-[#FF6B2C]/10 to-[#FF8A50]/10 rounded-3xl p-8 border border-[#FF6B2C]/20">
                    <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                      Investment Summary
                    </h3>
                    
                    {result ? (
                      <div className="space-y-6">
                        <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                          <div className="text-center">
                            <div className="text-sm text-gray-600 mb-2">Maturity Amount</div>
                            <div className="text-4xl font-bold text-[#FF6B2C] mb-4">
                              ₹{result.maturityAmount.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                          <div className="bg-white/60 rounded-xl p-4">
                            <div className="text-sm text-gray-600">Invested Amount</div>
                            <div className="text-xl font-bold text-gray-800">
                              ₹{result.investedAmount.toLocaleString()}
                            </div>
                          </div>
                          
                          <div className="bg-white/60 rounded-xl p-4">
                            <div className="text-sm text-gray-600">Total Returns</div>
                            <div className="text-xl font-bold text-green-600">
                              ₹{result.totalReturns.toLocaleString()}
                            </div>
                          </div>
                          
                          <div className="bg-white/60 rounded-xl p-4">
                            <div className="text-sm text-gray-600">Return Percentage</div>
                            <div className="text-xl font-bold text-[#FF6B2C]">
                              {result.returnPercentage}%
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center pt-4">
                          <button 
                            onClick={handleGetStarted}
                            className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                          >
                            {isLoggedIn ? 'Start Investing' : 'Create Account'}
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
                          Enter your investment details to see projected returns
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-8 md:py-12 lg:py-16 xl:py-20 bg-gray-50 relative overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-6 md:mb-8 lg:mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 lg:mb-6">
                  <span className="text-gray-800">How </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Lumpsum Works
                  </span>
                </h2>

                <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                  Understand the power of compound interest with lumpsum investments
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8">
                {[
                  {
                    step: '01',
                    title: 'One-Time Investment',
                    description: 'Invest a lump sum amount at once in your chosen investment vehicle',
                    icon: '💰',
                    color: 'from-blue-400 to-blue-600'
                  },
                  {
                    step: '02',
                    title: 'Compound Growth',
                    description: 'Your money grows through compound interest over the investment period',
                    icon: '📈',
                    color: 'from-green-400 to-green-600'
                  },
                  {
                    step: '03',
                    title: 'Maturity Returns',
                    description: 'Receive your original investment plus accumulated returns at maturity',
                    icon: '🎯',
                    color: 'from-purple-400 to-purple-600'
                  }
                ].map((item, index) => (
                  <div key={index} className="group text-center">
                    <div className="relative mb-8">
                      <div className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                        <span className="text-3xl">{item.icon}</span>
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FF6B2C] text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {item.step}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 lg:mb-6">
                Start Your Investment Journey
              </h2>

              <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mb-4 md:mb-5 lg:mb-6">
                Use our calculator to plan your investments and achieve your financial goals
              </p>
              
              <button 
                onClick={handleGetStarted}
                className="group bg-white text-[#FF6B2C] px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
              >
                {isLoggedIn ? 'Start Investing' : 'Get Started Free'}
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