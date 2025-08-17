import mongoose from 'mongoose';

export interface IBlog {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  status: 'draft' | 'live';
  commentsEnabled: boolean;
  metaDescription?: string;
  featuredImage?: string;
  author: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  viewCount?: number;
}

const BlogSchema = new mongoose.Schema<IBlog>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  status: {
    type: String,
    enum: ['draft', 'live'],
    default: 'draft',
  },
  commentsEnabled: {
    type: Boolean,
    default: true,
  },
  metaDescription: {
    type: String,
    trim: true,
    default: '',
  },
  featuredImage: {
    type: String,
    trim: true,
    default: '',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Create indexes for better performance
BlogSchema.index({ status: 1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ tags: 1 });

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);