import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  color: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

export default function Blogs() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    // Check for category parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/public/blogs?category=${selectedCategory}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      
      const data = await response.json();
      setBlogPosts(data.blogs || []);
      setCategories(data.categories || []);
    } catch (error: any) {
      console.error('Failed to fetch blogs:', error);
      setError('Failed to load blogs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  const filteredPosts = blogPosts;

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
        <title>Financial Blogs - IncomeGrow Financial</title>
        <meta name="description" content="Stay updated with latest financial insights, investment tips, market news, and expert advice from our financial blog." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-gray-50 via-white to-indigo-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-4 md:px-6 text-center">
              <div className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full border border-indigo-200 mb-4 md:mb-6 lg:mb-8">
                <span className="text-xs md:text-sm font-semibold text-indigo-600">📝 Financial Insights</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Expert Insights
                </span>
                <br />
                <span className="text-gray-800">& Market Updates</span>
              </h1>

              <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-4 md:mb-6 lg:mb-8">
                Stay ahead of the market with our expert analysis, investment strategies, 
                and the latest financial news to make informed decisions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12">
                <button
                  onClick={handleGetStarted}
                  className="group bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 md:px-8 py-3 md:py-4 border-none rounded-xl text-base md:text-lg font-semibold cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Subscribe to Newsletter
                  <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                
                <button className="group bg-white/80 backdrop-blur-sm text-gray-700 px-6 md:px-8 py-3 md:py-4 border-2 border-gray-200 rounded-xl text-base md:text-lg font-semibold cursor-pointer hover:bg-white hover:shadow-lg hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-2">
                  Browse Categories
                  <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">500+</div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-600">Articles Published</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">50K+</div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-600">Monthly Readers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">15+</div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-600">Expert Writers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Daily</div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-600">New Content</div>
                </div>
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section className="py-8 md:py-12 lg:py-16 bg-white border-b border-gray-100">
            <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6">
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 md:px-6 py-2 md:py-3 rounded-2xl text-sm md:text-base font-semibold transition-all duration-300 flex items-center gap-2 ${
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
          <section className="py-12 md:py-16 lg:py-24 bg-gray-50 relative overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6">
              <div className="text-center mb-8 md:mb-12 lg:mb-16">
                <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6">
                  <span className="text-gray-800">Latest </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Articles
                  </span>
                </h2>
                <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
                  Stay informed with our latest insights on investing, market trends, and financial planning
                </p>
              </div>

              {error && (
                <div className="text-center mb-4 md:mb-6 lg:mb-8">
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 md:px-4 py-2 md:py-3 rounded-lg inline-block text-sm md:text-base">
                    {error}
                  </div>
                </div>
              )}

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg animate-pulse">
                      <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gray-200 rounded-2xl mb-3 md:mb-4"></div>
                      <div className="space-y-3 mb-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded mb-3"></div>
                      <div className="space-y-2 mb-4">
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                      </div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-8 md:py-12 lg:py-16">
                  <div className="text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4">📝</div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">No articles found</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    {selectedCategory === 'all'
                      ? 'No blog posts available at the moment.'
                      : `No articles found in the ${categories.find(c => c.id === selectedCategory)?.name || selectedCategory} category.`
                    }
                  </p>
                  <button
                    onClick={() => router.push('/debug/seed-blogs')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold"
                  >
                    Seed Sample Blogs
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                  {filteredPosts.map((post) => (
                  <article key={post.id} className="group bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 cursor-pointer" onClick={() => router.push(`/products/blogs/${post.slug}`)}>
                    {/* Post Header */}
                    <div className="mb-4 md:mb-6">
                      <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${post.color} rounded-2xl flex items-center justify-center mb-3 md:mb-4 text-xl md:text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="drop-shadow-sm">{post.image}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-2 md:mb-3">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="space-y-3 md:space-y-4">
                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 group-hover:text-[#FF6B2C] transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      {/* Post Meta */}
                      <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-xs md:text-sm font-semibold text-gray-800">{post.author}</div>
                            <div className="text-xs text-gray-500">{post.date}</div>
                          </div>
                        </div>

                        <div className="text-xs md:text-sm text-gray-500">
                          {post.readTime}
                        </div>
                      </div>
                      
                      {/* Read More Button */}
                      <button
                        onClick={() => router.push(`/products/blogs/${post.slug}`)}
                        className="w-full bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white py-2.5 md:py-3 rounded-xl text-sm md:text-base font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                      >
                        Read More
                        <svg className="w-4 h-4 md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>
                  </article>
                  ))}
                </div>
              )}
              
              {/* Load More Button */}
              {!isLoading && filteredPosts.length > 0 && (
                <div className="text-center mt-8 md:mt-12 lg:mt-16">
                  <button className="bg-white text-gray-700 px-6 md:px-8 py-3 md:py-4 border-2 border-gray-200 rounded-xl text-base md:text-lg font-semibold cursor-pointer hover:bg-gray-50 hover:shadow-lg hover:border-gray-300 transition-all duration-300">
                    Load More Articles
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Newsletter Section */}
          {/* <section className="py-24 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] relative overflow-hidden">
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
          </section> */}
        </main>

        <Footer />
      </div>
    </>
  );
}