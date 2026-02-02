import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function NPSAdditional80CCD1B() {
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
        <title>NPS Additional Tax Benefits Section 80CCD1B Guide 2025 - Extra ₹50K Deduction | IncomeGrow Financial</title>
        <meta name="description" content="Complete NPS Section 80CCD1B guide 2025. Get additional ₹50,000 tax deduction on National Pension System investments. Best NPS platforms & investment tips." />
        <meta name="keywords" content="NPS, Section 80CCD1B, National Pension System, tax benefits, retirement planning, ₹50000 deduction, 2025" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="canonical" href="https://www.incomegrow.in/tax-planning/nps-additional-80ccd1b" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-900/20 dark:via-gray-900 dark:to-purple-900/20 overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-48 h-48 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full border border-indigo-200 dark:border-indigo-700 mb-6 transition-colors duration-300">
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 transition-colors duration-300">👴 NPS Section 80CCD1B</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight transition-colors duration-300">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  NPS Additional Tax Benefits
                </span>
                <br />
                <span className="text-gray-800 dark:text-gray-100 transition-colors duration-300">Section 80CCD1B Guide</span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8 transition-colors duration-300">
                Get an additional ₹50,000 tax deduction on National Pension System investments over and above Section 80C limit. Complete retirement planning guide.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={() => router.push('/calculation/tax')}
                  className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Calculate Tax Savings
                </button>
                <button
                  onClick={() => router.push('/tax-planning')}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  View All Tax Tips
                </button>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-indigo-200 dark:border-indigo-700 transition-colors duration-300">
                  <h2 className="text-3xl font-bold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-3 transition-colors duration-300">
                    👴 NPS Additional Benefits (Section 80CCD1B)
                  </h2>
                  <p className="text-lg text-indigo-700 dark:text-indigo-400 mb-6 transition-colors duration-300">
                    Get an additional ₹50,000 tax deduction on National Pension System investments over and above Section 80C limit.
                  </p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-colors duration-300">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">💰 Tax Benefits Breakdown</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500 dark:border-blue-600 transition-colors duration-300">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300">Section 80C Limit</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Up to ₹1,50,000 under general 80C provisions</p>
                        </div>

                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500 dark:border-green-600 transition-colors duration-300">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300">Additional 80CCD1B</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Extra ₹50,000 deduction specifically for NPS</p>
                        </div>

                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500 dark:border-purple-600 transition-colors duration-300">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300">Total NPS Benefit</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Maximum ₹2,00,000 annual deduction possible</p>
                        </div>
                      </div>
                    </div>


                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-colors duration-300">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 transition-colors duration-300">🏦 NPS Investment Options</h3>

                      {/* Official NPS Direct - Featured */}
                      <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl border-2 border-indigo-200 dark:border-indigo-700 transition-colors duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 transition-colors duration-300">National Pension System (Official)</h4>
                          <span className="text-xs bg-indigo-500 dark:bg-indigo-600 text-white px-2 py-1 rounded-full font-semibold transition-colors duration-300">OFFICIAL</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 transition-colors duration-300">Government portal | Direct account opening | Lower charges | eNPS facility</p>
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
                        <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 transition-colors duration-300">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">HDFC Pension</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">Low charges | Digital platform</p>
                          <a href="https://www.hdfcpension.com/"
                             target="_blank" rel="noopener noreferrer"
                             className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                            Open NPS
                          </a>
                        </div>

                        <div className="border-l-4 border-green-600 dark:border-green-500 pl-4 transition-colors duration-300">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">ICICI Prudential NPS</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">Comprehensive retirement planning</p>
                          <a href="https://www.icicipruamc.com/nps"
                             target="_blank" rel="noopener noreferrer"
                             className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                            Open NPS
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-700 transition-colors duration-300">
                    <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-300 mb-3 transition-colors duration-300">⚠️ Important Notes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700 dark:text-yellow-400 transition-colors duration-300">
                      <div>• Lock-in until 60 years of age</div>
                      <div>• 60% withdrawal at maturity (40% annuity mandatory)</div>
                      <div>• Partial withdrawals allowed after 3 years</div>
                      <div>• Tax on withdrawal depends on corpus amount</div>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] rounded-2xl p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-4">Secure Your Retirement & Save Extra Taxes</h2>
                  <p className="text-lg mb-6 opacity-90">
                    Open your NPS account today and get additional ₹50,000 tax deduction under Section 80CCD1B.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://enps.nsdl.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-[#FF6B2C] px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Open eNPS Account
                    </a>
                    <button
                      onClick={() => router.push('/calculation/tax')}
                      className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#FF6B2C] transition-all duration-300"
                    >
                      Calculate Tax Savings
                    </button>
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