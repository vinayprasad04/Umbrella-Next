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
  try {
    await dbConnect();

    const isAdmin = await verifyAdmin(req);
    if (!isAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    switch (req.method) {
      case 'GET':
        return await getSubscribers(req, res);
      case 'POST':
        return await createSubscriber(req, res);
      case 'PUT':
        return await updateSubscriber(req, res);
      case 'DELETE':
        return await deleteSubscriber(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Subscribers API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getSubscribers(req: NextApiRequest, res: NextApiResponse) {
  const { 
    page = 1, 
    limit = 50, 
    status, 
    source, 
    search 
  } = req.query;

  const filter: any = {};
  
  if (status) filter.status = status;
  if (source) filter.source = source;
  if (search) {
    filter.$or = [
      { email: { $regex: search, $options: 'i' } },
      { name: { $regex: search, $options: 'i' } }
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  
  const [subscribers, totalSubscribers] = await Promise.all([
    Subscriber.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Subscriber.countDocuments(filter)
  ]);

  res.status(200).json({
    subscribers,
    totalSubscribers,
    currentPage: Number(page),
    totalPages: Math.ceil(totalSubscribers / Number(limit))
  });
}

async function createSubscriber(req: NextApiRequest, res: NextApiResponse) {
  const { email, name, source = 'manual' } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Check if subscriber already exists
  const existingSubscriber = await Subscriber.findOne({ email });
  if (existingSubscriber) {
    return res.status(400).json({ error: 'Subscriber already exists' });
  }

  const subscriber = new Subscriber({
    email,
    name,
    source,
  });

  await subscriber.save();
  res.status(201).json({ subscriber });
}

async function updateSubscriber(req: NextApiRequest, res: NextApiResponse) {
  const { subscriberId, email, name, status, source } = req.body;

  if (!subscriberId) {
    return res.status(400).json({ error: 'Subscriber ID is required' });
  }

  const updateData: any = {};
  if (email) updateData.email = email;
  if (name !== undefined) updateData.name = name; // Allow empty string
  if (source) updateData.source = source;
  if (status) {
    updateData.status = status;
    if (status === 'unsubscribed') {
      updateData.unsubscribedAt = new Date();
    } else if (status === 'active') {
      updateData.unsubscribedAt = undefined;
      updateData.subscribedAt = new Date();
    }
  }

  const subscriber = await Subscriber.findByIdAndUpdate(
    subscriberId,
    updateData,
    { new: true }
  );

  if (!subscriber) {
    return res.status(404).json({ error: 'Subscriber not found' });
  }

  res.status(200).json({ subscriber });
}

async function deleteSubscriber(req: NextApiRequest, res: NextApiResponse) {
  const { subscriberId } = req.body;

  if (!subscriberId) {
    return res.status(400).json({ error: 'Subscriber ID is required' });
  }

  const subscriber = await Subscriber.findByIdAndDelete(subscriberId);

  if (!subscriber) {
    return res.status(404).json({ error: 'Subscriber not found' });
  }

  res.status(200).json({ message: 'Subscriber deleted successfully' });
}