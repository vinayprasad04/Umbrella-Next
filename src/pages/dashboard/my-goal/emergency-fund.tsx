import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/DashboardLayout';
import Tooltip from '@/components/Tooltip';
import type { NextPageWithLayout } from '../../_app';

const inputClass = "border border-gray-300 rounded-xl px-4 py-3 w-full text-base focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all";
const labelClass = "text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1";

const InfoIcon: React.FC<{ tooltip: string }> = ({ tooltip }) => (
  <Tooltip content={tooltip}>
    <svg className="ml-1 text-gray-400 w-4 h-4 hover:text-purple-600 transition-colors cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </Tooltip>
);

interface EmergencyFundData {
  monthlyExpenses: number;
  numberOfMonths: number;
  currentSavings: number;
  monthlyContribution: number;
}

const EmergencyFund: NextPageWithLayout = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [userId, setUserId] = useState<string>('');

  const [formData, setFormData] = useState<EmergencyFundData>({
    monthlyExpenses: 50000,
    numberOfMonths: 6,
    currentSavings: 0,
    monthlyContribution: 5000,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
      const userIdFromStorage = localStorage.getItem('userId') || '';

      if (!isLoggedIn) {
        router.push('/login');
        return;
      }

      setUserId(userIdFromStorage);

      // Load saved data from localStorage
      const savedData = localStorage.getItem(`emergencyFund_${userIdFromStorage}`);
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setFormData(parsedData);
        } catch (error) {
          console.error('Error loading saved data:', error);
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // For number inputs, remove commas before parsing
    if (name !== 'numberOfMonths') {
      const cleanValue = value.replace(/,/g, '');
      const numValue = cleanValue === '' ? 0 : parseFloat(cleanValue);
      setFormData(prev => ({
        ...prev,
        [name]: isNaN(numValue) ? 0 : numValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    }
  };

  const formatNumber = (num: number): string => {
    if (num === 0) return '';
    return num.toLocaleString('en-IN');
  };

  const handleSave = () => {
    setIsSaving(true);
    setSuccessMessage('');

    try {
      // Save to localStorage
      localStorage.setItem(`emergencyFund_${userId}`, JSON.stringify(formData));
      setSuccessMessage('Emergency fund data saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Calculate required emergency fund
  const requiredFund = formData.monthlyExpenses * formData.numberOfMonths;
  const shortfall = Math.max(0, requiredFund - formData.currentSavings);
  const monthsToReach = formData.monthlyContribution > 0
    ? Math.ceil(shortfall / formData.monthlyContribution)
    : 0;
  const fundingPercentage = requiredFund > 0
    ? Math.min((formData.currentSavings / requiredFund) * 100, 100)
    : 0;

  if (isLoading) {
    return (
      <div className="flex-1 w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-orange-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Emergency Fund Calculator - IncomeGrow</title>
        <meta name="description" content="Calculate your emergency fund requirements" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <div className="flex-1 px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8 bg-gradient-to-br from-purple-50 via-white to-orange-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-500 rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-6 lg:p-8 mb-4 md:mb-6 lg:mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-4">
              <div className="bg-white/30 backdrop-blur-sm p-3 md:p-4 rounded-2xl">
                <span className="text-3xl md:text-4xl">🛡️</span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Emergency Fund Calculator</h1>
                <p className="text-sm md:text-base lg:text-lg text-white/90 mt-1 md:mt-2">Build your financial safety net</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview Card */}
        <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-6 border-2 border-green-200 mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Emergency Fund Status
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-white p-4 rounded-xl border-2 border-green-200">
              <div className="text-sm text-gray-600 mb-1 font-medium">Required Fund</div>
              <div className="text-2xl md:text-3xl font-bold text-green-600">₹{requiredFund.toLocaleString('en-IN')}</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border-2 border-blue-200">
              <div className="text-sm text-gray-600 mb-1 font-medium">Current Savings</div>
              <div className="text-2xl md:text-3xl font-bold text-blue-600">₹{formData.currentSavings.toLocaleString('en-IN')}</div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white p-4 rounded-xl border-2 border-orange-200">
              <div className="text-sm text-gray-600 mb-1 font-medium">Shortfall</div>
              <div className="text-2xl md:text-3xl font-bold text-orange-600">₹{shortfall.toLocaleString('en-IN')}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Fund Completion</span>
              <span className="text-lg font-bold text-green-600">{fundingPercentage.toFixed(1)}%</span>
            </div>
            <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500 flex items-center justify-center"
                style={{ width: `${fundingPercentage}%` }}
              >
                {fundingPercentage > 10 && (
                  <span className="text-xs font-bold text-white">{fundingPercentage.toFixed(0)}%</span>
                )}
              </div>
            </div>
          </div>

          {monthsToReach > 0 && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⏱️</span>
                <div>
                  <div className="text-sm text-gray-600 font-medium">Time to Reach Goal</div>
                  <div className="text-xl font-bold text-purple-600">
                    {monthsToReach} {monthsToReach === 1 ? 'month' : 'months'}
                    {monthsToReach >= 12 && ` (${(monthsToReach / 12).toFixed(1)} years)`}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-6 lg:p-8 border-2 border-gray-100">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2">
            <span className="text-2xl">💰</span>
            Calculate Your Emergency Fund
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Monthly Expenses */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-4 md:p-6 rounded-xl border-2 border-blue-200">
              <label className={labelClass}>
                Monthly Expenses
                <InfoIcon tooltip="Your average monthly living expenses including rent, groceries, utilities, etc." />
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                <input
                  type="text"
                  name="monthlyExpenses"
                  value={formatNumber(formData.monthlyExpenses)}
                  onChange={handleInputChange}
                  className={`${inputClass} pl-8`}
                />
              </div>
            </div>

            {/* Number of Months */}
            <div className="bg-gradient-to-br from-green-50 to-white p-4 md:p-6 rounded-xl border-2 border-green-200">
              <label className={labelClass}>
                Number of Months Coverage
                <InfoIcon tooltip="Recommended: 3-6 months for stable jobs, 6-12 months for unstable income" />
              </label>
              <select
                name="numberOfMonths"
                value={formData.numberOfMonths}
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="3">3 months (Minimum)</option>
                <option value="6">6 months (Recommended)</option>
                <option value="9">9 months</option>
                <option value="12">12 months (Safe)</option>
              </select>
            </div>

            {/* Current Savings */}
            <div className="bg-gradient-to-br from-purple-50 to-white p-4 md:p-6 rounded-xl border-2 border-purple-200">
              <label className={labelClass}>
                Current Emergency Savings
                <InfoIcon tooltip="Amount you have already saved for emergencies" />
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                <input
                  type="text"
                  name="currentSavings"
                  value={formatNumber(formData.currentSavings)}
                  onChange={handleInputChange}
                  className={`${inputClass} pl-8`}
                />
              </div>
            </div>

            {/* Monthly Contribution */}
            <div className="bg-gradient-to-br from-orange-50 to-white p-4 md:p-6 rounded-xl border-2 border-orange-200">
              <label className={labelClass}>
                Monthly Contribution
                <InfoIcon tooltip="How much you plan to save each month towards emergency fund" />
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                <input
                  type="text"
                  name="monthlyContribution"
                  value={formatNumber(formData.monthlyContribution)}
                  onChange={handleInputChange}
                  className={`${inputClass} pl-8`}
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save Data
                </>
              )}
            </button>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mt-4 bg-green-50 border-2 border-green-500 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {successMessage}
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="mt-4 md:mt-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-6 lg:p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full -mr-24 -mt-24"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>

          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Emergency Fund Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4">
                <div className="font-semibold mb-1">✅ Keep it Liquid</div>
                <div className="text-sm opacity-90">Store in savings account or liquid funds for easy access</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4">
                <div className="font-semibold mb-1">✅ Separate Account</div>
                <div className="text-sm opacity-90">Keep emergency fund separate from regular savings</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4">
                <div className="font-semibold mb-1">✅ Automate Savings</div>
                <div className="text-sm opacity-90">Set up automatic transfers each month</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4">
                <div className="font-semibold mb-1">✅ Review Regularly</div>
                <div className="text-sm opacity-90">Update target as expenses change</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

EmergencyFund.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout currentPage="my-goal">{page}</DashboardLayout>;
};

export default EmergencyFund;
