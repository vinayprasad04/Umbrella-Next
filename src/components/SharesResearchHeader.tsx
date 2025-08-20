import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';

const sharesTradingMenu = [
  { label: 'Home', href: '/' },
  { label: 'Stock', href: '/products/shares-research' },
  { label: 'Mutual Fund', href: '/mutual-fund' },
  { label: 'Crypto', href: '/crypto' },
  { label: 'Scanner', href: '/scanner' }
];

export default function SharesResearchHeader() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitials, setUserInitials] = useState('');
  const [openUserMenu, setOpenUserMenu] = useState(false);

  useEffect(() => {
    // Check if user is logged in
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

  return (
    <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-2 shadow-xl border-b border-blue-800/50 sticky top-0 z-[1000] backdrop-blur-md">
      <div className="w-full max-w-[1600px] mx-auto px-6 flex justify-between items-center">
        {/* Dual Logo Section */}
        <div className="flex items-center gap-8">
          {/* Main Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] rounded-xl shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Umbrella Financial Logo"
                  width={28}
                  height={26}
                  priority
                  className="w-7 h-6.5 object-contain filter brightness-0 invert"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white group-hover:text-[#FF6B2C] transition-all duration-300">
                Umbrella
              </span>
              <span className="text-xs text-gray-300 font-medium -mt-1">Financial Freedom </span>
            </div>
          </Link>

          {/* Trading Logo */}
          <div className="h-8 w-px bg-gray-600"></div>
          <Link href="/products/shares-research" className="flex items-center gap-3 no-underline group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white text-lg">📈</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white group-hover:text-green-400 transition-all duration-300">
                Stock Analytics
              </span>
              <span className="text-xs text-gray-300 font-medium -mt-1">Trading Platform</span>
            </div>
          </Link>
        </div>
        
        {/* Navigation Menu */}
        <nav className="flex items-center gap-2">
          {sharesTradingMenu.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`no-underline font-medium px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-1 ${
                (router.pathname === item.href || 
                 (item.label === 'Stock' && router.pathname === '/products/shares-research'))
                  ? 'text-[#FF6B2C] bg-[#FF6B2C]/10 shadow-sm border border-[#FF6B2C]/20' 
                  : 'text-gray-200 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
            >
              {item.label === 'Home' && '🏠'}
              {item.label === 'Stock' && '📊'}
              {item.label === 'Mutual Fund' && '📈'}
              {item.label === 'Crypto' && '₿'}
              {item.label === 'Scanner' && '🔍'}
              <span className="ml-1">{item.label}</span>
            </Link>
          ))}
          
          {/* Authentication Section */}
          <div className="ml-4 pl-4 border-l border-gray-600">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link 
                  href="/dashboard"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 no-underline flex items-center gap-2"
                >
                  <span>📊</span>
                  Dashboard
                </Link>
                
                <div className="relative" id="user-menu-container">
                  <div 
                    onClick={handleUserMenuToggle}
                    className="bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <span className="relative z-10 text-sm">{userInitials}</span>
                  </div>
                  
                  {openUserMenu && (
                    <div className="absolute top-full right-0 mt-3 bg-slate-800/95 backdrop-blur-md border border-gray-600 rounded-xl shadow-xl py-3 min-w-[180px] z-50 animate-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-2 border-b border-gray-600 mb-2">
                        <div className="text-sm font-semibold text-white">Account</div>
                        <div className="text-xs text-gray-400">Manage profile</div>
                      </div>
                      <Link href="/profile" className="flex items-center px-4 py-2.5 mx-2 text-gray-300 hover:bg-blue-600/20 hover:text-white transition-all duration-200 no-underline rounded-lg group/item">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                      </Link>
                      <Link href="/settings" className="flex items-center px-4 py-2.5 mx-2 text-gray-300 hover:bg-purple-600/20 hover:text-white transition-all duration-200 no-underline rounded-lg group/item">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </Link>
                      <div className="border-t border-gray-600 mt-2 pt-2">
                        <div 
                          className="flex items-center px-4 py-2.5 mx-2 text-red-400 hover:bg-red-600/20 hover:text-red-300 transition-all duration-200 cursor-pointer rounded-lg group/item" 
                          onClick={handleLogout}
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  href="/signup" 
                  className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 no-underline"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}