import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Car from '@/models/Car';

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
        const carData = await Car.findOne({ userId });
        if (!carData) {
          return res.status(404).json({ message: 'No car planning data found', data: null });
        }
        return res.status(200).json({ data: carData });
      } catch (error: any) {
        console.error('Error fetching car data:', error);
        return res.status(500).json({ error: 'Failed to fetch car planning data', details: error.message });
      }

    case 'POST':
      try {
        const carData = req.body;
        if (!carData.userId) {
          return res.status(400).json({ error: 'User ID is required' });
        }
        const updatedCar = await Car.findOneAndUpdate(
          { userId: carData.userId },
          {
            $set: {
              currentAge: carData.currentAge,
              targetAge: carData.targetAge,
              carValue: carData.carValue,
              downPaymentPercentage: carData.downPaymentPercentage,
              currentSavings: carData.currentSavings,
              monthlyIncome: carData.monthlyIncome,
              wantLoan: carData.wantLoan,
              loanTenure: carData.loanTenure,
              interestRate: carData.interestRate,
              expectedDepreciation: carData.expectedDepreciation,
              inflationRate: carData.inflationRate,
              returnRate: carData.returnRate,
              insuranceCost: carData.insuranceCost,
              registrationCost: carData.registrationCost,
              otherCosts: carData.otherCosts,
              goalPossibility: carData.goalPossibility,
            },
          },
          { new: true, upsert: true, runValidators: true }
        );
        return res.status(200).json({
          message: 'Car planning data saved successfully',
          data: updatedCar,
        });
      } catch (error: any) {
        console.error('Error saving car data:', error);
        return res.status(500).json({ error: 'Failed to save car planning data', details: error.message });
      }

    case 'DELETE':
      try {
        const { userId } = query;
        if (!userId) {
          return res.status(400).json({ error: 'User ID is required' });
        }
        const deletedCar = await Car.findOneAndDelete({ userId });
        if (!deletedCar) {
          return res.status(404).json({ error: 'No car planning data found to delete' });
        }
        return res.status(200).json({ message: 'Car planning data deleted successfully' });
      } catch (error: any) {
        console.error('Error deleting car data:', error);
        return res.status(500).json({ error: 'Failed to delete car planning data', details: error.message });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}
