import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';
import rateLimit from '@/lib/rateLimit';

// Rate limiting: 5 requests per 15 minutes per IP
const limiter = rateLimit({
  interval: 15 * 60 * 1000, // 15 minutes
  uniqueTokenPerInterval: 500, // Max 500 unique IPs per interval
});

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  category?: string;
  source?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  contactId?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Only POST requests are accepted.'
    });
  }

  try {
    // Apply rate limiting
    const clientIp = req.headers['x-forwarded-for'] as string || req.connection?.remoteAddress || 'anonymous';
    await limiter.check(res, 5, 'CACHE_TOKEN_CONTACT_' + clientIp);

    await dbConnect();

    const {
      name,
      email,
      phone,
      subject,
      message,
      category = 'general',
      source = 'website'
    }: ContactFormData = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields. Name, email, subject, and message are required.'
      });
    }

    // Additional validation
    if (name.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Name cannot exceed 100 characters.'
      });
    }

    if (subject.length > 200) {
      return res.status(400).json({
        success: false,
        message: 'Subject cannot exceed 200 characters.'
      });
    }

    if (message.length > 5000) {
      return res.status(400).json({
        success: false,
        message: 'Message cannot exceed 5000 characters.'
      });
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.'
      });
    }

    // Get client information
    const ipAddress = req.headers['x-forwarded-for'] || 
                     req.headers['x-real-ip'] || 
                     req.connection.remoteAddress || 
                     req.socket.remoteAddress || 
                     (req.connection as any)?.socket?.remoteAddress || 
                     'unknown';

    const userAgent = req.headers['user-agent'] || 'unknown';

    // Auto-set priority based on keywords
    let priority = 'medium';
    const urgentKeywords = ['urgent', 'emergency', 'critical', 'asap', 'immediately'];
    const highKeywords = ['important', 'high priority', 'escalate', 'serious'];
    const messageText = (subject + ' ' + message).toLowerCase();

    if (urgentKeywords.some(keyword => messageText.includes(keyword))) {
      priority = 'urgent';
    } else if (highKeywords.some(keyword => messageText.includes(keyword))) {
      priority = 'high';
    }

    // Auto-categorize based on content
    let autoCategory = category;
    if (category === 'general') {
      const supportKeywords = ['help', 'issue', 'problem', 'error', 'trouble', 'support'];
      const billingKeywords = ['payment', 'billing', 'invoice', 'charge', 'refund', 'subscription'];
      const partnershipKeywords = ['partner', 'collaboration', 'business', 'investment', 'opportunity'];
      const bugKeywords = ['bug', 'crash', 'broken', 'not working', 'error', 'glitch'];
      const featureKeywords = ['feature', 'suggestion', 'improvement', 'enhance', 'request'];

      if (bugKeywords.some(keyword => messageText.includes(keyword))) {
        autoCategory = 'bug_report';
      } else if (featureKeywords.some(keyword => messageText.includes(keyword))) {
        autoCategory = 'feature_request';
      } else if (billingKeywords.some(keyword => messageText.includes(keyword))) {
        autoCategory = 'billing';
      } else if (partnershipKeywords.some(keyword => messageText.includes(keyword))) {
        autoCategory = 'partnership';
      } else if (supportKeywords.some(keyword => messageText.includes(keyword))) {
        autoCategory = 'support';
      }
    }

    // Auto-generate tags
    const tags: string[] = [];
    if (phone) tags.push('has-phone');
    if (priority === 'urgent') tags.push('urgent');
    if (messageText.includes('mobile') || messageText.includes('app')) tags.push('mobile');
    if (messageText.includes('website') || messageText.includes('web')) tags.push('website');
    if (messageText.includes('payment') || messageText.includes('billing')) tags.push('payment');

    // Create contact
    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      subject: subject.trim(),
      message: message.trim(),
      status: 'new',
      priority,
      category: autoCategory,
      tags,
      ipAddress: Array.isArray(ipAddress) ? ipAddress[0] : ipAddress,
      userAgent,
      source,
      isRead: false,
      isStarred: false
    });

    const savedContact = await contact.save();

    // Log the contact submission
    console.log(`New contact submitted: ${savedContact._id} from ${email}`);

    return res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! We have received your message and will get back to you soon.',
      contactId: savedContact._id.toString()
    });

  } catch (error: any) {
    console.error('Contact form submission error:', error);

    // Handle rate limiting errors
    if (error.message && error.message.includes('Rate limit exceeded')) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please wait a few minutes before submitting again.'
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        success: false,
        message: validationErrors.join(', ')
      });
    }

    // Handle duplicate email errors (if we add unique constraint later)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted a contact form recently. Please wait before submitting another.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
}