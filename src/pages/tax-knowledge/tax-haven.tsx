import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function TaxHaven() {
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

  const taxHavenCountries = [
    {
      name: 'Singapore',
      description: 'Strategic location with favorable tax policies for businesses and individuals',
      features: ['0% capital gains tax', 'Territorial tax system', 'Strong banking system'],
      icon: '🇸🇬'
    },
    {
      name: 'Switzerland',
      description: 'Long-established financial center with bank secrecy laws',
      features: ['Low corporate tax rates', 'Privacy protection', 'Political stability'],
      icon: '🇨🇭'
    },
    {
      name: 'UAE (Dubai)',
      description: 'No personal income tax and business-friendly environment',
      features: ['0% personal income tax', 'Free trade zones', 'Strategic location'],
      icon: '🇦🇪'
    },
    {
      name: 'Cayman Islands',
      description: 'Popular offshore financial center with no direct taxation',
      features: ['No income tax', 'No capital gains tax', 'Strong legal framework'],
      icon: '🏝️'
    }
  ];

  const taxPlanningTips = [
    {
      title: 'Legal Tax Planning',
      description: 'Understand legitimate ways to minimize tax liability through proper planning',
      icon: '⚖️'
    },
    {
      title: 'Double Taxation Treaties',
      description: 'Learn about agreements between countries to avoid double taxation',
      icon: '🤝'
    },
    {
      title: 'Reporting Requirements',
      description: 'Stay compliant with disclosure and reporting obligations in your home country',
      icon: '📋'
    },
    {
      title: 'Professional Advice',
      description: 'Consult with tax professionals before making any offshore investments',
      icon: '👨‍💼'
    }
  ];

  return (
    <>
      <Head>
        <title>Tax Haven Guide - Umbrella Financial</title>
        <meta name="description" content="Learn about tax havens, offshore financial centers, and legal tax planning strategies. Understand the implications and requirements." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200 mb-8">
                <span className="text-sm font-semibold text-blue-600">🏦 Tax Knowledge</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Tax Haven
                </span>
                <br />
                <span className="text-gray-800">Guide</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Understand tax havens, offshore financial centers, and legal tax optimization strategies. 
                Learn about compliance requirements and make informed decisions.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 max-w-4xl mx-auto mb-8">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">⚠️</div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
                    <p className="text-yellow-700">
                      This information is for educational purposes only. Always consult with qualified tax professionals 
                      and legal advisors before making any offshore financial decisions. Ensure full compliance with 
                      your home country&apos;s tax laws and reporting requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What is a Tax Haven Section */}
          <section className="py-24 bg-white">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800">What is a </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Tax Haven?
                  </span>
                </h2>
                
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  A tax haven is a country or jurisdiction that offers favorable tax policies to foreign individuals 
                  and businesses, typically featuring low or zero tax rates, financial secrecy, and minimal reporting requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <div className="text-4xl mb-4">💰</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Low Tax Rates</h3>
                  <p className="text-gray-600">
                    Tax havens typically offer significantly lower corporate and individual tax rates compared to high-tax jurisdictions.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                  <div className="text-4xl mb-4">🔒</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Financial Privacy</h3>
                  <p className="text-gray-600">
                    Many tax havens provide enhanced financial privacy and confidentiality protections for account holders.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-100">
                  <div className="text-4xl mb-4">📋</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Minimal Reporting</h3>
                  <p className="text-gray-600">
                    Reduced regulatory requirements and simplified reporting procedures for businesses and individuals.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Popular Tax Haven Countries */}
          <section className="py-24 bg-gray-50">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800">Popular </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Tax Havens
                  </span>
                </h2>
                
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Learn about some of the world&apos;s most well-known offshore financial centers and their key features
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {taxHavenCountries.map((country, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="text-4xl mr-4">{country.icon}</div>
                      <h3 className="text-2xl font-bold text-gray-800">{country.name}</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{country.description}</p>
                    
                    <div className="space-y-3">
                      {country.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-[#FF6B2C] rounded-full mr-3"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Legal Tax Planning Tips */}
          <section className="py-24 bg-white">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800">Legal Tax </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Planning
                  </span>
                </h2>
                
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Important considerations for legitimate and compliant tax optimization strategies
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {taxPlanningTips.map((tip, index) => (
                  <div key={index} className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{tip.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">{tip.title}</h3>
                        <p className="text-gray-600">{tip.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Compliance Warning */}
          <section className="py-24 bg-red-50">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-red-100">
                <div className="text-center">
                  <div className="text-6xl mb-6">🚨</div>
                  <h2 className="text-3xl font-bold text-red-600 mb-6">Compliance is Critical</h2>
                  
                  <div className="text-left max-w-4xl mx-auto space-y-6">
                    <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                      <h3 className="text-xl font-semibold text-red-800 mb-3">Reporting Obligations</h3>
                      <p className="text-red-700">
                        Many countries require their residents to report offshore accounts and income. 
                        Failure to comply can result in severe penalties and legal consequences.
                      </p>
                    </div>
                    
                    <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                      <h3 className="text-xl font-semibold text-yellow-800 mb-3">FATCA & CRS</h3>
                      <p className="text-yellow-700">
                        The Foreign Account Tax Compliance Act (FATCA) and Common Reporting Standard (CRS) 
                        have increased transparency and automatic information exchange between countries.
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                      <h3 className="text-xl font-semibold text-blue-800 mb-3">Seek Professional Advice</h3>
                      <p className="text-blue-700">
                        Always consult with qualified tax advisors, legal professionals, and financial experts 
                        before making any offshore financial decisions or investments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Get Expert Tax Advice
              </h2>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Consult with our tax professionals for personalized advice on legal tax optimization strategies
              </p>
              
              <button 
                onClick={handleGetStarted}
                className="group bg-white text-[#FF6B2C] px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
              >
                {isLoggedIn ? 'Consult Tax Expert' : 'Get Started'}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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