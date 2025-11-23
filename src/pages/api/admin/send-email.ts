import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import EmailTemplate from '../../../models/EmailTemplate';
import Subscriber from '../../../models/Subscriber';
import EmailHistory from '../../../models/EmailHistory';

type Data = {
  message: string;
  sentCount?: number;
  failedEmails?: string[];
  emailHistoryId?: string;
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

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Replace variables in template
const replaceVariables = (content: string, variables: Record<string, string>) => {
  let result = content;
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value);
  });
  return result;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    // Check admin access
    const adminUser = await checkAdminAccess(req);

    const {
      templateId,
      customSubject,
      customHtmlContent,
      customTextContent,
      recipients, // Array of email addresses (one-time)
      selectedUserIds, // Array of user IDs from database
      subscriberEmails, // Array of subscriber emails
      variables, // Object with variable replacements
    } = req.body;

    // Validate required fields
    if (!recipients && !selectedUserIds && !subscriberEmails) {
      return res.status(400).json({ error: 'Recipients, selected users, or subscribers are required' });
    }

    let subject = customSubject;
    let htmlContent = customHtmlContent;
    let textContent = customTextContent;

    // If using template, fetch and merge with custom content
    if (templateId) {
      const template = await EmailTemplate.findById(templateId);
      if (!template) {
        return res.status(404).json({ error: 'Template not found' });
      }

      subject = customSubject || template.subject;
      htmlContent = customHtmlContent || template.htmlContent;
      textContent = customTextContent || template.textContent;
    }

    if (!subject || !htmlContent) {
      return res.status(400).json({ error: 'Subject and content are required' });
    }

    // Collect all email addresses
    let emailAddresses: string[] = recipients || [];

    // Add emails from selected users
    if (selectedUserIds && selectedUserIds.length > 0) {
      const selectedUsers = await User.find(
        { _id: { $in: selectedUserIds } },
        'email'
      );
      const userEmails = selectedUsers.map(user => user.email);
      emailAddresses = [...emailAddresses, ...userEmails];
    }

    // Add subscriber emails
    if (subscriberEmails && subscriberEmails.length > 0) {
      emailAddresses = [...emailAddresses, ...subscriberEmails];
    }

    // Remove duplicates and empty emails
    emailAddresses = [...new Set(emailAddresses.filter(email => email && email.trim()))];

    if (emailAddresses.length === 0) {
      return res.status(400).json({ error: 'No valid email addresses found' });
    }

    // Get template name if using template
    let templateName = null;
    if (templateId) {
      const template = await EmailTemplate.findById(templateId);
      templateName = template?.name;
    }

    // Collect recipient details for history tracking
    const recipientDetails: any[] = [];
    
    // Add user recipients
    if (selectedUserIds && selectedUserIds.length > 0) {
      const selectedUsers = await User.find(
        { _id: { $in: selectedUserIds } },
        'name email'
      );
      selectedUsers.forEach(user => {
        if (emailAddresses.includes(user.email)) {
          recipientDetails.push({
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            type: 'user' as const,
            status: 'sent' as const,
            sentAt: new Date(),
          });
        }
      });
    }

    // Add subscriber recipients
    if (subscriberEmails && subscriberEmails.length > 0) {
      const subscribers = await Subscriber.find(
        { email: { $in: subscriberEmails } },
        'name email'
      );
      subscribers.forEach(subscriber => {
        if (emailAddresses.includes(subscriber.email)) {
          recipientDetails.push({
            id: subscriber._id.toString(),
            email: subscriber.email,
            name: subscriber.name || subscriber.email,
            type: 'subscriber' as const,
            status: 'sent' as const,
            sentAt: new Date(),
          });
        }
      });
    }

    // Add manual recipients (emails not in users or subscribers)
    const existingEmails = recipientDetails.map(r => r.email);
    const manualEmails = emailAddresses.filter(email => !existingEmails.includes(email));
    manualEmails.forEach((email, index) => {
      recipientDetails.push({
        id: `manual_${Date.now()}_${index}`,
        email: email,
        name: email.split('@')[0],
        type: 'manual' as const,
        status: 'sent' as const,
        sentAt: new Date(),
      });
    });

    // Replace variables in content if provided
    const finalVariables = variables || {};
    const finalSubject = replaceVariables(subject, finalVariables);
    const finalHtmlContent = replaceVariables(htmlContent, finalVariables);
    const finalTextContent = textContent ? replaceVariables(textContent, finalVariables) : undefined;

    // Create EmailHistory record
    const emailHistory = new EmailHistory({
      subject: finalSubject,
      htmlContent: finalHtmlContent,
      textContent: finalTextContent,
      templateId: templateId || undefined,
      templateName: templateName || undefined,
      sentBy: adminUser._id,
      sentByName: adminUser.name,
      sentByEmail: adminUser.email,
      totalRecipients: emailAddresses.length,
      recipients: recipientDetails,
      variables: finalVariables,
      status: 'sending',
      successfulSends: 0,
      failedSends: 0,
    });

    await emailHistory.save();

    // Create email transporter
    const transporter = createTransporter();

    // Send emails
    const failedEmails: string[] = [];
    let sentCount = 0;

    // Send emails in batches to avoid overwhelming the SMTP server
    const batchSize = 10;
    for (let i = 0; i < emailAddresses.length; i += batchSize) {
      const batch = emailAddresses.slice(i, i + batchSize);
      
      const emailPromises = batch.map(async (email) => {
        try {
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: finalSubject,
            html: finalHtmlContent,
            text: finalTextContent,
          };

          await transporter.sendMail(mailOptions);
          sentCount++;
        } catch (error) {
          console.error(`Failed to send email to ${email}:`, error);
          failedEmails.push(email);
        }
      });

      // Wait for current batch to complete before processing next batch
      await Promise.all(emailPromises);
      
      // Add small delay between batches
      if (i + batchSize < emailAddresses.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Update email history with final results
    emailHistory.successfulSends = sentCount;
    emailHistory.failedSends = failedEmails.length;
    emailHistory.status = failedEmails.length === 0 ? 'sent' : 
                         sentCount === 0 ? 'failed' : 'partially_sent';
    emailHistory.completedAt = new Date();

    // Update recipient statuses
    emailHistory.recipients.forEach((recipient: any) => {
      if (failedEmails.includes(recipient.email)) {
        recipient.status = 'failed';
        recipient.errorMessage = 'Failed to send';
      }
    });

    await emailHistory.save();
    await emailHistory.updateAnalytics();

    res.status(200).json({
      message: `Email sent successfully to ${sentCount} recipients`,
      sentCount,
      emailHistoryId: emailHistory._id.toString(),
      ...(failedEmails.length > 0 && { failedEmails }),
    });

  } catch (error: any) {
    console.error('Send email API error:', error);
    if (error.message === 'No token provided' || error.message === 'Admin access required') {
      return res.status(401).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}