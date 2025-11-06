import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * Interface for House/Property Planning Document
 */
export interface IHouse extends Document {
  userId: string;
  currentAge: number;
  targetAge: number;
  propertyValue: number;
  downPaymentPercentage: number;
  currentSavings: number;
  monthlyIncome: number;
  wantLoan: boolean;
  loanTenure: number;
  interestRate: number;
  expectedAppreciation: number;
  inflationRate: number;
  returnRate: number;
  registrationCharges: number;
  stampDuty: number;
  otherCosts: number;
  goalPossibility: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * MongoDB Schema for House/Property Planning
 */
const HouseSchema: Schema = new Schema(
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
      default: 35,
      min: [18, 'Target age must be at least 18'],
      max: [100, 'Target age must be less than 100'],
    },
    propertyValue: {
      type: Number,
      default: 5000000,
      min: [0, 'Property value cannot be negative'],
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
      default: 20,
      min: [1, 'Loan tenure must be at least 1 year'],
      max: [30, 'Loan tenure cannot exceed 30 years'],
    },
    interestRate: {
      type: Number,
      default: 8.5,
      min: [0, 'Interest rate cannot be negative'],
      max: [20, 'Interest rate seems too high'],
    },
    expectedAppreciation: {
      type: Number,
      default: 8,
      min: [0, 'Appreciation rate cannot be negative'],
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
    registrationCharges: {
      type: Number,
      default: 1,
      min: [0, 'Registration charges cannot be negative'],
    },
    stampDuty: {
      type: Number,
      default: 5,
      min: [0, 'Stamp duty cannot be negative'],
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

// Create unique index on userId to ensure one house plan per user
HouseSchema.index({ userId: 1 }, { unique: true });

// Pre-save validation to ensure targetAge > currentAge
HouseSchema.pre('save', function (this: IHouse, next) {
  if (this.targetAge <= this.currentAge) {
    next(new Error('Target age must be greater than current age'));
  } else {
    next();
  }
});

const House: Model<IHouse> = mongoose.models.House || mongoose.model<IHouse>('House', HouseSchema);

export default House;
