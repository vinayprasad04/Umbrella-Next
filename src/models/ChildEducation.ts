import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IChildEducation extends Document {
  userId: string;
  currentAge: number;
  childCurrentAge: number;
  targetAge: number;
  educationCost: number;
  currentSavings: number;
  monthlyIncome: number;
  wantLoan: boolean;
  loanTenure: number;
  interestRate: number;
  inflationRate: number;
  returnRate: number;
  accommodationCost: number;
  miscCost: number;
  otherCosts: number;
  goalPossibility: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ChildEducationSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    currentAge: { type: Number, default: 30, min: 18, max: 100 },
    childCurrentAge: { type: Number, default: 5, min: 0, max: 25 },
    targetAge: { type: Number, default: 18, min: 0, max: 30 },
    educationCost: { type: Number, default: 2000000, min: 0 },
    currentSavings: { type: Number, default: 0, min: 0 },
    monthlyIncome: { type: Number, default: 0, min: 0 },
    wantLoan: { type: Boolean, default: false },
    loanTenure: { type: Number, default: 5, min: 1, max: 15 },
    interestRate: { type: Number, default: 10, min: 0, max: 20 },
    inflationRate: { type: Number, default: 8, min: 0 },
    returnRate: { type: Number, default: 12, min: 0 },
    accommodationCost: { type: Number, default: 10, min: 0 },
    miscCost: { type: Number, default: 5, min: 0 },
    otherCosts: { type: Number, default: 2, min: 0 },
    goalPossibility: { type: String, default: '' },
  },
  { timestamps: true }
);

ChildEducationSchema.index({ userId: 1 }, { unique: true });

const ChildEducation: Model<IChildEducation> = mongoose.models.ChildEducation || mongoose.model<IChildEducation>('ChildEducation', ChildEducationSchema);

export default ChildEducation;
