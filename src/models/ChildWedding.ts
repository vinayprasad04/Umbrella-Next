import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IChildWedding extends Document {
  userId: string;
  currentAge: number;
  childCurrentAge: number;
  targetAge: number;
  weddingBudget: number;
  currentSavings: number;
  monthlyIncome: number;
  wantLoan: boolean;
  loanTenure: number;
  interestRate: number;
  inflationRate: number;
  returnRate: number;
  venueCost: number;
  jewelleryCost: number;
  otherCosts: number;
  goalPossibility: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ChildWeddingSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    currentAge: { type: Number, default: 35, min: 18, max: 100 },
    childCurrentAge: { type: Number, default: 10, min: 0, max: 30 },
    targetAge: { type: Number, default: 25, min: 18, max: 40 },
    weddingBudget: { type: Number, default: 2000000, min: 0 },
    currentSavings: { type: Number, default: 0, min: 0 },
    monthlyIncome: { type: Number, default: 0, min: 0 },
    wantLoan: { type: Boolean, default: false },
    loanTenure: { type: Number, default: 3, min: 1, max: 7 },
    interestRate: { type: Number, default: 12, min: 0, max: 20 },
    inflationRate: { type: Number, default: 7, min: 0 },
    returnRate: { type: Number, default: 12, min: 0 },
    venueCost: { type: Number, default: 30, min: 0 },
    jewelleryCost: { type: Number, default: 25, min: 0 },
    otherCosts: { type: Number, default: 10, min: 0 },
    goalPossibility: { type: String, default: '' },
  },
  { timestamps: true }
);

ChildWeddingSchema.index({ userId: 1 }, { unique: true });

const ChildWedding: Model<IChildWedding> = mongoose.models.ChildWedding || mongoose.model<IChildWedding>('ChildWedding', ChildWeddingSchema);

export default ChildWedding;
