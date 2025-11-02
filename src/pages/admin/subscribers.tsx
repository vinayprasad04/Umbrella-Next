import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminSidebar from './components/AdminSidebar';

interface Subscriber {
  _id: string;
  email: string;
  name?: string;
  source: 'website' | 'manual' | 'import';
  status: 'active' | 'unsubscribed' | 'bounced';
  subscribedAt: string;
  unsubscribedAt?: string;
  metadata?: {
    page?: string;
    userAgent?: string;
    ip?: string;
    referrer?: string;
  };
  createdAt: string;
  updatedAt: string;
}

type SortField = 'email' | 'name' | 'source' | 'status' | 'subscribedAt' | 'createdAt';
type SortDirection = 'asc' | 'desc';

const AdminSubscribers = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([]);
  const [totalSubscribers, setTotalSubscribers] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'website' | 'manual' | 'import'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'unsubscribed' | 'bounced'>('all');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingSubscriber, setEditingSubscriber] = useState<Subscriber | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriberForm, setSubscriberForm] = useState({
    email: '',
    name: '',
    source: 'manual' as 'website' | 'manual' | 'import',
    status: 'active' as 'active' | 'unsubscribed' | 'bounced'
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
      fetchSubscribers();
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

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/admin/subscribers', {
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch subscribers');
      }
      
      const data = await response.json();
      setSubscribers(data.subscribers || []);
      setTotalSubscribers(data.totalSubscribers || 0);
    } catch (error: any) {
      setError('Failed to load subscribers');
      console.error('Fetch subscribers error:', error);
    }
  };

  // Filter and sort subscribers
  useEffect(() => {
    let filtered = [...subscribers];

    // Apply filters
    if (sourceFilter !== 'all') {
      filtered = filtered.filter(sub => sub.source === sourceFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(sub => sub.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(sub => 
        sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sub.name && sub.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle undefined values
      if (aValue === undefined) aValue = '';
      if (bValue === undefined) bValue = '';

      // Convert to strings for comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortDirection === 'asc' ? comparison : -comparison;
      }

      // Handle dates
      if (sortField === 'subscribedAt' || sortField === 'createdAt') {
        const dateA = new Date(aValue as string);
        const dateB = new Date(bValue as string);
        const comparison = dateA.getTime() - dateB.getTime();
        return sortDirection === 'asc' ? comparison : -comparison;
      }

      return 0;
    });

    setFilteredSubscribers(filtered);
  }, [subscribers, searchTerm, sourceFilter, statusFilter, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }

    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
      </svg>
    );
  };

  const handleDeleteSubscriber = async (subscriberId: string) => {
    if (!confirm('Are you sure you want to delete this subscriber?')) return;

    try {
      const response = await fetch('/api/admin/subscribers', {
        method: 'DELETE',
        headers: getAuthHeaders(),
        body: JSON.stringify({ subscriberId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete subscriber');
      }

      await fetchSubscribers();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleUpdateStatus = async (subscriberId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/subscribers', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ subscriberId, status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update subscriber');
      }

      await fetchSubscribers();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const openModal = (subscriber?: Subscriber) => {
    if (subscriber) {
      setEditingSubscriber(subscriber);
      setSubscriberForm({
        email: subscriber.email,
        name: subscriber.name || '',
        source: subscriber.source,
        status: subscriber.status,
      });
    } else {
      setEditingSubscriber(null);
      setSubscriberForm({
        email: '',
        name: '',
        source: 'manual',
        status: 'active',
      });
    }
    setShowModal(true);
    setError('');
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSubscriber(null);
    setSubscriberForm({
      email: '',
      name: '',
      source: 'manual',
      status: 'active',
    });
    setError('');
  };

  const handleCreateSubscriber = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/subscribers', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(subscriberForm),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create subscriber');
      }

      await fetchSubscribers();
      closeModal();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateSubscriber = async () => {
    if (!editingSubscriber) return;
    
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/subscribers', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          subscriberId: editingSubscriber._id,
          ...subscriberForm,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update subscriber');
      }

      await fetchSubscribers();
      closeModal();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBulkDelete = async () => {
    const selectedEmails = selectedSubscribers.join(', ');
    if (!confirm(`Are you sure you want to delete ${selectedSubscribers.length} subscribers?\n\n${selectedEmails}`)) return;

    try {
      const deletePromises = selectedSubscribers.map(subscriberId =>
        fetch('/api/admin/subscribers', {
          method: 'DELETE',
          headers: getAuthHeaders(),
          body: JSON.stringify({ subscriberId }),
        })
      );

      await Promise.all(deletePromises);
      await fetchSubscribers();
      setSelectedSubscribers([]);
    } catch (error: any) {
      setError('Failed to delete subscribers');
    }
  };

  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([]);

  const handleSelectSubscriber = (subscriberId: string) => {
    setSelectedSubscribers(prev =>
      prev.includes(subscriberId)
        ? prev.filter(id => id !== subscriberId)
        : [...prev, subscriberId]
    );
  };

  const handleSelectAll = () => {
    if (selectedSubscribers.length === filteredSubscribers.length) {
      setSelectedSubscribers([]);
    } else {
      setSelectedSubscribers(filteredSubscribers.map(sub => sub._id));
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
        <title>Subscribers - Admin Panel</title>
        <meta name="description" content="Manage email subscribers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="flex">
          <AdminSidebar activeSection="subscribers" />

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Subscribers Management</h1>
                <p className="text-gray-600 mt-1">Manage email subscribers and newsletter contacts ({totalSubscribers} total)</p>
              </div>
              <div className="flex gap-3">
                {selectedSubscribers.length > 0 && (
                  <button
                    onClick={handleBulkDelete}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Selected ({selectedSubscribers.length})
                  </button>
                )}
                <button
                  onClick={() => openModal()}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Subscriber
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by email or name..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Source Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                  <select
                    value={sourceFilter}
                    onChange={(e) => setSourceFilter(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="all">All Sources</option>
                    <option value="website">Website</option>
                    <option value="manual">Manual</option>
                    <option value="import">Import</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="unsubscribed">Unsubscribed</option>
                    <option value="bounced">Bounced</option>
                  </select>
                </div>

                {/* Stats */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Results</label>
                  <div className="text-lg font-semibold text-gray-900">
                    {filteredSubscribers.length} subscribers
                  </div>
                </div>
              </div>
            </div>

            {/* Subscribers Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input
                          type="checkbox"
                          checked={selectedSubscribers.length === filteredSubscribers.length && filteredSubscribers.length > 0}
                          onChange={handleSelectAll}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('email')}
                      >
                        <div className="flex items-center gap-1">
                          Email
                          {getSortIcon('email')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('name')}
                      >
                        <div className="flex items-center gap-1">
                          Name
                          {getSortIcon('name')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('source')}
                      >
                        <div className="flex items-center gap-1">
                          Source
                          {getSortIcon('source')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('status')}
                      >
                        <div className="flex items-center gap-1">
                          Status
                          {getSortIcon('status')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('subscribedAt')}
                      >
                        <div className="flex items-center gap-1">
                          Subscribed
                          {getSortIcon('subscribedAt')}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSubscribers.map((subscriber) => (
                      <tr key={subscriber._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedSubscribers.includes(subscriber._id)}
                            onChange={() => handleSelectSubscriber(subscriber._id)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{subscriber.email}</div>
                          {subscriber.metadata?.page && (
                            <div className="text-xs text-gray-500">Subscribed from: {subscriber.metadata.page}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{subscriber.name || '-'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            subscriber.source === 'website' 
                              ? 'bg-green-100 text-green-800'
                              : subscriber.source === 'manual'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {subscriber.source}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            subscriber.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : subscriber.status === 'unsubscribed'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {subscriber.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(subscriber.subscribedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openModal(subscriber)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </button>
                            {subscriber.status === 'active' ? (
                              <button
                                onClick={() => handleUpdateStatus(subscriber._id, 'unsubscribed')}
                                className="text-yellow-600 hover:text-yellow-900"
                              >
                                Unsubscribe
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUpdateStatus(subscriber._id, 'active')}
                                className="text-green-600 hover:text-green-900"
                              >
                                Reactivate
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteSubscriber(subscriber._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredSubscribers.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    {searchTerm || sourceFilter !== 'all' || statusFilter !== 'all' 
                      ? 'No subscribers found matching your filters.' 
                      : 'No subscribers found.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />

        {/* Create/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingSubscriber ? 'Edit Subscriber' : 'Add New Subscriber'}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={subscriberForm.email}
                      onChange={(e) => setSubscriberForm({ ...subscriberForm, email: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name (Optional)</label>
                    <input
                      type="text"
                      value={subscriberForm.name}
                      onChange={(e) => setSubscriberForm({ ...subscriberForm, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter subscriber name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                    <select
                      value={subscriberForm.source}
                      onChange={(e) => setSubscriberForm({ ...subscriberForm, source: e.target.value as any })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="manual">Manual</option>
                      <option value="website">Website</option>
                      <option value="import">Import</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={subscriberForm.status}
                      onChange={(e) => setSubscriberForm({ ...subscriberForm, status: e.target.value as any })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="unsubscribed">Unsubscribed</option>
                      <option value="bounced">Bounced</option>
                    </select>
                  </div>
                </div>

                {error && (
                  <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingSubscriber ? handleUpdateSubscriber : handleCreateSubscriber}
                    disabled={isSubmitting || !subscriberForm.email.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Saving...' : (editingSubscriber ? 'Update Subscriber' : 'Add Subscriber')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminSubscribers;