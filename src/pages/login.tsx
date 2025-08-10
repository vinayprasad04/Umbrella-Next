import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, User } from 'firebase/auth';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('vinay@gmail.com');
  const [password, setPassword] = useState('123');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setLoginError('');
    
    // Simulate login validation
    if (email !== 'vinay@gmail.com' || password !== '123') {
      setLoginError('Invalid username or password.');
      setIsSubmitting(false);
      return;
    }
    
    // Set authentication state
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('userName', 'Vinay Patel');
    
    router.push('/dashboard');
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
    } catch (error: any) {
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
        <title>Login - Umbrella</title>
        <meta name="description" content="Login to your Umbrella account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />
        
        <div className="min-h-screen flex items-center justify-center bg-white py-20">
          <div className="flex flex-col md:flex-row w-full max-w-[1600px] items-center justify-center gap-8 px-4 py-12">
            <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md flex flex-col gap-6">
              <div className="flex flex-col items-center mb-4">
                <Image
                  src="/logo.png"
                  alt="Umbrella Logo"
                  width={48}
                  height={48}
                  priority
                  className="mb-2"
                />
                <span className="text-2xl font-bold text-gray-900">Umbrella</span>
              </div>
              
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Welcome back</h2>
              
              {/* Google Login Button */}
              <button 
                type="button" 
                onClick={handleGoogleLogin} 
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-white border border-[#FF6B2C] text-[#FF6B2C] font-semibold py-2 rounded transition hover:bg-orange-50 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#FF6B2C]"></div>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 48 48" className="mr-2">
                    <g>
                      <path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.64 2.13 30.18 0 24 0 14.82 0 6.71 5.48 2.69 13.44l7.98 6.2C12.13 13.09 17.62 9.5 24 9.5z"/>
                      <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.3 46.1 24.55z"/>
                      <path fill="#FBBC05" d="M10.67 28.65c-1.01-2.99-1.01-6.21 0-9.2l-7.98-6.2C.99 17.1 0 20.43 0 24c0 3.57.99 6.9 2.69 10.55l7.98-6.2z"/>
                      <path fill="#EA4335" d="M24 48c6.18 0 11.64-2.05 15.53-5.57l-7.19-5.6c-2.01 1.35-4.59 2.15-8.34 2.15-6.38 0-11.87-3.59-14.33-8.69l-7.98 6.2C6.71 42.52 14.82 48 24 48z"/>
                      <path fill="none" d="M0 0h48v48H0z"/>
                    </g>
                  </svg>
                )}
                {isSubmitting ? 'Signing in...' : 'Login with Google'}
              </button>
              
              {googleError && <div className="text-red-500 text-sm text-center mb-2">{googleError}</div>}
              
              {/* Divider */}
              <div className="flex items-center gap-4 my-4">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-500">or</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              
              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full border rounded px-4 py-2 pl-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="Email address"
                    autoComplete="username"
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {errors.email && <div className="text-red-500 text-xs mt-1 ml-1 text-left">{errors.email}</div>}
                </div>
                
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full border rounded px-4 py-2 pl-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="Password"
                    autoComplete="current-password"
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  {errors.password && <div className="text-red-500 text-xs mt-1 ml-1 text-left">{errors.password}</div>}
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <Link href="/forgot-password" className="text-sm text-gray-700 underline hover:text-[#FF6B2C]">
                    Forgot password?
                  </Link>
                </div>
                
                {loginError && <div className="text-red-500 text-sm text-center mt-2">{loginError}</div>}
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#FF6B2C] hover:bg-[#e85d1f] text-white font-semibold py-2 rounded mt-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Signing in...' : 'Login'}
                </button>
              </form>
              
              <div className="text-sm text-center mt-4">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-[#FF6B2C] hover:underline">
                  Sign Up
                </Link>
              </div>
            </div>
            
            <div className="hidden md:flex flex-1 items-center justify-center">
              <Image
                src="/banner.jpg"
                alt="Analytics Illustration"
                width={600}
                height={400}
                className="max-w-xl w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default Login;