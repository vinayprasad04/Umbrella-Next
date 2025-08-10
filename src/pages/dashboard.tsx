import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const router = useRouter();
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
        <title>Dashboard - Umbrella</title>
        <meta name="description" content="Welcome to your Umbrella dashboard. Access our financial tools and services." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="flex flex-col min-h-screen bg-[#fafbfc]">
        <Header />
        <main className="flex flex-col flex-1 w-full max-w-[1600px] mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
            <span className="text-[#FF6B2C] font-semibold">Dashboard</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-1">Dashboard</h1>
          <p className="text-base text-gray-700 mb-8">Welcome to Umbrella. Access our state of the art products from here.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Recipe */}
            <div className="bg-[#ede6fa]/80 border-0 shadow-md rounded-lg">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-2xl font-bold text-black">Recipe</span>
                  <span className="w-7 h-7 rounded-full bg-[#c7b3f7] flex items-center justify-center">
                    <span className="w-4 h-4 border-2 border-[#a48be0] rounded-full block"></span>
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-4">Achieve your financial goals with stocks and mutual funds recommendations handpicked <b>#ForInvestors</b>.</p>
                <div className="flex gap-8 mb-2">
                  <div>
                    <div className="text-xs text-gray-700">Financial Health Score</div>
                    <div className="text-2xl font-bold">0<small className="text-xs font-normal">/100</small></div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-700">Financial Health Status</div>
                    <div className="text-lg font-bold">Unknown</div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-4">You may not know what&apos;s draining your wealth! Could be your spends, loans or investments. Check using Recipe.</p>
                <Link href="/recipe" className="bg-black text-white font-semibold py-2 px-6 rounded mt-2 inline-block text-center hover:bg-gray-800 transition-colors">
                  Go to Recipe
                </Link>
              </div>
            </div>
            
            {/* Quest */}
            <div className="bg-[#ffe9cc]/80 border-0 shadow-md rounded-lg">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-2xl font-bold text-black">Quest</span>
                  <span className="w-7 h-7 rounded-full bg-[#f7d7b3] flex items-center justify-center">
                    <span className="w-4 h-4 border-2 border-[#e0b98b] rounded-full block"></span>
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-4">Unlearn textbook knowledge with investing concepts you can apply in real life <b>#ForInvestors</b>.</p>
                <div className="flex gap-8 mb-2">
                  <div>
                    <div className="text-xs text-gray-700">Your courses</div>
                    <div className="text-2xl font-bold">0</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-700">Your Progress</div>
                    <div className="text-lg font-bold">0 <span className="text-base font-normal">%</span></div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-4">You can make 10x better investments by knowing the right tactics! Start your learning curve and see the difference!</p>
                <button className="bg-black text-white font-semibold py-2 px-6 rounded mt-2 hover:bg-gray-800 transition-colors">
                  Go to Quest
                </button>
              </div>
            </div>
            
            {/* Ticker */}
            <div className="bg-[#e6f0fa]/80 border-0 shadow-md rounded-lg">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-2xl font-bold text-black">Ticker</span>
                  <span className="w-7 h-7 rounded-full bg-[#b3d1f7] flex items-center justify-center">
                    <span className="w-4 h-4 border-2 border-[#8bb3e0] rounded-full block"></span>
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-4">1,200+ stock filtration parameters <b>#ForInvestors</b> to pick from 4,000+ companies.</p>
                <div className="flex gap-8 mb-2">
                  <div>
                    <div className="text-xs text-gray-700">Watchlist</div>
                    <div className="text-2xl font-bold">0</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-700">Portfolio</div>
                    <div className="text-2xl font-bold">0</div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-4">Eyeing some stocks or just bought them. Add them to your Watchlist & Portfolio and get personalised updates now.</p>
                <button className="bg-black text-white font-semibold py-2 px-6 rounded mt-2 hover:bg-gray-800 transition-colors">
                  Go to ticker
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Select */}
            <div className="bg-[#e6f6fa]/80 border-0 shadow-md rounded-lg">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-2xl font-bold text-black">Select</span>
                  <span className="w-7 h-7 rounded-full bg-[#3fffd1] flex items-center justify-center">
                    <span className="w-4 h-4 border-2 border-[#0ee6b3] rounded-full block"></span>
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-4">A-Z details and comparisons of financial tools <b>#ForInvestors</b>.</p>
                <button className="bg-black text-white font-semibold py-2 px-6 rounded mt-2 hover:bg-gray-800 transition-colors">
                  Go to Select
                </button>
              </div>
            </div>
            
            {/* Insider */}
            <div className="bg-[#fae6ed]/80 border-0 shadow-md rounded-lg">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-2xl font-bold text-black">Insider</span>
                  <span className="w-7 h-7 rounded-full bg-[#f7b3c7] flex items-center justify-center">
                    <span className="w-4 h-4 border-2 border-[#e08bb3] rounded-full block"></span>
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-4">Read in-depth and jargon-free coverage of businesses through articles <b>#ForInvestors</b>.</p>
                <button className="bg-black text-white font-semibold py-2 px-6 rounded mt-2 hover:bg-gray-800 transition-colors">
                  Go to Insider
                </button>
              </div>
            </div>
            
            {/* Reserve */}
            <div className="bg-black border-0 shadow-md text-white rounded-lg">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-2xl font-bold">Reserve</span>
                  <span className="text-xs font-semibold">Reserve</span>
                </div>
                <p className="text-sm mb-4">Reserve is our personalised investment advisory service. We accept only 50 elite investors in a cohort!</p>
                <button className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded mt-2 transition-colors">
                  Go to Reserve
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;