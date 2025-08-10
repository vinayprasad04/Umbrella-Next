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
      'Goal',
      'Course',
      'Shares Research',
      'Blogs',
      'Brokers knowledge',
    ],
  },
  {
    label: 'Calculation',
    submenu: [
      'Lumpsum',
      'SIP',
      'Goal Planner',
      'EIM',
      'FD, RD, PF, NPS, SSY',
      'OTHER',
    ],
  },
  {
    label: 'Tax Knowledge',
    submenu: ['Tax haven'],
  },
  {
    label: 'Support',
    submenu: ['Contact us', 'Faq'],
  }
];

export default function Header() {
  const router = useRouter();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userInitials, setUserInitials] = useState('');
  const [openUserMenu, setOpenUserMenu] = useState(false);

  useEffect(() => {
    // Check if user is logged in (you can implement your auth logic here)
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    const storedUserName = localStorage.getItem('userName') || 'John Doe';
    
    setIsLoggedIn(loggedIn);
    setUserName(storedUserName);
    
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
    <header className="bg-white py-2.5 border-b border-gray-200 sticky top-0 z-[1000]">
      <div className="w-full max-w-[1600px] mx-auto px-5 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <div className="text-2xl">
            <Image
              src="/logo.png"
              alt="Financial planning and investment illustration"
              width={40}
              height={38}
              priority
              className="w-full h-full object-cover rounded-2xl"
          />
          </div>
          <span className="text-2xl font-bold text-gray-800 hover:text-[#FF6B2C] transition-colors">Umbrella</span>
        </Link>
        
        <nav className="flex items-center gap-8">
          {/* Dashboard link - only show when logged in */}
          {isLoggedIn && (
            <Link 
              href="/dashboard"
              className={`no-underline font-medium hover:text-[#FF6B2C] transition-colors flex items-center gap-1 ${
                router.pathname === '/dashboard' || router.pathname.startsWith('/recipe') ? 'text-[#FF6B2C]' : 'text-gray-800'
              }`}
            >
              Dashboard
            </Link>
          )}
          
          {menu.map((item, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => item.submenu && handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              {item.label === 'Home' ? (
                <Link 
                  href="/" 
                  className={`no-underline font-medium hover:text-[#e85d1f] transition-colors flex items-center gap-1 ${
                    router.pathname === '/' ? 'text-[#FF6B2C]' : 'text-gray-800'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <a 
                  href="#" 
                  className="no-underline font-medium text-gray-800 hover:text-[#FF6B2C] transition-colors flex items-center gap-1"
                >
                  {item.label}
                  {item.submenu && (
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </a>
              )}
              
              {item.submenu && openSubmenu === item.label && (
                <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[200px] z-50">
                  {item.submenu.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-50 hover:text-[#FF6B2C] transition-colors no-underline"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* Authentication Section */}
          {isLoggedIn ? (
            <div className="relative" id="user-menu-container">
              <div 
                onClick={handleUserMenuToggle}
                className="bg-[#FF6B2C] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold hover:bg-[#e85d1f] transition-colors cursor-pointer"
              >
                {userInitials}
              </div>
              
              {openUserMenu && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[160px] z-50">
                  <Link href="/profile" className="block px-4 py-2 text-gray-700 font-semibold cursor-pointer hover:bg-orange-50 no-underline">
                    Profile
                  </Link>
                  <Link href="/settings" className="block px-4 py-2 text-gray-700 font-semibold cursor-pointer hover:bg-orange-50 no-underline">
                    Settings
                  </Link>
                  <div 
                    className="px-4 py-2 text-red-500 font-semibold cursor-pointer hover:bg-orange-100" 
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="bg-[#FF6B2C] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#e85d1f] transition-colors no-underline">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}