import mongoose, { Document, Schema } from 'mongoose';

export interface IWealthCreation extends Document {
  userId: string;
  // Smart Link Data (from user profile)
  monthlyIncome: number;
  monthlySavings: number;
  emis: number;

  // Loans
  totalLoanAmount: number;

  // Assets
  stocks: number;
  equityMF: number;
  debtMFBonds: number;
  fixedDeposits: number;
  gold: number;
  realEstate: number;
  cashBank: number;
  totalAssets: number;

  // Monthly Investments
  monthlyStocks: number;
  sipEquityMF: number;
  sipDebtMF: number;
  monthlyRDFD: number;
  monthlyGold: number;
  totalMonthlyInvestments: number;

  // Additional Fields
  goalAmount?: number;
  budget?: number; // Keep for backward compatibility
  targetYear?: number;
  goalPossibility?: string;
  investmentStrategy?: string;

  createdAt: Date;
  updatedAt: Date;
}

const WealthCreationSchema: Schema = new Schema({
  userId: {
    type: String,
    required: [true, 'User ID is required'],
    index: true,
  },
  // Smart Link Data
  monthlyIncome: {
    type: Number,
    default: 0,
  },
  monthlySavings: {
    type: Number,
    default: 0,
  },
  emis: {
    type: Number,
    default: 0,
  },
  // Loans
  totalLoanAmount: {
    type: Number,
    default: 0,
  },
  // Assets
  stocks: {
    type: Number,
    default: 0,
  },
  equityMF: {
    type: Number,
    default: 0,
  },
  debtMFBonds: {
    type: Number,
    default: 0,
  },
  fixedDeposits: {
    type: Number,
    default: 0,
  },
  gold: {
    type: Number,
    default: 0,
  },
  realEstate: {
    type: Number,
    default: 0,
  },
  cashBank: {
    type: Number,
    default: 0,
  },
  totalAssets: {
    type: Number,
    default: 0,
  },
  // Monthly Investments
  monthlyStocks: {
    type: Number,
    default: 0,
  },
  sipEquityMF: {
    type: Number,
    default: 0,
  },
  sipDebtMF: {
    type: Number,
    default: 0,
  },
  monthlyRDFD: {
    type: Number,
    default: 0,
  },
  monthlyGold: {
    type: Number,
    default: 0,
  },
  totalMonthlyInvestments: {
    type: Number,
    default: 0,
  },
  // Additional Fields
  goalAmount: {
    type: Number,
  },
  budget: {
    type: Number, // Keep for backward compatibility
  },
  targetYear: {
    type: Number,
  },
  goalPossibility: {
    type: String,
  },
  investmentStrategy: {
    type: String,
    enum: ['aggressive', 'moderate', 'conservative'],
    default: 'moderate',
  },
}, {
  timestamps: true,
});

export default mongoose.models.WealthCreation || mongoose.model<IWealthCreation>('WealthCreation', WealthCreationSchema);
