import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, User } from 'firebase/auth';
import { login } from '@/lib/auth';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const Login = () => {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [googleError, setGoogleError] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const newErrors = { email: '', password: '' };
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setLoginError('');

    try {
      // Execute reCAPTCHA v3
      if (!executeRecaptcha) {
        throw new Error('reCAPTCHA not loaded. Please refresh the page.');
      }

      const recaptchaToken = await executeRecaptcha('login');

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

      const result = await login({ email, password });

      // Set authentication state
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userToken', result.accessToken || result.token || '');
      localStorage.setItem('refreshToken', result.refreshToken || '');
      localStorage.setItem('userName', result.user?.name || '');
      localStorage.setItem('userEmail', result.user?.email || '');
      localStorage.setItem('userId', result.user?.id || '');
      localStorage.setItem('userRole', result.user?.role || 'user');
      localStorage.setItem('tokenExpiry', new Date(Date.now() + 15 * 60 * 1000).toISOString()); // 15 minutes
      localStorage.setItem('lastActivity', new Date().toISOString());

      router.push('/dashboard');
    } catch (error: any) {
      setLoginError(error.message || 'Login failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleError('');
    setIsSubmitting(true);
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user: User = result.user;
      
      // Set authentication state with Google user data
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userName', user.displayName || 'Google User');
      localStorage.setItem('userEmail', user.email || '');
      
      router.push('/dashboard');
    } catch (error: unknown) {
      console.error('Google sign-in error:', error);
      setGoogleError('Google sign-in failed. Please try again.');
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
        <title>Login - IncomeGrow Financial</title>
        <meta name="description" content="Sign in to your IncomeGrow Financial account and access powerful investment tools" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />
        
        {/* Main Login Section */}
        <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-[#FF6B2C]/5 to-[#FF8A50]/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-green-400/3 to-blue-400/3 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative flex items-center justify-center min-h-screen py-20 px-6">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Side - Login Form */}
              <div className="flex justify-center lg:justify-end">
                <div className="w-full ">
                  {/* Login Card */}
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
                      
                      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
                      <p className="text-gray-600">Sign in to access your financial dashboard</p>
                    </div>
                    
                    {/* Google Login Button */}
                    <button 
                      type="button" 
                      onClick={handleGoogleLogin} 
                      disabled={isSubmitting}
                      className="group w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mb-6"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#FF6B2C]"></div>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 48 48" className="flex-shrink-0">
                          <g>
                            <path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.64 2.13 30.18 0 24 0 14.82 0 6.71 5.48 2.69 13.44l7.98 6.2C12.13 13.09 17.62 9.5 24 9.5z"/>
                            <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.3 46.1 24.55z"/>
                            <path fill="#FBBC05" d="M10.67 28.65c-1.01-2.99-1.01-6.21 0-9.2l-7.98-6.2C.99 17.1 0 20.43 0 24c0 3.57.99 6.9 2.69 10.55l7.98-6.2z"/>
                            <path fill="#EA4335" d="M24 48c6.18 0 11.64-2.05 15.53-5.57l-7.19-5.6c-2.01 1.35-4.59 2.15-8.34 2.15-6.38 0-11.87-3.59-14.33-8.69l-7.98 6.2C6.71 42.52 14.82 48 24 48z"/>
                            <path fill="none" d="M0 0h48v48H0z"/>
                          </g>
                        </svg>
                      )}
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                        {isSubmitting ? 'Signing in...' : 'Continue with Google'}
                      </span>
                    </button>
                    
                    {googleError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
                        {googleError}
                      </div>
                    )}
                    
                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                      <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">or continue with email</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    </div>
                    
                    {/* Email/Password Form */}
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
                      
                      <div className="space-y-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                        <div className="relative">
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full border-2 rounded-xl px-4 py-4 pl-12 text-gray-900 bg-white/50 backdrop-blur-sm focus:outline-none focus:border-[#FF6B2C] focus:ring-4 focus:ring-[#FF6B2C]/10 transition-all duration-300 ${errors.password ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-gray-200'}`}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                          />
                          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.password}
                        </p>}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Link href="/forgot-password" className="text-sm text-[#FF6B2C] hover:text-[#e55d1f] font-medium hover:underline transition-colors duration-200">
                          Forgot password?
                        </Link>
                      </div>
                      
                      {loginError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {loginError}
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
                            Signing in...
                          </>
                        ) : (
                          <>
                            Sign In
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </>
                        )}
                      </button>
                    </form>
                    
                    <div className="text-center mt-8 pt-6 border-t border-gray-200">
                      <p className="text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="text-[#FF6B2C] hover:text-[#e55d1f] font-semibold hover:underline transition-colors duration-200">
                          Create Account
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Side - Hero Content */}
              <div className="hidden lg:flex flex-col items-center justify-center text-center space-y-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B2C]/20 to-[#FF8A50]/20 rounded-3xl blur-3xl"></div>
                  <Image
                    src="/banner.jpg"
                    alt="Financial Dashboard Preview"
                    width={600}
                    height={400}
                    className="relative rounded-3xl shadow-2xl border border-white/20"
                  />
                </div>
                
                <div className="max-w-lg space-y-6">
                  <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                    Your Financial Journey
                    <span className="bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] bg-clip-text text-transparent block">
                      Starts Here
                    </span>
                  </h2>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Access powerful investment calculators, expert insights, and personalized financial planning tools to build your wealth systematically.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                      <div className="text-2xl font-bold text-[#FF6B2C] mb-1">25+</div>
                      <div className="text-sm text-gray-600">Financial Tools</div>
                    </div>
                    <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                      <div className="text-2xl font-bold text-[#FF6B2C] mb-1">10K+</div>
                      <div className="text-sm text-gray-600">Active Users</div>
                    </div>
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

export default Login;