import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/mongodb';
import Blog from '../../../../models/Blog';

type BlogDetailData = {
  blog?: any;
  recentBlogs?: any[];
  categories?: any[];
} | {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlogDetailData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    const { slug } = req.query;
    
    if (!slug) {
      return res.status(400).json({ error: 'Blog slug is required' });
    }
    
    // Get the specific blog
    const blog = await Blog.findOne({ slug, status: 'live' })
      .populate('author', 'name')
      .lean();
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    // Increment view count
    await Blog.findByIdAndUpdate((blog as any)._id, { $inc: { viewCount: 1 } });
    
    // Get recent blogs (excluding current blog)
    const recentBlogs = await Blog.find({ 
      status: 'live', 
      _id: { $ne: (blog as any)._id } 
    })
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();
    
    // Get categories with counts
    const categoryAggregation = await Blog.aggregate([
      { $match: { status: 'live' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    const totalLiveBlogs = await Blog.countDocuments({ status: 'live' });
    
    const categories = [
      { id: 'all', name: 'All Posts', count: totalLiveBlogs },
      ...categoryAggregation.map(cat => ({
        id: cat._id.toLowerCase().replace(/\s+/g, '-'),
        name: cat._id,
        count: cat.count
      }))
    ];
    
    // Format blog data
    const blogData = blog as any;
    const formattedBlog = {
      id: blogData._id.toString(),
      title: blogData.title,
      excerpt: blogData.excerpt,
      content: blogData.content,
      author: blogData.author?.name || 'Unknown',
      date: new Date(blogData.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      readTime: Math.max(1, Math.ceil(blogData.content.replace(/<[^>]*>/g, '').split(' ').length / 200)) + ' min read',
      category: blogData.category,
      tags: blogData.tags,
      slug: blogData.slug,
      metaDescription: blogData.metaDescription,
      featuredImage: blogData.featuredImage,
      viewCount: (blogData.viewCount || 0) + 1,
      commentsEnabled: blogData.commentsEnabled,
      createdAt: blogData.createdAt,
      updatedAt: blogData.updatedAt
    };
    
    // Format recent blogs
    const formattedRecentBlogs = recentBlogs.map((recentBlog: any) => ({
      id: recentBlog._id.toString(),
      title: recentBlog.title,
      excerpt: recentBlog.excerpt,
      author: recentBlog.author?.name || 'Unknown',
      date: new Date(recentBlog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      readTime: Math.max(1, Math.ceil(recentBlog.content.replace(/<[^>]*>/g, '').split(' ').length / 200)) + ' min read',
      category: recentBlog.category,
      slug: recentBlog.slug,
      featuredImage: recentBlog.featuredImage,
      viewCount: recentBlog.viewCount || 0
    }));
    
    return res.status(200).json({
      blog: formattedBlog,
      recentBlogs: formattedRecentBlogs,
      categories
    });
    
  } catch (error: any) {
    console.error('Blog detail API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}