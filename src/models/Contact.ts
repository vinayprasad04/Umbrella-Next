import mongoose, { Document, Schema, Model } from 'mongoose';

// Contact interface
export interface IContact extends Document {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'general' | 'support' | 'billing' | 'partnership' | 'feedback' | 'bug_report' | 'feature_request';
  assignedTo?: string; // Admin user ID
  assignedToName?: string; // Admin user name
  response?: string; // Admin response
  responseDate?: Date;
  tags: string[];
  ipAddress?: string;
  userAgent?: string;
  source: 'website' | 'mobile_app' | 'email' | 'phone' | 'social_media';
  isRead: boolean;
  isStarred: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Methods
  markAsRead(): Promise<IContact>;
  assignTo(adminId: string, adminName: string): Promise<IContact>;
  addResponse(response: string): Promise<IContact>;
}

// Contact model interface with static methods
interface ContactModel extends Model<IContact> {
  getStatistics(): any;
  getCategoryBreakdown(): any;
}

// Contact schema
const ContactSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [5000, 'Message cannot exceed 5000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'in_progress', 'resolved', 'closed'],
    default: 'new',
    index: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
    index: true
  },
  category: {
    type: String,
    enum: ['general', 'support', 'billing', 'partnership', 'feedback', 'bug_report', 'feature_request'],
    default: 'general',
    index: true
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  assignedToName: {
    type: String,
    trim: true
  },
  response: {
    type: String,
    trim: true,
    maxlength: [5000, 'Response cannot exceed 5000 characters']
  },
  responseDate: {
    type: Date
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Tag cannot exceed 50 characters']
  }],
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  },
  source: {
    type: String,
    enum: ['website', 'mobile_app', 'email', 'phone', 'social_media'],
    default: 'website',
    index: true
  },
  isRead: {
    type: Boolean,
    default: false,
    index: true
  },
  isStarred: {
    type: Boolean,
    default: false,
    index: true
  }
}, {
  timestamps: true,
  collection: 'contacts'
});

// Indexes for better performance
ContactSchema.index({ email: 1, createdAt: -1 });
ContactSchema.index({ status: 1, priority: -1, createdAt: -1 });
ContactSchema.index({ category: 1, createdAt: -1 });
ContactSchema.index({ assignedTo: 1, status: 1 });
ContactSchema.index({ isRead: 1, createdAt: -1 });
ContactSchema.index({ tags: 1 });

// Virtual for contact age
ContactSchema.virtual('age').get(function(this: IContact) {
  return Math.floor((Date.now() - this.createdAt.getTime()) / (1000 * 60 * 60 * 24));
});

// Virtual for formatted creation date
ContactSchema.virtual('formattedDate').get(function(this: IContact) {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Method to mark as read
ContactSchema.methods.markAsRead = function() {
  this.isRead = true;
  return this.save();
};

// Method to assign to admin
ContactSchema.methods.assignTo = function(adminId: string, adminName: string) {
  this.assignedTo = adminId;
  this.assignedToName = adminName;
  if (this.status === 'new') {
    this.status = 'in_progress';
  }
  return this.save();
};

// Method to add response
ContactSchema.methods.addResponse = function(response: string) {
  this.response = response;
  this.responseDate = new Date();
  this.status = 'resolved';
  this.isRead = true;
  return this.save();
};

// Static method to get statistics
ContactSchema.statics.getStatistics = function() {
  return this.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        new: { $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] } },
        inProgress: { $sum: { $cond: [{ $eq: ['$status', 'in_progress'] }, 1, 0] } },
        resolved: { $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] } },
        closed: { $sum: { $cond: [{ $eq: ['$status', 'closed'] }, 1, 0] } },
        unread: { $sum: { $cond: [{ $eq: ['$isRead', false] }, 1, 0] } },
        starred: { $sum: { $cond: [{ $eq: ['$isStarred', true] }, 1, 0] } },
        urgent: { $sum: { $cond: [{ $eq: ['$priority', 'urgent'] }, 1, 0] } },
        high: { $sum: { $cond: [{ $eq: ['$priority', 'high'] }, 1, 0] } }
      }
    }
  ]);
};

// Static method to get category breakdown
ContactSchema.statics.getCategoryBreakdown = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
        newCount: { $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] } },
        avgResponseTime: {
          $avg: {
            $cond: [
              { $and: [{ $ne: ['$responseDate', null] }, { $ne: ['$createdAt', null] }] },
              { $subtract: ['$responseDate', '$createdAt'] },
              null
            ]
          }
        }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);
};

// Pre-save middleware
ContactSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'resolved' && !this.responseDate) {
    this.responseDate = new Date();
  }
  next();
});

// Ensure virtual fields are serialized
ContactSchema.set('toJSON', { virtuals: true });
ContactSchema.set('toObject', { virtuals: true });

// Create and export the model
const Contact = mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

export default Contact as unknown as ContactModel;