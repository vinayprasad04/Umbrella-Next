import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface TaxResult {
  oldRegime: {
    grossIncome: number;
    taxableIncome: number;
    totalDeductions: number;
    incomeTax: number;
    cess: number;
    capitalGainsTax: number;
    totalTax: number;
    netIncome: number;
    effectiveRate: string;
    breakdown: Array<{
      slab: string;
      rate: string;
      taxableAmount: number;
      tax: number;
    }>;
  };
  newRegime: {
    grossIncome: number;
    taxableIncome: number;
    totalDeductions: number;
    incomeTax: number;
    cess: number;
    capitalGainsTax: number;
    totalTax: number;
    netIncome: number;
    effectiveRate: string;
    breakdown: Array<{
      slab: string;
      rate: string;
      taxableAmount: number;
      tax: number;
    }>;
  };
  capitalGainsBreakdown: {
    stcgEquity: number;
    stcgEquityTax: number;
    ltcgEquity: number;
    ltcgEquityTax: number;
    stcgOther: number;
    ltcgOther: number;
    ltcgOtherTax: number;
    totalCapitalGainsTax: number;
  };
  savings: number;
  recommendedRegime: string;
}

export default function TaxCalculator() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Personal Details
  const [assessmentYear, setAssessmentYear] = useState('2025-26');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [residentialStatus, setResidentialStatus] = useState('resident');
  
  // Income Details
  const [basicSalary, setBasicSalary] = useState('');
  const [hra, setHra] = useState('');
  const [specialAllowance, setSpecialAllowance] = useState('');
  const [otherAllowances, setOtherAllowances] = useState('');
  const [bonus, setBonus] = useState('');
  const [otherIncome, setOtherIncome] = useState('');
  
  // Capital Gains from Stock Market
  const [stcgEquity, setStcgEquity] = useState(''); // Short Term Capital Gains on Equity (>15%)
  const [ltcgEquity, setLtcgEquity] = useState(''); // Long Term Capital Gains on Equity (>10%)
  const [stcgOther, setStcgOther] = useState(''); // Short Term Capital Gains on Other investments
  const [ltcgOther, setLtcgOther] = useState(''); // Long Term Capital Gains on Other investments
  
  // HRA Details
  const [cityType, setCityType] = useState('metro');
  const [rentPaid, setRentPaid] = useState('');
  
  // Deductions (Old Regime)
  const [section80C, setSection80C] = useState('');
  const [section80DSelf, setSection80DSelf] = useState('');
  const [section80DParents, setSection80DParents] = useState('');
  const [section80CCD1B, setSection80CCD1B] = useState('');
  const [section80E, setSection80E] = useState('');
  const [section80G50, setSection80G50] = useState('');
  const [section80G100, setSection80G100] = useState('');
  const [section24B, setSection24B] = useState('');
  const [otherDeductions, setOtherDeductions] = useState('');
  
  // Professional Tax
  const [professionalTax, setProfessionalTax] = useState('');
  
  const [result, setResult] = useState<TaxResult | null>(null);
  const [activeTab, setActiveTab] = useState('comparison');
  const [showCityListModal, setShowCityListModal] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  // Tax configuration for different assessment years
  const getTaxConfig = (assessmentYear: string) => {
    const configs = {
      '2025-26': {
        standardDeduction: 75000,
        rebateLimit: 700000,
        rebateAmount: 25000,
        oldRegime: {
          exemptionBelow60: 250000,
          exemptionBelow80: 300000,
          exemptionAbove80: 500000,
          slabs: [
            { min: 0, max: 500000, rate: 0.05 },
            { min: 500000, max: 1000000, rate: 0.20 },
            { min: 1000000, max: Infinity, rate: 0.30 }
          ]
        },
        newRegime: {
          exemption: 300000,
          slabs: [
            { min: 300000, max: 700000, rate: 0.05 },
            { min: 700000, max: 1000000, rate: 0.10 },
            { min: 1000000, max: 1200000, rate: 0.15 },
            { min: 1200000, max: 1500000, rate: 0.20 },
            { min: 1500000, max: Infinity, rate: 0.30 }
          ]
        }
      },
      '2024-25': {
        standardDeduction: 50000,
        rebateLimit: 700000,
        rebateAmount: 25000,
        oldRegime: {
          exemptionBelow60: 250000,
          exemptionBelow80: 300000,
          exemptionAbove80: 500000,
          slabs: [
            { min: 0, max: 500000, rate: 0.05 },
            { min: 500000, max: 1000000, rate: 0.20 },
            { min: 1000000, max: Infinity, rate: 0.30 }
          ]
        },
        newRegime: {
          exemption: 300000,
          slabs: [
            { min: 300000, max: 600000, rate: 0.05 },
            { min: 600000, max: 900000, rate: 0.10 },
            { min: 900000, max: 1200000, rate: 0.15 },
            { min: 1200000, max: 1500000, rate: 0.20 },
            { min: 1500000, max: Infinity, rate: 0.30 }
          ]
        }
      },
      '2023-24': {
        standardDeduction: 50000,
        rebateLimit: 500000,
        rebateAmount: 12500,
        oldRegime: {
          exemptionBelow60: 250000,
          exemptionBelow80: 300000,
          exemptionAbove80: 500000,
          slabs: [
            { min: 0, max: 500000, rate: 0.05 },
            { min: 500000, max: 1000000, rate: 0.20 },
            { min: 1000000, max: Infinity, rate: 0.30 }
          ]
        },
        newRegime: {
          exemption: 250000,
          slabs: [
            { min: 250000, max: 500000, rate: 0.05 },
            { min: 500000, max: 750000, rate: 0.10 },
            { min: 750000, max: 1000000, rate: 0.15 },
            { min: 1000000, max: 1250000, rate: 0.20 },
            { min: 1250000, max: 1500000, rate: 0.25 },
            { min: 1500000, max: Infinity, rate: 0.30 }
          ]
        }
      },
      '2022-23': {
        standardDeduction: 50000,
        rebateLimit: 500000,
        rebateAmount: 12500,
        oldRegime: {
          exemptionBelow60: 250000,
          exemptionBelow80: 300000,
          exemptionAbove80: 500000,
          slabs: [
            { min: 0, max: 500000, rate: 0.05 },
            { min: 500000, max: 1000000, rate: 0.20 },
            { min: 1000000, max: Infinity, rate: 0.30 }
          ]
        },
        newRegime: {
          exemption: 250000,
          slabs: [
            { min: 250000, max: 500000, rate: 0.05 },
            { min: 500000, max: 750000, rate: 0.10 },
            { min: 750000, max: 1000000, rate: 0.15 },
            { min: 1000000, max: 1250000, rate: 0.20 },
            { min: 1250000, max: 1500000, rate: 0.25 },
            { min: 1500000, max: Infinity, rate: 0.30 }
          ]
        }
      }
    };
    
    return configs[assessmentYear as keyof typeof configs] || configs['2025-26'];
  };

  const calculateHRAExemption = () => {
    if (!basicSalary || !hra || !rentPaid) return 0;
    
    const basic = parseFloat(basicSalary);
    const hraReceived = parseFloat(hra);
    const rent = parseFloat(rentPaid);
    
    // HRA exemption calculation
    const hraPercent = cityType === 'metro' ? 0.5 : 0.4;
    const exemption1 = hraReceived;
    const exemption2 = basic * hraPercent;
    const exemption3 = Math.max(0, rent - (basic * 0.1));
    
    return Math.min(exemption1, exemption2, exemption3);
  };

  const calculateOldRegimeTax = (taxableIncome: number) => {
    let tax = 0;
    const breakdown = [];
    const userAge = parseInt(age) || 0;
    const config = getTaxConfig(assessmentYear);
    
    // Tax slabs based on age and residential status
    let basicExemption = config.oldRegime.exemptionBelow60;
    
    // NRIs don't get basic exemption
    if (residentialStatus === 'nri') {
      basicExemption = 0;
    } else {
      // Residents get age-based exemptions
      if (userAge >= 60 && userAge < 80) {
        basicExemption = config.oldRegime.exemptionBelow80;
      } else if (userAge >= 80) {
        basicExemption = config.oldRegime.exemptionAbove80;
      }
    }
    
    let previousMax = basicExemption;
    
    for (const slab of config.oldRegime.slabs) {
      if (taxableIncome > previousMax) {
        const taxableAmount = Math.min(taxableIncome, slab.max) - previousMax;
        const slabTax = taxableAmount * slab.rate;
        tax += slabTax;
        
        if (taxableAmount > 0) {
          const slabLabel = slab.max === Infinity 
            ? `Above ₹${(previousMax/100000).toFixed(0)}L`
            : `₹${(previousMax/100000).toFixed(0)}L - ₹${(slab.max/100000).toFixed(0)}L`;
          
          breakdown.push({
            slab: slabLabel,
            rate: `${(slab.rate * 100).toFixed(0)}%`,
            taxableAmount: taxableAmount,
            tax: slabTax
          });
        }
        
        previousMax = slab.max;
        if (taxableIncome <= slab.max) break;
      }
    }

    return { tax, breakdown };
  };

  const calculateNewRegimeTax = (taxableIncome: number) => {
    let tax = 0;
    const breakdown = [];
    const config = getTaxConfig(assessmentYear);
    
    // NRIs don't get basic exemption in new regime either
    const basicExemption = residentialStatus === 'nri' ? 0 : config.newRegime.exemption;
    
    for (const slab of config.newRegime.slabs) {
      const adjustedMin = Math.max(slab.min, basicExemption);
      if (taxableIncome > adjustedMin) {
        const taxableAmount = Math.min(taxableIncome, slab.max) - adjustedMin;
        const slabTax = taxableAmount * slab.rate;
        tax += slabTax;
        
        if (taxableAmount > 0) {
          const slabLabel = slab.max === Infinity 
            ? `Above ₹${(adjustedMin/100000).toFixed(0)}L`
            : `₹${(adjustedMin/100000).toFixed(0)}L - ₹${(slab.max/100000).toFixed(0)}L`;
          
          breakdown.push({
            slab: slabLabel,
            rate: `${(slab.rate * 100).toFixed(0)}%`,
            taxableAmount: taxableAmount,
            tax: slabTax
          });
        }
        
        if (taxableIncome <= slab.max) break;
      }
    }

    return { tax, breakdown };
  };

  const calculateTax = () => {
    if (!basicSalary) return;

    const config = getTaxConfig(assessmentYear);
    const basic = parseFloat(basicSalary) || 0;
    const hraAmount = parseFloat(hra) || 0;
    const special = parseFloat(specialAllowance) || 0;
    const other = parseFloat(otherAllowances) || 0;
    const bonusAmount = parseFloat(bonus) || 0;
    const otherIncomeAmount = parseFloat(otherIncome) || 0;
    const profTax = parseFloat(professionalTax) || 0;

    // Capital Gains calculations
    const stcgEquityAmount = parseFloat(stcgEquity) || 0;
    const ltcgEquityAmount = parseFloat(ltcgEquity) || 0;
    const stcgOtherAmount = parseFloat(stcgOther) || 0;
    const ltcgOtherAmount = parseFloat(ltcgOther) || 0;

    // STCG from other investments is added to regular income
    // LTCG and STCG equity are taxed separately
    const regularIncome = basic + hraAmount + special + other + bonusAmount + otherIncomeAmount + stcgOtherAmount;
    
    // Calculate capital gains taxes separately
    const stcgEquityTax = stcgEquityAmount * 0.156; // 15% + 4% cess
    const ltcgEquityTax = Math.max(0, ltcgEquityAmount - 100000) * 0.104; // 10% + 4% cess on amount above 1L
    const ltcgOtherTax = ltcgOtherAmount * 0.208; // 20% + 4% cess with indexation

    const totalCapitalGainsTax = stcgEquityTax + ltcgEquityTax + ltcgOtherTax;

    const grossIncome = regularIncome;

    // HRA Exemption
    const hraExemption = calculateHRAExemption();

    // Health Insurance calculation with separate limits
    const userAge = parseInt(age) || 0;
    const section80DSelfAmount = Math.min(parseFloat(section80DSelf) || 0, userAge >= 60 ? 50000 : 25000);
    const section80DParentsAmount = Math.min(parseFloat(section80DParents) || 0, 50000); // Max 50k for parents
    const totalSection80D = section80DSelfAmount + section80DParentsAmount;

    // 80G Donations calculation with different deduction rates
    const section80G50Amount = (parseFloat(section80G50) || 0) * 0.5; // 50% of donation amount
    const section80G100Amount = parseFloat(section80G100) || 0; // 100% of donation amount
    const totalSection80G = section80G50Amount + section80G100Amount;

    // Old Regime Calculations - NRIs get limited deductions
    let oldRegimeDeductions;
    if (residentialStatus === 'nri') {
      // NRIs typically only get standard deduction and professional tax
      oldRegimeDeductions = profTax;
    } else {
      // Residents get all deductions
      oldRegimeDeductions = 
        (parseFloat(section80C) || 0) +
        totalSection80D +
        (parseFloat(section80CCD1B) || 0) +
        (parseFloat(section80E) || 0) +
        totalSection80G +
        (parseFloat(section24B) || 0) +
        (parseFloat(otherDeductions) || 0) +
        hraExemption +
        profTax;
    }

    const oldTaxableIncome = Math.max(0, grossIncome - oldRegimeDeductions);
    const oldTaxResult = calculateOldRegimeTax(oldTaxableIncome);
    const oldCess = oldTaxResult.tax * 0.04;
    const oldTotalTax = oldTaxResult.tax + oldCess;

    // Apply rebate under section 87A for old regime
    let oldTotalTaxAfterRebate = oldTotalTax;
    if (oldTaxableIncome <= 500000) { // Old regime rebate limit is ₹5L
      const oldRebate = Math.min(oldTaxResult.tax, 12500); // Old regime rebate is ₹12,500
      oldTotalTaxAfterRebate = Math.max(0, oldTotalTax - oldRebate);
    }
    // Add capital gains tax to old regime
    oldTotalTaxAfterRebate += totalCapitalGainsTax;

    // New Regime Calculations (only standard deduction and professional tax)
    const newRegimeDeductions = config.standardDeduction + profTax;
    const newTaxableIncome = Math.max(0, grossIncome - newRegimeDeductions);
    const newTaxResult = calculateNewRegimeTax(newTaxableIncome);
    const newCess = newTaxResult.tax * 0.04;
    const newTotalTax = newTaxResult.tax + newCess;

    // Apply rebate under section 87A for new regime
    let newTotalTaxAfterRebate = newTotalTax;
    if (newTaxableIncome <= config.rebateLimit) {
      const newRebate = Math.min(newTaxResult.tax, config.rebateAmount);
      newTotalTaxAfterRebate = Math.max(0, newTotalTax - newRebate);
    }
    // Add capital gains tax to new regime
    newTotalTaxAfterRebate += totalCapitalGainsTax;

    const savings = oldTotalTaxAfterRebate - newTotalTaxAfterRebate;
    const recommendedRegime = savings > 0 ? 'New Tax Regime' : 'Old Tax Regime';

    const totalGrossIncome = grossIncome + stcgEquityAmount + ltcgEquityAmount + ltcgOtherAmount;

    setResult({
      oldRegime: {
        grossIncome: totalGrossIncome,
        taxableIncome: oldTaxableIncome,
        totalDeductions: oldRegimeDeductions,
        incomeTax: oldTaxResult.tax,
        cess: oldCess,
        capitalGainsTax: totalCapitalGainsTax,
        totalTax: oldTotalTaxAfterRebate,
        netIncome: totalGrossIncome - oldTotalTaxAfterRebate,
        effectiveRate: ((oldTotalTaxAfterRebate / totalGrossIncome) * 100).toFixed(2),
        breakdown: oldTaxResult.breakdown
      },
      newRegime: {
        grossIncome: totalGrossIncome,
        taxableIncome: newTaxableIncome,
        totalDeductions: newRegimeDeductions,
        incomeTax: newTaxResult.tax,
        cess: newCess,
        capitalGainsTax: totalCapitalGainsTax,
        totalTax: newTotalTaxAfterRebate,
        netIncome: totalGrossIncome - newTotalTaxAfterRebate,
        effectiveRate: ((newTotalTaxAfterRebate / totalGrossIncome) * 100).toFixed(2),
        breakdown: newTaxResult.breakdown
      },
      capitalGainsBreakdown: {
        stcgEquity: stcgEquityAmount,
        stcgEquityTax: stcgEquityTax,
        ltcgEquity: ltcgEquityAmount,
        ltcgEquityTax: ltcgEquityTax,
        stcgOther: stcgOtherAmount,
        ltcgOther: ltcgOtherAmount,
        ltcgOtherTax: ltcgOtherTax,
        totalCapitalGainsTax: totalCapitalGainsTax
      },
      savings: Math.abs(savings),
      recommendedRegime
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
        <title>Comprehensive Indian Tax Calculator - Umbrella Financial</title>
        <meta name="description" content="Complete Indian income tax calculator with Old vs New regime comparison for multiple assessment years, HRA, 80C, 80D deductions and detailed tax planning." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-green-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-teal-400/10 to-green-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200 mb-8">
                <span className="text-sm font-semibold text-green-600">🧾 Comprehensive Tax Calculator</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Indian Income Tax
                </span>
                <br />
                <span className="text-gray-800">Calculator</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Complete tax calculation with Old vs New regime comparison, HRA exemption, 
                all deductions under Chapter VI-A, and personalized tax planning advice.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">Old vs New</div>
                  <div className="text-gray-600">Regime Compare</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">HRA</div>
                  <div className="text-gray-600">Calculation</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">All</div>
                  <div className="text-gray-600">Deductions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">Smart</div>
                  <div className="text-gray-600">Planning</div>
                </div>
              </div>
            </div>
          </section>

          {/* Calculator Section */}
          <section className="py-24 bg-white relative overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  
                  {/* Input Form */}
                  <div className="lg:col-span-3 bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                      Tax Calculator
                    </h2>
                    
                    {/* Link to Complete Tax Planning Guide */}
                    <div className="text-center mb-8">
                      <button
                        onClick={() => router.push('/tax-planning')}
                        className="text-sm text-gray-600 hover:text-[#FF6B2C] underline underline-offset-2 transition-colors duration-200"
                      >
                        View Complete Tax Planning Guide →
                      </button>
                    </div>
                    
                    <div className="space-y-8">
                      
                      {/* Personal Details */}
                      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                        <h3 className="text-lg font-bold text-blue-800 mb-4">👤 Personal Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Assessment Year
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Assessment Year vs Financial Year:</div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="font-medium text-green-300">• Financial Year (FY):</span>
                                      <div className="ml-2">- Period when income is earned (April 1 to March 31)</div>
                                      <div className="ml-2">- Example: FY 2024-25 = April 1, 2024 to March 31, 2025</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-yellow-300">• Assessment Year (AY):</span>
                                      <div className="ml-2">- Period when you file tax return for previous FY</div>
                                      <div className="ml-2">- Always next year after FY</div>
                                      <div className="ml-2">- Example: AY 2025-26 for income earned in FY 2024-25</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-blue-300">• Key Point:</span>
                                      <div className="ml-2">- Tax rules and slabs are based on the Assessment Year</div>
                                      <div className="ml-2">- Select the AY for which you want to calculate tax</div>
                                    </div>
                                  </div>
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </label>
                            <select
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm font-medium"
                              value={assessmentYear}
                              onChange={(e) => setAssessmentYear(e.target.value)}
                            >
                              <option value="2025-26">AY 2025-26 (FY 2024-25) - Current</option>
                              <option value="2024-25">AY 2024-25 (FY 2023-24)</option>
                              <option value="2023-24">AY 2023-24 (FY 2022-23)</option>
                              <option value="2022-23">AY 2022-23 (FY 2021-22)</option>
                            </select>
                            <p className="text-xs text-blue-600 mt-1">
                              💡 Different years have different tax slabs and rates
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Age
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Age-Based Tax Benefits:</div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="font-medium text-green-300">• Below 60 years:</span>
                                      <div className="ml-2">- Basic exemption: ₹2.5L (Old Regime)</div>
                                      <div className="ml-2">- Health insurance: ₹25,000 limit</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-yellow-300">• 60-80 years (Senior Citizen):</span>
                                      <div className="ml-2">- Basic exemption: ₹3L (Old Regime)</div>
                                      <div className="ml-2">- Health insurance: ₹50,000 limit</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-orange-300">• Above 80 years (Super Senior):</span>
                                      <div className="ml-2">- Basic exemption: ₹5L (Old Regime)</div>
                                      <div className="ml-2">- Health insurance: ₹50,000 limit</div>
                                      <div className="ml-2">- Additional medical benefits</div>
                                    </div>
                                  </div>
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 30"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              💡 {parseInt(age) >= 80 ? 'Super Senior: ₹5L exemption, ₹50K health insurance' : 
                                  parseInt(age) >= 60 ? 'Senior Citizen: ₹3L exemption, ₹50K health insurance' : 
                                  'Below 60: ₹2.5L exemption, ₹25K health insurance'}
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Gender
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Gender & Tax Implications:</div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="font-medium text-green-300">• Tax Slabs:</span>
                                      <div className="ml-2">- Same tax rates for all genders</div>
                                      <div className="ml-2">- No gender-based exemptions</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-blue-300">• Equal Treatment:</span>
                                      <div className="ml-2">- Indian tax law is gender-neutral</div>
                                      <div className="ml-2">- Age is the only demographic factor</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-yellow-300">• Collection Purpose:</span>
                                      <div className="ml-2">- Required for tax filing compliance</div>
                                      <div className="ml-2">- Used for statistical analysis only</div>
                                    </div>
                                  </div>
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </label>
                            <select
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">
                              💡 Gender does not affect tax rates - all citizens have equal tax treatment
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Residential Status
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Tax Implications:</div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="font-medium text-green-300">• Resident:</span>
                                      <div className="ml-2">- Taxed on worldwide income</div>
                                      <div className="ml-2">- All deductions available</div>
                                      <div className="ml-2">- Standard exemption limits</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-orange-300">• Non-Resident:</span>
                                      <div className="ml-2">- Taxed only on Indian income</div>
                                      <div className="ml-2">- Limited deductions</div>
                                      <div className="ml-2">- No basic exemption</div>
                                      <div className="ml-2">- Tax from ₹1 (no ₹2.5L exemption)</div>
                                    </div>
                                  </div>
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </label>
                            <select
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={residentialStatus}
                              onChange={(e) => setResidentialStatus(e.target.value)}
                            >
                              <option value="resident">Resident Indian</option>
                              <option value="nri">Non-Resident Indian (NRI)</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">
                              💡 {residentialStatus === 'nri' ? 'NRIs: Taxed on Indian income only, no basic exemption' : 'Residents: Taxed on global income with full exemptions'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Income Details */}
                      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                        <h3 className="text-lg font-bold text-green-800 mb-4">💰 Income Details (Annual)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Basic Salary (₹)</label>
                            <input
                              type="number"
                              placeholder="e.g., 800000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={basicSalary}
                              onChange={(e) => setBasicSalary(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">HRA (₹)</label>
                            <input
                              type="number"
                              placeholder="e.g., 240000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={hra}
                              onChange={(e) => setHra(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Special Allowance (₹)</label>
                            <input
                              type="number"
                              placeholder="e.g., 100000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={specialAllowance}
                              onChange={(e) => setSpecialAllowance(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Other Allowances (₹)</label>
                            <input
                              type="number"
                              placeholder="e.g., 50000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={otherAllowances}
                              onChange={(e) => setOtherAllowances(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Bonus (₹)</label>
                            <input
                              type="number"
                              placeholder="e.g., 80000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={bonus}
                              onChange={(e) => setBonus(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Other Income (₹)</label>
                            <input
                              type="number"
                              placeholder="e.g., 25000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={otherIncome}
                              onChange={(e) => setOtherIncome(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Capital Gains from Stock Market */}
                      <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                        <h3 className="text-lg font-bold text-red-800 mb-4">📈 Capital Gains from Stock Market (Annual)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              STCG - Equity Shares (₹)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-red-100 text-red-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Short Term Capital Gains - Equity:</div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="font-medium text-red-300">• Definition:</span>
                                      <div className="ml-2">- Gains from equity shares held ≤ 12 months</div>
                                      <div className="ml-2">- Gains from equity mutual funds held ≤ 12 months</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-yellow-300">• Tax Rate:</span>
                                      <div className="ml-2">- 15% + 4% cess = 15.6% total</div>
                                      <div className="ml-2">- Taxed separately from other income</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-green-300">• Example:</span>
                                      <div className="ml-2">- Buy: ₹1L, Sell: ₹1.2L in 6 months</div>
                                      <div className="ml-2">- STCG: ₹20,000, Tax: ₹3,120</div>
                                    </div>
                                  </div>
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 50000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={stcgEquity}
                              onChange={(e) => setStcgEquity(e.target.value)}
                            />
                            <p className="text-xs text-red-600 mt-1">
                              💡 Equity/MF held ≤12 months - 15.6% tax rate
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              LTCG - Equity Shares (₹)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">Long Term Capital Gains - Equity:</div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="font-medium text-green-300">• Definition:</span>
                                      <div className="ml-2">- Gains from equity shares held &gt; 12 months</div>
                                      <div className="ml-2">- Gains from equity mutual funds held &gt; 12 months</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-blue-300">• Tax Structure:</span>
                                      <div className="ml-2">- First ₹1L per year: Tax-free</div>
                                      <div className="ml-2">- Above ₹1L: 10% + 4% cess = 10.4%</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-yellow-300">• Example:</span>
                                      <div className="ml-2">- LTCG: ₹1.5L, Tax: (₹1.5L-₹1L) × 10.4%</div>
                                      <div className="ml-2">- Tax: ₹50,000 × 10.4% = ₹5,200</div>
                                    </div>
                                  </div>
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 150000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={ltcgEquity}
                              onChange={(e) => setLtcgEquity(e.target.value)}
                            />
                            <p className="text-xs text-green-600 mt-1">
                              💡 Equity/MF held &gt;12 months - ₹1L exempt, then 10.4%
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              STCG - Other Investments (₹)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-purple-100 text-purple-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">STCG - Other Investments:</div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="font-medium text-purple-300">• Includes:</span>
                                      <div className="ml-2">- Debt mutual funds held ≤ 36 months</div>
                                      <div className="ml-2">- Gold, property, bonds held ≤ threshold</div>
                                      <div className="ml-2">- Cryptocurrency gains</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-orange-300">• Tax Rate:</span>
                                      <div className="ml-2">- Added to total income</div>
                                      <div className="ml-2">- Taxed at your regular income tax slab</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-blue-300">• Important:</span>
                                      <div className="ml-2">- No separate tax rate</div>
                                      <div className="ml-2">- Increases your total taxable income</div>
                                    </div>
                                  </div>
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 25000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={stcgOther}
                              onChange={(e) => setStcgOther(e.target.value)}
                            />
                            <p className="text-xs text-purple-600 mt-1">
                              💡 Debt MF, gold, crypto - taxed at your income slab
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              LTCG - Other Investments (₹)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-indigo-100 text-indigo-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">LTCG - Other Investments:</div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="font-medium text-indigo-300">• Includes:</span>
                                      <div className="ml-2">- Debt mutual funds held &gt; 36 months</div>
                                      <div className="ml-2">- Gold held &gt; 36 months</div>
                                      <div className="ml-2">- Property held &gt; 24 months</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-green-300">• Tax Rate:</span>
                                      <div className="ml-2">- 20% + 4% cess = 20.8% total</div>
                                      <div className="ml-2">- With indexation benefit (inflation adjustment)</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-yellow-300">• Benefit:</span>
                                      <div className="ml-2">- Cost price adjusted for inflation</div>
                                      <div className="ml-2">- Reduces taxable gains significantly</div>
                                    </div>
                                  </div>
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 75000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={ltcgOther}
                              onChange={(e) => setLtcgOther(e.target.value)}
                            />
                            <p className="text-xs text-indigo-600 mt-1">
                              💡 Debt MF, gold, property &gt;threshold - 20.8% with indexation
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* HRA Details */}
                      <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
                        <h3 className="text-lg font-bold text-purple-800 mb-4">🏠 HRA Exemption Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">City Type</label>
                            <select
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={cityType}
                              onChange={(e) => setCityType(e.target.value)}
                            >
                              <option value="metro">Metro City (50% of Basic)</option>
                              <option value="non-metro">Non-Metro City (40% of Basic)</option>
                            </select>
                            <div className="mt-2">
                              <button
                                type="button"
                                onClick={() => setShowCityListModal(true)}
                                className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer bg-transparent border-none flex items-center gap-1"
                              >
                                📍 View Metro vs Non-Metro City List
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Annual Rent Paid (₹)</label>
                            <input
                              type="number"
                              placeholder="e.g., 240000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={rentPaid}
                              onChange={(e) => setRentPaid(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Deductions */}
                      <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
                        <h3 className="text-lg font-bold text-orange-800 mb-4">📋 Deductions (Old Regime Only)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">80C (PF, ELSS, PPF etc.) (₹)</label>
                            <input
                              type="number"
                              placeholder="Max: 150000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={section80C}
                              onChange={(e) => setSection80C(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">80D Self/Family (Health Insurance) (₹)</label>
                            <input
                              type="number"
                              placeholder={`Max: ${parseInt(age) >= 60 ? '50000' : '25000'}`}
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={section80DSelf}
                              onChange={(e) => setSection80DSelf(e.target.value)}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              💡 {parseInt(age) >= 60 ? 'Senior citizens: ₹50,000' : 'Below 60: ₹25,000'}
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">80D Parents (Health Insurance) (₹)</label>
                            <input
                              type="number"
                              placeholder="Max: 50000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={section80DParents}
                              onChange={(e) => setSection80DParents(e.target.value)}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              💡 Additional ₹50,000 for parents regardless of age
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">80CCD(1B) (NPS) (₹)</label>
                            <input
                              type="number"
                              placeholder="Max: 50000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={section80CCD1B}
                              onChange={(e) => setSection80CCD1B(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">80E (Education Loan) (₹)</label>
                            <input
                              type="number"
                              placeholder="No limit"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={section80E}
                              onChange={(e) => setSection80E(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              80G Donations (50% deduction) (₹)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-orange-100 text-orange-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">50% Deduction Category:</div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="font-medium text-orange-300">• Government Funds:</span>
                                      <div className="ml-2">- PM National Relief Fund</div>
                                      <div className="ml-2">- National Defence Fund</div>
                                      <div className="ml-2">- State Government Relief Funds</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-yellow-300">• Educational Institutions:</span>
                                      <div className="ml-2">- Government schools/colleges</div>
                                      <div className="ml-2">- Some approved private institutions</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-blue-300">• Other Organizations:</span>
                                      <div className="ml-2">- Some NGOs without 100% exemption</div>
                                      <div className="ml-2">- Certain charitable trusts</div>
                                    </div>
                                  </div>
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="Donation amount (50% deductible)"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={section80G50}
                              onChange={(e) => setSection80G50(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              80G Donations (100% deduction) (₹)
                              <div className="group relative inline-block ml-1">
                                <span className="w-4 h-4 bg-green-100 text-green-600 rounded-full text-xs flex items-center justify-center cursor-help">?</span>
                                <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 z-[9999]">
                                  <div className="font-semibold mb-2">100% Deduction Category:</div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="font-medium text-green-300">• Prime Minister&apos;s Funds:</span>
                                      <div className="ml-2">- PM CARES Fund</div>
                                      <div className="ml-2">- PM National Relief Fund</div>
                                      <div className="ml-2">- Clean Ganga Fund</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-blue-300">• Government Schemes:</span>
                                      <div className="ml-2">- Swachh Bharat Kosh</div>
                                      <div className="ml-2">- National Heritage Fund</div>
                                      <div className="ml-2">- Pradhan Mantri Kaushal Vikas Yojana</div>
                                    </div>
                                    <div>
                                      <span className="font-medium text-purple-300">• Special Categories:</span>
                                      <div className="ml-2">- Government libraries</div>
                                      <div className="ml-2">- Government museums</div>
                                      <div className="ml-2">- Government zoos</div>
                                    </div>
                                  </div>
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            </label>
                            <input
                              type="number"
                              placeholder="Donation amount (100% deductible)"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={section80G100}
                              onChange={(e) => setSection80G100(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">24(b) (Home Loan Interest) (₹)</label>
                            <input
                              type="number"
                              placeholder="Max: 200000"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={section24B}
                              onChange={(e) => setSection24B(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Tax (₹)</label>
                            <input
                              type="number"
                              placeholder="e.g., 2500"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={professionalTax}
                              onChange={(e) => setProfessionalTax(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Other Deductions (₹)</label>
                            <input
                              type="number"
                              placeholder="80TTA, 80TTB etc."
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={otherDeductions}
                              onChange={(e) => setOtherDeductions(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        className="w-full bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        onClick={calculateTax}
                      >
                        Calculate Tax & Compare Regimes
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Results */}
                  <div className="lg:col-span-2 bg-gradient-to-br from-[#FF6B2C]/10 to-[#FF8A50]/10 rounded-3xl p-8 border border-[#FF6B2C]/20">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                      Tax Calculation Results
                    </h3>
                    <div className="text-center mb-6">
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {assessmentYear === '2025-26' ? 'AY 2025-26 (FY 2024-25) - Current' :
                         assessmentYear === '2024-25' ? 'AY 2024-25 (FY 2023-24)' :
                         assessmentYear === '2023-24' ? 'AY 2023-24 (FY 2022-23)' :
                         'AY 2022-23 (FY 2021-22)'}
                      </span>
                    </div>
                    
                    {result ? (
                      <div className="space-y-6">
                        {/* Tabs */}
                        <div className="flex rounded-xl bg-white p-1">
                          <button
                            onClick={() => setActiveTab('comparison')}
                            className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                              activeTab === 'comparison'
                                ? 'bg-[#FF6B2C] text-white'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                          >
                            Comparison
                          </button>
                          <button
                            onClick={() => setActiveTab('old')}
                            className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                              activeTab === 'old'
                                ? 'bg-[#FF6B2C] text-white'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                          >
                            Old Regime
                          </button>
                          <button
                            onClick={() => setActiveTab('new')}
                            className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                              activeTab === 'new'
                                ? 'bg-[#FF6B2C] text-white'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                          >
                            New Regime
                          </button>
                          <button
                            onClick={() => setActiveTab('capital')}
                            className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                              activeTab === 'capital'
                                ? 'bg-[#FF6B2C] text-white'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                          >
                            Capital Gains
                          </button>
                        </div>

                        {activeTab === 'comparison' && (
                          <div className="space-y-4">
                            <div className="bg-white/80 rounded-2xl p-6 shadow-lg text-center">
                              <div className="text-sm text-gray-600 mb-2">Recommended</div>
                              <div className="text-2xl font-bold text-[#FF6B2C] mb-2">
                                {result.recommendedRegime}
                              </div>
                              <div className="text-lg font-semibold text-green-600">
                                Save ₹{result.savings.toLocaleString()}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="font-semibold text-gray-700 mb-2">Old Regime</div>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span>Total Tax:</span>
                                    <span className="font-bold">₹{result.oldRegime.totalTax.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Net Income:</span>
                                    <span className="font-bold text-green-600">₹{result.oldRegime.netIncome.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="font-semibold text-gray-700 mb-2">New Regime</div>
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span>Total Tax:</span>
                                    <span className="font-bold">₹{result.newRegime.totalTax.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Net Income:</span>
                                    <span className="font-bold text-green-600">₹{result.newRegime.netIncome.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeTab === 'old' && (
                          <div className="space-y-4">
                            <div className="bg-white/80 rounded-2xl p-6 shadow-lg text-center">
                              <div className="text-sm text-gray-600 mb-2">Total Tax (Old Regime)</div>
                              <div className="text-3xl font-bold text-[#FF6B2C] mb-2">
                                ₹{result.oldRegime.totalTax.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-600">
                                Effective Rate: {result.oldRegime.effectiveRate}%
                              </div>
                            </div>
                            
                            <div className="space-y-3 text-sm">
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="flex justify-between">
                                  <span>Gross Income:</span>
                                  <span className="font-bold">₹{result.oldRegime.grossIncome.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="flex justify-between">
                                  <span>Total Deductions:</span>
                                  <span className="font-bold text-blue-600">₹{result.oldRegime.totalDeductions.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="flex justify-between">
                                  <span>Taxable Income:</span>
                                  <span className="font-bold">₹{result.oldRegime.taxableIncome.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="flex justify-between">
                                  <span>Income Tax:</span>
                                  <span className="font-bold">₹{result.oldRegime.incomeTax.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="flex justify-between">
                                  <span>Cess (4%):</span>
                                  <span className="font-bold">₹{result.oldRegime.cess.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeTab === 'new' && (
                          <div className="space-y-4">
                            <div className="bg-white/80 rounded-2xl p-6 shadow-lg text-center">
                              <div className="text-sm text-gray-600 mb-2">Total Tax (New Regime)</div>
                              <div className="text-3xl font-bold text-[#FF6B2C] mb-2">
                                ₹{result.newRegime.totalTax.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-600">
                                Effective Rate: {result.newRegime.effectiveRate}%
                              </div>
                            </div>
                            
                            <div className="space-y-3 text-sm">
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="flex justify-between">
                                  <span>Gross Income:</span>
                                  <span className="font-bold">₹{result.newRegime.grossIncome.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="flex justify-between">
                                  <span>Standard Deduction:</span>
                                  <span className="font-bold text-blue-600">₹{result.newRegime.totalDeductions.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="flex justify-between">
                                  <span>Taxable Income:</span>
                                  <span className="font-bold">₹{result.newRegime.taxableIncome.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="flex justify-between">
                                  <span>Income Tax:</span>
                                  <span className="font-bold">₹{result.newRegime.incomeTax.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="bg-white/60 rounded-xl p-4">
                                <div className="flex justify-between">
                                  <span>Cess (4%):</span>
                                  <span className="font-bold">₹{result.newRegime.cess.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeTab === 'capital' && (
                          <div className="space-y-4">
                            <div className="bg-white/80 rounded-2xl p-6 shadow-lg text-center">
                              <div className="text-sm text-gray-600 mb-2">Total Capital Gains Tax</div>
                              <div className="text-3xl font-bold text-[#FF6B2C] mb-2">
                                ₹{result.capitalGainsBreakdown.totalCapitalGainsTax.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-600">
                                Same for both Old & New regime
                              </div>
                            </div>
                            
                            <div className="space-y-3 text-sm">
                              {result.capitalGainsBreakdown.stcgEquity > 0 && (
                                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-red-800">STCG - Equity (≤12 months)</span>
                                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">15.6% tax</span>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex justify-between">
                                      <span>Capital Gains:</span>
                                      <span className="font-bold">₹{result.capitalGainsBreakdown.stcgEquity.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Tax:</span>
                                      <span className="font-bold text-red-600">₹{result.capitalGainsBreakdown.stcgEquityTax.toLocaleString()}</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {result.capitalGainsBreakdown.ltcgEquity > 0 && (
                                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-green-800">LTCG - Equity (&gt;12 months)</span>
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">₹1L exempt, then 10.4%</span>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex justify-between">
                                      <span>Capital Gains:</span>
                                      <span className="font-bold">₹{result.capitalGainsBreakdown.ltcgEquity.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Exemption:</span>
                                      <span className="text-green-600">₹{Math.min(result.capitalGainsBreakdown.ltcgEquity, 100000).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Taxable Amount:</span>
                                      <span className="font-medium">₹{Math.max(0, result.capitalGainsBreakdown.ltcgEquity - 100000).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Tax:</span>
                                      <span className="font-bold text-green-600">₹{result.capitalGainsBreakdown.ltcgEquityTax.toLocaleString()}</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {result.capitalGainsBreakdown.stcgOther > 0 && (
                                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-purple-800">STCG - Other Investments</span>
                                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Added to income</span>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex justify-between">
                                      <span>Capital Gains:</span>
                                      <span className="font-bold">₹{result.capitalGainsBreakdown.stcgOther.toLocaleString()}</span>
                                    </div>
                                    <div className="text-xs text-purple-600 mt-1">
                                      💡 Added to regular income and taxed at your income slab rate
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {result.capitalGainsBreakdown.ltcgOther > 0 && (
                                <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-indigo-800">LTCG - Other Investments</span>
                                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">20.8% with indexation</span>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex justify-between">
                                      <span>Capital Gains:</span>
                                      <span className="font-bold">₹{result.capitalGainsBreakdown.ltcgOther.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Tax:</span>
                                      <span className="font-bold text-indigo-600">₹{result.capitalGainsBreakdown.ltcgOtherTax.toLocaleString()}</span>
                                    </div>
                                    <div className="text-xs text-indigo-600 mt-1">
                                      💡 Includes indexation benefit for inflation adjustment
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {result.capitalGainsBreakdown.totalCapitalGainsTax === 0 && (
                                <div className="text-center py-8">
                                  <div className="text-gray-500 text-lg">No capital gains declared</div>
                                  <div className="text-sm text-gray-400 mt-2">Enter your stock market gains in the form to see tax breakdown</div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="text-center pt-4">
                          <button 
                            onClick={handleGetStarted}
                            className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                          >
                            {isLoggedIn ? 'Get Tax Planning Advice' : 'Create Account'}
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
                          Fill in your details to calculate and compare tax regimes
                        </p>
                      </div>
                    )}

                    {/* Tax Slabs Display */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">
                        Tax Slabs for {assessmentYear}
                      </h4>
                      
                      {(() => {
                        const config = getTaxConfig(assessmentYear);
                        const userAge = parseInt(age) || 0;
                        
                        return (
                          <div className="space-y-4">
                            {/* Old Regime Slabs */}
                            <div className="bg-white/60 rounded-xl p-4 border border-gray-100">
                              <h5 className="font-bold text-gray-800 mb-3 text-sm flex items-center gap-2">
                                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                Old Regime
                              </h5>
                              <div className="space-y-2 text-sm">
                                {/* Basic Exemption */}
                                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                  <span className="text-gray-600">Basic Exemption:</span>
                                  <span className="font-medium text-red-600">
                                    ₹{(
                                      residentialStatus === 'nri' ? 0 :
                                      userAge >= 80 ? config.oldRegime.exemptionAbove80 :
                                      userAge >= 60 ? config.oldRegime.exemptionBelow80 :
                                      config.oldRegime.exemptionBelow60
                                    ).toLocaleString()}
                                  </span>
                                </div>
                                {/* Tax Slabs */}
                                {config.oldRegime.slabs.map((slab, index) => {
                                  let basicExemption = config.oldRegime.exemptionBelow60;
                                  if (residentialStatus === 'nri') {
                                    basicExemption = 0;
                                  } else {
                                    basicExemption = userAge >= 80 ? config.oldRegime.exemptionAbove80 :
                                                    userAge >= 60 ? config.oldRegime.exemptionBelow80 :
                                                    config.oldRegime.exemptionBelow60;
                                  }
                                  const adjustedMin = Math.max(slab.min, basicExemption);
                                  
                                  return (
                                    <div key={index} className="flex justify-between items-center py-1">
                                      <span className="text-gray-600">
                                        {slab.max === Infinity 
                                          ? `Above ₹${(adjustedMin/100000).toFixed(0)}L` 
                                          : `₹${(adjustedMin/100000).toFixed(0)}L - ₹${(slab.max/100000).toFixed(0)}L`}
                                      </span>
                                      <span className="font-medium text-red-600">{(slab.rate * 100).toFixed(0)}%</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            
                            {/* New Regime Slabs */}
                            <div className="bg-white/60 rounded-xl p-4 border border-gray-100">
                              <h5 className="font-bold text-gray-800 mb-3 text-sm flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                New Regime
                              </h5>
                              <div className="space-y-2 text-sm">
                                {/* Basic Exemption */}
                                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                  <span className="text-gray-600">Basic Exemption:</span>
                                  <span className="font-medium text-green-600">
                                    ₹{(residentialStatus === 'nri' ? 0 : config.newRegime.exemption).toLocaleString()}
                                  </span>
                                </div>
                                {/* Tax Slabs */}
                                {config.newRegime.slabs.map((slab, index) => {
                                  const basicExemption = residentialStatus === 'nri' ? 0 : config.newRegime.exemption;
                                  const adjustedMin = Math.max(slab.min, basicExemption);
                                  
                                  return (
                                    <div key={index} className="flex justify-between items-center py-1">
                                      <span className="text-gray-600">
                                        {slab.max === Infinity 
                                          ? `Above ₹${(adjustedMin/100000).toFixed(0)}L` 
                                          : `₹${(adjustedMin/100000).toFixed(0)}L - ₹${(slab.max/100000).toFixed(0)}L`}
                                      </span>
                                      <span className="font-medium text-green-600">{(slab.rate * 100).toFixed(0)}%</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            
                            {/* Additional Info */}
                            <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-200">
                              <div className="text-sm space-y-2">
                                <div className="font-semibold text-yellow-800 mb-2 text-center">Rebates & Additional Info:</div>
                                
                                {/* Rebate Information */}
                                <div className="bg-green-100 rounded-lg p-2 border border-green-300">
                                  <div className="font-semibold text-green-800 mb-1 text-center">Section 87A Rebates:</div>
                                  <div className="space-y-1">
                                    <div className="text-green-700 text-center">
                                      <span className="font-medium">Old Regime:</span> ₹12,500 rebate if taxable income ≤ ₹5L
                                    </div>
                                    <div className="text-green-700 text-center">
                                      <span className="font-medium">New Regime:</span> ₹{config.rebateAmount.toLocaleString()} rebate if taxable income ≤ ₹{(config.rebateLimit/100000).toFixed(0)}L
                                    </div>
                                    <div className="text-green-600 text-xs italic text-center mt-1">
                                      💡 Result: Zero tax if rebate covers full tax liability
                                    </div>
                                  </div>
                                </div>

                                {/* Other Info */}
                                <div className="grid grid-cols-1 gap-1 text-center">
                                  <div className="text-yellow-700">• Health & Education Cess: 4% on income tax</div>
                                  <div className="text-yellow-700">• Standard Deduction: ₹{config.standardDeduction.toLocaleString()} (New Regime)</div>
                                  <div className="text-yellow-700">• Surcharge: Applicable on income above ₹50L/₹1Cr</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tax Planning Tips */}
          <section className="py-24 bg-gray-50 relative overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800">Tax Planning </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Tips & Strategies
                  </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                  Smart strategies to optimize your tax liability and maximize savings
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => router.push('/tax-planning')}
                    className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    View Complete Tax Planning Guide
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: '💰',
                    title: 'Section 80C Investments',
                    description: 'Invest up to ₹1.5L in PPF, ELSS, NSC, tax-saving FDs, and life insurance to save up to ₹46,800 in taxes.',
                    color: 'from-blue-400 to-blue-600'
                  },
                  {
                    icon: '🏥',
                    title: 'Health Insurance (80D)',
                    description: 'Self/Family: ₹25K (₹50K if 60+), Parents: ₹50K additional. Total max ₹1L with proper planning.',
                    color: 'from-green-400 to-green-600'
                  },
                  {
                    icon: '🏠',
                    title: 'Home Loan Benefits',
                    description: 'Claim up to ₹2L interest deduction under Section 24(b) and ₹1.5L principal repayment under 80C.',
                    color: 'from-purple-400 to-purple-600'
                  },
                  {
                    icon: '🎓',
                    title: 'Education Loan (80E)',
                    description: 'Full interest deduction on education loans with no upper limit for self, spouse, or children.',
                    color: 'from-orange-400 to-orange-600'
                  },
                  {
                    icon: '👴',
                    title: 'NPS Additional (80CCD1B)',
                    description: 'Extra ₹50K deduction over and above 80C limit by investing in National Pension System.',
                    color: 'from-red-400 to-red-600'
                  },
                  {
                    icon: '❤️',
                    title: 'Donations (80G)',
                    description: '50% deduction: PM Relief Fund, educational institutions. 100% deduction: PM CARES, Swachh Bharat Kosh, Clean Ganga Fund.',
                    color: 'from-teal-400 to-teal-600'
                  },
                  {
                    icon: '🎯',
                    title: 'Section 87A Rebates',
                    description: 'New Regime: ₹25K rebate for income ≤₹7L (effectively no tax up to ₹12L). Old Regime: ₹12.5K rebate for income ≤₹5L.',
                    color: 'from-pink-400 to-pink-600'
                  }
                ].map((item, index) => {
                  // Map each tip to its corresponding section ID in the tax planning page
                  const sectionMap: {[key: string]: string} = {
                    'Section 80C Investments': 'section-80c',
                    'Health Insurance (80D)': 'health-insurance',
                    'Home Loan Benefits': 'home-loan',
                    'Education Loan (80E)': 'education-loan',
                    'NPS Additional (80CCD1B)': 'nps-additional',
                    'Donations (80G)': 'donations',
                    'Section 87A Rebates': 'rebates'
                  };
                  
                  const sectionId = sectionMap[item.title];
                  
                  return (
                    <div 
                      key={index} 
                      onClick={() => sectionId && router.push(`/tax-planning?section=${sectionId}`)}
                      className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="drop-shadow-sm">{item.icon}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed text-center text-sm mb-4">
                        {item.description}
                      </p>
                      
                      {sectionId && (
                        <div className="text-center">
                          <span className="inline-flex items-center gap-1 text-[#FF6B2C] text-xs font-medium group-hover:gap-2 transition-all duration-300">
                            Learn More
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Optimize Your Tax Planning
              </h2>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Get personalized tax planning advice and maximize your savings with expert guidance
              </p>
              
              <button 
                onClick={handleGetStarted}
                className="group bg-white text-[#FF6B2C] px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
              >
                {isLoggedIn ? 'Get Tax Planning Advice' : 'Get Started Free'}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      {/* City List Modal */}
      {showCityListModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  🏙️ Metro vs Non-Metro Cities for HRA Exemption
                </h2>
                <button
                  onClick={() => setShowCityListModal(false)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-6">
                {/* Overview */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-2">📋 HRA Exemption Rules:</h3>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div>• <strong>Metro Cities:</strong> 50% of Basic Salary exemption limit</div>
                    <div>• <strong>Non-Metro Cities:</strong> 40% of Basic Salary exemption limit</div>
                    <div>• HRA exemption = Minimum of (HRA received, 50%/40% of Basic, Rent - 10% of Basic)</div>
                  </div>
                </div>

                {/* City Lists */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Metro Cities */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                      🏙️ Metro Cities (50% HRA exemption)
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-white/80 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-700 mb-2">Tier 1 Metro Cities:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span>Mumbai</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span>Delhi</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span>Kolkata</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span>Chennai</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/80 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-700 mb-2">Other Major Metro Cities:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                            <span>Bangalore</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                            <span>Hyderabad</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                            <span>Ahmedabad</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                            <span>Pune</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Non-Metro Cities */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                    <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                      🏘️ Non-Metro Cities (40% HRA exemption)
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-white/80 rounded-lg p-4">
                        <h4 className="font-semibold text-green-700 mb-2">Definition:</h4>
                        <p className="text-sm text-green-600 mb-3">All cities in India except the 8 metro cities listed on the left</p>
                        
                        <h4 className="font-semibold text-green-700 mb-2">Popular Non-Metro Cities:</h4>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>Jaipur, Lucknow, Kanpur, Agra</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>Indore, Bhopal, Nagpur, Surat</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>Coimbatore, Kochi, Mysore, Trichy</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>Chandigarh, Vadodara, Rajkot</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>Visakhapatnam, Nashik, Guwahati</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>Bhubaneswar, Dehradun, Shimla</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                    💡 Important Notes
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
                    <div>
                      <div className="font-semibold mb-1">📍 How to Choose:</div>
                      <div>If your city is NOT in the metro list (left column), select &quot;Non-Metro City&quot; for accurate HRA calculation.</div>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">🏢 Employer Policy:</div>
                      <div>Some employers may have different classifications. Check your HR policy for company-specific rules.</div>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">📅 Updates:</div>
                      <div>This list is based on current income tax rules and may be updated by the government periodically.</div>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">🧮 Calculation:</div>
                      <div>The HRA exemption is calculated as the minimum of the three values mentioned above.</div>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <div className="text-center pt-4">
                  <button
                    onClick={() => setShowCityListModal(false)}
                    className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Got it, Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}