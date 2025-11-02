import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { requestPasswordReset } from '@/lib/auth';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const ForgotPassword = () => {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
      
      if (isLoggedIn) {
        router.push('/dashboard');
        return;
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const validateForm = () => {
    const newErrors = { email: '' };
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }
    
    setErrors(newErrors);
    return !newErrors.email;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Execute reCAPTCHA v3
      if (!executeRecaptcha) {
        throw new Error('reCAPTCHA not loaded. Please refresh the page.');
      }

      const recaptchaToken = await executeRecaptcha('forgot_password');

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

      await requestPasswordReset(email);
      setIsSubmitted(true);

      // Redirect to login after 5 seconds
      setTimeout(() => {
        router.push('/login');
      }, 5000);
    } catch (error: any) {
      setSubmitError(error.message || 'Failed to send reset email. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B2C] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Forgot Password - IncomeGrow Financial</title>
        <meta name="description" content="Reset your IncomeGrow Financial account password securely and get back to managing your investments" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />
        
        {/* Main Forgot Password Section */}
        <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-[#FF6B2C]/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/3 to-purple-400/3 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative flex items-center justify-center min-h-screen py-20 px-6">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              
              {/* Left Side - Forgot Password Form */}
              <div className="flex justify-center lg:justify-end">
                <div className="w-full">
                  {/* Forgot Password Card */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B2C] to-[#FF8A50] rounded-xl shadow-lg flex items-center justify-center">
                          <Image
                            src="/logo.png"
                            alt="IncomeGrow Financial Logo"
                            width={28}
                            height={26}
                            priority
                            className="w-7 h-6.5 object-contain filter brightness-0 invert"
                          />
                        </div>
                        <div>
                          <span className="text-2xl font-bold bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent">IncomeGrow</span>
                          <div className="text-xs text-gray-500 font-medium">Financial Freedom</div>
                        </div>
                      </div>
                      
                      {!isSubmitted ? (
                        <>
                          <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
                          <p className="text-gray-600">No worries, we&apos;ll send you reset instructions</p>
                        </>
                      ) : (
                        <>
                          <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <h1 className="text-3xl font-bold text-gray-800 mb-2">Check Your Email</h1>
                          <p className="text-gray-600">We&apos;ve sent password reset instructions</p>
                        </>
                      )}
                    </div>
                    
                    {isSubmitted ? (
                      <div className="text-center space-y-6">
                        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                          <div className="text-green-700 font-semibold mb-3 flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Reset Link Sent Successfully!
                          </div>
                          <p className="text-green-600 leading-relaxed">
                            We&apos;ve sent a password reset link to <strong>{email}</strong>. 
                            Please check your inbox and follow the instructions to reset your password.
                          </p>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                          <p className="text-blue-700 text-sm">
                            <strong>Didn&apos;t receive the email?</strong> Check your spam folder or try again in a few minutes.
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#FF6B2C]"></div>
                          Redirecting to login page in a few seconds...
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="mb-8">
                          <p className="text-gray-600 leading-relaxed text-center">
                            Enter the email address associated with your account and we&apos;ll send you 
                            a secure link to reset your password.
                          </p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="space-y-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full border-2 rounded-xl px-4 py-4 pl-12 text-gray-900 bg-white/50 backdrop-blur-sm focus:outline-none focus:border-[#FF6B2C] focus:ring-4 focus:ring-[#FF6B2C]/10 transition-all duration-300 ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-gray-200'}`}
                                placeholder="Enter your email address"
                                autoComplete="username"
                              />
                              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                              </svg>
                            </div>
                            {errors.email && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              {errors.email}
                            </p>}
                          </div>
                          
                          {submitError && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              {submitError}
                            </div>
                          )}
                          
                          <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="group w-full bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] hover:from-[#e55d1f] hover:to-[#e67a44] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                Sending Instructions...
                              </>
                            ) : (
                              <>
                                Send Reset Instructions
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                              </>
                            )}
                          </button>
                        </form>
                      </>
                    )}
                    
                    <div className="text-center mt-8 pt-6 border-t border-gray-200">
                      <p className="text-gray-600 flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        Back to{' '}
                        <Link href="/login" className="text-[#FF6B2C] hover:text-[#e55d1f] font-semibold hover:underline transition-colors duration-200">
                          Sign In
                        </Link>
                      </p>
                    </div>
                    
                    {/* Help Section */}
                    {!isSubmitted && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Need Help?</p>
                            <p className="text-xs text-gray-600">
                              If you&apos;re having trouble accessing your account, contact our{' '}
                              <Link href="/support/contact-us" className="text-[#FF6B2C] hover:underline">
                                support team
                              </Link>
                              {' '}for assistance.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Right Side - Hero Content */}
              <div className="hidden lg:flex flex-col items-center justify-start text-center space-y-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl"></div>
                  <Image
                    src="/banner.jpg"
                    alt="Secure Account Recovery"
                    width={600}
                    height={400}
                    className="relative rounded-3xl shadow-2xl border border-white/20"
                  />
                </div>
                
                <div className="max-w-lg space-y-6">
                  <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                    Secure Account
                    <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent block">
                      Recovery
                    </span>
                  </h2>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Your account security is our priority. We use industry-standard encryption 
                    to protect your data and ensure safe password recovery.
                  </p>
                  
                  <div className="space-y-4 pt-4">
                    {[
                      { icon: '🔒', title: 'Secure Process', desc: 'Bank-level security protocols' },
                      { icon: '⚡', title: 'Quick Recovery', desc: 'Reset password in minutes' },
                      { icon: '🛡️', title: 'Protected Data', desc: 'Your information stays safe' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30">
                        <div className="text-2xl">{item.icon}</div>
                        <div className="text-left">
                          <div className="font-semibold text-gray-800">{item.title}</div>
                          <div className="text-sm text-gray-600">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default ForgotPassword;