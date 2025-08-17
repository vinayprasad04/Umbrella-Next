import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const SeedBlogs = () => {
  const router = useRouter();
  const [isSeeding, setIsSeeding] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const getAuthHeaders = () => {
    const token = localStorage.getItem('userToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  const seedBlogs = async () => {
    setIsSeeding(true);
    setError('');
    setResult('');

    try {
      const response = await fetch('/api/admin/seed-blogs', {
        method: 'POST',
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to seed blogs');
      }

      setResult(data.message);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <>
      <Head>
        <title>Seed Blogs - Debug</title>
        <meta name="description" content="Seed blog data from products page to database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Seed Blogs Database
          </h1>
          
          <div className="space-y-4">
            <p className="text-gray-600 text-center">
              This will transfer the 6 blog posts from the products/blogs page into the database 
              so they appear in the admin blog management system.
            </p>
            
            <button
              onClick={seedBlogs}
              disabled={isSeeding}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              {isSeeding ? 'Seeding Blogs...' : 'Seed Blogs to Database'}
            </button>
            
            {result && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                ✅ {result}
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                ❌ {error}
              </div>
            )}
            
            <div className="pt-4 text-center">
              <button
                onClick={() => router.push('/admin/blogs')}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Go to Admin Blog Management
              </button>
            </div>
            
            <div className="pt-2 text-center">
              <button
                onClick={() => router.push('/debug')}
                className="text-gray-600 hover:text-gray-800 underline"
              >
                Back to Debug Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeedBlogs;