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

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate access token (short-lived)
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );

    // Generate refresh token (long-lived)
    const refreshToken = crypto.randomBytes(64).toString('hex');
    const refreshTokenExpiry = new Date(Date.now() + 4 * 60 * 60 * 1000); // 4 hours

    // Initialize refreshTokens array if it doesn't exist (for existing users)
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

    // Clean up old/expired refresh tokens
    user.refreshTokens = user.refreshTokens.filter((rt: any) => new Date() <= rt.expiresAt);

    await user.save();

    res.status(200).json({
      message: 'Login successful',
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
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}