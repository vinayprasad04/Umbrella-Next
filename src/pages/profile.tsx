import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const Profile = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
      
      if (!isLoggedIn) {
        router.push('/login');
        return;
      }
      
      // Load user data from localStorage
      const storedUserName = localStorage.getItem('userName') || '';
      const storedUserEmail = localStorage.getItem('userEmail') || '';
      
      setUserName(storedUserName);
      setUserEmail(storedUserEmail);
      setEditedName(storedUserName);
      setEditedEmail(storedUserEmail);
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleEdit = () => {
    setIsEditing(true);
    setSaveMessage('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedName(userName);
    setEditedEmail(userEmail);
    setSaveMessage('');
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate saving delay
    setTimeout(() => {
      // Update localStorage with new values
      localStorage.setItem('userName', editedName);
      localStorage.setItem('userEmail', editedEmail);
      
      // Update local state
      setUserName(editedName);
      setUserEmail(editedEmail);
      setIsEditing(false);
      setIsSaving(false);
      setSaveMessage('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000);
    }, 1000);
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
        <title>Profile - Umbrella</title>
        <meta name="description" content="Manage your Umbrella profile" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />
        
        <div className="min-h-screen bg-gray-50">
          <div className="w-full max-w-[1600px] mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <div className="flex items-center space-x-2 text-sm">
                <Link href="/dashboard" className="text-gray-500 hover:text-[#FF6B2C]">
                  Dashboard
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-[#FF6B2C] font-medium">Profile</span>
              </div>
            </nav>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-[#7e685e] to-[#724530] px-8 py-12">
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-12 h-12 text-[#FF6B2C]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div className="text-white">
                    <h1 className="text-3xl font-bold">{userName || 'User'}</h1>
                    <p className="text-orange-100 mt-2">{userEmail}</p>
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-8">
                {saveMessage && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-green-600 font-medium">{saveMessage}</div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Personal Information
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent"
                            placeholder="Enter your full name"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{userName || 'Not provided'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={editedEmail}
                            onChange={(e) => setEditedEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent"
                            placeholder="Enter your email"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{userEmail || 'Not provided'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Member Since
                        </label>
                        <p className="text-gray-900 py-2">August 2025</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      {isEditing ? (
                        <>
                          <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-[#FF6B2C] hover:bg-[#e85d1f] text-white px-6 py-2 rounded font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                          </button>
                          <button
                            onClick={handleCancel}
                            disabled={isSaving}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded font-medium transition disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={handleEdit}
                          className="bg-[#FF6B2C] hover:bg-[#e85d1f] text-white px-6 py-2 rounded font-medium transition"
                        >
                          Edit Profile
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Account Settings */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Account Settings
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 mb-2">Security</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Manage your account security settings
                        </p>
                        <button className="text-[#FF6B2C] hover:text-[#e85d1f] text-sm font-medium">
                          Change Password
                        </button>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 mb-2">Preferences</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Customize your Umbrella experience
                        </p>
                        <button className="text-[#FF6B2C] hover:text-[#e85d1f] text-sm font-medium">
                          Notification Settings
                        </button>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 mb-2">Data & Privacy</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Control your data and privacy settings
                        </p>
                        <button className="text-[#FF6B2C] hover:text-[#e85d1f] text-sm font-medium">
                          Privacy Settings
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-orange-50 rounded-lg p-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-[#FF6B2C] rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Active Plans</p>
                          <p className="text-2xl font-bold text-gray-900">3</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Total Savings</p>
                          <p className="text-2xl font-bold text-gray-900">₹2,45,000</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Goals Achieved</p>
                          <p className="text-2xl font-bold text-gray-900">7</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#FF6B2C] rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Created new wealth creation plan</p>
                          <p className="text-sm text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Completed emergency fund goal</p>
                          <p className="text-sm text-gray-500">1 day ago</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Updated investment portfolio</p>
                          <p className="text-sm text-gray-500">3 days ago</p>
                        </div>
                      </div>
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

export default Profile;