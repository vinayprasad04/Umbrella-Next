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

interface CarData {
  currentAge: number;
  targetAge: number;
  carValue: number;
  downPaymentPercentage: number;
  currentSavings: number;
  monthlyIncome: number;
  wantLoan: boolean;
  loanTenure: number;
  interestRate: number;
  expectedDepreciation: number;
  inflationRate: number;
  returnRate: number;
  insuranceCost: number;
  registrationCost: number;
  otherCosts: number;
  goalPossibility: string;
}

interface CarResults {
  yearsToTarget: number;
  futureCarValue: number;
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

const CarPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showResults, setShowResults] = useState(false);

  const [formData, setFormData] = useState<CarData>({
    currentAge: 30,
    targetAge: 32,
    carValue: 1000000,
    downPaymentPercentage: 20,
    currentSavings: 0,
    monthlyIncome: 0,
    wantLoan: false,
    loanTenure: 5,
    interestRate: 9.5,
    expectedDepreciation: 15,
    inflationRate: 6,
    returnRate: 12,
    insuranceCost: 2,
    registrationCost: 8,
    otherCosts: 2,
    goalPossibility: '',
  });

  const [results, setResults] = useState<CarResults | null>(null);

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
    fetchCarData(userIdFromStorage);
  }, [router]);

  const fetchCarData = async (uid: string) => {
    try {
      const response = await fetch(`/api/car?userId=${uid}`);
      const result = await response.json();

      if (response.ok && result.data) {
        setFormData({
          currentAge: result.data.currentAge || 30,
          targetAge: result.data.targetAge || 32,
          carValue: result.data.carValue || 1000000,
          downPaymentPercentage: result.data.downPaymentPercentage || 20,
          currentSavings: result.data.currentSavings || 0,
          monthlyIncome: result.data.monthlyIncome || 0,
          wantLoan: result.data.wantLoan || false,
          loanTenure: result.data.loanTenure || 5,
          interestRate: result.data.interestRate || 9.5,
          expectedDepreciation: result.data.expectedDepreciation || 15,
          inflationRate: result.data.inflationRate || 6,
          returnRate: result.data.returnRate || 12,
          insuranceCost: result.data.insuranceCost || 2,
          registrationCost: result.data.registrationCost || 8,
          otherCosts: result.data.otherCosts || 2,
          goalPossibility: result.data.goalPossibility || '',
        });
      }
    } catch (error) {
      console.error('Error fetching car data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateCarPlan = () => {
    setErrorMessage('');

    if (formData.currentAge >= formData.targetAge) {
      setErrorMessage('Target age must be greater than current age');
      return;
    }

    if (formData.carValue <= 0) {
      setErrorMessage('Car value must be greater than 0');
      return;
    }

    const yearsToTarget = formData.targetAge - formData.currentAge;
    const inflation = formData.inflationRate / 100;
    const futureCarValue = formData.carValue * Math.pow(1 + inflation, yearsToTarget);

    const insuranceCostAmount = (futureCarValue * formData.insuranceCost) / 100;
    const registrationCostAmount = (futureCarValue * formData.registrationCost) / 100;
    const otherCostAmount = (futureCarValue * formData.otherCosts) / 100;
    const totalCosts = insuranceCostAmount + registrationCostAmount + otherCostAmount;

    let downPaymentAmount = 0;
    let loanAmount = 0;
    let totalRequiredAtPurchase = 0;

    if (formData.wantLoan) {
      downPaymentAmount = (futureCarValue * formData.downPaymentPercentage) / 100;
      loanAmount = futureCarValue - downPaymentAmount;
      totalRequiredAtPurchase = downPaymentAmount + totalCosts;
    } else {
      downPaymentAmount = futureCarValue;
      loanAmount = 0;
      totalRequiredAtPurchase = futureCarValue + totalCosts;
    }

    const returnRate = formData.returnRate / 100;
    const monthlyReturn = returnRate / 12;
    const totalMonths = yearsToTarget * 12;
    const currentSavingsGrowth = formData.currentSavings * Math.pow(1 + monthlyReturn, totalMonths);

    const additionalSavingsNeeded = Math.max(0, totalRequiredAtPurchase - currentSavingsGrowth);

    const monthlySIPRequired = additionalSavingsNeeded > 0
      ? additionalSavingsNeeded * monthlyReturn / (Math.pow(1 + monthlyReturn, totalMonths) - 1)
      : 0;

    const totalInvestment = monthlySIPRequired * totalMonths;
    const futureValue = monthlySIPRequired * ((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn) + currentSavingsGrowth;

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

    let goalStatus = '';
    let goalColor = '';
    const achievabilityRatio = (futureValue / totalRequiredAtPurchase) * 100;

    if (achievabilityRatio >= 100) {
      goalStatus = 'Car Goal Achievable';
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
      if (formData.monthlyIncome > 0 && emiAmount > formData.monthlyIncome * 0.5) {
        recommendations.push({
          type: 'warning',
          text: `EMI will be ${Math.round((emiAmount / formData.monthlyIncome) * 100)}% of your income. This is very high for a depreciating asset.`
        });
      }

      if (formData.downPaymentPercentage < 20) {
        recommendations.push({
          type: 'info',
          text: 'A down payment of at least 20% is recommended to reduce loan burden and get better interest rates.'
        });
      }

      if (totalInterestPaid > loanAmount * 0.3) {
        recommendations.push({
          type: 'info',
          text: `You'll pay ₹${(totalInterestPaid / 100000).toFixed(2)} Lakhs in interest. Consider a shorter tenure or higher down payment.`
        });
      }
    } else {
      recommendations.push({
        type: 'success',
        text: 'Great choice! Buying without a loan means no interest payments on a depreciating asset.'
      });

      if (yearsToTarget < 2 && additionalSavingsNeeded > currentSavingsGrowth * 2) {
        recommendations.push({
          type: 'warning',
          text: 'Short timeline with large savings requirement. Consider extending your target age or taking a loan.'
        });
      }
    }

    recommendations.push({
      type: 'info',
      text: `Note: Cars depreciate ~${formData.expectedDepreciation}% annually. The car's value after ${yearsToTarget} years will be much lower than purchase price.`
    });

    if (achievabilityRatio >= 100) {
      recommendations.push({
        type: 'success',
        text: 'Great! Your car purchase plan is on track. Continue your disciplined savings approach.'
      });
    }

    setFormData(prev => ({
      ...prev,
      goalPossibility: goalStatus
    }));

    setResults({
      yearsToTarget,
      futureCarValue: Math.round(futureCarValue),
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
      const response = await fetch('/api/car', {
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
        setSuccessMessage('Car planning data saved successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage(result.error || 'Failed to save car planning data');
      }
    } catch (error) {
      console.error('Error saving car data:', error);
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

    if (!confirm('Are you sure you want to delete your car planning data?')) {
      return;
    }

    try {
      const response = await fetch(`/api/car?userId=${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccessMessage('Car planning data deleted successfully!');
        setFormData({
          currentAge: 30,
          targetAge: 32,
          carValue: 1000000,
          downPaymentPercentage: 20,
          currentSavings: 0,
          monthlyIncome: 0,
          wantLoan: false,
          loanTenure: 5,
          interestRate: 9.5,
          expectedDepreciation: 15,
          inflationRate: 6,
          returnRate: 12,
          insuranceCost: 2,
          registrationCost: 8,
          otherCosts: 2,
          goalPossibility: '',
        });
        setResults(null);
        setShowResults(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage('Failed to delete car planning data');
      }
    } catch (error) {
      console.error('Error deleting car data:', error);
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
        <title>My Finance - Dream Car - IncomeGrow</title>
        <meta name="description" content="Plan your dream car purchase with detailed calculations" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      {/* Content Area - Only this part will reload */}
      <div className="flex-1 flex overflow-hidden">
          <div className="w-1/2 bg-white border-r border-gray-200 overflow-y-auto flex flex-col">
            <div className="bg-white border-b border-gray-200 py-6 px-6">
              <div className="text-xs text-gray-400 mb-4 flex items-center gap-1">
                <Link href="/dashboard" className="hover:text-gray-600 transition-colors">Dashboard</Link>
                <svg className="mx-1 text-gray-300 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <Link href="/dashboard/my-goal" className="hover:text-gray-600 transition-colors">My Goal</Link>
                <svg className="mx-1 text-gray-300 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-[#FF6B2C] font-semibold">Dream Car</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl">
                  🚗
                </div>
                <div>
                  <div className="text-2xl font-bold text-black mb-1">Dream Car Planning</div>
                  <div className="text-sm text-gray-500">Plan your dream car purchase with comprehensive financial planning.</div>
                </div>
              </div>
            </div>

            <div className="p-6">
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

              {/* Basic Information */}
              <div className="bg-white rounded-xl border mb-4 p-4 flex flex-col gap-2 shadow-sm">
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
                    <label className={labelClass}>Target Age for Purchase <span className="text-red-500">*</span> <InfoIcon tooltip="Age at which you plan to purchase the car" /></label>
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

              {/* Car Details */}
              <div className="bg-white rounded-xl border mb-4 p-4 flex flex-col gap-2 shadow-sm">
                <div className="text-base font-semibold text-purple-700 mb-2 flex items-center gap-2">
                  <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Car Details
                  <span className="text-sm text-gray-400 font-normal">Details about the car you want to buy</span>
                </div>

                <div className="mb-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-semibold text-gray-700">Do you want to take a car loan?</label>
                      <InfoIcon tooltip="Choose 'Yes' if you plan to take a car loan. Choose 'No' if you want to save and buy with full payment." />
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
                      <span className="text-green-700 font-medium">✓ You'll save the full car value + costs. No EMI, no interest!</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Current Car Value <span className="text-red-500">*</span> <InfoIcon tooltip="Current on-road price of the car you want to buy" /></label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-gray-500">₹</span>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="e.g., 1000000 (10 Lakhs)"
                        value={formatNumber(formData.carValue)}
                        onChange={(e) => handleInputChange('carValue', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Inflation Rate (% per year) <InfoIcon tooltip="Expected car price inflation rate (typically 5-7%)" /></label>
                    <input
                      type="number"
                      className={inputClass}
                      value={formData.inflationRate}
                      onChange={(e) => handleInputChange('inflationRate', e.target.value)}
                      min="0"
                      step="0.1"
                    />
                  </div>
                  {formData.wantLoan && (
                    <div>
                      <label className={labelClass}>Down Payment (%) <InfoIcon tooltip="Percentage of car value you'll pay upfront (typically 20-30%)" /></label>
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

              {/* Additional Costs */}
              <div className="bg-white rounded-xl border mb-4 p-4 flex flex-col gap-2 shadow-sm">
                <div className="text-base font-semibold text-purple-700 mb-2 flex items-center gap-2">
                  <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Additional Costs
                  <span className="text-sm text-gray-400 font-normal">Insurance, registration and other charges</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Insurance Cost (%) <InfoIcon tooltip="Insurance cost as % of car value (typically 2-3%)" /></label>
                    <input
                      type="number"
                      className={inputClass}
                      value={formData.insuranceCost}
                      onChange={(e) => handleInputChange('insuranceCost', e.target.value)}
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Registration Cost (%) <InfoIcon tooltip="RTO registration charges (typically 8-10%)" /></label>
                    <input
                      type="number"
                      className={inputClass}
                      value={formData.registrationCost}
                      onChange={(e) => handleInputChange('registrationCost', e.target.value)}
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Other Costs (%) <InfoIcon tooltip="Other costs like accessories, extended warranty, etc. (typically 2%)" /></label>
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

              {/* Savings & Investment */}
              <div className="bg-white rounded-xl border mb-4 p-4 flex flex-col gap-2 shadow-sm">
                <div className="text-base font-semibold text-purple-700 mb-2 flex items-center gap-2">
                  <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Savings & Investment
                  <span className="text-sm text-gray-400 font-normal">Your current savings and expected returns</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Current Savings <InfoIcon tooltip="Money you have already saved for car purchase" /></label>
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
                </div>
              </div>

              {/* Car Loan Details */}
              {formData.wantLoan && (
                <div className="bg-white rounded-xl border mb-4 p-4 flex flex-col gap-2 shadow-sm">
                  <div className="text-base font-semibold text-purple-700 mb-2 flex items-center gap-2">
                    <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Car Loan Details
                    <span className="text-sm text-gray-400 font-normal">Interest rate and loan tenure</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Loan Interest Rate (% per year) <InfoIcon tooltip="Expected car loan interest rate (currently around 9-11%)" /></label>
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
                      <label className={labelClass}>Loan Tenure (years) <InfoIcon tooltip="Duration of car loan (typically 3-5 years, max 7 years)" /></label>
                      <input
                        type="number"
                        className={inputClass}
                        value={formData.loanTenure}
                        onChange={(e) => handleInputChange('loanTenure', e.target.value)}
                        min="1"
                        max="7"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={calculateCarPlan}
                  className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-md"
                >
                  Calculate Car Plan
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
          <div className="w-1/2 bg-gray-50 overflow-y-auto p-6">
            {showResults && results ? (
              <div className="space-y-4">
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

                <div className="bg-white rounded-xl border p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="text-purple-500 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Car Details
                  </h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Years to Target:</span>
                      <span className="font-semibold text-gray-900">{results.yearsToTarget} years</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Current Car Value:</span>
                      <span className="font-semibold text-gray-900">₹{(formData.carValue / 100000).toFixed(2)} Lakhs</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Future Car Value:</span>
                      <span className="font-semibold text-purple-700">₹{(results.futureCarValue / 100000).toFixed(2)} Lakhs</span>
                    </div>
                    {formData.wantLoan ? (
                      <>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Down Payment Required:</span>
                          <span className="font-semibold text-gray-900">₹{(results.downPaymentAmount / 100000).toFixed(2)} Lakhs</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Loan Amount:</span>
                          <span className="font-semibold text-gray-900">₹{(results.loanAmount / 100000).toFixed(2)} Lakhs</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Full Payment (No Loan):</span>
                        <span className="font-semibold text-green-700">₹{(results.futureCarValue / 100000).toFixed(2)} Lakhs</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Additional Costs:</span>
                      <span className="font-semibold text-gray-900">₹{(results.totalCosts / 100000).toFixed(2)} Lakhs</span>
                    </div>
                    <div className="flex justify-between pt-3 mt-2 border-t-2 border-purple-200">
                      <span className="text-gray-900 font-bold">Total Required at Purchase:</span>
                      <span className="font-bold text-purple-700 text-lg">₹{(results.totalRequiredAtPurchase / 100000).toFixed(2)} Lakhs</span>
                    </div>
                  </div>
                </div>

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
                      <span className="font-semibold text-gray-900">₹{(results.additionalSavingsNeeded / 100000).toFixed(2)} Lakhs</span>
                    </div>
                    <div className="flex justify-between pt-3 mt-2 border-t-2 border-purple-200">
                      <span className="text-gray-900 font-bold">Monthly SIP Required:</span>
                      <span className="font-bold text-purple-700 text-lg">₹{results.monthlySIPRequired.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100 mt-3">
                      <span className="text-gray-600">Total Investment:</span>
                      <span className="font-semibold text-gray-900">₹{(results.totalInvestment / 100000).toFixed(2)} Lakhs</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Future Value:</span>
                      <span className="font-semibold text-gray-900">₹{(results.futureValue / 100000).toFixed(2)} Lakhs</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Net Gains:</span>
                      <span className="font-semibold text-green-600">₹{((results.futureValue - results.totalInvestment - formData.currentSavings) / 100000).toFixed(2)} Lakhs</span>
                    </div>
                  </div>
                </div>

                {formData.wantLoan && results.loanAmount > 0 && (
                  <div className="bg-white rounded-xl border p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <svg className="text-purple-500 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Car Loan EMI
                    </h2>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Loan Amount:</span>
                        <span className="font-semibold text-gray-900">₹{(results.loanAmount / 100000).toFixed(2)} Lakhs</span>
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
                        <span className="font-semibold text-gray-900">₹{(results.totalLoanPayment / 100000).toFixed(2)} Lakhs</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Total Interest:</span>
                        <span className="font-semibold text-orange-600">₹{(results.totalInterestPaid / 100000).toFixed(2)} Lakhs</span>
                      </div>
                    </div>
                  </div>
                )}

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
                          <li>✓ Own the car outright from day one</li>
                          <li>✓ Save ₹{((results.futureCarValue * 0.8 * formData.interestRate / 100 * formData.loanTenure) / 100000).toFixed(2)} Lakhs+ in interest payments</li>
                          <li>✓ Have no monthly EMI burden</li>
                          <li>✓ No stress of loan payments on a depreciating asset</li>
                        </ul>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Car Value at Purchase:</span>
                        <span className="font-semibold text-gray-900">₹{(results.futureCarValue / 100000).toFixed(2)} Lakhs</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Additional Costs:</span>
                        <span className="font-semibold text-gray-900">₹{(results.totalCosts / 100000).toFixed(2)} Lakhs</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t-2 border-green-200">
                        <span className="text-gray-900 font-bold">Total Amount to Save:</span>
                        <span className="font-bold text-green-700 text-lg">₹{(results.totalRequiredAtPurchase / 100000).toFixed(2)} Lakhs</span>
                      </div>
                    </div>
                  </div>
                )}

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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-lg font-medium mb-2">Enter Your Details</p>
                  <p className="text-sm">Fill in the form and click "Calculate Car Plan" to see detailed analysis</p>
                </div>
              </div>
            )}
          </div>
      </div>
    </>
  );
};

// Use persistent layout for goal pages
CarPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout currentPage="my-goal">{page}</DashboardLayout>;
};

export default CarPage;
