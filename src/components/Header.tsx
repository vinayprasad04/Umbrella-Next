import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';

const menu = [
  {
    label: 'Home'
  },
  {
    label: 'Products',
    submenu: [
      { name: 'Goal', href: '/products/goal' },
      { name: 'Course', href: '/products/course' },
      { name: 'Shares Research', href: 'https://www.stock.incomegrow.in/', external: true },
      { name: 'Unlisted Companies', href: '/unlisted-companies' },
      { name: 'Blogs', href: '/products/blogs' },
      { name: 'Brokers Knowledge', href: '/products/brokers-knowledge' },
    ],
  },
  {
    label: 'Calculator',
    submenu: [
      { name: 'Lumpsum', href: '/calculation/lumpsum' },
      { name: 'SIP', href: '/calculation/sip' },
      { name: 'Goal Planner', href: '/calculation/goal-planner' },
      { name: 'Retirement Plan', href: '/calculation/eim' },
      { name: 'Fixed Deposit (FD)', href: '/calculation/fd' },
      { name: 'Recurring Deposit (RD)', href: '/calculation/rd' },
      { name: 'Provident Fund (PF)', href: '/calculation/pf' },
      { name: 'National Pension (NPS)', href: '/calculation/nps' },
      { name: 'Sukanya Samriddhi (SSY)', href: '/calculation/ssy' },
      { name: 'Income Tax Calculator', href: '/calculation/tax' },
      { name: 'Gratuity Calculator', href: '/calculation/gratuity' },
      { name: 'OTHER', href: '/calculation/other' },
    ],
  },
  {
    label: 'Tax Knowledge',
    submenu: [
      { name: 'Tax Planning Guide', href: '/tax-planning' },
      { name: 'Tax Haven', href: '/tax-knowledge/tax-haven' }
    ],
  },
  {
    label: 'Support',
    submenu: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact Us', href: '/support/contact-us' },
      { name: 'FAQ', href: '/support/faq' }
    ],
  }
];

export default function Header({dashboard=false}: {dashboard?: boolean}) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitials, setUserInitials] = useState('');
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Check if user is logged in (you can implement your auth logic here)
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    const storedUserName = localStorage.getItem('userName') || 'John Doe';
    
    setIsLoggedIn(loggedIn);
    
    // Generate initials from name
    const initials = storedUserName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
    setUserInitials(initials);
  }, []);

  useEffect(() => {
    // Close user menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const userMenuElement = document.getElementById('user-menu-container');
      
      if (openUserMenu && userMenuElement && !userMenuElement.contains(target)) {
        setOpenUserMenu(false);
      }
    };

    if (openUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openUserMenu]);

  const handleMouseEnter = (label: string) => {
    setOpenSubmenu(label);
  };

  const handleMouseLeave = () => {
    setOpenSubmenu(null);
  };

  const handleUserMenuToggle = () => {
    setOpenUserMenu(!openUserMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setOpenUserMenu(false);
    router.push('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setMobileSubmenuOpen(null);
  };

  const toggleMobileSubmenu = (label: string) => {
    setMobileSubmenuOpen(mobileSubmenuOpen === label ? null : label);
  };

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md py-3 sm:py-4 shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-[1000] transition-all duration-300">
      <div className={`w-full mx-auto px-4 sm:px-6 flex items-center justify-between ${dashboard ? '' : ' max-w-[1600px]'} `}>
        <Link href="/" className="flex items-center gap-2 sm:gap-3 no-underline group">
          <div className="relative">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="incomeGrow Financial Logo"
                width={28}
                height={26}
                priority
                className="w-6 h-5 sm:w-7 sm:h-6.5 object-contain filter brightness-0 invert"
              />
            </div>
          </div>
          <div className="flex flex-col">
             <Image
                src="/logo.svg"
                alt="incomeGrow Financial Logo"
                width={150}
                height={50}
                priority
                className="h-8 sm:h-auto w-auto"
              />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">

          
          {menu.map((item, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => item.submenu && handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              {item.label === 'Home' ? (
                <Link
                  href="/"
                  className={`no-underline font-medium px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-1 ${
                    router.pathname === '/'
                      ? 'text-[#FF6B2C] bg-orange-50 dark:bg-orange-900/30 shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:text-[#FF6B2C] hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </Link>
              ) : item.label === 'Products' ? (
                <Link
                  href="/products"
                  className={`no-underline font-medium px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-1 ${
                    router.pathname === '/products' || router.pathname.startsWith('/products')
                      ? 'text-[#FF6B2C] bg-orange-50 dark:bg-orange-900/30 shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:text-[#FF6B2C] hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                  {item.submenu && (
                    <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${openSubmenu === item.label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
              ) : (
                <button
                  className="no-underline font-medium text-gray-700 dark:text-gray-300 hover:text-[#FF6B2C] hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 flex items-center gap-1 px-4 py-2 rounded-lg border-0 bg-transparent cursor-pointer"
                >
                  {item.label}
                  {item.submenu && (
                    <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${openSubmenu === item.label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
              )}
              
              {item.submenu && openSubmenu === item.label && (
                <div className="absolute top-full left-0 mt-0 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl py-2 min-w-[260px] z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 mb-2">
                    {item.label}
                  </div>
                  {item.submenu.map((subItem, subIndex) => {
                    if (typeof subItem === 'object' && subItem.href) {
                      // Check if it's an external link
                      if (subItem.external) {
                        return (
                          <a
                            key={subIndex}
                            href={subItem.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-4 py-2.5 mx-2 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-50 dark:hover:from-orange-900/30 dark:hover:to-orange-900/30 hover:text-[#FF6B2C] transition-all duration-200 no-underline rounded-lg group/item"
                          >
                            <span className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 group-hover/item:bg-[#FF6B2C] transition-colors duration-200"></span>
                            {subItem.name}
                            <svg className="w-3 h-3 ml-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        );
                      }
                      return (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="flex items-center px-4 py-2.5 mx-2 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-50 dark:hover:from-orange-900/30 dark:hover:to-orange-900/30 hover:text-[#FF6B2C] transition-all duration-200 no-underline rounded-lg group/item"
                        >
                          <span className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 group-hover/item:bg-[#FF6B2C] transition-colors duration-200"></span>
                          {subItem.name}
                        </Link>
                      );
                    } else {
                      return (
                        <a
                          key={subIndex}
                          href="#"
                          className="flex items-center px-4 py-2.5 mx-2 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-50 dark:hover:from-orange-900/30 dark:hover:to-orange-900/30 hover:text-[#FF6B2C] transition-all duration-200 no-underline rounded-lg group/item"
                        >
                          <span className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 group-hover/item:bg-[#FF6B2C] transition-colors duration-200"></span>
                          {typeof subItem === 'string' ? subItem : ''}
                        </a>
                      );
                    }
                  })}
                </div>
              )}
            </div>
          ))}
          
          {/* Authentication Section - Desktop */}
                    {/* Dashboard link - only show when logged in */}
          {isLoggedIn && (
            <Link
              href="/dashboard"
              className={`no-underline font-medium px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-1 ${
                router.pathname === '/dashboard' || router.pathname.startsWith('/recipe')
                  ? 'text-[#FF6B2C] bg-orange-50 dark:bg-orange-900/30 shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:text-[#FF6B2C] hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              Dashboard
            </Link>
          )}

          {/* Dark Mode Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          )}

          <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
            {isLoggedIn ? (
              <div className="relative" id="user-menu-container">
                <div
                  onClick={handleUserMenuToggle}
                  className="bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] text-white w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center font-bold hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <span className="relative z-10 text-sm sm:text-base">{userInitials}</span>
                </div>

                {openUserMenu && (
                  <div className="absolute top-full right-0 mt-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl py-3 min-w-[180px] z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 mb-2">
                      <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">Account</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Manage your profile</div>
                    </div>
                    <Link href="/profile" className="flex items-center px-4 py-2.5 mx-2 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-50 dark:hover:from-blue-900/30 dark:hover:to-blue-900/30 hover:text-blue-600 transition-all duration-200 no-underline rounded-lg group/item">
                      <svg className="w-4 h-4 mr-3 group-hover/item:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </Link>
                    <Link href="/settings" className="flex items-center px-4 py-2.5 mx-2 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-50 dark:hover:from-purple-900/30 dark:hover:to-purple-900/30 hover:text-purple-600 transition-all duration-200 no-underline rounded-lg group/item">
                      <svg className="w-4 h-4 mr-3 group-hover/item:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </Link>
                    <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
                      <div
                        className="flex items-center px-4 py-2.5 mx-2 text-red-500 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-50 dark:hover:from-red-900/30 dark:hover:to-red-900/30 hover:text-red-600 transition-all duration-200 cursor-pointer rounded-lg group/item"
                        onClick={handleLogout}
                      >
                        <svg className="w-4 h-4 mr-3 group-hover/item:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 no-underline">
                Get Started
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-3">
          {/* Dark Mode Toggle - Mobile */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          )}

          {/* Mobile Auth Button */}
          {isLoggedIn && (
            <div
              onClick={handleUserMenuToggle}
              className="bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] text-white w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm cursor-pointer"
            >
              {userInitials}
            </div>
          )}

          <button
            onClick={toggleMobileMenu}
            className="p-2 text-gray-700 dark:text-gray-300 hover:text-[#FF6B2C] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[60px] h-[calc(100vh-60px)] z-[999] bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-y-auto transition-all duration-300 ease-out ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-20 right-10 w-64 h-64 bg-gradient-to-r from-[#FF6B2C]/10 to-[#FF8A50]/10 rounded-full blur-3xl transition-opacity duration-700 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}></div>
          <div className={`absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl transition-opacity duration-1000 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>

        {mobileMenuOpen && (
          <nav className="relative px-6 py-6 space-y-3 animate-in slide-in-from-top-2 fade-in duration-500 delay-100">
            {/* Dashboard Link - Mobile */}
            {isLoggedIn && (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`group flex items-center gap-3 px-5 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 no-underline shadow-sm ${
                  router.pathname === '/dashboard' || router.pathname.startsWith('/recipe')
                    ? 'text-white bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] shadow-lg scale-105'
                    : 'text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 hover:shadow-md hover:scale-102'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  router.pathname === '/dashboard' || router.pathname.startsWith('/recipe')
                    ? 'bg-white/20'
                    : 'bg-gradient-to-br from-[#FF6B2C]/10 to-[#FF8A50]/10 group-hover:from-[#FF6B2C]/20 group-hover:to-[#FF8A50]/20'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                Dashboard
              </Link>
            )}

            {/* Home Link */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`group flex items-center gap-3 px-5 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 no-underline shadow-sm ${
                router.pathname === '/'
                  ? 'text-white bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] shadow-lg scale-105'
                  : 'text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 hover:shadow-md hover:scale-102'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                router.pathname === '/'
                  ? 'bg-white/20'
                  : 'bg-gradient-to-br from-blue-400/10 to-blue-600/10 group-hover:from-blue-400/20 group-hover:to-blue-600/20'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              Home
            </Link>

            {/* Menu Items with Submenus */}
            {menu.slice(1).map((item, index) => {
              const icons = {
                'Products': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
                'Calculation': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
                'Tax Knowledge': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                'Support': <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              };

              return (
                <div key={index} className="space-y-2">
                  {item.label === 'Products' ? (
                    <>
                      <Link
                        href="/products"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`group flex items-center justify-between px-5 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 no-underline shadow-sm ${
                          router.pathname === '/products' || router.pathname.startsWith('/products')
                            ? 'text-white bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg scale-105'
                            : 'text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                            router.pathname === '/products' || router.pathname.startsWith('/products')
                              ? 'bg-white/20'
                              : 'bg-gradient-to-br from-purple-400/10 to-purple-600/10 group-hover:from-purple-400/20 group-hover:to-purple-600/20'
                          }`}>
                            {icons[item.label as keyof typeof icons]}
                          </div>
                          {item.label}
                        </div>
                        {item.submenu && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleMobileSubmenu(item.label);
                            }}
                            className="p-2 rounded-lg hover:bg-white/20 transition-all duration-200"
                          >
                            <svg
                              className={`w-5 h-5 transition-transform duration-300 ${
                                mobileSubmenuOpen === item.label ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        )}
                      </Link>
                    </>
                  ) : (
                    <button
                      onClick={() => toggleMobileSubmenu(item.label)}
                      className="w-full group flex items-center justify-between px-5 py-4 rounded-2xl font-semibold text-lg text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 hover:shadow-md transition-all duration-300 text-left shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300">
                          {icons[item.label as keyof typeof icons]}
                        </div>
                        {item.label}
                      </div>
                      {item.submenu && (
                        <svg
                          className={`w-5 h-5 transition-transform duration-300 ${
                            mobileSubmenuOpen === item.label ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>
                  )}


                  {/* Submenu Items */}
                  {item.submenu && mobileSubmenuOpen === item.label && (
                    <div className="ml-6 space-y-2 py-2 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                      {item.submenu.map((subItem, subIndex) => {
                        if (typeof subItem === 'object' && subItem.href) {
                          if (subItem.external) {
                            return (
                              <a
                                key={subIndex}
                                href={subItem.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-[#FF6B2C] bg-white/60 dark:bg-gray-800/60 hover:bg-orange-50 dark:hover:bg-orange-900/30 rounded-xl transition-all duration-200 no-underline text-base shadow-sm"
                              >
                                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 group-hover:bg-[#FF6B2C] rounded-full transition-colors duration-200"></div>
                                <span className="flex-1">{subItem.name}</span>
                                <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            );
                          }
                          return (
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="group flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-[#FF6B2C] bg-white/60 dark:bg-gray-800/60 hover:bg-orange-50 dark:hover:bg-orange-900/30 rounded-xl transition-all duration-200 no-underline text-base shadow-sm"
                            >
                              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 group-hover:bg-[#FF6B2C] rounded-full transition-colors duration-200"></div>
                              <span>{subItem.name}</span>
                            </Link>
                          );
                        }
                        return null;
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile Auth Section */}
            {!isLoggedIn && (
              <div className="pt-6 mt-6 border-t-2 border-gray-200 dark:border-gray-700">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-center justify-center gap-3 w-full bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 no-underline"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile User Menu */}
            {isLoggedIn && (
              <div className="pt-6 mt-6 space-y-3 border-t-2 border-gray-200 dark:border-gray-700">
                <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl border border-blue-100 dark:border-blue-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {userInitials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">Your Account</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Manage your profile</div>
                    </div>
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-center gap-3 px-5 py-4 text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 rounded-2xl transition-all duration-300 no-underline shadow-sm hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300 flex items-center justify-center transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-lg">Profile</span>
                </Link>

                <Link
                  href="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-center gap-3 px-5 py-4 text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 rounded-2xl transition-all duration-300 no-underline shadow-sm hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 group-hover:from-purple-200 group-hover:to-purple-300 flex items-center justify-center transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-lg">Settings</span>
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="group w-full flex items-center gap-3 px-5 py-4 text-red-500 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-100 to-red-200 group-hover:from-red-200 group-hover:to-red-300 flex items-center justify-center transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <span className="font-semibold text-lg">Logout</span>
                </button>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}