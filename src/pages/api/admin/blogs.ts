import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import Blog, { IBlog } from '../../../models/Blog';

type BlogData = {
  blogs?: IBlog[];
  blog?: IBlog;
  message?: string;
  totalBlogs?: number;
  currentPage?: number;
  totalPages?: number;
} | {
  error: string;
};

// Middleware to check admin access
const checkAdminAccess = async (req: NextApiRequest) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const token = authHeader.substring(7);
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
  
  const user = await User.findById(decoded.userId);
  if (!user || user.role !== 'admin') {
    throw new Error('Admin access required');
  }
  
  return user;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlogData>
) {
  try {
    await dbConnect();
    
    // Check admin access
    const user = await checkAdminAccess(req);

    switch (req.method) {
      case 'GET':
        return await handleGet(req, res);
      case 'POST':
        return await handlePost(req, res, user._id);
      case 'PUT':
        return await handlePut(req, res);
      case 'DELETE':
        return await handleDelete(req, res);
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Blog API Error:', error);
    
    if (error.message === 'No token provided' || error.message === 'Admin access required' || error.name === 'JsonWebTokenError') {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse<BlogData>) {
  const { id } = req.query;

  if (id) {
    // Get single blog
    const blog = await Blog.findById(id).populate('author', 'name email');
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    return res.status(200).json({ blog: blog.toObject() });
  } else {
    // Get all blogs with pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find({})
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalBlogs = await Blog.countDocuments({});

    return res.status(200).json({
      blogs: blogs.map((blog: any) => ({
        _id: blog._id.toString(),
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        category: blog.category,
        tags: blog.tags,
        status: blog.status,
        commentsEnabled: blog.commentsEnabled,
        metaDescription: blog.metaDescription || '',
        featuredImage: blog.featuredImage || '',
        author: blog.author.toString(),
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        viewCount: blog.viewCount || 0,
      } as IBlog)),
      totalBlogs,
      currentPage: page,
      totalPages: Math.ceil(totalBlogs / limit),
    });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse<BlogData>, userId: string) {
  const {
    title,
    slug,
    excerpt,
    content,
    category,
    tags,
    status,
    commentsEnabled,
    metaDescription,
    featuredImage
  } = req.body;

  // Validation
  if (!title || !content || !category || !excerpt) {
    return res.status(400).json({ error: 'Title, content, category, and excerpt are required' });
  }

  // Generate slug if not provided
  let finalSlug = slug;
  if (!finalSlug) {
    finalSlug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // Check if slug already exists
  const existingBlog = await Blog.findOne({ slug: finalSlug });
  if (existingBlog) {
    return res.status(400).json({ error: 'A blog with this slug already exists' });
  }

  const newBlog = new Blog({
    title: title.trim(),
    slug: finalSlug,
    excerpt: excerpt.trim(),
    content: content.trim(),
    category: category.trim(),
    tags: Array.isArray(tags) ? tags.map((tag: string) => tag.trim()).filter(Boolean) : [],
    status: status || 'draft',
    commentsEnabled: commentsEnabled !== false,
    metaDescription: metaDescription?.trim() || '',
    featuredImage: featuredImage?.trim() || '',
    author: userId,
  });

  const savedBlog = await newBlog.save();
  
  return res.status(201).json({
    message: 'Blog created successfully',
    blog: savedBlog.toObject()
  });
}

async function handlePut(req: NextApiRequest, res: NextApiResponse<BlogData>) {
  const { blogId, status, ...updateData } = req.body;

  if (!blogId) {
    return res.status(400).json({ error: 'Blog ID is required' });
  }

  // If only updating status
  if (status && Object.keys(req.body).length === 2) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    return res.status(200).json({ message: 'Blog status updated successfully' });
  }

  // Full blog update
  const {
    title,
    slug,
    excerpt,
    content,
    category,
    tags,
    commentsEnabled,
    metaDescription,
    featuredImage
  } = updateData;

  if (!title || !content || !category || !excerpt) {
    return res.status(400).json({ error: 'Title, content, category, and excerpt are required' });
  }

  // Generate slug if not provided
  let finalSlug = slug;
  if (!finalSlug) {
    finalSlug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // Check if slug already exists (excluding current blog)
  const existingBlog = await Blog.findOne({ 
    slug: finalSlug, 
    _id: { $ne: blogId } 
  });
  if (existingBlog) {
    return res.status(400).json({ error: 'A blog with this slug already exists' });
  }

  const updateFields = {
    title: title.trim(),
    slug: finalSlug,
    excerpt: excerpt.trim(),
    content: content.trim(),
    category: category.trim(),
    tags: Array.isArray(tags) ? tags.map((tag: string) => tag.trim()).filter(Boolean) : [],
    status: status || 'draft',
    commentsEnabled: commentsEnabled !== false,
    metaDescription: metaDescription?.trim() || '',
    featuredImage: featuredImage?.trim() || '',
    updatedAt: new Date()
  };

  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    updateFields,
    { new: true }
  );

  if (!updatedBlog) {
    return res.status(404).json({ error: 'Blog not found' });
  }

  return res.status(200).json({ message: 'Blog updated successfully' });
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse<BlogData>) {
  const { blogId } = req.body;

  if (!blogId) {
    return res.status(400).json({ error: 'Blog ID is required' });
  }

  const deletedBlog = await Blog.findByIdAndDelete(blogId);

  if (!deletedBlog) {
    return res.status(404).json({ error: 'Blog not found' });
  }

  return res.status(200).json({ message: 'Blog deleted successfully' });
}