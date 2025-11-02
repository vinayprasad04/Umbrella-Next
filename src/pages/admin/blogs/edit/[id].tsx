import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminSidebar from '../../components/AdminSidebar';
import dynamic from 'next/dynamic';

// Dynamically import JoditEditor to avoid SSR issues
const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">Loading editor...</div>
});

interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  status: 'draft' | 'live';
  commentsEnabled: boolean;
  metaDescription: string;
  featuredImage: string;
}

const EditBlog = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [originalSlug, setOriginalSlug] = useState('');

  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    status: 'draft',
    commentsEnabled: true,
    metaDescription: '',
    featuredImage: ''
  });

  // Jodit editor configuration
  const config = useMemo(() => ({
    readonly: false,
    placeholder: 'Start writing your blog content...',
    height: 500,
    toolbar: true,
    spellcheck: true,
    language: 'en',
    toolbarButtonSize: 'small' as const,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    enableDragAndDropFileToEditor: true,
    uploader: {
      insertImageAsBase64URI: true,
    },
    buttons: [
      'source', '|',
      'bold', 'strikethrough', 'underline', 'italic', '|',
      'ul', 'ol', '|',
      'outdent', 'indent', '|',
      'font', 'fontsize', 'brush', 'paragraph', '|',
      'image', 'link', 'table', '|',
      'align', 'undo', 'redo', '|',
      'hr', 'eraser', 'copyformat', '|',
      'symbol', 'fullsize'
    ]
  }), []);

  const predefinedCategories = [
    'Tax Planning',
    'Investment',
    'Personal Finance',
    'Insurance',
    'Retirement Planning',
    'Stock Market',
    'Mutual Funds',
    'Real Estate',
    'Education',
    'General'
  ];

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
      if (id) {
        fetchBlog();
      } else {
        setIsLoading(false);
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

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/admin/blogs?id=${id}`, {
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch blog');
      }
      
      const data = await response.json();
      const blog = data.blog;
      
      setFormData({
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        category: blog.category,
        tags: blog.tags,
        status: blog.status,
        commentsEnabled: blog.commentsEnabled,
        metaDescription: blog.metaDescription || '',
        featuredImage: blog.featuredImage || ''
      });
      setOriginalSlug(blog.slug);
      setIsLoading(false);
    } catch (error: any) {
      setError('Failed to load blog');
      console.error('Fetch blog error:', error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof BlogFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Validation
      if (!formData.title.trim()) throw new Error('Title is required');
      if (!formData.content.trim()) throw new Error('Content is required');
      if (!formData.category.trim()) throw new Error('Category is required');
      if (!formData.excerpt.trim()) throw new Error('Excerpt is required');

      const response = await fetch('/api/admin/blogs', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ blogId: id, ...formData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update blog post');
      }

      const result = await response.json();
      router.push('/admin/blogs');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveAndContinue = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/blogs', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ blogId: id, ...formData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save blog post');
      }

      // Show success message without redirecting
      setError(''); // Clear any errors
      // You could show a success toast here
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/blogs', {
        method: 'DELETE',
        headers: getAuthHeaders(),
        body: JSON.stringify({ blogId: id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete blog post');
      }

      router.push('/admin/blogs');
    } catch (error: any) {
      setError(error.message);
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
        <title>Edit Blog Post - Admin Panel</title>
        <meta name="description" content="Edit blog post" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="flex">
          <AdminSidebar activeSection="blogs" />

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
                <p className="text-gray-600 mt-1">Update your blog post content</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsPreview(!isPreview)}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  {isPreview ? 'Edit' : 'Preview'}
                </button>
                <button
                  onClick={() => window.open(`/products/blogs/${originalSlug}`, '_blank')}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  View Live
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Delete
                </button>
                <button
                  onClick={() => router.push('/admin/blogs')}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-lg"
                >
                  Back to List
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {isPreview ? (
              /* Preview Mode */
              <div className="bg-white rounded-lg shadow p-8">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-6">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{formData.title || 'Untitled'}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        formData.status === 'live' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {formData.status === 'live' ? 'Published' : 'Draft'}
                      </span>
                      <span>Category: {formData.category || 'Uncategorized'}</span>
                      <span>Comments: {formData.commentsEnabled ? 'Enabled' : 'Disabled'}</span>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">{formData.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {formData.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: formData.content || '<p>No content yet...</p>' }}
                  />
                </div>
              </div>
            ) : (
              /* Edit Mode */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Title */}
                    <div className="bg-white rounded-lg shadow p-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter blog post title"
                        required
                      />
                    </div>

                    {/* Slug */}
                    <div className="bg-white rounded-lg shadow p-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => handleInputChange('slug', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="url-friendly-slug"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        URL: /blog/{formData.slug || 'your-slug-here'}
                      </p>
                    </div>

                    {/* Excerpt */}
                    <div className="bg-white rounded-lg shadow p-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Excerpt *
                      </label>
                      <textarea
                        value={formData.excerpt}
                        onChange={(e) => handleInputChange('excerpt', e.target.value)}
                        rows={3}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Brief description of the blog post"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {formData.excerpt.length}/160 characters (recommended for SEO)
                      </p>
                    </div>

                    {/* Content Editor */}
                    <div className="bg-white rounded-lg shadow p-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content *
                      </label>
                      <JoditEditor
                        value={formData.content}
                        config={config}
                        onBlur={(newContent) => handleInputChange('content', newContent)}
                        onChange={() => {}}
                      />
                    </div>

                    {/* Meta Description */}
                    <div className="bg-white rounded-lg shadow p-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Description
                      </label>
                      <textarea
                        value={formData.metaDescription}
                        onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                        rows={2}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="SEO meta description"
                      />
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Publish Options */}
                    <div className="bg-white rounded-lg shadow p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Update</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                          <select
                            value={formData.status}
                            onChange={(e) => handleInputChange('status', e.target.value as 'draft' | 'live')}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          >
                            <option value="draft">Draft</option>
                            <option value="live">Published</option>
                          </select>
                        </div>

                        <div>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.commentsEnabled}
                              onChange={(e) => handleInputChange('commentsEnabled', e.target.checked)}
                              className="rounded border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                            />
                            <span className="ml-2 text-sm text-gray-600">Enable Comments</span>
                          </label>
                        </div>

                        <div className="border-t pt-4">
                          <div className="flex flex-col gap-2">
                            <button
                              type="button"
                              onClick={handleSaveAndContinue}
                              disabled={isSubmitting}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
                            >
                              {isSubmitting ? 'Saving...' : 'Save & Continue'}
                            </button>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
                            >
                              {isSubmitting ? 'Updating...' : 'Update & Finish'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="bg-white rounded-lg shadow p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Category</h3>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      >
                        <option value="">Select a category</option>
                        {predefinedCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Tags */}
                    <div className="bg-white rounded-lg shadow p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Tags</h3>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {formData.tags.map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            #{tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-2 text-blue-600 hover:text-blue-800"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Add a tag"
                        />
                        <button
                          type="button"
                          onClick={handleAddTag}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Featured Image */}
                    <div className="bg-white rounded-lg shadow p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Featured Image</h3>
                      <input
                        type="url"
                        value={formData.featuredImage}
                        onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Image URL"
                      />
                      {formData.featuredImage && (
                        <div className="mt-3">
                          <img
                            src={formData.featuredImage}
                            alt="Featured"
                            className="w-full h-32 object-cover rounded-lg"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default EditBlog;