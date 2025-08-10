import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inputClass = "border border-gray-300 rounded px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-300";
const labelClass = "text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1";

const InfoIcon = () => (
  <svg className="ml-1 text-gray-400 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const WealthCreation = () => {
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
        <title>My Finance - Wealth Creation - Umbrella</title>
        <meta name="description" content="Financial checkup and wealth creation planning with Umbrella" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="flex flex-col min-h-screen bg-[#fafbfc]">
        <Header />
        <main className="flex flex-1 flex-col w-full max-w-[1600px] mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
            <Link href="/dashboard" className="hover:text-gray-600 transition-colors">Dashboard</Link>
            <svg className="mx-1 text-gray-300 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/recipe" className="hover:text-gray-600 transition-colors">My Goals</Link>
            <svg className="mx-1 text-gray-300 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#FF6B2C] font-semibold">My Finance</span>
          </div>
          
          {/* Title */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl">
              <svg className="text-purple-600 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-black mb-1">My Finance</div>
              <div className="text-sm text-gray-500">Wish to find out your true wealth & allocation? Check now.</div>
            </div>
          </div>
          
          {/* Smart Link Card */}
          <div className="bg-white rounded-xl border mb-4 p-4 flex flex-col gap-2 shadow-sm">
            <div className="font-semibold text-purple-700 mb-2 flex items-center gap-2">
              <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Smart Link
              <span className="text-xs text-gray-400 font-normal">Autofilled from your Recipe profile & used in this tool</span>
            </div>
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-2">
                <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="font-semibold text-xs text-gray-700">Monthly Income</span>
                <InfoIcon />
                <span className="font-bold text-lg ml-2">₹ 1,00,000</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="font-semibold text-xs text-gray-700">Monthly Savings</span>
                <InfoIcon />
                <span className="font-bold text-lg ml-2">₹ 30,000</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="font-semibold text-xs text-gray-700">EMIs</span>
                <InfoIcon />
                <span className="font-bold text-lg ml-2">₹ 0</span>
              </div>
            </div>
          </div>
          
          {/* Loans Card */}
          <div className="bg-white rounded-xl border mb-4 p-4 flex flex-col gap-2 shadow-sm">
            <div className="font-semibold text-purple-700 mb-2 flex items-center gap-2">
              <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Loans
              <span className="text-xs text-gray-400 font-normal">Tell us about your total outstanding loans.</span>
            </div>
            <div className="flex flex-col gap-1 w-64">
              <label className={labelClass}>
                Total Loan Amount <span className="text-red-500">*</span> <InfoIcon />
              </label>
              <div className="flex items-center gap-2">
                <span className="text-lg text-gray-500">₹</span>
                <input className={inputClass} placeholder="0" type="number" min="0" />
              </div>
            </div>
          </div>
          
          {/* Assets Card */}
          <div className="bg-white rounded-xl border mb-4 p-4 flex flex-col gap-2 shadow-sm">
            <div className="font-semibold text-purple-700 mb-2 flex items-center gap-2">
              <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Assets
              <span className="text-xs text-gray-400 font-normal">Tell us about your total investments & savings till date.</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className={labelClass}>Stocks <span className="text-red-500">*</span> <InfoIcon /></label>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-gray-500">₹</span>
                  <input className={inputClass} placeholder="eg: 1,00,00,000" type="number" min="0" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Equity MF <span className="text-red-500">*</span> <InfoIcon /></label>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-gray-500">₹</span>
                  <input className={inputClass} placeholder="eg: 1,00,00,000" type="number" min="0" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Debt MF & Bonds <span className="text-red-500">*</span> <InfoIcon /></label>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-gray-500">₹</span>
                  <input className={inputClass} placeholder="eg: 1,00,00,000" type="number" min="0" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Fixed Deposits <span className="text-red-500">*</span> <InfoIcon /></label>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-gray-500">₹</span>
                  <input className={inputClass} placeholder="eg: 1,00,00,000" type="number" min="0" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Gold <span className="text-red-500">*</span> <InfoIcon /></label>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-gray-500">₹</span>
                  <input className={inputClass} placeholder="eg: 1,00,00,000" type="number" min="0" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Real Estate <span className="text-red-500">*</span> <InfoIcon /></label>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-gray-500">₹</span>
                  <input className={inputClass} placeholder="eg: 1,00,00,000" type="number" min="0" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Cash, Bank, etc. <span className="text-red-500">*</span> <InfoIcon /></label>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-gray-500">₹</span>
                  <input className={inputClass} placeholder="eg: 1,00,00,000" type="number" min="0" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Total Assets <InfoIcon /></label>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-gray-500">₹</span>
                  <input className={inputClass} placeholder="0" type="number" min="0" disabled />
                </div>
              </div>
            </div>
          </div>
          
          {/* Monthly Investments Card */}
          <div className="bg-white rounded-xl border mb-4 p-4 flex flex-col gap-2 shadow-sm">
            <div className="font-semibold text-purple-700 mb-2 flex items-center gap-2">
              <svg className="text-purple-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Monthly Investments
              <span className="text-xs text-gray-400 font-normal">Enter how you invest your monthly savings &amp; find out if that&apos;s enough.</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Monthly Stocks <span className="text-red-500">*</span> <InfoIcon /></label>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-gray-500">₹</span>
                  <input className={inputClass} placeholder="eg: 1,00,00,000" type="number" min="0" />
                </div>
              </div>
              <div>
                <label className={labelClass}>SIP In Equity MF <span className="text-red-500">*</span> <InfoIcon /></label>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-gray-500">₹</span>
                  <input className={inputClass} placeholder="eg: 1,00,00,000" type="number" min="0" />
                </div>
              </div>
              <div>
                <label className={labelClass}>SIP In Debt MF <span className="text-red-500">*</span> <InfoIcon /></label>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-gray-500">₹</span>
                  <input className={inputClass} placeholder="eg: 1,00,00,000" type="number" min="0" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Monthly RD/FD <span className="text-red-500">*</span> <InfoIcon /></label>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-gray-500">₹</span>
                  <input className={inputClass} placeholder="eg: 1,00,00,000" type="number" min="0" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Monthly Gold <span className="text-red-500">*</span> <InfoIcon /></label>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-gray-500">₹</span>
                  <input className={inputClass} placeholder="eg: 1,00,00,000" type="number" min="0" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Monthly Investments <InfoIcon /></label>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-gray-500">₹</span>
                  <input className={inputClass} placeholder="eg: 1,00,00,000" type="number" min="0" disabled />
                </div>
              </div>
            </div>
          </div>
          
          {/* Check Button */}
          <div className="flex justify-end mt-6">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-8 rounded-full text-lg shadow transition-colors">
              Check
            </button>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default WealthCreation;