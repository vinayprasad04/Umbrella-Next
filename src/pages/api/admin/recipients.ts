import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function verifyAdmin(req: NextApiRequest): Promise<boolean> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    const user = await User.findById(decoded.userId);
    return user && user.role === 'admin';
  } catch (error) {
    return false;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const isAdmin = await verifyAdmin(req);
    if (!isAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { search, type } = req.query;

    const recipients: any[] = [];

    // Fetch all types if no specific type is requested
    const fetchUsers = !type || type === 'users';
    const fetchSubscribers = !type || type === 'subscribers';

    if (fetchUsers) {
      const userFilter: any = {};
      if (search) {
        userFilter.$or = [
          { email: { $regex: search, $options: 'i' } },
          { name: { $regex: search, $options: 'i' } }
        ];
      }

      const users = await User.find(userFilter, 'name email role isVerified createdAt')
        .sort({ name: 1 });

      const userRecipients = users.map(user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        type: 'user',
        status: user.isVerified ? 'verified' : 'pending',
        role: user.role,
        source: 'registered_user',
        createdAt: user.createdAt
      }));

      recipients.push(...userRecipients);
    }

    if (fetchSubscribers) {
      const subscriberFilter: any = { status: 'active' };
      if (search) {
        subscriberFilter.$or = [
          { email: { $regex: search, $options: 'i' } },
          { name: { $regex: search, $options: 'i' } }
        ];
      }

      const subscribers = await Subscriber.find(subscriberFilter)
        .sort({ email: 1 });

      const subscriberRecipients = subscribers.map(subscriber => ({
        id: subscriber._id,
        email: subscriber.email,
        name: subscriber.name || 'Subscriber',
        type: 'subscriber',
        status: subscriber.status,
        source: subscriber.source,
        createdAt: subscriber.createdAt
      }));

      recipients.push(...subscriberRecipients);
    }

    // Remove duplicates based on email (prioritize users over subscribers)
    const uniqueRecipients = recipients.reduce((acc: any[], current) => {
      const existing = acc.find((item: any) => item.email === current.email);
      if (!existing) {
        acc.push(current);
      } else if (current.type === 'user' && existing.type === 'subscriber') {
        // Replace subscriber with user if both exist
        const index = acc.findIndex((item: any) => item.email === current.email);
        acc[index] = current;
      }
      return acc;
    }, []);

    // Sort by name/email
    uniqueRecipients.sort((a, b) => {
      const nameA = a.name || a.email;
      const nameB = b.name || b.email;
      return nameA.localeCompare(nameB);
    });

    const summary = {
      total: uniqueRecipients.length,
      users: uniqueRecipients.filter(r => r.type === 'user').length,
      subscribers: uniqueRecipients.filter(r => r.type === 'subscriber').length,
      bySource: {
        registered_user: uniqueRecipients.filter(r => r.source === 'registered_user').length,
        website: uniqueRecipients.filter(r => r.source === 'website').length,
        manual: uniqueRecipients.filter(r => r.source === 'manual').length,
        import: uniqueRecipients.filter(r => r.source === 'import').length,
      }
    };

    res.status(200).json({
      recipients: uniqueRecipients,
      summary
    });
  } catch (error: any) {
    console.error('Recipients API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}