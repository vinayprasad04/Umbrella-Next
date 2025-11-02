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
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="py-16">
          <div className="w-full max-w-[1600px] mx-auto px-6">
            
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="inline-block p-3 bg-purple-100 rounded-full mb-6">
                <span className="text-4xl">📋</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                ITR Filing Guide
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
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
                  className="bg-white text-purple-600 border-2 border-purple-200 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300"
                >
                  Get Professional Help
                </button>
              </div>
            </div>

            {/* ITR Forms Comparison */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">ITR Forms Comparison</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* ITR-1 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-200 hover:shadow-xl transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-green-600">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">ITR-1 (Sahaj)</h3>
                    <p className="text-sm text-gray-600">For salaried individuals</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm text-gray-700">Only salary income</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm text-gray-700">One house property</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm text-gray-700">Income up to ₹50 lakhs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">✗</span>
                      <span className="text-sm text-gray-700">No capital gains</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">✗</span>
                      <span className="text-sm text-gray-700">No business income</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-3 bg-green-50 rounded-lg">
                    <p className="text-xs text-green-700 font-medium">
                      Perfect for: Salaried employees with simple income structure
                    </p>
                  </div>
                </div>

                {/* ITR-2 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-600">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">ITR-2</h3>
                    <p className="text-sm text-gray-600">For capital gains & complex income</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500">✓</span>
                      <span className="text-sm text-gray-700">Capital gains mandatory</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500">✓</span>
                      <span className="text-sm text-gray-700">Multiple properties</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500">✓</span>
                      <span className="text-sm text-gray-700">Foreign income/assets</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500">✓</span>
                      <span className="text-sm text-gray-700">Income above ₹50L</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500">✓</span>
                      <span className="text-sm text-gray-700">Crypto trading</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-700 font-medium">
                      Perfect for: Stock traders, property investors, HNIs
                    </p>
                  </div>
                </div>

                {/* ITR-3 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-orange-600">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">ITR-3</h3>
                    <p className="text-sm text-gray-600">For business & professional income</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500">✓</span>
                      <span className="text-sm text-gray-700">Business income</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500">✓</span>
                      <span className="text-sm text-gray-700">Professional income</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500">✓</span>
                      <span className="text-sm text-gray-700">Partnership firm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500">✓</span>
                      <span className="text-sm text-gray-700">Regular books required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500">✓</span>
                      <span className="text-sm text-gray-700">Any income level</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-3 bg-orange-50 rounded-lg">
                    <p className="text-xs text-orange-700 font-medium">
                      Perfect for: Business owners, professionals, consultants
                    </p>
                  </div>
                </div>

                {/* ITR-4 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-200 hover:shadow-xl transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-red-600">4</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">ITR-4 (Sugam)</h3>
                    <p className="text-sm text-gray-600">For presumptive business</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">✓</span>
                      <span className="text-sm text-gray-700">Section 44AD business</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">✓</span>
                      <span className="text-sm text-gray-700">Section 44ADA professional</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">✓</span>
                      <span className="text-sm text-gray-700">Income up to ₹50L</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">✓</span>
                      <span className="text-sm text-gray-700">No books required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">✓</span>
                      <span className="text-sm text-gray-700">Simplified filing</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-3 bg-red-50 rounded-lg">
                    <p className="text-xs text-red-700 font-medium">
                      Perfect for: Small businesses, freelancers
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Decision Tree */}
            <div className="mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  🤔 Which ITR Should You File?
                </h2>
                
                <div className="max-w-4xl mx-auto">
                  <div className="space-y-6">
                    
                    {/* Decision 1 */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                      <h3 className="text-xl font-bold text-purple-800 mb-4">💼 Do you have ONLY salary income?</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-green-700 mb-2">YES - You can use ITR-1</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>✓ Only salary/pension income</li>
                            <li>✓ Maximum one house property</li>
                            <li>✓ Total income ≤ ₹50 lakhs</li>
                            <li>✓ No capital gains from stocks</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-700 mb-2">NO - Move to next question</h4>
                          <p className="text-sm text-gray-600">
                            If you have any other income sources like business, capital gains, 
                            or multiple properties, you cannot use ITR-1.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Decision 2 */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                      <h3 className="text-xl font-bold text-blue-800 mb-4">📈 Do you have capital gains from stocks/mutual funds?</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-700 mb-2">YES - Use ITR-2</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>✓ Any capital gains (even ₹1)</li>
                            <li>✓ Stock market profits/losses</li>
                            <li>✓ Mutual fund gains</li>
                            <li>✓ Property sale gains</li>
                            <li>✓ Crypto trading gains</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-orange-700 mb-2">NO - Check business income</h4>
                          <p className="text-sm text-gray-600">
                            If no capital gains, check if you have business or professional income.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Decision 3 */}
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200">
                      <h3 className="text-xl font-bold text-orange-800 mb-4">🏪 Do you have business or professional income?</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-orange-700 mb-2">YES - ITR-3 or ITR-4</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li><strong>ITR-4:</strong> Presumptive scheme (44AD/44ADA)</li>
                            <li><strong>ITR-3:</strong> Regular books of accounts</li>
                            <li>• Trading business</li>
                            <li>• Freelancing/consulting</li>
                            <li>• Shop/retail business</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-green-700 mb-2">NO - Check other factors</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Common Filing Scenarios</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="text-center mb-4">
                    <span className="text-3xl">👨‍💼</span>
                    <h3 className="text-lg font-bold text-gray-900 mt-2">Salaried Employee</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">• Salary: ₹12 lakhs</p>
                    <p className="text-sm text-gray-600">• One house property</p>
                    <p className="text-sm text-gray-600">• Fixed deposits interest</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm font-semibold text-green-700">Use: ITR-1 (Sahaj)</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="text-center mb-4">
                    <span className="text-3xl">📈</span>
                    <h3 className="text-lg font-bold text-gray-900 mt-2">Stock Investor</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">• Salary: ₹15 lakhs</p>
                    <p className="text-sm text-gray-600">• Stock gains: ₹50,000</p>
                    <p className="text-sm text-gray-600">• Mutual fund SIP</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-semibold text-blue-700">Use: ITR-2</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="text-center mb-4">
                    <span className="text-3xl">🏪</span>
                    <h3 className="text-lg font-bold text-gray-900 mt-2">Small Business</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">• Shop business</p>
                    <p className="text-sm text-gray-600">• Turnover: ₹80 lakhs</p>
                    <p className="text-sm text-gray-600">• Using presumptive scheme</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-sm font-semibold text-red-700">Use: ITR-4 (Sugam)</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="text-center mb-4">
                    <span className="text-3xl">💻</span>
                    <h3 className="text-lg font-bold text-gray-900 mt-2">Freelancer</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">• Consulting income: ₹25 lakhs</p>
                    <p className="text-sm text-gray-600">• Maintains books of accounts</p>
                    <p className="text-sm text-gray-600">• Professional income</p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="text-sm font-semibold text-orange-700">Use: ITR-3</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="text-center mb-4">
                    <span className="text-3xl">🏘️</span>
                    <h3 className="text-lg font-bold text-gray-900 mt-2">Property Investor</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">• Salary: ₹20 lakhs</p>
                    <p className="text-sm text-gray-600">• 3 rental properties</p>
                    <p className="text-sm text-gray-600">• Property sale gain</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-semibold text-blue-700">Use: ITR-2</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="text-center mb-4">
                    <span className="text-3xl">🚀</span>
                    <h3 className="text-lg font-bold text-gray-900 mt-2">Startup Founder</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">• Salary from company</p>
                    <p className="text-sm text-gray-600">• ESOP gains</p>
                    <p className="text-sm text-gray-600">• Foreign investments</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-semibold text-blue-700">Use: ITR-2</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="mb-16">
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 border border-red-200">
                <h2 className="text-3xl font-bold text-red-800 mb-6 text-center">
                  ⚠️ Common ITR Filing Mistakes to Avoid
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                      <h4 className="font-semibold text-red-700 mb-2">❌ Using ITR-1 with capital gains</h4>
                      <p className="text-sm text-gray-600">
                        Even ₹1 profit from stocks requires ITR-2. ITR-1 doesn&apos;t allow capital gains reporting.
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                      <h4 className="font-semibold text-red-700 mb-2">❌ Not reporting small stock profits</h4>
                      <p className="text-sm text-gray-600">
                        All capital gains must be reported, regardless of amount. Use ITR-2 for any trading activity.
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                      <h4 className="font-semibold text-red-700 mb-2">❌ Multiple properties in ITR-1</h4>
                      <p className="text-sm text-gray-600">
                        ITR-1 allows only one house property. Multiple properties require ITR-2.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                      <h4 className="font-semibold text-red-700 mb-2">❌ Ignoring crypto transactions</h4>
                      <p className="text-sm text-gray-600">
                        Crypto trading/mining income requires ITR-2 or ITR-3. Don&apos;t ignore small amounts.
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                      <h4 className="font-semibold text-red-700 mb-2">❌ Foreign income not declared</h4>
                      <p className="text-sm text-gray-600">
                        Any foreign income or assets must be reported in ITR-2, even if tax-exempt.
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                      <h4 className="font-semibold text-red-700 mb-2">❌ Wrong presumptive scheme</h4>
                      <p className="text-sm text-gray-600">
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
                className="text-sm text-gray-600 hover:text-purple-600 underline underline-offset-2 transition-colors duration-200"
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