import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import EmailHistory from '../../../models/EmailHistory';

type EmailHistoryData = {
  _id: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  templateId?: string;
  templateName?: string;
  sentBy: string;
  sentByName: string;
  sentByEmail: string;
  totalRecipients: number;
  successfulSends: number;
  failedSends: number;
  bouncedEmails: number;
  openedEmails: number;
  clickedEmails: number;
  recipients: any[];
  variables: Record<string, any>;
  status: string;
  sentAt: string;
  scheduledAt?: string;
  completedAt?: string;
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
  createdAt: string;
  updatedAt: string;
};

type Data = {
  history?: EmailHistoryData[];
  email?: EmailHistoryData;
  message?: string;
  totalEmails?: number;
  totalRecipients?: number;
  stats?: {
    totalSent: number;
    totalDelivered: number;
    totalOpened: number;
    totalClicked: number;
    totalBounced: number;
    averageOpenRate: number;
    averageClickRate: number;
    averageBounceRate: number;
  };
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
} | {
  error: string;
};

// Middleware to check admin access
const checkAdminAccess = async (req: NextApiRequest) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const token = authHeader.substring(7);
  const decoded = jwt.verify(token, process.env.JWT_SECRET!, { algorithms: ['HS256'] }) as any;
  
  const user = await User.findById(decoded.userId);
  if (!user || user.role !== 'admin') {
    throw new Error('Admin access required');
  }
  
  return user;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await dbConnect();
    
    // Check admin access for all operations
    const adminUser = await checkAdminAccess(req);

    switch (req.method) {
      case 'GET':
        const { 
          page = '1', 
          limit = '10', 
          status, 
          template, 
          startDate, 
          endDate,
          search,
          emailId 
        } = req.query;

        // If emailId is provided, return specific email details
        if (emailId) {
          const emailHistory = await EmailHistory.findById(emailId);
          
          if (!emailHistory) {
            return res.status(404).json({ error: 'Email history not found' });
          }

          return res.status(200).json({
            email: {
              _id: emailHistory._id.toString(),
              subject: emailHistory.subject,
              htmlContent: emailHistory.htmlContent,
              textContent: emailHistory.textContent,
              templateId: emailHistory.templateId?.toString(),
              templateName: emailHistory.templateName,
              sentBy: emailHistory.sentBy.toString(),
              sentByName: emailHistory.sentByName,
              sentByEmail: emailHistory.sentByEmail,
              totalRecipients: emailHistory.totalRecipients,
              successfulSends: emailHistory.successfulSends,
              failedSends: emailHistory.failedSends,
              bouncedEmails: emailHistory.bouncedEmails,
              openedEmails: emailHistory.openedEmails,
              clickedEmails: emailHistory.clickedEmails,
              recipients: emailHistory.recipients,
              variables: emailHistory.variables,
              status: emailHistory.status,
              sentAt: emailHistory.sentAt.toISOString(),
              scheduledAt: emailHistory.scheduledAt?.toISOString(),
              completedAt: emailHistory.completedAt?.toISOString(),
              errorMessage: emailHistory.errorMessage,
              campaign: emailHistory.campaign,
              analytics: emailHistory.analytics,
              createdAt: emailHistory.createdAt.toISOString(),
              updatedAt: emailHistory.updatedAt.toISOString(),
            }
          });
        }

        // Build query filters
        const filters: any = {};
        
        if (status) {
          filters.status = status;
        }
        
        if (template) {
          filters.templateId = template;
        }
        
        if (startDate || endDate) {
          filters.sentAt = {};
          if (startDate) filters.sentAt.$gte = new Date(startDate as string);
          if (endDate) filters.sentAt.$lte = new Date(endDate as string);
        }
        
        if (search) {
          filters.$or = [
            { subject: { $regex: search, $options: 'i' } },
            { sentByName: { $regex: search, $options: 'i' } },
            { sentByEmail: { $regex: search, $options: 'i' } },
          ];
        }

        // Pagination
        const pageNum = parseInt(page as string, 10);
        const limitNum = parseInt(limit as string, 10);
        const skip = (pageNum - 1) * limitNum;

        // Get email history with pagination
        const [emailHistory, totalItems] = await Promise.all([
          EmailHistory.find(filters)
            .sort({ sentAt: -1 })
            .skip(skip)
            .limit(limitNum)
            .lean(),
          EmailHistory.countDocuments(filters)
        ]);

        // Calculate overall statistics
        const totalStats = await EmailHistory.aggregate([
          { $match: filters },
          {
            $group: {
              _id: null,
              totalSent: { $sum: '$totalRecipients' },
              totalDelivered: { $sum: { $subtract: ['$totalRecipients', '$failedSends'] } },
              totalOpened: { $sum: '$openedEmails' },
              totalClicked: { $sum: '$clickedEmails' },
              totalBounced: { $sum: '$bouncedEmails' },
              avgOpenRate: { $avg: '$analytics.openRate' },
              avgClickRate: { $avg: '$analytics.clickRate' },
              avgBounceRate: { $avg: '$analytics.bounceRate' },
              emailCount: { $sum: 1 }
            }
          }
        ]);

        const stats = totalStats[0] || {
          totalSent: 0,
          totalDelivered: 0,
          totalOpened: 0,
          totalClicked: 0,
          totalBounced: 0,
          avgOpenRate: 0,
          avgClickRate: 0,
          avgBounceRate: 0,
          emailCount: 0
        };

        const totalPages = Math.ceil(totalItems / limitNum);

        res.status(200).json({
          history: emailHistory.map(email => ({
            _id: (email._id as any).toString(),
            subject: email.subject,
            htmlContent: email.htmlContent,
            textContent: email.textContent,
            templateId: email.templateId?.toString(),
            templateName: email.templateName,
            sentBy: (email.sentBy as any).toString(),
            sentByName: email.sentByName,
            sentByEmail: email.sentByEmail,
            totalRecipients: email.totalRecipients,
            successfulSends: email.successfulSends,
            failedSends: email.failedSends,
            bouncedEmails: email.bouncedEmails,
            openedEmails: email.openedEmails,
            clickedEmails: email.clickedEmails,
            recipients: email.recipients,
            variables: email.variables,
            status: email.status,
            sentAt: email.sentAt.toISOString(),
            scheduledAt: email.scheduledAt?.toISOString(),
            completedAt: email.completedAt?.toISOString(),
            errorMessage: email.errorMessage,
            campaign: email.campaign,
            analytics: email.analytics,
            createdAt: email.createdAt.toISOString(),
            updatedAt: email.updatedAt.toISOString(),
          })),
          totalEmails: stats.emailCount,
          totalRecipients: stats.totalSent,
          stats: {
            totalSent: stats.totalSent,
            totalDelivered: stats.totalDelivered,
            totalOpened: stats.totalOpened,
            totalClicked: stats.totalClicked,
            totalBounced: stats.totalBounced,
            averageOpenRate: Math.round((stats.avgOpenRate || 0) * 100) / 100,
            averageClickRate: Math.round((stats.avgClickRate || 0) * 100) / 100,
            averageBounceRate: Math.round((stats.avgBounceRate || 0) * 100) / 100,
          },
          pagination: {
            currentPage: pageNum,
            totalPages,
            totalItems,
            itemsPerPage: limitNum,
          }
        });
        break;

      case 'POST':
        // Create new email history record (used when sending emails)
        const {
          subject,
          htmlContent,
          textContent,
          templateId,
          templateName,
          recipients,
          variables,
          campaign
        } = req.body;

        if (!subject || !htmlContent || !recipients || !Array.isArray(recipients)) {
          return res.status(400).json({ 
            error: 'Subject, HTML content, and recipients array are required' 
          });
        }

        const newEmailHistory = new EmailHistory({
          subject,
          htmlContent,
          textContent,
          templateId,
          templateName,
          sentBy: adminUser._id,
          sentByName: adminUser.name,
          sentByEmail: adminUser.email,
          totalRecipients: recipients.length,
          recipients: recipients.map((recipient: any) => ({
            id: recipient.id,
            email: recipient.email,
            name: recipient.name,
            type: recipient.type,
            status: 'sent',
            sentAt: new Date(),
          })),
          variables: variables || {},
          status: 'sent',
          campaign,
          successfulSends: recipients.length,
          failedSends: 0,
        });

        await newEmailHistory.save();
        await newEmailHistory.updateAnalytics();

        res.status(201).json({
          message: 'Email history created successfully',
          email: {
            _id: newEmailHistory._id.toString(),
            subject: newEmailHistory.subject,
            htmlContent: newEmailHistory.htmlContent,
            textContent: newEmailHistory.textContent,
            templateId: newEmailHistory.templateId?.toString(),
            templateName: newEmailHistory.templateName,
            sentBy: newEmailHistory.sentBy.toString(),
            sentByName: newEmailHistory.sentByName,
            sentByEmail: newEmailHistory.sentByEmail,
            totalRecipients: newEmailHistory.totalRecipients,
            successfulSends: newEmailHistory.successfulSends,
            failedSends: newEmailHistory.failedSends,
            bouncedEmails: newEmailHistory.bouncedEmails,
            openedEmails: newEmailHistory.openedEmails,
            clickedEmails: newEmailHistory.clickedEmails,
            recipients: newEmailHistory.recipients,
            variables: newEmailHistory.variables,
            status: newEmailHistory.status,
            sentAt: newEmailHistory.sentAt.toISOString(),
            scheduledAt: newEmailHistory.scheduledAt?.toISOString(),
            completedAt: newEmailHistory.completedAt?.toISOString(),
            errorMessage: newEmailHistory.errorMessage,
            campaign: newEmailHistory.campaign,
            analytics: newEmailHistory.analytics,
            createdAt: newEmailHistory.createdAt.toISOString(),
            updatedAt: newEmailHistory.updatedAt.toISOString(),
          }
        });
        break;

      case 'PUT':
        // Update email analytics (for tracking opens, clicks, bounces)
        const { emailHistoryId, recipientEmail, action } = req.body;

        if (!emailHistoryId || !recipientEmail || !action) {
          return res.status(400).json({ 
            error: 'Email history ID, recipient email, and action are required' 
          });
        }

        const emailToUpdate = await EmailHistory.findById(emailHistoryId);
        if (!emailToUpdate) {
          return res.status(404).json({ error: 'Email history not found' });
        }

        // Find recipient and update status
        const recipient = emailToUpdate.recipients.find((r: any) => r.email === recipientEmail);
        if (!recipient) {
          return res.status(404).json({ error: 'Recipient not found' });
        }

        // Update recipient status based on action
        const now = new Date();
        switch (action) {
          case 'opened':
            if (!recipient.openedAt) {
              recipient.openedAt = now;
              recipient.status = 'opened';
              emailToUpdate.openedEmails += 1;
            }
            break;
          case 'clicked':
            if (!recipient.clickedAt) {
              recipient.clickedAt = now;
              recipient.status = 'clicked';
              emailToUpdate.clickedEmails += 1;
            }
            break;
          case 'bounced':
            recipient.bouncedAt = now;
            recipient.status = 'bounced';
            emailToUpdate.bouncedEmails += 1;
            break;
          case 'delivered':
            recipient.deliveredAt = now;
            if (recipient.status === 'sent') {
              recipient.status = 'delivered';
            }
            break;
        }

        await emailToUpdate.save();
        await emailToUpdate.updateAnalytics();

        res.status(200).json({ message: 'Email analytics updated successfully' });
        break;

      case 'DELETE':
        // Delete email history record
        const emailHistoryIdToDelete = req.body.emailHistoryId || req.query.emailHistoryId;
        
        if (!emailHistoryIdToDelete) {
          return res.status(400).json({ error: 'Email history ID is required' });
        }

        const deletedEmail = await EmailHistory.findByIdAndDelete(emailHistoryIdToDelete);
        
        if (!deletedEmail) {
          return res.status(404).json({ error: 'Email history not found' });
        }

        res.status(200).json({ message: 'Email history deleted successfully' });
        break;

      default:
        res.status(405).json({ error: 'Method not allowed' });
        break;
    }
  } catch (error: any) {
    console.error('Email history API error:', error);
    if (error.message === 'No token provided' || error.message === 'Admin access required') {
      return res.status(401).json({ error: error.message });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ 
      error: 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
}