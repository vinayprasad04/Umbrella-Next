import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

export default function Products() {
  const router = useRouter();

  const products = [
    {
      id: 'goal',
      icon: '🎯',
      title: 'Goal Planning',
      description: 'Set, track, and achieve your financial goals with our comprehensive planning tools. Whether it\'s a dream home, car, or retirement, we\'ll help you create a roadmap to success.',
      features: ['Goal Setting', 'Progress Tracking', 'Timeline Planning', 'Investment Suggestions'],
      color: 'from-blue-400 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      href: '/products/goal'
    },
    {
      id: 'course',
      icon: '🎓',
      title: 'Educational Courses',
      description: 'Learn from financial experts through our comprehensive courses. From basic financial literacy to advanced investment strategies.',
      features: ['Expert Instructors', 'Interactive Learning', 'Certificates', 'Lifetime Access'],
      color: 'from-green-400 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      href: '/products/course'
    },
    {
      id: 'research',
      icon: '📈',
      title: 'Shares Research',
      description: 'Get in-depth analysis and research on stocks, mutual funds, and other investment opportunities. Make informed decisions with our expert insights.',
      features: ['Stock Analysis', 'Market Trends', 'Risk Assessment', 'Performance Reports'],
      color: 'from-purple-400 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      href: '/products/shares-research'
    },
    {
      id: 'blogs',
      icon: '📰',
      title: 'Expert Insights & Blogs',
      description: 'Stay updated with the latest financial news, market insights, and expert opinions. Our team of analysts provides regular updates and analysis.',
      features: ['Daily Updates', 'Expert Analysis', 'Market Commentary', 'Educational Content'],
      color: 'from-orange-400 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100',
      href: '/products/blogs'
    },
    {
      id: 'brokers',
      icon: '🏛️',
      title: 'Broker Knowledge',
      description: 'Compare and choose the best brokers for your trading needs. Get detailed information about brokerage fees, features, and services.',
      features: ['Broker Comparison', 'Fee Analysis', 'Feature Overview', 'User Reviews'],
      color: 'from-indigo-400 to-indigo-600',
      bgColor: 'from-indigo-50 to-indigo-100',
      href: '/products/brokers-knowledge'
    }
  ];

  const handleProductClick = (href: string) => {
    router.push(href);
  };

  return (
    <>
      <Head>
        <title>Products - Umbrella Financial Tools & Services</title>
        <meta name="description" content="Explore our comprehensive range of financial products including goal planning, educational courses, market research, expert insights, and broker knowledge." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-orange-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#FF6B2C]/10 to-[#FF8A50]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#FF6B2C]/10 to-[#FF8A50]/10 rounded-full border border-[#FF6B2C]/20 mb-6">
                <span className="text-sm font-semibold text-[#FF6B2C]">💼 Our Products</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Complete
                </span>
                <br />
                <span className="text-gray-800">Financial Solutions</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Everything you need to make informed financial decisions, achieve your goals, 
                and grow your wealth - all in one comprehensive platform.
              </p>
              
              <div className="flex items-center justify-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">5</div>
                  <div className="text-sm text-gray-500">Core Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">10K+</div>
                  <div className="text-sm text-gray-500">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">99%</div>
                  <div className="text-sm text-gray-500">Satisfaction</div>
                </div>
              </div>
            </div>
          </section>

          {/* Products Grid */}
          <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/30"></div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {products.map((product) => (
                  <div 
                    key={product.id} 
                    onClick={() => handleProductClick(product.href)}
                    className={`group relative bg-gradient-to-br ${product.bgColor} backdrop-blur-sm border border-white/50 rounded-3xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start gap-6 mb-6">
                        <div className={`w-20 h-20 bg-gradient-to-r ${product.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                          <span className="drop-shadow-sm">{product.icon}</span>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-800 mb-3">
                            {product.title}
                          </h3>
                          
                          <p className="text-gray-600 leading-relaxed mb-4">
                            {product.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {product.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] rounded-full"></div>
                            <span className="text-sm text-gray-700 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="inline-flex items-center text-base font-semibold text-gray-700 group-hover:text-gray-800">
                            Explore {product.title}
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>Free to start</span>
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-24 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/5"></div>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Start Your
                <br />
                Financial Journey?
              </h2>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-8">
                Join thousands of users who trust Umbrella for their financial planning and investment decisions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => router.push('/login')}
                  className="group bg-white text-[#FF6B2C] px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Get Started Today
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                
                <button 
                  onClick={() => router.push('/about')}
                  className="group bg-white/20 backdrop-blur-sm text-white px-8 py-4 border-2 border-white/30 rounded-xl text-lg font-semibold cursor-pointer hover:bg-white/30 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Learn More
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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