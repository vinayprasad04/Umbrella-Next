import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import House from '@/models/House';

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

        const houseData = await House.findOne({ userId });

        if (!houseData) {
          return res.status(404).json({ message: 'No house planning data found', data: null });
        }

        return res.status(200).json({ data: houseData });
      } catch (error: any) {
        console.error('Error fetching house data:', error);
        return res.status(500).json({ error: 'Failed to fetch house planning data', details: error.message });
      }

    case 'POST':
      try {
        const houseData = req.body;

        if (!houseData.userId) {
          return res.status(400).json({ error: 'User ID is required' });
        }

        const updatedHouse = await House.findOneAndUpdate(
          { userId: houseData.userId },
          {
            $set: {
              currentAge: houseData.currentAge,
              targetAge: houseData.targetAge,
              propertyValue: houseData.propertyValue,
              downPaymentPercentage: houseData.downPaymentPercentage,
              currentSavings: houseData.currentSavings,
              monthlyIncome: houseData.monthlyIncome,
              wantLoan: houseData.wantLoan,
              loanTenure: houseData.loanTenure,
              interestRate: houseData.interestRate,
              expectedAppreciation: houseData.expectedAppreciation,
              inflationRate: houseData.inflationRate,
              returnRate: houseData.returnRate,
              registrationCharges: houseData.registrationCharges,
              stampDuty: houseData.stampDuty,
              otherCosts: houseData.otherCosts,
              goalPossibility: houseData.goalPossibility,
            },
          },
          { new: true, upsert: true, runValidators: true }
        );

        return res.status(200).json({
          message: 'House planning data saved successfully',
          data: updatedHouse,
        });
      } catch (error: any) {
        console.error('Error saving house data:', error);
        return res.status(500).json({ error: 'Failed to save house planning data', details: error.message });
      }

    case 'DELETE':
      try {
        const { userId } = query;

        if (!userId) {
          return res.status(400).json({ error: 'User ID is required' });
        }

        const deletedHouse = await House.findOneAndDelete({ userId });

        if (!deletedHouse) {
          return res.status(404).json({ error: 'No house planning data found to delete' });
        }

        return res.status(200).json({ message: 'House planning data deleted successfully' });
      } catch (error: any) {
        console.error('Error deleting house data:', error);
        return res.status(500).json({ error: 'Failed to delete house planning data', details: error.message });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}
