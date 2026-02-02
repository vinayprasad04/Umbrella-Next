import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface User {
  name: string;
  email: string;
  initials: string;
  role?: string;
}

interface Comment {
  _id: string;
  content: string;
  user: User;
  parentComment: string | null;
  isEdited: boolean;
  editedAt: string | null;
  createdAt: string;
  updatedAt: string;
  replies: Comment[];
}

interface CommentSystemProps {
  blogId: string;
  commentsEnabled: boolean;
}

const CommentSystem: React.FC<CommentSystemProps> = ({ blogId, commentsEnabled }) => {
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [totalComments, setTotalComments] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    const userData = localStorage.getItem('userData');
    
    setIsLoggedIn(loggedIn);
    if (loggedIn && userData) {
      try {
        const user = JSON.parse(userData);
        setCurrentUser({
          name: user.name || 'User',
          email: user.email || '',
          initials: user.name ? user.name.split(' ').map((n: string) => n[0]).join('') : 'U',
          role: user.role || 'user'
        });
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
    
    fetchComments();
  }, [blogId]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('userToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/comments/${blogId}`);
      
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
        setTotalComments(data.totalComments || 0);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent, parentId: string | null = null) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    const content = parentId ? editContent : newComment;
    if (!content.trim()) {
      setError('Please enter a comment');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      const body: any = { content: content.trim() };
      if (parentId) {
        body.parentComment = parentId;
      }

      const response = await fetch(`/api/comments/${blogId}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to post comment');
      }

      // Reset form
      if (parentId) {
        setReplyTo(null);
        setEditContent('');
      } else {
        setNewComment('');
      }

      // Refresh comments
      await fetchComments();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditComment = async (commentId: string) => {
    if (!editContent.trim()) {
      setError('Please enter comment content');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      const response = await fetch(`/api/comments/${blogId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          commentId,
          content: editContent.trim()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update comment');
      }

      setEditingComment(null);
      setEditContent('');
      await fetchComments();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string, isAdminDelete: boolean = false) => {
    const confirmMessage = isAdminDelete
      ? 'Are you sure you want to delete this comment? (Admin Action - This will remove the comment permanently)'
      : 'Are you sure you want to delete this comment?';

    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      setError('');
      const response = await fetch(`/api/comments/${blogId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        body: JSON.stringify({ commentId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete comment');
      }

      await fetchComments();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderComment = (comment: Comment, depth: number = 0) => {
    const isOwner = currentUser && currentUser.email === comment.user.email;
    const isAdmin = currentUser && currentUser.role === 'admin';
    const canEdit = isOwner;
    const canDelete = isOwner || isAdmin;
    const maxDepth = 3;

    return (
      <div key={comment._id} className={`${depth > 0 ? 'ml-8 border-l-2 border-gray-200 dark:border-gray-700 pl-4' : ''}`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-4 transition-colors duration-300">
          {/* Comment Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {comment.user.initials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-gray-800 dark:text-gray-200">{comment.user.name}</div>
                  {isAdmin && !isOwner && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded">
                      Admin View
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(comment.createdAt)}
                  {comment.isEdited && (
                    <span className="ml-2 text-xs text-gray-400">(edited)</span>
                  )}
                </div>
              </div>
            </div>

            {/* Comment Actions */}
            {(canEdit || canDelete) && (
              <div className="flex items-center gap-2">
                {canEdit && (
                  <button
                    onClick={() => {
                      setEditingComment(comment._id);
                      setEditContent(comment.content);
                    }}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1 transition-colors duration-300"
                    title="Edit comment"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                )}
                {canDelete && (
                  <button
                    onClick={() => handleDeleteComment(comment._id, Boolean(isAdmin && !isOwner))}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium flex items-center gap-1 transition-colors duration-300"
                    title={isAdmin && !isOwner ? "Delete comment (Admin)" : "Delete comment"}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Comment Content */}
          {editingComment === comment._id ? (
            <div className="space-y-3">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none dark:bg-gray-700 dark:text-gray-200 transition-colors duration-300"
                rows={3}
                maxLength={2000}
                placeholder="Edit your comment..."
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditComment(comment._id)}
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 transition-colors duration-300"
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setEditingComment(null);
                    setEditContent('');
                  }}
                  className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg font-medium transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-gray-700 dark:text-gray-300 mb-3 whitespace-pre-wrap leading-relaxed">
                {comment.content}
              </div>

              {/* Reply Button */}
              {isLoggedIn && commentsEnabled && depth < maxDepth && (
                <button
                  onClick={() => {
                    setReplyTo(replyTo === comment._id ? null : comment._id);
                    setEditContent('');
                  }}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1 transition-colors duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                  Reply
                </button>
              )}
            </>
          )}

          {/* Reply Form */}
          {replyTo === comment._id && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
              <form onSubmit={(e) => handleSubmitComment(e, comment._id)}>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none dark:bg-gray-700 dark:text-gray-200 transition-colors duration-300"
                  rows={3}
                  maxLength={2000}
                  placeholder={`Reply to ${comment.user.name}...`}
                  required
                />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {editContent.length}/2000 characters
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setReplyTo(null);
                        setEditContent('');
                      }}
                      className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg font-medium transition-colors duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !editContent.trim()}
                      className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 transition-colors duration-300"
                    >
                      {isSubmitting ? 'Posting...' : 'Post Reply'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Render Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="space-y-0">
            {comment.replies.map(reply => renderComment(reply, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  if (!commentsEnabled) {
    return (
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center transition-colors duration-300">
        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Comments Disabled</h3>
        <p className="text-gray-600 dark:text-gray-400">Comments are currently disabled for this blog post.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-8">
        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Comments ({totalComments})
        </h3>
      </div>

      {/* Comment Form */}
      {isLoggedIn ? (
        <div className="mb-8">
          <form onSubmit={(e) => handleSubmitComment(e)}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {currentUser?.initials}
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none dark:bg-gray-700 dark:text-gray-200 transition-colors duration-300"
                  rows={4}
                  maxLength={2000}
                  placeholder="Share your thoughts..."
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {newComment.length}/2000 characters
              </span>
              <button
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 transition-all duration-200"
              >
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h4 className="font-semibold text-blue-800 dark:text-blue-300">Join the Discussion</h4>
          </div>
          <p className="text-blue-700 dark:text-blue-300 mb-4">
            Please log in to leave a comment and join the conversation.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/login')}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
            >
              Log In
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-500 px-4 py-2 rounded-lg font-medium transition-colors duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg transition-colors duration-300">
          {error}
        </div>
      )}

      {/* Comments List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
                </div>
              </div>
              <div className="space-y-2 ml-13">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No comments yet</h4>
          <p className="text-gray-500 dark:text-gray-400">Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-0">
          {comments.map(comment => renderComment(comment))}
        </div>
      )}
    </div>
  );
};

export default CommentSystem;