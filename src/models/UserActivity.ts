import mongoose, { Document, Schema } from 'mongoose';

export interface IUserActivity extends Document {
  userId: string;
  userEmail: string;
  activityType: 'login' | 'logout' | 'profile_update' | 'calculator_usage' | 'goal_creation' | 'dashboard_access' | 'signup' | 'password_reset' | 'other';
  description: string;
  metadata?: {
    calculatorType?: string;
    goalType?: string;
    fieldsUpdated?: string[];
    ipAddress?: string;
    userAgent?: string;
    [key: string]: any;
  };
  createdAt: Date;
}

const UserActivitySchema: Schema = new Schema({
  userId: {
    type: String,
    required: [true, 'User ID is required'],
    index: true,
  },
  userEmail: {
    type: String,
    required: [true, 'User email is required'],
    lowercase: true,
    trim: true,
    index: true,
  },
  activityType: {
    type: String,
    enum: ['login', 'logout', 'profile_update', 'calculator_usage', 'goal_creation', 'dashboard_access', 'signup', 'password_reset', 'other'],
    required: [true, 'Activity type is required'],
    index: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  metadata: {
    type: Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true,
});

// Index for efficient querying by userId and date
UserActivitySchema.index({ userId: 1, createdAt: -1 });
UserActivitySchema.index({ userEmail: 1, createdAt: -1 });

// TTL index to automatically delete records after 60 days (5,184,000 seconds)
// MongoDB will automatically remove documents where createdAt is older than 60 days
UserActivitySchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 24 * 60 * 60 });

export default mongoose.models.UserActivity || mongoose.model<IUserActivity>('UserActivity', UserActivitySchema, 'useractivities');
