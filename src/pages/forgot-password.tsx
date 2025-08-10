import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitted(true);
    
    // Redirect to login after 3 seconds
    setTimeout(() => {
      router.push('/login');
    }, 3000);
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
        <title>Forgot Password - Umbrella</title>
        <meta name="description" content="Reset your Umbrella account password" />
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
              
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Forgot Password</h2>
              
              {isSubmitted ? (
                <div className="text-center">
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-green-600 font-medium mb-2">Reset Link Sent!</div>
                    <div className="text-sm text-green-600">
                      We&apos;ve sent a password reset link to your email address. Please check your inbox and follow the instructions.
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Redirecting to login page in a few seconds...
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-600 mb-4">
                    Enter your email address and we&apos;ll send you a link to reset your password.
                  </p>
                  
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
                    
                    <button 
                      type="submit" 
                      className="w-full bg-[#FF6B2C] hover:bg-[#e85d1f] text-white font-semibold py-2 rounded mt-2 transition"
                    >
                      Send Reset Link
                    </button>
                  </form>
                </>
              )}
              
              <div className="text-sm text-center mt-4">
                Remembered your password?{' '}
                <Link href="/login" className="text-[#FF6B2C] hover:underline">
                  Login
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

export default ForgotPassword;