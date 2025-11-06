import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import SelfEducation from '@/models/SelfEducation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { userId } = query;
        if (!userId) return res.status(400).json({ error: 'User ID is required' });
        const data = await SelfEducation.findOne({ userId });
        if (!data) return res.status(404).json({ message: 'No data found', data: null });
        return res.status(200).json({ data });
      } catch (error: any) {
        return res.status(500).json({ error: 'Failed to fetch data', details: error.message });
      }

    case 'POST':
      try {
        const data = req.body;
        if (!data.userId) return res.status(400).json({ error: 'User ID is required' });
        const updated = await SelfEducation.findOneAndUpdate(
          { userId: data.userId },
          { $set: data },
          { new: true, upsert: true, runValidators: true }
        );
        return res.status(200).json({ message: 'Data saved successfully', data: updated });
      } catch (error: any) {
        return res.status(500).json({ error: 'Failed to save data', details: error.message });
      }

    case 'DELETE':
      try {
        const { userId } = query;
        if (!userId) return res.status(400).json({ error: 'User ID is required' });
        await SelfEducation.findOneAndDelete({ userId });
        return res.status(200).json({ message: 'Data deleted successfully' });
      } catch (error: any) {
        return res.status(500).json({ error: 'Failed to delete data', details: error.message });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}
