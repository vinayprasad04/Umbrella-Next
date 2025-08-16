import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Other() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [calculatorType, setCalculatorType] = useState('EMI');
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('10');
  const [tenure, setTenure] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  interface CalculationResult {
    // EMI Calculator
    emi?: number;
    totalAmount?: number;
    totalInterest?: number;
    principal?: number;
    
    // CAGR Calculator
    cagr?: string;
    initialValue?: number;
    finalValue?: number;
    years?: number;
    totalReturn?: string;
    
    // Inflation Calculator
    currentValue?: number;
    futureValue?: number;
    inflationImpact?: number;
    purchasingPower?: number;
  }
  
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculatorOptions = [
    { value: 'EMI', label: 'EMI Calculator', description: 'Calculate loan EMI and payment schedule' },
    { value: 'CAGR', label: 'CAGR Calculator', description: 'Compound Annual Growth Rate calculator' },
    { value: 'INFLATION', label: 'Inflation Calculator', description: 'Calculate inflation impact on your money' }
  ];

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const calculateResults = () => {
    // Basic validation for required fields based on calculator type
    if (!principal) return;
    
    // CAGR requires currentValue, others need rate and tenure
    if (calculatorType === 'CAGR') {
      if (!currentValue || !tenure) return;
    } else {
      // Other calculators need rate and tenure
      if (!rate || !tenure) return;
    }

    const p = parseFloat(principal) || 0;
    const r = parseFloat(rate) || 0;
    const t = parseFloat(tenure) || 0;
    
    // Additional validation to prevent invalid calculations
    if (p <= 0) return;

    let calculationResult: CalculationResult = {};

    switch (calculatorType) {
      case 'EMI':
        const monthlyRate = r / 12 / 100;
        const totalPayments = t * 12;
        const emi = p * monthlyRate * Math.pow(1 + monthlyRate, totalPayments) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
        const totalAmount = emi * totalPayments;
        const totalInterest = totalAmount - p;
        
        calculationResult = {
          emi: Math.round(emi),
          totalAmount: Math.round(totalAmount),
          totalInterest: Math.round(totalInterest),
          principal: p
        };
        break;

      case 'CAGR':
        // For CAGR: principal = initial value, currentValue = final value, tenure = years
        if (!currentValue) return;
        const finalValue = parseFloat(currentValue);
        if (isNaN(finalValue) || finalValue <= 0) return;
        const cagr = (Math.pow(finalValue / p, 1 / t) - 1) * 100;
        
        calculationResult = {
          cagr: isNaN(cagr) ? '0.00' : cagr.toFixed(2),
          initialValue: p,
          finalValue: finalValue,
          years: t,
          totalReturn: isNaN(cagr) ? '0.00' : ((finalValue - p) / p * 100).toFixed(2)
        };
        break;

      case 'INFLATION':
        const futureValue = p * Math.pow(1 + r / 100, t);
        const inflationImpact = futureValue - p;
        
        calculationResult = {
          currentValue: p,
          futureValue: Math.round(futureValue),
          inflationImpact: Math.round(inflationImpact),
          purchasingPower: Math.round(p / Math.pow(1 + r / 100, t))
        };
        break;

    }

    setResult(calculationResult);
  };

  const handleGetStarted = () => {
    if (isLoggedIn) {
      router.push('/dashboard');
    } else {
      router.push('/signup');
    }
  };

  const getInputLabels = () => {
    switch (calculatorType) {
      case 'EMI':
        return {
          principal: 'Loan Amount (₹)',
          rate: 'Interest Rate (% per annum)',
          tenure: 'Loan Tenure (Years)',
          principalPlaceholder: 'e.g., 1000000',
          showCurrentValue: false
        };
      case 'CAGR':
        return {
          principal: 'Initial Investment (₹)',
          rate: 'Not Used',
          tenure: 'Investment Period (Years)',
          principalPlaceholder: 'e.g., 100000',
          showCurrentValue: true,
          currentValueLabel: 'Final Value (₹)'
        };
      case 'INFLATION':
        return {
          principal: 'Current Amount (₹)',
          rate: 'Inflation Rate (% per annum)',
          tenure: 'Number of Years',
          principalPlaceholder: 'e.g., 100000',
          showCurrentValue: false
        };
      default:
        return {
          principal: 'Amount (₹)',
          rate: 'Rate (%)',
          tenure: 'Period (Years)',
          principalPlaceholder: 'e.g., 100000',
          showCurrentValue: false
        };
    }
  };

  const labels = getInputLabels();

  const renderResults = () => {
    if (!result) return null;

    switch (calculatorType) {
      case 'EMI':
        return (
          <>
            <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">Monthly EMI</div>
                <div className="text-4xl font-bold text-[#FF6B2C] mb-4">
                  ₹{(result.emi || 0).toLocaleString()}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white/60 rounded-xl p-4">
                <div className="text-sm text-gray-600">Principal Amount</div>
                <div className="text-xl font-bold text-gray-800">
                  ₹{(result.principal || 0).toLocaleString()}
                </div>
              </div>
              
              <div className="bg-white/60 rounded-xl p-4">
                <div className="text-sm text-gray-600">Total Interest</div>
                <div className="text-xl font-bold text-red-600">
                  ₹{(result.totalInterest || 0).toLocaleString()}
                </div>
              </div>
              
              <div className="bg-white/60 rounded-xl p-4">
                <div className="text-sm text-gray-600">Total Amount</div>
                <div className="text-xl font-bold text-blue-600">
                  ₹{(result.totalAmount || 0).toLocaleString()}
                </div>
              </div>
            </div>
          </>
        );

      case 'CAGR':
        return (
          <>
            <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">CAGR</div>
                <div className="text-4xl font-bold text-[#FF6B2C] mb-4">
                  {result.cagr || '0.00'}%
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white/60 rounded-xl p-4">
                <div className="text-sm text-gray-600">Initial Value</div>
                <div className="text-xl font-bold text-gray-800">
                  ₹{(result.initialValue || 0).toLocaleString()}
                </div>
              </div>
              
              <div className="bg-white/60 rounded-xl p-4">
                <div className="text-sm text-gray-600">Final Value</div>
                <div className="text-xl font-bold text-green-600">
                  ₹{(result.finalValue || 0).toLocaleString()}
                </div>
              </div>
              
              <div className="bg-white/60 rounded-xl p-4">
                <div className="text-sm text-gray-600">Total Return</div>
                <div className="text-xl font-bold text-blue-600">
                  {result.totalReturn || '0.00'}%
                </div>
              </div>
            </div>
          </>
        );

      case 'INFLATION':
        return (
          <>
            <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">Future Value</div>
                <div className="text-4xl font-bold text-[#FF6B2C] mb-4">
                  ₹{(result.futureValue || 0).toLocaleString()}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white/60 rounded-xl p-4">
                <div className="text-sm text-gray-600">Current Value</div>
                <div className="text-xl font-bold text-gray-800">
                  ₹{(result.currentValue || 0).toLocaleString()}
                </div>
              </div>
              
              <div className="bg-white/60 rounded-xl p-4">
                <div className="text-sm text-gray-600">Inflation Impact</div>
                <div className="text-xl font-bold text-red-600">
                  ₹{(result.inflationImpact || 0).toLocaleString()}
                </div>
              </div>
              
              <div className="bg-white/60 rounded-xl p-4">
                <div className="text-sm text-gray-600">Purchasing Power</div>
                <div className="text-xl font-bold text-orange-600">
                  ₹{(result.purchasingPower || 0).toLocaleString()}
                </div>
              </div>
            </div>
          </>
        );


      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Results will appear here</p>
          </div>
        );
    }
  };

  return (
    <>
      <Head>
        <title>Other Calculators - Umbrella Financial</title>
        <meta name="description" content="Access various financial calculators including EMI, CAGR, and Inflation calculators for your financial planning needs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-cyan-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-full border border-cyan-200 mb-8">
                <span className="text-sm font-semibold text-cyan-600">🧮 Financial Calculators</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Other Financial
                </span>
                <br />
                <span className="text-gray-800">Calculators</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Comprehensive collection of financial calculators for EMI, CAGR, Inflation 
                and more to help with your financial planning needs.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">Multiple</div>
                  <div className="text-gray-600">Calculators</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">Accurate</div>
                  <div className="text-gray-600">Results</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">Easy</div>
                  <div className="text-gray-600">To Use</div>
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
                      {calculatorOptions.find(opt => opt.value === calculatorType)?.label}
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          {labels.principal}
                        </label>
                        <input
                          type="number"
                          placeholder={labels.principalPlaceholder}
                          className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg"
                          value={principal}
                          onChange={(e) => setPrincipal(e.target.value)}
                        />
                      </div>
                      
                      {labels.showCurrentValue && (
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            {labels.currentValueLabel}
                          </label>
                          <input
                            type="number"
                            placeholder="e.g., 200000"
                            className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg"
                            value={currentValue}
                            onChange={(e) => setCurrentValue(e.target.value)}
                          />
                        </div>
                      )}
                      
                      {!labels.rate.includes('Not Used') && (
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            {labels.rate}
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                          />
                        </div>
                      )}
                      
                      {!labels.tenure.includes('Not Used') && (
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            {labels.tenure}
                          </label>
                          <input
                            type="number"
                            placeholder="e.g., 10"
                            className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg"
                            value={tenure}
                            onChange={(e) => setTenure(e.target.value)}
                          />
                        </div>
                      )}
                      
                      <button 
                        className="w-full bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        onClick={calculateResults}
                      >
                        Calculate
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Results */}
                  <div className="bg-gradient-to-br from-[#FF6B2C]/10 to-[#FF8A50]/10 rounded-3xl p-8 border border-[#FF6B2C]/20">
                    <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                      Calculation Results
                    </h3>
                    
                    <div className="space-y-6">
                      {renderResults() || (
                        <div className="text-center py-12">
                          <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-gray-500 text-lg">
                            Enter your details to see the calculation results
                          </p>
                        </div>
                      )}
                      
                      {result && (
                        <div className="text-center pt-4">
                          <button 
                            onClick={handleGetStarted}
                            className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                          >
                            {isLoggedIn ? 'Get Financial Advice' : 'Create Account'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Make Informed Financial Decisions
              </h2>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Use our comprehensive suite of calculators to plan your finances better
              </p>
              
              <button 
                onClick={handleGetStarted}
                className="group bg-white text-[#FF6B2C] px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
              >
                {isLoggedIn ? 'Get Financial Advice' : 'Get Started Free'}
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