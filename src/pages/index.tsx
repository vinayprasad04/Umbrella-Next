import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
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
      router.push('/login');
    }
  };
  return (
    <>
      <SEO />

      <div className="font-sans m-0 p-0 bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header />
 
   



        <main role="main">
          {/* Hero Section */}
          <section className="relative py-6 sm:py-8 md:py-10 lg:py-12 bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden flex items-center transition-colors duration-300" aria-label="Hero section">
            {/* Background decoration - Hidden on mobile */}
            <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
              <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#FF6B2C]/10 to-[#FF8A50]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-center">
                <div className="space-y-5 sm:space-y-6 md:space-y-8 order-1 lg:order-1 mx-auto lg:mx-0 max-w-2xl lg:max-w-none text-center lg:text-left">
                <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#FF6B2C]/10 to-[#FF8A50]/10 rounded-full border border-[#FF6B2C]/20">
                  <span className="text-xs sm:text-sm font-semibold text-[#FF6B2C]">✨ Your Financial Partner</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Empowering
                  </span>
                  <br />
                  <span className="text-gray-800 dark:text-gray-200">Your Financial</span>
                  <br />
                  <span className="bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
                    Journey
                  </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                  IncomeGrow brings you the best tools, research, and knowledge to
                  achieve your financial goals. Plan, invest, and grow with confidence
                  using our comprehensive platform.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={handleGetStarted}
                    aria-label={isLoggedIn ? 'Navigate to Dashboard' : 'Get Started with IncomeGrow'}
                    className="group bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 sm:px-8 py-3 sm:py-4 border-none rounded-xl text-base sm:text-lg font-semibold cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {isLoggedIn ? 'Go to Dashboard' : 'Get Started'}
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>

                  <button
                    onClick={() => router.push('/products')}
                    aria-label="Explore IncomeGrow Platform and Products"
                    className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-base sm:text-lg font-semibold cursor-pointer hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Explore Platform
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-8 pt-2 sm:pt-4" role="list" aria-label="Platform Statistics">
                  <div className="text-center" role="listitem">
                    <div className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200" aria-label="10,000 plus active users">10K+</div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Active Users</div>
                  </div>
                  <div className="text-center" role="listitem">
                    <div className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200" aria-label="50 crore rupees plus managed">₹50Cr+</div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Managed</div>
                  </div>
                  <div className="text-center" role="listitem">
                    <div className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200" aria-label="99 percent satisfaction rate">99%</div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Satisfaction</div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex justify-center lg:justify-end order-1 lg:order-2">
                <div className="relative w-full max-w-lg xl:max-w-xl">
                  {/* SVG Rocket Dream Banner */}
                  <div className="relative w-full aspect-[11/9] xl:w-[550px] xl:h-[450px] bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-700 rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden" role="img" aria-label="Rocket launching towards financial goals with dream home, car, and world tour aspirations">
                    
                    {/* Stars Background */}
                    <div className="absolute inset-0" aria-hidden="true">
                      {/* Twinkling stars */}
                      <div className="absolute top-8 left-12 w-2 h-2 bg-white rounded-full animate-pulse opacity-80"></div>
                      <div className="absolute top-16 right-20 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-60" style={{animationDelay: '0.5s'}}></div>
                      <div className="absolute top-32 left-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse opacity-70" style={{animationDelay: '1s'}}></div>
                      <div className="absolute bottom-32 right-16 w-2 h-2 bg-purple-300 rounded-full animate-pulse opacity-50" style={{animationDelay: '1.5s'}}></div>
                      <div className="absolute top-20 right-1/3 w-1 h-1 bg-pink-300 rounded-full animate-pulse opacity-60" style={{animationDelay: '2s'}}></div>
                      <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse opacity-70" style={{animationDelay: '2.5s'}}></div>
                    </div>
                    
                    {/* Small SVG Rockets floating - Hidden on small mobile */}
                    <div className="hidden sm:block absolute top-8 sm:top-12 left-4 sm:left-8 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}} aria-hidden="true">
                      <svg width="40" height="60" viewBox="0 0 40 60" className="transform rotate-12" aria-hidden="true">
                        <defs>
                          <linearGradient id="rocketGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{stopColor:"#FF6B2C", stopOpacity:1}} />
                            <stop offset="100%" style={{stopColor:"#FF8A50", stopOpacity:1}} />
                          </linearGradient>
                          <linearGradient id="fireGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{stopColor:"#FFF700", stopOpacity:1}} />
                            <stop offset="50%" style={{stopColor:"#FF6B00", stopOpacity:1}} />
                            <stop offset="100%" style={{stopColor:"#FF0000", stopOpacity:1}} />
                          </linearGradient>
                        </defs>
                        <ellipse cx="20" cy="12" rx="8" ry="12" fill="url(#rocketGrad1)"/>
                        <rect x="12" y="12" width="16" height="20" fill="url(#rocketGrad1)"/>
                        <polygon points="12,32 8,40 12,40" fill="#C0392B"/>
                        <polygon points="28,32 32,40 28,40" fill="#C0392B"/>
                        <circle cx="20" cy="18" r="4" fill="#3498DB" opacity="0.8"/>
                        <ellipse cx="20" cy="45" rx="6" ry="15" fill="url(#fireGrad1)" className="animate-pulse"/>
                      </svg>
                    </div>

                    <div className="hidden sm:block absolute top-16 sm:top-20 right-8 sm:right-12 animate-bounce" style={{animationDelay: '2s', animationDuration: '3s'}} aria-hidden="true">
                      <svg width="35" height="50" viewBox="0 0 35 50" className="transform -rotate-6" aria-hidden="true">
                        <defs>
                          <linearGradient id="rocketGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{stopColor:"#3B82F6", stopOpacity:1}} />
                            <stop offset="100%" style={{stopColor:"#8B5CF6", stopOpacity:1}} />
                          </linearGradient>
                          <linearGradient id="fireGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{stopColor:"#FFF700", stopOpacity:1}} />
                            <stop offset="50%" style={{stopColor:"#FF6B00", stopOpacity:1}} />
                            <stop offset="100%" style={{stopColor:"#FF0000", stopOpacity:1}} />
                          </linearGradient>
                        </defs>
                        <ellipse cx="17.5" cy="10" rx="7" ry="10" fill="url(#rocketGrad2)"/>
                        <rect x="10.5" y="10" width="14" height="18" fill="url(#rocketGrad2)"/>
                        <polygon points="10.5,28 7,35 10.5,35" fill="#8E44AD"/>
                        <polygon points="24.5,28 28,35 24.5,35" fill="#8E44AD"/>
                        <circle cx="17.5" cy="16" r="3" fill="#E74C3C" opacity="0.8"/>
                        <ellipse cx="17.5" cy="38" rx="5" ry="12" fill="url(#fireGrad2)" className="animate-pulse"/>
                      </svg>
                    </div>
                    
                    {/* Main Large Rocket - Pure CSS Rocket that always works */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce scale-75 sm:scale-90 md:scale-100" style={{animationDuration: '2s', left: "calc(50% - 34px)"}}>
                      {/* CSS Rocket Design */}
                      <div className="relative">
                        {/* Rocket Body */}
                        <div className="w-12 sm:w-14 md:w-16 h-36 sm:h-42 md:h-48 mx-auto">
                          {/* Nose Cone */}
                          <div className="w-16 h-16 bg-gradient-to-t from-red-500 to-red-400 rounded-t-full border-2 border-red-600 relative overflow-hidden">
                            <div className="absolute inset-2 bg-gradient-to-t from-red-400 to-red-300 rounded-t-full"></div>
                            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full opacity-80"></div>
                          </div>
                          
                          {/* Main Body */}
                          <div className="w-16 h-24 bg-gradient-to-b from-gray-300 to-gray-400 border-x-2 border-gray-500 relative">
                            {/* Window */}
                            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-blue-800">
                              <div className="absolute inset-1 bg-gradient-to-br from-cyan-200 to-blue-400 rounded-full"></div>
                              <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-80"></div>
                            </div>
                            
                            {/* Side Details */}
                            <div className="absolute top-14 left-0 w-3 h-6 bg-orange-500 rounded-r border border-orange-600"></div>
                            <div className="absolute top-14 right-0 w-3 h-6 bg-orange-500 rounded-l border border-orange-600"></div>
                          </div>
                          
                          {/* Fins */}
                          <div className="relative">
                            <div className="absolute -bottom-2 -left-4 w-8 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 transform -rotate-12 border-2 border-orange-600" style={{clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 80%)'}}></div>
                            <div className="absolute -bottom-2 -right-4 w-8 h-12 bg-gradient-to-bl from-yellow-400 to-orange-500 transform rotate-12 border-2 border-orange-600" style={{clipPath: 'polygon(0 0, 100% 0, 100% 80%, 20% 100%)'}}></div>
                          </div>
                          
                          {/* Exhaust Fire */}
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-12 animate-pulse">
                            <div className="h-12 bg-gradient-to-b from-yellow-300 via-orange-400 to-red-500 opacity-90" style={{clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)'}}></div>
                            <div className="absolute inset-0 h-8 bg-gradient-to-b from-white via-yellow-200 to-orange-300 opacity-70" style={{clipPath: 'polygon(45% 0%, 55% 0%, 80% 100%, 20% 100%)'}}></div>
                          </div>
                        </div>
                        
                        {/* Sparkles around rocket */}
                        <div className="absolute -top-4 -left-6 text-yellow-300 text-xl animate-pulse" style={{animationDelay: '0.5s'}}>✨</div>
                        <div className="absolute -top-2 -right-8 text-white text-lg animate-pulse" style={{animationDelay: '1s'}}>⭐</div>
                        <div className="absolute top-12 -left-8 text-blue-300 text-sm animate-pulse" style={{animationDelay: '1.5s'}}>💫</div>
                        <div className="absolute top-8 -right-6 text-purple-300 text-sm animate-pulse" style={{animationDelay: '2s'}}>✨</div>
                      </div>
                    </div>
                    
                    {/* Inspirational Text */}
                    <div className="absolute top-4 sm:top-8 left-4 sm:left-8 text-white z-10">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 drop-shadow-lg">
                        Launch Your Dreams
                      </h3>
                      <p className="text-sm sm:text-base lg:text-lg text-white/90 drop-shadow-lg">
                        To Financial Freedom ✨
                      </p>
                    </div>

                    {/* Goals on right */}
                    <div className="absolute top-4 sm:top-8 right-4 sm:right-8 text-right text-white z-10">
                      <h4 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 drop-shadow-lg">
                        Dream Goals 🎯
                      </h4>
                      <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                        <div className="bg-white/20 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm border border-white/30">
                          🏠 Dream Home
                        </div>
                        <div className="bg-white/20 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm border border-white/30">
                          🚗 New Car
                        </div>
                        <div className="bg-white/20 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm border border-white/30">
                          ✈️ World Tour
                        </div>
                      </div>
                    </div>

                    {/* Bottom Inspiration */}
                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 right-4 sm:right-8 text-center text-white z-10">
                      <p className="text-base sm:text-lg lg:text-xl font-bold drop-shadow-lg mb-1 sm:mb-2">
                        &ldquo;Sky is Not the Limit, Your Mind Is!&rdquo;
                      </p>
                      <p className="text-xs sm:text-sm text-white/80">
                        Start investing today and reach for the stars
                      </p>
                    </div>
                  </div>
                  
                  {/* Floating Achievement Cards - Hidden on mobile */}
                  <div className="hidden lg:block absolute -top-8 -left-8 bg-gradient-to-r from-emerald-500 to-teal-600 p-3 lg:p-4 rounded-2xl shadow-xl text-white animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3s'}}>
                    <div className="text-center">
                      <div className="text-xl lg:text-2xl font-bold">₹25L+</div>
                      <div className="text-xs">Dreams Funded</div>
                    </div>
                  </div>

                  <div className="hidden lg:block absolute -top-4 -right-12 bg-gradient-to-r from-purple-500 to-indigo-600 p-3 lg:p-4 rounded-2xl shadow-xl text-white animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>
                    <div className="text-center">
                      <div className="text-xl lg:text-2xl font-bold">1000+</div>
                      <div className="text-xs">Success Stories</div>
                    </div>
                  </div>

                  <div className="hidden lg:block absolute bottom-8 -left-10 bg-gradient-to-r from-orange-500 to-red-600 p-3 lg:p-4 rounded-2xl shadow-xl text-white animate-pulse">
                    <div className="text-center">
                      <div className="text-2xl">🚀</div>
                      <div className="text-xs">Launch Now</div>
                    </div>
                  </div>

                  <div className="hidden lg:block absolute bottom-12 -right-8 bg-gradient-to-r from-blue-500 to-cyan-600 p-3 lg:p-4 rounded-2xl shadow-xl text-white animate-pulse" style={{animationDelay: '1.5s'}}>
                    <div className="text-center">
                      <div className="text-2xl">⭐</div>
                      <div className="text-xs">Achieve More</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </section>

          {/* About IncomeGrow Section */}
          <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative transition-colors duration-300" aria-labelledby="about-heading">
            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
              <div className="space-y-6 md:space-y-8">
                <div>
                  <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800 mb-4 sm:mb-6">
                    <span className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400">🚀 About Our Mission</span>
                  </div>

                  <h2 id="about-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                    <span className="text-gray-800 dark:text-gray-200">Why Choose </span>
                    <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                      IncomeGrow?
                    </span>
                  </h2>
                </div>

                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  IncomeGrow is dedicated to making financial knowledge accessible and
                  actionable for everyone. Our platform combines expert research,
                  powerful calculators, and a vibrant community to help you make smarter
                  financial decisions.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Expert Research & Analysis</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Get access to comprehensive market research and professional insights</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Powerful Calculators</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Plan your investments with our advanced calculation tools</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Vibrant Community</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Connect with like-minded investors and financial experts</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={() => router.push('/about')}
                    aria-label="Learn more about IncomeGrow"
                    className="group bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-3 border-none rounded-xl text-base font-semibold cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Learn More
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>

                  <button
                    onClick={() => router.push('/about')}
                    aria-label="Read our story and company history"
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 px-6 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-base font-semibold cursor-pointer hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
                  >
                    Our Story
                  </button>
                </div>
              </div>
              
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B2C]/20 to-[#FF8A50]/20 rounded-3xl blur-2xl transform -rotate-6"></div>
                  <div className="relative w-80 h-80 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 rounded-3xl"></div>
                    
                    {/* IncomeGrow Logo instead of U text */}
                    <div className="relative z-10">
                      <Image
                        src="/logo.png"
                        alt="IncomeGrow Financial Logo"
                        width={120}
                        height={114}
                        priority
                        className="w-30 h-28 object-contain filter brightness-0 invert drop-shadow-2xl"
                      />
                    </div>
                  </div>
                  
                  {/* Floating stats */}
                  <div className="absolute -top-4 -left-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-3 rounded-2xl shadow-lg border border-white/50 dark:border-gray-700">
                    <div className="text-lg font-bold text-gray-800 dark:text-gray-200">2019</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Founded</div>
                  </div>

                  <div className="absolute -bottom-4 -right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-3 rounded-2xl shadow-lg border border-white/50 dark:border-gray-700">
                    <div className="text-lg font-bold text-gray-800 dark:text-gray-200">4.9★</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Rating</div>
                  </div>

                  <div className="absolute top-1/2 -right-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-3 rounded-2xl shadow-lg border border-white/50 dark:border-gray-700">
                    <div className="text-lg font-bold text-gray-800 dark:text-gray-200">ISO</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Certified</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Our Products Section */}
          <section className="py-12 md:py-16 lg:py-24 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300" aria-labelledby="products-heading">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20"></div>
            <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 text-center">
              <div className="mb-12 md:mb-16">
                <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full border border-purple-200 dark:border-purple-800 mb-4 sm:mb-6">
                  <span className="text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-400">💼 Our Solutions</span>
                </div>

                <h2 id="products-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                  <span className="text-gray-800 dark:text-gray-200">Comprehensive </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Financial Tools
                  </span>
                </h2>

                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
                  Everything you need to make informed financial decisions, all in one place
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
                {[
                  {
                    icon: '🎯',
                    title: 'Goal Planning',
                    description: 'Set and track your financial goals',
                    color: 'from-blue-400 to-blue-600',
                    bgColor: 'from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30',
                    href: '/products/goal'
                  },
                  {
                    icon: '🎓',
                    title: 'Educational Courses',
                    description: 'Learn from financial experts',
                    color: 'from-green-400 to-green-600',
                    bgColor: 'from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30',
                    href: '/products/course'
                  },
                  {
                    icon: '📈',
                    title: 'Market Research',
                    description: 'In-depth stock analysis',
                    color: 'from-purple-400 to-purple-600',
                    bgColor: 'from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30',
                    href: 'https://www.stock.incomegrow.in/',
                    external: true
                  },
                  {
                    icon: '📰',
                    title: 'Expert Insights',
                    description: 'Latest financial news & blogs',
                    color: 'from-orange-400 to-orange-600',
                    bgColor: 'from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30',
                    href: '/products/blogs'
                  },
                  {
                    icon: '🏛️',
                    title: 'Broker Knowledge',
                    description: 'Compare and choose brokers',
                    color: 'from-indigo-400 to-indigo-600',
                    bgColor: 'from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30',
                    href: '/products/brokers-knowledge'
                  }
                ].map((product, index) => (
                  <div
                    key={index}
                    onClick={() => product.external ? window.open(product.href, '_blank', 'noopener,noreferrer') : router.push(product.href)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        product.external ? window.open(product.href, '_blank', 'noopener,noreferrer') : router.push(product.href);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${product.title}: ${product.description}`}
                    className={`group relative bg-gradient-to-br ${product.bgColor} backdrop-blur-sm border border-white/50 dark:border-gray-700 rounded-2xl p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-r ${product.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="drop-shadow-sm">{product.icon}</span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2 transition-colors duration-300">
                        {product.title}
                      </h3>

                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                        {product.description}
                      </p>

                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="inline-flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                          Explore
                          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12">
                <button
                  onClick={() => router.push('/products')}
                  aria-label="View all IncomeGrow products and services"
                  className="group bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
                >
                  View All Products
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* What Our Users Say Section */}
          <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden transition-colors duration-300" aria-labelledby="testimonials-heading">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 right-20 w-64 h-64 bg-gradient-to-r from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-20 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
            </div>


            <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 text-center">
              <div className="mb-12 md:mb-16">
                <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-full border border-yellow-200 dark:border-yellow-800 mb-4 sm:mb-6">
                  <span className="text-xs sm:text-sm font-semibold text-orange-600 dark:text-orange-400">⭐ Testimonials</span>
                </div>

                <h2 id="testimonials-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                  <span className="text-gray-800 dark:text-gray-200">What Our </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Users Say
                  </span>
                </h2>

                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
                  Discover how IncomeGrow has transformed financial journeys across India
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {[
                  {
                    text: "IncomeGrow's calculators made my investment planning so much easier. The interface is clean and the results are reliable! It's like having a financial advisor in my pocket.",
                    author: "Amit Sharma",
                    role: "Software Engineer",
                    location: "Mumbai",
                    rating: 5,
                    avatar: "AS"
                  },
                  {
                    text: "The research and blogs on IncomeGrow are top notch. I feel more confident in my financial decisions now. The educational content is gold!",
                    author: "Priya Reddy",
                    role: "Content Creator",
                    location: "Bangalore",
                    rating: 5,
                    avatar: "PR"
                  },
                  {
                    text: "As a broker, the knowledge base and tools have helped me serve my clients better. Highly recommended for both beginners and experts.",
                    author: "Rahul Mehta",
                    role: "Financial Advisor",
                    location: "Delhi",
                    rating: 5,
                    avatar: "RM"
                  }
                ].map((testimonial, index) => (
                  <article key={index} className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 relative text-left shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/50 dark:border-gray-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 dark:from-gray-700/40 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative z-10">
                      <div className="flex items-center mb-4" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      <div className="absolute top-4 right-4 text-4xl text-[#FF6B2C]/20 dark:text-[#FF6B2C]/30 font-bold" aria-hidden="true">
                        &ldquo;
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic text-lg">
                        {testimonial.text}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] rounded-xl flex items-center justify-center text-white font-bold shadow-lg" aria-hidden="true">
                          {testimonial.avatar}
                        </div>

                        <div>
                          <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                            {testimonial.author}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonial.role} • {testimonial.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-16 flex flex-col items-center gap-6">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                  <span className="text-2xl" role="img" aria-label="star">⭐</span>
                  <span>4.9/5 average rating from 1,200+ reviews</span>
                </div>

                <button
                  onClick={() => router.push('/testimonials')}
                  aria-label="Read more customer reviews and testimonials"
                  className="group bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Read More Reviews
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* Trusted by Industry Leaders */}
          <section className="py-12 md:py-16 lg:py-24 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300" aria-labelledby="partners-heading">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/30 via-transparent to-green-50/30 dark:from-indigo-900/20 dark:via-transparent dark:to-green-900/20"></div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 text-center">
              <div className="mb-12 md:mb-16">
                <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full border border-indigo-200 dark:border-indigo-800 mb-4 sm:mb-6">
                  <span className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400">🤝 Our Partners</span>
                </div>

                <h2 id="partners-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                  <span className="text-gray-800 dark:text-gray-200">Trusted by </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Industry Leaders
                  </span>
                </h2>

                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
                  Join thousands of professionals and organizations who trust IncomeGrow for their financial needs
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 items-center mb-12 md:mb-16">
                {[
                  { name: 'TechCorp', logo: 'TC', color: 'from-blue-400 to-blue-600' },
                  { name: 'FinanceFirst', logo: 'FF', color: 'from-green-400 to-green-600' },
                  { name: 'InvestPro', logo: 'IP', color: 'from-purple-400 to-purple-600' },
                  { name: 'WealthWise', logo: 'WW', color: 'from-orange-400 to-orange-600' },
                  { name: 'MoneyMakers', logo: 'MM', color: 'from-red-400 to-red-600' },
                  { name: 'CashFlow', logo: 'CF', color: 'from-teal-400 to-teal-600' }
                ].map((partner, index) => (
                  <div key={index} className="group flex flex-col items-center gap-4">
                    <div className={`w-20 h-20 bg-gradient-to-br ${partner.color} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 cursor-pointer`}>
                      {partner.logo}
                    </div>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-200">
                      {partner.name}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12 border border-white/50 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="space-y-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                      500+
                    </div>
                    <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">Companies</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Trust our platform</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                      99.9%
                    </div>
                    <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">Uptime</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Reliable service</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                      24/7
                    </div>
                    <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">Support</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Always available</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <button
                  onClick={() => router.push('/become-partner')}
                  aria-label="Become a partner with IncomeGrow"
                  className="group bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
                >
                  Become a Partner
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}