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
        <title>Financial Blog - Investment Tips, Market News & Expert Advice | IncomeGrow</title>
        <meta name="description" content="Stay updated with latest financial insights, investment tips, market news, and expert advice. Learn about tax planning, retirement, mutual funds, and wealth creation strategies." />
        <meta name="keywords" content="financial blog, investment tips, market news, tax planning, retirement planning, mutual funds, wealth creation, personal finance, stock market" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="canonical" href="https://www.incomegrow.in/products/blogs" />

        {/* Open Graph tags */}
        <meta property="og:title" content="Financial Blog - Investment Tips & Expert Advice | IncomeGrow" />
        <meta property="og:description" content="Stay updated with latest financial insights, investment tips, market news, and expert advice from our financial blog." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.incomegrow.in/products/blogs" />
        <meta property="og:site_name" content="IncomeGrow Financial" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://www.incomegrow.in/logo.png" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Financial Blog - Investment Tips & Expert Advice | IncomeGrow" />
        <meta name="twitter:description" content="Stay updated with latest financial insights, investment tips, market news, and expert advice from our financial blog." />
        <meta name="twitter:site" content="@IncomeGrow" />
        <meta name="twitter:image" content="https://www.incomegrow.in/logo.png" />

        {/* Structured Data - Blog Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Blog',
              name: 'IncomeGrow Financial Blog',
              description: 'Expert financial insights, investment tips, market news, and personal finance advice',
              url: 'https://www.incomegrow.in/products/blogs',
              publisher: {
                '@type': 'Organization',
                name: 'IncomeGrow Financial',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://www.incomegrow.in/logo.png',
                },
              },
            }),
          }}
        />

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://www.incomegrow.in',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Blogs',
                  item: 'https://www.incomegrow.in/products/blogs',
                },
              ],
            }),
          }}
        />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header />

        <main>
          {/* Compact Hero Section */}
          <section className="relative py-6 md:py-8 lg:py-10 bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-[1600px] mx-auto px-4 md:px-6">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                {/* Left Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full border border-indigo-200 mb-3">
                    <span className="text-xs md:text-sm font-semibold text-indigo-600">📝 Financial Insights</span>
                  </div>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                    <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                      Expert Insights
                    </span>
                    <span className="text-gray-800 dark:text-gray-200"> & Market Updates</span>
                  </h1>

                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4 max-w-2xl mx-auto lg:mx-0">
                    Stay ahead with expert analysis, investment strategies, and financial news.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <button
                      onClick={handleGetStarted}
                      className="group bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-2.5 border-none rounded-xl text-base font-semibold cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Subscribe to Newsletter
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Right Stats */}
                <div className="flex lg:grid lg:grid-cols-2 gap-4 lg:gap-6">
                  <div className="text-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                    <div className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-1">500+</div>
                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Articles</div>
                  </div>
                  <div className="text-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                    <div className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-1">50K+</div>
                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Readers</div>
                  </div>
                  <div className="text-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                    <div className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-1">15+</div>
                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Writers</div>
                  </div>
                  <div className="text-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                    <div className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-1">Daily</div>
                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Updates</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section className="py-4 md:py-6 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
            <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6">
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 md:px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                      selectedCategory === category.id
                        ? 'bg-[#FF6B2C] text-white shadow-md scale-105'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category.name}
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      selectedCategory === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Blog Posts Section */}
          <section className="py-8 md:py-12 bg-gray-50 dark:bg-gray-800 relative overflow-hidden transition-colors duration-300">
            <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6">
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  <span className="text-gray-800 dark:text-gray-200">Latest </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Articles
                  </span>
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md animate-pulse">
                      <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-3"></div>
                      <div className="space-y-2 mb-3">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      </div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                      <div className="space-y-2 mb-4">
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                      </div>
                      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-8 md:py-12 lg:py-16">
                  <div className="text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4">📝</div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">No articles found</h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 md:mb-6">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredPosts.map((post) => (
                  <article key={post.id} className="group bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-100 dark:border-gray-700 cursor-pointer" onClick={() => router.push(`/products/blogs/${post.slug}`)}>
                    {/* Post Header */}
                    <div className="mb-4">
                      <div className={`w-14 h-14 bg-gradient-to-r ${post.color} rounded-2xl flex items-center justify-center mb-3 text-2xl shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <span className="drop-shadow-sm">{post.image}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                            +{post.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="space-y-3">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-200 group-hover:text-[#FF6B2C] transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Post Meta */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-gray-800 dark:text-gray-200">{post.author}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{post.date}</div>
                          </div>
                        </div>

                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {post.readTime}
                        </div>
                      </div>

                      {/* Read More Button */}
                      <button
                        onClick={() => router.push(`/products/blogs/${post.slug}`)}
                        className="w-full bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                      >
                        Read More
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>
                  </article>
                  ))}
                </div>
              )}
              
              {/* Load More Button */}
              {!isLoading && filteredPosts.length > 6 && (
                <div className="text-center mt-8">
                  <button className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-base font-semibold cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">
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