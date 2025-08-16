import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";

export default function FdRdPfNpsSsy() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [calculatorType, setCalculatorType] = useState('FD');
  const [investment, setInvestment] = useState('');
  const [returnRate, setReturnRate] = useState('7');
  const [timePeriod, setTimePeriod] = useState('');
  const [daughterAge, setDaughterAge] = useState('');
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
      setReturnRate(selectedOption.rate);
    }
  }, [calculatorType, calculatorOptions]);

  const calculateReturns = () => {
    if (!investment || !returnRate) return;
    if (calculatorType === 'SSY' && !daughterAge) {
      alert('Please enter daughter\'s current age for SSY calculation');
      return;
    }
    if (calculatorType !== 'SSY' && !timePeriod) return;

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
        <title>{calculatorType} Calculator - Umbrella Financial</title>
        <meta name="description" content={`Calculate your ${calculatorOptions.find(opt => opt.value === calculatorType)?.label} returns with our comprehensive calculator.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-emerald-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-50 to-green-50 rounded-full border border-emerald-200 mb-8">
                <span className="text-sm font-semibold text-emerald-600">🏦 Investment Calculators</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  {calculatorOptions.find(opt => opt.value === calculatorType)?.label}
                </span>
                <br />
                <span className="text-gray-800">Calculator</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Calculate returns for Fixed Deposits, Recurring Deposits, Provident Fund, 
                National Pension Scheme, and Sukanya Samriddhi Yojana with our comprehensive tools.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">Secure</div>
                  <div className="text-gray-600">Investments</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">Guaranteed</div>
                  <div className="text-gray-600">Returns</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">Tax</div>
                  <div className="text-gray-600">Benefits</div>
                </div>
              </div>
            </div>
          </section>

          {/* Calculator Selection */}
          <section className="py-12 bg-white">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {calculatorOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setCalculatorType(option.value)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      calculatorType === option.value
                        ? 'bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {calculatorOptions.find(opt => opt.value === calculatorType)?.description}
                </p>
              </div>
            </div>
          </section>

          {/* Calculator Section */}
          <section className="py-24 bg-gray-50 relative overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Input Form */}
                  <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                      Calculate Your {calculatorOptions.find(opt => opt.value === calculatorType)?.label} Returns
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          {getInputLabel()}
                        </label>
                        <input
                          type="number"
                          placeholder={getPlaceholder()}
                          className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg"
                          value={investment}
                          onChange={(e) => setInvestment(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Interest Rate (% per annum)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg"
                          value={returnRate}
                          onChange={(e) => setReturnRate(e.target.value)}
                        />
                        <p className="text-sm text-gray-500 mt-2">
                          Current rate: {calculatorOptions.find(opt => opt.value === calculatorType)?.rate}% (as per latest updates)
                        </p>
                      </div>
                      
                      {calculatorType === 'SSY' && (
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Daughter&apos;s Current Age (Years)
                          </label>
                          <input
                            type="number"
                            placeholder="e.g., 5"
                            min="0"
                            max="10"
                            className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg"
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
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                {age}Y
                              </button>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            💡 SSY can be opened for girl child up to 10 years of age
                          </p>
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          {calculatorType === 'SSY' ? 'Account Duration (Auto-calculated)' : 'Investment Period (Years)'}
                        </label>
                        {calculatorType === 'SSY' ? (
                          <div className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-lg text-gray-600">
                            {daughterAge ? `${21 - parseFloat(daughterAge)} years (until daughter turns 21)` : 'Enter daughter&apos;s age first'}
                          </div>
                        ) : (
                          <>
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
                            <div className="text-sm text-gray-600">Total Investment</div>
                            <div className="text-xl font-bold text-gray-800">
                              ₹{result.totalInvestment.toLocaleString()}
                            </div>
                          </div>
                          
                          <div className="bg-white/60 rounded-xl p-4">
                            <div className="text-sm text-gray-600">Total Returns</div>
                            <div className="text-xl font-bold text-green-600">
                              ₹{result.totalReturns.toLocaleString()}
                            </div>
                          </div>
                          
                          {result.monthlyPension && (
                            <div className="bg-white/60 rounded-xl p-4">
                              <div className="text-sm text-gray-600">Monthly Pension (NPS)</div>
                              <div className="text-xl font-bold text-purple-600">
                                ₹{result.monthlyPension.toLocaleString()}
                              </div>
                            </div>
                          )}
                          
                          {result.ssyDetails && (
                            <>
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="text-sm text-gray-600">Tax Benefit (Section 80C)</div>
                                <div className="text-xl font-bold text-purple-600">
                                  ₹{result.ssyDetails.taxBenefit.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500">Over {result.ssyDetails.depositPeriod} years</div>
                              </div>
                              
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="text-sm text-gray-600">Partial Withdrawal (Age 18+)</div>
                                <div className="text-xl font-bold text-teal-600">
                                  ₹{result.ssyDetails.partialWithdrawal.maxAmount.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500">50% of balance for higher education</div>
                              </div>
                            </>
                          )}
                        </div>
                        
                        {result.ssyDetails && (
                          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                            <h4 className="font-semibold text-blue-800 mb-2">📊 Complete Year-wise Breakdown:</h4>
                            <div className="max-h-64 overflow-y-auto">
                              <table className="w-full text-xs text-blue-700">
                                <thead className="sticky top-0 bg-blue-100">
                                  <tr>
                                    <th className="text-left p-2 font-semibold">Year</th>
                                    <th className="text-left p-2 font-semibold">Age</th>
                                    <th className="text-right p-2 font-semibold">Deposit</th>
                                    <th className="text-right p-2 font-semibold">Interest</th>
                                    <th className="text-right p-2 font-semibold">Balance</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {result.ssyDetails.yearlyBreakdown.map((year, index) => (
                                    <tr key={index} className={`border-b border-blue-200 ${year.deposit > 0 ? 'bg-blue-25' : 'bg-gray-25'}`}>
                                      <td className="p-2 font-medium">{year.year}</td>
                                      <td className="p-2">{year.age}</td>
                                      <td className="text-right p-2 font-medium">
                                        {year.deposit > 0 ? `₹${year.deposit.toLocaleString()}` : '-'}
                                      </td>
                                      <td className="text-right p-2 text-green-700 font-medium">₹{year.interest.toLocaleString()}</td>
                                      <td className="text-right p-2 font-bold text-blue-800">₹{year.balance.toLocaleString()}</td>
                                    </tr>
                                  ))}
                                  <tr className="bg-blue-100 border-t-2 border-blue-300">
                                    <td colSpan={2} className="p-2 font-bold text-blue-800">Final Maturity</td>
                                    <td className="text-right p-2 font-bold text-blue-800">
                                      ₹{result.totalInvestment.toLocaleString()}
                                    </td>
                                    <td className="text-right p-2 font-bold text-green-700">
                                      ₹{result.totalReturns.toLocaleString()}
                                    </td>
                                    <td className="text-right p-2 font-bold text-blue-800 text-base">
                                      ₹{result.maturityAmount.toLocaleString()}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div className="mt-3 text-xs text-blue-600">
                              💡 <strong>Note:</strong> Deposits are made for first 15 years or until daughter turns 18 (whichever is earlier). Interest continues to compound until age 21.
                            </div>
                          </div>
                        )}
                        
                        {result.ssyDetails && (
                          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                            <h4 className="font-semibold text-green-800 mb-2">🎯 Key SSY Features:</h4>
                            <ul className="text-xs text-green-700 space-y-1">
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

          {/* Features Section */}
          <section className="py-24 bg-white relative overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800">Investment </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Options
                  </span>
                </h2>
                
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Choose from various secure investment options based on your financial goals
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {calculatorOptions.map((option) => (
                  <div key={option.value} className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{option.label}</h3>
                      <div className="text-2xl font-bold text-[#FF6B2C]">{option.rate}%</div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{option.description}</p>
                    
                    <button 
                      onClick={() => setCalculatorType(option.value)}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                        calculatorType === option.value
                          ? 'bg-[#FF6B2C] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
          <section className="py-24 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Start Secure Investing
              </h2>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
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

        <Footer />
      </div>
    </>
  );
}