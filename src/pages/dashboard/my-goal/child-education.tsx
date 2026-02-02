import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import Tooltip from '@/components/Tooltip';
import type { NextPageWithLayout } from '../../_app';

const inputClass = "border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-purple-300 dark:bg-gray-700 dark:text-gray-200";
const labelClass = "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1";

const InfoIcon: React.FC<{ tooltip: string }> = ({ tooltip }) => (
  <Tooltip content={tooltip}>
    <svg className="ml-1 text-gray-400 w-3 h-3 hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </Tooltip>
);

interface ChildEducationFormData {
  currentAge: number;
  childCurrentAge: number;
  targetAge: number;
  educationCost: number;
  accommodationCost: number;
  miscCost: number;
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
  totalEducationCost: number;
  educationCostAmount: number;
  accommodationAmount: number;
  miscCostAmount: number;
  otherCostAmount: number;
  totalRequiredAtStart: number;
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

const ChildEducation: NextPageWithLayout = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [results, setResults] = useState<CalculationResults | null>(null);

  const [formData, setFormData] = useState<ChildEducationFormData>({
    currentAge: 30,
    childCurrentAge: 5,
    targetAge: 18,
    educationCost: 2000000,
    accommodationCost: 10,
    miscCost: 5,
    otherCosts: 2,
    currentSavings: 0,
    monthlyIncome: 50000,
    wantLoan: false,
    loanTenure: 5,
    interestRate: 10,
    inflationRate: 8,
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
    fetchChildEducationData(userIdFromStorage);
  }, [router]);

  const fetchChildEducationData = async (uid: string) => {
    try {
      const response = await fetch(`/api/child-education?userId=${encodeURIComponent(uid)}`);
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

  const handleInputChange = (field: keyof ChildEducationFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/child-education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          userId,
        }),
      });
      if (response.ok) {
        alert("Child's Education plan saved successfully!");
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

  const calculateEducationPlan = () => {
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
    const futureEducationCost = formData.educationCost * Math.pow(1 + inflation, yearsToTarget);
    const educationCostAmount = futureEducationCost;
    const accommodationAmount = (futureEducationCost * formData.accommodationCost) / 100;
    const miscCostAmount = (futureEducationCost * formData.miscCost) / 100;
    const otherCostAmount = (futureEducationCost * formData.otherCosts) / 100;

    const totalEducationCost = educationCostAmount + accommodationAmount + miscCostAmount + otherCostAmount;

    let totalRequiredAtStart = totalEducationCost;
    let loanAmount = 0;
    let emiAmount = 0;
    let totalLoanRepayment = 0;

    if (formData.wantLoan) {
      // For education loan, assume 80% loan coverage for child's education
      loanAmount = totalEducationCost * 0.8;
      totalRequiredAtStart = totalEducationCost - loanAmount;

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
    const additionalSavingsNeeded = Math.max(0, totalRequiredAtStart - futureSavingsValue);

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

    const shortfall = Math.max(0, totalRequiredAtStart - futureValue);
    const achievabilityRatio = futureValue > 0 ? (futureValue / totalRequiredAtStart) * 100 : 0;

    // Generate recommendations
    const recommendations: Array<{ type: string; text: string }> = [];

    if (achievabilityRatio >= 100) {
      recommendations.push({
        type: 'success',
        text: `Excellent! You're on track to fund your child's education. Your investments will grow to ₹${formatIndianNumber(futureValue)}.`,
      });
    } else if (achievabilityRatio >= 80) {
      recommendations.push({
        type: 'warning',
        text: `You're close! Consider increasing monthly SIP by ₹${formatIndianNumber(shortfall / totalMonths)} to fully meet your goal.`,
      });
    } else {
      recommendations.push({
        type: 'error',
        text: `Significant shortfall detected. Consider starting earlier, opting for a loan, or adjusting education plans.`,
      });
    }

    // Child education-specific recommendations
    if (yearsToTarget >= 10) {
      recommendations.push({
        type: 'success',
        text: `You have ${yearsToTarget} years to save. This gives you time to invest in equity mutual funds for higher returns (12-15% p.a.).`,
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
        type: 'info',
        text: `Education loans offer tax benefits under Section 80E. Total interest: ₹${formatIndianNumber(totalLoanRepayment - loanAmount)}.`,
      });

      const emiToIncomeRatio = (emiAmount / formData.monthlyIncome) * 100;
      if (emiToIncomeRatio > 40) {
        recommendations.push({
          type: 'warning',
          text: `EMI will be ${emiToIncomeRatio.toFixed(1)}% of your current income. Ensure stable income growth to manage this burden.`,
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
          text: `Required SIP is ${sipToIncomeRatio.toFixed(1)}% of your income. Consider starting earlier or reducing target amount.`,
        });
      } else {
        recommendations.push({
          type: 'success',
          text: `Required SIP of ₹${formatIndianNumber(sipRequired)}/month is ${sipToIncomeRatio.toFixed(1)}% of income - achievable.`,
        });
      }
    }

    // Early start recommendation
    if (formData.childCurrentAge <= 5) {
      recommendations.push({
        type: 'success',
        text: `Starting early (child is ${formData.childCurrentAge} years old) gives you the power of compounding. Small monthly investments can grow significantly!`,
      });
    }

    // Inflation warning
    if (formData.inflationRate >= 8) {
      recommendations.push({
        type: 'info',
        text: `Education inflation is ${formData.inflationRate}% - higher than general inflation. Today's ₹${formatIndianNumber(formData.educationCost)} will be ₹${formatIndianNumber(futureEducationCost)} in ${yearsToTarget} years.`,
      });
    }

    setResults({
      totalEducationCost,
      educationCostAmount,
      accommodationAmount,
      miscCostAmount,
      otherCostAmount,
      totalRequiredAtStart,
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
      <div className="flex-1 w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Child Education Planning - IncomeGrow</title>
        <meta name="description" content="Plan your child's education with detailed calculations" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      {/* Content Area - Only this part will reload */}
      {/* Main Content Area with Responsive Split */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 bg-gradient-to-br from-purple-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-r-0 lg:border-r border-gray-200 lg:overflow-y-auto flex flex-col">
              {/* Breadcrumb & Header Section */}
              <div className="bg-gradient-to-r from-purple-600 to-orange-500 py-6 md:py-8 px-4 md:px-6 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

                {/* Breadcrumb */}
                <div className="text-xs text-white/80 mb-4 flex items-center gap-1 relative z-10">
                  <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                  <svg className="mx-1 text-gray-300 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <Link href="/dashboard/my-goal" className="hover:text-white transition-colors">My Goal</Link>
                  <svg className="mx-1 text-gray-300 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-white font-semibold">Child Education</span>
                </div>

              {/* Title */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <span className="text-3xl text-white">🎓</span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">Child&apos;s Education Planning</div>
                  <div className="text-sm text-white/90">Secure your child&apos;s educational future with smart planning</div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6">
              <div className="space-y-6">
              {/* Basic Information Card */}
              <div className="bg-gradient-to-br from-purple-50 to-orange-50 dark:from-purple-900/20 dark:to-orange-900/20 rounded-2xl border-2 border-purple-200 dark:border-purple-700 mb-6 p-6 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-base font-semibold text-purple-700 dark:text-purple-400 mb-2 flex items-center gap-2">
                  <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Family Information
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>
                      Your Current Age
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
                    </label>
                    <input
                      type="number"
                      value={formData.childCurrentAge}
                      onChange={(e) => handleInputChange('childCurrentAge', parseInt(e.target.value))}
                      className={inputClass}
                      min="0"
                      max="25"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Target Age (When education starts)
                      <InfoIcon tooltip="Typical: 18 for undergraduate, 21 for postgraduate" />
                    </label>
                    <input
                      type="number"
                      value={formData.targetAge}
                      onChange={(e) => handleInputChange('targetAge', parseInt(e.target.value))}
                      className={inputClass}
                      min={formData.childCurrentAge}
                      max="30"
                    />
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Planning Timeline: <span className="font-semibold">{formData.targetAge - formData.childCurrentAge} years</span>
                    </p>
                    <p className="text-xs text-purple-600 mt-1">
                      Your child will be {formData.targetAge} years old when starting higher education
                    </p>
                  </div>
                </div>
              </div>

              {/* Education Costs Card */}
              <div className="bg-gradient-to-br from-purple-50 to-orange-50 dark:from-purple-900/20 dark:to-orange-900/20 rounded-2xl border-2 border-purple-200 dark:border-purple-700 mb-6 p-6 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-base font-semibold text-purple-700 dark:text-purple-400 mb-2 flex items-center gap-2">
                  <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Education Costs
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>
                      Education Cost (Today&apos;s Value)
                      <InfoIcon tooltip="Total tuition and fees at current prices. We'll adjust for 8% annual education inflation." />
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500 dark:text-gray-400">₹</span>
                      <input
                        type="number"
                        value={formData.educationCost}
                        onChange={(e) => handleInputChange('educationCost', parseFloat(e.target.value) || 0)}
                        className={inputClass}
                        min="0"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Typical costs: Engineering ₹20-30L, Medical ₹50-100L, Abroad ₹50L-1Cr
                    </p>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Accommodation Cost (% of education)
                      <InfoIcon tooltip="Hostel, rent, or housing costs during the course duration" />
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.accommodationCost}
                        onChange={(e) => handleInputChange('accommodationCost', parseFloat(e.target.value) || 0)}
                        className={inputClass}
                        min="0"
                        max="100"
                        step="0.1"
                      />
                      <span className="absolute right-3 top-2 text-gray-500 dark:text-gray-400">%</span>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Miscellaneous Cost (% of education)
                      <InfoIcon tooltip="Books, supplies, equipment, lab fees, etc." />
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.miscCost}
                        onChange={(e) => handleInputChange('miscCost', parseFloat(e.target.value) || 0)}
                        className={inputClass}
                        min="0"
                        max="100"
                        step="0.1"
                      />
                      <span className="absolute right-3 top-2 text-gray-500 dark:text-gray-400">%</span>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Other Costs (% of education)
                      <InfoIcon tooltip="Travel, personal expenses, emergency funds" />
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
                      <span className="absolute right-3 top-2 text-gray-500 dark:text-gray-400">%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Details Card */}
              <div className="bg-gradient-to-br from-purple-50 to-orange-50 dark:from-purple-900/20 dark:to-orange-900/20 rounded-2xl border-2 border-purple-200 dark:border-purple-700 mb-6 p-6 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-base font-semibold text-purple-700 dark:text-purple-400 mb-2 flex items-center gap-2">
                  <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Financial Details
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>
                      Current Savings for Child&apos;s Education
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500 dark:text-gray-400">₹</span>
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
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500 dark:text-gray-400">₹</span>
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

              {/* Education Loan Option Card */}
              <div className="bg-gradient-to-br from-purple-50 to-orange-50 dark:from-purple-900/20 dark:to-orange-900/20 rounded-2xl border-2 border-purple-200 dark:border-purple-700 mb-6 p-6 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-base font-semibold text-purple-700 dark:text-purple-400 mb-2 flex items-center gap-2">
                  <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Education Loan Option
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-2 border-purple-200 dark:border-purple-600">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${formData.wantLoan ? 'bg-purple-600' : 'bg-gray-300'}`}>
                      <svg className="text-white w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">Take Education Loan</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">80% loan coverage, tax benefits available</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.wantLoan}
                      onChange={(e) => handleInputChange('wantLoan', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                {formData.wantLoan && (
                  <div className="space-y-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700 mt-2">
                    <div>
                      <label className={labelClass}>
                        Loan Tenure (Years)
                        <InfoIcon tooltip="Education loans typically range from 5-15 years" />
                      </label>
                      <input
                        type="number"
                        value={formData.loanTenure}
                        onChange={(e) => handleInputChange('loanTenure', parseInt(e.target.value) || 1)}
                        className={inputClass}
                        min="1"
                        max="15"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Interest Rate (% per annum)
                        <InfoIcon tooltip="Current education loan rates: 9-12% per annum" />
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
                        <span className="absolute right-3 top-2 text-gray-500 dark:text-gray-400">%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Investment Parameters Card */}
              <div className="bg-gradient-to-br from-purple-50 to-orange-50 dark:from-purple-900/20 dark:to-orange-900/20 rounded-2xl border-2 border-purple-200 dark:border-purple-700 mb-6 p-6 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-base font-semibold text-purple-700 dark:text-purple-400 mb-2 flex items-center gap-2">
                  <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Investment Parameters
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>
                      Expected Inflation Rate
                      <InfoIcon tooltip="Education inflation typically 8-10% annually" />
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
                      <span className="absolute right-3 top-2 text-gray-500 dark:text-gray-400">%</span>
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
                      <span className="absolute right-3 top-2 text-gray-500 dark:text-gray-400">%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-6 mb-8">
                <button
                  onClick={calculateEducationPlan}
                  className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Calculate Plan
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-8 rounded-full text-base shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : 'Save Plan'}
                </button>
              </div>
            </div>
          </div>
            </div>

            {/* Right Side - Results */}
            <div className="w-full lg:w-1/2 bg-white dark:bg-gray-900 lg:overflow-y-auto">
            <div className="p-4 md:p-6">
              {results ? (
                <div className="max-w-3xl mx-auto space-y-6">
                  {/* Goal Achievability Card */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-purple-100 dark:border-gray-700 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Goal Achievability</h2>
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
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Required</p>
                      <p className="text-lg font-bold text-purple-600">₹{formatIndianNumber(results.totalRequiredAtStart)}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Future Value</p>
                      <p className="text-lg font-bold text-blue-600">₹{formatIndianNumber(results.futureValue)}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Years to Goal</p>
                      <p className="text-lg font-bold text-green-600">{results.yearsToGoal} years</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Child&apos;s Age</p>
                      <p className="text-lg font-bold text-yellow-600">{formData.childCurrentAge} → {formData.targetAge}</p>
                    </div>
                  </div>

                  {results.shortfall > 0 && (
                    <div className="mt-4 bg-red-50 p-4 rounded-lg border border-red-200 dark:border-red-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Shortfall</p>
                      <p className="text-lg font-bold text-red-600">₹{formatIndianNumber(results.shortfall)}</p>
                    </div>
                  )}
                </div>

                  {/* Education Cost Breakdown Card */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-purple-100 dark:border-gray-700 p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Education Cost Breakdown</h2>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">Tuition & Fees</span>
                      <span className="font-semibold text-purple-600">₹{formatIndianNumber(results.educationCostAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">Accommodation</span>
                      <span className="font-semibold text-blue-600">₹{formatIndianNumber(results.accommodationAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">Miscellaneous</span>
                      <span className="font-semibold text-green-600">₹{formatIndianNumber(results.miscCostAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">Other Costs</span>
                      <span className="font-semibold text-yellow-600">₹{formatIndianNumber(results.otherCostAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border-2 border-purple-300 dark:border-purple-600">
                      <span className="text-gray-900 dark:text-gray-100 font-semibold">Total Education Cost</span>
                      <span className="font-bold text-purple-700 text-lg">₹{formatIndianNumber(results.totalEducationCost)}</span>
                    </div>
                  </div>
                </div>

                  {/* Loan Details Card (if loan selected) */}
                  {formData.wantLoan && results.loanAmount > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-purple-100 dark:border-gray-700 p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Education Loan Details</h2>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">Loan Amount (80%)</span>
                        <span className="font-semibold text-purple-600">₹{formatIndianNumber(results.loanAmount)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">Your Contribution (20%)</span>
                        <span className="font-semibold text-blue-600">₹{formatIndianNumber(results.totalRequiredAtStart)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">Monthly EMI</span>
                        <span className="font-semibold text-yellow-600">₹{formatIndianNumber(results.emiAmount)}/month</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">Total Repayment</span>
                        <span className="font-semibold text-red-600">₹{formatIndianNumber(results.totalLoanRepayment)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700">
                        <span className="text-gray-700 dark:text-gray-300">Total Interest</span>
                        <span className="font-semibold text-orange-600">₹{formatIndianNumber(results.totalLoanRepayment - results.loanAmount)}</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                      <p className="text-sm text-green-700 dark:text-green-300">
                        <strong>Tax Benefit:</strong> Interest on education loan is deductible under Section 80E
                      </p>
                      </div>
                    </div>
                  )}

                  {/* Investment Plan Card */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-purple-100 dark:border-gray-700 p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Investment Plan</h2>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">Current Savings</span>
                      <span className="font-semibold text-purple-600">₹{formatIndianNumber(formData.currentSavings)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">Monthly SIP Required</span>
                      <span className="font-semibold text-blue-600">₹{formatIndianNumber(results.sipRequired)}/month</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">Total Investment</span>
                      <span className="font-semibold text-green-600">₹{formatIndianNumber(results.totalInvestment)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">Future Value</span>
                      <span className="font-semibold text-yellow-600">₹{formatIndianNumber(results.futureValue)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border-2 border-indigo-300 dark:border-indigo-600">
                      <span className="text-gray-900 dark:text-gray-100 font-semibold">Net Gains</span>
                      <span className="font-bold text-indigo-700">₹{formatIndianNumber(results.futureValue - results.totalInvestment)}</span>
                    </div>
                  </div>
                </div>

                  {/* Recommendations Card */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-purple-100 dark:border-gray-700 p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Recommendations</h2>

                  <div className="space-y-3">
                    {results.recommendations.map((rec, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-l-4 ${
                          rec.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-600' :
                          rec.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                          rec.type === 'error' ? 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-600' :
                          'bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-600'
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
                </div>
              ) : (
                /* Instructions Panel */
                <div className="w-full mx-auto space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-purple-200 dark:border-purple-700 dark:border-purple-700">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-5xl">
                        🎓
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Plan Your Child&apos;s Education</h2>
                        <p className="text-gray-600 dark:text-gray-400">Fill in your details and click &quot;Calculate Plan&quot; to see personalized recommendations for your child&apos;s educational future.</p>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        <strong>Tip:</strong> Start early! Every year of delay increases the required monthly SIP significantly due to education inflation.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            </div>
      </div>
      
    </>
  );
};

// Use persistent layout for goal pages
ChildEducation.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout currentPage="my-goal">{page}</DashboardLayout>;
};

export default ChildEducation;
