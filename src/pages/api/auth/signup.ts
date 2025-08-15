import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';

type Data = {
  message: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  accessToken?: string;
  refreshToken?: string;
  token?: string; // Keep for backward compatibility
} | {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      password: hashedPassword,
      name,
    });

    await user.save();

    // Generate access token (short-lived)
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );

    // Generate refresh token (long-lived)
    const refreshToken = crypto.randomBytes(64).toString('hex');
    const refreshTokenExpiry = new Date(Date.now() + 4 * 60 * 60 * 1000); // 4 hours

    // Initialize refreshTokens array if it doesn't exist
    if (!user.refreshTokens) {
      user.refreshTokens = [];
    }

    // Store refresh token in database
    user.refreshTokens.push({
      token: refreshToken,
      createdAt: new Date(),
      expiresAt: refreshTokenExpiry,
      lastUsed: new Date()
    });

    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role || 'user',
      },
      accessToken,
      refreshToken,
      token: accessToken, // Backward compatibility
    });
  } catch (error: any) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}