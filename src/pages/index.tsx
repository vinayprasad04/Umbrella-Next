import Head from "next/head";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
      <Head>
        <title>Umbrella - Empowering Your Financial Journey</title>
        <meta name="description" content="Umbrella brings you the best tools, research, and knowledge to achieve your financial goals. Plan, invest, and grow with confidence." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="py-20 bg-white">
            <div className="w-full max-w-[1600px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-5 text-gray-800">
                  <span className="text-[#FF6B2C]">Empowering</span><br />
                  Your Financial Journey
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
                  Umbrella brings you the best tools, research, and knowledge to 
                  achieve your financial goals. Plan, invest, and grow with confidence.
                </p>
                
                <button 
                  onClick={handleGetStarted}
                  className="bg-[#FF6B2C] text-white px-8 py-4 border-none rounded-lg text-base font-semibold cursor-pointer hover:bg-[#e85d1f] transition-colors duration-200"
                >
                  {isLoggedIn ? 'Go to Dashboard' : 'Get Started'}
                </button>
              </div>
              
              <div className="flex justify-center">
                <div className="w-[500px] h-[400px] overflow-hidden relative rounded-2xl">
                  <Image
                    src="/banner.jpg"
                    alt="Financial planning and investment illustration"
                    width={500}
                    height={400}
                    priority
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* About Umbrella Section */}
          <section className="py-20 bg-white">
            <div className="w-full max-w-[1600px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-4xl font-bold text-[#FF6B2C] mb-8">
                  About Umbrella
                </h2>
                
                <p className="text-base text-gray-600 leading-relaxed mb-8">
                  Umbrella is dedicated to making financial knowledge accessible and 
                  actionable for everyone. Our platform combines expert research, 
                  powerful calculators, and a vibrant community to help you make smarter 
                  financial decisions. Whether you&apos;re planning for your future, investing, 
                  or seeking to expand your financial literacy, Umbrella is your trusted 
                  partner on the journey.
                </p>
                
                <button className="bg-[#FF6B2C] text-white px-6 py-3 border-none rounded-lg text-sm font-semibold cursor-pointer hover:bg-[#e85d1f] transition-colors duration-200">
                  Learn More
                </button>
              </div>
              
              <div className="flex justify-center lg:justify-end items-start pt-5">
                <div className="w-30 h-30 bg-[#FF6B2C] rounded-3xl flex items-center justify-center text-6xl text-white font-bold">
                  U
                </div>
              </div>
            </div>
          </section>

          {/* Our Products Section */}
          <section className="py-20 bg-white">
            <div className="w-full max-w-[1600px] mx-auto px-5 text-center">
              <h2 className="text-4xl font-bold text-[#FF6B2C] mb-16">
                Our Products
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
                {[
                  { icon: '🎯', title: 'Goal' },
                  { icon: '🎓', title: 'Course' },
                  { icon: '📈', title: 'Shares Research' },
                  { icon: '📰', title: 'Blogs' },
                  { icon: '🏛️', title: 'Brokers\nKnowledge' }
                ].map((product, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-10 text-center hover:shadow-lg transition-shadow duration-200">
                    <div className="w-16 h-16 bg-white border-2 border-[#FF6B2C] rounded-full flex items-center justify-center mx-auto mb-5 text-2xl">
                      {product.icon}
                    </div>
                    <h3 className="text-base font-bold text-gray-800 m-0 whitespace-pre-line">
                      {product.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* What Our Users Say Section */}
          <section className="py-20 bg-white">
            <div className="w-full max-w-[1600px] mx-auto px-5 text-center">
              <h2 className="text-4xl font-bold text-[#FF6B2C] mb-16">
                What Our Users Say
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    text: "Umbrella's calculators made my investment planning so much easier. The interface is clean and the results are reliable!",
                    author: "Amit S, Investor"
                  },
                  {
                    text: "The research and blogs on Umbrella are top notch. I feel more confident in my financial decisions now.",
                    author: "Priya R, Blogger"
                  },
                  {
                    text: "As a broker, the knowledge base and tools have helped me serve my clients better. Highly recommended!",
                    author: "Rahul M, Broker"
                  }
                ].map((testimonial, index) => (
                  <div key={index} className="bg-amber-50 rounded-xl p-8 relative text-left">
                    <div className="absolute top-4 left-4 text-2xl text-[#FF6B2C] font-bold">
                      &ldquo;
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed my-5 pt-4 italic">
                      {testimonial.text}
                    </p>
                    <div className="text-sm text-[#FF6B2C] font-bold">
                      {testimonial.author}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Trusted by Industry Leaders */}
          <section className="py-20 bg-white">
            <div className="w-full max-w-[1600px] mx-auto px-5 text-center">
              <h2 className="text-4xl font-bold text-[#FF6B2C] mb-16">
                Trusted by Industry Leaders
              </h2>
              
              <div className="flex justify-center items-center gap-16">
                <div className="w-16 h-16 bg-[#FF6B2C] rounded-lg"></div>
                <div className="w-16 h-16 bg-[#FF6B2C] rounded-full"></div>
                <div className="w-16 h-16 bg-[#FF6B2C] transform rotate-45"></div>
                <div className="w-16 h-16 bg-[#FF6B2C] rounded-lg"></div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}