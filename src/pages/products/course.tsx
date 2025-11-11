import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Course() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const courses = [
    {
      id: 1,
      title: "Stock Market Fundamentals",
      description: "Master the Stock Market with Engaging, Comprehensive, and Fun Lectures! Learn from basics to advanced investment strategies.",
      duration: "6 weeks",
      level: "Beginner",
      rating: 4.8,
      students: "400,000+",
      image: "📈",
      color: "from-blue-400 to-blue-600",
      udemyUrl: "https://www.udemy.com/course/the-beginners-guide-to-the-stock-market/"
    },
    {
      id: 2,
      title: "Mutual Fund Mastery",
      description: "Complete guide to mutual fund investing, SIP strategies, and portfolio diversification for beginners to experts.",
      duration: "4 weeks",
      level: "Beginner",
      rating: 4.9,
      students: "50,000+",
      image: "📊",
      color: "from-green-400 to-green-600",
      udemyUrl: "https://www.udemy.com/course/mutual-fund-from-scratch-for-complete-beginners/"
    },
    {
      id: 3,
      title: "Options Trading Strategies",
      description: "Advanced options trading techniques, risk management, Greeks, and profitable trading strategies with live trades.",
      duration: "11 hours",
      level: "Advanced",
      rating: 4.7,
      students: "25,000+",
      image: "⚡",
      color: "from-purple-400 to-purple-600",
      udemyUrl: "https://www.udemy.com/course/the-advanced-options-trading-course/"
    },
    {
      id: 4,
      title: "Personal Finance Planning",
      description: "Master budgeting, saving, investing, and wealth-building strategies to achieve financial independence in 2025.",
      duration: "5 weeks",
      level: "Beginner",
      rating: 4.9,
      students: "100,000+",
      image: "💰",
      color: "from-orange-400 to-orange-600",
      udemyUrl: "https://www.udemy.com/course/the-ultimate-guide-to-personal-finance-for-beginners-2025/"
    },
    {
      id: 5,
      title: "Cryptocurrency & Blockchain",
      description: "Complete investing course for Bitcoin, altcoins, DeFi, and blockchain technology with proven strategies.",
      duration: "6 weeks",
      level: "Intermediate",
      rating: 4.6,
      students: "75,000+",
      image: "₿",
      color: "from-yellow-400 to-orange-500",
      udemyUrl: "https://www.udemy.com/course/cryptocurrency-complete-course/"
    },
    {
      id: 6,
      title: "Real Estate Investment",
      description: "Complete REIT investing course - Generate passive income with Real Estate Investment Trusts analysis.",
      duration: "7 weeks",
      level: "Intermediate",
      rating: 4.8,
      students: "30,000+",
      image: "🏠",
      color: "from-indigo-400 to-indigo-600",
      udemyUrl: "https://www.udemy.com/course/reit-investing-how-to-value-reits/"
    }
  ];

  const handleGetStarted = () => {
    if (isLoggedIn) {
      router.push('/dashboard');
    } else {
      router.push('/signup');
    }
  };

  const handleEnrollCourse = (udemyUrl: string) => {
    window.open(udemyUrl, '_blank');
  };

  const handleCoursePreview = () => {
    document.getElementById('courses-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <>
      <Head>
        <title>Educational Courses - IncomeGrow Financial</title>
        <meta name="description" content="Learn from financial experts with our comprehensive courses on stock market, mutual funds, options trading, and personal finance." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-4 md:px-6 text-center">
              <div className="inline-flex items-center px-3 md:px-4 py-1 md:py-1.5 lg:py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200 mb-3 md:mb-4 lg:mb-6">
                <span className="text-xs md:text-sm font-semibold text-purple-600">🎓 Expert-Led Courses</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Master Finance
                </span>
                <br />
                <span className="text-gray-800">With Expert Guidance</span>
              </h1>

              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-4 md:mb-5 lg:mb-6 px-2">
                Learn from industry experts through our comprehensive courses designed to help you
                become a confident investor and achieve financial independence.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 lg:gap-4 justify-center mb-5 md:mb-8 lg:mb-10">
                <button
                  onClick={handleGetStarted}
                  className="group bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 md:px-8 py-3 md:py-4 border-none rounded-xl text-base md:text-lg font-semibold cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Start Learning Today
                  <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                
                <button
                  onClick={handleCoursePreview}
                  className="group bg-white/80 backdrop-blur-sm text-gray-700 px-6 md:px-8 py-3 md:py-4 border-2 border-gray-200 rounded-xl text-base md:text-lg font-semibold cursor-pointer hover:bg-white hover:shadow-lg hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Course Preview
                  <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h1m4 0h1M9 6h6a2 2 0 012 2v8a2 2 0 01-2-2V8a2 2 0 012-2z" />
                  </svg>
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 md:gap-5 lg:gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-1">50+</div>
                  <div className="text-xs md:text-sm lg:text-base text-gray-600">Expert Instructors</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-1">10,000+</div>
                  <div className="text-xs md:text-sm lg:text-base text-gray-600">Students Enrolled</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-1">4.8★</div>
                  <div className="text-xs md:text-sm lg:text-base text-gray-600">Average Rating</div>
                </div>
              </div>
            </div>
          </section>

          {/* Courses Section */}
          <section id="courses-section" className="py-8 md:py-12 lg:py-16 xl:py-20 bg-white relative overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6">
              <div className="text-center mb-6 md:mb-8 lg:mb-12">
                <div className="inline-flex items-center px-3 md:px-4 py-1 md:py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200 mb-3 md:mb-4">
                  <span className="text-xs md:text-sm font-semibold text-blue-600">📚 Course Catalog</span>
                </div>

                <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 md:mb-4">
                  <span className="text-gray-800">Popular </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Courses
                  </span>
                </h2>

                <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
                  Choose from our expertly crafted courses designed for every skill level
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="group bg-gradient-to-br from-white to-gray-50 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100">
                    <div className="relative overflow-hidden">
                      {/* Course Image/Icon */}
                      <div className={`w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-r ${course.color} rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 text-2xl md:text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="drop-shadow-sm">{course.image}</span>
                      </div>
                      
                      {/* Course Info */}
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{course.level}</span>
                          <span>•</span>
                          <span>{course.duration}</span>
                        </div>
                        
                        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 group-hover:text-[#FF6B2C] transition-colors duration-300">
                          {course.title}
                        </h3>
                        
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                          {course.description}
                        </p>
                        
                        {/* Rating and Students */}
                        <div className="flex items-center justify-between text-xs md:text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400">★</span>
                            <span>{course.rating}</span>
                            <span>({course.students} students)</span>
                          </div>
                        </div>
                        
                        {/* Enroll Button */}
                        <div className="flex justify-center pt-3 md:pt-4 border-t border-gray-100">
                          <button
                            onClick={() => handleEnrollCourse(course.udemyUrl)}
                            className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-xl text-base md:text-base font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 w-full"
                          >
                            Enroll Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6">
              <div className="text-center mb-6 md:mb-8 lg:mb-12">
                <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 md:mb-4">
                  <span className="text-gray-800">Why Choose Our </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Courses?
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
                {[
                  {
                    icon: "👨‍🏫",
                    title: "Expert Instructors",
                    description: "Learn from industry professionals with years of experience",
                    color: "from-blue-400 to-blue-600"
                  },
                  {
                    icon: "📱",
                    title: "Mobile Learning",
                    description: "Access courses anytime, anywhere on any device",
                    color: "from-green-400 to-green-600"
                  },
                  {
                    icon: "🏆",
                    title: "Certificates",
                    description: "Earn recognized certificates upon course completion",
                    color: "from-purple-400 to-purple-600"
                  },
                  {
                    icon: "💬",
                    title: "Community Support",
                    description: "Join discussions and get help from fellow learners",
                    color: "from-orange-400 to-orange-600"
                  }
                ].map((feature, index) => (
                  <div key={index} className="text-center group">
                    <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 text-xl md:text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="drop-shadow-sm">{feature.icon}</span>
                    </div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2 md:mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative w-full max-w-[1600px] mx-auto px-4 md:px-6 text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 md:mb-6">
                Start Your Learning Journey Today
              </h2>

              <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mb-4 md:mb-6 lg:mb-8">
                Join thousands of successful investors who started their journey with our courses
              </p>
              
              <button
                onClick={handleGetStarted}
                className="group bg-white text-[#FF6B2C] px-6 md:px-8 py-3 md:py-4 border-none rounded-xl text-base md:text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
              >
                {isLoggedIn ? 'Browse Courses' : 'Sign Up Free'}
                <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}