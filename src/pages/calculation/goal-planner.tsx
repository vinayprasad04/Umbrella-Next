import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { logActivity } from "@/lib/activityLogger";
import CalculatorFAQ from "@/components/CalculatorFAQ";
import { goalPlannerFAQs } from "@/components/AdditionalFAQs";

export default function GoalPlanner() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [goalAmount, setGoalAmount] = useState('');
  const [currentAge, setCurrentAge] = useState('');
  const [goalAge, setGoalAge] = useState('');
  const [returnRate, setReturnRate] = useState('12');
  const [result, setResult] = useState<{
    yearsToGoal: number;
    monthlyInvestment: number;
    totalInvestment: number;
    targetAmount: number;
  } | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const calculateGoal = () => {
    if (!goalAmount || !currentAge || !goalAge || !returnRate) return;

    const targetAmount = parseFloat(goalAmount);
    const yearsToGoal = parseFloat(goalAge) - parseFloat(currentAge);
    const annualRate = parseFloat(returnRate) / 100;
    const monthlyRate = annualRate / 12;
    const totalMonths = yearsToGoal * 12;

    if (yearsToGoal <= 0) {
      alert('Goal age must be greater than current age');
      return;
    }
    
    // Calculate monthly SIP needed: PMT = FV * r / ((1 + r)^n - 1)
    const monthlyInvestment = targetAmount * monthlyRate / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const totalInvestment = monthlyInvestment * totalMonths;
    
    setResult({
      yearsToGoal: Math.round(yearsToGoal),
      monthlyInvestment: Math.round(monthlyInvestment),
      totalInvestment: Math.round(totalInvestment),
      targetAmount: Math.round(targetAmount)
    });

    // Log calculator usage activity
    const userId = localStorage.getItem('userId') || '';
    const userEmail = localStorage.getItem('userEmail') || '';
    if (userId && userEmail) {
      logActivity({
        userId,
        userEmail,
        activityType: 'calculator_usage',
        description: 'Used goal planner calculator',
        metadata: {
          calculatorType: 'goal_planner',
          goalAmount: targetAmount,
          yearsToGoal: Math.round(yearsToGoal),
        },
      });
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
        <title>Goal Planner Calculator - Financial Goal Planning Tool | IncomeGrow</title>
        <meta name="description" content="Plan financial goals with our free calculator. Calculate monthly savings needed for retirement, education, wedding, house. Save and track your goals effectively." />
        <meta name="keywords" content="goal planner, financial goal calculator, retirement planning, education planning, investment goal calculator, savings calculator, wealth planning tool" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.incomegrow.in/calculation/goal-planner" />
        <link rel="icon" type="image/png" href="/favicon.png" />

        {/* Open Graph */}
        <meta property="og:title" content="Goal Planner - Calculate Your Financial Goals" />
        <meta property="og:description" content="Free goal planning calculator to plan retirement, education, wedding, and other financial goals. Track your progress." />
        <meta property="og:url" content="https://www.incomegrow.in/calculation/goal-planner" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.incomegrow.in/og-goal-planner.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Goal Planner Calculator - Free Tool" />
        <meta name="twitter:description" content="Plan and track your financial goals with our free calculator." />
        <meta name="twitter:image" content="https://www.incomegrow.in/og-goal-planner.png" />

        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Goal Planner Calculator",
            "description": "Free financial goal planning calculator to plan retirement, education, wedding, house, and other financial goals.",
            "url": "https://www.incomegrow.in/calculation/goal-planner",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "provider": {
              "@type": "Organization",
              "name": "IncomeGrow Financial",
              "url": "https://www.incomegrow.in"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "3124"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.incomegrow.in"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Calculators",
                "item": "https://www.incomegrow.in/calculation"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Goal Planner",
                "item": "https://www.incomegrow.in/calculation/goal-planner"
              }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": goalPlannerFAQs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-blue-400/10 dark:from-purple-600/20 dark:to-blue-600/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-green-400/10 to-purple-400/10 dark:from-green-600/20 dark:to-purple-600/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full border border-purple-200 dark:border-purple-700 mb-3 md:mb-4 lg:mb-6 transition-colors duration-300">
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">🎯 Goal Planner</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Financial Goal
                </span>
                <br />
                <span className="text-gray-800 dark:text-gray-100 transition-colors duration-300">Planner</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mb-4 md:mb-5 lg:mb-6 transition-colors duration-300">
                Plan your financial future by setting goals and calculating the exact monthly
                investment needed to achieve them within your timeline.
              </p>

              <div className="grid grid-cols-3 gap-3 md:gap-5 lg:gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1 transition-colors duration-300">Smart</div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Planning</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1 transition-colors duration-300">Goal</div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Oriented</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1 transition-colors duration-300">Time</div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Based</div>
                </div>
              </div>
            </div>
          </section>

          {/* Calculator Section */}
          <section className="py-8 md:py-12 lg:py-16 xl:py-20 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
                  {/* Input Form */}
                  <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center transition-colors duration-300">
                      Plan Your Financial Goal
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                          Goal Amount (₹)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g., 5000000"
                          className="w-full px-4 py-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400"
                          value={goalAmount}
                          onChange={(e) => setGoalAmount(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                          Current Age (Years)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g., 25"
                          className="w-full px-4 py-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400"
                          value={currentAge}
                          onChange={(e) => setCurrentAge(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                          Goal Achievement Age (Years)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g., 45"
                          className="w-full px-4 py-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400"
                          value={goalAge}
                          onChange={(e) => setGoalAge(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                          Expected Annual Return (%)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          placeholder="12"
                          className="w-full px-4 py-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400"
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
                                  ? 'bg-[#FF6B2C] text-white dark:bg-[#FF6B2C] dark:text-white'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                              }`}
                            >
                              {rate}%
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <button
                        className="w-full bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] dark:from-[#FF6B2C] dark:to-[#FF8A50] text-white px-6 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        onClick={calculateGoal}
                      >
                        Calculate Investment Plan
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-gradient-to-br from-[#FF6B2C]/10 to-[#FF8A50]/10 dark:from-[#FF6B2C]/20 dark:to-[#FF8A50]/20 rounded-3xl p-8 border border-[#FF6B2C]/20 dark:border-[#FF6B2C]/30 transition-colors duration-300">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center transition-colors duration-300">
                      Investment Plan
                    </h3>
                    
                    {result ? (
                      <div className="space-y-6">
                        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg transition-colors duration-300">
                          <div className="text-center">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-300">Monthly Investment Needed</div>
                            <div className="text-4xl font-bold text-[#FF6B2C] dark:text-[#FF8A50] mb-4 transition-colors duration-300">
                              ₹{result.monthlyInvestment.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 transition-colors duration-300">
                            <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Years to Goal</div>
                            <div className="text-xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300">
                              {result.yearsToGoal} years
                            </div>
                          </div>

                          <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 transition-colors duration-300">
                            <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Total Investment</div>
                            <div className="text-xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">
                              ₹{result.totalInvestment.toLocaleString()}
                            </div>
                          </div>

                          <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 transition-colors duration-300">
                            <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Goal Amount</div>
                            <div className="text-xl font-bold text-green-600 dark:text-green-400 transition-colors duration-300">
                              ₹{result.targetAmount.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="text-center pt-4">
                          <button
                            onClick={handleGetStarted}
                            className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] dark:from-[#FF6B2C] dark:to-[#FF8A50] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                          >
                            {isLoggedIn ? 'Save This Goal' : 'Create Free Account'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                          <svg className="w-10 h-10 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-lg transition-colors duration-300">
                          Enter your goal details to see the investment plan
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-8 md:py-12 lg:py-16 xl:py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden transition-colors duration-300">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-6 md:mb-8 lg:mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 lg:mb-6">
                  <span className="text-gray-800 dark:text-gray-100 transition-colors duration-300">How </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Goal Planning Works
                  </span>
                </h2>

                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
                  Strategic planning helps you achieve your financial goals through systematic investing
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8">
                {[
                  {
                    step: '01',
                    title: 'Set Your Goal',
                    description: 'Define your financial target, timeline, and current situation to create a clear roadmap',
                    icon: '🎯',
                    color: 'from-blue-400 to-blue-600'
                  },
                  {
                    step: '02',
                    title: 'Calculate Investment',
                    description: 'We calculate the exact monthly investment needed based on your timeline and expected returns',
                    icon: '📊',
                    color: 'from-green-400 to-green-600'
                  },
                  {
                    step: '03',
                    title: 'Achieve Success',
                    description: 'Follow the plan consistently and watch your investments grow to meet your goal',
                    icon: '🏆',
                    color: 'from-purple-400 to-purple-600'
                  }
                ].map((item, index) => (
                  <div key={index} className="group text-center">
                    <div className="relative mb-8">
                      <div className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                        <span className="text-3xl">{item.icon}</span>
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FF6B2C] dark:bg-[#FF8A50] text-white rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300">
                        {item.step}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] dark:from-[#FF6B2C] dark:to-[#FF8A50] relative overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 lg:mb-6">
                Start Planning Your Goals
              </h2>

              <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mb-4 md:mb-5 lg:mb-6">
                Calculate your financial goals, save them, and track your progress toward achieving them
              </p>

              <button
                onClick={handleGetStarted}
                className="group bg-white dark:bg-gray-800 text-[#FF6B2C] dark:text-[#FF8A50] px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
              >
                {isLoggedIn ? 'Save Your Goals' : 'Get Started Free'}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </section>

          {/* FAQ Section */}
          <CalculatorFAQ faqs={goalPlannerFAQs} title="Goal Planner - Frequently Asked Questions" />
        </main>

        <Footer />
      </div>
    </>
  );
}