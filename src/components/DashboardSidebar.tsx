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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const recipeMenuItems = [
    { label: 'Wealth Creation', icon: '💰', href: '/dashboard/my-goal/wealth-creation' },
    { label: 'Emergency Fund', icon: '🛡️', href: '/dashboard/my-goal/emergency-fund' },
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
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-20 right-4 z-[999] bg-gradient-to-r from-purple-600 to-orange-500 text-white p-3 rounded-xl shadow-2xl hover:scale-110 transition-all duration-300 active:scale-95"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-80 lg:w-96
        bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
        border-r-2 border-purple-200 dark:border-gray-700 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto lg:overflow-y-visible
        relative
        h-screen lg:h-auto
      `}>
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-orange-400/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -ml-24 -mb-24"></div>

        <div className="p-6 relative z-10">
        {/* Logo/Brand Section */}
        {/* <div className="mb-8 pb-6 border-b-2 border-purple-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-blue-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-110 transition-all duration-300">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">IncomeGrow</h2>
              <p className="text-xs text-gray-600 font-semibold">Financial Planning</p>
            </div>
          </div>
        </div> */}

        <nav className="space-y-4">
          {/* Dashboard Link */}
          <div className="relative">
            <Link
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300 hover:shadow-xl group border-2 transform hover:scale-105 ${
                isDashboardActive
                  ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-white font-bold shadow-2xl scale-105 border-transparent'
                  : 'bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600 border-purple-200 dark:border-gray-600 shadow-lg'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110 ${
                isDashboardActive
                  ? 'bg-white/30 backdrop-blur-sm'
                  : 'bg-gradient-to-br from-blue-500 to-purple-600'
              }`}>
                <svg className={`w-6 h-6 ${isDashboardActive ? 'text-white' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className='text-lg font-bold'>Dashboard</span>
              {isDashboardActive && (
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              )}
            </Link>
          </div>

          {/* My Goal Dropdown */}
          <div className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-purple-200 dark:border-gray-600 overflow-hidden transform hover:shadow-2xl transition-all duration-300">
            <button
              onClick={() => setMyGoalOpen(!myGoalOpen)}
              className={`flex items-center justify-between w-full px-5 py-4 font-bold rounded-t-2xl transition-all duration-300 group ${
                isMyGoalActive
                  ? 'bg-gradient-to-r from-purple-500 to-orange-500 text-white shadow-lg'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-orange-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110 ${
                  isMyGoalActive
                    ? 'bg-white/30 backdrop-blur-sm'
                    : 'bg-gradient-to-br from-purple-500 to-orange-500'
                }`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <span className="text-lg">My Goals</span>
                <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-md ${
                  isMyGoalActive
                    ? 'bg-white/30 backdrop-blur-sm text-white'
                    : 'bg-gradient-to-r from-purple-500 to-orange-500 text-white'
                }`}>
                  {recipeMenuItems.length + 1}
                </span>
              </div>
              <svg
                className={`w-6 h-6 ${isMyGoalActive ? 'text-white' : 'text-gray-500'} transition-transform duration-300 ${myGoalOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu with Animation */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                myGoalOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-4 py-3 bg-gradient-to-b from-purple-100/50 via-blue-50/30 to-orange-50/30 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 space-y-2">
                {/* Goal Dashboard Link */}
                <Link
                  href="/dashboard/my-goal"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group border-2 transform hover:scale-105 ${
                    router.pathname === '/dashboard/my-goal'
                      ? 'bg-gradient-to-r from-purple-500 to-orange-500 text-white border-transparent font-bold shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 bg-white/80 dark:bg-gray-600/80 backdrop-blur-sm border-purple-200 dark:border-gray-500 hover:shadow-lg font-semibold'
                  }`}
                >
                  <span className="text-2xl group-hover:scale-125 transition-transform duration-200">🎯</span>
                  <span className="text-base font-bold">Goal Dashboard</span>
                  <svg className={`w-5 h-5 ml-auto transition-all duration-200 ${router.pathname === '/dashboard/my-goal' ? 'text-white opacity-100' : 'text-purple-400 opacity-0 group-hover:opacity-100'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                {/* Divider */}
                <div className="flex items-center gap-2 my-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400">GOALS</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
                </div>

                {recipeMenuItems.map((item, index) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group border-2 transform hover:scale-105 ${
                      router.pathname === item.href
                        ? 'bg-gradient-to-r from-purple-500 to-orange-500 text-white border-transparent font-bold shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 bg-white/60 dark:bg-gray-600/60 backdrop-blur-sm border-transparent hover:border-purple-200 dark:hover:border-gray-500 hover:shadow-md'
                    }`}
                    style={{ transitionDelay: myGoalOpen ? `${(index + 1) * 30}ms` : '0ms' }}
                  >
                    <span className="text-xl group-hover:scale-125 transition-transform duration-200">{item.icon}</span>
                    <span className="text-sm font-semibold">{item.label}</span>
                    <svg className={`w-4 h-4 ml-auto transition-all duration-200 ${router.pathname === item.href ? 'text-white opacity-100' : 'text-purple-400 opacity-0 group-hover:opacity-100'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Admin Panel Link (if admin) */}
          {isAdmin && (
            <div className="pt-6 mt-6 border-t-2 border-purple-200 dark:border-gray-700">
              <Link
                href="/admin"
                className="flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300 font-bold group border-2 transform hover:scale-105 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:text-red-600 border-red-200 dark:border-red-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 hover:border-red-400 shadow-lg hover:shadow-2xl"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-lg">Admin Panel</span>
                <svg className="w-5 h-5 ml-auto text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </aside>
    </>
  );
};

export default DashboardSidebar;
