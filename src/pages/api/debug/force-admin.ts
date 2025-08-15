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

    // Use MongoDB's updateOne with $set to force the field
    const result = await User.collection.updateOne(
      { email: 'vinay.qss@gmail.com' },
      { $set: { role: 'admin' } }
    );

    // Verify the update
    const updatedUser = await User.findOne({ email: 'vinay.qss@gmail.com' });

    res.status(200).json({
      message: 'Force update completed',
      updateResult: result,
      user: {
        _id: updatedUser?._id,
        email: updatedUser?.email,
        name: updatedUser?.name,
        role: updatedUser?.role,
        hasRole: !!updatedUser?.role
      }
    });
  } catch (error: any) {
    console.error('Force admin error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}