import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DashboardLayout from '@/components/DashboardLayout';
import { logActivity } from '@/lib/activityLogger';
import type { NextPageWithLayout } from './_app';

const Dashboard: NextPageWithLayout = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
      const userEmail = localStorage.getItem('userEmail') || '';
      const userId = localStorage.getItem('userId') || '';

      if (!isLoggedIn) {
        router.push('/login');
        return;
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

  return (
    <>
      <Head>
        <title>Dashboard - IncomeGrow</title>
        <meta name="description" content="Welcome to your IncomeGrow dashboard. Access our financial tools and services." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      {/* Content Area - Only this part will reload */}
      <div className="flex-1 px-8 py-8 overflow-y-auto">
            {/* Breadcrumb */}
            <div className="text-xs text-gray-400 mb-4 flex items-center gap-1">
              <span className="text-[#FF6B2C] font-semibold">Dashboard</span>
            </div>

            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">Dashboard</h1>
              <p className="text-base text-gray-700">Welcome to IncomeGrow. Access our state of the art products from here.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              
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
