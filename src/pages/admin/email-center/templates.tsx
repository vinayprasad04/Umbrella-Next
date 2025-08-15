import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminSidebar from '../components/AdminSidebar';

interface EmailTemplate {
  _id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  variables: string[];
  category: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

const EmailTemplates = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAdminAccess = () => {
      const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
      const userRole = localStorage.getItem('userRole');
      
      if (!isLoggedIn) {
        router.push('/login');
        return;
      }
      
      if (userRole !== 'admin') {
        router.push('/dashboard');
        return;
      }
      
      setIsAdmin(true);
      setIsLoading(false);
      fetchEmailTemplates();
    };

    checkAdminAccess();
  }, [router]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('userToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  const fetchEmailTemplates = async () => {
    try {
      const response = await fetch('/api/admin/email-templates', {
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch templates');
      }
      
      const data = await response.json();
      setEmailTemplates(data.templates || []);
    } catch (error: any) {
      setError('Failed to load email templates');
      console.error('Fetch templates error:', error);
    }
  };

  const handleUseTemplate = (template: EmailTemplate) => {
    router.push('/admin/email-center/compose');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Email Templates - Email Center</title>
        <meta name="description" content="Manage email templates" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="flex">
          <AdminSidebar activeSection="emails" />

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Email Center - Templates</h1>
                <p className="text-gray-600 mt-1">Manage your email templates</p>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => router.push('/admin/email-center/compose')}
                  className="px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Compose Email
                </button>
                <button
                  onClick={() => router.push('/admin/email-center/templates')}
                  className="px-4 py-2 rounded-lg font-medium bg-red-600 text-white"
                >
                  Templates
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Email Templates</h2>
                <button
                  onClick={() => setShowTemplateModal(true)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Create Template
                </button>
              </div>
              
              <div className="p-6">
                {emailTemplates.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No email templates found. Create your first template!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {emailTemplates.map(template => (
                      <div key={template._id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">{template.name}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            template.category === 'welcome' ? 'bg-green-100 text-green-800' :
                            template.category === 'marketing' ? 'bg-blue-100 text-blue-800' :
                            template.category === 'notification' ? 'bg-yellow-100 text-yellow-800' :
                            template.category === 'announcement' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {template.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{template.subject}</p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleUseTemplate(template)}
                            className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                          >
                            Use Template
                          </button>
                          <button className="text-xs bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded">
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default EmailTemplates;