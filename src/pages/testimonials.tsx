import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

export default function Testimonials() {
  const router = useRouter();

  const testimonials = [
    {
      id: 1,
      text: "IncomeGrow's calculators made my investment planning so much easier. The interface is clean and the results are reliable! It's like having a financial advisor in my pocket.",
      author: "Amit Sharma",
      role: "Software Engineer",
      location: "Mumbai",
      rating: 5,
      avatar: "AS",
      date: "December 2024"
    },
    {
      id: 2,
      text: "The research and blogs on IncomeGrow are top notch. I feel more confident in my financial decisions now. The educational content is gold!",
      author: "Priya Reddy",
      role: "Content Creator",
      location: "Bangalore",
      rating: 5,
      avatar: "PR",
      date: "November 2024"
    },
    {
      id: 3,
      text: "As a broker, the knowledge base and tools have helped me serve my clients better. Highly recommended for both beginners and experts.",
      author: "Rahul Mehta",
      role: "Financial Advisor",
      location: "Delhi",
      rating: 5,
      avatar: "RM",
      date: "October 2024"
    },
    {
      id: 4,
      text: "The goal planning feature helped me save for my dream home. I achieved my target 6 months earlier than expected thanks to their systematic approach.",
      author: "Sneha Patel",
      role: "Marketing Manager",
      location: "Pune",
      rating: 5,
      avatar: "SP",
      date: "September 2024"
    },
    {
      id: 5,
      text: "Outstanding platform for learning about investments. The courses are well-structured and the instructors are knowledgeable. Worth every penny!",
      author: "Vikram Singh",
      role: "Business Owner",
      location: "Jaipur",
      rating: 5,
      avatar: "VS",
      date: "August 2024"
    },
    {
      id: 6,
      text: "The broker comparison feature saved me thousands in brokerage fees. Excellent tool for making informed decisions about trading platforms.",
      author: "Anita Gupta",
      role: "Day Trader",
      location: "Hyderabad",
      rating: 5,
      avatar: "AG",
      date: "July 2024"
    },
    {
      id: 7,
      text: "IncomeGrow transformed my financial literacy completely. From knowing nothing about investments to building a diversified portfolio in just 6 months!",
      author: "Rohit Kumar",
      role: "Teacher",
      location: "Kolkata",
      rating: 5,
      avatar: "RK",
      date: "June 2024"
    },
    {
      id: 8,
      text: "The market research reports are incredibly detailed and accurate. They've helped me make profitable investment decisions consistently.",
      author: "Deepika Sharma",
      role: "Investment Analyst",
      location: "Chennai",
      rating: 5,
      avatar: "DS",
      date: "May 2024"
    },
    {
      id: 9,
      text: "Customer support is fantastic! They answered all my queries promptly and helped me understand complex financial concepts easily.",
      author: "Arjun Nair",
      role: "IT Professional",
      location: "Kochi",
      rating: 5,
      avatar: "AN",
      date: "April 2024"
    },
    {
      id: 10,
      text: "The tax knowledge section is incredibly useful. It helped me optimize my tax planning and save a significant amount on taxes this year.",
      author: "Kavita Joshi",
      role: "Chartered Accountant",
      location: "Ahmedabad",
      rating: 5,
      avatar: "KJ",
      date: "March 2024"
    },
    {
      id: 11,
      text: "Love the mobile app! I can track my investments and goals on the go. The notifications keep me updated about market movements.",
      author: "Manish Agarwal",
      role: "Sales Manager",
      location: "Indore",
      rating: 5,
      avatar: "MA",
      date: "February 2024"
    },
    {
      id: 12,
      text: "The SIP calculator helped me plan my retirement perfectly. Now I'm confident about my financial future thanks to IncomeGrow's guidance.",
      author: "Sunita Rao",
      role: "Government Employee",
      location: "Mysore",
      rating: 5,
      avatar: "SR",
      date: "January 2024"
    }
  ];

  const stats = [
    {
      number: "10,000+",
      label: "Happy Users",
      description: "Trust our platform"
    },
    {
      number: "4.9/5",
      label: "Average Rating",
      description: "From user reviews"
    },
    {
      number: "₹50Cr+",
      label: "Assets Managed",
      description: "Through our platform"
    },
    {
      number: "99%",
      label: "Satisfaction Rate",
      description: "Customer approval"
    }
  ];

  return (
    <>
      <Head>
        <title>Testimonials - What Our Users Say | IncomeGrow Financial</title>
        <meta name="description" content="Read real testimonials from our satisfied users. Discover how IncomeGrow has helped thousands achieve their financial goals and build wealth." />
        <meta name="keywords" content="incomegrow testimonials, user reviews, customer feedback, success stories, financial platform reviews" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="canonical" href="https://www.incomegrow.in/testimonials" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        {/* Open Graph */}
        <meta property="og:title" content="Testimonials - What Our Users Say | IncomeGrow Financial" />
        <meta property="og:description" content="Read real testimonials from our satisfied users. Discover how IncomeGrow has helped thousands achieve their financial goals and build wealth." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.incomegrow.in/testimonials" />
        <meta property="og:site_name" content="IncomeGrow Financial" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://www.incomegrow.in/logo.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Testimonials - What Our Users Say | IncomeGrow Financial" />
        <meta name="twitter:description" content="Read real testimonials from our satisfied users. Discover how IncomeGrow has helped thousands achieve their financial goals." />
        <meta name="twitter:image" content="https://www.incomegrow.in/logo.png" />
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
                <span className="text-sm font-semibold text-[#FF6B2C]">⭐ User Stories</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-gray-800">What Our </span>
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Users Say
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Discover how IncomeGrow has transformed financial journeys across India. 
                Read real stories from our community of successful investors and learners.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-lg font-semibold text-gray-800 mb-1">{stat.label}</div>
                    <div className="text-sm text-gray-500">{stat.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Grid */}
          <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/30"></div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="group bg-white/80 backdrop-blur-md rounded-2xl p-8 text-left shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">{testimonial.date}</span>
                      </div>
                      
                      <div className="absolute top-4 right-4 text-4xl text-[#FF6B2C]/20 font-bold">
                        &ldquo;
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed mb-6 italic text-lg">
                        {testimonial.text}
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                          {testimonial.avatar}
                        </div>
                        
                        <div>
                          <div className="text-lg font-bold text-gray-800">
                            {testimonial.author}
                          </div>
                          <div className="text-sm text-gray-600">
                            {testimonial.role} • {testimonial.location}
                          </div>
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
                Ready to Write Your
                <br />
                Success Story?
              </h2>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-8">
                Join thousands of satisfied users who have transformed their financial future with IncomeGrow.
                Start your journey today!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => router.push('/login')}
                  className="group bg-white text-[#FF6B2C] px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Start Your Journey
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                
                <button 
                  onClick={() => router.push('/products')}
                  className="group bg-white/20 backdrop-blur-sm text-white px-8 py-4 border-2 border-white/30 rounded-xl text-lg font-semibold cursor-pointer hover:bg-white/30 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Explore Products
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-12 flex items-center justify-center gap-2 text-white/80">
                <span className="text-lg">⭐</span>
                <span className="text-lg">Trusted by 10,000+ users with 4.9/5 rating</span>
                <span className="text-lg">⭐</span>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}