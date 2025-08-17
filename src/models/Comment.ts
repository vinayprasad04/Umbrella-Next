import mongoose from 'mongoose';

export interface IComment {
  _id?: string;
  blog: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  parentComment?: mongoose.Types.ObjectId;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  ipAddress?: string;
  userAgent?: string;
  isEdited: boolean;
  editedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const CommentSchema = new mongoose.Schema<IComment>({
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null,
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved', // Auto-approve for registered users
  },
  ipAddress: {
    type: String,
    default: '',
  },
  userAgent: {
    type: String,
    default: '',
  },
  isEdited: {
    type: Boolean,
    default: false,
  },
  editedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Create indexes for better performance
CommentSchema.index({ blog: 1, status: 1, createdAt: -1 });
CommentSchema.index({ user: 1 });
CommentSchema.index({ parentComment: 1 });

export default mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);