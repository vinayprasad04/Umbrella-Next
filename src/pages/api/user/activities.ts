import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import UserActivity from '@/models/UserActivity';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    // GET - Fetch user activities
    if (req.method === 'GET') {
      const { userId, userEmail, limit = '20' } = req.query;

      if (!userId && !userEmail) {
        return res.status(400).json({
          success: false,
          message: 'Either userId or userEmail is required',
        });
      }

      const query: any = {};
      if (userId) query.userId = userId;
      if (userEmail) query.userEmail = userEmail;

      const activities = await UserActivity.find(query)
        .sort({ createdAt: -1 })
        .limit(parseInt(limit as string))
        .lean();

      return res.status(200).json({
        success: true,
        data: activities,
      });
    }

    // POST - Log a new activity
    if (req.method === 'POST') {
      const {
        userId,
        userEmail,
        activityType,
        description,
        metadata,
      } = req.body;

      // Validation
      if (!userId || !userEmail) {
        return res.status(400).json({
          success: false,
          message: 'userId and userEmail are required',
        });
      }

      if (!activityType || !description) {
        return res.status(400).json({
          success: false,
          message: 'activityType and description are required',
        });
      }

      // Create new activity
      const activity = await UserActivity.create({
        userId,
        userEmail,
        activityType,
        description,
        metadata: metadata || {},
      });

      return res.status(201).json({
        success: true,
        message: 'Activity logged successfully',
        data: activity,
      });
    }

    // Method not allowed
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  } catch (error: any) {
    console.error('User activity API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
}
