import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/DashboardLayout';
import Tooltip from '@/components/Tooltip';
import type { NextPageWithLayout } from '../../_app';

const inputClass = "border border-gray-300 rounded px-4 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-purple-300";
const labelClass = "text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1";

const InfoIcon: React.FC<{ tooltip: string }> = ({ tooltip }) => (
  <Tooltip content={tooltip}>
    <svg className="ml-1 text-gray-400 w-3 h-3 hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </Tooltip>
);

interface HouseData {
  currentAge: number;
  targetAge: number;
  propertyValue: number;
  downPaymentPercentage: number;
  currentSavings: number;
  monthlyIncome: number;
  wantLoan: boolean;
  loanTenure: number;
  interestRate: number;
  expectedAppreciation: number;
  inflationRate: number;
  returnRate: number;
  registrationCharges: number;
  stampDuty: number;
  otherCosts: number;
  goalPossibility: string;
}

interface HouseResults {
  yearsToTarget: number;
  futurePropertyValue: number;
  downPaymentAmount: number;
  loanAmount: number;
  totalCosts: number;
  totalRequiredAtPurchase: number;
  currentSavingsGrowth: number;
  additionalSavingsNeeded: number;
  monthlySIPRequired: number;
  totalInvestment: number;
  futureValue: number;
  emiAmount: number;
  totalLoanPayment: number;
  totalInterestPaid: number;
  goalStatus: string;
  goalColor: string;
  recommendations: Array<{ type: string; text: string }>;
}

const HousePage: NextPageWithLayout = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showResults, setShowResults] = useState(false);

  const [formData, setFormData] = useState<HouseData>({
    currentAge: 30,
    targetAge: 35,
    propertyValue: 5000000,
    downPaymentPercentage: 20,
    currentSavings: 0,
    monthlyIncome: 0,
    wantLoan: false,
    loanTenure: 20,
    interestRate: 8.5,
    expectedAppreciation: 8,
    inflationRate: 6,
    returnRate: 12,
    registrationCharges: 1,
    stampDuty: 5,
    otherCosts: 2,
    goalPossibility: '',
  });

  const [results, setResults] = useState<HouseResults | null>(null);

  // Number formatting helper
  const formatNumber = (value: number): string => {
    return value.toLocaleString('en-IN');
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value.replace(/,/g, '')) || 0;
    setFormData(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');
    if (!userIdFromStorage) {
      router.push('/login');
      return;
    }
    setUserId(userIdFromStorage);
    fetchHouseData(userIdFromStorage);
  }, [router]);

  const fetchHouseData = async (uid: string) => {
    try {
      const response = await fetch(`/api/house?userId=${uid}`);
      const result = await response.json();

      if (response.ok && result.data) {
        setFormData({
          currentAge: result.data.currentAge || 30,
          targetAge: result.data.targetAge || 35,
          propertyValue: result.data.propertyValue || 5000000,
          downPaymentPercentage: result.data.downPaymentPercentage || 20,
          currentSavings: result.data.currentSavings || 0,
          monthlyIncome: result.data.monthlyIncome || 0,
          wantLoan: result.data.wantLoan || false,
          loanTenure: result.data.loanTenure || 20,
          interestRate: result.data.interestRate || 8.5,
          expectedAppreciation: result.data.expectedAppreciation || 8,
          inflationRate: result.data.inflationRate || 6,
          returnRate: result.data.returnRate || 12,
          registrationCharges: result.data.registrationCharges || 1,
          stampDuty: result.data.stampDuty || 5,
          otherCosts: result.data.otherCosts || 2,
          goalPossibility: result.data.goalPossibility || '',
        });
      }
    } catch (error) {
      console.error('Error fetching house data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateHousePlan = () => {
    setErrorMessage('');

    // Validation
    if (formData.currentAge >= formData.targetAge) {
      setErrorMessage('Target age must be greater than current age');
      return;
    }

    if (formData.propertyValue <= 0) {
      setErrorMessage('Property value must be greater than 0');
      return;
    }

    if (formData.downPaymentPercentage < 0 || formData.downPaymentPercentage > 100) {
      setErrorMessage('Down payment percentage must be between 0 and 100');
      return;
    }

    // Calculate years to target
    const yearsToTarget = formData.targetAge - formData.currentAge;

    // Calculate future property value with appreciation
    const appreciation = formData.expectedAppreciation / 100;
    const futurePropertyValue = formData.propertyValue * Math.pow(1 + appreciation, yearsToTarget);

    // Calculate additional costs (registration, stamp duty, other costs)
    const registrationCost = (futurePropertyValue * formData.registrationCharges) / 100;
    const stampDutyCost = (futurePropertyValue * formData.stampDuty) / 100;
    const otherCostAmount = (futurePropertyValue * formData.otherCosts) / 100;
    const totalCosts = registrationCost + stampDutyCost + otherCostAmount;

    // Calculate down payment and loan amount based on whether user wants loan
    let downPaymentAmount = 0;
    let loanAmount = 0;
    let totalRequiredAtPurchase = 0;

    if (formData.wantLoan) {
      // With loan: Need down payment + costs
      downPaymentAmount = (futurePropertyValue * formData.downPaymentPercentage) / 100;
      loanAmount = futurePropertyValue - downPaymentAmount;
      totalRequiredAtPurchase = downPaymentAmount + totalCosts;
    } else {
      // Without loan: Need full property value + costs
      downPaymentAmount = futurePropertyValue;
      loanAmount = 0;
      totalRequiredAtPurchase = futurePropertyValue + totalCosts;
    }

    // Calculate how much current savings will grow
    const returnRate = formData.returnRate / 100;
    const monthlyReturn = returnRate / 12;
    const totalMonths = yearsToTarget * 12;
    const currentSavingsGrowth = formData.currentSavings * Math.pow(1 + monthlyReturn, totalMonths);

    // Calculate additional savings needed
    const additionalSavingsNeeded = Math.max(0, totalRequiredAtPurchase - currentSavingsGrowth);

    // Calculate monthly SIP required
    const monthlySIPRequired = additionalSavingsNeeded > 0
      ? additionalSavingsNeeded * monthlyReturn / (Math.pow(1 + monthlyReturn, totalMonths) - 1)
      : 0;

    // Calculate total investment and future value
    const totalInvestment = monthlySIPRequired * totalMonths;
    const futureValue = monthlySIPRequired * ((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn) + currentSavingsGrowth;

    // Calculate EMI for home loan (only if user wants loan)
    let emiAmount = 0;
    let totalLoanPayment = 0;
    let totalInterestPaid = 0;

    if (formData.wantLoan && loanAmount > 0) {
      const loanInterestRate = formData.interestRate / 100 / 12;
      const loanMonths = formData.loanTenure * 12;
      emiAmount = loanAmount * loanInterestRate * Math.pow(1 + loanInterestRate, loanMonths) / (Math.pow(1 + loanInterestRate, loanMonths) - 1);
      totalLoanPayment = emiAmount * loanMonths;
      totalInterestPaid = totalLoanPayment - loanAmount;
    }

    // Determine goal status
    let goalStatus = '';
    let goalColor = '';
    const achievabilityRatio = (futureValue / totalRequiredAtPurchase) * 100;

    if (achievabilityRatio >= 100) {
      goalStatus = 'House Goal Achievable';
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

    if (achievabilityRatio < 100) {
      const shortfall = totalRequiredAtPurchase - futureValue;
      recommendations.push({
        type: 'warning',
        text: `You have a shortfall of ₹${Math.round(shortfall / 100000) / 10} Lakhs. Consider increasing your savings or delaying the purchase.`
      });
    }

    if (formData.monthlyIncome > 0 && monthlySIPRequired > formData.monthlyIncome * 0.3) {
      recommendations.push({
        type: 'warning',
        text: `Required monthly investment is ${Math.round((monthlySIPRequired / formData.monthlyIncome) * 100)}% of your income. This may not be sustainable.`
      });
    }

    if (formData.wantLoan) {
      // Loan-specific recommendations
      if (formData.monthlyIncome > 0 && emiAmount > formData.monthlyIncome * 0.4) {
        recommendations.push({
          type: 'warning',
          text: `EMI will be ${Math.round((emiAmount / formData.monthlyIncome) * 100)}% of your income. Banks typically prefer EMI to be less than 40% of income.`
        });
      }

      if (formData.downPaymentPercentage < 20) {
        recommendations.push({
          type: 'info',
          text: 'A down payment of at least 20% is recommended to reduce loan burden and get better interest rates.'
        });
      }

      if (formData.loanTenure > 20) {
        recommendations.push({
          type: 'info',
          text: 'Consider reducing loan tenure to save on interest payments, if your EMI budget allows.'
        });
      }

      if (totalInterestPaid > loanAmount * 0.5) {
        recommendations.push({
          type: 'info',
          text: `You'll pay ₹${(totalInterestPaid / 10000000).toFixed(2)} Cr in interest. Consider a shorter tenure or higher down payment to reduce interest costs.`
        });
      }
    } else {
      // No loan - savings-based recommendations
      recommendations.push({
        type: 'success',
        text: 'Great choice! Buying without a loan means no interest payments and full ownership from day one.'
      });

      if (yearsToTarget < 5 && additionalSavingsNeeded > currentSavingsGrowth * 2) {
        recommendations.push({
          type: 'warning',
          text: 'Short timeline with large savings requirement. Consider extending your target age or taking a smaller loan to reduce monthly burden.'
        });
      }

      if (monthlySIPRequired > 0 && formData.monthlyIncome > 0) {
        const savingsPercentage = (monthlySIPRequired / formData.monthlyIncome) * 100;
        if (savingsPercentage > 50) {
          recommendations.push({
            type: 'info',
            text: `You need to save ${savingsPercentage.toFixed(0)}% of your income. Consider a home loan for ${formData.downPaymentPercentage}% to reduce this burden.`
          });
        }
      }
    }

    if (achievabilityRatio >= 100) {
      recommendations.push({
        type: 'success',
        text: 'Great! Your house purchase plan is on track. Continue your disciplined savings approach.'
      });
    }

    // Update formData with goalPossibility
    setFormData(prev => ({
      ...prev,
      goalPossibility: goalStatus
    }));

    setResults({
      yearsToTarget,
      futurePropertyValue: Math.round(futurePropertyValue),
      downPaymentAmount: Math.round(downPaymentAmount),
      loanAmount: Math.round(loanAmount),
      totalCosts: Math.round(totalCosts),
      totalRequiredAtPurchase: Math.round(totalRequiredAtPurchase),
      currentSavingsGrowth: Math.round(currentSavingsGrowth),
      additionalSavingsNeeded: Math.round(additionalSavingsNeeded),
      monthlySIPRequired: Math.round(monthlySIPRequired),
      totalInvestment: Math.round(totalInvestment),
      futureValue: Math.round(futureValue),
      emiAmount: Math.round(emiAmount),
      totalLoanPayment: Math.round(totalLoanPayment),
      totalInterestPaid: Math.round(totalInterestPaid),
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
      const response = await fetch('/api/house', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('House planning data saved successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage(result.error || 'Failed to save house planning data');
      }
    } catch (error) {
      console.error('Error saving house data:', error);
      setErrorMessage('An error occurred while saving data');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!userId) {
      setErrorMessage('User not authenticated');
      return;
    }

    if (!confirm('Are you sure you want to delete your house planning data?')) {
      return;
    }

    try {
      const response = await fetch(`/api/house?userId=${userId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('House planning data deleted successfully!');
        setFormData({
          currentAge: 30,
          targetAge: 35,
          propertyValue: 5000000,
          downPaymentPercentage: 20,
          currentSavings: 0,
          monthlyIncome: 0,
          wantLoan: false,
          loanTenure: 20,
          interestRate: 8.5,
          expectedAppreciation: 8,
          inflationRate: 6,
          returnRate: 12,
          registrationCharges: 1,
          stampDuty: 5,
          otherCosts: 2,
          goalPossibility: '',
        });
        setResults(null);
        setShowResults(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage(result.error || 'Failed to delete house planning data');
      }
    } catch (error) {
      console.error('Error deleting house data:', error);
      setErrorMessage('An error occurred while deleting data');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>My Finance - House Planning - IncomeGrow</title>
        <meta name="description" content="Plan your dream house purchase with detailed calculations" />
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
                <span className="text-white font-semibold">House Planning</span>
              </div>

              {/* Title */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <span className="text-3xl text-white">🏠</span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">House Planning</div>
                  <div className="text-sm text-white/90">Plan your dream house purchase with comprehensive financial planning.</div>
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
                  <span className="text-sm text-gray-400 font-normal">Your age and income details</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Current Age <span className="text-red-500">*</span> <InfoIcon tooltip="Your current age" /></label>
                    <input
                      type="number"
                      className={inputClass}
                      value={formData.currentAge}
                      onChange={(e) => handleInputChange('currentAge', e.target.value)}
                      min="18"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Target Age for Purchase <span className="text-red-500">*</span> <InfoIcon tooltip="Age at which you plan to purchase the house" /></label>
                    <input
                      type="number"
                      className={inputClass}
                      value={formData.targetAge}
                      onChange={(e) => handleInputChange('targetAge', e.target.value)}
                      min="18"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Monthly Income <InfoIcon tooltip="Your current monthly income (used for EMI affordability check)" /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500">₹</span>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="0"
                        value={formatNumber(formData.monthlyIncome)}
                        onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Details Card */}
              <div className="bg-gradient-to-br from-purple-50 to-orange-50 rounded-2xl border-2 border-purple-200 mb-6 p-6 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-base font-semibold text-purple-700 mb-2 flex items-center gap-2">
                  <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Property Details
                  <span className="text-sm text-gray-400 font-normal">Details about the property you want to buy</span>
                </div>

                {/* Loan Toggle */}
                <div className="mb-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-semibold text-gray-700">Do you want to take a home loan?</label>
                      <InfoIcon tooltip="Choose 'Yes' if you plan to take a home loan. Choose 'No' if you want to save and buy the property with full payment." />
                    </div>
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, wantLoan: !prev.wantLoan }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.wantLoan ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.wantLoan ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-gray-600">
                    {formData.wantLoan ? (
                      <span className="text-purple-700 font-medium">✓ You'll need to save for down payment + costs, and pay EMI for the loan</span>
                    ) : (
                      <span className="text-green-700 font-medium">✓ You'll save the full property value + costs. No EMI, no interest!</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Current Property Value <span className="text-red-500">*</span> <InfoIcon tooltip="Current market value of the property you want to buy" /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500">₹</span>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="e.g., 5000000 (50 Lakhs)"
                        value={formatNumber(formData.propertyValue)}
                        onChange={(e) => handleInputChange('propertyValue', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Expected Appreciation (% per year) <InfoIcon tooltip="Expected annual appreciation rate of property value (typically 5-10%)" /></label>
                    <input
                      type="number"
                      className={inputClass}
                      value={formData.expectedAppreciation}
                      onChange={(e) => handleInputChange('expectedAppreciation', e.target.value)}
                      min="0"
                      step="0.1"
                    />
                  </div>
                  {formData.wantLoan && (
                    <div>
                      <label className={labelClass}>Down Payment (%) <InfoIcon tooltip="Percentage of property value you'll pay upfront (typically 20%)" /></label>
                      <input
                        type="number"
                        className={inputClass}
                        value={formData.downPaymentPercentage}
                        onChange={(e) => handleInputChange('downPaymentPercentage', e.target.value)}
                        min="0"
                        max="100"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Costs Card */}
              <div className="bg-gradient-to-br from-purple-50 to-orange-50 rounded-2xl border-2 border-purple-200 mb-6 p-6 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-base font-semibold text-purple-700 mb-2 flex items-center gap-2">
                  <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Additional Costs
                  <span className="text-sm text-gray-400 font-normal">Registration, stamp duty and other charges</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Registration Charges (%) <InfoIcon tooltip="Property registration charges (typically 1% of property value)" /></label>
                    <input
                      type="number"
                      className={inputClass}
                      value={formData.registrationCharges}
                      onChange={(e) => handleInputChange('registrationCharges', e.target.value)}
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Stamp Duty (%) <InfoIcon tooltip="Stamp duty charges (varies by state, typically 5-7%)" /></label>
                    <input
                      type="number"
                      className={inputClass}
                      value={formData.stampDuty}
                      onChange={(e) => handleInputChange('stampDuty', e.target.value)}
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Other Costs (%) <InfoIcon tooltip="Other costs like brokerage, legal fees, etc. (typically 2%)" /></label>
                    <input
                      type="number"
                      className={inputClass}
                      value={formData.otherCosts}
                      onChange={(e) => handleInputChange('otherCosts', e.target.value)}
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>

              {/* Savings & Investment Card */}
              <div className="bg-gradient-to-br from-purple-50 to-orange-50 rounded-2xl border-2 border-purple-200 mb-6 p-6 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-base font-semibold text-purple-700 mb-2 flex items-center gap-2">
                  <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Savings & Investment
                  <span className="text-sm text-gray-400 font-normal">Your current savings and expected returns</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Current Savings <InfoIcon tooltip="Money you have already saved for house purchase" /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500">₹</span>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="0"
                        value={formatNumber(formData.currentSavings)}
                        onChange={(e) => handleInputChange('currentSavings', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Expected Return Rate (% per year) <InfoIcon tooltip="Expected annual return on your investments (typically 10-12%)" /></label>
                    <input
                      type="number"
                      className={inputClass}
                      value={formData.returnRate}
                      onChange={(e) => handleInputChange('returnRate', e.target.value)}
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Inflation Rate (% per year) <InfoIcon tooltip="Expected annual inflation rate (typically 5-6%)" /></label>
                    <input
                      type="number"
                      className={inputClass}
                      value={formData.inflationRate}
                      onChange={(e) => handleInputChange('inflationRate', e.target.value)}
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>

              {/* Home Loan Details Card - Only show if user wants loan */}
              {formData.wantLoan && (
                <div className="bg-gradient-to-br from-purple-50 to-orange-50 rounded-2xl border-2 border-purple-200 mb-6 p-6 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-base font-semibold text-purple-700 mb-2 flex items-center gap-2">
                    <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Home Loan Details
                    <span className="text-sm text-gray-400 font-normal">Interest rate and loan tenure</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Loan Interest Rate (% per year) <InfoIcon tooltip="Expected home loan interest rate (currently around 8-9%)" /></label>
                      <input
                        type="number"
                        className={inputClass}
                        value={formData.interestRate}
                        onChange={(e) => handleInputChange('interestRate', e.target.value)}
                        min="0"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Loan Tenure (years) <InfoIcon tooltip="Duration of home loan (typically 15-20 years)" /></label>
                      <input
                        type="number"
                        className={inputClass}
                        value={formData.loanTenure}
                        onChange={(e) => handleInputChange('loanTenure', e.target.value)}
                        min="1"
                        max="30"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={calculateHousePlan}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Calculate House Plan
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 shadow-md"
                >
                  {isSaving ? 'Saving...' : 'Save Plan'}
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Results */}
          <div className="w-full lg:w-1/2 bg-gray-50 lg:overflow-y-auto p-4 md:p-6">
            {showResults && results ? (
              <div className="space-y-4">
                {/* Goal Status */}
                <div className="bg-white rounded-xl border p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="text-purple-500 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Goal Status
                  </h2>
                  <div className={`text-2xl font-bold ${results.goalColor} text-center py-4`}>
                    {results.goalStatus}
                  </div>
                </div>

                {/* Property Details */}
                <div className="bg-white rounded-xl border p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="text-purple-500 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Property Details
                  </h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Years to Target:</span>
                      <span className="font-semibold text-gray-900">{results.yearsToTarget} years</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Current Property Value:</span>
                      <span className="font-semibold text-gray-900">₹{(formData.propertyValue / 100000).toFixed(2)} Lakhs</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Future Property Value:</span>
                      <span className="font-semibold text-purple-700">₹{(results.futurePropertyValue / 10000000).toFixed(2)} Cr</span>
                    </div>
                    {formData.wantLoan ? (
                      <>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Down Payment Required:</span>
                          <span className="font-semibold text-gray-900">₹{(results.downPaymentAmount / 10000000).toFixed(2)} Cr</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Loan Amount:</span>
                          <span className="font-semibold text-gray-900">₹{(results.loanAmount / 10000000).toFixed(2)} Cr</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Full Payment (No Loan):</span>
                        <span className="font-semibold text-green-700">₹{(results.futurePropertyValue / 10000000).toFixed(2)} Cr</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Additional Costs:</span>
                      <span className="font-semibold text-gray-900">₹{(results.totalCosts / 100000).toFixed(2)} Lakhs</span>
                    </div>
                    <div className="flex justify-between pt-3 mt-2 border-t-2 border-purple-200">
                      <span className="text-gray-900 font-bold">Total Required at Purchase:</span>
                      <span className="font-bold text-purple-700 text-lg">₹{(results.totalRequiredAtPurchase / 10000000).toFixed(2)} Cr</span>
                    </div>
                  </div>
                </div>

                {/* Savings Plan */}
                <div className="bg-white rounded-xl border p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="text-purple-500 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Savings Plan
                  </h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Current Savings Growth:</span>
                      <span className="font-semibold text-gray-900">₹{(results.currentSavingsGrowth / 100000).toFixed(2)} Lakhs</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Additional Savings Needed:</span>
                      <span className="font-semibold text-gray-900">₹{(results.additionalSavingsNeeded / 10000000).toFixed(2)} Cr</span>
                    </div>
                    <div className="flex justify-between pt-3 mt-2 border-t-2 border-purple-200">
                      <span className="text-gray-900 font-bold">Monthly SIP Required:</span>
                      <span className="font-bold text-purple-700 text-lg">₹{results.monthlySIPRequired.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100 mt-3">
                      <span className="text-gray-600">Total Investment:</span>
                      <span className="font-semibold text-gray-900">₹{(results.totalInvestment / 10000000).toFixed(2)} Cr</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Future Value:</span>
                      <span className="font-semibold text-gray-900">₹{(results.futureValue / 10000000).toFixed(2)} Cr</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Net Gains:</span>
                      <span className="font-semibold text-green-600">₹{((results.futureValue - results.totalInvestment - formData.currentSavings) / 10000000).toFixed(2)} Cr</span>
                    </div>
                  </div>
                </div>

                {/* Home Loan EMI - Only show if user wants loan */}
                {formData.wantLoan && results.loanAmount > 0 && (
                  <div className="bg-white rounded-xl border p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <svg className="text-purple-500 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Home Loan EMI
                    </h2>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Loan Amount:</span>
                        <span className="font-semibold text-gray-900">₹{(results.loanAmount / 10000000).toFixed(2)} Cr</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Interest Rate:</span>
                        <span className="font-semibold text-gray-900">{formData.interestRate}% per year</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Loan Tenure:</span>
                        <span className="font-semibold text-gray-900">{formData.loanTenure} years</span>
                      </div>
                      <div className="flex justify-between pt-3 mt-2 border-t-2 border-red-200">
                        <span className="text-gray-900 font-bold">Monthly EMI:</span>
                        <span className="font-bold text-red-600 text-lg">₹{results.emiAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100 mt-3">
                        <span className="text-gray-600">Total Payment:</span>
                        <span className="font-semibold text-gray-900">₹{(results.totalLoanPayment / 10000000).toFixed(2)} Cr</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Total Interest:</span>
                        <span className="font-semibold text-orange-600">₹{(results.totalInterestPaid / 10000000).toFixed(2)} Cr</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* No Loan Summary - Show if user doesn't want loan */}
                {!formData.wantLoan && (
                  <div className="bg-white rounded-xl border p-6 shadow-sm border-green-200">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <svg className="text-green-500 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      No Loan - Full Ownership
                    </h2>
                    <div className="space-y-3 text-sm">
                      <div className="bg-green-50 p-4 rounded-lg mb-3">
                        <p className="text-green-800 font-medium">Great choice! By saving the full amount, you'll:</p>
                        <ul className="mt-2 space-y-1 text-green-700 text-xs">
                          <li>✓ Own the property outright from day one</li>
                          <li>✓ Save ₹{((results.futurePropertyValue * 0.8 * formData.interestRate / 100 * formData.loanTenure) / 10000000).toFixed(2)} Cr+ in interest payments</li>
                          <li>✓ Have no monthly EMI burden</li>
                          <li>✓ Build wealth faster through disciplined savings</li>
                        </ul>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Property Value at Purchase:</span>
                        <span className="font-semibold text-gray-900">₹{(results.futurePropertyValue / 10000000).toFixed(2)} Cr</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Additional Costs:</span>
                        <span className="font-semibold text-gray-900">₹{(results.totalCosts / 100000).toFixed(2)} Lakhs</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t-2 border-green-200">
                        <span className="text-gray-900 font-bold">Total Amount to Save:</span>
                        <span className="font-bold text-green-700 text-lg">₹{(results.totalRequiredAtPurchase / 10000000).toFixed(2)} Cr</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {results.recommendations.length > 0 && (
                  <div className="bg-white rounded-xl border p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <svg className="text-purple-500 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Recommendations
                    </h2>
                    <div className="space-y-3">
                      {results.recommendations.map((rec, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg text-sm ${
                            rec.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' :
                            rec.type === 'warning' ? 'bg-yellow-50 border border-yellow-200 text-yellow-800' :
                            'bg-blue-50 border border-blue-200 text-blue-800'
                          }`}
                        >
                          {rec.text}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl border p-12 shadow-sm">
                <div className="text-center text-gray-500">
                  <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <p className="text-lg font-medium mb-2">Enter Your Details</p>
                  <p className="text-sm">Fill in the form and click "Calculate House Plan" to see detailed analysis</p>
                </div>
              </div>
            )}
          </div>
      </div>
    </>
  );
};

// Use persistent layout for goal pages
HousePage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout currentPage="my-goal">{page}</DashboardLayout>;
};

export default HousePage;
