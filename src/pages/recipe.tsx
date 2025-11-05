import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const leftMenu = [
  { label: 'Dashboard' },
  { label: 'Wealth Creation', icon: '💰' },
  { label: 'Retirement', icon: '🛒' },
  { label: 'House', icon: '🏠' },
  { label: 'Car', icon: '🚗' },
  { label: 'Self Education', icon: '🎓' },
  { label: "Child's Education", icon: '👨‍🎓' },
  { label: "Child's Wedding", icon: '💍' },
  { label: 'Vacation', icon: '🏖️' },
  { label: 'Add your Own', icon: '➕' },
];

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

const Recipe = () => {
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
      
      <div className="flex flex-col min-h-screen bg-[#fafbfc]">
        <Header />
        <main className="flex flex-1 w-full max-w-[1600px] mx-auto px-2 py-4 gap-6">
          {/* Left Side Menu */}
          <aside className="w-64 bg-[#f6f7fa] rounded-2xl p-4 flex flex-col gap-2 min-h-[80vh] shadow-sm">
            <div className="mb-2">
              <div className="font-bold text-lg text-black mb-2">My Goals</div>
              <div className="text-xs text-gray-500">Calculate your goals</div>
            </div>
            <ul className="flex flex-col gap-1">
              {leftMenu.map((item, idx) => (
                <li key={item.label} className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-gray-700 hover:bg-orange-50 ${idx === 0 ? 'bg-white font-bold text-orange-500 border border-orange-200' : ''}`}>
                  {item.icon && <span className="w-4 h-4 text-sm">{item.icon}</span>}
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </aside>
          
          {/* Right Side Content */}
          <section className="flex-1 flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-2">
              <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                <Link href="/dashboard" className="hover:text-gray-600 transition-colors">Dashboard</Link>
                <svg className="mx-1 text-gray-300 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-[#FF6B2C] font-semibold">My Goals</span>
              </div>
              <div className="text-2xl font-bold mb-1">My Goals</div>
              <div className="text-sm text-gray-500 mb-4">A summary of your Goals and possibility</div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span
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
                ))}
                <span
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${filter === 'Custom Goal' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setFilter('Custom Goal')}
                >
                  <span className="w-4 h-4 text-purple-500">➕</span>
                  Custom Goal
                </span>
              </div>
              
              {/* Legend and toggle row */}
              <div className="flex items-center gap-6 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-purple-400 inline-block"></span>
                  <span className="text-xs text-gray-700">Goal Possible</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-gray-300 inline-block"></span>
                  <span className="text-xs text-gray-700">Goal Not Possible</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border border-gray-400 inline-block"></span>
                  <span className="text-xs text-gray-700">Not created yet</span>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mt-2">Set / Create or Modify your goals by using the calculations below.</div>
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
                let statusColor = 'border-gray-400'; // Not created yet
                const checkGoalStatus = (goalPossibility: string) => {
                  if (goalPossibility?.toLowerCase().includes('possible') || goalPossibility?.toLowerCase().includes('achievable')) {
                    return 'bg-purple-400';
                  } else if (goalPossibility?.toLowerCase().includes('not')) {
                    return 'bg-gray-300';
                  } else {
                    return 'bg-purple-400';
                  }
                };

                if (wealthHasData) {
                  statusColor = checkGoalStatus(wealthData.goalPossibility);
                } else if (retirementHasData) {
                  statusColor = checkGoalStatus(retirementData.goalPossibility);
                } else if (houseHasData) {
                  statusColor = checkGoalStatus(houseData.goalPossibility);
                } else if (carHasData) {
                  statusColor = checkGoalStatus(carData.goalPossibility);
                } else if (selfEducationHasData) {
                  statusColor = checkGoalStatus(selfEducationData.goalPossibility);
                } else if (childEducationHasData) {
                  statusColor = checkGoalStatus(childEducationData.goalPossibility);
                } else if (childWeddingHasData) {
                  statusColor = checkGoalStatus(childWeddingData.goalPossibility);
                } else if (vacationHasData) {
                  statusColor = checkGoalStatus(vacationData.goalPossibility);
                }

                return (
                  <div key={goal.label} className="bg-white border-0 shadow-md rounded-lg relative">
                    {/* Status indicator dot */}
                    <div className={`absolute top-4 right-4 w-4 h-4 rounded-full ${hasData ? statusColor : 'border border-gray-400'}`}></div>

                    <div className="p-6 flex flex-col gap-2 items-center">
                      <span className="text-4xl text-purple-400 mb-2">{goal.icon}</span>
                      <div className="font-bold text-lg text-black mb-1">{goal.label}</div>
                      <div className="text-xs text-gray-500 mb-1">
                        {hasData ? 'Created' : 'Not created yet'}
                      </div>
                      <div className="flex flex-col gap-1 w-full text-xs text-gray-700 mb-2">
                        {isWealthCreation && (
                          <>
                            <div className="flex justify-between">
                              <span>Budget</span>
                              <span>{wealthHasData ? `₹${(wealthData.goalAmount / 10000000).toFixed(2)} Cr` : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Target Year</span>
                              <span>{wealthHasData ? wealthData.targetYear : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Required in</span>
                              <span>{wealthHasData ? `${wealthYearsRequired} years` : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Goal Possibility</span>
                              <span className="font-semibold">
                                {wealthHasData ? wealthData.goalPossibility || 'Calculated' : '-'}
                              </span>
                            </div>
                          </>
                        )}
                        {isRetirement && (
                          <>
                            <div className="flex justify-between">
                              <span>Current Age</span>
                              <span>{retirementHasData ? retirementData.currentAge : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Retirement Age</span>
                              <span>{retirementHasData ? retirementData.retirementAge : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Years to Retire</span>
                              <span>{retirementHasData ? `${retirementYearsRequired} years` : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Goal Possibility</span>
                              <span className="font-semibold">
                                {retirementHasData ? retirementData.goalPossibility || 'Calculated' : '-'}
                              </span>
                            </div>
                          </>
                        )}
                        {isHouse && (
                          <>
                            <div className="flex justify-between">
                              <span>Property Value</span>
                              <span>{houseHasData ? `₹${(houseData.propertyValue / 10000000).toFixed(2)} Cr` : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Target Age</span>
                              <span>{houseHasData ? houseData.targetAge : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Required in</span>
                              <span>{houseHasData ? `${houseYearsRequired} years` : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Goal Possibility</span>
                              <span className="font-semibold">
                                {houseHasData ? houseData.goalPossibility || 'Calculated' : '-'}
                              </span>
                            </div>
                          </>
                        )}
                        {isCar && (
                          <>
                            <div className="flex justify-between">
                              <span>Car Value</span>
                              <span>{carHasData ? `₹${(carData.carValue / 100000).toFixed(2)} L` : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Target Age</span>
                              <span>{carHasData ? carData.targetAge : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Required in</span>
                              <span>{carHasData ? `${carYearsRequired} year${carYearsRequired !== 1 ? 's' : ''}` : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Goal Possibility</span>
                              <span className="font-semibold">
                                {carHasData ? carData.goalPossibility || 'Calculated' : '-'}
                              </span>
                            </div>
                          </>
                        )}
                        {isSelfEducation && (
                          <>
                            <div className="flex justify-between">
                              <span>Course Fee</span>
                              <span>{selfEducationHasData ? `₹${(selfEducationData.courseFee / 100000).toFixed(2)} L` : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Target Age</span>
                              <span>{selfEducationHasData ? selfEducationData.targetAge : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Required in</span>
                              <span>{selfEducationHasData ? `${selfEducationYearsRequired} year${selfEducationYearsRequired !== 1 ? 's' : ''}` : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Goal Possibility</span>
                              <span className="font-semibold">
                                {selfEducationHasData ? selfEducationData.goalPossibility || 'Calculated' : '-'}
                              </span>
                            </div>
                          </>
                        )}
                        {isChildEducation && (
                          <>
                            <div className="flex justify-between">
                              <span>Education Cost</span>
                              <span>{childEducationHasData ? `₹${(childEducationData.educationCost / 10000000).toFixed(2)} Cr` : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Child's Age</span>
                              <span>{childEducationHasData ? `${childEducationData.childCurrentAge} → ${childEducationData.targetAge}` : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Required in</span>
                              <span>{childEducationHasData ? `${childEducationYearsRequired} year${childEducationYearsRequired !== 1 ? 's' : ''}` : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Goal Possibility</span>
                              <span className="font-semibold">
                                {childEducationHasData ? childEducationData.goalPossibility || 'Calculated' : '-'}
                              </span>
                            </div>
                          </>
                        )}
                        {isChildWedding && (
                          <>
                            <div className="flex justify-between">
                              <span>Wedding Budget</span>
                              <span>{childWeddingHasData ? `₹${(childWeddingData.weddingBudget / 10000000).toFixed(2)} Cr` : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Child's Age</span>
                              <span>{childWeddingHasData ? `${childWeddingData.childCurrentAge} → ${childWeddingData.targetAge}` : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Required in</span>
                              <span>{childWeddingHasData ? `${childWeddingYearsRequired} year${childWeddingYearsRequired !== 1 ? 's' : ''}` : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Goal Possibility</span>
                              <span className="font-semibold">
                                {childWeddingHasData ? childWeddingData.goalPossibility || 'Calculated' : '-'}
                              </span>
                            </div>
                          </>
                        )}
                        {isVacation && (
                          <>
                            <div className="flex justify-between">
                              <span>Vacation Budget</span>
                              <span>{vacationHasData ? `₹${(vacationData.vacationBudget / 100000).toFixed(2)} L` : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Target Age</span>
                              <span>{vacationHasData ? vacationData.targetAge : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Required in</span>
                              <span>{vacationHasData ? `${vacationYearsRequired} year${vacationYearsRequired !== 1 ? 's' : ''}` : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Goal Possibility</span>
                              <span className="font-semibold">
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
                          className="bg-black text-white font-semibold py-2 px-6 rounded mt-2 w-full text-center hover:bg-gray-800 transition-colors"
                        >
                          {wealthHasData ? 'View / Edit' : 'Create'}
                        </Link>
                      ) : isRetirement ? (
                        <Link
                          href="/recipe/retirement"
                          className="bg-black text-white font-semibold py-2 px-6 rounded mt-2 w-full text-center hover:bg-gray-800 transition-colors"
                        >
                          {retirementHasData ? 'View / Edit' : 'Create'}
                        </Link>
                      ) : isHouse ? (
                        <Link
                          href="/recipe/house"
                          className="bg-black text-white font-semibold py-2 px-6 rounded mt-2 w-full text-center hover:bg-gray-800 transition-colors"
                        >
                          {houseHasData ? 'View / Edit' : 'Create'}
                        </Link>
                      ) : isCar ? (
                        <Link
                          href="/recipe/car"
                          className="bg-black text-white font-semibold py-2 px-6 rounded mt-2 w-full text-center hover:bg-gray-800 transition-colors"
                        >
                          {carHasData ? 'View / Edit' : 'Create'}
                        </Link>
                      ) : isSelfEducation ? (
                        <Link
                          href="/recipe/self-education"
                          className="bg-black text-white font-semibold py-2 px-6 rounded mt-2 w-full text-center hover:bg-gray-800 transition-colors"
                        >
                          {selfEducationHasData ? 'View / Edit' : 'Create'}
                        </Link>
                      ) : isChildEducation ? (
                        <Link
                          href="/recipe/child-education"
                          className="bg-black text-white font-semibold py-2 px-6 rounded mt-2 w-full text-center hover:bg-gray-800 transition-colors"
                        >
                          {childEducationHasData ? 'View / Edit' : 'Create'}
                        </Link>
                      ) : isChildWedding ? (
                        <Link
                          href="/recipe/child-wedding"
                          className="bg-black text-white font-semibold py-2 px-6 rounded mt-2 w-full text-center hover:bg-gray-800 transition-colors"
                        >
                          {childWeddingHasData ? 'View / Edit' : 'Create'}
                        </Link>
                      ) : isVacation ? (
                        <Link
                          href="/recipe/vacation"
                          className="bg-black text-white font-semibold py-2 px-6 rounded mt-2 w-full text-center hover:bg-gray-800 transition-colors"
                        >
                          {vacationHasData ? 'View / Edit' : 'Create'}
                        </Link>
                      ) : (
                        <button className="bg-black text-white font-semibold py-2 px-6 rounded mt-2 w-full hover:bg-gray-800 transition-colors">
                          Create
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {showCustomGoal && (
                <div className="bg-white border-0 shadow-md flex items-center justify-center rounded-lg">
                  <div className="p-6 flex flex-col gap-2 items-center justify-center h-full">
                    <span className="text-4xl text-purple-400 mb-2">➕</span>
                    <div className="font-bold text-lg text-black mb-1">Add upto 2 more goals</div>
                    <div className="text-xs text-gray-500 mb-1">You can add two more custom goals.</div>
                    <button className="bg-black text-white font-semibold py-2 px-6 rounded mt-2 w-full hover:bg-gray-800 transition-colors">
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Disclaimer */}
            <div className="mt-8">
              <div className="bg-gray-100 rounded-lg p-4 text-xs text-gray-500 text-center">
                <b>Disclaimer</b>: Risks profiled on this domain does not constitute a component of the Investment Advice process. The securities quoted are for illustration only and are not recommendatory. Investment in securities market are subject to market risks. Read all the related documents carefully before investing. <a href="#" className="underline">Learn more</a>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Recipe;