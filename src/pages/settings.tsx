import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const Settings = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('account');
  
  // Settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('english');
  const [currency, setCurrency] = useState('INR');
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

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
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleSaveSettings = () => {
    // Here you would typically save settings to backend
    alert('Settings saved successfully!');
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

  const tabs = [
    { id: 'account', label: 'Account', icon: '👤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
    { id: 'security', label: 'Security', icon: '🔒' },
  ];

  return (
    <>
      <Head>
        <title>Settings - IncomeGrow</title>
        <meta name="description" content="Manage your IncomeGrow account settings" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      
      <div className="font-sans m-0 p-0 bg-white">
        <Header />
        
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
          <div className="w-full max-w-[1600px] mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <div className="flex items-center space-x-2 text-sm bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg w-fit">
                <Link href="/dashboard" className="text-gray-600 hover:text-purple-600 font-semibold transition-colors">
                  Dashboard
                </Link>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-purple-600 font-bold">Settings</span>
              </div>
            </nav>

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-200">
              {/* Settings Header */}
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-8 py-16 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -ml-32 -mb-32"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-white/30 backdrop-blur-sm p-4 rounded-2xl">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-5xl font-bold text-white">⚙️ Settings</h1>
                      <p className="text-white/90 mt-2 text-lg font-semibold">Manage your account preferences and security</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row">
                {/* Sidebar Tabs */}
                <div className="lg:w-80 border-r-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
                  <nav className="p-6 space-y-3">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-4 px-5 py-4 text-left rounded-2xl transition-all transform hover:scale-105 shadow-md border-2 ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white font-bold border-transparent shadow-xl scale-105'
                            : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border-purple-200'
                        }`}
                      >
                        <span className="text-2xl">{tab.icon}</span>
                        <span className="font-bold text-lg">{tab.label}</span>
                        {activeTab === tab.id && (
                          <svg className="w-5 h-5 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Settings Content */}
                <div className="flex-1 p-8">
                  {activeTab === 'account' && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-900">Account Information</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <button
                        onClick={handleSaveSettings}
                        className="bg-[#FF6B2C] hover:bg-[#e85d1f] text-white px-6 py-2 rounded font-medium transition"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}

                  {activeTab === 'notifications' && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-900">Notification Preferences</h2>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-4 border-b border-gray-200">
                          <div>
                            <h3 className="font-medium text-gray-900">Email Notifications</h3>
                            <p className="text-sm text-gray-500">Receive updates via email</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={emailNotifications}
                              onChange={(e) => setEmailNotifications(e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B2C]"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between py-4 border-b border-gray-200">
                          <div>
                            <h3 className="font-medium text-gray-900">Push Notifications</h3>
                            <p className="text-sm text-gray-500">Receive push notifications on your device</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={pushNotifications}
                              onChange={(e) => setPushNotifications(e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B2C]"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between py-4 border-b border-gray-200">
                          <div>
                            <h3 className="font-medium text-gray-900">Marketing Emails</h3>
                            <p className="text-sm text-gray-500">Receive promotional content and updates</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={marketingEmails}
                              onChange={(e) => setMarketingEmails(e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B2C]"></div>
                          </label>
                        </div>
                      </div>
                      
                      <button
                        onClick={handleSaveSettings}
                        className="bg-[#FF6B2C] hover:bg-[#e85d1f] text-white px-6 py-2 rounded font-medium transition"
                      >
                        Save Preferences
                      </button>
                    </div>
                  )}

                  {activeTab === 'preferences' && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-900">Application Preferences</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Language
                          </label>
                          <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full max-w-xs border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent"
                          >
                            <option value="english">English</option>
                            <option value="hindi">Hindi</option>
                            <option value="gujarati">Gujarati</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Currency
                          </label>
                          <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="w-full max-w-xs border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B2C] focus:border-transparent"
                          >
                            <option value="INR">INR (₹)</option>
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center justify-between py-4 border-b border-gray-200">
                          <div>
                            <h3 className="font-medium text-gray-900">Dark Mode</h3>
                            <p className="text-sm text-gray-500">Switch to dark theme</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={darkMode}
                              onChange={(e) => setDarkMode(e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B2C]"></div>
                          </label>
                        </div>
                      </div>
                      
                      <button
                        onClick={handleSaveSettings}
                        className="bg-[#FF6B2C] hover:bg-[#e85d1f] text-white px-6 py-2 rounded font-medium transition"
                      >
                        Save Preferences
                      </button>
                    </div>
                  )}

                  {activeTab === 'security' && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>
                      
                      <div className="space-y-6">
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h3 className="font-medium text-gray-900 mb-2">Password</h3>
                          <p className="text-sm text-gray-600 mb-4">
                            Keep your account secure with a strong password
                          </p>
                          <button className="bg-[#FF6B2C] hover:bg-[#e85d1f] text-white px-4 py-2 rounded font-medium transition">
                            Change Password
                          </button>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                              <p className="text-sm text-gray-600 mt-1">
                                Add an extra layer of security to your account
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={twoFactorAuth}
                                onChange={(e) => setTwoFactorAuth(e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6B2C]"></div>
                            </label>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h3 className="font-medium text-gray-900 mb-2">Active Sessions</h3>
                          <p className="text-sm text-gray-600 mb-4">
                            Manage devices that are currently signed in to your account
                          </p>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                              <div>
                                <p className="font-medium text-gray-900">Current Session</p>
                                <p className="text-sm text-gray-500">Windows • Chrome • {new Date().toLocaleDateString()}</p>
                              </div>
                              <span className="text-green-600 text-sm font-medium">Active</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                          <h3 className="font-medium text-red-900 mb-2">Danger Zone</h3>
                          <p className="text-sm text-red-600 mb-4">
                            Once you delete your account, there is no going back. Please be certain.
                          </p>
                          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium transition">
                            Delete Account
                          </button>
                        </div>
                      </div>
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

export default Settings;