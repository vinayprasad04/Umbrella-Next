import React from 'react';
import Link from 'next/link';

const menu = [
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

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-20 pb-10">
      <div className="w-full max-w-[1600px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="mb-6">
              <span className="text-4xl font-bold text-[#FF6B2C]">Umbrella</span>
            </div>
            <p className="text-gray-400 text-base leading-relaxed mb-6">
              Empowering your financial journey with the best tools, research, and knowledge to achieve your financial goals.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#FF6B2C] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e85d1f] transition-colors">
                <span className="text-white text-sm font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-[#FF6B2C] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e85d1f] transition-colors">
                <span className="text-white text-sm font-bold">t</span>
              </div>
              <div className="w-10 h-10 bg-[#FF6B2C] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e85d1f] transition-colors">
                <span className="text-white text-sm font-bold">in</span>
              </div>
            </div>
          </div>
          
          {menu.map((item, index) => (
            <div key={index} className="md:col-span-1">
              <h3 className="text-white text-lg font-bold mb-6">{item.label}</h3>
              {item.submenu ? (
                <ul className="space-y-3">
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <a 
                        href="#" 
                        className="text-gray-400 hover:text-[#FF6B2C] transition-colors text-base no-underline"
                      >
                        {subItem}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-[#FF6B2C] transition-colors text-base no-underline"
                    >
                      {item.label}
                    </a>
                  </li>
                </ul>
              )}
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-base">
              © 2025 Umbrella. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-[#FF6B2C] transition-colors text-base no-underline">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-[#FF6B2C] transition-colors text-base no-underline">
                Terms of Service
              </Link>
            </div>
          </div>
          <p className="text-[#FF6B2C] text-base text-center md:text-left mt-4">
            Made with ❤️ by our financial Team
          </p>
        </div>
      </div>
    </footer>
  );
}