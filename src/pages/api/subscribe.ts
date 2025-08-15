import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { email, name, page } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if subscriber already exists
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      if (existingSubscriber.status === 'unsubscribed') {
        // Resubscribe if previously unsubscribed
        existingSubscriber.status = 'active';
        existingSubscriber.subscribedAt = new Date();
        existingSubscriber.unsubscribedAt = undefined;
        await existingSubscriber.save();
        
        return res.status(200).json({ 
          message: 'Successfully resubscribed!', 
          subscriber: existingSubscriber 
        });
      } else {
        return res.status(400).json({ error: 'Email already subscribed' });
      }
    }

    // Create new subscriber
    const subscriber = new Subscriber({
      email,
      name,
      source: 'website',
      metadata: {
        page,
        userAgent: req.headers['user-agent'],
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        referrer: req.headers.referer,
      },
    });

    await subscriber.save();

    res.status(201).json({ 
      message: 'Successfully subscribed!', 
      subscriber 
    });
  } catch (error: any) {
    console.error('Subscribe error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
}