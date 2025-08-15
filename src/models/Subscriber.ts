import mongoose, { Document, Schema } from 'mongoose';

export interface ISubscriber extends Document {
  email: string;
  name?: string;
  source: 'website' | 'manual' | 'import';
  status: 'active' | 'unsubscribed' | 'bounced';
  subscribedAt: Date;
  unsubscribedAt?: Date;
  metadata?: {
    page?: string;
    userAgent?: string;
    ip?: string;
    referrer?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SubscriberSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  name: {
    type: String,
    trim: true,
  },
  source: {
    type: String,
    enum: ['website', 'manual', 'import'],
    default: 'website',
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed', 'bounced'],
    default: 'active',
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  unsubscribedAt: {
    type: Date,
  },
  metadata: {
    page: String,
    userAgent: String,
    ip: String,
    referrer: String,
  },
}, {
  timestamps: true,
});

SubscriberSchema.index({ email: 1 });
SubscriberSchema.index({ status: 1 });
SubscriberSchema.index({ source: 1 });

export default mongoose.models.Subscriber || mongoose.model<ISubscriber>('Subscriber', SubscriberSchema, 'subscriber');