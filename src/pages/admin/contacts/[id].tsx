import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminSidebar from '../components/AdminSidebar';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  assignedTo?: string;
  assignedToName?: string;
  response?: string;
  responseDate?: string;
  tags: string[];
  ipAddress?: string;
  userAgent?: string;
  source: string;
  isRead: boolean;
  isStarred: boolean;
  createdAt: string;
  updatedAt: string;
}

const ContactDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [contact, setContact] = useState<Contact | null>(null);
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showResponseForm, setShowResponseForm] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [newTag, setNewTag] = useState('');

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
      
      if (id) {
        fetchContact();
      }
    };

    checkAdminAccess();
  }, [router, id]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('userToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  const fetchContact = async () => {
    try {
      const response = await fetch(`/api/admin/contacts?contactId=${id}`, {
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch contact details');
      }
      
      const data = await response.json();
      setContact(data.contact);
      setResponseText(data.contact.response || '');
    } catch (error: any) {
      setError('Failed to load contact details');
      console.error('Fetch contact error:', error);
    }
  };

  const updateContact = async (updates: any) => {
    if (!contact) return;
    
    setIsUpdating(true);
    try {
      const response = await fetch('/api/admin/contacts', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          contactId: contact._id,
          ...updates
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update contact');
      }

      await fetchContact(); // Refresh the contact data
    } catch (error: any) {
      setError('Failed to update contact');
      console.error('Update contact error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const markAsRead = () => {
    updateContact({ action: 'mark_read' });
  };

  const toggleStar = () => {
    updateContact({ isStarred: !contact?.isStarred });
  };

  const updateStatus = (status: string) => {
    updateContact({ status });
  };

  const updatePriority = (priority: string) => {
    updateContact({ priority });
  };

  const updateCategory = (category: string) => {
    updateContact({ category });
  };

  const handleResponse = () => {
    if (!responseText.trim()) return;
    
    updateContact({ 
      action: 'respond',
      response: responseText.trim()
    });
    setShowResponseForm(false);
  };

  const addTag = () => {
    if (!newTag.trim() || !contact) return;
    
    const updatedTags = [...contact.tags];
    if (!updatedTags.includes(newTag.trim())) {
      updatedTags.push(newTag.trim());
      updateContact({ tags: updatedTags });
    }
    setNewTag('');
  };

  const removeTag = (tagToRemove: string) => {
    if (!contact) return;
    
    const updatedTags = contact.tags.filter(tag => tag !== tagToRemove);
    updateContact({ tags: updatedTags });
  };

  const deleteContact = async () => {
    if (!contact || !confirm('Are you sure you want to delete this contact? This action cannot be undone.')) {
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch('/api/admin/contacts', {
        method: 'DELETE',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          contactId: contact._id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }

      router.push('/admin/contacts');
    } catch (error: any) {
      setError('Failed to delete contact');
      console.error('Delete contact error:', error);
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contact details...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  if (!contact) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">Contact not found</h3>
          <p className="text-gray-500 mb-4">The contact you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => router.push('/admin/contacts')}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Back to Contacts
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{contact.name} - Contact Details</title>
        <meta name="description" content="Contact form submission details" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="flex">
          <AdminSidebar activeSection="contacts" />

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <button
                  onClick={() => router.push('/admin/contacts')}
                  className="mr-4 text-gray-600 hover:text-gray-800"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                    {contact.name}
                    {!contact.isRead && (
                      <span className="ml-3 w-3 h-3 bg-blue-600 rounded-full"></span>
                    )}
                    <button
                      onClick={toggleStar}
                      className={`ml-3 ${contact.isStarred ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400`}
                      disabled={isUpdating}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  </h1>
                  <p className="text-gray-600">{contact.email}</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                {!contact.isRead && (
                  <button
                    onClick={markAsRead}
                    disabled={isUpdating}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => setShowResponseForm(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Respond
                </button>
                <button
                  onClick={deleteContact}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span>{error}</span>
                  <button
                    onClick={() => setError('')}
                    className="text-red-600 hover:text-red-800"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Contact Information */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
                  </div>
                  <div className="p-6">
                    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                        <dd className="mt-1 text-sm text-gray-900">{contact.name}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-800">
                            {contact.email}
                          </a>
                        </dd>
                      </div>
                      {contact.phone && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Phone</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            <a href={`tel:${contact.phone}`} className="text-blue-600 hover:text-blue-800">
                              {contact.phone}
                            </a>
                          </dd>
                        </div>
                      )}
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Source</dt>
                        <dd className="mt-1 text-sm text-gray-900 capitalize">{contact.source}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Submitted</dt>
                        <dd className="mt-1 text-sm text-gray-900">{formatDate(contact.createdAt)}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                        <dd className="mt-1 text-sm text-gray-900">{formatDate(contact.updatedAt)}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Message</h2>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{contact.subject}</h3>
                      <div className="prose prose-sm max-w-none text-gray-700">
                        {contact.message.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-2">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {contact.response && (
                  <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b border-gray-200">
                      <h2 className="text-xl font-semibold text-gray-900">Admin Response</h2>
                      {contact.responseDate && (
                        <p className="text-sm text-gray-500">
                          Responded on {formatDate(contact.responseDate)}
                        </p>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="prose prose-sm max-w-none text-gray-700">
                        {contact.response.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-2">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Status & Priority */}
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Status & Priority</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={contact.status}
                        onChange={(e) => updateStatus(e.target.value)}
                        disabled={isUpdating}
                        className={`w-full px-3 py-2 rounded-lg font-medium text-sm ${getStatusColor(contact.status)} border-0`}
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <select
                        value={contact.priority}
                        onChange={(e) => updatePriority(e.target.value)}
                        disabled={isUpdating}
                        className={`w-full px-3 py-2 rounded-lg font-medium text-sm ${getPriorityColor(contact.priority)} border-0`}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={contact.category}
                        onChange={(e) => updateCategory(e.target.value)}
                        disabled={isUpdating}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="general">General</option>
                        <option value="support">Support</option>
                        <option value="billing">Billing</option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">Feedback</option>
                        <option value="bug_report">Bug Report</option>
                        <option value="feature_request">Feature Request</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Tags</h3>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {contact.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add tag"
                        className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      />
                      <button
                        onClick={addTag}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Technical Details */}
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Technical Details</h3>
                  </div>
                  <div className="p-6 space-y-3">
                    {contact.ipAddress && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">IP Address</dt>
                        <dd className="text-sm text-gray-900 font-mono">{contact.ipAddress}</dd>
                      </div>
                    )}
                    {contact.userAgent && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">User Agent</dt>
                        <dd className="text-xs text-gray-900 break-all">{contact.userAgent}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Contact ID</dt>
                      <dd className="text-xs text-gray-900 font-mono">{contact._id}</dd>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Modal */}
            {showResponseForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Respond to {contact.name}</h2>
                      <button
                        onClick={() => setShowResponseForm(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Response
                      </label>
                      <textarea
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        rows={8}
                        placeholder="Type your response here..."
                      />
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setShowResponseForm(false)}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleResponse}
                        disabled={!responseText.trim() || isUpdating}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                      >
                        {isUpdating ? 'Sending...' : 'Send Response'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ContactDetails;