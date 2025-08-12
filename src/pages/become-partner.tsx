import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
export default function BecomePartner() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    partnerType: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Partnership application:', formData);
    alert('Thank you for your interest! We will contact you soon.');
  };

  const partnerTypes = [
    {
      type: 'Financial Advisor',
      icon: '💼',
      title: 'Financial Advisory Partner',
      description: 'Join our network of certified financial advisors and expand your client base',
      benefits: ['Access to premium tools', 'Lead generation', 'Marketing support', 'Commission structure'],
      color: 'from-blue-400 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      type: 'Educational Institution',
      icon: '🎓',
      title: 'Educational Partner',
      description: 'Partner with us to provide financial literacy courses to your students',
      benefits: ['Curriculum integration', 'Certification programs', 'Student discounts', 'Faculty training'],
      color: 'from-green-400 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      type: 'Technology',
      icon: '⚡',
      title: 'Technology Partner',
      description: 'Integrate our APIs and tools into your platform for enhanced user experience',
      benefits: ['API access', 'Technical support', 'Co-development', 'Revenue sharing'],
      color: 'from-purple-400 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    },
    {
      type: 'Corporate',
      icon: '🏢',
      title: 'Corporate Partner',
      description: 'Offer our financial wellness programs to your employees as a benefit',
      benefits: ['Employee programs', 'Bulk discounts', 'Custom dashboards', 'Reporting tools'],
      color: 'from-orange-400 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100'
    }
  ];

  return (
    <>
      <Head>
        <title>Become a Partner - Umbrella Financial Partnership Program</title>
        <meta name="description" content="Join Umbrella's partnership program and grow your business with our comprehensive financial platform. Partner with us to expand your reach and revenue." />
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
                <span className="text-sm font-semibold text-[#FF6B2C]">🤝 Partnership Program</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Become a Partner
                </span>
                <br />
                <span className="text-gray-800">Grow Together</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                Join Umbrella&apos;s growing network of partners and unlock new opportunities for your business. 
                Together, we can empower more people to achieve financial freedom.
              </p>
              
              <div className="flex items-center justify-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">500+</div>
                  <div className="text-sm text-gray-500">Active Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">₹10Cr+</div>
                  <div className="text-sm text-gray-500">Partner Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">95%</div>
                  <div className="text-sm text-gray-500">Partner Satisfaction</div>
                </div>
              </div>
            </div>
          </section>

          {/* Partnership Types */}
          <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/30"></div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800">Partnership </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Opportunities
                  </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Choose the partnership model that best fits your business goals and start growing with us
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {partnerTypes.map((partner, index) => (
                  <div key={index} className={`group relative bg-gradient-to-br ${partner.bgColor} backdrop-blur-sm border border-white/50 rounded-3xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start gap-6 mb-6">
                        <div className={`w-20 h-20 bg-gradient-to-r ${partner.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                          <span className="drop-shadow-sm">{partner.icon}</span>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-800 mb-3">
                            {partner.title}
                          </h3>
                          
                          <p className="text-gray-600 leading-relaxed mb-4">
                            {partner.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800 mb-3">Key Benefits:</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {partner.benefits.map((benefit, benefitIndex) => (
                            <div key={benefitIndex} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] rounded-full"></div>
                              <span className="text-sm text-gray-700 font-medium">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Partnership Benefits */}
          <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 right-20 w-64 h-64 bg-gradient-to-r from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-20 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800">Why Partner </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    With Us?
                  </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Join a thriving ecosystem that supports your growth and success
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: '📈',
                    title: 'Revenue Growth',
                    description: 'Increase your revenue streams with our proven business models and commission structures'
                  },
                  {
                    icon: '🎯',
                    title: 'Market Expansion',
                    description: 'Access new markets and customer segments through our established platform and user base'
                  },
                  {
                    icon: '🛠️',
                    title: 'Advanced Tools',
                    description: 'Leverage our cutting-edge financial tools and technology to enhance your service offerings'
                  },
                  {
                    icon: '🎓',
                    title: 'Training & Support',
                    description: 'Get comprehensive training, ongoing support, and resources to ensure your success'
                  },
                  {
                    icon: '🤝',
                    title: 'Strategic Partnership',
                    description: 'Work closely with our team to develop customized solutions for your specific needs'
                  },
                  {
                    icon: '📊',
                    title: 'Analytics & Insights',
                    description: 'Access detailed analytics and market insights to make informed business decisions'
                  }
                ].map((benefit, index) => (
                  <div key={index} className="group bg-white/80 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/50">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="drop-shadow-sm">{benefit.icon}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {benefit.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Application Form */}
          <section className="py-24 bg-white relative overflow-hidden">
            <div className="relative w-full max-w-[1600px] mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                    <span className="text-gray-800">Ready to </span>
                    <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                      Get Started?
                    </span>
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Fill out the form below and our partnership team will get in touch with you within 24 hours
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12 shadow-xl border border-white/50">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent transition-all duration-200"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent transition-all duration-200"
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                          Company/Organization *
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent transition-all duration-200"
                          placeholder="Enter your company name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent transition-all duration-200"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="partnerType" className="block text-sm font-semibold text-gray-700 mb-2">
                        Partnership Type *
                      </label>
                      <select
                        id="partnerType"
                        name="partnerType"
                        value={formData.partnerType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select partnership type</option>
                        <option value="Financial Advisor">Financial Advisory Partner</option>
                        <option value="Educational Institution">Educational Partner</option>
                        <option value="Technology">Technology Partner</option>
                        <option value="Corporate">Corporate Partner</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Tell us about your business and partnership goals
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Describe your business, goals, and how you'd like to partner with us..."
                      />
                    </div>

                    <div className="text-center pt-4">
                      <button
                        type="submit"
                        className="group bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
                      >
                        Submit Application
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>
                  </form>
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