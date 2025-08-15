import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();

    const user = await User.findOne({ email: 'vinay.qss@gmail.com' });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      hasRole: !!user.role,
      roleValue: user.role || 'undefined'
    });
  } catch (error: any) {
    console.error('Check user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}