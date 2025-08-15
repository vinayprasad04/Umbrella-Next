import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // First, let's check the current state
    const userBefore = await User.findOne({ email: 'vinay.qss@gmail.com' });
    
    // Update using findByIdAndUpdate to ensure it works
    const updatedUser = await User.findByIdAndUpdate(
      userBefore._id,
      { role: 'admin' },
      { new: true }
    );

    res.status(200).json({
      message: 'Admin role fixed',
      before: {
        role: userBefore?.role || 'undefined',
        hasRole: !!userBefore?.role
      },
      after: {
        role: updatedUser?.role,
        hasRole: !!updatedUser?.role,
        _id: updatedUser?._id
      }
    });
  } catch (error: any) {
    console.error('Fix admin error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}