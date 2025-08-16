import mongoose, { Document, Schema } from 'mongoose';

interface EmailRecipient {
  id: string;
  email: string;
  name: string;
  type: 'user' | 'subscriber' | 'manual';
  status: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'failed';
  sentAt?: Date;
  deliveredAt?: Date;
  openedAt?: Date;
  clickedAt?: Date;
  bouncedAt?: Date;
  errorMessage?: string;
}

export interface IEmailHistory extends Document {
  subject: string;
  htmlContent: string;
  textContent?: string;
  templateId?: string;
  templateName?: string;
  sentBy: string; // Admin user ID
  sentByName: string;
  sentByEmail: string;
  totalRecipients: number;
  successfulSends: number;
  failedSends: number;
  bouncedEmails: number;
  openedEmails: number;
  clickedEmails: number;
  recipients: EmailRecipient[];
  variables: Record<string, any>;
  status: 'draft' | 'sending' | 'sent' | 'failed' | 'partially_sent';
  sentAt: Date;
  scheduledAt?: Date;
  completedAt?: Date;
  errorMessage?: string;
  campaign?: {
    name: string;
    type: string;
  };
  analytics: {
    openRate: number;
    clickRate: number;
    bounceRate: number;
    deliveryRate: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const EmailRecipientSchema = new Schema({
  id: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['user', 'subscriber', 'manual'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed'], 
    default: 'sent' 
  },
  sentAt: { type: Date },
  deliveredAt: { type: Date },
  openedAt: { type: Date },
  clickedAt: { type: Date },
  bouncedAt: { type: Date },
  errorMessage: { type: String }
}, { _id: false });

const EmailHistorySchema: Schema = new Schema({
  subject: {
    type: String,
    required: [true, 'Email subject is required'],
    trim: true,
  },
  htmlContent: {
    type: String,
    required: [true, 'Email content is required'],
  },
  textContent: {
    type: String,
  },
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EmailTemplate',
  },
  templateName: {
    type: String,
  },
  sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sentByName: {
    type: String,
    required: true,
  },
  sentByEmail: {
    type: String,
    required: true,
  },
  totalRecipients: {
    type: Number,
    required: true,
    default: 0,
  },
  successfulSends: {
    type: Number,
    default: 0,
  },
  failedSends: {
    type: Number,
    default: 0,
  },
  bouncedEmails: {
    type: Number,
    default: 0,
  },
  openedEmails: {
    type: Number,
    default: 0,
  },
  clickedEmails: {
    type: Number,
    default: 0,
  },
  recipients: [EmailRecipientSchema],
  variables: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  status: {
    type: String,
    enum: ['draft', 'sending', 'sent', 'failed', 'partially_sent'],
    default: 'draft',
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
  scheduledAt: {
    type: Date,
  },
  completedAt: {
    type: Date,
  },
  errorMessage: {
    type: String,
  },
  campaign: {
    name: { type: String },
    type: { type: String },
  },
  analytics: {
    openRate: { type: Number, default: 0 },
    clickRate: { type: Number, default: 0 },
    bounceRate: { type: Number, default: 0 },
    deliveryRate: { type: Number, default: 0 },
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
EmailHistorySchema.index({ sentBy: 1, sentAt: -1 });
EmailHistorySchema.index({ status: 1, sentAt: -1 });
EmailHistorySchema.index({ templateId: 1 });
EmailHistorySchema.index({ 'recipients.email': 1 });

// Virtual for calculating rates
EmailHistorySchema.virtual('calculatedAnalytics').get(function() {
  const total = Number(this.totalRecipients) || 1;
  const opened = Number(this.openedEmails) || 0;
  const clicked = Number(this.clickedEmails) || 0;
  const bounced = Number(this.bouncedEmails) || 0;
  const failed = Number(this.failedSends) || 0;
  
  return {
    openRate: Math.round((opened / total) * 100 * 100) / 100,
    clickRate: Math.round((clicked / total) * 100 * 100) / 100,
    bounceRate: Math.round((bounced / total) * 100 * 100) / 100,
    deliveryRate: Math.round(((total - failed) / total) * 100 * 100) / 100,
  };
});

// Method to update analytics
EmailHistorySchema.methods.updateAnalytics = function() {
  const total = this.totalRecipients || 1;
  this.analytics = {
    openRate: Math.round((this.openedEmails / total) * 100 * 100) / 100,
    clickRate: Math.round((this.clickedEmails / total) * 100 * 100) / 100,
    bounceRate: Math.round((this.bouncedEmails / total) * 100 * 100) / 100,
    deliveryRate: Math.round(((total - this.failedSends) / total) * 100 * 100) / 100,
  };
  return this.save();
};

export default mongoose.models.EmailHistory || mongoose.model<IEmailHistory>('EmailHistory', EmailHistorySchema);