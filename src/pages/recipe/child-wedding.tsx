import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Tooltip from '@/components/Tooltip';

const inputClass = "border border-gray-300 rounded px-4 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-purple-300";
const labelClass = "text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1";

const InfoIcon: React.FC<{ tooltip: string }> = ({ tooltip }) => (
  <Tooltip content={tooltip}>
    <svg className="ml-1 text-gray-400 w-3 h-3 hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </Tooltip>
);

interface ChildWeddingFormData {
  userId: string;
  currentAge: number;
  childCurrentAge: number;
  targetAge: number;
  weddingBudget: number;
  venueCost: number;
  jewelleryCost: number;
  otherCosts: number;
  currentSavings: number;
  monthlyIncome: number;
  wantLoan: boolean;
  loanTenure: number;
  interestRate: number;
  inflationRate: number;
  returnRate: number;
  goalPossibility: string;
}

interface CalculationResults {
  totalWeddingCost: number;
  weddingBudgetAmount: number;
  venueAmount: number;
  jewelleryAmount: number;
  otherCostAmount: number;
  totalRequiredAtWedding: number;
  loanAmount: number;
  emiAmount: number;
  totalLoanRepayment: number;
  sipRequired: number;
  totalInvestment: number;
  futureValue: number;
  shortfall: number;
  achievabilityRatio: number;
  yearsToGoal: number;
  recommendations: Array<{ type: string; text: string }>;
}

export default function ChildWedding() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [results, setResults] = useState<CalculationResults | null>(null);

  const [formData, setFormData] = useState<ChildWeddingFormData>({
    userId: '',
    currentAge: 35,
    childCurrentAge: 10,
    targetAge: 25,
    weddingBudget: 2000000,
    venueCost: 30,
    jewelleryCost: 25,
    otherCosts: 10,
    currentSavings: 0,
    monthlyIncome: 50000,
    wantLoan: false,
    loanTenure: 3,
    interestRate: 12,
    inflationRate: 7,
    returnRate: 12,
    goalPossibility: '',
  });

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');
    if (!userIdFromStorage) {
      router.push('/login');
      return;
    }
    setUserId(userIdFromStorage);
    fetchChildWeddingData(userIdFromStorage);
  }, [router]);

  const fetchChildWeddingData = async (uid: string) => {
    try {
      const response = await fetch(`/api/child-wedding?userId=${encodeURIComponent(uid)}`);
      const result = await response.json();
      if (response.ok && result.data) {
        setFormData(result.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof ChildWeddingFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/child-wedding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Child's Wedding plan saved successfully!");
      } else {
        alert('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data');
    } finally {
      setSaving(false);
    }
  };

  const calculateWeddingPlan = () => {
    const yearsToTarget = formData.targetAge - formData.childCurrentAge;
    if (yearsToTarget < 0) {
      alert("Target age must be greater than child's current age");
      return;
    }

    const inflation = formData.inflationRate / 100;
    const annualReturn = formData.returnRate / 100;
    const monthlyReturn = annualReturn / 12;
    const totalMonths = yearsToTarget * 12;

    // Calculate future costs with inflation
    const futureWeddingBudget = formData.weddingBudget * Math.pow(1 + inflation, yearsToTarget);
    const weddingBudgetAmount = futureWeddingBudget;
    const venueAmount = (futureWeddingBudget * formData.venueCost) / 100;
    const jewelleryAmount = (futureWeddingBudget * formData.jewelleryCost) / 100;
    const otherCostAmount = (futureWeddingBudget * formData.otherCosts) / 100;

    const totalWeddingCost = weddingBudgetAmount + venueAmount + jewelleryAmount + otherCostAmount;

    let totalRequiredAtWedding = totalWeddingCost;
    let loanAmount = 0;
    let emiAmount = 0;
    let totalLoanRepayment = 0;

    if (formData.wantLoan) {
      // For wedding loan, assume 50% loan coverage
      loanAmount = totalWeddingCost * 0.5;
      totalRequiredAtWedding = totalWeddingCost - loanAmount;

      // Calculate EMI
      const loanInterestRate = formData.interestRate / 100 / 12;
      const loanMonths = formData.loanTenure * 12;
      if (loanAmount > 0 && loanInterestRate > 0) {
        emiAmount =
          (loanAmount * loanInterestRate * Math.pow(1 + loanInterestRate, loanMonths)) /
          (Math.pow(1 + loanInterestRate, loanMonths) - 1);
        totalLoanRepayment = emiAmount * loanMonths;
      }
    }

    // Calculate SIP required
    const currentSavings = formData.currentSavings;
    const futureSavingsValue = currentSavings * Math.pow(1 + annualReturn, yearsToTarget);
    const additionalSavingsNeeded = Math.max(0, totalRequiredAtWedding - futureSavingsValue);

    let sipRequired = 0;
    if (totalMonths > 0 && monthlyReturn > 0) {
      sipRequired =
        (additionalSavingsNeeded * monthlyReturn) /
        (Math.pow(1 + monthlyReturn, totalMonths) - 1);
    } else if (totalMonths > 0) {
      sipRequired = additionalSavingsNeeded / totalMonths;
    }

    const totalInvestment = currentSavings + sipRequired * totalMonths;
    const futureValue = futureSavingsValue + sipRequired * ((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn) * (1 + monthlyReturn);

    const shortfall = Math.max(0, totalRequiredAtWedding - futureValue);
    const achievabilityRatio = futureValue > 0 ? (futureValue / totalRequiredAtWedding) * 100 : 0;

    // Generate recommendations
    const recommendations: Array<{ type: string; text: string }> = [];

    if (achievabilityRatio >= 100) {
      recommendations.push({
        type: 'success',
        text: `Excellent! You're on track to fund your child's wedding. Your investments will grow to ₹${formatIndianNumber(futureValue)}.`,
      });
    } else if (achievabilityRatio >= 80) {
      recommendations.push({
        type: 'warning',
        text: `You're close! Consider increasing monthly SIP by ₹${formatIndianNumber(shortfall / totalMonths)} to fully meet your goal.`,
      });
    } else {
      recommendations.push({
        type: 'error',
        text: `Significant shortfall detected. Consider starting earlier, adjusting budget, or opting for a personal loan.`,
      });
    }

    // Wedding-specific recommendations
    if (yearsToTarget >= 10) {
      recommendations.push({
        type: 'success',
        text: `You have ${yearsToTarget} years - excellent planning! This gives you time for equity investments with 12-15% returns.`,
      });
    } else if (yearsToTarget >= 5) {
      recommendations.push({
        type: 'info',
        text: `With ${yearsToTarget} years remaining, consider a balanced portfolio (60% equity, 40% debt) for stable growth.`,
      });
    } else if (yearsToTarget >= 2) {
      recommendations.push({
        type: 'warning',
        text: `Only ${yearsToTarget} years left! Shift to debt-heavy portfolio (30% equity, 70% debt) to protect capital.`,
      });
    } else {
      recommendations.push({
        type: 'error',
        text: `Less than 2 years remaining! Focus on liquid funds and FDs. Equity is too risky at this stage.`,
      });
    }

    if (formData.wantLoan) {
      recommendations.push({
        type: 'warning',
        text: `Personal loans for weddings have high interest (${formData.interestRate}%). Total interest: ₹${formatIndianNumber(totalLoanRepayment - loanAmount)}. Consider minimizing loan amount.`,
      });

      const emiToIncomeRatio = (emiAmount / formData.monthlyIncome) * 100;
      if (emiToIncomeRatio > 40) {
        recommendations.push({
          type: 'error',
          text: `EMI will be ${emiToIncomeRatio.toFixed(1)}% of your income - very high! Consider reducing wedding budget or extending tenure.`,
        });
      } else if (emiToIncomeRatio > 30) {
        recommendations.push({
          type: 'warning',
          text: `EMI is ${emiToIncomeRatio.toFixed(1)}% of your income. Manageable but will impact other financial goals.`,
        });
      } else {
        recommendations.push({
          type: 'success',
          text: `EMI of ₹${formatIndianNumber(emiAmount)}/month is ${emiToIncomeRatio.toFixed(1)}% of income - manageable.`,
        });
      }
    }

    if (sipRequired > 0) {
      const sipToIncomeRatio = (sipRequired / formData.monthlyIncome) * 100;
      if (sipToIncomeRatio > 30) {
        recommendations.push({
          type: 'warning',
          text: `Required SIP is ${sipToIncomeRatio.toFixed(1)}% of your income. Consider starting earlier or adjusting wedding budget.`,
        });
      } else {
        recommendations.push({
          type: 'success',
          text: `Required SIP of ₹${formatIndianNumber(sipRequired)}/month is ${sipToIncomeRatio.toFixed(1)}% of income - achievable.`,
        });
      }
    }

    // Early start recommendation
    if (formData.childCurrentAge <= 10) {
      recommendations.push({
        type: 'success',
        text: `Starting early (child is ${formData.childCurrentAge} years old) is smart! Small monthly investments will compound significantly.`,
      });
    }

    // Budget recommendation
    const budgetPercentOfIncome = (totalWeddingCost / (formData.monthlyIncome * 12 * yearsToTarget)) * 100;
    if (budgetPercentOfIncome > 50) {
      recommendations.push({
        type: 'warning',
        text: `Wedding budget is high relative to your income. Consider a more modest celebration or extended saving period.`,
      });
    }

    // Inflation impact
    recommendations.push({
      type: 'info',
      text: `With ${formData.inflationRate}% inflation, today's ₹${formatIndianNumber(formData.weddingBudget)} wedding will cost ₹${formatIndianNumber(futureWeddingBudget)} in ${yearsToTarget} years.`,
    });

    setResults({
      totalWeddingCost,
      weddingBudgetAmount,
      venueAmount,
      jewelleryAmount,
      otherCostAmount,
      totalRequiredAtWedding,
      loanAmount,
      emiAmount,
      totalLoanRepayment,
      sipRequired,
      totalInvestment,
      futureValue,
      shortfall,
      achievabilityRatio,
      yearsToGoal: yearsToTarget,
      recommendations,
    });
  };

  const formatIndianNumber = (num: number): string => {
    if (num >= 10000000) {
      return `${(num / 10000000).toFixed(2)} Cr`;
    } else if (num >= 100000) {
      return `${(num / 100000).toFixed(2)} L`;
    } else {
      return num.toLocaleString('en-IN', { maximumFractionDigits: 0 });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Child Wedding Planning - IncomeGrow</title>
        <meta name="description" content="Plan your child&apos;s wedding with detailed calculations" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <div className="flex flex-col min-h-screen bg-white">
        <Header />

        {/* 50/50 Split Layout - Full Page */}
        <main className="flex flex-1 w-full overflow-hidden max-w-[1600px] mx-auto border border-purple-200 border-t-0 mb-6">
          {/* Left Side - Form (50%) */}
          <div className="w-1/2 bg-white border-r border-gray-200 overflow-y-auto flex flex-col">
            {/* Breadcrumb & Header Section */}
            <div className="bg-white border-b border-gray-200 py-6 px-6">
              {/* Breadcrumb */}
              <div className="text-xs text-gray-400 mb-4 flex items-center gap-1">
                <Link href="/dashboard" className="hover:text-gray-600 transition-colors">Dashboard</Link>
                <svg className="mx-1 text-gray-300 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <Link href="/recipe" className="hover:text-gray-600 transition-colors">My Goals</Link>
                <svg className="mx-1 text-gray-300 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-[#FF6B2C] font-semibold">Child Wedding</span>
              </div>

              {/* Title */}
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg text-2xl">
                  💒
                </div>
                <div>
                  <div className="text-2xl font-bold text-black mb-1">Child&apos;s Wedding Planning</div>
                  <div className="text-sm text-gray-500">Plan ahead for your child&apos;s special day with financial confidence</div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6">
              <div className="space-y-6">
            {/* Basic Information Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl">👨‍👩‍👧</span>
                <h2 className="text-xl font-semibold text-gray-800">Family Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={labelClass}>
                    Your Current Age
                    <InfoIcon tooltip="Your current age. Used to calculate your financial position over the planning period." />
                  </label>
                  <input
                    type="number"
                    value={formData.currentAge}
                    onChange={(e) => handleInputChange('currentAge', parseInt(e.target.value))}
                    className={inputClass}
                    min="18"
                    max="100"
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Child&apos;s Current Age
                    <InfoIcon tooltip="Your child&apos;s current age. This determines how many years you have to save and plan." />
                  </label>
                  <input
                    type="number"
                    value={formData.childCurrentAge}
                    onChange={(e) => handleInputChange('childCurrentAge', parseInt(e.target.value))}
                    className={inputClass}
                    min="0"
                    max="30"
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Target Age (Wedding age)
                    <InfoIcon tooltip="Typical wedding age: 23-28 years" />
                  </label>
                  <input
                    type="number"
                    value={formData.targetAge}
                    onChange={(e) => handleInputChange('targetAge', parseInt(e.target.value))}
                    className={inputClass}
                    min={Math.max(18, formData.childCurrentAge)}
                    max="40"
                  />
                </div>

                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm text-purple-700">
                    Planning Timeline: <span className="font-semibold">{formData.targetAge - formData.childCurrentAge} years</span>
                  </p>
                  <p className="text-xs text-purple-600 mt-1">
                    Your child will be {formData.targetAge} years old at wedding
                  </p>
                </div>
              </div>
            </div>

            {/* Wedding Costs Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl">💒</span>
                <h2 className="text-xl font-semibold text-gray-800">Wedding Budget</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={labelClass}>
                    Total Wedding Budget (Today&apos;s Value)
                    <InfoIcon tooltip="Base budget at current prices. We&apos;ll adjust for inflation. Includes catering, decorations, photography, etc." />
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-xl text-gray-500">₹</span>
                    <input
                      type="number"
                      value={formData.weddingBudget}
                      onChange={(e) => handleInputChange('weddingBudget', parseFloat(e.target.value) || 0)}
                      className={inputClass}
                      min="0"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Typical budgets: Simple ₹10-20L, Moderate ₹20-50L, Grand ₹50L+
                  </p>
                </div>

                <div>
                  <label className={labelClass}>
                    Venue & Catering (% of budget)
                    <InfoIcon tooltip="Marriage hall, catering, food & beverages - typically 30-40% of total budget" />
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.venueCost}
                      onChange={(e) => handleInputChange('venueCost', parseFloat(e.target.value) || 0)}
                      className={inputClass}
                      min="0"
                      max="100"
                      step="0.1"
                    />
                    <span className="absolute right-3 top-2 text-gray-500">%</span>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Jewellery & Gifts (% of budget)
                    <InfoIcon tooltip="Gold jewellery, gifts for bride/groom and relatives - typically 25-35%" />
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.jewelleryCost}
                      onChange={(e) => handleInputChange('jewelleryCost', parseFloat(e.target.value) || 0)}
                      className={inputClass}
                      min="0"
                      max="100"
                      step="0.1"
                    />
                    <span className="absolute right-3 top-2 text-gray-500">%</span>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Other Costs (% of budget)
                    <InfoIcon tooltip="Clothing, photography, makeup, transportation, miscellaneous" />
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.otherCosts}
                      onChange={(e) => handleInputChange('otherCosts', parseFloat(e.target.value) || 0)}
                      className={inputClass}
                      min="0"
                      max="100"
                      step="0.1"
                    />
                    <span className="absolute right-3 top-2 text-gray-500">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Details Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl">💰</span>
                <h2 className="text-xl font-semibold text-gray-800">Financial Details</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={labelClass}>
                    Current Savings for Wedding
                    <InfoIcon tooltip="Amount you have already saved specifically for the wedding. This will grow with your expected return rate." />
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-xl text-gray-500">₹</span>
                    <input
                      type="number"
                      value={formData.currentSavings}
                      onChange={(e) => handleInputChange('currentSavings', parseFloat(e.target.value) || 0)}
                      className={inputClass}
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Monthly Income
                    <InfoIcon tooltip="Your total monthly income. Used to calculate EMI affordability and savings potential." />
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-xl text-gray-500">₹</span>
                    <input
                      type="number"
                      value={formData.monthlyIncome}
                      onChange={(e) => handleInputChange('monthlyIncome', parseFloat(e.target.value) || 0)}
                      className={inputClass}
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Loan Option Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl">🏢</span>
                <h2 className="text-xl font-semibold text-gray-800">Personal Loan Option</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border-2 border-yellow-300">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${formData.wantLoan ? 'bg-yellow-600' : 'bg-gray-300'}`}>
                      💵
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Take Personal Loan</p>
                      <p className="text-sm text-gray-600">50% loan coverage (not recommended due to high interest)</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.wantLoan}
                      onChange={(e) => handleInputChange('wantLoan', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-yellow-600"></div>
                  </label>
                </div>

                {formData.wantLoan && (
                  <div className="space-y-4 p-4 bg-yellow-50 rounded-lg border border-yellow-300">
                    <div className="bg-red-50 p-3 rounded border border-red-200">
                      <p className="text-xs text-red-700">
                        <strong>Warning:</strong> Personal loans for weddings have high interest rates (11-16%). Plan early to avoid loans.
                      </p>
                    </div>

                    <div>
                      <label className={labelClass}>
                        Loan Tenure (Years)
                        <InfoIcon tooltip="Personal loans typically 1-7 years. Shorter tenure = higher EMI but lower total interest." />
                      </label>
                      <input
                        type="number"
                        value={formData.loanTenure}
                        onChange={(e) => handleInputChange('loanTenure', parseInt(e.target.value) || 1)}
                        className={inputClass}
                        min="1"
                        max="7"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Interest Rate (% per annum)
                        <InfoIcon tooltip="Current personal loan rates: 11-16% per annum" />
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={formData.interestRate}
                          onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value) || 0)}
                          className={inputClass}
                          min="0"
                          max="20"
                          step="0.1"
                        />
                        <span className="absolute right-3 top-2 text-gray-500">%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Investment Parameters Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl">📈</span>
                <h2 className="text-xl font-semibold text-gray-800">Investment Parameters</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={labelClass}>
                    Expected Inflation Rate
                    <InfoIcon tooltip="Wedding costs typically inflate at 6-8% annually" />
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.inflationRate}
                      onChange={(e) => handleInputChange('inflationRate', parseFloat(e.target.value) || 0)}
                      className={inputClass}
                      min="0"
                      step="0.1"
                    />
                    <span className="absolute right-3 top-2 text-gray-500">%</span>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Expected Return Rate
                    <InfoIcon tooltip="Expected annual returns based on investment mix" />
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.returnRate}
                      onChange={(e) => handleInputChange('returnRate', parseFloat(e.target.value) || 0)}
                      className={inputClass}
                      min="0"
                      step="0.1"
                    />
                    <span className="absolute right-3 top-2 text-gray-500">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={calculateWeddingPlan}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span className="text-lg">🎯</span>
                <span>Calculate Plan</span>
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400"
              >
                {saving ? 'Saving...' : 'Save Plan'}
              </button>
            </div>
              </div>
            </div>
          </div>

          {/* Right Side - Results (50%) */}
          <div className="w-1/2 bg-white overflow-y-auto">
            <div className="p-6">
              <div className="space-y-6">
            {results ? (
              <>
                {/* Goal Achievability Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Goal Achievability</h2>
                    <div className={`px-4 py-2 rounded-full ${
                      results.achievabilityRatio >= 100 ? 'bg-green-100 text-green-700' :
                      results.achievabilityRatio >= 80 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {results.achievabilityRatio.toFixed(1)}%
                    </div>
                  </div>

                  <div className="relative pt-1">
                    <div className="overflow-hidden h-4 text-xs flex rounded-full bg-gray-200">
                      <div
                        style={{ width: `${Math.min(results.achievabilityRatio, 100)}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${
                          results.achievabilityRatio >= 100 ? 'bg-green-500' :
                          results.achievabilityRatio >= 80 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Total Required</p>
                      <p className="text-lg font-bold text-purple-600">₹{formatIndianNumber(results.totalRequiredAtWedding)}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Future Value</p>
                      <p className="text-lg font-bold text-blue-600">₹{formatIndianNumber(results.futureValue)}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Years to Goal</p>
                      <p className="text-lg font-bold text-green-600">{results.yearsToGoal} years</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Child&apos;s Age</p>
                      <p className="text-lg font-bold text-yellow-600">{formData.childCurrentAge} → {formData.targetAge}</p>
                    </div>
                  </div>

                  {results.shortfall > 0 && (
                    <div className="mt-4 bg-red-50 p-4 rounded-lg border border-red-200">
                      <p className="text-sm text-gray-600 mb-1">Shortfall</p>
                      <p className="text-lg font-bold text-red-600">₹{formatIndianNumber(results.shortfall)}</p>
                    </div>
                  )}
                </div>

                {/* Wedding Cost Breakdown Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Wedding Cost Breakdown</h2>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-gray-700">Base Wedding Budget</span>
                      <span className="font-semibold text-purple-600">₹{formatIndianNumber(results.weddingBudgetAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-700">Venue & Catering</span>
                      <span className="font-semibold text-blue-600">₹{formatIndianNumber(results.venueAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-gray-700">Jewellery & Gifts</span>
                      <span className="font-semibold text-green-600">₹{formatIndianNumber(results.jewelleryAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="text-gray-700">Other Costs</span>
                      <span className="font-semibold text-yellow-600">₹{formatIndianNumber(results.otherCostAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg border-2 border-purple-300">
                      <span className="text-gray-900 font-semibold">Total Wedding Cost</span>
                      <span className="font-bold text-purple-700 text-lg">₹{formatIndianNumber(results.totalWeddingCost)}</span>
                    </div>
                  </div>
                </div>

                {/* Loan Details Card (if loan selected) */}
                {formData.wantLoan && results.loanAmount > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-yellow-200 bg-yellow-50">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Loan Details</h2>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-yellow-100 rounded-lg">
                        <span className="text-gray-700">Loan Amount (50%)</span>
                        <span className="font-semibold text-yellow-700">₹{formatIndianNumber(results.loanAmount)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-gray-700">Your Contribution (50%)</span>
                        <span className="font-semibold text-blue-600">₹{formatIndianNumber(results.totalRequiredAtWedding)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-300">
                        <span className="text-gray-700">Monthly EMI</span>
                        <span className="font-semibold text-orange-700">₹{formatIndianNumber(results.emiAmount)}/month</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-300">
                        <span className="text-gray-700">Total Repayment</span>
                        <span className="font-semibold text-red-700">₹{formatIndianNumber(results.totalLoanRepayment)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-100 rounded-lg border-2 border-red-400">
                        <span className="text-gray-900 font-semibold">Total Interest</span>
                        <span className="font-bold text-red-700">₹{formatIndianNumber(results.totalLoanRepayment - results.loanAmount)}</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-300">
                      <p className="text-sm text-red-700">
                        <strong>Note:</strong> Personal loans have high interest with no tax benefits. Plan early to avoid loans!
                      </p>
                    </div>
                  </div>
                )}

                {/* Investment Plan Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Investment Plan</h2>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-gray-700">Current Savings</span>
                      <span className="font-semibold text-purple-600">₹{formatIndianNumber(formData.currentSavings)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-700">Monthly SIP Required</span>
                      <span className="font-semibold text-blue-600">₹{formatIndianNumber(results.sipRequired)}/month</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-gray-700">Total Investment</span>
                      <span className="font-semibold text-green-600">₹{formatIndianNumber(results.totalInvestment)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="text-gray-700">Future Value</span>
                      <span className="font-semibold text-yellow-600">₹{formatIndianNumber(results.futureValue)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg border-2 border-indigo-300">
                      <span className="text-gray-900 font-semibold">Net Gains</span>
                      <span className="font-bold text-indigo-700">₹{formatIndianNumber(results.futureValue - results.totalInvestment)}</span>
                    </div>
                  </div>
                </div>

                {/* Recommendations Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommendations</h2>

                  <div className="space-y-3">
                    {results.recommendations.map((rec, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-l-4 ${
                          rec.type === 'success' ? 'bg-green-50 border-green-500' :
                          rec.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                          rec.type === 'error' ? 'bg-red-50 border-red-500' :
                          'bg-blue-50 border-blue-500'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          {rec.type === 'success' && <span className="text-lg mt-0.5 flex-shrink-0">✓</span>}
                          {rec.type === 'warning' && <span className="text-lg mt-0.5 flex-shrink-0">⚠️</span>}
                          {rec.type === 'error' && <span className="text-lg mt-0.5 flex-shrink-0">✕</span>}
                          {rec.type === 'info' && <span className="text-lg mt-0.5 flex-shrink-0">ℹ️</span>}
                          <p className={`text-sm ${
                            rec.type === 'success' ? 'text-green-700' :
                            rec.type === 'warning' ? 'text-yellow-700' :
                            rec.type === 'error' ? 'text-red-700' :
                            'text-blue-700'
                          }`}>
                            {rec.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 border border-purple-100 flex flex-col items-center justify-center text-center h-full">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-5xl">
                  💒
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Plan Your Child&apos;s Wedding</h3>
                <p className="text-gray-600 mb-6">Fill in your details and click &quot;Calculate Plan&quot; to see personalized recommendations for your child&apos;s special day.</p>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <p className="text-sm text-purple-700">
                    <strong>Tip:</strong> Start saving early! Wedding costs inflate 6-8% annually. Planning 10+ years ahead significantly reduces the financial burden.
                  </p>
                </div>
              </div>
            )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
