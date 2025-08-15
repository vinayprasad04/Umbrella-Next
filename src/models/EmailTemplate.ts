import mongoose, { Document, Schema } from 'mongoose';

export interface IEmailTemplate extends Document {
  name: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  variables: string[]; // Array of variable names like ['userName', 'companyName']
  category: string;
  isActive: boolean;
  createdBy: string; // Admin user ID
  createdAt: Date;
  updatedAt: Date;
}

const EmailTemplateSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Template name is required'],
    trim: true,
  },
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
  variables: [{
    type: String,
    trim: true,
  }],
  category: {
    type: String,
    enum: ['welcome', 'marketing', 'notification', 'announcement', 'other'],
    default: 'other',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.EmailTemplate || mongoose.model<IEmailTemplate>('EmailTemplate', EmailTemplateSchema);