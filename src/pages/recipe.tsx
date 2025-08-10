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

const Recipe = () => {
  const router = useRouter();
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
      
      if (!isLoggedIn) {
        router.push('/login');
        return;
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

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
        <title>Recipe - My Goals - Umbrella</title>
        <meta name="description" content="Calculate and manage your financial goals with Umbrella Recipe" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
              {filteredGoals.map((goal) => (
                <div key={goal.label} className="bg-white border-0 shadow-md rounded-lg">
                  <div className="p-6 flex flex-col gap-2 items-center">
                    <span className="text-4xl text-purple-400 mb-2">{goal.icon}</span>
                    <div className="font-bold text-lg text-black mb-1">{goal.label}</div>
                    <div className="text-xs text-gray-500 mb-1">Not created yet</div>
                    <div className="flex flex-col gap-1 w-full text-xs text-gray-700 mb-2">
                      <div className="flex justify-between"><span>Budget</span><span>-</span></div>
                      <div className="flex justify-between"><span>Target Year</span><span>-</span></div>
                      <div className="flex justify-between"><span>Required in</span><span>-</span></div>
                      <div className="flex justify-between"><span>Goal Possibility</span><span>-</span></div>
                    </div>
                    {goal.label === 'Wealth Creation' ? (
                      <Link href="/recipe/wealth-creation" className="bg-black text-white font-semibold py-2 px-6 rounded mt-2 w-full text-center hover:bg-gray-800 transition-colors">
                        Create
                      </Link>
                    ) : (
                      <button className="bg-black text-white font-semibold py-2 px-6 rounded mt-2 w-full hover:bg-gray-800 transition-colors">
                        Create
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
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