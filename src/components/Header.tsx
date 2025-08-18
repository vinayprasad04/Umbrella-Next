import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';

const menu = [
  {
    label: 'Home'
  },
  {
    label: 'Products',
    submenu: [
      { name: 'Goal', href: '/products/goal' },
      { name: 'Course', href: '/products/course' },
      { name: 'Shares Research', href: '/products/shares-research' },
      { name: 'Blogs', href: '/products/blogs' },
      { name: 'Brokers Knowledge', href: '/products/brokers-knowledge' },
    ],
  },
  {
    label: 'Calculation',
    submenu: [
      { name: 'Lumpsum', href: '/calculation/lumpsum' },
      { name: 'SIP', href: '/calculation/sip' },
      { name: 'Goal Planner', href: '/calculation/goal-planner' },
      { name: 'Retirement Plan', href: '/calculation/eim' },
      { name: 'FD, RD, PF, NPS, SSY', href: '/calculation/fd-rd-pf-nps-ssy' },
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

export default function Header() {
  const router = useRouter();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitials, setUserInitials] = useState('');
  const [openUserMenu, setOpenUserMenu] = useState(false);

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

  return (
    <header className="bg-white/95 backdrop-blur-md py-4 shadow-sm border-b border-gray-100 sticky top-0 z-[1000] transition-all duration-300">
      <div className="w-full max-w-[1600px] mx-auto px-6 flex justify-between items-center">
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
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-[#FF6B2C] group-hover:to-[#FF8A50] transition-all duration-300">
              Umbrella
            </span>
            <span className="text-xs text-gray-500 font-medium -mt-1">Financial Freedom</span>
          </div>
        </Link>
        
        <nav className="flex items-center gap-1">
          {/* Dashboard link - only show when logged in */}
          {isLoggedIn && (
            <Link 
              href="/dashboard"
              className={`no-underline font-medium px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-1 ${
                router.pathname === '/dashboard' || router.pathname.startsWith('/recipe') 
                  ? 'text-[#FF6B2C] bg-orange-50 shadow-sm' 
                  : 'text-gray-700 hover:text-[#FF6B2C] hover:bg-gray-50'
              }`}
            >
              Dashboard
            </Link>
          )}
          
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
                      ? 'text-[#FF6B2C] bg-orange-50 shadow-sm' 
                      : 'text-gray-700 hover:text-[#FF6B2C] hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ) : item.label === 'Products' ? (
                <Link 
                  href="/products" 
                  className={`no-underline font-medium px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-1 ${
                    router.pathname === '/products' || router.pathname.startsWith('/products') 
                      ? 'text-[#FF6B2C] bg-orange-50 shadow-sm' 
                      : 'text-gray-700 hover:text-[#FF6B2C] hover:bg-gray-50'
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
                  className="no-underline font-medium text-gray-700 hover:text-[#FF6B2C] hover:bg-gray-50 transition-all duration-200 flex items-center gap-1 px-4 py-2 rounded-lg border-0 bg-transparent cursor-pointer"
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
                <div className="absolute top-full left-0 mt-0 bg-white border border-gray-100 rounded-xl shadow-xl py-2 min-w-[220px] z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 mb-2">
                    {item.label}
                  </div>
                  {item.submenu.map((subItem, subIndex) => {
                    if (typeof subItem === 'object' && subItem.href) {
                      return (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="flex items-center px-4 py-2.5 mx-2 text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-50 hover:text-[#FF6B2C] transition-all duration-200 no-underline rounded-lg group/item"
                        >
                          <span className="w-2 h-2 bg-gray-300 rounded-full mr-3 group-hover/item:bg-[#FF6B2C] transition-colors duration-200"></span>
                          {subItem.name}
                        </Link>
                      );
                    } else {
                      return (
                        <a
                          key={subIndex}
                          href="#"
                          className="flex items-center px-4 py-2.5 mx-2 text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-50 hover:text-[#FF6B2C] transition-all duration-200 no-underline rounded-lg group/item"
                        >
                          <span className="w-2 h-2 bg-gray-300 rounded-full mr-3 group-hover/item:bg-[#FF6B2C] transition-colors duration-200"></span>
                          {typeof subItem === 'string' ? subItem : ''}
                        </a>
                      );
                    }
                  })}
                </div>
              )}
            </div>
          ))}
          
          {/* Authentication Section */}
          <div className="ml-4 pl-4 border-l border-gray-200">
            {isLoggedIn ? (
              <div className="relative" id="user-menu-container">
                <div 
                  onClick={handleUserMenuToggle}
                  className="bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] text-white w-11 h-11 rounded-xl flex items-center justify-center font-bold hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <span className="relative z-10">{userInitials}</span>
                </div>
                
                {openUserMenu && (
                  <div className="absolute top-full right-0 mt-3 bg-white/95 backdrop-blur-md border border-gray-100 rounded-xl shadow-xl py-3 min-w-[180px] z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-gray-100 mb-2">
                      <div className="text-sm font-semibold text-gray-800">Account</div>
                      <div className="text-xs text-gray-500">Manage your profile</div>
                    </div>
                    <Link href="/profile" className="flex items-center px-4 py-2.5 mx-2 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-50 hover:text-blue-600 transition-all duration-200 no-underline rounded-lg group/item">
                      <svg className="w-4 h-4 mr-3 group-hover/item:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </Link>
                    <Link href="/settings" className="flex items-center px-4 py-2.5 mx-2 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-50 hover:text-purple-600 transition-all duration-200 no-underline rounded-lg group/item">
                      <svg className="w-4 h-4 mr-3 group-hover/item:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </Link>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <div 
                        className="flex items-center px-4 py-2.5 mx-2 text-red-500 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-50 hover:text-red-600 transition-all duration-200 cursor-pointer rounded-lg group/item" 
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
              <Link href="/login" className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 no-underline">
                Get Started
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}