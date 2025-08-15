import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';
import AdminSidebar from '../components/AdminSidebar';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Recipient {
  id: string;
  email: string;
  name: string;
  type: 'user' | 'subscriber';
  status: string;
  source: string;
  role?: string;
  createdAt: string;
}

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

interface EmailComposer {
  templateId: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  recipients: string[];
  selectedUserIds: string[];
  variables: Record<string, string>;
}

const EmailCompose = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [filteredRecipients, setFilteredRecipients] = useState<Recipient[]>([]);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipientIds, setSelectedRecipientIds] = useState<string[]>([]);
  const [recipientFilter, setRecipientFilter] = useState<'all' | 'users' | 'subscribers'>('all');
  const [emailComposer, setEmailComposer] = useState<EmailComposer>({
    templateId: '',
    subject: '',
    htmlContent: '',
    textContent: '',
    recipients: [],
    selectedUserIds: [],
    variables: {},
  });
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [manualEmails, setManualEmails] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [error, setError] = useState('');
  const [showManualEmailInput, setShowManualEmailInput] = useState(false);
  const [newManualEmail, setNewManualEmail] = useState('');
  const [newManualName, setNewManualName] = useState('');
  const [isAddingManualEmail, setIsAddingManualEmail] = useState(false);

  // Filter recipients based on search and type
  useEffect(() => {
    let filtered = recipients;
    
    if (recipientFilter !== 'all') {
      filtered = filtered.filter(recipient => recipient.type === recipientFilter.slice(0, -1));
    }
    
    if (searchTerm) {
      filtered = filtered.filter(recipient => 
        recipient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipient.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredRecipients(filtered);
  }, [recipients, searchTerm, recipientFilter]);

  const handleSelectAll = () => {
    if (selectedRecipientIds.length === filteredRecipients.length) {
      setSelectedRecipientIds([]);
    } else {
      setSelectedRecipientIds(filteredRecipients.map(r => r.id));
    }
  };

  const handleRecipientToggle = (recipientId: string) => {
    setSelectedRecipientIds(prev => 
      prev.includes(recipientId)
        ? prev.filter(id => id !== recipientId)
        : [...prev, recipientId]
    );
  };

  const addManualEmail = async () => {
    if (!newManualEmail.trim()) return;
    
    setIsAddingManualEmail(true);
    try {
      const response = await fetch('/api/admin/subscribers', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          email: newManualEmail.trim(),
          name: newManualName.trim() || undefined,
          source: 'manual'
        }),
      });
      
      if (response.ok) {
        await fetchRecipients();
        setNewManualEmail('');
        setNewManualName('');
        setShowManualEmailInput(false);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to add email');
      }
    } catch (error: any) {
      setError('Failed to add manual email');
    } finally {
      setIsAddingManualEmail(false);
    }
  };

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
      fetchUsers();
      fetchRecipients();
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

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users', {
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error: any) {
      setError('Failed to load users');
      console.error('Fetch users error:', error);
    }
  };

  const fetchRecipients = async () => {
    try {
      const response = await fetch('/api/admin/recipients', {
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch recipients');
      }
      
      const data = await response.json();
      setRecipients(data.recipients || []);
      setFilteredRecipients(data.recipients || []);
    } catch (error: any) {
      setError('Failed to load recipients');
      console.error('Fetch recipients error:', error);
    }
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

  const handleSendEmail = async () => {
    setIsSendingEmail(true);
    setError('');

    try {
      // Get selected recipients instead of manual parsing
      const selectedRecipients = recipients.filter(r => selectedRecipientIds.includes(r.id));
      const selectedUserIds = selectedRecipients.filter(r => r.type === 'user').map(r => r.id);
      const selectedSubscriberEmails = selectedRecipients.filter(r => r.type === 'subscriber').map(r => r.email);
      
      // Parse manual emails from textarea
      const manualEmailList = manualEmails
        .split(/[,;\n]/)
        .map(email => email.trim())
        .filter(email => email && email.includes('@'));
      
      const emailData = {
        templateId: emailComposer.templateId || null,
        customSubject: emailComposer.subject,
        customHtmlContent: emailComposer.htmlContent,
        customTextContent: emailComposer.textContent,
        recipients: manualEmailList,
        selectedUserIds: selectedUserIds,
        subscriberEmails: selectedSubscriberEmails,
        variables: emailComposer.variables,
      };

      const response = await fetch('/api/admin/send-email', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }

      const result = await response.json();
      alert(`Email sent successfully to ${result.sentCount} recipients!`);
      
      setEmailComposer({
        templateId: '',
        subject: '',
        htmlContent: '',
        textContent: '',
        recipients: [],
        selectedUserIds: [],
        variables: {},
      });
      setSelectedRecipientIds([]);
      setManualEmails('');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSendingEmail(false);
    }
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
        <title>Compose Email - Email Center</title>
        <meta name="description" content="Compose and send emails to users" />
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
                <h1 className="text-3xl font-bold text-gray-900">Email Center - Compose</h1>
                <p className="text-gray-600 mt-1">Create and send emails to users</p>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => router.push('/admin/email-center/compose')}
                  className="px-4 py-2 rounded-lg font-medium bg-red-600 text-white"
                >
                  Compose Email
                </button>
                <button
                  onClick={() => router.push('/admin/email-center/templates')}
                  className="px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
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

            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
              {/* Email Composer */}
              <div className="lg:col-span-3 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Compose Email</h2>
                
                {/* Template Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Use Template (Optional)
                  </label>
                  <select
                    value={emailComposer.templateId}
                    onChange={(e) => {
                      const templateId = e.target.value;
                      if (templateId) {
                        const template = emailTemplates.find(t => t._id === templateId);
                        if (template) {
                          setEmailComposer(prev => ({
                            ...prev,
                            templateId,
                            subject: template.subject,
                            htmlContent: template.htmlContent,
                            textContent: template.textContent || '',
                          }));
                        }
                      } else {
                        setEmailComposer(prev => ({
                          ...prev,
                          templateId: '',
                          subject: '',
                          htmlContent: '',
                          textContent: '',
                        }));
                      }
                    }}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select a template</option>
                    {emailTemplates.map(template => (
                      <option key={template._id} value={template._id}>
                        {template.name} ({template.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    value={emailComposer.subject}
                    onChange={(e) => setEmailComposer(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter email subject"
                  />
                </div>

                {/* HTML Content */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">HTML Content</label>
                  <div className="border border-gray-300 rounded-md">
                    <JoditEditor
                      value={emailComposer.htmlContent}
                      onChange={(content) => setEmailComposer(prev => ({ ...prev, htmlContent: content }))}
                      config={{
                        readonly: false,
                        placeholder: 'Enter HTML content or use template...',
                        height: 400,
                        toolbar: true,
                        spellcheck: true,
                        language: 'en',
                        toolbarButtonSize: 'middle',
                        buttons: [
                          'source', '|',
                          'bold', 'italic', 'underline', '|',
                          'ul', 'ol', '|',
                          'outdent', 'indent', '|',
                          'font', 'fontsize', 'brush', 'paragraph', '|',
                          'image', 'link', 'table', '|',
                          'align', 'undo', 'redo', '|',
                          'hr', 'eraser', 'copyformat', '|',
                          'symbol', 'fullsize'
                        ],
                        uploader: {
                          insertImageAsBase64URI: true
                        },
                        removeButtons: ['brush', 'file'],
                        showXPathInStatusbar: false
                      }}
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plain Text Content (Optional)</label>
                  <textarea
                    value={emailComposer.textContent}
                    onChange={(e) => setEmailComposer(prev => ({ ...prev, textContent: e.target.value }))}
                    className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter plain text version..."
                  />
                </div>

                {/* Send Button */}
                <button
                  onClick={handleSendEmail}
                  disabled={isSendingEmail || !emailComposer.subject || !emailComposer.htmlContent}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSendingEmail ? 'Sending...' : 'Send Email'}
                </button>
              </div>

              {/* Recipients Panel */}
              <div className="bg-white lg:col-span-3 rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Recipients</h3>
                  <button
                    onClick={() => setShowManualEmailInput(!showManualEmailInput)}
                    className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Add Manual Email
                  </button>
                </div>
                
                {/* Add Manual Email */}
                {showManualEmailInput && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <h4 className="font-medium text-gray-700 mb-2">Add Manual Email</h4>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={newManualName}
                        onChange={(e) => setNewManualName(e.target.value)}
                        placeholder="Name (optional)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="email"
                        value={newManualEmail}
                        onChange={(e) => setNewManualEmail(e.target.value)}
                        placeholder="Email address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={addManualEmail}
                          disabled={isAddingManualEmail || !newManualEmail.trim()}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded disabled:opacity-50"
                        >
                          {isAddingManualEmail ? 'Adding...' : 'Add'}
                        </button>
                        <button
                          onClick={() => setShowManualEmailInput(false)}
                          className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Search and Filter */}
                <div className="mb-4 space-y-2">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search recipients..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setRecipientFilter('all')}
                      className={`px-3 py-1 text-xs rounded ${recipientFilter === 'all' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      All ({recipients.length})
                    </button>
                    <button
                      onClick={() => setRecipientFilter('users')}
                      className={`px-3 py-1 text-xs rounded ${recipientFilter === 'users' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      Users ({recipients.filter(r => r.type === 'user').length})
                    </button>
                    <button
                      onClick={() => setRecipientFilter('subscribers')}
                      className={`px-3 py-1 text-xs rounded ${recipientFilter === 'subscribers' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      Subscribers ({recipients.filter(r => r.type === 'subscriber').length})
                    </button>
                  </div>
                </div>

                {/* Clear Selection */}
                {selectedRecipientIds.length > 0 && (
                  <div className="mb-3 flex justify-end">
                    <button
                      onClick={() => setSelectedRecipientIds([])}
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Clear Selection ({selectedRecipientIds.length})
                    </button>
                  </div>
                )}

                {/* Recipients Table */}
                <div className="border border-gray-200 rounded-md mb-4">
                  {filteredRecipients.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      {searchTerm ? 'No recipients found matching your search.' : 'No recipients available.'}
                    </div>
                  ) : (
                    <div className="max-h-80 overflow-y-auto" style={{ maxHeight: '24rem' }}>
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr>
                            <th className="w-8 px-2 py-2 text-left">
                              <input
                                type="checkbox"
                                checked={selectedRecipientIds.length === filteredRecipients.length && filteredRecipients.length > 0}
                                onChange={handleSelectAll}
                                className="text-red-600 focus:ring-red-500"
                              />
                            </th>
                            <th className="px-3 py-2 text-left font-medium text-gray-900">Name</th>
                            <th className="px-3 py-2 text-left font-medium text-gray-900">Email</th>
                            <th className="px-3 py-2 text-left font-medium text-gray-900">Type</th>
                            <th className="px-3 py-2 text-left font-medium text-gray-900">Source</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {filteredRecipients.map((recipient, index) => (
                            <tr 
                              key={recipient.id} 
                              className={`hover:bg-gray-50 cursor-pointer ${index >= 6 ? '' : ''}`}
                              onClick={() => handleRecipientToggle(recipient.id)}
                            >
                              <td className="px-2 py-3">
                                <input
                                  type="checkbox"
                                  checked={selectedRecipientIds.includes(recipient.id)}
                                  onChange={() => handleRecipientToggle(recipient.id)}
                                  className="text-red-600 focus:ring-red-500"
                                />
                              </td>
                              <td className="px-3 py-3">
                                <div className="font-medium text-gray-900">{recipient.name}</div>
                                {recipient.role && (
                                  <div className="text-xs text-gray-400">Role: {recipient.role}</div>
                                )}
                              </td>
                              <td className="px-3 py-3 text-gray-600">{recipient.email}</td>
                              <td className="px-3 py-3">
                                <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                                  recipient.type === 'user' 
                                    ? 'bg-blue-100 text-blue-800' 
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  {recipient.type}
                                </span>
                              </td>
                              <td className="px-3 py-3">
                                <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                                  recipient.source === 'manual' 
                                    ? 'bg-purple-100 text-purple-800'
                                    : recipient.source === 'website'
                                    ? 'bg-orange-100 text-orange-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {recipient.source}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Additional Manual Emails */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Additional One-time Recipients</h4>
                  <textarea
                    value={manualEmails}
                    onChange={(e) => setManualEmails(e.target.value)}
                    className="w-full h-20 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    placeholder="Enter email addresses separated by commas, semicolons, or new lines (these won't be saved)"
                  />
                  <div className="mt-1 text-xs text-gray-500">
                    These emails are for one-time use and won&apos;t be saved to your recipients list
                  </div>
                </div>

                {/* Total Recipients Summary */}
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    Selected Recipients: {selectedRecipientIds.length}
                  </div>
                  <div className="text-sm text-gray-600">
                    + {manualEmails.split(/[,;\n]/).filter(email => email.trim() && email.includes('@')).length} additional emails
                  </div>
                  <div className="text-sm font-medium text-gray-900 mt-1">
                    Total: {selectedRecipientIds.length + manualEmails.split(/[,;\n]/).filter(email => email.trim() && email.includes('@')).length}
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

export default EmailCompose;