import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommentSystem from "@/components/CommentSystem";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  slug: string;
  metaDescription: string;
  featuredImage: string;
  viewCount: number;
  commentsEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

interface RecentBlog {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  featuredImage: string;
  viewCount: number;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

export default function BlogDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<RecentBlog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchBlogDetails();
    }
  }, [slug]);

  const fetchBlogDetails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/public/blog/${slug}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Blog post not found');
        } else {
          throw new Error('Failed to fetch blog details');
        }
        return;
      }
      
      const data = await response.json();
      setBlog(data.blog);
      setRecentBlogs(data.recentBlogs || []);
      setCategories(data.categories || []);
    } catch (error: any) {
      console.error('Failed to fetch blog details:', error);
      setError('Failed to load blog post');
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryColor = (category: string): string => {
    const colorMap: { [key: string]: string } = {
      'Investment': 'bg-blue-100 text-blue-800',
      'Personal Finance': 'bg-green-100 text-green-800',
      'Tax Planning': 'bg-pink-100 text-pink-800',
      'Insurance': 'bg-purple-100 text-purple-800',
      'Retirement Planning': 'bg-indigo-100 text-indigo-800',
      'Stock Market': 'bg-orange-100 text-orange-800',
      'Mutual Funds': 'bg-teal-100 text-teal-800',
      'Real Estate': 'bg-yellow-100 text-yellow-800',
      'Education': 'bg-cyan-100 text-cyan-800',
      'General': 'bg-gray-100 text-gray-800'
    };

    return colorMap[category] || 'bg-gray-100 text-gray-800';
  };

  const handleShare = (platform: string) => {
    if (!blog) return;

    const url = encodeURIComponent(`https://www.incomegrow.in/products/blogs/${blog.slug}`);
    const title = encodeURIComponent(blog.title);
    const description = encodeURIComponent(blog.metaDescription || blog.excerpt);

    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${title}%20${url}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(`https://www.incomegrow.in/products/blogs/${blog.slug}`)
          .then(() => {
            setShowCopySuccess(true);
            setTimeout(() => setShowCopySuccess(false), 3000);
          })
          .catch(() => {
            alert('Failed to copy link. Please try again.');
          });
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Loading... - IncomeGrow Financial</title>
        </Head>
        <div className="font-sans m-0 p-0 bg-white">
          <Header />
          <main className="py-16">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="space-y-4">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    </div>
                  </div>
                  <div>
                    <div className="h-64 bg-gray-200 rounded"></div>
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

  if (error) {
    return (
      <>
        <Head>
          <title>Error - IncomeGrow Financial</title>
        </Head>
        <div className="font-sans m-0 p-0 bg-white">
          <Header />
          <main className="py-16">
            <div className="w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="text-6xl mb-4">😞</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{error}</h1>
              <p className="text-gray-600 mb-8">The blog post you&apos;re looking for might have been moved or doesn&apos;t exist.</p>
              <button
                onClick={() => router.push('/products/blogs')}
                className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Back to All Blogs
              </button>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{blog.title} - IncomeGrow Financial</title>
        <meta name="description" content={blog.metaDescription || blog.excerpt} />
        <meta name="keywords" content={blog.tags.join(', ')} />
        <meta name="author" content={blog.author} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="canonical" href={`https://www.incomegrow.in/products/blogs/${blog.slug}`} />

        {/* Open Graph tags */}
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.metaDescription || blog.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.incomegrow.in/products/blogs/${blog.slug}`} />
        <meta property="og:site_name" content="IncomeGrow Financial" />
        <meta property="og:locale" content="en_US" />
        {blog.featuredImage && <meta property="og:image" content={blog.featuredImage} />}
        {blog.featuredImage && <meta property="og:image:alt" content={blog.title} />}

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.metaDescription || blog.excerpt} />
        <meta name="twitter:site" content="@IncomeGrow" />
        {blog.featuredImage && <meta name="twitter:image" content={blog.featuredImage} />}
        {blog.featuredImage && <meta name="twitter:image:alt" content={blog.title} />}

        {/* Article specific tags */}
        <meta property="article:author" content={blog.author} />
        <meta property="article:published_time" content={blog.createdAt} />
        <meta property="article:modified_time" content={blog.updatedAt} />
        <meta property="article:section" content={blog.category} />
        {blog.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}

        {/* Structured Data - Article Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: blog.title,
              description: blog.metaDescription || blog.excerpt,
              image: blog.featuredImage || 'https://www.incomegrow.in/logo.png',
              author: {
                '@type': 'Person',
                name: blog.author,
              },
              publisher: {
                '@type': 'Organization',
                name: 'IncomeGrow Financial',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://www.incomegrow.in/logo.png',
                },
              },
              datePublished: blog.createdAt,
              dateModified: blog.updatedAt,
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://www.incomegrow.in/products/blogs/${blog.slug}`,
              },
              keywords: blog.tags.join(', '),
              articleSection: blog.category,
              wordCount: blog.content.split(' ').length,
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
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: blog.title,
                  item: `https://www.incomegrow.in/products/blogs/${blog.slug}`,
                },
              ],
            }),
          }}
        />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Breadcrumb */}
          <section className="py-4 bg-gray-50 border-b border-gray-200">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <nav className="flex items-center space-x-2 text-sm text-gray-600">
                <button 
                  onClick={() => router.push('/')}
                  className="hover:text-[#FF6B2C] transition-colors"
                >
                  Home
                </button>
                <span>→</span>
                <button 
                  onClick={() => router.push('/products/blogs')}
                  className="hover:text-[#FF6B2C] transition-colors"
                >
                  Blogs
                </button>
                <span>→</span>
                <span className="text-gray-800 font-medium">{blog.title}</span>
              </nav>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16 bg-white">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side - Main Content */}
                <div className="lg:col-span-2">
                  <article className="bg-white">
                    {/* Article Header */}
                    <header className="mb-8">
                      {/* Category Badge */}
                      <div className="mb-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(blog.category)}`}>
                          {blog.category}
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {blog.title}
                      </h1>
                      
                      {/* Meta Information */}
                      <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {blog.author.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-800">{blog.author}</div>
                            <div className="text-xs text-gray-500">Author</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm">{blog.date}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm">{blog.readTime}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="text-sm">{blog.viewCount} views</span>
                        </div>
                      </div>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {blog.tags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Featured Image */}
                      {blog.featuredImage && (
                        <div className="mb-8">
                          <img 
                            src={blog.featuredImage} 
                            alt={blog.title}
                            className="w-full h-64 object-cover rounded-2xl shadow-lg"
                          />
                        </div>
                      )}
                    </header>
                    
                    {/* Article Content */}
                    <div 
                      className="prose prose-lg max-w-none mb-12"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                      style={{
                        lineHeight: '1.8',
                        fontSize: '1.1rem',
                        color: '#374151'
                      }}
                    />
                    
                    {/* Article Footer */}
                    <footer className="border-t border-gray-200 pt-8">
                      {/* Copy Success Notification */}
                      {showCopySuccess && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 animate-fade-in">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-green-700 font-medium">Link copied to clipboard!</span>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">Share this article</h3>
                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={() => handleShare('twitter')}
                              className="bg-black hover:bg-gray-900 text-white p-2 rounded-lg transition-all hover:scale-110 duration-200"
                              title="Share on X (formerly Twitter)"
                              aria-label="Share on X (formerly Twitter)"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                              </svg>
                            </button>
                            <button
                              onClick={() => handleShare('facebook')}
                              className="bg-blue-800 hover:bg-blue-900 text-white p-2 rounded-lg transition-all hover:scale-110 duration-200"
                              title="Share on Facebook"
                              aria-label="Share on Facebook"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                              </svg>
                            </button>
                            <button
                              onClick={() => handleShare('linkedin')}
                              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-all hover:scale-110 duration-200"
                              title="Share on LinkedIn"
                              aria-label="Share on LinkedIn"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                              </svg>
                            </button>
                            <button
                              onClick={() => handleShare('whatsapp')}
                              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-all hover:scale-110 duration-200"
                              title="Share on WhatsApp"
                              aria-label="Share on WhatsApp"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                              </svg>
                            </button>
                            <button
                              onClick={() => handleShare('copy')}
                              className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg transition-all hover:scale-110 duration-200"
                              title="Copy link"
                              aria-label="Copy link"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            Last updated: {new Date(blog.updatedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </footer>
                  </article>

                  {/* Comments Section */}
                  <div className="mt-12">
                    <CommentSystem 
                      blogId={blog.id}
                      commentsEnabled={blog.commentsEnabled}
                    />
                  </div>
                </div>

                {/* Right Side - Sidebar */}
                <div className="lg:col-span-1">
                  <div className="space-y-8 sticky top-8">
                    {/* Recent Blogs */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#FF6B2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Recent Articles
                      </h3>
                      
                      <div className="space-y-4">
                        {recentBlogs.map((recentBlog) => (
                          <article key={recentBlog.id} className="group cursor-pointer" onClick={() => router.push(`/products/blogs/${recentBlog.slug}`)}>
                            <div className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                              {recentBlog.featuredImage ? (
                                <img 
                                  src={recentBlog.featuredImage} 
                                  alt={recentBlog.title}
                                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                />
                              ) : (
                                <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                </div>
                              )}
                              
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-gray-800 group-hover:text-[#FF6B2C] transition-colors line-clamp-2 mb-1">
                                  {recentBlog.title}
                                </h4>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <span>{recentBlog.date}</span>
                                  <span>•</span>
                                  <span>{recentBlog.readTime}</span>
                                </div>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                      
                      <div className="mt-6">
                        <button
                          onClick={() => router.push('/products/blogs')}
                          className="w-full bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                          View All Articles
                        </button>
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#FF6B2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        Categories
                      </h3>
                      
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => router.push(`/products/blogs?category=${category.id}`)}
                            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group"
                          >
                            <span className="text-gray-700 group-hover:text-[#FF6B2C] transition-colors">
                              {category.name}
                            </span>
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {category.count}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Newsletter Signup */}
                    <div className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] rounded-2xl p-6 text-white">
                      <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
                      <p className="text-white/90 mb-4 text-sm">
                        Get the latest financial insights delivered to your inbox.
                      </p>
                      <div className="space-y-3">
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="w-full px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all"
                        />
                        <button className="w-full bg-white text-[#FF6B2C] py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                          Subscribe
                        </button>
                      </div>
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