import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Goal() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [timeFrame, setTimeFrame] = useState('');
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [showCalculation, setShowCalculation] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const goalTypes = [
    { 
      id: 'home', 
      title: 'Dream Home', 
      icon: '🏠', 
      description: 'Buy your perfect home',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    { 
      id: 'car', 
      title: 'New Car', 
      icon: '🚗', 
      description: 'Purchase your dream vehicle',
      color: 'from-green-400 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    { 
      id: 'education', 
      title: 'Education', 
      icon: '🎓', 
      description: 'Fund higher education',
      color: 'from-purple-400 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    },
    { 
      id: 'marriage', 
      title: 'Marriage', 
      icon: '💍', 
      description: 'Plan your dream wedding',
      color: 'from-pink-400 to-pink-600',
      bgColor: 'from-pink-50 to-pink-100'
    },
    { 
      id: 'vacation', 
      title: 'World Tour', 
      icon: '✈️', 
      description: 'Explore the world',
      color: 'from-orange-400 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100'
    },
    { 
      id: 'retirement', 
      title: 'Retirement', 
      icon: '🏖️', 
      description: 'Secure retirement fund',
      color: 'from-indigo-400 to-indigo-600',
      bgColor: 'from-indigo-50 to-indigo-100'
    },
    { 
      id: 'business', 
      title: 'Start Business', 
      icon: '🚀', 
      description: 'Launch your startup',
      color: 'from-red-400 to-red-600',
      bgColor: 'from-red-50 to-red-100'
    },
    { 
      id: 'emergency', 
      title: 'Emergency Fund', 
      icon: '🛡️', 
      description: 'Build safety net',
      color: 'from-teal-400 to-teal-600',
      bgColor: 'from-teal-50 to-teal-100'
    }
  ];

  const handleCalculate = () => {
    if (targetAmount && timeFrame) {
      const years = parseInt(timeFrame);
      const target = parseInt(targetAmount);
      const months = years * 12;
      
      // Assuming 12% annual return (1% monthly)
      const monthlyRate = 0.01;
      const futureValue = target;
      
      // SIP calculation: PMT = FV * r / ((1 + r)^n - 1)
      const monthlyPayment = futureValue * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1);
      
      setMonthlyInvestment(Math.round(monthlyPayment).toString());
      setShowCalculation(true);
    }
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
        <title>Goal Planning - Umbrella Financial</title>
        <meta name="description" content="Plan and achieve your financial goals with Umbrella's comprehensive goal planning tools. Set targets, calculate investments, and track progress." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-[#FF6B2C]/10 to-[#FF8A50]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#FF6B2C]/10 to-[#FF8A50]/10 rounded-full border border-[#FF6B2C]/20 mb-8">
                <span className="text-sm font-semibold text-[#FF6B2C]">🎯 Financial Goal Planning</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Turn Your Dreams
                </span>
                <br />
                <span className="text-gray-800">Into Achievable Goals</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Whether it&apos;s buying your dream home, planning a world tour, or securing your retirement, 
                our goal planning tools help you create a clear roadmap to financial success.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleGetStarted}
                  className="group bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Start Planning Today
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                
                <button className="group bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 border-2 border-gray-200 rounded-xl text-lg font-semibold cursor-pointer hover:bg-white hover:shadow-lg hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-2">
                  How It Works
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* Goal Types Section */}
          <section className="py-24 bg-white relative overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200 mb-6">
                  <span className="text-sm font-semibold text-purple-600">💡 Popular Goals</span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800">Choose Your </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Financial Goal
                  </span>
                </h2>
                
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Select from our most popular financial goals or create a custom plan tailored to your dreams
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {goalTypes.map((goal, index) => (
                  <div 
                    key={index} 
                    className={`group relative bg-gradient-to-br ${goal.bgColor} backdrop-blur-sm border border-white/50 rounded-2xl p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer ${selectedGoal === goal.id ? 'ring-2 ring-[#FF6B2C] shadow-xl scale-105' : ''}`}
                    onClick={() => setSelectedGoal(goal.id)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-r ${goal.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="drop-shadow-sm">{goal.icon}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {goal.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {goal.description}
                      </p>
                      
                      {selectedGoal === goal.id && (
                        <div className="mt-3 inline-flex items-center text-sm font-semibold text-[#FF6B2C]">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Selected
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Goal Calculator Section */}
          <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-full border border-green-200 mb-6">
                  <span className="text-sm font-semibold text-green-600">📊 Goal Calculator</span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800">Calculate Your </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Investment Plan
                  </span>
                </h2>
                
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Enter your goal details and discover how much you need to invest monthly to achieve it
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Input Form */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Goal Type
                        </label>
                        <select 
                          className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300"
                          value={selectedGoal}
                          onChange={(e) => setSelectedGoal(e.target.value)}
                        >
                          <option value="">Select a goal</option>
                          {goalTypes.map(goal => (
                            <option key={goal.id} value={goal.id}>
                              {goal.icon} {goal.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Target Amount (₹)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g., 5000000"
                          className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300"
                          value={targetAmount}
                          onChange={(e) => setTargetAmount(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Time Frame (Years)
                        </label>
                        <select 
                          className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300"
                          value={timeFrame}
                          onChange={(e) => setTimeFrame(e.target.value)}
                        >
                          <option value="">Select timeframe</option>
                          <option value="1">1 Year</option>
                          <option value="2">2 Years</option>
                          <option value="3">3 Years</option>
                          <option value="5">5 Years</option>
                          <option value="7">7 Years</option>
                          <option value="10">10 Years</option>
                          <option value="15">15 Years</option>
                          <option value="20">20 Years</option>
                        </select>
                      </div>
                      
                      <button 
                        className="w-full bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        onClick={handleCalculate}
                      >
                        Calculate Investment
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Results */}
                    <div className="bg-gradient-to-br from-[#FF6B2C]/10 to-[#FF8A50]/10 rounded-2xl p-6 border border-[#FF6B2C]/20">
                      <h3 className="text-xl font-bold text-gray-800 mb-6">
                        Investment Summary
                      </h3>
                      
                      {showCalculation && targetAmount && timeFrame && monthlyInvestment ? (
                        <div className="space-y-4">
                          <div className="bg-white/60 rounded-xl p-4">
                            <div className="text-sm text-gray-600">Monthly Investment Required</div>
                            <div className="text-2xl font-bold text-[#FF6B2C]">
                              ₹{parseInt(monthlyInvestment).toLocaleString()}
                            </div>
                          </div>
                          
                          <div className="bg-white/60 rounded-xl p-4">
                            <div className="text-sm text-gray-600">Target Amount</div>
                            <div className="text-xl font-bold text-gray-800">
                              ₹{parseInt(targetAmount).toLocaleString()}
                            </div>
                          </div>
                          
                          <div className="bg-white/60 rounded-xl p-4">
                            <div className="text-sm text-gray-600">Time Period</div>
                            <div className="text-xl font-bold text-gray-800">
                              {timeFrame} {parseInt(timeFrame) === 1 ? 'Year' : 'Years'}
                            </div>
                          </div>
                          
                          <div className="bg-white/60 rounded-xl p-4">
                            <div className="text-sm text-gray-600">Total Investment</div>
                            <div className="text-xl font-bold text-gray-800">
                              ₹{(parseInt(monthlyInvestment) * parseInt(timeFrame) * 12).toLocaleString()}
                            </div>
                          </div>
                          
                          <div className="bg-white/60 rounded-xl p-4">
                            <div className="text-sm text-gray-600">Expected Returns*</div>
                            <div className="text-xl font-bold text-green-600">
                              ₹{(parseInt(targetAmount) - (parseInt(monthlyInvestment) * parseInt(timeFrame) * 12)).toLocaleString()}
                            </div>
                          </div>
                          
                          <div className="text-xs text-gray-500 mt-4">
                            *Assuming 12% annual returns. Actual returns may vary based on market conditions.
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-gray-500">
                            Fill in the details to see your investment plan
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-24 bg-white relative overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full border border-indigo-200 mb-6">
                  <span className="text-sm font-semibold text-indigo-600">🎯 Process</span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800">How Goal </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Planning Works
                  </span>
                </h2>
                
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Our simple 4-step process helps you create and achieve any financial goal
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    step: '01',
                    title: 'Define Your Goal',
                    description: 'Choose your financial objective and set a target amount',
                    icon: '🎯',
                    color: 'from-blue-400 to-blue-600'
                  },
                  {
                    step: '02',
                    title: 'Set Timeline',
                    description: 'Decide when you want to achieve this goal',
                    icon: '📅',
                    color: 'from-green-400 to-green-600'
                  },
                  {
                    step: '03',
                    title: 'Calculate Investment',
                    description: 'Our calculator shows you the monthly investment needed',
                    icon: '📊',
                    color: 'from-purple-400 to-purple-600'
                  },
                  {
                    step: '04',
                    title: 'Start Investing',
                    description: 'Begin your SIP and track progress towards your goal',
                    icon: '🚀',
                    color: 'from-orange-400 to-orange-600'
                  }
                ].map((item, index) => (
                  <div key={index} className="group text-center">
                    <div className="relative mb-6">
                      <div className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FF6B2C] text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {item.step}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
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
          <section className="py-24 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Start Your Financial Journey?
              </h2>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Join thousands of users who are already on their way to achieving their financial dreams with Umbrella
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleGetStarted}
                  className="group bg-white text-[#FF6B2C] px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isLoggedIn ? 'Go to Dashboard' : 'Sign Up Free'}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                
                <button className="group bg-white/20 backdrop-blur-sm text-white px-8 py-4 border-2 border-white/30 rounded-xl text-lg font-semibold cursor-pointer hover:bg-white/30 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2">
                  Contact Support
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">10,000+</div>
                  <div className="text-white/80">Goals Achieved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">₹500Cr+</div>
                  <div className="text-white/80">Dreams Funded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">98%</div>
                  <div className="text-white/80">Success Rate</div>
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