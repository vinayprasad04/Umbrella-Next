import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Retirement from '../../../models/Retirement';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { userId } = query;

        if (!userId) {
          return res.status(400).json({ error: 'User ID is required' });
        }

        const retirementData = await Retirement.findOne({ userId });

        if (!retirementData) {
          return res.status(404).json({ message: 'No retirement data found', data: null });
        }

        return res.status(200).json({ data: retirementData });
      } catch (error) {
        console.error('Error fetching retirement data:', error);
        return res.status(500).json({ error: 'Error fetching retirement data' });
      }

    case 'POST':
      try {
        const retirementData = req.body;

        if (!retirementData.userId) {
          return res.status(400).json({ error: 'User ID is required' });
        }

        // Update if exists, create if doesn't
        const updatedRetirement = await Retirement.findOneAndUpdate(
          { userId: retirementData.userId },
          {
            $set: {
              monthlyIncome: retirementData.monthlyIncome || 0,
              currentAge: retirementData.currentAge || 30,
              retirementAge: retirementData.retirementAge || 60,
              currentSavings: retirementData.currentSavings || 0,
              monthlyExpenses: retirementData.monthlyExpenses || 0,
              expectedLifespan: retirementData.expectedLifespan || 85,
              inflationRate: retirementData.inflationRate || 6,
              returnRate: retirementData.returnRate || 12,
              postRetirementReturn: retirementData.postRetirementReturn || 8,
              equityAllocation: retirementData.equityAllocation || 60,
              debtAllocation: retirementData.debtAllocation || 30,
              goldAllocation: retirementData.goldAllocation || 10,
              pension: retirementData.pension || 0,
              rentalIncome: retirementData.rentalIncome || 0,
              otherIncome: retirementData.otherIncome || 0,
              goalPossibility: retirementData.goalPossibility || '',
            }
          },
          {
            new: true,
            upsert: true,
            runValidators: true
          }
        );

        return res.status(200).json({
          message: 'Retirement plan saved successfully',
          data: updatedRetirement
        });
      } catch (error) {
        console.error('Error saving retirement data:', error);
        return res.status(500).json({ error: 'Error saving retirement data' });
      }

    case 'DELETE':
      try {
        const { userId } = query;

        if (!userId) {
          return res.status(400).json({ error: 'User ID is required' });
        }

        await Retirement.findOneAndDelete({ userId });

        return res.status(200).json({ message: 'Retirement plan deleted successfully' });
      } catch (error) {
        console.error('Error deleting retirement data:', error);
        return res.status(500).json({ error: 'Error deleting retirement data' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}
