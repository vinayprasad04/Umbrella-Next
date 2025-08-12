import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function EIM() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('60');
  const [inflationRate, setInflationRate] = useState('6');
  const [returnRate, setReturnRate] = useState('12');
  const [result, setResult] = useState<{
    yearsToRetirement: number;
    requiredCorpus: number;
    monthlyInvestment: number;
    totalInvestment: number;
    postRetirementIncome: number;
  } | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const calculateEIM = () => {
    if (!monthlyIncome || !currentAge || !retirementAge || !inflationRate || !returnRate) return;

    const income = parseFloat(monthlyIncome);
    const yearsToRetirement = parseFloat(retirementAge) - parseFloat(currentAge);
    const inflation = parseFloat(inflationRate) / 100;
    const annualReturn = parseFloat(returnRate) / 100;
    const monthlyReturn = annualReturn / 12;

    if (yearsToRetirement <= 0) {
      alert('Retirement age must be greater than current age');
      return;
    }

    // Calculate future income needed (considering inflation)
    const futureMonthlyIncome = income * Math.pow(1 + inflation, yearsToRetirement);
    
    // Assume we need 25 times annual income as corpus (4% withdrawal rule)
    const requiredCorpus = futureMonthlyIncome * 12 * 25;
    
    // Calculate monthly SIP needed to accumulate this corpus
    const totalMonths = yearsToRetirement * 12;
    const monthlyInvestment = requiredCorpus * monthlyReturn / (Math.pow(1 + monthlyReturn, totalMonths) - 1);
    const totalInvestment = monthlyInvestment * totalMonths;
    
    setResult({
      yearsToRetirement: Math.round(yearsToRetirement),
      requiredCorpus: Math.round(requiredCorpus),
      monthlyInvestment: Math.round(monthlyInvestment),
      totalInvestment: Math.round(totalInvestment),
      postRetirementIncome: Math.round(futureMonthlyIncome)
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
        <title>EIM Calculator - Umbrella Financial</title>
        <meta name="description" content="Calculate your Equity Investment Management strategy and plan for retirement with our comprehensive EIM calculator." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-indigo-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full border border-indigo-200 mb-8">
                <span className="text-sm font-semibold text-indigo-600">📈 EIM Calculator</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Equity Investment
                </span>
                <br />
                <span className="text-gray-800">Management</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Plan your retirement with our Equity Investment Management calculator. 
                Calculate how much you need to invest to maintain your lifestyle after retirement.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">Retirement</div>
                  <div className="text-gray-600">Planning</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">Inflation</div>
                  <div className="text-gray-600">Protected</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">Wealth</div>
                  <div className="text-gray-600">Creation</div>
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
                      Plan Your Retirement
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Current Monthly Income (₹)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g., 50000"
                          className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg"
                          value={monthlyIncome}
                          onChange={(e) => setMonthlyIncome(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Current Age (Years)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g., 30"
                          className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg"
                          value={currentAge}
                          onChange={(e) => setCurrentAge(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Retirement Age (Years)
                        </label>
                        <input
                          type="number"
                          placeholder="60"
                          className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg"
                          value={retirementAge}
                          onChange={(e) => setRetirementAge(e.target.value)}
                        />
                        <div className="flex gap-2 mt-3">
                          {['55', '60', '65', '70'].map(age => (
                            <button
                              key={age}
                              onClick={() => setRetirementAge(age)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                retirementAge === age
                                  ? 'bg-[#FF6B2C] text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {age}Y
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Expected Inflation Rate (%)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          placeholder="6"
                          className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg"
                          value={inflationRate}
                          onChange={(e) => setInflationRate(e.target.value)}
                        />
                        <div className="flex gap-2 mt-3">
                          {['4', '6', '7', '8'].map(rate => (
                            <button
                              key={rate}
                              onClick={() => setInflationRate(rate)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                inflationRate === rate
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
                          {['10', '12', '15', '18'].map(rate => (
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
                      
                      <button 
                        className="w-full bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        onClick={calculateEIM}
                      >
                        Calculate Retirement Plan
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Results */}
                  <div className="bg-gradient-to-br from-[#FF6B2C]/10 to-[#FF8A50]/10 rounded-3xl p-8 border border-[#FF6B2C]/20">
                    <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                      Retirement Plan Summary
                    </h3>
                    
                    {result ? (
                      <div className="space-y-6">
                        <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                          <div className="text-center">
                            <div className="text-sm text-gray-600 mb-2">Monthly Investment Needed</div>
                            <div className="text-4xl font-bold text-[#FF6B2C] mb-4">
                              ₹{result.monthlyInvestment.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                          <div className="bg-white/60 rounded-xl p-4">
                            <div className="text-sm text-gray-600">Years to Retirement</div>
                            <div className="text-xl font-bold text-gray-800">
                              {result.yearsToRetirement} years
                            </div>
                          </div>
                          
                          <div className="bg-white/60 rounded-xl p-4">
                            <div className="text-sm text-gray-600">Required Corpus</div>
                            <div className="text-xl font-bold text-green-600">
                              ₹{result.requiredCorpus.toLocaleString()}
                            </div>
                          </div>
                          
                          <div className="bg-white/60 rounded-xl p-4">
                            <div className="text-sm text-gray-600">Total Investment</div>
                            <div className="text-xl font-bold text-blue-600">
                              ₹{result.totalInvestment.toLocaleString()}
                            </div>
                          </div>
                          
                          <div className="bg-white/60 rounded-xl p-4">
                            <div className="text-sm text-gray-600">Post-Retirement Income</div>
                            <div className="text-xl font-bold text-purple-600">
                              ₹{result.postRetirementIncome.toLocaleString()}/month
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center pt-4">
                          <button 
                            onClick={handleGetStarted}
                            className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                          >
                            {isLoggedIn ? 'Start Retirement Planning' : 'Create Account'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <p className="text-gray-500 text-lg">
                          Enter your details to see your retirement plan
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-24 bg-gray-50 relative overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800">How </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    EIM Works
                  </span>
                </h2>
                
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Strategic equity investment management for a secure retirement future
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    step: '01',
                    title: 'Assess Your Needs',
                    description: 'Calculate how much income you will need after retirement, accounting for inflation',
                    icon: '📊',
                    color: 'from-blue-400 to-blue-600'
                  },
                  {
                    step: '02',
                    title: 'Build Corpus',
                    description: 'Invest systematically in equity markets to build a retirement corpus over time',
                    icon: '💰',
                    color: 'from-green-400 to-green-600'
                  },
                  {
                    step: '03',
                    title: 'Secure Future',
                    description: 'Use the corpus to generate regular income and maintain your lifestyle post-retirement',
                    icon: '🏖️',
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
          <section className="py-24 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Secure Your Retirement Today
              </h2>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Start building your retirement corpus with systematic equity investments
              </p>
              
              <button 
                onClick={handleGetStarted}
                className="group bg-white text-[#FF6B2C] px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
              >
                {isLoggedIn ? 'Start Retirement Planning' : 'Get Started Free'}
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