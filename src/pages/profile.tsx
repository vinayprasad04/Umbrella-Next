import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { fetchActivities, formatRelativeTime, logActivity } from '@/lib/activityLogger';

const Profile = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [activities, setActivities] = useState<any[]>([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
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
      setIsLoading(false);

      // Fetch user activities
      if (storedUserEmail) {
        setActivitiesLoading(true);
        const result = await fetchActivities(undefined, storedUserEmail, 10);
        if (result.success && result.data) {
          setActivities(result.data);
        }
        setActivitiesLoading(false);
      }
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
    setSaveMessage('');
  };

  const handleSave = () => {
    setIsSaving(true);

    // Simulate saving delay
    setTimeout(() => {
      // Update localStorage with new values (only name, email is read-only)
      localStorage.setItem('userName', editedName);

      // Update local state
      setUserName(editedName);
      setIsEditing(false);
      setIsSaving(false);
      setSaveMessage('Profile updated successfully!');

      // Log profile update activity
      const userId = localStorage.getItem('userId') || '';
      logActivity({
        userId,
        userEmail,
        activityType: 'profile_update',
        description: 'Updated profile information',
        metadata: {
          fieldsUpdated: ['name'],
        },
      });

      // Refresh activities list
      const refreshActivities = async () => {
        setActivitiesLoading(true);
        const result = await fetchActivities(undefined, userEmail, 10);
        if (result.success && result.data) {
          setActivities(result.data);
        }
        setActivitiesLoading(false);
      };
      refreshActivities();

      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B2C] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Profile - IncomeGrow</title>
        <meta name="description" content="Manage your IncomeGrow profile" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white dark:bg-gray-900">
        <Header />
        
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="w-full max-w-[1600px] mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <div className="flex items-center space-x-2 text-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg w-fit">
                <Link href="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 font-semibold transition-colors">
                  Dashboard
                </Link>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-purple-600 dark:text-purple-400 font-bold">Profile</span>
              </div>
            </nav>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-200 dark:border-purple-700">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 px-8 py-16 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -ml-32 -mb-32"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                  <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300 border-4 border-white/30">
                    <svg className="w-16 h-16 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div className="text-white text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">{userName || 'User'}</h1>
                    <div className="flex items-center justify-center md:justify-start gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 w-fit">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <p className="text-white font-semibold">{userEmail}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-center md:justify-start gap-2 text-white/90">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-semibold">Member Since August 2025</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-8">
                {saveMessage && (
                  <div className="mb-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-700 rounded-2xl shadow-lg animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500 rounded-full p-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="text-green-700 dark:text-green-300 font-bold text-lg">{saveMessage}</div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <div className="space-y-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-2xl border-2 border-purple-200 dark:border-purple-700 shadow-xl">
                    <div className="flex items-center gap-3 pb-4 border-b-2 border-purple-300 dark:border-purple-600">
                      <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-2 rounded-xl">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Personal Information
                      </h2>
                    </div>
                    
                    <div className="space-y-5">
                      <div className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl p-4 border border-purple-200 dark:border-purple-700">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="w-full border-2 border-purple-300 dark:border-purple-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-200 focus:border-transparent font-semibold transition-all"
                            placeholder="Enter your full name"
                          />
                        ) : (
                          <p className="text-gray-900 dark:text-gray-100 py-3 font-bold text-lg">{userName || 'Not provided'}</p>
                        )}
                      </div>

                      <div className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl p-4 border border-gray-300 dark:border-gray-600">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            value={userEmail}
                            disabled
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-100 dark:bg-gray-600 dark:text-gray-300 text-gray-600 cursor-not-allowed font-semibold"
                            placeholder="Enter your email"
                          />
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-semibold flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Email cannot be changed for security reasons
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-6">
                      {isEditing ? (
                        <>
                          <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                          >
                            {isSaving ? '💾 Saving...' : '✓ Save Changes'}
                          </button>
                          <button
                            onClick={handleCancel}
                            disabled={isSaving}
                            className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 disabled:opacity-50 shadow-lg"
                          >
                            ✕ Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={handleEdit}
                          className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-xl"
                        >
                          ✏️ Edit Profile
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Account Settings */}
                  <div className="space-y-6 bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 p-6 rounded-2xl border-2 border-orange-200 dark:border-orange-700 shadow-xl">
                    <div className="flex items-center gap-3 pb-4 border-b-2 border-orange-300 dark:border-orange-600">
                      <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-2 rounded-xl">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Account Settings
                      </h2>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border-2 border-red-200 dark:border-red-700 rounded-xl p-5 transform hover:scale-105 transition-all shadow-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-red-500 p-2 rounded-xl">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">🔒 Security</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 font-semibold">
                          Manage your account security settings
                        </p>
                        <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-md">
                          Change Password →
                        </button>
                      </div>

                      <div className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border-2 border-blue-200 dark:border-blue-700 rounded-xl p-5 transform hover:scale-105 transition-all shadow-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-blue-500 p-2 rounded-xl">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                          </div>
                          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">🔔 Preferences</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 font-semibold">
                          Customize your IncomeGrow experience
                        </p>
                        <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-md">
                          Notification Settings →
                        </button>
                      </div>

                      <div className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border-2 border-green-200 dark:border-green-700 rounded-xl p-5 transform hover:scale-105 transition-all shadow-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-green-500 p-2 rounded-xl">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">🔐 Data & Privacy</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 font-semibold">
                          Control your data and privacy settings
                        </p>
                        <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-md">
                          Privacy Settings →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-8 pt-8 border-t-2 border-purple-200 dark:border-purple-700">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-3 rounded-xl">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Account Overview</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 rounded-2xl p-6 border-2 border-orange-200 dark:border-orange-700 shadow-xl transform hover:scale-105 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-1">Active Plans</p>
                          <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">3</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-700 shadow-xl transform hover:scale-105 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-1">Total Savings</p>
                          <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">₹2.45L</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border-2 border-green-200 dark:border-green-700 shadow-xl transform hover:scale-105 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-1">Goals Achieved</p>
                          <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">7</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Recent Activity</h2>
                  {activitiesLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B2C]"></div>
                    </div>
                  ) : activities.length > 0 ? (
                    <div className="space-y-4">
                      {activities.map((activity, index) => {
                        let iconColor = 'bg-[#FF6B2C]';
                        let IconSVG = null;

                        // Determine icon color and SVG based on activity type
                        switch (activity.activityType) {
                          case 'login':
                            iconColor = 'bg-blue-500';
                            IconSVG = (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            );
                            break;
                          case 'logout':
                            iconColor = 'bg-gray-500';
                            IconSVG = (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            );
                            break;
                          case 'profile_update':
                            iconColor = 'bg-purple-500';
                            IconSVG = (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            );
                            break;
                          case 'calculator_usage':
                            iconColor = 'bg-indigo-500';
                            IconSVG = (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            );
                            break;
                          case 'goal_creation':
                            iconColor = 'bg-green-500';
                            IconSVG = (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            );
                            break;
                          case 'dashboard_access':
                            iconColor = 'bg-cyan-500';
                            IconSVG = (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            );
                            break;
                          case 'signup':
                            iconColor = 'bg-emerald-500';
                            IconSVG = (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            );
                            break;
                          case 'password_reset':
                            iconColor = 'bg-red-500';
                            IconSVG = (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            );
                            break;
                          default:
                            iconColor = 'bg-[#FF6B2C]';
                            IconSVG = (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            );
                        }

                        return (
                          <div key={activity._id || index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 ${iconColor} rounded-full flex items-center justify-center`}>
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  {IconSVG}
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">{activity.description}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{formatRelativeTime(activity.createdAt)}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">No recent activity</p>
                    </div>
                  )}
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