import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  description: string;
}

const menuItems: MenuItem[] = [
  {
    id: 'itr-filing-guide',
    title: 'ITR Filing Guide',
    icon: '📋',
    description: 'Choose the right ITR form based on your income sources'
  },
  {
    id: 'section-80c',
    title: 'Section 80C Investments',
    icon: '💰',
    description: 'Save up to ₹46,800 with ₹1.5L investments'
  },
  {
    id: 'health-insurance',
    title: 'Health Insurance (80D)',
    icon: '🏥',
    description: 'Tax benefits on health insurance premiums'
  },
  {
    id: 'home-loan',
    title: 'Home Loan Benefits',
    icon: '🏠',
    description: 'Principal & interest deductions'
  },
  {
    id: 'education-loan',
    title: 'Education Loan (80E)',
    icon: '🎓',
    description: 'Full interest deduction with no limits'
  },
  {
    id: 'nps-additional',
    title: 'NPS Additional (80CCD1B)',
    icon: '👴',
    description: 'Extra ₹50K deduction for retirement'
  },
  {
    id: 'donations',
    title: 'Donations (80G)',
    icon: '❤️',
    description: '50% or 100% deduction on donations'
  },
  {
    id: 'capital-gains',
    title: 'Capital Gains Planning',
    icon: '📈',
    description: 'Stock market tax optimization'
  },
  {
    id: 'salary-restructure',
    title: 'Salary Restructuring',
    icon: '💼',
    description: 'Optimize salary components for tax savings'
  },
  {
    id: 'rebates',
    title: 'Section 87A Rebates',
    icon: '🎯',
    description: 'Understanding tax rebates and limits'
  },
  {
    id: 'regime-comparison',
    title: 'Old vs New Regime',
    icon: '⚖️',
    description: 'Choose the right tax regime'
  }
];

export default function TaxPlanning() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('itr-filing-guide');

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    // Check for URL parameter to auto-select section
    const urlParams = new URLSearchParams(window.location.search);
    const sectionParam = urlParams.get('section');
    if (sectionParam && menuItems.some(item => item.id === sectionParam)) {
      setActiveSection(sectionParam);
    }
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      router.push('/dashboard');
    } else {
      router.push('/signup');
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'itr-filing-guide':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
              <h2 className="text-3xl font-bold text-purple-800 mb-4 flex items-center gap-3">
                📋 ITR Filing Guide
              </h2>
              <p className="text-lg text-purple-700 mb-6">
                Choose the correct Income Tax Return (ITR) form based on your income sources. Filing the wrong ITR can lead to penalties and delays.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* ITR Forms Overview */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 ITR Forms Overview</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-gray-800 mb-2">ITR-1 (Sahaj)</h4>
                      <p className="text-sm text-gray-600 mb-2">For salaried individuals with simple income</p>
                      <div className="text-xs text-green-600">
                        ✓ Only salary income<br/>
                        ✓ One house property<br/>
                        ✓ Income up to ₹50 lakhs<br/>
                        ✓ No capital gains/business income
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-gray-800 mb-2">ITR-2</h4>
                      <p className="text-sm text-gray-600 mb-2">For individuals with capital gains/multiple properties</p>
                      <div className="text-xs text-blue-600">
                        ✓ Capital gains from stocks/mutual funds<br/>
                        ✓ Multiple house properties<br/>
                        ✓ Foreign income/assets<br/>
                        ✓ Income above ₹50 lakhs
                      </div>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                      <h4 className="font-semibold text-gray-800 mb-2">ITR-3</h4>
                      <p className="text-sm text-gray-600 mb-2">For business/professional income</p>
                      <div className="text-xs text-orange-600">
                        ✓ Business income<br/>
                        ✓ Professional income<br/>
                        ✓ Partnership firm income<br/>
                        ✓ Presumptive taxation (44AD/44ADA)
                      </div>
                    </div>
                    
                    <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                      <h4 className="font-semibold text-gray-800 mb-2">ITR-4 (Sugam)</h4>
                      <p className="text-sm text-gray-600 mb-2">For presumptive business income</p>
                      <div className="text-xs text-red-600">
                        ✓ Business income under Section 44AD<br/>
                        ✓ Professional income under Section 44ADA<br/>
                        ✓ Total income up to ₹50 lakhs<br/>
                        ✓ Simplified for small businesses
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Decision Tree */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">🤔 Which ITR Should You File?</h3>
                  
                  <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="space-y-4">
                      <div className="p-3 bg-white rounded border-l-4 border-purple-500">
                        <h4 className="font-semibold text-purple-800 mb-2">💼 Only Salary Income?</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Income from salary, pension, one house property
                        </p>
                        <div className="text-xs bg-green-100 text-green-800 p-2 rounded">
                          <strong>Use ITR-1</strong> (if income ≤ ₹50L)
                        </div>
                      </div>
                      
                      <div className="p-3 bg-white rounded border-l-4 border-blue-500">
                        <h4 className="font-semibold text-blue-800 mb-2">📈 Stock Market Profits?</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Capital gains from shares, mutual funds, property
                        </p>
                        <div className="text-xs bg-blue-100 text-blue-800 p-2 rounded">
                          <strong>Use ITR-2</strong> (mandatory for capital gains)
                        </div>
                      </div>
                      
                      <div className="p-3 bg-white rounded border-l-4 border-orange-500">
                        <h4 className="font-semibold text-orange-800 mb-2">🏪 Business Income?</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Trading, freelancing, consulting, shop business
                        </p>
                        <div className="text-xs bg-orange-100 text-orange-800 p-2 rounded">
                          <strong>Use ITR-3</strong> (for regular books)<br/>
                          <strong>Use ITR-4</strong> (for presumptive scheme)
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Common Mistakes to Avoid</h4>
                    <ul className="text-xs text-yellow-700 space-y-1">
                      <li>• Don&apos;t use ITR-1 if you have capital gains</li>
                      <li>• Don&apos;t forget to report small stock profits</li>
                      <li>• Multiple house properties need ITR-2</li>
                      <li>• Crypto trading requires ITR-2 or ITR-3</li>
                      <li>• Foreign income/assets need ITR-2</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => router.push('/tax-planning/itr-filing-guide')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Read Complete ITR Filing Guide →
                </button>
                <button
                  onClick={() => router.push('/calculation/tax')}
                  className="bg-white text-purple-600 border-2 border-purple-200 px-8 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300"
                >
                  Calculate Your Tax →
                </button>
              </div>
            </div>
          </div>
        );
      case 'section-80c':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
              <h2 className="text-3xl font-bold text-blue-800 mb-4 flex items-center gap-3">
                💰 Section 80C Investments
              </h2>
              <p className="text-lg text-blue-700 mb-6">
                Save up to ₹46,800 annually by investing ₹1.5 lakhs in tax-saving instruments under Section 80C.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">🏦 Bank/Government Options</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Public Provident Fund (PPF)</h4>
                      <p className="text-sm text-gray-600 mb-2">Lock-in: 15 years | Returns: 7.1% (tax-free)</p>
                      <div className="flex gap-2">
                        <a href="https://www.sbi.co.in/web/personal-banking/investments/government-schemes/public-provident-fund" 
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                          SBI PPF
                        </a>
                        <a href="https://www.hdfcbank.com/personal/save/accounts/public-provident-fund" 
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                          HDFC PPF
                        </a>
                      </div>
                    </div>
                    
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Employee Provident Fund (EPF)</h4>
                      <p className="text-sm text-gray-600 mb-2">Auto-deducted | Returns: 8.25% (tax-free)</p>
                      <a href="https://www.epfindia.gov.in/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors">
                        EPF Portal
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold text-gray-800">National Savings Certificate (NSC)</h4>
                      <p className="text-sm text-gray-600 mb-2">Lock-in: 5 years | Returns: 6.8%</p>
                      <a href="https://www.indiapost.gov.in/VAS/Pages/NSC.aspx" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors">
                        India Post NSC
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">📈 Market-Linked Options</h3>
                  
                  {/* Featured Investment Platforms */}
                  <div className="mb-6 space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-lg text-gray-800">Groww</h4>
                        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full font-semibold">PARTNER</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">₹0 commission on ELSS | 500+ mutual funds | Easy SIP</p>
                      <a href="https://groww.in/mutual-funds/category/elss" 
                         target="_blank" rel="noopener noreferrer"
                         className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                        Invest in ELSS →
                      </a>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-lg text-gray-800">Zerodha Coin</h4>
                        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-semibold">PARTNER</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">₹0 commission on direct plans | Research tools | Portfolio tracker</p>
                      <a href="https://coin.zerodha.com/funds/elss" 
                         target="_blank" rel="noopener noreferrer"
                         className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                        Start ELSS Investment →
                      </a>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-600 pl-4">
                      <h4 className="font-semibold text-gray-800">Equity Linked Savings Scheme (ELSS)</h4>
                      <p className="text-sm text-gray-600 mb-2">Lock-in: 3 years | Returns: 10-15% potential</p>
                      <div className="flex gap-2 flex-wrap">
                        <a href="https://www.axismf.com/schemes/equity-schemes/axis-long-term-equity-fund" 
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                          Axis ELSS
                        </a>
                        <a href="https://www.icicipruamc.com/mutual-fund/equity-funds/icici-prudential-long-term-equity-fund" 
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                          ICICI ELSS
                        </a>
                        <a href="https://www.sbimf.com/schemes/equity-schemes/sbi-long-term-equity-fund" 
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                          SBI ELSS
                        </a>
                        <a href="https://www.upstox.com/mutual-funds/" 
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                          Upstox MF
                        </a>
                        <a href="https://kuvera.in/" 
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                          Kuvera
                        </a>
                      </div>
                    </div>
                    
                    <div className="border-l-4 border-blue-600 pl-4">
                      <h4 className="font-semibold text-gray-800">Unit Linked Insurance Plans (ULIP)</h4>
                      <p className="text-sm text-gray-600 mb-2">Lock-in: 5 years | Returns: Variable</p>
                      <div className="flex gap-2 flex-wrap">
                        <a href="https://www.lic.in/" 
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                          LIC ULIP
                        </a>
                        <a href="https://www.hdfclife.com/" 
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                          HDFC Life
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <h3 className="text-lg font-bold text-yellow-800 mb-3">💡 Pro Tips for 80C Planning</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
                  <div>• Start early in the financial year for better planning</div>
                  <div>• Mix high-return (ELSS) with safe options (PPF)</div>
                  <div>• Consider lock-in periods before investing</div>
                  <div>• ELSS has the shortest lock-in of just 3 years</div>
                </div>
              </div>
              
              {/* Read More Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => router.push('/tax-planning/section-80c')}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Read Complete Section 80C Guide →
                </button>
              </div>
            </div>
          </div>
        );

      case 'health-insurance':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
              <h2 className="text-3xl font-bold text-green-800 mb-4 flex items-center gap-3">
                🏥 Health Insurance Tax Benefits (Section 80D)
              </h2>
              <p className="text-lg text-green-700 mb-6">
                Get tax deductions up to ₹1 lakh on health insurance premiums for self, family, and parents.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">👨‍👩‍👧‍👦 Self & Family Coverage</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">Below 60 years</span>
                        <span className="font-bold text-blue-600">₹25,000</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <span className="font-medium">60+ years (Senior Citizen)</span>
                        <span className="font-bold text-orange-600">₹50,000</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">👴👵 Parents Coverage</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium">Additional for Parents</span>
                        <span className="font-bold text-purple-600">₹50,000</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        💡 This is over and above the self/family limit, making total possible deduction ₹1,00,000
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">🏥 Best Health Insurance Options</h3>
                  
                  {/* Featured Partner - PolicyBazaar */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-lg text-gray-800">PolicyBazaar</h4>
                      <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full font-semibold">PARTNER</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Compare 45+ insurers | Get best quotes | Expert guidance</p>
                    <a href="https://www.policybazaar.com/health-insurance/" 
                       target="_blank" rel="noopener noreferrer"
                       className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                      Compare & Buy Now →
                    </a>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Star Health Insurance</h4>
                      <p className="text-sm text-gray-600 mb-2">Comprehensive health coverage specialist</p>
                      <a href="https://www.starhealth.in/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full hover:bg-red-200 transition-colors">
                        Get Quote
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-gray-800">HDFC ERGO Health</h4>
                      <p className="text-sm text-gray-600 mb-2">Wide network and cashless facilities</p>
                      <a href="https://www.hdfcergo.com/health-insurance" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                        Get Quote
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-gray-800">ICICI Lombard Health</h4>
                      <p className="text-sm text-gray-600 mb-2">Digital-first health insurance</p>
                      <a href="https://www.icicilombard.com/health-insurance" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                        Get Quote
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Care Health Insurance</h4>
                      <p className="text-sm text-gray-600 mb-2">Affordable and comprehensive plans</p>
                      <a href="https://www.careinsurance.com/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors">
                        Get Quote
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-blue-800 mb-3">💰 Tax Savings Calculator</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="font-semibold text-gray-800">30% Tax Bracket</div>
                    <div className="text-blue-600">Save up to ₹30,000</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="font-semibold text-gray-800">20% Tax Bracket</div>
                    <div className="text-blue-600">Save up to ₹20,000</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="font-semibold text-gray-800">5% Tax Bracket</div>
                    <div className="text-blue-600">Save up to ₹5,000</div>
                  </div>
                </div>
              </div>
              
              {/* Read More Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => router.push('/tax-planning/health-insurance-80d')}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Read Complete Health Insurance Guide →
                </button>
              </div>
            </div>
          </div>
        );

      case 'home-loan':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200">
              <h2 className="text-3xl font-bold text-orange-800 mb-4 flex items-center gap-3">
                🏠 Home Loan Tax Benefits
              </h2>
              <p className="text-lg text-orange-700 mb-6">
                Maximize your home loan tax benefits with principal and interest deductions up to ₹3.5 lakhs annually.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Tax Deduction Breakdown</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Principal Repayment (Section 80C)</h4>
                      <p className="text-sm text-gray-600 mb-2">Up to ₹1.5 lakh (part of overall 80C limit)</p>
                      <div className="text-xs text-blue-600">💡 Shares the ₹1.5L limit with other 80C investments</div>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Interest Payment (Section 24B)</h4>
                      <p className="text-sm text-gray-600 mb-2">Up to ₹2 lakh for self-occupied property</p>
                      <div className="text-xs text-green-600">💡 Separate limit, not part of 80C</div>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Let-out Property Interest</h4>
                      <p className="text-sm text-gray-600 mb-2">No limit on interest deduction</p>
                      <div className="text-xs text-purple-600">💡 Full interest deductible from rental income</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">🏦 Best Home Loan Providers</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-600 pl-4">
                      <h4 className="font-semibold text-gray-800">SBI Home Loans</h4>
                      <p className="text-sm text-gray-600 mb-2">Starting from 8.50% | Tenure up to 30 years</p>
                      <a href="https://sbi.co.in/web/personal-banking/loans/home-loans" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                        Apply Now
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-red-600 pl-4">
                      <h4 className="font-semibold text-gray-800">HDFC Home Loans</h4>
                      <p className="text-sm text-gray-600 mb-2">Starting from 8.60% | Quick processing</p>
                      <a href="https://www.hdfc.com/home-loans" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full hover:bg-red-200 transition-colors">
                        Apply Now
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-green-600 pl-4">
                      <h4 className="font-semibold text-gray-800">ICICI Bank Home Loans</h4>
                      <p className="text-sm text-gray-600 mb-2">Starting from 8.75% | Digital processing</p>
                      <a href="https://www.icicibank.com/personal-banking/loans/home-loan" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                        Apply Now
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-purple-600 pl-4">
                      <h4 className="font-semibold text-gray-800">Axis Bank Home Loans</h4>
                      <p className="text-sm text-gray-600 mb-2">Starting from 8.80% | Flexible repayment</p>
                      <a href="https://www.axisbank.com/retail/loans/home-loan" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors">
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <h3 className="text-lg font-bold text-yellow-800 mb-3">📊 Tax Savings Example</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Scenario: ₹50L Home Loan</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Principal Repayment:</span>
                        <span className="font-medium">₹1,50,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interest Payment:</span>
                        <span className="font-medium">₹2,00,000</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-semibold">Total Deduction:</span>
                        <span className="font-bold text-orange-600">₹3,50,000</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Tax Savings (30% bracket)</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>On Principal:</span>
                        <span className="font-medium">₹45,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>On Interest:</span>
                        <span className="font-medium">₹60,000</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-semibold">Total Savings:</span>
                        <span className="font-bold text-green-600">₹1,05,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Read More Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => router.push('/tax-planning/home-loan-benefits')}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Read Complete Home Loan Guide →
                </button>
              </div>
            </div>
          </div>
        );

      case 'education-loan':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-200">
              <h2 className="text-3xl font-bold text-purple-800 mb-4 flex items-center gap-3">
                🎓 Education Loan Tax Benefits (Section 80E)
              </h2>
              <p className="text-lg text-purple-700 mb-6">
                Get full deduction on education loan interest with no upper limit for higher education expenses.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Key Benefits</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <span className="text-green-600 mt-1">✓</span>
                      <div>
                        <div className="font-semibold text-gray-800">No Upper Limit</div>
                        <div className="text-sm text-gray-600">Full interest amount is deductible</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <span className="text-blue-600 mt-1">✓</span>
                      <div>
                        <div className="font-semibold text-gray-800">8 Year Benefit</div>
                        <div className="text-sm text-gray-600">From the year you start repaying</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                      <span className="text-purple-600 mt-1">✓</span>
                      <div>
                        <div className="font-semibold text-gray-800">For Self, Spouse, Children</div>
                        <div className="text-sm text-gray-600">Can claim for dependent relatives</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">🏦 Best Education Loan Providers</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-600 pl-4">
                      <h4 className="font-semibold text-gray-800">SBI Education Loan</h4>
                      <p className="text-sm text-gray-600 mb-2">9.05% onwards | Up to ₹1.5 crore</p>
                      <a href="https://sbi.co.in/web/personal-banking/loans/education-loans" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                        Apply Now
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-green-600 pl-4">
                      <h4 className="font-semibold text-gray-800">HDFC Credila</h4>
                      <p className="text-sm text-gray-600 mb-2">10.5% onwards | Abroad studies specialist</p>
                      <a href="https://www.hdfccredila.com/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                        Apply Now
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-purple-600 pl-4">
                      <h4 className="font-semibold text-gray-800">Axis Bank Education Loan</h4>
                      <p className="text-sm text-gray-600 mb-2">10.75% onwards | Quick processing</p>
                      <a href="https://www.axisbank.com/retail/loans/education-loan" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors">
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Read More Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => router.push('/tax-planning/education-loan-80e')}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Read Complete Education Loan Guide →
                </button>
              </div>
            </div>
          </div>
        );

      case 'donations':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-2xl p-8 border border-pink-200">
              <h2 className="text-3xl font-bold text-pink-800 mb-4 flex items-center gap-3">
                ❤️ Donation Tax Benefits (Section 80G)
              </h2>
              <p className="text-lg text-pink-700 mb-6">
                Get 50% or 100% tax deduction on donations to approved charitable organizations and government funds.
              </p>
              
              {/* Featured Donation Platform */}
              <div className="mb-8 p-4 bg-gradient-to-r from-pink-50 to-red-50 rounded-xl border-2 border-pink-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-lg text-gray-800">GiveIndia</h4>
                  <span className="text-xs bg-pink-500 text-white px-2 py-1 rounded-full font-semibold">PARTNER</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">India&apos;s largest donation platform | 80G certified NGOs | Easy tax receipt</p>
                <a href="https://www.giveindia.org/" 
                   target="_blank" rel="noopener noreferrer"
                   className="inline-block bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                  Explore Verified NGOs →
                </a>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">💝 100% Deduction Organizations</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-gray-800">PM CARES Fund</h4>
                      <p className="text-sm text-gray-600 mb-2">COVID-19 relief and healthcare</p>
                      <a href="https://www.pmcares.gov.in/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                        Donate Now
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Swachh Bharat Kosh</h4>
                      <p className="text-sm text-gray-600 mb-2">Clean India mission support</p>
                      <a href="https://sbm.gov.in/sbmcms/donation.aspx" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                        Donate Now
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Clean Ganga Fund</h4>
                      <p className="text-sm text-gray-600 mb-2">River cleaning initiative</p>
                      <a href="https://nmcg.nic.in/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors">
                        Donate Now
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-indigo-500 pl-4">
                      <h4 className="font-semibold text-gray-800">National Defence Fund</h4>
                      <p className="text-sm text-gray-600 mb-2">Armed forces welfare and modernization</p>
                      <a href="https://ndf.gov.in/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-200 transition-colors">
                        Donate Now
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-semibold text-gray-800">PM National Relief Fund</h4>
                      <p className="text-sm text-gray-600 mb-2">Natural calamity and disaster relief</p>
                      <a href="https://pmnrf.gov.in/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full hover:bg-red-200 transition-colors">
                        Donate Now
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">💙 50% Deduction Organizations</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Akshaya Patra Foundation</h4>
                      <p className="text-sm text-gray-600 mb-2">Mid-day meal program for children</p>
                      <a href="https://www.akshayapatra.org/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors">
                        Donate Now
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-teal-500 pl-4">
                      <h4 className="font-semibold text-gray-800">CRY (Child Rights and You)</h4>
                      <p className="text-sm text-gray-600 mb-2">Child welfare and education</p>
                      <a href="https://www.cry.org/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full hover:bg-teal-200 transition-colors">
                        Donate Now
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-indigo-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Teach for India</h4>
                      <p className="text-sm text-gray-600 mb-2">Education equality movement</p>
                      <a href="https://www.teachforindia.org/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-200 transition-colors">
                        Donate Now
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-pink-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Smile Foundation</h4>
                      <p className="text-sm text-gray-600 mb-2">Education, healthcare, livelihood programs</p>
                      <a href="https://www.smilefoundationindia.org/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full hover:bg-pink-200 transition-colors">
                        Donate Now
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-emerald-500 pl-4">
                      <h4 className="font-semibold text-gray-800">HelpAge India</h4>
                      <p className="text-sm text-gray-600 mb-2">Elderly care and support services</p>
                      <a href="https://www.helpageindia.org/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full hover:bg-emerald-200 transition-colors">
                        Donate Now
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-violet-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Goonj</h4>
                      <p className="text-sm text-gray-600 mb-2">Clothing, disaster relief, rural development</p>
                      <a href="https://goonj.org/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-violet-100 text-violet-700 px-3 py-1 rounded-full hover:bg-violet-200 transition-colors">
                        Donate Now
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-cyan-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Pratham</h4>
                      <p className="text-sm text-gray-600 mb-2">Education for underprivileged children</p>
                      <a href="https://www.pratham.org/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full hover:bg-cyan-200 transition-colors">
                        Donate Now
                      </a>
                    </div>
                  </div>
                </div>
                
              </div>
              
              {/* Healthcare & Medical NGOs Section - Full Width */}
              <div className="mt-8 bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">🏥 Healthcare & Medical NGOs (50% Deduction)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Tata Memorial Centre</h4>
                      <p className="text-sm text-gray-600 mb-2">Cancer treatment and research for underprivileged</p>
                      <a href="https://tmc.gov.in/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full hover:bg-red-200 transition-colors">
                        Donate Now
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-pink-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Indian Cancer Society</h4>
                      <p className="text-sm text-gray-600 mb-2">Cancer awareness, prevention and patient support</p>
                      <a href="https://www.indiancancersociety.org/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full hover:bg-pink-200 transition-colors">
                        Donate Now
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Narayana Health Foundation</h4>
                      <p className="text-sm text-gray-600 mb-2">Heart surgeries and critical care for children</p>
                      <a href="https://www.narayanahealth.org/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors">
                        Donate Now
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-gray-800">NACO (National AIDS Control)</h4>
                      <p className="text-sm text-gray-600 mb-2">HIV/AIDS prevention, treatment and awareness</p>
                      <a href="http://naco.gov.in/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                        Donate Now
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Cuddles Foundation</h4>
                      <p className="text-sm text-gray-600 mb-2">Malnutrition treatment in hospitalized children</p>
                      <a href="https://cuddlesfoundation.org/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                        Donate Now
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Sankara Eye Foundation</h4>
                      <p className="text-sm text-gray-600 mb-2">Free eye care and cataract surgeries</p>
                      <a href="https://www.sankaraeye.com/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors">
                        Donate Now
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-teal-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Rotary Foundation India</h4>
                      <p className="text-sm text-gray-600 mb-2">Polio eradication and immunization programs</p>
                      <a href="https://www.rotaryindia.org/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full hover:bg-teal-200 transition-colors">
                        Donate Now
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-indigo-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Asha for Education</h4>
                      <p className="text-sm text-gray-600 mb-2">Healthcare and education in rural communities</p>
                      <a href="https://www.ashanet.org/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-200 transition-colors">
                        Donate Now
                      </a>
                    </div>
                </div>
              </div>
              
              {/* Additional Donation Platforms */}
              <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">🌐 Other Donation Platforms</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <a href="https://www.ketto.org/" 
                     target="_blank" rel="noopener noreferrer"
                     className="p-3 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors">
                    <div className="font-semibold text-gray-800 text-sm">Ketto</div>
                    <div className="text-xs text-gray-600">Crowdfunding</div>
                  </a>
                  <a href="https://milaap.org/" 
                     target="_blank" rel="noopener noreferrer"
                     className="p-3 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors">
                    <div className="font-semibold text-gray-800 text-sm">Milaap</div>
                    <div className="text-xs text-gray-600">Social Impact</div>
                  </a>
                  <a href="https://www.donatekart.com/" 
                     target="_blank" rel="noopener noreferrer"
                     className="p-3 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors">
                    <div className="font-semibold text-gray-800 text-sm">DonateKart</div>
                    <div className="text-xs text-gray-600">NGO Platform</div>
                  </a>
                  <a href="https://www.charitywater.org/" 
                     target="_blank" rel="noopener noreferrer"
                     className="p-3 bg-orange-50 rounded-lg text-center hover:bg-orange-100 transition-colors">
                    <div className="font-semibold text-gray-800 text-sm">Charity Water</div>
                    <div className="text-xs text-gray-600">Clean Water</div>
                  </a>
                </div>
              </div>
              
              {/* Important Clarifications */}
              <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <h3 className="text-lg font-bold text-yellow-800 mb-4">⚠️ Important: What&apos;s NOT Eligible for 80G Deduction</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 text-sm">❌ Religious Donations (No Tax Benefit)</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div>• Temple, Church, Mosque, Gurudwara donations</div>
                      <div>• Religious festivals and ceremonies</div>
                      <div>• Personal religious offerings</div>
                      <div>• Pilgrimage-related donations</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 text-sm">❌ Political Donations (No Tax Benefit)</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div>• BJP, Congress, AAP, or any political party</div>
                      <div>• Electoral bonds (discontinued from 2024)</div>
                      <div>• Political campaign contributions</div>
                      <div>• Candidate-specific donations</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-white rounded-lg border border-yellow-300">
                  <h4 className="font-semibold text-gray-800 mb-2">💡 Alternative: Political Party Donations</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    While political donations don&apos;t qualify for Section 80G, they have separate provisions:
                  </p>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>• <strong>Section 80GGB:</strong> Corporate donations to political parties (100% deduction)</div>
                    <div>• <strong>Individual donations:</strong> No tax deduction available</div>
                    <div>• <strong>Electoral bonds:</strong> Were anonymous but discontinued in 2024</div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-800 mb-2">✅ What Qualifies for 80G</h4>
                  <p className="text-sm text-gray-700">
                    Only donations to <strong>registered charitable organizations</strong> with valid 80G certificates qualify. 
                    Always verify the organization&apos;s 80G registration before donating for tax benefits.
                  </p>
                </div>
              </div>
              
              {/* Read More Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => router.push('/tax-planning/donations-80g')}
                  className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Read Complete Donations Guide →
                </button>
              </div>
            </div>
          </div>
        );

      case 'capital-gains':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 border border-red-200">
              <h2 className="text-3xl font-bold text-red-800 mb-4 flex items-center gap-3">
                📈 Capital Gains Tax Planning
              </h2>
              <p className="text-lg text-red-700 mb-6">
                Optimize your stock market investments with smart tax planning strategies for both short-term and long-term gains.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Tax Planning Strategies</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-gray-800 mb-2">Hold for Long Term</h4>
                      <p className="text-sm text-gray-600">Hold equity investments &gt;12 months for 10.4% tax vs 15.6% STCG</p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-gray-800 mb-2">Utilize ₹1L LTCG Exemption</h4>
                      <p className="text-sm text-gray-600">First ₹1 lakh of LTCG equity is tax-free every financial year</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-semibold text-gray-800 mb-2">Tax Loss Harvesting</h4>
                      <p className="text-sm text-gray-600">Book losses to offset gains and reduce overall tax liability</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">🏦 Best Investment Platforms</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-600 pl-4">
                      <h4 className="font-semibold text-gray-800">Zerodha</h4>
                      <p className="text-sm text-gray-600 mb-2">₹0 brokerage on equity delivery | Best for beginners</p>
                      <a href="https://zerodha.com/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                        Open Account
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-green-600 pl-4">
                      <h4 className="font-semibold text-gray-800">Groww</h4>
                      <p className="text-sm text-gray-600 mb-2">₹0 brokerage | Mutual funds & stocks</p>
                      <a href="https://groww.in/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                        Open Account
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-purple-600 pl-4">
                      <h4 className="font-semibold text-gray-800">Upstox</h4>
                      <p className="text-sm text-gray-600 mb-2">₹20 per trade | Advanced tools</p>
                      <a href="https://upstox.com/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors">
                        Open Account
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Read More Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => router.push('/tax-planning/capital-gains-planning')}
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Read Complete Capital Gains Guide →
                </button>
              </div>
            </div>
          </div>
        );

      case 'nps-additional':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200">
              <h2 className="text-3xl font-bold text-indigo-800 mb-4 flex items-center gap-3">
                👴 NPS Additional Benefits (Section 80CCD1B)
              </h2>
              <p className="text-lg text-indigo-700 mb-6">
                Get an additional ₹50,000 tax deduction on National Pension System investments over and above Section 80C limit.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">💰 Tax Benefits Breakdown</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-gray-800 mb-2">Section 80C Limit</h4>
                      <p className="text-sm text-gray-600">Up to ₹1,50,000 under general 80C provisions</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-gray-800 mb-2">Additional 80CCD1B</h4>
                      <p className="text-sm text-gray-600">Extra ₹50,000 deduction specifically for NPS</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-semibold text-gray-800 mb-2">Total NPS Benefit</h4>
                      <p className="text-sm text-gray-600">Maximum ₹2,00,000 annual deduction possible</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">🏦 NPS Investment Options</h3>
                  
                  {/* Official NPS Direct - Featured */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-lg text-gray-800">National Pension System (Official)</h4>
                      <span className="text-xs bg-indigo-500 text-white px-2 py-1 rounded-full font-semibold">OFFICIAL</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Government portal | Direct account opening | Lower charges | eNPS facility</p>
                    <div className="flex gap-3 flex-wrap">
                      <a href="https://www.npscra.nsdl.co.in/nsdl-web/NPS/subscriptionRegistrationPage/subscriptionRegistrationPage.action" 
                         target="_blank" rel="noopener noreferrer"
                         className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                        Open eNPS Account →
                      </a>
                      <a href="https://enps.nsdl.com/" 
                         target="_blank" rel="noopener noreferrer"
                         className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                        eNPS Portal →
                      </a>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-600 pl-4">
                      <h4 className="font-semibold text-gray-800">HDFC Pension</h4>
                      <p className="text-sm text-gray-600 mb-2">Low charges | Digital platform</p>
                      <a href="https://www.hdfcpension.com/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                        Open NPS
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-green-600 pl-4">
                      <h4 className="font-semibold text-gray-800">ICICI Prudential NPS</h4>
                      <p className="text-sm text-gray-600 mb-2">Comprehensive retirement planning</p>
                      <a href="https://www.icicipruamc.com/nps" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                        Open NPS
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-purple-600 pl-4">
                      <h4 className="font-semibold text-gray-800">SBI Pension Funds</h4>
                      <p className="text-sm text-gray-600 mb-2">Government backed | Reliable</p>
                      <a href="https://www.sbipensionsfund.com/" 
                         target="_blank" rel="noopener noreferrer"
                         className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors">
                        Open NPS
                      </a>
                    </div>
                    
                    <div className="border-l-4 border-orange-600 pl-4">
                      <h4 className="font-semibold text-gray-800">Other Digital Platforms</h4>
                      <p className="text-sm text-gray-600 mb-2">Easy online NPS account opening</p>
                      <div className="flex gap-2 flex-wrap">
                        <a href="https://groww.in/nps" 
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors">
                          Groww NPS
                        </a>
                        <a href="https://zerodha.com/nps/" 
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors">
                          Zerodha NPS
                        </a>
                        <a href="https://www.upstox.com/nps/" 
                           target="_blank" rel="noopener noreferrer"
                           className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors">
                          Upstox NPS
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <h3 className="text-lg font-bold text-yellow-800 mb-3">⚠️ Important Notes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
                  <div>• Lock-in until 60 years of age</div>
                  <div>• 60% withdrawal at maturity (40% annuity mandatory)</div>
                  <div>• Partial withdrawals allowed after 3 years</div>
                  <div>• Tax on withdrawal depends on corpus amount</div>
                </div>
              </div>
              
              {/* Read More Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => router.push('/tax-planning/nps-additional-80ccd1b')}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Read Complete NPS Guide →
                </button>
              </div>
            </div>
          </div>
        );

      case 'salary-restructure':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-8 border border-teal-200">
              <h2 className="text-3xl font-bold text-teal-800 mb-4 flex items-center gap-3">
                💼 Salary Restructuring for Tax Savings
              </h2>
              <p className="text-lg text-teal-700 mb-6">
                Optimize your salary structure by converting taxable components into tax-free allowances and benefits.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Tax-Free Components</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-gray-800">House Rent Allowance (HRA)</h4>
                      <p className="text-sm text-gray-600 mb-2">40% of basic in non-metro, 50% in metro cities</p>
                      <div className="text-xs text-green-600">💡 Submit rent receipts for exemption</div>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Leave Travel Allowance (LTA)</h4>
                      <p className="text-sm text-gray-600 mb-2">Twice in a block of 4 years for domestic travel</p>
                      <div className="text-xs text-blue-600">💡 Keep all travel tickets and receipts</div>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Food Allowance</h4>
                      <p className="text-sm text-gray-600 mb-2">Up to ₹50 per meal (₹26,000 annually)</p>
                      <div className="text-xs text-purple-600">💡 Meal coupons or cafeteria facility</div>
                    </div>
                    
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-semibold text-gray-800">Phone/Internet Reimbursement</h4>
                      <p className="text-sm text-gray-600 mb-2">Actual business usage bills</p>
                      <div className="text-xs text-orange-600">💡 Keep separate business phone/connection</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Restructuring Examples</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Before Restructuring</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Basic Salary:</span>
                          <span>₹80,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Gross Salary:</span>
                          <span>₹80,000</span>
                        </div>
                        <div className="flex justify-between text-red-600">
                          <span>Taxable Income:</span>
                          <span>₹80,000</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">After Restructuring</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Basic Salary:</span>
                          <span>₹40,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>HRA:</span>
                          <span>₹20,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Other Allowances:</span>
                          <span>₹20,000</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span>Gross Salary:</span>
                          <span>₹80,000</span>
                        </div>
                        <div className="flex justify-between text-green-600 font-semibold">
                          <span>Taxable Income:</span>
                          <span>₹45,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-blue-800 mb-3">🎯 Key Strategies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                  <div>• Keep basic salary around 40% of total CTC</div>
                  <div>• Maximize HRA if living in rented accommodation</div>
                  <div>• Use company lease car instead of car allowance</div>
                  <div>• Opt for employer NPS contribution under 80CCD(2)</div>
                </div>
              </div>
              
              {/* Read More Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => router.push('/tax-planning/salary-restructuring')}
                  className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Read Complete Salary Restructuring Guide →
                </button>
              </div>
            </div>
          </div>
        );

      case 'rebates':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-200">
              <h2 className="text-3xl font-bold text-emerald-800 mb-4 flex items-center gap-3">
                🎯 Section 87A Tax Rebates
              </h2>
              <p className="text-lg text-emerald-700 mb-6">
                Understand tax rebates that can reduce your tax liability to zero for lower income taxpayers.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">💰 Old Tax Regime Rebates</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-gray-800 mb-2">Section 87A Rebate</h4>
                      <p className="text-sm text-gray-600 mb-2">₹12,500 rebate if total income ≤ ₹5 lakhs</p>
                      <div className="text-xs text-green-600">💡 This can make your tax liability zero</div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-gray-800 mb-2">Effective Tax-Free Income</h4>
                      <p className="text-sm text-gray-600 mb-2">Up to ₹6.5 lakhs with deductions + rebate</p>
                      <div className="text-xs text-blue-600">💡 ₹1.5L deductions + ₹5L rebate limit</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">🆕 New Tax Regime Rebates</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-semibold text-gray-800 mb-2">Enhanced Section 87A</h4>
                      <p className="text-sm text-gray-600 mb-2">₹25,000 rebate if total income ≤ ₹7 lakhs</p>
                      <div className="text-xs text-purple-600">💡 Higher rebate amount in new regime</div>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                      <h4 className="font-semibold text-gray-800 mb-2">Higher Tax-Free Limit</h4>
                      <p className="text-sm text-gray-600 mb-2">Up to ₹7 lakhs income with zero tax</p>
                      <div className="text-xs text-orange-600">💡 No additional deductions needed</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Rebate Comparison Table</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold">Income Range</th>
                        <th className="text-left py-3 px-4 font-semibold">Old Regime</th>
                        <th className="text-left py-3 px-4 font-semibold">New Regime</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4">₹0 - ₹2.5L</td>
                        <td className="py-3 px-4 text-green-600">No Tax</td>
                        <td className="py-3 px-4 text-green-600">No Tax</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4">₹2.5L - ₹5L</td>
                        <td className="py-3 px-4 text-green-600">Rebate Available</td>
                        <td className="py-3 px-4 text-green-600">No Tax</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4">₹5L - ₹7L</td>
                        <td className="py-3 px-4 text-orange-600">Tax Applicable</td>
                        <td className="py-3 px-4 text-green-600">Rebate Available</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Above ₹7L</td>
                        <td className="py-3 px-4 text-red-600">Tax Applicable</td>
                        <td className="py-3 px-4 text-red-600">Tax Applicable</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <h3 className="text-lg font-bold text-yellow-800 mb-3">💡 Important Points</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
                  <div>• Rebate reduces tax liability, not taxable income</div>
                  <div>• Available to resident individuals only</div>
                  <div>• Cannot exceed the total tax liability</div>
                  <div>• New regime generally better for lower incomes</div>
                </div>
              </div>
              
              {/* Read More Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => router.push('/tax-planning/section-87a-rebates')}
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Read Complete Section 87A Guide →
                </button>
              </div>
            </div>
          </div>
        );

      case 'regime-comparison':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-8 border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                ⚖️ Old vs New Tax Regime Comparison
              </h2>
              <p className="text-lg text-slate-700 mb-6">
                Choose the right tax regime based on your income level, investments, and tax-saving strategy.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">📊 Old Tax Regime</h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Tax Slabs (AY 2025-26)</h4>
                      <div className="space-y-1 text-sm">
                        <div>₹0 - ₹2.5L: 0%</div>
                        <div>₹2.5L - ₹5L: 5%</div>
                        <div>₹5L - ₹10L: 20%</div>
                        <div>Above ₹10L: 30%</div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">✅ Benefits</h4>
                      <div className="space-y-1 text-sm text-green-700">
                        <div>• All deductions available (80C, 80D, etc.)</div>
                        <div>• HRA exemption allowed</div>
                        <div>• LTA exemption available</div>
                        <div>• Standard deduction ₹50,000</div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-red-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">❌ Drawbacks</h4>
                      <div className="space-y-1 text-sm text-red-700">
                        <div>• Lower rebate (₹12,500)</div>
                        <div>• Higher tax rates</div>
                        <div>• Requires investment planning</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-500">
                  <h3 className="text-xl font-bold text-purple-800 mb-4">🆕 New Tax Regime</h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Tax Slabs (AY 2025-26)</h4>
                      <div className="space-y-1 text-sm">
                        <div>₹0 - ₹3L: 0%</div>
                        <div>₹3L - ₹7L: 5%</div>
                        <div>₹7L - ₹10L: 10%</div>
                        <div>₹10L - ₹12L: 15%</div>
                        <div>₹12L - ₹15L: 20%</div>
                        <div>Above ₹15L: 30%</div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">✅ Benefits</h4>
                      <div className="space-y-1 text-sm text-green-700">
                        <div>• Higher rebate (₹25,000)</div>
                        <div>• Lower tax rates initially</div>
                        <div>• No investment compulsion</div>
                        <div>• Standard deduction ₹75,000</div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-red-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">❌ Drawbacks</h4>
                      <div className="space-y-1 text-sm text-red-700">
                        <div>• No 80C, 80D deductions</div>
                        <div>• No HRA exemption</div>
                        <div>• No LTA exemption</div>
                        <div>• Higher rates at top end</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 Which Regime to Choose?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <h4 className="font-semibold text-blue-800 mb-2">Choose Old Regime If:</h4>
                    <div className="space-y-2 text-sm text-blue-700">
                      <div>• Income &gt; ₹15 lakhs</div>
                      <div>• Heavy investments in 80C</div>
                      <div>• Paying house rent (HRA)</div>
                      <div>• High health insurance premiums</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <h4 className="font-semibold text-purple-800 mb-2">Choose New Regime If:</h4>
                    <div className="space-y-2 text-sm text-purple-700">
                      <div>• Income ₹7-15 lakhs</div>
                      <div>• Minimal investments</div>
                      <div>• No HRA claims</div>
                      <div>• Want simplicity</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <h4 className="font-semibold text-green-800 mb-2">Both Are Equal If:</h4>
                    <div className="space-y-2 text-sm text-green-700">
                      <div>• Income around ₹6-8 lakhs</div>
                      <div>• Moderate investments</div>
                      <div>• Calculate both scenarios</div>
                      <div>• Use tax calculator</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <h3 className="text-lg font-bold text-yellow-800 mb-3">⚠️ Important Notes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
                  <div>• Choice can be changed every year</div>
                  <div>• Cannot switch mid-year</div>
                  <div>• Default is New Regime for new taxpayers</div>
                  <div>• Use our tax calculator to compare both</div>
                </div>
              </div>
              
              {/* Read More Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => router.push('/tax-planning/old-vs-new-regime')}
                  className="bg-gradient-to-r from-slate-500 to-gray-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Read Complete Regime Comparison Guide →
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">Select a topic from the sidebar to view detailed information</div>
          </div>
        );
    }
  };

  return (
    <>
      <Head>
        <title>Tax Planning Tips & Strategies - Umbrella Financial</title>
        <meta name="description" content="Comprehensive tax planning guide with investment options, deductions, and strategies to minimize your tax liability legally." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-48 h-48 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200 mb-6">
                <span className="text-sm font-semibold text-blue-600">💡 Tax Planning Guide</span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Tax Planning Tips
                </span>
                <span className="text-gray-800"> & Strategies</span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-6">
                Comprehensive guide to legal tax savings with investment recommendations, 
                deduction strategies, and expert tips to minimize your tax liability.
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12 bg-gray-50">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Sidebar Menu */}
                <div className="lg:w-1/4">
                  <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">📋 Topics</h3>
                    <div className="space-y-2">
                      {menuItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveSection(item.id)}
                          className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                            activeSection === item.id
                              ? 'bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white shadow-lg'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-xl">{item.icon}</span>
                            <div>
                              <div className="font-semibold text-sm">{item.title}</div>
                              <div className={`text-xs mt-1 ${
                                activeSection === item.id ? 'text-white/80' : 'text-gray-500'
                              }`}>
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
                      <button
                        onClick={() => router.push('/calculation/tax')}
                        className="w-full bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Tax Calculator
                      </button>
                      <button
                        onClick={handleGetStarted}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        {isLoggedIn ? 'Dashboard' : 'Get Started Free'}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Main Content Area */}
                <div className="lg:w-3/4">
                  <div className="bg-white rounded-2xl shadow-lg min-h-[600px]">
                    <div className="p-8">
                      {renderContent()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}