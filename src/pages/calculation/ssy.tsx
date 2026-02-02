import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalculatorFAQ, { ssyFAQs } from "@/components/CalculatorFAQ";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

export default function SukanyaSamriddhiYojana() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [investment, setInvestment] = useState('');
  const [returnRate, setReturnRate] = useState('8.2');
  const [daughterAge, setDaughterAge] = useState('');
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear().toString());
  const [showRateHistoryModal, setShowRateHistoryModal] = useState(false);

  // SSY Historical Interest Rates
  const ssyInterestRates = [
    { startDate: '2014-12-03', endDate: '2015-03-31', rate: 9.1, period: '03.12.2014 TO 31.03.2015' },
    { startDate: '2015-04-01', endDate: '2016-03-31', rate: 9.2, period: '01.04.2015 TO 31.03.2016' },
    { startDate: '2016-04-01', endDate: '2016-09-30', rate: 8.6, period: '01.04.2016 TO 30.09.2016' },
    { startDate: '2016-10-01', endDate: '2017-03-31', rate: 8.5, period: '01.10.2016 TO 31.03.2017' },
    { startDate: '2017-04-01', endDate: '2017-06-30', rate: 8.4, period: '01.04.2017 TO 30.06.2017' },
    { startDate: '2017-07-01', endDate: '2017-12-31', rate: 8.3, period: '01.07.2017 TO 31.12.2017' },
    { startDate: '2018-01-01', endDate: '2018-09-30', rate: 8.1, period: '01.01.2018 TO 30.09.2018' },
    { startDate: '2018-10-01', endDate: '2019-06-30', rate: 8.5, period: '01.10.2018 TO 30.06.2019' },
    { startDate: '2019-07-01', endDate: '2020-03-31', rate: 8.4, period: '01.07.2019 TO 31.03.2020' },
    { startDate: '2020-04-01', endDate: '2023-03-31', rate: 7.6, period: '01.04.2020 TO 31.03.2023' },
    { startDate: '2023-04-01', endDate: '2023-12-31', rate: 8.0, period: '01.04.2023 TO 31.12.2023' },
    { startDate: '2024-01-01', endDate: '2025-09-30', rate: 8.2, period: '01.01.2024 TO 30.09.2025' }
  ];

  const [result, setResult] = useState<{
    maturityAmount: number;
    totalInvestment: number;
    totalReturns: number;
    ssyDetails: {
      depositPeriod: number;
      maturityAge: number;
      interestEarningPeriod: number;
      yearlyBreakdown: Array<{
        year: number;
        calendarYear: number;
        age: number;
        deposit: number;
        interest: number;
        balance: number;
      }>;
      taxBenefit: number;
      partialWithdrawal: {
        eligibleAge: number;
        maxAmount: number;
      };
    };
  } | null>(null);

  // Function to get SSY interest rate for a given year
  const getSSYInterestRate = useCallback((year: number) => {
    if (year > 2025) {
      return 8.2;
    }

    for (const rateInfo of ssyInterestRates) {
      const startYear = new Date(rateInfo.startDate).getFullYear();
      const endYear = new Date(rateInfo.endDate).getFullYear();

      if (year >= startYear && year <= endYear) {
        return rateInfo.rate;
      }
    }

    return 9.1;
  }, []);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  useEffect(() => {
    const year = parseInt(currentYear) || new Date().getFullYear();
    const ssyRate = getSSYInterestRate(year);
    setReturnRate(ssyRate.toString());
  }, [currentYear, getSSYInterestRate]);

  const calculateReturns = () => {
    if (!investment || !returnRate || !daughterAge || !currentYear) {
      alert('Please enter all required fields for SSY calculation');
      return;
    }

    const year = parseInt(currentYear);
    if (year < 2000 || year > 2050) {
      alert('Please enter a year between 2000 and 2050');
      return;
    }

    const principal = parseFloat(investment);
    const rate = parseFloat(returnRate) / 100;
    const currentAge = parseFloat(daughterAge) || 0;
    const startYear = parseInt(currentYear);
    const annualDeposit = principal * 12;
    const depositPeriod = 15;
    const maturityAge = 21;
    const interestEarningPeriod = maturityAge - currentAge;

    const yearlyBreakdown = [];
    let balance = 0;
    let totalDeposits = 0;

    for (let year = 1; year <= interestEarningPeriod; year++) {
      const currentAgeInYear = currentAge + year - 1;
      let yearlyDeposit = 0;

      if (year <= depositPeriod && currentAgeInYear < 18) {
        yearlyDeposit = annualDeposit;
        totalDeposits += yearlyDeposit;
      }

      const interest = (balance + yearlyDeposit) * rate;
      balance = balance + yearlyDeposit + interest;

      yearlyBreakdown.push({
        year,
        calendarYear: startYear + year - 1,
        age: Math.round(currentAge + year - 1),
        deposit: yearlyDeposit,
        interest: Math.round(interest),
        balance: Math.round(balance)
      });
    }

    const maturityAmount = balance;
    const totalInvestment = totalDeposits;

    const maxDeductiblePerYear = Math.min(annualDeposit, 150000);
    const taxBenefit = maxDeductiblePerYear * 0.3 * depositPeriod;

    const partialWithdrawalEligibleAge = 18;
    const partialWithdrawalMaxAmount = maturityAmount * 0.5;

    setResult({
      maturityAmount: Math.round(maturityAmount),
      totalInvestment: Math.round(totalInvestment),
      totalReturns: Math.round(maturityAmount - totalInvestment),
      ssyDetails: {
        depositPeriod,
        maturityAge,
        interestEarningPeriod,
        yearlyBreakdown,
        taxBenefit: Math.round(taxBenefit),
        partialWithdrawal: {
          eligibleAge: partialWithdrawalEligibleAge,
          maxAmount: Math.round(partialWithdrawalMaxAmount)
        }
      }
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
        <title>Sukanya Samriddhi Yojana Calculator - SSY Calculator | IncomeGrow</title>
        <meta name="description" content="Calculate Sukanya Samriddhi Yojana (SSY) returns with our comprehensive SSY calculator. Plan for your daughter's future with tax-free returns. Get detailed year-wise breakdown and maturity calculations." />
        <meta name="keywords" content="sukanya samriddhi yojana calculator, SSY calculator, girl child scheme, SSY returns, sukanya yojana, SSY interest rate, SSY maturity calculator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="canonical" href="https://www.incomegrow.in/calculation/ssy" />

        {/* Open Graph Tags for Social Sharing */}
        <meta property="og:title" content="Sukanya Samriddhi Yojana Calculator - Plan Your Daughter's Future" />
        <meta property="og:description" content="Free SSY calculator with year-wise breakdown. Calculate maturity amount, tax benefits, and plan your daughter's education & marriage expenses." />
        <meta property="og:url" content="https://www.incomegrow.in/calculation/ssy" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.incomegrow.in/og-image-ssy.png" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SSY Calculator - Sukanya Samriddhi Yojana Calculator" />
        <meta name="twitter:description" content="Calculate SSY returns for girl child. Free online calculator with detailed breakdown." />
        <meta name="twitter:image" content="https://www.incomegrow.in/og-image-ssy.png" />

        {/* Schema.org Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Sukanya Samriddhi Yojana Calculator",
            "description": "Free online SSY calculator to calculate maturity amount, returns, and tax benefits for girl child savings scheme",
            "url": "https://www.incomegrow.in/calculation/ssy",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "1250",
              "bestRating": "5",
              "worstRating": "1"
            },
            "provider": {
              "@type": "Organization",
              "name": "IncomeGrow",
              "url": "https://www.incomegrow.in"
            }
          })}
        </script>

        {/* BreadcrumbList Schema */}
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
                "name": "SSY Calculator",
                "item": "https://www.incomegrow.in/calculation/ssy"
              }
            ]
          })}
        </script>
      </Head>

      <div className="font-sans m-0 p-0 bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-gray-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 rounded-full border border-emerald-200 dark:border-emerald-700 mb-3 md:mb-4 lg:mb-6 transition-colors duration-300">
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">👧 Sukanya Samriddhi Yojana Calculator</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Sukanya Samriddhi Yojana
                </span>
                <br />
                <span className="text-gray-800 dark:text-gray-100 transition-colors duration-300">Calculator</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mb-4 md:mb-5 lg:mb-6 transition-colors duration-300">
                Calculate SSY returns for your daughter&apos;s future. Government-backed savings scheme with tax-free returns and attractive interest rates.
              </p>

              <div className="grid grid-cols-3 gap-3 md:gap-5 lg:gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1 transition-colors duration-300">8.2%</div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Interest Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1 transition-colors duration-300">Tax-Free</div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Returns</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1 transition-colors duration-300">₹1.5L</div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Max Annual Deposit</div>
                </div>
              </div>
            </div>
          </section>

          {/* Calculator Section */}
          <section className="py-8 md:py-12 lg:py-16 xl:py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
                  {/* Input Form */}
                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center transition-colors duration-300">
                      Calculate Your SSY Returns
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                          Monthly Investment (₹)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g., 5000"
                          className="w-full px-4 py-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg text-gray-900 dark:text-gray-200 dark:placeholder-gray-400"
                          value={investment}
                          onChange={(e) => setInvestment(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 transition-colors duration-300">
                          Minimum: ₹250/year, Maximum: ₹1.5 lakh/year
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                          Interest Rate (% per annum)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          className="w-full px-4 py-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg text-gray-900 dark:text-gray-200 dark:placeholder-gray-400"
                          value={returnRate}
                          onChange={(e) => setReturnRate(e.target.value)}
                        />
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                            Historical SSY rate for {currentYear}: {returnRate}%
                          </p>
                          {(() => {
                            const year = parseInt(currentYear) || new Date().getFullYear();
                            const rateInfo = ssyInterestRates.find(info => {
                              const startYear = new Date(info.startDate).getFullYear();
                              const endYear = new Date(info.endDate).getFullYear();
                              return year >= startYear && year <= endYear;
                            });

                            if (rateInfo) {
                              return (
                                <button
                                  onClick={() => setShowRateHistoryModal(true)}
                                  className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded mt-1 hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 cursor-pointer border border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600"
                                >
                                  📅 Rate Period: {rateInfo.period} (Click for full history)
                                </button>
                              );
                            } else if (year > 2025) {
                              return (
                                <button
                                  onClick={() => setShowRateHistoryModal(true)}
                                  className="text-xs text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded mt-1 hover:bg-purple-100 dark:hover:bg-purple-900/50 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200 cursor-pointer border border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600"
                                >
                                  🔮 Future projection: 8.2% (assumed) (Click for history)
                                </button>
                              );
                            } else {
                              return (
                                <button
                                  onClick={() => setShowRateHistoryModal(true)}
                                  className="text-xs text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 px-2 py-1 rounded mt-1 hover:bg-orange-100 dark:hover:bg-orange-900/50 hover:text-orange-700 dark:hover:text-orange-300 transition-colors duration-200 cursor-pointer border border-orange-200 dark:border-orange-700 hover:border-orange-300 dark:hover:border-orange-600"
                                >
                                  ⚠️ Using earliest available rate: 9.1% (Click for history)
                                </button>
                              );
                            }
                          })()}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                          Daughter&apos;s Current Age (Years)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g., 5"
                          min="0"
                          max="10"
                          className="w-full px-4 py-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg text-gray-900 dark:text-gray-200 dark:placeholder-gray-400"
                          value={daughterAge}
                          onChange={(e) => setDaughterAge(e.target.value)}
                        />
                        <div className="flex gap-2 mt-3">
                          {['0', '2', '5', '8', '10'].map(age => (
                            <button
                              key={age}
                              onClick={() => setDaughterAge(age)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                daughterAge === age
                                  ? 'bg-[#FF6B2C] text-white'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                              }`}
                            >
                              {age}Y
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 transition-colors duration-300">
                          💡 SSY can be opened for girl child up to 10 years of age
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                          Start Year
                        </label>
                        <input
                          type="number"
                          placeholder="e.g., 2024"
                          min="2000"
                          max="2050"
                          className="w-full px-4 py-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg text-gray-900 dark:text-gray-200 dark:placeholder-gray-400"
                          value={currentYear}
                          onChange={(e) => setCurrentYear(e.target.value)}
                        />
                        <div className="flex gap-2 mt-3">
                          {['2022', '2023', '2024', '2025', '2026'].map(year => (
                            <button
                              key={year}
                              onClick={() => setCurrentYear(year)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                currentYear === year
                                  ? 'bg-[#FF6B2C] text-white'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                              }`}
                            >
                              {year}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 transition-colors duration-300">
                          💡 Year range: 2000 to 2050 (for realistic calculations)
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                          Account Duration (Auto-calculated)
                        </label>
                        <div className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">
                          {daughterAge ? `${21 - parseFloat(daughterAge)} years (until daughter turns 21)` : 'Enter daughter&apos;s age first'}
                        </div>
                      </div>

                      <button
                        className="w-full bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        onClick={calculateReturns}
                      >
                        Calculate Returns
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-gradient-to-br from-[#FF6B2C]/10 to-[#FF8A50]/10 dark:from-[#FF6B2C]/20 dark:to-[#FF8A50]/20 rounded-3xl p-8 border border-[#FF6B2C]/20 dark:border-[#FF6B2C]/30 transition-colors duration-300">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center transition-colors duration-300">
                      Investment Summary
                    </h3>

                    {result ? (
                      <div className="space-y-6">
                        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg transition-colors duration-300">
                          <div className="text-center">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-300">Maturity Amount</div>
                            <div className="text-4xl font-bold text-[#FF6B2C] mb-4">
                              ₹{result.maturityAmount.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 transition-colors duration-300">
                            <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Total Investment</div>
                            <div className="text-xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300">
                              ₹{result.totalInvestment.toLocaleString()}
                            </div>
                          </div>

                          <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 transition-colors duration-300">
                            <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Total Returns</div>
                            <div className="text-xl font-bold text-green-600 dark:text-green-400 transition-colors duration-300">
                              ₹{result.totalReturns.toLocaleString()}
                            </div>
                          </div>

                          <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 transition-colors duration-300">
                            <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Tax Benefit (Section 80C)</div>
                            <div className="text-xl font-bold text-purple-600 dark:text-purple-400 transition-colors duration-300">
                              ₹{result.ssyDetails.taxBenefit.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">Over {result.ssyDetails.depositPeriod} years</div>
                          </div>

                          <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 transition-colors duration-300">
                            <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Partial Withdrawal (Age 18+)</div>
                            <div className="text-xl font-bold text-teal-600 dark:text-teal-400 transition-colors duration-300">
                              ₹{result.ssyDetails.partialWithdrawal.maxAmount.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">50% of balance for higher education</div>
                          </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700 transition-colors duration-300">
                          <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 transition-colors duration-300">📊 Complete Year-wise Breakdown:</h4>
                          <div className="max-h-64 overflow-y-auto">
                            <table className="w-full text-xs text-blue-700 dark:text-blue-300 transition-colors duration-300">
                              <thead className="sticky top-0 bg-blue-100 dark:bg-blue-800 transition-colors duration-300">
                                <tr>
                                  <th className="text-left p-2 font-semibold dark:text-blue-200">Year</th>
                                  <th className="text-left p-2 font-semibold dark:text-blue-200">Calendar</th>
                                  <th className="text-left p-2 font-semibold dark:text-blue-200">Age</th>
                                  <th className="text-right p-2 font-semibold dark:text-blue-200">Deposit</th>
                                  <th className="text-right p-2 font-semibold dark:text-blue-200">Interest</th>
                                  <th className="text-right p-2 font-semibold dark:text-blue-200">Balance</th>
                                </tr>
                              </thead>
                              <tbody>
                                {result.ssyDetails.yearlyBreakdown.map((year, index) => (
                                  <tr key={index} className={`border-b border-blue-200 dark:border-blue-700 transition-colors duration-300 ${year.deposit > 0 ? 'bg-blue-25 dark:bg-blue-900/20' : 'bg-gray-25 dark:bg-gray-800/20'}`}>
                                    <td className="p-2 font-medium">{year.year}</td>
                                    <td className="p-2 font-medium text-purple-700 dark:text-purple-400">{year.calendarYear}</td>
                                    <td className="p-2">{year.age}</td>
                                    <td className="text-right p-2 font-medium">
                                      {year.deposit > 0 ? `₹${year.deposit.toLocaleString()}` : '-'}
                                    </td>
                                    <td className="text-right p-2 text-green-700 dark:text-green-400 font-medium transition-colors duration-300">₹{year.interest.toLocaleString()}</td>
                                    <td className="text-right p-2 font-bold text-blue-800 dark:text-blue-300 transition-colors duration-300">₹{year.balance.toLocaleString()}</td>
                                  </tr>
                                ))}
                                <tr className="bg-blue-100 dark:bg-blue-800 border-t-2 border-blue-300 dark:border-blue-600 transition-colors duration-300">
                                  <td colSpan={3} className="p-2 font-bold text-blue-800 dark:text-blue-200 transition-colors duration-300">Final Maturity</td>
                                  <td className="text-right p-2 font-bold text-blue-800 dark:text-blue-200 transition-colors duration-300">
                                    ₹{result.totalInvestment.toLocaleString()}
                                  </td>
                                  <td className="text-right p-2 font-bold text-green-700 dark:text-green-400 transition-colors duration-300">
                                    ₹{result.totalReturns.toLocaleString()}
                                  </td>
                                  <td className="text-right p-2 font-bold text-blue-800 dark:text-blue-200 text-base transition-colors duration-300">
                                    ₹{result.maturityAmount.toLocaleString()}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="mt-3 text-xs text-blue-600 dark:text-blue-400 transition-colors duration-300">
                            💡 <strong>Note:</strong> Deposits are made for first 15 years or until daughter turns 18 (whichever is earlier). Interest continues to compound until age 21.
                          </div>
                        </div>

                        <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700 transition-colors duration-300">
                          <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2 transition-colors duration-300">🎯 Key SSY Features:</h4>
                          <ul className="text-xs text-green-700 dark:text-green-300 space-y-1 transition-colors duration-300">
                            <li>• Deposits for first {result.ssyDetails.depositPeriod} years (or until age 18)</li>
                            <li>• Account matures when daughter turns {result.ssyDetails.maturityAge}</li>
                            <li>• Tax-free returns under EEE (Exempt-Exempt-Exempt)</li>
                            <li>• Minimum deposit: ₹250/year, Maximum: ₹1.5 lakh/year</li>
                            <li>• Partial withdrawal allowed from age {result.ssyDetails.partialWithdrawal.eligibleAge} for higher education</li>
                            <li>• Premature closure allowed if girl is 18+ for marriage</li>
                          </ul>
                        </div>

                        <div className="text-center pt-4">
                          <button
                            onClick={handleGetStarted}
                            className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 dark:shadow-lg"
                          >
                            {isLoggedIn ? 'Save This Calculation' : 'Create Free Account'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                          <svg className="w-10 h-10 text-gray-500 dark:text-gray-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-lg transition-colors duration-300">
                          Enter your details to calculate projected returns
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-8 md:py-12 lg:py-16 xl:py-20 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-6 md:mb-8 lg:mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 lg:mb-6">
                  <span className="text-gray-800 dark:text-gray-100 transition-colors duration-300">Why Choose </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Sukanya Samriddhi Yojana?
                  </span>
                </h2>

                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
                  Government-backed savings scheme designed for the girl child
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-8">
                <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">Tax-Free Returns</h3>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Complete EEE status - deposits, interest, and maturity all tax-free</p>
                </div>

                <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">High Interest Rate</h3>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Currently offering 8.2% interest rate - higher than most savings schemes</p>
                </div>

                <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">Flexible Withdrawals</h3>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Partial withdrawal allowed after age 18 for education expenses</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 lg:mb-6">
                Plan Your Daughter&apos;s Future
              </h2>

              <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mb-4 md:mb-5 lg:mb-6">
                Calculate SSY returns and save your financial goals. Track your progress towards building a bright future for your daughter.
              </p>

              <button
                onClick={handleGetStarted}
                className="group bg-white text-[#FF6B2C] px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
              >
                {isLoggedIn ? 'Save Your Goals' : 'Get Started Free'}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </section>
        </main>

        {/* SSY Rate History Modal */}
        {showRateHistoryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex items-center justify-center z-[9999] p-4 transition-colors duration-300">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transition-colors duration-300">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300">
                    📊 SSY Historical Interest Rates
                  </h2>
                  <button
                    onClick={() => setShowRateHistoryModal(false)}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    ×
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2 transition-colors duration-300">
                  Complete history of Sukanya Samriddhi Yojana interest rates as announced by the Government of India
                </p>
              </div>

              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 transition-colors duration-300">
                    <thead className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white">
                      <tr>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold">Sr. No.</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold">Rate Period</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-semibold">Interest Rate (% per annum)</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ssyInterestRates.map((rate, index) => {
                        const year = parseInt(currentYear) || new Date().getFullYear();
                        const startYear = new Date(rate.startDate).getFullYear();
                        const endYear = new Date(rate.endDate).getFullYear();
                        const isCurrentRate = year >= startYear && year <= endYear;

                        return (
                          <tr
                            key={index}
                            className={`${
                              isCurrentRate
                                ? 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-700'
                                : index % 2 === 0
                                  ? 'bg-gray-50 dark:bg-gray-700/50'
                                  : 'bg-white dark:bg-gray-800/50'
                            } hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-200`}
                          >
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                              {index + 1}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                              {rate.period}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center">
                              <span className={`font-bold text-lg ${
                                isCurrentRate ? 'text-[#FF6B2C]' : 'text-gray-800 dark:text-gray-200'
                              } transition-colors duration-300`}>
                                {rate.rate}%
                              </span>
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center">
                              {isCurrentRate ? (
                                <span className="bg-[#FF6B2C] text-white px-3 py-1 rounded-full text-xs font-semibold">
                                  Current Rate
                                </span>
                              ) : endYear < new Date().getFullYear() ? (
                                <span className="bg-gray-400 dark:bg-gray-600 text-white px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-300">
                                  Historical
                                </span>
                              ) : (
                                <span className="bg-blue-500 dark:bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-300">
                                  Future
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700 transition-colors duration-300">
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                          {ssyInterestRates.length + 1}
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                          01.10.2025 onwards (Projected)
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center">
                          <span className="font-bold text-lg text-purple-600 dark:text-purple-400 transition-colors duration-300">8.2%</span>
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center">
                          <span className="bg-purple-500 dark:bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-300">
                            Assumed
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-xl p-4 transition-colors duration-300">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 transition-colors duration-300">📝 Important Notes:</h3>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 transition-colors duration-300">
                    <li>• Interest rates are compounded annually</li>
                    <li>• Rates are set by the Government of India and may change quarterly</li>
                    <li>• All rates shown are official government-announced rates</li>
                    <li>• Future rates beyond Sep 2025 are projections based on current rate</li>
                    <li>• The highlighted row shows the rate applicable for your selected start year ({currentYear})</li>
                  </ul>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-b-2xl transition-colors duration-300">
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowRateHistoryModal(false)}
                    className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <CalculatorFAQ faqs={ssyFAQs} title="Sukanya Samriddhi Yojana FAQs" />

        <Footer />
      </div>
    </>
  );
}
