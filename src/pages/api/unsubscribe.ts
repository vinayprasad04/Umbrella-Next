import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const subscriber = await Subscriber.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({ error: 'Subscriber not found' });
    }

    if (subscriber.status === 'unsubscribed') {
      return res.status(400).json({ error: 'Email already unsubscribed' });
    }

    subscriber.status = 'unsubscribed';
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    res.status(200).json({ 
      message: 'Successfully unsubscribed!', 
      subscriber 
    });
  } catch (error: any) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}