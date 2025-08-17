import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import Blog from '../../../models/Blog';
import Comment from '../../../models/Comment';

type CommentData = {
  comments?: any[];
  totalComments?: number;
  comment?: any;
  message?: string;
} | {
  error: string;
};

// Helper function to verify token (optional for GET requests)
const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as any;
  } catch (error) {
    return null;
  }
};

// Helper function to get user from token
const getUserFromToken = async (req: NextApiRequest) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  const decoded = verifyToken(token);
  if (!decoded) {
    return null;
  }

  const user = await User.findById(decoded.userId);
  return user;
};

// Helper function to build comment tree
const buildCommentTree = (comments: any[]) => {
  const commentMap = new Map();
  const rootComments: any[] = [];

  // First pass: create comment map
  comments.forEach(comment => {
    commentMap.set(comment._id.toString(), {
      ...comment,
      replies: []
    });
  });

  // Second pass: build tree structure
  comments.forEach(comment => {
    if (comment.parentComment) {
      const parent = commentMap.get(comment.parentComment.toString());
      if (parent) {
        parent.replies.push(commentMap.get(comment._id.toString()));
      }
    } else {
      rootComments.push(commentMap.get(comment._id.toString()));
    }
  });

  return rootComments;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommentData>
) {
  try {
    await dbConnect();
    
    const { blogId } = req.query;
    
    if (!blogId) {
      return res.status(400).json({ error: 'Blog ID is required' });
    }

    // Verify blog exists and comments are enabled
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    switch (req.method) {
      case 'GET':
        return await handleGet(req, res, blogId as string);
      case 'POST':
        return await handlePost(req, res, blogId as string, blog);
      case 'PUT':
        return await handlePut(req, res);
      case 'DELETE':
        return await handleDelete(req, res);
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Comments API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse<CommentData>, blogId: string) {
  try {
    const { page = 1, limit = 20 } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Get approved comments
    const comments = await Comment.find({ 
      blog: blogId, 
      status: 'approved' 
    })
      .populate('user', 'name email')
      .populate('parentComment', '_id')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    const totalComments = await Comment.countDocuments({ 
      blog: blogId, 
      status: 'approved' 
    });

    // Format comments
    const formattedComments = comments.map((comment: any) => ({
      _id: comment._id.toString(),
      content: comment.content,
      user: {
        name: comment.user?.name || 'Anonymous',
        email: comment.user?.email || '',
        initials: comment.user?.name ? comment.user.name.split(' ').map((n: string) => n[0]).join('') : 'A'
      },
      parentComment: comment.parentComment?._id?.toString() || null,
      isEdited: comment.isEdited,
      editedAt: comment.editedAt,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt
    }));

    // Build comment tree
    const commentTree = buildCommentTree(formattedComments);

    return res.status(200).json({
      comments: commentTree,
      totalComments
    });
  } catch (error) {
    console.error('Get comments error:', error);
    return res.status(500).json({ error: 'Failed to fetch comments' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse<CommentData>, blogId: string, blog: any) {
  try {
    // Check if comments are enabled for this blog
    if (!blog.commentsEnabled) {
      return res.status(403).json({ error: 'Comments are disabled for this blog post' });
    }

    // Get user from token
    const user = await getUserFromToken(req);
    if (!user) {
      return res.status(401).json({ error: 'Authentication required to comment' });
    }

    const { content, parentComment } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: 'Comment content is required' });
    }

    if (content.length > 2000) {
      return res.status(400).json({ error: 'Comment is too long. Maximum 2000 characters allowed.' });
    }

    // Validate parent comment if provided
    if (parentComment) {
      const parentExists = await Comment.findOne({ 
        _id: parentComment, 
        blog: blogId, 
        status: 'approved' 
      });
      if (!parentExists) {
        return res.status(400).json({ error: 'Parent comment not found' });
      }
    }

    // Get client IP and user agent
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';

    // Create new comment
    const newComment = new Comment({
      blog: blogId,
      user: user._id,
      parentComment: parentComment || null,
      content: content.trim(),
      status: 'approved', // Auto-approve for registered users
      ipAddress: Array.isArray(ipAddress) ? ipAddress[0] : ipAddress,
      userAgent: userAgent.toString(),
    });

    const savedComment = await newComment.save();
    
    // Populate user data for response
    await savedComment.populate('user', 'name email');

    const formattedComment = {
      _id: savedComment._id.toString(),
      content: savedComment.content,
      user: {
        name: savedComment.user?.name || 'Anonymous',
        email: savedComment.user?.email || '',
        initials: savedComment.user?.name ? savedComment.user.name.split(' ').map((n: string) => n[0]).join('') : 'A'
      },
      parentComment: savedComment.parentComment?.toString() || null,
      isEdited: false,
      editedAt: null,
      createdAt: savedComment.createdAt,
      updatedAt: savedComment.updatedAt,
      replies: []
    };

    return res.status(201).json({
      message: 'Comment posted successfully',
      comment: formattedComment
    });
  } catch (error) {
    console.error('Post comment error:', error);
    return res.status(500).json({ error: 'Failed to post comment' });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse<CommentData>) {
  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { commentId, content } = req.body;

    if (!commentId || !content) {
      return res.status(400).json({ error: 'Comment ID and content are required' });
    }

    if (content.length > 2000) {
      return res.status(400).json({ error: 'Comment is too long. Maximum 2000 characters allowed.' });
    }

    // Find comment and verify ownership
    const comment = await Comment.findOne({ 
      _id: commentId, 
      user: user._id,
      status: 'approved' 
    });

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found or you do not have permission to edit it' });
    }

    // Check if comment is not too old (e.g., allow editing within 24 hours)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    if (comment.createdAt && comment.createdAt < twentyFourHoursAgo) {
      return res.status(403).json({ error: 'Comments can only be edited within 24 hours of posting' });
    }

    // Update comment
    comment.content = content.trim();
    comment.isEdited = true;
    comment.editedAt = new Date();
    
    await comment.save();
    await comment.populate('user', 'name email');

    const formattedComment = {
      _id: comment._id.toString(),
      content: comment.content,
      user: {
        name: comment.user?.name || 'Anonymous',
        email: comment.user?.email || '',
        initials: comment.user?.name ? comment.user.name.split(' ').map((n: string) => n[0]).join('') : 'A'
      },
      parentComment: comment.parentComment?.toString() || null,
      isEdited: comment.isEdited,
      editedAt: comment.editedAt,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt
    };

    return res.status(200).json({
      message: 'Comment updated successfully',
      comment: formattedComment
    });
  } catch (error) {
    console.error('Update comment error:', error);
    return res.status(500).json({ error: 'Failed to update comment' });
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse<CommentData>) {
  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { commentId } = req.body;

    if (!commentId) {
      return res.status(400).json({ error: 'Comment ID is required' });
    }

    // Find comment and verify ownership or admin rights
    const comment = await Comment.findOne({ _id: commentId });
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Check if user owns the comment or is admin
    if (comment.user.toString() !== user._id.toString() && user.role !== 'admin') {
      return res.status(403).json({ error: 'You do not have permission to delete this comment' });
    }

    // Check if comment has replies
    const hasReplies = await Comment.countDocuments({ parentComment: commentId });
    
    if (hasReplies > 0) {
      // If has replies, just mark as deleted but keep structure
      comment.content = '[Comment deleted by user]';
      comment.status = 'rejected';
      await comment.save();
    } else {
      // If no replies, completely delete
      await Comment.findByIdAndDelete(commentId);
    }

    return res.status(200).json({
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    console.error('Delete comment error:', error);
    return res.status(500).json({ error: 'Failed to delete comment' });
  }
}