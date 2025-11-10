import React, { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/DashboardLayout';
import type { NextPageWithLayout } from '../_app';

const goals = [
  { label: 'Wealth Creation', icon: '💰' },
  { label: 'Retirement', icon: '🛒' },
  { label: 'House', icon: '🏠' },
  { label: 'Car', icon: '🚗' },
  { label: 'Self Education', icon: '🎓' },
  { label: "Child's Education", icon: '👨‍🎓' },
  { label: "Child's Wedding", icon: '💍' },
  { label: 'Vacation', icon: '🏖️' },
];

interface WealthCreationData {
  goalAmount: number;
  targetYear: number;
  goalPossibility: string;
  investmentStrategy: string;
  createdAt?: string;
}

interface RetirementData {
  currentAge: number;
  retirementAge: number;
  expectedLifespan: number;
  currentSavings: number;
  monthlyExpenses: number;
  goalPossibility: string;
  createdAt?: string;
}

interface HouseData {
  currentAge: number;
  targetAge: number;
  propertyValue: number;
  downPaymentPercentage: number;
  currentSavings: number;
  goalPossibility: string;
  createdAt?: string;
}

interface CarData {
  currentAge: number;
  targetAge: number;
  carValue: number;
  currentSavings: number;
  goalPossibility: string;
  createdAt?: string;
}

interface SelfEducationData {
  currentAge: number;
  targetAge: number;
  courseFee: number;
  currentSavings: number;
  goalPossibility: string;
  createdAt?: string;
}

interface ChildEducationData {
  currentAge: number;
  childCurrentAge: number;
  targetAge: number;
  educationCost: number;
  currentSavings: number;
  goalPossibility: string;
  createdAt?: string;
}

interface ChildWeddingData {
  currentAge: number;
  childCurrentAge: number;
  targetAge: number;
  weddingBudget: number;
  currentSavings: number;
  goalPossibility: string;
  createdAt?: string;
}

interface VacationData {
  currentAge: number;
  targetAge: number;
  vacationBudget: number;
  currentSavings: number;
  goalPossibility: string;
  createdAt?: string;
}

const Recipe: NextPageWithLayout = () => {
  const router = useRouter();
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [wealthData, setWealthData] = useState<WealthCreationData | null>(null);
  const [retirementData, setRetirementData] = useState<RetirementData | null>(null);
  const [houseData, setHouseData] = useState<HouseData | null>(null);
  const [carData, setCarData] = useState<CarData | null>(null);
  const [selfEducationData, setSelfEducationData] = useState<SelfEducationData | null>(null);
  const [childEducationData, setChildEducationData] = useState<ChildEducationData | null>(null);
  const [childWeddingData, setChildWeddingData] = useState<ChildWeddingData | null>(null);
  const [vacationData, setVacationData] = useState<VacationData | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

      if (!isLoggedIn) {
        router.push('/login');
        return;
      }

      // Fetch all goals data
      const userId = localStorage.getItem('userId');
      if (userId) {
        await Promise.all([
          fetchWealthCreationData(userId),
          fetchRetirementData(userId),
          fetchHouseData(userId),
          fetchCarData(userId),
          fetchSelfEducationData(userId),
          fetchChildEducationData(userId),
          fetchChildWeddingData(userId),
          fetchVacationData(userId)
        ]);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const fetchWealthCreationData = async (userId: string) => {
    try {
      const response = await fetch(`/api/wealth-creation?userId=${userId}`);
      const result = await response.json();

      if (response.ok && result.data) {
        setWealthData({
          goalAmount: result.data.goalAmount || result.data.budget || 0,
          targetYear: result.data.targetYear || 0,
          goalPossibility: result.data.goalPossibility || '',
          investmentStrategy: result.data.investmentStrategy || 'moderate',
          createdAt: result.data.createdAt,
        });
      }
    } catch (error) {
      console.error('Error fetching wealth creation data:', error);
    }
  };

  const fetchRetirementData = async (userId: string) => {
    try {
      const response = await fetch(`/api/retirement?userId=${userId}`);
      const result = await response.json();

      if (response.ok && result.data) {
        setRetirementData({
          currentAge: result.data.currentAge || 30,
          retirementAge: result.data.retirementAge || 60,
          expectedLifespan: result.data.expectedLifespan || 85,
          currentSavings: result.data.currentSavings || 0,
          monthlyExpenses: result.data.monthlyExpenses || 0,
          goalPossibility: result.data.goalPossibility || '',
          createdAt: result.data.createdAt,
        });
      }
    } catch (error) {
      console.error('Error fetching retirement data:', error);
    }
  };

  const fetchHouseData = async (userId: string) => {
    try {
      const response = await fetch(`/api/house?userId=${userId}`);
      const result = await response.json();

      if (response.ok && result.data) {
        setHouseData({
          currentAge: result.data.currentAge || 30,
          targetAge: result.data.targetAge || 35,
          propertyValue: result.data.propertyValue || 5000000,
          downPaymentPercentage: result.data.downPaymentPercentage || 20,
          currentSavings: result.data.currentSavings || 0,
          goalPossibility: result.data.goalPossibility || '',
          createdAt: result.data.createdAt,
        });
      }
    } catch (error) {
      console.error('Error fetching house data:', error);
    }
  };

  const fetchCarData = async (userId: string) => {
    try {
      const response = await fetch(`/api/car?userId=${userId}`);
      const result = await response.json();

      if (response.ok && result.data) {
        setCarData({
          currentAge: result.data.currentAge || 30,
          targetAge: result.data.targetAge || 31,
          carValue: result.data.carValue || 1500000,
          currentSavings: result.data.currentSavings || 0,
          goalPossibility: result.data.goalPossibility || '',
          createdAt: result.data.createdAt,
        });
      }
    } catch (error) {
      console.error('Error fetching car data:', error);
    }
  };

  const fetchSelfEducationData = async (userId: string) => {
    try {
      const response = await fetch(`/api/self-education?userId=${userId}`);
      const result = await response.json();

      if (response.ok && result.data) {
        setSelfEducationData({
          currentAge: result.data.currentAge || 25,
          targetAge: result.data.targetAge || 26,
          courseFee: result.data.courseFee || 200000,
          currentSavings: result.data.currentSavings || 0,
          goalPossibility: result.data.goalPossibility || '',
          createdAt: result.data.createdAt,
        });
      }
    } catch (error) {
      console.error('Error fetching self education data:', error);
    }
  };

  const fetchChildEducationData = async (userId: string) => {
    try {
      const response = await fetch(`/api/child-education?userId=${userId}`);
      const result = await response.json();

      if (response.ok && result.data) {
        setChildEducationData({
          currentAge: result.data.currentAge || 30,
          childCurrentAge: result.data.childCurrentAge || 5,
          targetAge: result.data.targetAge || 18,
          educationCost: result.data.educationCost || 2000000,
          currentSavings: result.data.currentSavings || 0,
          goalPossibility: result.data.goalPossibility || '',
          createdAt: result.data.createdAt,
        });
      }
    } catch (error) {
      console.error('Error fetching child education data:', error);
    }
  };

  const fetchChildWeddingData = async (userId: string) => {
    try {
      const response = await fetch(`/api/child-wedding?userId=${userId}`);
      const result = await response.json();

      if (response.ok && result.data) {
        setChildWeddingData({
          currentAge: result.data.currentAge || 35,
          childCurrentAge: result.data.childCurrentAge || 10,
          targetAge: result.data.targetAge || 25,
          weddingBudget: result.data.weddingBudget || 2000000,
          currentSavings: result.data.currentSavings || 0,
          goalPossibility: result.data.goalPossibility || '',
          createdAt: result.data.createdAt,
        });
      }
    } catch (error) {
      console.error('Error fetching child wedding data:', error);
    }
  };

  const fetchVacationData = async (userId: string) => {
    try {
      const response = await fetch(`/api/vacation?userId=${userId}`);
      const result = await response.json();

      if (response.ok && result.data) {
        setVacationData({
          currentAge: result.data.currentAge || 30,
          targetAge: result.data.targetAge || 31,
          vacationBudget: result.data.vacationBudget || 300000,
          currentSavings: result.data.currentSavings || 0,
          goalPossibility: result.data.goalPossibility || '',
          createdAt: result.data.createdAt,
        });
      }
    } catch (error) {
      console.error('Error fetching vacation data:', error);
    }
  };

  // Filtered goals/cards
  const filteredGoals = filter && filter !== 'Custom Goal'
    ? goals.filter((g) => g.label === filter)
    : goals;
  const showCustomGoal = !filter || filter === 'Custom Goal';

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafbfc]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B2C] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Recipe - My Goals - IncomeGrow</title>
        <meta name="description" content="Calculate and manage your financial goals with IncomeGrow Recipe" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      {/* Content Area - Only this part will reload */}
      <section className="flex-1 flex flex-col gap-6 px-8 py-8 overflow-y-auto bg-gradient-to-br from-purple-50 via-white to-orange-50">
            {/* Header Card */}
            <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>

              <div className="relative z-10">
                <div className="text-xs text-white/80 mb-3 flex items-center gap-2">
                  <Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                  </Link>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="font-semibold">My Goal</span>
                </div>
                <div className="text-4xl font-bold mb-3">🎯 Your Financial Goals</div>
                <div className="text-lg text-white/90 mb-6">Track, plan, and achieve your dreams with smart financial planning</div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-400 shadow-lg"></span>
                    <span className="text-sm font-medium">Goal Possible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400 shadow-lg"></span>
                    <span className="text-sm font-medium">Goal Not Possible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border-2 border-white shadow-lg"></span>
                    <span className="text-sm font-medium">Not Created Yet</span>
                  </div>
                </div>
              </div>
            </div>

              <div className="flex flex-wrap gap-2 mb-4 hidden">
                {/* <span
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${!filter ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setFilter('')}
                >
                  Show All
                </span>
                {goals.map((goal) => (
                  <span
                    key={goal.label}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${filter === goal.label ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setFilter(goal.label)}
                  >
                    <span className="w-4 h-4 text-purple-500">{goal.icon}</span>
                    {goal.label}
                  </span>
                ))} */}
                {/* <span
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${filter === 'Custom Goal' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setFilter('Custom Goal')}
                >
                  <span className="w-4 h-4 text-purple-500">➕</span>
                  Custom Goal
                </span> */}
              </div>
              
            
            {/* Goal Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredGoals.map((goal) => {
                const isWealthCreation = goal.label === 'Wealth Creation';
                const isRetirement = goal.label === 'Retirement';
                const isHouse = goal.label === 'House';
                const isCar = goal.label === 'Car';
                const isSelfEducation = goal.label === 'Self Education';
                const isChildEducation = goal.label === "Child's Education";
                const isChildWedding = goal.label === "Child's Wedding";
                const isVacation = goal.label === 'Vacation';

                // Check if data exists
                const wealthHasData = isWealthCreation && wealthData && wealthData.goalAmount > 0;
                const retirementHasData = isRetirement && retirementData && retirementData.currentSavings >= 0;
                const houseHasData = isHouse && houseData && houseData.propertyValue > 0;
                const carHasData = isCar && carData && carData.carValue > 0;
                const selfEducationHasData = isSelfEducation && selfEducationData && selfEducationData.courseFee > 0;
                const childEducationHasData = isChildEducation && childEducationData && childEducationData.educationCost > 0;
                const childWeddingHasData = isChildWedding && childWeddingData && childWeddingData.weddingBudget > 0;
                const vacationHasData = isVacation && vacationData && vacationData.vacationBudget > 0;
                const hasData = wealthHasData || retirementHasData || houseHasData || carHasData || selfEducationHasData || childEducationHasData || childWeddingHasData || vacationHasData;

                // Calculate years required
                const wealthYearsRequired = wealthHasData && wealthData.targetYear ? wealthData.targetYear - new Date().getFullYear() : 0;
                const retirementYearsRequired = retirementHasData ? retirementData.retirementAge - retirementData.currentAge : 0;
                const houseYearsRequired = houseHasData ? houseData.targetAge - houseData.currentAge : 0;
                const carYearsRequired = carHasData ? carData.targetAge - carData.currentAge : 0;
                const selfEducationYearsRequired = selfEducationHasData ? selfEducationData.targetAge - selfEducationData.currentAge : 0;
                const childEducationYearsRequired = childEducationHasData ? childEducationData.targetAge - childEducationData.childCurrentAge : 0;
                const childWeddingYearsRequired = childWeddingHasData ? childWeddingData.targetAge - childWeddingData.childCurrentAge : 0;
                const vacationYearsRequired = vacationHasData ? vacationData.targetAge - vacationData.currentAge : 0;

                // Determine goal status color
                let statusColor = 'border-2 border-gray-300'; // Not created yet
                let cardBorderColor = 'border-gray-200';
                let cardBgGradient = 'bg-white';

                const checkGoalStatus = (goalPossibility: string) => {
                  if (goalPossibility?.toLowerCase().includes('possible') || goalPossibility?.toLowerCase().includes('achievable')) {
                    return { status: 'bg-green-400 shadow-lg shadow-green-200', border: 'border-green-100', bg: 'bg-gradient-to-br from-green-50 to-white' };
                  } else if (goalPossibility?.toLowerCase().includes('not')) {
                    return { status: 'bg-red-400 shadow-lg shadow-red-200', border: 'border-red-100', bg: 'bg-gradient-to-br from-red-50 to-white' };
                  } else {
                    return { status: 'bg-green-400 shadow-lg shadow-green-200', border: 'border-green-100', bg: 'bg-gradient-to-br from-green-50 to-white' };
                  }
                };

                if (wealthHasData) {
                  const result = checkGoalStatus(wealthData.goalPossibility);
                  statusColor = result.status;
                  cardBorderColor = result.border;
                  cardBgGradient = result.bg;
                } else if (retirementHasData) {
                  const result = checkGoalStatus(retirementData.goalPossibility);
                  statusColor = result.status;
                  cardBorderColor = result.border;
                  cardBgGradient = result.bg;
                } else if (houseHasData) {
                  const result = checkGoalStatus(houseData.goalPossibility);
                  statusColor = result.status;
                  cardBorderColor = result.border;
                  cardBgGradient = result.bg;
                } else if (carHasData) {
                  const result = checkGoalStatus(carData.goalPossibility);
                  statusColor = result.status;
                  cardBorderColor = result.border;
                  cardBgGradient = result.bg;
                } else if (selfEducationHasData) {
                  const result = checkGoalStatus(selfEducationData.goalPossibility);
                  statusColor = result.status;
                  cardBorderColor = result.border;
                  cardBgGradient = result.bg;
                } else if (childEducationHasData) {
                  const result = checkGoalStatus(childEducationData.goalPossibility);
                  statusColor = result.status;
                  cardBorderColor = result.border;
                  cardBgGradient = result.bg;
                } else if (childWeddingHasData) {
                  const result = checkGoalStatus(childWeddingData.goalPossibility);
                  statusColor = result.status;
                  cardBorderColor = result.border;
                  cardBgGradient = result.bg;
                } else if (vacationHasData) {
                  const result = checkGoalStatus(vacationData.goalPossibility);
                  statusColor = result.status;
                  cardBorderColor = result.border;
                  cardBgGradient = result.bg;
                }

                return (
                  <div key={goal.label} className={`${cardBgGradient} border-2 ${cardBorderColor} shadow-xl rounded-2xl relative transform hover:scale-105 transition-all duration-300 hover:shadow-2xl`}>
                    {/* Status indicator dot */}
                    <div className={`absolute top-5 right-5 w-4 h-4 rounded-full ${hasData ? statusColor : 'border-2 border-gray-300 bg-white'}`}></div>

                    <div className="p-6 flex flex-col gap-3 items-center">
                      <div className="bg-gradient-to-br from-purple-500 to-orange-500 p-4 rounded-2xl shadow-lg">
                        <span className="text-5xl">{goal.icon}</span>
                      </div>
                      <div className="font-bold text-xl text-gray-800 mb-1 text-center">{goal.label}</div>
                      <div className={`text-xs font-semibold px-3 py-1 rounded-full ${hasData ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {hasData ? '✓ Created' : '○ Not created yet'}
                      </div>
                      <div className="flex flex-col gap-2 w-full text-sm bg-white/50 rounded-xl p-4 border border-gray-100">
                        {isWealthCreation && (
                          <>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">💰 Budget</span>
                              <span className="font-bold text-purple-600">{wealthHasData ? `₹${(wealthData.goalAmount / 10000000).toFixed(2)} Cr` : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">📅 Target Year</span>
                              <span className="font-semibold text-gray-800">{wealthHasData ? wealthData.targetYear : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">⏰ Required in</span>
                              <span className="font-semibold text-orange-600">{wealthHasData ? `${wealthYearsRequired} years` : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">🎯 Status</span>
                              <span className="font-bold text-green-600">
                                {wealthHasData ? wealthData.goalPossibility || 'Calculated' : '-'}
                              </span>
                            </div>
                          </>
                        )}
                        {isRetirement && (
                          <>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">👤 Current Age</span>
                              <span className="font-semibold text-gray-800">{retirementHasData ? retirementData.currentAge : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">🎂 Retirement Age</span>
                              <span className="font-semibold text-gray-800">{retirementHasData ? retirementData.retirementAge : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">⏰ Years to Retire</span>
                              <span className="font-semibold text-orange-600">{retirementHasData ? `${retirementYearsRequired} years` : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">🎯 Status</span>
                              <span className="font-bold text-green-600">
                                {retirementHasData ? retirementData.goalPossibility || 'Calculated' : '-'}
                              </span>
                            </div>
                          </>
                        )}
                        {isHouse && (
                          <>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">🏠 Property Value</span>
                              <span className="font-bold text-purple-600">{houseHasData ? `₹${(houseData.propertyValue / 10000000).toFixed(2)} Cr` : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">📅 Target Age</span>
                              <span className="font-semibold text-gray-800">{houseHasData ? houseData.targetAge : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">⏰ Required in</span>
                              <span className="font-semibold text-orange-600">{houseHasData ? `${houseYearsRequired} years` : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">🎯 Status</span>
                              <span className="font-bold text-green-600">
                                {houseHasData ? houseData.goalPossibility || 'Calculated' : '-'}
                              </span>
                            </div>
                          </>
                        )}
                        {isCar && (
                          <>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">🚗 Car Value</span>
                              <span className="font-bold text-purple-600">{carHasData ? `₹${(carData.carValue / 100000).toFixed(2)} L` : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">📅 Target Age</span>
                              <span className="font-semibold text-gray-800">{carHasData ? carData.targetAge : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">⏰ Required in</span>
                              <span className="font-semibold text-orange-600">{carHasData ? `${carYearsRequired} year${carYearsRequired !== 1 ? 's' : ''}` : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">🎯 Status</span>
                              <span className="font-bold text-green-600">
                                {carHasData ? carData.goalPossibility || 'Calculated' : '-'}
                              </span>
                            </div>
                          </>
                        )}
                        {isSelfEducation && (
                          <>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">📚 Course Fee</span>
                              <span className="font-bold text-purple-600">{selfEducationHasData ? `₹${(selfEducationData.courseFee / 100000).toFixed(2)} L` : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">📅 Target Age</span>
                              <span className="font-semibold text-gray-800">{selfEducationHasData ? selfEducationData.targetAge : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">⏰ Required in</span>
                              <span className="font-semibold text-orange-600">{selfEducationHasData ? `${selfEducationYearsRequired} year${selfEducationYearsRequired !== 1 ? 's' : ''}` : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">🎯 Status</span>
                              <span className="font-bold text-green-600">
                                {selfEducationHasData ? selfEducationData.goalPossibility || 'Calculated' : '-'}
                              </span>
                            </div>
                          </>
                        )}
                        {isChildEducation && (
                          <>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">🎓 Education Cost</span>
                              <span className="font-bold text-purple-600">{childEducationHasData ? `₹${(childEducationData.educationCost / 10000000).toFixed(2)} Cr` : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">👶 Child's Age</span>
                              <span className="font-semibold text-gray-800">{childEducationHasData ? `${childEducationData.childCurrentAge} → ${childEducationData.targetAge}` : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">⏰ Required in</span>
                              <span className="font-semibold text-orange-600">{childEducationHasData ? `${childEducationYearsRequired} year${childEducationYearsRequired !== 1 ? 's' : ''}` : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">🎯 Status</span>
                              <span className="font-bold text-green-600">
                                {childEducationHasData ? childEducationData.goalPossibility || 'Calculated' : '-'}
                              </span>
                            </div>
                          </>
                        )}
                        {isChildWedding && (
                          <>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">💒 Wedding Budget</span>
                              <span className="font-bold text-purple-600">{childWeddingHasData ? `₹${(childWeddingData.weddingBudget / 10000000).toFixed(2)} Cr` : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">👶 Child's Age</span>
                              <span className="font-semibold text-gray-800">{childWeddingHasData ? `${childWeddingData.childCurrentAge} → ${childWeddingData.targetAge}` : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">⏰ Required in</span>
                              <span className="font-semibold text-orange-600">{childWeddingHasData ? `${childWeddingYearsRequired} year${childWeddingYearsRequired !== 1 ? 's' : ''}` : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">🎯 Status</span>
                              <span className="font-bold text-green-600">
                                {childWeddingHasData ? childWeddingData.goalPossibility || 'Calculated' : '-'}
                              </span>
                            </div>
                          </>
                        )}
                        {isVacation && (
                          <>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">🏖️ Vacation Budget</span>
                              <span className="font-bold text-purple-600">{vacationHasData ? `₹${(vacationData.vacationBudget / 100000).toFixed(2)} L` : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">📅 Target Age</span>
                              <span className="font-semibold text-gray-800">{vacationHasData ? vacationData.targetAge : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">⏰ Required in</span>
                              <span className="font-semibold text-orange-600">{vacationHasData ? `${vacationYearsRequired} year${vacationYearsRequired !== 1 ? 's' : ''}` : '-'}</span>
                            </div>
                            <div className="h-px bg-gray-200"></div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">🎯 Status</span>
                              <span className="font-bold text-green-600">
                                {vacationHasData ? vacationData.goalPossibility || 'Calculated' : '-'}
                              </span>
                            </div>
                          </>
                        )}
                        {!isWealthCreation && !isRetirement && !isHouse && !isCar && !isSelfEducation && !isChildEducation && !isChildWedding && !isVacation && (
                          <>
                            <div className="flex justify-between">
                              <span>Budget</span>
                              <span>-</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Target Year</span>
                              <span>-</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Required in</span>
                              <span>-</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Goal Possibility</span>
                              <span className="font-semibold">-</span>
                            </div>
                          </>
                        )}
                      </div>
                      {isWealthCreation ? (
                        <Link
                          href="/recipe/wealth-creation"
                          className="bg-gradient-to-r from-purple-600 to-orange-500 text-white font-bold py-3 px-6 rounded-xl mt-3 w-full text-center hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"
                        >
                          {wealthHasData ? '✏️ View / Edit' : '✨ Create Goal'}
                        </Link>
                      ) : isRetirement ? (
                        <Link
                          href="/recipe/retirement"
                          className="bg-gradient-to-r from-purple-600 to-orange-500 text-white font-bold py-3 px-6 rounded-xl mt-3 w-full text-center hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"
                        >
                          {retirementHasData ? '✏️ View / Edit' : '✨ Create Goal'}
                        </Link>
                      ) : isHouse ? (
                        <Link
                          href="/recipe/house"
                          className="bg-gradient-to-r from-purple-600 to-orange-500 text-white font-bold py-3 px-6 rounded-xl mt-3 w-full text-center hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"
                        >
                          {houseHasData ? '✏️ View / Edit' : '✨ Create Goal'}
                        </Link>
                      ) : isCar ? (
                        <Link
                          href="/recipe/car"
                          className="bg-gradient-to-r from-purple-600 to-orange-500 text-white font-bold py-3 px-6 rounded-xl mt-3 w-full text-center hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"
                        >
                          {carHasData ? '✏️ View / Edit' : '✨ Create Goal'}
                        </Link>
                      ) : isSelfEducation ? (
                        <Link
                          href="/recipe/self-education"
                          className="bg-gradient-to-r from-purple-600 to-orange-500 text-white font-bold py-3 px-6 rounded-xl mt-3 w-full text-center hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"
                        >
                          {selfEducationHasData ? '✏️ View / Edit' : '✨ Create Goal'}
                        </Link>
                      ) : isChildEducation ? (
                        <Link
                          href="/recipe/child-education"
                          className="bg-gradient-to-r from-purple-600 to-orange-500 text-white font-bold py-3 px-6 rounded-xl mt-3 w-full text-center hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"
                        >
                          {childEducationHasData ? '✏️ View / Edit' : '✨ Create Goal'}
                        </Link>
                      ) : isChildWedding ? (
                        <Link
                          href="/recipe/child-wedding"
                          className="bg-gradient-to-r from-purple-600 to-orange-500 text-white font-bold py-3 px-6 rounded-xl mt-3 w-full text-center hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"
                        >
                          {childWeddingHasData ? '✏️ View / Edit' : '✨ Create Goal'}
                        </Link>
                      ) : isVacation ? (
                        <Link
                          href="/recipe/vacation"
                          className="bg-gradient-to-r from-purple-600 to-orange-500 text-white font-bold py-3 px-6 rounded-xl mt-3 w-full text-center hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"
                        >
                          {vacationHasData ? '✏️ View / Edit' : '✨ Create Goal'}
                        </Link>
                      ) : (
                        <button className="bg-gradient-to-r from-purple-600 to-orange-500 text-white font-bold py-3 px-6 rounded-xl mt-3 w-full hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md">
                          ✨ Create Goal
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {showCustomGoal && (
                <div>
                  {/* <div className="bg-white border-0 shadow-md flex items-center justify-center rounded-lg">
                    <div className="p-6 flex flex-col gap-2 items-center justify-center h-full">
                      <span className="text-4xl text-purple-400 mb-2">➕</span>
                      <div className="font-bold text-lg text-black mb-1">Add upto 2 more goals</div>
                      <div className="text-xs text-gray-500 mb-1">You can add two more custom goals.</div>
                      <button className="bg-black text-white font-semibold py-2 px-6 rounded mt-2 w-full hover:bg-gray-800 transition-colors">
                        Add
                      </button>
                    </div>
                  </div> */}
                </div>
                
              )
              }
            </div>
            
            {/* Disclaimer */}
            <div className="mt-4">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 text-xs text-gray-300 shadow-xl border border-gray-700">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">ℹ️</div>
                  <div>
                    <div className="font-bold text-white mb-2 text-sm">Important Disclaimer</div>
                    <p className="leading-relaxed">
                      Risks profiled on this domain does not constitute a component of the Investment Advice process. The securities quoted are for illustration only and are not recommendatory. Investment in securities market are subject to market risks. Read all the related documents carefully before investing.
                      <a href="#" className="text-orange-400 hover:text-orange-300 underline ml-1 font-semibold">Learn more →</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
    </>
  );
};

// Use persistent layout for my-goal pages
Recipe.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout currentPage="my-goal">{page}</DashboardLayout>;
};

export default Recipe;