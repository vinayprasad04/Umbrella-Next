import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface SubscribeProps {
  variant?: 'footer' | 'inline' | 'modal';
  className?: string;
}

const Subscribe: React.FC<SubscribeProps> = ({ variant = 'footer', className = '' }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage('Please enter your email address');
      setIsSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      // Execute reCAPTCHA v3
      if (!executeRecaptcha) {
        throw new Error('reCAPTCHA not loaded. Please refresh the page.');
      }

      const recaptchaToken = await executeRecaptcha('subscribe_newsletter');

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

      // Submit subscription
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: name || undefined,
          page: router.pathname,
          recaptchaToken
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Successfully subscribed!');
        setIsSuccess(true);
        setEmail('');
        setName('');
      } else {
        setMessage(data.error || 'Failed to subscribe');
        setIsSuccess(false);
      }
    } catch (error: any) {
      setMessage(error.message || 'Something went wrong. Please try again.');
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === 'footer') {
    return (
      <div className={`border-b border-gray-700/50 backdrop-blur-sm ${className}`}>
        <div className="w-full max-w-[1600px] mx-auto px-6 py-16">
          <div className="bg-gradient-to-r from-[#FF6B2C]/10 to-[#FF8A50]/10 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">
                Stay Updated with Market Insights
              </h3>
              <p className="text-gray-300 mb-8 text-lg">
                Get the latest financial news, investment tips, and market analysis delivered to your inbox weekly.
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all duration-300"
                  disabled={isSubmitting}
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group bg-gradient-to-r from-[#FF6B2C] to-[#FF8A50] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  {!isSubmitting && (
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  )}
                </button>
              </form>
              
              {message && (
                <p className={`mt-4 text-sm ${
                  isSuccess ? 'text-green-400' : 'text-red-400'
                }`}>
                  {message}
                </p>
              )}
              
              <p className="text-sm text-gray-400 mt-4">
                No spam, unsubscribe anytime. Read our{' '}
                <Link href="/privacy-policy" className="text-[#FF6B2C] hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-6 ${className}`}>
        <div className="text-center mb-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            Get Financial Updates
          </h4>
          <p className="text-gray-600 text-sm">
            Join our newsletter for exclusive insights and tips.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            disabled={isSubmitting}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            disabled={isSubmitting}
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
          </button>
          
          {message && (
            <p className={`text-sm text-center ${
              isSuccess ? 'text-green-600' : 'text-red-600'
            }`}>
              {message}
            </p>
          )}
        </form>
      </div>
    );
  }

  return null;
};

export default Subscribe;