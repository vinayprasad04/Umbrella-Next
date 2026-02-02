import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/DashboardLayout';
import Tooltip from '@/components/Tooltip';
import type { NextPageWithLayout } from '../../_app';

const inputClass = "border border-gray-300 dark:border-gray-600 rounded px-4 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-purple-300 dark:bg-gray-700 dark:text-gray-200";
const labelClass = "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1";

const InfoIcon: React.FC<{ tooltip: string }> = ({ tooltip }) => (
  <Tooltip content={tooltip}>
    <svg className="ml-1 text-gray-400 dark:text-gray-500 w-3 h-3 hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </Tooltip>
);

interface WealthCreationData {
  monthlyIncome: number;
  monthlySavings: number;
  emis: number;
  totalLoanAmount: number;
  stocks: number;
  equityMF: number;
  debtMFBonds: number;
  fixedDeposits: number;
  gold: number;
  realEstate: number;
  cashBank: number;
  monthlyStocks: number;
  sipEquityMF: number;
  sipDebtMF: number;
  monthlyRDFD: number;
  monthlyGold: number;
  goalAmount: number;
  targetYear: number;
  goalPossibility: string;
  investmentStrategy: 'aggressive' | 'moderate' | 'conservative';
}

const WealthCreation: NextPageWithLayout = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState<WealthCreationData>({
    monthlyIncome: 100000,
    monthlySavings: 30000,
    emis: 0,
    totalLoanAmount: 0,
    stocks: 0,
    equityMF: 0,
    debtMFBonds: 0,
    fixedDeposits: 0,
    gold: 0,
    realEstate: 0,
    cashBank: 0,
    monthlyStocks: 0,
    sipEquityMF: 0,
    sipDebtMF: 0,
    monthlyRDFD: 0,
    monthlyGold: 0,
    goalAmount: 10000000,
    targetYear: new Date().getFullYear() + 10,
    goalPossibility: '',
    investmentStrategy: 'moderate',
  });

  // Calculated totals
  const totalAssets =
    formData.stocks +
    formData.equityMF +
    formData.debtMFBonds +
    formData.fixedDeposits +
    formData.gold +
    formData.realEstate +
    formData.cashBank;

  const totalMonthlyInvestments =
    formData.monthlyStocks +
    formData.sipEquityMF +
    formData.sipDebtMF +
    formData.monthlyRDFD +
    formData.monthlyGold;

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
        await fetchWealthData(userIdFromStorage);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const fetchWealthData = async (userId: string) => {
    try {
      const response = await fetch(`/api/wealth-creation?userId=${userId}`);
      const result = await response.json();

      if (response.ok && result.data) {
        const loadedData = {
          monthlyIncome: result.data.monthlyIncome || 100000,
          monthlySavings: result.data.monthlySavings || 30000,
          emis: result.data.emis || 0,
          totalLoanAmount: result.data.totalLoanAmount || 0,
          stocks: result.data.stocks || 0,
          equityMF: result.data.equityMF || 0,
          debtMFBonds: result.data.debtMFBonds || 0,
          fixedDeposits: result.data.fixedDeposits || 0,
          gold: result.data.gold || 0,
          realEstate: result.data.realEstate || 0,
          cashBank: result.data.cashBank || 0,
          monthlyStocks: result.data.monthlyStocks || 0,
          sipEquityMF: result.data.sipEquityMF || 0,
          sipDebtMF: result.data.sipDebtMF || 0,
          monthlyRDFD: result.data.monthlyRDFD || 0,
          monthlyGold: result.data.monthlyGold || 0,
          goalAmount: result.data.goalAmount || result.data.budget || 10000000,
          targetYear: result.data.targetYear || new Date().getFullYear() + 10,
          goalPossibility: result.data.goalPossibility || '',
          investmentStrategy: result.data.investmentStrategy || 'moderate',
        };
        setFormData(loadedData);

        // Auto-calculate if goal amount and target year are set
        if (loadedData.goalAmount && loadedData.targetYear) {
          // Trigger calculation after a short delay to ensure formData is updated
          setTimeout(() => {
            calculateWealth();
          }, 100);
        }
      }
    } catch (error) {
      console.error('Error fetching wealth data:', error);
    }
  };

  const handleInputChange = (field: keyof WealthCreationData, value: string) => {
    // Remove commas before parsing
    const cleanValue = value.replace(/,/g, '');
    const numValue = cleanValue === '' ? 0 : parseFloat(cleanValue);
    setFormData(prev => ({
      ...prev,
      [field]: isNaN(numValue) ? 0 : numValue
    }));
  };

  const formatNumber = (num: number): string => {
    if (num === 0) return '';
    return num.toLocaleString('en-IN');
  };

  const calculateWealth = () => {
    const currentYear = new Date().getFullYear();
    const yearsToTarget = formData.targetYear - currentYear;

    if (yearsToTarget <= 0) {
      setErrorMessage('Target year must be in the future!');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    if (!formData.goalAmount || formData.goalAmount <= 0) {
      setErrorMessage('Please enter a valid goal amount!');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    // Calculate net worth
    const currentNetWorth = totalAssets - formData.totalLoanAmount;
    const targetAmount = formData.goalAmount;

    // Calculate with different return rates based on strategy
    const returnRates = {
      aggressive: 0.18,  // 18% annual (high equity)
      moderate: 0.12,    // 12% annual (balanced)
      conservative: 0.10 // 10% annual (more debt/fixed)
    };
    const mixedReturn = returnRates[formData.investmentStrategy];

    // Calculate future value of current assets
    const futureValueOfAssets = currentNetWorth * Math.pow(1 + mixedReturn, yearsToTarget);

    // Calculate required monthly investment
    const monthsToTarget = yearsToTarget * 12;
    const monthlyRate = mixedReturn / 12;

    // Future value of annuity formula
    const futureValueFactor = (Math.pow(1 + monthlyRate, monthsToTarget) - 1) / monthlyRate;
    const requiredMonthlySIP = Math.max(0, (targetAmount - futureValueOfAssets) / futureValueFactor);

    // Calculate with current investments
    const currentMonthlyInvestment = totalMonthlyInvestments;
    const projectedWealth = futureValueOfAssets + (currentMonthlyInvestment * futureValueFactor);

    // Gap analysis
    const shortfall = targetAmount - projectedWealth;
    const surplus = projectedWealth - targetAmount;

    // Calculate ideal allocation based on strategy
    let equityAllocation = 0;
    let directStockAllocation = 0;
    let equityMFAllocation = 0;
    let debtAllocation = 0;

    if (formData.investmentStrategy === 'aggressive') {
      equityAllocation = 85; // Higher equity for aggressive
      directStockAllocation = 35; // 35% in direct stocks
      equityMFAllocation = 50; // 50% in equity MF
      debtAllocation = 15; // 15% in debt
    } else if (formData.investmentStrategy === 'moderate') {
      equityAllocation = 70;
      directStockAllocation = 25; // 25% in direct stocks
      equityMFAllocation = 45; // 45% in equity MF
      debtAllocation = 30; // 30% in debt
    } else { // conservative
      equityAllocation = 50; // Lower equity for conservative
      directStockAllocation = 15; // 15% in direct stocks
      equityMFAllocation = 35; // 35% in equity MF
      debtAllocation = 50; // 50% in debt
    }

    // Current allocation
    const currentEquityPercent = totalMonthlyInvestments > 0
      ? ((formData.monthlyStocks + formData.sipEquityMF) / totalMonthlyInvestments) * 100
      : 0;

    const currentDebtPercent = totalMonthlyInvestments > 0
      ? ((formData.sipDebtMF + formData.monthlyRDFD) / totalMonthlyInvestments) * 100
      : 0;

    // Determine goal status
    let goalStatus = '';
    let goalColor = '';
    const achievabilityRatio = projectedWealth / targetAmount;

    if (achievabilityRatio >= 1.2) {
      goalStatus = 'Highly Achievable';
      goalColor = 'text-green-600';
    } else if (achievabilityRatio >= 1.0) {
      goalStatus = 'Achievable';
      goalColor = 'text-blue-600';
    } else if (achievabilityRatio >= 0.7) {
      goalStatus = 'Challenging';
      goalColor = 'text-orange-600';
    } else {
      goalStatus = 'Unrealistic';
      goalColor = 'text-red-600';
    }

    // Generate recommendations
    const recommendations = [];

    if (shortfall > 0) {
      recommendations.push({
        type: 'warning',
        text: `You need to increase your monthly investment by ₹${Math.round(requiredMonthlySIP - currentMonthlyInvestment).toLocaleString('en-IN')} to reach your goal.`
      });
    } else {
      recommendations.push({
        type: 'success',
        text: `Great! You're on track to exceed your goal by ₹${Math.round(surplus).toLocaleString('en-IN')}.`
      });
    }

    if (Math.abs(currentEquityPercent - equityAllocation) > 15) {
      if (currentEquityPercent < equityAllocation) {
        recommendations.push({
          type: 'info',
          text: `Consider increasing equity allocation to ${equityAllocation}% for better long-term returns. Currently at ${Math.round(currentEquityPercent)}%.`
        });
      } else {
        recommendations.push({
          type: 'info',
          text: `Your equity allocation (${Math.round(currentEquityPercent)}%) is high. Consider balancing with debt instruments for stability.`
        });
      }
    }

    if (formData.totalLoanAmount > totalAssets * 0.3) {
      recommendations.push({
        type: 'warning',
        text: `Your loan-to-asset ratio is high (${Math.round((formData.totalLoanAmount / totalAssets) * 100)}%). Consider accelerating loan repayment.`
      });
    }

    if (totalMonthlyInvestments < formData.monthlySavings * 0.5) {
      recommendations.push({
        type: 'info',
        text: `You're investing only ${Math.round((totalMonthlyInvestments / formData.monthlySavings) * 100)}% of your monthly savings. Consider increasing your investment rate.`
      });
    }

    // Update formData with goalPossibility so it gets saved
    setFormData(prev => ({
      ...prev,
      goalPossibility: goalStatus
    }));

    // Set results
    setResults({
      currentNetWorth,
      targetAmount,
      yearsToTarget,
      projectedWealth,
      shortfall: Math.max(0, shortfall),
      surplus: Math.max(0, surplus),
      requiredMonthlySIP: Math.round(requiredMonthlySIP),
      currentMonthlyInvestment,
      equityAllocation,
      debtAllocation,
      directStockAllocation,
      equityMFAllocation,
      currentEquityPercent: Math.round(currentEquityPercent),
      currentDebtPercent: Math.round(currentDebtPercent),
      goalStatus,
      goalColor,
      achievabilityRatio,
      recommendations,
      futureValueOfAssets,
      investmentStrategy: formData.investmentStrategy,
    });

    setShowResults(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('/api/wealth-creation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          ...formData,
          totalAssets,
          totalMonthlyInvestments,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('Wealth creation data saved successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage(result.error || 'Failed to save data');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error saving wealth data:', error);
      setErrorMessage('Failed to save data. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>My Finance - Wealth Creation - IncomeGrow</title>
        <meta name="description" content="Financial checkup and wealth creation planning with IncomeGrow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      {/* Content Area - Only this part will reload */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
          {/* Left Side - Breadcrumb, Heading & Form */}
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-purple-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-r-0 lg:border-r border-gray-200 dark:border-gray-700 lg:overflow-y-auto flex flex-col">
            {/* Breadcrumb & Header Section */}
            <div className="bg-gradient-to-r from-purple-600 to-orange-500 py-6 md:py-8 px-4 md:px-6 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

              {/* Breadcrumb */}
              <div className="text-xs text-white/80 mb-4 flex items-center gap-1 relative z-10">
                <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                <svg className="mx-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <Link href="/dashboard/my-goal" className="hover:text-white transition-colors">My Goal</Link>
                <svg className="mx-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-white font-semibold">Wealth Creation</span>
              </div>

              {/* Title */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <svg className="text-white w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">Wealth Creation</div>
                  <div className="text-sm text-white/90">Discover your true wealth & optimize your allocation</div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {/* Success/Error Messages */}
              {successMessage && (
                <div className="mb-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded-xl">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl">
                  {errorMessage}
                </div>
              )}

              {/* Smart Link Card */}
              <div className="bg-gradient-to-br from-purple-50 to-orange-50 dark:from-purple-900/20 dark:to-orange-900/20 rounded-2xl border-2 border-purple-200 dark:border-purple-700 mb-6 p-6 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent mb-1 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-orange-500 rounded-lg flex items-center justify-center">
                    <svg className="text-white w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    Smart Link
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-normal block">Your income, savings & EMI details</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Monthly Income <InfoIcon tooltip="Your total monthly income from all sources including salary, business income, rental income, etc." /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500 dark:text-gray-400">₹</span>
                      <input
                        className={inputClass}
                        placeholder="0"
                        type="text"
                        value={formatNumber(formData.monthlyIncome)}
                        onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Monthly Savings <InfoIcon tooltip="The amount you save or set aside each month after all expenses. This is the money available for investments." /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500 dark:text-gray-400">₹</span>
                      <input
                        className={inputClass}
                        placeholder="0"
                        type="text"
                        value={formatNumber(formData.monthlySavings)}
                        onChange={(e) => handleInputChange('monthlySavings', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>EMIs <InfoIcon tooltip="Total monthly EMI payments for all your loans (home loan, car loan, personal loan, credit cards, etc.)" /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500 dark:text-gray-400">₹</span>
                      <input
                        className={inputClass}
                        placeholder="0"
                        type="text"
                        value={formatNumber(formData.emis)}
                        onChange={(e) => handleInputChange('emis', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Goal Planning Card */}
              <div className="bg-gradient-to-br from-orange-50 to-purple-50 dark:from-orange-900/20 dark:to-purple-900/20 rounded-2xl border-2 border-orange-200 dark:border-orange-700 mb-6 p-6 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-lg font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-1 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="text-white w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    Goal Planning
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-normal block">Set your financial goals and targets</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Goal Amount <span className="text-red-500">*</span> <InfoIcon tooltip="The total wealth you want to accumulate. For example, ₹1 Crore for retirement or ₹50 Lakhs for your child's education." /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500 dark:text-gray-400">₹</span>
                      <input
                        className={inputClass}
                        placeholder="e.g., 10000000 (1 Crore)"
                        type="text"
                        value={formatNumber(formData.goalAmount)}
                        onChange={(e) => handleInputChange('goalAmount', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Target Year <span className="text-red-500">*</span> <InfoIcon tooltip="The year by which you want to achieve your wealth goal. More time allows your investments to compound and grow." /></label>
                    <input
                      className={inputClass}
                      placeholder={`e.g., ${new Date().getFullYear() + 10}`}
                      type="number"
                      min={new Date().getFullYear()}
                      value={formData.targetYear || ''}
                      onChange={(e) => handleInputChange('targetYear', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Investment Strategy <span className="text-red-500">*</span> <InfoIcon tooltip="Aggressive (18% return, high equity): For long-term goals. Moderate (12% return, balanced): For medium-term goals. Conservative (10% return, low risk): For short-term or low-risk investors." /></label>
                    <select
                      className={inputClass}
                      value={formData.investmentStrategy}
                      onChange={(e) => setFormData(prev => ({ ...prev, investmentStrategy: e.target.value as 'aggressive' | 'moderate' | 'conservative' }))}
                    >
                      <option value="conservative">Conservative (Low Risk)</option>
                      <option value="moderate">Moderate (Balanced)</option>
                      <option value="aggressive">Aggressive (High Growth)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Loans Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 mb-4 p-4 flex flex-col gap-2 shadow-sm">
                <div className="text-base font-semibold text-purple-700 dark:text-purple-400 mb-2 flex items-center gap-2">
                  <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Loans
                  <span className="text-sm text-gray-400 font-normal">Tell us about your total outstanding loans.</span>
                </div>
                <div className="flex flex-col gap-1 w-64">
                  <label className={labelClass}>
                    Total Loan Amount <span className="text-red-500">*</span> <InfoIcon tooltip="The total outstanding principal amount of all your loans (home loan, car loan, personal loan, education loan, etc.)" />
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-xl text-gray-500 dark:text-gray-400">₹</span>
                    <input
                      className={inputClass}
                      placeholder="0"
                      type="text"
                      value={formatNumber(formData.totalLoanAmount)}
                      onChange={(e) => handleInputChange('totalLoanAmount', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Assets Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 mb-4 p-4 flex flex-col gap-2 shadow-sm">
                <div className="text-base font-semibold text-purple-700 dark:text-purple-400 mb-2 flex items-center gap-2">
                  <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Assets
                  <span className="text-sm text-gray-400 font-normal">Tell us about your total investments & savings till date.</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Stocks <InfoIcon tooltip="Current value of all your direct equity investments in individual company stocks." /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500 dark:text-gray-400">₹</span>
                      <input
                        className={inputClass}
                        placeholder="0"
                        type="text"
                        value={formatNumber(formData.stocks)}
                        onChange={(e) => handleInputChange('stocks', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Equity MF <InfoIcon tooltip="Current value of your equity mutual fund investments including index funds and sectoral funds." /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500 dark:text-gray-400">₹</span>
                      <input
                        className={inputClass}
                        placeholder="0"
                        type="text"
                        value={formatNumber(formData.equityMF)}
                        onChange={(e) => handleInputChange('equityMF', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Debt MF & Bonds <InfoIcon tooltip="Value of debt mutual funds, corporate bonds, government bonds, and other fixed-income securities." /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500 dark:text-gray-400">₹</span>
                      <input
                        className={inputClass}
                        placeholder="0"
                        type="text"
                        value={formatNumber(formData.debtMFBonds)}
                        onChange={(e) => handleInputChange('debtMFBonds', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Fixed Deposits <InfoIcon tooltip="Total amount in bank FDs, RDs, and other fixed deposit schemes like Post Office FDs, company FDs." /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500 dark:text-gray-400">₹</span>
                      <input
                        className={inputClass}
                        placeholder="0"
                        type="text"
                        value={formatNumber(formData.fixedDeposits)}
                        onChange={(e) => handleInputChange('fixedDeposits', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Gold <InfoIcon tooltip="Value of physical gold, digital gold, gold ETFs, sovereign gold bonds, and gold mutual funds you own." /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500 dark:text-gray-400">₹</span>
                      <input
                        className={inputClass}
                        placeholder="0"
                        type="text"
                        value={formatNumber(formData.gold)}
                        onChange={(e) => handleInputChange('gold', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Real Estate <InfoIcon tooltip="Current market value of properties you own (residential, commercial) minus any outstanding mortgage." /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500 dark:text-gray-400">₹</span>
                      <input
                        className={inputClass}
                        placeholder="0"
                        type="text"
                        value={formatNumber(formData.realEstate)}
                        onChange={(e) => handleInputChange('realEstate', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Cash, Bank, etc. <InfoIcon tooltip="Cash in hand, savings account balance, and other liquid assets not invested elsewhere." /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500 dark:text-gray-400">₹</span>
                      <input
                        className={inputClass}
                        placeholder="0"
                        type="text"
                        value={formatNumber(formData.cashBank)}
                        onChange={(e) => handleInputChange('cashBank', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Total Assets <InfoIcon tooltip="Automatically calculated sum of all your assets. This represents your total wealth before deducting loans." /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500 dark:text-gray-400">₹</span>
                      <input
                        className={`${inputClass} bg-gray-50 dark:bg-gray-700 font-bold text-purple-600`}
                        placeholder="0"
                        type="text"
                        value={formatNumber(totalAssets)}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Investments Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 mb-4 p-4 flex flex-col gap-2 shadow-sm">
                <div className="text-base font-semibold text-purple-700 dark:text-purple-400 mb-2 flex items-center gap-2">
                  <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Monthly Investments
                  <span className="text-sm text-gray-400 font-normal">Enter how you invest your monthly savings.</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Monthly Stocks <InfoIcon tooltip="Amount you invest every month in buying individual stocks. This is your regular monthly equity investment." /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500 dark:text-gray-400">₹</span>
                      <input
                        className={inputClass}
                        placeholder="0"
                        type="text"
                        value={formatNumber(formData.monthlyStocks)}
                        onChange={(e) => handleInputChange('monthlyStocks', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>SIP In Equity MF <InfoIcon tooltip="Monthly SIP (Systematic Investment Plan) amount in equity mutual funds. SIPs help you invest regularly and benefit from rupee cost averaging." /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500 dark:text-gray-400">₹</span>
                      <input
                        className={inputClass}
                        placeholder="0"
                        type="text"
                        value={formatNumber(formData.sipEquityMF)}
                        onChange={(e) => handleInputChange('sipEquityMF', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>SIP In Debt MF <InfoIcon tooltip="Monthly SIP amount in debt mutual funds. These provide stable returns with lower risk compared to equity funds." /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500 dark:text-gray-400">₹</span>
                      <input
                        className={inputClass}
                        placeholder="0"
                        type="text"
                        value={formatNumber(formData.sipDebtMF)}
                        onChange={(e) => handleInputChange('sipDebtMF', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Monthly RD/FD <InfoIcon tooltip="Amount you deposit monthly in Recurring Deposits (RD) or Fixed Deposits (FD). These are safe, guaranteed return instruments." /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500 dark:text-gray-400">₹</span>
                      <input
                        className={inputClass}
                        placeholder="0"
                        type="text"
                        value={formatNumber(formData.monthlyRDFD)}
                        onChange={(e) => handleInputChange('monthlyRDFD', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Monthly Gold <InfoIcon tooltip="Amount you invest monthly in gold (physical gold, digital gold, gold ETFs, or sovereign gold bonds)." /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500 dark:text-gray-400">₹</span>
                      <input
                        className={inputClass}
                        placeholder="0"
                        type="text"
                        value={formatNumber(formData.monthlyGold)}
                        onChange={(e) => handleInputChange('monthlyGold', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Total Monthly Investments <InfoIcon tooltip="Automatically calculated sum of all your monthly investments. This shows your total monthly contribution towards wealth creation." /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500 dark:text-gray-400">₹</span>
                      <input
                        className={`${inputClass} bg-gray-50 dark:bg-gray-700 font-bold text-purple-600`}
                        placeholder="0"
                        type="text"
                        value={formatNumber(totalMonthlyInvestments)}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-6 mb-8">
                <button
                  onClick={calculateWealth}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-8 rounded-full text-base shadow transition-colors"
                >
                  Calculate Goal
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
          <div className="w-full lg:w-1/2 bg-white dark:bg-gray-900 lg:overflow-y-auto">
            <div className="p-4 md:p-6">
              {!showResults ? (
                /* Instructions Panel */
                <div className="w-full mx-auto space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-purple-200 dark:border-purple-700">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Wealth Creation Calculator</h2>
                        <p className="text-gray-600 dark:text-gray-400">Plan your financial future with precision</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400 mb-3">How It Works</h3>
                        <ol className="space-y-3 text-gray-700 dark:text-gray-300">
                          <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full flex items-center justify-center font-bold text-sm">1</span>
                            <div>
                              <strong>Enter Your Financial Details</strong>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Fill in your monthly income, savings, current assets, loans, and monthly investments</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                            <div>
                              <strong>Set Your Financial Goal</strong>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Define your target amount (e.g., ₹1 Crore) and target year (e.g., 2035)</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full flex items-center justify-center font-bold text-sm">3</span>
                            <div>
                              <strong>Calculate & Get Recommendations</strong>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Click &quot;Calculate Goal&quot; to see if your goal is achievable and get personalized investment advice</p>
                            </div>
                          </li>
                        </ol>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          What You&apos;ll Get
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Goal feasibility assessment</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Required monthly investment amount</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Asset allocation recommendations</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Investment breakdown (Stocks, MF, FD, Gold)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Personalized financial recommendations</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-700 p-4 rounded">
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <div className="flex-1">
                            <h4 className="font-bold text-yellow-800 text-sm mb-1">Note</h4>
                            <p className="text-xs text-yellow-700">All calculations assume an average return of 10% per year. Actual returns may vary based on market conditions and your investment choices. This is for educational purposes only and not financial advice.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Results Section */
                <div className="max-w-3xl mx-auto space-y-6">
                  {/* Goal Status Banner */}
                  <div className={`bg-gradient-to-r ${
                    results.goalStatus === 'Highly Achievable' ? 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-300 dark:border-green-700' :
                    results.goalStatus === 'Achievable' ? 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-300 dark:border-blue-700' :
                    results.goalStatus === 'Challenging' ? 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-300 dark:border-orange-700' :
                    'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-300 dark:border-red-700'
                  } rounded-xl border-2 p-6 shadow-lg`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Goal Analysis Results</h3>
                        <p className="text-gray-600 dark:text-gray-400">Based on your current financial data and investment strategy</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Goal Status</div>
                        <div className={`text-3xl font-bold ${results.goalColor}`}>{results.goalStatus}</div>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-6 shadow-sm">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Current Net Worth</div>
                      <div className="text-2xl font-bold text-purple-600">₹{results.currentNetWorth.toLocaleString('en-IN')}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">Assets - Loans</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-6 shadow-sm">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Target Amount</div>
                      <div className="text-2xl font-bold text-blue-600">₹{results.targetAmount.toLocaleString('en-IN')}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">In {results.yearsToTarget} years</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-6 shadow-sm">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Projected Wealth</div>
                      <div className="text-2xl font-bold text-green-600">₹{Math.round(results.projectedWealth).toLocaleString('en-IN')}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">With current investments</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Goal Achievement Progress</span>
                      <span className="text-sm font-bold text-purple-600">{Math.round(results.achievabilityRatio * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                      <div
                        className={`h-4 rounded-full ${
                          results.achievabilityRatio >= 1 ? 'bg-green-500' :
                          results.achievabilityRatio >= 0.7 ? 'bg-orange-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(100, results.achievabilityRatio * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Monthly Investment Requirements */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-6 shadow-sm">
                    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Monthly Investment Analysis
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Current Monthly Investment:</span>
                        <span className="font-bold text-lg">₹{results.currentMonthlyInvestment.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Required Monthly Investment:</span>
                        <span className="font-bold text-lg text-purple-600">₹{results.requiredMonthlySIP.toLocaleString('en-IN')}</span>
                      </div>
                      {results.shortfall > 0 && (
                        <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                          <span className="text-orange-700 dark:text-orange-300 font-semibold">Additional Investment Needed:</span>
                          <span className="font-bold text-lg text-orange-600">₹{Math.round(results.requiredMonthlySIP - results.currentMonthlyInvestment).toLocaleString('en-IN')}/month</span>
                        </div>
                      )}
                      {results.surplus > 0 && (
                        <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <span className="text-green-700 dark:text-green-300 font-semibold">Surplus on Target:</span>
                          <span className="font-bold text-lg text-green-600">₹{Math.round(results.surplus).toLocaleString('en-IN')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Asset Allocation */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-6 shadow-sm">
                    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                      </svg>
                      Recommended Asset Allocation
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="text-sm font-semibold text-gray-700 mb-3">Ideal Allocation</div>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Equity</span>
                              <span className="text-sm font-bold text-purple-600">{results.equityAllocation}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                              <div className="bg-purple-600 h-3 rounded-full" style={{ width: `${results.equityAllocation}%` }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Debt</span>
                              <span className="text-sm font-bold text-blue-600">{results.debtAllocation}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                              <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${results.debtAllocation}%` }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-700 mb-3">Your Current Allocation</div>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Equity</span>
                              <span className="text-sm font-bold text-purple-600">{results.currentEquityPercent}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                              <div className="bg-purple-600 h-3 rounded-full" style={{ width: `${results.currentEquityPercent}%` }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Debt</span>
                              <span className="text-sm font-bold text-blue-600">{results.currentDebtPercent}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                              <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${results.currentDebtPercent}%` }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-6 shadow-sm">
                    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Personalized Recommendations
                    </h4>
                    <div className="space-y-3">
                      {results.recommendations.map((rec: any, index: number) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border-l-4 ${
                            rec.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-600' :
                            rec.type === 'warning' ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-500 dark:border-orange-600' :
                            'bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-600'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                              rec.type === 'success' ? 'text-green-600' :
                              rec.type === 'warning' ? 'text-orange-600' :
                              'text-blue-600'
                            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              {rec.type === 'success' ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              ) : rec.type === 'warning' ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              )}
                            </svg>
                            <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">{rec.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Suggested Investment Breakdown */}
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-700 p-6 shadow-sm">
                    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Suggested Monthly Investment Breakdown
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-normal ml-2">
                        ({results.investmentStrategy === 'aggressive' ? 'Aggressive Strategy' :
                          results.investmentStrategy === 'moderate' ? 'Moderate Strategy' :
                          'Conservative Strategy'})
                      </span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Stocks / Direct Equity</div>
                        <div className="text-xl font-bold text-purple-600">₹{Math.round(results.requiredMonthlySIP * results.directStockAllocation / 100).toLocaleString('en-IN')}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{results.directStockAllocation}% allocation</div>
                      </div>
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Equity Mutual Funds (SIP)</div>
                        <div className="text-xl font-bold text-purple-600">₹{Math.round(results.requiredMonthlySIP * results.equityMFAllocation / 100).toLocaleString('en-IN')}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{results.equityMFAllocation}% allocation</div>
                      </div>
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Debt MF / Bonds</div>
                        <div className="text-xl font-bold text-blue-600">₹{Math.round(results.requiredMonthlySIP * (results.debtAllocation * 0.6) / 100).toLocaleString('en-IN')}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{Math.round(results.debtAllocation * 0.6)}% allocation</div>
                      </div>
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">FD / RD / Gold</div>
                        <div className="text-xl font-bold text-blue-600">₹{Math.round(results.requiredMonthlySIP * (results.debtAllocation * 0.4) / 100).toLocaleString('en-IN')}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{Math.round(results.debtAllocation * 0.4)}% allocation</div>
                      </div>
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
WealthCreation.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout currentPage="my-goal">{page}</DashboardLayout>;
};

export default WealthCreation;
