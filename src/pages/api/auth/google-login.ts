import type { NextApiRequest, NextApiResponse } from 'next';
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

    const { idToken, email, name, uid } = req.body;

    if (!email || !uid) {
      return res.status(400).json({ error: 'Email and UID are required' });
    }

    // Check if user exists in database
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if doesn't exist
      user = new User({
        name: name || 'Google User',
        email,
        password: '', // No password for Google users
        role: 'user',
        isVerified: true, // Google accounts are pre-verified
        provider: 'google',
        providerId: uid,
      });

      await user.save();
    } else {
      // Update existing user's provider info if they signed up with email first
      if (!user.provider || user.provider === 'email') {
        user.provider = 'google';
        user.providerId = uid;
        user.isVerified = true; // Mark as verified if logging in with Google
        await user.save();
      }
    }

    res.status(200).json({
      message: 'Google login successful',
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role || 'user',
      },
    });
  } catch (error: any) {
    console.error('Google login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
