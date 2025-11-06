import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRetirement extends Document {
  userId: string;
  monthlyIncome: number;
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyExpenses: number;
  inflationRate: number;
  returnRate: number;
  postRetirementReturn: number;
  equityAllocation: number;
  debtAllocation: number;
  goldAllocation: number;
  pension: number;
  rentalIncome: number;
  otherIncome: number;
  goalPossibility: string;
  createdAt: Date;
  updatedAt: Date;
}

const RetirementSchema: Schema = new Schema({
  userId: {
    type: String,
    required: [true, 'User ID is required'],
    index: true,
  },
  monthlyIncome: {
    type: Number,
    default: 0,
  },
  currentAge: {
    type: Number,
    default: 30,
  },
  retirementAge: {
    type: Number,
    default: 60,
  },
  currentSavings: {
    type: Number,
    default: 0,
  },
  monthlyExpenses: {
    type: Number,
    default: 0,
  },
  inflationRate: {
    type: Number,
    default: 6,
  },
  returnRate: {
    type: Number,
    default: 12,
  },
  postRetirementReturn: {
    type: Number,
    default: 8,
  },
  equityAllocation: {
    type: Number,
    default: 60,
  },
  debtAllocation: {
    type: Number,
    default: 30,
  },
  goldAllocation: {
    type: Number,
    default: 10,
  },
  pension: {
    type: Number,
    default: 0,
  },
  rentalIncome: {
    type: Number,
    default: 0,
  },
  otherIncome: {
    type: Number,
    default: 0,
  },
  goalPossibility: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Ensure only one retirement plan per user
RetirementSchema.index({ userId: 1 }, { unique: true });

const Retirement: Model<IRetirement> = mongoose.models.Retirement || mongoose.model<IRetirement>('Retirement', RetirementSchema);

export default Retirement;
