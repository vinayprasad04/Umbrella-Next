import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import WealthCreation from '../../../models/WealthCreation';

type Data = {
  message?: string;
  data?: any;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { userId } = req.query;

        if (!userId) {
          return res.status(400).json({ error: 'User ID is required' });
        }

        const wealthData = await WealthCreation.findOne({ userId });

        if (!wealthData) {
          return res.status(200).json({
            message: 'No wealth creation data found',
            data: null
          });
        }

        res.status(200).json({ data: wealthData });
      } catch (error: any) {
        console.error('Error fetching wealth creation data:', error);
        res.status(500).json({ error: 'Failed to fetch wealth creation data' });
      }
      break;

    case 'POST':
      try {
        const { userId, ...wealthData } = req.body;

        if (!userId) {
          return res.status(400).json({ error: 'User ID is required' });
        }

        // Check if data already exists for this user
        let existingData = await WealthCreation.findOne({ userId });

        if (existingData) {
          // Update existing data
          existingData = await WealthCreation.findOneAndUpdate(
            { userId },
            { $set: wealthData },
            { new: true, runValidators: true }
          );

          res.status(200).json({
            message: 'Wealth creation data updated successfully',
            data: existingData
          });
        } else {
          // Create new data
          const newWealthData = new WealthCreation({
            userId,
            ...wealthData
          });

          await newWealthData.save();

          res.status(201).json({
            message: 'Wealth creation data saved successfully',
            data: newWealthData
          });
        }
      } catch (error: any) {
        console.error('Error saving wealth creation data:', error);
        res.status(500).json({ error: 'Failed to save wealth creation data' });
      }
      break;

    case 'DELETE':
      try {
        const { userId } = req.query;

        if (!userId) {
          return res.status(400).json({ error: 'User ID is required' });
        }

        await WealthCreation.findOneAndDelete({ userId });

        res.status(200).json({ message: 'Wealth creation data deleted successfully' });
      } catch (error: any) {
        console.error('Error deleting wealth creation data:', error);
        res.status(500).json({ error: 'Failed to delete wealth creation data' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).json({ error: `Method ${method} not allowed` });
  }
}
