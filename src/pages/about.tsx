import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function About() {
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

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Chief Executive Officer',
      description: 'Former Goldman Sachs investment banker with 15+ years in financial services',
      image: '👩‍💼',
      background: 'MBA from Wharton, CFA Charterholder'
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      description: 'Ex-Google engineer specializing in fintech and AI-driven financial solutions',
      image: '👨‍💻',
      background: 'MS Computer Science from Stanford'
    },
    {
      name: 'Priya Patel',
      role: 'Head of Investment Research',
      description: 'Portfolio manager with deep expertise in equity and debt markets',
      image: '👩‍🔬',
      background: '12 years at Fidelity Investments'
    },
    {
      name: 'David Williams',
      role: 'Head of Customer Success',
      description: 'Passionate about helping clients achieve their financial goals through education',
      image: '👨‍🎓',
      background: 'Former financial advisor at Merrill Lynch'
    }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Transparency',
      description: 'We believe in complete transparency in fees, processes, and investment strategies. No hidden costs, no surprises.'
    },
    {
      icon: '🛡️',
      title: 'Security',
      description: 'Your financial data and investments are protected by bank-level security measures and encryption.'
    },
    {
      icon: '📚',
      title: 'Education',
      description: 'We empower our users with knowledge through comprehensive financial education and market insights.'
    },
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'Leveraging cutting-edge technology to make investing accessible, simple, and effective for everyone.'
    },
    {
      icon: '🤝',
      title: 'Trust',
      description: 'Building long-term relationships based on trust, reliability, and consistent performance.'
    },
    {
      icon: '🌱',
      title: 'Growth',
      description: 'Committed to your financial growth and helping you build wealth systematically over time.'
    }
  ];

  const achievements = [
    {
      number: '50,000+',
      label: 'Happy Investors',
      description: 'Users trust us with their financial journey'
    },
    {
      number: '₹500Cr+',
      label: 'Assets Managed',
      description: 'Total portfolio value across all users'
    },
    {
      number: '98%',
      label: 'Satisfaction Rate',
      description: 'Customer satisfaction score'
    },
    {
      number: '5 Years',
      label: 'Track Record',
      description: 'Consistent performance and growth'
    }
  ];

  return (
    <>
      <Head>
        <title>About Us - IncomeGrow Financial</title>
        <meta name="description" content="Learn about IncomeGrow Financial's mission to democratize investing and help millions achieve financial freedom through smart investment strategies." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-orange-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-[#FF6B2C]/10 to-[#FF8A50]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-green-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-full border border-orange-200 mb-8">
                <span className="text-sm font-semibold text-orange-600">🏢 About IncomeGrow Financial</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-gray-800">Empowering Your </span>
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Financial Future
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                We&apos;re on a mission to democratize investing and make financial freedom accessible to everyone. 
                Through cutting-edge technology and expert insights, we help millions build wealth systematically.
              </p>
              
              <button 
                onClick={handleGetStarted}
                className="group bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
              >
                {isLoggedIn ? 'Go to Dashboard' : 'Start Your Journey'}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-24 bg-white">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                    <span className="text-gray-800">Our </span>
                    <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                      Mission
                    </span>
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-lg text-gray-600 leading-relaxed">
                      At IncomeGrow Financial, we believe that everyone deserves access to professional-grade 
                      investment tools and strategies, regardless of their wealth or background.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      We&apos;re breaking down the barriers to smart investing by providing intuitive calculators, 
                      expert insights, and personalized guidance that was once available only to high-net-worth individuals.
                    </p>
                    
                    <div className="bg-gradient-to-r from-[#FF6B2C]/10 to-[#FF8A50]/10 rounded-2xl p-6 border border-[#FF6B2C]/20">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Our Vision</h3>
                      <p className="text-gray-700">
                        To become India&apos;s most trusted financial platform, helping millions of families 
                        achieve financial independence through smart, systematic investing.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B2C]/20 to-[#FF8A50]/20 rounded-3xl blur-3xl"></div>
                  <Image
                    src="/banner.jpg"
                    alt="Financial Growth Vision"
                    width={600}
                    height={400}
                    className="relative rounded-3xl shadow-2xl border border-white/20"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Achievements */}
          <section className="py-24 bg-gray-50">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800">Our </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Impact
                  </span>
                </h2>
                
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Numbers that speak to our commitment to helping you succeed
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 text-center">
                    <div className="text-4xl font-bold text-[#FF6B2C] mb-3 group-hover:scale-110 transition-transform duration-300">
                      {achievement.number}
                    </div>
                    <div className="text-xl font-bold text-gray-800 mb-2">
                      {achievement.label}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {achievement.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-24 bg-white">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800">Our </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Values
                  </span>
                </h2>
                
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  The principles that guide everything we do
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {value.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="py-24 bg-gray-50">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800">Meet Our </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Team
                  </span>
                </h2>
                
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Experienced professionals dedicated to your financial success
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">{member.image}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {member.name}
                    </h3>
                    
                    <div className="text-[#FF6B2C] font-semibold text-sm mb-3">
                      {member.role}
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {member.description}
                    </p>
                    
                    <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
                      {member.background}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Start Your Journey?
              </h2>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Join thousands of smart investors who trust IncomeGrow Financial for their wealth-building journey
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleGetStarted}
                  className="group bg-white text-[#FF6B2C] px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isLoggedIn ? 'Go to Dashboard' : 'Get Started Free'}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                
                <button 
                  onClick={() => router.push('/support/contact-us')}
                  className="bg-white/10 text-white px-8 py-4 border-2 border-white/30 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  Contact Us
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