import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVacation extends Document {
  userId: string;
  currentAge: number;
  targetAge: number;
  vacationBudget: number;
  currentSavings: number;
  monthlyIncome: number;
  wantLoan: boolean;
  loanTenure: number;
  interestRate: number;
  inflationRate: number;
  returnRate: number;
  flightCost: number;
  hotelCost: number;
  otherCosts: number;
  goalPossibility: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const VacationSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    currentAge: { type: Number, default: 30, min: 18, max: 100 },
    targetAge: { type: Number, default: 31, min: 18, max: 100 },
    vacationBudget: { type: Number, default: 300000, min: 0 },
    currentSavings: { type: Number, default: 0, min: 0 },
    monthlyIncome: { type: Number, default: 0, min: 0 },
    wantLoan: { type: Boolean, default: false },
    loanTenure: { type: Number, default: 2, min: 1, max: 5 },
    interestRate: { type: Number, default: 14, min: 0, max: 20 },
    inflationRate: { type: Number, default: 5, min: 0 },
    returnRate: { type: Number, default: 12, min: 0 },
    flightCost: { type: Number, default: 30, min: 0 },
    hotelCost: { type: Number, default: 25, min: 0 },
    otherCosts: { type: Number, default: 10, min: 0 },
    goalPossibility: { type: String, default: '' },
  },
  { timestamps: true }
);

VacationSchema.index({ userId: 1 }, { unique: true });

const Vacation: Model<IVacation> = mongoose.models.Vacation || mongoose.model<IVacation>('Vacation', VacationSchema);

export default Vacation;
