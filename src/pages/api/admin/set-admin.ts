import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';

type Data = {
  message: string;
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

    // Set vinay.qss@gmail.com as admin
    const result = await User.updateOne(
      { email: 'vinay.qss@gmail.com' },
      { $set: { role: 'admin' } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Admin role set successfully for vinay.qss@gmail.com' });
  } catch (error: any) {
    console.error('Set admin error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}