import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface DashboardSidebarProps {
  currentPage?: 'dashboard' | 'my-goal';
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ currentPage = 'dashboard' }) => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [myGoalOpen, setMyGoalOpen] = useState(true);

  const recipeMenuItems = [
    { label: 'Wealth Creation', icon: '💰', href: '/dashboard/my-goal/wealth-creation' },
    { label: 'Retirement', icon: '🛒', href: '/dashboard/my-goal/retirement' },
    { label: 'House', icon: '🏠', href: '/dashboard/my-goal/house' },
    { label: 'Car', icon: '🚗', href: '/dashboard/my-goal/car' },
    { label: 'Self Education', icon: '🎓', href: '/dashboard/my-goal/self-education' },
    { label: "Child's Education", icon: '👨‍🎓', href: '/dashboard/my-goal/child-education' },
    { label: "Child's Wedding", icon: '💍', href: '/dashboard/my-goal/child-wedding' },
    { label: 'Vacation', icon: '🏖️', href: '/dashboard/my-goal/vacation' },
  ];

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    const userEmail = localStorage.getItem('userEmail') || '';
    setIsAdmin(userRole === 'admin' && userEmail === 'vinay.qss@gmail.com');

    // Auto-open My Goals if on my-goal page
    if (currentPage === 'my-goal' || router.pathname.startsWith('/dashboard/my-goal')) {
      setMyGoalOpen(true);
    }
  }, [currentPage, router.pathname]);

  const isDashboardActive = currentPage === 'dashboard' && router.pathname === '/dashboard';
  const isMyGoalActive = currentPage === 'my-goal' || router.pathname.startsWith('/dashboard/my-goal');

  return (
    <aside className="w-96 bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 shadow-lg">
      <div className="p-6">
        {/* Logo/Brand Section */}
        {/* <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">IncomeGrow</h2>
              <p className="text-xs text-gray-500">Financial Planning</p>
            </div>
          </div>
        </div> */}

        <nav className="space-y-3">
          {/* Dashboard Link */}
          <div className="relative">
            {/* {isDashboardActive && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF6B2C] to-[#FF8A50] rounded-r-full"></div>
            )} */}
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 hover:shadow-md group ${
                isDashboardActive
                  ? 'bg-gradient-to-r from-orange-50 to-transparent text-[#FF6B2C] font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow ${
                isDashboardActive
                  ? 'bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50]'
                  : 'bg-gray-200'
              }`}>
                <svg className={`w-5 h-5 ${isDashboardActive ? 'text-white' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className='text-base font-semibold'>Dashboard</span>
            </Link>
          </div>

          {/* My Goal Dropdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              onClick={() => setMyGoalOpen(!myGoalOpen)}
              className={`flex items-center justify-between w-full px-4 py-3.5 font-semibold rounded-t-xl transition-all duration-300 group ${
                isMyGoalActive
                  ? 'bg-gradient-to-r from-purple-50 to-transparent text-purple-600'
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow ${
                  isMyGoalActive
                    ? 'bg-gradient-to-br from-purple-500 to-indigo-600'
                    : 'bg-gradient-to-br from-purple-400 to-indigo-500'
                }`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <span>My Goals</span>
                <span className={`ml-auto px-2 py-0.5 text-xs font-bold rounded-full ${
                  isMyGoalActive
                    ? 'bg-purple-200 text-purple-700'
                    : 'bg-purple-100 text-purple-600'
                }`}>
                  {recipeMenuItems.length + 1}
                </span>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${myGoalOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu with Animation */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                myGoalOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-3 py-2 bg-gradient-to-b from-purple-50/50 to-white space-y-1">
                {/* Goal Dashboard Link */}
                <Link
                  href="/dashboard/my-goal"
                  className={`flex items-center gap-3 pr-2 py-2.5 text-sm rounded-lg transition-all duration-200 group border ${
                    router.pathname === '/dashboard/my-goal'
                      ? 'bg-purple-100 text-purple-700 border-purple-300 font-semibold'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-white border-transparent hover:border-purple-200 hover:shadow-sm font-semibold'
                  }`}
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-200">🎯</span>
                  <span className="text-base font-semibold">Goal Dashboard</span>
                  <svg className="w-4 h-4 ml-auto text-gray-300 group-hover:text-purple-600 opacity-0 group-hover:opacity-100 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                {/* Divider */}
                <div className="border-t border-purple-200 my-2"></div>

                {recipeMenuItems.map((item, index) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 pr-2 py-2.5 text-sm rounded-lg transition-all duration-200 group border ${
                      router.pathname === item.href
                        ? 'bg-purple-100 text-purple-700 border-purple-300 font-semibold'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-white border-transparent hover:border-purple-200 hover:shadow-sm'
                    }`}
                    style={{ transitionDelay: myGoalOpen ? `${(index + 1) * 30}ms` : '0ms' }}
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                    <span className="text-base font-medium">{item.label}</span>
                    <svg className="w-4 h-4 ml-auto text-gray-300 group-hover:text-purple-600 opacity-0 group-hover:opacity-100 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Admin Panel Link (if admin) */}
          {isAdmin && (
            <div className="pt-6 mt-6 border-t border-gray-200">
              <Link
                href="/admin"
                className="flex items-center gap-3 px-4 py-3.5 text-gray-700 hover:text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent rounded-xl transition-all duration-300 font-semibold group border border-transparent hover:border-red-200 hover:shadow-md"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span>Admin Panel</span>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
