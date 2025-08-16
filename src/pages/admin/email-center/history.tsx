import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminSidebar from '../components/AdminSidebar';

interface EmailRecipient {
  id: string;
  email: string;
  name: string;
  type: 'user' | 'subscriber' | 'manual';
  status: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'failed';
  sentAt?: string;
  deliveredAt?: string;
  openedAt?: string;
  clickedAt?: string;
  bouncedAt?: string;
  errorMessage?: string;
}

interface EmailHistory {
  _id: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  templateId?: string;
  templateName?: string;
  sentBy: string;
  sentByName: string;
  sentByEmail: string;
  totalRecipients: number;
  successfulSends: number;
  failedSends: number;
  bouncedEmails: number;
  openedEmails: number;
  clickedEmails: number;
  recipients: EmailRecipient[];
  variables: Record<string, any>;
  status: string;
  sentAt: string;
  scheduledAt?: string;
  completedAt?: string;
  errorMessage?: string;
  campaign?: {
    name: string;
    type: string;
  };
  analytics: {
    openRate: number;
    clickRate: number;
    bounceRate: number;
    deliveryRate: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface EmailStats {
  totalSent: number;
  totalDelivered: number;
  totalOpened: number;
  totalClicked: number;
  totalBounced: number;
  averageOpenRate: number;
  averageClickRate: number;
  averageBounceRate: number;
}

const EmailHistoryPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [emailHistory, setEmailHistory] = useState<EmailHistory[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailHistory | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRecipientModal, setShowRecipientModal] = useState(false);
  const [stats, setStats] = useState<EmailStats | null>(null);
  const [error, setError] = useState('');
  
  // Filters and pagination
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    startDate: '',
    endDate: '',
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
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
      fetchEmailHistory();
      
      // Check if emailId is in query params to show specific email
      const { emailId } = router.query;
      if (emailId && typeof emailId === 'string') {
        fetchSpecificEmail(emailId);
      }
    };

    checkAdminAccess();
  }, [router, pagination.currentPage, filters]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('userToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  const fetchEmailHistory = async () => {
    try {
      const params = new URLSearchParams({
        page: pagination.currentPage.toString(),
        limit: pagination.itemsPerPage.toString(),
      });

      if (filters.status !== 'all') {
        params.append('status', filters.status);
      }
      if (filters.search) {
        params.append('search', filters.search);
      }
      if (filters.startDate) {
        params.append('startDate', filters.startDate);
      }
      if (filters.endDate) {
        params.append('endDate', filters.endDate);
      }

      const response = await fetch(`/api/admin/email-history?${params}`, {
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch email history');
      }
      
      const data = await response.json();
      setEmailHistory(data.history || []);
      setStats(data.stats);
      setPagination(data.pagination);
    } catch (error: any) {
      setError(error.message || 'Failed to load email history');
      console.error('Fetch email history error:', error);
    }
  };

  const fetchSpecificEmail = async (emailId: string) => {
    try {
      const response = await fetch(`/api/admin/email-history?emailId=${emailId}`, {
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch email details');
      }
      
      const data = await response.json();
      if (data.email) {
        setSelectedEmail(data.email);
        setShowDetailModal(true);
      }
    } catch (error: any) {
      setError(error.message || 'Failed to load email details');
      console.error('Fetch specific email error:', error);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const openDetailModal = (email: EmailHistory) => {
    setSelectedEmail(email);
    setShowDetailModal(true);
  };

  const openRecipientModal = (email: EmailHistory) => {
    setSelectedEmail(email);
    setShowRecipientModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'opened': return 'bg-purple-100 text-purple-800';
      case 'clicked': return 'bg-orange-100 text-orange-800';
      case 'bounced': return 'bg-red-100 text-red-800';
      case 'failed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading email history...</p>
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
        <title>Email History - Email Center</title>
        <meta name="description" content="View email campaign history and analytics" />
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
                <h1 className="text-3xl font-bold text-gray-900">Email Center - History</h1>
                <p className="text-gray-600 mt-1">Track sent emails and campaign performance</p>
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
                  className="px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Templates
                </button>
                <button
                  onClick={() => router.push('/admin/email-center/history')}
                  className="px-4 py-2 rounded-lg font-medium bg-red-600 text-white"
                >
                  History
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span>{error}</span>
                  <button
                    onClick={() => {
                      setError('');
                      fetchEmailHistory();
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* Statistics Cards */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Total Sent</p>
                      <p className="text-2xl font-semibold text-gray-900">{stats.totalSent.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Delivered</p>
                      <p className="text-2xl font-semibold text-gray-900">{stats.totalDelivered.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Opened</p>
                      <p className="text-2xl font-semibold text-gray-900">{stats.totalOpened.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{stats.averageOpenRate}% avg rate</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Clicked</p>
                      <p className="text-2xl font-semibold text-gray-900">{stats.totalClicked.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{stats.averageClickRate}% avg rate</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Filter Email History</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={filters.status}
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="all">All Status</option>
                      <option value="sent">Sent</option>
                      <option value="delivered">Delivered</option>
                      <option value="opened">Opened</option>
                      <option value="clicked">Clicked</option>
                      <option value="bounced">Bounced</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                    <input
                      type="text"
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      placeholder="Search by subject or sender..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={filters.startDate}
                      onChange={(e) => handleFilterChange('startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={filters.endDate}
                      onChange={(e) => handleFilterChange('endDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Email History Table */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Email History</h2>
              </div>
              
              <div className="overflow-x-auto">
                {emailHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No email history</h3>
                    <p className="mt-1 text-sm text-gray-500">Start by sending your first email campaign.</p>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subject & Sender
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Recipients
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Performance
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sent At
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {emailHistory.map((email) => (
                        <tr key={email._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                {email.subject}
                              </div>
                              <div className="text-sm text-gray-500">
                                by {email.sentByName}
                              </div>
                              {email.templateName && (
                                <div className="text-xs text-blue-600">
                                  Template: {email.templateName}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {email.totalRecipients} total
                            </div>
                            <div className="text-sm text-gray-500">
                              {email.successfulSends} sent, {email.failedSends} failed
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {email.openedEmails} opens ({email.analytics.openRate}%)
                            </div>
                            <div className="text-sm text-gray-500">
                              {email.clickedEmails} clicks ({email.analytics.clickRate}%)
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {formatDate(email.sentAt)}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(email.status)}`}>
                              {email.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium space-x-2">
                            <button
                              onClick={() => openDetailModal(email)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View
                            </button>
                            <button
                              onClick={() => openRecipientModal(email)}
                              className="text-green-600 hover:text-green-900"
                            >
                              Recipients
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{' '}
                      {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
                      {pagination.totalItems} results
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                        className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-1 rounded border ${
                            page === pagination.currentPage 
                              ? 'bg-red-600 text-white border-red-600' 
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                        className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />

        {/* Email Detail Modal */}
        {showDetailModal && selectedEmail && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]" style={{ zIndex: 10000 }}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Email Details</h2>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Email Information</h3>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Subject</dt>
                        <dd className="text-sm text-gray-900">{selectedEmail.subject}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Sent by</dt>
                        <dd className="text-sm text-gray-900">{selectedEmail.sentByName} ({selectedEmail.sentByEmail})</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Template</dt>
                        <dd className="text-sm text-gray-900">{selectedEmail.templateName || 'Custom email'}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Sent at</dt>
                        <dd className="text-sm text-gray-900">{formatDate(selectedEmail.sentAt)}</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Total Recipients</dt>
                        <dd className="text-sm text-gray-900">{selectedEmail.totalRecipients}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Successful Sends</dt>
                        <dd className="text-sm text-gray-900">{selectedEmail.successfulSends}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Opens</dt>
                        <dd className="text-sm text-gray-900">{selectedEmail.openedEmails} ({selectedEmail.analytics.openRate}%)</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Clicks</dt>
                        <dd className="text-sm text-gray-900">{selectedEmail.clickedEmails} ({selectedEmail.analytics.clickRate}%)</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Bounces</dt>
                        <dd className="text-sm text-gray-900">{selectedEmail.bouncedEmails} ({selectedEmail.analytics.bounceRate}%)</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Email Content Preview</h3>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
                    <div 
                      dangerouslySetInnerHTML={{ __html: selectedEmail.htmlContent }}
                      className="prose max-w-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recipients Modal */}
        {showRecipientModal && selectedEmail && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]" style={{ zIndex: 10000 }}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Recipients ({selectedEmail.totalRecipients})</h2>
                  <button
                    onClick={() => setShowRecipientModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Recipient
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sent At
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Activity
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedEmail.recipients.map((recipient, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{recipient.name}</div>
                              <div className="text-sm text-gray-500">{recipient.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              recipient.type === 'user' ? 'bg-blue-100 text-blue-800' :
                              recipient.type === 'subscriber' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {recipient.type}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(recipient.status)}`}>
                              {recipient.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {recipient.sentAt ? formatDate(recipient.sentAt) : '-'}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {recipient.openedAt ? `Opened: ${formatDate(recipient.openedAt)}` :
                             recipient.clickedAt ? `Clicked: ${formatDate(recipient.clickedAt)}` :
                             recipient.bouncedAt ? `Bounced: ${formatDate(recipient.bouncedAt)}` :
                             '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EmailHistoryPage;