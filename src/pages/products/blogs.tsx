import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Blogs() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const categories = [
    { id: 'all', name: 'All Posts', count: 45 },
    { id: 'investing', name: 'Investing', count: 18 },
    { id: 'market-news', name: 'Market News', count: 12 },
    { id: 'personal-finance', name: 'Personal Finance', count: 10 },
    { id: 'tips', name: 'Tips & Strategies', count: 8 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "10 Best Blue Chip Stocks to Invest in 2024",
      excerpt: "Discover the top blue chip stocks that offer stability and consistent returns for long-term investors.",
      author: "Rajesh Kumar",
      date: "Dec 15, 2024",
      readTime: "8 min read",
      category: "investing",
      image: "📈",
      tags: ["Stocks", "Blue Chip", "Long-term"],
      color: "from-blue-400 to-blue-600"
    },
    {
      id: 2,
      title: "Understanding SIP: A Complete Guide for Beginners",
      excerpt: "Learn everything about Systematic Investment Plans and how they can help you build wealth systematically.",
      author: "Priya Sharma",
      date: "Dec 12, 2024",
      readTime: "6 min read",
      category: "personal-finance",
      image: "💰",
      tags: ["SIP", "Mutual Funds", "Beginner"],
      color: "from-green-400 to-green-600"
    },
    {
      id: 3,
      title: "Market Volatility: How to Protect Your Portfolio",
      excerpt: "Strategies to safeguard your investments during market downturns and volatile conditions.",
      author: "Amit Singh",
      date: "Dec 10, 2024",
      readTime: "10 min read",
      category: "tips",
      image: "🛡️",
      tags: ["Risk Management", "Portfolio", "Strategy"],
      color: "from-purple-400 to-purple-600"
    },
    {
      id: 4,
      title: "RBI Policy Impact on Banking Stocks",
      excerpt: "Analysis of how recent RBI policy changes are affecting banking sector stocks and future outlook.",
      author: "Dr. Neha Gupta",
      date: "Dec 8, 2024",
      readTime: "7 min read",
      category: "market-news",
      image: "🏦",
      tags: ["Banking", "RBI", "Policy"],
      color: "from-orange-400 to-orange-600"
    },
    {
      id: 5,
      title: "Tax-Saving Investments: ELSS vs ULIP vs PPF",
      excerpt: "Complete comparison of tax-saving investment options to help you make the right choice.",
      author: "Vikash Jain",
      date: "Dec 5, 2024",
      readTime: "9 min read",
      category: "personal-finance",
      image: "🧾",
      tags: ["Tax Saving", "ELSS", "ULIP", "PPF"],
      color: "from-pink-400 to-pink-600"
    },
    {
      id: 6,
      title: "Crypto Investment: Risks and Opportunities",
      excerpt: "Understanding the cryptocurrency market and how to approach crypto investments safely.",
      author: "Arjun Patel",
      date: "Dec 3, 2024",
      readTime: "12 min read",
      category: "investing",
      image: "₿",
      tags: ["Cryptocurrency", "Bitcoin", "Alternative Investment"],
      color: "from-yellow-400 to-orange-500"
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

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
        <title>Financial Blogs - Umbrella Financial</title>
        <meta name="description" content="Stay updated with latest financial insights, investment tips, market news, and expert advice from our financial blog." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-indigo-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full border border-indigo-200 mb-8">
                <span className="text-sm font-semibold text-indigo-600">📝 Financial Insights</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Expert Insights
                </span>
                <br />
                <span className="text-gray-800">& Market Updates</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Stay ahead of the market with our expert analysis, investment strategies, 
                and the latest financial news to make informed decisions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button 
                  onClick={handleGetStarted}
                  className="group bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Subscribe to Newsletter
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                
                <button className="group bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 border-2 border-gray-200 rounded-xl text-lg font-semibold cursor-pointer hover:bg-white hover:shadow-lg hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-2">
                  Browse Categories
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">500+</div>
                  <div className="text-gray-600">Articles Published</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">50K+</div>
                  <div className="text-gray-600">Monthly Readers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">15+</div>
                  <div className="text-gray-600">Expert Writers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">Daily</div>
                  <div className="text-gray-600">New Content</div>
                </div>
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section className="py-16 bg-white border-b border-gray-100">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                      selectedCategory === category.id
                        ? 'bg-[#FF6B2C] text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      selectedCategory === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Blog Posts Section */}
          <section className="py-24 bg-gray-50 relative overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800">Latest </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Articles
                  </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Stay informed with our latest insights on investing, market trends, and financial planning
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100">
                    {/* Post Header */}
                    <div className="mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${post.color} rounded-2xl flex items-center justify-center mb-4 text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="drop-shadow-sm">{post.image}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Post Content */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#FF6B2C] transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      {/* Post Meta */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-800">{post.author}</div>
                            <div className="text-xs text-gray-500">{post.date}</div>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-500">
                          {post.readTime}
                        </div>
                      </div>
                      
                      {/* Read More Button */}
                      <button className="w-full bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                        Read More
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              
              {/* Load More Button */}
              <div className="text-center mt-16">
                <button className="bg-white text-gray-700 px-8 py-4 border-2 border-gray-200 rounded-xl text-lg font-semibold cursor-pointer hover:bg-gray-50 hover:shadow-lg hover:border-gray-300 transition-all duration-300">
                  Load More Articles
                </button>
              </div>
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="py-24 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Never Miss an Update
              </h2>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Subscribe to our newsletter and get the latest financial insights delivered to your inbox
              </p>
              
              <div className="max-w-md mx-auto mb-8">
                <div className="flex gap-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                  />
                  <button className="bg-white text-[#FF6B2C] px-6 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                    Subscribe
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-white/70">
                Join 50,000+ readers. Unsubscribe anytime.
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}