import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Blog from '../../../models/Blog';
import User from '../../../models/User';

type BlogData = {
  blogs?: any[];
  totalBlogs?: number;
  categories?: any[];
} | {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlogData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    const { category, limit = 20, page = 1 } = req.query;
    
    // Build query
    const query: any = { status: 'live' }; // Only show published blogs
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Calculate pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;
    
    // Fetch blogs
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();
    
    // Get total count
    const totalBlogs = await Blog.countDocuments(query);
    
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
    
    // Format blogs for frontend
    const formattedBlogs = blogs.map((blog: any) => ({
      id: blog._id.toString(),
      title: blog.title,
      excerpt: blog.excerpt,
      author: 'IncomeGrow Financial',
      date: new Date(blog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      readTime: Math.max(1, Math.ceil(blog.content.replace(/<[^>]*>/g, '').split(' ').length / 200)) + ' min read',
      category: blog.category.toLowerCase().replace(/\s+/g, '-'),
      tags: blog.tags,
      slug: blog.slug,
      // Map category to colors for UI
      color: getCategoryColor(blog.category),
      image: getCategoryEmoji(blog.category)
    }));
    
    return res.status(200).json({
      blogs: formattedBlogs,
      totalBlogs,
      categories
    });
    
  } catch (error: any) {
    console.error('Public blogs API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function getCategoryColor(category: string): string {
  const colorMap: { [key: string]: string } = {
    'Investment': 'from-blue-400 to-blue-600',
    'Personal Finance': 'from-green-400 to-green-600',
    'Tax Planning': 'from-pink-400 to-pink-600',
    'Insurance': 'from-purple-400 to-purple-600',
    'Retirement Planning': 'from-indigo-400 to-indigo-600',
    'Stock Market': 'from-orange-400 to-orange-600',
    'Mutual Funds': 'from-teal-400 to-teal-600',
    'Real Estate': 'from-yellow-400 to-orange-500',
    'Education': 'from-cyan-400 to-cyan-600',
    'General': 'from-gray-400 to-gray-600'
  };
  
  return colorMap[category] || 'from-gray-400 to-gray-600';
}

function getCategoryEmoji(category: string): string {
  const emojiMap: { [key: string]: string } = {
    'Investment': '📈',
    'Personal Finance': '💰',
    'Tax Planning': '🧾',
    'Insurance': '🛡️',
    'Retirement Planning': '🏖️',
    'Stock Market': '📊',
    'Mutual Funds': '💼',
    'Real Estate': '🏠',
    'Education': '📚',
    'General': '📝'
  };
  
  return emojiMap[category] || '📝';
}