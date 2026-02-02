import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/router";

export default function FdRdPfNpsSsy() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [calculatorType, setCalculatorType] = useState('FD');
  const [investment, setInvestment] = useState('');
  const [returnRate, setReturnRate] = useState('7');
  const [timePeriod, setTimePeriod] = useState('');
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

  // Function to get SSY interest rate for a given year
  const getSSYInterestRate = useCallback((year: number) => {
    // For future years beyond 2025, assume current rate continues
    if (year > 2025) {
      return 8.2;
    }
    
    // For historical years, find the appropriate rate
    for (const rateInfo of ssyInterestRates) {
      const startYear = new Date(rateInfo.startDate).getFullYear();
      const endYear = new Date(rateInfo.endDate).getFullYear();
      
      if (year >= startYear && year <= endYear) {
        return rateInfo.rate;
      }
    }
    
    // Default to earliest available rate for years before 2014
    return 9.1;
  }, [ssyInterestRates]);
  // const [frequency] = useState('monthly'); // Currently unused
  const [result, setResult] = useState<{
    maturityAmount: number;
    totalInvestment: number;
    totalReturns: number;
    monthlyPension?: number;
    ssyDetails?: {
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

  const calculatorOptions = useMemo(() => [
    { value: 'FD', label: 'Fixed Deposit', rate: '7', description: 'Traditional fixed deposit with guaranteed returns' },
    { value: 'RD', label: 'Recurring Deposit', rate: '6.5', description: 'Monthly investment with fixed returns' },
    { value: 'PF', label: 'Provident Fund', rate: '8.1', description: 'Employee provident fund calculator' },
    { value: 'NPS', label: 'National Pension', rate: '10', description: 'Government pension scheme calculator' },
    { value: 'SSY', label: 'Sukanya Samriddhi', rate: '7.6', description: 'Girl child savings scheme' }
  ], []);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  useEffect(() => {
    const selectedOption = calculatorOptions.find(option => option.value === calculatorType);
    if (selectedOption) {
      if (calculatorType === 'SSY') {
        // Set SSY rate based on start year
        const year = parseInt(currentYear) || new Date().getFullYear();
        const ssyRate = getSSYInterestRate(year);
        setReturnRate(ssyRate.toString());
      } else {
        setReturnRate(selectedOption.rate);
      }
    }
  }, [calculatorType, calculatorOptions, currentYear, getSSYInterestRate]);

  const calculateReturns = () => {
    if (!investment || !returnRate) return;
    if (calculatorType === 'SSY' && (!daughterAge || !currentYear)) {
      alert('Please enter daughter\'s current age and start year for SSY calculation');
      return;
    }
    if (calculatorType !== 'SSY' && !timePeriod) return;
    
    // Validate year range for SSY
    if (calculatorType === 'SSY') {
      const year = parseInt(currentYear);
      if (year < 2000 || year > 2050) {
        alert('Please enter a year between 2000 and 2050');
        return;
      }
    }

    const principal = parseFloat(investment);
    const rate = parseFloat(returnRate) / 100;
    const time = parseFloat(timePeriod);
    let maturityAmount = 0;
    let totalInvestment = 0;

    if (calculatorType === 'FD') {
      // Simple compound interest for FD
      maturityAmount = principal * Math.pow(1 + rate, time);
      totalInvestment = principal;
    } else if (calculatorType === 'SSY') {
      // Detailed SSY calculation
      const currentAge = parseFloat(daughterAge) || 0;
      const startYear = parseInt(currentYear);
      const annualDeposit = principal * 12; // Convert monthly to annual
      const depositPeriod = 15; // Fixed 15 years for SSY
      const maturityAge = 21; // Account matures when girl turns 21
      const interestEarningPeriod = maturityAge - currentAge;
      
      const yearlyBreakdown = [];
      let balance = 0;
      let totalDeposits = 0;
      
      // Calculate year by year for detailed breakdown
      for (let year = 1; year <= interestEarningPeriod; year++) {
        const currentAgeInYear = currentAge + year - 1;
        let yearlyDeposit = 0;
        
        // Deposits are made only for first 15 years or until girl turns 18 (whichever is earlier)
        if (year <= depositPeriod && currentAgeInYear < 18) {
          yearlyDeposit = annualDeposit;
          totalDeposits += yearlyDeposit;
        }
        
        // Interest is calculated on the balance at the beginning of the year plus deposit
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
      
      maturityAmount = balance;
      totalInvestment = totalDeposits;
      
      // Calculate tax benefit (80C deduction)
      const maxDeductiblePerYear = Math.min(annualDeposit, 150000);
      const taxBenefit = maxDeductiblePerYear * 0.3 * depositPeriod; // Assuming 30% tax bracket
      
      // Partial withdrawal details
      const partialWithdrawalEligibleAge = 18;
      const partialWithdrawalMaxAmount = maturityAmount * 0.5; // 50% of balance
      
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
      return;
    } else if (calculatorType === 'RD' || calculatorType === 'PF') {
      // Monthly compounding for RD, PF
      const monthlyRate = rate / 12;
      const totalMonths = time * 12;
      maturityAmount = principal * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
      totalInvestment = principal * totalMonths;
    } else if (calculatorType === 'NPS') {
      // NPS calculation with pension component
      const monthlyRate = rate / 12;
      const totalMonths = time * 12;
      const corpus = principal * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
      // Assume 40% used for annuity, 60% as lump sum
      maturityAmount = corpus * 0.6;
      const pensionCorpus = corpus * 0.4;
      const monthlyPension = (pensionCorpus * 0.06) / 12; // Assuming 6% annual pension rate
      
      setResult({
        maturityAmount: Math.round(maturityAmount),
        totalInvestment: Math.round(principal * totalMonths),
        totalReturns: Math.round(corpus - (principal * totalMonths)),
        monthlyPension: Math.round(monthlyPension)
      });
      return;
    }

    const totalReturns = maturityAmount - totalInvestment;
    
    setResult({
      maturityAmount: Math.round(maturityAmount),
      totalInvestment: Math.round(totalInvestment),
      totalReturns: Math.round(totalReturns)
    });
  };

  const handleGetStarted = () => {
    if (isLoggedIn) {
      router.push('/dashboard');
    } else {
      router.push('/signup');
    }
  };

  const getInputLabel = () => {
    return calculatorType === 'FD' ? 'Investment Amount (₹)' : 'Monthly Investment (₹)';
  };

  const getPlaceholder = () => {
    return calculatorType === 'FD' ? 'e.g., 100000' : 'e.g., 5000';
  };

  return (
    <>
      <Head>
        <title>{calculatorType} Calculator - IncomeGrow Financial</title>
        <meta name="description" content={`Calculate your ${calculatorOptions.find(opt => opt.value === calculatorType)?.label} returns with our comprehensive calculator.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="canonical" href="https://www.incomegrow.in/calculation/fd-rd-pf-nps-ssy" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
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
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">🏦 Investment Calculators</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  {calculatorOptions.find(opt => opt.value === calculatorType)?.label}
                </span>
                <br />
                <span className="text-gray-800 dark:text-gray-100">Calculator</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mb-4 md:mb-5 lg:mb-6 transition-colors duration-300">
                Calculate returns for Fixed Deposits, Recurring Deposits, Provident Fund,
                National Pension Scheme, and Sukanya Samriddhi Yojana with our comprehensive tools.
              </p>

              <div className="grid grid-cols-3 gap-3 md:gap-5 lg:gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1 transition-colors duration-300">Secure</div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Investments</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1 transition-colors duration-300">Guaranteed</div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Returns</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1 transition-colors duration-300">Tax</div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Benefits</div>
                </div>
              </div>
            </div>
          </section>

          {/* Calculator Selection */}
          <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {calculatorOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setCalculatorType(option.value)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      calculatorType === option.value
                        ? 'bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="text-center">
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
                  {calculatorOptions.find(opt => opt.value === calculatorType)?.description}
                </p>
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
                      Calculate Your {calculatorOptions.find(opt => opt.value === calculatorType)?.label} Returns
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                          {getInputLabel()}
                        </label>
                        <input
                          type="number"
                          placeholder={getPlaceholder()}
                          className="w-full px-4 py-4 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 dark:placeholder-gray-400 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg"
                          value={investment}
                          onChange={(e) => setInvestment(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                          Interest Rate (% per annum)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          className="w-full px-4 py-4 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 dark:placeholder-gray-400 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg"
                          value={returnRate}
                          onChange={(e) => setReturnRate(e.target.value)}
                        />
                        {calculatorType === 'SSY' ? (
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
                        ) : (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 transition-colors duration-300">
                            Current rate: {calculatorOptions.find(opt => opt.value === calculatorType)?.rate}% (as per latest updates)
                          </p>
                        )}
                      </div>
                      
                      {calculatorType === 'SSY' && (
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                            Daughter&apos;s Current Age (Years)
                          </label>
                          <input
                            type="number"
                            placeholder="e.g., 5"
                            min="0"
                            max="10"
                            className="w-full px-4 py-4 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 dark:placeholder-gray-400 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg"
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
                      )}
                      
                      {calculatorType === 'SSY' && (
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                            Start Year
                          </label>
                          <input
                            type="number"
                            placeholder="e.g., 2024"
                            min="2000"
                            max="2050"
                            className="w-full px-4 py-4 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 dark:placeholder-gray-400 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg"
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
                      )}
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                          {calculatorType === 'SSY' ? 'Account Duration (Auto-calculated)' : 'Investment Period (Years)'}
                        </label>
                        {calculatorType === 'SSY' ? (
                          <div className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            {daughterAge ? `${21 - parseFloat(daughterAge)} years (until daughter turns 21)` : 'Enter daughter&apos;s age first'}
                          </div>
                        ) : (
                          <>
                            <input
                              type="number"
                              placeholder="e.g., 10"
                              className="w-full px-4 py-4 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 dark:placeholder-gray-400 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg"
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
                                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                  }`}
                                >
                                  {period}Y
                                </button>
                              ))}
                            </div>
                          </>
                        )}
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

                          {result.monthlyPension && (
                            <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 transition-colors duration-300">
                              <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Monthly Pension (NPS)</div>
                              <div className="text-xl font-bold text-purple-600 dark:text-purple-400 transition-colors duration-300">
                                ₹{result.monthlyPension.toLocaleString()}
                              </div>
                            </div>
                          )}

                          {result.ssyDetails && (
                            <>
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
                            </>
                          )}
                        </div>
                        
                        {result.ssyDetails && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800 transition-colors duration-300">
                            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 transition-colors duration-300">📊 Complete Year-wise Breakdown:</h4>
                            <div className="max-h-64 overflow-y-auto">
                              <table className="w-full text-xs text-blue-700 dark:text-blue-300 transition-colors duration-300">
                                <thead className="sticky top-0 bg-blue-100 dark:bg-blue-900/40 transition-colors duration-300">
                                  <tr>
                                    <th className="text-left p-2 font-semibold">Year</th>
                                    <th className="text-left p-2 font-semibold">Calendar</th>
                                    <th className="text-left p-2 font-semibold">Age</th>
                                    <th className="text-right p-2 font-semibold">Deposit</th>
                                    <th className="text-right p-2 font-semibold">Interest</th>
                                    <th className="text-right p-2 font-semibold">Balance</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {result.ssyDetails.yearlyBreakdown.map((year, index) => (
                                    <tr key={index} className={`border-b border-blue-200 dark:border-blue-800 ${year.deposit > 0 ? 'bg-blue-25 dark:bg-blue-900/10' : 'bg-gray-25 dark:bg-gray-800/20'} transition-colors duration-300`}>
                                      <td className="p-2 font-medium">{year.year}</td>
                                      <td className="p-2 font-medium text-purple-700 dark:text-purple-400">{year.calendarYear}</td>
                                      <td className="p-2">{year.age}</td>
                                      <td className="text-right p-2 font-medium">
                                        {year.deposit > 0 ? `₹${year.deposit.toLocaleString()}` : '-'}
                                      </td>
                                      <td className="text-right p-2 text-green-700 dark:text-green-400 font-medium">₹{year.interest.toLocaleString()}</td>
                                      <td className="text-right p-2 font-bold text-blue-800 dark:text-blue-300">₹{year.balance.toLocaleString()}</td>
                                    </tr>
                                  ))}
                                  <tr className="bg-blue-100 dark:bg-blue-900/30 border-t-2 border-blue-300 dark:border-blue-700 transition-colors duration-300">
                                    <td colSpan={3} className="p-2 font-bold text-blue-800 dark:text-blue-300">Final Maturity</td>
                                    <td className="text-right p-2 font-bold text-blue-800 dark:text-blue-300">
                                      ₹{result.totalInvestment.toLocaleString()}
                                    </td>
                                    <td className="text-right p-2 font-bold text-green-700 dark:text-green-400">
                                      ₹{result.totalReturns.toLocaleString()}
                                    </td>
                                    <td className="text-right p-2 font-bold text-blue-800 dark:text-blue-300 text-base">
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
                        )}
                        
                        {result.ssyDetails && (
                          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800 transition-colors duration-300">
                            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2 transition-colors duration-300">🎯 Key SSY Features:</h4>
                            <ul className="text-xs text-green-700 dark:text-green-400 space-y-1 transition-colors duration-300">
                              <li>• Deposits for first {result.ssyDetails.depositPeriod} years (or until age 18)</li>
                              <li>• Account matures when daughter turns {result.ssyDetails.maturityAge}</li>
                              <li>• Tax-free returns under EEE (Exempt-Exempt-Exempt)</li>
                              <li>• Minimum deposit: ₹250/year, Maximum: ₹1.5 lakh/year</li>
                              <li>• Partial withdrawal allowed from age {result.ssyDetails.partialWithdrawal.eligibleAge} for higher education</li>
                              <li>• Premature closure allowed if girl is 18+ for marriage</li>
                            </ul>
                          </div>
                        )}

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
                        <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                          <svg className="w-10 h-10 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-lg transition-colors duration-300">
                          Enter your investment details to see projected returns
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
                  <span className="text-gray-800 dark:text-gray-100 transition-colors duration-300">Investment </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Options
                  </span>
                </h2>

                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
                  Choose from various secure investment options based on your financial goals
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-8">
                {calculatorOptions.map((option) => (
                  <div key={option.value} className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300">{option.label}</h3>
                      <div className="text-2xl font-bold text-[#FF6B2C]">{option.rate}%</div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">{option.description}</p>

                    <button
                      onClick={() => setCalculatorType(option.value)}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                        calculatorType === option.value
                          ? 'bg-[#FF6B2C] text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      Calculate
                    </button>
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
                Start Secure Investing
              </h2>

              <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mb-4 md:mb-5 lg:mb-6">
                Choose from our range of secure investment options and start building your wealth today
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

        {/* SSY Rate History Modal */}
        {showRateHistoryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-[9999] p-4 transition-colors duration-300">
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
                  <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
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
                                ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                                : index % 2 === 0
                                  ? 'bg-gray-50 dark:bg-gray-700/50'
                                  : 'bg-white dark:bg-gray-800'
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
                                <span className="bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                  Historical
                                </span>
                              ) : (
                                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                  Future
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                      {/* Future rate row */}
                      <tr className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 transition-colors duration-300">
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
                          <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Assumed
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 transition-colors duration-300">
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

              <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl transition-colors duration-300">
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

        <Footer />
      </div>
    </>
  );
}