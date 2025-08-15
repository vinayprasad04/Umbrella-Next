import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';

type Data = {
  message: string;
  accessToken?: string;
  refreshToken?: string;
} | {
  error: string;
};

const ACCESS_TOKEN_EXPIRY = '15m'; // Short-lived access token
const REFRESH_TOKEN_EXPIRY_HOURS = 4; // 4 hours for refresh token

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token is required' });
    }

    // Find user with this refresh token
    const user = await User.findOne({
      'refreshTokens.token': refreshToken
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    // Find the specific refresh token
    const tokenData = user.refreshTokens.find((rt: any) => rt.token === refreshToken);
    
    if (!tokenData) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    // Check if refresh token is expired
    if (new Date() > tokenData.expiresAt) {
      // Remove expired token
      user.refreshTokens = user.refreshTokens.filter((rt: any) => rt.token !== refreshToken);
      await user.save();
      return res.status(401).json({ error: 'Refresh token expired' });
    }

    // Update last used time (activity tracking)
    tokenData.lastUsed = new Date();
    
    // Extend expiry if there's recent activity (within last hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    if (tokenData.lastUsed > oneHourAgo) {
      tokenData.expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);
    }

    await user.save();

    // Generate new access token
    const newAccessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );

    // Generate new refresh token (optional: rotate refresh tokens)
    const newRefreshToken = crypto.randomBytes(64).toString('hex');
    const refreshTokenExpiry = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);

    // Remove old refresh token and add new one (token rotation)
    user.refreshTokens = user.refreshTokens.filter((rt: any) => rt.token !== refreshToken);
    user.refreshTokens.push({
      token: newRefreshToken,
      createdAt: new Date(),
      expiresAt: refreshTokenExpiry,
      lastUsed: new Date()
    });

    // Clean up old/expired refresh tokens
    user.refreshTokens = user.refreshTokens.filter((rt: any) => new Date() <= rt.expiresAt);

    await user.save();

    res.status(200).json({
      message: 'Tokens refreshed successfully',
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error: any) {
    console.error('Refresh token error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}