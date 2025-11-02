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
        <title>Profile - IncomeGrow</title>
        <meta name="description" content="Manage your IncomeGrow profile" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
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
                        <div className="relative">
                          <input
                            type="email"
                            value={userEmail}
                            disabled
                            className="w-full border border-gray-200 rounded px-3 py-2 bg-gray-50 text-gray-600 cursor-not-allowed"
                            placeholder="Enter your email"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed for security reasons</p>
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
                          Customize your IncomeGrow experience
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
                          <div key={activity._id || index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 ${iconColor} rounded-full flex items-center justify-center`}>
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  {IconSVG}
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{activity.description}</p>
                                <p className="text-sm text-gray-500">{formatRelativeTime(activity.createdAt)}</p>
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
                      <p className="mt-2 text-sm text-gray-500">No recent activity</p>
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