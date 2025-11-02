import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  icon: string;
  faqs: FAQItem[];
}

export default function FAQ() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeCategory, setActiveCategory] = useState('general');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const faqData: FAQCategory[] = [
    {
      category: 'general',
      icon: '❓',
      faqs: [
        {
          question: 'What is IncomeGrow Financial?',
          answer: 'IncomeGrow Financial is a comprehensive financial platform that provides investment tools, calculators, financial planning services, and educational resources to help individuals make informed financial decisions.'
        },
        {
          question: 'Is IncomeGrow Financial regulated?',
          answer: 'Yes, we are regulated by relevant financial authorities and comply with all applicable financial regulations. We maintain the highest standards of security and transparency.'
        },
        {
          question: 'How do I get started with IncomeGrow Financial?',
          answer: 'Simply create a free account on our platform. Once registered, you can access our calculators, educational resources, and begin exploring investment opportunities.'
        },
        {
          question: 'What services does IncomeGrow Financial offer?',
          answer: 'We offer financial calculators, investment planning tools, educational resources, market research, portfolio management services, and personalized financial advice.'
        }
      ]
    },
    {
      category: 'account',
      icon: '👤',
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'Click on the "Sign Up" button on our homepage, provide your basic information including name, email, and phone number, verify your email, and set up your password. The process takes just a few minutes.'
        },
        {
          question: 'I forgot my password. How do I reset it?',
          answer: 'Click on "Forgot Password" on the login page, enter your registered email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.'
        },
        {
          question: 'How do I update my profile information?',
          answer: 'Log into your account, go to the "Profile" or "Settings" section, and update your personal information. Make sure to save your changes after updating.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we use bank-level encryption and security measures to protect your personal and financial information. We never share your data with third parties without your consent.'
        }
      ]
    },
    {
      category: 'calculators',
      icon: '🧮',
      faqs: [
        {
          question: 'How accurate are your financial calculators?',
          answer: 'Our calculators use industry-standard financial formulas and are regularly updated for accuracy. However, results are estimates based on the inputs provided and should be used for planning purposes only.'
        },
        {
          question: 'Can I save my calculator results?',
          answer: 'Yes, registered users can save their calculator results to their dashboard for future reference and comparison. This helps in tracking different scenarios and planning strategies.'
        },
        {
          question: 'Which calculator should I use for retirement planning?',
          answer: 'For retirement planning, we recommend using our Goal Planner calculator or EIM (Equity Investment Management) calculator. These tools help you determine how much to save and invest for retirement.'
        },
        {
          question: 'Do you have calculators for tax planning?',
          answer: 'Yes, we have tax calculators in our "Other Calculators" section that can help you estimate your tax liability and plan tax-saving investments accordingly.'
        }
      ]
    },
    {
      category: 'investments',
      icon: '📈',
      faqs: [
        {
          question: 'What types of investments can I make through your platform?',
          answer: 'We offer access to mutual funds, stocks, bonds, SIPs, fixed deposits, and various other investment instruments. Our platform helps you choose investments based on your risk profile and goals.'
        },
        {
          question: 'What is the minimum investment amount?',
          answer: 'Minimum investment amounts vary by product. For SIPs, you can start with as little as ₹500 per month. For lump sum investments, minimums typically start from ₹5,000.'
        },
        {
          question: 'How do I track my investment performance?',
          answer: 'Once you\'ve made investments through our platform, you can track their performance in your dashboard. We provide real-time updates, portfolio analytics, and detailed performance reports.'
        },
        {
          question: 'Can I withdraw my investments anytime?',
          answer: 'Most investments offer liquidity, but terms vary by product. Equity investments can typically be redeemed anytime, while some products like ELSS have lock-in periods. Check specific terms before investing.'
        }
      ]
    },
    {
      category: 'technical',
      icon: '⚙️',
      faqs: [
        {
          question: 'The website is not loading properly. What should I do?',
          answer: 'Try clearing your browser cache and cookies, refresh the page, or try accessing from a different browser. If the issue persists, contact our technical support team.'
        },
        {
          question: 'I\'m having trouble logging into my account',
          answer: 'Ensure you\'re using the correct email and password. Check if Caps Lock is on. If you still can\'t log in, use the "Forgot Password" option or contact support.'
        },
        {
          question: 'Is your platform mobile-friendly?',
          answer: 'Yes, our platform is fully responsive and works seamlessly on mobile devices, tablets, and desktops. We also have mobile apps available for download.'
        },
        {
          question: 'Do you have a mobile app?',
          answer: 'Yes, we have mobile apps available for both Android and iOS. You can download them from Google Play Store or Apple App Store respectively.'
        }
      ]
    },
    {
      category: 'fees',
      icon: '💰',
      faqs: [
        {
          question: 'What fees do you charge?',
          answer: 'We maintain transparent fee structure. Most calculators and basic services are free. Investment products have varying fees depending on the product type. All fees are clearly disclosed before you invest.'
        },
        {
          question: 'Are there any hidden charges?',
          answer: 'No, we believe in complete transparency. All charges are clearly mentioned upfront. There are no hidden fees or surprise charges.'
        },
        {
          question: 'How are advisory fees calculated?',
          answer: 'Advisory fees are typically calculated as a percentage of assets under management (AUM) and vary based on the service level. Detailed fee structure is provided during consultation.'
        },
        {
          question: 'Can I get a fee waiver?',
          answer: 'We occasionally offer promotional fee waivers for new customers or high-value clients. Contact our relationship manager to discuss available offers.'
        }
      ]
    }
  ];

  const categories = [
    { id: 'general', name: 'General', icon: '❓' },
    { id: 'account', name: 'Account & Login', icon: '👤' },
    { id: 'calculators', name: 'Calculators', icon: '🧮' },
    { id: 'investments', name: 'Investments', icon: '📈' },
    { id: 'technical', name: 'Technical Support', icon: '⚙️' },
    { id: 'fees', name: 'Fees & Charges', icon: '💰' }
  ];

  const filteredFAQs = faqData.find(cat => cat.category === activeCategory)?.faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const toggleFAQ = (index: number) => {
    const faqKey = `${activeCategory}-${index}`;
    setOpenFAQ(openFAQ === faqKey ? null : faqKey);
  };

  const handleGetStarted = () => {
    if (isLoggedIn) {
      router.push('/dashboard');
    } else {
      router.push('/signup');
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSearchTerm('');
    setOpenFAQ(null);

    // Scroll to FAQ content section
    setTimeout(() => {
      const faqSection = document.getElementById('faq-content');
      if (faqSection) {
        faqSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  return (
    <>
      <Head>
        <title>FAQ - IncomeGrow Financial</title>
        <meta name="description" content="Frequently asked questions about IncomeGrow Financial. Find answers to common questions about our services, calculators, investments, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200 mb-8">
                <span className="text-sm font-semibold text-blue-600">❓ Help Center</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Frequently Asked
                </span>
                <br />
                <span className="text-gray-800">Questions</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Find quick answers to the most common questions about our services, 
                calculators, investments, and platform features.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    className="w-full px-6 py-4 pl-12 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 text-lg shadow-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="py-12 bg-white border-b border-gray-200">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setSearchTerm('');
                      setOpenFAQ(null);
                    }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Content */}
          <section id="faq-content" className="py-24 bg-gray-50">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                {filteredFAQs.length > 0 ? (
                  <div className="space-y-4">
                    {filteredFAQs.map((faq, index) => (
                      <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <button
                          onClick={() => toggleFAQ(index)}
                          className="w-full p-6 text-left hover:bg-gray-50 transition-all duration-200 flex items-center justify-between"
                        >
                          <h3 className="text-lg font-semibold text-gray-800 pr-4">
                            {faq.question}
                          </h3>
                          <svg 
                            className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 flex-shrink-0 ${
                              openFAQ === `${activeCategory}-${index}` ? 'rotate-180' : ''
                            }`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {openFAQ === `${activeCategory}-${index}` && (
                          <div className="px-6 pb-6 pt-0 border-t border-gray-100">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-6">🔍</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">No FAQs Found</h3>
                    <p className="text-gray-600 mb-6">
                      We couldn&apos;t find any FAQs matching your search. Try different keywords or browse categories.
                    </p>
                    <button
                      onClick={() => setSearchTerm('')}
                      className="bg-[#FF6B2C] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#FF8A50] transition-all duration-300"
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Contact Support */}
          <section className="py-24 bg-white">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="bg-gradient-to-br from-[#FF6B2C]/10 to-[#FF8A50]/10 rounded-3xl p-12 text-center border border-[#FF6B2C]/20">
                <div className="text-5xl mb-6">🤝</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Can&apos;t Find What You&apos;re Looking For?
                </h2>
                
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Our support team is here to help! Contact us for personalized assistance 
                  with any questions not covered in our FAQ section.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => router.push('/support/contact-us')}
                    className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2"
                  >
                    Contact Support
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  
                  <button 
                    onClick={handleGetStarted}
                    className="bg-white text-[#FF6B2C] px-8 py-4 border-2 border-[#FF6B2C] rounded-xl text-lg font-semibold cursor-pointer hover:bg-[#FF6B2C] hover:text-white transition-all duration-300"
                  >
                    {isLoggedIn ? 'Go to Dashboard' : 'Get Started'}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Popular Topics */}
          <section className="py-24 bg-gray-50">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800">Popular </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Topics
                  </span>
                </h2>
                
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Quick access to the most searched topics and questions
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category, index) => {
                  const categoryData = faqData.find(cat => cat.category === category.id);
                  const faqCount = categoryData?.faqs.length || 0;
                  
                  return (
                    <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
                         onClick={() => handleCategoryClick(category.id)}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{category.icon}</div>
                          <h3 className="text-lg font-bold text-gray-800">{category.name}</h3>
                        </div>
                        <div className="text-sm text-gray-500">{faqCount} FAQs</div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4">
                        {categoryData?.faqs[0]?.question || 'Click to explore questions in this category'}
                      </p>
                      
                      <div className="text-[#FF6B2C] text-sm font-semibold group-hover:text-[#FF8A50] transition-colors duration-200">
                        View Questions →
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}