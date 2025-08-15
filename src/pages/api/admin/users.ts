import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';

type UserData = {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

type Data = {
  users?: UserData[];
  user?: UserData;
  message?: string;
  totalUsers?: number;
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
  res: NextApiResponse<Data>
) {
  try {
    await dbConnect();
    
    // Check admin access for all operations
    await checkAdminAccess(req);

    switch (req.method) {
      case 'GET':
        // Get all users
        const users = await User.find({}, '-password -refreshTokens -resetPasswordToken')
          .sort({ createdAt: -1 });
        
        const totalUsers = await User.countDocuments();
        
        res.status(200).json({
          users: users.map(user => ({
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role || 'user',
            isVerified: user.isVerified,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
          })),
          totalUsers
        });
        break;

      case 'POST':
        // Create new user
        const { name, email, password, role } = req.body;
        
        if (!name || !email || !password) {
          return res.status(400).json({ error: 'Name, email and password are required' });
        }

        if (password.length < 6) {
          return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'User already exists with this email' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          role: role || 'user',
        });

        await newUser.save();

        res.status(201).json({
          message: 'User created successfully',
          user: {
            _id: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email,
            role: newUser.role || 'user',
            isVerified: newUser.isVerified,
            createdAt: newUser.createdAt.toISOString(),
            updatedAt: newUser.updatedAt.toISOString(),
          }
        });
        break;

      case 'PUT':
        // Update user
        const { userId, ...updateData } = req.body;
        
        if (!userId) {
          return res.status(400).json({ error: 'User ID is required' });
        }

        // If password is being updated, hash it
        if (updateData.password) {
          if (updateData.password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
          }
          updateData.password = await bcrypt.hash(updateData.password, 12);
        }

        const updatedUser = await User.findByIdAndUpdate(
          userId,
          updateData,
          { new: true, select: '-password -refreshTokens -resetPasswordToken' }
        );

        if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
          message: 'User updated successfully',
          user: {
            _id: updatedUser._id.toString(),
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role || 'user',
            isVerified: updatedUser.isVerified,
            createdAt: updatedUser.createdAt.toISOString(),
            updatedAt: updatedUser.updatedAt.toISOString(),
          }
        });
        break;

      case 'DELETE':
        // Delete user
        const userIdToDelete = req.body.userId || req.query.userId;
        
        if (!userIdToDelete) {
          return res.status(400).json({ error: 'User ID is required' });
        }

        const deletedUser = await User.findByIdAndDelete(userIdToDelete);
        
        if (!deletedUser) {
          return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
        break;

      default:
        res.status(405).json({ error: 'Method not allowed' });
        break;
    }
  } catch (error: any) {
    console.error('Admin users API error:', error);
    if (error.message === 'No token provided' || error.message === 'Admin access required') {
      return res.status(401).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}