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
  savings: number;
  recommendedRegime: string;
}

export default function TaxCalculator() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Personal Details
  const [assessmentYear, setAssessmentYear] = useState('2024-25');
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
  
  // HRA Details
  const [cityType, setCityType] = useState('metro');
  const [rentPaid, setRentPaid] = useState('');
  
  // Deductions (Old Regime)
  const [section80C, setSection80C] = useState('');
  const [section80DSelf, setSection80DSelf] = useState('');
  const [section80DParents, setSection80DParents] = useState('');
  const [section80CCD1B, setSection80CCD1B] = useState('');
  const [section80E, setSection80E] = useState('');
  const [section80G, setSection80G] = useState('');
  const [section24B, setSection24B] = useState('');
  const [otherDeductions, setOtherDeductions] = useState('');
  
  // Professional Tax
  const [professionalTax, setProfessionalTax] = useState('');
  
  const [result, setResult] = useState<TaxResult | null>(null);
  const [activeTab, setActiveTab] = useState('comparison');

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  // Tax configuration for different assessment years
  const getTaxConfig = (assessmentYear: string) => {
    const configs = {
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
      },
      '2021-22': {
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
    
    return configs[assessmentYear as keyof typeof configs] || configs['2024-25'];
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
    
    // Tax slabs based on age
    let basicExemption = config.oldRegime.exemptionBelow60;
    if (userAge >= 60 && userAge < 80) {
      basicExemption = config.oldRegime.exemptionBelow80;
    } else if (userAge >= 80) {
      basicExemption = config.oldRegime.exemptionAbove80;
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
    
    for (const slab of config.newRegime.slabs) {
      if (taxableIncome > slab.min) {
        const taxableAmount = Math.min(taxableIncome, slab.max) - slab.min;
        const slabTax = taxableAmount * slab.rate;
        tax += slabTax;
        
        if (taxableAmount > 0) {
          const slabLabel = slab.max === Infinity 
            ? `Above ₹${(slab.min/100000).toFixed(0)}L`
            : `₹${(slab.min/100000).toFixed(0)}L - ₹${(slab.max/100000).toFixed(0)}L`;
          
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

    const grossIncome = basic + hraAmount + special + other + bonusAmount + otherIncomeAmount;

    // HRA Exemption
    const hraExemption = calculateHRAExemption();

    // Health Insurance calculation with separate limits
    const userAge = parseInt(age) || 0;
    const section80DSelfAmount = Math.min(parseFloat(section80DSelf) || 0, userAge >= 60 ? 50000 : 25000);
    const section80DParentsAmount = Math.min(parseFloat(section80DParents) || 0, 50000); // Max 50k for parents
    const totalSection80D = section80DSelfAmount + section80DParentsAmount;

    // Old Regime Calculations
    const oldRegimeDeductions = 
      (parseFloat(section80C) || 0) +
      totalSection80D +
      (parseFloat(section80CCD1B) || 0) +
      (parseFloat(section80E) || 0) +
      (parseFloat(section80G) || 0) +
      (parseFloat(section24B) || 0) +
      (parseFloat(otherDeductions) || 0) +
      hraExemption +
      profTax;

    const oldTaxableIncome = Math.max(0, grossIncome - oldRegimeDeductions);
    const oldTaxResult = calculateOldRegimeTax(oldTaxableIncome);
    const oldCess = oldTaxResult.tax * 0.04;
    const oldTotalTax = oldTaxResult.tax + oldCess;

    // New Regime Calculations (only standard deduction and professional tax)
    const newRegimeDeductions = config.standardDeduction + profTax;
    const newTaxableIncome = Math.max(0, grossIncome - newRegimeDeductions);
    const newTaxResult = calculateNewRegimeTax(newTaxableIncome);
    const newCess = newTaxResult.tax * 0.04;
    const newTotalTax = newTaxResult.tax + newCess;

    // Apply rebate under section 87A for new regime
    let newTotalTaxAfterRebate = newTotalTax;
    if (newTaxableIncome <= config.rebateLimit) {
      const rebate = Math.min(newTaxResult.tax, config.rebateAmount);
      newTotalTaxAfterRebate = Math.max(0, newTotalTax - rebate);
    }

    const savings = oldTotalTax - newTotalTaxAfterRebate;
    const recommendedRegime = savings > 0 ? 'New Tax Regime' : 'Old Tax Regime';

    setResult({
      oldRegime: {
        grossIncome,
        taxableIncome: oldTaxableIncome,
        totalDeductions: oldRegimeDeductions,
        incomeTax: oldTaxResult.tax,
        cess: oldCess,
        totalTax: oldTotalTax,
        netIncome: grossIncome - oldTotalTax,
        effectiveRate: ((oldTotalTax / grossIncome) * 100).toFixed(2),
        breakdown: oldTaxResult.breakdown
      },
      newRegime: {
        grossIncome,
        taxableIncome: newTaxableIncome,
        totalDeductions: newRegimeDeductions,
        incomeTax: newTaxResult.tax,
        cess: newCess,
        totalTax: newTotalTaxAfterRebate,
        netIncome: grossIncome - newTotalTaxAfterRebate,
        effectiveRate: ((newTotalTaxAfterRebate / grossIncome) * 100).toFixed(2),
        breakdown: newTaxResult.breakdown
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
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                      Tax Calculator
                    </h2>
                    
                    <div className="space-y-8">
                      
                      {/* Personal Details */}
                      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                        <h3 className="text-lg font-bold text-blue-800 mb-4">👤 Personal Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Assessment Year</label>
                            <select
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm font-medium"
                              value={assessmentYear}
                              onChange={(e) => setAssessmentYear(e.target.value)}
                            >
                              <option value="2024-25">AY 2024-25 (FY 2023-24) - Current</option>
                              <option value="2023-24">AY 2023-24 (FY 2022-23)</option>
                              <option value="2022-23">AY 2022-23 (FY 2021-22)</option>
                              <option value="2021-22">AY 2021-22 (FY 2020-21)</option>
                            </select>
                            <p className="text-xs text-blue-600 mt-1">
                              💡 Different years have different tax slabs and rates
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                            <input
                              type="number"
                              placeholder="e.g., 30"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                            <select
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Residential Status</label>
                            <select
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={residentialStatus}
                              onChange={(e) => setResidentialStatus(e.target.value)}
                            >
                              <option value="resident">Resident</option>
                              <option value="nri">Non-Resident</option>
                            </select>
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
                            <label className="block text-sm font-semibold text-gray-700 mb-2">80G (Donations) (₹)</label>
                            <input
                              type="number"
                              placeholder="Various limits"
                              className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] text-sm"
                              value={section80G}
                              onChange={(e) => setSection80G(e.target.value)}
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
                        {assessmentYear === '2024-25' ? 'AY 2024-25 (FY 2023-24) - Current' :
                         assessmentYear === '2023-24' ? 'AY 2023-24 (FY 2022-23)' :
                         assessmentYear === '2022-23' ? 'AY 2022-23 (FY 2021-22)' :
                         'AY 2021-22 (FY 2020-21)'}
                      </span>
                    </div>
                    
                    {result ? (
                      <div className="space-y-6">
                        {/* Tabs */}
                        <div className="flex rounded-xl bg-white p-1">
                          <button
                            onClick={() => setActiveTab('comparison')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                              activeTab === 'comparison'
                                ? 'bg-[#FF6B2C] text-white'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                          >
                            Comparison
                          </button>
                          <button
                            onClick={() => setActiveTab('old')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                              activeTab === 'old'
                                ? 'bg-[#FF6B2C] text-white'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                          >
                            Old Regime
                          </button>
                          <button
                            onClick={() => setActiveTab('new')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                              activeTab === 'new'
                                ? 'bg-[#FF6B2C] text-white'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                          >
                            New Regime
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
                              <div className="space-y-2 text-xs">
                                {/* Basic Exemption */}
                                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                  <span className="text-gray-600">Basic Exemption:</span>
                                  <span className="font-medium text-red-600">
                                    ₹{(
                                      userAge >= 80 ? config.oldRegime.exemptionAbove80 :
                                      userAge >= 60 ? config.oldRegime.exemptionBelow80 :
                                      config.oldRegime.exemptionBelow60
                                    ).toLocaleString()}
                                  </span>
                                </div>
                                {/* Tax Slabs */}
                                {config.oldRegime.slabs.map((slab, index) => {
                                  const basicExemption = userAge >= 80 ? config.oldRegime.exemptionAbove80 :
                                                        userAge >= 60 ? config.oldRegime.exemptionBelow80 :
                                                        config.oldRegime.exemptionBelow60;
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
                              <div className="space-y-2 text-xs">
                                {/* Basic Exemption */}
                                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                  <span className="text-gray-600">Basic Exemption:</span>
                                  <span className="font-medium text-green-600">₹{config.newRegime.exemption.toLocaleString()}</span>
                                </div>
                                {/* Tax Slabs */}
                                {config.newRegime.slabs.map((slab, index) => (
                                  <div key={index} className="flex justify-between items-center py-1">
                                    <span className="text-gray-600">
                                      {slab.max === Infinity 
                                        ? `Above ₹${(slab.min/100000).toFixed(0)}L` 
                                        : `₹${(slab.min/100000).toFixed(0)}L - ₹${(slab.max/100000).toFixed(0)}L`}
                                    </span>
                                    <span className="font-medium text-green-600">{(slab.rate * 100).toFixed(0)}%</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* Additional Info */}
                            <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-200">
                              <div className="text-xs space-y-1">
                                <div className="font-semibold text-yellow-800 mb-2 text-center">Additional Info:</div>
                                <div className="grid grid-cols-1 gap-1 text-center">
                                  <div className="text-yellow-700">• Cess: 4% on tax</div>
                                  <div className="text-yellow-700">• Std. Deduction: ₹{config.standardDeduction.toLocaleString()}</div>
                                  <div className="text-yellow-700">• Rebate: ₹{config.rebateAmount.toLocaleString()} (≤₹{config.rebateLimit.toLocaleString()})</div>
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
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Smart strategies to optimize your tax liability and maximize savings
                </p>
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
                    description: 'Deductions for donations to approved charitable institutions with 50% or 100% benefit options.',
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
                    
                    <p className="text-gray-600 leading-relaxed text-center text-sm">
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
    </>
  );
}