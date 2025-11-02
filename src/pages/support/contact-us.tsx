import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useRouter } from "next/router";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function ContactUs() {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  // const [isLoggedIn] = useState(false); // Currently unused
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [contactId, setContactId] = useState('');

  // useEffect(() => {
  //   const loggedIn = localStorage.getItem('loggedIn') === 'true';
  //   setIsLoggedIn(loggedIn);
  // }, []); // Currently unused

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Execute reCAPTCHA v3
      if (!executeRecaptcha) {
        throw new Error('reCAPTCHA not loaded. Please refresh the page.');
      }

      const recaptchaToken = await executeRecaptcha('contact_form');

      // Verify reCAPTCHA token
      const recaptchaResponse = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: recaptchaToken }),
      });

      const recaptchaData = await recaptchaResponse.json();

      if (!recaptchaData.success) {
        throw new Error('reCAPTCHA verification failed. Please try again.');
      }

      // Submit contact form
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'website',
          recaptchaToken
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      // Success
      setShowSuccess(true);
      setContactId(data.contactId);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        category: 'general'
      });

      // Auto-hide success message after 7 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setContactId('');
      }, 7000);

    } catch (error: any) {
      console.error('Contact form error:', error);
      setError(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      contact: 'vinay.qss@gmail.com',
      available: '24/7'
    },
    // {
    //   icon: '📞',
    //   title: 'Phone Support',
    //   description: 'Speak directly with our experts',
    //   contact: '+91-9876543210',
    //   available: 'Mon-Fri, 9 AM - 6 PM IST'
    // },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Instant support through live chat',
      contact: 'Not Available',
      available: 'Mon-Fri, 9 AM - 6 PM IST'
    },
    {
      icon: '📍',
      title: 'Visit Office',
      description: 'Meet us at our office location',
      contact: 'Krishan Vihar, Delhi, India',
      available: 'Mon-Fri, 10 AM - 5 PM IST'
    }
  ];

  const faqCategories = [
    {
      category: 'Account & Investment',
      questions: [
        'How do I open an investment account?',
        'What are the minimum investment requirements?',
        'How can I track my investment performance?'
      ]
    },
    {
      category: 'Calculators & Tools',
      questions: [
        'How accurate are your financial calculators?',
        'Can I save my calculation results?',
        'Which calculator should I use for retirement planning?'
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        'I&apos;m having trouble logging into my account',
        'The website is not loading properly',
        'How do I reset my password?'
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Contact Us - IncomeGrow Financial</title>
        <meta name="description" content="Get in touch with IncomeGrow Financial. Contact our support team for help with investments, calculators, and financial planning." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-green-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-green-400/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative w-full max-w-[1600px] mx-auto px-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-full border border-green-200 mb-8">
                <span className="text-sm font-semibold text-green-600">📞 Support Center</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                  Contact
                </span>
                <br />
                <span className="text-gray-800">Our Team</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                We&apos;re here to help! Reach out to our expert team for support with investments, 
                financial planning, or any questions about our services.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">24/7</div>
                  <div className="text-gray-600">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">Expert</div>
                  <div className="text-gray-600">Guidance</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">Quick</div>
                  <div className="text-gray-600">Response</div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Methods */}
          <section className="py-24 bg-white">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800">Get in </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Touch
                  </span>
                </h2>
                
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Choose your preferred way to contact us. We&apos;re available through multiple channels
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {contactMethods.map((method, index) => (
                  <div key={index} className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="text-center">
                      <div className="text-4xl mb-4">{method.icon}</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{method.title}</h3>
                      <p className="text-gray-600 mb-4">{method.description}</p>
                      <div className="bg-[#FF6B2C]/10 rounded-lg p-3 mb-2">
                        <div className="text-sm font-semibold text-[#FF6B2C]">{method.contact}</div>
                      </div>
                      <div className="text-xs text-gray-500">{method.available}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="py-24 bg-gray-50">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                    <span className="text-gray-800">Send us a </span>
                    <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                      Message
                    </span>
                  </h2>
                  
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Fill out the form below and we&apos;ll get back to you as soon as possible
                  </p>
                </div>

                {showSuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">✅</div>
                      <div>
                        <h3 className="text-lg font-semibold text-green-800">Message Sent Successfully!</h3>
                        <p className="text-green-700 mb-2">Thank you for contacting us. We&apos;ll get back to you within 24 hours.</p>
                        {contactId && (
                          <p className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                            Reference ID: {contactId.slice(-8).toUpperCase()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">❌</div>
                      <div>
                        <h3 className="text-lg font-semibold text-red-800">Error Sending Message</h3>
                        <p className="text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Your full name"
                          className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="your.email@example.com"
                          className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+91 9876543210"
                          className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Category
                        </label>
                        <select
                          name="category"
                          className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300"
                          value={formData.category}
                          onChange={handleInputChange}
                        >
                          <option value="general">General Inquiry</option>
                          <option value="support">Support</option>
                          <option value="billing">Billing</option>
                          <option value="partnership">Partnership</option>
                          <option value="feedback">Feedback</option>
                          <option value="bug_report">Bug Report</option>
                          <option value="feature_request">Feature Request</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        placeholder="Brief description of your inquiry"
                        className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300"
                        value={formData.subject}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        placeholder="Please provide details about your inquiry..."
                        className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300 resize-none"
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-6 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Preview */}
          <section className="py-24 bg-white">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-800">Frequently Asked </span>
                  <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">
                    Questions
                  </span>
                </h2>
                
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Quick answers to common questions. Can&apos;t find what you&apos;re looking for? Contact us!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {faqCategories.map((category, index) => (
                  <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{category.category}</h3>
                    <ul className="space-y-3">
                      {category.questions.map((question, qIndex) => (
                        <li key={qIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-[#FF6B2C] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 text-sm">{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <button 
                  onClick={() => router.push('/support/faq')}
                  className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-4 border-none rounded-xl text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                >
                  View All FAQs
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
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