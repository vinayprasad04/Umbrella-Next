import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/DashboardLayout';
import { logActivity } from '@/lib/activityLogger';
import type { NextPageWithLayout } from './_app';

interface WealthData {
  monthlyIncome: number;
  monthlySavings: number;
  emis: number;
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
  totalLoanAmount: number;
}

const Dashboard: NextPageWithLayout = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [wealthData, setWealthData] = useState<WealthData | null>(null);
  const [Highcharts, setHighcharts] = useState<any>(null);
  const [HighchartsReact, setHighchartsReact] = useState<any>(null);

  useEffect(() => {
    // Load Highcharts library
    if (typeof window !== 'undefined') {
      import('highcharts').then(() => {
        // Import 3D module - it auto-registers with Highcharts
        import('highcharts/highcharts-3d').then((HC3D) => {
          const HighchartsModule = HC3D.default;
          setHighcharts(HighchartsModule);

          // Load HighchartsReact
          import('highcharts-react-official').then((HCReact) => {
            setHighchartsReact(() => HCReact.default);
          });
        });
      });
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
      const userEmail = localStorage.getItem('userEmail') || '';
      const userId = localStorage.getItem('userId') || '';

      if (!isLoggedIn) {
        router.push('/login');
        return;
      }

      // Fetch wealth creation data
      if (userId) {
        try {
          const response = await fetch(`/api/wealth-creation?userId=${userId}`);
          const result = await response.json();
          if (response.ok && result.data) {
            setWealthData(result.data);
          }
        } catch (error) {
          console.error('Error fetching wealth data:', error);
        }
      }

      setIsLoading(false);

      // Log dashboard access activity
      if (userId && userEmail) {
        logActivity({
          userId,
          userEmail,
          activityType: 'dashboard_access',
          description: 'Accessed dashboard',
          metadata: {},
        });
      }
    };

    checkAuth();
  }, [router]);

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

  // Default data if no wealth data is available
  const data = wealthData || {
    monthlyIncome: 100000,
    monthlySavings: 30000,
    emis: 20000,
    stocks: 500000,
    equityMF: 300000,
    debtMFBonds: 200000,
    fixedDeposits: 400000,
    gold: 150000,
    realEstate: 2000000,
    cashBank: 100000,
    monthlyStocks: 5000,
    sipEquityMF: 10000,
    sipDebtMF: 5000,
    monthlyRDFD: 5000,
    monthlyGold: 2000,
    goalAmount: 10000000,
    targetYear: new Date().getFullYear() + 10,
    totalLoanAmount: 500000,
  };

  const monthlyExpenditure = data.monthlyIncome - data.monthlySavings - data.emis;
  const totalAssets = data.stocks + data.equityMF + data.debtMFBonds + data.fixedDeposits + data.gold + data.realEstate + data.cashBank;
  const totalMonthlyInvestments = data.monthlyStocks + data.sipEquityMF + data.sipDebtMF + data.monthlyRDFD + data.monthlyGold;

  // Chart 1: Income, Savings, EMI - Semi Circle Donut
  const incomeChartOptions = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
    },
    title: {
      text: 'Monthly Cash Flow',
      style: { fontSize: '18px', fontWeight: 'bold' }
    },
    plotOptions: {
      pie: {
        innerSize: '50%',
        depth: 45,
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: ₹{point.y:,.0f}',
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white',
            textOutline: 'none'
          }
        }
      }
    },
    series: [{
      name: 'Amount',
      data: [
        { name: 'Savings', y: data.monthlySavings, color: '#22c55e' },
        { name: 'EMIs', y: data.emis, color: '#ef4444' },
        { name: 'Expenditure', y: monthlyExpenditure, color: '#f59e0b' }
      ]
    }],
    credits: { enabled: false }
  };

  // Chart 2: Goal Planning - Donut Chart
  const yearsToGoal = data.targetYear - new Date().getFullYear();
  const requiredPerYear = data.goalAmount / yearsToGoal;
  const currentAnnualSavings = data.monthlySavings * 12;
  const shortfall = Math.max(0, requiredPerYear - currentAnnualSavings);

  const goalChartOptions = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
    },
    title: {
      text: 'Goal Progress',
      style: { fontSize: '18px', fontWeight: 'bold' }
    },
    plotOptions: {
      pie: {
        innerSize: '60%',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br>{point.percentage:.1f}%',
          style: {
            fontSize: '12px'
          }
        }
      }
    },
    series: [{
      name: 'Amount',
      data: [
        { name: 'Current Assets', y: totalAssets, color: '#3b82f6' },
        { name: 'Goal Amount', y: Math.max(0, data.goalAmount - totalAssets), color: '#e5e7eb' }
      ]
    }],
    credits: { enabled: false }
  };

  // Chart 3: Assets - 3D Pie Chart
  const assetsChartOptions = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0
      }
    },
    title: {
      text: 'Asset Allocation (3D)',
      style: { fontSize: '18px', fontWeight: 'bold' }
    },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45,
        dataLabels: {
          enabled: true,
          format: '{point.name}: ₹{point.y:,.0f}',
          style: {
            fontSize: '11px'
          }
        }
      }
    },
    series: [{
      name: 'Assets',
      data: [
        { name: 'Real Estate', y: data.realEstate, color: '#8b5cf6' },
        { name: 'Stocks', y: data.stocks, color: '#3b82f6' },
        { name: 'Fixed Deposits', y: data.fixedDeposits, color: '#10b981' },
        { name: 'Equity MF', y: data.equityMF, color: '#f59e0b' },
        { name: 'Debt/Bonds', y: data.debtMFBonds, color: '#ef4444' },
        { name: 'Gold', y: data.gold, color: '#eab308' },
        { name: 'Cash/Bank', y: data.cashBank, color: '#06b6d4' }
      ]
    }],
    credits: { enabled: false }
  };

  // Chart 4: Monthly Investments - Column Chart
  const investmentsChartOptions = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
    },
    title: {
      text: 'Monthly Investments',
      style: { fontSize: '18px', fontWeight: 'bold' }
    },
    xAxis: {
      categories: ['Stocks', 'Equity MF (SIP)', 'Debt MF (SIP)', 'RD/FD', 'Gold'],
      labels: {
        style: {
          fontSize: '11px'
        }
      }
    },
    yAxis: {
      title: {
        text: 'Amount (₹)'
      },
      labels: {
        format: '₹{value}'
      }
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: '₹{point.y:,.0f}',
          style: {
            fontWeight: 'bold'
          }
        },
        colorByPoint: true,
        colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#eab308']
      }
    },
    series: [{
      name: 'Investment',
      data: [
        data.monthlyStocks,
        data.sipEquityMF,
        data.sipDebtMF,
        data.monthlyRDFD,
        data.monthlyGold
      ]
    }],
    legend: {
      enabled: false
    },
    credits: { enabled: false }
  };

  return (
    <>
      <Head>
        <title>Dashboard - IncomeGrow</title>
        <meta name="description" content="Welcome to your IncomeGrow dashboard. Access our financial tools and services." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      {/* Content Area - Only this part will reload */}
      <div className="flex-1 px-8 py-8 overflow-y-auto bg-gradient-to-br from-purple-50 via-white to-orange-50">
        {/* Hero Header Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 rounded-3xl shadow-2xl p-8 mb-8 text-white relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -ml-32 -mb-32"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl">📊</span>
              <div className="text-xs text-white/80 flex items-center gap-2">
                <span className="font-semibold">Dashboard</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Financial Dashboard</h1>
            <p className="text-lg text-white/90 mb-6">Track your financial health with real-time insights and interactive visualizations</p>

            {/* Quick Stats in Header */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-center">
                <div className="text-xs text-white/80 mb-1">Income</div>
                <div className="text-lg font-bold">₹{(data.monthlyIncome / 1000).toFixed(0)}K</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-white/80 mb-1">Savings</div>
                <div className="text-lg font-bold">₹{(data.monthlySavings / 1000).toFixed(0)}K</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-white/80 mb-1">Assets</div>
                <div className="text-lg font-bold">₹{(totalAssets / 10000000).toFixed(1)}Cr</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-white/80 mb-1">Investments</div>
                <div className="text-lg font-bold">₹{(totalMonthlyInvestments / 1000).toFixed(0)}K</div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-6 border-2 border-blue-100 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-gray-600">Monthly Income</div>
              <div className="bg-blue-500 p-2 rounded-xl">
                <span className="text-2xl">💰</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">₹{data.monthlyIncome.toLocaleString('en-IN')}</div>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style={{width: '100%'}}></div>
              </div>
              <span className="text-xs text-green-600 font-semibold">Active</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-xl p-6 border-2 border-green-100 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-gray-600">Monthly Savings</div>
              <div className="bg-green-500 p-2 rounded-xl">
                <span className="text-2xl">📈</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">₹{data.monthlySavings.toLocaleString('en-IN')}</div>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full" style={{width: `${((data.monthlySavings / data.monthlyIncome) * 100)}%`}}></div>
              </div>
              <span className="text-xs text-green-600 font-semibold">{((data.monthlySavings / data.monthlyIncome) * 100).toFixed(1)}%</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-xl p-6 border-2 border-purple-100 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-gray-600">Total Assets</div>
              <div className="bg-purple-500 p-2 rounded-xl">
                <span className="text-2xl">💎</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">₹{(totalAssets / 10000000).toFixed(2)} Cr</div>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full" style={{width: '85%'}}></div>
              </div>
              <span className="text-xs text-purple-600 font-semibold">Net Worth</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl shadow-xl p-6 border-2 border-orange-100 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-gray-600">Monthly Investments</div>
              <div className="bg-orange-500 p-2 rounded-xl">
                <span className="text-2xl">🎯</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">₹{totalMonthlyInvestments.toLocaleString('en-IN')}</div>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" style={{width: `${((totalMonthlyInvestments / data.monthlyIncome) * 100)}%`}}></div>
              </div>
              <span className="text-xs text-orange-600 font-semibold">Growing</span>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Income Flow Chart */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-gray-100 transform hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-green-500 to-blue-500 p-2 rounded-xl">
                <span className="text-2xl">💸</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Monthly Cash Flow</h3>
                <p className="text-xs text-gray-500">Income distribution breakdown</p>
              </div>
            </div>
            {Highcharts && HighchartsReact && (
              <HighchartsReact
                highcharts={Highcharts}
                options={incomeChartOptions}
              />
            )}
            {!Highcharts && <div className="text-center py-8 text-gray-500">Loading chart...</div>}
          </div>

          {/* Goal Planning Chart */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-gray-100 transform hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-2 rounded-xl">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Goal Progress</h3>
                <p className="text-xs text-gray-500">Track your financial goals</p>
              </div>
            </div>
            {Highcharts && HighchartsReact && (
              <HighchartsReact
                highcharts={Highcharts}
                options={goalChartOptions}
              />
            )}
            {!Highcharts && <div className="text-center py-8 text-gray-500">Loading chart...</div>}
            <div className="mt-4 grid grid-cols-3 gap-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3">
              <div className="text-center">
                <div className="text-xs text-gray-600 mb-1">Goal Amount</div>
                <div className="text-sm font-bold text-purple-600">₹{(data.goalAmount / 10000000).toFixed(2)} Cr</div>
              </div>
              <div className="text-center border-l border-r border-gray-300">
                <div className="text-xs text-gray-600 mb-1">Target Year</div>
                <div className="text-sm font-bold text-blue-600">{data.targetYear}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-600 mb-1">Time Left</div>
                <div className="text-sm font-bold text-orange-600">{yearsToGoal} years</div>
              </div>
            </div>
          </div>

          {/* Assets 3D Chart */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-gray-100 transform hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl">
                <span className="text-2xl">💎</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Asset Allocation (3D)</h3>
                <p className="text-xs text-gray-500">Portfolio distribution view</p>
              </div>
            </div>
            {Highcharts && HighchartsReact && (
              <HighchartsReact
                highcharts={Highcharts}
                options={assetsChartOptions}
              />
            )}
            {!Highcharts && <div className="text-center py-8 text-gray-500">Loading chart...</div>}
          </div>

          {/* Monthly Investments Chart */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-gray-100 transform hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2 rounded-xl">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Monthly Investments</h3>
                <p className="text-xs text-gray-500">Investment breakdown analysis</p>
              </div>
            </div>
            {Highcharts && HighchartsReact && (
              <HighchartsReact
                highcharts={Highcharts}
                options={investmentsChartOptions}
              />
            )}
            {!Highcharts && <div className="text-center py-8 text-gray-500">Loading chart...</div>}
            <div className="mt-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-600 mb-1">Total Monthly Investment</div>
              <div className="text-xl font-bold text-orange-600">₹{totalMonthlyInvestments.toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden mb-6">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">💡</span>
              <h2 className="text-3xl font-bold">Financial Insights</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💰</span>
                  <div className="text-sm opacity-90 font-semibold">Savings Rate</div>
                </div>
                <div className="text-5xl font-bold mb-2">{((data.monthlySavings / data.monthlyIncome) * 100).toFixed(1)}%</div>
                <div className="h-2 bg-white/30 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-white rounded-full" style={{width: `${((data.monthlySavings / data.monthlyIncome) * 100)}%`}}></div>
                </div>
                <div className="text-sm font-semibold">{data.monthlySavings / data.monthlyIncome > 0.3 ? '✅ Excellent!' : '⚠️ Can improve'}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">📈</span>
                  <div className="text-sm opacity-90 font-semibold">Investment Rate</div>
                </div>
                <div className="text-5xl font-bold mb-2">{((totalMonthlyInvestments / data.monthlyIncome) * 100).toFixed(1)}%</div>
                <div className="h-2 bg-white/30 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-white rounded-full" style={{width: `${((totalMonthlyInvestments / data.monthlyIncome) * 100)}%`}}></div>
                </div>
                <div className="text-sm font-semibold">{totalMonthlyInvestments / data.monthlyIncome > 0.2 ? '✅ Great!' : '💪 Keep going'}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🎯</span>
                  <div className="text-sm opacity-90 font-semibold">Goal Achievement</div>
                </div>
                <div className="text-5xl font-bold mb-2">{((totalAssets / data.goalAmount) * 100).toFixed(1)}%</div>
                <div className="h-2 bg-white/30 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-white rounded-full" style={{width: `${Math.min(((totalAssets / data.goalAmount) * 100), 100)}%`}}></div>
                </div>
                <div className="text-sm font-semibold">🚀 {yearsToGoal} years to go</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Use persistent layout for dashboard pages
Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout currentPage="dashboard">{page}</DashboardLayout>;
};

export default Dashboard;
