import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICar extends Document {
  userId: string;
  currentAge: number;
  targetAge: number;
  carValue: number;
  downPaymentPercentage: number;
  currentSavings: number;
  monthlyIncome: number;
  wantLoan: boolean;
  loanTenure: number;
  interestRate: number;
  expectedDepreciation: number;
  inflationRate: number;
  returnRate: number;
  insuranceCost: number;
  registrationCost: number;
  otherCosts: number;
  goalPossibility: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const CarSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      index: true,
    },
    currentAge: {
      type: Number,
      default: 30,
      min: [18, 'Age must be at least 18'],
      max: [100, 'Age must be less than 100'],
    },
    targetAge: {
      type: Number,
      default: 32,
      min: [18, 'Target age must be at least 18'],
      max: [100, 'Target age must be less than 100'],
    },
    carValue: {
      type: Number,
      default: 1000000,
      min: [0, 'Car value cannot be negative'],
    },
    downPaymentPercentage: {
      type: Number,
      default: 20,
      min: [0, 'Down payment percentage cannot be negative'],
      max: [100, 'Down payment percentage cannot exceed 100'],
    },
    currentSavings: {
      type: Number,
      default: 0,
      min: [0, 'Current savings cannot be negative'],
    },
    monthlyIncome: {
      type: Number,
      default: 0,
      min: [0, 'Monthly income cannot be negative'],
    },
    wantLoan: {
      type: Boolean,
      default: false,
    },
    loanTenure: {
      type: Number,
      default: 5,
      min: [1, 'Loan tenure must be at least 1 year'],
      max: [7, 'Car loan tenure cannot exceed 7 years'],
    },
    interestRate: {
      type: Number,
      default: 9.5,
      min: [0, 'Interest rate cannot be negative'],
      max: [20, 'Interest rate seems too high'],
    },
    expectedDepreciation: {
      type: Number,
      default: 15,
      min: [0, 'Depreciation rate cannot be negative'],
    },
    inflationRate: {
      type: Number,
      default: 6,
      min: [0, 'Inflation rate cannot be negative'],
    },
    returnRate: {
      type: Number,
      default: 12,
      min: [0, 'Return rate cannot be negative'],
    },
    insuranceCost: {
      type: Number,
      default: 2,
      min: [0, 'Insurance cost cannot be negative'],
    },
    registrationCost: {
      type: Number,
      default: 8,
      min: [0, 'Registration cost cannot be negative'],
    },
    otherCosts: {
      type: Number,
      default: 2,
      min: [0, 'Other costs cannot be negative'],
    },
    goalPossibility: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

CarSchema.index({ userId: 1 }, { unique: true });

CarSchema.pre('save', function (this: ICar, next) {
  if (this.targetAge <= this.currentAge) {
    next(new Error('Target age must be greater than current age'));
  } else {
    next();
  }
});

const Car: Model<ICar> = mongoose.models.Car || mongoose.model<ICar>('Car', CarSchema);

export default Car;
