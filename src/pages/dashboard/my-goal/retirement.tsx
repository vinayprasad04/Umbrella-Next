import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/DashboardLayout';
import Tooltip from '@/components/Tooltip';
import type { NextPageWithLayout } from '../../_app';

const inputClass = "border border-gray-300 rounded px-4 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-blue-300";
const labelClass = "text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1";

const InfoIcon: React.FC<{ tooltip: string }> = ({ tooltip }) => (
  <Tooltip content={tooltip}>
    <svg className="ml-1 text-gray-400 w-3 h-3 hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </Tooltip>
);

interface RetirementData {
  monthlyIncome: number;
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyExpenses: number;
  inflationRate: number;
  returnRate: number;
  postRetirementReturn: number;
  // Investment allocations
  equityAllocation: number;
  debtAllocation: number;
  goldAllocation: number;
  // Additional income sources
  pension: number;
  rentalIncome: number;
  otherIncome: number;
  goalPossibility: string;
}

interface RetirementResults {
  yearsToRetirement: number;
  yearsInRetirement: number;
  requiredCorpus: number;
  adjustedMonthlyInvestment: number;
  totalInvestment: number;
  futureValue: number;
  netGains: number;
  monthlyIncomeAtRetirement: number;
  currentSavingsGrowth: number;
  monthlyExpensesAtRetirement: number;
  corpusShortfall: number;
  goalStatus: string;
  goalColor: string;
  recommendations: Array<{ type: string; text: string }>;
}

const Retirement: NextPageWithLayout = () => {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState<RetirementData>({
    monthlyIncome: 0,
    currentAge: 30,
    retirementAge: 60,
    currentSavings: 0,
    monthlyExpenses: 0,
    inflationRate: 6,
    returnRate: 12,
    postRetirementReturn: 8,
    equityAllocation: 60,
    debtAllocation: 30,
    goldAllocation: 10,
    pension: 0,
    rentalIncome: 0,
    otherIncome: 0,
    goalPossibility: '',
  });

  const [results, setResults] = useState<RetirementResults | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
      const userIdFromStorage = localStorage.getItem('userId');

      if (!isLoggedIn) {
        router.push('/login');
        return;
      }

      if (userIdFromStorage) {
        setUserId(userIdFromStorage);
        await fetchRetirementData(userIdFromStorage);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const fetchRetirementData = async (userId: string) => {
    try {
      const response = await fetch(`/api/retirement?userId=${userId}`);
      const result = await response.json();

      if (response.ok && result.data) {
        const loadedData = {
          monthlyIncome: result.data.monthlyIncome || 0,
          currentAge: result.data.currentAge || 30,
          retirementAge: result.data.retirementAge || 60,
          currentSavings: result.data.currentSavings || 0,
          monthlyExpenses: result.data.monthlyExpenses || 0,
          inflationRate: result.data.inflationRate || 6,
          returnRate: result.data.returnRate || 12,
          postRetirementReturn: result.data.postRetirementReturn || 8,
          equityAllocation: result.data.equityAllocation || 60,
          debtAllocation: result.data.debtAllocation || 30,
          goldAllocation: result.data.goldAllocation || 10,
          pension: result.data.pension || 0,
          rentalIncome: result.data.rentalIncome || 0,
          otherIncome: result.data.otherIncome || 0,
          goalPossibility: result.data.goalPossibility || '',
        };
        setFormData(loadedData);

        // Auto-calculate if data exists
        if (loadedData.monthlyIncome > 0 && loadedData.currentAge > 0) {
          setTimeout(() => {
            calculateRetirement();
          }, 100);
        }
      }
    } catch (error) {
      console.error('Error fetching retirement data:', error);
    }
  };

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleInputChange = (field: keyof RetirementData, value: string) => {
    const numValue = parseFloat(value.replace(/,/g, '')) || 0;
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  const calculateRetirement = () => {
    const yearsToRetirement = formData.retirementAge - formData.currentAge;

    if (yearsToRetirement <= 0) {
      setErrorMessage('Retirement age must be greater than current age');
      return;
    }

    setErrorMessage('');

    const inflation = formData.inflationRate / 100;
    const annualReturn = formData.returnRate / 100;
    const monthlyReturn = annualReturn / 12;

    // Calculate future monthly expenses at retirement (adjusted for inflation)
    const monthlyExpensesAtRetirement = formData.monthlyExpenses * Math.pow(1 + inflation, yearsToRetirement);

    // Monthly Pension is the desired pension amount at retirement (in today's value)
    // We need to adjust it for inflation to get the actual amount needed at retirement
    const pensionAtRetirement = formData.pension * Math.pow(1 + inflation, yearsToRetirement);

    // The pension amount represents the DESIRED monthly income at retirement
    // So the required corpus needs to generate this amount using 4% withdrawal rule
    // Required corpus calculation using 4% withdrawal rule
    // With 4% annual withdrawal, the corpus needed = Annual Income Required ÷ 0.04 = Annual Income × 25
    // This assumes the corpus generates enough returns to sustain 4% withdrawal indefinitely
    const annualPensionRequired = pensionAtRetirement * 12;
    const requiredCorpus = annualPensionRequired * 25;

    // Calculate future value of current savings
    const totalMonths = yearsToRetirement * 12;
    const currentSavingsGrowth = formData.currentSavings * Math.pow(1 + monthlyReturn, totalMonths);

    // Adjusted required corpus
    const adjustedRequiredCorpus = Math.max(0, requiredCorpus - currentSavingsGrowth);

    // Calculate monthly SIP needed
    const adjustedMonthlyInvestment = adjustedRequiredCorpus > 0
      ? adjustedRequiredCorpus * monthlyReturn / (Math.pow(1 + monthlyReturn, totalMonths) - 1)
      : 0;

    const totalInvestment = adjustedMonthlyInvestment * totalMonths;
    const futureValue = adjustedMonthlyInvestment * ((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn) + currentSavingsGrowth;
    const netGains = futureValue - totalInvestment - formData.currentSavings;
    const corpusShortfall = Math.max(0, requiredCorpus - futureValue);

    // Determine goal status
    let goalStatus = '';
    let goalColor = '';
    const achievabilityRatio = (futureValue / requiredCorpus) * 100;

    if (achievabilityRatio >= 100) {
      goalStatus = 'Retirement Goal Achievable';
      goalColor = 'text-green-600';
    } else if (achievabilityRatio >= 75) {
      goalStatus = 'Nearly Achievable - Minor Adjustments Needed';
      goalColor = 'text-yellow-600';
    } else if (achievabilityRatio >= 50) {
      goalStatus = 'Challenging - Significant Changes Required';
      goalColor = 'text-orange-600';
    } else {
      goalStatus = 'Not Achievable - Major Restructuring Needed';
      goalColor = 'text-red-600';
    }

    // Recommendations
    const recommendations: Array<{ type: string; text: string }> = [];

    if (corpusShortfall > 0) {
      recommendations.push({
        type: 'warning',
        text: `You have a corpus shortfall of ₹${Math.round(corpusShortfall / 100000) / 10} Lakhs. Consider increasing your monthly investment or retirement age.`
      });
    }

    if (adjustedMonthlyInvestment > formData.monthlyIncome * 0.3) {
      recommendations.push({
        type: 'warning',
        text: `Required monthly investment is ${Math.round((adjustedMonthlyInvestment / formData.monthlyIncome) * 100)}% of your income. This may not be sustainable.`
      });
    }

    if (formData.equityAllocation < 50 && yearsToRetirement > 10) {
      recommendations.push({
        type: 'info',
        text: 'Consider increasing equity allocation for better long-term returns since you have more than 10 years to retirement.'
      });
    }

    if (formData.pension === 0 && formData.rentalIncome === 0 && formData.otherIncome === 0) {
      recommendations.push({
        type: 'info',
        text: 'Consider building passive income sources like pension, rental income, or dividend income to reduce retirement corpus requirement.'
      });
    }

    if (achievabilityRatio >= 100) {
      recommendations.push({
        type: 'success',
        text: 'Great! Your retirement plan is on track. Continue your disciplined investment approach.'
      });
    }

    // Update formData with goalPossibility
    setFormData(prev => ({
      ...prev,
      goalPossibility: goalStatus
    }));

    setResults({
      yearsToRetirement,
      yearsInRetirement: 0, // Not used with 4% rule
      requiredCorpus: Math.round(requiredCorpus),
      adjustedMonthlyInvestment: Math.round(adjustedMonthlyInvestment),
      totalInvestment: Math.round(totalInvestment),
      futureValue: Math.round(futureValue),
      netGains: Math.round(netGains),
      monthlyIncomeAtRetirement: Math.round(monthlyExpensesAtRetirement),
      currentSavingsGrowth: Math.round(currentSavingsGrowth),
      monthlyExpensesAtRetirement: Math.round(monthlyExpensesAtRetirement),
      corpusShortfall: Math.round(corpusShortfall),
      goalStatus,
      goalColor,
      recommendations,
    });

    setShowResults(true);
  };

  const handleSave = async () => {
    if (!userId) {
      setErrorMessage('User not authenticated');
      return;
    }

    setIsSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/retirement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('Retirement plan saved successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage(result.error || 'Failed to save data');
      }
    } catch (error) {
      setErrorMessage('Error saving data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Retirement Planning - IncomeGrow</title>
        <meta name="description" content="Plan your retirement with comprehensive analysis" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      {/* Content Area - Only this part will reload */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
          {/* Left Side - Breadcrumb, Heading & Form */}
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-purple-50 via-white to-orange-50 border-r-0 lg:border-r border-gray-200 lg:overflow-y-auto flex flex-col">
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
                <span className="text-white font-semibold">Retirement Planning</span>
              </div>

              {/* Title */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <span className="text-3xl text-white">🛒</span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">Retirement Planning</div>
                  <div className="text-sm text-white/90">Plan your golden years with confidence</div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {/* Success/Error Messages */}
              {successMessage && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                  {errorMessage}
                </div>
              )}

              {/* Basic Information Card */}
              <div className="bg-gradient-to-br from-purple-50 to-orange-50 rounded-2xl border-2 border-purple-200 mb-6 p-6 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-base font-semibold text-purple-700 mb-2 flex items-center gap-2">
                  <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Basic Information
                  <span className="text-sm text-gray-400 font-normal">Your current financial situation</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Current Age <span className="text-red-500">*</span> <InfoIcon tooltip="Your current age in years. This helps calculate the time horizon for retirement planning." /></label>
                    <input
                      className={inputClass}
                      placeholder="30"
                      type="number"
                      min="18"
                      max="100"
                      value={formData.currentAge || ''}
                      onChange={(e) => handleInputChange('currentAge', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Retirement Age <span className="text-red-500">*</span> <InfoIcon tooltip="The age at which you plan to retire. Standard retirement age in India is 60, but you can choose earlier or later." /></label>
                    <input
                      className={inputClass}
                      placeholder="60"
                      type="number"
                      min="40"
                      max="80"
                      value={formData.retirementAge || ''}
                      onChange={(e) => handleInputChange('retirementAge', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Monthly Income <span className="text-red-500">*</span> <InfoIcon tooltip="Your current gross monthly income from salary or business before any deductions." /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500">₹</span>
                      <input
                        className={inputClass}
                        placeholder="100000"
                        type="text"
                        value={formatNumber(formData.monthlyIncome)}
                        onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Current Monthly Expenses <InfoIcon tooltip="Your current average monthly household expenses. This helps us understand your spending pattern for reference." /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500">₹</span>
                      <input
                        className={inputClass}
                        placeholder="50000"
                        type="text"
                        value={formatNumber(formData.monthlyExpenses)}
                        onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Current Savings <InfoIcon tooltip="Total amount you have saved till date in all investment accounts (mutual funds, stocks, FDs, PPF, etc.)." /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500">₹</span>
                      <input
                        className={inputClass}
                        placeholder="1000000"
                        type="text"
                        value={formatNumber(formData.currentSavings)}
                        onChange={(e) => handleInputChange('currentSavings', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Rates & Assumptions Card */}
              <div className="bg-gradient-to-br from-purple-50 to-orange-50 rounded-2xl border-2 border-purple-200 mb-6 p-6 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-base font-semibold text-purple-700 mb-2 flex items-center gap-2">
                  <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Rates & Assumptions
                  <span className="text-sm text-gray-400 font-normal">Expected returns and inflation</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Inflation Rate (%) <InfoIcon tooltip="Expected annual inflation rate. Historical average in India is 6%. This affects how much your expenses will grow over time." /></label>
                    <input
                      className={inputClass}
                      placeholder="6"
                      type="number"
                      step="0.1"
                      min="0"
                      max="20"
                      value={formData.inflationRate || ''}
                      onChange={(e) => handleInputChange('inflationRate', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Pre-Retirement Return (%) <InfoIcon tooltip="Expected annual return on your investments before retirement. Balanced portfolio typically returns 10-12% per year." /></label>
                    <input
                      className={inputClass}
                      placeholder="12"
                      type="number"
                      step="0.1"
                      min="0"
                      max="30"
                      value={formData.returnRate || ''}
                      onChange={(e) => handleInputChange('returnRate', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Post-Retirement Return (%) <InfoIcon tooltip="Expected annual return after retirement. Usually lower (8-9%) as you shift to safer investments like bonds and FDs." /></label>
                    <input
                      className={inputClass}
                      placeholder="8"
                      type="number"
                      step="0.1"
                      min="0"
                      max="20"
                      value={formData.postRetirementReturn || ''}
                      onChange={(e) => handleInputChange('postRetirementReturn', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Asset Allocation Card */}
              <div className="bg-gradient-to-br from-purple-50 to-orange-50 rounded-2xl border-2 border-purple-200 mb-6 p-6 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-base font-semibold text-purple-700 mb-2 flex items-center gap-2">
                  <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                  Asset Allocation
                  <span className="text-sm text-gray-400 font-normal">How you plan to invest (Total: {formData.equityAllocation + formData.debtAllocation + formData.goldAllocation}%)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Equity Allocation (%) <InfoIcon tooltip="Percentage allocated to equity investments (stocks, equity mutual funds). Higher risk, higher returns. Recommended: 60-70% for long horizon." /></label>
                    <input
                      className={inputClass}
                      placeholder="60"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.equityAllocation || ''}
                      onChange={(e) => handleInputChange('equityAllocation', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Debt Allocation (%) <InfoIcon tooltip="Percentage allocated to debt instruments (FDs, bonds, debt funds). Lower risk, moderate returns. Recommended: 25-35%." /></label>
                    <input
                      className={inputClass}
                      placeholder="30"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.debtAllocation || ''}
                      onChange={(e) => handleInputChange('debtAllocation', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Gold Allocation (%) <InfoIcon tooltip="Percentage allocated to gold (physical, digital gold, gold ETFs, SGBs). Hedge against inflation. Recommended: 5-10%." /></label>
                    <input
                      className={inputClass}
                      placeholder="10"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.goldAllocation || ''}
                      onChange={(e) => handleInputChange('goldAllocation', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Passive Income Sources Card */}
              <div className="bg-gradient-to-br from-purple-50 to-orange-50 rounded-2xl border-2 border-purple-200 mb-6 p-6 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-base font-semibold text-purple-700 mb-2 flex items-center gap-2">
                  <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Desired Retirement Income
                  <span className="text-sm text-gray-400 font-normal">Target monthly income at retirement (in today&apos;s value)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Desired Monthly Pension <span className="text-red-500">*</span> <InfoIcon tooltip="The monthly pension/income you want at retirement (in today's value). For example, if you want ₹60,000/month, after 10 years with 6% inflation, you'll need approximately ₹1,07,454/month. We'll calculate the exact inflation-adjusted amount and required corpus." /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500">₹</span>
                      <input
                        className={inputClass}
                        placeholder="60000"
                        type="text"
                        value={formatNumber(formData.pension)}
                        onChange={(e) => handleInputChange('pension', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Rental Income <InfoIcon tooltip="Expected monthly rental income from properties you own or plan to own. Enter current or estimated value." /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500">₹</span>
                      <input
                        className={inputClass}
                        placeholder="0"
                        type="text"
                        value={formatNumber(formData.rentalIncome)}
                        onChange={(e) => handleInputChange('rentalIncome', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Other Income <InfoIcon tooltip="Any other expected passive income like dividends, business income, royalties, etc. Enter today's monthly value." /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500">₹</span>
                      <input
                        className={inputClass}
                        placeholder="0"
                        type="text"
                        value={formatNumber(formData.otherIncome)}
                        onChange={(e) => handleInputChange('otherIncome', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={calculateRetirement}
                  className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Calculate Retirement Plan
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-8 rounded-full text-base shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Saving...' : 'Save Data'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Results/Instructions */}
          <div className="w-full lg:w-1/2 bg-white lg:overflow-y-auto">
            <div className="p-4 md:p-6">
              {!showResults ? (
                /* Instructions Panel */
                <div className="w-full mx-auto space-y-6">
                  <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-200">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                        🛒
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-800">Retirement Planning Calculator</h2>
                        <p className="text-gray-600">Plan your golden years with precision</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-blue-700 mb-3">How It Works</h3>
                        <ol className="space-y-3 text-gray-700">
                          <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">1</span>
                            <div>
                              <strong>Enter Your Details</strong>
                              <p className="text-sm text-gray-600 mt-1">Provide your current age, retirement age, and current savings</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                            <div>
                              <strong>Set Desired Pension</strong>
                              <p className="text-sm text-gray-600 mt-1">Enter the monthly pension you want at retirement in today&apos;s value (e.g., ₹60,000)</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">3</span>
                            <div>
                              <strong>Configure Assumptions</strong>
                              <p className="text-sm text-gray-600 mt-1">Set inflation rate and expected investment returns</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">4</span>
                            <div>
                              <strong>Calculate & Review</strong>
                              <p className="text-sm text-gray-600 mt-1">Get your inflation-adjusted pension amount, required corpus (using 4% withdrawal rule), and monthly SIP needed</p>
                            </div>
                          </li>
                        </ol>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          What You&apos;ll Get
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Inflation-adjusted pension amount at retirement</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Required corpus using 4% withdrawal rule</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Monthly SIP needed to build the corpus</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Goal achievability with personalized recommendations</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                        <div className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <div className="text-sm text-gray-700">
                            <strong className="text-gray-800">Important:</strong> This calculator provides estimates based on your inputs. Actual returns may vary. Consider consulting a financial advisor for personalized advice.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : results ? (
                /* Results Panel */
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Retirement Analysis Results</h2>
                    <div className={`text-xl font-bold mb-2 ${results.goalColor}`}>
                      {results.goalStatus}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      Based on your inputs, here&apos;s your comprehensive retirement analysis
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-blue-200">
                        <div className="text-xs text-gray-500 mb-1">Years to Retirement</div>
                        <div className="text-2xl font-bold text-blue-600">{results.yearsToRetirement} years</div>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 mt-3 border border-blue-200">
                      <div className="text-xs text-blue-700">
                        <strong>4% Withdrawal Rule:</strong> Your corpus will generate 4% annual income (₹{(results.requiredCorpus * 0.04 / 12).toLocaleString('en-IN')}/month) at retirement to cover your desired pension amount.
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Required Corpus & Investment</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-700">Required Retirement Corpus</span>
                        <span className="font-bold text-lg text-blue-600">₹{(results.requiredCorpus / 10000000).toFixed(2)} Cr</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-700">Monthly SIP Required</span>
                        <span className="font-bold text-lg text-orange-600">₹{results.adjustedMonthlyInvestment.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-700">Total Investment</span>
                        <span className="font-bold text-gray-800">₹{(results.totalInvestment / 10000000).toFixed(2)} Cr</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-700">Future Value</span>
                        <span className="font-bold text-green-600">₹{(results.futureValue / 10000000).toFixed(2)} Cr</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-700">Net Gains</span>
                        <span className="font-bold text-green-600">₹{(results.netGains / 10000000).toFixed(2)} Cr</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Retirement Income Analysis</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-700">Desired Pension (Today&apos;s Value)</span>
                        <span className="font-bold text-gray-800">₹{formData.pension.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-700">Pension at Retirement (Inflation Adjusted)</span>
                        <span className="font-bold text-orange-600">₹{results.monthlyExpensesAtRetirement.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-700">Current Savings Growth</span>
                        <span className="font-bold text-blue-600">₹{(results.currentSavingsGrowth / 10000000).toFixed(2)} Cr</span>
                      </div>
                      {results.corpusShortfall > 0 && (
                        <div className="flex justify-between items-center py-2 bg-red-50 px-3 rounded-lg">
                          <span className="text-red-700 font-semibold">Corpus Shortfall</span>
                          <span className="font-bold text-red-600">₹{(results.corpusShortfall / 10000000).toFixed(2)} Cr</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {results.recommendations.length > 0 && (
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Recommendations</h3>
                      <div className="space-y-2">
                        {results.recommendations.map((rec, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-lg border ${
                              rec.type === 'success'
                                ? 'bg-green-50 border-green-200 text-green-800'
                                : rec.type === 'warning'
                                ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                                : 'bg-blue-50 border-blue-200 text-blue-800'
                            }`}
                          >
                            {rec.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
      </div>
    </>
  );
};

// Use persistent layout for goal pages
Retirement.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout currentPage="my-goal">{page}</DashboardLayout>;
};

export default Retirement;
