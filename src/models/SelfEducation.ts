import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISelfEducation extends Document {
  userId: string;
  currentAge: number;
  targetAge: number;
  courseFee: number;
  currentSavings: number;
  monthlyIncome: number;
  wantLoan: boolean;
  loanTenure: number;
  interestRate: number;
  inflationRate: number;
  returnRate: number;
  studyMaterialCost: number;
  examFees: number;
  otherCosts: number;
  goalPossibility: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const SelfEducationSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    currentAge: { type: Number, default: 25, min: 18, max: 100 },
    targetAge: { type: Number, default: 26, min: 18, max: 100 },
    courseFee: { type: Number, default: 200000, min: 0 },
    currentSavings: { type: Number, default: 0, min: 0 },
    monthlyIncome: { type: Number, default: 0, min: 0 },
    wantLoan: { type: Boolean, default: false },
    loanTenure: { type: Number, default: 3, min: 1, max: 10 },
    interestRate: { type: Number, default: 10.5, min: 0, max: 20 },
    inflationRate: { type: Number, default: 6, min: 0 },
    returnRate: { type: Number, default: 12, min: 0 },
    studyMaterialCost: { type: Number, default: 5, min: 0 },
    examFees: { type: Number, default: 3, min: 0 },
    otherCosts: { type: Number, default: 2, min: 0 },
    goalPossibility: { type: String, default: '' },
  },
  { timestamps: true }
);

SelfEducationSchema.index({ userId: 1 }, { unique: true });

const SelfEducation: Model<ISelfEducation> = mongoose.models.SelfEducation || mongoose.model<ISelfEducation>('SelfEducation', SelfEducationSchema);

export default SelfEducation;
