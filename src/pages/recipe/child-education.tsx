import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Tooltip from '@/components/Tooltip';

interface ChildEducationFormData {
  userId: string;
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

export default function ChildEducation() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [results, setResults] = useState<CalculationResults | null>(null);

  const [formData, setFormData] = useState<ChildEducationFormData>({
    userId: '',
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
        body: JSON.stringify(formData),
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
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

      <div className="flex flex-col min-h-screen bg-white">
        <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <div className="text-xs text-gray-400 mb-6 flex items-center gap-1">
          <Link href="/dashboard" className="hover:text-gray-600 transition-colors">Dashboard</Link>
          <svg className="mx-1 text-gray-300 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/recipe" className="hover:text-gray-600 transition-colors">My Goals</Link>
          <svg className="mx-1 text-gray-300 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-[#FF6B2C] font-semibold">Child Education</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg text-2xl">
              🎓
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Child's Education Planning</h1>
              <p className="text-gray-600 mt-1">Secure your child's educational future with smart planning</p>
            </div>
          </div>
        </div>

        {/* Main Content - 50/50 Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input Form */}
          <div className="space-y-6">
            {/* Basic Information Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl">👨‍👩‍👧</span>
                <h2 className="text-xl font-semibold text-gray-800">Family Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Current Age
                  </label>
                  <input
                    type="number"
                    value={formData.currentAge}
                    onChange={(e) => handleInputChange('currentAge', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    min="18"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Child's Current Age
                  </label>
                  <input
                    type="number"
                    value={formData.childCurrentAge}
                    onChange={(e) => handleInputChange('childCurrentAge', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    min="0"
                    max="25"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Target Age (When education starts)
                    </label>
                    <div className="group relative">
                      <span className="text-sm cursor-help">ℹ️</span>
                      <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Typical: 18 for undergraduate, 21 for postgraduate
                      </div>
                    </div>
                  </div>
                  <input
                    type="number"
                    value={formData.targetAge}
                    onChange={(e) => handleInputChange('targetAge', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    min={formData.childCurrentAge}
                    max="30"
                  />
                </div>

                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm text-purple-700">
                    Planning Timeline: <span className="font-semibold">{formData.targetAge - formData.childCurrentAge} years</span>
                  </p>
                  <p className="text-xs text-purple-600 mt-1">
                    Your child will be {formData.targetAge} years old when starting higher education
                  </p>
                </div>
              </div>
            </div>

            {/* Education Costs Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl">🎓</span>
                <h2 className="text-xl font-semibold text-gray-800">Education Costs</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Education Cost (Today's Value)
                    </label>
                    <div className="group relative">
                      <span className="text-sm cursor-help">ℹ️</span>
                      <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Total tuition and fees at current prices. We'll adjust for 8% annual education inflation.
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={formData.educationCost}
                      onChange={(e) => handleInputChange('educationCost', parseFloat(e.target.value) || 0)}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      min="0"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Typical costs: Engineering ₹20-30L, Medical ₹50-100L, Abroad ₹50L-1Cr
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Accommodation Cost (% of education)
                    </label>
                    <div className="group relative">
                      <span className="text-sm cursor-help">ℹ️</span>
                      <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Hostel, rent, or housing costs during the course duration
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.accommodationCost}
                      onChange={(e) => handleInputChange('accommodationCost', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                    <span className="absolute right-3 top-2 text-gray-500">%</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Miscellaneous Cost (% of education)
                    </label>
                    <div className="group relative">
                      <span className="text-sm cursor-help">ℹ️</span>
                      <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Books, supplies, equipment, lab fees, etc.
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.miscCost}
                      onChange={(e) => handleInputChange('miscCost', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                    <span className="absolute right-3 top-2 text-gray-500">%</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Other Costs (% of education)
                    </label>
                    <div className="group relative">
                      <span className="text-sm cursor-help">ℹ️</span>
                      <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Travel, personal expenses, emergency funds
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.otherCosts}
                      onChange={(e) => handleInputChange('otherCosts', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Savings for Child's Education
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={formData.currentSavings}
                      onChange={(e) => handleInputChange('currentSavings', parseFloat(e.target.value) || 0)}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Income
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={formData.monthlyIncome}
                      onChange={(e) => handleInputChange('monthlyIncome', parseFloat(e.target.value) || 0)}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Education Loan Option Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl">🏠</span>
                <h2 className="text-xl font-semibold text-gray-800">Education Loan Option</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${formData.wantLoan ? 'bg-purple-600' : 'bg-gray-300'}`}>
                      💵
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Take Education Loan</p>
                      <p className="text-sm text-gray-600">80% loan coverage, tax benefits available</p>
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
                  <div className="space-y-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Loan Tenure (Years)
                        </label>
                        <div className="group relative">
                          <span className="text-sm cursor-help">ℹ️</span>
                          <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            Education loans typically range from 5-15 years
                          </div>
                        </div>
                      </div>
                      <input
                        type="number"
                        value={formData.loanTenure}
                        onChange={(e) => handleInputChange('loanTenure', parseInt(e.target.value) || 1)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        min="1"
                        max="15"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Interest Rate (% per annum)
                        </label>
                        <div className="group relative">
                          <span className="text-sm cursor-help">ℹ️</span>
                          <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            Current education loan rates: 9-12% per annum
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          value={formData.interestRate}
                          onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value) || 0)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Expected Inflation Rate
                    </label>
                    <div className="group relative">
                      <span className="text-sm cursor-help">ℹ️</span>
                      <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Education inflation typically 8-10% annually
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.inflationRate}
                      onChange={(e) => handleInputChange('inflationRate', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      min="0"
                      step="0.1"
                    />
                    <span className="absolute right-3 top-2 text-gray-500">%</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Expected Return Rate
                    </label>
                    <div className="group relative">
                      <span className="text-sm cursor-help">ℹ️</span>
                      <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Expected annual returns based on investment mix
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.returnRate}
                      onChange={(e) => handleInputChange('returnRate', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                onClick={calculateEducationPlan}
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

          {/* Right Column - Results */}
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
                      <p className="text-lg font-bold text-purple-600">₹{formatIndianNumber(results.totalRequiredAtStart)}</p>
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
                      <p className="text-sm text-gray-600 mb-1">Child's Age</p>
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

                {/* Education Cost Breakdown Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Education Cost Breakdown</h2>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-gray-700">Tuition & Fees</span>
                      <span className="font-semibold text-purple-600">₹{formatIndianNumber(results.educationCostAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-700">Accommodation</span>
                      <span className="font-semibold text-blue-600">₹{formatIndianNumber(results.accommodationAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-gray-700">Miscellaneous</span>
                      <span className="font-semibold text-green-600">₹{formatIndianNumber(results.miscCostAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="text-gray-700">Other Costs</span>
                      <span className="font-semibold text-yellow-600">₹{formatIndianNumber(results.otherCostAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg border-2 border-purple-300">
                      <span className="text-gray-900 font-semibold">Total Education Cost</span>
                      <span className="font-bold text-purple-700 text-lg">₹{formatIndianNumber(results.totalEducationCost)}</span>
                    </div>
                  </div>
                </div>

                {/* Loan Details Card (if loan selected) */}
                {formData.wantLoan && results.loanAmount > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Education Loan Details</h2>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="text-gray-700">Loan Amount (80%)</span>
                        <span className="font-semibold text-purple-600">₹{formatIndianNumber(results.loanAmount)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-gray-700">Your Contribution (20%)</span>
                        <span className="font-semibold text-blue-600">₹{formatIndianNumber(results.totalRequiredAtStart)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <span className="text-gray-700">Monthly EMI</span>
                        <span className="font-semibold text-yellow-600">₹{formatIndianNumber(results.emiAmount)}/month</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-gray-700">Total Repayment</span>
                        <span className="font-semibold text-red-600">₹{formatIndianNumber(results.totalLoanRepayment)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <span className="text-gray-700">Total Interest</span>
                        <span className="font-semibold text-orange-600">₹{formatIndianNumber(results.totalLoanRepayment - results.loanAmount)}</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-green-700">
                        <strong>Tax Benefit:</strong> Interest on education loan is deductible under Section 80E
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
                  🎓
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Plan Your Child's Education</h3>
                <p className="text-gray-600 mb-6">Fill in your details and click "Calculate Plan" to see personalized recommendations for your child's educational future.</p>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <p className="text-sm text-purple-700">
                    <strong>Tip:</strong> Start early! Every year of delay increases the required monthly SIP significantly due to education inflation.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

        <Footer />
      </div>
    </>
  );
}
