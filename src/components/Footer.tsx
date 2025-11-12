import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Subscribe from './Subscribe';

const menu = [
  {
    label: 'Products',
    submenu: [
      { name: 'Goal Planning', href: '/products/goal' },
      { name: 'Educational Courses', href: '/products/course' },
      { name: 'Market Research', href: 'https://www.stock.incomegrow.in/', external: true },
      { name: 'Unlisted Companies', href: '/unlisted-companies' },
      { name: 'Expert Insights', href: '/products/blogs' },
      { name: 'Broker Knowledge', href: '/products/brokers-knowledge' },
    ],
  },
  {
    label: 'Calculators',
    submenu: [
      { name: 'Lumpsum Calculator', href: '/calculation/lumpsum' },
      { name: 'SIP Calculator', href: '/calculation/sip' },
      { name: 'Goal Planner', href: '/calculation/goal-planner' },
      { name: 'Retirement Plan', href: '/calculation/eim' },
      { name: 'FD, RD, PF, NPS, SSY', href: '/calculation/fd-rd-pf-nps-ssy' },
      { name: 'Tax Calculator', href: '/calculation/tax' },
      { name: 'Gratuity Calculator', href: '/calculation/gratuity' },
      { name: 'Other Tools', href: '/calculation/other' },
    ],
  },
  {
    label: 'Resources',
    submenu: [
      { name: 'Tax Planning Guide', href: '/tax-planning' },
      // { name: 'Tax Haven Guide', href: '/tax-knowledge/tax-haven' },
      // { name: 'Investment Guides', href: '/recipe/wealth-creation' },
      // { name: 'Market Updates', href: '/dashboard' },
      { name: 'Financial News', href: '/products/blogs' },
    ],
  },
  {
    label: 'Support',
    submenu: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact Us', href: '/support/contact-us' },
      { name: 'FAQ', href: '/support/faq' },
    ],
  }
];

const socialLinks = [
  {
    name: 'Facebook',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    href: '#'
  },
  {
    name: 'Twitter',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    ),
    href: '#'
  },
  {
    name: 'LinkedIn',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    href: '#'
  },
  {
    name: 'Instagram',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.73-3.016-1.804C4.851 14.39 4.64 13.49 4.64 12.017c0-1.474.211-2.373.793-3.167.568-1.074 1.719-1.804 3.016-1.804 1.297 0 2.448.73 3.016 1.804.582.794.793 1.693.793 3.167 0 1.473-.211 2.373-.793 3.167-.568 1.074-1.719 1.804-3.016 1.804zm7.5-9.108c-.711 0-1.288-.577-1.288-1.288s.577-1.288 1.288-1.288 1.288.577 1.288 1.288-.577 1.288-1.288 1.288zm3.5 2.147c0 4.411-3.589 8-8 8s-8-3.589-8-8 3.589-8 8-8 8 3.589 8 8z"/>
      </svg>
    ),
    href: '#'
  },
  {
    name: 'YouTube',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    href: '#'
  }
];

export default function Footer() {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Background decoration - Hidden on mobile */}
      <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-[#FF6B2C]/5 to-[#FF8A50]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Newsletter Section */}
        <Subscribe variant="footer" />

        {/* Main Footer Content */}
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12 md:mb-16">
            {/* Company Info */}
            <div className="sm:col-span-2 lg:col-span-2 space-y-6 sm:space-y-8">
              <div>
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] rounded-xl shadow-lg flex items-center justify-center">
                    <Image
                      src="/logo.png"
                      alt="IncomeGrow Financial Logo"
                      width={28}
                      height={26}
                      priority
                      className="w-7 h-6.5 object-contain filter brightness-0 invert"
                    />
                  </div>
                  <div>
                   <Image
                      src="/logo_white.svg"
                      alt="incomeGrow Financial Logo"
                      width={150}
                      height={50}
                      priority
                    />
                  </div>
                </div>


                <p className="text-gray-300 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                  Empowering your financial journey with cutting-edge tools, expert research, and personalized guidance.
                  Join thousands who trust IncomeGrow for smarter financial decisions.
                </p>

                {/* Contact Info */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3 text-gray-300 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6B2C] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Krishan Vihar, Delhi, India</span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 text-gray-300 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6B2C] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="break-all">vinay.qss@gmail.com</span>
                  </div>
                  
                  {/* <div className="flex items-center gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-[#FF6B2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+91 98765 43210</span>
                  </div> */}
                </div>
              </div>
              
              {/* Social Links */}
              {/* <div>
                <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social, index) => (
                    <a 
                      key={index}
                      href={social.href} 
                      className="group w-11 h-11 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-[#FF6B2C] hover:to-[#FF8A50] hover:border-[#FF6B2C]/50 transition-all duration-300 hover:scale-110"
                      title={social.name}
                    >k
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div> */}
            </div>
            
            {/* Navigation Menus */}
            {menu.map((item, index) => (
              <div key={index} className="space-y-3 sm:space-y-4">
                <h3 className="text-white text-base sm:text-lg font-bold mb-4 sm:mb-6 relative">
                  {item.label}
                  <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] rounded-full"></div>
                </h3>
                {/* Support section gets horizontal layout, others keep vertical */}
                {item.label === 'Support' ? (
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {item.submenu.map((subItem, subIndex) => (
                      subItem.external ? (
                        <a
                          key={subIndex}
                          href={subItem.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-[#FF6B2C] transition-colors duration-200 text-sm no-underline whitespace-nowrap"
                        >
                          {subItem.name}
                        </a>
                      ) : (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="text-gray-400 hover:text-[#FF6B2C] transition-colors duration-200 text-sm no-underline whitespace-nowrap"
                        >
                          {subItem.name}
                        </Link>
                      )
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        {subItem.external ? (
                          <a
                            href={subItem.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group text-gray-400 hover:text-white transition-all duration-200 flex items-center gap-2 no-underline"
                          >
                            <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-[#FF6B2C] group-hover:scale-150 transition-all duration-200"></span>
                            {subItem.name}
                          </a>
                        ) : (
                          <Link
                            href={subItem.href}
                            className="group text-gray-400 hover:text-white transition-all duration-200 flex items-center gap-2 no-underline"
                          >
                            <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-[#FF6B2C] group-hover:scale-150 transition-all duration-200"></span>
                            {subItem.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-700/50 backdrop-blur-sm">
          <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
                <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
                  © 2025 IncomeGrow Financial Services. All rights reserved.
                </p>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-xs sm:text-sm text-gray-500">Secured by</span>
                  <div className="px-2 sm:px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                    <span className="text-xs font-semibold text-green-400">SSL 256-bit</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm">
                <Link href="/privacy-policy" className="text-gray-400 hover:text-[#FF6B2C] transition-colors no-underline whitespace-nowrap">
                  Privacy Policy
                </Link>
                <Link href="/terms-of-service" className="text-gray-400 hover:text-[#FF6B2C] transition-colors no-underline whitespace-nowrap">
                  Terms of Service
                </Link>
                <Link href="/cookie-policy" className="text-gray-400 hover:text-[#FF6B2C] transition-colors no-underline whitespace-nowrap">
                  Cookie Policy
                </Link>
                <Link href="/sitemap" className="text-gray-400 hover:text-[#FF6B2C] transition-colors no-underline">
                  Sitemap
                </Link>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-700/30 text-center">
              <p className="text-[#FF6B2C] font-medium text-sm sm:text-base">
                Made with <span className="text-red-400 animate-pulse">❤️</span> by our passionate financial team in India
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-3 sm:mt-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>All systems operational</span>
                </div>
                <div className="hidden sm:block text-gray-600">|</div>
                <div className="text-gray-400">
                  Last updated: {currentDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}