import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ITRFilingGuide() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      router.push('/dashboard');
    } else {
      router.push('/signup');
    }
  };

  return (
    <>
      <Head>
        <title>ITR Filing Guide - Choose the Right Income Tax Return Form | IncomeGrow Financial</title>
        <meta name="description" content="Complete guide to choosing the correct ITR form based on your income sources. Learn the difference between ITR-1, ITR-2, ITR-3, and ITR-4 with examples." />
        <meta name="keywords" content="ITR filing, income tax return, ITR-1, ITR-2, ITR-3, ITR-4, tax filing guide, capital gains tax, business income tax" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="canonical" href="https://www.incomegrow.in/tax-planning/itr-filing-guide" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />

        <main className="py-16">
          <div className="w-full max-w-[1600px] mx-auto px-6">
            
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="inline-block p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-6 transition-colors duration-300">
                <span className="text-4xl">📋</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 transition-colors duration-300">
                ITR Filing Guide
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 transition-colors duration-300">
                Choose the correct Income Tax Return (ITR) form based on your income sources. 
                Filing the wrong ITR can lead to penalties and processing delays.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push('/calculation/tax')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Calculate Your Tax First →
                </button>
                <button
                  onClick={handleGetStarted}
                  className="bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border-2 border-purple-200 dark:border-purple-700 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-300"
                >
                  Get Professional Help
                </button>
              </div>
            </div>

            {/* ITR Forms Comparison */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center transition-colors duration-300">ITR Forms Comparison</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* ITR-1 */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-green-200 dark:border-green-700 hover:shadow-xl transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400 transition-colors duration-300">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300">ITR-1 (Sahaj)</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">For salaried individuals</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500 dark:text-green-400 transition-colors duration-300">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">Only salary income</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500 dark:text-green-400 transition-colors duration-300">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">One house property</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500 dark:text-green-400 transition-colors duration-300">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">Income up to ₹50 lakhs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500 dark:text-red-400 transition-colors duration-300">✗</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">No capital gains</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500 dark:text-red-400 transition-colors duration-300">✗</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">No business income</span>
                    </div>
                  </div>

                  <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg transition-colors duration-300">
                    <p className="text-xs text-green-700 dark:text-green-400 font-medium transition-colors duration-300">
                      Perfect for: Salaried employees with simple income structure
                    </p>
                  </div>
                </div>

                {/* ITR-2 */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-blue-200 dark:border-blue-700 hover:shadow-xl transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300">ITR-2</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">For capital gains & complex income</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500 dark:text-blue-400 transition-colors duration-300">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">Capital gains mandatory</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500 dark:text-blue-400 transition-colors duration-300">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">Multiple properties</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500 dark:text-blue-400 transition-colors duration-300">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">Foreign income/assets</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500 dark:text-blue-400 transition-colors duration-300">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">Income above ₹50L</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500 dark:text-blue-400 transition-colors duration-300">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">Crypto trading</span>
                    </div>
                  </div>

                  <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors duration-300">
                    <p className="text-xs text-blue-700 dark:text-blue-400 font-medium transition-colors duration-300">
                      Perfect for: Stock traders, property investors, HNIs
                    </p>
                  </div>
                </div>

                {/* ITR-3 */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-orange-200 dark:border-orange-700 hover:shadow-xl transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                      <span className="text-2xl font-bold text-orange-600 dark:text-orange-400 transition-colors duration-300">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300">ITR-3</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">For business & professional income</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500 dark:text-orange-400 transition-colors duration-300">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">Business income</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500 dark:text-orange-400 transition-colors duration-300">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">Professional income</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500 dark:text-orange-400 transition-colors duration-300">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">Partnership firm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500 dark:text-orange-400 transition-colors duration-300">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">Regular books required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500 dark:text-orange-400 transition-colors duration-300">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">Any income level</span>
                    </div>
                  </div>

                  <div className="mt-6 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg transition-colors duration-300">
                    <p className="text-xs text-orange-700 dark:text-orange-400 font-medium transition-colors duration-300">
                      Perfect for: Business owners, professionals, consultants
                    </p>
                  </div>
                </div>

                {/* ITR-4 */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-red-200 dark:border-red-700 hover:shadow-xl transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                      <span className="text-2xl font-bold text-red-600 dark:text-red-400 transition-colors duration-300">4</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300">ITR-4 (Sugam)</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">For presumptive business</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-red-500 dark:text-red-400 transition-colors duration-300">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">Section 44AD business</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500 dark:text-red-400 transition-colors duration-300">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">Section 44ADA professional</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500 dark:text-red-400 transition-colors duration-300">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">Income up to ₹50L</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500 dark:text-red-400 transition-colors duration-300">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">No books required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500 dark:text-red-400 transition-colors duration-300">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">Simplified filing</span>
                    </div>
                  </div>

                  <div className="mt-6 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg transition-colors duration-300">
                    <p className="text-xs text-red-700 dark:text-red-400 font-medium transition-colors duration-300">
                      Perfect for: Small businesses, freelancers
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Decision Tree */}
            <div className="mb-16">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-colors duration-300">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center transition-colors duration-300">
                  🤔 Which ITR Should You File?
                </h2>
                
                <div className="max-w-4xl mx-auto">
                  <div className="space-y-6">
                    
                    {/* Decision 1 */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700 transition-colors duration-300">
                      <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-4 transition-colors duration-300">💼 Do you have ONLY salary income?</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300">
                          <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2 transition-colors duration-300">YES - You can use ITR-1</h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 transition-colors duration-300">
                            <li>✓ Only salary/pension income</li>
                            <li>✓ Maximum one house property</li>
                            <li>✓ Total income ≤ ₹50 lakhs</li>
                            <li>✓ No capital gains from stocks</li>
                          </ul>
                        </div>
                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300">
                          <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2 transition-colors duration-300">NO - Move to next question</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            If you have any other income sources like business, capital gains, 
                            or multiple properties, you cannot use ITR-1.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Decision 2 */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700 transition-colors duration-300">
                      <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-4 transition-colors duration-300">📈 Do you have capital gains from stocks/mutual funds?</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300">
                          <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2 transition-colors duration-300">YES - Use ITR-2</h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 transition-colors duration-300">
                            <li>✓ Any capital gains (even ₹1)</li>
                            <li>✓ Stock market profits/losses</li>
                            <li>✓ Mutual fund gains</li>
                            <li>✓ Property sale gains</li>
                            <li>✓ Crypto trading gains</li>
                          </ul>
                        </div>
                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300">
                          <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2 transition-colors duration-300">NO - Check business income</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            If no capital gains, check if you have business or professional income.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Decision 3 */}
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700 transition-colors duration-300">
                      <h3 className="text-xl font-bold text-orange-800 dark:text-orange-300 mb-4 transition-colors duration-300">🏪 Do you have business or professional income?</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300">
                          <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2 transition-colors duration-300">YES - ITR-3 or ITR-4</h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 transition-colors duration-300">
                            <li><strong>ITR-4:</strong> Presumptive scheme (44AD/44ADA)</li>
                            <li><strong>ITR-3:</strong> Regular books of accounts</li>
                            <li>• Trading business</li>
                            <li>• Freelancing/consulting</li>
                            <li>• Shop/retail business</li>
                          </ul>
                        </div>
                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300">
                          <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2 transition-colors duration-300">NO - Check other factors</h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 transition-colors duration-300">
                            <li>• Multiple house properties → ITR-2</li>
                            <li>• Foreign income/assets → ITR-2</li>
                            <li>• Income above ₹50L → ITR-2</li>
                            <li>• Simple salary only → ITR-1</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Common Scenarios */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center transition-colors duration-300">Common Filing Scenarios</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <div className="text-center mb-4">
                    <span className="text-3xl">👨‍💼</span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-2 transition-colors duration-300">Salaried Employee</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">• Salary: ₹12 lakhs</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">• One house property</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">• Fixed deposits interest</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg transition-colors duration-300">
                    <p className="text-sm font-semibold text-green-700 dark:text-green-400 transition-colors duration-300">Use: ITR-1 (Sahaj)</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <div className="text-center mb-4">
                    <span className="text-3xl">📈</span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-2 transition-colors duration-300">Stock Investor</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">• Salary: ₹15 lakhs</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">• Stock gains: ₹50,000</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">• Mutual fund SIP</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg transition-colors duration-300">
                    <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 transition-colors duration-300">Use: ITR-2</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <div className="text-center mb-4">
                    <span className="text-3xl">🏪</span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-2 transition-colors duration-300">Small Business</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">• Shop business</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">• Turnover: ₹80 lakhs</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">• Using presumptive scheme</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg transition-colors duration-300">
                    <p className="text-sm font-semibold text-red-700 dark:text-red-400 transition-colors duration-300">Use: ITR-4 (Sugam)</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <div className="text-center mb-4">
                    <span className="text-3xl">💻</span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-2 transition-colors duration-300">Freelancer</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">• Consulting income: ₹25 lakhs</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">• Maintains books of accounts</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">• Professional income</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg transition-colors duration-300">
                    <p className="text-sm font-semibold text-orange-700 dark:text-orange-400 transition-colors duration-300">Use: ITR-3</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <div className="text-center mb-4">
                    <span className="text-3xl">🏘️</span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-2 transition-colors duration-300">Property Investor</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">• Salary: ₹20 lakhs</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">• 3 rental properties</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">• Property sale gain</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg transition-colors duration-300">
                    <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 transition-colors duration-300">Use: ITR-2</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <div className="text-center mb-4">
                    <span className="text-3xl">🚀</span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-2 transition-colors duration-300">Startup Founder</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">• Salary from company</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">• ESOP gains</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">• Foreign investments</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg transition-colors duration-300">
                    <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 transition-colors duration-300">Use: ITR-2</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="mb-16">
              <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-red-200 dark:border-red-700 transition-colors duration-300">
                <h2 className="text-3xl font-bold text-red-800 dark:text-red-300 mb-6 text-center transition-colors duration-300">
                  ⚠️ Common ITR Filing Mistakes to Avoid
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border-l-4 border-red-500 dark:border-red-600 transition-colors duration-300">
                      <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2 transition-colors duration-300">❌ Using ITR-1 with capital gains</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        Even ₹1 profit from stocks requires ITR-2. ITR-1 doesn&apos;t allow capital gains reporting.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border-l-4 border-red-500 dark:border-red-600 transition-colors duration-300">
                      <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2 transition-colors duration-300">❌ Not reporting small stock profits</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        All capital gains must be reported, regardless of amount. Use ITR-2 for any trading activity.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border-l-4 border-red-500 dark:border-red-600 transition-colors duration-300">
                      <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2 transition-colors duration-300">❌ Multiple properties in ITR-1</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        ITR-1 allows only one house property. Multiple properties require ITR-2.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border-l-4 border-red-500 dark:border-red-600 transition-colors duration-300">
                      <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2 transition-colors duration-300">❌ Ignoring crypto transactions</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        Crypto trading/mining income requires ITR-2 or ITR-3. Don&apos;t ignore small amounts.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border-l-4 border-red-500 dark:border-red-600 transition-colors duration-300">
                      <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2 transition-colors duration-300">❌ Foreign income not declared</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        Any foreign income or assets must be reported in ITR-2, even if tax-exempt.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border-l-4 border-red-500 dark:border-red-600 transition-colors duration-300">
                      <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2 transition-colors duration-300">❌ Wrong presumptive scheme</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        Check eligibility for 44AD/44ADA before using ITR-4. Regular books need ITR-3.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Link to Complete Tax Planning Guide */}
            <div className="text-center mb-8">
              <button
                onClick={() => router.push('/tax-planning')}
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 underline underline-offset-2 transition-colors duration-200"
              >
                View Complete Tax Planning Guide →
              </button>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
                <h2 className="text-3xl font-bold mb-4">Need Help with ITR Filing?</h2>
                <p className="text-lg mb-6 opacity-90">
                  Still confused about which ITR to file? Our tax experts can help you choose the right form and file your returns correctly.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => router.push('/calculation/tax')}
                    className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Calculate Tax First
                  </button>
                  <button
                    onClick={handleGetStarted}
                    className="bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-800 transition-all duration-300"
                  >
                    Get Expert Help
                  </button>
                  <button
                    onClick={() => router.push('/tax-planning')}
                    className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
                  >
                    Explore Tax Planning
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}