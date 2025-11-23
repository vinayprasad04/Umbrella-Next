import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('Testing auth...');
    console.log('Headers:', req.headers);
    
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided', authHeader });
    }

    const token = authHeader.substring(7);
    console.log('Token:', token.substring(0, 20) + '...');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!, { algorithms: ['HS256'] }) as any;
    console.log('Decoded token:', decoded);
    
    await dbConnect();
    console.log('Database connected');
    
    const user = await User.findById(decoded.userId);
    console.log('User found:', user ? { id: user._id, email: user.email, role: user.role } : 'None');
    
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required', userRole: user?.role });
    }
    
    res.status(200).json({ 
      message: 'Auth successful',
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Auth test error:', error);
    res.status(500).json({ 
      error: 'Test failed',
      details: error.message,
      stack: error.stack
    });
  }
}