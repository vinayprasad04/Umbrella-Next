import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminSidebar from '../components/AdminSidebar';
import EmailTemplateEditor from '@/components/EmailTemplateEditor';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<EmailTemplate | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null);
  
  // Form states
  const [templateForm, setTemplateForm] = useState({
    name: '',
    subject: '',
    htmlContent: '',
    textContent: '',
    category: 'other',
    variables: [] as string[]
  });

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
      const headers = getAuthHeaders();
      console.log('Fetching templates with headers:', headers);
      
      const response = await fetch('/api/admin/email-templates', {
        headers,
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('API Error:', errorData);
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to fetch templates`);
      }
      
      const data = await response.json();
      console.log('Templates data:', data);
      setEmailTemplates(data.templates || []);
    } catch (error: any) {
      console.error('Fetch templates error:', error);
      setError(error.message || 'Failed to load email templates');
    }
  };

  const resetForm = () => {
    setTemplateForm({
      name: '',
      subject: '',
      htmlContent: '',
      textContent: '',
      category: 'other',
      variables: []
    });
    setEditingTemplate(null);
    setError('');
  };

  const openCreateModal = () => {
    resetForm();
    setShowTemplateModal(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const openEditModal = (template: EmailTemplate) => {
    setTemplateForm({
      name: template.name,
      subject: template.subject,
      htmlContent: template.htmlContent,
      textContent: template.textContent || '',
      category: template.category,
      variables: template.variables
    });
    setEditingTemplate(template);
    setShowTemplateModal(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowTemplateModal(false);
    resetForm();
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'unset';
  };

  const handleCreateTemplate = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/email-templates', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(templateForm),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create template');
      }

      await fetchEmailTemplates();
      closeModal();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTemplate = async () => {
    if (!editingTemplate) return;
    
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/email-templates', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          templateId: editingTemplate._id,
          ...templateForm
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update template');
      }

      await fetchEmailTemplates();
      closeModal();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTemplate = async () => {
    if (!templateToDelete) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin/email-templates', {
        method: 'DELETE',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          templateId: templateToDelete._id
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete template');
      }

      await fetchEmailTemplates();
      setShowDeleteModal(false);
      setTemplateToDelete(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteModal = (template: EmailTemplate) => {
    setTemplateToDelete(template);
    setShowDeleteModal(true);
  };

  const openPreview = (template: EmailTemplate) => {
    setPreviewTemplate(template);
    setShowPreview(true);
  };

  const handleUseTemplate = (template: EmailTemplate) => {
    // Store the selected template for use in compose
    localStorage.setItem('selectedTemplate', JSON.stringify(template));
    router.push('/admin/email-center/compose');
  };

  const extractVariables = (content: string): string[] => {
    const regex = /\{\{(\w+)\}\}/g;
    const variables: string[] = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      if (!variables.includes(match[1])) {
        variables.push(match[1]);
      }
    }
    return variables;
  };

  const handleContentChange = (content: string) => {
    const variables = extractVariables(content);
    setTemplateForm(prev => ({
      ...prev,
      htmlContent: content,
      variables
    }));
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
        <link rel="icon" type="image/png" href="/favicon.png" />
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
                <button
                  onClick={() => router.push('/admin/email-center/history')}
                  className="px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  History
                </button>
                <button
                  onClick={() => window.open('/api/debug/seed-test-template', '_blank')}
                  className="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 text-xs"
                >
                  Seed Test
                </button>
                <button
                  onClick={() => window.open('/api/debug/test-auth', '_blank')}
                  className="px-4 py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 text-xs"
                >
                  Test Auth
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <strong>Error:</strong> {error}
                    <div className="mt-2 text-sm">
                      <p>Troubleshooting steps:</p>
                      <ul className="list-disc list-inside ml-4">
                        <li>Check if you&apos;re logged in as admin</li>
                        <li>Verify your authentication token</li>
                        <li>Check database connection</li>
                      </ul>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setError('');
                      fetchEmailTemplates();
                    }}
                    className="text-red-600 hover:text-red-800 ml-4"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Email Templates</h2>
                <button
                  onClick={openCreateModal}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Create Template
                </button>
              </div>
              
              <div className="p-6">
                {/* Debug info */}
                <div className="mb-4 p-3 bg-gray-50 rounded text-sm text-gray-600">
                  <strong>Debug Info:</strong>
                  <br />User Role: {localStorage.getItem('userRole')}
                  <br />Logged In: {localStorage.getItem('loggedIn')}
                  <br />Token exists: {localStorage.getItem('userToken') ? 'Yes' : 'No'}
                  <br />Templates count: {emailTemplates.length}
                </div>
                
                {emailTemplates.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No email templates found. Create your first template!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {emailTemplates.map(template => (
                      <div key={template._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900 flex-1 mr-2">{template.name}</h3>
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
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{template.subject}</p>
                        
                        {template.variables.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs text-gray-500 mb-1">Variables:</p>
                            <div className="flex flex-wrap gap-1">
                              {template.variables.slice(0, 3).map(variable => (
                                <span key={variable} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                  {`{{${variable}}}`}
                                </span>
                              ))}
                              {template.variables.length > 3 && (
                                <span className="text-xs text-gray-500">+{template.variables.length - 3} more</span>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleUseTemplate(template)}
                            className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
                          >
                            Use
                          </button>
                          <button 
                            onClick={() => openPreview(template)}
                            className="text-xs bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded transition-colors"
                          >
                            Preview
                          </button>
                          <button 
                            onClick={() => openEditModal(template)}
                            className="text-xs bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => openDeleteModal(template)}
                            className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
                          >
                            Delete
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

        {/* Create/Edit Template Modal */}
        {showTemplateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]" style={{ zIndex: 10000 }}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[95vh] overflow-y-auto relative z-[10000]">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {editingTemplate ? 'Edit Template' : 'Create New Template'}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Template Name *
                      </label>
                      <input
                        type="text"
                        value={templateForm.name}
                        onChange={(e) => setTemplateForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter template name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        value={templateForm.subject}
                        onChange={(e) => setTemplateForm(prev => ({ ...prev, subject: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter email subject"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={templateForm.category}
                        onChange={(e) => setTemplateForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="welcome">Welcome</option>
                        <option value="marketing">Marketing</option>
                        <option value="notification">Notification</option>
                        <option value="announcement">Announcement</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Text Content (Plain Text Version)
                      </label>
                      <textarea
                        value={templateForm.textContent}
                        onChange={(e) => setTemplateForm(prev => ({ ...prev, textContent: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        rows={4}
                        placeholder="Plain text version of the email (optional)"
                      />
                    </div>

                    {templateForm.variables.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Detected Variables
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {templateForm.variables.map(variable => (
                            <span key={variable} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              {`{{${variable}}}`}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Variables are automatically detected from your HTML content
                        </p>
                      </div>
                    )}
                  </div>

                  {/* HTML Editor */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      HTML Content *
                    </label>
                    <EmailTemplateEditor
                      content={templateForm.htmlContent}
                      onChange={handleContentChange}
                      placeholder="Create your email template with rich formatting..."
                      height={450}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Use {`{{variableName}}`} for dynamic content. Example: {`{{firstName}}, {{companyName}}`}
                    </p>
                    <div className="mt-2 text-xs text-green-600 bg-green-50 p-2 rounded">
                      <strong>Email Template Tips:</strong>
                      <ul className="list-disc list-inside mt-1">
                        <li>Use the rich text editor for professional formatting</li>
                        <li>Click the quick variable buttons below the editor</li>
                        <li>Keep images under 600px width for mobile compatibility</li>
                        <li>Test your template in different email clients</li>
                        <li>Variables like {`{{firstName}}`} will be replaced with actual data</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingTemplate ? handleUpdateTemplate : handleCreateTemplate}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                    disabled={isSubmitting || !templateForm.name || !templateForm.subject || !templateForm.htmlContent}
                  >
                    {isSubmitting ? 'Saving...' : editingTemplate ? 'Update Template' : 'Create Template'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && templateToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]" style={{ zIndex: 10000 }}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Template</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Are you sure you want to delete &quot;{templateToDelete.name}&quot;? This action cannot be undone.
                  </p>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setTemplateToDelete(null);
                    }}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteTemplate}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {showPreview && previewTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]" style={{ zIndex: 10000 }}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Preview: {previewTemplate.name}</h2>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Subject:</h3>
                  <p className="text-gray-700">{previewTemplate.subject}</p>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                    <h3 className="font-medium text-gray-900">HTML Preview</h3>
                  </div>
                  <div className="p-4">
                    <div 
                      dangerouslySetInnerHTML={{ __html: previewTemplate.htmlContent }}
                      className="prose max-w-none"
                    />
                  </div>
                </div>

                {previewTemplate.textContent && (
                  <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                      <h3 className="font-medium text-gray-900">Text Version</h3>
                    </div>
                    <div className="p-4">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                        {previewTemplate.textContent}
                      </pre>
                    </div>
                  </div>
                )}

                {previewTemplate.variables.length > 0 && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-2">Variables in this template:</h3>
                    <div className="flex flex-wrap gap-2">
                      {previewTemplate.variables.map(variable => (
                        <span key={variable} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {`{{${variable}}}`}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EmailTemplates;